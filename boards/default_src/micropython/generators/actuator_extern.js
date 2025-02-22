import { Boards } from 'mixly';

export const servo_init = function (_, generator) {
    generator.definitions_['import_servo'] = 'import servo';
    generator.definitions_['import_board'] = 'import board';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = v + ' = servo.Servo(board.' + dropdown_pin + ')\n';
    return code;
}

export const servo_speed_360 = function (_, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'SPEED', generator.ORDER_ATOMIC);
    var code = v + '.set_speed(' + speed + ')\n';
    return code;
}

export const servo_set_angle = function (_, generator) {
    generator.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var code = 'servo.servo180_angle(' + dropdown_pin + ',' + num + ')\n';
    return code;
}

export const servo_set_speed = function (_, generator) {
    generator.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var code = 'servo.servo360_speed(' + dropdown_pin + ',' + num + ')\n';
    return code;
}

export const servo_get_angle = function (_, generator) {
    generator.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'servo.servo180_angle(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const servo_get_speed = function (_, generator) {
    generator.definitions_['import_servo'] = 'import servo';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'servo.servo360_speed(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_ms32006_init = function (_, generator) {
    generator.definitions_['import ms32006'] = 'import ms32006';
    var address = this.getFieldValue('mode')
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sub1 = generator.valueToCode(this, 'SUB1', generator.ORDER_ATOMIC);
    var code = sub + '=ms32006.MS32006(' + sub1 + ',addr=' + address + ')\n';
    return code;
}

export const actuator_ms32006_dcmotor = function (_, generator) {
    generator.definitions_['import ms32006'] = 'import ms32006';
    var direction = this.getFieldValue('direction')
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = sub + '.dc_motor(' + direction + ',' + speed + ')\n';
    return code;
}

export const actuator_ms32006_stepper = function (_, generator) {
    generator.definitions_['import ms32006'] = 'import ms32006';
    var mode = this.getFieldValue('mode')
    var direction = this.getFieldValue('direction')
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var steps = generator.valueToCode(this, 'steps', generator.ORDER_ATOMIC);
    var code = sub + '.move(' + mode + ',' + direction + ',' + speed + ',' + steps + ')\n';
    return code;
}

export const esp32_music_pitch_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_rgbpin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.definitions_['import_music'] = 'import music';
    var code = v + ' = music.MIDI(' + dropdown_rgbpin + ')\n';
    return code;
}

export const esp32_music_pitch = function (block, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var code = v + '.pitch(' + number_pitch + ')\n';
    return code;
}

export const esp32_music_pitch_with_time = function (block, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var number_time = generator.valueToCode(block, 'time', generator.ORDER_ATOMIC);
    var code = v + '.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    return code;
}

export const esp32_music_stop = function (block, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.stop(' + ')\n';
    return code;
}

export const esp32_music_set_tempo_extern = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var bpm = generator.valueToCode(this, 'BPM', generator.ORDER_ASSIGNMENT);
    var ticks = generator.valueToCode(this, 'TICKS', generator.ORDER_ASSIGNMENT);
    var code = v + ".set_tempo(" + ticks + ", " + bpm + ")\n";
    return code;
}

export const esp32_music_get_tempo_extern = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + ".get_tempo()";
    return [code, generator.ORDER_ATOMIC];
}

export const esp32_music_play_list = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var lst = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT);
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + ".play(" + v + '.' + lst + ")\n";
    return code;
}

export const esp32_music_reset_extern = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    return v + ".reset()\n";
}

export const servo_move = function (_, generator) {
    generator.definitions_['import_servo'] = 'import servo';
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_degree = generator.valueToCode(this, 'DEGREE', generator.ORDER_ATOMIC);
    var code = 'servo.servo_write_angle(' + dropdown_pin + ',' + value_degree + ')\n';
    return code;
}

export const actuator_extern_led_bright = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.LED(" + pin + ").setonoff(" + bright + ")\n";
    return code;
}

export const actuator_extern_get_led_bright = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin + ").getbrightness(" + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_extern_get_led_state = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "mixgo.LED(" + pin + ").getonoff(" + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_extern_led_brightness = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var flag = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = 'mixgo.LED(' + pin + ').setbrightness(' + flag + ')\n';
    return code;
}

export const actuator_neopixel_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_rgbpin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_ledcount = generator.valueToCode(this, 'LEDCOUNT', generator.ORDER_ATOMIC);
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    var code = v + ' = neopixel.NeoPixel(machine.Pin(' + dropdown_rgbpin + '), ' + value_ledcount + ')\n';
    return code;
}

export const actuator_neopixel_rgb_all = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var code = v + '.fill((' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + '))\n';
    return code;
}

export const actuator_neopixel_write = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.write()\n';
    return code;
}

export const actuator_neopixel_rgb = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var code = v + '[' + value_led + '] = (' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
}

export const actuator_use_uart_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var key2 = this.getFieldValue('key2');
    if (key2 == 'SYN6288') {
        generator.definitions_['import_syn6288'] = 'import syn6288';
        var code = v + '=syn6288.SYN6288(' + key + ')\n';
        return code;
    } else if (key2 == 'NS9300') {
        generator.definitions_['import_ns9300'] = 'import ns9300';
        var code = v + '=ns9300.NS9300(' + key + ')\n';
        return code;
    }

}

export const player_whether_stop = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '.status(' + key + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const player_set_play = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '.control(' + key + ')\n';
    return code;
}

export const player_set_volume = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var vol = generator.valueToCode(this, 'volume', generator.ORDER_ATOMIC);
    var code = v + '.volume(' + vol + ')\n';
    return code;
}

export const player_set_mode = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '.mode(' + key + ')\n';
    return code;
}

export const player_play_music = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var s = generator.valueToCode(this, 'song', generator.ORDER_ATOMIC);
    var code = v + '.' + key + '(' + s + ')\n';
    return code;
}

export const syn6288_set_voice = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var voice = generator.valueToCode(this, 'VOICE', generator.ORDER_ASSIGNMENT);
    var code = v + ".volume(" + voice + ")\n";
    return code;
}

export const syn6288_get_voice = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + ".volume()";
    return [code, generator.ORDER_ATOMIC];
}

export const syn6288_builtin_voice = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var voice = generator.valueToCode(this, 'VOICE', generator.ORDER_ASSIGNMENT);
    var code = v + ".hint_tones(" + voice + ',blocking=' + mode + ")\n";
    return code;
}

export const syn6288_tts_play = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var voice = generator.valueToCode(this, 'VOICE', generator.ORDER_ASSIGNMENT);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".synthesis(" + data + ',music=' + voice + ',blocking=' + mode + ")\n";
    return code;
}

//mixbot extern below:
export const mixbot_addr_extern = function (_, generator) {
    var code = this.getFieldValue('PIN');
    return [code, generator.ORDER_ATOMIC];
}

export const robot_motor_extern = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_motor'] = 'from mixbot_ext import ext_motor';
        var code = 'ext_motor.run(' + mode + ',' + speed + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_motor'] = 'ext_motor_left = i2cdevice.Motor(ext_i2c_left)';
            var code = 'ext_motor_left.run(0,' + speed + ')\n';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_motor'] = 'ext_motor_right = i2cdevice.Motor(ext_i2c_right)';
            var code = 'ext_motor_right.run(0,' + speed + ')\n';
        }
        return code;
    }
}

export const robot_motor_extern_get_speed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        var code = 'ext_motor.run(' + mode + ")";
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_motor'] = 'ext_motor_left = i2cdevice.Motor(ext_i2c_left)';
            var code = 'ext_motor_left.run()';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_motor'] = 'ext_motor_right = i2cdevice.Motor(ext_i2c_right)';
            var code = 'ext_motor_right.run()';
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_traffic_light_extern = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var light = this.getFieldValue('light');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_traffic'] = 'from mixbot_ext import ext_traffic';
        var mode = this.getFieldValue('mode');
        var light = this.getFieldValue('light');
        var code = 'ext_traffic.led(' + mode + ',';
        if (light == '0' || light == '1' || light == '2') { code += '0' + ',' }
        else if (light == '3' || light == '4') { code += '1' + ',' }
        else if (light == '5' || light == '6') { code += '2' + ',' }
        if (light == '0') { code += '0' }
        else if (light == '1' || light == '3' || light == '5') { code += '1' }
        else if (light == '2' || light == '4' || light == '6') { code += '-1' }
        code += ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_traffic'] = 'ext_traffic_left = i2cdevice.Traffic_LED(ext_i2c_left)';
            var code = 'ext_traffic_left.led(0,';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_traffic'] = 'ext_traffic_right = i2cdevice.Traffic_LED(ext_i2c_right)';
            var code = 'ext_traffic_right.led(0,';
        }
        if (light == '0' || light == '1' || light == '2') { code += '0' + ',' }
        else if (light == '3' || light == '4') { code += '1' + ',' }
        else if (light == '5' || light == '6') { code += '2' + ',' }
        if (light == '0') { code += '0' }
        else if (light == '1' || light == '3' || light == '5') { code += '1' }
        else if (light == '2' || light == '4' || light == '6') { code += '-1' }
        code += ")\n";
        return code;
    }
}

export const robot_led_extern = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var color = this.getFieldValue('color');
    var value = generator.valueToCode(this, 'value', generator.ORDER_ATOMIC);
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_' + color + '_LED'] = 'from mixbot_ext import ' + color + '_LED';
        var code = color + '_LED.brightness(' + mode + ',' + value + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_' + color + '_LED'] = 'ext_' + color + '_LED_left = i2cdevice.' + color + '_LED(ext_i2c_left)';
            var code = 'ext_' + color + '_LED_left.brightness(' + '0,' + value + ")\n";
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_' + color + '_LED'] = 'ext_' + color + '_LED_right = i2cdevice.' + color + '_LED(ext_i2c_right)';
            var code = 'ext_' + color + '_LED_right.brightness(' + '0,' + value + ")\n";
        }
        return code;
    }
}

export const robot_led_extern_get_value = function (_, generator) {
    var mode = this.getFieldValue('mode');
    var color = this.getFieldValue('color');
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_' + color + '_LED'] = 'from mixbot_ext import ' + color + '_LED';
        var code = color + '_LED.brightness(' + mode + ")";
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_' + color + '_LED'] = 'ext_' + color + '_LED_left = i2cdevice.' + color + '_LED(ext_i2c_left)';
            var code = 'ext_' + color + '_LED_left.brightness(0)';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_' + color + '_LED'] = 'ext_' + color + '_LED_right = i2cdevice.' + color + '_LED(ext_i2c_right)';
            var code = 'ext_' + color + '_LED_right.brightness(0)';
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_servo_extern_get_status = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.state(' + mode + ")" + status;
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.state(0)' + status;
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.state(0)' + status;
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_servo_extern_stop_mode = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.stop_mode(' + mode + "," + status + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.stop_mode(' + "0," + status + ")\n";
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.stop_mode(' + "0," + status + ")\n";
        }
        return code;
    }
}

export const robot_servo_extern_stop = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.stop(' + mode + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.stop(0)\n';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.stop(0)\n';
        }
        return code;
    }
}

export const robot_servo_extern_absolute_run = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var direction = this.getFieldValue('direction');
    var angle = generator.valueToCode(this, 'angle', generator.ORDER_ATOMIC);
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.absolute_run(' + mode + "," + status + "," + speed + "," + direction + "," + angle + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.absolute_run(' + "0," + status + "," + speed + "," + direction + "," + angle + ")\n";
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.absolute_run(' + "0," + status + "," + speed + "," + direction + "," + angle + ")\n";
        }
        return code;
    }
}

export const robot_servo_extern_relative_origin = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.relative_origin(' + mode + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.relative_origin(0)\n';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.relative_origin(0)\n';
        }
        return code;
    }
}

export const robot_servo_extern_relative_run = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var angle = generator.valueToCode(this, 'angle', generator.ORDER_ATOMIC);
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.relative_run(' + mode + "," + status + "," + speed + "," + angle + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.relative_run(' + "0," + status + "," + speed + "," + angle + ")\n";
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.relative_run(' + "0," + status + "," + speed + "," + angle + ")\n";
        }
        return code;
    }
}

export const robot_servo_extern_relative_continue = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var status = this.getFieldValue('status');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var direction = this.getFieldValue('direction');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_servo'] = 'from mixbot_ext import ext_servo';
        var code = 'ext_servo.relative_continue(' + mode + "," + status + "," + speed + "," + direction + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_servo'] = 'ext_servo_left = i2cdevice.Motor_servo(ext_i2c_left)';
            var code = 'ext_servo_left.relative_continue(' + "0," + status + "," + speed + "," + direction + ")\n";
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_servo'] = 'ext_servo_right = i2cdevice.Motor_servo(ext_i2c_right)';
            var code = 'ext_servo_right.relative_continue(' + "0," + status + "," + speed + "," + direction + ")\n";
        }
        return code;
    }
}

export const mixbot_actuator_extern_get_addr = function (_, generator) {
    var name = this.getFieldValue('name');
    generator.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var code = name + '.addr_get()';
    return [code, generator.ORDER_ATOMIC];
}

export const mixbot_actuator_extern_set_addr = function (_, generator) {
    var name = this.getFieldValue('name');
    generator.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var oldaddr = generator.valueToCode(this, 'old', generator.ORDER_ATOMIC);
    var newaddr = generator.valueToCode(this, 'new', generator.ORDER_ATOMIC);
    var code = name + '.addr_set(' + oldaddr + ',' + newaddr + ')\n';
    return code;
}

//educore
export const PIN_init = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'pin'] = 'from ' + version + ' import pin';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'pin(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const pin_led_bright = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var pin = generator.valueToCode(this, 'pin', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + 'pin'] = 'from ' + version + ' import pin';
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = pin + ".write_digital(value=" + bright + ")\n";
    return code;
}

export const servo_PIN_init = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'servo'] = 'from ' + version + ' import servo';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'servo(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const servo_move_angle = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'servo'] = 'from ' + version + ' import servo';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var a = generator.valueToCode(this, 'angle', generator.ORDER_ATOMIC);
    var code = sub + '.angle(' + a + ')\n';
    return code;
}

export const parrot_PIN_init = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'parrot'] = 'from ' + version + ' import parrot';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'parrot(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const parrot_move_speed = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'parrot'] = 'from ' + version + ' import parrot';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = sub + '.speed(' + speed + ')\n';
    return code;
}