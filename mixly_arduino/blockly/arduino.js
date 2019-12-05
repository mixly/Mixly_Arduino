/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
 'use strict';

 goog.provide('Blockly.Arduino');

 goog.require('Blockly.Generator');

/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
 Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
 Blockly.Arduino.addReservedWords(
	// http://arduino.cc/en/Reference/HomePage
	'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,short,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts,A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15');

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Arduino.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4; // + -
Blockly.Arduino.ORDER_SHIFT = 5; // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6; // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7; // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8; // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9; // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10; // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11; // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12; // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99; // (...)

/*
 * Arduino Board profiles
 *
 */
 var profile = {
 	softserial_select: [["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
 	arduino_standard : {
 		description : "standard",
 		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
 		analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
 		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
 		interrupt : [["2", "2"], ["3", "3"]],
 		MOSI:[["11","11"]],
 		MISO:[["12","12"]],
 		SCK:[["13","13"]],
 		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
 		serial : 9600
 	},
 	arduino_mega : {
 		description : "Mega",
 		digital : [["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],["19","19"],["20","20"],["21","21"],["22","22"],["23","23"],["24","24"],["25","25"],["26","26"],["27","27"],["28","28"],["29","29"],["30","30"],["31","31"],["32","32"],["33","33"],["34","34"],["35","35"],["36","36"],["37","37"],["38","38"],["39","39"],["40","40"],["41","41"],["42","42"],["43","43"],["44","44"],["45","45"],["46","46"],["47","47"],["48","48"],["49","49"],["50","50"],["51","51"],["52","52"],["53","53"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
 		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
 		pwm : [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
 		interrupt: [["2", "2"], ["3", "3"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"]],
 		MOSI:[["50","50"]],
 		MISO:[["51","51"]],
 		SCK:[["52","52"]],
 		SS:[["53","53"]],
 		serial_select : [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"], ["Serial3", "Serial3"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSerial2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
 		serial : 9600
 	},
 	arduino_eightanaloginputs : {
 		description : "eightanaloginputs",
 		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
 		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
 		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
 		interrupt : [["2", "2"], ["3", "3"]],
 		MOSI:[["11","11"]],
 		MISO:[["12","12"]],
 		SCK:[["13","13"]],
 		serial_select : [["Serial", "Serial"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSerial2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
 		serial : 9600
 	},
 	arduino_ethernet : {
 		description : "ethernet",
 		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
 		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
 		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		interrupt : [["2", "2"], ["3", "3"]], //本无
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSerial2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_gemma : {
		description : "gemma",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
		pwm : [["0", "0"], ["1", "1"]],
		interrupt : [["2", "2"], ["3", "3"]], //本无
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSerial2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_leonardo : {
		description : "leonardo, micro, yun",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
		interrupt : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSerial2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_robot : {
		description : "robot",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		pwm : [["3", "3"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
		interrupt : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_esp8266 : { 
		description : "esp8266_Arduino",
		digital : [["0", "0"],["2", "2"],  ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["A0", "A0"]],
		analog : [["A0", "A0"]],
		pwm : [["0", "0"],["2", "2"],  ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],["A0", "A0"]],
		interrupt : [["0", "0"],["2", "2"],  ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],["A0", "A0"]],
		MOSI:[["13","13"]],
		MISO:[["12","12"]],
		SCK:[["14","14"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_esp32: {
		description: "esp32_Arduino",
		digital: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		interrupt: [["0", "0"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		pwm: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"]],
		analog: [["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		tx: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["31", "31"]],
		dac: [["25", "25"], ["26", "26"]],
		SDA:[["21","21"]],
		SCL:[["22","22"]],
		MOSI:[["23","23"]],
		MISO:[["19","19"]],
		SCK:[["18","18"]],
			TONE_NOTE:[["NOTE_C","NOTE_C"],["NOTE_Cs","NOTE_Cs"],["NOTE_D","NOTE_D"],["NOTE_Eb","NOTE_Eb"],["NOTE_E","NOTE_E"],["NOTE_F","NOTE_F"],["NOTE_Fs","NOTE_Fs"],["NOTE_G","NOTE_G"],["NOTE_Gs","NOTE_Gs"],["NOTE_A","NOTE_A"],["NOTE_Bb","NOTE_Bb"],["NOTE_B","NOTE_B"],["NOTE_MAX","NOTE_MAX"]],
		OCTAVE:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"]],
		CHANNEL:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"]],
		PWM_RESOLUTION:[["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"],["16", "16"],["17", "17"],["18", "18"],["19", "19"],["20", "20"]],
		touch: [["1", "32"], ["2", "33"], ["3", "25"], ["4", "26"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"]],
		serial : 9600
	},
	esp32_handbit: {
		description: "esp32_handbit",
		digital: [["P0", "33"], ["P1", "32"], ["P2", "35"], ["P5", "0"], ["P6", "16"], ["P7", "17"], ["P8", "26"], ["P9", "25"],  ["P11", "2"],["P13", "18"], ["P14", "19"], ["P15", "21"], ["P16", "5"],["P19", "22"],["P20", "23"],["P", "27"], ["Y", "14"], ["T", "12"], ["H", "13"], ["O", "15"], ["N", "4"]],
		interrupt: [["P0", "33"], ["P1", "32"], ["P2", "35"], ["P5", "0"], ["P6", "16"], ["P7", "17"], ["P8", "26"], ["P9", "25"],  ["P11", "2"],["P13", "18"], ["P14", "19"], ["P15", "21"], ["P16", "5"],["P19", "22"],["P20", "23"],["P", "27"], ["Y", "14"], ["T", "12"], ["H", "13"], ["O", "15"], ["N", "4"]],
		pwm: [["P0", "33"], ["P1", "32"], ["P4", "39"], ["P8", "26"], ["P9", "25"], ["P13", "18"], ["P14", "19"], ["P15", "21"], ["P16", "5"]],
		analog: [["P0", "33"], ["P1", "32"], ["P2", "35"], ["P3", "34"], ["P4", "39"], ["P10", "36"]],
		tx: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["31", "31"]],
		dac: [["25", "25"], ["26", "26"]],
		SDA:[["23","23"]],
		SCL:[["22","22"]],
		MOSI:[["P20","23"]],
		MISO:[["P14","19"]],
		SCK:[["P13","18"]],
		TONE_NOTE:[["NOTE_C","NOTE_C"],["NOTE_Cs","NOTE_Cs"],["NOTE_D","NOTE_D"],["NOTE_Eb","NOTE_Eb"],["NOTE_E","NOTE_E"],["NOTE_F","NOTE_F"],["NOTE_Fs","NOTE_Fs"],["NOTE_G","NOTE_G"],["NOTE_Gs","NOTE_Gs"],["NOTE_A","NOTE_A"],["NOTE_Bb","NOTE_Bb"],["NOTE_B","NOTE_B"],["NOTE_MAX","NOTE_MAX"]],
		OCTAVE:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"]],
		CHANNEL:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"]],
		PWM_RESOLUTION:[["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"],["16", "16"],["17", "17"],["18", "18"],["19", "19"],["20", "20"]],
		touch: [["P", "27"], ["Y", "14"], ["T", "12"], ["H", "13"], ["O", "15"], ["N", "4"]],
		button:[["A", "0"], ["B", "2"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"]],
		serial : 9600
	},
	esp32_MixGo: {
		description: "esp32_MixGo",
		digital: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		interrupt: [["0", "0"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		pwm: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"]],
		analog: [["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		tx: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["31", "31"]],
		dac: [["25", "25"], ["26", "26"]],
		SDA:[["21","21"]],
		SCL:[["22","22"]],
		MOSI:[["23","23"]],
		MISO:[["19","19"]],
		SCK:[["18","18"]],
			TONE_NOTE:[["NOTE_C","NOTE_C"],["NOTE_Cs","NOTE_Cs"],["NOTE_D","NOTE_D"],["NOTE_Eb","NOTE_Eb"],["NOTE_E","NOTE_E"],["NOTE_F","NOTE_F"],["NOTE_Fs","NOTE_Fs"],["NOTE_G","NOTE_G"],["NOTE_Gs","NOTE_Gs"],["NOTE_A","NOTE_A"],["NOTE_Bb","NOTE_Bb"],["NOTE_B","NOTE_B"],["NOTE_MAX","NOTE_MAX"]],
		OCTAVE:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"]],
		CHANNEL:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"]],
		PWM_RESOLUTION:[["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"],["16", "16"],["17", "17"],["18", "18"],["19", "19"],["20", "20"]],
		touch: [["1", "32"], ["2", "33"], ["3", "25"], ["4", "26"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"]],
		serial : 9600
	},
	esp32_mixepi: {
		description: "esp32_mixepi",
		digital: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"],["A", "BTN_A"], ["B", "BTN_B"],["C", "BTN_C"]],
		interrupt: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"],["A", "BTN_A"], ["B", "BTN_B"],["C", "BTN_C"]],
		pwm: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"]],
		analog: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"]],
		tx: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["31", "31"]],
		dac: [["25", "25"], ["26", "26"]],
		brightness:[["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"]],
		SDA:[["21","21"]],
		SCL:[["22","22"]],
		MOSI:[["MOSI","MOSI"]],
		MISO:[["MISO","MISO"]],
		SCK:[["SCK","SCK"]],
		touch: [["C", "TOUCH_C"], ["D", "TOUCH_D"], ["E", "TOUCH_E"], ["F", "TOUCH_F"], ["G", "TOUCH_G"], ["A", "TOUCH_A"], ["B", "TOUCH_B"]],
			TONE_NOTE:[["NOTE_C","NOTE_C"],["NOTE_Cs","NOTE_Cs"],["NOTE_D","NOTE_D"],["NOTE_Eb","NOTE_Eb"],["NOTE_E","NOTE_E"],["NOTE_F","NOTE_F"],["NOTE_Fs","NOTE_Fs"],["NOTE_G","NOTE_G"],["NOTE_Gs","NOTE_Gs"],["NOTE_A","NOTE_A"],["NOTE_Bb","NOTE_Bb"],["NOTE_B","NOTE_B"],["NOTE_MAX","NOTE_MAX"]],
		OCTAVE:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"]],
		CHANNEL:[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"]],
		PWM_RESOLUTION:[["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"],["16", "16"],["17", "17"],["18", "18"],["19", "19"],["20", "20"]],
		button:[["A", "BTN_A"], ["B", "BTN_B"], ["C", "BTN_C"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"]],
		serial : 9600
	}
};
profile["Arduino Yun"] = profile["Arduino Yun Mini"] = profile["Arduino Leonardo"] = profile["Arduino Leonardo ETH"] = profile["Arduino/Genuino Micro"] = profile["Arduino Esplora"] = profile["LilyPad Arduino USB"] = profile["arduino_leonardo"];
profile["Arduino Robot Control"] = profile["Arduino Robot Motor"] = profile["arduino_robot"];
profile["Arduino/Genuino Mega or Mega 2560"] =profile["Arduino/Genuino Mega or Mega 1280"]= profile["Arduino Mega ADK"] = profile["arduino_mega"];
profile["Arduino Ethernet"] = profile["arduino_ethernet"];
profile["Arduino Gemma"] = profile["arduino_gemma"];
profile["Arduino/Genuino Uno"] = profile["Arduino Duemilanove or Diecimila"] = profile["LilyPad Arduino"] = profile["Arduino NG or older"] = profile["arduino_standard"];
profile["Arduino Nano"] = profile["Arduino Mini"] = profile["Arduino Fio"] = profile["Arduino BT"] = profile["Arduino Pro or Pro Mini"] = profile["arduino_eightanaloginputs"];
//esp8266
profile['Arduino ESP8266 Generic']=profile["Generic_ESP8266"]=profile["ESP8266_Modules"]=profile["Generic ESP8266 Module"]=profile["Generic ESP8285 Module"] = profile["Adafruit HUZZAH ESP8266"] = profile["NodeMCU 0.9 (ESP-12 Module)"] = profile["NodeMCU 1.0 (ESP-12E Module)"] = profile["Olimex MOD-WIFI-ESP8266(-DEV)"] = profile["SparkFun ESP8266 Thing"] = profile["SweetPea ESP-210"] = profile["ESPDuino"] =  profile["Adafruit Feather HUZZAH ESP8266"] =profile["arduino_esp8266"];
profile["Invent One"]= profile["XinaBox CW01"]=profile["ESPresso Lite 1.0"]=profile["ESPresso Lite 2.0"]=profile["Phoenix 1.0"]=profile["Phoenix 2.0"]=profile["NodeMCU 0.9"]=profile["arduino_esp8266"];
profile["NodeMCU 1.0"]= profile["Olimex MOD-WIFI-ESP8266"]=profile["SparkFun ESP8266 Thing Dev"]=profile["LOLIN"]=profile["WeMos D1 R1"]=profile["ESPino"]=profile["ThaiEasyElec's ESPino"]=profile["arduino_esp8266"];
profile["Arduino ESP8266"]=profile["WifInfo"]=profile["esp8266_Arduino"]=profile["4D Systems gen4 IoD Range"]=profile["Digistump Oak"]=profile["WiFiduino"]=profile["Amperka WiFi Slot"]=profile["Seeed Wio Link"]=profile["ESPectro Core"]=profile["arduino_esp8266"];
//esp32
profile['Arduino ESP32']=profile['Arduino ESP32 Generic']=profile['"WeMos" WiFi&Bluetooth Battery']=profile["ESP32 Dev Module"] =profile["ESP32 Wrover Module"] =profile["ESP32 Pico Kit"] =profile["Turta IoT Node"] =profile["TTGO LoRa32-OLED V1"] =profile["XinaBox CW02"] =profile["SparkFun ESP32 Thing"] =profile["u-blox NINA-W10 series (ESP32)"] =profile["Widora AIR"] =profile["Electronic SweetPeas - ESP320"] =profile["Nano32"] =profile["LOLIN D32"] =profile["LOLIN D32 PRO"] =profile["WEMOS LOLIN32"] =profile["Dongsen Tech Pocket 32"] =profile["ESPea32"] =profile["Noduino Quantum"] =profile["Node32s"] =profile["Hornbill ESP32 Dev"] =profile["Hornbill ESP32 Minima"] =profile["FireBeetle-ESP32"] =profile["IntoRobot Fig"] =profile["Onehorse ESP32 Dev Module"] =profile["Adafruit ESP32 Feather"] =profile["NodeMCU-32S"] =profile["MH ET LIVE ESP32DevKIT"] =profile["MH ET LIVE ESP32MiniKit"] =profile["ESP32vn IoT Uno"] =profile["ESP32 Dev Module"] =profile["DOIT ESP32 DEVKIT V1"] =profile["OLIMEX ESP32-EVB"] =profile["OLIMEX ESP32-GATEWAY"] =profile["OLIMEX ESP32-PoE"] =profile["ThaiEasyElec's ESPino32"] =profile["M5Stack-FIRE"] =profile["ODROID ESP32"] =profile["Heltec_WIFI_Kit_32"]=profile["Heltec_WIFI_LoRa_32"]=profile["ESPectro32"]=profile["Microduino-CoreESP32"]=profile["ALKS ESP32"]=profile["WiPy 3.0"]=profile["BPI-BIT"]=profile["Silicognition wESP32"]=profile["T-Beam"]=profile["D-duino-32"]= profile["LoPy"]=profile["LoPy4"]=profile["OROCA EduBot"]=profile["OROCA EduBot"]=profile["ESP32 FM DevKit"]=profile["arduino_esp32"];
profile['Arduino HandBit']=profile["esp32_handbit"];
profile['Arduino MixePi']=profile["esp32_mixepi"];
profile['Arduino MixGo']=profile["esp32_MixGo"];
//set default profile to arduino standard-compatible board
//profile["default"] = profile["arduino_standard"];
//alert(profile.default.digital[0]);

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
 Blockly.Arduino.init = function (workspace) {
	// Create a dictionary of definitions to be printed before setups.
	Blockly.Arduino.definitions_ = Object.create(null);
	// Create a dictionary of setups to be printed before the code.
	Blockly.Arduino.setups_ = Object.create(null);
	//Blockly.Arduino.variableTypes_ = Object.create(null);//处理变量类型

	if (!Blockly.Arduino.variableDB_) {
		Blockly.Arduino.variableDB_ =
		new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
	} else {
		Blockly.Arduino.variableDB_.reset();
	}

	//var defvars = [];
	//var variables = Blockly.Variables.allVariables(workspace);
	//for (var x = 0; x < variables.length; x++) {
	//defvars[x] = 'long ' +
	//	Blockly.Arduino.variableDB_.getName(variables[x],
	//	Blockly.Variables.NAME_TYPE) + ';\n';
	//}
	//Blockly.Arduino.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
 Blockly.Arduino.finish = function (code) {
	// Indent every line.
	code = '  ' + code.replace(/\n/g, '\n  ');
	var positions = new Array();
	var pos = code.indexOf("timer.run();");
	while(pos > -1){
		positions.push(pos);
		pos = code.indexOf("timer.run();",pos + 1);
	}
	for(var i=0;i<positions.length-1;i++)
	{
		code=code.replace('timer.run();\n','');
	}
	code = code.replace(/\n\s+$/, '\n');
	code = 'void loop(){\n' + code + '\n}';
	// Convert the definitions dictionary into a list.
	var imports = [];
	var definitions_var = []; //变量定义
	var definitions_fun = []; //函数定义
	var sorted_keys=Object.keys(Blockly.Arduino.definitions_).sort();
	for(var idx in sorted_keys){
		var name=sorted_keys[idx];
		var def = Blockly.Arduino.definitions_[name];
		if (name.match(/^define_BLYNK_PRINT/)) {
			imports.push(def);
		}
		else if (def.match(/^#include/)) {
			imports.push(def);
		} 
		else if (def.match(/^WiFiClient/)) {
			imports.push(def);
		} 
		else if (name.match(/^var_declare/)) {
			definitions_var.push(def);
		} else {
			definitions_fun.push(def);
		}
	}

	// Convert the setups dictionary into a list.
	var setups = [];
	for (var name in Blockly.Arduino.setups_) {
		setups.push(Blockly.Arduino.setups_[name]);
	}

	var allDefs = imports.join('\n') + '\n\n' + definitions_var.join('\n') + '\n\n' + definitions_fun.join('\n') + '\n\nvoid setup(){\n  ' + setups.join('\n  ') + '\n}' + '\n\n';
	return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
 Blockly.Arduino.scrubNakedValue = function (line) {
 	return line + ';\n';
 };

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
 Blockly.Arduino.quote_ = function (string) {
	// TODO: This is a quick hack.  Replace with goog.string.quote
	//return goog.string.quote(string);
	return "\"" + string + "\"";
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
 Blockly.Arduino.scrub_ = function (block, code) {
 	if (code === null) {
		// Block has handled code generation itself.
		return '';
	}
	var commentCode = '';
	// Only collect comments for blocks that aren't inline.
	if (!block.outputConnection || !block.outputConnection.targetConnection) {
		// Collect comment for this block.
		var comment = block.getCommentText();
		if (comment) {
			commentCode += Blockly.Arduino.prefixLines(comment, '// ') + '\n';
		}
		// Collect comments for all value arguments.
		// Don't collect comments for nested statements.
		for (var x = 0; x < block.inputList.length; x++) {
			if (block.inputList[x].type == Blockly.INPUT_VALUE) {
				var childBlock = block.inputList[x].connection.targetBlock();
				if (childBlock) {
					var comment = Blockly.Arduino.allNestedComments(childBlock);
					if (comment) {
						commentCode += Blockly.Arduino.prefixLines(comment, '// ');
					}
				}
			}
		}
	}
	var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
	var nextCode = Blockly.Arduino.blockToCode(nextBlock);
	return commentCode + code + nextCode;
};
