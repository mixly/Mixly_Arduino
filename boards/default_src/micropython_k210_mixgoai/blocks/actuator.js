import * as Blockly from 'blockly/core';

const ACTUATOR_HUE = 100;


export const actuator_Servo_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField("初始化");
        this.appendDummyInput()
            .appendField("舵机");
        this.appendValueInput("PIN", Number)
            .appendField("管脚")
            .setCheck(Number);
        this.appendValueInput('time')
            .appendField("定时器")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

export const actuator_Servo = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField("设置");
        this.appendDummyInput()
            .appendField("舵机");
        this.appendValueInput("PIN", Number)
            .appendField("管脚")
            .setCheck(Number);
        this.appendValueInput('range')
            .appendField("角度")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

export const actuator_PAC9685_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField("初始化");
        this.appendDummyInput()
            .appendField("16路舵机");
        this.appendValueInput('address')
            .appendField("地址")
            .setCheck(Number);
        this.appendValueInput('SUB')
            .setCheck("var")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("通信");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("使用PCA9685驱动16路舵机并备注IIC端口");
    }
};

export const actuator_PAC9685_Servo = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField("设置");
        this.appendDummyInput()
            .appendField("16路舵机");
        this.appendValueInput("index")
            .appendField("编号")
            .setCheck(Number);
        this.appendValueInput('range')
            .appendField("角度")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("使用PCA9685驱动16路舵机，输入编号机角度");
    }
};



export const actuator_rgb_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .appendField("初始化")
            .setCheck("var");
        this.appendValueInput("PIN", Number)
            .appendField("管脚")
            .setCheck(Number);
        this.appendValueInput('num')
            .appendField("灯数")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};


export const actuator_rgb_set = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .appendField("")
            .setCheck("var");
        this.appendValueInput('num')
            .appendField("灯号")
            .setCheck(Number);
        this.appendValueInput('R')
            .appendField("R值")
            .setCheck(Number);
        this.appendValueInput('G')
            .appendField("G值")
            .setCheck(Number);
        this.appendValueInput('B')
            .appendField("B值")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

export const actuator_rgb_display = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("生效");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};


export const actuator_ms32006_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .appendField("初始化")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("电机驱动");
        this.appendDummyInput()
            .appendField("地址")
            .appendField(new Blockly.FieldDropdown([['A', 'ms32006.ADDRESS_A'], ['B', 'ms32006.ADDRESS_B']]), 'mode');
        this.appendValueInput('SUB1')
            .setCheck("var")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("通信");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("初始化MS32006电机驱动，使用I2C通信");
    }
};

export const actuator_ms32006_dcmotor = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .appendField("直流电机")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CLOCKWISE, "ms32006.MOT_CW"],
                [Blockly.Msg.ANTI_CLOCKWISE, "ms32006.MOT_CCW"],
                [Blockly.Msg.MOTOR_N, "ms32006.MOT_N"],
                [Blockly.Msg.MOTOR_P, "ms32006.MOT_P"]
            ]), "direction");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("设置直流电机的状态及转速(0-100)");
    }
};



export const actuator_ms32006_stepper = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .appendField("步进电机")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("选择")
            .appendField(new Blockly.FieldDropdown([['A', 'ms32006.MOT_A'], ['B', 'ms32006.MOT_B']]), 'mode');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CLOCKWISE, "ms32006.MOT_CW"],
                [Blockly.Msg.ANTI_CLOCKWISE, "ms32006.MOT_CCW"]
            ]), "direction");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("转速");
        this.appendValueInput('steps')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("步数");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("设置步进电机的状态、转速、步数(0-2047)");
    }
};

//-新20211221------PID算法，暂时放此处------------------------------------------//
export const PID_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .setCheck("var")
            .appendField("初始化");
        this.appendValueInput("P", Number)
            .appendField("P值")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("I", Number)
            .appendField("I值")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("D", Number)
            .appendField("D值")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip("初始化PID算法");
    }
};

//-新20211221------PID算法，暂时放此处------------------------------------------//
export const PID_get_pid = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('SUB')
            .setCheck("var")
            .appendField("");
        this.appendDummyInput()
            .appendField("运算");
        this.appendValueInput("error")
            .appendField("偏移量")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("scaler")
            .appendField("定标量")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("根据参数返回运算结果");
    }
};