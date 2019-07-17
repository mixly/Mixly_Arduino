var $builtinmodule = function (name) {
	var mod = {
		_data:{
			pin: 0,
			degree: 0,
		}
	};
	var servo_write_angle = function(pin,degree){
		debugger;
		if (pin == undefined) {
                throw new Sk.builtin.TypeError("parameter pin not defined");
        }
		mod._data.pin = pin.v;
		mod._data.degree = degree.v;
		sm.servo.write_angle(pin.v, degree.v);
	}
	servo_write_angle.co_varnames = ['pin','degree'];
	servo_write_angle.$defaults = [Sk.builtin.int_(0),Sk.builtin.int_(0)];
	servo_write_angle.co_numargs = 2;
	mod.sm_servo_write_angle = new Sk.builtin.func(servo_write_angle);

	return mod;
};