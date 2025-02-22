goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.Url');
goog.provide('Mixly.Electron');

const {
    Url,
    Env,
    Electron
} = Mixly;

const electron_remote = Mixly.require('@electron/remote');

const {
    Menu,
    BrowserWindow
} = electron_remote;

Electron.newBrowserWindow = (indexPath, config = {}) => {
    Menu.setApplicationMenu(null);
    const win = new BrowserWindow({
        ...{
            show: false,
            minHeight: 400,
            minWidth: 700,
            width: 0,
            height: 0,
            icon: path.join(Env.indexDirPath, '../files/mixly.ico'),
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: false,
                spellcheck: false
            }
        },
        ...(config.window ?? {})
    });

    win.loadFile(indexPath);

    win.once('ready-to-show', () => {
        win.maximize();
        win.show();
    });

    return win;
}

});