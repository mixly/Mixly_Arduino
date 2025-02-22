// 初始化SPIFFS
export const initialize_spiffs = function (_, generator) {
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['esp32_spiffs'] = 'File myFile;\n';
    generator.setups_['setup_SPIFFS.begin'] = 'SPIFFS.begin(true);';
    var code = '';
    return code;
}

// 打开文件
export const spiffs_open_file = function (_, generator) {
    var file_var = this.getFieldValue('file_var');
    var file_path = this.getFieldValue('file_path');
    file_path = '"' + file_path + '"';
    var mode = this.getFieldValue('MODE');
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['esp32_spiffs'] = 'File ' + file_var + ';\n';
    return file_var + '= SPIFFS.open(String(' + file_path + '), ' + mode + ');\n';
}

export const spiffs_close_file = function (_, generator) {
    var file_var = this.getFieldValue('file_var');
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['esp32_spiffs'] = 'File ' + file_var + ';\n';
    return file_var + '.close();\n';
}

// 将数据追加到文件
export const spiffs_write_data = function (_, generator) {
    var file_var = this.getFieldValue('file_var');
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['esp32_spiffs'] = 'File ' + file_var + ';\n';
    return file_var + '.print(String(' + data + '));\n';
}

// 文件可读
export const spiffs_read_available = function (_, generator) {
    var file_var = this.getFieldValue('file_var');
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['esp32_spiffs'] = 'File ' + file_var + ';\n';
    var code = file_var + '.available()';
    return [code, generator.ORDER_ATOMIC];
}

// 读取文件内容
export const spiffs_read_data = function (_, generator) {
    var file_var = this.getFieldValue('file_var');
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['esp32_spiffs'] = 'File ' + file_var + ';\n';
    var code = file_var + '.read()';
    return [code, generator.ORDER_ATOMIC];
}

// 检查文件大小
export const spiffs_file_size = function (_, generator) {
    var file_var = this.getFieldValue('file_var');
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['esp32_spiffs'] = 'File ' + file_var + ';\n';
    var code = file_var + '.size()';
    return [code, generator.ORDER_ATOMIC];
}

// 删除文件
export const spiffs_delete_file = function (_, generator) {
    generator.definitions_['include_FS'] = '#include "FS.h"';
    generator.definitions_['include_SPIFFS'] = '#include "SPIFFS.h"';
    var file_path = this.getFieldValue('file_path');
    file_path = '"' + file_path + '"';
    return 'SPIFFS.remove(String(' + file_path + '));';
}

export const store_eeprom_write_long = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    var funcName = 'eepromWriteLong';
    var code2 = 'void ' + funcName + '(int address, unsigned long value) {\n'
        + '  union u_tag {\n'
        + '  	byte b[4];\n'
        + '  	unsigned long ULtime;\n'
        + '  }\n'
        + '  time;\n'
        + '  time.ULtime=value;\n'
        + '  EEPROM.write(address, time.b[0]);\n'
        + '  EEPROM.write(address+1, time.b[1]);\n'
        + '  if (time.b[2] != EEPROM.read(address+2) ) EEPROM.write(address+2, time.b[2]);\n'
        + '  if (time.b[3] != EEPROM.read(address+3) ) EEPROM.write(address+3, time.b[3]);\n'
        + '   EEPROM.commit();\n'
        + '}\n';
    generator.definitions_[funcName] = code2;
    return 'eepromWriteLong(' + address + ', ' + data + ');\n';
}

export const store_eeprom_read_long = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    var code = 'eepromReadLong(' + address + ')';
    var funcName = 'eepromReadLong';
    var code2 = 'unsigned long ' + funcName + '(int address) {\n'
        + '  union u_tag {\n'
        + '  	byte b[4];\n'
        + '  	unsigned long ULtime;\n'
        + '  }\n'
        + '  time;\n'
        + '  time.b[0] = EEPROM.read(address);\n'
        + '  time.b[1] = EEPROM.read(address+1);\n'
        + '  time.b[2] = EEPROM.read(address+2);\n'
        + '  time.b[3] = EEPROM.read(address+3);\n'
        + '  return time.ULtime;\n'
        + '}\n';
    generator.definitions_[funcName] = code2;
    return [code, generator.ORDER_ATOMIC];
}

export const store_eeprom_write_byte = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    return 'EEPROM.write(' + address + ', ' + data + ');\nEEPROM.commit();\n';
}

export const store_eeprom_read_byte = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    generator.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
    var code = 'EEPROM.read(' + address + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const store_eeprom_put = function (_, generator) {
    generator.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.put(' + address + ', ' + data + ');\nEEPROM.commit();';
}

export const store_eeprom_get = function (_, generator) {
    generator.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.get(' + address + ', ' + data + ');\n';
}