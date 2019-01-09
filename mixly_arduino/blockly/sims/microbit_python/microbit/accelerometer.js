var accelerometer = function(name) {
	var mod = {}
	mod.data = {};
	mod.data.x = 0;
	mod.data.y = 0;
	mod.data.z = 0;
	mod.data.gestureHistory = [];
	mod.data.currentGesture = "";
	mod.data.updateGestureList = function updateGestureList() {
		var html = mod.data.gestureHistory.join(" ") + ' <span class="mb_current_gesture">' + mod.data.currentGesture + '</span>';
		$('#mb_gesture_list').html(html);
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
			if(mod.data.gestureHistory == gesture.v) {
				mod.data.gestureHistory.splice(i, 1);
				mod.data.updateGestureList();
				return Sk.builtin.bool(true);
			}
		}
		return new Sk.builtin.bool(false);
	});

	mod.get_gestures = new Sk.builtin.func(function() {
		var gestures = mod.data.gestureHistory.slice();
		mod.data.gestureHistory = [];
		mod.data.updateGestureList();
		return new Sk.builtin.tuple(Sk.ffi.remapToPy(gestures));
	});
	return mod;
}
