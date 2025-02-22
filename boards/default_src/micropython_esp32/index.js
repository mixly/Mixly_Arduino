import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import {
    PythonVariablesBlocks,
    PythonControlBlocks,
    PythonMathBlocks,
    PythonTextBlocks,
    PythonListsBlocks,
    PythonDictsBlocks,
    PythonLogicBlocks,
    PythonStorageBlocks,
    PythonProceduresBlocks,
    PythonTupleBlocks,
    PythonSetBlocks,
    PythonHtmlBlocks,
    PythonUtilityBlocks,
    PythonVariablesGenerators,
    PythonControlGenerators,
    PythonMathGenerators,
    PythonTextGenerators,
    PythonListsGenerators,
    PythonDictsGenerators,
    PythonLogicGenerators,
    PythonStorageGenerators,
    PythonProceduresGenerators,
    PythonTupleGenerators,
    PythonSetGenerators,
    PythonHtmlGenerators,
    PythonUtilityGenerators,
    Procedures,
    Variables,
    Python
} from '@mixly/python';

import {
    MicroPythonActuatorExternBlocks,
    MicroPythonActuatorOnBoardBlocks,
    MicroPythonAISensorBlocks,
    MicroPythonAIBlocks,
    MicroPythonBlynkBlocks,
    MicroPythonCommunicateBlocks,
    MicroPythonDisplayExternBlocks,
    MicroPythonDisplayOnBoardBlocks,
    MicroPythonFactoryBlocks,
    MicroPythonInputBlocks,
    MicroPythonIotBlocks,
    MicroPythonNetworkBlocks,
    MicroPythonPeG1Blocks,
    MicroPythonSensorExternBlocks,
    MicroPythonSensorOnBoardBlocks,
    MicroPythonSerialBlocks,
    MicroPythonSystemBlocks,
    MicroPythonWeatherBlocks,
    MicroPythonActuatorExternGenerators,
    MicroPythonActuatorOnBoardGenerators,
    MicroPythonAISensorGenerators,
    MicroPythonAIGenerators,
    MicroPythonBlynkGenerators,
    MicroPythonCommunicateGenerators,
    MicroPythonDisplayExternGenerators,
    MicroPythonDisplayOnBoardGenerators,
    MicroPythonFactoryGenerators,
    MicroPythonInputGenerators,
    MicroPythonIotGenerators,
    MicroPythonNetworkGenerators,
    MicroPythonPeG1Generators,
    MicroPythonSensorExternGenerators,
    MicroPythonSensorOnBoardGenerators,
    MicroPythonSerialGenerators,
    MicroPythonSystemGenerators,
    MicroPythonWeatherGenerators
} from '@mixly/micropython';

import {
    MicropythonESP32Pins,
    MicropythonESP32PinsBlocks,
    MicropythonESP32PinsGenerators
} from './';

import './css/color_esp32_mixgo.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;
Blockly.generator = Python;

Profile.default = {};
Object.assign(Profile, MicropythonESP32Pins);
Object.assign(Profile.default, MicropythonESP32Pins['ESP32 Generic']);

Object.assign(
    Blockly.Blocks,
    PythonVariablesBlocks,
    PythonControlBlocks,
    PythonMathBlocks,
    PythonTextBlocks,
    PythonListsBlocks,
    PythonDictsBlocks,
    PythonLogicBlocks,
    PythonStorageBlocks,
    PythonProceduresBlocks,
    PythonTupleBlocks,
    PythonSetBlocks,
    PythonHtmlBlocks,
    PythonUtilityBlocks,
    MicroPythonInputBlocks,
    MicroPythonSystemBlocks,
    MicroPythonSerialBlocks,
    MicroPythonCommunicateBlocks,
    MicroPythonIotBlocks,
    MicroPythonWeatherBlocks,
    MicroPythonAISensorBlocks,
    MicroPythonSensorOnBoardBlocks,
    MicroPythonSensorExternBlocks,
    MicroPythonPeG1Blocks,
    MicroPythonNetworkBlocks,
    MicroPythonAIBlocks,
    MicroPythonActuatorOnBoardBlocks,
    MicroPythonActuatorExternBlocks,
    MicroPythonDisplayOnBoardBlocks,
    MicroPythonDisplayExternBlocks,
    MicroPythonFactoryBlocks,
    MicroPythonBlynkBlocks,
    MicropythonESP32PinsBlocks
);

Object.assign(
    Blockly.Python.forBlock,
    PythonVariablesGenerators,
    PythonControlGenerators,
    PythonMathGenerators,
    PythonTextGenerators,
    PythonListsGenerators,
    PythonDictsGenerators,
    PythonLogicGenerators,
    PythonStorageGenerators,
    PythonProceduresGenerators,
    PythonTupleGenerators,
    PythonSetGenerators,
    PythonHtmlGenerators,
    PythonUtilityGenerators,
    MicroPythonInputGenerators,
    MicroPythonSystemGenerators,
    MicroPythonSerialGenerators,
    MicroPythonCommunicateGenerators,
    MicroPythonIotGenerators,
    MicroPythonWeatherGenerators,
    MicroPythonAISensorGenerators,
    MicroPythonSensorOnBoardGenerators,
    MicroPythonSensorExternGenerators,
    MicroPythonPeG1Generators,
    MicroPythonNetworkGenerators,
    MicroPythonAIGenerators,
    MicroPythonActuatorOnBoardGenerators,
    MicroPythonActuatorExternGenerators,
    MicroPythonDisplayOnBoardGenerators,
    MicroPythonDisplayExternGenerators,
    MicroPythonFactoryGenerators,
    MicroPythonBlynkGenerators,
    MicropythonESP32PinsGenerators
);