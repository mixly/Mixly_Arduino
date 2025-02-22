goog.loadJs('common', () => {

goog.require('path');
goog.require('Mprogress');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Debug');
goog.require('Mixly.Menu');
goog.require('Mixly.PageBase');
goog.require('Mixly.Electron.FileTree');
goog.require('Mixly.Web.FileTree');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Web.FS');
goog.provide('Mixly.SideBarLocalStorage');

const {
    IdGenerator,
    XML,
    Env,
    HTMLTemplate,
    ContextMenu,
    Debug,
    Menu,
    PageBase,
    Electron = {},
    Web = {}
} = Mixly;

const {
    FileTree,
    FS
} = goog.isElectron? Electron : Web;

class SideBarLocalStorage extends PageBase {
    static {
        HTMLTemplate.add(
            'html/sidebar/sidebar-local-storage-open-folder.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/sidebar/sidebar-local-storage-open-folder.html')))
        );
    }

    #$openFolderContent_ = null;
    #fileTree_ = null;
    #contextMenu_ = null;
    #folderPath_ = null;

    constructor() {
        super();
        const $openFolderContent = $(HTMLTemplate.get('html/sidebar/sidebar-local-storage-open-folder.html').render());
        this.#$openFolderContent_ = $openFolderContent;
        this.setContent($openFolderContent);
        this.#fileTree_ = new FileTree();
        this.#addEventsListener_();
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }

    #addEventsListener_() {
        this.#$openFolderContent_.find('button').click(() => {
            this.showDirectoryPicker();
        });

        const contextMenu = this.#fileTree_.getContextMenu();
        const menu = contextMenu.getItem('menu');

        menu.add({
            weight: 10,
            type: 'open_new_folder',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem('打开新文件夹', ''),
                callback: () => {
                    this.showDirectoryPicker();
                }
            }
        });
    }

    showDirectoryPicker() {
        FS.showDirectoryPicker()
        .then((folderPath) => {
            if (!folderPath) {
                return;
            }
            this.setFolderPath(folderPath);
            this.setContent(this.#fileTree_.getContent());
            this.#$openFolderContent_.remove();
        })
        .catch(Debug.error);
    }

    getFileTree() {
        return this.#fileTree_;
    }

    resize() {
        super.resize();
        this.#fileTree_ && this.#fileTree_.resize();
    }

    dispose() {
        this.#fileTree_.dispose();
    }

    setFolderPath(folderPath) {
        if (goog.isElectron) {
            this.#fileTree_.setFolderPath(folderPath);
        } else {
            this.#fileTree_.setFolderPath('/');
        }
        this.#folderPath_ = this.#fileTree_.getFolderPath();
        this.#fileTree_.openRootFolder();
    }
}

Mixly.SideBarLocalStorage = SideBarLocalStorage;

});