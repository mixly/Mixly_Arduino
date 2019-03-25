'use strict';

var ui = {
    inited: false,
    pinCount : {
        rowid: 0
    },
    init: function () {
        //模态框关闭时kill program
        if (!ui.inited) {
            $('#simModal').on('hidden.bs.modal', function () {
                Sk.execLimit = 0;
            });
        }

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
        //管脚界面
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
                        formatter: function (value) {
                            if (value < 0) {
                                return 'min:0';
                            } else if(value > 180) {
                                return 'max:180';
                            } else {
                                return value;
                            }
                        },
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

        // mpu9250界面
        var mpu9250_el_arr = ['accelerometer_x', 'accelerometer_y', 'accelerometer_z','mpu9250_gyro_x','mpu9250_gyro_y','mpu9250_gyro_z'];
        for (var i = 0; i < mpu9250_el_arr.length; i ++) {
            var key = mpu9250_el_arr[i].split('_')[1];
            var sdr = $("#" + mpu9250_el_arr[i] + "_slider").slider();
            sdr.slider('setValue', mbData.mpu9250[key]);
            $("#curr_" + mpu9250_el_arr[i]).text(mbData.mpu9250[key]);
            if (!ui.inited) {
                $("#" + mpu9250_el_arr[i] + "_slider").on("slide", function (slideEvt) {
                    var sliderId = slideEvt.currentTarget.getAttribute('id').replace('_slider', '');
                    $("#curr_" + sliderId).text(slideEvt.value);
                });
            }
        }

        $('#tip').text('');
        $('#tip').hide();

        //串口监视器
        $('#uart_data').val('');
        $('#print_area').text('');
        $('#print_area').hide();

        ui.clearScreen();
        if (ui.music_data != undefined && ui.music_data.osc != undefined) {
            ui.music_data.osc.stop();
            delete ui.music_data;
        }
        //绑定事情只需要初始化一次
        ui.inited = true;
    },
    //新增管脚模板
    pinList: {
        digitalIn: [0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32,33,34,35,36,39],
        digitalOut: [0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32,33,34,35,36,39],
        ADC: [32,33,34,35,36,39],
        PWM: [0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32],
        touchpad: [0,2,4,12,13,14,15,27,32,33],
        AllpinList: [0,2,4,5,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,32,33,34,35,36,39],
    },
    pinDigitalModule: function(pinNum){
        var module = '<div class="row form-line" id="pin'+ pinNum + '" pintype="digital" style="padding-top:7px;">'+
            '<label class="col-sm-2 control-label"></label>'+
            '<div class="col-sm-2">'+
                '<span>数字管脚#'+ pinNum +'</span>'+
            '</div>'+
            '<div class="col-sm-3 pinInput form-inline">'+
                '<input id="pinValue'+ pinNum +'" class="form-control" type="text" data-provide="slider" data-slider-min="0" data-slider-max="1" data-slider-step="1" data-slider-value="0"/>'+
                '<label class="control-label"></label>'+
            '</div>'+
            '<div class="col-sm-1 col-sm-offest-2 form-inline">'+
                '<span id="curr_pinValue'+ pinNum + '">0</span>'+
            '</div>'+
            '<div class="col-sm-2 col-sm-offest-2 form-inline">'+
                '<button id="btn_delPin'+ pinNum + '" class="btn_deleterow btn-default form-control">删除</button>'+
            '</div>'+
       '</div>';
       return module;
    },
    pinAnalogModule: function(pinNum){
        var module = '<div class="row form-line" id="pin'+ pinNum + '" pintype="analog" style="padding-top:7px;">'+
            '<label class="col-sm-2 control-label"></label>'+
            '<div class="col-sm-2">'+
                '<span>模拟管脚#'+ pinNum +'</span>'+
            '</div>'+
            '<div class="col-sm-3 pinInput form-inline">'+
                '<input id="pinValue'+ pinNum +'" class="form-control" type="text" data-provide="slider" data-slider-min="0" data-slider-max="1024" data-slider-step="1"/>'+
                '<label class="control-label"></label>'+
            '</div>'+
            '<div class="col-sm-1 col-sm-offest-1 form-inline">'+
                '<span id="curr_pinValue'+ pinNum + '">0</span>'+
            '</div>'+
            '<div class="col-sm-2 form-inline">'+
                '<span>频率：</span>'+
                '<input id="pinPeriod'+ pinNum +'" class="form-control" type="text" />'+
                '<label class="control-label"></label>'+
            '</div>'+
            '<div class="col-sm-2 col-sm-offest-2 form-inline">'+
                '<button id="btn_delPin'+ pinNum + '" class="btn_deleterow btn-default form-control">删除</button>'+
            '</div>'+
       '</div>';
       return module;
    },
    pinTouchModule: function(pinNum){
        var module = '<div class="row form-line" id="row'+ ui.pinCount.rowid + '" pintype="touch" style="padding-top:7px;">'+
            '<label class="col-sm-2 control-label"></label>'+
            '<div class="col-sm-2">'+
                '<span>触摸管脚#'+ pinNum +'</span>'+
            '</div>'+
            '<div class="col-sm-3 pinInput switch">'+
                '<input id="pinValue'+ pinNum +'" data-on-color="danger" type="checkbox"/>'+
                '<label class="control-label"></label>'+
            '</div>'+
            '<div class="col-sm-1 col-sm-offest-2 form-inline">'+
                '<span id="curr_pinValue'+ pinNum + '">0</span>'+
            '</div>'+
            '<div class="col-sm-2 form-inline">'+
                '<button id="btn_delPin'+ pinNum + '" class="btn_deleterow btn-default form-control">删除</button>'+
            '</div>'+
       '</div>';
       return module;
    },
    //从管脚列表中删除将要被使用的管脚号,如果没有说明这个管脚号已经被占用
    removePinfromList: function (pinNum){
        var halfSearch = function(Arr, targetNum){
            var left = 0;
            var right = Arr.length - 1;
            var mid = (left + right) /2;
            while(left <= right){
                mid = (left + right) /2
                if(Arr[mid] < targetNum){
                    left = mid + 1;
                }
                else if(Arr[mid] > targetNum){
                    right = mid - 1;
                }
                else {
                    return mid;
                }
            }
            return undefined;
        };
        var targetPinIndex = halfSearch(ui.pinList.AllpinList, pinNum);
        if(targetPinIndex){
            ui.pinList.AllpinList.splice(targetPinIndex,1);
            return true;
        }
        else{
            return false;
        }
    },
    addPinOption: function(type, pinNum = 0){
        if(!ui.removePinfromList(pinNum)){
            return; //已经存在，不能添加
        }
        if(type == 'digitalIn'){
            $('#pin_area').append(ui.pinDigitalModule(pinNum));
            var changeValue = function(thisSlider,thisSpan){
                thisSpan.text(thisSlider.bootstrapSlider('getValue'));
            }
            var Slider = $("#pinValue"+pinNum).bootstrapSlider();
            var Span = $("#curr_pinValue"+pinNum);
            Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});
            $('.pinInput>.slider').css('width','100%');
        }
        else if(type == 'digitalOut'){
            $('#pin_area').append(ui.pinDigitalModule(pinNum));
            var changeValue = function(thisSlider,thisSpan){
                thisSpan.text(thisSlider.bootstrapSlider('getValue'));
            }
            var Slider = $("#pinValue"+pinNum).bootstrapSlider();
            var Span = $("#curr_pinValue"+pinNum);
            Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});
            $('.pinInput>.slider').css('width','100%');
        }
        else if(type == 'ADC'){
            $('#pin_area').append(ui.pinAnalogModule(pinNum));
            var changeValue = function(thisSlider,thisSpan){
                thisSpan.text(thisSlider.bootstrapSlider('getValue'));
            }
            var Slider = $("#pinValue"+pinNum).bootstrapSlider();
            var Span = $("#curr_pinValue"+pinNum);
            Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});
            $('.pinInput>.slider').css('width','100%');
        }
        else if(type == 'PWM'){
            $('#pin_area').append(ui.pinAnalogModule(pinNum));
            var changeValue = function(thisSlider,thisSpan){
                thisSpan.text(thisSlider.bootstrapSlider('getValue'));
            }
            var Slider = $("#pinValue"+pinNum).bootstrapSlider();
            var Span = $("#curr_pinValue"+pinNum);
            Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});
            $('.pinInput>.slider').css('width','100%');
        }
        else if(type == 'TouchPad'){
            $('#pin_area').append(ui.pinTouchModule(pinNum));
            var Switch = $("#pinValue"+pinNum).bootstrapSwitch({
            onText: '触摸',
            offText: '离开',
            size:'Small',
            onSwitchChange: function(event,state){
                if(state==true){
                    $("#curr_pinValue"+ pinNum).text('1');
                }else{
                    $("#curr_pinValue"+ pinNum).text('0');
                }
            }
            });
        }
    },
    deletePinOption: function(rowid){
        $(rowid).remove();
    },
    getPinValue: function(pinNum){
        return parseInt($('#pinValue' + pinNum).val());
    },
    setPinValue: function(pinNum, value){
        $('#pinValue' + pinNum).val(value);
        $('#curr_pinValue' + pinNum).text(value);
    },
    //待测试
    setAnalogPinFreq: function(pinNum, freq){
        return parseInt($('#pinPeriod' + pinNum).val());
    },
    //需要修改
    bindDeletePinBtnEvent: function(id){
        $(id).on('click',function(){
            var row = $(this).parent().parent();
            var rowid = '#' + row.attr('id');
            ui.deletePinOption(rowid);
        });
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
                        console.log('click');
                        break;
                }
            }
        });
    },
    bindSliderEvent: function (sliderId, data, key, cb) {
        var id = "#" + sliderId + "_slider";
        $(id).off('slide').on('slide', function (slideEvt) {
            data[key] = slideEvt.value;
            $("#curr_" + sliderId).text(slideEvt.value);
            if (cb != undefined) {
                cb();
            }
        })
    },
    bindRadioSendMessageEvent: function (elementId, data) {
        if (!data.peer) {
            return;
        }
        var id = '#send_' + elementId + '_message';
        $(id).off('click').on('click', function () {
            if (data['buffer'].length < data['queue']) {
                data['buffer'].push("\x00\x01\x00" + $('#' + btnId + '_data').val());
                $('#' + elementId + '_data').val('');
            }
        });
    },
    bindRadioUpdateConfigEvent: function (elementId, data) {
        $('#' + elementId).off('click').on('click', function () {
            ui.updatePeerRadioParam(data);
        });
    },
    bindUartSendMessageEvent: function(elementId, data){
        var id = '#send_' + elementId + '_message';
        $(id).off('click').on('click',function(){
            if (!data.peer) {
                return;
            }
            var message = $('#'+ elementId + '_data').val().replace(/\\n/g, '\n').replace(/\\r/g, '\r');
            if((data['buffer'].length + message.length) <= 128){
                data['buffer'] = data['buffer'] + message;
            } else {
                data['buffer'] = data['buffer'] + message.slice(0, 128-data['buffer'].length);
            }
            $('#'+ elementId + '_data').val('');
        });
    },
    bindCompassEvent: function (sliderId, data, key) {
        ui.bindSliderEvent(sliderId, data, key);
    },
    bindGyroEvent: function (sliderId, data, key) {
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
    bindInfraredEvent: function (sliderId, data, key) {
        ui.bindSliderEvent(sliderId, data, key);
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
    //设置点阵中的LED
    setMatrixLED: function (x, y, brightness) {
        $('.mb_led.mb_led_row_' + y + '.mb_led_col_' + x).removeClass('mb_led_brightness_ mb_led_brightness_0 mb_led_brightness_1 mb_led_brightness_2 mb_led_brightness_3 mb_led_brightness_4 mb_led_brightness_5 mb_led_brightness_6 mb_led_brightness_7 mb_led_brightness_8 mb_led_brightness_9 mb_led_brightness_10 mb_led_brightness_11 mb_led_brightness_12 mb_led_brightness_13 mb_led_brightness_14 mb_led_brightness_15').addClass('mb_led_brightness_' + brightness);
    },
    //设置按钮上方的板载LED
    setBoardLEDonoff: function (pinNum, brightness) {
        if(brightness === 0)
            $('#mixgo_led_' + x).css('background-color','#000');
        else
            $('#mixgo_led_' + x).css('background-color','#f00');
    },
    setBoardLEDbrightness: function (pinNum, val) {
        if(typeof(val) == 'number' && val > 0){
            decval = (val / 8) + 127; //将0~1023转换成RGB(127,255)区间
            $('#mb_led_' + x).css('background-color', '#' + decval.toString(16) +'0000');
        }
        else{
            $('#mb_led_' + x).css('background-color','#000');
        }   
    },
    output: function (s) {
        console.log(s);
    },
    updateMicrobitPins: function (type, pinName, newValue) {
        var flag = false;//能不能在ui中找到对应管脚列的标志
        $('select.pinOption').each(function(){
            if($(this).val()==pinName){

                flag = true;
                var rowid = $(this).attr('id').split('select_row').join('');
                if(type ==='analog_period'){//更改管脚频率
                    $('#curr_pinPeriod'+rowid).text(newValue);
                }
                else{//更改管脚值
                    $('#curr_pinValue'+rowid).text(newValue);
                    if(type === 'digital'||'analog'){
                        $("#pinValue"+rowid).bootstrapSlider('setValue',newValue);
                    }
                    else if(type === 'touch'){
                        $("#pinValue"+ rowid).bootstrapSwitch('setState',newValue == 1);
                    }
                }
            }
        });

        if(!flag){//用户没有初始化这一列,就新增这一列
            ui.addPinOption(type.split('_')[0]);
            var newRowId = ui.pinCount.rowid;
            ui.bindDeletePinBtnEvent('#btn_row' + newRowId );
            $('#select_row'+(newRowId)).val(pinName);
            if(type ==='analog_period'){//更改管脚频率
                $('#curr_pinPeriod'+(newRowId)).text(newValue);
            }
            else{
                if(type != 'touch'){
                    $('#curr_pinValue'+(newRowId)).text(newValue);
                    $("#pinValue"+(newRowId)).bootstrapSlider('setValue',newValue);
                }
                else{
                    $('#curr_pinValue'+(newRowId)).text(newValue == 1 ? 1:0);
                    $("#pinValue"+(newRowId)).bootstrapSwitch('setState',newValue == 1);
                }
            }
        }
    },
    //更新模拟管脚的频率
    updateUIAnalogPeriod: function(name,value){
        ui.updateMicrobitPins('analog_period',name,value)
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
    updateRadioReceivedMessage: function (text) {
        var el = $('#radio_output');
        if (el.css('display') == 'none') {
            el.show();
        }
        if (!text.endsWith('\n')) {
            text += '\n';
        }
        el.text(el.text() + text);
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
    },
    showTip: function (text) {
        var el = $('#tip');
        el.text(text);
        el.show();
    },
    clearScreen: function () {
        var x,y;
        for(x = 0; x < 16; x++) {
            for(y = 0; y < 8; y++) {
                ui.setMatrixLED(x, y, 0);
            }
        }
    },
    updateSerialOutput: function(line) {
        var el = $('#print_area');
        if (el.css('display') == 'none') {
            el.show();
        }
        el.append(line);
    },
    serialInput: function(prompt){
        return new Promise((resolve, reject) => {
            $('#print_area').append('<input style= "background-color:transparent;border:0;outline:none;" id="userInput" />');
            var focusTime = 50;
            if($('#simModal').is(':visible') === false){
                focusTime = 600;
            }
            setTimeout(function(){
                $('#userInput').focus();
            }, focusTime);
            $('#userInput').keypress(function(event){
                if(event.keyCode === 13){
                    var inputText = $(this).val();
                    $('#userInput').remove();
                    $('#print_area').append(inputText + '\n');
                    resolve(inputText);
                }
            });
        });
    },
    updateSerialStatus: function (message) {
        $('#uart_status').html(message);
    },
    updatePeerSerialParam: function (data) {
        var message = '';
        if($('#uart_baudrate').val() != data.baudrate) {
            var message = "Baudrate doesn't match: currently set to " + data.baudrate;
            data.peer = false;
        } else {
            data.peer = true;
        }
        ui.updateSerialStatus(message);
    },
    bindUartBaudrateEvent: function (id, data) {
        $('#' + id).off('change').on('change', function () {
            ui.updatePeerSerialParam(data);
        })
    },
    getInfrared: function(id) {
        return $('#curr_'+id).val();
    },
}


