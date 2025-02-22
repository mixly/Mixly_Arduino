'use strict';

var fileClass = 'open';




pbc.globalFunctionD['open'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }    
    if (keywords.length == 0) {
    var varblock = py2block.convert(args[0]);
    var mode = py2block.Str_value(args[1]);
   return block("storage_fileopen_new", node.lineno, {
        "MODE":mode
    }, {
        "FILENAME":varblock
    });
    }
    if (keywords.length == 1) {
    var varblock = py2block.convert(args[0]);
    var mode = py2block.Str_value(args[1]);
    var code = py2block.Str_value(keywords[0].value);
   return block("storage_fileopen_new_encoding", node.lineno, {
        "MODE":mode,
        "CODE":code
    }, {
        "FILENAME":varblock
    });
    }

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
    if (args.length == 1) {
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
    if (args.length == 0) {
    var fileblock = py2block.convert(func.value);
    return block("storage_get_contents_without_para", func.lineno, {
        "MODE":"read"
    }, {
         "FILE" : fileblock
    }, {
        "inline": "true"
    });
    }
    else{
        throw new Error("Incorrect number of arguments");
    }
}


pbc.objectFunctionD.get('readline')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length == 1) {
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
    if (args.length == 0) {
    var fileblock = py2block.convert(func.value);
    return block("storage_get_contents_without_para", func.lineno, {
        "MODE":"readline"
    }, {
         "FILE" : fileblock
    }, {
        "inline": "true"
    });
    }
    else{
        throw new Error("Incorrect number of arguments");
    }
}

pbc.objectFunctionD.get('readlines')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length == 1) {
    var fileblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return block("storage_get_contents", func.lineno, {
        "MODE":"readlines"
    }, {
         "FILE" : fileblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    });
    }
    if (args.length == 0) {
    var fileblock = py2block.convert(func.value);
    return block("storage_get_contents_without_para", func.lineno, {
        "MODE":"readlines"
    }, {
         "FILE" : fileblock
    }, {
        "inline": "true"
    });
    }
    else{
        throw new Error("Incorrect number of arguments");
    }
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
    return [block("storage_delete_file", func.lineno, {"MODE":"remove"}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('os')['removedirs'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("storage_delete_file", func.lineno, {"MODE":"removedirs"}, {
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

pbc.objectFunctionD.get('seek')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    if(args[1].n.v=="0"){
        var mode = "start";
    }
    else if(args[1].n.v=="1"){
        var mode = "current";
    }
    else{
        var mode = "end";
    }
    return [block("storage_file_seek", func.lineno, {
        "MODE": mode
    }, {
         "FILE" : fileblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('tell')[fileClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    return block("storage_file_tell", func.lineno, {
    }, {
         "FILE" : fileblock,
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('os')['chdir'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("storage_change_dir", func.lineno, {}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('os')['getcwd'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("storage_get_current_dir", func.lineno, {}, {
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('os')['mkdir'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fun = func.attr.v;
    var argblock = py2block.convert(args[0]);
    return [block("storage_make_dir", func.lineno, {"MODE":fun}, {
         "PATH" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('os')['makedirs'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fun = func.attr.v;
    var argblock = py2block.convert(args[0]);
    return [block("storage_make_dir", func.lineno, {"MODE":fun}, {
         "PATH" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('os')['rename'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var arg1block = py2block.convert(args[1]);
    return [block("storage_rename", func.lineno, {}, {
         "FILE" : argblock,
         "NEWFILE":arg1block
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('os')['isfile'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fun = func.attr.v;
    var argblock = py2block.convert(args[0]);
    return [block("storage_is_file", func.lineno, {"MODE":fun}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('os')['startfile'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fun = func.attr.v;
    var argblock = py2block.convert(args[0]);
    return [block("storage_open_file_with_os", func.lineno, {"MODE":fun}, {
         "fn" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('os')['isdir'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fun = func.attr.v;
    var argblock = py2block.convert(args[0]);
    return [block("storage_is_file", func.lineno, {"MODE":fun}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    })];
}

