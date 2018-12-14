'use strict';

var fileClass = 'open';
pbc.assignD.get('File')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Name"){
        return false;
    }
    var funcName = py2block.Name_str(value.func);
    if(funcName === "open" && value.args.length === 2)
        return true;
    return false;
}

pbc.assignD.get('File')['create_block'] = function(py2block, node, targets, value){
    var mode = py2block.Str_value(value.args[1]);
    return block("storage_fileopen", node.lineno, {
        "MODE":mode
    }, {
        "FILENAME":py2block.convert(value.args[0]),
        "FILE":py2block.convert(targets[0])
    });
}


pbc.objectFunctionD.get('write')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("storage_file_write", func.lineno, {}, {
        "FILE" : fileblock,
        "data" :argblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('read')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return block("storage_get_contents", func.lineno, {
        "MODE":"read"
    }, {
         "FILE" : fileblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('readline')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return block("storage_get_contents", func.lineno, {
        "MODE":"readline"
    }, {
         "FILE" : fileblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('writable')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    return block("storage_can_write_ornot", func.lineno, {}, {
        "FILE" : fileblock,
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('name')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    return block("storage_get_filename", func.lineno, {}, {
         "FILE" : fileblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('close')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    return [block("storage_close_file", func.lineno, {}, {
        "FILE" : fileblock
    }, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('os')['listdir'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("storage_list_all_files", func.lineno, {}, {
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('os')['remove'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("storage_delete_file", func.lineno, {}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('os')['size'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return block("storage_get_file_size", func.lineno, {}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    });
}

