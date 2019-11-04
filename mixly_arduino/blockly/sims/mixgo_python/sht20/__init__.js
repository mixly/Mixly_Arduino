var $builtinmodule = function (name) {
	var mod = {};
	
	mod.sht = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.temperature = mbData['temperature'];
            self.pressure = mbData['pressure'];
        });

        $loc.get_SHT_temperature = new Sk.builtin.func(function(self){
            self.temperature = mbData['temperature'];
        	return Sk.builtin.int_(self.temperature);
        });
    }, "sht20", []);

    return mod;
};