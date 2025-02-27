/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Utility functions for handling variables.
 * @author fraser@google.com (Neil Fraser)
 */
import * as Blockly from 'blockly/core';

const Variables = {};

/**
 * Category to separate variable names from procedures and generated functions.
 */
Variables.NAME_TYPE = 'VARIABLE';

Variables.DATA_TYPE = [
    [Blockly.Msg.LANG_MATH_INT, 'int'],
    [Blockly.Msg.LANG_MATH_UNSIGNED_INT, 'unsigned int'],
    [Blockly.Msg.LANG_MATH_WORD, 'word'],
    [Blockly.Msg.LANG_MATH_LONG, 'long'],
    [Blockly.Msg.LANG_MATH_UNSIGNED_LONG, 'unsigned long'],
    [Blockly.Msg.LANG_MATH_FLOAT, 'float'],
    [Blockly.Msg.LANG_MATH_DOUBLE, 'double'],
    [Blockly.Msg.LANG_MATH_BOOLEAN, 'bool'],
    [Blockly.Msg.LANG_MATH_BYTE, 'byte'],
    [Blockly.Msg.LANG_MATH_CHAR, 'char'],
    [Blockly.Msg.LANG_MATH_UNSIGNED_CHAR, 'unsigned char'],
    [Blockly.Msg.LANG_MATH_STRING, 'String'],
    ['uint8_t', 'uint8_t'],
    ['uint16_t', 'uint16_t'],
    ['uint32_t', 'uint32_t'],
    ['uint64_t', 'uint64_t'],
    ['int*', 'int*'],
    ['unsigned int*', 'unsigned int*'],
    ['word*', 'word*'],
    ['long*', 'long*'],
    ['unsigned long*', 'unsigned long*'],
    ['float*', 'float*'],
    ['double*', 'double*'],
    ['bool*', 'bool*'],
    ['byte*', 'byte*'],
    ['char*', 'char*'],
    ['unsigned char*', 'unsigned char*'],
    ['String*', 'String*'],
    ['uint8_t*', 'uint8_t*'],
    ['uint16_t*', 'uint16_t*'],
    ['uint32_t*', 'uint32_t*'],
    ['uint64_t*', 'uint64_t*']
];

/**
 * Find all user-created variables.
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array.<string>} Array of variable names.
 */
Variables.allVariables = function (root) {
    var blocks;
    if (root.getDescendants) {
        // Root is Block.
        blocks = root.getDescendants();
    } else if (root.getAllBlocks) {
        // Root is Workspace.
        blocks = root.getAllBlocks();
    } else {
        throw 'Not Block or Workspace: ' + root;
    }
    var variableHash = Object.create(null);
    // Iterate through every block and add each variable to the hash.
    for (var x = 0; x < blocks.length; x++) {
        var blockVariables = blocks[x].getVars();
        for (var y = 0; y < blockVariables.length; y++) {
            var varName = blockVariables[y];
            // Variable name may be null if the block is only half-built.
            if (varName) {
                variableHash[varName.toLowerCase()] = varName;
            }
        }
    }
    // Flatten the hash into a list.
    var variableList = [];
    for (var name in variableHash) {
        variableList.push(variableHash[name]);
    }
    return variableList;
};

/**
 * Find all instances of the specified variable and rename them.
 * @param {string} oldName Variable to rename.
 * @param {string} newName New variable name.
 * @param {!Blockly.Workspace} workspace Workspace rename variables in.
 */
Variables.renameVariable = function (oldName, newName, workspace) {
    Blockly.Events.setGroup(true);
    var blocks = workspace.getAllBlocks();
    // Iterate through every block.
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].renameVar(oldName, newName);
    }
    Blockly.Events.setGroup(false);
};

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Variables.flyoutCategory = function (workspace) {
    var variableList = Variables.allVariables(workspace);
    //variableList.sort(goog.string.caseInsensitiveCompare);

    // In addition to the user's variables, we also want to display the default
    // variable name at the top.  We also don't want this duplicated if the
    // user has created a variable of the same name.

    //在变量分类里添加默认变量取值与赋值模块时使用
    //goog.array.remove(variableList, Blockly.Msg.VARIABLES_DEFAULT_NAME);
    //variableList.unshift(Blockly.Msg.VARIABLES_DEFAULT_NAME);

    var xmlList = [];


    if (Blockly.Blocks['variables_declare']) {
        //增加variables_declare模块
        let block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'variables_declare');
        xmlList.push(block);
    }

    //在变量分类里添加默认变量取值与赋值模块时使用
    /*
    if (Blockly.Blocks['variables_set']) {
      //增加variables_declare模块
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'variables_set');
      xmlList.push(block);
    }
    if (Blockly.Blocks['variables_get']) {
      //增加variables_declare模块
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'variables_get');
      xmlList.push(block);
    }
    */

    //change tyep
    if (Blockly.Blocks['variables_change']) {
        //增加variables_declare模块
        let block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'variables_change');
        xmlList.push(block);
    }
    for (var i = 0; i < variableList.length; i++) {
        //if(i==0&&!(Blockly.Arduino.definitions_['var_declare'+'item'])){
        //  continue;
        //}

        if (Blockly.Blocks['variables_set']) {
            let block = Blockly.utils.xml.createElement('block');
            block.setAttribute('type', 'variables_set');
            if (Blockly.Blocks['variables_get']) {
                block.setAttribute('gap', 8);
            }
            let field = Blockly.utils.xml.createElement('field', null, variableList[i]);
            field.setAttribute('name', 'VAR');
            let name = Blockly.utils.xml.createTextNode(variableList[i]);
            field.appendChild(name);
            block.appendChild(field);
            xmlList.push(block);
        }
        if (Blockly.Blocks['variables_get']) {
            var block = Blockly.utils.xml.createElement('block');
            block.setAttribute('type', 'variables_get');
            if (Blockly.Blocks['variables_set']) {
                block.setAttribute('gap', 24);
            }
            let field = Blockly.utils.xml.createElement('field', null, variableList[i]);
            field.setAttribute('name', 'VAR');
            let name = Blockly.utils.xml.createTextNode(variableList[i]);
            field.appendChild(name);
            block.appendChild(field);
            xmlList.push(block);
        }
    }
    return xmlList;
};

/**
* Return a new variable name that is not yet being used. This will try to
* generate single letter variable names in the range 'i' to 'z' to start with.
* If no unique name is located it will try 'i' to 'z', 'a' to 'h',
* then 'i2' to 'z2' etc.  Skip 'l'.
 * @param {!Blockly.Workspace} workspace The workspace to be unique in.
* @return {string} New variable name.
*/
Variables.generateUniqueName = function (workspace) {
    var variableList = Variables.allVariables(workspace);
    var newName = '';
    if (variableList.length) {
        var nameSuffix = 1;
        var letters = 'ijkmnopqrstuvwxyzabcdefgh';  // No 'l'.
        var letterIndex = 0;
        var potName = letters.charAt(letterIndex);
        while (!newName) {
            var inUse = false;
            for (var i = 0; i < variableList.length; i++) {
                if (variableList[i].toLowerCase() == potName) {
                    // This potential name is already used.
                    inUse = true;
                    break;
                }
            }
            if (inUse) {
                // Try the next potential name.
                letterIndex++;
                if (letterIndex == letters.length) {
                    // Reached the end of the character sequence so back to 'i'.
                    // a new suffix.
                    letterIndex = 0;
                    nameSuffix++;
                }
                potName = letters.charAt(letterIndex);
                if (nameSuffix > 1) {
                    potName += nameSuffix;
                }
            } else {
                // We can use the current potential name.
                newName = potName;
            }
        }
    } else {
        newName = 'i';
    }
    return newName;
};

export default Variables;