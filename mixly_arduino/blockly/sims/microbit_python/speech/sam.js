// Note: Some Emscripten settings will significantly limit the speed of the generated code.
// Note: Some Emscripten settings may limit the speed of the generated code.
try {
  this['Module'] = Module;
} catch(e) {
  this['Module'] = Module = {};
}
// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  Module['print'] = function(x) {
    process['stdout'].write(x + '\n');
  };
  Module['printErr'] = function(x) {
    process['stderr'].write(x + '\n');
  };
  var nodeFS = require('fs');
  var nodePath = require('path');
  Module['read'] = function(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };
  Module['readBinary'] = function(filename) { return Module['read'](filename, true) };
  Module['load'] = function(f) {
    globalEval(read(f));
  };
  if (!Module['arguments']) {
    Module['arguments'] = process['argv'].slice(2);
  }
}
if (ENVIRONMENT_IS_SHELL) {
  Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm
  Module['read'] = read;
  Module['readBinary'] = function(f) {
    return read(f, 'binary');
  };
  if (!Module['arguments']) {
    if (typeof scriptArgs != 'undefined') {
      Module['arguments'] = scriptArgs;
    } else if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
}
if (ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) {
  if (!Module['print']) {
    Module['print'] = function(x) {
      console.log(x);
    };
  }
  if (!Module['printErr']) {
    Module['printErr'] = function(x) {
      console.log(x);
    };
  }
}
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };
  if (!Module['arguments']) {
    if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
}
if (ENVIRONMENT_IS_WORKER) {
  // We can do very little here...
  var TRY_USE_DUMP = false;
  if (!Module['print']) {
    Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }
  Module['load'] = importScripts;
}
if (!ENVIRONMENT_IS_WORKER && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_SHELL) {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}
function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***
// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];
// Callbacks
if (!Module['preRun']) Module['preRun'] = [];
if (!Module['postRun']) Module['postRun'] = [];
// === Auto-generated preamble library stuff ===
//========================================
// Runtime code shared with compiler
//========================================
var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      var logg = log2(quantum);
      return '((((' +target + ')+' + (quantum-1) + ')>>' + logg + ')<<' + logg + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (/^\[\d+\ x\ (.*)\]/.test(type)) return true; // [15 x ?] blocks. Like structs
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type, quantumSize) {
    if (Runtime.QUANTUM_SIZE == 1) return 1;
    var size = {
      '%i1': 1,
      '%i8': 1,
      '%i16': 2,
      '%i32': 4,
      '%i64': 8,
      "%float": 4,
      "%double": 8
    }['%'+type]; // add '%' since float and double confuse Closure compiler as keys, and also spidermonkey as a compiler will remove 's from '_i8' etc
    if (!size) {
      if (type.charAt(type.length-1) == '*') {
        size = Runtime.QUANTUM_SIZE; // A pointer
      } else if (type[0] == 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 == 0);
        size = bits/8;
      }
    }
    return size;
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    type.flatIndexes = type.fields.map(function(field) {
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = size;
      } else if (Runtime.isStructType(field)) {
        size = Types.types[field].flatSize;
        alignSize = Types.types[field].alignSize;
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else {
        throw 'Unclear type in struct: ' + field + ', in ' + type.name_ + ' :: ' + dump(Types.types[type.name_]);
      }
      alignSize = type.packed ? 1 : Math.min(alignSize, Runtime.QUANTUM_SIZE);
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      assert(args.length == sig.length-1);
      return FUNCTION_TABLE[ptr].apply(null, args);
    } else {
      assert(sig.length == 1);
      return FUNCTION_TABLE[ptr]();
    }
  },
  addFunction: function (func, sig) {
    //assert(sig); // TODO: support asm
    var table = FUNCTION_TABLE; // TODO: support asm
    var ret = table.length;
    table.push(func);
    table.push(0);
    return ret;
  },
  removeFunction: function (index) {
    var table = FUNCTION_TABLE; // TODO: support asm
    table[index] = null;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function() {
        Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xff;
      if (needed) {
        buffer.push(code);
        needed--;
      }
      if (buffer.length == 0) {
        if (code < 128) return String.fromCharCode(code);
        buffer.push(code);
        if (code > 191 && code < 224) {
          needed = 1;
        } else {
          needed = 2;
        }
        return '';
      }
      if (needed > 0) return '';
      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var ret;
      if (c1 > 191 && c1 < 224) {
        ret = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      } else {
        ret = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = ((((STACKTOP)+3)>>2)<<2);assert((STACKTOP|0) < (STACK_MAX|0)); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = ((((STATICTOP)+3)>>2)<<2); if (STATICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 4))*(quantum ? quantum : 4); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? (((low)>>>(0))+(((high)>>>(0))*4294967296)) : (((low)>>>(0))+(((high)|(0))*4294967296))); return ret; },
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var setjmpId = 1; // Used in setjmp/longjmp
var setjmpLabels = {};
var ABORT = false;
var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;
function abort(text) {
  Module.print(text + ':\n' + (new Error).stack);
  ABORT = true;
  throw "Assertion: " + text;
}
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}
var globalScope = this;
// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;
// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = globalScope['Module']['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}
// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length+1);
      writeStringToMemory(value, ret);
      return ret;
    } else if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}
// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;
// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,Math.min(Math.floor((value)/4294967296), 4294967295)>>>0],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': (HEAPF64[(tempDoublePtr)>>3]=value,HEAP32[((ptr)>>2)]=HEAP32[((tempDoublePtr)>>2)],HEAP32[(((ptr)+(4))>>2)]=HEAP32[(((tempDoublePtr)+(4))>>2)]); break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;
// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return (HEAP32[((tempDoublePtr)>>2)]=HEAP32[((ptr)>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((ptr)+(4))>>2)],HEAPF64[(tempDoublePtr)>>3]);
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_NONE = 3; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_NONE'] = ALLOC_NONE;
// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === 'string' ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }
  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }
  if (singleType === 'i8') {
    HEAPU8.set(new Uint8Array(slab), ret);
    return ret;
  }
  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];
    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');
    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later
    setValue(ret+i, curr, type);
    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
Module['allocate'] = allocate;
function Pointer_stringify(ptr, /* optional */ length) {
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;
  var ret = '';
  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;
// Memory management
var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return ((x+4095)>>12)<<12;
}
var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STACK_ROOT, STACKTOP, STACK_MAX;
var STATICTOP;
function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value, (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;
// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(!!Int32Array && !!Float64Array && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');
var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');
Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;
STACK_ROOT = STACKTOP = Runtime.alignMemory(1);
STACK_MAX = TOTAL_STACK; // we lose a little stack here, but TOTAL_STACK is nice and round so use that as the max
var tempDoublePtr = Runtime.alignMemory(allocate(12, 'i8', ALLOC_STACK), 8);
assert(tempDoublePtr % 8 == 0);
function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}
function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}
STATICTOP = STACK_MAX;
assert(STATICTOP < TOTAL_MEMORY); // Stack must fit in TOTAL_MEMORY; allocations from here on may enlarge TOTAL_MEMORY
var nullString = allocate(intArrayFromString('(null)'), 'i8', ALLOC_STACK);
function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATINIT__ = []; // functions called during startup
var __ATMAIN__ = []; // functions called when main() is to be run
var __ATEXIT__ = []; // functions called during shutdown
var runtimeInitialized = false;
function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}
// Tools
// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;
function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;
// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;
function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;
function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}
if (!Math.imul) Math.imul = function(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyTracking = {};
var calledInit = false, calledRun = false;
var runDependencyWatcher = null;
function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 6000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
    if (!calledRun && shouldRunNow) run();
  }
}
Module['removeRunDependency'] = removeRunDependency;
Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
function addPreRun(func) {
  if (!Module['preRun']) Module['preRun'] = [];
  else if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
  Module['preRun'].push(func);
}
var awaitingMemoryInitializer = false;
function loadMemoryInitializer(filename) {
  function applyData(data) {
    HEAPU8.set(data, TOTAL_STACK);
    runPostSets();
  }
  // always do this asynchronously, to keep shell and web as similar as possible
  addPreRun(function() {
    if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
      applyData(Module['readBinary'](filename));
    } else {
      Browser.asyncLoad(filename, function(data) {
        applyData(data);
      }, function(data) {
        throw 'could not load memory initializer ' + filename;
      });
    }
  });
  awaitingMemoryInitializer = false;
}
// === Body ===
assert(STATICTOP == STACK_MAX); assert(STACK_MAX == TOTAL_STACK);
STATICTOP += 13884;
assert(STATICTOP < TOTAL_MEMORY);
/* memory initializer */ allocate([6,0,0,0,7,0,0,0,162,0,0,0,167,0,0,0,167,0,0,0,127,0,0,0,128,0,0,0,226,0,0,0,60,0,0,0,60,0,0,0,0,0,0,0,0,0,0,0,225,0,0,0,60,0,0,0,59,0,0,0,0,0,0,0,0,0,0,0,200,0,0,0,0,0,0,0,0,0,0,0,54,0,0,0,55,0,0,0,199,0,0,0,0,0,0,0,0,0,0,0,54,0,0,0,54,0,0,0,128,0,0,0,24,26,23,23,23,0,0,0,0,0,224,230,236,243,249,0,6,12,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,241,226,211,187,124,149,1,2,3,3,0,114,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,0,25,0,0,0,0,0,0,0,0,0,0,31,31,31,31,2,2,2,2,2,2,2,2,2,5,5,2,10,2,8,5,5,11,10,9,8,8,160,8,8,23,31,18,18,18,18,30,30,20,20,20,20,23,23,26,26,29,29,2,2,2,2,2,2,26,29,27,26,29,27,26,29,27,26,29,27,23,29,23,23,29,23,23,29,23,23,29,23,23,23,0,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3,3,3,1,2,3,2,1,3,3,3,3,1,1,3,3,3,2,2,3,2,3,0,0,5,5,5,5,4,4,2,0,2,2,0,3,2,0,4,2,0,3,2,0,2,2,0,2,3,0,3,3,0,3,176,160,0,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,3,2,4,4,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,0,1,0,1,0,5,5,5,5,5,4,4,2,0,1,2,0,1,2,0,1,2,0,1,2,0,2,2,0,1,3,0,2,3,0,2,160,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,125,126,126,127,128,129,130,130,130,132,132,132,132,132,133,135,135,136,136,137,138,139,139,140,140,140,0,0,0,149,247,162,57,197,6,126,199,38,55,78,145,241,85,161,254,36,69,45,167,54,83,46,71,218,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,130,0,0,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,192,168,176,172,192,160,184,160,192,188,160,172,168,172,192,160,160,172,180,164,192,168,168,176,192,188,0,0,0,2,0,32,32,155,32,192,185,32,205,163,76,138,142,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,49,50,51,52,53,54,55,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,0,0,0,0,0,0,16,16,16,16,16,16,32,32,32,32,32,32,48,48,48,48,48,48,48,64,64,64,64,64,64,64,80,80,80,80,80,80,80,80,96,96,96,96,96,96,96,96,96,96,96,96,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,96,96,96,96,96,96,96,96,96,96,96,96,80,80,80,80,80,80,80,80,64,64,64,64,64,64,64,48,48,48,48,48,48,48,32,32,32,32,32,32,16,16,16,16,16,16,0,0,0,0,0,240,240,240,240,240,240,224,224,224,224,224,224,208,208,208,208,208,208,208,192,192,192,192,192,192,192,176,176,176,176,176,176,176,176,160,160,160,160,160,160,160,160,160,160,160,160,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,160,160,160,160,160,160,160,160,160,160,160,160,176,176,176,176,176,176,176,176,192,192,192,192,192,192,192,208,208,208,208,208,208,208,224,224,224,224,224,224,240,240,240,240,240,240,0,0,0,0,0,0,42,42,42,42,42,89,72,72,69,65,72,79,72,88,88,82,88,72,88,88,88,88,72,42,42,42,42,42,42,88,88,42,42,72,42,72,72,88,42,72,42,72,72,42,42,42,42,42,89,89,89,87,87,87,42,42,42,42,42,42,42,42,42,88,42,42,42,42,42,42,42,42,42,42,42,88,42,42,76,77,78,0,0,0,32,46,63,44,45,73,73,69,65,65,65,65,85,65,73,69,85,79,82,76,87,89,87,82,76,87,89,77,78,78,68,81,83,83,70,84,47,47,90,90,86,68,67,42,74,42,42,42,69,65,79,65,79,85,66,42,42,68,42,42,71,42,42,71,42,42,80,42,42,84,42,42,75,42,42,75,42,42,85,85,85,0,0,0,50,0,0,0,93,193,32,40,65,46,41,61,69,72,52,89,46,160,40,65,41,32,61,65,200,32,40,65,82,69,41,32,61,65,65,210,32,40,65,82,41,79,61,65,88,210,40,65,82,41,35,61,69,72,52,210,32,94,40,65,83,41,35,61,69,89,52,211,40,65,41,87,65,61,65,216,40,65,87,41,61,65,79,181,32,58,40,65,78,89,41,61,69,72,52,78,73,217,40,65,41,94,43,35,61,69,89,181,35,58,40,65,76,76,89,41,61,85,76,73,217,32,40,65,76,41,35,61,85,204,40,65,71,65,73,78,41,61,65,88,71,69,72,52,206,35,58,40,65,71,41,69,61,73,72,202,40,65,41,94,37,61,69,217,40,65,41,94,43,58,35,61,65,197,32,58,40,65,41,94,43,32,61,69,89,180,32,40,65,82,82,41,61,65,88,210,40,65,82,82,41,61,65,69,52,210,32,94,40,65,82,41,32,61,65,65,53,210,40,65,82,41,61,65,65,53,210,40,65,73,82,41,61,69,72,52,210,40,65,73,41,61,69,89,180,40,65,89,41,61,69,89,181,40,65,85,41,61,65,79,180,35,58,40,65,76,41,32,61,85,204,35,58,40,65,76,83,41,32,61,85,76,218,40,65,76,75,41,61,65,79,52,203,40,65,76,41,94,61,65,79,204,32,58,40,65,66,76,69,41,61,69,89,52,66,85,204,40,65,66,76,69,41,61,65,88,66,85,204,40,65,41,86,79,61,69,89,180,40,65,78,71,41,43,61,69,89,52,78,202,40,65,84,65,82,73,41,61,65,72,84,65,65,52,82,73,217,40,65,41,84,79,77,61,65,197,40,65,41,84,84,73,61,65,197,32,40,65,84,41,32,61,65,69,212,32,40,65,41,84,61,65,200,40,65,41,61,65,197,93,194,32,40,66,41,32,61,66,73,89,180,32,40,66,69,41,94,35,61,66,73,200,40,66,69,73,78,71,41,61,66,73,89,52,73,72,78,216,32,40,66,79,84,72,41,32,61,66,79,87,52,84,200,32,40,66,85,83,41,35,61,66,73,72,52,218,40,66,82,69,65,75,41,61,66,82,69,89,53,203,40,66,85,73,76,41,61,66,73,72,52,204,40,66,41,61,194,93,195,32,40,67,41,32,61,83,73,89,180,32,40,67,72,41,94,61,203,94,69,40,67,72,41,61,203,40,67,72,65,41,82,35,61,75,69,72,181,40,67,72,41,61,67,200,32,83,40,67,73,41,35,61,83,65,89,180,40,67,73,41,65,61,83,200,40,67,73,41,79,61,83,200,40,67,73,41,69,78,61,83,200,40,67,73,84,89,41,61,83,73,72,84,73,217,40,67,41,43,61,211,40,67,75,41,61,203,40,67,79,77,77,79,68,79,82,69,41,61,75,65,65,52,77,65,72,68,79,72,210,40,67,79,77,41,61,75,65,72,205,40,67,85,73,84,41,61,75,73,72,212,40,67,82,69,65,41,61,75,82,73,89,69,217,40,67,41,61,203,93,196,32,40,68,41,32,61,68,73,89,180,32,40,68,82,46,41,32,61,68,65,65,52,75,84,69,210,35,58,40,68,69,68,41,32,61,68,73,72,196,46,69,40,68,41,32,61,196,35,58,94,69,40,68,41,32,61,212,32,40,68,69,41,94,35,61,68,73,200,32,40,68,79,41,32,61,68,85,215,32,40,68,79,69,83,41,61,68,65,72,218,40,68,79,78,69,41,32,61,68,65,72,53,206,40,68,79,73,78,71,41,61,68,85,87,52,73,72,78,216,32,40,68,79,87,41,61,68,65,215,35,40,68,85,41,65,61,74,85,215,35,40,68,85,41,94,35,61,74,65,216,40,68,41,61,196,93,197,32,40,69,41,32,61,73,89,73,89,180,35,58,40,69,41,32,189,39,58,94,40,69,41,32,189,32,58,40,69,41,32,61,73,217,35,40,69,68,41,32,61,196,35,58,40,69,41,68,32,189,40,69,86,41,69,82,61,69,72,52,214,40,69,41,94,37,61,73,89,180,40,69,82,73,41,35,61,73,89,52,82,73,217,40,69,82,73,41,61,69,72,52,82,73,200,35,58,40,69,82,41,35,61,69,210,40,69,82,82,79,82,41,61,69,72,52,82,79,72,210,40,69,82,65,83,69,41,61,73,72,82,69,89,53,211,40,69,82,41,35,61,69,72,210,40,69,82,41,61,69,210,32,40,69,86,69,78,41,61,73,89,86,69,72,206,35,58,40,69,41,87,189,64,40,69,87,41,61,85,215,40,69,87,41,61,89,85,215,40,69,41,79,61,73,217,35,58,38,40,69,83,41,32,61,73,72,218,35,58,40,69,41,83,32,189,35,58,40,69,76,89,41,32,61,76,73,217,35,58,40,69,77,69,78,84,41,61,77,69,72,78,212,40,69,70,85,76,41,61,70,85,72,204,40,69,69,41,61,73,89,180,40,69,65,82,78,41,61,69,82,53,206,32,40,69,65,82,41,94,61,69,82,181,40,69,65,68,41,61,69,72,196,35,58,40,69,65,41,32,61,73,89,65,216,40,69,65,41,83,85,61,69,72,181,40,69,65,41,61,73,89,181,40,69,73,71,72,41,61,69,89,180,40,69,73,41,61,73,89,180,32,40,69,89,69,41,61,65,89,180,40,69,89,41,61,73,217,40,69,85,41,61,89,85,87,181,40,69,81,85,65,76,41,61,73,89,52,75,87,85,204,40,69,41,61,69,200,93,198,32,40,70,41,32,61,69,72,52,198,40,70,85,76,41,61,70,85,72,204,40,70,82,73,69,78,68,41,61,70,82,69,72,53,78,196,40,70,65,84,72,69,82,41,61,70,65,65,52,68,72,69,210,40,70,41,70,189,40,70,41,61,198,93,199,32,40,71,41,32,61,74,73,89,180,40,71,73,86,41,61,71,73,72,53,214,32,40,71,41,73,94,61,199,40,71,69,41,84,61,71,69,72,181,83,85,40,71,71,69,83,41,61,71,74,69,72,52,211,40,71,71,41,61,199,32,66,35,40,71,41,61,199,40,71,41,43,61,202,40,71,82,69,65,84,41,61,71,82,69,89,52,212,40,71,79,78,41,69,61,71,65,79,53,206,35,40,71,72,41,189,32,40,71,78,41,61,206,40,71,41,61,199,93,200,32,40,72,41,32,61,69,89,52,67,200,32,40,72,65,86,41,61,47,72,65,69,54,214,32,40,72,69,82,69,41,61,47,72,73,89,210,32,40,72,79,85,82,41,61,65,87,53,69,210,40,72,79,87,41,61,47,72,65,215,40,72,41,35,61,47,200,40,72,41,189,93,201,32,40,73,78,41,61,73,72,206,32,40,73,41,32,61,65,89,180,40,73,41,32,61,65,217,40,73,78,41,68,61,65,89,53,206,83,69,77,40,73,41,61,73,217,32,65,78,84,40,73,41,61,65,217,40,73,69,82,41,61,73,89,69,210,35,58,82,40,73,69,68,41,32,61,73,89,196,40,73,69,68,41,32,61,65,89,53,196,40,73,69,78,41,61,73,89,69,72,206,40,73,69,41,84,61,65,89,52,69,200,40,73,39,41,61,65,89,181,32,58,40,73,41,94,37,61,65,89,181,32,58,40,73,69,41,32,61,65,89,180,40,73,41,37,61,73,217,40,73,69,41,61,73,89,180,32,40,73,68,69,65,41,61,65,89,68,73,89,53,65,200,40,73,41,94,43,58,35,61,73,200,40,73,82,41,35,61,65,89,210,40,73,90,41,37,61,65,89,218,40,73,83,41,37,61,65,89,218,73,94,40,73,41,94,35,61,73,200,43,94,40,73,41,94,43,61,65,217,35,58,94,40,73,41,94,43,61,73,200,40,73,41,94,43,61,65,217,40,73,82,41,61,69,210,40,73,71,72,41,61,65,89,180,40,73,76,68,41,61,65,89,53,76,196,32,40,73,71,78,41,61,73,72,71,206,40,73,71,78,41,32,61,65,89,52,206,40,73,71,78,41,94,61,65,89,52,206,40,73,71,78,41,37,61,65,89,52,206,40,73,67,82,79,41,61,65,89,52,75,82,79,200,40,73,81,85,69,41,61,73,89,52,203,40,73,41,61,73,200,93,202,32,40,74,41,32,61,74,69,89,180,40,74,41,61,202,93,203,32,40,75,41,32,61,75,69,89,180,32,40,75,41,78,189,40,75,41,61,203,93,204,32,40,76,41,32,61,69,72,52,204,40,76,79,41,67,35,61,76,79,215,76,40,76,41,189,35,58,94,40,76,41,37,61,85,204,40,76,69,65,68,41,61,76,73,89,196,32,40,76,65,85,71,72,41,61,76,65,69,52,198,40,76,41,61,204,93,205,32,40,77,41,32,61,69,72,52,205,32,40,77,82,46,41,32,61,77,73,72,52,83,84,69,210,32,40,77,83,46,41,61,77,73,72,53,218,32,40,77,82,83,46,41,32,61,77,73,72,52,83,73,88,218,40,77,79,86,41,61,77,85,87,52,214,40,77,65,67,72,73,78,41,61,77,65,72,83,72,73,89,53,206,77,40,77,41,189,40,77,41,61,205,93,206,32,40,78,41,32,61,69,72,52,206,69,40,78,71,41,43,61,78,202,40,78,71,41,82,61,78,88,199,40,78,71,41,35,61,78,88,199,40,78,71,76,41,37,61,78,88,71,85,204,40,78,71,41,61,78,216,40,78,75,41,61,78,88,203,32,40,78,79,87,41,32,61,78,65,87,180,78,40,78,41,189,40,78,79,78,41,69,61,78,65,72,52,206,40,78,41,61,206,93,207,32,40,79,41,32,61,79,72,52,215,40,79,70,41,32,61,65,72,214,32,40,79,72,41,32,61,79,87,181,40,79,82,79,85,71,72,41,61,69,82,52,79,215,35,58,40,79,82,41,32,61,69,210,35,58,40,79,82,83,41,32,61,69,82,218,40,79,82,41,61,65,79,210,32,40,79,78,69,41,61,87,65,72,206,35,40,79,78,69,41,32,61,87,65,72,206,40,79,87,41,61,79,215,32,40,79,86,69,82,41,61,79,87,53,86,69,210,80,82,40,79,41,86,61,85,87,180,40,79,86,41,61,65,72,52,214,40,79,41,94,37,61,79,87,181,40,79,41,94,69,78,61,79,215,40,79,41,94,73,35,61,79,87,181,40,79,76,41,68,61,79,87,52,204,40,79,85,71,72,84,41,61,65,79,53,212,40,79,85,71,72,41,61,65,72,53,198,32,40,79,85,41,61,65,215,72,40,79,85,41,83,35,61,65,87,180,40,79,85,83,41,61,65,88,211,40,79,85,82,41,61,79,72,210,40,79,85,76,68,41,61,85,72,53,196,40,79,85,41,94,76,61,65,72,181,40,79,85,80,41,61,85,87,53,208,40,79,85,41,61,65,215,40,79,89,41,61,79,217,40,79,73,78,71,41,61,79,87,52,73,72,78,216,40,79,73,41,61,79,89,181,40,79,79,82,41,61,79,72,53,210,40,79,79,75,41,61,85,72,53,203,70,40,79,79,68,41,61,85,87,53,196,76,40,79,79,68,41,61,65,72,53,196,77,40,79,79,68,41,61,85,87,53,196,40,79,79,68,41,61,85,72,53,196,70,40,79,79,84,41,61,85,72,53,212,40,79,79,41,61,85,87,181,40,79,39,41,61,79,200,40,79,41,69,61,79,215,40,79,41,32,61,79,215,40,79,65,41,61,79,87,180,32,40,79,78,76,89,41,61,79,87,52,78,76,73,217,32,40,79,78,67,69,41,61,87,65,72,52,78,211,40,79,78,39,84,41,61,79,87,52,78,212,67,40,79,41,78,61,65,193,40,79,41,78,71,61,65,207,32,58,94,40,79,41,78,61,65,200,73,40,79,78,41,61,85,206,35,58,40,79,78,41,61,85,206,35,94,40,79,78,41,61,85,206,40,79,41,83,84,61,79,215,40,79,70,41,94,61,65,79,52,198,40,79,84,72,69,82,41,61,65,72,53,68,72,69,210,82,40,79,41,66,61,82,65,193,94,82,40,79,41,58,35,61,79,87,181,40,79,83,83,41,32,61,65,79,53,211,35,58,94,40,79,77,41,61,65,72,205,40,79,41,61,65,193,93,208,32,40,80,41,32,61,80,73,89,180,40,80,72,41,61,198,40,80,69,79,80,76,41,61,80,73,89,53,80,85,204,40,80,79,87,41,61,80,65,87,180,40,80,85,84,41,32,61,80,85,72,212,40,80,41,80,189,40,80,41,83,189,40,80,41,78,189,40,80,82,79,70,46,41,61,80,82,79,72,70,69,72,52,83,69,210,40,80,41,61,208,93,209,32,40,81,41,32,61,75,89,85,87,180,40,81,85,65,82,41,61,75,87,79,72,53,210,40,81,85,41,61,75,215,40,81,41,61,203,93,210,32,40,82,41,32,61,65,65,53,210,32,40,82,69,41,94,35,61,82,73,217,40,82,41,82,189,40,82,41,61,210,93,211,32,40,83,41,32,61,69,72,52,211,40,83,72,41,61,83,200,35,40,83,73,79,78,41,61,90,72,85,206,40,83,79,77,69,41,61,83,65,72,205,35,40,83,85,82,41,35,61,90,72,69,210,40,83,85,82,41,35,61,83,72,69,210,35,40,83,85,41,35,61,90,72,85,215,35,40,83,83,85,41,35,61,83,72,85,215,35,40,83,69,68,41,61,90,196,35,40,83,41,35,61,218,40,83,65,73,68,41,61,83,69,72,196,94,40,83,73,79,78,41,61,83,72,85,206,40,83,41,83,189,46,40,83,41,32,61,218,35,58,46,69,40,83,41,32,61,218,35,58,94,35,40,83,41,32,61,211,85,40,83,41,32,61,211,32,58,35,40,83,41,32,61,218,35,35,40,83,41,32,61,218,32,40,83,67,72,41,61,83,203,40,83,41,67,43,189,35,40,83,77,41,61,90,85,205,35,40,83,78,41,39,61,90,85,205,40,83,84,76,69,41,61,83,85,204,40,83,41,61,211,93,212,32,40,84,41,32,61,84,73,89,180,32,40,84,72,69,41,32,35,61,68,72,73,217,32,40,84,72,69,41,32,61,68,72,65,216,40,84,79,41,32,61,84,85,216,32,40,84,72,65,84,41,61,68,72,65,69,212,32,40,84,72,73,83,41,32,61,68,72,73,72,211,32,40,84,72,69,89,41,61,68,72,69,217,32,40,84,72,69,82,69,41,61,68,72,69,72,210,40,84,72,69,82,41,61,68,72,69,210,40,84,72,69,73,82,41,61,68,72,69,72,210,32,40,84,72,65,78,41,32,61,68,72,65,69,206,32,40,84,72,69,77,41,32,61,68,72,65,69,206,40,84,72,69,83,69,41,32,61,68,72,73,89,218,32,40,84,72,69,78,41,61,68,72,69,72,206,40,84,72,82,79,85,71,72,41,61,84,72,82,85,87,180,40,84,72,79,83,69,41,61,68,72,79,72,218,40,84,72,79,85,71,72,41,32,61,68,72,79,215,40,84,79,68,65,89,41,61,84,85,88,68,69,217,40,84,79,77,79,41,82,82,79,87,61,84,85,77,65,65,181,40,84,79,41,84,65,76,61,84,79,87,181,32,40,84,72,85,83,41,61,68,72,65,72,52,211,40,84,72,41,61,84,200,35,58,40,84,69,68,41,61,84,73,88,196,83,40,84,73,41,35,78,61,67,200,40,84,73,41,79,61,83,200,40,84,73,41,65,61,83,200,40,84,73,69,78,41,61,83,72,85,206,40,84,85,82,41,35,61,67,72,69,210,40,84,85,41,65,61,67,72,85,215,32,40,84,87,79,41,61,84,85,215,38,40,84,41,69,78,32,189,40,84,41,61,212,93,213,32,40,85,41,32,61,89,85,87,180,32,40,85,78,41,73,61,89,85,87,206,32,40,85,78,41,61,65,72,206,32,40,85,80,79,78,41,61,65,88,80,65,79,206,64,40,85,82,41,35,61,85,72,52,210,40,85,82,41,35,61,89,85,72,52,210,40,85,82,41,61,69,210,40,85,41,94,32,61,65,200,40,85,41,94,94,61,65,72,181,40,85,89,41,61,65,89,181,32,71,40,85,41,35,189,71,40,85,41,37,189,71,40,85,41,35,61,215,35,78,40,85,41,61,89,85,215,64,40,85,41,61,85,215,40,85,41,61,89,85,215,93,214,32,40,86,41,32,61,86,73,89,180,40,86,73,69,87,41,61,86,89,85,87,181,40,86,41,61,214,93,215,32,40,87,41,32,61,68,65,72,52,66,85,76,89,85,215,32,40,87,69,82,69,41,61,87,69,210,40,87,65,41,83,72,61,87,65,193,40,87,65,41,83,84,61,87,69,217,40,87,65,41,83,61,87,65,200,40,87,65,41,84,61,87,65,193,40,87,72,69,82,69,41,61,87,72,69,72,210,40,87,72,65,84,41,61,87,72,65,72,212,40,87,72,79,76,41,61,47,72,79,87,204,40,87,72,79,41,61,47,72,85,215,40,87,72,41,61,87,200,40,87,65,82,41,35,61,87,69,72,210,40,87,65,82,41,61,87,65,79,210,40,87,79,82,41,94,61,87,69,210,40,87,82,41,61,210,40,87,79,77,41,65,61,87,85,72,205,40,87,79,77,41,69,61,87,73,72,205,40,87,69,65,41,82,61,87,69,200,40,87,65,78,84,41,61,87,65,65,53,78,212,65,78,83,40,87,69,82,41,61,69,210,40,87,41,61,215,93,216,32,40,88,41,32,61,69,72,52,75,210,32,40,88,41,61,218,40,88,41,61,75,211,93,217,32,40,89,41,32,61,87,65,89,180,40,89,79,85,78,71,41,61,89,65,72,78,216,32,40,89,79,85,82,41,61,89,79,72,210,32,40,89,79,85,41,61,89,85,215,32,40,89,69,83,41,61,89,69,72,211,32,40,89,41,61,217,70,40,89,41,61,65,217,80,83,40,89,67,72,41,61,65,89,203,35,58,94,40,89,41,61,73,217,35,58,94,40,89,41,73,61,73,217,32,58,40,89,41,32,61,65,217,32,58,40,89,41,35,61,65,217,32,58,40,89,41,94,43,58,35,61,73,200,32,58,40,89,41,94,35,61,65,217,40,89,41,61,73,200,93,218,32,40,90,41,32,61,90,73,89,180,40,90,41,61,218,234,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,230,32,72,69,76,76,79,27,79,87,27,72,47,72,69,72,76,79,87,27,82,82,83,72,32,83,76,65,69,32,70,79,72,52,82,83,72,32,83,76,65,69,52,83,72,47,72,69,72,76,79,87,27,89,77,27,72,79,87,54,77,63,27,32,89,73,89,52,82,46,27,27,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,95,0,0,95,27,67,79,80,89,82,73,71,72,84,32,49,57,56,50,32,68,79,78,39,84,32,65,83,75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,130,0,0,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,192,168,176,172,192,160,184,160,192,188,160,172,168,172,192,160,160,172,180,164,192,168,168,176,192,188,0,0,0,2,0,32,32,155,32,192,185,32,205,163,76,138,142,96,32,155,32,192,185,169,32,141,0,141,162,1,160,0,185,21,154,41,127,201,112,144,5,41,95,76,167,142,201,96,144,2,41,79,157,0,141,232,200,192,255,208,227,162,255,169,27,157,0,141,76,194,142,32,97,155,96,32,97,155,96,169,255,133,61,169,255,133,56,230,61,166,61,189,0,141,133,64,201,27,208,12,230,56,166,56,169,155,157,21,154,76,190,142,201,46,208,24,232,189,0,141,168,185,24,142,41,1,208,12,230,56,166,56,169,46,157,21,154,76,202,142,165,64,168,185,24,142,133,57,41,2,240,11,169,165,133,62,169,146,133,63,76,92,143,165,57,208,43,169,32,157,0,141,230,56,166,56,224,120,176,7,157,21,154,76,202,142,255,169,155,157,21,154,165,61,141,45,143,133,29,32,186,142,173,45,143,133,61,76,198,142,165,57,41,128,208,1,0,165,64,56,233,65,170,189,113,146,133,62,189,139,146,133,63,160,0,24,165,62,105,1,133,62,165,63,105,0,133,63,177,62,16,239,200,177,62,201,40,240,4,200,76,112,143,132,66,200,177,62,201,41,208,249,132,65,200,177,62,41,127,201,61,208,247,132,64,166,61,134,60,164,66,200,189,0,141,133,57,177,62,197,57,240,3,76,92,143,200,196,65,208,3,76,179,143,232,134,60,76,151,143,165,61,133,59,164,66,136,132,66,177,62,133,57,16,3,76,60,145,41,127,170,189,24,142,41,128,240,18,166,59,202,189,0,141,197,57,240,3,76,92,143,134,59,76,183,143,165,57,201,32,208,3,76,31,144,201,35,208,3,76,46,144,201,46,208,3,76,56,144,201,38,208,3,76,71,144,201,64,208,3,76,103,144,201,94,208,3,76,140,144,201,43,208,3,76,155,144,201,58,208,3,76,176,144,32,57,164,0,32,191,144,41,128,240,3,76,92,143,134,59,76,183,143,32,191,144,41,64,208,244,76,92,143,32,191,144,41,8,208,3,76,92,143,134,59,76,183,143,32,191,144,41,16,208,244,189,0,141,201,72,240,3,76,92,143,202,189,0,141,201,67,240,226,201,83,240,222,76,92,143,32,191,144,41,4,208,212,189,0,141,201,72,240,3,76,92,143,201,84,240,11,201,67,240,7,201,83,240,3,76,92,143,134,59,76,183,143,32,191,144,41,32,208,3,76,92,143,134,59,76,183,143,166,59,202,189,0,141,201,69,240,241,201,73,240,237,201,89,240,233,76,92,143,32,191,144,41,32,208,3,76,183,143,134,59,76,176,144,166,59,202,189,0,141,168,185,24,142,96,166,58,232,189,0,141,168,185,24,142,96,166,58,232,189,0,141,201,69,208,70,232,189,0,141,168,202,185,24,142,41,128,240,8,232,189,0,141,201,82,208,5,134,58,76,64,145,201,83,240,247,201,68,240,243,201,76,208,10,232,189,0,141,201,89,208,44,240,229,201,70,208,38,232,189,0,141,201,85,208,30,232,189,0,141,201,76,240,209,208,20,201,73,208,16,232,189,0,141,201,78,208,8,232,189,0,141,201,71,240,187,76,92,143,165,60,133,58,164,65,200,196,64,208,3,76,79,146,132,65,177,62,133,57,170,189,24,142,41,128,240,18,166,58,232,189,0,141,197,57,240,3,76,92,143,134,58,76,64,145,165,57,201,32,208,3,76,175,145,201,35,208,3,76,190,145,201,46,208,3,76,200,145,201,38,208,3,76,215,145,201,64,208,3,76,247,145,201,94,208,3,76,28,146,201,43,208,3,76,43,146,201,58,208,3,76,64,146,201,37,208,3,76,213,144,32,57,164,0,32,202,144,41,128,240,3,76,92,143,134,58,76,64,145,32,202,144,41,64,208,244,76,92,143,32,202,144,41,8,208,3,76,92,143,134,58,76,64,145,32,202,144,41,16,208,244,189,0,141,201,72,240,3,76,92,143,232,189,0,141,201,67,240,226,201,83,240,222,76,92,143,32,202,144,41,4,208,212,189,0,141,201,72,240,3,76,92,143,201,84,240,11,201,67,240,7,201,83,240,3,76,92,143,134,58,76,64,145,32,202,144,41,32,208,3,76,92,143,134,58,76,64,145,166,58,232,189,0,141,201,69,240,241,201,73,240,237,201,89,240,233,76,92,143,32,202,144,41,32,208,3,76,64,145,134,58,76,64,146,164,64,165,60,133,61,177,62,133,57,41,127,201,61,240,7,230,56,166,56,157,21,154,36,57,16,3,76,202,142,200,76,85,146,0,149,247,162,57,197,6,126,199,38,55,78,145,241,85,161,254,36,69,45,167,54,83,46,71,218,125,126,126,127,128,129,130,130,130,132,132,132,132,132,133,135,135,136,136,137,138,139,139,140,140,140,40,65,41,189,40,33,41,61,174,40,34,41,32,61,45,65,72,53,78,75,87,79,87,84,173,40,34,41,61,75,87,79,87,52,84,173,40,35,41,61,32,78,65,72,52,77,66,69,210,40,36,41,61,32,68,65,65,52,76,69,210,40,37,41,61,32,80,69,82,83,69,72,52,78,212,40,38,41,61,32,65,69,78,196,40,39,41,189,40,42,41,61,32,65,69,52,83,84,69,82,73,72,83,203,40,43,41,61,32,80,76,65,72,52,211,40,44,41,61,172,32,40,45,41,32,61,173,40,45,41,189,40,46,41,61,32,80,79,89,78,212,40,47,41,61,32,83,76,65,69,52,83,200,40,48,41,61,32,90,73,89,52,82,79,215,32,40,49,83,84,41,61,70,69,82,52,83,212,32,40,49,48,84,72,41,61,84,69,72,52,78,84,200,40,49,41,61,32,87,65,72,52,206,32,40,50,78,68,41,61,83,69,72,52,75,85,78,196,40,50,41,61,32,84,85,87,180,32,40,51,82,68,41,61,84,72,69,82,52,196,40,51,41,61,32,84,72,82,73,89,180,40,52,41,61,32,70,79,72,52,210,32,40,53,84,72,41,61,70,73,72,52,70,84,200,40,53,41,61,32,70,65,89,52,214,32,40,54,52,41,32,61,83,73,72,52,75,83,84,73,89,32,70,79,72,210,40,54,41,61,32,83,73,72,52,75,211,40,55,41,61,32,83,69,72,52,86,85,206,32,40,56,84,72,41,61,69,89,52,84,200,40,56,41,61,32,69,89,52,212,40,57,41,61,32,78,65,89,52,206,40,58,41,61,174,40,59,41,61,174,40,60,41,61,32,76,69,72,52,83,32,68,72,65,69,206,40,61,41,61,32,73,89,52,75,87,85,76,218,40,62,41,61,32,71,82,69,89,52,84,69,82,32,68,72,65,69,206,40,63,41,61,174,40,64,41,61,32,65,69,54,212,40,94,41,61,32,75,65,69,52,82,73,88,212,93,193,0,0,0,0,0,0,0,0,0,0,0,0,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,56,132,107,25,198,99,24,134,115,152,198,177,28,202,49,140,199,49,136,194,48,152,70,49,24,198,53,12,202,49,12,198,33,16,36,105,18,194,49,20,196,113,8,74,34,73,171,106,168,172,73,81,50,213,82,136,147,108,148,34,21,84,210,37,150,212,80,165,70,33,8,133,107,24,196,99,16,206,107,24,140,113,25,140,99,53,12,198,51,153,204,108,181,78,162,153,70,33,40,130,149,46,227,48,156,197,48,156,162,177,156,103,49,136,102,89,44,83,24,132,103,80,202,227,10,172,171,48,172,98,48,140,99,16,148,98,177,140,130,40,150,51,152,214,181,76,98,41,165,74,181,156,198,49,20,214,56,156,75,180,134,101,24,174,103,28,166,99,25,150,35,25,132,19,8,166,82,172,202,34,137,110,171,25,140,98,52,196,98,25,134,99,24,196,35,88,214,163,80,66,84,74,173,74,37,17,107,100,137,74,99,57,138,35,49,42,234,162,169,68,197,18,205,66,52,140,98,24,140,99,17,72,102,49,157,68,51,29,70,49,156,198,177,12,205,50,136,196,115,24,134,115,8,214,99,88,7,129,224,240,60,7,135,144,60,124,15,199,192,192,240,124,30,7,128,128,0,28,120,112,241,199,31,192,12,254,28,31,31,14,10,122,192,113,242,131,143,3,15,15,12,0,121,248,97,224,67,15,131,231,24,249,193,19,218,233,99,143,15,131,131,135,195,31,60,112,240,225,225,227,135,184,113,14,32,227,141,72,120,28,147,135,48,225,193,193,228,120,33,131,131,195,135,6,57,229,195,135,7,14,28,28,112,244,113,156,96,54,50,195,30,60,243,143,14,60,112,227,199,143,15,15,14,60,120,240,227,135,6,240,227,7,193,153,135,15,24,120,112,112,252,243,16,177,140,140,49,124,112,225,134,60,100,108,176,225,227,15,35,143,15,30,62,56,60,56,123,143,7,14,60,244,23,30,60,120,242,158,114,73,227,37,54,56,88,57,226,222,60,120,120,225,199,97,225,225,176,240,240,195,199,14,56,192,240,206,115,115,24,52,176,225,199,142,28,60,248,56,240,225,193,139,134,143,28,120,112,240,120,172,177,143,57,49,219,56,97,195,14,14,56,120,115,23,30,57,30,56,100,225,241,193,78,15,64,162,2,197,143,129,161,252,18,8,100,224,60,34,224,69,7,142,12,50,144,240,31,32,73,224,248,12,96,240,23,26,65,170,164,208,141,18,130,30,30,3,248,62,3,12,115,128,112,68,38,3,36,225,62,4,78,4,28,193,9,204,158,144,33,7,144,67,100,192,15,198,144,156,193,91,3,226,29,129,224,94,29,3,132,184,44,15,128,177,131,224,48,65,30,67,137,131,80,252,36,46,19,131,241,124,76,44,201,13,131,176,181,130,228,232,6,156,7,160,153,29,7,62,130,143,112,48,116,64,202,16,228,232,15,146,20,63,6,248,132,136,67,129,10,52,57,65,198,227,28,71,3,176,184,19,10,194,100,248,24,249,96,179,192,101,32,96,166,140,195,129,32,48,38,30,28,56,211,1,176,38,64,244,11,195,66,31,133,50,38,96,64,201,203,1,236,17,40,64,250,4,52,224,112,76,140,29,7,105,3,22,200,4,35,232,198,154,11,26,3,224,118,6,5,207,30,188,88,49,113,102,0,248,63,4,252,12,116,39,138,128,113,194,58,38,6,192,31,5,15,152,64,174,1,127,192,7,255,0,14,254,0,3,223,128,3,239,128,27,241,194,0,231,224,24,252,224,33,252,128,60,252,64,14,126,0,63,62,0,15,254,0,31,255,0,62,240,7,252,0,126,16,63,255,0,63,56,14,124,1,135,12,252,199,0,62,4,15,62,31,15,15,31,15,2,131,135,207,3,135,15,63,192,7,158,96,63,192,3,254,0,63,224,119,225,192,254,224,195,224,1,223,248,3,7,0,126,112,0,124,56,24,254,12,30,120,28,124,62,14,31,30,30,62,0,127,131,7,219,135,131,7,199,7,16,113,255,0,63,226,1,224,193,195,225,0,127,192,5,240,32,248,240,112,254,120,121,248,2,63,12,143,3,15,159,224,193,199,135,3,195,195,176,225,225,193,227,224,113,240,0,252,112,124,12,62,56,14,28,112,195,199,3,129,193,199,231,0,15,199,135,25,9,239,196,51,224,193,252,248,112,240,120,248,240,97,199,0,31,248,1,124,248,240,120,112,60,124,206,14,33,131,207,8,7,143,8,193,135,143,128,199,227,0,7,248,224,239,0,57,247,128,14,248,225,227,248,33,159,192,255,3,248,7,192,31,248,196,4,252,196,193,188,135,240,15,192,127,5,224,37,236,192,62,132,71,240,142,3,248,3,251,192,25,248,7,156,12,23,248,7,224,31,161,252,15,252,1,240,63,0,254,3,240,31,0,253,0,255,136,13,249,1,255,0,112,7,192,62,66,243,13,196,127,128,252,7,240,94,192,63,0,120,63,129,255,1,248,1,195,232,12,228,100,143,228,15,240,7,240,194,31,0,127,192,111,128,126,3,248,7,240,63,192,120,15,130,7,254,34,119,112,2,118,3,254,0,254,103,0,124,199,241,142,198,59,224,63,132,243,25,216,3,153,252,9,184,15,248,0,157,36,97,249,13,0,253,3,240,31,144,63,1,248,31,208,15,248,55,1,248,7,240,15,192,63,0,254,3,248,15,192,63,0,250,3,240,15,128,255,1,184,7,240,1,252,1,188,128,19,30,0,127,225,64,127,160,127,176,0,63,192,31,192,56,15,240,31,128,255,1,252,3,241,126,1,254,1,240,255,0,127,192,29,7,240,15,192,126,6,224,7,224,15,248,6,193,254,1,252,3,224,15,0,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,8,11,9,11,14,15,11,16,12,6,6,14,12,14,12,11,8,8,11,10,9,8,8,8,8,8,3,5,2,2,2,2,2,2,6,6,8,6,6,2,9,4,2,1,14,15,15,15,14,14,8,2,2,7,2,1,7,2,2,7,2,2,8,2,2,6,2,2,7,2,4,7,1,4,5,5,0,18,18,18,8,8,8,8,8,11,6,12,10,5,5,11,10,10,10,9,8,7,9,7,6,8,6,7,7,7,2,5,2,2,2,2,2,2,6,6,7,6,6,2,8,3,1,30,13,12,12,12,14,9,6,1,2,5,1,1,6,1,2,6,1,2,8,2,2,4,2,2,6,1,4,6,1,4,199,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].concat([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0,1,3,4,6,7,9,10,12,13,15,16,18,19,21,22,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,0,2,5,7,10,12,15,17,20,22,25,27,30,32,35,37,0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,0,3,7,10,14,17,21,24,28,31,35,38,42,45,49,52,0,252,248,244,240,236,232,228,224,220,216,212,208,204,200,196,0,252,249,245,242,238,235,231,228,224,221,217,214,210,207,203,0,253,250,247,244,241,238,235,232,229,226,223,220,217,214,211,0,253,251,248,246,243,241,238,236,233,231,228,226,223,221,218,0,254,252,250,248,246,244,242,240,238,236,234,232,230,228,226,0,254,253,251,250,248,247,245,244,242,241,239,238,236,235,233,0,255,254,253,252,251,250,249,248,247,246,245,244,243,242,241,0,255,255,254,254,253,253,252,252,251,251,250,250,249,249,248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,91,91,91,91,110,93,91,88,89,87,88,82,89,93,62,82,88,62,110,80,93,90,60,110,90,110,81,121,101,121,91,99,106,81,121,93,82,93,103,76,93,101,101,121,101,121,0,90,88,88,88,88,82,81,81,81,121,121,121,112,110,110,94,94,94,81,81,81,121,121,121,101,101,112,94,94,94,8,1,0,67,67,67,67,84,72,66,62,40,44,30,36,44,72,48,36,30,50,36,28,68,24,50,30,24,82,46,54,86,54,67,73,79,26,66,73,37,51,66,40,47,79,79,66,79,110,0,72,38,30,42,30,34,26,26,26,66,66,66,110,110,110,84,84,84,26,26,26,66,66,66,109,86,109,84,84,84,127,127,0,19,19,19,19,10,14,18,24,26,22,20,16,20,14,18,14,18,18,16,12,14,10,18,14,10,8,6,6,6,6,17,6,6,6,6,14,16,9,10,8,10,6,6,6,5,6,0,18,26,20,26,18,12,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,10,10,6,6,6,44,19,128,193,193,193,193,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,16,16,8,12,8,4,64,36,32,32,36,0,0,36,32,32,36,32,32,0,32,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,164,164,164,164,164,164,132,132,164,164,132,132,132,132,132,132,132,68,68,68,68,68,76,76,76,72,76,64,64,64,64,64,64,68,68,68,68,72,64,76,68,0,0,180,180,180,148,148,148,78,78,78,78,78,78,78,78,78,78,78,78,75,75,75,75,75,75,75,75,75,75,75,75,128,193,193,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,3,3,4,4,5,6,8,9,11,13,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,7,8,8,1,1,0,1,0,7,5,1,0,6,1,0,7,0,5,1,0,8,0,0,3,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,14,1,9,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,5,0,19,16,0,0,0,0,0,10,11,13,14,13,12,12,11,9,11,11,12,12,12,8,8,12,8,10,8,8,10,3,9,6,0,0,0,0,0,0,0,0,3,5,3,4,0,0,0,5,10,2,14,13,12,13,12,8,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,10,0,0,10,0,0,0,0,0,0,0,0,13,13,14,15,15,15,15,15,12,13,12,15,15,13,13,13,14,13,12,13,13,13,12,9,9,0,0,0,0,0,0,0,0,11,11,11,11,0,0,1,11,0,2,14,15,15,15,15,13,2,4,0,2,4,0,1,4,0,1,4,0,0,0,0,0,0,0,0,12,0,0,0,0,15,15,69,114,114,111,114,32,119,114,105,116,105,110,103,32,116,111,32,116,97,98,108,101,115,10,0,0,0,0,69,114,114,111,114,32,114,101,97,100,105,110,103,32,116,111,32,116,97,98,108,101,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,39,31,43,30,34,0,0,19,27,21,27,18,13,0,0,255,255,255,255,255,84,73,67,63,40,44,31,37,45,73,49,36,30,51,37,29,69,24,50,30,24,83,46,54,86,0,0,0,0,0,0,0,10,14,19,24,27,23,21,16,20,14,18,14,18,18,16,13,15,11,18,14,11,9,6,6,6,0,0,0,0,0,0])
, "i8", ALLOC_NONE, TOTAL_STACK)
function runPostSets() {
}
if (!awaitingMemoryInitializer) runPostSets();
  function _strlen(ptr) {
      ptr = ptr|0;
      var curr = 0;
      curr = ptr;
      while (HEAP8[(curr)]|0 != 0) {
        curr = (curr + 1)|0;
      }
      return (curr - ptr)|0;
    }
  var ERRNO_CODES={E2BIG:7,EACCES:13,EADDRINUSE:98,EADDRNOTAVAIL:99,EAFNOSUPPORT:97,EAGAIN:11,EALREADY:114,EBADF:9,EBADMSG:74,EBUSY:16,ECANCELED:125,ECHILD:10,ECONNABORTED:103,ECONNREFUSED:111,ECONNRESET:104,EDEADLK:35,EDESTADDRREQ:89,EDOM:33,EDQUOT:122,EEXIST:17,EFAULT:14,EFBIG:27,EHOSTUNREACH:113,EIDRM:43,EILSEQ:84,EINPROGRESS:115,EINTR:4,EINVAL:22,EIO:5,EISCONN:106,EISDIR:21,ELOOP:40,EMFILE:24,EMLINK:31,EMSGSIZE:90,EMULTIHOP:72,ENAMETOOLONG:36,ENETDOWN:100,ENETRESET:102,ENETUNREACH:101,ENFILE:23,ENOBUFS:105,ENODATA:61,ENODEV:19,ENOENT:2,ENOEXEC:8,ENOLCK:37,ENOLINK:67,ENOMEM:12,ENOMSG:42,ENOPROTOOPT:92,ENOSPC:28,ENOSR:63,ENOSTR:60,ENOSYS:38,ENOTCONN:107,ENOTDIR:20,ENOTEMPTY:39,ENOTRECOVERABLE:131,ENOTSOCK:88,ENOTSUP:95,ENOTTY:25,ENXIO:6,EOVERFLOW:75,EOWNERDEAD:130,EPERM:1,EPIPE:32,EPROTO:71,EPROTONOSUPPORT:93,EPROTOTYPE:91,ERANGE:34,EROFS:30,ESPIPE:29,ESRCH:3,ESTALE:116,ETIME:62,ETIMEDOUT:110,ETXTBSY:26,EWOULDBLOCK:11,EXDEV:18};
  function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      if (!___setErrNo.ret) ___setErrNo.ret = allocate([0], 'i32', ALLOC_STATIC);
      HEAP32[((___setErrNo.ret)>>2)]=value
      return value;
    }
  var _stdin=allocate(1, "i32*", ALLOC_STACK);
  var _stdout=allocate(1, "i32*", ALLOC_STACK);
  var _stderr=allocate(1, "i32*", ALLOC_STACK);
  var __impure_ptr=allocate(1, "i32*", ALLOC_STACK);var FS={currentPath:"/",nextInode:2,streams:[null],checkStreams:function () {
        for (var i in FS.streams) if (FS.streams.hasOwnProperty(i)) assert(i >= 0 && i < FS.streams.length); // no keys not in dense span
        for (var i = 0; i < FS.streams.length; i++) assert(typeof FS.streams[i] == 'object'); // no non-null holes in dense span
      },ignorePermissions:true,joinPath:function (parts, forceRelative) {
        var ret = parts[0];
        for (var i = 1; i < parts.length; i++) {
          if (ret[ret.length-1] != '/') ret += '/';
          ret += parts[i];
        }
        if (forceRelative && ret[0] == '/') ret = ret.substr(1);
        return ret;
      },absolutePath:function (relative, base) {
        if (typeof relative !== 'string') return null;
        if (base === undefined) base = FS.currentPath;
        if (relative && relative[0] == '/') base = '';
        var full = base + '/' + relative;
        var parts = full.split('/').reverse();
        var absolute = [''];
        while (parts.length) {
          var part = parts.pop();
          if (part == '' || part == '.') {
            // Nothing.
          } else if (part == '..') {
            if (absolute.length > 1) absolute.pop();
          } else {
            absolute.push(part);
          }
        }
        return absolute.length == 1 ? '/' : absolute.join('/');
      },analyzePath:function (path, dontResolveLastLink, linksVisited) {
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        };
        path = FS.absolutePath(path);
        if (path == '/') {
          ret.isRoot = true;
          ret.exists = ret.parentExists = true;
          ret.name = '/';
          ret.path = ret.parentPath = '/';
          ret.object = ret.parentObject = FS.root;
        } else if (path !== null) {
          linksVisited = linksVisited || 0;
          path = path.slice(1).split('/');
          var current = FS.root;
          var traversed = [''];
          while (path.length) {
            if (path.length == 1 && current.isFolder) {
              ret.parentExists = true;
              ret.parentPath = traversed.length == 1 ? '/' : traversed.join('/');
              ret.parentObject = current;
              ret.name = path[0];
            }
            var target = path.shift();
            if (!current.isFolder) {
              ret.error = ERRNO_CODES.ENOTDIR;
              break;
            } else if (!current.read) {
              ret.error = ERRNO_CODES.EACCES;
              break;
            } else if (!current.contents.hasOwnProperty(target)) {
              ret.error = ERRNO_CODES.ENOENT;
              break;
            }
            current = current.contents[target];
            if (current.link && !(dontResolveLastLink && path.length == 0)) {
              if (linksVisited > 40) { // Usual Linux SYMLOOP_MAX.
                ret.error = ERRNO_CODES.ELOOP;
                break;
              }
              var link = FS.absolutePath(current.link, traversed.join('/'));
              ret = FS.analyzePath([link].concat(path).join('/'),
                                   dontResolveLastLink, linksVisited + 1);
              return ret;
            }
            traversed.push(target);
            if (path.length == 0) {
              ret.exists = true;
              ret.path = traversed.join('/');
              ret.object = current;
            }
          }
        }
        return ret;
      },findObject:function (path, dontResolveLastLink) {
        FS.ensureRoot();
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },createObject:function (parent, name, properties, canRead, canWrite) {
        if (!parent) parent = '/';
        if (typeof parent === 'string') parent = FS.findObject(parent);
        if (!parent) {
          ___setErrNo(ERRNO_CODES.EACCES);
          throw new Error('Parent path must exist.');
        }
        if (!parent.isFolder) {
          ___setErrNo(ERRNO_CODES.ENOTDIR);
          throw new Error('Parent must be a folder.');
        }
        if (!parent.write && !FS.ignorePermissions) {
          ___setErrNo(ERRNO_CODES.EACCES);
          throw new Error('Parent folder must be writeable.');
        }
        if (!name || name == '.' || name == '..') {
          ___setErrNo(ERRNO_CODES.ENOENT);
          throw new Error('Name must not be empty.');
        }
        if (parent.contents.hasOwnProperty(name)) {
          ___setErrNo(ERRNO_CODES.EEXIST);
          throw new Error("Can't overwrite object.");
        }
        parent.contents[name] = {
          read: canRead === undefined ? true : canRead,
          write: canWrite === undefined ? false : canWrite,
          timestamp: Date.now(),
          inodeNumber: FS.nextInode++
        };
        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            parent.contents[name][key] = properties[key];
          }
        }
        return parent.contents[name];
      },createFolder:function (parent, name, canRead, canWrite) {
        var properties = {isFolder: true, isDevice: false, contents: {}};
        return FS.createObject(parent, name, properties, canRead, canWrite);
      },createPath:function (parent, path, canRead, canWrite) {
        var current = FS.findObject(parent);
        if (current === null) throw new Error('Invalid parent.');
        path = path.split('/').reverse();
        while (path.length) {
          var part = path.pop();
          if (!part) continue;
          if (!current.contents.hasOwnProperty(part)) {
            FS.createFolder(current, part, canRead, canWrite);
          }
          current = current.contents[part];
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        properties.isFolder = false;
        return FS.createObject(parent, name, properties, canRead, canWrite);
      },createDataFile:function (parent, name, data, canRead, canWrite) {
        if (typeof data === 'string') {
          var dataArray = new Array(data.length);
          for (var i = 0, len = data.length; i < len; ++i) dataArray[i] = data.charCodeAt(i);
          data = dataArray;
        }
        var properties = {
          isDevice: false,
          contents: data.subarray ? data.subarray(0) : data // as an optimization, create a new array wrapper (not buffer) here, to help JS engines understand this object
        };
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          var LazyUint8Array = function(chunkSize, length) {
            this.length = length;
            this.chunkSize = chunkSize;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % chunkSize;
            var chunkNum = Math.floor(idx / chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function(getter) {
            this.getter = getter;
          }
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var chunkSize = 1024*1024; // Chunk size in bytes
          if (!hasByteServing) chunkSize = datalength;
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = new LazyUint8Array(chunkSize, datalength);
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * lazyArray.chunkSize;
            var end = (chunkNum+1) * lazyArray.chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile) {
        Browser.init();
        var fullname = FS.joinPath([parent, name], true);
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },createLink:function (parent, name, target, canRead, canWrite) {
        var properties = {isDevice: false, link: target};
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createDevice:function (parent, name, input, output) {
        if (!(input || output)) {
          throw new Error('A device must have at least one callback defined.');
        }
        var ops = {isDevice: true, input: input, output: output};
        return FS.createFile(parent, name, ops, Boolean(input), Boolean(output));
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },ensureRoot:function () {
        if (FS.root) return;
        // The main file system tree. All the contents are inside this.
        FS.root = {
          read: true,
          write: true,
          isFolder: true,
          isDevice: false,
          timestamp: Date.now(),
          inodeNumber: 1,
          contents: {}
        };
      },init:function (input, output, error) {
        // Make sure we initialize only once.
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
        FS.ensureRoot();
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input = input || Module['stdin'];
        output = output || Module['stdout'];
        error = error || Module['stderr'];
        // Default handlers.
        var stdinOverridden = true, stdoutOverridden = true, stderrOverridden = true;
        if (!input) {
          stdinOverridden = false;
          input = function() {
            if (!input.cache || !input.cache.length) {
              var result;
              if (typeof window != 'undefined' &&
                  typeof window.prompt == 'function') {
                // Browser.
                result = window.prompt('Input: ');
                if (result === null) result = String.fromCharCode(0); // cancel ==> EOF
              } else if (typeof readline == 'function') {
                // Command line.
                result = readline();
              }
              if (!result) result = '';
              input.cache = intArrayFromString(result + '\n', true);
            }
            return input.cache.shift();
          };
        }
        var utf8 = new Runtime.UTF8Processor();
        function simpleOutput(val) {
          if (val === null || val === 10) {
            output.printer(output.buffer.join(''));
            output.buffer = [];
          } else {
            output.buffer.push(utf8.processCChar(val));
          }
        }
        if (!output) {
          stdoutOverridden = false;
          output = simpleOutput;
        }
        if (!output.printer) output.printer = Module['print'];
        if (!output.buffer) output.buffer = [];
        if (!error) {
          stderrOverridden = false;
          error = simpleOutput;
        }
        if (!error.printer) error.printer = Module['print'];
        if (!error.buffer) error.buffer = [];
        // Create the temporary folder, if not already created
        try {
          FS.createFolder('/', 'tmp', true, true);
        } catch(e) {}
        // Create the I/O devices.
        var devFolder = FS.createFolder('/', 'dev', true, true);
        var stdin = FS.createDevice(devFolder, 'stdin', input);
        var stdout = FS.createDevice(devFolder, 'stdout', null, output);
        var stderr = FS.createDevice(devFolder, 'stderr', null, error);
        FS.createDevice(devFolder, 'tty', input, output);
        // Create default streams.
        FS.streams[1] = {
          path: '/dev/stdin',
          object: stdin,
          position: 0,
          isRead: true,
          isWrite: false,
          isAppend: false,
          isTerminal: !stdinOverridden,
          error: false,
          eof: false,
          ungotten: []
        };
        FS.streams[2] = {
          path: '/dev/stdout',
          object: stdout,
          position: 0,
          isRead: false,
          isWrite: true,
          isAppend: false,
          isTerminal: !stdoutOverridden,
          error: false,
          eof: false,
          ungotten: []
        };
        FS.streams[3] = {
          path: '/dev/stderr',
          object: stderr,
          position: 0,
          isRead: false,
          isWrite: true,
          isAppend: false,
          isTerminal: !stderrOverridden,
          error: false,
          eof: false,
          ungotten: []
        };
        assert(Math.max(_stdin, _stdout, _stderr) < 128); // make sure these are low, we flatten arrays with these
        HEAP32[((_stdin)>>2)]=1;
        HEAP32[((_stdout)>>2)]=2;
        HEAP32[((_stderr)>>2)]=3;
        // Other system paths
        FS.createPath('/', 'dev/shm/tmp', true, true); // temp files
        // Newlib initialization
        for (var i = FS.streams.length; i < Math.max(_stdin, _stdout, _stderr) + 4; i++) {
          FS.streams[i] = null; // Make sure to keep FS.streams dense
        }
        FS.streams[_stdin] = FS.streams[1];
        FS.streams[_stdout] = FS.streams[2];
        FS.streams[_stderr] = FS.streams[3];
        FS.checkStreams();
        assert(FS.streams.length < 1024); // at this early stage, we should not have a large set of file descriptors - just a few
        allocate([ allocate(
          [0, 0, 0, 0, _stdin, 0, 0, 0, _stdout, 0, 0, 0, _stderr, 0, 0, 0],
          'void*', ALLOC_STATIC) ], 'void*', ALLOC_NONE, __impure_ptr);
      },quit:function () {
        if (!FS.init.initialized) return;
        // Flush any partially-printed lines in stdout and stderr. Careful, they may have been closed
        if (FS.streams[2] && FS.streams[2].object.output.buffer.length > 0) FS.streams[2].object.output(10);
        if (FS.streams[3] && FS.streams[3].object.output.buffer.length > 0) FS.streams[3].object.output(10);
      },standardizePath:function (path) {
        if (path.substr(0, 2) == './') path = path.substr(2);
        return path;
      },deleteFile:function (path) {
        path = FS.analyzePath(path);
        if (!path.parentExists || !path.exists) {
          throw 'Invalid path ' + path;
        }
        delete path.parentObject.contents[path.name];
      }};
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.streams[fildes];
      if (!stream || stream.object.isDevice) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isWrite) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (stream.object.isFolder) {
        ___setErrNo(ERRNO_CODES.EISDIR);
        return -1;
      } else if (nbyte < 0 || offset < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        var contents = stream.object.contents;
        while (contents.length < offset) contents.push(0);
        for (var i = 0; i < nbyte; i++) {
          contents[offset + i] = HEAPU8[(((buf)+(i))|0)];
        }
        stream.object.timestamp = Date.now();
        return i;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.streams[fildes];
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isWrite) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (nbyte < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        if (stream.object.isDevice) {
          if (stream.object.output) {
            for (var i = 0; i < nbyte; i++) {
              try {
                stream.object.output(HEAP8[(((buf)+(i))|0)]);
              } catch (e) {
                ___setErrNo(ERRNO_CODES.EIO);
                return -1;
              }
            }
            stream.object.timestamp = Date.now();
            return i;
          } else {
            ___setErrNo(ERRNO_CODES.ENXIO);
            return -1;
          }
        } else {
          var bytesWritten = _pwrite(fildes, buf, nbyte, stream.position);
          if (bytesWritten != -1) stream.position += bytesWritten;
          return bytesWritten;
        }
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        if (FS.streams[stream]) FS.streams[stream].error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],HEAPF64[(tempDoublePtr)>>3]);
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
        return ret;
      }
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
          // Handle precision.
          var precisionSet = false;
          if (next == 46) {
            var precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          } else {
            var precision = 6; // Standard default.
          }
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = flagAlternative ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
              // Add sign if needed
              if (flagAlwaysSigned) {
                if (currArg < 0) {
                  prefix = '-' + prefix;
                } else {
                  prefix = '+' + prefix;
                }
              }
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
                // Add sign.
                if (flagAlwaysSigned && currArg >= 0) {
                  argText = '+' + argText;
                }
              }
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*') || nullString;
              var argLength = _strlen(arg);
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              for (var i = 0; i < argLength; i++) {
                ret.push(HEAPU8[((arg++)|0)]);
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }
  var _abs=Math.abs;
  function _memcpy(dest, src, num) {
      dest = dest|0; src = src|0; num = num|0;
      var ret = 0;
      ret = dest|0;
      if ((dest&3) == (src&3)) {
        while (dest & 3) {
          if ((num|0) == 0) return ret|0;
          HEAP8[(dest)]=HEAP8[(src)];
          dest = (dest+1)|0;
          src = (src+1)|0;
          num = (num-1)|0;
        }
        while ((num|0) >= 4) {
          HEAP32[((dest)>>2)]=HEAP32[((src)>>2)];
          dest = (dest+4)|0;
          src = (src+4)|0;
          num = (num-4)|0;
        }
      }
      while ((num|0) > 0) {
        HEAP8[(dest)]=HEAP8[(src)];
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      return ret|0;
    }var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  function _abort() {
      ABORT = true;
      throw 'abort() at ' + (new Error().stack);
    }
  function ___errno_location() {
      return ___setErrNo.ret;
    }var ___errno=___errno_location;
  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 8: return PAGE_SIZE;
        case 54:
        case 56:
        case 21:
        case 61:
        case 63:
        case 22:
        case 67:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 69:
        case 28:
        case 101:
        case 70:
        case 71:
        case 29:
        case 30:
        case 199:
        case 75:
        case 76:
        case 32:
        case 43:
        case 44:
        case 80:
        case 46:
        case 47:
        case 45:
        case 48:
        case 49:
        case 42:
        case 82:
        case 33:
        case 7:
        case 108:
        case 109:
        case 107:
        case 112:
        case 119:
        case 121:
          return 200809;
        case 13:
        case 104:
        case 94:
        case 95:
        case 34:
        case 35:
        case 77:
        case 81:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 94:
        case 95:
        case 110:
        case 111:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 120:
        case 40:
        case 16:
        case 79:
        case 19:
          return -1;
        case 92:
        case 93:
        case 5:
        case 72:
        case 6:
        case 74:
        case 92:
        case 93:
        case 96:
        case 97:
        case 98:
        case 99:
        case 102:
        case 103:
        case 105:
          return 1;
        case 38:
        case 66:
        case 50:
        case 51:
        case 4:
          return 1024;
        case 15:
        case 64:
        case 41:
          return 32;
        case 55:
        case 37:
        case 17:
          return 2147483647;
        case 18:
        case 1:
          return 47839;
        case 59:
        case 57:
          return 99;
        case 68:
        case 58:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 14: return 32768;
        case 73: return 32767;
        case 39: return 16384;
        case 60: return 1000;
        case 106: return 700;
        case 52: return 256;
        case 62: return 255;
        case 2: return 100;
        case 65: return 64;
        case 36: return 20;
        case 100: return 16;
        case 20: return 6;
        case 53: return 4;
        case 10: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We need to make sure no one else allocates unfreeable memory!
      // We must control this entirely. So we don't even need to do
      // unfreeable allocations - the HEAP is ours, from STATICTOP up.
      // TODO: We could in theory slice off the top of the HEAP when
      //       sbrk gets a negative increment in |bytes|...
      var self = _sbrk;
      if (!self.called) {
        STATICTOP = alignMemoryPage(STATICTOP); // make sure we start out aligned
        self.called = true;
        _sbrk.DYNAMIC_START = STATICTOP;
      }
      var ret = STATICTOP;
      if (bytes != 0) Runtime.staticAlloc(bytes);
      return ret;  // Previous break location.
    }
  function _memset(ptr, value, num) {
      ptr = ptr|0; value = value|0; num = num|0;
      var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
      stop = (ptr + num)|0;
      if ((num|0) >= 20) {
        // This is unaligned, but quite large, so work hard to get to aligned settings
        value = value & 0xff;
        unaligned = ptr & 3;
        value4 = value | (value << 8) | (value << 16) | (value << 24);
        stop4 = stop & ~3;
        if (unaligned) {
          unaligned = (ptr + 4 - unaligned)|0;
          while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
            HEAP8[(ptr)]=value;
            ptr = (ptr+1)|0;
          }
        }
        while ((ptr|0) < (stop4|0)) {
          HEAP32[((ptr)>>2)]=value4;
          ptr = (ptr+4)|0;
        }
      }
      while ((ptr|0) < (stop|0)) {
        HEAP8[(ptr)]=value;
        ptr = (ptr+1)|0;
      }
    }
  function _free(){}
  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (Browser.initted) return;
        Browser.initted = true;
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : console.log("warning: cannot create object URLs");
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
        function getMimetype(name) {
          return {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'bmp': 'image/bmp',
            'ogg': 'audio/ogg',
            'wav': 'audio/wav',
            'mp3': 'audio/mpeg'
          }[name.substr(name.lastIndexOf('.')+1)];
        }
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
        var imagePlugin = {};
        imagePlugin['canHandle'] = function(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/.exec(name);
        };
        imagePlugin['handle'] = function(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: getMimetype(name) });
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = function() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            setTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
        // Canvas event setup
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'];
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule) {
        var ctx;
        try {
          if (useWebGL) {
            ctx = canvas.getContext('experimental-webgl', {
              alpha: false
            });
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas - ' + e);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        this.lockPointer = lockPointer;
        this.resizeCanvas = resizeCanvas;
        if (typeof this.lockPointer === 'undefined') this.lockPointer = true;
        if (typeof this.resizeCanvas === 'undefined') this.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
        if (!this.fullScreenHandlersInstalled) {
          this.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function (func) {
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                         window['mozRequestAnimationFrame'] ||
                                         window['webkitRequestAnimationFrame'] ||
                                         window['msRequestAnimationFrame'] ||
                                         window['oRequestAnimationFrame'] ||
                                         window['setTimeout'];
        }
        window.requestAnimationFrame(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        Browser.updateResizeListeners();
      }};
__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___setErrNo(0);
Module["requestFullScreen"] = function(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function(func) { Browser.requestAnimationFrame(func) };
  Module["pauseMainLoop"] = function() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function() { Browser.mainLoop.resume() };
var FUNCTION_TABLE = [0, 0];
// EMSCRIPTEN_START_FUNCS
function _GetBuffer() {
  var label = 0;
  var $1=HEAP32[((5255116)>>2)];
  return $1;
}
Module["_GetBuffer"] = _GetBuffer;
function _GetBufferLength() {
  var label = 0;
  var $1=HEAP32[((5255112)>>2)];
  return $1;
}
Module["_GetBufferLength"] = _GetBufferLength;
function _SetSpeed($_speed) {
  var label = 0;
  var $1;
  $1=$_speed;
  var $2=$1;
  HEAP8[(5244336)]=$2;
  return;
}
Module["_SetSpeed"] = _SetSpeed;
function _SetPitch($_pitch) {
  var label = 0;
  var $1;
  $1=$_pitch;
  var $2=$1;
  HEAP8[(5252564)]=$2;
  return;
}
Module["_SetPitch"] = _SetPitch;
function _SetMouth($_mouth) {
  var label = 0;
  var $1;
  $1=$_mouth;
  var $2=$1;
  HEAP8[(5253644)]=$2;
  return;
}
Module["_SetMouth"] = _SetMouth;
function _SetThroat($_throat) {
  var label = 0;
  var $1;
  $1=$_throat;
  var $2=$1;
  HEAP8[(5242988)]=$2;
  return;
}
Module["_SetThroat"] = _SetThroat;
function _EnableSingmode($sing) {
  var label = 0;
  var $1;
  $1=$sing;
  var $2=$1;
  HEAP32[((5244596)>>2)]=$2;
  return;
}
Module["_EnableSingmode"] = _EnableSingmode;
function _Insert($position, $mem60, $mem59, $mem58) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $4;
      var $i;
      $1=$position;
      $2=$mem60;
      $3=$mem59;
      $4=$mem58;
      $i=253;
      label = 2; break;
    case 2:
      var $6=$i;
      var $7=$1;
      var $8=(($7)&(255));
      var $9=(($6)|(0)) >= (($8)|(0));
      if ($9) { label = 3; break; } else { label = 5; break; }
    case 3:
      var $11=$i;
      var $12=((5252568+$11)|0);
      var $13=HEAP8[($12)];
      var $14=$i;
      var $15=((($14)+(1))|0);
      var $16=((5252568+$15)|0);
      HEAP8[($16)]=$13;
      var $17=$i;
      var $18=((5253044+$17)|0);
      var $19=HEAP8[($18)];
      var $20=$i;
      var $21=((($20)+(1))|0);
      var $22=((5253044+$21)|0);
      HEAP8[($22)]=$19;
      var $23=$i;
      var $24=((5244080+$23)|0);
      var $25=HEAP8[($24)];
      var $26=$i;
      var $27=((($26)+(1))|0);
      var $28=((5244080+$27)|0);
      HEAP8[($28)]=$25;
      label = 4; break;
    case 4:
      var $30=$i;
      var $31=((($30)-(1))|0);
      $i=$31;
      label = 2; break;
    case 5:
      var $33=$2;
      var $34=$1;
      var $35=(($34)&(255));
      var $36=((5252568+$35)|0);
      HEAP8[($36)]=$33;
      var $37=$3;
      var $38=$1;
      var $39=(($38)&(255));
      var $40=((5253044+$39)|0);
      HEAP8[($40)]=$37;
      var $41=$4;
      var $42=$1;
      var $43=(($42)&(255));
      var $44=((5244080+$43)|0);
      HEAP8[($44)]=$41;
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _Code41883() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $pos;
      $pos=0;
      label = 2; break;
    case 2:
      var $2=$pos;
      var $3=(($2)&(255));
      var $4=((5252568+$3)|0);
      var $5=HEAP8[($4)];
      HEAP8[(5256672)]=$5;
      var $6=HEAP8[(5256672)];
      var $7=(($6)&(255));
      var $8=(($7)|(0))==255;
      if ($8) { label = 3; break; } else { label = 4; break; }
    case 3:
      return;
    case 4:
      var $11=HEAP8[(5256672)];
      var $12=(($11)&(255));
      var $13=((5255028+$12)|0);
      var $14=HEAP8[($13)];
      var $15=(($14)&(255));
      var $16=$15 & 64;
      var $17=(($16)|(0))==0;
      if ($17) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $19=$pos;
      var $20=((($19)+(1))&255);
      $pos=$20;
      label = 2; break;
    case 6:
      var $22=$pos;
      var $23=(($22)&(255));
      var $24=((($23)+(1))|0);
      var $25=((5252568+$24)|0);
      var $26=HEAP8[($25)];
      HEAP8[(5256672)]=$26;
      var $27=HEAP8[(5256672)];
      var $28=(($27)&(255));
      var $29=(($28)|(0))==255;
      if ($29) { label = 7; break; } else { label = 8; break; }
    case 7:
      var $31=$pos;
      var $32=((($31)+(1))&255);
      $pos=$32;
      label = 2; break;
    case 8:
      var $34=HEAP8[(5256672)];
      var $35=(($34)&(255));
      var $36=((5255028+$35)|0);
      var $37=HEAP8[($36)];
      var $38=(($37)&(255));
      var $39=$38 & 128;
      var $40=(($39)|(0))==0;
      if ($40) { label = 9; break; } else { label = 10; break; }
    case 9:
      var $42=$pos;
      var $43=((($42)+(1))&255);
      $pos=$43;
      label = 2; break;
    case 10:
      label = 11; break;
    case 11:
      var $46=$pos;
      var $47=(($46)&(255));
      var $48=((($47)+(1))|0);
      var $49=((5244080+$48)|0);
      var $50=HEAP8[($49)];
      HEAP8[(5256672)]=$50;
      var $51=HEAP8[(5256672)];
      var $52=(($51)&(255));
      var $53=(($52)|(0))==0;
      if ($53) { label = 12; break; } else { label = 13; break; }
    case 12:
      var $55=$pos;
      var $56=((($55)+(1))&255);
      $pos=$56;
      label = 2; break;
    case 13:
      var $58=HEAP8[(5256672)];
      var $59=(($58)&(255));
      var $60=$59 & 128;
      var $61=(($60)|(0))!=0;
      if ($61) { label = 14; break; } else { label = 15; break; }
    case 14:
      var $63=$pos;
      var $64=((($63)+(1))&255);
      $pos=$64;
      label = 2; break;
    case 15:
      var $66=HEAP8[(5256672)];
      var $67=(($66)&(255));
      var $68=((($67)+(1))|0);
      var $69=(($68) & 255);
      var $70=$pos;
      var $71=(($70)&(255));
      var $72=((5244080+$71)|0);
      HEAP8[($72)]=$69;
      var $73=$pos;
      var $74=((($73)+(1))&255);
      $pos=$74;
      label = 2; break;
    default: assert(0, "bad label: " + label);
  }
}
function _SetInput($_input) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $i;
      var $l;
      $1=$_input;
      var $2=$1;
      var $3=_strlen($2);
      $l=$3;
      var $4=$l;
      var $5=(($4)|(0)) > 254;
      if ($5) { label = 2; break; } else { label = 3; break; }
    case 2:
      $l=254;
      label = 3; break;
    case 3:
      $i=0;
      label = 4; break;
    case 4:
      var $9=$i;
      var $10=$l;
      var $11=(($9)|(0)) < (($10)|(0));
      if ($11) { label = 5; break; } else { label = 7; break; }
    case 5:
      var $13=$i;
      var $14=$1;
      var $15=(($14+$13)|0);
      var $16=HEAP8[($15)];
      var $17=$i;
      var $18=((5253684+$17)|0);
      HEAP8[($18)]=$16;
      label = 6; break;
    case 6:
      var $20=$i;
      var $21=((($20)+(1))|0);
      $i=$21;
      label = 4; break;
    case 7:
      var $23=$l;
      var $24=((5253684+$23)|0);
      HEAP8[($24)]=0;
      return;
    default: assert(0, "bad label: " + label);
  }
}
Module["_SetInput"] = _SetInput;
function _Init() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $i;
      var $1=HEAP8[(5253644)];
      var $2=HEAP8[(5242988)];
      _SetMouthThroat($1, $2);
      HEAP32[((5255112)>>2)]=0;
      var $3=_malloc(220500);
      HEAP32[((5255116)>>2)]=$3;
      $i=0;
      label = 2; break;
    case 2:
      var $5=$i;
      var $6=(($5)|(0)) < 256;
      if ($6) { label = 3; break; } else { label = 5; break; }
    case 3:
      var $8=$i;
      var $9=((5252308+$8)|0);
      HEAP8[($9)]=0;
      var $10=$i;
      var $11=((5255652+$10)|0);
      HEAP8[($11)]=0;
      var $12=$i;
      var $13=((5255396+$12)|0);
      HEAP8[($13)]=0;
      var $14=$i;
      var $15=((5255140+$14)|0);
      HEAP8[($15)]=0;
      var $16=$i;
      var $17=((5254452+$16)|0);
      HEAP8[($17)]=0;
      var $18=$i;
      var $19=((5254196+$18)|0);
      HEAP8[($19)]=0;
      var $20=$i;
      var $21=((5253940+$20)|0);
      HEAP8[($21)]=0;
      var $22=$i;
      var $23=((5244080+$22)|0);
      HEAP8[($23)]=0;
      var $24=$i;
      var $25=((5253044+$24)|0);
      HEAP8[($25)]=0;
      var $26=$i;
      var $27=((5243332+$26)|0);
      HEAP8[($27)]=0;
      label = 4; break;
    case 4:
      var $29=$i;
      var $30=((($29)+(1))|0);
      $i=$30;
      label = 2; break;
    case 5:
      $i=0;
      label = 6; break;
    case 6:
      var $33=$i;
      var $34=(($33)|(0)) < 60;
      if ($34) { label = 7; break; } else { label = 9; break; }
    case 7:
      var $36=$i;
      var $37=((5253300+$36)|0);
      HEAP8[($37)]=0;
      var $38=$i;
      var $39=((5244008+$38)|0);
      HEAP8[($39)]=0;
      var $40=$i;
      var $41=((5252984+$40)|0);
      HEAP8[($41)]=0;
      label = 8; break;
    case 8:
      var $43=$i;
      var $44=((($43)+(1))|0);
      $i=$44;
      label = 6; break;
    case 9:
      HEAP8[((((5252823)|0))|0)]=-1;
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _SetMouthThroat($mouth, $throat) {
  var label = 0;
  var __stackBase__  = STACKTOP; STACKTOP = (STACKTOP + 80)|0; assert(!(STACKTOP&3)); assert((STACKTOP|0) < (STACK_MAX|0));
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $mem39216;
      var $mem39212;
      var $mem39213;
      var $mem39215;
      var $tab39140=__stackBase__;
      var $tab39170=(__stackBase__)+(32);
      var $tab39200=(__stackBase__)+(64);
      var $tab39206=(__stackBase__)+(72);
      var $pos;
      $1=$mouth;
      $2=$throat;
      var $3=$tab39140;
      assert(30 % 1 === 0);_memcpy($3, ((5256728)|0), 30);
      var $4=$tab39170;
      assert(30 % 1 === 0);_memcpy($4, ((5256696)|0), 30);
      var $5=$tab39200;
      assert(6 % 1 === 0);HEAP8[($5)]=HEAP8[((((5256688)|0))|0)];HEAP8[((($5)+(1))|0)]=HEAP8[(((((5256688)|0))+(1))|0)];HEAP8[((($5)+(2))|0)]=HEAP8[(((((5256688)|0))+(2))|0)];HEAP8[((($5)+(3))|0)]=HEAP8[(((((5256688)|0))+(3))|0)];HEAP8[((($5)+(4))|0)]=HEAP8[(((((5256688)|0))+(4))|0)];HEAP8[((($5)+(5))|0)]=HEAP8[(((((5256688)|0))+(5))|0)];
      var $6=$tab39206;
      assert(6 % 1 === 0);HEAP8[($6)]=HEAP8[((((5256680)|0))|0)];HEAP8[((($6)+(1))|0)]=HEAP8[(((((5256680)|0))+(1))|0)];HEAP8[((($6)+(2))|0)]=HEAP8[(((((5256680)|0))+(2))|0)];HEAP8[((($6)+(3))|0)]=HEAP8[(((((5256680)|0))+(3))|0)];HEAP8[((($6)+(4))|0)]=HEAP8[(((((5256680)|0))+(4))|0)];HEAP8[((($6)+(5))|0)]=HEAP8[(((((5256680)|0))+(5))|0)];
      $pos=5;
      label = 2; break;
    case 2:
      var $8=$pos;
      var $9=(($8)&(255));
      var $10=(($9)|(0))!=30;
      if ($10) { label = 3; break; } else { label = 8; break; }
    case 3:
      var $12=$pos;
      var $13=(($12)&(255));
      var $14=(($tab39140+$13)|0);
      var $15=HEAP8[($14)];
      $mem39213=$15;
      var $16=$mem39213;
      var $17=(($16)&(255));
      var $18=(($17)|(0))!=0;
      if ($18) { label = 4; break; } else { label = 5; break; }
    case 4:
      var $20=$1;
      var $21=$mem39213;
      var $22=_trans($20, $21);
      $mem39215=$22;
      label = 5; break;
    case 5:
      var $24=$mem39215;
      var $25=$pos;
      var $26=(($25)&(255));
      var $27=((5254868+$26)|0);
      HEAP8[($27)]=$24;
      var $28=$pos;
      var $29=(($28)&(255));
      var $30=(($tab39170+$29)|0);
      var $31=HEAP8[($30)];
      $mem39213=$31;
      var $32=$mem39213;
      var $33=(($32)&(255));
      var $34=(($33)|(0))!=0;
      if ($34) { label = 6; break; } else { label = 7; break; }
    case 6:
      var $36=$2;
      var $37=$mem39213;
      var $38=_trans($36, $37);
      $mem39215=$38;
      label = 7; break;
    case 7:
      var $40=$mem39215;
      var $41=$pos;
      var $42=(($41)&(255));
      var $43=((5254788+$42)|0);
      HEAP8[($43)]=$40;
      var $44=$pos;
      var $45=((($44)+(1))&255);
      $pos=$45;
      label = 2; break;
    case 8:
      $pos=48;
      HEAP8[(5256672)]=0;
      label = 9; break;
    case 9:
      var $48=$pos;
      var $49=(($48)&(255));
      var $50=(($49)|(0))!=54;
      if ($50) { label = 10; break; } else { label = 11; break; }
    case 10:
      var $52=HEAP8[(5256672)];
      var $53=(($52)&(255));
      var $54=(($tab39200+$53)|0);
      var $55=HEAP8[($54)];
      $mem39213=$55;
      var $56=$1;
      var $57=$mem39213;
      var $58=_trans($56, $57);
      $mem39215=$58;
      var $59=$mem39215;
      var $60=$pos;
      var $61=(($60)&(255));
      var $62=((5254868+$61)|0);
      HEAP8[($62)]=$59;
      var $63=HEAP8[(5256672)];
      var $64=(($63)&(255));
      var $65=(($tab39206+$64)|0);
      var $66=HEAP8[($65)];
      $mem39213=$66;
      var $67=$2;
      var $68=$mem39213;
      var $69=_trans($67, $68);
      $mem39215=$69;
      var $70=$mem39215;
      var $71=$pos;
      var $72=(($71)&(255));
      var $73=((5254788+$72)|0);
      HEAP8[($73)]=$70;
      var $74=HEAP8[(5256672)];
      var $75=((($74)+(1))&255);
      HEAP8[(5256672)]=$75;
      var $76=$pos;
      var $77=((($76)+(1))&255);
      $pos=$77;
      label = 9; break;
    case 11:
      STACKTOP = __stackBase__;
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _Read($p, $Y) {
  var label = 0;
  var __stackBase__  = STACKTOP; assert(!(STACKTOP&3)); assert((STACKTOP|0) < (STACK_MAX|0));
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      $2=$p;
      $3=$Y;
      var $4=$2;
      var $5=(($4)&(255));
      if ((($5)|(0))==168) {
        label = 2; break;
      }
      else if ((($5)|(0))==169) {
        label = 3; break;
      }
      else if ((($5)|(0))==170) {
        label = 4; break;
      }
      else if ((($5)|(0))==171) {
        label = 5; break;
      }
      else if ((($5)|(0))==172) {
        label = 6; break;
      }
      else if ((($5)|(0))==173) {
        label = 7; break;
      }
      else if ((($5)|(0))==174) {
        label = 8; break;
      }
      else {
      label = 9; break;
      }
    case 2:
      var $7=$3;
      var $8=(($7)&(255));
      var $9=((5252308+$8)|0);
      var $10=HEAP8[($9)];
      $1=$10;
      label = 10; break;
    case 3:
      var $12=$3;
      var $13=(($12)&(255));
      var $14=((5254452+$13)|0);
      var $15=HEAP8[($14)];
      $1=$15;
      label = 10; break;
    case 4:
      var $17=$3;
      var $18=(($17)&(255));
      var $19=((5254196+$18)|0);
      var $20=HEAP8[($19)];
      $1=$20;
      label = 10; break;
    case 5:
      var $22=$3;
      var $23=(($22)&(255));
      var $24=((5253940+$23)|0);
      var $25=HEAP8[($24)];
      $1=$25;
      label = 10; break;
    case 6:
      var $27=$3;
      var $28=(($27)&(255));
      var $29=((5255652+$28)|0);
      var $30=HEAP8[($29)];
      $1=$30;
      label = 10; break;
    case 7:
      var $32=$3;
      var $33=(($32)&(255));
      var $34=((5255396+$33)|0);
      var $35=HEAP8[($34)];
      $1=$35;
      label = 10; break;
    case 8:
      var $37=$3;
      var $38=(($37)&(255));
      var $39=((5255140+$38)|0);
      var $40=HEAP8[($39)];
      $1=$40;
      label = 10; break;
    case 9:
      var $42=_printf(((5256176)|0), (tempInt=STACKTOP,STACKTOP = (STACKTOP + 1)|0,STACKTOP = ((((STACKTOP)+3)>>2)<<2),assert((STACKTOP|0) < (STACK_MAX|0)),HEAP32[((tempInt)>>2)]=0,tempInt));
      $1=0;
      label = 10; break;
    case 10:
      var $44=$1;
      STACKTOP = __stackBase__;
      return $44;
    default: assert(0, "bad label: " + label);
  }
}
function _Write($p, $Y, $value) {
  var label = 0;
  var __stackBase__  = STACKTOP; assert(!(STACKTOP&3)); assert((STACKTOP|0) < (STACK_MAX|0));
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      $1=$p;
      $2=$Y;
      $3=$value;
      var $4=$1;
      var $5=(($4)&(255));
      if ((($5)|(0))==168) {
        label = 2; break;
      }
      else if ((($5)|(0))==169) {
        label = 3; break;
      }
      else if ((($5)|(0))==170) {
        label = 4; break;
      }
      else if ((($5)|(0))==171) {
        label = 5; break;
      }
      else if ((($5)|(0))==172) {
        label = 6; break;
      }
      else if ((($5)|(0))==173) {
        label = 7; break;
      }
      else if ((($5)|(0))==174) {
        label = 8; break;
      }
      else {
      label = 9; break;
      }
    case 2:
      var $7=$3;
      var $8=$2;
      var $9=(($8)&(255));
      var $10=((5252308+$9)|0);
      HEAP8[($10)]=$7;
      label = 10; break;
    case 3:
      var $12=$3;
      var $13=$2;
      var $14=(($13)&(255));
      var $15=((5254452+$14)|0);
      HEAP8[($15)]=$12;
      label = 10; break;
    case 4:
      var $17=$3;
      var $18=$2;
      var $19=(($18)&(255));
      var $20=((5254196+$19)|0);
      HEAP8[($20)]=$17;
      label = 10; break;
    case 5:
      var $22=$3;
      var $23=$2;
      var $24=(($23)&(255));
      var $25=((5253940+$24)|0);
      HEAP8[($25)]=$22;
      label = 10; break;
    case 6:
      var $27=$3;
      var $28=$2;
      var $29=(($28)&(255));
      var $30=((5255652+$29)|0);
      HEAP8[($30)]=$27;
      label = 10; break;
    case 7:
      var $32=$3;
      var $33=$2;
      var $34=(($33)&(255));
      var $35=((5255396+$34)|0);
      HEAP8[($35)]=$32;
      label = 10; break;
    case 8:
      var $37=$3;
      var $38=$2;
      var $39=(($38)&(255));
      var $40=((5255140+$39)|0);
      HEAP8[($40)]=$37;
      label = 10; break;
    case 9:
      var $42=_printf(((5256148)|0), (tempInt=STACKTOP,STACKTOP = (STACKTOP + 1)|0,STACKTOP = ((((STACKTOP)+3)>>2)<<2),assert((STACKTOP|0) < (STACK_MAX|0)),HEAP32[((tempInt)>>2)]=0,tempInt));
      label = 10; break;
    case 10:
      STACKTOP = __stackBase__;
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _Code39771() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $temp;
      _Init();
      HEAP8[((((5252823)|0))|0)]=32;
      var $2=_Parser1();
      var $3=(($2)|(0))!=0;
      if ($3) { label = 3; break; } else { label = 2; break; }
    case 2:
      $1=0;
      label = 9; break;
    case 3:
      _Parser2();
      _Code41883();
      _SetPhonemeLength();
      _Code48619();
      _Code41240();
      label = 4; break;
    case 4:
      var $7=HEAP8[(5256676)];
      var $8=(($7)&(255));
      var $9=((5252568+$8)|0);
      var $10=HEAP8[($9)];
      HEAP8[(5256760)]=$10;
      var $11=HEAP8[(5256760)];
      var $12=(($11)&(255));
      var $13=(($12)|(0)) > 80;
      if ($13) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $15=HEAP8[(5256676)];
      var $16=(($15)&(255));
      var $17=((5252568+$16)|0);
      HEAP8[($17)]=-1;
      label = 8; break;
    case 6:
      var $19=HEAP8[(5256676)];
      var $20=((($19)+(1))&255);
      HEAP8[(5256676)]=$20;
      label = 7; break;
    case 7:
      var $22=HEAP8[(5256676)];
      var $23=(($22)&(255));
      var $24=(($23)|(0))!=0;
      if ($24) { label = 4; break; } else { label = 8; break; }
    case 8:
      _Code48431();
      _Code48547();
      $1=1;
      label = 9; break;
    case 9:
      var $27=$1;
      return $27;
    default: assert(0, "bad label: " + label);
  }
}
Module["_Code39771"] = _Code39771;
function _Code48547() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $temp;
      HEAP8[(5256760)]=0;
      HEAP8[(5256676)]=0;
      HEAP8[(5256672)]=0;
      label = 2; break;
    case 2:
      var $2=HEAP8[(5256676)];
      var $3=(($2)&(255));
      var $4=((5252568+$3)|0);
      var $5=HEAP8[($4)];
      HEAP8[(5256760)]=$5;
      var $6=HEAP8[(5256760)];
      var $7=(($6)&(255));
      var $8=(($7)|(0))==255;
      if ($8) { label = 3; break; } else { label = 4; break; }
    case 3:
      HEAP8[(5256760)]=-1;
      var $10=HEAP8[(5256672)];
      var $11=(($10)&(255));
      var $12=((5253300+$11)|0);
      HEAP8[($12)]=-1;
      _Code47574();
      return;
    case 4:
      var $14=HEAP8[(5256760)];
      var $15=(($14)&(255));
      var $16=(($15)|(0))==254;
      if ($16) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $18=HEAP8[(5256676)];
      var $19=((($18)+(1))&255);
      HEAP8[(5256676)]=$19;
      var $20=HEAP8[(5256676)];
      var $21=(($20)&(255));
      $temp=$21;
      var $22=HEAP8[(5256672)];
      var $23=(($22)&(255));
      var $24=((5253300+$23)|0);
      HEAP8[($24)]=-1;
      _Code47574();
      var $25=$temp;
      var $26=(($25) & 255);
      HEAP8[(5256676)]=$26;
      HEAP8[(5256672)]=0;
      label = 2; break;
    case 6:
      var $28=HEAP8[(5256760)];
      var $29=(($28)&(255));
      var $30=(($29)|(0))==0;
      if ($30) { label = 7; break; } else { label = 8; break; }
    case 7:
      var $32=HEAP8[(5256676)];
      var $33=((($32)+(1))&255);
      HEAP8[(5256676)]=$33;
      label = 2; break;
    case 8:
      var $35=HEAP8[(5256760)];
      var $36=HEAP8[(5256672)];
      var $37=(($36)&(255));
      var $38=((5253300+$37)|0);
      HEAP8[($38)]=$35;
      var $39=HEAP8[(5256676)];
      var $40=(($39)&(255));
      var $41=((5253044+$40)|0);
      var $42=HEAP8[($41)];
      var $43=HEAP8[(5256672)];
      var $44=(($43)&(255));
      var $45=((5252984+$44)|0);
      HEAP8[($45)]=$42;
      var $46=HEAP8[(5256676)];
      var $47=(($46)&(255));
      var $48=((5244080+$47)|0);
      var $49=HEAP8[($48)];
      var $50=HEAP8[(5256672)];
      var $51=(($50)&(255));
      var $52=((5244008+$51)|0);
      HEAP8[($52)]=$49;
      var $53=HEAP8[(5256676)];
      var $54=((($53)+(1))&255);
      HEAP8[(5256676)]=$54;
      var $55=HEAP8[(5256672)];
      var $56=((($55)+(1))&255);
      HEAP8[(5256672)]=$56;
      label = 2; break;
    default: assert(0, "bad label: " + label);
  }
}
function _Code48431() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $mem54;
      var $mem55;
      var $index;
      var $mem66;
      $mem54=-1;
      var $1=HEAP8[(5256676)];
      var $2=((($1)+(1))&255);
      HEAP8[(5256676)]=$2;
      $mem55=0;
      $mem66=0;
      label = 2; break;
    case 2:
      var $4=$mem66;
      HEAP8[(5256676)]=$4;
      var $5=HEAP8[(5256676)];
      var $6=(($5)&(255));
      var $7=((5252568+$6)|0);
      var $8=HEAP8[($7)];
      $index=$8;
      var $9=$index;
      var $10=(($9)&(255));
      var $11=(($10)|(0))==255;
      if ($11) { label = 3; break; } else { label = 4; break; }
    case 3:
      return;
    case 4:
      var $14=HEAP8[(5256676)];
      var $15=(($14)&(255));
      var $16=((5253044+$15)|0);
      var $17=HEAP8[($16)];
      var $18=(($17)&(255));
      var $19=$mem55;
      var $20=(($19)&(255));
      var $21=((($20)+($18))|0);
      var $22=(($21) & 255);
      $mem55=$22;
      var $23=$mem55;
      var $24=(($23)&(255));
      var $25=(($24)|(0)) < 232;
      if ($25) { label = 5; break; } else { label = 12; break; }
    case 5:
      var $27=$index;
      var $28=(($27)&(255));
      var $29=(($28)|(0))!=254;
      if ($29) { label = 6; break; } else { label = 9; break; }
    case 6:
      var $31=$index;
      var $32=(($31)&(255));
      var $33=((5254948+$32)|0);
      var $34=HEAP8[($33)];
      var $35=(($34)&(255));
      var $36=$35 & 1;
      var $37=(($36) & 255);
      HEAP8[(5256760)]=$37;
      var $38=HEAP8[(5256760)];
      var $39=(($38)&(255));
      var $40=(($39)|(0))!=0;
      if ($40) { label = 7; break; } else { label = 8; break; }
    case 7:
      var $42=HEAP8[(5256676)];
      var $43=((($42)+(1))&255);
      HEAP8[(5256676)]=$43;
      $mem55=0;
      var $44=HEAP8[(5256676)];
      var $45=HEAP8[(5253648)];
      _Insert($44, -2, $45, 0);
      var $46=$mem66;
      var $47=((($46)+(1))&255);
      $mem66=$47;
      var $48=$mem66;
      var $49=((($48)+(1))&255);
      $mem66=$49;
      label = 2; break;
    case 8:
      label = 9; break;
    case 9:
      var $52=$index;
      var $53=(($52)&(255));
      var $54=(($53)|(0))==0;
      if ($54) { label = 10; break; } else { label = 11; break; }
    case 10:
      var $56=HEAP8[(5256676)];
      $mem54=$56;
      label = 11; break;
    case 11:
      var $58=$mem66;
      var $59=((($58)+(1))&255);
      $mem66=$59;
      label = 2; break;
    case 12:
      var $61=$mem54;
      HEAP8[(5256676)]=$61;
      var $62=HEAP8[(5256676)];
      var $63=(($62)&(255));
      var $64=((5252568+$63)|0);
      HEAP8[($64)]=31;
      var $65=HEAP8[(5256676)];
      var $66=(($65)&(255));
      var $67=((5253044+$66)|0);
      HEAP8[($67)]=4;
      var $68=HEAP8[(5256676)];
      var $69=(($68)&(255));
      var $70=((5244080+$69)|0);
      HEAP8[($70)]=0;
      var $71=HEAP8[(5256676)];
      var $72=((($71)+(1))&255);
      HEAP8[(5256676)]=$72;
      $mem55=0;
      var $73=HEAP8[(5256676)];
      var $74=HEAP8[(5253648)];
      _Insert($73, -2, $74, 0);
      var $75=HEAP8[(5256676)];
      var $76=((($75)+(1))&255);
      HEAP8[(5256676)]=$76;
      var $77=HEAP8[(5256676)];
      $mem66=$77;
      label = 2; break;
    default: assert(0, "bad label: " + label);
  }
}
function _Parser1() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $i;
      var $sign1;
      var $sign2;
      var $position;
      $position=0;
      HEAP8[(5256676)]=0;
      HEAP8[(5256760)]=0;
      HEAP8[(5256672)]=0;
      $i=0;
      label = 2; break;
    case 2:
      var $3=$i;
      var $4=(($3)|(0)) < 256;
      if ($4) { label = 3; break; } else { label = 5; break; }
    case 3:
      var $6=$i;
      var $7=((5244080+$6)|0);
      HEAP8[($7)]=0;
      label = 4; break;
    case 4:
      var $9=$i;
      var $10=((($9)+(1))|0);
      $i=$10;
      label = 2; break;
    case 5:
      label = 6; break;
    case 6:
      var $13=HEAP8[(5256676)];
      var $14=(($13)&(255));
      var $15=((5253684+$14)|0);
      var $16=HEAP8[($15)];
      $sign1=$16;
      var $17=$sign1;
      var $18=(($17)&(255));
      var $19=(($18)|(0))==155;
      if ($19) { label = 7; break; } else { label = 8; break; }
    case 7:
      var $21=$position;
      var $22=(($21)&(255));
      var $23=((5252568+$22)|0);
      HEAP8[($23)]=-1;
      $1=1;
      label = 31; break;
    case 8:
      var $25=HEAP8[(5256676)];
      var $26=((($25)+(1))&255);
      HEAP8[(5256676)]=$26;
      var $27=HEAP8[(5256676)];
      var $28=(($27)&(255));
      var $29=((5253684+$28)|0);
      var $30=HEAP8[($29)];
      $sign2=$30;
      HEAP8[(5256672)]=0;
      label = 9; break;
    case 9:
      var $32=HEAP8[(5256672)];
      var $33=(($32)&(255));
      var $34=((5244684+$33)|0);
      var $35=HEAP8[($34)];
      HEAP8[(5256760)]=$35;
      var $36=HEAP8[(5256760)];
      var $37=(($36)&(255));
      var $38=$sign1;
      var $39=(($38)&(255));
      var $40=(($37)|(0))==(($39)|(0));
      if ($40) { label = 10; break; } else { label = 14; break; }
    case 10:
      var $42=HEAP8[(5256672)];
      var $43=(($42)&(255));
      var $44=((5244600+$43)|0);
      var $45=HEAP8[($44)];
      HEAP8[(5256760)]=$45;
      var $46=HEAP8[(5256760)];
      var $47=(($46)&(255));
      var $48=(($47)|(0))!=42;
      if ($48) { label = 11; break; } else { label = 13; break; }
    case 11:
      var $50=HEAP8[(5256760)];
      var $51=(($50)&(255));
      var $52=$sign2;
      var $53=(($52)&(255));
      var $54=(($51)|(0))==(($53)|(0));
      if ($54) { label = 12; break; } else { label = 13; break; }
    case 12:
      var $56=HEAP8[(5256672)];
      var $57=$position;
      var $58=(($57)&(255));
      var $59=((5252568+$58)|0);
      HEAP8[($59)]=$56;
      var $60=$position;
      var $61=((($60)+(1))&255);
      $position=$61;
      var $62=HEAP8[(5256676)];
      var $63=((($62)+(1))&255);
      HEAP8[(5256676)]=$63;
      label = 6; break;
    case 13:
      label = 14; break;
    case 14:
      var $66=HEAP8[(5256672)];
      var $67=((($66)+(1))&255);
      HEAP8[(5256672)]=$67;
      var $68=HEAP8[(5256672)];
      var $69=(($68)&(255));
      var $70=(($69)|(0))!=81;
      if ($70) { label = 15; break; } else { label = 16; break; }
    case 15:
      label = 9; break;
    case 16:
      HEAP8[(5256672)]=0;
      label = 17; break;
    case 17:
      var $74=HEAP8[(5256672)];
      var $75=(($74)&(255));
      var $76=((5244600+$75)|0);
      var $77=HEAP8[($76)];
      var $78=(($77)&(255));
      var $79=(($78)|(0))==42;
      if ($79) { label = 18; break; } else { label = 21; break; }
    case 18:
      var $81=HEAP8[(5256672)];
      var $82=(($81)&(255));
      var $83=((5244684+$82)|0);
      var $84=HEAP8[($83)];
      var $85=(($84)&(255));
      var $86=$sign1;
      var $87=(($86)&(255));
      var $88=(($85)|(0))==(($87)|(0));
      if ($88) { label = 19; break; } else { label = 20; break; }
    case 19:
      var $90=HEAP8[(5256672)];
      var $91=$position;
      var $92=(($91)&(255));
      var $93=((5252568+$92)|0);
      HEAP8[($93)]=$90;
      var $94=$position;
      var $95=((($94)+(1))&255);
      $position=$95;
      label = 6; break;
    case 20:
      label = 21; break;
    case 21:
      var $98=HEAP8[(5256672)];
      var $99=((($98)+(1))&255);
      HEAP8[(5256672)]=$99;
      var $100=HEAP8[(5256672)];
      var $101=(($100)&(255));
      var $102=(($101)|(0))!=81;
      if ($102) { label = 22; break; } else { label = 23; break; }
    case 22:
      label = 17; break;
    case 23:
      HEAP8[(5256672)]=8;
      label = 24; break;
    case 24:
      var $106=$sign1;
      var $107=(($106)&(255));
      var $108=HEAP8[(5256672)];
      var $109=(($108)&(255));
      var $110=((5244068+$109)|0);
      var $111=HEAP8[($110)];
      var $112=(($111)&(255));
      var $113=(($107)|(0))!=(($112)|(0));
      if ($113) { label = 25; break; } else { var $119 = 0;label = 26; break; }
    case 25:
      var $115=HEAP8[(5256672)];
      var $116=(($115)&(255));
      var $117=(($116)|(0)) > 0;
      var $119 = $117;label = 26; break;
    case 26:
      var $119;
      if ($119) { label = 27; break; } else { label = 28; break; }
    case 27:
      var $121=HEAP8[(5256672)];
      var $122=((($121)-(1))&255);
      HEAP8[(5256672)]=$122;
      label = 24; break;
    case 28:
      var $124=HEAP8[(5256672)];
      var $125=(($124)&(255));
      var $126=(($125)|(0))==0;
      if ($126) { label = 29; break; } else { label = 30; break; }
    case 29:
      $1=0;
      label = 31; break;
    case 30:
      var $129=HEAP8[(5256672)];
      var $130=$position;
      var $131=(($130)&(255));
      var $132=((($131)-(1))|0);
      var $133=((5244080+$132)|0);
      HEAP8[($133)]=$129;
      label = 6; break;
    case 31:
      var $135=$1;
      return $135;
    default: assert(0, "bad label: " + label);
  }
}
function _SetPhonemeLength() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $A;
      var $position;
      $position=0;
      label = 2; break;
    case 2:
      var $2=$position;
      var $3=((5252568+$2)|0);
      var $4=HEAP8[($3)];
      var $5=(($4)&(255));
      var $6=(($5)|(0))!=255;
      if ($6) { label = 3; break; } else { label = 8; break; }
    case 3:
      var $8=$position;
      var $9=((5244080+$8)|0);
      var $10=HEAP8[($9)];
      $A=$10;
      var $11=$A;
      var $12=(($11)&(255));
      var $13=(($12)|(0))==0;
      if ($13) { label = 5; break; } else { label = 4; break; }
    case 4:
      var $15=$A;
      var $16=(($15)&(255));
      var $17=$16 & 128;
      var $18=(($17)|(0))!=0;
      if ($18) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $20=$position;
      var $21=((5252568+$20)|0);
      var $22=HEAP8[($21)];
      var $23=(($22)&(255));
      var $24=((5252904+$23)|0);
      var $25=HEAP8[($24)];
      var $26=$position;
      var $27=((5253044+$26)|0);
      HEAP8[($27)]=$25;
      label = 7; break;
    case 6:
      var $29=$position;
      var $30=((5252568+$29)|0);
      var $31=HEAP8[($30)];
      var $32=(($31)&(255));
      var $33=((5252824+$32)|0);
      var $34=HEAP8[($33)];
      var $35=$position;
      var $36=((5253044+$35)|0);
      HEAP8[($36)]=$34;
      label = 7; break;
    case 7:
      var $38=$position;
      var $39=((($38)+(1))|0);
      $position=$39;
      label = 2; break;
    case 8:
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _Code41240() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $pos;
      var $index;
      $pos=0;
      label = 2; break;
    case 2:
      var $2=$pos;
      var $3=(($2)&(255));
      var $4=((5252568+$3)|0);
      var $5=HEAP8[($4)];
      var $6=(($5)&(255));
      var $7=(($6)|(0))!=255;
      if ($7) { label = 3; break; } else { label = 19; break; }
    case 3:
      var $9=$pos;
      HEAP8[(5256676)]=$9;
      var $10=$pos;
      var $11=(($10)&(255));
      var $12=((5252568+$11)|0);
      var $13=HEAP8[($12)];
      $index=$13;
      var $14=$index;
      var $15=(($14)&(255));
      var $16=((5255028+$15)|0);
      var $17=HEAP8[($16)];
      var $18=(($17)&(255));
      var $19=$18 & 2;
      var $20=(($19)|(0))==0;
      if ($20) { label = 4; break; } else { label = 5; break; }
    case 4:
      var $22=$pos;
      var $23=((($22)+(1))&255);
      $pos=$23;
      label = 2; break;
    case 5:
      var $25=$index;
      var $26=(($25)&(255));
      var $27=((5255028+$26)|0);
      var $28=HEAP8[($27)];
      var $29=(($28)&(255));
      var $30=$29 & 1;
      var $31=(($30)|(0))==0;
      if ($31) { label = 6; break; } else { label = 7; break; }
    case 6:
      var $33=$pos;
      var $34=(($33)&(255));
      var $35=((($34)+(1))|0);
      var $36=(($35) & 255);
      var $37=$index;
      var $38=(($37)&(255));
      var $39=((($38)+(1))|0);
      var $40=(($39) & 255);
      var $41=$index;
      var $42=(($41)&(255));
      var $43=((($42)+(1))|0);
      var $44=((5252904+$43)|0);
      var $45=HEAP8[($44)];
      var $46=$pos;
      var $47=(($46)&(255));
      var $48=((5244080+$47)|0);
      var $49=HEAP8[($48)];
      _Insert($36, $40, $45, $49);
      var $50=$pos;
      var $51=(($50)&(255));
      var $52=((($51)+(2))|0);
      var $53=(($52) & 255);
      var $54=$index;
      var $55=(($54)&(255));
      var $56=((($55)+(2))|0);
      var $57=(($56) & 255);
      var $58=$index;
      var $59=(($58)&(255));
      var $60=((($59)+(2))|0);
      var $61=((5252904+$60)|0);
      var $62=HEAP8[($61)];
      var $63=$pos;
      var $64=(($63)&(255));
      var $65=((5244080+$64)|0);
      var $66=HEAP8[($65)];
      _Insert($53, $57, $62, $66);
      var $67=$pos;
      var $68=(($67)&(255));
      var $69=((($68)+(3))|0);
      var $70=(($69) & 255);
      $pos=$70;
      label = 2; break;
    case 7:
      label = 8; break;
    case 8:
      label = 9; break;
    case 9:
      var $74=HEAP8[(5256676)];
      var $75=((($74)+(1))&255);
      HEAP8[(5256676)]=$75;
      var $76=HEAP8[(5256676)];
      var $77=(($76)&(255));
      var $78=((5252568+$77)|0);
      var $79=HEAP8[($78)];
      HEAP8[(5256760)]=$79;
      label = 10; break;
    case 10:
      var $81=HEAP8[(5256760)];
      var $82=(($81)&(255));
      var $83=(($82)|(0))==0;
      if ($83) { label = 9; break; } else { label = 11; break; }
    case 11:
      var $85=HEAP8[(5256760)];
      var $86=(($85)&(255));
      var $87=(($86)|(0))!=255;
      if ($87) { label = 12; break; } else { label = 18; break; }
    case 12:
      var $89=HEAP8[(5256760)];
      var $90=(($89)&(255));
      var $91=((5255028+$90)|0);
      var $92=HEAP8[($91)];
      var $93=(($92)&(255));
      var $94=$93 & 8;
      var $95=(($94)|(0))!=0;
      if ($95) { label = 13; break; } else { label = 14; break; }
    case 13:
      var $97=$pos;
      var $98=((($97)+(1))&255);
      $pos=$98;
      label = 2; break;
    case 14:
      var $100=HEAP8[(5256760)];
      var $101=(($100)&(255));
      var $102=(($101)|(0))==36;
      if ($102) { label = 16; break; } else { label = 15; break; }
    case 15:
      var $104=HEAP8[(5256760)];
      var $105=(($104)&(255));
      var $106=(($105)|(0))==37;
      if ($106) { label = 16; break; } else { label = 17; break; }
    case 16:
      var $108=$pos;
      var $109=((($108)+(1))&255);
      $pos=$109;
      label = 2; break;
    case 17:
      label = 18; break;
    case 18:
      var $112=$pos;
      var $113=(($112)&(255));
      var $114=((($113)+(1))|0);
      var $115=(($114) & 255);
      var $116=$index;
      var $117=(($116)&(255));
      var $118=((($117)+(1))|0);
      var $119=(($118) & 255);
      var $120=$index;
      var $121=(($120)&(255));
      var $122=((($121)+(1))|0);
      var $123=((5252904+$122)|0);
      var $124=HEAP8[($123)];
      var $125=$pos;
      var $126=(($125)&(255));
      var $127=((5244080+$126)|0);
      var $128=HEAP8[($127)];
      _Insert($115, $119, $124, $128);
      var $129=$pos;
      var $130=(($129)&(255));
      var $131=((($130)+(2))|0);
      var $132=(($131) & 255);
      var $133=$index;
      var $134=(($133)&(255));
      var $135=((($134)+(2))|0);
      var $136=(($135) & 255);
      var $137=$index;
      var $138=(($137)&(255));
      var $139=((($138)+(2))|0);
      var $140=((5252904+$139)|0);
      var $141=HEAP8[($140)];
      var $142=$pos;
      var $143=(($142)&(255));
      var $144=((5244080+$143)|0);
      var $145=HEAP8[($144)];
      _Insert($132, $136, $141, $145);
      var $146=$pos;
      var $147=(($146)&(255));
      var $148=((($147)+(3))|0);
      var $149=(($148) & 255);
      $pos=$149;
      label = 2; break;
    case 19:
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _Parser2() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $pos;
      var $mem58;
      var $index;
      $pos=0;
      $mem58=0;
      label = 2; break;
    case 2:
      var $2=$pos;
      HEAP8[(5256676)]=$2;
      var $3=$pos;
      var $4=(($3)&(255));
      var $5=((5252568+$4)|0);
      var $6=HEAP8[($5)];
      HEAP8[(5256760)]=$6;
      var $7=HEAP8[(5256760)];
      var $8=(($7)&(255));
      var $9=(($8)|(0))==0;
      if ($9) { label = 3; break; } else { label = 4; break; }
    case 3:
      var $11=$pos;
      var $12=((($11)+(1))&255);
      $pos=$12;
      label = 2; break;
    case 4:
      var $14=HEAP8[(5256760)];
      var $15=(($14)&(255));
      var $16=(($15)|(0))==255;
      if ($16) { label = 5; break; } else { label = 6; break; }
    case 5:
      return;
    case 6:
      var $19=HEAP8[(5256760)];
      HEAP8[(5256672)]=$19;
      var $20=HEAP8[(5256760)];
      var $21=(($20)&(255));
      var $22=((5255028+$21)|0);
      var $23=HEAP8[($22)];
      var $24=(($23)&(255));
      var $25=$24 & 16;
      var $26=(($25)|(0))==0;
      if ($26) { label = 7; break; } else { label = 8; break; }
    case 7:
      label = 12; break;
    case 8:
      var $29=$pos;
      var $30=(($29)&(255));
      var $31=((5244080+$30)|0);
      var $32=HEAP8[($31)];
      $mem58=$32;
      var $33=HEAP8[(5256672)];
      var $34=(($33)&(255));
      var $35=((5255028+$34)|0);
      var $36=HEAP8[($35)];
      var $37=(($36)&(255));
      var $38=$37 & 32;
      var $39=(($38) & 255);
      HEAP8[(5256760)]=$39;
      var $40=HEAP8[(5256760)];
      var $41=(($40)&(255));
      var $42=(($41)|(0))==0;
      if ($42) { label = 9; break; } else { label = 10; break; }
    case 9:
      HEAP8[(5256760)]=20;
      label = 11; break;
    case 10:
      HEAP8[(5256760)]=21;
      label = 11; break;
    case 11:
      var $46=$pos;
      var $47=(($46)&(255));
      var $48=((($47)+(1))|0);
      var $49=(($48) & 255);
      var $50=HEAP8[(5256760)];
      var $51=HEAP8[(5253648)];
      var $52=$mem58;
      _Insert($49, $50, $51, $52);
      var $53=$pos;
      HEAP8[(5256676)]=$53;
      label = 72; break;
    case 12:
      var $55=HEAP8[(5256676)];
      var $56=(($55)&(255));
      var $57=((5252568+$56)|0);
      var $58=HEAP8[($57)];
      HEAP8[(5256760)]=$58;
      var $59=HEAP8[(5256760)];
      var $60=(($59)&(255));
      var $61=(($60)|(0))!=78;
      if ($61) { label = 13; break; } else { label = 14; break; }
    case 13:
      label = 16; break;
    case 14:
      HEAP8[(5256760)]=24;
      label = 15; break;
    case 15:
      var $65=HEAP8[(5256676)];
      var $66=(($65)&(255));
      var $67=((5244080+$66)|0);
      var $68=HEAP8[($67)];
      $mem58=$68;
      var $69=HEAP8[(5256676)];
      var $70=(($69)&(255));
      var $71=((5252568+$70)|0);
      HEAP8[($71)]=13;
      var $72=HEAP8[(5256676)];
      var $73=(($72)&(255));
      var $74=((($73)+(1))|0);
      var $75=(($74) & 255);
      var $76=HEAP8[(5256760)];
      var $77=HEAP8[(5253648)];
      var $78=$mem58;
      _Insert($75, $76, $77, $78);
      var $79=$pos;
      var $80=((($79)+(1))&255);
      $pos=$80;
      label = 2; break;
    case 16:
      var $82=HEAP8[(5256760)];
      var $83=(($82)&(255));
      var $84=(($83)|(0))!=79;
      if ($84) { label = 17; break; } else { label = 18; break; }
    case 17:
      label = 19; break;
    case 18:
      HEAP8[(5256760)]=27;
      label = 15; break;
    case 19:
      var $88=HEAP8[(5256760)];
      var $89=(($88)&(255));
      var $90=(($89)|(0))!=80;
      if ($90) { label = 20; break; } else { label = 21; break; }
    case 20:
      label = 22; break;
    case 21:
      HEAP8[(5256760)]=28;
      label = 15; break;
    case 22:
      var $94=HEAP8[(5256760)];
      HEAP8[(5256672)]=$94;
      var $95=HEAP8[(5256760)];
      var $96=(($95)&(255));
      var $97=((5255028+$96)|0);
      var $98=HEAP8[($97)];
      var $99=(($98)&(255));
      var $100=$99 & 128;
      var $101=(($100) & 255);
      HEAP8[(5256760)]=$101;
      var $102=HEAP8[(5256760)];
      var $103=(($102)&(255));
      var $104=(($103)|(0))!=0;
      if ($104) { label = 23; break; } else { label = 35; break; }
    case 23:
      var $106=HEAP8[(5256676)];
      var $107=(($106)&(255));
      var $108=((5244080+$107)|0);
      var $109=HEAP8[($108)];
      HEAP8[(5256760)]=$109;
      var $110=HEAP8[(5256760)];
      var $111=(($110)&(255));
      var $112=(($111)|(0))!=0;
      if ($112) { label = 24; break; } else { label = 34; break; }
    case 24:
      var $114=HEAP8[(5256676)];
      var $115=((($114)+(1))&255);
      HEAP8[(5256676)]=$115;
      var $116=HEAP8[(5256676)];
      var $117=(($116)&(255));
      var $118=((5252568+$117)|0);
      var $119=HEAP8[($118)];
      HEAP8[(5256760)]=$119;
      var $120=HEAP8[(5256760)];
      var $121=(($120)&(255));
      var $122=(($121)|(0))==0;
      if ($122) { label = 25; break; } else { label = 33; break; }
    case 25:
      var $124=HEAP8[(5256676)];
      var $125=((($124)+(1))&255);
      HEAP8[(5256676)]=$125;
      var $126=HEAP8[(5256676)];
      var $127=(($126)&(255));
      var $128=((5252568+$127)|0);
      var $129=HEAP8[($128)];
      HEAP8[(5256672)]=$129;
      var $130=HEAP8[(5256672)];
      var $131=(($130)&(255));
      var $132=(($131)|(0))==255;
      if ($132) { label = 26; break; } else { label = 27; break; }
    case 26:
      HEAP8[(5256760)]=0;
      label = 28; break;
    case 27:
      var $135=HEAP8[(5256672)];
      var $136=(($135)&(255));
      var $137=((5255028+$136)|0);
      var $138=HEAP8[($137)];
      var $139=(($138)&(255));
      var $140=$139 & 128;
      var $141=(($140) & 255);
      HEAP8[(5256760)]=$141;
      label = 28; break;
    case 28:
      var $143=HEAP8[(5256760)];
      var $144=(($143)&(255));
      var $145=(($144)|(0))!=0;
      if ($145) { label = 29; break; } else { label = 32; break; }
    case 29:
      var $147=HEAP8[(5256676)];
      var $148=(($147)&(255));
      var $149=((5244080+$148)|0);
      var $150=HEAP8[($149)];
      HEAP8[(5256760)]=$150;
      var $151=HEAP8[(5256760)];
      var $152=(($151)&(255));
      var $153=(($152)|(0))!=0;
      if ($153) { label = 30; break; } else { label = 31; break; }
    case 30:
      var $155=HEAP8[(5256676)];
      var $156=HEAP8[(5253648)];
      _Insert($155, 31, $156, 0);
      var $157=$pos;
      var $158=((($157)+(1))&255);
      $pos=$158;
      label = 2; break;
    case 31:
      label = 32; break;
    case 32:
      label = 33; break;
    case 33:
      label = 34; break;
    case 34:
      label = 35; break;
    case 35:
      var $164=$pos;
      HEAP8[(5256676)]=$164;
      var $165=$pos;
      var $166=(($165)&(255));
      var $167=((5252568+$166)|0);
      var $168=HEAP8[($167)];
      HEAP8[(5256760)]=$168;
      var $169=HEAP8[(5256760)];
      var $170=(($169)&(255));
      var $171=(($170)|(0))!=23;
      if ($171) { label = 36; break; } else { label = 37; break; }
    case 36:
      label = 44; break;
    case 37:
      var $174=HEAP8[(5256676)];
      var $175=((($174)-(1))&255);
      HEAP8[(5256676)]=$175;
      var $176=$pos;
      var $177=(($176)&(255));
      var $178=((($177)-(1))|0);
      var $179=((5252568+$178)|0);
      var $180=HEAP8[($179)];
      HEAP8[(5256760)]=$180;
      var $181=HEAP8[(5256760)];
      var $182=(($181)&(255));
      var $183=(($182)|(0))==69;
      if ($183) { label = 38; break; } else { label = 39; break; }
    case 38:
      var $185=$pos;
      var $186=(($185)&(255));
      var $187=((($186)-(1))|0);
      var $188=((5252568+$187)|0);
      HEAP8[($188)]=42;
      label = 77; break;
    case 39:
      var $190=HEAP8[(5256760)];
      var $191=(($190)&(255));
      var $192=(($191)|(0))==57;
      if ($192) { label = 40; break; } else { label = 41; break; }
    case 40:
      var $194=$pos;
      var $195=(($194)&(255));
      var $196=((($195)-(1))|0);
      var $197=((5252568+$196)|0);
      HEAP8[($197)]=44;
      label = 80; break;
    case 41:
      var $199=HEAP8[(5256760)];
      var $200=(($199)&(255));
      var $201=((5255028+$200)|0);
      var $202=HEAP8[($201)];
      var $203=(($202)&(255));
      var $204=$203 & 128;
      var $205=(($204) & 255);
      HEAP8[(5256760)]=$205;
      var $206=HEAP8[(5256760)];
      var $207=(($206)&(255));
      var $208=(($207)|(0))!=0;
      if ($208) { label = 42; break; } else { label = 43; break; }
    case 42:
      var $210=$pos;
      var $211=(($210)&(255));
      var $212=((5252568+$211)|0);
      HEAP8[($212)]=18;
      label = 43; break;
    case 43:
      var $214=$pos;
      var $215=((($214)+(1))&255);
      $pos=$215;
      label = 2; break;
    case 44:
      var $217=HEAP8[(5256760)];
      var $218=(($217)&(255));
      var $219=(($218)|(0))==24;
      if ($219) { label = 45; break; } else { label = 48; break; }
    case 45:
      var $221=$pos;
      var $222=(($221)&(255));
      var $223=((($222)-(1))|0);
      var $224=((5252568+$223)|0);
      var $225=HEAP8[($224)];
      var $226=(($225)&(255));
      var $227=((5255028+$226)|0);
      var $228=HEAP8[($227)];
      var $229=(($228)&(255));
      var $230=$229 & 128;
      var $231=(($230)|(0))==0;
      if ($231) { label = 46; break; } else { label = 47; break; }
    case 46:
      var $233=$pos;
      var $234=((($233)+(1))&255);
      $pos=$234;
      label = 2; break;
    case 47:
      var $236=HEAP8[(5256676)];
      var $237=(($236)&(255));
      var $238=((5252568+$237)|0);
      HEAP8[($238)]=19;
      var $239=$pos;
      var $240=((($239)+(1))&255);
      $pos=$240;
      label = 2; break;
    case 48:
      var $242=HEAP8[(5256760)];
      var $243=(($242)&(255));
      var $244=(($243)|(0))==32;
      if ($244) { label = 49; break; } else { label = 52; break; }
    case 49:
      var $246=$pos;
      var $247=(($246)&(255));
      var $248=((($247)-(1))|0);
      var $249=((5252568+$248)|0);
      var $250=HEAP8[($249)];
      var $251=(($250)&(255));
      var $252=(($251)|(0))!=60;
      if ($252) { label = 50; break; } else { label = 51; break; }
    case 50:
      var $254=$pos;
      var $255=((($254)+(1))&255);
      $pos=$255;
      label = 2; break;
    case 51:
      var $257=$pos;
      var $258=(($257)&(255));
      var $259=((5252568+$258)|0);
      HEAP8[($259)]=38;
      var $260=$pos;
      var $261=((($260)+(1))&255);
      $pos=$261;
      label = 2; break;
    case 52:
      var $263=HEAP8[(5256760)];
      var $264=(($263)&(255));
      var $265=(($264)|(0))==72;
      if ($265) { label = 53; break; } else { label = 59; break; }
    case 53:
      var $267=$pos;
      var $268=(($267)&(255));
      var $269=((($268)+(1))|0);
      var $270=((5252568+$269)|0);
      var $271=HEAP8[($270)];
      HEAP8[(5256672)]=$271;
      var $272=HEAP8[(5256672)];
      var $273=(($272)&(255));
      var $274=(($273)|(0))==255;
      if ($274) { label = 54; break; } else { label = 55; break; }
    case 54:
      var $276=$pos;
      var $277=(($276)&(255));
      var $278=((5252568+$277)|0);
      HEAP8[($278)]=75;
      label = 58; break;
    case 55:
      var $280=HEAP8[(5256672)];
      var $281=(($280)&(255));
      var $282=((5255028+$281)|0);
      var $283=HEAP8[($282)];
      var $284=(($283)&(255));
      var $285=$284 & 32;
      var $286=(($285) & 255);
      HEAP8[(5256760)]=$286;
      var $287=HEAP8[(5256760)];
      var $288=(($287)&(255));
      var $289=(($288)|(0))==0;
      if ($289) { label = 56; break; } else { label = 57; break; }
    case 56:
      var $291=$pos;
      var $292=(($291)&(255));
      var $293=((5252568+$292)|0);
      HEAP8[($293)]=75;
      label = 57; break;
    case 57:
      label = 58; break;
    case 58:
      label = 67; break;
    case 59:
      var $297=HEAP8[(5256760)];
      var $298=(($297)&(255));
      var $299=(($298)|(0))==60;
      if ($299) { label = 60; break; } else { label = 66; break; }
    case 60:
      var $301=$pos;
      var $302=(($301)&(255));
      var $303=((($302)+(1))|0);
      var $304=((5252568+$303)|0);
      var $305=HEAP8[($304)];
      $index=$305;
      var $306=$index;
      var $307=(($306)&(255));
      var $308=(($307)|(0))==255;
      if ($308) { label = 61; break; } else { label = 62; break; }
    case 61:
      label = 65; break;
    case 62:
      var $311=$index;
      var $312=(($311)&(255));
      var $313=((5255028+$312)|0);
      var $314=HEAP8[($313)];
      var $315=(($314)&(255));
      var $316=$315 & 32;
      var $317=(($316)|(0))!=0;
      if ($317) { label = 63; break; } else { label = 64; break; }
    case 63:
      var $319=$pos;
      var $320=((($319)+(1))&255);
      $pos=$320;
      label = 2; break;
    case 64:
      label = 65; break;
    case 65:
      var $323=$pos;
      var $324=(($323)&(255));
      var $325=((5252568+$324)|0);
      HEAP8[($325)]=63;
      var $326=$pos;
      var $327=((($326)+(1))&255);
      $pos=$327;
      label = 2; break;
    case 66:
      label = 67; break;
    case 67:
      var $330=$pos;
      var $331=(($330)&(255));
      var $332=((5252568+$331)|0);
      var $333=HEAP8[($332)];
      HEAP8[(5256672)]=$333;
      var $334=HEAP8[(5256672)];
      var $335=(($334)&(255));
      var $336=((5255028+$335)|0);
      var $337=HEAP8[($336)];
      var $338=(($337)&(255));
      var $339=$338 & 1;
      var $340=(($339) & 255);
      HEAP8[(5256760)]=$340;
      var $341=HEAP8[(5256760)];
      var $342=(($341)&(255));
      var $343=(($342)|(0))==0;
      if ($343) { label = 68; break; } else { label = 69; break; }
    case 68:
      label = 72; break;
    case 69:
      var $346=$pos;
      var $347=(($346)&(255));
      var $348=((($347)-(1))|0);
      var $349=((5252568+$348)|0);
      var $350=HEAP8[($349)];
      HEAP8[(5256760)]=$350;
      var $351=HEAP8[(5256760)];
      var $352=(($351)&(255));
      var $353=(($352)|(0))!=32;
      if ($353) { label = 70; break; } else { label = 71; break; }
    case 70:
      var $355=HEAP8[(5256672)];
      HEAP8[(5256760)]=$355;
      label = 83; break;
    case 71:
      var $357=HEAP8[(5256672)];
      var $358=(($357)&(255));
      var $359=((($358)-(12))|0);
      var $360=(($359) & 255);
      var $361=$pos;
      var $362=(($361)&(255));
      var $363=((5252568+$362)|0);
      HEAP8[($363)]=$360;
      var $364=$pos;
      var $365=((($364)+(1))&255);
      $pos=$365;
      label = 2; break;
    case 72:
      var $367=HEAP8[(5256676)];
      var $368=(($367)&(255));
      var $369=((5252568+$368)|0);
      var $370=HEAP8[($369)];
      HEAP8[(5256760)]=$370;
      var $371=HEAP8[(5256760)];
      var $372=(($371)&(255));
      var $373=(($372)|(0))==53;
      if ($373) { label = 73; break; } else { label = 76; break; }
    case 73:
      var $375=HEAP8[(5256676)];
      var $376=(($375)&(255));
      var $377=((($376)-(1))|0);
      var $378=((5252568+$377)|0);
      var $379=HEAP8[($378)];
      HEAP8[(5256672)]=$379;
      var $380=HEAP8[(5256672)];
      var $381=(($380)&(255));
      var $382=((5254948+$381)|0);
      var $383=HEAP8[($382)];
      var $384=(($383)&(255));
      var $385=$384 & 4;
      var $386=(($385) & 255);
      HEAP8[(5256760)]=$386;
      var $387=HEAP8[(5256760)];
      var $388=(($387)&(255));
      var $389=(($388)|(0))==0;
      if ($389) { label = 74; break; } else { label = 75; break; }
    case 74:
      var $391=$pos;
      var $392=((($391)+(1))&255);
      $pos=$392;
      label = 2; break;
    case 75:
      var $394=HEAP8[(5256676)];
      var $395=(($394)&(255));
      var $396=((5252568+$395)|0);
      HEAP8[($396)]=16;
      var $397=$pos;
      var $398=((($397)+(1))&255);
      $pos=$398;
      label = 2; break;
    case 76:
      label = 77; break;
    case 77:
      var $401=HEAP8[(5256760)];
      var $402=(($401)&(255));
      var $403=(($402)|(0))==42;
      if ($403) { label = 78; break; } else { label = 79; break; }
    case 78:
      var $405=HEAP8[(5256676)];
      var $406=(($405)&(255));
      var $407=((($406)+(1))|0);
      var $408=(($407) & 255);
      var $409=HEAP8[(5256760)];
      var $410=(($409)&(255));
      var $411=((($410)+(1))|0);
      var $412=(($411) & 255);
      var $413=HEAP8[(5253648)];
      var $414=HEAP8[(5256676)];
      var $415=(($414)&(255));
      var $416=((5244080+$415)|0);
      var $417=HEAP8[($416)];
      _Insert($408, $412, $413, $417);
      var $418=$pos;
      var $419=((($418)+(1))&255);
      $pos=$419;
      label = 2; break;
    case 79:
      label = 80; break;
    case 80:
      var $422=HEAP8[(5256760)];
      var $423=(($422)&(255));
      var $424=(($423)|(0))==44;
      if ($424) { label = 81; break; } else { label = 82; break; }
    case 81:
      var $426=HEAP8[(5256676)];
      var $427=(($426)&(255));
      var $428=((($427)+(1))|0);
      var $429=(($428) & 255);
      var $430=HEAP8[(5256760)];
      var $431=(($430)&(255));
      var $432=((($431)+(1))|0);
      var $433=(($432) & 255);
      var $434=HEAP8[(5253648)];
      var $435=HEAP8[(5256676)];
      var $436=(($435)&(255));
      var $437=((5244080+$436)|0);
      var $438=HEAP8[($437)];
      _Insert($429, $433, $434, $438);
      var $439=$pos;
      var $440=((($439)+(1))&255);
      $pos=$440;
      label = 2; break;
    case 82:
      label = 83; break;
    case 83:
      var $443=HEAP8[(5256760)];
      var $444=(($443)&(255));
      var $445=(($444)|(0))!=69;
      if ($445) { label = 84; break; } else { label = 87; break; }
    case 84:
      var $447=HEAP8[(5256760)];
      var $448=(($447)&(255));
      var $449=(($448)|(0))!=57;
      if ($449) { label = 85; break; } else { label = 86; break; }
    case 85:
      var $451=$pos;
      var $452=((($451)+(1))&255);
      $pos=$452;
      label = 2; break;
    case 86:
      label = 87; break;
    case 87:
      var $455=HEAP8[(5256676)];
      var $456=(($455)&(255));
      var $457=((($456)-(1))|0);
      var $458=((5252568+$457)|0);
      var $459=HEAP8[($458)];
      var $460=(($459)&(255));
      var $461=((5255028+$460)|0);
      var $462=HEAP8[($461)];
      var $463=(($462)&(255));
      var $464=$463 & 128;
      var $465=(($464)|(0))==0;
      if ($465) { label = 88; break; } else { label = 89; break; }
    case 88:
      var $467=$pos;
      var $468=((($467)+(1))&255);
      $pos=$468;
      label = 2; break;
    case 89:
      var $470=HEAP8[(5256676)];
      var $471=((($470)+(1))&255);
      HEAP8[(5256676)]=$471;
      var $472=HEAP8[(5256676)];
      var $473=(($472)&(255));
      var $474=((5252568+$473)|0);
      var $475=HEAP8[($474)];
      HEAP8[(5256760)]=$475;
      var $476=HEAP8[(5256760)];
      var $477=(($476)&(255));
      var $478=(($477)|(0))!=0;
      if ($478) { label = 90; break; } else { label = 96; break; }
    case 90:
      var $480=HEAP8[(5256760)];
      var $481=(($480)&(255));
      var $482=((5255028+$481)|0);
      var $483=HEAP8[($482)];
      var $484=(($483)&(255));
      var $485=$484 & 128;
      var $486=(($485)|(0))==0;
      if ($486) { label = 91; break; } else { label = 92; break; }
    case 91:
      var $488=$pos;
      var $489=((($488)+(1))&255);
      $pos=$489;
      label = 2; break;
    case 92:
      var $491=HEAP8[(5256676)];
      var $492=(($491)&(255));
      var $493=((5244080+$492)|0);
      var $494=HEAP8[($493)];
      var $495=(($494)&(255));
      var $496=(($495)|(0))!=0;
      if ($496) { label = 93; break; } else { label = 94; break; }
    case 93:
      var $498=$pos;
      var $499=((($498)+(1))&255);
      $pos=$499;
      label = 2; break;
    case 94:
      label = 95; break;
    case 95:
      var $502=$pos;
      var $503=(($502)&(255));
      var $504=((5252568+$503)|0);
      HEAP8[($504)]=30;
      label = 102; break;
    case 96:
      var $506=HEAP8[(5256676)];
      var $507=(($506)&(255));
      var $508=((($507)+(1))|0);
      var $509=((5252568+$508)|0);
      var $510=HEAP8[($509)];
      HEAP8[(5256760)]=$510;
      var $511=HEAP8[(5256760)];
      var $512=(($511)&(255));
      var $513=(($512)|(0))==255;
      if ($513) { label = 97; break; } else { label = 98; break; }
    case 97:
      HEAP8[(5256760)]=0;
      label = 99; break;
    case 98:
      var $516=HEAP8[(5256760)];
      var $517=(($516)&(255));
      var $518=((5255028+$517)|0);
      var $519=HEAP8[($518)];
      var $520=(($519)&(255));
      var $521=$520 & 128;
      var $522=(($521) & 255);
      HEAP8[(5256760)]=$522;
      label = 99; break;
    case 99:
      var $524=HEAP8[(5256760)];
      var $525=(($524)&(255));
      var $526=(($525)|(0))!=0;
      if ($526) { label = 100; break; } else { label = 101; break; }
    case 100:
      var $528=$pos;
      var $529=(($528)&(255));
      var $530=((5252568+$529)|0);
      HEAP8[($530)]=30;
      label = 101; break;
    case 101:
      label = 102; break;
    case 102:
      var $533=$pos;
      var $534=((($533)+(1))&255);
      $pos=$534;
      label = 2; break;
    default: assert(0, "bad label: " + label);
  }
}
function _Code48619() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $index;
      var $mem66;
      HEAP8[(5256676)]=0;
      $mem66=0;
      label = 2; break;
    case 2:
      var $2=HEAP8[(5256676)];
      var $3=(($2)&(255));
      var $4=((5252568+$3)|0);
      var $5=HEAP8[($4)];
      $index=$5;
      var $6=$index;
      var $7=(($6)&(255));
      var $8=(($7)|(0))==255;
      if ($8) { label = 3; break; } else { label = 4; break; }
    case 3:
      label = 22; break;
    case 4:
      var $11=$index;
      var $12=(($11)&(255));
      var $13=((5254948+$12)|0);
      var $14=HEAP8[($13)];
      var $15=(($14)&(255));
      var $16=$15 & 1;
      var $17=(($16)|(0))==0;
      if ($17) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $19=HEAP8[(5256676)];
      var $20=((($19)+(1))&255);
      HEAP8[(5256676)]=$20;
      label = 2; break;
    case 6:
      var $22=HEAP8[(5256676)];
      $mem66=$22;
      label = 7; break;
    case 7:
      var $24=HEAP8[(5256676)];
      var $25=((($24)-(1))&255);
      HEAP8[(5256676)]=$25;
      var $26=HEAP8[(5256676)];
      var $27=(($26)&(255));
      var $28=(($27)|(0))==0;
      if ($28) { label = 8; break; } else { label = 9; break; }
    case 8:
      label = 22; break;
    case 9:
      var $31=HEAP8[(5256676)];
      var $32=(($31)&(255));
      var $33=((5252568+$32)|0);
      var $34=HEAP8[($33)];
      $index=$34;
      var $35=$index;
      var $36=(($35)&(255));
      var $37=(($36)|(0))!=255;
      if ($37) { label = 10; break; } else { label = 13; break; }
    case 10:
      var $39=$index;
      var $40=(($39)&(255));
      var $41=((5255028+$40)|0);
      var $42=HEAP8[($41)];
      var $43=(($42)&(255));
      var $44=$43 & 128;
      var $45=(($44)|(0))==0;
      if ($45) { label = 11; break; } else { label = 12; break; }
    case 11:
      label = 7; break;
    case 12:
      label = 13; break;
    case 13:
      label = 14; break;
    case 14:
      var $50=HEAP8[(5256676)];
      var $51=(($50)&(255));
      var $52=((5252568+$51)|0);
      var $53=HEAP8[($52)];
      $index=$53;
      var $54=$index;
      var $55=(($54)&(255));
      var $56=(($55)|(0))!=255;
      if ($56) { label = 15; break; } else { label = 19; break; }
    case 15:
      var $58=$index;
      var $59=(($58)&(255));
      var $60=((5254948+$59)|0);
      var $61=HEAP8[($60)];
      var $62=(($61)&(255));
      var $63=$62 & 32;
      var $64=(($63)|(0))==0;
      if ($64) { label = 17; break; } else { label = 16; break; }
    case 16:
      var $66=$index;
      var $67=(($66)&(255));
      var $68=((5255028+$67)|0);
      var $69=HEAP8[($68)];
      var $70=(($69)&(255));
      var $71=$70 & 4;
      var $72=(($71)|(0))!=0;
      if ($72) { label = 17; break; } else { label = 18; break; }
    case 17:
      var $74=HEAP8[(5256676)];
      var $75=(($74)&(255));
      var $76=((5253044+$75)|0);
      var $77=HEAP8[($76)];
      HEAP8[(5256760)]=$77;
      var $78=HEAP8[(5256760)];
      var $79=(($78)&(255));
      var $80=$79 >> 1;
      var $81=HEAP8[(5256760)];
      var $82=(($81)&(255));
      var $83=((($80)+($82))|0);
      var $84=((($83)+(1))|0);
      var $85=(($84) & 255);
      HEAP8[(5256760)]=$85;
      var $86=HEAP8[(5256760)];
      var $87=HEAP8[(5256676)];
      var $88=(($87)&(255));
      var $89=((5253044+$88)|0);
      HEAP8[($89)]=$86;
      label = 18; break;
    case 18:
      label = 19; break;
    case 19:
      var $92=HEAP8[(5256676)];
      var $93=((($92)+(1))&255);
      HEAP8[(5256676)]=$93;
      label = 20; break;
    case 20:
      var $95=HEAP8[(5256676)];
      var $96=(($95)&(255));
      var $97=$mem66;
      var $98=(($97)&(255));
      var $99=(($96)|(0))!=(($98)|(0));
      if ($99) { label = 14; break; } else { label = 21; break; }
    case 21:
      var $101=HEAP8[(5256676)];
      var $102=((($101)+(1))&255);
      HEAP8[(5256676)]=$102;
      label = 2; break;
    case 22:
      $mem66=0;
      label = 23; break;
    case 23:
      var $105=$mem66;
      HEAP8[(5256676)]=$105;
      var $106=HEAP8[(5256676)];
      var $107=(($106)&(255));
      var $108=((5252568+$107)|0);
      var $109=HEAP8[($108)];
      $index=$109;
      var $110=$index;
      var $111=(($110)&(255));
      var $112=(($111)|(0))==255;
      if ($112) { label = 24; break; } else { label = 25; break; }
    case 24:
      return;
    case 25:
      var $115=$index;
      var $116=(($115)&(255));
      var $117=((5255028+$116)|0);
      var $118=HEAP8[($117)];
      var $119=(($118)&(255));
      var $120=$119 & 128;
      var $121=(($120) & 255);
      HEAP8[(5256760)]=$121;
      var $122=HEAP8[(5256760)];
      var $123=(($122)&(255));
      var $124=(($123)|(0))!=0;
      if ($124) { label = 26; break; } else { label = 41; break; }
    case 26:
      var $126=HEAP8[(5256676)];
      var $127=((($126)+(1))&255);
      HEAP8[(5256676)]=$127;
      var $128=HEAP8[(5256676)];
      var $129=(($128)&(255));
      var $130=((5252568+$129)|0);
      var $131=HEAP8[($130)];
      $index=$131;
      var $132=$index;
      var $133=(($132)&(255));
      var $134=(($133)|(0))==255;
      if ($134) { label = 27; break; } else { label = 28; break; }
    case 27:
      HEAP8[(5253652)]=65;
      label = 29; break;
    case 28:
      var $137=$index;
      var $138=(($137)&(255));
      var $139=((5255028+$138)|0);
      var $140=HEAP8[($139)];
      HEAP8[(5253652)]=$140;
      label = 29; break;
    case 29:
      var $142=$index;
      var $143=(($142)&(255));
      var $144=((5255028+$143)|0);
      var $145=HEAP8[($144)];
      var $146=(($145)&(255));
      var $147=$146 & 64;
      var $148=(($147)|(0))==0;
      if ($148) { label = 30; break; } else { label = 36; break; }
    case 30:
      var $150=$index;
      var $151=(($150)&(255));
      var $152=(($151)|(0))==18;
      if ($152) { label = 32; break; } else { label = 31; break; }
    case 31:
      var $154=$index;
      var $155=(($154)&(255));
      var $156=(($155)|(0))==19;
      if ($156) { label = 32; break; } else { label = 35; break; }
    case 32:
      var $158=HEAP8[(5256676)];
      var $159=((($158)+(1))&255);
      HEAP8[(5256676)]=$159;
      var $160=HEAP8[(5256676)];
      var $161=(($160)&(255));
      var $162=((5252568+$161)|0);
      var $163=HEAP8[($162)];
      $index=$163;
      var $164=$index;
      var $165=(($164)&(255));
      var $166=((5255028+$165)|0);
      var $167=HEAP8[($166)];
      var $168=(($167)&(255));
      var $169=$168 & 64;
      var $170=(($169)|(0))!=0;
      if ($170) { label = 33; break; } else { label = 34; break; }
    case 33:
      var $172=$mem66;
      var $173=(($172)&(255));
      var $174=((5253044+$173)|0);
      var $175=HEAP8[($174)];
      var $176=((($175)-(1))&255);
      HEAP8[($174)]=$176;
      label = 34; break;
    case 34:
      var $178=$mem66;
      var $179=((($178)+(1))&255);
      $mem66=$179;
      label = 23; break;
    case 35:
      var $181=$mem66;
      var $182=((($181)+(1))&255);
      $mem66=$182;
      label = 23; break;
    case 36:
      var $184=HEAP8[(5253652)];
      var $185=(($184)&(255));
      var $186=$185 & 4;
      var $187=(($186)|(0))==0;
      if ($187) { label = 37; break; } else { label = 40; break; }
    case 37:
      var $189=HEAP8[(5253652)];
      var $190=(($189)&(255));
      var $191=$190 & 1;
      var $192=(($191)|(0))==0;
      if ($192) { label = 38; break; } else { label = 39; break; }
    case 38:
      var $194=$mem66;
      var $195=((($194)+(1))&255);
      $mem66=$195;
      label = 23; break;
    case 39:
      var $197=HEAP8[(5256676)];
      var $198=((($197)-(1))&255);
      HEAP8[(5256676)]=$198;
      var $199=HEAP8[(5256676)];
      var $200=(($199)&(255));
      var $201=((5253044+$200)|0);
      var $202=HEAP8[($201)];
      var $203=(($202)&(255));
      var $204=$203 >> 3;
      var $205=(($204) & 255);
      HEAP8[(5253652)]=$205;
      var $206=HEAP8[(5253652)];
      var $207=(($206)&(255));
      var $208=HEAP8[(5256676)];
      var $209=(($208)&(255));
      var $210=((5253044+$209)|0);
      var $211=HEAP8[($210)];
      var $212=(($211)&(255));
      var $213=((($212)-($207))|0);
      var $214=(($213) & 255);
      HEAP8[($210)]=$214;
      var $215=$mem66;
      var $216=((($215)+(1))&255);
      $mem66=$216;
      label = 23; break;
    case 40:
      var $218=HEAP8[(5256676)];
      var $219=(($218)&(255));
      var $220=((($219)-(1))|0);
      var $221=((5253044+$220)|0);
      var $222=HEAP8[($221)];
      HEAP8[(5256760)]=$222;
      var $223=HEAP8[(5256760)];
      var $224=(($223)&(255));
      var $225=$224 >> 2;
      var $226=HEAP8[(5256760)];
      var $227=(($226)&(255));
      var $228=((($225)+($227))|0);
      var $229=((($228)+(1))|0);
      var $230=(($229) & 255);
      var $231=HEAP8[(5256676)];
      var $232=(($231)&(255));
      var $233=((($232)-(1))|0);
      var $234=((5253044+$233)|0);
      HEAP8[($234)]=$230;
      var $235=$mem66;
      var $236=((($235)+(1))&255);
      $mem66=$236;
      label = 23; break;
    case 41:
      var $238=$index;
      var $239=(($238)&(255));
      var $240=((5254948+$239)|0);
      var $241=HEAP8[($240)];
      var $242=(($241)&(255));
      var $243=$242 & 8;
      var $244=(($243)|(0))!=0;
      if ($244) { label = 42; break; } else { label = 48; break; }
    case 42:
      var $246=HEAP8[(5256676)];
      var $247=((($246)+(1))&255);
      HEAP8[(5256676)]=$247;
      var $248=HEAP8[(5256676)];
      var $249=(($248)&(255));
      var $250=((5252568+$249)|0);
      var $251=HEAP8[($250)];
      $index=$251;
      var $252=$index;
      var $253=(($252)&(255));
      var $254=(($253)|(0))==255;
      if ($254) { label = 43; break; } else { label = 44; break; }
    case 43:
      HEAP8[(5256760)]=0;
      label = 45; break;
    case 44:
      var $257=$index;
      var $258=(($257)&(255));
      var $259=((5255028+$258)|0);
      var $260=HEAP8[($259)];
      var $261=(($260)&(255));
      var $262=$261 & 2;
      var $263=(($262) & 255);
      HEAP8[(5256760)]=$263;
      label = 45; break;
    case 45:
      var $265=HEAP8[(5256760)];
      var $266=(($265)&(255));
      var $267=(($266)|(0))!=0;
      if ($267) { label = 46; break; } else { label = 47; break; }
    case 46:
      var $269=HEAP8[(5256676)];
      var $270=(($269)&(255));
      var $271=((5253044+$270)|0);
      HEAP8[($271)]=6;
      var $272=HEAP8[(5256676)];
      var $273=(($272)&(255));
      var $274=((($273)-(1))|0);
      var $275=((5253044+$274)|0);
      HEAP8[($275)]=5;
      label = 47; break;
    case 47:
      var $277=$mem66;
      var $278=((($277)+(1))&255);
      $mem66=$278;
      label = 23; break;
    case 48:
      var $280=$index;
      var $281=(($280)&(255));
      var $282=((5255028+$281)|0);
      var $283=HEAP8[($282)];
      var $284=(($283)&(255));
      var $285=$284 & 2;
      var $286=(($285)|(0))!=0;
      if ($286) { label = 49; break; } else { label = 58; break; }
    case 49:
      label = 50; break;
    case 50:
      var $289=HEAP8[(5256676)];
      var $290=((($289)+(1))&255);
      HEAP8[(5256676)]=$290;
      var $291=HEAP8[(5256676)];
      var $292=(($291)&(255));
      var $293=((5252568+$292)|0);
      var $294=HEAP8[($293)];
      $index=$294;
      label = 51; break;
    case 51:
      var $296=$index;
      var $297=(($296)&(255));
      var $298=(($297)|(0))==0;
      if ($298) { label = 50; break; } else { label = 52; break; }
    case 52:
      var $300=$index;
      var $301=(($300)&(255));
      var $302=(($301)|(0))==255;
      if ($302) { label = 53; break; } else { label = 54; break; }
    case 53:
      var $304=$mem66;
      var $305=((($304)+(1))&255);
      $mem66=$305;
      label = 23; break;
    case 54:
      var $307=$index;
      var $308=(($307)&(255));
      var $309=((5255028+$308)|0);
      var $310=HEAP8[($309)];
      var $311=(($310)&(255));
      var $312=$311 & 2;
      var $313=(($312)|(0))==0;
      if ($313) { label = 55; break; } else { label = 56; break; }
    case 55:
      var $315=$mem66;
      var $316=((($315)+(1))&255);
      $mem66=$316;
      label = 23; break;
    case 56:
      label = 57; break;
    case 57:
      var $319=HEAP8[(5256676)];
      var $320=(($319)&(255));
      var $321=((5253044+$320)|0);
      var $322=HEAP8[($321)];
      var $323=(($322)&(255));
      var $324=$323 >> 1;
      var $325=((($324)+(1))|0);
      var $326=(($325) & 255);
      var $327=HEAP8[(5256676)];
      var $328=(($327)&(255));
      var $329=((5253044+$328)|0);
      HEAP8[($329)]=$326;
      var $330=$mem66;
      HEAP8[(5256676)]=$330;
      var $331=$mem66;
      var $332=(($331)&(255));
      var $333=((5253044+$332)|0);
      var $334=HEAP8[($333)];
      var $335=(($334)&(255));
      var $336=$335 >> 1;
      var $337=((($336)+(1))|0);
      var $338=(($337) & 255);
      var $339=$mem66;
      var $340=(($339)&(255));
      var $341=((5253044+$340)|0);
      HEAP8[($341)]=$338;
      var $342=$mem66;
      var $343=((($342)+(1))&255);
      $mem66=$343;
      label = 23; break;
    case 58:
      var $345=$index;
      var $346=(($345)&(255));
      var $347=((5254948+$346)|0);
      var $348=HEAP8[($347)];
      var $349=(($348)&(255));
      var $350=$349 & 16;
      var $351=(($350)|(0))!=0;
      if ($351) { label = 59; break; } else { label = 62; break; }
    case 59:
      var $353=HEAP8[(5256676)];
      var $354=(($353)&(255));
      var $355=((($354)-(1))|0);
      var $356=((5252568+$355)|0);
      var $357=HEAP8[($356)];
      $index=$357;
      var $358=$index;
      var $359=(($358)&(255));
      var $360=((5255028+$359)|0);
      var $361=HEAP8[($360)];
      var $362=(($361)&(255));
      var $363=$362 & 2;
      var $364=(($363)|(0))!=0;
      if ($364) { label = 60; break; } else { label = 61; break; }
    case 60:
      var $366=HEAP8[(5256676)];
      var $367=(($366)&(255));
      var $368=((5253044+$367)|0);
      var $369=HEAP8[($368)];
      var $370=(($369)&(255));
      var $371=((($370)-(2))|0);
      var $372=(($371) & 255);
      HEAP8[($368)]=$372;
      label = 61; break;
    case 61:
      label = 62; break;
    case 62:
      var $375=$mem66;
      var $376=((($375)+(1))&255);
      $mem66=$376;
      label = 23; break;
    default: assert(0, "bad label: " + label);
  }
}
function _Code48227($mem66) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $k;
      var $tempA;
      var $address;
      var $i;
      var $phase1;
      $1=$mem66;
      var $2=HEAP8[(5256672)];
      HEAP8[(5253668)]=$2;
      var $3=HEAP8[(5253680)];
      var $4=(($3)&(255));
      var $5=$4 & 7;
      var $6=(($5) & 255);
      HEAP8[(5256760)]=$6;
      var $7=HEAP8[(5256760)];
      var $8=(($7)&(255));
      var $9=((($8)-(1))|0);
      var $10=(($9) & 255);
      HEAP8[(5256676)]=$10;
      var $11=HEAP8[(5256676)];
      HEAP8[(5253652)]=$11;
      var $12=HEAP8[(5256676)];
      var $13=(($12)&(255));
      var $14=((5242992+$13)|0);
      var $15=HEAP8[($14)];
      HEAP8[(5253656)]=$15;
      var $16=HEAP8[(5256676)];
      HEAP8[(5253672)]=$16;
      var $17=HEAP8[(5253680)];
      var $18=(($17)&(255));
      var $19=$18 & 248;
      var $20=(($19) & 255);
      HEAP8[(5256760)]=$20;
      var $21=HEAP8[(5256760)];
      var $22=(($21)&(255));
      var $23=(($22)|(0))==0;
      if ($23) { label = 2; break; } else { label = 3; break; }
    case 2:
      var $25=HEAP8[(5253668)];
      HEAP8[(5256672)]=$25;
      var $26=HEAP8[(5253668)];
      var $27=(($26)&(255));
      var $28=((5252308+$27)|0);
      var $29=HEAP8[($28)];
      var $30=(($29)&(255));
      var $31=$30 >> 4;
      var $32=(($31) & 255);
      HEAP8[(5256760)]=$32;
      label = 27; break;
    case 3:
      var $34=HEAP8[(5256760)];
      var $35=(($34)&(255));
      var $36=$35 ^ 255;
      var $37=(($36) & 255);
      HEAP8[(5256672)]=$37;
      label = 4; break;
    case 4:
      HEAP8[(5253652)]=8;
      var $39=HEAP8[(5253672)];
      var $40=(($39)&(255));
      var $41=($40<<8);
      var $42=HEAP8[(5256672)];
      var $43=(($42)&(255));
      var $44=((($41)+($43))|0);
      var $45=((5251028+$44)|0);
      var $46=HEAP8[($45)];
      HEAP8[(5256760)]=$46;
      label = 5; break;
    case 5:
      var $48=HEAP8[(5256760)];
      var $49=(($48)&(255));
      $tempA=$49;
      var $50=HEAP8[(5256760)];
      var $51=(($50)&(255));
      var $52=$51 << 1;
      var $53=(($52) & 255);
      HEAP8[(5256760)]=$53;
      var $54=$tempA;
      var $55=$54 & 128;
      var $56=(($55)|(0))==0;
      if ($56) { label = 6; break; } else { label = 13; break; }
    case 6:
      var $58=HEAP8[(5253656)];
      HEAP8[(5256676)]=$58;
      var $59=HEAP32[((5253360)>>2)];
      var $60=((5242888+((($59)*(20))&-1))|0);
      var $61=(($60+4)|0);
      var $62=HEAP32[(($61)>>2)];
      var $63=HEAP32[((5255112)>>2)];
      var $64=((($63)+($62))|0);
      HEAP32[((5255112)>>2)]=$64;
      HEAP32[((5253360)>>2)]=1;
      $k=0;
      label = 7; break;
    case 7:
      var $66=$k;
      var $67=(($66)|(0)) < 5;
      if ($67) { label = 8; break; } else { label = 10; break; }
    case 8:
      var $69=HEAP8[(5256676)];
      var $70=(($69)&(255));
      var $71=$70 & 15;
      var $72=($71<<4);
      var $73=(($72) & 255);
      var $74=HEAP32[((5255112)>>2)];
      var $75=HEAP32[((5244768)>>2)];
      var $76=((((($74)|(0)))/((($75)|(0))))&-1);
      var $77=$k;
      var $78=((($76)+($77))|0);
      var $79=HEAP32[((5255116)>>2)];
      var $80=(($79+$78)|0);
      HEAP8[($80)]=$73;
      label = 9; break;
    case 9:
      var $82=$k;
      var $83=((($82)+(1))|0);
      $k=$83;
      label = 7; break;
    case 10:
      var $85=HEAP8[(5256676)];
      var $86=(($85)&(255));
      var $87=(($86)|(0))!=0;
      if ($87) { label = 11; break; } else { label = 12; break; }
    case 11:
      label = 18; break;
    case 12:
      label = 13; break;
    case 13:
      var $91=HEAP32[((5253360)>>2)];
      var $92=((5242888+((($91)*(20))&-1))|0);
      var $93=(($92+8)|0);
      var $94=HEAP32[(($93)>>2)];
      var $95=HEAP32[((5255112)>>2)];
      var $96=((($95)+($94))|0);
      HEAP32[((5255112)>>2)]=$96;
      HEAP32[((5253360)>>2)]=2;
      $k=0;
      label = 14; break;
    case 14:
      var $98=$k;
      var $99=(($98)|(0)) < 5;
      if ($99) { label = 15; break; } else { label = 17; break; }
    case 15:
      var $101=HEAP32[((5255112)>>2)];
      var $102=HEAP32[((5244768)>>2)];
      var $103=((((($101)|(0)))/((($102)|(0))))&-1);
      var $104=$k;
      var $105=((($103)+($104))|0);
      var $106=HEAP32[((5255116)>>2)];
      var $107=(($106+$105)|0);
      HEAP8[($107)]=80;
      label = 16; break;
    case 16:
      var $109=$k;
      var $110=((($109)+(1))|0);
      $k=$110;
      label = 14; break;
    case 17:
      label = 18; break;
    case 18:
      $i=0;
      label = 19; break;
    case 19:
      var $114=$i;
      var $115=HEAP8[(5242884)];
      var $116=(($115)&(255));
      var $117=(($114)|(0)) < (($116)|(0));
      if ($117) { label = 20; break; } else { label = 22; break; }
    case 20:
      HEAP8[(5256676)]=0;
      label = 21; break;
    case 21:
      var $120=$i;
      var $121=((($120)+(1))|0);
      $i=$121;
      label = 19; break;
    case 22:
      var $123=HEAP8[(5253652)];
      var $124=((($123)-(1))&255);
      HEAP8[(5253652)]=$124;
      var $125=HEAP8[(5253652)];
      var $126=(($125)&(255));
      var $127=(($126)|(0))!=0;
      if ($127) { label = 23; break; } else { label = 24; break; }
    case 23:
      label = 5; break;
    case 24:
      var $130=HEAP8[(5256672)];
      var $131=((($130)+(1))&255);
      HEAP8[(5256672)]=$131;
      var $132=HEAP8[(5256672)];
      var $133=(($132)&(255));
      var $134=(($133)|(0))!=0;
      if ($134) { label = 25; break; } else { label = 26; break; }
    case 25:
      label = 4; break;
    case 26:
      HEAP8[(5253676)]=1;
      var $137=HEAP8[(5253668)];
      HEAP8[(5256672)]=$137;
      label = 49; break;
    case 27:
      var $139=HEAP8[(5256760)];
      var $140=(($139)&(255));
      var $141=$140 ^ 255;
      var $142=(($141) & 255);
      $phase1=$142;
      var $143=$1;
      var $144=HEAP8[($143)];
      HEAP8[(5256672)]=$144;
      label = 28; break;
    case 28:
      HEAP8[(5253652)]=8;
      var $146=HEAP8[(5253672)];
      var $147=(($146)&(255));
      var $148=($147<<8);
      var $149=HEAP8[(5256672)];
      var $150=(($149)&(255));
      var $151=((($148)+($150))|0);
      var $152=((5251028+$151)|0);
      var $153=HEAP8[($152)];
      HEAP8[(5256760)]=$153;
      label = 29; break;
    case 29:
      var $155=HEAP8[(5256760)];
      var $156=(($155)&(255));
      $tempA=$156;
      var $157=HEAP8[(5256760)];
      var $158=(($157)&(255));
      var $159=$158 << 1;
      var $160=(($159) & 255);
      HEAP8[(5256760)]=$160;
      var $161=$tempA;
      var $162=$161 & 128;
      var $163=(($162)|(0))!=0;
      if ($163) { label = 30; break; } else { label = 35; break; }
    case 30:
      HEAP8[(5256676)]=26;
      var $165=HEAP32[((5253360)>>2)];
      var $166=((5242888+((($165)*(20))&-1))|0);
      var $167=(($166+12)|0);
      var $168=HEAP32[(($167)>>2)];
      var $169=HEAP32[((5255112)>>2)];
      var $170=((($169)+($168))|0);
      HEAP32[((5255112)>>2)]=$170;
      HEAP32[((5253360)>>2)]=3;
      $k=0;
      label = 31; break;
    case 31:
      var $172=$k;
      var $173=(($172)|(0)) < 5;
      if ($173) { label = 32; break; } else { label = 34; break; }
    case 32:
      var $175=HEAP8[(5256676)];
      var $176=(($175)&(255));
      var $177=$176 & 15;
      var $178=($177<<4);
      var $179=(($178) & 255);
      var $180=HEAP32[((5255112)>>2)];
      var $181=HEAP32[((5244768)>>2)];
      var $182=((((($180)|(0)))/((($181)|(0))))&-1);
      var $183=$k;
      var $184=((($182)+($183))|0);
      var $185=HEAP32[((5255116)>>2)];
      var $186=(($185+$184)|0);
      HEAP8[($186)]=$179;
      label = 33; break;
    case 33:
      var $188=$k;
      var $189=((($188)+(1))|0);
      $k=$189;
      label = 31; break;
    case 34:
      label = 40; break;
    case 35:
      HEAP8[(5256676)]=6;
      var $192=HEAP32[((5253360)>>2)];
      var $193=((5242888+((($192)*(20))&-1))|0);
      var $194=(($193+16)|0);
      var $195=HEAP32[(($194)>>2)];
      var $196=HEAP32[((5255112)>>2)];
      var $197=((($196)+($195))|0);
      HEAP32[((5255112)>>2)]=$197;
      HEAP32[((5253360)>>2)]=4;
      $k=0;
      label = 36; break;
    case 36:
      var $199=$k;
      var $200=(($199)|(0)) < 5;
      if ($200) { label = 37; break; } else { label = 39; break; }
    case 37:
      var $202=HEAP8[(5256676)];
      var $203=(($202)&(255));
      var $204=$203 & 15;
      var $205=($204<<4);
      var $206=(($205) & 255);
      var $207=HEAP32[((5255112)>>2)];
      var $208=HEAP32[((5244768)>>2)];
      var $209=((((($207)|(0)))/((($208)|(0))))&-1);
      var $210=$k;
      var $211=((($209)+($210))|0);
      var $212=HEAP32[((5255116)>>2)];
      var $213=(($212+$211)|0);
      HEAP8[($213)]=$206;
      label = 38; break;
    case 38:
      var $215=$k;
      var $216=((($215)+(1))|0);
      $k=$216;
      label = 36; break;
    case 39:
      label = 40; break;
    case 40:
      var $219=HEAP8[(5242880)];
      HEAP8[(5256676)]=$219;
      label = 41; break;
    case 41:
      var $221=HEAP8[(5256676)];
      var $222=(($221)&(255));
      var $223=(($222)|(0)) > 0;
      if ($223) { label = 42; break; } else { label = 44; break; }
    case 42:
      label = 43; break;
    case 43:
      var $226=HEAP8[(5256676)];
      var $227=((($226)-(1))&255);
      HEAP8[(5256676)]=$227;
      label = 41; break;
    case 44:
      var $229=HEAP8[(5253652)];
      var $230=((($229)-(1))&255);
      HEAP8[(5253652)]=$230;
      label = 45; break;
    case 45:
      var $232=HEAP8[(5253652)];
      var $233=(($232)&(255));
      var $234=(($233)|(0))!=0;
      if ($234) { label = 29; break; } else { label = 46; break; }
    case 46:
      var $236=HEAP8[(5256672)];
      var $237=((($236)+(1))&255);
      HEAP8[(5256672)]=$237;
      var $238=$phase1;
      var $239=((($238)+(1))&255);
      $phase1=$239;
      label = 47; break;
    case 47:
      var $241=$phase1;
      var $242=(($241)&(255));
      var $243=(($242)|(0))!=0;
      if ($243) { label = 28; break; } else { label = 48; break; }
    case 48:
      HEAP8[(5256760)]=1;
      HEAP8[(5253676)]=1;
      var $245=HEAP8[(5256672)];
      var $246=$1;
      HEAP8[($246)]=$245;
      var $247=HEAP8[(5253668)];
      HEAP8[(5256672)]=$247;
      label = 49; break;
    case 49:
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _Special1($mem48, $phase1) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $Atemp;
      $1=$mem48;
      $2=$phase1;
      label = 2; break;
    case 2:
      var $4=HEAP8[(5256676)];
      HEAP8[(5253668)]=$4;
      var $5=HEAP8[(5256676)];
      HEAP8[(5256760)]=$5;
      var $6=HEAP8[(5256760)];
      var $7=(($6)&(255));
      $Atemp=$7;
      var $8=HEAP8[(5256760)];
      var $9=(($8)&(255));
      var $10=((($9)-(30))|0);
      var $11=(($10) & 255);
      HEAP8[(5256760)]=$11;
      var $12=$Atemp;
      var $13=(($12)|(0)) <= 30;
      if ($13) { label = 3; break; } else { label = 4; break; }
    case 3:
      HEAP8[(5256760)]=0;
      label = 4; break;
    case 4:
      var $16=HEAP8[(5256760)];
      HEAP8[(5256676)]=$16;
      label = 5; break;
    case 5:
      var $18=HEAP8[(5256676)];
      var $19=(($18)&(255));
      var $20=((5252308+$19)|0);
      var $21=HEAP8[($20)];
      HEAP8[(5256760)]=$21;
      var $22=(($21)&(255));
      var $23=(($22)|(0))==127;
      if ($23) { label = 6; break; } else { label = 7; break; }
    case 6:
      var $25=HEAP8[(5256676)];
      var $26=((($25)+(1))&255);
      HEAP8[(5256676)]=$26;
      label = 5; break;
    case 7:
      label = 8; break;
    case 8:
      var $29=$1;
      var $30=(($29)&(255));
      var $31=HEAP8[(5256760)];
      var $32=(($31)&(255));
      var $33=((($32)+($30))|0);
      var $34=(($33) & 255);
      HEAP8[(5256760)]=$34;
      var $35=HEAP8[(5256760)];
      $2=$35;
      var $36=HEAP8[(5256760)];
      var $37=HEAP8[(5256676)];
      var $38=(($37)&(255));
      var $39=((5252308+$38)|0);
      HEAP8[($39)]=$36;
      label = 9; break;
    case 9:
      var $41=HEAP8[(5256676)];
      var $42=((($41)+(1))&255);
      HEAP8[(5256676)]=$42;
      var $43=HEAP8[(5256676)];
      var $44=(($43)&(255));
      var $45=HEAP8[(5253668)];
      var $46=(($45)&(255));
      var $47=(($44)|(0))==(($46)|(0));
      if ($47) { label = 10; break; } else { label = 11; break; }
    case 10:
      return;
    case 11:
      var $50=HEAP8[(5256676)];
      var $51=(($50)&(255));
      var $52=((5252308+$51)|0);
      var $53=HEAP8[($52)];
      var $54=(($53)&(255));
      var $55=(($54)|(0))==255;
      if ($55) { label = 12; break; } else { label = 13; break; }
    case 12:
      label = 9; break;
    case 13:
      var $58=$2;
      HEAP8[(5256760)]=$58;
      label = 8; break;
    default: assert(0, "bad label: " + label);
  }
}
function _Code47574() {
  var label = 0;
  var __stackBase__  = STACKTOP; STACKTOP = (STACKTOP + 4)|0; assert(!(STACKTOP&3)); assert((STACKTOP|0) < (STACK_MAX|0));
  label = 1;
  while(1) switch(label) {
    case 1:
      var $k;
      var $phase1;
      var $phase2;
      var $phase3;
      var $mem66=__stackBase__;
      var $mem38;
      var $mem40;
      var $speedcounter;
      var $mem48;
      var $i;
      var $carry;
      var $address;
      var $mem36;
      var $mem37;
      var $tempA;
      var $1=HEAP8[((((5253300)|0))|0)];
      var $2=(($1)&(255));
      var $3=(($2)|(0))==255;
      if ($3) { label = 2; break; } else { label = 3; break; }
    case 2:
      label = 77; break;
    case 3:
      HEAP8[(5256760)]=0;
      HEAP8[(5256676)]=0;
      HEAP8[(5253676)]=0;
      label = 4; break;
    case 4:
      var $7=HEAP8[(5253676)];
      HEAP8[(5256672)]=$7;
      var $8=HEAP8[(5253676)];
      var $9=(($8)&(255));
      var $10=((5253300+$9)|0);
      var $11=HEAP8[($10)];
      HEAP8[(5256760)]=$11;
      var $12=HEAP8[(5256760)];
      HEAP8[(5253652)]=$12;
      var $13=HEAP8[(5256760)];
      var $14=(($13)&(255));
      var $15=(($14)|(0))==255;
      if ($15) { label = 5; break; } else { label = 6; break; }
    case 5:
      label = 16; break;
    case 6:
      var $18=HEAP8[(5256760)];
      var $19=(($18)&(255));
      var $20=(($19)|(0))==1;
      if ($20) { label = 7; break; } else { label = 8; break; }
    case 7:
      HEAP8[(5256760)]=1;
      $mem48=1;
      var $22=$mem48;
      var $23=$phase1;
      _Special1($22, $23);
      label = 8; break;
    case 8:
      var $25=HEAP8[(5256760)];
      var $26=(($25)&(255));
      var $27=(($26)|(0))==2;
      if ($27) { label = 9; break; } else { label = 10; break; }
    case 9:
      $mem48=-1;
      var $29=$mem48;
      var $30=$phase1;
      _Special1($29, $30);
      label = 10; break;
    case 10:
      var $32=HEAP8[(5256672)];
      var $33=(($32)&(255));
      var $34=((5244008+$33)|0);
      var $35=HEAP8[($34)];
      var $36=(($35)&(255));
      var $37=((($36)+(1))|0);
      var $38=((5243000+$37)|0);
      var $39=HEAP8[($38)];
      $phase1=$39;
      var $40=HEAP8[(5256672)];
      var $41=(($40)&(255));
      var $42=((5252984+$41)|0);
      var $43=HEAP8[($42)];
      $phase2=$43;
      var $44=HEAP8[(5253652)];
      HEAP8[(5256672)]=$44;
      label = 11; break;
    case 11:
      var $46=HEAP8[(5256672)];
      var $47=(($46)&(255));
      var $48=((5254868+$47)|0);
      var $49=HEAP8[($48)];
      var $50=HEAP8[(5256676)];
      var $51=(($50)&(255));
      var $52=((5254452+$51)|0);
      HEAP8[($52)]=$49;
      var $53=HEAP8[(5256672)];
      var $54=(($53)&(255));
      var $55=((5254788+$54)|0);
      var $56=HEAP8[($55)];
      var $57=HEAP8[(5256676)];
      var $58=(($57)&(255));
      var $59=((5254196+$58)|0);
      HEAP8[($59)]=$56;
      var $60=HEAP8[(5256672)];
      var $61=(($60)&(255));
      var $62=((5254708+$61)|0);
      var $63=HEAP8[($62)];
      var $64=HEAP8[(5256676)];
      var $65=(($64)&(255));
      var $66=((5253940+$65)|0);
      HEAP8[($66)]=$63;
      var $67=HEAP8[(5256672)];
      var $68=(($67)&(255));
      var $69=((5256068+$68)|0);
      var $70=HEAP8[($69)];
      var $71=HEAP8[(5256676)];
      var $72=(($71)&(255));
      var $73=((5255652+$72)|0);
      HEAP8[($73)]=$70;
      var $74=HEAP8[(5256672)];
      var $75=(($74)&(255));
      var $76=((5255988+$75)|0);
      var $77=HEAP8[($76)];
      var $78=HEAP8[(5256676)];
      var $79=(($78)&(255));
      var $80=((5255396+$79)|0);
      HEAP8[($80)]=$77;
      var $81=HEAP8[(5256672)];
      var $82=(($81)&(255));
      var $83=((5255908+$82)|0);
      var $84=HEAP8[($83)];
      var $85=HEAP8[(5256676)];
      var $86=(($85)&(255));
      var $87=((5255140+$86)|0);
      HEAP8[($87)]=$84;
      var $88=HEAP8[(5256672)];
      var $89=(($88)&(255));
      var $90=((5243012+$89)|0);
      var $91=HEAP8[($90)];
      var $92=HEAP8[(5256676)];
      var $93=(($92)&(255));
      var $94=((5243332+$93)|0);
      HEAP8[($94)]=$91;
      var $95=HEAP8[(5252564)];
      var $96=(($95)&(255));
      var $97=$phase1;
      var $98=(($97)&(255));
      var $99=((($96)+($98))|0);
      var $100=(($99) & 255);
      var $101=HEAP8[(5256676)];
      var $102=(($101)&(255));
      var $103=((5252308+$102)|0);
      HEAP8[($103)]=$100;
      var $104=HEAP8[(5256676)];
      var $105=((($104)+(1))&255);
      HEAP8[(5256676)]=$105;
      var $106=$phase2;
      var $107=((($106)-(1))&255);
      $phase2=$107;
      label = 12; break;
    case 12:
      var $109=$phase2;
      var $110=(($109)&(255));
      var $111=(($110)|(0))!=0;
      if ($111) { label = 11; break; } else { label = 13; break; }
    case 13:
      var $113=HEAP8[(5253676)];
      var $114=((($113)+(1))&255);
      HEAP8[(5253676)]=$114;
      var $115=HEAP8[(5253676)];
      var $116=(($115)&(255));
      var $117=(($116)|(0))!=0;
      if ($117) { label = 14; break; } else { label = 15; break; }
    case 14:
      label = 4; break;
    case 15:
      label = 16; break;
    case 16:
      HEAP8[(5256760)]=0;
      HEAP8[(5253676)]=0;
      HEAP8[(5253668)]=0;
      HEAP8[(5256676)]=0;
      label = 17; break;
    case 17:
      var $122=HEAP8[(5256676)];
      var $123=(($122)&(255));
      var $124=((5253300+$123)|0);
      var $125=HEAP8[($124)];
      HEAP8[(5256672)]=$125;
      var $126=HEAP8[(5256676)];
      var $127=(($126)&(255));
      var $128=((($127)+(1))|0);
      var $129=((5253300+$128)|0);
      var $130=HEAP8[($129)];
      HEAP8[(5256760)]=$130;
      var $131=HEAP8[(5256676)];
      var $132=((($131)+(1))&255);
      HEAP8[(5256676)]=$132;
      var $133=HEAP8[(5256760)];
      var $134=(($133)&(255));
      var $135=(($134)|(0))==255;
      if ($135) { label = 18; break; } else { label = 19; break; }
    case 18:
      label = 45; break;
    case 19:
      var $138=HEAP8[(5256760)];
      HEAP8[(5256676)]=$138;
      var $139=HEAP8[(5256760)];
      var $140=(($139)&(255));
      var $141=((5243092+$140)|0);
      var $142=HEAP8[($141)];
      HEAP8[(5253652)]=$142;
      var $143=HEAP8[(5256672)];
      var $144=(($143)&(255));
      var $145=((5243092+$144)|0);
      var $146=HEAP8[($145)];
      HEAP8[(5256760)]=$146;
      var $147=HEAP8[(5256760)];
      var $148=(($147)&(255));
      var $149=HEAP8[(5253652)];
      var $150=(($149)&(255));
      var $151=(($148)|(0))==(($150)|(0));
      if ($151) { label = 20; break; } else { label = 21; break; }
    case 20:
      var $153=HEAP8[(5256672)];
      var $154=(($153)&(255));
      var $155=((5243252+$154)|0);
      var $156=HEAP8[($155)];
      $phase1=$156;
      var $157=HEAP8[(5256676)];
      var $158=(($157)&(255));
      var $159=((5243252+$158)|0);
      var $160=HEAP8[($159)];
      $phase2=$160;
      label = 25; break;
    case 21:
      var $162=HEAP8[(5256760)];
      var $163=(($162)&(255));
      var $164=HEAP8[(5253652)];
      var $165=(($164)&(255));
      var $166=(($163)|(0)) < (($165)|(0));
      if ($166) { label = 22; break; } else { label = 23; break; }
    case 22:
      var $168=HEAP8[(5256676)];
      var $169=(($168)&(255));
      var $170=((5243172+$169)|0);
      var $171=HEAP8[($170)];
      $phase1=$171;
      var $172=HEAP8[(5256676)];
      var $173=(($172)&(255));
      var $174=((5243252+$173)|0);
      var $175=HEAP8[($174)];
      $phase2=$175;
      label = 24; break;
    case 23:
      var $177=HEAP8[(5256672)];
      var $178=(($177)&(255));
      var $179=((5243252+$178)|0);
      var $180=HEAP8[($179)];
      $phase1=$180;
      var $181=HEAP8[(5256672)];
      var $182=(($181)&(255));
      var $183=((5243172+$182)|0);
      var $184=HEAP8[($183)];
      $phase2=$184;
      label = 24; break;
    case 24:
      label = 25; break;
    case 25:
      var $187=HEAP8[(5253676)];
      HEAP8[(5256672)]=$187;
      var $188=HEAP8[(5253668)];
      var $189=(($188)&(255));
      var $190=HEAP8[(5253676)];
      var $191=(($190)&(255));
      var $192=((5252984+$191)|0);
      var $193=HEAP8[($192)];
      var $194=(($193)&(255));
      var $195=((($189)+($194))|0);
      var $196=(($195) & 255);
      HEAP8[(5256760)]=$196;
      var $197=HEAP8[(5256760)];
      HEAP8[(5253668)]=$197;
      var $198=HEAP8[(5256760)];
      var $199=(($198)&(255));
      var $200=$phase2;
      var $201=(($200)&(255));
      var $202=((($199)+($201))|0);
      var $203=(($202) & 255);
      HEAP8[(5256760)]=$203;
      var $204=HEAP8[(5256760)];
      $speedcounter=$204;
      HEAP8[(5253672)]=-88;
      var $205=HEAP8[(5253668)];
      var $206=(($205)&(255));
      var $207=$phase1;
      var $208=(($207)&(255));
      var $209=((($206)-($208))|0);
      var $210=(($209) & 255);
      $phase3=$210;
      var $211=$phase1;
      var $212=(($211)&(255));
      var $213=$phase2;
      var $214=(($213)&(255));
      var $215=((($212)+($214))|0);
      var $216=(($215) & 255);
      HEAP8[(5256760)]=$216;
      var $217=HEAP8[(5256760)];
      $mem38=$217;
      var $218=HEAP8[(5256760)];
      HEAP8[(5256676)]=$218;
      var $219=HEAP8[(5256676)];
      var $220=(($219)&(255));
      var $221=((($220)-(2))|0);
      var $222=(($221) & 255);
      HEAP8[(5256676)]=$222;
      var $223=HEAP8[(5256676)];
      var $224=(($223)&(255));
      var $225=$224 & 128;
      var $226=(($225)|(0))==0;
      if ($226) { label = 26; break; } else { label = 44; break; }
    case 26:
      label = 27; break;
    case 27:
      var $229=$mem38;
      $mem40=$229;
      var $230=HEAP8[(5253672)];
      var $231=(($230)&(255));
      var $232=(($231)|(0))==168;
      if ($232) { label = 28; break; } else { label = 29; break; }
    case 28:
      var $234=HEAP8[(5253676)];
      var $235=(($234)&(255));
      var $236=((5252984+$235)|0);
      var $237=HEAP8[($236)];
      var $238=(($237)&(255));
      var $239=$238 >> 1;
      var $240=(($239) & 255);
      $mem36=$240;
      var $241=HEAP8[(5253676)];
      var $242=(($241)&(255));
      var $243=((($242)+(1))|0);
      var $244=((5252984+$243)|0);
      var $245=HEAP8[($244)];
      var $246=(($245)&(255));
      var $247=$246 >> 1;
      var $248=(($247) & 255);
      $mem37=$248;
      var $249=$mem36;
      var $250=(($249)&(255));
      var $251=$mem37;
      var $252=(($251)&(255));
      var $253=((($250)+($252))|0);
      var $254=(($253) & 255);
      $mem40=$254;
      var $255=HEAP8[(5253668)];
      var $256=(($255)&(255));
      var $257=$mem37;
      var $258=(($257)&(255));
      var $259=((($258)+($256))|0);
      var $260=(($259) & 255);
      $mem37=$260;
      var $261=HEAP8[(5253668)];
      var $262=(($261)&(255));
      var $263=$mem36;
      var $264=(($263)&(255));
      var $265=((($262)-($264))|0);
      var $266=(($265) & 255);
      $mem36=$266;
      var $267=HEAP8[(5253672)];
      var $268=$mem37;
      var $269=_Read($267, $268);
      HEAP8[(5256760)]=$269;
      var $270=$mem36;
      HEAP8[(5256672)]=$270;
      var $271=HEAP8[(5256760)];
      var $272=(($271)&(255));
      var $273=HEAP8[(5253672)];
      var $274=$mem36;
      var $275=_Read($273, $274);
      var $276=(($275)&(255));
      var $277=((($272)-($276))|0);
      var $278=(($277) & 255);
      HEAP8[(5253656)]=$278;
      label = 30; break;
    case 29:
      var $280=HEAP8[(5253672)];
      var $281=$speedcounter;
      var $282=_Read($280, $281);
      HEAP8[(5256760)]=$282;
      var $283=$phase3;
      HEAP8[(5256672)]=$283;
      var $284=HEAP8[(5256760)];
      var $285=(($284)&(255));
      var $286=HEAP8[(5253672)];
      var $287=$phase3;
      var $288=_Read($286, $287);
      var $289=(($288)&(255));
      var $290=((($285)-($289))|0);
      var $291=(($290) & 255);
      HEAP8[(5253656)]=$291;
      label = 30; break;
    case 30:
      var $293=HEAP8[(5253656)];
      var $294=(($293 << 24) >> 24);
      var $295=(($294)|(0)) < 0;
      var $296=$295 ? 128 : 0;
      var $297=(($296) & 255);
      HEAP8[(5253664)]=$297;
      var $298=HEAP8[(5253656)];
      var $299=(($298 << 24) >> 24);
      var $300=Math.abs($299);
      var $301=$mem40;
      var $302=(($301)&(255));
      var $303=((($300)|(0)))%((($302)|(0)));
      var $304=(($303) & 255);
      HEAP8[(5253660)]=$304;
      var $305=HEAP8[(5253656)];
      var $306=(($305 << 24) >> 24);
      var $307=$mem40;
      var $308=(($307)&(255));
      var $309=((((($306)|(0)))/((($308)|(0))))&-1);
      var $310=(($309) & 255);
      HEAP8[(5253656)]=$310;
      var $311=$mem40;
      HEAP8[(5256676)]=$311;
      var $312=$phase3;
      HEAP8[(5256672)]=$312;
      HEAP8[(5253652)]=0;
      label = 31; break;
    case 31:
      var $314=HEAP8[(5253672)];
      var $315=HEAP8[(5256672)];
      var $316=_Read($314, $315);
      var $317=(($316)&(255));
      var $318=HEAP8[(5253656)];
      var $319=(($318)&(255));
      var $320=((($317)+($319))|0);
      var $321=(($320) & 255);
      HEAP8[(5256760)]=$321;
      var $322=HEAP8[(5256760)];
      $mem48=$322;
      var $323=HEAP8[(5256672)];
      var $324=((($323)+(1))&255);
      HEAP8[(5256672)]=$324;
      var $325=HEAP8[(5256676)];
      var $326=((($325)-(1))&255);
      HEAP8[(5256676)]=$326;
      var $327=HEAP8[(5256676)];
      var $328=(($327)&(255));
      var $329=(($328)|(0))==0;
      if ($329) { label = 32; break; } else { label = 33; break; }
    case 32:
      label = 41; break;
    case 33:
      var $332=HEAP8[(5253660)];
      var $333=(($332)&(255));
      var $334=HEAP8[(5253652)];
      var $335=(($334)&(255));
      var $336=((($335)+($333))|0);
      var $337=(($336) & 255);
      HEAP8[(5253652)]=$337;
      var $338=HEAP8[(5253652)];
      var $339=(($338)&(255));
      var $340=$mem40;
      var $341=(($340)&(255));
      var $342=(($339)|(0)) >= (($341)|(0));
      if ($342) { label = 34; break; } else { label = 40; break; }
    case 34:
      var $344=$mem40;
      var $345=(($344)&(255));
      var $346=HEAP8[(5253652)];
      var $347=(($346)&(255));
      var $348=((($347)-($345))|0);
      var $349=(($348) & 255);
      HEAP8[(5253652)]=$349;
      var $350=HEAP8[(5253664)];
      var $351=(($350)&(255));
      var $352=$351 & 128;
      var $353=(($352)|(0))==0;
      if ($353) { label = 35; break; } else { label = 38; break; }
    case 35:
      var $355=$mem48;
      var $356=(($355)&(255));
      var $357=(($356)|(0))!=0;
      if ($357) { label = 36; break; } else { label = 37; break; }
    case 36:
      var $359=$mem48;
      var $360=((($359)+(1))&255);
      $mem48=$360;
      label = 37; break;
    case 37:
      label = 39; break;
    case 38:
      var $363=$mem48;
      var $364=((($363)-(1))&255);
      $mem48=$364;
      label = 39; break;
    case 39:
      label = 40; break;
    case 40:
      var $367=HEAP8[(5253672)];
      var $368=HEAP8[(5256672)];
      var $369=$mem48;
      _Write($367, $368, $369);
      label = 31; break;
    case 41:
      var $371=HEAP8[(5253672)];
      var $372=((($371)+(1))&255);
      HEAP8[(5253672)]=$372;
      label = 42; break;
    case 42:
      var $374=HEAP8[(5253672)];
      var $375=(($374)&(255));
      var $376=(($375)|(0))!=175;
      if ($376) { label = 27; break; } else { label = 43; break; }
    case 43:
      label = 44; break;
    case 44:
      var $379=HEAP8[(5253676)];
      var $380=((($379)+(1))&255);
      HEAP8[(5253676)]=$380;
      var $381=HEAP8[(5253676)];
      HEAP8[(5256676)]=$381;
      label = 17; break;
    case 45:
      var $383=HEAP8[(5253668)];
      var $384=(($383)&(255));
      var $385=HEAP8[(5253676)];
      var $386=(($385)&(255));
      var $387=((5252984+$386)|0);
      var $388=HEAP8[($387)];
      var $389=(($388)&(255));
      var $390=((($384)+($389))|0);
      var $391=(($390) & 255);
      $mem48=$391;
      var $392=HEAP32[((5244596)>>2)];
      var $393=(($392)|(0))!=0;
      if ($393) { label = 51; break; } else { label = 46; break; }
    case 46:
      $i=0;
      label = 47; break;
    case 47:
      var $396=$i;
      var $397=(($396)|(0)) < 256;
      if ($397) { label = 48; break; } else { label = 50; break; }
    case 48:
      var $399=$i;
      var $400=((5254452+$399)|0);
      var $401=HEAP8[($400)];
      var $402=(($401)&(255));
      var $403=$402 >> 1;
      var $404=$i;
      var $405=((5252308+$404)|0);
      var $406=HEAP8[($405)];
      var $407=(($406)&(255));
      var $408=((($407)-($403))|0);
      var $409=(($408) & 255);
      HEAP8[($405)]=$409;
      label = 49; break;
    case 49:
      var $411=$i;
      var $412=((($411)+(1))|0);
      $i=$412;
      label = 47; break;
    case 50:
      label = 51; break;
    case 51:
      $phase1=0;
      $phase2=0;
      $phase3=0;
      HEAP8[(5253668)]=0;
      $speedcounter=72;
      $i=255;
      label = 52; break;
    case 52:
      var $416=$i;
      var $417=(($416)|(0)) >= 0;
      if ($417) { label = 53; break; } else { label = 55; break; }
    case 53:
      var $419=$i;
      var $420=((5255652+$419)|0);
      var $421=HEAP8[($420)];
      var $422=(($421)&(255));
      var $423=((5255120+$422)|0);
      var $424=HEAP8[($423)];
      var $425=$i;
      var $426=((5255652+$425)|0);
      HEAP8[($426)]=$424;
      var $427=$i;
      var $428=((5255396+$427)|0);
      var $429=HEAP8[($428)];
      var $430=(($429)&(255));
      var $431=((5255120+$430)|0);
      var $432=HEAP8[($431)];
      var $433=$i;
      var $434=((5255396+$433)|0);
      HEAP8[($434)]=$432;
      var $435=$i;
      var $436=((5255140+$435)|0);
      var $437=HEAP8[($436)];
      var $438=(($437)&(255));
      var $439=((5255120+$438)|0);
      var $440=HEAP8[($439)];
      var $441=$i;
      var $442=((5255140+$441)|0);
      HEAP8[($442)]=$440;
      label = 54; break;
    case 54:
      var $444=$i;
      var $445=((($444)-(1))|0);
      $i=$445;
      label = 52; break;
    case 55:
      HEAP8[(5256672)]=0;
      var $447=HEAP8[((((5252308)|0))|0)];
      HEAP8[(5256760)]=$447;
      var $448=HEAP8[(5256760)];
      HEAP8[(5253676)]=$448;
      var $449=HEAP8[(5256760)];
      HEAP8[(5256676)]=$449;
      var $450=HEAP8[(5256760)];
      var $451=(($450)&(255));
      var $452=HEAP8[(5256760)];
      var $453=(($452)&(255));
      var $454=$453 >> 2;
      var $455=((($451)-($454))|0);
      var $456=(($455) & 255);
      $mem38=$456;
      label = 56; break;
    case 56:
      var $458=HEAP8[(5256672)];
      var $459=(($458)&(255));
      var $460=((5243332+$459)|0);
      var $461=HEAP8[($460)];
      HEAP8[(5256760)]=$461;
      var $462=HEAP8[(5256760)];
      HEAP8[(5253680)]=$462;
      var $463=HEAP8[(5256760)];
      var $464=(($463)&(255));
      var $465=$464 & 248;
      var $466=(($465) & 255);
      HEAP8[(5256760)]=$466;
      var $467=HEAP8[(5256760)];
      var $468=(($467)&(255));
      var $469=(($468)|(0))!=0;
      if ($469) { label = 57; break; } else { label = 58; break; }
    case 57:
      _Code48227($mem66);
      var $471=HEAP8[(5256672)];
      var $472=(($471)&(255));
      var $473=((($472)+(2))|0);
      var $474=(($473) & 255);
      HEAP8[(5256672)]=$474;
      var $475=$mem48;
      var $476=(($475)&(255));
      var $477=((($476)-(2))|0);
      var $478=(($477) & 255);
      $mem48=$478;
      label = 67; break;
    case 58:
      var $480=$phase1;
      var $481=(($480)&(255));
      var $482=((5244340+$481)|0);
      var $483=HEAP8[($482)];
      var $484=(($483)&(255));
      var $485=HEAP8[(5256672)];
      var $486=(($485)&(255));
      var $487=((5255652+$486)|0);
      var $488=HEAP8[($487)];
      var $489=(($488)&(255));
      var $490=$484 | $489;
      var $491=((5253364+$490)|0);
      var $492=HEAP8[($491)];
      HEAP8[(5253652)]=$492;
      $carry=0;
      var $493=HEAP8[(5253652)];
      var $494=(($493)&(255));
      var $495=$phase2;
      var $496=(($495)&(255));
      var $497=((5244340+$496)|0);
      var $498=HEAP8[($497)];
      var $499=(($498)&(255));
      var $500=HEAP8[(5256672)];
      var $501=(($500)&(255));
      var $502=((5255396+$501)|0);
      var $503=HEAP8[($502)];
      var $504=(($503)&(255));
      var $505=$499 | $504;
      var $506=((5253364+$505)|0);
      var $507=HEAP8[($506)];
      var $508=(($507)&(255));
      var $509=((($494)+($508))|0);
      var $510=(($509)|(0)) > 255;
      if ($510) { label = 59; break; } else { label = 60; break; }
    case 59:
      $carry=1;
      label = 60; break;
    case 60:
      var $513=$phase2;
      var $514=(($513)&(255));
      var $515=((5244340+$514)|0);
      var $516=HEAP8[($515)];
      var $517=(($516)&(255));
      var $518=HEAP8[(5256672)];
      var $519=(($518)&(255));
      var $520=((5255396+$519)|0);
      var $521=HEAP8[($520)];
      var $522=(($521)&(255));
      var $523=$517 | $522;
      var $524=((5253364+$523)|0);
      var $525=HEAP8[($524)];
      var $526=(($525)&(255));
      var $527=HEAP8[(5253652)];
      var $528=(($527)&(255));
      var $529=((($528)+($526))|0);
      var $530=(($529) & 255);
      HEAP8[(5253652)]=$530;
      var $531=HEAP8[(5253652)];
      var $532=(($531)&(255));
      var $533=$phase3;
      var $534=(($533)&(255));
      var $535=((5250772+$534)|0);
      var $536=HEAP8[($535)];
      var $537=(($536)&(255));
      var $538=HEAP8[(5256672)];
      var $539=(($538)&(255));
      var $540=((5255140+$539)|0);
      var $541=HEAP8[($540)];
      var $542=(($541)&(255));
      var $543=$537 | $542;
      var $544=((5253364+$543)|0);
      var $545=HEAP8[($544)];
      var $546=(($545)&(255));
      var $547=((($532)+($546))|0);
      var $548=$carry;
      var $549=(($548)|(0))!=0;
      var $550=$549 ? 1 : 0;
      var $551=((($547)+($550))|0);
      var $552=(($551) & 255);
      HEAP8[(5256760)]=$552;
      var $553=HEAP8[(5256760)];
      var $554=(($553)&(255));
      var $555=((($554)+(136))|0);
      var $556=$555 & 255;
      var $557=$556 >> 4;
      var $558=(($557) & 255);
      HEAP8[(5256760)]=$558;
      var $559=HEAP32[((5253360)>>2)];
      var $560=((5242888+((($559)*(20))&-1))|0);
      var $561=(($560)|0);
      var $562=HEAP32[(($561)>>2)];
      var $563=HEAP32[((5255112)>>2)];
      var $564=((($563)+($562))|0);
      HEAP32[((5255112)>>2)]=$564;
      HEAP32[((5253360)>>2)]=0;
      $k=0;
      label = 61; break;
    case 61:
      var $566=$k;
      var $567=(($566)|(0)) < 5;
      if ($567) { label = 62; break; } else { label = 64; break; }
    case 62:
      var $569=HEAP8[(5256760)];
      var $570=(($569)&(255));
      var $571=$570 & 15;
      var $572=($571<<4);
      var $573=(($572) & 255);
      var $574=HEAP32[((5255112)>>2)];
      var $575=HEAP32[((5244768)>>2)];
      var $576=((((($574)|(0)))/((($575)|(0))))&-1);
      var $577=$k;
      var $578=((($576)+($577))|0);
      var $579=HEAP32[((5255116)>>2)];
      var $580=(($579+$578)|0);
      HEAP8[($580)]=$573;
      label = 63; break;
    case 63:
      var $582=$k;
      var $583=((($582)+(1))|0);
      $k=$583;
      label = 61; break;
    case 64:
      var $585=$speedcounter;
      var $586=((($585)-(1))&255);
      $speedcounter=$586;
      var $587=$speedcounter;
      var $588=(($587)&(255));
      var $589=(($588)|(0))!=0;
      if ($589) { label = 65; break; } else { label = 66; break; }
    case 65:
      label = 70; break;
    case 66:
      var $592=HEAP8[(5256672)];
      var $593=((($592)+(1))&255);
      HEAP8[(5256672)]=$593;
      var $594=$mem48;
      var $595=((($594)-(1))&255);
      $mem48=$595;
      label = 67; break;
    case 67:
      var $597=$mem48;
      var $598=(($597)&(255));
      var $599=(($598)|(0))==0;
      if ($599) { label = 68; break; } else { label = 69; break; }
    case 68:
      label = 77; break;
    case 69:
      var $602=HEAP8[(5244336)];
      $speedcounter=$602;
      label = 70; break;
    case 70:
      var $604=HEAP8[(5253676)];
      var $605=((($604)-(1))&255);
      HEAP8[(5253676)]=$605;
      var $606=HEAP8[(5253676)];
      var $607=(($606)&(255));
      var $608=(($607)|(0))==0;
      if ($608) { label = 71; break; } else { label = 73; break; }
    case 71:
      label = 72; break;
    case 72:
      var $611=HEAP8[(5256672)];
      var $612=(($611)&(255));
      var $613=((5252308+$612)|0);
      var $614=HEAP8[($613)];
      HEAP8[(5256760)]=$614;
      var $615=HEAP8[(5256760)];
      HEAP8[(5253676)]=$615;
      var $616=HEAP8[(5256760)];
      var $617=(($616)&(255));
      var $618=HEAP8[(5256760)];
      var $619=(($618)&(255));
      var $620=$619 >> 2;
      var $621=((($617)-($620))|0);
      var $622=(($621) & 255);
      HEAP8[(5256760)]=$622;
      var $623=HEAP8[(5256760)];
      $mem38=$623;
      $phase1=0;
      $phase2=0;
      $phase3=0;
      label = 56; break;
    case 73:
      var $625=$mem38;
      var $626=((($625)-(1))&255);
      $mem38=$626;
      var $627=$mem38;
      var $628=(($627)&(255));
      var $629=(($628)|(0))!=0;
      if ($629) { label = 75; break; } else { label = 74; break; }
    case 74:
      var $631=HEAP8[(5253680)];
      var $632=(($631)&(255));
      var $633=(($632)|(0))==0;
      if ($633) { label = 75; break; } else { label = 76; break; }
    case 75:
      var $635=HEAP8[(5256672)];
      var $636=(($635)&(255));
      var $637=((5254452+$636)|0);
      var $638=HEAP8[($637)];
      var $639=(($638)&(255));
      var $640=$phase1;
      var $641=(($640)&(255));
      var $642=((($641)+($639))|0);
      var $643=(($642) & 255);
      $phase1=$643;
      var $644=HEAP8[(5256672)];
      var $645=(($644)&(255));
      var $646=((5254196+$645)|0);
      var $647=HEAP8[($646)];
      var $648=(($647)&(255));
      var $649=$phase2;
      var $650=(($649)&(255));
      var $651=((($650)+($648))|0);
      var $652=(($651) & 255);
      $phase2=$652;
      var $653=HEAP8[(5256672)];
      var $654=(($653)&(255));
      var $655=((5253940+$654)|0);
      var $656=HEAP8[($655)];
      var $657=(($656)&(255));
      var $658=$phase3;
      var $659=(($658)&(255));
      var $660=((($659)+($657))|0);
      var $661=(($660) & 255);
      $phase3=$661;
      label = 56; break;
    case 76:
      _Code48227($mem66);
      label = 72; break;
    case 77:
      STACKTOP = __stackBase__;
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _trans($mem39212, $mem39213) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $carry;
      var $temp;
      var $mem39214;
      var $mem39215;
      $1=$mem39212;
      $2=$mem39213;
      HEAP8[(5256760)]=0;
      $mem39215=0;
      $mem39214=0;
      HEAP8[(5256676)]=8;
      label = 2; break;
    case 2:
      var $4=$1;
      var $5=(($4)&(255));
      var $6=$5 & 1;
      var $7=(($6) & 255);
      $carry=$7;
      var $8=$1;
      var $9=(($8)&(255));
      var $10=$9 >> 1;
      var $11=(($10) & 255);
      $1=$11;
      var $12=$carry;
      var $13=(($12)&(255));
      var $14=(($13)|(0))!=0;
      if ($14) { label = 3; break; } else { label = 6; break; }
    case 3:
      $carry=0;
      var $16=$mem39215;
      HEAP8[(5256760)]=$16;
      var $17=HEAP8[(5256760)];
      var $18=(($17)&(255));
      var $19=$2;
      var $20=(($19)&(255));
      var $21=((($18)+($20))|0);
      $temp=$21;
      var $22=HEAP8[(5256760)];
      var $23=(($22)&(255));
      var $24=$2;
      var $25=(($24)&(255));
      var $26=((($23)+($25))|0);
      var $27=(($26) & 255);
      HEAP8[(5256760)]=$27;
      var $28=$temp;
      var $29=(($28)|(0)) > 255;
      if ($29) { label = 4; break; } else { label = 5; break; }
    case 4:
      $carry=1;
      label = 5; break;
    case 5:
      var $32=HEAP8[(5256760)];
      $mem39215=$32;
      label = 6; break;
    case 6:
      var $34=$mem39215;
      var $35=(($34)&(255));
      var $36=$35 & 1;
      $temp=$36;
      var $37=$mem39215;
      var $38=(($37)&(255));
      var $39=$38 >> 1;
      var $40=$carry;
      var $41=(($40)&(255));
      var $42=(($41)|(0))!=0;
      var $43=$42 ? 128 : 0;
      var $44=$39 | $43;
      var $45=(($44) & 255);
      $mem39215=$45;
      var $46=$temp;
      var $47=(($46) & 255);
      $carry=$47;
      var $48=HEAP8[(5256676)];
      var $49=((($48)-(1))&255);
      HEAP8[(5256676)]=$49;
      label = 7; break;
    case 7:
      var $51=HEAP8[(5256676)];
      var $52=(($51)&(255));
      var $53=(($52)|(0))!=0;
      if ($53) { label = 2; break; } else { label = 8; break; }
    case 8:
      var $55=$mem39214;
      var $56=(($55)&(255));
      var $57=$56 & 128;
      $temp=$57;
      var $58=$mem39214;
      var $59=(($58)&(255));
      var $60=$59 << 1;
      var $61=$carry;
      var $62=(($61)&(255));
      var $63=(($62)|(0))!=0;
      var $64=$63 ? 1 : 0;
      var $65=$60 | $64;
      var $66=(($65) & 255);
      $mem39214=$66;
      var $67=$temp;
      var $68=(($67) & 255);
      $carry=$68;
      var $69=$mem39215;
      var $70=(($69)&(255));
      var $71=$70 & 128;
      $temp=$71;
      var $72=$mem39215;
      var $73=(($72)&(255));
      var $74=$73 << 1;
      var $75=$carry;
      var $76=(($75)&(255));
      var $77=(($76)|(0))!=0;
      var $78=$77 ? 1 : 0;
      var $79=$74 | $78;
      var $80=(($79) & 255);
      $mem39215=$80;
      var $81=$temp;
      var $82=(($81) & 255);
      $carry=$82;
      var $83=$mem39215;
      return $83;
    default: assert(0, "bad label: " + label);
  }
}
function _Code37055($mem59) {
  var label = 0;
  var $1;
  $1=$mem59;
  var $2=$1;
  HEAP8[(5256676)]=$2;
  var $3=HEAP8[(5256676)];
  var $4=((($3)-(1))&255);
  HEAP8[(5256676)]=$4;
  var $5=HEAP8[(5256676)];
  var $6=(($5)&(255));
  var $7=((5243752+$6)|0);
  var $8=HEAP8[($7)];
  HEAP8[(5256760)]=$8;
  var $9=HEAP8[(5256760)];
  HEAP8[(5256672)]=$9;
  var $10=HEAP8[(5256672)];
  var $11=(($10)&(255));
  var $12=((5243644+$11)|0);
  var $13=HEAP8[($12)];
  HEAP8[(5256760)]=$13;
  return;
}
function _Code37066($mem58) {
  var label = 0;
  var $1;
  $1=$mem58;
  var $2=$1;
  HEAP8[(5256676)]=$2;
  var $3=HEAP8[(5256676)];
  var $4=((($3)+(1))&255);
  HEAP8[(5256676)]=$4;
  var $5=HEAP8[(5256676)];
  var $6=(($5)&(255));
  var $7=((5243752+$6)|0);
  var $8=HEAP8[($7)];
  HEAP8[(5256760)]=$8;
  var $9=HEAP8[(5256760)];
  HEAP8[(5256672)]=$9;
  var $10=HEAP8[(5256672)];
  var $11=(($10)&(255));
  var $12=((5243644+$11)|0);
  var $13=HEAP8[($12)];
  HEAP8[(5256760)]=$13;
  return;
}
function _GetRuleByte($mem62, $mem63, $Y) {
  var label = 0;
  var $1;
  var $2;
  var $3;
  var $address;
  $1=$mem62;
  $2=$mem63;
  $3=$Y;
  var $4=$1;
  var $5=(($4)&(255));
  var $6=$2;
  var $7=(($6)&(255));
  var $8=$7 << 8;
  var $9=((($5)+($8))|0);
  $address=$9;
  var $10=$address;
  var $11=((($10)-(32000))|0);
  $address=$11;
  var $12=$address;
  var $13=$3;
  var $14=(($13)&(255));
  var $15=((($12)+($14))|0);
  var $16=((5244772+$15)|0);
  var $17=HEAP8[($16)];
  return $17;
}
function _TextToPhonemes($input) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $mem29;
      var $mem56;
      var $mem57;
      var $mem58;
      var $mem59;
      var $mem60;
      var $mem61;
      var $mem62;
      var $mem63;
      var $mem64;
      var $mem65;
      var $mem66;
      var $mem36653;
      $2=$input;
      HEAP8[((((5243752)|0))|0)]=32;
      HEAP8[(5256676)]=1;
      HEAP8[(5256672)]=0;
      label = 2; break;
    case 2:
      var $4=HEAP8[(5256672)];
      var $5=(($4)&(255));
      var $6=$2;
      var $7=(($6+$5)|0);
      var $8=HEAP8[($7)];
      var $9=(($8 << 24) >> 24);
      var $10=$9 & 127;
      var $11=(($10) & 255);
      HEAP8[(5256760)]=$11;
      var $12=HEAP8[(5256760)];
      var $13=(($12)&(255));
      var $14=(($13)|(0)) >= 112;
      if ($14) { label = 3; break; } else { label = 4; break; }
    case 3:
      var $16=HEAP8[(5256760)];
      var $17=(($16)&(255));
      var $18=$17 & 95;
      var $19=(($18) & 255);
      HEAP8[(5256760)]=$19;
      label = 7; break;
    case 4:
      var $21=HEAP8[(5256760)];
      var $22=(($21)&(255));
      var $23=(($22)|(0)) >= 96;
      if ($23) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $25=HEAP8[(5256760)];
      var $26=(($25)&(255));
      var $27=$26 & 79;
      var $28=(($27) & 255);
      HEAP8[(5256760)]=$28;
      label = 6; break;
    case 6:
      label = 7; break;
    case 7:
      var $31=HEAP8[(5256760)];
      var $32=HEAP8[(5256676)];
      var $33=(($32)&(255));
      var $34=((5243752+$33)|0);
      HEAP8[($34)]=$31;
      var $35=HEAP8[(5256676)];
      var $36=((($35)+(1))&255);
      HEAP8[(5256676)]=$36;
      var $37=HEAP8[(5256672)];
      var $38=((($37)+(1))&255);
      HEAP8[(5256672)]=$38;
      label = 8; break;
    case 8:
      var $40=HEAP8[(5256672)];
      var $41=(($40)&(255));
      var $42=(($41)|(0))!=255;
      if ($42) { label = 2; break; } else { label = 9; break; }
    case 9:
      HEAP8[(5256676)]=-1;
      HEAP8[(5256760)]=27;
      var $44=HEAP8[(5256676)];
      var $45=(($44)&(255));
      var $46=((5243752+$45)|0);
      HEAP8[($46)]=27;
      $mem61=-1;
      label = 10; break;
    case 10:
      HEAP8[(5256760)]=-1;
      $mem56=-1;
      label = 11; break;
    case 11:
      label = 12; break;
    case 12:
      var $50=$mem61;
      var $51=((($50)+(1))&255);
      $mem61=$51;
      var $52=$mem61;
      HEAP8[(5256676)]=$52;
      var $53=HEAP8[(5256676)];
      var $54=(($53)&(255));
      var $55=((5243752+$54)|0);
      var $56=HEAP8[($55)];
      HEAP8[(5256760)]=$56;
      var $57=HEAP8[(5256760)];
      $mem64=$57;
      var $58=HEAP8[(5256760)];
      var $59=(($58)&(255));
      var $60=(($59)|(0))==27;
      if ($60) { label = 13; break; } else { label = 14; break; }
    case 13:
      var $62=$mem56;
      var $63=((($62)+(1))&255);
      $mem56=$63;
      var $64=$mem56;
      HEAP8[(5256676)]=$64;
      HEAP8[(5256760)]=-101;
      var $65=HEAP8[(5256676)];
      var $66=(($65)&(255));
      var $67=$2;
      var $68=(($67+$66)|0);
      HEAP8[($68)]=-101;
      $1=1;
      label = 221; break;
    case 14:
      var $70=HEAP8[(5256760)];
      var $71=(($70)&(255));
      var $72=(($71)|(0))!=46;
      if ($72) { label = 15; break; } else { label = 16; break; }
    case 15:
      label = 19; break;
    case 16:
      var $75=HEAP8[(5256676)];
      var $76=((($75)+(1))&255);
      HEAP8[(5256676)]=$76;
      var $77=HEAP8[(5256676)];
      var $78=(($77)&(255));
      var $79=((5243752+$78)|0);
      var $80=HEAP8[($79)];
      HEAP8[(5256672)]=$80;
      var $81=HEAP8[(5256672)];
      var $82=(($81)&(255));
      var $83=((5243644+$82)|0);
      var $84=HEAP8[($83)];
      var $85=(($84)&(255));
      var $86=$85 & 1;
      var $87=(($86) & 255);
      HEAP8[(5256760)]=$87;
      var $88=HEAP8[(5256760)];
      var $89=(($88)&(255));
      var $90=(($89)|(0))!=0;
      if ($90) { label = 17; break; } else { label = 18; break; }
    case 17:
      label = 19; break;
    case 18:
      var $93=$mem56;
      var $94=((($93)+(1))&255);
      $mem56=$94;
      var $95=$mem56;
      HEAP8[(5256676)]=$95;
      HEAP8[(5256760)]=46;
      var $96=HEAP8[(5256676)];
      var $97=(($96)&(255));
      var $98=$2;
      var $99=(($98+$97)|0);
      HEAP8[($99)]=46;
      label = 12; break;
    case 19:
      var $101=$mem64;
      HEAP8[(5256760)]=$101;
      var $102=HEAP8[(5256760)];
      HEAP8[(5256672)]=$102;
      var $103=HEAP8[(5256760)];
      var $104=(($103)&(255));
      var $105=((5243644+$104)|0);
      var $106=HEAP8[($105)];
      HEAP8[(5256760)]=$106;
      var $107=HEAP8[(5256760)];
      $mem57=$107;
      var $108=HEAP8[(5256760)];
      var $109=(($108)&(255));
      var $110=$109 & 2;
      var $111=(($110)|(0))!=0;
      if ($111) { label = 20; break; } else { label = 21; break; }
    case 20:
      $mem62=-91;
      $mem63=-110;
      label = 30; break;
    case 21:
      var $114=$mem57;
      HEAP8[(5256760)]=$114;
      var $115=HEAP8[(5256760)];
      var $116=(($115)&(255));
      var $117=(($116)|(0))!=0;
      if ($117) { label = 22; break; } else { label = 23; break; }
    case 22:
      label = 27; break;
    case 23:
      HEAP8[(5256760)]=32;
      var $120=HEAP8[(5256676)];
      var $121=(($120)&(255));
      var $122=((5243752+$121)|0);
      HEAP8[($122)]=32;
      var $123=$mem56;
      var $124=((($123)+(1))&255);
      $mem56=$124;
      var $125=$mem56;
      HEAP8[(5256676)]=$125;
      var $126=HEAP8[(5256676)];
      var $127=(($126)&(255));
      var $128=(($127)|(0)) > 120;
      if ($128) { label = 24; break; } else { label = 25; break; }
    case 24:
      label = 26; break;
    case 25:
      var $131=HEAP8[(5256760)];
      var $132=HEAP8[(5256676)];
      var $133=(($132)&(255));
      var $134=$2;
      var $135=(($134+$133)|0);
      HEAP8[($135)]=$131;
      label = 11; break;
    case 26:
      var $137=HEAP8[(5256676)];
      var $138=(($137)&(255));
      var $139=$2;
      var $140=(($139+$138)|0);
      HEAP8[($140)]=-101;
      var $141=$mem61;
      HEAP8[(5256760)]=$141;
      var $142=HEAP8[(5256760)];
      $mem36653=$142;
      $1=1;
      label = 221; break;
    case 27:
      var $144=$mem57;
      var $145=(($144)&(255));
      var $146=$145 & 128;
      var $147=(($146) & 255);
      HEAP8[(5256760)]=$147;
      var $148=HEAP8[(5256760)];
      var $149=(($148)&(255));
      var $150=(($149)|(0))==0;
      if ($150) { label = 28; break; } else { label = 29; break; }
    case 28:
      $1=0;
      label = 221; break;
    case 29:
      var $153=$mem64;
      var $154=(($153)&(255));
      var $155=((($154)-(65))|0);
      var $156=(($155) & 255);
      HEAP8[(5256676)]=$156;
      var $157=HEAP8[(5256676)];
      var $158=(($157)&(255));
      var $159=((5243616+$158)|0);
      var $160=HEAP8[($159)];
      $mem62=$160;
      var $161=HEAP8[(5256676)];
      var $162=(($161)&(255));
      var $163=((5243588+$162)|0);
      var $164=HEAP8[($163)];
      $mem63=$164;
      label = 30; break;
    case 30:
      HEAP8[(5256672)]=0;
      label = 31; break;
    case 31:
      var $167=$mem62;
      var $168=(($167)&(255));
      var $169=((($168)+(1))|0);
      var $170=(($169) & 255);
      $mem62=$170;
      var $171=$mem62;
      var $172=(($171)&(255));
      var $173=(($172)|(0))==0;
      var $174=$173 ? 1 : 0;
      var $175=$mem63;
      var $176=(($175)&(255));
      var $177=((($176)+($174))|0);
      var $178=(($177) & 255);
      $mem63=$178;
      var $179=$mem62;
      var $180=$mem63;
      var $181=HEAP8[(5256672)];
      var $182=_GetRuleByte($179, $180, $181);
      HEAP8[(5256760)]=$182;
      label = 32; break;
    case 32:
      var $184=HEAP8[(5256760)];
      var $185=(($184)&(255));
      var $186=$185 & 128;
      var $187=(($186)|(0))==0;
      if ($187) { label = 31; break; } else { label = 33; break; }
    case 33:
      var $189=HEAP8[(5256672)];
      var $190=((($189)+(1))&255);
      HEAP8[(5256672)]=$190;
      label = 34; break;
    case 34:
      var $192=$mem62;
      var $193=$mem63;
      var $194=HEAP8[(5256672)];
      var $195=_GetRuleByte($192, $193, $194);
      HEAP8[(5256760)]=$195;
      var $196=HEAP8[(5256760)];
      var $197=(($196)&(255));
      var $198=(($197)|(0))==40;
      if ($198) { label = 35; break; } else { label = 36; break; }
    case 35:
      label = 37; break;
    case 36:
      var $201=HEAP8[(5256672)];
      var $202=((($201)+(1))&255);
      HEAP8[(5256672)]=$202;
      label = 34; break;
    case 37:
      var $204=HEAP8[(5256672)];
      $mem66=$204;
      label = 38; break;
    case 38:
      var $206=HEAP8[(5256672)];
      var $207=((($206)+(1))&255);
      HEAP8[(5256672)]=$207;
      var $208=$mem62;
      var $209=$mem63;
      var $210=HEAP8[(5256672)];
      var $211=_GetRuleByte($208, $209, $210);
      HEAP8[(5256760)]=$211;
      label = 39; break;
    case 39:
      var $213=HEAP8[(5256760)];
      var $214=(($213)&(255));
      var $215=(($214)|(0))!=41;
      if ($215) { label = 38; break; } else { label = 40; break; }
    case 40:
      var $217=HEAP8[(5256672)];
      $mem65=$217;
      label = 41; break;
    case 41:
      var $219=HEAP8[(5256672)];
      var $220=((($219)+(1))&255);
      HEAP8[(5256672)]=$220;
      var $221=$mem62;
      var $222=$mem63;
      var $223=HEAP8[(5256672)];
      var $224=_GetRuleByte($221, $222, $223);
      HEAP8[(5256760)]=$224;
      var $225=HEAP8[(5256760)];
      var $226=(($225)&(255));
      var $227=$226 & 127;
      var $228=(($227) & 255);
      HEAP8[(5256760)]=$228;
      label = 42; break;
    case 42:
      var $230=HEAP8[(5256760)];
      var $231=(($230)&(255));
      var $232=(($231)|(0))!=61;
      if ($232) { label = 41; break; } else { label = 43; break; }
    case 43:
      var $234=HEAP8[(5256672)];
      $mem64=$234;
      var $235=$mem61;
      HEAP8[(5256676)]=$235;
      var $236=HEAP8[(5256676)];
      $mem60=$236;
      var $237=$mem66;
      HEAP8[(5256672)]=$237;
      var $238=HEAP8[(5256672)];
      var $239=((($238)+(1))&255);
      HEAP8[(5256672)]=$239;
      label = 44; break;
    case 44:
      var $241=HEAP8[(5256676)];
      var $242=(($241)&(255));
      var $243=((5243752+$242)|0);
      var $244=HEAP8[($243)];
      $mem57=$244;
      var $245=$mem62;
      var $246=$mem63;
      var $247=HEAP8[(5256672)];
      var $248=_GetRuleByte($245, $246, $247);
      HEAP8[(5256760)]=$248;
      var $249=HEAP8[(5256760)];
      var $250=(($249)&(255));
      var $251=$mem57;
      var $252=(($251)&(255));
      var $253=(($250)|(0))!=(($252)|(0));
      if ($253) { label = 45; break; } else { label = 46; break; }
    case 45:
      label = 30; break;
    case 46:
      var $256=HEAP8[(5256672)];
      var $257=((($256)+(1))&255);
      HEAP8[(5256672)]=$257;
      var $258=HEAP8[(5256672)];
      var $259=(($258)&(255));
      var $260=$mem65;
      var $261=(($260)&(255));
      var $262=(($259)|(0))==(($261)|(0));
      if ($262) { label = 47; break; } else { label = 48; break; }
    case 47:
      label = 49; break;
    case 48:
      var $265=HEAP8[(5256676)];
      var $266=((($265)+(1))&255);
      HEAP8[(5256676)]=$266;
      var $267=HEAP8[(5256676)];
      $mem60=$267;
      label = 44; break;
    case 49:
      label = 50; break;
    case 50:
      var $270=$mem61;
      HEAP8[(5256760)]=$270;
      var $271=$mem61;
      $mem59=$271;
      label = 51; break;
    case 51:
      label = 52; break;
    case 52:
      var $274=$mem66;
      var $275=((($274)-(1))&255);
      $mem66=$275;
      var $276=$mem66;
      HEAP8[(5256672)]=$276;
      var $277=$mem62;
      var $278=$mem63;
      var $279=HEAP8[(5256672)];
      var $280=_GetRuleByte($277, $278, $279);
      HEAP8[(5256760)]=$280;
      var $281=HEAP8[(5256760)];
      $mem57=$281;
      var $282=HEAP8[(5256760)];
      var $283=(($282)&(255));
      var $284=$283 & 128;
      var $285=(($284)|(0))!=0;
      if ($285) { label = 53; break; } else { label = 54; break; }
    case 53:
      label = 147; break;
    case 54:
      var $288=HEAP8[(5256760)];
      var $289=(($288)&(255));
      var $290=$289 & 127;
      var $291=(($290) & 255);
      HEAP8[(5256676)]=$291;
      var $292=HEAP8[(5256676)];
      var $293=(($292)&(255));
      var $294=((5243644+$293)|0);
      var $295=HEAP8[($294)];
      var $296=(($295)&(255));
      var $297=$296 & 128;
      var $298=(($297) & 255);
      HEAP8[(5256760)]=$298;
      var $299=HEAP8[(5256760)];
      var $300=(($299)&(255));
      var $301=(($300)|(0))==0;
      if ($301) { label = 55; break; } else { label = 56; break; }
    case 55:
      label = 59; break;
    case 56:
      var $304=$mem59;
      var $305=(($304)&(255));
      var $306=((($305)-(1))|0);
      var $307=(($306) & 255);
      HEAP8[(5256676)]=$307;
      var $308=HEAP8[(5256676)];
      var $309=(($308)&(255));
      var $310=((5243752+$309)|0);
      var $311=HEAP8[($310)];
      HEAP8[(5256760)]=$311;
      var $312=HEAP8[(5256760)];
      var $313=(($312)&(255));
      var $314=$mem57;
      var $315=(($314)&(255));
      var $316=(($313)|(0))!=(($315)|(0));
      if ($316) { label = 57; break; } else { label = 58; break; }
    case 57:
      label = 30; break;
    case 58:
      var $319=HEAP8[(5256676)];
      $mem59=$319;
      label = 52; break;
    case 59:
      label = 60; break;
    case 60:
      var $322=$mem57;
      HEAP8[(5256760)]=$322;
      var $323=HEAP8[(5256760)];
      var $324=(($323)&(255));
      var $325=(($324)|(0))==32;
      if ($325) { label = 61; break; } else { label = 62; break; }
    case 61:
      label = 77; break;
    case 62:
      var $328=HEAP8[(5256760)];
      var $329=(($328)&(255));
      var $330=(($329)|(0))==35;
      if ($330) { label = 63; break; } else { label = 64; break; }
    case 63:
      label = 81; break;
    case 64:
      var $333=HEAP8[(5256760)];
      var $334=(($333)&(255));
      var $335=(($334)|(0))==46;
      if ($335) { label = 65; break; } else { label = 66; break; }
    case 65:
      label = 84; break;
    case 66:
      var $338=HEAP8[(5256760)];
      var $339=(($338)&(255));
      var $340=(($339)|(0))==38;
      if ($340) { label = 67; break; } else { label = 68; break; }
    case 67:
      label = 88; break;
    case 68:
      var $343=HEAP8[(5256760)];
      var $344=(($343)&(255));
      var $345=(($344)|(0))==64;
      if ($345) { label = 69; break; } else { label = 70; break; }
    case 69:
      label = 96; break;
    case 70:
      var $348=HEAP8[(5256760)];
      var $349=(($348)&(255));
      var $350=(($349)|(0))==94;
      if ($350) { label = 71; break; } else { label = 72; break; }
    case 71:
      label = 105; break;
    case 72:
      var $353=HEAP8[(5256760)];
      var $354=(($353)&(255));
      var $355=(($354)|(0))==43;
      if ($355) { label = 73; break; } else { label = 74; break; }
    case 73:
      label = 109; break;
    case 74:
      var $358=HEAP8[(5256760)];
      var $359=(($358)&(255));
      var $360=(($359)|(0))==58;
      if ($360) { label = 75; break; } else { label = 76; break; }
    case 75:
      label = 114; break;
    case 76:
      $1=0;
      label = 221; break;
    case 77:
      var $364=$mem59;
      _Code37055($364);
      var $365=HEAP8[(5256760)];
      var $366=(($365)&(255));
      var $367=$366 & 128;
      var $368=(($367) & 255);
      HEAP8[(5256760)]=$368;
      var $369=HEAP8[(5256760)];
      var $370=(($369)&(255));
      var $371=(($370)|(0))!=0;
      if ($371) { label = 78; break; } else { label = 79; break; }
    case 78:
      label = 30; break;
    case 79:
      label = 80; break;
    case 80:
      var $375=HEAP8[(5256676)];
      $mem59=$375;
      label = 51; break;
    case 81:
      var $377=$mem59;
      _Code37055($377);
      var $378=HEAP8[(5256760)];
      var $379=(($378)&(255));
      var $380=$379 & 64;
      var $381=(($380) & 255);
      HEAP8[(5256760)]=$381;
      var $382=HEAP8[(5256760)];
      var $383=(($382)&(255));
      var $384=(($383)|(0))!=0;
      if ($384) { label = 82; break; } else { label = 83; break; }
    case 82:
      label = 80; break;
    case 83:
      label = 30; break;
    case 84:
      var $388=$mem59;
      _Code37055($388);
      var $389=HEAP8[(5256760)];
      var $390=(($389)&(255));
      var $391=$390 & 8;
      var $392=(($391) & 255);
      HEAP8[(5256760)]=$392;
      var $393=HEAP8[(5256760)];
      var $394=(($393)&(255));
      var $395=(($394)|(0))==0;
      if ($395) { label = 85; break; } else { label = 86; break; }
    case 85:
      label = 30; break;
    case 86:
      label = 87; break;
    case 87:
      var $399=HEAP8[(5256676)];
      $mem59=$399;
      label = 51; break;
    case 88:
      var $401=$mem59;
      _Code37055($401);
      var $402=HEAP8[(5256760)];
      var $403=(($402)&(255));
      var $404=$403 & 16;
      var $405=(($404) & 255);
      HEAP8[(5256760)]=$405;
      var $406=HEAP8[(5256760)];
      var $407=(($406)&(255));
      var $408=(($407)|(0))!=0;
      if ($408) { label = 89; break; } else { label = 90; break; }
    case 89:
      label = 87; break;
    case 90:
      var $411=HEAP8[(5256676)];
      var $412=(($411)&(255));
      var $413=((5243752+$412)|0);
      var $414=HEAP8[($413)];
      HEAP8[(5256760)]=$414;
      var $415=HEAP8[(5256760)];
      var $416=(($415)&(255));
      var $417=(($416)|(0))!=72;
      if ($417) { label = 91; break; } else { label = 92; break; }
    case 91:
      label = 30; break;
    case 92:
      var $420=HEAP8[(5256676)];
      var $421=((($420)-(1))&255);
      HEAP8[(5256676)]=$421;
      var $422=HEAP8[(5256676)];
      var $423=(($422)&(255));
      var $424=((5243752+$423)|0);
      var $425=HEAP8[($424)];
      HEAP8[(5256760)]=$425;
      var $426=HEAP8[(5256760)];
      var $427=(($426)&(255));
      var $428=(($427)|(0))==67;
      if ($428) { label = 94; break; } else { label = 93; break; }
    case 93:
      var $430=HEAP8[(5256760)];
      var $431=(($430)&(255));
      var $432=(($431)|(0))==83;
      if ($432) { label = 94; break; } else { label = 95; break; }
    case 94:
      label = 87; break;
    case 95:
      label = 30; break;
    case 96:
      var $436=$mem59;
      _Code37055($436);
      var $437=HEAP8[(5256760)];
      var $438=(($437)&(255));
      var $439=$438 & 4;
      var $440=(($439) & 255);
      HEAP8[(5256760)]=$440;
      var $441=HEAP8[(5256760)];
      var $442=(($441)&(255));
      var $443=(($442)|(0))!=0;
      if ($443) { label = 97; break; } else { label = 98; break; }
    case 97:
      label = 87; break;
    case 98:
      var $446=HEAP8[(5256676)];
      var $447=(($446)&(255));
      var $448=((5243752+$447)|0);
      var $449=HEAP8[($448)];
      HEAP8[(5256760)]=$449;
      var $450=HEAP8[(5256760)];
      var $451=(($450)&(255));
      var $452=(($451)|(0))!=72;
      if ($452) { label = 99; break; } else { label = 100; break; }
    case 99:
      label = 30; break;
    case 100:
      var $455=HEAP8[(5256760)];
      var $456=(($455)&(255));
      var $457=(($456)|(0))!=84;
      if ($457) { label = 101; break; } else { label = 104; break; }
    case 101:
      var $459=HEAP8[(5256760)];
      var $460=(($459)&(255));
      var $461=(($460)|(0))!=67;
      if ($461) { label = 102; break; } else { label = 104; break; }
    case 102:
      var $463=HEAP8[(5256760)];
      var $464=(($463)&(255));
      var $465=(($464)|(0))!=83;
      if ($465) { label = 103; break; } else { label = 104; break; }
    case 103:
      label = 30; break;
    case 104:
      var $468=HEAP8[(5256676)];
      $mem59=$468;
      label = 51; break;
    case 105:
      var $470=$mem59;
      _Code37055($470);
      var $471=HEAP8[(5256760)];
      var $472=(($471)&(255));
      var $473=$472 & 32;
      var $474=(($473) & 255);
      HEAP8[(5256760)]=$474;
      var $475=HEAP8[(5256760)];
      var $476=(($475)&(255));
      var $477=(($476)|(0))==0;
      if ($477) { label = 106; break; } else { label = 107; break; }
    case 106:
      label = 30; break;
    case 107:
      label = 108; break;
    case 108:
      var $481=HEAP8[(5256676)];
      $mem59=$481;
      label = 51; break;
    case 109:
      var $483=$mem59;
      HEAP8[(5256676)]=$483;
      var $484=HEAP8[(5256676)];
      var $485=((($484)-(1))&255);
      HEAP8[(5256676)]=$485;
      var $486=HEAP8[(5256676)];
      var $487=(($486)&(255));
      var $488=((5243752+$487)|0);
      var $489=HEAP8[($488)];
      HEAP8[(5256760)]=$489;
      var $490=HEAP8[(5256760)];
      var $491=(($490)&(255));
      var $492=(($491)|(0))==69;
      if ($492) { label = 112; break; } else { label = 110; break; }
    case 110:
      var $494=HEAP8[(5256760)];
      var $495=(($494)&(255));
      var $496=(($495)|(0))==73;
      if ($496) { label = 112; break; } else { label = 111; break; }
    case 111:
      var $498=HEAP8[(5256760)];
      var $499=(($498)&(255));
      var $500=(($499)|(0))==89;
      if ($500) { label = 112; break; } else { label = 113; break; }
    case 112:
      label = 108; break;
    case 113:
      label = 30; break;
    case 114:
      var $504=$mem59;
      _Code37055($504);
      var $505=HEAP8[(5256760)];
      var $506=(($505)&(255));
      var $507=$506 & 32;
      var $508=(($507) & 255);
      HEAP8[(5256760)]=$508;
      var $509=HEAP8[(5256760)];
      var $510=(($509)&(255));
      var $511=(($510)|(0))==0;
      if ($511) { label = 115; break; } else { label = 116; break; }
    case 115:
      label = 51; break;
    case 116:
      var $514=HEAP8[(5256676)];
      $mem59=$514;
      label = 114; break;
    case 117:
      var $516=$mem58;
      var $517=(($516)&(255));
      var $518=((($517)+(1))|0);
      var $519=(($518) & 255);
      HEAP8[(5256676)]=$519;
      var $520=HEAP8[(5256676)];
      var $521=(($520)&(255));
      var $522=((5243752+$521)|0);
      var $523=HEAP8[($522)];
      HEAP8[(5256760)]=$523;
      var $524=HEAP8[(5256760)];
      var $525=(($524)&(255));
      var $526=(($525)|(0))!=69;
      if ($526) { label = 118; break; } else { label = 119; break; }
    case 118:
      label = 140; break;
    case 119:
      var $529=HEAP8[(5256676)];
      var $530=((($529)+(1))&255);
      HEAP8[(5256676)]=$530;
      var $531=HEAP8[(5256676)];
      var $532=(($531)&(255));
      var $533=((5243752+$532)|0);
      var $534=HEAP8[($533)];
      HEAP8[(5256672)]=$534;
      var $535=HEAP8[(5256676)];
      var $536=((($535)-(1))&255);
      HEAP8[(5256676)]=$536;
      var $537=HEAP8[(5256672)];
      var $538=(($537)&(255));
      var $539=((5243644+$538)|0);
      var $540=HEAP8[($539)];
      var $541=(($540)&(255));
      var $542=$541 & 128;
      var $543=(($542) & 255);
      HEAP8[(5256760)]=$543;
      var $544=HEAP8[(5256760)];
      var $545=(($544)&(255));
      var $546=(($545)|(0))==0;
      if ($546) { label = 120; break; } else { label = 121; break; }
    case 120:
      label = 124; break;
    case 121:
      var $549=HEAP8[(5256676)];
      var $550=((($549)+(1))&255);
      HEAP8[(5256676)]=$550;
      var $551=HEAP8[(5256676)];
      var $552=(($551)&(255));
      var $553=((5243752+$552)|0);
      var $554=HEAP8[($553)];
      HEAP8[(5256760)]=$554;
      var $555=HEAP8[(5256760)];
      var $556=(($555)&(255));
      var $557=(($556)|(0))!=82;
      if ($557) { label = 122; break; } else { label = 123; break; }
    case 122:
      label = 125; break;
    case 123:
      label = 124; break;
    case 124:
      var $561=HEAP8[(5256676)];
      $mem58=$561;
      label = 148; break;
    case 125:
      var $563=HEAP8[(5256760)];
      var $564=(($563)&(255));
      var $565=(($564)|(0))==83;
      if ($565) { label = 127; break; } else { label = 126; break; }
    case 126:
      var $567=HEAP8[(5256760)];
      var $568=(($567)&(255));
      var $569=(($568)|(0))==68;
      if ($569) { label = 127; break; } else { label = 128; break; }
    case 127:
      label = 124; break;
    case 128:
      var $572=HEAP8[(5256760)];
      var $573=(($572)&(255));
      var $574=(($573)|(0))!=76;
      if ($574) { label = 129; break; } else { label = 130; break; }
    case 129:
      label = 133; break;
    case 130:
      var $577=HEAP8[(5256676)];
      var $578=((($577)+(1))&255);
      HEAP8[(5256676)]=$578;
      var $579=HEAP8[(5256676)];
      var $580=(($579)&(255));
      var $581=((5243752+$580)|0);
      var $582=HEAP8[($581)];
      HEAP8[(5256760)]=$582;
      var $583=HEAP8[(5256760)];
      var $584=(($583)&(255));
      var $585=(($584)|(0))!=89;
      if ($585) { label = 131; break; } else { label = 132; break; }
    case 131:
      label = 30; break;
    case 132:
      label = 124; break;
    case 133:
      var $589=HEAP8[(5256760)];
      var $590=(($589)&(255));
      var $591=(($590)|(0))!=70;
      if ($591) { label = 134; break; } else { label = 135; break; }
    case 134:
      label = 30; break;
    case 135:
      var $594=HEAP8[(5256676)];
      var $595=((($594)+(1))&255);
      HEAP8[(5256676)]=$595;
      var $596=HEAP8[(5256676)];
      var $597=(($596)&(255));
      var $598=((5243752+$597)|0);
      var $599=HEAP8[($598)];
      HEAP8[(5256760)]=$599;
      var $600=HEAP8[(5256760)];
      var $601=(($600)&(255));
      var $602=(($601)|(0))!=85;
      if ($602) { label = 136; break; } else { label = 137; break; }
    case 136:
      label = 30; break;
    case 137:
      var $605=HEAP8[(5256676)];
      var $606=((($605)+(1))&255);
      HEAP8[(5256676)]=$606;
      var $607=HEAP8[(5256676)];
      var $608=(($607)&(255));
      var $609=((5243752+$608)|0);
      var $610=HEAP8[($609)];
      HEAP8[(5256760)]=$610;
      var $611=HEAP8[(5256760)];
      var $612=(($611)&(255));
      var $613=(($612)|(0))==76;
      if ($613) { label = 138; break; } else { label = 139; break; }
    case 138:
      label = 124; break;
    case 139:
      label = 30; break;
    case 140:
      var $617=HEAP8[(5256760)];
      var $618=(($617)&(255));
      var $619=(($618)|(0))!=73;
      if ($619) { label = 141; break; } else { label = 142; break; }
    case 141:
      label = 30; break;
    case 142:
      var $622=HEAP8[(5256676)];
      var $623=((($622)+(1))&255);
      HEAP8[(5256676)]=$623;
      var $624=HEAP8[(5256676)];
      var $625=(($624)&(255));
      var $626=((5243752+$625)|0);
      var $627=HEAP8[($626)];
      HEAP8[(5256760)]=$627;
      var $628=HEAP8[(5256760)];
      var $629=(($628)&(255));
      var $630=(($629)|(0))!=78;
      if ($630) { label = 143; break; } else { label = 144; break; }
    case 143:
      label = 30; break;
    case 144:
      var $633=HEAP8[(5256676)];
      var $634=((($633)+(1))&255);
      HEAP8[(5256676)]=$634;
      var $635=HEAP8[(5256676)];
      var $636=(($635)&(255));
      var $637=((5243752+$636)|0);
      var $638=HEAP8[($637)];
      HEAP8[(5256760)]=$638;
      var $639=HEAP8[(5256760)];
      var $640=(($639)&(255));
      var $641=(($640)|(0))==71;
      if ($641) { label = 145; break; } else { label = 146; break; }
    case 145:
      label = 124; break;
    case 146:
      label = 30; break;
    case 147:
      var $645=$mem60;
      HEAP8[(5256760)]=$645;
      var $646=HEAP8[(5256760)];
      $mem58=$646;
      label = 148; break;
    case 148:
      var $648=$mem65;
      var $649=(($648)&(255));
      var $650=((($649)+(1))|0);
      var $651=(($650) & 255);
      HEAP8[(5256672)]=$651;
      var $652=HEAP8[(5256672)];
      var $653=(($652)&(255));
      var $654=$mem64;
      var $655=(($654)&(255));
      var $656=(($653)|(0))==(($655)|(0));
      if ($656) { label = 149; break; } else { label = 150; break; }
    case 149:
      label = 214; break;
    case 150:
      var $659=HEAP8[(5256672)];
      $mem65=$659;
      var $660=$mem62;
      var $661=$mem63;
      var $662=HEAP8[(5256672)];
      var $663=_GetRuleByte($660, $661, $662);
      HEAP8[(5256760)]=$663;
      var $664=HEAP8[(5256760)];
      $mem57=$664;
      var $665=HEAP8[(5256760)];
      HEAP8[(5256676)]=$665;
      var $666=HEAP8[(5256676)];
      var $667=(($666)&(255));
      var $668=((5243644+$667)|0);
      var $669=HEAP8[($668)];
      var $670=(($669)&(255));
      var $671=$670 & 128;
      var $672=(($671) & 255);
      HEAP8[(5256760)]=$672;
      var $673=HEAP8[(5256760)];
      var $674=(($673)&(255));
      var $675=(($674)|(0))==0;
      if ($675) { label = 151; break; } else { label = 152; break; }
    case 151:
      label = 155; break;
    case 152:
      var $678=$mem58;
      var $679=(($678)&(255));
      var $680=((($679)+(1))|0);
      var $681=(($680) & 255);
      HEAP8[(5256676)]=$681;
      var $682=HEAP8[(5256676)];
      var $683=(($682)&(255));
      var $684=((5243752+$683)|0);
      var $685=HEAP8[($684)];
      HEAP8[(5256760)]=$685;
      var $686=HEAP8[(5256760)];
      var $687=(($686)&(255));
      var $688=$mem57;
      var $689=(($688)&(255));
      var $690=(($687)|(0))!=(($689)|(0));
      if ($690) { label = 153; break; } else { label = 154; break; }
    case 153:
      label = 30; break;
    case 154:
      var $693=HEAP8[(5256676)];
      $mem58=$693;
      label = 148; break;
    case 155:
      var $695=$mem57;
      HEAP8[(5256760)]=$695;
      var $696=HEAP8[(5256760)];
      var $697=(($696)&(255));
      var $698=(($697)|(0))==32;
      if ($698) { label = 156; break; } else { label = 157; break; }
    case 156:
      label = 174; break;
    case 157:
      var $701=HEAP8[(5256760)];
      var $702=(($701)&(255));
      var $703=(($702)|(0))==35;
      if ($703) { label = 158; break; } else { label = 159; break; }
    case 158:
      label = 178; break;
    case 159:
      var $706=HEAP8[(5256760)];
      var $707=(($706)&(255));
      var $708=(($707)|(0))==46;
      if ($708) { label = 160; break; } else { label = 161; break; }
    case 160:
      label = 181; break;
    case 161:
      var $711=HEAP8[(5256760)];
      var $712=(($711)&(255));
      var $713=(($712)|(0))==38;
      if ($713) { label = 162; break; } else { label = 163; break; }
    case 162:
      label = 185; break;
    case 163:
      var $716=HEAP8[(5256760)];
      var $717=(($716)&(255));
      var $718=(($717)|(0))==64;
      if ($718) { label = 164; break; } else { label = 165; break; }
    case 164:
      label = 193; break;
    case 165:
      var $721=HEAP8[(5256760)];
      var $722=(($721)&(255));
      var $723=(($722)|(0))==94;
      if ($723) { label = 166; break; } else { label = 167; break; }
    case 166:
      label = 202; break;
    case 167:
      var $726=HEAP8[(5256760)];
      var $727=(($726)&(255));
      var $728=(($727)|(0))==43;
      if ($728) { label = 168; break; } else { label = 169; break; }
    case 168:
      label = 206; break;
    case 169:
      var $731=HEAP8[(5256760)];
      var $732=(($731)&(255));
      var $733=(($732)|(0))==58;
      if ($733) { label = 170; break; } else { label = 171; break; }
    case 170:
      label = 211; break;
    case 171:
      var $736=HEAP8[(5256760)];
      var $737=(($736)&(255));
      var $738=(($737)|(0))==37;
      if ($738) { label = 172; break; } else { label = 173; break; }
    case 172:
      label = 117; break;
    case 173:
      $1=0;
      label = 221; break;
    case 174:
      var $742=$mem58;
      _Code37066($742);
      var $743=HEAP8[(5256760)];
      var $744=(($743)&(255));
      var $745=$744 & 128;
      var $746=(($745) & 255);
      HEAP8[(5256760)]=$746;
      var $747=HEAP8[(5256760)];
      var $748=(($747)&(255));
      var $749=(($748)|(0))!=0;
      if ($749) { label = 175; break; } else { label = 176; break; }
    case 175:
      label = 30; break;
    case 176:
      label = 177; break;
    case 177:
      var $753=HEAP8[(5256676)];
      $mem58=$753;
      label = 148; break;
    case 178:
      var $755=$mem58;
      _Code37066($755);
      var $756=HEAP8[(5256760)];
      var $757=(($756)&(255));
      var $758=$757 & 64;
      var $759=(($758) & 255);
      HEAP8[(5256760)]=$759;
      var $760=HEAP8[(5256760)];
      var $761=(($760)&(255));
      var $762=(($761)|(0))!=0;
      if ($762) { label = 179; break; } else { label = 180; break; }
    case 179:
      label = 177; break;
    case 180:
      label = 30; break;
    case 181:
      var $766=$mem58;
      _Code37066($766);
      var $767=HEAP8[(5256760)];
      var $768=(($767)&(255));
      var $769=$768 & 8;
      var $770=(($769) & 255);
      HEAP8[(5256760)]=$770;
      var $771=HEAP8[(5256760)];
      var $772=(($771)&(255));
      var $773=(($772)|(0))==0;
      if ($773) { label = 182; break; } else { label = 183; break; }
    case 182:
      label = 30; break;
    case 183:
      label = 184; break;
    case 184:
      var $777=HEAP8[(5256676)];
      $mem58=$777;
      label = 148; break;
    case 185:
      var $779=$mem58;
      _Code37066($779);
      var $780=HEAP8[(5256760)];
      var $781=(($780)&(255));
      var $782=$781 & 16;
      var $783=(($782) & 255);
      HEAP8[(5256760)]=$783;
      var $784=HEAP8[(5256760)];
      var $785=(($784)&(255));
      var $786=(($785)|(0))!=0;
      if ($786) { label = 186; break; } else { label = 187; break; }
    case 186:
      label = 184; break;
    case 187:
      var $789=HEAP8[(5256676)];
      var $790=(($789)&(255));
      var $791=((5243752+$790)|0);
      var $792=HEAP8[($791)];
      HEAP8[(5256760)]=$792;
      var $793=HEAP8[(5256760)];
      var $794=(($793)&(255));
      var $795=(($794)|(0))!=72;
      if ($795) { label = 188; break; } else { label = 189; break; }
    case 188:
      label = 30; break;
    case 189:
      var $798=HEAP8[(5256676)];
      var $799=((($798)+(1))&255);
      HEAP8[(5256676)]=$799;
      var $800=HEAP8[(5256676)];
      var $801=(($800)&(255));
      var $802=((5243752+$801)|0);
      var $803=HEAP8[($802)];
      HEAP8[(5256760)]=$803;
      var $804=HEAP8[(5256760)];
      var $805=(($804)&(255));
      var $806=(($805)|(0))==67;
      if ($806) { label = 191; break; } else { label = 190; break; }
    case 190:
      var $808=HEAP8[(5256760)];
      var $809=(($808)&(255));
      var $810=(($809)|(0))==83;
      if ($810) { label = 191; break; } else { label = 192; break; }
    case 191:
      label = 184; break;
    case 192:
      label = 30; break;
    case 193:
      var $814=$mem58;
      _Code37066($814);
      var $815=HEAP8[(5256760)];
      var $816=(($815)&(255));
      var $817=$816 & 4;
      var $818=(($817) & 255);
      HEAP8[(5256760)]=$818;
      var $819=HEAP8[(5256760)];
      var $820=(($819)&(255));
      var $821=(($820)|(0))!=0;
      if ($821) { label = 194; break; } else { label = 195; break; }
    case 194:
      label = 184; break;
    case 195:
      var $824=HEAP8[(5256676)];
      var $825=(($824)&(255));
      var $826=((5243752+$825)|0);
      var $827=HEAP8[($826)];
      HEAP8[(5256760)]=$827;
      var $828=HEAP8[(5256760)];
      var $829=(($828)&(255));
      var $830=(($829)|(0))!=72;
      if ($830) { label = 196; break; } else { label = 197; break; }
    case 196:
      label = 30; break;
    case 197:
      var $833=HEAP8[(5256760)];
      var $834=(($833)&(255));
      var $835=(($834)|(0))!=84;
      if ($835) { label = 198; break; } else { label = 201; break; }
    case 198:
      var $837=HEAP8[(5256760)];
      var $838=(($837)&(255));
      var $839=(($838)|(0))!=67;
      if ($839) { label = 199; break; } else { label = 201; break; }
    case 199:
      var $841=HEAP8[(5256760)];
      var $842=(($841)&(255));
      var $843=(($842)|(0))!=83;
      if ($843) { label = 200; break; } else { label = 201; break; }
    case 200:
      label = 30; break;
    case 201:
      var $846=HEAP8[(5256676)];
      $mem58=$846;
      label = 148; break;
    case 202:
      var $848=$mem58;
      _Code37066($848);
      var $849=HEAP8[(5256760)];
      var $850=(($849)&(255));
      var $851=$850 & 32;
      var $852=(($851) & 255);
      HEAP8[(5256760)]=$852;
      var $853=HEAP8[(5256760)];
      var $854=(($853)&(255));
      var $855=(($854)|(0))==0;
      if ($855) { label = 203; break; } else { label = 204; break; }
    case 203:
      label = 30; break;
    case 204:
      label = 205; break;
    case 205:
      var $859=HEAP8[(5256676)];
      $mem58=$859;
      label = 148; break;
    case 206:
      var $861=$mem58;
      HEAP8[(5256676)]=$861;
      var $862=HEAP8[(5256676)];
      var $863=((($862)+(1))&255);
      HEAP8[(5256676)]=$863;
      var $864=HEAP8[(5256676)];
      var $865=(($864)&(255));
      var $866=((5243752+$865)|0);
      var $867=HEAP8[($866)];
      HEAP8[(5256760)]=$867;
      var $868=HEAP8[(5256760)];
      var $869=(($868)&(255));
      var $870=(($869)|(0))==69;
      if ($870) { label = 209; break; } else { label = 207; break; }
    case 207:
      var $872=HEAP8[(5256760)];
      var $873=(($872)&(255));
      var $874=(($873)|(0))==73;
      if ($874) { label = 209; break; } else { label = 208; break; }
    case 208:
      var $876=HEAP8[(5256760)];
      var $877=(($876)&(255));
      var $878=(($877)|(0))==89;
      if ($878) { label = 209; break; } else { label = 210; break; }
    case 209:
      label = 205; break;
    case 210:
      label = 30; break;
    case 211:
      var $882=$mem58;
      _Code37066($882);
      var $883=HEAP8[(5256760)];
      var $884=(($883)&(255));
      var $885=$884 & 32;
      var $886=(($885) & 255);
      HEAP8[(5256760)]=$886;
      var $887=HEAP8[(5256760)];
      var $888=(($887)&(255));
      var $889=(($888)|(0))==0;
      if ($889) { label = 212; break; } else { label = 213; break; }
    case 212:
      label = 148; break;
    case 213:
      var $892=HEAP8[(5256676)];
      $mem58=$892;
      label = 211; break;
    case 214:
      var $894=$mem64;
      HEAP8[(5256672)]=$894;
      var $895=$mem60;
      $mem61=$895;
      label = 215; break;
    case 215:
      var $897=$mem62;
      var $898=$mem63;
      var $899=HEAP8[(5256672)];
      var $900=_GetRuleByte($897, $898, $899);
      HEAP8[(5256760)]=$900;
      var $901=HEAP8[(5256760)];
      $mem57=$901;
      var $902=HEAP8[(5256760)];
      var $903=(($902)&(255));
      var $904=$903 & 127;
      var $905=(($904) & 255);
      HEAP8[(5256760)]=$905;
      var $906=HEAP8[(5256760)];
      var $907=(($906)&(255));
      var $908=(($907)|(0))!=61;
      if ($908) { label = 216; break; } else { label = 217; break; }
    case 216:
      var $910=$mem56;
      var $911=((($910)+(1))&255);
      $mem56=$911;
      var $912=$mem56;
      HEAP8[(5256676)]=$912;
      var $913=HEAP8[(5256760)];
      var $914=HEAP8[(5256676)];
      var $915=(($914)&(255));
      var $916=$2;
      var $917=(($916+$915)|0);
      HEAP8[($917)]=$913;
      label = 217; break;
    case 217:
      var $919=$mem57;
      var $920=(($919)&(255));
      var $921=$920 & 128;
      var $922=(($921)|(0))==0;
      if ($922) { label = 218; break; } else { label = 219; break; }
    case 218:
      label = 220; break;
    case 219:
      label = 11; break;
    case 220:
      var $926=HEAP8[(5256672)];
      var $927=((($926)+(1))&255);
      HEAP8[(5256672)]=$927;
      label = 215; break;
    case 221:
      var $929=$1;
      return $929;
    default: assert(0, "bad label: " + label);
  }
}
Module["_TextToPhonemes"] = _TextToPhonemes;
function _malloc($bytes) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $mem;
      var $nb;
      var $idx;
      var $smallbits;
      var $b;
      var $p;
      var $F;
      var $b1;
      var $p2;
      var $r;
      var $rsize;
      var $i;
      var $leftbits;
      var $leastbit;
      var $Y;
      var $K;
      var $N;
      var $F3;
      var $DVS;
      var $DV;
      var $I;
      var $B;
      var $F4;
      var $rsize5;
      var $p6;
      var $r7;
      var $dvs;
      var $rsize8;
      var $p9;
      var $r10;
      $1=$bytes;
      var $2=$1;
      var $3=(($2)>>>(0)) <= 244;
      if ($3) { label = 2; break; } else { label = 41; break; }
    case 2:
      var $5=$1;
      var $6=(($5)>>>(0)) < 11;
      if ($6) { label = 3; break; } else { label = 4; break; }
    case 3:
      var $14 = 16;label = 5; break;
    case 4:
      var $9=$1;
      var $10=((($9)+(4))|0);
      var $11=((($10)+(7))|0);
      var $12=$11 & -8;
      var $14 = $12;label = 5; break;
    case 5:
      var $14;
      $nb=$14;
      var $15=$nb;
      var $16=$15 >>> 3;
      $idx=$16;
      var $17=HEAP32[((((5256200)|0))>>2)];
      var $18=$idx;
      var $19=$17 >>> (($18)>>>(0));
      $smallbits=$19;
      var $20=$smallbits;
      var $21=$20 & 3;
      var $22=(($21)|(0))!=0;
      if ($22) { label = 6; break; } else { label = 15; break; }
    case 6:
      var $24=$smallbits;
      var $25=$24 ^ -1;
      var $26=$25 & 1;
      var $27=$idx;
      var $28=((($27)+($26))|0);
      $idx=$28;
      var $29=$idx;
      var $30=$29 << 1;
      var $31=((((5256240)|0)+($30<<2))|0);
      var $32=$31;
      var $33=$32;
      $b=$33;
      var $34=$b;
      var $35=(($34+8)|0);
      var $36=HEAP32[(($35)>>2)];
      $p=$36;
      var $37=$p;
      var $38=(($37+8)|0);
      var $39=HEAP32[(($38)>>2)];
      $F=$39;
      var $40=$b;
      var $41=$F;
      var $42=(($40)|(0))==(($41)|(0));
      if ($42) { label = 7; break; } else { label = 8; break; }
    case 7:
      var $44=$idx;
      var $45=1 << $44;
      var $46=$45 ^ -1;
      var $47=HEAP32[((((5256200)|0))>>2)];
      var $48=$47 & $46;
      HEAP32[((((5256200)|0))>>2)]=$48;
      label = 14; break;
    case 8:
      var $50=$F;
      var $51=$50;
      var $52=HEAP32[((((5256216)|0))>>2)];
      var $53=(($51)>>>(0)) >= (($52)>>>(0));
      if ($53) { label = 9; break; } else { var $61 = 0;label = 10; break; }
    case 9:
      var $55=$F;
      var $56=(($55+12)|0);
      var $57=HEAP32[(($56)>>2)];
      var $58=$p;
      var $59=(($57)|(0))==(($58)|(0));
      var $61 = $59;label = 10; break;
    case 10:
      var $61;
      var $62=(($61)&(1));
      var $63=($62);
      var $64=(($63)|(0))!=0;
      if ($64) { label = 11; break; } else { label = 12; break; }
    case 11:
      var $66=$b;
      var $67=$F;
      var $68=(($67+12)|0);
      HEAP32[(($68)>>2)]=$66;
      var $69=$F;
      var $70=$b;
      var $71=(($70+8)|0);
      HEAP32[(($71)>>2)]=$69;
      label = 13; break;
    case 12:
      _abort();
      throw "Reached an unreachable!"
    case 13:
      label = 14; break;
    case 14:
      var $75=$idx;
      var $76=$75 << 3;
      var $77=$76 | 1;
      var $78=$77 | 2;
      var $79=$p;
      var $80=(($79+4)|0);
      HEAP32[(($80)>>2)]=$78;
      var $81=$p;
      var $82=$81;
      var $83=$idx;
      var $84=$83 << 3;
      var $85=(($82+$84)|0);
      var $86=$85;
      var $87=(($86+4)|0);
      var $88=HEAP32[(($87)>>2)];
      var $89=$88 | 1;
      HEAP32[(($87)>>2)]=$89;
      var $90=$p;
      var $91=$90;
      var $92=(($91+8)|0);
      $mem=$92;
      label = 57; break;
    case 15:
      var $94=$nb;
      var $95=HEAP32[((((5256208)|0))>>2)];
      var $96=(($94)>>>(0)) > (($95)>>>(0));
      if ($96) { label = 16; break; } else { label = 39; break; }
    case 16:
      var $98=$smallbits;
      var $99=(($98)|(0))!=0;
      if ($99) { label = 17; break; } else { label = 34; break; }
    case 17:
      var $101=$smallbits;
      var $102=$idx;
      var $103=$101 << $102;
      var $104=$idx;
      var $105=1 << $104;
      var $106=$105 << 1;
      var $107=$idx;
      var $108=1 << $107;
      var $109=$108 << 1;
      var $110=(((-$109))|0);
      var $111=$106 | $110;
      var $112=$103 & $111;
      $leftbits=$112;
      var $113=$leftbits;
      var $114=$leftbits;
      var $115=(((-$114))|0);
      var $116=$113 & $115;
      $leastbit=$116;
      var $117=$leastbit;
      var $118=((($117)-(1))|0);
      $Y=$118;
      var $119=$Y;
      var $120=$119 >>> 12;
      var $121=$120 & 16;
      $K=$121;
      var $122=$K;
      $N=$122;
      var $123=$K;
      var $124=$Y;
      var $125=$124 >>> (($123)>>>(0));
      $Y=$125;
      var $126=$Y;
      var $127=$126 >>> 5;
      var $128=$127 & 8;
      $K=$128;
      var $129=$N;
      var $130=((($129)+($128))|0);
      $N=$130;
      var $131=$K;
      var $132=$Y;
      var $133=$132 >>> (($131)>>>(0));
      $Y=$133;
      var $134=$Y;
      var $135=$134 >>> 2;
      var $136=$135 & 4;
      $K=$136;
      var $137=$N;
      var $138=((($137)+($136))|0);
      $N=$138;
      var $139=$K;
      var $140=$Y;
      var $141=$140 >>> (($139)>>>(0));
      $Y=$141;
      var $142=$Y;
      var $143=$142 >>> 1;
      var $144=$143 & 2;
      $K=$144;
      var $145=$N;
      var $146=((($145)+($144))|0);
      $N=$146;
      var $147=$K;
      var $148=$Y;
      var $149=$148 >>> (($147)>>>(0));
      $Y=$149;
      var $150=$Y;
      var $151=$150 >>> 1;
      var $152=$151 & 1;
      $K=$152;
      var $153=$N;
      var $154=((($153)+($152))|0);
      $N=$154;
      var $155=$K;
      var $156=$Y;
      var $157=$156 >>> (($155)>>>(0));
      $Y=$157;
      var $158=$N;
      var $159=$Y;
      var $160=((($158)+($159))|0);
      $i=$160;
      var $161=$i;
      var $162=$161 << 1;
      var $163=((((5256240)|0)+($162<<2))|0);
      var $164=$163;
      var $165=$164;
      $b1=$165;
      var $166=$b1;
      var $167=(($166+8)|0);
      var $168=HEAP32[(($167)>>2)];
      $p2=$168;
      var $169=$p2;
      var $170=(($169+8)|0);
      var $171=HEAP32[(($170)>>2)];
      $F3=$171;
      var $172=$b1;
      var $173=$F3;
      var $174=(($172)|(0))==(($173)|(0));
      if ($174) { label = 18; break; } else { label = 19; break; }
    case 18:
      var $176=$i;
      var $177=1 << $176;
      var $178=$177 ^ -1;
      var $179=HEAP32[((((5256200)|0))>>2)];
      var $180=$179 & $178;
      HEAP32[((((5256200)|0))>>2)]=$180;
      label = 25; break;
    case 19:
      var $182=$F3;
      var $183=$182;
      var $184=HEAP32[((((5256216)|0))>>2)];
      var $185=(($183)>>>(0)) >= (($184)>>>(0));
      if ($185) { label = 20; break; } else { var $193 = 0;label = 21; break; }
    case 20:
      var $187=$F3;
      var $188=(($187+12)|0);
      var $189=HEAP32[(($188)>>2)];
      var $190=$p2;
      var $191=(($189)|(0))==(($190)|(0));
      var $193 = $191;label = 21; break;
    case 21:
      var $193;
      var $194=(($193)&(1));
      var $195=($194);
      var $196=(($195)|(0))!=0;
      if ($196) { label = 22; break; } else { label = 23; break; }
    case 22:
      var $198=$b1;
      var $199=$F3;
      var $200=(($199+12)|0);
      HEAP32[(($200)>>2)]=$198;
      var $201=$F3;
      var $202=$b1;
      var $203=(($202+8)|0);
      HEAP32[(($203)>>2)]=$201;
      label = 24; break;
    case 23:
      _abort();
      throw "Reached an unreachable!"
    case 24:
      label = 25; break;
    case 25:
      var $207=$i;
      var $208=$207 << 3;
      var $209=$nb;
      var $210=((($208)-($209))|0);
      $rsize=$210;
      var $211=$nb;
      var $212=$211 | 1;
      var $213=$212 | 2;
      var $214=$p2;
      var $215=(($214+4)|0);
      HEAP32[(($215)>>2)]=$213;
      var $216=$p2;
      var $217=$216;
      var $218=$nb;
      var $219=(($217+$218)|0);
      var $220=$219;
      $r=$220;
      var $221=$rsize;
      var $222=$221 | 1;
      var $223=$r;
      var $224=(($223+4)|0);
      HEAP32[(($224)>>2)]=$222;
      var $225=$rsize;
      var $226=$r;
      var $227=$226;
      var $228=$rsize;
      var $229=(($227+$228)|0);
      var $230=$229;
      var $231=(($230)|0);
      HEAP32[(($231)>>2)]=$225;
      var $232=HEAP32[((((5256208)|0))>>2)];
      $DVS=$232;
      var $233=$DVS;
      var $234=(($233)|(0))!=0;
      if ($234) { label = 26; break; } else { label = 33; break; }
    case 26:
      var $236=HEAP32[((((5256220)|0))>>2)];
      $DV=$236;
      var $237=$DVS;
      var $238=$237 >>> 3;
      $I=$238;
      var $239=$I;
      var $240=$239 << 1;
      var $241=((((5256240)|0)+($240<<2))|0);
      var $242=$241;
      var $243=$242;
      $B=$243;
      var $244=$B;
      $F4=$244;
      var $245=HEAP32[((((5256200)|0))>>2)];
      var $246=$I;
      var $247=1 << $246;
      var $248=$245 & $247;
      var $249=(($248)|(0))!=0;
      if ($249) { label = 28; break; } else { label = 27; break; }
    case 27:
      var $251=$I;
      var $252=1 << $251;
      var $253=HEAP32[((((5256200)|0))>>2)];
      var $254=$253 | $252;
      HEAP32[((((5256200)|0))>>2)]=$254;
      label = 32; break;
    case 28:
      var $256=$B;
      var $257=(($256+8)|0);
      var $258=HEAP32[(($257)>>2)];
      var $259=$258;
      var $260=HEAP32[((((5256216)|0))>>2)];
      var $261=(($259)>>>(0)) >= (($260)>>>(0));
      var $262=(($261)&(1));
      var $263=($262);
      var $264=(($263)|(0))!=0;
      if ($264) { label = 29; break; } else { label = 30; break; }
    case 29:
      var $266=$B;
      var $267=(($266+8)|0);
      var $268=HEAP32[(($267)>>2)];
      $F4=$268;
      label = 31; break;
    case 30:
      _abort();
      throw "Reached an unreachable!"
    case 31:
      label = 32; break;
    case 32:
      var $272=$DV;
      var $273=$B;
      var $274=(($273+8)|0);
      HEAP32[(($274)>>2)]=$272;
      var $275=$DV;
      var $276=$F4;
      var $277=(($276+12)|0);
      HEAP32[(($277)>>2)]=$275;
      var $278=$F4;
      var $279=$DV;
      var $280=(($279+8)|0);
      HEAP32[(($280)>>2)]=$278;
      var $281=$B;
      var $282=$DV;
      var $283=(($282+12)|0);
      HEAP32[(($283)>>2)]=$281;
      label = 33; break;
    case 33:
      var $285=$rsize;
      HEAP32[((((5256208)|0))>>2)]=$285;
      var $286=$r;
      HEAP32[((((5256220)|0))>>2)]=$286;
      var $287=$p2;
      var $288=$287;
      var $289=(($288+8)|0);
      $mem=$289;
      label = 57; break;
    case 34:
      var $291=HEAP32[((((5256204)|0))>>2)];
      var $292=(($291)|(0))!=0;
      if ($292) { label = 35; break; } else { label = 37; break; }
    case 35:
      var $294=$nb;
      var $295=_tmalloc_small(5256200, $294);
      $mem=$295;
      var $296=(($295)|(0))!=0;
      if ($296) { label = 36; break; } else { label = 37; break; }
    case 36:
      label = 57; break;
    case 37:
      label = 38; break;
    case 38:
      label = 39; break;
    case 39:
      label = 40; break;
    case 40:
      label = 48; break;
    case 41:
      var $303=$1;
      var $304=(($303)>>>(0)) >= 4294967232;
      if ($304) { label = 42; break; } else { label = 43; break; }
    case 42:
      $nb=-1;
      label = 47; break;
    case 43:
      var $307=$1;
      var $308=((($307)+(4))|0);
      var $309=((($308)+(7))|0);
      var $310=$309 & -8;
      $nb=$310;
      var $311=HEAP32[((((5256204)|0))>>2)];
      var $312=(($311)|(0))!=0;
      if ($312) { label = 44; break; } else { label = 46; break; }
    case 44:
      var $314=$nb;
      var $315=_tmalloc_large(5256200, $314);
      $mem=$315;
      var $316=(($315)|(0))!=0;
      if ($316) { label = 45; break; } else { label = 46; break; }
    case 45:
      label = 57; break;
    case 46:
      label = 47; break;
    case 47:
      label = 48; break;
    case 48:
      var $321=$nb;
      var $322=HEAP32[((((5256208)|0))>>2)];
      var $323=(($321)>>>(0)) <= (($322)>>>(0));
      if ($323) { label = 49; break; } else { label = 53; break; }
    case 49:
      var $325=HEAP32[((((5256208)|0))>>2)];
      var $326=$nb;
      var $327=((($325)-($326))|0);
      $rsize5=$327;
      var $328=HEAP32[((((5256220)|0))>>2)];
      $p6=$328;
      var $329=$rsize5;
      var $330=(($329)>>>(0)) >= 16;
      if ($330) { label = 50; break; } else { label = 51; break; }
    case 50:
      var $332=$p6;
      var $333=$332;
      var $334=$nb;
      var $335=(($333+$334)|0);
      var $336=$335;
      HEAP32[((((5256220)|0))>>2)]=$336;
      $r7=$336;
      var $337=$rsize5;
      HEAP32[((((5256208)|0))>>2)]=$337;
      var $338=$rsize5;
      var $339=$338 | 1;
      var $340=$r7;
      var $341=(($340+4)|0);
      HEAP32[(($341)>>2)]=$339;
      var $342=$rsize5;
      var $343=$r7;
      var $344=$343;
      var $345=$rsize5;
      var $346=(($344+$345)|0);
      var $347=$346;
      var $348=(($347)|0);
      HEAP32[(($348)>>2)]=$342;
      var $349=$nb;
      var $350=$349 | 1;
      var $351=$350 | 2;
      var $352=$p6;
      var $353=(($352+4)|0);
      HEAP32[(($353)>>2)]=$351;
      label = 52; break;
    case 51:
      var $355=HEAP32[((((5256208)|0))>>2)];
      $dvs=$355;
      HEAP32[((((5256208)|0))>>2)]=0;
      HEAP32[((((5256220)|0))>>2)]=0;
      var $356=$dvs;
      var $357=$356 | 1;
      var $358=$357 | 2;
      var $359=$p6;
      var $360=(($359+4)|0);
      HEAP32[(($360)>>2)]=$358;
      var $361=$p6;
      var $362=$361;
      var $363=$dvs;
      var $364=(($362+$363)|0);
      var $365=$364;
      var $366=(($365+4)|0);
      var $367=HEAP32[(($366)>>2)];
      var $368=$367 | 1;
      HEAP32[(($366)>>2)]=$368;
      label = 52; break;
    case 52:
      var $370=$p6;
      var $371=$370;
      var $372=(($371+8)|0);
      $mem=$372;
      label = 57; break;
    case 53:
      var $374=$nb;
      var $375=HEAP32[((((5256212)|0))>>2)];
      var $376=(($374)>>>(0)) < (($375)>>>(0));
      if ($376) { label = 54; break; } else { label = 55; break; }
    case 54:
      var $378=$nb;
      var $379=HEAP32[((((5256212)|0))>>2)];
      var $380=((($379)-($378))|0);
      HEAP32[((((5256212)|0))>>2)]=$380;
      $rsize8=$380;
      var $381=HEAP32[((((5256224)|0))>>2)];
      $p9=$381;
      var $382=$p9;
      var $383=$382;
      var $384=$nb;
      var $385=(($383+$384)|0);
      var $386=$385;
      HEAP32[((((5256224)|0))>>2)]=$386;
      $r10=$386;
      var $387=$rsize8;
      var $388=$387 | 1;
      var $389=$r10;
      var $390=(($389+4)|0);
      HEAP32[(($390)>>2)]=$388;
      var $391=$nb;
      var $392=$391 | 1;
      var $393=$392 | 2;
      var $394=$p9;
      var $395=(($394+4)|0);
      HEAP32[(($395)>>2)]=$393;
      var $396=$p9;
      var $397=$396;
      var $398=(($397+8)|0);
      $mem=$398;
      label = 57; break;
    case 55:
      label = 56; break;
    case 56:
      var $401=$nb;
      var $402=_sys_alloc(5256200, $401);
      $mem=$402;
      label = 57; break;
    case 57:
      var $404=$mem;
      return $404;
    default: assert(0, "bad label: " + label);
  }
}
function _tmalloc_small($m, $nb) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $t;
      var $v;
      var $rsize;
      var $i;
      var $leastbit;
      var $Y;
      var $K;
      var $N;
      var $trem;
      var $r;
      var $XP;
      var $R;
      var $F;
      var $RP;
      var $CP;
      var $H;
      var $C0;
      var $C1;
      var $DVS;
      var $DV;
      var $I;
      var $B;
      var $F1;
      $1=$m;
      $2=$nb;
      var $3=$1;
      var $4=(($3+4)|0);
      var $5=HEAP32[(($4)>>2)];
      var $6=$1;
      var $7=(($6+4)|0);
      var $8=HEAP32[(($7)>>2)];
      var $9=(((-$8))|0);
      var $10=$5 & $9;
      $leastbit=$10;
      var $11=$leastbit;
      var $12=((($11)-(1))|0);
      $Y=$12;
      var $13=$Y;
      var $14=$13 >>> 12;
      var $15=$14 & 16;
      $K=$15;
      var $16=$K;
      $N=$16;
      var $17=$K;
      var $18=$Y;
      var $19=$18 >>> (($17)>>>(0));
      $Y=$19;
      var $20=$Y;
      var $21=$20 >>> 5;
      var $22=$21 & 8;
      $K=$22;
      var $23=$N;
      var $24=((($23)+($22))|0);
      $N=$24;
      var $25=$K;
      var $26=$Y;
      var $27=$26 >>> (($25)>>>(0));
      $Y=$27;
      var $28=$Y;
      var $29=$28 >>> 2;
      var $30=$29 & 4;
      $K=$30;
      var $31=$N;
      var $32=((($31)+($30))|0);
      $N=$32;
      var $33=$K;
      var $34=$Y;
      var $35=$34 >>> (($33)>>>(0));
      $Y=$35;
      var $36=$Y;
      var $37=$36 >>> 1;
      var $38=$37 & 2;
      $K=$38;
      var $39=$N;
      var $40=((($39)+($38))|0);
      $N=$40;
      var $41=$K;
      var $42=$Y;
      var $43=$42 >>> (($41)>>>(0));
      $Y=$43;
      var $44=$Y;
      var $45=$44 >>> 1;
      var $46=$45 & 1;
      $K=$46;
      var $47=$N;
      var $48=((($47)+($46))|0);
      $N=$48;
      var $49=$K;
      var $50=$Y;
      var $51=$50 >>> (($49)>>>(0));
      $Y=$51;
      var $52=$N;
      var $53=$Y;
      var $54=((($52)+($53))|0);
      $i=$54;
      var $55=$i;
      var $56=$1;
      var $57=(($56+304)|0);
      var $58=(($57+($55<<2))|0);
      var $59=HEAP32[(($58)>>2)];
      $t=$59;
      $v=$59;
      var $60=$t;
      var $61=(($60+4)|0);
      var $62=HEAP32[(($61)>>2)];
      var $63=$62 & -8;
      var $64=$2;
      var $65=((($63)-($64))|0);
      $rsize=$65;
      label = 2; break;
    case 2:
      var $67=$t;
      var $68=(($67+16)|0);
      var $69=(($68)|0);
      var $70=HEAP32[(($69)>>2)];
      var $71=(($70)|(0))!=0;
      if ($71) { label = 3; break; } else { label = 4; break; }
    case 3:
      var $73=$t;
      var $74=(($73+16)|0);
      var $75=(($74)|0);
      var $76=HEAP32[(($75)>>2)];
      var $83 = $76;label = 5; break;
    case 4:
      var $78=$t;
      var $79=(($78+16)|0);
      var $80=(($79+4)|0);
      var $81=HEAP32[(($80)>>2)];
      var $83 = $81;label = 5; break;
    case 5:
      var $83;
      $t=$83;
      var $84=(($83)|(0))!=0;
      if ($84) { label = 6; break; } else { label = 9; break; }
    case 6:
      var $86=$t;
      var $87=(($86+4)|0);
      var $88=HEAP32[(($87)>>2)];
      var $89=$88 & -8;
      var $90=$2;
      var $91=((($89)-($90))|0);
      $trem=$91;
      var $92=$trem;
      var $93=$rsize;
      var $94=(($92)>>>(0)) < (($93)>>>(0));
      if ($94) { label = 7; break; } else { label = 8; break; }
    case 7:
      var $96=$trem;
      $rsize=$96;
      var $97=$t;
      $v=$97;
      label = 8; break;
    case 8:
      label = 2; break;
    case 9:
      var $100=$v;
      var $101=$100;
      var $102=$1;
      var $103=(($102+16)|0);
      var $104=HEAP32[(($103)>>2)];
      var $105=(($101)>>>(0)) >= (($104)>>>(0));
      var $106=(($105)&(1));
      var $107=($106);
      var $108=(($107)|(0))!=0;
      if ($108) { label = 10; break; } else { label = 72; break; }
    case 10:
      var $110=$v;
      var $111=$110;
      var $112=$2;
      var $113=(($111+$112)|0);
      var $114=$113;
      $r=$114;
      var $115=$v;
      var $116=$115;
      var $117=$r;
      var $118=$117;
      var $119=(($116)>>>(0)) < (($118)>>>(0));
      var $120=(($119)&(1));
      var $121=($120);
      var $122=(($121)|(0))!=0;
      if ($122) { label = 11; break; } else { label = 71; break; }
    case 11:
      var $124=$v;
      var $125=(($124+24)|0);
      var $126=HEAP32[(($125)>>2)];
      $XP=$126;
      var $127=$v;
      var $128=(($127+12)|0);
      var $129=HEAP32[(($128)>>2)];
      var $130=$v;
      var $131=(($129)|(0))!=(($130)|(0));
      if ($131) { label = 12; break; } else { label = 19; break; }
    case 12:
      var $133=$v;
      var $134=(($133+8)|0);
      var $135=HEAP32[(($134)>>2)];
      $F=$135;
      var $136=$v;
      var $137=(($136+12)|0);
      var $138=HEAP32[(($137)>>2)];
      $R=$138;
      var $139=$F;
      var $140=$139;
      var $141=$1;
      var $142=(($141+16)|0);
      var $143=HEAP32[(($142)>>2)];
      var $144=(($140)>>>(0)) >= (($143)>>>(0));
      if ($144) { label = 13; break; } else { var $158 = 0;label = 15; break; }
    case 13:
      var $146=$F;
      var $147=(($146+12)|0);
      var $148=HEAP32[(($147)>>2)];
      var $149=$v;
      var $150=(($148)|(0))==(($149)|(0));
      if ($150) { label = 14; break; } else { var $158 = 0;label = 15; break; }
    case 14:
      var $152=$R;
      var $153=(($152+8)|0);
      var $154=HEAP32[(($153)>>2)];
      var $155=$v;
      var $156=(($154)|(0))==(($155)|(0));
      var $158 = $156;label = 15; break;
    case 15:
      var $158;
      var $159=(($158)&(1));
      var $160=($159);
      var $161=(($160)|(0))!=0;
      if ($161) { label = 16; break; } else { label = 17; break; }
    case 16:
      var $163=$R;
      var $164=$F;
      var $165=(($164+12)|0);
      HEAP32[(($165)>>2)]=$163;
      var $166=$F;
      var $167=$R;
      var $168=(($167+8)|0);
      HEAP32[(($168)>>2)]=$166;
      label = 18; break;
    case 17:
      _abort();
      throw "Reached an unreachable!"
    case 18:
      label = 31; break;
    case 19:
      var $172=$v;
      var $173=(($172+16)|0);
      var $174=(($173+4)|0);
      $RP=$174;
      var $175=HEAP32[(($174)>>2)];
      $R=$175;
      var $176=(($175)|(0))!=0;
      if ($176) { label = 21; break; } else { label = 20; break; }
    case 20:
      var $178=$v;
      var $179=(($178+16)|0);
      var $180=(($179)|0);
      $RP=$180;
      var $181=HEAP32[(($180)>>2)];
      $R=$181;
      var $182=(($181)|(0))!=0;
      if ($182) { label = 21; break; } else { label = 30; break; }
    case 21:
      label = 22; break;
    case 22:
      var $185=$R;
      var $186=(($185+16)|0);
      var $187=(($186+4)|0);
      $CP=$187;
      var $188=HEAP32[(($187)>>2)];
      var $189=(($188)|(0))!=0;
      if ($189) { var $197 = 1;label = 24; break; } else { label = 23; break; }
    case 23:
      var $191=$R;
      var $192=(($191+16)|0);
      var $193=(($192)|0);
      $CP=$193;
      var $194=HEAP32[(($193)>>2)];
      var $195=(($194)|(0))!=0;
      var $197 = $195;label = 24; break;
    case 24:
      var $197;
      if ($197) { label = 25; break; } else { label = 26; break; }
    case 25:
      var $199=$CP;
      $RP=$199;
      var $200=HEAP32[(($199)>>2)];
      $R=$200;
      label = 22; break;
    case 26:
      var $202=$RP;
      var $203=$202;
      var $204=$1;
      var $205=(($204+16)|0);
      var $206=HEAP32[(($205)>>2)];
      var $207=(($203)>>>(0)) >= (($206)>>>(0));
      var $208=(($207)&(1));
      var $209=($208);
      var $210=(($209)|(0))!=0;
      if ($210) { label = 27; break; } else { label = 28; break; }
    case 27:
      var $212=$RP;
      HEAP32[(($212)>>2)]=0;
      label = 29; break;
    case 28:
      _abort();
      throw "Reached an unreachable!"
    case 29:
      label = 30; break;
    case 30:
      label = 31; break;
    case 31:
      var $217=$XP;
      var $218=(($217)|(0))!=0;
      if ($218) { label = 32; break; } else { label = 59; break; }
    case 32:
      var $220=$v;
      var $221=(($220+28)|0);
      var $222=HEAP32[(($221)>>2)];
      var $223=$1;
      var $224=(($223+304)|0);
      var $225=(($224+($222<<2))|0);
      $H=$225;
      var $226=$v;
      var $227=$H;
      var $228=HEAP32[(($227)>>2)];
      var $229=(($226)|(0))==(($228)|(0));
      if ($229) { label = 33; break; } else { label = 36; break; }
    case 33:
      var $231=$R;
      var $232=$H;
      HEAP32[(($232)>>2)]=$231;
      var $233=(($231)|(0))==0;
      if ($233) { label = 34; break; } else { label = 35; break; }
    case 34:
      var $235=$v;
      var $236=(($235+28)|0);
      var $237=HEAP32[(($236)>>2)];
      var $238=1 << $237;
      var $239=$238 ^ -1;
      var $240=$1;
      var $241=(($240+4)|0);
      var $242=HEAP32[(($241)>>2)];
      var $243=$242 & $239;
      HEAP32[(($241)>>2)]=$243;
      label = 35; break;
    case 35:
      label = 43; break;
    case 36:
      var $246=$XP;
      var $247=$246;
      var $248=$1;
      var $249=(($248+16)|0);
      var $250=HEAP32[(($249)>>2)];
      var $251=(($247)>>>(0)) >= (($250)>>>(0));
      var $252=(($251)&(1));
      var $253=($252);
      var $254=(($253)|(0))!=0;
      if ($254) { label = 37; break; } else { label = 41; break; }
    case 37:
      var $256=$XP;
      var $257=(($256+16)|0);
      var $258=(($257)|0);
      var $259=HEAP32[(($258)>>2)];
      var $260=$v;
      var $261=(($259)|(0))==(($260)|(0));
      if ($261) { label = 38; break; } else { label = 39; break; }
    case 38:
      var $263=$R;
      var $264=$XP;
      var $265=(($264+16)|0);
      var $266=(($265)|0);
      HEAP32[(($266)>>2)]=$263;
      label = 40; break;
    case 39:
      var $268=$R;
      var $269=$XP;
      var $270=(($269+16)|0);
      var $271=(($270+4)|0);
      HEAP32[(($271)>>2)]=$268;
      label = 40; break;
    case 40:
      label = 42; break;
    case 41:
      _abort();
      throw "Reached an unreachable!"
    case 42:
      label = 43; break;
    case 43:
      var $276=$R;
      var $277=(($276)|(0))!=0;
      if ($277) { label = 44; break; } else { label = 58; break; }
    case 44:
      var $279=$R;
      var $280=$279;
      var $281=$1;
      var $282=(($281+16)|0);
      var $283=HEAP32[(($282)>>2)];
      var $284=(($280)>>>(0)) >= (($283)>>>(0));
      var $285=(($284)&(1));
      var $286=($285);
      var $287=(($286)|(0))!=0;
      if ($287) { label = 45; break; } else { label = 56; break; }
    case 45:
      var $289=$XP;
      var $290=$R;
      var $291=(($290+24)|0);
      HEAP32[(($291)>>2)]=$289;
      var $292=$v;
      var $293=(($292+16)|0);
      var $294=(($293)|0);
      var $295=HEAP32[(($294)>>2)];
      $C0=$295;
      var $296=(($295)|(0))!=0;
      if ($296) { label = 46; break; } else { label = 50; break; }
    case 46:
      var $298=$C0;
      var $299=$298;
      var $300=$1;
      var $301=(($300+16)|0);
      var $302=HEAP32[(($301)>>2)];
      var $303=(($299)>>>(0)) >= (($302)>>>(0));
      var $304=(($303)&(1));
      var $305=($304);
      var $306=(($305)|(0))!=0;
      if ($306) { label = 47; break; } else { label = 48; break; }
    case 47:
      var $308=$C0;
      var $309=$R;
      var $310=(($309+16)|0);
      var $311=(($310)|0);
      HEAP32[(($311)>>2)]=$308;
      var $312=$R;
      var $313=$C0;
      var $314=(($313+24)|0);
      HEAP32[(($314)>>2)]=$312;
      label = 49; break;
    case 48:
      _abort();
      throw "Reached an unreachable!"
    case 49:
      label = 50; break;
    case 50:
      var $318=$v;
      var $319=(($318+16)|0);
      var $320=(($319+4)|0);
      var $321=HEAP32[(($320)>>2)];
      $C1=$321;
      var $322=(($321)|(0))!=0;
      if ($322) { label = 51; break; } else { label = 55; break; }
    case 51:
      var $324=$C1;
      var $325=$324;
      var $326=$1;
      var $327=(($326+16)|0);
      var $328=HEAP32[(($327)>>2)];
      var $329=(($325)>>>(0)) >= (($328)>>>(0));
      var $330=(($329)&(1));
      var $331=($330);
      var $332=(($331)|(0))!=0;
      if ($332) { label = 52; break; } else { label = 53; break; }
    case 52:
      var $334=$C1;
      var $335=$R;
      var $336=(($335+16)|0);
      var $337=(($336+4)|0);
      HEAP32[(($337)>>2)]=$334;
      var $338=$R;
      var $339=$C1;
      var $340=(($339+24)|0);
      HEAP32[(($340)>>2)]=$338;
      label = 54; break;
    case 53:
      _abort();
      throw "Reached an unreachable!"
    case 54:
      label = 55; break;
    case 55:
      label = 57; break;
    case 56:
      _abort();
      throw "Reached an unreachable!"
    case 57:
      label = 58; break;
    case 58:
      label = 59; break;
    case 59:
      var $348=$rsize;
      var $349=(($348)>>>(0)) < 16;
      if ($349) { label = 60; break; } else { label = 61; break; }
    case 60:
      var $351=$rsize;
      var $352=$2;
      var $353=((($351)+($352))|0);
      var $354=$353 | 1;
      var $355=$354 | 2;
      var $356=$v;
      var $357=(($356+4)|0);
      HEAP32[(($357)>>2)]=$355;
      var $358=$v;
      var $359=$358;
      var $360=$rsize;
      var $361=$2;
      var $362=((($360)+($361))|0);
      var $363=(($359+$362)|0);
      var $364=$363;
      var $365=(($364+4)|0);
      var $366=HEAP32[(($365)>>2)];
      var $367=$366 | 1;
      HEAP32[(($365)>>2)]=$367;
      label = 70; break;
    case 61:
      var $369=$2;
      var $370=$369 | 1;
      var $371=$370 | 2;
      var $372=$v;
      var $373=(($372+4)|0);
      HEAP32[(($373)>>2)]=$371;
      var $374=$rsize;
      var $375=$374 | 1;
      var $376=$r;
      var $377=(($376+4)|0);
      HEAP32[(($377)>>2)]=$375;
      var $378=$rsize;
      var $379=$r;
      var $380=$379;
      var $381=$rsize;
      var $382=(($380+$381)|0);
      var $383=$382;
      var $384=(($383)|0);
      HEAP32[(($384)>>2)]=$378;
      var $385=$1;
      var $386=(($385+8)|0);
      var $387=HEAP32[(($386)>>2)];
      $DVS=$387;
      var $388=$DVS;
      var $389=(($388)|(0))!=0;
      if ($389) { label = 62; break; } else { label = 69; break; }
    case 62:
      var $391=$1;
      var $392=(($391+20)|0);
      var $393=HEAP32[(($392)>>2)];
      $DV=$393;
      var $394=$DVS;
      var $395=$394 >>> 3;
      $I=$395;
      var $396=$I;
      var $397=$396 << 1;
      var $398=$1;
      var $399=(($398+40)|0);
      var $400=(($399+($397<<2))|0);
      var $401=$400;
      var $402=$401;
      $B=$402;
      var $403=$B;
      $F1=$403;
      var $404=$1;
      var $405=(($404)|0);
      var $406=HEAP32[(($405)>>2)];
      var $407=$I;
      var $408=1 << $407;
      var $409=$406 & $408;
      var $410=(($409)|(0))!=0;
      if ($410) { label = 64; break; } else { label = 63; break; }
    case 63:
      var $412=$I;
      var $413=1 << $412;
      var $414=$1;
      var $415=(($414)|0);
      var $416=HEAP32[(($415)>>2)];
      var $417=$416 | $413;
      HEAP32[(($415)>>2)]=$417;
      label = 68; break;
    case 64:
      var $419=$B;
      var $420=(($419+8)|0);
      var $421=HEAP32[(($420)>>2)];
      var $422=$421;
      var $423=$1;
      var $424=(($423+16)|0);
      var $425=HEAP32[(($424)>>2)];
      var $426=(($422)>>>(0)) >= (($425)>>>(0));
      var $427=(($426)&(1));
      var $428=($427);
      var $429=(($428)|(0))!=0;
      if ($429) { label = 65; break; } else { label = 66; break; }
    case 65:
      var $431=$B;
      var $432=(($431+8)|0);
      var $433=HEAP32[(($432)>>2)];
      $F1=$433;
      label = 67; break;
    case 66:
      _abort();
      throw "Reached an unreachable!"
    case 67:
      label = 68; break;
    case 68:
      var $437=$DV;
      var $438=$B;
      var $439=(($438+8)|0);
      HEAP32[(($439)>>2)]=$437;
      var $440=$DV;
      var $441=$F1;
      var $442=(($441+12)|0);
      HEAP32[(($442)>>2)]=$440;
      var $443=$F1;
      var $444=$DV;
      var $445=(($444+8)|0);
      HEAP32[(($445)>>2)]=$443;
      var $446=$B;
      var $447=$DV;
      var $448=(($447+12)|0);
      HEAP32[(($448)>>2)]=$446;
      label = 69; break;
    case 69:
      var $450=$rsize;
      var $451=$1;
      var $452=(($451+8)|0);
      HEAP32[(($452)>>2)]=$450;
      var $453=$r;
      var $454=$1;
      var $455=(($454+20)|0);
      HEAP32[(($455)>>2)]=$453;
      label = 70; break;
    case 70:
      var $457=$v;
      var $458=$457;
      var $459=(($458+8)|0);
      return $459;
    case 71:
      label = 72; break;
    case 72:
      _abort();
      throw "Reached an unreachable!"
    default: assert(0, "bad label: " + label);
  }
}
function _tmalloc_large($m, $nb) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $v;
      var $rsize;
      var $t;
      var $idx;
      var $X;
      var $Y;
      var $N;
      var $K;
      var $sizebits;
      var $rst;
      var $rt;
      var $trem;
      var $leftbits;
      var $i;
      var $leastbit;
      var $Y1;
      var $K2;
      var $N3;
      var $trem4;
      var $r;
      var $XP;
      var $R;
      var $F;
      var $RP;
      var $CP;
      var $H;
      var $C0;
      var $C1;
      var $I;
      var $B;
      var $F5;
      var $TP;
      var $H6;
      var $I7;
      var $X8;
      var $Y9;
      var $N10;
      var $K11;
      var $T;
      var $K12;
      var $C;
      var $F13;
      $2=$m;
      $3=$nb;
      $v=0;
      var $4=$3;
      var $5=(((-$4))|0);
      $rsize=$5;
      var $6=$3;
      var $7=$6 >>> 8;
      $X=$7;
      var $8=$X;
      var $9=(($8)|(0))==0;
      if ($9) { label = 2; break; } else { label = 3; break; }
    case 2:
      $idx=0;
      label = 7; break;
    case 3:
      var $12=$X;
      var $13=(($12)>>>(0)) > 65535;
      if ($13) { label = 4; break; } else { label = 5; break; }
    case 4:
      $idx=31;
      label = 6; break;
    case 5:
      var $16=$X;
      $Y=$16;
      var $17=$Y;
      var $18=((($17)-(256))|0);
      var $19=$18 >>> 16;
      var $20=$19 & 8;
      $N=$20;
      var $21=$N;
      var $22=$Y;
      var $23=$22 << $21;
      $Y=$23;
      var $24=((($23)-(4096))|0);
      var $25=$24 >>> 16;
      var $26=$25 & 4;
      $K=$26;
      var $27=$K;
      var $28=$N;
      var $29=((($28)+($27))|0);
      $N=$29;
      var $30=$K;
      var $31=$Y;
      var $32=$31 << $30;
      $Y=$32;
      var $33=((($32)-(16384))|0);
      var $34=$33 >>> 16;
      var $35=$34 & 2;
      $K=$35;
      var $36=$N;
      var $37=((($36)+($35))|0);
      $N=$37;
      var $38=$N;
      var $39=(((14)-($38))|0);
      var $40=$K;
      var $41=$Y;
      var $42=$41 << $40;
      $Y=$42;
      var $43=$42 >>> 15;
      var $44=((($39)+($43))|0);
      $K=$44;
      var $45=$K;
      var $46=$45 << 1;
      var $47=$3;
      var $48=$K;
      var $49=((($48)+(7))|0);
      var $50=$47 >>> (($49)>>>(0));
      var $51=$50 & 1;
      var $52=((($46)+($51))|0);
      $idx=$52;
      label = 6; break;
    case 6:
      label = 7; break;
    case 7:
      var $55=$idx;
      var $56=$2;
      var $57=(($56+304)|0);
      var $58=(($57+($55<<2))|0);
      var $59=HEAP32[(($58)>>2)];
      $t=$59;
      var $60=(($59)|(0))!=0;
      if ($60) { label = 8; break; } else { label = 23; break; }
    case 8:
      var $62=$3;
      var $63=$idx;
      var $64=(($63)|(0))==31;
      if ($64) { label = 9; break; } else { label = 10; break; }
    case 9:
      var $73 = 0;label = 11; break;
    case 10:
      var $67=$idx;
      var $68=$67 >>> 1;
      var $69=((($68)+(8))|0);
      var $70=((($69)-(2))|0);
      var $71=(((31)-($70))|0);
      var $73 = $71;label = 11; break;
    case 11:
      var $73;
      var $74=$62 << $73;
      $sizebits=$74;
      $rst=0;
      label = 12; break;
    case 12:
      var $76=$t;
      var $77=(($76+4)|0);
      var $78=HEAP32[(($77)>>2)];
      var $79=$78 & -8;
      var $80=$3;
      var $81=((($79)-($80))|0);
      $trem=$81;
      var $82=$trem;
      var $83=$rsize;
      var $84=(($82)>>>(0)) < (($83)>>>(0));
      if ($84) { label = 13; break; } else { label = 16; break; }
    case 13:
      var $86=$t;
      $v=$86;
      var $87=$trem;
      $rsize=$87;
      var $88=(($87)|(0))==0;
      if ($88) { label = 14; break; } else { label = 15; break; }
    case 14:
      label = 22; break;
    case 15:
      label = 16; break;
    case 16:
      var $92=$t;
      var $93=(($92+16)|0);
      var $94=(($93+4)|0);
      var $95=HEAP32[(($94)>>2)];
      $rt=$95;
      var $96=$sizebits;
      var $97=$96 >>> 31;
      var $98=$97 & 1;
      var $99=$t;
      var $100=(($99+16)|0);
      var $101=(($100+($98<<2))|0);
      var $102=HEAP32[(($101)>>2)];
      $t=$102;
      var $103=$rt;
      var $104=(($103)|(0))!=0;
      if ($104) { label = 17; break; } else { label = 19; break; }
    case 17:
      var $106=$rt;
      var $107=$t;
      var $108=(($106)|(0))!=(($107)|(0));
      if ($108) { label = 18; break; } else { label = 19; break; }
    case 18:
      var $110=$rt;
      $rst=$110;
      label = 19; break;
    case 19:
      var $112=$t;
      var $113=(($112)|(0))==0;
      if ($113) { label = 20; break; } else { label = 21; break; }
    case 20:
      var $115=$rst;
      $t=$115;
      label = 22; break;
    case 21:
      var $117=$sizebits;
      var $118=$117 << 1;
      $sizebits=$118;
      label = 12; break;
    case 22:
      label = 23; break;
    case 23:
      var $121=$t;
      var $122=(($121)|(0))==0;
      if ($122) { label = 24; break; } else { label = 28; break; }
    case 24:
      var $124=$v;
      var $125=(($124)|(0))==0;
      if ($125) { label = 25; break; } else { label = 28; break; }
    case 25:
      var $127=$idx;
      var $128=1 << $127;
      var $129=$128 << 1;
      var $130=$idx;
      var $131=1 << $130;
      var $132=$131 << 1;
      var $133=(((-$132))|0);
      var $134=$129 | $133;
      var $135=$2;
      var $136=(($135+4)|0);
      var $137=HEAP32[(($136)>>2)];
      var $138=$134 & $137;
      $leftbits=$138;
      var $139=$leftbits;
      var $140=(($139)|(0))!=0;
      if ($140) { label = 26; break; } else { label = 27; break; }
    case 26:
      var $142=$leftbits;
      var $143=$leftbits;
      var $144=(((-$143))|0);
      var $145=$142 & $144;
      $leastbit=$145;
      var $146=$leastbit;
      var $147=((($146)-(1))|0);
      $Y1=$147;
      var $148=$Y1;
      var $149=$148 >>> 12;
      var $150=$149 & 16;
      $K2=$150;
      var $151=$K2;
      $N3=$151;
      var $152=$K2;
      var $153=$Y1;
      var $154=$153 >>> (($152)>>>(0));
      $Y1=$154;
      var $155=$Y1;
      var $156=$155 >>> 5;
      var $157=$156 & 8;
      $K2=$157;
      var $158=$N3;
      var $159=((($158)+($157))|0);
      $N3=$159;
      var $160=$K2;
      var $161=$Y1;
      var $162=$161 >>> (($160)>>>(0));
      $Y1=$162;
      var $163=$Y1;
      var $164=$163 >>> 2;
      var $165=$164 & 4;
      $K2=$165;
      var $166=$N3;
      var $167=((($166)+($165))|0);
      $N3=$167;
      var $168=$K2;
      var $169=$Y1;
      var $170=$169 >>> (($168)>>>(0));
      $Y1=$170;
      var $171=$Y1;
      var $172=$171 >>> 1;
      var $173=$172 & 2;
      $K2=$173;
      var $174=$N3;
      var $175=((($174)+($173))|0);
      $N3=$175;
      var $176=$K2;
      var $177=$Y1;
      var $178=$177 >>> (($176)>>>(0));
      $Y1=$178;
      var $179=$Y1;
      var $180=$179 >>> 1;
      var $181=$180 & 1;
      $K2=$181;
      var $182=$N3;
      var $183=((($182)+($181))|0);
      $N3=$183;
      var $184=$K2;
      var $185=$Y1;
      var $186=$185 >>> (($184)>>>(0));
      $Y1=$186;
      var $187=$N3;
      var $188=$Y1;
      var $189=((($187)+($188))|0);
      $i=$189;
      var $190=$i;
      var $191=$2;
      var $192=(($191+304)|0);
      var $193=(($192+($190<<2))|0);
      var $194=HEAP32[(($193)>>2)];
      $t=$194;
      label = 27; break;
    case 27:
      label = 28; break;
    case 28:
      label = 29; break;
    case 29:
      var $198=$t;
      var $199=(($198)|(0))!=0;
      if ($199) { label = 30; break; } else { label = 36; break; }
    case 30:
      var $201=$t;
      var $202=(($201+4)|0);
      var $203=HEAP32[(($202)>>2)];
      var $204=$203 & -8;
      var $205=$3;
      var $206=((($204)-($205))|0);
      $trem4=$206;
      var $207=$trem4;
      var $208=$rsize;
      var $209=(($207)>>>(0)) < (($208)>>>(0));
      if ($209) { label = 31; break; } else { label = 32; break; }
    case 31:
      var $211=$trem4;
      $rsize=$211;
      var $212=$t;
      $v=$212;
      label = 32; break;
    case 32:
      var $214=$t;
      var $215=(($214+16)|0);
      var $216=(($215)|0);
      var $217=HEAP32[(($216)>>2)];
      var $218=(($217)|(0))!=0;
      if ($218) { label = 33; break; } else { label = 34; break; }
    case 33:
      var $220=$t;
      var $221=(($220+16)|0);
      var $222=(($221)|0);
      var $223=HEAP32[(($222)>>2)];
      var $230 = $223;label = 35; break;
    case 34:
      var $225=$t;
      var $226=(($225+16)|0);
      var $227=(($226+4)|0);
      var $228=HEAP32[(($227)>>2)];
      var $230 = $228;label = 35; break;
    case 35:
      var $230;
      $t=$230;
      label = 29; break;
    case 36:
      var $232=$v;
      var $233=(($232)|(0))!=0;
      if ($233) { label = 37; break; } else { label = 129; break; }
    case 37:
      var $235=$rsize;
      var $236=$2;
      var $237=(($236+8)|0);
      var $238=HEAP32[(($237)>>2)];
      var $239=$3;
      var $240=((($238)-($239))|0);
      var $241=(($235)>>>(0)) < (($240)>>>(0));
      if ($241) { label = 38; break; } else { label = 129; break; }
    case 38:
      var $243=$v;
      var $244=$243;
      var $245=$2;
      var $246=(($245+16)|0);
      var $247=HEAP32[(($246)>>2)];
      var $248=(($244)>>>(0)) >= (($247)>>>(0));
      var $249=(($248)&(1));
      var $250=($249);
      var $251=(($250)|(0))!=0;
      if ($251) { label = 39; break; } else { label = 128; break; }
    case 39:
      var $253=$v;
      var $254=$253;
      var $255=$3;
      var $256=(($254+$255)|0);
      var $257=$256;
      $r=$257;
      var $258=$v;
      var $259=$258;
      var $260=$r;
      var $261=$260;
      var $262=(($259)>>>(0)) < (($261)>>>(0));
      var $263=(($262)&(1));
      var $264=($263);
      var $265=(($264)|(0))!=0;
      if ($265) { label = 40; break; } else { label = 127; break; }
    case 40:
      var $267=$v;
      var $268=(($267+24)|0);
      var $269=HEAP32[(($268)>>2)];
      $XP=$269;
      var $270=$v;
      var $271=(($270+12)|0);
      var $272=HEAP32[(($271)>>2)];
      var $273=$v;
      var $274=(($272)|(0))!=(($273)|(0));
      if ($274) { label = 41; break; } else { label = 48; break; }
    case 41:
      var $276=$v;
      var $277=(($276+8)|0);
      var $278=HEAP32[(($277)>>2)];
      $F=$278;
      var $279=$v;
      var $280=(($279+12)|0);
      var $281=HEAP32[(($280)>>2)];
      $R=$281;
      var $282=$F;
      var $283=$282;
      var $284=$2;
      var $285=(($284+16)|0);
      var $286=HEAP32[(($285)>>2)];
      var $287=(($283)>>>(0)) >= (($286)>>>(0));
      if ($287) { label = 42; break; } else { var $301 = 0;label = 44; break; }
    case 42:
      var $289=$F;
      var $290=(($289+12)|0);
      var $291=HEAP32[(($290)>>2)];
      var $292=$v;
      var $293=(($291)|(0))==(($292)|(0));
      if ($293) { label = 43; break; } else { var $301 = 0;label = 44; break; }
    case 43:
      var $295=$R;
      var $296=(($295+8)|0);
      var $297=HEAP32[(($296)>>2)];
      var $298=$v;
      var $299=(($297)|(0))==(($298)|(0));
      var $301 = $299;label = 44; break;
    case 44:
      var $301;
      var $302=(($301)&(1));
      var $303=($302);
      var $304=(($303)|(0))!=0;
      if ($304) { label = 45; break; } else { label = 46; break; }
    case 45:
      var $306=$R;
      var $307=$F;
      var $308=(($307+12)|0);
      HEAP32[(($308)>>2)]=$306;
      var $309=$F;
      var $310=$R;
      var $311=(($310+8)|0);
      HEAP32[(($311)>>2)]=$309;
      label = 47; break;
    case 46:
      _abort();
      throw "Reached an unreachable!"
    case 47:
      label = 60; break;
    case 48:
      var $315=$v;
      var $316=(($315+16)|0);
      var $317=(($316+4)|0);
      $RP=$317;
      var $318=HEAP32[(($317)>>2)];
      $R=$318;
      var $319=(($318)|(0))!=0;
      if ($319) { label = 50; break; } else { label = 49; break; }
    case 49:
      var $321=$v;
      var $322=(($321+16)|0);
      var $323=(($322)|0);
      $RP=$323;
      var $324=HEAP32[(($323)>>2)];
      $R=$324;
      var $325=(($324)|(0))!=0;
      if ($325) { label = 50; break; } else { label = 59; break; }
    case 50:
      label = 51; break;
    case 51:
      var $328=$R;
      var $329=(($328+16)|0);
      var $330=(($329+4)|0);
      $CP=$330;
      var $331=HEAP32[(($330)>>2)];
      var $332=(($331)|(0))!=0;
      if ($332) { var $340 = 1;label = 53; break; } else { label = 52; break; }
    case 52:
      var $334=$R;
      var $335=(($334+16)|0);
      var $336=(($335)|0);
      $CP=$336;
      var $337=HEAP32[(($336)>>2)];
      var $338=(($337)|(0))!=0;
      var $340 = $338;label = 53; break;
    case 53:
      var $340;
      if ($340) { label = 54; break; } else { label = 55; break; }
    case 54:
      var $342=$CP;
      $RP=$342;
      var $343=HEAP32[(($342)>>2)];
      $R=$343;
      label = 51; break;
    case 55:
      var $345=$RP;
      var $346=$345;
      var $347=$2;
      var $348=(($347+16)|0);
      var $349=HEAP32[(($348)>>2)];
      var $350=(($346)>>>(0)) >= (($349)>>>(0));
      var $351=(($350)&(1));
      var $352=($351);
      var $353=(($352)|(0))!=0;
      if ($353) { label = 56; break; } else { label = 57; break; }
    case 56:
      var $355=$RP;
      HEAP32[(($355)>>2)]=0;
      label = 58; break;
    case 57:
      _abort();
      throw "Reached an unreachable!"
    case 58:
      label = 59; break;
    case 59:
      label = 60; break;
    case 60:
      var $360=$XP;
      var $361=(($360)|(0))!=0;
      if ($361) { label = 61; break; } else { label = 88; break; }
    case 61:
      var $363=$v;
      var $364=(($363+28)|0);
      var $365=HEAP32[(($364)>>2)];
      var $366=$2;
      var $367=(($366+304)|0);
      var $368=(($367+($365<<2))|0);
      $H=$368;
      var $369=$v;
      var $370=$H;
      var $371=HEAP32[(($370)>>2)];
      var $372=(($369)|(0))==(($371)|(0));
      if ($372) { label = 62; break; } else { label = 65; break; }
    case 62:
      var $374=$R;
      var $375=$H;
      HEAP32[(($375)>>2)]=$374;
      var $376=(($374)|(0))==0;
      if ($376) { label = 63; break; } else { label = 64; break; }
    case 63:
      var $378=$v;
      var $379=(($378+28)|0);
      var $380=HEAP32[(($379)>>2)];
      var $381=1 << $380;
      var $382=$381 ^ -1;
      var $383=$2;
      var $384=(($383+4)|0);
      var $385=HEAP32[(($384)>>2)];
      var $386=$385 & $382;
      HEAP32[(($384)>>2)]=$386;
      label = 64; break;
    case 64:
      label = 72; break;
    case 65:
      var $389=$XP;
      var $390=$389;
      var $391=$2;
      var $392=(($391+16)|0);
      var $393=HEAP32[(($392)>>2)];
      var $394=(($390)>>>(0)) >= (($393)>>>(0));
      var $395=(($394)&(1));
      var $396=($395);
      var $397=(($396)|(0))!=0;
      if ($397) { label = 66; break; } else { label = 70; break; }
    case 66:
      var $399=$XP;
      var $400=(($399+16)|0);
      var $401=(($400)|0);
      var $402=HEAP32[(($401)>>2)];
      var $403=$v;
      var $404=(($402)|(0))==(($403)|(0));
      if ($404) { label = 67; break; } else { label = 68; break; }
    case 67:
      var $406=$R;
      var $407=$XP;
      var $408=(($407+16)|0);
      var $409=(($408)|0);
      HEAP32[(($409)>>2)]=$406;
      label = 69; break;
    case 68:
      var $411=$R;
      var $412=$XP;
      var $413=(($412+16)|0);
      var $414=(($413+4)|0);
      HEAP32[(($414)>>2)]=$411;
      label = 69; break;
    case 69:
      label = 71; break;
    case 70:
      _abort();
      throw "Reached an unreachable!"
    case 71:
      label = 72; break;
    case 72:
      var $419=$R;
      var $420=(($419)|(0))!=0;
      if ($420) { label = 73; break; } else { label = 87; break; }
    case 73:
      var $422=$R;
      var $423=$422;
      var $424=$2;
      var $425=(($424+16)|0);
      var $426=HEAP32[(($425)>>2)];
      var $427=(($423)>>>(0)) >= (($426)>>>(0));
      var $428=(($427)&(1));
      var $429=($428);
      var $430=(($429)|(0))!=0;
      if ($430) { label = 74; break; } else { label = 85; break; }
    case 74:
      var $432=$XP;
      var $433=$R;
      var $434=(($433+24)|0);
      HEAP32[(($434)>>2)]=$432;
      var $435=$v;
      var $436=(($435+16)|0);
      var $437=(($436)|0);
      var $438=HEAP32[(($437)>>2)];
      $C0=$438;
      var $439=(($438)|(0))!=0;
      if ($439) { label = 75; break; } else { label = 79; break; }
    case 75:
      var $441=$C0;
      var $442=$441;
      var $443=$2;
      var $444=(($443+16)|0);
      var $445=HEAP32[(($444)>>2)];
      var $446=(($442)>>>(0)) >= (($445)>>>(0));
      var $447=(($446)&(1));
      var $448=($447);
      var $449=(($448)|(0))!=0;
      if ($449) { label = 76; break; } else { label = 77; break; }
    case 76:
      var $451=$C0;
      var $452=$R;
      var $453=(($452+16)|0);
      var $454=(($453)|0);
      HEAP32[(($454)>>2)]=$451;
      var $455=$R;
      var $456=$C0;
      var $457=(($456+24)|0);
      HEAP32[(($457)>>2)]=$455;
      label = 78; break;
    case 77:
      _abort();
      throw "Reached an unreachable!"
    case 78:
      label = 79; break;
    case 79:
      var $461=$v;
      var $462=(($461+16)|0);
      var $463=(($462+4)|0);
      var $464=HEAP32[(($463)>>2)];
      $C1=$464;
      var $465=(($464)|(0))!=0;
      if ($465) { label = 80; break; } else { label = 84; break; }
    case 80:
      var $467=$C1;
      var $468=$467;
      var $469=$2;
      var $470=(($469+16)|0);
      var $471=HEAP32[(($470)>>2)];
      var $472=(($468)>>>(0)) >= (($471)>>>(0));
      var $473=(($472)&(1));
      var $474=($473);
      var $475=(($474)|(0))!=0;
      if ($475) { label = 81; break; } else { label = 82; break; }
    case 81:
      var $477=$C1;
      var $478=$R;
      var $479=(($478+16)|0);
      var $480=(($479+4)|0);
      HEAP32[(($480)>>2)]=$477;
      var $481=$R;
      var $482=$C1;
      var $483=(($482+24)|0);
      HEAP32[(($483)>>2)]=$481;
      label = 83; break;
    case 82:
      _abort();
      throw "Reached an unreachable!"
    case 83:
      label = 84; break;
    case 84:
      label = 86; break;
    case 85:
      _abort();
      throw "Reached an unreachable!"
    case 86:
      label = 87; break;
    case 87:
      label = 88; break;
    case 88:
      var $491=$rsize;
      var $492=(($491)>>>(0)) < 16;
      if ($492) { label = 89; break; } else { label = 90; break; }
    case 89:
      var $494=$rsize;
      var $495=$3;
      var $496=((($494)+($495))|0);
      var $497=$496 | 1;
      var $498=$497 | 2;
      var $499=$v;
      var $500=(($499+4)|0);
      HEAP32[(($500)>>2)]=$498;
      var $501=$v;
      var $502=$501;
      var $503=$rsize;
      var $504=$3;
      var $505=((($503)+($504))|0);
      var $506=(($502+$505)|0);
      var $507=$506;
      var $508=(($507+4)|0);
      var $509=HEAP32[(($508)>>2)];
      var $510=$509 | 1;
      HEAP32[(($508)>>2)]=$510;
      label = 126; break;
    case 90:
      var $512=$3;
      var $513=$512 | 1;
      var $514=$513 | 2;
      var $515=$v;
      var $516=(($515+4)|0);
      HEAP32[(($516)>>2)]=$514;
      var $517=$rsize;
      var $518=$517 | 1;
      var $519=$r;
      var $520=(($519+4)|0);
      HEAP32[(($520)>>2)]=$518;
      var $521=$rsize;
      var $522=$r;
      var $523=$522;
      var $524=$rsize;
      var $525=(($523+$524)|0);
      var $526=$525;
      var $527=(($526)|0);
      HEAP32[(($527)>>2)]=$521;
      var $528=$rsize;
      var $529=$528 >>> 3;
      var $530=(($529)>>>(0)) < 32;
      if ($530) { label = 91; break; } else { label = 98; break; }
    case 91:
      var $532=$rsize;
      var $533=$532 >>> 3;
      $I=$533;
      var $534=$I;
      var $535=$534 << 1;
      var $536=$2;
      var $537=(($536+40)|0);
      var $538=(($537+($535<<2))|0);
      var $539=$538;
      var $540=$539;
      $B=$540;
      var $541=$B;
      $F5=$541;
      var $542=$2;
      var $543=(($542)|0);
      var $544=HEAP32[(($543)>>2)];
      var $545=$I;
      var $546=1 << $545;
      var $547=$544 & $546;
      var $548=(($547)|(0))!=0;
      if ($548) { label = 93; break; } else { label = 92; break; }
    case 92:
      var $550=$I;
      var $551=1 << $550;
      var $552=$2;
      var $553=(($552)|0);
      var $554=HEAP32[(($553)>>2)];
      var $555=$554 | $551;
      HEAP32[(($553)>>2)]=$555;
      label = 97; break;
    case 93:
      var $557=$B;
      var $558=(($557+8)|0);
      var $559=HEAP32[(($558)>>2)];
      var $560=$559;
      var $561=$2;
      var $562=(($561+16)|0);
      var $563=HEAP32[(($562)>>2)];
      var $564=(($560)>>>(0)) >= (($563)>>>(0));
      var $565=(($564)&(1));
      var $566=($565);
      var $567=(($566)|(0))!=0;
      if ($567) { label = 94; break; } else { label = 95; break; }
    case 94:
      var $569=$B;
      var $570=(($569+8)|0);
      var $571=HEAP32[(($570)>>2)];
      $F5=$571;
      label = 96; break;
    case 95:
      _abort();
      throw "Reached an unreachable!"
    case 96:
      label = 97; break;
    case 97:
      var $575=$r;
      var $576=$B;
      var $577=(($576+8)|0);
      HEAP32[(($577)>>2)]=$575;
      var $578=$r;
      var $579=$F5;
      var $580=(($579+12)|0);
      HEAP32[(($580)>>2)]=$578;
      var $581=$F5;
      var $582=$r;
      var $583=(($582+8)|0);
      HEAP32[(($583)>>2)]=$581;
      var $584=$B;
      var $585=$r;
      var $586=(($585+12)|0);
      HEAP32[(($586)>>2)]=$584;
      label = 125; break;
    case 98:
      var $588=$r;
      var $589=$588;
      $TP=$589;
      var $590=$rsize;
      var $591=$590 >>> 8;
      $X8=$591;
      var $592=$X8;
      var $593=(($592)|(0))==0;
      if ($593) { label = 99; break; } else { label = 100; break; }
    case 99:
      $I7=0;
      label = 104; break;
    case 100:
      var $596=$X8;
      var $597=(($596)>>>(0)) > 65535;
      if ($597) { label = 101; break; } else { label = 102; break; }
    case 101:
      $I7=31;
      label = 103; break;
    case 102:
      var $600=$X8;
      $Y9=$600;
      var $601=$Y9;
      var $602=((($601)-(256))|0);
      var $603=$602 >>> 16;
      var $604=$603 & 8;
      $N10=$604;
      var $605=$N10;
      var $606=$Y9;
      var $607=$606 << $605;
      $Y9=$607;
      var $608=((($607)-(4096))|0);
      var $609=$608 >>> 16;
      var $610=$609 & 4;
      $K11=$610;
      var $611=$K11;
      var $612=$N10;
      var $613=((($612)+($611))|0);
      $N10=$613;
      var $614=$K11;
      var $615=$Y9;
      var $616=$615 << $614;
      $Y9=$616;
      var $617=((($616)-(16384))|0);
      var $618=$617 >>> 16;
      var $619=$618 & 2;
      $K11=$619;
      var $620=$N10;
      var $621=((($620)+($619))|0);
      $N10=$621;
      var $622=$N10;
      var $623=(((14)-($622))|0);
      var $624=$K11;
      var $625=$Y9;
      var $626=$625 << $624;
      $Y9=$626;
      var $627=$626 >>> 15;
      var $628=((($623)+($627))|0);
      $K11=$628;
      var $629=$K11;
      var $630=$629 << 1;
      var $631=$rsize;
      var $632=$K11;
      var $633=((($632)+(7))|0);
      var $634=$631 >>> (($633)>>>(0));
      var $635=$634 & 1;
      var $636=((($630)+($635))|0);
      $I7=$636;
      label = 103; break;
    case 103:
      label = 104; break;
    case 104:
      var $639=$I7;
      var $640=$2;
      var $641=(($640+304)|0);
      var $642=(($641+($639<<2))|0);
      $H6=$642;
      var $643=$I7;
      var $644=$TP;
      var $645=(($644+28)|0);
      HEAP32[(($645)>>2)]=$643;
      var $646=$TP;
      var $647=(($646+16)|0);
      var $648=(($647+4)|0);
      HEAP32[(($648)>>2)]=0;
      var $649=$TP;
      var $650=(($649+16)|0);
      var $651=(($650)|0);
      HEAP32[(($651)>>2)]=0;
      var $652=$2;
      var $653=(($652+4)|0);
      var $654=HEAP32[(($653)>>2)];
      var $655=$I7;
      var $656=1 << $655;
      var $657=$654 & $656;
      var $658=(($657)|(0))!=0;
      if ($658) { label = 106; break; } else { label = 105; break; }
    case 105:
      var $660=$I7;
      var $661=1 << $660;
      var $662=$2;
      var $663=(($662+4)|0);
      var $664=HEAP32[(($663)>>2)];
      var $665=$664 | $661;
      HEAP32[(($663)>>2)]=$665;
      var $666=$TP;
      var $667=$H6;
      HEAP32[(($667)>>2)]=$666;
      var $668=$H6;
      var $669=$668;
      var $670=$TP;
      var $671=(($670+24)|0);
      HEAP32[(($671)>>2)]=$669;
      var $672=$TP;
      var $673=$TP;
      var $674=(($673+12)|0);
      HEAP32[(($674)>>2)]=$672;
      var $675=$TP;
      var $676=(($675+8)|0);
      HEAP32[(($676)>>2)]=$672;
      label = 124; break;
    case 106:
      var $678=$H6;
      var $679=HEAP32[(($678)>>2)];
      $T=$679;
      var $680=$rsize;
      var $681=$I7;
      var $682=(($681)|(0))==31;
      if ($682) { label = 107; break; } else { label = 108; break; }
    case 107:
      var $691 = 0;label = 109; break;
    case 108:
      var $685=$I7;
      var $686=$685 >>> 1;
      var $687=((($686)+(8))|0);
      var $688=((($687)-(2))|0);
      var $689=(((31)-($688))|0);
      var $691 = $689;label = 109; break;
    case 109:
      var $691;
      var $692=$680 << $691;
      $K12=$692;
      label = 110; break;
    case 110:
      var $694=$T;
      var $695=(($694+4)|0);
      var $696=HEAP32[(($695)>>2)];
      var $697=$696 & -8;
      var $698=$rsize;
      var $699=(($697)|(0))!=(($698)|(0));
      if ($699) { label = 111; break; } else { label = 117; break; }
    case 111:
      var $701=$K12;
      var $702=$701 >>> 31;
      var $703=$702 & 1;
      var $704=$T;
      var $705=(($704+16)|0);
      var $706=(($705+($703<<2))|0);
      $C=$706;
      var $707=$K12;
      var $708=$707 << 1;
      $K12=$708;
      var $709=$C;
      var $710=HEAP32[(($709)>>2)];
      var $711=(($710)|(0))!=0;
      if ($711) { label = 112; break; } else { label = 113; break; }
    case 112:
      var $713=$C;
      var $714=HEAP32[(($713)>>2)];
      $T=$714;
      label = 116; break;
    case 113:
      var $716=$C;
      var $717=$716;
      var $718=$2;
      var $719=(($718+16)|0);
      var $720=HEAP32[(($719)>>2)];
      var $721=(($717)>>>(0)) >= (($720)>>>(0));
      var $722=(($721)&(1));
      var $723=($722);
      var $724=(($723)|(0))!=0;
      if ($724) { label = 114; break; } else { label = 115; break; }
    case 114:
      var $726=$TP;
      var $727=$C;
      HEAP32[(($727)>>2)]=$726;
      var $728=$T;
      var $729=$TP;
      var $730=(($729+24)|0);
      HEAP32[(($730)>>2)]=$728;
      var $731=$TP;
      var $732=$TP;
      var $733=(($732+12)|0);
      HEAP32[(($733)>>2)]=$731;
      var $734=$TP;
      var $735=(($734+8)|0);
      HEAP32[(($735)>>2)]=$731;
      label = 123; break;
    case 115:
      _abort();
      throw "Reached an unreachable!"
    case 116:
      label = 122; break;
    case 117:
      var $739=$T;
      var $740=(($739+8)|0);
      var $741=HEAP32[(($740)>>2)];
      $F13=$741;
      var $742=$T;
      var $743=$742;
      var $744=$2;
      var $745=(($744+16)|0);
      var $746=HEAP32[(($745)>>2)];
      var $747=(($743)>>>(0)) >= (($746)>>>(0));
      if ($747) { label = 118; break; } else { var $756 = 0;label = 119; break; }
    case 118:
      var $749=$F13;
      var $750=$749;
      var $751=$2;
      var $752=(($751+16)|0);
      var $753=HEAP32[(($752)>>2)];
      var $754=(($750)>>>(0)) >= (($753)>>>(0));
      var $756 = $754;label = 119; break;
    case 119:
      var $756;
      var $757=(($756)&(1));
      var $758=($757);
      var $759=(($758)|(0))!=0;
      if ($759) { label = 120; break; } else { label = 121; break; }
    case 120:
      var $761=$TP;
      var $762=$F13;
      var $763=(($762+12)|0);
      HEAP32[(($763)>>2)]=$761;
      var $764=$T;
      var $765=(($764+8)|0);
      HEAP32[(($765)>>2)]=$761;
      var $766=$F13;
      var $767=$TP;
      var $768=(($767+8)|0);
      HEAP32[(($768)>>2)]=$766;
      var $769=$T;
      var $770=$TP;
      var $771=(($770+12)|0);
      HEAP32[(($771)>>2)]=$769;
      var $772=$TP;
      var $773=(($772+24)|0);
      HEAP32[(($773)>>2)]=0;
      label = 123; break;
    case 121:
      _abort();
      throw "Reached an unreachable!"
    case 122:
      label = 110; break;
    case 123:
      label = 124; break;
    case 124:
      label = 125; break;
    case 125:
      label = 126; break;
    case 126:
      var $780=$v;
      var $781=$780;
      var $782=(($781+8)|0);
      $1=$782;
      label = 130; break;
    case 127:
      label = 128; break;
    case 128:
      _abort();
      throw "Reached an unreachable!"
    case 129:
      $1=0;
      label = 130; break;
    case 130:
      var $787=$1;
      return $787;
    default: assert(0, "bad label: " + label);
  }
}
function _segment_holding($m, $addr) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $sp;
      $2=$m;
      $3=$addr;
      var $4=$2;
      var $5=(($4+448)|0);
      $sp=$5;
      label = 2; break;
    case 2:
      var $7=$3;
      var $8=$sp;
      var $9=(($8)|0);
      var $10=HEAP32[(($9)>>2)];
      var $11=(($7)>>>(0)) >= (($10)>>>(0));
      if ($11) { label = 3; break; } else { label = 5; break; }
    case 3:
      var $13=$3;
      var $14=$sp;
      var $15=(($14)|0);
      var $16=HEAP32[(($15)>>2)];
      var $17=$sp;
      var $18=(($17+4)|0);
      var $19=HEAP32[(($18)>>2)];
      var $20=(($16+$19)|0);
      var $21=(($13)>>>(0)) < (($20)>>>(0));
      if ($21) { label = 4; break; } else { label = 5; break; }
    case 4:
      var $23=$sp;
      $1=$23;
      label = 8; break;
    case 5:
      var $25=$sp;
      var $26=(($25+8)|0);
      var $27=HEAP32[(($26)>>2)];
      $sp=$27;
      var $28=(($27)|(0))==0;
      if ($28) { label = 6; break; } else { label = 7; break; }
    case 6:
      $1=0;
      label = 8; break;
    case 7:
      label = 2; break;
    case 8:
      var $32=$1;
      return $32;
    default: assert(0, "bad label: " + label);
  }
}
function _sys_alloc($m, $nb) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $tbase;
      var $tsize;
      var $mmap_flag;
      var $asize;
      var $mem;
      var $fp;
      var $br;
      var $ssize;
      var $ss;
      var $base;
      var $fp1;
      var $esize;
      var $end;
      var $br2;
      var $end3;
      var $ssize4;
      var $mn;
      var $sp;
      var $oldbase;
      var $rsize;
      var $p;
      var $r;
      $2=$m;
      $3=$nb;
      $tbase=-1;
      $tsize=0;
      $mmap_flag=0;
      var $4=HEAP32[((((5253620)|0))>>2)];
      var $5=(($4)|(0))!=0;
      if ($5) { var $10 = 1;label = 3; break; } else { label = 2; break; }
    case 2:
      var $7=_init_mparams();
      var $8=(($7)|(0))!=0;
      var $10 = $8;label = 3; break;
    case 3:
      var $10;
      var $11=(($10)&(1));
      var $12=$2;
      var $13=(($12+444)|0);
      var $14=HEAP32[(($13)>>2)];
      var $15=$14 & 0;
      var $16=(($15)|(0))!=0;
      if ($16) { label = 4; break; } else { label = 9; break; }
    case 4:
      var $18=$3;
      var $19=HEAP32[((((5253632)|0))>>2)];
      var $20=(($18)>>>(0)) >= (($19)>>>(0));
      if ($20) { label = 5; break; } else { label = 9; break; }
    case 5:
      var $22=$2;
      var $23=(($22+12)|0);
      var $24=HEAP32[(($23)>>2)];
      var $25=(($24)|(0))!=0;
      if ($25) { label = 6; break; } else { label = 9; break; }
    case 6:
      var $27=$2;
      var $28=$3;
      var $29=_mmap_alloc($27, $28);
      $mem=$29;
      var $30=$mem;
      var $31=(($30)|(0))!=0;
      if ($31) { label = 7; break; } else { label = 8; break; }
    case 7:
      var $33=$mem;
      $1=$33;
      label = 103; break;
    case 8:
      label = 9; break;
    case 9:
      var $36=$3;
      var $37=((($36)+(48))|0);
      var $38=HEAP32[((((5253628)|0))>>2)];
      var $39=((($38)-(1))|0);
      var $40=((($37)+($39))|0);
      var $41=HEAP32[((((5253628)|0))>>2)];
      var $42=((($41)-(1))|0);
      var $43=$42 ^ -1;
      var $44=$40 & $43;
      $asize=$44;
      var $45=$asize;
      var $46=$3;
      var $47=(($45)>>>(0)) <= (($46)>>>(0));
      if ($47) { label = 10; break; } else { label = 11; break; }
    case 10:
      $1=0;
      label = 103; break;
    case 11:
      var $50=$2;
      var $51=(($50+440)|0);
      var $52=HEAP32[(($51)>>2)];
      var $53=(($52)|(0))!=0;
      if ($53) { label = 12; break; } else { label = 16; break; }
    case 12:
      var $55=$2;
      var $56=(($55+432)|0);
      var $57=HEAP32[(($56)>>2)];
      var $58=$asize;
      var $59=((($57)+($58))|0);
      $fp=$59;
      var $60=$fp;
      var $61=$2;
      var $62=(($61+432)|0);
      var $63=HEAP32[(($62)>>2)];
      var $64=(($60)>>>(0)) <= (($63)>>>(0));
      if ($64) { label = 14; break; } else { label = 13; break; }
    case 13:
      var $66=$fp;
      var $67=$2;
      var $68=(($67+440)|0);
      var $69=HEAP32[(($68)>>2)];
      var $70=(($66)>>>(0)) > (($69)>>>(0));
      if ($70) { label = 14; break; } else { label = 15; break; }
    case 14:
      $1=0;
      label = 103; break;
    case 15:
      label = 16; break;
    case 16:
      var $74=$2;
      var $75=(($74+444)|0);
      var $76=HEAP32[(($75)>>2)];
      var $77=$76 & 4;
      var $78=(($77)|(0))!=0;
      if ($78) { label = 53; break; } else { label = 17; break; }
    case 17:
      $br=-1;
      var $80=$asize;
      $ssize=$80;
      var $81=$2;
      var $82=(($81+24)|0);
      var $83=HEAP32[(($82)>>2)];
      var $84=(($83)|(0))==0;
      if ($84) { label = 18; break; } else { label = 19; break; }
    case 18:
      var $94 = 0;label = 20; break;
    case 19:
      var $87=$2;
      var $88=$2;
      var $89=(($88+24)|0);
      var $90=HEAP32[(($89)>>2)];
      var $91=$90;
      var $92=_segment_holding($87, $91);
      var $94 = $92;label = 20; break;
    case 20:
      var $94;
      $ss=$94;
      var $95=$ss;
      var $96=(($95)|(0))==0;
      if ($96) { label = 21; break; } else { label = 33; break; }
    case 21:
      var $98=_sbrk(0);
      $base=$98;
      var $99=$base;
      var $100=(($99)|(0))!=-1;
      if ($100) { label = 22; break; } else { label = 32; break; }
    case 22:
      var $102=$base;
      var $103=$102;
      var $104=HEAP32[((((5253624)|0))>>2)];
      var $105=((($104)-(1))|0);
      var $106=$103 & $105;
      var $107=(($106)|(0))==0;
      if ($107) { label = 24; break; } else { label = 23; break; }
    case 23:
      var $109=$base;
      var $110=$109;
      var $111=HEAP32[((((5253624)|0))>>2)];
      var $112=((($111)-(1))|0);
      var $113=((($110)+($112))|0);
      var $114=HEAP32[((((5253624)|0))>>2)];
      var $115=((($114)-(1))|0);
      var $116=$115 ^ -1;
      var $117=$113 & $116;
      var $118=$base;
      var $119=$118;
      var $120=((($117)-($119))|0);
      var $121=$ssize;
      var $122=((($121)+($120))|0);
      $ssize=$122;
      label = 24; break;
    case 24:
      var $124=$2;
      var $125=(($124+432)|0);
      var $126=HEAP32[(($125)>>2)];
      var $127=$ssize;
      var $128=((($126)+($127))|0);
      $fp1=$128;
      var $129=$ssize;
      var $130=$3;
      var $131=(($129)>>>(0)) > (($130)>>>(0));
      if ($131) { label = 25; break; } else { label = 31; break; }
    case 25:
      var $133=$ssize;
      var $134=(($133)>>>(0)) < 2147483647;
      if ($134) { label = 26; break; } else { label = 31; break; }
    case 26:
      var $136=$2;
      var $137=(($136+440)|0);
      var $138=HEAP32[(($137)>>2)];
      var $139=(($138)|(0))==0;
      if ($139) { label = 29; break; } else { label = 27; break; }
    case 27:
      var $141=$fp1;
      var $142=$2;
      var $143=(($142+432)|0);
      var $144=HEAP32[(($143)>>2)];
      var $145=(($141)>>>(0)) > (($144)>>>(0));
      if ($145) { label = 28; break; } else { label = 31; break; }
    case 28:
      var $147=$fp1;
      var $148=$2;
      var $149=(($148+440)|0);
      var $150=HEAP32[(($149)>>2)];
      var $151=(($147)>>>(0)) <= (($150)>>>(0));
      if ($151) { label = 29; break; } else { label = 31; break; }
    case 29:
      var $153=$ssize;
      var $154=_sbrk($153);
      $br=$154;
      var $155=$base;
      var $156=(($154)|(0))==(($155)|(0));
      if ($156) { label = 30; break; } else { label = 31; break; }
    case 30:
      var $158=$base;
      $tbase=$158;
      var $159=$ssize;
      $tsize=$159;
      label = 31; break;
    case 31:
      label = 32; break;
    case 32:
      label = 37; break;
    case 33:
      var $163=$3;
      var $164=$2;
      var $165=(($164+12)|0);
      var $166=HEAP32[(($165)>>2)];
      var $167=((($163)-($166))|0);
      var $168=((($167)+(48))|0);
      var $169=HEAP32[((((5253628)|0))>>2)];
      var $170=((($169)-(1))|0);
      var $171=((($168)+($170))|0);
      var $172=HEAP32[((((5253628)|0))>>2)];
      var $173=((($172)-(1))|0);
      var $174=$173 ^ -1;
      var $175=$171 & $174;
      $ssize=$175;
      var $176=$ssize;
      var $177=(($176)>>>(0)) < 2147483647;
      if ($177) { label = 34; break; } else { label = 36; break; }
    case 34:
      var $179=$ssize;
      var $180=_sbrk($179);
      $br=$180;
      var $181=$ss;
      var $182=(($181)|0);
      var $183=HEAP32[(($182)>>2)];
      var $184=$ss;
      var $185=(($184+4)|0);
      var $186=HEAP32[(($185)>>2)];
      var $187=(($183+$186)|0);
      var $188=(($180)|(0))==(($187)|(0));
      if ($188) { label = 35; break; } else { label = 36; break; }
    case 35:
      var $190=$br;
      $tbase=$190;
      var $191=$ssize;
      $tsize=$191;
      label = 36; break;
    case 36:
      label = 37; break;
    case 37:
      var $194=$tbase;
      var $195=(($194)|(0))==-1;
      if ($195) { label = 38; break; } else { label = 52; break; }
    case 38:
      var $197=$br;
      var $198=(($197)|(0))!=-1;
      if ($198) { label = 39; break; } else { label = 48; break; }
    case 39:
      var $200=$ssize;
      var $201=(($200)>>>(0)) < 2147483647;
      if ($201) { label = 40; break; } else { label = 47; break; }
    case 40:
      var $203=$ssize;
      var $204=$3;
      var $205=((($204)+(48))|0);
      var $206=(($203)>>>(0)) < (($205)>>>(0));
      if ($206) { label = 41; break; } else { label = 47; break; }
    case 41:
      var $208=$3;
      var $209=((($208)+(48))|0);
      var $210=$ssize;
      var $211=((($209)-($210))|0);
      var $212=HEAP32[((((5253628)|0))>>2)];
      var $213=((($212)-(1))|0);
      var $214=((($211)+($213))|0);
      var $215=HEAP32[((((5253628)|0))>>2)];
      var $216=((($215)-(1))|0);
      var $217=$216 ^ -1;
      var $218=$214 & $217;
      $esize=$218;
      var $219=$esize;
      var $220=(($219)>>>(0)) < 2147483647;
      if ($220) { label = 42; break; } else { label = 46; break; }
    case 42:
      var $222=$esize;
      var $223=_sbrk($222);
      $end=$223;
      var $224=$end;
      var $225=(($224)|(0))!=-1;
      if ($225) { label = 43; break; } else { label = 44; break; }
    case 43:
      var $227=$esize;
      var $228=$ssize;
      var $229=((($228)+($227))|0);
      $ssize=$229;
      label = 45; break;
    case 44:
      var $231=$ssize;
      var $232=(((-$231))|0);
      var $233=_sbrk($232);
      $br=-1;
      label = 45; break;
    case 45:
      label = 46; break;
    case 46:
      label = 47; break;
    case 47:
      label = 48; break;
    case 48:
      var $238=$br;
      var $239=(($238)|(0))!=-1;
      if ($239) { label = 49; break; } else { label = 50; break; }
    case 49:
      var $241=$br;
      $tbase=$241;
      var $242=$ssize;
      $tsize=$242;
      label = 51; break;
    case 50:
      var $244=$2;
      var $245=(($244+444)|0);
      var $246=HEAP32[(($245)>>2)];
      var $247=$246 | 4;
      HEAP32[(($245)>>2)]=$247;
      label = 51; break;
    case 51:
      label = 52; break;
    case 52:
      label = 53; break;
    case 53:
      var $251=$tbase;
      var $252=(($251)|(0))==-1;
      if ($252) { label = 54; break; } else { label = 63; break; }
    case 54:
      var $254=$asize;
      var $255=(($254)>>>(0)) < 2147483647;
      if ($255) { label = 55; break; } else { label = 62; break; }
    case 55:
      $br2=-1;
      $end3=-1;
      var $257=$asize;
      var $258=_sbrk($257);
      $br2=$258;
      var $259=_sbrk(0);
      $end3=$259;
      var $260=$br2;
      var $261=(($260)|(0))!=-1;
      if ($261) { label = 56; break; } else { label = 61; break; }
    case 56:
      var $263=$end3;
      var $264=(($263)|(0))!=-1;
      if ($264) { label = 57; break; } else { label = 61; break; }
    case 57:
      var $266=$br2;
      var $267=$end3;
      var $268=(($266)>>>(0)) < (($267)>>>(0));
      if ($268) { label = 58; break; } else { label = 61; break; }
    case 58:
      var $270=$end3;
      var $271=$br2;
      var $272=$270;
      var $273=$271;
      var $274=((($272)-($273))|0);
      $ssize4=$274;
      var $275=$ssize4;
      var $276=$3;
      var $277=((($276)+(40))|0);
      var $278=(($275)>>>(0)) > (($277)>>>(0));
      if ($278) { label = 59; break; } else { label = 60; break; }
    case 59:
      var $280=$br2;
      $tbase=$280;
      var $281=$ssize4;
      $tsize=$281;
      label = 60; break;
    case 60:
      label = 61; break;
    case 61:
      label = 62; break;
    case 62:
      label = 63; break;
    case 63:
      var $286=$tbase;
      var $287=(($286)|(0))!=-1;
      if ($287) { label = 64; break; } else { label = 102; break; }
    case 64:
      var $289=$tsize;
      var $290=$2;
      var $291=(($290+432)|0);
      var $292=HEAP32[(($291)>>2)];
      var $293=((($292)+($289))|0);
      HEAP32[(($291)>>2)]=$293;
      var $294=$2;
      var $295=(($294+436)|0);
      var $296=HEAP32[(($295)>>2)];
      var $297=(($293)>>>(0)) > (($296)>>>(0));
      if ($297) { label = 65; break; } else { label = 66; break; }
    case 65:
      var $299=$2;
      var $300=(($299+432)|0);
      var $301=HEAP32[(($300)>>2)];
      var $302=$2;
      var $303=(($302+436)|0);
      HEAP32[(($303)>>2)]=$301;
      label = 66; break;
    case 66:
      var $305=$2;
      var $306=(($305+24)|0);
      var $307=HEAP32[(($306)>>2)];
      var $308=(($307)|(0))!=0;
      if ($308) { label = 74; break; } else { label = 67; break; }
    case 67:
      var $310=$2;
      var $311=(($310+16)|0);
      var $312=HEAP32[(($311)>>2)];
      var $313=(($312)|(0))==0;
      if ($313) { label = 69; break; } else { label = 68; break; }
    case 68:
      var $315=$tbase;
      var $316=$2;
      var $317=(($316+16)|0);
      var $318=HEAP32[(($317)>>2)];
      var $319=(($315)>>>(0)) < (($318)>>>(0));
      if ($319) { label = 69; break; } else { label = 70; break; }
    case 69:
      var $321=$tbase;
      var $322=$2;
      var $323=(($322+16)|0);
      HEAP32[(($323)>>2)]=$321;
      label = 70; break;
    case 70:
      var $325=$tbase;
      var $326=$2;
      var $327=(($326+448)|0);
      var $328=(($327)|0);
      HEAP32[(($328)>>2)]=$325;
      var $329=$tsize;
      var $330=$2;
      var $331=(($330+448)|0);
      var $332=(($331+4)|0);
      HEAP32[(($332)>>2)]=$329;
      var $333=$mmap_flag;
      var $334=$2;
      var $335=(($334+448)|0);
      var $336=(($335+12)|0);
      HEAP32[(($336)>>2)]=$333;
      var $337=HEAP32[((((5253620)|0))>>2)];
      var $338=$2;
      var $339=(($338+36)|0);
      HEAP32[(($339)>>2)]=$337;
      var $340=$2;
      var $341=(($340+32)|0);
      HEAP32[(($341)>>2)]=-1;
      var $342=$2;
      _init_bins($342);
      var $343=$2;
      var $344=(($343)|(0))==5256200;
      if ($344) { label = 71; break; } else { label = 72; break; }
    case 71:
      var $346=$2;
      var $347=$tbase;
      var $348=$347;
      var $349=$tsize;
      var $350=((($349)-(40))|0);
      _init_top($346, $348, $350);
      label = 73; break;
    case 72:
      var $352=$2;
      var $353=$352;
      var $354=((($353)-(8))|0);
      var $355=$354;
      var $356=$355;
      var $357=$2;
      var $358=$357;
      var $359=((($358)-(8))|0);
      var $360=$359;
      var $361=(($360+4)|0);
      var $362=HEAP32[(($361)>>2)];
      var $363=$362 & -8;
      var $364=(($356+$363)|0);
      var $365=$364;
      $mn=$365;
      var $366=$2;
      var $367=$mn;
      var $368=$tbase;
      var $369=$tsize;
      var $370=(($368+$369)|0);
      var $371=$mn;
      var $372=$371;
      var $373=$370;
      var $374=$372;
      var $375=((($373)-($374))|0);
      var $376=((($375)-(40))|0);
      _init_top($366, $367, $376);
      label = 73; break;
    case 73:
      label = 99; break;
    case 74:
      var $379=$2;
      var $380=(($379+448)|0);
      $sp=$380;
      label = 75; break;
    case 75:
      var $382=$sp;
      var $383=(($382)|(0))!=0;
      if ($383) { label = 76; break; } else { var $395 = 0;label = 77; break; }
    case 76:
      var $385=$tbase;
      var $386=$sp;
      var $387=(($386)|0);
      var $388=HEAP32[(($387)>>2)];
      var $389=$sp;
      var $390=(($389+4)|0);
      var $391=HEAP32[(($390)>>2)];
      var $392=(($388+$391)|0);
      var $393=(($385)|(0))!=(($392)|(0));
      var $395 = $393;label = 77; break;
    case 77:
      var $395;
      if ($395) { label = 78; break; } else { label = 79; break; }
    case 78:
      var $397=$sp;
      var $398=(($397+8)|0);
      var $399=HEAP32[(($398)>>2)];
      $sp=$399;
      label = 75; break;
    case 79:
      var $401=$sp;
      var $402=(($401)|(0))!=0;
      if ($402) { label = 80; break; } else { label = 85; break; }
    case 80:
      var $404=$sp;
      var $405=(($404+12)|0);
      var $406=HEAP32[(($405)>>2)];
      var $407=$406 & 8;
      var $408=(($407)|(0))!=0;
      if ($408) { label = 85; break; } else { label = 81; break; }
    case 81:
      var $410=$sp;
      var $411=(($410+12)|0);
      var $412=HEAP32[(($411)>>2)];
      var $413=$412 & 0;
      var $414=$mmap_flag;
      var $415=(($413)|(0))==(($414)|(0));
      if ($415) { label = 82; break; } else { label = 85; break; }
    case 82:
      var $417=$2;
      var $418=(($417+24)|0);
      var $419=HEAP32[(($418)>>2)];
      var $420=$419;
      var $421=$sp;
      var $422=(($421)|0);
      var $423=HEAP32[(($422)>>2)];
      var $424=(($420)>>>(0)) >= (($423)>>>(0));
      if ($424) { label = 83; break; } else { label = 85; break; }
    case 83:
      var $426=$2;
      var $427=(($426+24)|0);
      var $428=HEAP32[(($427)>>2)];
      var $429=$428;
      var $430=$sp;
      var $431=(($430)|0);
      var $432=HEAP32[(($431)>>2)];
      var $433=$sp;
      var $434=(($433+4)|0);
      var $435=HEAP32[(($434)>>2)];
      var $436=(($432+$435)|0);
      var $437=(($429)>>>(0)) < (($436)>>>(0));
      if ($437) { label = 84; break; } else { label = 85; break; }
    case 84:
      var $439=$tsize;
      var $440=$sp;
      var $441=(($440+4)|0);
      var $442=HEAP32[(($441)>>2)];
      var $443=((($442)+($439))|0);
      HEAP32[(($441)>>2)]=$443;
      var $444=$2;
      var $445=$2;
      var $446=(($445+24)|0);
      var $447=HEAP32[(($446)>>2)];
      var $448=$2;
      var $449=(($448+12)|0);
      var $450=HEAP32[(($449)>>2)];
      var $451=$tsize;
      var $452=((($450)+($451))|0);
      _init_top($444, $447, $452);
      label = 98; break;
    case 85:
      var $454=$tbase;
      var $455=$2;
      var $456=(($455+16)|0);
      var $457=HEAP32[(($456)>>2)];
      var $458=(($454)>>>(0)) < (($457)>>>(0));
      if ($458) { label = 86; break; } else { label = 87; break; }
    case 86:
      var $460=$tbase;
      var $461=$2;
      var $462=(($461+16)|0);
      HEAP32[(($462)>>2)]=$460;
      label = 87; break;
    case 87:
      var $464=$2;
      var $465=(($464+448)|0);
      $sp=$465;
      label = 88; break;
    case 88:
      var $467=$sp;
      var $468=(($467)|(0))!=0;
      if ($468) { label = 89; break; } else { var $478 = 0;label = 90; break; }
    case 89:
      var $470=$sp;
      var $471=(($470)|0);
      var $472=HEAP32[(($471)>>2)];
      var $473=$tbase;
      var $474=$tsize;
      var $475=(($473+$474)|0);
      var $476=(($472)|(0))!=(($475)|(0));
      var $478 = $476;label = 90; break;
    case 90:
      var $478;
      if ($478) { label = 91; break; } else { label = 92; break; }
    case 91:
      var $480=$sp;
      var $481=(($480+8)|0);
      var $482=HEAP32[(($481)>>2)];
      $sp=$482;
      label = 88; break;
    case 92:
      var $484=$sp;
      var $485=(($484)|(0))!=0;
      if ($485) { label = 93; break; } else { label = 96; break; }
    case 93:
      var $487=$sp;
      var $488=(($487+12)|0);
      var $489=HEAP32[(($488)>>2)];
      var $490=$489 & 8;
      var $491=(($490)|(0))!=0;
      if ($491) { label = 96; break; } else { label = 94; break; }
    case 94:
      var $493=$sp;
      var $494=(($493+12)|0);
      var $495=HEAP32[(($494)>>2)];
      var $496=$495 & 0;
      var $497=$mmap_flag;
      var $498=(($496)|(0))==(($497)|(0));
      if ($498) { label = 95; break; } else { label = 96; break; }
    case 95:
      var $500=$sp;
      var $501=(($500)|0);
      var $502=HEAP32[(($501)>>2)];
      $oldbase=$502;
      var $503=$tbase;
      var $504=$sp;
      var $505=(($504)|0);
      HEAP32[(($505)>>2)]=$503;
      var $506=$tsize;
      var $507=$sp;
      var $508=(($507+4)|0);
      var $509=HEAP32[(($508)>>2)];
      var $510=((($509)+($506))|0);
      HEAP32[(($508)>>2)]=$510;
      var $511=$2;
      var $512=$tbase;
      var $513=$oldbase;
      var $514=$3;
      var $515=_prepend_alloc($511, $512, $513, $514);
      $1=$515;
      label = 103; break;
    case 96:
      var $517=$2;
      var $518=$tbase;
      var $519=$tsize;
      var $520=$mmap_flag;
      _add_segment($517, $518, $519, $520);
      label = 97; break;
    case 97:
      label = 98; break;
    case 98:
      label = 99; break;
    case 99:
      var $524=$3;
      var $525=$2;
      var $526=(($525+12)|0);
      var $527=HEAP32[(($526)>>2)];
      var $528=(($524)>>>(0)) < (($527)>>>(0));
      if ($528) { label = 100; break; } else { label = 101; break; }
    case 100:
      var $530=$3;
      var $531=$2;
      var $532=(($531+12)|0);
      var $533=HEAP32[(($532)>>2)];
      var $534=((($533)-($530))|0);
      HEAP32[(($532)>>2)]=$534;
      $rsize=$534;
      var $535=$2;
      var $536=(($535+24)|0);
      var $537=HEAP32[(($536)>>2)];
      $p=$537;
      var $538=$p;
      var $539=$538;
      var $540=$3;
      var $541=(($539+$540)|0);
      var $542=$541;
      var $543=$2;
      var $544=(($543+24)|0);
      HEAP32[(($544)>>2)]=$542;
      $r=$542;
      var $545=$rsize;
      var $546=$545 | 1;
      var $547=$r;
      var $548=(($547+4)|0);
      HEAP32[(($548)>>2)]=$546;
      var $549=$3;
      var $550=$549 | 1;
      var $551=$550 | 2;
      var $552=$p;
      var $553=(($552+4)|0);
      HEAP32[(($553)>>2)]=$551;
      var $554=$p;
      var $555=$554;
      var $556=(($555+8)|0);
      $1=$556;
      label = 103; break;
    case 101:
      label = 102; break;
    case 102:
      var $559=___errno_location();
      HEAP32[(($559)>>2)]=12;
      $1=0;
      label = 103; break;
    case 103:
      var $561=$1;
      return $561;
    default: assert(0, "bad label: " + label);
  }
}
function _init_mparams() {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $magic;
      var $psize;
      var $gsize;
      var $1=HEAP32[((((5253620)|0))>>2)];
      var $2=(($1)|(0))==0;
      if ($2) { label = 2; break; } else { label = 6; break; }
    case 2:
      var $4=_sysconf(8);
      $psize=$4;
      var $5=$psize;
      $gsize=$5;
      var $6=$gsize;
      var $7=$gsize;
      var $8=((($7)-(1))|0);
      var $9=$6 & $8;
      var $10=(($9)|(0))!=0;
      if ($10) { label = 4; break; } else { label = 3; break; }
    case 3:
      var $12=$psize;
      var $13=$psize;
      var $14=((($13)-(1))|0);
      var $15=$12 & $14;
      var $16=(($15)|(0))!=0;
      if ($16) { label = 4; break; } else { label = 5; break; }
    case 4:
      _abort();
      throw "Reached an unreachable!"
    case 5:
      var $19=$gsize;
      HEAP32[((((5253628)|0))>>2)]=$19;
      var $20=$psize;
      HEAP32[((((5253624)|0))>>2)]=$20;
      HEAP32[((((5253632)|0))>>2)]=-1;
      HEAP32[((((5253636)|0))>>2)]=2097152;
      HEAP32[((((5253640)|0))>>2)]=0;
      var $21=HEAP32[((((5253640)|0))>>2)];
      HEAP32[((((5256644)|0))>>2)]=$21;
      var $22=_time(0);
      var $23=$22 ^ 1431655765;
      $magic=$23;
      var $24=$magic;
      var $25=$24 | 8;
      $magic=$25;
      var $26=$magic;
      var $27=$26 & -8;
      $magic=$27;
      var $28=$magic;
      HEAP32[((((5253620)|0))>>2)]=$28;
      label = 6; break;
    case 6:
      return 1;
    default: assert(0, "bad label: " + label);
  }
}
function _init_top($m, $p, $psize) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $offset;
      $1=$m;
      $2=$p;
      $3=$psize;
      var $4=$2;
      var $5=$4;
      var $6=(($5+8)|0);
      var $7=$6;
      var $8=$7 & 7;
      var $9=(($8)|(0))==0;
      if ($9) { label = 2; break; } else { label = 3; break; }
    case 2:
      var $20 = 0;label = 4; break;
    case 3:
      var $12=$2;
      var $13=$12;
      var $14=(($13+8)|0);
      var $15=$14;
      var $16=$15 & 7;
      var $17=(((8)-($16))|0);
      var $18=$17 & 7;
      var $20 = $18;label = 4; break;
    case 4:
      var $20;
      $offset=$20;
      var $21=$2;
      var $22=$21;
      var $23=$offset;
      var $24=(($22+$23)|0);
      var $25=$24;
      $2=$25;
      var $26=$offset;
      var $27=$3;
      var $28=((($27)-($26))|0);
      $3=$28;
      var $29=$2;
      var $30=$1;
      var $31=(($30+24)|0);
      HEAP32[(($31)>>2)]=$29;
      var $32=$3;
      var $33=$1;
      var $34=(($33+12)|0);
      HEAP32[(($34)>>2)]=$32;
      var $35=$3;
      var $36=$35 | 1;
      var $37=$2;
      var $38=(($37+4)|0);
      HEAP32[(($38)>>2)]=$36;
      var $39=$2;
      var $40=$39;
      var $41=$3;
      var $42=(($40+$41)|0);
      var $43=$42;
      var $44=(($43+4)|0);
      HEAP32[(($44)>>2)]=40;
      var $45=HEAP32[((((5253636)|0))>>2)];
      var $46=$1;
      var $47=(($46+28)|0);
      HEAP32[(($47)>>2)]=$45;
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _mmap_alloc($m, $nb) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $mmsize;
      var $fp;
      var $mm;
      var $offset;
      var $psize;
      var $p;
      $2=$m;
      $3=$nb;
      var $4=$3;
      var $5=((($4)+(24))|0);
      var $6=((($5)+(7))|0);
      var $7=HEAP32[((((5253624)|0))>>2)];
      var $8=((($7)-(1))|0);
      var $9=((($6)+($8))|0);
      var $10=HEAP32[((((5253624)|0))>>2)];
      var $11=((($10)-(1))|0);
      var $12=$11 ^ -1;
      var $13=$9 & $12;
      $mmsize=$13;
      var $14=$2;
      var $15=(($14+440)|0);
      var $16=HEAP32[(($15)>>2)];
      var $17=(($16)|(0))!=0;
      if ($17) { label = 2; break; } else { label = 6; break; }
    case 2:
      var $19=$2;
      var $20=(($19+432)|0);
      var $21=HEAP32[(($20)>>2)];
      var $22=$mmsize;
      var $23=((($21)+($22))|0);
      $fp=$23;
      var $24=$fp;
      var $25=$2;
      var $26=(($25+432)|0);
      var $27=HEAP32[(($26)>>2)];
      var $28=(($24)>>>(0)) <= (($27)>>>(0));
      if ($28) { label = 4; break; } else { label = 3; break; }
    case 3:
      var $30=$fp;
      var $31=$2;
      var $32=(($31+440)|0);
      var $33=HEAP32[(($32)>>2)];
      var $34=(($30)>>>(0)) > (($33)>>>(0));
      if ($34) { label = 4; break; } else { label = 5; break; }
    case 4:
      $1=0;
      label = 19; break;
    case 5:
      label = 6; break;
    case 6:
      var $38=$mmsize;
      var $39=$3;
      var $40=(($38)>>>(0)) > (($39)>>>(0));
      if ($40) { label = 7; break; } else { label = 18; break; }
    case 7:
      $mm=-1;
      var $42=$mm;
      var $43=(($42)|(0))!=-1;
      if ($43) { label = 8; break; } else { label = 17; break; }
    case 8:
      var $45=$mm;
      var $46=(($45+8)|0);
      var $47=$46;
      var $48=$47 & 7;
      var $49=(($48)|(0))==0;
      if ($49) { label = 9; break; } else { label = 10; break; }
    case 9:
      var $59 = 0;label = 11; break;
    case 10:
      var $52=$mm;
      var $53=(($52+8)|0);
      var $54=$53;
      var $55=$54 & 7;
      var $56=(((8)-($55))|0);
      var $57=$56 & 7;
      var $59 = $57;label = 11; break;
    case 11:
      var $59;
      $offset=$59;
      var $60=$mmsize;
      var $61=$offset;
      var $62=((($60)-($61))|0);
      var $63=((($62)-(16))|0);
      $psize=$63;
      var $64=$mm;
      var $65=$offset;
      var $66=(($64+$65)|0);
      var $67=$66;
      $p=$67;
      var $68=$offset;
      var $69=$p;
      var $70=(($69)|0);
      HEAP32[(($70)>>2)]=$68;
      var $71=$psize;
      var $72=$p;
      var $73=(($72+4)|0);
      HEAP32[(($73)>>2)]=$71;
      var $74=$p;
      var $75=$74;
      var $76=$psize;
      var $77=(($75+$76)|0);
      var $78=$77;
      var $79=(($78+4)|0);
      HEAP32[(($79)>>2)]=7;
      var $80=$p;
      var $81=$80;
      var $82=$psize;
      var $83=((($82)+(4))|0);
      var $84=(($81+$83)|0);
      var $85=$84;
      var $86=(($85+4)|0);
      HEAP32[(($86)>>2)]=0;
      var $87=$2;
      var $88=(($87+16)|0);
      var $89=HEAP32[(($88)>>2)];
      var $90=(($89)|(0))==0;
      if ($90) { label = 13; break; } else { label = 12; break; }
    case 12:
      var $92=$mm;
      var $93=$2;
      var $94=(($93+16)|0);
      var $95=HEAP32[(($94)>>2)];
      var $96=(($92)>>>(0)) < (($95)>>>(0));
      if ($96) { label = 13; break; } else { label = 14; break; }
    case 13:
      var $98=$mm;
      var $99=$2;
      var $100=(($99+16)|0);
      HEAP32[(($100)>>2)]=$98;
      label = 14; break;
    case 14:
      var $102=$mmsize;
      var $103=$2;
      var $104=(($103+432)|0);
      var $105=HEAP32[(($104)>>2)];
      var $106=((($105)+($102))|0);
      HEAP32[(($104)>>2)]=$106;
      var $107=$2;
      var $108=(($107+436)|0);
      var $109=HEAP32[(($108)>>2)];
      var $110=(($106)>>>(0)) > (($109)>>>(0));
      if ($110) { label = 15; break; } else { label = 16; break; }
    case 15:
      var $112=$2;
      var $113=(($112+432)|0);
      var $114=HEAP32[(($113)>>2)];
      var $115=$2;
      var $116=(($115+436)|0);
      HEAP32[(($116)>>2)]=$114;
      label = 16; break;
    case 16:
      var $118=$p;
      var $119=$118;
      var $120=(($119+8)|0);
      $1=$120;
      label = 19; break;
    case 17:
      label = 18; break;
    case 18:
      $1=0;
      label = 19; break;
    case 19:
      var $124=$1;
      return $124;
    default: assert(0, "bad label: " + label);
  }
}
function _init_bins($m) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $i;
      var $bin;
      $1=$m;
      $i=0;
      label = 2; break;
    case 2:
      var $3=$i;
      var $4=(($3)>>>(0)) < 32;
      if ($4) { label = 3; break; } else { label = 5; break; }
    case 3:
      var $6=$i;
      var $7=$6 << 1;
      var $8=$1;
      var $9=(($8+40)|0);
      var $10=(($9+($7<<2))|0);
      var $11=$10;
      var $12=$11;
      $bin=$12;
      var $13=$bin;
      var $14=$bin;
      var $15=(($14+12)|0);
      HEAP32[(($15)>>2)]=$13;
      var $16=$bin;
      var $17=(($16+8)|0);
      HEAP32[(($17)>>2)]=$13;
      label = 4; break;
    case 4:
      var $19=$i;
      var $20=((($19)+(1))|0);
      $i=$20;
      label = 2; break;
    case 5:
      return;
    default: assert(0, "bad label: " + label);
  }
}
function _prepend_alloc($m, $newbase, $oldbase, $nb) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $4;
      var $p;
      var $oldfirst;
      var $psize;
      var $q;
      var $qsize;
      var $tsize;
      var $dsize;
      var $nsize;
      var $F;
      var $B;
      var $I;
      var $TP;
      var $XP;
      var $R;
      var $F1;
      var $RP;
      var $CP;
      var $H;
      var $C0;
      var $C1;
      var $I2;
      var $B3;
      var $F4;
      var $TP5;
      var $H6;
      var $I7;
      var $X;
      var $Y;
      var $N;
      var $K;
      var $T;
      var $K8;
      var $C;
      var $F9;
      $1=$m;
      $2=$newbase;
      $3=$oldbase;
      $4=$nb;
      var $5=$2;
      var $6=$2;
      var $7=(($6+8)|0);
      var $8=$7;
      var $9=$8 & 7;
      var $10=(($9)|(0))==0;
      if ($10) { label = 2; break; } else { label = 3; break; }
    case 2:
      var $20 = 0;label = 4; break;
    case 3:
      var $13=$2;
      var $14=(($13+8)|0);
      var $15=$14;
      var $16=$15 & 7;
      var $17=(((8)-($16))|0);
      var $18=$17 & 7;
      var $20 = $18;label = 4; break;
    case 4:
      var $20;
      var $21=(($5+$20)|0);
      var $22=$21;
      $p=$22;
      var $23=$3;
      var $24=$3;
      var $25=(($24+8)|0);
      var $26=$25;
      var $27=$26 & 7;
      var $28=(($27)|(0))==0;
      if ($28) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $38 = 0;label = 7; break;
    case 6:
      var $31=$3;
      var $32=(($31+8)|0);
      var $33=$32;
      var $34=$33 & 7;
      var $35=(((8)-($34))|0);
      var $36=$35 & 7;
      var $38 = $36;label = 7; break;
    case 7:
      var $38;
      var $39=(($23+$38)|0);
      var $40=$39;
      $oldfirst=$40;
      var $41=$oldfirst;
      var $42=$41;
      var $43=$p;
      var $44=$43;
      var $45=$42;
      var $46=$44;
      var $47=((($45)-($46))|0);
      $psize=$47;
      var $48=$p;
      var $49=$48;
      var $50=$4;
      var $51=(($49+$50)|0);
      var $52=$51;
      $q=$52;
      var $53=$psize;
      var $54=$4;
      var $55=((($53)-($54))|0);
      $qsize=$55;
      var $56=$4;
      var $57=$56 | 1;
      var $58=$57 | 2;
      var $59=$p;
      var $60=(($59+4)|0);
      HEAP32[(($60)>>2)]=$58;
      var $61=$oldfirst;
      var $62=$1;
      var $63=(($62+24)|0);
      var $64=HEAP32[(($63)>>2)];
      var $65=(($61)|(0))==(($64)|(0));
      if ($65) { label = 8; break; } else { label = 9; break; }
    case 8:
      var $67=$qsize;
      var $68=$1;
      var $69=(($68+12)|0);
      var $70=HEAP32[(($69)>>2)];
      var $71=((($70)+($67))|0);
      HEAP32[(($69)>>2)]=$71;
      $tsize=$71;
      var $72=$q;
      var $73=$1;
      var $74=(($73+24)|0);
      HEAP32[(($74)>>2)]=$72;
      var $75=$tsize;
      var $76=$75 | 1;
      var $77=$q;
      var $78=(($77+4)|0);
      HEAP32[(($78)>>2)]=$76;
      label = 118; break;
    case 9:
      var $80=$oldfirst;
      var $81=$1;
      var $82=(($81+20)|0);
      var $83=HEAP32[(($82)>>2)];
      var $84=(($80)|(0))==(($83)|(0));
      if ($84) { label = 10; break; } else { label = 11; break; }
    case 10:
      var $86=$qsize;
      var $87=$1;
      var $88=(($87+8)|0);
      var $89=HEAP32[(($88)>>2)];
      var $90=((($89)+($86))|0);
      HEAP32[(($88)>>2)]=$90;
      $dsize=$90;
      var $91=$q;
      var $92=$1;
      var $93=(($92+20)|0);
      HEAP32[(($93)>>2)]=$91;
      var $94=$dsize;
      var $95=$94 | 1;
      var $96=$q;
      var $97=(($96+4)|0);
      HEAP32[(($97)>>2)]=$95;
      var $98=$dsize;
      var $99=$q;
      var $100=$99;
      var $101=$dsize;
      var $102=(($100+$101)|0);
      var $103=$102;
      var $104=(($103)|0);
      HEAP32[(($104)>>2)]=$98;
      label = 117; break;
    case 11:
      var $106=$oldfirst;
      var $107=(($106+4)|0);
      var $108=HEAP32[(($107)>>2)];
      var $109=$108 & 3;
      var $110=(($109)|(0))!=1;
      if ($110) { label = 81; break; } else { label = 12; break; }
    case 12:
      var $112=$oldfirst;
      var $113=(($112+4)|0);
      var $114=HEAP32[(($113)>>2)];
      var $115=$114 & -8;
      $nsize=$115;
      var $116=$nsize;
      var $117=$116 >>> 3;
      var $118=(($117)>>>(0)) < 32;
      if ($118) { label = 13; break; } else { label = 31; break; }
    case 13:
      var $120=$oldfirst;
      var $121=(($120+8)|0);
      var $122=HEAP32[(($121)>>2)];
      $F=$122;
      var $123=$oldfirst;
      var $124=(($123+12)|0);
      var $125=HEAP32[(($124)>>2)];
      $B=$125;
      var $126=$nsize;
      var $127=$126 >>> 3;
      $I=$127;
      var $128=$F;
      var $129=$I;
      var $130=$129 << 1;
      var $131=$1;
      var $132=(($131+40)|0);
      var $133=(($132+($130<<2))|0);
      var $134=$133;
      var $135=$134;
      var $136=(($128)|(0))==(($135)|(0));
      if ($136) { var $153 = 1;label = 17; break; } else { label = 14; break; }
    case 14:
      var $138=$F;
      var $139=$138;
      var $140=$1;
      var $141=(($140+16)|0);
      var $142=HEAP32[(($141)>>2)];
      var $143=(($139)>>>(0)) >= (($142)>>>(0));
      if ($143) { label = 15; break; } else { var $151 = 0;label = 16; break; }
    case 15:
      var $145=$F;
      var $146=(($145+12)|0);
      var $147=HEAP32[(($146)>>2)];
      var $148=$oldfirst;
      var $149=(($147)|(0))==(($148)|(0));
      var $151 = $149;label = 16; break;
    case 16:
      var $151;
      var $153 = $151;label = 17; break;
    case 17:
      var $153;
      var $154=(($153)&(1));
      var $155=($154);
      var $156=(($155)|(0))!=0;
      if ($156) { label = 18; break; } else { label = 29; break; }
    case 18:
      var $158=$B;
      var $159=$F;
      var $160=(($158)|(0))==(($159)|(0));
      if ($160) { label = 19; break; } else { label = 20; break; }
    case 19:
      var $162=$I;
      var $163=1 << $162;
      var $164=$163 ^ -1;
      var $165=$1;
      var $166=(($165)|0);
      var $167=HEAP32[(($166)>>2)];
      var $168=$167 & $164;
      HEAP32[(($166)>>2)]=$168;
      label = 28; break;
    case 20:
      var $170=$B;
      var $171=$I;
      var $172=$171 << 1;
      var $173=$1;
      var $174=(($173+40)|0);
      var $175=(($174+($172<<2))|0);
      var $176=$175;
      var $177=$176;
      var $178=(($170)|(0))==(($177)|(0));
      if ($178) { var $195 = 1;label = 24; break; } else { label = 21; break; }
    case 21:
      var $180=$B;
      var $181=$180;
      var $182=$1;
      var $183=(($182+16)|0);
      var $184=HEAP32[(($183)>>2)];
      var $185=(($181)>>>(0)) >= (($184)>>>(0));
      if ($185) { label = 22; break; } else { var $193 = 0;label = 23; break; }
    case 22:
      var $187=$B;
      var $188=(($187+8)|0);
      var $189=HEAP32[(($188)>>2)];
      var $190=$oldfirst;
      var $191=(($189)|(0))==(($190)|(0));
      var $193 = $191;label = 23; break;
    case 23:
      var $193;
      var $195 = $193;label = 24; break;
    case 24:
      var $195;
      var $196=(($195)&(1));
      var $197=($196);
      var $198=(($197)|(0))!=0;
      if ($198) { label = 25; break; } else { label = 26; break; }
    case 25:
      var $200=$B;
      var $201=$F;
      var $202=(($201+12)|0);
      HEAP32[(($202)>>2)]=$200;
      var $203=$F;
      var $204=$B;
      var $205=(($204+8)|0);
      HEAP32[(($205)>>2)]=$203;
      label = 27; break;
    case 26:
      _abort();
      throw "Reached an unreachable!"
    case 27:
      label = 28; break;
    case 28:
      label = 30; break;
    case 29:
      _abort();
      throw "Reached an unreachable!"
    case 30:
      label = 80; break;
    case 31:
      var $212=$oldfirst;
      var $213=$212;
      $TP=$213;
      var $214=$TP;
      var $215=(($214+24)|0);
      var $216=HEAP32[(($215)>>2)];
      $XP=$216;
      var $217=$TP;
      var $218=(($217+12)|0);
      var $219=HEAP32[(($218)>>2)];
      var $220=$TP;
      var $221=(($219)|(0))!=(($220)|(0));
      if ($221) { label = 32; break; } else { label = 39; break; }
    case 32:
      var $223=$TP;
      var $224=(($223+8)|0);
      var $225=HEAP32[(($224)>>2)];
      $F1=$225;
      var $226=$TP;
      var $227=(($226+12)|0);
      var $228=HEAP32[(($227)>>2)];
      $R=$228;
      var $229=$F1;
      var $230=$229;
      var $231=$1;
      var $232=(($231+16)|0);
      var $233=HEAP32[(($232)>>2)];
      var $234=(($230)>>>(0)) >= (($233)>>>(0));
      if ($234) { label = 33; break; } else { var $248 = 0;label = 35; break; }
    case 33:
      var $236=$F1;
      var $237=(($236+12)|0);
      var $238=HEAP32[(($237)>>2)];
      var $239=$TP;
      var $240=(($238)|(0))==(($239)|(0));
      if ($240) { label = 34; break; } else { var $248 = 0;label = 35; break; }
    case 34:
      var $242=$R;
      var $243=(($242+8)|0);
      var $244=HEAP32[(($243)>>2)];
      var $245=$TP;
      var $246=(($244)|(0))==(($245)|(0));
      var $248 = $246;label = 35; break;
    case 35:
      var $248;
      var $249=(($248)&(1));
      var $250=($249);
      var $251=(($250)|(0))!=0;
      if ($251) { label = 36; break; } else { label = 37; break; }
    case 36:
      var $253=$R;
      var $254=$F1;
      var $255=(($254+12)|0);
      HEAP32[(($255)>>2)]=$253;
      var $256=$F1;
      var $257=$R;
      var $258=(($257+8)|0);
      HEAP32[(($258)>>2)]=$256;
      label = 38; break;
    case 37:
      _abort();
      throw "Reached an unreachable!"
    case 38:
      label = 51; break;
    case 39:
      var $262=$TP;
      var $263=(($262+16)|0);
      var $264=(($263+4)|0);
      $RP=$264;
      var $265=HEAP32[(($264)>>2)];
      $R=$265;
      var $266=(($265)|(0))!=0;
      if ($266) { label = 41; break; } else { label = 40; break; }
    case 40:
      var $268=$TP;
      var $269=(($268+16)|0);
      var $270=(($269)|0);
      $RP=$270;
      var $271=HEAP32[(($270)>>2)];
      $R=$271;
      var $272=(($271)|(0))!=0;
      if ($272) { label = 41; break; } else { label = 50; break; }
    case 41:
      label = 42; break;
    case 42:
      var $275=$R;
      var $276=(($275+16)|0);
      var $277=(($276+4)|0);
      $CP=$277;
      var $278=HEAP32[(($277)>>2)];
      var $279=(($278)|(0))!=0;
      if ($279) { var $287 = 1;label = 44; break; } else { label = 43; break; }
    case 43:
      var $281=$R;
      var $282=(($281+16)|0);
      var $283=(($282)|0);
      $CP=$283;
      var $284=HEAP32[(($283)>>2)];
      var $285=(($284)|(0))!=0;
      var $287 = $285;label = 44; break;
    case 44:
      var $287;
      if ($287) { label = 45; break; } else { label = 46; break; }
    case 45:
      var $289=$CP;
      $RP=$289;
      var $290=HEAP32[(($289)>>2)];
      $R=$290;
      label = 42; break;
    case 46:
      var $292=$RP;
      var $293=$292;
      var $294=$1;
      var $295=(($294+16)|0);
      var $296=HEAP32[(($295)>>2)];
      var $297=(($293)>>>(0)) >= (($296)>>>(0));
      var $298=(($297)&(1));
      var $299=($298);
      var $300=(($299)|(0))!=0;
      if ($300) { label = 47; break; } else { label = 48; break; }
    case 47:
      var $302=$RP;
      HEAP32[(($302)>>2)]=0;
      label = 49; break;
    case 48:
      _abort();
      throw "Reached an unreachable!"
    case 49:
      label = 50; break;
    case 50:
      label = 51; break;
    case 51:
      var $307=$XP;
      var $308=(($307)|(0))!=0;
      if ($308) { label = 52; break; } else { label = 79; break; }
    case 52:
      var $310=$TP;
      var $311=(($310+28)|0);
      var $312=HEAP32[(($311)>>2)];
      var $313=$1;
      var $314=(($313+304)|0);
      var $315=(($314+($312<<2))|0);
      $H=$315;
      var $316=$TP;
      var $317=$H;
      var $318=HEAP32[(($317)>>2)];
      var $319=(($316)|(0))==(($318)|(0));
      if ($319) { label = 53; break; } else { label = 56; break; }
    case 53:
      var $321=$R;
      var $322=$H;
      HEAP32[(($322)>>2)]=$321;
      var $323=(($321)|(0))==0;
      if ($323) { label = 54; break; } else { label = 55; break; }
    case 54:
      var $325=$TP;
      var $326=(($325+28)|0);
      var $327=HEAP32[(($326)>>2)];
      var $328=1 << $327;
      var $329=$328 ^ -1;
      var $330=$1;
      var $331=(($330+4)|0);
      var $332=HEAP32[(($331)>>2)];
      var $333=$332 & $329;
      HEAP32[(($331)>>2)]=$333;
      label = 55; break;
    case 55:
      label = 63; break;
    case 56:
      var $336=$XP;
      var $337=$336;
      var $338=$1;
      var $339=(($338+16)|0);
      var $340=HEAP32[(($339)>>2)];
      var $341=(($337)>>>(0)) >= (($340)>>>(0));
      var $342=(($341)&(1));
      var $343=($342);
      var $344=(($343)|(0))!=0;
      if ($344) { label = 57; break; } else { label = 61; break; }
    case 57:
      var $346=$XP;
      var $347=(($346+16)|0);
      var $348=(($347)|0);
      var $349=HEAP32[(($348)>>2)];
      var $350=$TP;
      var $351=(($349)|(0))==(($350)|(0));
      if ($351) { label = 58; break; } else { label = 59; break; }
    case 58:
      var $353=$R;
      var $354=$XP;
      var $355=(($354+16)|0);
      var $356=(($355)|0);
      HEAP32[(($356)>>2)]=$353;
      label = 60; break;
    case 59:
      var $358=$R;
      var $359=$XP;
      var $360=(($359+16)|0);
      var $361=(($360+4)|0);
      HEAP32[(($361)>>2)]=$358;
      label = 60; break;
    case 60:
      label = 62; break;
    case 61:
      _abort();
      throw "Reached an unreachable!"
    case 62:
      label = 63; break;
    case 63:
      var $366=$R;
      var $367=(($366)|(0))!=0;
      if ($367) { label = 64; break; } else { label = 78; break; }
    case 64:
      var $369=$R;
      var $370=$369;
      var $371=$1;
      var $372=(($371+16)|0);
      var $373=HEAP32[(($372)>>2)];
      var $374=(($370)>>>(0)) >= (($373)>>>(0));
      var $375=(($374)&(1));
      var $376=($375);
      var $377=(($376)|(0))!=0;
      if ($377) { label = 65; break; } else { label = 76; break; }
    case 65:
      var $379=$XP;
      var $380=$R;
      var $381=(($380+24)|0);
      HEAP32[(($381)>>2)]=$379;
      var $382=$TP;
      var $383=(($382+16)|0);
      var $384=(($383)|0);
      var $385=HEAP32[(($384)>>2)];
      $C0=$385;
      var $386=(($385)|(0))!=0;
      if ($386) { label = 66; break; } else { label = 70; break; }
    case 66:
      var $388=$C0;
      var $389=$388;
      var $390=$1;
      var $391=(($390+16)|0);
      var $392=HEAP32[(($391)>>2)];
      var $393=(($389)>>>(0)) >= (($392)>>>(0));
      var $394=(($393)&(1));
      var $395=($394);
      var $396=(($395)|(0))!=0;
      if ($396) { label = 67; break; } else { label = 68; break; }
    case 67:
      var $398=$C0;
      var $399=$R;
      var $400=(($399+16)|0);
      var $401=(($400)|0);
      HEAP32[(($401)>>2)]=$398;
      var $402=$R;
      var $403=$C0;
      var $404=(($403+24)|0);
      HEAP32[(($404)>>2)]=$402;
      label = 69; break;
    case 68:
      _abort();
      throw "Reached an unreachable!"
    case 69:
      label = 70; break;
    case 70:
      var $408=$TP;
      var $409=(($408+16)|0);
      var $410=(($409+4)|0);
      var $411=HEAP32[(($410)>>2)];
      $C1=$411;
      var $412=(($411)|(0))!=0;
      if ($412) { label = 71; break; } else { label = 75; break; }
    case 71:
      var $414=$C1;
      var $415=$414;
      var $416=$1;
      var $417=(($416+16)|0);
      var $418=HEAP32[(($417)>>2)];
      var $419=(($415)>>>(0)) >= (($418)>>>(0));
      var $420=(($419)&(1));
      var $421=($420);
      var $422=(($421)|(0))!=0;
      if ($422) { label = 72; break; } else { label = 73; break; }
    case 72:
      var $424=$C1;
      var $425=$R;
      var $426=(($425+16)|0);
      var $427=(($426+4)|0);
      HEAP32[(($427)>>2)]=$424;
      var $428=$R;
      var $429=$C1;
      var $430=(($429+24)|0);
      HEAP32[(($430)>>2)]=$428;
      label = 74; break;
    case 73:
      _abort();
      throw "Reached an unreachable!"
    case 74:
      label = 75; break;
    case 75:
      label = 77; break;
    case 76:
      _abort();
      throw "Reached an unreachable!"
    case 77:
      label = 78; break;
    case 78:
      label = 79; break;
    case 79:
      label = 80; break;
    case 80:
      var $439=$oldfirst;
      var $440=$439;
      var $441=$nsize;
      var $442=(($440+$441)|0);
      var $443=$442;
      $oldfirst=$443;
      var $444=$nsize;
      var $445=$qsize;
      var $446=((($445)+($444))|0);
      $qsize=$446;
      label = 81; break;
    case 81:
      var $448=$oldfirst;
      var $449=(($448+4)|0);
      var $450=HEAP32[(($449)>>2)];
      var $451=$450 & -2;
      HEAP32[(($449)>>2)]=$451;
      var $452=$qsize;
      var $453=$452 | 1;
      var $454=$q;
      var $455=(($454+4)|0);
      HEAP32[(($455)>>2)]=$453;
      var $456=$qsize;
      var $457=$q;
      var $458=$457;
      var $459=$qsize;
      var $460=(($458+$459)|0);
      var $461=$460;
      var $462=(($461)|0);
      HEAP32[(($462)>>2)]=$456;
      var $463=$qsize;
      var $464=$463 >>> 3;
      var $465=(($464)>>>(0)) < 32;
      if ($465) { label = 82; break; } else { label = 89; break; }
    case 82:
      var $467=$qsize;
      var $468=$467 >>> 3;
      $I2=$468;
      var $469=$I2;
      var $470=$469 << 1;
      var $471=$1;
      var $472=(($471+40)|0);
      var $473=(($472+($470<<2))|0);
      var $474=$473;
      var $475=$474;
      $B3=$475;
      var $476=$B3;
      $F4=$476;
      var $477=$1;
      var $478=(($477)|0);
      var $479=HEAP32[(($478)>>2)];
      var $480=$I2;
      var $481=1 << $480;
      var $482=$479 & $481;
      var $483=(($482)|(0))!=0;
      if ($483) { label = 84; break; } else { label = 83; break; }
    case 83:
      var $485=$I2;
      var $486=1 << $485;
      var $487=$1;
      var $488=(($487)|0);
      var $489=HEAP32[(($488)>>2)];
      var $490=$489 | $486;
      HEAP32[(($488)>>2)]=$490;
      label = 88; break;
    case 84:
      var $492=$B3;
      var $493=(($492+8)|0);
      var $494=HEAP32[(($493)>>2)];
      var $495=$494;
      var $496=$1;
      var $497=(($496+16)|0);
      var $498=HEAP32[(($497)>>2)];
      var $499=(($495)>>>(0)) >= (($498)>>>(0));
      var $500=(($499)&(1));
      var $501=($500);
      var $502=(($501)|(0))!=0;
      if ($502) { label = 85; break; } else { label = 86; break; }
    case 85:
      var $504=$B3;
      var $505=(($504+8)|0);
      var $506=HEAP32[(($505)>>2)];
      $F4=$506;
      label = 87; break;
    case 86:
      _abort();
      throw "Reached an unreachable!"
    case 87:
      label = 88; break;
    case 88:
      var $510=$q;
      var $511=$B3;
      var $512=(($511+8)|0);
      HEAP32[(($512)>>2)]=$510;
      var $513=$q;
      var $514=$F4;
      var $515=(($514+12)|0);
      HEAP32[(($515)>>2)]=$513;
      var $516=$F4;
      var $517=$q;
      var $518=(($517+8)|0);
      HEAP32[(($518)>>2)]=$516;
      var $519=$B3;
      var $520=$q;
      var $521=(($520+12)|0);
      HEAP32[(($521)>>2)]=$519;
      label = 116; break;
    case 89:
      var $523=$q;
      var $524=$523;
      $TP5=$524;
      var $525=$qsize;
      var $526=$525 >>> 8;
      $X=$526;
      var $527=$X;
      var $528=(($527)|(0))==0;
      if ($528) { label = 90; break; } else { label = 91; break; }
    case 90:
      $I7=0;
      label = 95; break;
    case 91:
      var $531=$X;
      var $532=(($531)>>>(0)) > 65535;
      if ($532) { label = 92; break; } else { label = 93; break; }
    case 92:
      $I7=31;
      label = 94; break;
    case 93:
      var $535=$X;
      $Y=$535;
      var $536=$Y;
      var $537=((($536)-(256))|0);
      var $538=$537 >>> 16;
      var $539=$538 & 8;
      $N=$539;
      var $540=$N;
      var $541=$Y;
      var $542=$541 << $540;
      $Y=$542;
      var $543=((($542)-(4096))|0);
      var $544=$543 >>> 16;
      var $545=$544 & 4;
      $K=$545;
      var $546=$K;
      var $547=$N;
      var $548=((($547)+($546))|0);
      $N=$548;
      var $549=$K;
      var $550=$Y;
      var $551=$550 << $549;
      $Y=$551;
      var $552=((($551)-(16384))|0);
      var $553=$552 >>> 16;
      var $554=$553 & 2;
      $K=$554;
      var $555=$N;
      var $556=((($555)+($554))|0);
      $N=$556;
      var $557=$N;
      var $558=(((14)-($557))|0);
      var $559=$K;
      var $560=$Y;
      var $561=$560 << $559;
      $Y=$561;
      var $562=$561 >>> 15;
      var $563=((($558)+($562))|0);
      $K=$563;
      var $564=$K;
      var $565=$564 << 1;
      var $566=$qsize;
      var $567=$K;
      var $568=((($567)+(7))|0);
      var $569=$566 >>> (($568)>>>(0));
      var $570=$569 & 1;
      var $571=((($565)+($570))|0);
      $I7=$571;
      label = 94; break;
    case 94:
      label = 95; break;
    case 95:
      var $574=$I7;
      var $575=$1;
      var $576=(($575+304)|0);
      var $577=(($576+($574<<2))|0);
      $H6=$577;
      var $578=$I7;
      var $579=$TP5;
      var $580=(($579+28)|0);
      HEAP32[(($580)>>2)]=$578;
      var $581=$TP5;
      var $582=(($581+16)|0);
      var $583=(($582+4)|0);
      HEAP32[(($583)>>2)]=0;
      var $584=$TP5;
      var $585=(($584+16)|0);
      var $586=(($585)|0);
      HEAP32[(($586)>>2)]=0;
      var $587=$1;
      var $588=(($587+4)|0);
      var $589=HEAP32[(($588)>>2)];
      var $590=$I7;
      var $591=1 << $590;
      var $592=$589 & $591;
      var $593=(($592)|(0))!=0;
      if ($593) { label = 97; break; } else { label = 96; break; }
    case 96:
      var $595=$I7;
      var $596=1 << $595;
      var $597=$1;
      var $598=(($597+4)|0);
      var $599=HEAP32[(($598)>>2)];
      var $600=$599 | $596;
      HEAP32[(($598)>>2)]=$600;
      var $601=$TP5;
      var $602=$H6;
      HEAP32[(($602)>>2)]=$601;
      var $603=$H6;
      var $604=$603;
      var $605=$TP5;
      var $606=(($605+24)|0);
      HEAP32[(($606)>>2)]=$604;
      var $607=$TP5;
      var $608=$TP5;
      var $609=(($608+12)|0);
      HEAP32[(($609)>>2)]=$607;
      var $610=$TP5;
      var $611=(($610+8)|0);
      HEAP32[(($611)>>2)]=$607;
      label = 115; break;
    case 97:
      var $613=$H6;
      var $614=HEAP32[(($613)>>2)];
      $T=$614;
      var $615=$qsize;
      var $616=$I7;
      var $617=(($616)|(0))==31;
      if ($617) { label = 98; break; } else { label = 99; break; }
    case 98:
      var $626 = 0;label = 100; break;
    case 99:
      var $620=$I7;
      var $621=$620 >>> 1;
      var $622=((($621)+(8))|0);
      var $623=((($622)-(2))|0);
      var $624=(((31)-($623))|0);
      var $626 = $624;label = 100; break;
    case 100:
      var $626;
      var $627=$615 << $626;
      $K8=$627;
      label = 101; break;
    case 101:
      var $629=$T;
      var $630=(($629+4)|0);
      var $631=HEAP32[(($630)>>2)];
      var $632=$631 & -8;
      var $633=$qsize;
      var $634=(($632)|(0))!=(($633)|(0));
      if ($634) { label = 102; break; } else { label = 108; break; }
    case 102:
      var $636=$K8;
      var $637=$636 >>> 31;
      var $638=$637 & 1;
      var $639=$T;
      var $640=(($639+16)|0);
      var $641=(($640+($638<<2))|0);
      $C=$641;
      var $642=$K8;
      var $643=$642 << 1;
      $K8=$643;
      var $644=$C;
      var $645=HEAP32[(($644)>>2)];
      var $646=(($645)|(0))!=0;
      if ($646) { label = 103; break; } else { label = 104; break; }
    case 103:
      var $648=$C;
      var $649=HEAP32[(($648)>>2)];
      $T=$649;
      label = 107; break;
    case 104:
      var $651=$C;
      var $652=$651;
      var $653=$1;
      var $654=(($653+16)|0);
      var $655=HEAP32[(($654)>>2)];
      var $656=(($652)>>>(0)) >= (($655)>>>(0));
      var $657=(($656)&(1));
      var $658=($657);
      var $659=(($658)|(0))!=0;
      if ($659) { label = 105; break; } else { label = 106; break; }
    case 105:
      var $661=$TP5;
      var $662=$C;
      HEAP32[(($662)>>2)]=$661;
      var $663=$T;
      var $664=$TP5;
      var $665=(($664+24)|0);
      HEAP32[(($665)>>2)]=$663;
      var $666=$TP5;
      var $667=$TP5;
      var $668=(($667+12)|0);
      HEAP32[(($668)>>2)]=$666;
      var $669=$TP5;
      var $670=(($669+8)|0);
      HEAP32[(($670)>>2)]=$666;
      label = 114; break;
    case 106:
      _abort();
      throw "Reached an unreachable!"
    case 107:
      label = 113; break;
    case 108:
      var $674=$T;
      var $675=(($674+8)|0);
      var $676=HEAP32[(($675)>>2)];
      $F9=$676;
      var $677=$T;
      var $678=$677;
      var $679=$1;
      var $680=(($679+16)|0);
      var $681=HEAP32[(($680)>>2)];
      var $682=(($678)>>>(0)) >= (($681)>>>(0));
      if ($682) { label = 109; break; } else { var $691 = 0;label = 110; break; }
    case 109:
      var $684=$F9;
      var $685=$684;
      var $686=$1;
      var $687=(($686+16)|0);
      var $688=HEAP32[(($687)>>2)];
      var $689=(($685)>>>(0)) >= (($688)>>>(0));
      var $691 = $689;label = 110; break;
    case 110:
      var $691;
      var $692=(($691)&(1));
      var $693=($692);
      var $694=(($693)|(0))!=0;
      if ($694) { label = 111; break; } else { label = 112; break; }
    case 111:
      var $696=$TP5;
      var $697=$F9;
      var $698=(($697+12)|0);
      HEAP32[(($698)>>2)]=$696;
      var $699=$T;
      var $700=(($699+8)|0);
      HEAP32[(($700)>>2)]=$696;
      var $701=$F9;
      var $702=$TP5;
      var $703=(($702+8)|0);
      HEAP32[(($703)>>2)]=$701;
      var $704=$T;
      var $705=$TP5;
      var $706=(($705+12)|0);
      HEAP32[(($706)>>2)]=$704;
      var $707=$TP5;
      var $708=(($707+24)|0);
      HEAP32[(($708)>>2)]=0;
      label = 114; break;
    case 112:
      _abort();
      throw "Reached an unreachable!"
    case 113:
      label = 101; break;
    case 114:
      label = 115; break;
    case 115:
      label = 116; break;
    case 116:
      label = 117; break;
    case 117:
      label = 118; break;
    case 118:
      var $716=$p;
      var $717=$716;
      var $718=(($717+8)|0);
      return $718;
    default: assert(0, "bad label: " + label);
  }
}
function _add_segment($m, $tbase, $tsize, $mmapped) {
  var label = 0;
  label = 1;
  while(1) switch(label) {
    case 1:
      var $1;
      var $2;
      var $3;
      var $4;
      var $old_top;
      var $oldsp;
      var $old_end;
      var $ssize;
      var $rawsp;
      var $offset;
      var $asp;
      var $csp;
      var $sp;
      var $ss;
      var $tnext;
      var $p;
      var $nfences;
      var $nextp;
      var $q;
      var $psize;
      var $tn;
      var $I;
      var $B;
      var $F;
      var $TP;
      var $H;
      var $I1;
      var $X;
      var $Y;
      var $N;
      var $K;
      var $T;
      var $K2;
      var $C;
      var $F3;
      $1=$m;
      $2=$tbase;
      $3=$tsize;
      $4=$mmapped;
      var $5=$1;
      var $6=(($5+24)|0);
      var $7=HEAP32[(($6)>>2)];
      var $8=$7;
      $old_top=$8;
      var $9=$1;
      var $10=$old_top;
      var $11=_segment_holding($9, $10);
      $oldsp=$11;
      var $12=$oldsp;
      var $13=(($12)|0);
      var $14=HEAP32[(($13)>>2)];
      var $15=$oldsp;
      var $16=(($15+4)|0);
      var $17=HEAP32[(($16)>>2)];
      var $18=(($14+$17)|0);
      $old_end=$18;
      $ssize=24;
      var $19=$old_end;
      var $20=$ssize;
      var $21=((($20)+(16))|0);
      var $22=((($21)+(7))|0);
      var $23=(((-$22))|0);
      var $24=(($19+$23)|0);
      $rawsp=$24;
      var $25=$rawsp;
      var $26=(($25+8)|0);
      var $27=$26;
      var $28=$27 & 7;
      var $29=(($28)|(0))==0;
      if ($29) { label = 2; break; } else { label = 3; break; }
    case 2:
      var $39 = 0;label = 4; break;
    case 3:
      var $32=$rawsp;
      var $33=(($32+8)|0);
      var $34=$33;
      var $35=$34 & 7;
      var $36=(((8)-($35))|0);
      var $37=$36 & 7;
      var $39 = $37;label = 4; break;
    case 4:
      var $39;
      $offset=$39;
      var $40=$rawsp;
      var $41=$offset;
      var $42=(($40+$41)|0);
      $asp=$42;
      var $43=$asp;
      var $44=$old_top;
      var $45=(($44+16)|0);
      var $46=(($43)>>>(0)) < (($45)>>>(0));
      if ($46) { label = 5; break; } else { label = 6; break; }
    case 5:
      var $48=$old_top;
      var $52 = $48;label = 7; break;
    case 6:
      var $50=$asp;
      var $52 = $50;label = 7; break;
    case 7:
      var $52;
      $csp=$52;
      var $53=$csp;
      var $54=$53;
      $sp=$54;
      var $55=$sp;
      var $56=$55;
      var $57=(($56+8)|0);
      var $58=$57;
      $ss=$58;
      var $59=$sp;
      var $60=$59;
      var $61=$ssize;
      var $62=(($60+$61)|0);
      var $63=$62;
      $tnext=$63;
      var $64=$tnext;
      $p=$64;
      $nfences=0;
      var $65=$1;
      var $66=$2;
      var $67=$66;
      var $68=$3;
      var $69=((($68)-(40))|0);
      _init_top($65, $67, $69);
      var $70=$ssize;
      var $71=$70 | 1;
      var $72=$71 | 2;
      var $73=$sp;
      var $74=(($73+4)|0);
      HEAP32[(($74)>>2)]=$72;
      var $75=$ss;
      var $76=$1;
      var $77=(($76+448)|0);
      var $78=$75;
      var $79=$77;
      assert(16 % 1 === 0);HEAP32[(($78)>>2)]=HEAP32[(($79)>>2)];HEAP32[((($78)+(4))>>2)]=HEAP32[((($79)+(4))>>2)];HEAP32[((($78)+(8))>>2)]=HEAP32[((($79)+(8))>>2)];HEAP32[((($78)+(12))>>2)]=HEAP32[((($79)+(12))>>2)];
      var $80=$2;
      var $81=$1;
      var $82=(($81+448)|0);
      var $83=(($82)|0);
      HEAP32[(($83)>>2)]=$80;
      var $84=$3;
      var $85=$1;
      var $86=(($85+448)|0);
      var $87=(($86+4)|0);
      HEAP32[(($87)>>2)]=$84;
      var $88=$4;
      var $89=$1;
      var $90=(($89+448)|0);
      var $91=(($90+12)|0);
      HEAP32[(($91)>>2)]=$88;
      var $92=$ss;
      var $93=$1;
      var $94=(($93+448)|0);
      var $95=(($94+8)|0);
      HEAP32[(($95)>>2)]=$92;
      label = 8; break;
    case 8:
      var $97=$p;
      var $98=$97;
      var $99=(($98+4)|0);
      var $100=$99;
      $nextp=$100;
      var $101=$p;
      var $102=(($101+4)|0);
      HEAP32[(($102)>>2)]=7;
      var $103=$nfences;
      var $104=((($103)+(1))|0);
      $nfences=$104;
      var $105=$nextp;
      var $106=(($105+4)|0);
      var $107=$106;
      var $108=$old_end;
      var $109=(($107)>>>(0)) < (($108)>>>(0));
      if ($109) { label = 9; break; } else { label = 10; break; }
    case 9:
      var $111=$nextp;
      $p=$111;
      label = 11; break;
    case 10:
      label = 12; break;
    case 11:
      label = 8; break;
    case 12:
      var $115=$csp;
      var $116=$old_top;
      var $117=(($115)|(0))!=(($116)|(0));
      if ($117) { label = 13; break; } else { label = 49; break; }
    case 13:
      var $119=$old_top;
      var $120=$119;
      $q=$120;
      var $121=$csp;
      var $122=$old_top;
      var $123=$121;
      var $124=$122;
      var $125=((($123)-($124))|0);
      $psize=$125;
      var $126=$q;
      var $127=$126;
      var $128=$psize;
      var $129=(($127+$128)|0);
      var $130=$129;
      $tn=$130;
      var $131=$tn;
      var $132=(($131+4)|0);
      var $133=HEAP32[(($132)>>2)];
      var $134=$133 & -2;
      HEAP32[(($132)>>2)]=$134;
      var $135=$psize;
      var $136=$135 | 1;
      var $137=$q;
      var $138=(($137+4)|0);
      HEAP32[(($138)>>2)]=$136;
      var $139=$psize;
      var $140=$q;
      var $141=$140;
      var $142=$psize;
      var $143=(($141+$142)|0);
      var $144=$143;
      var $145=(($144)|0);
      HEAP32[(($145)>>2)]=$139;
      var $146=$psize;
      var $147=$146 >>> 3;
      var $148=(($147)>>>(0)) < 32;
      if ($148) { label = 14; break; } else { label = 21; break; }
    case 14:
      var $150=$psize;
      var $151=$150 >>> 3;
      $I=$151;
      var $152=$I;
      var $153=$152 << 1;
      var $154=$1;
      var $155=(($154+40)|0);
      var $156=(($155+($153<<2))|0);
      var $157=$156;
      var $158=$157;
      $B=$158;
      var $159=$B;
      $F=$159;
      var $160=$1;
      var $161=(($160)|0);
      var $162=HEAP32[(($161)>>2)];
      var $163=$I;
      var $164=1 << $163;
      var $165=$162 & $164;
      var $166=(($165)|(0))!=0;
      if ($166) { label = 16; break; } else { label = 15; break; }
    case 15:
      var $168=$I;
      var $169=1 << $168;
      var $170=$1;
      var $171=(($170)|0);
      var $172=HEAP32[(($171)>>2)];
      var $173=$172 | $169;
      HEAP32[(($171)>>2)]=$173;
      label = 20; break;
    case 16:
      var $175=$B;
      var $176=(($175+8)|0);
      var $177=HEAP32[(($176)>>2)];
      var $178=$177;
      var $179=$1;
      var $180=(($179+16)|0);
      var $181=HEAP32[(($180)>>2)];
      var $182=(($178)>>>(0)) >= (($181)>>>(0));
      var $183=(($182)&(1));
      var $184=($183);
      var $185=(($184)|(0))!=0;
      if ($185) { label = 17; break; } else { label = 18; break; }
    case 17:
      var $187=$B;
      var $188=(($187+8)|0);
      var $189=HEAP32[(($188)>>2)];
      $F=$189;
      label = 19; break;
    case 18:
      _abort();
      throw "Reached an unreachable!"
    case 19:
      label = 20; break;
    case 20:
      var $193=$q;
      var $194=$B;
      var $195=(($194+8)|0);
      HEAP32[(($195)>>2)]=$193;
      var $196=$q;
      var $197=$F;
      var $198=(($197+12)|0);
      HEAP32[(($198)>>2)]=$196;
      var $199=$F;
      var $200=$q;
      var $201=(($200+8)|0);
      HEAP32[(($201)>>2)]=$199;
      var $202=$B;
      var $203=$q;
      var $204=(($203+12)|0);
      HEAP32[(($204)>>2)]=$202;
      label = 48; break;
    case 21:
      var $206=$q;
      var $207=$206;
      $TP=$207;
      var $208=$psize;
      var $209=$208 >>> 8;
      $X=$209;
      var $210=$X;
      var $211=(($210)|(0))==0;
      if ($211) { label = 22; break; } else { label = 23; break; }
    case 22:
      $I1=0;
      label = 27; break;
    case 23:
      var $214=$X;
      var $215=(($214)>>>(0)) > 65535;
      if ($215) { label = 24; break; } else { label = 25; break; }
    case 24:
      $I1=31;
      label = 26; break;
    case 25:
      var $218=$X;
      $Y=$218;
      var $219=$Y;
      var $220=((($219)-(256))|0);
      var $221=$220 >>> 16;
      var $222=$221 & 8;
      $N=$222;
      var $223=$N;
      var $224=$Y;
      var $225=$224 << $223;
      $Y=$225;
      var $226=((($225)-(4096))|0);
      var $227=$226 >>> 16;
      var $228=$227 & 4;
      $K=$228;
      var $229=$K;
      var $230=$N;
      var $231=((($230)+($229))|0);
      $N=$231;
      var $232=$K;
      var $233=$Y;
      var $234=$233 << $232;
      $Y=$234;
      var $235=((($234)-(16384))|0);
      var $236=$235 >>> 16;
      var $237=$236 & 2;
      $K=$237;
      var $238=$N;
      var $239=((($238)+($237))|0);
      $N=$239;
      var $240=$N;
      var $241=(((14)-($240))|0);
      var $242=$K;
      var $243=$Y;
      var $244=$243 << $242;
      $Y=$244;
      var $245=$244 >>> 15;
      var $246=((($241)+($245))|0);
      $K=$246;
      var $247=$K;
      var $248=$247 << 1;
      var $249=$psize;
      var $250=$K;
      var $251=((($250)+(7))|0);
      var $252=$249 >>> (($251)>>>(0));
      var $253=$252 & 1;
      var $254=((($248)+($253))|0);
      $I1=$254;
      label = 26; break;
    case 26:
      label = 27; break;
    case 27:
      var $257=$I1;
      var $258=$1;
      var $259=(($258+304)|0);
      var $260=(($259+($257<<2))|0);
      $H=$260;
      var $261=$I1;
      var $262=$TP;
      var $263=(($262+28)|0);
      HEAP32[(($263)>>2)]=$261;
      var $264=$TP;
      var $265=(($264+16)|0);
      var $266=(($265+4)|0);
      HEAP32[(($266)>>2)]=0;
      var $267=$TP;
      var $268=(($267+16)|0);
      var $269=(($268)|0);
      HEAP32[(($269)>>2)]=0;
      var $270=$1;
      var $271=(($270+4)|0);
      var $272=HEAP32[(($271)>>2)];
      var $273=$I1;
      var $274=1 << $273;
      var $275=$272 & $274;
      var $276=(($275)|(0))!=0;
      if ($276) { label = 29; break; } else { label = 28; break; }
    case 28:
      var $278=$I1;
      var $279=1 << $278;
      var $280=$1;
      var $281=(($280+4)|0);
      var $282=HEAP32[(($281)>>2)];
      var $283=$282 | $279;
      HEAP32[(($281)>>2)]=$283;
      var $284=$TP;
      var $285=$H;
      HEAP32[(($285)>>2)]=$284;
      var $286=$H;
      var $287=$286;
      var $288=$TP;
      var $289=(($288+24)|0);
      HEAP32[(($289)>>2)]=$287;
      var $290=$TP;
      var $291=$TP;
      var $292=(($291+12)|0);
      HEAP32[(($292)>>2)]=$290;
      var $293=$TP;
      var $294=(($293+8)|0);
      HEAP32[(($294)>>2)]=$290;
      label = 47; break;
    case 29:
      var $296=$H;
      var $297=HEAP32[(($296)>>2)];
      $T=$297;
      var $298=$psize;
      var $299=$I1;
      var $300=(($299)|(0))==31;
      if ($300) { label = 30; break; } else { label = 31; break; }
    case 30:
      var $309 = 0;label = 32; break;
    case 31:
      var $303=$I1;
      var $304=$303 >>> 1;
      var $305=((($304)+(8))|0);
      var $306=((($305)-(2))|0);
      var $307=(((31)-($306))|0);
      var $309 = $307;label = 32; break;
    case 32:
      var $309;
      var $310=$298 << $309;
      $K2=$310;
      label = 33; break;
    case 33:
      var $312=$T;
      var $313=(($312+4)|0);
      var $314=HEAP32[(($313)>>2)];
      var $315=$314 & -8;
      var $316=$psize;
      var $317=(($315)|(0))!=(($316)|(0));
      if ($317) { label = 34; break; } else { label = 40; break; }
    case 34:
      var $319=$K2;
      var $320=$319 >>> 31;
      var $321=$320 & 1;
      var $322=$T;
      var $323=(($322+16)|0);
      var $324=(($323+($321<<2))|0);
      $C=$324;
      var $325=$K2;
      var $326=$325 << 1;
      $K2=$326;
      var $327=$C;
      var $328=HEAP32[(($327)>>2)];
      var $329=(($328)|(0))!=0;
      if ($329) { label = 35; break; } else { label = 36; break; }
    case 35:
      var $331=$C;
      var $332=HEAP32[(($331)>>2)];
      $T=$332;
      label = 39; break;
    case 36:
      var $334=$C;
      var $335=$334;
      var $336=$1;
      var $337=(($336+16)|0);
      var $338=HEAP32[(($337)>>2)];
      var $339=(($335)>>>(0)) >= (($338)>>>(0));
      var $340=(($339)&(1));
      var $341=($340);
      var $342=(($341)|(0))!=0;
      if ($342) { label = 37; break; } else { label = 38; break; }
    case 37:
      var $344=$TP;
      var $345=$C;
      HEAP32[(($345)>>2)]=$344;
      var $346=$T;
      var $347=$TP;
      var $348=(($347+24)|0);
      HEAP32[(($348)>>2)]=$346;
      var $349=$TP;
      var $350=$TP;
      var $351=(($350+12)|0);
      HEAP32[(($351)>>2)]=$349;
      var $352=$TP;
      var $353=(($352+8)|0);
      HEAP32[(($353)>>2)]=$349;
      label = 46; break;
    case 38:
      _abort();
      throw "Reached an unreachable!"
    case 39:
      label = 45; break;
    case 40:
      var $357=$T;
      var $358=(($357+8)|0);
      var $359=HEAP32[(($358)>>2)];
      $F3=$359;
      var $360=$T;
      var $361=$360;
      var $362=$1;
      var $363=(($362+16)|0);
      var $364=HEAP32[(($363)>>2)];
      var $365=(($361)>>>(0)) >= (($364)>>>(0));
      if ($365) { label = 41; break; } else { var $374 = 0;label = 42; break; }
    case 41:
      var $367=$F3;
      var $368=$367;
      var $369=$1;
      var $370=(($369+16)|0);
      var $371=HEAP32[(($370)>>2)];
      var $372=(($368)>>>(0)) >= (($371)>>>(0));
      var $374 = $372;label = 42; break;
    case 42:
      var $374;
      var $375=(($374)&(1));
      var $376=($375);
      var $377=(($376)|(0))!=0;
      if ($377) { label = 43; break; } else { label = 44; break; }
    case 43:
      var $379=$TP;
      var $380=$F3;
      var $381=(($380+12)|0);
      HEAP32[(($381)>>2)]=$379;
      var $382=$T;
      var $383=(($382+8)|0);
      HEAP32[(($383)>>2)]=$379;
      var $384=$F3;
      var $385=$TP;
      var $386=(($385+8)|0);
      HEAP32[(($386)>>2)]=$384;
      var $387=$T;
      var $388=$TP;
      var $389=(($388+12)|0);
      HEAP32[(($389)>>2)]=$387;
      var $390=$TP;
      var $391=(($390+24)|0);
      HEAP32[(($391)>>2)]=0;
      label = 46; break;
    case 44:
      _abort();
      throw "Reached an unreachable!"
    case 45:
      label = 33; break;
    case 46:
      label = 47; break;
    case 47:
      label = 48; break;
    case 48:
      label = 49; break;
    case 49:
      return;
    default: assert(0, "bad label: " + label);
  }
}
// EMSCRIPTEN_END_FUNCS
// EMSCRIPTEN_END_FUNCS
// Warning: printing of i64 values may be slightly rounded! No deep i64 math used, so precise i64 code not included
var i64Math = null;
// === Auto-generated postamble setup entry stuff ===
Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(!Module['preRun'] || Module['preRun'].length == 0, 'cannot call main when preRun functions remain to be called');
  args = args || [];
  ensureInitRuntime();
  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_STATIC) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_STATIC));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_STATIC);
  var ret;
  var initialStackTop = STACKTOP;
  try {
    ret = Module['_main'](argc, argv, 0);
  }
  catch(e) {
    if (e.name == 'ExitStatus') {
      return e.status;
    } else if (e == 'SimulateInfiniteLoop') {
      Module['noExitRuntime'] = true;
    } else {
      throw e;
    }
  } finally {
    STACKTOP = initialStackTop;
  }
  return ret;
}
function run(args) {
  args = args || Module['arguments'];
  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return 0;
  }
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    var toRun = Module['preRun'];
    Module['preRun'] = [];
    for (var i = toRun.length-1; i >= 0; i--) {
      toRun[i]();
    }
    if (runDependencies > 0) {
      // a preRun added a dependency, run will be called later
      return 0;
    }
  }
  function doRun() {
    ensureInitRuntime();
    preMain();
    var ret = 0;
    calledRun = true;
    if (Module['_main'] && shouldRunNow) {
      ret = Module.callMain(args);
      if (!Module['noExitRuntime']) {
        exitRuntime();
      }
    }
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
      while (Module['postRun'].length > 0) {
        Module['postRun'].pop()();
      }
    }
    return ret;
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
    return 0;
  } else {
    return doRun();
  }
}
Module['run'] = Module.run = run;
// {{PRE_RUN_ADDITIONS}}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}
// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}
run();
// {{POST_RUN_ADDITIONS}}
  // {{MODULE_ADDITIONS}}
