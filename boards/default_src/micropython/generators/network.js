import * as Blockly from 'blockly/core';

export const network_init = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    return "" + varName + " = network.WLAN(network." + mode + "_IF);\n";
}

// export const network_connect = function() {
//     generator.definitions_['import_network'] = "import network";
//     // generator.setups_['class_wlan'] ='wlan.active(True)\n';
//     var varName =generator.valueToCode(this, 'VAR',generator.ORDER_ATOMIC);
//     var id = generator.valueToCode(this, 'id', generator.ORDER_ATOMIC);
//     var password = generator.valueToCode(this, 'password', generator.ORDER_ATOMIC);
//     return "if not "+varName+".isconnected():\n"+
//            "  "+varName+".connect("+id+","+password+")\n"+
//            "  while not "+varName+".isconnected():\n"+
//            "    pass\n";
// }

export const network_connect = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    // generator.setups_['class_wlan'] ='wlan.active(True)\n';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var id = generator.valueToCode(this, 'id', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'password', generator.ORDER_ATOMIC);
    return "" + varName + ".connect(" + id + "," + password + ")\n"
}

export const network_wifi_connect = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + '.isconnected()';
    return [code, generator.ORDER_ATOMIC];
}

export const network_get_connect = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    var code = "" + varName + ".ifconfig()[" + mode + "]";
    return [code, generator.ORDER_ATOMIC]
}

export const network_stop = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return "" + varName + ".disconnect()\n";
}

export const network_open = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var op = this.getFieldValue('op');
    var code = "" + varName + ".active(" + op + ")\n";
    return code;
}

export const network_is_active = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + varName + ".active()";
    return [code, generator.ORDER_ATOMIC];
}

export const network_get_wifi = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var op = this.getFieldValue('op');
    var code = "" + varName + ".config('" + op + "')";
    return [code, generator.ORDER_ATOMIC]
}

export const network_ap_connect = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    // generator.setups_['class_wlan'] ='ap = network.WLAN(network.AP_IF)\n'+'ap.active(True)\n';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var essid = generator.valueToCode(this, 'essid', generator.ORDER_ATOMIC);
    var channel = generator.valueToCode(this, 'channel', generator.ORDER_ATOMIC);
    return "" + varName + ".config(essid = " + essid + ", channel = " + channel + ")\n";
}

export const network_scan = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + varName + ".scan()";
    return [code, generator.ORDER_ATOMIC];

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

export const network_socket_init = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('mode');
    if (mode == 'UDP') {
        mode = 'socket.SOCK_DGRAM'
    }
    else if (mode == 'TCP') {
        mode = 'socket.SOCK_STREAM'
    }
    return "" + varName + " = socket.socket(socket.AF_INET," + mode + ")\n";
}

export const network_socket_bind = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    return "" + varName + ".bind(" + address + ")\n";
}

export const network_socket_connect = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    return "" + varName + ".connect(socket.getaddrinfo" + address + "[0][-1])\n";
}

export const network_socket_listen = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var queue = generator.valueToCode(this, 'queue', generator.ORDER_ATOMIC);
    return "" + varName + ".listen(" + queue + ")\n";
}

export const network_socket_accept = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + varName + ".accept()";
    return [code, generator.ORDER_ASSIGNMENT];
}

export const network_socket_receive = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var code = "" + varName + ".recv(" + size + ")";
    return [code, generator.ORDER_ASSIGNMENT];
}

export const network_socket_send = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var content = generator.valueToCode(this, 'content', generator.ORDER_ATOMIC);
    var code = "" + varName + ".send(" + content + ")\n";
    return code;
}

export const network_socket_receive_from = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var code = "" + varName + ".recvfrom(" + size + ")";
    return [code, generator.ORDER_ASSIGNMENT];
}

export const network_socket_send_to = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var content = generator.valueToCode(this, 'content', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var code = "" + varName + ".sendto(" + content + "," + address + ")\n";
    return code;
}

export const network_socket_close = function (_, generator) {
    generator.definitions_['import_network'] = "import network";
    generator.definitions_['import_socket'] = "import socket";
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + varName + ".close()\n";
    return code;
}

export const requests_get = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var str = generator.valueToCode(this, 'DOMAIN', generator.ORDER_ATOMIC);
    var code = varName + '= ' + 'requests.get(' + str + ')\n';

    return code;
}

export const requests_attribute = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var varName = generator.valueToCode(this, 'VAL', generator.ORDER_ASSIGNMENT) || '0';
    var attr = this.getFieldValue('ATTR');
    var code = varName + "." + attr;
    return [code, generator.ORDER_ATOMIC];
}

export const requests_method = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var method = this.getFieldValue('DIR');
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "requests." + method + "(" + str + ')\n';
    return code;
}

export const ntptime_time = function (_, generator) {
    generator.definitions_['import_ntptime'] = "import ntptime";
    var str = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = "ntptime.time(host=" + str + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const ntptime_address = function (_, generator) {
    var code = "'" + this.getFieldValue('op') + "'";
    return [code, generator.ORDER_ATOMIC];
}

export const requests_get2 = function (_, generator) {
    generator.definitions_['import_urequests'] = "import urequests";
    var dropdown_type = this.getFieldValue('TYPE');
    var str = generator.valueToCode(this, 'URL', generator.ORDER_ATOMIC);
    var code = 'urequests.' + dropdown_type + '(' + str + ')';
    return [code, generator.ORDER_ATOMIC];

};

export const requests_attribute2 = function (_, generator) {
    generator.definitions_['import_urequests'] = "import urequests";
    var varName = generator.valueToCode(this, 'VAL', generator.ORDER_ASSIGNMENT) || '0';
    var attr = this.getFieldValue('ATTR');
    var code = varName + "." + attr;
    return [code, generator.ORDER_ATOMIC];
};

export const requests_post = function (_, generator) {
    generator.definitions_['import_urequests'] = "import urequests";
    var dropdown_type = this.getFieldValue('TYPE');
    var str = generator.valueToCode(this, 'URL', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = 'urequests.' + dropdown_type + '(' + str + ',data=' + data + ')';
    return [code, generator.ORDER_ATOMIC];

};

export const educore_wifi_connect = function (_, generator) {
    generator.definitions_['import_educore_wifi'] = "from educore import wifi";
    var username = generator.valueToCode(this, 'WIFINAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    var timeout = generator.valueToCode(this, 'TIMEOUT', generator.ORDER_ATOMIC);
    var code = 'wifi.connect(ssid='+username+', psd='+password+', timeout='+timeout+')\n';
    return code;
}

export const educore_mqtt_connect = function (_, generator) {
    generator.definitions_['import_educore_mqttclient'] = "from educore import mqttclient";
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    var port = generator.valueToCode(this, 'PORT', generator.ORDER_ATOMIC);
    var client_id = generator.valueToCode(this, 'CLIENT_ID', generator.ORDER_ATOMIC);
    var username = generator.valueToCode(this, 'USERNAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    // var a = "'" + username.replace("'", "").replace("'", "") + "/" + project.replace("'", "").replace("'", "") + "/'"
    // var code = 'MQTT_USR_PRJ = ' + a + '\n' + 'mqtt_client = mixiot.init_MQTT_client(' + server + ', ' + username + ', ' + password + ', MQTT_USR_PRJ)\n';
    var code = 'mqttclient.connect(server='+server+', port='+port+',client_id='+client_id+',user='+username+',psd='+password+')\n'
    return code;
}

export const educore_mqtt_subscribe_message = function (_, generator) {
    generator.definitions_['import_educore_mqttclient'] = "from educore import mqttclient";
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var message = generator.valueToCode(this, 'MESSAGE', generator.ORDER_ATOMIC);
    var code = 'mqttclient.'+message+'(' + topic + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_mqtt_topic_subscribe = function (_, generator) {
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var method = generator.valueToCode(this, 'METHOD', generator.ORDER_ATOMIC);
    generator.definitions_['import_educore_mqttclient'] = "from educore import mqttclient";
    // var code = 'mqtt_client.set_callback(' + topic + ',' + method + ', MQTT_USR_PRJ)\n';
    // code += 'mqtt_client.subscribe(MQTT_USR_PRJ + ' + topic + ')\n';
    var code = 'mqttclient.received(topic='+topic+', callback='+method+')\n';
    return code;
}

export const educore_mqtt_topic_publish = function (_, generator) {
    generator.definitions_['import_educore_mqttclient'] = "from educore import mqttclient";
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var msg = generator.valueToCode(this, 'MSG', generator.ORDER_ATOMIC);
    var code = 'mqtt_client.publish(topic=' + topic + ',content=' + msg + ')\n';
    return code;
}

export const educore_mqtt_connect_success = function (_, generator) {
    generator.definitions_['import_educore_mqttclient'] = "from educore import mqttclient";
    var code = 'mqtt_client.connescted()';
    return [code, generator.ORDER_ATOMIC];
}