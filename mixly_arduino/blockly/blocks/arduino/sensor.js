'use strict';

goog.provide('Blockly.Blocks.sensor');
goog.require('Blockly.Blocks');
Blockly.Blocks.sensor.HUE = 40;

Blockly.Blocks['gps_init'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_GPS_INIT)
    this.appendValueInput("RX", Number)
    .appendField("RX#")
    .setCheck(Number);
    this.appendValueInput("TX", Number)
    .appendField("TX#")
    .setCheck(Number);
    this.appendValueInput("CONTENT", Number)
    .appendField(Blockly.MIXLY_SERIAL_BEGIN)
    .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_GPS_INIT);
  }
};

Blockly.Blocks.gps_data_available = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_GPS_DATA_AVAILABLE);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_GPS_DATA_AVAILABLE);
  }
};

Blockly.Blocks.gps_data_encode = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_GPS_DATA_ENCODE);
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.gps_xxx_isValid = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField("GPS")
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_GPS_LOCATION, "location"],[Blockly.MIXLY_GPS_DATE, "date"], [Blockly.MIXLY_GPS_TIME, "time"]]), "WHAT")
    .appendField(Blockly.MIXLY_GPS_ISVALID);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_GPS_DATA_VAILD);
  }
};

Blockly.Blocks.gps_getData_xxx = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_GPS_GET)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_GPS_LOCATION_LAT, "location.lat"],[Blockly.MIXLY_GPS_LOCATION_LNG, "location.lng"], [Blockly.MIXLY_GPS_DATE_YEAR, "date.year"], [Blockly.MIXLY_GPS_DATE_MONTH, "date.month"], [Blockly.MIXLY_GPS_DATE_DAY, "date.day"], [Blockly.MIXLY_GPS_TIME_HOUR, "time.hour"], [Blockly.MIXLY_GPS_TIME_MINUTE, "time.minute"], [Blockly.MIXLY_GPS_TIME_SECOND, "time.second"], [Blockly.MIXLY_GPS_TIME_CENTISECOND, "time.centisecond"]]), "WHAT");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_GPS_GETDATA.replace('%1',this.getFieldValue('WHAT')));
  }
};

Blockly.Blocks.chaoshengbo2 = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_CHAOSHENGBO);
    this.appendDummyInput("")  
    .appendField('Trig#')
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "Trig")
    .appendField('Echo#')
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "Echo");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
    // this.setFieldValue("2","Trig");
    // this.setFieldValue("4","Echo");
  }
};

//DHT11温湿度传感器
Blockly.Blocks.DHT = {
  init: function () {
    var WHAT = [[Blockly.MIXLY_GETTEMPERATUE, 'temperature'], [Blockly.MIXLY_GETHUMIDITY, 'humidity']];
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown([['DHT11', '11'], ['DHT21', '21'], ['DHT22', '22']]), 'TYPE')
    .appendField(Blockly.MIXLY_PIN)
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    .appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
    this.setOutput(true, Number);
    var thisBlock = this;
    this.setTooltip(function () {
      var op = thisBlock.getFieldValue('WHAT');
      var TOOLTIPS = {
        'temperature': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM,
        'humidity': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_GET_HUM
      };
      return TOOLTIPS[op];
    });
  }
};

//lm35温度传感器
Blockly.Blocks.LM35 = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("LM35"+Blockly.MIXLY_TEMP);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LM35);
  }
};
//DS18B20温度传感器
Blockly.Blocks.ds18b20 = {
  init: function () {
    var UNIT = [[Blockly.MIXLY_DS18B20_C, '0'], [Blockly.MIXLY_DS18B20_F, '1']];
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_DS18B20)
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    .appendField(Blockly.MIXLY_GETTEMPERATUE)
    .appendField(new Blockly.FieldDropdown(UNIT), "UNIT");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_DS18);
  }
};
//初始化MLX90614红外测温传感器
Blockly.Blocks.mlx90614_init= {
  init: function() { 
    this.appendValueInput("mlx90614_address")
    .setCheck(null)  
    .appendField(Blockly.MIXLY_SETUP+" MLX90614"+Blockly.MLX90614_TYPE)
    .appendField(Blockly.MIXLY_LCD_ADDRESS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
//MLX90614获取数据
Blockly.Blocks.mlx90614_get_data= {
  init: function() { 
    var type = [
    [Blockly.MLX90614_TARGET_OBJECT_TEMP+"(℃)","readObjectTempC"],
    [Blockly.MLX90614_TARGET_OBJECT_TEMP+"(℉)","readObjectTempF"],
    [Blockly.MLX90614_AMBIENT_TEMP+"(℃)","readAmbientTempC"],
    [Blockly.MLX90614_AMBIENT_TEMP+"(℉)","readAmbientTempF"]];
    this.appendDummyInput()  
    .appendField("MLX90614"+Blockly.MLX90614_TYPE)
    .appendField(Blockly.MIXLY_GET)
    .appendField(new Blockly.FieldDropdown(type), "mlx90614_data");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(40);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_MLX90614_GET_DATA);
    this.setHelpUrl("");
  }
};
//DF称重模块
Blockly.Blocks.weightSensor = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("Hx711")
    .appendField(Blockly.MIXLY_WEIGHTSENSOR);
    this.appendDummyInput("")  
    .appendField('Dout#')
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "DOUT")
    .appendField('SCK#')
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCK");
    this.appendValueInput("scale")
    .setCheck(Number)
    .appendField(Blockly.HX711_scale);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_WEIGHTSENSOR);
    // this.setFieldValue("2","DOUT");
    // this.setFieldValue("4","SCK");
  }
};
//DS1302 RTC
Blockly.Blocks.DS1302_init = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DS1302_INITPIN);
    //.appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
    this.appendValueInput("RST", Number)
    .appendField("RST#")
    .setCheck(Number);
    this.appendValueInput("DAT")
    .appendField("DAT#")
    .setCheck(Number);
    this.appendValueInput("CLK")
    .appendField("CLK#")
    .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_DS1302_INIT);
  }
}

var RTCTypeList = [['DS1307','RtcDS1307'],['DS3231','RtcDS3231']];
//DS1307 RTC
Blockly.Blocks.DS1307_init = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RTCINIT);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(RTCTypeList), 'RTCType');
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_PIN);
        //.appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
        this.appendValueInput("SDA")
        .appendField("SDA#")
        .setCheck(Number);
        this.appendValueInput("SCL")
        .appendField("SCL#")
        .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_DS1307_INIT);
      },
    //mutation有问题，暂时弃用
    /*mutationToDom: function() {
	    var container = document.createElement('mutation');
	    var RTCType = (this.getFieldValue('RTCType') == 'DS1302');
	    console.log('======change in mutationToDom==========')
	    console.log(RTCType);
	    container.setAttribute('RTCType', RTCType);
	    return container;
  	},
  	domToMutation: function(xmlElement) {
	    var type = (xmlElement.getAttribute('RTCType') == 'true');
	    console.log('======change in domToMutation==========')
	    console.log(type);
	    this.updateShape_(type);
  	},
  	updateShape_: function(type) {
    // Add or remove reset pin.
    console.log('======change in updateShape_==========')
	console.log(type);
    if (type) {
    	console.log('why not me?')
    	this.appendValueInput("RST")
    		.appendField("RST#")
            .setCheck(Number);
    } else{
      /*if (this.childBlocks_.length > 0) {
      	 if (this.childBlocks_[length-1].type == 'Number') {
            this.childBlocks_[length-1].unplug();
            break;
          }
      }
      this.removeInput('RST');
    }
  }*/

};
//传感器-实时时钟块_时间变量
var RTC_TIME_TYPE = [
[Blockly.MIXLY_YEAR, "Year"],
[Blockly.MIXLY_MONTH, "Month"],
[Blockly.MIXLY_DAY, "Day"],
[Blockly.MIXLY_HOUR, "Hour"],
[Blockly.MIXLY_MINUTE, "Minute"],
[Blockly.MIXLY_SECOND, "Second"],
[Blockly.MIXLY_WEEK, "DayOfWeek"],

];


//传感器-实时时钟块_获取时间
Blockly.Blocks.RTC_get_time = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("RTC"+Blockly.MIXLY_RTCGETTIME);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT);
    //.appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(RTC_TIME_TYPE), "TIME_TYPE");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RTC_GETTIME.replace('%1',this.getFieldValue("TIME_TYPE")));
  }
};
// //传感器-实时时钟块_设置时间
Blockly.Blocks.RTC_time = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendValueInput("hour")
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_HOUR);
    this.appendValueInput("minute")
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MINUTE);
    this.appendValueInput("second")
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_SECOND);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RTC_SETTIME);
  }
};

Blockly.Blocks.RTC_date = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendValueInput("year")
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_YEAR);
    this.appendValueInput("month")
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MONTH);
    this.appendValueInput("day")
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_DAY);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RTC_SETTIME);
  }
};
//设置时间
Blockly.Blocks.RTC_set_time= {
  init: function() { 
    this.appendDummyInput()
    .setAlign(Blockly.ALIGN_RIGHT)  
    .appendField("RTC"+Blockly.MIXLY_RTCSETTIME);
    this.appendValueInput("date")
    .appendField(Blockly.MIXLY_GPS_DATE);
    this.appendValueInput("time")
    .appendField(Blockly.MIXLY_GPS_TIME);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
//获取烧录时间和日期
Blockly.Blocks.get_system_date_time= {
  init: function() { 
    this.appendDummyInput()  
    .appendField(Blockly.MIXLY_GET+" "+Blockly.MIXLY_SYSTEM)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_GPS_DATE,"DATE"],[Blockly.MIXLY_GPS_TIME,"TIME"]]), "type");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
//传感器-实时时钟块_设置日期
Blockly.Blocks.RTC_set_date = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RTCSETDATE);
   // .appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');

   this.setPreviousStatement(true, null);
   this.setNextStatement(true, null);
   this.setTooltip(Blockly.MIXLY_TOOLTIP_RTC_SETDATE);
 }
};

var SHT20_TYPE = [
[Blockly.MIXLY_TEMPERATURE, "sht20.readTemperature()"],
[Blockly.MIXLY_Humidity, "sht20.readHumidity()"],
];
Blockly.Blocks.SHT20 = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("SHT20"+Blockly.MIXLY_DHT11_T_H);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(SHT20_TYPE), "SHT20_TYPE");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip();
  }
};
var ADXL345_GETAB = [
[Blockly.MixGo_MPU9250_AX, "accel.getAccelerationX()"],
[Blockly.MixGo_MPU9250_AY, "accel.getAccelerationY()"],
[Blockly.MixGo_MPU9250_AZ, "accel.getAccelerationZ()"],
[Blockly.MixGo_MPU9250_AX+"(g)", "accel.getAccelerationX()/256.0"],
[Blockly.MixGo_MPU9250_AY+"(g)", "accel.getAccelerationY()/256.0"],
[Blockly.MixGo_MPU9250_AZ+"(g)", "accel.getAccelerationZ()/256.0"],
];
//传感器-重力感应块-获取数据
Blockly.Blocks.ADXL345 = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ADXL345);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(ADXL345_GETAB), "ADXL345_PIN");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip();
  }
};
var LIS3DHTR_GETDATA = [
[Blockly.MixGo_MPU9250_AX, "LIS.getAccelerationX()"],
[Blockly.MixGo_MPU9250_AY, "LIS.getAccelerationY()"],
[Blockly.MixGo_MPU9250_AZ, "LIS.getAccelerationZ()"],
[Blockly.MIXLY_TEMPERATURE, "LIS.getTemperature()"],
];
Blockly.Blocks.LIS3DHTR = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField('LIS3DHTR'+Blockly.MixGo_MPU9250);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(LIS3DHTR_GETDATA), "LIS3DHTR_GETDATA");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip();
  }
};
Blockly.Blocks.ADXL345_setOffset = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_SETTING)
    .appendField('ADXL345')
    .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_OFFSET);
    this.appendValueInput("OFFSET")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_DISPLAY_MATRIX_X,"setOffsetX"],[Blockly.MIXLY_DISPLAY_MATRIX_Y,"setOffsetY"],[Blockly.MIXLY_Z_AXIS,"setOffsetZ"]]), "MIXEPI_ADXL345_OFFSET");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

//传感器-MPU6050-获取数据
Blockly.Blocks.MPU6050= {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MPU6050);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown([
      [Blockly.MIXLY_Accel_X, "normAccel.XAxis"], 
      [Blockly.MIXLY_Accel_Y, "normAccel.YAxis"], 
      [Blockly.MIXLY_Accel_Z, "normAccel.ZAxis"],
      [Blockly.MIXLY_Gyro_X, "normGyro.XAxis"],
      [Blockly.MIXLY_Gyro_Y, "normGyro.YAxis"],
      [Blockly.MIXLY_Gyro_Z, "normGyro.ZAxis"],
      [Blockly.MIXLY_readTempC, "mpu.readTemperature()"]
      ]), "MPU6050_TYPE");
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

//传感器-MPU6050-更新数据
Blockly.Blocks.MPU6050_update= {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput("")
   .appendField(Blockly.MIXLY_MPU6050+Blockly.MIXLY_update_data);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setInputsInline(true);
 }
};

var Encoder_NO = [
[Blockly.MIXLY_ENCODER+1,"1"], 
[Blockly.MIXLY_ENCODER+2,"2"], 
[Blockly.MIXLY_ENCODER+3,"3"], 
[Blockly.MIXLY_ENCODER+4,"4"]
];
//旋转编码器定义
Blockly.Blocks['encoder_init'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETUP)
    .appendField(Blockly.MIXLY_ENCODER);
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
    this.appendDummyInput("")  
    .appendField('DT')
    .appendField(new Blockly
      .FieldDropdown(profile.default.digital), "DT")
    .appendField('CLK')
    .appendField(new Blockly
      .FieldDropdown(profile.default.digital), "CLK");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip("");
    this.setHelpUrl("");
    // this.setFieldValue("2","DT");
    // this.setFieldValue("4","CLK");
  }
};

//旋转编码器赋值
Blockly.Blocks['encoder_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_VALUE2);
    this.appendValueInput("value")
    .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setInputsInline(true);
  }
};

//旋转编码器读值
Blockly.Blocks['encoder_read'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SERIAL_READ);
    this.setOutput(true, Number);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setInputsInline(true);
  }
};

//BME280读取
Blockly.Blocks['BME280_READ'] = {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput()
   .appendField(Blockly.MIXLY_SERIAL_READ)
   .appendField(new Blockly.FieldDropdown([["BME280","bme"], ["BMP280","bmp"]]), "TYPE");
   this.appendValueInput("address")
   .appendField(Blockly.MIXLY_LCD_ADDRESS);
   this.appendDummyInput()
.appendField(Blockly.MIXLY_GET)
   .appendField(new Blockly.FieldDropdown([[Blockly.blynk_IOT_IR_TEMP,"readTemperature()"], [Blockly.MIXLY_Humidity,"readHumidity()"], [Blockly.MIXLY_Altitude,"readPressure()"],[ Blockly.MIXLY_HEIGHT ,"readAltitude(SEALEVELPRESSURE_HPA)"] ]), "BME_TYPE")
   this.setOutput(true, null);
   this.setTooltip("");
   this.setHelpUrl("");
 }
};

//PS2
Blockly.Blocks.PS2_init={
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput("")
   .appendField(Blockly.MIXLY_SETUP+Blockly.PS2);
   this.appendDummyInput("")  
   .appendField('DAT#')
   .appendField(new Blockly.FieldDropdown(profile.default.digital), "PS2_DAT")
   .appendField('CMD#')
   .appendField(new Blockly.FieldDropdown(profile.default.digital), "PS2_CMD")
   .appendField('SEL#')
   .appendField(new Blockly.FieldDropdown(profile.default.digital), "PS2_SEL")
   .appendField('CLK#')
   .appendField(new Blockly.FieldDropdown(profile.default.digital), "PS2_CLK");
   this.appendDummyInput("")
   .appendField(Blockly.PS2_setRumble)
   .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON,"true"],[Blockly.MIXLY_OFF,"false"]]), "rumble");
   this.setInputsInline(true);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setTooltip('');
   this.setFieldValue("2","PS2_DAT");
   this.setFieldValue("4","PS2_CMD");
   this.setFieldValue("5","PS2_SEL");
   this.setFieldValue("12","PS2_CLK");
 }
};
Blockly.Blocks.PS2_update= {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput("")
   .appendField(Blockly.PS2+Blockly.MIXLY_update_data);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setInputsInline(true);
 }
};
var PSBUTTON =[
[Blockly.PS2_TRIANGLE,"PSB_GREEN"],
[Blockly.PS2_CIRCLE,"PSB_RED"],
[Blockly.PS2_CROSS,"PSB_BLUE"],
[Blockly.PS2_SQUARE,"PSB_PINK"],
[Blockly.PS2_L1,"PSB_L1"],
[Blockly.PS2_L2,"PSB_L2"],
// ["PSB_L3","PSB_L3"],
[Blockly.PS2_R1,"PSB_R1"],
[Blockly.PS2_R2,"PSB_R2"],
// ["PSB_R3","PSB_R3"],
[Blockly.PS2_UP,"PSB_PAD_UP"],
[Blockly.PS2_RIGHT,"PSB_PAD_RIGHT"],
[Blockly.PS2_DOWN,"PSB_PAD_DOWN"],
[Blockly.PS2_LEFT,"PSB_PAD_LEFT"],
[Blockly.PS2_SELECT,"PSB_SELECT"],
[Blockly.PS2_START,"PSB_START"]
];

//
Blockly.Blocks.PS2_Button={
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput("")
   .appendField(Blockly.PS2_BUTTON)
   .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
   .appendField(Blockly.MIXLY_PULSEIN_STAT)
   .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_BUTTON_HOLD ,"Button"],[Blockly.MIXLY_BUTTON_PRESSED, "ButtonPressed"],[Blockly.MIXLY_BUTTON_RELEASED,"ButtonReleased"],[Blockly.MIXLY_CHANGE,"NewButtonState"]]), "btstate");
   this.setOutput(true, Boolean);
   this.setTooltip('');
 }
};

Blockly.Blocks.PS2_stk={
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    var PSSTK =[
    [Blockly.PS2_RX,"PSS_RX"],
    [Blockly.PS2_RY,"PSS_RY"],
    [Blockly.PS2_LX,"PSS_LX"],
    [Blockly.PS2_LY,"PSS_LY"],
    ];
    this.appendDummyInput("")
    .appendField(Blockly.PS2_stick)
    .appendField(new Blockly.FieldDropdown(PSSTK), "psstk");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

//传感器-颜色识别-获取数据
var TCS34725_GETRGB = [
[Blockly.Msg.COLOUR_RGB_RED, "getR()"],
[Blockly.Msg.COLOUR_RGB_GREEN, "getG()"],
[Blockly.Msg.COLOUR_RGB_BLUE, "getB()"]
];

var DF_TCS34725_COLOR = [
[Blockly.Msg.COLOUR_RGB_RED, "tcs34725.getRedToGamma()"],
[Blockly.Msg.COLOUR_RGB_GREEN, "tcs34725.getGreenToGamma()"],
[Blockly.Msg.COLOUR_RGB_BLUE, "tcs34725.getBlueToGamma()"],
];

Blockly.Blocks.TCS34725_Get_RGB = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.TCS34725_Get_RGB)
    .appendField(new Blockly.FieldDropdown(DF_TCS34725_COLOR), "DF_TCS34725_COLOR");
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

//初始化TCS230颜色传感器
Blockly.Blocks.tcs230_init= {
  init: function() { 
    this.appendDummyInput()  
    .appendField(Blockly.MIXLY_SETUP+" TCS230");
    this.appendValueInput("tcs230_s0")
    .setCheck(null)  
    .appendField("S0");
    this.appendValueInput("tcs230_s1")
    .setCheck(null)  
    .appendField("S1");
    this.appendValueInput("tcs230_s2")
    .setCheck(null)  
    .appendField("S2");
    this.appendValueInput("tcs230_s3")
    .setCheck(null)  
    .appendField("S3");
    this.appendValueInput("tcs230_led")
    .setCheck(null)  
    .appendField("LED");
    this.appendValueInput("tcs230_out")
    .setCheck(null)  
    .appendField("OUT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//TCS230颜色传感器 获取RGB值
Blockly.Blocks.tcs230_Get_RGB= {
  init: function() { 
    this.appendDummyInput()  
    .appendField("TCS230")
    .appendField(Blockly.MIXLY_GET)
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.COLOUR_RGB_RED,"R"],[Blockly.Msg.COLOUR_RGB_GREEN,"G"],[Blockly.Msg.COLOUR_RGB_BLUE,"B"]]), "tcs230_color");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['Arduino_keypad_4_4_start'] = {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput()
   .setAlign(Blockly.ALIGN_CENTRE)
   .appendField(Blockly.MIXLY_SETUP+Blockly.MIXLY_Keypad);
   this.appendDummyInput()
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField(new Blockly.FieldTextInput("KEYPAD_4_4"), "keypad_name");
   this.appendValueInput("keypad_row")
   .setCheck(null)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField(Blockly.Msg.DATAFRAME_RAW+Blockly.MIXLY_PIN);
   this.appendValueInput("keypad_col")
   .setCheck(null)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField(Blockly.Msg.DATAFRAME_COLUMN+Blockly.MIXLY_PIN);
   this.appendValueInput("keypad_type")
   .setCheck(null)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField(Blockly.MIXLY_Keypad_define);
   this.setNextStatement(true, null);
   this.setPreviousStatement(true);  
   this.setTooltip("");
   this.setHelpUrl("");
 }
};

Blockly.Blocks['keypad_row_data'] = {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendValueInput("keypad_row_1", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("1#");
   this.appendValueInput("keypad_row_2", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("2#");
   this.appendValueInput("keypad_row_3", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("3#");
   this.appendValueInput("keypad_row_4", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("4#");
   this.setInputsInline(true);
   this.setOutput(true, null);    
   this.setTooltip("");
   this.setHelpUrl("");
 }
};

Blockly.Blocks['keypad_col_data'] = {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendValueInput("keypad_col_1", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("1#");
   this.appendValueInput("keypad_col_2", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("2#");
   this.appendValueInput("keypad_col_3", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("3#");
   this.appendValueInput("keypad_col_4", Number)
   .setCheck(Number)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField("4#");
   this.setInputsInline(true);
   this.setOutput(true, null);    
   this.setTooltip("");
   this.setHelpUrl("");
 }
};

Blockly.Blocks['keypad_type_data'] = {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput()
   .setAlign(Blockly.ALIGN_CENTRE)
   .appendField(new Blockly.FieldTextInput("1"), "keypad_1_1")
   .appendField(new Blockly.FieldTextInput("2"), "keypad_1_2")
   .appendField(new Blockly.FieldTextInput("3"), "keypad_1_3")
   .appendField(new Blockly.FieldTextInput("A"), "keypad_1_4");
   this.appendDummyInput()
   .setAlign(Blockly.ALIGN_CENTRE)
   .appendField(new Blockly.FieldTextInput("4"), "keypad_2_1")
   .appendField(new Blockly.FieldTextInput("5"), "keypad_2_2")
   .appendField(new Blockly.FieldTextInput("6"), "keypad_2_3")
   .appendField(new Blockly.FieldTextInput("B"), "keypad_2_4");
   this.appendDummyInput()
   .setAlign(Blockly.ALIGN_CENTRE)
   .appendField(new Blockly.FieldTextInput("7"), "keypad_3_1")
   .appendField(new Blockly.FieldTextInput("8"), "keypad_3_2")
   .appendField(new Blockly.FieldTextInput("9"), "keypad_3_3")
   .appendField(new Blockly.FieldTextInput("C"), "keypad_3_4");
   this.appendDummyInput()
   .setAlign(Blockly.ALIGN_CENTRE)
   .appendField(new Blockly.FieldTextInput("*"), "keypad_4_1")
   .appendField(new Blockly.FieldTextInput("0"), "keypad_4_2")
   .appendField(new Blockly.FieldTextInput("#"), "keypad_4_3")
   .appendField(new Blockly.FieldTextInput("D"), "keypad_4_4");
   this.setOutput(true, null);
   this.setTooltip("");
   this.setHelpUrl("");
 }
};

Blockly.Blocks['get_keypad_num'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldTextInput("KEYPAD_4_4"), "keypad_name")
    .appendField(Blockly.MIXLY_Keypad_GETKEY);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_keypad_event'] = {
  init: function() {
   this.setColour(Blockly.Blocks.sensor.HUE);
   this.appendDummyInput()
   .appendField(Blockly.MIXLY_Keypad)
   .appendField(new Blockly.FieldTextInput("KEYPAD_4_4"), "keypad_name");
   this.appendValueInput("keypad_event_input")
   .setCheck(null)
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField(Blockly.MIXLY_Keypad_EVENT);
   this.appendDummyInput()
   .setAlign(Blockly.ALIGN_RIGHT)
   .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL)
   .appendField(new Blockly.FieldTextInput("1000"), "keypad_start_event_delay")
   .appendField(Blockly.MIXLY_MILLIS);
   this.appendStatementInput("keypad_event_data")
   .setCheck(null)
   .appendField(Blockly.MIXLY_DO );
   this.setInputsInline(false);    
   this.setTooltip("");
   this.setHelpUrl("");
 }
};


var MixGo_MPU9250_GETAB = [
[Blockly.MixGo_MPU9250_AX, "a"],
[Blockly.MixGo_MPU9250_AY, "b"],
[Blockly.MixGo_MPU9250_AZ, "c"],
[Blockly.MixGo_MPU9250_GX, "d"],
[Blockly.MixGo_MPU9250_GY, "e"],
[Blockly.MixGo_MPU9250_GZ, "f"],
[Blockly.MixGo_MPU9250_MX, "g"],
[Blockly.MixGo_MPU9250_MY, "h"],
[Blockly.MixGo_MPU9250_MZ, "i"]
];

//传感器_重力感应块_获取9轴数据
Blockly.Blocks.mixgo_MPU9250 = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("MPU9250"+Blockly.MixGo_MPU9250);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(MixGo_MPU9250_GETAB), "MixGo_MPU9250_GETAB");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("");
    this.setHelpUrl('');
  }
};

//NTC电阻
Blockly.Blocks.NTC_TEMP = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("NTC")
    .appendField(Blockly.MIXLY_TEMP);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_PIN)
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendValueInput("NominalResistance")
    .setCheck(Number)
    .appendField(Blockly.MIXLY_NominalResistance);
    this.appendValueInput("betaCoefficient")
    .setCheck(Number)
    .appendField(Blockly.MIXLY_betaCoefficient);
    this.appendValueInput("seriesResistor")
    .setCheck(Number)
    .appendField(Blockly.MIXLY_seriesResistor);
    this.setInputsInline(false);
    this.setOutput(true, Number);
    this.setTooltip();
  }
};
