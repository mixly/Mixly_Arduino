import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const ACTUATOR_HUE = 100;

export const servo_move = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERVO)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DEGREE_0_180);
        this.appendValueInput("DELAY_TIME", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DELAY + '(' + Blockly.Msg.MIXLY_MILLIS + ')');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
        // this.setFieldValue("2", "PIN");
    }
};

export const servo_writeMicroseconds = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERVO)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SERVO_WRITEMICROSECONDS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERVO_WRITEMICROSECONDS);
        //  this.setFieldValue("2", "PIN");
    }
};

export const servo_read_degrees = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERVO)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_READ_DEGREES)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_READ);
        //  this.setFieldValue("2", "PIN");
    }
};

export const servo_move1 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField("模式")
            .appendField(new Blockly.FieldDropdown([["Servo", "0"], ["Timer2ServoPwm", "1"]]), "mode");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERVO)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DEGREE_0_180);
        this.appendValueInput("DELAY_TIME", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DELAY + '(' + Blockly.Msg.MIXLY_MILLIS + ')');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
        // this.setFieldValue("2", "PIN");
    }
};

export const servo_writeMicroseconds1 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField("模式")
            .appendField(new Blockly.FieldDropdown([["Servo", "0"], ["Timer2ServoPwm", "1"]]), "mode");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERVO)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SERVO_WRITEMICROSECONDS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERVO_WRITEMICROSECONDS);
        //  this.setFieldValue("2", "PIN");
    }
};

export const servo_read_degrees1 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField("模式")
            .appendField(new Blockly.FieldDropdown([["Servo", "0"], ["Timer2ServoPwm", "1"]]), "mode");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERVO)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_READ_DEGREES)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_READ);
        //  this.setFieldValue("2", "PIN");
    }
};

var TONE_NOTES = [["NOTE_C3", "131"], ["NOTE_D3", "147"], ["NOTE_E3", "165"], ["NOTE_F3", "175"], ["NOTE_G3", "196"], ["NOTE_A3", "220"], ["NOTE_B3", "247"], ["NOTE_C4", "262"], ["NOTE_D4", "294"], ["NOTE_E4", "330"], ["NOTE_F4", "349"], ["NOTE_G4", "392"], ["NOTE_A4", "440"], ["NOTE_B4", "494"], ["NOTE_C5", "523"], ["NOTE_D5", "587"], ["NOTE_E5", "659"], ["NOTE_F5", "698"], ["NOTE_G5", "784"], ["NOTE_A5", "880"], ["NOTE_B5", "988"], ["NOTE_C6", "1047"], ["NOTE_D6", "1175"], ["NOTE_E6", "1319"], ["NOTE_F6", "1397"], ["NOTE_G6", "1568"], ["NOTE_A6", "1760"], ["NOTE_B6", "1976"], ["NOTE_C7", "2093"], ["NOTE_D7", "2349"], ["NOTE_E7", "2637"], ["NOTE_F7", "2794"], ["NOTE_G7", "3136"], ["NOTE_A7", "3520"], ["NOTE_B7", "3951"]];

export const tone_notes = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TONE_NOTE);
    }
};
export const controls_tone = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_TONE)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('FREQUENCY')
            .setCheck(Number)
            //.setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};
export const controls_notone = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_NOTONE)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
    }
};
export const controls_tone_noTimer = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_TONE_NOTIMER)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('FREQUENCY')
            .setCheck(Number)
            //.setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.appendValueInput('DURATION')
            .setCheck(Number)
            //.setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DURATION);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
    }
};

export const controls_notone_noTimer = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_NOTONE_NOTIMER)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
    }
};

export const group_stepper_setup = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_STEPPER_SETUP_STEPPER)
            .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
        this.appendValueInput("PIN1", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_PIN1)
            .setCheck(Number);
        this.appendValueInput("PIN2", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_PIN2)
            .setCheck(Number);
        this.appendValueInput('steps')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPSPERREVOLUTION);
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STEPPER_STEP);
    }
}

export const group_stepper_setup2 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_STEPPER_SETUP_STEPPER)
            .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
        this.appendValueInput("PIN1", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_PIN1)
            .setCheck(Number);
        this.appendValueInput("PIN2", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_PIN2)
            .setCheck(Number);
        this.appendValueInput("PIN3", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_PIN3)
            .setCheck(Number);
        this.appendValueInput("PIN4", Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_PIN4)
            .setCheck(Number);
        this.appendValueInput('steps')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPSPERREVOLUTION);
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STEPPER_STEP2);
    }
}

export const group_stepper_move = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_STEPPER)
            .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
        this.appendValueInput('step')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_STEP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STEPPER_MOVE);
    }
}


export const RGB_color_seclet = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldColour("ff0000"), "COLOR");
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.OLED_DRAW_PIXE_TOOLTIP);
    }
};

export const RGB_color_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("R")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("G")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("B")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip('');
    }
};

var DISPLAY_RGB_TYPE = [
    ["NEO_GRB", "NEO_GRB"],
    ["NEO_RGB", "NEO_RGB"],
    ["NEO_RGBW", "NEO_RGBW"]
];

//RGB
export const display_rgb_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB + Blockly.Msg.MIXLY_SETUP)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_TYPE)
            .appendField(new Blockly.FieldDropdown(DISPLAY_RGB_TYPE), "TYPE");
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_COUNT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        //  this.setFieldValue("12", "PIN");
    }
};

export const display_rgb_Brightness = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("Brightness")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        //  this.setFieldValue("12", "PIN");
    }
};


export const display_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR", Number)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        // this.setFieldValue("12", "PIN");
    }
};

export const display_rgb_show = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB_SHOW)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

var DISPLAY_RAINBOW_TYPE = [
    [Blockly.Msg.MIXLY_RGB_DISPLAY_RAINBOW_TYPE_1, "normal"],
    [Blockly.Msg.MIXLY_RGB_DISPLAY_RAINBOW_TYPE_2, "change"]
];


export const display_rgb_rainbow1 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGBdisplay_rgb_rainbow1);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        // this.setFieldValue("12", "PIN");
    }
};

export const display_rgb_rainbow2 = {
    init: function () {
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGBdisplay_rgb_rainbow2);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //this.setFieldValue("12", "PIN");
    }
};

export const display_rgb_rainbow3 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(DISPLAY_RAINBOW_TYPE), "TYPE");
        this.appendValueInput("rainbow_color")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_display_rgb_rainbow3);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        // this.setFieldValue("12", "PIN");
    }
};

export const RGB_color_HSV = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("H")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HSV_H);
        this.appendValueInput("S")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HSV_S);
        this.appendValueInput("V")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HSV_V);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('色调范围0-65536;饱和度范围0-255;明度范围0-255');
    }
};
//电机驱动类型
var MOTOR_TYPE = [
    ["L293", "L293"],
    ["L298", "L298"],
    ["TB6612FNG", "TB6612FNG"]
];
export const Mixly_motor = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown(MOTOR_TYPE), "MOTOR_TYPE");
        this.appendDummyInput("")
        this.appendValueInput("PIN1")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MOTOR_DIR_PIN + "1");
        this.appendValueInput("PIN2")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MOTOR_DIR_PIN + "2");
        this.appendValueInput("PIN_EN")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("EN" + Blockly.Msg.MIXLY_PIN);
        this.appendValueInput('speed')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MOTOR_SPEED);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
export const Motor_8833 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("L293/298/DRV8833")
            .appendField(Blockly.Msg.MIXLY_MOTOR);
        this.appendDummyInput("")
        this.appendValueInput("PIN1")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MOTOR_SPEED_PIN);
        this.appendValueInput("PIN2")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MOTOR_DIR_PIN);
        this.appendValueInput('speed')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MOTOR_SPEED);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

//MP3播放控制
var GD5800_MP3_CONTROL_TYPE = [
    [Blockly.Msg.MIXLY_MP3_PLAY, "play();"],
    [Blockly.Msg.MIXLY_MP3_PAUSE, "pause();"],
    [Blockly.Msg.MIXLY_MP3_NEXT, "next();"],
    [Blockly.Msg.MIXLY_MP3_PREV, "prev();"],
    [Blockly.Msg.MIXLY_MP3_VOL_UP, "volumeUp();"],
    [Blockly.Msg.MIXLY_MP3_VOL_DOWN, "volumeDn();"]
];

//MP3 GD5800 设置设备USB/Flash
var GD5800_MP3_Device = [
    ["Flash", "MP3_DEVICE_FLASH"],//内部Flash
    [Blockly.Msg.MIXLY_MP3_UDISK, "MP3_DEVICE_UDISK"]//外部U盘
];


//GD5800 MP3播放设备选择
export const GD5800_MP3_Set_Device = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("GD5800" + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("RXPIN", Number)
            .appendField("TX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("TXPIN", Number)
            .appendField("RX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_SOURCE)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown(GD5800_MP3_Device), "DEVICEID");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//GD5800 MP3模块
export const GD5800_MP3_CONTROL = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("GD5800" + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("RXPIN", Number)
            .appendField("TX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("TXPIN", Number)
            .appendField("RX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown(GD5800_MP3_CONTROL_TYPE), "CONTROL_TYPE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//MP3循环模式
var GD5800_MP3_LOOP_MODE_TYPE = [
    [Blockly.Msg.MIXLY_MP3_LOOP_ALL, "MP3_LOOP_ALL"],
    [Blockly.Msg.MIXLY_MP3_LOOP_FOLDER, "MP3_LOOP_FOLDER"],
    [Blockly.Msg.MIXLY_MP3_LOOP_ONE, "MP3_LOOP_ONE"],
    [Blockly.Msg.MIXLY_MP3_LOOP_RAM, "MP3_LOOP_RAM"]
];

//GD5800 MP3模块循环模式
export const GD5800_MP3_LOOP_MODE = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("GD5800" + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("RXPIN", Number)
            .appendField("TX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("TXPIN", Number)
            .appendField("RX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_LOOP_MODE)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown(GD5800_MP3_LOOP_MODE_TYPE), "LOOP_MODE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//MP3 设置EQ
var GD5800_MP3_EQ_MODE_TYPE = [
    [Blockly.Msg.MIXLY_MP3_EQ_NORMAL, "MP3_EQ_NORMAL"],
    [Blockly.Msg.MIXLY_MP3_EQ_POP, "MP3_EQ_POP"],
    [Blockly.Msg.MIXLY_MP3_EQ_ROCK, "MP3_EQ_ROCK"],
    [Blockly.Msg.MIXLY_MP3_EQ_JAZZ, "MP3_EQ_JAZZ"],
    [Blockly.Msg.MIXLY_MP3_EQ_CLASSIC, "MP3_EQ_CLASSIC"],
    [Blockly.Msg.MIXLY_MP3_EQ_BASS, "MP3_EQ_BASS"]
];

//GD5800 MP3模块EQ模式
export const GD5800_MP3_EQ_MODE = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("GD5800" + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("RXPIN", Number)
            .appendField("TX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("TXPIN", Number)
            .appendField("RX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_EQ_MODE)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown(GD5800_MP3_EQ_MODE_TYPE), "EQ_MODE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//GD5800 MP3模块设置音量
export const GD5800_MP3_VOL = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("GD5800" + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("RXPIN", Number)
            .appendField("TX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("TXPIN", Number)
            .appendField("RX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_VOL);
        this.appendValueInput("vol", Number)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//GD5800 MP3模块播放第N首
export const GD5800_MP3_PLAY_NUM = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("GD5800" + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("RXPIN", Number)
            .appendField("TX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("TXPIN", Number)
            .appendField("RX" + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_MP3_PLAY_NUM)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("首");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

var VOICE_LIST = [["老师", "0x00"], ["爸爸", "0x01"], ["妈妈", "0x02"], ["爷爷", "0x03"], ["奶奶", "0x04"], ["姥姥", "0x05"], ["姥爷", "0x06"], ["哥哥", "0x07"], ["姐姐", "0x08"], ["叔叔", "0x09"], ["阿姨", "0x0A"], ["上午", "0x0B"], ["下午", "0x0C"], ["晚上", "0x0D"], ["前方", "0x0E"], ["厘米", "0x0F"], ["新年快乐", "0x10"], ["身体健康", "0x11"], ["工作顺利", "0x12"], ["学习进步", "0x13"], ["您好", "0x14"], ["谢谢", "0x15"], ["的", "0x16"], ["祝", "0x17"], ["慢走", "0x18"], ["欢迎光临", "0x19"], ["亲爱的", "0x1A"], ["同学们", "0x1B"], ["工作辛苦了", "0x1C"], ["点", "0x1D"], ["打开", "0x1E"], ["关闭", "0x1F"], ["千", "0x20"], ["百", "0x21"], ["十", "0x22"], ["1", "0x23"], ["2", "0x24"], ["3", "0x25"], ["4", "0x26"], ["5", "0x27"], ["6", "0x28"], ["7", "0x29"], ["8", "0x2A"], ["9", "0x2B"], ["0", "0x2C"], ["当前", "0x2D"], ["转", "0x2E"], ["左", "0x2F"], ["右", "0x30"], ["请", "0x31"], ["已", "0x32"], ["现在", "0x33"], ["是", "0x34"], ["红灯", "0x35"], ["绿灯", "0x36"], ["黄灯", "0x37"], ["温度", "0x38"], ["湿度", "0x39"], ["欢迎常来", "0x3A"], ["还有", "0x3B"], ["秒", "0x3C"], ["分", "0x3D"], ["变", "0x3E"], ["等", "0x3F"], ["下一次", "0x40"], ["功能", "0x41"], ["障碍物", "0x42"], ["世界那么大，我想去看看", "0x43"]];

export const voice_module = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("语音模块(68段日常用语)");
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_PLAY)
            .appendField(new Blockly.FieldDropdown(VOICE_LIST), "VOICE");
        this.appendValueInput("WAIT").setCheck(Number).appendField(Blockly.Msg.MIXLY_MICROBIT_WAIT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};


//DCMotorRun
export const AFMotorRun = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        var MOTOR = [
            ["M1", "1"],
            ["M2", "2"],
            ["M3", "3"],
            ["M4", "4"],
        ];
        var DIRECTION = [
            [Blockly.Msg.MIXLY_FORWARD, "FORWARD"],
            [Blockly.Msg.MIXLY_BACKWARD, "BACKWARD"],
        ];
        this.appendDummyInput("")
            .appendField("AFMotor" + Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown(MOTOR), "motor")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown(DIRECTION), "direction")
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.appendValueInput("speed", Number)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

//DCMotorStop
export const AFMotorStop = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        var MOTOR = [
            ["M1", "1"],
            ["M2", "2"],
            ["M3", "3"],
            ["M4", "4"],
        ];
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_STOP + "AFMotor" + Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown(MOTOR), "motor");
        this.setPreviousStatement(true);
        this.setNextStatement(true);

    }
};

//初始化DFPlayer Mini
export const arduino_dfplayer_mini_begin = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + " " + Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("dfplayer_pin")
            .setCheck(null)
            .appendField(Blockly.Msg.USE_SERIAL_PORT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_SETUP + " DFPlayer Mini");
        this.setHelpUrl("");
    }
};

//定义DFPlayer Mini 所使用的串口类型
export const arduino_dfplayer_mini_pin = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]]), "pin_type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 设置串口通信的超时时间
export const arduino_dfplayer_mini_setTimeOut = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("timeout_data")
            .setCheck(null)
            .appendField(Blockly.Msg.DFPLAYER_MINI_SET_TIMEOUT);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_SET_TIMEOUT_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 设置音量
export const arduino_dfplayer_mini_volume = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("volume_data")
            .setCheck(null)
            .appendField(Blockly.Msg.DFPLAYER_MINI_SET_VOLUME);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_SET_VOLUME_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 音量+|-
export const arduino_dfplayer_mini_volume_up_down = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MP3_VOL_UP, "volumeUp"], [Blockly.Msg.MIXLY_MP3_VOL_DOWN, "volumeDown"]]), "volume_type");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_VOLUME_UP_DOWN_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 设置音效
export const arduino_dfplayer_mini_EQ = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("eq_data")
            .setCheck(null)
            .appendField(Blockly.Msg.DFPLAYER_MINI_SET_EQ);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_SET_EQ_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 定义音效类型
export const arduino_dfplayer_mini_EQ_type = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MP3_EQ_NORMAL, "DFPLAYER_EQ_NORMAL"], [Blockly.Msg.MIXLY_MP3_EQ_POP, "DFPLAYER_EQ_POP"], [Blockly.Msg.MIXLY_MP3_EQ_ROCK, "DFPLAYER_EQ_ROCK"], [Blockly.Msg.MIXLY_MP3_EQ_CLASSIC, "DFPLAYER_EQ_CLASSIC"], [Blockly.Msg.MIXLY_MP3_EQ_JAZZ, "DFPLAYER_EQ_JAZZ"], [Blockly.Msg.MIXLY_MP3_EQ_BASS, "DFPLAYER_EQ_BASS"]]), "eq_type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 指定播放设备
export const arduino_dfplayer_mini_outputDevice = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("outputdevice_data")
            .setCheck(null)
            .appendField(Blockly.Msg.DFPLAYER_MINI_SET_OUTPUTDEVICE);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_SET_OUTPUTDEVICE_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 定义播放设备类型
export const arduino_dfplayer_mini_outputDevice_type = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["SD卡", "DFPLAYER_DEVICE_SD"], ["U盘", "DFPLAYER_DEVICE_U_DISK"], ["AUX", "DFPLAYER_DEVICE_AUX"], ["SLEEP", "DFPLAYER_DEVICE_SLEEP"], ["FLASH", "DFPLAYER_DEVICE_FLASH"]]), "outputdevice_type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 设置-1
export const arduino_dfplayer_set_1 = {
    init: function () {
        var DATA = [
            [Blockly.Msg.MIXLY_MP3_PREV, "previous"],
            [Blockly.Msg.MIXLY_MP3_NEXT, "next"],
            [Blockly.Msg.MIXLY_MP3_PLAY, "start"],
            [Blockly.Msg.MIXLY_MP3_PAUSE, "pause"],
            [Blockly.Msg.DFPLAYER_MINI_STOP_ADVERTISE, "stopAdvertise"],
            [Blockly.Msg.DFPLAYER_MINI_ENABLE_LOOP, "enableLoop"],
            [Blockly.Msg.DFPLAYER_MINI_DISABLE_LOOP, "disableLoop"],
            [Blockly.Msg.DFPLAYER_MINI_ENABLE_LOOP_ALL, "enableLoopAll"],
            [Blockly.Msg.DFPLAYER_MINI_DISABLE_LOOP_ALL, "disableLoopAll"],
            [Blockly.Msg.DFPLAYER_MINI_RANDOM_ALL, "randomAll"],
            [Blockly.Msg.DFPLAYER_MINI_ENABLE_DAC, "enableDAC"],
            [Blockly.Msg.DFPLAYER_MINI_DISABLE_DAC, "disableDAC"],
            [Blockly.Msg.DFPLAYER_MINI_SLEEP, "sleep"],
            [Blockly.Msg.HTML_RESET, "reset"]
        ];
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name")
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown(DATA), "set_data");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 播放和循环指定曲目
export const arduino_dfplayer_play_loop = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("play_data")
            .setCheck(null)
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MP3_PLAY, "play"], [Blockly.Msg.MIXLY_MP3_LOOP_ONE, "loop"], [Blockly.Msg.DFPLAYER_MINI_ADVERTISE, "advertise"], [Blockly.Msg.DFPLAYER_MINI_PLAYMP3FOLDER, "playMp3Folder"]]), "play_type")
            .appendField(Blockly.Msg.DFPLAYER_MINI_SONG);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_PLAY_LOOP_TOOLTIP);
        this.setHelpUrl("");
    },
    onchange: function () {
        var dropdown_play_type = this.getFieldValue('play_type');
        if (dropdown_play_type == 'advertise')
            this.setTooltip(Blockly.Msg.DFPLAYER_MINI_PLAY_ADVERTISE_TOOLTIP);
        else if (dropdown_play_type == 'playMp3Folder')
            this.setTooltip(Blockly.Msg.DFPLAYER_MINI_PLAY_PLAYMP3FOLDER_TOOLTIP);
        else
            this.setTooltip(Blockly.Msg.DFPLAYER_MINI_PLAY_LOOP_TOOLTIP);
    }
};

//DFPlayer Mini 播放指定文件夹下的曲目
export const arduino_dfplayer_playFolder = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("fold_data")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MP3_PLAY)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DFPLAYER_MINI_FOLDER, "playFolder"], [Blockly.Msg.DFPLAYER_MINI_LARGEFOLDER, "playLargeFolder"]]), "fold_type");
        this.appendValueInput("play_data")
            .setCheck(null)
            .appendField(Blockly.Msg.DFPLAYER_MINI_SONG);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_PLAY_PLAYFOLDER_TOOLTIP);
        this.setHelpUrl("");
    },
    onchange: function () {
        var dropdown_fold_type = this.getFieldValue('fold_type');
        if (dropdown_fold_type == 'playFolder')
            this.setTooltip(Blockly.Msg.DFPLAYER_MINI_PLAY_PLAYFOLDER_TOOLTIP);
        else
            this.setTooltip(Blockly.Msg.DFPLAYER_MINI_PLAY_PLAYLARGEFOLDER_TOOLTIP);
    }
};

//DFPlayer Mini 循环播放指定文件夹下的曲目
export const arduino_dfplayer_loopFolder = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("fold_data")
            .setCheck(null)
            .appendField(Blockly.Msg.DFPLAYER_MINI_LOOP_FOLDER);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_LOOP_FOLDER_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 获取当前信息
export const arduino_dfplayer_read_now = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendDummyInput()
            .appendField(' ' + Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_PULSEIN_STAT, "readState"], [Blockly.Msg.MIXLY_MP3_VOL, "readVolume"], [Blockly.Msg.MIXLY_MP3_EQ_MODE, "readEQ"]]), "read_type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_READ_NOW_DATA_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 获取U盘|SD卡|FLASH的总文件数
export const arduino_dfplayer_readFileCounts = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("device_type")
            .setCheck(null)
            .appendField(' ' + Blockly.Msg.MIXLY_GET);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DFPLAYER_MINI_READ_FILE_COUNTS, "readFileCounts"], [Blockly.Msg.DFPLAYER_MINI_READ_CURRENT_FILE_NUMBER, "readCurrentFileNumber"]]), "play_data");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_READ_FILE_COUNTS_TOOLTIP);
        this.setHelpUrl("");
    }
};

//DFPlayer Mini 获取指定文件夹下的文件数
export const arduino_dfplayer_readFileCountsInFolder = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendValueInput("folder_data")
            .setCheck(null)
            .appendField(' ' + Blockly.Msg.MIXLY_GET + ' ' + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MKDIR);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DFPLAYER_MINI_READ_FILE_COUNTS);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_READ_FILE_COUNTS_INFOLDER_TOOLTIP);
        this.setHelpUrl("");
    }
};

export const arduino_dfplayer_available = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.YX5200_MP3)
            .appendField(new Blockly.FieldTextInput("myPlayer"), "dfplayer_name");
        this.appendDummyInput()
            .appendField(".")
            .appendField(new Blockly.FieldDropdown([["available", "available"], ["readType", "readType"], ["read", "read"]]), "type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.DFPLAYER_MINI_AVAILABLE_TOOLTIP);
        this.setHelpUrl("");
    },
    onchange: function () {
        var dropdown_type = this.getFieldValue('type');
        if (dropdown_type == 'available')
            this.setTooltip(Blockly.Msg.DFPLAYER_MINI_AVAILABLE_TOOLTIP);
        else if (dropdown_type == 'readType')
            this.setTooltip(
                Blockly.Msg.DFPLAYER_MINI_READ_TYPE_TOOLTIP
                + "\n" + Blockly.Msg.RETURN_DATA_ANALYSIS + "："
                + "\n0 - TimeOut"
                + "\n1 - WrongStack"
                + "\n2 - DFPlayerCardInserted"
                + "\n3 - DFPlayerCardRemoved"
                + "\n4 - DFPlayerCardOnline"
                + "\n5 - DFPlayerUSBInserted"
                + "\n6 - DFPlayerUSBRemoved"
                + "\n7 - DFPlayerPlayFinished"
                + "\n8 - DFPlayerError"
            );
        else
            this.setTooltip(
                Blockly.Msg.DFPLAYER_MINI_READ_TOOLTIP
                + "\n" + Blockly.Msg.RETURN_DATA_ANALYSIS + "："
                + "\n1 - Busy"
                + "\n2 - Sleeping"
                + "\n3 - SerialWrongStack"
                + "\n4 - CheckSumNotMatch"
                + "\n5 - FileIndexOut"
                + "\n6 - FileMismatch"
                + "\n7 - Advertise"
            );
    }
};
var I2C_Motor_SELECT = [["M0", "0"], ["M1", "1"], ["M2", "2"], ["M3", "3"], ["M4", "4"], ["M5", "5"], ["M6", "6"], ["M7", "7"]];

export const I2Cmotor = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField("I2C" + Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown(I2C_Motor_SELECT), "motor");
        this.appendValueInput("SPEED").setCheck(Number).appendField(Blockly.Msg.MIXLY_MOTOR_SPEED);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

//N910X MP3模块 控制
var M9101X_S_MP3_CONTROL_TYPE = [
    [Blockly.Msg.MIXLY_MP3_PLAY, "play();"],
    [Blockly.Msg.MIXLY_MP3_PAUSE, "pause();"],
    [Blockly.Msg.MIXLY_STOP, "stop();"],
    [Blockly.Msg.MIXLY_MP3_NEXT, "play_down();"],
    [Blockly.Msg.MIXLY_MP3_PREV, "play_up();"],
    [Blockly.Msg.MIXLY_MP3_LOOP_ALL, "cycle_all();"],
    [Blockly.Msg.MIXLY_MP3_LOOP_ONE, "cycle_single();"],
    ["切换到TF卡", "set_sd();"],
    ["切换到" + Blockly.Msg.MIXLY_MP3_UDISK, "set_usb_flash();"],
    ["切换到MP3模式", "set_mp3();"],
    ["切换到flash模式", "set_flash();"],
    ["切换音乐风格", "set_eq();"],
];

export const M9101X_S_MP3_CONTROL = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("").appendField("N9X01 " + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("").appendField(Blockly.Msg.MIXLY_STAT).appendField(new Blockly.FieldDropdown(M9101X_S_MP3_CONTROL_TYPE), "CONTROL_TYPE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};
//N910X MP3模块 音量设置
export const M9101X_S_MP3_VOL_CONTROL = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("").appendField("N9X01 " + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("PIN", Number).appendField(Blockly.Msg.MIXLY_PIN).setCheck(Number);
        this.appendDummyInput("").appendField(Blockly.Msg.MIXLY_MP3_VOL);
        this.appendValueInput("NUM", Number).appendField(Blockly.Msg.MIXLY_STAT).setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//N910X MP3模块播放第N首
export const M9101X_S_MP3_PLAY_NUM = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("").appendField("N9X01 " + Blockly.Msg.GD5800_MP3);
        this.appendValueInput("PIN", Number).appendField(Blockly.Msg.MIXLY_PIN).setCheck(Number);
        this.appendValueInput("NUM", Number).appendField(Blockly.Msg.MIXLY_MP3_PLAY_NUM).setCheck(Number);
        this.appendDummyInput("").appendField("首");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};