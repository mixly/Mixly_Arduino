var Infrared_left = function (name) {
    var mod = {
        data: {
            distance_infrared_left : mbData['distance_infrared_left'],
        }
    };
    mod.near = new Sk.builtin.func(function(self) {
        return new Sk.builtin.int_(mod.data.distance_infrared_left);
    });
    ui.bindInfraredEvent('Infrared_left',mod.data,'distance_infrared_left');
    return mod;
}