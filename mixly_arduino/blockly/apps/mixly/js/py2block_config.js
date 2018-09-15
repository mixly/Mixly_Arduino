function Py2blockConfig (){
    this.isMicrobitpy = false;//microbit需要忽略最外层的While循环
    this.initIgnoreFunctionL();
    this.initGlobalFunctionD();
    this.initAssignL();
}

//文本转图形，需要忽略的全局函数
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
        }
    }
}

// 赋值表达式，需要特殊处理的，如tina= turtle.Turtle(), l = [0, 9, 0]; 否则按变量赋值处理
Py2blockConfig.prototype.initAssignL = function(){
    /*
    this.assignL = [
        [isTurtleAssign, turtleCreateBlock],
    ];
    */
}

var py2block_config = new Py2blockConfig();