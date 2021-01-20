'use strict';

goog.provide('Blockly.Arduino.storage');

goog.require('Blockly.Arduino');

//LM35 Temperature
Blockly.Arduino.LM35 = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'analogRead(' + dropdown_pin + ')*0.322';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.store_eeprom_write_long = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
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
    Blockly.Arduino.definitions_[funcName] = code2;
    return 'eepromWriteLong(' + address + ', ' + data + ');\n';
}

Blockly.Arduino.store_eeprom_read_long = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
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
    Blockly.Arduino.definitions_[funcName] = code2;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.store_eeprom_write_byte = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    return 'EEPROM.write(' + address + ', ' + data + ');\nEEPROM.commit();\n';
}

Blockly.Arduino.store_eeprom_read_byte = function () {
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    var code = 'EEPROM.read(' + address + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.controls_attachInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT_PULLUP);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'attachInterrupt' + '(' + interrupt_pin + ',' + 'attachInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachInterrupt_fun_' + dropdown_pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'ICACHE_RAM_ATTR void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return code;
};
Blockly.Arduino.store_eeprom_put = function () {
    Blockly.Arduino.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.put(' + address + ', ' + data + ');\nEEPROM.commit();';
}

Blockly.Arduino.store_eeprom_get = function () {
    Blockly.Arduino.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.get(' + address + ', ' + data + ');\n';
}
Blockly.Arduino.controls_soft_reset = function () {
  return [' ESP.restart();', Blockly.Arduino.ORDER_ATOMIC];
};