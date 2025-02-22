goog.loadJs('common', () => {

goog.require('Mixly.XML');
goog.require('Mixly.Registry');
goog.require('Mixly.IdGenerator');
goog.provide('Mixly.HTMLTemplate');

const {
	XML,
	Registry,
	IdGenerator,
} = Mixly;

class HTMLTemplate {
    static {
        this.regexStyle_ = /(?<=<style>)[\s\S]*?(?=<\/style>)/gm;
        this.regexHTML_ = /<style>[\s\S]*?<\/style>/gm;
        this.templateRegistry = new Registry();

        this.add = function(id, htmlTemplate) {
            if (this.get(id)) {
                return;
            }
            this.templateRegistry.register(id, htmlTemplate);
        }

        this.remove = function(id) {
            this.templateRegistry.unregister(id);
        }

        this.get = function(id) {
            return this.templateRegistry.getItem(id);
        }
    }

    #style_ = null;
    #html_ = null;
    constructor(template) {
        this.id = IdGenerator.generate();
        this.#style_ = XML.render((template.match(HTMLTemplate.regexStyle_) || []).join('\n'), {
            mId: this.id
        });
        this.#html_ = template.replace(HTMLTemplate.regexHTML_, '');
        if (this.#style_) {
        	this.#addCss_();
        }
    }

    render(config = {}) {
        if (!config.mId) {
            config.mId = this.id;
        }
        return XML.render(this.#html_, config);
    }

    #addCss_() {
        let hasStyleNode = $('head').find(`style[style-id="${this.id}"]`).length;
        if (hasStyleNode) {
            return;
        }
        let $style = $('<style></style>');
        $style.attr('style-id', this.id);
        $style.attr('type', 'text/css').html(this.#style_);
        $('head').append($style);
    }

    getId() {
        return this.id;
    }
}

Mixly.HTMLTemplate = HTMLTemplate;

});