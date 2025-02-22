goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.PageBase');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.HTMLTemplate')
goog.provide('Mixly.StatusBarSerialOutput');

const {
    PageBase,
    StatusBar,
    Env,
    Msg,
    HTMLTemplate
} = Mixly;


class StatusBarSerialOutput extends PageBase {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-serial-output.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-serial-output.html')))
        );
    }

    #$empty_ = null;
    #$scroll_ = null;
    #$timestamp_ = null;
    #$hex_ = null;
    #scroll_ = true;
    #timestamp_ = false;
    #hex_ = false;
    #active_ = false;
    #isOpened_ = false;

    constructor() {
        super();
        const template = HTMLTemplate.get('html/statusbar/statusbar-serial-output.html');
        const $content = $(template.render({
            empty: Msg.Lang['statusbar.serial.output.empty'],
            scroll: Msg.Lang['statusbar.serial.output.scroll'],
            timestamp: Msg.Lang['statusbar.serial.output.timestamp']
        }));
        this.setContent($content);
        this.#$empty_ = $content.find('.empty');
        this.#$scroll_ = $content.find('.scroll');
        this.#$timestamp_ = $content.find('.timestamp');
        this.#$hex_ = $content.find('.hex');
        this.addPage($content.find('.body'), 'editor', new StatusBar());
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.#$empty_.click(() => {
            this.empty({ startRow: 0 });
        });

        this.#$scroll_.change((event) => {
            let scroll = false;
            if (this.#$scroll_.prop('checked')) {
                scroll = true;
            }
            this.#scroll_ = scroll;
        });

        this.#$timestamp_.change((event) => {
            let timestamp = false;
            if (this.#$timestamp_.prop('checked')) {
                timestamp = true;
            }
            this.#timestamp_ = timestamp;
        });

        this.#$hex_.change((event) => {
            let hex = false;
            if (this.#$hex_.prop('checked')) {
                hex = true;
            }
            this.#hex_ = hex;
        });
    }

    init() {
        super.init();
        this.hideCloseBtn();
        this.#$scroll_.prop('checked', this.#scroll_);
        this.#$timestamp_.prop('checked', this.#timestamp_);
        this.#$hex_.prop('checked', this.#hex_);
    }

    empty() {
        const editor = this.getEditor();
        const endRow = editor.session.getLength();
        if (this.isOpened()) {
            editor.session.removeFullLines(1, endRow);
            this.addValue('\n');
        } else {
            editor.session.removeFullLines(0, endRow);
        }
    }

    setStatus(isOpened) {
        this.#isOpened_ = isOpened;
    }

    isOpened() {
        return this.#isOpened_;
    }

    getValue() {
        return this.getPage('editor').getValue();
    }

    setValue(data, scroll) {
        this.getPage('editor').setValue(data, scroll);
    }

    addValue(data, scroll) {
        this.getPage('editor').addValue(data, scroll);
    }

    getPageAce() {
        return this.getPage('editor');
    }

    getEditor() {
        return this.getPage('editor').getEditor();
    }

    getEditorPageId() {
        return this.getPage('editor').getId();
    }

    getContextMenu() {
        return this.getPage('editor').getContextMenu();
    }
    
    scrollChecked() {
        return this.#scroll_;
    }

    timestampChecked() {
        return this.#timestamp_;
    }

    hexChecked() {
        return this.#hex_;
    }
}

Mixly.StatusBarSerialOutput = StatusBarSerialOutput;

});