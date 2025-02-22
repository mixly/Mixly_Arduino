import * as Blockly from 'blockly/core';

const DISPLAY_HUE = 180; //'#cc6688' //180;
const SENSOR_HUE = 40;

export const angle = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["0°", "0"],
                ["90°", "1"],
                ["180°", "2"],
                ["270°", "3"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip();
    }
};

export const lcd_color = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["黑色", "lcd.BLACK"],
                ["深蓝色", "lcd.NAVY"],
                ["蓝色", "lcd.BLUE"],
                ["深绿色", "lcd.DARKGREEN"],
                ["深青色", "lcd.DARKCYAN"],
                ["绿色", "lcd.GREEN"],
                ["青色", "lcd.CYAN"],
                ["褐红色", "lcd.MAROON"],
                ["紫色", "lcd.PURPLE"],
                ["橄榄色", "lcd.OLIVE"],
                ["深灰色", "lcd.DARKGREY"],
                ["绿黄色", "lcd.GREENYELLOW"],
                ["浅灰色", "lcd.LIGHTGREY"],
                ["红色", "lcd.RED"],
                ["洋红色", "lcd.MAGENTA"],
                ["粉红色", "lcd.PINK"],
                ["橙色", "lcd.ORANGE"],
                ["黄色", "lcd.YELLOW"],
                ["白色", "lcd.WHITE"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip();
    }
};

export const on_off = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["开启", "1"],
                ["关闭", "0"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip();
    }
};



export const lcd_init = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD 初始化");
        this.appendValueInput('freq')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("通信频率")
            .setCheck(Number);
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("背景颜色")
            .setCheck(Number);
        //this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("初始化LCD屏幕显示");
    }
};

export const lcd_width = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD 获取 ");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["宽度", "width"],
                ["高度", "height"]
            ]), "key");
        this.appendDummyInput()
            .appendField("分辨率");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("获取LCD的宽度/高度（水平分辨率）");
    }
};

export const lcd_colour = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD");
        this.appendValueInput('key')
            .appendField("系统颜色")
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("获取LCD的宽度/高度（水平分辨率）");
    }
};

export const lcd_display = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD 显示图像");
        this.appendValueInput('img')
            .appendField("");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("在液晶屏上显示一张image（GRAYSCALE或RGB565");
    }
};

export const lcd_clear = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD 清屏颜色");
        this.appendValueInput('color')
            .appendField("")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("将液晶屏清空为指定的颜色");
    }
};

export const lcd_rotation = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD 屏幕旋转");
        this.appendValueInput('key')
            .appendField("")
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("设置LCD屏幕方向");
    }
};

export const lcd_mirror = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD 镜像显示");
        this.appendValueInput('key')
            .appendField("")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("设置LCD是否镜面显示");
    }
};

export const lcd_draw_string = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField("LCD 绘制文本");
        this.appendValueInput('x')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标X")
            .setCheck(Number);
        this.appendValueInput('y')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标Y")
            .setCheck(Number);
        this.appendValueInput('text')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("文本内容")
            .setCheck(String);
        this.appendValueInput('color_T')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("文本颜色")
            .setCheck(Number);
        this.appendValueInput('color_S')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("背景颜色")
            .setCheck(Number);
        //this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("在液晶屏上显示文本字符（不支持中文）");
    }
};

export const touch_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField("Touch 初始化");
        this.appendValueInput('I2C')
            .appendField("通信")
            .setCheck("var");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("初始化触摸屏");
    }
};

export const touch_calibrate = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField("Touch 校准");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("校准屏幕，使屏幕显示和触摸屏像素能够对应");
    }
};

export const touch_read = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField("Touch 获取 ");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["状态", "[0]"],
                ["坐标x", "[1]"],
                ["坐标y", "[2]"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("读取当前屏幕的状态以及按下的点的坐标值");
    }
};

//ts.STATUS_IDLE==0
//ts.STATUS_RELEASE==1
//ts.STATUS_PRESS==2
//ts.STATUS_MOVE==3

export const touch_info = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField("Touch 状态");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["空闲", "ts.STATUS_IDLE"],
                ["不按", "ts.STATUS_RELEASE"],
                ["按下", "ts.STATUS_PRESS"],
                ["移动", "ts.STATUS_MOVE"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("读取当前屏幕的状态以及按下的点的坐标值");
    }
};


