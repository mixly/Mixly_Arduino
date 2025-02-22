import { Python } from '@mixly/python';
import KEYBOARD_INTERRUPT_TEMPLATE from './templates/python/keyboard-interrupt.py';

Python.finish = function (code) {
    // Convert the definitions dictionary into a list.
    if (code !== "") {
        code = code.replace(/\n/g, '\n');
        code = code.replace(/\n\s+$/, '\n');
    }
    var definitions = [];
    for (var name in Python.definitions_) {
        definitions.push(Python.definitions_[name]);
    }
    var functions = [];
    for (let name in Python.functions_) {
        functions.push(Python.functions_[name]);
    }
    var setups = [];
    for (let name in Python.setups_) {
        setups.push(Python.setups_[name]);
    }
    if (setups.length !== 0)
        setups.push('\n');
    var loops = [];
    for (let name in Python.loops_) {
        loops.push(Python.loops_[name]);
    }
    var codeEnd = [];
    for (let name in Python.codeEnd_) {
        codeEnd.push(Python.codeEnd_[name]);
    }
    if (codeEnd.length !== 0)
        codeEnd.push('\n');
    // Clean up temporary data.
    //delete Python.definitions_;
    //delete Python.functionNames_;
    //Python.variableDB_.reset();
    if (loops.length > 0)
        return KEYBOARD_INTERRUPT_TEMPLATE + definitions.join('\n') + '\n' + functions.join('\n')
            + '\n' + setups.join('') + '\n' + code
            + 'while True:\n' + loops.join('') + codeEnd.join('\n');
    return KEYBOARD_INTERRUPT_TEMPLATE + definitions.join('\n') + '\n' + functions.join('\n') + '\n'
        + setups.join('') + '\n' + code + codeEnd.join('\n');
}

export default Python;