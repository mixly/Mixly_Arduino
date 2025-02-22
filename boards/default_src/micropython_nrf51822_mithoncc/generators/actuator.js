export const microbit_music_play_built_in = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    var dropdown_melody = block.getFieldValue('melody');
    var pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
    return code;
}

export const microbit_music_play_built_in_easy = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    var dropdown_melody = block.getFieldValue('melody');
    var pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC);
    var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin + ')\n';
    return code;
}

export const microbit_music_pitch_delay = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    generator.definitions_['import_math'] = 'import math';
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    var number_duration = generator.valueToCode(block, 'duration', generator.ORDER_ATOMIC);
    var pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC);
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var code = 'music.pitch(round(' + number_pitch + '), round(' + number_duration + '), pin' + pin + ', wait = ' + checkbox_wait + ')\n';
    return code;
}

export const microbit_music_pitch = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    generator.definitions_['import_math'] = 'import math';
    var number_pitch = generator.valueToCode(block, 'pitch', generator.ORDER_ATOMIC);
    // var number_duration = generator.valueToCode(block, 'duration', generator.ORDER_ATOMIC);
    var pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC);
    var code = 'music.pitch(round(' + number_pitch + '), pin=pin' + pin + ')\n';
    return code;
}

export const microbit_music_play_list_of_notes = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    var pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC);
    var value_notes = generator.valueToCode(block, 'notes', generator.ORDER_ATOMIC) || '[]';
    var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
    var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
    var code = 'music.play(' + value_notes + ', pin=pin' + pin + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
    return code;
}

export const microbit_music_reset = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    var code = 'music.reset()\n';
    return code;
}

export const microbit_music_stop = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    var pin = generator.valueToCode(block, 'PIN', generator.ORDER_ATOMIC);
    var code = 'music.stop(pin' + pin + ')\n';
    return code;
}

export const microbit_music_get_tempo = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_music'] = 'import music';
    var code = 'music.get_tempo()';
    return [code, generator.ORDER_ATOMIC];
}

export const tone_set_tempo = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var bpm = generator.valueToCode(this, 'BPM', generator.ORDER_ASSIGNMENT);
    var ticks = generator.valueToCode(this, 'TICKS', generator.ORDER_ASSIGNMENT);
    var code = "music.set_tempo(ticks=" + ticks + ", bpm=" + bpm + ")\n";
    return code;
}

export const speech_translate = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_speech'] = 'import speech';
    var text = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = ["speech.translate(" + text + ")", generator.ORDER_ATOMIC];
    return code
}

export const speech_say = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_speech'] = 'import speech';
    var mode = this.getFieldValue("MODE");
    var text = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var pitch = generator.valueToCode(this, 'pitch', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var mouth = generator.valueToCode(this, 'mouth', generator.ORDER_ATOMIC);
    var throat = generator.valueToCode(this, 'throat', generator.ORDER_ATOMIC);
    var code = "speech." + mode + "(" + text + ", pitch=" + pitch + ", speed=" + speed + ", mouth=" + mouth + ", throat=" + throat + ")\n";
    return code
}

// export const speech_sing = function(){
//   generator.definitions_['import_microbit_*'] = 'from microbit import *';
//   generator.definitions_['import_speech'] = 'import speech';
//   var text = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
//   var pitch = generator.valueToCode(this, 'pitch', generator.ORDER_ATOMIC);
//   var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
//   var mouth = generator.valueToCode(this, 'mouth', generator.ORDER_ATOMIC);
//   var throat = generator.valueToCode(this, 'throat', generator.ORDER_ATOMIC);
//   var code = "speech.sing("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// }

// export const speech_prenounce = function(){
//   generator.definitions_['import_microbit_*'] = 'from microbit import *';
//   generator.definitions_['import_speech'] = 'import speech';
//   var text = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
//   var pitch = generator.valueToCode(this, 'pitch', generator.ORDER_ATOMIC);
//   var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
//   var mouth = generator.valueToCode(this, 'mouth', generator.ORDER_ATOMIC);
//   var throat = generator.valueToCode(this, 'throat', generator.ORDER_ATOMIC);
//   var code = "speech.pronounce("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// }

export const speech_say_easy = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_speech'] = 'import speech';
    var text = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "speech.say(" + text + ")\n";
    return code
}

export const speech_sing_easy = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_speech'] = 'import speech';
    var text = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "speech.sing(" + text + ")\n";
    return code
}

export const speech_pronounce_easy = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_speech'] = 'import speech';
    var text = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "speech.pronounce(" + text + ")\n";
    return code
}

export const servo_move = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_Servolib'] = 'import Servo';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_degree = generator.valueToCode(this, 'DEGREE', generator.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin)))
        var code = 'Servo.angle(pin' + dropdown_pin + ', ' + value_degree + ')\n';
    else
        var code = 'Servo.angle(' + dropdown_pin + ', ' + value_degree + ')\n';
    return code;
}

export const bit_motor_control = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_motor_control'] = 'import motor_control';

    var Motor = this.getFieldValue('Motor');
    var mode = this.getFieldValue('mode');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);

    var code = 'motor_control.MotorRun(' + Motor + ', ' + mode + '' + speed + ')\n';
    return code;
}

export const display_rgb_init = function (_, generator) {
    var dropdown_rgbpin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_ledcount = generator.valueToCode(this, 'LEDCOUNT', generator.ORDER_ATOMIC);
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    // generator.definitions_['include_display'] = '#include "Mixly.h"';
    generator.setups_['var_rgb_display' + dropdown_rgbpin] = 'np = neopixel.NeoPixel(pin' + dropdown_rgbpin + ', ' + value_ledcount + ')\n';
    // generator.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    // generator.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
}

export const display_rgb = function (_, generator) {
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    var code = 'np[' + value_led + '] = (' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
}

export const display_rgb2 = function (_, generator) {
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
    var color = colour_rgb_led_color;
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    var code = 'np[' + value_led + '] = (' + color + ')\n';
    code += 'np.show()\n';
    return code;
}

export const display_rgb_show = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    var code = 'np.show()\n';
    return code;
}

export const MP3_INIT = function (_, generator) {
    var dropdown_pin1 = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var dropdown_pin2 = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin1)))
        dropdown_pin1 = "pin" + dropdown_pin1;
    if (!isNaN(parseInt(dropdown_pin2)))
        dropdown_pin2 = "pin" + dropdown_pin2;
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + ' = ' + 'QJ00X_MP3(mp3_rx=' + dropdown_pin1 + ', mp3_tx=' + dropdown_pin2 + ')\n';
    return code;
}

// mp3 控制播放
export const MP3_CONTROL = function (_, generator) {
    var CONTROL_TYPE = this.getFieldValue('CONTROL_TYPE');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.' + CONTROL_TYPE + '()\n';
    return code;
}

// mp3 循环模式
export const MP3_LOOP_MODE = function (_, generator) {
    var LOOP_MODE = this.getFieldValue('LOOP_MODE');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_loop(' + LOOP_MODE + ')\n';
    return code;
}

// mp3 EQ模式
export const MP3_EQ_MODE = function (_, generator) {
    var EQ_MODE = this.getFieldValue('EQ_MODE');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_eq(' + EQ_MODE + ')\n';
    return code;
}

// mp3 设置音量
export const MP3_VOL = function (_, generator) {
    var vol = generator.valueToCode(this, 'vol', generator.ORDER_ATOMIC);
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_vol(' + vol + ')\n';
    return code;
}

// mp3 播放第N首
export const MP3_PLAY_NUM = function (_, generator) {
    var NUM = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.playFileByIndexNumber(' + NUM + ')\n';
    return code;
}

export const MP3_PLAY_FOLDER = function (_, generator) {
    var FOLDER = generator.valueToCode(this, 'FOLDER', generator.ORDER_ATOMIC);
    var NUM = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_QJ00X_MP3'] = 'from MP3 import QJ00X_MP3';
    var code = 'mp3' + '.set_folder(' + FOLDER + ', ' + NUM + ')\n';
    return code;
}