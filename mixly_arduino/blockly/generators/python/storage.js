'use strict';

goog.provide('Blockly.Python.storage');

goog.require('Blockly.Python');

Blockly.Python['storage_fileopen'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
  var fn = Blockly.Python.valueToCode(this, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var mode = this.getFieldValue('MODE');
  var code = variable0 + ' = open(' + fn + ', \'' + mode +'\')\n';
  return code;
};

Blockly.Python.storage_file_write = function () {
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    return file+".write(" + data + ")\n";
}

Blockly.Python.storage_get_contents = function () {
    var mode = this.getFieldValue('MODE');
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'SIZE', Blockly.Python.ORDER_ATOMIC);
    var code = file+'.'+mode+'(' + size + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.storage_get_a_line = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'SIZE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".readline(" + size + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.storage_can_write_ornot = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".writable()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.storage_get_filename = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".name()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.storage_close_file = function () {
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = file+".close()\n";
    return code;
};

Blockly.Python.storage_list_all_files = function() {
  Blockly.Python.definitions_['import_os'] = 'import os';
  var code = 'os.listdir()';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.storage_delete_file = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "os.remove("+file+")\n";
    return code;
};

Blockly.Python.storage_get_file_size = function () {
    Blockly.Python.definitions_['import_os'] = 'import os';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "os.size("+file+")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};