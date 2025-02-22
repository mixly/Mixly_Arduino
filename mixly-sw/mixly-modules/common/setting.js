(() => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('layui');
goog.require('layui.loading');
goog.require('store');
goog.require('$.select2');
goog.require('Mixly.XML');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Msg');
goog.require('Mixly.BoardManager');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.MJSON');
goog.require('Mixly.Storage');
goog.require('Mixly.WebSocket.Socket');
goog.provide('Mixly.Setting');

const {
    XML,
    LayerExt,
    Msg,
    BoardManager,
    Config,
    Env,
    MJSON,
    Storage,
    Setting
} = Mixly;

const { LANG } = Msg;
const { element, form, loading, layer } = layui;
const { USER, SOFTWARE } = Config;

Setting.ID = 'setting-menu';
Setting.CONFIG = {}
Setting.nowIndex = 0;
Setting.config = {};

Setting.init = () => {
    element.tab({
        headerElem: '#setting-menu-options>li',
        bodyElem: '#setting-menu-body>.menu-body'
    });
    element.render('nav', 'setting-menu-filter');
    Setting.addOnchangeOptionListener();

    form.on('switch(setting-theme-filter)', function(data) {
        const { checked } = data.elem;
        USER.theme = checked ? 'dark' : 'light';
        $('body').removeClass('dark light')
                 .addClass(USER.theme);
        $('html').attr('data-bs-theme', USER.theme);
        Storage.user('/', USER);
    });

    form.on('submit(open-setting-dialog-filter)', function(data) {
        Setting.onclick();
        return false;
    });

    form.on('submit(board-reset-filter)', function(data) {
        BoardManager.resetBoard((error) => {
            if (error) {
                console.log(error);
            }
            BoardManager.screenWidthLevel = -1;
            BoardManager.screenHeightLevel = -1;
            BoardManager.loadBoards();
            BoardManager.updateBoardsCard();
        });
        return false;
    });
}

Setting.menuInit = () => {
    $('#setting-menu-options').children('.layui-this').removeClass('layui-this');
    $('#setting-menu-options').children('li').first().addClass('layui-this');
    $('#setting-menu-body').children('.layui-show').removeClass('layui-show');
    $('#setting-menu-body').children('div').first().addClass('layui-show');
    form.render(null, 'setting-form-filter');
    form.val('setting-form-filter', USER);
}

Setting.onclick = () => {
    Setting.menuInit();
    let obj = $(".setting-menu-item").select2({
        width: '100%',
        minimumResultsForSearch: 10
    });
    Setting.configMenuSetValue(obj, USER);
    element.render('collapse', 'menu-user-collapse-filter');
    Setting.nowIndex = 0;
    LayerExt.open({
        title: [Msg.getLang('SETTING'), '36px'],
        id: 'setting-menu-layer',
        content: $('#' + Setting.ID),
        shade: LayerExt.SHADE_ALL,
        area: ['50%', '50%'],
        min: ['400px', '200px'],
        success: () => {
        }
    });
    $('#setting-menu-user button').off().click((event) => {
        const type = $(event.currentTarget).attr('value');
        switch (type) {
        case 'apply':
            let oldTheme = USER.themeAuto? 'auto' : USER.theme;
            let oldLanglage = USER.languageAuto? 'auto' : USER.language;
            let updateTheme = false, updateLanguage = false;
            let value = Setting.configMenuGetValue(obj);
            for (let i in value) {
                USER[i] = value[i];
            }
            updateTheme = oldTheme !== USER.theme;
            updateLanguage = oldLanglage !== USER.language;
            if (updateTheme) {
                if (USER.theme === 'auto') {
                    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
                    USER.theme = themeMedia.matches ? 'light' : 'dark';
                    USER.themeAuto = true;
                } else {
                    USER.themeAuto = false;
                }
                $('body').removeClass('dark light')
                         .addClass(USER.theme);
                $('html').attr('data-bs-theme', USER.theme);
            }
            if (updateLanguage) {
                if (USER.language === 'auto') {
                    switch (navigator.language) {
                        case 'zh-CN':
                            USER.language = 'zh-hans';
                            break;
                        case 'zh-HK':
                        case 'zh-SG':
                        case 'zh-TW':
                            USER.language = 'zh-hant';
                            break;
                        default:
                            USER.language = 'en';
                    }
                    USER.languageAuto = true;
                } else {
                    USER.languageAuto = false;
                }
                Msg.nowLang = USER.language ?? 'zh-hans';
            }
            if (updateTheme || updateLanguage) {
                BoardManager.screenWidthLevel = -1;
                BoardManager.screenHeightLevel = -1;
                BoardManager.updateBoardsCard();
            }
            Storage.user('/', USER);
            layer.closeAll(() => {
                XML.renderAllTemplete();
                layer.msg(Msg.getLang('CONFIG_UPDATE_SUCC'), { time: 1000 });
            });
            break;
        case 'reset':
            Setting.configMenuReset(obj);
            break;
        }
    }); 
}

Setting.addOnchangeOptionListener = () => {
    element.on('tab(setting-menu-filter)', function(data) {
        const { index } = data;
        if (index === 1) {
            if (data.index !== Setting.nowIndex) {
                goog.isElectron && BoardManager.onclickImportBoards();
            } else {
                layui.table.resize('cloud-boards-table');
            }
        } else if (index === 2) {
            if (data.index !== Setting.nowIndex) {
                $('#setting-menu-update').loading({
                    background: USER.theme === 'dark' ? '#807b7b' : '#fff',
                    opacity: 1,
                    animateTime: 0,
                    imgSrc: 1
                });
                const { Socket } = Mixly.WebSocket;
                Socket.updating = true;
                Socket.sendCommand({
                    obj: 'Socket',
                    func: 'getConfigByUrl',
                    args: [ SOFTWARE.configUrl ]
                });
            }
        }
        Setting.nowIndex = index;
    });
}

Setting.configMenuReset = (obj) => {
    for (let i = 0; i < obj.length; i++) {
        let $item = $(obj[i]);
        let newValue = $item.children('option').first().val();
        $item.val(newValue).trigger("change");
    }
}

Setting.configMenuSetValue = (obj, value) => {
    let newValue = { ...value };
    if (value.themeAuto) {
        newValue.theme = 'auto';
    }
    if (value.languageAuto) {
        newValue.language = 'auto';
    }
    for (let i = 0; i < obj.length; i++) {
        let $item = $(obj[i]);
        let type = $item.attr('value');
        if (!newValue[type]) {
            continue;
        }
        $item.val(newValue[type]).trigger("change");
    }
}

Setting.configMenuGetValue = (obj) => {
    let config = {};
    for (let i = 0; i < obj.length; i++) {
        let $item = $(obj[i]);
        config[$item.attr('value')] = $item.val();
    }
    return config;
}

Setting.refreshUpdateMenuStatus = (config) => {
    console.log(config);
    const {
        serverVersion
    } = config;
    let $serverDiv = $('#setting-menu-update-server');
    let $btnDiv = $('#setting-menu-update > div:nth-child(2)');
    $serverDiv.find('span').css('display', 'none');
    let needUpdateServer = false;
    if (serverVersion && serverVersion !== SOFTWARE.serverVersion) {
        $serverDiv.find('span[value="obsolete"]').css('display', 'inline-block');
        needUpdateServer = true;
        $serverDiv.find('text').text(`${SOFTWARE.serverVersion} → ${serverVersion}`);
    } else {
        $serverDiv.find('span[value="latest"]').css('display', 'inline-block');
        $serverDiv.find('text').text(SOFTWARE.serverVersion);
    }
    if (needUpdateServer) {
        $btnDiv.css('display', 'flex');
        $btnDiv.children('button').off().click((event) => {
            LayerExt.open({
                title: Msg.getLang('PROGRESS'),
                id: 'setting-menu-update-layer',
                shade: LayerExt.SHADE_ALL,
                area: ['40%', '60%'],
                max: ['800px', '300px'],
                min: ['500px', '100px'],
                success: (layero, index) => {
                    $('#setting-menu-update-layer').css('overflow', 'hidden');
                    layero.find('.layui-layer-setwin').css('display', 'none');
                    Setting.ace = Setting.createAceEditor('setting-menu-update-layer');
                    Setting.ace.resize();
                    const { Socket } = Mixly.WebSocket;
                    Socket.sendCommand({
                        obj: 'Socket',
                        func: 'updateSW',
                        args: []
                    });
                },
                resizing: (layero) => {
                    Setting.ace.resize();
                },
                end: () => {
                }
            });
        });
    } else {
        $btnDiv.css('display', 'none');
    }
    setTimeout(() => {
        $('#setting-menu-update').loading('destroy');
    }, 500);
}

Setting.showUpdateMessage = (data) => {
    Setting.ace.updateSelectionMarkers();
    const { selection, session } = Setting.ace;
    const initCursor = selection.getCursor();
    Setting.ace.gotoLine(session.getLength());
    selection.moveCursorLineEnd();
    Setting.ace.insert(data);
    Setting.ace.gotoLine(session.getLength());
    selection.moveCursorLineEnd();
}

Setting.createAceEditor = (container, language = 'txt', tabSize = 4) => {
    let codeEditor = ace.edit(container);
    if (USER.theme === 'dark') {
        codeEditor.setTheme('ace/theme/dracula');
    } else {
        codeEditor.setTheme('ace/theme/xcode');
    }
    codeEditor.getSession().setMode(`ace/mode/${language}`);
    codeEditor.getSession().setTabSize(tabSize);
    codeEditor.setFontSize(15);
    codeEditor.setShowPrintMargin(false);
    codeEditor.setReadOnly(true);
    codeEditor.setScrollSpeed(0.8);
    codeEditor.setShowPrintMargin(false);
    codeEditor.renderer.setShowGutter(false);
    codeEditor.setValue('', -1);
    return codeEditor;
}

})();