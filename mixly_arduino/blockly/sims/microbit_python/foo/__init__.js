var $builtinmodule = function (name) {
    // microbit module
    var mod = {
        data: {temperature: 23}
    };

    mod.panic = new Sk.builtin.func(function () {
        console.log('panic' + mod.data.temperature);
        return Sk.builtin.int_(mod.data.temperature);
    });

    return mod;
};
