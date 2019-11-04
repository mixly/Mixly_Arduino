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

//ok
Blockly.Python.base_delay = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
};
//ok
Blockly.Python.Panic_with_status_code = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var status_code = Blockly.Python.valueToCode(this, 'STATUS_CODE', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};
//ok
Blockly.Python.controls_millis = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = 'running_time()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.controls_end_program = function () {
    return 'while True:\n    pass\n';
};
//ok
Blockly.Python.reset = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'reset()\n';
};
Blockly.Python.controls_uname = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    return ['os.uname()', Blockly.Python.ORDER_ATOMIC];
};