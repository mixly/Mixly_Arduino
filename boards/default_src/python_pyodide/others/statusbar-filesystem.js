import * as Blockly from 'blockly/core';
import { layer } from 'layui';
import * as path from 'path';
import $ from 'jquery';
import {
    PageBase,
    Msg,
    HTMLTemplate,
    DragV,
    StatusBar,
    ContextMenu,
    Debug,
    StatusBarsManager,
    Workspace
} from 'mixly';
import FileSystemFileTree from './filesystem-file-tree';
import FILE_SYSTEM_TEMPLATE from '../templates/html/statusbar-filesystem.html';
import FILE_SYSTEM_OPEN_FS_TEMPLATE from '../templates/html/statusbar-filesystem-open-fs.html';
import FILE_SYSTEM_EDITOR_EMPTY_TEMPLATE from '../templates/html/statusbar-filesystem-editor-empty.html';



export default class StatusBarFileSystem extends PageBase {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-filesystem.html',
            new HTMLTemplate(FILE_SYSTEM_TEMPLATE)
        );

        HTMLTemplate.add(
            'html/statusbar/statusbar-filesystem-open-fs.html',
            new HTMLTemplate(FILE_SYSTEM_OPEN_FS_TEMPLATE)
        );

        HTMLTemplate.add(
            'html/statusbar/statusbar-filesystem-editor-empty.html',
            new HTMLTemplate(FILE_SYSTEM_EDITOR_EMPTY_TEMPLATE)
        );

        this.init = function () {
            StatusBarsManager.typesRegistry.register(['file-system'], StatusBarFileSystem);
            const mainWorkspace = Workspace.getMain();
            const statusBarsManager = mainWorkspace.getStatusBarsManager();
            statusBarsManager.add('file-system', 'file-system', Blockly.Msg.PYTHON_PYODIDE_FILE_SYSTEM);
            statusBarsManager.changeTo('output');
            return statusBarsManager.get('file-system');
        }
    }

    #$close_ = null;
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
    #nativefs_ = null;

    constructor() {
        super();
        const $content = $(HTMLTemplate.get('html/statusbar/statusbar-filesystem.html').render());
        this.setContent($content);
        this.#fileTree_ = new FileSystemFileTree();
        this.#$fileTree_ = $content.children('.file-tree');
        this.#$openFS_ = $(HTMLTemplate.get('html/statusbar/statusbar-filesystem-open-fs.html').render({
            msg: {
                loadFS: Blockly.Msg.PYTHON_PYODIDE_LOAD_FILE_SYSTEM
            }
        }));
        this.#$fileTree_.append(this.#$openFS_);
        this.#editor_ = new StatusBar();
        this.#$editor_ = $content.children('.editor');
        this.#$editorEmpty_ = $(HTMLTemplate.get('html/statusbar/statusbar-filesystem-editor-empty.html').render());
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
            this.selectFS().catch(Debug.error);
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
            try {
                const result = await fs.readFile(filePath);
                this.showEditor();
                this.#editor_.setValue(result);
                this.#editor_.scrollToTop();
                this.#editor_.focus();
                this.setStatus(false);
            } catch (error) {
                Debug.error(error);
                this.hideEditor();
                this.#fileTree_.deselectAll();
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

        this.#fileTree_.bind('afterRefreshNode', () => {
            const selectedNodeId = this.#fileTree_.getSelectedNodeId();
            if (!selectedNodeId) {
                this.hideEditor();
            }
        });

        const fileTreeContextMenu = this.#fileTree_.getContextMenu();
        const fileTreeMenu = fileTreeContextMenu.getItem('menu');

        fileTreeMenu.add({
            weight: 7,
            type: 'copy_path',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['fileTree.copyPath'], ''),
                callback: (_, { $trigger }) => {
                    let outPath = null;
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        outPath = this.#fileTree_.getRootFolderTitle();
                    } else {
                        outPath = $trigger.attr('title');
                    }
                    navigator.clipboard.writeText(outPath).catch(Debug.error);
                }
            }
        });

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
        try {
            await fs.writeFile(id, this.#editor_.getValue());
            this.setStatus(false);
        } catch (error) {
            Debug.error(error);
        } finally {
            this.#fileTree_.hideProgress();
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
        this.hideCloseBtn();
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
        this.loadFS().catch(Debug.error);
    }

    async loadFS() {
        const fs = this.#fileTree_.getFS();
        const directoryHandle = await fs.loadFS();
        await this.openFS(directoryHandle);
    }

    async selectFS() {
        const fs = this.#fileTree_.getFS();
        const directoryHandle = await fs.showDirectoryPicker();
        await this.openFS(directoryHandle);
    }

    async openFS(directoryHandle) {
        if (!directoryHandle?.name) {
            return;
        }
        const rootPath = '/' + directoryHandle.name;
        this.#fileTree_.setFolderPath('/');
        this.#fileTree_.setRootFolderTitle(rootPath);
        this.#fileTree_.setRootFolderName(directoryHandle.name);
        this.#fileTree_.openRootFolder();
        this.showFileTree();
        this.#nativefs_ = await window.pyodide.mountNativeFS(rootPath, directoryHandle);
    }

    closeFS() {
        const rootPath = this.#fileTree_.getRootFolderTitle();
        const rootContents = Object.keys(window.pyodide.FS.root.contents);
        if (rootContents.includes(path.basename(rootPath))) {
            const lookup = window.pyodide.FS.lookupPath(rootPath, {
                follow_mount: false
            });
            if (window.pyodide.FS.isMountpoint(lookup.node)) {
                window.pyodide.FS.unmount(rootPath);
            }
        }
        const fs = this.#fileTree_.getFS();
        fs.setFSCache(null);
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
    }

    getNativeFS() {
        return this.#nativefs_;
    }

    dispose() {
        this.#editor_.dispose();
        this.#editor_ = null;
        this.#fileTree_.dispose();
        this.#fileTree_ = null;
        super.dispose();
    }
}