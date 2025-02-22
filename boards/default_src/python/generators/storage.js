export const storage_open_file_with_os = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var fn = generator.valueToCode(this, 'fn', generator.ORDER_ATOMIC);
    return "os.startfile(" + fn + ")\n";
}

export const storage_fileopen = function (_, generator) {
    // For each loop.
    var variable0 = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var fn = generator.valueToCode(this, 'FILENAME', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = variable0 + ' = open(' + fn + ', \'' + mode + '\')\n';
    return code;
}

export const storage_fileopen_new = function (_, generator) {  // For each loop.
    var fn = generator.valueToCode(this, 'FILENAME', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = 'open(' + fn + ', \'' + mode + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const storage_fileopen_new_encoding = function (_, generator) {  // For each loop.
    var fn = generator.valueToCode(this, 'FILENAME', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var encode = this.getFieldValue('CODE');
    var code = 'open(' + fn + ', \'' + mode + '\', encoding="' + encode + '")';
    return [code, generator.ORDER_ATOMIC];
}

export const storage_file_write = function (_, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    return file + ".write(" + data + ")\n";
}

export const storage_get_contents_without_para = function (_, generator) {
    var mode = this.getFieldValue('MODE');
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = file + '.' + mode + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const storage_get_contents = function (_, generator) {
    var mode = this.getFieldValue('MODE');
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'SIZE', generator.ORDER_ATOMIC);
    var code = file + '.' + mode + '(' + size + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const storage_get_a_line = function (_, generator) {
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'SIZE', generator.ORDER_ATOMIC);
    var code = file + ".readline(" + size + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const storage_can_write_ornot = function (_, generator) {
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = file + ".writable()";
    return [code, generator.ORDER_ATOMIC];
}

export const storage_get_filename = function (_, generator) {
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = file + ".name()";
    return [code, generator.ORDER_ATOMIC];
}

export const storage_close_file = function (_, generator) {
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = file + ".close()\n";
    return code;
}

export const storage_list_all_files = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var code = 'os.listdir()';
    return [code, generator.ORDER_ATOMIC];
}

export const storage_delete_file = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var mode = this.getFieldValue('MODE');
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "os." + mode + "(" + file + ")\n";
    return code;
}

export const storage_get_file_size = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "os.path.getsize(" + file + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const storage_file_tell = function (_, generator) {
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = file + ".tell()";
    return [code, generator.ORDER_ATOMIC];
}

export const storage_file_seek = function (_, generator) {
    var mode = this.getFieldValue('MODE');
    var mode_num = 0;
    if (mode == 'start') {
        mode_num = 0;
    }
    else if (mode == 'current') {
        mode_num = 1;
    }
    else {
        mode_num = 2;
    }
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'SIZE', generator.ORDER_ATOMIC);
    var code = file + '.seek(' + size + ',' + mode_num + ')\n';
    return code;
}

export const storage_change_dir = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "os.chdir(" + file + ")\n";
    return code;
}

export const storage_get_current_dir = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var code = 'os.getcwd()';
    return [code, generator.ORDER_ATOMIC];
}

export const storage_make_dir = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var mode = this.getFieldValue('MODE');
    var path = generator.valueToCode(this, 'PATH', generator.ORDER_ATOMIC);
    var code = 'os.' + mode + '(' + path + ')\n';
    return code;
}

export const storage_rename = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var file1 = generator.valueToCode(this, 'NEWFILE', generator.ORDER_ATOMIC);
    var code = "os.rename(" + file + "," + file1 + ")\n";
    return code;
}

export const storage_is_file = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = "os." + mode + "(" + file + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const sdcard_use_spi_init = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    generator.definitions_['import_sdcard'] = 'import sdcard';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sv = generator.valueToCode(this, 'SPISUB', generator.ORDER_ATOMIC);
    var pv = generator.valueToCode(this, 'PINSUB', generator.ORDER_ATOMIC);
    var code = v + ' = sdcard.SDCard(' + sv + ',' + pv + ')\n';
    return code;
}

export const sdcard_mount = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    generator.definitions_['import_sdcard'] = 'import sdcard';
    var sd = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var dir = generator.valueToCode(this, 'DIR', generator.ORDER_ATOMIC);
    return "os.mount(" + sd + ',' + dir + ")\n";
}