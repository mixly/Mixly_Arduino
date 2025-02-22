export const display_rgb_show = function () {
    var dropdown_rgbpin = this.getFieldValue('PIN');
    var code = 'rgb_display_' + dropdown_rgbpin + '.show();\n'
    // +'rgb_display_' + dropdown_rgbpin + '.show();\n'
    //+"delay(1);"
    return code;
}

export const servo_move = function (_, generator) {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = generator.valueToCode(this, 'DEGREE', generator.ORDER_ATOMIC);
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '0'
    generator.definitions_['include_ESP32_Servo'] = '#include <ESP32_Servo.h>';
    generator.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    generator.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ',500,2500);';
    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
    return code;
}

export const servo_writeMicroseconds = function (_, generator) {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = generator.valueToCode(this, 'DEGREE', generator.ORDER_ATOMIC);
    generator.definitions_['include_ESP32_Servo'] = '#include <ESP32_Servo.h>';
    generator.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    generator.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.writeMicroseconds(' + value_degree + ');\n';
    return code;
}

export const servo_read_degrees = function (_, generator) {
    var dropdown_pin = this.getFieldValue('PIN');
    generator.definitions_['include_ESP32_Servo'] = '#include <ESP32_Servo.h>';
    generator.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    generator.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
    var code = 'servo_' + dropdown_pin + '.read()';
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

export const controls_notone = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var channel = generator.valueToCode(this, 'CHANNEL', generator.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " noTone(" + dropdown_pin + ", " + channel + ");\n";
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

export const onboard_notone = function (_, generator) {
    var channel = generator.valueToCode(this, 'CHANNEL', generator.ORDER_ASSIGNMENT) || '0';
    var code = "";
    code = " noTone(BUZZER, " + channel + ");\n";
    return code;
}

// 执行器-电机转动
export const Mixly_motor = function (_, generator) {
    var SPEED_PIN = generator.valueToCode(this, 'PIN1', generator.ORDER_ATOMIC);
    var DIR_PIN = generator.valueToCode(this, 'PIN2', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'setMotor(' + SPEED_PIN + ', ' + DIR_PIN + ', ' + speed + ');\n';
    generator.definitions_['include_Arduino'] = '#include <Arduino.h>';
    generator.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_S'] = 'pinMode(' + SPEED_PIN + ', OUTPUT);';
    generator.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_D'] = 'pinMode(' + DIR_PIN + ', OUTPUT);';
    generator.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_S_W'] = 'digitalWrite(' + SPEED_PIN + ', LOW);';
    generator.setups_['setup_output_' + SPEED_PIN + DIR_PIN + '_D_W'] = 'digitalWrite(' + DIR_PIN + ', LOW);';
    var funcName = 'setMotor';
    var code2 = 'void ' + funcName + '(int speedpin,int dirpin, int speed)\n '
        + '{\n'
        + '  if (speed == 0)\n'
        + '  {\n'
        + '    digitalWrite(dirpin, LOW);\n'
        + '    analogWrite(speedpin, 0);\n'
        + '  } \n'
        + '  else if (speed > 0)\n'
        + '  {\n'
        + '    digitalWrite(dirpin, LOW);\n'
        + '    analogWrite(speedpin, speed);\n'
        + '  }\n'
        + '  else\n'
        + '  {\n'
        + '    if(speed < -255)\n'
        + '      speed = -255;\n'
        + '    digitalWrite(dirpin, HIGH);\n'
        + '    analogWrite(speedpin, 255 + speed);\n'
        + '  }\n'
        + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const motor_id = function (_, generator) {
    var code = this.getFieldValue('CHANNEL');
    return [code, generator.ORDER_ATOMIC];
}

export const HR8833_Motor_Setup = function (_, generator) {
    var motor_id = generator.valueToCode(this, 'MOTOR_ID', generator.ORDER_ATOMIC);
    var pin1 = generator.valueToCode(this, 'PIN1', generator.ORDER_ATOMIC);
    var pin2 = generator.valueToCode(this, 'PIN2', generator.ORDER_ATOMIC);
    generator.definitions_['HR8833_Motor_Setup_fun'] = 'void HR8833_Motor_Setup(int motorID,int pin1,int pin2){//电机初始化 ID=1~4 定义四组电机\n'
        + '  ledcSetup(motorID*2-2, 5000, 8);\n'
        + '  ledcAttachPin(pin1, motorID*2-2);\n'
        + '  ledcSetup(motorID*2-1, 5000, 8);\n'
        + '  ledcAttachPin(pin2, motorID*2-1);\n'
        + '}';
    generator.setups_['motorID_' + motor_id] = 'HR8833_Motor_Setup(' + motor_id + ',' + pin1 + ',' + pin2 + ');';
    var code = '';
    return code;
}

export const HR8833_Motor_Speed = function (_, generator) {
    var motor_id = generator.valueToCode(this, 'MOTOR_ID', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'SPEED', generator.ORDER_ATOMIC);
    generator.definitions_['HR8833_Motor_Speed_fun'] = 'void HR8833_Motor_Speed(int motorID,int speed){//电机速度设置 ID=1~4,speed=-255~255\n'
        + '  if (speed == 0){  \n'
        + '    ledcWrite(motorID*2-2, 0);\n'
        + '    ledcWrite(motorID*2-1, 0);\n'
        + '  }\n'
        + '  else if (speed > 0){\n'
        + '    ledcWrite(motorID*2-2, speed);\n'
        + '    ledcWrite(motorID*2-1, 0);\n'
        + '  }\n'
        + '  else{\n'
        + '    ledcWrite(motorID*2-2, 0);\n'
        + '    ledcWrite(motorID*2-1, -speed);\n'
        + '  }\n'
        + '}\n';
    var code = 'HR8833_Motor_Speed(' + motor_id + ',' + speed + ');\n';
    return code;
}

export const handbit_motor_move = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    var value_speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.setups_['setup_i2c_23_22'] = 'Wire.begin(23, 22);';
    generator.definitions_['HandBit_Motor_Speed_fun'] = 'void HandBit_Motor_Speed(int pin, int speed){//电机速度设置 pin=1~2,speed=--100~100\n'
        + '  Wire.beginTransmission(0x10);\n'
        + '  Wire.write(pin);\n'
        + '  Wire.write(speed);\n'
        + '  Wire.endTransmission();\n'
        + '}';
    var code = 'HandBit_Motor_Speed(' + dropdown_type + ', ' + value_speed + ');\n';
    return code;
}