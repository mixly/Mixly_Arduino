import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const SENSOR_EXTERN_HUE = '#A58C5B'; //'#9e77c9'//40;


export const sensor_mixgo_extern_button_is_pressed = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_PRESSED);
        this.appendValueInput("STAT")
            .appendField(Blockly.Msg.MIXLY_ELECLEVEL);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_IS_PRESSED);
    }
};

export const sensor_mixgo_extern_button_was_pressed = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WAS_PRESSED);
        this.appendValueInput("STAT")
            .appendField(Blockly.Msg.MIXLY_ELECLEVEL);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_WAS_PRESSED);
    }
};

export const sensor_mixgo_extern_button_get_presses = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_PRESSES);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_GET_PRESSES_TIME);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_BUTTON + Blockly.Msg.MIXLY_GET_PRESSES);
    }
};

export const sensor_mixgo_extern_button_attachInterrupt = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.Msg.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.Msg.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING | machine.Pin.IRQ_FALLING)"]]), "mode");
        this.appendValueInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    }
};


export const sensor_mpu9250_attachGestureInterrupt = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.MIXLY_UP, "up"], [Blockly.Msg.MIXLY_DOWN, "down"], [Blockly.Msg.MIXLY_LEFT, "left"], [Blockly.Msg.MIXLY_RIGHT, "right"], [Blockly.Msg.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.MIXLY_MICROBIT_face_down, "face down"], [Blockly.Msg.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = Blockly.Msg.MSG.catSensor;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.Msg.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.Msg.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.MIXLY_UP,
                'down': Blockly.Msg.MIXLY_DOWN,
                'left': Blockly.Msg.MIXLY_LEFT,
                'right': Blockly.Msg.MIXLY_RIGHT,
                'face up': Blockly.Msg.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.MIXLY_MICROBIT_face_down,
                'freefall': Blockly.Msg.MIXLY_MICROBIT_freefall,
                '3g': '3g',
                '6g': '6g',
                '8g': '8g'
            };
            return mode0 + mode1 + mode2 + TOOLTIPS[mode] + mode3;
        });
    }
};


export const sensor_adxl345_get_acceleration = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_ADXL345)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION)
            .appendField(new Blockly.FieldDropdown([
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};



export const sensor_light_level = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_LIGHT_LEVEL)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SENSOR_LIGHT_LEVEL_TOOLTIP);
    }
};



export const sensor_dht11 = {
    init: function () {
        var WHAT = [[Blockly.Msg.MIXLY_GETTEMPERATUE, 'temperature'], [Blockly.Msg.MIXLY_GETHUMIDITY, 'humidity']];
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(new Blockly.FieldDropdown([['DHT11', 'DHT11']
                , ['DHT22', 'DHT22']//, ['DHT21', '21'], ['DHT33', '33'], ['DHT44', '44']
            ]), 'TYPE')
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('WHAT');
            var TOOLTIPS = {
                'temperature': Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM,
                'relative_humidity': Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_GET_HUM,
                'tempandhum': Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_GET_TEM_HUM
            };
            return TOOLTIPS[op];
        });
    }
};


export const sensor_mixgo_extern_light = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_VALUE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

export const sensor_mixgo_extern_sound = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_SOUND);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_VALUE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};



export const sensor_mixgo_extern_pin_near = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "left"], [Blockly.Msg.TEXT_TRIM_RIGHT, "right"]]), "direction")
            .appendField(Blockly.Msg.MIXLY_ESP32_NEAR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('direction');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            var TOOLTIPS = {
                'left': Blockly.Msg.TEXT_TRIM_LEFT,
                'right': Blockly.Msg.TEXT_TRIM_RIGHT,
            };
            return mode0 + TOOLTIPS[mode] + mode1
        });
    }
};

export const sensor_bmp = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_ALTITUDE_SENSOR + " BMP280")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "get_BMP_temperature()"],
                [Blockly.Msg.MIXLY_GETPRESSURE, "get_BMP_pressure()"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "get_BMP_temperature()": Blockly.Msg.MIXLY_MICROBIT_SENSOR_BMP_temperature_TOOLTIP,
                "get_BMP_pressure()": Blockly.Msg.MIXLY_MICROBIT_SENSOR_BMP_press_TOOLTIP,
            };
            return TOOLTIPS[mode]
        });
    }
};

export const sensor_sht = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_TEMP_AND_HUMIDITY_SENSOR + " SHT20")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "get_SHT_temperature()"],
                [Blockly.Msg.MIXLY_GETHUMIDITY, "get_SHT_relative_humidity()"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "get_SHT_temperature()": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "get_SHT_relative_humidity()": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP,
            };
            return TOOLTIPS[mode]
        });
    }
};

export const sensor_DS18X20 = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN", Number)
            .appendField("DS18X20 " + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_SENSOR_DS18X20_TOOLTIP);
    }
};

export const sensor_lm35 = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField("LM35" + Blockly.Msg.MIXLY_TEMP);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_LM35);
    }
};


//pe
export const sensor_use_i2c_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH + "I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT + "(LTR308ALS)", "LTR308"],
                [Blockly.Msg.MIXLY_COLOR_SENSOR + "(LTR381RGB)", "LTR381RGB"],
                [Blockly.Msg.MIXLY_COLOR_SENSOR + "(UCS12071)", "UCS12071"],
                [Blockly.Msg.MIXLY_EXTERN_LIGHTUV + "(LTR390UV)", "LTR390UV"],
                [Blockly.Msg.MIXLY_ALTITUDE_SENSOR + "(HP203X)", "HP203X"],
                [Blockly.Msg.MIXLY_ALTITUDE_SENSOR + "(SPL06_001)", "SPL06_001"],
                [Blockly.Msg.MIXLY_ALTITUDE_SENSOR + "(BMP280)", "BMP280"],
                [Blockly.Msg.MIXLY_TEMP_AND_HUMIDITY_SENSOR + "(SHTC3)", "SHTC3"],
                [Blockly.Msg.MIXLY_TEMP_AND_HUMIDITY_SENSOR + "(AHT21)", "AHT21"],
                [Blockly.Msg.MIXLY_TEMP_AND_HUMIDITY_SENSOR + "(SHT20)", "SHT20"],
                [Blockly.Msg.MIXLY_LASER_RANGE_SENSOR + "(VL53L0X)", "VL53L0X"],
                [Blockly.Msg.MIXLY_GEOMAGNETIC_SENSOR + "(QMC5883L)", "QMC5883L"],
                [Blockly.Msg.MIXLY_ESP32_MAX30102 + "(MAX30102)", "MAX30102"],
                [Blockly.Msg.HTML_COLOUR + "、" + Blockly.Msg.MIXLY_ENVIRONMENT_LIGHT + "、" + Blockly.Msg.MIXLY_NEXT + "、" + Blockly.Msg.MIXLY_ESP32_APDS9960 + "(APDS9960)", "APDS9960"],
                [Blockly.Msg.MIXLY_NINE_AXIS_SENSOR + "(MPU9250)", "MPU9250"],
                [Blockly.Msg.MixGo_MPU9250 + "(ADXL345)", "ADXL345"],
                ["RFID", "RFID"],
                [Blockly.Msg.MIXLY_RADAR_SENSOR + "(CBR817)", "CBR817"],
                [Blockly.Msg.MIXLY_AipSpeech_asr + "(CI130X)", "CI130X"]
            ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setFieldValue("LTR308", "key");
    }
};

export const radar_set_DETECTION_THRESHOLD = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_RADAR + 'CBR817')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET + Blockly.Msg.MIXlY_INTERACTION)
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_DETECTION_THRESHOLD);
        this.appendValueInput('VAR2')
            .appendField(Blockly.Msg.MIXLY_DELAY_TIME);
        this.appendDummyInput()
            .appendField('ms');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_THRESHOLD_TOOLTIP + ' ; ' + Blockly.Msg.MIXLY_DELAY_TIME_RANGE)
    }
};

export const radar_set_DETECTION_THRESHOLD_SANT = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RADAR)
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET + Blockly.Msg.MIXlY_INTERACTION)
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_DETECTION_THRESHOLD);
        this.appendValueInput('VAR2')
            .appendField(Blockly.Msg.MIXLY_DELAY_TIME);
        this.appendDummyInput()
            .appendField('ms');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_THRESHOLD_TOOLTIP + ' ; ' + Blockly.Msg.MIXLY_DELAY_TIME_RANGE)
    }
};

export const interaction_whether_to_interaction = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_RADAR + 'CBR817')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET_TO_INTERACTION)
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const interaction_whether_to_interaction_SANT = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RADAR)
            .appendField(Blockly.Msg.MIXLY_GET_TO_INTERACTION)
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const CI130X_IDENTIFY_AND_SAVE = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr + 'CI130X')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_IDENTIFY_ONCE_AND_SAVE)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

export const CI130X_GET_WHETHER_IDENTIFY = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr + 'CI130X')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_HELLO_XIAOZHI, "1"],
                [Blockly.Msg.MIXLY_XIAOZHIXIAOZHI, "2"],
                [Blockly.Msg.MIXLY_THE_FIRST, "3"],
                [Blockly.Msg.MIXLY_THE_SECOND, "4"],
                [Blockly.Msg.MIXLY_THE_THIRD, "5"],
                [Blockly.Msg.MIXLY_THE_FOURTH, "6"],
                [Blockly.Msg.MIXLY_THE_FIFTH, "7"],
                [Blockly.Msg.MIXLY_THE_SIXTH, "8"],
                [Blockly.Msg.MIXLY_THE_SEVENTH, "9"],
                [Blockly.Msg.MIXLY_THE_EIGHTH, "10"],
                [Blockly.Msg.MIXLY_THE_NINTH, "11"],
                [Blockly.Msg.MIXLY_THE_TENTH, "12"],
                [Blockly.Msg.MIXLY_THE_ELEVENTH, "13"],
                [Blockly.Msg.MIXLY_THE_TWELFTH, "14"],
                [Blockly.Msg.MIXLY_THE_13TH, "15"],
                [Blockly.Msg.MIXLY_THE_14TH, "16"],
                [Blockly.Msg.MIXLY_THE_15TH, "17"],
                [Blockly.Msg.MIXLY_THE_16TH, "18"],
                [Blockly.Msg.MIXLY_THE_17TH, "19"],
                [Blockly.Msg.MIXLY_THE_18TH, "20"],
                [Blockly.Msg.MIXLY_THE_19TH, "21"],
                [Blockly.Msg.MIXLY_THE_20TH, "22"],
                [Blockly.Msg.MIXLY_Turn_on_the_lights, "23"],
                [Blockly.Msg.MIXLY_Turn_off_the_lights, "24"],
                [Blockly.Msg.MIXLY_Turn_up_the_brightness, "25"],
                [Blockly.Msg.MIXLY_Turn_down_the_brightness, "26"],
                [Blockly.Msg.MIXLY_Set_it_to_red, "27"],
                [Blockly.Msg.MIXLY_Set_it_to_orange, "28"],
                [Blockly.Msg.MIXLY_Set_it_to_yellow, "29"],
                [Blockly.Msg.MIXLY_Set_it_to_green, "30"],
                [Blockly.Msg.MIXLY_Set_it_to_cyan, "31"],
                [Blockly.Msg.MIXLY_Set_it_to_blue, "32"],
                [Blockly.Msg.MIXLY_Set_it_to_purple, "33"],
                [Blockly.Msg.MIXLY_Set_it_to_white, "34"],
                [Blockly.Msg.MIXLY_Turn_on_the_fan, "35"],
                [Blockly.Msg.MIXLY_Turn_off_the_fan, "36"],
                [Blockly.Msg.MIXLY_First_gear, "37"],
                [Blockly.Msg.MIXLY_Wind_speed_second, "38"],
                [Blockly.Msg.MIXLY_Third_gear, "39"],
                [Blockly.Msg.MIXLY_Previous, "40"],
                [Blockly.Msg.MIXLY_Next_page, "41"],
                [Blockly.Msg.MIXLY_Show_smiley_face, "42"],
                [Blockly.Msg.MIXLY_Show_crying_face, "43"],
                [Blockly.Msg.MIXLY_Show_love, "44"],
                [Blockly.Msg.MIXLY_Close_display, "45"],
                [Blockly.Msg.MIXLY_Start_execution, "46"],
                [Blockly.Msg.MIXLY_FORWARD, "47"],
                [Blockly.Msg.MIXLY_BACKWARD, "48"],
                [Blockly.Msg.MIXLY_TURNLEFT, "49"],
                [Blockly.Msg.MIXLY_TURNRIGHT, "50"],
                [Blockly.Msg.MIXLY_STOP, "51"],
                [Blockly.Msg.MIXLY_Accelerate, "52"],
                [Blockly.Msg.MIXLY_retard, "53"],
                [Blockly.Msg.ROTATION_FORWARD, "54"],
                [Blockly.Msg.ROTATION_BACKWARD, "55"],
                [Blockly.Msg.MIXLY_Query_temperature, "56"],
                [Blockly.Msg.MIXLY_Query_humidity, "57"],
                [Blockly.Msg.MIXLY_Query_brightness, "58"],
                [Blockly.Msg.MIXLY_Query_sound, "59"],
                [Blockly.Msg.MIXLY_Query_time, "60"],
                [Blockly.Msg.MIXLY_Query_distance, "61"],
                [Blockly.Msg.MIXLY_Query_pressure, "62"],
                [Blockly.Msg.MIXLY_Query_key, "63"],
                [Blockly.Msg.MIXLY_Query_touch, "64"],
                [Blockly.Msg.MIXLY_Query_color, "65"]
            ]), "cmd")
            .appendField(Blockly.Msg.MIXLY_WHETHER + Blockly.Msg.MIXLY_BE_IDENTIFIED);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const CI130X_GET_THE_RECOGNIZED_CMD = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr + 'CI130X')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_RECOGNIZED_STATE, "status1"],
                [Blockly.Msg.MIXLY_WHETHER_BROADCAST, "status2"],
                [Blockly.Msg.MIXLY_THE_RECOGNIZED_CMD, "result"]
            ]), "key")
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_CI130X_GET_THE_RECOGNIZED_STATE_TOOLTIP);
    }
};

export const CI130X_BROADCAST = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr + 'CI130X')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_PLAY)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_PULL_NONE, "None"],
                [Blockly.Msg.MIXLY_WIND_SPEED, "154"],
                [Blockly.Msg.MIXLY_HYETAL, "155"],
                [Blockly.Msg.MIXLY_TEMPERATURE, "156"],
                [Blockly.Msg.MIXLY_Humidity, "157"],
                [Blockly.Msg.MIXLY_Altitude, "158"],
                [Blockly.Msg.MIXLY_SOUND, "159"],
                [Blockly.Msg.MIXLY_BRIGHTNESS, "160"],
                [Blockly.Msg.ME_GO_HALL_SENSOR_DISTANCE, "161"],
                [Blockly.Msg.MIXLY_SERVO, "162"],
                [Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE, "163"],
                [Blockly.Msg.MIXLY_BUTTON2, "164"],
                [Blockly.Msg.MIXLY_ESP32_TOUCH, "165"],
                [Blockly.Msg.MIXLY_PAY, "166"],
                [Blockly.Msg.MIXLY_CARSH_CHANGE, "167"],
                [Blockly.Msg.MIXLY_COUNTDOWN, "168"],
                [Blockly.Msg.MIXLY_TIMING, "169"],
                [Blockly.Msg.MIXLY_AT_THE_MOMENT, "170"],
                [Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT_GESTURE, "171"],
                [Blockly.Msg.MIXLY_FORWARD, "172"],
                [Blockly.Msg.MIXLY_BACKWARD, "173"],
                [Blockly.Msg.MIXLY_TURNLEFT, "174"],
                [Blockly.Msg.MIXLY_TURNRIGHT, "175"],
                [Blockly.Msg.MIXLY_STOP, "176"],
                [Blockly.Msg.MIXLY_Accelerate, "177"],
                [Blockly.Msg.MIXLY_retard, "178"],
                [Blockly.Msg.ROTATION_FORWARD, "179"],
                [Blockly.Msg.ROTATION_BACKWARD, "180"],
                [Blockly.Msg.TUPLE_JOIN, "181"],
                [Blockly.Msg.MIXLY_SHOW, "182"],
                [Blockly.Msg.MIXLY_LAMPLIGHT, "183"],
                [Blockly.Msg.MIXLY_ACCELERATION, "184"]
            ]), "star");
        this.appendValueInput('NUM')
            .appendField(Blockly.Msg.MIXLY_NUMBER);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_UNIT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_PULL_NONE, "None"],
                [Blockly.Msg.MIXLY_YEAR, "117"],
                [Blockly.Msg.MIXLY_MONTH, "118"],
                [Blockly.Msg.MIXLY_DAY, "119"],
                [Blockly.Msg.MIXLY_HOUR, "120"],
                [Blockly.Msg.MIXLY_MINUTE, "121"],
                [Blockly.Msg.MIXLY_SECOND, "122"],
                [Blockly.Msg.MIXLY_WEEK2, "123"],
                [Blockly.Msg.MIXLY_RMB_UNIT, "124"],
                [Blockly.Msg.blockpy_setheading_degree, "125"],
                [Blockly.Msg.MIXLY_GEAR, "126"],
                [Blockly.Msg.MIXLY_LAYER, "127"],
                [Blockly.Msg.MIXLY_GRAM, "128"],
                [Blockly.Msg.MIXLY_METER, "129"],
                [Blockly.Msg.MIXLY_CENTIMETER, "130"],
                [Blockly.Msg.MIXLY_MILLIMETER, "131"],
                [Blockly.Msg.MIXLY_LUMEN, "132"],
                [Blockly.Msg.MIXLY_DECIBEL, "133"],
                [Blockly.Msg.MIXLY_hectopascal, "134"],
                [Blockly.Msg.MIXLY_PERCENT, "135"],
                [Blockly.Msg.MIXLY_CELSIUS, "136"],
                [Blockly.Msg.MIXLY_METER_PER_SEC, "137"],
                [Blockly.Msg.MIXLY_MICROBIT_Turn_on_display, "138"],
                [Blockly.Msg.MIXLY_MICROBIT_Turn_off_display, "139"],
                [Blockly.Msg.MIXLY_SUCCESS, "140"],
                [Blockly.Msg.MIXLY_FAILED, "141"],
                [Blockly.Msg.MIXLY_WRONG, "142"],
                [Blockly.Msg.MIXLY_GOOD, "143"],
                [Blockly.Msg.MIXLY_blockpy_set_add, "144"],
                [Blockly.Msg.MIXLY_DECREASE, "145"],
                [Blockly.Msg.COLOUR_RGB_RED, "146"],
                [Blockly.Msg.COLOUR_RGB_ORANGE, "147"],
                [Blockly.Msg.COLOUR_YELLOW, "148"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "149"],
                [Blockly.Msg.COLOUR_CYAN, "150"],
                [Blockly.Msg.COLOUR_RGB_BLUE, "151"],
                [Blockly.Msg.COLOUR_RGB_PURPLE, "152"],
                [Blockly.Msg.COLOUR_RGB_WHITE, "153"]
            ]), "end");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const CI130X_SET_SYSTEM_CMD = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr + 'CI130X')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET + Blockly.Msg.MIXLY_SYSTEM + Blockly.Msg.MIXLY_CMD)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MILXY_ENTER_WAKE_UP, "1"],
                [Blockly.Msg.MIXLY_INCREASE_VOLUME, "202"],
                [Blockly.Msg.MIXLY_REDUCE_VOLUME, "203"],
                [Blockly.Msg.MIXLY_MAX_VOLUME, "204"],
                [Blockly.Msg.MIXLY_MINIMUM, "205"],
                [Blockly.Msg.MIXLY_OPEN_RESPONSE, "206"],
                [Blockly.Msg.MIXLY_CLOSE_RESPONSE, "207"],
                [Blockly.Msg.MIXLY_QUIT_WAKE_UP, "208"]
            ]), "cmd")
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

export const sensor_MAX30102_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_MAX30102 + " MAX30102");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ESP32_MAX30102_IR, "[0]"],
                [Blockly.Msg.MIXLY_ESP32_MAX30102_RED, "[1]"],
                [Blockly.Msg.MIXLY_ESP32_MAX30102_IR + ',' + Blockly.Msg.MIXLY_ESP32_MAX30102_RED, ""],
            ]), "key")
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_APDS9960_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_APDS9960 + " APDS9960");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ESP32_APDS9960_COLOR, "color"],
                [Blockly.Msg.MIXLY_ESP32_APDS9960_GESTURE, "gesture"],
                [Blockly.Msg.MIXLY_ESP32_APDS9960_APPROACH, "proximity"],
            ]), "key")
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_LTR308_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_LIGHT + " LTR308ALS");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_LIGHT_INTENSITY);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_ltr381_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.HTML_COLOUR + Blockly.Msg.MSG.catSensor + " LTR381RGB")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GET + Blockly.Msg.HTML_COLOUR, "[2]"],
                [Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_IR_STRENGTH, "[1]"],
                [Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_LIGHT_STRENGTH, "[0]"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_ucs12071_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.HTML_COLOUR + Blockly.Msg.MSG.catSensor + " UCS12071")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GET + 'RGB' + Blockly.Msg.HTML_COLOUR, "0"],
                [Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_RGB_RAW, "1"],
                [Blockly.Msg.MIXLY_GET_ENV_LIGHT + Blockly.Msg.MIXLY_BRIGHTNESS, "2"],
                [Blockly.Msg.GET_IR_STRENGTH + Blockly.Msg.MIXLY_BRIGHTNESS, "3"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_LTR390UV_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_EXTERN_LIGHTUV + " LTR390UV")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GET_ENV_LIGHT, "E"],
                [Blockly.Msg.MIXLY_GET_ULTRAVIOLET, "U"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_VL530LX_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_LASER_RANGE + " VL53L0X");
        this.appendValueInput('SUB')
            //.appendField("BMP280")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_DISTANCE + '(mm)');
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_shtc3_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_TEM_HUM + " SHTC3")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature"],
                [Blockly.Msg.MIXLY_GETHUMIDITY, "humidity"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "temperature": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "humidity": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP
            };
            return TOOLTIPS[mode]
        });
    }
};

export const sensor_aht11_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_TEM_HUM + " AHT21")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature"],
                [Blockly.Msg.MIXLY_GETHUMIDITY, "humidity"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "temperature": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "relative_humidity": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP
            };
            return TOOLTIPS[mode]
        });
    }
};

export const sensor_hp203_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_Altitude + Blockly.Msg.MSG.catSensor + " HP203X")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETPRESSURE, "pressure()"],
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature()"],
                [Blockly.Msg.MIXLY_GET_ALTITUDE, "altitude()"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_spl06_001_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_Altitude + Blockly.Msg.MSG.catSensor + " SPL06_001")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GETPRESSURE, "pressure()"],
                [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature()"],
                [Blockly.Msg.MIXLY_GET_ALTITUDE, "altitude()"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_QMC5883L_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_MIXGOPE_FIELD + Blockly.Msg.MSG.catSensor + " QMC5883L")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE, "get_bearing()"],
                [Blockly.Msg.MIXLY_TEMPERATURE, "get_temp()"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_mpu9250_gesture = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT_GESTURE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.MIXLY_UP, "up"], [Blockly.Msg.MIXLY_DOWN, "down"], [Blockly.Msg.MIXLY_LEFT, "left"], [Blockly.Msg.MIXLY_RIGHT, "right"], [Blockly.Msg.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.MIXLY_MICROBIT_face_down, "face down"]]), "gesture");
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('gesture');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT;
            var mode1 = Blockly.Msg.MSG.catSensor;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_STATE;
            var mode3 = Blockly.Msg.MIXLY_MICROBIT_PERFORMANCE
            var TOOLTIPS = {
                'shake': Blockly.Msg.MIXLY_MICROBIT_shake,
                'up': Blockly.Msg.MIXLY_UP,
                'down': Blockly.Msg.MIXLY_DOWN,
                'left': Blockly.Msg.MIXLY_LEFT,
                'right': Blockly.Msg.MIXLY_RIGHT,
                'face up': Blockly.Msg.MIXLY_MICROBIT_face_up,
                'face down': Blockly.Msg.MIXLY_MICROBIT_face_down,
                // 'freefall':Blockly.Msg.MIXLY_MICROBIT_freefall,
                // '3g': '3g',
                // '6g': '6g',
                // '8g': '8g'
            };
            return mode0 + mode1 + mode2 + TOOLTIPS[mode] + mode3;
        });
    }
};

export const sensor_mpu9250_get_acceleration = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_NINE_AXIS_SENSOR + " MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION)
            .appendField(new Blockly.FieldDropdown([
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_mpu9250_get_magnetic = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_NINE_AXIS_SENSOR + " MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET + Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH)
            .appendField(new Blockly.FieldDropdown([
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_mpu9250_get_gyro = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_NINE_AXIS_SENSOR + " MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + Blockly.Msg.MIXLY_ESP32_SENOR_GYRO)
            .appendField(new Blockly.FieldDropdown([
                ["x", "x"],
                ["y", "y"],
                ["z", "z"],
                ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.Msg.MIXLY_ESP32_SENOR_GYRO;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)': Blockly.Msg.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 + TOOLTIPS[mode] + mode1 + mode2;
        });
    }
};

export const sensor_mpu9250_calibrate_compass = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_NINE_AXIS_SENSOR + " MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};


export const sensor_mpu9250_temperature = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_NINE_AXIS_SENSOR + " MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);

        this.setTooltip(Blockly.Msg.MIXLY_GETTEMPERATUE);
    }
};


export const sensor_mpu9250_field_strength = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET_COMPASS)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH, 'strength'], [Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE, 'heading']]), 'compass');
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('compass');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_JS_GET_COMPASS;
            var TOOLTIPS = {
                'strength': Blockly.Msg.MIXLY_MICROBIT_JS_FIELD_STRENGTH,
                'heading': Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE
            };
            return mode0 + TOOLTIPS[mode];
        });
    }
};

export const sensor_compass_reset = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Reset_COMPASS);
    }
};

export const sensor_use_spi_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SPISUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH + "SPI")
            .setCheck("var");
        this.appendValueInput('PINSUB')
            .appendField("CS")
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                ["RFID", "RFID"],
                ["WS-LoRa", "Weather"]
            ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setFieldValue("RFID", "key");
    }
};

export const extern_rfid_read = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField("RFID" + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_RFID_READ_CARD_UID, "id"],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL, "content"],
                [Blockly.Msg.MIXLY_ALL, "ALL"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const extern_rfid_readid = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField("RFID" + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RFID_READ_CARD_UID);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const extern_rfid_readcontent = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField("RFID" + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL);
        this.setOutput(true, 'Tuple');
        this.setInputsInline(true);
    }
};

export const extern_rfid_write = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_WRITE);
        this.appendValueInput('SUB')
            .setCheck("var")
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_WRITE_NUM)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const extern_rfid_write_return = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_WRITE);
        this.appendValueInput('SUB')
            .setCheck("var")
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_WRITE_NUM)
        this.appendDummyInput()
            .appendField(Blockly.Msg.RETURN_SUCCESS_OR_NOT);
        this.setInputsInline(true);
        this.setOutput(true, Boolean);
    }
};

export const extern_rfid_status = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField("RFID");
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_RFID_SCAN_OK, "0"],
                [Blockly.Msg.MIXLY_RFID_SCAN_NOTAGERR, "1"],
                [Blockly.Msg.MIXLY_RFID_SCAN_ERROR, "2"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

//--------------------待写气象数据
export const weather_data = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("无线气象站" + " WS-LoRa")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown([
                ["全部（元组）", "data()[0]"],
                ["全部（json）", "data()[1]"],
                ["全部（json,附带位置信息）", "data()[2]"],
                ["编号", "data()[0][0]"],
                ["电量", "data()[0][1]"],
                ["风速", "data()[0][2]"],
                ["阵风", "data()[0][3]"],
                ["风向", "data()[0][4]"],
                ["雨量", "data()[0][5]"],
                ["温度", "data()[0][6]"],
                ["湿度", "data()[0][7]"],
                ["光照", "data()[0][8]"],
                ["紫外线", "data()[0][9]"],
                ["大气压", "data()[0][10]"],
                ["信号强度", "data()[0][11]"],
                ["信噪比", "data()[0][12]"],
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip("返回气象数据元组 data= (设备id,电池状态,风速m/s,阵风m/s,风向°,雨量mm,温度℃,湿度%,光照Lux,UVI,大气压Pa,信号强度dB,信噪比dB)");
    }
};

export const weather_have_data = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("无线气象站" + " WS-LoRa")
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERIAL_AVAILABLE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const weather_uart_mixio = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("无线气象站" + " WS-LoRa")
            .setCheck("var");
        this.appendValueInput('BASE')
            .appendField("以主题")
        this.appendDummyInput("")
            .appendField("串口发送至MixIO")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const weather_set_label = {

    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField("无线气象站" + " WS-LoRa")
            .setCheck("var");
        this.itemCount_ = 2;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['weather_set_label_item'], this));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip();
    },

    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },

    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },

    decompose: function (workspace) {
        var containerBlock =
            workspace.newBlock('weather_set_label_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('weather_set_label_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },

    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
            connections[i] = itemBlock.valueConnection_;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
            i++;
        }
        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i)
                    .connection.connect(connections[i]);
            }
        }
    },

    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },

    updateShape_: function () {
        // Delete everything.
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else {
            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_GPS_LOCATION + Blockly.Msg.mixpy_PYLAB_TICKS_TAG + '(id,long,lat)');
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_GPS_LOCATION + Blockly.Msg.mixpy_PYLAB_TICKS_TAG + '(id,long,lat)');
                }
            }
        }
    }
};
export const weather_set_label_container = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_GPS_LOCATION + Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

export const weather_set_label_item = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

export const sensor_mixgoce_hot_wheel_is_touched = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_HOT_WHEEL)
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH_SENSOR)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_UP, "4"],
                [Blockly.Msg.MIXLY_DOWN, "2"],
                [Blockly.Msg.MIXLY_LEFT, "3"],
                [Blockly.Msg.MIXLY_RIGHT, "1"],
                ["OK", "0"]
            ]), "key");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_DATA, "value"],
                [Blockly.Msg.MIXLY_PULSEIN_STAT, "is_touched()"]
            ]), "stat");
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

export const sensor_mixgoce_hot_wheel_degrees = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_HOT_WHEEL)
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH_SENSOR)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET + Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE + '(-180°~180°)');
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

export const esp32_s2_weather_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.ForecastType + Blockly.Msg.MSG.catSensor);
        this.appendValueInput('wd')
            .setCheck(Number)
            .appendField('wd');
        this.appendValueInput('ws')
            .setCheck(Number)
            .appendField('ws');
        this.appendValueInput('rain')
            .setCheck(Number)
            .appendField('rain');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const esp32_s2_weather_wd = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ForecastType + Blockly.Msg.MSG.catSensor)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + Blockly.Msg.ForecastFx)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const esp32_s2_weather_rain = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('rain')
            .appendField(Blockly.Msg.ForecastType + Blockly.Msg.MSG.catSensor)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RAIN_TIME + Blockly.Msg.MIXLY_RAIN)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const esp32_s2_weather_ws = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ForecastType + Blockly.Msg.MSG.catSensor)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.blynk_IOT_IR_FAN, "0"],
                [Blockly.Msg.MIXLY_WIND_RATING, "1"],
                [Blockly.Msg.blynk_IOT_IR_FAN + Blockly.Msg.MIXLY_WIND_RATING, "ALL"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const HCSR04 = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHAOSHENGBO);
        this.appendValueInput("PIN1", Number)
            .appendField('Trig #')
            .setCheck(Number);
        this.appendValueInput("PIN2", Number)
            .appendField('Echo #')
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
    }

};

//PS2
export const PS2_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.PS2);
        this.appendDummyInput("")
            .appendField('CLK#')
            .appendField(new Blockly.FieldDropdown(Profile.default.output_pin), "PS2_CLK")
            .appendField('DOU#')
            .appendField(new Blockly.FieldDropdown(Profile.default.output_pin), "PS2_DOU")
            .appendField('DIN#')
            .appendField(new Blockly.FieldDropdown(Profile.default.output_pin), "PS2_DIN")
            .appendField('CS#')
            .appendField(new Blockly.FieldDropdown(Profile.default.output_pin), "PS2_CS");
        // this.appendDummyInput("")
        // .appendField(Blockly.Msg.PS2_setRumble)
        // .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_ON,"true"],[Blockly.Msg.MIXLY_OFF,"false"]]), "rumble");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
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
export const PS2_vibration = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2 + Blockly.Msg.PS2_setRumble)
            .appendField(Blockly.Msg.MIXLY_STM32_OLED_SMALL + Blockly.Msg.MSG.catActuator_motor)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "0"],
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "1"],
            ]), "smotorstate")
            .appendField(Blockly.Msg.MIXLY_STM32_OLED_BIG + Blockly.Msg.MSG.catActuator_motor + Blockly.Msg.MIXLY_MIXGOPE_AMPLITUDE)
        this.appendValueInput("AMP", Number)
        this.setTooltip(Blockly.Msg.MIXLY_STM32_OLED_BIG + Blockly.Msg.MSG.catActuator_motor + Blockly.Msg.MIXLY_MIXGOPE_AMPLITUDE + "0-100");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

//
export const PS2_Button = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_BUTTON)
            .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_BUTTON_HOLD, "Button"]
                // ,[Blockly.Msg.MIXLY_BUTTON_PRESSED, "ButtonPressed"]
                // ,[Blockly.Msg.MIXLY_BUTTON_RELEASED,"ButtonReleased"]
                // ,[Blockly.Msg.MIXLY_CHANGE,"NewButtonState"]
            ]), "btstate");
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

//
export const PS2_State = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.PS2_BUTTON)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_PULSEIN_STAT, "0"]
                , [Blockly.Msg.MIXLY_MICROBIT_JS_I2C_VALUE, "1"]
                // ,[Blockly.Msg.MIXLY_BUTTON_RELEASED,"ButtonReleased"]
                // ,[Blockly.Msg.MIXLY_CHANGE,"NewButtonState"]
            ]), "btstate");
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

export const PS2_Buttons = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_BUTTON)
            .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

export const PS2_stk = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        var PSSTK = [
            [Blockly.Msg.PS2_RX, "0"],
            [Blockly.Msg.PS2_RY, "1"],
            [Blockly.Msg.PS2_LX, "2"],
            [Blockly.Msg.PS2_LY, "3"],
        ];
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_stick)
            .appendField(new Blockly.FieldDropdown(PSSTK), "psstk");
        this.setOutput(true, Number);
        this.setTooltip('');
    }
};

export const PS2_init_new = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.PS2);
        this.appendValueInput('CLK')
            .appendField('CLK#');
        this.appendValueInput('DOU')
            .appendField('DOU#');
        this.appendValueInput('DIN')
            .appendField('DIN#');
        this.appendValueInput('CS')
            .appendField('CS#');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

export const PS2_vibration_new = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.PS2);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_setRumble)
            .appendField(Blockly.Msg.MIXLY_STM32_OLED_SMALL + Blockly.Msg.MSG.catActuator_motor)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "0"],
                [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "1"],
            ]), "smotorstate")
            .appendField(Blockly.Msg.MIXLY_STM32_OLED_BIG + Blockly.Msg.MSG.catActuator_motor + Blockly.Msg.MIXLY_MIXGOPE_AMPLITUDE)
        this.appendValueInput("AMP", Number)
        this.setTooltip(Blockly.Msg.MIXLY_STM32_OLED_BIG + Blockly.Msg.MSG.catActuator_motor + Blockly.Msg.MIXLY_MIXGOPE_AMPLITUDE + "0-100");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const PS2_Buttons_new = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.PS2);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.PS2_BUTTON.slice(3))
            .appendField(new Blockly.FieldDropdown(PSBUTTON), "psbt")
            .appendField(Blockly.Msg.MIXLY_WAS_PRESSED)
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

export const PS2_stk_new = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        var PSSTK = [
            [Blockly.Msg.PS2_RX, "RX"],
            [Blockly.Msg.PS2_RY, "RY"],
            [Blockly.Msg.PS2_LX, "LX"],
            [Blockly.Msg.PS2_LY, "LY"],
        ];
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.PS2);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_JOYSTICK)
            .appendField(new Blockly.FieldDropdown(PSSTK), "psstk");
        this.setOutput(true, Number);
        this.setTooltip('');
    }
};

export const sensor_use_uart_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH + "uart")
            .appendField(new Blockly.FieldDropdown([
                ["uart1", "uart1"],
                ["uart2", "uart2"]
            ]), "key");
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PM25_SENSOR, "PM"],
                [Blockly.Msg.MIXLY_GNSS_SENSOR, "GNSS"]
            ]), "sensor");


        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const pm25_get_data = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField('PM2.5' + Blockly.Msg.MSG.catSensor)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ['PM2.5', "[0]"],
                ['PM10', "[1]"],
                ['(PM2.5, PM10)', ""],
            ]), "pm")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CONCENTRATION)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_PM_CONCENTRATION_TOOLTIP);
    }
}

export const gnss_have_data = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_GNSS_SENSOR)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SERIAL_AVAILABLE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const gnss_get_data = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_GNSS_SENSOR)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GPS_TIME, "time"],
                [Blockly.Msg.MIXLY_GPS_LOCATION, "locate"],
                [Blockly.Msg.MIXLY_PULSEIN_STAT, "status"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                'time': Blockly.Msg.MIXLY_GNSS_SENSOR_GET_TIME_TOOLTIP,
                'locate': Blockly.Msg.MIXLY_GNSS_SENSOR_GET_LOCATE_TOOLTIP,
                'status': Blockly.Msg.MIXLY_GNSS_SENSOR_GET_STATUS_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
};

//mixbot/feiyi extern below:
export const robot_button_extern_get_value = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.MIXLY_BUTTON)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_POS)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.mixpy_PL_TEXT_TOP, '[0]'],
                [Blockly.Msg.mixpy_PL_TEXT_BOTTOM, '[1]'],
                [Blockly.Msg.TEXT_TRIM_LEFT, '[2]'],
                [Blockly.Msg.TEXT_TRIM_RIGHT, '[3]'],
                [Blockly.Msg.mixpy_PL_TEXT_CENTER, '[4]']
            ]), "num");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_DATA)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

export const robot_touch_extern_get_value = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_EVENT_TOUCH + Blockly.Msg.MSG.catSensor)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_EXTERN_TOUCHED + "?")
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
    }
}

export const robot_infrared_extern_get_value = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.MIXLY_ESP32_EXTERN_NEAR)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_DATA)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

export const robot_infrared_extern_grey_get_value = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.MIXLY_ESP32_EXTERN_GRAY_NEAR)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_DATA)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

export const robot_potentiometer_extern_get_value = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.MIXLY_KNOB_POTENTIOMETER)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_DATA)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

export const robot_color_extern_get_value = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.HTML_COLOUR + Blockly.Msg.MSG.catSensor)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.HTML_COLOUR + Blockly.Msg.HTML_NAME, '[0]'],
                ["RGB" + Blockly.Msg.MIXLY_MICROBIT_TYPE_TUPLE, '[1]'],
                [Blockly.Msg.MIXLY_ENVIRONMENT_BRIGHTNESS, '[2]'],
                [Blockly.Msg.MIXLY_REFLECTION_BRIGHTNESS, '[3]'],
                [Blockly.Msg.MIXLY_ALL, '']
            ]), "color");
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
    }
}

export const mixbot_sensor_extern_get_addr = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXBOT)
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_BUTTON, 'ext_button'],
                [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_EVENT_TOUCH + Blockly.Msg.MSG.catSensor, 'ext_collision'],
                [Blockly.Msg.MIXLY_ESP32_EXTERN_NEAR, 'ext_infrared'],
                [Blockly.Msg.MIXLY_KNOB_POTENTIOMETER, 'ext_potentiometer'],
                [Blockly.Msg.HTML_COLOUR + Blockly.Msg.MSG.catSensor, 'ext_color'],
                [Blockly.Msg.MIXLY_EXTERN_SONAR, 'ext_sonar']
            ]), "name")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_EXTERN_GET_ADDR)
        this.setOutput(true);
        this.setInputsInline(true);
    }
}

export const mixbot_sensor_extern_set_addr = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXBOT)
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_BUTTON, 'ext_button'],
                [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_EVENT_TOUCH + Blockly.Msg.MSG.catSensor, 'ext_collision'],
                [Blockly.Msg.MIXLY_ESP32_EXTERN_NEAR, 'ext_infrared'],
                [Blockly.Msg.MIXLY_KNOB_POTENTIOMETER, 'ext_potentiometer'],
                [Blockly.Msg.HTML_COLOUR + Blockly.Msg.MSG.catSensor, 'ext_color'],
                [Blockly.Msg.MIXLY_EXTERN_SONAR, 'ext_sonar']
            ]), "name")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_EXTERN_SET_ADDR)
        this.appendValueInput('old')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT_GESTURE);
        this.appendValueInput('new')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_UPDATE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const robot_sonar_extern_get_value = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.MIXLY_EXTERN_SONAR)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_DATA + '(cm)')
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

export const robot_sonar_extern_led = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ME_GO_MOTOR_EXTERN + Blockly.Msg.MIXLY_EXTERN_SONAR)
            .appendField(Blockly.Msg.PIN_NUMBERING)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LEFT, "0"], [Blockly.Msg.MIXLY_RIGHT, "1"]]), "mode");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_EXTERN_INDICATOR_LIGHT)
        this.appendValueInput('light')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LCD_NUMBERING);
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const sensor_weather_solo_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.weather_solo);
        this.appendValueInput('wd')
            .appendField('W-D#');
        this.appendValueInput('ws')
            .appendField('W-S#');
        this.appendValueInput('rain')
            .appendField('Rain#');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

export const sensor_weather_solo_wd = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.weather_solo);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET + Blockly.Msg.ForecastFx)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ABBR, "[0]"],
                [Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE, "[1]"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_weather_solo_ws = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.weather_solo);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET + Blockly.Msg.MIXLY_WIND_SPEED)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_SPEED + 'm/s', "[0]"],
                [Blockly.Msg.MIXLY_WIND_RATING, "[1]"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_weather_solo_rain = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.weather_solo);
        this.appendValueInput('time')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RAIN_TIME)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ACCUMULATED, "[0]"],
                [Blockly.Msg.MIXLY_AVERAGE, "[1]"]
            ]), "key");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RAIN + '(mm)');
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

//educore sensor_extern
export const educore_body_sensor = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_BODY_SENSOR);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const educore_soilhum_sensor = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_SOILHUM_SENSOR);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const educore_temphum_sensor = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_TEMP_AND_HUMIDITY_SENSOR);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const educore_infrared_sensor = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_Infrared_pyroelectric_sensor);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const educore_button_sensor_extern = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.HTML_BUTTON);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const sensor_read_humiture = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_GET)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_set_of)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_TEMPERATURE, "0"],
                [Blockly.Msg.MIXLY_Humidity, "1"]
            ]), "key");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const educore_ultrasonic_sensor = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_EXTERN_SONAR);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const ultrasonic_sensor_read_distance = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_GET)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_set_of + Blockly.Msg.ME_GO_HALL_SENSOR_DISTANCE);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const educore_temp_sensor = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_TEMP + Blockly.Msg.MIXLY_DS18B20);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const educore_camera_sensor = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_SMARTCAMERA);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const camera_sensor_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("SUB")
            .appendField(Blockly.Msg.MIXLY_SMARTCAMERA);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_PROCCED)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipFace, "FACE_RECOGNIZE"],
                [Blockly.Msg.MIXLY_FACE_CLASSIFIER, "FACE_DETECT"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const camera_sensor_result = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput("SUB")
            .appendField(Blockly.Msg.MIXLY_SMARTCAMERA);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_set_of + Blockly.Msg.MIXLY_RECOGNIZED_RESULT);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const sensor_weigh_init = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_SETUP + 'HX711/720' + Blockly.Msg.MIXLY_WEIGH_SENSOR);
        this.appendValueInput('sck')
            .appendField('#SCK');
        this.appendValueInput('dat')
            .appendField('#DAT');
        this.appendValueInput('pc')
            .appendField(Blockly.Msg.MIXLY_Calibration_ratio);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

export const weigh_sensor_get_weight = {
    init: function () {
        this.setColour(SENSOR_EXTERN_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_WEIGH_SENSOR)
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_set_of + Blockly.Msg.MIXLY_DATA)
        this.setOutput(true);
        this.setInputsInline(true);
    }
}