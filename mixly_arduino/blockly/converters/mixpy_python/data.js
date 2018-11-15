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
        return block('series_create', node.lineno, {
            'VAR': series            
        }, {
            'SER': argblock
        });
    }
    else if(value.keywords.length == 1&&param.arg.v =="index"){
        var listblock = py2block.convert(value.keywords[0].value);
    return block('series_create_from_index', node.lineno, {
            'VAR': series            
        }, {
            'SER': argblock,
            'INDEX': listblock
        });
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

pbc.assignD.get('DataFrame')['check_assign'] = function (py2block, node, targets, value) {
    if(value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if (value._astname === "Call" && moduleName === "pandas"
        && funcName === "DataFrame" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('DataFrame')['create_block'] = function (py2block, node, targets, value) {
    var series = py2block.Name_str(node.targets[0]);
    var argblock = py2block.convert(value.args[0]);
    var param = value.keywords[0];
    if (value.keywords.length == 0){
        return block('dataframe_create', node.lineno, {
            'VAR': series            
        }, {
            'SER': argblock
        });
    }
    else if(value.keywords.length == 1&&value.keywords[0].arg.v =="index"){
        var listblock = py2block.convert(value.keywords[0].value);
        return block('dataframe_create_from_one_index', node.lineno, {
            'VAR': series,  
            'COLUMN_RAW':"index"          
        }, {
            'SER': argblock,
            'INDEX': listblock
        });
    }
    else if(value.keywords.length == 1&&value.keywords[0].arg.v =="columns"){
        var listblock = py2block.convert(value.keywords[0].value);
        return block('dataframe_create_from_one_index', node.lineno, {
            'VAR': series,
            'COLUMN_RAW':"columns"           
        }, {
            'SER': argblock,
            'INDEX': listblock
        });
    }
    else if(value.keywords.length == 2&&((value.keywords[0].arg.v =="columns"&&value.keywords[1].arg.v =="index")||(value.keywords[1].arg.v =="columns"&&value.keywords[0].arg.v =="index"))){
        var listblock0 = py2block.convert(value.keywords[0].value);
        var listblock1 = py2block.convert(value.keywords[1].value);
        if(value.keywords[0].arg.v =="columns"&&value.keywords[1].arg.v =="index"){ 
            return block('dataframe_create_from_index', node.lineno, {
                'VAR': series            
            }, {
                'SER': argblock,
                'INDEX_COLUMN': listblock0,
                'INDEX_RAW': listblock1
            });
        }
        if(value.keywords[1].arg.v =="columns"&&value.keywords[0].arg.v =="index"){ 
            return block('dataframe_create_from_index', node.lineno, {
                'VAR': series            
            }, {
                'SER': argblock,
                'INDEX_COLUMN': listblock1,
                'INDEX_RAW': listblock0
            });
        }    
    }
}

pbc.moduleFunctionD.get('pylab')['plot'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1&&args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    if (args.length == 1){
        return [block("pl_plot", func.lineno, {
                'DOT':',',
                'LINE':'-',
                'COLOR':'b'
        }, {
                'SER': argblock
        }, {
                "inline": "true"
            })];
    }
    else if(args.length == 2){
        var lineblock = py2block.convert(args[1]);
        
        return [block("pl_plot", func.lineno, {
                'DOT':',',
                'LINE':'-',
                'COLOR':'b'
        }, {
                'SER': argblock
        }, {
                "inline": "true"
            })];
    }
}