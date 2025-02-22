goog.loadJs('common', () => {

goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorWelcome');

const {
    XML,
    Env,
    HTMLTemplate,
    EditorBase
} = Mixly;

class EditorWelcome extends EditorBase {
    static {
        HTMLTemplate.add(
            'html/editor/editor-welcome.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/editor/editor-welcome.html')))
        );
    }

    constructor() {
        super();
        this.setContent(
            $(HTMLTemplate.get('html/editor/editor-welcome.html').render())
        );
    }
}

Mixly.EditorWelcome = EditorWelcome;

});