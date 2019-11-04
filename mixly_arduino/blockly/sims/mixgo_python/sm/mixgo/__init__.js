/*
var $builtinmodule = function (name) {
    var mod = {
        data: {
            temperature: mbData['temperature'],
            distance : mbData['distance'],
            distance_infrared_left : mbData['distance_infrared_left'],
            distance_infrared_right : mbData['distance_infrared_right'],
            brightness: mbData['brightness'],
            soundlevel: mbData['soundlevel'],
            boardLED: mbData['boardLED'],
        }
    };

    mod.panic = new Sk.builtin.func(function(n) {
        ui.output("Panic mode: " + n.v);
    });

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
    ui.bindBtnEvent('mixgo_btn_A', [mod.button_a]);
    ui.bindBtnEvent('btn_B', [mod.button_b]);
    ui.bindBtnEvent('mixgo_btn_B', [mod.button_b]);
    ui.bindBtnEvent('btn_both', [mod.button_a, mod.button_b]);

    var led = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            if(pin)
                self.pin = pin.v;
            self.brightness = 0;
        });

        $loc.on = new Sk.builtin.func(function(self) {
        });

        $loc.off = new Sk.builtin.func(function(self) {
        });

        $loc.setonoff = new Sk.builtin.func(function(pin, val) {
            var actualVal = val.v
            if(actualVal === -1){
                actualVal = (mod.data.boardLED[pin.v] - actualVal) % 2;
            }
            mod.data.boardLED[pin.v] = actualVal;
            if(actualVal === 0){
                ui.setBoardLEDonoff(pin.v, 0);
                sm.boardLED.setOnOff(pin.v, 0);
            }
            else if(actualVal === 1){
                ui.setBoardLEDonoff(pin.v, 1024);
                sm.boardLED.setOnOff(pin.v, 1024);
            }            
        });
        $loc.getonoff = new Sk.builtin.func(function(pin) {
            return Sk.builtin.int_(mod.data.boardLED[pin.v]);
        });
        var setbrightness = new Sk.builtin.func(function(self, pin, brightness) {
            ui.setBoardLEDbrightness(pin.v, brightness.v);
            sm.boardLED.setBrightness(pin.v , brightness.v);
        });
        $loc.setbrightness = Sk.misceval.callsimOrSuspend(Sk.builtins.staticmethod, setbrightness);
    }, "led", []);

    mod.led = Sk.misceval.callsimOrSuspend(led);


    mod.mixgo_get_soundlevel = new Sk.builtin.func(function(self) {
        return Sk.builtin.int_(mod.data.soundlevel);
    });
    ui.bindSliderEvent('soundsensor', mod.data, 'soundlevel');
    mod.mixgo_get_brightness = new Sk.builtin.func(function(self) {
        return Sk.builtin.int_(mod.data.brightness);
    });
    ui.bindSliderEvent('lightsensor', mod.data, 'brightness');

    mod.compass = new Sk.builtin.module();
    mod.compass.$d = new compass("mixgo.compass");

    mod.mpu = new Sk.builtin.module();
    mod.mpu.$d = new mpu("mixgo.mpu9250");

    mod.Infrared_left = new Sk.builtin.module();
    mod.Infrared_left.$d = new Infrared_left("mixgo.Infrared_left");
    mod.Infrared_right = new Sk.builtin.module();
    mod.Infrared_right.$d = new Infrared_right("mixgo.Infrared_right");

    mod.i2c = new Sk.builtin.module();
    mod.i2c.$d = new i2c("microbit.i2c");


    mod.uart = new Sk.builtin.module();
    mod.uart.$d = new uart("microbit.uart");

    return mod;
}*/

var $builtinmodule = function (name) {
    var mod = {
        data: {
            temperature: mbData['temperature'],
            distance : mbData['distance'],
            distance_infrared_left : mbData['distance_infrared_left'],
            distance_infrared_right : mbData['distance_infrared_right'],
            brightness: mbData['brightness'],
            soundlevel: mbData['soundlevel'],
            boardLED: mbData['boardLED'],
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

    var Button = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, name) {
            self.name = name.v;
            self.presses = 0;
            self.pressed = false;
            self.last_checked = 0;
        });

        $loc.is_pressed = new Sk.builtin.func(function(self) {
            self.pressed = sm.getInputer(self.name, sm.time);
            if(self.pressed)
                self.presses++;  
            return Sk.builtin.bool(self.pressed);
        });
        //bug：was_pressed还没有处理
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

    mod.button_a = Sk.misceval.callsim(Button, Sk.builtin.str('button_a'));
    mod.button_b = Sk.misceval.callsim(Button, Sk.builtin.str('button_b'));

    var led = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            if(pin){
                self.pin = pin.v;
                ui.addPinOption('analog', 5 * (self.pin - 1));
            }         
            else{
                ui.addPinOption('analog', 0);
                ui.addPinOption('analog', 5);
            }
            self.brightness = 0;
            
        });

        $loc.on = new Sk.builtin.func(function(self,n) {
            self.val = 0;
        });

        $loc.off = new Sk.builtin.func(function(self) {
            self.val = 1;
        });

        $loc.setonoff = new Sk.builtin.func(function(self, pin, val) {
            var actualVal = val.v
            if(actualVal === -1){
                actualVal = (mod.data.boardLED[pin.v] - actualVal) % 2;
            }
            mod.data.boardLED[pin.v] = actualVal;
            if(actualVal === 0){
                sm.boardLED.setOnOff(pin.v, 0);
            }
            else if(actualVal === 1){
                sm.boardLED.setOnOff(pin.v, 1024);
            }
        });
        $loc.getonoff = new Sk.builtin.func(function(self, pin) {
            return Sk.builtin.int_(mod.data.boardLED[pin.v]);
        });
        $loc.setbrightness = new Sk.builtin.func(function(self, pin, brightness) {
            sm.boardLED.setBrightness(pin.v , brightness.v);
        });
    }, "led", []);

    mod.led1 = Sk.misceval.callsim(led, Sk.builtin.int_(0));
    mod.led2 = Sk.misceval.callsim(led, Sk.builtin.int_(5));
    mod.led = Sk.misceval.callsim(led);

    mod.Servo = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin) {
            self.pin = pin.v;
        });

        $loc.write_angle = new Sk.builtin.func(function(self, degree) {
            sm.servo.write_angle(self.pin, degree.v)
        });
    }, "Servo", []);

    mod.mixgo_get_brightness = new Sk.builtin.func(function() {
        var value = sm.getInputer('brightness', sm.time);
        return Sk.builtin.int_(value);
    });
    mod.mixgo_get_soundlevel = new Sk.builtin.func(function() {
        var value = sm.getInputer('soundlevel', sm.time);
        return Sk.builtin.int_(value);
    });
    mod.sm_mixgo_get_brightness = new Sk.builtin.func(function() {
        var value = sm.getInputer('brightness', sm.time);
        return Sk.builtin.int_(value);
    });
    mod.sm_mixgo_get_soundlevel = new Sk.builtin.func(function() {
        var value = sm.getInputer('soundlevel', sm.time);
        return Sk.builtin.int_(value);
    });

    mod.compass = new Sk.builtin.module();
    mod.compass.$d = new compass("mixgo.compass");

    mod.mpu = new Sk.builtin.module();
    mod.mpu.$d = new mpu("mixgo.mpu9250");

    mod.Infrared_left = new Sk.builtin.module();
    mod.Infrared_left.$d = new Infrared_left("mixgo.Infrared_left");
    mod.Infrared_right = new Sk.builtin.module();
    mod.Infrared_right.$d = new Infrared_right("mixgo.Infrared_right");

    mod.uart = new Sk.builtin.module();
    mod.uart.$d = new uart("mixgo.uart");


    return mod;
}