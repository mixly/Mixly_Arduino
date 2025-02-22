goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Msg');
goog.provide('Mixly.XML');

const {
    Env,
    Config,
    Msg,
    XML
} = Mixly;
const { BOARD } = Config;
const { laytpl } = layui;


XML.TEMPLATE_CONFIG = [
    {
        type: 'LOADER_DIV',
        path: '/html/loader-div.html',
        config: {
            btnName: Msg.Lang['nav.btn.stop']
        },
        appendToBody: true
    }, {
        type: 'SELECTOR_DIV',
        path: '/html/selector-div.html',
        config: {
            btn1Name: Msg.Lang['nav.btn.stop'],
            btn2Name: Msg.Lang['nav.btn.ok']
        },
        appendToBody: true
    }, {
        type: 'PARSE_MIX_ERROR_DIV',
        path: '/html/parse-mix-error-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'READ_BITMAP_DIV',
        path: '/html/read-bitmap-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'PROGRESS_BAR_DIV',
        path: '/html/progress-bar-div.html',
        config: {},
        appendToBody: false
    }, {
        type: 'LIB_MANAGER_DIV',
        path: '/html/lib-manager-div.html',
        config: {},
        appendToBody: false
    }
];

XML.TEMPLATE_ENV = {
    LOADER_DIV: true,
    SELECTOR_DIV: true,
    PARSE_MIX_ERROR_DIV: true,
    READ_BITMAP_DIV: true,
    PROGRESS_BAR_DIV: goog.isElectron && BOARD?.nav?.setting?.thirdPartyLibrary,
    LIB_MANAGER_DIV: goog.isElectron && BOARD?.nav?.setting?.thirdPartyLibrary
};

XML.TEMPLATE_STR = {};

XML.TEMPLATE_STR_RENDER = {};

XML.TEMPLATE_DOM = {};

XML.CATEGORIES_STR = {};

XML.getDom = (xmlStr, config = {}) => {
    return $(laytpl(xmlStr).render(config));
}

XML.render = (xmlStr, config = {}) => {
    const newConfig = {};
    for (let i in config) {
        if (typeof config[i] === 'function') {
            newConfig[i] = config[i]();
        } else {
            newConfig[i] = config[i];
        }
    }
    return laytpl(xmlStr).render(newConfig);
}

XML.convert = function (str, trimEscaped) {
    var xml = "";
    var hasComleteAngleBracket = true;
    var lenStr = str.length;
    for (var i = 0; i < lenStr; i++) {
        if (str[i] === "<") {
            hasComleteAngleBracket = false;
        } else if (str[i] === ">") {
            hasComleteAngleBracket = true;
        }

        if (trimEscaped
            && !hasComleteAngleBracket
            && i + 1 < lenStr
            && str[i] === "\\"
            && str[i + 1] === '"') {
            i += 1;
        }

        if (!trimEscaped
            && !hasComleteAngleBracket
            && i > 0
            && str[i - 1] !== "\\"
            && str[i] === '"') {
            xml += "\\";
        }
        xml += str[i];
    }
    return xml;
}

for (let i of XML.TEMPLATE_CONFIG) {
    const { type, config, appendToBody } = i;
    if (XML.TEMPLATE_ENV[type]) {
        const xmlStr = goog.get(path.join(Env.templatePath, i.path));
        if (xmlStr) {
            XML.TEMPLATE_STR[type] = xmlStr;
            XML.TEMPLATE_STR_RENDER[type] = XML.render(xmlStr, config);
            XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
            if (appendToBody)
                $('body').append(XML.TEMPLATE_DOM[type]);
        }
    }
}

if (layui._typeof(BOARD.board) === 'object') {
    for (let i in BOARD.board) {
        const boardConfig = BOARD.board[i];
        if (layui._typeof(boardConfig) === 'object'
         && layui._typeof(boardConfig.xmlPath) === 'string') {
            const categoriesStr = goog.get(path.join(Env.boardDirPath, boardConfig.xmlPath));
            if (categoriesStr)
                XML.CATEGORIES_STR[i] = categoriesStr;
        }
    }
}

window.addEventListener('load', () => {
    for (let i of XML.TEMPLATE_CONFIG) {
        const { type, appendToBody } = i;
        if (XML.TEMPLATE_ENV[type] && XML.TEMPLATE_DOM[type] && appendToBody) {
            $('body').append(XML.TEMPLATE_DOM[type]);
        }
    }
});

});