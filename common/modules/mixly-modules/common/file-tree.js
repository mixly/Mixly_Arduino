goog.loadJs('common', () => {

goog.require('XScrollbar');
goog.require('path');
goog.require('$.jstree');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.require('Mixly.Menu');
goog.require('Mixly.ContextMenu');
goog.require('Mixly.Registry');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Debug');
goog.require('Mixly.Component');
goog.require('Mixly.HTMLTemplate');
goog.provide('Mixly.FileTree');

const {
    Env,
    Msg,
    Config,
    Menu,
    Events,
    ContextMenu,
    Registry,
    IdGenerator,
    Debug,
    Component,
    HTMLTemplate
} = Mixly;

const { USER } = Config;

class FileTree extends Component {
    static {
        this.FILE_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/file-icons.json'));
        this.FOLDER_ICON_MAP = goog.getJSON(path.join(Env.templatePath, 'json/folder-icons.json'));

        HTMLTemplate.add(
            'html/file-tree.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/file-tree.html')))
        );
    }

    #$openFolderContent_ = null;
    #$folderContent_ = null;
    #$rootFolder_ = null;
    #$iconTriangle_ = null;
    #$iconFolder_ = null;
    #$name_ = null;
    #$children_ = null;
    #$progress_ = null;
    #$mask_ = null;
    #$fileTree_ = null;
    #mprogress_ = null;
    #rootFolderOpened_ = false;
    #rootPath_ = '';
    #rootName_ = '';
    #rootTitle_ = '';
    #fs_ = null;
    #contextMenu_ = null;
    #selected_ = null;
    #jstree_ = null;
    #scrollbar_ = null;

    constructor(fs) {
        super();
        const $content = $(HTMLTemplate.get('html/file-tree.html').render());
        this.setContent($content);
        this.#$rootFolder_ = $content.find('.folder-title');
        this.#$iconTriangle_ = this.#$rootFolder_.find('.triangle');
        this.#$iconFolder_ = this.#$rootFolder_.find('.folder');
        this.#$name_ = this.#$rootFolder_.find('.name');
        this.#$children_ = $content.find('.children');
        this.#$progress_ = $content.children('.progress');
        this.#$mask_ = $content.children('.mask');
        this.#fs_ = fs;
        this.#rootPath_ = '';
        this.#scrollbar_ = new XScrollbar(this.#$children_[0], {
            onlyHorizontal: false,
            thumbSize: '4px',
            thumbRadius: '1px',
            thumbBackground: USER.theme === 'dark'? '#b0b0b0' : '#5f5f5f'
        });
        this.#$fileTree_ = $(this.#scrollbar_.$content);
        this.#$fileTree_.jstree({
            core: {
                strings: {
                    'Loading ...': Msg.Lang['fileTree.loading'] + '...'
                },
                multiple: false,
                animation: false,
                worker: false,
                dblclick_toggle: false,
                check_callback: function(operation, node, parent, position, more) {
                    if(operation === 'copy_node' || operation === 'move_node') {
                        if(parent.id === '#') {
                            return false;
                        }
                    }
                    return true;
                },
                data: (node, cb) => {
                    if (!this.#rootPath_) {
                        cb([]);
                        return;
                    }
                    this.showProgress();
                    let folderPath = this.#rootPath_;
                    if(node.id !== '#') {
                        let $li = this.#jstree_.get_node(node, true);
                        let $i = $li.find('.jstree-anchor > .jstree-icon');
                        $i.addClass('layui-anim layui-anim-fadein layui-anim-fadeout layui-anim-loop');
                        folderPath = node.id;
                    }
                    this.#getChildren_(folderPath)
                    .then((data) => {
                        cb(data);
                    })
                    .catch(Debug.error)
                    .finally(() => this.hideProgress());
                },
                themes: {
                    dots: true,
                    name: USER.theme === 'light'? 'default' : 'default-dark',
                    responsive: false,
                    ellipsis: true
                }
            },
            plugins: ['wholerow', 'unique']
        });
        this.#jstree_ = this.#$fileTree_.jstree(true);
        this.addEventsType([
            'beforeSelectLeaf', 'afterSelectLeaf', 'afterOpenNode', 'afterCloseNode', 'afterRefreshNode',
            'afterCreateNode', 'afterDeleteNode', 'afterRenameNode'
        ]);
        this.#addEventsListener_();
        this.#addContextMenu_();
        this.nodeAliveRegistry = new Registry();
        this.delayRefreshRegistry = new Registry();
        this.watchRegistry = new Registry();
    }

    #addEventsListener_() {
        this.#$fileTree_
        .on('click.jstree', '.jstree-open>a', ({ target }) => {
            setTimeout(() => {
                $(target).parent().removeClass('jstree-leaf').addClass('jstree-opened');
                this.#jstree_.close_node(target);
            });
        })
        .on('click.jstree', '.jstree-closed>a', ({ target }) => {
            setTimeout(() => {
                $(target).parent().removeClass('jstree-leaf').addClass('jstree-closed');
                this.#jstree_.open_node(target);
            });
        })
        .on('open_node.jstree', (e, data) => {
            const { id } = data.node;
            let elem = document.getElementById(id);
            let $i = $(elem).children('.jstree-anchor').children('.jstree-icon');
            $i.addClass('opened');
        })
        .on('close_node.jstree', (e, data) => {
            const { id } = data.node;
            let elem = document.getElementById(id);
            let $i = $(elem).children('.jstree-anchor').children('.jstree-icon');
            $i.removeClass('opened');
        })
        .on('after_open.jstree', (e, data) => {
            const { id } = data.node;
            const eventId = this.nodeAliveRegistry.getItem(id);
            if (eventId) {
                clearTimeout(eventId);
                this.nodeAliveRegistry.unregister(id);
            } else {
                this.watchFolder(id);
            }
            this.runEvent('afterOpenNode', data);
            this.reselect();
        })
        .on('after_close.jstree', (e, data) => {
            const { id } = data.node;
            const eventId = setTimeout(() => {
                this.unwatchFolder(id);
            }, 60 * 1000);
            if (!this.nodeAliveRegistry.getItem(id)) {
                this.nodeAliveRegistry.register(id, eventId);
            }
            this.runEvent('afterCloseNode', data);
            this.reselect();
        })
        .on('changed.jstree', (e, data) => {
            const selected = data.instance.get_selected(true);
            if (!selected.length) {
                // this.#selected_ = null;
                return;
            }
            if ((selected[0].icon || '').indexOf('foldericon') !== -1) {
                this.reselect();
                return;
            }
            if (selected[0].id === this.#selected_) {
                return;
            }
            const result = this.runEvent('beforeSelectLeaf', selected);
            if ((result.length && result[0]) || !result.length) {
                this.#selected_ = selected[0].id;
                this.runEvent('afterSelectLeaf', selected);
            } else {
                this.deselect(selected[0].id);
                this.reselect();
            }
        })
        .on('refresh.jstree', (e, data) => {
            this.runEvent('afterRefreshNode', data.node);
        })
        .on('refresh_node.jstree', (e, data) => {
            this.runEvent('afterRefreshNode', data.node);
        });

        this.#$rootFolder_.click(() => {
            if (this.isRootFolderOpened()) {
                this.closeRootFolder();
            } else {
                this.openRootFolder();
                this.reselect();
            }
        });
    }

    #addContextMenu_() {
        const selector = `div[page-id="${this.getId()}"] .jstree-node, div[page-id="${this.getId()}"] > button`;
        this.#contextMenu_ = new ContextMenu(selector, {
            events: {
                hide: ({ $trigger }) => {
                    $trigger.removeClass('active');
                },
                activated: ({ $trigger }) => {
                    $trigger.addClass('active');
                }
            }
        });
        this.#addFileContextMenuItems_();
        this.#contextMenu_.bind('getMenu', () => 'menu');
    }

    #addFileContextMenuItems_() {
        let menu = new Menu();
        menu.add({
            weight: 0,
            type: 'new_folder',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['fileTree.newFolder'], ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        this.openRootFolder();
                        this.createRootChildFolderNode();
                    } else {
                        let id = $trigger.attr('id');
                        this.createFolderNode(id);
                    }
                }
            }
        });
        menu.add({
            weight: 1,
            type: 'new_file',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['root', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['fileTree.newFile'], ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        this.openRootFolder();
                        this.createRootChildFileNode();
                    } else {
                        let id = $trigger.attr('id');
                        this.createFileNode(id);
                    }
                }
            }
        });
        menu.add({
            weight: 2,
            type: 'sep1',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['folder'].includes(type);
            },
            data: '---------'
        });
        menu.add({
            weight: 3,
            type: 'cut',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.cut'], ''),
                callback: (_, { $trigger }) => {
                    let id = $trigger.attr('id');
                    this.cutNode(id);
                }
            }
        });
        menu.add({
            weight: 4,
            type: 'copy',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.copy'], ''),
                callback: (_, { $trigger }) => {
                    let id = $trigger.attr('id');
                    this.copyNode(id);
                }
            }
        });
        menu.add({
            weight: 5,
            type: 'paste',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['editor.contextMenu.paste'], ''),
                callback: (_, { $trigger }) => {
                    let id = $trigger.attr('id');
                    this.pasteNode(id);
                }
            }
        });
        menu.add({
            weight: 6,
            type: 'sep2',
            data: '---------'
        });
        menu.add({
            weight: 7,
            type: 'copy_path',
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['fileTree.copyPath'], ''),
                callback: (_, { $trigger }) => {
                    let outPath = null;
                    let type = $trigger.attr('type');
                    if (type === 'root') {
                        outPath = this.#rootPath_;
                    } else {
                        outPath = $trigger.attr('id');
                    }
                    navigator.clipboard.writeText(outPath)
                    .catch(Debug.error);
                }
            }
        });
        menu.add({
            weight: 8,
            type: 'rename',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['fileTree.rename'], ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    let id = $trigger.attr('id');
                    if (type === 'folder') {
                        this.renameFolderNode(id);
                    } else {
                        this.renameFileNode(id);
                    }
                }
            }
        });
        menu.add({
            weight: 9,
            type: 'del',
            preconditionFn: ($trigger) => {
                let type = $trigger.attr('type');
                return ['file', 'folder'].includes(type);
            },
            data: {
                isHtmlName: true,
                name: ContextMenu.getItem(Msg.Lang['fileTree.delete'], ''),
                callback: (_, { $trigger }) => {
                    let type = $trigger.attr('type');
                    let id = $trigger.attr('id');
                    if (type === 'folder') {
                        if (this.#selected_) {
                            const relative = path.relative(id, this.#selected_);
                            if (relative.indexOf('../') !== 0) {
                                this.deselect(this.#selected_);
                            }
                        }
                        this.deleteFolderNode(id);
                    } else {
                        if (this.#selected_ === id) {
                            this.deselect(id);
                        }
                        this.deleteFileNode(id);
                    }
                }
            }
        });
        this.#contextMenu_.register('menu', menu);
    }

    getContextMenu() {
        return this.#contextMenu_;
    }

    openRootFolder() {
        if (this.isRootFolderOpened()) {
            return;
        }
        this.#$iconTriangle_.removeClass('codicon-chevron-right');
        this.#$iconTriangle_.addClass('codicon-chevron-down');
        this.#$iconFolder_.addClass('opened');
        this.#$rootFolder_.addClass('opened');
        this.#$children_.css('display', 'block');
        this.#rootFolderOpened_ = true;
    }

    closeRootFolder() {
        if (!this.isRootFolderOpened()) {
            return;
        }
        this.#$iconTriangle_.removeClass('codicon-chevron-down');
        this.#$iconTriangle_.addClass('codicon-chevron-right');
        this.#$iconFolder_.removeClass('opened');
        this.#$rootFolder_.removeClass('opened');
        this.#$children_.css('display', 'none');
        const selected = this.#selected_;
        this.deselectAll();
        this.#selected_ = selected;
        this.#rootFolderOpened_ = false;
    }

    isRootFolderOpened() {
        return this.#rootFolderOpened_;
    }

    setFolderPath(folderPath) {
        let newFolderPath = path.join(folderPath);
        if (newFolderPath === this.#rootPath_) {
            this.#jstree_.refresh();
            return;
        }
        if (this.#rootPath_) {
            this.unwatchFolder(this.#rootPath_);
        }
        this.#rootPath_ = newFolderPath;
        this.nodeAliveRegistry.reset();
        this.#jstree_.refresh();
        this.watchFolder(this.#rootPath_);
        this.setRootFolderTitle(this.#rootPath_);
        const rootNodeName = path.basename(folderPath).toUpperCase();
        this.setRootFolderName(rootNodeName);
    }

    getFolderPath() {
        return this.#rootPath_;
    }

    setRootFolderName(name) {
        this.#rootName_ = name;
        this.#$name_.text(name);
    }

    getRootFolderName() {
        return this.#rootName_;
    }

    setRootFolderTitle(name) {
        this.#rootTitle_ = name;
        this.#$rootFolder_.attr('title', name);
    }

    getRootFolderTitle() {
        return this.#rootTitle_;
    }

    refreshFolder(folderPath) {
        // 延迟刷新节点，防止过于频繁的IO操作
        let eventId = this.delayRefreshRegistry.getItem(folderPath);
        if (eventId) {
            clearTimeout(eventId);
            this.delayRefreshRegistry.unregister(folderPath);
        }
        eventId = setTimeout(() => {
            if (folderPath === this.#rootPath_) {
                this.#jstree_.refresh();
                return;
            }
            const node = this.#jstree_.get_node(folderPath);
            const nodeIsOpened = node && !this.isClosed(folderPath);
            if (nodeIsOpened) {
                this.watchFolder(folderPath);
                this.clearFolderTemp(folderPath);
                this.#jstree_.refresh_node(folderPath);
            } else {
                this.unwatchFolder(folderPath);
            }
        }, 500);
        this.delayRefreshRegistry.register(folderPath, eventId);
    }

    clearFolderTemp(folderPath) {
        const node = this.#jstree_.get_node(folderPath);
        if (!node) {
            return;
        }
        node.state.loaded = false;
    }

    watchFolder(folderPath) {
        if (this.isWatched(folderPath)) {
            return;
        }
        this.watchRegistry.register(folderPath, 'folder');
    }

    unwatchFolder(folderPath) {
        if (!this.isWatched(folderPath)) {
            return;
        }
        this.clearFolderTemp(folderPath);
        const keys = this.nodeAliveRegistry.keys();
        for (let key of keys) {
            if (key.indexOf(folderPath) === -1) {
                continue;
            }
            const eventId = this.nodeAliveRegistry.getItem(key);
            if (eventId) {
                clearTimeout(eventId);
                this.nodeAliveRegistry.unregister(key);
            }
        }
        this.watchRegistry.unregister(folderPath);
    }

    watchFile(filePath) {}

    unwatchFile(filePath) {}

    isWatched(inPath) {
        return !!this.watchRegistry.getItem(inPath);
    }

    isClosed(inPath) {
        return this.#jstree_.is_closed(inPath);
    }

    select(inPath) {
        let elem = document.getElementById(inPath);
        if (!elem) {
            this.#selected_ = null;
            return;
        }
        this.#selected_ = inPath;
        this.#jstree_.select_node(inPath, true, true);
        $(elem).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
    }

    reselect() {
        if (!this.#selected_) {
            return;
        }
        let elem = document.getElementById(this.#selected_);
        if (!elem) {
            return;
        }
        this.#jstree_.select_node(this.#selected_, true, true);
        $(elem).children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
    }

    deselect(inPath) {
        if (this.#selected_ === inPath) {
            this.#selected_ = null;
        }
        let elem = document.getElementById(inPath);
        if (!elem) {
            return;
        }
        this.#jstree_.deselect_node(elem, true);
        $(elem).children('.jstree-wholerow').removeClass('jstree-wholerow-clicked');
    }

    deselectAll() {
        this.#selected_ = null;
        this.#jstree_.deselect_all();
    }

    getSelectedNodeId() {
        return this.#selected_;
    }

    getNode(inPath) {
        return this.#jstree_.get_node(inPath);
    }

    getSelectedNodes() {
        return this.#jstree_.get_selected(true);
    }

    async #getChildren_(inPath) {
        let output = [];
        const content = await this.readFolder(inPath);
        for (let item of content) {
            const { type, id, title, children } = item;
            const text = path.basename(id);
            let icon = 'icon-doc';
            if (type === 'folder') {
                icon = this.#getFolderIcon_(text);
            } else {
                icon = this.#getFileIcon_(text);
            }
            output.push({
                text,
                id,
                children,
                li_attr: {
                    type,
                    name: text,
                    title: title ?? id
                },
                icon
            });
        }
        return output;
    }

    async readFolder(inPath) {
        return [];
    }

    #getFileIcon_(filename) {
        const prefix = 'fileicon-';
        if (FileTree.FILE_ICON_MAP[filename]) {
            return prefix + FileTree.FILE_ICON_MAP[filename];
        }
        const extname = path.extname(filename).toLowerCase();
        if (FileTree.FILE_ICON_MAP[extname]) {
            return prefix + FileTree.FILE_ICON_MAP[extname];
        }
        return prefix + FileTree.FILE_ICON_MAP['default'];
    }

    #getFolderIcon_(foldername) {
        const prefix = 'foldericon-';
        if (FileTree.FOLDER_ICON_MAP[foldername]) {
            return prefix + FileTree.FOLDER_ICON_MAP[foldername];
        }
        return prefix + FileTree.FOLDER_ICON_MAP['default'];
    }

    createRootChildNode(type) {
        this.showProgress();
        this.hideMask();
        const node = this.#jstree_.get_node('#');
        const children = false;
        let icon = 'foldericon-default';
        if (type === 'file') {
            icon = 'fileicon-mix';
        }
        const folderPath = this.#rootPath_;
        this.#jstree_.create_node(node, { children, icon }, 'first', (childNode) => {
            this.#jstree_.edit(childNode, '', (newNode) => {
                this.showMask();
                const desPath = path.join(folderPath, newNode.text);
                this.#jstree_.delete_node(newNode);
                const oldNode = this.#jstree_.get_node(desPath);
                if (oldNode || !newNode.text) {
                    this.hideProgress();
                    return;
                }
                let createPromise = null;
                if (type === 'file') {
                    createPromise = this.#fs_.createFile(desPath);
                } else {
                    createPromise = this.#fs_.createDirectory(desPath);
                }
                createPromise
                .catch(Debug.error)
                .finally(() => {
                    this.hideProgress();
                    this.runEvent('afterCreateNode', folderPath);
                });
            });
        });
    }

    createRootChildFileNode() {
        this.createRootChildNode('file');
    }

    createRootChildFolderNode() {
        this.createRootChildNode('folder');
    }

    createNode(type, folderPath) {
        this.showProgress();
        this.hideMask();
        const node = this.#jstree_.get_node(folderPath);
        const children = false;
        let icon = 'foldericon-default';
        if (type === 'file') {
            icon = 'fileicon-mix';
        }
        if (folderPath === '#') {
            folderPath = this.#rootPath_;
        }
        this.#jstree_.open_node(node, () => {
            this.#jstree_.create_node(node, { children, icon }, 'first', (childNode) => {
                this.#jstree_.edit(childNode, '', (newNode) => {
                    this.showMask();
                    this.#jstree_.delete_node(newNode);
                    if (!newNode.text) {
                        this.hideProgress();
                        return;
                    }
                    const desPath = path.join(folderPath, newNode.text);
                    const parentNode = this.#jstree_.get_node(folderPath) ?? {};
                    for (let nodeId of parentNode.children ?? []) {
                        if (nodeId !== desPath) {
                            continue;
                        }
                        this.hideProgress();
                        return;
                    }
                    let createPromise = null;
                    if (type === 'file') {
                        createPromise = this.#fs_.createFile(desPath);
                    } else {
                        createPromise = this.#fs_.createDirectory(desPath);
                    }
                    createPromise
                    .catch(Debug.error)
                    .finally(() => {
                        this.hideProgress();
                        this.runEvent('afterCreateNode', folderPath);
                    });
                });
            });
        });
    }

    createFileNode(folderPath) {
        this.createNode('file', folderPath);
    }

    createFolderNode(folderPath) {
        this.createNode('folder', folderPath);
    }

    renameNode(type, inPath) {
        this.showProgress();
        this.hideMask();
        const node = this.#jstree_.get_node(inPath);
        const oldNodeName = node.text;
        this.#jstree_.edit(node, oldNodeName, (newNode) => {
            this.showMask();
            const folderPath = path.join(inPath, '..');
            const desPath = path.join(folderPath, newNode.text);
            this.#jstree_.close_node(newNode);
            if (oldNodeName === newNode.text) {
                this.hideProgress();
                return;
            }
            this.#jstree_.rename_node(newNode, oldNodeName);
            const parentNode = this.#jstree_.get_node(folderPath) ?? {};
            for (let nodeId of parentNode.children ?? []) {
                if (nodeId !== desPath) {
                    continue;
                }
                this.hideProgress();
                return;
            }
            let renamePromise = null;
            if (type === 'file') {
                renamePromise = this.#fs_.renameFile(inPath, desPath);
            } else {
                renamePromise = this.#fs_.renameDirectory(inPath, desPath);
            }
            renamePromise
            .catch(Debug.error)
            .finally(() => {
                this.hideProgress();
                this.runEvent('afterRenameNode', path.join(inPath, '..'));
            });
        });
    }

    renameFileNode(filePath) {
        this.renameNode('file', filePath);
    }

    renameFolderNode(folderPath) {
        this.renameNode('folder', folderPath);
    }

    deleteNode(type, inPath) {
        this.showProgress();
        let deletePromise = null;
        if (type === 'file') {
            deletePromise = this.#fs_.deleteFile(inPath);
        } else {
            deletePromise = this.#fs_.deleteDirectory(inPath);
        }
        deletePromise
        .catch(Debug.error)
        .finally(() => {
            this.hideProgress();
            this.runEvent('afterDeleteNode', path.join(inPath, '..'));
        });
    }

    deleteFileNode(filePath) {
        this.deleteNode('file', filePath);
    }

    deleteFolderNode(folderPath) {
        this.deleteNode('folder', folderPath);
    }

    copyNode(inPath) {
        const node = this.#jstree_.get_node(inPath);
        this.#jstree_.copy(node);
    }

    cutNode(inPath) {
        const node = this.#jstree_.get_node(inPath);
        this.#jstree_.cut(node);
    }

    pasteNode(folderPath) {
        if (!this.#jstree_.can_paste()) {
            return;
        }
        this.showProgress();
        const oldNodes = this.#jstree_.get_buffer();
        const oldNode = oldNodes.node[0];
        const { mode } = oldNodes;
        const { type } = oldNode.li_attr;
        let pastePromise = null;
        let startPath = oldNode.id;
        let endPath = path.join(folderPath, oldNode.text);
        if (mode === 'move_node') {
            if (type === 'file') {
                pastePromise = this.#fs_.moveFile(startPath, endPath);
            } else {
                pastePromise = this.#fs_.createDirectory(endPath)
                    .then(() => {
                        return this.#fs_.moveDirectory(startPath, endPath);
                    })
                    .then(() => {
                        return this.#fs_.deleteDirectory(startPath);
                    });
            }
        } else if (mode === 'copy_node') {
            if (type === 'file') {
                pastePromise = this.#fs_.copyFile(startPath, endPath);
            } else {
                pastePromise = this.#fs_.createDirectory(endPath)
                    .then(() => {
                        return this.#fs_.copyDirectory(startPath, endPath);
                    });
            }
        }
        pastePromise
        .catch(Debug.error)
        .finally(() => {
            this.clearFolderTemp(folderPath);
            this.#jstree_.refresh_node(folderPath);
            this.openNode(folderPath);
            this.hideProgress();
        });
    }

    openNode(folderPath) {
        const node = this.#jstree_.get_node(folderPath);
        if (!node) {
            return;
        }
        this.#jstree_.open_node(node);
    }

    dispose() {
        this.#jstree_.destroy();
        this.#scrollbar_.destroy();
        this.#contextMenu_.dispose();
        super.dispose();
    }

    getFS() {
        return this.#fs_;
    }

    setFS(fs) {
        this.#fs_ = fs;
    }

    showProgress() {
        this.#$progress_.css('display', 'block');
        this.showMask();
    }

    hideProgress() {
        this.#$progress_.css('display', 'none');
        this.hideMask();
    }

    showMask() {
        this.#$mask_.css('display', 'block');
    }

    hideMask() {
        this.#$mask_.css('display', 'none');
    }
}

Mixly.FileTree = FileTree;

});