goog.loadJs('common', () => {

goog.require('Mixly.Registry');
goog.provide('Mixly.Layer');

const { Registry } = Mixly;

class Layer {
    static {
        this.templates = new Registry();

        this.register = function (key, value) {

        }
    }

    constructor() {

    }
}

});