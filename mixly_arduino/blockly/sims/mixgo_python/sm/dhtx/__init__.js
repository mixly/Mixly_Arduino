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
		var humIntstr = '00000000';
		var tempIntstr = '00000000';
		var humFloatstr = '00000000';
		var tempFloatstr = '00000000';
		var checksumStr = '00000000';
		if(mod._data.humidity instanceof Number && mod._data.temperature instanceof Number){
			var humidityInt = Math.floor(mod._data.humidity) > 90 ? Math.floor(mod._data.humidity): 90;//intenger for high 8-bit
			var temperatureInt = Math.floor(mod._data.temperature)> 50 ? Math.floor(mod._data.temperature): 50;//intenger for high 8-bit
			var humidityFloat = mod._data.humidity - humhumidityInt;
			var temperatureFloat = mod._data.humidity - humhumidityInt;
			var lossBitLength = 0; //less than 8 bit	
			humIntstr = humidityInt.toString(2);
			tempIntstr = temperatureInt.toString(2);
			//Intergers dont have chance to overflow
			//Just need to align
			if(humIntstr.length < 8){
				lossBitLength = 8 - humIntstr.length
				for(var i = 0; i < lossBitLength; i++){
					humIntstr = '0' + humIntstr;
				}
			}
			if(tempIntstr.length < 8){
				lossBitLength = 8 - tempstr.length
				for(var i = 0; i < lossBitLength; i++){
					tempstr = '0' + tempstr;
				}
			}
			//handle float
			humFloatstr = humidityFloat.toString(2);
			tempFloatstr = temperatureFloat.toString(2);
			if(humstrFloatstr.length < 8){
				lossBitLength = 8 - humFloatstr.length
				for(var i = 0; i < lossBitLength; i++){
					humFloatstr = humFloatstr + '0';
				}
			}
			else if(humFloatstr.length < 8){
				humFloatstr = humFloatstr.substring(0,8);
			}
			if(tempFloatstr.length < 8){
				lossBitLength = 8 - tempFloatstr.length
				for(var i = 0; i < lossBitLength; i++){
					tempFloatstr = tempFloatstr + '0';
				}
			}
			else if(tempFloatstr.length < 8){
				tempFloatstr = tempFloatstr.substring(0,8);
			}
			var checksum = parseInt(humIntstr, 2)  + parseInt(humFloatstr, 2) + parseInt(tempIntstr, 2) + parseInt(tempFloatstr, 2);
			checksumStr = checksum.toString(2).substring(0,8);
			if(checksumStr.length < 8){
				lossBitLength = 8 - checksumStr.length
				for(var i = 0; i < lossBitLength; i++){
					checksumStr = '0' + checksumStr;
				}
			}
		}
		return humIntstr + humFloatstr + tempIntstr + tempFloatstr + checksumStr; 
    };
    get_dht_tempandhum.co_varnames = ['type', 'pin'];
	get_dht_tempandhum.$defaults = [Sk.builtin.str('dht11'), Sk.builtin.int_(0)];
	get_dht_tempandhum.co_numargs = 2;
	mod.get_dht_tempandhum = new Sk.builtin.func(get_dht_tempandhum);

	ui.bindTemperatureEvent('temperature', mbData, 'temperature');
	ui.bindTemperatureEvent('humidity', mbData, 'humidity');

	return mod;
}