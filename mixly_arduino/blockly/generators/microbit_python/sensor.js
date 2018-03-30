'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');
//ok
Blockly.Python.controls_GestureLists = function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    // Blockly.Python.definitions_['func_gesture' + gesture] = code;
    return ['"'+gesture+'"', Blockly.Python.ORDER_ATOMIC];
}
//ok
Blockly.Python.controls_attachGestureInterrupt = function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var d=branch || Blockly.Python.PASS;
    var code = 'if accelerometer.is_gesture("' + gesture + '"):\n' + d;
    // Blockly.Python.definitions_['func_gesture' + gesture] = code;
    return code;
}
//ok
Blockly.Python.controls_attachGestureInterrupt2 = function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var d=branch || Blockly.Python.PASS;
    var code = 'if accelerometer.was_gesture("' + gesture + '"):\n' + d;
    // Blockly.Python.definitions_['func_gesture' + gesture] = code;
    return code;
}
//ok
Blockly.Python.sensor_get_gestures= function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['accelerometer.get_gestures()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_current_gesture= function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['accelerometer.current_gesture()', Blockly.Python.ORDER_ATOMIC];
};

//ok
Blockly.Python.sensor_get_acceleration = function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var key = this.getFieldValue('key')
    var code = 'accelerometer.get_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_set_acceleration = function(){
    var key = this.getFieldValue('key')
    var code = 'input.setAccelerometerRange(' + key  + ')\n';
    return code;
};
//undefined?!?!?!?!
Blockly.Python.sensor_light_level= function(){
    return ['input.lightLevel()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_calibrate_compass= function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'compass.calibrate()\n';
};
//ok
Blockly.Python.sensor_is_compass_calibrated= function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['compass.is_calibrated()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_compass_heading= function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['compass.heading()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_temperature = function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['temperature()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_field_strength= function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['compass.get_field_strength()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_rotation = function(){
    var key = this.getFieldValue('key')
    var code = 'input.rotation(' + key  + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_magnetic= function(){
    var key = this.getFieldValue('key')
    var code = 'input.magneticForce(' + key  + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_distance_hrsc04= function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
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

