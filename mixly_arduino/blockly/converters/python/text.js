'use strict';

var pbc = Py2blockConfig.prototype;

pbc.globalFunctionD['int'] = function(py2block, func, args, keywords, starargs, kwargs, node){ 
	if (args.length!=1){
		throw new Error("Incorrect number of arguments");
	}
	else {
		 var astname = args[0]._astname;
		 if(astname === "Call"){
		 	if(py2block.identifier(args[0].func.id) === "str"){
		 		  return block("text_to_number", func.lineno, {'TOWHAT':'int'}, 
		 		  {
                      'VAR':py2block.convert(args[0].args[0]),           
                }, {
                    "inline": "false"
                });
		 	}
		 }
	}
}

pbc.globalFunctionD['float'] = function(py2block, func, args, keywords, starargs, kwargs, node){ 
	if (args.length!=1){
		throw new Error("Incorrect number of arguments");
	}
	else {
		 var astname = args[0]._astname;
		 if(astname === "Call"){
		 	if(py2block.identifier(args[0].func.id) === "str"){
		 		  return block("text_to_number", func.lineno, {'TOWHAT':'float'}, 
		 		  {
                      'VAR':py2block.convert(args[0].args[0]),           
                }, {
                    "inline": "false"
                });
		 	}
		 }
	}
}

pbc.globalFunctionD['chr'] = function(py2block, func, args, keywords, starargs, kwargs, node){ 
	if (args.length===0){
		throw new Error("Incorrect number of arguments");
	}
	else {
		 var numblock = py2block.convert(args[0]);
		 if(numblock!=null){
		 		  return block("ascii_to_char", func.lineno, {}, 
		 		  {
                      'VAR':numblock,           
                }, {
                    "inline": "false"
                });
		 	}
	}
}

pbc.globalFunctionD['ord'] = function(py2block, func, args, keywords, starargs, kwargs, node){ 
	if (args.length===0){
		throw new Error("Incorrect number of arguments");
	}
	else {
		 var numblock = py2block.convert(args[0]);
		 if(numblock!=null){
		 		  return block("char_to_ascii", func.lineno, {}, 
		 		  {
                      'VAR':numblock,           
                }, {
                    "inline": "false"
                });
		 	}
	}
}


pbc.globalFunctionD['str'] = function(py2block, func, args, keywords, starargs, kwargs, node){ 
	if (args.length===0){
		throw new Error("Incorrect number of arguments");
	}
	else {
		 var numblock = py2block.convert(args[0]);
		 if(numblock!=null){
		 		  return block("number_to_text", func.lineno, {}, 
		 		  {
                      'VAR':numblock,           
                }, {
                    "inline": "false"
                });
		 	}
	}
}

pbc.globalFunctionD['len'] = function(py2block, func, args, keywords, starargs, kwargs, node){ 
	if (args.length===0){
		throw new Error("Incorrect number of arguments");
	}
	else {
		 var numblock = py2block.convert(args[0]);
		 if(numblock!=null){
		 		  return block("text_length", func.lineno, {}, 
		 		  {
                      'VAR':numblock,           
                }, {
                    "inline": "false"
                });
		 	}
	}
}


