goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.PageBase');
goog.provide('Mixly.StatusBarLibsCode');

const {
    Env,
    HTMLTemplate,
    PageBase
} = Mixly;


class StatusBarLibsCode extends PageBase {
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
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }
}

Mixly.StatusBarLibsCode = StatusBarLibsCode;

});