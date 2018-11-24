/*
Overrides for generic Python code generation.
*/
'use strict';

goog.provide('Blockly.Python');

goog.require('Blockly.Generator');


Blockly.Python = new Blockly.Generator('Python');
Blockly.Python.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Python.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.Python.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Python.ORDER_EXPONENTIATION = 2.5;    // **
Blockly.Python.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Python.ORDER_ADDITIVE = 4; // + -
Blockly.Python.ORDER_SHIFT = 5; // << >>
Blockly.Python.ORDER_RELATIONAL = 6; // is is! >= > <= <
Blockly.Python.ORDER_EQUALITY = 7; // == != === !==
Blockly.Python.ORDER_BITWISE_AND = 8; // &
Blockly.Python.ORDER_BITWISE_XOR = 9; // ^
Blockly.Python.ORDER_BITWISE_OR = 10; // |
Blockly.Python.ORDER_LOGICAL_AND = 11; // &&
Blockly.Python.ORDER_LOGICAL_OR = 12; // ||
Blockly.Python.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.Python.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Python.ORDER_NONE = 99; // (...)

Blockly.Python.init = function(workspace) {
  /**
    * Empty loops or conditionals are not allowed in Python.
    */
  Blockly.Python.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Python.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);
  Blockly.Python.setups_ = Object.create(null);

  if (!Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.variableDB_.reset();
  }
}


Blockly.Python.finish = function(code) {
    // Convert the definitions dictionary into a list.
    if(code !== "") {
        code = '' + code.replace(/\n/g, '\n');
        code = code.replace(/\n\s+$/, '\n');
    }
    var definitions = [];
    for (var name in Blockly.Python.definitions_) {
        definitions.push(Blockly.Python.definitions_[name]);
    }
    var setups = [];
    for (var name in Blockly.Python.setups_) {
      setups.push(Blockly.Python.setups_[name]);
    }
    if(setups.length !== 0)
      setups.push('\n');
    // Clean up temporary data.
    //delete Blockly.Python.definitions_;
    //delete Blockly.Python.functionNames_;
    //Blockly.Python.variableDB_.reset();
    return definitions.join('\n\n') + '\n\n\n' + setups.join('\n') + code;

};


/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function(line) {
    return line + '\n';
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.quote_ = function(string) {
    // Can't use goog.string.quote since % must also be escaped.
    return "\"" + string + "\"";
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Python.scrub_ = function(block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.Python.COMMENT_WRAP - 3);
        if (comment) {
            if (block.getProcedureDef) {
                // Use a comment block for function comments.
                commentCode += '"""' + comment + '\n"""\n';
            } else {
                commentCode += Blockly.Python.prefixLines(comment + '\n', '# ');
            }
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.Python.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.Python.prefixLines(comment, '# ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.Python.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.Python.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
    var delta = opt_delta || 0;
    if (block.workspace.options.oneBasedIndex) {
        /*delta--;*/   //Keep in line with Python
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    var atOrder = delta ? Blockly.Python.ORDER_ADDITIVE :
        Blockly.Python.ORDER_NONE;
    var at = Blockly.Python.valueToCode(block, atId, atOrder) || defaultAtIndex;

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseInt(at, 10) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = 'int(' + at + ' + ' + delta + ')';
        } else if (delta < 0) {
            at = 'int(' + at + ' - ' + -delta + ')';
        } else {
            at = 'int(' + at + ')';
        }
        if (opt_negate) {
            at = '-' + at;
        }
    }
    return at;
};