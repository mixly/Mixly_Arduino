'use strict';

var pbc = Py2blockConfig.prototype;


 var pinmade=[['IN','Pin.IN'],['PULL_UP','Pin.PULL_UP'],['PULL_DOWN','Pin.PULL_DOWN'],['IRQ_RISING','Pin.IRQ_RISING'],['IRQ_FALLING','Pin.IRQ_FALLING']];

var ignoreL = ['attachInterrupt_func_0'];

for(var i = 0 ; i < ignoreL.length; i ++){
    pbc.ignoreS.add(ignoreL[i]);
}
 for (var i=0;i<pinmade.length;i++){
      pbc.moduleAttrD.get('Pin')[pinmade[i][0]] = function (node, module, attr) {
           return block("pins_digital", node.lineno, {
            "PIN": module + "." + attr
           });
    }
 }
   

pbc.assignD.get('Pin')['check_assign'] = function(py2block, node, targets, value) {
    var typename=value.func.id.v;
    if(value._astname === "Call" && typename==='Pin' && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('Pin')['create_block'] = function(py2block, node, targets, value){
    pbc.pinType = "pins_digital";
    var pinblock=py2block.convert(node.targets[0]);
    var block1=node.value.args[0].n.v;
    var block2=node.value.args[1].attr.v;
    var block3=node.value.args[2].attr.v;
    var temp=node.targets[0].id.v;
    pbc.pinType=null;
    var temp1=temp.charAt(temp.length-1);

    if(block1==temp1&&block2==='IN'&&block3==='PULL_UP'){
        return [block('inout_pinMode', node.lineno, 
        {
         "MODE":"Pin.PULL_UP"
        }, {
        
        "PIN":pinblock,
        
    })];
    }
    else if (block2==='IN'&&block3==='PULL_DOWN'){
        return [block('inout_pinMode', node.lineno, 
        {
         "MODE":"Pin.PULL_DOWN"
        }, {
        
        "PIN":pinblock,
        
    })];
    }
    else{
        throw new Error("Incorrect number of arguments");
    }
    
}


pbc.objectFunctionD.get('write_digital')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_digital";
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    pbc.pinType = null;
    return [block("inout_digital_write", func.lineno, {}, {
        "PIN" : pinblock,
        "STAT" : argblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('read_digital')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_digital";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;
    return block("inout_digital_read", func.lineno, {}, {
        "PIN": pinblock
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('write_analog')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_pwm";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;
    var argblock = py2block.convert(args[0]);
    return [block("inout_analog_write", func.lineno, {}, {
        "PIN" : pinblock,
        "NUM" : argblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('read_analog')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_analog";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;
    return block("inout_analog_read", func.lineno, {}, {
        "PIN": pinblock
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('set_frequency')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_pwm";
    var pinblock = py2block.convert(func.value);
    pbc.pinType = null;
    var freqblock=py2block.convert(args[0]);
    return block("inout_analog_write_set_freq", func.lineno, {}, {
        "PIN": pinblock,
        "NUM":freqblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('is_touched')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if(args.length !==0){
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="pins_interrupt";
    var pinblock=py2block.convert(func.value);
    pbc.pinType=null;

    return block("sensor_pin_pressed",func.lineno,{},{
        "pin":pinblock
    },{
        "inline":"true"
    });
}

/*pbc.objectFunctionD.get('irq')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length===0 && keywords.length===2) {
         pbc.pinType = "pins_digital";
    var pinblock = py2block.convert(func.value);
    var handlerblock=null;
    var trigblock=null;
    pbc.pinType = null;
    
   for (var i = 0; i < keywords.length; i++) {
                var param = keywords[i];
                var key = py2block.identifier(param.arg);
               if(key==='handler'){
                  handlerblock = py2block.convert(param.value);
               }
               else if (key === 'trigger'){
                trigblock = py2block.identifier(param.value.attr);
               }
            }
    if (trigblock=='IRQ_RISING'&&(keywords[0].value.id.v=='attachInterrupt_func_0')){
        return [block("controls_attachInterrupt", func.lineno, {"mode" : "Pin.IRQ_RISING"
       }, {
        "PIN":pinblock,
        
    }, {
        "inline": "true"
    }, {}, {
        'DO':py2block.convertBody(),
    })];
    }

    }
   
}*/