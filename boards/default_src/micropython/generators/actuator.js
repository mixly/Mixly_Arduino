export const esp32_music_pitch = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var number_pitch = generator.valueToCode(this, 'pitch', generator.ORDER_ATOMIC);
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'music.pitch(' + pin + ', ' + number_pitch + ')\n';
    return code;
}

export const esp32_music_pitch_with_time = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var number_pitch = generator.valueToCode(this, 'pitch', generator.ORDER_ATOMIC);
    var number_time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'music.pitch_time(' + pin + ', ' + number_pitch + ', ' + number_time + ')\n';
    return code;
}

export const esp32_music_stop = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'music.stop(' + pin + ')\n';
    return code;
}

export const esp32_music_set_tempo = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var bpm = generator.valueToCode(this, 'BPM', generator.ORDER_ASSIGNMENT);
    var ticks = generator.valueToCode(this, 'TICKS', generator.ORDER_ASSIGNMENT);
    var code = "music.set_tempo(" + ticks + ", " + bpm + ")\n";
    return code;
}

export const esp32_music_get_tempo = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var code = "music.get_tempo()";
    return [code, generator.ORDER_ATOMIC];
}

export const esp32_onboard_music_pitch = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var number_pitch = generator.valueToCode(this, 'pitch', generator.ORDER_ATOMIC);
    var code = 'music.pitch(' + number_pitch + ')\n';
    return code;
}

export const esp32_onboard_music_pitch_with_time = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var number_pitch = generator.valueToCode(this, 'pitch', generator.ORDER_ATOMIC);
    var number_time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var code = 'music.pitch_time(' + number_pitch + ', ' + number_time + ')\n';
    return code;
}

export const esp32_onboard_music_stop = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var code = 'music.stop(' + ')\n';
    return code;
}

export const esp32_onboard_music_play_list = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var lst = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT);
    var code = "music.play(" + lst + ")\n";
    return code;
}

export const esp32_music_play_list = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    var lst = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT);
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ASSIGNMENT);
    var code = "music.play(" + lst + ", " + pin + ")\n";
    return code;
}

export const esp32_mixgo_music_play_list_show = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    generator.definitions_['import_matrix'] = 'import matrix';
    var lst = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT);
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ASSIGNMENT);
    // var display = generator.valueToCode(this, 'DISPLAY', generator.ORDER_ASSIGNMENT);
    var code = "music.play_show(" + lst + ", " + pin + ")\n";
    return code;
}

export const esp32_music_reset = function (_, generator) {
    generator.definitions_['import_music'] = 'import music';
    return "music.reset()\n";
}

export const servo_move = function (_, generator) {
    generator.definitions_['import_servo'] = 'import servo';
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_degree = generator.valueToCode(this, 'DEGREE', generator.ORDER_ATOMIC);
    var code = 'servo.servo_write_angle(' + dropdown_pin + ',' + value_degree + ')\n';
    return code;
}

export const number = function (_, generator) {
    var code = this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const ledswitch = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_extern_led_bright = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.led(" + pin + ").setonoff(" + bright + ")\n";
    return code;
}

export const actuator_extern_get_led_bright = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "mixgo.led(" + pin + ").getonoff(" + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_extern_led_brightness = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var flag = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = 'mixgo.led(' + pin + ').setbrightness(' + flag + ')\n';
    return code;
}

export const actuator_led_bright = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.led" + op + ".setonoff(" + bright + ")\n";
    return code;
}

export const actuator_get_led_bright = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    var code = "mixgo.led" + op + ".getonoff(" + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const actuator_led_brightness = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    var flag = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = 'mixgo.led' + op + '.setbrightness(' + flag + ')\n';
    return code;
}

export const actuator_neopixel_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_rgbpin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_ledcount = generator.valueToCode(this, 'LEDCOUNT', generator.ORDER_ATOMIC);
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    var code = v + ' = neopixel.NeoPixel(machine.Pin(' + dropdown_rgbpin + '), ' + value_ledcount + ', timing = True)\n';
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

export const actuator_onboard_neopixel_write = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var code = 'mixgo.rgb.write()\n';
    return code;
}

export const actuator_onboard_neopixel_rgb = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var code = 'mixgo.rgb[' + value_led + '] = (' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
}

export const actuator_onboard_neopixel_rgb_all = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    var code = 'mixgo.rgb.fill((' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + '))\n';
    return code;
}

export const led_light = actuator_led_bright;
export const get_led_bright = actuator_get_led_bright;
export const led_brightness = actuator_led_brightness;