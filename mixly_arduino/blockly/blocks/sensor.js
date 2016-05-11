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