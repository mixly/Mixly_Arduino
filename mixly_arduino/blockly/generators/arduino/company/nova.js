'use strict';

goog.provide('Blockly.Arduino.nova');

goog.require('Blockly.Arduino');

// 设置数字量
Blockly.Arduino.Nova_digital_write = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

// 读数字量
Blockly.Arduino.Nova_digital_read = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';

  
  var code = +dropdown_stat+'==digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


// 设置PWM
Blockly.Arduino.Nova_analog_write = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //var dropdown_stat = this.getTitleValue('STAT');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite('+dropdown_pin+','+value_num+');\n';

  return code;
};



// 读模拟口
Blockly.Arduino.Nova_analog_read = function() {
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  var dropdown_pin = this.getTitleValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// LED
Blockly.Arduino.Nova_Led = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_led'+dropdown_pin] = 'LED  led_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'led_'+dropdown_pin+'.'+dropdown_stat+';\n'
  return code;
};

// Led_PWM
Blockly.Arduino.Nova_Led_PWM = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //  var value_num = Blockly.Arduino.valueToCode(block, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  // var code = ' analogWrite('+dropdown_pin+',map('+value_num+', 0, 100, 255, 0));\n';

  // return code;
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_led'+dropdown_pin] = 'LED  led_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'led_'+dropdown_pin+'.brightness('+value_num+');\n'
  return code;
};

// Button
Blockly.Arduino.Nova_Button = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_button'+dropdown_pin] = 'Button  Button_'+dropdown_pin+''+'('+dropdown_pin+');';
  var STAT = this.getTitleValue('STAT');
  var code = +STAT+'== Button_'+dropdown_pin+'.state()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 4按钮
Blockly.Arduino.Nova_4Button = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('ABCD');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_buttona'+dropdown_pin] = 'FourButton  FourButton_'+dropdown_pin+''+'('+dropdown_pin+');';
  var STAT = this.getTitleValue('STAT');
  var code = +STAT+' == FourButton_'+dropdown_pin+'.'+dropdown_stat+'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 倾斜开关
Blockly.Arduino.Nova_TiltSwitch = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_tiltswitch'+dropdown_pin] = 'TiltSwitch  TiltSwitch_'+dropdown_pin+''+'('+dropdown_pin+');';
  var STAT = this.getTitleValue('STAT');
  var code = +STAT+'== TiltSwitch_'+dropdown_pin+'.state()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 声音
Blockly.Arduino.Nova_Sound = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Sound'+dropdown_pin] = 'Sound  Sound_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'Sound_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 限位
Blockly.Arduino.Nova_LimitSwitch = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_LimitSwitch'+dropdown_pin] = 'LimitSwitch  LimitSwitch_'+dropdown_pin+''+'('+dropdown_pin+');';
  var STAT = this.getTitleValue('STAT');
  var code = +STAT+' == LimitSwitch_'+dropdown_pin+'.state()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 光敏
Blockly.Arduino.Nova_Light = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_Light'+dropdown_pin] = 'Light Light_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'Light_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 蜂鸣
Blockly.Arduino.Nova_Buzzer = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_buzzer'+dropdown_pin] = 'Buzzer  Buzzer_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'Buzzer_'+dropdown_pin+'.tone('+fre+','+dur+');\n'
  return code;
};

// 超声波
Blockly.Arduino.Nova_Ultrasonic = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_Ultrasonic'+dropdown_pin] = 'Ultrasonic Ultrasonic_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'Ultrasonic_'+dropdown_pin+'.distance()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 温湿度
Blockly.Arduino.Nova_DHTxx = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('dht');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_dht'+dropdown_pin] = 'DHT DHT_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'DHT_'+dropdown_pin+'.'+dropdown_stat+'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 寻线
Blockly.Arduino.Nova_2LineFinder = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('linefinder');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_linefinder'+dropdown_pin] = 'LineFinder LineFinder_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'LineFinder_'+dropdown_pin+'.'+dropdown_stat+'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_2LineFinder_readLineState = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('linefinder');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_linefinder_readLineState'+dropdown_pin] = 'LineFinder LineFinder_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'LineFinder_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 数码管
//displayTime  displayFloat
Blockly.Arduino.Nova_4DigitDisplay = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var num = Blockly.Arduino.valueToCode(this, 'num',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var STAT = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_4DigitPlay'+dropdown_pin] = 'DigitDisplay  DigitDisplay_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'DigitDisplay_'+dropdown_pin+'.'+STAT+'('+num+');\n'
  return code;
};

Blockly.Arduino.Nova_4DigitDisplay_Clear = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var bit = Blockly.Arduino.valueToCode(this, 'bit',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  //Blockly.Arduino.definitions_['var_nova_4DigitPlay_Time'+dropdown_pin] = 'DigitDisplay  DigitDisplay_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'DigitDisplay_'+dropdown_pin+'.clearBit('+bit+');\n'
  return code;
};



// 时钟
Blockly.Arduino.Nova_RTC = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('RTC');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_RTC'+dropdown_pin] = 'RTC RTC_'+dropdown_pin+''+'('+dropdown_pin+');';
  // var code = 'RTC_'+dropdown_pin+'.getTime();\nRTC_'+dropdown_pin+'.'+dropdown_stat+'';
  var code = 'RTC_'+dropdown_pin+'.'+dropdown_stat+'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_RTC_SetHMS = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var Hour = Blockly.Arduino.valueToCode(this, 'Hour',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var Min = Blockly.Arduino.valueToCode(this, 'Min',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var Sec = Blockly.Arduino.valueToCode(this, 'Sec',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_RTC'+dropdown_pin] = 'RTC RTC_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'RTC_'+dropdown_pin+'.fillByHMS('+Hour+','+Min+','+Sec+');\n';
  return code;
};

Blockly.Arduino.Nova_RTC_SetYMD = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var Year = Blockly.Arduino.valueToCode(this, 'Year',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var Month = Blockly.Arduino.valueToCode(this, 'Month',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var Day = Blockly.Arduino.valueToCode(this, 'Day',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_RTC'+dropdown_pin] = 'RTC RTC_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'RTC_'+dropdown_pin+'.fillByYMD('+Year+','+Month+','+Day+');\n';
  return code;
};

Blockly.Arduino.Nova_RTC_SetWeek = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var Week = Blockly.Arduino.valueToCode(this, 'Week',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_RTC'+dropdown_pin] = 'RTC RTC_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'RTC_'+dropdown_pin+'.fillByWeek('+Week+');\n';
  return code;
};

// 红外
Blockly.Arduino.Nova_IrRev_Available = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['var_IRSendRev'+dropdown_pin] = 'IRSendRev IRSendRev_'+dropdown_pin+';';
  var code = 'IRSendRev_'+dropdown_pin+'.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_IrRev = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_IRSendRev'+dropdown_pin] = 'IRSendRev IRSendRev_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_IRSendRev_'+dropdown_pin] = 'IRSendRev_'+dropdown_pin+'.begin('+dropdown_pin+');\n';
  var code = 'IRSendRev_'+dropdown_pin+'.recv()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 蓝牙
// Blockly.Arduino.Nova_Bluetooth_available = function() {
//   var dropdown_pin = this.getTitleValue('PIN');
//   Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
//   Blockly.Arduino.definitions_['var_nova_bluetooth'] = 'BlueTooth  Bluetooth_'+dropdown_pin+';';
//   var code = 'Bluetooth_'+dropdown_pin+'.available()';
//   return [code, Blockly.Arduino.ORDER_ATOMIC];
// };

// Blockly.Arduino.Nova_Bluetooth_readString = function() {
//   var dropdown_pin = this.getTitleValue('PIN');
//   Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
//   Blockly.Arduino.definitions_['var_nova_bluetooth'] = 'BlueTooth  Bluetooth_'+dropdown_pin+';';
//   var code = 'Bluetooth_'+dropdown_pin+'.readString()';
//   return [code, Blockly.Arduino.ORDER_ATOMIC];
// };

Blockly.Arduino.Nova_Bluetooth_readAppKey = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_bluetooth'] = 'BlueTooth  Bluetooth_'+dropdown_pin+''+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] = 'Bluetooth_'+dropdown_pin+'.begin(9600);\n';
  var code = 'Bluetooth_'+dropdown_pin+'.readAppKey()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 舵机
Blockly.Arduino.Nova_Servo = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  //var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  Blockly.Arduino.definitions_['define_servo'] = '#include <Nova.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n';
  //+'delay(' + delay_time + ');\n'
  return code;
};

// 大电流舵机
  Blockly.Arduino.Nova_Servo_Big = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var dropdown_branch = this.getTitleValue('BRANCH');
    var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
    //                                          NovaPort Port_M0(M0); 
    Blockly.Arduino.definitions_['NovaPort'] = 'NovaPort Port_'+dropdown_pin+''+'('+dropdown_pin+');';
    //                                                                Servo Servo_M0_S1;
    Blockly.Arduino.definitions_['var_nova_servo_big'+dropdown_pin] = 'Servo  Servo_'+dropdown_pin+'_'+dropdown_branch+';';
    //                                                      Servo_M0_S1.attach(Port_M0.getPin(S1));
    Blockly.Arduino.setups_['setup_servo_big'+dropdown_pin] = 'Servo_'+dropdown_pin+'_'+dropdown_branch+'.attach(Port_'+dropdown_pin+'.getPin('+dropdown_branch+'));\n';

    var code = 'Servo_'+dropdown_pin+'_'+dropdown_branch+'.write('+value_degree+');\n';

    return code;
  };
  
Blockly.Arduino.Nova_Motor = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var speed = Blockly.Arduino.valueToCode(this, 'speed',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
      Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
      Blockly.Arduino.definitions_['var_nova_motor'+dropdown_pin] = 'Motor  M_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'M_'+dropdown_pin+'.run('+speed+');\n'
  return code;
};
  
//RGB
/*Blockly.Arduino.Nova_RGB = function() {
  var dropdown_rgbpin = block.getFieldValue('PIN');
 // var dropdown_stat = this.getTitleValue('STAT');
  var value__led_ = Blockly.Arduino.valueToCode(block, '_LED_',  Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(block, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(block, 'GVALUE',  Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(block, 'BVALUE',  Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_RGB'] = '#include <Nova_RGB.h>\n';
  Blockly.Arduino.definitions_['define_PIN'] = '#define PIN '+dropdown_rgbpin+'\n';
  Blockly.Arduino.definitions_['var_df_NUMPIXELS'] = '#define NUMPIXELS 4\n';
  Blockly.Arduino.definitions_['var_df_CLASS1'] = 'Nova_RGB pixels = Nova_RGB(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'pixels.begin();\n';
 var code = 'pixels.setPixelColor('+value__led_+', '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  code+='pixels.show();\n';
  return code;
};*/
Blockly.Arduino.Nova_RGB= function(block) {
  var dropdown_rgbpin = block.getFieldValue('PIN');
  var value__led_ = Blockly.Arduino.valueToCode(block, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(block, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(block, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(block, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_rgb'+dropdown_rgbpin] = 'RGB  pixels_'+dropdown_rgbpin+''+'('+dropdown_rgbpin+');';
  Blockly.Arduino.setups_['setup_nova_rgb_'+dropdown_rgbpin] ='pixels_'+dropdown_rgbpin+'.begin();\n';
  
  var code = 'pixels_'+dropdown_rgbpin+'.setPixelColor('+value__led_+'-1, '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  code+='pixels_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.Nova_RGB2= function(block) {
  var dropdown_rgbpin = block.getFieldValue('PIN');
  var value__led_ = Blockly.Arduino.valueToCode(block, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = block.getFieldValue('RGB_LED_color');
  var color = colour_rgb_led_color.colorRgb();
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_rgb'+dropdown_rgbpin] = 'RGB  pixels_'+dropdown_rgbpin+''+'('+dropdown_rgbpin+');';
  Blockly.Arduino.setups_['setup_nova_rgb_'+dropdown_rgbpin] ='pixels_'+dropdown_rgbpin+'.begin();\n';
  Blockly.Arduino.setups_['setBrightness'+dropdown_rgbpin] ='pixels_'+dropdown_rgbpin+'.setBrightness(40);\n';
  var code = 'pixels_'+dropdown_rgbpin+'.setPixelColor('+value__led_+'-1, pixels_'+dropdown_rgbpin+'.Color'+color+');\n';
  code+='pixels_'+dropdown_rgbpin+'.show();\n';
  return code;
};
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
String.prototype.colorRgb = function(){
     var sColor = this.toLowerCase();
     if(sColor && reg.test(sColor)){
          if(sColor.length === 4){
               var sColorNew = "#";
               for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
               }
               sColor = sColorNew;
          }
          //处理六位的颜色值
          var sColorChange = [];
          for(var i=1; i<7; i+=2){
               sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
          }
          return "(" + sColorChange.join(",") + ")";
     }else{
          return sColor;
    }
};
// 震动开关
Blockly.Arduino.Nova_Vibration = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Vibration'+dropdown_pin] = 'Vibration Vibration_'+dropdown_pin+''+'('+dropdown_pin+');';
  var STAT = this.getTitleValue('STAT');
  var code = +STAT+'== Vibration_'+dropdown_pin+'.state()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//MQ
Blockly.Arduino.Nova_MQ = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_MQ'+dropdown_pin] = 'MQ MQ_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'MQ_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//陀螺仪
Blockly.Arduino.Nova_Gyro = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_Gyro'+dropdown_pin] = 'Gyro Gyro_'+dropdown_pin+''+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_Gyro'+dropdown_pin] = 'Gyro_'+dropdown_pin+'.begin();\n';
  var code = 'Gyro_'+dropdown_pin+'.'+dropdown_stat;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.Nova_Gyro_update = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_Gyro'+dropdown_pin] = 'Gyro Gyro_'+dropdown_pin+''+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_Gyro'+dropdown_pin] = 'Gyro_'+dropdown_pin+'.begin();\n';
  var code = 'Gyro_'+dropdown_pin+'.update();\n';
  return code;
};

//点阵
Blockly.Arduino.Nova_Matrix_POS = function() {
	var dropdown_pin = this.getTitleValue('PIN');
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ATOMIC)-1;
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ATOMIC)-1;
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Matrix_'+dropdown_pin] = 'Matrix matrix_'+dropdown_pin+''+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_Matrix_'+dropdown_pin] = 'matrix_'+dropdown_pin+'.begin(0x70); \n';
  var code = 'matrix_'+dropdown_pin+'.drawPixel('+pos_x+', '+pos_y+',LED_ON);\n';
    code+='matrix_'+dropdown_pin+'.writeDisplay();\n';
    return code;
};
Blockly.Arduino.Nova_Matrix = function() {
	var dropdown_pin = this.getTitleValue('PIN');
  var string1 = Blockly.Arduino.valueToCode(this, 'Str', Blockly.Arduino.ORDER_ASSIGNMENT);
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Matrix_'+dropdown_pin] = 'Matrix matrix_'+dropdown_pin+''+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_Matrix_'+dropdown_pin] = 'matrix_'+dropdown_pin+'.begin(0x70); \n';
  var code = 'matrix_'+dropdown_pin+'.drawStr('+string1+');\n'
  return code;
};

//步进电机
Blockly.Arduino.Nova_Stepper = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var POS = Blockly.Arduino.valueToCode(this, 'POSITION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  //Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Stepper'+dropdown_pin] = 'Stepper Stepper_'+dropdown_pin+''+'('+dropdown_pin+');';
  //Blockly.Arduino.setups_['setup_Stepper_setsp_'+dropdown_pin] = 'Stepper_'+dropdown_pin+'.setMaxSpeed(10000);\n';
  //Blockly.Arduino.setups_['setup_Stepper_setac_'+dropdown_pin] = 'Stepper_'+dropdown_pin+'.setAcceleration(20000);\n';
  var code = 'Stepper_'+dropdown_pin+'.moveTo('+POS+');\n'
  return code;
};
Blockly.Arduino.Nova_Stepper_run = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Stepper'+dropdown_pin] = 'Stepper  Stepper_'+dropdown_pin+''+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_Stepper_setsp_'+dropdown_pin] = 'Stepper_'+dropdown_pin+'.setMaxSpeed(10000);\n';
  Blockly.Arduino.setups_['setup_Stepper_setac_'+dropdown_pin] = 'Stepper_'+dropdown_pin+'.setAcceleration(20000);\n';
  var code = 'Stepper_'+dropdown_pin+'.run();\n'
  return code;
};

//MP3
Blockly.Arduino.Nova_MP3_VOL = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var VOL = Blockly.Arduino.valueToCode(this, 'VOLUME',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['var_nova_MP3_PLAY'+dropdown_pin] = 'MP3  MP3_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'MP3_'+dropdown_pin+'.volume(map('+VOL+', 0, 100, 0, 30));\n'
  return code;
};
Blockly.Arduino.Nova_MP3_PLAY = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var Num = Blockly.Arduino.valueToCode(this, 'NUM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_MP3_PLAY'+dropdown_pin] = 'MP3  MP3_'+dropdown_pin+''+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_MP3_PLAY'+dropdown_pin] = 'MP3_'+dropdown_pin+'.begin(9600);\n';
  var code = 'MP3_'+dropdown_pin+'.play('+Num+');\n'
  return code;
};
Blockly.Arduino.Nova_MP3_STATE = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var dropdown_stat = this.getTitleValue('STAT');
    Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
    Blockly.Arduino.definitions_['var_nova_MP3_PLAY'+dropdown_pin] = 'MP3  MP3_'+dropdown_pin+''+'('+dropdown_pin+');';
    Blockly.Arduino.setups_['setup_MP3_PLAY'+dropdown_pin] = 'MP3_'+dropdown_pin+'.begin(9600);\n';
	var code = 'MP3_'+dropdown_pin+'.'+dropdown_stat+';\n'
    return code;
};

// 双电机
Blockly.Arduino.Nova_Dual_Motor = function() {
  var dropdown_pin_B = this.getTitleValue('PINB');
    var dropdown_pin_A = this.getTitleValue('PINA');
  var speedA = Blockly.Arduino.valueToCode(this, 'speedA',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var speedB = Blockly.Arduino.valueToCode(this, 'speedB',
            Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Dual_motor_A'+dropdown_pin_A] = 'Dual_Motor  MA_'+dropdown_pin_A+''+'('+dropdown_pin_A+');';
    Blockly.Arduino.definitions_['var_nova_Dual_motor_B'+dropdown_pin_A] = 'Dual_Motor  MB_'+dropdown_pin_B+''+'('+dropdown_pin_B+');';
  var code = 'MA_'+dropdown_pin_A+'.run('+speedA+');\n'
    code+= 'MB_'+dropdown_pin_B+'.run('+speedB+');\n'
  return code;
};

//FLAME
Blockly.Arduino.Nova_Flame = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_Flame'+dropdown_pin] = 'Flame Flame_'+dropdown_pin+''+'('+dropdown_pin+');';
  var code = 'Flame_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 霍尔开关
Blockly.Arduino.Nova_Hall = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_Hall'+dropdown_pin] = 'Hall  Hall_'+dropdown_pin+''+'('+dropdown_pin+');';
  var STAT = this.getTitleValue('STAT');
  var code = +STAT+'== Hall_'+dropdown_pin+'.state()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 光电传感器
Blockly.Arduino.Nova_ITR = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
  Blockly.Arduino.definitions_['var_nova_ITR'+dropdown_pin] = 'ITR  ITR_'+dropdown_pin+''+'('+dropdown_pin+');';
  var STAT = this.getTitleValue('STAT');
  var code = +STAT+'== ITR_'+dropdown_pin+'.state()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//电位计
  Blockly.Arduino.Nova_Potentiometer = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
    Blockly.Arduino.definitions_['var_Potentiometer'+dropdown_pin] = 'Potentiometer Potentiometer_'+dropdown_pin+''+'('+dropdown_pin+');';
    var code = 'map(Potentiometer_'+dropdown_pin+'.read(), 0, 1023, 0, 100)';
     
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  // 继电器
  Blockly.Arduino.Nova_Relay = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var dropdown_stat = this.getTitleValue('STAT');
    Blockly.Arduino.definitions_['include_nova'] = '#include "Nova.h"';
    Blockly.Arduino.definitions_['var_nova_Relay'+dropdown_pin] = 'Relay  Relay_'+dropdown_pin+''+'('+dropdown_pin+');';
    var code = 'Relay_'+dropdown_pin+'.'+dropdown_stat+';\n'
    return code;
  };
  
  //液晶显示屏
  Blockly.Arduino.Nova_lcd_print = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27'
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd('+device+',16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.setCursor(0, 0);\n'
  code+='df_lcd.print('+str1+');\n';
  code+='df_lcd.setCursor(0, 1);\n';
  code+='df_lcd.print('+str2+');\n';
  return code;
};

Blockly.Arduino.Nova_lcd_power = function() {
  var dropdown_stat = this.getTitleValue('STAT');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27'
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd('+device+',16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.'+dropdown_stat+'();\n'
  return code;
};

//以太网

Blockly.Arduino.Nova_ethernet_init_begin = function() {
  var Ethernet=this.getTitleValue('Ethernet');
  Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['define_'+Ethernet] = '#include <'+Ethernet+'.h>';
  Blockly.Arduino.definitions_['var_EthernetClient'] = 'EthernetClient client;';
  var mac = Blockly.Arduino.valueToCode(this, 'MAC',Blockly.Arduino.ORDER_ATOMIC);
  var code = "Ethernet.begin("+mac+")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_ethernet_mac_address = function() {
  var VAR1 = this.getTitleValue('VAR1');
  var VAR2 = this.getTitleValue('VAR2');
  var VAR3 = this.getTitleValue('VAR3');
  var VAR4 = this.getTitleValue('VAR4');
  var VAR5 = this.getTitleValue('VAR5');
  var VAR6 = this.getTitleValue('VAR6');
  Blockly.Arduino.definitions_['var_byte_mac'] = 'byte mac[] = {0x'+VAR1+', 0x'+VAR2+', 0x'+VAR3+', 0x'+VAR4+', 0x'+VAR5+', 0x'+VAR6+'};';
  var code = "mac";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_ethernet_init_local_ip = function() {
  var code = "Ethernet.localIP()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_ethernet_client_connect_server = function() {
  var PORT = Blockly.Arduino.valueToCode(this, 'PORT',Blockly.Arduino.ORDER_ATOMIC);
  var SERVER = Blockly.Arduino.quote_(this.getFieldValue('SERVER'));
  var code='client.connect('+SERVER+','+PORT+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_ethernet_client_stop = function() {
  var code = "client.stop();\n";
  return code;
};
Blockly.Arduino.Nova_ethernet_client_connected = function() {
  var code = "client.connected()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.Nova_ethernet_client_available = function() {
  var code = "client.available()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_ethernet_client_print = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'client.print('+TEXT+');\n';
  return code;
};
Blockly.Arduino.Nova_ethernet_client_println = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'client.println('+TEXT+');\n';
  return code;
};
Blockly.Arduino.Nova_ethernet_client_read = function() {
  var code = "(char)client.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Nova_ethernet_client_get_request = function() {
	
  var URL = this.getFieldValue('URL');
  var SERVER = this.getFieldValue('SERVER');
  var code = 'client.println("GET '+URL+' HTTP/1.1");\n'
			+'client.println(F("Host: '+SERVER+'"));\n'
			+'client.println(F("Connection: close"));\n'
			+'client.println();\n';
  return code;
};
