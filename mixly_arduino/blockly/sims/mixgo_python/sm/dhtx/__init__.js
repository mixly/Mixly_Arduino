var $builtinmodule = function (name) {
	var mod = {
		_data: {
			temperature: mbData['temperature'],
			humidity: mbData['humidity'],
		}
	};
	var get_dht_relative_humidity = function(type,pin) {
		mod._data.humidity = mbData['humidity'];
        return new Sk.builtin.int_(mod._data.humidity);
    };
    get_dht_relative_humidity.co_varnames = ['type', 'pin'];
	get_dht_relative_humidity.$defaults = [Sk.builtin.str('dht11'), Sk.builtin.int_(0)];
	get_dht_relative_humidity.co_numargs = 2;
	mod.get_dht_relative_humidity = new Sk.builtin.func(get_dht_relative_humidity);

	var get_dht_temperature = function(type,pin) {
		mod._data.temperature = mbData['temperature'];
        return new Sk.builtin.int_(mod._data.temperature);
    };
    get_dht_temperature.co_varnames = ['type', 'pin'];
	get_dht_temperature.$defaults = [Sk.builtin.str('dht11'), Sk.builtin.int_(0)];
	get_dht_temperature.co_numargs = 2;
	mod.get_dht_temperature = new Sk.builtin.func(get_dht_temperature);
	console.log(mod.get_dht_temperature.func_code.apply);

	var get_dht_tempandhum = function(type,pin) {
        return new Sk.builtin.int_(mod._data.humidity);
    };
    get_dht_tempandhum.co_varnames = ['type', 'pin'];
	get_dht_tempandhum.$defaults = [Sk.builtin.str('dht11'), Sk.builtin.int_(0)];
	get_dht_tempandhum.co_numargs = 2;
	mod.get_dht_tempandhum = new Sk.builtin.func(get_dht_tempandhum);

	ui.bindTemperatureEvent('temperature', mbData, 'temperature');
	ui.bindTemperatureEvent('humidity', mbData, 'humidity');

	return mod;
}