import * as Blockly from 'blockly/core';

const SENSOR_HUE = 40; //'#9e77c9'//40;

export const KEY_SELET = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["A", "17"],
                ["B", "16"]
            ]), "KEY");
        this.setOutput(true);
        this.setTooltip();
    }
};

export const sensor_button_init = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField("初始化");
        this.appendValueInput('key')
            .appendField("按键");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip("初始化按键");
    }
};


export const sensor_button_read = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('key')
            .appendField("按键");
        this.appendDummyInput()
            .appendField("被按下?")
        this.setInputsInline(true);
        this.setOutput(true, [Boolean, Number]);
        this.setTooltip("获取按键值");
    }
};


export const sensor_dht11 = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField("DHT11");
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("获取")
            .appendField(new Blockly.FieldDropdown([
                ["温度-℃", "0"],
                ["湿度-%", "1"],
                ["温湿度", "2"]
            ]), "TYPE")
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip("dht11,获取温湿度");
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

export const sensor_adxl345_get_acceleration = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendValueInput('SUB')
            .appendField("ADXL345")
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
