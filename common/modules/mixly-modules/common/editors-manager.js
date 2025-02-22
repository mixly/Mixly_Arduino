goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Nav');
goog.require('Mixly.EditorMix');
goog.require('Mixly.EditorCode');
goog.require('Mixly.EditorMd');
goog.require('Mixly.EditorBlockly');
goog.require('Mixly.EditorUnknown');
goog.require('Mixly.EditorWelcome');
goog.require('Mixly.Registry');
goog.require('Mixly.Debug');
goog.require('Mixly.PagesManager');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Electron.FS');
goog.require('Mixly.Web.FS');
goog.provide('Mixly.EditorsManager');

const {
    XML,
    Env,
    Nav,
    EditorMix,
    EditorCode,
    EditorMd,
    EditorBlockly,
    EditorUnknown,
    EditorWelcome,
    Registry,
    Debug,
    PagesManager,
    HTMLTemplate,
    Electron = {},
    Web = {}
} = Mixly;

const { FS } = goog.isElectron? Electron : Web;

class EditorsManager extends PagesManager {
    static {
        HTMLTemplate.add(
            'html/editor/editor-manager.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/editor/editor-manager.html')))
        );

        HTMLTemplate.add(
            'html/editor/editor-tab.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/editor/editor-tab.html')))
        );

        this.typesRegistry = new Registry();
        this.typesRegistry.register(['.mix', '.mil'], EditorMix);
        this.typesRegistry.register(['.txt', '.ino', '.json'], EditorCode);
        this.typesRegistry.register('.md', EditorMd);
        this.typesRegistry.register('#default', EditorUnknown);
        this.typesRegistry.register('#welcome', EditorWelcome);
    }

    constructor(element) {
        const managerHTMLTemplate = HTMLTemplate.get('html/editor/editor-manager.html');
        const tabHTMLTemplate = HTMLTemplate.get('html/editor/editor-tab.html');
        const $manager = $(managerHTMLTemplate.render());
        const $tab = $(tabHTMLTemplate.render());
        super({
            parentElem: element,
            managerContentElem: $manager[0],
            bodyElem: $manager.find('.body')[0],
            tabElem: $manager.find('.tabs')[0],
            tabContentElem: $tab[0],
            typesRegistry: EditorsManager.typesRegistry
        });
        this.#addEventsListenerExt_();
    }

    #addEventsListenerExt_() {
        const editorTabs = this.getTabs();

        // active Tab被改变时触发
        editorTabs.bind('activeTabChange', (event) => {
            const $btnsContainer = Nav.getMain().getEditorBtnsContainer();
            $btnsContainer.children('div').detach();
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const editor = this.get(id);
            const $btns = editor.getBtnsContent();
            if ($btns && $btns.length) {
                $btnsContainer.removeClass('empty');
                $btnsContainer.children('a').css('display', 'none');
                $btnsContainer.append($btns);
            } else {
                $btnsContainer.addClass('empty');
                $btnsContainer.children('a').css('display', 'block');
            }
            Nav.getMain().resize();
        });

        // 添加新Tab时触发
        editorTabs.bind('tabCreated', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const editor = this.get(id);
            FS.isFile(id)
            .then((isFile) => {
                if (!isFile) {
                    return;
                }
                return FS.readFile(id);
            })
            .then((data) => {
                data && editor.setValue(data, path.extname(id));
            })
            .catch(Debug.error);
            const tabs = this.getTabs();
            editor.bind('addDirty', () => {
                tabs.updateTab(id, {
                    title: id + ' - 未保存'
                });
            });
            editor.bind('removeDirty', () => {
                tabs.updateTab(id, {
                    title: id
                });
            });
        });

        // 移除已有Tab时触发
        editorTabs.bind('tabDestroyed', (event) => {
            if (this.length()) {
                return;
            }
            const $btnsContainer = Nav.getMain().getEditorBtnsContainer();
            $btnsContainer.children('div').detach();
            $btnsContainer.children('a').css('display', 'block');
            $btnsContainer.addClass('empty');
            Nav.getMain().resize();
        });
    }
}

Mixly.EditorsManager = EditorsManager;

});