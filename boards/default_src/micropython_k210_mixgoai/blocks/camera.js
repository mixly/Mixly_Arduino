import * as Blockly from 'blockly/core';

const CAMERA_HUE = "#bc9705"; //'#9e77c9'//40;

export const mode = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["彩色图(YUV422)", "sensor.YUV422"],
                ["彩色图(RGB565)", "sensor.RGB565"],
                ["灰度图", "sensor.GRAYSCALE"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip();
    }
};

export const size = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["320x240", "sensor.QVGA"],
                ["240x240", "sensor.B240X240"],
                ["128x128", "sensor.B128X128"],
                ["64x64", "sensor.B64X64"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip();
    }
};


export const camera_init = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera")
            .appendField("初始化");
        this.appendValueInput('key1')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("帧格式");
        this.appendValueInput('key2')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("帧大小");
        this.appendValueInput('key3')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图捕捉");
        this.appendValueInput('key4')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("跳帧数");        //this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("初始化摄像头，会自动扫描并获取摄像头型号");
    }
};


export const camera_reset = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendDummyInput()
            .appendField("初始化");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("初始化摄像头，会自动扫描并获取摄像头型号");
    }
};

export const camera_set_pixformat = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('key')
            .appendField("帧格式")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("设置摄像头输出格式");
    }
};

export const camera_set_framesize = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('key')
            .appendField("帧大小")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("设置摄像头输出帧大小");
    }
};

export const camera_run = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('key')
            .appendField("图捕捉")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("开启图像捕捉功能");
    }
};


export const camera_skip_frames = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('frame')
            .appendField("跳帧数")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("摄像头跳过指定帧数");
    }
};

export const camera_snapshot = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendDummyInput()
            .appendField("获取图像");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("控制摄像头捕捉图像");
    }
};

export const camera_shutdown = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('key')
            .appendField("设为")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("启动/关闭摄像头");
    }
};

export const camera_set_hmirror = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('key')
            .appendField("水平镜像")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("设置摄像头水平镜像");
    }
};

export const camera_set_vflip = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('key')
            .appendField("垂直镜像")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("设置摄像头垂直镜像");
    }
};

export const camera_set_colorbar = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendValueInput('key')
            .appendField("彩条模式")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("将摄像头设置为彩条模式");
    }
};

export const camera_getinfo = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["分辨率宽度", "width"],
                ["分辨率高度", "height"],
                ["当前增益值", "get_gain_db"],
                ["帧缓冲图像", "get_fb"],
                ["类型型号ID", "get_id"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("获取当前摄像头信息");
    }
};

export const camera_setmun = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendDummyInput()
            .appendField("设置")
            .appendField(new Blockly.FieldDropdown([
                ["对比度", "set_contrast"],
                ["亮度值", "set_brightness"],
                ["增益值", "set_auto_gain"],
                ["饱和度", "set_saturation"]
            ]), "key");
        this.appendValueInput('num')
            .appendField("值为")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("设置摄像头对比度、亮度、增益、饱和度");
    }
};

export const camera_set_windowing = {
    init: function () {
        this.setColour(CAMERA_HUE);
        this.appendDummyInput()
            .appendField("Camera");
        this.appendDummyInput()
            .appendField("设置窗口");
        this.appendValueInput('numa')
            .appendField("宽为")
            .setCheck(Number);
        this.appendValueInput('numb')
            .appendField("高为")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("设置摄像头窗口大小");
    }
};



