goog.loadJs('common', () => {

goog.require('marked');
goog.require('markedKatex');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Drag');
goog.require('Mixly.DragV');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorBase');
goog.require('Mixly.EditorCode');
goog.provide('Mixly.EditorMd');

const {
    XML,
    Env,
    Drag,
    DragV,
    IdGenerator,
    HTMLTemplate,
    EditorBase,
    EditorCode
} = Mixly;


class EditorMd extends EditorBase {
    static {
        HTMLTemplate.add(
            'html/editor/editor-md.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/editor/editor-md.html')))
        );

        HTMLTemplate.add(
            'html/editor/editor-md-btns.html',
            goog.get(path.join(Env.templatePath, 'html/editor/editor-md-btns.html'))
        );

        marked.use(markedKatex({ throwOnError: false }));
    }

    #prevCode_ = '';
    #listener_ = null;
    #drag_ = null;
    #$preview_ = null;
    #$btns_ = null;

    constructor() {
        super();
        const $content = $(HTMLTemplate.get('html/editor/editor-md.html').render());
        const $btnsContent = $(HTMLTemplate.get('html/editor/editor-md-btns.html'));
        this.#$preview_ = $content.find('.markdown-body');
        this.addPage($content.find('.editor-code'), 'code', new EditorCode());
        this.#$btns_ = $btnsContent.find('button');
        this.#drag_ = null;
        this.setContent($content);
        this.setBtnsContent($btnsContent);
    }

    init() {
        super.init();
        this.#addDragEventsListener_();
        this.#addBtnEventsListener_();
    }

    onMounted() {
        super.onMounted();
        this.#addChangeEventListener_();
    }

    #addDragEventsListener_() {
        this.#drag_ = new DragV(this.getContent()[0], {
            min: '200px',
            full: [true, true],
            startSize: '0%',
            startExitFullSize: '70%'
        });
        this.#drag_.bind('sizeChanged', () => this.resize());
        this.#drag_.bind('onfull', (type) => {
            this.#$btns_.removeClass('self-adaption-btn');
            let $btn = null;
            switch(type) {
            case Drag.Extend.POSITIVE:
                $btn = this.#$btns_.filter('[m-id="code"]');
                break;
            case Drag.Extend.NEGATIVE:
                $btn = this.#$btns_.filter('[m-id="preview"]');
                break;
            }
            $btn.addClass('self-adaption-btn');
        });
        this.#drag_.bind('exitfull', (type) => {
            this.#$btns_.removeClass('self-adaption-btn');
            const $btn = this.#$btns_.filter('[m-id="mixture"]');
            $btn.addClass('self-adaption-btn');
            if (type === Drag.Extend.POSITIVE) {
                this.updatePreview();
            }
        });
    }

    #addBtnEventsListener_() {
        this.#$btns_.on('click', (event) => {
            const $btn = $(event.currentTarget);
            const mId = $btn.attr('m-id');
            if (!$btn.hasClass('self-adaption-btn')) {
                this.#$btns_.removeClass('self-adaption-btn');
                $btn.addClass('self-adaption-btn');
            }
            switch (mId) {
            case 'code':
                this.#drag_.full(Drag.Extend.POSITIVE);
                break;
            case 'mixture':
                this.#drag_.exitfull(Drag.Extend.POSITIVE);
                this.#drag_.exitfull(Drag.Extend.NEGATIVE);
                break;
            case 'preview':
                this.#drag_.full(Drag.Extend.NEGATIVE);
                break;
            }
        })
    }

    #addChangeEventListener_() {
        const codePage = this.getPage('code');
        codePage.offEvent('change');
        codePage.bind('change', () => {
            this.addDirty();
            if (this.#drag_.shown === 'NEGATIVE') {
                return;
            }
            this.updatePreview();
        });
    }

    updatePreview() {
        const code = this.getPage('code').getValue();
        if (code === this.#prevCode_) {
            return;
        }
        this.#prevCode_ = code;
        const $dom = $(marked.parse(code));
        const $as = $dom.find('a');
        $as.attr('target', '_blank');
        this.#$preview_.html($dom);
    }

    setValue(data, ext) {
        const codePage = this.getPage('code');
        codePage.disableChangeEvent();
        codePage.setValue(data, ext);
        this.updatePreview();
        codePage.enableChangeEvent();
    }

    getValue() {
        const codePage = this.getPage('code');
        return codePage.getValue();
    }

    dispose() {
        this.#drag_.dispose();
        super.dispose();
    }
}

Mixly.EditorMd = EditorMd;

});