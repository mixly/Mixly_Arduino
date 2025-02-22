goog.loadJs('common', () => {

goog.require('Mixly.Component');
goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.require('Mixly.Component');
goog.provide('Mixly.PageBase');

const {
    Events,
    Registry,
    Component
} = Mixly;

class PageBase extends Component {
    #pages_ = new Registry();
    #$tab_ = null;
    #$close_ = null;
    #dirty_ = false;
    #active_ = true;
    #inited_ = false;

    constructor() {
        super();
        this.addEventsType(['addDirty', 'removeDirty', 'active']);
    }

    init() {
        this.#forward_('init');
        this.#inited_ = true;
        this.runEvent('created');
    }

    addPage($child, id, page) {
        this.#pages_.register(id, page);
        $child.append(page.getContent());
    }

    removePage(id) {
        const page = this.getPage(id);
        if (!page) {
            return;
        }
        this.#pages_.unregister(id);
        page.dispose();
    }

    getPage(id) {
        return this.#pages_.getItem(id);
    }

    mountPage($child, id, page) {
        if (!this.isMounted()) {
            return;
        }
        this.addPage($child, id, page);
        page.onMounted();
    }

    resize() {
        super.resize();
        this.#forward_('resize');
    }

    dispose() {
        this.#forward_('dispose');
        this.#pages_.reset();
        this.#$close_ = null;
        this.#$tab_ && this.#$tab_.remove();
        this.#$tab_ = null;
        super.dispose();
    }

    #forward_(type, ...args) {
        this.#pages_.getAllItems().forEach((page) => {
            if (typeof page[type] !== 'function') {
                return;
            }
            page[type](...args);
        });
    }

    onMounted() {
        super.onMounted();
        this.#forward_('onMounted');
        this.setActive(true);
        this.runEvent('active');
    }

    onUnmounted() {
        super.onUnmounted();
        this.#forward_('onUnmounted');
        this.setActive(false);
    }

    setActive(status) {
        this.#forward_('setActive', status);
        this.#active_ = status;
    }

    setTab($tab) {
        this.#$tab_ = $tab;
        this.#$close_ = $tab.find('.chrome-tab-close');
    }

    hideCloseBtn() {
        this.#$close_.css('display', 'none');
    }

    showCloseBtn() {
        this.#$close_.css('display', 'block');
    }

    getTab() {
        return this.#$tab_;
    }

    setMarkStatus(styleClass) {
        this.#$close_.attr('class', `chrome-tab-close layui-badge-dot ${styleClass}`);
    }

    addDirty() {
        this.#forward_('addDirty');
        const $tab = this.getTab();
        if (!$tab || this.isDirty()) {
            return;
        }
        $tab.addClass('dirty');
        this.runEvent('addDirty');
        this.#dirty_ = true;
    }

    removeDirty() {
        this.#forward_('removeDirty');
        const $tab = this.getTab();
        if (!$tab || !this.isDirty()) {
            return;
        }
        this.runEvent('removeDirty');
        $tab.removeClass('dirty');
        this.#dirty_ = false;
    }

    isDirty() {
        return this.#dirty_;
    }

    isInited() {
        return this.#inited_;
    }

    isActive() {
        return this.#active_;
    }
}

Mixly.PageBase = PageBase;

});