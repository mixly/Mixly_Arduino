'use strict';

goog.provide('Blockly.Blocks.nova');

goog.require('Blockly.Blocks');

var NOVA_PORTS =[["C0", "C0"],["C1", "C1"],["S0", "S0"],["S1", "S1"],["S2", "S2"],["S3", "S3"],
["S4", "S4"],["S5", "S5"],["M0", "M0"],["M1", "M1"],["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var THREE_PORTS =[["S0", "S0"],["S1", "S1"],["S2", "S2"],["S3", "S3"],
["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var SERVO_PORTS =[["S0", "2"],["S1", "3"],["S2", "4"],["S3", "5"],
["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var DITIGAL_PORTS =[["S0", "S0"],["S1", "S1"],["S2", "S2"],["S3", "S3"],
["S4", "S4"],["S5", "S5"]];

var ANALOG_PORTS =[["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var FOUR_PORTS =[["C0", "C0"],["C1", "C1"],["S4", "S4"],["S5", "S5"]];

var MOTOR_PORTS =[["M0", "M0"],["M1", "M1"]];

var BLUETOOTH_PORTS =[["C0", "C0"]];  // 后续 S4也可以

var RTC_TIME = [[Blockly.LKL_NOVA_RTC_SEC, "getsecond()"],[Blockly.LKL_NOVA_RTC_MIN, "getminute()"],
                [Blockly.LKL_NOVA_RTC_HOUR, "gethour()"],[Blockly.LKL_NOVA_RTC_WEEK, "getdayOfWeek()"],
                [Blockly.LKL_NOVA_RTC_DAY, "getdayOfMonth()"],[Blockly.LKL_NOVA_RTC_MON, "getmonth()"],
                [Blockly.LKL_NOVA_RTC_YEAR, "getyear()"]];


// 颜色
Blockly.Blocks.nova.HUE = 40;

// LED
Blockly.Blocks.Nova_Led = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_LED)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_led.jpg", 37, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(Blockly.LKL_NOVA_STAT)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_LED_ON, "On()"], [Blockly.LKL_NOVA_LED_OFF, "Off()"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// 单按钮
Blockly.Blocks.Nova_Button = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_BTN)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Button.jpg", 37, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_BUTTON_PRESSED, "1"],[Blockly.LKL_NOVA_BUTTON_RELEASED, "0"]]), "STAT");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

// 4按钮
Blockly.Blocks.Nova_4Button = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_BTN)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_4ADButton.jpg", 37, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
  this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_ABCD)
        .appendTitle(new Blockly.FieldDropdown([["A", "A_ButtonState()"], ["B", "B_ButtonState()"], ["C", "C_ButtonState()"], ["D", "D_ButtonState()"]]), "ABCD")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_BUTTON_PRESSED, "1"],[Blockly.LKL_NOVA_BUTTON_RELEASED, "0"]]), "STAT");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

// 倾斜开关
Blockly.Blocks.Nova_TiltSwitch = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_TILTSWITCH)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_TiltSwitch.jpg", 37, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

// 声音
Blockly.Blocks.Nova_Sound = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_SOUND)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Sound.jpg", 37, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

// 限位
Blockly.Blocks.Nova_LimitSwitch = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_LIMISWICTH)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_LimitSwitch.jpg", 37, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_BUTTON_PRESSED, "1"],[Blockly.LKL_NOVA_BUTTON_RELEASED, "0"]]), "STAT");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

// 光敏
Blockly.Blocks.Nova_Light={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_LIGHT)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_LightSensor.jpg", 30, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 蜂鸣
Blockly.Blocks.Nova_Buzzer = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_BUZZER)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Buzzer.jpg", 39, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_FREQUENCY);
    this.appendValueInput('DURATION')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_LKL_DURATION);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

// 超声波
Blockly.Blocks.Nova_Ultrasonic={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_ULTRASONIC)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Ultrasonic.jpg", 50, 30))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 温湿度
Blockly.Blocks.Nova_DHTxx={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_DHT11)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_DHTxx.jpg", 45, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_TYPE)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_DHT11_H, "readHumidity()"], [Blockly.LKL_NOVA_DHT11_T, "readTemperature()"]]), "dht");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 2路巡线
Blockly.Blocks.Nova_2LineFinder = {
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_LINEFINDER)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_2LineFinder.jpg", 42.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_GET_STAT)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_L, "stateL()"], [Blockly.LKL_NOVA_R, "stateR()"]]), "linefinder");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Nova_2LineFinder_readLineState = {
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_LINEFINDER)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_2LineFinder.jpg", 42.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_READ);
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 数码管
Blockly.Blocks.Nova_4DigitDisplay={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_4DIGITDISPLAY)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_4DigitDisplay.jpg", 50, 30))
      .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendValueInput('num')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_DISPLAY_NUMBER);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.Nova_4DigitDisplay_Time={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_4DIGITDISPLAY)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_4DigitDisplay.jpg", 50, 30))
      .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendValueInput('hour')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_DISPLAY_HOUR);
    this.appendValueInput('min')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_DISPLAY_MIN);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

// 时钟
Blockly.Blocks.Nova_RTC={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_RTC)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_RTC.jpg", 30, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_GET_STAT)
        .appendTitle(new Blockly.FieldDropdown(RTC_TIME), "RTC");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 红外遥控接收
Blockly.Blocks.Nova_IrRev={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_IR_REC)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_IrRev.jpg", 30, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 蓝牙
Blockly.Blocks.Nova_Bluetooth_available = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_BLUETOOTH)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_BlueTooth.jpg", 45, 32))
    .appendTitle(Blockly.LKL_NOVA_BLUETOOTH_AVAILABLE);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Nova_Bluetooth_readString = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_BLUETOOTH)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_BlueTooth.jpg", 45, 32))
    .appendTitle(Blockly.LKL_NOVA_BLUETOOTH_READ_STR);
    this.setOutput(true, String);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Nova_Bluetooth_readRC = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_BLUETOOTH)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_BlueTooth.jpg", 45, 32))
    .appendTitle(Blockly.LKL_NOVA_BLUETOOTH_READ_NUM);
    this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 舵机
Blockly.Blocks.Nova_Servo = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_SERVO)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Servo.png", 39, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(SERVO_PORTS), "PIN");
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_NOVA_DEGREE_0_180);
    this.appendValueInput("DELAY_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_NOVA_DELAY+'('+Blockly.LKL_NOVA_DELAY_MS+')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// 电机
Blockly.Blocks.Nova_Motor={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_MOTOR)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Motor.jpg", 37, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(MOTOR_PORTS), "PIN");
    this.appendValueInput('speed')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


















