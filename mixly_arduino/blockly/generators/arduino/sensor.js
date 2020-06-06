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
 + '  sensors_' + dropdown_pin + '.requestTemperatures();\n'
 + '  if(w==0) {\n    return sensors_' + dropdown_pin + '.getTempC(insideThermometer);\n  }\n'
 + '  else {\n    return sensors_' + dropdown_pin + '.getTempF(insideThermometer);\n  }\n'
 + '}\n';
 Blockly.Arduino.definitions_[funcName] = code;
 return ['ds18b20_' + dropdown_pin + '_getTemp(' + unit + ')', Blockly.Arduino.ORDER_ATOMIC];
}
//初始化MLX90614红外测温传感器
Blockly.Arduino.mlx90614_init = function() {
  var value_mlx90614_address = Blockly.Arduino.valueToCode(this, 'mlx90614_address', Blockly.Arduino.ORDER_ATOMIC);
  var text_mlx90614_name = 'MLX';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_Adafruit_MLX90614'] = '#include <Adafruit_MLX90614.h>';
  Blockly.Arduino.definitions_['var_declare_MLX90614_'+text_mlx90614_name] = 'Adafruit_MLX90614 '+text_mlx90614_name+' = Adafruit_MLX90614('+value_mlx90614_address+');';
  Blockly.Arduino.setups_['setup_MLX90614_'+text_mlx90614_name] = ''+text_mlx90614_name+'.begin();';
  var code = '';
  return code;
};
//MLX90614获取数据
Blockly.Arduino.mlx90614_get_data = function() {
  var text_mlx90614_name = 'MLX';
  var dropdown_mlx90614_data = this.getFieldValue('mlx90614_data');
  var code = ''+text_mlx90614_name+'.'+dropdown_mlx90614_data+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.weightSensor = function () {
  var DOUT = this.getFieldValue('DOUT');
  var SCK = this.getFieldValue('SCK');
  var scale= Blockly.Arduino.valueToCode(this, 'scale', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Hx711'] = '#include <Hx711.h>';
  Blockly.Arduino.definitions_['var_declare_Hx711'+DOUT+SCK] = 'Hx711 scale' + DOUT + '_' + SCK+"("+DOUT+","+SCK+");";
  Blockly.Arduino.setups_['setup_HX711'+DOUT+SCK] = 'scale' + DOUT + '_' + SCK+'.setOffset(scale'+DOUT+'_'+SCK+'.getAverageValue(30));';
  Blockly.Arduino.setups_['setup_'+'scale' + DOUT + '_' + SCK+' .setScale'] =  'scale'+DOUT+'_'+SCK+'.setScale('+scale+');';
  var code = 'scale' + DOUT + '_' + SCK+'.getWeight(10)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
//DS1302
Blockly.Arduino.DS1302_init = function () {
  var dropdown_rst = Blockly.Arduino.valueToCode(this, 'RST', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_dat = Blockly.Arduino.valueToCode(this, 'DAT', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_clk = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ThreeWire'] = '#include <ThreeWire.h>';
  Blockly.Arduino.definitions_['include_RtcDS1302'] = '#include <RtcDS1302.h>';
  //Blockly.Arduino.definitions_['var_declare_RtcDateTime_dt'] = 'const RtcDateTime dt;';
  Blockly.Arduino.definitions_['var_declare_ThreeWire'] = 'ThreeWire ' +'myWire(' + dropdown_dat + ',' + dropdown_clk + ',' + dropdown_rst + ');';
  Blockly.Arduino.definitions_['var_declare_RtcDS1302'] = 'RtcDS1302<ThreeWire> Rtc(myWire);';
  Blockly.Arduino.setups_['setup_Rtc.Begin'] = 'Rtc.Begin();\n  Rtc.SetIsRunning(true);';
  return "";
};

Blockly.Arduino.DS1307_init = function () {
  var SDA = Blockly.Arduino.valueToCode(this, 'SDA', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'SCL', Blockly.Arduino.ORDER_ATOMIC);
  var RTCType = this.getFieldValue('RTCType');
  Blockly.Arduino.definitions_['include_'+RTCType] = '#include <'+RTCType+'.h>';
  //Blockly.Arduino.definitions_['var_declare_RtcDateTime_dt'] = 'const RtcDateTime dt;';
  if(SDA!="SDA"||SCL!="SCL"){
    Blockly.Arduino.definitions_['include_Wire'] = '#include <SoftwareWire.h>';
    Blockly.Arduino.definitions_['var_declare_SoftwareWire'] = 'SoftwareWire myWire('+SDA+','+SCL+');';
    Blockly.Arduino.definitions_['var_declare_'+RTCType] = RTCType+'<SoftwareWire> Rtc(myWire);';
  }  
  else{
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.definitions_['var_declare_'+RTCType] = RTCType+'<TwoWire> Rtc(Wire);';
  }
  Blockly.Arduino.setups_['setup_Rtc.Begin'] = 'Rtc.Begin();\n  Rtc.SetIsRunning(true);';
  return "";
}

Blockly.Arduino.RTC_get_time = function () {
  var timeType = this.getFieldValue('TIME_TYPE');
  var code = 'Rtc.GetDateTime().' + timeType +'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.RTC_date = function () {
 var year = Blockly.Arduino.valueToCode(this, "year", Blockly.Arduino.ORDER_ATOMIC);
 var month = Blockly.Arduino.valueToCode(this, "month", Blockly.Arduino.ORDER_ATOMIC);
 var day = Blockly.Arduino.valueToCode(this, "day", Blockly.Arduino.ORDER_ATOMIC);

 switch(month)
 {
  case '1':
  month = 'Jan';
  break;
  case '2':
  month = 'Feb';
  break;
  case '3':
  month = 'Mar';
  break;
  case '4':
  month = 'Apr';
  break;
  case '5':
  month = 'May';
  break;
  case '6':
  month = 'Jun';
  break;
  case '7':
  month = 'Jul';
  break;
  case '8':
  month = 'Aug';
  break;
  case '9':
  month = 'Sep';
  break;
  case '10':
  month = 'Oct';
  break;
  case '11':
  month = 'Nov';
  break;
  case '12':
  month = 'Dec';
  break;
  default:
  month = 'Jan';
}
if(day.length == 1)
  day = '0'+day;
var code = '"'+month  + '/'+ day + '/'+ year +'"';
return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.RTC_time = function () {
 var hour = Blockly.Arduino.valueToCode(this, "hour", Blockly.Arduino.ORDER_ATOMIC);
 var minute = Blockly.Arduino.valueToCode(this, "minute", Blockly.Arduino.ORDER_ATOMIC);
 var second = Blockly.Arduino.valueToCode(this, "second", Blockly.Arduino.ORDER_ATOMIC);
 if(hour.length == 1)
  hour = '0'+hour;
if(minute.length == 1)
  minute = '0'+minute;
if(second.length == 1)
  second = '0'+second;
var code = '"'+ hour + ':'+ minute + ':'+ second +'"';
return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//设置时间
Blockly.Arduino.RTC_set_time = function() {
  var value_date = Blockly.Arduino.valueToCode(this, 'date', Blockly.Arduino.ORDER_ATOMIC);
  var value_time = Blockly.Arduino.valueToCode(this, 'time', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  code = 'Rtc.SetDateTime(RtcDateTime('+value_date+', '+value_time+'));\n';
  return code;
};
//获取烧录时间和日期
Blockly.Arduino.get_system_date_time = function() {
  var dropdown_type = this.getFieldValue('type');
  var code = '__'+dropdown_type+'__';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.RTC_set_date = function () {
  var RTCName = "myRTC";
  var code = RTCName + '.setDate('+ year + ','+ month + ','+ day +');\n';
  code += RTCName + '.setDOW('+ year + ','+ month + ','+ day +');\n';
  return code;
}
//传感器_sht20
Blockly.Arduino.SHT20 = function() {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_DFRobot_SHT20'] = '#include <DFRobot_SHT20.h>';
  Blockly.Arduino.definitions_['var_declare_DFRobot_SHT20'] = 'DFRobot_SHT20 sht20;\n';
  Blockly.Arduino.setups_['setup_sht20initSHT20'] = 'sht20.initSHT20();';
  Blockly.Arduino.setups_['setup_sht20.checkSHT20'] = 'sht20.checkSHT20(); \n';
  var dropdown_type = this.getFieldValue('SHT20_TYPE');
  var code = dropdown_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

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
  Blockly.Arduino.setups_['setup_status'] = 'unsigned status;\n  status = bme.begin();';
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
  Blockly.Arduino.setups_['setup_output_1'] = 'ps2x.config_gamepad('+PS2_CLK+','+PS2_CMD+','+PS2_SEL+','+PS2_DAT+', true, '+rumble+');\n  delay(300);\n';  
  return "";
};

Blockly.Arduino.PS2_update = function() {
 var code = 'ps2x.read_gamepad(false, 0);\ndelay(30);\n';
 return code;
};

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

//初始化TCS230颜色传感器
Blockly.Arduino.tcs230_init = function() {
    var value_tcs230_s0 = Blockly.Arduino.valueToCode(this, 'tcs230_s0', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_s1 = Blockly.Arduino.valueToCode(this, 'tcs230_s1', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_s2 = Blockly.Arduino.valueToCode(this, 'tcs230_s2', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_s3 = Blockly.Arduino.valueToCode(this, 'tcs230_s3', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_led = Blockly.Arduino.valueToCode(this, 'tcs230_led', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_out = Blockly.Arduino.valueToCode(this, 'tcs230_out', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['var_declare_tcs230_pin'] = '#define tcs230_S0 '+value_tcs230_s0+''
                                                     +'\n#define tcs230_S1 '+value_tcs230_s1+''
                                                     +'\n#define tcs230_S2 '+value_tcs230_s2+''
                                                     +'\n#define tcs230_S3 '+value_tcs230_s3+''
                                                     +'\n#define tcs230_sensorOut '+value_tcs230_out+''
                                                     +'\n#define tcs230_LED '+value_tcs230_led+'';

  Blockly.Arduino.definitions_['function_tcs230_Getcolor'] = '//TCS230颜色传感器获取RGB值'
                                                          +'\nint tcs230_Getcolor(char data)'
                                                          +'\n{'
                                                          +'\n  int frequency = 0;'
                                                          +'\n  switch(data)'
                                                          +'\n  {'
                                                          +'\n    case \'R\':'
                                                          +'\n    {'
                                                          +'\n      digitalWrite(tcs230_S2,LOW);'
                                                          +'\n      digitalWrite(tcs230_S3,LOW);'
                                                          +'\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
                                                          +'\n      frequency = map(frequency, 25, 72, 255, 0);'
                                                          +'\n      break;'
                                                          +'\n    }'
                                                          +'\n    case \'G\':'
                                                          +'\n    {'
                                                          +'\n      digitalWrite(tcs230_S2,HIGH);'
                                                          +'\n      digitalWrite(tcs230_S3,HIGH);'
                                                          +'\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
                                                          +'\n      frequency = map(frequency, 30, 90, 255, 0);'
                                                          +'\n      break;'
                                                          +'\n    }'
                                                          +'\n    case \'B\':'
                                                          +'\n    {'
                                                          +'\n      digitalWrite(tcs230_S2,LOW);'
                                                          +'\n      digitalWrite(tcs230_S3,HIGH);'
                                                          +'\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
                                                          +'\n      frequency = map(frequency, 25, 70, 255, 0);'
                                                          +'\n      break;'
                                                          +'\n    }'
                                                          +'\n    default:'
                                                          +'\n      return -1;'
                                                          +'\n  }'
                                                          +'\n  if (frequency < 0)'
                                                          +'\n    frequency = 0;'
                                                          +'\n  if (frequency > 255)'
                                                          +'\n    frequency = 255;'
                                                          +'\n  return frequency;'
                                                          +'\n}\n';

  Blockly.Arduino.setups_['setup_tcs230_pin'] = 'pinMode(tcs230_S0, OUTPUT);'
                                             +'\n  pinMode(tcs230_S1, OUTPUT);'
                                             +'\n  pinMode(tcs230_S2, OUTPUT);'
                                             +'\n  pinMode(tcs230_S3, OUTPUT);'
                                             +'\n  pinMode(tcs230_LED, OUTPUT);'
                                             +'\n  pinMode(tcs230_sensorOut, INPUT);'
                                             +'\n  digitalWrite(tcs230_S0,HIGH);'
                                             +'\n  digitalWrite(tcs230_S1,LOW);'
                                             +'\n  digitalWrite(tcs230_LED,HIGH);';
  var code = '';
  return code;
};

//TCS230颜色传感器 获取RGB值
Blockly.Arduino.tcs230_Get_RGB = function() {
  var dropdown_tcs230_color = this.getFieldValue('tcs230_color');
  var code = 'tcs230_Getcolor(\''+dropdown_tcs230_color+'\')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Arduino_keypad_4_4_start = function() {
  var text_keypad_name = this.getFieldValue('keypad_name');
  var text_keypad_row = Blockly.Arduino.valueToCode(this, 'keypad_row',Blockly.Arduino.ORDER_ATOMIC);
  var text_keypad_col = Blockly.Arduino.valueToCode(this, 'keypad_col',Blockly.Arduino.ORDER_ATOMIC);
  var text_keypad_type = Blockly.Arduino.valueToCode(this, 'keypad_type',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_library_keypad'] = '#include <Keypad.h>';
  Blockly.Arduino.definitions_['var_keypadstart1' + text_keypad_name] = 'const byte '+text_keypad_name+'_ROWS = 4;';
  Blockly.Arduino.definitions_['var_keypadstart2' + text_keypad_name] = 'const byte '+text_keypad_name+'_COLS = 4;';
  Blockly.Arduino.definitions_['var_keypadstart3' + text_keypad_name] = 'char '+text_keypad_name+'_hexaKeys['+text_keypad_name+'_ROWS]['+text_keypad_name+'_COLS] = {' + '\n' + text_keypad_type + '\n};';
  Blockly.Arduino.definitions_['var_keypadstart4' + text_keypad_name] = 'byte '+text_keypad_name+'_rowPins['+text_keypad_name+'_ROWS] = '+text_keypad_row;
  Blockly.Arduino.definitions_['var_keypadstart5' + text_keypad_name] = 'byte '+text_keypad_name+'_colPins['+text_keypad_name+'_COLS] = '+text_keypad_col;
  Blockly.Arduino.definitions_['var_keypadstart6' + text_keypad_name] = 'Keypad '+text_keypad_name+' = Keypad(makeKeymap('+text_keypad_name+'_hexaKeys), '+text_keypad_name+'_rowPins, '+text_keypad_name+'_colPins, '+text_keypad_name+'_ROWS, '+text_keypad_name+'_COLS);';
  Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
  var code = '';
  return code;
};

Blockly.Arduino.keypad_row_data= function() {
  var pin_keypad_row_1 = Blockly.Arduino.valueToCode(this, 'keypad_row_1',Blockly.Arduino.ORDER_ATOMIC);
  var pin_keypad_row_2 = Blockly.Arduino.valueToCode(this, 'keypad_row_2',Blockly.Arduino.ORDER_ATOMIC);
  var pin_keypad_row_3 = Blockly.Arduino.valueToCode(this, 'keypad_row_3',Blockly.Arduino.ORDER_ATOMIC);
  var pin_keypad_row_4 = Blockly.Arduino.valueToCode(this, 'keypad_row_4',Blockly.Arduino.ORDER_ATOMIC);
  var code = '{'+pin_keypad_row_1+', '+pin_keypad_row_2+', '+pin_keypad_row_3+', '+pin_keypad_row_4+'};';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.keypad_col_data= function() {
  var pin_keypad_col_1 = Blockly.Arduino.valueToCode(this, 'keypad_col_1',Blockly.Arduino.ORDER_ATOMIC);
  var pin_keypad_col_2 = Blockly.Arduino.valueToCode(this, 'keypad_col_2',Blockly.Arduino.ORDER_ATOMIC);
  var pin_keypad_col_3 = Blockly.Arduino.valueToCode(this, 'keypad_col_3',Blockly.Arduino.ORDER_ATOMIC);
  var pin_keypad_col_4 = Blockly.Arduino.valueToCode(this, 'keypad_col_4',Blockly.Arduino.ORDER_ATOMIC);
  var code = '{'+pin_keypad_col_1+', '+pin_keypad_col_2+', '+pin_keypad_col_3+', '+pin_keypad_col_4+'};';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.keypad_type_data= function() {
  var text_keypad_1_1 = this.getFieldValue('keypad_1_1');
  var text_keypad_1_2 = this.getFieldValue('keypad_1_2');
  var text_keypad_1_3 = this.getFieldValue('keypad_1_3');
  var text_keypad_1_4 = this.getFieldValue('keypad_1_4');

  var text_keypad_2_1 = this.getFieldValue('keypad_2_1');
  var text_keypad_2_2 = this.getFieldValue('keypad_2_2');
  var text_keypad_2_3 = this.getFieldValue('keypad_2_3');
  var text_keypad_2_4 = this.getFieldValue('keypad_2_4');

  var text_keypad_3_1 = this.getFieldValue('keypad_3_1');
  var text_keypad_3_2 = this.getFieldValue('keypad_3_2');
  var text_keypad_3_3 = this.getFieldValue('keypad_3_3');
  var text_keypad_3_4 = this.getFieldValue('keypad_3_4');

  var text_keypad_4_1 = this.getFieldValue('keypad_4_1');
  var text_keypad_4_2 = this.getFieldValue('keypad_4_2');
  var text_keypad_4_3 = this.getFieldValue('keypad_4_3');
  var text_keypad_4_4 = this.getFieldValue('keypad_4_4');
  var code =   
  '  {\''+text_keypad_1_1+'\',\''+text_keypad_1_2+'\',\''+text_keypad_1_3+'\',\''+text_keypad_1_4+'\'},'+
  '\n  {\''+text_keypad_2_1+'\',\''+text_keypad_2_2+'\',\''+text_keypad_2_3+'\',\''+text_keypad_2_4+'\'},'+
  '\n  {\''+text_keypad_3_1+'\',\''+text_keypad_3_2+'\',\''+text_keypad_3_3+'\',\''+text_keypad_3_4+'\'},'+
  '\n  {\''+text_keypad_4_1+'\',\''+text_keypad_4_2+'\',\''+text_keypad_4_3+'\',\''+text_keypad_4_4+'\'}';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.get_keypad_num = function() {
  var text_keypad_name = this.getFieldValue('keypad_name');
  var code = ''+text_keypad_name+'.getKey()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_keypad_event'] = function() {
  var text_keypad_name = this.getFieldValue('keypad_name');
  var value_keypad_event_input = Blockly.Arduino.valueToCode(this, 'keypad_event_input', Blockly.Arduino.ORDER_ATOMIC);
  var text_keypad_start_event_delay = this.getFieldValue('keypad_start_event_delay');
  var statements_keypad_event_data = Blockly.Arduino.statementToCode(this, 'keypad_event_data');

  Blockly.Arduino.definitions_['define_variate_' + value_keypad_event_input] = 'volatile char ' + value_keypad_event_input + ';';
  Blockly.Arduino.definitions_['var_keypadstart7_event' + text_keypad_name] = 'void keypadEvent_' + text_keypad_name + '(KeypadEvent ' + value_keypad_event_input + ') {' + 
  '\n' + statements_keypad_event_data +
  '\n}';
  Blockly.Arduino.setups_['setup_keypad_event_and_delay' + text_keypad_name] = text_keypad_name + '.addEventListener(keypadEvent_' + text_keypad_name + ');' + 
  '\n  ' + text_keypad_name + '.setHoldTime(' + text_keypad_start_event_delay + ');';

  var code = '';
  return code;
};