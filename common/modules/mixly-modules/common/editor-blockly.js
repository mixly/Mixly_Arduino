goog.loadJs('common', () => {

goog.require('path');
goog.require('Blockly');
goog.require('WorkspaceSearch');
goog.require('Backpack');
goog.require('Minimap');
goog.require('PositionedMinimap');
goog.require('ContentHighlight');
goog.require('ZoomToFitControl');
goog.require('Blockly.FieldGridDropdown');
goog.require('Blockly.FieldDependentDropdown');
goog.require('Blockly.FieldSlider');
goog.require('Blockly.FieldBitmap');
goog.require('Blockly.FieldColourHsvSliders');
goog.require('Blockly.FieldDate');
goog.require('Blockly.FieldAngle');
goog.require('Blockly.FieldColour');
goog.require('Blockly.FieldMultilineInput');
goog.require('Blockly.Screenshot');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.ToolboxSearcher');
goog.require('Mixly.Debug');
goog.require('Mixly.EditorBase');
goog.provide('Mixly.EditorBlockly');

const {
    Config,
    Env,
    XML,
    HTMLTemplate,
    ToolboxSearcher,
    Debug,
    EditorBase
} = Mixly;
const { USER, BOARD } = Config;

Blockly.ALIGN_LEFT = Blockly.inputs.Align.LEFT;
Blockly.ALIGN_CENTRE = Blockly.inputs.Align.CENTRE;
Blockly.ALIGN_RIGHT = Blockly.inputs.Align.RIGHT;

class EditorBlockly extends EditorBase {
    static {
        HTMLTemplate.add(
            'html/editor/editor-blockly.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/editor/editor-blockly.html')))
        );

        HTMLTemplate.add(
            'xml/default-categories.xml',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'xml/default-categories.xml')))
        );

        this.$blockly = $('<div class="page-item"></div>');
        this.editor = null;
        this.workspace = null;
        this.initBlockly = () => {
            const DEFAULT_CATEGORIES = HTMLTemplate.get('xml/default-categories.xml').render();
            const media = path.join(Config.pathPrefix, 'common/media/');
            const renderer = ['geras', 'zelos'].includes(USER.blockRenderer) ? USER.blockRenderer : 'geras';
            this.editor = Blockly.inject(this.$blockly[0], {
                media,
                toolbox: DEFAULT_CATEGORIES,
                renderer,
                zoom: {
                    controls: true,
                    wheel: true,
                    scaleSpeed: 1.03
                },
                grid: USER.blocklyShowGrid ==='yes' ? {
                    spacing: 20,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                } : {}
            });

            this.editor.registerToolboxCategoryCallback(
                Blockly.Variables.CATEGORY_NAME,
                (...args) => Blockly.Variables.flyoutCategory(...args)
            );

            this.editor.registerToolboxCategoryCallback(
                Blockly.Procedures.CATEGORY_NAME,
                (...args) => Blockly.Procedures.flyoutCategory(...args)
            );

            this.editor.setTheme(Blockly.Themes[
                USER.theme === 'dark' ? 'Dark' : 'Classic'
            ]);

            this.addPlugins();
            this.workspace = new Blockly.Workspace(new Blockly.Options({
                toolbox: null
            }));
        }

        this.addPlugins = () => {
            const { editor } = this;
            Blockly.ContextMenuItems.registerCommentOptions();
            editor.configureContextMenu = (menuOptions, e) => {
                const workspaceSearchOption = {
                    text: Blockly.Msg['WORKSPACE_SEARCH_OPEN'],
                    enabled: editor.getTopBlocks().length,
                    callback: () => {
                        this.workspaceSearch.open();
                    }
                };
                menuOptions.push(workspaceSearchOption);
                const screenshotOption = {
                    text: Blockly.Msg['DOWNLOAD_SCREENSHOT'],
                    enabled: editor.getTopBlocks().length,
                    callback: function() {
                        Blockly.Screenshot.downloadScreenshot(editor);
                    },
                };
                menuOptions.push(screenshotOption);
            }

            this.toolboxSeacher = new ToolboxSearcher(editor);

            this.workspaceSearch = new WorkspaceSearch(editor);
            this.workspaceSearch.init();

            this.zoomToFit = new ZoomToFitControl(editor);
            this.zoomToFit.init();

            this.backpack = new Backpack(editor, {
                useFilledBackpackImage: true,
                skipSerializerRegistration: false,
                contextMenu: {
                    emptyBackpack: true,
                    removeFromBackpack: true,
                    copyToBackpack: true,
                    copyAllToBackpack: true,
                    pasteAllToBackpack: true,
                    disablePreconditionChecks: false
                }
            });
            this.backpack.init();

            /*if (USER.blocklyMultiselect === 'yes') {
                this.multiselectPlugin = new Multiselect(editor);
                this.multiselectPlugin.init({
                    useDoubleClick: false,
                    bumpNeighbours: false,
                    multiselectIcon: {
                        hideIcon: true
                    },
                    multiselectCopyPaste: {
                        crossTab: true,
                        menu: false
                    }
                });
            }
            
            if (USER.blocklyShowMinimap === 'yes') {
                this.minimap = new PositionedMinimap(editor);
                this.minimap.init();
            }*/
            
            if (USER.blocklyContentHighlight === 'yes') {
                this.contentHighlight = new ContentHighlight(editor);
                this.contentHighlight.init();
            }
        }

        this.getEditor = () => {
            return this.editor;
        }

        this.getContent = () => {
            return this.$blockly;
        }

        this.getXML = (workspace) => {
            const $xml = $(Blockly.Xml.workspaceToDom(workspace));
            return $xml[0].outerHTML;
        }

        this.getRawCode = (workspace, generator) => {
            return generator?.workspaceToCode(workspace) || '';
        }

        this.getCode = (workspace, generator) => {
            let code = generator?.workspaceToCode(workspace) || '';
            code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
                try {
                    return decodeURIComponent(s.replace(/_/g, '%'));
                } catch (error) {
                    Debug.error(error);
                    return s;
                }
            });
            return code;
        }

        this.updateToolbox = () => {
            this.editor.updateToolbox($('#toolbox')[0]);
        }

        this.reloadWorkspace = () => {
            Blockly.Events.disable();
            let workspaceState = Blockly.serialization.workspaces.save(this.editor);
            let undoStack = [...this.editor.undoStack_];
            let redoStack = [...this.editor.redoStack_];
            Blockly.serialization.workspaces.load(workspaceState, this.editor, {
                recordUndo: false
            });
            this.editor.undoStack_ = [...undoStack];
            this.editor.redoStack_ = [...redoStack];
            Blockly.Events.enable();
        }

        this.initBlockly();
    }

    #editor_ = null;
    #workspaceState_ = null;
    #undoStack_ = null;
    #redoStack_ = null;

    constructor() {
        super();
        this.setContent(
            $(HTMLTemplate.get('html/editor/editor-blockly.html').render())
        );
        this.#editor_ = EditorBlockly.getEditor();
    }

    getEditor() {
        return this.#editor_;
    }

    undo() {
        super.undo();
        this.#editor_.undo(0);
    }

    redo() {
        super.redo();
        this.#editor_.undo(1);
    }

    setVisible(status) {
        this.#editor_.setVisible(status);
    }

    scrollCenter() {
        this.#editor_.scrollCenter();
    }

    resize() {
        // 重新调整编辑器尺寸
        this.#editor_.hideChaff(false);
        this.#editor_.hideComponents(true);
        Blockly.common.svgResize(this.#editor_);
        Blockly.bumpObjects.bumpTopObjectsIntoBounds(this.#editor_);
        super.resize();
    }

    dispose() {
        super.dispose();
        if (this.isActive()) {
            Blockly.Events.disable();
            this.#editor_.clear();
            Blockly.Events.enable();
            EditorBlockly.getContent().detach();
        }
        this.#undoStack_ = null;
        this.#redoStack_ = null;
        this.#editor_ = null;
        this.getContent().remove();
    }

    onMounted() {
        super.onMounted();
        this.getContent().append(EditorBlockly.getContent());
        setTimeout(() => {
            Blockly.Events.disable();
            if (this.#workspaceState_) {
                Blockly.serialization.workspaces.load(this.#workspaceState_, this.#editor_, {
                    recordUndo: false
                });
            } else {
                this.#editor_.clear();
            }
            if (this.#undoStack_) {
                this.#editor_.undoStack_ = [...this.#undoStack_];
            }
            if (this.#redoStack_) {
                this.#editor_.redoStack_ = [...this.#redoStack_];
            }
            Blockly.Events.enable();
        }, 0);
    }

    onUnmounted() {
        super.onUnmounted();
        EditorBlockly.getContent().detach();
        this.getContent().empty();
        this.#workspaceState_ = Blockly.serialization.workspaces.save(this.#editor_);
        this.#undoStack_ = [...this.#editor_.undoStack_];
        this.#redoStack_ = [...this.#editor_.redoStack_];
        Blockly.Events.disable();
        this.#editor_.clearUndo();
        Blockly.Events.enable();
    }

    setValue(data, ext) {}

    #getTargetWorkspace_() {
        let workspace = this.#editor_;
        if (!this.isActive()) {
            if (this.isDirty()) {
                this.#workspaceState_ = Blockly.serialization.workspaces.save(this.#editor_);
            }
            Blockly.serialization.workspaces.load(this.#workspaceState_, EditorBlockly.workspace, {
                recordUndo: false
            });
            workspace = EditorBlockly.workspace;
        }
        return workspace;
    }

    getXML() {
        const workspace = this.#getTargetWorkspace_();
        return EditorBlockly.getXML(workspace);
    }

    getRawCode() {
        const workspace = this.#getTargetWorkspace_();
        return EditorBlockly.getRawCode(workspace, Blockly.generator);
    }

    getCode() {
        const workspace = this.#getTargetWorkspace_();
        return EditorBlockly.getCode(workspace, Blockly.generator);
    }

    getMix() {
        const workspace = this.#getTargetWorkspace_();
        return {
            block: EditorBlockly.getXML(workspace),
            code: EditorBlockly.getCode(workspace, Blockly.generator)
        };
    }

    getValue() {
        return this.getCode();
    }
}

Mixly.EditorBlockly = EditorBlockly;

});