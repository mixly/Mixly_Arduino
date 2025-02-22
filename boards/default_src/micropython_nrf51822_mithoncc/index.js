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
    MicroPythonNetworkGenerators
} from '@mixly/micropython';

import {
    MicropythonNRF51822MithonCCPins,
    MicropythonNRF51822MithonCCActuatorBlocks,
    MicropythonNRF51822MithonCCCommunicateBlocks,
    MicropythonNRF51822MithonCCDisplayBlocks,
    MicropythonNRF51822MithonCCFactoryBlocks,
    MicropythonNRF51822MithonCCInoutBlocks,
    MicropythonNRF51822MithonCCMithonBlocks,
    MicropythonNRF51822MithonCCPinsBlocks,
    MicropythonNRF51822MithonCCSensorBlocks,
    MicropythonNRF51822MithonCCSerialBlocks,
    MicropythonNRF51822MithonCCSystemBlocks,
    MicropythonNRF51822MithonCCActuatorGenerators,
    MicropythonNRF51822MithonCCCommunicateGenerators,
    MicropythonNRF51822MithonCCDisplayGenerators,
    MicropythonNRF51822MithonCCFactoryGenerators,
    MicropythonNRF51822MithonCCInoutGenerators,
    MicropythonNRF51822MithonCCMithonGenerators,
    MicropythonNRF51822MithonCCPinsGenerators,
    MicropythonNRF51822MithonCCSensorGenerators,
    MicropythonNRF51822MithonCCSerialGenerators,
    MicropythonNRF51822MithonCCSystemGenerators
} from './';

import './css/color_mithon.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;
Blockly.generator = Python;

Profile.default = {};
Object.assign(Profile, MicropythonNRF51822MithonCCPins);
Object.assign(Profile.default, MicropythonNRF51822MithonCCPins['microbit']);

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
    MicropythonNRF51822MithonCCActuatorBlocks,
    MicropythonNRF51822MithonCCCommunicateBlocks,
    MicropythonNRF51822MithonCCDisplayBlocks,
    MicropythonNRF51822MithonCCDisplayBlocks,
    MicropythonNRF51822MithonCCFactoryBlocks,
    MicropythonNRF51822MithonCCInoutBlocks,
    MicropythonNRF51822MithonCCMithonBlocks,
    MicropythonNRF51822MithonCCPinsBlocks,
    MicropythonNRF51822MithonCCSensorBlocks,
    MicropythonNRF51822MithonCCSerialBlocks,
    MicropythonNRF51822MithonCCSystemBlocks
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
    MicropythonNRF51822MithonCCActuatorGenerators,
    MicropythonNRF51822MithonCCCommunicateGenerators,
    MicropythonNRF51822MithonCCDisplayGenerators,
    MicropythonNRF51822MithonCCDisplayGenerators,
    MicropythonNRF51822MithonCCFactoryGenerators,
    MicropythonNRF51822MithonCCInoutGenerators,
    MicropythonNRF51822MithonCCMithonGenerators,
    MicropythonNRF51822MithonCCPinsGenerators,
    MicropythonNRF51822MithonCCSensorGenerators,
    MicropythonNRF51822MithonCCSerialGenerators,
    MicropythonNRF51822MithonCCSystemGenerators
);