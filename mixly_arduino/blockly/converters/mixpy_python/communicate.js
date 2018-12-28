'use strict';

pbc.assignD.get('Response')['check_assign'] = function (py2block, node, targets, value) {
    if(value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if (value._astname === "Call" && moduleName === "requests"
        && funcName === "get" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('Response')['create_block'] = function (py2block, node, targets, value) {
    var nameblock = py2block.Name_str(node.targets[0]);
    var argblock = py2block.convert(value.args[0]);
    return block('requests_get', node.lineno, {
            'VAR': nameblock
        }, {
            'DOMAIN':argblock
        });
}

function communicateRequestmethod(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length != 1) {
            throw new Error("Incorrect number of arguments");
        }
        var argblock = py2block.convert(args[0]);
            return [block("requests_method", func.lineno, {
                'DIR': mode,                
            }, {
                'VAR': argblock
            }, {
                "inline": "true"
            })];
    
        }
    return converter;

}

pbc.moduleFunctionD.get('requests')['post'] = communicateRequestmethod('post');
pbc.moduleFunctionD.get('requests')['put'] = communicateRequestmethod('put');
pbc.moduleFunctionD.get('requests')['delete'] = communicateRequestmethod('delete');
pbc.moduleFunctionD.get('requests')['head'] = communicateRequestmethod('head');
pbc.moduleFunctionD.get('requests')['option'] = communicateRequestmethod('option');

function modelsResponse(py2block, node, value, attr) {
    return block('requests_attribute', node.lineno, {
        'ATTR': py2block.identifier(attr)
    }, {
        'VAL': py2block.convert(value)
    });
}

pbc.objectAttrD.get('status_code')['Response'] = modelsResponse;
pbc.objectAttrD.get('text')['Response'] = modelsResponse;
pbc.objectAttrD.get('cookies')['Response'] = modelsResponse;
pbc.objectAttrD.get('content')['Response'] = modelsResponse;

