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
 * @fileoverview Generating Python for dictionary blocks.
 * @author acbart@vt.edu (Austin Cory Bart)
 */
import * as Blockly from 'blockly/core';
import { Boards } from 'mixly';

export const dicts_create_with = function (_, generator) {
    // Create a list with any number of elements of any type.
    //var dropdown_type = this.getFieldValue('TYPE');
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        code[n] = keyName + ":" + (generator.valueToCode(this, 'ADD' + n, generator.ORDER_NONE) || default_value);
    }
    var code = varName + '= ' + '{' + code.join(', ') + '}\n';
    //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '}\n';
    //generator.setups_['setup_lists'+varName] = code;
    return code;
}

export const dicts_keys = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.keys()';
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_get = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    if (version=='educore'){
        var code = varName+'.get('+text+')';
    }else{
        var code = varName + "[" + text + "]";
    }
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_get_default = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    // var text=this.getFieldValue('KEY');
    var code = varName + ".get(" + text + ',' + argument + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_add_or_change = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || 'mydict';
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + "[" + text + "] = " + argument + '\n';
    return code;
}

export const dicts_delete = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || 'mydict';
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var code = "del " + varName + "[" + text + "]\n";
    return code;
}

export const dicts_update = function (_, generator) {
    var varName2 = generator.valueToCode(this, 'DICT2', generator.ORDER_ASSIGNMENT) || '0';
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.update(' + varName2 + ')\n';
    return code;
}

export const dicts_clear = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clear()\n';
    return code;
}

export const dicts_items = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.items()';
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_values = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.values()';
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_length = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'len(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_deldict = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'del ' + varName + '\n';
    return code;
}

export const dicts_add_change_del = function (block, generator) {
    var dict = generator.valueToCode(block, 'DICT',
        generator.ORDER_MEMBER) || '[]';
    var mode = block.getFieldValue('WHERE');
    var KEY = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');

    switch (mode) {
        case 'INSERT':
            //var at2 = block.getFieldValue('AT2');
            var at2 = generator.valueToCode(this, 'AT2', generator.ORDER_ASSIGNMENT) || '0';
            var code = dict + "[" + KEY + "] = " + at2 + '\n'
            break;
        case 'DELETE':
            var code = 'del ' + dict + "[" + KEY + "]\n"
            break;
        default:
            throw 'Unhandled option (lists_setIndex2)';
    }
    return code;
}

export const dicts_pop = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var code = varName + ".pop(" + text + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_setdefault = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || 'mydict';
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    // var text=this.getFieldValue('KEY');
    var argument = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + ".setdefault" + "(" + text + "," + argument + ")\n";
    return code;
}

export const dicts_create_with_noreturn = function (_, generator) {
    // Create a list with any number of elements of any type.
    // var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
    //  Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    var default_value = '0';

    for (var n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        code[n] = keyName + ":" + (generator.valueToCode(this, 'ADD' + n, generator.ORDER_NONE) || default_value);
    }
    // if (this.itemCount_!=1){
    //  generator.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
    // else {
    // generator.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
    if (this.itemCount_ != 1) {
        var code = '{' + code.join(', ') + '}';
    }
    else {
        var code = '{' + code.join(', ') + ',}';
    }

    return [code, generator.ORDER_ATOMIC];
}

export const dicts_todict = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['dict(' + str + ')', generator.ORDER_ATOMIC];
}

export const dicts_to_json = function (_, generator) {
    generator.definitions_['import_json'] = 'import json';
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'json.dumps(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const json_to_dicts = function (_, generator) {
    generator.definitions_['import_json'] = 'import json';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || 'null';
    var code = 'json.loads(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_to_to = function (_, generator) {
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var R = generator.valueToCode(this, 'VAR1', generator.ORDER_ASSIGNMENT) || 'null';
    var I = generator.valueToCode(this, 'VAR2', generator.ORDER_ASSIGNMENT) || 'null';
    var L = generator.valueToCode(this, 'VAR3', generator.ORDER_ASSIGNMENT) || 'null';
    var N = generator.valueToCode(this, 'VAR4', generator.ORDER_ASSIGNMENT) || 'null';
    var code = varName + '['+R+']'+'['+I+']'+'['+L+']'+'['+N+']';
    return [code, generator.ORDER_ATOMIC];
}

export const dicts_to_json2 = function (_, generator) {
    generator.definitions_['import_json'] = 'import json';
    generator.definitions_['import_ujson'] = 'import ujson';
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'ujson.loads(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}