conf.url = conf.url || "static";
var base_url = conf.url + '/blockly/sims/mixgo_python/';
Sk.externalLibraries = {
    mixgo: {
        path: base_url + 'mixgo/__init__.js',
        dependencies: [
            base_url + 'mixgo/accelerometer.js',
            base_url + 'mixgo/compass.js',
            base_url + 'mixgo/uart.js',
            base_url + 'mixgo/infrared_left.js',
            base_url + 'mixgo/infrared_right.js'
        ]
    },
    time:{
        path: conf.url + '/blockly/sims/mixgo_python/time/__init__.js'
    },
    random:{
        path: conf.url + '/blockly/sims/mixgo_python/random/__init__.js'
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
            conf.url + '/blockly/sims/mixgo_python/sm/mixgo/infrared_left.js',
            conf.url + '/blockly/sims/mixgo_python/sm/mixgo/infrared_right.js',
        ]
    },
    sm_time:{
        path: conf.url + '/blockly/sims/mixgo_python/sm/time/__init__.js'
    },
    sm_machine: {
        path: conf.url + '/blockly/sims/mixgo_python/sm/machine/__init__.js'
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
    sm_sonar: {
        path: conf.url + '/blockly/sims/mixgo_python/sm/sonar/__init__.js'
    },
    sm_servo: {
        path: conf.url + '/blockly/sims/mixgo_python/sm/servo/__init__.js'
    },
    sm_matrix:{
        path: conf.url + '/blockly/sims/mixgo_python/sm/matrix/__init__.js'
    },
    sm_music: {
        path: conf.url + '/blockly/sims/mixgo_python/sm/music/__init__.js'
    },
    sm_radio:{
        path: conf.url + '/blockly/sims/mixgo_python/sm/radio/__init__.js'
    },
    sm_neopixel: {
        path: conf.url + '/blockly/sims/mixgo_python/sm/neopixel/__init__.js'
    },
    sm_random: {
        path: conf.url + '/blockly/sims/mixgo_python/sm/random/__init__.js'
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


function sk_run (code, outputFunc, inputFunc, postFunc, showTip) {
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
                if(sm.running) {
                    if(sm.inputer[sm.nextInputEventIndex]){
                        if(sm.inputer[sm.nextInputEventIndex].ts > sm.time)
                                sm.updateTimeTo(sm.inputer[sm.nextInputEventIndex].ts);
                            else{
                                sm.nextInputEventIndex++;
                            }
                        }
                        else{
                            sm.updateTimeTo(sm['taskConf'].timeout)
                        }
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
        if (showTip != undefined) {
            showTip(errString); 
        }
    }

    Sk.misceval.callsimAsync(handlers, function () {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(function (module) {
        sm.running = false;
        if (postFunc != undefined) {
            postFunc();
        }
    }, handleError);
}


function mb_run () {
    $('#simModal').modal('toggle');
    ui.init();
    var code = codeProcessor.getCode(true);
    if(Sk.execLimit === 0)
        Sk.execLimit = Number.POSITIVE_INFINITY;
    sk_run(code, ui.updateSerialOutput, ui.serialInput);
}


async function sm_run () {
    $('#markModal').modal('toggle');
    $('#mark_doing').show();
    $('#mark_done').hide();
    $('#mark_review').hide();
    $('#mark_review_done').hide();
    $('#mark_fb').text('');
    $('#mark_score').text('');
    $('#mark_note').hide();
    var code = codeProcessor.getCode(true);
    if (code == '') {
        $('#mark_doing').hide();
        $('#mark_done').show();
        $('#markProgress').css('width', '100%');
        $('#mark_fb').text('代码不能为空');
        return;
    }
    sm['markDone'] = false;
    code = smCodeProcessor.processImport(code);
    var taskId = Code.getStringParamFromUrl('eid', '');
    if (taskId == '') {
        console.log('eid is empty');
        return;
    }
    sm['taskConf'] = task_conf;
    ui.updateProgressBar(task_conf.timeout, 90);
    function asyncGenAns(ansPath, ansCode) {
        return new Promise(resolve => {
            smCodeProcessor.parseInputer(task_conf.inputer);
            sm.init();
            sk_run(ansCode, sm.uart.write, sm.uart.input, function () {
                submit_gen_ans(ansPath, resolve);
            }, ui.showMarkFb);
        });
    }
    if (task_ans != null) {
        for (var ansPath in task_ans) {
            var ansCode = task_ans[ansPath];
            ansCode = codeProcessor.replaceCode(ansCode);
            ansCode = smCodeProcessor.processImport(ansCode);
            await asyncGenAns(ansPath, ansCode);
        }
    }
    task_ans = null;
    smCodeProcessor.parseInputer(task_conf.inputer);
    smCodeProcessor.autoKillProgram(task_conf.timeout);
    sm.init();
    sk_run(code, sm.uart.write, sm.uart.input, function () {
        submit('judge');
    }, ui.showMarkFb);
}