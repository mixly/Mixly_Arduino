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
    this.initIgnoreS();
    this.initModuleAttrD();
    this.initKnownModuleS();
    this.initObjectTypeD();
}

var pbc = Py2blockConfig.prototype;
pbc.MIXPY = "MIXPY";
pbc.board = pbc.MIXPY;
pbc.objectFunctionD = defDict({});
pbc.moduleFunctionD = defDict({});
pbc.moduleAttrD = defDict({});
pbc.objectAttrD = defDict({});
pbc.globalFunctionD = {};
pbc.assignD = defDict({});
pbc.ifStatementD= defDict({});
pbc.whileStatementD= defDict({});
pbc.forStatementD= defDict({});
pbc.reservedNameD= {};
pbc.knownModuleS = new Set();
pbc.objectTypeD = {}; //key：变量名，value：变量类型，如{'a':'List'}
pbc.ignoreS = new Set();
pbc.pinType = null;
pbc.inScope = null;
pbc.formatModuleKeyL = [];
pbc.formatModuleL = [];

//忽略某些方法、类、赋值
pbc.initIgnoreS = function(){
    var pythonIgnoreL = [
        //math.js
        'mixly_mapping',
        //lists.js
        'lists_sort', 'math_mean', 'math_median', 'math_modes', 'math_standard_deviation',
    ];
    var boardIgnoreL = [];

    var ignoreL = pythonIgnoreL.concat(boardIgnoreL);
    for (var i = 0; i < ignoreL.length; i++) {
        this.ignoreS.add(ignoreL[i]);
    }
}


pbc.initModuleAttrD = function(){
}

pbc.initKnownModuleS = function(){
    var pythonModuleL = [
        'math', 'random'
    ];
    var boardModuleL = [];

    var moduleL = pythonModuleL.concat(boardModuleL);
    for (var i = 0; i < moduleL.length; i++) {
        this.knownModuleS.add(moduleL[i]);
    }
}

pbc.initObjectTypeD = function () {
    this.objectTypeD = {
        'tina': 'turtle.Turtle',
        'f': 'open'
    }
}

pbc.reset = function(){
    this.initObjectTypeD();
}

var py2block_config = new Py2blockConfig();

