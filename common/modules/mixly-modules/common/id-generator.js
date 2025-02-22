goog.loadJs('common', () => {

goog.require('shortid');
goog.require('Mixly');
goog.provide('Mixly.IdGenerator');

const { IdGenerator } = Mixly;

IdGenerator.generate = function(input) {
    let output = {};
    if (input instanceof Array) {
        for (let i of input) {
            if (typeof i !== 'string') {
                continue;
            }
            output[i] = shortid.generate();
        }
        return output;
    } else {
        return shortid.generate();
    }
}

});