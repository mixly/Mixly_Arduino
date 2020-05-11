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
 * @fileoverview Utility functions for handling class_test.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';


goog.provide('Blockly.Class');

// TODO(scr): Fix circular dependencies
goog.require('Blockly.Workspace');
goog.require('goog.string');

//类
Blockly.Block.prototype.class_getVars=function(){for(var a=[],b=0,c;c=this.inputList[b];b++)for(var d=0,e;e=c.fieldRow[d];d++)e instanceof Blockly.FieldVariable&&a.push(e.getValue());return a};Blockly.Block.prototype.class_renameVar=function(a,b){for(var c=0,d;d=this.inputList[c];c++)for(var e=0,f;f=d.fieldRow[e];e++)f instanceof Blockly.FieldVariable&&Blockly.Names.equals(a,f.getValue())&&f.setValue(b)};
//属性
Blockly.Block.prototype.property_getVars=function(){for(var a=[],b=0,c;c=this.inputList[b];b++)for(var d=0,e;e=c.fieldRow[d];d++)e instanceof Blockly.FieldVariable&&a.push(e.getValue());return a};Blockly.Block.prototype.property_renameVar=function(a,b){for(var c=0,d;d=this.inputList[c];c++)for(var e=0,f;f=d.fieldRow[e];e++)f instanceof Blockly.FieldVariable&&Blockly.Names.equals(a,f.getValue())&&f.setValue(b)};
//对象
Blockly.Block.prototype.object_getVars=function(){for(var a=[],b=0,c;c=this.inputList[b];b++)for(var d=0,e;e=c.fieldRow[d];d++)e instanceof Blockly.FieldVariable&&a.push(e.getValue());return a};Blockly.Block.prototype.object_renameVar=function(a,b){for(var c=0,d;d=this.inputList[c];c++)for(var e=0,f;f=d.fieldRow[e];e++)f instanceof Blockly.FieldVariable&&Blockly.Names.equals(a,f.getValue())&&f.setValue(b)};

//类
Blockly.Class.CLASS_NAME_TYPE = 'CLASS';
//属性
Blockly.Class.PROPERTY_NAME_TYPE = 'PROPERTY';
//方法
Blockly.Class.METHOD_NAME_TYPE = 'METHOD';
//对象
Blockly.Class.OBJECT_NAME_TYPE = 'OBJECT';


/**** 类 ****/
Blockly.Class.allClass = function(root) {
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
    var blockClass = blocks[x].class_getVars();
    for (var y = 0; y < blockClass.length; y++) {
      var varName = blockClass[y];
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

Blockly.Class.renameClass = function(oldName, newName, workspace) {
  Blockly.Events.setGroup(true);
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].class_renameVar(oldName, newName);
  }
  Blockly.Events.setGroup(false);
};

Blockly.Class.class_generateUniqueName = function(workspace) {
  var variableList = Blockly.Class.allClass(workspace);
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

Blockly.Class.class_flyoutCategory = function(workspace) {
  var variableList = Blockly.Class.allClass(workspace);
  variableList.sort(goog.string.caseInsensitiveCompare);
  
  var xmlList = [];
  
  //创建类
  if (Blockly.Blocks['class_make']) {
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'class_make');
    if (Blockly.Blocks['class_make']) {
      block.setAttribute('gap', 16);
    }
    xmlList.push(block);
  }
  if (Blockly.Blocks['class_make_with_base']) {
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'class_make_with_base');
    if (Blockly.Blocks['class_make_with_base']) {
      block.setAttribute('gap', 16);
    }
    xmlList.push(block);
  }

  if (xmlList.length) {
    xmlList[xmlList.length - 1].setAttribute('gap', 30);
  }

  for (var i = 0; i < variableList.length; i++) {
    if (Blockly.Blocks['class_get']) {
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'class_get');
      if (Blockly.Blocks['class_get']) {
        block.setAttribute('gap', 16);
      }
      var field = goog.dom.createDom('field', null, variableList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
  }
  return xmlList;
};


/**** 属性 ****/
Blockly.Class.allProperty = function(root) {
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
    var blockClass = blocks[x].property_getVars();
    for (var y = 0; y < blockClass.length; y++) {
      var varName = blockClass[y];
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

Blockly.Class.renameProperty = function(oldName, newName, workspace) {
  Blockly.Events.setGroup(true);
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].property_renameVar(oldName, newName);
  }
  Blockly.Events.setGroup(false);
};

Blockly.Class.property_generateUniqueName = function(workspace) {
  var variableList = Blockly.Class.allProperty(workspace);
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

Blockly.Class.property_flyoutCategory = function(workspace) {
  var variableList = Blockly.Class.allProperty(workspace);
  variableList.sort(goog.string.caseInsensitiveCompare);
  
  var xmlList = [];
  
  //创建属性
  if (Blockly.Blocks['property_set']) {
    var block = goog.dom.createDom('block');
  block.setAttribute('type', 'property_set');
  xmlList.push(block);
  }

  if (xmlList.length) {
    xmlList[xmlList.length - 1].setAttribute('gap', 30);
  }

  for (var i = 0; i < variableList.length; i++) {
    if (Blockly.Blocks['property_set']) {
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'property_set');
      if (Blockly.Blocks['property_set']) {
        block.setAttribute('gap', 16);
      }
      var field = goog.dom.createDom('field', null, variableList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
    if (Blockly.Blocks['property_get']) {
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'property_get');
      if (Blockly.Blocks['property_get']) {
        block.setAttribute('gap', 25);
      }
      var field = goog.dom.createDom('field', null, variableList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
  }
  return xmlList;
};


/**** 方法 ****/
Blockly.Class.proallProcedures = function(root) {
  var blocks = root.getAllBlocks();
  var proceduresReturn = [];
  var proceduresNoReturn = [];
  var name_data = [];
  var select = true;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].method_getProcedureDef) {
      var tuple = blocks[i].method_getProcedureDef();
      if (tuple) {
        if(tuple[4])
        {
          if(name_data.length == 0)
          {
            if(tuple[4].indexOf("_") != -1)
            {
              select = true;
              name_data.push(tuple[4]);
            }
            else
            {
              select = false;
            }
          }
          else
          {
            for(var j = 0;j < name_data.length;j++)
            {
              if(name_data[j] == tuple[4] || tuple[4].indexOf("_") == -1)
              {
                select = false;
                break;
              }
              if(j == name_data.length - 1)
              {
                select = true;
                name_data.push(tuple[4]);
                break;
              }
            }
          }
        }
        if(select)
        {
          if (tuple[2]) {
            proceduresReturn.push(tuple);
          } else{
            proceduresNoReturn.push(tuple);
          }
        }
      }
    }
  }
  proceduresNoReturn.sort(Blockly.Class.proprocTupleComparator_);
  proceduresReturn.sort(Blockly.Class.proprocTupleComparator_);
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
Blockly.Class.proprocTupleComparator_ = function(ta, tb) {
  return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Ensure two identically-named procedures don't exist.
 * @param {string} name Proposed procedure name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.Class.profindLegalName = function(name, block) {
  /*
  if (block.isInFlyout) {
    // Flyouts can have multiple procedures called 'do something'.
    return name;
  }
  while (!Blockly.Class.proisLegalName(name, block.workspace, block)) {
    // Collision with another procedure.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
    name = '';
  }
  */
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
 */
Blockly.Class.proisLegalName = function(name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks();
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] == opt_exclude) {
      continue;
    }
    if (blocks[i].method_getProcedureDef) {
      var procName = blocks[i].method_getProcedureDef();
      if (Blockly.Names.equals(procName[0], name)) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Rename a procedure.  Called by the editable field.
 * @param {string} text The proposed new name.
 * @return {string} The accepted name.
 * @this {!Blockly.Field}
 */
Blockly.Class.prorename = function(text) {
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  text = text.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');

  // Ensure two identically-named procedures don't exist.
  text = Blockly.Class.profindLegalName(text, this.sourceBlock_);
  // Rename any callers.
  var blocks = this.sourceBlock_.workspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].method_renameProcedure) {
      blocks[i].method_renameProcedure(this.text_, text);
    }
  }
  return text;
};

/**
 * Find all the callers of a named procedure.
 * @param {string} name Name of procedure.
 * @param {!Blockly.Workspace} workspace The workspace to find callers in.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 */
Blockly.Class.progetCallers = function(name, workspace) {
  var callers = [];
  var blocks = workspace.getAllBlocks();
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].method_getProcedureCall) {
      var procName = blocks[i].method_getProcedureCall();
      // Procedure name may be null if the block is only half-built.
      if (procName && Blockly.Names.equals(procName, name)) {
        callers.push(blocks[i]);
      }
    }
  }
  return callers;
};

/**
 * When a procedure definition is disposed of, find and dispose of all its
 *     callers.
 * @param {string} name Name of deleted procedure definition.
 * @param {!Blockly.Workspace} workspace The workspace to delete callers from.
 */
Blockly.Class.prodisposeCallers = function(name, workspace) {
  var callers = Blockly.Class.progetCallers(name, workspace);
  for (var i = 0; i < callers.length; i++) {
    callers[i].dispose(true, false);
  }
};

/**
 * When a procedure definition changes its parameters, find and edit all its
 * callers.
 * @param {!Blockly.Block} defBlock Procedure definition block.
 */
Blockly.Class.promutateCallers = function(defBlock) {
  var oldRecordUndo = Blockly.Events.recordUndo;
  var name = defBlock.method_getProcedureDef()[0];
  var xmlElement = defBlock.mutationToDom(true);
  var callers = Blockly.Class.progetCallers(name, defBlock.workspace);
  for (var i = 0, caller; caller = callers[i]; i++) {
    var oldMutationDom = caller.mutationToDom();
    var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    caller.domToMutation(xmlElement);
    var newMutationDom = caller.mutationToDom();
    var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
      // Fire a mutation on every caller block.  But don't record this as an
      // undo action since it is deterministically tied to the procedure's
      // definition mutation.
      Blockly.Events.recordUndo = false;
      Blockly.Events.fire(new Blockly.Events.Change(
          caller, 'mutation', null, oldMutation, newMutation));
      Blockly.Events.recordUndo = oldRecordUndo;
    }
  }
};

/**
 * Find the definition block for the named procedure.
 * @param {string} name Name of procedure.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The procedure definition block, or null not found.
 */
Blockly.Class.progetDefinition = function(name, workspace) {
  var blocks = workspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].method_getProcedureDef) {
      var tuple = blocks[i].method_getProcedureDef();
      if (tuple && Blockly.Names.equals(tuple[0], name)) {
        return blocks[i];
      }
    }
  }
  return null;
};

Blockly.Class.method_flyoutCategory = function(workspace) {
  var xmlList = [];
  //创建方法
  if (Blockly.Blocks['method_procedures_defnoreturn']) {
    // <block type="procedures_defnoreturn" gap="16"></block>
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'method_procedures_defnoreturn');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }
  if (Blockly.Blocks['method_procedures_defreturn']) {
    // <block type="procedures_defreturn" gap="16"></block>
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'method_procedures_defreturn');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }
  /*
  if (Blockly.Blocks['method_procedures_return']) {
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'method_procedures_return');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }
  if (Blockly.Blocks['method_procedures_ifreturn']) {
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'method_procedures_ifreturn');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }
  */
  if (Blockly.Blocks['procedures_return']) {
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'procedures_return');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }
  if (Blockly.Blocks['procedures_ifreturn']) {
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'procedures_ifreturn');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }

  function populateProcedures(procedureList, templateName) {
    for (var i = 0; i < procedureList.length; i++) {
      var name = procedureList[i][0];
      var args = procedureList[i][1];
      var block = goog.dom.createDom('block');
      block.setAttribute('type', templateName);
      block.setAttribute('gap', 16);
      var mutation = goog.dom.createDom('mutation');
      mutation.setAttribute('name', name);
      block.appendChild(mutation);
      for (var t = 0; t < args.length; t++) {
        var arg = goog.dom.createDom('arg');
        arg.setAttribute('name', args[t]);
        mutation.appendChild(arg);
      }
      xmlList.push(block);
    }
  }

  var tuple = Blockly.Class.proallProcedures(workspace);
  populateProcedures(tuple[0], 'method_procedures_callnoreturn');
  populateProcedures(tuple[1], 'method_procedures_callreturn');

  return xmlList;
};


/**** 对象 ****/
Blockly.Class.allObject = function(root) {
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
    var blockClass = blocks[x].object_getVars();
    for (var y = 0; y < blockClass.length; y++) {
      var varName = blockClass[y];
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

Blockly.Class.renameObject = function(oldName, newName, workspace) {
  Blockly.Events.setGroup(true);
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].object_renameVar(oldName, newName);
  }
  Blockly.Events.setGroup(false);
};

Blockly.Class.object_generateUniqueName = function(workspace) {
  var variableList = Blockly.Class.allObject(workspace);
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

Blockly.Class.object_flyoutCategory = function(workspace) {
  var variableList = Blockly.Class.allObject(workspace);
  variableList.sort(goog.string.caseInsensitiveCompare);
  
  var xmlList = [];

  //创建对象
  if (Blockly.Blocks['object_set']) {
    var block = goog.dom.createDom('block');
  block.setAttribute('type', 'object_set');
  xmlList.push(block);
  }

  if (xmlList.length) {
    xmlList[xmlList.length - 1].setAttribute('gap', 30);
  }

  var variableList_class = Blockly.Class.allClass(workspace);
  variableList_class.sort(goog.string.caseInsensitiveCompare);
  for (var i = 0; i < variableList_class.length; i++) {
    if (Blockly.Blocks['object_set']) {
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'object_set');
      if (Blockly.Blocks['object_set']) {
        block.setAttribute('gap', 16);
      }
      var field = goog.dom.createDom('field', null, variableList_class[i]);
      field.setAttribute('name', 'VAR10');
      block.appendChild(field);
      xmlList.push(block);
    }
  }

  for (var i = 0; i < variableList.length; i++) {
    if (Blockly.Blocks['object_get']) {
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'object_get');
      if (Blockly.Blocks['object_get']) {
        block.setAttribute('gap', 16);
      }
      var field = goog.dom.createDom('field', null, variableList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
  }
  
  return xmlList;
};

