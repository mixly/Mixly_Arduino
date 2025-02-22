
/**
 * An object for converting Python source code to the
 * Blockly XML representation.
 *
 * @constructor
 * @this {PythonToBlocks}
 */

function PythonToBlocks() {
}

function xmlToString(xml) {
    return new XMLSerializer().serializeToString(xml);
}

function hasReturn(block){
    var q = [block];
    while(q.length != 0) {
        var curr_block = q.shift();
        for (var attr in curr_block) {
            try {
                var astname = curr_block[attr]._astname;
                if (astname == "Return") {
                    return true;
                } else if (astname != null || curr_block[attr] instanceof Array) {
                    q.push(curr_block[attr]);
                }
            }catch(e){

            }
        }
    }
    return false;
}

PythonToBlocks.prototype.funcname_to_type = {};
PythonToBlocks.prototype.funcname_to_type_class = {};
PythonToBlocks.prototype.convertSourceToCodeBlock = function(python_source) {
    var xml = document.createElement("xml");
    xml.appendChild(raw_block(python_source));
    return xmlToString(xml);
}

/**
 * The main function for converting a string representation of Python
 * code to the Blockly XML representation.
 *
 * @param {string} python_source - The string representation of Python
 *      code (e.g., "a = 0").
 * @returns {Object} An object which will either have the converted
 *      source code or an error message and the code as a code-block.
 */
PythonToBlocks.prototype.convertSource = function(python_source) {
    var xml = document.createElement("xml");
    if (python_source.trim() === "") {
        return {"xml": xmlToString(xml), "error": null};
    }
    else{        
        python_source=python_source.replace(/f'/g,"'")
        python_source=python_source.replace(/f"/g,'"')
    }
    this.source = python_source.split("\n");
    var filename = 'user_code.py';
    // Attempt parsing - might fail!
    var parse, ast, symbol_table, error;
    try {
        parse = Sk.parse(filename, python_source);
        ast = Sk.astFromParse(parse.cst, filename, parse.flags);
        //symbol_table = Sk.symboltable(ast, filename, python_source, filename, parse.flags);
    } catch (e) {
        error = e;
        xml.appendChild(raw_block(python_source))
        return {"xml": xmlToString(xml), "error": error};
    }
    this.comments = {};
    for (var commentLocation in parse.comments) {
        var lineColumn = commentLocation.split(",");
        var yLocation = parseInt(lineColumn[0], 10);
        this.comments[yLocation] = parse.comments[commentLocation];
    }
    this.highestLineSeen = 0;
    this.levelIndex = 0;
    this.nextExpectedLine = 0;
    this.measureNode(ast);
    var converted = this.convert(ast);
    if (converted !== null) {
        for (var block = 0; block < converted.length; block+= 1) {
            xml.appendChild(converted[block]);
        }
    }
    return {"xml": xmlToString(xml), "error": null, "lineMap": this.lineMap, 'comment': this.comments};
}

PythonToBlocks.prototype.identifier = function(node) {
    return Sk.ffi.remapToJs(node);
}

PythonToBlocks.prototype.recursiveMeasure = function(node, nextBlockLine) {
    if (node === undefined)  {
        return;
    }
    var myNext = nextBlockLine;
    if ("orelse" in node && node.orelse.length > 0) {
        if (node.orelse.length == 1 && node.orelse[0]._astname == "If") {
            myNext = node.orelse[0].lineno-1;
        } else {
            myNext = node.orelse[0].lineno-1-1;
        }
    }
    this.heights.push(nextBlockLine);
    if ("body" in node) {
        for (var i = 0; i < node.body.length; i++) {
            var next;
            if (i+1 == node.body.length) {
                next = myNext;
            } else {
                next = node.body[i+1].lineno-1;
            }
            this.recursiveMeasure(node.body[i], next);
        }
    }
    if ("orelse" in node) {
        for (var i = 0; i < node.orelse.length; i++) {
            var next;
            if (i == node.orelse.length) {
                next = nextBlockLine;
            } else {
                next = 1+(node.orelse[i].lineno-1);
            }
            this.recursiveMeasure(node.orelse[i], next);
        }
    }
}

PythonToBlocks.prototype.measureNode = function(node) {
    this.heights = [];
    this.recursiveMeasure(node, this.source.length-1);
    this.heights.shift();
}

PythonToBlocks.prototype.getSourceCode = function(frm, to) {
    var lines = this.source.slice(frm-1, to);
    // Strip out any starting indentation.
    if (lines.length > 0) {
        var indentation = lines[0].search(/\S/);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].substring(indentation);
        }
    }
    return lines.join("\n");
}


PythonToBlocks.prototype.convertBody = function(node, is_top_level) {
    this.levelIndex += 1;
    // Empty body, return nothing
    if (node.length == 0) {
        return null;
    }

    // Final result list
    var children = [], // The complete set of peers
        root = null, // The top of the current peer
        current = null,
        levelIndex = this.levelIndex; // The bottom of the current peer

    function addPeer(peer) {
        if (root == null) {
            children.push(peer);
        } else {
            children.push(root);
        }
        root = peer;
        current = peer;
    }

    function finalizePeers() {
        if (root != null) {
            children.push(root);
        }
    }

    function nestChild(child) {
        if (root == null) {
            root = child;
            current = child;
        } else if (current == null) {
            root = current;
        } else {
            var nextElement = document.createElement("next");
            nextElement.appendChild(child);
            current.appendChild(nextElement);
            current = child;
        }
    }

    var lineNumberInBody = 0,
        lineNumberInProgram,
        previousLineInProgram=null,
        distance,
        skipped_line,
        commentCount,
        previousHeight = null,
        visitedFirstLine = false;

    // Iterate through each node
    for (var i = 0; i < node.length; i++) {
        lineNumberInBody += 1;

        lineNumberInProgram = node[i].lineno;
        distance = 0, wasFirstLine = true;
        if (previousLineInProgram != null) {
            distance = lineNumberInProgram - previousLineInProgram-1;
            wasFirstLine = false;
        }
        lineNumberInBody += distance;

        // Handle earlier comments
        commentCount = 0;
        for (var commentLineInProgram in this.comments) {
            if (commentLineInProgram < lineNumberInProgram) {
                commentChild = this.Comment(this.comments[commentLineInProgram], commentLineInProgram);
                if (previousLineInProgram == null) {
                    nestChild(commentChild);
                } else {
                    skipped_previous_line = Math.abs(previousLineInProgram-commentLineInProgram) > 1;
                    if (is_top_level && skipped_previous_line) {
                        addPeer(commentChild);
                    } else {
                        nestChild(commentChild);
                    }
                }
                previousLineInProgram = commentLineInProgram;
                this.highestLineSeen = Math.max(this.highestLineSeen, parseInt(commentLineInProgram, 10));
                distance = lineNumberInProgram - previousLineInProgram;
                delete this.comments[commentLineInProgram];
                commentCount += 1;
            }
        }

        distance = lineNumberInProgram - this.highestLineSeen;
        this.highestLineSeen = Math.max(lineNumberInProgram, this.highestLineSeen);

        // Now convert the actual node
        var height = this.heights.shift();
        var originalSourceCode = this.getSourceCode(lineNumberInProgram, height);


        var newChild = this.convertStatement(node[i], originalSourceCode, is_top_level);

        // deal with '''XXX'''
        if (originalSourceCode.indexOf("'''") != -1 || originalSourceCode.indexOf('"""') != -1) {
            quotes = ["'''", '"""'];
            for (var i = 0; i < quotes.length; i ++) {
                var quote = quotes[i];
                var idxa = originalSourceCode.indexOf(quote);
                var idxb = originalSourceCode.indexOf(quote, idxa + 3);
                if (idxb != -1) {
                    var s = originalSourceCode.substring(idxa, idxb + 3);
                    this.highestLineSeen += s.split('\n').length - 1;
                }
            }
        }
        // Skip null blocks (e.g., imports)
        if (newChild == null) {
            continue;
        }

        skipped_line = distance > 1;
        previousLineInProgram = lineNumberInProgram;
        previousHeight = height;

        // Handle top-level expression blocks
        if (is_top_level && newChild.constructor == Array) {
            addPeer(newChild[0]);
            // Handle skipped line
        } else if (is_top_level && skipped_line && visitedFirstLine) {
            addPeer(newChild);
            // Otherwise, always embed it in there.
        } else {
            nestChild(newChild);
        }

        visitedFirstLine = true;
    }


    // Handle comments that are on the very last line
    var lastLineNumber = lineNumberInProgram+1
    if (lastLineNumber in this.comments) {
        commentChild = this.Comment(this.comments[lastLineNumber], lastLineNumber);
        nestChild(commentChild);
        delete this.comments[lastLineNumber];
    }

    // Handle any extra comments that stuck around
    if (is_top_level) {
        for (var commentLineInProgram in this.comments) {
            commentChild = this.Comment(this.comments[commentLineInProgram], commentLineInProgram);
            distance = commentLineInProgram - previousLineInProgram;
            if (previousLineInProgram == null) {
                addPeer(commentChild);
            } else if (distance > 1) {
                addPeer(commentChild);
            } else {
                nestChild(commentChild);
            }
            previousLineInProgram = commentLineInProgram;
            delete this.comments[lastLineNumber];
        }
    }


    finalizePeers();

    this.levelIndex -= 1;

    return children;
}





function block(type, lineNumber, fields, values, settings, mutations, statements) {
    var newBlock = document.createElement("block");
    // Settings
    newBlock.setAttribute("type", type);
    newBlock.setAttribute("line_number", lineNumber);
    for (var setting in settings) {
        var settingValue = settings[setting];
        newBlock.setAttribute(setting, settingValue);
    }
    // Mutations
    if (mutations !== undefined && Object.keys(mutations).length > 0) {
        var newMutation = document.createElement("mutation");
        for (var mutation in mutations) {
            var mutationValue = mutations[mutation];
            if (mutation.charAt(0) == '@') {
                newMutation.setAttribute(mutation.substr(1), mutationValue);
            } else if (mutationValue.constructor === Array) {
                for (var i = 0; i < mutationValue.length; i++) {
                    var mutationNode = document.createElement(mutation);
                    mutationNode.setAttribute("name", mutationValue[i]);
                    newMutation.appendChild(mutationNode);
                }
            } else {
                var mutationNode = document.createElement("arg");
                mutationNode.setAttribute("name", mutation);
                mutationNode.appendChild(mutationValue);
                newMutation.appendChild(mutationNode);
            }
        }
        newBlock.appendChild(newMutation);
    }
    // Fields
    for (var field in fields) {
        var fieldValue = fields[field];
        var newField = document.createElement("field");
        newField.setAttribute("name", field);
        newField.appendChild(document.createTextNode(fieldValue));
        newBlock.appendChild(newField);
    }
    // Values
    for (var value in values) {
        var valueValue = values[value];
        var newValue = document.createElement("value");
        if (valueValue !== null) {
            newValue.setAttribute("name", value);
            newValue.appendChild(valueValue);
            newBlock.appendChild(newValue);
        }
    }
    // Statements
    if (statements !== undefined && Object.keys(statements).length > 0) {
        for (var statement in statements) {
            var statementValue = statements[statement];
            if (statementValue == null) {
                continue;
            } else {
                for (var i = 0; i < statementValue.length; i += 1) {
                    // In most cases, you really shouldn't ever have more than
                    //  one statement in this list. I'm not sure Blockly likes
                    //  that.
                    var newStatement = document.createElement("statement");
                    newStatement.setAttribute("name", statement);
                    newStatement.appendChild(statementValue[i]);
                    newBlock.appendChild(newStatement);
                }
            }
        }
    }
    return newBlock;
}

raw_block = function(txt) {
    return block("raw_block", 0, { "TEXT": txt });
}

raw_expression = function(txt, lineno) {
    return block("raw_expression", lineno, {"TEXT": txt});
}

PythonToBlocks.prototype.convert = function(node, is_top_level) {
    return this[node._astname](node, is_top_level);
}

function arrayMax(array) {
    return array.reduce(function(a, b) {
        return Math.max(a, b);
    });
}

function arrayMin(array) {
    return array.reduce(function(a, b) {
        return Math.min(a, b);
    });
}

PythonToBlocks.prototype.convertStatement = function(node, full_source, is_top_level) {
    try {
        return this.convert(node, is_top_level);
    } catch (e) {
        heights = this.getChunkHeights(node);
        extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
        console.error(e);
        return raw_block(extractedSource);
    }
}

PythonToBlocks.prototype.getChunkHeights = function(node) {
    var lineNumbers = [];
    if (node.hasOwnProperty("lineno")) {
        lineNumbers.push(node.lineno);
    }
    if (node.hasOwnProperty("body")) {
        for (var i = 0; i < node.body.length; i += 1) {
            var subnode = node.body[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    if (node.hasOwnProperty("orelse")) {
        for (var i = 0; i < node.orelse.length; i += 1) {
            var subnode = node.orelse[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    return lineNumbers;
}

/* ----- Nodes ---- */
/*
 * NO LINE OR COLUMN NUMBERS
 * Module
 * body: asdl_seq
 */
PythonToBlocks.prototype.Module = function(node)
{
    return this.convertBody(node.body, true);
}

PythonToBlocks.prototype.Comment = function(txt, lineno) {
    return block("comment_single", lineno, {
        "BODY": txt.slice(1)
    }, {}, {}, {}, {})
}

/*
 * NO LINE OR COLUMN NUMBERS
 * Interactive
 * body: asdl_seq
 */
PythonToBlocks.prototype.Interactive = function(body)
{
    return this.convertBody(node.body);
}

/*
 * NO LINE OR COLUMN NUMBERS
 * TODO
 * body: expr_ty
 */
PythonToBlocks.prototype.Expression = function(body)
{
    this.body = body;
}

/*
 * NO LINE OR COLUMN NUMBERS
 *
 * body: asdl_seq
 */
PythonToBlocks.prototype.Suite = function(body)
{
    this.asdl_seq(node.body);
}

/*
 *
 * name: identifier
 * args: arguments__ty
 * body: asdl_seq
 * decorator_list: asdl_seq
 */
PythonToBlocks.prototype.FunctionDef = function(node)
{
    var name = node.name;
    var args = node.args;
    var body = node.body;
    var decorator_list = node.decorator_list;
    if (decorator_list.length > 0) {
        throw new Error("Decorators are not implemented.");
    }
    if(py2block_config.ignoreS.has(name.v)) {
        return null;
    }
    var body_length = body.length;
    var return_block = {};
    if (node.col_offset == 0)
    {
        var blockid = hasReturn(body) ? "procedures_defreturn" : "procedures_defnoreturn";
        if(body_length > 0){
            var last = body_length - 1;
            if(body[last]._astname == "Return") {
                return_block = {"RETURN": this.convert(body[last].value)};
                body = body.slice(0, last);
            }
        }
        this.funcname_to_type[this.identifier(name)] = blockid;
        return block(blockid, node.lineno, {
            "NAME": this.identifier(name)
        }, return_block, {
            "inline": "false"
        }, {
            "arg": this.arguments_(args)
        }, {
            "STACK": this.convertBody(body)
        });
    }
    else
    {
        var blockid = hasReturn(body) ? "method_procedures_defreturn" : "method_procedures_defnoreturn";
        if(body_length > 0){
            var last = body_length - 1;
            if(body[last]._astname == "Return") {
                return_block = {"RETURN": this.convert(body[last].value)};
                body = body.slice(0, last);
            }
        }
        this.funcname_to_type_class[this.identifier(name)] = blockid;
        return block(blockid, node.lineno, {
            "NAME": this.identifier(name)
        }, return_block, {
            "inline": "false"
        }, {
            "arg": this.arguments_(args)
        }, {
            "STACK": this.convertBody(body)
        });
    }
}

/*
 * name: identifier
 * args: arguments__ty
 * bases: asdl_seq
 * body: asdl_seq
 * decorator_list: asdl_seq
 */
PythonToBlocks.prototype.ClassDef = function(node)
{
    var name = node.name;
    var bases = node.bases;
    var body = node.body;
    var decorator_list = node.decorator_list;
    if (decorator_list.length > 0) {
        throw new Error("Decorators are not implemented.");
    }
    if(py2block_config.ignoreS.has(name.v))
        return null;
    if(bases.length)
    {
        if(bases.length == 1)
        {
            py2block_config.pinType = "class_get";
            var mode = this.convert(node.bases["0"]);   
            py2block_config.pinType=null;
            return block("class_make_with_base", node.lineno, {
                "VAR": this.identifier(name)
            }, {
                "NAME": mode
            }, {
                "inline": "false"
            }, {}, {
                "data": this.convertBody(body)
            });
        }
    }
    else
    {
        return block("class_make", node.lineno, {
            "VAR": this.identifier(name)
        }, {
        }, {
            "inline": "false"
        }, {}, {
            "data": this.convertBody(body)
        });
    }
}

/*
 * value: expr_ty
 *
 */
PythonToBlocks.prototype.Return = function(node)
{
    var value = node.value;
    // No field, one title, one setting
    return block("procedures_return", node.lineno, {}, {
        "VALUE": this.convert(value)
    }, {
        "inline": "false"
    });
}

/*
 * targets: asdl_seq
 *
 */
PythonToBlocks.prototype.Delete = function(/* {asdl_seq *} */ targets)
{
    this.targets = targets;
    if(targets.targets.length != 1){
        throw new Error("not implement del");
    }
    if(targets.targets[0]._astname == "Subscript"){ //del mydict['key']
        var valueAstname = targets.targets[0].slice.value._astname;
        if(valueAstname == "Str" || valueAstname == "Name") {
            return block("dicts_delete", targets.lineno, {}, {
                "KEY":this.convert(targets.targets[0].slice.value),
                "DICT": this.convert(targets.targets[0].value)
            }, {
                "inline": "true"
            });
        }else{
            return block("lists_remove_at2", targets.lineno, {
                "OP":'del'
            }, {
                "LIST": this.convert(targets.targets[0].value),
                "DATA": this.convert(targets.targets[0].slice.value),
            }, {
                "inline": "true"
            });
        }

    }else {
        return block("lists_del_general", targets.lineno, {}, {
            "TUP": this.convert(targets.targets[0])
        }, {
            "inline": "true"
        });
    }
}

/*
 * targets: asdl_seq
 * value: expr_ty
 */
PythonToBlocks.prototype.Assign = function(node)
{
    var targets = node.targets;
    var value = node.value;
    if (targets.length == 0) {
        throw new Error("Nothing to assign to!");
    } else if (targets.length == 1) {
        if(targets[0]._astname == "Name") {
            if (py2block_config.ignoreS.has(this.Name_str(targets[0]))) {
                return null;
            }
            try{
                if (value._astname === "Call") {
                    if (value.func._astname == "Name") {
                        py2block_config.objectTypeD[this.Name_str(targets[0])] = value.func.id.v;
                    } else {
                        var line = this.getSourceCode().split('\n')[value.func.lineno - 1];
                        py2block_config.objectTypeD[this.Name_str(targets[0])] = line.substring(value.func.col_offset).split('(')[0].trim();
                    }
                } else {
                    var astname = value._astname;
                    if (value._astname === 'Name' && this.Name_str(value) in py2block_config.objectTypeD) {
                        astname = py2block_config.objectTypeD[this.Name_str(value)];
                    }
                    py2block_config.objectTypeD[this.Name_str(targets[0])] = astname;
                }
            }catch(e){
            }
            for (var key in py2block_config.assignD['dict']) {
                try {
                    var checkfunc = py2block_config.assignD['dict'][key]['check_assign'];
                    var blockfunc = py2block_config.assignD['dict'][key]['create_block'];
                    if (checkfunc(this, node, targets, value))
                        return blockfunc(this, node, targets, value);
                } catch (e) {
                }
            }
        }else if(targets[0]._astname == "Subscript"){
            var valueAstname = targets[0].slice.value._astname;
            if(valueAstname == "Str") {
                return block("dicts_add_or_change", targets.lineno, {}, {
                    "KEY": this.convert(targets[0].slice.value),
                    "DICT": this.convert(targets[0].value),
                    "VAR": this.convert(value)
                }, {
                    "inline": "true"
                });
            }else{
                return block("lists_set_index", targets.lineno, {}, {
                    "LIST": this.convert(targets[0].value),
                    "AT": this.convert(targets[0].slice.value),
                    "TO": this.convert(value)
                }, {
                    "inline": "true"
                });
            }
        }else if(targets[0]._astname == "Tuple"){
            var varNameArr = [];
            for(var i = 0 ; i < targets[0].elts.length; i ++){
                varNameArr.push(this.Name_str(targets[0].elts[i]));
            }
            var varNameStr = varNameArr.join(',');
            return block("variables_set", targets.lineno, {
                "VAR":varNameStr
            },{
                "VALUE":this.convert(value)
            });
        }
        else if(targets[0]._astname == "Attribute"){
            if(py2block_config.board == py2block_config.ESP32){
                if(targets[0].value.id.v.indexOf("pin") != -1 && targets[0].attr.v == 'value' && Blockly.Blocks['inout_digital_write']){
                    py2block_config.pinType = "pins_digital";
                    var mode = this.convert(node.targets["0"].value);  
                    var data = this.convert(node.value);
                    py2block_config.pinType=null;
                    return block("inout_digital_write", targets.lineno, {},{
                        "PIN": mode,
                        "STAT": data
                    });
                }
                else if(targets[0].value.id.v.indexOf("dac") != -1 && targets[0].attr.v == 'value' && Blockly.Blocks['inout_analog_write']){
                    py2block_config.pinType = "pins_dac";
                    var mode = this.convert(node.targets["0"].value);  
                    py2block_config.pinType=null;
                    var data = this.convert(node.value);
                    return block("inout_analog_write", targets.lineno, {},{
                        "PIN": mode,
                        "NUM": data
                    });
                }
                else if(targets[0].attr.v == 'duty_cycle' && Blockly.Blocks['inout_pwm_analog_write']){
                    py2block_config.pinType = "pins_pwm";
                    var mode = this.convert(node.targets["0"].value);  
                    py2block_config.pinType=null;
                    var data = this.convert(node.value);
                    return block("inout_pwm_analog_write", targets.lineno, {},{
                        "PIN": mode,
                        "NUM": data
                    });
                }
                else if(targets[0].attr.v == 'frequency' && Blockly.Blocks['inout_pwm_analog_write_set_freq']){
                    py2block_config.pinType = "pins_pwm";
                    var mode = this.convert(node.targets["0"].value);  
                    py2block_config.pinType=null;
                    var data = this.convert(node.value);
                    return block("inout_pwm_analog_write_set_freq", targets.lineno, {},{
                        "PIN": mode,
                        "NUM": data
                    });
                }
            }
            else if(Blockly.Blocks['property_set']){
                py2block_config.pinType = "object_get";
                var mode = this.convert(node.targets["0"].value);   
                py2block_config.pinType=null;
                return block("property_set", targets.lineno, {
                    "VAR": node.targets["0"].attr.v
                },{
                    "VALUE": mode,
                    "DATA": this.convert(node.value),
                });
            }
        }
        return block("variables_set", node.lineno, {
            "VAR": this.Name_str(targets[0]) //targets
        }, {
            "VALUE": this.convert(value)
        });
    } else {
        //TODO
        throw new Error("Multiple Assigment Targets Not implemented");
    }
}

/*
 * target: expr_ty
 * op: operator_ty
 * value: expr_ty
 */
PythonToBlocks.prototype.AugAssign = function(node)
{
    var target = node.target;
    var op = node.op;
    var value = node.value;
    return block("math_selfcalcu", node.lineno, {
            "OP": this.binaryOperator(op)
        }, {
            "A": this.convert(target),
            "B": this.convert(value)
        });
    
}

/*
 * dest: expr_ty
 * values: asdl_seq
 * nl: bool
 *
 */
PythonToBlocks.prototype.Print = function(node)
{
    var dest = node.dest;
    var values = node.values;
    var nl = node.nl;

    if (values.length == 1) {
        return block("text_print", node.lineno, {}, {
            "TEXT": this.convert(values[0])
        });
    } else {
        return block("text_print_multiple", node.lineno, {},
            this.convertElements("PRINT", values),
            {
                "inline": "true"
            }, {
                "@items": values.length
            });
    }
}

/*
 * target: expr_ty
 * iter: expr_ty
 * body: asdl_seq
 * orelse: asdl_seq
 *
 */
PythonToBlocks.prototype.For = function(node) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var orelse = node.orelse;

    for(var key in py2block_config.forStatementD['dict']){
        try {
            var checkfunc = py2block_config.forStatementD['dict'][key]['check_condition'];
            var blockfunc = py2block_config.forStatementD['dict'][key]['create_block'];
            if (checkfunc(this, node, target, iter, body, orelse)) {
                return blockfunc(this, node, target, iter, body, orelse);
            }
        }catch (e){
        }
    }
    if (orelse.length > 0) {
        // TODO
        throw new Error("Or-else block of For is not implemented.");
    }

    return block("controls_forEach", node.lineno, {
        
    }, {
        "LIST": this.convert(iter),
        'VAR':this.convert(target)
    }, {
        "inline": "true"
    }, {}, {
        "DO": this.convertBody(body)
    });
}

/*
 * test: expr_ty
 * body: asdl_seq
 * orelse: asdl_seq
 */
PythonToBlocks.prototype.While = function(node, is_top_level) {
    var test = node.test;
    var body = node.body;
    var orelse = node.orelse;
    for(var key in py2block_config.whileStatementD['dict']){
        try {
            var checkfunc = py2block_config.whileStatementD['dict'][key]['check_condition'];
            var blockfunc = py2block_config.whileStatementD['dict'][key]['create_block'];
            if (checkfunc(this, node, test, body, orelse))
                return blockfunc(this, node, test, body, orelse);
        }catch (e){
        }
    }
    if (orelse.length > 0) {
        // TODO
        throw new Error("Or-else block of While is not implemented.");
    }
    return block("controls_whileUntil", node.lineno, {}, {
        "BOOL": this.convert(test)
    }, {}, {}, {
        "DO": this.convertBody(body)
    });
}

/*
 * test: expr_ty
 * body: asdl_seq
 * orelse: asdl_seq
 *
 */
PythonToBlocks.prototype.If = function(node)
{
    var test = node.test;
    var body = node.body;
    var orelse = node.orelse;

    for(var key in py2block_config.ifStatementD['dict']){
        try {
            var checkfunc = py2block_config.ifStatementD['dict'][key]['check_condition'];
            var blockfunc = py2block_config.ifStatementD['dict'][key]['create_block'];
            if (checkfunc(this, node, test, body, orelse))
                return blockfunc(this, node, test, body, orelse);
        }catch (e){
        }
    }
    var IF_values = {"IF0": this.convert(test)};
    var DO_values = {"DO0": this.convertBody(body)};

    var elseifCount = 0;
    var elseCount = 0;
    var potentialElseBody = null;

    // Handle weird orelse stuff
    if (orelse !== undefined) {
        if (orelse.length == 1 && orelse[0]._astname == "If") {
            // This is an 'ELIF'
            while (orelse.length == 1  && orelse[0]._astname == "If") {
                this.heights.shift();
                elseifCount += 1;
                body = orelse[0].body;
                test = orelse[0].test;
                orelse = orelse[0].orelse;
                DO_values["DO"+elseifCount] = this.convertBody(body, false);
                if (test !== undefined) {
                    IF_values["IF"+elseifCount] = this.convert(test);
                }
            }
        }
        if (orelse !== undefined && orelse.length > 0) {
            // Or just the body of an Else statement
            elseCount += 1;
            DO_values["ELSE"] = this.convertBody(orelse);
        }
    }

    return block("controls_if", node.lineno, {
    }, IF_values, {
        "inline": "false"
    }, {
        "@elseif": elseifCount,
        "@else": elseCount
    }, DO_values);
}

/*
 * context_expr: expr_ty
 * optional_vars: expr_ty
 * body: asdl_seq
 */
PythonToBlocks.prototype.With = function(node)
{
    var context_expr = node.context_expr;
    var optional_vars = node.optional_vars;
    var body = node.body;
    throw new Error("With_ not implemented");
}

/*
 * type: expr_ty
 * inst: expr_ty
 * tback: expr_ty
 */
PythonToBlocks.prototype.Raise = function(node)
{
    var type = node.type;
    var inst = node.inst;
    var tback = node.tback;
    throw new Error("Raise not implemented");
}

/*
 * body: asdl_seq
 * handlers: asdl_seq
 * orelse: asdl_seq
 *
 */
PythonToBlocks.prototype.TryExcept = function(node)
{
    var body = node.body;
    var handlers = node.handlers;
    var orelse = node.orelse;

    var IF_values = {};
    var DO_values = {"try": this.convertBody(body)};

    var elseifCount = 0;
    var elseCount = 0;
    var potentialElseBody = null;

    // Handle weird orelse stuff
    for(var i = 0 ; i < handlers.length ; i ++){
        var h = handlers[i];
        var ifkey = "IF" + (i + 1);
        var dokey = "DO" + (i + 1);
        if(h.type != null) {
            if(h.name == null){
                IF_values[ifkey] = this.convert(h.type);
            }else{
                var heights = this.getChunkHeights(h.type);
                var extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
                var text = extractedSource.substring(h.type.col_offset).replace(":", "");
                IF_values[ifkey] = block("factory_block_return", node.lineno, {
                    'VALUE':text
                }, {});
            }
        }else{
            IF_values[ifkey] = null;
        }
        DO_values[dokey] = this.convertBody(h.body);
        elseifCount ++;
    }

    return block("controls_try_finally", node.lineno, {
    }, IF_values, {
        "inline": "false"
    }, {
        "@elseif": elseifCount,
        "@else": elseCount
    }, DO_values);
}

/*
 * body: asdl_seq
 * finalbody: asdl_seq
 *
 */
PythonToBlocks.prototype.TryFinally = function(node)
{
    var body = node.body;
    var finalbody = node.finalbody;

    if(body.length != 1){
        throw new Error("TryExcept not implemented");
    }

    var handlers = body[0].handlers;
    var orelse = body[0].orelse;
    body = body[0].body;

    var IF_values = {};
    var DO_values = {
        "try": this.convertBody(body),
        "ELSE": this.convertBody(finalbody)
    };

    var elseifCount = 0;
    var elseCount = 1;
    var potentialElseBody = null;

    // Handle weird orelse stuff
    for(var i = 0 ; i < handlers.length ; i ++){
        var h = handlers[i];
        var ifkey = "IF" + (i + 1);
        var dokey = "DO" + (i + 1);
        if(h.type != null) {
            if(h.name == null){
                IF_values[ifkey] = this.convert(h.type);
            }else{
                var heights = this.getChunkHeights(h.type);
                var extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
                var text = extractedSource.substring(h.type.col_offset).replace(":", "");
                IF_values[ifkey] = block("factory_block_return", node.lineno, {
                    'VALUE':text
                }, {});
            }
        }else{
            IF_values[ifkey] = null;
        }
        DO_values[dokey] = this.convertBody(h.body);
        elseifCount ++;
    }

    return block("controls_try_finally", node.lineno, {
    }, IF_values, {
        "inline": "false"
    }, {
        "@elseif": elseifCount,
        "@else": elseCount
    }, DO_values);
}

/*
 * test: expr_ty
 * msg: expr_ty
 */
PythonToBlocks.prototype.Assert = function(node)
{
    var test = node.test;
    var msg = node.msg;
    throw new Error("Assert not implemented");
}

/*
 * names: asdl_seq
 *
 */
PythonToBlocks.prototype.Import = function(node)
{
    var names = node.names;
    // The import statement isn't used in blockly because it happens implicitly
    return null;
}

/*
 * module: identifier
 * names: asdl_seq
 * level: int
 *
 */
PythonToBlocks.prototype.ImportFrom = function(node)
{
    var module = node.module;
    var names = node.names;
    var level = node.level;
    // The import statement isn't used in blockly because it happens implicitly
    return null;
}

/*
 * body: expr_ty
 * globals: expr_ty
 * locals: expr_ty
 *
 */
PythonToBlocks.prototype.Exec = function(node) {
    var body = node.body;
    var globals = node.globals;
    var locals = node.locals;
    throw new Error("Exec not implemented");
}

/*
 * names: asdl_seq
 *
 */
PythonToBlocks.prototype.Global = function(node)
{
    var names = node.names;
    var param = {
        "id":names[0],
        "_astname":"Name"
    };
    return block("variables_global", node.lineno, {
        }, {
            'VAR': this.convert(param)
        }, {
            "inline": "false"
    });

}

/*
 * value: expr_ty
 *
 */
PythonToBlocks.prototype.Expr = function(node, is_top_level) {
    var value = node.value;

    var converted = this.convert(value);


    if (converted.constructor == Array) {
        return converted[0];
    }else {
        return block("raw_empty", node.lineno, {}, {
            "VALUE": converted
        });
    }
}

/*
 *
 *
 */
PythonToBlocks.prototype.Pass = function(node) {
    return block("controls_pass", node.lineno, {});
}

/*
 *
 *
 */
PythonToBlocks.prototype.Break = function(node) {
    return block("controls_flow_statements", node.lineno, {
        "FLOW": "BREAK"
    });
}

/*
 *
 *
 */
PythonToBlocks.prototype.Continue = function(node) {
    return block("controls_flow_statements", node.lineno, {
        "FLOW": "CONTINUE"
    });
}

/*
 * TODO: what does this do?
 *
 */
PythonToBlocks.prototype.Debugger = function() {
    return null;
}

PythonToBlocks.prototype.booleanOperator = function(op) {
    switch (op.prototype._astname) {
        case "And": return "AND";
        case "Or": return "OR";
        default: throw new Error("Operator not supported:"+op.prototype._astname);
    }
}

/*
 * op: boolop_ty
 * values: asdl_seq
 */
PythonToBlocks.prototype.BoolOp = function(node) {
    var op = node.op;
    var values = node.values;
    // TODO: is there ever a case where it's < 1 values?
    var result_block = this.convert(values[0]);
    for (var i = 1; i < values.length; i+= 1) {
        result_block = block("logic_operation", node.lineno, {
            "OP": this.booleanOperator(op)
        }, {
            "A": result_block,
            "B": this.convert(values[i])
        }, {
            "inline": "true"
        });
    }
    return result_block;
}

PythonToBlocks.prototype.binaryOperator = function(op) {
    switch (op.prototype._astname) {
        case "Add": return "ADD";
        case "Sub": return "MINUS";
        case "Div": return "DIVIDE";
        case "FloorDiv": return "ZHENGCHU";
        case "Mult": return "MULTIPLY";
        case "Pow": return "POWER";
        case "Mod": return "QUYU";
        case "BitAnd": return "&";
        case "BitOr": return "|";
        case "RShift": return ">>";
        case "LShift": return "<<";
        default: throw new Error("Operator not supported:"+op.prototype._astname);
    }
}

/*
 * left: expr_ty
 * op: operator_ty
 * right: expr_ty
 */
PythonToBlocks.prototype.BinOp = function(node)
{
    var left = node.left;
    var op = node.op;
    var right = node.right;

    var opName = this.binaryOperator(op);
    var blockName = "math_arithmetic";
    if(opName == "&" || opName == "|" || opName == ">>" || opName == "<<"){
        blockName = "math_bit";
    }
    if(opName == "ADD"){
        //形如str('XX') + str('XX') 或str('XX') + 'XX' 或'XX' + str('XX') 或'XX' + 'XX'
        if(((left._astname == "Call" && left.func._astname == "Name" && this.Name_str(left.func) == "str") ||(left._astname == "Str"))
            && ((right._astname == "Call" && right.func._astname == "Name" && this.Name_str(right.func) == "str") ||(right._astname == "Str"))){
            if(left._astname == "Call"){
                left = left.args[0];
            }
            if(right._astname == "Call"){
                right = right.args[0];
            }
            return block("text_join", node.lineno, {
            }, {
                "A": this.convert(left),
                "B": this.convert(right)
            }, {
                "inline": true
            });
        }
    }
    return block(blockName, node.lineno, {
        "OP": this.binaryOperator(op) // TODO
    }, {
        "A": this.convert(left),
        "B": this.convert(right)
    }, {
        "inline": true
    });
}

/*
 * op: unaryop_ty
 * operand: expr_ty
 */
PythonToBlocks.prototype.UnaryOp = function(node)
{
    var op = node.op;
    var operand = node.operand;
    if (op.prototype._astname == "Not") {
        return block("logic_negate", node.lineno, {}, {
            "BOOL": this.convert(operand)
        }, {
            "inline": "false"
        });
    } else if(op.prototype._astname == "USub"){
        return block("math_trig", node.lineno, {
            'OP': '-'
        }, {
            'NUM': this.convert(operand)
        }, {
            "inline": "true"
        });
    }else {
        throw new Error("Other unary operators are not implemented yet.");
    }
}

/*
 * args: arguments__ty
 * body: expr_ty
 */
PythonToBlocks.prototype.Lambda = function(node) {
    var args = node.args;
    var body = node.body;
    throw new Error("Lambda functions are not implemented yet.");
}

/*
 * test: expr_ty
 * body: expr_ty
 * orelse: expr_ty
 */
PythonToBlocks.prototype.IfExp = function(node)
{
    var test = node.test;
    var body = node.body;
    var orelse = node.orelse;
    return block("logic_true_or_false", node.lineno, {
    }, {
        'B': this.convert(body),
        'A': this.convert(test),
        'C': this.convert(orelse)
    }, {
        "inline": "true"
    });
}

/*
 * keys: asdl_seq
 * values: asdl_seq
 */
PythonToBlocks.prototype.Dict = function(node) {
    var keys = node.keys;
    var values = node.values;

    var keyList = [];
    var valueList = [];
    for (var i = 0; i < keys.length; i+= 1) {
        if (keys[i]._astname != "Str") {
            throw new Error("Dictionary Keys should be Strings.");
        }
        keyList["KEY"+i] = this.Str_value(keys[i]);
        valueList["VALUE"+i] = this.convert(values[i]);
    }

    return block("dicts_create_with", node.lineno, keyList, valueList, {
        "inline": "false"
    }, {
        "@items": keys.length
    });
}

/*
 * elts: asdl_seq
 *
 */
PythonToBlocks.prototype.Set = function(node)
{
    var elts = node.elts;
    throw new Error("Sets are not implemented");
}

/*
 * elt: expr_ty
 * generators: asdl_seq
 */
PythonToBlocks.prototype.ListComp = function(node)
{
    var elt = node.elt;
    var generators = node.generators;

    // TODO
}

/*
 * elt: expr_ty
 * generators: asdl_seq
 */
PythonToBlocks.prototype.SetComp = function(node)
{
    var elt = node.elt;
    var generators = node.generators;
    throw new Error("Set Comprehensions are not implemented");
}

/*
 * key: expr_ty
 * value: expr_ty
 * generators: asdl_seq
 */
PythonToBlocks.prototype.DictComp = function(node)
{
    var key = node.key;
    var value = node.value;
    var generators = node.generators;
    throw new Error("Dictionary Comprehensions are not implemented");
}

/*
 * elt: expr_ty
 * generators: asdl_seq
 */
PythonToBlocks.prototype.GeneratorExp = function(node) {
    var elt = node.elt;
    var generators = node.generators;
    throw new Error("Generator Expresions are not implemented");
}

/*
 * value: expr_ty
 *
 */
PythonToBlocks.prototype.Yield = function(node)
{
    var value = value;
    throw new Error("Yield expression is not implemented");
}


PythonToBlocks.prototype.compareOperator = function(op) {
    switch (op.prototype._astname) {
        case "Eq": return "EQ";
        case "NotEq": return "NEQ";
        case "Lt": return "LT";
        case "Gt": return "GT";
        case "LtE": return "LTE";
        case "GtE": return "GTE";
        case "In": return "in";
        case "NotIn": return "not in";
        case "Is": return "is";
        case "IsNot": return "is not";
        // Is, IsNot, In, NotIn
        default: throw new Error("Operator not supported:"+op.prototype._astname);
    }
}

/*
 * left: expr_ty
 * ops: asdl_int_seq
 * asdl_seq: comparators
 */
PythonToBlocks.prototype.Compare = function(node)
{
    var left = node.left;
    var ops = node.ops;
    var comparators = node.comparators;

    if (ops.length != 1) {
        if(ops.length == 2 && comparators.length == 2){
            
            return block("logic_compare_continous", node.lineno, {
            "OP1": this.compareOperator(ops[0]),
            "OP2": this.compareOperator(ops[1])
        }, {
            "A": this.convert(left),
            "B": this.convert(comparators[0]),
            "C": this.convert(comparators[1])
        }, {
            "inline": "true"
        });
        }
        else{
            throw new Error("Only one comparison operator is supported");
        } 
    } else if (ops[0].name == "In_" || ops[0].name == "NotIn") {
        if (ops[0].name == "In_"){
           var mode="in"
        }
        else if (ops[0].name == "NotIn"){
           var mode="not in"
        }
        return block("logic_is_in", node.lineno, {
            "BOOL":mode
        }, {
            "A": this.convert(left),
            "B": this.convert(comparators[0])
        }, {
            "inline": "true"
        });
    } else if (ops[0].name == "Is" || ops[0].name == "IsNot") {
        if (ops[0].name == "Is"){
           var mode="is"
        }
        else if (ops[0].name == "IsNot"){
           var mode="is not"
        }
        return block("logic_is", node.lineno, {
            "BOOL":mode
        }, {
            "A": this.convert(left),
            "B": this.convert(comparators[0])
        }, {
            "inline": "true"
        });
    } else {
        //处理文本模块的等于
        //形如str('XX') == str('XX') 或str('XX') == 'XX' 或'XX' == str('XX') 或'XX' == 'XX'
        var right = comparators[0];
        if(((left._astname == "Call" && left.func._astname == "Name" && this.Name_str(left.func) == "str") ||(left._astname == "Str"))
            && ((right._astname == "Call" && right.func._astname == "Name" && this.Name_str(right.func) == "str") ||(right._astname == "Str"))){
            if(left._astname == "Call"){
                left = left.args[0];
            }
            if(right._astname == "Call"){
                right = right.args[0];
            }
            return block("text_equals_starts_ends", node.lineno, {
                "DOWHAT":"==="
            }, {
                "STR1": this.convert(left),
                "STR2": this.convert(right)
            }, {
                "inline": true
            });
        }
        return block("logic_compare", node.lineno, {
            "OP": this.compareOperator(ops[0])
        }, {
            "A": this.convert(left),
            "B": this.convert(comparators[0])
        }, {
            "inline": "true"
        });
    }

}

convertStockSymbols = function(symbol) {
    switch (symbol) {
        case 'FB': case "Facebook":
        return "Facebook";
        case "AAPL": case "Apple":
        return "Apple";
        case "MSFT": case "Microsoft":
        return "Microsoft";
        case "GOOG": case "Google":
        return "Google";
        default:
            throw new Error("Unknown Stock Symbol.");
    }
}

toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

PythonToBlocks.KNOWN_MODULES = {
    "weather": {
        "get_temperature": ["weather_temperature", "CITY"],
        "get_report": ["weather_report", "CITY"],
        "get_forecasts": ["weather_forecasts", "CITY"],
        "get_highs_lows": ["weather_highs_lows", "CITY"],
        "get_all_forecasted_temperatures": ["weather_all_forecasts"],
        "get_forecasted_reports": ["weather_report_forecasts", "CITY"]
    },
    "earthquakes": {
        "get": ["earthquake_get", "PROPERTY"],
        "get_both": ["earthquake_both"],
        "get_all": ["earthquake_all"]
    },
    "stocks": {
        "get_current": ["stocks_current", ["TICKER", convertStockSymbols]],
        "get_past": ["stocks_past", ["TICKER", convertStockSymbols]]
    },
    "crime": {
        // STATE = toTitleCase
        "get_property_crimes": ["crime_state", ["STATE", toTitleCase],
            ["TYPE", "property"]],
        "get_violent_crimes": ["crime_state",  ["STATE", toTitleCase],
            ["TYPE", "violent"]],
        "get_by_year": ["crime_year", "YEAR"],
        "get_all": ["crime_all"]
    },
    "books": {
        "get_all": ["books_get"]
    },
    "plt": {
        "title": ["*plot_title", "TEXT"],
        "xlabel": ["*plot_xlabel", "TEXT"],
        "ylabel": ["*plot_ylabel", "TEXT"],
        "hist": ["*plot_hist", {"type": "variable", "mode": "value", "name": "values"}],
        "scatter": ["*plot_scatter", {"type": "variable", "mode": "value", "name": "x_values"},
            {"type": "variable", "mode": "value", "name": "y_values"}],
        "show": ["*plot_show"]
    }
};
PythonToBlocks.prototype.KNOWN_FUNCTIONS = ["append", "strip", "rstrip", "lstrip"];
PythonToBlocks.KNOWN_ATTR_FUNCTIONS = {};
PythonToBlocks.prototype.CallAttribute = function(func, args, keywords, starargs, kwargs, node) {
    args = args ?? [];
    var name = this.identifier(func.attr);
    if (func.value._astname == "Name" || func.value._astname == "Attribute") {
        var module = null;
        if (func.value._astname == "Name") {
            module = this.identifier(func.value.id);
        } else {
                try{
                    module = this.Name_str(func.value.value) + '.' + this.identifier(func.value.attr);
                }catch(e) {
                    
                }
        }

        if (module == "plt" && name == "plot") {
            if (args.length == 1) {
                return [block("plot_line", func.lineno, {}, {
                    "y_values": this.convert(args[0])
                }, {"inline": "false"})];
            } else if (args.length == 2) {
                return [block("plot_lineXY", func.lineno, {}, {
                    "x_values": this.convert(args[0]),
                    "y_values": this.convert(args[1])
                }, {"inline": "false"})];
            } else {
                throw new Error("Incorrect number of arguments to plt.plot");
            }
        } else if(Object.keys(py2block_config.moduleFunctionD.get(module)).length != 0){
            if(name in py2block_config.moduleFunctionD.get(module)) {
                try {
                    return py2block_config.moduleFunctionD.get(module)[name](this, func, args, keywords, starargs, kwargs, node);
                } catch (e) {
                    throw new Error("not implement for this module's function");
                }
            }else{
                throw new Error("not implement for this module's function");
            }
        } else if (py2block_config.knownModuleS.has(module)){
            throw new Error("not implement for this module's function");
        } else if (module in PythonToBlocks.KNOWN_MODULES && name in PythonToBlocks.KNOWN_MODULES[module]) {
            var definition = null;
            definition = PythonToBlocks.KNOWN_MODULES[module][name];
            var blockName = definition[0];
            var isExpression = true;
            if (blockName.charAt(0) == "*") {
                blockName = blockName.slice(1);
                isExpression = false;
            }
            var fields = {};
            var mutations = {};
            var values = {};
            for (var i = 0; i < args.length; i++) {
                var argument = definition[1+i];
                var destination = fields;
                if (typeof argument ==  "string") {
                    fields[argument] = this.Str_value(args[i]);
                } else if (typeof argument == "object") {
                    if (argument.mode == "value") {
                        destination = values;
                    }
                    if (argument.add_mutation !== undefined) {
                        mutations[argument.add_mutation.name] = argument.add_mutation.value;
                    }
                    if (argument.type == 'mutation') {
                        if (argument.index == undefined) {
                            mutations[argument.name] = this.Str_value(args[i]);
                        } else {
                            mutations[argument.name] = this.Str_value(args[argument.index+1]);
                        }
                    } else if (argument.type == "integer") {
                        destination[argument.name] = this.Num_value(args[i]);
                    } else if (argument.type == 'variable') {
                        if(argument.is_math_angle === true){
                            destination[argument.name] = this.convert(args[i].left.left);
                        }else{
                            destination[argument.name] = this.convert(args[i]);
                        }
                    } else if (argument.type == "integer_mapper") {
                        // Okay we jumped the shark here
                        var argumentName = argument.name;
                        var argumentMapper = argument.method;
                        destination[argumentName] = argumentMapper(this.Num_value(args[i]));
                    } else if (argument.type == 'mapper') {
                        var argumentName = argument.name;
                        var argumentMapper = argument.method;
                        destination[argumentName] = argumentMapper(this.Str_value(args[i]));
                    }
                } else {
                    var argumentName = argument[0];
                    var argumentMapper = argument[1];
                    fields[argumentName] = argumentMapper(this.Str_value(args[i]));
                }
            }
            for (var i = 1+args.length; i < definition.length; i++) {
                var first = definition[i][0];
                var second = definition[i][1];
                fields[first] = second;
            }
            if (isExpression) {
                var k = block(blockName, func.lineno, fields, values, [], mutations);
                return k;
            } else {
                return [block(blockName, func.lineno, fields, values, [], mutations)];
            }
        }
    }
    var keys = Object.keys(py2block_config.objectFunctionD.get(name));
    if (this.KNOWN_FUNCTIONS.indexOf(name) > -1 || keys.length != 0) {
        if(keys.length != 0){
            try {
                var objname = this.identifier(func.value.id);
                if (objname in py2block_config.objectTypeD) {
                    var objtype = py2block_config.objectTypeD[objname];
                    if (objtype in py2block_config.objectFunctionD.get(name))
                        return py2block_config.objectFunctionD.get(name)[objtype](this, func, args, keywords, starargs, kwargs, node);
                }
            }catch (e){
            }
            try {
                if (!py2block_config.objectFunctionD.get(name)['Default']) {
                    var firstKey = keys[0];
                    py2block_config.objectFunctionD.get(name)['Default'] = py2block_config.objectFunctionD.get(name)[firstKey];
                }
                return py2block_config.objectFunctionD.get(name)['Default'](this, func, args, keywords, starargs, kwargs, node);
            }catch(e){
            }
        }
        /*switch (name) {
            case "append":
                if (args.length !== 1) {
                    throw new Error("Incorrect number of arguments to .append");
                }
                // Return as statement
                return [block("lists_append", func.lineno, {}, {
                    "ITEM": this.convert(args[0]),
                    "LIST": this.convert(func.value)
                }, {
                    "inline": "true"
                })];
            case "strip":
                return block("text_trim", func.lineno, { "MODE": "BOTH" },
                    { "TEXT": this.convert(func.value) });
            case "lstrip":
                return block("text_trim", func.lineno, { "MODE": "LEFT" },
                    { "TEXT": this.convert(func.value) });
            case "rstrip":
                return block("text_trim", func.lineno, { "MODE": "RIGHT" },
                    { "TEXT": this.convert(func.value) });
            default: throw new Error("Unknown function call!");
        }*/
    } else if (name in PythonToBlocks.KNOWN_ATTR_FUNCTIONS) {
        return PythonToBlocks.KNOWN_ATTR_FUNCTIONS[name].bind(this)(func, args, keywords, starargs, kwargs, node)
    }
    //兜底图形块呈现方式
    if(keywords.length != 0){
        throw new Error("not implement for kargs");
    }
    //console.log(func, args, keywords, starargs, kwargs);
    heights = this.getChunkHeights(node);
    extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
    var col_endoffset = node.col_endoffset;
    if (args.length > 0) {
        for (var i = 0; i < args.length; i+= 1) {
            col_endoffset = args[i].col_endoffset;
        }
    } else {
        col_endoffset += 2;
        expressionCall += "()";
    }
    var expressionCall = extractedSource.slice(node.col_offset, 1+col_endoffset);
    //console.log(node, extractedSource, node.col_offset, node.col_endoffset);
    var lineno = node.lineno;
    //console.error(e);
    //return raw_expression(extractedSource.split("=")[1], lineno);

    var argumentsNormal = {};
    var argumentsMutation = {"@name": name};
    for (var i = 0; i < args.length; i+= 1) {
        argumentsNormal["ARG"+i] = this.convert(args[i]);
        argumentsMutation[i] = this.convert(args[i]);
    }
    var methodCall = block("procedures_callreturn", node.lineno, {
    }, argumentsNormal, {
        "inline": "true"
    }, argumentsMutation);

    return block("attribute_access", node.lineno, {}, {
        "MODULE": this.convert(func.value),
        "NAME": methodCall
    }, { "inline": "true"}, {});
}

/*
 * func: expr_ty
 * args: asdl_seq
 * keywords: asdl_seq
 * starargs: expr_ty
 * kwargs: expr_ty
 *
 */
PythonToBlocks.prototype.Call = function(node) {
    var func = node.func;
    var args = node.args;
    var keywords = node.keywords;
    var starargs = node.starargs;
    var kwargs = node.kwargs;

    switch (func._astname) {
        case "Name":
            switch (this.identifier(func.id)) {
                case "_print":
                    if (args.length == 1) {
                        return [block("text_print", node.lineno, {}, {
                            "TEXT": this.convert(args[0])})];
                    } else {
                        return [block("text_print_multiple", node.lineno, {},
                            this.convertElements("PRINT", args),
                            {"inline": "true"
                            }, { "@items": args.length})];
                    }
                case "_abs":
                    return block("math_single", node.lineno, {"OP": "ABS"}, {"NUM": this.convert(args[0])})
                case "_round":
                    return block("math_round", node.lineno, {"OP": "ROUND"}, {"NUM": this.convert(args[0])})
                case "_sum":
                    return block("math_on_list", node.lineno, {"OP": "SUM"}, {"LIST": this.convert(args[0])})
                case "_min":
                    return block("math_on_list", node.lineno, {"OP": "MIN"}, {"LIST": this.convert(args[0])})
                case "_max":
                    return block("math_on_list", node.lineno, {"OP": "MAX"}, {"LIST": this.convert(args[0])})
                case "_len":
                    return block("lists_length", node.lineno, {}, {"VALUE": this.convert(args[0])})
                case "_math_modes":
                    return block("list_trig", node.lineno, {'OP':'MODE'}, {"DATA": this.convert(args[0])})
                case "_xrange":
                    return block("procedures_callreturn", node.lineno, {},
                        {"ARG0": this.convert(args[0])},
                        {"inline": "true"},
                        {"@name": "xrange",
                            "": this.convert(args[0])})
                default:
                    var funcname = this.identifier(func.id);
                    if(funcname in py2block_config.globalFunctionD){
                        try {
                            var config_block = py2block_config.globalFunctionD[funcname](this, func, args, keywords, starargs, kwargs, node);
                            if (config_block != null) return config_block;
                        }catch(e){
                        }
                    }

                    if (starargs && starargs.length > 0) {
                        throw new Error("*args (variable arguments) are not implemented yet.");
                    } else if (kwargs && kwargs.length > 0) {
                        throw new Error("**args (keyword arguments) are not implemented yet.");
                    } else if (keywords && keywords.length > 0) {
                        throw new Error("**args (keyword arguments) are not implemented yet.");
                    }
                    var argumentsNormal = {};
                    var argumentsMutation = {"@name": this.identifier(func.id)};
                    for (var i = 0; i < args.length; i+= 1) {
                        argumentsNormal["ARG"+i] = this.convert(args[i]);
                        argumentsMutation[i] = this.convert(args[i]);
                    }
                    var functype = this.funcname_to_type[this.identifier(func.id)];
                    var blockid = "procedures_callreturn";
                    if(functype == "procedures_defnoreturn"){
                        blockid = "procedures_callnoreturn";
                    }
                    var b = block(blockid, node.lineno, {}, argumentsNormal, {
                                "inline": "true"
                            }, argumentsMutation);
                    if(blockid == "procedures_callnoreturn"){
                        return [b];
                    }else{
                        return b;
                    }
            }
        // Direct function call
        case "Attribute":
        {
            var functype = this.funcname_to_type_class[func.attr.v];
            if(functype == "method_procedures_defnoreturn" || functype == "method_procedures_defreturn")
            {
                if (starargs !== null && starargs.length > 0) {
                    throw new Error("*args (variable arguments) are not implemented yet.");
                } else if (kwargs !== null && kwargs.length > 0) {
                    throw new Error("**args (keyword arguments) are not implemented yet.");
                } else if (keywords !== null && keywords.length > 0) {
                    throw new Error("**args (keyword arguments) are not implemented yet.");
                }
                var funcname = func.attr.v;
                var argumentsNormal = {};
                var argumentsMutation = {"@name": funcname};
                if(args.length)
                {
                    argumentsNormal["ARG0"] = this.convert(args[0]);
                    argumentsMutation[0] = this.convert(args[0]);
                }
                for (var i = 1; i <= args.length; i+= 1) {
                    argumentsNormal["ARG"+i] = this.convert(args[i-1]);
                    argumentsMutation[i] = this.convert(args[i-1]);
                }
                py2block_config.pinType = "object_get";
                argumentsNormal["DATA"] = this.convert(node.func.value);   
                py2block_config.pinType=null;
                var blockid = "method_procedures_callreturn";
                if(functype.indexOf("method_procedures_defnoreturn") != -1){
                    blockid = "method_procedures_callnoreturn";
                }
                var b = block(blockid, node.lineno, {},argumentsNormal, {
                            "inline": "true"
                        }, argumentsMutation);
                if(blockid.indexOf("method_procedures_callnoreturn") != -1){
                    return [b];
                }else{
                    return b;
                }
            }
            else
            {
                // Module function call
                return this.CallAttribute(func, args, keywords, starargs, kwargs, node);
            }
        }
    }
}

/*
 * value: expr_ty
 *
 */
PythonToBlocks.prototype.Repr = function(node)
{
    var value = node.value;
    throw new Error("Repr is not yet implemented");
}

/*
 * n: object
 *
 */
PythonToBlocks.prototype.Num = function(node)
{
    var n = node.n;
    var nVal = Sk.ffi.remapToJs(n);
    if(py2block_config.pinType == "pins_digital") {
        if(py2block_config.inScope == "i2c_init"){
            return block(py2block_config.pinType, node.lineno, {
                "PIN": nVal
            });
        }
        if(py2block_config.inScope == "rgb_create_block"){
            return block(py2block_config.pinType, node.lineno, {
                "PIN": nVal
            });
        }
        if(nVal == 1 || nVal == 0) {
            return block("inout_highlow", node.lineno, {"BOOL": (nVal == 1 ? "HIGH" : "LOW")});
        }
    }else if(py2block_config.pinType == "math_indexer_number"){
        return block(py2block_config.pinType, node.lineno, {
            "NUM": nVal
        });
    }else if(py2block_config.pinType == "number"){
        return block(py2block_config.pinType, node.lineno, {
            "op": nVal
        });
    }else if(py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": nVal
        });
    }
    if(py2block_config.inScope == "lcd_init"){
        return block("math_number", node.lineno, {"NUM": '0x' + nVal.toString(16)});
    }else if(py2block_config.inScope == "ledswitch"){
        return block(py2block_config.inScope, node.lineno, {
            "flag": nVal
        });
    }else if(py2block_config.inScope == "switch"){
        return block(py2block_config.inScope, node.lineno, {
            "flag": nVal
        });
    }
    return block("math_number", node.lineno, {"NUM": nVal});
}

PythonToBlocks.prototype.Num_value = function(node)
{
    var n = node.n;
    return Sk.ffi.remapToJs(n);
}

/*
 * s: string
 *
 */
PythonToBlocks.prototype.Str = function(node)
{
    var s = node.s;
    var strValue = Sk.ffi.remapToJs(s);
    /*if (strValue.split("\n").length > 1) {
        return block("string_multiline", node.lineno, {"TEXT": strValue});
    } else {
        return block("text", node.lineno, {"TEXT": strValue});
    }
    */
    if (strValue.indexOf('\n')!=-1){
        return block("text_textarea", node.lineno, {"VALUE": strValue})
    }else{
        strValue = strValue.replace(/\n/g, '\\n')
                        .replace(/\r/g, '\\r')
                        .replace(/\t/g, '\\t')
        return block("text", node.lineno, {"TEXT": strValue})
    }
}

PythonToBlocks.prototype.Str_value = function(node) {
    var s = node.s;
    return Sk.ffi.remapToJs(s);
}

/*
 * value: expr_ty
 * attr: identifier
 * ctx: expr_context_ty
 *
 */
PythonToBlocks.prototype.Attribute = function(node)
{
    var value = node.value;
    var attr = node.attr;
    var ctx = node.ctx;
    var valueName = "";
    if(value._astname == "Name"){
        valueName = this.identifier(value.id);    
    }else if(value._astname == "Attribute"){
        valueName = this.Name_str(value.value) + "." + this.identifier(value.attr);
    }
    
    var attrName = this.identifier(attr);
    var attrD = py2block_config.moduleAttrD.get(valueName);
    if (attrName in attrD) {
        try {
            return attrD[attrName](node, valueName, attrName);
        } catch (e) {
        }
    } else {
        var keys = Object.keys(py2block_config.objectAttrD.get(attrName));
        if (keys.length != 0) {
            try {
                if (!py2block_config.objectAttrD.get(attrName)['Default']) {
                    var firstKey = keys[0];
                    py2block_config.objectAttrD.get(attrName)['Default'] = py2block_config.objectAttrD.get(attrName)[firstKey];
                }
                return py2block_config.objectAttrD.get(attrName)['Default'](this, node, value, attr);
            }catch(e){
            }
        }
    }
    if(attr.v == 'value' && py2block_config.board == py2block_config.ESP32){
        if(value.id.v.indexOf("pin") != -1 && Blockly.Blocks['inout_digital_read']){
            pbc.pinType = "pins_digital";
            var pinblock = this.convert(value);
            pbc.pinType = null;
            return block("inout_digital_read", node.lineno, {}, {
                "PIN": pinblock
            });
        }
        else if(value.id.v.indexOf("adc") != -1 && Blockly.Blocks['inout_analog_read']){
            pbc.pinType = "pins_analog";
            var pinblock = this.convert(value);
            pbc.pinType = null;
            return block("inout_analog_read", node.lineno, {}, {
                "PIN": pinblock
            });
        }
        else if(value.id.v.indexOf("tc") != -1 && Blockly.Blocks['inout_pin_pressed']){
            pbc.pinType = "pins_touch";
            var pinblock = this.convert(value);
            pbc.pinType = null;
            return block("inout_pin_pressed", node.lineno, {}, {
                "pin": pinblock
            });
        }
    }
    else if(Blockly.Blocks['property_get']){
        py2block_config.pinType = "object_get";
        var mode = this.convert(value);   
        py2block_config.pinType=null;
        return block("property_get", node.lineno, {
            "VAR": node.attr.v
        }, {
            "VALUE": mode
        }, { "inline": "true"}, {});
    }

    return block("attribute_access", node.lineno, {
        "MODULE": this.convert(value),
        "NAME": this.convert(attr)
    });

    //throw new Error("Attribute access not implemented");
}

/*
 * value: expr_ty
 * slice: slice_ty
 * ctx: expr_context_ty
 *
 */
PythonToBlocks.prototype.Subscript = function(node) {
    var value = node.value;
    var slice = node.slice;
    var ctx = node.ctx;

    if (slice._astname == "Index") {
        if(slice.value._astname == "Str" ){
            return block("dicts_get", node.lineno, {}, {
                "KEY": this.convert(slice.value),
                "DICT": this.convert(value)
            });
        }
        else if(slice.value._astname == "Tuple")
        {
            return block("lists_2d_get_data_with_col_row", node.lineno, {}, {
                "row": this.convert(slice.value.elts[0]),
                "col": this.convert(slice.value.elts[1]),
                "LIST": this.convert(value)
            });
        }
        else {
            if(slice.value._astname == "Num" && value.func != null
                && value.func._astname == "Attribute" && this.identifier(value.func.attr) == "ifconfig"){
                return block('network_get_connect', node.lineno, {
                    "mode":this.Num_value(slice.value)
                }, {
                    "VAR":this.convert(value.func.value)
                });

            }
            if(slice.value._astname == "Num" && value.func != null
                && value.func._astname == "Attribute" && this.identifier(value.func.attr) == "scan"){
                return block('network_scan', node.lineno, {
                    "mode":this.Num_value(slice.value)
                }, {
                    "VAR":this.convert(value.func.value)
                });

            }
            if(slice.value._astname == "Num" && value.func != null
                && value.func._astname == "Attribute" && this.identifier(value.func.attr) == "localtime"){
                if (value.func.value.id.v == "time"){
                return block('time_localtime', node.lineno, {
                    "op":this.Num_value(slice.value)
                }, {
                    
                });
            }
        }
            return block("lists_get_index", node.lineno, {}, {
                "AT": this.convert(slice.value),
                "LIST": this.convert(value)
            });
            

            
        }
    }else if(slice._astname == "Slice"){
        var at1block;
        var at2block;
        if(slice.lower !== null){
            py2block_config.pinType = "math_indexer_number";
            at1block = this.convert(slice.lower);
            py2block_config.pinType = null;
        }else{
            at1block = block("math_indexer_number", node.lineno, {"NUM": ''});
        }
        if(slice.upper !== null){
            py2block_config.pinType = "math_indexer_number";
            at2block = this.convert(slice.upper);
            py2block_config.pinType = null;
        }else{
            at2block = block("math_indexer_number", node.lineno, {"NUM": ''});
        }
        return block("lists_get_sublist", node.lineno, {}, {
            "AT1": at1block,
            "AT2": at2block,
            "LIST": this.convert(value),
        });
    }
    else if(slice._astname == "ExtSlice"){
        var at1block;
        var at2block;
        var at3block;
        var at4block;
        if(slice.dims["0"].lower !== null){
            py2block_config.pinType = "math_indexer_number";
            at1block = this.convert(slice.dims["0"].lower);
            py2block_config.pinType = null;
        }else{
            at1block = block("math_indexer_number", node.lineno, {"NUM": ''});
        }
        if(slice.dims["0"].upper !== null){
            py2block_config.pinType = "math_indexer_number";
            at2block = this.convert(slice.dims["0"].upper);
            py2block_config.pinType = null;
        }else{
            at2block = block("math_indexer_number", node.lineno, {"NUM": ''});
        }
        if(slice.dims["1"].lower !== null){
            py2block_config.pinType = "math_indexer_number";
            at3block = this.convert(slice.dims["1"].lower);
            py2block_config.pinType = null;
        }else{
            at3block = block("math_indexer_number", node.lineno, {"NUM": ''});
        }
        if(slice.dims["1"].upper !== null){
            py2block_config.pinType = "math_indexer_number";
            at4block = this.convert(slice.dims["1"].upper);
            py2block_config.pinType = null;
        }else{
            at4block = block("math_indexer_number", node.lineno, {"NUM": ''});
        }
        return block("lists_2d_get_col_row_data", node.lineno, {}, {
            "row_start": at1block,
            "row_end": at2block,
            "col_start": at3block,
            "col_end": at4block,
            "LIST": this.convert(value),
        });
    }

    throw new Error("This kind of subscript is not supported.");
}

/*
 * id: identifier
 * ctx: expr_context_ty
 */
PythonToBlocks.prototype.Name = function(node)
{
    var id = node.id;
    var ctx = node.ctx;
    var nodeName = this.Name_str(node);
    //处理micropython的管脚(eg:pin10)
    var pinMatcher = /pin[0-9]*/;
    var dacMatcher = /dac[0-9]*/;
    var pwmMatcher = /pwm[0-9]*/;
    var adcMatcher = /adc[0-9]*/;
    var tcMatcher = /tc[0-9]*/;

    var ioMatcher = /IO[0-9]*/;
    if(py2block_config.board == py2block_config.MICROBITPY
        && pinMatcher.test(nodeName) && py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id).replace("pin", '')
        });
    }

    if(py2block_config.board == py2block_config.ESP32
        && pinMatcher.test(nodeName) && py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && dacMatcher.test(nodeName) && py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && pwmMatcher.test(nodeName) && py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && adcMatcher.test(nodeName) && py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && tcMatcher.test(nodeName) && py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.MICROBITPY
        && (nodeName === "button_a" || nodeName === "button_b") && py2block_config.pinType == "pins_button"){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && (nodeName === "button_a" || nodeName === "button_b") && py2block_config.pinType == "pins_button"){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && (nodeName === "button_B1" || nodeName === "button_B2" || nodeName === "button_A1" || nodeName === "button_A2" || nodeName === "button_A3" || nodeName === "button_A4") && py2block_config.pinType == "pins_button" ){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && (nodeName === "touch1" || nodeName === "touch2"|| nodeName === "touch3"|| nodeName === "touch4") && py2block_config.pinType =="number1"){
        return block(py2block_config.pinType, node.lineno, {
            "op": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && (nodeName === "touch1" || nodeName === "touch2"|| nodeName === "touch3"|| nodeName === "touch4"|| nodeName === "touch5"|| nodeName === "touch6") && py2block_config.pinType =="handbit_number1"){
        return block(py2block_config.pinType, node.lineno, {
            "op": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && (nodeName === "touch_T1" || nodeName === "touch_T2"|| nodeName === "touch_T3"|| nodeName === "touch_T4") && py2block_config.pinType =="number1"){
        return block(py2block_config.pinType, node.lineno, {
            "op": this.identifier(id)
        });
    }
    if(py2block_config.pinType == "pins_callback"){
        return block("factory_block_return", node.lineno, {
            "VALUE": this.identifier(id)
        });
    }
    if(py2block_config.board == py2block_config.ESP32
        && ioMatcher.test(nodeName) && py2block_config.pinType != null){
        return block(py2block_config.pinType, node.lineno, {
            "PIN": this.identifier(id).replace("pin", '')
        });
    }

    if(py2block_config.reservedNameD[nodeName] != null){
        try {
            return py2block_config.reservedNameD[nodeName](this, node, id, ctx, nodeName);
        }catch(e){
        }
    }

    switch (this.Name_str(node)) {
        case "True":
            return block("logic_boolean", node.lineno, {"BOOL": "TRUE"});
        case "False":
            return block("logic_boolean", node.lineno, {"BOOL": "FALSE"});
        case "None":
            return block("logic_null", node.lineno);
        case "___":
            return null;
        default:
            if(py2block_config.pinType == "object_get")
            {
                return block('object_get', node.lineno, {
                    "VAR": this.identifier(id)
                });
            }
            else if(py2block_config.pinType == "class_get")
            {
                return block('class_get', node.lineno, {
                    "VAR": this.identifier(id)
                });
            }
            else
            {
                return block('variables_get', node.lineno, {
                    "VAR": this.identifier(id)
                });
            }
    }

}

PythonToBlocks.prototype.NameConstant = function(node)
{
    var id = node.id;
    var ctx = node.ctx;
    var nodeName = node.value.v;

    switch (nodeName) {
        case 1:
            return block("logic_boolean", node.lineno, {"BOOL": "TRUE"});
        case 0:
            return block("logic_boolean", node.lineno, {"BOOL": "FALSE"});
        case null:
            return block("logic_null", node.lineno);
        case "___":
            return null;
        default:
            if(py2block_config.pinType == "object_get")
            {
                return block('object_get', node.lineno, {
                    "VAR": this.identifier(id)
                });
            }
            else if(py2block_config.pinType == "class_get")
            {
                return block('class_get', node.lineno, {
                    "VAR": this.identifier(id)
                });
            }
            else
            {
                return block('variables_get', node.lineno, {
                    "VAR": this.identifier(id)
                });
            }
    }

}

/*
 * id: identifier
 * ctx: expr_context_ty
 */
PythonToBlocks.prototype.Name_str = function(node)
{
    var id = node.id;
    var ctx = node.ctx;
    return this.identifier(id);
}

PythonToBlocks.prototype.convertElements = function(key, values) {
    var output = {};
    for (var i = 0; i < values.length; i++) {
        output[key+i] = this.convert(values[i]);
    }
    return output;
}

/*
 * elts: asdl_seq
 * ctx: expr_context_ty
 *
 */
PythonToBlocks.prototype.List = function(node) {
    var elts = node.elts;

    if (elts.length > 3){
        // return with one block & comma seperated 
        var valueList = [];
        var s = this.getSourceCode(elts).split('\n')[node.lineno-1];
        var lt = s.indexOf('[',elts[0].col_offset)
        var rt = s.indexOf(']',elts[0].col_offset)
        while (lt != -1 && lt < rt){
            var lt = s.indexOf('[',lt+1)
            var rt = s.indexOf(']',rt+1)
        }        
        if (s.length > 0){
            //s = s.substring(elts[0].col_offset,rt);
            s = s.substring(node.col_offset+1,rt);
            valueList = s.split(",");
        }
        else
            valueList = "";

        return block("list_many_input", node.lineno, {"CONTENT": valueList}, {}
            , {
                "inline": "true",
            }, {

            });
    }else{
        // return with many blocks
        return block("lists_create_with_noreturn", node.lineno, {},
            this.convertElements("ADD", elts)
            , {
                "inline": "true",
            }, {
                "@items": elts.length
            });
    }
}

/*
 * elts: asdl_seq
 * ctx: expr_context_ty
 */
PythonToBlocks.prototype.Tuple = function(node)
{
    var elts = node.elts;

    if (elts.length > 3){
        // return with one block & comma seperated 
        var valueList = [];
        var s = this.getSourceCode(elts).split('\n')[node.lineno-1];
        var lt = s.indexOf('(',elts[0].col_offset)
        var rt = s.indexOf(')',elts[0].col_offset)
        while (lt != -1 && lt < rt){
            var lt = s.indexOf('(',lt+1)
            var rt = s.indexOf(')',rt+1)
        }        
        if (s.length > 0){
            //s = s.substring(elts[0].col_offset,rt);
            s = s.substring(node.col_offset,rt);
            valueList = s.split(",");
        }
        else
            valueList = "";

        return block("tuple_create_with_text_return", node.lineno, {"TEXT": valueList}, {}
            , {
                "inline": "true",
            }, {

            });
    }
    else{
        // return with many blocks
        return block("tuple_create_with_noreturn", node.lineno, {},
            this.convertElements("ADD", elts)
            , {
                "inline": "true",
            }, {
                "@items": elts.length
            });
    }
}

/*
 * elts: asdl_seq
 * ctx: expr_context_ty
 */
PythonToBlocks.prototype.Dict = function(node)
{
    var keys = node.keys;
    var values = node.values;
    var keyList = [];
    var valueList = [];
    for (var i = 0; i < keys.length; i+= 1) {
        var k = keys[i];
        var line = this.getSourceCode().split('\n')[k.lineno - 1];
        var colonEnd = line.indexOf(':', keys[i].col_offset);
        keyList["KEY"+i] = line.substring(keys[i].col_offset, colonEnd).replace(/^\s+|\s+$/g,"");
        valueList["VALUE"+i] = this.convert(values[i]);
    }
    return block("dicts_create_with_noreturn", node.lineno, 
        keyList,
        this.convertElements("ADD", values), {
            "inline": "true",
        }, {
            "@items": keys.length
        });
}

/*
 *
 *
 */
PythonToBlocks.prototype.Ellipsis = function() {
    throw new Error("Ellipsis not implemented");
}

/*
 * lower: expr_ty
 * upper: expr_ty
 * step: expr_ty
 *
 */
PythonToBlocks.prototype.Slice = function(node)
{
    var lower = node.lower;
    var upper = node.upper;
    var step = node.step;

    throw new Error("Slices not implemented");
}

/*
 * dims: asdl_seq
 *
 */
PythonToBlocks.prototype.ExtSlice = function(node)
{
    var dims = node.dims;

    throw new Error("ExtSlice is not implemented.");
}

/*
 * value: expr_ty
 *
 */
PythonToBlocks.prototype.Index = function(value)
{
    var value = node.value;

    throw new Error("Index is not implemented");
}

/*
 * target: expr_ty
 * iter: expr_ty
 * ifs: asdl_seq
 *
 */
PythonToBlocks.prototype.comprehension = function(node)
{
    var target = node.target;
    var iter = node.iter;
    var ifs = node.ifs;

    throw new Error("Comprehensions not implemented.");
}

/*
 * type: expr_ty
 * name: expr_ty
 * body: asdl_seq
 *
 */
PythonToBlocks.prototype.ExceptHandler = function(node)
{
    var type = node.type;
    var name = node.name;
    var body = node.boy;

    throw new Error("Except handlers are not implemented");
}

PythonToBlocks.prototype.argument_ = function(node) {
    var id = node.arg;
    return this.identifier(id);
}

/*
 * args: asdl_seq
 * vararg: identifier
 * kwarg: identifier
 * defaults: asdl_seq
 *
 */
PythonToBlocks.prototype.arguments_ = function(node)
{
    var args = node.args;
    var vararg = node.vararg;
    var kwarg = node.kwarg;
    var defaults = node.defaults;

    var allArgs = [];
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        allArgs.push(this.argument_(arg));
    }
    return allArgs;
}

/*
 * arg: identifier
 * value: expr_ty
 *
 */
PythonToBlocks.prototype.keyword = function(node)
{
    var arg = node.arg;
    var value = node.value;

    throw new Error("Keywords are not implemented");
}

/*
 * name: identifier
 * asname: identifier
 *
 */
PythonToBlocks.prototype.alias = function(node)
{
    var name = node.name;
    var asname = node.asname;

    throw new Error("Aliases are not implemented");
}


/* ----- expr_context ----- */
/*
Load
Store
Del
AugLoad
AugStore
Param
*/


/* ----- operator ----- */
/*
Add
Sub
Mult
Div
Mod
Pow
LShift
RShift
BitOr
BitXor
BitAnd
FloorDiv
*/

/* ----- unaryop ----- */
/*
Invert
Not
UAdd
USub
*/


