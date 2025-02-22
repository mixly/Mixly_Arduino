goog.loadJs('common', () => {

goog.require('_');
goog.require('path');
goog.require('ChromeTabs');
goog.require('XScrollbar');
goog.require('Sortable');
goog.require('$.contextMenu');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.require('Mixly.Component');
goog.provide('Mixly.PagesTab');

const {
    IdGenerator,
    Config,
    Events,
    Registry,
    Component
} = Mixly;

const { USER } = Config;

class PagesTab extends Component {
    #chromeTabs_ = null;
    #scrollbar_ = null;
    #tabsRegistry_ = null;
    #sortable_ = null;

    /**
     * config = {
     *      parentElem: element,
     *      contentElem: element
     * }
     **/
    constructor(config) {
        super();
        const $parentsContainer = $(config.parentElem);
        const $content = $(config.contentElem);
        this.$tabsContainer = $content.children('div');
        this.#chromeTabs_ = new ChromeTabs();
        this.#chromeTabs_.init(this.$tabsContainer[0]);
        this.#scrollbar_ = new XScrollbar($content.find('.chrome-tabs-content')[0], {
            onlyHorizontal: true,
            thumbSize: 1.7,
            thumbRadius: 0,
            thumbBackground: USER.theme === 'dark'? '#b0b0b0' : '#5f5f5f'
        });
        this.#sortable_ = new Sortable(this.#chromeTabs_.tabContentEl, {
            animation: 150,
            ghostClass: 'blue-background-class',
            direction: 'horizontal'
        });
        this.setContent($content);
        this.mountOn($parentsContainer);
        this.#addEventsListener_();
        this.#tabsRegistry_ = new Registry();
        this.addEventsType(['activeTabChange', 'tabCreated', 'tabDestroyed', 'tabCheckDestroy', 'tabBeforeDestroy']);
    }

    #addEventsListener_() {
        const { $tabsContainer } = this;
        const container = $tabsContainer[0];

        this.#chromeTabs_.checkDestroy = (event) => {
            const status = this.runEvent('tabCheckDestroy', event);
            return _.sum(status) == status.length;
        }

        // active Tab被改变时触发
        container.addEventListener('activeChange', (event) => {
            this.runEvent('activeTabChange', event);
        });

        // 添加新Tab时触发
        container.addEventListener('created', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.#tabsRegistry_.register(tabId, tabEl);
            this.runEvent('tabCreated', event);
            setTimeout(() => {
                this.#scrollbar_.update();
            }, 500);
        });

        // 移除已有Tab之前触发
        container.addEventListener('beforeDestroy', (event) => {
            this.runEvent('tabBeforeDestroy', event);
        });

        // 移除已有Tab时触发
        container.addEventListener('destroyed', (event) => {
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            this.#tabsRegistry_.unregister(tabId);
            this.runEvent('tabDestroyed', event);
            setTimeout(() => {
                this.#scrollbar_ && this.#scrollbar_.update();
            }, 500);
        });
    }

    addTab(tabProperties, others = {}) {
        tabProperties = { ...tabProperties };
        const { id } = tabProperties;
        tabProperties.id = id ?? IdGenerator.generate();
        let tab = this.#tabsRegistry_.getItem(tabProperties.id);
        if (tab) {
            this.updateTab(tabProperties.id, tabProperties);
            this.setCurrentTab(tabProperties.id);
        } else {
            tab = this.#chromeTabs_.addTab(tabProperties, others);
        }
        let { left } = $(tab).position();
        this.#scrollbar_.$container.scrollLeft = left;
        this.#scrollbar_.update();
    }

    removeTab(id) {
        const elem = this.#tabsRegistry_.getItem(id);
        this.#chromeTabs_.removeTab(elem);
    }

    setCurrentTab(id) {
        const elem = this.#tabsRegistry_.getItem(id);
        this.#chromeTabs_.setCurrentTab(elem);
    }

    updateTab(id, tabProperties) {
        const elem = this.#tabsRegistry_.getItem(id);
        const newId = tabProperties.id || id;
        this.#chromeTabs_.updateTab(elem, tabProperties);
        if (id !== newId) {
            this.#tabsRegistry_.unregister(id);
            this.#tabsRegistry_.register(id, elem);
        }
    }

    getScrollbar() {
        return this.#scrollbar_;
    }

    getSortable() {
        return this.#sortable_;
    }

    dispose() {
        this.#chromeTabs_.dispose();
        this.#chromeTabs_ = null;
        this.#tabsRegistry_.reset();
        this.#tabsRegistry_ = null;
        this.#sortable_.destroy();
        this.#sortable_ = null;
        this.#scrollbar_.destroy();
        this.#scrollbar_ = null;
        super.dispose();
    }
}

Mixly.PagesTab = PagesTab;

});