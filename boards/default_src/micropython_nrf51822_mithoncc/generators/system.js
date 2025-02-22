import { Profile } from 'mixly';

export const system_run_in_background = function (_, generator) {
    var branch = generator.statementToCode(this, 'do');
    return 'control.inBackground(() => {\n' + branch + '})\n';
}

export const system_reset = function () {
    return 'control.reset()\n';
}

export const system_wait = function (_, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.waitMicros('  + data +  ')\n';
}

export const system_raise_event = function (_, generator) {
    var source = generator.valueToCode(this, 'system_event_bus_source', generator.ORDER_ATOMIC) || Profile.default.serial;
    var value = generator.valueToCode(this, 'system_event_bus_value', generator.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.raiseEvent('  + source + ', ' + value +  ')\n';
}

export const system_on_event = function (_, generator) {
    var source = generator.valueToCode(this, 'system_event_bus_source', generator.ORDER_ATOMIC) || Profile.default.serial;
    var value = generator.valueToCode(this, 'system_event_bus_value', generator.ORDER_ATOMIC) || Profile.default.serial;
    var branch = generator.statementToCode(this, 'do');
    return 'control.onEvent('  + source + ', ' + value +  ', () => {\n' + branch + ')\n';
}

export const system_timestamp = function (_, generator) {
    return ['control.eventTimestamp()', generator.ORDER_ATOMIC];
}

export const system_value = function (_, generator) {
    return ['control.eventValue()', generator.ORDER_ATOMIC];
}

export const system_event_bus_source = function (_, generator) {
    return [this.getFieldValue('key'), generator.ORDER_ATOMIC];
}

export const system_event_bus_value = function (_, generator) {
    return [this.getFieldValue('key'), generator.ORDER_ATOMIC];
}

export const system_device_name = function (_, generator) {
    return ['control.deviceName()', generator.ORDER_ATOMIC];
}

export const system_device_serial_number = function (_, generator) {
    return ['control.deviceSerialNumber()', generator.ORDER_ATOMIC];
}

// ok
export const base_delay = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
}

// ok
export const Panic_with_status_code = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var status_code = generator.valueToCode(this, 'STATUS_CODE', generator.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
}

// ok
export const controls_millis = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = 'running_time()';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const controls_end_program = function () {
    return 'while True:\n    pass\n';
}

// ok
export const reset = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    return 'reset()\n';
}

export const controls_uname = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    return ['os.uname()', generator.ORDER_ATOMIC];
}