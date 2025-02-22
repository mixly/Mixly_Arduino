var externalLibs = {//外部引入的第三方库
    "./blocklygame/__init__.js": "../common/js/skulpt_mixcar/bg_highlight.js",
    "./blocktool/__init__.js": "../common/js/skulpt_mixcar/inittool.js",
    "./bg_nonehl/__init__.js":"../common/js/skulpt_mixcar/bg_nonehl.js"
};
// document.write("<script language=JavaScript src='./js/skulpt/pyodide.js'></script>");
/**
 * An object for executing Python code and passing the results along to interested components.
 *
 * @constructor
 * @this {BlockPyEditor}
 * @param {Object} main - The main BlockPy instance
 * @param {HTMLElement} tag - The HTML object this is attached to.
 */ 
var PyEngine = function(programStatus, mixpyProject) {
     this.loadEngine();
    this.programStatus = programStatus;
    this.mixpyProject = mixpyProject;
}

/**
 * Definable function to be run when execution has fully ended,
 * whether it succeeds or fails.
 *
 */
PyEngine.prototype.onExecutionEnd = null;

/**
 * Helper function that will attempt to call the defined onExecutionEnd,
 * but will do nothing if there is no function defined.
 */
PyEngine.prototype.executionEnd_ = function() {
    if (this.onExecutionEnd !== null) {
        this.onExecutionEnd();
    }
}; 

/**
 * Initializes the Python Execution engine and the Printer (console).
 */
PyEngine.prototype.loadEngine = function() {
    var engine = this;
    // No connected services
    Sk.connectedServices = {}
    // TODO
    //Sk.console = printer.getConfiguration();
    // Definitely use a prompt
    Sk.inputfunTakesPrompt = true;
    
    // Keeps track of the tracing while the program is executing; destroyed afterwards.
    this.executionBuffer = {};
}

/**
 * Used to access Skulpt built-ins. This is pretty generic, taken
 * almost directly from the Skulpt docs.
 *
 * @param {String} filename - The python filename (e.g., "os" or "pprint") that will be loaded.
 * @returns {String} The JavaScript source code of the file (weird, right?)
 * @throws Will throw an error if the file isn't found.
 */
PyEngine.prototype.readFile = function(file) {
    console.log("Attempting file: " + Sk.ffi.remapToJs(file));
    // 加载模块
    if (PyGameZero.matchModelName(file)) {
        return PyGameZero.load(file)
    }
    if (externalLibs[file] !== undefined) {
        return Sk.misceval.promiseToSuspension(
        fetch(externalLibs[file]).then(
            function (resp){ return resp.text(); }
        ));
    }
    if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[file] === undefined) {
        throw "File not found: '" + file + "'";
    }
    return Sk.builtinFiles.files[file];
}

PyEngine.prototype.fileread = function(filename, mode) {
    if(this.mixpyProject.exist(filename)){
        return this.mixpyProject.getFileContent(filename);
    }else{
        if(mode.indexOf('w') !== -1){
            this.mixpyProject.add(filename, '', 1);
            return '';
        }else
            return null;    
    }
}

PyEngine.prototype.filewrite = function(fileItem, str) {
    var filename = fileItem.name;
    this.mixpyProject.modify(filename, str);
    this.mixpyProject.select(filename);
}

PyEngine.prototype.skInput = function(prompt) {
    return new Promise((resolve, reject) => {
        const { mainStatusBarTabs } = Mixly;
        const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
        var currText = statusBarTerminal.getValue();
        if (currText.lastIndexOf('\n') !== currText.length - 1)
            statusBarTerminal.addValue('\n>>>' + prompt);
        else
            statusBarTerminal.addValue('>>>' + prompt);
        const { editor } = statusBarTerminal;
        const { selection } = editor;
        editor.setReadOnly(false);
        const session = editor.getSession();
        const initRow = session.getLength();
        editor.gotoLine(initRow);
        selection.moveCursorLineEnd();
        const initCursor = selection.getCursor();
        const cursorCallback = session.selection.on('changeCursor', function (e) {
            const cursor = selection.getCursor();
            if (cursor.row < initCursor.row)
                selection.moveCursorTo(initCursor.row, initCursor.column, true);
            else if (cursor.row === initCursor.row
                  && cursor.column <= initCursor.column)
                selection.moveCursorTo(initCursor.row, initCursor.column, true);
            let endRowStr = session.getLine(cursor.row - 1);
            if (endRowStr.indexOf('>>>') !== -1
             && cursor.row === initCursor.row + 1
             && cursor.column === 0) {
                endRowStr = endRowStr.replace('>>>' + prompt, '');
                session.selection.removeEventListener('changeCursor', cursorCallback);
                selection.moveCursorLineEnd();
                editor.setReadOnly(true);
                resolve(endRowStr);
            } else {
                const nowRow = session.getLength();
                if (nowRow !== initRow) {
                    session.selection.removeEventListener('changeCursor', cursorCallback);
                    editor.setReadOnly(true);
                    resolve('');
                }
            }
        });
    });
}

/**
 * Resets the state of the execution engine, including reinitailizing
 * the execution buffer (trace, step, etc.), reseting the printer, and
 * hiding the trace button.
 *
 */
PyEngine.prototype.reset = function() {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    //点击取消按钮发送数据     
    Sk.execLimit = 0;
    Sk.execLimit = Number.POSITIVE_INFINITY;    
    //$("#side_code").text('');
    //$("#blocklySVG").empty();
    statusBarTerminal.setValue('');
}

PyEngine.prototype.kill = function(type) {
    // event_save('kill');
    //点击取消按钮发送数据     
    Sk.execLimit = 0;
    $("#loading").css('display', "none");
    if (document.getElementById("img01")) {
        document.getElementById("img01").src="";
    }
}

/**
 * "Steps" the execution of the code, meant to be used as a callback to the Skulpt
 * environment.
 * 
 * @param {Object} variables - Hash that maps the names of variables (Strings) to their Skulpt representation.
 * @param {Number} lineNumber - The corresponding line number in the source code that is being executed.
 * @param {Number} columnNumber - The corresponding column number in the source code that is being executed. Think of it as the "X" position to the lineNumber's "Y" position.
 * @param {String} filename - The name of the python file being executed (e.g., "__main__.py").
 * @param {String} astType - Unused? TODO: What is this?
 * @param {String} ast - String-encoded JSON representation of the AST node associated with this element.
 */
PyEngine.prototype.step = function(variables, lineNumber, 
                                       columnNumber, filename, astType, ast) {
    if (filename == '<stdin>.py') {
        var currentStep = this.executionBuffer.step;
        var globals = this.parseGlobals(variables);
        this.executionBuffer.trace.push(
            {'step': currentStep,
             'filename': filename,
             //'block': highlightMap[lineNumber-1],
             'line': lineNumber,
             'column': columnNumber,
             'properties': globals.properties,
             'modules': globals.modules});
        this.executionBuffer.step = currentStep+1;
        this.executionBuffer.last_step = currentStep+1;
        this.executionBuffer.line_number = lineNumber;
    }
}

/**
 * Runs the AbstractInterpreter to get some static information about the code,
 * in particular the variables' types. This is needed for type checking.
 *
 * @returns {Object<String, AIType>} Maps variable names (as Strings) to types as constructed by the AbstractIntepreter.
 */
PyEngine.prototype.analyzeVariables = function() {
    // Get the code
    var code = this.main.model.programs['__main__']();
    if (code.trim() == "") {
        return {};
    }
    
    var analyzer = new AbstractInterpreter(code);
    report = analyzer.report;
    return analyzer.variableTypes;
}

/**
 * Runs the AbstractInterpreter to get some static information about the code,
 * including potential semantic errors. It then parses that information to give
 * feedback.
 *
 * @returns {Boolean} Whether the code was successfully analyzed.
 */
PyEngine.prototype.analyze = function() {
    this.main.model.execution.status("analyzing");
    
    var feedback = this.main.components.feedback;
    
    // Get the code
    var code = this.main.model.programs['__main__']();
    if (code.trim() == "") {
        this.main.components.feedback.emptyProgram("You haven't written any code yet!");
        //this.main.model.feedback.status("semantic");
        return false;
    }
    
    var analyzer = new AbstractInterpreter(code);
    this.main.model.execution.ast = analyzer.ast;
    
    report = analyzer.report;
    // Syntax error
    if (report.error !== false) {
        console.log(report.error.args.v)
        var codeLine = '.';
        if (report.error.args.v.length > 3) {
            codeLine = ', where it says:<br><code>'+report.error.args.v[3][2]+'</code>';
        }
        this.main.reportError('editor', report.error, "While attempting to process your Python code, I found a syntax error. In other words, your Python code has a mistake in it (e.g., mispelled a keyword, bad indentation, unnecessary symbol). You should check to make sure that you have written all of your code correctly. To me, it looks like the problem is on line "+ report.error.args.v[2]+codeLine, report.error.args.v[2]);
        return false;
    }
        
    if (report["Unconnected blocks"].length >= 1) {
        var variable = report['Unconnected blocks'][0];
        feedback.semanticError("Unconnected blocks", "It looks like you have unconnected blocks on line "+variable.position.line+". Before you run your program, you must make sure that all of your blocks are connected and that there are no unfilled holes.", variable.position.line)
        return false;
    } else if (report['Iteration variable is iteration list'].length >= 1) {
        var variable = report['Iteration variable is iteration list'][0];
        feedback.semanticError("Iteration Problem", "The property <code>"+variable.name+"</code> was iterated on line "+variable.position.line+", but you used the same variable as the iteration variable. You should choose a different variable name for the iteration variable. Usually, the iteration variable is the singular form of the iteration list (e.g., <code>for dog in dogs:</code>).", variable.position.line)
        return false;
    } else if (report["Undefined variables"].length >= 1) {
        var variable = report["Undefined variables"][0];
        feedback.semanticError("Initialization Problem", "The property <code>"+variable.name+"</code> was read on line "+variable.position.line+", but it was not given a value on a previous line. You cannot use a property until it has been initialized.", variable.position.line)
        return false;
    } else if (report["Possibly undefined variables"].length >= 1) {
        var variable = report["Possibly undefined variables"][0];
        feedback.semanticError("Initialization Problem", "The property <code>"+variable.name+"</code> was read on line "+variable.position.line+", but it was possibly not given a value on a previous line. You cannot use a property until it has been initialized. Check to make sure that this variable was declared in all of the branches of your decision.", variable.position.line);
        return false;
    } else if (report["Unread variables"].length >= 1) {
        var variable = report["Unread variables"][0];
        feedback.semanticError("Unused Property", "The property <code>"+variable.name+"</code> was set, but was never used after that.", null)
        return false;
    } else if (report["Overwritten variables"].length >= 1) {
        var variable = report["Overwritten variables"][0];
        feedback.semanticError("Overwritten Property", "The property <code>"+variable.name+"</code> was set, but before it could be read it was changed on line "+variable.position.line+". It is unnecessary to change an existing variable's value without reading it first.", variable.position.line)
        return false;
    } else if (report["Empty iterations"].length >= 1) {
        var variable = report["Empty iterations"][0];
        feedback.semanticError("Iterating over empty list", "The property <code>"+variable.name+"</code> was set as an empty list, and then you attempted to iterate over it on "+variable.position.line+". You should only iterate over non-empty lists.", variable.position.line)
        return false;
    } else if (report["Non-list iterations"].length >= 1) {
        var variable = report["Non-list iterations"][0];
        feedback.semanticError("Iterating over non-list", "The property <code>"+variable.name+"</code> is not a list, but you attempted to iterate over it on "+variable.position.line+". You should only iterate over non-empty lists.", variable.position.line)
        return false;
    } else if (report["Incompatible types"].length >= 1) {
        var variable = report["Incompatible types"][0];
        feedback.semanticError("Incompatible types", "You attempted to "+variable.operation+" a "+variable.left.type+" and a "+variable.right.type+" on line "+variable.position.line+". But you can't do that with that operator. Make sure both sides of the operator are the right type.", variable.position.line)
        return false;
    }
    
    return true;
}

var GLOBAL_VALUE;


/**
 * Runs the given python code, resetting the console and Trace Table.
 * 分步调试代码
 */
PyEngine.prototype.steprun = function(type) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue('');
    mainStatusBarTabs.show();
    if (!$('#skulpt-img').length) {
        $('body').append($(
            `<div id="skulpt-img" wrap="off" style="height:100%;display:none;">
                <div id="mat_div" wrap="off"
                    style="position:relative;height:0%;background:#f9f9f9;outline: none;overflow:auto">
                    <div id="matplot_img"></div>
                </div>
                <div id="output_img" wrap="off" readonly
                    style="position: relative;height:100%;background:#f9f9f9;outline:none;overflow:auto"></div>
                <div id="pggame_stage" wrap="off" readonly
                    style="position: relative;height:0%;background:#f9f9f9;outline: none;overflow:auto"></div>
                <div id="blocklySVG" wrap="off" readonly style="position: relative;height:0%;background:#f9f9f9;outline:none;overflow:auto"></div>
            </div>`
      ));
    }
    var xml = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var data = Blockly.Xml.domToText(xml);
    if (document.getElementById("boardSelector").value == ""){
        var fn = 'filename.xml'
    }else{
        var fn = document.getElementById("boardSelector").value + '.xml'
    }

    window.actionArrayRecord = [];     
    $("#blocklySVG").empty();
    $("#loading").css('display', "inline-block");

    // Reset everything
    this.reset();

    //SK设置
    this.loadEngine();
    // Major Skulpt configurations
    Sk.configure({
    // Function to handle the text outputted by Skulpt
    //设置文本输出
        output: function(lineText){
            statusBarTerminal.addValue(lineText);
        },
        // Function to handle loading in new files
        read: this.readFile.bind(this),
        inputfun:this.skInput.bind(this),
        inputfunTakesPrompt: true,
        execLimit:Number.POSITIVE_INFINITY,
        fileread:this.fileread.bind(this),
        filewrite:this.filewrite.bind(this),
        __future__: Sk.python3,//python3已成默认值，要使用python2需要单独设置
    });
   
    Sk.builtins.value = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy(GLOBAL_VALUE === undefined ? 5 : GLOBAL_VALUE);
    });
    Sk.builtins.set_value = new Sk.builtin.func(function(v) {
        GLOBAL_VALUE = v.v;
    });
        
    // Get the code
    var code = Mixly.MFile.getCode();
    //如果存在游戏模块，则只能读取模块代码
    /*if ((code.indexOf("import blocklygame")!=-1)||(code.indexOf("from blocklygame import")!=-1)){
        code = Blockly.Python.workspaceToCode(Mixly.Editor.blockEditor) || '';//code
        code+="\nprint(blocklygame.getFinishState())"
    }*/

    var engine = this;
    if(code === "") {
        engine.programStatus['running'] = false;
        $("#loading").css('display', "none");
        statusBarTerminal.setValue('==无程序需运行==\n');
        return;
    }

    var pack_num = 0;
    //检验是否有数据分析、机器学习相关的模块
    var pack_list = ["numpy","pandas","scikit-learn","matplotlib"];
    var code_pack_list = [];
    for (var i = 0; i < pack_list.length; i++) {
        if ((code.indexOf("import "+pack_list[i])!=-1)||(code.indexOf("from "+pack_list[i]+" import")!=-1)){
            pack_num++;
            code_pack_list.push(pack_list[i])
        }
    }

    //检验是否存在pygame-zero模块
    var pyzrun_pack="pgzrun"
    var ifpgzrun=false;
    if ((code.indexOf("import "+pyzrun_pack)!=-1)||(code.indexOf("from "+pyzrun_pack+" import")!=-1)){
        ifpgzrun=true;
    }
    
    if (this.layerNum && this.layerSize) {
        this.layerSize.content = [
            $('#skulpt-img').width(),
            $('#skulpt-img').height(),
        ];
    }
  
    if(code_pack_list.includes('matplotlib')){
        document.getElementById("mat_div").style.height='100%'
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='0%'
        $("#matplot_img").css('width', this?.layerSize?.content[0] ?? ($('body').width() / 2 + 'px'));
        $("#matplot_img").css('height',this?.layerSize?.content[1] ?? ($('body').height() * 0.7 - 30 + 'px'));
    }

    //如果存在pygame-zero，则进行相关的配置
    if(ifpgzrun){
        document.getElementById("mat_div").style.height='0%'
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='100%'
        const Sk = window.Sk;
        Sk.TurtleGraphics.reset && Sk.TurtleGraphics.reset()
        Sk.TurtleGraphics.target = "pggame_stage";
        Sk.TurtleGraphics.width = (this?.layerSize?.content[0] ?? ($('body').width() / 2) - 30) - 5;
        Sk.TurtleGraphics.height = (this?.layerSize?.content[1] ?? ($('body').height() * 0.7 - 40)) - 5;

        const PyGameZero = window.PyGameZero;
        const stageSize = {width: 0, height: 0};
        const stageEl = document.getElementById("pggame_stage");
        // 配置容器
        stageSize.width = $('#pggame_stage').width() - 50;
        stageSize.height = $('#pggame_stage').height() - 50;
        PyGameZero.setContainer(stageEl)
        PyGameZero.reset();

    }

    //检验是否存在pygame-zero模块
    var bg_nonehl_pack="blocklygame"
    var ifbg_nonehl=false;
    if ((code.indexOf("import "+bg_nonehl_pack)!=-1)||(code.indexOf("from "+bg_nonehl_pack+" import")!=-1)){
        ifbg_nonehl=true;
    }

    //如果存在bg_nonehl，则进行相关的配置
    if(ifbg_nonehl){
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='0%'
        document.getElementById("blocklySVG").style.height='100%'
    }

    // event_save('steprun');

    if (ifpgzrun || ifbg_nonehl) {
        const _this = this;
        this.layerNum = Mixly.LayerExt.open({
            title: [Mixly.Msg.Lang['显示'], '30px'],
            shade: 0,
            offset: 'rt',
            area: _this?.layerSize?.layero ?? ['34%', '70%'],
            max: [$('body').width() + 'px', $('body').height() + 'px'],
            fixed: false,
            content: $('#skulpt-img'),
            resizing: function(size) {
                _this.layerSize = size;
            },
            end: function() {
                _this.layerNum = null;
                pyengine.kill();
            }
        });
    }

    //如果是第五关、第七关，则需要把检查循环次数的代码加进去
    if(code.indexOf("settedMap(4")!=-1 | code.indexOf("settedMap(6")!=-1){
        if(code.indexOf("moveDirection")!=-1){//初始化的时候不加这行代码
            code=code+"actor.isCirculationRight();\n"
        }
    }

    //除了第六关，其他把检查是否成功代码加进去
    if(code.indexOf("settedMap(5)")==-1){
        if(code.indexOf("moveDirection")!=-1){//初始化的时候不加这行代码
            code=code+"actor.isSuccess();\n"
        }
    }
    console.log(code)

    //已经读取了代码：code
    // Actually run the python code
    var executionPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    executionPromise.then(
        function (module) {
            engine.programStatus['running'] = false;
            $("#loading").css('display', "none");
            // Run the afterSingleExecution one extra time for final state
            /*Sk.afterSingleExecution(module.$d, -1, 0, "<stdin>.py");
            engine.check(code, execution.trace(), execution.output(), execution.ast, module.$d);
            engine.executionEnd_();
            */
            statusBarTerminal.addValue('==程序运行完成==\n');
            console.log('success');
        },
        function(error) {
            engine.programStatus['running'] = false;
            $("#loading").css('display', "none");
            
            var original = prettyPrintError(error);
            //hack for kill program with time limiterror
            if(original.indexOf("TimeLimitError") !== -1)
                return;
            if($('.inputMsg').length > 0)
                $('#side_code').text($('#side_code').text() + $('.inputMsg').val()) 

            // var $errorE = $('<span />').addClass('errorMsg').html(original);
            // $("#side_code").append($errorE)
            statusBarTerminal.addValue(original);
            var matchRet = /on line (\d+)/.exec(original);
            var lineNumber = -1;
            if(matchRet !== null && matchRet.length == 2){
                lineNumber = parseInt(matchRet[1]) - 1; 
                editor.session.addMarker(new EditorRange(lineNumber, 0, lineNumber, 1), "errorMarker", "fullLine");
                editor.hasMarker = true;
            }
            engine.executionEnd_();
            console.log(error.toString());
            const nowValue = statusBarTerminal.getValue();
            if (nowValue.lastIndexOf('\n') !== nowValue.length - 1) {
                statusBarTerminal.addValue('\n');
            }
            statusBarTerminal.addValue(error.toString() + '\n==程序运行完成==\n');
        }
);

}

/**
 * Runs the given python code, resetting the console and Trace Table.
 * 直接运行，不分步高亮显示
 */
 PyEngine.prototype.run = function(type) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue('');
    mainStatusBarTabs.show();
    if (!$('#skulpt-img').length) {
        $('body').append($(
            `<div id="skulpt-img" wrap="off" style="height:100%;display:none;">
                <div id="mat_div" wrap="off"
                    style="position:relative;height:0%;outline: none;overflow:auto">
                    <div id="matplot_img"></div>
                </div>
                <div id="output_img" wrap="off" readonly
                    style="position:relative;height:100%;outline:none;overflow:auto"></div>
                <div id="pggame_stage" wrap="off" readonly
                    style="position: relative;height:0%;outline: none;overflow:auto"></div>
                <div id="blocklySVG" wrap="off" readonly style="position: relative;height:0%;outline:none;overflow:auto"></div>
            </div>`
      ));
    }
    var xml = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var data = Blockly.Xml.domToText(xml);
    if (document.getElementById("boardSelector").value == ""){
        var fn = 'filename.xml'
    }else{
        var fn = document.getElementById("boardSelector").value + '.xml'
    }

    window.actionArrayRecord = [];     
    $("#blocklySVG").empty();
    $("#loading").css('display', "inline-block");


    /*if(sidecodeDisplay === false){
        sidecodeClick();    
    }*/
    // Reset everything
    this.reset();

    //SK设置
    this.loadEngine();
    // Major Skulpt configurations
    Sk.configure({
    // Function to handle the text outputted by Skulpt
    //设置文本输出
        output: function(lineText){
            statusBarTerminal.addValue(lineText);
        },
        // Function to handle loading in new files
        read: this.readFile.bind(this),
        inputfun:this.skInput.bind(this),
        inputfunTakesPrompt: true,
        execLimit:Number.POSITIVE_INFINITY,
        fileread:this.fileread.bind(this),
        filewrite:this.filewrite.bind(this),
        __future__: Sk.python2,//python3已成默认值，要使用python2需要单独设置
    });
   
    Sk.builtins.value = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy(GLOBAL_VALUE === undefined ? 5 : GLOBAL_VALUE);
    });
    Sk.builtins.set_value = new Sk.builtin.func(function(v) {
        GLOBAL_VALUE = v.v;
    });
    // event_save('run'); 
    // Get the code
    var code = Mixly.MFile.getCode();
    if(code === "") {
        this.programStatus['running'] = false;
        $("#loading").css('display', "none");
        statusBarTerminal.setValue('==无程序需运行==\n');
        return;
    }
    //如果存在游戏模块，则只能读取模块代码
    /*if ((code.indexOf("import blocklygame")!=-1)||(code.indexOf("from blocklygame import")!=-1)){
        code = Blockly.Python.workspaceToCode(Mixly.Editor.blockEditor) || '';//code
        code+="\nprint(blocklygame.getFinishState())"
    }*/
    //改为只读区代码区的代码，这样就能够消除高亮执行
    if ((code.indexOf("import blocktool")!=-1)||(code.indexOf("import blocklygame")!=-1)||(code.indexOf("from blocklygame import")!=-1)){
        //正则匹配替换block id元素
        var code_piece=[];
        code_piece=code.split("\n");
        for(var i=0;i<code_piece.length;i++){
            if(code_piece[i].indexOf("block_id") >= 0 ){  
                var target="";
                var re=/,?'block_id=[\s\S]*'/.exec(code_piece[i]);
                if(re!=null){
                    target=re[0];
                    code_piece[i]=code_piece[i].replace(target,"");
                } 
            }
            //检查是否是高亮辅助块\toll，如果是，则将此行代码移除
            if((code_piece[i].indexOf("import blocktool") >= 0) || (code_piece[i].indexOf("blocktool.highlight") >= 0) ){  
                code_piece[i]="delete";
            }
            //如果使用的是分步调试的blocklygame，要将其换成非分步调试的模块bg_nonehl
            if((code_piece[i].indexOf("blocklygame") >= 0)){  
                code_piece[i]=code_piece[i].replace("blocklygame","bg_nonehl");
            }
            
        }   
        code=""
        for(var i=0;i<code_piece.length;i++){
            if(code_piece[i]!="delete"){
                code+=code_piece[i]+'\n'
            }
        }
         
    }

    var engine = this;
    var pack_num = 0;
    //检验是否有数据分析、机器学习相关的模块
    var pack_list = ["numpy","pandas","scikit-learn","matplotlib"];
    var code_pack_list = [];
    for (var i = 0; i < pack_list.length; i++) {
        if ((code.indexOf("import "+pack_list[i])!=-1)||(code.indexOf("from "+pack_list[i]+" import")!=-1)){
            pack_num++;
            code_pack_list.push(pack_list[i])
        }
    }

    //检验是否存在pygame-zero模块
    var pyzrun_pack="pgzrun"
    var ifpgzrun=false;
    if ((code.indexOf("import "+pyzrun_pack)!=-1)||(code.indexOf("from "+pyzrun_pack+" import")!=-1)){
        ifpgzrun=true;
    }

    //检验是否存在pygame-zero模块
    var bg_nonehl_pack="bg_nonehl"
    var ifbg_nonehl=false;
    if ((code.indexOf("import "+bg_nonehl_pack)!=-1)||(code.indexOf("from "+bg_nonehl_pack+" import")!=-1)){
        ifbg_nonehl=true;
    }

    if(code.indexOf("print") >= 0){//处理print函数中的end
        var code_piece=[];
        code_piece=code.split("\n");
        for(var i=0;i<code_piece.length;i++){
            if(code_piece[i].indexOf("print") >= 0 ){
                if(code_piece[i].indexOf(",end") >= 0 ){
                    var target="";
                    var re=/,end =([\s\S]*)\)$/.exec(code_piece[i])
                    if(re!=null){
                        target=re[0];
                        target=/['"]([\s\S]*)['"]/.exec(target)[0]
                        code_piece[i]=code_piece[i].replace(/,end =([\s\S]*)\)$/,")"+";print("+target+");");
                    }
                    //console.log(code_piece[i])
                }else{
                    var target="";
                    var re=/\)$/.exec(code_piece[i])
                    if(re!=null){
                        target=re[0];
                        // code_piece[i]=code_piece[i].replace(/\)$/,"+'\\n'"+target)
                        code_piece[i]=code_piece[i].replace(/\)$/,target+";");
                    }
                    //console.log(code_piece[i])
                }
            }  
        }
        code_new=code_piece.join("\n");
        //console.log(code_new)
        code=code_new    
    }

    //如果是第五关、第七关，则需要把检查循环次数的代码加进去
    if(code.indexOf("settedMap(4)")!=-1 | code.indexOf("settedMap(6)")!=-1){
        if(code.indexOf("moveDirection")!=-1){//初始化的时候不加这行代码
            code=code+"actor.isCirculationRight();\n"
        }
    }

    //除了第六关，其他把检查是否成功代码加进去
    if(code.indexOf("settedMap(5)")==-1){
        if(code.indexOf("moveDirection")!=-1){//初始化的时候不加这行代码
            code=code+"actor.isSuccess();\n"
        }
    }

    console.log(code)
    if(code_pack_list.includes('matplotlib')){
        document.getElementById("mat_div").style.height='100%'
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='0%'
        $("#matplot_img").css('width', this?.layerSize?.content[0] ?? ($('body').width() / 2 + 'px'));
        $("#matplot_img").css('height',this?.layerSize?.content[1] ?? ($('body').height() - 30 + 'px'));
    }

    //如果存在pygame-zero，则进行相关的配置
    if(ifpgzrun){
        document.getElementById("mat_div").style.height='0%'
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='100%'
        
        const Sk = window.Sk;
        Sk.TurtleGraphics.reset && Sk.TurtleGraphics.reset()
        Sk.TurtleGraphics.target = "pggame_stage";
        Sk.TurtleGraphics.width = (this?.layerSize?.content[0] ?? ($('body').width() / 2) - 30) - 5;
        Sk.TurtleGraphics.height = (this?.layerSize?.content[1] ?? ($('body').height() - 35)) - 5;

        const PyGameZero = window.PyGameZero;
        const stageSize = {width: 0, height: 0};
        const stageEl = document.getElementById("pggame_stage");
        // 配置容器
        stageSize.width = $('#pggame_stage').width() - 50;
        stageSize.height = $('#pggame_stage').height() - 50;
        PyGameZero.setContainer(stageEl)
        PyGameZero.reset();
    }

    //如果存在bg_nonehl，则进行相关的配置
    if(ifbg_nonehl){
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='0%'
        document.getElementById("blocklySVG").style.height='100%'
    }

    if (ifpgzrun || ifbg_nonehl) {
        const _this = this;
        this.layerNum = Mixly.LayerExt.open({
            title: [Mixly.Msg.Lang['显示'], '30px'],
            shade: 0,
            offset: 'rt',
            area: _this?.layerSize?.layero ?? ['34%', '70%'],
            max: [$('body').width() + 'px', $('body').height() + 'px'],
            fixed: false,
            content: $('#skulpt-img'),
            resizing: function(size) {
                _this.layerSize = size;
            },
            end: function() {
                _this.layerNum = null;
                pyengine.kill();
            }
        });
    }
    
    //已经读取了代码：code
    // Actually run the python code
    var executionPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    executionPromise.then(
        function (module) {
            engine.programStatus['running'] = false;
            $("#loading").css('display', "none");
            // Run the afterSingleExecution one extra time for final state
            /*Sk.afterSingleExecution(module.$d, -1, 0, "<stdin>.py");
            engine.check(code, execution.trace(), execution.output(), execution.ast, module.$d);
            engine.executionEnd_();
            */
            const nowValue = statusBarTerminal.getValue();
            if (nowValue.lastIndexOf('\n') !== nowValue.length - 1) {
                statusBarTerminal.addValue('\n');
            }
            window.userOpEvents && window.userOpEvents.addRecord({
                operation: 'run-success'
            });
            window.userEvents && window.userEvents.addRecord({
                operation: 'run-success'
            });
            statusBarTerminal.addValue(`==${Mixly.Msg.Lang['shell.finish']}==\n`);
        },
        function(error) {
            engine.programStatus['running'] = false;
            $("#loading").css('display', "none");
            
            var original = prettyPrintError(error);
            //hack for kill program with time limiterror
            if(original.indexOf("TimeLimitError") !== -1)
                return;

            var $errorE = $('<span />').addClass('errorMsg').html(original);
            // $("#side_code").append($errorE)
            statusBarTerminal.addValue(original);
            var matchRet = /on line (\d+)/.exec(original);
            var lineNumber = -1;
            if(matchRet !== null && matchRet.length == 2){
                lineNumber = parseInt(matchRet[1]) - 1; 
                editor.session.addMarker(new EditorRange(lineNumber, 0, lineNumber, 1), "errorMarker", "fullLine");
                editor.hasMarker = true;
            }
            engine.executionEnd_();
            console.log(error.toString());
            const nowValue = statusBarTerminal.getValue();
            if (nowValue.lastIndexOf('\n') !== nowValue.length - 1) {
                statusBarTerminal.addValue('\n');
            }
            statusBarTerminal.addValue(error.toString() + '\n');
            window.userOpEvents && window.userOpEvents.addRecord({
                operation: 'run-error'
            });
            window.userEvents && window.userEvents.addRecord({
                operation: 'run-error'
            });
            statusBarTerminal.addValue(`==${Mixly.Msg.Lang['shell.finish']}==\n`);
        }
);

}

//提交代码：先运行代码，返回运行结果，然后提交
PyEngine.prototype.run2 = function(type) {
    var xml = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
    var data = Blockly.Xml.domToText(xml);
    if (document.getElementById("boardSelector").value == ""){
        var fn = 'filename.xml'
    }else{
        var fn = document.getElementById("boardSelector").value + '.xml'
    }

    layer.closeAll('page');
    window.actionArrayRecord = [];     
    $("#blocklySVG").empty();
    $("#loading").css('display', "inline-block");


    /*if(sidecodeDisplay === false){
        sidecodeClick();    
    }*/
    // Reset everything
    this.reset();

    //SK设置
    this.loadEngine();
    // Major Skulpt configurations
    Sk.configure({
    // Function to handle the text outputted by Skulpt
    //设置文本输出
        output: function(lineText){
                statusBarTerminal.addValue(lineText);
            },
        // Function to handle loading in new files
        read: this.readFile.bind(this),
        inputfun:this.skInput.bind(this),
        inputfunTakesPrompt: true,
        execLimit:Number.POSITIVE_INFINITY,
        fileread:this.fileread.bind(this),
        filewrite:this.filewrite.bind(this),
        __future__: Sk.python2,//python3已成默认值，要使用python2需要单独设置
    });
   
    Sk.builtins.value = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy(GLOBAL_VALUE === undefined ? 5 : GLOBAL_VALUE);
    });
    Sk.builtins.set_value = new Sk.builtin.func(function(v) {
        GLOBAL_VALUE = v.v;
    });
    // Get the code
    var code = Mixly.MFile.getCode();
    //如果存在游戏模块，则只能读取模块代码
    /*if ((code.indexOf("import blocklygame")!=-1)||(code.indexOf("from blocklygame import")!=-1)){
        code = Blockly.Python.workspaceToCode(Mixly.Editor.blockEditor) || '';//code
        code+="\nprint(blocklygame.getFinishState())"
    }*/
    //改为只读区代码区的代码，这样就能够消除高亮执行
    if ((code.indexOf("import blocktool")!=-1)||(code.indexOf("import blocklygame")!=-1)||(code.indexOf("from blocklygame import")!=-1)){
        //正则匹配替换block id元素
        var code_piece=[];
        code_piece=code.split("\n");
        for(var i=0;i<code_piece.length;i++){
            if(code_piece[i].indexOf("block_id") >= 0 ){  
                var target="";
                var re=/,?'block_id=[\s\S]*'/.exec(code_piece[i]);
                if(re!=null){
                    target=re[0];
                    code_piece[i]=code_piece[i].replace(target,"");
                } 
            }
            //检查是否是高亮辅助块\toll，如果是，则将此行代码移除
            if((code_piece[i].indexOf("import blocktool") >= 0) || (code_piece[i].indexOf("blocktool.highlight") >= 0) ){  
                code_piece[i]="delete";
            }
            //如果使用的是分步调试的blocklygame，要将其换成非分步调试的模块bg_nonehl
            if((code_piece[i].indexOf("blocklygame") >= 0)){  
                code_piece[i]=code_piece[i].replace("blocklygame","bg_noanimation");
            }
            
        }   
        code=""
        for(var i=0;i<code_piece.length;i++){
            if(code_piece[i]!="delete"){
                code+=code_piece[i]+'\n'
            }
        }
         
    }

    var engine = this;
    if(code === "") {
        engine.programStatus['running'] = false;
        $("#loading").css('display', "none");
        return;
    }

    var pack_num = 0;
    //检验是否有数据分析、机器学习相关的模块
    var pack_list = ["numpy","pandas","scikit-learn","matplotlib"];
    var code_pack_list = [];
    for (var i = 0; i < pack_list.length; i++) {
        if ((code.indexOf("import "+pack_list[i])!=-1)||(code.indexOf("from "+pack_list[i]+" import")!=-1)){
            pack_num++;
            code_pack_list.push(pack_list[i])
        }
    }

    //检验是否存在pygame-zero模块
    var pyzrun_pack="pgzrun"
    var ifpgzrun=false;
    if ((code.indexOf("import "+pyzrun_pack)!=-1)||(code.indexOf("from "+pyzrun_pack+" import")!=-1)){
        ifpgzrun=true;
    }

    if(code.indexOf("print") >= 0){//处理print函数中的end
        var code_piece=[];
        code_piece=code.split("\n");
        for(var i=0;i<code_piece.length;i++){
            if(code_piece[i].indexOf("print") >= 0 ){
                if(code_piece[i].indexOf(",end") >= 0 ){
                    var target="";
                    var re=/,end =([\s\S]*)\)$/.exec(code_piece[i])
                    if(re!=null){
                        target=re[0];
                        target=/['"]([\s\S]*)['"]/.exec(target)[0]
                        code_piece[i]=code_piece[i].replace(/,end =([\s\S]*)\)$/,")"+";print("+target+");");
                    }
                    //console.log(code_piece[i])
                }else{
                    var target="";
                    var re=/\)$/.exec(code_piece[i])
                    if(re!=null){
                        target=re[0];
                        // code_piece[i]=code_piece[i].replace(/\)$/,"+'\\n'"+target)
                        code_piece[i]=code_piece[i].replace(/\)$/,target+";print('\\n');");
                    }
                    //console.log(code_piece[i])
                }
            }  
        }
        code_new=code_piece.join("\n");
        //console.log(code_new)
        code=code_new    
    }
  
    if(code_pack_list.includes('matplotlib')){
        document.getElementById("mat_div").style.height='100%'
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='0%'
        $("#matplot_img").css('width','450px');
        $("#matplot_img").css('height','450px');
    }

    //如果存在pygame-zero，则进行相关的配置
    if(ifpgzrun){
        document.getElementById("mat_div").style.height='0%'
        document.getElementById("output_img").style.height='0%'
        document.getElementById("pggame_stage").style.height='100%'
        
        const Sk = window.Sk;
        Sk.TurtleGraphics.reset && Sk.TurtleGraphics.reset()
        Sk.TurtleGraphics.target = "pggame_stage";
        Sk.TurtleGraphics.width = $('#pggame_stage').width() - 50
        Sk.TurtleGraphics.height = $('#pggame_stage').height() - 50

        const PyGameZero = window.PyGameZero;
        const stageSize = {width: 0, height: 0};
        const stageEl = document.getElementById("pggame_stage");
        // 配置容器
        stageSize.width = $('#pggame_stage').width() - 50;
        stageSize.height = $('#pggame_stage').height() - 50;
        PyGameZero.setContainer(stageEl)
        PyGameZero.reset();

    }
    console.log(code)
    
    //已经读取了代码：code
    // Actually run the python code
    var executionPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    executionPromise.then(
        function (module) {
            engine.programStatus['running'] = false;
            $("#loading").css('display', "none");
            // Run the afterSingleExecution one extra time for final state
            /*Sk.afterSingleExecution(module.$d, -1, 0, "<stdin>.py");
            engine.check(code, execution.trace(), execution.output(), execution.ast, module.$d);
            engine.executionEnd_();
            */
            const nowValue = statusBarTerminal.getValue();
            if (nowValue.lastIndexOf('\n') !== nowValue.length - 1) {
                statusBarTerminal.addValue('\n');
            }
            statusBarTerminal.addValue('==程序运行完成==\n');
            console.log('success');
        },
        function(error) {
            engine.programStatus['running'] = false;
            $("#loading").css('display', "none");
            
            var original = prettyPrintError(error);
            //hack for kill program with time limiterror
            if(original.indexOf("TimeLimitError") !== -1)
                return;
            if($('.inputMsg').length > 0)
                $('#side_code').text($('#side_code').text() + $('.inputMsg').val()) 

            var $errorE = $('<span />').addClass('errorMsg').html(original);
            // $("#side_code").append($errorE)
            statusBarTerminal.addValue(original);
            var matchRet = /on line (\d+)/.exec(original);
            var lineNumber = -1;
            if(matchRet !== null && matchRet.length == 2){
                lineNumber = parseInt(matchRet[1]) - 1; 
                editor.session.addMarker(new EditorRange(lineNumber, 0, lineNumber, 1), "errorMarker", "fullLine");
                editor.hasMarker = true;
            }
            engine.executionEnd_();
            console.log(error.toString());
            const nowValue = statusBarTerminal.getValue();
            if (nowValue.lastIndexOf('\n') !== nowValue.length - 1) {
                statusBarTerminal.addValue('\n');
            }
            statusBarTerminal.addValue(error.toString() + '\n==程序运行完成==\n');
        }
);

}


/**
 * Indents the given string by 4 spaces. This correctly handles multi-line strings.
 *
 * @param {String} str - The string to be manipulated.
 * @returns {String} The string with four spaces added at the start of every new line.
 */
function indent(str) {
  return str.replace(/^(?=.)/gm, '    ');
}

function prettyPrintError (error) {
    if (typeof error === "string") {
        return error;
    } else {
        // A weird skulpt thing?
        if (error.tp$str !== undefined) {
            return error.tp$str().v;
        } else {
            return ""+error.name + ": " + error.message;
        }
    }
}
  
/**
 * Skulpt Module for holding the Instructor API.
 *
 * This module is a little hackish. We need to sit down and reevaluate the best way to
 * organize it and whether this particular structure is ideal. I suspect it should be
 * it's own proper JS file.
 *
 * @param {String} name - The name of the module (should always be 'instructor')
 *
 */
var instructor_module = function(name) {
    // Main module object that gets returned at the end.
    var mod = {};
    
    /**
     * Skulpt Exception that represents a Feedback object, to be rendered to the user
     * when the feedback system finds a problem.
     * 
     * @param {Array} args - A list of optional arguments to pass to the Exception.
     *                       Usually this will include a message for the user.
     */
    Sk.builtin.Feedback = function (args) {
        var o;
        if (!(this instanceof Sk.builtin.Feedback)) {
            o = Object.create(Sk.builtin.Feedback.prototype);
            o.constructor.apply(o, arguments);
            return o;
        }
        Sk.builtin.Exception.apply(this, arguments);
    };
    Sk.abstr.setUpInheritance("Feedback", Sk.builtin.Feedback, Sk.builtin.Exception);
    
    /**
     * Skulpt Exception that represents a Success object, to be thrown when the user
     * completes their program successfully.
     *
     ** @param {Array} args - A list of optional arguments to pass to the Exception.
     *                       Usually this will be empty.
     */
    Sk.builtin.Success = function (args) {
        var o;
        if (!(this instanceof Sk.builtin.Success)) {
            o = Object.create(Sk.builtin.Success.prototype);
            o.constructor.apply(o, arguments);
            return o;
        }
        Sk.builtin.Exception.apply(this, arguments);
    };
    Sk.abstr.setUpInheritance("Success", Sk.builtin.Success, Sk.builtin.Exception);
    
    /**
     * Skulpt Exception that represents a Finished object, to be thrown when the user
     * completes their program successfully, but isn't in a problem with a "solution".
     * This is useful for open-ended canvases where we still want to capture the students'
     * code in Canvas.
     *
     ** @param {Array} args - A list of optional arguments to pass to the Exception.
     *                       Usually this will be empty.
     */
    Sk.builtin.Finished = function (args) {
        var o;
        if (!(this instanceof Sk.builtin.Finished)) {
            o = Object.create(Sk.builtin.Finished.prototype);
            o.constructor.apply(o, arguments);
            return o;
        }
        Sk.builtin.Exception.apply(this, arguments);
    };
    Sk.abstr.setUpInheritance("Finished", Sk.builtin.Finished, Sk.builtin.Exception);
    
    /**
     * A Skulpt function that throws a Feedback exception, allowing us to give feedback
     * to the user through the Feedback panel. This function call is done for aesthetic
     * reasons, so that we are calling a function instead of raising an error. Still,
     * exceptions allow us to break out of the control flow immediately, like a 
     * return, so they are a good mechanism to use under the hood.
     * 
     * @param {String} message - The message to display to the user.
     */
    mod.set_feedback = new Sk.builtin.func(function(message) {
        Sk.builtin.pyCheckArgs("set_feedback", arguments, 1, 1);
        Sk.builtin.pyCheckType("message", "string", Sk.builtin.checkString(message));
        throw new Sk.builtin.Feedback(message.v);
    });
    
    /**
     * A Skulpt function that throws a Success exception. This will terminate the
     * feedback analysis, but reports that the students' code was successful.
     * This function call is done for aesthetic reasons, so that we are calling a
     * function instead of raising an error. Still, exceptions allow us to break
     * out of the control flow immediately, like a return would, so they are a
     * good mechanism to use under the hood.
     */
    mod.set_success = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("set_success", arguments, 0, 0);
        throw new Sk.builtin.Success();
    });
    
    /**
     * A Skulpt function that throws a Finished exception. This will terminate the
     * feedback analysis, but reports that the students' code was successful.
     * This function call is done for aesthetic reasons, so that we are calling a
     * function instead of raising an error. Still, exceptions allow us to break
     * out of the control flow immediately, like a return would, so they are a
     * good mechanism to use under the hood.
     */
    mod.set_finished = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("set_finished", arguments, 0, 0);
        throw new Sk.builtin.Finished();
    });
    
    // Memoization of previous parses - some mild redundancy to save time
    // TODO: There's no evidence this is good, and could be a memory hog on big
    // programs. Someone should investigate this. The assumption is that multiple
    // helper functions might be using parses. But shouldn't we trim old parses?
    // Perhaps a timed cache would work better.
    var parses = {};
    
    /**
     * Given source code as a string, return a flat list of all of the AST elements
     * in the parsed source code.
     *
     * TODO: There's redundancy here, since the source code was previously parsed
     * to run the file and to execute it. We should probably be able to do this just
     * once and shave off time.
     *
     * @param {String} source - Python source code.
     * @returns {Array.<Object>}
     */
    function getParseList(source) {
        if (!(source in parses)) {
            var parse = Sk.parse("__main__", source);
            parses[source] = Sk.astFromParse(parse.cst, "__main__", parse.flags);
        }
        var ast = parses[source];
        return (new NodeVisitor()).recursive_walk(ast);
    }
    
    /**
     * Given source code as a string, return a list of all of the AST elements
     * that are Num (aka numeric literals) but that are not inside List elements.
     *
     * @param {String} source - Python source code.
     * @returns {Array.number} The list of JavaScript numeric literals that were found.
     */
    function getNonListNums(source) {
        if (!(source in parses)) {
            var parse = Sk.parse("__main__", source);
            parses[source] = Sk.astFromParse(parse.cst, "__main__", parse.flags);
        }
        var ast = parses[source];
        var visitor = new NodeVisitor();
        var insideList = false;
        var nums = [];
        visitor.visit_List = function(node) {
            insideList = true;
            this.generic_visit(node);
            insideList = false;
        }
        visitor.visit_Num = function(node) {
            if (!insideList) {
                nums.push(node.n);
            }
            this.generic_visit(node);
        }
        visitor.visit(ast);
        return nums;
    }
    
    /**
     * Given source code as a string, return a list of all of the AST elements
     * that are being printed (using the print function) but are not variables.
     *
     * @param {String} source - Python source code.
     * @returns {Array.<Object>} The list of AST elements that were found.
     */
    function getPrintedNonProperties(source) {
        if (!(source in parses)) {
            var parse = Sk.parse("__main__", source);
            parses[source] = Sk.astFromParse(parse.cst, "__main__", parse.flags);
        }
        var ast = parses[source];
        var visitor = new NodeVisitor();
        var nonVariables = [];
        visitor.visit_Call = function(node) {
            var func = node.func;
            var args = node.args;
            if (func._astname == 'Name' && func.id.v == 'print') {
                for (var i =0; i < args.length; i+= 1) {
                    if (args[i]._astname != "Name") {
                        nonVariables.push(args[i]);
                    }
                }
            }
            this.generic_visit(node);
        }
        visitor.visit(ast);
        return nonVariables;
    }
    
    /**
     * Skulpt function to iterate through the final state of
     * all the variables in the program, and check to see if they have
     * a given value.
     */
    mod.get_value_by_name = new Sk.builtin.func(function(name) {
        Sk.builtin.pyCheckArgs("get_value_by_name", arguments, 1, 1);
        Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(name));
        name = name.v;
        var final_values = Sk.builtins._final_values;
        if (name in final_values) {
            return final_values[name];
        } else {
            return Sk.builtin.none.none$;
        }
    });
    mod.get_value_by_type = new Sk.builtin.func(function(type) {
        Sk.builtin.pyCheckArgs("get_value_by_type", arguments, 1, 1);
        
        var final_values = Sk.builtins._final_values;
        var result = [];
        for (var property in final_values) {
            if (final_values[property].tp$name == type.tp$name) {
                result.push(final_values[property]);
            }
        }
        return Sk.builtin.list(result);
    });
    
    mod.parse_json = new Sk.builtin.func(function(blob) {
        Sk.builtin.pyCheckArgs("parse_json", arguments, 1, 1);
        Sk.builtin.pyCheckType("blob", "string", Sk.builtin.checkString(blob));
        blob = blob.v;
        return Sk.ffi.remapToPy(JSON.parse(blob));
    });
    mod.get_property = new Sk.builtin.func(function(name) {
        Sk.builtin.pyCheckArgs("get_property", arguments, 1, 1);
        Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(name));
        name = name.v;
        var trace = Sk.builtins._trace;
        if (trace.length <= 0) {
            return Sk.builtin.none.none$;
        }
        var properties = trace[trace.length-1]["properties"];
        for (var i = 0, len = properties.length; i < len; i += 1) {
            if (properties[i]['name'] == name) {
                return Sk.ffi.remapToPy(properties[i])
            }
        }
        return Sk.builtin.none.none$;
    });
    
    mod.calls_function = new Sk.builtin.func(function(source, name) {
        Sk.builtin.pyCheckArgs("calls_function", arguments, 2, 2);
        Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));
        Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(name));
        
        source = source.v;
        name = name.v;
        
        var ast_list = getParseList(source);
        
        var count = 0;
        for (var i = 0, len = ast_list.length; i < len; i = i+1) {
            if (ast_list[i]._astname == 'Call') {
                if (ast_list[i].func._astname == 'Attribute') {
                    count += Sk.ffi.remapToJs(ast_list[i].func.attr) == name | 0;
                } else if (ast_list[i].func._astname == 'Name') {
                    count += Sk.ffi.remapToJs(ast_list[i].func.id) == name | 0;
                }   
            }
        }
        
        return Sk.ffi.remapToPy(count > 0);
    });
    
    mod.count_components = new Sk.builtin.func(function(source, component) {
        Sk.builtin.pyCheckArgs("count_components", arguments, 2, 2);
        Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));
        Sk.builtin.pyCheckType("component", "string", Sk.builtin.checkString(component));
        
        source = source.v;
        component = component.v;
        
        var ast_list = getParseList(source);
        
        var count = 0;
        for (var i = 0, len = ast_list.length; i < len; i = i+1) {
            if (ast_list[i]._astname == component) {
                count = count+1;
            }
        }
        
        return Sk.ffi.remapToPy(count);
    });
    
    mod.no_nonlist_nums = new Sk.builtin.func(function(source) {
        Sk.builtin.pyCheckArgs("no_nonlist_nums", arguments, 1, 1);
        Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));
        
        source = source.v;
        
        var num_list = getNonListNums(source);
        
        var count = 0;
        for (var i = 0, len = num_list.length; i < len; i = i+1) {
            if (num_list[i].v != 0 && num_list[i].v != 1) {
                return Sk.ffi.remapToPy(true);
            }
        }
        return Sk.ffi.remapToPy(false);
    });
    mod.only_printing_properties = new Sk.builtin.func(function(source) {
        Sk.builtin.pyCheckArgs("only_printing_properties", arguments, 1, 1);
        Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));
        
        source = source.v;
        
        var non_var_list = getPrintedNonProperties(source);
        return Sk.ffi.remapToPy(non_var_list.length == 0);
    });
    
    return mod;
}

PyEngine.prototype.setupEnvironment = function(student_code, traceTable, output, ast, final_values) {
    var model = this.main.model;
    this._backup_execution = Sk.afterSingleExecution;
    Sk.afterSingleExecution = undefined;
    Sk.builtins.get_output = new Sk.builtin.func(function() { 
        Sk.builtin.pyCheckArgs("get_output", arguments, 0, 0);
        return Sk.ffi.remapToPy(model.execution.output());
    });
    Sk.builtins.reset_output = new Sk.builtin.func(function() { 
        Sk.builtin.pyCheckArgs("reset_output", arguments, 0, 0);
        model.execution.output.removeAll();
    });
    Sk.builtins.log = new Sk.builtin.func(function(data) { 
        Sk.builtin.pyCheckArgs("log", arguments, 1, 1);
        console.log(data)
    });
    //Sk.builtins.trace = Sk.ffi.remapToPy(traceTable);
    Sk.builtins._trace = traceTable;
    Sk.builtins._final_values = final_values;
    Sk.builtins.code = Sk.ffi.remapToPy(student_code);
    Sk.builtins.set_success = this.instructor_module.set_success;
    Sk.builtins.set_feedback = this.instructor_module.set_feedback;
    Sk.builtins.set_finished = this.instructor_module.set_finished;
    Sk.builtins.count_components = this.instructor_module.count_components;
    Sk.builtins.no_nonlist_nums = this.instructor_module.no_nonlist_nums;
    Sk.builtins.only_printing_properties = this.instructor_module.only_printing_properties;
    Sk.builtins.calls_function = this.instructor_module.calls_function;
    Sk.builtins.get_property = this.instructor_module.get_property;
    Sk.builtins.get_value_by_name = this.instructor_module.get_value_by_name;
    Sk.builtins.get_value_by_type = this.instructor_module.get_value_by_type;
    Sk.builtins.parse_json = this.instructor_module.parse_json;
    Sk.skip_drawing = true;
    model.settings.mute_printer(true);
}

PyEngine.prototype.disposeEnvironment = function() {
    Sk.afterSingleExecution = this._backup_execution;
    Sk.builtins.get_output = undefined;
    Sk.builtins.reset_output = undefined;
    Sk.builtins.log = undefined;
    Sk.builtins._trace = undefined;
    Sk.builtins.trace = undefined;
    Sk.builtins.code = undefined;
    Sk.builtins.set_success = undefined;
    Sk.builtins.set_feedback = undefined;
    Sk.builtins.set_finished = undefined;
    Sk.builtins.count_components = undefined;
    Sk.builtins.calls_function = undefined;
    Sk.builtins.get_property = undefined;
    Sk.builtins.get_value_by_name = undefined;
    Sk.builtins.get_value_by_type = undefined;
    Sk.builtins.no_nonlist_nums = undefined;
    Sk.builtins.only_printing_properties = undefined;
    Sk.builtins.parse_json = undefined;
    Sk.skip_drawing = false;
    GLOBAL_VALUE = undefined;
    this.main.model.settings.mute_printer(false);
}

PyEngine.prototype.check = function(student_code, traceTable, output, ast, final_values) {
    var engine = this;
    var model = this.main.model;
    var on_run = model.programs['give_feedback']();
    if (on_run !== undefined && on_run.trim() !== "") {
        on_run = 'def run_code():\n'+indent(student_code)+'\n'+on_run;
        this.setupEnvironment(student_code, traceTable, output, ast, final_values);
        
        var executionPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, on_run, true);
        });
        executionPromise.then(
            function (module) {
                engine.main.components.feedback.noErrors();
                engine.disposeEnvironment();
            }, function (error) {
                engine.disposeEnvironment();
                console.log(error.tp$name, error.tp$name == "Success");
                if (error.tp$name == "Success") {
                    server.markSuccess(1.0);
                    engine.main.components.feedback.complete();
                } else if (error.tp$name == "Feedback") {
                    server.markSuccess(0.0);
                    engine.main.components.feedback.instructorFeedback("Incorrect Answer", error.args.v[0].v);
                } else if (error.tp$name == "Finished") {
                    server.markSuccess(1.0);
                    engine.main.components.feedback.finished();
                } else {
                    console.error(error);
                    engine.main.components.feedback.internalError(error, "Feedback Error", "Error in instructor's feedback. Please show the above message to an instructor!");
                    server.logEvent('blockly_instructor_error', ''+error);
                }
            });
    }
}

PyEngine.prototype.parseGlobals = function(variables) {
    var result = Array();
    var modules = Array();
    for (var property in variables) {
        var value = variables[property];
        if (property !== "__name__" && property !== "__doc__") {
            property = property.replace('_$rw$', '')
                               .replace('_$rn$', '');
            var parsed = this.parseValue(property, value);
            if (parsed !== null) {
                result.push(parsed);
            } else if (value.constructor == Sk.builtin.module) {
                modules.push(value.$d.__name__.v);
            }
        }
    }
    return {"properties": result, "modules": modules};
}

PyEngine.prototype.parseValue = function(property, value) {
    if (value == undefined) {
        return {'name': property,
                'type': 'Unknown',
                "value": 'Undefined'
                };
    }
    switch (value.constructor) {
        case Sk.builtin.func:
            return {'name': property,
                    'type': "Function",
                    "value":  
                        (value.func_code.co_varnames !== undefined ?
                         " Arguments: "+value.func_code.co_varnames.join(", ") :
                         ' No arguments')
                    };
        case Sk.builtin.module: return null;
        case Sk.builtin.str:
            return {'name': property,
                'type': "String",
                "value": value.$r().v
            };
        case Sk.builtin.none:
            return {'name': property,
                'type': "None",
                "value": "None"
            };
        case Sk.builtin.bool:
            return {'name': property,
                'type': "Boolean",
                "value": value.$r().v
            };
        case Sk.builtin.nmber:
            return {'name': property,
                'type': "int" == value.skType ? "Integer": "Float",
                "value": value.$r().v
            };
        case Sk.builtin.int_:
            return {'name': property,
                'type': "Integer",
                "value": value.$r().v
            };
        case Sk.builtin.float_:
            return {'name': property,
                'type': "Float",
                "value": value.$r().v
            };
        case Sk.builtin.tuple:
            return {'name': property,
                'type': "Tuple",
                "value": value.$r().v
            };
        case Sk.builtin.list:
            if (value.v.length <= 20) {
                return {'name': property,
                    'type': "List",
                    "value": value.$r().v,
                    'exact_value': value
                };
            } else {
                return {'name': property,
                    'type': "List",
                    "value": "[... "+value.v.length+" elements ...]",
                    "exact_value": value
                };
            }
        case Sk.builtin.dict:
            return {'name': property,
                'type': "Dictionary",
                "value": value.$r().v
            };
        case Number:
            return {'name': property,
                'type': value % 1 === 0 ? "Integer" : "Float",
                "value": value
            };
        case String:
            return {'name': property,
                'type': "String",
                "value": value
            };
        case Boolean:
                return {'name': property,
                    'type': "Boolean",
                    "value": (value ? "True": "False")
                };
        default:
            return {'name': property,
                    'type': value.tp$name == undefined ? value : value.tp$name,
                    "value": value.$r == undefined ? value : value.$r().v
                    };
    }
}
