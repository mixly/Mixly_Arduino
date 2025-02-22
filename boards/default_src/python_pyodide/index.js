import * as Blockly from 'blockly/core';
import './language/loader';
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
    PythonMixpyAIBlocks,
    PythonMixpyAlgorithmBlocks,
    PythonMixpyCommunicateBlocks,
    PythonMixpyCVBlocks,
    PythonMixpyDataBlocks,
    PythonMixpyDatastructureBlocks,
    PythonMixpyFactoryBlocks,
    PythonMixpyHardwareBlocks,
    PythonMixpyInoutBlocks,
    PythonMixpyIOTBlocks,
    PythonMixpyPinsBlocks,
    PythonMixpySerialBlocks,
    PythonMixpySKLearnBlocks,
    PythonMixpySystemBlocks,
    PythonMixpyTurtleBlocks,
    PythonMixpyAIGenerators,
    PythonMixpyAlgorithmGenerators,
    PythonMixpyCommunicateGenerators,
    PythonMixpyCVGenerators,
    PythonMixpyDataGenerators,
    PythonMixpyDatastructureGenerators,
    PythonMixpyFactoryGenerators,
    PythonMixpyHardwareGenerators,
    PythonMixpyInoutGenerators,
    PythonMixpyIOTGenerators,
    PythonMixpyPinsGenerators,
    PythonMixpySerialGenerators,
    PythonMixpySKLearnGenerators,
    PythonMixpySystemGenerators,
    PythonMixpyTurtleGenerators
} from '@mixly/python-mixpy';

import './others/loader';

import './css/color_mixpy_python_advance.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;
Blockly.generator = Python;

Profile.default = {};

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
    PythonMixpyAIBlocks,
    PythonMixpyAlgorithmBlocks,
    PythonMixpyCommunicateBlocks,
    PythonMixpyCVBlocks,
    PythonMixpyDataBlocks,
    PythonMixpyDatastructureBlocks,
    PythonMixpyFactoryBlocks,
    PythonMixpyHardwareBlocks,
    PythonMixpyInoutBlocks,
    PythonMixpyIOTBlocks,
    PythonMixpyPinsBlocks,
    PythonMixpySerialBlocks,
    PythonMixpySKLearnBlocks,
    PythonMixpySystemBlocks,
    PythonMixpyTurtleBlocks,
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
    PythonMixpyAIGenerators,
    PythonMixpyAlgorithmGenerators,
    PythonMixpyCommunicateGenerators,
    PythonMixpyCVGenerators,
    PythonMixpyDataGenerators,
    PythonMixpyDatastructureGenerators,
    PythonMixpyFactoryGenerators,
    PythonMixpyHardwareGenerators,
    PythonMixpyInoutGenerators,
    PythonMixpyIOTGenerators,
    PythonMixpyPinsGenerators,
    PythonMixpySerialGenerators,
    PythonMixpySKLearnGenerators,
    PythonMixpySystemGenerators,
    PythonMixpyTurtleGenerators
);