var $builtinmodule = function (name) {
	var mod = {};
	mod.Pin = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pinNum, mode) {
            self.pinNum = pinNum.v;
            self.value = 0;
            if(mode){
                self.mode = mode.v;
                if(self.mode == 'Out'){       
                    ui.AddPinOption('digitalOut', self.pinNum);
                }
                else{
                    ui.AddPinOption('digitalIn', self.pinNum);
                }
            }
        });
        $loc.value = new Sk.builtin.func(function(self, value) {
            if(value && self.mode === 'Out'){
            	self.value = value.v;
                ui.setPinValue(self.pinNum, self.value);
                if(self.pinNum === 0 || self.pinNum === 5){
                    ui.setBoardLEDonoff(self.pinNum / 5);
                }
            }
            else{
                self.value = ui.getPinValue(self.pinNum);
            }         
            return new Sk.builtin.int_(self.value);
        });
        $loc.PULL_UP = new Sk.builtin.str('PULL_UP');
        $loc.PULL_DOWN = new Sk.builtin.str('PULL_DOWN');
        $loc.In = new Sk.builtin.str('In');
        $loc.Out = new Sk.builtin.str('Out');
    }, "Pin", []);
    mod.ADC =  new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            self.pinNum = pin.pinNum;
            ui.AddPinOption('ADC', self.pinNum);
        });
        $loc.atten = new Sk.builtin.func(function(self, atten) {
            self.atten = atten.v;
        });
        $loc.read = new Sk.builtin.func(function(self, value) {
            self.value = ui.getPinValue(self.pin.pinNum);
            return new Sk.builtin.int_(self.value);
        });
        $loc.ATTN_11DB = new Sk.builtin.str('3.3V');
        $loc.ATTN_6DB = new Sk.builtin.str('2.2V');
        $loc.ATTN_2_5_DB = new Sk.builtin.str('1.5V');
        $loc.ATTN_0DB = new Sk.builtin.str('1.2V');
    }, "ADC", []);
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