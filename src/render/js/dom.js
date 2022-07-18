const { ipcRenderer } = require( 'electron' );
const Store = require('electron-store');
// copy file
window.copyFile = function ( event, itemId ) {
    event.preventDefault();

    // get path of the file
    const itemNode = document.getElementById( itemId );
    const filepath = itemNode.getAttribute( 'data-filepath' );

    // send event to the main thread
    ipcRenderer.send( 'app:on-file-copy', { id: itemId, filepath } );
};

// delete file
window.deleteFile = function ( itemId ) {

    // get path of the file
    const itemNode = document.getElementById( itemId );
    const filepath = itemNode.getAttribute( 'data-filepath' );

    // send event to the main thread
    ipcRenderer.send( 'app:on-file-delete', { id: itemId, filepath } );
};

// open file
window.openFile = function ( itemId ) {

    // get path of the file
    const itemNode = document.getElementById( itemId );
    const filepath = itemNode.getAttribute( 'data-filepath' );

    // send event to the main thread
    ipcRenderer.send( 'app:on-file-open', { id: itemId, filepath } );
};

window.openFolder = async function (path) {
    // send event to the main thread
    ipcRenderer.send( 'app:on-folder-open', { path });    
};

exports.initPath = () => {
    const store = new Store();

    const path = store.get('path');

    if (path) {
        displayPath(path.path);
    };
    
}

exports.displayFiles = ( files = [] ) => {

    const fileListElem = document.getElementById( 'filelist' );
    fileListElem.innerHTML = '';

    files.forEach( file => {
        const itemDomElem = document.createElement( 'div' );
        itemDomElem.setAttribute( 'id', file.name ); // set `id` attribute
        itemDomElem.setAttribute( 'class', 'app__files__item' ); // set `class` attribute
        itemDomElem.setAttribute( 'data-filepath', file.path ); // set `data-filepath` attribute

        itemDomElem.innerHTML = `
            <img ondragstart='copyFile(event, "${ file.name }")' src='../assets/document.svg' class='app__files__item__file'/>
            <div class='app__files__item__info'>
                <p class='app__files__item__info__name'>${ file.name }</p>
                <p class='app__files__item__info__size'>${ file.size }KB</p>
            </div>
            <img onclick='deleteFile("${ file.name }")' src='../assets/delete.svg' class='app__files__item__delete'/>
            <img onclick='openFile("${ file.name }")' src='../assets/open.svg' class='app__files__item__open'/>
        `;

        fileListElem.appendChild( itemDomElem );
    } );
};

const displayPath = (path) => {
    if (!path) {
        return;
    }
 
    const buttonArea = document.querySelector('.app__uploader__button-area');

    buttonArea.innerHTML = `
    <button class='app__uploader__button-area__button' onclick='openDialog()'>Добавить файлы</button>
  
    <div class="app__path__block" id="path-block">
        <button type="file" class='app__uploader__button-area__button' id="dirs" onclick='getPath()'>Выбрать путь сохранения</button>
        <div style="display: flex;"> 
            <p class='app__files__item__info__size'>${ path }</p>
            <img style="margin: 5px 0px 0px 10px;" onclick='openFolder("${ path }")' src='../assets/open.svg' class='app__files__item__open'/>        
        </div>
    </div>
    <button  class='app__uploader__button-area__button meta-button' onclick='changeMeta()'>Перемешать мета-данные</button>
    </div>
    `;

    return new Promise((resolve) => {
         resolve()
      });
}

exports.displayPath = displayPath;