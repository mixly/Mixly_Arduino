function doDownload(){
	var firmware = $("#firmware").text();
	var output = getHexFile(firmware);
	return output;
}

function doSave(){
	var code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace) || '';
	code=code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
	alert(code);
}

function getHexFile(firmware) {
	var code = "";
	if(document.getElementById('tab_arduino').className == 'tabon'){
		//code = document.getElementById('content_arduino').value;
        code = editor.getValue();
	}else{
		code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace) || '';
	}
	var hexlified_python = hexlify(code);
	var insertion_point = ":::::::::::::::::::::::::::::::::::::::::::";
	return firmware.replace(insertion_point, hexlified_python);
}

function hexlify(script) {
	function hexlify(ar) {
		var result = '';
		for (var i = 0; i < ar.length; ++i) {
			if (ar[i] < 16) {
				result += '0';
			}
			result += ar[i].toString(16);
		}
		return result;
	}
	// add header, pad to multiple of 16 bytes
	data = new Uint8Array(4 + script.length + (16 - (4 + script.length) % 16));
	data[0] = 77; // 'M'
	data[1] = 80; // 'P'
	data[2] = script.length & 0xff;
	data[3] = (script.length >> 8) & 0xff;
	for (var i = 0; i < script.length; ++i) {
		data[4 + i] = script.charCodeAt(i);
	}
	// check data.length < 0x2000
	if(data.length > 8192) {
		throw new RangeError('Too long');
	}
	// convert to .hex format
	var addr = 0x3e000; // magic start address in flash
	var chunk = new Uint8Array(5 + 16);
	var output = [];
	for (var i = 0; i < data.length; i += 16, addr += 16) {
		chunk[0] = 16; // length of data section
		chunk[1] = (addr >> 8) & 0xff; // high byte of 16-bit addr
		chunk[2] = addr & 0xff; // low byte of 16-bit addr
		chunk[3] = 0; // type (data)
		for (var j = 0; j < 16; ++j) {
			chunk[4 + j] = data[i + j];
		}
		var checksum = 0;
		for (var j = 0; j < 4 + 16; ++j) {
			checksum += chunk[j];
		}
		chunk[4 + 16] = (-checksum) & 0xff;
		output.push(':' + hexlify(chunk).toUpperCase())
	}
	return output.join('\n');
};