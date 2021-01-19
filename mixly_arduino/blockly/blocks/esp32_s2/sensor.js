'use strict';

goog.provide('Blockly.Blocks.sensor');

goog.require('Blockly.Blocks');

Blockly.Blocks.sensor.HUE = 40//'#9e77c9'//40;

Blockly.Blocks['sensor_mixgoce_button_is_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('btn')
        .appendField(Blockly.MIXLY_BUTTON)
        .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgoce_button_was_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('btn')
        .appendField(Blockly.MIXLY_BUTTON)
        .setCheck(Number);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_WAS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_WAS_PRESSED);
    }
};

Blockly.Blocks['sensor_mixgoce_button_get_presses'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput('btn')
        .appendField(Blockly.MIXLY_BUTTON)
        .setCheck(Number);        
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_PRESSES);
        this.appendValueInput('VAR')
            .setCheck(Number)    
            .appendField(Blockly.MIXLY_GET_PRESSES_TIME);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN+Blockly.MIXLY_BUTTON+Blockly.MIXLY_GET_PRESSES);
    }
};

Blockly.Blocks['sensor_mixgoce_light'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

Blockly.Blocks['sensor_mixgoce_sound'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_SOUND);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};

Blockly.Blocks['sensor_mixgoce_temperature_lm35'] = {
  	init: function() {
	    this.setColour(Blockly.Blocks.sensor.HUE);
	    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_GETTEMPERATUE);
	    this.setInputsInline(true);
	    this.setOutput(true, Number);
	    this.setTooltip(Blockly.MIXLY_TOOLTIP_LM35);
  	}
};

Blockly.Blocks['number1'] = {
   	init: function() {
	    this.setColour(Blockly.Blocks.sensor.HUE);
	    this.appendDummyInput("")
	    .appendField(new Blockly.FieldDropdown([["T1", "touch_T1"], ["T2", "touch_T2"],["T3", "touch_T3"],["T4", "touch_T4"]]), 'op')
	    this.setOutput(true);
	    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
	}
};

Blockly.Blocks['sensor_mixgoce_pin_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("button")
            .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

Blockly.Blocks['sensor_mixgoce_pin_near'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET+Blockly.MIXLY_ESP32_NEAR);
        this.setOutput(true,Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

Blockly.Blocks['sensor_mixgoce_pin_near_more'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET+Blockly.MIXLY_ESP32_NEAR);
        this.appendValueInput('freq')
            .appendField(Blockly.MIXLY_FREQUENCY)
            .setCheck(Number);  
        this.appendValueInput('dc')
            .appendField(Blockly.MIXLY_ESP32_THRESHOLD)
            .setCheck(Number);              
        this.setOutput(true,Number);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

Blockly.Blocks['sensor_MSA301_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_ACCELERATION)
        .appendField(new Blockly.FieldDropdown([
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["(x,y,z)", "values"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_ACCELERATION);
        var thisBlock = this;
        this.setTooltip(function() {
            var mode = thisBlock.getFieldValue('key');
            var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.MIXLY_MICROBIT_Direction;
            var mode2 = Blockly.MIXLY_MICROBIT_JS_ACCELERATION1;
            var TOOLTIPS = {
                'x': 'x',
                'y': 'y',
                'z': 'z',
                '(x,y,z)':Blockly.MIXLY_MICROBIT_Shiliang_Direction,
            };
            return mode0 +TOOLTIPS[mode]+mode1+mode2;
        });
    }
};

var RTC_TIME_TYPE = [
[Blockly.MIXLY_YEAR, "Year"],
[Blockly.MIXLY_MONTH, "Month"],
[Blockly.MIXLY_DAY, "Day"],
[Blockly.MIXLY_HOUR, "Hour"],
[Blockly.MIXLY_MINUTE, "Minute"],
[Blockly.MIXLY_SECOND, "Second"],
[Blockly.MIXLY_WEEK, "Week"],
[Blockly.MIXLY_MIX1, "Mix1"],
[Blockly.MIXLY_MIX2, "Mix2"],
];

//传感器-实时时钟块_获取时间
Blockly.Blocks.RTC_get_time = {
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField("RTC");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RTCGETTIME);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_ESP32_RTC_GET_TIME_TOOLTIP);
    }
};

Blockly.Blocks.RTC_set_datetime = {
    init: function() {    
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField("RTC")
            .appendField(Blockly.MIXLY_RTC_TIME);
        this.appendValueInput('year')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_YEAR);
        this.appendValueInput('month')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_MONTH);   
        this.appendValueInput('day')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_DAY);   
        this.appendValueInput('hour')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_HOUR);                       
        this.appendValueInput('minute')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_MINUTE);
        this.appendValueInput('second')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_SECOND);
        this.appendValueInput('weekday')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_WEEK2);   
        this.appendValueInput('yearday')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_YEARDAY);
        this.appendValueInput('isdist')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_ISDIST);
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_ESP32_RTC_SET_DATATIME_TOOLTIP);    
    }   
};