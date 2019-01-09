var compass = function(name) {
	var mod = {};
	mod.data = {calibrated: false,
				x: 1,
				y: 0,
				z: 0,
				heading: 0,
				strength: 0
				};

	mod.calibrate = new Sk.builtin.func(function() {
		mod.data.calibrated = true;
	});

	mod.is_calibrated = new Sk.builtin.func(function() {
		return new Sk.builtin.bool(mod.data.calibrated);
	});

	mod.clear_calibration = new Sk.builtin.func(function() {
		mod.data.calibrated = false;
	});

	mod.get_x = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.x);
	});

	mod.get_y = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.y);
	});

	mod.get_z = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.z);
	});

	mod.heading = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.heading);
	});

	mod.get_field_strength = new Sk.builtin.func(function() {
		return new Sk.builtin.int_(mod.data.strength);
	});

	return mod;
};
