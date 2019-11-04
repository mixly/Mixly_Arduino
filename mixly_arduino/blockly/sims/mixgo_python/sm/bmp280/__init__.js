var $builtinmodule = function (name) {
	var mod = {};
	
	mod.BMP280 = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.temperature = mbData['temperature'];
        });

        $loc.get_BMP_temperature = new Sk.builtin.func(function(self){
            var temperature = sm.getInputer('temperature', sm.time);
        	return Sk.builtin.int_(temperature);
        });
        $loc.get_BMP_pressure = new Sk.builtin.func(function(self){
            var pressure = sm.getInputer('pressure', sm.time);
        	return Sk.builtin.int_(pressure);
        });
    }, "BMP280", []);

    return mod;
};