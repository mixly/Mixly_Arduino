goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.PageBase');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.DragV');
goog.require('Mixly.StatusBar');
goog.require('Mixly.Serial');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.AmpyFileTree');
goog.provide('Mixly.StatusBarAmpy');

const {
    PageBase,
    Env,
    Msg,
    HTMLTemplate,
    DragV,
    StatusBar,
    Serial,
    ContextMenu,
    AmpyFileTree
} = Mixly;

const { layer } = layui;


class StatusBarAmpy extends PageBase {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-ampy.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-ampy.html')))
        );

        HTMLTemplate.add(
            'html/statusbar/statusbar-ampy-open-fs.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-ampy-open-fs.html')))
        );

        HTMLTemplate.add(
            'html/statusbar/statusbar-ampy-editor-empty.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-ampy-editor-empty.html')))
        );
    }

    #$fileTree_ = null;
    #$editor_ = null;
    #$openFS_ = null;
    #$editorEmpty_ = null;
    #editor_ = null;
    #fileTree_ = null;
    #drag_ = null;
    #fileTreeShown_ = false;
    #editorShown_ = false;
    #changed_ = false;

    constructor() {
        super();
        const $content = $(HTMLTemplate.get('html/statusbar/statusbar-ampy.html').render());
        this.setContent($content);
        this.#fileTree_ = new AmpyFileTree();
        this.#$fileTree_ = $content.children('.file-tree');
        this.#$openFS_ = $(HTMLTemplate.get('html/statusbar/statusbar-ampy-open-fs.html').render({
            loadBoardFS: Msg.Lang['statusbar.ampy.loadBoardFS']
        }));
        this.#$fileTree_.append(this.#$openFS_);
        this.#editor_ = new StatusBar();
        this.#$editor_ = $content.children('.editor');
        this.#$editorEmpty_ = $(HTMLTemplate.get('html/statusbar/statusbar-ampy-editor-empty.html').render());
        this.#$editor_.append(this.#$editorEmpty_);
    }

    #addEventsListener_() {
        this.#drag_ = new DragV(this.getContent()[0], {
            min: '150px',
            startSize: '15%',
            full: [false, false]
        });

        this.#drag_.bind('sizeChanged', () => {
            this.resize();
        });

        this.#$openFS_.children('button').click(() => {
            this.openFS();
        });

        this.#fileTree_.bind('beforeSelectLeaf', (selected) => {
            const filePath = selected[0].id;
            const mode = this.#editor_.getFileMode(path.extname(filePath));
            if (!mode) {
                layer.msg(Msg.Lang['statusbar.ampy.cannotEdit'], { time: 1000 });
                return false;
            }
            this.#editor_.setMode(mode);
            return true;
        });

        this.#fileTree_.bind('afterSelectLeaf', async (selected) => {
            const filePath = selected[0].id;
            this.#fileTree_.showProgress();
            const fs = this.#fileTree_.getFS();
            const [error, result] = await fs.readFile(filePath);
            if (error) {
                this.hideEditor();
                this.#fileTree_.deselectAll();
            } else {
                this.showEditor();
                this.#editor_.setValue(result);
                this.#editor_.scrollToTop();
                this.#editor_.focus();
                this.setStatus(false);
            }
            this.#fileTree_.hideProgress();
        });

        this.#fileTree_.bind('afterCreateNode', (folderPath) => {
            this.#fileTree_.refreshFolder(folderPath);
        });

        this.#fileTree_.bind('afterDeleteNode', (folderPath) => {
            this.#fileTree_.refreshFolder(folderPath);
        });

        this.#fileTree_.bind('afterRenameNode', (folderPath) => {
            this.#fileTree_.refreshFolder(folderPath);
        });

        this.#fileTree_.bind('afterRefreshNode', (refreshedNode) => {
            const selectedNodeId = this.#fileTree_.getSelectedNodeId();
            if (!selectedNodeId) {
                this.hideEditor();
            }
        });

        const fileTreeContextMenu = this.#fileTree_.getContextMenu();
        const fileTreeMenu = fileTreeContextMenu.getItem('menu');

        fileTreeMenu.add({
            weight: 14,
            type: 'sep5',
            preconditionFn: ($trigger) => {
                const selectedNodeId = this.#fileTree_.getSelectedNodeId();
                let type = $trigger.attr('type');
                let id = $trigger.attr('id');
                if (type === 'file' && selectedNodeId !== id) {
                    return false;
                }
                return true;
            },
            data: '---------'
        });

        fileTreeMenu.add({
            weight: 15,
            type: 'refresh',
            preconditionFn: ($trigger) => {
                const selectedNodeId = this.#fileTree_.getSelectedNodeId();
                let type = $trigger.attr('type');
                let id = $trigger.attr('id');
                if (type === 'file' && selectedNodeId !== id) {
                    return false;
                }
                return true;
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['statusbar.ampy.refresh'], ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        this.#fileTree_.openRootFolder();
                        this.#fileTree_.refreshFolder('/');
                    } else if (type === 'folder') {
                        let id = $trigger.attr('id');
                        this.#fileTree_.openNode(id);
                        this.#fileTree_.refreshFolder(id);
                    } else {
                        const nodes = this.#fileTree_.getSelectedNodes();
                        this.#fileTree_.runEvent('afterSelectLeaf', nodes);
                    }
                }
            }
        });

        fileTreeMenu.add({
            weight: 16,
            type: 'sep6',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root'].includes(type);
            },
            data: '---------'
        });

        fileTreeMenu.add({
            weight: 17,
            type: 'exit',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['statusbar.ampy.exit'], ''),
                callback: () => {
                    this.closeFS();
                }
            }
        });

        fileTreeMenu.remove('copy');
        fileTreeMenu.remove('cut');
        fileTreeMenu.remove('paste');
        fileTreeMenu.remove('sep2');

        const editorContextMenu = this.#editor_.getContextMenu();
        const editorMenu = editorContextMenu.getItem('code');

        editorMenu.empty();

        editorMenu.add({
            weight: 0,
            type: 'cut',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.cut'], 'Ctrl+X'),
                callback: () => this.#editor_.cut()
            }
        });
        editorMenu.add({
            weight: 1,
            type: 'copy',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.copy'], 'Ctrl+C'),
                callback: () => this.#editor_.copy()
            }
        });
        editorMenu.add({
            weight: 2,
            type: 'paste',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.paste'], 'Ctrl+V'),
                callback: () => this.#editor_.paste()
            }
        });
        editorMenu.add({
            weight: 3,
            type: 'sep1',
            data: '---------'
        });
        editorMenu.add({
            weight: 4,
            type: 'togglecomment',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.togglecomment'], 'Ctrl+/'),
                callback: () => this.#editor_.commentLine()
            }
        });
        /*editorMenu.add({
            weight: 5,
            type: 'toggleBlockComment',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.toggleBlockComment'], 'Shift+Alt+A'),
                callback: (key, opt) => this.#editor_.blockComment()
            }
        });*/

        editorMenu.add({
            weight: 6,
            type: 'sep2',
            preconditionFn: () => {
                return this.#changed_;
            },
            data: '---------'
        });

        editorMenu.add({
            weight: 7,
            type: 'save',
            preconditionFn: () => {
                return this.#changed_;
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['file.save'], 'Ctrl+S'),
                callback: async () => {
                    await this.put();
                }
            }
        });

        const { commands } = this.#editor_.getEditor();
        commands.addCommand({
            name: "save",
            bindKey: "Ctrl-S",
            exec: async () => {
                if (!this.#changed_) {
                    return;
                }
                await this.put();
            }
        });
    }

    async put() {
        this.#fileTree_.showProgress();
        const id = this.#fileTree_.getSelectedNodeId();
        const fs = this.#fileTree_.getFS();
        const [error, stdout] = await fs.writeFile(id, this.#editor_.getValue());
        this.#fileTree_.hideProgress();
        if (!error) {
            this.setStatus(false);
        }
    }

    showFileTree() {
        if (this.#fileTreeShown_) {
            return;
        }
        this.#$openFS_.detach();
        this.#$fileTree_.empty();
        this.#$fileTree_.append(this.#fileTree_.getContent());
        this.#fileTreeShown_ = true;
    }

    hideFileTree() {
        if (!this.#fileTreeShown_) {
            return;
        }
        this.#fileTree_.getContent().detach();
        this.#$fileTree_.empty();
        this.#$fileTree_.append(this.#$openFS_);
        this.#fileTreeShown_ = false;
    }

    showEditor() {
        if (this.#editorShown_) {
            return;
        }
        this.#$editorEmpty_.detach();
        this.#$editor_.empty();
        this.#$editor_.append(this.#editor_.getContent());
        this.#editorShown_ = true;
    }

    hideEditor() {
        if (!this.#editorShown_) {
            return;
        }
        this.#editor_.getContent().detach();
        this.#$editor_.empty();
        this.#$editor_.append(this.#$editorEmpty_);
        this.#editorShown_ = false;
        this.setStatus(false);
    }

    getDrag() {
        return this.#drag_;
    }

    init() {
        super.init();
        this.addDirty();
        this.setMarkStatus('negative');
        this.#editor_.init();
        this.#addEventsListener_();
        const editor = this.#editor_.getEditor();
        editor.setReadOnly(false);
        editor.renderer.setShowGutter(true);
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            newLineMode: 'unix'
        });
        editor.on('change', () => {
            this.setStatus(true);
        });
    }

    openFS() {
        const port = Serial.getSelectedPortName();
        if (!port) {
            layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
                time: 1000
            });
            return;
        }
        const fs = this.#fileTree_.getFS();
        fs.setPortName(port);
        this.#fileTree_.setFolderPath('/');
        this.#fileTree_.setRootFolderName(`${port} - /`);
        this.#fileTree_.openRootFolder();
        this.showFileTree();
    }

    closeFS() {
        this.#fileTree_.deselectAll();
        this.hideFileTree();
        this.hideEditor();
        this.setStatus(false);
    }

    onMounted() {
        super.onMounted();
        this.#editor_.onMounted();
        this.#fileTree_.onMounted();
        // this.#fileTree_.refreshFolder('/');
    }

    onUnmounted() {
        // this.hideEditor();
        // this.#fileTree_.deselectAll();
        super.onUnmounted();
        this.#editor_.onUnmounted();
        this.#fileTree_.onUnmounted();
    }

    resize() {
        super.resize();
        this.#editor_.resize();
        this.#fileTree_.resize();
    }

    setStatus(isChanged) {
        if (this.#changed_ === isChanged) {
            return;
        }
        this.#changed_ = isChanged;
        if (isChanged) {
            this.setMarkStatus('positive');
        } else {
            this.setMarkStatus('negative');
        }
    }

    dispose() {
        this.#$fileTree_ = null;
        this.#$editor_ = null;
        this.#$openFS_ = null;
        this.#$editorEmpty_ = null;
        this.#editor_.dispose();
        this.#editor_ = null;
        this.#fileTree_.dispose();
        this.#fileTree_ = null;
        this.#drag_.dispose();
        this.#drag_ = null;
        super.dispose();
    }
}

Mixly.StatusBarAmpy = StatusBarAmpy;

});