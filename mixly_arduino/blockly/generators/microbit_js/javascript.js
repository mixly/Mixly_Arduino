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

Blockly.JavaScript = new Blockly.Generator("JavaScript");
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


/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.JavaScript.scrubNakedValue = function(line) {
    return line + ';\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.JavaScript.quote_ = function(string) {
    // Can't use goog.string.quote since Google's style guide recommends
    // JS string literals use single quotes.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */
Blockly.JavaScript.scrub_ = function(block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.JavaScript.COMMENT_WRAP - 3);
        if (comment) {
            if (block.getProcedureDef) {
                // Use a comment block for function comments.
                commentCode += '/**\n' +
                    Blockly.JavaScript.prefixLines(comment + '\n', ' * ') +
                    ' */\n';
            } else {
                commentCode += Blockly.JavaScript.prefixLines(comment + '\n', '// ');
            }
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.JavaScript.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.JavaScript.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.JavaScript.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.JavaScript.getAdjusted = function(block, atId, opt_delta, opt_negate,
                                          opt_order) {
    var delta = opt_delta || 0;
    var order = opt_order || Blockly.JavaScript.ORDER_NONE;
    if (block.workspace.options.oneBasedIndex) {
        delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    if (delta > 0) {
        var at = Blockly.JavaScript.valueToCode(block, atId,
            Blockly.JavaScript.ORDER_ADDITION) || defaultAtIndex;
    } else if (delta < 0) {
        var at = Blockly.JavaScript.valueToCode(block, atId,
            Blockly.JavaScript.ORDER_SUBTRACTION) || defaultAtIndex;
    } else if (opt_negate) {
        var at = Blockly.JavaScript.valueToCode(block, atId,
            Blockly.JavaScript.ORDER_UNARY_NEGATION) || defaultAtIndex;
    } else {
        var at = Blockly.JavaScript.valueToCode(block, atId, order) ||
            defaultAtIndex;
    }

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseFloat(at) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = at + ' + ' + delta;
            var innerOrder = Blockly.JavaScript.ORDER_ADDITION;
        } else if (delta < 0) {
            at = at + ' - ' + -delta;
            var innerOrder = Blockly.JavaScript.ORDER_SUBTRACTION;
        }
        if (opt_negate) {
            if (delta) {
                at = '-(' + at + ')';
            } else {
                at = '-' + at;
            }
            var innerOrder = Blockly.JavaScript.ORDER_UNARY_NEGATION;
        }
        innerOrder = Math.floor(innerOrder);
        order = Math.floor(order);
        if (innerOrder && order >= innerOrder) {
            at = '(' + at + ')';
        }
    }
    return at;
};