'use strict';

pbc.globalFunctionD['input'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1 && args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1){
    var argblock = py2block.convert(args[0]);
    return block("inout_type_input", func.lineno, {
         "DIR":"str"
    }, {
        'VAR':argblock
    }, {
        "inline": "true"
    });}
    if (args.length == 0){
    
    return block("inout_type_input", func.lineno, {
         "DIR":"str"
    }, {
        //'VAR':argblock
    }, {
        "inline": "true"
    });}
}


//int(input('prompt'))在math.js中实现
//float(input('prompt'))在lists.js中实现

pbc.globalFunctionD['print'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 1 && keywords.length === 1
        && py2block.identifier(keywords[0].arg) === "end"
        && keywords[0].value._astname === "Str"
        && py2block.Str_value(keywords[0].value) === ""
    ) {  //print('Hello',end ="")
        var argblock = py2block.convert(args[0]);
        return [block("inout_print_inline", func.lineno, {}, {
            'VAR':argblock
        }, {
            "inline": "false"
        })];
    }else if (args.length === 1 && keywords.length === 0) { //print('Hello')
        var argblock = py2block.convert(args[0]);
        return [block("inout_print", func.lineno, {}, {
            'VAR':argblock
        }, {
            "inline": "false"
        })];
    }else if (args.length === 0 && keywords.length === 0) { //print()
        
        return [block("inout_print", func.lineno, {}, {
            //'VAR':""
        }, {
            "inline": "false"
        })];
    }else{
        throw new Error("Incorrect number of arguments");
    }
}
