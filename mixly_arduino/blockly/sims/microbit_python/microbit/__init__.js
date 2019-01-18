//change uart Module name to uartModule to avoid pollute the namespace in window
var uartModule = function(name) {
    var mod = {};
    mod.data = {
    };
    uart = mod.data;
    function checkUartSetting(){
        if(typeof(uart) !== "undefined") {
            var tuned = true;
            console.log
            if($('#uart_baudrate').val() != uart.baudrate) {
                $('#uart_status').html("Baudrate doesn't match: currently set to " + uart.baudrate);
                tuned = false;
            }
            if(typeof(uart.tx) != 'undefined' && typeof(uart.rx) != 'undefined'){
                if($('#uart_tx').val() != uart.tx) {
                    $('#uart_status').html("Pin tx doesn't match: currently set to " + uart.tx);
                    tuned = false;
                }
                if($('#uart_rx').val() != uart.tx) {
                    $('#uart_status').html("Pin rx doesn't match: currently set to " + uart.rx);
                    tuned = false;
                }
            }            
            if(tuned) {
                $('#uart_status').html("Tuned in to uart module");
                uart.uartui_read = function(message) {
                    $('#uart_status').html("Uart read message: " + message);
                   
                }
                uart.uartui_write = function(message) {
                    if(message.slice(-1)==='\n')
                      $('#print_area').append('<span style="display:block;">'+message+'</span>');
                    else
                      $('#print_area').append('<span>'+ message +'</span>');
                }
            }
            else{
                delete uart.uartui_read;
                delete uart.uartui_write;
            }

        }
    }
    var init = function(baudrate, bits, parity, stop, tx, rx) {
        if(baudrate === undefined)
            baudrate = Sk.builtin.int_(115200);
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
        mod.data.baudrate = baudrate.v;
        mod.data.bits = bits.v;
        mod.data.parity = parity.v;
        mod.data.stop = stop.v;
        mod.data.tx = tx.v;
        mod.data.rx = rx.v;
        mod.data.buffer = "";
        delete mod.data.uartui_read;
        delete mod.data.uartui_write;
    }

    init.co_varnames = ['baudrate', 'bits', 'parity', 'stop', 'tx', 'rx'];
    init.$defaults = [Sk.builtin.int_(9600), Sk.builtin.int_(8), Sk.builtin.none, Sk.builtin.int_(1), Sk.builtin.none, Sk.builtin.none];
    init.co_numargs = 6;
    mod.init = new Sk.builtin.func(init);
    mod.any = new Sk.builtin.func(function() {
        checkUartSetting();
        if(mod.data.uartui_read && mod.data.buffer.length > 0)
            return Sk.builtin.bool(true);
        else
            return Sk.builtin.bool(false);
    });

    var read = function(){
        checkUartSetting();
        if(mod.data.uartui_read && mod.data.buffer.length > 0){
            var content = mod.data.buffer;
            mod.data.buffer = "";
            mod.data.uartui_read(content);
            return Sk.builtin.str(content);
        }    
        else{
            return Sk.builtin.none;
        }
    }
    var write = function(message){
        checkUartSetting();
        if(mod.data.uartui_write) {
            mod.data.uartui_write(message.v);
        }
    }
    mod.read = new Sk.builtin.func(read);
    mod.write = new Sk.builtin.func(write);

    ui.bindUartSendMessageEvent();
    return mod;
}

var $builtinmodule = function (name) {
    var mod = {
        data: {
            temperature: mbData['temperature'],
            distance : mbData['distance'],
        }
    };

    mod.panic = new Sk.builtin.func(function(n) {
        ui.output("Panic mode: " + n.v);
    });

    var start_time = Date.now();
    mod.reset = new Sk.builtin.func(function() {
        start_time = Date.now();
        // not implemented yet
    });

    mod.running_time = new Sk.builtin.func(function() {
        return Sk.builtin.int_(Date.now() - start_time);
    });

    mod.sleep = new Sk.builtin.func(function(delay) {
        return sim.runAsync(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, delay.v);
        });
    });

    mod.temperature = new Sk.builtin.func(function() {
        return Sk.builtin.int_(mod.data.temperature);
    });
    ui.bindTemperatureEvent('temperature', mod.data, 'temperature');

    var ioPinDigital = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, name) {
            self.name = name.v;
            self.value = 0;
        });

        $loc.read_digital = new Sk.builtin.func(function(self){
            var flag = false;
            $('select.pinOption').each(function(){
                if($(this).val()==self.name){
                    flag = true;
                    var id = $(this).attr('id').split('select_row').join('');
                    self.value = parseInt($('#curr_pinValue'+id).text());
                }
            });
            if(!flag){//找不到就新建一个
                ui.updateMicrobitPins('digital',self.name,self.value);
            }
            return Sk.builtin.int_(self.value);
        });

        $loc.write_digital = new Sk.builtin.func(function(self, value){
            self.value = value.v == 1? 1: 0;
            ui.updateMicrobitPins('digital',self.name,self.value);
        });
    }, "MicroBitDigitalPin", []);

    mod.pin5 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(5));
    mod.pin6 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(6));
    mod.pin7 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(7));
    mod.pin8 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(8));
    mod.pin9 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(9));
    mod.pin11 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(11));
    mod.pin12 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(12));
    mod.pin13 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(13));
    mod.pin14 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(14));
    mod.pin15 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(15));
    mod.pin16 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(16));
    mod.pin19 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(19));
    mod.pin20 = Sk.misceval.callsim(ioPinDigital, Sk.builtin.int_(20));

    var ioPinAnalog = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self,name) {
            self.value = 0;
            self.name = name.v
            self.period_us = 35;
        });

        $loc.read_analog = new Sk.builtin.func(function(self) {
            var flag = false;//是否能够找到该列
            $('select.pinOption').each(function(){
                if($(this).val()==self.name){
                    flag = true;
                    var id = $(this).attr('id').split('select_row').join('');
                    self.value = parseInt($('#curr_pinValue'+id).text());
                }
            });
            if(!flag){//找不到就新建一个
                ui.updateMicrobitPins('analog',self.name,self.value);
            }
            return Sk.builtin.int_(self.value);

        });

        $loc.write_analog = new Sk.builtin.func(function(self, value) {
            self.value = value.v;
            ui.updateMicrobitPins('analog',self.name,self.value);
        });

        $loc.set_analog_period = new Sk.builtin.func(function(self, period) {
            self.period_us = period.v * 1000;
            ui.updateUIAnalogPeriod(self.name,self.period_us);
        });

        $loc.set_analog_period_microseconds = new Sk.builtin.func(function(self, period) {
            self.period_us = period.v;
            ui.updateUIAnalogPeriod(self.name,self.period_us);
        });

    }, "MicroBitAnalogPin", []);
    mod.pin3 = Sk.misceval.callsim(ioPinAnalog, Sk.builtin.int_(3));
    mod.pin4 = Sk.misceval.callsim(ioPinAnalog, Sk.builtin.int_(4));
    mod.pin10 = Sk.misceval.callsim(ioPinAnalog, Sk.builtin.int_(10));

    var ioPinTouch = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self,name) {
            self.name = name.v;
            self.touched = false;
        });

        $loc.is_touched = new Sk.builtin.func(function(self) {
            var flag = false;
            $('select.pinOption').each(function(){
                if($(this).val()==self.name){
                    flag = true;
                    var id = $(this).attr('id').split('select_row').join('');
                    self.touched = parseInt($('#curr_pinValue'+id).text()) === 1 ? true : false;
                }
            });
            if(!flag){
                 ui.updateMicrobitPins('touch',self.name,self.touched);
            }
            return Sk.builtin.bool(self.touched);
        });
    }, "MicroBitTouchPin", []);

    mod.pin0 = Sk.misceval.callsim(ioPinTouch, Sk.builtin.int_(0));
    mod.pin1 = Sk.misceval.callsim(ioPinTouch, Sk.builtin.int_(1));
    mod.pin2 = Sk.misceval.callsim(ioPinTouch, Sk.builtin.int_(2));
    ui.bindAddPinBtnEvent('digital');
    ui.bindAddPinBtnEvent('analog');
    ui.bindAddPinBtnEvent('touch');
    

    mod.Button = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.presses = 0;
            self.pressed = false;
            self.last_checked = 0;
        });

        $loc.is_pressed = new Sk.builtin.func(function(self) {
            return Sk.builtin.bool(self.pressed);
        });

        $loc.was_pressed = new Sk.builtin.func(function(self) {
            var r = self.presses > self.last_checked;
            self.last_checked = self.presses;
            return Sk.builtin.bool(r);
        });

        $loc.get_presses = new Sk.builtin.func(function(self) {
            var presses = self.presses;
            self.presses = 0;
            return Sk.builtin.int_(presses);
        });
    }, "Button", []);

    mod.button_a = new mod.Button();
    mod.button_b = new mod.Button();
    ui.bindBtnEvent('btn_A', [mod.button_a]);
    ui.bindBtnEvent('mb_btn_A', [mod.button_a]);
    ui.bindBtnEvent('btn_B', [mod.button_b]);
    ui.bindBtnEvent('mb_btn_B', [mod.button_b]);
    ui.bindBtnEvent('btn_both', [mod.button_b]);

    mod.Image = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, str, y) {
            if(str === undefined | y !== undefined) str = Sk.builtin.str("00000:00000:00000:00000:00000");
            self.lines = str.v.split(/[:\n]/);
        });

        $loc.width = new Sk.builtin.func(function(self) {
            return self.lines[0].length;
        });

        $loc.height = new Sk.builtin.func(function(self) {
            return self.lines.length;
        });

        $loc.set_pixel = new Sk.builtin.func(function(self, x, y, value) {
            var row = self.lines[y.v].split("");
            row[x.v] = value.v;
            self.lines[y.v] = row.join("");
        });

        $loc.get_pixel = new Sk.builtin.func(function(self, x, y){
            return Sk.builtin.int_(self.lines[y.v][x.v]);
        });

        $loc.__repr__ = new Sk.builtin.func(function(self) {
            return Sk.builtin.str('Image("' + self.lines.join(":") + '")');
        });

        $loc.__str__ = new Sk.builtin.func(function(self) {
            return Sk.builtin.str('Image("' + self.lines.join(":") + '")');
        });

        $loc.shift_left = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            var copy = self.lines.slice(0);
            for(var j = 0; j < n.v; j++) {
                var width = copy[0].length;
                for(var i = 0; i < copy.length; i++) {
                    copy[i] = copy[i].slice(1, width) + "0";
                }
            }

            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.shift_right = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            var copy = self.lines.slice(0);
            for(var j = 0; j < n.v; j++) {
                var width = copy[0].length;
                for(var i = 0; i < copy.length; i++) {
                    copy[i] = "0" + copy[i].slice(0, width - 1);
                }
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.shift_up = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            var height = self.lines.length;
            var copy = self.lines.slice(n.v, height);
            var s = "";
            for(var j = 0; j < n.v; j++){
                for(var i = 0; i < self.lines[0].length; i++) {
                    s += "0";
                }
                copy.push(s);
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.shift_down = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            var height = self.lines.length;
            var copy = [];

            var s = "";
            for(var j = 0; j < n.v; j++) {
                for(var i = 0; i < self.lines[0].length; i++) {
                    s += "0";
                }
                copy.push(s);

            }
            copy.push.apply(copy, self.lines.slice(0, height - 1));
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.__add__ = new Sk.builtin.func(function(self, other) {
            var x,y,val;
            var copy = self.lines.slice(0);
            for(y = 0; y < copy.length; y++) {
                copy[y] = copy[y].split("");
                for(x = 0; x < copy[y].length; x++) {
                    val = parseInt(copy[y][x]) + parseInt(other.lines[y][x]);

                    if(val > 9) val = 9;
                    copy[y][x] = val;
                }
                copy[y] = copy[y].join("");
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.__sub__ = new Sk.builtin.func(function(self, other) {
            var x,y,val;
            var copy = self.lines.slice(0);
            for(y = 0; y < copy.length; y++) {
                copy[y] = copy[y].split("");
                for(x = 0; x < copy[y].length; x++) {
                    val = parseInt(copy[y][x]) - parseInt(other.lines[y][x]);

                    if(val < 0) val = 0;
                    copy[y][x] = val;
                }
                copy[y] = copy[y].join("");
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.__mul__ = new Sk.builtin.func(function(self, n) {
            var copy = self.lines.slice(0);
            for(y = 0; y < copy.length; y++) {
                copy[y] = copy[y].split("");
                for(x = 0; x < copy[y].length; x++) {
                    val = Math.round(parseInt(copy[y][x]) * n.v);
                    if(val < 0) val = 0;
                    if(val > 9) val = 9;
                    copy[y][x] = val;
                }
                copy[y] = copy[y].join("");
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.invert = new Sk.builtin.func(function(self) {
            var copy = self.lines.slice(0);
            for(y = 0; y < copy.length; y++) {
                copy[y] = copy[y].split("");
                for(x = 0; x < copy[y].length; x++) {
                    val = parseInt(copy[y][x]);
                    copy[y][x] = 9 - val;
                }
                copy[y] = copy[y].join("");
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });


    }, 'Image', []);


    mod.Image.HEART = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09090:99999:99999:09990:00900:"));
    mod.Image.HEART_SMALL = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09090:09990:00900:00000:"));
    mod.Image.HAPPY = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09090:00000:90009:09990:"));
    mod.Image.SMILE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00000:90009:09990:"));
    mod.Image.SAD = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09090:00000:09990:90009:"));
    mod.Image.CONFUSED = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09090:00000:09090:90909:"));
    mod.Image.ANGRY = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90009:09090:00000:99999:90909:"));
    mod.Image.ASLEEP = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:99099:00000:09990:00000:"));
    mod.Image.SURPRISED = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09090:00000:00900:09090:00900:"));
    mod.Image.SILLY = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90009:00000:99999:00909:00999:"));
    mod.Image.FABULOUS = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99999:99099:00000:09090:09990:"));
    mod.Image.MEH = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09090:00000:00090:00900:09000:"));
    mod.Image.YES = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00009:00090:90900:09000:"));
    mod.Image.NO = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90009:09090:00900:09090:90009:"));
    mod.Image.CLOCK12 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:00900:00000:00000:"));
    mod.Image.CLOCK1 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00090:00090:00900:00000:00000:"));
    mod.Image.CLOCK2 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00099:00900:00000:00000:"));
    mod.Image.CLOCK3 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00999:00000:00000:"));
    mod.Image.CLOCK4 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:00099:00000:"));
    mod.Image.CLOCK5 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:00090:00090:"));
    mod.Image.CLOCK6 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:00900:00900:"));
    mod.Image.CLOCK7 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:09000:09000:"));
    mod.Image.CLOCK8 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:99000:00000:"));
    mod.Image.CLOCK9 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:99900:00000:00000:"));
    mod.Image.CLOCK10 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:99000:00900:00000:00000:"));
    mod.Image.CLOCK11 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09000:09000:00900:00000:00000:"));
    mod.Image.ARROW_N = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:90909:00900:00900:"));
    mod.Image.ARROW_NE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00999:00099:00909:09000:90000:"));
    mod.Image.ARROW_E = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00090:99999:00090:00900:"));
    mod.Image.ARROW_SE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90000:09000:00909:00099:00999:"));
    mod.Image.ARROW_S = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:90909:09990:00900:"));
    mod.Image.ARROW_SW = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00009:00090:90900:99000:99900:"));
    mod.Image.ARROW_W = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09000:99999:09000:00900:"));
    mod.Image.ARROW_NW = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99900:99000:90900:00090:00009:"));
    mod.Image.TRIANGLE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00900:09090:99999:00000:"));
    mod.Image.TRIANGLE_LEFT = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90000:99000:90900:90090:99999:"));
    mod.Image.CHESSBOARD = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09090:90909:09090:90909:09090:"));
    mod.Image.DIAMOND = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09090:90009:09090:00900:"));
    mod.Image.DIAMOND_SMALL = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00900:09090:00900:00000:"));
    mod.Image.SQUARE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99999:90009:90009:90009:99999:"));
    mod.Image.SQUARE_SMALL = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09990:09090:09990:00000:"));
    mod.Image.RABBIT = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90900:90900:99990:99090:99990:"));
    mod.Image.COW = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90009:90009:99999:09990:00900:"));
    mod.Image.MUSIC_CROTCHET = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:00900:99900:99900:"));
    mod.Image.MUSIC_QUAVER = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00990:00909:99900:99900:"));
    mod.Image.MUSIC_QUAVERS = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09999:09009:09009:99099:99099:"));
    mod.Image.PITCHFORK = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90909:90909:99999:00900:00900:"));
    mod.Image.XMAS = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:00900:09990:99999:"));
    mod.Image.PACMAN = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09999:99090:99900:99990:09999:"));
    mod.Image.TARGET = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:99099:09990:00900:"));
    mod.Image.TSHIRT = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99099:99999:09990:09990:09990:"));
    mod.Image.ROLLERSKATE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00099:00099:99999:99999:09090:"));
    mod.Image.DUCK = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09900:99900:09999:09990:00000:"));
    mod.Image.HOUSE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:99999:09990:09090:"));
    mod.Image.TORTOISE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09990:99999:09090:00000:"));
    mod.Image.BUTTERFLY = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99099:99999:00900:99999:99099:"));
    mod.Image.STICKFIGURE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:99999:00900:09090:90009:"));
    mod.Image.GHOST = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99999:90909:99999:99999:90909:"));
    mod.Image.SWORD = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:00900:09990:00900:"));
    mod.Image.GIRAFFE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99000:09000:09000:09990:09090:"));
    mod.Image.SKULL = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09990:90909:99999:09990:09990:"));
    mod.Image.UMBRELLA = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09990:99999:00900:90900:09900:"));
    mod.Image.SNAKE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99000:99099:09090:09990:00000:"));

    mod.Image.ALL_CLOCKS = Sk.builtin.list([mod.Image.CLOCK1, mod.Image.CLOCK2, mod.Image.CLOCK3, mod.Image.CLOCK4, mod.Image.CLOCK5, mod.Image.CLOCK6, mod.Image.CLOCK7, mod.Image.CLOCK8, mod.Image.CLOCK9, mod.Image.CLOCK10, mod.Image.CLOCK11, mod.Image.CLOCK12]);
    mod.Image.ALL_ARROWS = Sk.builtin.list([mod.Image.ARROW_N, mod.Image.ARROW_NE, mod.Image.ARROW_E, mod.Image.ARROW_SE, mod.Image.ARROW_S, mod.Image.ARROW_SW, mod.Image.ARROW_W, mod.Image.ARROW_NW]);

    mod.HCSR04 = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self) {
        });

        $loc.distance_cm = new Sk.builtin.func(function(self) {
            return Sk.builtin.float_(mod.data.distance);
        });
    }, "HCSR04", []);
    ui.bindHCSR04Event('HCSR04', mod.data, 'distance');

    mod.Servo = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            self.pin = pin;
        });

        $loc.write_angle = new Sk.builtin.func(function(self, degree) {
            debugger;
            ui.updateServo(degree.v);
        });
    }, "Servo", []);

    mod.display = new Sk.builtin.module();
    mod.display.$d = new display("microbit.display");

    mod.compass = new Sk.builtin.module();
    mod.compass.$d = new compass("microbit.compass");

    mod.accelerometer = new Sk.builtin.module();
    mod.accelerometer.$d = new accelerometer("microbit.accelerometer");


    /*
    mod.i2c = new Sk.builtin.module();
    mod.i2c.$d = new i2c("microbit.i2c");
    */

    mod.uart = new Sk.builtin.module();
    mod.uart.$d = new uartModule("microbit.uart");


    return mod;
}
