goog.loadJs('common', () => {

goog.require('path');
goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Debug');
goog.provide('Mixly.ToolboxSearcher');

const {
    Env,
    XML,
    Msg,
    HTMLTemplate,
    Debug
} = Mixly;

class ToolboxSearcher {
    static {
        this.searchHtmlTemplate = new HTMLTemplate(
            goog.get(path.join(Env.templatePath, 'html/search-div.html'))
        );
    }

    constructor(mainWorkspace) {
        this.mainWorkspace = mainWorkspace;
        this.searchWorkspace = new Blockly.Workspace(new Blockly.Options({
            toolbox: null
        }));
        this.mainToolbox = this.mainWorkspace.getToolbox();
        this.$search = $(ToolboxSearcher.searchHtmlTemplate.render({
            search: Msg.Lang['toolboxSearcher.search']
        }));
        this.$i = this.$search.find('i');
        this.$input = this.$search.find('input');
        this.prevText = '';
        $(this.mainToolbox.HtmlDiv).append(this.$search);
        this.addEventsListener();
    }

    addEventsListener() {
        this.$input.change(() => this.startSearch());
        this.$input.bind('input propertychange', (event) => {
            const searchCategory = this.mainToolbox.getToolboxItemById('catSearch');
            const keyText = event.target.value;
            if (!keyText.replaceAll(' ', '')) {
                searchCategory.hide();
                this.$i.addClass('disabled');
                return;
            } else {
                searchCategory.show();
            }
            this.scrollTop();
            if (keyText === this.prevText) {
                this.$i.addClass('disabled');
            } else {
                this.$i.removeClass('disabled');
            }
        });
    }

    scrollTop() {
        const { HtmlDiv } = this.mainToolbox;
        $(HtmlDiv).scrollTop(HtmlDiv.scrollHeight);
    }

    checkBlock(blockxml, keys) {
        this.searchWorkspace.clear();
        try {
            Blockly.Xml.domToBlock(blockxml, this.searchWorkspace);
        } catch (error) {
            Debug.error(error);
            return false;
        }
        const blocks = this.searchWorkspace.getAllBlocks(true);
        let select = false;
        for (let block of blocks) {
            const { inputList } = block;
            for (let input of inputList) {
                const { fieldRow } = input;
                for (let field of fieldRow) {
                    const fieldText = field.getText().toLowerCase();
                    let times = 0;
                    for (let key = 0; key < keys.length; key++) {
                        if (fieldText.indexOf(keys[key]) === -1) {
                            continue;
                        }
                        times++;
                    }
                    if (keys.length === times) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    searchBlocks(keys) {
        return new Promise((resolve, reject) => {
            const searchCategory = this.mainToolbox.getToolboxItemById('catSearch');
            let outputXML = [];
            let selectedBlocksLen = 0;
            const categories = this.mainToolbox.getToolboxItems();
            for (let j = 0; categories[j]; j++) {
                const category = categories[j];
                if (category.id_ === 'catSearch') continue;
                if (typeof category.getContents !== 'function') continue;
                const blocksList = category.getContents();
                let addLabel = true;
                for (let blockDef of blocksList) {
                    const { type, kind, blockxml } = blockDef;
                    if (kind !== 'BLOCK') {
                        continue;
                    }
                    if (!this.checkBlock(blockxml, keys)) {
                        continue;
                    }
                    if (addLabel) {
                        const categoryPath = this.getCategoryPath(category);
                        outputXML.push({
                            kind: 'LABEL',
                            text: categoryPath
                        });
                        addLabel = false;
                    }
                    outputXML.push(blockDef);
                    selectedBlocksLen++;
                    if (selectedBlocksLen > 30) {
                        break;
                    }
                }
                if (selectedBlocksLen > 30) {
                    outputXML.unshift({
                        kind: 'LABEL',
                        text: Msg.Lang['toolboxSearcher.tooManyResultsInfo']
                    });
                    break;
                }
            }
            this.searchWorkspace.clear();
            searchCategory.updateFlyoutContents(
                outputXML.length ? 
                outputXML : [{
                    kind: 'LABEL',
                    text: Msg.Lang['toolboxSearcher.empty']
                }]
            );
            this.mainToolbox.refreshSelection();
            this.mainToolbox.setSelectedItem(searchCategory);
            const { selectedItem_ } = this.mainToolbox;
            if (selectedItem_ && selectedItem_.isCollapsible()) {
                selectedItem_.setExpanded(true);
            }
            this.scrollTop();
            resolve();
        });
    }

    getCategoryPath(category) {
        let categoryPath = '';
        for (; category; category = category.getParent()) {
            categoryPath = category.toolboxItemDef_.name + (categoryPath && (' > ' + categoryPath));
        }
        return categoryPath;
    }

    startSearch() {
        if (this.$i.hasClass('disabled')) {
            return
        };
        let text = this.$input.val();
        this.prevText = text;
        try {
            if (!text.replaceAll(' ', '')) {
                return;
            }
        } catch(error) {
            Debug.error(error);
        }
        this.$input.attr('disabled', true);
        this.$i.removeClass('codicon-search-fuzzy');
        this.$i.addClass('codicon-loading layui-anim-rotate layui-anim-loop');
        setTimeout(() => {
            let keys = text.toLowerCase().split(' ');
            this.searchBlocks(keys)
            .catch(Debug.error)
            .finally(() => {
                this.$i.removeClass('codicon-loading layui-anim-rotate layui-anim-loop');
                this.$i.addClass('codicon-search-fuzzy disabled');
                this.$input.removeAttr('disabled');
            });
        }, 100);
    }

    restart() {
        this.prevText = '';
        const searchCategory = this.mainToolbox.getToolboxItemById('catSearch');
        this.$input.val('');
        searchCategory.hide();
    }
}

Mixly.ToolboxSearcher = ToolboxSearcher;

});