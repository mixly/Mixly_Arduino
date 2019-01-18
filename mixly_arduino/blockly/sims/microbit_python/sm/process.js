var process  = {
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
                    sm.time = _t;
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

