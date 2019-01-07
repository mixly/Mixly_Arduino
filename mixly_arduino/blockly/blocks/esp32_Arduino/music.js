'use strict';

goog.provide('Blockly.Blocks.music');
goog.require('Blockly.Blocks');

Blockly.Blocks.music.HUE = 200;


// Blockly.Blocks.tone_notes = {
//    init: function() {
//     this.setColour(Blockly.Blocks.actuator.HUE);
//     this.appendDummyInput("")
//         .appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
//     this.setOutput(true, Number);
//   }
// };


// Blockly.Blocks.controls_tone={
// init:function(){
//     this.setColour(Blockly.Blocks.actuator.HUE);
// 	this.appendValueInput("PIN", Number)
//         .appendField(Blockly.MIXLY_TONE_PIN)
//         .setCheck(Number);
//     this.appendValueInput('FREQUENCY')
//         .setCheck(Number)
//         //.setAlign(Blockly.ALIGN_RIGHT)
//         .appendField(Blockly.MIXLY_FREQUENCY);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
// 	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
//   }
// };

// Blockly.Blocks.controls_tone2={
// init:function(){
//     this.setColour(Blockly.Blocks.actuator.HUE);
//     this.appendValueInput("PIN", Number)
//         .appendField(Blockly.MIXLY_TONE_PIN)
//         .setCheck(Number);
//     this.appendValueInput('FREQUENCY')
//         .setCheck(Number)
//         //.setAlign(Blockly.ALIGN_RIGHT)
//         .appendField(Blockly.MIXLY_FREQUENCY);
//     this.appendValueInput('DURATION')
//         .setCheck(Number)
//         //.setAlign(Blockly.ALIGN_RIGHT)
//         .appendField(Blockly.MIXLY_DURATION);
// 	this.appendDummyInput("")
// 		.appendField(Blockly.MIXLY_DELAY_MS);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
// 	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
//   }
// };

// Blockly.Blocks.controls_notone={
// init:function(){
//     this.setColour(Blockly.Blocks.actuator.HUE);
// 	this.appendValueInput("PIN", Number)
//         .appendField(Blockly.MIXLY_NOTONE_PIN)
//         .setCheck(Number);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
// 	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
//   }
// };

//蜂鸣器频率
var TONE_NOTES = [
["NOTE_C5", "532"],
["NOTE_D5", "587"],
["NOTE_E5", "659"],
["NOTE_F5", "698"],
["NOTE_G5", "784"],
["NOTE_A5", "880"],
["NOTE_B5", "988"],
["NOTE_C6", "1048"],
["NOTE_D6", "1176"],
["NOTE_E6", "1320"],
["NOTE_F6", "1396"],
["NOTE_G6", "1568"],
["NOTE_A6", "1760"],
["NOTE_B6", "1976"],
["NOTE_C7", "2096"],
["NOTE_D7", "2352"],
["NOTE_E7", "2640"],
["NOTE_F7", "2792"],
["NOTE_G7", "3136"],
["NOTE_A7", "3520"],
["NOTE_B7", "3952"]];

//执行器-蜂鸣器的频率选择
Blockly.Blocks.tone_notes = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
    this.setOutput(true, Number);
}
};

//执行器-蜂鸣器模块
Blockly.Blocks.controls_tone2 = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_DF_BUZZER);
    this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput('FREQUENCY').setCheck(Number).appendField(Blockly.MIXLY_FREQUENCY);
    this.appendValueInput('DURATION', Number).setCheck(Number).appendField(Blockly.MIXLY_DURATION);
    this.appendDummyInput("").appendField(Blockly.MIXLY_DELAY_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

//执行器-蜂鸣器停止模块
Blockly.Blocks.controls_notone = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_NOTONE_PIN);
    this.appendValueInput("PIN", Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

//MP3播放控制
var GD5800_MP3_CONTROL_TYPE = [
[Blockly.MIXLY_MP3_PLAY, "play();"],
[Blockly.MIXLY_MP3_PAUSE, "pause();"],
[Blockly.MIXLY_MP3_NEXT, "next();"],
[Blockly.MIXLY_MP3_PREV, "prev();"],
[Blockly.MIXLY_MP3_VOL_UP, "volumeUp();"],
[Blockly.MIXLY_MP3_VOL_DOWN, "volumeDn();"]
];

//GD5800 MP3模块
Blockly.Blocks.GD5800_MP3_CONTROL = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_TX_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_RX_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_STAT).appendField(new Blockly.FieldDropdown(GD5800_MP3_CONTROL_TYPE), "CONTROL_TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
}
};

//MP3循环模式
var GD5800_MP3_LOOP_MODE = [
[Blockly.MIXLY_MP3_LOOP_ALL, "MP3_LOOP_ALL"],
[Blockly.MIXLY_MP3_LOOP_FOLDER, "MP3_LOOP_FOLDER"],
[Blockly.MIXLY_MP3_LOOP_ONE, "MP3_LOOP_ONE"],
[Blockly.MIXLY_MP3_LOOP_RAM, "MP3_LOOP_RAM"]
];

//GD5800 MP3模块循环模式
Blockly.Blocks.GD5800_MP3_LOOP_MODE = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_MP3_LOOP_MODE).appendField(Blockly.MIXLY_STAT).appendField(new Blockly.FieldDropdown(GD5800_MP3_LOOP_MODE), "LOOP_MODE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
}
};

//MP3 设置EQ
var GD5800_MP3_EQ_MODE = [
[Blockly.MIXLY_MP3_EQ_NORMAL, "MP3_EQ_NORMAL"],
[Blockly.MIXLY_MP3_EQ_POP, "MP3_EQ_POP"],
[Blockly.MIXLY_MP3_EQ_ROCK, "MP3_EQ_ROCK"],
[Blockly.MIXLY_MP3_EQ_JAZZ, "MP3_EQ_JAZZ"],
[Blockly.MIXLY_MP3_EQ_CLASSIC, "MP3_EQ_CLASSIC"],
[Blockly.MIXLY_MP3_EQ_BASS, "MP3_EQ_BASS"]
];

//GD5800 MP3模块EQ模式
Blockly.Blocks.GD5800_MP3_EQ_MODE = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_MP3_EQ_MODE).appendField(Blockly.MIXLY_STAT).appendField(new Blockly.FieldDropdown(GD5800_MP3_EQ_MODE), "EQ_MODE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
}
};

//GD5800 MP3模块设置音量
Blockly.Blocks.GD5800_MP3_VOL = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_MP3_VOL);
    this.appendValueInput("vol", Number).appendField(Blockly.MIXLY_STAT).setCheck(Number);  
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
}
};

//GD5800 MP3模块播放第N首
Blockly.Blocks.GD5800_MP3_PLAY_NUM = {
  init: function() {
    this.setColour(Blockly.Blocks.music.HUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("NUM", Number).appendField(Blockly.MIXLY_MP3_PLAY_NUM).setCheck(Number);  
    this.appendDummyInput("").appendField("首");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('歌曲顺序按照存入U盘时间排序。');
    this.setHelpUrl();
}
};
