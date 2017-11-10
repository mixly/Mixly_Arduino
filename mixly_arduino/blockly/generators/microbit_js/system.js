'use strict';

goog.provide('Blockly.JavaScript.system');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.system_run_in_background = function() {
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '});\n';
};
Blockly.JavaScript.system_reset= function() {
    return 'control.reset();\n';
}

Blockly.JavaScript.system_wait= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC) || profile.default.serial;
    return 'control.waitMicros('  + data +  ');\n';
}

Blockly.JavaScript.system_raise_event= function() {
    var source = Blockly.JavaScript.valueToCode(this, 'system_event_bus_source', Blockly.JavaScript.ORDER_ATOMIC) || profile.default.serial;
    var value = Blockly.JavaScript.valueToCode(this, 'system_event_bus_value', Blockly.JavaScript.ORDER_ATOMIC) || profile.default.serial;
    return 'control.raiseEvent('  + source + ', ' + value +  ');\n';
}

Blockly.JavaScript.system_on_event = function() {
    var source = Blockly.JavaScript.valueToCode(this, 'system_event_bus_source', Blockly.JavaScript.ORDER_ATOMIC) || profile.default.serial;
    var value = Blockly.JavaScript.valueToCode(this, 'system_event_bus_value', Blockly.JavaScript.ORDER_ATOMIC) || profile.default.serial;
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    return 'control.onEvent('  + source + ', ' + value +  ', () => {\n' + branch + ');\n';
}

Blockly.JavaScript.system_timestamp = function() {
    return ['control.eventTimestamp()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.system_value = function() {
    return ['control.eventValue()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.system_event_bus_source = function() {
    return [this.getFieldValue('key'), Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.system_event_bus_value = function() {
    return [this.getFieldValue('key'), Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.system_device_name = function() {
    return ['control.deviceName()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.system_device_serial_number = function() {
    return ['control.deviceSerialNumber()', Blockly.JavaScript.ORDER_ATOMIC];
}
