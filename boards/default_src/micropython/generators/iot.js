export const iot_wifi_connect = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var username = generator.valueToCode(this, 'WIFINAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    var code = 'mixiot.wlan_connect(' + username + ',' + password + ')\n';
    return code;
}

export const iot_onenet_connect = function (_, generator) {
    generator.definitions_['import_onenet'] = "import onenet";
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var client = generator.valueToCode(this, 'CLIENT', generator.ORDER_ATOMIC);
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    var username = generator.valueToCode(this, 'USERNAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var subscribe = generator.valueToCode(this, 'SUB', generator.ORDER_ASSIGNMENT) || 'None';
    var code = v + ' = onenet.init_MQTT_client(' + client + ', ' + server + ', ' + username + ', ' + password + ', ' + topic + ', ' + subscribe + ')\n';
    return code;
}

export const iot_onenet_disconnect = function (_, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    generator.definitions_['import_onenet'] = "import onenet";
    var code = v + '.do_disconnect()\n';
    return code;
}

export const iot_onenet_publish_dict = function (_, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var d = generator.valueToCode(this, 'DICT', generator.ORDER_ATOMIC);
    var check = this.getFieldValue("is_print") == 'TRUE' ? 'True' : 'False';
    generator.definitions_['import_onenet'] = "import onenet";
    var code = v + '.publish(' + d + ', is_print = ' + check + ')\n';
    return code;
}

export const iot_onenet_check = function (_, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    generator.definitions_['import_onenet'] = "import onenet";
    var code = v + '.check_msg()\n';
    return code;
}

export const iot_onenet_publish = function (_, generator) {
    // Create a list with any number of elements of any type.

    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    generator.definitions_['import_onenet'] = "import onenet";
    var ck = new Array(this.itemCount_);
    var cv = new Array(this.itemCount_);
    var ct = new Array(this.itemCount_);

    var default_value = '0';
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);

    for (let n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        ck[n] = keyName;
    }
    for (let n = 0; n < this.itemCount_; n++) {
        cv[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = v + ".publish({";
    for (let n = 0; n < this.itemCount_; n++) {
        ct[n] = ck[n] + ': ' + cv[n];
    }
    //var code = "c.publish('$dp', pubData("+ '{' + code.join(', ') + '})\n';
    //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '}\n';
    //generator.setups_['setup_lists'+varName] = code;
    code = code + ct.join(', ') + "})\n";
    return code;
}

export const iot_mixio_connect = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    generator.definitions_['import_machine'] = "import machine";
    generator.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    var username = generator.valueToCode(this, 'USERNAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    var project = generator.valueToCode(this, 'PROJECT', generator.ORDER_ATOMIC);
    //var subscribe = generator.valueToCode(this, 'SUB', generator.ORDER_ASSIGNMENT) || '0';
    var a = "'" + username.replace("'", "").replace("'", "") + "/" + project.replace("'", "").replace("'", "") + "/'"
    var code = 'MQTT_USR_PRJ = ' + a + '\n' + 'mqtt_client = mixiot.init_MQTT_client(' + server + ', ' + username + ', ' + password + ', MQTT_USR_PRJ)\n';
    return code;
}

export const IOT_MIXIO_PUBLISH = function (_, generator) {
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var msg = generator.valueToCode(this, 'MSG', generator.ORDER_ATOMIC);
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.publish(MQTT_USR_PRJ + ' + topic + ', ' + msg + ')\n';
    return code;
}

export const IOT_MIXIO_SUBSCRIBE = function (_, generator) {
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var method = generator.valueToCode(this, 'METHOD', generator.ORDER_ATOMIC);
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.set_callback(' + topic + ',' + method + ', MQTT_USR_PRJ)\n';
    code += 'mqtt_client.subscribe(MQTT_USR_PRJ + ' + topic + ')\n';
    return code;
}

export const iot_mixio_disconnect = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.disconnect(MQTT_USR_PRJ)\n';
    return code;
}

export const iot_mixio_connect_only = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.connect()\n';
    return code;
}

export const iot_mixio_check = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.check_msg()\n';
    return code;
}

export const iot_mixio_format_topic = function (_, generator) {
    var code = 'mqtt_client.decode("utf-8").split("/")[-1]';
    return [code, generator.ORDER_ATOMIC];
}

export const iot_mixio_format_msg = function (_, generator) {
    var code = 'mqtt_client.decode("utf-8")';
    return [code, generator.ORDER_ATOMIC];
}

export const IOT_FORMATTING = function (_, generator) {
    generator.definitions_['import_mixpy'] = "import mixpy";
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = 'mixpy.format_content(' + v + ', mqtt_client.client_id)';
    return [code, generator.ORDER_ATOMIC];
}

export const IOT_FORMAT_STRING = function (_, generator) {
    generator.definitions_['import_mixpy'] = "import mixpy";
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = 'mixpy.format_str(' + v + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE = function (_, generator) {
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    // var port = '1883';
    var share_code = generator.valueToCode(this, 'KEY', generator.ORDER_ATOMIC);
    generator.definitions_['import_mixiot'] = "import mixiot";
    generator.definitions_['import_machine'] = "import machine";
    generator.definitions_['import_urequests'] = "import urequests";
    generator.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
    generator.definitions_['import_mixpy_analyse_sharekey'] = "from mixpy import analyse_sharekey";
    // var mac_address = 'str(binascii.hexlify(wifi.radio.mac_address))[2:14]'
    // var socket_pool = 'socketpool.SocketPool(wifi.radio)'
    // var ssl_context = 'ssl.create_default_context()'
    var code = 'sk = analyse_sharekey(\'http://'+server.substring(1, server.length-1)+'/mixio-php/sharekey.php?sk=' + share_code + '\')\n'+
        'MQTT_USR_PRJ = sk[0]+\'/\'+sk[1]+\'/\'\n' +
        'mqtt_client = mixiot.init_MQTT_client(' + server + ', sk[0], sk[2]' + ', MQTT_USR_PRJ)\n';
    return code;
}

export const iot_mixly_key = function (_, generator) {
    var code = this.getFieldValue('VISITOR_ID');
    return [code, generator.ORDER_ATOMIC];
}

export const IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    generator.definitions_['import_machine'] = "import machine";
    generator.definitions_['import_ubinascii_hexlify'] = "from ubinascii import hexlify";
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    // var port = '1883';
    var username = '"MixIO_public"';
    var password = '"MixIO_public"';
    var mixly_code = generator.valueToCode(this, 'KEY', generator.ORDER_ATOMIC);
    var a = '"MixIO/' + mixly_code + '/default/"'
    // var mac_address = 'str(binascii.hexlify(wifi.radio.mac_address))[2:14]'
    // var socket_pool = 'socketpool.SocketPool(wifi.radio)'
    // var ssl_context = 'ssl.create_default_context()'
    var code = 'MQTT_USR_PRJ = ' + a + '\n' + 'mqtt_client = mixiot.init_MQTT_client(' + server + ', ' + username + ', ' + password + ', MQTT_USR_PRJ)\n';
    return code;
}

export const IOT_EMQX_PING = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.pingSync()';
    return [code, generator.ORDER_ATOMIC];
}

export const IOT_MIXIO_NTP = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var code = 'mixiot.ntp(' + addr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const iot_client_onboard = function (_, generator) {
    var code = 'mqtt_client';
    return [code, generator.ORDER_ATOMIC];
}

export const iot_http_client = function (_, generator) {
    generator.definitions_['import_debugnet'] = "import debugnet";
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = 'HTTP_client = debugnet.request("GET",' + addr + ',debug=' + key + ')\n';
    return code;
}

export const iot_http_data = function (_, generator) {
    generator.definitions_['import_debugnet'] = "import debugnet";
    var key = this.getFieldValue('key');
    var code = 'HTTP_client.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const iot_mqtt_client = function (_, generator) {
    generator.definitions_['import_debugnet'] = "import debugnet";
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key2');
    var code = 'mqtt_client = debugnet.init_MQTT_client(' + addr + ', "MixIO_public", "MixIO_public", "MixIO/3QBAGKRL/default/",debug=' + key + ')\n';
    code += 'mqtt_client.subscribe("$SYS/hello")\n';
    return code;
}

export const iot_mqtt_data = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var key = this.getFieldValue('key');
    var code = 'mqtt_client.' + key;
    return [code, generator.ORDER_ATOMIC];
}