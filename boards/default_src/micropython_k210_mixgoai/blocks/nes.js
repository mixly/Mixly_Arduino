import * as Blockly from 'blockly/core';

const GAME_HUE = '#2E9883';

export const nes_joystick_init = {
    init: function () {
        this.setColour(GAME_HUE);
        this.appendDummyInput()
            .appendField("NES 初始化");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("PS2手柄");
        this.appendValueInput("miso_pin", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("DAT#")
            .setCheck(Number);
        this.appendValueInput("mosi_pin", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("CMD#")
            .setCheck(Number);
        this.appendValueInput("cs_pin", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("SEL#")
            .setCheck(Number);
        this.appendValueInput("clk_pin", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("CLK#")
            .setCheck(Number);
        this.appendValueInput('vol')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("音量")
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("初始化NES,使用PS2手柄控制");
    }
};

export const nes_keyboard_init = {
    init: function () {
        this.setColour(GAME_HUE);
        this.appendDummyInput()
            .appendField("NES 初始化");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("UART键盘");
        this.appendValueInput('vol')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("音量")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("初始化NES,使用串口键盘控制");
    }
};

export const nes_run = {
    init: function () {
        this.setColour(GAME_HUE);
        this.appendDummyInput()
            .appendField("NES 运行游戏");
        this.appendValueInput('path')
            .appendField("路径")
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("运行NES游戏ROM");
    }
};

