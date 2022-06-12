const crypto = require("crypto");
const path = require( 'path' );
const fs = require( 'fs-extra' );
const os = require( 'os' );
const open = require( 'open' );
const chokidar = require( 'chokidar' );
const piexif = require('piexifjs');
const Store = require('electron-store');
const notification = require( './notification' );
const randomWords = require('random-words');
const moment = require('moment');
const {ImageIfdTags, exifIfdTags, gpsTags} = require('./img-tags');

// get application directory
const appDir = path.resolve( os.homedir(), 'electron-app-files' );

let filePathForChangedMeta

const store = new Store();

const folderPath = store.get('path')

if (folderPath) {
    filePathForChangedMeta = folderPath.path;
};

/****************************/

exports.getPath = (path) => {
    filePathForChangedMeta = path;

    store.set('path', {path});

    return path;
}


exports.getFilesWithChangedMeta = () => {
  console.log(filePathForChangedMeta);

  const files = fs.readdirSync( appDir );
  

  files.map( filename => {
    const filePath = path.resolve( appDir, filename );
 
    const fileStats = fs.statSync( filePath );
 
    const filename2 = filePathForChangedMeta + "/" + filename.replace('.', "") + "-" + "new.jpg";
    console.log(filename2);

    const getBase64DataFromJpegFile = name => fs.readFileSync(name).toString('binary');

    //  debug exif
    //  const getExifFromJpegFile = name => piexif.load(getBase64DataFromJpegFile(name));
    //  const exif = getExifFromJpegFile(filePath);
    //  console.log(debugExif(exif))

    let zerothWrite = {};
    let exifWrite = {};
    let gpsWrite = {};

    ImageIfdTags.forEach(tag => {
        if (!piexif.ImageIFD[tag]) {
       
            return
        };
        
        zerothWrite[piexif.ImageIFD[tag]] =  [...Buffer.from(randomWords(), 'ucs2')];
    })

    exifIfdTags.forEach(tag => {
        
        if (!piexif.ExifIFD[tag]) {
            return
        };
        
        exifWrite[piexif.ExifIFD[tag]] =  [...Buffer.from(randomWords(), 'ucs2')];
    })


    gpsTags.forEach(tag => {
        
        if (!piexif.GPSIFD[tag]) {
            return
        };
        
        gpsWrite[piexif.GPSIFD[tag]] =  [...Buffer.from(randomWords(), 'ucs2')];
    })

    zerothWrite[piexif.ImageIFD.XPTitle]   = [...Buffer.from(randomWords(), 'ucs2')];
    zerothWrite[piexif.ImageIFD.XPComment] = [...Buffer.from(randomWords(), 'ucs2')];
    zerothWrite[piexif.ImageIFD.XPAuthor]  = [...Buffer.from(randomWords(), 'ucs2')];
    zerothWrite[piexif.ImageIFD.Make] = randomWords();
    zerothWrite[piexif.ImageIFD.Software] = randomWords();
    zerothWrite[piexif.ImageIFD.DocumentName] = randomWords();
    zerothWrite[piexif.ImageIFD.ImageDescription] = randomWords();
    zerothWrite[piexif.ImageIFD.Model] = randomWords();
    zerothWrite[piexif.ImageIFD.Artist] = randomWords();
    zerothWrite[piexif.ImageIFD.Copyright] = randomWords();
    zerothWrite[piexif.ImageIFD.DateTime] = generateRandomDOB();
    zerothWrite[piexif.ImageIFD.PreviewDateTime] = generateRandomDOB();
    zerothWrite[piexif.ImageIFD.HostComputer] = randomWords();
    zerothWrite[piexif.ImageIFD.StripOffsets] = Math.floor(Math.random() * 899999 + 100000)
    
    zerothWrite[piexif.ImageIFD.XResolution] = [getRandomNumber(10000),1];
    zerothWrite[piexif.ImageIFD.YResolution] = [200, 1];
    zerothWrite[piexif.ImageIFD.ImageWidth] = getRandomNumber(1000);
    zerothWrite[piexif.ImageIFD.ImageLength] = getRandomNumber(1000)

    exifWrite[piexif.ExifIFD.DateTimeDigitized] = generateRandomDOB();
    exifWrite[piexif.ExifIFD.DateTimeOriginal] = generateRandomDOB();
    exifWrite[piexif.ExifIFD.Sharpness] = getRandomNumber(100);
    exifWrite[piexif.ExifIFD.LensMake] = randomWords();
    exifWrite[piexif.ExifIFD.ISOSpeed] = getRandomNumber(10000);
    exifWrite[piexif.ExifIFD.FNumber] = getRandomNumber(100);
    

    const lat = getRandomNumber(100);
    const lng = getRandomNumber(100)
    gpsWrite[piexif.GPSIFD.GPSLatitudeRef] = lat < 0 ? 'S' : 'N';
    gpsWrite[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(lat);
    gpsWrite[piexif.GPSIFD.GPSLongitudeRef] = lng < 0 ? 'W' : 'E';
    gpsWrite[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(lng)

    gpsWrite[piexif.GPSIFD.GPSDateStamp] = generateRandomDOB();

    const exifObj = {   "0th":zerothWrite, "Exif":exifWrite, "GPS":gpsWrite, "thumbnail": crypto.randomBytes(50).toString('hex')};

    const newExifBinary = piexif.dump(exifObj);
    const newImageData = getBase64DataFromJpegFile(filePath);
    
    const newPhotoData = piexif.insert(newExifBinary, newImageData);
    // Save the new photo to a file
    let fileBuffer = Buffer.from(newPhotoData, 'binary');
    fs.writeFileSync(`${filename2}`, fileBuffer);
 
    
    return {
        name: filename,
        path: filePath,
        fileStats, 
        size: Number( fileStats.size / 1000 ).toFixed( 1 ), // kb
    };
    } );

    notification.filesMetaChanged( files.length );

}

// get the list of files
exports.getFiles = () => {
    const files = fs.readdirSync( appDir );

    return files.map( filename => {
        const filePath = path.resolve( appDir, filename );
        const fileStats = fs.statSync( filePath );

        return {
            name: filename,
            path: filePath,
            fileStats, 
            size: Number( fileStats.size / 1000 ).toFixed( 1 ), // kb
        };
    } );
};

/****************************/



// add files
exports.addFiles = ( files = [] ) => {
    
    // ensure `appDir` exists
    fs.ensureDirSync( appDir );
    
    // copy `files` recursively (ignore duplicate file names)

    files.forEach( file => {
 
        const filePath = path.resolve( appDir, file.name );

        if( ! fs.existsSync( filePath ) ) {
            fs.copyFileSync( file.path, filePath );
        }
    } );

    // display notification
    notification.filesAdded( files.length );
};

// delete a file
exports.deleteFile = ( filename ) => {
    const filePath = path.resolve( appDir, filename );

    // remove file from the file system
    if( fs.existsSync( filePath ) ) {
        fs.removeSync( filePath );
    }
};

// open a file
exports.openFile = ( filename ) => {
    const filePath = path.resolve( appDir, filename );

    // open a file using default application
    if( fs.existsSync( filePath ) ) {
        open( filePath );
    }
};

exports.openFolder = (path) => {

    // open a file using default application
    if( fs.existsSync( path ) ) {
        open(path)
    }
}

/*-----*/

// watch files from the application's storage directory
exports.watchFiles = ( win ) => {
    chokidar.watch( appDir ).on( 'unlink', ( filepath ) => {
        win.webContents.send( 'app:delete-file', path.parse( filepath ).base );
    } );
}

function debugExif(exif) {
    for (const ifd in exif) {
        if (ifd == 'thumbnail') {
            const thumbnailData = exif[ifd] === null ? "null" : exif[ifd];
            console.log(`- thumbnail: ${thumbnailData}`);
        } else {
            console.log(`- ${ifd}`);
            for (const tag in exif[ifd]) {
                console.log(`    - ${piexif.TAGS[ifd][tag]['name']}: ${exif[ifd][tag]}`);
            }
        }
    }
}

function getRandomNumber(number) {
    return Math.floor(Math.random() * number) + 1
}

const generateRandomDOB = () => {
    const random = getRandomDate(new Date('1950-02-12T01:57:45.271Z'), new Date('2006-02-12T01:57:45.271Z'));

    return moment(random).format('YYYY:MM:DD hh:mm:ss');
}

function getRandomDate(from, to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
}

function changeSystemNumber(number, type) {
    hexString = number.toString(type);

    if (hexString.length % 2) {
     hexString = '0' + hexString;
    }

    return hexString
}