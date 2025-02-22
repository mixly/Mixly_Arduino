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
 * @fileoverview Generating Python for utility blocks.
 * @author acbart@vt.edu (Austin Cory Bart)
 */

export const raw_block = function (block) {
    var code = block.getFieldValue('TEXT') + "\n";
    return code;
}

export const raw_expression = function (block, generator) {
    var code = block.getFieldValue('TEXT');
    return [code, generator.ORDER_ATOMIC];
}

export const raw_empty = function (block, generator) {
    var code = generator.valueToCode(block, 'VALUE',
        generator.ORDER_ATOMIC) || '';
    return code + "\n";
}

export const raw_table = function () {
    //var code = block.getFieldValue('TEXT')+"\n";
    return '';//code;
}

export const type_check = function (block, generator) {
    var value = generator.valueToCode(block, 'VALUE',
        generator.ORDER_MEMBER) || '___';
    var code = 'type(' + value + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const function_call = function (block, generator) {
    var name = block.getFieldValue('NAME');
    var hasReturn = block.hasReturn_;
    var args = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
        args[n] = generator.valueToCode(block, 'ARGUMENT' + n,
            generator.ORDER_NONE) || '___';
    }
    var code = name + '(' + args.join(', ') + ')';
    if (hasReturn) {
        return [code, generator.ORDER_ATOMIC];
    }
    return code + '\n';
}

export const attribute_access = function (block, generator) {
    var value_module = generator.valueToCode(block, 'MODULE', generator.ORDER_ATOMIC);
    var value_name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC);
    //去除掉两端的括号，如(val()) --> val()
    value_name = value_name.substring(1, value_name.length - 1);
    // TODO: Assemble JavaScript into code variable.
    var code = value_module + '.' + value_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, generator.ORDER_NONE];
}