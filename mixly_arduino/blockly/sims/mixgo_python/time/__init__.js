var $builtinmodule = function (name) {
    var mod = {
        data: {
            startTime : new Date(),
        }
    };
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
    mod.ticks_ms = new Sk.builtin.func(function() {
        var now = new Date();
        return (now.getTime() - mod.data.startTime.getTime());
    });
    return mod;
}