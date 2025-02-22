goog.loadJs('common', () => {

goog.require('path');
goog.require('FingerprintJS');
goog.require('Mixly.Url');
goog.require('Mixly.Env');
goog.require('Mixly.LocalStorage');
goog.provide('Mixly.Config');

const {
    Config,
    Url,
    Env,
    LocalStorage
} = Mixly;

// 被选中板卡的配置信息
Config.SELECTED_BOARD = {};

// 板卡页面的配置信息
Config.BOARD = {};

// 软件的配置信息
Config.SOFTWARE = {};

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true'
};

const BOARD_DEFAULT_CONFIG = {
    "burn": "None",
    "upload": "None",
    "nav": "None",
    "serial": "None",
    "saveMixWithCode": true,
    "thirdPartyBoard": false
};

const SOFTWARE_DEFAULT_CONFIG = {
    "version": "Mixly3.0"
};

/**
 * @function 读取软件、板卡的配置信息
 * @return {void}
 **/
Config.init = () => {
    const urlConfig = Url.getConfig();
    Config.BOARD = {
        ...goog.getJSON(path.join(Env.boardDirPath, 'config.json'), BOARD_DEFAULT_CONFIG),
        ...urlConfig
    };

    if (typeof Config.BOARD.board === 'string'
        && path.extname(Config.BOARD.board) === '.json') {
        Config.BOARD.board = goog.getJSON(path.join(Env.boardDirPath, Config.BOARD.board));
    }

    let pathPrefix = '../';

    Config.SOFTWARE = goog.getJSON(path.join(pathPrefix, 'sw-config.json'), SOFTWARE_DEFAULT_CONFIG);
    Config.pathPrefix = pathPrefix;

    Env.hasSocketServer = Config.SOFTWARE?.webSocket?.enabled ? true : false;
    Env.hasCompiler = Config.SOFTWARE?.webCompiler?.enabled ? true : false;

    Config.USER = {
        ...Config.USER,
        ...LocalStorage.get(LocalStorage.PATH['USER']) ?? {}
    };

    if (Config.USER.themeAuto) {
        const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
        Config.USER.theme = themeMedia.matches ? 'light' : 'dark';
    }

    if (Config.USER.languageAuto) {
        switch (navigator.language) {
        case 'zh-CN':
            Config.USER.language = 'zh-hans';
            break;
        case 'zh-HK':
        case 'zh-SG':
        case 'zh-TW':
            Config.USER.language = 'zh-hant';
            break;
        default:
            Config.USER.language = 'en';
        }
    }
    if (Config.USER.visitorId) {
        Config.BOARD.visitorId = { ...Config.USER.visitorId };
    } else {
        FingerprintJS.load()
        .then(fp => fp.get())
        .then(result => {
            let visitorId16 = result.visitorId;
            let VisitorIdNum = parseInt(visitorId16, 16);
            let visitorId32 = VisitorIdNum.toString(32);
            let visitorId = {
                str16: visitorId16,
                str32: visitorId32,
                str16CRC32b: Url.CRC32(visitorId16, 16),
                str32CRC32b: Url.CRC32(visitorId32, 16)
            };
            LocalStorage.set(LocalStorage.PATH['USER'] + '/visitorId', visitorId);
            Config.BOARD.visitorId = visitorId;
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            console.log(Config.BOARD);
        });
    }
}

Config.init();

});