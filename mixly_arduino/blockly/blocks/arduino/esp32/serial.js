'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');
Blockly.Blocks.serial.HUE = 65;
profile["default"] = profile["esp32_arduino"];
Blockly.Blocks['serial_softserial'] = {
	init: function() {
		this.setColour(Blockly.Blocks.serial.HUE);
		this.appendDummyInput("")
		.appendField(Blockly.MIXLY_SETUP)
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
		.appendField(Blockly.MIXLY_SERIAL_BEGIN);
		this.appendValueInput("RX", Number)
		.setCheck(Number)
		.appendField("RX#")
		.setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput("TX", Number)
		.appendField("TX#")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput("CONTENT", Number)
		.appendField(Blockly.MIXLY_SERIAL_BEGIN)
		.setCheck(Number);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setInputsInline(true);
		this.setTooltip(Blockly.MIXLY_TOOLTIP_SOFTSERIAL.replace('%1',Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC))
			.replace('%2',Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC)));
	}
};