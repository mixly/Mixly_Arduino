// LM35 Temperature
export const LM35 = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'analogRead(' + dropdown_pin + ')*0.322';
    return [code, generator.ORDER_ATOMIC];
}

export const store_eeprom_write_long = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    var funcName = 'eepromWriteLong';
    var code2 = 'void ' + funcName + '(int address, unsigned long value) {\n'
        + '  union u_tag {\n'
        + '  	byte b[4];\n'
        + '  	unsigned long ULtime;\n'
        + '  }\n'
        + '  time;\n'
        + '  time.ULtime=value;\n'
        + '  EEPROM.write(address, time.b[0]);\n'
        + '  EEPROM.write(address+1, time.b[1]);\n'
        + '  if (time.b[2] != EEPROM.read(address+2) ) EEPROM.write(address+2, time.b[2]);\n'
        + '  if (time.b[3] != EEPROM.read(address+3) ) EEPROM.write(address+3, time.b[3]);\n'
        + '   EEPROM.commit();\n'
        + '}\n';
    generator.definitions_[funcName] = code2;
    return 'eepromWriteLong(' + address + ', ' + data + ');\n';
}

export const store_eeprom_read_long = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    var code = 'eepromReadLong(' + address + ')';
    var funcName = 'eepromReadLong';
    var code2 = 'unsigned long ' + funcName + '(int address) {\n'
        + '  union u_tag {\n'
        + '  	byte b[4];\n'
        + '  	unsigned long ULtime;\n'
        + '  }\n'
        + '  time;\n'
        + '  time.b[0] = EEPROM.read(address);\n'
        + '  time.b[1] = EEPROM.read(address+1);\n'
        + '  time.b[2] = EEPROM.read(address+2);\n'
        + '  time.b[3] = EEPROM.read(address+3);\n'
        + '  return time.ULtime;\n'
        + '}\n';
    generator.definitions_[funcName] = code2;
    return [code, generator.ORDER_ATOMIC];
}

export const store_eeprom_write_byte = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    return 'EEPROM.write(' + address + ', ' + data + ');\nEEPROM.commit();\n';
}

export const controls_attachInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT_PULLUP);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'attachInterrupt' + '(' + interrupt_pin + ',' + 'attachInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachInterrupt_fun_' + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'ICACHE_RAM_ATTR void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const store_eeprom_read_byte = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    var code = 'EEPROM.read(' + address + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const store_eeprom_put = function (_, generator) {
    generator.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.put(' + address + ', ' + data + ');\nEEPROM.commit();';
}

export const store_eeprom_get = function (_, generator) {
    generator.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.get(' + address + ', ' + data + ');\n';
}

export const controls_soft_reset = function () {
    return ' ESP.restart();\n';
}

export const servo_move = function (_, generator) {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = generator.valueToCode(this, 'DEGREE', generator.ORDER_ATOMIC);
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '0'
    generator.definitions_['include_Servo'] = '#include <Servo.h>';
    generator.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
    generator.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ',500,2500);';
    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
    return code;
}