import { JSFuncs } from 'mixly';

var pin_cs;

export const store_sd_init = function (_, generator) {
    var board_type = JSFuncs.getPlatform();
    pin_cs = generator.valueToCode(this, 'PIN_CS', generator.ORDER_ATOMIC);
    if (board_type.match(RegExp(/ESP32/))) {
        generator.definitions_['include_mySD'] = '#include <mySD.h>';
    } else {
        generator.definitions_['include_SD'] = '#include <SD.h>';
    }
    generator.definitions_['include_SPI'] = '#include <SPI.h>';
    generator.setups_['setup_sd_write_begin'] = 'SD.begin(' + pin_cs + ');';
    var code = '';
    return code;
}

export const store_sd_write = function (_, generator) {
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC) || '""';
    //file=file.replace(/String/,"");
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '""';
    //data=data.replace(/String/,"");
    var newline = generator.valueToCode(this, 'NEWLINE', generator.ORDER_ATOMIC) || 'false';
    generator.definitions_['var_declare_File_datafile'] = 'File datafile;';
    var code = 'datafile = SD.open(' + file + ', FILE_WRITE);\n';
    code += 'if(datafile){\n';
    code += '	datafile.print(' + data + ');\n';
    if (newline == 'true') {
        code += '	datafile.println("");\n';
    }
    code += '	datafile.close();\n';
    code += '}\n';
    return code;
}

export const sd_card_type = function (_, generator) {
    generator.definitions_['var_declare_Sd2Card_card'] = 'Sd2Card card;';
    generator.setups_['setup_card_init'] = 'card.init(SPI_HALF_SPEED, ' + pin_cs + ');';
    var code = 'card.type()';
    return [code, generator.ORDER_ATOMIC];
}

export const sd_card_root_files = function (_, generator) {
    generator.definitions_['var_declare_Sd2Card_card'] = 'Sd2Card card;';
    generator.definitions_['var_declare_SdFile'] = 'SdFile root;';
    generator.definitions_['var_declare_SdVolume'] = 'SdVolume volume;';
    generator.setups_['setup_card_init'] = 'card.init(SPI_HALF_SPEED, ' + pin_cs + ');';
    generator.setups_['setup_volume_init'] = 'volume.init(card);';
    var code = 'root.openRoot(volume);\nroot.ls(LS_R | LS_DATE | LS_SIZE);';
    return code;
}

export const sd_volume = function (_, generator) {
    generator.definitions_['var_declare_Sd2Card_card'] = 'Sd2Card card;';
    generator.setups_['setup_card_init'] = 'card.init(SPI_HALF_SPEED, ' + pin_cs + ');';
    generator.definitions_['var_declare_SdVolume'] = 'SdVolume volume;';
    generator.setups_['setup_volume_init'] = 'volume.init(card);';
    var volume_TYPE = this.getFieldValue('volume_TYPE');
    var code = volume_TYPE;
    return [code, generator.ORDER_ATOMIC];
}

export const sd_exist = function (_, generator) {
    var text_FileName = generator.valueToCode(this, 'FileName', generator.ORDER_ATOMIC);
    var code = 'SD.exists(' + text_FileName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sd_read = function (_, generator) {
    var text_FileName = generator.valueToCode(this, 'FileName', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_File_datafile'] = 'File datafile;';
    generator.definitions_['var_declare_File_datafile_SD_card_reading'] = 'String SD_card_reading(String path) {\n'
        + 'datafile = SD.open(path.c_str());\n'
        + ' String sd_data = "";\n'
        + ' while (datafile.available()) {\n'
        + '  sd_data = String(sd_data) + String(char(datafile.read()));\n'
        + ' }\n'
        + '  return sd_data;\n'
        + '}';
    var code = 'SD_card_reading(' + text_FileName + ')'
    return [code, generator.ORDER_ATOMIC];
}

export const sd_DelFile = function (_, generator) {
    var text_FileName = generator.valueToCode(this, 'FileName', generator.ORDER_ATOMIC);
    var code = 'SD.remove(' + text_FileName + ');';
    return code;
}

export const store_eeprom_write_long = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    var funcName = 'eepromWriteLong';
    var code2 = 'void ' + funcName + '(int address, unsigned long value){\n'
        + '  union u_tag {\n'
        + '  	byte b[4];\n'
        + '  	unsigned long ULtime;\n'
        + '  }\n'
        + '  time;\n'
        + '  time.ULtime=value;\n'
        + '  EEPROM.write(address, time.b[0]);\n'
        + '  EEPROM.write(address+1, time.b[1]);\n'
        + '  if(time.b[2] != EEPROM.read(address+2))\n'
        + '    EEPROM.write(address+2, time.b[2]);\n'
        + '  if(time.b[3] != EEPROM.read(address+3))\n'
        + '    EEPROM.write(address+3, time.b[3]);\n'
        + '}\n';
    generator.definitions_[funcName] = code2;
    return 'eepromWriteLong(' + address + ', ' + data + ');\n';
}

export const store_eeprom_read_long = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
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
    return 'EEPROM.write(' + address + ', ' + data + ');\n';
}

export const store_eeprom_read_byte = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    var code = 'EEPROM.read(' + address + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const store_eeprom_put = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.put(' + address + ', ' + data + ');\n';
};

export const store_eeprom_get = function (_, generator) {
    var address = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0';
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.get(' + address + ', ' + data + ');\n';
}

//ESP32简化SPIFFS
export const simple_spiffs_store_spiffs_write = function (_, generator) {
    var MODE = this.getFieldValue('MODE');
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC) || '""';
    //file=file.replace(/String/,"");
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '""';
    //data=data.replace(/String/,"");
    var newline = generator.valueToCode(this, 'NEWLINE', generator.ORDER_ATOMIC) || 'false';
    generator.definitions_['include_ESP_FS'] = '#include "FS.h"';
    generator.definitions_['include_ESP_SPIFFS'] = '#include "SPIFFS.h"';

    if (MODE == 1) {
        generator.definitions_['var_simple_spiffs_store_spiffs_write' + MODE] = 'void writeFile(fs::FS &fs, const char * path, const char * message) {\n'
            + '  File file = fs.open(path, FILE_WRITE);\n'
            + '  if (!file) {\n'
            + '    Serial.println("- failed to open file for writing");\n'
            + '    return;\n'
            + '  }\n'
            + '  if (file.print(message)) {\n'
            + '    Serial.println("- file written");\n'
            + '  } else {\n'
            + '    Serial.println("- write failed");\n'
            + '  }\n'
            + '  file.close();\n'
            + '}';
        if (newline == 'true') {
            var code = 'writeFile(SPIFFS, ' + file + ', String(String(' + data + ') + String("\\r\\n")).c_str());\n';
        } else {
            var code = 'writeFile(SPIFFS, ' + file + ', String(' + data + ').c_str());\n';
        }
    }
    if (MODE == 2) {
        generator.definitions_['var_simple_spiffs_store_spiffs_write' + MODE] = 'void appendFile(fs::FS &fs, const char * path, const char * message) {\n'
            + '  File file = fs.open(path, FILE_APPEND);\n'
            + '  if (!file) {\n'
            + '    Serial.println("- failed to open file for appending");\n'
            + '    return;\n'
            + '  }\n'
            + '  if (file.print(message)) {\n'
            + '    Serial.println("- message appended");\n'
            + '  } else {\n'
            + '    Serial.println("- append failed");\n'
            + '  }\n'
            + '  file.close();\n'
            + '}';
        if (newline == 'true') {
            var code = 'appendFile(SPIFFS, ' + file + ', String(String(' + data + ') + String("\\r\\n")).c_str());\n';
        } else {
            var code = 'appendFile(SPIFFS, ' + file + ', String(' + data + ').c_str());\n';
        }
    }
    return code;
}

export const simple_spiffs_read = function (_, generator) {
    var text_FileName = generator.valueToCode(this, 'FileName', generator.ORDER_ATOMIC);
    generator.definitions_['include_ESP_FS'] = '#include "FS.h"';
    generator.definitions_['include_ESP_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['var_simple_spiffs_read'] = 'String readFile(fs::FS &fs, const char * path) {\n'
        + '  File file = fs.open(path);\n'
        + '  if (!file || file.isDirectory()) {\n'
        + '    Serial.println("- failed to open file for reading");\n'
        + '    file.close();\n'
        + '    return "SPIFFS_error";\n'
        + '  } else {\n'
        + '    Serial.println("- read from file:");\n'
        + '    String SPIFFS_data = "";\n'
        + '    while (file.available()) {\n'
        + '     SPIFFS_data = String(SPIFFS_data) + String(char(file.read()));\n'
        + '   }\n'
        + '   file.close();\n'
        + '   return SPIFFS_data;\n'
        + ' }\n'
        + '}';
    generator.setups_['setup_ESP_SPIFFS'] = '  if (!SPIFFS.begin(true)) {\n'
        + '    Serial.println("SPIFFS Mount Failed");\n'
        + '   return;\n'
        + ' }';
    var code = 'readFile(SPIFFS, ' + text_FileName + ')'
    return [code, generator.ORDER_ATOMIC];
}

export const simple_spiffs_DelFile = function (_, generator) {
    generator.definitions_['include_ESP_FS'] = '#include "FS.h"';
    generator.definitions_['include_ESP_SPIFFS'] = '#include "SPIFFS.h"';
    generator.definitions_['var_simple_spiffs_DelFile'] = 'void deleteFile(fs::FS &fs, const char * path) {\n'
        + '  if (fs.remove(path)) {\n'
        + '    Serial.println("- file deleted");\n'
        + '  } else {\n'
        + '    Serial.println("- delete failed");\n'
        + '  }\n'
        + '}';
    generator.setups_['setup_ESP_SPIFFS'] = '  if (!SPIFFS.begin(true)) {\n'
        + '    Serial.println("SPIFFS Mount Failed");\n'
        + '   return;\n'
        + ' }';
    var text_FileName = generator.valueToCode(this, 'FileName', generator.ORDER_ATOMIC);
    var code = 'deleteFile(SPIFFS, ' + text_FileName + ');\n';
    return code;
}