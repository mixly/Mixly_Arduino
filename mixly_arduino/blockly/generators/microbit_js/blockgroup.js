'use strict';

goog.provide('Blockly.JavaScript.blockgroup');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.serial_begin = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || profile.default.serial;
  Blockly.JavaScript.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+content+');';
  return '';
};

Blockly.JavaScript.serial_write = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"'
    if (Blockly.JavaScript.setups_['setup_serial_' + serial_select + profile.default.serial]) {
    } else {
        Blockly.JavaScript.setups_['setup_serial_' + serial_select + profile.default.serial] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + '.write(' + content + ');\n';
    return code;
};

Blockly.JavaScript.serial_print = function() {
  var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"'
  var code = 'serial.writeString(\'\' + '+content+');\n';
  return code;
};

Blockly.JavaScript.serial_println = function() {
  var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"'
  var code = 'serial.writeLine(\'\' +  '+content+');\n';
  return code;
};

Blockly.JavaScript.serial_print_hex = function() {
  var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var code = 'serial.writeLine('+content+'.toString(16));\n';
  return code;
};

Blockly.JavaScript.serial_available = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.JavaScript.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.JavaScript.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var code =serial_select+".available() > 0";
   return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_receive_data_event = function() {
    var char_marker = Blockly.JavaScript.valueToCode(this, 'char_marker', Blockly.JavaScript.ORDER_ATOMIC) || ';';
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');

    Blockly.JavaScript.definitions_['func_serial_receive_data_event_'  + char_marker.charCodeAt(1)] = "serial.onDataReceived(" + char_marker + ", () => {\n" + branch + "};\n";
};

Blockly.JavaScript.serial_readstr = function() {
   var code ="serial.readString()";
   return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_readline = function() {
    var code ="serial.readLine()";
    return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_readstr_until = function() {
    var char_marker = this.getFieldValue('char_marker');
   var code ="serial.readUntil("+char_marker + ")";
   return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_parseInt_Float = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.JavaScript.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.JavaScript.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var dropdown_stat = this.getFieldValue('STAT');
   var code =serial_select+'.'+dropdown_stat+'()';
   return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_flush = function() {
  var serial_select = this.getFieldValue('serial_select');
  if(Blockly.JavaScript.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.JavaScript.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.flush();\n';
  return code;
};

Blockly.JavaScript.serial_softserial = function () {
  var dropdown_pin1 = Blockly.JavaScript.valueToCode(this, 'RX',Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.JavaScript.valueToCode(this, 'TX',Blockly.JavaScript.ORDER_ATOMIC);
  var baudrate = this.getFieldValue('baudrate');
  return "serial.redirect(" + dropdown_pin1 + ", " + dropdown_pin2 + ", BaudRate.BaudRate" + baudrate + ");\n";
};

Blockly.JavaScript.radio_send_number = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.sendNumber(" + number + ");\n";
}

Blockly.JavaScript.radio_send_value = function () {
    var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.sendValue(" + name + ", " + number + ");\n";
}

Blockly.JavaScript.radio_send_string = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.sendString(" + number + ");\n";
}

Blockly.JavaScript.radio_receive_number = function () {
    var variable = this.getFieldValue('var');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_radio_receive_number'] = "radio.onDataPacketReceived(({ receivedNumber:" +  variable + "}) =>  {\n" + branch + "});\n";
}

Blockly.JavaScript.radio_receive_value = function () {
    var name = this.getFieldValue('name');
    var value = this.getFieldValue('value');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_radio_receive_value'] = "radio.onDataPacketReceived(({ receivedString:" +  name + ", receivedNumber:" + value + "}) =>  {\n" + branch + "});\n";
}

Blockly.JavaScript.radio_receive_string = function () {
    var variable = this.getFieldValue('var');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_radio_receive_string'] = "radio.onDataPacketReceived(({ receivedString:" +  variable + "}) =>  {\n" + branch + "});\n";
}

Blockly.JavaScript.radio_set_group = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.setGroup(" + number + ");\n";
}

Blockly.JavaScript.radio_send_transmit_power = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.setTransmitPower(" + number + ");\n";
}

Blockly.JavaScript.radio_set_transmit_serial_number = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var stat = this.getFieldValue('stat');
    return "radio.setTransmitSerialNumber(" + stat + ");\n";
}

Blockly.JavaScript.radio_write_received_packet_to_serial = function () {
    return "radio.writeReceivedPacketToSerial();\n";
}

///////////////////////// i2c ///////////////////////
Blockly.JavaScript.i2c_read = function(){
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    return "pins.i2cReadNumber(" + data + ", " + format + ", " + is_repeated + ");\n";
};
Blockly.JavaScript.i2c_write = function(){
    var address = Blockly.JavaScript.valueToCode(this, 'address', Blockly.JavaScript.ORDER_ATOMIC);
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    return "pins.i2cWriteNumber("+ address + ", " + data + ", " + format + ", " + is_repeated + ");\n";
};

////////////////////// spi ///////////////////////////////
Blockly.JavaScript.spi_write = function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return ["pins.spiWrite(" + data + ")", Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.spi_frequency= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "pins.spiFrequency(" + data + ");\n";
}
Blockly.JavaScript.spi_format= function() {
    var bits= Blockly.JavaScript.valueToCode(this, 'bits', Blockly.JavaScript.ORDER_ATOMIC);
    var mode= Blockly.JavaScript.valueToCode(this, 'mode', Blockly.JavaScript.ORDER_ATOMIC);
    return "pins.spiFormat(" + bits  + ", " + mode +  ");\n";
}
Blockly.JavaScript.spi_set_pins= function() {
    var mosi = Blockly.JavaScript.valueToCode(this, 'MOSI', Blockly.JavaScript.ORDER_ATOMIC);
    var miso = Blockly.JavaScript.valueToCode(this, 'MISO', Blockly.JavaScript.ORDER_ATOMIC);
    var sck = Blockly.JavaScript.valueToCode(this, 'SCK', Blockly.JavaScript.ORDER_ATOMIC);
    return "pins.spiPins(" + mosi + ", " + miso  + ", " + sck +  ");\n";
}

///////////////////////// bluetooth /////////////////////////
Blockly.JavaScript.ble_service = function(){
    var  key = this.getFieldValue('key');
    return 'bluetooth.' + key + '();\n';
}
Blockly.JavaScript.ble_on_connected= function(){
    var  branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_ble_on_connected'] = 'bluetooth.onBluetoothConnected(() => {\n' + branch + '});\n';
}

Blockly.JavaScript.ble_on_disconnected= function(){
    var  branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_ble_on_disconnected'] = 'bluetooth.onBluetoothDisconnected(() => {\n' + branch + '});\n';
}

Blockly.JavaScript.ble_on_received= function(){
    var marker = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var  branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_ble_on_received'] = 'bluetooth.onUartDataReceived(' + marker + ', () => {\n' + branch + '});\n';
}
Blockly.JavaScript.ble_advertise_uid= function(){
    var is_connected = this.getFieldValue('is_connected');
    var namespace= Blockly.JavaScript.valueToCode(this, 'namespace', Blockly.JavaScript.ORDER_ATOMIC);
    var instance= Blockly.JavaScript.valueToCode(this, 'instance', Blockly.JavaScript.ORDER_ATOMIC);
    var power= Blockly.JavaScript.valueToCode(this, 'power', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.advertiseUid(' + namespace + ', ' + instance + ', ' + power  + ', ' + is_connected + ');\n';
}
Blockly.JavaScript.ble_advertise_url= function(){
    var is_connected = this.getFieldValue('is_connected');
    var url = Blockly.JavaScript.valueToCode(this, 'url', Blockly.JavaScript.ORDER_ATOMIC);
    var power= Blockly.JavaScript.valueToCode(this, 'power', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.advertiseUid(' + url  + ', ' +power  + ', ' +is_connected + ');\n';
}
Blockly.JavaScript.ble_write_number= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.uartWriteNumber(' + data + ');\n';
}
Blockly.JavaScript.ble_write_string= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.uartWriteString(' + data + ');\n';
}

Blockly.JavaScript.ble_write_value= function() {
    var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var value= Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.uartWriteValue(' + name + ', '+ value +  ');\n';
}
Blockly.JavaScript.ble_read_until= function() {
    var marker= Blockly.JavaScript.valueToCode(this, 'marker', Blockly.JavaScript.ORDER_ATOMIC);
    return ['bluetooth.uartReadUntil('+ marker +  ')', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.ble_uart_service= function() {
    return 'bluetooth.startUartService();\n';
}

Blockly.JavaScript.ble_stop_advertising= function() {
    return 'bluetooth.stopAdvertising();\n';
}

Blockly.JavaScript.ble_set_power= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.setTransmitPower(' + data + ');\n';
}

/////////////////////// catActuator /////////////////////////
Blockly.JavaScript.servo_move = function() {
  var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN',Blockly.JavaScript.ORDER_ATOMIC);
  var value_degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'pins.servoWritePin('+dropdown_pin+', '+value_degree+');\n';
  return code;
};

Blockly.JavaScript.servo_pulse = function() {
  var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN',Blockly.JavaScript.ORDER_ATOMIC);
  var value_degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'pins.servoSetPulse('+dropdown_pin+', '+value_degree+');\n';
  return code;
};

Blockly.JavaScript.tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.tone_beats = function() {
  var code = "music.beat(" + this.getFieldValue('BEAT') + ")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.tone_play=function(){
   var fre = Blockly.JavaScript.valueToCode(this, 'FREQUENCY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
   var beat = Blockly.JavaScript.valueToCode(this, 'BEAT', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.playTone("+fre+", "+beat+");\n";
   return code;
};

Blockly.JavaScript.tone_ring=function(){
   var fre = Blockly.JavaScript.valueToCode(this, 'FREQUENCY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
   var code = "music.ringTone("+fre+");\n";
   return code;
};

Blockly.JavaScript.tone_rest=function(){
   var beat = Blockly.JavaScript.valueToCode(this, 'BEAT', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.rest("+beat+");\n";
   return code;
};
Blockly.JavaScript.tone_start_melody= function() {
    var melody = this.getFieldValue('melody');
    var repeat = this.getFieldValue('repeat');

    var code = "music.beginMelody(music.builtInMelody(" + melody + "), " + repeat + ");\n";
    return code;
};
Blockly.JavaScript.tone_event= function() {
    var event= this.getFieldValue('event');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');

    Blockly.JavaScript.definitions_['func_tone_event_' + event] =  "music.onEvent(" + event + ", () => {\n" + branch + "});\n";
};
Blockly.JavaScript.tone_get_tempo= function() {
    return ["music.tempo()", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.tone_change_tempo=function(){
   var degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.changeTempoBy("+ degree +");\n";
   return code;
};
Blockly.JavaScript.tone_set_tempo=function(){
   var degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.setTempo("+ degree +");\n";
   return code;
};

/////////////////////// monitor ////////////////////
Blockly.JavaScript.monitor_show_number = function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "basic.showNumber("+ data +");\n";
    return code;
}
Blockly.JavaScript.monitor_show_string = function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "basic.showString("+ data +");\n";
    return code;
}
Blockly.JavaScript.monitor_show_leds = function() {
    var led_str = '\n';
    for (var row = 0; row < 5; row ++){
        for(var col = 0; col < 5; col ++){
            if(this.getFieldValue('' + row + col) === 'TRUE' ) led_str += '# ';
            else led_str += '. ';
        }
        led_str += '\n';
    }
    var code = "basic.showLeds(`"+ led_str +"`);\n";
    return code;
}

Blockly.JavaScript.monitor_show_arrow = function() {
    var data = this.getFieldValue('arrow')
    var code = "basic.showArrow("+ data +");\n";
    return code;
}

Blockly.JavaScript.monitor_clear_screen = function() {
    return 'basic.clearScreen();\n';
}
Blockly.JavaScript.monitor_plot_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.plot("+ x + ', ' + y +");\n";
    return code;
}
Blockly.JavaScript.monitor_unplot_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.unplot("+ x + ', ' + y +");\n";
    return code;
}
Blockly.JavaScript.monitor_toggle_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.toggle("+ x + ', ' + y +");\n";
    return code;
}
Blockly.JavaScript.monitor_get_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.point("+ x + ', ' + y +")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.monitor_plot_bar = function() {
    var start = Blockly.JavaScript.valueToCode(this, 'start', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var end = Blockly.JavaScript.valueToCode(this, 'end', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.plotBarGraph("+ start + ', ' + end +");\n";
    return code;
}
Blockly.JavaScript.monitor_bright_point= function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var brightness = Blockly.JavaScript.valueToCode(this, 'brightness', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.plotBrightness("+ x + ', ' + y + ', '+ brightness + ");\n";
    return code;
}

Blockly.JavaScript.monitor_get_brightness = function() {
    var code = "led.brightness()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.monitor_set_brightness = function() {
    var brightness = Blockly.JavaScript.valueToCode(this, 'brightness', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.setBrightness("+ brightness  +");\n";
    return code;
}

Blockly.JavaScript.monitor_stop_animation = function() {
    return 'led.stopAnimation();\n'
}
Blockly.JavaScript.monitor_led_enable= function() {
    var stat = this.getFieldValue('stat')
    var code = "led.enable("+ stat +");\n";
    return code;
}
Blockly.JavaScript.monitor_show_image_with_offset = function() {
    var variable = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = variable + ".showImage("+ data +");\n";
    return code;
}

Blockly.JavaScript.monitor_create_image= function() {
    var led_str = '\n';
    for (var row = 0; row < 5; row ++){
        for(var col = 0; col < 5; col ++){
            if(this.getFieldValue('' + row + col) === 'TRUE') led_str += '# ';
            else led_str += '. ';
        }
        led_str += '\n';
    }
    var code = 'images.createImage(`' + led_str + '`)';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.monitor_scroll_image = function() {
    var variable = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var offset = Blockly.JavaScript.valueToCode(this, 'offset', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var interval = Blockly.JavaScript.valueToCode(this, 'interval', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = variable + ".scrollImage("+ offset + ', ' + interval +");\n";
    return code;
}
Blockly.JavaScript.monitor_create_big_image = function() {
    var led_str = '\n';
    for (var row = 0; row < 5; row ++){
        for(var col = 0; col < 10; col ++){
            if(this.getFieldValue('' + row + col) === 'TRUE') led_str += '# ';
            else led_str += '. ';
        }
        led_str += '\n';
    }
    var code = 'images.createBigImage(`' + led_str + '`)';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.monitor_arrow_image= function() {
    var arrow = this.getFieldValue('arrow')
    var code = "image.arrowImage("+ arrow +")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
