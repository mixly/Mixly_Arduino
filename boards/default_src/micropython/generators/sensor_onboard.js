import { Boards } from 'mixly';
import { sensor_dht11 } from './sensor_extern.js';

export const sensor_mixgo_button_is_pressed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var code = version + '.' + btn + '.is_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

//ok
export const sensor_mixgo_button_was_pressed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var code = version + '.' + btn + '.was_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_button_get_presses = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = version + '.' + btn + '.get_presses(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_button_attachInterrupt = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var dropdown_btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = version + '.' + dropdown_btn + '.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
}

//ok
export const sensor_mixgocar42_button_is_pressed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var code = version + '.' + 'button.is_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

//ok
export const sensor_mixgocar42_button_was_pressed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var code = version + '.' + 'button.was_pressed()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgocar42_button_get_presses = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = version + '.' + 'button.get_presses(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgocar42_button_attachInterrupt = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version] = 'import ' + version;
    var dropdown_mode = this.getFieldValue('mode');
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = version + '.' + 'button.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
}

export const HCSR04 = function (_, generator) {
    generator.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = generator.valueToCode(this, "PIN1", generator.ORDER_ASSIGNMENT);
    var dropdown_pin2 = generator.valueToCode(this, "PIN2", generator.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, generator.ORDER_ATOMIC];
}

export const number1 = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const number2 = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const number3 = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const number4 = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const number5 = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const number6 = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const number7 = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_pin_near_single = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_als'] = "from " + version + " import onboard_als";
    var code = 'onboard_als.ps_nl()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_pin_near_double = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version] = 'import ' + version;
    var direction = this.getFieldValue('direction');
    var code = version + '.' + 'infrared_' + direction + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_pin_near = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_als'] = 'from ' + version + ' import onboard_als';
    var code = 'onboard_als.ps()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_nova_pin_near = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var direction = this.getFieldValue('direction');
    generator.definitions_['import_' + version + '_' + direction] = 'from ' + version + ' import onboard_als_' + direction;
    var code = 'onboard_als_' + direction + '.ps_nl()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_LTR308 = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_als'] = 'from ' + version + ' import onboard_als';
    var code = 'onboard_als.als()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_sant_color = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_als'] = 'from ' + version + ' import onboard_als';
    var code = 'onboard_als.color()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_nova_LTR308 = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var direction = this.getFieldValue('direction');
    generator.definitions_['import_' + version + '_' + direction] = 'from ' + version + ' import onboard_als_' + direction;
    var code = 'onboard_als_' + direction + '.als_vis()';
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

export const sensor_LTR308 = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == "mixgo") {
        generator.definitions_['import_mixgo'] = 'import mixgo';
        return ['mixgo.get_brightness()', generator.ORDER_ATOMIC];
    } else if (version == "mixgo_ce") {
        generator.definitions_['import_mixgo_ce'] = 'import mixgo_ce';
        return ['mixgo_ce.get_brightness()', generator.ORDER_ATOMIC];
    } else if (version == "mpython") {
        generator.definitions_['import_mpython_onboard_light'] = 'from mpython import onboard_light';
        return ['onboard_light.brightness()', generator.ORDER_ATOMIC];
    }
    generator.definitions_['import_' + version + '_onboard_als'] = "from " + version + " import onboard_als";
    var code = 'onboard_als.als_vis()';
    return [code, generator.ORDER_ATOMIC];
    // else{return ['', generator.ORDER_ATOMIC];}
}

export const sensor_sound = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == 'mixbot') {
        generator.definitions_['import_' + version + '_sound'] = 'from ' + version + ' import sound';
        var code = 'sound.loudness()';
    } else if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_sound_level'] = "from mixgo_zero_voice import sound_level";
        var code = 'sound_level()';
    } else if (version == 'mixgo_nova') {
        generator.definitions_['import_mixgo_nova_voice_sound_level'] = "from mixgo_nova_voice import sound_level";
        var code = 'sound_level()';
    } else if (version == "mixgo") {
        generator.definitions_['import_mixgo'] = 'import mixgo';
        return ['mixgo.get_soundlevel()', generator.ORDER_ATOMIC];
    } else if (version == "mpython") {
        generator.definitions_['import_mpython_onboard_sound'] = 'from mpython import onboard_sound';
        return ['onboard_sound.soundlevel()', generator.ORDER_ATOMIC];
    } else if (version == "mixgo_mini") {
        generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
        var code = 'onboard_bot.soundlevel()';
    } else {
        generator.definitions_['import_' + version + '_onboard_sound'] = 'from ' + version + ' import onboard_sound';
        var code = 'onboard_sound.read()';
    }
    return [code, generator.ORDER_ATOMIC];
}

// export const sensor_mixgo_nova_sound = function (_, generator) {
//     var version = Boards.getSelectedBoardKey().split(':')[2]
//     return [code, generator.ORDER_ATOMIC];
// }

export const sensor_hp203 = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var key = this.getFieldValue('key');
    if (version == "mixgo_mini") {
        generator.definitions_['import_mixgo_mini_onboard_i2c'] = 'from mixgo_mini import onboard_i2c';
        generator.definitions_['import_spl06_001'] = 'import spl06_001';
        generator.definitions_['import_onboard_bps'] = 'onboard_bps = spl06_001.SPL06(onboard_i2c)';
    } else {
        generator.definitions_['import_' + version + '_onboard_bps'] = "from " + version + " import onboard_bps";
    }
    var code = 'onboard_bps.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_aht11 = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var key = this.getFieldValue('key');
    if (version == 'mixgo_nova' || version == 'mixgo_zero') {
        generator.definitions_['import_' + version + '_onboard_ths'] = "from " + version + " import onboard_ths";
    } else if (version == 'mixgo_mini') {
        generator.definitions_['import_mixgo_mini_onboard_i2c'] = 'from mixgo_mini import onboard_i2c';
        generator.definitions_['import_shtc3'] = 'import shtc3';
        generator.definitions_['import_onboard_ths'] = 'onboard_ths = shtc3.SHTC3(onboard_i2c)';
    } else {
        generator.definitions_['import_' + version + '_onboard_ths'] = "from " + version + " import onboard_ths";
    }
    var code = 'onboard_ths.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_get_temperature = function (_, generator) {
    generator.definitions_['import_feiyi_onboard_acc'] = 'from feiyi import onboard_acc';
    return ['onboard_acc.temperature()', generator.ORDER_ATOMIC];
}

export const rfid_readid = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
    var code = 'onboard_rfid.read_card(0, x="id")';
    return [code, generator.ORDER_ATOMIC];
}

export const rfid_readcontent = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var sector = generator.valueToCode(this, 'SECTOR', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
    var code = 'onboard_rfid.read_card(' + sector + ', x="content")';
    return [code, generator.ORDER_ATOMIC];
}

export const rfid_write = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var sector = generator.valueToCode(this, 'SECTOR', generator.ORDER_ATOMIC);
    var cnt = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
    var code = 'onboard_rfid.write_card(' + cnt + ',' + sector + ')\n';
    return code;
}

export const rfid_write_return = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var sector = generator.valueToCode(this, 'SECTOR', generator.ORDER_ATOMIC);
    var cnt = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_rfid'] = "from " + version + " import onboard_rfid";
    var code = 'onboard_rfid.write_card(' + cnt + ',' + sector + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_get_acceleration = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var key = this.getFieldValue('key');
    if (key == 'strength') {
        if (version == 'mixbot') {
            generator.definitions_['import_' + version + '_acc_gyr'] = 'from ' + version + ' import acc_gyr';
            var code = 'acc_gyr.strength()';
        } else {
            generator.definitions_['import_' + version + '_onboard_acc'] = "from " + version + " import onboard_acc";
            var code = 'onboard_acc.strength()';
        }
        return [code, generator.ORDER_ATOMIC];
    }
    if (version == 'mixbot') {
        generator.definitions_['import_' + version + '_acc_gyr'] = 'from ' + version + ' import acc_gyr';
        var code = 'acc_gyr.accelerometer()' + key;
    } else if (version == 'mpython') {
        generator.definitions_['import_mpython_motion'] = 'from mpython import motion';
        var code = 'motion.accelerometer()' + key;
    } else {
        generator.definitions_['import_' + version + '_onboard_acc'] = "from " + version + " import onboard_acc";
        var code = 'onboard_acc.acceleration()' + key;
    }
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_eulerangles = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_acc'] = "from " + version + " import onboard_acc";
    var angle = this.getFieldValue('angle');
    var code = 'onboard_acc.eulerangles()' + angle;
    return [code, generator.ORDER_ATOMIC];
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

export const sensor_mixgoce_pin_pressed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var pin = generator.valueToCode(this, 'button', generator.ORDER_ATOMIC);
    if (version === 'mixgo_mini' || version === 'mixgo_sant') {
        generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
        var code = 'onboard_bot.touched(' + pin + ')';
    } else {
        generator.definitions_['import_' + version] = 'import ' + version;
        var code = version + '.touched(' + pin + ')';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_touch_slide = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version === 'mixgo_mini' || version === 'mixgo_sant') {
        generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
        var code = 'onboard_bot.touch_slide()';
    } else {
        generator.definitions_['import_' + version] = 'import ' + version;
        var code = version + '.touch_slide(3,4)';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_pin_pressed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version] = 'import ' + version;
    var pin = generator.valueToCode(this, 'button', generator.ORDER_ATOMIC);
    var code = version + '.' + pin + '.is_touched()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpython_pin_pressed = function (_, generator) {
    generator.definitions_['import_mpython'] = 'import mpython';
    var pin = generator.valueToCode(this, 'button', generator.ORDER_ATOMIC);
    var code = 'mpython.touch_' + pin + '.is_touched()';
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
    } else if (compass == 'heading') {
        a = v + '.heading()';
    }
    return [a, generator.ORDER_ATOMIC];
}

export const sensor_compass_reset = function (block, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo_compass'] = 'from mixgo import compass';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    return '' + v + '.reset_calibrate()\n';
}

export const sensor_onboard_mpu9250_gesture = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    generator.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_is_gesture("' + gesture + '")';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_onboard_mpu9250_get_acceleration = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    generator.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_get_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_onboard_mpu9250_get_magnetic = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    generator.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_magnetic_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_onboard_mpu9250_get_gyro = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    generator.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    var code = 'onboard_mpu.mpu9250_gyro_' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_onboard_mpu9250_calibrate_compass = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
    return '' + 'onboard_compass.calibrate()\n';
}

export const sensor_onboard_mpu9250_temperature = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo_onboard_mpu'] = 'from mixgo import onboard_mpu';
    return ['onboard_mpu.mpu9250_get_temperature()', generator.ORDER_ATOMIC];
}

export const sensor_onboard_mpu9250_field_strength = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
    var compass = this.getFieldValue('compass');
    var a;
    if (compass == 'strength') {
        a = 'onboard_compass.get_field_strength()';
    } else if (compass == 'heading') {
        a = 'onboard_compass.heading()';
    }
    return [a, generator.ORDER_ATOMIC];
}

export const sensor_onboard_compass_reset = function (block, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo_onboard_compass'] = 'from mixgo import onboard_compass';
    return '' + 'onboard_compass.reset_calibrate()\n';
}

export const onboard_RTC_set_datetime = function (_, generator) {
    generator.definitions_['import_rtctime'] = "import rtctime";
    var year = generator.valueToCode(this, "year", generator.ORDER_ASSIGNMENT);
    var month = generator.valueToCode(this, "month", generator.ORDER_ASSIGNMENT);
    var day = generator.valueToCode(this, "day", generator.ORDER_ASSIGNMENT);
    var hour = generator.valueToCode(this, "hour", generator.ORDER_ASSIGNMENT);
    var minute = generator.valueToCode(this, "minute", generator.ORDER_ASSIGNMENT);
    var second = generator.valueToCode(this, "second", generator.ORDER_ASSIGNMENT);
    var code = 'rtctime.settime((' + year + ',' + month + ',' + day + ',' + hour + ',' + minute + ',' + second + ',0,0))\n';
    return code;
}

export const onboard_RTC_settime_string = function (_, generator) {
    var cnt = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    generator.definitions_['import_rtctime'] = "import rtctime";
    var code = 'rtctime.settime(' + cnt + ')\n';
    return code;
}

export const onboard_RTC_get_time = function (_, generator) {
    generator.definitions_['import_time'] = 'import time';
    var code = 'time.localtime()';
    return [code, generator.ORDER_ATOMIC];
}

export const onboard_RTC_get_timestamp = function (_, generator) {
    generator.definitions_['import_time'] = 'import time';
    var time = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var code = 'time.mktime(' + time + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const onboard_RTC_timestamp_totuple = function (_, generator) {
    generator.definitions_['import_time'] = 'import time';
    var ts = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = 'time.localtime(' + ts + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const onboard_RTC_get_time_str = function (_, generator) {
    generator.definitions_['import_rtctime'] = 'import rtctime';
    var code = 'rtctime.strtime()';
    return [code, generator.ORDER_ATOMIC];
}

export const onboard_RTC_get_timetuple_to_str = function (_, generator) {
    generator.definitions_['import_rtctime'] = 'import rtctime';
    var ct = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    var code = 'rtctime.strtime(' + ct + ')';
    return [code, generator.ORDER_ATOMIC];
}

//mixgo_cc onboard_sensor generators:

export const sensor_mixgo_cc_mmc5603_get_magnetic = function (_, generator) {
    var key = this.getFieldValue('key');
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == 'mpython') {
        generator.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
        if (key == 'all') {
            var code = 'magnetic.getstrength()';
        } else {
            var code = 'magnetic.getdata()' + key;
        }
    } else if (version == 'mixgo_mini') {
        generator.definitions_['import_mixgo_mini_onboard_i2c'] = 'from mixgo_mini import onboard_i2c';
        generator.definitions_['import_mmc5603'] = 'import mmc5603';
        generator.definitions_['import_onboard_mgs'] = 'onboard_mgs = mmc5603.MMC5603(onboard_i2c)';
        if (key == 'all') {
            var code = 'onboard_mgs.getstrength()';
        } else {
            var code = 'onboard_mgs.getdata()' + key;
        }
    } else {
        generator.definitions_['import_' + version + '_onboard_mgs'] = "from " + version + " import onboard_mgs";
        if (key == 'all') {
            var code = 'onboard_mgs.getstrength()';
        } else {
            var code = 'onboard_mgs.getdata()' + key;
        }
    }
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_cc_mmc5603_get_angle = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == 'mpython') {
        generator.definitions_['import_mpython_magnetic'] = 'from mpython import magnetic';
        var code = 'magnetic.getangle()';
    } else if (version == 'mixgo_mini') {
        generator.definitions_['import_mixgo_mini_onboard_i2c'] = 'from mixgo_mini import onboard_i2c';
        generator.definitions_['import_mmc5603'] = 'import mmc5603';
        generator.definitions_['import_onboard_mgs'] = 'onboard_mgs = mmc5603.MMC5603(onboard_i2c)';
    } else {
        generator.definitions_['import_' + version + '_onboard_mgs'] = "from " + version + " import onboard_mgs";
    }
    var code = 'onboard_mgs.getangle()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_cc_mmc5603_calibrate_compass = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == 'mixgo_mini') {
        generator.definitions_['import_mixgo_mini_onboard_i2c'] = 'from mixgo_mini import onboard_i2c';
        generator.definitions_['import_mmc5603'] = 'import mmc5603';
        generator.definitions_['import_onboard_mgs'] = 'onboard_mgs = mmc5603.MMC5603(onboard_i2c)';
    } else {
        generator.definitions_['import_' + version + '_onboard_mgs'] = "from " + version + " import onboard_mgs";
    }
    var code = 'onboard_mgs.calibrate()\n';
    return code;
}

//mixgo_me onboard_sensor generators:

export const sensor_mixgome_temperature = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == 'mixgo_mini') {
        generator.definitions_['import_mixgo_mini_onboard_temperature'] = 'from mixgo_mini import onboard_temperature';
        var code = 'onboard_temperature()';
    } else {
        generator.definitions_['import_mixgo_me_onboard_acc'] = "from mixgo_me import onboard_acc";
        var code = 'onboard_acc.temperature()';
    }
    return [code, generator.ORDER_ATOMIC];
}

//mixgo_ce onboard_sensor generators:
export const sensor_mixgoce_temperature = function (_, generator) {
    generator.definitions_['import_mixgo_ce'] = "import mixgo_ce";
    var code = 'mixgo_ce.get_temperature()';
    return [code, generator.ORDER_ATOMIC];
}

//mpython onboard_sensor:

export const sensor_mpython_qmi8658_get_gyro = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_mpython_motion'] = 'from mpython import motion';
    var code = 'motion.gyroscope()' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mpython_qmi8658_temperature = function (_, generator) {
    generator.definitions_['import_mpython_motion'] = 'from mpython import motion';
    return ['motion.temperature()', generator.ORDER_ATOMIC];
}

export const sensor_rm_pin_near_double = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var direction = this.getFieldValue('direction');
    generator.definitions_['import_' + version + '_adc' + direction] = 'from ' + version + ' import adc' + direction;
    var code = 'adc' + direction + '.read()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_rm_battery_left = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == 'feiyi') {
        generator.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
        var code = 'onboard_bot51.read_bat()';
        return [code, generator.ORDER_ATOMIC];
    }
    generator.definitions_['import_' + version + '_battery'] = 'from ' + version + ' import battery';
    var code = 'battery.voltage()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_rm_acc = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_rm_e1_gyro'] = 'from rm_e1 import gyro';
    var code = 'gyro.acceleration()' + key;
    return [code, generator.ORDER_ATOMIC];
}

//car4.2
export const sensor_mixgocar_pin_near_line = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.patrol()' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgocar_pin_near = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.obstacle()' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgocar_pin_near_state_change = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.ir_mode(onboard_info.' + key + ')\n';
    return code;
}

export const sensor_mixgocar_battery_left = function (_, generator) {
    generator.definitions_['import_mixgocar_c3_onboard_info'] = 'from mixgocar_c3 import onboard_info';
    var code = 'onboard_info.read_bat()';
    return [code, generator.ORDER_ATOMIC];
}

//mixbot onboard_sensor below:

export const sensor_mixbot_patrol_calibrate = function (_, generator) {
    var key = this.getFieldValue('key');
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_patrol'] = 'from ' + version + ' import patrol';
    var code = 'patrol.correct(patrol.CORRECTING_' + key + ')\n';
    return code;
}

export const sensor_mixbot_patrol_value = function (_, generator) {
    var key = this.getFieldValue('key');
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_patrol'] = 'from ' + version + ' import patrol';
    var code = 'patrol.getdata()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixbot_temperature = function (_, generator) {
    generator.definitions_['import_mixbot_acc_gyr'] = "from mixbot import acc_gyr";
    var code = 'acc_gyr.temperature()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixbot_get_gyro = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_mixbot_acc_gyr'] = "from mixbot import acc_gyr";
    var code = 'acc_gyr.gyroscope()' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_bitbot_ALS = function (_, generator) {
    generator.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var mode = generator.valueToCode(this, 'mode', generator.ORDER_ATOMIC);
    var code = 'onboard_bot51.' + 'read_als(' + mode + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const bitbot_als_num = function (_, generator) {
    var code = this.getFieldValue('PIN');
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_button_is_pressed = sensor_mixgo_button_is_pressed;
export const sensor_button_was_pressed = sensor_mixgo_button_was_pressed;
export const sensor_button_get_presses = sensor_mixgo_button_get_presses;
export const sensor_pin_pressed = sensor_mixgo_pin_pressed;
export const sensor_pin_near = sensor_mixgo_pin_near;
export const sensor_mixgo_light = sensor_LTR308;
export const sensor_light = sensor_mixgo_light;
export const dht11 = sensor_dht11;

//educore onboard_sensor
export const educore_voice_sensor = function (_, generator) {
    generator.definitions_['import_educore_sound'] = 'from educore import sound';
    var code = "sound()";
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_read = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + ".read()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_light_sensor = function (_, generator) {
    generator.definitions_['import_educore_light'] = 'from educore import light';
    var code = "light()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_gyroscope_sensor = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_accelerometer'] = 'from ' + version + ' import accelerometer';
    var code = "accelerometer()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_gyroscope_sensor_read = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_accelerometer'] = 'from ' + version + ' import accelerometer';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + "." + key + "()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_gyroscope_sensor_shake = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_accelerometer'] = 'from ' + version + ' import accelerometer';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + ".shake()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_button_sensor = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_button'] = 'from ' + version + ' import button';
    var btn = this.getFieldValue('btn');
    var code = 'button(button.' + btn + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_button_was_pressed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_button'] = 'from ' + version + ' import button';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.status()';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_rfid_sensor = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_rfid'] = 'from ' + version + ' import rfid';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'rfid(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_rfid_sensor_scan = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_rfid'] = 'from ' + version + ' import rfid';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.scanning()';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_rfid_sensor_scan_data = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_rfid'] = 'from ' + version + ' import rfid';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const CI130X_IDENTIFY_AND_SAVE_SANT = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_asr'] = 'from ' + version + ' import onboard_asr';
    var code = 'onboard_asr.cmd_id()\n';
    return code;
}

export const CI130X_GET_WHETHER_IDENTIFY_SANT = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_asr'] = 'from ' + version + ' import onboard_asr';
    var cmd = this.getFieldValue('cmd');
    var code = 'onboard_asr.result(' + cmd + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const CI130X_GET_THE_RECOGNIZED_CMD_SANT = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_asr'] = 'from ' + version + ' import onboard_asr';
    var key = this.getFieldValue('key');
    if (key == 'status1') {
        var code = 'onboard_asr.status()[0]';
    } else if (key == 'status2') {
        var code = 'onboard_asr.status()[1]';
    } else {
        var code = 'onboard_asr.' + key + '()';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const CI130X_BROADCAST_SANT = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_asr'] = 'from ' + version + ' import onboard_asr';
    var num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var star = this.getFieldValue('star');
    var end = this.getFieldValue('end');
    var code = 'onboard_asr.play(' + star + ',' + num + ',' + end + ')\n';
    return code;
}

export const CI130X_SET_SYSTEM_CMD_SANT = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    generator.definitions_['import_' + version + '_onboard_asr'] = 'from ' + version + ' import onboard_asr';
    var cmd = this.getFieldValue('cmd');
    var code = 'onboard_asr.sys_cmd(' + cmd + ')\n';
    return code;
}