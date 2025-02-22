/*
Overrides for generic Python code generation.
*/
import * as Blockly from 'blockly/core';
import Names from './others/names';

/**
 * Python code generator.
 * @type {!Blockly.Generator}
 */
export const Python = new Blockly.Generator('Python');
Python.INDENT = "    ";

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Python.addReservedWords(
    // import keyword
    // print(','.join(sorted(keyword.kwlist)))
    // https://docs.python.org/3/reference/lexical_analysis.html#keywords
    // https://docs.python.org/2/reference/lexical_analysis.html#keywords
    'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
    'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
    'or,pass,print,raise,return,try,while,with,yield,' +
    // https://docs.python.org/3/library/constants.html
    // https://docs.python.org/2/library/constants.html
    'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
    // >>> print(','.join(sorted(dir(__builtins__))))
    // https://docs.python.org/3/library/functions.html
    // https://docs.python.org/2/library/functions.html
    'ArithmeticError,AssertionError,AttributeError,BaseException,' +
    'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
    'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
    'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
    'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
    'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
    'ImportWarning,IndentationError,IndexError,InterruptedError,' +
    'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
    'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
    'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
    'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
    'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
    'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
    'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
    'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
    'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
    'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
    '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
    'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
    'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
    'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
    'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
    'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
    'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
    'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
    'sum,super,tuple,type,unichr,unicode,vars,xrange,zip'
);

/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Python.ORDER_ATOMIC = 0;            // 0 "" ...
Python.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Python.ORDER_STRING_CONVERSION = 1; // `expression...`
Python.ORDER_UNARY_POSTFIX = 1;     // expr++ expr-- () [] .
Python.ORDER_UNARY_PREFIX = 2;      // -expr !expr ~expr ++expr --expr
Python.ORDER_MEMBER = 2.1;          // . []
Python.ORDER_FUNCTION_CALL = 2.2;   // ()
Python.ORDER_EXPONENTIATION = 3;    // **
Python.ORDER_UNARY_SIGN = 4;        // + -
Python.ORDER_BITWISE_NOT = 4;       // ~
Python.ORDER_MULTIPLICATIVE = 5;    // * / // %
Python.ORDER_ADDITIVE = 6;          // + -
Python.ORDER_BITWISE_SHIFT = 7;     // << >>
Python.ORDER_BITWISE_AND = 8;       // &
Python.ORDER_BITWISE_XOR = 9;       // ^
Python.ORDER_BITWISE_OR = 10;       // |
Python.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
//     <, <=, >, >=, <>, !=, ==
Python.ORDER_EQUALITY = 11;          // == != === !==
Python.ORDER_LOGICAL_NOT = 12;      // not
Python.ORDER_LOGICAL_AND = 13;      // and
Python.ORDER_LOGICAL_OR = 14;       // or
Python.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Python.ORDER_CONDITIONAL = 15;      // if else
Python.ORDER_LAMBDA = 16;           // lambda
Python.ORDER_NONE = 99;             // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Python.ORDER_OVERRIDES = [
    // (foo()).bar -> foo().bar
    // (foo())[0] -> foo()[0]
    [Python.ORDER_FUNCTION_CALL, Python.ORDER_MEMBER],
    // (foo())() -> foo()()
    [Python.ORDER_FUNCTION_CALL, Python.ORDER_FUNCTION_CALL],
    // (foo.bar).baz -> foo.bar.baz
    // (foo.bar)[0] -> foo.bar[0]
    // (foo[0]).bar -> foo[0].bar
    // (foo[0])[1] -> foo[0][1]
    [Python.ORDER_MEMBER, Python.ORDER_MEMBER],
    // (foo.bar)() -> foo.bar()
    // (foo[0])() -> foo[0]()
    [Python.ORDER_MEMBER, Python.ORDER_FUNCTION_CALL],

    // not (not foo) -> not not foo
    // [Python.ORDER_LOGICAL_NOT, Python.ORDER_LOGICAL_NOT],
    // a and (b and c) -> a and b and c
    // [Python.ORDER_LOGICAL_AND, Python.ORDER_LOGICAL_AND],
    // a or (b or c) -> a or b or c
    // [Python.ORDER_LOGICAL_OR, Python.ORDER_LOGICAL_OR]
];

Python.init = function () {
    /**
      * Empty loops or conditionals are not allowed in Python.
      */
    Python.PASS = this.INDENT + 'pass\n';
    // Create a dictionary of definitions to be printed before the code.
    Python.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Python.functionNames_ = Object.create(null);
    Python.setups_ = Object.create(null);
    Python.loops_ = Object.create(null);
    Python.codeEnd_ = Object.create(null);

    if (!Python.variableDB_) {
        Python.variableDB_ = new Names(Python.RESERVED_WORDS_);
    } else {
        Python.variableDB_.reset();
    }
}

Python.finish = function (code) {
    // Convert the definitions dictionary into a list.
    if (code !== "") {
        code = code.replace(/\n/g, '\n');
        code = code.replace(/\n\s+$/, '\n');
    }
    var imports = [];
    var definitions_var = []; //变量定义
    var definitions_fun = []; //函数定义
    for (var name in this.definitions_) {
        var def = this.definitions_[name];
        if (name.indexOf('import') === 0) {
            imports.push(def);
        } else if (name.indexOf('var_declare') === 0) {
            definitions_var.push(def);
        } else {
            definitions_fun.push(def);
        }
    }
    if (imports.length) {
        imports.push('\n\n');
    }
    if (definitions_var.length) {
        definitions_var.push('\n\n');
    }
    if (definitions_fun.length) {
        definitions_fun.push('\n\n');
    }
    var functions = [];
    for (var name in Python.functions_) {
        functions.push(Python.functions_[name]);
    }
    if (functions.length) {
        functions.push('\n\n');
    }
    var setups = [];
    for (var name in Python.setups_) {
        setups.push(Python.setups_[name]);
    }
    if (setups.length) {
        setups.push('\n\n');
    }
    var loops = [];
    for (var name in Python.loops_) {
        loops.push(Python.loops_[name]);
    }
    var codeEnd = [];
    for (var name in Python.codeEnd_) {
        codeEnd.push(Python.codeEnd_[name]);
    }
    if (codeEnd.length !== 0) {
        codeEnd.push('\n');
    }
    if (loops.length > 0) {
        return imports.join('\n') + definitions_var.join('\n') + definitions_fun.join('\n')
            + functions.join('\n') + setups.join('') + code + 'while True:\n' + loops.join('') + codeEnd.join('\n');
    }
    return imports.join('\n') + definitions_var.join('\n') + definitions_fun.join('\n')
        + functions.join('\n') + setups.join('') + code + codeEnd.join('\n');
}


/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Python.scrubNakedValue = function (line) {
    return line + '\n';
}

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Python.quote_ = function (string) {
    // Can't use goog.string.quote since % must also be escaped.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n');

    // Follow the CPython behaviour of repr() for a non-byte string.
    var quote = '\'';
    if (string.indexOf('\'') !== -1) {
        if (string.indexOf('"') === -1) {
            quote = '"';
        } else {
            string = string.replace(/'/g, '\\\'');
        }
    }
    return quote + string + quote;
}

/**
 * Encode a string as a properly escaped multiline Python string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Python.multiline_quote_ = function (string) {
    // Can't use goog.string.quote since % must also be escaped.
    string = string.replace(/'''/g, '\\\'\\\'\\\'');
    return '\'\'\'' + string + '\'\'\'';
}

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Python.scrub_ = function (block, code, opt_thisOnly) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        if (comment) {
            comment = Blockly.utils.string.wrap(comment,
                Python.COMMENT_WRAP - 3);
            commentCode += Python.prefixLines(comment + '\n', '# ');
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Python.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Python.prefixLines(comment, '# ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = opt_thisOnly ? '' : Python.blockToCode(nextBlock);
    return commentCode + code + nextCode;
}

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Python.getAdjustedInt = function (block, atId, opt_delta, opt_negate) {
    var delta = opt_delta || 0;
    if (block.workspace.options.oneBasedIndex) {
        delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    var atOrder = delta ? Python.ORDER_ADDITIVE :
        Python.ORDER_NONE;
    var at = Python.valueToCode(block, atId, atOrder) || defaultAtIndex;

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseInt(at, 10) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = 'int(' + at + ' + ' + delta + ')';
        } else if (delta < 0) {
            at = 'int(' + at + ' - ' + -delta + ')';
        } else {
            at = 'int(' + at + ')';
        }
        if (opt_negate) {
            at = '-' + at;
        }
    }
    return at;
}