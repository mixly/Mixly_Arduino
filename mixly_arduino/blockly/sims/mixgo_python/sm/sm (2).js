//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确到两位小数
function accAdd(arg1,arg2){
    var r1=0,r2=0;
    var i1=0,i2=0;
    i1 = parseInt(arg1.toString().split(".")[0])
    if(arg1.toString().split(".")[1])
        r1 = parseInt(arg1.toString().split(".")[1].substring(0,2))
    i2 = parseInt(arg2.toString().split(".")[0])
    if(arg2.toString().split(".")[1])
        r2 = parseInt(arg2.toString().split(".")[1].substring(0,2))
    return parseFloat((i1 + i2 + (r1 + r2) / 100).toFixed(2))
}
var sm = {
    running: false,
    time: 0,
    preTime: 0,
    input: {},
    inputer: [], //修改inputer为Json对象数组
    //button: [is_pressed, presses]
    snapshot: {},
    preSnapshot: {},
    snapshotArr: [],
    lenSnapshotArr: 1,
    nextInputEventIndex: 0,
    init: function () {
        sm.running = true;
        sm.time = 0;
        sm.preTime = 0;
        sm.snapshot = {};
        sm.preSnapshot = $.extend(true, {}, sm.snapshot);
        sm.snapshotArr = [{'snapshot': $.extend(true, {}, sm.snapshot), 'ts': sm.time}];
        sm.lenSnapshotArr = 1;
        sm.nextInputEventIndex = 0;
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
    updateTime: function (time) {
        if(time > 0)
            sm.time = accAdd(sm.time, time);
        if(sm.time >= sm['taskConf'].timeout){
            smCodeProcessor.forceKillProgram();
        }
    },
    updateTimeTo: function (time) {
        if(time > 0 && time > sm.time)
            sm.time = time;
        if(sm.time >= sm['taskConf'].timeout){
            smCodeProcessor.forceKillProgram();
        }
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
    /**
     * push inputer to Array sm.inputer according its happen time
     * @param {String} name the input event name needs to be push
     * @param {String} value the input event value needs to be push
     * @param {Number} ts the occasion that this input happened
     */
    addInputer: function (name, value, ts){
        let flag = false; // Has the event been pushed?
        let prevStatus = {};// heir the status of lastest status
        for(each of sm.inputer){ //find the occusion
            if(ts === each.ts){
                each[name] = value;
                if(name === 'button_a' || name === 'button_b' || name === 'button_both'){
                    each[name + '_press_time'] = each[name + '_press_time'] ? each[name + '_press_time']++ : 1;
                }
                flag = true;
            }
            else if(each.ts < ts){
                prevStatus = each;
            }
        }
        if(!flag){ //the moment didn't in the inputer Array
            var insertObj = Object.assign({}, prevStatus);
            insertObj.ts = ts;
            insertObj[name] = value;
            insertObj[name].getTime = 0;
            if(name === 'button_a' || name === 'button_b' || name === 'button_both'){
                insertObj[name + '_press_time'] = insertObj[name + '_press_time'] ? insertObj[name + '_press_time']++ : 1
            }
            sm.inputer.push(insertObj);
        }
    },
    /**
     * push inputer that needs history record like gesture to its history list
     * @param {String} name the input event name needs to be push
     * @param {String} value the input event value needs to be push
     * @param {Number} ts the occasion that this input happened
     */
    addHistoryInputer: function (listname, value, ts){
        let flag = false; // Has the event been pushed?
        let prevStatus = {};// heir the status of lastest status
        for(each of sm.inputer){ //find the occusion
            if(ts === each.ts){
                each[listname].push(value);
                flag = true;
            }
            else if(each.ts < ts){
                prevStatus = each;
            }
        }
        if(!flag){ //the moment didn't in the inputer Array
            var insertObj = Object.assign(prevStatus, {});
            insertObj.ts = ts;
            if(!insertObj[listname]){
                insertObj[listname] = new Array();
            }     
            insertObj[listname].push(value);
            sm.inputer.push(insertObj);
        }

    },
    /**
     * get inputer from Array sm.inputer by its name and current time
     * @param {String} name the input event name needs to be push
     * @param {Number} ts the occasion that this input happened
     */
    getInputer: function(name, ts){
        for(var i = sm.nextInputEventIndex; i < sm.inputer.length; i++){
            if(sm.inputer[i].ts <= sm.time){
                sm.nextInputEventIndex = i;
            }
            else{
                break;
            }
        }
        //输入只能即时生效
        if(name === 'uart' || name === 'textInput'){
            if(sm.inputer[sm.nextInputEventIndex] && sm.inputer[sm.nextInputEventIndex].ts == ts && sm.inputer[sm.nextInputEventIndex].hasOwnProperty(name)){
                sm.inputer[sm.nextInputEventIndex][name].getTime ++;
                return sm.inputer[sm.nextInputEventIndex][name];
            }      
            else //没有相关外部输入，返回默认值为空
                return ''; 
        }
        //其他事件默认持续事件100ms,100ms内的输入视为有效。
        else{
            if(sm.inputer[sm.nextInputEventIndex] && sm.inputer[sm.nextInputEventIndex].ts <= (sm.time - 100) && sm.inputer[sm.nextInputEventIndex].hasOwnProperty(name)){
                sm.inputer[sm.nextInputEventIndex][name].getTime ++;
                return sm.inputer[sm.nextInputEventIndex][name];
            }      
            else //没有相关外部输入，返回默认值0
                return 0;  
        }
    },
     /**
     * get uart like buffer's work
     * @param {Number} ts the occasion that this input happened
     */
    getUart: function(ts){
        var buffer = '';
        for(each of sm.inputer){
            if(each && each['uart']){
                buffer += each['uart'];
                delete each['uart'];//delete after read
            }
            if(each.ts <= sm.time){
                break;
            }
        }
        return buffer;
    },
    /**
     * get all inputer in this time from Array sm.inputer current time
     * @param {Number} ts the occasion that this input happened
     */
    getAllInputer: function(name, ts){
        var prevInputEvent = null;
        for(each of sm.inputer){
            if(each.ts <= sm.time){
                prevInputEvent = each;
            }
        }
        if(prevInputEvent)
            return prevInputEvent;
        else //没有相关外部输入，返回默认值0
            return {};
    },
    /**
     * clear the history array after fetch certain action
     * @param {String} listname 
     * @param {Number} ts 
     */
    clearHistory: function(listname, ts){
        let flag = false; // Has the event been pushed?
        for(each of sm.inputer){ //find the occusion
            if(ts === each.ts){
                each[listname] = [];
                flag = true;
            }
        }
        if(!flag){ //the moment didn't in the inputer Array
            var insertObj = {
                "ts": ts
            }
            insertObj[listname] = new Array();
            sm.inputer.push(insertObj);
        }
    },
    //模拟器虚拟机接口
    //公用接口,声、光、温度、湿度可用
    public_set_value: function (name, v) {
        sm.input[name] = v;
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
            //不能给undefined添加属性
            if(!sm.snapshot['boardLED']){
                sm.snapshot['boardLED'] = {};
            }
            if(brightness === 0){
                sm.snapshot['boardLED'][ledNum] = 0;
            }
            else{
                sm.snapshot['boardLED'][ledNum] = 1024;
            }
            sm.updateSnapshot();
        },
        setBrightness: function(ledNum, brightness){
            if(!sm.snapshot['boardLED'])
                sm.snapshot['boardLED'] = {};
            if(brightness === 0){
                sm.snapshot['boardLED'][ledNum] = 0;
            }
            else if(brightness > 0 && brightness < 1024){
                sm.snapshot['boardLED'][ledNum] = brightness;
            }
            sm.updateSnapshot();
        }
    },
    button: {
        /**
         * button press api for inputer
         * @param {String} name 
         * @param {Number} ts
         * @param {Number} timeout
         */
        press: function (name, ts, timeout) {
            /**
             * new Button's inputEvent
             * @param {String} name 
             * @param {bool} value 
             */
            function newButtonInputEnvent(name, value){
                return {
                    "name": name,
                    "value": value
                }
            }
            if (name == 'button_both') {
                var inputEventA = newButtonInputEnvent('button_A', true);
                var inputEventB = newButtonInputEnvent('button_B', true);
                var inputEventA_end = newButtonInputEnvent('button_A', false);
                var inputEventB_end = newButtonInputEnvent('button_B', false);
                sm.addinputer(inputEventA, ts);
                sm.addinputer(inputEventB, ts);
                sm.addinputer(inputEventA_end, ts + timeout);
                sm.addinputer(inputEventB_end, ts + timeout);
            }
            else{
                var intputEvent = newButtonInputEnvent(name, true);
                var inputEvent_end = newButtonInputEnvent(name, false);
                sm.addinputer(inputEvent, ts);
                sm.addinputer(inputEvent_end, ts + timeout);
            }
            /*    
            for (var i = 0; i < nameArr.length; i ++){
                if(!sm.input[nameArr[i]])
                    sm.input[nameArr[i]] = {};
                //不能给undefined添加属性
                sm.input[nameArr[i]].pressed = true;
            }
            setTimeout(function () {
                for (var i = 0; i < nameArr.length; i ++){
                    sm.input[nameArr[i]].pressed = false;
                    sm.input[nameArr[i]].presses ++;
                }
                sm.time += timeout;
            }, timeout);
            */
        }
    },
    mpu: {
        set_value: function (k, v) {
            if(!sm.input['mpu']){
                sm.input['mpu'] = {};
            }
            //不能给undefined添加属性
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
            if (sm.input['accelerometer'].currentGesture != gesture) {
                sm.input['accelerometer'].currentGesture = gesture;
                sm.input['accelerometer'].gestureHistory.push(gesture);
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
        set_pitch: function (pin, v, len, wait) {
            sm.snapshot['music_pitch_' + pin] = v;
            sm.updateSnapshot();
            sm.updateTime(len);
            sm.snapshot['music_pitch_' + pin] = 0;
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
            sm.updateTime(10);
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
        data: {
            buffer: '',
        },
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
            var idx = sm.uart.data.buffer.indexOf('\r');
            if (idx != -1) {
                var inputText = sm.uart.data.buffer.substring(0, idx);
                sm.uart.data.buffer = sm.uart.data.buffer.substring(idx + 1);
            }
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
    infrared: {
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
        },
        set_minute: function(minute){
            sm.input['date']['minute'] = minute;
        },
        set_second: function(second){
            sm.input['date']['second'] = second;
        },
        set_microsecond: function(microsecond){
            sm.input['date']['microsecond'] = microsecond;
        }
    }
};

