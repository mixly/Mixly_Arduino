import * as Blockly from 'blockly/core';

const IMAGE_HUE = "#90A244";

export const true_false = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["否", "0"],
                ["是", "1"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip();
    }
};



export const image_Image = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendValueInput('path')
            .appendField("打开路径")
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("打开一个新的图像对象");
    }
};

export const image_Image1 = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput()
            .appendField("打开空图");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("打开一个空的图像对象");
    }
};

export const image_getinfo = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像信息");
        this.appendValueInput('VAR')
            .appendField("图像")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["宽度", "width"],
                ["高度", "height"],
                ["格式", "format"],
                ["大小", "size"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("获取图像的宽度、高度、格式、大小");
    }
};



export const image_save = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像保存");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('path')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("路径")
            .setCheck(String);
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("图像的副本保存到文件系统");
    }
};


export const image_copy = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像截取");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("复制一个图像图像的副本");
    }
};

//-----------

export const image_RGB = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("RGB");
        this.appendDummyInput()
            .appendField("[");
        this.appendValueInput('R')
            //.appendField(",")
            .setCheck(Number);
        this.appendValueInput('G')
            .appendField(",")
            .setCheck(Number);
        this.appendValueInput('B')
            .appendField(",")
            .setCheck(Number);
        this.appendDummyInput()
            .appendField("]")
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("对图像进行适当压缩");
    }
};

export const image_compress = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像压缩");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('quality')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("压缩率")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("对图像进行适当压缩");
    }
};


export const image_clear = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像清除");
        this.appendValueInput('VAR')
            .appendField("图像")
            .setCheck("var");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("将图像中的所有像素设置为零");
    }
};


export const image_tonew = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像转换");
        this.appendValueInput('VAR')
            .appendField("图像")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("转换为")
            .appendField(new Blockly.FieldDropdown([
                ["灰度图", "to_grayscale"],
                ["彩色图", "to_rgb565"],
                ["彩虹图", "to_rainbow"],
                ["AI格式", "pix_to_ai"],
                ["字节块", "to_bytes"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("将图像转换为灰度图、彩色图、彩虹图像");
    }
};


export const image_set_pixel = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("修改点颜色");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xy");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("设置图像某点像素值");
    }
};

export const image_get_pixel = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("获取点颜色");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xy");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("获取图像某点像素值");
    }
};


//--图像绘制---------------------------------------------------------------//

//----开始--------------cool.ai-----弃用字体加载，出厂内存加载------------------
export const image_font_load = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("字库加载");
        this.appendValueInput('path')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("路径")
            .setCheck(String);
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("从SD中加载需要显示文字的字库");
    }
};

export const image_font_free = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("字库释放");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("释放字库所占的内存");
    }
};

export const image_draw_string_flash = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制文本(中)");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('x0')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("起-x")
            .setCheck(Number);
        this.appendValueInput('y0')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("起-y")
            .setCheck(Number);
        this.appendValueInput('tex')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("内容")
            .setCheck(String);
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('scale')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("字号")
            .setCheck(Number);
        this.appendValueInput('x_spacing')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("间距")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像上绘制一个文本");
    }
};

//----结束--------------cool.ai-----弃用字体加载，出厂内存加载------------------

export const image_draw_string_UTF = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制文本");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('x0')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("起-x")
            .setCheck(Number);
        this.appendValueInput('y0')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("起-y")
            .setCheck(Number);
        this.appendValueInput('tex')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("内容")
            .setCheck(String);
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('scale')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("字号")
            .setCheck(Number);
        this.appendValueInput('x_spacing')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("间距")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像上绘制一个中文文本");
    }
};

export const image_draw_string = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制文本(英)");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('x0')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("起-x")
            .setCheck(Number);
        this.appendValueInput('y0')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("起-y")
            .setCheck(Number);
        this.appendValueInput('tex')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("内容")
            .setCheck(String);
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('scale')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("字号")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像上绘制一个字符文本");
    }
};


export const image_draw_line = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制直线");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xyxy");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('thi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("粗细")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("图像上绘制一条从(x0，y0)到(x1，y1)的线");
    }
};

export const image_draw_arrow = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制箭头");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xyxy");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('thi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("大小")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("图像上绘制一个箭头");
    }
};

export const image_draw_cross = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制十字");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xy");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('size')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("延伸")
            .setCheck(Number);
        this.appendValueInput('thi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("粗细")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("图像上绘制一个十字");
    }
};

export const image_draw_circle = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制圆形");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xyr");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('thi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("粗细")
            .setCheck(Number);
        this.appendValueInput('fil')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("填充")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("图像上绘制一个圆形");
    }
};

export const image_draw_rectangle = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制矩形");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xywh");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('thi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("粗细")
            .setCheck(Number);
        this.appendValueInput('fil')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("填充")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("图像上绘制一个矩形");
    }
};


export const image_draw_keypoints = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制特征点");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('keypoints')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("对象");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput('size')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("大小")
            .setCheck(Number);
        this.appendValueInput('thi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("粗细")
            .setCheck(Number);
        this.appendValueInput('fil')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("填充")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("绘制一个特征点对象的各个点");
    }
};

export const image_draw_image = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("绘制图像");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("坐标-xy");
        this.appendValueInput('x_scale')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("x缩放")
            .setCheck(Number);
        this.appendValueInput('y_scale')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("y缩放")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("绘制一个image图像");
    }
};


//--形状识别----------------------------------------------//



export const image_find_lines = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("直线识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput('threshold')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值")
            .setCheck(Number);
        this.appendValueInput('theta_margin')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("合并角度")
            .setCheck(Number);
        this.appendValueInput('rho_margin')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("合并斜率")
            .setCheck(Number);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[line]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用霍夫变换识别直线，返回image.line对象列表");
    }
};

export const image_find_line_segments = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("线段识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput('distance')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("间距")
            .setCheck(Number);
        this.appendValueInput('difference')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("合并角度")
            .setCheck(Number);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[line]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用霍夫变换识别线段，返回image.line对象列表");
    }
};

export const image_find_circles = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("圆形识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput('threshold')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值")
            .setCheck(Number);
        this.appendValueInput('r_min')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("最小r")
            .setCheck(Number);
        this.appendValueInput('r_max')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("最大r")
            .setCheck(Number);
        this.appendValueInput('r_step')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("步长r")
            .setCheck(Number);
        this.appendValueInput('x_margin')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("合并x值")
            .setCheck(Number);
        this.appendValueInput('y_margin')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("合并y值")
            .setCheck(Number);
        this.appendValueInput('r_margin')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("合并r值")
            .setCheck(Number);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[circle]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用霍夫变换识别圆形，返回image.cirle对象列表");
    }
};

export const image_find_rects = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("矩形识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput('threshold')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值")
            .setCheck(Number);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[rect]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用四元检测识别矩形，返回image.rect对象列表");
    }
};

export const image_get_regression = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("线性回归");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('threshold')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值")
            .setCheck(Number);
        this.appendValueInput('invert')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值反转");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput('robust')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("泰尔指数")
            .setCheck(Number);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[line]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("计算线性回归，返回image.line对象列表");
    }
};

//--形状列表解析------------------------------------------//
export const image_line = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("直线解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xywh", "line"],
                ["x1分量", "x1"],
                ["y1分量", "y1"],
                ["x2分量", "x2"],
                ["y2分量", "y2"],
                ["长度", "length"],
                ["角度", "theta"],
                ["斜率", "rho"],
                ["模", "magnitude"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.line列表，获取直线信息");
    }
};

export const image_circle = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("圆形解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xyr", "circle"],
                ["x分量", "x"],
                ["y分量", "y"],
                ["r分量", "r"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.circle列表，获取圆形信息");
    }
};

export const image_rect = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("矩形解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xywh", "rect"],
                ["x分量", "x"],
                ["y分量", "y"],
                ["w分量", "w"],
                ["h分量", "h"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.rect列表，获取矩形信息");
    }
};


//--图像滤波----------------------------------------------//

export const image_histeq = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("直方图均衡");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('key')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("自适应");
        this.appendValueInput('limit')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("对比度")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像上的简单直方图均衡化");
    }
};

export const image_mean = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("模糊滤波");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput("size")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("卷积核尺寸")
            .setCheck(Number);
        this.appendValueInput('key')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("自适应");
        this.appendValueInput("offset")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("补偿")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像上的简单模糊滤波");
    }
};

export const image_cartoon = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("卡通化滤波");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput("seed")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("原始差异")
            .setCheck(Number);
        this.appendValueInput("float")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("相邻差异")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像上的简单卡通滤波器");
    }
};

export const image_erode = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像腐蚀");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput("size")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("卷积核尺寸")
            .setCheck(Number);
        this.appendValueInput("threshold")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像腐蚀，从分割区域的边缘删除像素（白色目标区域）");
    }
};

export const image_dilate = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像膨胀");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput("size")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("卷积核尺寸")
            .setCheck(Number);
        this.appendValueInput("threshold")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像膨胀，将像素添加到分割区域的边缘中（白色目标区域）");
    }
};

export const image_flood_fill = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像填充");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("开始坐标");
        this.appendValueInput('color')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("颜色")
            .setCheck(Number);
        this.appendValueInput("seed")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("原始差异")
            .setCheck(Number);
        this.appendValueInput("float")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("相邻差异")
            .setCheck(Number);
        this.appendValueInput('invert')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("反转");
        this.appendValueInput('clear')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("清除");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("像洪水一样填充图像中低矮凹陷的地方（洪水填充）");
    }
};

export const image_linpolar = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像投影");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('key')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("垂直投影");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("图像从笛卡尔坐标到线性极坐标重新投影");
    }
};

export const image_invert = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像反转");
        this.appendValueInput('VAR')
            .appendField("图像")
            .setCheck("var");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("翻转图像中的所有像素值");
    }
};

export const image_lens_corr = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("校正缩放");
        this.appendValueInput('VAR')
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput("strength")
            .appendField("校正值")
            .setCheck(Number);
        this.appendValueInput("zoom")
            .appendField("缩放值")
            .setCheck(Number);
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("翻转图像中的所有像素值");
    }
};


export const image_binary = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像二值化");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('threshold')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值")
            .setCheck(Number);
        this.appendValueInput('invert')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值反转");
        this.appendValueInput('zero')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值像素为零");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("根据像素是否在阈值列表 thresholds 中的阈值内，将图像中的所有像素设置为黑色或白色。");
    }
};


export const image_morph = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("图像边缘检测");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('size')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("卷积核尺寸")
            .setCheck(Number);
        this.appendValueInput('kernel')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("内核");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("通过过滤器内核对图像进行卷积。");
    }
};

//--维码识别----------------------------------------------//


export const image_find_barcodes = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("条形码识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[barcode]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setOutput(true);
        this.setTooltip("使用条形码识别，返回image.barcode对象列表");
    }
};

export const image_find_qrcodes = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("二维码识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[qrcode]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用二维码识别，返回image.line对象列表");
    }
};

export const image_find_apriltags = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("AprilTag识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[apriltag]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用image.TAG36H11识别，返回image.apriltag对象列表");
    }
};






//--维码列表解析------------------------------------------//


export const image_qrcode = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("二维码解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xywh", "rect"],
                ["x分量", "x"],
                ["y分量", "y"],
                ["w分量", "w"],
                ["h分量", "h"],
                ["内容", "payload"],
                ["版本", "version"],
                ["掩码", "mask"],
                ["类型", "data_type"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.qrcode列表，获取二维码信息");
    }
};

export const image_barcode = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("条形码解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xywh", "rect"],
                ["x分量", "x"],
                ["y分量", "y"],
                ["w分量", "w"],
                ["h分量", "h"],
                ["内容", "payload"],
                ["类型", "type"],
                ["角度", "rotation"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.barcode列表，获取条形码信息");
    }
};


export const image_apriltag = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("AprilTag解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xywh", "rect"],
                ["x分量", "x"],
                ["y分量", "y"],
                ["w分量", "w"],
                ["h分量", "h"],
                ["中心-x", "cx"],
                ["中心-y", "cy"],
                ["号码", "id"],
                ["家族", "family"],
                ["弧度", "rotation"],
                ["x向距离", "x_translation"],
                ["y向距离", "y_translation"],
                ["z向距离", "z_translation"],
                ["x向弧度", "x_rotation"],
                ["y向弧度", "y_rotation"],
                ["z向弧度", "z_rotation"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.apriltag列表，获取Apriltag信息");
    }
};


//--颜色识别----------------------------------------------//


export const image_find_blobs = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("色块追踪");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("阈值LAB");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput("area")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("滤掉区域")
            .setCheck(Number);
        this.appendValueInput("pixel")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("滤掉素数")
            .setCheck(Number);
        this.appendValueInput("margin")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("合并")
            .setCheck(Number);
        this.appendValueInput('key')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("重叠");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[blob]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用色块追踪，返回image.blob对象列表");
    }
};

export const image_get_histogram = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("颜色识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[histogram]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用直方图识别颜色，返回image.histogram对象列表");
    }
};


//--颜色列表解析------------------------------------------//


export const image_blob = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("追踪解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xywh", "rect"],
                ["x分量", "x"],
                ["y分量", "y"],
                ["w分量", "w"],
                ["h分量", "h"],
                ["中心-x", "cx"],
                ["中心-y", "cy"],
                ["像素量", "pixels"],
                ["弧度", "rotation"],
                ["号码数", "code"],
                ["合并量", "count"],
                ["面积", "area"],
                ["密度比", "density"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过image.blob列表，获取追踪色块信息");
    }
};


export const image_Histogram = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("色阈浮点");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["灰度图浮点列表", "bins"],
                ["LAB的L浮点列表", "l_bins"],
                ["LAB的A浮点列表", "a_bins"],
                ["LAB的B浮点列表", "b_bins"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.barcode列表，获取条形码信息");
    }
};

export const image_percentile = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("颜色解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendValueInput("percentile")
            .appendField("CDF")
            .setCheck(Number);
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["灰度图值", "value"],
                ["LAB的L值", "l_value"],
                ["LAB的A值", "a_value"],
                ["LAB的B值", "b_value"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过histogram列表，获取识别颜色信息");
    }
};

export const image_threshold = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("色阈解析");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["灰度图值", "value"],
                ["LAB的L值", "l_value"],
                ["LAB的A值", "a_value"],
                ["LAB的B值", "b_value"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过遍历image.barcode列表，获取条形码信息");
    }
};

//--颜色格式转换------------------------------------------//


export const image_lab_to_rgb = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("RGB888值");
        this.appendValueInput('LIST')
            .appendField("由LAB");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("LAB转RGB888");
    }
};

export const image_rgb_to_lab = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("LAB值");
        this.appendValueInput('LIST')
            .appendField("由RGB888");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("RGB888转LAB");
    }
};

export const image_rgb_to_grayscale = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("灰度值");
        this.appendValueInput('LIST')
            .appendField("由RGB888");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("RGB888转灰度图");
    }
};

export const image_grayscale_to_rgb = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("RGB888");
        this.appendValueInput("g_value")
            .appendField("由灰度值")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("灰度图转RGB888");
    }
};

//--特征识别----------------------------------------------//

export const image_find_hog = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("定向梯度图");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput("size")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("线长")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("用HOG（定向梯度直方图）线替换ROI中的像素，仅支持灰度图像");
    }
};


export const image_find_keypoints = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("特征识别");
        this.appendValueInput('VAR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("图像")
            .setCheck("var");
        this.appendValueInput('roi')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("区域-xywh");
        this.appendValueInput("max_keypoints")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("关键点数")
            .setCheck(Number);
        this.appendValueInput("threshold")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("角点数")
            .setCheck(Number);
        this.appendValueInput("scale_factor")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("比例因子")
            .setCheck(Number);
        this.appendValueInput("normalized")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("多比例")
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[keypoints]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用特征识别，返回image.keypoints对象列表");
    }
};

export const image_match_descriptor = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("特征比较");
        this.appendValueInput('VAR1')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("对象1")
            .setCheck("var");
        this.appendValueInput('VAR2')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("对象2")
            .setCheck("var");
        this.appendValueInput("threshold")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("相似度")
            .setCheck(Number);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("返回[kptmatch]");
        this.setOutput(true);
        this.setInputsInline(false);
        this.setTooltip("使用特征识别，返回image.keypoints对象列表");
    }
};


//--颜色列表解析------------------------------------------//


export const image_kptmatch = {
    init: function () {
        this.setColour(IMAGE_HUE);
        this.appendDummyInput()
            .appendField("特征信息");
        this.appendValueInput('VAR')
            .appendField("对象")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["坐标-xywh", "rect"],
                ["x分量", "x"],
                ["y分量", "y"],
                ["w分量", "w"],
                ["h分量", "h"],
                ["中心-x", "cx"],
                ["中心-y", "cy"],
                ["匹配量", "count"],
                ["弧度", "theta"],
                ["匹配点-xy", "match"]
            ]), "key");
        this.setOutput(true);
        //this.setInputsInline(true);
        this.setTooltip("通过image.kptmatch列表，获取追踪特征信息");
    }
};





























