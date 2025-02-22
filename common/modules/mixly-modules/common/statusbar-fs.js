goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mprogress');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.PageBase');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Debug');
goog.require('Mixly.Component');
goog.require('Mixly.Registry');
goog.require('Mixly.Serial');
goog.require('Mixly.FSBoardHandler');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Electron.FSBoard');
goog.provide('Mixly.StatusBarFS');

const {
    Env,
    Msg,
    PageBase,
    HTMLTemplate,
    Debug,
    Component,
    Registry,
    Serial,
    FSBoardHandler,
    Electron = {}
} = Mixly;

const { FS, FSBoard } = Electron;

const { layer } = layui;

const os = Mixly.require('os');


class Panel extends Component {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-fs-panel.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-fs-panel.html')))
        );
    }

    #$folderInput_ = null;
    #$closeBtn_ = null;
    #$selectFolderBtn_ = null;
    #$downloadBtn_ = null;
    #$uploadBtn_ = null;
    #$fsSelect_ = null;
    #$progress_ = null;
    #folderPath_ = '';
    #fs_ = 'default';
    #opened_ = false;

    constructor() {
        super();
        const template = HTMLTemplate.get('html/statusbar/statusbar-fs-panel.html');
        const $content = $(template.render({
            mapFolder: Msg.Lang['statusbar.fs.mapFolder'],
            comment: Msg.Lang['statusbar.fs.comment'],
            commentInfo: Msg.Lang['statusbar.fs.commentInfo'],
            filesystem: Msg.Lang['statusbar.fs.filesystem'],
            path: Msg.Lang['statusbar.fs.path'],
            selectFolder: Msg.Lang['statusbar.fs.selectFolder'],
            download: Msg.Lang['statusbar.fs.download'],
            upload: Msg.Lang['statusbar.fs.upload']
        }));
        this.setContent($content);
        this.#$folderInput_ = $content.find('.folder-input');
        this.#$closeBtn_ = $content.find('.close-btn');
        this.#$selectFolderBtn_ = $content.find('.folder-btn');
        this.#$downloadBtn_ = $content.find('.download-btn');
        this.#$uploadBtn_ = $content.find('.upload-btn');
        this.#$fsSelect_ = $content.find('.fs-type');
        this.#$progress_ = $content.find('.progress');
        this.addEventsType(['download', 'upload']);
        this.#addEventsListener_();
        this.#$fsSelect_.select2({
            width: '100%',
            minimumResultsForSearch: 50,
            dropdownCssClass: 'mixly-scrollbar'
        });
    }

    #addEventsListener_() {
        this.#$fsSelect_.on('select2:select', (event) => {
            const { data } = event.params;
            this.#fs_ = data.id;
        });

        this.#$closeBtn_.click(() => {
            this.dispose();
        });

        this.#$selectFolderBtn_.click(() => {
            FS.showDirectoryPicker()
            .then((folderPath) => {
                if (!folderPath) {
                    return;
                }
                this.#folderPath_ = path.join(folderPath);
                this.#$folderInput_.val(this.#folderPath_);
            })
            .catch(Debug.error);
        });

        this.#$downloadBtn_.click(() => {
            this.#checkFolder_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.runEvent('download', {
                    folderPath: this.#folderPath_,
                    fsType: this.#fs_
                });
            })
            .catch(Debug.error);
        });

        this.#$uploadBtn_.click(() => {
            this.#checkFolder_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.runEvent('upload', {
                    folderPath: this.#folderPath_,
                    fsType: this.#fs_
                });
            })
            .catch(Debug.error);
        });
    }

    #checkFolder_() {
        return new Promise((resolve, reject) => {
            if (!this.#folderPath_) {
                layer.msg(Msg.Lang['statusbar.fs.localFolderNotExist'], { time: 1000 });
                resolve(false);
                return;
            }
            FS.isDirectory(this.#folderPath_)
            .then((status) => {
                if (status) {
                    resolve(true);
                } else {
                    layer.msg(Msg.Lang['statusbar.fs.localFolderNotExist'], { time: 1000 });
                    resolve(false);
                }
            })
            .catch(reject);
        });
    }

    setFSMenu(menu) {
        this.#$fsSelect_.empty();
        this.#fs_ = menu[0].id;
        for (let i in menu) {
            this.#$fsSelect_.append(new Option(menu[i].text, menu[i].id));
        }
    }

    setStatus(isOpened) {
        if (this.#opened_ === isOpened) {
            return;
        }
        this.#opened_ = isOpened;
        if (isOpened) {
            this.#$progress_.css('display', 'block');
        } else {
            this.#$progress_.css('display', 'none');
        }
    }

    dispose() {
        this.#$fsSelect_.select2('destroy');
        this.#$folderInput_ = null;
        this.#$closeBtn_ = null;
        this.#$selectFolderBtn_ = null;
        this.#$downloadBtn_ = null;
        this.#$uploadBtn_ = null;
        this.#$fsSelect_ = null;
        this.#$progress_ = null;
        super.dispose();
    }
}


class StatusBarFS extends PageBase {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-fs.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-fs.html')))
        );
    }

    #$btn_ = null;
    #$mask_ = null;
    #fsBoard_ = null;
    #registry_ = new Registry();
    #opened_ = false;

    constructor() {
        super();
        const template = HTMLTemplate.get('html/statusbar/statusbar-fs.html');
        const $content = $(template.render({
            new: Msg.Lang['statusbar.fs.newMapFolder']
        }));
        this.setContent($content);
        this.#$btn_ = $content.find('.manage-btn');
        this.#$mask_ = $content.children('.mask');
        this.#fsBoard_ = new FSBoard();
        this.#fsBoard_.setHandler(new FSBoardHandler());
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.#$btn_.click(() => {
            this.addPanel();
        });
    }

    init() {
        this.addDirty();
        this.setMarkStatus('negative');
    }

    setStatus(isOpened) {
        if (this.#opened_ === isOpened) {
            return;
        }
        this.#opened_ = isOpened;
        if (isOpened) {
            this.#$mask_.css('display', 'block');
            this.setMarkStatus('positive');
        } else {
            this.#$mask_.css('display', 'none');
            this.setMarkStatus('negative');
        }
    }

    addPanel() {
        const panel = new Panel();
        panel.setFSMenu(this.#fsBoard_.getHandler().getFSMenu());
        this.#$btn_.parent().before(panel.getContent());
        this.#registry_.register(panel.getId(), panel);
        panel.bind('download', (config) => {
            this.#ensureSerial_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.setStatus(true);
                panel.setStatus(true);
                return this.#fsBoard_.download(config.folderPath, config.fsType);
            })
            .catch(Debug.error)
            .finally(() => {
                this.setStatus(false);
                panel.setStatus(false);
            });
        });

        panel.bind('upload', (config) => {
            this.#ensureSerial_()
            .then((status) => {
                if (!status) {
                    return;
                }
                this.setStatus(true);
                panel.setStatus(true);
                return this.#fsBoard_.upload(config.folderPath, config.fsType);
            })
            .catch(Debug.error)
            .finally(() => {
                this.setStatus(false);
                panel.setStatus(false);
            });
        });

        panel.bind('destroyed', () => {
            this.#registry_.unregister(panel.getId());
        });
    }

    #ensureSerial_() {
        return new Promise((resolve, reject) => {
            const port = Serial.getSelectedPortName();
            if (!port) {
                layer.msg('无可用设备', { time: 1000 });
                resolve(false);
                return;
            }
            const { mainStatusBarTabs } = Mixly;
            const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
            let closePromise = Promise.resolve();
            if (statusBarSerial) {
                closePromise = statusBarSerial.close();
            }
            closePromise.then(() => {
                resolve(true);
            }).catch(reject);
        });
    }

    dispose() {
        for (let id of this.#registry_.keys()) {
            this.#registry_.getItem(id).dispose();
        }
        this.#$btn_ = null;
        this.#$mask_ = null;
        this.#fsBoard_.dispose();
        this.#fsBoard_ = null;
        this.#registry_.reset();
        this.#registry_ = null;
        super.dispose();
    }

    setHandler(handler) {
        this.#fsBoard_.setHandler(handler);
    }
}

Mixly.StatusBarFS = StatusBarFS;

});