'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 140;
Blockly.Blocks['microbit_radio_on'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.on",
      "tooltip" : "Turn on the radio. This needs to be explicitly called since the radio draws power and takes up memory that you may otherwise need.",
      "message0" : Blockly.MIXLY_MICROBIT_Switch_on_radio
    });
  }
};

Blockly.Blocks['microbit_radio_off'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.off",
      "tooltip" : "Turn off the radio, thus saving power and memory.",
      "message0" : Blockly.MIXLY_MICROBIT_Switch_off_radio
    });
  }
};

Blockly.Blocks['microbit_radio_config'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.config",
      "tooltip" : "Configure the radio. The length defines how long an individual message can be. The queue specifies the number of messages that can be stored on the incoming message queue. The channel defines the frequency to which the radio is tuned. The power specifies the strength of the broadcast signal. The data rate indicates the speed at which data is transferred.",
      "message0" : Blockly.MIXLY_MICROBIT_Configure_radio,
      "args0" : [{
          "min" : 4,
          "value" : 32,
          "type" : "field_number",
          "max" : 251,
          "name" : "length"
        }, {
          "type" : "input_dummy"
        }, {
          "min" : 1,
          "value" : 3,
          "type" : "field_number",
          "max" : 32,
          "name" : "queue"
        }, {
          "type" : "input_dummy"
        }, {
          "min" : 0,
          "value" : 7,
          "type" : "field_number",
          "max" : 100,
          "name" : "channel"
        }, {
          "type" : "input_dummy"
        }, {
          "min" : 0,
          "value" : 0,
          "type" : "field_number",
          "max" : 7,
          "name" : "power"
        }, {
          "type" : "input_dummy"
        }, {
          "name" : "data_rate",
          "options" : [["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
          "type" : "field_dropdown"
        }
      ]
    });
  }
};

Blockly.Blocks['microbit_radio_reset'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.reset",
      "tooltip" : "Reset the radio to default settings.",
      "message0" : Blockly.MIXLY_MICROBIT_Reset_radio
    });
  }
};

Blockly.Blocks['microbit_radio_send_string'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.send",
      "tooltip" : "Broadcast a text message.",
      "message0" : Blockly.MIXLY_MICROBIT_Send_message,
      "args0" : [{
          "check" : "String",
          "type" : "input_value",
          "name" : "message"
        }
      ]
    });
  }
};

Blockly.Blocks['radio_send_string'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_SEND_STRING);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['microbit_radio_receive'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "output" : "String",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.receive",
      "tooltip" : "Receive a message.",
      "message0" : Blockly.MIXLY_MICROBIT_Receive_message
    });
  }
};

Blockly.Blocks['i2c_init'] = {
  init: function() {
   this.setColour(Blockly.Blocks.communicate.HUE);
   this.appendValueInput("RX", Number)
       //.appendField(Blockly.MIXLY_SETUP)
       .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_SETUP)
     .appendField("sda")
       .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("TX", Number)
     .appendField("scl")
       .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('freq')
            .setCheck(Number)
     .appendField("频率")
     .setAlign(Blockly.ALIGN_RIGHT);
     this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  this.setInputsInline(true);
  }
};

Blockly.Blocks['i2c_read'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_READ_ADDRESS);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_BIT);
        this.appendDummyInput()
            // .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_FORMAT)
            // .appendField(new Blockly.FieldDropdown([
            //     ["Int8LE", "NumberFormat.Int8LE"],
            //     ["UInt8LE", "NumberFormat.UInt8LE"],
            //     ["Int16LE", "NumberFormat.Int16LE"],
            //     ["UInt16LE", "NumberFormat.UInt16LE"],
            //     ["Int32LE", "NumberFormat.Int32LE"],
            //     ["Int8BE", "NumberFormat.Int8BE"],
            //     ["UInt8BE", "NumberFormat.UInt8BE"],
            //     ["Int16BE", "NumberFormat.Int16BE"],
            //     ["UInt16BE", "NumberFormat.UInt16BE"],
            //     ["Int32BE", "NumberFormat.Int32BE"]
            // ]), "format")
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'true'],
                [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'false']
            ]), "is_repeated");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['i2c_write'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE_ADDRESS);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.appendDummyInput()
            // .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_FORMAT)
            // .appendField(new Blockly.FieldDropdown([
            //     ["Int8LE", "NumberFormat.Int8LE"],
            //     ["UInt8LE", "NumberFormat.UInt8LE"],
            //     ["Int16LE", "NumberFormat.Int16LE"],
            //     ["UInt16LE", "NumberFormat.UInt16LE"],
            //     ["Int32LE", "NumberFormat.Int32LE"],
            //     ["Int8BE", "NumberFormat.Int8BE"],
            //     ["UInt8BE", "NumberFormat.UInt8BE"],
            //     ["Int16BE", "NumberFormat.Int16BE"],
            //     ["UInt16BE", "NumberFormat.UInt16BE"],
            //     ["Int32BE", "NumberFormat.Int32BE"]
            // ]), "format")
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'true'],
                [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'false']
            ]), "is_repeated");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks['spi_init'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "message0" : Blockly.MIXLY_MICROBIT_SPI_INIT,
      "args0" : [{
          "value" : 1000000,
          "type" : "field_number",
          "name" : "freq"
        }, {
          "type" : "input_dummy"
        }, {
          "value" : 8,
          "type" : "field_number",
          "name" : "bits"
        }, {
          "type" : "input_dummy"
        }, {
          "value" : 0,
          "type" : "field_number",
          "name" : "mode"
        }, {
          "type" : "input_dummy"
        }, {
          "name" : "mosi",
          "options" : profile.default.digital,
          "type" : "field_dropdown"
        }, {
          "name" : "miso",
          "options" : profile.default.digital,
          "type" : "field_dropdown"
        }, {
          "name" : "sck",
          "options" : profile.default.digital,
          "type" : "field_dropdown"
        }
      ]
    });
  }
};

Blockly.Blocks['spi_write'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SPI_WRITE);

        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}
