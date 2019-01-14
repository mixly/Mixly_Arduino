'use strict';

var base_url = conf.url + '/blockly/sims/microbit_python/';
Sk.externalLibraries = {
    // added as a farewell message to a school direct student
    microbit: {
        path: base_url + 'microbit/__init__.js',
        dependencies: [
            base_url + 'microbit/display.js',
            base_url + 'microbit/accelerometer.js',
            base_url + 'microbit/compass.js',
            base_url + 'microbit/uart.js',
        ]
    },
    music: {
        path: conf.url + '/blockly/sims/microbit_python/music/__init__.js'
    },
    radio:{
        path: conf.url + '/blockly/sims/microbit_python/radio/__init__.js'
    },
    speech: {
        path: conf.url + '/blockly/sims/microbit_python/speech/__init__.js',
        dependencies: [conf.url + '/blockly/sims/microbit_python/speech/sam.js']
    },
    neopixel: {
        path: conf.url + '/blockly/sims/microbit_python/neopixel/__init__.js'
    },
}


var ui = {
    inited: false,
    init: function () {
        // 初始化模拟外部操作界面
        $("#monitor_select").val("button");
        $("#monitor_select").trigger('change');
        var val = $('#monitor_select').children('option:selected').val();
        $('#monitor_' + val + '_div').show();
        if (!ui.inited) {
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
        }

        // 温度界面
        var ts = $("#temperature_slider").slider();
        ts.slider('setValue', mbData.temperature);
        $("#curr_temperature").text(mbData.temperature);
        if (!ui.inited) {
            $("#temperature_slider").on("slide", function (slideEvt) {
                $("#curr_temperature").text(slideEvt.value);
            });
        }

        // 指南针界面
        var compass_el_arr = ['compass_heading', 'compass_x', 'compass_y', 'compass_z'];
        for (var i = 0; i < compass_el_arr.length; i ++) {
            var key = compass_el_arr[i].split('_')[1];
            var sdr = $("#" + compass_el_arr[i] + "_slider").slider();
            sdr.slider('setValue', mbData.compass[key]);
            $("#curr_" + compass_el_arr[i]).text(mbData.compass[key]);
            if (!ui.inited) {
                $("#" + compass_el_arr[i] + "_slider").on("slide", function (slideEvt) {
                    var sliderId = slideEvt.currentTarget.getAttribute('id').replace('_slider', '');
                    $("#curr_" + sliderId).text(slideEvt.value);
                });
            }
        }

        // 超声波测距界面
        var ts = $("#HCSR04_slider").slider();
        ts.slider('setValue', mbData.distance);
        $("#curr_HCSR04").text(mbData.distance);
        if (!ui.inited) {
            $("#HCSR04_slider").on("slide", function (slideEvt) {
                $("#curr_HCSR04").text(slideEvt.value);
            });
        }
        // 无线通信界面
       for (var each in mbData.radio){
            $('#radio_'+ each).val(mbData.radio[each])
       }

       if (!ui.inited) {
           $('#radio_update_config').off('click').on('click', function () {
               ui.updateRadioStatus('Radio module not detected - did you include "import radio"?');
           });
       }

        //neopixel
        $('#neopixel').hide();

        // 舵机
        ui.servoChart = echarts.init(document.getElementById('servo'));
        ui.servoOption = {
            tooltip : {
                formatter: "{b} : {c}%"
            },
            toolbox: {
                feature: {
                }
            },
            series: [
                {
                    name: '舵机',
                    type: 'gauge',
                    detail: {
                        formatter:'{value}',
                        fontSize: '10px',
                    },
                    data: [{value: mbData.servo, name: '舵机'}],
                    min: 0,
                    max: 180,
                    splitNumber: 4
                }
            ]
        };
        ui.servoChart.setOption(ui.servoOption, true);
        $('#servo').hide();

        // 加速度计界面
        var accelerometer_el_arr = ['accelerometer_x', 'accelerometer_y', 'accelerometer_z'];
        for (var i = 0; i < accelerometer_el_arr.length; i ++) {
            var key = accelerometer_el_arr[i].split('_')[1];
            var sdr = $("#" + accelerometer_el_arr[i] + "_slider").slider();
            sdr.slider('setValue', mbData.accelerometer[key]);
            $("#curr_" + accelerometer_el_arr[i]).text(mbData.accelerometer[key]);
            if (!ui.inited) {
                $("#" + accelerometer_el_arr[i] + "_slider").on("slide", function (slideEvt) {
                    var sliderId = slideEvt.currentTarget.getAttribute('id').replace('_slider', '');
                    $("#curr_" + sliderId).text(slideEvt.value);
                });
            }
        }

        //绑定事情只需要初始化一次
        ui.inited = true;
    },
    bindBtnEvent: function (btn_id, mod_btn_arr) {
        $('#' + btn_id).off("mousedown mouseup click").on("mousedown mouseup click", function(e) {
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
    bindSliderEvent: function (sliderId, data, key, cb) {
        var id = "#" + sliderId + "_slider";
        $(id).off('slide').on('slide', function (slideEvt) {
            console.log(slideEvt.value);
            data[key] = slideEvt.value;
            $("#curr_" + sliderId).text(slideEvt.value);
            if (cb != undefined) {
                cb();
            }
        })
    },
    bindSendMessageEvent: function(btnId, data){
        var id = '#send_' + btnId + '_message';
        $(id).off('click').on('click',function(){
            if(data['buffer'].length < data['queue'])
                data['buffer'].push("\x00\x01\x00" + $('#'+ btnId + '_data').val());
        });
    },
    bindRadioSendMessageEvent: function(elementId, data){
        ui.bindSendMessageEvent(elementId, data)
    },
    bindRadioUpdateConfigEvent: function (elementId, data) {
        $('#' + elementId).off('click').on('click', function () {
            ui.updatePeerRadioParam(data);
        });
    },
    bindCompassEvent: function (sliderId, data, key) {
        ui.bindSliderEvent(sliderId, data, key);
    },
    bindTemperatureEvent: function (sliderId, data, key) {
        ui.bindSliderEvent(sliderId, data, key);
    },
    bindHCSR04Event: function (sliderId, data, key) {
        ui.bindSliderEvent(sliderId, data, key);
    },
    bindAccelerometerEvent: function (sliderId, data, key, cb) {
        ui.bindSliderEvent(sliderId, data, key, cb);
    },
    bindAccelerometerGestureEvent: function (btnId, data, gesture) {
        $('#' + btnId).off('click').on('click', function () {
            if (data.currentGesture != gesture) {
                data.currentGesture = gesture;
                data.gestureHistory.push(gesture);
                ui.updateAccelerometerBtn(gesture);
            }
        })
    },
    setLED: function (x, y, brightness) {
        $('.mb_led.mb_led_row_' + y + '.mb_led_col_' + x).removeClass('mb_led_brightness_1 mb_led_brightness_2 mb_led_brightness_3 mb_led_brightness_4 mb_led_brightness_5 mb_led_brightness_6 mb_led_brightness_7 mb_led_brightness_8 mb_led_brightness_9').addClass('mb_led_brightness_' + brightness);
    },
    output: function (s) {
        console.log(s);
    },
    updateMicrobitPins: function () {
        //not implement
    },
    updateNeopixel: function (leds) {
        var el = $('#neopixel');
        el.empty();
        for (var i = 0; i < leds.length; i ++) {
            var currLed = leds[i];
            var color = currLed.join(',');
            el.append('<img class="neopixel-led" style="background-color: rgb(' + color + ');">');
        }
        el.css('width', 35 * leds.length + 'px');
        $('#neopixel').show();
    },
    updateServo: function (degree) {
        ui.servoOption.series[0].data[0].value = degree;
        ui.servoChart.setOption(ui.servoOption, true);
        $('#servo').show();
    },
    updateAccelerometerBtn: function (gesture) {
        $('.accelerometer-btn').each(function () {
            $(this).css('background-color', '#fff');
        })
        if (gesture != '') {
            $('#' + gesture.replace(' ', '')).css('background-color', '#5cb85c');
        }
    },
    updateRadioStatus: function (text) {
        $('#radio_status').html(text);
    },
    updatePeerRadioParam: function (data) {
        var feedback = '';
        if($('#radio_channel').val() != data.channel) {
            feedback = "Channel doesn't match: currently set to " + data.channel;
            data.peer = false;
        } else if($('#radio_group').val() != data.group) {
            feedback = "Group doesn't match: currently set to " + data.group;
            data.peer = false;
        } else if($('#radio_address').val() != data.address) {
            feedback = "Address doesn't match: currently set to " + data.address.toString(16);
            data.peer = false;
        } else if($('#radio_data_rate').val() != data.data_rate){
            feedback = "Data rate doesn't match: currently set to " + data.data_rate;
            data.peer = false;
        } else {
            data.peer = true;
            feedback = "Tuned in to radio module";
        }
        ui.updateRadioStatus(feedback);
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

