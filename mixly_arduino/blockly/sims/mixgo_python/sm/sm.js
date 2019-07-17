var sm = {
    time: 0,
    preTime: 0,
    input: {},
    //button: [is_pressed, presses]
    snapshot: {},
    preSnapshot: {},
    snapshotArr: [],
    lenSnapshotArr: 1,
    init: function () {
        sm.time = 0;
        sm.preTime = 0;
        sm.snapshot = {};
        sm.preSnapshot = $.extend(true, {}, sm.snapshot);
        sm.snapshotArr = [{'snapshot': $.extend(true, {}, sm.snapshot), 'ts': sm.time}];
        sm.lenSnapshotArr = 1;
    },
    getSnapshotArr: function () {
        var newSnapshotArr = [];
        for(var i = 0; i < sm.lenSnapshotArr; i ++) {
            if (i > 0 && eq(sm.snapshotArr[i]['snapshot'], sm.snapshotArr[i - 1]['snapshot'])) {
                continue;
            }
            newSnapshotArr.push(JSON.stringify(sm.snapshotArr[i]));
        }
        console.log(newSnapshotArr);
        return newSnapshotArr;
    },
    updateSnapshot: function () {
        if (eq(sm.preSnapshot, sm.snapshot)) {
            return;
        }
        if (sm.time == sm.preTime && sm.snapshotArr != []) {
            sm.preSnapshot = $.extend(true, {}, sm.snapshot);
            sm.snapshotArr[sm.lenSnapshotArr - 1]['snapshot'] = $.extend(true, {}, sm.snapshot);
            return;
        }
        sm.addSnapshotArr(sm.snapshot);
        sm.preSnapshot = $.extend(true, {}, sm.snapshot);
        sm.preTime = sm.time;
    },
    //ugly hack,强制提交
    forceUpdateSnapshot: function () {
        if (sm.time == sm.preTime && sm.snapshotArr != []) {
            sm.preSnapshot = $.extend(true, {}, sm.snapshot);
            sm.snapshotArr[sm.lenSnapshotArr - 1]['snapshot'] = $.extend(true, {}, sm.snapshot);
            return;
        }
        sm.addSnapshotArr(sm.snapshot);
        sm.preSnapshot = $.extend(true, {}, sm.snapshot);
        sm.preTime = sm.time;
    },
    addSnapshotArr: function () {
        sm.snapshotArr.push({'snapshot': $.extend(true, {}, sm.snapshot), 'ts': sm.time});
        sm.lenSnapshotArr += 1;
    },
    updateStatus: function () {
        return ;
    },
    display: {
        set_pixel: function (x, y, brightness) {
            if (sm.snapshot['display'] == undefined) {
                sm.snapshot['display'] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            }
            sm.snapshot['display'][y][x] = brightness;
        },
        get_pixel: function(x,y){
        	return sm.snapshot['display'][y][x];
        }
    },
    pin: {

    },
    boardLED:{
        setOnOff: function(ledNum, brightness){
            if(brightness === 0){
                sm.snapshot['boardLED'][ledNum] = 0;
            }
            else{
                sm.snapshot['boardLED'][ledNum] = 1024;
            }
            sm.updateSnapshot();
        },
        setBrightness: function(ledNum, val){
            if(brightness === 0){
                sm.snapshot['boardLED'][ledNum] = 0;
            }
            else if(brightness > 0 && brightness < 1024){
                sm.snapshot['boardLED'][ledNum] = val;
            }
            sm.updateSnapshot();
        }
    },
    button: {
        press: function (name, timeout) {
            var nameArr = [];
            if (name == "button_a") {
                nameArr = ['button_0'];
            }
            if (name == "button_b") {
                nameArr = ['button_1'];
            }
            if (name == 'button_both') {
                nameArr = ['button_0', 'button_1'];
            }
            for (var i = 0; i < nameArr.length; i ++){
                sm.input[nameArr[i]].pressed = true;
            }
            setTimeout(function () {
                for (var i = 0; i < nameArr.length; i ++){
                    sm.input[nameArr[i]].pressed = false;
                    sm.input[nameArr[i]].presses ++;
                }
                sm.time += timeout;
            }, timeout);
        }
    },
    mpu: {
        set_value: function (k, v) {
            sm.input['mpu'][k] = v;
        },
        set_x: function (v) {
            sm.mpu.set_value('x', v);
        },
        set_y: function (v) {
            sm.mpu.set_value('y', v);
        },
        set_z: function (v) {
            sm.mpu.set_value('z', v);
        },
        set_magnetic_x:function (v) {
            sm.mpu.set_value('magnetic_x', v);
        },
        set_magnetic_y:function (v) {
            sm.mpu.set_value('magnetic_y', v);
        },
        set_magnetic_z:function (v) {
            sm.mpu.set_value('magnetic_z', v);
        },
        set_gyro_x:function (v) {
            sm.mpu.set_value('gyro_x', v);
        },
        set_gyro_y:function (v) {
            sm.mpu.set_value('gyro_y', v);
        },
        set_gyro_z:function (v) {
            sm.mpu.set_value('gyro_z', v);
        },
        set_heading: function (v) {
            sm.mpu.set_value('heading', v);
        },
        set_field_strength: function (v) {
            sm.mpu.set_value('field_strength', v);
        },
        set_gesture: function (gesture) {
            if (sm.input['mpu'].currentGesture != gesture) {
                sm.input['mpu'].currentGesture = gesture;
                sm.input['mpu'].gestureHistory.push(gesture);
            }
        }
    },
    servo: {
        write_angle: function (pin, v) {
            sm.snapshot['servo_' + pin] = v;
            sm.updateSnapshot();
        }
    },
    temperature: {
        set_value: function (x) {
            sm.input['temperature'] = x;
        }
    },
    sonar: {
        set_value: function (v) {
            sm.input['distance']['distance'] = v;
        }
    },
    accelerometer: {
        set_value: function (k, v) {
            sm.input['accelerometer'][k] = v;
        },
        set_x: function (v) {
            sm.accelerometer.set_value('x', v);
        },
        set_y: function (v) {
            sm.accelerometer.set_value('y', v);
        },
        set_z: function (v) {
            sm.accelerometer.set_value('z', v);
        },
        
    },
    music: {
        set_pitch: function (pin, v) {
            sm.snapshot['music_pitch_' + pin] = v;
            sm.updateSnapshot();
        }
    },
    neopixel: {
        set_leds: function (pin, leds) {
            sm.snapshot['neopixel_' + pin] = leds;
            sm.updateSnapshot();
        }
    },
    speech: {
        set_value: function (speechType, speech, pitch, speed, mouth, throat) {
            if (sm.snapshot['speech'] == undefined) {
                sm.snapshot['speech'] = {};
            }
            sm.snapshot['speech'][speechType] = [speech, pitch, speed, mouth, throat];
            sm.updateSnapshot();
            sm.time += 10;
            delete sm.snapshot['speech'][speechType];
            sm.updateSnapshot();
        },
        say: function (speech, pitch, speed, mouth, throat) {
            sm.speech.set_value('say', speech, pitch, speed, mouth, throat);
        },
        pronounce: function (speech, pitch, speed, mouth, throat) {
            sm.speech.set_value('pronounce', speech, pitch, speed, mouth, throat);
        },
        sing: function (speech, pitch, speed, mouth, throat) {
            sm.speech.set_value('sing', speech, pitch, speed, mouth, throat);
        }
    },
    uart: {
        peer: {
            baudrate: mbData.uart.baudrate
        },
        //self write
        write: function (message) {
            if (sm.time != sm.preTime || sm.snapshot['uart'] == undefined) {
                sm.snapshot['uart'] = '';
            }
            sm.snapshot['uart'] += message;
            sm.updateSnapshot();
        },
        input: function (prompt) {
            return new Promise((resolve, reject) => {
                var itl = setInterval(function () {
                    var idx = sm.uart.data.buffer.indexOf('\r');
                    if (idx != -1) {
                        clearInterval(itl);
                        var inputText = sm.uart.data.buffer.substring(0, idx);
                        sm.uart.data.buffer = sm.uart.data.buffer.substring(idx + 1);
                        resolve(inputText);
                        return;
                    }
                    sm.time += 10;
                }, 10);
            });
        },
        //peer write
        send: function (message) {
            var data = sm.uart.data;
            if((data['buffer'].length + message.length) <= 128){
                data['buffer'] = data['buffer'] + message;
            } else {
                data['buffer'] = data['buffer'] + message.slice(0, 128-data['buffer'].length);
            }
        },
        changeBaudrate: function (baudrate) {
            sm.peer.baudrate = baudrate;
        }
    },
    bmp280: {
    	set_BMP_temperature: function(k,v){
  			sm.input['temperature'] = v;
    	},
    },
    dhtx: {
    	set_dhtx_temperature: function(v){
  			sm.input['temperature'] = v;
    	},
    	set_dhtx_humdity: function(k,v){
  			sm.input['humdity'] = v;
    	}
    },
    Infrared: {
        set_value: function (lr, v) {
            sm.input['Infrared'][lr] = v;
        }
    },
    rtc: {
        set_date: function(year, month, day, dayinweek, hour, minute, second, microsecond){
            this.set_year(year);
            this.set_month(month);
            this.set_day(day);
            this.set_dayinweek(dayinweek);
            this.set_hour(hour);
            this.set_minute(minute);
            this.set_second(second);
            this.set_microsecond(microsecond);
        },
        set_year: function(year){
            sm.input['date']['year'] = year;
        },
        set_month: function(month){
            sm.input['date']['month'] = month;
        },
        set_day: function(day){
            sm.input['date']['day'] = day;
        },
        set_dayinweek: function(dayinweek){
            sm.input['date']['dayinweek'] = dayinweek;
        },
        set_hour: function(hour){
            sm.input['date']['hour'] = hour;
        }，
        set_minute: function(minute){
            sm.input['date']['minute'] = minute;
        },
        set_second: function(second){
            sm.input['date']['second'] = second;
        },
        set_microsecond: function(microsecond){
            sm.input['date']['microsecond'] = microsecond;
        }
    },
    //公用接口,声、光、温度、湿度可用
    public_set_value: function (name, v) {
        sm.input[name] = v;
    }
}



