var $builtinmodule = function (name) {
	var mod = {};
	
	mod.sht = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.temperature = mbData['temperature'];
        });

        $loc.get_SHT_temperature = new Sk.builtin.func(function(self){
            var temperature = sm.getInputer('temperature', sm.time);
        	return Sk.builtin.int_(temperature);
        });
    }, "sht20", []);

    return mod;
};