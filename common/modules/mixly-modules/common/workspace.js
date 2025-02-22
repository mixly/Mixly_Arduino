goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.XML');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Drag');
goog.require('Mixly.DragH');
goog.require('Mixly.DragV');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.EditorsManager');
goog.require('Mixly.StatusBarsManager');
goog.require('Mixly.LeftSideBarsManager');
goog.require('Mixly.RightSideBarsManager');
goog.require('Mixly.Component');
goog.provide('Mixly.Workspace');

const {
    XML,
    Env,
    Msg,
    Drag,
    DragH,
    DragV,
    HTMLTemplate,
    EditorsManager,
    StatusBarsManager,
    LeftSideBarsManager,
    RightSideBarsManager,
    Component
} = Mixly;


class Workspace extends Component {
    static {
        HTMLTemplate.add(
            'html/workspace.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/workspace.html')))
        );

        this.workspaces = [];

        this.getAll = () => {
            return this.workspaces;
        }

        this.add = (workspace) => {
            this.remove(workspace);
            this.workspaces.push(workspace);
        }

        this.remove = (workspace) => {
            for (let i in this.workspaces) {
                if (this.workspaces[i].id !== workspace.id) {
                    continue;
                }
                this.workspaces.slice(i, 1);
            }
        }

        this.getMain = () => {
            if (this.workspaces.length) {
                return this.workspaces[0];
            }
            return null;
        }
    }

    #statusBarsManager_ = null;
    #editorsManager_ = null;
    #leftSideBarsManager_ = null;
    #rightSideBarsManager_ = null;
    #$dragVLeft_ = null;
    #$dragVRight_ = null;
    #$dragH_ = null;

    constructor(element) {
        super();
        const $content = $(HTMLTemplate.get('html/workspace.html').render());
        this.setContent($content);
        this.mountOn($(element));
        this.#$dragVLeft_ = $content.find('.drag-v-left');
        this.#$dragVRight_ = $content.find('.drag-v-right');
        this.#$dragH_ = $content.find('.drag-h');
        this.#statusBarsManager_ = new StatusBarsManager($content.find('.statusbars')[0]);
        this.#statusBarsManager_.add('terminal', 'output', Msg.Lang['statusbar.output']);
        this.#statusBarsManager_.changeTo('output');
        this.#editorsManager_ = new EditorsManager($content.find('.editors')[0]);
        this.#leftSideBarsManager_ = new LeftSideBarsManager($content.find('.left-sidebars')[0]);
        // this.#leftSideBarsManager_.add('local_storage', 'local_storage', '本地');
        // this.#leftSideBarsManager_.changeTo('local_storage');
        this.#rightSideBarsManager_ = new RightSideBarsManager($content.find('.right-sidebars')[0]);
        this.dragH = null;
        this.dragVLeft = null;
        this.dragVRight = null;
        Workspace.add(this);
        // this.#addEventsListenerForFileTree_();
        this.#addDragEventsListener_();
        // this.#addEventsListenerForEditorManager_();
        this.#addFuncForStatusbarTabs_();
    }

    #addEventsListenerForFileTree_() {
        const leftSideBarLocalStorage = this.getLeftSideBarsManager().get('local_storage');
        const fileTree = leftSideBarLocalStorage.getFileTree();
        fileTree.bind('afterSelectLeaf', (selected) => {
            const tabs = this.#editorsManager_.getTabs();
            tabs.addTab({
                name: selected[0].text,
                title: selected[0].id,
                id: selected[0].id,
                type: path.extname(selected[0].id),
                favicon: selected[0].icon,
                attr: {
                    'data-link-file': 'true'
                }
            });
        });
    }

    #addEventsListenerForEditorManager_() {
        const tabs = this.#editorsManager_.getTabs();
        tabs.bind('activeTabChange', (event) => {
            const leftSideBarLocalStorage = this.getLeftSideBarsManager().get('local_storage');
            const fileTree = leftSideBarLocalStorage.getFileTree();
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            fileTree.deselectAll();
            fileTree.select(tabId);
        });
        tabs.bind('tabDestroyed', (event) => {
            const leftSideBarLocalStorage = this.getLeftSideBarsManager().get('local_storage');
            const fileTree = leftSideBarLocalStorage.getFileTree();
            const { tabEl } = event.detail;
            const tabId = $(tabEl).attr('data-tab-id');
            fileTree.deselect(tabId);
        });
    }

    #addFuncForStatusbarTabs_() {
        this.#statusBarsManager_.bind('show', () => this.dragH.show(Drag.Extend.NEGATIVE));
        this.#statusBarsManager_.bind('hide', () => this.dragH.hide(Drag.Extend.NEGATIVE));
    }

    #addDragEventsListener_() {
        // 编辑器(上)+状态栏(下)
        this.dragH = new DragH(this.#$dragH_[0], {
            min: '50px',
            startSize: '100%',
            startExitFullSize: '70%'
        });

        this.dragH.bind('sizeChanged', () => {
            this.resize();
        });

        /*// 侧边栏(左)+[编辑器(上)+状态栏(下)]
        this.dragVLeft = new DragV(this.#$dragVLeft_[0], {
            min: '100px',
            full: [true, false],
            startSize: '0%',
            startExitFullSize: '15%'
        });

        this.dragVLeft.bind('sizeChanged', () => {
            this.resize();
        });

        // 侧边栏(右)+[编辑器(上)+状态栏(下)]
        this.dragVRight = new DragV(this.#$dragVRight_[0], {
            min: '100px',
            full: [false, true],
            startSize: '100%',
            startExitFullSize: '85%'
        });

        this.dragVRight.bind('sizeChanged', () => {
            this.resize();
        });*/
    }

    getEditorsManager() {
        return this.#editorsManager_;
    }

    getLeftSideBarsManager() {
        return this.#leftSideBarsManager_;
    }

    getRightSideBarsManager() {
        return this.#rightSideBarsManager_;
    }

    getStatusBarsManager() {
        return this.#statusBarsManager_;
    }

    resize() {
        super.resize();
        this.getEditorsManager().resize();
        this.getLeftSideBarsManager().resize();
        this.getRightSideBarsManager().resize();
        this.getStatusBarsManager().resize();
    }

    dispose() {
        Workspace.remove(this);
        this.getEditorsManager().dispose();
        this.getLeftSideBarsManager().dispose();
        this.getRightSideBarsManager().dispose();
        this.getStatusBarsManager().dispose();
        super.dispose();
    }
}

Mixly.Workspace = Workspace;

});