'use strict';


pbc.assignD.get('AipImageClassify')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(moduleName === "aip" && funcName === "AipImageClassify" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('AipImageClassify')['create_block'] = function(py2block, node, targets, value){
    //var mode = py2block.Str_value(value.args[1]);
    return block("AI_client", node.lineno, {
        "CTYPE":"AipImageClassify"
    }, {
        "APP_ID":py2block.convert(value.args[0]),
        "API_KEY":py2block.convert(value.args[1]),
        "SECRET_KEY":py2block.convert(value.args[2]),
        "SUB":py2block.convert(targets[0])
    });
}

pbc.assignD.get('AipSpeech')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(moduleName === "aip" && funcName === "AipSpeech" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('AipSpeech')['create_block'] = function(py2block, node, targets, value){
    //var mode = py2block.Str_value(value.args[1]);
    return block("AI_client", node.lineno, {
        "CTYPE":"AipSpeech"
    }, {
        "APP_ID":py2block.convert(value.args[0]),
        "API_KEY":py2block.convert(value.args[1]),
        "SECRET_KEY":py2block.convert(value.args[2]),
        "SUB":py2block.convert(targets[0])
    });
}

pbc.assignD.get('AipImageCensor')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(moduleName === "aip" && funcName === "AipImageCensor" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('AipImageCensor')['create_block'] = function(py2block, node, targets, value){
    //var mode = py2block.Str_value(value.args[1]);
    return block("AI_client", node.lineno, {
        "CTYPE":"AipImageCensor"
    }, {
        "APP_ID":py2block.convert(value.args[0]),
        "API_KEY":py2block.convert(value.args[1]),
        "SECRET_KEY":py2block.convert(value.args[2]),
        "SUB":py2block.convert(targets[0])
    });
}

pbc.assignD.get('AipOcr')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(moduleName === "aip" && funcName === "AipOcr" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('AipOcr')['create_block'] = function(py2block, node, targets, value){
    //var mode = py2block.Str_value(value.args[1]);
    return block("AI_client", node.lineno, {
        "CTYPE":"AipOcr"
    }, {
        "APP_ID":py2block.convert(value.args[0]),
        "API_KEY":py2block.convert(value.args[1]),
        "SECRET_KEY":py2block.convert(value.args[2]),
        "SUB":py2block.convert(targets[0])
    });
}

pbc.assignD.get('AipNlp')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(moduleName === "aip" && funcName === "AipNlp" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('AipNlp')['create_block'] = function(py2block, node, targets, value){
    //var mode = py2block.Str_value(value.args[1]);
    return block("AI_client", node.lineno, {
        "CTYPE":"AipNlp"
    }, {
        "APP_ID":py2block.convert(value.args[0]),
        "API_KEY":py2block.convert(value.args[1]),
        "SECRET_KEY":py2block.convert(value.args[2]),
        "SUB":py2block.convert(targets[0])
    });
}

pbc.assignD.get('AipFace')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(moduleName === "aip" && funcName === "AipFace" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('AipFace')['create_block'] = function(py2block, node, targets, value){
    //var mode = py2block.Str_value(value.args[1]);
    return block("AI_client", node.lineno, {
        "CTYPE":"AipFace"
    }, {
        "APP_ID":py2block.convert(value.args[0]),
        "API_KEY":py2block.convert(value.args[1]),
        "SECRET_KEY":py2block.convert(value.args[2]),
        "SUB":py2block.convert(targets[0])
    });
}

function AIChooseAndGet(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        
        return block("AI_ChooseAndGet", func.lineno, {"TYPE":mode}, {}, {
        "inline": "true"
    });
    }
    return converter;
}

pbc.moduleFunctionD.get('FileDialog')['getOneFile'] = AIChooseAndGet('getOneFile');
pbc.moduleFunctionD.get('FileDialog')['getManyFiles'] = AIChooseAndGet('getManyFiles');
pbc.moduleFunctionD.get('FileDialog')['getDirectory'] = AIChooseAndGet('getDirectory');

pbc.objectFunctionD.get('synthesis')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    return block("AI_Speech_synthesis", func.lineno, {}, {
        "SUB": objblock,
        "STR": argument,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
};

pbc.objectFunctionD.get('asr')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    return block("AI_Speech_asr", func.lineno, {}, {
        "SUB": objblock,
        "FILE": argument,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
};

pbc.objectFunctionD.get('advancedGeneral')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    return block("AI_ImageClassify", func.lineno, {}, {
        "SUB": objblock,
        "FUNC": block("AI_ImageClassify_Func", func.lineno, {"TYPE":"advancedGeneral"}, {}),
        "ADDR": argument,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
};

pbc.objectFunctionD.get('match')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    var argument1 = py2block.convert(args[1]);
    return block("AI_Face_match", func.lineno, {}, {
        "SUB": objblock,
        "VAR": argument,
        "VAR2": argument1,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
};

function AIImageClassify(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    return block("AI_ImageClassify", func.lineno, {}, {
        "SUB": objblock,
        "FUNC": block("AI_ImageClassify_Func", func.lineno, {"TYPE":mode}, {}),
        "ADDR": argument,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
    }
    return converter;
}

pbc.objectFunctionD.get('advancedGeneral')['Dict'] = AIImageClassify('advancedGeneral');
pbc.objectFunctionD.get('dishDetect')['Dict'] = AIImageClassify('dishDetect');
pbc.objectFunctionD.get('carDetect')['Dict'] = AIImageClassify('carDetect');
pbc.objectFunctionD.get('animalDetect')['Dict'] = AIImageClassify('animalDetect');
pbc.objectFunctionD.get('plantDetect')['Dict'] = AIImageClassify('plantDetect');
pbc.objectFunctionD.get('logoSearch')['Dict'] = AIImageClassify('logoSearch');

function AIORC(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    return block("AI_Ocr", func.lineno, {}, {
        "SUB": objblock,
        "FUNC": block("AI_Ocr_Func", func.lineno, {"TYPE":mode}, {}),
        "ADDR": argument,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
    }
    return converter;
}

pbc.objectFunctionD.get('basicGeneral')['Dict'] = AIORC('basicGeneral');
pbc.objectFunctionD.get('webImage')['Dict'] = AIORC('webImage');
pbc.objectFunctionD.get('idcard')['Dict'] = AIORC('idcard');
pbc.objectFunctionD.get('bankcard')['Dict'] = AIORC('bankcard');
pbc.objectFunctionD.get('drivingLicense')['Dict'] = AIORC('drivingLicense');
pbc.objectFunctionD.get('vehicleLicense')['Dict'] = AIORC('vehicleLicense');
pbc.objectFunctionD.get('licensePlate')['Dict'] = AIORC('licensePlate');
pbc.objectFunctionD.get('businessLicense')['Dict'] = AIORC('businessLicense');
pbc.objectFunctionD.get('receipt')['Dict'] = AIORC('receipt');
pbc.objectFunctionD.get('trainTicket')['Dict'] = AIORC('trainTicket');
pbc.objectFunctionD.get('taxiReceipt')['Dict'] = AIORC('taxiReceipt');
pbc.objectFunctionD.get('tableRecognition')['Dict'] = AIORC('tableRecognition');
pbc.objectFunctionD.get('vatInvoice')['Dict'] = AIORC('vatInvoice');
pbc.objectFunctionD.get('passport')['Dict'] = AIORC('passport');
pbc.objectFunctionD.get('handwriting')['Dict'] = AIORC('handwriting');

function AINLP(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    return block("AI_Nlp", func.lineno, {}, {
        "SUB": objblock,
        "FUNC": block("AI_Nlp_Func", func.lineno, {"TYPE":mode}, {}),
        "STR": argument,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
    }
    return converter;
}

pbc.objectFunctionD.get('lexer')['Dict'] = AINLP('lexer');
pbc.objectFunctionD.get('depParser')['Dict'] = AINLP('depParser');
pbc.objectFunctionD.get('wordEmbedding')['Dict'] = AINLP('wordEmbedding');
pbc.objectFunctionD.get('dnnlm')['Dict'] = AINLP('dnnlm');
pbc.objectFunctionD.get('commentTag')['Dict'] = AINLP('commentTag');
pbc.objectFunctionD.get('sentimentClassify')['Dict'] = AINLP('sentimentClassify');
pbc.objectFunctionD.get('keyword')['Dict'] = AINLP('keyword');
//pbc.objectFunctionD.get('topic')['Dict'] = AINLP('topic');
pbc.objectFunctionD.get('ecnet')['Dict'] = AINLP('ecnet');
pbc.objectFunctionD.get('emotion')['Dict'] = AINLP('emotion');

function AISIMILARITY(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    var argument1 = py2block.convert(args[1]);
    var a;
    return block("AI_Nlp_Sim", func.lineno, {}, {
        "SUB": objblock,
        "FUNC": block("AI_Nlp_Func_sim", func.lineno, {"TYPE":mode}, {}),
        "STR1": argument,
        "STR2": argument1,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
    }
    return converter;
}

pbc.objectFunctionD.get('wordSimEmbedding')['Dict'] = AISIMILARITY('wordSimEmbedding');
pbc.objectFunctionD.get('simnet')['Dict'] = AISIMILARITY('simnet');


pbc.objectFunctionD.get('newsSummary')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argument = py2block.convert(args[0]);
    var argument1 = py2block.convert(args[1]);
    return block("AI_Nlp_newsSummary", func.lineno, {}, {
        "SUB": objblock,
        "STR": argument,
        "LEN": argument1,
        'ATTR':py2block.convert(keywords[0].value)
    }, {
        "inline": "false"
    });
};

pbc.objectFunctionD.get('topic')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (keywords.length > 1) {
        throw new Error("Incorrect number of arguments");
    }
    if (keywords.length == 0){
        var objblock = py2block.convert(func.value);
        var argument = py2block.convert(args[0]);
        var argument1 = py2block.convert(args[1]);
        return block("AI_Nlp_Topic", func.lineno, {}, {
            "SUB": objblock,
            "STR1": argument,
            "STR2": argument1,        
        }, {
            "inline": "false"
        });
    }
    if (keywords.length == 1){
        var objblock = py2block.convert(func.value);
        var argument = py2block.convert(args[0]);
        return block("AI_Nlp", func.lineno, {}, {
            "SUB": objblock,
            "FUNC": block("AI_Nlp_Func", func.lineno, {"TYPE":"topic"}, {}),
            "STR": argument,
            'ATTR':py2block.convert(keywords[0].value)
        }, {
            "inline": "false"
        });
    }
};

pbc.moduleFunctionD.get('audio')['audio_record'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    var numblock = py2block.convert(args[1]);
    return [block("AI_audio", func.lineno, {}, {
        'VAR': varblock,
        'TIME': numblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('cam')['photo_capture'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    var numblock = py2block.convert(args[1]);
    return [block("AI_photo", func.lineno, {}, {
        'VAR': varblock,
        'BUT': numblock
    }, {
        "inline": "true"
    })];
}