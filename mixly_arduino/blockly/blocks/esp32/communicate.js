'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 140


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

Blockly.Blocks['communicate_i2c_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_ESP32_RNUMBER);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_BIT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

Blockly.Blocks['communicate_i2c_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .appendField("I2C")
            .setCheck("var");
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_ESP32_WNUMBER);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

Blockly.Blocks['communicate_i2c_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_ESP32_I2C_SCAN1);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_I2C_SCAN2);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_I2C_SCAN);
    }
}

Blockly.Blocks['communicate_spi_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_SPI_INIT);
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_BEGIN);
        this.appendValueInput('polarity')
            .setCheck(Number)
            .appendField('polarity');
        this.appendValueInput('phase')
            .setCheck(Number)
            .appendField('phase');
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

Blockly.Blocks['communicate_spi_set'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.blockpy_turtle_setxy + " SPI")
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_BEGIN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_SET);
    }
};

Blockly.Blocks['communicate_spi_buffer'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_SET + 'SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_ESP32_SPI_BUFFER);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_BUFFER_SET);
    }
};

Blockly.Blocks['communicate_spi_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_READ);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.MIXLY_MICROBIT_JS_I2C_BIT)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READ);
    }
}

Blockly.Blocks['communicate_spi_read_output'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SERIAL_READ);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER2 + Blockly.MIXLY_MICROBIT_JS_I2C_BIT + ',' + Blockly.MIXLY_ESP32_SPI_OUTPUT);
        this.appendValueInput('val')
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READ_OUTPUT);
    }
}

Blockly.Blocks['communicate_spi_readinto'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck('var')
            .appendField(Blockly.MIXLY_SERIAL_READ + Blockly.MIXLY_ESP32_SPI_BUFFER);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READINTO);
    }
}

Blockly.Blocks['communicate_spi_readinto_output'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck('var')
            .appendField(Blockly.MIXLY_SERIAL_READ + Blockly.MIXLY_ESP32_SPI_BUFFER);
        this.appendValueInput('val')
            .setCheck(Number)
            .appendField(',' + Blockly.MIXLY_ESP32_SPI_OUTPUT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_READINTO_OUTPUT);
    }
}

Blockly.Blocks['communicate_spi_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_WRITE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_WRITE);
    }
};

Blockly.Blocks['communicate_spi_write_readinto'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('SPI');
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_WRITE)
            // .appendField(new Blockly.FieldDropdown([
            //     [Blockly.MIXLY_MICROBIT_JS_I2C_BIT, "byte"],
            //     [Blockly.MIXLY_ESP32_SPI_BUFFER, "buffer"]
            // ]), "op");
        this.appendValueInput('val')
            .setCheck('var')
            .appendField(',' + Blockly.MIXLY_ESP32_BUFFER_READ);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SPI_WRITE_READINTO);
    }
};

Blockly.Blocks.communicate_i2c_master_read = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("I2C");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_READ);
        this.setOutput(true, Number);
    }
};

Blockly.Blocks.communicate_i2c_available = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_ESP32_READ + "I2C");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_SUCCESS);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.MIXLY_ESP32_I2C_AVAILABLE);
    }
};

Blockly.Blocks.i2c_slave_onreceive = {
    init: function() {
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

Blockly.Blocks['communicate_ow_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendValueInput('BUS')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_SETUP+' '+Blockly.MIXLY_PIN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_INIT);
    }
};

Blockly.Blocks['communicate_ow_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_ONEWIRE_SCAN);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.MIXLY_ESP32_OW_SCAN);
    }
};

Blockly.Blocks['communicate_ow_read'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_ONEWIRE_READ);
        this.setOutput(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_READ);
    }
};

Blockly.Blocks['communicate_ow_write'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField('OneWire');
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_WRITE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.LANG_MATH_STRING, "write"],
                [Blockly.LANG_MATH_BYTE, "writebyte"]
            ]), "op");
        this.appendValueInput('byte')
            .setCheck([Number,String]);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_WRITE);
    }
};

Blockly.Blocks['communicate_ow_select'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_ONEWIRE_SELECT)
        this.appendValueInput('byte')
            .setCheck(String)
            .appendField("ROM");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_SELECT);
    }
};


Blockly.Blocks['communicate_ow_reset'] = {
    init: function() {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('VAR')
            .setCheck('var')
            .appendField(Blockly.MIXLY_ESP32_ONEWIRE_RESET);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.MIXLY_ESP32_OW_RESET);
    }
};

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