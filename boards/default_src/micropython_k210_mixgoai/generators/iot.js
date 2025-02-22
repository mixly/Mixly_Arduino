export const iot_wifi_connect = function (_, generator) {
    // generator.definitions_['import_simple'] = "import simple";
    generator.definitions_['import_miot'] = "import miot_no";
    var username = generator.valueToCode(this, 'WIFINAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    var code = 'miot_no.do_connect(' + username + ',' + password + ')\n';
    return code;
}

export const iot_onenet_connect = function (_, generator) {
    generator.definitions_['import_miot'] = "import miot_no";
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var client = generator.valueToCode(this, 'CLIENT', generator.ORDER_ATOMIC);
    var server = generator.valueToCode(this, 'SERVER', generator.ORDER_ATOMIC);
    var username = generator.valueToCode(this, 'USERNAME', generator.ORDER_ATOMIC);
    var password = generator.valueToCode(this, 'PASSWORD', generator.ORDER_ATOMIC);
    var topic = generator.valueToCode(this, 'TOPIC', generator.ORDER_ATOMIC);
    var subscribe = generator.valueToCode(this, 'SUB', generator.ORDER_ASSIGNMENT) || '0';
    var code = v + ' = miot_no.init_MQTT_client(' + client + ', ' + server + ', ' + username + ', ' + password + ', ' + topic + ', ' + subscribe + ')\n';
    return code;
}

export const iot_onenet_disconnect = function (_, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    generator.definitions_['import_simple'] = "import simple";
    var code = v + '.do_disconnect()\n';
    return code;
}

export const iot_onenet_publish_dict = function (_, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var d = generator.valueToCode(this, 'DICT', generator.ORDER_ATOMIC);
    var check = this.getFieldValue("is_print") == 'TRUE' ? 'True' : 'False';
    generator.definitions_['import_simple'] = "import simple";
    var code = v + '.publish(' + d + ', is_print = ' + check + ')\n';
    return code;
}

export const iot_onenet_check = function (_, generator) {
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    generator.definitions_['import_simple'] = "import simple";
    var code = v + '.check_msg()\n';
    return code;
}

export const iot_onenet_publish = function (_, generator) {
    // Create a list with any number of elements of any type.

    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    generator.definitions_['import_miot'] = "import miot_no";
    var ck = new Array(this.itemCount_);
    var cv = new Array(this.itemCount_);
    var ct = new Array(this.itemCount_);

    var default_value = '0';
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);

    for (var n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        ck[n] = keyName
    }
    for (var n = 0; n < this.itemCount_; n++) {
        cv[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = v + ".publish({";
    for (var n = 0; n < this.itemCount_; n++) {
        ct[n] = ck[n] + ': ' + cv[n]
    }
    //var code = "c.publish('$dp', pubData("+ '{' + code.join(', ') + '})\n';
    //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '}\n';
    //generator.setups_['setup_lists'+varName] = code;
    code = code + ct.join(', ') + "})\n";
    return code;
}