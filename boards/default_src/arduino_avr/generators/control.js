import { JSFuncs } from 'mixly';
import { Variables } from 'blockly/core';

export const base_setup = function (_, generator) {
    var branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    if (branch) {
        generator.setups_['setup_setup'] = branch;
    }
    return '';
};

export const controls_if = function (_, generator) {
    // If/elseif/else condition.
    var n = 0;
    var argument = generator.valueToCode(this, 'IF' + n,
        generator.ORDER_NONE) || 'false';
    var branch = generator.statementToCode(this, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + branch + '\n}';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = generator.valueToCode(this, 'IF' + n,
            generator.ORDER_NONE) || 'false';
        branch = generator.statementToCode(this, 'DO' + n);
        code += ' else if (' + argument + ') {\n' + branch + '}';
    }
    if (this.elseCount_) {
        branch = generator.statementToCode(this, 'ELSE');
        code += ' else {\n' + branch + '\n}';
    }
    return code + '\n';
};

export const controls_switch_case = function (_, generator) {
    var n = 0;
    var argument = generator.valueToCode(this, 'IF' + n,
        generator.ORDER_NONE) || 'NULL';
    var branch = '';
    var code = 'switch (' + argument + ') {\n';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = generator.valueToCode(this, 'IF' + n,
            generator.ORDER_NONE) || 'NULL';
        branch = generator.statementToCode(this, 'DO' + n);
        code += ' case ' + argument + ': \n' + branch + '  break;\n';
    }
    if (this.elseCount_) {
        branch = generator.statementToCode(this, 'ELSE');
        code += ' default:\n' + branch + '  break;\n';
    }
    code += '}';
    return code + '\n';
};

export const controls_for = function (_, generator) {
    // For loop.
    var variable0 = generator.variableDB_.getName(
        this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var argument0 = generator.valueToCode(this, 'FROM',
        generator.ORDER_ASSIGNMENT) || '0';
    var argument1 = generator.valueToCode(this, 'TO',
        generator.ORDER_ASSIGNMENT) || '0';
    var step = generator.valueToCode(this, 'STEP',
        generator.ORDER_ASSIGNMENT) || '1';
    var branch = generator.statementToCode(this, 'DO');
    if (generator.INFINITE_LOOP_TRAP) {
        branch = generator.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    var code;
    var down = 0;
    if (argument0.match(/^-?\d+(\.\d+)?$/) &&
        argument1.match(/^-?\d+(\.\d+)?$/)) {
        //起止数是常量
        down = (argument1 - argument0 < 0);
        code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
            variable0 + (down ? ' >= ' : ' <= ') + argument1 + '; ' +
            variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
            branch + '}\n';
    } else {
        //起止数有变量
        if (step.match(/^-?\d+(\.\d+)?$/)) {
            //步长是常量
            down = step < 0;
            code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
                variable0 + (down ? ' >= ' : ' <= ') + '(' + argument1 + '); ' +
                variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
                branch + '}\n';
        } else {
            //步长是变量
            code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
                '(' + argument1 + '>=' + argument0 + ')?(' + variable0 + '<=' + argument1 + '):(' + variable0 + '>=' + argument1 + '); ' +
                variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
                branch + '}\n';
        }

    }
    return code;
};

export const controls_whileUntil = function (_, generator) {
    // Do while/until loop.
    var argument0 = generator.valueToCode(this, 'BOOL',
        generator.ORDER_NONE) || 'false';
    var branch = generator.statementToCode(this, 'DO');
    if (generator.INFINITE_LOOP_TRAP) {
        branch = generator.INFINITE_LOOP_TRAP.replace(/%1/g,
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

export const controls_flow_statements = function () {
    // Flow statements: continue, break.
    switch (this.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'break;\n';
        case 'CONTINUE':
            return 'continue;\n';
    }
    throw 'Unknown flow statement.';
};

export const controls_delay = function (_, generator) {
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '1000'
    var unit = this.getFieldValue('UNIT');
    var code = unit + '(' + delay_time + ');\n';
    return code;
};

export const controls_millis = function (_, generator) {
    var unit = this.getFieldValue('UNIT');
    var code = unit + "()";
    return [code, generator.ORDER_ATOMIC];
};

export const controls_mstimer2 = function (_, generator) {
    generator.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    var time = generator.valueToCode(this, 'TIME', generator.ORDER_ATOMIC);
    var funcName = 'msTimer2_func';
    var branch = generator.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code;
    return 'MsTimer2::set(' + time + ', ' + funcName + ');\n';
};

export const controls_mstimer2_start = function (_, generator) {
    generator.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::start();\n';
};

export const controls_mstimer2_stop = function (_, generator) {
    generator.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::stop();\n';
};

export const controls_end_program = function () {
    var board_type = JSFuncs.getPlatform();
    if (board_type.match(RegExp(/ESP8266/)))
        return 'while(true) delay(1000);\n';
    return 'while(true);\n';
};

export const controls_soft_reset = function (_, generator) {
    var funcName = 'resetFunc';
    var code = 'void(* resetFunc) (void) = 0;\n';
    generator.definitions_[funcName] = code;
    return 'resetFunc();\n';
};

export const controls_interrupts = function () {
    return 'interrupts();\n';
};

export const controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};

export const base_delay = controls_delay;

// 简单定时器
export const simple_timer = function (_, generator) {
    var NO = this.getFieldValue('NO');
    var timein = generator.valueToCode(this, 'timein', generator.ORDER_ATOMIC);
    var funcName = 'Simple_timer_' + NO;
    var branch = generator.statementToCode(this, 'zxhs');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var code = 'void' + ' ' + funcName + '() {\n  ' + branch + '\n}\n';
    generator.definitions_[funcName] = code;
    generator.definitions_['include_SimpleTimer'] = '#include <SimpleTimer.h>\n';
    generator.definitions_['var_declare_SimpleTimer'] = 'SimpleTimer timer;';
    generator.setups_[funcName] = 'timer.setInterval(' + timein + 'L, ' + funcName + ');\n';
    return 'timer.run();\n';
};

// do-while循环
export const do_while = function (_, generator) {
    var statements_input_data = generator.statementToCode(this, 'input_data');
    var value_select_data = generator.valueToCode(this, 'select_data', generator.ORDER_ATOMIC);
    var dropdown_type = this.getFieldValue('type');
    if (dropdown_type == 'false') {
        var code = 'do{\n'
            + statements_input_data
            + '}while(!(' + value_select_data + '));\n';
    }
    else {
        var code = 'do{\n'
            + statements_input_data
            + '}while(' + value_select_data + ');\n';
    }
    return code;
};

// 注册超级延时函数
export const super_delay_function1 = function (_, generator) {
    var number = this.getFieldValue('number');
    var funcName = 'super_delay_function' + number;
    var branch = generator.statementToCode(this, 'delay_function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var code = 'void' + ' ' + funcName + '() {\n  ' + branch + '\n}\n';
    generator.definitions_[funcName] = code;
    generator.definitions_['include_SimpleTimer'] = '#include <SimpleTimer.h>\n';
    generator.definitions_['var_declare_SimpleTimer'] = 'SimpleTimer timer;';
    return 'timer.run();\n';
};

// 执行超级延时函数
export const execute_super_delay_function1 = function (_, generator) {
    var number = this.getFieldValue('number');
    var time_interval = generator.valueToCode(this, 'time_interval', generator.ORDER_ATOMIC);
    var frequency = generator.valueToCode(this, 'frequency', generator.ORDER_ATOMIC);
    var code = 'timer.setTimer(' + time_interval + ', super_delay_function' + number + ', ' + frequency + ');\n';
    return code;
};