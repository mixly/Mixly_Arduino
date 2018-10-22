'use strict';

goog.provide('Blockly.Python.network');
goog.require('Blockly.Python');

Blockly.Python.network_init= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var mode=this.getFieldValue('mode');
    return ""+varName+"=network.WLAN(network."+mode+"_IF);\n";
}

// Blockly.Python.network_connect= function() {
//     Blockly.Python.definitions_['import_network'] = "import network";
//     // Blockly.Python.setups_['class_wlan'] ='wlan.active(True)\n';
//     var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
//     var id = Blockly.Python.valueToCode(this, 'id', Blockly.Python.ORDER_ATOMIC);
//     var password = Blockly.Python.valueToCode(this, 'password', Blockly.Python.ORDER_ATOMIC);
//     return "if not "+varName+".isconnected():\n"+
//            "  "+varName+".connect("+id+","+password+")\n"+
//            "  while not "+varName+".isconnected():\n"+
//            "    pass\n";
// }

Blockly.Python.network_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    // Blockly.Python.setups_['class_wlan'] ='wlan.active(True)\n';
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var id = Blockly.Python.valueToCode(this, 'id', Blockly.Python.ORDER_ATOMIC);
    var password = Blockly.Python.valueToCode(this, 'password', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".connect("+id+","+password+")\n"
}

Blockly.Python.network_wifi_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".isconnected()\n"; 
}

Blockly.Python.network_get_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var mode=this.getFieldValue('mode');
    var code=""+varName+".ifconfig()["+mode+"]";
    return [code, Blockly.Python.ORDER_MEMBER]
}

Blockly.Python.network_stop= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".disconnect()\n";
}

Blockly.Python.network_open= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code=""+varName+".active("+op+")\n";
    return code;
}

Blockly.Python.network_wifi_connect = function(){
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ''+varName+'.isconnected()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.network_get_wifi= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code=""+varName+".config('"+op+"')";
    return [code, Blockly.Python.ORDER_MEMBER]
}

Blockly.Python.network_ap_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.setups_['class_wlan'] ='ap = network.WLAN(network.AP_IF)\n'+'ap.active(True)\n';
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var essid = Blockly.Python.valueToCode(this, 'essid', Blockly.Python.ORDER_ATOMIC);
    var channel = Blockly.Python.valueToCode(this, 'channel', Blockly.Python.ORDER_ATOMIC);
    return ""+varName+".config(essid="+essid+",channel="+channel+")\n";
}

Blockly.Python.network_scan= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code=""+varName+".scan()["+op+"]";
    switch (op) {
    case "0":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "1":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "2":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "3":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "4":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "5":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "all":
       var code1 = ''+varName+'.scan()';
       return [code1, Blockly.Python.ORDER_ASSIGNMENT];
       break;
  }
}

Blockly.Python.network_server= function() {
    Blockly.Python.definitions_['import_server_*'] = 'from server import *';
    var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    // Blockly.Python.setups_['class_wlan'] ='SSID="ying"\n'+'PASSWORD="201411132040"\n';
    return 'if not '+varName+'.isconnected():\n'
    +'    connectWifi(SSID, PASSWORD)\n'
    +'ip='+varName+'.ifconfig()[0]\n'
    +'print(ip)\n'
    +'time.sleep(1)\n'
    +'DATA=listenData()\n'   
};