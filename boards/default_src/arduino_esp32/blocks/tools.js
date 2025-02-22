import * as Blockly from 'blockly/core';

const TOOLS_HUE = "#555555";
let toolsBlocks = {};
let toolsGenerators = {};

const BOARDS_PIN_DEF = {
    esp32_pin: {
        path: require("../media/ESP32.png"),
        height: 270
    },
    handbit_A: {
        path: require("../media/handbit_A.jpg"),
        height: 260
    },
    handbit_B: {
        path: require("../media/handbit_B.jpg"),
        height: 260,
        width: 460
    },
    handbit_pin_A: {
        path: require("../media/handbit_pin_A.jpg"),
        width: 270
    },
    handbit_pin_B: {
        path: require("../media/handbit_pin_B.jpg"),
        width: 290
    },
    mixgo_pin_A: {
        path: require("../media/MixGo_pin_A.png")
    },
    mixgo_pin_B: {
        path: require("../media/MixGo_pin_B.png")
    },
    PocketCard_A: {
        path: require("../media/PocketCard_A.jpg")
    },
    PocketCard_B: {
        path: require("../media/PocketCard_B.jpg")
    },
    PocketCard_pin: {
        path: require("../media/PocketCard_pin.png")
    },
    esp32_cam_pin: {
        path: require("../media/ESP32_CAM_pin.png"),
        height: 270
    },
    esp32_pico_kit_1_pin: {
        path: require("../media/ESP32_pico_kit_1.png"),
        height: 230
    },
    nodemcu_32s_pin: {
        path: require("../media/nodemcu_32s_pin.png"),
        width: 380
    },
    esp32c3_pin: {
        path: require("../media/ESP32c3.jpg")
    },
    core_esp32c3_pin: {
        path: require("../media/core_esp32c3_pin.png"),
        width: 500
    },
    esp32s3_pin: {
        path: require("../media/ESP32s3.jpg"),
        height: 350,
        width: 500
    },
    esp32s2_pin: {
        path: require("../media/ESP32s2.jpg"),
        height: 350,
        width: 500
    }
}

for (let i in BOARDS_PIN_DEF) {
    const defaultDef = {
        path: require('../media/ESP32.png'),
        height: 376,
        width: 525,
        tooltip: '',
        helpUrl: ''
    };
    let pinDef = {};
    Object.assign(pinDef, defaultDef, BOARDS_PIN_DEF[i]);

    toolsBlocks[i] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage(pinDef.path, pinDef.width, pinDef.height, "*"));
            this.setColour(TOOLS_HUE);
            this.setTooltip(pinDef.tooltip);
            this.setHelpUrl(pinDef.helpUrl);
        }
    };

    toolsGenerators[i] = function () {
        return '';
    }
}

export const blocks = toolsBlocks;
export const generators = toolsGenerators;