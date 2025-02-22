(() => {

goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Msg');
goog.provide('Mixly.XML');

const { Env, Config, Msg, XML } = Mixly;
const { SOFTWARE, USER } = Config;
const { laytpl } = layui;

XML.TEMPLATE_DIR_PATH = './mixly-sw/templete';

let env = 'electron';
if (Env.hasSocketServer) {
    env = 'web-socket';
} else if (Env.hasCompiler) {
    env = 'web-compiler';
}
if (env === 'electron' && !goog.isElectron) {
    env = 'web';
}

XML.TEMPLATE_CONFIG = [
    {
        type: 'SETTING_DIV',
        path: '/setting-div.html',
        config: {
            env,
            personalise: () => {
                return Msg.getLang('PERSONAL');
            },
            theme: () => {
                return Msg.getLang('THEME');
            },
            light: () => {
                return Msg.getLang('LIGHT');
            },
            dark: () => {
                return Msg.getLang('DARK');
            },
            language: () => {
                return Msg.getLang('LANGUAGE');
            },
            autoUpdate: () => {
                return Msg.getLang('AUTO_CHECK_UPDATE');
            },
            blockRenderer: () => {
                return Msg.getLang('BLOCKS_RENDER');
            },
            apply: () => {
                return Msg.getLang('APPLY');
            },
            reset: () => {
                return Msg.getLang('RESET');
            },
            compileCAndH: () => {
                return Msg.getLang('COMPILE_WITH_OTHERS');
            },
            autoOpenPort: () => {
                return Msg.getLang('AUTO_OPEN_SERIAL_PORT');
            },
            autoWithSys: () => {
                return Msg.getLang('FOLLOW_SYS');
            },
            yes: () => {
                return Msg.getLang('ENABLE');
            },
            no: () => {
                return Msg.getLang('DISABLE');
            },
            manageBoard: () => {
                return Msg.getLang('MANAGE_BOARD');
            },
            resetBoard: () => {
                return Msg.getLang('RESET_BOARD');
            },
            importBoard: () => {
                return Msg.getLang('IMPORT_BOARD');
            },
            softwareSettings: () => {
                return Msg.getLang('SOFTWARE');
            },
            boardSettings: () => {
                return Msg.getLang('BOARD');
            },
            checkForUpdates: () => {
                return Msg.getLang('UPDATE');
            },
            server: () => {
                return Msg.getLang('SERVER');
            },
            client: () => {
                return Msg.getLang('CLIENT');
            },
            version: () => {
                return Msg.getLang('VERSION');
            },
            latest: () => {
                return Msg.getLang('LATEST');
            },
            obsolete: () => {
                return Msg.getLang('TO_BE_UPDATED');
            },
            update: () => {
                return Msg.getLang('UPDATE');
            },
            experimental: () => {
                return Msg.getLang('EXPERIMENTAL');
            },
            blocklyContentHighlight: () => {
                return Msg.getLang('WORKSPACE_HIGHLIGHT');
            },
            blocklyShowGrid: () => {
                return Msg.getLang('WORKSPACE_GRID');
            },
            blocklyShowMinimap: () => {
                return Msg.getLang('WORKSPACE_MINIMAP');
            },
            blocklyMultiselect: () => {
                return Msg.getLang('WORKSPACE_MULTISELECT');
            }
        },
        appendToBody: true,
        generateDom: false,
        render: true
    }, {
        type: 'PROGRESS_BAR_DIV',
        path: '/progress-bar-div.html',
        config: {},
        appendToBody: false,
        generateDom: false,
        render: false
    }, {
        type: 'LOADER_DIV',
        path: '/loader-div.html',
        config: {
            btnName: () => {
                return Msg.getLang('CANCEL');
            }
        },
        appendToBody: true,
        generateDom: false,
        render: true
    }, {
        type: 'INTERFACE',
        path: '/interface.html',
        config: {},
        appendToBody: false,
        generateDom: false,
        render: false
    }
];

XML.TEMPLATE_ENV = {
    SETTING_DIV: true,
    PROGRESS_BAR_DIV: true,
    LOADER_DIV: true,
    INTERFACE: true
};

XML.TEMPLATE_STR = {};

XML.TEMPLATE_STR_RENDER = {};

XML.TEMPLATE_DOM = {};

XML.render = (xmlStr, config = {}) => {
    const newConfig = {};
    for (let i in config) {
        if (typeof config[i] === 'function')
            newConfig[i] = config[i]();
        else
            newConfig[i] = config[i];
    }
    return laytpl(xmlStr).render(newConfig);
}

XML.renderAllTemplete = () => {
    for (let i of XML.TEMPLATE_CONFIG) {
        const {
            type,
            config,
            appendToBody,
            render
        } = i;
        if (render && XML.TEMPLATE_ENV[type]) {
            const xmlStr = XML.TEMPLATE_STR[type];
            XML.TEMPLATE_STR_RENDER[type] = XML.render(xmlStr);
            if (appendToBody) {
                $('*[mxml-id="' + type + '"]').remove();
                XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
                XML.TEMPLATE_DOM[type].attr('mxml-id', type);
                $('body').append(XML.TEMPLATE_DOM[type]);
            }
        }
    }
}

XML.getDom = (xmlStr, config = {}) => {
    return $(XML.render(xmlStr, config));
}

for (let i of XML.TEMPLATE_CONFIG) {
    const {
        type,
        path,
        config,
        appendToBody,
        generateDom
    } = i;
    if (XML.TEMPLATE_ENV[type]) {
        const xmlStr = goog.get(XML.TEMPLATE_DIR_PATH + path);
        if (xmlStr) {
            XML.TEMPLATE_STR[type] = xmlStr;
            if (generateDom) {
                XML.TEMPLATE_STR_RENDER[type] = XML.render(xmlStr, config);
                XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
            }
            if (appendToBody) {
                if (!XML.TEMPLATE_DOM[type]) {
                    XML.TEMPLATE_DOM[type] = XML.getDom(xmlStr, config);
                }
                XML.TEMPLATE_DOM[type].attr('mxml-id', type);
                $('body').append(XML.TEMPLATE_DOM[type]);
            }
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

})();