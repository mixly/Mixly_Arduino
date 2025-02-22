(() => {
    const scriptUrl = new URL(document.currentScript.src);
    const { href } = scriptUrl;
    const commonDirPath = href.substring(0, href.lastIndexOf('/'));
    window.COMMON_DIR_PATH = commonDirPath;
    window.VIEW = scriptUrl.searchParams.get('view') || 'board';
    let config = {};
    try {
        config = JSON.parse(localStorage.getItem('mixly2.0') ?? '{}');
    } catch (error) {
        console.log(error);
    }
    const html = document.getElementsByTagName('html')[0];
    let { theme = 'light' } = config?.user ?? {};
    if (theme === 'auto') {
        const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
        theme = themeMedia.matches ? 'light' : 'dark';
    }
    html.setAttribute('data-bs-theme', theme);
})();

LazyLoad.js([
    COMMON_DIR_PATH + '/blockly-core/base.js',
    COMMON_DIR_PATH + '/modules/web-modules/jquery/jquery-3.7.1.min.js'
], function() {
    /**
      * 当前视图
      * @type {string} 主页面 home | 板卡页面 board
      */
    goog.VIEW = VIEW;

    /**
      * 当前环境
      * @type {string} electron | web
      */
    goog.NOW_ENV = window?.process?.versions?.electron ? 'electron' : 'web';

    /**
      * 检测当前环境
      * @type {boolean} true - mixly Client; false - mixly Web
      */
    goog.isElectron = goog.NOW_ENV === 'electron' ? true : false;

    /**
      * @function 根据当前环境执行对应函数
      * @param type {string} 目标环境，electron | web | common
      * @param func {function} 需要在目标环境下执行的函数
      * @return {void}
      */
    goog.loadJs = (type, func) => {
        if (type !== goog.NOW_ENV && type !== 'common') {
            return;
        }
        func();
    }

    /**
      * mixly文件夹相对于base.js的路径
      * @type {string}
      */
    goog.MIXLY_DIR_PATH = ['../', '../modules/mixly-modules'];
    if (goog.VIEW === 'home') {
        goog.MIXLY_DIR_PATH.push('../../mixly-sw/mixly-modules');
    }

    /**
      * 所有模块的信息所构成的列表，其中模块路径为其相对于blockly-core目录的相对路径
      * @type {array}
      */
    goog.DEPENDENCIES = [];

    /**
      * 缓存已请求成功的文本数据，防止重复请求
      * @type {object}
      */
    goog.files = {};

    goog.platform = () => {
        const userAgent = navigator.userAgent;
        if (!navigator.serial) return 'mobile';
        if (userAgent.indexOf('Windows NT') !== -1) return 'win32';
        if (userAgent.indexOf('Mac') !== -1) return 'darwin';
        if (userAgent.indexOf('X11') !== -1) return 'linux';
        if (userAgent.indexOf('Linux') !== -1) return 'linux';
        return 'unknown';
    }

    goog.fullPlatform = () => {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform.toLowerCase();
        let os = 'unknown';
        if (platform.includes('win')) {
            if (userAgent.indexOf('Windows NT 10.0') != -1) os = 'win10';
            else if (userAgent.indexOf('Windows NT 6.3') != -1) os = 'win8.1';
            else if (userAgent.indexOf('Windows NT 6.2') != -1) os = 'win8';
            else if (userAgent.indexOf('Windows NT 6.1') != -1) os = 'win7';
            else if (userAgent.indexOf('Windows NT 6.0') != -1) os = 'winvista';
            else if (userAgent.indexOf('Windows NT 5.1') != -1) os = 'winxp';
        } else if (!navigator.serial) {
            os = 'android';
        } else if (platform.includes('iphone') || platform.includes('ipad') || platform.includes('ipod')) {
            os = 'ios';
        } else if (platform.includes('mac')) {
            os = 'darwin';
        } else if (platform.includes('linux')) {
            os = 'linux';
        }
        return os;
    }

    /**
     * @function 根据传入的相对路径获取文件数据
     * @param inPath {string} 文件所在的相对路径
     * @return {string | null} 请求成功返回请求文本，请求失败或请求超时时返回null
     **/
    goog.get = (inPath) => {
        let str;
        if (goog.files[inPath]) {
            return goog.files[inPath];
        }
        if (typeof nw === 'object') {
            const fs = require('fs');
            const path = require('path');
            if (inPath.indexOf(window.location.origin) !== -1) {
                inPath = inPath.replace(window.location.origin, nw.__dirname);
            } else {
                let dirPath;
                if (fs.existsSync(nw.__filename) && fs.statSync(nw.__filename).isFile()) {
                    dirPath = path.resolve(nw.__filename, '../');
                } else {
                    dirPath = nw.__filename;
                }
                inPath = path.resolve(dirPath, './' + inPath);
            }
            str = fs.readFileSync(inPath, 'utf-8');
        } else {
            $.ajaxSettings.async = false;
            $.get(inPath, (data) => {
                str = data;
            }, 'text').fail(() => {
                console.log(inPath, '获取失败');
            });
            $.ajaxSettings.async = true;
        }
        goog.files[inPath] = str;
        return str;
    }

    /**
     * @function 获取对应路径下JSON数据
     * @param inPath {string} JSON文件的相对路径
     * @param defaultConfig {object} 默认的JSON配置信息
     * @return {object | null} 当对应路径下文件不存在时将返回null
     **/
    goog.getJSON = (inPath, defaultValue = {}) => {
        let jsonStr = goog.get(inPath) ?? '';
        try {
            // 去除JSON字符串中的注释
            jsonStr = jsonStr.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? '' : m);
            return { ...defaultValue, ...JSON.parse(jsonStr) };
        } catch (error) {
            console.log(error);
        }
        return defaultValue;
    }

    /**
     * @function 添加依赖项
     * @param dependencies {list} 依赖列表
     * @return {void}
     **/
    goog.addDependencies = (dependencies) => {
        if (typeof dependencies !== 'object') return;
        for (let i = 0; i < dependencies.length; i++) {
            const googPath = dependencies[i].path ?? null;
            const googProvide = dependencies[i].provide ?? [];
            const googRequire = dependencies[i].require ?? [];
            if (!googPath || !googProvide || !googRequire) {
                continue;
            }
            goog.addDependency(googPath, googProvide, googRequire);
        }
    }

    /**
     * @function 将已有依赖加入到goog模块的依赖列表中，用于后续模块的加载
     * @return {void}
     **/
    goog.initDependencies = () => {
        for (let path of goog.MIXLY_DIR_PATH) {
            const depsJson = goog.getJSON(goog.normalizePath_(goog.basePath + path + '/deps.json'), {});
            if (depsJson && typeof depsJson === 'object') {
                for (let i in depsJson) {
                    depsJson[i].path = path + depsJson[i].path;
                    goog.DEPENDENCIES.push(depsJson[i]);
                }
            }
        }
        goog.addDependencies(goog.DEPENDENCIES);
    }

    goog.initDependencies();
    goog.require('Mixly.Loader');

});