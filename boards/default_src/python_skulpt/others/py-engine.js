/* eslint-disable new-cap */
import Sk from './skulpt/skulpt';
import { Events, Debug } from 'mixly';
import MIXPY_TEMPLATE from '../templates/python/mixpy.py';

const externalLibs = {//外部引入的第三方库
    "./numpy/__init__.js": "../common/js/skulpt_libs/numpy/__init__.js",
    "./pygal/__init__.js": "../common/js/skulpt_libs/pygal/__init__.js",
    // "./numpy/random/__init__.js" : 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_numpy@master/numpy/random/__init__.js',
    "./matplotlib/__init__.js": '../common/js/skulpt_libs/matplotlib/__init__.js',
    "./matplotlib/pyplot/__init__.js": "../common/js/skulpt_libs/pyplot/__init__.js",
    './pgzhelper/__init__.js': "../common/js/skulpt_libs/pgzhelper/pgzhelper.js",
    "./sprite/__init__.js": "../common/js/skulpt_libs/sprite/basic.js"
};

var GLOBAL_VALUE;

function prettyPrintError(error) {
    if (typeof error === "string") {
        return error;
    }
    // A weird skulpt thing?
    if (error.tp$str !== undefined) {
        return error.tp$str().v;
    }
    return "" + error.name + ": " + error.message;
}

export default class PyEngine {
    #events_ = new Events(['input', 'output', 'display', 'finished', 'error']);

    constructor(programStatus, mixpyProject) {
        this.programStatus = programStatus;
        this.mixpyProject = mixpyProject;
        /**
         * Definable function to be run when execution has fully ended,
         * whether it succeeds or fails.
         *
         */
        this.onExecutionEnd = null;
    }

    getEvents() {
        return this.#events_;
    }

    /**
     * Helper function that will attempt to call the defined onExecutionEnd,
     * but will do nothing if there is no function defined.
     */
    executionEnd_() {
        if (this.onExecutionEnd !== null) {
            this.onExecutionEnd();
        }
    }

    /**
     * Initializes the Python Execution engine and the Printer (console).
     */
    loadEngine(container) {
        Sk.__future__ = Sk.python3;
        // No connected services
        Sk.connectedServices = {};
        // No time limit
        //Sk.execLimit = null;
        // Ensure version 3, so we get proper print handling
        // Sk.python3 = true;
        //输出海龟画图图片
        //如果需要输出pygame_zero场景，需要重新设置
        Sk.TurtleGraphics = {
            target: container,
            width: 500,
            height: 500
        };

        //数据分析显示图片
        Sk.MatPlotLibGraphics = {
            target: container,
            width: 500,
            height: 500
        };
        // TODO
        //Sk.console = printer.getConfiguration();
        // Definitely use a prompt
        Sk.inputfunTakesPrompt = true;

        // Keeps track of the tracing while the program is executing; destroyed afterwards.
        this.executionBuffer = {};

        Sk.domOutput = (html) => {
            const dom = this.#events_.on('display', html)[0];
            return dom;
        };

        Sk.configure({
            //设置文本输出
            output: (lineText) => {
                this.#events_.run('output', {
                    content: lineText
                });
            },
            // Function to handle loading in new files
            read: this.readFile.bind(this),
            inputfun: this.skInput.bind(this),
            inputfunTakesPrompt: true,
            execLimit: Number.POSITIVE_INFINITY,
            fileread: this.fileread.bind(this),
            filewrite: this.filewrite.bind(this),
            __future__: Sk.python3, //python3已成默认值，要使用python2需要单独设置
        });

        Sk.builtins.value = new Sk.builtin.func(function () {
            return Sk.ffi.remapToPy(GLOBAL_VALUE === undefined ? 5 : GLOBAL_VALUE);
        });
        Sk.builtins.set_value = new Sk.builtin.func(function (v) {
            GLOBAL_VALUE = v.v;
        });

        Sk.builtinFiles.files['./mixpy.py'] = MIXPY_TEMPLATE;
    }

    /**
     * Used to access Skulpt built-ins. This is pretty generic, taken
     * almost directly from the Skulpt docs.
     *
     * @param {String} filename - The python filename (e.g., "os" or "pprint") that will be loaded.
     * @returns {String} The JavaScript source code of the file (weird, right?)
     * @throws Will throw an error if the file isn't found.
     */
    readFile(file) {
        // console.log("Attempting file: " + Sk.ffi.remapToJs(file));
        // 加载模块
        // if (PyGameZero.matchModelName(file)) {
        //     return PyGameZero.load(file);
        // }
        if (externalLibs[file] !== undefined) {
            return Sk.misceval.promiseToSuspension(fetch(externalLibs[file]).then((resp) => resp.text()));
        }
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[file] === undefined) {
            throw "File not found: '" + file + "'";
        }
        return Sk.builtinFiles.files[file];
    }

    fileread(filename, mode) {
        if (this.mixpyProject.exist(filename)) {
            return this.mixpyProject.getFileContent(filename);
        }
        if (mode.indexOf('w') !== -1) {
            this.mixpyProject.add(filename, '', 1);
            return '';
        }
        return null;
    }

    filewrite(fileItem, str) {
        var filename = fileItem.name;
        this.mixpyProject.modify(filename, str);
        this.mixpyProject.select(filename);
    }

    skInput(prompt) {
        return new Promise((resolve, reject) => {
            this.#events_.run('input', {
                content: {
                    prompt
                },
                resolve, reject
            });
        });
    }

    /**
     * Resets the state of the execution engine, including reinitailizing
     * the execution buffer (trace, step, etc.), reseting the printer, and
     * hiding the trace button.
     *
     */
    reset() {
        Sk.execLimit = Number.POSITIVE_INFINITY;
        Sk.TurtleGraphics.reset && Sk.TurtleGraphics.reset();
    }

    kill() {
        // 新增了sprite相关内容
        window.SPRITE.kill();
        //点击取消按钮发送数据
        Sk.execLimit = 0;
        this.executionEnd_();
    }

    /**
     * "Steps" the execution of the code, meant to be used as a callback to the Skulpt
     * environment.
     *
     * @param {Object} variables - Hash that maps the names of variables (Strings) to their Skulpt representation.
     * @param {Number} lineNumber - The corresponding line number in the source code that is being executed.
     * @param {Number} columnNumber - The corresponding column number in the source code that is being executed. Think of it as the "X" position to the lineNumber's "Y" position.
     * @param {String} filename - The name of the python file being executed (e.g., "__main__.py").
     * @param {String} astType - Unused? TODO: What is this?
     * @param {String} ast - String-encoded JSON representation of the AST node associated with this element.
     */
    step(variables, lineNumber,
        columnNumber, filename) {
        if (filename == '<stdin>.py') {
            var currentStep = this.executionBuffer.step;
            var globals = this.parseGlobals(variables);
            this.executionBuffer.trace.push(
                {
                    'step': currentStep,
                    'filename': filename,
                    //'block': highlightMap[lineNumber-1],
                    'line': lineNumber,
                    'column': columnNumber,
                    'properties': globals.properties,
                    'modules': globals.modules
                }
            );
            this.executionBuffer.step = currentStep + 1;
            this.executionBuffer.last_step = currentStep + 1;
            this.executionBuffer.line_number = lineNumber;
        }
    }

    /**
     * Runs the AbstractInterpreter to get some static information about the code,
     * in particular the variables' types. This is needed for type checking.
     *
     * @returns {Object<String, AIType>} Maps variable names (as Strings) to types as constructed by the AbstractIntepreter.
     */
    analyzeVariables() {
        // Get the code
        var code = this.main.model.programs['__main__']();
        if (code.trim() == "") {
            return {};
        }

        // var analyzer = new AbstractInterpreter(code);
        // report = analyzer.report;
        // return analyzer.variableTypes;
    }

    /**
     * Runs the AbstractInterpreter to get some static information about the code,
     * including potential semantic errors. It then parses that information to give
     * feedback.
     *
     * @returns {Boolean} Whether the code was successfully analyzed.
     */
    analyze() {
        this.main.model.execution.status("analyzing");

        // var feedback = this.main.components.feedback;

        // Get the code
        var code = this.main.model.programs['__main__']();
        if (code.trim() == "") {
            this.main.components.feedback.emptyProgram("You haven't written any code yet!");
            //this.main.model.feedback.status("semantic");
            return false;
        }

        return true;
    }

    /**
     * Runs the given python code, resetting the console and Trace Table.
     */
    run(code) {
        // Reset everything
        this.reset();
        if (code.indexOf('import sprite') !== -1
            || code.indexOf('from sprite import') !== -1) {
            window.SPRITE.runit(Sk.TurtleGraphics.target);
        }
        this.programStatus['running'] = true;
        Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
            .then(() => {
                window.SPRITE.running = false;
                this.programStatus['running'] = false;
                this.#events_.run('finished');
            })
            .catch((error) => {
                Debug.error(error);
                window.SPRITE.running = false;
                this.programStatus['running'] = false;
                this.#events_.run('error', error);
                var original = prettyPrintError(error);
                this.#events_.run('finished');
                //hack for kill program with time limiterror
                if (original.indexOf("TimeLimitError") !== -1) {
                    return;
                }
                this.executionEnd_();
            });
    }

    setupEnvironment(student_code, traceTable, output, ast, final_values) {
        var model = this.main.model;
        this._backup_execution = Sk.afterSingleExecution;
        Sk.afterSingleExecution = undefined;
        Sk.builtins.get_output = new Sk.builtin.func(function () {
            Sk.builtin.pyCheckArgs("get_output", arguments, 0, 0);
            return Sk.ffi.remapToPy(model.execution.output());
        });
        Sk.builtins.reset_output = new Sk.builtin.func(function () {
            Sk.builtin.pyCheckArgs("reset_output", arguments, 0, 0);
            model.execution.output.removeAll();
        });
        Sk.builtins.log = new Sk.builtin.func(function (data) {
            Sk.builtin.pyCheckArgs("log", arguments, 1, 1);
            console.log(data);
        });
        //Sk.builtins.trace = Sk.ffi.remapToPy(traceTable);
        Sk.builtins._trace = traceTable;
        Sk.builtins._final_values = final_values;
        Sk.builtins.code = Sk.ffi.remapToPy(student_code);
        Sk.builtins.set_success = this.instructor_module.set_success;
        Sk.builtins.set_feedback = this.instructor_module.set_feedback;
        Sk.builtins.set_finished = this.instructor_module.set_finished;
        Sk.builtins.count_components = this.instructor_module.count_components;
        Sk.builtins.no_nonlist_nums = this.instructor_module.no_nonlist_nums;
        Sk.builtins.only_printing_properties = this.instructor_module.only_printing_properties;
        Sk.builtins.calls_function = this.instructor_module.calls_function;
        Sk.builtins.get_property = this.instructor_module.get_property;
        Sk.builtins.get_value_by_name = this.instructor_module.get_value_by_name;
        Sk.builtins.get_value_by_type = this.instructor_module.get_value_by_type;
        Sk.builtins.parse_json = this.instructor_module.parse_json;
        Sk.skip_drawing = true;
        model.settings.mute_printer(true);
    }

    disposeEnvironment() {
        Sk.afterSingleExecution = this._backup_execution;
        Sk.builtins.get_output = undefined;
        Sk.builtins.reset_output = undefined;
        Sk.builtins.log = undefined;
        Sk.builtins._trace = undefined;
        Sk.builtins.trace = undefined;
        Sk.builtins.code = undefined;
        Sk.builtins.set_success = undefined;
        Sk.builtins.set_feedback = undefined;
        Sk.builtins.set_finished = undefined;
        Sk.builtins.count_components = undefined;
        Sk.builtins.calls_function = undefined;
        Sk.builtins.get_property = undefined;
        Sk.builtins.get_value_by_name = undefined;
        Sk.builtins.get_value_by_type = undefined;
        Sk.builtins.no_nonlist_nums = undefined;
        Sk.builtins.only_printing_properties = undefined;
        Sk.builtins.parse_json = undefined;
        Sk.skip_drawing = false;
        GLOBAL_VALUE = undefined;
        this.main.model.settings.mute_printer(false);
    }

    parseGlobals(variables) {
        var result = Array();
        var modules = Array();
        for (var property in variables) {
            var value = variables[property];
            if (property !== "__name__" && property !== "__doc__") {
                property = property.replace('_$rw$', '')
                    .replace('_$rn$', '');
                var parsed = this.parseValue(property, value);
                if (parsed !== null) {
                    result.push(parsed);
                } else if (value.constructor == Sk.builtin.module) {
                    modules.push(value.$d.__name__.v);
                }
            }
        }
        return { "properties": result, "modules": modules };
    }

    parseValue(property, value) {
        if (value == undefined) {
            return {
                'name': property,
                'type': 'Unknown',
                "value": 'Undefined'
            };
        }
        switch (value.constructor) {
            case Sk.builtin.func:
                return {
                    'name': property,
                    'type': "Function",
                    "value": (value.func_code.co_varnames !== undefined ?
                        " Arguments: " + value.func_code.co_varnames.join(", ") :
                        ' No arguments')
                };
            case Sk.builtin.module: return null;
            case Sk.builtin.str:
                return {
                    'name': property,
                    'type': "String",
                    "value": value.$r().v
                };
            case Sk.builtin.none:
                return {
                    'name': property,
                    'type': "None",
                    "value": "None"
                };
            case Sk.builtin.bool:
                return {
                    'name': property,
                    'type': "Boolean",
                    "value": value.$r().v
                };
            case Sk.builtin.nmber:
                return {
                    'name': property,
                    'type': "int" == value.skType ? "Integer" : "Float",
                    "value": value.$r().v
                };
            case Sk.builtin.int_:
                return {
                    'name': property,
                    'type': "Integer",
                    "value": value.$r().v
                };
            case Sk.builtin.float_:
                return {
                    'name': property,
                    'type': "Float",
                    "value": value.$r().v
                };
            case Sk.builtin.tuple:
                return {
                    'name': property,
                    'type': "Tuple",
                    "value": value.$r().v
                };
            case Sk.builtin.list:
                if (value.v.length <= 20) {
                    return {
                        'name': property,
                        'type': "List",
                        "value": value.$r().v,
                        'exact_value': value
                    };
                }
                return {
                    'name': property,
                    'type': "List",
                    "value": "[... " + value.v.length + " elements ...]",
                    "exact_value": value
                };

            case Sk.builtin.dict:
                return {
                    'name': property,
                    'type': "Dictionary",
                    "value": value.$r().v
                };
            case Number:
                return {
                    'name': property,
                    'type': value % 1 === 0 ? "Integer" : "Float",
                    "value": value
                };
            case String:
                return {
                    'name': property,
                    'type': "String",
                    "value": value
                };
            case Boolean:
                return {
                    'name': property,
                    'type': "Boolean",
                    "value": (value ? "True" : "False")
                };
            default:
                return {
                    'name': property,
                    'type': value.tp$name == undefined ? value : value.tp$name,
                    "value": value.$r == undefined ? value : value.$r().v
                };
        }
    }
}

/**
 * Skulpt Module for holding the Instructor API.
 *
 * This module is a little hackish. We need to sit down and reevaluate the best way to
 * organize it and whether this particular structure is ideal. I suspect it should be
 * it's own proper JS file.
 *
 * @param {String} name - The name of the module (should always be 'instructor')
 *
 */
// var instructor_module = function (name) {
//     // Main module object that gets returned at the end.
//     var mod = {};

//     /**
//      * Skulpt Exception that represents a Feedback object, to be rendered to the user
//      * when the feedback system finds a problem.
//      *
//      * @param {Array} args - A list of optional arguments to pass to the Exception.
//      *                       Usually this will include a message for the user.
//      */
//     Sk.builtin.Feedback = function (args) {
//         var o;
//         if (!(this instanceof Sk.builtin.Feedback)) {
//             o = Object.create(Sk.builtin.Feedback.prototype);
//             o.constructor.apply(o, arguments);
//             return o;
//         }
//         Sk.builtin.Exception.apply(this, arguments);
//     };
//     Sk.abstr.setUpInheritance("Feedback", Sk.builtin.Feedback, Sk.builtin.Exception);

//     /**
//      * Skulpt Exception that represents a Success object, to be thrown when the user
//      * completes their program successfully.
//      *
//      ** @param {Array} args - A list of optional arguments to pass to the Exception.
//      *                       Usually this will be empty.
//      */
//     Sk.builtin.Success = function (args) {
//         var o;
//         if (!(this instanceof Sk.builtin.Success)) {
//             o = Object.create(Sk.builtin.Success.prototype);
//             o.constructor.apply(o, arguments);
//             return o;
//         }
//         Sk.builtin.Exception.apply(this, arguments);
//     };
//     Sk.abstr.setUpInheritance("Success", Sk.builtin.Success, Sk.builtin.Exception);

//     /**
//      * Skulpt Exception that represents a Finished object, to be thrown when the user
//      * completes their program successfully, but isn't in a problem with a "solution".
//      * This is useful for open-ended canvases where we still want to capture the students'
//      * code in Canvas.
//      *
//      ** @param {Array} args - A list of optional arguments to pass to the Exception.
//      *                       Usually this will be empty.
//      */
//     Sk.builtin.Finished = function (args) {
//         var o;
//         if (!(this instanceof Sk.builtin.Finished)) {
//             o = Object.create(Sk.builtin.Finished.prototype);
//             o.constructor.apply(o, arguments);
//             return o;
//         }
//         Sk.builtin.Exception.apply(this, arguments);
//     };
//     Sk.abstr.setUpInheritance("Finished", Sk.builtin.Finished, Sk.builtin.Exception);

//     /**
//      * A Skulpt function that throws a Feedback exception, allowing us to give feedback
//      * to the user through the Feedback panel. This function call is done for aesthetic
//      * reasons, so that we are calling a function instead of raising an error. Still,
//      * exceptions allow us to break out of the control flow immediately, like a
//      * return, so they are a good mechanism to use under the hood.
//      *
//      * @param {String} message - The message to display to the user.
//      */
//     mod.set_feedback = new Sk.builtin.func(function (message) {
//         Sk.builtin.pyCheckArgs("set_feedback", arguments, 1, 1);
//         Sk.builtin.pyCheckType("message", "string", Sk.builtin.checkString(message));
//         throw new Sk.builtin.Feedback(message.v);
//     });

//     /**
//      * A Skulpt function that throws a Success exception. This will terminate the
//      * feedback analysis, but reports that the students' code was successful.
//      * This function call is done for aesthetic reasons, so that we are calling a
//      * function instead of raising an error. Still, exceptions allow us to break
//      * out of the control flow immediately, like a return would, so they are a
//      * good mechanism to use under the hood.
//      */
//     mod.set_success = new Sk.builtin.func(function () {
//         Sk.builtin.pyCheckArgs("set_success", arguments, 0, 0);
//         throw new Sk.builtin.Success();
//     });

//     /**
//      * A Skulpt function that throws a Finished exception. This will terminate the
//      * feedback analysis, but reports that the students' code was successful.
//      * This function call is done for aesthetic reasons, so that we are calling a
//      * function instead of raising an error. Still, exceptions allow us to break
//      * out of the control flow immediately, like a return would, so they are a
//      * good mechanism to use under the hood.
//      */
//     mod.set_finished = new Sk.builtin.func(function () {
//         Sk.builtin.pyCheckArgs("set_finished", arguments, 0, 0);
//         throw new Sk.builtin.Finished();
//     });

//     // Memoization of previous parses - some mild redundancy to save time
//     // TODO: There's no evidence this is good, and could be a memory hog on big
//     // programs. Someone should investigate this. The assumption is that multiple
//     // helper functions might be using parses. But shouldn't we trim old parses?
//     // Perhaps a timed cache would work better.
//     var parses = {};

//     /**
//      * Given source code as a string, return a flat list of all of the AST elements
//      * in the parsed source code.
//      *
//      * TODO: There's redundancy here, since the source code was previously parsed
//      * to run the file and to execute it. We should probably be able to do this just
//      * once and shave off time.
//      *
//      * @param {String} source - Python source code.
//      * @returns {Array.<Object>}
//      */
//     function getParseList(source) {
//         if (!(source in parses)) {
//             var parse = Sk.parse("__main__", source);
//             parses[source] = Sk.astFromParse(parse.cst, "__main__", parse.flags);
//         }
//         var ast = parses[source];
//         return (new NodeVisitor()).recursive_walk(ast);
//     }

//     /**
//      * Given source code as a string, return a list of all of the AST elements
//      * that are Num (aka numeric literals) but that are not inside List elements.
//      *
//      * @param {String} source - Python source code.
//      * @returns {Array.number} The list of JavaScript numeric literals that were found.
//      */
//     function getNonListNums(source) {
//         if (!(source in parses)) {
//             var parse = Sk.parse("__main__", source);
//             parses[source] = Sk.astFromParse(parse.cst, "__main__", parse.flags);
//         }
//         var ast = parses[source];
//         var visitor = new NodeVisitor();
//         var insideList = false;
//         var nums = [];
//         visitor.visit_List = function (node) {
//             insideList = true;
//             this.generic_visit(node);
//             insideList = false;
//         }
//         visitor.visit_Num = function (node) {
//             if (!insideList) {
//                 nums.push(node.n);
//             }
//             this.generic_visit(node);
//         }
//         visitor.visit(ast);
//         return nums;
//     }

//     /**
//      * Given source code as a string, return a list of all of the AST elements
//      * that are being printed (using the print function) but are not variables.
//      *
//      * @param {String} source - Python source code.
//      * @returns {Array.<Object>} The list of AST elements that were found.
//      */
//     function getPrintedNonProperties(source) {
//         if (!(source in parses)) {
//             var parse = Sk.parse("__main__", source);
//             parses[source] = Sk.astFromParse(parse.cst, "__main__", parse.flags);
//         }
//         var ast = parses[source];
//         var visitor = new NodeVisitor();
//         var nonVariables = [];
//         visitor.visit_Call = function (node) {
//             var func = node.func;
//             var args = node.args;
//             if (func._astname == 'Name' && func.id.v == 'print') {
//                 for (var i = 0; i < args.length; i += 1) {
//                     if (args[i]._astname != "Name") {
//                         nonVariables.push(args[i]);
//                     }
//                 }
//             }
//             this.generic_visit(node);
//         }
//         visitor.visit(ast);
//         return nonVariables;
//     }

//     /**
//      * Skulpt function to iterate through the final state of
//      * all the variables in the program, and check to see if they have
//      * a given value.
//      */
//     mod.get_value_by_name = new Sk.builtin.func(function (name) {
//         Sk.builtin.pyCheckArgs("get_value_by_name", arguments, 1, 1);
//         Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(name));
//         name = name.v;
//         var final_values = Sk.builtins._final_values;
//         if (name in final_values) {
//             return final_values[name];
//         }
//         return Sk.builtin.none.none$;

//     });
//     mod.get_value_by_type = new Sk.builtin.func(function (type) {
//         Sk.builtin.pyCheckArgs("get_value_by_type", arguments, 1, 1);

//         var final_values = Sk.builtins._final_values;
//         var result = [];
//         for (var property in final_values) {
//             if (final_values[property].tp$name == type.tp$name) {
//                 result.push(final_values[property]);
//             }
//         }
//         return Sk.builtin.list(result);
//     });

//     mod.parse_json = new Sk.builtin.func(function (blob) {
//         Sk.builtin.pyCheckArgs("parse_json", arguments, 1, 1);
//         Sk.builtin.pyCheckType("blob", "string", Sk.builtin.checkString(blob));
//         blob = blob.v;
//         return Sk.ffi.remapToPy(JSON.parse(blob));
//     });
//     mod.get_property = new Sk.builtin.func(function (name) {
//         Sk.builtin.pyCheckArgs("get_property", arguments, 1, 1);
//         Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(name));
//         name = name.v;
//         var trace = Sk.builtins._trace;
//         if (trace.length <= 0) {
//             return Sk.builtin.none.none$;
//         }
//         var properties = trace[trace.length - 1]["properties"];
//         for (var i = 0, len = properties.length; i < len; i += 1) {
//             if (properties[i]['name'] == name) {
//                 return Sk.ffi.remapToPy(properties[i])
//             }
//         }
//         return Sk.builtin.none.none$;
//     });

//     mod.calls_function = new Sk.builtin.func(function (source, name) {
//         Sk.builtin.pyCheckArgs("calls_function", arguments, 2, 2);
//         Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));
//         Sk.builtin.pyCheckType("name", "string", Sk.builtin.checkString(name));

//         source = source.v;
//         name = name.v;

//         var ast_list = getParseList(source);

//         var count = 0;
//         for (var i = 0, len = ast_list.length; i < len; i = i + 1) {
//             if (ast_list[i]._astname == 'Call') {
//                 if (ast_list[i].func._astname == 'Attribute') {
//                     count += Sk.ffi.remapToJs(ast_list[i].func.attr) == name | 0;
//                 } else if (ast_list[i].func._astname == 'Name') {
//                     count += Sk.ffi.remapToJs(ast_list[i].func.id) == name | 0;
//                 }
//             }
//         }

//         return Sk.ffi.remapToPy(count > 0);
//     });

//     mod.count_components = new Sk.builtin.func(function (source, component) {
//         Sk.builtin.pyCheckArgs("count_components", arguments, 2, 2);
//         Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));
//         Sk.builtin.pyCheckType("component", "string", Sk.builtin.checkString(component));

//         source = source.v;
//         component = component.v;

//         var ast_list = getParseList(source);

//         var count = 0;
//         for (var i = 0, len = ast_list.length; i < len; i = i + 1) {
//             if (ast_list[i]._astname == component) {
//                 count = count + 1;
//             }
//         }

//         return Sk.ffi.remapToPy(count);
//     });

//     mod.no_nonlist_nums = new Sk.builtin.func(function (source) {
//         Sk.builtin.pyCheckArgs("no_nonlist_nums", arguments, 1, 1);
//         Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));

//         source = source.v;

//         var num_list = getNonListNums(source);

//         var count = 0;
//         for (var i = 0, len = num_list.length; i < len; i = i + 1) {
//             if (num_list[i].v != 0 && num_list[i].v != 1) {
//                 return Sk.ffi.remapToPy(true);
//             }
//         }
//         return Sk.ffi.remapToPy(false);
//     });
//     mod.only_printing_properties = new Sk.builtin.func(function (source) {
//         Sk.builtin.pyCheckArgs("only_printing_properties", arguments, 1, 1);
//         Sk.builtin.pyCheckType("source", "string", Sk.builtin.checkString(source));

//         source = source.v;

//         var non_var_list = getPrintedNonProperties(source);
//         return Sk.ffi.remapToPy(non_var_list.length == 0);
//     });

//     return mod;
// }
