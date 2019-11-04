var $builtinmodule = function (name) {
	var mod = {
        'data': {
                'UART': {
                    'baudrate': mbData.uart.baudrate,
                    'bits': mbData.uart.bits,
                    'parity': mbData.uart.parity,
                    'stop': mbData.uart.stop,
                    'tx': mbData.uart.tx,
                    'rx': mbData.uart.rx,
                    'buffer': mbData.uart.buffer,
                    'peer': true
                },
        }
    };
	mod.Pin = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pinNum, mode) {
            self.pinNum = pinNum.v;
            self.value = 0;
            if(mode){
                self.mode = mode.v;
                if(self.mode == 'Out'){
                    ui.addPinOption('digitalOut', self.pinNum);
                    ui.bindDeletePinBtnEvent(self.pinNum);
                }
                else{
                    ui.addPinOption('digitalIn', self.pinNum);
                    ui.bindDeletePinBtnEvent(self.pinNum);
                }
            }

        });
        $loc.value = new Sk.builtin.func(function(self, value) {
            if(value && self.mode === 'Out'){
            	self.value = value.v;
                ui.setPinValue(self.pinNum, self.value);
                if(self.pinNum === 0 || self.pinNum === 5){
                    ui.setBoardLEDonoff( parseInt((self.pinNum / 5) + 1), self.value);
                    sm.boardLED.setOnOff( parseInt((self.pinNum / 5) + 1), self.value);
                }
            }
            else{
                self.value = ui.getPinValue(self.pinNum);
            }
            return new Sk.builtin.int_(self.value);
        });
        $loc.PULL_UP = new Sk.builtin.str('PULL_UP');
        $loc.PULL_DOWN = new Sk.builtin.str('PULL_DOWN');
        $loc.IN = new Sk.builtin.str('In');
        $loc.OUT = new Sk.builtin.str('Out');
    }, "Pin", []);
    mod.ADC =  new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            self.pin = pin;
            self.pinNum = pin.pinNum;
            ui.addPinOption('ADC', self.pinNum);
            ui.bindDeletePinBtnEvent(self.pinNum);
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
    mod.PWM =  new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            self.pin = pin;
            self.pinNum = pin.pinNum;
            ui.addPinOption('PWM', self.pinNum);
            ui.bindDeletePinBtnEvent(self.pinNum);
        });
        $loc.duty = new Sk.builtin.func(function(self, duty) {
            self.duty = duty.v;
            if(self.pin.pinNum === 0 || self.pinNum === 5){
                ui.setBoardLEDbrightness( parseInt((self.pin.pinNum / 5) + 1), self.duty);
                sm.boardLED.setBrightness( parseInt((self.pinNum / 5) + 1), self.duty);
            }
            ui.setPinValue(self.pin.pinNum, duty.v)
        });
        $loc.freq = new Sk.builtin.func(function(self, freq) {
            ui.setAnalogPinFreq(self.pin.pinNum, freq.v);
        });
    }, "PWM", []);
    mod.TouchPad =  new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            self.pin = pin;
            self.pinNum = pin.pinNum;
            ui.addPinOption('TouchPad', self.pinNum);
            ui.bindDeletePinBtnEvent(self.pinNum);
        });
        $loc.read = new Sk.builtin.func(function(self) {
            self.value = ui.getPinValue(self.pinNum);
            return new Sk.builtin.int_(self.value);
        });
    }, "TouchPad", []);
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
            self.date = new Date(2000, 1, 1, 6, 8, 0, 0, 0)
            self.startTime = 0;
        });

        $loc.datetime = new Sk.builtin.func(function(self,timeTuple){
            var currentDate = null;
            if(timeTuple){
            	for (eachData in timeTuple.v){
            		self.timeArr[eachData] = timeTuple.v[eachData];
                }
                self.date = new Date(...self.timeArr);
                self.startTime = sm.time;
                currentDate = self.date;
            }
            else{
                var millsecond = self.date.getTime() + sm.time - self.startTime;
                currentDate = new Date(millsecond);
            }
            return new Sk.builtin.tuple([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds()]);
        });
    }, "RTC", []);
    mod.I2C = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, scl, sda, freq) {
            self.scl = scl.v;
            self.sda = sda.v;
            self.freq = freq.v;
        });
    }, "I2C", []);

    mod.UART = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, num, baudrate, bits, parity, stop, tx, rx) {
            if(baudrate === undefined)
                baudrate = Sk.builtin.int_(9600);
            if(bits === undefined)
                bits = Sk.builtin.int_(8);
            if(parity === undefined)
                parity = Sk.builtin.none;
            if(stop === undefined)
                stop = Sk.builtin.int_(1);
            if(tx === undefined)
                tx = Sk.builtin.none;
            if(rx === undefined)
                rx = Sk.builtin.none;
            self.num = num.v;
            mod.data.UART.baudrate = baudrate.v;
            mod.data.UART.bits = bits.v;
            mod.data.UART.parity = parity.v;
            mod.data.UART.stop = stop.v;
            mod.data.UART.tx = tx.v;
            mod.data.UART.rx = rx.v;
            mod.data.UART.buffer = "";
            sm.uart.changeBaudrate(baudrate.v);
            ui.updatePeerSerialParam(mod.data.UART);
            ui.bindUartSendMessageEvent('uart', mod.data.UART);
            ui.bindUartBaudrateEvent('uart_baudrate',mod.data.UART);
        });
        $loc.read = new Sk.builtin.func(function(self){
            if (sm.uart.peer.baudrate != mod.data.UART.baudrate) {
                return;
            }
            if (sm.uart.data.buffer.length > 0) {
                var content = sm.uart.data.buffer;
                sm.uart.data.buffer = "";
                //ui.updateSerialStatus('Uart read message: ' + content);
                return Sk.builtin.str(content);
            }
            return Sk.builtin.none;
        });
        $loc.readline = new Sk.builtin.func(function(self){
            if (sm.uart.peer.baudrate != mod.data.UART.baudrate) {
                return;
            }
            if (sm.uart.data.buffer.length > 0) {
                var idx = sm.uart.data.buffer.indexOf('\r');
                if (idx != -1) {
                    var content = sm.uart.data.buffer.substring(0, idx + 1);
                    mod.data.UART.buffer = sm.uart.data.buffer.substring(idx + 1);;
                    //ui.updateSerialStatus('Uart read message: ' + content);
                    return Sk.builtin.str(content);
                }
                else{
                    var content = sm.uart.data.buffer;
                    sm.uart.data.buffer = "";
                    return Sk.builtin.str(content);
                }
            }
            return Sk.builtin.none;
        });
        $loc.write = new Sk.builtin.func(function(self, message){
            if (!mod.data.UART.peer) {
                return;
            }
            //ui.updateSerialOutput(message.v);
            sm.uart.write(message.v);
        });
        $loc.any = new Sk.builtin.func(function(self, message){
            return Sk.builtin.bool(sm.uart.data.buffer.length > 0);
        });
    }, "UART", []);

	return mod;
}