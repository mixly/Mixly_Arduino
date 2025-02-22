goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Config');
goog.require('Mixly.Boards');
goog.require('Mixly.FooterLayer');
goog.require('Mixly.FooterLayerBoardConfig');
goog.require('Mixly.FooterLayerMessage');
goog.require('Mixly.Component');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Electron.FooterLayerExample');
goog.require('Mixly.Web.FooterLayerExample');
goog.provide('Mixly.FooterBar');

const {
    Env,
    XML,
    Msg,
    Config,
    Boards,
    FooterLayer,
    FooterLayerBoardConfig,
    FooterLayerMessage,
    Component,
    HTMLTemplate,
    Electron = {},
    Web = {}
} = Mixly;

const { FooterLayerExample } = goog.isElectron? Electron : Web;

const { BOARD } = Config;


class FooterBar extends Component {
    static {
        HTMLTemplate.add(
            'html/footerbar.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/footerbar.html')))
        );
    }

    #exampleLayer_ = null;
    #messageLayer_ = null;
    #boardConfigLayer_ = null;

    constructor() {
        super();
        let content = $(HTMLTemplate.get('html/footerbar.html').render({
            outputAceName: Msg.Lang['footerbar.output'],
            row: Msg.Lang['footerbar.cursor.row'],
            column: Msg.Lang['footerbar.cursor.column'],
            unknown: Msg.Lang['footerbar.board.unknown'],
            config: Msg.Lang['footerbar.config'],
            selected: Msg.Lang['footerbar.cursor.selected'],
            on: Msg.Lang['footerbar.board.on'],
            message: Msg.Lang['footerbar.message'],
            example: Msg.Lang['footerbar.examples']
        }));
        Boards.init();
        this.setContent(content);
        content.find('.code-lang').html(BOARD.language ?? Msg.Lang['footerbar.language.unknown']);
        this.#exampleLayer_ = new FooterLayerExample(content.find('.example')[0]);
        this.#messageLayer_ = new FooterLayerMessage(content.find('.message')[0]);
        this.#boardConfigLayer_ = new FooterLayerBoardConfig(content.find('.board-config')[0], Boards.dict);
        Boards.addLayer(this.#boardConfigLayer_);
    }

    resize() {
        super.resize();
        this.#exampleLayer_.resize();
        this.#messageLayer_.resize();
        this.#boardConfigLayer_.resize();
    }

    getExampleLayer() {
        return this.#exampleLayer_;
    }

    getMessageLayer() {
        return this.#messageLayer_;
    }

    getBoardConfigLayer() {
        return this.#boardConfigLayer_;
    }
}

Mixly.FooterBar = FooterBar;

});