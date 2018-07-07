
function Py2blockEditor(py2block_conveter, ace_editor){
    this.convert = py2block_conveter;
    this.editor = ace_editor;
    this.silentText = false;
    this.silentBlock = false;
    this.lastCodeSnapshot = "";
    this.fromCode = false;
}

Py2blockEditor.prototype.setBlocks = function(python_code){
    var xml_code = "";
    if (python_code !== '' && python_code !== undefined && python_code.trim().charAt(0) !== '<') {
        var result = this.convert.convertSource(python_code);
        xml_code = result.xml;
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
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
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
        this.setBlocks(this.editor.getValue());
        var py2blockEditor = this;
        setTimeout(function(){
            py2blockEditor.silentBlock = false;
        }, 50);

    }
}


Py2blockEditor.prototype.updateMixpyBlock = function(){
    if(this.fromCode) {
        this.fromCode = false;
        this.setBlocks(this.editor.getValue());
    }
}
function rightCodeEvent1(masterEvent) {
    if (masterEvent.type == Blockly.Events.UI) {
        return;  // Don't update UI events.
    }
    //更新
    var arduinoTextarea = document.getElementById('side_code');
    var code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace) || '';
    var chinese_code = code.replace(/(_[0-9A-F]{2}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) { return decodeURIComponent(s.replace(/_/g, '%')); });
    py2block_editor.silentText = true;
    if(!py2block_editor.silentBlock) {
        editor_side_code.setValue(chinese_code, -1);
    }else{
        setTimeout(function() {
            py2block_editor.getFocus();
        }, 50);
    }
    py2block_editor.silentText = false;
    //py2block_editor.silentBlock = false;
}
