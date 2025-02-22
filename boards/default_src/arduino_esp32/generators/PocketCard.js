import { sensor_sound } from './sensor';

export const mixgo_button_is_pressed = function (_, generator) {
    var btn = this.getFieldValue('PIN');
    generator.setups_['setup_btn' + btn] = 'pinMode(' + btn + ',INPUT);';
    var code = 'digitalRead(' + btn + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_sound = sensor_sound;

export const mixgo_touch_pin = function (_, generator) {
    var touch_pin = this.getFieldValue('touch_pin');
    var code = 'touchRead(' + touch_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_light = function (_, generator) {
    var direction = this.getFieldValue('direction');
    var code = 'analogRead(' + direction + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const OneButton = function (_, generator) {
    generator.definitions_['include_OneButton'] = '#include <OneButton.h>';
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_mode = this.getFieldValue('mode');
    generator.definitions_['var_declare_button' + dropdown_pin] = 'OneButton button' + dropdown_pin + '(' + dropdown_pin + ',false);';
    generator.setups_['setup_onebutton_' + dropdown_pin + dropdown_mode] = 'button' + dropdown_pin + '.' + dropdown_mode + '(' + dropdown_mode + dropdown_pin + ');';
    var code = 'button' + dropdown_pin + '.tick();';
    var funcName = dropdown_mode + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const NTC_TEMP = function (_, generator) {
    var PIN = 34;
    var NominalResistance = 10000;
    var betaCoefficient = 3380;
    var seriesResistor = 10000;
    generator.definitions_['include_thermistor'] = '#include <thermistor.h>';
    generator.definitions_['var_declare_thermistor' + PIN] = 'THERMISTOR thermistor' + PIN + '(' + PIN + ',' + NominalResistance + "," + betaCoefficient + "," + seriesResistor + ");";
    var code = 'thermistor' + PIN + '.read()/10.0';
    return [code, generator.ORDER_ATOMIC];
}

export const controls_tone = function (_, generator) {
    generator.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var fre = generator.valueToCode(this, 'FREQUENCY', generator.ORDER_ASSIGNMENT) || '0';
    var channel = generator.valueToCode(this, 'CHANNEL', generator.ORDER_ASSIGNMENT) || '0';
    var DELAY_TIME = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " tone(" + dropdown_pin + ", " + fre + ", " + DELAY_TIME + ", " + channel + ");\n";
    return code;
}

export const onboard_tone = function (_, generator) {
    generator.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
    var fre = generator.valueToCode(this, 'FREQUENCY', generator.ORDER_ASSIGNMENT) || '0';
    var channel = generator.valueToCode(this, 'CHANNEL', generator.ORDER_ASSIGNMENT) || '0';
    var DELAY_TIME = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " tone(BUZZER, " + fre + ", " + DELAY_TIME + ", " + channel + ");\n";
    return code;
}

//传感器_重力感应块_获取9轴数据
export const mixgo_MPU9250 = function (_, generator) {
    var dropdown_type = this.getFieldValue('MixGo_MPU9250_GETAB');
    generator.definitions_['include_MPU9250_asukiaaa'] = '#include <MPU9250_asukiaaa.h>';
    generator.definitions_['define_CALIB_SEC'] = '#define CALIB_SEC 20';
    generator.definitions_['var_declare_MPU9250_asukiaaa'] = 'MPU9250_asukiaaa myMPU9250;\n float aX, aY, aZ, aSqrt, gX, gY, gZ, mDirection, mX, mY, mZ;';
    generator.setups_['setup_Wire_begin'] = 'Wire.begin(SDA, SCL);\n';
    generator.setups_['setup_myMPU9250_setWire'] = 'myMPU9250.setWire(&Wire);';
    generator.setups_['setup_myMPU9250_beginAccel'] = 'myMPU9250.beginAccel();';
    generator.setups_['setup_myMPU9250_beginMag'] = 'myMPU9250.beginMag();';
    generator.setups_['setup_myMPU9250_beginGyro'] = 'myMPU9250.beginGyro();';
    var func_setMagMinMaxAndSetOffset = 'void setMagMinMaxAndSetOffset(MPU9250_asukiaaa* sensor, int seconds) {\n'
        + 'unsigned long calibStartAt = millis();\n'
        + 'float magX, magXMin, magXMax, magY, magYMin, magYMax, magZ, magZMin, magZMax;\n'
        + 'sensor->magUpdate();\n'
        + 'magXMin = magXMax = sensor->magX();\n'
        + 'magYMin = magYMax = sensor->magY();\n'
        + 'magZMin = magZMax = sensor->magZ();\n'
        + 'while(millis() - calibStartAt < (unsigned long) seconds * 1000) {\n'
        + ' delay(100);\n'
        + ' sensor->magUpdate();\n'
        + ' magX = sensor->magX();\n'
        + ' magY = sensor->magY();\n'
        + ' magZ = sensor->magZ();\n'
        + ' if (magX > magXMax) magXMax = magX;\n'
        + ' if (magY > magYMax) magYMax = magY;\n'
        + ' if (magZ > magZMax) magZMax = magZ;\n'
        + ' if (magX < magXMin) magXMin = magX;\n'
        + ' if (magY < magYMin) magYMin = magY;\n'
        + ' if (magZ < magZMin) magZMin = magZ;\n'
        + '}\n'
        + 'sensor->magXOffset = - (magXMax + magXMin) / 2;\n'
        + 'sensor->magYOffset = - (magYMax + magYMin) / 2;\n'
        + 'sensor->magZOffset = - (magZMax + magZMin) / 2;\n'
        + '}'
    var code = '';
    if (dropdown_type == "a") code += 'myMPU9250.accelX()';
    if (dropdown_type == "b") code += 'myMPU9250.accelY()';
    if (dropdown_type == "c") code += 'myMPU9250.accelZ()';
    if (dropdown_type == "d") code += 'myMPU9250.gyroX()';
    if (dropdown_type == "e") code += 'myMPU9250.gyroY()';
    if (dropdown_type == "f") code += 'myMPU9250.gyroZ()';
    if (dropdown_type == "g") code += 'myMPU9250.magX()';
    if (dropdown_type == "h") code += 'myMPU9250.magY()';
    if (dropdown_type == "i") code += 'myMPU9250.magZ()';
    if (dropdown_type == "j" || dropdown_type == "h" || dropdown_type == "g" || dropdown_type == "i") {
        generator.setups_['setup_magnetometer'] = 'Serial.println("Start scanning values of magnetometer to get offset values.Rotate your device for " + String(CALIB_SEC) + " seconds.");';
        generator.setups_['setup_setMagMinMaxAndSetOffset'] = 'setMagMinMaxAndSetOffset(&myMPU9250, CALIB_SEC);';
        generator.setups_['setup_magnetometerFinished'] = ' Serial.println("Finished setting offset values.");';
        generator.definitions_[func_setMagMinMaxAndSetOffset] = func_setMagMinMaxAndSetOffset;
        code += 'myMPU9250.magHorizDirection()';
    }
    return [code, generator.ORDER_ATOMIC];
}

//传感器-MPU9250-更新数据
export const MPU9250_update = function () {
    var code = 'myMPU9250.accelUpdate();\nmyMPU9250.gyroUpdate();\nmyMPU9250.magUpdate();\n';
    return code;
}

export const Pocket_rgb = function (_, generator) {
    var COLOR = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_12'] = 'rgb_display_12.begin();';
    var code = 'rgb_display_12.setPixelColor(0,' + COLOR + ');\n';
    return code;
}

export const Pocket_rgb2 = function (_, generator) {
    var COLOR = generator.valueToCode(this, 'COLOR1', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_12'] = 'rgb_display_12.begin();';
    var code = 'rgb_display_12.setPixelColor(0,' + COLOR + ');\n';
    return code;
}

export const Pocket_rgb_Brightness = function (_, generator) {
    var Brightness = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_12'] = 'rgb_display_12.begin();';
    var code = 'rgb_display_12.setBrightness(' + Brightness + ');\n';
    return code;
}

export const Pocket_rgb_show = function () {
    var code = 'rgb_display_12.show();\ndelay(1);\n';
    return code;
}

export const pocket_RGB_color_HSV = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
    var dropdown_rgbpin = 12;
    var H = generator.valueToCode(this, 'H', generator.ORDER_ATOMIC);
    var S = generator.valueToCode(this, 'S', generator.ORDER_ATOMIC);
    var V = generator.valueToCode(this, 'V', generator.ORDER_ATOMIC);
    var code = 'rgb_display_' + dropdown_rgbpin + '.setPixelColor(' + '0, ' + 'rgb_display_' + dropdown_rgbpin + '.ColorHSV(' + H + ',' + S + ',' + V + '));\n';
    return code;
}