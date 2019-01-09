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
    data: {
        'temperature': 23
    },
    init: function () {
        // 初始化模拟外部操作界面
        var val = $('#monitor_select').children('option:selected').val();
        $('#monitor_' + val + '_div').show();
        $('#monitor_select').change(function () {
            var options = $(this).children('option');
            for (var i = 0; i < options.length; i ++) {
                var id = '#monitor_' + options[i].value + '_div';
                $(id).hide();
            }
            var val = $(this).children('option:selected').val();
            var id = '#monitor_' + val + '_div';
            $(id).show();
        });

        // 温度界面
        var ts = $("#temperature_slider").slider();
        ts.slider('setValue', ui.data.temperature);
        $("#curr_temperature").text(ui.data.temperature);
        $("#temperature_slider").on("slide", function(slideEvt) {
            $("#curr_temperature").text(slideEvt.value);
        });
    },
    reset: function () {

    },
    bindBtnEvent: function (btn_id, mod_btn_arr) {
        $('#' + btn_id).on("mousedown mouseup click", function(e) {
            for (var i = 0; i < mod_btn_arr.length; i ++) {
                switch(e.type) {
                    case 'mousedown':
                        mod_btn_arr[i].pressed = true;
                        break;
                    case 'mouseup':
                        mod_btn_arr[i].pressed = false;
                        break;
                    case 'click':
                        mod_btn_arr[i].presses ++;
                        break;
                }
            }
        });
    },
    setLED: function (x, y, brightness) {
		$('.mb_led.mb_led_row_' + y + '.mb_led_col_' + x).removeClass('mb_led_brightness_1 mb_led_brightness_2 mb_led_brightness_3 mb_led_brightness_4 mb_led_brightness_5 mb_led_brightness_6 mb_led_brightness_7 mb_led_brightness_8 mb_led_brightness_9').addClass('mb_led_brightness_' + brightness);
	},
    output: function (s) {
        console.log(s);
    },
    updateMicrobitPins: function () {
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

$(function () {
    ui.init();
});
