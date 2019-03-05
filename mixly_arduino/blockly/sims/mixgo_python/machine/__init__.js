var $builtinmodule = function (name) {
	var mod = {};
	var BMP280 = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.temperature = mbData['temperature'];
        });

        $loc.get_BMP_temperature = new Sk.builtin.func(function(self){
            self.temperature = mbData['temperature'];
        	return Sk.builtin.int_(self.temperature);
        });
    }, "BMP280", []);
	mod.bmp = Sk.misceval.callsim(BMP280);
	return mod;
}