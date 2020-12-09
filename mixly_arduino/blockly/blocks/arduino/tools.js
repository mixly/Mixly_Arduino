'use strict';

goog.provide('Blockly.Blocks.tools');
goog.require('Blockly.Blocks');
Blockly.Blocks.tools.HUE = "#555555";
Blockly.Blocks.factory_notes = {
  init: function() {
    this.setColour(Blockly.Blocks.tools.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_CONTROL_NOTES)
    .appendField(new Blockly.FieldTextArea(''), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.folding_block = {
  init: function() {
    this.setColour(Blockly.Blocks.tools.HUE);
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput(Blockly.FOLDING_BLOCK), "peien");
    this.appendStatementInput('DO')
    .appendField('');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.FOLDING_BLOCK_HELP);
  }
};


//IIC地址查找
Blockly.Blocks.IICSCAN = {
  init: function () {
    this.setColour(Blockly.Blocks.tools.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.IICSCAN);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

//取模工具显示数据部分
Blockly.Blocks.tool_modulus_show = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.OLED_BITMAP_NAME)
    .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
    .appendField('[')
    .appendField(new Blockly.FieldTextInput('3'), 'x')
    .appendField(']');
    this.appendDummyInput("")
    .appendField(Blockly.SAVETO+" flash")
    .appendField(new Blockly.FieldCheckbox("true"), "save_hz");
    this.appendValueInput("input_data");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};

//取模工具设置部分
Blockly.Blocks.tool_modulus= {
  init: function() { 
    this.appendDummyInput()
    .appendField("点阵格式")
    .appendField(new Blockly.FieldDropdown([["阴码","1"],["阳码","2"]]), "bitmap_formats")
    .appendField(" 取模方式")
    .appendField(new Blockly.FieldDropdown([["逐列式","1"],["逐行式","2"],["列行式","3"],["行列式","4"]]), "modulus_way")
    .appendField(" 取模走向")
    .appendField(new Blockly.FieldDropdown([["顺向(高位在前)","1"],["逆向(低位在前)","2"]]), "modulus_direction");
    this.appendDummyInput()  
    .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NAME)
    .appendField(new Blockly.FieldDropdown([["华文黑体","STHeiti"],["华文楷体","STKaiti"],["华文细黑","STXihei"],["华文宋体","STSong"],["华文中宋","STZhongsong"],["华文仿宋","STFangsong"],["华文彩云","STCaiyun"],["华文琥珀","STHupo"],["华文隶书","STLiti"],["华文行楷","STXingkai"],["华文新魏","STXinwei"],["黑体","simHei"],["宋体","simSun"],["新宋体","NSimSun"],["仿宋","FangSong"],["楷体","KaiTi"],["仿宋_GB2312","FangSong_GB2312"],["楷体_GB2312","KaiTi_GB2312"],["隶书","LiSu"],["幼圆","YouYuan"],["新细明体","PMingLiU"],["细明体","MingLiU"],["标楷体","DFKai-SB"],["微软正黑体","Microsoft JhengHei"],["微软雅黑体","Microsoft YaHei"]]), "hz_sharp")
    .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM)
    .appendField(new Blockly.FieldTextInput("16"), "hz_line_height")
    .appendField("px")
      //.appendField("px "+Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_OFFSET+":")
      //.appendField(new Blockly.FieldDropdown([["上移","hz_up"],["下移","hz_down"]]), "hz_up_down")
      //.appendField(new Blockly.FieldTextInput("0"), "hz_up_down_data")
      //.appendField("px ")
     // .appendField(new Blockly.FieldDropdown([["左移","hz_left"],["右移","hz_right"]]), "hz_left_right")
      //.appendField(new Blockly.FieldTextInput("0"), "hz_left_right_data")
      //.appendField("px");
 // this.appendDummyInput()  
 .appendField(Blockly.MIXLY_WIDTH)
 .appendField(new Blockly.FieldTextInput("16"), "bitmap_width")
 .appendField("px "+Blockly.MIXLY_HEIGHT)
 .appendField(new Blockly.FieldTextInput("16"), "bitmap_height")
 .appendField("px");
//      .appendField(new Blockly.FieldCheckbox("true"), "show_hz");
this.appendDummyInput()  
.appendField("输入数据")
.appendField(new Blockly.FieldTextInput(""), "input_data");
this.setInputsInline(false);
this.setOutput(true, null);
  //this.setColour("#cc66cc");
  this.setColour(180);
  this.setTooltip("");
  this.setHelpUrl("");
}
};

Blockly.Blocks['uno_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/uno.png", 525, 372, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['nano_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/nano.png", 525, 368, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['mega_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/mega.png", 525, 736, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['promini_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/ProMini.png", 525, 371, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['leonardo_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/leonardo.png", 525, 371, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['esp32_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/ESP32.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['esp8266_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/ESP8266-NodeMCU.png",525 ,346, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['wemos_d1_mini_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/ESP8266-WeMos-D1-Mini.png", 525, 264, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['handbit_A'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_A.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['handbit_B'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_B.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['handbit_pin_A'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_pin_A.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['handbit_pin_B'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_pin_B.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['mixgo_pin_A'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/MixGo_pin_A.png", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['mixgo_pin_B'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/MixGo_pin_B.png", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['stm32f103c8t6_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/STM32F103C8T6.png", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl("https://blog.csdn.net/xatsoft/article/details/90687016?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-6.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-6.nonecase");
  }
};
Blockly.Blocks['PocketCard_A'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/PocketCard_A.JPG", 525, 321, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['PocketCard_B'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/PocketCard_B.JPG", 525, 339, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['PocketCard_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/PocketCard_pin.png", 525, 440, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//获取两个日期差值
Blockly.Blocks['get_the_number_of_days_between_the_two_dates'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.GET_THE_DIFFERENCE_BETWEEN_TWO_DATES);
    this.appendValueInput("year_start")
        .setCheck(null)
        .appendField(Blockly.START+Blockly.MIXLY_GPS_DATE_YEAR);
    this.appendValueInput("month_start")
        .setCheck(null)
        .appendField(Blockly.START+Blockly.MIXLY_GPS_DATE_MONTH);
    this.appendValueInput("day_start")
        .setCheck(null)
        .appendField(Blockly.START+Blockly.MIXLY_GPS_DATE_DAY );
    this.appendValueInput("year_end")
        .setCheck(null)
        .appendField(Blockly.END+Blockly.MIXLY_GPS_DATE_YEAR);
    this.appendValueInput("month_end")
        .setCheck(null)
        .appendField(Blockly.END+Blockly.MIXLY_GPS_DATE_MONTH);
    this.appendValueInput("day_end")
        .setCheck(null)
        .appendField(Blockly.END+Blockly.MIXLY_GPS_DATE_DAY );
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.tools.HUE);
 this.setTooltip("");
 this.setHelpUrl("https://blog.csdn.net/a_ran/article/details/43601699?utm_source=distribute.pc_relevant.none-task");
  }
};

