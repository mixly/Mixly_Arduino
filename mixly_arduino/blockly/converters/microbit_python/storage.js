'use strict';

var pbc = Py2blockConfig.prototype;

pbc.objectFunctionD.get('writable')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    return [block("storage_can_write_ornot", func.lineno, {}, {
         "FILE" : pinblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('name')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    return [block("storage_get_filename", func.lineno, {}, {
         "FILE" : pinblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('close')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    return [block("storage_close_file", func.lineno, {}, {
         "FILE" : pinblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('listdir')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    return [block("storage_list_all_files", func.lineno, {}, {
         "FILE" : pinblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('remove')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("storage_delete_file", func.lineno, {}, {
         "FILE" : pinblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('write')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("storage_file_write", func.lineno, {}, {
         "FILE" : pinblock,
         "data" :argblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('read')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("storage_get_contents", func.lineno, {
        "MODE":"read"
    }, 
    {
         "FILE" : pinblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('readline')['STORAGE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("storage_get_contents", func.lineno, {
        "MODE":"readline"
    }, 
    {
         "FILE" : pinblock,
         "SIZE" : argblock
    }, {
        "inline": "true"
    })];
}
/*pbc.objectFunctionD.get('remove')['STORAGE'] = function(py2block, func, args){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("storage_delete_file", func.lineno, {}, 
    {
         "FILE" : pinblock
         "data" :
    }, {
        "inline": "true"
    })];
}
*/

