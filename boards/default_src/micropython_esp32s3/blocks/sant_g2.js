import * as Blockly from 'blockly/core';
import { Boards } from 'mixly';

const MEG1_HUE = 40;

// export const mini_g2_aht11 = {
//     init: function () {
//         var version = Boards.getSelectedBoardKey().split(':')[2]
//         if (version == "mixgo_me") { var name = 'ME G1' }
//         this.setColour(MEG1_HUE);
//         this.appendDummyInput("")
//             .appendField(name)
//             .appendField(Blockly.Msg.MIXLY_TEM_HUM + " AHT21")
//             .appendField(new Blockly.FieldDropdown([
//                 [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature"],
//                 [Blockly.Msg.MIXLY_GETHUMIDITY, "humidity"]
//             ]), "key");
//         this.setOutput(true, Number);
//         this.setInputsInline(true);
//         var thisBlock = this;
//         this.setTooltip(function () {
//             var mode = thisBlock.getFieldValue('key');
//             var TOOLTIPS = {
//                 "temperature": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
//                 "relative_humidity": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP
//             };
//             return TOOLTIPS[mode]
//         });
//     }
// };

// export const mini_g2_hp203 = {
//     init: function () {
//         var version = Boards.getSelectedBoardKey().split(':')[2]
//         if (version == "mixgo_me") { var name = 'ME G1' }
//         this.setColour(MEG1_HUE);
//         this.appendDummyInput("")
//             .appendField(name)
//             .appendField(Blockly.Msg.MIXLY_Altitude + Blockly.Msg.MSG.catSensor + " HP203X")
//             .appendField(new Blockly.FieldDropdown([
//                 [Blockly.Msg.MIXLY_GETPRESSURE, "pressure()"],
//                 [Blockly.Msg.MIXLY_GETTEMPERATUE, "temperature()"],
//                 [Blockly.Msg.MIXLY_GET_ALTITUDE, "altitude()"],
//             ]), "key");
//         this.setOutput(true, Number);
//         this.setInputsInline(true);
//     }
// };

// export const mini_g2_varistor = {
//     init: function () {
//         var version = Boards.getSelectedBoardKey().split(':')[2]
//         if (version == "mixgo_me") { var name = 'ME G1' }
//         this.setColour(MEG1_HUE);
//         this.appendDummyInput()
//             .appendField(name)
//             .appendField(Blockly.Msg.MIXLY_MIXGO_NOVA_POTENTIAL_NUM);
//         this.setOutput(true, Number);
//         this.setInputsInline(true);
//     }
// };

export const mini_g2_rfid_readid = {
    init: function () {
        var version = Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_me") { var name = 'ME G1' }
        this.setColour(MEG1_HUE);
        this.appendDummyInput()
            .appendField(name)
            .appendField("RFID" + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RFID_READ_CARD_UID);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const mini_g2_rfid_readcontent = {
    init: function () {
        var version = Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_me") { var name = 'ME G1' }
        this.setColour(MEG1_HUE);
        this.appendDummyInput()
            .appendField(name)
            .appendField("RFID" + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const mini_g2_rfid_write = {
    init: function () {
        var version = Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_me") { var name = 'ME G1' }
        this.setColour(MEG1_HUE);
        this.appendDummyInput()
            .appendField(name)
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_WRITE);
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_WRITE_NUM)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const mini_g2_rfid_write_outcome = {
    init: function () {
        var version = Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_me") { var name = 'ME G1' }
        this.setColour(MEG1_HUE);
        this.appendDummyInput()
            .appendField(name)
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_WRITE);
        this.appendValueInput('SECTOR')
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX)
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_WRITE_NUM)
        this.appendDummyInput()
            .appendField(Blockly.Msg.RETURN_SUCCESS_OR_NOT)
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const mini_g2_rfid_status = {
    init: function () {
        var version = Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_me") { var name = 'ME G1' }
        this.setColour(MEG1_HUE);
        this.appendDummyInput()
            .appendField(name)
            .appendField("RFID");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_RFID_SCAN_OK, "True"],
                [Blockly.Msg.MIXLY_RFID_SCAN_NOTAGERR, "None"],
                [Blockly.Msg.MIXLY_RFID_SCAN_ERROR, "False"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};