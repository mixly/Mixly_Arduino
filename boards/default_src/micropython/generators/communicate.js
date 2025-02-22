import * as Blockly from 'blockly/core';
import * as Mixly from 'mixly';

export const communicate_i2c_onboard = function (block, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_i2c'] = 'from ' + version + ' import onboard_i2c';
    var code = 'onboard_i2c';
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_spi_onboard = function (block, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_' + version + '_onboard_i2c'] = 'from ' + version + ' import onboard_spi';
    var code = 'onboard_spi';
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_i2c_init = function (block, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin1 = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var dropdown_pin2 = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    var freq = generator.valueToCode(this, 'freq', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    return "" + sub + " = machine.SoftI2C(scl = machine.Pin(" + dropdown_pin2 + "), sda = machine.Pin(" + dropdown_pin1 + "), freq = " + freq + ")\n";
}

export const communicate_i2c_read = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + name + ".readfrom(" + address + ", " + data + ")", generator.ORDER_ATOMIC];
}

export const communicate_i2c_write = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return "" + name + ".writeto(" + address + ", " + data + ")\n";
}

export const communicate_i2c_scan = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return ["" + name + ".scan()", generator.ORDER_ATOMIC];
}

export const communicate_i2c_master_read = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".read()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_i2c_available = function (block, generator) {

    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".available()";
    return [code, generator.ORDER_ATOMIC];
}

export const i2c_slave_onreceive = function (block, generator) {
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    generator.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return '';
}

export const communicate_spi_init = function (block, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var freq = generator.valueToCode(this, 'freq', generator.ORDER_ATOMIC);
    var mosi = generator.valueToCode(this, 'mosi', generator.ORDER_ATOMIC);
    var miso = generator.valueToCode(this, 'miso', generator.ORDER_ATOMIC);
    var sck = generator.valueToCode(this, 'sck', generator.ORDER_ATOMIC);
    return "" + name + " = machine.SoftSPI(baudrate=" + freq + ", sck=machine.Pin(" + sck + "), mosi=machine.Pin(" + mosi + "), miso=machine.Pin(" + miso + "))\n";
}

export const communicate_spi_set = function (block, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return "spi.init(baudrate=" + data + ")\n";
}

export const communicate_spi_buffer = function (block, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return "" + varname + "=bytearray(" + data + ")\n";
}

export const communicate_spi_read = function (block, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + varname + ".read(" + data + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_read_output = function (block, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'val', generator.ORDER_ATOMIC);
    return ["" + varname + ".read(" + data + "," + val + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_readinto = function (block, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + varname + ".readinto(" + data + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_readinto_output = function (block, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'val', generator.ORDER_ATOMIC);
    return ["" + varname + ".readinto(" + data + "," + val + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_write = function (block, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + varname + ".write(" + data + ".encode('utf-8'))", generator.ORDER_ATOMIC];
}

export const communicate_spi_write_readinto = function (block, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'val', generator.ORDER_ATOMIC);
    // var op=this.getFieldValue('op');
    // if(op=="byte"){
    return ["" + varname + ".write_readinto(" + data + ".encode('utf-8')," + val + ")", generator.ORDER_ATOMIC];
    // }else{
    //   return [""+varname+".write_readinto(" + data + ","+val+")", generator.ORDER_ATOMIC];
    // }
}

export const communicate_ow_init = function (block, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_onewire'] = "import onewire";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var varName = generator.valueToCode(this, 'BUS', generator.ORDER_ATOMIC);
    var code = "" + name + "=onewire.OneWire(machine.Pin(" + varName + "))\n";
    return code;
}

export const communicate_ow_scan = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".scan()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_ow_reset = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".reset()\n";
    return code;
}

export const communicate_ow_read = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".readbyte()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_ow_write = function (block, generator) {
    var varName = generator.valueToCode(this, 'byte', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var op = this.getFieldValue('op');
    var code = "" + name + "." + op + "(" + varName + ")\n";
    return code;
}

export const communicate_ow_select = function (block, generator) {
    var varName = generator.valueToCode(this, 'byte', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".select_rom(" + varName + ".encode('utf-8'))\n";
    return code;
}

export const communicate_ir_recv_init = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var bit = this.getFieldValue('type');
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    if (sub == "" && bit == "RC5") {
        var code = "ir_rx = irremote.RC5_RX(" + pin + ")\n";
    }
    else if (sub == "") {
        var code = "ir_rx = irremote.NEC_RX(" + pin + "," + bit + ")\n";
    }
    else {
        var code = "ir_rx = irremote.NEC_RX(" + pin + "," + bit + "," + sub + ")\n";
    }
    return code;
}

export const internal_variable = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var index = this.getFieldValue('index');
    var code = "ir_rx.code[" + index + "]";
    return [code, generator.ORDER_ATOMIC];
}

export const recv_fun = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var en = this.getFieldValue('en');
    var code = "ir_rx.enable(" + en + ")\n";
    return code;
}

export const ir_whether_recv = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var code = "ir_rx.any()";
    return [code, generator.ORDER_ATOMIC];
}

export const ir_recv_timeout = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var code = "ir_rx.timeout(" + time + ")\n";
    return code;
}

export const communicate_ir_send_init = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var sam = this.getFieldValue('type');
    var power = generator.valueToCode(this, 'power', generator.ORDER_ATOMIC);
    if (sam == "RC5") {
        var code = "ir_tx = irremote.RC5_TX(" + pin + "," + power + ")\n";
    }
    else {
        var code = "ir_tx = irremote.NEC_TX(" + pin + "," + sam + "," + power + ")\n";
    }
    return code;
}

export const ir_transmit_conventional_data = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var cmd = generator.valueToCode(this, 'cmd', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var toggle = generator.valueToCode(this, 'toggle', generator.ORDER_ATOMIC);
    var code = "ir_tx.transmit(" + cmd + "," + addr + "," + toggle + ")\n";
    return code;
}

export const ir_transmit_study_code = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var s_code = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var code = "ir_tx.transmit(pulses=" + s_code + ")\n";
    return code;
}

export const ir_transmit_raw_code = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var raw = generator.valueToCode(this, 'raw', generator.ORDER_ATOMIC);
    var code = "ir_tx.transmit(raw=" + raw + ")\n";
    return code;
}

export const ir_transmit_busy = function (block, generator) {
    generator.definitions_['import_irremote'] = 'import irremote';
    var code = "ir_tx.busy()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_bluetooth_central_init = function (block, generator) {
    generator.definitions_['import_ble_central'] = 'import ble_central';
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + " = ble_central.BLESimpleCentral()\n";
    return code;
}

export const communicate_bluetooth_peripheral_init = function (block, generator) {
    generator.definitions_['import_ble_peripheral'] = 'import ble_peripheral';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + " = ble_peripheral.BLESimplePeripheral(" + data + ")\n";
    return code;
}

export const communicate_bluetooth_scan = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + ".scan()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_bluetooth_connect = function (block, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var code = name + ".connect(" + mode + '=' + data + ")\n";
    return code;
}

export const communicate_bluetooth_disconnect = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + '.disconnect()\n';
    return code;
}

export const communicate_bluetooth_mac = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return [name + ".mac", generator.ORDER_ATOMIC];
}

export const communicate_bluetooth_is_connected = function (block, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + ".is_connected()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_bluetooth_send = function (block, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + ".send(" + data + ")\n";
    return code;
}

export const communicate_bluetooth_recv_only = function (block, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = v + '.recv()';
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_bluetooth_recv = function (block, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var method = generator.valueToCode(this, 'METHOD', generator.ORDER_ATOMIC);
    var code = v + '.recv(' + method + ')\n';
    return code;
}

export const communicate_bluetooth_handle = function (block, generator) {
    generator.definitions_['import_ble_handle'] = 'import ble_handle';
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var method = generator.valueToCode(this, 'METHOD', generator.ORDER_ATOMIC);
    var code = v + '=ble_handle.Handle()\n' + v + '.recv(' + method + ')\n';
    return code;
}

//espnow
export const communicate_espnow_init = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var varName = generator.valueToCode(this, 'CHNL', generator.ORDER_ATOMIC);
    var power = this.getFieldValue('op');
    var code = "" + name + "=radio.ESPNow(channel=" + varName + ",txpower=" + power + ")\n";
    return code;
}

export const communicate_espnow_init_new = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var varName = generator.valueToCode(this, 'CHNL', generator.ORDER_ATOMIC);
    var varName2 = generator.valueToCode(this, 'DB', generator.ORDER_ATOMIC);
    var code = "" + name + "=radio.ESPNow(channel=" + varName + ',txpower=' + varName2 + ")\n";
    return code;
}

export const network_espnow_mac = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return [name + ".mac", generator.ORDER_ATOMIC];
}

export const network_espnow_info = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return [name + ".info()", generator.ORDER_ATOMIC];
}

export const network_espnow_recv = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var mode = this.getFieldValue('mode');
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + ".recv()" + mode;
    return [code, generator.ORDER_ATOMIC];
}

export const network_espnow_send = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var mac = generator.valueToCode(this, 'mac', generator.ORDER_ATOMIC);
    var content = generator.valueToCode(this, 'content', generator.ORDER_ATOMIC);
    var code = name + ".send(" + mac + "," + content + ")\n";
    return code;
}

export const network_espnow_recv_handle = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var method = generator.valueToCode(this, 'METHOD', generator.ORDER_ATOMIC);
    var code = name + ".recv_cb(" + method + ")\n";
    return code;
}

//radio
export const espnow_radio_channel = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    generator.definitions_['var_declare_ESPNow_radio'] = "ESPNow_radio=radio.ESPNow()";
    var varName = generator.valueToCode(this, 'CHNL', generator.ORDER_ATOMIC);
    var code = "ESPNow_radio.set_channel(channel=" + varName + ")\n";
    return code;
}

export const espnow_radio_txpower = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    generator.definitions_['var_declare_ESPNow_radio'] = "ESPNow_radio=radio.ESPNow()";
    var power = this.getFieldValue('op');
    var code = "ESPNow_radio.set_channel(txpower=" + power + ")\n";
    return code;
}

export const espnow_radio_channel_new = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    var varName2 = generator.valueToCode(this, 'DB', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_ESPNow_radio'] = "ESPNow_radio=radio.ESPNow(channel=1,txpower=" + varName2 + ")";
    var varName = generator.valueToCode(this, 'CHNL', generator.ORDER_ATOMIC);
    var code = "ESPNow_radio.set_channel(" + varName + ")\n";
    return code;
}

export const espnow_radio_on_off = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    generator.definitions_['var_declare_ESPNow_radio'] = 'ESPNow_radio = radio.ESPNow()';
    var op = this.getFieldValue('on_off');
    var code = "ESPNow_radio.active(" + op + ")\n";
    return code;
}

export const espnow_radio_send = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    generator.definitions_['var_declare_ESPNow_radio'] = 'ESPNow_radio = radio.ESPNow()';
    var varName = generator.valueToCode(this, 'send', generator.ORDER_ATOMIC);
    var code = 'ESPNow_radio.send("ffffffffffff",' + varName + ")\n";
    return code;
}

export const espnow_radio_rec = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    generator.definitions_['var_declare_ESPNow_radio'] = 'ESPNow_radio = radio.ESPNow()';
    var code = "ESPNow_radio.recv()";
    return [code, generator.ORDER_ATOMIC];
}

export const espnow_radio_recv_msg = function (block, generator) {
    var code = "ESPNow_radio_msg";
    return [code, generator.ORDER_ATOMIC];
}

export const espnow_radio_recv = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    generator.definitions_['import_ubinascii'] = 'import ubinascii';
    generator.definitions_['var_declare_ESPNow_radio'] = 'ESPNow_radio = radio.ESPNow()';
    var doCode = generator.statementToCode(block, 'DO') || generator.PASS;
    generator.definitions_['def_ESPNow_radio_recv'] = 'def ESPNow_radio_recv(mac,ESPNow_radio_msg):\n' + doCode;
    generator.definitions_['def_ESPNow_radio_recv_all'] = '_radio_msg_list = []\n' + 'def ESPNow_radio_recv_callback(mac,ESPNow_radio_msg):\n' + '    global _radio_msg_list\n' + '    try: ESPNow_radio_recv(mac,ESPNow_radio_msg)\n' + '    except: pass\n' + '    if str(ESPNow_radio_msg) in _radio_msg_list:\n' + "        eval('radio_recv_' + bytes.decode(ubinascii.hexlify(ESPNow_radio_msg)) + '()')\n";
    generator.definitions_['ESPNow_radio_recv_callback'] = "ESPNow_radio.recv_cb(ESPNow_radio_recv_callback)\n";

    return '';
}

var writeUTF = function (str, isGetBytes) {
    var back = [];
    var byteSize = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1;
            back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2;
            back.push((192 | (31 & (code >> 6))));
            back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff) || (0xe000 <= code && code <= 0xffff)) {
            byteSize += 3;
            back.push((224 | (15 & (code >> 12))));
            back.push((128 | (63 & (code >> 6))));
            back.push((128 | (63 & code)))
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff;
    }
    if (isGetBytes) {
        return back;
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back);
    }
    return [byteSize >> 8, byteSize & 0xff].concat(back);
}

var toUTF8Hex = function (str) {
    var charBuf = writeUTF(str, true);
    var re = '';
    for (var i = 0; i < charBuf.length; i++) {
        var x = (charBuf[i] & 0xFF).toString(16);
        if (x.length === 1) {
            x = '0' + x;
        }
        re += x;
    }
    return re;
}

export const espnow_radio_recv_certain_msg = function (block, generator) {
    generator.definitions_['import_radio'] = "import radio";
    generator.definitions_['import_ubinascii'] = 'import ubinascii';
    generator.definitions_['var_declare_ESPNow_radio'] = 'ESPNow_radio = radio.ESPNow()';
    var doCode = generator.statementToCode(block, 'DO') || generator.PASS;
    generator.definitions_['def_ESPNow_radio_recv_all'] = '_radio_msg_list = []\n' + 'def ESPNow_radio_recv_callback(mac,ESPNow_radio_msg):\n' + '    global _radio_msg_list\n' + '    try: ESPNow_radio_recv(mac,ESPNow_radio_msg)\n' + '    except: pass\n' + '    if str(ESPNow_radio_msg) in _radio_msg_list:\n' + "        eval('radio_recv_' + bytes.decode(ubinascii.hexlify(ESPNow_radio_msg)) + '()')\n";
    generator.definitions_['ESPNow_radio_recv_callback'] = "ESPNow_radio.recv_cb(ESPNow_radio_recv_callback)\n";
    var message = block.getFieldValue('msg');
    var message_utf8 = toUTF8Hex(message);
    generator.definitions_['def_radio_recv_' + message_utf8] =
        '_radio_msg_list.append(\'' + message + '\')\n' +
        'def radio_recv_' + message_utf8 + '():\n' + doCode;
    return '';
}

export const espnow_radio_recv_new = function (block, generator) {
    generator.definitions_['import_radio'] = 'import radio';
    generator.definitions_['var_declare_ESPNow_radio'] = 'ESPNow_radio = radio.ESPNow()';
    var doCode = generator.statementToCode(block, 'DO') || generator.PASS;
    generator.definitions_['def_ESPNow_radio_recv'] = 'def ESPNow_radio_recv(mac, ESPNow_radio_msg):\n'
        + `${doCode}\nESPNow_radio.recv_cb("__all__", ESPNow_radio_recv)\n`;
    return '';
}

export const espnow_radio_recv_certain_msg_new = function (block, generator) {
    generator.definitions_['import_radio'] = 'import radio';
    generator.definitions_['var_declare_ESPNow_radio'] = 'ESPNow_radio = radio.ESPNow()';
    var doCode = generator.statementToCode(block, 'DO') || generator.PASS;
    var message = block.getFieldValue('msg');
    generator.definitions_['def_ESPNow_radio_recv_' + message] = 'def ESPNow_radio_recv(mac, ESPNow_radio_msg):\n'
        + `${doCode}\nESPNow_radio.recv_cb("${message}", ESPNow_radio_recv)\n`;
    return '';
}

export const lora_init = function (block, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sv = generator.valueToCode(this, 'SPISUB', generator.ORDER_ATOMIC);
    var pv = generator.valueToCode(this, 'PINSUB', generator.ORDER_ATOMIC);
    var fr = generator.valueToCode(this, 'frequency', generator.ORDER_ATOMIC);
    var r = generator.valueToCode(this, 'rate', generator.ORDER_ATOMIC);
    var f = generator.valueToCode(this, 'factor', generator.ORDER_ATOMIC);
    var p = generator.valueToCode(this, 'power', generator.ORDER_ATOMIC);
    var bandwidth = this.getFieldValue('bandwidth');
    var code;
    generator.definitions_['import_rfm98'] = 'import rfm98';
    var code = v + ' = rfm98.RFM98(' + sv + ',cs_pin=' + pv + ',frequency_mhz=' + fr + ',signal_bandwidth=' + bandwidth + ',coding_rate=' + r + ',spreading_factor=' + f + ',tx_power=' + p + ')\n';
    return code;
}

export const lora_packet = function (block, generator) {
    generator.definitions_['import_rfm98'] = 'import rfm98';
    var key = this.getFieldValue('key');
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return [name + "." + key + '()', generator.ORDER_ATOMIC];
}

export const lora_send = function (block, generator) {
    generator.definitions_['import_rfm98'] = 'import rfm98';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = name + ".send(" + data + ")\n";
    return code;
}

export const lora_recv = function (block, generator) {
    generator.definitions_['import_rfm98'] = 'import rfm98';
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return [name + '.recv()', generator.ORDER_ATOMIC];
}

export const urequests_get = function (block, generator) {
    generator.definitions_.import_requests = "import urequests";
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var str = generator.valueToCode(this, 'DOMAIN', generator.ORDER_ATOMIC);
    var code = varName + '= ' + 'urequests.get(' + str + ')\n';
    return code;
}

export const urequests_attribute = function (block, generator) {
    generator.definitions_.import_requests = "import urequests";
    var varName = generator.valueToCode(this, 'VAL', generator.ORDER_ASSIGNMENT) || '0';
    var attr = this.getFieldValue('ATTR');
    var code = varName + "." + attr;
    return [code, generator.ORDER_ATOMIC];
}

export const urequests_method = function (block, generator) {
    generator.definitions_.import_requests = "import urequests";
    var method = this.getFieldValue('DIR');
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "urequests." + method + "(" + str + ')';
    return [code, generator.ORDER_ATOMIC];
}