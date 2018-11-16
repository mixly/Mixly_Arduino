'use strict';

var whiteAttrsArr = ['setups', 'definitions', 'workspaceToCode'];

for (var func in Blockly.Python) {
    if(whiteAttrsArr.indexOf(func) == -1 && Blockly.Grader[func] == null) {
        Blockly.Grader[func] = Blockly.Python[func];
    }
}

