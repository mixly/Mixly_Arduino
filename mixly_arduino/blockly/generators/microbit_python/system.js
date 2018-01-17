'use strict';

goog.provide('Blockly.Python.system');

goog.require('Blockly.Python');

Blockly.Python.system_run_in_background = function() {
    var branch = Blockly.Python.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '})\n';
};
Blockly.Python.system_reset= function() {
    return 'control.reset()\n';
}

Blockly.Python.system_wait= function() {
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    return 'control.waitMicros('  + data +  ')\n';
}

Blockly.Python.system_raise_event= function() {
    var source = Blockly.Python.valueToCode(this, 'system_event_bus_source', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    var value = Blockly.Python.valueToCode(this, 'system_event_bus_value', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    return 'control.raiseEvent('  + source + ', ' + value +  ')\n';
}

Blockly.Python.system_on_event = function() {
    var source = Blockly.Python.valueToCode(this, 'system_event_bus_source', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    var value = Blockly.Python.valueToCode(this, 'system_event_bus_value', Blockly.Python.ORDER_ATOMIC) || profile.default.serial;
    var branch = Blockly.Python.statementToCode(this, 'do');
    return 'control.onEvent('  + source + ', ' + value +  ', () => {\n' + branch + ')\n';
}

Blockly.Python.system_timestamp = function() {
    return ['control.eventTimestamp()', Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.system_value = function() {
    return ['control.eventValue()', Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.system_event_bus_source = function() {
    return [this.getFieldValue('key'), Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.system_event_bus_value = function() {
    return [this.getFieldValue('key'), Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.system_device_name = function() {
    return ['control.deviceName()', Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.system_device_serial_number = function() {
    return ['control.deviceSerialNumber()', Blockly.Python.ORDER_ATOMIC];
}
