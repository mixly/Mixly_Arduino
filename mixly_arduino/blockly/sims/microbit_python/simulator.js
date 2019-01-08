'use strict';

var base_url = conf.url + '/blockly/sims/microbit_python/';
Sk.externalLibraries = {
    // added as a farewell message to a school direct student
    microbit: {
        path: base_url + 'microbit/__init__.js',
        dependencies: [base_url + 'microbit/display.js']
    },
    foo: {
        path: conf.url + '/blockly/sims/microbit_python/foo/__init__.js'
    },
}


var ui = {
    'setLED': function (x, y, brightness) {
		$('.mb_led.mb_led_row_' + y + '.mb_led_col_' + x).removeClass('mb_led_brightness_1 mb_led_brightness_2 mb_led_brightness_3 mb_led_brightness_4 mb_led_brightness_5 mb_led_brightness_6 mb_led_brightness_7 mb_led_brightness_8 mb_led_brightness_9').addClass('mb_led_brightness_' + brightness);
	},
    'output': function (s) {
        console.log(s);
    },
    'updateMicrobitPins': function () {
        //not implement
    }

}

var sim = {
    runAsync: function (asyncFunc) {
        var p = new Promise(asyncFunc);
        var result;
        var susp = new Sk.misceval.Suspension();
        susp.resume = function() {
            return result;
        }
        susp.data = {
            type: "Sk.promise",
            promise: p.then(function(value) {
                result = value;
                return value;
            }, function(err) {
                result = "";
                console.log(err);
                return new Promise(function(resolve, reject){
                });
            })
        };
        return susp;
    }
}

