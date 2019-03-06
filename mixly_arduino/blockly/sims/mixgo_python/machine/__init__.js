var $builtinmodule = function (name) {
	var mod = {};
	mod.Pin = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pinNum) {
            self.pinNum = pinNum.v;
        });
        $loc.value = new Sk.builtin.func(function(self, value) {
            if(value){
            	self.value = value.v;
            }
            return new Sk.builtin.int_(self.value);
        });
    }, "Pin", []);
	mod.BMP280 = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.temperature = mbData['temperature'];
        });

        $loc.get_BMP_temperature = new Sk.builtin.func(function(self){
            self.temperature = mbData['temperature'];
        	return new Sk.builtin.int_(self.temperature);
        });
    }, "BMP280", []);
    mod.RTC = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.timeDict = {
            	year: 2000,
            	month: 1,
            	day: 1,
            	dayofweek: 6,
            	hour: 8,
            	minute: 0,
            	second: 0,
            	microsecond: 0,
            };
            self.timeArr = [2000, 1, 1, 6, 8, 0, 0, 0];
        });

        $loc.datetime = new Sk.builtin.func(function(self,timeTuple){
            if(timeTuple){
            	for (eachData in timeTuple.v){
            		self.timeArr[eachData] = timeTuple.v[eachData];
            	}
            }
            return new Sk.builtin.tuple(self.timeArr);
        });
    }, "RTC", []);
    mod.I2C = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, scl, sda, freq) {
            self.scl = scl.v;
            self.sda = sda.v;
            self.freq = freq.v;
        });
    }, "I2C", []);
	return mod;
}