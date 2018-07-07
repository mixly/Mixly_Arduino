'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 140//'#3288dd';

Blockly.Blocks['radio_ons'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON,'on'],[Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF,'off'],[Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_RESET,'reset']]), "type")
            .appendField(Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_WIFI);
        this.setInputsInline(true);
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('type');
        var mode0 =Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_WIFI;
        var TOOLTIPS = {
        'on':Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON,
        'off':Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF,
        'reset':Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_RESET
      };
      return TOOLTIPS[mode]+mode0;
    });
    }
};

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
      "tooltip" : Blockly.MIXLY_MICROBIT_Configure_radio1,
      "message0" : Blockly.MIXLY_MICROBIT_Configure_radio,
      "args0" : [{
          "min" : 4,
          "value" : 32,
          "type" : "input_value",
          "max" : 251,
          "name" : "length"
        }, {
          "type" : "input_dummy"
        }, {
          "min" : 1,
          "value" : 3,
          "type" : "input_value",
          "max" : 32,
          "name" : "queue"
        }, {
          "type" : "input_dummy"
        }, {
          "min" : 0,
          "value" : 7,
          "type" : "input_value",
          "max" : 100,
          "name" : "channel"
        }, {
          "type" : "input_dummy"
        }, {
		   "name" : "power",         
		  // "options" : [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
          "type" : "input_value"
        }, {
          "type" : "input_dummy"
        }, {
          "name" : "data_rate",
          //"options" : [["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
          "type" : "input_value"
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
        this.setTooltip(Blockly.MIXLY_MICROBIT_Send_message1);
    }
}

Blockly.Blocks['microbit_radio_receive'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.communicate.HUE,
      "output" : "String",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.receive",
      "tooltip" :  Blockly.MIXLY_MICROBIT_Receive_message,
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
       .appendField(Blockly.MIXLY_FREQUENCY)
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
        //this.appendDummyInput()
            //.appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            //.appendField(new Blockly.FieldCheckbox(false), "is_repeated");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
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
        //this.appendDummyInput()
            //.appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            //.appendField(new Blockly.FieldCheckbox(false), "is_repeated");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
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
    this.setFieldValue("15","mosi")
    this.setFieldValue("14","miso")
    this.setFieldValue("13","sck")
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
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_SPI_WRITE);
    }
};

Blockly.Blocks['network_init'] = {
    init: function () {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_MODE)
            .appendField(new Blockly.FieldDropdown([['STA', "STA"], ['AP', "AP"]]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_open'] = {
    init: function () {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_NETWORK_WIFI_OPEN, "True"], [Blockly.MIXLY_NETWORK_WIFI_CLOSE, "False"]]), "op");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_FLAG)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_scan'] = {
    init: function () {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_SCAN+Blockly.MIXLY_BELONG)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["ssid", "0"], ["bssid", "1"], ["channel", "2"], ["RSSI", "3"], ["authmode", "4"], ["hidden", "5"], [Blockly.MIXLY_NETWORK_WIFI_SCAN_ATTRIBUTE, "all"]]), "op");    
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_connect'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")    
            .appendField(Blockly.MIXLY_ESP32_NETWORK_CONNECT);
        this.appendValueInput('id')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_NETWORK_ID);
        this.appendValueInput('password')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_NETWORK_PASSWORD);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_wifi_connect'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.storage.HUE,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.receive",
      "tooltip" :  '',
      "message0" : Blockly.MIXLY_NETWORK_WIFI_CONNECT
    });
    this.setOutput(true,Boolean);
  }
};

Blockly.Blocks['network_get_connect'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")    
            .appendField(Blockly.MIXLY_ESP32_NETWORK_GET_CONNECT);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ESP32_NETWORK_IP, "0"], [Blockly.MIXLY_ESP32_NETWORK_MASK, "1"], [Blockly.MIXLY_ESP32_NETWORK_GATEWAY, "2"], ["DNS", "3"]]), "mode");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_stop'] = {
    init: function () {
        this.setColour(Blockly.Blocks.storage.HUE);
       this.appendDummyInput("")    
            .appendField(Blockly.MIXLY_ESP32_NETWORK_STOP_CONNECT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_get_wifi'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")    
            .appendField(Blockly.MIXLY_ESP32_NETWORK_GET_WIFI);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_NETWORK_WIFI_ESSID, "essid"], [Blockly.MIXLY_NETWORK_WIFI_CHANNEL, "channel"]]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_ap_connect'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")    
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET);
        this.appendValueInput('essid')
            .setCheck(String)
            .appendField(Blockly.MIXLY_NETWORK_WIFI_ESSID);
        this.appendValueInput('channel')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_NETWORK_WIFI_CHANNEL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.i2c_master_reader2 = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_MASTER_READ2);
        this.setOutput(true, Number);
    }
};
Blockly.Blocks.i2c_available = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_AVAILABLE);
        this.setOutput(true, Boolean);
    }
};

Blockly.Blocks.i2c_slave_onreceive = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_I2C_SLAVE_ONRECEIVE)
            .setCheck(Number);
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['bluetooth_setup'] = {
  init: function() {
   this.setColour(Blockly.Blocks.communicate.HUE);
   this.appendValueInput("man", String)
       //.appendField(Blockly.MIXLY_SETUP)
       .appendField(Blockly.MIXLY_ESP32_BLUETOOTH_SETUP+Blockly.MIXLY_ESP32_BLUETOOTH_ADV_MAN)
       .setCheck(String)
       .setAlign(Blockly.ALIGN_RIGHT);
   this.appendValueInput("dev", String)
       .appendField(Blockly.MIXLY_ESP32_BLUETOOTH_ADV_DEV)
       .setCheck(String)
       .setAlign(Blockly.ALIGN_RIGHT);
   this.setPreviousStatement(true, null);
   this.setNextStatement(true, null);
   this.setInputsInline(true);
   }
  };

Blockly.Blocks['bluetooth_open'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_4DIGITDISPLAY_STOPWATCH_START, "True"], [Blockly.MIXLY_STOP, "False"]]), "op");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_BLUETOOTH_FLAG)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['bluetooth_init'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ESP32_BLUETOOTH_START, "init"], [Blockly.MIXLY_MICROBIT_Turn_off_display, "deinit"]]), "op");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_BLUETOOTH)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['bluetooth_connect'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_BDA);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
};

Blockly.Blocks['bluetooth_services'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_BLUETOOTH_SERVICES);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
};

Blockly.Blocks['bluetooth_conns'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_BLUETOOTH_CONNS);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks['bluetooth_is_scanning'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_BLUETOOTH_SCANNING);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks['bluetooth_scan'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_4DIGITDISPLAY_STOPWATCH_START, "start"], [Blockly.MIXLY_STOP, "stop"]]), "op");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_BLUETOOTH_SCAN)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['bluetooth_service_setup'] = {
  init: function() {
   this.setColour(Blockly.Blocks.communicate.HUE);
   this.appendValueInput("UUID",String)
       //.appendField(Blockly.MIXLY_SETUP)
       .appendField(Blockly.MIXLY_ESP32_SERVICE_SETUP)
       .appendField("UUID")
       .setCheck(String)
       .setAlign(Blockly.ALIGN_RIGHT);
   this.appendDummyInput("")   
       .appendField("is_primary")
   this.appendDummyInput()
       .appendField(new Blockly.FieldDropdown([["True", "True"], ["False", "False"]]), "op");
   this.setPreviousStatement(true, null);
   this.setNextStatement(true, null);
   this.setInputsInline(true);
   }
  };

  Blockly.Blocks['network_server'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")    
            .appendField(Blockly.MIXLY_ESP32_NETWORK_SERVER);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};