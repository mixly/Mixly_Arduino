/**
 * ES6 - Math polyfill, when .dot is implemented, we do not need to rely on mathjs anymore
 * borrowed from: https://github.com/MaxArt2501/es6-math
 * 部分函数已经重写已适配skulpt 1.3版本
 */
 (function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else factory();
})(function() {
    "use strict";
    // x | 0 is the simplest way to implement ToUint32(x)
    var M = Math,
        N = Number,
        prop, def = Object.defineProperty,
        mathXtra = {
            // Hyperbolic functions
            sinh: function sinh(x) {
                // If -0, must return -0.
                if (x === 0) return x;
                var exp = M.exp(x);
                return exp/2 - .5/exp;
            },
            cosh: function cosh(x) {
                var exp = M.exp(x);
                return exp/2 + .5/exp;
            },
            tanh: function tanh(x) {
                // If -0, must return -0.
                if (x === 0) return x;
                // Mathematically speaking, the formulae are equivalent.
                // But computationally, it's better to make exp tend to 0
                // rather than +Infinity
                if (x < 0) {
                    var exp = M.exp(2 * x);
                    return (exp - 1) / (exp + 1);
                } else {
                    var exp = M.exp(-2 * x);
                    return (1 - exp) / (1 + exp);
                }
            },
            asinh: function asinh(x) {
                return x === -Infinity ? -Infinity : M.log(x + M.sqrt(x * x + 1));
            },
            acosh: function acosh(x) {
                return x >= 1 ? M.log(x + M.sqrt(x * x - 1)) : NaN;
            },
            atanh: function atanh(x) {
                return x >= -1 && x <= 1 ? M.log((1 + x) / (1 - x)) / 2 : NaN;
            },

            // Exponentials and logarithms
            expm1: function expm1(x) {
                // If -0, must return -0. But Math.exp(-0) - 1 yields +0.
                return x === 0 ? x : M.exp(x) - 1;
            },
            log10: function log10(x) {
                return M.log(x) / M.LN10;
            },
            log2: function log2(x) {
                return M.log(x) / M.LN2;
            },
            log1p: function log1p(x) {
                // If -0, must return -0. But Math.log(1 + -0) yields +0.
                return x === 0 ? x : M.log(1 + x);
            },

            // Various
            sign: function sign(x) {
                // If -0, must return -0.
                return isNaN(x) ? NaN : x < 0 ? -1 : x > 0 ? 1 : +x;
            },
            cbrt: function cbrt(x) {
                // If -0, must return -0.
                return x === 0 ? x : x < 0 ? -M.pow(-x, 1/3) : M.pow(x, 1/3);
            },
            hypot: function hypot(value1, value2) { // Must have a length of 2
                for (var i = 0, s = 0, args = arguments; i < args.length; i++)
                    s += args[i] * args[i];
                return M.sqrt(s);
            },

            // Rounding and 32-bit operations
            trunc: function trunc(x) {
                return x === 0 ? x : x < 0 ? M.ceil(x) : M.floor(x);
            },
            fround: typeof Float32Array === "function"
                    ? (function(arr) {
                        return function fround(x) { return arr[0] = x, arr[0]; };
                    })(new Float32Array(1))
                    : function fround(x) { return x; },

            clz32: function clz32(x) {
                if (x === -Infinity) return 32;
                if (x < 0 || (x |= 0) < 0) return 0;
                if (!x) return 32;
                var i = 31;
                while (x >>= 1) i--;
                return i;
            },
            imul: function imul(x, y) {
                return (x | 0) * (y | 0) | 0;
            }
        },
        numXtra = {
            isNaN: function isNaN(x) {
                // NaN is the only Javascript object such that x !== x
                // The control on the type is for eventual host objects
                return typeof x === "number" && x !== x;
            },
            isFinite: function isFinite(x) {
                return typeof x === "number" && x === x && x !== Infinity && x !== -Infinity;
            },
            isInteger: function isInteger(x) {
                return typeof x === "number" && x !== Infinity && x !== -Infinity && M.floor(x) === x;
            },
            isSafeInteger: function isSafeInteger(x) {
                return typeof x === "number" && x > -9007199254740992 && x < 9007199254740992 && M.floor(x) === x;
            },
            parseFloat: parseFloat,
            parseInt: parseInt
        },
        numConsts = {
            EPSILON: 2.2204460492503130808472633361816e-16,
            MAX_SAFE_INTEGER: 9007199254740991,
            MIN_SAFE_INTEGER: -9007199254740991
        };

    for (prop in mathXtra)
        if (typeof M[prop] !== "function")
            M[prop] = mathXtra[prop];

    for (prop in numXtra)
        if (typeof N[prop] !== "function")
            N[prop] = numXtra[prop];

    try {
        prop = {};
        def(prop, 0, {});
        for (prop in numConsts)
            if (!(prop in N))
                def(N, prop, {value: numConsts[prop]});
    } catch (e) {
        for (prop in numConsts)
            if (!(prop in N))
                N[prop] = numConsts[prop];
    }
});
var $builtinmodule = function (name) {
    /**
        Made by Michael Ebert for https://github.com/skulpt/skulpt
        ndarray implementation inspired by https://github.com/geometryzen/davinci-dev (not compatible with skulpt)
        Some methods are based on the original numpy implementation.
        See http://waywaaard.github.io/skulpt/ for more information.
    **/
    /* eslint-disable */

    /******************************************/
    /*               DEFINES                  */
    /******************************************/

    // base class name, used for all checks and other defines
    var CLASS_NDARRAY = "numpy.ndarray";

    // numpy specific defines and constants
    var NPY_MAX_INT = Number.MAX_SAFE_INTEGER;
    var NPY_MAX_INTP = NPY_MAX_INT;
    var NPY_MAXDIMS = 32;
    var NPY_MAXARGS = 32;

    var NPY_FAIL = 0;
    var NPY_SUCCEED = 1;

    var NPY_TYPES = { 
        NPY_BOOL: 0,
        NPY_BYTE: 1, 
        NPY_UBYTE: 2,
        NPY_SHORT: 3, 
        NPY_USHORT: 4,
        NPY_INT: 5, 
        NPY_UINT: 6,
        NPY_LONG: 7, 
        NPY_ULONG: 8,
        NPY_LONGLONG: 9, 
        NPY_ULONGLONG: 10,
        NPY_FLOAT: 11, 
        NPY_DOUBLE: 12, 
        NPY_LONGDOUBLE: 13,
        NPY_CFLOAT: 14, 
        NPY_CDOUBLE: 15, 
        NPY_CLONGDOUBLE: 16,
        NPY_OBJECT: 17,
        NPY_STRING: 18, 
        NPY_UNICODE: 19,
        NPY_VOID: 20,
        /*
         * New 1.6 types appended, may be integrated
         * into the above in 2.0.
         */
        NPY_DATETIME: 21, 
        NPY_TIMEDELTA: 22, 
        NPY_HALF: 23,

        NPY_NTYPES: 24,
        NPY_NOTYPE: 25,
        NPY_CHAR: 26,      /* special flag */
        NPY_USERDEF: 256,  /* leave room for characters */

        /* The number of types not including the new 1.6 types */
        NPY_NTYPES_ABI_COMPATIBLE: 21
    };

    /* basetype array priority */
    var NPY_PRIORITY = 0.0;

    /* default subtype priority */
    var NPY_SUBTYPE_PRIORITY = 1.0;

    /* default scalar priority */
    var NPY_SCALAR_PRIORITY = -1000000.0;
    
    // number of floating point types
    var NPY_NUM_FLOATTYPE = 3;

    // array falgs
    var NPY_ARRAY_C_CONTIGUOUS = 0x0001;
    var NPY_ARRAY_F_CONTIGUOUS = 0x0002;
    var NPY_ARRAY_OWNDATA = 0x0004;
    var NPY_ARRAY_ALIGNED = 0x0100;
    var NPY_ARRAY_NOTSWAPPED = 0x0200;
    var NPY_ARRAY_WRITEABLE  = 0x0400;
    var NPY_ARRAY_BEHAVED = (NPY_ARRAY_ALIGNED | NPY_ARRAY_WRITEABLE);
    var NPY_ARRAY_CARRAY = NPY_ARRAY_C_CONTIGUOUS | NPY_ARRAY_BEHAVED;
    var NPY_ARRAY_DEFAULT = NPY_ARRAY_CARRAY;
    var NPY_ARRAY_UPDATEIFCOPY = 0x1000;

    var numpy = function () {
        this.math = Math; // set math object
    };

    numpy.prototype.arange = function (start, stop, step) {
      if (step === undefined)
        step = 1.0;

      start *= 1.0;
      stop *= 1.0;
      step *= 1.0;

      var res = [];
      for (var i = start; i < stop; i += step) {
        res.push(i);
      }

      return res;
    };

    // check if obj is an ndarray (does not check for subclasses)
    function PyArray_Check(obj) {
        return obj && (Sk.abstr.typeName(obj) === CLASS_NDARRAY);
    }

    /* get the dataptr from its current coordinates for simple iterator */
    // coordinates is a array, iter is special ndarray create iter object
    function get_ptr_simple(iter, coordinates) {
        var i;
        var ret;

        ret = PyArray_DATA(iter.ao);

        for (i = 0; i < PyArray_NDIM(iter.ao); ++i) {
            ret += coordinates[i] * iter.strides[i];
        }

        return ret;
    }

    // common init code for ndarray iterators
    // it.dataptr is just the index to the current element (as we do not have C pointers in Javascript)
    function array_iter_base_init(it, ao) {
        var nd, i;

        nd = PyArray_NDIM(ao);
        it.ao = ao;
        it.size = PyArray_SIZE(ao);
        it.nd_m1 = nd - 1;
        it.factors = it.factors || [];
        it.dims_m1 = it.dims_m1 || [];
        it.strides = it.strides || [];
        it.backstrides = it.backstrides || [];
        it.bounds = it.bounds || [];
        it.limits = it.limits || [];
        it.limits_sizes = it.limits_sizes || [];
        it.factors[nd -1] = 1;

        for (i = 0; i < nd; i++) {
            it.dims_m1[i] = PyArray_DIMS(ao)[i] - 1;
            it.strides[i] = PyArray_STRIDES(ao)[i];
            it.backstrides[i] = it.strides[i] * it.dims_m1[i];
            if (i > 0) {
                it.factors[nd-i-1] = it.factors[nd-i] * PyArray_DIMS(ao)[nd-i];
            }
            it.bounds[i] = it.bounds[i] || [];
            it.bounds[i][0] = 0;
            it.bounds[i][1] = PyArray_DIMS(ao)[i] - 1;
            it.limits[i] = it.limits[i] || [];
            it.limits[i][0] = 0;
            it.limits[i][1] = PyArray_DIMS(ao)[i] - 1;
            it.limits_sizes[i] = it.limits[i][1] - it.limits[i][0] + 1;
        }

        // assign translate a method
        it.translate = get_ptr_simple;

        PyArray_ITER_RESET(it);

        return it;
    }

    /*NUMPY_API
     * Get Iterator.
     */
    function PyArray_IterNew(obj) {
        var it; // PayArrayIterObject
        var ao; // PyArrayObject

        if (!PyArray_Check(obj)) {
            throw new Error('bad internal call');
        }

        ao = obj;
        it = Sk.abstr.iter(ao); // create new iter

        if (it == null) {
            return null;
        }

        array_iter_base_init(it, ao);

        return it;
    }

    /*NUMPY_API
     * Get Iterator that iterates over all but one axis (don't use this with
     * PyArray_ITER_GOTO1D).  The axis will be over-written if negative
     * with the axis having the smallest stride.
     */
    function PyArray_IterAllButAxis(obj, inaxis) {
        var arr;
        var it;
        var axis;

        if (!PyArray_Check(obj)) {
            throw new Sk.builtin.ValueError('Numpy IterAllButAxis requires an ndarray.');
        }

        arr = obj;
        it = PyArray_IterNew(arr);

        if (PyArray_NDIM(arr) == 0) {
            return it;
        }

        if (inaxis < 0) {
            var i;
            var minaxis = 0;
            var minstride = 0;
            i = 0;
            while (minstride == 0 && i < PyArray_NDIM(arr)) {
                minstride = PyArray_STRIDE(arr ,i);
                i += 1;
            }

            for (i = 1; i < PyArray_NDIM(arr); i++) {
                if (PyArray_STRIDE(arr, i) > 0 && PyArray_STRIDE(arr, i) < minstride) {
                    minaxis = 1;
                    minstride = PyArray_STRIDE(arr, i);
                }
            }
            inaxis = minaxis;
        }

        axis = inaxis;

        it.contiguous = 0;

        if (it.size != 0) {
            it.size /= PyArray_DIM(arr, axis);
        }

        it.dims_m1[axis] = 0;
        it.backstrides[axis] = 0;

        return it;
    }

    // it.dataptr is just the index to the current element (as we do not have C pointers in Javascript)
    function _PyArray_ITER_NEXT1(it) {
        it.dataptr +=  it.strides[0];
        it.coordinates[0] += 1;
    }

    // it.dataptr is just the index to the current element (as we do not have C pointers in Javascript)
    function _PyArray_ITER_NEXT2(it) {
        if (it.coordinates[1] < it.dims_m1[1]) {
            it.coordinates[1] += 1;
            it.dataptr +=  it.strides[1];
        } else {
            it.coordinates[1] = 0;
            it.coordinates[0] += 1;
            it.dataptr +=  it.strides[0] - it.backstrides[1];
        }
    }

    // it.dataptr is just the index to the current element (as we do not have C pointers in Javascript)
    function PyArray_ITER_NEXT(it) {
        it.index += 1;
        if (it.nd_m1 == 0) {
            _PyArray_ITER_NEXT1(it)
        } else if (it.nd_m1 == 1) {
            _PyArray_ITER_NEXT2(it);
        } else {
            var __npy_i;
            for (__npy_i = it.nd_m1; __npy_i >= 0; __npy_i--) {
                if (it.coordinates[__npy_i] < it.dims_m1[__npy_i]) {
                    it.coordinates[__npy_i] += 1;
                    // _PyAIT(it)->dataptr += _PyAIT(it)->strides[__npy_i];
                    it.dataptr += it.strides[__npy_i];
                } else {
                    it.coordinates[__npy_i] = 0;
                    it.dataptr += it.backstrides[__npy_i];
                }
            }
        }
    }

    // https://github.com/numpy/numpy/blob/3d2b8ca9bcbdbc9e835cb3f8d56c2d93a67b00aa/numpy/core/include/numpy/ndarraytypes.h#L1077
    // it.dataptr is just the index to the current element (as we do not have C pointers in Javascript)
    function PyArray_ITER_RESET(it) {
        it.index = 0;
        it.dataptr = 0; // back to the first element
        it.coordinates = [0, it.nd_m1 + 1];
    }

    // easy and functional impl. for our own use cases
    // may not support all cases of the real API
    function PyArray_DESCR(arr) {
        return Sk.ffi.remapToPy(arr.v.dtype);
    }

    function PyArray_MultiIterNew() {
        throw new Sk.builtin.NotImplementedError("MultiIter is not supported");
    }

    /* Does nothing with descr (cannot be NULL) */
    /*NUMPY_API
      Get scalar-equivalent to a region of memory described by a descriptor.
    */
    function PyArray_Scalar(data, descr, base) {
        // we do not reproduce the real function, we just want to return
        // the first and only element of the internal buffer (we do not have C like memory)

        // maybe we can add later on a real impl.
        var tmp = data[0];
        var ret = descr(tmp);
        return ret;
    }

    function PyArray_ToScalar(data, arr) {
        return PyArray_Scalar(data, PyArray_DESCR(arr), arr);
    }

    /*
     * This function checks to see if arr is a 0-dimensional array and, if so, returns the appropriate array scalar. It should be used whenever 0-dimensional arrays could be returned to Python.
     */
    function PyArray_Return(mp) {
        if (mp == null) {
            return null;
        }

        if (!PyArray_Check(mp)) {
            return mp;
        }

        if (PyArray_NDIM(mp) == 0) {
            var ret = PyArray_ToScalar(PyArray_DATA(mp), mp);
            return ret; // return the only element
        } else {
            return mp;
        }
    }

    function PyArray_UNPACK_ITERABLE(itObj) {
        if (Sk.builtin.checkIterable(itObj)) {
            var it = Sk.abstr.iter(itObj);
            var ret = [];
            for (it = Sk.abstr.iter(seq), i = it.tp$iternext(); i !== undefined; i = it.tp$iternext()) {
                ret.push(i);
            }
            // now iterate over all objects and unpack them
        }
    }

    function PyArray_UNPACK_SEQUENCE(seqObj) {
        if (Sk.builtin.checkSequence(seqObj)) {
            var length = Sk.builtin.len(seqObj);
            length = Sk.ffi.remapToJs(length);
            var i;
            var ret = [];
            var item;

            for (i = 0; i < length; i++) {
                item = seqObj.mp$subscript(i);
                ret.push(item);
            }

            return ret;
        } else {
            throw new Error('Internal API-CAll error occured in PyArray_UNPACK_SEQUENCE');
        }
    }

    function PyArray_UNPACK_SHAPE(arr, shape) {
        var js_shape;

        if (Sk.builtin.checkNone(shape)) {
            throw new Sk.builtin.ValueError('total size of new array must be unchanged');
        } else if (Sk.builtin.checkInt(shape)) {
            js_shape = [Sk.ffi.remapToJs(shape)];
        } else if (Sk.builtin.checkSequence(shape) && Sk.builtin.isinstance(shape, Sk.builtin.dict) == Sk.builtin.bool.false$) {
            js_shape = PyArray_UNPACK_SEQUENCE(shape);
        } else {
            throw new Sk.builtin.TypeError('expected sequence object with len >= 0 or a single integer');
        }

        // now check each array item individually
        var i;
        var foundUnknownDimension = 0;
        var unknownDimensionIndex = -1;
        for (i = 0; i < js_shape.length; i++) {
            if (!Sk.builtin.checkInt(js_shape[i])) {
                throw new Sk.builtin.TypeError('an integer is required');
            } else {
                js_shape[i] = Sk.ffi.remapToJs(js_shape[i]);

                if (js_shape[i] === -1) {
                    foundUnknownDimension += 1;
                    unknownDimensionIndex = i;
                }
            }
        }

        // check if there is one unknown dimension
        if (foundUnknownDimension > 1) {
            throw new Sk.builtin.ValueError('can only specify one unknown dimension');
        }

        // shape infering with one unknown dimension
        if (foundUnknownDimension == 1) {
            var knownDim;
            var n_size;
            // easy solution for first index auto shape infering
            if (unknownDimensionIndex === 0) {
                if (js_shape.length === 1) {
                    n_size = 1; // arr_size / 1 is 1 dim with all elements
                } else {
                    n_size = prod(js_shape.slice(1));
                }
            } else {
                // slice array without the -1 dim
                var prod_shape = js_shape.slice();
                prod_shape.splice(unknownDimensionIndex, 1); // remove unknown dim
                n_size = prod(prod_shape);
            }
            knownDim = PyArray_SIZE(arr) / n_size;
            js_shape[unknownDimensionIndex] = knownDim;
        }

        if (prod(js_shape) !== PyArray_SIZE(arr)) {
            throw new Sk.builtin.ValueError('total size of new array must be unchanged');
        }

        return js_shape;
    }

    function PyArray_SIZE(arr) {
        if (PyArray_Check(arr)) {
            return prod(arr.v.shape);
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_DATA.', arr);
        }
    }

    function PyArray_DATA(arr) {
        if (PyArray_Check(arr)) {
            return arr.v.buffer;
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_DATA.', arr);
        }
    }

    function PyArray_STRIDES(arr) {
        if (PyArray_Check(arr)) {
            return arr.v.strides;
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_STRIDES.', arr);
        }
    }

    function PyArray_STRIDE(arr, n) {
        if (PyArray_Check(arr)) {
            var strides = arr.v.strides;
            return strides[n];
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_STRIDE.', arr);
        }
    }

    /*
     *  The number of dimensions in the array.
     *  Returns a javascript value
     */
    function PyArray_NDIM(arr) {
        if (PyArray_Check(arr)) {
            return arr.v.shape.length;
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_NDIM.', arr);
        }
    }

    /*
     *  Returns a pointer to the dimensions/shape of the array. The number of elements matches the number of dimensions of the array.
     *  This returns javascript values!
     */
    function PyArray_DIMS(arr) {
        if (PyArray_Check(arr)) {
            return arr.v.shape;
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_DIMS.', arr);
        }
    }

    /*
     *  Return the shape in the nth dimension.
     */
    function PyArray_DIM(arr, n) {
        if (PyArray_Check(arr)) {
            return arr.v.shape[n];
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_DIM.', arr);
        }
    }

    function PyArray_NewShape(arr, shape, order) {
        if (PyArray_Check(arr)) {
            var py_shape = new Sk.builtin.tuple(shape.map(
              function (x) {
                return new Sk.builtin.int_(x);
            }));

             var py_order = Sk.ffi.remapToPy(order);
            return Sk.misceval.callsim(arr.reshape, arr, py_shape, py_order);
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_NewShape.', arr);
        }
    }

    function PyArray_FLAGS(arr) {
        if (PyArray_Check(arr)) {
            return arr.v.flags;
        } else {
            throw new Error('Internal API-Call Error occured in PyArray_NewShape.', arr);
        }
    }

    function PyArray_Transpose(ap, permute) {
        // ap = array object
        // permute = PyArrayDims []
        var axes = [];
        var axis;
        var permutation = [];
        var reverse_permutation = [];
        var ret = null;
        var flags;

        if (permute == null) {
            n = PyArray_NDIM(ap);
            for (i = 0; i < n; i++) {
                permutation[i] = n - 1 - i;
            }
        } else {
            n = permute.length;
            axes = permute;
            if (n != PyArray_NDIM(ap)) {
                throw new Sk.builtin.ValueError("axes don't match array");
            }

            for (i = 0; i < n; i++) {
                reverse_permutation[i] = -1;
            }

            for (i = 0; i < n; i++) {
                axis = axes[i];
                if (axis < 0) {
                    axis = PyArray_NDIM(ap) + axis;
                }

                if (axis < 0 || axis >= PyArray_NDIM(ap)) {
                    throw new Sk.builtin.ValueError('invalid axis for this array');
                }

                if (reverse_permutation[axis] != -1) {
                    throw new Sk.builtin.ValueError('repeated axis in transpose');
                }

                reverse_permutation[axis] = i;
                permutation[i] = axis;
            }
        }

        flags = PyArray_FLAGS(ap);


        // can we speed those things up?
        // we add the data later on, first we create a new array with given dtype and strides, flags etc
        ret = PyArray_NewFromDescr(Sk.builtin.type(ap), PyArray_DESCR(ap), n, PyArray_DIMS(ap), null, null, flags, ap);
        //var newBuffer = Sk.misceval.callsim(ret.tolist, ret);
        //ret.v.buffer = remapToJs_shallow(newBuffer, true);
        // fix the dimensions and strides of the return array
        for (i = 0; i < n; i++) {
            PyArray_DIMS(ret)[i] = PyArray_DIMS(ap)[permutation[i]];
            PyArray_STRIDES(ret)[i] = PyArray_STRIDES(ap)[permutation[i]];
        }

        var list = tolist(PyArray_DATA(ap), PyArray_DIMS(ret), PyArray_STRIDES(ret), 0, PyArray_DESCR(ret));
        //var newBuffer = tobufferrecursive(PyArray_DATA(ap), PyArray_DIMS(ret), PyArray_STRIDES(ret), 0, PyArray_DESCR(ret));
        //ret.v.buffer = newBuffer;
        // can we skip this call and just use the internal tolist?
        var newArray = Sk.misceval.callsim(mod.array, list);
        //     PyArray_UpdateFlags(ret, NPY_ARRAY_C_CONTIGUOUS | NPY_ARRAY_F_CONTIGUOUS |NPY_ARRAY_ALIGNED);
        return newArray;
        //return ret;
    }

    // OBJECT_dot is the method used for python types
    // https://github.com/numpy/numpy/blob/f43d691fd0b9b4f416b50fba34876691af2d0bd4/numpy/core/src/multiarray/arraytypes.c.src#L3497
    function OBJECT_dot(ip1, is1, ip2, is2, op, n, ignore) {
        /*
         * ALIGNMENT NOTE: np.dot, np.inner etc. enforce that the array is
         * BEHAVED before getting to this point, so unaligned pointers aren't
         * handled here.
         */
        var i; // npy_intp
        var tmp1; // PyObject
        var tmp2; // PyObject
        var tmp = null; // PyObject
        var tmp3; // PyObject **

        var ip1_i = 0;
        var ip2_i = 0;

        for (i = 0; i < n; i++, ip1_i += is1, ip2_i += is2) {
            if (ip1[ip1_i] == null || ip2[ip2_i] == null) {
                tmp1 = Sk.builtin.bool.false$;
            }
            else {
                tmp1 = Sk.abstr.numberBinOp(ip1[ip1_i], ip2[ip2_i], 'Mult');
                if (!tmp1) {
                    return;
                }
            }
            if (i == 0) {
                tmp = tmp1;
            }
            else {
                tmp2 = Sk.abstr.numberBinOp(tmp, tmp1, 'Add');
                if (!tmp2) {
                    return;
                }
                tmp = tmp2;
            }
        }

        tmp3 = op;
        tmp2 = tmp3;
        //op[0] = tmp;

        return tmp;
    }

    // vdot function for python basic numeric types
    // https://github.com/numpy/numpy/blob/467d4e16d77a2e7c131aac53c639e82b754578c7/numpy/core/src/multiarray/vdot.c
    /*
     *  ip1: vector 1
     *  ip2: vector 2
     *  is1: stride of vector 1
     *  is2: stride of vector 2
     *  op: new nd_array data buffer for the result
     *  n:  number of elements in ap1 first dim
     *  ignore: not used anymore, however still existing for old api calls
     *
     */
    function OBJECT_vdot(ip1, is1, ip2, is2, op, n, ignore){
        function tryConjugate(pyObj) {
            var f = pyObj.tp$getattr("conjugate");
            if (f) {
                return Sk.misceval.callsim(pyObj['conjugate'], pyObj);
            } else {
                return pyObj; // conjugate for non complex types is just the real part
            }
        }

        var i; // npy_intp
        var tmp0; // PyObject
        var tmp1; // PyObject
        var tmp2; // PyObject
        var tmp = null; // PyObject
        var tmp3; // PyObject **

        var ip1_i = 0;
        var ip2_i = 0;

        for (i = 0; i < n; i++, ip1_i += is1, ip2_i += is2) {
            if (ip1[ip1_i] == null || ip2[ip2_i] == null) {
                tmp1 = Sk.builtin.bool.false$;
            } else {
                // try to call the conjugate function / each numeric type can call this
                tmp0 = Sk.misceval.callsim(ip1[ip1_i]['conjugate'], ip1[ip1_i]);

                if (tmp0 == null) {
                    return;
                }

                tmp1 = Sk.abstr.numberBinOp(tmp0, ip2[ip2_i], 'Mult');
                if (tmp1 == null) {
                    return;
                }
            }

            if (i === 0) {
                tmp = tmp1;
            } else {
                tmp2 = Sk.abstr.numberBinOp(tmp, tmp1, 'Add');
                //tmp2 = tmp + tmp1; // PyNumber_Add

                if (tmp2 == null) {
                    return;
                }
                tmp = tmp2;
            }
        }

        tmp3 = op;
        tmp2 = tmp3;
        op[0] = tmp;
    }

    /**
     *  Basic dummy impl. The real numpy implementation is about 600 LoC and relies
     *  on the complete data type impl.
     *  We just do a basic checking
     *  obj: any object or nested sequence
     *  maxdims: maximum number of dimensions to check for dtype (recursive call)
     */
    function PyArray_DTypeFromObject(obj, maxdims) {
        // gets first element or null from a nested sequence
        function seqUnpacker(obj, mDims) {
            if (Sk.builtin.checkSequence(obj)) {
                var length = Sk.builtin.len(obj);
                if (Sk.builtin.asnum$(length) > 0) {
                    // ToDo check if element is also of type sequence
                    var element = obj.mp$subscript(0);

                    // if we have a nested sequence, we decrement the maxdims and call recursive
                    if (mDims > 0 && Sk.builtin.checkSequence(element)) {
                        return seqUnpacker(element, mDims -1);
                    } else {
                        return element;
                    }
                }
            } else {
                return obj;
            }
        }

        var dtype = null;
        if (obj === null) {
            throw new Error('Internal API-Call Error occured in PyArray_ObjectType');
        }

        if (maxdims == null) {
            maxdims = NPY_MAXDIMS;
        }

        var element;
        // simple type
        if (Sk.builtin.checkNumber(obj)) {
            element = obj;
        } else if (Sk.builtin.checkSequence(obj)) {
            // sequence
            element = seqUnpacker(obj, maxdims);
            if (PyArray_Check(element)) {
                return PyArray_DESCR(obj);
            }
        } else if (PyArray_Check(obj)) {
            // array
            var descr = PyArray_DESCR(obj);
            if (descr != null) {
                return descr;
            }
            var length = Sk.builtin.len(obj);
            if (Sk.builtin.asnum$(length) > 0) {
                element = PyArray_DATA(obj)[0];
            }
        }

        // ToDo: investigate if this throw may happen
        try {
            dtype = Sk.builtin.type(element);
        } catch (e) {
            // pass
        }

        return dtype;
    }

    var NPY_NOTYPE = null;
    var NPY_DEFAULT_TYPE = 2;

    // our basic internal hierarchy for types
    // we can only promote from lower to higher numbers
    // ToDo: use numpy enum for types
    var Internal_TypeTable = {
        'complex': 3,
        'complex_': 3,
        'complex64': 3,
        'float': 2,
        'float_': 2,
        'float64': 2,
        'int': 1,
        'int_': 1,
        'int64': 1,
        'bool': 0,
        'bool_': 0,
    };

    function Internal_DType_To_Num(dtype) {
        var name = Sk.ffi.remapToJs(dtype.tp$getattr(Sk.ffi.remapToPy("__name__")));//Sk.abstr.typeName(dtype);
        var num = Internal_TypeTable[name];

        if (num == null) {
            return -1;
        }

        return num;
    }

    // ToDo: check if we can change this to match the real impl.
    function PyArray_TYPE(arr) {
        // return ((PyArrayObject_fields *)arr)->descr->type_num;
        var descr = PyArray_DESCR(arr);
        var typenum = Internal_DType_To_Num(descr);
        return typenum;
    }

    /**
     * Not the real impl. as we do not really implement numpys data types and
     * the 1000s LoC for that. We just use the basic python types.
     *
     * This function returns the 'constructor' for the given type number
     */
    function PyArray_DescrFromType(typenum) {
        switch(typenum) {
        case 3:
            return Sk.builtin.complex;
        case 2:
            return Sk.builtin.float_;
        case 1:
            return Sk.builtin.int_;
        case 0:
            return Sk.builtin.bool;
        default:
            return NPY_NOTYPE;
        }
    }

    /*
     *  This function is useful for determining a common type that two or more arrays can be converted to.
     *  It only works for non-flexible array types as no itemsize information is passed. The mintype argument
     *  represents the minimum type acceptable, and op represents the object that will be converted to an array.
     *  The return value is the enumerated typenumber that represents the data-type that op should have.
     */
    function PyArray_ObjectType(op, minimum_type) {
        // http://docs.scipy.org/doc/numpy/reference/c-api.array.html#c.PyArray_ResultType
        // this is only and approximate implementation and is not even close to
        // the real numpy internals, however totally sufficient for our needs

        var dtype;

        dtype = PyArray_DTypeFromObject(op, NPY_MAXDIMS);

        // maybe empty ndarray object?
        if (dtype != null) {
            var num = Internal_DType_To_Num(dtype);
            if (num >= minimum_type) {
                return num;
            } else if(num < minimum_type) {
                // can we convert one type into the other?
                if (num >= 0 && minimum_type <= 3) {
                    return minimum_type;
                } else {
                    return NPY_NOTYPE; // NPY_NOTYPE
                }
            }
        } else {
            return NPY_DEFAULT_TYPE;
        }
    }

    /*
     *  A synonym for PyArray_DIMS, named to be consistent with the ‘shape’ usage within Python.
     */
    function PyArrray_Shape(arr) {
        return PyArray_DIMS(arr);
    }

    /*
     *  Cast/Promote object to given dtype with some intelligent type handling
     */
    function PyArray_Cast_Obj(obj, dtype) {
        if (dtype instanceof Sk.builtin.none && Sk.builtin.checkNone(obj)) {
            return obj;
        } else {
            return Sk.misceval.callsim(dtype, obj);
        }
    }

    // ToDo: how can we make a exact check?
    // or do we need to refactor PyArray_Check for subclasses?
    function PyArray_CheckExact(obj) {
        return PyArray_Check(obj);
    }

    function PyArray_CheckAnyScalarExact(obj) {

    }

    function PyArray_GetPriority(obj, default_) {
        var ret;
        var priority = NPY_PRIORITY;

        if (PyArray_CheckExact(obj)) {
            return priority;
        } else if (PyArray_CheckAnyScalarExact(obj)) {
            return NPY_SCALAR_PRIORITY;
        }

        ret = Sk.builtin.getattr(obj, new Sk.builtin.str('__array_priority__'), Sk.builtin.none.none$);
        if (Sk.builtin.checkNone(ret)) {
            return default_;
        }

        ret = Sk.builtin.float(ret);
        priority = Sk.ffi.remapToJs(ret);

        return priority;
    }

    // https://github.com/numpy/numpy/blob/5d6a9f0030e8d1a63e43783c2b5b54cde93bc5d0/numpy/core/src/multiarray/ctors.c#L903
    function PyArray_NewFromDescr_int(subtype, descr, nd, dims, strides, data, flags, obj, zeroed) {
        var fa;
        var i;
        var sd;
        var size;

        if (descr.subarray) {
            throw new Error('subarrays not supported');
        }

        if (nd > NPY_MAXDIMS) {
            throw new Sk.builtin.ValueError('number of dimensions must be within [0, ' + NPY_MAXDIMS + ']');
        }

        /* check dimensions */
        size = 1;
        sd = 1; // we do not have any element sizes: sd = (size_t) descr->elsize;
        if (sd == 0) {
            // ToDo: https://github.com/numpy/numpy/blob/5d6a9f0030e8d1a63e43783c2b5b54cde93bc5d0/numpy/core/src/multiarray/ctors.c#L940
            throw new Sk.builtin.TypeError('Empty data-type');
        }

        for (i = 0; i < nd; i++) {
            var dim = dims[i];

            if (dim == null) {
                continue;
            }

            if (dim < 0) {
                throw new Sk.builtin.ValueError('negative dimensions are not allowed');
            }

            // calculate size of array
            // https://github.com/numpy/numpy/blob/5d6a9f0030e8d1a63e43783c2b5b54cde93bc5d0/numpy/core/src/multiarray/ctors.c#L982
            size = dim * size;
            if (size == Number.MAX_VALUE) {
                throw new Sk.builtin.ValueError('array is too big.');
            }
        }

        fa = {}; //  fa = (PyArrayObject_fields *) subtype->tp_alloc(subtype, 0);

        fa.nd = nd;
        fa.dimensions = null;
        fa.data = null;

        if (data == null) {
            fa.flags = NPY_ARRAY_DEFAULT;
            if (flags) {
                if (flags) {
                    fa.flags |= NPY_ARRAY_F_CONTIGUOUS;
                    if (nd > 1) {
                        fa.flags &= ~NPY_ARRAY_C_CONTIGUOUS;
                    }
                    flags = NPY_ARRAY_F_CONTIGUOUS;
                }
            }
        } else {
            fa.flags = (flags & ~NPY_ARRAY_UPDATEIFCOPY);
        }

        fa.descr = descr;
        fa.base = null;
        fa.weakreflist = null;

        if (nd > 0) {
            fa.dimensions = [];
            fa.strides = [];
            // fill dimensions
            dims.map(function(d) {
                fa.dimensions.push(d);
            });

            if (strides == null) {
                // fill them in
                sd = _array_fill_strides(fa.strides, dims, nd, sd, flags, fa.flags);
            } else {
                strides.map(function(s) {
                    fa.strides.push(s);
                });
                sd *= size;
            }
        } else {
            fa.dimensions = null;
            fa.strides = null;
            fa.flags |= NPY_ARRAY_F_CONTIGUOUS;
        }

        if (data == null) {
            // Allocate something even for zero-space arrays, e.g. shape=(0,)
            if (sd == 0) {
                sd = 1;
            }

            if (zeroed) {
                // ToDo: check if we need todo something here!
                data = [];
            } else {
                data = [];
            }

            fa.flags |= NPY_ARRAY_OWNDATA;
        } else {
            fa.flags &= ~NPY_ARRAY_OWNDATA;
        }

        // map data?
        fa.data = data;

        // ToDo: https://github.com/numpy/numpy/blob/5d6a9f0030e8d1a63e43783c2b5b54cde93bc5d0/numpy/core/src/multiarray/ctors.c#L1090
        // we do not support finalize methods (skulpt does do it either!)
        
        // fa is now just plain JS for representing an ndarray
        // we now use skulpt code to make a real python/skulpt ndarray version out of it
        var pyShape = new Sk.builtin.tuple((fa.dimensions || []).map(function(d) {
            return new Sk.builtin.int_(d);
        }));

        // we need to make a deep copy of each item
        var pyBuffer = new Sk.builtin.list(fa.data);

        var dtype = fa.descr;

        return Sk.misceval.callsim(mod[CLASS_NDARRAY], pyShape, dtype, pyBuffer);
    }

    function _array_fill_strides(strides, dims, nd, itemsize, infalg, objflags) {
        var i;
        var not_cf_contig = 0;
        var nod = 0; // A dim 1= 1 was found

        // Check if new array is both F- and C-contigous
        for (i = 0; i < nd; i++) {
            if (dims[i] != 1) {
                if (nod) {
                    not_cf_contig = 1;
                    break;
                }
                nod = 1;
            }
        }

        // Only make fortran strides if not contigous as well
        // actually we do not really care, do we?
        // ToDo: maybe add this later (see ctors.c)
        for (i = nd - 1; i >= 0; i--) {
            strides[i] = itemsize;
            if (dims[i]) {
                itemsize *= dims[i];
            }
            else {
                not_cf_contig = 0;
            }
            if (dims[i] == 1) {
                /* For testing purpose only */
                strides[i] = NPY_MAX_INTP;
            }
        }

        /*
        if (not_cf_contig) {
            *objflags = ((*objflags)|NPY_ARRAY_C_CONTIGUOUS) &
                                            ~NPY_ARRAY_F_CONTIGUOUS;
        }
        else {
            *objflags |= (NPY_ARRAY_C_CONTIGUOUS|NPY_ARRAY_F_CONTIGUOUS);
        }
        */

        return itemsize;
    }

    function PyArray_NewFromDescr(subtype, descr, nd, dims, strides, data, flags, obj) {
        return PyArray_NewFromDescr_int(subtype, descr, nd, dims, strides, data, flags, obj, 0);
    }

    /*NUMPY_API
     * Generic new array creation routine.
     */
    function PyArray_New(subtype, nd, dims, type_num, strides, data, itemsize, flags, obj) {
        var descr;
        var _new;

        descr = PyArray_DescrFromType(type_num);
        if (descr == null) {
            return null;
        }

        // we do not do any itemsize check as we do not need to allocate memory like in C
        _new = PyArray_NewFromDescr(subtype, descr, nd, dims, strides, data, flags, obj);

        return _new;
    }

    function new_array_for_sum(ap1, ap2, out, nd, dimensions, typenum) {
        var ret;
        var subtype;
        var prior1;
        var prior2;

        // Sk.builtin.type == Py_TYPE macro
        if (Sk.builtin.type(ap2) != Sk.builtin.type(ap1)) {
            prior = PyArray_GetPriority(ap2, 0.0);
            prior = PyArray_GetPriority(ap1, 0.0);
            subtype = (prior2 > prior1 ? Sk.builtin.type(ap2) : Sk.builtin.type(ap1));
        } else {
            prior1 = prior2 = 0.0;
            subtype = Sk.builtin.type(ap1);
        }

        if (out != null) {
            throw new Error('new_array_for_sum does not support "out" parameter');
        }

        ret = PyArray_New(subtype, nd, dimensions, typenum, null, null, 0, 0, (prior2 > prior1 ? ap2 : ap1));

        return ret;
    }

    // PyObject* PyArray_FromAny(PyObject* op, PyArray_Descr* dtype, int min_depth, int max_depth, int requirements, PyObject* context)
    /*
     *  - op: is any value or sequence that will be converted to an array (Python Object)
     *  - dtype: is callable constructor for the type (ie Sk.builtin.int_) (Python Object)
     *  - min_depth: we may enfore a minimum of dimensions (Python Int)
     *  - max_depth: maximum of dimensions (Python Int)
     *  - requirements: same flags to set, we do not support those (int)
     *  - context: ???
     */
    function PyArray_FromAny(op, dtype, min_depth, max_depth, requirements, context) {
        if (op == null) {
            throw new Error('Internal PyArray_FromAny API-Call error. "op" must not be null.');
        }

        if (dtype == null || Sk.builtin.checkNone(dtype)) {
            dtype = PyArray_DTypeFromObject(op, NPY_MAXDIMS);
            if (dtype == null) {
                dtype = PyArray_DescrFromType(NPY_DEFAULT_TYPE);
            }
        }

        var elements = [];
        var state = {};
        state.level = 0;
        state.shape = [];

        if (PyArray_Check(op)) {
            elements = PyArray_DATA(op);
            state = {};
            state.level = 0;
            state.shape = PyArray_DIMS(op);;
        } else {
            // now get items from op and create a new buffer object.
            unpack(op, elements, state);
        }

        // apply dtype castings
        for (i = 0; i < elements.length; i++) {
            elements[i] = PyArray_Cast_Obj(elements[i], dtype);
        }

        // check for min_depth
        var ndmin = Sk.builtin.asnum$(min_depth);
        if (ndmin >= 0 && ndmin > state.shape.length) {
          var _ndmin_array = [];
          for (i = 0; i < ndmin - state.shape.length; i++) {
            _ndmin_array.push(1);
          }
          state.shape = _ndmin_array.concat(state.shape);
        }

        // call array method or create internal ndarray constructor
        var _shape = new Sk.builtin.tuple(state.shape.map(function (x) {
            return new Sk.builtin.int_(x);
        }));

        var _buffer = new Sk.builtin.list(elements);

        switch (dtype){
            case Sk.builtin.int_:
                dtype="int";
                break;
            case Sk.builtin.float_:
                dtype="float";
                break;
        }

        // create new ndarray instance
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], _shape, dtype,
          _buffer);
    }

    function convert_shape_to_string(n, vals, ending) {
        var i;
        var ret;
        var tmp;

        for (i = 0; i < n && vals[i] < 0; i++);

        if (i === n) {
            return Sk.abstr.numberBinOp(new Sk.builtin.str('()%s'), new Sk.builtin.str(ending), 'Mod');
        } else {
            ret = Sk.abstr.numberBinOp(new Sk.builtin.str('(%i'), vals[i++], 'Mod');
        }

        for (; i < n; ++i) {
            if (vals[i] < 0) {
                tmp = new Sk.builtin.str(",newaxis");
            } else {
                tmp = Sk.abstr.numberBinOp(new Sk.builtin.str(',%i'), vals[i], 'Mod');
            }

            ret = Sk.abstr.numberBinOp(ret, tmp, 'Add');
        }

        if (i == 1) {
            tmp = Sk.abstr.numberBinOp(new Sk.builtin.str(',)%s'), new Sk.builtin.str(ending), 'Mod');
        } else {
            tmp = Sk.abstr.numberBinOp(new Sk.builtin.str(')%s'), new Sk.builtin.str(ending), 'Mod');
        }
        ret = Sk.abstr.numberBinOp(ret, tmp, 'Add');
        return ret;

    }

    function dot_alignment_error(a, i, b, j) {
        var errmsg = null;
        var format = null;
        var fmt_args = null;
        var i_obj = null;
        var j_obj = null;
        var shape1 = null;
        var shape2 = null;
        var shape1_i = null;
        var shape2_j = null;

        format = new Sk.builtin.str("shapes %s and %s not aligned: %d (dim %d) != %d (dim %d)");
        shape1 = convert_shape_to_string(PyArray_NDIM(a), PyArray_DIMS(a), "");
        shape2 = convert_shape_to_string(PyArray_NDIM(b), PyArray_DIMS(b), "");

        i_obj = new Sk.builtin.int_(i);
        j_obj = new Sk.builtin.int_(j);

        shape1_i = new Sk.builtin.int_(PyArray_DIM(a, i));
        shape2_j = new Sk.builtin.int_(PyArray_DIM(b, j));

        if (!format || !shape1 || !shape2 || !i_obj || !j_obj ||
                !shape1_i || !shape2_j) {
            return;
        }

        fmt_args = new Sk.builtin.tuple([shape1, shape2, shape1_i, i_obj, shape2_j, j_obj]);

        errmsg = Sk.abstr.numberBinOp(format, fmt_args, 'Mod');
        if (errmsg != null) {
            throw new Sk.builtin.ValueError(errmsg);
        } else {
            throw new Sk.builtin.ValueError('shapes are not aligned');
        }
    }

    // utility functions to create a real copy of the underlying data
    function PyArray_CopyBuffer(arr) {
        var res = [];
        var buffer = PyArray_DATA(arr);
        var it = PyArray_IterNew(arr);

        while (it.index < it.size) {
            res.push(Sk.misceval.callsim(PyArray_DESCR(arr), buffer[it.dataptr]));
            PyArray_ITER_NEXT(it);
        }

        return res;
    }

    /*NUMPY_API
     * Numeric.matrixproduct(a,v)
     * just like inner product but does the swapaxes stuff on the fly
     */
    // from multiarraymodule.c Line: 940
    function MatrixProdcut(op1, op2) {
        return this.MatrixProduct2(op1, op2, null);
    }

    /*NUMPY_API
     * Numeric.matrixproduct2(a,v,out)
     * just like inner product but does the swapaxes stuff on the fly
     * array_dot: https://github.com/numpy/numpy/blob/d033b6e19fc95a1f1fd6592de8318178368011b1/numpy/core/src/multiarray/methods.c#L2037
     *
     * MatrixProduct2: https://github.com/numpy/numpy/blob/f43d691fd0b9b4f416b50fba34876691af2d0bd4/numpy/core/src/multiarray/multiarraymodule.c#L950
     */
    function MatrixProdcut2(op1, op2, out) {
        var ap1; // PyArrayObject
        var ap2; // PyArrayObject
        var ret = null; // PyArrayObject
        var i; // npy_intp (int pointer)
        var j; // npy_intp (int pointer)
        var l; // npy_intp (int pointer)
        var typenum; // int
        var nd; // int
        var axis; // int
        var matchDim; // int
        var is1; // npy_intp
        var is2; // npy_intp
        var os; // npy_intp
        var op; // char *op
        var dimensions = new Array(); // npy_intp dimensions[NPY_MAXDIMS];
        var dot; // PyArrray_DotFunc *dot
        var typec = null; // PyArray_Descr *typec = NULL;

        // make new pyarray object types from ops
        typenum = PyArray_ObjectType(op1, 0);
        typenum = PyArray_ObjectType(op2, typenum);

        // get type descriptor for the type, for us it is the javascript constructor
        // of the type, that we store as a dtype
        typec = PyArray_DescrFromType(typenum);

        // we currently do not support this specific check for common data type
        if (typec === null) {
            throw new Sk.builtin.ValueError('Cannot find a common data type.');
        }

        ap1 = PyArray_FromAny(op1, typec, 0, 0, 'NPY_ARRAY_ALINGED', null);
        ap2 = PyArray_FromAny(op2, typec, 0, 0, 'NPY_ARRAY_ALINGED', null);

        // check dimensions

        // handle 0 dim cases
        if (PyArray_NDIM(ap1) == 0 || PyArray_NDIM(ap2) == 0) {
            ret = PyArray_NDIM(ap1) == 0 ? ap1 : ap2;
            ret = ret.nb$multiply.call(ap1, ap2);

            return ret;
        }

        l = PyArray_DIMS(ap1)[PyArray_NDIM(ap1) - 1];
        if (PyArray_NDIM(ap2) > 1) {
            matchDim = PyArray_NDIM(ap2) - 2;
        } else {
            matchDim = 0;
        }

        if (PyArray_DIMS(ap2)[matchDim] != l) {
            dot_alignment_error(ap1, PyArray_NDIM(ap1) - 1, ap2, matchDim);
        }

        nd = PyArray_NDIM(ap1) + PyArray_NDIM(ap2) - 2;
        if (nd > NPY_MAXDIMS) {
            throw new Sk.builtin.ValueError('dot: too many dimensions in result');
        }

        j = 0;
        for (i = 0; i < PyArray_NDIM(ap1) - 1; i++) {
            dimensions[j++] = PyArray_DIMS(ap1)[i];
        }
        for (i = 0; i < PyArray_NDIM(ap2) - 2; i++) {
            dimensions[j++] = PyArray_DIMS(ap2)[i];
        }
        if(PyArray_NDIM(ap2) > 1) {
            dimensions[j++] = PyArray_DIMS(ap2)[PyArray_NDIM(ap2)-1];
        }

        is1 = PyArray_STRIDES(ap1)[PyArray_NDIM(ap1)-1];
        is2 = PyArray_STRIDES(ap2)[matchDim];
        /* Choose which subtype to return */
        ret = new_array_for_sum(ap1, ap2, out, nd, dimensions, typenum);

        // Hint: the switch case function replaces the following lines
        //dot = PyArray_DESCR(ret)->f->dotfunc;
        //if (dot == NULL) {
        //    PyErr_SetString(PyExc_ValueError,
        //                    "dot not available for this type");
        //    goto fail;
        //}
        switch (typenum) {
        case 0:
        case 1:
        case 2:
        case 3:
            dot = OBJECT_dot;
            break;
        default:
            throw new Sk.builtin.ValueError('dot not available for this type');
        }

        op = PyArray_DATA(ret);
        // os = PyArray_DESCR(ret).elsize; // we do not have element sizes in JavaScript
        os = 1; // we just deal with normal indicis

        axis = PyArray_NDIM(ap1) - 1;
        it1 = PyArray_IterAllButAxis(ap1, axis);

        if (it1 == null) {
            return null;
        }

        it2 = PyArray_IterAllButAxis(ap2, matchDim);

        if (it2 == null) {
            return null;
        }

        // it.dataptr is just the index to the current element (as we do not have C pointers in Javascript)
        var op_i = 0; // own helper for assinging the result with out passing a pointer to dot method
        var it1DeRefDataPtr; // reference to an array or subarray
        var it2DeRefDataPtr;  // reference to an array or subarray based on it.dataptr derefenced
        while (it1.index < it1.size) {
            it1DeRefDataPtr = PyArray_DATA(it1.ao).slice(it1.dataptr);
            while (it2.index < it2.size) {
                it2DeRefDataPtr = PyArray_DATA(it2.ao).slice(it2.dataptr);
                op[op_i] = dot(it1DeRefDataPtr, is1, it2DeRefDataPtr, is2, null, l, ret);
                op_i += os;
                PyArray_ITER_NEXT(it2);
            }
            PyArray_ITER_NEXT(it1);
            PyArray_ITER_RESET(it2);
        }

        return ret;
    }

    function PyTypeNum_ISFLEXIBLE(type) {
        // ToDo: uncomment this, when we've added all types from ndarraytypes.h
        return false; //(((type) >= NPY_STRING) && ((type) <= NPY_VOID));
    }

    function PyTypeNum_ISEXTENDED(type) {
        return PyTypeNum_ISFLEXIBLE; /* || PyTypeNum_ISUSERDEF(type) */
    } 

    function replaceAt(str, index, character) {
        return str.substr(0, index) + character + str.substr(index+character.length);
    }

    function dump_data(strPtr, nPtr, max_n, data, nd, dimensions, strides, self) {
        var descr = PyArray_DESCR(self);
        var op = null;
        var sp = null;
        var ostring;
        var i;
        var N;
        var ret = 0;
        
        if (nd === 0) {
            op = data[0];
            sp =new Sk.builtin.str(op);
            N = sp.v.length;
            nPtr.n += N;
            strPtr.str += sp.v;
        } else {
            strPtr.str += "[";
            nPtr.n += 1;
            for (i = 0; i < dimensions[0]; i++) {
                var newData = data.slice(strides[0] * i);
                var newDimensions = dimensions.slice(1);
                var newStrides = strides.slice(1);
                dump_data(strPtr, nPtr, max_n, newData, nd - 1, newDimensions, newStrides, self);

                if (i < dimensions[0] - 1) {
                    strPtr.str += ',';
                    strPtr.str += ' '; // replaceAt(str, nPtr.n + 1, ' ');
                    nPtr.n += 2;
                }
            }

            strPtr.str +=  ']'; //replaceAt(str, nPtr.n, ']');
            nPtr.n += 1;
        }

        return ret;
    }

    function array_repr_builtin(self, repr) {
        // self is ndarrray
        // repr is int
        var ret;
        var string;
        var n = 0;
        var max_n = 0; // stupid mem alloc stuff -.-
        var format;
        var fmt_args;
        var nPtr = {n: n};
        var strPtr = {str: ""};
        dump_data(strPtr, nPtr, max_n, PyArray_DATA(self), PyArray_NDIM(self), PyArray_DIMS(self), PyArray_STRIDES(self), self);
        string = new Sk.builtin.str(strPtr.str);
        if (repr) {
            if (PyTypeNum_ISEXTENDED(self)) {
                format = new Sk.builtin.str("array(%s, '%s')"); // required some changes "array(%s, '%c%d')" (we do not have access to elsize)
                fmt_args = new Sk.builtin.tuple([string, PyArray_DESCR(self)]);
                ret = Sk.abstr.numberBinOp(format, fmt_args, 'Mod');
            } else {
                format = new Sk.builtin.str("array(%s, '%s')"); // required some changes "array(%s, '%c%d')" (we do not have access to elsize)
                fmt_args = new Sk.builtin.tuple([string, PyArray_DESCR(self)]);
                ret = Sk.abstr.numberBinOp(format, fmt_args, 'Mod');
            }
        } else {
            return string;
        }

        return ret;
    }

    var PyArray_StrFunction = null; // default there is no string function, if not set
    var np = new numpy();

    var mod = {};

    // doc string for numpy module
    mod.__doc__ = new Sk.builtin.str('\nNumPy\n=====\n\nProvides\n  1. An array object of arbitrary homogeneous items\n  2. Fast mathematical operations over arrays\n  3. Linear Algebra, Fourier Transforms, Random Number Generation\n\nHow to use the documentation\n----------------------------\nDocumentation is available in two forms: docstrings provided\nwith the code, and a loose standing reference guide, available from\n`the NumPy homepage <http://www.scipy.org>`_.\n\nWe recommend exploring the docstrings using\n`IPython <http://ipython.scipy.org>`_, an advanced Python shell with\nTAB-completion and introspection capabilities.  See below for further\ninstructions.\n\nThe docstring examples assume that `numpy` has been imported as `np`::\n\n  >>> import numpy as np\n\nCode snippets are indicated by three greater-than signs::\n\n  >>> x = 42\n  >>> x = x + 1\n\nUse the built-in ``help`` function to view a function\'s docstring::\n\n  >>> help(np.sort)\n  ... # doctest: +SKIP\n\nFor some objects, ``np.info(obj)`` may provide additional help.  This is\nparticularly true if you see the line "Help on ufunc object:" at the top\nof the help() page.  Ufuncs are implemented in C, not Python, for speed.\nThe native Python help() does not know how to view their help, but our\nnp.info() function does.\n\nTo search for documents containing a keyword, do::\n\n  >>> np.lookfor(\'keyword\')\n  ... # doctest: +SKIP\n\nGeneral-purpose documents like a glossary and help on the basic concepts\nof numpy are available under the ``doc`` sub-module::\n\n  >>> from numpy import doc\n  >>> help(doc)\n  ... # doctest: +SKIP\n\nAvailable subpackages\n---------------------\ndoc\n    Topical documentation on broadcasting, indexing, etc.\nlib\n    Basic functions used by several sub-packages.\nrandom\n    Core Random Tools\nlinalg\n    Core Linear Algebra Tools\nfft\n    Core FFT routines\npolynomial\n    Polynomial tools\ntesting\n    Numpy testing tools\nf2py\n    Fortran to Python Interface Generator.\ndistutils\n    Enhancements to distutils with support for\n    Fortran compilers support and more.\n\nUtilities\n---------\ntest\n    Run numpy unittests\nshow_config\n    Show numpy build configuration\ndual\n    Overwrite certain functions with high-performance Scipy tools\nmatlib\n    Make everything matrices.\n__version__\n    Numpy version string\n\nViewing documentation using IPython\n-----------------------------------\nStart IPython with the NumPy profile (``ipython -p numpy``), which will\nimport `numpy` under the alias `np`.  Then, use the ``cpaste`` command to\npaste examples into the shell.  To see which functions are available in\n`numpy`, type ``np.<TAB>`` (where ``<TAB>`` refers to the TAB key), or use\n``np.*cos*?<ENTER>`` (where ``<ENTER>`` refers to the ENTER key) to narrow\ndown the list.  To view the docstring for a function, use\n``np.cos?<ENTER>`` (to view the docstring) and ``np.cos??<ENTER>`` (to view\nthe source code).\n\nCopies vs. in-place operation\n-----------------------------\nMost of the functions in `numpy` return a copy of the array argument\n(e.g., `np.sort`).  In-place versions of these functions are often\navailable as array methods, i.e. ``x = np.array([1,2,3]); x.sort()``.\nExceptions to this rule are documented.\n\n');

  /**
        Class for numpy.ndarray
    **/

  function remapToJs_shallow(obj, shallow) {
    var _shallow = shallow || true;
    if (obj instanceof Sk.builtin.list) {
      if (!_shallow) {
        var ret = [];
        for (var i = 0; i < obj.v.length; ++i) {
          ret.push(Sk.ffi.remapToJs(obj.v[i]));
        }
        return ret;
      } else {
        return obj.v;
      }
    } else if (obj instanceof Sk.builtin.float_) {
      return Sk.builtin.asnum$nofloat(obj);
    } else {
      return Sk.ffi.remapToJs(obj);
    }
  }

  /**
        Unpacks in any form fo nested Lists,
        We need to support sequences and ndarrays here!
   **/
  function unpack(py_obj, buffer, state) {
    if (PyArray_Check(py_obj)) {
        // unpack array, easiest but slow version is to convert the array to a list
        py_obj = Sk.misceval.callsim(py_obj.tolist, py_obj);
    }

    if (py_obj instanceof Sk.builtin.list || py_obj instanceof Sk.builtin.tuple) {
      var py_items = remapToJs_shallow(py_obj);
      state.level += 1;

      if (state.level > state.shape.length) {
        state.shape.push(py_items.length);
      }
      var i;
      var len = py_items.length;
      for (i = 0; i < len; i++) {
        unpack(py_items[i], buffer, state);
      }
      state.level -= 1;
    } else {
      buffer.push(py_obj);
    }
  }

  /**
   Computes the strides for columns and rows
  **/
  function computeStrides(shape) {
    var strides = shape.slice(0);
    strides.reverse();
    var prod = 1;
    var temp;
    for (var i = 0, len = strides.length; i < len; i++) {
      temp = strides[i];
      strides[i] = prod;
      prod *= temp;
    }

    return strides.reverse();
  }

  /**
    Computes the offset for the ndarray for given index and strides
    [1, ..., n]
  **/
  function computeOffset(strides, index) {
    var offset = 0;
    for (var k = 0, len = strides.length; k < len; k++) {
      offset += strides[k] * index[k];
    }
    return offset;
  }

  /**
    Calculates the size of the ndarray, dummy
    **/
  function prod(numbers) {
    var size = 1;
    var i;
    for (i = 0; i < numbers.length; i++) {
      size *= numbers[i];
    }
    return size;
  }

  function tobufferrecursive(buffer, shape, strides, startdim, dtype) {
    var i, n, stride;
    var arr, item;

    /* Base case */
    if (startdim >= shape.length) {
        return buffer[0];
    }

    n = shape[startdim];
    stride = strides[startdim];

    arr = [];

    for (i = 0; i < n; i++) {
      item = tobufferrecursive(buffer, shape, strides, startdim + 1, dtype);
      arr = arr.concat(item);

      buffer = buffer.slice(stride);
    }

    return arr
  }

  /*
    http://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.tolist.html?highlight=tolist#numpy.ndarray.tolist
  */
  function tolistrecursive(buffer, shape, strides, startdim, dtype) {
    var i, n, stride;
    var arr, item;

    /* Base case */
    if (startdim >= shape.length) {
        return buffer[0];
    }

    n = shape[startdim];
    stride = strides[startdim];

    arr = [];

    for (i = 0; i < n; i++) {
      item = tolistrecursive(buffer, shape, strides, startdim + 1, dtype);
      arr.push(item);

      buffer = buffer.slice(stride);
    }

    return new Sk.builtin.list(arr);
  }

  /**
     internal tolist interface
    **/
  function tolist(buffer, shape, strides, dtype) {
    var buffer_copy = buffer.slice(0);
    return tolistrecursive(buffer_copy, shape, strides, 0, dtype);
  }

  /**
    An array object represents a multidimensional, homogeneous array of fixed-size items.
    An associated data-type object describes the format of each element in the array
    (its byte-order, how many bytes it occupies in memory, whether it is an integer, a
    floating point number, or something else, etc.)
    Arrays should be constructed using array, zeros or empty (refer to the See Also
    section below). The parameters given here refer to a low-level method (ndarray(...)) for
    instantiating an array.
    For more information, refer to the numpy module and examine the the methods and
    attributes of an array.
  **/
  var ndarray_f = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self, shape, dtype, buffer,
      offset, strides, order) {
      var ndarrayJs = {}; // js object holding the actual array
      ndarrayJs.shape = Sk.ffi.remapToJs(shape);

      ndarrayJs.strides = computeStrides(ndarrayJs.shape);
      ndarrayJs.dtype = dtype ;
      ndarrayJs.flags = 0x0; // set flags to zero
      // allow any nested data structure
      if (buffer && buffer instanceof Sk.builtin.list) {
        ndarrayJs.buffer = buffer.v; // ToDo: change this to any sequence and iterate over objects?
      }
      
      self.v = ndarrayJs; // value holding the actual js object and array
      self.tp$name = CLASS_NDARRAY; // set class name
    });

    $loc._internalGenericGetAttr = Sk.generic.setAttr;

    $loc.__getattr__ = new Sk.builtin.func(function (self, name) {
        console.log("enter get")
        if (name != null && (Sk.builtin.checkString(name) || typeof name === "string")) {
            var _name = name;

            // get javascript string
            if (Sk.builtin.checkString(name)) {
                _name = Sk.ffi.remapToJs(name);
            }

            switch (_name) {
                case 'ndim':
                    return new Sk.builtin.int_(PyArray_NDIM(self));
                case 'dtype':
                    return self.v.dtype;
                case 'shape':
                    return new Sk.builtin.tuple(PyArray_DIMS(self).map(
                    function (x) {
                        return new Sk.builtin.int_(x);
                    }));
                case 'strides':
                    return new Sk.builtin.tuple(PyArray_STRIDES(self).map(
                    function (x) {
                        return new Sk.builtin.int_(x);
                    }));
                case 'size':
                    return new Sk.builtin.int_(PyArray_SIZE(self));
                case 'data':
                    return new Sk.builtin.list(PyArray_DATA(self));
                case 'T':
                    if (PyArray_NDIM(self) < 2) {
                        return self
                    } else {
                        return Sk.misceval.callsim(self.transpose, self);
                    }
            }
        }

        var r, f, ret;
        // if we have not returned yet, try the genericgetattr
        if (self.tp$getattr !== undefined) {
            f = self.tp$getattr("__getattribute__");
        }

        if (f !== undefined) {
            ret = Sk.misceval.callsimOrSuspend(f, new Sk.builtin.str(_name));
        }

        if (r === undefined) {
            throw new Sk.builtin.AttributeError("'" + Sk.abstr.typeName(self) + "' object has no attribute '" + _name + "'");
        }
        return r;
    });

    // ndmin cannot be set, etc...
    $loc.__setattr__ = new Sk.builtin.func(function (self, name, value) {
        console.log("enter set")
        if (name != null && (Sk.builtin.checkString(name) || typeof name === "string")) {
            var _name = name;

            // get javascript string
            if (Sk.builtin.checkString(name)) {
                _name = Sk.ffi.remapToJs(name);
            }

            switch (_name) {
                case 'shape':
                    // trigger reshape;
                    var js_shape = PyArray_UNPACK_SHAPE(self, value);
                    self.v.strides = computeStrides(js_shape);
                    self.v.shape = js_shape;
                    return;
            }
        }

        // builtin: --> all is readonly (I am not happy with this)
        throw new Sk.builtin.AttributeError("'ndarray' object attribute '" + name + "' is readonly");
    });

    /*
      Return the array as a (possibly nested) list.
      Return a copy of the array data as a (nested) Python list. Data items are
      converted to the nearest compatible Python type.
    */
    $loc.tolist = new Sk.builtin.func(function (self) {
        var ndarrayJs = Sk.ffi.remapToJs(self);
        var list = tolist(ndarrayJs.buffer, ndarrayJs.shape, ndarrayJs.strides, ndarrayJs.dtype);

        return list;
    });

    $loc.reshape = new Sk.builtin.func(function (self, shape, order) {
        Sk.builtin.pyCheckArgs("reshape", arguments, 2, 3);
        // if the first dim is -1, then the size in infered from the size
        // and the other dimensions
        var js_shape = PyArray_UNPACK_SHAPE(self, shape);

        // create python object for shape
        var py_shape = Sk.ffi.remapToPy(js_shape);
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], py_shape, PyArray_DESCR(self),
        new Sk.builtin.list(PyArray_DATA(self)));
    });

    $loc.copy = new Sk.builtin.func(function (self, order) {
      Sk.builtin.pyCheckArgs("copy", arguments, 1, 2);
      var ndarrayJs = Sk.ffi.remapToJs(self);
      var buffer = PyArray_DATA(self).map(function (x) {
        return x;
      });
      var shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function (x) {
        return new Sk.builtin.int_(x);
      }));
      return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self),
        new Sk.builtin.list(buffer));
    });

    /**
      Fill the array with a scalar value.
      Parameters: value: scalar
                    All elements of a will be assigned this value
    **/
    $loc.fill = new Sk.builtin.func(function (self, value) {
      Sk.builtin.pyCheckArgs("fill", arguments, 2, 2);
      var ndarrayJs = Sk.ffi.remapToJs(self);
      var buffer = ndarrayJs.buffer.map(function (x) {
        return x;
      });
      var i;
      for (i = 0; i < ndarrayJs.buffer.length; i++) {
        if (ndarrayJs.dtype) {
          ndarrayJs.buffer[i] = Sk.misceval.callsim(ndarrayJs.dtype,
            value);
        }
      }
    });

    $loc.__getslice__ = new Sk.builtin.func( function (self, start, stop) {
        console.log("enter getslice")
      Sk.builtin.pyCheckArgs( "[]", arguments, 2, 3 );
      var ndarrayJs = Sk.ffi.remapToJs( self );
      var _index; // current index
      var _buffer; // buffer as python type
      var buffer_internal; // buffer als js array
      var _stride; // stride
      var _shape; // shape as js
      var i;
      var _start;
      var _stop;

      if ( !Sk.builtin.checkInt( start ) && !( Sk.builtin.checkInt( stop ) || Sk.builtin.checkNone( stop ) || stop === undefined) ) {
        // support for slices e.g. [1,4] or [0,]

        _start = Sk.ffi.remapToJs(start);
        if(stop === undefined || Sk.builtin.checkNone( stop )) {
          _stop = ndarrayJs.buffer.length;
        } else {
          _stop = Sk.ffi.remapToJs(start);
        }

        if(_start < 0 || _stop < 0) {
          throw new Sk.builtin.IndexError('Use of negative indices is not supported.');
        }

        buffer_internal = [];
        _index = 0;
        for ( i = _start; i < _stop; i += 1 ) {
          buffer_internal[ _index++ ] = ndarrayJs.buffer[ i ];
        }
        _buffer = new Sk.builtin.list( buffer_internal );
        _shape = new Sk.builtin.tuple( [ buffer_internal.length ].map(
          function (x) {
            return new Sk.builtin.int_( x );
          } ) );
        return Sk.misceval.callsim(mod[ CLASS_NDARRAY ], _shape, undefined,
          _buffer );
      } else {
        throw new Sk.builtin.ValueError( 'Index "' + _index +
          '" must be int' );
      }
    } );

    $loc.__setslice__ = new Sk.builtin.func( function (self, start, stop, value) {
        console.log("enter setslice")
      Sk.builtin.pyCheckArgs( "[]", arguments, 3, 2 );
      var ndarrayJs = Sk.ffi.remapToJs( self );
      var _index; // current index
      var _buffer; // buffer as python type
      var buffer_internal; // buffer als js array
      var _stride; // stride
      var _shape; // shape as js
      var i;
      var _start;
      var _stop;

      if ( !Sk.builtin.checkInt( start ) && !( Sk.builtin.checkInt( stop ) || Sk.builtin.checkNone( stop ) || stop === undefined) ) {
        // support for slices e.g. [1,4] or [0,]

        _start = Sk.ffi.remapToJs(start);
        if(stop === undefined || Sk.builtin.checkNone( stop )) {
          _stop = ndarrayJs.buffer.length;
        } else {
          _stop = Sk.ffi.remapToJs(start);
        }

        if(_start < 0 || _stop < 0) {
          throw new Sk.builtin.IndexError('Use of negative indices is not supported.');
        }

        for ( i = _start; i < _stop; i += 1 ) {
          ndarrayJs.buffer[computeOffset(ndarrayJs.strides, i)] = value;
        }
      } else {
        throw new Sk.builtin.ValueError( 'Index "' + index +
          '" must be int' );
      }
    } );

    $loc.__getitem__ = new Sk.builtin.func(function (self, index) {
        console.log("enter getitem")
      Sk.builtin.pyCheckArgs("[]", arguments, 2, 2);
      var ndarrayJs = Sk.ffi.remapToJs(self);
      var _index; // current index
      var _buffer; // buffer as python type
      var buffer_internal; // buffer als js array
      var _stride; // stride
      var _shape; // shape as js
      var i;
      // single index e.g. [3]
      if (Sk.builtin.checkInt(index)) {
        var offset = Sk.ffi.remapToJs(index);

        if (ndarrayJs.shape.length > 1) {
          _stride = ndarrayJs.strides[0];
          buffer_internal = [];
          _index = 0;

          for (i = offset * _stride, ubound = (offset + 1) * _stride; i <
            ubound; i++) {
            buffer_internal[_index++] = ndarrayJs.buffer[i];
          }

          _buffer = new Sk.builtin.list(buffer_internal);
          _shape = new Sk.builtin.tuple(Array.prototype.slice.call(
              ndarrayJs.shape,
              1)
            .map(function (x) {
              return new Sk.builtin.int_(x);
            }));
          return Sk.misceval.callsim(mod[CLASS_NDARRAY], _shape,
            undefined,
            _buffer);
        } else {
          if (offset >= 0 && offset < ndarrayJs.buffer.length) {
            return ndarrayJs.buffer[offset];
          } else {
            throw new Sk.builtin.IndexError("array index out of range");
          }
        }
      } else if (index instanceof Sk.builtin.tuple) {
        // index like [1,3]
        var keyJs = Sk.ffi.remapToJs(index);
        if (keyJs.length != PyArray_NDIM(self)) {
            throw new Sk.builtin.ValueError('Tuple must contain values for all dimensions');
        }
        // ToDo: implement buffer returning for smaller bits
        return ndarrayJs.buffer[computeOffset(ndarrayJs.strides, keyJs)];
      } else if (index instanceof Sk.builtin.slice) {
        // support for slices e.g. [1:4:-1]
        var length = Sk.builtin.len(self);
        buffer_internal = [];
        length = Sk.ffi.remapToJs(length);
        index.sssiter$(length, function (i, wrt) {
            if (i >= 0 && i < length) {
                buffer_internal.push(PyArray_DATA(self)[i]);
            }
        });
        _buffer = new Sk.builtin.list(buffer_internal);
        _shape = new Sk.builtin.tuple([buffer_internal.length].map(
          function (
            x) {
            return new Sk.builtin.int_(x);
          }));
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], _shape, undefined,
          _buffer);
      } else {
        throw new Sk.builtin.ValueError('Index "' + index +
          '" must be int, slice or tuple');
      }
    });

    $loc.__setitem__ = new Sk.builtin.func(function (self, index, value) {
        console.log("enter setitem")
      var ndarrayJs = Sk.ffi.remapToJs(self);
      Sk.builtin.pyCheckArgs("[]", arguments, 3, 3);
      if (Sk.builtin.checkInt(index)) {
        var _offset = Sk.ffi.remapToJs(index);
        if (ndarrayJs.shape.length > 1) {
          var _value = Sk.ffi.remapToJs(value);
          var _stride = ndarrayJs.strides[0];
          var _index = 0;

          var _ubound = (_offset + 1) * _stride;
          var i;
          for (i = _offset * _stride; i < _ubound; i++) {
            ndarrayJs.buffer[i] = _value[_index++];
          }
        } else {
          if (_offset >= 0 && _offset < ndarrayJs.buffer.length) {
            ndarrayJs.buffer[_offset] = value;
          } else {
            throw new Sk.builtin.IndexError("array index out of range");
          }
        }
      } else if (index instanceof Sk.builtin.tuple) {
        _key = Sk.ffi.remapToJs(index);
        ndarrayJs.buffer[computeOffset(ndarrayJs.strides, _key)] = value;
      } else {
        throw new Sk.builtin.TypeError(
          'argument "index" must be int or tuple');
      }
    });

    $loc.__len__ = new Sk.builtin.func(function (self) {
        console.log("enter len")
      var ndarrayJs = Sk.ffi.remapToJs(self);
      return new Sk.builtin.int_(ndarrayJs.shape[0]);
    });

    $loc.__iter__ = new Sk.builtin.func(function (self) {
        console.log("enter iter")
      var ndarrayJs = Sk.ffi.remapToJs(self);
      var ret = {
        tp$iter: function () {
          return ret;
        },
        $obj: ndarrayJs,
        $index: 0,
        tp$iternext: function () {
          // ToDo: should we rise here the IterationStop Exception?
          if (ret.$index >= ret.$obj.buffer.length) return undefined;
          return ret.$obj.buffer[ret.$index++];
        }
      };
      return ret;
    });

    function _formatArray(a, format_function, rank, max_line_len, next_line_prefix, separator, edge_items, summary_insert) {
        // port the functions and output the items in a nice way
        // https://github.com/numpy/numpy/blob/v1.9.1/numpy/core/arrayprint.py#L465
    }

    $loc.__str__ = new Sk.builtin.func(function (self) {
        console.log("enter str")
        if (PyArray_StrFunction == null) {
            return Sk.misceval.callsim(self.__repr__, self);
        } else {
            return PyArray_StrFunction.call(null, self);
        }
    });

    $loc.__repr__ = new Sk.builtin.func(function (self) {
        console.log("enter repr")
      return array_repr_builtin(self, 1);
    });

    /**
      Creates left hand side operations for given binary operator
    **/
    function makeNumericBinaryOpLhs(operation) {
      return function (self, other) {
        var lhs;
        var rhs;
        var buffer; // external
        var _buffer; // internal use
        var shape; // new shape of returned ndarray
        var i;

        if (PyArray_Check(other)) {
          lhs = PyArray_DATA(self);
          rhs = PyArray_DATA(other);
          _buffer = [];
          for (i = 0, len = lhs.length; i < len; i++) {
            //_buffer[i] = operation(lhs[i], rhs[i]);
            _buffer[i] = Sk.abstr.binary_op_(lhs[i], rhs[i], operation);
          }
        } else {
          lhs = PyArray_DATA(self);
          _buffer = [];
          for (i = 0, len = lhs.length; i < len; i++) {
            _buffer[i] = Sk.abstr.numberBinOp(lhs[i], other, operation);
          }
        }

        // create return ndarray
        shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function (x) {
          return new Sk.builtin.int_(x);
        }));
        buffer = new Sk.builtin.list(_buffer);
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self),
          buffer);
      };
    }

    function makeNumericBinaryOpInplace(operation) {
        return function (self, other) {
            var lhs;
            var rhs;
            var i;

            if (PyArray_Check(other)) {
              lhs = PyArray_DATA(self);
              rhs = PyArray_DATA(other);
              for (i = 0, len = lhs.length; i < len; i++) {
                lhs[i] = Sk.abstr.binary_op_(lhs[i], rhs[i], operation);
              }
            } else {
              lhs = PyArray_DATA(self);
              for (i = 0, len = lhs.length; i < len; i++) {
                lhs[i] = Sk.abstr.numberBinOp(lhs[i], other, operation);
              }
            }

            return self;
        };
    }


    function makeNumericBinaryOpRhs(operation) {
      return function (self, other) {
        var rhsBuffer = PyArray_DATA(self);
        var _buffer = [];
        for (var i = 0, len = rhsBuffer.length; i < len; i++) {
          _buffer[i] = Sk.abstr.numberBinOp(other, rhsBuffer[i], operation);
        }
        var shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function (x) {
          return new Sk.builtin.int_(x);
        }));
        buffer = new Sk.builtin.list(_buffer);
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer);
      };
    }

    /*
      Applies given operation on each element of the ndarray.
    */
    function makeUnaryOp(operation) {
      return function (self) {
        var _buffer =PyArray_DATA(self).map(function (value) {
          return Sk.abstr.numberUnaryOp(value, operation);
        });
        var shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function (x) {
          return new Sk.builtin.int_(x);
        }));
        buffer = new Sk.builtin.list(_buffer);
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer);
      };
    }

    $loc.__add__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Add"));
    $loc.__radd__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Add"));
    $loc.__iadd__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Add"));

    $loc.__sub__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Sub"));
    $loc.__rsub__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Sub"));
    $loc.__isub__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Sub"));

    $loc.__mul__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Mult"));
    $loc.__rmul__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Mult"));
    $loc.__imul__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Mult"));

    $loc.__div__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Div"));
    $loc.__rdiv__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Div"));
    $loc.__idiv__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Div"));

    $loc.__floordiv__ = new Sk.builtin.func(makeNumericBinaryOpLhs("FloorDiv"));
    $loc.__rfloordiv__ = new Sk.builtin.func(makeNumericBinaryOpRhs("FloorDiv"));
    $loc.__ifloordiv__ = new Sk.builtin.func(makeNumericBinaryOpInplace("FloorDiv"));

    $loc.__mod__ = new Sk.builtin.func(makeNumericBinaryOpLhs("Mod"));
    $loc.__rmod__ = new Sk.builtin.func(makeNumericBinaryOpRhs("Mod"));
    $loc.__imod__ = new Sk.builtin.func(makeNumericBinaryOpInplace("Mod"));

    $loc.__xor__ = new Sk.builtin.func(makeNumericBinaryOpLhs("BitXor"));
    $loc.__rxor__ = new Sk.builtin.func(makeNumericBinaryOpRhs("BitXor"));
    $loc.__ixor__ = new Sk.builtin.func(makeNumericBinaryOpInplace("BitXor"));

    $loc.__lshift__ = new Sk.builtin.func(makeNumericBinaryOpLhs("LShift"));
    $loc.__rlshift__ = new Sk.builtin.func(makeNumericBinaryOpRhs("LShift"));
    $loc.__ilshift__ = new Sk.builtin.func(makeNumericBinaryOpInplace("LShift"));

    $loc.__rshift__ = new Sk.builtin.func(makeNumericBinaryOpLhs("RShift"));
    $loc.__rrshift__ = new Sk.builtin.func(makeNumericBinaryOpRhs("RShift"));
    $loc.__irshift__ = new Sk.builtin.func(makeNumericBinaryOpInplace("RShift"));

    $loc.__pos__ = new Sk.builtin.func(makeUnaryOp("UAdd"));
    $loc.__neg__ = new Sk.builtin.func(makeUnaryOp("USub"));

    // logical compare functions
    $loc.__eq__ = new Sk.builtin.func(function (self, other) {
        return Sk.misceval.callsim(mod.equal, self, other);
    });

    $loc.__ne__ = new Sk.builtin.func(function (self, other) {
        return Sk.misceval.callsim(mod.not_equal, self, other);
    });

    $loc.__lt__ = new Sk.builtin.func(function (self, other) {
        return Sk.misceval.callsim(mod.less, self, other);
    });

    $loc.__le__ = new Sk.builtin.func(function (self, other) {
        return Sk.misceval.callsim(mod.less_equal, self, other);
    });

    $loc.__gt__ = new Sk.builtin.func(function (self, other) {
        return Sk.misceval.callsim(mod.greater, self, other);
    });

    $loc.__ge__ = new Sk.builtin.func(function (self, other) {
        return Sk.misceval.callsim(mod.greater_equal, self, other);
    });

    /**
     Simple pow implementation that faciliates the pow builtin
    **/
    $loc.__pow__ = new Sk.builtin.func(function (self, other) {
      Sk.builtin.pyCheckArgs("__pow__", arguments, 2, 2);
      var _buffer = PyArray_DATA(self).map(function (value) {
        return Sk.builtin.pow(value, other);
      });
      var shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function (x) {
        return new Sk.builtin.int_(x);
      }));
      buffer = new Sk.builtin.list(_buffer);
      return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer);
    });

    $loc.dot = new Sk.builtin.func(function (self, other) {
        var ret;
        ret = Sk.misceval.callsim(mod.dot, self, other);

        return ret;
    });

    $loc.__abs__ = new Sk.builtin.func(function (self) {
        Sk.builtin.pyCheckArgs("__abs__", arguments, 1, 1);
        var _buffer = PyArray_DATA(self).map(function (value) {
            return Sk.builtin.abs(value);
        });

        var shape = new Sk.builtin.tuple(PyArray_DIMS(self).map(function (x) {
            return new Sk.builtin.int_(x);
        }));

        buffer = new Sk.builtin.list(_buffer);
        return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(self), buffer);
    });

    // reference: https://github.com/numpy/numpy/blob/41afcc3681d250f231aea9d9f428a9e197a47f6e/numpy/core/src/multiarray/shape.c#L692
    $loc.transpose = new Sk.builtin.func(function (self, args) {
        // http://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.transpose.html
        // https://github.com/numpy/numpy/blob/d033b6e19fc95a1f1fd6592de8318178368011b1/numpy/core/src/multiarray/methods.c#L1896
        var shape = Sk.builtin.none.none$;
        var n = arguments.length - 1;
        var permute = [];
        var ret;

        // get args
        args = Array.prototype.slice.call(arguments, 1); 

        if (n > 1) {
            shape = args;
        } else if (n === 1) {
            shape = args[0];
        }

        if (Sk.builtin.checkNone(shape)) {
            ret = PyArray_Transpose(self, null);
        } else {
            permute = Sk.ffi.remapToJs(shape);
            ret = PyArray_Transpose(self, permute);
        }

        return ret;
    });

    $loc.any = new Sk.builtin.func(function (self, axis, out) {
        return Sk.misceval.callsim(mod.any, self, axis, out);
    });

    $loc.all = new Sk.builtin.func(function (self, axis, out) {
        return Sk.misceval.callsim(mod.all, self, axis, out);
    });

    $loc.mean = new Sk.builtin.func(function (self, axis, dtype, out, keepdims) {
        return Sk.misceval.callsim(mod.mean, self, axis, dtype, out, keepdims);
    });

    $loc.sum = new Sk.builtin.func(function (self, axis, dtype, out, keepdims) {
        return Sk.misceval.callsim(mod.sum, self, axis, dtype, out, keepdims);
    });

    $loc.prod = new Sk.builtin.func(function (self, axis, dtype, out, keepdims) {
        return Sk.misceval.callsim(mod.prod, self, axis, dtype, out, keepdims);
    });

    // end of ndarray_f
  };

  mod[CLASS_NDARRAY] = Sk.misceval.buildClass(mod, ndarray_f,
    CLASS_NDARRAY, []);

  /**
   Trigonometric functions, all element wise
  **/
  mod.pi = Sk.builtin.float_(np.math ? np.math.PI : Math.PI);
  mod.e = Sk.builtin.float_(np.math ? np.math.E : Math.E);
  /**
  Trigonometric sine, element-wise.
  **/

  function callTrigonometricFunc(x, op) {
    var res;
    var num;

    // ToDo: check if we can use ArrayFromAny here!
    if (x instanceof Sk.builtin.list || x instanceof Sk.builtin.tuple) {
      x = Sk.misceval.callsim(mod.array, x);
    }

    if (PyArray_Check(x)) {
      var _buffer = PyArray_DATA(x).map(function (value) {
        num = Sk.builtin.asnum$(value);
        res = op.call(null, num);
        return new Sk.builtin.float_(res);
      });

      var shape = new Sk.builtin.tuple(PyArray_DIMS(x).map(function (d) {
        return new Sk.builtin.int_(d);
      }));

      buffer = new Sk.builtin.list(_buffer);
      return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, PyArray_DESCR(x), buffer);
    } else if (Sk.builtin.checkNumber(x)) {
      num = Sk.builtin.asnum$(x);
      res = op.call(null, num);
      return new Sk.builtin.float_(res);
    }

    throw new Sk.builtin.TypeError('Unsupported argument type for "x"');
  }
  
  // Sine, element-wise.
  var sin_f = function (x, out) {
    Sk.builtin.pyCheckArgs("sin", arguments, 1, 2);
    return callTrigonometricFunc(x, np.math ? np.math.sin : Math.sin);
  };
  sin_f.co_varnames = ['x', 'out'];
  sin_f.$defaults = [0, new Sk.builtin.list([])];
  mod.sin = new Sk.builtin.func(sin_f);

  // Hyperbolic sine, element-wise.
  var sinh_f = function (x, out) {
    Sk.builtin.pyCheckArgs("sinh", arguments, 1, 2);
    if (!np.math) throw new Sk.builtin.OperationError("sinh requires math polyfill");
    return callTrigonometricFunc(x, np.math.sinh);
  };
  sinh_f.co_varnames = ['x', 'out'];
  sinh_f.$defaults = [0, new Sk.builtin.list([])];
  mod.sinh = new Sk.builtin.func(sinh_f);

  // Inverse sine, element-wise.
  var arcsin_f = function (x, out) {
    Sk.builtin.pyCheckArgs("arcsin", arguments, 1, 2);
    return callTrigonometricFunc(x, np.math ? np.math.asin : Math.asin);
  };
  arcsin_f.co_varnames = ['x', 'out'];
  arcsin_f.$defaults = [0, new Sk.builtin.list([])];
  mod.arcsin = new Sk.builtin.func(arcsin_f);

  // Cosine, element-wise.
  var cos_f = function (x, out) {
    Sk.builtin.pyCheckArgs("cos", arguments, 1, 2);
    return callTrigonometricFunc(x, np.math ? np.math.cos : Math.cos);
  };
  cos_f.co_varnames = ['x', 'out'];
  cos_f.$defaults = [0, new Sk.builtin.list([])];
  mod.cos = new Sk.builtin.func(cos_f);

  // Hyperbolic cosine, element-wise.
  var cosh_f = function (x, out) {
    Sk.builtin.pyCheckArgs("cosh", arguments, 1, 2);
    if (!np.math) throw new Sk.builtin.OperationError("cosh requires math polyfill");
    return callTrigonometricFunc(x, np.math.cosh);
  };
  cosh_f.co_varnames = ['x', 'out'];
  cosh_f.$defaults = [0, new Sk.builtin.list([])];
  mod.cosh = new Sk.builtin.func(cosh_f);

  // Inverse cosine, element-wise.
  var arccos_f = function (x, out) {
    Sk.builtin.pyCheckArgs("arccos", arguments, 1, 2);
    return callTrigonometricFunc(x, np.math ? np.math.acos : Math.acos);
  };
  arccos_f.co_varnames = ['x', 'out'];
  arccos_f.$defaults = [0, new Sk.builtin.list([])];
  mod.arccos = new Sk.builtin.func(arccos_f);

  // Inverse tangens, element-wise.
  var arctan_f = function (x, out) {
    Sk.builtin.pyCheckArgs("arctan", arguments, 1, 2);
    return callTrigonometricFunc(x, np.math ? np.math.atan : Math.atan);
  };
  arctan_f.co_varnames = ['x', 'out'];
  arctan_f.$defaults = [0, new Sk.builtin.list([])];
  mod.arctan = new Sk.builtin.func(arctan_f);

  // Tangens, element-wise.
  var tan_f = function (x, out) {
    Sk.builtin.pyCheckArgs("tan", arguments, 1, 2);
    return callTrigonometricFunc(x, np.math ? np.math.tan : Math.tan);
  };
  tan_f.co_varnames = ['x', 'out'];
  tan_f.$defaults = [0, new Sk.builtin.list([])];
  mod.tan = new Sk.builtin.func(tan_f);

  // Hyperbolic cosine, element-wise.
  var tanh_f = function (x, out) {
    Sk.builtin.pyCheckArgs("tanh", arguments, 1, 2);
    if (!np.math) throw new Sk.builtin.OperationError("tanh requires math polyfill");
    return callTrigonometricFunc(x, np.math.tanh);
  };
  tanh_f.co_varnames = ['x', 'out'];
  tanh_f.$defaults = [0, new Sk.builtin.list([])];
  mod.tanh = new Sk.builtin.func(tanh_f);

  //新函数：numpy.round（）
  var round_f=function (x,decimals,out){
    Sk.builtin.pyCheckArgs("round", arguments, 1, 3);
    if (!np.math) throw new Sk.builtin.OperationError("round requires math polyfill");
    console.log(callTrigonometricFunc(x, np.math ? np.math.round : Math.round))
    return Sk.misceval.callsim(mod.array, callTrigonometricFunc(x, np.math ? np.math.round : Math.round),Sk.builtin.int_) ;
  }
  round_f.co_varnames = ['x', 'decimals','out'];
  round_f.$defaults = [0, 0 ,new Sk.builtin.list([])];
  mod.round = new Sk.builtin.func(round_f);

  //新函数：numpy.ceil（）
  var ceil_f=function (x,out){
    Sk.builtin.pyCheckArgs("ceil", arguments, 1, 2);
    if (!np.math) throw new Sk.builtin.OperationError("ceil requires math polyfill");
    return Sk.misceval.callsim(mod.array, callTrigonometricFunc(x, np.math ? np.math.ceil : Math.ceil),Sk.builtin.int_) ;
  }
  ceil_f.co_varnames = ['x', 'out'];
  ceil_f.$defaults = [0, new Sk.builtin.list([])];
  mod.ceil = new Sk.builtin.func(ceil_f);

  //新函数：numpy.floor（）
  var floor_f=function (x,out){
    Sk.builtin.pyCheckArgs("floor", arguments, 1, 2);
    if (!np.math) throw new Sk.builtin.OperationError("floor requires math polyfill");
    return Sk.misceval.callsim(mod.array, callTrigonometricFunc(x, np.math ? np.math.floor : Math.floor),Sk.builtin.int_) ;
  }
  floor_f.co_varnames = ['x', 'out'];
  floor_f.$defaults = [0, new Sk.builtin.list([])];
  mod.floor = new Sk.builtin.func(floor_f);

  // Exponential
  var exp_f = function (x, out) {
    Sk.builtin.pyCheckArgs("exp", arguments, 1, 2);

    /* for complex type support we should use here a different approach*/
    //Sk.builtin.assk$(Math.E, Sk.builtin.nmber.float$);
    return callTrigonometricFunc(x, np.math ? np.math.exp : Math.exp);
  };
  exp_f.co_varnames = ['x', 'out'];
  exp_f.$defaults = [0, new Sk.builtin.list([])];
  mod.exp = new Sk.builtin.func(exp_f);

  // Square Root
  var sqrt_f = function (x, out) {
    Sk.builtin.pyCheckArgs("sqrt", arguments, 1, 2);
   return callTrigonometricFunc(x, np.math ? np.math.sqrt : Math.sqrt);
  };
  sqrt_f.co_varnames = ['x', 'out'];
  sqrt_f.$defaults = [0, new Sk.builtin.list([])];
  mod.sqrt = new Sk.builtin.func(sqrt_f);


  /* Simple reimplementation of the linspace function
   * http://docs.scipy.org/doc/numpy/reference/generated/numpy.linspace.html
   */
  var linspace_f = function (start, stop, num, endpoint, retstep) {
    Sk.builtin.pyCheckArgs("linspace", arguments, 3, 5);
    Sk.builtin.pyCheckType("start", "number", Sk.builtin.checkNumber(
      start));
    Sk.builtin.pyCheckType("stop", "number", Sk.builtin.checkNumber(
      stop));
    if (num === undefined) {
      num = 50;
    }
    var num_num = Sk.builtin.asnum$(num);
    var endpoint_bool;

    if (endpoint === undefined) {
      endpoint_bool = true;
    } else if (endpoint.constructor === Sk.builtin.bool) {
      endpoint_bool = endpoint.v;
    }

    var retstep_bool;
    if (retstep === undefined) {
      retstep_bool = false;
    } else if (retstep.constructor === Sk.builtin.bool) {
      retstep_bool = retstep.v;
    }

    var samples;
    var step;

    start_num = Sk.builtin.asnum$(start) * 1.0;
    stop_num = Sk.builtin.asnum$(stop) * 1.0;

    if (num_num <= 0) {
      samples = [];
    } else {

      var samples_array;
      if (endpoint_bool) {
        if (num_num == 1) {
          samples = [start_num];
        } else {
          step = (stop_num - start_num) / (num_num - 1);
          samples_array = np.arange(0, num_num);
          samples = samples_array.map(function (v) {
            return v * step + start_num;
          });
          samples[samples.length - 1] = stop_num;
        }
      } else {
        step = (stop_num - start_num) / num_num;
        samples_array = np.arange(0, num_num);
        samples = samples_array.map(function (v) {
          return v * step + start_num;
        });
      }
    }

    //return as ndarray! dtype:float
    var dtype = Sk.builtin.float_;
    for (i = 0; i < samples.length; i++) {
      samples[i] = Sk.misceval.callsim(dtype, samples[i]);
    }

    var buffer = Sk.builtin.list(samples);
    var shape = new Sk.builtin.tuple([samples.length]);
    var ndarray = Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, dtype,
      buffer);

    if (retstep_bool === true)
      return new Sk.builtin.tuple([ndarray, step]);
    else
      return ndarray;
  };

  // this should allow for named parameters
  linspace_f.co_varnames = ['start', 'stop', 'num', 'endpoint',
    'retstep'
  ];
  linspace_f.$defaults = [0, 0, 50, true, false];
  mod.linspace =
    new Sk.builtin.func(linspace_f);

  /* Simple reimplementation of the arange function
   * http://docs.scipy.org/doc/numpy/reference/generated/numpy.arange.html#numpy.arange
   */
  var arange_f = function (start, stop, step, dtype) {
    Sk.builtin.pyCheckArgs("arange", arguments, 1, 4);
    Sk.builtin.pyCheckType("start", "number", Sk.builtin.checkNumber(
      start));
    var start_num;
    var stop_num;
    var step_num;
    var dtype=dtype || Sk.builtin.none.none$;

    if (stop === undefined && step === undefined) {
        start_num = Sk.builtin.asnum$(0);
        stop_num = Sk.builtin.asnum$(start);
        step_num = Sk.builtin.asnum$(1);
    } else if (step === undefined) {
        start_num = Sk.builtin.asnum$(start);
        stop_num = Sk.builtin.asnum$(stop);
        step_num = Sk.builtin.asnum$(1);
    } else {
        start_num = Sk.builtin.asnum$(start);
        stop_num = Sk.builtin.asnum$(stop);
        step_num = Sk.builtin.asnum$(step);
    }

    // set to float
    if (!dtype || dtype == Sk.builtin.none.none$) {
      if (Sk.builtin.checkInt(start)){
        dtype = "int";
      }else{
        dtype = "float";
      }
    }

    // return ndarray
    var arange_buffer = np.arange(start_num, stop_num, step_num);
    // apply dtype casting function, if it has been provided
    // if (dtype && Sk.builtin.checkClass(dtype)) {
    //   for (i = 0; i < arange_buffer.length; i++) {
    //     arange_buffer[i] = Sk.misceval.callsim(dtype, arange_buffer[i]);
    //   }
    // }
    // set to float
    if (dtype == Sk.builtin.none.none$) {
        if (Sk.builtin.checkInt(start)) {
            dtype = "int";
            for (i = 0; i < arange_buffer.length; i++) {
                arange_buffer[i] = Math.floor(arange_buffer[i]);
            }
        } else {
            dtype = "float";
            for (i = 0; i < arange_buffer.length; i++) {
                arange_buffer[i] = new Sk.builtin.float_(arange_buffer[i]);
            }
        }
    }else{
        if(dtype == "int"){
            for (i = 0; i < arange_buffer.length; i++) {
                arange_buffer[i] = Math.floor(arange_buffer[i]);
            }
        }else if(dtype == "float"){
            for (i = 0; i < arange_buffer.length; i++) {
                arange_buffer[i] = new Sk.builtin.float_(arange_buffer[i]);
            }
        }
    }
    buffer =new Sk.builtin.list(arange_buffer);
    var shape = new Sk.builtin.tuple([arange_buffer.length]);
    return Sk.misceval.callsim(mod[CLASS_NDARRAY], shape, dtype,
      buffer);
  };

  arange_f.co_varnames = ['start', 'stop', 'step', 'dtype'];
  arange_f
    .$defaults = [0, 1, 1, Sk.builtin.none.none$];
  mod.arange = new Sk.builtin
    .func(arange_f);

  /* implementation for numpy.array
    ------------------------------------------------------------------------------------------------
        http://docs.scipy.org/doc/numpy/reference/generated/numpy.array.html#numpy.array
        object : array_like
        An array, any object exposing the array interface, an object whose __array__ method returns an array, or any (nested) sequence.
        dtype : data-type, optional
        The desired data-type for the array. If not given, then the type will be determined as the minimum type required to hold the objects in the sequence. This argument can only be used to ‘upcast’ the array. For downcasting, use the .astype(t) method.
        copy : bool, optional
        If true (default), then the object is copied. Otherwise, a copy will only be made if __array__ returns a copy, if obj is a nested sequence, or if a copy is needed to satisfy any of the other requirements (dtype, order, etc.).
        order : {‘C’, ‘F’, ‘A’}, optional
        Specify the order of the array. If order is ‘C’ (default), then the array will be in C-contiguous order (last-index varies the fastest). If order is ‘F’, then the returned array will be in Fortran-contiguous order (first-index varies the fastest). If order is ‘A’, then the returned array may be in any order (either C-, Fortran-contiguous, or even discontiguous).
        subok : bool, optional
        If True, then sub-classes will be passed-through, otherwise the returned array will be forced to be a base-class array (default).
        ndmin : int, optional
        Specifies the minimum number of dimensions that the resulting array should have. Ones will be pre-pended to the shape as needed to meet this requirement.
        Returns :
        out : ndarray
        An array object satisfying the specified requirements
    */
  // https://github.com/geometryzen/davinci-dev/blob/master/src/stdlib/numpy.js
  // https://github.com/geometryzen/davinci-dev/blob/master/src/ffh.js
  // http://docs.scipy.org/doc/numpy/reference/arrays.html
  var array_f = function (object, dtype, copy, order, subok, ndmin) {
    Sk.builtin.pyCheckArgs("array", arguments, 1, 6);

    // ToDo: use PyArray_FromAny here and then do some checkings for the type
    // and maybe casting and support ndmin param
    // see http://docs.scipy.org/doc/numpy/reference/generated/numpy.array.html#numpy.array

    if (object === undefined)
      throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(object) +
        "' object is undefined");

    // check for ndmin param
    if (ndmin != null && Sk.builtin.checkInt(ndmin) === false) {
      throw new Sk.builtin.TypeError('Parameter "ndmin" must be of type "int"');
    }

    var py_ndarray = PyArray_FromAny(object, dtype, ndmin);

    return py_ndarray;
  };

  array_f.co_varnames = ['object', 'dtype', 'copy', 'order',
    'subok', 'ndmin'
  ];
  array_f.$defaults = [null, Sk.builtin.none.none$, true, new Sk.builtin.str(
    'C'), false, new Sk.builtin.int_(0)];
  mod.array = new Sk.builtin.func(array_f);

    var asanyarray_f = function (a, dtype, order) {
        //array(a, dtype, copy=False, order=order, subok=True)
        return Sk.misceval.callsim(mod.array, dtype, Sk.builtin.bool.false$, order);
    };

    mod.asanyarray = new Sk.builtin.func(asanyarray_f);
    asanyarray_f.co_varnames = ['a', 'dtype', 'order'];
    asanyarray_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$];

  /**
    Return a new array of given shape and type, filled with zeros.
  **/
  var zeros_f = function (shape, dtype, order) {
    Sk.builtin.pyCheckArgs("zeros", arguments, 1, 3);
    if(!Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) {
      throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
    }

    if (dtype instanceof Sk.builtin.list) {
      throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) +
        "' is not supported for dtype.");
    }

    var _zero = new Sk.builtin.float_(0.0);

    return Sk.misceval.callsim(mod.full, shape, _zero, dtype, order);
  };
  zeros_f.co_varnames = ['shape', 'dtype', 'order'];
  zeros_f.$defaults = [
    new Sk.builtin.tuple([]), Sk.builtin.none.none$, new Sk.builtin.str('C')
  ];
  mod.zeros = new Sk.builtin.func(zeros_f);

  /**
    Return a new array of given shape and type, filled with `fill_value`.
  **/
  var full_f = function (shape, fill_value, dtype, order) {
    Sk.builtin.pyCheckArgs("full", arguments, 2, 4);

    if(!Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) {
      throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
    }

    if (dtype instanceof Sk.builtin.list) {
      throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) +
        "' is currently not supported for dtype.");
    }

    var _shape = Sk.ffi.remapToJs(shape);
    var _tup;
    if(Sk.builtin.checkInt(shape)) {
      _tup = [];
      _tup.push(_shape);
      _shape = _tup;
    }
      // generate an array of the dimensions for the generic array method

    var _size = prod(_shape);
    var _buffer = [];
    var _fill_value = fill_value;
    var i;

    for (i = 0; i < _size; i++) {
      _buffer[i] = _fill_value;
    }

    // if no dtype given and type of fill_value is numeric, assume float
    if (!dtype && Sk.builtin.checkNumber(fill_value)) {
      dtype = Sk.builtin.float_;
    }

    // apply dtype casting function, if it has been provided
    if (Sk.builtin.checkClass(dtype)) {
      for (i = 0; i < _buffer.length; i++) {
        if (_buffer[i] !== Sk.builtin.none.none$) {
          _buffer[i] = Sk.misceval.callsim(dtype, _buffer[i]);
        }
      }
    }
    return Sk.misceval.callsim(mod[CLASS_NDARRAY], new Sk.builtin.list(_shape), dtype, new Sk.builtin
      .list(
        _buffer));
  };
  full_f.co_varnames = ['shape', 'fill_value', 'dtype', 'order'];
  full_f.$defaults = [
    new Sk.builtin.tuple([]), Sk.builtin.none.none$, Sk.builtin.none.none$, new Sk
    .builtin
    .str('C')
  ];
  mod.full = new Sk.builtin.func(full_f);

  var abs_f = function (x) {
    Sk.builtin.pyCheckArgs("abs", arguments, 1, 1);
    var ret;
    if (PyArray_Check(x) == true) {
        // call abs on each element of the array and return new array
        // we need to call __abs__ on the ndarray
        ret = Sk.misceval.callsim(x.__abs__, x);
    } else {
        // return abs for element by calling abs
        ret = Sk.builtin.abs(x);
    }

    return ret;
  };

  mod.abs = new Sk.builtin.func(abs_f);
  mod.absolute = mod.abs;

 var mean_f = function (x, axis, dtype, out, keepdims) {
    Sk.builtin.pyCheckArgs("mean", arguments, 1, 5);
    var ret;
    var sum = new Sk.builtin.float_(0.0); // initialised sum var
    var mean;
    var i = 0;
    var _buffer;
    var length;

    if (axis != null && !Sk.builtin.checkNone(axis)) {
        throw new Sk.builtin.NotImplementedError("the 'axis' parameter is currently not supported");
    }

    if (out != null && !Sk.builtin.checkNone(out)) {
        throw new Sk.builtin.NotImplementedError("the 'out' parameter is currently not supported");
    }

    if (keepdims != null && keepdims != Sk.builtin.bool.false$) {
        throw new Sk.builtin.NotImplementedError("the 'keepdims' parameter is currently not supported");
    }

    // ToDo: check here for array like
    // call PyArrayFromAny

    if (PyArray_Check(x) == true) {
        _buffer = PyArray_DATA(x);
        length = new Sk.builtin.int_(PyArray_SIZE(x));

        for (i = 0; i < length.v; i++) {
            sum = Sk.abstr.numberBinOp(sum, _buffer[i], 'Add');
        }

        mean = Sk.abstr.numberBinOp(sum, length, 'Div');
    } else {
        // return abs for element by calling abs
        mean = x
    }

    // apply dtype casting
    if (dtype != null && !Sk.builtin.checkNone(dtype)) {
        mean = Sk.misceval.callsim(dtype, mean);
    }

    // call PyArray_Return
    return mean;
  };
  mean_f.co_varnames = ['a', 'axis', 'dtype', 'out', 'keepdims'];
  mean_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$];
  mod.mean = new Sk.builtin.func(mean_f);

 var sum_f = function (x, axis, dtype, out, keepdims) {
    Sk.builtin.pyCheckArgs("sum", arguments, 1, 5);
    var ret;
    var sum = new Sk.builtin.float_(0.0); // initialised sum var
    var i = 0;
    var _buffer;
    var length;

    if (axis != null && !Sk.builtin.checkNone(axis)) {
        throw new Sk.builtin.NotImplementedError("the 'axis' parameter is currently not supported");
    }

    if (out != null && !Sk.builtin.checkNone(out)) {
        throw new Sk.builtin.NotImplementedError("the 'out' parameter is currently not supported");
    }

    if (keepdims != null && keepdims != Sk.builtin.bool.false$) {
        throw new Sk.builtin.NotImplementedError("the 'keepdims' parameter is currently not supported");
    }

    // ToDo: check here for array like
    // call PyArrayFromAny

    if (PyArray_Check(x) == true) {
        _buffer = PyArray_DATA(x);
        length = new Sk.builtin.int_(PyArray_SIZE(x));

        for (i = 0; i < length.v; i++) {
            sum = Sk.abstr.numberBinOp(sum, _buffer[i], 'Add');
        }
    } else {
        // return abs for element by calling abs
        sum = x
    }

    // apply dtype casting
    if (dtype != null && !Sk.builtin.checkNone(dtype)) {
        sum = Sk.misceval.callsim(dtype, sum);
    }

    // call PyArray_Return
    return sum;
  };
  sum_f.co_varnames = ['a', 'axis', 'dtype', 'out', 'keepdims'];
  sum_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$];
  mod.sum = new Sk.builtin.func(sum_f);

 var prod_f = function (x, axis, dtype, out, keepdims) {
    Sk.builtin.pyCheckArgs("prod", arguments, 1, 5);
    var ret;
    var prod = new Sk.builtin.float_(1.0); // initialised sum var
    var i = 0;
    var _buffer;
    var length;

    if (axis != null && !Sk.builtin.checkNone(axis)) {
        throw new Sk.builtin.NotImplementedError("the 'axis' parameter is currently not supported");
    }

    if (out != null && !Sk.builtin.checkNone(out)) {
        throw new Sk.builtin.NotImplementedError("the 'out' parameter is currently not supported");
    }

    if (keepdims != null && keepdims != Sk.builtin.bool.false$) {
        throw new Sk.builtin.NotImplementedError("the 'keepdims' parameter is currently not supported");
    }

    // ToDo: check here for array like
    // call PyArrayFromAny

    if (PyArray_Check(x) == true) {
        _buffer = PyArray_DATA(x);
        length = new Sk.builtin.int_(PyArray_SIZE(x));

        for (i = 0; i < length.v; i++) {
            prod = Sk.abstr.numberBinOp(prod, _buffer[i], 'Mult');
        }
    } else {
        // return abs for element by calling abs
        prod = x
    }

    // apply dtype casting
    if (dtype != null && !Sk.builtin.checkNone(dtype)) {
        prod = Sk.misceval.callsim(dtype, prod);
    }

    // call PyArray_Return
    return prod;
  };
  prod_f.co_varnames = ['a', 'axis', 'dtype', 'out', 'keepdims'];
  prod_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.bool.false$];
  mod.prod = new Sk.builtin.func(prod_f);


  /**
    Return a new array of given shape and type, filled with ones.
  **/
  var ones_f = function (shape, dtype, order) {
    Sk.builtin.pyCheckArgs("ones", arguments, 1, 3);

    if(!Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) {
      throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
    }

    if (dtype instanceof Sk.builtin.list) {
      throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) +
        "' is not supported for dtype.");
    }

    var _one = new Sk.builtin.float_(1.0);
    return Sk.misceval.callsim(mod.full, shape, _one, dtype, order);
  };
  ones_f.co_varnames = ['shape', 'dtype', 'order'];
  ones_f.$defaults = [
    new Sk.builtin.tuple([]), Sk.builtin.none.none$, new Sk.builtin.str('C')
  ];
  mod.ones = new Sk.builtin.func(ones_f);

  /**
    Return a new array of given shape and type, filled with None.
  **/
  var empty_f = function (shape, dtype, order) {
    Sk.builtin.pyCheckArgs("empty", arguments, 1, 3);

    if (!Sk.builtin.checkSequence(shape) && !Sk.builtin.checkInt(shape)) {
      throw new Sk.builtin.TypeError('argument "shape" must int or sequence of ints');
    }

    if (dtype instanceof Sk.builtin.list) {
      throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(dtype) +
        "' is not supported for dtype.");
    }

    var _empty = Sk.builtin.none.none$;
    return Sk.misceval.callsim(mod.full, shape, _empty, dtype, order);
  };
  empty_f.co_varnames = ['shape', 'dtype', 'order'];
  empty_f.$defaults = [
    new Sk.builtin.tuple([]), Sk.builtin.none.none$, new Sk.builtin.str('C')
  ];
  mod.empty = new Sk.builtin.func(empty_f);

  /**
    Dot product
  **/
  var dot_f = function (a, b, o) {
    Sk.builtin.pyCheckArgs("dot", arguments, 2, 3);
    var o;
    var ret;

    if (Sk.builtin.checkNone(o)) {
        o = null;
    }

    if (o != null && !PyArray_Check(o)) {
        throw new Sk.builtin.TypeError("'out' must be an array");
    }

    ret = MatrixProdcut2(a, b, o);

    return PyArray_Return(ret);
  };
  dot_f.co_varnames = ['a', 'b', 'out'];
  dot_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.none.none$
  ];
  mod.dot = new Sk.builtin.func(dot_f);

  // https://github.com/numpy/numpy/blob/master/numpy/core/src/multiarray/multiarraymodule.c#L2252
  var vdot_f = function(a, b) {
        // a and b must be array like
        // if a or b have more than 1 dim => flatten them
        var typenum; // int
        var ip1;
        var ip2;
        var op;
        var op1 = a;
        var op2 = b;
        var newdimptr = -1;
        var newdims = [-1, 1];
        var ap1 = null;
        var ap2 = null;
        var ret = null;
        var type;
        var vdot;

        typenum = PyArray_ObjectType(op1, 0);
        typenum = PyArray_ObjectType(op2, typenum);

        type = PyArray_DescrFromType(typenum);

        ap1 = PyArray_FromAny(op1, type, 0, 0, 0, null);
        if (ap1 == null) {
            return null;
        }

        // flatten the array
        op1 = PyArray_NewShape(ap1, newdims, 'NPY_CORDER');
        if (op1 == null) {
            return;
        }
        ap1 = op1;

        ap2 = PyArray_FromAny(op2, type, 0, 0, 0, null);
        if (ap2 == null) {
            return null;
        }

        // flatten the array
        op2 = PyArray_NewShape(ap2, newdims, 'NPY_CORDER');
        if (op2 == null) {
            return;
        }
        ap2 = op2;

        if (PyArray_DIM(ap2, 0) != PyArray_DIM(ap1, 0)) {
            throw new Sk.builtin.ValueError('vectors have different lengths');
        }

        var shape = new Sk.builtin.tuple([0].map(
          function (x) {
            return new Sk.builtin.int_(x);
        }));
        // create new empty array for given dimensions
        ret = Sk.misceval.callsim(mod.zeros, shape, type);

        n = PyArray_DIM(ap1, 0);
        stride1 = PyArray_STRIDE(ap1, 0);
        stride2 = PyArray_STRIDE(ap2, 0);
        ip1 = PyArray_DATA(ap1);
        ip2 = PyArray_DATA(ap2);
        op = PyArray_DATA(ret);

        switch(typenum) {
        case 0:
        case 1:
        case 2:
        case 3:
            vdot = OBJECT_vdot;
            break;
        default:
            throw new Sk.builtin.ValueError('function not available for this data type');
        }

        // call vdot function with vectors
        vdot.call(null, ip1, stride1, ip2, stride2, op, n, null);

        // return resulting ndarray
        return PyArray_Return(ret);
  }
  mod.vdot = new Sk.builtin.func(vdot_f);

  var any_f = function(a, axis, out, keepdims) {
    Sk.builtin.pyCheckArgs("any", arguments, 1, 4, false);
    var arr = PyArray_FromAny(a);
    var data = PyArray_DATA(arr);
    var i;
    var b;

    if (axis != undefined && !Sk.builtin.checkNone(axis)) {
        throw new ValueError('"axis" parameter not supported');
    }

    if (out != undefined  && !Sk.builtin.checkNone(out)) {
        throw new ValueError('"out" parameter not supported');
    }

    // iterate over all items and compare
    for (i = 0; i < data.length; i++) {
        b = Sk.builtin.bool(data[i]);
        if (b == Sk.builtin.bool.true$) {
            return Sk.builtin.bool.true$;
        }
    }

    return Sk.builtin.bool.false$;;
  };
  any_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  any_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.any = new Sk.builtin.func(any_f);

  var all_f = function(a, axis, out, keepdims) {
    Sk.builtin.pyCheckArgs("all", arguments, 1, 4, false);
    var arr = PyArray_FromAny(a);
    var data = PyArray_DATA(arr);
    var i;
    var b;

    if (axis != undefined && !Sk.builtin.checkNone(axis)) {
        throw new ValueError('"axis" parameter not supported');
    }

    if (out != undefined  && !Sk.builtin.checkNone(out)) {
        throw new ValueError('"out" parameter not supported');
    }

    // iterate over all items and compare
    for (i = 0; i < data.length; i++) {
        b = Sk.builtin.bool(data[i]);
        if (b == Sk.builtin.bool.false$) {
            return Sk.builtin.bool.false$;
        }
    }

    return Sk.builtin.bool.true$;;
  };
  all_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  all_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.all = new Sk.builtin.func(all_f);

  function compareLogical(binOp, x1, x2, out) {
    var a1 = PyArray_FromAny(x1);
    var a2 = PyArray_FromAny(x2);
    var data1 = PyArray_DATA(a1);
    var data2 = PyArray_DATA(a2);
    var buf = [];
    var ret;
    var shape;
    
    // hack due to the absence of iter and array broadcasting here
    if (!PyArray_Check(x1) && !Sk.builtin.checkSequence(x1) && !PyArray_Check(x2) && !Sk.builtin.checkSequence(x2)) {
        return Sk.builtin.bool(Sk.misceval.richCompareBool(x1, x2, binOp))
    }

    // check shape
    if (PyArray_SIZE(a1) !== PyArray_SIZE(a2)) {
        // try to make arrays bigger
        if (PyArray_SIZE(a1) === 1) {
            // fill a1 to match a2
            var val = data1[0];
            var i;
            for (i = 1; i < PyArray_SIZE(a2); i++) {
                data1.push(val);
            }
            shape = PyArray_DIMS(a2);
        } else if (PyArray_SIZE(a2) === 1) {
            // fill a1 to match a2
            var val = data2[0];
            var i;
            for (i = 1; i < PyArray_SIZE(a1); i++) {
                data2.push(val);
            }
            shape = PyArray_DIMS(a1);
        } else {
            throw new Sk.builtin.ValueError("operands could not be broadcast together with shapes");
        }
    } else {
        // same shape prod size
        // return shape of first elem
        shape = PyArray_DIMS(a1);
    }

    if (out != undefined  && !Sk.builtin.checkNone(out)) {
        throw new ValueError('"out" parameter not supported');
    }

    // iterate over all items and compare
    for (i = 0; i < data1.length; i++) {
        // TODO!
        // should use iterators!
        // but for iterators we would need to have shape broadcasting!
        buf.push(Sk.builtin.bool(Sk.misceval.richCompareBool(data1[i], data2[i], binOp)));
    }

    // ToDo: pass in correct shape or set it afterwards
    ret = PyArray_FromAny(new Sk.builtin.list(buf));
    ret = PyArray_NewShape(ret, shape, null); // reshape to match the broadcasting behavior

    return PyArray_Return(ret);
  }

  /**
   * Basic impl. of the comparison function due to the lack of real shape broadcasting
   */
  var less_f = function(x1, x2, out) {
    Sk.builtin.pyCheckArgs("less", arguments, 2, 3, false);
    return compareLogical('Lt', x1, x2, out);
  };
  less_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  less_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.less = new Sk.builtin.func(less_f);

  var less_equal_f = function(x1, x2, out) {
    Sk.builtin.pyCheckArgs("less_equal", arguments, 2, 3, false);
    return compareLogical('LtE', x1, x2, out);
  };
  less_equal_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  less_equal_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.less_equal = new Sk.builtin.func(less_equal_f);

  var greater_f = function(x1, x2, out) {
    Sk.builtin.pyCheckArgs("greater", arguments, 2, 3, false);
    return compareLogical('Gt', x1, x2, out);
  };
  greater_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  greater_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.greater = new Sk.builtin.func(greater_f);

  var greater_equal_f = function(x1, x2, out) {
    Sk.builtin.pyCheckArgs("greater_equal", arguments, 2, 3, false);
    return compareLogical('GtE', x1, x2, out);
  };
  greater_equal_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  greater_equal_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.greater_equal = new Sk.builtin.func(greater_equal_f);

  var equal_f = function(x1, x2, out) {
    Sk.builtin.pyCheckArgs("equal", arguments, 2, 3, false);
    return compareLogical('Eq', x1, x2, out);
  };
  equal_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  equal_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.equal = new Sk.builtin.func(equal_f);

  var not_equal_f = function(x1, x2, out) {
    Sk.builtin.pyCheckArgs("not_equal", arguments, 2, 3, false);
    return compareLogical('NotEq', x1, x2, out);
  };
  not_equal_f.co_varnames = ['a', 'axis', 'out', 'keepdims'];
  not_equal_f.$defaults = [Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.bool.false$
  ];
  mod.not_equal = new Sk.builtin.func(not_equal_f);

  mod.identity = new Sk.builtin.func(function (n, dtype) {
    Sk.builtin.pyCheckArgs("identity", arguments, 1, 2, false);
    //if (dtype == null) {
    //   dtype = Sk.builtin.none.none$;
    //}

    n = new Sk.builtin.int_(n); // convert to int or truncate

    var a;
    var b;
    // [1]+n*[0]
    //var al = Sk.abstr.numberBinOp(new Sk.builtin.list([1]), Sk.abstr.numberBinOp(n, new Sk.builtin.list([0]), 'Mult'), 'Add');
    
    // we cannot use flat iter, just generate n*n array and fill with zeros,
    //a = Sk.misceval.callsim(mod.array, al, dtype);
    b = Sk.misceval.callsim(mod.zeros, new Sk.builtin.tuple([n, n]), dtype);
    // b.flat = a;
    // just iterate over n*n array and increment i and j, usefo
    var i;
    var j;
    var length = Sk.ffi.remapToJs(n);
    var value = PyArray_DESCR(b)(1);
    for (i = 0, j = 0; i < length; i++, j++) {
        PyArray_DATA(b)[computeOffset(PyArray_STRIDES(b), [i, j])] = value;
    }

    return b;
  });

  mod.eye = new Sk.builtin.func(function (N, M, k, dtype) {
    throw new Sk.builtin.NotImplementedError(
      "eye is not yet implemented");
  });

  /* not implemented methods */
  mod.ones_like = new Sk.builtin.func(function () {
    throw new Sk.builtin.NotImplementedError(
      "ones_like is not yet implemented");
  });
  mod.empty_like = new Sk.builtin.func(function () {
    throw new Sk.builtin.NotImplementedError(
      "empty_like is not yet implemented");
  });
  mod.ones_like = new Sk.builtin.func(function () {
    throw new Sk.builtin.NotImplementedError(
      "ones_like is not yet implemented");
  });
  mod.arctan2 = new Sk.builtin.func(function () {
    throw new Sk.builtin.NotImplementedError(
      "arctan2 is not yet implemented");
  });
  mod.asarray = new Sk.builtin.func(array_f);
  return mod;
};
