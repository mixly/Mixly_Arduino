export const iot_mixio_connect = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    var username = generator.valueToCode(this, 'USERNAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    var project = generator.valueToCode(this, 'PROJECT', generator.ORDER_ATOMIC);
    var timestamp = Math.round(new Date()).toString();
    //var subscribe = generator.valueToCode(this, 'SUB', generator.ORDER_ASSIGNMENT) || '0';
    var a = "f'python-mqtt-" + username.replace("'", "").replace("'", "") + timestamp.replace("'", "").replace("'", "") + "'";
    var code = 'mqtt_client = mixiot.MixIO(' + server + ', 1883 ,' + username + ', ' + password + ', ' + project + ', ' + a + ')\n';
    return code;
}

export const IOT_MIXIO_PUBLISH = function (_, generator) {
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var msg = generator.valueToCode(this, 'MSG', generator.ORDER_ATOMIC);
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.publish(' + topic + ', ' + msg + ')\n';
    return code;
}

export const IOT_MIXIO_SUBSCRIBE = function (_, generator) {
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var method = generator.valueToCode(this, 'METHOD', generator.ORDER_ATOMIC);
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.subscribe_and_set_callback(' + topic + ',' + method + ')\n';
    return code;
}

export const IOT_MIXIO_UNSUBSCRIBE = function (_, generator) {
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.unsubscribe(' + topic + ')\n';
    return code;
}

export const iot_mixio_disconnect = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var code = 'mqtt_client.disconnect()\n';
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

export const IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    var share_code = generator.valueToCode(this, 'KEY', generator.ORDER_ATOMIC);
    var timestamp = Math.round(new Date()).toString();
    var a = "f'python-mqtt-" + share_code.replace("'", "").replace("'", "") + timestamp.replace("'", "").replace("'", "") + "'";
    var code = 'mqtt_client = mixiot.MixIO.from_mixly_key(' + server + ', 1883 ,' + share_code + ', ' + a + ')\n';
    return code;
}

export const iot_mixly_key = function (_, generator) {
    var code = this.getFieldValue('VISITOR_ID');
    return [code, generator.ORDER_ATOMIC];
}

export const iot_mixly_key_py = function (_, generator) {
    var code = this.getFieldValue('VISITOR_ID');
    return ["'" + code + "'", generator.ORDER_ATOMIC];
}

export const IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE = function (_, generator) {
    generator.definitions_['import_mixiot'] = "import mixiot";
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    var mixly_code = generator.valueToCode(this, 'KEY', generator.ORDER_ATOMIC);
    var timestamp = Math.round(new Date()).toString();
    var a = "f'python-mqtt-" + mixly_code.replace("'", "").replace("'", "") + timestamp.replace("'", "").replace("'", "") + "'";
    var code = 'mqtt_client = mixiot.MixIO.from_share_key(' + server + ', 1883 ,' + mixly_code + ', ' + a + ')\n';
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