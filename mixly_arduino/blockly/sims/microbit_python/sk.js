var base_url = conf.url + '/blockly/sims/microbit_python/';
Sk.externalLibraries = {
    microbit: {
        path: base_url + 'microbit/__init__.js',
        dependencies: [
            base_url + 'microbit/display.js',
            base_url + 'microbit/accelerometer.js',
            base_url + 'microbit/compass.js',
            base_url + 'microbit/uart.js',
        ]
    },
    music: {
        path: conf.url + '/blockly/sims/microbit_python/music/__init__.js'
    },
    radio:{
        path: conf.url + '/blockly/sims/microbit_python/radio/__init__.js'
    },
    speech: {
        path: conf.url + '/blockly/sims/microbit_python/speech/__init__.js',
        dependencies: [conf.url + '/blockly/sims/microbit_python/speech/sam.js']
    },
    neopixel: {
        path: conf.url + '/blockly/sims/microbit_python/neopixel/__init__.js'
    },
    //status machine
    sm_microbit: {
        path: base_url + 'sm/microbit/__init__.js',
        dependencies: [
            base_url + 'sm/microbit/display.js',
            base_url + 'sm/microbit/accelerometer.js',
            base_url + 'sm/microbit/compass.js',
            base_url + 'sm/microbit/uart.js',
        ]
    },
    sm_music: {
        path: base_url + 'sm/music/__init__.js'
    },
    sm_speech: {
        path: base_url + 'sm/speech/__init__.js'
    },
    sm_neopixel: {
        path: base_url + 'sm/neopixel/__init__.js'
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
                        return resolve(susp.resume());
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

    Sk.misceval.callsimAsync(handlers, function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(function(module){
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
    var conf = task_conf['task_test'];
    smCodeProcessor.parseConfig(conf.steps);
    smCodeProcessor.autoKillProgram(conf.programTimeout);
    sm.init();
    sk_run(code, sm.uart.write, sm.uart.input, sm.getSnapshotArr);
}
