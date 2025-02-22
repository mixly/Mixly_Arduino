/**
 * @license
 * Copyright 2012 Google LLC
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
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * @name Blockly.Procedures
 * @namespace
 */
import * as Blockly from 'blockly/core';

const Procedures = {};

/**
 * Constant to separate procedure names from variables and generated functions
 * when running generators.
 * @deprecated Use Blockly.PROCEDURE_CATEGORY_NAME
 */
Procedures.NAME_TYPE = Blockly.PROCEDURE_CATEGORY_NAME;

/**
 * Find all user-created procedure definitions in a workspace.
 * @param {!Blockly.Workspace} root Root workspace.
 * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
 *     first contains procedures without return variables, the second with.
 *     Each procedure is defined by a three-element list of name, parameter
 *     list, and return value boolean.
 */
Procedures.allProcedures = function (root) {
    var blocks = root.getAllBlocks(false);
    var proceduresReturn = [];
    var proceduresNoReturn = [];
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].getProcedureDef) {
            var tuple = blocks[i].getProcedureDef();
            if (tuple) {
                if (tuple[2]) {
                    proceduresReturn.push(tuple);
                } else {
                    proceduresNoReturn.push(tuple);
                }
            }
        }
    }
    proceduresNoReturn.sort(Procedures.procTupleComparator_);
    proceduresReturn.sort(Procedures.procTupleComparator_);
    return [proceduresNoReturn, proceduresReturn];
};

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Procedures.procTupleComparator_ = function (ta, tb) {
    return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Ensure two identically-named procedures don't exist.
 * Take the proposed procedure name, and return a legal name i.e. one that
 * is not empty and doesn't collide with other procedures.
 * @param {string} name Proposed procedure name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Procedures.findLegalName = function (name, block) {
    if (block.isInFlyout) {
        // Flyouts can have multiple procedures called 'do something'.
        return name;
    }
    name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
    while (!Procedures.isLegalName_(name, block.workspace, block)) {
        // Collision with another procedure.
        var r = name.match(/^(.*?)(\d+)$/);
        if (!r) {
            name += '2';
        } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
        }
    }
    return name;
};

/**
 * Does this procedure have a legal name?  Illegal names include names of
 * procedures already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 * @private
 */
Procedures.isLegalName_ = function (name, workspace, opt_exclude) {
    return !Procedures.isNameUsed(name, workspace, opt_exclude);
};

/**
 * Return if the given name is already a procedure name.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is used, otherwise return false.
 */
Procedures.isNameUsed = function (name, workspace, opt_exclude) {
    var blocks = workspace.getAllBlocks(false);
    // Iterate through every block and check the name.
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i] == opt_exclude) {
            continue;
        }
        if (blocks[i].getProcedureDef) {
            var procName = blocks[i].getProcedureDef();
            if (Blockly.Names.equals(procName[0], name)) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Rename a procedure.  Called by the editable field.
 * @param {string} name The proposed new name.
 * @return {string} The accepted name.
 * @this {Blockly.Field}
 */
Procedures.rename = function (name) {
    // Strip leading and trailing whitespace.  Beyond this, all names are legal.
    name = name.trim();

    var legalName = Procedures.findLegalName(name, this.getSourceBlock());
    var oldName = this.getValue();
    if (oldName != name && oldName != legalName) {
        // Rename any callers.
        var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].renameProcedure) {
                blocks[i].renameProcedure(oldName, legalName);
            }
        }
    }
    return legalName;
};

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Blockly.Workspace} workspace The workspace containing procedures.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Procedures.flyoutCategory = function (workspace) {
    var xmlList = [];
    if (Blockly.Blocks['procedures_defnoreturn']) {
        // <block type="procedures_defnoreturn" gap="16">
        //     <field name="NAME">do something</field>
        // </block>
        var block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'procedures_defnoreturn');
        block.setAttribute('gap', 16);
        var nameField = Blockly.utils.xml.createElement('field');
        nameField.setAttribute('name', 'NAME');
        nameField.appendChild(Blockly.utils.xml.createTextNode(
            Blockly.Msg['PROCEDURES_DEFNORETURN_PROCEDURE']));
        block.appendChild(nameField);
        xmlList.push(block);
    }
    if (Blockly.Blocks['procedures_defreturn']) {
        // <block type="procedures_defreturn" gap="16">
        //     <field name="NAME">do something</field>
        // </block>
        let block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'procedures_defreturn');
        block.setAttribute('gap', 16);
        let nameField = Blockly.utils.xml.createElement('field');
        nameField.setAttribute('name', 'NAME');
        nameField.appendChild(Blockly.utils.xml.createTextNode(
            Blockly.Msg['PROCEDURES_DEFRETURN_PROCEDURE']));
        block.appendChild(nameField);
        xmlList.push(block);
    }
    if (Blockly.Blocks['procedures_return']) {
        // <block type="procedures_return" gap="16"></block>
        let block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'procedures_return');
        block.setAttribute('gap', 16);
        xmlList.push(block);
    }
    if (Blockly.Blocks['procedures_ifreturn']) {
        // <block type="procedures_ifreturn" gap="16"></block>
        let block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'procedures_ifreturn');
        block.setAttribute('gap', 16);
        xmlList.push(block);
    }
    if (xmlList.length) {
        // Add slightly larger gap between system blocks and user calls.
        xmlList[xmlList.length - 1].setAttribute('gap', 24);
    }

    function populateProcedures(procedureList, templateName) {
        for (var i = 0; i < procedureList.length; i++) {
            var name = procedureList[i][0];
            var args = procedureList[i][1];
            // <block type="procedures_callnoreturn" gap="16">
            //   <mutation name="do something">
            //     <arg name="x"></arg>
            //   </mutation>
            // </block>
            var block = Blockly.utils.xml.createElement('block');
            block.setAttribute('type', templateName);
            block.setAttribute('gap', 16);
            var mutation = Blockly.utils.xml.createElement('mutation');
            mutation.setAttribute('name', name);
            block.appendChild(mutation);
            for (var j = 0; j < args.length; j++) {
                var arg = Blockly.utils.xml.createElement('arg');
                arg.setAttribute('name', args[j]);
                mutation.appendChild(arg);
            }
            xmlList.push(block);
        }
    }

    var tuple = Procedures.allProcedures(workspace);
    populateProcedures(tuple[0], 'procedures_callnoreturn');
    populateProcedures(tuple[1], 'procedures_callreturn');
    return xmlList;
};

/**
 * Find all the callers of a named procedure.
 * @param {string} name Name of procedure.
 * @param {!Blockly.Workspace} workspace The workspace to find callers in.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 */
Procedures.getCallers = function (name, workspace) {
    var callers = [];
    var blocks = workspace.getAllBlocks(false);
    // Iterate through every block and check the name.
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].getProcedureCall) {
            var procName = blocks[i].getProcedureCall();
            // Procedure name may be null if the block is only half-built.
            if (procName && Blockly.Names.equals(procName, name)) {
                callers.push(blocks[i]);
            }
        }
    }
    return callers;
};

/**
 * When a procedure definition changes its parameters, find and edit all its
 * callers.
 * @param {!Blockly.Block} defBlock Procedure definition block.
 */
Procedures.mutateCallers = function (defBlock) {
    const oldRecordUndo = Blockly.Events.getRecordUndo();
    const procedureBlock = defBlock;
    const name = procedureBlock.getProcedureDef()[0];
    const xmlElement = defBlock.mutationToDom(true);
    const callers = Procedures.getCallers(name, defBlock.workspace);
    for (let i = 0, caller; (caller = callers[i]); i++) {
        const oldMutationDom = caller.mutationToDom();
        const oldMutation = oldMutationDom && Blockly.utils.xml.domToText(oldMutationDom);
        if (caller.domToMutation) {
            caller.domToMutation(xmlElement);
        }
        const newMutationDom = caller.mutationToDom();
        const newMutation = newMutationDom && Blockly.utils.xml.domToText(newMutationDom);
        if (oldMutation !== newMutation) {
            // Fire a mutation on every caller block.  But don't record this as an
            // undo action since it is deterministically tied to the procedure's
            // definition mutation.
            Blockly.Events.setRecordUndo(false);
            Blockly.Events.fire(
                new (Blockly.Events.get(Blockly.Events.BLOCK_CHANGE))(
                    caller,
                    'mutation',
                    null,
                    oldMutation,
                    newMutation,
                ),
            );
            Blockly.Events.setRecordUndo(oldRecordUndo);
        }
    }
};

/**
 * Find the definition block for the named procedure.
 * @param {string} name Name of procedure.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The procedure definition block, or null not found.
 */
Procedures.getDefinition = function (name, workspace) {
    // Assume that a procedure definition is a top block.
    var blocks = workspace.getTopBlocks(false);
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].getProcedureDef) {
            var tuple = blocks[i].getProcedureDef();
            if (tuple && Blockly.Names.equals(tuple[0], name)) {
                return blocks[i];
            }
        }
    }
    return null;
};

export default Procedures;