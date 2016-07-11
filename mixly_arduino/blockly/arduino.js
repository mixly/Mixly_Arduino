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
  'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,short,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts,A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15'
);

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99;          // (...)

/*
 * Arduino Board profiles
 *
 */
var profile = {
  arduino_standard: {
    description: "standard",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
	pwm:[["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
	interrupt : [["2", "2"], ["3", "3"]],
	serial_select:[["Serial", "Serial"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  arduino_mega: {
    description: "Mega",
	digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
	pwm:[["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["44", "44"], ["45", "45"], ["46", "46"]],
	interrupt : [["2", "2"], ["3", "3"]],
	serial_select:[["Serial", "Serial"],["Serial1", "Serial1"],["Serial2", "Serial2"],["Serial3", "Serial3"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  arduino_eightanaloginputs: {
    description: "eightanaloginputs",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
	pwm:[["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
	interrupt : [["2", "2"], ["3", "3"]],
	serial_select:[["Serial", "Serial"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  arduino_ethernet: {
    description: "ethernet",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
	pwm:[["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
	interrupt : [["2", "2"], ["3", "3"]],//本无
	serial_select:[["Serial", "Serial"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  arduino_gemma: {
    description: "gemma",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
	pwm:[["0", "0"], ["1", "1"]],
	interrupt : [["2", "2"], ["3", "3"]],//本无
	serial_select:[["Serial", "Serial"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  arduino_leonardo: {
    description: "leonardo, micro, yun",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
	pwm:[["3", "3"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
	interrupt : [["0", "0"], ["1", "1"],["2", "2"], ["3", "3"], ["7", "7"]],
	serial_select:[["Serial", "Serial"],["Serial1", "Serial1"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  arduino_robot: {
    description: "robot",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
	pwm:[["3", "3"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
	interrupt : [["0", "0"], ["1", "1"],["2", "2"], ["3", "3"], ["7", "7"]],
	serial_select:[["Serial", "Serial"],["Serial1", "Serial1"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  arduino_esp8266: { //esp8266只有wifio不符合
    description: "esp8266",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],["16", "16"], ["A0", "A0"]],
    analog: [["A0", "A0"]],
	pwm:[["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],["16", "16"]],
	interrupt : [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"]],
	serial_select:[["Serial", "Serial"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  },
  'Arduino/Genuino 101': {
    description: "",
    digital: [["0", "0"],["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
	pwm:[["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"]],
	interrupt : [["2", "2"], ["5", "5"],["7", "7"], ["8", "8"],["10", "10"], ["11", "11"],["12", "12"], ["13", "13"]],
	serial_select:[["Serial", "Serial"],["SoftwareSerial", "mySerial"]],
    serial: 9600
  }
};
profile["Arduino Yun"] =profile["Arduino Yun Mini"] =profile["Arduino Leonardo"] =profile["Arduino Leonardo ETH"] =profile["Arduino Micro"] =profile["Arduino Esplora"] =profile["LilyPad Arduino USB"] = profile["arduino_leonardo"];
profile["Arduino Robot Control"] =profile["Arduino Robot Motor"] =profile["arduino_robot"];
profile["Arduino Mega or Mega 2560"] =profile["Arduino Mega ADK"] =profile["arduino_mega"];
profile["Arduino Ethernet"] =profile["arduino_ethernet"];
profile["Arduino Gemma"] =profile["arduino_gemma"];
profile["Arduino Uno"] =profile["Arduino Duemilanove or Diecimila"] =profile["LilyPad Arduino"] =profile["Arduino NG or older"] =profile["arduino_standard"];
profile["Arduino Nano"] =profile["Arduino Mini"] =profile["Arduino Fio"] =profile["Arduino BT"] =profile["Arduino Pro or Pro Mini"]=profile["arduino_eightanaloginputs"];
profile["Generic ESP8266 Module"] =profile["Adafruit HUZZAH ESP8266"] =profile["NodeMCU 0.9 (ESP-12 Module)"] =profile["NodeMCU 1.0 (ESP-12E Module)"] =profile["Olimex MOD-WIFI-ESP8266(-DEV)"]=profile["SparkFun ESP8266 Thing"]=profile["SweetPea ESP-210"]=profile["arduino_esp8266"];


//set default profile to arduino standard-compatible board
//profile["default"] = profile["arduino_standard"];
//alert(profile.default.digital[0]);

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function(workspace) {
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
Blockly.Arduino.finish = function(code) {
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop() \n{\n' + code + '\n}';

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions_var = [];//变量定义
  var definitions_fun = [];//函数定义
  for (var name in Blockly.Arduino.definitions_) {
    var def = Blockly.Arduino.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else if(name.match(/^var_declare/)){
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

  var allDefs = imports.join('\n') + '\n\n' + definitions_var.join('\n') + '\n\n' + definitions_fun.join('\n') + '\n\nvoid setup() \n{\n  '+setups.join('\n  ') + '\n}'+ '\n\n';
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
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
Blockly.Arduino.scrub_ = function(block, code) {
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
