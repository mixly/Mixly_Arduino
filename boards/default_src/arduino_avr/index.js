import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import {
    ArduinoEthernetBlocks,
    ArduinoTextBlocks,
    ArduinoEthernetGenerators,
    ArduinoTextGenerators,
    Procedures,
    Variables,
    Arduino
} from '@mixly/arduino';

import {
    ArduinoAVRPins,
    ArduinoAVRActuatorBlocks,
    ArduinoAVRBlynkBlocks,
    ArduinoAVRCommunicateBlocks,
    ArduinoAVRControlBlocks,
    ArduinoAVRDisplayBlocks,
    ArduinoAVREthernetBlocks,
    ArduinoAVRFactoryBlocks,
    ArduinoAVRInoutBlocks,
    ArduinoAVRListsBlocks,
    ArduinoAVRLogicBlocks,
    ArduinoAVRMathBlocks,
    ArduinoAVRPinsBlocks,
    ArduinoAVRProceduresBlocks,
    ArduinoAVRScoopBlocks,
    ArduinoAVRSensorBlocks,
    ArduinoAVRSerialBlocks,
    ArduinoAVRStorageBlocks,
    ArduinoAVRTextBlocks,
    ArduinoAVRToolsBlocks,
    ArduinoAVRVariablesBlocks,
    ArduinoAVRActuatorGenerators,
    ArduinoAVRBlynkGenerators,
    ArduinoAVRCommunicateGenerators,
    ArduinoAVRControlGenerators,
    ArduinoAVRDisplayGenerators,
    ArduinoAVREthernetGenerators,
    ArduinoAVRFactoryGenerators,
    ArduinoAVRInoutGenerators,
    ArduinoAVRListsGenerators,
    ArduinoAVRLogicGenerators,
    ArduinoAVRMathGenerators,
    ArduinoAVRPinsGenerators,
    ArduinoAVRProceduresGenerators,
    ArduinoAVRScoopGenerators,
    ArduinoAVRSensorGenerators,
    ArduinoAVRSerialGenerators,
    ArduinoAVRStorageGenerators,
    ArduinoAVRTextGenerators,
    ArduinoAVRToolsGenerators,
    ArduinoAVRVariablesGenerators
} from './';

import './css/color.css';

Blockly.Arduino = Arduino;
Blockly.generator = Arduino;

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);

Profile.default = {};
Object.assign(Profile, ArduinoAVRPins);
Object.assign(Profile.default, ArduinoAVRPins.arduino_standard);

Object.assign(
    Blockly.Blocks,
    ArduinoEthernetBlocks,
    ArduinoTextBlocks,
    ArduinoAVRActuatorBlocks,
    ArduinoAVRBlynkBlocks,
    ArduinoAVRCommunicateBlocks,
    ArduinoAVRControlBlocks,
    ArduinoAVRDisplayBlocks,
    ArduinoAVREthernetBlocks,
    ArduinoAVRFactoryBlocks,
    ArduinoAVRInoutBlocks,
    ArduinoAVRListsBlocks,
    ArduinoAVRLogicBlocks,
    ArduinoAVRMathBlocks,
    ArduinoAVRPinsBlocks,
    ArduinoAVRProceduresBlocks,
    ArduinoAVRScoopBlocks,
    ArduinoAVRSensorBlocks,
    ArduinoAVRSerialBlocks,
    ArduinoAVRStorageBlocks,
    ArduinoAVRTextBlocks,
    ArduinoAVRToolsBlocks,
    ArduinoAVRVariablesBlocks
);

Object.assign(
    Blockly.Arduino.forBlock,
    ArduinoEthernetGenerators,
    ArduinoTextGenerators,
    ArduinoAVRActuatorGenerators,
    ArduinoAVRBlynkGenerators,
    ArduinoAVRCommunicateGenerators,
    ArduinoAVRControlGenerators,
    ArduinoAVRDisplayGenerators,
    ArduinoAVREthernetGenerators,
    ArduinoAVRFactoryGenerators,
    ArduinoAVRInoutGenerators,
    ArduinoAVRListsGenerators,
    ArduinoAVRLogicGenerators,
    ArduinoAVRMathGenerators,
    ArduinoAVRPinsGenerators,
    ArduinoAVRProceduresGenerators,
    ArduinoAVRScoopGenerators,
    ArduinoAVRSensorGenerators,
    ArduinoAVRSerialGenerators,
    ArduinoAVRStorageGenerators,
    ArduinoAVRTextGenerators,
    ArduinoAVRToolsGenerators,
    ArduinoAVRVariablesGenerators
);