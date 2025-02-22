(() => {

goog.require('Mixly.Url');
goog.require('Mixly.LocalStorage');
goog.provide('Mixly.Config');

const {
    Url,
    LocalStorage,
    Config
} = Mixly;

Config.USER = {
    theme: 'light',
    language: 'zh-hans',
    winSize: 1,
    blockRenderer: 'geras',
    compileCAndH: 'true',
    boardIgnore: []
};

/**
 * @function 读取软件、板卡的配置信息
 * @return {void}
 **/
Config.init = () => {
    Config.SOFTWARE = goog.getJSON('./sw-config.json', {});
    console.log('Config.SOFTWARE:', Config.SOFTWARE);
    Config.BOARDS_INFO = goog.getJSON('./boards.json', {});
    console.log('Config.BOARDS_INFO:', Config.BOARDS_INFO);
    const boardPageConfig = Url.getConfig();
    Config.BOARD_PAGE = boardPageConfig ?? {};
    console.log('Config.BOARD_PAGE:', Config.BOARD_PAGE);
    document.title = Config.SOFTWARE.version ?? 'Mixly 2.0';

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

    console.log('Config.USER', Config.USER);
}

Config.init();

})();