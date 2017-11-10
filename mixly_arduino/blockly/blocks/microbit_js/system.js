'use strict';

goog.provide('Blockly.Blocks.system');

goog.require('Blockly.Blocks');

Blockly.Blocks.system.HUE = 60;
Blockly.Blocks['system_run_in_background'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_RUN_BACKGROUND);

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    }
}
Blockly.Blocks['system_reset'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_RESET);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['system_wait'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_WAIT);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['system_raise_event'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendValueInput('system_event_bus_source')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_RAISE_SOURCE);

        this.appendValueInput('system_event_bus_value')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_RAISE_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['system_on_event'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendValueInput('system_event_bus_source')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_ON_SOURCE);

        this.appendValueInput('system_event_bus_value')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_RAISE_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['system_timestamp'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_TIMESTAMP);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
Blockly.Blocks['system_value'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
Blockly.Blocks['system_event_bus_source'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["MICROBIT_ID_BUTTON_A", "EventBusSource.MICROBIT_ID_BUTTON_A"],
                ["MICROBIT_ID_BUTTON_B", "EventBusSource.MICROBIT_ID_BUTTON_B"],
                ["MICROBIT_ID_BUTTON_AB", "EventBusSource.MICROBIT_ID_BUTTON_AB"],
                ["MICROBIT_ID_RADIO", "EventBusSource.MICROBIT_ID_RADIO"],
                ["MICROBIT_ID_GESTURE", "EventBusSource.MICROBIT_ID_GESTURE"],
                ["MICROBIT_ID_ACCELEROMETER", "EventBusSource.MICROBIT_ID_ACCELEROMETER"],
                ["MICROBIT_ID_IO_P0", "EventBusSource.MICROBIT_ID_IO_P0"],
                ["MICROBIT_ID_IO_P1", "EventBusSource.MICROBIT_ID_IO_P1"],
                ["MICROBIT_ID_IO_P2", "EventBusSource.MICROBIT_ID_IO_P2"],
                ["MICROBIT_ID_IO_P3", "EventBusSource.MICROBIT_ID_IO_P3"],
                ["MICROBIT_ID_IO_P4", "EventBusSource.MICROBIT_ID_IO_P4"],
                ["MICROBIT_ID_IO_P5", "EventBusSource.MICROBIT_ID_IO_P5"],
                ["MICROBIT_ID_IO_P6", "EventBusSource.MICROBIT_ID_IO_P6"],
                ["MICROBIT_ID_IO_P7", "EventBusSource.MICROBIT_ID_IO_P7"],
                ["MICROBIT_ID_IO_P8", "EventBusSource.MICROBIT_ID_IO_P8"],
                ["MICROBIT_ID_IO_P9", "EventBusSource.MICROBIT_ID_IO_P9"],
                ["MICROBIT_ID_IO_P10", "EventBusSource.MICROBIT_ID_IO_P10"],
                ["MICROBIT_ID_IO_P11", "EventBusSource.MICROBIT_ID_IO_P11"],
                ["MICROBIT_ID_IO_P12", "EventBusSource.MICROBIT_ID_IO_P12"],
                ["MICROBIT_ID_IO_P13", "EventBusSource.MICROBIT_ID_IO_P13"],
                ["MICROBIT_ID_IO_P14", "EventBusSource.MICROBIT_ID_IO_P14"],
                ["MICROBIT_ID_IO_P15", "EventBusSource.MICROBIT_ID_IO_P15"],
                ["MICROBIT_ID_IO_P16", "EventBusSource.MICROBIT_ID_IO_P16"],
                ["MICROBIT_ID_IO_P19", "EventBusSource.MICROBIT_ID_IO_P19"],
                ["MICROBIT_ID_IO_P20", "EventBusSource.MICROBIT_ID_IO_P20"],
                ["MES_DEVICE_INFO_ID", "EventBusSource.MES_DEVICE_INFO_ID"],
                ["MES_SIGNAL_STRENGTH_ID", "EventBusSource.MES_SIGNAL_STRENGTH_ID"],
                ["MES_DPAD_CONTROLLER_ID", "EventBusSource.MES_DPAD_CONTROLLER_ID"],
                ["MES_BROADCAST_GENERAL_ID", "EventBusSource.MES_BROADCAST_GENERAL_ID"]
            ]), 'key');
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
Blockly.Blocks['system_event_bus_value'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["MICROBIT_EVT_ANY", "EventBusValue.MICROBIT_EVT_ANY"],
                ["MICROBIT_BUTTON_EVT_DOWN", "EventBusValue.MICROBIT_BUTTON_EVT_DOWN"],
                ["MICROBIT_BUTTON_EVT_UP", "EventBusValue.MICROBIT_BUTTON_EVT_UP"],
                ["MICROBIT_BUTTON_EVT_CLICK", "EventBusValue.MICROBIT_BUTTON_EVT_CLICK"],
                ["MICROBIT_RADIO_EVT_DATAGRAM", "EventBusValue.MICROBIT_RADIO_EVT_DATAGRAM"],
                ["MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE", "EventBusValue.MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE"],
                ["MICROBIT_PIN_EVT_RISE", "EventBusValue.MICROBIT_PIN_EVT_RISE"],
                ["MICROBIT_PIN_EVT_FALL", "EventBusValue.MICROBIT_PIN_EVT_FALL"],
                ["MICROBIT_PIN_EVT_PULSE_HI", "EventBusValue.MICROBIT_PIN_EVT_PULSE_HI"],
                ["MICROBIT_PIN_EVT_PULSE_LO", "EventBusValue.MICROBIT_PIN_EVT_PULSE_LO"],
                ["MES_ALERT_EVT_ALARM1", "EventBusValue.MES_ALERT_EVT_ALARM1"],
                ["MES_ALERT_EVT_ALARM2", "EventBusValue.MES_ALERT_EVT_ALARM2"],
                ["MES_ALERT_EVT_ALARM3", "EventBusValue.MES_ALERT_EVT_ALARM3"],
                ["MES_ALERT_EVT_ALARM4", "EventBusValue.MES_ALERT_EVT_ALARM4"],
                ["MES_ALERT_EVT_ALARM5", "EventBusValue.MES_ALERT_EVT_ALARM5"],
                ["MES_ALERT_EVT_ALARM6", "EventBusValue.MES_ALERT_EVT_ALARM6"],
                ["MES_ALERT_EVT_DISPLAY_TOAST", "EventBusValue.MES_ALERT_EVT_DISPLAY_TOAST"],
                ["MES_ALERT_EVT_FIND_MY_PHONE", "EventBusValue.MES_ALERT_EVT_FIND_MY_PHONE"],
                ["MES_ALERT_EVT_PLAY_RINGTONE", "EventBusValue.MES_ALERT_EVT_PLAY_RINGTONE"],
                ["MES_ALERT_EVT_PLAY_SOUND", "EventBusValue.MES_ALERT_EVT_PLAY_SOUND"],
                ["MES_ALERT_EVT_VIBRATE", "EventBusValue.MES_ALERT_EVT_VIBRATE"],
                ["MES_CAMERA_EVT_LAUNCH_PHOTO_MODE", "EventBusValue.MES_CAMERA_EVT_LAUNCH_PHOTO_MODE"],
                ["MES_CAMERA_EVT_LAUNCH_VIDEO_MODE", "EventBusValue.MES_CAMERA_EVT_LAUNCH_VIDEO_MODE"],
                ["MES_CAMERA_EVT_START_VIDEO_CAPTURE", "EventBusValue.MES_CAMERA_EVT_START_VIDEO_CAPTURE"],
                ["MES_CAMERA_EVT_STOP_PHOTO_MODE", "EventBusValue.MES_CAMERA_EVT_STOP_PHOTO_MODE"],
                ["MES_CAMERA_EVT_STOP_VIDEO_CAPTURE", "EventBusValue.MES_CAMERA_EVT_STOP_VIDEO_CAPTURE"],
                ["MES_CAMERA_EVT_STOP_VIDEO_MODE", "EventBusValue.MES_CAMERA_EVT_STOP_VIDEO_MODE"],
                ["MES_CAMERA_EVT_TAKE_PHOTO", "EventBusValue.MES_CAMERA_EVT_TAKE_PHOTO"],
                ["MES_CAMERA_EVT_TOGGLE_FRONT_REAR", "EventBusValue.MES_CAMERA_EVT_TOGGLE_FRONT_REAR"],
                ["MES_DEVICE_DISPLAY_OFF", "EventBusValue.MES_DEVICE_DISPLAY_OFF"],
                ["MES_DEVICE_DISPLAY_ON", "EventBusValue.MES_DEVICE_DISPLAY_ON"],
                ["MES_DEVICE_GESTURE_DEVICE_SHAKEN", "EventBusValue.MES_DEVICE_GESTURE_DEVICE_SHAKEN"],
                ["MES_DEVICE_INCOMING_CALL", "EventBusValue.MES_DEVICE_INCOMING_CALL"],
                ["MES_DEVICE_INCOMING_MESSAGE", "EventBusValue.MES_DEVICE_INCOMING_MESSAGE"],
                ["MES_DEVICE_ORIENTATION_LANDSCAPE", "EventBusValue.MES_DEVICE_ORIENTATION_LANDSCAPE"],
                ["MES_DEVICE_ORIENTATION_PORTRAIT", "EventBusValue.MES_DEVICE_ORIENTATION_PORTRAIT"],
                ["MES_DPAD_BUTTON_1_DOWN", "EventBusValue.MES_DPAD_BUTTON_1_DOWN"],
                ["MES_DPAD_BUTTON_1_UP", "EventBusValue.MES_DPAD_BUTTON_1_UP"],
                ["MES_DPAD_BUTTON_2_DOWN", "EventBusValue.MES_DPAD_BUTTON_2_DOWN"],
                ["MES_DPAD_BUTTON_2_UP", "EventBusValue.MES_DPAD_BUTTON_2_UP"],
                ["MES_DPAD_BUTTON_3_DOWN", "EventBusValue.MES_DPAD_BUTTON_3_DOWN"],
                ["MES_DPAD_BUTTON_3_UP", "EventBusValue.MES_DPAD_BUTTON_3_UP"],
                ["MES_DPAD_BUTTON_4_DOWN", "EventBusValue.MES_DPAD_BUTTON_4_DOWN"],
                ["MES_DPAD_BUTTON_4_UP", "EventBusValue.MES_DPAD_BUTTON_4_UP"],
                ["MES_DPAD_BUTTON_A_DOWN", "EventBusValue.MES_DPAD_BUTTON_A_DOWN"],
                ["MES_DPAD_BUTTON_A_UP", "EventBusValue.MES_DPAD_BUTTON_A_UP"],
                ["MES_DPAD_BUTTON_B_DOWN", "EventBusValue.MES_DPAD_BUTTON_B_DOWN"],
                ["MES_DPAD_BUTTON_B_UP", "EventBusValue.MES_DPAD_BUTTON_B_UP"],
                ["MES_DPAD_BUTTON_C_DOWN", "EventBusValue.MES_DPAD_BUTTON_C_DOWN"],
                ["MES_DPAD_BUTTON_C_UP", "EventBusValue.MES_DPAD_BUTTON_C_UP"],
                ["MES_DPAD_BUTTON_D_DOWN", "EventBusValue.MES_DPAD_BUTTON_D_DOWN"],
                ["MES_DPAD_BUTTON_D_UP", "EventBusValue.MES_DPAD_BUTTON_D_UP"],
                ["MES_REMOTE_CONTROL_EVT_FORWARD", "EventBusValue.MES_REMOTE_CONTROL_EVT_FORWARD"],
                ["MES_REMOTE_CONTROL_EVT_NEXTTRACK", "EventBusValue.MES_REMOTE_CONTROL_EVT_NEXTTRACK"],
                ["MES_REMOTE_CONTROL_EVT_PAUSE", "EventBusValue.MES_REMOTE_CONTROL_EVT_PAUSE"],
                ["MES_REMOTE_CONTROL_EVT_PLAY", "EventBusValue.MES_REMOTE_CONTROL_EVT_PLAY"],
                ["MES_REMOTE_CONTROL_EVT_PREVTRACK", "EventBusValue.MES_REMOTE_CONTROL_EVT_PREVTRACK"],
                ["MES_REMOTE_CONTROL_EVT_REWIND", "EventBusValue.MES_REMOTE_CONTROL_EVT_REWIND"],
                ["MES_REMOTE_CONTROL_EVT_STOP", "EventBusValue.MES_REMOTE_CONTROL_EVT_STOP"],
                ["MES_REMOTE_CONTROL_EVT_VOLUMEDOWN", "EventBusValue.MES_REMOTE_CONTROL_EVT_VOLUMEDOWN"],
                ["MES_REMOTE_CONTROL_EVT_VOLUMEUP", "EventBusValue.MES_REMOTE_CONTROL_EVT_VOLUMEUP"]
            ]), 'key');
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
Blockly.Blocks['system_device_name'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_DEVICE_NAME);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
Blockly.Blocks['system_device_serial_number'] = {
    init:function(){
        this.setColour(Blockly.Blocks.system.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SYSTEM_DEVICE_SERIAL_NUMBER);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
