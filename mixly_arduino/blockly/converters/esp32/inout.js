
// console.log("hhh")

pbc.objectFunctionD.get('value')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 && args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    if(args.length == 1){
    pbc.pinType = "pins_digital";
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    pbc.pinType = null;
    return [block("inout_digital_write", func.lineno, {}, {
        "PIN": pinblock,
        "STAT": argblock
    }, {
        "inline": "true"
    })];}
    else if(args.length == 0){
      pbc.pinType = "pins_digital";
      var pinblock = py2block.convert(func.value);
      pbc.pinType = null;
      return block("inout_digital_read", func.lineno, {}, {
          "PIN": pinblock
      }, {
          "inline": "true"
      });
    }
}


pbc.assignD.get('Pin')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call"
        && funcName === "Pin" && (value.args.length === 2 || value.args.length === 3) )
        return true;
    return false;
}

pbc.assignD.get('Pin')['create_block'] = function(py2block, node, targets, value){

    pbc.pinType = "pins_digital_pin";
    var pinblock = py2block.convert(value.args[0]);
    pbc.pinType = null;
    if(value.args.length === 2){
    var digitalblock = py2block.Name_str(value.args[1].value) +"."+ py2block.identifier(value.args[1].attr);
    }
    else if(value.args.length === 3){
    var digitalblock = py2block.Name_str(value.args[1].value) +"."+ py2block.identifier(value.args[1].attr)+", "+py2block.Name_str(value.args[2].value) +"."+ py2block.identifier(value.args[2].attr);
    }
    pinobj = "pin"+value.args[0].n.v;
    return block("inout_digital_init", node.lineno, {"PIN_OBJ":pinobj,"MODE":digitalblock}, {
        "PIN":pinblock,

    });
}

pbc.assignD.get('DAC')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call"
        && funcName === "DAC" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('DAC')['create_block'] = function(py2block, node, targets, value){
    var astname = value.args[0]._astname;
    if(astname === "Call" && value.args[0].func._astname == "Name" && value.args[0].func.id.v === "Pin"){ //
        pbc.pinType = "pins_dac_pin";
        pinblock =  py2block.convert(value.args[0].args[0]);
        pbc.pinType = null;
    }else{
        pbc.pinType = "pins_dac_pin";
        pinblock =  py2block.convert(args[0]);
        pbc.pinType = null;
    }
    pinobj = "dac"+value.args[0].args[0].n.v;
    return block("inout_analog_write_init", node.lineno, {"PIN_OBJ":pinobj}, {
        "PIN":pinblock,

    });
}

pbc.objectFunctionD.get('write')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_dac";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;
    var argblock = py2block.convert(args[0]);

    return [block("inout_analog_write", func.lineno, {}, {
        "PIN": pinblock,
        "NUM": argblock
    }, {
        "inline": "true"
    })];
}

pbc.assignD.get('PWM')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call"
        && funcName === "PWM" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('PWM')['create_block'] = function(py2block, node, targets, value){
    var astname = value.args[0]._astname;
    if(astname === "Call" && value.args[0].func._astname == "Name" && value.args[0].func.id.v === "Pin"){ //
        pbc.pinType = "pins_pwm_pin";
        pinblock =  py2block.convert(value.args[0].args[0]);
        pbc.pinType = null;
    }else{
        pbc.pinType = "pins_pwm_pin";
        pinblock =  py2block.convert(args[0]);
        pbc.pinType = null;
    }
    pinobj = "pwm"+value.args[0].args[0].n.v;
    return block("inout_pwm_analog_write_init", node.lineno, {"PIN_OBJ":pinobj}, {
        "PIN":pinblock,

    });
}

pbc.objectFunctionD.get('duty')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_pwm";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;
    var argblock = py2block.convert(args[0]);

    return [block("inout_pwm_analog_write", func.lineno, {}, {
        "PIN": pinblock,
        "NUM": argblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('freq')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_pwm";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;
    var argblock = py2block.convert(args[0]);

    return [block("inout_analog_write_set_freq", func.lineno, {}, {
        "PIN": pinblock,
        "NUM": argblock
    }, {
        "inline": "true"
    })];
}

pbc.assignD.get('ADC')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call"
        && funcName === "ADC" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('ADC')['create_block'] = function(py2block, node, targets, value){
    var astname = value.args[0]._astname;
    if(astname === "Call" && value.args[0].func._astname == "Name" && value.args[0].func.id.v === "Pin"){ //
        pbc.pinType = "pins_analog_pin";
        pinblock =  py2block.convert(value.args[0].args[0]);
        pbc.pinType = null;
    }else{
        pbc.pinType = "pins_analog_pin";
        pinblock =  py2block.convert(args[0]);
        pbc.pinType = null;
    }
    pinobj = "adc"+value.args[0].args[0].n.v;
    return block("inout_analog_read_init", node.lineno, {"PIN_OBJ":pinobj}, {
        "PIN":pinblock,

    });
}

pbc.objectFunctionD.get('read')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    value = func.value.id.v
    value = value.slice(0,2)
    if( value=="ad"){
    pbc.pinType = "pins_analog";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;

    return block("inout_analog_read", func.lineno, {}, {
        "PIN": pinblock,
    }, {
        "inline": "true"
    });}
    else if(value =="tc"){
    pbc.pinType = "pins_touch";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;

    return block("inout_pin_pressed", func.lineno, {}, {
        "pin": pinblock,
    }, {
        "inline": "true"
    });
    }
}

pbc.assignD.get('TOUCHPAD')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call"
        && funcName === "TouchPad" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('TOUCHPAD')['create_block'] = function(py2block, node, targets, value){
    var astname = value.args[0]._astname;
    if(astname === "Call" && value.args[0].func._astname == "Name" && value.args[0].func.id.v === "Pin"){ //
        pbc.pinType = "pins_touch_pin";
        pinblock =  py2block.convert(value.args[0].args[0]);
        pbc.pinType = null;
    }else{
        pbc.pinType = "pins_touch_pin";
        pinblock =  py2block.convert(args[0]);
        pbc.pinType = null;
    }
    pinobj = "tc"+value.args[0].args[0].n.v;
    return block("inout_pin_pressed_init", node.lineno, {"PIN_OBJ":pinobj}, {
        "PIN":pinblock,

    });
}