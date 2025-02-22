goog.loadJs('common', () => {

goog.require('Mixly.PagesTab');
goog.require('Mixly.Registry');
goog.require('Mixly.Component');
goog.provide('Mixly.PagesManager');

const {
    PagesTab,
    Registry,
    Component
} = Mixly;

class PagesManager extends Component {
    #tabs_ = null;
    #$welcomePage_ = null;
    #$editorContainer_ = null;
    #$tabsContainer_ = null;
    #pagesRegistry_ = new Registry();
    #page_ = 'welcome';
    #activeId_ = null;
    #typesRegistry_ = null;

    /**
     * config = {
     *      parentElem: element,
     *      managerContentElem: element,
     *      bodyElem: element,
     *      tabElem: element,
     *      tabContentElem: element,
     *      typesRegistry: Mixly.Registry
     * }
     **/
    constructor(config) {
        super();
        const $parentContainer = $(config.parentElem);
        const $content = $(config.managerContentElem);
        this.#typesRegistry_ = config.typesRegistry;
        this.#$tabsContainer_ = $(config.tabElem);
        this.#$editorContainer_ = $(config.bodyElem);
        this.#tabs_ = new PagesTab({
            parentElem: config.tabElem,
            contentElem: config.tabContentElem
        });
        $content.append(this.#$editorContainer_);
        this.setContent($content);
        this.mountOn($parentContainer);
        let PageType = this.#typesRegistry_.getItem('#welcome');
        if (PageType) {
            this.#$welcomePage_ = (new PageType()).getContent();
            $content.replaceWith(this.#$welcomePage_);
        }
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        const pageTabs = this.getTabs();
        // active Tab被改变时触发
        pageTabs.bind('activeTabChange', (event) => {
            const prevEditor = this.getActive();
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const page = this.get(id);
            this.#activeId_ = id;
            if (prevEditor) {
                prevEditor.getContent().detach();
                prevEditor.onUnmounted();
            }
            this.#$editorContainer_.empty();
            this.#$editorContainer_.append(page.getContent());
            page.onMounted();
            page.resize();
        });

        // 添加新Tab时触发
        pageTabs.bind('tabCreated', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const type = $(tabEl).attr('data-tab-type');
            let PageType = this.#typesRegistry_.getItem(type);
            if (!PageType) {
                PageType = this.#typesRegistry_.getItem('#default');
            }
            let page = new PageType();
            this.#pagesRegistry_.register(id, page);
            page.setTab($(tabEl));
            if (this.#$welcomePage_) {
                if (this.#pagesRegistry_.length() && this.#page_ === 'welcome') {
                    this.#$welcomePage_.replaceWith(this.getContent());
                    this.#page_ = 'editor';
                }
            }
            page.init();
        });

        // 移除已有Tab时触发
        pageTabs.bind('tabDestroyed', (event) => {
            const { tabEl } = event.detail;
            const id = $(tabEl).attr('data-tab-id');
            const page = this.get(id);
            if (!page) {
                return;
            }
            page.dispose();
            this.#pagesRegistry_.unregister(id);
            if (this.#$welcomePage_) {
                if (!this.#pagesRegistry_.length() && this.#page_ !== 'welcome') {
                    this.getContent().replaceWith(this.#$welcomePage_);
                    this.#page_ = 'welcome';
                }
            }
        });
    }

    resize() {
        super.resize();
        const page = this.getActive();
        page && page.resize();
        this.#tabs_.resize();
    }

    onMounted() {
        super.onMounted();
        const page = this.getActive();
        page && page.onMounted();
        this.#tabs_.onMounted();
    }

    onUnmounted() {
        const page = this.getActive();
        page && page.onUnmounted();
        this.#tabs_.onUnmounted();
        super.onUnmounted();
    }

    getActive() {
        return this.get(this.#activeId_);
    }

    add(type, id, name = null, title = null, favicon = null) {
        this.#tabs_.addTab({
            name: name ?? id,
            title: title ?? id,
            type, favicon, id
        });
    }

    remove(id) {
        this.#tabs_.removeTab(id);
    }

    changeTo(id) {
        if (!this.get(id)) {
            return;
        }
        this.#tabs_.setCurrentTab(id);
    }

    get(id) {
        return this.#pagesRegistry_.getItem(id);
    }

    keys() {
        return this.#pagesRegistry_.keys();
    }

    length() {
        return this.#pagesRegistry_.length();
    }

    getTabs() {
        return this.#tabs_;
    }

    dispose() {
        for (let id of this.keys()) {
            this.remove(id);
        }
        this.#tabs_.dispose();
        super.dispose();
    }
}

Mixly.PagesManager = PagesManager;

});