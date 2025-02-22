goog.loadJs('common', () => {

goog.require('path');
goog.require('Blockly');
goog.require('layui');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.FooterLayer');
goog.provide('Mixly.FooterLayerBoardConfig');

const {
    FooterLayer,
    Env,
    XML,
    Msg,
    HTMLTemplate
} = Mixly;

const { dropdown } = layui;

class FooterLayerBoardConfig extends FooterLayer {
    static {
        // 弹层模板
        this.menuHTMLTemplate = new HTMLTemplate(
            goog.get(path.join(Env.templatePath, 'html/footerlayer/footerlayer-board-config.html'))
        );
    }

    /**
     * @param domId { string } 绑定dom的id
     * @param boardsInfo { obj } 板卡配置信息
        {
            "xxx板卡": BoardConfigItem,
            ...
        }
     * @return { FooterLayerBoardConfig obj }
     **/
    #canvas_ = null;
    constructor(element, boardsInfo) {
        super(element, {
            onHidden: (instance) => {
                this.boardsInfo[this.boardName].writeSelectedOptions();
            },
            onMount: (instance) => {
                if (this.renderBoardName === this.boardName) {
                    return;
                }
                this.renderMenu();
            },
            btns: [
                {
                    class: 'reset',
                    title: Msg.Lang['footerbar.config.default'],
                    icon: 'layui-icon-refresh-1',
                    onclick: () => {
                        const selectedBoardName = this.boardName;
                        let { defaultOptions } = this.boardsInfo[selectedBoardName];
                        this.setSelectedOptions(defaultOptions);
                    }
                }
            ]
        });
        this.$content.addClass('footer-layer-board-config');
        this.$footerContainer = $(element);
        this.boardsInfo = boardsInfo;
        // 当前用户所选择的板卡
        this.boardName = null;
        // 当前渲染的板卡配置所对应的板卡名
        this.renderBoardName = null;
        this.dropdownItems = {};
    }

    getSelectedParams() {
        let paramList = [];
        let { ignore, selectedOptions } = this.boardsInfo[this.boardName];
        for (let i in selectedOptions) {
            if (ignore.includes(i)) {
                continue;
            }
            paramList.push(i + '=' + selectedOptions[i].key);
        }
        let { boardKey } = this;
        const index = boardKey.indexOf('@');
        if (index !== -1) {
            boardKey = boardKey.substring(0, index);
        }
        return paramList.length ? (boardKey + ':' + paramList.join(',')) : boardKey;
    }

    getSelectedParamByName(name) {
        let { selectedOptions } = this.boardsInfo[this.boardName];
        for (let i in selectedOptions) {
            if (i === name) {
                return selectedOptions[i].key;
            }
        }
        return '';
    }

    renderMenu() {
        let { options, selectedOptions } = this.boardsInfo[this.boardName];
        this.renderTemplate(options);
        this.renderOptions(options);
        this.setSelectedOptions(selectedOptions);
        this.renderBoardName = this.boardName
    }

    setSelectedOptions(selectedOptions) {
        // 每次打开板卡设置窗口时设置其默认选中项
        const boardsInfo = this.boardsInfo[this.boardName];
        let optionsType = Object.keys(boardsInfo.defaultOptions);
        for (let i in selectedOptions) {
            if (!boardsInfo.defaultOptions[i]) {
                continue;
            }
            let id = boardsInfo.defaultOptions[i].key;
            if (boardsInfo.optionIsLegal(i, selectedOptions[i])) {
                id = selectedOptions[i].key;
            }
            this.$body.find(`[mid=${i}]`).val(id).trigger('change');
            boardsInfo.setSelectedOption(i, selectedOptions[i]);
        }
        // 重新计算窗口的位置
        this.setProps({});
    }

    renderOptions(options) {
        const _this = this;
        for (let item of options) {
            this.createDropdownMenu(item.key, item.options);
            this.createMessageLayer(item.key, item.messageId);
        }
    }

    createMessageLayer(mId, messageId) {
        if (!messageId) {
            return;
        }
        if (!Blockly.Msg[messageId]) {
            return;
        }
        let $container = this.$body.find(`[mid="${mId}-label"]`);
        tippy($container[0], {
            content: Blockly.Msg[messageId],
            allowHTML: true,
            interactive: true,
            placement: 'left',
            offset: [ 0, 16 ]
        });
    }

    createDropdownMenu(mId, options) {
        let $container = this.$body.find(`[mid="${mId}"]`);
        if (!$container.length) {
            return;
        }
        let menu = [];
        let maxLength = 0;
        for (let item of options) {
            menu.push({
                id: item.id,
                text: item.title
            });
            let nowLength = this.getStrWidth(item.title);
            if (maxLength < nowLength) {
                maxLength = nowLength;
            }
        }
        $container.select2({
            data: menu,
            minimumResultsForSearch: 50,
            width: 'auto',
            dropdownCssClass: 'mixly-scrollbar select2-board-config'
        });
        $container.next().css('min-width', (maxLength + 30) + 'px');
        $container.on('select2:select', (e) => {
            const boardName = this.boardName;
            const data = e.params.data;
            this.boardsInfo[boardName].setSelectedOption(mId, {
                key: data.id,
                label: data.text
            });
            this.setProps({});
        });
    }

    renderTemplate(options) {
        this.$body.find('select').select2('destroy');
        const xmlStr = FooterLayerBoardConfig.menuHTMLTemplate.render({ options });
        this.updateContent(xmlStr);
    }

    changeTo(boardName) {
        if (this.boardsInfo[boardName]?.options.length) {
            this.$footerContainer.css('display', 'inline-flex');
        } else {
            this.$footerContainer.css('display', 'none');
            this.hide();
        }
        this.boardName = boardName;
        this.boardKey = this.boardsInfo[boardName].key;
        this.renderMenu(this.layer);
    }

    getStrWidth(str, font = '14px Arial') {
        try {
            this.#canvas_ = this.#canvas_ || document.createElement('canvas').getContext('2d');
            this.#canvas_.font = font;
            return this.#canvas_.measureText(str).width;
        } catch (e) {
            return 0;
        }
    }

    resize() {
        this.$body.find('select').select2('close');
    }
}

Mixly.FooterLayerBoardConfig = FooterLayerBoardConfig;

});