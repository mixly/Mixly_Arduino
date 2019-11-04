var Infrared_left = function (name) {
    var mod = {
        data: {
            distance_infrared_left : mbData['distance_infrared_left'],
        }
    };
    mod.near = new Sk.builtin.func(function(self) {
        var value = sm.getInputer('Infrared_left', sm.time);
        return new Sk.builtin.int_(value);
    });
    ui.bindInfraredEvent('Infrared_left',mod.data,'distance_infrared_left');
    return mod;
}