export const sensor_button_is_pressed = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var code = btn + '.is_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_button_was_pressed = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var code = btn + '.was_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_button_get_presses = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var code = btn + '.get_presses()';
    return [code, generator.ORDER_ATOMIC];
}

export const controls_GestureLists = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    // generator.definitions_['func_gesture' + gesture] = code;
    return ['"' + gesture + '"', generator.ORDER_ATOMIC];
}

export const controls_attachGestureInterrupt = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var branch = generator.statementToCode(this, 'DO');
    var d = branch || generator.PASS;
    var code = 'if accelerometer.is_gesture("' + gesture + '"):\n' + d;
    // generator.definitions_['func_gesture' + gesture] = code;
    return code;
}

export const sensor_current_gesture1 = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');

    var code = 'accelerometer.is_gesture("' + gesture + '")';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_current_gesture2 = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');

    var code = 'accelerometer.was_gesture("' + gesture + '")';
    return [code, generator.ORDER_ATOMIC];
}

export const controls_attachGestureInterrupt2 = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    var branch = generator.statementToCode(this, 'DO');
    var d = branch || generator.PASS;
    var code = 'if accelerometer.was_gesture("' + gesture + '"):\n' + d;
    // generator.definitions_['func_gesture' + gesture] = code;
    return code;
}

export const sensor_get_gestures = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('GES');
    var a;
    if (gesture == 'all') {
        a = 'accelerometer.get_gestures()';
    }
    else if (gesture == 'current') {
        a = 'accelerometer.current_gesture()';
    }
    return [a, generator.ORDER_ATOMIC];
}

export const sensor_current_gesture = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['accelerometer.current_gesture()', generator.ORDER_ATOMIC];
}

export const sensor_get_acceleration = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var key = this.getFieldValue('key')
    var code = 'accelerometer.get_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_set_acceleration = function () {
    var key = this.getFieldValue('key')
    var code = 'input.setAccelerometerRange(' + key + ')\n';
    return code;
}

// undefined?!?!?!?!
export const sensor_light_level = function (_, generator) {
    return ['input.lightLevel()', generator.ORDER_ATOMIC];
}

export const sensor_calibrate_compass = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'compass.calibrate()\n';
}

export const sensor_is_compass_calibrated = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['compass.is_calibrated()', generator.ORDER_ATOMIC];
}

export const sensor_compass_heading = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['compass.heading()', generator.ORDER_ATOMIC];
}

export const sensor_temperature = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['temperature()', generator.ORDER_ATOMIC];
}

export const sensor_field_strength = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var compass = this.getFieldValue('compass');
    var code = 'compass.' + compass + '()'
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_rotation = function (_, generator) {
    var key = this.getFieldValue('key')
    var code = 'input.rotation(' + key + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_magnetic = function (_, generator) {
    var key = this.getFieldValue('key')
    var code = 'input.magneticForce(' + key + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_distance_hrsc04 = function (_, generator) {
    var Trig = this.getFieldValue('Trig');
    var Echo = this.getFieldValue('Echo');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_ultrasonic'] = 'import ultrasonic';
    return ['ultrasonic.distance_cm(t_pin=pin' + Trig + ', e_pin=pin' + Echo + ')', generator.ORDER_ATOMIC];
}

export const sensor_distance_hrsc04_ = function (_, generator) {
    var Trig = this.getFieldValue('Trig');
    var Echo = this.getFieldValue('Echo');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.setups_['class_hrsc04_'] =
        'class HCSR04:\n' +
        '    def __init__(self, tpin=pin' + Trig + ', epin=pin' + Echo + ', spin=pin13):\n' +
        '        self.trigger_pin = tpin\n' +
        '        self.echo_pin = epin\n' +
        '        self.sclk_pin = spin\n' +
        '\n' +
        '    def distance_mm(self):\n' +
        '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n' +
        '                 mosi=self.trigger_pin, miso=self.echo_pin)\n' +
        '        pre = 0\n' +
        '        post = 0\n' +
        '        k = -1\n' +
        '        length = 500\n' +
        '        resp = bytearray(length)\n' +
        '        resp[0] = 0xFF\n' +
        '        spi.write_readinto(resp, resp)\n' +
        '        # find first non zero value\n' +
        '        try:\n' +
        '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n' +
        '        except StopIteration:\n' +
        '            i = -1\n' +
        '        if i > 0:\n' +
        '            pre = bin(value).count("1")\n' +
        '            # find first non full high value afterwards\n' +
        '            try:\n' +
        '                k, value = next((ind, v)\n' +
        '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n' +
        '                post = bin(value).count("1") if k else 0\n' +
        '                k = k + i\n' +
        '            except StopIteration:\n' +
        '                i = -1\n' +
        '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n' +
        '        return dist\n' +
        '\n' +
        '    def distance_cm(self):\n' +
        '        return self.distance_mm() / 10.0\n' +
        '\n' +
        'sonar=HCSR04()\n' +
        '\n'
    return ['sonar.distance_cm()', generator.ORDER_ATOMIC];
}

export const DS1307_init = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    //generator.definitions_['include_Mixly'] = '#include "Mixly.h"';
    //generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;
    //generator.definitions_['DS1307'+RTCName] = 'DS1307 ' + RTCName + '('+SDA+','+SCL+');';
    //return 'DS1307' + '('+SDA+','+SCL+')\n';
}

export const RTC_get_time = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    var timeType = this.getFieldValue('TIME_TYPE');
    //generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;

    switch (timeType) {
        //
        case "Year":
            var code = 'ds.' + timeType + '()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Month":
            var code = 'ds.' + timeType + '()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Day":
            var code = 'ds.' + timeType + '()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Hour":
            var code = 'ds.' + timeType + '()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Minute":
            var code = 'ds.' + timeType + '()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Second":
            var code = 'ds.' + timeType + '()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Week":
            var code = 'ds.' + timeType + '()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Mix1":
            var code = 'ds.get_date()';
            return [code, generator.ORDER_ASSIGNMENT];
        case "Mix2":
            var code = 'ds.get_time()';
            return [code, generator.ORDER_ASSIGNMENT];
    }
}

export const RTC_set_time = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    var hour = generator.valueToCode(this, "hour", generator.ORDER_ASSIGNMENT);
    var minute = generator.valueToCode(this, "minute", generator.ORDER_ASSIGNMENT);
    var second = generator.valueToCode(this, "second", generator.ORDER_ASSIGNMENT);
    //generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;

    var code = 'ds.set_time(' + hour + ', ' + minute + ', ' + second + ')\n';
    return code;
}

export const RTC_set_date = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_RTC'] = 'from RTC import *';
    //var RTCName = this.getFieldValue('RTCName');
    var year = generator.valueToCode(this, "year", generator.ORDER_ASSIGNMENT);
    var month = generator.valueToCode(this, "month", generator.ORDER_ASSIGNMENT);
    var day = generator.valueToCode(this, "day", generator.ORDER_ASSIGNMENT);
    //generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;
    var code = 'ds.set_date(' + year + ', ' + month + ', ' + day + ')\n';
    return code;
}

export const sensor_compass_reset = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'compass.clear_calibration()\n';
}

export const sensor_light = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return ['display.read_light_level()', generator.ORDER_ATOMIC];
}

export const sensor_hrsc04_init = function (_, generator) {
    var Trig = this.getFieldValue('Trig');
    var Echo = this.getFieldValue('Echo');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_ultrasonic'] = 'from ultrasonic import *';
    return "sonar = HCSR04(tpin=pin" + Trig + ", epin=pin" + Echo + ")\n"
}

export const TCS34725_Get_RGB = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_TCS'] = 'from TCS import *';

    var RGB = this.getFieldValue('TCS34725_COLOR');
    return ["tcs.getRawRGBData(" + RGB + ")", generator.ORDER_ATOMIC];
}

export const NTC_TEMP = function (_, generator) {
    var PIN = this.getFieldValue('PIN');
    var NominalResistance = generator.valueToCode(this, 'NominalResistance', generator.ORDER_ATOMIC);
    var betaCoefficient = generator.valueToCode(this, 'betaCoefficient', generator.ORDER_ATOMIC);
    var seriesResistor = generator.valueToCode(this, 'seriesResistor', generator.ORDER_ATOMIC);
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_ntc'] = 'import ntc';
    var code = 'ntc.read(pin' + PIN + ', ' + NominalResistance + ', ' + betaCoefficient + ', ' + seriesResistor + ')';
    return [code, generator.ORDER_ATOMIC];
}