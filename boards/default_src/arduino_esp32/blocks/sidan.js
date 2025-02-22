import * as Blockly from 'blockly/core';

const ACTUATOR_HUE = 100;

Blockly.Msg.TURN_OFF_BLUETOOTH_TO_CONNECT = "关闭蓝牙可连接";
Blockly.Msg.TURN_ON_BLUETOOTH_TO_CONNECT = "打开蓝牙可连接";
Blockly.Msg.RANGE_0 = "范围0-30";
Blockly.Msg.HSC025A_CONTROL_INSTRUCTION = "HSC025A控制指令";
Blockly.Msg.HSC025A_DESIGNATED_PLAYBACK = "HSC025A指定播放";
Blockly.Msg.HSC025A_DESIGNATED_PLAYBACK1 = "HSC025A指定播放歌曲名0000-0255";
Blockly.Msg.HSC025A_VOLUME_IS_SET_TO = "HSC025A音量设置为";
Blockly.Msg.BLUETOOTH_ON = "蓝牙开启";
Blockly.Msg.BLUETOOTH_OFF = "蓝牙关闭";
Blockly.Msg.MUTE = "静音";
Blockly.Msg.RESTORE_SOUND = "恢复声音";
Blockly.Msg.STANDBY = "待机";
Blockly.Msg.BOOT = "开机";
Blockly.Msg.PLAY_PAUSE = "播放/暂停";
Blockly.Msg.SHUTDOWN = "关机";
Blockly.Msg.SD_CARD_MODE = "SD卡模式";
Blockly.Msg.BLUETOOTH_MODE = "蓝牙模式";
Blockly.Msg.RESET = "恢复出厂设置";
Blockly.Msg.STOP_PLAYING = "放完停止";
Blockly.Msg.BLUETOOTH_CONNECT = "蓝牙回连";
Blockly.Msg.MATH_DEC_MODE = "方式";
Blockly.Msg.REQUEST_SUCCEEDED = "请求成功";
Blockly.Msg.MIXLY_FAILED = "请求失败";
Blockly.Msg.MODE_SWITCH = "模式切换";
//HSC025A 蓝牙MP3指令
var hsc025a_mode = [
    [Blockly.Msg.MODE_SWITCH, "1"],
    [Blockly.Msg.MIXLY_MP3_PLAY, "2"],
    [Blockly.Msg.MIXLY_MP3_PAUSE, "3"],
    [Blockly.Msg.MIXLY_MP3_NEXT, "4"],
    [Blockly.Msg.MIXLY_MP3_PREV, "5"],
    [Blockly.Msg.MIXLY_MP3_VOL_UP, "6"],
    [Blockly.Msg.MIXLY_MP3_VOL_DOWN, "7"],
    [Blockly.Msg.STANDBY, "8"],
    [Blockly.Msg.BOOT, "9"],
    [Blockly.Msg.PLAY_PAUSE, "10"],
    [Blockly.Msg.MIXLY_MICROBIT_Stop_music, "11"],
    [Blockly.Msg.SHUTDOWN, "12"],
    [Blockly.Msg.SD_CARD_MODE, "13"],
    [Blockly.Msg.BLUETOOTH_MODE, "14"],
    [Blockly.Msg.RESET, "15"],
    [Blockly.Msg.STOP_PLAYING, "16"],
    [Blockly.Msg.BLUETOOTH_CONNECT, "17"],
    [Blockly.Msg.TURN_OFF_BLUETOOTH_TO_CONNECT, "18"],
    [Blockly.Msg.TURN_ON_BLUETOOTH_TO_CONNECT, "19"],
    [Blockly.Msg.BLUETOOTH_ON, "20"],
    [Blockly.Msg.BLUETOOTH_OFF, "21"],
    [Blockly.Msg.MUTE, "22"],
    [Blockly.Msg.RESTORE_SOUND, "23"]
];

export const hsc025a_instruction = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.HSC025A_CONTROL_INSTRUCTION)
            .appendField(new Blockly.FieldDropdown(hsc025a_mode), "instruction");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//指定播放歌曲
export const hsc025a_play = {
    init: function () {
        this.appendValueInput("num")
            .setCheck(null)
            .appendField(Blockly.Msg.HSC025A_DESIGNATED_PLAYBACK);
        this.appendDummyInput();
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.HSC025A_DESIGNATED_PLAYBACK1);
        this.setHelpUrl("");
    }
};

//音量设置
export const hsc025a_volume = {
    init: function () {
        this.appendValueInput("num")
            .setCheck(null)
            .appendField(Blockly.Msg.HSC025A_VOLUME_IS_SET_TO);
        this.appendDummyInput();
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip(Blockly.Msg.RANGE_0);
        this.setHelpUrl("");
    }
};