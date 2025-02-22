import * as Blockly from 'blockly/core';
import { sensor_LTR308 } from './sensor_onboard';

const SENSOR_HUE = 40; //'#9e77c9'//40;

export const sensor_mixgo_button_is_pressed = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('btn')
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_IS_PRESSED);
    }
};

export const sensor_mixgo_button_was_pressed = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('btn')
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WAS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_WAS_PRESSED);
    }
};

export const sensor_mixgo_button_get_presses = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('btn')
            .appendField(Blockly.Msg.MIXLY_BUTTON)
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

export const sensor_mixgo_button_attachInterrupt = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput("btn")
            .appendField(Blockly.Msg.MIXLY_ESP32_INTERRUPT)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.Msg.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.Msg.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING or machine.Pin.IRQ_FALLING)"]]), "mode");
        this.appendValueInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    }
};


export const sensor_mixgo_extern_button_is_pressed = {
    init: function () {
        this.setColour(SENSOR_HUE);
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
        this.setColour(SENSOR_HUE);
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
        this.setColour(SENSOR_HUE);
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
        this.setColour(SENSOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.Msg.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.Msg.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING or machine.Pin.IRQ_FALLING)"]]), "mode");
        this.appendValueInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    }
};

export const sensor_mpu9250_attachGestureInterrupt = {
    init: function () {
        this.setColour(SENSOR_HUE);
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

export const sensor_mpu9250_gesture = {
    init: function () {
        this.setColour(SENSOR_HUE);
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
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
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


export const sensor_adxl345_get_acceleration = {
    init: function () {
        this.setColour(SENSOR_HUE);
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
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_LIGHT_LEVEL)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SENSOR_LIGHT_LEVEL_TOOLTIP);
    }
};

export const sensor_mpu9250_calibrate_compass = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS);
    }
};
// export const sensor_mpu9250_is_compass_calibrated = {
//     init: function(){
//         this.setColour(SENSOR_HUE);
//         this.appendValueInput('SUB')
//             .setCheck("var");
//         this.appendDummyInput()
//             .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_IS_COMPASS_CALIBRATED)
//         this.setOutput(true, Number);
//         this.setInputsInline(true);
//         this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_IS_COMPASS_CALIBRATED1);
//     }
// };
// export const sensor_mpu9250_compass_heading = {
//     init: function(){
//         this.setColour(SENSOR_HUE);
//         this.appendValueInput('SUB')
//             .setCheck("var");
//         this.appendDummyInput()
//             .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE)
//         this.setOutput(true, Number);
//         this.setInputsInline(true);
//     }
// };

export const sensor_mpu9250_temperature = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
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
        this.setColour(SENSOR_HUE);
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

export const sensor_distance_hrsc04 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CHAOSHENGBO)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_CHAOSHENGBO);
    }
};

//传感器-实时时钟块_获取时间
export const RTC_get_time = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("RTC")
            .setCheck("var");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RTCGETTIME);
        // this.appendDummyInput("").setAlign(Blockly.inputs.Align.RIGHT).appendField('myRTC');
        // this.appendDummyInput("").setAlign(Blockly.inputs.Align.RIGHT).appendField(new Blockly.FieldDropdown(RTC_TIME_TYPE), "TIME_TYPE");
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_RTC_GET_TIME_TOOLTIP);
        // var thisBlock = this;
        //     this.setTooltip(function() {
        //     var mode = thisBlock.getFieldValue('TIME_TYPE');
        //     var mode0 = Blockly.Msg.MIXLY_RTCGETTIME;
        //     var TOOLTIPS = {
        //     'Year':Blockly.Msg.MIXLY_YEAR,
        //     'Month':Blockly.Msg.MIXLY_MONTH,
        //     'Day':Blockly.Msg.MIXLY_DAY,
        //     'Hour':Blockly.Msg.MIXLY_HOUR,
        //     'Minute':Blockly.Msg.MIXLY_MINUTE,
        //     'Second':Blockly.Msg.MIXLY_SECOND,
        //     'Week':Blockly.Msg.MIXLY_WEEK,
        //     'Mix1':Blockly.Msg.MIXLY_MIX1,
        //     'Mix2':Blockly.Msg.MIXLY_MIX2
        //   };
        // return mode0 +TOOLTIPS[mode];
        // });
    }
};

export const RTC_set_time = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RTCSETTIME)
            .appendField('myRTC');
        this.appendValueInput("hour")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_HOUR);
        this.appendValueInput("minute")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_MINUTE);
        this.appendValueInput("second")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_SECOND);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(false);
        this.setTooltip(Blockly.Msg.MIXLY_RTCSETTIME + Blockly.Msg.MIXLY_MIX2);
    }
};

export const RTC_set_date = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RTCSETDATE)
            .appendField('myRTC');
        this.appendValueInput("year")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_YEAR);
        this.appendValueInput("month")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_MONTH);
        this.appendValueInput("day")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("  " + Blockly.Msg.MIXLY_DAY);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_RTCSETDATE + Blockly.Msg.MIXLY_MIX1);
    }
};

export const sensor_compass_reset = {
    init: function () {
        this.setColour(SENSOR_HUE);
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

export const HCSR04 = {
    init: function () {
        this.setColour(SENSOR_HUE);
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

export const sensor_dht11 = {
    init: function () {
        var WHAT = [[Blockly.Msg.MIXLY_GETTEMPERATUE, 'temperature'], [Blockly.Msg.MIXLY_GETHUMIDITY, 'relative_humidity'], [Blockly.Msg.MIXLY_DHT11_T_H, 'tempandhum']];
        this.setColour(SENSOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(new Blockly.FieldDropdown([['DHT11', 'dht11']
                , ['DHT22', 'dht22']//, ['DHT21', '21'], ['DHT33', '33'], ['DHT44', '44']
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
        this.setColour(SENSOR_HUE);
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
        this.setColour(SENSOR_HUE);
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

export const number1 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["1", "touch1"], ["2", "touch2"]]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const sensor_mixgo_pin_pressed = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput("button")
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

export const sensor_mixgo_extern_pin_near = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_NEAR);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_EXTERN_VALUE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP + Blockly.Msg.MIXLY_ESP32_NEAR);
    }
};


export const sensor_mixgo_pin_near = {
    init: function () {
        this.setColour(SENSOR_HUE);
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

export const RTC_set_datetime = {
    init: function () {
        this.setColour(SENSOR_HUE);
        // this.appendDummyInput()
        this.appendValueInput('SUB')
            .appendField("RTC")
            .appendField(Blockly.Msg.MIXLY_RTC_TIME)
            .setCheck("var");
        this.appendValueInput('year')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_YEAR);
        this.appendValueInput('month')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_MONTH);
        this.appendValueInput('day')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_DAY);
        this.appendValueInput('weekday')
            .setCheck(Number)
            .appendField("         " +
                Blockly.Msg.MIXLY_WEEK2);
        this.appendValueInput('hour')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_HOUR);
        this.appendValueInput('minute')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_MINUTE);
        this.appendValueInput('second')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_SECOND);
        this.appendValueInput('millisecond')
            .setCheck(Number)
            .appendField("         " + Blockly.Msg.MIXLY_MILLISECOND);
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_RTC_SET_DATATIME_TOOLTIP);
    }
};

export const sensor_rtc_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("RTC")
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .setCheck("var");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SENSOR_RTC_INT_TOOLTIP);
    }
};

export const sensor_use_i2c_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH + "I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([
                ["MPU9250", "MPU9250"],
                ["BMP280", "BMP280"],
                ["SHT20", "SHT20"],
                ["ADXL345", "ADXL345"]
            ]), "key");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setFieldValue("MPU9250", "key");
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_USE_I2C_TOOLTIP;
            var TOOLTIPS = {
                "MPU9250": "MPU9250",
                "SHT20": "SHT20",
                "BMP280": "BMP280",
                "ADXL345": "ADXL345"
            };
            return mode0 + TOOLTIPS[mode]
        });
    }
};

export const sensor_bmp = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("BMP280")
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
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("SHT20")
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

export const sensor_ds18x20 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField("DS18x20 " + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GETTEMPERATUE);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_SENSOR_DS18X20_TOOLTIP);
    }
};

export const sensor_mpu9250_get_magnetic = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
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
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("MPU9250")
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

export const sensor_lm35 = {
    init: function () {
        this.setColour(SENSOR_HUE);
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

export const sensor_button_is_pressed = sensor_mixgo_button_is_pressed;
export const sensor_button_was_pressed = sensor_mixgo_button_was_pressed;
export const sensor_button_get_presses = sensor_mixgo_button_get_presses;
export const sensor_pin_pressed = sensor_mixgo_pin_pressed;
export const sensor_pin_near = sensor_mixgo_pin_near;
export const sensor_mixgo_light = sensor_LTR308;
export const sensor_light = sensor_mixgo_light;
export const sensor_get_acceleration = sensor_mpu9250_get_acceleration;
export const dht11 = sensor_dht11;
export const sensor_field_strength = sensor_mpu9250_field_strength;
export const sensor_temperature = sensor_mpu9250_temperature