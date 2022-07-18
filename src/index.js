const { app, BrowserWindow, ipcMain, dialog } = require( 'electron' );
const path = require( 'path' );
const Store = require('electron-store');
// local dependencies
const io = require( './main/io' );
``
// open a window
const openWindow = () => {
    const win = new BrowserWindow( {
        width: 800,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
        },
    } );
    // block / unblock devtools
    // win.webContents.openDevTools();

    // load `index.html` file
    win.setMenuBarVisibility(false)
    win.loadFile( path.resolve( __dirname, 'render/html/index.html' ) );

    /*-----*/
    
    return win; // return window
};

// when app is ready, open a window
app.on( 'ready', () => {
    const win = openWindow();

    // watch files
    io.watchFiles( win );


    io.getPath()

    Store.initRenderer();
} );

// when all windows are closed, quit the app
app.on( 'window-all-closed', () => {
    if( process.platform !== 'darwin' ) {
        app.quit();
    }
} );

// when app activates, open a window
app.on( 'activate', () => {
    if( BrowserWindow.getAllWindows().length === 0 ) {
        openWindow();
    }
} );

/************************/

ipcMain.handle('app:get-path', () => {

    const path = dialog.showOpenDialogSync( {
        properties: ['openDirectory']
    } );

    if (path && path.length) {
        io.setPath(path[0]);
        
        return path[0];
    };

    return;
})

ipcMain.handle('app:get-path-first-time', () => {

    return io.getPath(path[0]);
})
    
    

ipcMain.handle('app:change-meta', () => {
    return io.getFilesWithChangedMeta();
})

// return list of files
ipcMain.handle( 'app:get-files', () => {
    return io.getFiles();
} );

// listen to file(s) add event
ipcMain.handle( 'app:on-file-add', ( event, files = [] ) => {
    io.addFiles( files );
} );

// open filesystem dialog to choose files
ipcMain.handle( 'app:on-fs-dialog-open', ( event ) => {
    const files = dialog.showOpenDialogSync( {
        properties: [ 'openFile', 'multiSelections' ],
    } );

    io.addFiles( files.map( filepath => {
        return {
            name: path.parse( filepath ).base,
            path: filepath,
        };
    } ) );
} );

/*-----*/

// listen to file delete event
ipcMain.on( 'app:on-file-delete', ( event, file ) => {
    io.deleteFile( file.filepath );
} );

// listen to file open event
ipcMain.on( 'app:on-file-open', ( event, file ) => {
    io.openFile( file.filepath );
} );

// listen to folder open event
ipcMain.on( 'app:on-folder-open', ( event, { path }) => {
    io.openFolder( path );
} );

// listen to file copy event
ipcMain.on( 'app:on-file-copy', ( event, file ) => {
    event.sender.startDrag( {
        file: file.filepath,
        icon: path.resolve( __dirname, './resources/paper.png' ),
    } );
} );