goog.loadJs('electron', () => {

goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Electron.Serial');
goog.require('Mixly.Electron.PythonShell');
goog.require('Mixly.Electron.Events');
goog.provide('Mixly.Electron.Loader');

const {
    Url,
    Config,
    Env,
    Electron
} = Mixly;

const { BOARD } = Config;

const {
    Serial,
    PythonShell,
    Loader
} = Electron;


Loader.onbeforeunload = function(reload = false) {
    const pageReload = (href) => {
        if (!reload) {
            window.location.replace(href);
        } else {
            window.location.reload(true);
        }
    }
    let href = Config.pathPrefix + 'index.html?' + Url.jsonToUrl({ boardType: BOARD.boardType ?? 'None' });
    let endPromise = [];
    const { mainStatusBarTabs } = Mixly;
    Serial.getCurrentPortsName().map((name) => {
        const statusBarSerial = mainStatusBarTabs.getStatusBarById(name);
        if (statusBarSerial) {
            endPromise.push(statusBarSerial.close());
        }
    });
    endPromise.push(PythonShell.stop());
    Promise.all(endPromise)
    .finally(() => {
        pageReload(href);
    });
};

Loader.closePort = (serialport) => {
    return new Promise((resolve, reject) => {
        serialport.close(() => {
            resolve();
        });
    })
}

Loader.reload = () => {
    Loader.onbeforeunload(true);
}

});