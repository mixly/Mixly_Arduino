'use strict';

goog.provide('Blockly.Blocks.nova');

goog.require('Blockly.Blocks');

var NOVA_PORTS =[["C0", "C0"],["C1", "C1"],["S0", "S0"],["S1", "S1"],["S2", "S2"],["S3", "S3"],
["M2", "M2"],["M3", "M3"],["M0", "M0"],["M1", "M1"],["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var THREE_PORTS =[["S0", "S0"],["S1", "S1"],["S2", "S2"],["S3", "S3"],
["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var SERVO_PORTS =[["S0", "2"],["S1", "9"],["S2", "10"],["S3", "13"],
["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var DITIGAL_PORTS =[["S0", "S0"],["S1", "S1"],["S2", "S2"],["S3", "S3"]];

var ANALOG_PORTS =[["A0", "A0"],["A1", "A1"],["A2", "A2"],["A3", "A3"]];

var FOUR_PORTS =[["C1", "C1"],["M0", "M0"],["M1", "M1"],["M2", "M2"],["M3", "M3"],["C0", "C0"]];

var MOTOR_PORTS =[["M0", "M0"],["M1", "M1"],["M2", "M2"],["M3", "M3"]];

var MOTOR_PORTS_2 =[["M1", "M1"],["M0", "M0"],["M2", "M2"],["M3", "M3"]];

var BLUETOOTH_PORTS =[["M2", "M2"],["C0", "C0"]];  

var PWM_PORTS =[["S1", "S1"],["S2", "S2"]];  

var RTC_TIME = [[Blockly.LKL_NOVA_RTC_SEC, "getSecond()"],[Blockly.LKL_NOVA_RTC_MIN, "getMinute()"],
                [Blockly.LKL_NOVA_RTC_HOUR, "getHour()"],[Blockly.LKL_NOVA_RTC_WEEK, "getWeek()"],
                [Blockly.LKL_NOVA_RTC_DAY, "getDay()"],[Blockly.LKL_NOVA_RTC_MON, "getMonth()"],
                [Blockly.LKL_NOVA_RTC_YEAR, "getYear()"]];


// 颜色
Blockly.Blocks.nova.HUE = 40;

// 设置数字量
Blockly.Blocks.Nova_digital_write = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_DIGITAL_OUT)
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(Blockly.LKL_NOVA_STAT)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_HIGH, "HIGH"], [Blockly.LKL_NOVA_LOW, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// 读数字量
Blockly.Blocks.Nova_digital_read = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DIGITAL_IN)
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_HIGH, "1"], [Blockly.LKL_NOVA_LOW, "0"]]), "STAT");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

// 设置PWM
Blockly.Blocks.Nova_analog_write = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_ANALOG_WRITE)
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(PWM_PORTS), "PIN")
   this.appendValueInput("NUM", Number)   
        .appendTitle(Blockly.LKL_NOVA_PWM_SET)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

// 读模拟口
Blockly.Blocks.Nova_analog_read={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_ANALOG_READ)
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// LED
Blockly.Blocks.Nova_Led = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_LED)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_led.jpg", 68, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(Blockly.LKL_NOVA_STAT)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_LED_ON, "on()"], [Blockly.LKL_NOVA_LED_OFF, "off()"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// Led_PWM
Blockly.Blocks.Nova_Led_PWM = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_LED)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_led.jpg", 68, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(PWM_PORTS), "PIN")
   this.appendValueInput("NUM", Number)
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_LED_PWM);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

// 单按钮
Blockly.Blocks.Nova_Button = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_BTN)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Button.jpg", 54, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_BUTTON_PRESSED, "1"],[Blockly.LKL_NOVA_BUTTON_RELEASED, "0"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// 4按钮
Blockly.Blocks.Nova_4Button = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_BTN)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_4ADButton.jpg", 47.5, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_ABCD)
        .appendTitle(new Blockly.FieldDropdown([["A", "buttonAState()"], ["B", "buttonBState()"], ["C", "buttonCState()"], ["D", "buttonDState()"]]), "ABCD")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_BUTTON_PRESSED, "1"],[Blockly.LKL_NOVA_BUTTON_RELEASED, "0"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// 倾斜开关
Blockly.Blocks.Nova_TiltSwitch = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_TILTSWITCH)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_TiltSwitch.jpg", 49, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
      .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_TiltSwitch_UP, "1"],[Blockly.LKL_NOVA_TiltSwitch_DOWN, "0"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// 声音
Blockly.Blocks.Nova_Sound = {
  init: function() {
      this.setColour(Blockly.Blocks.nova.HUE);
      this.appendDummyInput("")
          .appendTitle(Blockly.LKL_NOVA_SOUND)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Sound.jpg", 49.5, 32))
          .appendTitle(Blockly.LKL_NOVA_PORT)
          .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
    this.setOutput(true, Number);
    this.setInputsInline(true);
    }
};

// 限位
Blockly.Blocks.Nova_LimitSwitch = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_LIMISWICTH)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_LimitSwitch.jpg", 58, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_BUTTON_PRESSED, "1"],[Blockly.LKL_NOVA_BUTTON_RELEASED, "0"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// 光敏
Blockly.Blocks.Nova_Light={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_LIGHT)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Light.jpg", 44, 32))
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
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Buzzer.jpg", 54, 32))
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
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Ultrasonic.jpg", 62.5, 30))
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
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_DHTxx.jpg", 54, 32))
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
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_2LineFinder.jpg", 45.5, 32))
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
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_2LineFinder.jpg", 45.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_READ);
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 数码管
// displayTime  displayFloat
Blockly.Blocks.Nova_4DigitDisplay={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_4DIGITDISPLAY)
        .appendField(new Blockly.FieldImage("../../media/nova/Nova_4DigitDisplay.jpg", 75, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_NUMBER, "displayFloat"],[Blockly.LKL_NOVA_TIME, "displayTime"]]), "STAT");
    this.appendValueInput('num')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_DISPLAY_NUMBER);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.Nova_4DigitDisplay_Clear={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_4DIGITDISPLAY)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_4DigitDisplay.jpg", 75, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendValueInput('bit')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_DISPLAY_CLEAR);
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
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_RTC.jpg", 40.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_GET_STAT)
        .appendTitle(new Blockly.FieldDropdown(RTC_TIME), "RTC");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Nova_RTC_SetHMS={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_RTC)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_RTC.jpg", 40.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendValueInput('Hour')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_RTC_SET_HOUR);
    this.appendValueInput('Min')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_RTC_SET_MIN);
    this.appendValueInput('Sec')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_RTC_SET_SEC);
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.Nova_RTC_SetYMD={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_RTC)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_RTC.jpg", 40.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendValueInput('Year')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_RTC_SET_YEAR);
    this.appendValueInput('Month')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_RTC_SET_MON);
    this.appendValueInput('Day')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_RTC_SET_DAY);
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.Nova_RTC_SetWeek={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_RTC)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_RTC.jpg", 40.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendValueInput('Week',Number)
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_RTC_SET_WEEK);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


// 红外遥控接收
Blockly.Blocks.Nova_IrRev_Available={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_IR_REC_AVAILABLE)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_IrRev.jpg", 46.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");
  this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.Nova_IrRev={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_IR_REC)
        .appendField(new Blockly.FieldImage("../../media/nova/Nova_IrRev.jpg", 46.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 蓝牙
// Blockly.Blocks.Nova_Bluetooth_available = {
//   init: function() {
//     this.setColour(Blockly.Blocks.nova.HUE);
//     this.appendDummyInput("")
//       .appendTitle(Blockly.LKL_NOVA_BLUETOOTH_AVAILABLE)
//       .appendField(new Blockly.FieldImage("../../media/nova/Nova_BlueTooth.jpg", 50.5, 32))
//       .appendTitle(Blockly.LKL_NOVA_PORT)
//       .appendTitle(new Blockly.FieldDropdown(BLUETOOTH_PORTS), "PIN");
//   this.setOutput(true, Boolean);
//   this.setInputsInline(true);
//   }
// };

// Blockly.Blocks.Nova_Bluetooth_readString = {
//   init: function() {
//     this.setColour(Blockly.Blocks.nova.HUE);
//     this.appendDummyInput("")
//       .appendTitle(Blockly.LKL_NOVA_BLUETOOTH_READ_STR)
//       .appendField(new Blockly.FieldImage("../../media/nova/Nova_BlueTooth.jpg", 50.5, 32))
//       .appendTitle(Blockly.LKL_NOVA_PORT)
//       .appendTitle(new Blockly.FieldDropdown(BLUETOOTH_PORTS), "PIN");
//   this.setOutput(true, Boolean);
//   this.setInputsInline(true);
//   }
// };

Blockly.Blocks.Nova_Bluetooth_readAppKey = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_BLUETOOTH_READ_NUM)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_BlueTooth.jpg", 50.5, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(BLUETOOTH_PORTS), "PIN");
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
    // this.appendValueInput("DELAY_TIME", Number)
        // .setCheck(Number)
        // .setAlign(Blockly.ALIGN_RIGHT)
        // .appendTitle(Blockly.LKL_NOVA_DELAY+'('+Blockly.LKL_NOVA_DELAY_MS+')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// 大电流舵机
Blockly.Blocks.Nova_Servo_Big = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.LKL_NOVA_SERVO_BIG)
    .appendField(new Blockly.FieldImage("../../media/nova/Big_Servo.jpg", 43, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
    .appendTitle(new Blockly.FieldDropdown(MOTOR_PORTS), "PIN")
    .appendTitle(Blockly.LKL_NOVA_SERVO_BRANCH)
   // .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_SERVO_BRANCH1, "S1"], [Blockly.LKL_NOVA_SERVO_BRANCH2, "S2"]]), "BRANCH");
    .appendTitle(new Blockly.FieldDropdown([["S1", "S1"],["S2", "S2"]]), "BRANCH");
    this.appendValueInput("DEGREE", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.LKL_NOVA_DEGREE_0_180);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};



Blockly.Blocks.Nova_Motor = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.LKL_NOVA_MOTOR)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Motor.jpg", 59.5, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
    .appendTitle(new Blockly.FieldDropdown(MOTOR_PORTS), "PIN")
    this.appendValueInput('speed')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_MOTOR_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};



//RGB
Blockly.Blocks.Nova_RGB= {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_NOVA_RGB)
		.appendField(new Blockly.FieldImage("../../media/nova/Nova_RGB.jpg", 59.5, 32))
		.appendTitle(Blockly.LKL_NOVA_PORT)
		.appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");  
    this.appendValueInput("_LED_")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_NOVA_RGB_NUM);	
	this.appendValueInput("RVALUE")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_NOVA_RGB_R);  
	this.appendValueInput("GVALUE")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_NOVA_RGB_G);	
	this.appendValueInput("BVALUE")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_NOVA_RGB_B);
	this.setInputsInline(true);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setTooltip('');
  }
};
Blockly.Blocks.Nova_RGB2 = {
	init: function() {
	this.setColour(Blockly.Blocks.nova.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_NOVA_RGB)
		.appendField(new Blockly.FieldImage("../../media/nova/Nova_RGB.jpg", 55, 32))
		.appendTitle(Blockly.LKL_NOVA_PORT)
		.appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");       
    this.appendValueInput("_LED_")
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.LKL_NOVA_RGB_NUM);
    this.appendDummyInput()
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_NOVA_RGB_Color)
        .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_color");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// 震动开关
Blockly.Blocks.Nova_Vibration = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_VIBRATION)
        .appendField(new Blockly.FieldImage("../../media/nova/Nova_Vibration.jpg", 43.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_Vibration_Vibrating, "1"],[Blockly.LKL_NOVA_Vibration_NoVibrating, "0"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// MQ
Blockly.Blocks.Nova_MQ={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_MQ)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_MQ.jpg", 39.5, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 陀螺仪
Blockly.Blocks.Nova_Gyro = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_GYRO)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Gyro.jpg", 46, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN")
	  .appendTitle(Blockly.LKL_NOVA_GYRO_STATE)
      .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_GYRO_X, "getAngleX()"], [Blockly.LKL_NOVA_GYRO_Y, "getAngleY()"]]), "STAT");
    this.setOutput(true, Number);
    this.setInputsInline(true);
  }
};
Blockly.Blocks.Nova_Gyro_update = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_GYRO_UPDATE)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Gyro.jpg", 46, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN")
	this.setPreviousStatement(true);
	this.setNextStatement(true);
  }
};

//点阵
Blockly.Blocks.Nova_Matrix_POS = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
 this.appendDummyInput("")
      .appendTitle(Blockly.LKL_Nova_Matrix_POS)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Matrix.jpg", 36.5, 32))
	.appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");
    this.appendValueInput('XVALUE', Number)
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_Matrix_x);
    this.appendValueInput("YVALUE", Number)
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_Matrix_y);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.Nova_Matrix={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_Matrix)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Matrix.jpg", 36.5, 32))
	  .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(FOUR_PORTS), "PIN");  
	this.appendValueInput('Str',String)
      .setCheck(String)
      .appendTitle(Blockly.LKL_NOVA_Matrix_Str);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

//步进电机
Blockly.Blocks.Nova_Stepper={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_STEPPER)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Stepper.jpg", 39, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(MOTOR_PORTS), "PIN");  
	this.appendValueInput('POSITION')
      .setCheck(Number)
      .appendTitle(Blockly.LKL_NOVA_POSITION);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.Nova_Stepper_run = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_STEPPER_RUN)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Stepper.jpg", 39, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(MOTOR_PORTS), "PIN");
    this.setPreviousStatement(true);
	this.setNextStatement(true);
  }
};

//MP3
Blockly.Blocks.Nova_MP3_VOL={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_MP3)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_MP3.jpg", 48, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");  
	this.appendValueInput('VOLUME',Number)
      .setCheck(Number)
      .appendTitle(Blockly.LKL_NOVA_VOL);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.Nova_MP3_PLAY={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_MP3)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_MP3.jpg", 48, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN");  
	this.appendValueInput('NUM',Number)
      .setCheck(Number)
      .appendTitle(Blockly.LKL_NOVA_PLAY);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.Nova_MP3_STATE = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_MP3)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_MP3.jpg", 48, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(Blockly.LKL_NOVA_MP3_STATE)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_MP3_LOOPPLAY, "loop_play()"], [Blockly.LKL_NOVA_MP3_RANDPLAY, "random_play()"], [Blockly.LKL_NOVA_MP3_PAUSE, "pause()"], [Blockly.LKL_NOVA_MP3_STOP, "stop()"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// 双电机
Blockly.Blocks.Nova_Dual_Motor={
init:function(){
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_DUAL_MOTOR)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Dual_Motor.jpg", 54, 32))
      .appendTitle(Blockly.LKL_NOVA_DUAL_MOTORA)
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(MOTOR_PORTS), "PINA");  
    this.appendValueInput('speedA')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_DUAL_MOTOR_SPEEDA);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_DUAL_MOTORB)
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(MOTOR_PORTS_2), "PINB");
    this.appendValueInput('speedB')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_NOVA_DUAL_MOTOR_SPEEDB);
   // this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

// Flame
Blockly.Blocks.Nova_Flame={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_FLAME)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Flame.jpg", 54, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 霍尔开关
Blockly.Blocks.Nova_Hall = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_HALL)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_Hall.jpg", 46, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_Hall_Magnetic, "1"],[Blockly.LKL_NOVA_Hall_NoMagnetic, "0"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// ITR
Blockly.Blocks.Nova_ITR = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_ITR)
      .appendField(new Blockly.FieldImage("../../media/nova/Nova_ITR.jpg", 50, 32))
      .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_ITR_Shelter, "1"],[Blockly.LKL_NOVA_ITR_Noshelter, "0"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

// 电位计
Blockly.Blocks.Nova_Potentiometer={
init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_NOVA_POTENTIOMETER)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Potentiometer.jpg", 35, 32))
        .appendTitle(Blockly.LKL_NOVA_PORT)
        .appendTitle(new Blockly.FieldDropdown(ANALOG_PORTS), "PIN");
  this.setOutput(true, Number);
  this.setInputsInline(true);
  }
};

// 继电器
Blockly.Blocks.Nova_Relay = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput("")
      .appendTitle(Blockly.LKL_NOVA_RELAY)
    .appendField(new Blockly.FieldImage("../../media/nova/Nova_Relay.jpg", 43.5, 32))
    .appendTitle(Blockly.LKL_NOVA_PORT)
      .appendTitle(new Blockly.FieldDropdown(THREE_PORTS), "PIN")
        .appendTitle(Blockly.LKL_NOVA_STAT)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_NOVA_LED_ON, "on()"], [Blockly.LKL_NOVA_LED_OFF, "off()"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
//液晶显示屏
Blockly.Blocks.Nova_lcd_print = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_LCD_ADDRESS);
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT1);
    this.appendValueInput("TEXT2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT2)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.Nova_lcd_power = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_LCD_ADDRESS);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.LKL_LCD_STAT_ON, "display"], [Blockly.LKL_LCD_STAT_OFF, "noDisplay"], [Blockly.LKL_LCD_STAT_CURSOR, "cursor"], [Blockly.LKL_LCD_STAT_NOCURSOR, "noCursor"], [Blockly.LKL_LCD_STAT_BLINK, "blink"], [Blockly.LKL_LCD_STAT_NOBLINK, "noBlink"], [Blockly.LKL_LCD_STAT_CLEAR, "clear"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
//以太网

Blockly.Blocks.Nova_ethernet_init_begin = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_BEGIN)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.MIXLY_ETHERNET, 'Ethernet'],[Blockly.MIXLY_ETHERNET2,'Ethernet2']]), "Ethernet");
	 this.appendValueInput('MAC')
		.setCheck(Array)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MIXLY_ETHERNET_MAC_ADDRESS);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.Nova_ethernet_mac_address={
	init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
		.appendField(new Blockly.FieldTextInput('DE'), 'VAR1')
        .appendTitle('-')
		.appendField(new Blockly.FieldTextInput('AD'), 'VAR2')
        .appendTitle('-')
		.appendField(new Blockly.FieldTextInput('BE'), 'VAR3')
        .appendTitle('-')
		.appendField(new Blockly.FieldTextInput('EF'), 'VAR4')
        .appendTitle('-')
		.appendField(new Blockly.FieldTextInput('FE'), 'VAR5')
        .appendTitle('-')
		.appendField(new Blockly.FieldTextInput('ED'), 'VAR6');
    this.setOutput(true, Array);
  }
}

Blockly.Blocks.Nova_ethernet_init_local_ip = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_LOCALIP);
    this.setOutput(true, 'IPAddress');
  }
};

Blockly.Blocks.Nova_ethernet_client_connect_server={
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_CONNECT_SERVER)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput('mixly.org'), 'SERVER')
        .appendField(this.newQuote_(false));
	this.appendValueInput('PORT')
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_PORT);
    this.setOutput(true, Number);
	this.setInputsInline(true);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
}

Blockly.Blocks.Nova_ethernet_client_stop = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_STOP);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.Nova_ethernet_client_connected = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_CONNECTED);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.Nova_ethernet_client_available= {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_AVAILABLE);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.Nova_ethernet_client_print= {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_PRINT);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.Nova_ethernet_client_println = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_PRINTLN);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.Nova_ethernet_client_read = {
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_READ);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.Nova_ethernet_client_get_request={
	
  init: function() {
    this.setColour(Blockly.Blocks.nova.HUE);
	this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_GET_REQUEST);
    this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_URL)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'URL')
        .appendField(this.newQuote_(false));
	this.appendDummyInput()
        .appendTitle(Blockly.MIXLY_ETHERNET_CLINET_SERVER)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'SERVER')
        .appendField(this.newQuote_(false));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
}