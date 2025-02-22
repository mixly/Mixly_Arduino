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
    MicroPythonNetworkBlocks,
    MicroPythonSensorOnBoardBlocks,
    MicroPythonNetworkGenerators,
    MicroPythonSensorOnBoardGenerators
} from '@mixly/micropython';

import {
    MicropythonNRF51822MicrobitPins,
    MicropythonNRF51822MicrobitActuatorBlocks,
    MicropythonNRF51822MicrobitCommunicateBlocks,
    MicropythonNRF51822MicrobitDisplayBlocks,
    MicropythonNRF51822MicrobitFactoryBlocks,
    MicropythonNRF51822MicrobitInoutBlocks,
    MicropythonNRF51822MicrobitPinsBlocks,
    MicropythonNRF51822MicrobitSensorBlocks,
    MicropythonNRF51822MicrobitSerialBlocks,
    MicropythonNRF51822MicrobitSystemBlocks,
    MicropythonNRF51822MicrobitActuatorGenerators,
    MicropythonNRF51822MicrobitCommunicateGenerators,
    MicropythonNRF51822MicrobitDisplayGenerators,
    MicropythonNRF51822MicrobitFactoryGenerators,
    MicropythonNRF51822MicrobitInoutGenerators,
    MicropythonNRF51822MicrobitPinsGenerators,
    MicropythonNRF51822MicrobitSensorGenerators,
    MicropythonNRF51822MicrobitSerialGenerators,
    MicropythonNRF51822MicrobitSystemGenerators
} from './';

import './css/color_microbit_python_advance.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;
Blockly.generator = Python;

Profile.default = {};
Object.assign(Profile, MicropythonNRF51822MicrobitPins);
Object.assign(Profile.default, MicropythonNRF51822MicrobitPins['microbit']);

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
    MicroPythonNetworkBlocks,
    MicroPythonSensorOnBoardBlocks,
    MicropythonNRF51822MicrobitActuatorBlocks,
    MicropythonNRF51822MicrobitCommunicateBlocks,
    MicropythonNRF51822MicrobitDisplayBlocks,
    MicropythonNRF51822MicrobitFactoryBlocks,
    MicropythonNRF51822MicrobitInoutBlocks,
    MicropythonNRF51822MicrobitPinsBlocks,
    MicropythonNRF51822MicrobitSensorBlocks,
    MicropythonNRF51822MicrobitSerialBlocks,
    MicropythonNRF51822MicrobitSystemBlocks
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
    MicroPythonNetworkGenerators,
    MicroPythonSensorOnBoardGenerators,
    MicropythonNRF51822MicrobitActuatorGenerators,
    MicropythonNRF51822MicrobitCommunicateGenerators,
    MicropythonNRF51822MicrobitDisplayGenerators,
    MicropythonNRF51822MicrobitFactoryGenerators,
    MicropythonNRF51822MicrobitInoutGenerators,
    MicropythonNRF51822MicrobitPinsGenerators,
    MicropythonNRF51822MicrobitSensorGenerators,
    MicropythonNRF51822MicrobitSerialGenerators,
    MicropythonNRF51822MicrobitSystemGenerators
);