goog.loadJs('common', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.Title');
goog.require('Mixly.Env');
goog.require('Mixly.Debug');
goog.require('Mixly.Workspace');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.FooterLayer');
goog.provide('Mixly.FooterLayerExample');

const {
    Title,
    Env,
    Debug,
    Workspace,
    HTMLTemplate,
    FooterLayer
} = Mixly;

const { dropdown, tree } = layui;

class FooterLayerExample extends FooterLayer {
    static {
        // 弹层模板
        this.menuHTMLTemplate = new HTMLTemplate(
            goog.get(path.join(Env.templatePath, 'html/footerlayer/footerlayer-example.html'))
        );
    }

    constructor(element) {
        super(element, {
            onMount: (instance) => {
                this.examplesTree.reload({ data: this.getRoot() });
            }
        });
        this.$content.addClass('footer-layer-example');
        this.updateContent(FooterLayerExample.menuHTMLTemplate.render());
        this.$treeBody = this.$body.children('.example-tree-body');
        this.DEPTH = 5;
        this.render();
    }

    render() {
        this.examplesTree = tree.render({
            elem: this.$treeBody[0],
            data: this.getRoot(),
            accordion: true,
            anim: false,
            icon: [ 'icon-folder-empty', 'icon-folder-open-empty-1', 'icon-file-code' ],
            getChildren: (obj) => {
                return this.getChildren(obj.data.id);
            },
            click: (obj) => {
                if (obj.data.children) {
                    return;
                }
                this.dataToWorkspace(obj.data.id);
            },
            statusChange: () => {
                this.setProps({});
            }
        });
        this.examplesTree.config.statusChange();
    }

    // 可覆盖
    getRoot() {}

    // 可覆盖
    getChildren(inPath) {}

    // 可覆盖
    dataToWorkspace(inPath) {}

    updateCode(ext, data) {
        const editorMix = Workspace.getMain().getEditorsManager().getActive();
        editorMix.setValue(data, ext);
        Title.updateTitle(Title.title);
    }
}

Mixly.FooterLayerExample = FooterLayerExample;

});