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
        this.appendValueInput("PIN1", Number)
            .appendField('Trig#')
            .setCheck(Number);
        this.appendValueInput("PIN2", Number)
            .appendField('Echo#')
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
    }
};

//DHT11温湿度传感器
Blockly.Blocks.dht11 = {
    init: function () {
        var WHAT = [[Blockly.MIXLY_DHT11_T, 'temperature'], [Blockly.MIXLY_DHT11_H, 'humidity']];
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(new Blockly.FieldDropdown([['DHT11', '11'], ['DHT21', '21'], ['DHT22', '22'], ['DHT33', '33'], ['DHT44', '44']]), 'TYPE')
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
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
    this.appendDummyInput("").appendField(Blockly.MIXLY_LM35);
    this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
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
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_DS18B20)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_DS18B20_GET_TEMP)
            .appendField(new Blockly.FieldDropdown(UNIT), "UNIT");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_DS18);
    }
};
//DF称重模块
Blockly.Blocks.weightSensor = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("Hx711")
    .appendField(Blockly.MIXLY_WEIGHTSENSOR);
    this.appendValueInput("PIN1", Number)
    .appendField('Dout#')
    .setCheck(Number);
    this.appendValueInput("PIN2", Number)
    .appendField('SCK#')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_WEIGHTSENSOR);
  }
};
//DS1302 RTC
Blockly.Blocks.DS1302_init = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_DS1302_INITPIN)
            .appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
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

var RTCTypeList = [['DS1302','DS1302'],['DS1307','DS1307']];
//DS1307 RTC
Blockly.Blocks.DS1307_init = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.MIXLY_RTCINIT);
        //this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(RTCTypeList), 'RTCType');
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
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
  [Blockly.MIXLY_YEAR, "getYear"],
  [Blockly.MIXLY_MONTH, "getMonth"],
  [Blockly.MIXLY_DAY, "getDay"],
  [Blockly.MIXLY_HOUR, "getHour"],
  [Blockly.MIXLY_MINUTE, "getMinute"],
  [Blockly.MIXLY_SECOND, "getSecond"],
  [Blockly.MIXLY_WEEK, "getWeek"]
];


//传感器-实时时钟块_获取时间
Blockly.Blocks.RTC_get_time = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_RTCGETTIME);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(RTC_TIME_TYPE), "TIME_TYPE");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RTC_GETTIME.replace('%1',this.getFieldValue("TIME_TYPE")));
  }
};
//传感器-实时时钟块_设置时间
Blockly.Blocks.RTC_set_time = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_RTCSETTIME).appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
    this.appendValueInput("hour").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  "+Blockly.MIXLY_HOUR);
    this.appendValueInput("minute").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  "+Blockly.MIXLY_MINUTE);
    this.appendValueInput("second").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  "+Blockly.MIXLY_SECOND);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RTC_SETTIME);
   }
};
//传感器-实时时钟块_设置日期
Blockly.Blocks.RTC_set_date = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_RTCSETDATE).appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
    this.appendValueInput("year").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  "+Blockly.MIXLY_YEAR);
    this.appendValueInput("month").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  "+Blockly.MIXLY_MONTH);
    this.appendValueInput("day").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  "+Blockly.MIXLY_DAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RTC_SETDATE);
  }
};

var ADXL345_GETAB = [
  [Blockly.MIXLY_ADXL345_X, "x"],
  [Blockly.MIXLY_ADXL345_Y, "y"],
  [Blockly.MIXLY_ADXL345_Z, "z"],
  [Blockly.MIXLY_ADXL345_XA, "xa"],
  [Blockly.MIXLY_ADXL345_YA, "ya"]
  //, [Blockly.MIXLY_ADXL345_ZA, "za"]
];
//传感器-重力感应块-获取数据
Blockly.Blocks.ADXL345 = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_ADXL345);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ADXL345_GETAB), "ADXL345_PIN");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ADXL345.replace('%1',this.getFieldValue("ADXL345_PIN")));
   }
};

//传感器-MPU6050-获取数据
Blockly.Blocks.MPU6050= {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_MPU6050);
     this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
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
   this.appendDummyInput("").appendField(Blockly.MIXLY_MPU6050_update);
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setInputsInline(true);
}
};