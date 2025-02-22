import * as Blockly from 'blockly/core';


const SYSTEM_HUE = 120; //'#EB8045';

export const controls_delay_new = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DELAY)
        this.appendValueInput("DELAY_TIME", Number)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_SECOND, "s"], [Blockly.Msg.MIXLY_mSecond, "ms"], [Blockly.Msg.MIXLY_uSecond, "us"]]), 'Time');
        this.setFieldValue('s', 'Time')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_DELAY);
    }
};

export const controls_delay = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DELAY)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_SECOND, "s"], [Blockly.Msg.MIXLY_mSecond, "ms"], [Blockly.Msg.MIXLY_uSecond, "us"]]), 'Time');
        this.appendValueInput("DELAY_TIME", Number)
            .setCheck(Number);
        this.setFieldValue('ms', 'Time')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_DELAY);
    }
};

export const Panic_with_status_code = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput("STATUS_CODE", Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Panic_with_status_code)
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Panic_with_status_code);
    }
};

export const reset = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_micro);
        this.setPreviousStatement(true);
        // this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Reset_micro);
    }
};

export const controls_millis = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RUNTIME);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_mSecond, "ms"], [Blockly.Msg.MIXLY_uSecond, "us"]]), 'Time');
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_CONTROLS_MILLIS_TOOLTIP);
    }
};

export const raw_block = {
    // Container.
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.appendDummyInput()
            .appendField('Code Block:');
        this.appendDummyInput()
            .appendField(new Blockly.FieldMultilineInput('12345'), 'TEXT');
    }
};

export const controls_uname = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_CONTORL_UNAME);

        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_MICROBIT_PY_CONTORL_UNAME);
    }
};

export const timer = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput('VAR')
            .appendField("Timer")
            .setCheck("var");
        this.appendValueInput('period')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            // .appendField("Timer")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_PERIOD_MIL);
        this.appendValueInput('mode')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE);
        this.appendValueInput('callback')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        // this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_TIMER_TOOLTIP);
    }
};

export const system_timer = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput('VAR')
            .appendField("Timer")
            .setCheck("var");
        // .appendField("I2C " + Blockly.Msg.MIXLY_SETUP)
        this.appendValueInput("period")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_PERIOD_MIL)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_mSecond)
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_PYTHON_ONE_SHOT, "ONE_SHOT"], [Blockly.Msg.MIXLY_PYTHON_PERIODIC, "PERIODIC"]]), "mode");
        this.appendValueInput('callback')
            .appendField(Blockly.Msg.MIXLY_DO)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SYSTEM_TIMER_TOOLTIP);
    }
};

export const system_ticks_diff = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput('END')
            // .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_ESP32_TIME_TICKS_DIFF);
        this.appendValueInput('START')
            // .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_ESP32_TIME_MINUS);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SYSTEM_TICKS_DIFF_TOOLTIP);
    }
};

export const system_timer_init = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput("")
            .appendField("Timer")
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_SETUP)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SYSTEM_TIMER_INIT_TOOLTIP);
    }
};

export const system_wdt_init = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MACHINE_WDT)
            .appendField(Blockly.Msg.MIXLY_SETUP)
        this.appendValueInput('period')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MACHINE_WDT_TIMEOUT)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_mSecond)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_MACHINE_WDT_INIT_TOOLTIP);
    }
};

export const system_wdt_feed = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MACHINE_WDT)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MACHINE_FEED)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_MACHINE_WDT_FEED_TOOLTIP);
    }
};

export const system_machine_reset = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MACHINE_RESET)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_MACHINE_RESET_TOOLTIP);
    }
};

export const system_bitbot_shutdown = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.BITBOT)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.SHUTDOWN)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MICROPYTHON_BITBOT_SHUTDOWN_TOOLTIP);
    }
};

export const Timer_init = system_timer_init;
export const timer2 = system_timer;
export const time_ticks_diff = system_ticks_diff;
export const base_delay = controls_delay;