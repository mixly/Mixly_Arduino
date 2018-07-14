function defDict(type) {
    var dict = {};
    return {
        get: function (key) {
            if (!dict[key]) {
                dict[key] = type.constructor();
            }
            return dict[key];
        },
        dict: dict
    };
}

function Py2blockConfig (){
    this.isMicrobitpy = false;//microbit需要忽略最外层的While循环
    this.objectTypeD = {}; //key：变量名，value：变量类型，如{'a':'List'}
    this.ignoreFunctionL = [];
    /*
    this.initIgnoreFunctionL();
    this.initGlobalFunctionD();
    this.initAssignL();
    this.initModuleFunctionD();
    this.initObjectFunctionD();
    */
}

Py2blockConfig.prototype.objectFunctionD = defDict({});
Py2blockConfig.prototype.moduleFunctionD = defDict({});
Py2blockConfig.prototype.moduleAttrD = defDict({});
Py2blockConfig.prototype.globalFunctionD = {};
Py2blockConfig.prototype.assignD = defDict({});
Py2blockConfig.prototype.ifStatementD= defDict({});
Py2blockConfig.prototype.ignoreS = new Set();
Py2blockConfig.prototype.pinType = null;
Py2blockConfig.prototype.inScope = null;
Py2blockConfig.prototype.reset = function(){
    this.objectTypeD = {};
}
//文本转图形，需要忽略的全局函数（可能还有问题，待验证）
Py2blockConfig.prototype.initIgnoreFunctionL = function(){
    this.ignoreFunctionL = [
        'math_modes'
    ];
}

//全局函数，如print,input
Py2blockConfig.prototype.initGlobalFunctionD = function(){
    this.globalFunctionD = {
        'type': function (py2block, node, args, keywords, starargs, kwargs) {//type函数
            return block("base_type", node.lineno, {}, {"DATA": py2block.convert(args[0])});
        },
        'print': function (py2block, node, args, keywords, starargs, kwargs) { //print函数
            if (args.length == 1) {
                if(Object.keys(keywords).length == 0){
                    return [block("inout_print", node.lineno, {}, {
                        "VAR": py2block.convert(args[0])
                    })];
                }else{
                    //print("XX", end='')
                    if(keywords[0].arg.v === 'end' && Sk.ffi.remapToJs(keywords[0].value.s) === '')
                        return [block("inout_print_inline", node.lineno, {}, {
                            "VAR": py2block.convert(args[0])
                        })];
                    else
                        throw new Error("end param is not implemented!");
                }
            }else {
                return null;
            }
        },
        'input': function (py2block, node, args, keywords, starargs, kwargs) {//input函数
            return block("inout_input", node.lineno, {}, {"VAR": py2block.convert(args[0])});
        },
        'chr': function (py2block, node, args, keywords, starargs, kwargs) {//chr函数
            return block("ascii_to_char", node.lineno, {}, {"VAR": py2block.convert(args[0])});
        },
        'ord': function (py2block, node, args, keywords, starargs, kwargs) {//ord函数
            return block("char_to_ascii", node.lineno, {}, {"VAR": py2block.convert(args[0])});
        },
        'str': function (py2block, node, args, keywords, starargs, kwargs) {//str函数
            return block("number_to_text", node.lineno, {}, {"VAR": py2block.convert(args[0])});
        },
        'max': function (py2block, node, args, keywords, starargs, kwargs) {//max函数
            return block("math_max_min", node.lineno, {'OP':'max'}, {"A": py2block.convert(args[0]),"B": py2block.convert(args[1])});
        },
        'min': function (py2block, node, args, keywords, starargs, kwargs) {//min函数
            return block("math_max_min", node.lineno, {'OP':'min'}, {"A": py2block.convert(args[0]),"B": py2block.convert(args[1])});
        },
        'lists_remove_random_item': function (py2block, node, args, keywords, starargs, kwargs) {
            return block("lists_getIndex2", node.lineno, {"MODE": "GET_REMOVE", "WHERE": "RANDOM"}, {
                "VALUE": py2block.convert(args[0])
            });
        },
        'tuple': function (py2block, node, args, keywords, starargs, kwargs) {
            return  block("lists_change_to", node.lineno, {"OP": "tuple"}, {
                "VAR": py2block.convert(args[0])
            });
        },
        'set': function (py2block, node, args, keywords, starargs, kwargs) {
            return  block("lists_change_to", node.lineno, {"OP": "set"}, {
                "VAR": py2block.convert(args[0])
            });
        },
        'list': function (py2block, node, args, keywords, starargs, kwargs) {
            return  block("tuple_change_to", node.lineno, {"OP": "list"}, {
                "VAR": py2block.convert(args[0])
            });
        }
    }
}

// 需要特殊处理的赋值表达式，如tina= turtle.Turtle(), l = [0, 9, 0]; 否则按变量赋值处理
Py2blockConfig.prototype.initAssignL = function(){
    function isTurtleAssign(py2block, node, targets, value){
        if(value._astname === "Call"
            && value.func.attr.v === "Turtle"
            && value.func.value.id.v === "turtle")
            return true;
        return false;
    }
    function turtleCreateBlock(py2block, node, targets, value){
        return block("turtle_create", node.lineno, {'VAR':py2block.Name_str(targets[0])}, {});
    }
    function isListAssign(py2block, node, targets, value){
        if(value._astname === "List")
            return true;
        return false;
    }
    function listCreateBlock(py2block, node, targets, value){
        return block("lists_create_with2", node.lineno, {'VAR':py2block.Name_str(targets[0])},
            py2block.convertElements("ADD", value.elts)
            , {
                "inline": "false",
            }, {
                "@items": value.elts.length
            });
    }
    function isTupleAssign(py2block, node, targets, value){
        if(value._astname === "Tuple")
            return true;
        return false;
    }
    function tupleCreateBlock(py2block, node, targets, value){
        return block("tuple_create_with", node.lineno, {'VAR':py2block.Name_str(targets[0])},
            py2block.convertElements("ADD", value.elts)
            , {
                "inline": "false",
            }, {
                "@items": value.elts.length
            });
    }

    function isSetAssign(py2block, node, targets, value){
        if(value._astname === "Set")
            return true;
        return false;
    }
    function setCreateBlock(py2block, node, targets, value){
        return block("set_create_with", node.lineno, {'VAR':py2block.Name_str(targets[0])},
            py2block.convertElements("ADD", value.elts)
            , {
                "inline": "false",
            }, {
                "@items": value.elts.length
            });
    }
    this.assignL = [
        [isTurtleAssign, turtleCreateBlock],
        [isListAssign, listCreateBlock],
        [isTupleAssign, tupleCreateBlock],
        [isSetAssign, setCreateBlock],
    ];
}

//模块的方法，如time.time(), math.sin(0)
Py2blockConfig.prototype.initModuleFunctionD = function(){
    this.moduleFunctionD = {
        "time": {
            "time": ["controls_millis"]
        },
        "math":{
            "sin":["math_trig", {"type": "variable", "mode": "value", "name": "NUM", "is_math_angle":true}, ["OP", 'SIN']],
            "log":["math_trig", {"type": "variable", "mode": "value", "name": "NUM"}, ["OP", 'LN']]
        }
    }
}

//对象的方法，如mylist.append(0), tina.forward(20)
Py2blockConfig.prototype.initObjectFunctionD = function(){
    function listAppend(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .append");
        }
        // Return as statement
        return [block("lists_append_extend", func.lineno, {'OP':'append'}, {
            "data": py2block.convert(args[0]),
            "VAR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function listExtend(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .extend");
        }
        // Return as statement
        return [block("lists_append_extend", func.lineno, {'OP':'extend'}, {
            "data": py2block.convert(args[0]),
            "VAR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function listPop(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .pop");
        }

        var where = "FROM_START";
        if(args[0].n.v >= 0){
            args[0].n.v += 1;
            where = "FROM_START";
        }else if(args[0].n.v <0){
            args[0].n.v = 0 - args[0].n.v;
            where = "FROM_END";
        }

        return block("lists_getIndex2", func.lineno, {"MODE": "GET_REMOVE", "WHERE": where}, {
            "AT": py2block.convert(args[0]),
            "VALUE": py2block.convert(func.value),
        });
    }

    function listCount(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .count");
        }

        return block("lists_find", func.lineno, {"OP": "COUNT"}, {
            "VAR": py2block.convert(func.value),
            "data":py2block.convert(args[0])
        });
    }
    function listReverse(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .reverse");
        }
        // Return as statement
        return [block("lists_reverse", func.lineno, {}, {
            "VAR": py2block.convert(func.value)
        })];
    }

    function turtleForward(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .forward");
        }
        // Return as statement
        return [block("turtle_move", func.lineno, {'DIR':'forward'}, {
            "VAR": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleBackward(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .backward");
        }
        // Return as statement
        return [block("turtle_move", func.lineno, {'DIR':'backward'}, {
            "VAR": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleLeft(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .left");
        }
        // Return as statement
        return [block("turtle_rotate", func.lineno, {'DIR':'left'}, {
            "VAR": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleRight(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .right");
        }
        // Return as statement
        return [block("turtle_rotate", func.lineno, {'DIR':'right'}, {
            "VAR": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleSetheading(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .setheading");
        }
        // Return as statement
        return [block("turtle_setheading", func.lineno, {}, {
            "data": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleGoto(py2block, func, name, args){
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments to .goto");
        }
        // Return as statement
        return [block("turtle_goto", func.lineno, {}, {
            "data": py2block.convert(args[0]),
            "val": py2block.convert(args[1]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtlePos(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .append");
        }
        // Return as statement
        return [block("turtle_pos", func.lineno, {}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleClear(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .pos");
        }
        // Return as statement
        return [block("turtle_clear", func.lineno, {'DIR':'clear'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function dictClear(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .clear");
        }
        // Return as statement
        return [block("dicts_clear", func.lineno, {}, {
            "DICT": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleReset(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .reset");
        }
        // Return as statement
        return [block("turtle_clear", func.lineno, {'DIR':'reset'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleHome(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .home");
        }
        // Return as statement
        return [block("turtle_clear", func.lineno, {'DIR':'home'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtlePenup(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .penup");
        }
        // Return as statement
        return [block("turtle_penup", func.lineno, {'DIR':'penup'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtlePendown(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .pendown");
        }
        // Return as statement
        return [block("turtle_penup", func.lineno, {'DIR':'pendown'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtlePensize(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .pensize");
        }
        // Return as statement
        return [block("turtle_size", func.lineno, {}, {
            "data": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleShape(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .shape");
        }
        // Return as statement
        return [block("turtle_shape", func.lineno, {'DIR':args[0].s.v}, {
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleSpeed(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .speed");
        }
        // Return as statement
        return [block("turtle_speed", func.lineno, {}, {
            "data": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleCircle(py2block, func, name, args){
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments to .circle");
        }
        // Return as statement
        return [block("turtle_circle", func.lineno, {'DIR':'circle'}, {
            "VAR": py2block.convert(args[0]),
            "data": py2block.convert(args[1]),
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleDot(py2block, func, name, args){
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments to .dot");
        }
        // Return as statement
        return [block("turtle_circle", func.lineno, {'DIR':'dot'}, {
            "VAR": py2block.convert(args[0]),
            "data": py2block.convert(args[1]),
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleClone(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .clone");
        }
        // Return as statement
        return [block("turtle_clone", func.lineno, {}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleHideturtle(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .hideturtle");
        }
        // Return as statement
        return [block("turtle_visible", func.lineno, {'DIR':'hideturtle'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleShowturtle(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .showturtle");
        }
        // Return as statement
        return [block("turtle_visible", func.lineno, {'DIR':'showturtle'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleWrite(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .write");
        }
        // Return as statement
        return [block("turtle_write", func.lineno, {}, {
            "VAR": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleBeginfill(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .beginfill");
        }
        // Return as statement
        return [block("turtle_fill", func.lineno, {'DIR':'begin'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtleEndfill(py2block, func, name, args){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments to .endfill");
        }
        // Return as statement
        return [block("turtle_fill", func.lineno, {'DIR':'end'}, {
            "TUR": py2block.convert(func.value)

        }, {
            "inline": "true"
        })];
    }

    function turtlePencolor(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .pencolor");
        }
        // Return as statement
        return [block("turtle_pencolor_fillcolor_hex", func.lineno, {'DIR':'pen'}, {
            "VAR": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function turtleFillcolor(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .fillcolor");
        }
        // Return as statement
        return [block("turtle_pencolor_fillcolor_hex", func.lineno, {'DIR':'fill'}, {
            "VAR": py2block.convert(args[0]),
            "TUR": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function setUnion(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .setunion");
        }
        // Return as statement
        return [block("set_operate", func.lineno, {'OPERATE':'union'}, {
            "SET2": py2block.convert(args[0]),
            "SET1": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function setIntersection(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .insertsection");
        }
        // Return as statement
        return [block("set_operate", func.lineno, {'OPERATE':'intersection'}, {
            "SET2": py2block.convert(args[0]),
            "SET1": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function setDifference(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .difference");
        }
        // Return as statement
        return [block("set_operate", func.lineno, {'OPERATE':'difference'}, {
            "SET2": py2block.convert(args[0]),
            "SET1": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function setUpdate(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .update");
        }
        // Return as statement
        return [block("set_operate_update", func.lineno, {'OPERATE':'update'}, {
            "SET2": py2block.convert(args[0]),
            "SET1": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function setIntersectionupdate(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .intersection_update");
        }
        // Return as statement
        return [block("set_operate_update", func.lineno, {'OPERATE':'intersection_update'}, {
            "SET2": py2block.convert(args[0]),
            "SET1": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }

    function setDifferenceupdate(py2block, func, name, args){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments to .difference_update");
        }
        // Return as statement
        return [block("set_operate_update", func.lineno, {'OPERATE':'difference_update'}, {
            "SET2": py2block.convert(args[0]),
            "SET1": py2block.convert(func.value)
        }, {
            "inline": "true"
        })];
    }



    this.objectFunctionD = {
        "append": {
            "Default": listAppend,
            "List": listAppend
        },
        "extend": {
            "Default": listExtend,
            "List": listExtend
        },
        "pop": {
            "Default": listPop,
            "List": listPop
        },
        "count": {
            "Default": listCount,
            "List": listCount
        },
        "reverse":{
            "Default":listReverse,
            "List":listReverse,
        },
        "forward":{
            "Default":turtleForward,
            "Turtle":turtleForward
        },
        "backward":{
            "Default":turtleBackward,
            "Turtle":turtleBackward
        },
        "left":{
            "Default":turtleLeft,
            "Turtle":turtleLeft
        },
        "right":{
            "Default":turtleRight,
            "Turtle":turtleRight
        },
        "setheading":{
            "Default":turtleSetheading,
            "Turtle":turtleSetheading
        },
        "goto":{
            "Default":turtleGoto,
            "Turtle":turtleGoto
        },
        "pos":{
            "Default":turtlePos,
            "Turtle":turtlePos
        },
        "clear":{
            "Default":dictClear,
            "Turtle":turtleClear,
            "Dict":dictClear
        },
        "reset":{
            "Default":turtleReset,
            "Turtle":turtleReset
        },
        "home":{
            "Default":turtleHome,
            "Turtle":turtleHome
        },
        "penup":{
            "Default":turtlePenup,
            "Turtle":turtlePenup
        },
        "pendown":{
            "Default":turtlePendown,
            "Turtle":turtlePendown
        },
        "pensize":{
            "Default":turtlePensize,
            "Turtle":turtlePensize
        },
        "shape":{
            "Default":turtleShape,
            "Turtle":turtleShape
        },
        "speed":{
            "Default":turtleSpeed,
            "Turtle":turtleSpeed
        },
        "circle":{
            "Default":turtleCircle,
            "Turtle":turtleCircle
        },
        "dot":{
            "Default":turtleDot,
            "Turtle":turtleDot
        },
        "clone":{
            "Default":turtleClone,
            "Turtle":turtleClone
        },
        "hideturtle":{
            "Default":turtleHideturtle,
            "Turtle":turtleHideturtle
        },
        "showturtle":{
            "Default":turtleShowturtle,
            "Turtle":turtleShowturtle
        },
        "write":{
            "Default":turtleWrite,
            "Turtle":turtleWrite
        },
        "begin_fill":{
            "Default":turtleBeginfill,
            "Turtle":turtleBeginfill
        },
        "end_fill":{
            "Default":turtleEndfill,
            "Turtle":turtleEndfill
        },
        "pencolor":{
            "Default":turtlePencolor,
            "Turtle":turtlePencolor
        },
        "fillcolor":{
            "Default":turtleFillcolor,
            "Turtle":turtleFillcolor
        },
        "union":{
            "Default":setUnion,
            "Set":setUnion
        },
        "intersection":{
            "Default":setIntersection,
            "Set":setIntersection
        },
        "difference":{
            "Default":setDifference,
            "Set":setDifference
        },
        "update":{
            "Default":setUpdate,
            "Set":setUpdate
        },
        "intersection_update":{
            "Default":setIntersectionupdate,
            "Set":setIntersectionupdate
        },
        "difference_update":{
            "Default":setDifferenceupdate,
            "Set":setDifferenceupdate
        }

    }
}

var py2block_config = new Py2blockConfig();
