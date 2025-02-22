goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Registry');
goog.require('Mixly.Events');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.SideBarLocalStorage');
goog.require('Mixly.SideBarLibs');
goog.require('Mixly.PagesManager');
goog.require('Mixly.IdGenerator');
goog.provide('Mixly.SideBarsManager');
goog.provide('Mixly.LeftSideBarsManager');
goog.provide('Mixly.RightSideBarsManager');

const {
    Env,
    Msg,
    Registry,
    Events,
    HTMLTemplate,
    SideBarLocalStorage,
    SideBarLibs,
    PagesManager,
    IdGenerator,
    Boards
} = Mixly;

class SideBarsManager extends PagesManager {
    static {
        HTMLTemplate.add(
            'html/sidebar/left-sidebars-manager.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/sidebar/left-sidebars-manager.html')))
        );

        HTMLTemplate.add(
            'html/sidebar/left-sidebars-tab.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/sidebar/left-sidebars-tab.html')))
        );

        HTMLTemplate.add(
            'html/sidebar/right-sidebars-manager.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/sidebar/right-sidebars-manager.html')))
        );

        HTMLTemplate.add(
            'html/sidebar/right-sidebars-tab.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/sidebar/right-sidebars-tab.html')))
        );

        this.typesRegistry = new Registry();
        this.managersRegistry = new Registry();
        this.typesRegistry.register(['#default', 'local_storage'], SideBarLocalStorage);
        this.typesRegistry.register(['libs'], SideBarLibs);
        this.Align = {
            LEFT: 0,
            RIGHT: 1,
            0: 'LEFT',
            1: 'RIGHT'
        };

        this.getMain = function() {
            if (!this.managersRegistry.length()) {
                return null;
            }
            const key = this.managersRegistry.keys()[0];
            return this.managersRegistry.getItem(key);
        }

        this.add = function(manager) {
            this.managersRegistry.register(manager.id, manager);
        }

        this.remove = function(manager) {
            this.managersRegistry.unregister(manager.id);
        }
    }

    #shown_ = false;

    constructor(element, align = SideBarsManager.Align.LEFT) {
        let managerHTMLTemplate = '', tabHTMLTemplate = '';
        if (align === SideBarsManager.Align.RIGHT) {
            managerHTMLTemplate = HTMLTemplate.get('html/sidebar/right-sidebars-manager.html');
            tabHTMLTemplate = HTMLTemplate.get('html/sidebar/right-sidebars-tab.html');
        } else {
            managerHTMLTemplate = HTMLTemplate.get('html/sidebar/left-sidebars-manager.html');
            tabHTMLTemplate = HTMLTemplate.get('html/sidebar/left-sidebars-tab.html');
        }
        const $manager = $(managerHTMLTemplate.render());
        const $tab = $(tabHTMLTemplate.render());
        super({
            parentElem: element,
            managerContentElem: $manager[0],
            bodyElem: $manager.find('.body')[0],
            tabElem: $manager.find('.tabs')[0],
            tabContentElem: $tab[0],
            typesRegistry: SideBarsManager.typesRegistry
        });
        this.id = IdGenerator.generate();
        this.addEventsType(['show', 'hide']);
        SideBarsManager.add(this);
    }

    show() {
        this.runEvent('show');
    }

    hide() {
        this.runEvent('hide');
    }
    
    toggle() {
        this.isShown() ? this.hide() : this.show();
    }

    isShown() {
        return this.#shown_;
    }

    dispose() {
        SideBarsManager.remove(this);
        super.dispose();
    }
}

class LeftSideBarsManager extends SideBarsManager {
    constructor(element) {
        super(element, SideBarsManager.Align.LEFT);
    }
}

class RightSideBarsManager extends SideBarsManager {
    constructor(element) {
        super(element, SideBarsManager.Align.RIGHT);
    }
}

Mixly.SideBarsManager = SideBarsManager;
Mixly.LeftSideBarsManager = LeftSideBarsManager;
Mixly.RightSideBarsManager = RightSideBarsManager;

});