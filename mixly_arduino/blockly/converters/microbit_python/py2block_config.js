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
pbc.MICROBITPY = "microbit[py]";
pbc.board = pbc.MICROBITPY;
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
    var boardIgnoreL = [
        //actuator.js
        'Servo', 'mixly_servo_write_angle',
        //display.js
        "LCD1602", "LCD_I2C_ADDR", "OLED12864_I2C","mixly_rgb_show", "oled", "mixly_oled_text",
        //sensor.js
        'HCSR04', 'sonar', 'DS1307', 'DS1307_I2C_ADDRESS', 'DS1307_REG_SECOND', 'DS1307_REG_MINUTE',
        'DS1307_REG_HOUR', 'DS1307_REG_WEEKDAY', 'DS1307_REG_DAY', 'DS1307_REG_MONTH', 'DS1307_REG_YEAR',
        'DS1307_REG_CTRL', 'DS1307_REG_RAM', 'ds'
    ];

    var ignoreL = pythonIgnoreL.concat(boardIgnoreL);
    for (var i = 0; i < ignoreL.length; i++) {
        this.ignoreS.add(ignoreL[i]);
    }
}

pbc.initModuleAttrD = function(){
    //communicate.js,例如 radio.RATE_2MBIT
    for (var i = 0; i < profile.default.radio_datarate.length; i++) {
        this.moduleAttrD.get('radio')[profile.default.radio_datarate[i][1]] = function (node, module, attr) {
            return block("pins_radio_datarate", node.lineno, {
                "PIN": attr
            });
        }
    }

    //display.js
    for (var i = 0; i < profile.default.builtinimg.length; i++) {
        pbc.moduleAttrD.get('Image')[profile.default.builtinimg[i][0]] = function (node, module, attr) {
            return block("pins_builtinimg", node.lineno, {
                "PIN": module + "." + attr
            });
        }
    }
    for (var i = 0; i < profile.default.imglist.length; i++) {
        pbc.moduleAttrD.get('Image')[profile.default.imglist[i][0]] = function (node, module, attr) {
            return block("pins_imglist", node.lineno, {
                "PIN": module + "." + attr
            });
        }
    }
    for (var i = 0; i < profile.default.digital.length; i++) {
        pbc.moduleAttrD.get('PIN')[profile.default.digital[i][0]] = function (node, module, attr) {
            return block("pins_digital", node.lineno, {
                "PIN": module + "." + attr
            });
        }
    }    
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
        'f': 'open'
    }
}

pbc.reset = function(){
    this.initObjectTypeD();
}

var py2block_config = new Py2blockConfig();

