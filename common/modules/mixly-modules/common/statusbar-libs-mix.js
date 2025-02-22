goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.PageBase');
goog.provide('Mixly.StatusBarLibsMix');

const {
    Env,
    HTMLTemplate,
    PageBase
} = Mixly;


class StatusBarLibsMix extends PageBase {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-libs-mix.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-libs-mix.html')))
        );
    }

    constructor() {
        super();
        const template = HTMLTemplate.get('html/statusbar/statusbar-libs-mix.html');
        const $content = $(template.render());
        this.setContent($content);
        this.id = template.getId();
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }
}

Mixly.StatusBarLibsMix = StatusBarLibsMix;

});