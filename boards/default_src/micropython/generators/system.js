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
    return 'control.waitMicros(' + data + ')\n';
}

export const system_raise_event = function (_, generator) {
    var source = generator.valueToCode(this, 'system_event_bus_source', generator.ORDER_ATOMIC) || Profile.default.serial;
    var value = generator.valueToCode(this, 'system_event_bus_value', generator.ORDER_ATOMIC) || Profile.default.serial;
    return 'control.raiseEvent(' + source + ', ' + value + ')\n';
}

export const system_on_event = function (_, generator) {
    var source = generator.valueToCode(this, 'system_event_bus_source', generator.ORDER_ATOMIC) || Profile.default.serial;
    var value = generator.valueToCode(this, 'system_event_bus_value', generator.ORDER_ATOMIC) || Profile.default.serial;
    var branch = generator.statementToCode(this, 'do');
    return 'control.onEvent(' + source + ', ' + value + ', () => {\n' + branch + ')\n';
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

//ok
export const Panic_with_status_code = function (_, generator) {
    var status_code = generator.valueToCode(this, 'STATUS_CODE', generator.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
}

//ok
export const controls_millis = function (_, generator) {
    generator.definitions_['import_time'] = 'import time';
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
        case "ms":
            var code = 'time.ticks_ms()';
            return [code, generator.ORDER_ATOMIC];
        case "us":
            var code = 'time.ticks_us()';
            return [code, generator.ORDER_ATOMIC];
    }
}

//ok
export const controls_end_program = function () {
    return 'while True:\n    pass\n';
}

//ok
export const reset = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    return 'reset()\n';
}

export const controls_uname = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    return 'os.uname()';
}

export const controls_delay = function (_, generator) {
    // generator.definitions_.import_time = "import time";
    generator.definitions_['import_time'] = 'import time';
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '1000'
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
        case "s":
            var code = 'time.sleep(' + delay_time + ')\n';
            return code;
        case "ms":
            var code = 'time.sleep_ms(' + delay_time + ')\n';
            return code;
        case "us":
            var code = 'time.sleep_us(' + delay_time + ')\n';
            return code;
    }
}

export const controls_delay_new = function (_, generator) {
    // generator.definitions_.import_time = "import time";
    generator.definitions_['import_time'] = 'import time';
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '1000'
    var dropdown_time = this.getFieldValue('Time');
    switch (dropdown_time) {
        case "s":
            var code = 'time.sleep(' + delay_time + ')\n';
            return code;
        case "ms":
            var code = 'time.sleep_ms(' + delay_time + ')\n';
            return code;
        case "us":
            var code = 'time.sleep_us(' + delay_time + ')\n';
            return code;
    }
}

export const timer = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var v = generator.valueToCode(this, "VAR", generator.ORDER_NONE) || "None";
    var period = generator.valueToCode(this, "period", generator.ORDER_NONE) || "0";
    var mode = generator.valueToCode(this, "mode", generator.ORDER_NONE) || "None";
    var callback = generator.valueToCode(this, "callback", generator.ORDER_NONE) || "None";
    // var callback = generator.valueToCode(this, "callback", generator.ORDER_NONE) || "None";
    var code = v + ".init(period = " + period + ", mode = Timer." + mode + ", callback = " + callback + ")\n";
    return code;
}

export const system_timer = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var v = generator.valueToCode(this, "VAR", generator.ORDER_NONE) || "None";
    var period = generator.valueToCode(this, "period", generator.ORDER_NONE) || "0";
    var mode = this.getFieldValue('mode');
    //var branch = generator.statementToCode(this, 'callback') || generator.PASS;
    var callback = generator.valueToCode(this, "callback", generator.ORDER_NONE) || "None";
    //var code = v + ".init(period = " + period + ", mode = machine.Timer." + mode + ", callback = " + v + "_callback_func)\n";
    //generator.setups_['timer_callback_func'] = 'def ' + v + '_callback_func(t):\n' + branch + '\n';
    var code = v + ".init(period = " + period + ", mode = machine.Timer." + mode + ", callback = " + callback + ")\n";
    return code;
}

export const system_ticks_diff = function (_, generator) {
    generator.definitions_['import_time'] = 'import time';
    var end = generator.valueToCode(this, "END", generator.ORDER_NONE) || "0";
    var start = generator.valueToCode(this, "START", generator.ORDER_NONE) || "0";
    var code = "time.ticks_diff(" + end + ", " + start + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const system_timer_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.Timer(0)\n';
    return code;
}

export const system_wdt_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var period = generator.valueToCode(this, "period", generator.ORDER_NONE) || "0";
    var code = 'wdt = machine.WDT(timeout= ' + period + ')\n';
    return code;
}

export const system_wdt_feed = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var code = 'wdt.feed()\n';
    return code;
}

export const system_machine_reset = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var code = 'machine.reset()\n';
    return code;
}

export const system_bitbot_shutdown = function (_, generator) {
    generator.definitions_['import_bitbot_onboard_bot51'] = 'from bitbot import onboard_bot51';
    var code = 'onboard_bot51.shutdown()\n';
    return code;
}

export const Timer_init = system_timer_init;
export const timer2 = system_timer;
export const time_ticks_diff = system_ticks_diff;
export const base_delay = controls_delay;