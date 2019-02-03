var accelerometer = function(name) {
	var mod = {}
	mod.data = {};
	mod.data.x = mbData.accelerometer.x;
	mod.data.y = mbData.accelerometer.y;
	mod.data.z = mbData.accelerometer.z;
	mod.data.gestureHistory = mbData.accelerometer.gestureHistory;
	mod.data.currentGesture = mbData.accelerometer.currentGesture;

    var MICROBIT_ACCELEROMETER_TILT_TOLERANCE = 200;
    var MICROBIT_ACCELEROMETER_FREEFALL_TOLERANCE = 400;
    var MICROBIT_ACCELEROMETER_FREEFALL_THRESHOLD = MICROBIT_ACCELEROMETER_FREEFALL_TOLERANCE ** 2;
    var MICROBIT_ACCELEROMETER_3G_TOLERANCE = 3072;
    var MICROBIT_ACCELEROMETER_3G_THRESHOLD = MICROBIT_ACCELEROMETER_3G_TOLERANCE ** 2;
    var MICROBIT_ACCELEROMETER_6G_TOLERANCE = 6144;
    var MICROBIT_ACCELEROMETER_6G_THRESHOLD = MICROBIT_ACCELEROMETER_6G_TOLERANCE ** 2;
    var MICROBIT_ACCELEROMETER_8G_TOLERANCE = 8192;
    var MICROBIT_ACCELEROMETER_8G_THRESHOLD = MICROBIT_ACCELEROMETER_8G_TOLERANCE ** 2;
    var MICROBIT_ACCELEROMETER_SHAKE_THRESHOLD = 400;
    var MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD = 4;
    var MICROBIT_ACCELEROMETER_SHAKE_RTX = 30;
    var MICROBIT_ACCELEROMETER_SHAKE_DAMPING = 10;
    var MICROBIT_ACCELEROMETER_EVT_TILT_LEFT = 'left';
    var MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT = 'right';
    var MICROBIT_ACCELEROMETER_EVT_TILT_UP = 'up';
    var MICROBIT_ACCELEROMETER_EVT_TILT_DOWN = 'down';
    var MICROBIT_ACCELEROMETER_EVT_FACE_DOWN = 'face down';
    var MICROBIT_ACCELEROMETER_EVT_FACE_UP = 'face up';
    var MICROBIT_ACCELEROMETER_EVT_FREEFALL = 'freefall';
    var MICROBIT_ACCELEROMETER_EVT_3G = '3g';
    var MICROBIT_ACCELEROMETER_EVT_6G = '6g';
    var MICROBIT_ACCELEROMETER_EVT_8G = '8g';
    var MICROBIT_ACCELEROMETER_EVT_SHAKE = 'shake';
    var MICROBIT_ACCELEROMETER_EVT_NONE = '';

    var shake = {
    	x: 0,
        y: 0,
        z: 0,
        count: 0,
        timer: 0,
		shaken: 1
	};

	function instantaneousAccelerationSquared () {
		return mod.data.x ** 2 + mod.data.y ** 2 + mod.data.z ** 2;
	}

	function detectGesture () {
		var forth = instantaneousAccelerationSquared();
		var x = mod.data.x, y = mod.data.y, z = mod.data.z;
		var shakeDetected = false;
		//detect 3g, 6g, 8g
		if (forth > MICROBIT_ACCELEROMETER_3G_THRESHOLD) {
			if (forth > MICROBIT_ACCELEROMETER_3G_THRESHOLD) {
				return MICROBIT_ACCELEROMETER_EVT_3G;
			}
            if (forth > MICROBIT_ACCELEROMETER_6G_THRESHOLD) {
                return MICROBIT_ACCELEROMETER_EVT_6G;
            }
            if (forth > MICROBIT_ACCELEROMETER_8G_THRESHOLD) {
                return MICROBIT_ACCELEROMETER_EVT_8G;
            }
		}

        //detect shake
		if ((x < -MICROBIT_ACCELEROMETER_SHAKE_THRESHOLD && shake.x)
			|| (x > MICROBIT_ACCELEROMETER_SHAKE_THRESHOLD && !shake.x)) {
			shakeDetected = true;
			shake.x = !shake.x;
		}
		if ((y < -MICROBIT_ACCELEROMETER_SHAKE_THRESHOLD && shake.y)
			|| (y > MICROBIT_ACCELEROMETER_SHAKE_THRESHOLD && !shake.y)) {
			shakeDetected = true;
			shake.y = !shake.y;
		}
        if ((z < -MICROBIT_ACCELEROMETER_SHAKE_THRESHOLD && shake.z)
            || (z > MICROBIT_ACCELEROMETER_SHAKE_THRESHOLD && !shake.z)) {
            shakeDetected = true;
            shake.z = !shake.z;
        }
        if (shakeDetected && shake.count < MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD) {
		    shake.count ++;
		    if (shake.count == 1) {
		    	shake.timer = 0;
			}
			if (shake.count == MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD) {
				shake.shaken = 1;
				shake.timer = 0;
				return MICROBIT_ACCELEROMETER_EVT_SHAKE;
			}
		}
		if (shake.count > 0) {
			shake.timer ++;
			if (shake.shaken && shake.timer >= MICROBIT_ACCELEROMETER_SHAKE_RTX) {
				shake.shake = 0;
				shake.timer = 0;
				shake.count = 0;
			} else if (!shake.shaken && shake.timer >= MICROBIT_ACCELEROMETER_SHAKE_DAMPING) {
				shake.timer = 0;
				if (shake.count > 0) {
					shake.count --;
				}
			}
		}
		if (forth < MICROBIT_ACCELEROMETER_FREEFALL_THRESHOLD) {
			return MICROBIT_ACCELEROMETER_EVT_FREEFALL;
		}
		if (x < (-1000 + MICROBIT_ACCELEROMETER_TILT_TOLERANCE)) {
			return MICROBIT_ACCELEROMETER_EVT_TILT_LEFT;
		}
		if (x > (1000 - MICROBIT_ACCELEROMETER_TILT_TOLERANCE)) {
            return MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT;
		}
		if (y < (-1000 + MICROBIT_ACCELEROMETER_TILT_TOLERANCE)) {
			return MICROBIT_ACCELEROMETER_EVT_TILT_DOWN;
		}
		if (y > (1000 - MICROBIT_ACCELEROMETER_TILT_TOLERANCE)) {
            return MICROBIT_ACCELEROMETER_EVT_TILT_UP;
		}
		if (z < (-1000 + MICROBIT_ACCELEROMETER_TILT_TOLERANCE)) {
			return MICROBIT_ACCELEROMETER_EVT_FACE_UP;
		}
		if (z > (1000 - MICROBIT_ACCELEROMETER_TILT_TOLERANCE)) {
            return MICROBIT_ACCELEROMETER_EVT_FACE_DOWN;
		}

		return MICROBIT_ACCELEROMETER_EVT_NONE;
	}

	function updateGesture () {
	    var currGesture = detectGesture();
	    if (currGesture != mod.data.currentGesture) {
            mod.data.gestureHistory.push(currGesture);
            mod.data.currentGesture = currGesture;
            ui.updateAccelerometerBtn(currGesture);
        }
	}

	mod.get_x = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.x);
	});

	mod.get_y = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.y);
	});

	mod.get_z = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.z);
	});

	mod.get_values = new Sk.builtin.func(function() {
		return new Sk.builtin.tuple([mod.data.x, mod.data.y, mod.data.z]);
	});

	mod.current_gesture = new Sk.builtin.func(function() {
		return new Sk.builtin.str(mod.data.currentGesture);
	});

	mod.is_gesture = new Sk.builtin.func(function(gesture) {
		return new Sk.builtin.bool(gesture.v == mod.data.currentGesture);
	});

	mod.was_gesture = new Sk.builtin.func(function(gesture) {
		for(var i = 0; i < mod.data.gestureHistory.length; i++) {
			if(mod.data.gestureHistory[i] == gesture.v) {
				mod.data.gestureHistory.splice(i, 1);
				return Sk.builtin.bool(true);
			}
		}
		return new Sk.builtin.bool(false);
	});

	mod.get_gestures = new Sk.builtin.func(function() {
		var gestures = mod.data.gestureHistory.slice();
		mod.data.gestureHistory = [];
		return new Sk.builtin.tuple(Sk.ffi.remapToPy(gestures));
	});

	ui.bindAccelerometerEvent('accelerometer_x', mod.data, 'x', updateGesture);
    ui.bindAccelerometerEvent('accelerometer_y', mod.data, 'y', updateGesture);
    ui.bindAccelerometerEvent('accelerometer_z', mod.data, 'z', updateGesture);
    ui.bindAccelerometerGestureEvent('shake', mod.data, 'shake');
    ui.bindAccelerometerGestureEvent('up', mod.data, 'up');
    ui.bindAccelerometerGestureEvent('down', mod.data, 'down');
    ui.bindAccelerometerGestureEvent('left', mod.data, 'left');
    ui.bindAccelerometerGestureEvent('right', mod.data, 'right');
    ui.bindAccelerometerGestureEvent('faceup', mod.data, 'face up');
    ui.bindAccelerometerGestureEvent('facedown', mod.data, 'face down');
    ui.bindAccelerometerGestureEvent('freefall', mod.data, 'freefall');
    ui.bindAccelerometerGestureEvent('3g', mod.data, '3g');
    ui.bindAccelerometerGestureEvent('6g', mod.data, '6g');
    ui.bindAccelerometerGestureEvent('8g', mod.data, '8g');
	return mod;
}
