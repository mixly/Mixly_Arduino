/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript');
goog.require('Blockly.Generator');

Blockly.JavaScript.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.JavaScript.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.JavaScript.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.JavaScript.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.JavaScript.ORDER_ADDITIVE = 4; // + -
Blockly.JavaScript.ORDER_SHIFT = 5; // << >>
Blockly.JavaScript.ORDER_RELATIONAL = 6; // is is! >= > <= <
Blockly.JavaScript.ORDER_EQUALITY = 7; // == != === !==
Blockly.JavaScript.ORDER_BITWISE_AND = 8; // &
Blockly.JavaScript.ORDER_BITWISE_XOR = 9; // ^
Blockly.JavaScript.ORDER_BITWISE_OR = 10; // |
Blockly.JavaScript.ORDER_LOGICAL_AND = 11; // &&
Blockly.JavaScript.ORDER_LOGICAL_OR = 12; // ||
Blockly.JavaScript.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.JavaScript.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.JavaScript.ORDER_NONE = 99; // (...)
/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.JavaScript.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  //Blockly.JavaScript.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.JavaScript.functionNames_ = Object.create(null);
  Blockly.JavaScript.setups_ = Object.create(null);
  Blockly.JavaScript.definitions_ = Object.create(null);

  if (!Blockly.JavaScript.variableDB_) {
    Blockly.JavaScript.variableDB_ =
        new Blockly.Names(Blockly.JavaScript.RESERVED_WORDS_);
  } else {
    Blockly.JavaScript.variableDB_.reset();
  }
};

Blockly.JavaScript.finish = function(code) {
    // Convert the definitions dictionary into a list.
    if(code !== "") {
        code = '  ' + code.replace(/\n/g, '\n  ');
        code = code.replace(/\n\s+$/, '\n');
    }
    var definitions = [];
    for (var name in Blockly.JavaScript.definitions_) {
        definitions.push(Blockly.JavaScript.definitions_[name]);
    }
    var setups = [];
	for (var name in Blockly.JavaScript.setups_) {
		setups.push(Blockly.JavaScript.setups_[name]);
	}
	if(setups.length !== 0)
	    setups.push('\n\n');
    // Clean up temporary data.
    //delete Blockly.JavaScript.definitions_;
    //delete Blockly.JavaScript.functionNames_;
    //Blockly.JavaScript.variableDB_.reset();
    return definitions.join('\n\n') + '\n\n\n' +  setups.join('\n') + 'basic.forever(() => {\n' + code + '});\n';
};

