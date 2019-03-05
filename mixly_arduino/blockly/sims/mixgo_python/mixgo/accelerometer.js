var mpu = function(name) {
	var mod = {}
	mod.data = {};
	mod.data.x = mbData.mpu9250.x;
	mod.data.y = mbData.mpu9250.y;
	mod.data.z = mbData.mpu9250.z;
	mod.data.gestureHistory = mbData.mpu9250.gestureHistory;
	mod.data.currentGesture = mbData.mpu9250.currentGesture;
	mod.data.gyro_x = mbData.mpu9250.gyro_x;
	mod.data.gyro_y = mbData.mpu9250.gyro_y;
	mod.data.gyro_z = mbData.mpu9250.gyro_z;
	mod.data.temperature = mbData.temperature;

    var MPU9250_TILT_TOLERANCE = 200;
    var MPU9250_FREEFALL_TOLERANCE = 400;
    var MPU9250_FREEFALL_THRESHOLD = MPU9250_FREEFALL_TOLERANCE ** 2;
    var MPU9250_3G_TOLERANCE = 3072;
    var MPU9250_3G_THRESHOLD = MPU9250_3G_TOLERANCE ** 2;
    var MPU9250_6G_TOLERANCE = 6144;
    var MPU9250_6G_THRESHOLD = MPU9250_6G_TOLERANCE ** 2;
    var MPU9250_8G_TOLERANCE = 8192;
    var MPU9250_8G_THRESHOLD = MPU9250_8G_TOLERANCE ** 2;
    var MPU9250_SHAKE_THRESHOLD = 400;
    var MPU9250_SHAKE_COUNT_THRESHOLD = 4;
    var MPU9250_SHAKE_RTX = 30;
    var MPU9250_SHAKE_DAMPING = 10;
    var MPU9250_EVT_TILT_LEFT = 'left';
    var MPU9250_EVT_TILT_RIGHT = 'right';
    var MPU9250_EVT_TILT_UP = 'up';
    var MPU9250_EVT_TILT_DOWN = 'down';
    var MPU9250_EVT_FACE_DOWN = 'face down';
    var MPU9250_EVT_FACE_UP = 'face up';
    var MPU9250_EVT_FREEFALL = 'freefall';
    var MPU9250_EVT_3G = '3g';
    var MPU9250_EVT_6G = '6g';
    var MPU9250_EVT_8G = '8g';
    var MPU9250_EVT_SHAKE = 'shake';
    var MPU9250_EVT_NONE = '';

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
		if (forth > MPU9250_3G_THRESHOLD) {
			if (forth > MPU9250_3G_THRESHOLD) {
				return MPU9250_EVT_3G;
			}
            if (forth > MPU9250_6G_THRESHOLD) {
                return MPU9250_EVT_6G;
            }
            if (forth > MPU9250_8G_THRESHOLD) {
                return MPU9250_EVT_8G;
            }
		}

        //detect shake
		if ((x < -MPU9250_SHAKE_THRESHOLD && shake.x)
			|| (x > MPU9250_SHAKE_THRESHOLD && !shake.x)) {
			shakeDetected = true;
			shake.x = !shake.x;
		}
		if ((y < -MPU9250_SHAKE_THRESHOLD && shake.y)
			|| (y > MPU9250_SHAKE_THRESHOLD && !shake.y)) {
			shakeDetected = true;
			shake.y = !shake.y;
		}
        if ((z < -MPU9250_SHAKE_THRESHOLD && shake.z)
            || (z > MPU9250_SHAKE_THRESHOLD && !shake.z)) {
            shakeDetected = true;
            shake.z = !shake.z;
        }
        if (shakeDetected && shake.count < MPU9250_SHAKE_COUNT_THRESHOLD) {
		    shake.count ++;
		    if (shake.count == 1) {
		    	shake.timer = 0;
			}
			if (shake.count == MPU9250_SHAKE_COUNT_THRESHOLD) {
				shake.shaken = 1;
				shake.timer = 0;
				return MPU9250_EVT_SHAKE;
			}
		}
		if (shake.count > 0) {
			shake.timer ++;
			if (shake.shaken && shake.timer >= MPU9250_SHAKE_RTX) {
				shake.shake = 0;
				shake.timer = 0;
				shake.count = 0;
			} else if (!shake.shaken && shake.timer >= MPU9250_SHAKE_DAMPING) {
				shake.timer = 0;
				if (shake.count > 0) {
					shake.count --;
				}
			}
		}
		if (forth < MPU9250_FREEFALL_THRESHOLD) {
			return MPU9250_EVT_FREEFALL;
		}
		if (x < (-1000 + MPU9250_TILT_TOLERANCE)) {
			return MPU9250_EVT_TILT_LEFT;
		}
		if (x > (1000 - MPU9250_TILT_TOLERANCE)) {
            return MPU9250_EVT_TILT_RIGHT;
		}
		if (y < (-1000 + MPU9250_TILT_TOLERANCE)) {
			return MPU9250_EVT_TILT_DOWN;
		}
		if (y > (1000 - MPU9250_TILT_TOLERANCE)) {
            return MPU9250_EVT_TILT_UP;
		}
		if (z < (-1000 + MPU9250_TILT_TOLERANCE)) {
			return MPU9250_EVT_FACE_UP;
		}
		if (z > (1000 - MPU9250_TILT_TOLERANCE)) {
            return MPU9250_EVT_FACE_DOWN;
		}

		return MPU9250_EVT_NONE;
	}

	function updateGesture () {
	    var currGesture = detectGesture();
	    if (currGesture != mod.data.currentGesture) {
            mod.data.gestureHistory.push(currGesture);
            mod.data.currentGesture = currGesture;
            ui.updateAccelerometerBtn(currGesture);
        }
	}

	mod.mpu9250_get_x = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.x);
	});

	mod.mpu9250_get_y = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.y);
	});

	mod.mpu9250_get_z = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.z);
	});

	mod.get_values = new Sk.builtin.func(function() {
		return new Sk.builtin.tuple([mod.data.x, mod.data.y, mod.data.z]);
	});

	mod.current_gesture = new Sk.builtin.func(function() {
		return new Sk.builtin.str(mod.data.currentGesture);
	});

	mod.mpu9250_is_gesture = new Sk.builtin.func(function(gesture) {
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
	mod.mpu9250_gyro_x = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.gyro_x);
	});
	mod.mpu9250_gyro_y = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.gyro_y);
	});
	mod.mpu9250_gyro_z = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.gyro_z);
	});
	mod.mpu9250_gyro_values = new Sk.builtin.func(function() {
		var strength = parseInt(Math.sqrt(mod.data.gyro_x ** 2 + mod.data.gyro_y ** 2 + mod.data.gyro_z ** 2));
		return new Sk.builtin.int_(strength);
	});
	mod.mpu9250_get_temperature = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(strength);
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
    ui.bindGyroEvent('mpu9250_gyro_x', mod.data, 'gyro_x');
    ui.bindGyroEvent('mpu9250_gyro_y', mod.data, 'gyro_y');
    ui.bindGyroEvent('mpu9250_gyro_z', mod.data, 'gyro_z');
	return mod;
}
