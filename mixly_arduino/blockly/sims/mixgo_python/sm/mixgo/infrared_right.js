var Infrared_right = function (name) {
    var mod = {
        data: {
            distance_infrared_right : mbData['distance_infrared_right'],
        }
    };
    mod.near = new Sk.builtin.func(function(self) {
        return new Sk.builtin.int_(mod.data.distance_infrared_right);
    });
    ui.bindInfraredEvent('Infrared_right',mod.data,'distance_infrared_right');
    return mod;
}