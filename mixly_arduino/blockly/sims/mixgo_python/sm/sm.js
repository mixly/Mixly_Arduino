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
    addSnapshotArr: function () {
        sm.snapshotArr.push({'snapshot': $.extend(true, {}, sm.snapshot), 'ts': sm.time});
        sm.lenSnapshotArr += 1;
    },
    updateStatus: function () {
        ;
    },
    display: {
        set_pixel: function (x, y, brightness) {
            if (sm.snapshot['display'] == undefined) {
                sm.snapshot['display'] = [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]];
            }
            sm.snapshot['display'][y][x] = brightness;
            sm.updateSnapshot();
        },
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
    compass: {
        set_value: function (k, v) {
            sm.input['compass'][k] = v;
        },
        set_x: function (v) {
            sm.compass.set_value('x', v);
        },
        set_y: function (v) {
            sm.compass.set_value('y', v);
        },
        set_z: function (v) {
            sm.compass.set_value('z', v);
        },
        set_heading: function (v) {
            sm.compass.set_value('heading', v);
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
            sm.input['temperature']['temperature'] = x;
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
        set_gesture: function (gesture) {
            if (sm.input['accelerometer'].currentGesture != gesture) {
                sm.input['accelerometer'].currentGesture = gesture;
                sm.input['accelerometer'].gestureHistory.push(gesture);
            }
        }
    },
    music: {
        set_pitch: function (pin, v) {
            sm.snapshot['music_pitch_' + pin.name] = v;
            sm.updateSnapshot();
        }
    },
    neopixel: {
        set_leds: function (pin, leds) {
            sm.snapshot['neopixel_' + pin.name] = leds;
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
    }

}



