'use strict';

pbc.moduleFunctionD.get('cv2')['imread'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
        return block("cv_read_image", func.lineno, {}, {
                'FILE': arg1block
        }, {
                "inline": "true"
            });
}

pbc.moduleFunctionD.get('cv2')['CascadeClassifier'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
        return block("cv_face_classifier", func.lineno, {}, {
                'FILE': arg1block
        }, {
                "inline": "true"
            });
}

pbc.moduleFunctionD.get('cv2')['imshow'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("cv_show_image", func.lineno, {}, {
                'data': arg1block,
                'FILE':arg2block
        }, {
                "inline": "true"
            })];
}

pbc.moduleFunctionD.get('cv2')['imwrite'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
        var arg2block = py2block.convert(args[1]);
        return [block("cv_write_image", func.lineno, {}, {
                'data': arg1block,
                'FILE':arg2block
        }, {
                "inline": "true"
            })];
}

pbc.moduleFunctionD.get('cv2')['waitKey'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);        
        return [block("cv_waitkey", func.lineno, {}, {
                'data': arg1block
        }, {
                "inline": "true"
            })];
}

pbc.moduleFunctionD.get('cv2')['destroyAllWindows'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }      
        return [block("cv_destroy_all", func.lineno, {}, {}, {
                "inline": "true"
            })];
}


function cvRectLine(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {    
    if (args.length != 5) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
    
    var x1 = args[1].elts[0]
    var y1 = args[1].elts[1]
    var x2 = args[2].elts[0]
    var y2 = args[2].elts[1]

    var colorv='#'    
    if(args[3].elts[2].n.v.toString(16).length==1){
        colorv+='0'
    }     
    colorv+=args[3].elts[2].n.v.toString(16)
    if(args[3].elts[1].n.v.toString(16).length==1){
        colorv+='0'
    }     
    colorv+=args[3].elts[1].n.v.toString(16)
    if(args[3].elts[0].n.v.toString(16).length==1){
        colorv+='0'
    }     
    colorv+=args[3].elts[0].n.v.toString(16)
    var color = {
            _astname: "Str",
            s: {
                'v': colorv
            }
        }      
    var x1block = py2block.convert(x1); 
    var x2block = py2block.convert(x2); 
    var y1block = py2block.convert(y1); 
    var y2block = py2block.convert(y2);
    var colorblock = py2block.Str_value(color);    
    var arg5block = py2block.convert(args[4]);       
    return [block("cv_line_rect", func.lineno, {
        'DIR':mode,
        'FIELDNAME':colorblock
    }, {
                'FILE': arg1block,
                'x1':x1block,
                'y1':y1block,
                'x2':x2block,
                'y2':y2block,
                'thick':arg5block,
                
        }, {
                "inline": "true"
            })];
}
    return converter;
}

pbc.moduleFunctionD.get('cv2')['rectangle'] = cvRectLine('rectangle')
pbc.moduleFunctionD.get('cv2')['line'] = cvRectLine('line')

pbc.moduleFunctionD.get('cv2')['putText'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 7) {
        throw new Error("Incorrect number of arguments");
    }
    var arg1block = py2block.convert(args[0]);
    var arg2block = py2block.convert(args[1]);
    var x1 = args[2].elts[0]
    var y1 = args[2].elts[1]
    
    var colorv='#'    
    if(args[5].elts[2].n.v.toString(16).length==1){
        colorv+='0'
    }     
    colorv+=args[5].elts[2].n.v.toString(16)
    if(args[5].elts[1].n.v.toString(16).length==1){
        colorv+='0'
    }     
    colorv+=args[5].elts[1].n.v.toString(16)
    if(args[5].elts[0].n.v.toString(16).length==1){
        colorv+='0'
    }     
    colorv+=args[5].elts[0].n.v.toString(16)
    var color = {
            _astname: "Str",
            s: {
                'v': colorv
            }
        }      
    var x1block = py2block.convert(x1); 
    var y1block = py2block.convert(y1); 
    var colorblock = py2block.Str_value(color);    
    var arg5block = py2block.convert(args[4]);
    var arg7block = py2block.convert(args[6]);   
    var font = args[3].attr.v.slice(13)    
    return [block("cv_text", func.lineno, {
        'font':font,
        'FIELDNAME':colorblock
    }, {
                'FILE': arg1block,
                'data':arg2block,
                'x1':x1block,
                'y1':y1block,
                'size':arg5block,
                'thick':arg7block,
                
        }, {
                "inline": "true"
            })];
}

pbc.objectFunctionD.get('detectMultiScale')['face'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 || keywords.length < 2) {
        throw new Error("Incorrect number of arguments");
    }
        var arg1block = py2block.convert(args[0]);
        var faceblock = py2block.convert(func.value);
    if(keywords.length == 2){
        var keylist = new Array(2)
        for(var i=0;i<keywords.length;i++){
            var tag = py2block.identifier(keywords[i].arg)
            if (tag=='scaleFactor'){
                keylist[0]=py2block.convert(keywords[i].value);
            }
            else if(tag=='minNeighbors'){
                keylist[1]=py2block.convert(keywords[i].value);
            }
        }

    return block("cv_face_detect", func.lineno, {},{
        'FILE': arg1block,
        "FACE":faceblock,
        'SCALE':keylist[0],
        'NEIGHBOR':keylist[1]
    
    },{
        "inline": "true"
    });}
    if(keywords.length == 4){
        var keylist = new Array(6)
        for(var i=0;i<keywords.length;i++){
            var tag = py2block.identifier(keywords[i].arg)
            if (tag=='scaleFactor'){
                keylist[0]=py2block.convert(keywords[i].value);
            }
            else if(tag=='minNeighbors'){
                keylist[1]=py2block.convert(keywords[i].value);
            }
            else if(tag=='minSize'){
                keylist[2]=py2block.convert(keywords[i].value.elts[0]);
                keylist[3]=py2block.convert(keywords[i].value.elts[1]);
            }
            else if(tag=='maxSize'){
                keylist[4]=py2block.convert(keywords[i].value.elts[0]);
                keylist[5]=py2block.convert(keywords[i].value.elts[1]);
            }
        }
    
    return block("cv_face_detect_all", func.lineno, {},{
        'FILE': arg1block,
        "FACE":faceblock,
        'SCALE':keylist[0],
        'NEIGHBOR':keylist[1],
        'x1':keylist[2],
        'y1':keylist[3],
        'x2':keylist[4],
        'y2':keylist[5]
    },{
        "inline": "true"
    });}
};
