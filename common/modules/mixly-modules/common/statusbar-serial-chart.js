goog.loadJs('common', () => {

goog.require('path');
goog.require('$.ui');
goog.require('$.flot');
goog.require('$.select2');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.PageBase');
goog.require('Mixly.Regression');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Config');
goog.provide('Mixly.StatusBarSerialChart');

const {
    Env,
    Msg,
    PageBase,
    Regression,
    HTMLTemplate,
    Config
} = Mixly;

const { USER, SELECTED_BOARD } = Config;


class StatusBarSerialChart extends PageBase {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-serial-chart.html',
            new HTMLTemplate(goog.get(path.join(Env.templatePath, 'html/statusbar/statusbar-serial-chart.html')))
        );
    }

    #data_ = [];
    #totalPoints_ = SELECTED_BOARD?.serial?.pointNum ?? 100;
    #yMax_ = SELECTED_BOARD?.serial?.yMax ?? 100;
    #yMin_ = SELECTED_BOARD?.serial?.yMin ?? 0;
    #needUpdate_ = false;
    #regression_ = new Regression();
    #plot_ = null;
    #opened_ = false;
    #started_ = false;
    #$pointNum_ = null;
    #$yMax_ = null;
    #$yMin_ = null;
    #isOpened_ = false;

    constructor() {
        super();
        const template = HTMLTemplate.get('html/statusbar/statusbar-serial-chart.html');
        const $template = $(template.render({
            pointsNum: Msg.Lang['statusbar.serial.chart.pointsNum'],
            yMin: Msg.Lang['statusbar.serial.chart.yMin'],
            yMax: Msg.Lang['statusbar.serial.chart.yMax']
        }));
        this.setContent($template);
        this.#$pointNum_ = $template.find('select');
        this.#$pointNum_.select2({
            width: '100%',
            minimumResultsForSearch: 50,
            dropdownCssClass: 'mixly-scrollbar'
        });
        this.#$pointNum_.val(this.#totalPoints_).trigger('change');
        this.#$yMax_ = $template.find('.y-max');
        this.#$yMax_.val(this.#yMax_);
        this.#$yMin_ = $template.find('.y-min');
        this.#$yMin_.val(this.#yMin_);
        const axisFontColor = USER.theme === 'light' ? '#000' : '#c2c3c2';
        this.#plot_ = $.plot($template.find('.figure'), this.getValue(), {
            series: {
                shadowSize: 1
            },
            colors: ['#777'],
            yaxis: {
                min: this.#yMin_,
                max: this.#yMax_,
                show: true,
                font: {
                    fill: axisFontColor
                }
            },
            xaxis: {
                show: true,
                font: {
                    fill: axisFontColor
                },
                mode: 'time',
                timezone: 'browser',
                twelveHourClock: true,
                timeBase: 'milliseconds',
                minTickSize: [1, 'second'],
                min: Date.now(),
                max: Date.now() + 1000 * 10,
            }
        });

        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.#$pointNum_.on('select2:select', (event) => {
            const { data } = event.params;
            this.#totalPoints_ = data.id;
            this.setValue([]);
        });

        this.#$yMax_.change(() => {
            const yMax = parseInt(this.#$yMax_.val());
            if (isNaN(yMax) || yMax <= this.#yMin_) {
                this.#$yMax_.val(this.#yMax_);
            } else {
                this.#yMax_ = yMax;
                let { yaxis } = this.#plot_.getAxes();
                yaxis.options.max = yMax;
            }
        });

        this.#$yMin_.change(() => {
            const yMin = parseInt(this.#$yMin_.val());
            if (isNaN(yMin) || yMin >= this.#yMax_) {
                this.#$yMin_.val(this.#yMin_);
            } else {
                this.#yMin_ = yMin;
                let { yaxis } = this.#plot_.getAxes();
                yaxis.options.min = yMin;
            }
        });
    }

    init() {
        super.init();
        this.hideCloseBtn();
        this.resize();
    }

    resize() {
        this.#plot_.getSurface().clearCache();
        super.resize();
        this.#plot_.resize();
        this.#plot_.setupGrid(false);
        this.#plot_.draw();
    }

    stop() {
        this.setValue([]);
        this.#opened_ = false;
        this.#started_ = false;
    }

    start() {
        this.#opened_ = true;
        if (this.#started_) {
            return;
        }
        this.#started_ = true;
        this.update();
    }

    update() {
        if (!this.#started_) {
            return;
        }
        if (!this.isActive()) {
            this.#started_ = false;
            return;
        }
        if (!this.#needUpdate_) {
            setTimeout(() => this.update(), 50);
            return;
        }
        this.#plot_.setData(this.getValue());
        this.#plot_.getSurface().clearCache();
        this.#plot_.setupGrid(false);
        this.#plot_.draw();
        this.setRange(this.#plot_);
        this.#needUpdate_ = false;
        window.requestAnimationFrame(() => this.update());
    }

    getValue() {
        return [{
            data: this.#data_,
            lines: {
                show: true,
                fill: false,
                fillColor: '#007acc'
            }
        }];
    }

    addValue(data) {
        if (!this.#started_) {
            return;
        }
        if (this.#data_.length
            && data[0] === this.#data_[this.#data_.length - 1][0]) {
            return;
        }
        while (this.#data_.length > this.#totalPoints_) {
            this.#data_.shift();
        }
        this.#data_.push([Date.now(), data]);
        this.#needUpdate_ = true;
    }

    setValue(data) {
        if (!this.#started_) {
            return;
        }
        this.#data_ = data;
        this.#needUpdate_ = true;
    }

    setRange() {
        let { xaxis } = this.#plot_.getAxes();
        let { data = [] } = this.#plot_.getData()[0] ?? {};
        if (!data.length) {
            return;
        }
        if (data.length >= this.#totalPoints_) {
            xaxis.options.min = data[0][0];
            xaxis.options.max = data[this.#totalPoints_ - 1][0];
            return;
        }
        let x = [], y = [];
        for (let i in data) {
            x.push((i - 0) + 1);
            y.push(data[i][0] - data[0][0]);
        }
        this.#regression_.fit(x, y);
        let xMax = this.#regression_.predict([this.#totalPoints_])[0] + data[0][0];
        let xMin = data[0][0];
        xaxis.options.min = xMin;
        xaxis.options.max = xMax;
    }

    setStatus(isOpened) {
        this.#isOpened_ = isOpened;
    }

    isOpened() {
        return this.#isOpened_;
    }

    onMounted() {
        super.onMounted();
        if (this.#opened_) {
            this.start();
        }
    }

    onUnmounted() {
        this.setValue([]);
        super.onUnmounted();
    }

    dispose() {
        this.#plot_.shutdown();
        this.#$pointNum_.select2('destroy');
        super.dispose();
    }
}

Mixly.StatusBarSerialChart = StatusBarSerialChart;

});