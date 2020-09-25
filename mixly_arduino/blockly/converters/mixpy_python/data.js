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


pbc.moduleFunctionD.get('pylab')['axes'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0||keywords.length!=1||keywords[0].arg.v!='aspect') {
        throw new Error("Incorrect number of arguments");
    }
    return [block("pl_axes", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('pylab')['hist'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("pl_hist", func.lineno, {
            'DIR':"plot"
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
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

function dataxyticks(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments");
        }
        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("pl_ticks", func.lineno, {
            "DIR":mode
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
                "inline": "true"
            })];
    }
    return converter;
}

pbc.moduleFunctionD.get('pylab')['xticks'] = dataxyticks('x');
pbc.moduleFunctionD.get('pylab')['yticks'] = dataxyticks('y');

function dataNumpyTrig(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var argblock = py2block.convert(args[0]);
        return block("numpy_trig", func.lineno, {
            "OP":mode
        }, {
                'NUM': argblock,
        }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.moduleFunctionD.get('numpy')['sin'] = dataNumpyTrig('sin');
pbc.moduleFunctionD.get('numpy')['cos'] = dataNumpyTrig('cos');
pbc.moduleFunctionD.get('numpy')['tan'] = dataNumpyTrig('tan');
pbc.moduleFunctionD.get('numpy')['arcsin'] = dataNumpyTrig('arcsin');
pbc.moduleFunctionD.get('numpy')['arctan'] = dataNumpyTrig('arctan');
pbc.moduleFunctionD.get('numpy')['arccos'] = dataNumpyTrig('arccos');
pbc.moduleFunctionD.get('numpy')['round'] = dataNumpyTrig('round');
pbc.moduleFunctionD.get('numpy')['ceil'] = dataNumpyTrig('ceil');
pbc.moduleFunctionD.get('numpy')['floor'] = dataNumpyTrig('floor');

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

pbc.moduleFunctionD.get('pylab')['scatter'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }

    var arg1block = py2block.convert(args[0]);
    var arg2block = py2block.convert(args[1]);
    var key1block = py2block.convert(keywords[0].value);
    var key2block = py2block.Str_value(keywords[1].value);
    var key3block = py2block.Str_value(keywords[2].value);  
    var key4block = py2block.convert(keywords[3].value);
    key2block = key2block.substring(3,key2block.length - 1);
    key3block = key3block.substring(7,key3block.length - 1);
    return [block("pl_plot_scatter", func.lineno, {
            'DOT':key3block,
            'COLOR':key2block
    }, {
            'A': arg1block,
            'B': arg2block,
            'S': key1block,
            'TAG': key4block
    }, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('pylab')['plot'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1&&args.length != 2&&args.length != 3) {
        throw new Error("Incorrect number of arguments");
    }
    
    
    if (args.length == 1){
        var argblock = py2block.convert(args[0]);
        return [block("pl_plot_easy", func.lineno, {
        }, {
                'SER': argblock
        }, {
                "inline": "true"
            })];
    }
    else if(args.length == 2){
        if(args[1]._astname == 'Str'){

        var argblock = py2block.convert(args[0]);
        var lineblock = args[1].s.v;
        if (lineblock.length>4) {
        throw new Error("Incorrect number of arguments");
    }
        var dottype = ',';
        var linetype = '';
        var colortype = 'b';
        for(var i=0;i<lineblock.length;i++){
            if(lineblock[i]=='-'&&(lineblock[i+1]=='-'||lineblock[i+1]=='.')){
                linetype=lineblock[i]+lineblock[i+1];
                i++;
            } 
            else{
                var operate=lineblock[i];
            
            switch(operate){
                case '-':
                linetype=operate;
                break;

                case ':':
                linetype=operate;
                break;

                case 'b':
                colortype=operate;
                break;

                case 'g':
                colortype=operate;
                break;

                case 'r':
                colortype=operate;
                break;

                case 'c':
                colortype=operate;
                break;

                case 'm':
                colortype=operate;
                break;

                case 'y':
                colortype=operate;
                break;

                case 'k':
                colortype=operate;
                break;

                case 'w':
                colortype=operate;
                break;

                case '.':
                dottype=operate;
                break;

                case '^':
                dottype=operate;
                break;

                case '2':
                dottype=operate;
                break;

                case 'p':
                dottype=operate;
                break;

                case '+':
                dottype=operate;
                break;

                case '|':
                dottype=operate;
                break;

                case ',':
                dottype=operate;
                break;

                case '<':
                dottype=operate;
                break;

                case '3':
                dottype=operate;
                break;

                case '*':
                dottype=operate;
                break;

                case 'x':
                dottype=operate;
                break;

                case '_':
                dottype=operate;
                break;

                case 'o':
                dottype=operate;
                break;

                case '>':
                dottype=operate;
                break;

                case '4':
                dottype=operate;
                break;

                case 'h':
                dottype=operate;
                break;

                case 'D':
                dottype=operate;
                break;

                case 'v':
                dottype=operate;
                break;

                case '1':
                dottype=operate;
                break;

                case 's':
                dottype=operate;
                break;

                case 'd':
                dottype=operate;
                break;

                case 'H':
                dottype=operate;
                break;
            }

            }
        }

        return [block("pl_plot", func.lineno, {
                'DOT':dottype,
                'LINE':linetype,
                'COLOR':colortype
        }, {
                'SER': argblock
        }, {
                "inline": "true"
            })];
    }
    else{
        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("pl_plot_bar", func.lineno, {
            'DIR':"plot"
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
                "inline": "true"
            })];
    }
    }
    else if(args.length == 3){

        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        var lineblock = args[2].s.v;
        if (lineblock.length>4) {
        throw new Error("Incorrect number of arguments");
        }
        var dottype = ',';
        var linetype = '';
        var colortype = 'b';
        for(var i=0;i<lineblock.length;i++){
            if(lineblock[i]=='-'&&(lineblock[i+1]=='-'||lineblock[i+1]=='.')){
                linetype=lineblock[i]+lineblock[i+1];
                i++;
            } 
            else{
                var operate=lineblock[i];
            
            switch(operate){
                case '-':
                linetype=operate;
                break;

                case ':':
                linetype=operate;
                break;

                case 'b':
                colortype=operate;
                break;

                case 'g':
                colortype=operate;
                break;

                case 'r':
                colortype=operate;
                break;

                case 'c':
                colortype=operate;
                break;

                case 'm':
                colortype=operate;
                break;

                case 'y':
                colortype=operate;
                break;

                case 'k':
                colortype=operate;
                break;

                case 'w':
                colortype=operate;
                break;

                case '.':
                dottype=operate;
                break;

                case '^':
                dottype=operate;
                break;

                case '2':
                dottype=operate;
                break;

                case 'p':
                dottype=operate;
                break;

                case '+':
                dottype=operate;
                break;

                case '|':
                dottype=operate;
                break;

                case ',':
                dottype=operate;
                break;

                case '<':
                dottype=operate;
                break;

                case '3':
                dottype=operate;
                break;

                case '*':
                dottype=operate;
                break;

                case 'x':
                dottype=operate;
                break;

                case '_':
                dottype=operate;
                break;

                case 'o':
                dottype=operate;
                break;

                case '>':
                dottype=operate;
                break;

                case '4':
                dottype=operate;
                break;

                case 'h':
                dottype=operate;
                break;

                case 'D':
                dottype=operate;
                break;

                case 'v':
                dottype=operate;
                break;

                case '1':
                dottype=operate;
                break;

                case 's':
                dottype=operate;
                break;

                case 'd':
                dottype=operate;
                break;

                case 'H':
                dottype=operate;
                break;
            }

            }
        }
        var args0 = {
            _astname: "Str",
            n: {
                'v': ""
            }
        }
        if(keywords.length==1&&keywords[0].arg.v=='label'){
            args0=py2block.convert(keywords[0].value)
        }   
        return [block("pl_plot_xy", func.lineno, {
                'DOT':dottype,
                'LINE':linetype,
                'COLOR':colortype
        }, {
                'A': arg1block,
                'B':arg2block,
                'TAG':args0
        }, {
                "inline": "true"
            })];
    }
}

pbc.moduleFunctionD.get('pylab')['bar'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length >2) {
        throw new Error("Incorrect number of arguments");
    }
    
    
    if (args.length == 2){
        if(keywords.length==0){
            var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("pl_plot_bar", func.lineno, {
            'DIR':"bar"
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
                "inline": "true"
            })];
        }
        else{
        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);

        for(var i=0;i<keywords.length;i++){
            if (keywords[i].arg.v=='align'){
                var align=py2block.Str_value(keywords[i].value)
            }
            else if(keywords[i].arg.v=='color'){
                var color = py2block.Str_value(keywords[i].value)
            }
            else if(keywords[i].arg.v=='width'){
                var width = py2block.convert(keywords[i].value)
            }
            else if(keywords[i].arg.v=='label'){
                var tag = py2block.convert(keywords[i].value)
            }
        }
        return [block("pl_bar", func.lineno, {
            'ALIGN':align,
            "COLOR":color,
        }, {
                'A': arg1block,
                'B':arg2block,
                'WIDTH':width,
                'TAG':tag
        }, {
                "inline": "true"
            })];
    }
    }
}    

function series_index_value(py2block, node, value, attr) {
    return block('series_index_value', node.lineno, {
        'INDEX_VALUE': py2block.identifier(attr)
    }, {
        'SERIES': py2block.convert(value)
    });
}

pbc.objectAttrD.get('index')['Series'] = series_index_value;
pbc.objectAttrD.get('value')['Series'] = series_index_value;

pbc.moduleFunctionD.get('numpy')['arange'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length > 3 || args.length < 1) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block, arg2block, arg3block;
    if (args.length == 1) {
        arg2block = py2block.convert(args[0]);
        var args0 = {
            _astname: "Num",
            n: {
                'v': 0
            }

        };
        arg1block = py2block.convert(args0);
        var args2 = {
            _astname: "Num",
            n: {
                'v': 1
            }
        };
        arg3block = py2block.convert(args2);
    }else if (args.length == 2) {
        var args2 = {
            _astname: "Num",
            n: {
                'v': 1
            }
        };
        arg1block = py2block.convert(args[0]);
        arg2block = py2block.convert(args[1]);
        arg3block = py2block.convert(args2);
    }else {
        arg1block = py2block.convert(args[0]);
        arg2block = py2block.convert(args[1]);
        arg3block = py2block.convert(args[2]);
    }
    return block("array_create", func.lineno, {}, {
        'FROM': arg1block,
        'TO': arg2block,
        'STEP': arg3block
    }, {
            "inline": "true"
        });
}

pbc.moduleFunctionD.get('pylab')['subplot'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 3 ) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block, arg2block, arg3block;
     {
        arg1block = py2block.convert(args[0]);
        arg2block = py2block.convert(args[1]);
        arg3block = py2block.convert(args[2]);
    }
    return [block("pl_subplot", func.lineno, {}, {
        'VET': arg1block,
        'HOR': arg2block,
        'NUM': arg3block
    }, {
            "inline": "true"
        })];
}


pbc.moduleFunctionD.get('pandas')['read_csv'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1 ) {
        throw new Error("Incorrect number of arguments");
    }
    
        var argblock = py2block.convert(args[0]);
        if(keywords.length>0){
        if (keywords[0].value._astname=='Num'){
        var args0=keywords[0].value.n.v
    }
    else if (keywords[0].value._astname=='Name'){
        var args0=keywords[0].value.id.v
    }
}
    else{
        var args0=0
    }
    return block("pandas_readcsv", func.lineno, {
        'MODE':args0
    }, {
        'FILENAME': argblock,
        
    }, {
            "inline": "true"
        });
}

pbc.moduleFunctionD.get('pylab')['savefig'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("pl_savefig", func.lineno, {}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('pylab')['text'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 3 ) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block, arg2block, arg3block;
     {
        arg1block = py2block.convert(args[0]);
        arg2block = py2block.convert(args[1]);
        arg3block = py2block.convert(args[2]);
    }
    for(var i=0;i<keywords.length;i++){
            if (keywords[i].arg.v=='ha'){
                var ha=keywords[i].value.s.v
            }
            else if(keywords[i].arg.v=='va'){
                var va = keywords[i].value.s.v
            }
            else if(keywords[i].arg.v=='fontsize'){
                var ft = py2block.convert(keywords[i].value)
            }
        }
    return [block("pl_text", func.lineno, {
        'HALIGN':ha,
        'VALIGN':va
    }, {
        'VET': arg1block,
        'HOR': arg2block,
        'NUM': arg3block,
        'FONTNUM':ft

    }, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('pylab')['pie'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length >1) {
        throw new Error("Incorrect number of arguments");
    }
    
    
    
        
        var arg1block = py2block.convert(args[0]);
        

        for(var i=0;i<keywords.length;i++){
            if (keywords[i].arg.v=='explode'){
                var explode=py2block.convert(keywords[i].value)
            }
            else if(keywords[i].arg.v=='autopct'){
                if(keywords[i].value._astname=='Str'){
                var autopct = keywords[i].value.s.v
            }
            else if(keywords[i].value._astname=='Name'){
                var autopct = keywords[i].value.id.v
            }
            }
            else if(keywords[i].arg.v=='labels'){
                var label = py2block.convert(keywords[i].value)
            }
            else if(keywords[i].arg.v=='shadow'){
                var shadow = keywords[i].value.id.v
            }
        }
        return [block("pl_pie", func.lineno, {
            'SHADOW':shadow,
            "autopct":autopct,
        }, {
                'A': arg1block,
                'B':label,
                'EXPLODE':explode,
        }, {
                "inline": "true"
            })];
    
    
}    

pbc.moduleFunctionD.get('numpy')['array'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return block("array_toarray", func.lineno, {}, {
        'VAR': varblock
    }, {
        "inline": "true"
    });
}    



pbc.moduleFunctionD.get('matplotlib.pyplot')['show'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("plot_show", func.lineno, {}, {}, {
            "inline": "true"
        })];
}


pbc.moduleFunctionD.get('matplotlib.pyplot')['axes'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0||keywords.length!=1||keywords[0].arg.v!='aspect') {
        throw new Error("Incorrect number of arguments");
    }
    return [block("plot_axes", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['hist'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("plot_hist", func.lineno, {
            'DIR':"plot"
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
                "inline": "true"
            })];
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['legend'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("plot_legend", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['title'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("plot_title", func.lineno, {}, {
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
        return [block("plot_label", func.lineno, {
            "DIR":mode
        }, {
        'LABEL': argblock
    }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['xlabel'] = dataxylabel('x');
pbc.moduleFunctionD.get('matplotlib.pyplot')['ylabel'] = dataxylabel('y');

function dataxyticks(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments");
        }
        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("plot_ticks", func.lineno, {
            "DIR":mode
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
                "inline": "true"
            })];
    }
    return converter;
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['xticks'] = dataxyticks('x');
pbc.moduleFunctionD.get('matplotlib.pyplot')['yticks'] = dataxyticks('y');

pbc.moduleFunctionD.get('matplotlib.pyplot')['scatter'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }

    var arg1block = py2block.convert(args[0]);
    var arg2block = py2block.convert(args[1]);
    var key1block = py2block.convert(keywords[0].value);
    var key2block = py2block.Str_value(keywords[1].value);
    var key3block = py2block.Str_value(keywords[2].value);  
    var key4block = py2block.convert(keywords[3].value);
    key2block = key2block.substring(3,key2block.length - 1);
    key3block = key3block.substring(7,key3block.length - 1);
    return [block("plot_plot_scatter", func.lineno, {
            'DOT':key3block,
            'COLOR':key2block
    }, {
            'A': arg1block,
            'B': arg2block,
            'S': key1block,
            'TAG': key4block
    }, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['plot'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1&&args.length != 2&&args.length != 3) {
        throw new Error("Incorrect number of arguments");
    }
    
    
    if (args.length == 1){
        var argblock = py2block.convert(args[0]);
        return [block("plot_plot_easy", func.lineno, {
        }, {
                'SER': argblock
        }, {
                "inline": "true"
            })];
    }
    else if(args.length == 2){
        if(args[1]._astname == 'Str'){

        var argblock = py2block.convert(args[0]);
        var lineblock = args[1].s.v;
        if (lineblock.length>4) {
        throw new Error("Incorrect number of arguments");
    }
        var dottype = ',';
        var linetype = '';
        var colortype = 'b';
        for(var i=0;i<lineblock.length;i++){
            if(lineblock[i]=='-'&&(lineblock[i+1]=='-'||lineblock[i+1]=='.')){
                linetype=lineblock[i]+lineblock[i+1];
                i++;
            } 
            else{
                var operate=lineblock[i];
            
            switch(operate){
                case '-':
                linetype=operate;
                break;

                case ':':
                linetype=operate;
                break;

                case 'b':
                colortype=operate;
                break;

                case 'g':
                colortype=operate;
                break;

                case 'r':
                colortype=operate;
                break;

                case 'c':
                colortype=operate;
                break;

                case 'm':
                colortype=operate;
                break;

                case 'y':
                colortype=operate;
                break;

                case 'k':
                colortype=operate;
                break;

                case 'w':
                colortype=operate;
                break;

                case '.':
                dottype=operate;
                break;

                case '^':
                dottype=operate;
                break;

                case '2':
                dottype=operate;
                break;

                case 'p':
                dottype=operate;
                break;

                case '+':
                dottype=operate;
                break;

                case '|':
                dottype=operate;
                break;

                case ',':
                dottype=operate;
                break;

                case '<':
                dottype=operate;
                break;

                case '3':
                dottype=operate;
                break;

                case '*':
                dottype=operate;
                break;

                case 'x':
                dottype=operate;
                break;

                case '_':
                dottype=operate;
                break;

                case 'o':
                dottype=operate;
                break;

                case '>':
                dottype=operate;
                break;

                case '4':
                dottype=operate;
                break;

                case 'h':
                dottype=operate;
                break;

                case 'D':
                dottype=operate;
                break;

                case 'v':
                dottype=operate;
                break;

                case '1':
                dottype=operate;
                break;

                case 's':
                dottype=operate;
                break;

                case 'd':
                dottype=operate;
                break;

                case 'H':
                dottype=operate;
                break;
            }

            }
        }

        return [block("plot_plot", func.lineno, {
                'DOT':dottype,
                'LINE':linetype,
                'COLOR':colortype
        }, {
                'SER': argblock
        }, {
                "inline": "true"
            })];
    }
    else{
        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("plot_plot_bar", func.lineno, {
            'DIR':"plot"
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
                "inline": "true"
            })];
    }
    }
    else if(args.length == 3){

        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        var lineblock = args[2].s.v;
        if (lineblock.length>4) {
        throw new Error("Incorrect number of arguments");
        }
        var dottype = ',';
        var linetype = '';
        var colortype = 'b';
        for(var i=0;i<lineblock.length;i++){
            if(lineblock[i]=='-'&&(lineblock[i+1]=='-'||lineblock[i+1]=='.')){
                linetype=lineblock[i]+lineblock[i+1];
                i++;
            } 
            else{
                var operate=lineblock[i];
            
            switch(operate){
                case '-':
                linetype=operate;
                break;

                case ':':
                linetype=operate;
                break;

                case 'b':
                colortype=operate;
                break;

                case 'g':
                colortype=operate;
                break;

                case 'r':
                colortype=operate;
                break;

                case 'c':
                colortype=operate;
                break;

                case 'm':
                colortype=operate;
                break;

                case 'y':
                colortype=operate;
                break;

                case 'k':
                colortype=operate;
                break;

                case 'w':
                colortype=operate;
                break;

                case '.':
                dottype=operate;
                break;

                case '^':
                dottype=operate;
                break;

                case '2':
                dottype=operate;
                break;

                case 'p':
                dottype=operate;
                break;

                case '+':
                dottype=operate;
                break;

                case '|':
                dottype=operate;
                break;

                case ',':
                dottype=operate;
                break;

                case '<':
                dottype=operate;
                break;

                case '3':
                dottype=operate;
                break;

                case '*':
                dottype=operate;
                break;

                case 'x':
                dottype=operate;
                break;

                case '_':
                dottype=operate;
                break;

                case 'o':
                dottype=operate;
                break;

                case '>':
                dottype=operate;
                break;

                case '4':
                dottype=operate;
                break;

                case 'h':
                dottype=operate;
                break;

                case 'D':
                dottype=operate;
                break;

                case 'v':
                dottype=operate;
                break;

                case '1':
                dottype=operate;
                break;

                case 's':
                dottype=operate;
                break;

                case 'd':
                dottype=operate;
                break;

                case 'H':
                dottype=operate;
                break;
            }

            }
        }
        var args0 = {
            _astname: "Str",
            n: {
                'v': ""
            }
        }
        if(keywords.length==1&&keywords[0].arg.v=='label'){
            args0=py2block.convert(keywords[0].value)
        }   
        return [block("plot_plot_xy", func.lineno, {
                'DOT':dottype,
                'LINE':linetype,
                'COLOR':colortype
        }, {
                'A': arg1block,
                'B':arg2block,
                'TAG':args0
        }, {
                "inline": "true"
            })];
    }
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['bar'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length >2) {
        throw new Error("Incorrect number of arguments");
    }
    
    
    if (args.length == 2){
        if(keywords.length==0){
            var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("plot_plot_bar", func.lineno, {
            'DIR':"bar"
        }, {
                'A': arg1block,
                'B':arg2block
        }, {
                "inline": "true"
            })];
        }
        else{
        var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);

        for(var i=0;i<keywords.length;i++){
            if (keywords[i].arg.v=='align'){
                var align=py2block.Str_value(keywords[i].value)
            }
            else if(keywords[i].arg.v=='color'){
                var color = py2block.Str_value(keywords[i].value)
            }
            else if(keywords[i].arg.v=='width'){
                var width = py2block.convert(keywords[i].value)
            }
            else if(keywords[i].arg.v=='label'){
                var tag = py2block.convert(keywords[i].value)
            }
        }
        return [block("plot_bar", func.lineno, {
            'ALIGN':align,
            "COLOR":color,
        }, {
                'A': arg1block,
                'B':arg2block,
                'WIDTH':width,
                'TAG':tag
        }, {
                "inline": "true"
            })];
    }
    }
}    

pbc.moduleFunctionD.get('matplotlib.pyplot')['savefig'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("plot_savefig", func.lineno, {}, {
         "FILE" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['text'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 3 ) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block, arg2block, arg3block;
     {
        arg1block = py2block.convert(args[0]);
        arg2block = py2block.convert(args[1]);
        arg3block = py2block.convert(args[2]);
    }
    for(var i=0;i<keywords.length;i++){
            if (keywords[i].arg.v=='ha'){
                var ha=keywords[i].value.s.v
            }
            else if(keywords[i].arg.v=='va'){
                var va = keywords[i].value.s.v
            }
            else if(keywords[i].arg.v=='fontsize'){
                var ft = py2block.convert(keywords[i].value)
            }
        }
    return [block("plot_text", func.lineno, {
        'HALIGN':ha,
        'VALIGN':va
    }, {
        'VET': arg1block,
        'HOR': arg2block,
        'NUM': arg3block,
        'FONTNUM':ft

    }, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('matplotlib.pyplot')['pie'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length >1) {
        throw new Error("Incorrect number of arguments");
    }
    
    
    
        
        var arg1block = py2block.convert(args[0]);
        

        for(var i=0;i<keywords.length;i++){
            if (keywords[i].arg.v=='explode'){
                var explode=py2block.convert(keywords[i].value)
            }
            else if(keywords[i].arg.v=='autopct'){
                if(keywords[i].value._astname=='Str'){
                var autopct = keywords[i].value.s.v
            }
            else if(keywords[i].value._astname=='Name'){
                var autopct = keywords[i].value.id.v
            }
            }
            else if(keywords[i].arg.v=='labels'){
                var label = py2block.convert(keywords[i].value)
            }
            else if(keywords[i].arg.v=='shadow'){
                var shadow = keywords[i].value.id.v
            }
        }
        return [block("plot_pie", func.lineno, {
            'SHADOW':shadow,
            "autopct":autopct,
        }, {
                'A': arg1block,
                'B':label,
                'EXPLODE':explode,
        }, {
                "inline": "true"
            })];
    
    
}   



