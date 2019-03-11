'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;


//执行器_点阵屏显示_字符显示
Blockly.Blocks.HT16K33_TEXT={
  init:function(){
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField("点阵屏"); 
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 显示");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_EX源_点阵屏显示_输入_字符串");
    this.setHelpUrl('www.ardubits.com');
}
};

//执行器_点阵屏显示_画点显示
Blockly.Blocks.HT16K33_POS = {
  init: function() {
    //执行器_点阵屏显示_画点变量
    var MixGo_DrawPixel_NUM = [
    ["亮", "LED_ON"],
    ["灭", "LED_OFF"]
    ];
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField("点阵屏");
    this.appendValueInput('XVALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" X轴");
    this.appendValueInput("YVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" Y轴");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 单点").appendField(new Blockly.FieldDropdown(MixGo_DrawPixel_NUM), "DrawPixel_TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("MixGo_点阵屏显示（点阵屏单点操作，X轴取值范围1-16,Y轴取值范围1-8）");
    this.setHelpUrl('www.ardubits.com');
}
};

//执行器_点阵屏显示_显示图案
Blockly.Blocks.HT16K33_DisplayChar = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField("点阵屏");
    this.appendValueInput("Chars").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 图案");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("MixGo_点阵屏显示(图案数组勾选设置显示)");
    this.setHelpUrl('www.ardubits.com');
}
};

//执行器_点阵屏显示_图案数组
Blockly.Blocks.HT16K33_LedArray = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField("数组变量").appendField(new Blockly.FieldTextInput("LedArray1"), "VAR");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a81").appendField(new Blockly.FieldCheckbox("FALSE"), "a82").appendField(new Blockly.FieldCheckbox("FALSE"), "a83").appendField(new Blockly.FieldCheckbox("FALSE"), "a84").appendField(new Blockly.FieldCheckbox("FALSE"), "a85").appendField(new Blockly.FieldCheckbox("FALSE"), "a86").appendField(new Blockly.FieldCheckbox("FALSE"), "a87").appendField(new Blockly.FieldCheckbox("FALSE"), "a88").appendField(new Blockly.FieldCheckbox("FALSE"), "a89").appendField(new Blockly.FieldCheckbox("FALSE"), "a810").appendField(new Blockly.FieldCheckbox("FALSE"), "a811").appendField(new Blockly.FieldCheckbox("FALSE"), "a812").appendField(new Blockly.FieldCheckbox("FALSE"), "a813").appendField(new Blockly.FieldCheckbox("FALSE"), "a814").appendField(new Blockly.FieldCheckbox("FALSE"), "a815").appendField(new Blockly.FieldCheckbox("FALSE"), "a816");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a71").appendField(new Blockly.FieldCheckbox("FALSE"), "a72").appendField(new Blockly.FieldCheckbox("FALSE"), "a73").appendField(new Blockly.FieldCheckbox("FALSE"), "a74").appendField(new Blockly.FieldCheckbox("FALSE"), "a75").appendField(new Blockly.FieldCheckbox("FALSE"), "a76").appendField(new Blockly.FieldCheckbox("FALSE"), "a77").appendField(new Blockly.FieldCheckbox("FALSE"), "a78").appendField(new Blockly.FieldCheckbox("FALSE"), "a79").appendField(new Blockly.FieldCheckbox("FALSE"), "a710").appendField(new Blockly.FieldCheckbox("FALSE"), "a711").appendField(new Blockly.FieldCheckbox("FALSE"), "a712").appendField(new Blockly.FieldCheckbox("FALSE"), "a713").appendField(new Blockly.FieldCheckbox("FALSE"), "a714").appendField(new Blockly.FieldCheckbox("FALSE"), "a715").appendField(new Blockly.FieldCheckbox("FALSE"), "a716");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a61").appendField(new Blockly.FieldCheckbox("FALSE"), "a62").appendField(new Blockly.FieldCheckbox("FALSE"), "a63").appendField(new Blockly.FieldCheckbox("FALSE"), "a64").appendField(new Blockly.FieldCheckbox("FALSE"), "a65").appendField(new Blockly.FieldCheckbox("FALSE"), "a66").appendField(new Blockly.FieldCheckbox("FALSE"), "a67").appendField(new Blockly.FieldCheckbox("FALSE"), "a68").appendField(new Blockly.FieldCheckbox("FALSE"), "a69").appendField(new Blockly.FieldCheckbox("FALSE"), "a610").appendField(new Blockly.FieldCheckbox("FALSE"), "a611").appendField(new Blockly.FieldCheckbox("FALSE"), "a612").appendField(new Blockly.FieldCheckbox("FALSE"), "a613").appendField(new Blockly.FieldCheckbox("FALSE"), "a614").appendField(new Blockly.FieldCheckbox("FALSE"), "a615").appendField(new Blockly.FieldCheckbox("FALSE"), "a616");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a51").appendField(new Blockly.FieldCheckbox("FALSE"), "a52").appendField(new Blockly.FieldCheckbox("FALSE"), "a53").appendField(new Blockly.FieldCheckbox("FALSE"), "a54").appendField(new Blockly.FieldCheckbox("FALSE"), "a55").appendField(new Blockly.FieldCheckbox("FALSE"), "a56").appendField(new Blockly.FieldCheckbox("FALSE"), "a57").appendField(new Blockly.FieldCheckbox("FALSE"), "a58").appendField(new Blockly.FieldCheckbox("FALSE"), "a59").appendField(new Blockly.FieldCheckbox("FALSE"), "a510").appendField(new Blockly.FieldCheckbox("FALSE"), "a511").appendField(new Blockly.FieldCheckbox("FALSE"), "a512").appendField(new Blockly.FieldCheckbox("FALSE"), "a513").appendField(new Blockly.FieldCheckbox("FALSE"), "a514").appendField(new Blockly.FieldCheckbox("FALSE"), "a515").appendField(new Blockly.FieldCheckbox("FALSE"), "a516");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a41").appendField(new Blockly.FieldCheckbox("FALSE"), "a42").appendField(new Blockly.FieldCheckbox("FALSE"), "a43").appendField(new Blockly.FieldCheckbox("FALSE"), "a44").appendField(new Blockly.FieldCheckbox("FALSE"), "a45").appendField(new Blockly.FieldCheckbox("FALSE"), "a46").appendField(new Blockly.FieldCheckbox("FALSE"), "a47").appendField(new Blockly.FieldCheckbox("FALSE"), "a48").appendField(new Blockly.FieldCheckbox("FALSE"), "a49").appendField(new Blockly.FieldCheckbox("FALSE"), "a410").appendField(new Blockly.FieldCheckbox("FALSE"), "a411").appendField(new Blockly.FieldCheckbox("FALSE"), "a412").appendField(new Blockly.FieldCheckbox("FALSE"), "a413").appendField(new Blockly.FieldCheckbox("FALSE"), "a414").appendField(new Blockly.FieldCheckbox("FALSE"), "a415").appendField(new Blockly.FieldCheckbox("FALSE"), "a416");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a31").appendField(new Blockly.FieldCheckbox("FALSE"), "a32").appendField(new Blockly.FieldCheckbox("FALSE"), "a33").appendField(new Blockly.FieldCheckbox("FALSE"), "a34").appendField(new Blockly.FieldCheckbox("FALSE"), "a35").appendField(new Blockly.FieldCheckbox("FALSE"), "a36").appendField(new Blockly.FieldCheckbox("FALSE"), "a37").appendField(new Blockly.FieldCheckbox("FALSE"), "a38").appendField(new Blockly.FieldCheckbox("FALSE"), "a39").appendField(new Blockly.FieldCheckbox("FALSE"), "a310").appendField(new Blockly.FieldCheckbox("FALSE"), "a311").appendField(new Blockly.FieldCheckbox("FALSE"), "a312").appendField(new Blockly.FieldCheckbox("FALSE"), "a313").appendField(new Blockly.FieldCheckbox("FALSE"), "a314").appendField(new Blockly.FieldCheckbox("FALSE"), "a315").appendField(new Blockly.FieldCheckbox("FALSE"), "a316");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a21").appendField(new Blockly.FieldCheckbox("FALSE"), "a22").appendField(new Blockly.FieldCheckbox("FALSE"), "a23").appendField(new Blockly.FieldCheckbox("FALSE"), "a24").appendField(new Blockly.FieldCheckbox("FALSE"), "a25").appendField(new Blockly.FieldCheckbox("FALSE"), "a26").appendField(new Blockly.FieldCheckbox("FALSE"), "a27").appendField(new Blockly.FieldCheckbox("FALSE"), "a28").appendField(new Blockly.FieldCheckbox("FALSE"), "a29").appendField(new Blockly.FieldCheckbox("FALSE"), "a210").appendField(new Blockly.FieldCheckbox("FALSE"), "a211").appendField(new Blockly.FieldCheckbox("FALSE"), "a212").appendField(new Blockly.FieldCheckbox("FALSE"), "a213").appendField(new Blockly.FieldCheckbox("FALSE"), "a214").appendField(new Blockly.FieldCheckbox("FALSE"), "a215").appendField(new Blockly.FieldCheckbox("FALSE"), "a216");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a11").appendField(new Blockly.FieldCheckbox("FALSE"), "a12").appendField(new Blockly.FieldCheckbox("FALSE"), "a13").appendField(new Blockly.FieldCheckbox("FALSE"), "a14").appendField(new Blockly.FieldCheckbox("FALSE"), "a15").appendField(new Blockly.FieldCheckbox("FALSE"), "a16").appendField(new Blockly.FieldCheckbox("FALSE"), "a17").appendField(new Blockly.FieldCheckbox("FALSE"), "a18").appendField(new Blockly.FieldCheckbox("FALSE"), "a19").appendField(new Blockly.FieldCheckbox("FALSE"), "a110").appendField(new Blockly.FieldCheckbox("FALSE"), "a111").appendField(new Blockly.FieldCheckbox("FALSE"), "a112").appendField(new Blockly.FieldCheckbox("FALSE"), "a113").appendField(new Blockly.FieldCheckbox("FALSE"), "a114").appendField(new Blockly.FieldCheckbox("FALSE"), "a115").appendField(new Blockly.FieldCheckbox("FALSE"), "a116");
    this.setOutput(true, Number);
    this.setTooltip("MixGo_点阵屏显示");
    this.setHelpUrl('www.ardubits.com');
}
};

//物联网_点阵屏_清除显示
Blockly.Blocks.HT16K33_Displayclear = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField("点阵屏");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("清除显示");   
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("MixGo_清除显示(清除点阵显示)");
    this.setHelpUrl('www.ardubits.com');
}
};
var IMG = [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"],["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]];

Blockly.Blocks.HT16K33_show_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('data')
    .setCheck([String, "esp32_image","List",'Tuple'])
    .appendField(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_OR_ANIMATION);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_SHOW_IMAGE_OR_STRING);
}
};

Blockly.Blocks.HT16K33_blink_rate = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('x')
    .setCheck(Number)
    .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE);
}
};

Blockly.Blocks.HT16K33_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("Brightness")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS);
}
};