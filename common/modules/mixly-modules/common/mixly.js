goog.loadJs('common', () => {

goog.provide('Mixly');

Mixly.require = function(moduleName) {
    if (!goog.isElectron) {
        return;
    }
    return require(moduleName);
}

});
