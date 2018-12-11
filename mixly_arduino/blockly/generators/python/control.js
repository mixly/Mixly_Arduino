'use strict';

goog.provide('Blockly.Python.loops');

goog.require('Blockly.Python');

Blockly.Python.base_setup = function () {
    var branch = Blockly.Python.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "").replace(/\n    /g, '\n');//去除两端空格
    if(branch.endsWith('\n')){
        Blockly.Python.setups_['setup_setup'] = branch;
    }
    else{
        Blockly.Python.setups_['setup_setup'] = branch + '\n';
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

Blockly.Python.controls_try_finally = function () {
    var n = 0;
    var argument = Blockly.Python.valueToCode(this, 'IF' + n,
        Blockly.Python.ORDER_NONE) || 'null';
    var branch = '';
    var t = Blockly.Python.statementToCode(this, 'try');
    var code = 'try:\n' + t;
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.Python.valueToCode(this, 'IF' + n,
          Blockly.Python.ORDER_NONE) || '';
        if (argument !== '')
            argument = ' ' + argument
        branch = Blockly.Python.statementToCode(this, 'DO' + n);
        code += 'except' + argument + ': \n' + branch;
    }
    if (this.elseCount_) {
        branch = Blockly.Python.statementToCode(this, 'ELSE');
        code += 'finally:\n' + branch;
    }
    // code += '}';
    return code;
};

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

Blockly.Python.controls_for_range = function (block) {
    var iter = Blockly.Python.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
    from = Blockly.Python.valueToCode(block, "FROM", Blockly.Python.ORDER_NONE) || "0",
    end = Blockly.Python.valueToCode(block, "TO", Blockly.Python.ORDER_NONE) || "0",
    step = Blockly.Python.valueToCode(block, "STEP", Blockly.Python.ORDER_NONE) || "1",
    dostatement = Blockly.Python.statementToCode(block, "DO"),
    pass = Blockly.Python.addLoopTrap(dostatement, block.id) || Blockly.Python.PASS;
    Blockly.Python.setups_["mixly_range"] = "def mixly_range(start, stop, step):\n" +
                                            "    for i in range(start, stop + 1, step):\n" +
                                            "        yield i\n\n";
    return "for " + iter + " in mixly_range(" + from + ", " + end + ", " + step + "):\n" + pass;
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
Blockly.Python.controls_delay = function () {
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


Blockly.Python.controls_range = function () {
    var from = Blockly.Python.valueToCode(this, "FROM", Blockly.Python.ORDER_NONE) || "0";
    var end = Blockly.Python.valueToCode(this, "TO", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(this, "STEP", Blockly.Python.ORDER_NONE) || "1";
    var code = "range(" + from + ", " + end + ", " + step + ")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.controls_lambda = function (a) {
    var c = Blockly.Python.valueToCode(a, "BOOL", Blockly.Python.ORDER_NONE) || "None",
    d = Blockly.Python.statementToCode(a, "DO") || "pass";
    var code = "lambda " + c + ": " + d;
    code = code.replace('\n','').replace('    ','')
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.time_sleep = function () {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'time.sleep(' + delay_time + ')\n';
    return code;
};

Blockly.Python.controls_pass = function () {
    return 'pass\n';
};

Blockly.Python.base_type=Blockly.Python.controls_type;
Blockly.Python.controls_TypeLists=Blockly.Python.controls_typeLists;