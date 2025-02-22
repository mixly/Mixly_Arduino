goog.loadJs('common', () => {

goog.require('ace');
goog.require('ace.ExtLanguageTools');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Debug');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorAce');

const {
    XML,
    Env,
    Msg,
    Debug,
    HTMLTemplate,
    EditorBase
} = Mixly;

class EditorAce extends EditorBase {
    static {
        this.CTRL_BTNS = ['resetFontSize', 'increaseFontSize', 'decreaseFontSize'];
        this.CTRL_BTN_TEMPLATE = '<div m-id="{{d.mId}}" class="code-editor-btn setFontSize"></div>';
        this.MODE_MAP = goog.getJSON(path.join(Env.templatePath, 'json/ace-mode-map.json'));

        HTMLTemplate.add(
            'html/editor/editor-code.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/editor/editor-code.html')))
        );
    }

    #editor_ = null;
    #destroyed_ = null;
    #cursorLayer_ = null;

    constructor() {
        super();
        const editorHTMLTemplate = HTMLTemplate.get('html/editor/editor-code.html');
        this.setContent($(editorHTMLTemplate.render()));
        this.id = editorHTMLTemplate.id;
    }

    init() {
        super.init();
        this.#editor_ = ace.edit(this.getContent()[0]);
        this.resetFontSize();
        this.#addCursorLayer_();
        this.#addCursorEventsListener_();
        this.#addDefaultCommand_();
    }

    getEditor() {
        return this.#editor_;
    }

    dispose() {
        super.dispose();
        this.#editor_.destroy();
        this.#destroyed_ = true;
    }

    setValue(data, scroll = true) {
        if (this.#destroyed_) {
            return;
        }
        this.#editor_.updateSelectionMarkers();
        const { selection } = this.#editor_;
        const initCursor = selection.getCursor();
        if (this.getValue() !== data) {
            this.#editor_.setValue(data);
        }
        if (scroll) {
            this.scrollToBottom();
        } else {
            selection.moveCursorTo(initCursor.row, initCursor.column, true);
            selection.clearSelection();
        }
    }

    addValue(data, scroll = true) {
        if (this.#destroyed_) {
            return;
        }
        const { session } = this.#editor_;
        const endCursor = this.getEndPos();
        session.insert(endCursor, data);
        if (scroll) {
            this.scrollToBottom();
        }
    }

    getValue() {
        return this.#destroyed_ ? '' : this.#editor_.getValue();
    }

    getValueRange(startPos, endPos) {
        if (this.#destroyed_ || !startPos || !endPos 
            || typeof startPos !== 'object' || typeof endPos !== 'object') {
            return "";
        }
        const session = this.#editor_.getSession();
        return session.getTextRange(new ace.Range(
            startPos.row,
            startPos.column,
            endPos.row,
            endPos.column
        ));
    }

    getEndPos() {
        if (this.#destroyed_) {
            return { row: 0, column: 0 };
        }
        const session = this.#editor_.getSession();
        const row = session.getLength() - 1;
        const column = session.getLine(row).length;
        return { row, column };
    }

    clear() {
        this.setValue('', true);
    }

    scrollToBottom() {
        if (this.#destroyed_) {
            return;
        }
        const { selection, session } = this.#editor_;
        this.#editor_.updateSelectionMarkers();
        this.#editor_.gotoLine(session.getLength());
        selection.moveCursorLineEnd();
    }

    scrollToTop() {
        if (this.#destroyed_) {
            return;
        }
        this.#editor_.gotoLine(0);
    }

    #addDefaultCommand_() {
        const { commands } = this.#editor_;
        commands.addCommands([{
            name: "increaseFontSize",
            bindKey: "Ctrl-=|Ctrl-+",
            exec: (editor) => {
                this.increaseFontSize();
            }
        }, {
            name: "decreaseFontSize",
            bindKey: "Ctrl+-|Ctrl-_",
            exec: (editor) => {
                this.decreaseFontSize();
            }
        }, {
            name: "resetFontSize",
            bindKey: "Ctrl+0|Ctrl-Numpad0",
            exec: (editor) => {
                this.resetFontSize();
            }
        }, {
            name: "mixly-message",
            bindKey: "backspace|delete|enter",
            readOnly: true,
            exec: (editor) => {
                if (!editor.getReadOnly()) {
                    return false;
                }
                this.#cursorLayer_.show();
                return false;
            }
        }]);
    }

    #addCursorLayer_() {
        this.#cursorLayer_ = tippy(this.getContent().find('.ace_cursor')[0], {
            content: Msg.Lang['editor.viewReadOnly'],
            trigger: 'manual',
            hideOnClick: true,
            delay: 0,
            duration: [ 0, 0 ],
            placement: 'right',
            offset: [ 0, 0 ],
            popperOptions: {
                strategy: 'fixed',
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['top-end', 'right']
                        }
                    }
                ]
            }
        });
    }

    #addCursorEventsListener_() {
        const editor = this.getEditor();
        $('#mixly-footer-cursor').hide();
        editor.on('focus', () => {
            const cursor = selection.getCursor();
            $('#mixly-footer-row').html(cursor.row + 1);
            $('#mixly-footer-column').html(cursor.column + 1);
            $('#mixly-footer-cursor').show();
        });
        editor.on("blur", () => {
            this.#cursorLayer_.hide();
            $('#mixly-footer-cursor').hide();
        });
        const { selection } = editor.getSession();
        const { session } = editor;
        selection.on('changeCursor', () => {
            const cursor = selection.getCursor();
            $('#mixly-footer-row').html(cursor.row + 1);
            $('#mixly-footer-column').html(cursor.column + 1);
        });
        selection.on("changeSelection", () => {
            if (selection.isEmpty()) {
                $('#mixly-footer-selected').parent().hide();
            } else {
                const range = selection.getRange();
                const text = session.getTextRange(range);
                $('#mixly-footer-selected').parent().css('display', 'inline-flex');
                $('#mixly-footer-selected').html(text.length); 
            }
        });
        session.on("changeScrollTop", () => {
            this.#cursorLayer_.hide();
        });
    }

    addCtrlBtns() {
        const $content = this.getContent();
        for (let mId of EditorAce.CTRL_BTNS) {
            $content.append(XML.render(EditorAce.CTRL_BTN_TEMPLATE, { mId }));
        }
        this.$ctrlBtns = $content.children('.code-editor-btn');
        this.$ctrlBtns.off().click((event) => {
            const mId = $(event.target).attr('m-id');
            this[mId]();
        });
    }

    showCtrlBtns() {
        this.$ctrlBtns.css('display', 'block');
    }

    hideCtrlBtns() {
        this.$ctrlBtns.css('display', 'none');
    }

    resetFontSize() {
        this.#editor_.setFontSize(17);
    }

    increaseFontSize() {
        const size = parseInt(this.#editor_.getFontSize(), 10) || 17;
        this.#editor_.setFontSize(size + 1);
    }

    decreaseFontSize() {
        const size = parseInt(this.#editor_.getFontSize(), 10) || 17;
        this.#editor_.setFontSize(Math.max(size - 1 || 1));
    }

    undo() {
        super.undo();
        this.#editor_.undo();
    }

    redo() {
        super.redo();
        this.#editor_.redo();
    }

    setReadOnly(status) {
        this.#editor_.setReadOnly(status);
    }

    setMode(type) {
        this.#editor_.session.setMode(`ace/mode/${type}`);
    }

    setFileMode(extname) {
        const mode = this.getFileMode(extname) ?? 'text';
        this.setMode(mode);
    }

    getFileMode(extname) {
        for (const [mode, extensions] of Object.entries(EditorAce.MODE_MAP)) {
            if (extensions.includes(extname)) {
                return mode;
            }
        }
        return null;
    }

    cut() {
        const { selection, session } = this.#editor_;
        const cutLine = selection.isEmpty();
        const range = cutLine ? selection.getLineRange() : selection.getRange();
        this.#editor_._emit('cut', range);
        if (!range.isEmpty()) {
            const copyText = session.getTextRange(range);
            navigator.clipboard.writeText(copyText)
            .then(() => {
                Debug.log('clipboard：复制成功', copyText);
            }).catch((error) => {
                Debug.error('clipboard：复制失败', error);
            });
            session.remove(range);
        }
        this.#editor_.clearSelection();
    }

    copy() {
        const copyText = this.#editor_.getSelectedText();
        this.#editor_.clearSelection();
        if (!copyText) {
            return;
        }
        navigator.clipboard.writeText(copyText)
        .then(() => {
            Debug.log('clipboard：复制成功', copyText);
        }).catch((error) => {
            Debug.error('clipboard：复制失败', error);
        });
    }

    paste() {
        navigator.clipboard.readText()
        .then((message) => {
            this.#editor_.execCommand('paste', message);
            Debug.log('clipboard：粘贴成功', message);
        })
        .catch((error) => {
            Debug.error('clipboard：粘贴失败', error);
        });
    }

    commentLine() {
        this.#editor_.execCommand('togglecomment');
    }

    blockComment() {
        this.#editor_.execCommand('toggleBlockComment');
    }

    resize() {
        this.#editor_.resize();
        super.resize();
    }

    focus() {
        this.#editor_.focus();
    }

    onUnmounted() {
        this.scrollToTop();
        super.onUnmounted();
    }
}

Mixly.EditorAce = EditorAce;

});