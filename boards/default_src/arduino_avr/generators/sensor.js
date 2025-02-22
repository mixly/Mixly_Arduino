import { Profile, JSFuncs } from 'mixly';

export const gps_init = function (_, generator) {
    generator.definitions_['include_TinyGPS++'] = '#include <TinyGPS++.h>';
    generator.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
    var rx = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var tx = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    var bt = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC)
    generator.definitions_['var_declare_TinyGPSPlus_gps'] = 'TinyGPSPlus gps;';
    generator.definitions_['var_declare_SoftwareSerial_gps_ss'] = 'SoftwareSerial gps_ss(' + rx + ', ' + tx + ');';
    generator.setups_['setup_gps_ss_begin'] = 'gps_ss.begin(' + bt + ');';
    return '';
}

export const gps_data_available = function (_, generator) {
    var code = 'gps_ss.available()';
    return [code, generator.ORDER_ATOMIC];
}

export const gps_data_encode = function (_, generator) {
    var code = 'gps.encode(gps_ss.read())';
    return [code, generator.ORDER_ATOMIC];
}

export const gps_xxx_isValid = function (_, generator) {
    var WHAT = this.getFieldValue('WHAT');
    var code = 'gps.' + WHAT + '.isValid()';
    return [code, generator.ORDER_ATOMIC];
}

export const gps_getData_xxx = function (_, generator) {
    var WHAT = this.getFieldValue('WHAT');
    var code = 'gps.' + WHAT + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const chaoshengbo2 = function (_, generator) {
    var Trig = this.getFieldValue('Trig');
    var Echo = this.getFieldValue('Echo');
    generator.setups_['setup_output_' + Trig] = 'pinMode(' + Trig + ', OUTPUT);';
    generator.setups_['setup_output_' + Echo] = 'pinMode(' + Echo + ', INPUT);';
    var funcName = 'checkdistance_' + Trig + '_' + Echo;
    var code = 'float' + ' ' + funcName + '() {\n'
        + '  digitalWrite(' + Trig + ', LOW);\n' + '  delayMicroseconds(2);\n'
        + '  digitalWrite(' + Trig + ', HIGH);\n' + '  delayMicroseconds(10);\n'
        + '  digitalWrite(' + Trig + ', LOW);\n'
        + '  float distance = pulseIn(' + Echo + ', HIGH) / 58.00;\n'
        + '  delay(10);\n' + '  return distance;\n'
        + '}\n';
    generator.definitions_[funcName] = code;
    return [funcName + '()', generator.ORDER_ATOMIC];
}

export const DHT = function (_, generator) {
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = this.getFieldValue('PIN');
    var what = this.getFieldValue('WHAT');
    generator.definitions_['include_DHT'] = '#include <DHT.h>';
    generator.definitions_['var_declare_dht' + dropdown_pin] = 'DHT dht' + dropdown_pin + '(' + dropdown_pin + ', ' + sensor_type + ');'
    generator.setups_['DHT_SETUP' + dropdown_pin] = ' dht' + dropdown_pin + '.begin();';
    var code;
    if (what == "temperature")
        code = 'dht' + dropdown_pin + '.readTemperature()'
    else
        code = 'dht' + dropdown_pin + '.readHumidity()'
    return [code, generator.ORDER_ATOMIC];
}

// LM35 Temperature
export const LM35 = function (_, generator) {
    var board_type = JSFuncs.getPlatform();
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'analogRead(' + dropdown_pin + ')*0.488';
    if (board_type.match(RegExp(/ESP8266/))) {
        var code = 'analogRead(' + dropdown_pin + ')*0.322';
    }
    else if (board_type.match(RegExp(/ESP32/))) {
        var code = 'analogRead(' + dropdown_pin + ')*0.161';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const ds18b20 = function (_, generator) {
    var dropdown_pin = this.getFieldValue('PIN');
    var unit = this.getFieldValue('UNIT');
    generator.definitions_['include_OneWire'] = '#include <OneWire.h>';
    generator.definitions_['include_DallasTemperature'] = '#include <DallasTemperature.h>';
    generator.definitions_['var_declare_OneWire_DallasTemperature_sensors_' + dropdown_pin] = 'OneWire oneWire_' + dropdown_pin + '(' + dropdown_pin + ');\nDallasTemperature sensors_' + dropdown_pin + '(&oneWire_' + dropdown_pin + ');';
    generator.definitions_['var_declare_DeviceAddress_insideThermometer'] = 'DeviceAddress insideThermometer;';
    generator.setups_['setup_sensors_' + dropdown_pin + '_getAddress'] = 'sensors_' + dropdown_pin + '.getAddress(insideThermometer, 0);';
    generator.setups_['setup_sensors_' + dropdown_pin + '_setResolution'] = 'sensors_' + dropdown_pin + '.setResolution(insideThermometer, 9);';
    var funcName = 'ds18b20_' + dropdown_pin + '_getTemp';
    var code = 'float' + ' ' + funcName + '(int w) {\n'
        + '  sensors_' + dropdown_pin + '.requestTemperatures();\n'
        + '  if(w==0) {\n    return sensors_' + dropdown_pin + '.getTempC(insideThermometer);\n  }\n'
        + '  else {\n    return sensors_' + dropdown_pin + '.getTempF(insideThermometer);\n  }\n'
        + '}\n';
    generator.definitions_[funcName] = code;
    return ['ds18b20_' + dropdown_pin + '_getTemp(' + unit + ')', generator.ORDER_ATOMIC];
}

// 初始化MLX90614红外测温传感器
export const mlx90614_init = function (_, generator) {
    var value_mlx90614_address = generator.valueToCode(this, 'mlx90614_address', generator.ORDER_ATOMIC);
    var text_mlx90614_name = 'MLX';
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_Adafruit_MLX90614'] = '#include <Adafruit_MLX90614.h>';
    generator.definitions_['var_declare_MLX90614_' + text_mlx90614_name] = 'Adafruit_MLX90614 ' + text_mlx90614_name + ' = Adafruit_MLX90614(' + value_mlx90614_address + ');';
    generator.setups_['setup_MLX90614_' + text_mlx90614_name] = '' + text_mlx90614_name + '.begin();';
    var code = '';
    return code;
}

// MLX90614获取数据
export const mlx90614_get_data = function (_, generator) {
    var text_mlx90614_name = 'MLX';
    var dropdown_mlx90614_data = this.getFieldValue('mlx90614_data');
    var code = '' + text_mlx90614_name + '.' + dropdown_mlx90614_data + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const weightSensor = function (_, generator) {
    var DOUT = this.getFieldValue('DOUT');
    var SCK = this.getFieldValue('SCK');
    var scale = generator.valueToCode(this, 'scale', generator.ORDER_ATOMIC);
    generator.definitions_['include_Hx711'] = '#include <Hx711.h>';
    generator.definitions_['var_declare_Hx711' + DOUT + SCK] = 'Hx711 scale' + DOUT + '_' + SCK + "(" + DOUT + "," + SCK + ");";
    generator.setups_['setup_HX711' + DOUT + SCK] = 'scale' + DOUT + '_' + SCK + '.setOffset(scale' + DOUT + '_' + SCK + '.getAverageValue(30));';
    generator.setups_['setup_' + 'scale' + DOUT + '_' + SCK + ' .setScale'] = 'scale' + DOUT + '_' + SCK + '.setScale(' + scale + ');';
    var code = 'scale' + DOUT + '_' + SCK + '.getWeight(10)';
    return [code, generator.ORDER_ATOMIC];
}

// DS1302
export const DS1302_init = function (_, generator) {
    var dropdown_rst = generator.valueToCode(this, 'RST', generator.ORDER_ATOMIC);
    var dropdown_dat = generator.valueToCode(this, 'DAT', generator.ORDER_ATOMIC);
    var dropdown_clk = generator.valueToCode(this, 'CLK', generator.ORDER_ATOMIC);
    generator.definitions_['include_ThreeWire'] = '#include <ThreeWire.h>';
    generator.definitions_['include_RtcDS1302'] = '#include <RtcDS1302.h>';
    //generator.definitions_['var_declare_RtcDateTime_dt'] = 'const RtcDateTime dt;';
    generator.definitions_['var_declare_ThreeWire'] = 'ThreeWire ' + 'myWire(' + dropdown_dat + ',' + dropdown_clk + ',' + dropdown_rst + ');';
    generator.definitions_['var_declare_RtcDS1302'] = 'RtcDS1302<ThreeWire> Rtc(myWire);';
    generator.setups_['setup_Rtc.Begin'] = 'Rtc.Begin();\n  Rtc.SetIsRunning(true);';
    return "";
}

export const DS1307_init = function (_, generator) {
    var SDA = generator.valueToCode(this, 'SDA', generator.ORDER_ATOMIC);
    var SCL = generator.valueToCode(this, 'SCL', generator.ORDER_ATOMIC);
    var RTCType = this.getFieldValue('RTCType');
    generator.definitions_['include_' + RTCType] = '#include <' + RTCType + '.h>';
    //generator.definitions_['var_declare_RtcDateTime_dt'] = 'const RtcDateTime dt;';
    if (SDA != Profile.default.SDA[0][1] || SCL != Profile.default.SCL[0][1]) {
        generator.definitions_['include_SoftwareWire'] = '#include <SoftwareWire.h>';
        generator.definitions_['var_declare_SoftwareWire'] = 'SoftwareWire myWire(' + SDA + ',' + SCL + ');';
        generator.definitions_['var_declare_' + RTCType] = RTCType + '<SoftwareWire> Rtc(myWire);';
    }
    else {
        generator.definitions_['include_Wire'] = '#include <Wire.h>';
        generator.definitions_['var_declare_' + RTCType] = RTCType + '<TwoWire> Rtc(Wire);';
    }
    generator.setups_['setup_Rtc.Begin'] = 'Rtc.Begin();\n  Rtc.SetIsRunning(true);';
    return "";
}

export const RTC_get_time = function (_, generator) {
    var timeType = this.getFieldValue('TIME_TYPE');
    var code = 'Rtc.GetDateTime().' + timeType + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const RTC_date = function (_, generator) {
    var year = generator.valueToCode(this, "year", generator.ORDER_ATOMIC);
    var month = generator.valueToCode(this, "month", generator.ORDER_ATOMIC);
    var day = generator.valueToCode(this, "day", generator.ORDER_ATOMIC);

    switch (month) {
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
    if (day.length == 1)
        day = '0' + day;
    var code = '"' + month + '/' + day + '/' + year + '"';
    return [code, generator.ORDER_ATOMIC];
}

export const RTC_time = function (_, generator) {
    var hour = generator.valueToCode(this, "hour", generator.ORDER_ATOMIC);
    var minute = generator.valueToCode(this, "minute", generator.ORDER_ATOMIC);
    var second = generator.valueToCode(this, "second", generator.ORDER_ATOMIC);
    if (hour.length == 1)
        hour = '0' + hour;
    if (minute.length == 1)
        minute = '0' + minute;
    if (second.length == 1)
        second = '0' + second;
    var code = '"' + hour + ':' + minute + ':' + second + '"';
    return [code, generator.ORDER_ATOMIC];
}

// 设置时间
export const RTC_set_time = function (_, generator) {
    var value_date = generator.valueToCode(this, 'date', generator.ORDER_ATOMIC);
    var value_time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var code = '';
    code = 'Rtc.SetDateTime(RtcDateTime(' + value_date + ', ' + value_time + '));\n';
    return code;
}

// 获取烧录时间和日期
export const get_system_date_time = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    var code = '__' + dropdown_type + '__';
    return [code, generator.ORDER_ATOMIC];
}

export const RTC_set_date = function () {
    const now = new Date();
    const year = now.getFullYear(); // 年
    const month = now.getMonth() + 1; // 月
    const day = now.getDate(); // 日
    var RTCName = "myRTC";
    var code = RTCName + '.setDate(' + year + ',' + month + ',' + day + ');\n';
    code += RTCName + '.setDOW(' + year + ',' + month + ',' + day + ');\n';
    return code;
}

// 传感器_sht20
export const SHT20 = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_DFRobot_SHT20'] = '#include <DFRobot_SHT20.h>';
    generator.definitions_['var_declare_DFRobot_SHT20'] = 'DFRobot_SHT20 sht20;\n';
    generator.setups_['setup_sht20initSHT20'] = 'sht20.initSHT20();';
    generator.setups_['setup_sht20.checkSHT20'] = 'sht20.checkSHT20(); \n';
    var dropdown_type = this.getFieldValue('SHT20_TYPE');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// 传感器_重力感应块
export const ADXL345 = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
    generator.definitions_['include_ADXL345'] = '#include <ADXL345.h>';
    generator.definitions_['var_declare_ADXL345'] = 'ADXL345 accel;\n';
    generator.setups_['setup_Wire.begin'] = 'Wire.begin();';
    generator.setups_['setup_accel.begin'] = 'accel.initialize(); \n';
    var dropdown_type = this.getFieldValue('ADXL345_PIN');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// 传感器_重力感应块
export const LIS3DHTR = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_LIS3DHTR'] = '#include <LIS3DHTR.h>';
    generator.definitions_['include_define_Wire'] = '#define WIRE  Wire';
    generator.definitions_['var_declare_LIS3DHTR'] = 'LIS3DHTR<TwoWire> LIS;\n';
    generator.setups_['setup_LIS.begin'] = 'LIS.begin(WIRE,0x19);\n';
    generator.setups_['setup_LIS.openTemp'] = 'LIS.openTemp();';
    generator.setups_['setup_LIS.setFullScaleRange'] = 'LIS.setFullScaleRange(LIS3DHTR_RANGE_2G);';
    generator.setups_['setup_LIS.setOutputDataRate'] = 'LIS.setOutputDataRate(LIS3DHTR_DATARATE_50HZ);';
    var dropdown_type = this.getFieldValue('LIS3DHTR_GETDATA');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// 传感器_重力感应块
export const ADXL345_setOffset = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
    generator.definitions_['include_ADXL345'] = '#include <ADXL345.h>';
    generator.definitions_['var_declare_ADXL345'] = 'ADXL345 accel;\n';
    generator.setups_['setup_Wire.begin'] = 'Wire.begin();';
    generator.setups_['setup_accel.begin'] = 'accel.initialize(); \n';

    var dropdown_type = this.getFieldValue('MIXEPI_ADXL345_OFFSET');
    var offset_value = generator.valueToCode(this, 'OFFSET', generator.ORDER_ATOMIC);
    var code;

    if (dropdown_type == "setOffsetX") {
        code = 'accel.setOffsetX(round(' + offset_value + '*4/15.9));\n';
    } else if (dropdown_type == "setOffsetY") {
        code = 'accel.setOffsetY(round(' + offset_value + '*4/15.9));\n';
    } else if (dropdown_type == "setOffsetZ") {
        code = 'accel.setOffsetZ(round(' + offset_value + '*4/15.9));\n';
    }

    return code;
}

// 传感器-MPU6050-获取数据
export const MPU6050 = function (_, generator) {
    generator.definitions_['include_MPU6050_tockn'] = '#include <MPU6050_tockn.h>';
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['var_declare_mpu6050'] = 'MPU6050 mpu6050(Wire);';
    generator.setups_['setup_ngyro'] = 'Wire.begin();\n  mpu6050.begin();\n  mpu6050.calcGyroOffsets(true);';
    var MPU6050_TYPE = this.getFieldValue('MPU6050_TYPE');
    var code = 'mpu6050.' + MPU6050_TYPE;
    return [code, generator.ORDER_ATOMIC];
}

// 传感器-MPU6050-更新数据
export const MPU6050_update = function () {
    var code = 'mpu6050.update();\n';
    return code;
}

//旋转编码器写
export const encoder_write = function (_, generator) {
    var Encoder_NO = this.getFieldValue('Encoder_NO');
    var value = generator.valueToCode(this, 'value', generator.ORDER_ATOMIC);
    var code = 'encoder_' + Encoder_NO + '.write(' + value + ');\n ';
    return code;
}

//旋转编码器读值
export const encoder_read = function (_, generator) {
    var Encoder_NO = this.getFieldValue('Encoder_NO');
    var code = 'encoder_' + Encoder_NO + '.read()';
    return [code, generator.ORDER_ATOMIC];
}

//旋转编码管脚定义
export const encoder_init = function (_, generator) {
    var CLK = this.getFieldValue('CLK');
    var DT = this.getFieldValue('DT');
    var Encoder_NO = this.getFieldValue('Encoder_NO');
    generator.definitions_['include_Encoder'] = '#include <Encoder.h>\n';
    generator.definitions_['var_declare_Encoder_' + Encoder_NO] = 'Encoder encoder_' + Encoder_NO + '(' + CLK + ',' + DT + ');\n ';
    var code = '';
    return code;
}

//旋转编码器写
export const encoder_write1 = function (_, generator) {
    var Encoder_NO = this.getFieldValue('Encoder_NO');
    var value = generator.valueToCode(this, 'value', generator.ORDER_ATOMIC);
    var code = 'encoder_counter_' + Encoder_NO + ' = ' + value + ';\n ';
    return code;
}

//旋转编码器读值
export const encoder_read1 = function (_, generator) {
    var Encoder_NO = this.getFieldValue('Encoder_NO');
    var code = 'encoder_counter_' + Encoder_NO + '';
    return [code, generator.ORDER_ATOMIC];
}

//旋转编码管脚定义
export const encoder_init1 = function (_, generator) {
    var CLK = this.getFieldValue('CLK');
    var DT = this.getFieldValue('DT');
    var Encoder_NO = this.getFieldValue('Encoder_NO');
    generator.definitions_['var_declare_Encoder_' + Encoder_NO + ''] = 'int encoder_counter_' + Encoder_NO + ' = 0;\n'
        + 'int encoder_aState_' + Encoder_NO + ';\n'
        + 'int encoder_aLastState_' + Encoder_NO + ';\n'
    generator.setups_['setups_encoder_' + Encoder_NO + ''] = '  pinMode (' + CLK + ', INPUT);\n'
        + '  pinMode (' + DT + ', INPUT);\n'
        + '  encoder_aLastState_' + Encoder_NO + ' = digitalRead(' + CLK + ');\n'
    var code = '  encoder_aState_' + Encoder_NO + ' = digitalRead(' + CLK + ');\n'
        + '  if (encoder_aState_' + Encoder_NO + ' != encoder_aLastState_' + Encoder_NO + ') {\n'
        + '    if (digitalRead(' + DT + ') != encoder_aState_' + Encoder_NO + ') {\n'
        + '      encoder_counter_' + Encoder_NO + ' ++;\n'
        + '    } else {\n'
        + '      encoder_counter_' + Encoder_NO + ' --;\n'
        + '    }\n'
        + '  }\n'
        + '  encoder_aLastState_' + Encoder_NO + ' = encoder_aState_' + Encoder_NO + ';\n';
    return code;
}

// 旋转编码器初始化
export const sensor_encoder_init = function (_, generator) {
    var dropdownType = this.getFieldValue('TYPE');
    var mode = this.getFieldValue('mode');
    var valueClk = generator.valueToCode(this, 'CLK', generator.ORDER_ATOMIC);
    var valueDt = generator.valueToCode(this, 'DT', generator.ORDER_ATOMIC);
    generator.definitions_['include_ESPRotary'] = '#include <ESPRotary.h>';
    generator.definitions_['var_declare_encoder' + dropdownType] = `ESPRotary encoder${dropdownType};`;
    generator.setups_['setup_encoder' + dropdownType] = `encoder${dropdownType}.begin(${valueDt}, ${valueClk});\n  encoder${dropdownType}.setStepsPerClick(${mode});`;
    generator.loops_begin_['loop_encoder' + dropdownType] = `encoder${dropdownType}.loop();\n`;
    return '';
}

// 旋转编码器读取
export const sensor_encoder_get = function (_, generator) {
    var dropdownType = this.getFieldValue('TYPE');
    var dropdownOperateType = this.getFieldValue('OPERATE_TYPE');
    var code = `encoder${dropdownType}.${dropdownOperateType}()`;
    return [code, generator.ORDER_ATOMIC];
}

// 旋转编码器设置
export const sensor_encoder_set = function (_, generator) {
    var dropdownType = this.getFieldValue('TYPE');
    var valueData = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC);
    var dropdownOperateType = this.getFieldValue('OPERATE_TYPE');
    var code = `encoder${dropdownType}.${dropdownOperateType}(${valueData});\n`;
    return code;
}

// 旋转编码器事件
export const sensor_encoder_handle = function (_, generator) {
    var dropdownType = this.getFieldValue('TYPE');
    var dropdownOperateType = this.getFieldValue('OPERATE_TYPE');
    var statementsDo = generator.statementToCode(this, 'DO');
    var cbFuncName = 'encoder' + dropdownType;
    switch (dropdownOperateType) {
        case 'setChangedHandler':
            cbFuncName += 'OnChanged';
            break;
        case 'setRightRotationHandler':
            cbFuncName += 'OnRightRotation';
            break;
        case 'setLeftRotationHandler':
            cbFuncName += 'OnLeftRotation';
            break;
        case 'setUpperOverflowHandler':
            cbFuncName += 'OnUpperOverflow';
            break;
        case 'setLowerOverflowHandler':
        default:
            cbFuncName += 'OnLowerOverflow';
    }
    generator.definitions_['function_' + cbFuncName] = `void ${cbFuncName}(ESPRotary& encoder${dropdownType}) {\n`
        + `  ${statementsDo}`
        + `}\n`;
    generator.setups_['setup_' + cbFuncName] = `encoder${dropdownType}.${dropdownOperateType}(${cbFuncName});`;
    var code = '';
    return code;
}

//BME280读取
export const BME280_READ = function (_, generator) {
    var TYPE = this.getFieldValue('TYPE');
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_SPI'] = '#include <SPI.h>';
    generator.definitions_['include_Adafruit_Sensor'] = '#include <Adafruit_Sensor.h>';
    if (TYPE == "bme") {
        generator.definitions_['include_Adafruit_BME280'] = '#include <Adafruit_BME280.h>';
        generator.definitions_['var_declare_Adafruit_BME280'] = 'Adafruit_BME280 bme;';
    }
    else {
        generator.definitions_['include_Adafruit_BMP280'] = '#include <Adafruit_BMP280.h>';
        generator.definitions_['var_declare_Adafruit_BMP280'] = 'Adafruit_BMP280 bmp;';
    }
    generator.setups_['setup_status'] = 'unsigned status;\n  status = ' + TYPE + '.begin(' + address + ');';
    generator.definitions_['include_SEALEVELPRESSURE_HPA'] = '#define SEALEVELPRESSURE_HPA (1013.25)';
    var code = this.getFieldValue('BME_TYPE');
    return [TYPE + "." + code, generator.ORDER_ATOMIC];
}

export const PS2_init = function (_, generator) {
    generator.definitions_['include_PS2X_lib'] = '#include <PS2X_lib.h>';
    generator.definitions_['var_declare_PS2X'] = 'PS2X ps2x;';
    var PS2_DAT = this.getFieldValue('PS2_DAT');
    var PS2_CMD = this.getFieldValue('PS2_CMD');
    var PS2_SEL = this.getFieldValue('PS2_SEL');
    var PS2_CLK = this.getFieldValue('PS2_CLK');
    var rumble = this.getFieldValue('rumble');

    generator.setups_['setup_ps2x_config_gamepad'] = 'ps2x.config_gamepad(' + PS2_CLK + ',' + PS2_CMD + ',' + PS2_SEL + ',' + PS2_DAT + ', true, ' + rumble + ');\n  delay(300);\n';
    return "";
}

export const PS2_update = function () {
    var code = 'ps2x.read_gamepad(false, 0);\ndelay(30);\n';
    return code;
}

export const PS2_Button = function (_, generator) {
    var bt = this.getFieldValue('psbt');
    var btstate = this.getFieldValue('btstate');
    var code = "ps2x." + btstate + "(" + bt + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const PS2_stk = function (_, generator) {
    var stk = this.getFieldValue('psstk');
    var code = "ps2x.Analog(" + stk + ")";
    return [code, generator.ORDER_ATOMIC];
}

// 改用DF TCS34725 颜色识别传感器库
export const TCS34725_Get_RGB = function (_, generator) {
    generator.definitions_['include_DFRobot_TCS34725'] = '#include <DFRobot_TCS34725.h>';
    generator.definitions_['var_declare_TCS34725'] = 'DFRobot_TCS34725 tcs34725;\n';
    // generator.setups_['setup_DFRobot_TCS34725' ] = 'if (tcs34725.begin()) {\n  Serial.println("Found sensor");\n} \nelse { \nSerial.println("No TCS34725 found ... check your connections");\nwhile (1);\n}';
    generator.setups_['setup_DFRobot_TCS34725'] = 'tcs34725.begin();';
    var RGB = this.getFieldValue('DF_TCS34725_COLOR');
    return [RGB, generator.ORDER_ATOMIC];
}

// 初始化TCS230颜色传感器
export const tcs230_init = function (_, generator) {
    var value_tcs230_s0 = generator.valueToCode(this, 'tcs230_s0', generator.ORDER_ATOMIC);
    var value_tcs230_s1 = generator.valueToCode(this, 'tcs230_s1', generator.ORDER_ATOMIC);
    var value_tcs230_s2 = generator.valueToCode(this, 'tcs230_s2', generator.ORDER_ATOMIC);
    var value_tcs230_s3 = generator.valueToCode(this, 'tcs230_s3', generator.ORDER_ATOMIC);
    var value_tcs230_led = generator.valueToCode(this, 'tcs230_led', generator.ORDER_ATOMIC);
    var value_tcs230_out = generator.valueToCode(this, 'tcs230_out', generator.ORDER_ATOMIC);

    generator.definitions_['define_tcs230_pin'] = '#define tcs230_S0 ' + value_tcs230_s0 + ''
        + '\n#define tcs230_S1 ' + value_tcs230_s1 + ''
        + '\n#define tcs230_S2 ' + value_tcs230_s2 + ''
        + '\n#define tcs230_S3 ' + value_tcs230_s3 + ''
        + '\n#define tcs230_sensorOut ' + value_tcs230_out + ''
        + '\n#define tcs230_LED ' + value_tcs230_led + '';

    generator.definitions_['function_tcs230_Getcolor'] = '//TCS230颜色传感器获取RGB值'
        + '\nint tcs230_Getcolor(char data)'
        + '\n{'
        + '\n  int frequency = 0;'
        + '\n  switch(data)'
        + '\n  {'
        + '\n    case \'R\':'
        + '\n    {'
        + '\n      digitalWrite(tcs230_S2,LOW);'
        + '\n      digitalWrite(tcs230_S3,LOW);'
        + '\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
        + '\n      frequency = map(frequency, 25, 72, 255, 0);'
        + '\n      break;'
        + '\n    }'
        + '\n    case \'G\':'
        + '\n    {'
        + '\n      digitalWrite(tcs230_S2,HIGH);'
        + '\n      digitalWrite(tcs230_S3,HIGH);'
        + '\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
        + '\n      frequency = map(frequency, 30, 90, 255, 0);'
        + '\n      break;'
        + '\n    }'
        + '\n    case \'B\':'
        + '\n    {'
        + '\n      digitalWrite(tcs230_S2,LOW);'
        + '\n      digitalWrite(tcs230_S3,HIGH);'
        + '\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
        + '\n      frequency = map(frequency, 25, 70, 255, 0);'
        + '\n      break;'
        + '\n    }'
        + '\n    default:'
        + '\n      return -1;'
        + '\n  }'
        + '\n  if (frequency < 0)'
        + '\n    frequency = 0;'
        + '\n  if (frequency > 255)'
        + '\n    frequency = 255;'
        + '\n  return frequency;'
        + '\n}\n';

    generator.setups_['setup_tcs230_pin'] = 'pinMode(tcs230_S0, OUTPUT);'
        + '\n  pinMode(tcs230_S1, OUTPUT);'
        + '\n  pinMode(tcs230_S2, OUTPUT);'
        + '\n  pinMode(tcs230_S3, OUTPUT);'
        + '\n  pinMode(tcs230_LED, OUTPUT);'
        + '\n  pinMode(tcs230_sensorOut, INPUT);'
        + '\n  digitalWrite(tcs230_S0,HIGH);'
        + '\n  digitalWrite(tcs230_S1,LOW);'
        + '\n  digitalWrite(tcs230_LED,HIGH);';
    var code = '';
    return code;
}

// TCS230颜色传感器 获取RGB值
export const tcs230_Get_RGB = function (_, generator) {
    var dropdown_tcs230_color = this.getFieldValue('tcs230_color');
    var code = 'tcs230_Getcolor(\'' + dropdown_tcs230_color + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const Arduino_keypad_4_4_start = function (_, generator) {
    var text_keypad_name = this.getFieldValue('keypad_name');
    var text_keypad_row = generator.valueToCode(this, 'keypad_row', generator.ORDER_ATOMIC);
    var text_keypad_col = generator.valueToCode(this, 'keypad_col', generator.ORDER_ATOMIC);
    var text_keypad_type = generator.valueToCode(this, 'keypad_type', generator.ORDER_ATOMIC);
    generator.definitions_['include_Keypad'] = '#include <Keypad.h>';
    generator.definitions_['var_keypadstart1' + text_keypad_name] = 'const byte ' + text_keypad_name + '_ROWS = 4;';
    generator.definitions_['var_keypadstart2' + text_keypad_name] = 'const byte ' + text_keypad_name + '_COLS = 4;';
    generator.definitions_['var_keypadstart3' + text_keypad_name] = 'char ' + text_keypad_name + '_hexaKeys[' + text_keypad_name + '_ROWS][' + text_keypad_name + '_COLS] = {' + '\n' + text_keypad_type + '\n};';
    generator.definitions_['var_keypadstart4' + text_keypad_name] = 'byte ' + text_keypad_name + '_rowPins[' + text_keypad_name + '_ROWS] = ' + text_keypad_row;
    generator.definitions_['var_keypadstart5' + text_keypad_name] = 'byte ' + text_keypad_name + '_colPins[' + text_keypad_name + '_COLS] = ' + text_keypad_col;
    generator.definitions_['var_keypadstart6' + text_keypad_name] = 'Keypad ' + text_keypad_name + ' = Keypad(makeKeymap(' + text_keypad_name + '_hexaKeys), ' + text_keypad_name + '_rowPins, ' + text_keypad_name + '_colPins, ' + text_keypad_name + '_ROWS, ' + text_keypad_name + '_COLS);';
    generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    var code = '';
    return code;
}

export const keypad_row_data = function (_, generator) {
    var pin_keypad_row_1 = generator.valueToCode(this, 'keypad_row_1', generator.ORDER_ATOMIC);
    var pin_keypad_row_2 = generator.valueToCode(this, 'keypad_row_2', generator.ORDER_ATOMIC);
    var pin_keypad_row_3 = generator.valueToCode(this, 'keypad_row_3', generator.ORDER_ATOMIC);
    var pin_keypad_row_4 = generator.valueToCode(this, 'keypad_row_4', generator.ORDER_ATOMIC);
    var code = '{' + pin_keypad_row_1 + ', ' + pin_keypad_row_2 + ', ' + pin_keypad_row_3 + ', ' + pin_keypad_row_4 + '};';
    return [code, generator.ORDER_ATOMIC];
}

export const keypad_col_data = function (_, generator) {
    var pin_keypad_col_1 = generator.valueToCode(this, 'keypad_col_1', generator.ORDER_ATOMIC);
    var pin_keypad_col_2 = generator.valueToCode(this, 'keypad_col_2', generator.ORDER_ATOMIC);
    var pin_keypad_col_3 = generator.valueToCode(this, 'keypad_col_3', generator.ORDER_ATOMIC);
    var pin_keypad_col_4 = generator.valueToCode(this, 'keypad_col_4', generator.ORDER_ATOMIC);
    var code = '{' + pin_keypad_col_1 + ', ' + pin_keypad_col_2 + ', ' + pin_keypad_col_3 + ', ' + pin_keypad_col_4 + '};';
    return [code, generator.ORDER_ATOMIC];
}

export const keypad_type_data = function (_, generator) {
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
        '  {\'' + text_keypad_1_1 + '\',\'' + text_keypad_1_2 + '\',\'' + text_keypad_1_3 + '\',\'' + text_keypad_1_4 + '\'},' +
        '\n  {\'' + text_keypad_2_1 + '\',\'' + text_keypad_2_2 + '\',\'' + text_keypad_2_3 + '\',\'' + text_keypad_2_4 + '\'},' +
        '\n  {\'' + text_keypad_3_1 + '\',\'' + text_keypad_3_2 + '\',\'' + text_keypad_3_3 + '\',\'' + text_keypad_3_4 + '\'},' +
        '\n  {\'' + text_keypad_4_1 + '\',\'' + text_keypad_4_2 + '\',\'' + text_keypad_4_3 + '\',\'' + text_keypad_4_4 + '\'}';
    return [code, generator.ORDER_ATOMIC];
}

export const get_keypad_num = function (_, generator) {
    var text_keypad_name = this.getFieldValue('keypad_name');
    var code = '' + text_keypad_name + '.getKey()';
    return [code, generator.ORDER_ATOMIC];
}

export const arduino_keypad_event = function (_, generator) {
    var text_keypad_name = this.getFieldValue('keypad_name');
    var value_keypad_event_input = generator.valueToCode(this, 'keypad_event_input', generator.ORDER_ATOMIC);
    var text_keypad_start_event_delay = this.getFieldValue('keypad_start_event_delay');
    var statements_keypad_event_data = generator.statementToCode(this, 'keypad_event_data');

    generator.definitions_['define_variate_' + value_keypad_event_input] = 'volatile char ' + value_keypad_event_input + ';';
    generator.definitions_['var_keypadstart7_event' + text_keypad_name] = 'void keypadEvent_' + text_keypad_name + '(KeypadEvent ' + value_keypad_event_input + ') {' +
        '\n' + statements_keypad_event_data +
        '\n}';
    generator.setups_['setup_keypad_event_and_delay' + text_keypad_name] = text_keypad_name + '.addEventListener(keypadEvent_' + text_keypad_name + ');' +
        '\n  ' + text_keypad_name + '.setHoldTime(' + text_keypad_start_event_delay + ');';

    var code = '';
    return code;
}

//传感器_重力感应块_获取9轴数据
export const mixgo_MPU9250 = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_FaBo9Axis_MPU9250'] = '#include <FaBo9Axis_MPU9250.h>';
    generator.definitions_['var_declare_FaBo9Axis'] = 'FaBo9Axis fabo_9axis;\n float ax,ay,az,gx,gy,gz,mx,my,mz;';
    generator.setups_['setup_fabo_9axis'] = 'fabo_9axis.begin();';
    var dropdown_type = this.getFieldValue('MixGo_MPU9250_GETAB');
    var code = '';
    if (dropdown_type == "a") code += 'fabo_9axis.readAccelX()';
    if (dropdown_type == "b") code += 'fabo_9axis.readAccelY()';
    if (dropdown_type == "c") code += 'fabo_9axis.readAccelZ()';
    if (dropdown_type == "d") code += 'fabo_9axis.readGyroX()';
    if (dropdown_type == "e") code += 'fabo_9axis.readGyroY()';
    if (dropdown_type == "f") code += 'fabo_9axis.readGyroZ()';
    if (dropdown_type == "g") code += 'fabo_9axis.readMagnetX()';
    if (dropdown_type == "h") code += 'fabo_9axis.readMagnetY()';
    if (dropdown_type == "i") code += 'fabo_9axis.readMagnetZ()';
    return [code, generator.ORDER_ATOMIC];
}

export const NTC_TEMP = function (_, generator) {
    var PIN = this.getFieldValue('PIN');
    var NominalResistance = generator.valueToCode(this, 'NominalResistance', generator.ORDER_ATOMIC);
    var betaCoefficient = generator.valueToCode(this, 'betaCoefficient', generator.ORDER_ATOMIC);
    var seriesResistor = generator.valueToCode(this, 'seriesResistor', generator.ORDER_ATOMIC);
    generator.definitions_['include_thermistor'] = '#include <thermistor.h>';
    generator.definitions_['var_declare_thermistor' + PIN] = 'THERMISTOR thermistor' + PIN + '(' + PIN + ',' + NominalResistance + "," + betaCoefficient + "," + seriesResistor + ");";
    var code = 'thermistor' + PIN + '.read()';
    return [code, generator.ORDER_ATOMIC];
}

// AHT20/21温湿度传感器
export const AHT20_21 = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_RL_AHT21'] = '#include <RL_AHT21.h>';
    generator.definitions_['var_declare_AHT21'] = 'AHT21Class AHT21;\n';
    generator.setups_['setup_Wire.begin'] = 'Wire.begin();';
    generator.setups_['setup_AHT21.begin'] = 'AHT21.begin();\n';
    var dropdown_type = this.getFieldValue('AHT21_TYPE');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}