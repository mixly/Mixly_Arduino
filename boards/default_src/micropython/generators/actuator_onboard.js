import { Boards } from 'mixly';

export const esp32_music_set_tempo = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_music'] = 'from ' + version + ' import onboard_music';
    var bpm = generator.valueToCode(this, 'BPM', generator.ORDER_ASSIGNMENT);
    var ticks = generator.valueToCode(this, 'TICKS', generator.ORDER_ASSIGNMENT);
    var code = "onboard_music.set_tempo(" + ticks + ", " + bpm + ")\n";
    return code;
}

export const esp32_music_get_tempo = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_music'] = 'from ' + version + ' import onboard_music';
    var code = "onboard_music.get_tempo()";
    return [code, generator.ORDER_ATOMIC];
}

export const esp32_onboard_music_pitch = function (block, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_music'] = 'from ' + version + ' import onboard_music';
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var code = 'onboard_music.pitch(' + number_pitch + ')\n';
    return code;
}

export const esp32_onboard_music_pitch_with_time = function (block, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var number_time = generator.valueToCode(block, 'time', generator.ORDER_ATOMIC);
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_spk_midi'] = "from mixgo_zero_voice import spk_midi";
        var code = 'spk_midi.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    } else if (version == 'mixgo_nova') {
        generator.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
        var code = 'spk_midi.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    } else {
        generator.definitions_['import_' + version + '_onboard_music'] = 'from ' + version + ' import onboard_music';
        var code = 'onboard_music.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    }
    return code;
}

export const esp32_onboard_music_stop = function (block, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_music'] = 'from ' + version + ' import onboard_music';
    var code = 'onboard_music.stop(' + ')\n';
    return code;
}

export const esp32_onboard_music_play_list = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var lst = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT);
    if (version == 'mixgo_sant') {
        generator.definitions_['import_mixgo_sant_onboard_music'] = "from mixgo_sant import onboard_music";
        var code = "onboard_music.play(" + lst + ")\n";
    } else if (version == 'mixgo_nova') {
        generator.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
        var code = "spk_midi.play(" + lst + ")\n";
    } else {
        generator.definitions_['import_' + version + '_onboard_music'] = 'from ' + version + ' import onboard_music';
        var code = "onboard_music.play(" + lst + ")\n";
    }
    return code;
}

export const esp32_music_reset = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_music'] = 'from ' + version + ' import onboard_music';
    return "onboard_music.reset()\n";
}

export const number = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const ledswitch = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_led_bright = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_led'] = 'from ' + version + ' import onboard_led';
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "onboard_led.setonoff(" + op + "," + bright + ")\n";
    return code;
}

export const actuator_get_led_bright = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_led'] = 'from ' + version + ' import onboard_led';
    var code = "onboard_led.getbrightness(" + op + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_get_led_state = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_led'] = 'from ' + version + ' import onboard_led';
    var code = "onboard_led.getonoff(" + op + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_led_brightness = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_led'] = 'from ' + version + ' import onboard_led';
    var flag = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "onboard_led.setbrightness(" + op + "," + flag + ")\n";
    return code;
}

export const actuator_mixgo_zero_led_color = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_led'] = 'from ' + version + ' import onboard_led';
    var color = this.getFieldValue('colorvalue');
    var code = "onboard_led.setcolor(" + op + "," + color + ")\n";
    return code;
}

export const cc_number = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const rm_actuator_led_bright = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    generator.definitions_['import_' + version + '_' + op + 'led'] = 'from ' + version + ' import ' + op + 'led';
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = op + "led.setonoff(" + bright + ")\n";
    return code;
}

export const rm_actuator_get_led_bright = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    generator.definitions_['import_' + version + '_' + op + 'led'] = 'from ' + version + ' import ' + op + 'led';
    var code = op + "led.getbrightness()";
    return [code, generator.ORDER_ATOMIC];
}

export const rm_actuator_get_led_state = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    generator.definitions_['import_' + version + '_' + op + 'led'] = 'from ' + version + ' import ' + op + 'led';
    var code = op + "led.getonoff()";
    return [code, generator.ORDER_ATOMIC];
}

export const rm_actuator_led_brightness = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var op = this.getFieldValue('color');
    generator.definitions_['import_' + version + '_' + op + 'led'] = 'from ' + version + ' import ' + op + 'led';
    var flag = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = op + "led.setbrightness(" + flag + ")\n";
    return code;
}

export const actuator_onboard_neopixel_write = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_rgb'] = 'from ' + version + ' import onboard_rgb';
    var code = 'onboard_rgb.write()\n';
    return code;
}

export const actuator_onboard_neopixel_rgb = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_rgb'] = 'from ' + version + ' import onboard_rgb';
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var code = 'onboard_rgb[' + value_led + '] = (' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
}

export const actuator_onboard_neopixel_rgb_all = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_rgb'] = 'from ' + version + ' import onboard_rgb';
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var code = 'onboard_rgb.fill((' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + '))\n';
    return code;
}

export const actuator_onboard_neopixel_rgb_show_all_chase = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_rgb'] = 'from ' + version + ' import onboard_rgb';
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var number_time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var code = 'onboard_rgb.color_chase(' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ', ' + number_time + ')\n';
    return code;
}

export const actuator_onboard_neopixel_rgb_show_all_rainbow = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_rgb'] = 'from ' + version + ' import onboard_rgb';
    var number_time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var code = 'onboard_rgb.rainbow_cycle(' + number_time + ')\n';
    return code;
}

export const rm_motor = function (_, generator) {
    var wheel = this.getFieldValue('wheel');
    generator.definitions_['import_rm_e1_motor' + wheel] = 'from rm_e1 import motor' + wheel;
    var v = this.getFieldValue('direction');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = "motor" + wheel + '.motion("' + v + '",' + speed + ")\n";
    return code;
}

//c3 motor onboard
export const actuator_stepper_keep = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ASSIGNMENT);
    var code = 'car.motor_move("' + v + '",' + speed + ")\n";
    return code;
}

export const actuator_stepper_stop = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var code = 'car.motor_move("' + v + '"' + ")\n";
    return code;
}

export const actuator_dc_motor = function (_, generator) {
    var wheel = this.getFieldValue('wheel');
    generator.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var v = this.getFieldValue('direction');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = "car.motor(car.MOTO_" + wheel + ',"' + v + '",' + speed + ")\n";
    return code;
}

export const actuator_dc_motor_stop = function (_, generator) {
    var wheel = this.getFieldValue('wheel');
    generator.definitions_['import_mixgocar_c3_car'] = 'from mixgocar_c3 import car';
    var v = this.getFieldValue('direction');
    var code = "car.motor(car.MOTO_" + wheel + ',"' + v + '"' + ")\n";
    return code;
}

//mixbot onboard_motor below:

export const mixbot_motor_status = function (_, generator) {
    generator.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    var code = 'motor.status()';
    return [code, generator.ORDER_ATOMIC];
}

export const mixbot_move = function (_, generator) {
    var v = this.getFieldValue('VAR');
    var mode = this.getFieldValue('mode');
    generator.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ASSIGNMENT);
    var code = 'motor.move("' + v + '",motor.' + mode + '_MODE,' + speed + ")\n";
    return code;
}

export const mixbot_stop = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    if (v == 'N') {
        var code = 'motor.move("N",motor.STOP_MODE)\n'
    } else if (v == 'P') {
        var code = 'motor.move("P",motor.BRAKE_MODE)\n'
    }
    return code;
}

export const mixbot_motor = function (_, generator) {
    var wheel = this.getFieldValue('wheel');
    generator.definitions_['import_mixbot_motor'] = 'from mixbot import motor';
    var mode = this.getFieldValue('mode');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = 'motor.run(' + wheel + ',motor.' + mode + '_MODE,' + speed + ")\n";
    return code;
}

export const actuator_mixbot_buzzer_on_off = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_spk_en'] = 'from ' + version + ' import spk_en';
    var op = this.getFieldValue('on_off');
    var code = "spk_en.value(" + op + ")\n";
    return code;
}

//bitbot onboard_motor below:
export const bitbot_move = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ASSIGNMENT);
    var code = 'onboard_bot51.move("' + v + '",' + speed + ")\n";
    return code;
}

export const bitbot_stop = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var code = 'onboard_bot51.move("' + v + '"' + ")\n";
    return code;
}

export const bitbot_motor = function (_, generator) {
    var wheel = this.getFieldValue('wheel');
    var direction = this.getFieldValue('direction');
    generator.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = 'onboard_bot51.motor(' + wheel + ',"' + direction + '",' + speed + ")\n";
    return code;
}

export const actuator_mixgo_nova_mic_set = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";
    } else {
        generator.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    }

    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "ob_code.mic_volume(" + bright + ")\n";
    return code;
}

export const actuator_mixgo_nova_mic_get = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";
    } else {
        generator.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    }
    var code = "ob_code.mic_volume()";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_mixgo_nova_voice_set = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";
    } else {
        generator.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    }
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "ob_code.voice_volume(" + bright + ")\n";
    return code;
}

export const actuator_mixgo_nova_voice_get = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_ob_code'] = "from mixgo_zero_voice import ob_code";
    } else {
        generator.definitions_['import_mixgo_nova_voice_ob_code'] = "from mixgo_nova_voice import ob_code";
    }
    var code = "ob_code.voice_volume()";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_mixgo_nova_record_audio = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_record_audio'] = "from mixgo_zero_voice import record_audio";
    } else {
        generator.definitions_['import_mixgo_nova_voice_record_audio'] = "from mixgo_nova_voice import record_audio";
    }
    var path = generator.valueToCode(this, 'PATH', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'TIME', generator.ORDER_ASSIGNMENT);
    var code = "record_audio(" + path + ", " + time + ")\n";
    return code;
}

export const actuator_mixgo_nova_play_audio = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_play_audio'] = "from mixgo_zero_voice import play_audio";
    } else {
        generator.definitions_['import_mixgo_nova_voice_play_audio'] = "from mixgo_nova_voice import play_audio";
    }
    var path = generator.valueToCode(this, 'PATH', generator.ORDER_ASSIGNMENT);
    var code = "play_audio(" + path + ")\n";
    return code;
}

export const actuator_mixgo_nova_play_online_audio = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    if (version == 'mixgo_zero') {
        generator.definitions_['import_mixgo_zero_voice_play_audio_url'] = "from mixgo_zero_voice import play_audio_url";
    } else {
        generator.definitions_['import_mixgo_nova_voice_play_audio_url'] = "from mixgo_nova_voice import play_audio_url";
    }
    var path = generator.valueToCode(this, 'PATH', generator.ORDER_ASSIGNMENT);
    var code = "play_audio_url(" + path + ")\n";
    return code;
}

export const actuator_mixgo_nova_onboard_music_pitch = function (block, generator) {
    generator.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var code = 'spk_midi.pitch(' + number_pitch + ')\n';
    return code;
}

export const actuator_mixgo_nova_onboard_music_stop = function (block, generator) {
    generator.definitions_['import_mixgo_nova_voice_spk_midi'] = "from mixgo_nova_voice import spk_midi";
    var code = 'spk_midi.stop(' + ')\n';
    return code;
}

export const set_power_output = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var index = this.getFieldValue('index');
    var duty = generator.valueToCode(this, 'duty', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
    var code = 'onboard_bot.usben(' + index + ',' + duty + ')\n';
    return code;
}

export const get_power_output = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var index = this.getFieldValue('index');
    generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
    var code = 'onboard_bot.usben(' + index + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const set_all_power_output = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2];
    var duty = generator.valueToCode(this, 'duty', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
    var code = 'onboard_bot.usben(freq = ' + duty + ')\n';
    return code;
}

export const analog_keyboard_input = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var sp = generator.valueToCode(this, 'special', generator.ORDER_ATOMIC);
    var ge = generator.valueToCode(this, 'general', generator.ORDER_ATOMIC);
    var re = this.getFieldValue('release');
    generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
    var code = "onboard_bot.hid_keyboard(" + sp + "," + ge + "," + re + ")\n";
    return code;
}

export const special_key = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const general_key = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const analog_mouse_input = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var wheel = generator.valueToCode(this, 'wheel', generator.ORDER_ATOMIC);
    var re = this.getFieldValue('release');
    generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
    var code = "onboard_bot.hid_mouse(keys=" + key + ",move=(" + x + "," + y + "),wheel=" + wheel + ",release=" + re + ")\n";
    return code;
}

export const mouse_key = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const analog_keyboard_str = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var str = generator.valueToCode(this, 'str', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    generator.definitions_['import_' + version + '_onboard_bot'] = 'from ' + version + ' import onboard_bot';
    var code = "onboard_bot.hid_keyboard_str(" + str + ",delay=" + t + ")\n";
    return code;
}

export const general_key_tuple = function (_, generator) {
    // Create a list with any number of elements of any type.
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    if (this.itemCount_ != 1) {
        var code = '(' + code.join(', ') + ')';
    } else {
        var code = '(' + code.join(', ') + ',)';
    }

    return [code, generator.ORDER_ATOMIC];
};

export const analog_ble_keyboard_init = function (_, generator) {
    generator.definitions_['import_ble_keyboard'] = 'from ble_hid_keyboard import Keyboard';
    var kname = generator.valueToCode(this, 'kname', generator.ORDER_ATOMIC)
    var code = 'ble_keyboard=Keyboard(' + kname + ')\n';
    return code;
}

export const ble_keyboard_get_mac = function (_, generator) {
    generator.definitions_['import_ble_keyboard'] = 'from ble_hid_keyboard import Keyboard';
    var code = 'ble_keyboard.mac';
    return [code, generator.ORDER_ATOMIC];
}

export const ble_keyboard_connect = function (_, generator) {
    generator.definitions_['import_ble_keyboard'] = 'from ble_hid_keyboard import Keyboard';
    var code = 'ble_keyboard.is_connected()';
    return [code, generator.ORDER_ATOMIC];
}

export const analog_ble_keyboard_input = function (_, generator) {
    var sp = generator.valueToCode(this, 'special', generator.ORDER_ATOMIC);
    var ge = generator.valueToCode(this, 'general', generator.ORDER_ATOMIC);
    var re = this.getFieldValue('release');
    generator.definitions_['import_ble_keyboard'] = 'from ble_hid_keyboard import Keyboard';
    var code = "ble_keyboard.notify_hid(" + sp + "," + ge + "," + re + ")\n";
    return code;
}

export const analog_ble_keyboard_str = function (_, generator) {
    var str = generator.valueToCode(this, 'str', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    generator.definitions_['import_ble_keyboard'] = 'from ble_hid_keyboard import Keyboard';
    var code = "ble_keyboard.notify_str(" + str + ",delay=" + t + ")\n";
    return code;
}

export const analog_ble_keyboard_send_battery = function (_, generator) {
    var b = generator.valueToCode(this, 'battery', generator.ORDER_ATOMIC);
    generator.definitions_['import_ble_keyboard'] = 'from ble_hid_keyboard import Keyboard';
    var code = "ble_keyboard.notify_battery(" + b + ")\n";
    return code;
}

export const analog_ble_mouse_init = function (_, generator) {
    generator.definitions_['import_ble_mouse'] = 'from ble_hid_mouse import Mouse';
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC)
    var code = 'ble_mouse=Mouse(' + name + ')\n';
    return code;
}

export const ble_mouse_get_mac = function (_, generator) {
    generator.definitions_['import_ble_mouse'] = 'from ble_hid_mouse import Mouse';
    var code = 'ble_mouse.mac';
    return [code, generator.ORDER_ATOMIC];
}

export const ble_mouse_connect = function (_, generator) {
    generator.definitions_['import_ble_mouse'] = 'from ble_hid_mouse import Mouse';
    var code = 'ble_mouse.is_connected()';
    return [code, generator.ORDER_ATOMIC];
}

export const analog_ble_mouse_input = function (_, generator) {
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var wheel = generator.valueToCode(this, 'wheel', generator.ORDER_ATOMIC);
    var re = this.getFieldValue('release');
    generator.definitions_['import_ble_mouse'] = 'from ble_hid_mouse import Mouse';
    var code = "ble_mouse.notify_hid(" + key + ",(" + x + "," + y + ")," + wheel + "," + re + ")\n";
    return code;
}

export const analog_ble_mouse_send_battery = function (_, generator) {
    var b = generator.valueToCode(this, 'battery', generator.ORDER_ATOMIC);
    generator.definitions_['import_ble_mouse'] = 'from ble_hid_mouse import Mouse';
    var code = "ble_mouse.notify_battery(" + b + ")\n";
    return code;
}

export const analog_ble_keyboard_mouse_init = function (_, generator) {
    generator.definitions_['import_HID_ble_hid'] = 'from ble_hid import HID';
    var kname = generator.valueToCode(this, 'kname', generator.ORDER_ATOMIC)
    var code = 'ble_hid = HID(' + kname + ')\n';
    return code;
}

export const ble_keyboard_mouse_get_mac = function (_, generator) {
    generator.definitions_['import_HID_ble_hid'] = 'from ble_hid import HID';
    var code = 'ble_hid.mac';
    return [code, generator.ORDER_ATOMIC];
}

export const ble_keyboard_mouse_connect = function (_, generator) {
    generator.definitions_['import_HID_ble_hid'] = 'from ble_hid import HID';
    var code = 'ble_hid.is_connected()';
    return [code, generator.ORDER_ATOMIC];
}

export const analog_ble_keyboard_mouse_send_battery = function (_, generator) {
    var b = generator.valueToCode(this, 'battery', generator.ORDER_ATOMIC);
    generator.definitions_['import_HID_ble_hid'] = 'from ble_hid import HID';
    var code = "ble_hid.battery_notify(" + b + ")\n";
    return code;
}

export const analog_ble_keyboard_mouse_input = function (_, generator) {
    var sp = generator.valueToCode(this, 'special', generator.ORDER_ATOMIC);
    var ge = generator.valueToCode(this, 'general', generator.ORDER_ATOMIC);
    var re = this.getFieldValue('release');
    generator.definitions_['import_HID_ble_hid'] = 'from ble_hid import HID';
    var code = "ble_hid.keyboard_notify(" + sp + "," + ge + "," + re + ")\n";
    return code;
}

export const analog_ble_keyboard_mouse_str = function (_, generator) {
    var str = generator.valueToCode(this, 'str', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    generator.definitions_['import_HID_ble_hid'] = 'from ble_hid import HID';
    var code = "ble_hid.keyboard_str(" + str + ",delay=" + t + ")\n";
    return code;
}

export const analog_ble_mouse_keyboard_input = function (_, generator) {
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var wheel = generator.valueToCode(this, 'wheel', generator.ORDER_ATOMIC);
    var re = this.getFieldValue('release');
    generator.definitions_['import_HID_ble_hid'] = 'from ble_hid import HID';
    var code = "ble_hid.mouse_notify(" + key + ",(" + x + "," + y + ")," + wheel + "," + re + ")\n";
    return code;
}
//educore actuator
export const educore_buzzer = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_speaker'] = 'from ' + version + ' import spesker';
    var code = "speaker()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_buzzer_play_tone = function (block, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_speaker'] = 'from ' + version + ' import spesker';
    var bu = generator.valueToCode(this, 'buzzer', generator.ORDER_ATOMIC);
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var code = bu+'.tone(freq=[' + number_pitch + '])\n';
    return code;
}

export const educore_buzzer_play_tone_time = function (block, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_speaker'] = 'from ' + version + ' import spesker';
    var bu = generator.valueToCode(this, 'buzzer', generator.ORDER_ATOMIC);
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var number_time = generator.valueToCode(block, 'time', generator.ORDER_ATOMIC);
    var code = bu+'.tone(freq=' + number_pitch + ', dur=' + number_time + ')\n';
    return code;
}

export const educore_buzzer_stop = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_speaker'] = 'from ' + version + ' import spesker';
    var bu = generator.valueToCode(this, 'buzzer', generator.ORDER_ATOMIC);
    var code = bu+'.stop()\n';
    return code;
}

export const educore_rgb_light = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'rgb'] = 'from ' + version + ' import rgb';
    var code = "rgb()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_neopixel_rgb = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'rgb'] = 'from ' + version + ' import rgb';
    var rgb = generator.valueToCode(this, 'rgb', generator.ORDER_ATOMIC);
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var code = rgb+'.write(index[' + value_led + '], r=int(' + value_rvalue + '), g=int(' + value_gvalue + '), b=int(' + value_bvalue + '))\n';
    return code;
}

export const educore_neopixel_clear = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'rgb'] = 'from ' + version + ' import rgb';
    var rgb = generator.valueToCode(this, 'rgb', generator.ORDER_ATOMIC);
    var code = rgb+'.clear()\n';
    return code;
}

export const educore_ble_sensor_init = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_hid'] = 'from ' + version + ' import hid';
    var n = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    var code = 'hid.(name='+ n +')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_ble_sensor_connected = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_hid'] = 'from ' + version + ' import hid';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub+'.isconnected()';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_ble_keyboard_input = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_keycode'] = 'from ' + version + ' import keycode';
    var ge = generator.valueToCode(this, 'general', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub+".keyboard_send("+ ge + ")\n";
    return code;
}