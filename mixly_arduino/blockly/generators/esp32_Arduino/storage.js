'use strict';

goog.provide('Blockly.Arduino.storage');

goog.require('Blockly.Arduino');

Blockly.Arduino['storage_fileopen'] = function() {
  // For each loop.
  var variable0 = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
  var fn = Blockly.Arduino.valueToCode(this, 'FILENAME', Blockly.Arduino.ORDER_ATOMIC);
  var mode = this.getFieldValue('MODE');
  var code = variable0 + ' = open(' + fn + ', \'' + mode +'\')\n';
  return code;
};

Blockly.Arduino.storage_file_write = function () {
	var mode = this.getFieldValue('MODE');
	var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
	var filename = Blockly.Arduino.valueToCode(this, 'FILENAME', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_FS_SPIFFS'] = '#include "FS.h"\n#include "SPIFFS.h"';
	var funcName = "FS_"+mode;
	var code2 = 'void' + ' ' + funcName + '(fs::FS &fs, const char * path, const char * message) {\nFile file = fs.open(path, '+mode+');\nfile.print(message);\n}\n';
	Blockly.Arduino.definitions_[funcName] = code2;
	var code=funcName+"(SPIFFS,"+filename+", "+data+");";
	return code;
}

Blockly.Arduino.storage_get_contents = function () {
	var mode = this.getFieldValue('MODE');
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var size = Blockly.Arduino.valueToCode(this, 'SIZE', Blockly.Arduino.ORDER_ATOMIC);
	var code = file+'.'+mode+'(' + size + ')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.storage_get_a_line = function () {
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var size = Blockly.Arduino.valueToCode(this, 'SIZE', Blockly.Arduino.ORDER_ATOMIC);
	var code = file+".readline(" + size + ')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.storage_can_write_ornot = function () {
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var code = file+".writable()";
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.storage_get_filename = function () {
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var code = file+".name()";
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.storage_close_file = function () {
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var code = file+".close()\n";
	return code;
};

Blockly.Arduino.storage_list_all_files = function() {
	Blockly.Arduino.definitions_['import_os'] = 'import os';
	var code = 'os.listdir()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.storage_delete_file = function () {
	Blockly.Arduino.definitions_['import_os'] = 'import os';
	var mode = this.getFieldValue('MODE');
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var code = "os."+mode+"("+file+")\n";
	return code;
};

Blockly.Arduino.storage_get_file_size = function () {
	Blockly.Arduino.definitions_['import_os'] = 'import os';
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var code = "os.size("+file+")";
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.storage_file_tell = function () {
	var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
	var code = file+".tell()";
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.storage_file_seek = function () {
	var mode = this.getFieldValue('MODE');
	var mode_num = 0;
	if (mode == 'start'){
		mode_num = 0;}
		else if(mode == 'current'){
			mode_num = 1;
		}
		else{
			mode_num = 2;
		}
		var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
		var size = Blockly.Arduino.valueToCode(this, 'SIZE', Blockly.Arduino.ORDER_ATOMIC);
		var code = file+'.seek('+ size + ',' + mode_num + ')';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};

	Blockly.Arduino.storage_change_dir = function () {
		Blockly.Arduino.definitions_['import_os'] = 'import os';
		var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
		var code = "os.chdir("+file+")\n";
		return code;
	};

	Blockly.Arduino.storage_get_current_dir = function() {
		Blockly.Arduino.definitions_['import_os'] = 'import os';
		var code = 'os.getcwd()';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Arduino.storage_make_dir = function () {
		Blockly.Arduino.definitions_['import_os'] = 'import os';
		var mode = this.getFieldValue('MODE');
		var path = Blockly.Arduino.valueToCode(this, 'PATH', Blockly.Arduino.ORDER_ATOMIC);
		var code = 'os.'+mode+'(' + path + ')';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};

	Blockly.Arduino.storage_rename = function () {
		Blockly.Arduino.definitions_['import_os'] = 'import os';
		var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
		var file1 = Blockly.Arduino.valueToCode(this, 'NEWFILE', Blockly.Arduino.ORDER_ATOMIC);
		var code = "os.rename("+file+","+file1+")\n";
		return code;
	};

	Blockly.Arduino.storage_is_file = function () {
		Blockly.Arduino.definitions_['import_os'] = 'import os';
		var file = Blockly.Arduino.valueToCode(this, 'FILE', Blockly.Arduino.ORDER_ATOMIC);
		var mode = this.getFieldValue('MODE');
		var code = "os."+ mode + "(" + file + ")";
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};