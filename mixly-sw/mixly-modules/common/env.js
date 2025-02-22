(() => {

goog.require('path');
goog.require('Mixly');
goog.require('Mixly.Config');
goog.provide('Mixly.Env');

const fs_extra = Mixly.require('fs-extra');
const fs_plus = Mixly.require('fs-plus');
const electron_remote = Mixly.require('@electron/remote');

const { Env, Config } = Mixly;

const { SOFTWARE } = Config;

/**
  * 获取当前mixly2.0的路径
  * @type {String}
  */
Env.clientPath = null;

/**
  * 检测当前系统
  * @type {String} win32、darwin、linux
  */
Env.currentPlatform = goog.platform();

/**
  * 获取板卡index或主页面index的路径
  * @type {String} 
  */
Env.indexDirPath = path.join((new URL($('html')[0].baseURI)).href, '../').replace(/file:\/+/g, '');
Env.indexDirPath = decodeURIComponent(Env.indexDirPath);
if (Env.currentPlatform !== 'win32') {
  Env.indexDirPath = '/' + Env.indexDirPath;
}

/**
  * 检测是否启用node服务器
  * @type {Boolean}
  */
Env.hasSocketServer = SOFTWARE?.webSocket?.enabled ? true : false;

/**
  * 检测是否启用node编译服务器
  * @type {Boolean}
  */
Env.hasCompiler = SOFTWARE?.webCompiler?.enabled ? true : false;

Env.thirdPartyBoardPath = path.join(Env.indexDirPath, 'boards/extend');

if (goog.isElectron) {
    const { app } = electron_remote;
    const { currentPlatform } = Env;
    if (currentPlatform === "darwin") {
        Env.clientPath = path.join(app.getPath("exe"), '../../../../');
    } else {
        Env.clientPath = path.join(app.getPath("exe"), '../');
    }
    if (Env.currentPlatform === "darwin" || Env.currentPlatform === "linux") {
        Env.python3Path = '/usr/bin/python3';
    } else {
        Env.python3Path = path.join(Env.clientPath, 'mixpyBuild/win_python3/python3.exe');
    }

    Env.arduinoCliPath = path.join(Env.clientPath, 'arduino-cli/');
    const cliFilePath = path.join(Env.arduinoCliPath, 'arduino-cli' + (currentPlatform === 'win32'? '.exe':''));
    if (!fs_plus.isFileSync(cliFilePath)) {
        const defaultPath = SOFTWARE?.defaultPath[currentPlatform] ?? null;
        if (defaultPath?.arduinoCli) {
            Env.arduinoCliPath = path.join(Env.clientPath, defaultPath.arduinoCli, '../');
        } else {
            Env.arduinoCliPath = null;
        }
    }
}

})()