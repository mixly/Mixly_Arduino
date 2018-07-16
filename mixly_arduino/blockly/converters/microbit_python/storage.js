'use strict';

var pbc = Py2blockConfig.prototype;
pbc.assignD.get('FILE')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.Name_str(value.func);
    if(value._astname === "Call" && funcName === "open" && value.args.length === 2)
        return true;
    return false;
}

pbc.assignD.get('FILE')['create_block'] = function(py2block, node, targets, value){
    var mode = py2block.identifier(value.args[1].s);

    return block("storage_fileopen2", node.lineno, {"MODE":mode}, {
        "FILENAME":py2block.convert(value.args[0]),
        "FILE":py2block.convert(targets[0])
    });
}


pbc.objectFunctionD.get('write')['FILE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
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


pbc.objectFunctionD.get('read')['FILE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return block("storage_get_contents", func.lineno, {
        "MODE":"read"
    },
    {
         "FILE" : fileblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('readline')['FILE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return block("storage_get_contents", func.lineno, {
        "MODE":"readline"
    },
    {
         "FILE" : fileblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('writable')['FILE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
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


pbc.objectFunctionD.get('name')['FILE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
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


pbc.objectFunctionD.get('close')['FILE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
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

