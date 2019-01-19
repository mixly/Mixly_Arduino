var codeProcessor = {
    getCode: function (trick) {
        var code = '';
        if(document.getElementById('tab_arduino').className == 'tabon'){
            code = editor.getValue();
        }else{
            code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace) || '';
        }
        if (code == '') {
            return;
        }
        if (trick == true) {
            // trick
            if (code.indexOf('class HCSR04:') != -1) {
                code = code.replace(/class HCSR04[\s\S]*?self.distance_mm\(\) \/ 10\.0/,'');
            }

            if (code.indexOf('class Servo:') != -1) {
                code = code.replace(/class Servo[\s\S]*?self\.write_us\(us\)/,'');
            }
        }
        return code;
    },
    saveXmlFileAs: function () {
        var xmlCodes = goog.string.quote(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)));
        xmlCodes = xmlCodes.replace("<xml", "<xml version=\\\"mixgo_0.999\\\" board=\\\"" + "MicroPython[NRF51822_microbit]" + "\\\"");
        xmlCodes = xmlCodes.substring(1, xmlCodes.length - 1);
        var blob = new Blob(
            [xmlCodes],
            { type: 'text/plain;charset=utf-8' });
        saveAs(blob, "Mixgo.xml");
    },
    infiniteLoop: function () {
        //TODO: decide whether code has infinite loop
        return true;
    }
}


var smCodeProcessor = {
    //1. import XXX ==> import sm_XXX
    processImport: function (code) {
        var microbitModuleArr = ['microbit', 'music', 'radio', 'neopixel', 'speech'];
        var codeArr = code.replace('\r\n', '\n').split('\n');
        var usedModuleSet = new Set();
        for (var i = 0; i < codeArr.length; i++) {
            var line = codeArr[i].replace(/^( *?)from( +?)(\w*?) import (.*?)$/g, function () {
                var module = arguments[3];
                if (microbitModuleArr.indexOf(module) != -1) {
                    usedModuleSet.add(module);
                }
            });
            line = line.replace(/^( *?)import (.*?)$/g, function () {
                var module = arguments[2];
                if (microbitModuleArr.indexOf(module) != -1) {
                    usedModuleSet.add(module);
                }
            });
        }
        for (var x of usedModuleSet) {
            code = code.replace(new RegExp(x,'g'), 'sm_' + x);
        }
        return code;
    },

    //2. 多线程修改内部状态
    parseConfig: function (config) {
        if (config == undefined) {
            return;
        }
        for (var i = 0; i < config.length; i ++) {
            var code = config[i].code;
            var time = parseInt(config[i].time);
            function evalCode (_code, _t) {
                return function () {
                    if(sm.time < _t) {
                        sm.time = _t;
                    }
                    eval(_code);
                }
            }
            setTimeout(evalCode(code, time), time);
        }
    },

    //3. 超时kill掉
    autoKillProgram: function (timeout) {
        setTimeout(function () {
            sm.time += 10;
            sm.updateSnapshot();
            Sk.execLimit = 0;
        }, timeout);
    }
}
