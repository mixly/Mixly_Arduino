'use strict';

goog.provide('Blockly.Arduino.sensor');
goog.require('Blockly.Arduino');

Blockly.Arduino.gps_init = function() {
  Blockly.Arduino.definitions_['include_TinyGPS++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  var rx = Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC);
  var tx = Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC);
  var bt = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['var_declare_TinyGPSPlus_gps'] = 'TinyGPSPlus gps;';
  Blockly.Arduino.definitions_['var_declare_SoftwareSerial_gps_ss'] = 'SoftwareSerial gps_ss('+rx+', '+tx+');';
  Blockly.Arduino.setups_['setup_gps_ss_begin'] = 'gps_ss.begin('+bt+');';
  return '';
};

Blockly.Arduino.gps_data_available = function() {
  var code = 'gps_ss.available()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.gps_data_encode = function() {
  var code = 'gps.encode(gps_ss.read())';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.gps_xxx_isValid = function() {
  var WHAT = this.getFieldValue('WHAT');
  var code = 'gps.'+WHAT+'.isValid()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.gps_getData_xxx = function() {
  var WHAT = this.getFieldValue('WHAT');
  var code = 'gps.'+WHAT+'()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.chaoshengbo2 = function () {
  var Trig = this.getFieldValue('Trig');
  var Echo = this.getFieldValue('Echo');
  Blockly.Arduino.setups_['setup_output_' + Trig] = 'pinMode(' + Trig + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + Echo] = 'pinMode(' + Echo + ', INPUT);';
  var funcName = 'checkdistance_' + Trig + '_' + Echo;
  var code = 'float' + ' ' + funcName + '() {\n'
  + '  digitalWrite(' + Trig + ', LOW);\n' + '  delayMicroseconds(2);\n'
  + '  digitalWrite(' + Trig + ', HIGH);\n' + '  delayMicroseconds(10);\n'
  + '  digitalWrite(' + Trig + ', LOW);\n'
  + '  float distance = pulseIn(' + Echo + ', HIGH) / 58.00;\n'
  + '  delay(10);\n' + '  return distance;\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.DHT = function () {
  var sensor_type = this.getFieldValue('TYPE');
  var dropdown_pin = this.getFieldValue('PIN');
  var what = this.getFieldValue('WHAT');
  Blockly.Arduino.definitions_['include_DHT'] = '#include <DHT.h>';
  Blockly.Arduino.definitions_['var_declare_dht' + dropdown_pin] = 'DHT dht'+dropdown_pin+'('+dropdown_pin+', '+sensor_type+');'
  Blockly.Arduino.setups_['DHT_SETUP'+dropdown_pin] = ' dht'+dropdown_pin+'.begin();';
  var code;
  if(what=="temperature")
    code= 'dht'+dropdown_pin+'.readTemperature()'
  else
    code= 'dht'+dropdown_pin+'.readHumidity()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//LM35 Temperature
Blockly.Arduino.LM35 = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogRead(' + dropdown_pin + ')*0.488';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ds18b20 = function () {
 var dropdown_pin = this.getFieldValue('PIN');
 var unit = this.getFieldValue('UNIT');
 Blockly.Arduino.definitions_['include_OneWire'] = '#include <OneWire.h>';
 Blockly.Arduino.definitions_['include_DallasTemperature'] = '#include <DallasTemperature.h>';
 Blockly.Arduino.definitions_['var_declare_OneWire_DallasTemperature_sensors_' + dropdown_pin] = 'OneWire oneWire_' + dropdown_pin + '(' + dropdown_pin + ');\nDallasTemperature sensors_' + dropdown_pin + '(&oneWire_' + dropdown_pin + ');';
 Blockly.Arduino.definitions_['var_declare_DeviceAddress_insideThermometer'] = 'DeviceAddress insideThermometer;';
 Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_getAddress'] = 'sensors_' + dropdown_pin + '.getAddress(insideThermometer, 0);';
 Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_setResolution'] = 'sensors_' + dropdown_pin + '.setResolution(insideThermometer, 9);';
 var funcName = 'ds18b20_' + dropdown_pin + '_getTemp';
 var code = 'float' + ' ' + funcName + '(int w) {\n'
 + 'sensors_' + dropdown_pin + '.requestTemperatures();\n'
 + 'if(w==0) {\nreturn sensors_' + dropdown_pin + '.getTempC(insideThermometer);\n}\n'
 + 'else {\nreturn sensors_' + dropdown_pin + '.getTempF(insideThermometer);\n}\n'
 + '}\n';
 Blockly.Arduino.definitions_[funcName] = code;
 return ['ds18b20_' + dropdown_pin + '_getTemp(' + unit + ')', Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.weightSensor = function () {
  var DOUT = this.getFieldValue('DOUT');
  var SCK = this.getFieldValue('SCK');
  var scale= Blockly.Arduino.valueToCode(this, 'scale', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Hx711'] = '#include <Hx711.h>';
  Blockly.Arduino.definitions_['var_declare_Hx711'+DOUT+SCK] = 'Hx711 scale' + DOUT + '_' + SCK+" ("+DOUT+","+SCK+");";
  Blockly.Arduino.setups_['setup_HX711'+DOUT+SCK] = 'scale' + DOUT + '_' + SCK+'.setOffset(scale'+DOUT+'_'+SCK+'.getAverageValue(30));\n' ;
  Blockly.Arduino.setups_['setup_'+'scale' + DOUT + '_' + SCK+' .setScale'] =  'scale'+DOUT+'_'+SCK+'.setScale('+scale+');';
  var code = ' scale' + DOUT + '_' + SCK+'.getWeight(10)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
//DS1302
Blockly.Arduino.DS1302_init = function () {
  var RTCName = this.getFieldValue('RTCName');
  var dropdown_rst = Blockly.Arduino.valueToCode(this, 'RST', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_dat = Blockly.Arduino.valueToCode(this, 'DAT', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_clk = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_DS1302'] = '#include <DS1302.h>';
  Blockly.Arduino.definitions_['var_declare_DS1302'+RTCName] = 'DS1302 '+ RTCName +'(' + dropdown_rst + ',' + dropdown_dat + ',' + dropdown_clk + ');';
  return "";
};

Blockly.Arduino.DS1307_init = function () {
  var SDA = Blockly.Arduino.valueToCode(this, 'SDA', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'SCL', Blockly.Arduino.ORDER_ATOMIC);
  var RTCName = this.getFieldValue('RTCName');
  Blockly.Arduino.definitions_['include_RTC'] = '#include <RTC.h>';
  Blockly.Arduino.definitions_['DS1307'+RTCName] = 'DS1307 ' + RTCName + '('+SDA+','+SCL+');';
  return "";
}
Blockly.Arduino.RTC_get_time = function () {
  var RTCName = this.getFieldValue('RTCName');
  var timeType = this.getFieldValue('TIME_TYPE');
  var code = RTCName + '.' + timeType +'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.RTC_set_time = function () {
  var RTCName = this.getFieldValue('RTCName');
  var hour = Blockly.Arduino.valueToCode(this, "hour", Blockly.Arduino.ORDER_ATOMIC);
  var minute = Blockly.Arduino.valueToCode(this, "minute", Blockly.Arduino.ORDER_ATOMIC);
  var second = Blockly.Arduino.valueToCode(this, "second", Blockly.Arduino.ORDER_ATOMIC);
  var code = RTCName + '.setTime('+ hour + ','+ minute + ','+ second +');\n';
  return code;
}
Blockly.Arduino.RTC_set_date = function () {
  var RTCName = this.getFieldValue('RTCName');
  var year = Blockly.Arduino.valueToCode(this, "year", Blockly.Arduino.ORDER_ATOMIC);
  var month = Blockly.Arduino.valueToCode(this, "month", Blockly.Arduino.ORDER_ATOMIC);
  var day = Blockly.Arduino.valueToCode(this, "day", Blockly.Arduino.ORDER_ATOMIC);
  var code = RTCName + '.setDate('+ year + ','+ month + ','+ day +');\n';
  code += RTCName + '.setDOW('+ year + ','+ month + ','+ day +');\n';
  return code;
}


//传感器_重力感应块
Blockly.Arduino.ADXL345 = function() {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
  Blockly.Arduino.definitions_['include_ADXL345'] = '#include <ADXL345.h>';
  Blockly.Arduino.definitions_['var_declare_ADXL345'] = 'ADXL345 accel;\n';
  Blockly.Arduino.setups_['setup_Wire.begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_accel.begin'] = 'accel.initialize(); \n';
  var dropdown_type = this.getFieldValue('ADXL345_PIN');
  var code = dropdown_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//传感器_重力感应块
Blockly.Arduino.ADXL345_setOffset = function() {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
  Blockly.Arduino.definitions_['include_ADXL345'] = '#include <ADXL345.h>';
  Blockly.Arduino.definitions_['var_declare_ADXL345'] = 'ADXL345 accel;\n';
  Blockly.Arduino.setups_['setup_Wire.begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_accel.begin'] = 'accel.initialize(); \n';

  var dropdown_type = this.getFieldValue('MIXEPI_ADXL345_OFFSET');
  var offset_value = Blockly.Arduino.valueToCode(this, 'OFFSET', Blockly.Arduino.ORDER_ATOMIC);
  var code;

  if(dropdown_type=="setOffsetX"){
   code = 'accel.setOffsetX(round('+offset_value+'*4/15.9));\n';
 }else  if(dropdown_type=="setOffsetY"){
   code = 'accel.setOffsetY(round('+offset_value+'*4/15.9));\n';
 }else if(dropdown_type=="setOffsetZ"){
   code = 'accel.setOffsetZ(round('+offset_value+'*4/15.9));\n';
 }
 
 return code;
};


//传感器-MPU6050-获取数据
Blockly.Arduino.MPU6050 = function() {
 Blockly.Arduino.definitions_['includeMPU6050'] = '#include <MPU6050.h>';
 Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
 Blockly.Arduino.definitions_['var_declare_MPU6050'] = 'MPU6050 mpu;';
 Blockly.Arduino.setups_['setup_ngyro'] = 'mpu.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G);';
 var MPU6050_TYPE = this.getFieldValue('MPU6050_TYPE');
 var code = MPU6050_TYPE;
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//传感器-MPU6050-更新数据
Blockly.Arduino.MPU6050_update = function() {
 var code = 'Vector normAccel = mpu.readNormalizeAccel();\nVector normGyro = mpu.readNormalizeGyro();\n';
 return code;
};

//旋转编码器写
Blockly.Arduino.encoder_write = function() {
  var Encoder_NO= this.getFieldValue('Encoder_NO');
  var value= Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC);
  var code='encoder_'+Encoder_NO+'.write('+value+');\n ';
  return code;
};

//旋转编码器读值
Blockly.Arduino.encoder_read = function() {
  var Encoder_NO= this.getFieldValue('Encoder_NO');
  var code = 'encoder_' +Encoder_NO+ '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//旋转编码管脚定义
Blockly.Arduino.encoder_init = function() {
  var CLK = this.getFieldValue('CLK');
  var DT = this.getFieldValue('DT');
  var Encoder_NO= this.getFieldValue('Encoder_NO');
  Blockly.Arduino.definitions_['include_Encoder'] ='#include <Encoder.h>\n';
  Blockly.Arduino.definitions_['var_declare_EncoderDY'] = 'Encoder encoder_'+Encoder_NO+'('+CLK+','+DT+');\n ';
  var code='';
  return code;
};

//BME280读取
Blockly.Arduino.BME280_READ = function() {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_Adafruit_Sensor'] = '#include <Adafruit_Sensor.h>';
  Blockly.Arduino.definitions_['include_Adafruit_BME280'] = '#include <Adafruit_BME280.h>';
  Blockly.Arduino.definitions_['include_SEALEVELPRESSURE_HPA'] ='#define SEALEVELPRESSURE_HPA (1013.25)';
  Blockly.Arduino.definitions_['var_declare_Adafruit_BME280'] = 'Adafruit_BME280 bme;';
  Blockly.Arduino.setups_['setup_status'] = 'unsigned status;\n  status = bme.begin(); \n';
  var code = this.getFieldValue('BME_TYPE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.PS2_init = function() {
  var PS2_DAT = this.getFieldValue('PS2_DAT');
  var PS2_CMD = this.getFieldValue('PS2_CMD');
  var PS2_SEL = this.getFieldValue('PS2_SEL');
  var PS2_CLK = this.getFieldValue('PS2_CLK');
  var rumble=this.getFieldValue('rumble');
  Blockly.Arduino.definitions_['define_PS2'] = '#include <PS2X_lib.h>';   
  Blockly.Arduino.definitions_['define_origin'] = 'PS2X ps2x;';
  Blockly.Arduino.setups_['setup_output_1'] = 'ps2x.config_gamepad('+PS2_CLK+','+PS2_CMD+','+PS2_SEL+','+PS2_DAT+', true, '+rumble+');\ndelay(300);\n';  
  return "ps2x.read_gamepad(false, 0);\n delay(30);\n";
};

//readcardnum
Blockly.Arduino.PS2_Button = function() {
  var bt=this.getFieldValue('psbt');
  var btstate = this.getFieldValue('btstate');
  var code= "ps2x."+btstate+"("+bt+")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.PS2_stk = function() {
  var stk=this.getFieldValue('psstk');
  var code= "ps2x.Analog("+stk+")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.TCS34725_Get_RGB = function() {
 Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
 Blockly.Arduino.definitions_['include_Adafruit_TCS34725'] = '#include <Adafruit_TCS34725.h>';
 Blockly.Arduino.definitions_['var_Adafruit_TCS34725'] = 'Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);';
 Blockly.Arduino.definitions_['var_declare_RGB'] = 'float red, green, blue;';
 Blockly.Arduino.setups_['setup_Adafruit_TCS34725' ] = 'if (tcs.begin()) {\nSerial.println("Found sensor");\n} \nelse { \nSerial.println("No TCS34725 found ... check your connections");\nwhile (1);\n}';
 var code = "delay(60);\ntcs.getRGB(&red, &green, &blue);\n";  
 var RGB = this.getFieldValue('TCS34725_GETRGB');
 return [RGB, Blockly.Arduino.ORDER_ATOMIC];
};
