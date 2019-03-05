var $builtinmodule = function (name) {
    var mod = {};
    mod.sleep = new Sk.builtin.func(function(delay) {
        return sim.runAsync(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, delay.v*1000);
        });
    });
    mod.sleep_ms = new Sk.builtin.func(function(delay) {
        return sim.runAsync(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, delay.v);
        });
    });
    mod.sleep_us = new Sk.builtin.func(function(delay) {
        return sim.runAsync(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, delay.v/1000);
        });
    });
    return mod;
}