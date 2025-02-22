import * as Blockly from 'blockly/core';
import { Boards } from 'mixly';

export const controls_main = function (a, generator) {
    var d = generator.statementToCode(a, "DO"),
        d = generator.addLoopTrap(d, a.id) || generator.PASS;
    return "if __name__ == '__main__':\n" + d;
}

export const base_setup = function (_, generator) {
    var branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "").replace(/\n {4}/g, '\n');//去除两端空格
    if (branch.endsWith('\n')) {
        generator.setups_['setup_setup'] = branch;
    }
    else {
        generator.setups_['setup_setup'] = branch + '\n';
    }
    return '';
}

// ok
export const controls_if = function (a, generator) {
    var b = 0,
        c = "",
        d,
        e;
    do
        e = generator.valueToCode(a, "IF" + b, generator.ORDER_NONE) || "False", d = generator.statementToCode(a, "DO" + b) || generator.PASS, c += (0 == b ? "if " : "elif ") + e + ":\n" + d, ++b;
    while (a.getInput("IF" + b));
    a.getInput("ELSE") && (d = generator.statementToCode(a, "ELSE") || generator.PASS, c += "else:\n" + d);
    return c
}

export const controls_try_finally = function (_, generator) {
    var n = 1;
    var argument = generator.valueToCode(this, 'IF' + n,
        generator.ORDER_NONE) || 'null';
    var branch = '';
    var t = generator.statementToCode(this, 'try') || '    pass\n';
    var code = 'try:\n' + t;
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = generator.valueToCode(this, 'IF' + n,
            generator.ORDER_NONE) || '';
        if (argument !== '')
            argument = ' ' + argument
        branch = generator.statementToCode(this, 'DO' + n) || '    pass\n';
        code += 'except' + argument + ': \n' + branch;
    }
    if (this.elseCount_) {
        branch = generator.statementToCode(this, 'ELSE') || '    pass\n';
        code += 'finally:\n' + branch;
    }
    // code += '}';
    return code;
}

// ok
export const controls_for = function (a, generator) {
    var b = generator.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        //var b = generator.valueToCode(a, "VAR", generator.ORDER_MEMBER) || "''",
        c = generator.valueToCode(a, "FROM", generator.ORDER_NONE) || "0",
        d = generator.valueToCode(a, "TO", generator.ORDER_NONE) || "0",
        e = generator.valueToCode(a, "STEP", generator.ORDER_NONE) || "1",
        f = generator.statementToCode(a, "DO"),
        f = generator.addLoopTrap(f, a.id) || generator.PASS,
        g = "",
        h = function (_, generator) {
            return generator.provideFunction_("upRange",
                ["def " + generator.FUNCTION_NAME_PLACEHOLDER_ + "(start, stop, step):", "  while start <= stop:", "    yield start", "    start += abs(step)"])
        },
        k = function (_, generator) {
            return generator.provideFunction_("downRange", ["def " + generator.FUNCTION_NAME_PLACEHOLDER_ + "(start, stop, step):", "  while start >= stop:", "    yield start", "    start -= abs(step)"])
        }
    a = function (a, b, c) {
        return "(" + a + " <= " + b + ") and " + h() + "(" + a + ", " + b + ", " + c + ") or " + k() + "(" + a + ", " + b + ", " + c + ")"
    }
    if (Blockly.isNumber(c) && Blockly.isNumber(d) &&
        Blockly.isNumber(e))
        c = parseFloat(c), d = parseFloat(d), e = Math.abs(parseFloat(e)), 0 === c % 1 && 0 === d % 1 && 0 === e % 1 ? (c <= d ? (d++, a = 0 == c && 1 == e ? d : c + ", " + d, 1 != e && (a += ", " + e)) : (d--, a = c + ", " + d + ", -" + e), a = "range(" + a + ")") : (a = c < d ? h() : k(), a += "(" + c + ", " + d + ", " + e + ")");
    else {
        var l = function (a, c) {
                if (Blockly.isNumber(a))
                    a = parseFloat(a);
                else {
                    var d = generator.variableDB_.getDistinctName(b + c, Blockly.Variables.NAME_TYPE);
                    g += d + " = " + a + "\n";
                    a = d
                }
                return a
            },
            c = l(c, "_start"),
            d = l(d, "_end");
        l(e, "_inc");
        a = "number" == typeof c && "number" == typeof d ? c < d ? h(c, d, e) : k(c, d, e) : a(c, d, e)
    }
    return g += "for " + b + " in " + a + ":\n" + f
}

export const controls_for_range = function (block, generator) {
    var iter = generator.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        from = generator.valueToCode(block, "FROM", generator.ORDER_NONE) || "0",
        end = generator.valueToCode(block, "TO", generator.ORDER_NONE) || "0",
        step = generator.valueToCode(block, "STEP", generator.ORDER_NONE) || "1",
        dostatement = generator.statementToCode(block, "DO"),
        pass = generator.addLoopTrap(dostatement, block.id) || generator.PASS;
    generator.setups_["mixly_range"] = "def mixly_range(start, stop, step):\n" +
        "    for i in range(start, stop + 1, step):\n" +
        "        yield i\n\n";
    return "for " + iter + " in mixly_range(" + from + ", " + end + ", " + step + "):\n" + pass;
}

export const controls_whileUntil = function (a, generator) {
    var b = "UNTIL" == a.getFieldValue("MODE"),
        c = generator.valueToCode(a, "BOOL", generator.ORDER_NONE) || "False",
        d = generator.statementToCode(a, "DO"),
        d = generator.addLoopTrap(d, a.id) || generator.PASS;
    b && (c = "not " + c);
    return "while " + c + ":\n" + d
}

// export const controls_flow_statements = function (_, generator) {
//     // Flow statements: continue, break.
//     switch (this.getFieldValue('FLOW')) {
//         case 'BREAK':
//             return 'break;\n';
//         case 'CONTINUE':
//             return 'continue;\n';
//     }
//     throw 'Unknown flow statement.';
// }

//ok
export const controls_flow_statements = function (a) {
    switch (a.getFieldValue("FLOW")) {
        case "BREAK":
            return "break\n";
        case "CONTINUE":
            return "continue\n"
    }
    throw "Unknown flow statement.";
}

// ok
export const controls_delay = function (_, generator) {
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
}

// ok
export const Panic_with_status_code = function (_, generator) {
    var status_code = generator.valueToCode(this, 'STATUS_CODE', generator.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
}

// ok
export const controls_millis = function (_, generator) {
    generator.definitions_.import_time = "import time";
    var code = 'time.time()';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const reset = function (_, generator) {
    generator.definitions_['import_microbit'] = 'from microbit import *'
    return 'reset()\n';
}
export const controls_interrupts = function () {
    return 'interrupts();\n';
}

export const controls_nointerrupts = function () {
    return 'noInterrupts();\n';
}


export const controls_forEach = function (block, generator) {
    // For each loop.
    var variable0 = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '\'\'';
    var argument0 = generator.valueToCode(block, 'LIST',
        generator.ORDER_RELATIONAL) || '[]';
    var branch = generator.statementToCode(block, 'DO');
    branch = generator.addLoopTrap(branch, block.id) ||
        generator.PASS;
    var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
    return code;
}

export const controls_range = function (_, generator) {
    var from = generator.valueToCode(this, "FROM", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "TO", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "STEP", generator.ORDER_NONE) || "1";
    var code = "range(" + from + ", " + end + ", " + step + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const controls_lambda = function (a, generator) {
    var c = generator.valueToCode(a, "BOOL", generator.ORDER_NONE) || "None",
        d = generator.statementToCode(a, "DO") || "pass";
    var code = "lambda " + c + ": " + d;
    code = code.replace('\n', '').replace('    ', '')
    return [code, generator.ORDER_ATOMIC];
}

export const time_sleep = function (_, generator) {
    generator.definitions_['import_time'] = 'import time';
    var delay_time = generator.valueToCode(this, 'DELAY_TIME', generator.ORDER_ATOMIC) || '1000'
    var code = 'time.sleep(' + delay_time + ')\n';
    return code;
}

export const controls_pass = function () {
    return 'pass\n';
}

export const controls_thread = function (_, generator) {
    generator.definitions_['import__thread'] = 'import _thread';
    var v = generator.valueToCode(this, "VAR", generator.ORDER_NONE) || "None";
    var callback = generator.variableDB_.getName(
        generator.valueToCode(this, "callback", generator.ORDER_NONE) || "None",
        Blockly.Procedures.NAME_TYPE
    );
    var code = "_thread.start_new_thread(" + callback + ", " + v + ")\n";
    return code;
}

// do-while循环
export const do_while = function (_, generator) {
    var value_select_data = generator.valueToCode(this, 'select_data', generator.ORDER_NONE) || "False";
    var statements_input_data = generator.statementToCode(this, 'input_data')
    var dropdown_type = this.getFieldValue('type');
    if (dropdown_type == 'true') {
        statements_input_data = statements_input_data + '    if (' + value_select_data + '):\n' + '        break\n';
    }
    else {
        statements_input_data = statements_input_data + '    if not (' + value_select_data + '):\n' + '        break\n';
    }
    statements_input_data = generator.addLoopTrap(statements_input_data, this.id) || generator.PASS;
    //var dropdown_type = this.getFieldValue('type');
    var code = 'while True:\n' + statements_input_data;
    return code;
}

// export const base_type = controls_type;
// export const controls_TypeLists = controls_typeLists;

export const controls_repeat_ext = function (a, generator) {
    var times = generator.valueToCode(this, 'TIMES', generator.ORDER_ATOMIC);
    var d = generator.statementToCode(a, "DO"),
        d = generator.addLoopTrap(d, a.id) || generator.PASS;
    return 'for _my_variable in range(' + times + '):\n' + d;
}


export const garbage_collection = function (_, generator) {
    generator.definitions_['import_gc'] = 'import gc';
    var code = 'gc.collect()\n'
    return code;
}

export const get_mem_alloc = function (_, generator) {
    generator.definitions_['import_gc'] = 'import gc';
    var code = 'gc.mem_alloc()';
    return [code, generator.ORDER_ATOMIC];
}

export const get_mem_free = function (_, generator) {
    generator.definitions_['import_gc'] = 'import gc';
    var code = 'gc.mem_free()';
    return [code, generator.ORDER_ATOMIC]
}

export const get_unique_identifier = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var code = 'machine.unique_id()';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const controls_repeat = controls_repeat_ext;

export const datetime_fromtimestamp = function(_,generator){
    generator.definitions_['import_datatime'] = 'import datatime';
    var ts = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = 'datatime.datatime.fromtimestamp(' + ts + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const gene_unique_identifier = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + 'uuid'] = 'from ' + version + ' import uuid';
    var code = 'uuid()';
    return [code, generator.ORDER_ATOMIC]
}