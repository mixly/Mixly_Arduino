'use strict';
// console.log("hhh")

pbc.assignD.get('network')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "network"
        && funcName === "WLAN" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('network')['create_block'] = function(py2block, node, targets, value){
    var mode = py2block.identifier(value.args[0].attr);
    if (mode=="STA_IF"){
        mode="STA"
    }
    else if (mode=="AP_IF"){
        mode="AP"
    }
    return block("network_init", node.lineno, {
        "mode":mode,
    }, {
        "VAR":py2block.convert(targets[0]),
    });
}


pbc.objectFunctionD.get('active')['network'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.Name_str(args[0]);
    return [block("network_open", func.lineno, {
            "op": reverse,
        }, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('isconnected')['network'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("network_wifi_connect", func.lineno, {}, {
            "VAR":objblock,
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('disconnect')['network'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("network_stop", func.lineno, {}, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('config')['network'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length == 0 & keywords.length == 2){ 
         var objblock = py2block.convert(func.value);
        var essidblock = null;
        var channelblock = null;
        for (var i = 0; i < keywords.length; i++) {
            var param = keywords[i];
            var key = py2block.identifier(param.arg);
            if (key === "essid") {
                essidblock = py2block.convert(param.value);
            } else if (key === "channel") {
                channelblock = py2block.convert(param.value);
            } 
        }
        if (essidblock != null  && channelblock != null ) {
            return [block("network_ap_connect", func.lineno, {}, {
                "VAR":objblock,
                "essid": essidblock,
                "channel": channelblock,
            }, {
                "inline": "true"
            })];
        }
    }else if(args.length == 1) {
       var objblock = py2block.convert(func.value);
    var argblock = py2block.Str_value(args[0]);
    return block("network_get_wifi", func.lineno, {
        "op":argblock,
    }, {
            "VAR":objblock,
        }, {
            "inline": "true"
        });
    }else{
        throw new Error("Incorrect number of arguments");
    }
}

pbc.objectFunctionD.get('connect')['network'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var idblock = py2block.convert(args[0]);
    var passwordblock = py2block.convert(args[1]);
    return [block("network_connect", func.lineno, {}, {
            "VAR":objblock,
            "id":idblock,
            "password":passwordblock,
        }, {
            "inline": "true"
        })];
}

pbc.assignD.get('socket')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "socket"
        && funcName === "socket" && value.args.length === 2)
        return true;
    return false;
}

pbc.assignD.get('socket')['create_block'] = function(py2block, node, targets, value){
    var mode = py2block.identifier(value.args[1].attr);
    if (mode=="SOCK_STREAM"){
        mode="TCP"
    }
    else if (mode=="SOCK_DGRAM"){
        mode="UDP"
    }
    return block("network_socket_init", node.lineno, {
        "mode":mode,
    }, {
        "VAR":py2block.convert(targets[0]),
    });
}

pbc.objectFunctionD.get('bind')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.convert(args[0]);
    return [block("network_socket_bind", func.lineno, {
        }, {
            "address": reverse,
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('listen')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.convert(args[0]);
    return [block("network_socket_listen", func.lineno, {
        }, {
            "queue": reverse,
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('accept')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("network_socket_accept", func.lineno, {}, {
            "VAR":objblock,
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('recv')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.convert(args[0]);
    return block("network_socket_receive", func.lineno, {
        }, {
            "size": reverse,
            "VAR":objblock,
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('send')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.convert(args[0]);
    return [block("network_socket_send", func.lineno, {
        }, {
            "content": reverse,
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('recvfrom')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.convert(args[0]);
    return block("network_socket_receive_from", func.lineno, {
        }, {
            "size": reverse,
            "VAR":objblock,
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('sendto')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.convert(args[0]);
    var address = py2block.convert(args[1]);
    return [block("network_socket_send_to", func.lineno, {
        }, {
            "content": reverse,
            "VAR":objblock,
            "address":address,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('close')['socket'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("network_socket_close", func.lineno, {}, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}