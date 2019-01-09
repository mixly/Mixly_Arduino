var compass = function(name) {
	var mod = {};
	mod.data = {
		calibrated: mbData.compass.calibrated,
        x: mbData.compass.x,
        y: mbData.compass.y,
        z: mbData.compass.z,
        heading: mbData.compass.heading,
        strength: mbData.compass.strength
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

	ui.bindCompassEvent('compass_heading', mod.data, 'heading');
    ui.bindCompassEvent('compass_x', mod.data, 'x');
    ui.bindCompassEvent('compass_y', mod.data, 'y');
    ui.bindCompassEvent('compass_z', mod.data, 'z');
	return mod;
};
