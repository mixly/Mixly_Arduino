var Infrared_right = function (name) {
    var mod = {
        data: {
            distance_infrared_right : mbData['distance_infrared_right'],
        }
    };
    mod.near = new Sk.builtin.func(function(self) {
        var value = sm.getInputer('Infrared_right', sm.time);
        return new Sk.builtin.int_(value);
    });
    ui.bindInfraredEvent('Infrared_right',mod.data,'distance_infrared_right');
    return mod;
}