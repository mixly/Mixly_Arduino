goog.loadJs('common', () => {

goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.EditorAce');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Menu');
goog.require('Mixly.Msg');
goog.require('Mixly.IdGenerator');
goog.provide('Mixly.StatusBar');

const {
    XML,
    Env,
    Config,
    EditorAce,
    ContextMenu,
    Menu,
    Msg,
    IdGenerator
} = Mixly;
const { USER } = Config;

class StatusBar extends EditorAce {
    #contextMenu_ = null;
    constructor() {
        super();
        this.#addContextMenu_();
    }

    init() {
        super.init();
        this.#toStatusBar_();
    }

    #addContextMenu_() {
        this.#contextMenu_ = new ContextMenu(`div[page-id="${this.getId()}"]`);
        let menu = new Menu();
        menu.add({
            weight: 0,
            type: 'copy',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.copy'], 'Ctrl+C'),
                callback: (key, opt) => this.copy()
            }
        });
        this.#contextMenu_.register('code', menu);
        this.#contextMenu_.bind('getMenu', () => 'code');
    }

    #toStatusBar_() {
        const editor = this.getEditor();
        if (USER.theme === 'dark') {
            editor.setOption('theme', 'ace/theme/tomorrow_night');
        } else {
            editor.setOption('theme', 'ace/theme/xcode');
        }
        editor.getSession().setMode("ace/mode/python");
        editor.setReadOnly(true);
        // editor.setScrollSpeed(0.3);
        editor.setShowPrintMargin(false);
        editor.renderer.setShowGutter(false);
        editor.setOptions({
            enableBasicAutocompletion: false,
            enableSnippets: false,
            enableLiveAutocompletion: false
        });
        editor.setHighlightActiveLine(false);
    }

    getContextMenu() {
        return this.#contextMenu_;
    }

    dispose() {
        this.#contextMenu_.dispose();
        this.#contextMenu_ = null;
        super.dispose();
    }
}

Mixly.StatusBar = StatusBar;

});