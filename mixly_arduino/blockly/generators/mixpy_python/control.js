'use strict';

goog.provide('Blockly.Python.loops');

goog.require('Blockly.Python');

Blockly.Python.base_setup = function () {
    var branch = Blockly.Python.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "").replace(/\n    /g, '\n');//去除两端空格
    if (branch) {
        Blockly.Python.setups_['setup_setup'] = branch;
    }
    return '';
};

//ok
Blockly.Python.controls_if = function (a) {
    var b = 0,
    c = "",
    d,
    e;
    do
        e = Blockly.Python.valueToCode(a, "IF" + b, Blockly.Python.ORDER_NONE) || "False", d = Blockly.Python.statementToCode(a, "DO" + b) || Blockly.Python.PASS, c += (0 == b ? "if " : "elif ") + e + ":\n" + d, ++b;
    while (a.getInput("IF" + b));
    a.getInput("ELSE") && (d = Blockly.Python.statementToCode(a, "ELSE") || Blockly.Python.PASS, c += "else:\n" + d);
    return c
};
//there is not switch in python
// Blockly.Python.controls_switch_case = function () {
//     var n = 0;
//     var argument = Blockly.Python.valueToCode(this, 'IF' + n,
//         Blockly.Python.ORDER_NONE) || 'null';
//     var branch = '';
//     var code = 'switch (' + argument + ') {\n';
//     for (n = 1; n <= this.elseifCount_; n++) {
//         argument = Blockly.Python.valueToCode(this, 'IF' + n,
//           Blockly.Python.ORDER_NONE) || 'null';
//         branch = Blockly.Python.statementToCode(this, 'DO' + n);
//         code += ' case ' + argument + ': \n' + branch + '  break;\n';
//     }
//     if (this.elseCount_) {
//         branch = Blockly.Python.statementToCode(this, 'ELSE');
//         code += ' default:\n' + branch + '  break;\n';
//     }
//     code += '}';
//     return code + '\n';
// };

//ok
Blockly.Python.controls_for = function (a) {
    var b = Blockly.Python.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
    //var b = Blockly.Python.valueToCode(a, "VAR", Blockly.Python.ORDER_MEMBER) || "''",
    c = Blockly.Python.valueToCode(a, "FROM", Blockly.Python.ORDER_NONE) || "0",
    d = Blockly.Python.valueToCode(a, "TO", Blockly.Python.ORDER_NONE) || "0",
    e = Blockly.Python.valueToCode(a, "STEP", Blockly.Python.ORDER_NONE) || "1",
    f = Blockly.Python.statementToCode(a, "DO"),
    f = Blockly.Python.addLoopTrap(f, a.id) || Blockly.Python.PASS,
    g = "",
    h = function () {
        return Blockly.Python.provideFunction_("upRange",
            ["def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(start, stop, step):", "  while start <= stop:", "    yield start", "    start += abs(step)"])
    },
    k = function () {
        return Blockly.Python.provideFunction_("downRange", ["def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(start, stop, step):", "  while start >= stop:", "    yield start", "    start -= abs(step)"])
    };
    a = function (a, b, c) {
        return "(" + a + " <= " + b + ") and " + h() + "(" + a + ", " + b + ", " + c + ") or " + k() + "(" + a + ", " + b + ", " + c + ")"
    };
    if (Blockly.isNumber(c) && Blockly.isNumber(d) &&
        Blockly.isNumber(e))
        c = parseFloat(c), d = parseFloat(d), e = Math.abs(parseFloat(e)), 0 === c % 1 && 0 === d % 1 && 0 === e % 1 ? (c <= d ? (d++, a = 0 == c && 1 == e ? d : c + ", " + d, 1 != e && (a += ", " + e)) : (d--, a = c + ", " + d + ", -" + e), a = "range(" + a + ")") : (a = c < d ? h() : k(), a += "(" + c + ", " + d + ", " + e + ")");
    else {
        var l = function (a, c) {
            if (Blockly.isNumber(a))
                a = parseFloat(a);
            else if (a.match(/^\w+$/))
                a = a;
            else {
                var d = Blockly.Python.variableDB_.getDistinctName(b + c, Blockly.Variables.NAME_TYPE);
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
};

//ok
Blockly.Python.controls_repeat = Blockly.Python.controls_repeat_ext;
Blockly.Python.controls_whileUntil = function (a) {
    var b = "UNTIL" == a.getFieldValue("MODE"),
    c = Blockly.Python.valueToCode(a, "BOOL", b ? Blockly.Python.ORDER_LOGICAL_NOT : Blockly.Python.ORDER_NONE) || "False",
    d = Blockly.Python.statementToCode(a, "DO"),
    d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    b && (c = "not " + c);
    return "while " + c + ":\n" + d
};

// Blockly.Python.controls_flow_statements = function () {
//     // Flow statements: continue, break.
//     switch (this.getFieldValue('FLOW')) {
//         case 'BREAK':
//             return 'break;\n';
//         case 'CONTINUE':
//             return 'continue;\n';
//     }
//     throw 'Unknown flow statement.';
// };

//ok
Blockly.Python.controls_flow_statements = function (a) {
    switch (a.getFieldValue("FLOW")) {
    case "BREAK":
        return "break\n";
    case "CONTINUE":
        return "continue\n"
    }
    throw "Unknown flow statement.";
};

//ok
Blockly.Python.base_delay = function () {
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
};
//ok
Blockly.Python.Panic_with_status_code = function () {
    var status_code = Blockly.Python.valueToCode(this, 'STATUS_CODE', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};
//ok
Blockly.Python.controls_millis = function () {
    Blockly.Python.definitions_.import_time = "import time";
    var code = 'time.time()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.controls_mstimer2 = function () {
    Blockly.Python.definitions_['define_MsTimer2'] = '#include <MsTimer2.h>';
    var time = Blockly.Python.valueToCode(this, 'TIME', Blockly.Python.ORDER_ATOMIC);
    var funcName = 'msTimer2_func';
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Python.definitions_[funcName] = code;
    return 'MsTimer2::set(' + time + ', ' + funcName + ');\n';
};

Blockly.Python.controls_mstimer2_start = function () {
    Blockly.Python.definitions_['define_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::start();\n';
};

Blockly.Python.controls_mstimer2_stop = function () {
    Blockly.Python.definitions_['define_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::stop();\n';
};
//ok
Blockly.Python.controls_end_program = function () {
    return 'exit()';
};
//ok
Blockly.Python.reset = function () {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *'
    return 'reset()\n';
};
Blockly.Python.controls_interrupts = function () {
    return 'interrupts();\n';
};

Blockly.Python.controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};


Blockly.Python['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Python.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_RELATIONAL) || '[]';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
      Blockly.Python.PASS;
  var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
  return code;
};

//ok
Blockly.Python.base_type = function () {
    var data = Blockly.Python.valueToCode(this, 'DATA', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'type(' + data + ')';
    return [code,, Blockly.Python.ORDER_ATOMIC];
};