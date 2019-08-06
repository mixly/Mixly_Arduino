'use strict';

goog.provide('Blockly.Arduino.VisionSensor');

goog.require('Blockly.Arduino');

var kMuName = 'Mu'
var funMuVs2GetColorRCGLabel = '\
int MuVs2GetColorRCGLabel(MuVisionSensor& Mu, int x, int y) {\n\
  static int x_last = -1;\n\
  static int y_last = -1;\n\
  x = x>100 ? 100:(x<0 ? 0:x);\n\
  y = y>100 ? 100:(y<0 ? 0:y);\n\
  if (x != x_last) {\n\
    x_last = x;\n\
    Mu.write(VISION_COLOR_RECOGNITION, kXValue, x);\n\
  }\n\
  if (y != y_last) {\n\
    y_last = y;\n\
    Mu.write(VISION_COLOR_RECOGNITION, kYValue, y);\n\
  }\n\
  return Mu.GetValue(VISION_COLOR_RECOGNITION, kStatus);\n\
}\n\
                              ';
var funMuVs2GetColorDetectLabel= '\
int MuVs2GetColorDetectLabel(MuVisionSensor& Mu, const int label) {\n\
  static int label_last = -1;\n\
  if (label_last != label) {\n\
    label_last = label;\n\
    Mu.write(VISION_COLOR_DETECT, kLabel, label);\n\
  }\n\
  return Mu.GetValue(VISION_COLOR_DETECT, kStatus);\n\
}\n\
        ';



/*              Morpx Vision Sensor              */
Blockly.Arduino.Vs2MuInit = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_serial = this.getFieldValue('SERIAL');
  var offset = parseInt(dropdown_mu_obj)
  var address = 0x60 + offset;
  Blockly.Arduino.definitions_['include_vs2'] = '#include "MuVisionSensor.h"';
  Blockly.Arduino.definitions_['var_vs2_mu'+dropdown_mu_obj] = 'MuVisionSensor '+kMuName+dropdown_mu_obj+'(0x'+address.toString(16)+');';
  if (dropdown_serial == 'Wire') {
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
  }
  var code = kMuName+dropdown_mu_obj+'.begin(&'+dropdown_serial+');\n';
  return code;
};

Blockly.Arduino.Vs2Setup = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var branch = Blockly.Arduino.statementToCode(this, 'SETUP_BLOCK');
  branch = branch.replace(/  /g, "");   //去除所有空格
  branch = branch.replace(new RegExp(kMuName+'.','g'), kMuName+dropdown_mu_obj+'.');
  return branch;
};

Blockly.Arduino.Vs2Reset = function() {
  var code = 'while('+kMuName+'.SensorSetDefault() != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetLEDColor = function() {
  var color_dic = {'#000000':'kLedClose', '#ff0000':'kLedRed', '#00ff00':'kLedGreen',
                  '#ffff00':'kLedYellow', '#0000ff':'kLedBlue', '#ff00ff':'kLedPurple',
                  '#00ffff':'kLedCyan', '#ffffff':'kLedWhite'};
  var dropdown_led_id = this.getFieldValue('LED_ID');
  var dropdown_led_detect_color = color_dic[this.getFieldValue('LEDColorDetect')];
  var dropdown_led_undetect_color = color_dic[this.getFieldValue('LEDColorUndetect')];
  var input_led_level = Blockly.Arduino.valueToCode(this, "LEDLevel",
          Blockly.Arduino.ORDER_NONE) || '1';
  var code = 'while('+kMuName+'.LedSetColor('+dropdown_led_id+', '+
  dropdown_led_detect_color+', '+dropdown_led_undetect_color+', '+input_led_level+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2VisionBegin = function() {
  var dropdown_vision_status = this.getFieldValue('VisionStatus');
  var dropdown_vision_type = this.getFieldValue('VisionType');
  var code = '';
  code += 'while('+kMuName+'.Vision'+dropdown_vision_status+'('+dropdown_vision_type+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetVisionLevel = function() {
  var dropdown_vision_type = this.getFieldValue('VisionType');
  var dropdown_vision_level = this.getFieldValue('VisionLevel');
  var code = 'while('+kMuName+'.VisionSetLevel('+dropdown_vision_type+', '+dropdown_vision_level+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetVisionZoom = function() {
  var dropdown_vision_zoom = this.getFieldValue('VisionZoom');
  var code = 'while('+kMuName+'.CameraSetZoom('+dropdown_vision_zoom+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetUARTBaud = function() {
  var dropdown_uart_baud = this.getFieldValue('BAUD');
  var code = 'while('+kMuName+'.UartSetBaudrate('+dropdown_uart_baud+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetCameraRotate = function() {
  var dropdown_rotate = this.getFieldValue('FRAME_ROTATE');
  if (dropdown_rotate == 'TRUE') {
    dropdown_rotate = 'true';
  } else {
    dropdown_rotate = 'false';
  }
  var code = 'while('+kMuName+'.CameraSetRotate('+dropdown_rotate+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetCameraHFR = function() {
  var dropdown_HFR = this.getFieldValue('CameraHFR');
  if (dropdown_HFR == 'TRUE') {
    dropdown_HFR = 'kFPSHigh';
  } else {
    dropdown_HFR = 'kFPSNormal';
  }
  var code = 'while('+kMuName+'.CameraSetFPS('+dropdown_HFR+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetCameraWhiteBalance = function() {
  var dropdown_AWB = this.getFieldValue('CameraAWB');
  var code = 'while('+kMuName+'.CameraSetAwb('+dropdown_AWB+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2Detected = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_vision_type = this.getFieldValue('VISION_TYPE');
  var code = kMuName+dropdown_mu_obj+'.GetValue('+dropdown_vision_type+', kStatus)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];  
};

Blockly.Arduino.Vs2DetectedRegionColor = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var input_value_x = Blockly.Arduino.valueToCode(this, "XValue",
                      Blockly.Arduino.ORDER_NONE) || '50';
  var input_value_y = Blockly.Arduino.valueToCode(this, "YValue",
                      Blockly.Arduino.ORDER_NONE) || '50';

  Blockly.Arduino.definitions_['funMuVs2GetColorRCGLabel'] = funMuVs2GetColorRCGLabel;
  var code = 'MuVs2GetColorRCGLabel('+kMuName+dropdown_mu_obj+', '+input_value_x+', '+input_value_y+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2GetColorLabel = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var color_dic = {'#000000':'MU_COLOR_BLACK', '#ff0000':'MU_COLOR_RED', '#00ff00':'MU_COLOR_GREEN',
                  '#ffff00':'MU_COLOR_YELLOW', '#0000ff':'MU_COLOR_BLUE', '#ff00ff':'MU_COLOR_PURPLE',
                  '#00ffff':'MU_COLOR_CYAN', '#ffffff':'MU_COLOR_WHITE'};
  var color = color_dic[this.getFieldValue("RCGColor")];

  var code = '('+kMuName+dropdown_mu_obj+'.GetValue(VISION_COLOR_RECOGNITION, kLabel) == '+color+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2DetectedColorDetect = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var color_dic = {'#000000':'MU_COLOR_BLACK', '#ff0000':'MU_COLOR_RED', '#00ff00':'MU_COLOR_GREEN',
                  '#ffff00':'MU_COLOR_YELLOW', '#0000ff':'MU_COLOR_BLUE', '#ff00ff':'MU_COLOR_PURPLE',
                  '#00ffff':'MU_COLOR_CYAN', '#ffffff':'MU_COLOR_WHITE'};
  var color = color_dic[this.getFieldValue("DetectColor")];

  Blockly.Arduino.definitions_['funMuVs2GetColorDetectLabel'] = funMuVs2GetColorDetectLabel;
  var code = 'MuVs2GetColorDetectLabel('+kMuName+dropdown_mu_obj+', '+color+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2GetMessage = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_vision_type = this.getFieldValue('VISION_TYPE');
  var dropdown_detected_message = this.getFieldValue('DETECTED_MESSAGE');
  var code = kMuName+dropdown_mu_obj+'.GetValue('+dropdown_vision_type+', '+dropdown_detected_message+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2GetCardType = function() {
  var dropdown_mu_obj = this.getFieldValue('MuObj');
  var dropdown_vision_type = this.getFieldValue('VisionCardType');
  var dropdown_card_type = this.getFieldValue('CardType');
  var code = '('+kMuName+dropdown_mu_obj+'.GetValue('+dropdown_vision_type+', kLabel) == '+dropdown_card_type+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

