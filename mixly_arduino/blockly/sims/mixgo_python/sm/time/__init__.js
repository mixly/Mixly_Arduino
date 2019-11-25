var $builtinmodule = function (name) {
    var mod = {
        data: {
            startTime : new Date(),
        }
    };
    mod.sleep = new Sk.builtin.func(function(delay) {
        sm.updateTime(delay.v * 1000);
    });
    mod.sleep_ms = new Sk.builtin.func(function(delay) {
        sm.updateTime(delay.v);
    });
    mod.sleep_us = new Sk.builtin.func(function(delay) {
        sm.updateTime(delay.v / 1000);
    });
    mod.ticks_ms = new Sk.builtin.func(function() {
        return sm.time;
    });
    return mod;
}