export const KEY_SELET = function (_, generator) {
    var code = this.getFieldValue('KEY');
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_button_init = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code1 = 'button' + key + '=board.pin(' + key + ',board.GPIO.IN,board.GPIO.PULL_UP)\n';
    return code1;
}

export const sensor_button_read = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = 'not button' + key + '.value()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_dht11 = function (_, generator) {
    generator.definitions_['import dht11'] = 'import dht11';
    var TYPE = this.getFieldValue('TYPE');
    var PIN = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    if (TYPE == "2")
        var code = 'dht11.read_data(' + PIN + ')';
    else
        var code = 'dht11.read_data(' + PIN + ')[' + TYPE + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const HCSR04 = function (_, generator) {
    generator.definitions_['import_sonar'] = 'import hcr04';
    var dropdown_pin1 = generator.valueToCode(this, "PIN1", generator.ORDER_ASSIGNMENT);
    var dropdown_pin2 = generator.valueToCode(this, "PIN2", generator.ORDER_ASSIGNMENT);
    var code = 'hcr04.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_attachGestureInterrupt = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
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
    var gesture = this.getFieldValue('gesture');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_is_gesture("' + gesture + '")';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_get_acceleration = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    var key = this.getFieldValue('key');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_get_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_adxl345_get_acceleration = function (_, generator) {
    generator.definitions_['import_adxl345'] = 'import adxl345';
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
    var key = this.getFieldValue('key');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_magnetic_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_get_gyro = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    var key = this.getFieldValue('key');
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = v + '.mpu9250_gyro_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpu9250_calibrate_compass = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    return '' + v + '.calibrate()\n';
}

export const sensor_mpu9250_temperature = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
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

export const sensor_compass_reset = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    return '' + v + '.reset_calibrate()\n';
}

export const sensor_use_i2c_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
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
    generator.definitions_['import_bmp280'] = 'import bmp280';
    var code = v + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_sht = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}