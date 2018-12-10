
function Py2blockEditor(py2block_conveter, ace_editor){
    this.convert = py2block_conveter;
    this.editor = ace_editor;
    this.silentText = false;
    this.silentBlock = false;
    this.lastCodeSnapshot = "";
    this.fromCode = false;
}

Py2blockEditor.prototype.isFuncStartLine = function(line){
    return /^ *?def *?.*?\(.*?\): *?$/.test(line);
}

Py2blockEditor.prototype.isEmptyNewLine = function(line){
    return /^ +?$/.test(line) || line == "";
}

Py2blockEditor.prototype.getIndentOfLine = function(line){
    for(var i = 0 ; i < line.length ; i ++){
        if(line[i] != " "){
            return i;
        }
    }
    return 0;
}

// 换行和tab的处理；
Py2blockEditor.prototype.formatLine = function (python_code) {
    python_code = python_code.replace("\r\n", "\n")
        .replace("\r", "\n")
        .replace("\t", "    ");
    return python_code;
}

// 格式化模块方法的调用形式. 如 Pin->machine.Pin
Py2blockEditor.prototype.formatModule = function (python_code) {
    var keylist = py2block_config.formatModuleKeyL;
    var modulelist = py2block_config.formatModuleL;
    for (var i = 0; i < keylist.length; i++) {
        for (var j = 0; j < keylist[i].length; j++) {
            var reg = new RegExp(modulelist[i] + "." + keylist[i][j], "g");
            python_code = python_code.replace(reg, keylist[i][j]);
            var reg = new RegExp("(" + "\\b"+keylist[i][j] + "\\(" + "|" +"\\b"+ keylist[i][j] + "\\." + ")", "g");
            python_code = python_code.replace(reg, function(match) {
                return modulelist[i] + "." + match;
            });
        }
    }
    return python_code;
}
    

//为函数定义前后增加空行
Py2blockEditor.prototype.addNewLines = function(python_code){
    var lines = python_code.split("\n");
    var isFirstLine = true;
    var isNewLine = false;
    var isFuncDefScope = false;
    var indent = 0;
    var new_python_code = "";
    var newLine = "";
    //遍历每行
    for(var i = 0 ; i < lines.length ; i ++){
        var line = lines[i];
        //函数定义的开始行（def XXX()）
        if(this.isFuncStartLine(line)){
            isFuncDefScope = true;
            indent = this.getIndentOfLine(line);
            if(!isFirstLine && !isNewLine){
                line = "\n" + line;
            }
        }else if(isFuncDefScope && this.getIndentOfLine(line) <= indent){//函数定义结束后的第一行
            if(!this.isEmptyNewLine(line)){
               line = "\n" + line;
            }else {
                isFuncDefScope = false;
            }
        }
        //是否是空行
        if(this.isEmptyNewLine(line)){
            isNewLine = true;
        }else{
            isNewLine = false;
        }
        new_python_code += line + "\n";
        isFirstLine = false;
    }
    return new_python_code;
}


Py2blockEditor.prototype.encodeChinese = function(code){
    return code.replace(/[\u4e00-\u9fa5]+/g, function (s) {
        return encodeURIComponent(s).replace(/%/g, "_");
    })
}


Py2blockEditor.prototype.decodeChinese = function(code){
    return code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
        return decodeURIComponent(s.replace(/_/g, '%'));
    });
}


Py2blockEditor.prototype.setBlocks = function(python_code){
    var xml_code = "";
    py2block_config.reset();
    python_code = this.formatLine(python_code);
    python_code = this.formatModule(python_code);
    python_code = this.addNewLines(python_code);
    if (python_code !== '' && python_code !== undefined && python_code.trim().charAt(0) !== '<') {
        var result = this.convert.convertSource(python_code);
        xml_code = this.decodeChinese(result.xml);
        if (result.error !== null) {
            console.log(result.error);
        } else {

        }
    }
    var error_code = this.convert.convertSourceToCodeBlock(python_code);
    var errorXml = Blockly.Xml.textToDom(error_code);
    if (python_code == '' || python_code == undefined || python_code.trim() == '') {
        Blockly.mainWorkspace.clear();
    } else if (xml_code !== '' && xml_code !== undefined) {
        var blocklyXml = Blockly.Xml.textToDom(xml_code);
        try {
            this.setBlocksFromXml(blocklyXml);
        } catch (e) {
            console.error(e);
            this.setBlocksFromXml(errorXml);
        }
    } else {
        this.setBlocksFromXml(errorXml);
    }
}

Py2blockEditor.prototype.setBlocksFromXml = function(xml){
    //Blockly.mainWorkspace.clear();
    //Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
    Blockly.Xml.domToWorkspaceDestructive(xml, Blockly.mainWorkspace);
}

Py2blockEditor.prototype.gotoEditorEnd = function(){
    var row = this.editor.session.getLength() - 1;
    for(var rowid = row; rowid >= 0; rowid --) {
        var column = this.editor.session.getLine(rowid).length; // or simply Infinity
        if(column !== 0) {
            this.editor.gotoLine(rowid + 1, column);
            this.editor.focus();
            break;
        }
    }
}

Py2blockEditor.prototype.getFocus = function(){
    this.editor.focus();
}

Py2blockEditor.prototype.updateText = function(){
    if(!this.silentText) {
        this.silentBlock = true;
        this.setBlocks(this.encodeChinese(this.editor.getValue()));
        var py2blockEditor = this;
        setTimeout(function(){
            py2blockEditor.silentBlock = false;
        }, 50);
    }
}


Py2blockEditor.prototype.updateBlock = function(){
    if(this.fromCode) {
        this.fromCode = false;
        var encodeCode = this.encodeChinese(this.editor.getValue());
        this.setBlocks(encodeCode);
    }
}


Blockly.Xml.domToWorkspaceDestructive = function(xml, workspace, errorXml) {
    if (xml instanceof Blockly.Workspace) {
        var swap = xml;
        xml = workspace;
        workspace = swap;
        console.warn('Deprecated call to Blockly.Xml.domToWorkspace, ' +
            'swap the arguments.');
    }
    var width;  // Not used in LTR.
    if (workspace.RTL) {
        width = workspace.getWidth();
    }
    Blockly.Field.startCache();
    // Safari 7.1.3 is known to provide node lists with extra references to
    // children beyond the lists' length.  Trust the length, do not use the
    // looping pattern of checking the index for an object.
    var childCount = xml.childNodes.length;
    var existingGroup = Blockly.Events.getGroup();
    if (!existingGroup) {
        Blockly.Events.setGroup(true);
    }
    Blockly.Events.disable();
    var blockLHeight = [];
    while (workspace.topBlocks_.length) {
        workspace.topBlocks_[0].dispose();
        //blockLHeight.push(workspace.topBlocks_[0].getHeightWidth()['height']);
    }
    workspace.variableList.length = 0;
    Blockly.Events.enable();

    // Disable workspace resizes as an optimization.
    if (workspace.setResizesEnabled) {
        workspace.setResizesEnabled(false);
    }
    var currY = 10;
    for (var i = 0; i < childCount; i++) {
        var xmlChild = xml.childNodes[i];
        var name = xmlChild.nodeName.toLowerCase();
        if (name == 'block' ||
            (name == 'shadow' && !Blockly.Events.recordUndo)) {
            // Allow top-level shadow blocks if recordUndo is disabled since
            // that means an undo is in progress.  Such a block is expected
            // to be moved to a nested destination in the next operation.
            var block = Blockly.Xml.domToBlock(xmlChild, workspace);
            var blockX = 0;
            var blockY = currY;
            currY = blockY + workspace.topBlocks_[i].getHeightWidth()['height'] + 50;
            if (!isNaN(blockX) && !isNaN(blockY)) {
                block.moveBy(workspace.RTL ? width - blockX : blockX, blockY);
            }
        } else if (name == 'shadow') {
            goog.asserts.fail('Shadow block cannot be a top-level block.');
        }
    }
    if (!existingGroup) {
        Blockly.Events.setGroup(false);
    }
    Blockly.Field.stopCache();

    workspace.updateVariableList(false);
    // Re-enable workspace resizing.
    if (workspace.setResizesEnabled) {
        workspace.setResizesEnabled(true);
    }
}
