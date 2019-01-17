var process  = {
    //1. import XXX ==> import sm_XXX
    processImport: function (code) {
        var newCode = '';
        var codeArr = code.replace('\r\n', '\n').split('\n');
        for (var i = 0; i < codeArr.length; i++) {
            var line = codeArr[i].replace(/^( *?)from( +?)(\w*?) import (.*?)$/g, "$1from$2sm_$3 import $4");
            line = line.replace(/^( *?)import (.*?)$/g, "$1import sm_$2");
            newCode += line + '\n';
        }
        return newCode;
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

