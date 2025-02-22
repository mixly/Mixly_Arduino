import { sensor_LTR308 } from './sensor_onboard';

export const sensor_mixgo_button_is_pressed = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var code = 'mixgo.' + btn + '.is_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

//ok
export const sensor_mixgo_button_was_pressed = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var code = 'mixgo.' + btn + '.was_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_button_get_presses = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'mixgo.' + btn + '.get_presses(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_button_attachInterrupt = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var dropdown_btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = 'mixgo.' + dropdown_btn + '.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
}

//ok
export const sensor_mixgo_extern_button_is_pressed = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').is_pressed(' + dropdown_stat + ')';
    return [code, generator.ORDER_ATOMIC];
}

//ok
export const sensor_mixgo_extern_button_was_pressed = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').was_pressed(' + dropdown_stat + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_button_get_presses = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'mixgo.Button(' + pin + ').get_presses(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_button_attachInterrupt = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
}

//ok
export const sensor_mpu9250_attachGestureInterrupt = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var branch = generator.statementToCode(this, 'DO');
    var d = branch || generator.PASS;
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = 'if ' + v + '.mpu9250_is_gesture("' + gesture + '"):\n' + d;
    return code;
}

export const sensor_mpu9250_gesture = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_is_gesture("' + gesture + '")';
    return [code, generator.ORDER_ATOMIC];
}

//ok
export const sensor_mpu9250_get_acceleration = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_get_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_adxl345_get_acceleration = function (_, generator) {
    generator.definitions_['import_adxl345'] = 'import adxl345';
    // generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code;
    if (key == 'x') {
        code = v + '.readX()';
    } else if (key == 'y') {
        code = v + '.readY()';
    } else if (key == 'z') {
        code = v + '.readZ()';
    } else if (key == 'values') {
        code = v + '.readXYZ()';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_get_magnetic = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_magnetic_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_get_gyro = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_gyro_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_calibrate_compass = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    return '' + v + '.calibrate()\n';
}

export const sensor_mpu9250_temperature = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    return [v + '.mpu9250_get_temperature()', generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_field_strength = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "compass")
        generator.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var compass = this.getFieldValue('compass');
    var a;
    if (compass == 'strength') {
        a = v + '.get_field_strength()';
    }
    else if (compass == 'heading') {
        a = v + '.heading()';
    }
    return [a, generator.ORDER_ATOMIC];
}

export const sensor_distance_hrsc04 = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    generator.setups_['class_hrsc04'] =
        'class HCSR04:\n' +
        '    def __init__(self, tpin=pin15, epin=pin14, spin=pin13):\n' +
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
        'sonar=HCSR04()\n'
    return ['sonar.distance_mm()/10.0', generator.ORDER_ATOMIC];
}

export const RTC_get_time = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "rtc")
        generator.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';
    var code = v + '.datetime()';
    return [code, generator.ORDER_ATOMIC];
}

export const RTC_set_time = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var hour = generator.valueToCode(this, "hour", generator.ORDER_ASSIGNMENT);
    var minute = generator.valueToCode(this, "minute", generator.ORDER_ASSIGNMENT);
    var second = generator.valueToCode(this, "second", generator.ORDER_ASSIGNMENT);
    generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;
    var code = 'str(ds.Hour(' + hour + '))+ str(ds.Minute(' + minute + ')) +str(ds.Second(' + second + '))\n';
    return code;
}

export const RTC_set_date = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var year = generator.valueToCode(this, "year", generator.ORDER_ASSIGNMENT);
    var month = generator.valueToCode(this, "month", generator.ORDER_ASSIGNMENT);
    var day = generator.valueToCode(this, "day", generator.ORDER_ASSIGNMENT);
    generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;
    var code = 'str(ds.Year(' + year + '))+ str(ds.Month(' + month + ')) +str(ds.Day(' + day + '))\n';
    return code;
}

export const sensor_compass_reset = function (block, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    return '' + v + '.reset_calibrate()\n';
}

export const HCSR04 = function (_, generator) {
    generator.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = generator.valueToCode(this, "PIN1", generator.ORDER_ASSIGNMENT);
    var dropdown_pin2 = generator.valueToCode(this, "PIN2", generator.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_dht11 = function (_, generator) {
    generator.definitions_['import_dhtx'] = 'import dhtx';
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    var code = 'dhtx.get_dht_' + what + "('" + sensor_type + "', " + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_light = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'mixgo.get_brightness(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_sound = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'mixgo.get_soundlevel(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const number1 = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_pin_pressed = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'button', generator.ORDER_ATOMIC);
    var code = 'mixgo.' + pin + '.is_touched()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_pin_near = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'mixgo.' + 'Infrared(' + pin + ')()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_pin_near = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var direction = this.getFieldValue('direction');
    var code = 'mixgo.' + 'infrared_' + direction + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const RTC_set_datetime = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var year = generator.valueToCode(this, "year", generator.ORDER_ASSIGNMENT);
    var month = generator.valueToCode(this, "month", generator.ORDER_ASSIGNMENT);
    var day = generator.valueToCode(this, "day", generator.ORDER_ASSIGNMENT);
    var hour = generator.valueToCode(this, "hour", generator.ORDER_ASSIGNMENT);
    var minute = generator.valueToCode(this, "minute", generator.ORDER_ASSIGNMENT);
    var second = generator.valueToCode(this, "second", generator.ORDER_ASSIGNMENT);
    var week = generator.valueToCode(this, "weekday", generator.ORDER_ASSIGNMENT);
    var millisecond = generator.valueToCode(this, "millisecond", generator.ORDER_ASSIGNMENT);
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "rtc")
        generator.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';
    var code = v + '.datetime((' + year + ',' + month + ',' + day + ',' + week + ',' + hour + ',' + minute + ',' + second + ',' + millisecond + '))\n';
    return code;
}

export const sensor_rtc_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.RTC()\n';
    return code;
}

export const sensor_use_i2c_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_machine'] = 'import machine';
    var code;
    if (key == 'MPU9250') {
        generator.definitions_['import_mpu9250'] = 'import mpu9250';
        code = v + ' = mpu9250.' + key + "(" + iv + ')\n';
    } else if (key == 'BMP280') {
        generator.definitions_['import_bmp280'] = 'import bmp280';
        code = v + ' = bmp280.' + key + "(" + iv + ')\n';
    } else if (key == 'SHT20') {
        generator.definitions_['import_sht20'] = 'import sht20';
        code = v + ' = sht20.' + key + "(" + iv + ')\n';
    } else if (key == 'ADXL345') {
        generator.definitions_['import_adxl345'] = 'import adxl345';
        code = v + ' = adxl345.' + key + "(" + iv + ')\n';
    }
    return code;
}

export const sensor_bmp = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_bmp280'] = 'import bmp280';
    var code = v + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_sht = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_ds18x20 = function (_, generator) {
    generator.definitions_['import_ds18x20x'] = 'import ds18x20x';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'ds18x20x.get_ds18x20_temperature(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_lm35 = function (_, generator) {
    generator.definitions_['import_lm35'] = 'import lm35';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'lm35.get_LM35_temperature(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_button_is_pressed = sensor_mixgo_button_is_pressed;
export const sensor_button_was_pressed = sensor_mixgo_button_was_pressed;
export const sensor_button_get_presses = sensor_mixgo_button_get_presses;
export const sensor_pin_pressed = sensor_mixgo_pin_pressed;
export const sensor_pin_near = sensor_mixgo_pin_near;
export const sensor_mixgo_light = sensor_LTR308;
export const sensor_light = sensor_mixgo_light;
// export const sensor_get_acceleration = sensor_mixgo_get_acceleration;
export const dht11 = sensor_dht11;