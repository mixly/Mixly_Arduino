export const actuator_Servo_init = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    generator.definitions_['from machine import PWM'] = 'from machine import PWM';
    generator.definitions_['from machine import Timer'] = 'from machine import Timer';
    var key = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var Timer = time % 3
    var CHANNEL = parseInt(time / 3)
    var code1 = 'tim' + time + ' = Timer(Timer.TIMER' + Timer + ',Timer.CHANNEL' + CHANNEL + ', mode=Timer.MODE_PWM)\n';
    var code2 = 'pse' + key + '=PWM(tim' + time + ', freq=50, duty=2.5, pin=' + key + ')\n';
    return code1 + code2;
}

export const actuator_Servo = function (_, generator) {
    generator.definitions_['from machine import PWM'] = 'from machine import PWM';
    var key = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(this, 'range', generator.ORDER_ATOMIC);
    var code = "pse" + key + ".duty(" + range + "/18.0+2.5)\n";
    return code;
}

export const actuator_PAC9685_init = function (_, generator) {
    generator.definitions_['from servo import Servos'] = 'from servo import Servos';
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = 'servos=Servos(' + sub + ',address=' + address + ')\n';
    return code;
}

export const actuator_PAC9685_Servo = function (_, generator) {
    generator.definitions_['from servo import Servos'] = 'from servo import Servos';
    var index = generator.valueToCode(this, 'index', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(this, 'range', generator.ORDER_ATOMIC);
    // var index=index-1;
    var code = "servos.position((" + index + "-1)," + range + ")\n";
    return code;
}

export const actuator_rgb_init = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    generator.definitions_['from modules import ws2812'] = 'from modules import ws2812';
    var SUB = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var num = generator.valueToCode(this, 'num', generator.ORDER_ATOMIC);
    var code = '' + SUB + '=ws2812(' + key + ',' + num + ')\n';
    return code;
}

export const actuator_rgb_set = function (_, generator) {
    var SUB = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var R = generator.valueToCode(this, 'R', generator.ORDER_ATOMIC);
    var G = generator.valueToCode(this, 'G', generator.ORDER_ATOMIC);
    var B = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC);
    var num = generator.valueToCode(this, 'num', generator.ORDER_ATOMIC);
    var code = '' + SUB + '.set_led(' + num + ',(' + G + ',' + R + ',' + B + '))\n';
    return code;
}

export const actuator_rgb_display = function (_, generator) {
    var SUB = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = '' + SUB + '.display()\n';
    return code;
}

export const actuator_ms32006_init = function (_, generator) {
    generator.definitions_['import ms32006'] = 'import ms32006';
    var address = this.getFieldValue('mode')
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sub1 = generator.valueToCode(this, 'SUB1', generator.ORDER_ATOMIC);
    var code = '' + sub + '=ms32006.MS32006(' + sub1 + ',addr=' + address + ')\n';
    return code;
}

export const actuator_ms32006_dcmotor = function (_, generator) {
    generator.definitions_['import ms32006'] = 'import ms32006';
    var direction = this.getFieldValue('direction')
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = '' + sub + '.dc_motor(' + direction + ',' + speed + ')\n';
    return code;
}

export const actuator_ms32006_stepper = function (_, generator) {
    generator.definitions_['import ms32006'] = 'import ms32006';
    var mode = this.getFieldValue('mode')
    var direction = this.getFieldValue('direction')
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var steps = generator.valueToCode(this, 'steps', generator.ORDER_ATOMIC);
    var code = '' + sub + '.move(' + mode + ',' + direction + ',' + speed + ',' + steps + ')\n';
    return code;
}

//-新20211221------PID算法，暂时放此处------------------------------------------//
export const PID_init = function (_, generator) {
    generator.definitions_['import pid'] = 'import pid';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var P = generator.valueToCode(this, 'P', generator.ORDER_ATOMIC);
    var I = generator.valueToCode(this, 'I', generator.ORDER_ATOMIC);
    var D = generator.valueToCode(this, 'D', generator.ORDER_ATOMIC);
    var code = "" + sub + "=pid.PID(" + P + "," + I + "," + D + ")\n";
    return code;
}
//-新20211221------PID算法，暂时放此处------------------------------------------//
export const PID_get_pid = function (_, generator) {
    generator.definitions_['import pid'] = 'import pid';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var error = generator.valueToCode(this, 'error', generator.ORDER_ATOMIC);
    var scaler = generator.valueToCode(this, 'scaler', generator.ORDER_ATOMIC);
    var code = "" + sub + ".get_pid(" + error + "," + scaler + ")";
    return [code, generator.ORDER_ATOMIC];
}