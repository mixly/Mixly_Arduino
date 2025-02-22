import ArduinoESP32Pins from './pins/pins';

import * as ArduinoESP32ActuatorBlocks from './blocks/actuator';
import * as ArduinoESP32CommunicateBlocks from './blocks/communicate';
import * as ArduinoESP32ControlBlocks from './blocks/control';
import * as ArduinoESP32EthernetBlocks from './blocks/ethernet';
import * as ArduinoESP32HandbitBlocks from './blocks/Handbit';
import * as ArduinoESP32InoutBlocks from './blocks/inout';
import * as ArduinoESP32MixePiBlocks from './blocks/MixePi';
import * as ArduinoESP32MixGoBlocks from './blocks/MixGo';
import * as ArduinoESP32PinsBlocks from './blocks/pins';
import * as ArduinoESP32PocketCardBlocks from './blocks/PocketCard';
import * as ArduinoESP32SensorBlocks from './blocks/sensor';
import * as ArduinoESP32SerialBlocks from './blocks/serial';
import * as ArduinoESP32SidanBlocks from './blocks/sidan';
import * as ArduinoESP32StorageBlocks from './blocks/storage';
import * as ArduinoESP32Tools from './blocks/tools';

import * as ArduinoESP32ActuatorGenerators from './generators/actuator';
import * as ArduinoESP32CommunicateGenerators from './generators/communicate';
import * as ArduinoESP32ControlGenerators from './generators/control';
import * as ArduinoESP32EthernetGenerators from './generators/ethernet';
import * as ArduinoESP32HandbitGenerators from './generators/Handbit';
import * as ArduinoESP32InoutGenerators from './generators/inout';
import * as ArduinoESP32MixePiGenerators from './generators/MixePi';
import * as ArduinoESP32MixGoGenerators from './generators/MixGo';
import * as ArduinoESP32PinsGenerators from './generators/pins';
import * as ArduinoESP32PocketCardGenerators from './generators/PocketCard';
import * as ArduinoESP32SensorGenerators from './generators/sensor';
import * as ArduinoESP32SerialGenerators from './generators/serial';
import * as ArduinoESP32SidanGenerators from './generators/sidan';
import * as ArduinoESP32StorageGenerators from './generators/storage';

import ArduinoESP32ZhHans from './language/zh-hans';
import ArduinoESP32ZhHant from './language/zh-hant';
import ArduinoESP32En from './language/en';

const ArduinoESP32ToolsBlocks = ArduinoESP32Tools.blocks;
const ArduinoESP32ToolsGenerators = ArduinoESP32Tools.generators;

export {
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
};