import { Boards } from 'mixly';

export const sensor_mixgo_extern_button_is_pressed = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').is_pressed(' + dropdown_stat + ')';
    return [code, generator.ORDER_ATOMIC];
}

//ok
export const sensor_mixgo_extern_button_was_pressed = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').was_pressed(' + dropdown_stat + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_button_get_presses = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'mixgo.Button(' + pin + ').get_presses(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_button_attachInterrupt = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = 'mixgo.Button(' + pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
}

export const sensor_mpu9250_attachGestureInterrupt = function (_, generator) {
    generator.definitions_['import_mpu9250'] = 'import mpu9250';
    generator.definitions_['import_machine'] = 'import machine';
    var gesture = this.getFieldValue('gesture');
    var branch = generator.statementToCode(this, 'DO');
    var d = branch || generator.PASS;
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "mpu")
        generator.definitions_['import_mixgo_mpu'] = 'from mixgo import mpu';
    var code = 'if ' + v + '.mpu9250_is_gesture("' + gesture + '"):\n' + d;
    return code;
}

export const sensor_distance_hrsc04 = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    generator.setups_['class_hrsc04'] =
        'class HCSR04:\n' +
        '    def __init__(self, tpin=pin15, epin=pin14, spin=pin13):\n' +
        '        self.trigger_pin = tpin\n' +
        '        self.echo_pin = epin\n' +
        '        self.sclk_pin = spin\n' +
        '\n' +
        '    def distance_mm(self):\n' +
        '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n' +
        '                 mosi=self.trigger_pin, miso=self.echo_pin)\n' +
        '        pre = 0\n' +
        '        post = 0\n' +
        '        k = -1\n' +
        '        length = 500\n' +
        '        resp = bytearray(length)\n' +
        '        resp[0] = 0xFF\n' +
        '        spi.write_readinto(resp, resp)\n' +
        '        # find first non zero value\n' +
        '        try:\n' +
        '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n' +
        '        except StopIteration:\n' +
        '            i = -1\n' +
        '        if i > 0:\n' +
        '            pre = bin(value).count("1")\n' +
        '            # find first non full high value afterwards\n' +
        '            try:\n' +
        '                k, value = next((ind, v)\n' +
        '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n' +
        '                post = bin(value).count("1") if k else 0\n' +
        '                k = k + i\n' +
        '            except StopIteration:\n' +
        '                i = -1\n' +
        '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n' +
        '        return dist\n' +
        '\n' +
        'sonar=HCSR04()\n'
    return ['sonar.distance_mm()/10.0', generator.ORDER_ATOMIC];
}

export const RTC_set_time = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var hour = generator.valueToCode(this, "hour", generator.ORDER_ASSIGNMENT);
    var minute = generator.valueToCode(this, "minute", generator.ORDER_ASSIGNMENT);
    var second = generator.valueToCode(this, "second", generator.ORDER_ASSIGNMENT);
    generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;
    var code = 'str(ds.Hour(' + hour + '))+ str(ds.Minute(' + minute + ')) +str(ds.Second(' + second + '))\n';
    return code;
}

export const RTC_set_date = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var year = generator.valueToCode(this, "year", generator.ORDER_ASSIGNMENT);
    var month = generator.valueToCode(this, "month", generator.ORDER_ASSIGNMENT);
    var day = generator.valueToCode(this, "day", generator.ORDER_ASSIGNMENT);
    generator.setups_['class_DS1307'] = generator.CLASS_DS1307_INIT;
    var code = 'str(ds.Year(' + year + '))+ str(ds.Month(' + month + ')) +str(ds.Day(' + day + '))\n';
    return code;
}

export const sensor_mixgo_extern_light = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'mixgo.get_brightness(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_sound = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'mixgo.get_soundlevel(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_extern_pin_near = function (_, generator) {
    generator.definitions_['import_mixgo'] = 'import mixgo';
    var direction = this.getFieldValue('direction');
    var code = 'mixgo.' + 'infrared_' + direction + '.near()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_rtc_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_machine'] = 'import machine';
    var code = v + ' = machine.RTC()\n';
    return code;
}

export const sensor_bmp = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_bmp280'] = 'import bmp280';
    var code = v + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_sht = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_sht20'] = 'import sht20';
    var code = v + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

//pe
export const sensor_use_i2c_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code;
    if (key == 'MPU9250') {
        generator.definitions_['import_mpu9250'] = 'import mpu9250';
        code = v + ' = mpu9250.' + key + "(" + iv + ')\n';
    } else if (key == 'BMP280') {
        generator.definitions_['import_bmp280'] = 'import bmp280';
        code = v + ' = bmp280.' + key + "(" + iv + ')\n';
    } else if (key == 'SHT20') {
        generator.definitions_['import_sht20'] = 'import sht20';
        code = v + ' = sht20.' + key + "(" + iv + ')\n';
    } else if (key == 'ADXL345') {
        generator.definitions_['import_adxl345'] = 'import adxl345';
        code = v + ' = adxl345.' + key + "(" + iv + ')\n';
    } else if (key == 'LTR308') {
        generator.definitions_['import_ltr308al'] = 'import ltr308al';
        code = v + ' = ltr308al.LTR_308ALS(' + iv + ')\n';
    } else if (key == 'LTR381RGB') {
        generator.definitions_['import_ltr381rgb'] = 'import ltr381rgb';
        code = v + ' = ltr381rgb.LTR_381RGB(' + iv + ')\n';
    } else if (key == 'UCS12071') {
        generator.definitions_['import_ucs12071'] = 'import ucs12071';
        code = v + ' = ucs12071.UCS12071(' + iv + ')\n';
    } else if (key == 'LTR390UV') {
        generator.definitions_['import_ltr390uv'] = 'import ltr390uv';
        code = v + ' = ltr390uv.ALS_UVS(' + iv + ')\n';
    } else if (key == 'HP203X') {
        generator.definitions_['import_hp203x'] = 'import hp203x';
        code = v + ' = hp203x.HP203X(' + iv + ')\n';
    } else if (key == "SPL06_001") {
        generator.definitions_['import_spl06_001'] = 'import spl06_001';
        code = v + ' = spl06_001.SPL06(' + iv + ')\n';
    } else if (key == 'SHTC3') {
        generator.definitions_['import_shtc3'] = 'import shtc3';
        code = v + ' = shtc3.' + key + "(" + iv + ')\n';
    } else if (key == 'AHT21') {
        generator.definitions_['import_ahtx0'] = 'import ahtx0';
        code = v + ' = ahtx0.AHTx0(' + iv + ')\n';
    } else if (key == 'VL53L0X') {
        generator.definitions_['import_vl53l0x'] = 'import vl53l0x';
        code = v + ' = vl53l0x.' + key + "(" + iv + ')\n';
    } else if (key == 'QMC5883L') {
        generator.definitions_['import_qmc5883l'] = 'import qmc5883l';
        code = v + ' = qmc5883l.Compass(' + iv + ')\n';
    } else if (key == 'MAX30102') {
        generator.definitions_['import_max30102'] = 'import max30102';
        code = v + ' = max30102.MAX30102(' + iv + ')\n';
    } else if (key == 'APDS9960') {
        generator.definitions_['import_apds9960'] = 'import apds9960';
        code = v + ' = apds9960.APDS9960(' + iv + ')\n';
    } else if (key == 'RFID') {
        generator.definitions_['import_rc522'] = 'import rc522';
        code = v + ' = rc522.RC522(' + iv + ')\n';
    } else if (key == 'CBR817') {
        generator.definitions_['import_cbr817'] = 'import cbr817';
        code = v + ' = cbr817.' + key + "(" + iv + ')\n';
    } else if (key == 'CI130X') {
        generator.definitions_['import_ci130x'] = 'import ci130x';
        code = v + ' = ci130x.' + key + "(" + iv + ')\n';
    }
    return code;
}

export const radar_set_DETECTION_THRESHOLD = function (_, generator) {
    generator.definitions_['import_cbr817'] = 'import cbr817';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var value = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var value2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var code = sub + '.threshold(' + value + ')\n' + sub + '.delay_ms(' + value2 + ')\n';
    return code;
}

export const radar_set_DETECTION_THRESHOLD_SANT = function (_, generator) {
    generator.definitions_['import_sant_g2_ext_mmw'] = 'from sant_g2 import ext_mmw';
    var value = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var value2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var code = 'ext_mmw.threshold(' + value + ')\n' + 'ext_mmw.delay_ms(' + value2 + ')\n';
    return code;
}

export const interaction_whether_to_interaction = function (_, generator) {
    generator.definitions_['import_cbr817'] = 'import cbr817';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.result()';
    return [code, generator.ORDER_ATOMIC];
}

export const interaction_whether_to_interaction_SANT = function (_, generator) {
    generator.definitions_['import_sant_g2_ext_mmw'] = 'from sant_g2 import ext_mmw';
    var code = 'ext_mmw.result()';
    return [code, generator.ORDER_ATOMIC];
}

export const CI130X_IDENTIFY_AND_SAVE = function (_, generator) {
    generator.definitions_['import_ci130x'] = 'import ci130x';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.cmd_id()\n';
    return code;
}

export const CI130X_GET_WHETHER_IDENTIFY = function (_, generator) {
    generator.definitions_['import_ci130x'] = 'import ci130x';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var cmd = this.getFieldValue('cmd');
    var code = sub + '.result(' + cmd + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const CI130X_GET_THE_RECOGNIZED_CMD = function (_, generator) {
    generator.definitions_['import_ci130x'] = 'import ci130x';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    if (key == 'status1') {
        var code = sub + '.status()[0]';
    } else if (key == 'status2') {
        var code = sub + '.status()[1]';
    } else {
        var code = sub + '.' + key + '()';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const CI130X_BROADCAST = function (_, generator) {
    generator.definitions_['import_ci130x'] = 'import ci130x';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var star = this.getFieldValue('star');
    var end = this.getFieldValue('end');
    var code = sub + '.play(' + star + ',' + num + ',' + end + ')\n';
    return code;
}

export const CI130X_SET_SYSTEM_CMD = function (_, generator) {
    generator.definitions_['import_ci130x'] = 'import ci130x';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var cmd = this.getFieldValue('cmd');
    var code = sub + '.sys_cmd(' + cmd + ')\n';
    return code;
}

export const sensor_MAX30102_extern = function (_, generator) {
    generator.definitions_['import_max30102'] = 'import max30102';
    var key = this.getFieldValue('key');
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.heartrate()' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_APDS9960_extern = function (_, generator) {
    generator.definitions_['import_apds9960'] = 'import apds9960';
    var key = this.getFieldValue('key');
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_LTR308_extern = function (_, generator) {
    generator.definitions_['import_ltr308al'] = 'import ltr308al';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.getdata()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_hp203_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_hp203x'] = 'import hp203x';
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_spl06_001_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_spl06_001'] = 'import spl06_001';
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_ltr381_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_ltr381rgb'] = 'import ltr381rgb';
    var code = sub + '.getdata()' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_ucs12071_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_ucs12071'] = 'import ucs12071';
    if (key == '0') {
        var code = sub + '.color()';
    }
    else if (key == '1') {
        var code = sub + '.color_raw()';
    }
    else if (key == '2') {
        var code = sub + '.als()';
    }
    else {
        var code = sub + '.ir()';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_LTR390UV_extern = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_time'] = 'import time';
    generator.definitions_['import_ltr390uv'] = 'import ltr390uv';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    if (key == 'E') {
        var code = sub + '.ambient_light()';
    } else {
        var code = sub + '.ultraviolet()';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_QMC5883L_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_qmc5883l'] = 'import qmc5883l';
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_shtc3_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_shtc3'] = 'import shtc3';
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_aht11_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_ahtx0'] = 'import ahtx0';
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_VL530LX_extern = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_vl53l0x'] = 'import vl53l0x';
    var code = sub + '.read()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_use_spi_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sv = generator.valueToCode(this, 'SPISUB', generator.ORDER_ATOMIC);
    var pv = generator.valueToCode(this, 'PINSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code;
    if (key == 'RFID') {
        generator.definitions_['import_rc522'] = 'import rc522';
        var code = v + ' = rc522.RC522(' + sv + ',' + pv + ')\n';
    } else if (key == 'Weather') {
        var version = Boards.getSelectedBoardKey().split(':')[2]
        generator.definitions_['import_' + version] = 'import ' + version;
        generator.definitions_['import_ws_lora'] = 'import ws_lora';
        if (version == 'mixgo_pe') {
            var code = v + ' = ws_lora.Weather(' + sv + ',' + pv + ')\n';
        } else if (version == 'mixgo_nova') {
            var code = v + ' = ws_lora.Weather(' + sv + ',' + pv + ',' + version + '.onboard_i2c_soft' + ')\n';
        } else {
            var code = v + ' = ws_lora.Weather(' + sv + ',' + pv + ',' + version + '.onboard_i2c' + ')\n';
        }
    }
    return code;
}

export const extern_rfid_read = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sector = generator.valueToCode(this, 'SECTOR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card(' + sector + ',"' + key + '")';
    return [code, generator.ORDER_ATOMIC];
}

export const extern_rfid_readid = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card(0, x="id")';
    return [code, generator.ORDER_ATOMIC];
}

export const extern_rfid_readcontent = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sector = generator.valueToCode(this, 'SECTOR', generator.ORDER_ATOMIC);
    generator.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.read_card(' + sector + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const extern_rfid_write = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sector = generator.valueToCode(this, 'SECTOR', generator.ORDER_ATOMIC);
    var cnt = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    generator.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.write_card(' + cnt + ',' + sector + ')\n';
    return code;
}

export const extern_rfid_write_return = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sector = generator.valueToCode(this, 'SECTOR', generator.ORDER_ATOMIC);
    var cnt = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    generator.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.write_card(' + cnt + ',' + sector + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const extern_rfid_status = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_rc522'] = 'import rc522';
    var code = sub + '.scan_card()==' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const weather_data = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const weather_have_data = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.any()';
    return [code, generator.ORDER_ATOMIC];
}

export const weather_uart_mixio = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var base = generator.valueToCode(this, 'BASE', generator.ORDER_ATOMIC);
    generator.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = sub + '.uart_mixio(topic=' + base + ')\n';
    return code;
}

export const weather_set_label = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_ws_lora'] = 'import ws_lora';
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = sub + '.label(' + code.join(', ') + ')\n';
    return code;
}

export const sensor_mixgoce_hot_wheel_is_touched = function (_, generator) {
    var key = this.getFieldValue('key');
    var stat = this.getFieldValue('stat');
    generator.definitions_['import_tpwheel'] = 'import tpwheel';
    var code = 'tpwheel.TouchPadWheels(' + key + ').' + stat;
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_mixgoce_hot_wheel_degrees = function (_, generator) {
    generator.definitions_['import_tpwheel'] = 'import tpwheel';
    var code = 'tpwheel.hot_wheels_degree()';
    return [code, generator.ORDER_ATOMIC];
}

export const esp32_s2_weather_init = function (_, generator) {
    generator.definitions_['import_weather'] = 'import weather';
    generator.definitions_['import_board_*'] = 'from board import *';
    var wd = generator.valueToCode(this, 'wd', generator.ORDER_ATOMIC);
    var ws = generator.valueToCode(this, 'ws', generator.ORDER_ATOMIC);
    var rain = generator.valueToCode(this, 'rain', generator.ORDER_ATOMIC);
    var code = "wd = weather.Weather_wd(" + wd + ")\n"
    code += "ws = weather.Weather_ws(" + ws + ")\n"
    code += "rain = weather.Weather_rain(" + rain + ")\n"
    return code;
}

export const esp32_s2_weather_wd = function (_, generator) {
    generator.definitions_['import_weather'] = 'import weather';
    var code = 'wd.wind_direction()';
    return [code, generator.ORDER_ATOMIC];
}

export const esp32_s2_weather_rain = function (_, generator) {
    generator.definitions_['import_weather'] = 'import weather';
    var rain = generator.valueToCode(this, 'rain', generator.ORDER_ATOMIC);
    var code = 'rain.rain_count(time_Hour=' + rain + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const esp32_s2_weather_ws = function (_, generator) {
    generator.definitions_['import_weather'] = 'import weather';
    var key = this.getFieldValue('key');
    if (key == 'ALL') {
        var code = 'ws.wind_speed()';
    } else {
        var code = 'ws.wind_speed()[' + key + ']';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const HCSR04 = function (_, generator) {
    generator.definitions_['import_sonar'] = 'import sonar';
    var dropdown_pin1 = generator.valueToCode(this, "PIN1", generator.ORDER_ASSIGNMENT);
    var dropdown_pin2 = generator.valueToCode(this, "PIN2", generator.ORDER_ASSIGNMENT);
    var code = 'sonar.Sonar(' + dropdown_pin1 + ',' + dropdown_pin2 + ').checkdist()';
    return [code, generator.ORDER_ATOMIC];
}

export const PS2_init = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    //generator.definitions_['import_board'] = 'import board';
    var PS2_CLK = this.getFieldValue('PS2_CLK');
    var PS2_DOU = this.getFieldValue('PS2_DOU');
    var PS2_DIN = this.getFieldValue('PS2_DIN');
    var PS2_CS = this.getFieldValue('PS2_CS');
    var code = 'mixgope_ps = ps2.PS2Controller(' + PS2_CLK + ',' + PS2_DOU + ',' + PS2_DIN + ',' + PS2_CS + ')\n';
    return code;
}

export const PS2_vibration = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var ss = this.getFieldValue('smotorstate');
    var amp = generator.valueToCode(this, 'AMP', generator.ORDER_ATOMIC);
    var code = "mixgope_ps.PS2_vibration(" + ss + ',' + amp + ")\n";
    return code;
}

export const PS2_Button = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var bt = this.getFieldValue('psbt');
    var code = "mixgope_ps.PS2_keydata()[0] & (ps2." + bt + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const PS2_Buttons = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var bt = this.getFieldValue('psbt');
    var code = "ps2." + bt;
    return [code, generator.ORDER_ATOMIC];
}

export const PS2_State = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var bt = this.getFieldValue('btstate');
    var code = "mixgope_ps.PS2_keydata()[" + bt + "]";
    return [code, generator.ORDER_ATOMIC];
}

export const PS2_stk = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var stk = this.getFieldValue('psstk');
    var code = "mixgope_ps.PS2_keydata()[1][" + stk + "]";
    return [code, generator.ORDER_ATOMIC];
}

export const RTC_set_datetime = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var year = generator.valueToCode(this, "year", generator.ORDER_ASSIGNMENT);
    var month = generator.valueToCode(this, "month", generator.ORDER_ASSIGNMENT);
    var day = generator.valueToCode(this, "day", generator.ORDER_ASSIGNMENT);
    var hour = generator.valueToCode(this, "hour", generator.ORDER_ASSIGNMENT);
    var minute = generator.valueToCode(this, "minute", generator.ORDER_ASSIGNMENT);
    var second = generator.valueToCode(this, "second", generator.ORDER_ASSIGNMENT);
    var week = generator.valueToCode(this, "weekday", generator.ORDER_ASSIGNMENT);
    var millisecond = generator.valueToCode(this, "millisecond", generator.ORDER_ASSIGNMENT);
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "rtc")
        generator.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';
    var code = v + '.datetime((' + year + ',' + month + ',' + day + ',' + week + ',' + hour + ',' + minute + ',' + second + ',' + millisecond + '))\n';
    return code;
}

export const RTC_get_time = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (v == "rtc")
        generator.definitions_['import_mixgo_rtc'] = 'from mixgo import rtc';
    var code = v + '.datetime()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_dht11 = function (_, generator) {
    generator.definitions_['import_dhtx'] = 'import dhtx';
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    var code = 'dhtx.' + sensor_type + "(" + dropdown_pin + ').' + what + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const PS2_init_new = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    //generator.definitions_['import_board'] = 'import board';
    var PS2_CLK = generator.valueToCode(this, 'CLK', generator.ORDER_ATOMIC);
    var PS2_DOU = generator.valueToCode(this, 'DOU', generator.ORDER_ATOMIC);
    var PS2_DIN = generator.valueToCode(this, 'DIN', generator.ORDER_ATOMIC);
    var PS2_CS = generator.valueToCode(this, 'CS', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + ' = ps2.PS2Controller(' + PS2_CLK + ',' + PS2_DOU + ',' + PS2_DIN + ',' + PS2_CS + ')\n';
    return code;
}

export const PS2_vibration_new = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var ss = this.getFieldValue('smotorstate');
    var amp = generator.valueToCode(this, 'AMP', generator.ORDER_ATOMIC);
    var code = sub + ".vibration(" + ss + ',' + amp + ")\n";
    return code;
}

export const PS2_Buttons_new = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var bt = this.getFieldValue('psbt');
    var code = sub + '.button(ps2.' + bt + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const PS2_stk_new = function (_, generator) {
    generator.definitions_['import_ps2'] = 'import ps2';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var stk = this.getFieldValue('psstk');
    var code = sub + ".analog(ps2.PSS_" + stk + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_use_uart_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var s = this.getFieldValue('sensor');
    var code = ''
    if (s == 'PM') {
        generator.definitions_['import_pm2_5'] = 'import pm2_5';
        code = v + '=pm2_5.PM2_5(' + key + ')\n';
    } else if (s == 'GNSS') {
        generator.definitions_['import_gnss'] = 'import gnss';
        code = v + '=gnss.NMEA0183(' + key + ')\n';
    }
    return code;
}

export const pm25_get_data = function (_, generator) {
    generator.definitions_['import_pm2_5'] = 'import pm2_5';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var pm = this.getFieldValue('pm');
    var code = v + ".concentration()" + pm;
    return [code, generator.ORDER_ATOMIC];
}

export const gnss_get_data = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    generator.definitions_['import_gnss'] = 'import gnss';
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const gnss_have_data = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_gnss'] = 'import gnss';
    var code = sub + '.any()';
    return [code, generator.ORDER_ATOMIC];
}

//mixbot/feiyi extern below:
export const robot_button_extern_get_value = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var num = this.getFieldValue('num');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_button'] = 'from mixbot_ext import ext_button';
        var code = 'ext_button.value(' + mode + ")" + num;
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_button'] = 'ext_button_left = i2cdevice.Buttonx5(ext_i2c_left)';
            var code = 'ext_button_left.value()' + num;
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_button'] = 'ext_button_right = i2cdevice.Buttonx5(ext_i2c_right)';
            var code = 'ext_button_right.value()' + num;
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_touch_extern_get_value = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_collision'] = 'from mixbot_ext import ext_collision';
        var code = 'ext_collision.value(' + mode + ")";
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_collision'] = 'ext_collision_left = i2cdevice.Button(ext_i2c_left)';
            var code = 'ext_collision_left.value()';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_collision'] = 'ext_collision_right = i2cdevice.Button(ext_i2c_right)';
            var code = 'ext_collision_right.value()';
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_infrared_extern_get_value = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    if (version == 'mixbot') {
        var mode = this.getFieldValue('mode');
        generator.definitions_['import_mixbot_ext_ext_infrared'] = 'from mixbot_ext import ext_infrared';
        var code = 'ext_infrared.value(' + mode + ")";
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        var mode = this.getFieldValue('mode');
        generator.definitions_['import_feiyi_onboard_bot51'] = 'from feiyi import onboard_bot51';
        var code = 'onboard_bot51.read_ps(' + mode + ")";
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_infrared_extern_grey_get_value = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_grey_near'] = 'ext_grey_near_left = i2cdevice.Infrared(ext_i2c_left)';
            var code = 'ext_grey_near_left.value()';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_grey_near'] = 'ext_grey_near_right = i2cdevice.Infrared(ext_i2c_right)';
            var code = 'ext_grey_near_right.value()';
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_potentiometer_extern_get_value = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_potentiometer'] = 'from mixbot_ext import ext_potentiometer';
        var code = 'ext_potentiometer.value(' + mode + ")";
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_potentiometer'] = 'ext_potentiometer_left = i2cdevice.Dimmer(ext_i2c_left)';
            var code = 'ext_potentiometer_left.value()';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_potentiometer'] = 'ext_potentiometer_right = i2cdevice.Dimmer(ext_i2c_right)';
            var code = 'ext_potentiometer_right.value()';
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_color_extern_get_value = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var color = this.getFieldValue('color');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_color'] = 'from mixbot_ext import ext_color';
        var code = 'ext_color.recognition(' + mode + ")" + color;
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_color'] = 'ext_color_left = i2cdevice.Color_ID(ext_i2c_left)';
            var code = 'ext_color_left.recognition()' + color;
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_color'] = 'ext_color_right = i2cdevice.Color_ID(ext_i2c_right)';
            var code = 'ext_color_right.recognition()' + color;
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_sonar_extern_get_value = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_sonar'] = 'from mixbot_ext import ext_sonar';
        var code = 'ext_sonar.value(' + mode + ")";
        return [code, generator.ORDER_ATOMIC];
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_sonar'] = 'ext_sonar_left = i2cdevice.Sonar(ext_i2c_left)';
            var code = 'ext_sonar_left.value()';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_sonar'] = 'ext_sonar_right = i2cdevice.Sonar(ext_i2c_right)';
            var code = 'ext_sonar_right.value()';
        }
        return [code, generator.ORDER_ATOMIC];
    }
}

export const robot_sonar_extern_led = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var mode = this.getFieldValue('mode');
    var light = generator.valueToCode(this, 'light', generator.ORDER_ATOMIC);
    var op = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    if (version == 'mixbot') {
        generator.definitions_['import_mixbot_ext_ext_sonar'] = 'from mixbot_ext import ext_sonar';
        var code = 'ext_sonar.led(' + mode + ',' + light + ',' + op + ")\n";
        return code;
    } else if (version == 'feiyi') {
        generator.definitions_['import_machine'] = 'import machine';
        generator.definitions_['import_i2cdevice'] = 'import i2cdevice';
        if (mode == "0") {
            generator.definitions_['import_left_ext_i2c'] = 'ext_i2c_left = i2cdevice.I2C_device(scl = machine.Pin(0), sda = machine.Pin(1), freq = 10000)';
            generator.definitions_['import_left_sonar'] = 'ext_sonar_left = i2cdevice.Sonar(ext_i2c_left)';
            var code = 'ext_sonar_left.led(0,' + light + ',' + op + ')\n';
        } else if (mode == "1") {
            generator.definitions_['import_right_ext_i2c'] = 'ext_i2c_right = i2cdevice.I2C_device(scl = machine.Pin(2), sda = machine.Pin(3), freq = 10000)';
            generator.definitions_['import_right_sonar'] = 'ext_sonar_right = i2cdevice.Sonar(ext_i2c_right)';
            var code = 'ext_sonar_right.led(0,' + light + ',' + op + ')\n';
        }
        return code;
    }
}

export const mixbot_sensor_extern_get_addr = function (_, generator) {
    var name = this.getFieldValue('name');
    generator.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var code = name + '.addr_get()';
    return [code, generator.ORDER_ATOMIC];
}

export const mixbot_sensor_extern_set_addr = function (_, generator) {
    var name = this.getFieldValue('name');
    generator.definitions_['import_mixbot_ext_' + name] = 'from mixbot_ext import ' + name;
    var oldaddr = generator.valueToCode(this, 'old', generator.ORDER_ATOMIC);
    var newaddr = generator.valueToCode(this, 'new', generator.ORDER_ATOMIC);
    var code = name + '.addr_set(' + oldaddr + ',' + newaddr + ')\n';
    return code;
}

export const sensor_weather_solo_init = function (_, generator) {
    generator.definitions_['import_ws_solo'] = 'import ws_solo';
    var wd = generator.valueToCode(this, 'wd', generator.ORDER_ATOMIC);
    var ws = generator.valueToCode(this, 'ws', generator.ORDER_ATOMIC);
    var rain = generator.valueToCode(this, 'rain', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + ' = ws_solo.Weather_Solo(' + wd + ', ' + ws + ', ' + rain + ')\n';
    return code;
}

export const sensor_weather_solo_wd = function (_, generator) {
    generator.definitions_['import_ws_solo'] = 'import ws_solo';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.wind_direction()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_weather_solo_ws = function (_, generator) {
    generator.definitions_['import_ws_solo'] = 'import ws_solo';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.wind_speed()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_weather_solo_rain = function (_, generator) {
    generator.definitions_['import_ws_solo'] = 'import ws_solo';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.rain_count(' + time + ')' + key + '';
    return [code, generator.ORDER_ATOMIC];
}


export const sensor_DS18X20 = function (_, generator) {
    generator.definitions_['import_DS18X20'] = 'from ds18b20 import DS18X20';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'DS18X20(' + dropdown_pin + ').temperature()';
    return [code, generator.ORDER_ATOMIC];
};

//educore sensor_extern
export const educore_body_sensor = function (_, generator) {
    generator.definitions_['import_educore_tsd'] = 'from educore import tsd';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'tsd(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_soilhum_sensor = function (_, generator) {
    generator.definitions_['import_educore_solihum'] = 'from educore import soilhum';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'soilhum(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_temphum_sensor = function (_, generator) {
    generator.definitions_['import_educore_dht'] = 'from educore import dht';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'dht(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_infrared_sensor = function (_, generator) {
    generator.definitions_['import_educore_tsd'] = 'from educore import tsd';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'tsd(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_button_sensor_extern = function (_, generator) {
    generator.definitions_['import_educore_button'] = 'from educore import button';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'button(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_read_humiture = function (_, generator) {
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + ".read()[" + key + "]";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_ultrasonic_sensor = function (_, generator) {
    generator.definitions_['import_educore_ultrasonic'] = 'from educore import ultrasonic';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'ultrasonic(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ultrasonic_sensor_read_distance = function (_, generator) {
    generator.definitions_['import_educore_ultrasonic'] = 'from educore import ultrasonic';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + ".diatance()";
    return [code, generator.ORDER_ATOMIC];
}

export const educore_temp_sensor = function (_, generator) {
    generator.definitions_['import_educore_ds18b20'] = 'from educore import ds18b20';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'ds18b20(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_camera_sensor = function (_, generator) {
    generator.definitions_['import_educore_smartcamera'] = 'from educore import smartcamera';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'smartcamera(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const camera_sensor_init = function (_, generator) {
    generator.definitions_['import_educore_smartcamera'] = 'from educore import smartcamera';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.init(' + key + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const camera_sensor_result = function (_, generator) {
    generator.definitions_['import_educore_smartcamera'] = 'from educore import smartcamera';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + '.result()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_weigh_init = function (_, generator) {
    generator.definitions_['import_hx270'] = 'import hx720';
    var sck = generator.valueToCode(this, 'sck', generator.ORDER_ATOMIC);
    var dat = generator.valueToCode(this, 'dat', generator.ORDER_ATOMIC);
    var pc = generator.valueToCode(this, 'pc', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + ' = hx720.HX720(' + sck + ', ' + dat + ', ' + pc + ')\n';
    return code;
}

export const weigh_sensor_get_weight = function (_, generator) {
    generator.definitions_['import_hx270'] = 'import hx720';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + ".read_weight(10)";
    return [code, generator.ORDER_ATOMIC];
}