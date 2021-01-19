'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 140


Blockly.Blocks['communicate_irremote'] = {
    init: function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_GET_IRREMOTE_VALUE);
        this.setOutput(true,Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['communicate_buffer'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_SET+Blockly.MIXLY_ESP32_SPI_BUFFER);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_I2C_SLAVE_WRITE_ARRAY_ARRAYLENGTH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_BUFFER_SET);
    }
};

Blockly.Blocks['communicate_try_lock'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_DEVICE)
            .setCheck(null)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_TRY_TO_OCCUPY_THE_BUS)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_unlock'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_DEVICE)
            .setCheck(null)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_RELEASE_BUS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_i2c_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('SUB')
            .appendField("I2C " + Blockly.MIXLY_SETUP)
            .setCheck("var");
        this.appendValueInput("RX", Number)
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
        this.setTooltip(Blockly.MIXLY_ESP32_I2C_INIT);
    }
};

Blockly.Blocks['communicate_i2c_try_lock'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck(null)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_TRY_TO_OCCUPY_THE_BUS)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_i2c_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_I2C_SCAN1+Blockly.MIXLY_ESP32_I2C_SCAN2)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_I2C_SCAN);
    }
}

Blockly.Blocks['communicate_i2c_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(null)
            .appendField(Blockly.MIXLY_ESP32_WNUMBER);
        this.appendValueInput('data')
            .setCheck(null)
            .appendField(Blockly.Msg.HTML_VALUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_i2c_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(null)
            .appendField(Blockly.MIXLY_ESP32_RNUMBER);
        this.appendValueInput('length')
            .setCheck(null)
            .appendField(Blockly.MIXLY_I2C_BYTES);
        this.appendValueInput('data')
            .setCheck(null)
            .appendField(Blockly.SAVETO);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_i2c_writeto_then_readfrom'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(null)
            .appendField(Blockly.MIXLY_ESP32_WNUMBER);
        this.appendValueInput('write')
            .setCheck(null)
            .appendField(Blockly.Msg.HTML_VALUE);
        this.appendValueInput('read')
            .setCheck(null)
            .appendField(Blockly.MIXLY_ESP32_BUFFER_READ);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_i2c_unlock'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck(null)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_RELEASE_BUS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_spi_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_SPI_INIT);
        this.appendValueInput('sck')
            .setCheck(Number)
            .appendField('SCK');
        this.appendValueInput('mosi')
            .setCheck(Number)
            .appendField('MOSI');
        this.appendValueInput('miso')
            .setCheck(Number)
            .appendField('MISO');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_INIT_TOOLTIP);   
    }
};

Blockly.Blocks['communicate_spi_configure'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField("SPI");
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_BEGIN);
        this.appendValueInput('polarity')
            .setCheck(Number)
            .appendField('polarity');
        this.appendValueInput('phase')
            .setCheck(Number)
            .appendField('phase');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_INIT_TOOLTIP);   
    }
};

Blockly.Blocks['communicate_spi_try_lock'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("SPI")
            .setCheck(null)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_TRY_TO_OCCUPY_THE_BUS)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_spi_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("SPI")
            .setCheck("var");
        this.appendValueInput('data')
            .setCheck(null)
            .appendField(Blockly.MIXLY_SPIC_WRITE_NUM)
            .appendField(Blockly.Msg.HTML_VALUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_spi_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("SPI")
            .setCheck("var");
        this.appendValueInput('length')
            .setCheck(null)
            .appendField(Blockly.MIXLY_SPIC_READ_NUM)
            .appendField(Blockly.MIXLY_I2C_BYTES);
        this.appendValueInput('data')
            .setCheck(null)
            .appendField(Blockly.SAVETO);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_spi_write_readinto'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("SPI")
            .setCheck("var");
        this.appendValueInput('write')
            .setCheck(null)
            .appendField(Blockly.MIXLY_ESP32_WRITE);
        this.appendValueInput('read')
            .setCheck(null)
            .appendField(Blockly.MIXLY_ESP32_BUFFER_READ);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_spi_unlock'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("SPI")
            .setCheck(null)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_RELEASE_BUS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("");
    }
}

Blockly.Blocks['communicate_ow_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire '+Blockly.MIXLY_SETUP);
        this.appendValueInput('BUS')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_PIN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_INIT);
    }
};

Blockly.Blocks['communicate_ow_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ONEWIRE_READ_BIT);
        this.setOutput(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['communicate_ow_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendValueInput('byte')
            .setCheck([Number,String])
            .appendField(Blockly.MIXLY_ONEWIRE_WRITE_BIT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['communicate_ow_reset'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField('OneWire')
            .setCheck('var')
        this.appendDummyInput()
            .appendField(Blockly.blockpy_turtle_reset);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_RESET);
    }
};

Blockly.Blocks['communicate_ir_recv'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('PIN')
            .appendField(Blockly.MIXLY_IR_RECEIVE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

/*
Blockly.Blocks['i2c_init'] = Blockly.Blocks['communicate_i2c_init'];
Blockly.Blocks['i2c_read'] = Blockly.Blocks['communicate_i2c_read'];
Blockly.Blocks['i2c_write'] = Blockly.Blocks['communicate_i2c_write'];
Blockly.Blocks['i2c_scan'] = Blockly.Blocks['communicate_i2c_scan'];
Blockly.Blocks['spi_init'] = Blockly.Blocks['communicate_spi_init'];
Blockly.Blocks['spi_set'] = Blockly.Blocks['communicate_spi_set'];
Blockly.Blocks['spi_buffer'] = Blockly.Blocks['communicate_spi_buffer'];
Blockly.Blocks['spi_read'] = Blockly.Blocks['communicate_spi_read'];
Blockly.Blocks['spi_read_output'] = Blockly.Blocks['communicate_spi_read_output'];
Blockly.Blocks['spi_readinto'] = Blockly.Blocks['communicate_spi_readinto'];
Blockly.Blocks['spi_readinto_output'] = Blockly.Blocks['communicate_spi_readinto_output'];
Blockly.Blocks['spi_write'] = Blockly.Blocks['communicate_spi_write'];
Blockly.Blocks['spi_write_readinto'] = Blockly.Blocks['communicate_spi_write_readinto'];
Blockly.Blocks.i2c_master_reader2 = Blockly.Blocks.communicate_i2c_master_read;
Blockly.Blocks.i2c_available = Blockly.Blocks.communicate_i2c_available;
*/