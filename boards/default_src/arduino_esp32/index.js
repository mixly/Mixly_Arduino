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
    ArduinoAVRSensorGenerators,
    ArduinoAVRSerialGenerators,
    ArduinoAVRStorageGenerators,
    ArduinoAVRTextGenerators,
    ArduinoAVRToolsGenerators,
    ArduinoAVRVariablesGenerators
} from '@mixly/arduino-avr';

import {
    ArduinoESP32Pins,
    ArduinoESP32ActuatorBlocks,
    ArduinoESP32CommunicateBlocks,
    ArduinoESP32ControlBlocks,
    ArduinoESP32EthernetBlocks,
    ArduinoESP32HandbitBlocks,
    ArduinoESP32InoutBlocks,
    ArduinoESP32MixePiBlocks,
    ArduinoESP32MixGoBlocks,
    ArduinoESP32PinsBlocks,
    ArduinoESP32PocketCardBlocks,
    ArduinoESP32SensorBlocks,
    ArduinoESP32SerialBlocks,
    ArduinoESP32SidanBlocks,
    ArduinoESP32StorageBlocks,
    ArduinoESP32ToolsBlocks,
    ArduinoESP32ActuatorGenerators,
    ArduinoESP32CommunicateGenerators,
    ArduinoESP32ControlGenerators,
    ArduinoESP32EthernetGenerators,
    ArduinoESP32HandbitGenerators,
    ArduinoESP32InoutGenerators,
    ArduinoESP32MixePiGenerators,
    ArduinoESP32MixGoGenerators,
    ArduinoESP32PinsGenerators,
    ArduinoESP32PocketCardGenerators,
    ArduinoESP32SensorGenerators,
    ArduinoESP32SerialGenerators,
    ArduinoESP32SidanGenerators,
    ArduinoESP32StorageGenerators,
    ArduinoESP32ToolsGenerators,
    ArduinoESP32ZhHans,
    ArduinoESP32ZhHant,
    ArduinoESP32En
} from './';

import addBoardFSItem from './mixly-modules/loader';

import './css/color_esp32_arduino.css';

Blockly.Arduino = Arduino;
Blockly.generator = Arduino;

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);

Profile.default = {};
Object.assign(Profile, ArduinoESP32Pins);
Object.assign(Profile.default, ArduinoESP32Pins.arduino_esp32);

Object.assign(Blockly.Lang.ZhHans, ArduinoESP32ZhHans);
Object.assign(Blockly.Lang.ZhHant, ArduinoESP32ZhHant);
Object.assign(Blockly.Lang.En, ArduinoESP32En);

addBoardFSItem();

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
    ArduinoAVRSensorBlocks,
    ArduinoAVRSerialBlocks,
    ArduinoAVRStorageBlocks,
    ArduinoAVRTextBlocks,
    ArduinoAVRToolsBlocks,
    ArduinoAVRVariablesBlocks,
    ArduinoESP32ActuatorBlocks,
    ArduinoESP32CommunicateBlocks,
    ArduinoESP32ControlBlocks,
    ArduinoESP32EthernetBlocks,
    ArduinoESP32HandbitBlocks,
    ArduinoESP32InoutBlocks,
    ArduinoESP32MixePiBlocks,
    ArduinoESP32MixGoBlocks,
    ArduinoESP32PinsBlocks,
    ArduinoESP32PocketCardBlocks,
    ArduinoESP32SensorBlocks,
    ArduinoESP32SerialBlocks,
    ArduinoESP32SidanBlocks,
    ArduinoESP32StorageBlocks,
    ArduinoESP32ToolsBlocks
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
    ArduinoAVRSensorGenerators,
    ArduinoAVRSerialGenerators,
    ArduinoAVRStorageGenerators,
    ArduinoAVRTextGenerators,
    ArduinoAVRToolsGenerators,
    ArduinoAVRVariablesGenerators,
    ArduinoESP32ActuatorGenerators,
    ArduinoESP32CommunicateGenerators,
    ArduinoESP32ControlGenerators,
    ArduinoESP32EthernetGenerators,
    ArduinoESP32HandbitGenerators,
    ArduinoESP32InoutGenerators,
    ArduinoESP32MixePiGenerators,
    ArduinoESP32MixGoGenerators,
    ArduinoESP32PinsGenerators,
    ArduinoESP32PocketCardGenerators,
    ArduinoESP32SensorGenerators,
    ArduinoESP32SerialGenerators,
    ArduinoESP32SidanGenerators,
    ArduinoESP32StorageGenerators,
    ArduinoESP32ToolsGenerators
);