'use strict';

var ui = {
    inited: false,
    pinCount : {
            digital: [5,6,7,8,9,11,12,13,14,15,16,19,20],
            analog: [3,4,10],
            touch: [0,1,2],
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
    pinDigitalModule: function(){
        var module = '<div class="row form-line" id="row'+ ui.pinCount.rowid + '" pintype="digital" style="padding-top:7px;">'+
            '<label class="col-sm-2 control-label">数字管脚#</label>'+
            '<div class="col-sm-2">'+
                '<select id="select_row'+ ui.pinCount.rowid +'" class="pinOption form-control">'+
                    '<option value="5">5</option>'+
                    '<option value="6">6</option>'+
                    '<option value="7">7</option>'+
                    '<option value="8">8</option>'+
                    '<option value="9">9</option>'+
                    '<option value="11">11</option>'+
                    '<option value="12">12</option>'+
                    '<option value="13">13</option>'+
                    '<option value="14">14</option>'+
                    '<option value="15">15</option>'+
                    '<option value="16">16</option>'+
                    '<option value="19">19</option>'+
                    '<option value="20">20</option>'+
                '</select>'+
            '</div>'+
            '<div class="col-sm-3 pinInput form-inline">'+
                '<input id="pinValue'+ ui.pinCount.rowid +'" class="form-control" type="text" data-provide="slider" data-slider-min="0" data-slider-max="1" data-slider-step="1" data-slider-value="0"/>'+
                '<label class="control-label"></label>'+
            '</div>'+
            '<div class="col-sm-1 col-sm-offest-2 form-inline">'+
                '<span id="curr_pinValue'+ ui.pinCount.rowid + '">0</span>'+
            '</div>'+
            '<div class="col-sm-2 col-sm-offest-2 form-inline">'+
                '<button id="btn_row'+ ui.pinCount.rowid + '" class="btn_deleterow btn-default form-control">删除</button>'+
            '</div>'+
       '</div>';
       return module;
    },
    pinAnalogModule: function(){
        var module = '<div class="row form-line" id="row'+ ui.pinCount.rowid + '" pintype="analog" style="padding-top:7px;">'+
            '<label class="col-sm-2 control-label">模拟管脚#</label>'+
            '<div class="col-sm-2">'+
                '<select id="select_row'+ ui.pinCount.rowid +'" class="pinOption form-control">'+
                    '<option value="3">3</option>'+
                    '<option value="4">4</option>'+
                    '<option value="10">10</option>'+
                '</select>'+
            '</div>'+
            '<div class="col-sm-3 pinInput form-inline">'+
                '<input id="pinValue'+ ui.pinCount.rowid +'" class="form-control" type="text" data-provide="slider" data-slider-min="0" data-slider-max="1024" data-slider-step="1"/>'+
                '<label class="control-label"></label>'+
            '</div>'+
            '<div class="col-sm-1 col-sm-offest-1 form-inline">'+
                '<span id="curr_pinValue'+ ui.pinCount.rowid + '">0</span>'+
            '</div>'+
            '<div class="col-sm-2 form-inline">'+
                '<span>频率：</span>'+
                '<span id="curr_pinPeriod'+ ui.pinCount.rowid + '">35</span>'+
            '</div>'+
            '<div class="col-sm-2 col-sm-offest-2 form-inline">'+
                '<button id="btn_row'+ ui.pinCount.rowid + '" class="btn_deleterow btn-default form-control">删除</button>'+
            '</div>'+
       '</div>';
       return module;
    },
    pinTouchModule: function(){
        var module = '<div class="row form-line" id="row'+ ui.pinCount.rowid + '" pintype="touch" style="padding-top:7px;">'+
            '<label class="col-sm-2 control-label">触摸管脚#</label>'+
            '<div class="col-sm-2">'+
                '<select id="select_row'+ ui.pinCount.rowid +'" class="pinOption form-control">'+
                    '<option value="0">0</option>'+
                    '<option value="1">1</option>'+
                    '<option value="2">2</option>'+
                '</select>'+
            '</div>'+
            '<div class="col-sm-3 pinInput switch">'+
                '<input id="pinValue'+ ui.pinCount.rowid +'" data-on-color="danger" type="checkbox"/>'+
                '<label class="control-label"></label>'+
            '</div>'+
            '<div class="col-sm-1 col-sm-offest-2 form-inline">'+
                '<span id="curr_pinValue'+ ui.pinCount.rowid + '">0</span>'+
            '</div>'+
            '<div class="col-sm-2 form-inline">'+
                '<button id="btn_row'+ ui.pinCount.rowid + '" class="btn_deleterow btn-default form-control">删除</button>'+
            '</div>'+
       '</div>';
       return module;
    },
    //需要改进：能够使得管脚号不重复
    addPinOption: function(type, pinNum = 0){
        if(type == 'digital'){
            ui.pinCount.rowid++;
            var thisRowId = ui.pinCount.rowid;
            $('#pin_area').append(ui.pinDigitalModule());
            var changeValue = function(thisSlider,thisSpan){
                thisSpan.text(thisSlider.bootstrapSlider('getValue'));
            }
            var Slider = $("#pinValue"+thisRowId).bootstrapSlider();
            var Span = $("#curr_pinValue"+thisRowId);
            Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});
            $('.pinInput>.slider').css('width','100%');
        }
        if(type == 'analog'){
            ui.pinCount.rowid++;
            var thisRowId = ui.pinCount.rowid;
            $('#pin_area').append(ui.pinAnalogModule());
            var changeValue = function(thisSlider,thisSpan){
                thisSpan.text(thisSlider.bootstrapSlider('getValue'));
            }
            var Slider = $("#pinValue"+thisRowId).bootstrapSlider();
            var Span = $("#curr_pinValue"+thisRowId);
            Slider.bootstrapSlider().on('change',function(){changeValue(Slider,Span);});
            $('.pinInput>.slider').css('width','100%');       
        }
        if(type == 'touch'){
            ui.pinCount.rowid++;
            $('#pin_area').append(ui.pinTouchModule());
            var thisRowId = ui.pinCount.rowid;
            var Switch = $("#pinValue"+thisRowId).bootstrapSwitch({
            onText: '触摸',
            offText: '离开',
            size:'Small',
            onSwitchChange: function(event,state){        
                if(state==true){
                    $("#curr_pinValue"+ thisRowId).text('1'); 
                }else{
                    $("#curr_pinValue"+ thisRowId).text('0'); 
                }
            }
            });                 
        }
    },
    deletePinOption: function(rowid){
        $(rowid).remove();
    },
    bindAddPinBtnEvent: function(btn_type){
        $('#add_'+ btn_type + '_pin').unbind('click').on('click',function(){
            ui.addPinOption(btn_type);
            console.log(btn_type,(ui.pinCount.rowid - 1));
            ui.bindDeletePinBtnEvent('#btn_row' + (ui.pinCount.rowid - 1));
        });
    },
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
        for(x = 0; x < 5; x++) {
            for(y = 0; y < 5; y++) {
                ui.setLED(x, y, 0);
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
    }
}


