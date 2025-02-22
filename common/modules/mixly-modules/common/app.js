goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Drag');
goog.require('Mixly.Nav');
goog.require('Mixly.Workspace');
goog.require('Mixly.FooterBar');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Debug');
goog.require('Mixly.Component');
goog.require('Mixly.EditorMix');
goog.require('Mixly.Electron.Loader');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Electron.File');
goog.require('Mixly.Electron.LibManager');
goog.require('Mixly.Electron.Serial');
goog.require('Mixly.Electron.ArduShell');
goog.require('Mixly.Electron.BU');
goog.require('Mixly.Electron.PythonShell');
goog.require('Mixly.Web.BU');
goog.require('Mixly.Web.FS');
goog.require('Mixly.Web.File');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.WebSocket.File');
goog.require('Mixly.WebSocket.Serial');
goog.require('Mixly.WebSocket.ArduShell');
goog.require('Mixly.WebSocket.BU');
goog.provide('Mixly.App');

const {
    Url,
    Config,
    Env,
    Msg,
    Drag,
    Nav,
    Workspace,
    FooterBar,
    HTMLTemplate,
    LayerExt,
    Debug,
    Component,
    EditorMix,
    Electron = {},
    Web = {},
    WebSocket = {}
} = Mixly;

const { Loader } = Electron;

let currentObj = null;

if (goog.isElectron) {
    currentObj = Electron;
} else {
    if (Env.hasSocketServer) {
        currentObj = WebSocket;
    } else {
        currentObj = Web;
    }
}

const {
    FS,
    File,
    LibManager,
    ArduShell,
    BU,
    PythonShell,
    Serial
} = currentObj;

const { BOARD, SELECTED_BOARD } = Config;

const { layer } = layui;

const electron = Mixly.require('electron');


class App extends Component {
    static {
        HTMLTemplate.add(
            'html/app.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/app.html')))
        );
    }

    #resizeObserver_ = null;
    #workspace_ = null;
    #nav_ = null;
    #footerbar_ = null;

    constructor(element) {
        super();
        const $content = $(HTMLTemplate.get('html/app.html').render());
        $content.on('contextmenu', (e) => e.preventDefault());
        this.setContent($content);
        this.mountOn($(element));
        this.#nav_ = new Nav();
        this.#nav_.mountOn($content.find('.mixly-nav'));
        this.#workspace_ = new Workspace($content.find('.mixly-workspace')[0]);
        this.#workspace_.getEditorsManager().getTabs().addTab({
            name: 'Untitled-1.mix',
            title: 'Untitled-1.mix',
            type: '.mix',
            favicon: 'fileicon-mix'
        });
        this.#footerbar_ = new FooterBar();
        this.#footerbar_.mountOn($content.find('.mixly-footerbar'));
        this.#addEventsListenerForNav_();
        this.#addEventsListenerForWorkspace_();
        this.#addObserver_();
        Mixly.mainStatusBarTabs = this.#workspace_.getStatusBarsManager();
        Serial.refreshPorts();
        if (goog.isElectron) {
            PythonShell.init();
        }
    }

    #addEventsListenerForNav_() {
        const editorsManager = this.#workspace_.getEditorsManager();
        this.#nav_.register({
            id: 'home-btn',
            preconditionFn: () => {
                return true;
            },
            callback: () => {
                this.#onbeforeunload_();
            },
            scopeType: Nav.Scope.LEFT,
            weight: -1
        });
        this.#nav_.register({
            icon: 'icon-ccw',
            title: 'undo(ctrl+z)',
            id: 'undo-btn',
            displayText: Msg.Lang['nav.btn.undo'],
            preconditionFn: () => {
                return !!editorsManager.getActive();
            },
            callback: () => editorsManager.getActive().undo(),
            scopeType: Nav.Scope.LEFT,
            weight: 0
        });
        this.#nav_.register({
            icon: 'icon-cw',
            title: 'redo(ctrl+y)',
            id: 'redo-btn',
            displayText: Msg.Lang['nav.btn.redo'],
            preconditionFn: () => {
                return !!editorsManager.getActive();
            },
            callback: () => editorsManager.getActive().redo(),
            scopeType: Nav.Scope.LEFT,
            weight: 1
        });

        this.#nav_.register({
            icon: 'icon-link',
            title: '',
            id: 'port-add-btn',
            displayText: Msg.Lang['nav.btn.addDevice'],
            preconditionFn: () => {
                if (goog.isElectron || Env.hasSocketServer) {
                    return false;
                }
                return true;
            },
            callback: () => BU.requestPort().catch(Debug.error),
            scopeType: Nav.Scope.LEFT,
            weight: 3
        });

        this.#nav_.register({
            icon: 'icon-check',
            title: '',
            id: 'arduino-compile-btn',
            displayText: Msg.Lang['nav.btn.compile'],
            preconditionFn: () => {
                if (!goog.isElectron && !Env.hasSocketServer && !Env.hasCompiler) {
                    return false;
                }
                if (!SELECTED_BOARD?.nav?.compile || !SELECTED_BOARD?.nav?.upload) {
                    return false;
                }
                const workspace = Workspace.getMain();
                const editorsManager = workspace.getEditorsManager();
                const editor = editorsManager.getActive();
                if (!editor) {
                    return false;
                }
                if (editor instanceof EditorMix) {
                    return true;
                }
                return false;
            },
            callback: () => ArduShell.initCompile(),
            scopeType: Nav.Scope.LEFT,
            weight: 4
        });

        this.#nav_.register({
            icon: 'icon-upload',
            title: '',
            id: 'arduino-upload-btn',
            displayText: Msg.Lang['nav.btn.upload'],
            preconditionFn: () => {
                if (!goog.isElectron && !Env.hasSocketServer && !Env.hasCompiler) {
                    return false;
                }
                if (!SELECTED_BOARD?.nav?.compile || !SELECTED_BOARD?.nav?.upload) {
                    return false;
                }
                const workspace = Workspace.getMain();
                const editorsManager = workspace.getEditorsManager();
                const editor = editorsManager.getActive();
                if (!editor) {
                    return false;
                }
                if (editor instanceof EditorMix) {
                    return true;
                }
                return false;
            },
            callback: () => ArduShell.initUpload(),
            scopeType: Nav.Scope.LEFT,
            weight: 5
        });

        this.#nav_.register({
            icon: 'icon-upload-1',
            title: '',
            id: 'command-burn-btn',
            displayText: Msg.Lang['nav.btn.burn'],
            preconditionFn: () => {
                if (!goog.isElectron && !goog.hasSocketServer && Serial.type !== 'serialport') {
                    return false;
                }
                return SELECTED_BOARD?.nav?.burn;
            },
            callback: () => BU.initBurn(),
            scopeType: Nav.Scope.LEFT,
            weight: 3
        });

        this.#nav_.register({
            icon: 'icon-upload',
            title: '',
            id: 'command-upload-btn',
            displayText: Msg.Lang['nav.btn.upload'],
            preconditionFn: () => {
                return SELECTED_BOARD?.nav?.upload && !SELECTED_BOARD?.nav?.compile;
            },
            callback: () => BU.initUpload(),
            scopeType: Nav.Scope.LEFT,
            weight: 5
        });

        this.#nav_.register({
            icon: 'icon-play-circled',
            title: '',
            id: 'python-run-btn',
            displayText: Msg.Lang['nav.btn.run'],
            preconditionFn: () => {
                return goog.isElectron && SELECTED_BOARD?.nav?.run;
            },
            callback: () => PythonShell.run(),
            scopeType: Nav.Scope.LEFT,
            weight: 4
        });

        this.#nav_.register({
            icon: 'icon-cancel',
            title: '',
            id: 'python-stop-btn',
            displayText: Msg.Lang['nav.btn.stop'],
            preconditionFn: () => {
                return goog.isElectron && SELECTED_BOARD?.nav?.cancel;
            },
            callback: () => PythonShell.stop(),
            scopeType: Nav.Scope.LEFT,
            weight: 5
        });

        this.#nav_.register({
            icon: 'icon-usb',
            title: '',
            id: 'serial-open-btn',
            displayText: Msg.Lang['statusbar.serial.port'],
            preconditionFn: () => {
                return true;
            },
            callback: () => {
                const statusBarsManager = this.#workspace_.getStatusBarsManager();
                statusBarsManager.openSelectedPort();
            },
            scopeType: Nav.Scope.LEFT,
            weight: 10
        });

        /*const leftSideBarOption = this.#nav_.register({
            icon: 'codicon-layout-sidebar-left-off',
            title: '操作左侧边栏',
            id: 'left-sidebar-btn',
            preconditionFn: () => {
                return true;
            },
            callback: (element) => {
                const $a = $(element).children('a');
                const drag = this.#workspace_.dragVLeft;
                if (drag.shown === Drag.Extend.NEGATIVE) {
                    drag.exitfull(Drag.Extend.NEGATIVE);
                } else {
                    drag.full(Drag.Extend.NEGATIVE);
                }
            },
            scopeType: Nav.Scope.CENTER,
            weight: 1
        });

        const leftSideBarEvents = this.#workspace_.dragVLeft;
        leftSideBarEvents.bind('onfull', (type) => {
            const { $btn } = leftSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.NEGATIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-left');
            $a.addClass('codicon-layout-sidebar-left-off');
        });

        leftSideBarEvents.bind('exitfull', (type) => {
            const { $btn } = leftSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.NEGATIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-left-off');
            $a.addClass('codicon-layout-sidebar-left');
        });

        const rightSideBarOption = this.#nav_.register({
            icon: 'codicon-layout-sidebar-right-off',
            title: '操作右侧边栏',
            id: 'right-sidebar-btn',
            preconditionFn: () => {
                return true;
            },
            callback: (element) => {
                const $a = $(element).children('a');
                const drag = this.#workspace_.dragVRight;
                if (drag.shown === Drag.Extend.POSITIVE) {
                    drag.exitfull(Drag.Extend.POSITIVE);
                } else {
                    drag.full(Drag.Extend.POSITIVE);
                }
            },
            scopeType: Nav.Scope.CENTER,
            weight: 3
        });

        const rightSideBarEvents = this.#workspace_.dragVRight;
        rightSideBarEvents.bind('onfull', (type) => {
            const { $btn } = rightSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-right');
            $a.addClass('codicon-layout-sidebar-right-off');
        });

        rightSideBarEvents.bind('exitfull', (type) => {
            const { $btn } = rightSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-sidebar-right-off');
            $a.addClass('codicon-layout-sidebar-right');
        });*/

        const bottomSideBarOption = this.#nav_.register({
            icon: 'codicon-layout-panel-off',
            title: Msg.Lang['nav.btn.toggleStatusbar'],
            id: 'bottom-sidebar-btn',
            preconditionFn: () => {
                return true;
            },
            callback: (element) => {
                const $a = $(element).children('a');
                const drag = this.#workspace_.dragH;
                if (drag.shown === Drag.Extend.POSITIVE) {
                    drag.exitfull(Drag.Extend.POSITIVE);
                } else {
                    drag.full(Drag.Extend.POSITIVE);
                }
            },
            scopeType: Nav.Scope.CENTER,
            weight: 2
        });

        const bottomSideBarEvents = this.#workspace_.dragH;
        bottomSideBarEvents.bind('onfull', (type) => {
            const { $btn } = bottomSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-panel');
            $a.addClass('codicon-layout-panel-off');
        });

        bottomSideBarEvents.bind('exitfull', (type) => {
            const { $btn } = bottomSideBarOption;
            const $a = $btn.children('a');
            if (type !== Drag.Extend.POSITIVE) {
                return;
            }
            $a.removeClass('codicon-layout-panel-off');
            $a.addClass('codicon-layout-panel');
        });

        this.#nav_.register({
            id: 'file',
            displayText: Msg.Lang['nav.btn.file'],
            preconditionFn: () => {
                return true;
            },
            scopeType: Nav.Scope.RIGHT,
            weight: 1
        });

        this.#nav_.register({
            icon: 'icon-doc-new',
            id: ['file', 'new-file'],
            displayText: Msg.Lang['nav.btn.file.new'],
            preconditionFn: () => {
                return true;
            },
            callback: () => File.new(),
            scopeType: Nav.Scope.RIGHT,
            weight: 1
        });

        this.#nav_.register({
            icon: 'icon-doc',
            id: ['file', 'open-file'],
            displayText: Msg.Lang['nav.btn.file.open'],
            preconditionFn: () => {
                return true;
            },
            callback: (elem) => File.open(),
            scopeType: Nav.Scope.RIGHT,
            weight: 2
        });

        this.#nav_.register({
            id: ['file', 'hr'],
            scopeType: Nav.Scope.RIGHT,
            weight: 3
        });

        this.#nav_.register({
            icon: 'icon-floppy',
            id: ['file', 'save-file'],
            displayText: Msg.Lang['nav.btn.file.save'],
            preconditionFn: () => {
                return true;
            },
            callback: (elem) => File.save(),
            scopeType: Nav.Scope.RIGHT,
            weight: 4
        });

        this.#nav_.register({
            icon: 'icon-save-as',
            id: ['file', 'save-as-file'],
            displayText: Msg.Lang['nav.btn.file.saveAs'],
            preconditionFn: () => {
                return true;
            },
            callback: () => File.saveAs(),
            scopeType: Nav.Scope.RIGHT,
            weight: 5
        });

        this.#nav_.register({
            id: ['file', 'hr'],
            preconditionFn: () => {
                return goog.isElectron && BOARD?.nav?.setting?.thirdPartyLibrary;
            },
            scopeType: Nav.Scope.RIGHT,
            weight: 6
        });

        this.#nav_.register({
            icon: 'icon-export',
            id: ['file', 'export-file'],
            displayText: Msg.Lang['nav.btn.file.exportAs'],
            preconditionFn: () => {
                return goog.isElectron && BOARD?.nav?.setting?.thirdPartyLibrary;
            },
            callback: (elem) => File.exportLib(),
            scopeType: Nav.Scope.RIGHT,
            weight: 7
        });

        this.#nav_.register({
            id: 'setting',
            displayText: Msg.Lang['nav.btn.setting'],
            preconditionFn: () => {
                return true;
            },
            scopeType: Nav.Scope.RIGHT,
            weight: 1
        });

        this.#nav_.register({
            icon: 'icon-menu',
            id: ['setting', 'manage-libs'],
            displayText: Msg.Lang['nav.btn.setting.manageLibs'],
            preconditionFn: () => {
                return goog.isElectron && BOARD?.nav?.setting?.thirdPartyLibrary;
            },
            callback: () => LibManager.showManageDialog(),
            scopeType: Nav.Scope.RIGHT,
            weight: 1
        });

        /*this.#nav_.register({
            icon: 'icon-upload-1',
            id: ['setting', 'firmware'],
            displayText: Msg.Lang['nav.btn.setting.firmware'],
            preconditionFn: () => {
                if (goog.isElectron) {
                    return !!BOARD?.burn?.special;
                } else {
                    return !!BOARD?.web?.burn?.special;
                }
            },
            callback: () => BU.burnWithSpecialBin(),
            scopeType: Nav.Scope.RIGHT,
            weight: 2
        });*/

        this.#nav_.register({
            icon: 'icon-comment-1',
            id: ['setting', 'feedback'],
            displayText: Msg.Lang['nav.btn.setting.feedback'],
            preconditionFn: () => {
                return true;
            },
            callback: (elem) => {
                const href = 'https://gitee.com/mixly2/mixly2.0_src/issues';
                Url.open(href);
            },
            scopeType: Nav.Scope.RIGHT,
            weight: 2
        });
    }

    #addEventsListenerForWorkspace_() {
        const editorsManager = this.#workspace_.getEditorsManager();
        const editorTabs = editorsManager.getTabs();

        editorTabs.bind('tabCheckDestroy', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const editor = editorsManager.get(id);
            if (!editor) {
                return;
            }
            if (editor.isDirty()) {
                layer.confirm(`是否保存对${path.basename(id)}的修改？`, {
                    title: false,
                    shade: LayerExt.SHADE_ALL,
                    resize: false,
                    btn: ['保存', '不保存', '取消'],
                    closeBtn: 1,
                    btn1: (index) => {
                        const $tab = editor.getTab();
                        if ($tab.attr('data-link-file') === 'true') {
                            FS.writeFile($tab.attr('data-tab-id'), editor.getValue())
                            .then(() => {
                                editor.removeDirty();
                                editorsManager.remove(id);
                                layer.close(index);
                                layer.msg('已保存文件');
                            })
                            .catch(Debug.error);
                        } else {
                            FS.showSaveFilePicker(id, $tab.attr('data-tab-type'))
                            .then((filePath) => {
                                if (!filePath) {
                                    return Promise.resolve(true);
                                }
                                return FS.writeFile(filePath, editor.getValue());
                            })
                            .then((status) => {
                                if (status) {
                                    return;
                                }
                                editor.removeDirty();
                                editorsManager.remove(id);
                                layer.close(index);
                                layer.msg('已保存文件');
                            })
                            .catch(Debug.error);
                        }
                    },
                    btn2: (index) => {
                        editor.removeDirty();
                        editorsManager.remove(id);
                        layer.close(index);
                    },
                    btn3: (index) => {
                        layer.close(index);
                    },
                    success: (layero) => {
                        const { classList } = layero[0].childNodes[1].childNodes[0];
                        classList.remove('layui-layer-close2');
                        classList.add('layui-layer-close1');
                    }
                });
            }
            return !editor.isDirty();
        });
    }

    #addObserver_() {
        this.#resizeObserver_ = new ResizeObserver((entries) => {
            let contentRect = entries[0].contentRect;
            if (!(contentRect.width || contentRect.height)) return;
            this.resize();
        });
        this.#resizeObserver_.observe(this.getContent()[0]);
    }

    #onbeforeunload_() {
        if (goog.isElectron) {
            Loader.onbeforeunload();
        } else {
            let href = Config.pathPrefix + 'index.html?' + Url.jsonToUrl({ boardType: BOARD.boardType });
            window.location.replace(href);
        }
    }

    getNav() {
        return this.#nav_;
    }

    getWorkspace() {
        return this.#workspace_;
    }

    getFooterBar() {
        return this.#footerbar_;
    }

    resize() {
        this.#nav_.resize();
        this.#workspace_.resize();
        this.#footerbar_.resize();
    }

    removeSkeleton() {
        const $appLoading = $('.mixly-app-loading');
        $appLoading.remove();
    }

    dispose() {
        this.#resizeObserver_.disconnect();
        this.#workspace_.dispose();
        super.dispose();
    }
}

Mixly.App = App;

});