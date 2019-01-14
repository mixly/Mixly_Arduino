'use strict';
goog.provide('Blockly.Blocks.ethernet');
goog.require('Blockly.Blocks');
Blockly.Blocks.ethernet.HUE = 0;

Blockly.Blocks['ethernet_init_begin'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_BEGIN)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ETHERNET, 'Ethernet'],[Blockly.MIXLY_ETHERNET2,'Ethernet2']]), "Ethernet");
	 this.appendValueInput('MAC')
		.setCheck(Array)
		.setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_ETHERNET_MAC_ADDRESS);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_INIT);
  }
};

Blockly.Blocks['ethernet_mac_address']={
	init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
		.appendField(new Blockly.FieldTextInput('DE'), 'VAR1')
        .appendField('-')
		.appendField(new Blockly.FieldTextInput('AD'), 'VAR2')
        .appendField('-')
		.appendField(new Blockly.FieldTextInput('BE'), 'VAR3')
        .appendField('-')
		.appendField(new Blockly.FieldTextInput('EF'), 'VAR4')
        .appendField('-')
		.appendField(new Blockly.FieldTextInput('FE'), 'VAR5')
        .appendField('-')
		.appendField(new Blockly.FieldTextInput('ED'), 'VAR6');
    this.setOutput(true, Array);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_MACADDRESS);
  }
}

Blockly.Blocks['ethernet_init_local_ip'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_LOCALIP);
    this.setOutput(true, 'IPAddress');
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_LOCALIP);
  }
};

Blockly.Blocks['ethernet_client_connect_server']={
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_CONNECT_SERVER)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput('mixly.org'), 'SERVER')
        .appendField(this.newQuote_(false));
	this.appendValueInput('PORT')
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_PORT);
    this.setOutput(true, Number);
	this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_CONNECT);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
}

Blockly.Blocks['ethernet_client_stop'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_STOP);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_STOP);
  }
};

Blockly.Blocks['ethernet_client_connected'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_CONNECTED);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_CONNECTED);
  }
};

Blockly.Blocks['ethernet_client_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_AVAILABLE);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_CLIENT_AVAILABLE);
  }
};

Blockly.Blocks['ethernet_client_print'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_PRINT);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_CLIENT_PRINT);
  }
};

Blockly.Blocks['ethernet_client_println'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_PRINTLN);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_CLIENT_PRINTLN);
  }
};

Blockly.Blocks['ethernet_client_read'] = {
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_READ);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_CLIENT_READ);
  }
};

Blockly.Blocks['ethernet_client_get_request']={
  init: function() {
    this.setColour(Blockly.Blocks.ethernet.HUE);
	this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_GET_REQUEST);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_URL)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'URL')
        .appendField(this.newQuote_(false));
	this.appendDummyInput()
        .appendField(Blockly.MIXLY_ETHERNET_CLINET_SERVER)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'SERVER')
        .appendField(this.newQuote_(false));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_ETHERNET_GET_REQUEST);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
}