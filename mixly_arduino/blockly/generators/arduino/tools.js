'use strict';

goog.provide('Blockly.Arduino.tools');
goog.require('Blockly.Arduino');

Blockly.Arduino.factory_notes = function(){
     var content = this.getFieldValue('VALUE');
     console.log(content);
     if(content){
        var content2arr = content.split('\n');
         var code = '';
         for (var eachElement in content2arr){
            console.log(content2arr[eachElement]);
            content2arr[eachElement] = '//'+ content2arr[eachElement] +'\n';
            console.log(content2arr[eachElement]);
         }
         for (var eachElement of content2arr){
            code += eachElement;
         }
         return code;
     }
     else{
        return '//\n';
     }
}

Blockly.Arduino.folding_block = function() {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    return ''+branch+'\n';
};

Blockly.Arduino.IICSCAN = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['setup_delay2000'] = '  Wire.begin();\nSerial.begin(9600);\nSerial.println("I2C Scanner");\n';
  var code = 'byte error, address;\nint nDevices;\nSerial.println("Scanning...");\nnDevices = 0;\nfor (address = 1; address < 127; address++ )\n{\n Wire.beginTransmission(address);\nerror = Wire.endTransmission();\nif (error == 0){\nSerial.print("I2C device found at address 0x");\nif (address < 16)\nSerial.print("0"); \nSerial.print(address, HEX);  \nSerial.println(" !");\nnDevices++;\n}\nelse if (error == 4){\nSerial.print("Unknow error at address 0x");\nif (address < 16)Serial.print("0"); \nSerial.println(address, HEX);  }\n}\nif (nDevices == 0)\nSerial.println("No I2C devices found");\nelse \nSerial.println("done");\ndelay(5000); ';
  return code;
};