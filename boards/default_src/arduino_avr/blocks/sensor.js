import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const SENSOR_HUE = 40;

export const gps_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GPS_INIT)
        this.appendValueInput("RX", Number)
            .appendField("RX#")
            .setCheck(Number);
        this.appendValueInput("TX", Number)
            .appendField("TX#")
            .setCheck(Number);
        this.appendValueInput("CONTENT", Number)
            .appendField(Blockly.Msg.MIXLY_SERIAL_BEGIN)
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_GPS_INIT);
    }
};

export const gps_data_available = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GPS_DATA_AVAILABLE);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_GPS_DATA_AVAILABLE);
    }
};

export const gps_data_encode = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GPS_DATA_ENCODE);
        this.setOutput(true, Boolean);
    }
};

export const gps_xxx_isValid = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField("GPS")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GPS_LOCATION, "location"],
                [Blockly.Msg.MIXLY_GPS_DATE, "date"],
                [Blockly.Msg.MIXLY_GPS_TIME, "time"]
            ]), "WHAT")
            .appendField(Blockly.Msg.MIXLY_GPS_ISVALID);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_GPS_DATA_VAILD);
    }
};

export const gps_getData_xxx = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GPS_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GPS_LOCATION_LAT, "location.lat"],
                [Blockly.Msg.MIXLY_GPS_LOCATION_LNG, "location.lng"],
                [Blockly.Msg.MIXLY_GPS_DATE_YEAR, "date.year"],
                [Blockly.Msg.MIXLY_GPS_DATE_MONTH, "date.month"],
                [Blockly.Msg.MIXLY_GPS_DATE_DAY, "date.day"],
                [Blockly.Msg.MIXLY_GPS_TIME_HOUR, "time.hour"],
                [Blockly.Msg.MIXLY_GPS_TIME_MINUTE, "time.minute"],
                [Blockly.Msg.MIXLY_GPS_TIME_SECOND, "time.second"],
                [Blockly.Msg.MIXLY_GPS_TIME_CENTISECOND, "time.centisecond"]
            ]), "WHAT");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_GPS_GETDATA.replace('%1', this.getFieldValue('WHAT')));
    }
};

export const chaoshengbo2 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHAOSHENGBO);
        this.appendDummyInput("")
            .appendField('Trig#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "Trig")
            .appendField('Echo#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "Echo");
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
        // this.setFieldValue("2","Trig");
        // this.setFieldValue("4","Echo");
    }
};

//DHT11温湿度传感器
export const DHT = {
    init: function () {
        var WHAT = [[Blockly.Msg.MIXLY_GETTEMPERATUE, 'temperature'], [Blockly.Msg.MIXLY_GETHUMIDITY, 'humidity']];
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([['DHT11', '11'], ['DHT21', '21'], ['DHT22', '22']]), 'TYPE')
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('WHAT');
            var TOOLTIPS = {
                'temperature': Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM,
                'humidity': Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_GET_HUM
            };
            return TOOLTIPS[op];
        });
    }
};

//lm35温度传感器
export const LM35 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("LM35" + Blockly.Msg.MIXLY_TEMP);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_LM35);
    }
};

//DS18B20温度传感器
export const ds18b20 = {
    init: function () {
        var UNIT = [[Blockly.Msg.MIXLY_DS18B20_C, '0'], [Blockly.Msg.MIXLY_DS18B20_F, '1']];
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_DS18B20)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN")
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE)
            .appendField(new Blockly.FieldDropdown(UNIT), "UNIT");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_DS18);
    }
};

//初始化MLX90614红外测温传感器
export const mlx90614_init = {
    init: function () {
        this.appendValueInput("mlx90614_address")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SETUP + " MLX90614" + Blockly.Msg.MLX90614_TYPE)
            .appendField(Blockly.Msg.MIXLY_LCD_ADDRESS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(40);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//MLX90614获取数据
export const mlx90614_get_data = {
    init: function () {
        var type = [
            [Blockly.Msg.MLX90614_TARGET_OBJECT_TEMP + "(℃)", "readObjectTempC"],
            [Blockly.Msg.MLX90614_TARGET_OBJECT_TEMP + "(℉)", "readObjectTempF"],
            [Blockly.Msg.MLX90614_AMBIENT_TEMP + "(℃)", "readAmbientTempC"],
            [Blockly.Msg.MLX90614_AMBIENT_TEMP + "(℉)", "readAmbientTempF"]];
        this.appendDummyInput()
            .appendField("MLX90614" + Blockly.Msg.MLX90614_TYPE)
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown(type), "mlx90614_data");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(40);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_MLX90614_GET_DATA);
        this.setHelpUrl("");
    }
};

//DF称重模块
export const weightSensor = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("Hx711")
            .appendField(Blockly.Msg.MIXLY_WEIGHTSENSOR);
        this.appendDummyInput("")
            .appendField('Dout#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "DOUT")
            .appendField('SCK#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "SCK");
        this.appendValueInput("scale")
            .setCheck(Number)
            .appendField(Blockly.Msg.HX711_scale);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_WEIGHTSENSOR);
        // this.setFieldValue("2","DOUT");
        // this.setFieldValue("4","SCK");
    }
};

//DS1302 RTC
export const DS1302_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DS1302_INITPIN);
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
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_DS1302_INIT);
    }
}

var RTCTypeList = [['DS1307', 'RtcDS1307'], ['DS3231', 'RtcDS3231']];
//DS1307 RTC
export const DS1307_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RTCINIT);
        this.appendDummyInput("").setAlign(Blockly.inputs.Align.RIGHT).appendField(new Blockly.FieldDropdown(RTCTypeList), 'RTCType');
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_PIN);
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
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_DS1307_INIT);
    }
};

//传感器-实时时钟块_时间变量
var RTC_TIME_TYPE = [
    [Blockly.Msg.MIXLY_YEAR, "Year"],
    [Blockly.Msg.MIXLY_MONTH, "Month"],
    [Blockly.Msg.MIXLY_DAY, "Day"],
    [Blockly.Msg.MIXLY_HOUR, "Hour"],
    [Blockly.Msg.MIXLY_MINUTE, "Minute"],
    [Blockly.Msg.MIXLY_SECOND, "Second"],
    [Blockly.Msg.MIXLY_WEEK, "DayOfWeek"],

];

//传感器-实时时钟块_获取时间
export const RTC_get_time = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("RTC" + Blockly.Msg.MIXLY_RTCGETTIME);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT);
        //.appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(RTC_TIME_TYPE), "TIME_TYPE");
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RTC_GETTIME.replace('%1', this.getFieldValue("TIME_TYPE")));
    }
};

// //传感器-实时时钟块_设置时间
export const RTC_time = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput("hour")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_HOUR);
        this.appendValueInput("minute")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MINUTE);
        this.appendValueInput("second")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SECOND);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RTC_SETTIME);
    }
};

export const RTC_date = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput("year")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_YEAR);
        this.appendValueInput("month")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MONTH);
        this.appendValueInput("day")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_DAY);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RTC_SETTIME);
    }
};

//设置时间
export const RTC_set_time = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("RTC" + Blockly.Msg.MIXLY_RTCSETTIME);
        this.appendValueInput("date")
            .appendField(Blockly.Msg.MIXLY_GPS_DATE);
        this.appendValueInput("time")
            .appendField(Blockly.Msg.MIXLY_GPS_TIME);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//获取烧录时间和日期
export const get_system_date_time = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + " " + Blockly.Msg.MIXLY_SYSTEM)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GPS_DATE, "DATE"], [Blockly.Msg.MIXLY_GPS_TIME, "TIME"]]), "type");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(40);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//传感器-实时时钟块_设置日期
export const RTC_set_date = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RTCSETDATE);
        // .appendField(new Blockly.FieldTextInput('myRTC'), 'RTCName');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RTC_SETDATE);
    }
};

var SHT20_TYPE = [
    [Blockly.Msg.MIXLY_TEMPERATURE, "sht20.readTemperature()"],
    [Blockly.Msg.MIXLY_Humidity, "sht20.readHumidity()"],
];

export const SHT20 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("SHT20" + Blockly.Msg.MIXLY_DHT11_T_H);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(SHT20_TYPE), "SHT20_TYPE");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip();
    }
};

var ADXL345_GETAB = [
    [Blockly.Msg.MixGo_MPU9250_AX, "accel.getAccelerationX()"],
    [Blockly.Msg.MixGo_MPU9250_AY, "accel.getAccelerationY()"],
    [Blockly.Msg.MixGo_MPU9250_AZ, "accel.getAccelerationZ()"],
    [Blockly.Msg.MixGo_MPU9250_AX + "(g)", "accel.getAccelerationX()/256.0"],
    [Blockly.Msg.MixGo_MPU9250_AY + "(g)", "accel.getAccelerationY()/256.0"],
    [Blockly.Msg.MixGo_MPU9250_AZ + "(g)", "accel.getAccelerationZ()/256.0"],
];

//传感器-重力感应块-获取数据
export const ADXL345 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ADXL345);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(ADXL345_GETAB), "ADXL345_PIN");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip();
    }
};

var LIS3DHTR_GETDATA = [
    [Blockly.Msg.MixGo_MPU9250_AX, "LIS.getAccelerationX()"],
    [Blockly.Msg.MixGo_MPU9250_AY, "LIS.getAccelerationY()"],
    [Blockly.Msg.MixGo_MPU9250_AZ, "LIS.getAccelerationZ()"],
    [Blockly.Msg.MIXLY_TEMPERATURE, "LIS.getTemperature()"],
];

export const LIS3DHTR = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField('LIS3DHTR' + Blockly.Msg.MixGo_MPU9250);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(LIS3DHTR_GETDATA), "LIS3DHTR_GETDATA");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip();
    }
};

export const ADXL345_setOffset = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField('ADXL345')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_OFFSET);
        this.appendValueInput("OFFSET")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_DISPLAY_MATRIX_X, "setOffsetX"], [Blockly.Msg.MIXLY_DISPLAY_MATRIX_Y, "setOffsetY"], [Blockly.Msg.MIXLY_Z_AXIS, "setOffsetZ"]]), "MIXEPI_ADXL345_OFFSET");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

//传感器-MPU6050-获取数据
export const MPU6050 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MPU6050);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_Accel_X, "getAccX()"],
                [Blockly.Msg.MIXLY_Accel_Y, "getAccY()"],
                [Blockly.Msg.MIXLY_Accel_Z, "getAccZ()"],
                [Blockly.Msg.MIXLY_Gyro_X, "getAngleX()"],
                [Blockly.Msg.MIXLY_Gyro_Y, "getAngleY()"],
                [Blockly.Msg.MIXLY_Gyro_Z, "getAngleZ()"],
                [Blockly.Msg.MIXLY_readTempC, "getTemp()"]
            ]), "MPU6050_TYPE");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

//传感器-MPU6050-更新数据
export const MPU6050_update = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MPU6050 + Blockly.Msg.MIXLY_update_data);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

var Encoder_NO = [
    [Blockly.Msg.MIXLY_ENCODER + 1, "1"],
    [Blockly.Msg.MIXLY_ENCODER + 2, "2"],
    [Blockly.Msg.MIXLY_ENCODER + 3, "3"],
    [Blockly.Msg.MIXLY_ENCODER + 4, "4"]
];

//旋转编码器定义
export const encoder_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(Blockly.Msg.MIXLY_ENCODER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
        this.appendDummyInput("")
            .appendField('DT')
            .appendField(new Blockly
                .FieldDropdown(Profile.default.digital), "DT")
            .appendField('CLK')
            .appendField(new Blockly
                .FieldDropdown(Profile.default.digital), "CLK");
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
export const encoder_write = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_VALUE2);
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
export const encoder_read = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ);
        this.setOutput(true, Number);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setInputsInline(true);
    }
};

//旋转编码器定义
export const encoder_init1 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(Blockly.Msg.MIXLY_ENCODER);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
        this.appendDummyInput("")
            .appendField('DT')
            .appendField(new Blockly
                .FieldDropdown(Profile.default.digital), "DT")
            .appendField('CLK')
            .appendField(new Blockly
                .FieldDropdown(Profile.default.digital), "CLK");
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
export const encoder_write1 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_VALUE2);
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
export const encoder_read1 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "Encoder_NO");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ);
        this.setOutput(true, Number);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setInputsInline(true);
    }
};

// 旋转编码器定义
export const sensor_encoder_init = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "TYPE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
            .appendField(new Blockly.FieldDropdown([["1", "2"], ["2", "4"]]), "mode");
        this.appendValueInput("CLK")
            .setCheck(null)
            .appendField("CLK#");
        this.appendValueInput("DT")
            .setCheck(null)
            .appendField("DT#");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 旋转编码器读取
export const sensor_encoder_get = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "TYPE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GPS_LOCATION, "getPosition"],
                [Blockly.Msg.MIXLY_MICROBIT_Direction, "getDirection"],
                [Blockly.Msg.MIXLY_INCREMENT, "getIncrement"],
                [Blockly.Msg.MIXLY_UPPERBOUND, "getUpperBound"],
                [Blockly.Msg.MIXLY_LOWERBOUND, "getLowerBound"]
            ]), "OPERATE_TYPE");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 旋转编码器设置
export const sensor_encoder_set = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "TYPE");
        this.appendValueInput("DATA")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GPS_LOCATION, "resetPosition"],
                [Blockly.Msg.MIXLY_INCREMENT, "setIncrement"],
                [Blockly.Msg.MIXLY_UPPERBOUND, "setUpperBound"],
                [Blockly.Msg.MIXLY_LOWERBOUND, "setLowerBound"]
            ]), "OPERATE_TYPE")
            .appendField(Blockly.Msg.MIXLY_STAT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// 旋转编码器事件
export const sensor_encoder_handle = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Encoder_NO), "TYPE")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ENCODER_CHANGED, "setChangedHandler"],
                [Blockly.Msg.MIXLY_ENCODER_LEFT_ROTATION, "setLeftRotationHandler"],
                [Blockly.Msg.MIXLY_ENCODER_RIGHT_ROTATION, "setRightRotationHandler"],
                [Blockly.Msg.MIXLY_ENCODER_UPPER_OVERFLOW, "setUpperOverflowHandler"],
                [Blockly.Msg.MIXLY_ENCODER_LOWER_OVERFLOW, "setLowerOverflowHandler"]
            ]), "OPERATE_TYPE");
        this.appendStatementInput("DO")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_DO);
        this.setInputsInline(true);
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

const BMX280_VALUE_TYPE = {
    bme: [
        [Blockly.Msg.blynk_IOT_IR_TEMP, "readTemperature()"],
        [Blockly.Msg.MIXLY_Humidity, "readHumidity()"],
        [Blockly.Msg.MIXLY_Altitude, "readPressure()"],
        [Blockly.Msg.MIXLY_HEIGHT, "readAltitude(SEALEVELPRESSURE_HPA)"]
    ],
    bmp: [
        [Blockly.Msg.blynk_IOT_IR_TEMP, "readTemperature()"],
        [Blockly.Msg.MIXLY_Altitude, "readPressure()"],
        [Blockly.Msg.MIXLY_HEIGHT, "readAltitude(SEALEVELPRESSURE_HPA)"]
    ]
};

//BME280读取
export const BME280_READ = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ)
            .appendField(new Blockly.FieldDropdown([["BME280", "bme"], ["BMP280", "bmp"]]), 'TYPE');
        this.appendValueInput("address")
            .appendField(Blockly.Msg.MIXLY_LCD_ADDRESS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDependentDropdown("TYPE", BMX280_VALUE_TYPE, BMX280_VALUE_TYPE['bme']), 'BME_TYPE');
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//PS2
export const PS2_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.PS2);
        this.appendDummyInput("")
            .appendField('DAT#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PS2_DAT")
            .appendField('CMD#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PS2_CMD")
            .appendField('SEL#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PS2_SEL")
            .appendField('CLK#')
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PS2_CLK");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_setRumble)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_ON, "true"], [Blockly.Msg.MIXLY_OFF, "false"]]), "rumble");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setFieldValue("2", "PS2_DAT");
        this.setFieldValue("4", "PS2_CMD");
        this.setFieldValue("5", "PS2_SEL");
        this.setFieldValue("12", "PS2_CLK");
    }
};

export const PS2_update = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2 + Blockly.Msg.MIXLY_update_data);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

var PSBUTTON = [
    [Blockly.Msg.PS2_TRIANGLE, "PSB_GREEN"],
    [Blockly.Msg.PS2_CIRCLE, "PSB_RED"],
    [Blockly.Msg.PS2_CROSS, "PSB_BLUE"],
    [Blockly.Msg.PS2_SQUARE, "PSB_PINK"],
    [Blockly.Msg.PS2_L1, "PSB_L1"],
    [Blockly.Msg.PS2_L2, "PSB_L2"],
    // ["PSB_L3","PSB_L3"],
    [Blockly.Msg.PS2_R1, "PSB_R1"],
    [Blockly.Msg.PS2_R2, "PSB_R2"],
    // ["PSB_R3","PSB_R3"],
    [Blockly.Msg.PS2_UP, "PSB_PAD_UP"],
    [Blockly.Msg.PS2_RIGHT, "PSB_PAD_RIGHT"],
    [Blockly.Msg.PS2_DOWN, "PSB_PAD_DOWN"],
    [Blockly.Msg.PS2_LEFT, "PSB_PAD_LEFT"],
    [Blockly.Msg.PS2_SELECT, "PSB_SELECT"],
    [Blockly.Msg.PS2_START, "PSB_START"]
];

//
export const PS2_Button = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_BUTTON)
            .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_BUTTON_HOLD, "Button"], [Blockly.Msg.MIXLY_BUTTON_PRESSED, "ButtonPressed"], [Blockly.Msg.MIXLY_BUTTON_RELEASED, "ButtonReleased"], [Blockly.Msg.MIXLY_CHANGE, "NewButtonState"]]), "btstate");
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

export const PS2_stk = {
    init: function () {
        this.setColour(SENSOR_HUE);
        var PSSTK = [
            [Blockly.Msg.PS2_RX, "PSS_RX"],
            [Blockly.Msg.PS2_RY, "PSS_RY"],
            [Blockly.Msg.PS2_LX, "PSS_LX"],
            [Blockly.Msg.PS2_LY, "PSS_LY"],
        ];
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_stick)
            .appendField(new Blockly.FieldDropdown(PSSTK), "psstk");
        this.setOutput(true, Number);
        this.setTooltip('');
    }
};

var DF_TCS34725_COLOR = [
    [Blockly.Msg.COLOUR_RGB_RED, "tcs34725.getRedToGamma()"],
    [Blockly.Msg.COLOUR_RGB_GREEN, "tcs34725.getGreenToGamma()"],
    [Blockly.Msg.COLOUR_RGB_BLUE, "tcs34725.getBlueToGamma()"],
];

export const TCS34725_Get_RGB = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.TCS34725_Get_RGB)
            .appendField(new Blockly.FieldDropdown(DF_TCS34725_COLOR), "DF_TCS34725_COLOR");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

//初始化TCS230颜色传感器
export const tcs230_init = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + " TCS230");
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
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//TCS230颜色传感器 获取RGB值
export const tcs230_Get_RGB = {
    init: function () {
        this.appendDummyInput()
            .appendField("TCS230")
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "R"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "G"],
                [Blockly.Msg.COLOUR_RGB_BLUE, "B"]
            ]), "tcs230_color");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const Arduino_keypad_4_4_start = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.MIXLY_Keypad);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldTextInput("KEYPAD_4_4"), "keypad_name");
        this.appendValueInput("keypad_row")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.DATAFRAME_RAW + Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("keypad_col")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.DATAFRAME_COLUMN + Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("keypad_type")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_Keypad_define);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const keypad_row_data = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput("keypad_row_1", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("1#");
        this.appendValueInput("keypad_row_2", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("2#");
        this.appendValueInput("keypad_row_3", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("3#");
        this.appendValueInput("keypad_row_4", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("4#");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const keypad_col_data = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput("keypad_col_1", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("1#");
        this.appendValueInput("keypad_col_2", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("2#");
        this.appendValueInput("keypad_col_3", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("3#");
        this.appendValueInput("keypad_col_4", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("4#");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const keypad_type_data = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField(new Blockly.FieldTextInput("1"), "keypad_1_1")
            .appendField(new Blockly.FieldTextInput("2"), "keypad_1_2")
            .appendField(new Blockly.FieldTextInput("3"), "keypad_1_3")
            .appendField(new Blockly.FieldTextInput("A"), "keypad_1_4");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField(new Blockly.FieldTextInput("4"), "keypad_2_1")
            .appendField(new Blockly.FieldTextInput("5"), "keypad_2_2")
            .appendField(new Blockly.FieldTextInput("6"), "keypad_2_3")
            .appendField(new Blockly.FieldTextInput("B"), "keypad_2_4");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField(new Blockly.FieldTextInput("7"), "keypad_3_1")
            .appendField(new Blockly.FieldTextInput("8"), "keypad_3_2")
            .appendField(new Blockly.FieldTextInput("9"), "keypad_3_3")
            .appendField(new Blockly.FieldTextInput("C"), "keypad_3_4");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField(new Blockly.FieldTextInput("*"), "keypad_4_1")
            .appendField(new Blockly.FieldTextInput("0"), "keypad_4_2")
            .appendField(new Blockly.FieldTextInput("#"), "keypad_4_3")
            .appendField(new Blockly.FieldTextInput("D"), "keypad_4_4");
        this.setOutput(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const get_keypad_num = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("KEYPAD_4_4"), "keypad_name")
            .appendField(Blockly.Msg.MIXLY_Keypad_GETKEY);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const arduino_keypad_event = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_Keypad)
            .appendField(new Blockly.FieldTextInput("KEYPAD_4_4"), "keypad_name");
        this.appendValueInput("keypad_event_input")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_Keypad_EVENT);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL)
            .appendField(new Blockly.FieldTextInput("1000"), "keypad_start_event_delay")
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.appendStatementInput("keypad_event_data")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setInputsInline(false);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

var MixGo_MPU9250_GETAB = [
    [Blockly.Msg.MixGo_MPU9250_AX, "a"],
    [Blockly.Msg.MixGo_MPU9250_AY, "b"],
    [Blockly.Msg.MixGo_MPU9250_AZ, "c"],
    [Blockly.Msg.MixGo_MPU9250_GX, "d"],
    [Blockly.Msg.MixGo_MPU9250_GY, "e"],
    [Blockly.Msg.MixGo_MPU9250_GZ, "f"],
    [Blockly.Msg.MixGo_MPU9250_MX, "g"],
    [Blockly.Msg.MixGo_MPU9250_MY, "h"],
    [Blockly.Msg.MixGo_MPU9250_MZ, "i"]
];

//传感器_重力感应块_获取9轴数据
export const mixgo_MPU9250 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250" + Blockly.Msg.MixGo_MPU9250);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(MixGo_MPU9250_GETAB), "MixGo_MPU9250_GETAB");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
        this.setHelpUrl('');
    }
};

//NTC电阻
export const NTC_TEMP = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("NTC")
            .appendField(Blockly.Msg.MIXLY_TEMP);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendValueInput("NominalResistance")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_NominalResistance);
        this.appendValueInput("betaCoefficient")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_betaCoefficient);
        this.appendValueInput("seriesResistor")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_seriesResistor);
        this.setInputsInline(false);
        this.setOutput(true, Number);
        this.setTooltip();
    }
};

//AHT20/21温湿度传感器
export const AHT20_21 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("AHT20/21" + Blockly.Msg.MIXLY_TEM_HUM)
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_TEMPERATURE, "AHT21.GetTemperature()"],
                [Blockly.Msg.MIXLY_Humidity, "AHT21.GetHumidity()"],
                [Blockly.Msg.MIXLY_DewPoint, "AHT21.GetDewPoint()"]
            ]), "AHT21_TYPE");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip();
    }
};
