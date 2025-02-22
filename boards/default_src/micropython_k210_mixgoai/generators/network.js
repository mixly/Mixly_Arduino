export const network_init = function (_, generator) {
    generator.definitions_['import net_espat'] = "import net_espat";
    var TX = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    var RX = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    return "ESP_AT = net_espat.wifi_init(" + RX + "," + TX + ")\n";
}

export const network_scan = function (_, generator) {
    generator.definitions_['import net_espat'] = "import net_espat";
    var code = "net_espat.scans(ESP_AT)";
    return [code, generator.ORDER_ATOMIC];
}

export const network_connect = function (_, generator) {
    generator.definitions_['import net_espat'] = "import net_espat";
    var account = generator.valueToCode(this, 'account', generator.ORDER_ATOMIC);
    var passwor = generator.valueToCode(this, 'password', generator.ORDER_ATOMIC);
    var code = "ESP_AT.connect(" + account + "," + passwor + ")\n";
    return code;
}

export const network_ifconfig = function (_, generator) {
    generator.definitions_['import net_espat'] = "import net_espat";
    var mode = this.getFieldValue('mode');
    if (mode == "1")
        var code = "ESP_AT.ifconfig()";
    if (mode == "2")
        var code = "ESP_AT.isconnected()";
    return [code, generator.ORDER_ATOMIC];
}

export const network_disconnect = function (_, generator) {
    generator.definitions_['import net_espat'] = "import net_espat";
    var code = "ESP_AT.disconnect()\n";
    return code;
}

export const network_enable_ap = function (_, generator) {
    generator.definitions_['import net_espat'] = "import net_espat";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var account = generator.valueToCode(this, 'account', generator.ORDER_ATOMIC);
    var passwor = generator.valueToCode(this, 'password', generator.ORDER_ATOMIC);
    var chl = generator.valueToCode(this, 'chl', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var code = "ESP_AT.enable_ap(" + account + "," + passwor + "," + chl + "," + varName + "." + mode + ")\n";
    return code;
}

export const network_disable_ap = function (_, generator) {
    generator.definitions_['import net_espat'] = "import net_espat";
    var code = "ESP_AT.disable_ap()\n";
    return code;
}

export const network_server = function (_, generator) {
    generator.definitions_['import_server_*'] = 'from server import *';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    // generator.setups_['class_wlan'] ='SSID="ying"\n'+'PASSWORD="201411132040"\n';
    return 'if not ' + varName + '.isconnected():\n'
        + '    connectWifi(SSID, PASSWORD)\n'
        + 'ip=' + varName + '.ifconfig()[0]\n'
        + 'print(ip)\n'
        + 'time.sleep(1)\n'
        + 'DATA=listenData()\n'
}

// ok
export const network_socket_init = function (_, generator) {
    generator.definitions_['import socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return "" + varName + " = socket.socket()\n";
}

// ok
export const network_socket_getaddrinfo = function (_, generator) {
    generator.definitions_['import socket'] = "import socket";
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var code = "socket.getaddrinfo(" + addr + ",80)[0][-1]";
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const network_socket_connect = function (_, generator) {
    generator.definitions_['import socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    return "" + varName + ".connect(" + address + ")\n";
}

// ok
export const network_socket_settimeout = function (_, generator) {
    generator.definitions_['import socket'] = "import socket";
    var time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return "" + varName + ".settimeout(" + time + ")\n";
}

export const network_socket_receive = function (_, generator) {
    generator.definitions_['import socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var code = "" + varName + ".recv(" + size + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const network_socket_send = function (_, generator) {
    generator.definitions_['import socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var content = generator.valueToCode(this, 'content', generator.ORDER_ATOMIC);
    var code = "" + varName + ".send(" + content + ")\n";
    return code;
}

export const network_socket_close = function (_, generator) {
    generator.definitions_['import socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + varName + ".close()\n";
    return code;
}