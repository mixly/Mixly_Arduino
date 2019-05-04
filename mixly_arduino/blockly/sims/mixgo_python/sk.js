conf.url = conf.url || "";
var base_url = conf.url + '/blockly/sims/mixgo_python/';
Sk.externalLibraries = {
    mixgo: {
        path: base_url + 'mixgo/__init__.js',
        dependencies: [
            base_url + 'mixgo/accelerometer.js',
            base_url + 'mixgo/compass.js',
            base_url + 'mixgo/uart.js',
            base_url + 'mixgo/infrared_left.js',
            base_url + 'mixgo/infrared_right.js',
        ]
    },
    time:{
        path: conf.url + '/blockly/sims/mixgo_python/time/__init__.js'
    },
    machine: {
        path: conf.url + '/blockly/sims/mixgo_python/machine/__init__.js',
        dependencies: [
            conf.url + '/blockly/sims/mixgo_python/machine/UART.js'
        ],
    },
    mpu9250: {
        path: conf.url + '/blockly/sims/mixgo_python/mpu9250/__init__.js'
    },
    bmp280: {
        path: conf.url + '/blockly/sims/mixgo_python/bmp280/__init__.js'
    },
    dhtx: {
        path: conf.url + '/blockly/sims/mixgo_python/dhtx/__init__.js'
    },
    sonar: {
        path: conf.url + '/blockly/sims/mixgo_python/sonar/__init__.js'
    },
    servo: {
        path: conf.url + '/blockly/sims/mixgo_python/servo/__init__.js'
    },
    matrix:{
        path: conf.url + '/blockly/sims/mixgo_python/matrix/__init__.js'
    },
    music: {
        path: conf.url + '/blockly/sims/mixgo_python/music/__init__.js'
    },
    radio:{
        path: conf.url + '/blockly/sims/mixgo_python/radio/__init__.js'
    },
    speech: {
        path: conf.url + '/blockly/sims/mixgo_python/speech/__init__.js',
        dependencies: [conf.url + '/blockly/sims/mixgo_python/speech/sam.js']
    },
    neopixel: {
        path: conf.url + '/blockly/sims/mixgo_python/neopixel/__init__.js'
    },
    //status machine
    sm_mixgo: {
        path: conf.url + '/blockly/sims/mixgo_python/sm/mixgo/__init__.js',
        dependencies: [
            conf.url + '/blockly/sims/mixgo_python/sm/mixgo/accelerometer.js',
            conf.url + '/blockly/sims/mixgo_python/sm/mixgo/compass.js',
            conf.url + '/blockly/sims/mixgo_python/sm/mixgo/uart.js',
            conf.url + '/blockly/sims/mixgo_python/sm/mixgo/infrared_left.js',
            conf.url + '/blockly/sims/mixgo_python/sm/mixgo/infrared_right.js',
        ]
    },
    time:{
        path: conf.url + '/blockly/sims/mixgo_python/time/__init__.js'
    },
    machine: {
        path: conf.url + '/blockly/sims/mixgo_python/machine/__init__.js',
        dependencies: [
            conf.url + '/blockly/sims/mixgo_python/machine/UART.js'
        ],
    },
    mpu9250: {
        path: conf.url + '/blockly/sims/mixgo_python/mpu9250/__init__.js'
    },
    bmp280: {
        path: conf.url + '/blockly/sims/mixgo_python/bmp280/__init__.js'
    },
    dhtx: {
        path: conf.url + '/blockly/sims/mixgo_python/dhtx/__init__.js'
    },
    sonar: {
        path: conf.url + '/blockly/sims/mixgo_python/sonar/__init__.js'
    },
    servo: {
        path: conf.url + '/blockly/sims/mixgo_python/servo/__init__.js'
    },
    matrix:{
        path: conf.url + '/blockly/sims/mixgo_python/sm/matrix/__init__.js'
    },
    music: {
        path: conf.url + '/blockly/sims/mixgo_python/music/__init__.js'
    },
    radio:{
        path: conf.url + '/blockly/sims/mixgo_python/radio/__init__.js'
    },
    speech: {
        path: conf.url + '/blockly/sims/mixgo_python/speech/__init__.js',
        dependencies: [conf.url + '/blockly/sims/mixgo_python/speech/sam.js']
    },
    neopixel: {
        path: conf.url + '/blockly/sims/mixgo_python/neopixel/__init__.js'
    },
}


var sim = {
    runAsync: function (asyncFunc) {
        var p = new Promise(asyncFunc);
        var result;
        var susp = new Sk.misceval.Suspension();
        susp.resume = function() {
            return result;
        }
        susp.data = {
            type: "Sk.promise",
            promise: p.then(function(value) {
                result = value;
                return value;
            }, function(err) {
                result = "";
                console.log(err);
                return new Promise(function(resolve, reject){
                });
            })
        };
        return susp;
    }
}


function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}


function sk_run (code, outputFunc, inputFunc, postFunc) {
    if(code == '') {
        return;
    }
    Sk.configure({
        inputfun: inputFunc,
        inputfunTakesPrompt: true,
        output: outputFunc,
        read: builtinRead,
        execLimit:Number.POSITIVE_INFINITY,
        debugging: true
    });

    // if code contains a while loop
    var handlers = [];
    if(codeProcessor.infiniteLoop(code)) {
        var startTime = new Date().getTime();
        var lineCount = 0;
        var currTime = 0;
        handlers["Sk.debug"] = function(susp) {
            lineCount++;
            currTime =  new Date().getTime();
            if(currTime - startTime > 100) {
                if(lineCount < 50) {
                    return;
                }
                startTime = new Date().getTime();
                var p = new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        lineCount = 0;
                        try {
                            return resolve(susp.resume());
                        } catch(e) {
                            handleError(e);
                        }
                    }, 50);
                });
                return p;
            }
        };
    }

    function handleError (err) {
        var errString = err.toString() ;
        if(errString.indexOf('TimeLimitError') != -1) {
            if (postFunc != undefined) {
                postFunc();
            }
            return;
        }
        console.log(err);
        ui.showTip(errString);
    }

    Sk.misceval.callsimAsync(handlers, function () {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(function (module) {
        if (postFunc != undefined) {
            postFunc();
        }
    }, handleError);
}


function mb_run () {
    $('#simModal').modal('toggle');
    ui.init();
    var code = codeProcessor.getCode(true);
    sk_run(code, ui.updateSerialOutput, ui.serialInput);
}


function sm_run () {
    var code = codeProcessor.getCode(true);
    code = smCodeProcessor.processImport(code);
    var taskId = Code.getStringParamFromUrl('task_id', '');
    if (taskId == '') {
        console.log('task_id is empty');
        return;
    }
    var conf = task_conf['task_' + taskId];
    sm['taskConf'] = conf;
    smCodeProcessor.parseConfig(conf.steps);
    smCodeProcessor.autoKillProgram(conf.programTimeout);
    sm.init();
    sk_run(code, sm.uart.write, sm.uart.input, sm.getSnapshotArr);
}
