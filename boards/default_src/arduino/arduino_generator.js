import * as Blockly from 'blockly/core';
import Names from './others/names';

export class ArduinoGenerator extends Blockly.Generator {
    constructor(name) {
        super(name ?? 'Arduino')
        this.ORDER_ATOMIC = 0 // 0 "" ...
        this.ORDER_UNARY_POSTFIX = 1 // expr++ expr-- () [] .
        this.ORDER_UNARY_PREFIX = 2 // -expr !expr ~expr ++expr --expr
        this.ORDER_MULTIPLICATIVE = 3 // * / % ~/
        this.ORDER_ADDITIVE = 4 // + -
        this.ORDER_SHIFT = 5 // << >>
        this.ORDER_RELATIONAL = 6 // is is! >= > <= <
        this.ORDER_EQUALITY = 7 // == != === !==
        this.ORDER_BITWISE_AND = 8 // &
        this.ORDER_BITWISE_XOR = 9 // ^
        this.ORDER_BITWISE_OR = 10 // |
        this.ORDER_LOGICAL_AND = 11 // &&
        this.ORDER_LOGICAL_OR = 12 // ||
        this.ORDER_CONDITIONAL = 13 // expr ? expr : expr
        this.ORDER_ASSIGNMENT = 14 // = *= /= ~/= %= += -= <<= >>= &= ^= |=
        this.ORDER_NONE = 99 // (...)
        this.INDENT = '  '
        this.isInitialized = false
        this.PASS = ''

        this.addReservedWords(
            'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger,constants,floating,point,void,bookean,char,unsigned,byte,int,short,word,long,float,double,string,String,array,static,volatile,const,sizeof'
        )
    }

    init() {
        super.init();
        // Create a dictionary of definitions to be printed before setups.
        this.definitions_ = Object.create(null)
        // Create a dictionary of setups to be printed before the code.
        this.setups_ = Object.create(null)
        this.setups_begin_ = Object.create(null)
        this.setups_end_ = Object.create(null)
        this.libs_ = Object.create(null)
        this.loops_begin_ = Object.create(null)
        this.loops_end_ = Object.create(null)
        //this.variableTypes_ = Object.create(null);//处理变量类型

        if (!this.variableDB_) {
            this.variableDB_ = new Names(
                this.RESERVED_WORDS_
            )
        } else {
            this.variableDB_.reset()
        }
        this.isInitialized = true;
    }

    finish(code) {
        // Indent every line.
        code = '  ' + code.replace(/\n/g, '\n  ');
        code = code.replace(/\n\s+$/, '\n');
        // Convert the definitions dictionary into a list.
        var imports = [];
        var define = [];
        var definitions_var = []; //变量定义
        var definitions_fun = []; //函数定义
        //var sorted_keys=Object.keys(this.definitions_).sort();
        var sorted_keys = Object.keys(this.definitions_);
        if (sorted_keys.length) {
            for (var idx in sorted_keys) {
                var name = sorted_keys[idx];
                var def = this.definitions_[name];
                if (name.match(/^define/)) {
                    define.push(def);
                } else if (name.match(/^include/)) {
                    imports.push(def);
                } else if (def.match(/^WiFiClient/)) {
                    imports.push(def);
                } else if (name.match(/^var_declare/)) {
                    definitions_var.push(def);
                } else {
                    definitions_fun.push(def);
                }
            }
        }
        // Convert the setups dictionary into a list.
        var setups = [];
        for (let name in this.setups_) {
            setups.push(this.setups_[name]);
        }
        var setupsBegin = [], setupsEnd = [];
        for (let name in this.setups_begin_) {
            setupsBegin.push(this.setups_begin_[name]);
        }
        for (let name in this.setups_end_) {
            setupsEnd.push(this.setups_end_[name]);
        }

        for (let name in this.libs_) {
            imports.push(`#include "${name}.h"`);
        }

        var loopsBegin = [], loopsEnd = [];
        for (let name in this.loops_begin_) {
            loopsBegin.push(this.loops_begin_[name]);
        }
        for (let name in this.loops_end_) {
            loopsEnd.push(this.loops_end_[name]);
        }
        code = 'void loop() {\n'
            + (loopsBegin.length ? ('  ' + loopsBegin.join('\n  ')) : '')
            + code
            + (loopsEnd.length ? ('  ' + loopsEnd.join('\n  ')) : '')
            + '\n}';
        var allDefs = define.join('\n') + '\n' + imports.join('\n') + '\n\n'
            + definitions_var.join('\n')
            + '\n\n' + definitions_fun.join('\n')
            + '\n\nvoid setup() {\n  '
            + setupsBegin.join('\n  ') + ((setupsBegin.length && (setupsEnd.length || setups.length)) ? '\n  ' : '')
            + setups.join('\n  ') + ((setupsEnd.length && setups.length) ? '\n  ' : '')
            + setupsEnd.join('\n  ') + '\n}' + '\n\n';
        return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code;
    }

    scrubNakedValue(line) {
        return line + ';\n'
    }

    quote_(string) {
        // TODO: This is a quick hack.  Replace with goog.string.quote
        //return goog.string.quote(string);
        return "\"" + string + "\"";
    }

    scrub_(block, code) {
        if (code === null) {
            // Block has handled code generation itself.
            return '';
        }
        var commentCode = '';
        // Only collect comments for blocks that aren't inline.
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            // Collect comment for this block.
            let comment = block.getCommentText();
            if (comment) {
                commentCode += this.prefixLines(comment, '// ') + '\n';
            }
            // Collect comments for all value arguments.
            // Don't collect comments for nested statements.
            for (var x = 0; x < block.inputList.length; x++) {
                if (block.inputList[x].type == Blockly.INPUT_VALUE) {
                    var childBlock = block.inputList[x].connection.targetBlock();
                    if (childBlock) {
                        let comment = this.allNestedComments(childBlock);
                        if (comment) {
                            commentCode += this.prefixLines(comment, '// ');
                        }
                    }
                }
            }
        }
        var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        var nextCode = this.blockToCode(nextBlock);
        return commentCode + code + nextCode;
    }
}

export const Arduino = new ArduinoGenerator();
