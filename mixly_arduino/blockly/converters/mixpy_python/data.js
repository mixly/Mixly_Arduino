'use strict';

pbc.assignD.get('Series')['check_assign'] = function (py2block, node, targets, value) {
    if(value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if (value._astname === "Call" && moduleName === "pandas"
        && funcName === "Series" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('Series')['create_block'] = function (py2block, node, targets, value) {
    var series = py2block.Name_str(node.targets[0]);
    var argblock = py2block.convert(value.args[0]);
    var param = value.keywords[0];
    if (value.keywords.length == 0){
        return [block('series_create', node.lineno, {
            'VAR': series            
        }, {
            'SER': argblock
        })];
    }
    else if(value.keywords.length == 1&&param.arg.v =="index"){
        var listblock = py2block.convert(value.keywords[0].value);
    return [block('series_create_from_index', node.lineno, {
            'VAR': series            
        }, {
            'SER': argblock,
            'INDEX': listblock
        })];
    }
}

pbc.moduleFunctionD.get('pylab')['show'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("pl_show", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('pylab')['legend'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("pl_legend", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('pylab')['title'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("pl_title", func.lineno, {}, {
        'TITLE': argblock
    }, {
            "inline": "true"
        })];
}

function dataxylabel(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var argblock = py2block.convert(args[0]);
        return [block("pl_label", func.lineno, {
            "DIR":mode
        }, {
        'LABEL': argblock
    }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.moduleFunctionD.get('pylab')['xlabel'] = dataxylabel('x');
pbc.moduleFunctionD.get('pylab')['ylabel'] = dataxylabel('y');