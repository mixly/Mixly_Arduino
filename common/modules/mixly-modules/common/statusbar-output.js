goog.loadJs('common', () => {

goog.require('Mixly.StatusBar');
goog.provide('Mixly.StatusBarOutput');

const { StatusBar } = Mixly;

class StatusBarOutput extends StatusBar {
    constructor() {
        super();
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }
}

Mixly.StatusBarOutput = StatusBarOutput;

});