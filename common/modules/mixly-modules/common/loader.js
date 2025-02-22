goog.loadJs('common', () => {

goog.require('path');
goog.require('d3');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.App');
goog.require('Mixly.Msg');
goog.require('Mixly.UserEvents');
goog.require('Mixly.UserOPEvents');
goog.require('Mixly.JSFuncs');
goog.require('Mixly.Title');
goog.require('Mixly.LocalStorage');
goog.require('Mixly.Storage');
goog.require('Mixly.Debug');
goog.require('Mixly.API2');
goog.require('Mixly.Electron.LibManager');
goog.require('Mixly.Electron.File');
goog.require('Mixly.WebSocket.Socket');
goog.provide('Mixly.Loader');

const {
    Config,
    Boards,
    Loader,
    Env,
    App,
    Msg,
    UserEvents,
    UserOPEvents,
    Title,
    LocalStorage,
    Storage,
    Debug,
    API2,
    Electron = {},
    Web = {},
    WebSocket = {}
} = Mixly;

const { LibManager, File } = goog.isElectron? Electron : Web;
const { Socket } = WebSocket;


window.addEventListener('load', () => {
    if (!goog.isElectron && Env.hasSocketServer) {
        Socket.init();
    }
    const app = new App($('body')[0]);
    Mixly.app = app;
    const $xml = $(goog.get(Env.boardIndexPath));
    let scrpitPaths = [];
    let cssPaths = [];
    let $categories = null;
    for (let i = 0; i < $xml.length; i++) {
        const $xmli = $($xml[i]);
        let rePath = '';
        switch ($xml[i].nodeName) {
        case 'SCRIPT':
            rePath = $xmli.attr('src');
            rePath && scrpitPaths.push(path.join(Env.boardDirPath, rePath));
            break;
        case 'LINK':
            rePath = $xmli.attr('href');
            rePath && cssPaths.push(path.join(Env.boardDirPath, rePath));
            break;
        case 'XML':
            $categories = $xmli;
            break;
        }
    }
    $categories && $('#toolbox').html($categories.html());
    cssPaths.length && LazyLoad.css(cssPaths);
    if (scrpitPaths.length) {
        LazyLoad.js(scrpitPaths, () => {
            Loader.start();
        });
    } else {
        Loader.start();
    }
});

Loader.start = () => {
    if (window.frames.length !== parent.frames.length) {
        window.userEvents = new UserEvents(Editor.blockEditor);
    }
    if (!goog.isElectron && window.location.host.indexOf('mixly.cn')) {
        window.userOpEvents = new UserOPEvents();
    }
    if (goog.isElectron && typeof LibManager === 'object') {
        LibManager.init(() => Loader.init());
    } else {
        Env.defaultXML = $('#toolbox').html();
        Loader.init();
    }
}

Loader.init = () => {
    const selectedBoardName = Boards.getSelectedBoardName();
    Boards.setSelectedBoard(selectedBoardName, {});
    Msg.renderToolbox(true);
    Mixly.app.getNav().resize();
    const workspace = Mixly.app.getWorkspace();
    const editor = workspace.getEditorsManager().getActive();
    Loader.restoreBlocks(editor);
    Mixly.app.removeSkeleton();
    window.addEventListener('unload', () => Loader.backupBlocks(editor), false);
    API2.init();
}

Loader.restoreBlocks = (editor) => {
    const filePath = LocalStorage.get(`${LocalStorage.PATH['USER']}/filePath`);
    const mix = Storage.board('mix');
    const openedPath = Storage.board('path');
    if (filePath) {
        LocalStorage.set(`${LocalStorage.PATH['USER']}/filePath`, '');
        goog.isElectron && File.openFile(filePath);
    } else if (mix) {
        try {
            editor.setValue(mix, '.mix');
            if (openedPath && goog.isElectron) {
                File.openedFilePath = openedPath;
                File.workingPath = path.dirname(openedPath);
                Title.updeteFilePath(File.openedFilePath);
            }
        } catch (error) {
            Storage.board('mix', '');
            Debug.error(error);
        }
    }
}

Loader.backupBlocks = (editor) => {
    const mix = editor.getValue();
    Storage.board('mix', mix);
    Storage.board('path', Title.getFilePath());
}

});