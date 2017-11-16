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
  }
};

Blockly.Blocks.gps_data_available = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
	this.appendDummyInput()
        .appendField(Blockly.MIXLY_GPS_DATA_AVAILABLE);
	this.setOutput(true, Boolean);
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
  }
};

Blockly.Blocks.gps_getData_xxx = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
	this.appendDummyInput()
		.appendField(Blockly.MIXLY_GPS_GET)
		.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_GPS_LOCATION_LAT, "location.lat"],[Blockly.MIXLY_GPS_LOCATION_LNG, "location.lng"], [Blockly.MIXLY_GPS_DATE_YEAR, "date.year"], [Blockly.MIXLY_GPS_DATE_MONTH, "date.month"], [Blockly.MIXLY_GPS_DATE_DAY, "date.day"], [Blockly.MIXLY_GPS_TIME_HOUR, "time.hour"], [Blockly.MIXLY_GPS_TIME_MINUTE, "time.minute"], [Blockly.MIXLY_GPS_TIME_SECOND, "time.second"], [Blockly.MIXLY_GPS_TIME_CENTISECOND, "time.centisecond"]]), "WHAT");
	this.setOutput(true, Number);
  }
};

//³¬Éù²¨²â¾à
Blockly.Blocks.chaoshengbo = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_CHAOSHENGBO)
            .appendField('Trig#')
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN1")
            .appendField(' Echo#')
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN2");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
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

//DHT11´«¸ÐÆ÷
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

//DS18B20ÎÂ¶È´«¸ÐÆ÷
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
    }
};

//DS1302 RTC
Blockly.Blocks.DS1302_init = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("RST", Number)
            .appendField(Blockly.MIXLY_DS1302_INITPIN)
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
    }
}

Blockly.Blocks.DS1302_set_date = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendValueInput("YEAR", Number)
            .appendField(Blockly.MIXLY_SETDATE)
            .appendField(Blockly.MIXLY_YEAR)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(Number);
        this.appendValueInput("MONTH")
            .appendField(Blockly.MIXLY_MONTH)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(Number);
        this.appendValueInput("DAY")
            .appendField(Blockly.MIXLY_DAY)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(Number);
        this.appendValueInput("HOUR", Number)
            .appendField(Blockly.MIXLY_HOUR)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(Number);
        this.appendValueInput("MINUTE")
            .appendField(Blockly.MIXLY_MINUTE)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(Number);
        this.appendValueInput("SECOND")
            .appendField(Blockly.MIXLY_SECOND)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
}


Blockly.Blocks.DS1302_get_date = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.MIXLY_DATEFORMATE);
        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};


Blockly.Blocks.DS1302_get_time = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.MIXLY_TIMEFORMATE);
        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};