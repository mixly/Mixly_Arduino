// 状态机
//1. 全局timestamp
//2. init status
//3. update status
//4. snapshot输出状态 不人为判断delay;更新时间间隔很小，update；很大，update


var sm = {
    time: 0,
    preTime: 0,
    programTimeout: 1000, //XXXms后杀死程序
    input: {},
    //button: [is_pressed, presses]
    snapshot: {},
    preSnapshot: {},
    snapshotArr: [],
    lenSnapshotArr: 1,
    init: function () {
        sm.time = 0;
        sm.preTime = 0;
        sm.snapshot = {'display': [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]]};
        sm.preSnapshot = $.extend(true, {}, sm.snapshot);
        sm.snapshotArr = [{'ts': sm.time, 'snapshot': $.extend(true, {}, sm.snapshot)}];
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
    set_pixel: function (x, y, brightness) {
        sm.snapshot['display'][y][x] = brightness;
        sm.updateSnapshot();
    },
    button: {
        press: function (name, timeout) {
            if (name == "button_a") {
                name = 'button_0';
            }
            if (name == "button_b") {
                name = 'button_1';
            }
            sm.input[name].pressed = true;
            setTimeout(function () {
                sm.input[name].pressed = false;
                sm.input[name].presses ++;
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
    }
}



