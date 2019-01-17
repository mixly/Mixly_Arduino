function get_code (trick) {
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
}


function saveXmlFileAs () {
    var xmlCodes = goog.string.quote(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)));
    xmlCodes = xmlCodes.replace("<xml", "<xml version=\\\"mixgo_0.999\\\" board=\\\"" + "MicroPython[NRF51822_microbit]" + "\\\"");
    var blob = new Blob(
        [xmlCodes],
        { type: 'text/plain;charset=utf-8' });
    saveAs(blob, "Mixgo.xml");
};


function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}


function sk_run (code, outputFunc) {
    Sk.configure({
        output: outputFunc,
        read: builtinRead,
        execLimit:Number.POSITIVE_INFINITY,
        debugging: true
    });

    // if code contains a while loop
    var handlers = [];
    if((code.indexOf("while ") > -1) && (code.indexOf("sleep") == -1)) {
        //console.log("Crash prevention mode enabled: This happens when your code includes an infinite loop without a sleep() function call. Your code will run much more slowly in this mode.");
        var startTime = new Date().getTime();
        var lineCount = 0;
        handlers["Sk.debug"] = function(susp) {
            lineCount++;
            if(new Date().getTime() - startTime > 100) {
                if(lineCount < 50) {
                    return;
                }
                startTime = new Date().getTime();
                var p = new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        //console.log("Limiting speed to avoid crashing the browser: " + (lineCount * 10) +  " lines per second");
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
            return;
        }
        console.log(err);
        ui.showTip(errString);
    }

    Sk.misceval.callsimAsync(handlers, function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(function(module){}, handleError);
}

function mb_run () {
    $('#simModal').modal('toggle');
    ui.init();
    var code = get_code(true);
    sk_run(code, ui.updateSerialOutput);
}


function sm_run () {
    var code = get_code(true);
    code = process.processImport(code);
    process.parseConfig(task_conf['task_06']);
    process.autoKillProgram(sm.programTimeout);
    sm.init();
    sk_run(code, sm.updateStatus);
}
