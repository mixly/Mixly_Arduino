goog.loadJs('common', () => {

goog.require('$.contextMenu');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Events');
goog.require('Mixly.Registry');
goog.require('Mixly.HTMLTemplate');
goog.provide('Mixly.ContextMenu');

const {
    XML,
    Env,
    Events,
    Registry,
    HTMLTemplate
} = Mixly;

class ContextMenu {
    static {
        HTMLTemplate.add(
            'html/context-menu-item.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/context-menu-item.html')))
        );

        this.getItem = (name, hotKey) => HTMLTemplate.get('html/context-menu-item.html').render({ name, hotKey });

        this.generate = (menu, $trigger) => {
            let menuItems = {};
            for (let item of menu.getAllItems()) {
                if (typeof item.preconditionFn === 'function'
                    && !item.preconditionFn($trigger)) {
                    continue;
                }
                if (item.children) {
                    item.data.items = this.generate(item.children);
                }
                menuItems[item.type] = item.data;
            }
            return menuItems;
        }
    }

    #menus_ = new Registry();
    #events_ = new Events(['getMenu']);
    constructor(selector, config = {}) {
        this.selector = selector;
        this.menu = $.contextMenu({
            selector,
            build: ($trigger) => {
                return { items: this.#getMenu_($trigger) }
            },
            animation: { duration: 0, show: 'show', hide: 'hide' },
            ...config
        });
    }

    #getMenu_($trigger, e) {
        const outputs = this.runEvent('getMenu', $trigger, e);
        if (!outputs.length) {
            return {};
        }
        const menu = this.#menus_.getItem(outputs[0]);
        if (!menu) {
            return {};
        }
        return ContextMenu.generate(menu, $trigger, e);
    }

    dispose() {
        $.contextMenu('destroy', this.selector);
        this.#events_.reset();
        this.#menus_.reset();
        this.menu = null;
        this.selector = null;
    }

    show() {
        $(this.selector).contextMenu();
    }

    hide() {
        $(this.selector).contextMenu('hide');
    }

    bind(type, func) {
        return this.#events_.bind(type, func);
    }

    unbind(id) {
        this.#events_.unbind(id);
    }

    addEventsType(eventsType) {
        this.#events_.addType(eventsType);
    }

    runEvent(eventsType, ...args) {
        return this.#events_.run(eventsType, ...args);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    resetEvent() {
        this.#events_.reset();
    }

    register(id, menu) {
        this.#menus_.register(id, menu);
    }

    unregister(id) {
        this.#menus_.unregister(id);
    }

    getItem(id) {
        return this.#menus_.getItem(id);
    }
}

Mixly.ContextMenu = ContextMenu;

});