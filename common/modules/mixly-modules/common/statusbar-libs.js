goog.loadJs('common', () => {

goog.require('path');
goog.require('dayjs');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Debug');
goog.require('Mixly.StatusBar');
goog.require('Mixly.SideBarsManager');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.PageBase');
goog.require('Mixly.StatusBarLibsMix');
goog.require('Mixly.StatusBarLibsCode');
goog.provide('Mixly.StatusBarLibs');

const {
    Env,
    Msg,
    Debug,
    StatusBar,
    SideBarsManager,
    RightSideBarsManager,
    HTMLTemplate,
    PageBase,
    StatusBarLibsMix,
    StatusBarLibsCode,
} = Mixly;


class StatusBarLibs extends PageBase {
    static {
        HTMLTemplate.add(
            'statusbar/statusbar-libs.html',
            new HTMLTemplate(`<div class="page-item" m-id="{{d.mId}}"></div>`)
        );
        SideBarsManager.typesRegistry.register(['libs_mix'], StatusBarLibsMix);
        SideBarsManager.typesRegistry.register(['libs_code'], StatusBarLibsCode);
    }

    #manager_ = null;

    constructor() {
        super();
        const template = HTMLTemplate.get('statusbar/statusbar-libs.html');
        const $content = $(template.render());
        this.setContent($content);
        this.id = template.getId();
        this.#manager_ = new RightSideBarsManager($content[0]);
        this.#manager_.add('libs_mix', 'libs_mix', 'Mixly库');
        this.#manager_.add('libs_code', 'libs_code', '代码库');
        this.#manager_.changeTo('libs_mix');
    }

    init() {
        this.addDirty();
        const $tab = this.getTab();
        this.setMarkStatus('negative');
    }

    getManager() {
        return this.#manager_;
    }

    resize() {
        super.resize();
        this.#manager_.resize();
    }

    onMounted() {
        super.onMounted();
        this.#manager_.onMounted();
    }

    onUnmounted() {
        this.#manager_.onUnmounted();
        super.onUnmounted();
    }

    dispose() {
        this.#manager_.dispose();
        this.#manager_ =  null;
        super.dispose();
    }
}

Mixly.StatusBarLibs = StatusBarLibs;

});