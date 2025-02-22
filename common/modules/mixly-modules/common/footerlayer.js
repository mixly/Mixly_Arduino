goog.loadJs('common', () => {

goog.require('tippy');
goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.provide('Mixly.FooterLayer');

const { Env, XML, Msg } = Mixly;

class FooterLayer {
    static {
        // 弹层模板和一些默认配置项
        this.TEMPLATE = goog.get(path.join(Env.templatePath, 'html/footerlayer/footerlayer.html'));
        this.DEFAULT_CONFIG_TIPPY = {
            allowHTML: true,
            trigger: 'manual',
            interactive: true,
            hideOnClick: false,
            maxWidth: 'none',
            offset: [ 0, 6 ],
            delay: 0,
            duration: [ 0, 0 ]
        };
    }

    /**
     * @param domId 被绑定元素的ID
     * @param config 配置项
        {
            ...DEFAULT_CONFIG_TIPPY
        }
     **/
    constructor(element, config) {
        this.config = {
            ...FooterLayer.DEFAULT_CONFIG_TIPPY,
            ...(config ?? {})
        };
        this.btns = config.btns ?? [];
        this.btnsClickEvent = {};
        this.element = element;
        this.layer = null;
        this.#create_();
        this.#addSharedMethod_();
        this.setContent(XML.render(FooterLayer.TEMPLATE, {
            content: '',
            btns: this.btns,
            close: Msg.Lang['footerlayer.close']
        }));
        this.$content = $(this.layer.popper).find('.tippy-content');
        this.$body = this.$content.find('.footer-layer-body');
        this.#addContainerClickEvent_();
        this.#addBtnsClickEvent_();
    }

    #create_() {
        this.layer = tippy(this.element, this.config);
    }

    updateContent(content) {
        if (this.$body.length) {
            this.$body.html(content);
        } else {
            this.setContent(content);
        }
    }

    #addBtnsClickEvent_() {
        for (let i of this.btns) {
            if (!(i instanceof Object)) {
                continue;
            }
            if (typeof i.onclick !== 'function' || !(i.class)) {
                continue;
            }
            this.btnsClickEvent[i.class] = i.onclick;
            delete i.onclick;
        }
        this.btnsClickEvent['close'] = this.hide;
        for (let key in this.btnsClickEvent) {
            $(this.layer.popper).find('.layui-layer-title').children(`.${key}`)
            .off().click(() => {
                this.btnsClickEvent[key]();
            });
        }
    }

    #addSharedMethod_() {
        let sharedMethod = ['hide', 'show', 'destroy', 'setProps', 'setContent'];
        for (let type of sharedMethod) {
            this[type] = this.layer[type];
        }
    }

    /**
     * @method 为绑定的元素添加鼠标单击事件
     * @return {void}
     **/
    #addContainerClickEvent_() {
        $(this.element).off().click(() => {
            if (this.layer.state.isShown) {
                this.hide();
            } else {
                this.show();
            }
        });
    }

    resize() {}
}

Mixly.FooterLayer = FooterLayer;

});