goog.loadJs('common', () => {

goog.require('layui');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Command');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Component');
goog.provide('Mixly.Nav');

const {
    Env,
    Config,
    Command,
    XML,
    Msg,
    HTMLTemplate,
    Component
} = Mixly;

const { BOARD, USER } = Config;

const { element, form } = layui;


class Nav extends Component {
    static {
        /**
          * nav容器html片段
          * @type {String}
          */
        HTMLTemplate.add(
            'html/nav/nav.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/nav/nav.html')))
        );

        /**
          * nav按钮html片段
          * @type {String}
          */
        HTMLTemplate.add(
            'html/nav/nav-btn.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/nav/nav-btn.html')))
        );

        /**
          * nav子元素容器html片段
          * @type {String}
          */
        HTMLTemplate.add(
            'html/nav/nav-item-container.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/nav/nav-item-container.html')))
        );

        /**
          * nav子元素html片段
          * @type {String}
          */
        HTMLTemplate.add(
            'html/nav/nav-item.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/nav/nav-item.html')))
        );

        /**
          * 板卡选择器html片段
          * @type {String}
          */
        HTMLTemplate.add(
            'html/nav/board-selector-div.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/nav/board-selector-div.html')))
        );

        /**
          * 端口选择器html片段
          * @type {String}
          */
        HTMLTemplate.add(
            'html/nav/port-selector-div.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/nav/port-selector-div.html')))
        );

        Nav.Scope = {
            'LEFT': -1,
            'CENTER': 0,
            'RIGHT': 1,
            '-1': 'LEFT',
            '0': 'CENTER',
            '1': 'RIGHT'
        };

        this.navs = [];

        this.getAll = () => {
            return this.navs;
        }

        this.add = (nav) => {
            this.remove(nav);
            this.navs.push(nav);
        }

        this.remove = (nav) => {
            for (let i in this.workspaces) {
                if (this.navs[i].id !== nav.id) {
                    continue;
                }
                this.navs.slice(i, 1);
            }
        }

        this.getMain = () => {
            if (this.navs.length) {
                return this.navs[0];
            }
            return null;
        }
    }

    #$container_ = null;
    #$leftBtnContainer_ = null;
    #$leftBtnExtContainer_ = null;
    #$rightBtnContainer_ = null;
    #$dropdownContainer_ = null;
    #$rightMenuContainer_ = null;
    #$rightArea_ = null;
    #$editorBtnsContainer_ = null;
    #$boardSelect_ = null;
    #$portSelect_ = null;
    #$shadow_ = $('<div style="position:absolute;z-index:1000;width:100%;background:transparent;bottom:0px;top:var(--nav-height);"></div>');
    #btns_ = [];

    constructor() {
        super();
        const navTemplate = HTMLTemplate.get('html/nav/nav.html');
        this.setId(navTemplate.getId());
        this.#$container_ = $(navTemplate.render({
            more: Msg.Lang['nav.more']
        }));
        this.setContent(this.#$container_);
        this.#$leftBtnContainer_ = this.#$container_.find('.left-btn-container');
        this.#$leftBtnExtContainer_ = this.#$container_.find('.left-btn-ext-container');
        this.#$rightBtnContainer_ = this.#$container_.find('.right-btn-container');
        this.#$dropdownContainer_ = this.#$container_.find('.dropdown-container');
        this.#$rightMenuContainer_ = this.#$container_.find('.right-menu-container');
        this.#$rightArea_ = this.#$container_.find('.right-area');
        this.#$editorBtnsContainer_ = this.#$container_.find('.editor-btn-container');
        const boardSelectTemplate = HTMLTemplate.get('html/nav/board-selector-div.html');
        this.#$boardSelect_ = $(boardSelectTemplate.render());
        this.#$dropdownContainer_.append(this.#$boardSelect_);
        this.#$boardSelect_.select2({
            width: '150px',
            minimumResultsForSearch: 10,
            dropdownCssClass: `mixly-scrollbar mixly-${boardSelectTemplate.getId()}`,
            dropdownAutoWidth: true,
            placeholder: Msg.Lang['nav.selectBoard']
        });
        const portSelectTemplate = HTMLTemplate.get('html/nav/port-selector-div.html');
        this.#$portSelect_ = $(portSelectTemplate.render());
        this.#$dropdownContainer_.append(this.#$portSelect_);
        this.#$portSelect_.select2({
            width: '100px',
            minimumResultsForSearch: Infinity,
            dropdownCssClass: `mixly-scrollbar mixly-${portSelectTemplate.getId()}`,
            dropdownAutoWidth: true,
            placeholder: Msg.Lang['nav.selectPort']
        });
        const $merge = this.#$boardSelect_.add(this.#$portSelect_);
        let count = 0;
        $merge.on('select2:opening', (event) => {
            count += 1;
            $(document.body).append(this.#$shadow_);
        });
        $merge.on('select2:closing', () => {
            count -= 1;
            !count && this.#$shadow_.detach();
        });
        this.#$shadow_.click(() => $merge.select2('close'));
        this.addEventsType(['changeBoard', 'changePort']);
        this.#addEventsListener_();
        Nav.add(this);
    }

    onMounted() {
        super.onMounted();
        element.render('nav', 'nav-filter');
    }

    getEditorBtnsContainer() {
        return this.#$editorBtnsContainer_;
    }

    getBoardSelector() {
        return this.#$boardSelect_;
    }

    getPortSelector() {
        return this.#$portSelect_;
    }

    /**
     * @function 注册函数
     * @param config 选项
     *  {
     *      icon: String,
     *      title: String,
     *      id: String | Array,
     *      displayText: String,
     *      preconditionFn: Function,
     *      callback: Function,
     *      scopeType: Nav.SCOPE_TYPE,
     *      weight: Number
     *  }
     * @return {void}
     **/
    register(config) {
        const { scopeType = Nav.ScopeType.LEFT } = config;
        config = {
            preconditionFn: () => true,
            ...config
        };
        const {
            id = '',
            title = '',
            icon = '',
            displayText = ''
        } = config;
        switch (scopeType) {
        case Nav.Scope.LEFT:
            config.$moreBtn = $(HTMLTemplate.get('html/nav/nav-item.html').render({
                mId: id,
                icon,
                text: displayText
            }));
        case Nav.Scope.CENTER:
            config.$btn = $(HTMLTemplate.get('html/nav/nav-btn.html').render({
                title,
                mId: id,
                icon,
                text: displayText
            }));
            break;
        case Nav.Scope.RIGHT:
            if (typeof id === 'string') {
                config.$btn = $(HTMLTemplate.get('html/nav/nav-item-container.html').render({
                    mId: id,
                    text: displayText
                }));
            } else {
                if (displayText) {
                    config.$btn = $(HTMLTemplate.get('html/nav/nav-item.html').render({
                        mId: id.join('-'),
                        icon,
                        text: displayText
                    }));
                } else {
                    config.$btn = $('<hr>');
                }
            }
            break;
        }
        this.#add_(config);
        return config;
    }

    #add_(config) {
        const {
            scopeType = Nav.ScopeType.LEFT,
            id = ''
        } = config;
        switch (scopeType) {
        case Nav.Scope.LEFT:
            if (id === 'home-btn') {
                this.#btns_[config.id] = config;
            } else {
                this.#addLeftBtn_(config);
            }
            break;
        case Nav.Scope.CENTER:
            this.#addCenterBtn_(config);
            break;
        case Nav.Scope.RIGHT:
            if (typeof id === 'string') {
                this.#addRightMenu_(config);
            } else {
                this.#addRightMenuItem_(config);
            }
            break;
        }
        element.render('nav', 'nav-filter');
    }

    /**
     * @function 取消注册函数
     * @param config 选项
     *  {
     *      id: String | Array,
     *      scopeType: Nav.SCOPE_TYPE
     *  }
     * @return {void}
     **/
    unregister(config) {

    }

    #getElemWidth_(elem) {
        const display = elem.css('display');
        if (display !== 'none') {
            return elem.outerWidth(true);
        }
        const visibility = elem.css('visibility');
        const position = elem.css('position');
        elem.css({
            display: 'block',
            visibility: 'hidden',
            position: 'absolute'
        });
        const width = elem.outerWidth(true);
        elem.css({ display, visibility, position });
        return width;
    }

    #addEventsListener_() {
        $(document).off('click', '.mixly-nav')
        .on('click', '.mixly-nav', (event) => {
            const mId = $(event.currentTarget).attr('m-id');
            if (this.#btns_[mId]
                && typeof this.#btns_[mId].callback === 'function') {
                this.#btns_[mId].callback(this);
            }
        });

        this.#$boardSelect_.on('select2:select', (event) => {
            const { data } = event.params;
            this.runEvent('changeBoard', data);
        });

        this.#$portSelect_.on('select2:select', (event) => {
            const { data } = event.params;
            this.runEvent('changePort', data);
            $('#mixly-footer-port-div').css('display', 'inline-flex');
            $('#mixly-footer-port').html(data.id);
        });
    }

    #addLeftBtn_(config) {
        const { id = '', weight = 0 } = config;
        if (Object.keys(this.#btns_).includes(id)) {
            this.#btns_[id].$btn.remove();
            this.#btns_[id].$moreBtn.remove();
            delete this.#btns_[id];
        }
        let $btn = null;
        let $moreBtn = null;
        const $btns = this.#$leftBtnContainer_.children('button');
        for (let i = 0; $btns[i]; i++) {
            const mId = $($btns[i]).attr('m-id');
            if (!this.#btns_[mId]) {
                continue;
            }
            if (weight < this.#btns_[mId].weight) {
                $btn = this.#btns_[mId].$btn;
                $moreBtn = this.#btns_[mId].$moreBtn;
                break;
            }
        }
        if ($btn) {
            $btn.before(config.$btn);
            $moreBtn.before(config.$moreBtn);
        } else {
            this.#$leftBtnContainer_.append(config.$btn);
            this.#$leftBtnExtContainer_.append(config.$moreBtn);
        }
        config.width = this.#getElemWidth_(config.$btn);
        this.#btns_[id] = config;
        this.resize();
    }

    #removeLeftBtn_(config) {

    }

    #addCenterBtn_(config) {
        const { id = '', weight = 0 } = config;
        let $btn = null;
        const $btns = this.#$rightBtnContainer_.children('button');
        for (let i = 0; $btns[i]; i++) {
            const mId = $($btns[i]).attr('m-id');
            if (!this.#btns_[mId]) {
                continue;
            }
            if (weight < this.#btns_[mId].weight) {
                $btn = this.#btns_[mId].$btn;
                break;
            }
        }
        if ($btn) {
            $btn.before(config.$btn);
        } else {
            this.#$rightBtnContainer_.append(config.$btn);
        }
        config.width = this.#getElemWidth_(config.$btn);
        this.#btns_[id] = config;
        this.resize();
    }

    #removeCenterBtn_(config) {

    }

    #addRightMenu_(config) {
        const { id = '', weight = 0, preconditionFn } = config;
        if (!preconditionFn()) {
            return;
        }
        const $btns = this.#$rightMenuContainer_.children('li');
        let $btn = null;
        for (let i = 0; $btns[i]; i++) {
            const mId = $($btns[i]).attr('m-id');
            if (!this.#btns_[mId]) {
                continue;
            }
            if (weight < this.#btns_[mId].weight) {
                $btn = this.#btns_[mId].$btn;
                break;
            }
        }
        if ($btn) {
            $btn.before(config.$btn);
        } else {
            this.#$rightMenuContainer_.append(config.$btn);
        }
        config.width = this.#getElemWidth_(config.$btn);
        this.#btns_[id] = config;
        this.resize();
    }

    #removeRightMenu_(config) {

    }

    #addRightMenuItem_(config) {
        const { id = [], weight = 0, preconditionFn } = config;
        if (!preconditionFn()) {
            return;
        }
        const $li = this.#$rightMenuContainer_.children(`[m-id="${id[0]}"]`);
        let $btn = null;
        if (!$li.length) {
            return;
        }
        const $container_ = $li.find('.layui-nav-child');
        const $btns = $container_.find('dd');
        for (let i = 0; $btns[i]; i++) {
            const mId = $($btns[i]).attr('m-id');
            if (!this.#btns_[mId]) {
                continue;
            }
            if (weight < this.#btns_[mId].weight) {
                $btn = this.#btns_[mId].$btn;
                break;
            }
        }
        if ($btn) {
            $btn.before(config.$btn);
        } else {
            $container_.append(config.$btn);
        }
        config.width = this.#getElemWidth_(config.$btn);
        this.#btns_[id.join('-')] = config;
    }

    #removeRightMenuItem_(config) {

    }

    resize() {
        super.resize();
        this.#$boardSelect_.select2('close');
        this.#$portSelect_.select2('close');
        const navRightWidth = this.#getElemWidth_(this.#$rightArea_);
        const navWidth = this.#getElemWidth_(this.#$container_);
        const $btns = this.#$leftBtnContainer_.children('button');
        let nowWidth = navRightWidth;
        let showMoreBtnContainer = false;
        for (let i = 0; $btns[i]; i++) {
            const mId = $($btns[i]).attr('m-id');
            if (mId === 'home-btn') {
                continue;
            }
            const config = this.#btns_[mId];
            let newWidth = nowWidth;
            if (config) {
                const { preconditionFn } = config;
                if (!preconditionFn()) {
                    config.$btn.css('display', 'none');
                    config.$moreBtn.css('display', 'none');
                    continue;
                }
                newWidth += config.width;
            } else {
                newWidth += this.#getElemWidth_($($btns[i]));
                continue;
            }
            if (navWidth < newWidth + this.#$editorBtnsContainer_.outerWidth(true) + 130) {
                config.$btn.css('display', 'none');
                config.$moreBtn.css('display', 'block');
                showMoreBtnContainer = true;
            } else {
                config.$btn.css('display', 'block');
                config.$moreBtn.css('display', 'none');
                nowWidth = newWidth;
            }
        }
        if (navWidth < nowWidth + this.#$editorBtnsContainer_.outerWidth(true) + 130) {
            showMoreBtnContainer = false;
        }
        const parent = this.#$leftBtnExtContainer_.parent();
        parent.css('display', showMoreBtnContainer? 'block' : 'none');
    }
}

Mixly.Nav = Nav;

});