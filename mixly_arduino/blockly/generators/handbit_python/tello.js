goog.provide('Blockly.Python.tello');
goog.require('Blockly.Python');


var TELLO_SEND = "tello_send";


Blockly.Python['tello_init'] = function(block) {
	Blockly.Python.definitions_['machine_Timer'] = 'from machine import Timer';
	Blockly.Python.definitions_['import_mpython'] = 'from mpython import *';
	Blockly.Python.definitions_['import_time'] = 'import time';
	Blockly.Python.definitions_['import_socket'] = 'import socket';
	Blockly.Python.definitions_['import_thread'] = 'import _thread';	
	Blockly.Python.definitions_['tello_init'] = '\n' +
'_tello_address = ("192.168.10.1", 8889)\n' +
'_tello_state = {}\n' +
'_tello_command = ""\n' +
'_answer_data = None\n' +
'_socket1 = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n' +
'_socket1.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n';

	Blockly.Python.definitions_['tello_send'] = '' +
'def tello_send(_command):\n' +
'    global _tello_command\n' +
'    if _command == _tello_command:\n' +
'        return\n' +
'    else:\n' +
'        _socket1.sendto(_command, _tello_address)\n' +
'        _tello_command = _command\n' +
'        print("send: ", _command)\n';

	Blockly.Python.definitions_['get_tello_state'] = '' +
'def get_tello_state(_type):\n' +
'    global _tello_state\n' +
'    if _type in _tello_state.keys():\n' +
'        try: return eval(_tello_state[_type])\n' +
'        except: return _tello_state[_type]\n' +
'    else: return None\n';

	Blockly.Python.definitions_['def_Timer13'] = 'tim13 = Timer(13)';
	Blockly.Python.definitions_['timer13_tick'] = 'def timer13_tick(_):\n' +
'    _socket1.sendto("command", _tello_address)\n';
	Blockly.Python.definitions_['timer13_init'] = 'tim13.init(period=5000, mode=Timer.PERIODIC, callback=timer13_tick)\n';

	return '';
};

Blockly.Python['tello_repeat_forever'] = function(block) {
	Blockly.Python.definitions_['machine_Timer'] = 'from machine import Timer';
	Blockly.Python.definitions_['import_mpython'] = 'from mpython import *';
	Blockly.Python.definitions_['import_time'] = 'import time';
	Blockly.Python.definitions_['import_socket'] = 'import socket';
	Blockly.Python.definitions_['import_thread'] = 'import _thread';	
	Blockly.Python.definitions_['tello_init'] = '\n' +
'_tello_address = ("192.168.10.1", 8889)\n' +
'_tello_state = {}\n' +
'_tello_command = ""\n' +
'_answer_data = None\n' +
'_socket1 = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n' +
'_socket1.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n';

	Blockly.Python.definitions_['tello_send'] = '' +
'def tello_send(_command):\n' +
'    global _tello_command\n' +
'    if _tello_command == _command:\n' +
'        return\n' +
'    else:\n' +
'        _socket1.sendto(_command, _tello_address)\n' +
'        _tello_command = _command\n' +
'        print("send: ", _command)\n';

	Blockly.Python.definitions_['get_tello_state'] = '' +
'def get_tello_state(_type):\n' +
'    global _tello_state\n' +
'    if _type in _tello_state.keys():\n' +
'        try: return eval(_tello_state[_type])\n' +
'        except: return _tello_state[_type]\n' +
'    else: return None\n';

	Blockly.Python.definitions_['answerthread'] = '' +
'def answerthread():\n' +
'    global _answer_data\n' +
'    while True:\n' +
'        _answer_data, addr = _socket1.recvfrom(1024)\n' +
'        print(_answer_data)\n' +
'        time.sleep_ms(50)\n';

/*
	Blockly.Python.definitions_['answerthread'] = '' +
'def answerthread():\n' +
'    global _tello_state\n' +
'    def get_data_type(_data):\n' +
'        if b\'\' == _data or b\'ok\' == _data or b\'error\' == _data: return ""\n' +
'        _data = bytes.decode(_data)\n' +
'        if "\\r\\n" in _data:\n' +
'            _result = _data.replace("\\r\\n", "")\n' +
'            try: _result = eval(_data)\n' +
'            except: pass\n' +
'            if type(_result) == float: return "speed"\n' +
'            if type(_result) == int: return "wifi"\n' +
'            if type(_result) == str and "s" in _result: return "time"\n' +
'        else:\n' +
'            _result = _data\n' +
'            try: _result = eval(_data)\n' +
'            except: pass\n' +
'            if type(_result) == str: return "sn"\n' +
'            if type(_result) == int: return "sdk"\n' +
'        return ""\n' +
'    while True:\n' +
'        _answer_data, addr = _socket1.recvfrom(1024)\n' +
'        print("received answer:", _answer_data, "from", addr)\n' +
'        _answer_type = get_data_type(_answer_data)\n' +
'        if "" != _answer_type:\n' +
'            try: _tello_state[_answer_type] = eval(bytes.decode(_answer_data))\n' +
'            except: _tello_state[_answer_type] = bytes.decode(_answer_data)\n' +
'            finally: print("type:", _answer_type, "value:", bytes.decode(_answer_data))\n';
*/

	Blockly.Python.definitions_['statethread'] = '' +
'def statethread():\n' +
'    def analysis_tello_state(_data):\n' +
'        global _tello_state\n' +
'        arr = bytes.decode(_data).split(";")\n' +
'        if len(arr) < 15:\n' +
'            _tello_state["mid"] = ""\n' +
'            _tello_state["x"] = ""\n' +
'            _tello_state["y"] = ""\n' +
'            _tello_state["z"] = ""\n' +
'            _tello_state["mpry"] = ""\n' +
'        for s in arr:\n' +
'            if ":" in s:\n' +
'                t = s.split(":")\n' +
'                _tello_state[t[0]] = t[1]\n' +
'    _local_address = ("0.0.0.0", 8890)\n' +
'    _socket2 = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n' +
'    _socket2.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n' +
'    _socket2.bind(_local_address)\n' +
'    while True:\n' +
'        statedata, addr = _socket2.recvfrom(1024)\n' +
'        analysis_tello_state(statedata)\n' +
'        time.sleep_ms(50)\n';

	Blockly.Python.definitions_['def_Timer13'] = 'tim13 = Timer(13)';
	Blockly.Python.definitions_['timer13_tick'] = 'def timer13_tick(_):\n' +
'    _socket1.sendto("command", _tello_address)\n';
	Blockly.Python.definitions_['timer13_init'] = 'tim13.init(period=5000, mode=Timer.PERIODIC, callback=timer13_tick)\n';

	var doCode = Blockly.Python.statementToCode(block, 'DO') || Blockly.Python.PASS;
	var code = 'try:\n' +
'  for i in range(2):\n' +
'    lock = _thread.allocate_lock()\n' +
'    lock.acquire()\n' +
'  _thread.start_new_thread(statethread, ())\n' +    
'  _thread.start_new_thread(answerthread, ())\n' +
'  tello_send("command")\n' +
'  while True:\n' + doCode +
'except Exception as e:\n' +
'  print(e)\n' +
'  if (_socket1):\n' +
'    _socket1.close()\n';
	return code;
};

Blockly.Python['tello_point'] = function(block) {
	var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
	var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
	var z = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_ATOMIC);
	var code = 'str(' + x + ') + " " + str(' + y + ') + " " + str(' + z + ')';
	return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['tello_command'] = function(block) {
	var code = TELLO_SEND + '("command")\n';
	return code;
};

Blockly.Python['tello_takeoff'] = function(block) {
	var code = TELLO_SEND + '("takeoff")\n';
	return code;
};

Blockly.Python['tello_land'] = function(block) {
	var code = TELLO_SEND + '("land")\n';
	return code;
};

Blockly.Python['tello_stream'] = function(block) {
	var tello_mode = block.getFieldValue('tello_mode');
	var code = TELLO_SEND + '("stream' + tello_mode + '")\n';
	return code;
};

Blockly.Python['tello_emergency'] = function(block) {
	var code = TELLO_SEND + '("emergency")\n';
	return code;
};

Blockly.Python['tello_fly'] = function(block) {
	var direction = block.getFieldValue('tello_direction');
	var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("' + direction + ' " + str(' + x + '))\n';
	return code;
};

Blockly.Python['tello_rotate'] = function(block) {
	var direction = block.getFieldValue('tello_rotate_direction');
	var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("' + direction + ' " + str(' + angle + '))\n';
	return code;
};

Blockly.Python['tello_roll'] = function(block) {
	var direction = block.getFieldValue('tello_direction');
	var code = TELLO_SEND + '("flip ' + direction + '")\n';
	return code;
};

Blockly.Python['tello_go_speed'] = function(block) {
	var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
	var point = Blockly.Python.valueToCode(block, 'point', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("go " + ' + point + ' + " " + str(' + speed + '))\n';
	return code;
};

Blockly.Python['tello_stop'] = function(block) {
	var code = TELLO_SEND + '("stop")\n';
	return code;
};

Blockly.Python['tello_curve_speed'] = function(block) {
	var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
	var point1 = Blockly.Python.valueToCode(block, 'point1', Blockly.Python.ORDER_ATOMIC);
	var point2 = Blockly.Python.valueToCode(block, 'point2', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("curve " + ' + point1 + ' + " " + ' + point2 + ' + " " + str(' + speed + '))\n';
	return code;
};

Blockly.Python['tello_go_speed_mid'] = function(block) {
	var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
	var mid = block.getFieldValue('tello_mid');
	var point = Blockly.Python.valueToCode(block, 'point', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("go " + ' + point + ' + " " + str(' + speed + ') + " ' + mid + '")\n';
	return code;
};

Blockly.Python['tello_curve_speed_mid'] = function(block) {
	var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
	var mid = block.getFieldValue('tello_mid');
	var point1 = Blockly.Python.valueToCode(block, 'point1', Blockly.Python.ORDER_ATOMIC);
	var point2 = Blockly.Python.valueToCode(block, 'point2', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("curve " + ' + point1 + ' + " " + ' + point2 + ' + " " + str(' + speed + ') + " ' + mid + '")\n';
	return code;
};

Blockly.Python['tello_jump_speed_mid'] = function(block) {
	var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
	var mid1 = block.getFieldValue('tello_mid1');
	var mid2 = block.getFieldValue('tello_mid2');
	var point = Blockly.Python.valueToCode(block, 'point', Blockly.Python.ORDER_ATOMIC);
	var yaw = Blockly.Python.valueToCode(block, 'yaw', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("jump " + ' + point + ' + " " + str(' + speed + ') + " " + str(' + yaw + ') + " ' + mid1 + ' ' + mid2 + '")\n';
	return code;
};

Blockly.Python['tello_set_speed'] = function(block) {
	var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("speed " + str(' + speed + '))\n';
	return code;
};

Blockly.Python['tello_set_rc'] = function(block) {
	var a = Blockly.Python.valueToCode(block, 'a', Blockly.Python.ORDER_ATOMIC);
	var b = Blockly.Python.valueToCode(block, 'b', Blockly.Python.ORDER_ATOMIC);
	var c = Blockly.Python.valueToCode(block, 'c', Blockly.Python.ORDER_ATOMIC);
	var d = Blockly.Python.valueToCode(block, 'd', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '("rc " + str(' + a + ') + " " + str(' + b + ') + " " + str(' + c + ') + " " + str(' + d + '))\n';
	return code;
};

Blockly.Python['tello_set_wifi'] = function(block) {
	var ssid = block.getFieldValue('ssid');
	var pass = block.getFieldValue('pass');
	var code = TELLO_SEND + '("wifi ' + ssid + ' ' + pass + '")\n';
	return code;
};

Blockly.Python['tello_set_m'] = function(block) {
	var mode = block.getFieldValue('tello_mode');
	var code = TELLO_SEND + '("m' + mode + '")\n';
	return code;
};

Blockly.Python['tello_set_mdirection'] = function(block) {
	var mode = block.getFieldValue('tello_mode');
	var code = TELLO_SEND + '("mdirection ' + mode + '")\n';
	return code;
};

Blockly.Python['tello_set_ap'] = function(block) {
	var ssid = block.getFieldValue('ssid');
	var pass = block.getFieldValue('pass');
	var code = TELLO_SEND + '("ap ' + ssid + ' ' + pass + '")\n';
	return code;
};

Blockly.Python['tello_custom'] = function(block) {
	var command = Blockly.Python.valueToCode(block, 'command', Blockly.Python.ORDER_ATOMIC);
	var code = TELLO_SEND + '(' + command + ')\n';
	return code;
};

Blockly.Python['tello_ask_param'] = function(block) {
	var param = block.getFieldValue('tello_param');
	var code = TELLO_SEND + '("' + param + '?")\n';
	return code;
};

Blockly.Python['tello_get_param'] = function(block) {
	var param = block.getFieldValue('tello_param');
	var code = 'get_tello_state("' + param + '")';
	return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['tello_state'] = function(block) {
	var code = '_tello_state';
	return [code, Blockly.Python.ORDER_ATOMIC];
};
