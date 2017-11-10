'use strict';

goog.provide('Blockly.JavaScript.loops');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.base_setup = function () {
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "").replace(/\n  /g, '\n');//去除两端空格
    if (branch) {
        Blockly.JavaScript.setups_['setup_setup'] = branch;
    }
    return '';
};

Blockly.JavaScript.controls_if = function () {
    // If/elseif/else condition.
    var n = 0;
    var argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(this, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + branch + '\n}';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
          Blockly.JavaScript.ORDER_NONE) || 'false';
        branch = Blockly.JavaScript.statementToCode(this, 'DO' + n);
        code += ' else if (' + argument + ') {\n' + branch + '}';
    }
    if (this.elseCount_) {
        branch = Blockly.JavaScript.statementToCode(this, 'ELSE');
        code += ' else {\n' + branch + '\n}';
    }
    return code + '\n';
};

Blockly.JavaScript.controls_switch_case = function () {
    var n = 0;
    var argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'null';
    var branch = '';
    var code = 'switch (' + argument + ') {\n';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
          Blockly.JavaScript.ORDER_NONE) || 'null';
        branch = Blockly.JavaScript.statementToCode(this, 'DO' + n);
        code += ' case ' + argument + ': \n' + branch + '  break;\n';
    }
    if (this.elseCount_) {
        branch = Blockly.JavaScript.statementToCode(this, 'ELSE');
        code += ' default:\n' + branch + '  break;\n';
    }
    code += '}';
    return code + '\n';
};

Blockly.JavaScript.controls_for = function () {
    // For loop.
    var variable0 = Blockly.JavaScript.variableDB_.getName(
        this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var step = Blockly.JavaScript.valueToCode(this, 'STEP',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';;
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
        branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    var code;
    var down = 0;
    if (argument0.match(/^-?\d+(\.\d+)?$/) &&
        argument1.match(/^-?\d+(\.\d+)?$/)) {
        //起止数是常量
        down = (argument1 - argument0 < 0);
        code = 'for (let ' + variable0 + ' = ' + argument0 + '; ' +
            variable0 + (down ? ' >= ' : ' <= ') + argument1 + '; ' +
            variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
            branch + '}\n';
    } else {
        //起止数有变量	  
        if (step.match(/^-?\d+(\.\d+)?$/)) {
            //步长是常量
            down = step < 0;
            code = 'for (let ' + variable0 + ' = (' + argument0 + '); ' +
            variable0 + (down ? ' >= ' : ' <= ') + '(' + argument1 + '); ' +
            variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
            branch + '}\n';
        } else {
            //步长是变量
            code = 'for (let ' + variable0 + ' = (' + argument0 + '); ' +
            '(' + argument1 + '>=' + argument0 + ')?(' + variable0 + '<=' + argument1 + '):(' + variable0 + '>=' + argument1 + '); ' +
            variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
            branch + '}\n';
        }

    }
    return code;
};

Blockly.JavaScript.controls_whileUntil = function () {
    // Do while/until loop.
    var argument0 = Blockly.JavaScript.valueToCode(this, 'BOOL',
        Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
        branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    if (this.getFieldValue('MODE') == 'UNTIL') {
        if (!argument0.match(/^\w+$/)) {
            argument0 = '(' + argument0 + ')';
        }
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.JavaScript.controls_flow_statements = function () {
    // Flow statements: continue, break.
    switch (this.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'break;\n';
        case 'CONTINUE':
            return 'continue;\n';
    }
    throw 'Unknown flow statement.';
};

Blockly.JavaScript.base_delay = function () {
    var delay_time = Blockly.JavaScript.valueToCode(this, 'DELAY_TIME', Blockly.JavaScript.ORDER_ATOMIC) || '1000'
    var code = 'basic.pause(' + delay_time + ');\n';
    return code;
};

Blockly.JavaScript.controls_millis = function () {
    var code = 'input.runningTime()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.controls_mstimer2 = function () {
    Blockly.JavaScript.definitions_['define_MsTimer2'] = '#include <MsTimer2.h>';
    var time = Blockly.JavaScript.valueToCode(this, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var funcName = 'msTimer2_func';
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.JavaScript.definitions_[funcName] = code;
    return 'MsTimer2::set(' + time + ', ' + funcName + ');\n';
};

Blockly.JavaScript.controls_mstimer2_start = function () {
    Blockly.JavaScript.definitions_['define_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::start();\n';
};

Blockly.JavaScript.controls_mstimer2_stop = function () {
    Blockly.JavaScript.definitions_['define_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::stop();\n';
};

Blockly.JavaScript.controls_end_program = function () {
    return 'while(true);\n';
};
Blockly.JavaScript.controls_interrupts = function () {
    return 'interrupts();\n';
};

Blockly.JavaScript.controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};