import * as Blockly from 'blockly/core';
import { controls_repeat_ext } from '@mixly/python/generators/control';

export const base_setup = function (_, generator) {
    var branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "").replace(/\n {4}/g, '\n');//去除两端空格
    if (branch) {
        if (branch.endsWith('\n')) {
            generator.setups_['setup_setup'] = branch;
        } else {
            generator.setups_['setup_setup'] = branch + '\n';
        }
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

// ok
export const controls_for = function (a, generator) {
    var b = generator.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE),
        //var b = generator.valueToCode(a, "VAR", generator.ORDER_MEMBER) || "''",
        c = generator.valueToCode(a, "FROM", generator.ORDER_NONE) || "0",
        d = generator.valueToCode(a, "TO", generator.ORDER_NONE) || "0",
        e = generator.valueToCode(a, "STEP", generator.ORDER_NONE) || "1",
        f = generator.addLoopTrap(generator.statementToCode(a, "DO"), a.id) || generator.PASS,
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
        }
        c = l(c, "_start");
        d = l(d, "_end");
        l(e, "_inc");
        a = "number" == typeof c && "number" == typeof d ? c < d ? h(c, d, e) : k(c, d, e) : a(c, d, e)
    }
    return g += "for " + b + " in " + a + ":\n" + f
}

// ok
export const controls_repeat = controls_repeat_ext;

export const controls_whileUntil = function (a, generator) {
    var b = "UNTIL" == a.getFieldValue("MODE"),
        c = generator.valueToCode(a, "BOOL", b ? generator.ORDER_LOGICAL_NOT : generator.ORDER_NONE) || "False",
        d = generator.addLoopTrap(generator.statementToCode(a, "DO"), a.id) || generator.PASS;
    b && (c = "not " + c);
    return "while " + c + ":\n" + d
}

// ok
export const controls_flow_statements = function (a) {
    switch (a.getFieldValue("FLOW")) {
        case "BREAK":
            return "break\n";
        case "CONTINUE":
            return "continue\n"
    }
    throw "Unknown flow statement.";
}

//ok
export const controls_forEach = function (block, generator) {
    // For each loop.
    var variable0 = generator.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = generator.valueToCode(block, 'LIST',
        generator.ORDER_RELATIONAL) || '[]';
    var branch = generator.statementToCode(block, 'DO');
    branch = generator.addLoopTrap(branch, block.id) ||
        generator.PASS;
    var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
    return code;
}

// ok
export const controls_type = function (_, generator) {
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '1000'
    var code = 'type(' + data + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const controls_typeLists = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var type = this.getFieldValue('type');
    // generator.definitions_['func_type' + type] = code;
    return [type, generator.ORDER_ATOMIC];
}
