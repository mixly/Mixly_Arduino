'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

//ok
Blockly.Python.sensor_mixgo_button_is_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.'+btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_mixgo_button_was_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.'+btn + '.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_button_get_presses = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.'+btn + '.get_presses()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_button_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var dropdown_btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.' + dropdown_btn + '.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    //var funcName = 'attachInterrupt_func_' + dropdown_pin;
    //var branch = Blockly.Python.statementToCode(this, 'DO') || Blockly.Python.PASS;
    //var code2 = 'def' + ' ' + funcName + '(p):\n' + branch + '\n';
    //Blockly.Python.setups_[funcName] = code2;
    return code;
};
//ok
Blockly.Python.sensor_mpu9250_attachGestureInterrupt = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var d=branch || Blockly.Python.PASS;
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
	// if (v.indexOf('mixgo_')>-1)
	// 	Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
	// v=v.replace('mixgo_mpu','mixgo.mpu');
	var code = 'if '+v+'.mpu9250_is_gesture("' + gesture + '"):\n' + d;
    return code;
}

Blockly.Python.sensor_mpu9250_gesture = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    // if (v.indexOf('mixgo_')>-1)
    //     Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    // v=v.replace('mixgo_mpu','mixgo.mpu');
    var code = v+'.mpu9250_is_gesture("' + gesture + '")';
    return [code, Blockly.Python.ORDER_ATOMIC];
}


//ok
Blockly.Python.sensor_mpu9250_get_acceleration = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
	// if (v.indexOf('mixgo_')>-1)
	// 	Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
	// v=v.replace('mixgo_mpu','mixgo.mpu');
    var code = v+'.mpu9250_get_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpu9250_get_magnetic = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    // if (v.indexOf('mixgo_')>-1)
    //     Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    // v=v.replace('mixgo_mpu','mixgo.mpu');
    var code = v+'.mpu9250_magnetic_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mpu9250_get_gyro = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
    // if (v.indexOf('mixgo_')>-1)
    //     Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    // v=v.replace('mixgo_mpu','mixgo.mpu');
    var code = v+'.mpu9250_gyro_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
/*
Blockly.Python.sensor_mpu9250_calibrate_compass= function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    return 'compass.calibrate()\n';
};
//ok
Blockly.Python.sensor_mpu9250_is_compass_calibrated= function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    return ['compass.is_calibrated()', Blockly.Python.ORDER_ATOMIC];
};
*/
Blockly.Python.sensor_mpu9250_compass_heading= function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    return ['compass.mpu9250_heading()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_mpu9250_temperature = function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
	// if (v.indexOf('mixgo_')>-1)
	// 	Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
	// v=v.replace('mixgo_mpu','mixgo.mpu');
    return [v+'.mpu9250_get_temperature()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_mpu9250_field_strength= function(){
    Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v == "mpu")
        Blockly.Python.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';    
	// if (v.indexOf('mixgo_')>-1)
	// 	Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
	// v=v.replace('mixgo_mpu','mixgo.mpu');
    var compass = this.getFieldValue('compass');
    var a;
    if(compass =='strength'){
        a = v+'.mpu9250_get_field_strength()';
    }
    else if(compass =='heading'){
        a = v+'.mpu9250_heading()';
    }
    return [a, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.sensor_distance_hrsc04= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    Blockly.Python.setups_['class_hrsc04'] =
    'class HCSR04:\n'+
    '    def __init__(self, tpin=pin15, epin=pin14, spin=pin13):\n'+
    '        self.trigger_pin = tpin\n'+
    '        self.echo_pin = epin\n'+
    '        self.sclk_pin = spin\n'+
    '\n'+
    '    def distance_mm(self):\n'+
    '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n'+
    '                 mosi=self.trigger_pin, miso=self.echo_pin)\n'+
    '        pre = 0\n'+
    '        post = 0\n'+
    '        k = -1\n'+
    '        length = 500\n'+
    '        resp = bytearray(length)\n'+
    '        resp[0] = 0xFF\n'+
    '        spi.write_readinto(resp, resp)\n'+
    '        # find first non zero value\n'+
    '        try:\n'+
    '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n'+
    '        except StopIteration:\n'+
    '            i = -1\n'+
    '        if i > 0:\n'+
    '            pre = bin(value).count("1")\n'+
    '            # find first non full high value afterwards\n'+
    '            try:\n'+
    '                k, value = next((ind, v)\n'+
    '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n'+
    '                post = bin(value).count("1") if k else 0\n'+
    '                k = k + i\n'+
    '            except StopIteration:\n'+
    '                i = -1\n'+
    '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n'+
    '        return dist\n'+
    '\n'+
    'sonar=HCSR04()\n'
    return ['sonar.distance_mm()/10.0', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.RTC_get_time = function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.datetime()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.RTC_set_time = function () {
  Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
  //var RTCName = this.getFieldValue('RTCName');
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute", Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second", Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Hour('+hour+'))+ str(ds.Minute('+minute+')) +str(ds.Second('+second+'))\n';
  return code;
};

Blockly.Python.RTC_set_date = function () {
  Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
  //var RTCName = this.getFieldValue('RTCName');
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Year('+year+'))+ str(ds.Month('+month+')) +str(ds.Day('+day+'))\n';
  return code;
};

Blockly.Python.sensor_compass_reset = function(block) {
  Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
  return ['compass.clear_calibration()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.HCSR04 = function () {
    Blockly.Python.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = Blockly.Python.valueToCode(this, "PIN1", Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, "PIN2", Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.sensor_dht11 = function () {
    Blockly.Python.definitions_['import_dhtx'] = 'import dhtx';
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    var code ='dhtx.get_dht_'+what+"('"+sensor_type+"', "+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_light= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    return ['mixgo.mixgo_get_brightness()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_sound= function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    return ['mixgo.mixgo_get_soundlevel()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.number1 = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_pin_pressed = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_mixgo_pin_near = function(){
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var direction = this.getFieldValue('direction');
    var code = 'mixgo.'+'Infrared_'+ direction +'.near()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.RTC_set_datetime= function () {
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute",Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second",Blockly.Python.ORDER_ASSIGNMENT);
  var week = Blockly.Python.valueToCode(this, "weekday", Blockly.Python.ORDER_ASSIGNMENT);
  var millisecond = Blockly.Python.valueToCode(this, "millisecond",Blockly.Python.ORDER_ASSIGNMENT);
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.datetime(('+year+','+month+','+day+','+week+','+hour+','+minute+','+second+','+millisecond+'))\n';
  return code;
};

Blockly.Python.sensor_rtc_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.RTC()\n';
    return code;
};

Blockly.Python.sensor_use_i2c_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
	var code;
    if (key=='MPU9250') {
      Blockly.Python.definitions_['import_mpu9250'] = 'import mpu9250';
	   code = v + ' = mpu9250.' + key + "("+ iv+ ')\n';
    }else if (key=='BMP280') {
      Blockly.Python.definitions_['import_bmp280'] = 'import bmp280';
	  code = v + ' = bmp280.' + key + "("+ iv+ ')\n';
    }else if (key=='SHT20') {
      Blockly.Python.definitions_['import_sht20'] = 'import sht20';
	  code = v + ' = sht20.' + key + "("+ iv+ ')\n';
    }
    
    return code;
};

Blockly.Python.sensor_bmp=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_bmp280'] = 'import bmp280';
	var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sht=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_ds18x20=function(){
    Blockly.Python.definitions_['import_ds18x20x'] = 'import ds18x20x';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code ='ds18x20x.get_ds18x20_temperature('+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks.sensor_button_is_pressed=Blockly.Blocks.sensor_mixgo_button_is_pressed;
Blockly.Blocks.sensor_button_was_pressed=Blockly.Blocks.sensor_mixgo_button_was_pressed;
Blockly.Blocks.sensor_button_get_presses=Blockly.Blocks.sensor_mixgo_button_get_presses;
Blockly.Blocks.sensor_pin_pressed=Blockly.Blocks.sensor_mixgo_pin_pressed;
Blockly.Blocks.sensor_pin_near=Blockly.Blocks.sensor_mixgo_pin_near;
Blockly.Blocks.sensor_light=Blockly.Blocks.sensor_mixgo_light;
Blockly.Blocks.sensor_sound=Blockly.Blocks.sensor_mixgo_sound;
Blockly.Blocks.sensor_get_acceleration=Blockly.Blocks.sensor_mixgo_get_acceleration;
Blockly.Blocks.dht11=Blockly.Blocks.sensor_dht11
