(function() {
    function Kb(a) {
        return a && a.__esModule ? {
            d: a.default
        } : {
            d: a
        }
    }
    function Gc(name) {
        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err
    }
    var Hc = this;
    var Lb = {};
    var ma = {};
    var te, Mb, ha = {};
    !function(e, t) {
        "object" == typeof ha ? ha = t(function() {
            try {
                return Gc("poly-decomp")
            } catch (e) {}
        }()) : "function" == typeof Mb && Mb.amd ? Mb("Matter", ["poly-decomp"], t) : "object" == typeof ha ? (te = t(function() {
            try {
                return Gc("poly-decomp")
            } catch (e) {}
        }()),
        ha.Matter = te) : e.Matter = t(e.decomp)
    }(ha, function(e) {
        return function(e) {
            var t = {};
            function n(i) {
                if (t[i])
                    return t[i].exports;
                var o = t[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return e[i].call(o.exports, o, o.exports, n),
                o.l = !0,
                o.exports
            }
            return n.m = e,
            n.c = t,
            n.d = function(e, t, i) {
                n.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: i
                })
            }
            ,
            n.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }
            ,
            n.t = function(e, t) {
                if (1 & t && (e = n(e)),
                8 & t)
                    return e;
                if (4 & t && "object" == typeof e && e && e.__esModule)
                    return e;
                var i = Object.create(null);
                if (n.r(i),
                Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: e
                }),
                2 & t && "string" != typeof e)
                    for (var o in e)
                        n.d(i, o, function(t) {
                            return e[t]
                        }
                        .bind(null, o));
                return i
            }
            ,
            n.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default
                }
                : function() {
                    return e
                }
                ;
                return n.d(t, "a", t),
                t
            }
            ,
            n.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            ,
            n.p = "",
            n(n.s = 24)
        }([function(e, t) {
            var n = {};
            e.exports = n,
            function() {
                n._nextId = 0,
                n._seed = 0,
                n._nowStartTime = +new Date,
                n.extend = function(e, t) {
                    var i, o;
                    "boolean" == typeof t ? (i = 2,
                    o = t) : (i = 1,
                    o = !0);
                    for (var r = i; r < arguments.length; r++) {
                        var s = arguments[r];
                        if (s)
                            for (var a in s)
                                o && s[a] && s[a].constructor === Object ? e[a] && e[a].constructor !== Object ? e[a] = s[a] : (e[a] = e[a] || {},
                                n.extend(e[a], o, s[a])) : e[a] = s[a]
                    }
                    return e
                }
                ,
                n.clone = function(e, t) {
                    return n.extend({}, t, e)
                }
                ,
                n.keys = function(e) {
                    if (Object.keys)
                        return Object.keys(e);
                    var t = [];
                    for (var n in e)
                        t.push(n);
                    return t
                }
                ,
                n.values = function(e) {
                    var t = [];
                    if (Object.keys) {
                        for (var n = Object.keys(e), i = 0; i < n.length; i++)
                            t.push(e[n[i]]);
                        return t
                    }
                    for (var o in e)
                        t.push(e[o]);
                    return t
                }
                ,
                n.get = function(e, t, n, i) {
                    t = t.split(".").slice(n, i);
                    for (var o = 0; o < t.length; o += 1)
                        e = e[t[o]];
                    return e
                }
                ,
                n.set = function(e, t, i, o, r) {
                    var s = t.split(".").slice(o, r);
                    return n.get(e, t, 0, -1)[s[s.length - 1]] = i,
                    i
                }
                ,
                n.shuffle = function(e) {
                    for (var t = e.length - 1; t > 0; t--) {
                        var i = Math.floor(n.random() * (t + 1))
                          , o = e[t];
                        e[t] = e[i],
                        e[i] = o
                    }
                    return e
                }
                ,
                n.choose = function(e) {
                    return e[Math.floor(n.random() * e.length)]
                }
                ,
                n.isElement = function(e) {
                    return "undefined" != typeof HTMLElement ? e instanceof HTMLElement : !!(e && e.nodeType && e.nodeName)
                }
                ,
                n.isArray = function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                ,
                n.isFunction = function(e) {
                    return "function" == typeof e
                }
                ,
                n.isPlainObject = function(e) {
                    return "object" == typeof e && e.constructor === Object
                }
                ,
                n.isString = function(e) {
                    return "[object String]" === toString.call(e)
                }
                ,
                n.clamp = function(e, t, n) {
                    return e < t ? t : e > n ? n : e
                }
                ,
                n.sign = function(e) {
                    return e < 0 ? -1 : 1
                }
                ,
                n.now = function() {
                    if ("undefined" != typeof window && window.performance) {
                        if (window.performance.now)
                            return window.performance.now();
                        if (window.performance.webkitNow)
                            return window.performance.webkitNow()
                    }
                    return new Date - n._nowStartTime
                }
                ,
                n.random = function(t, n) {
                    return n = void 0 !== n ? n : 1,
                    (t = void 0 !== t ? t : 0) + e() * (n - t)
                }
                ;
                var e = function() {
                    return n._seed = (9301 * n._seed + 49297) % 233280,
                    n._seed / 233280
                };
                n.colorToNumber = function(e) {
                    return 3 == (e = e.replace("#", "")).length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2)),
                    parseInt(e, 16)
                }
                ,
                n.logLevel = 1,
                n.log = function() {
                    console && n.logLevel > 0 && n.logLevel <= 3 && console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                }
                ,
                n.info = function() {
                    console && n.logLevel > 0 && n.logLevel <= 2 && console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                }
                ,
                n.warn = function() {
                    console && n.logLevel > 0 && n.logLevel <= 3 && console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                }
                ,
                n.nextId = function() {
                    return n._nextId++
                }
                ,
                n.indexOf = function(e, t) {
                    if (e.indexOf)
                        return e.indexOf(t);
                    for (var n = 0; n < e.length; n++)
                        if (e[n] === t)
                            return n;
                    return -1
                }
                ,
                n.map = function(e, t) {
                    if (e.map)
                        return e.map(t);
                    for (var n = [], i = 0; i < e.length; i += 1)
                        n.push(t(e[i]));
                    return n
                }
                ,
                n.topologicalSort = function(e) {
                    var t = []
                      , i = []
                      , o = [];
                    for (var r in e)
                        i[r] || o[r] || n._topologicalSort(r, i, o, e, t);
                    return t
                }
                ,
                n._topologicalSort = function(e, t, i, o, r) {
                    var s = o[e] || [];
                    i[e] = !0;
                    for (var a = 0; a < s.length; a += 1) {
                        var l = s[a];
                        i[l] || t[l] || n._topologicalSort(l, t, i, o, r)
                    }
                    i[e] = !1,
                    t[e] = !0,
                    r.push(e)
                }
                ,
                n.chain = function() {
                    for (var e = [], t = 0; t < arguments.length; t += 1) {
                        var n = arguments[t];
                        n._chained ? e.push.apply(e, n._chained) : e.push(n)
                    }
                    var i = function() {
                        for (var t, n = new Array(arguments.length), i = 0, o = arguments.length; i < o; i++)
                            n[i] = arguments[i];
                        for (i = 0; i < e.length; i += 1) {
                            var r = e[i].apply(t, n);
                            void 0 !== r && (t = r)
                        }
                        return t
                    };
                    return i._chained = e,
                    i
                }
                ,
                n.chainPathBefore = function(e, t, i) {
                    return n.set(e, t, n.chain(i, n.get(e, t)))
                }
                ,
                n.chainPathAfter = function(e, t, i) {
                    return n.set(e, t, n.chain(n.get(e, t), i))
                }
            }()
        }
        , function(e, t) {
            var n = {};
            e.exports = n,
            n.create = function(e) {
                var t = {
                    min: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    }
                };
                return e && n.update(t, e),
                t
            }
            ,
            n.update = function(e, t, n) {
                e.min.x = 1 / 0,
                e.max.x = -1 / 0,
                e.min.y = 1 / 0,
                e.max.y = -1 / 0;
                for (var i = 0; i < t.length; i++) {
                    var o = t[i];
                    o.x > e.max.x && (e.max.x = o.x),
                    o.x < e.min.x && (e.min.x = o.x),
                    o.y > e.max.y && (e.max.y = o.y),
                    o.y < e.min.y && (e.min.y = o.y)
                }
                n && (n.x > 0 ? e.max.x += n.x : e.min.x += n.x,
                n.y > 0 ? e.max.y += n.y : e.min.y += n.y)
            }
            ,
            n.contains = function(e, t) {
                return t.x >= e.min.x && t.x <= e.max.x && t.y >= e.min.y && t.y <= e.max.y
            }
            ,
            n.overlaps = function(e, t) {
                return e.min.x <= t.max.x && e.max.x >= t.min.x && e.max.y >= t.min.y && e.min.y <= t.max.y
            }
            ,
            n.translate = function(e, t) {
                e.min.x += t.x,
                e.max.x += t.x,
                e.min.y += t.y,
                e.max.y += t.y
            }
            ,
            n.shift = function(e, t) {
                var n = e.max.x - e.min.x
                  , i = e.max.y - e.min.y;
                e.min.x = t.x,
                e.max.x = t.x + n,
                e.min.y = t.y,
                e.max.y = t.y + i
            }
        }
        , function(e, t) {
            var n = {};
            e.exports = n,
            n.create = function(e, t) {
                return {
                    x: e || 0,
                    y: t || 0
                }
            }
            ,
            n.clone = function(e) {
                return {
                    x: e.x,
                    y: e.y
                }
            }
            ,
            n.magnitude = function(e) {
                return Math.sqrt(e.x * e.x + e.y * e.y)
            }
            ,
            n.magnitudeSquared = function(e) {
                return e.x * e.x + e.y * e.y
            }
            ,
            n.rotate = function(e, t, n) {
                var i = Math.cos(t)
                  , o = Math.sin(t);
                n || (n = {});
                var r = e.x * i - e.y * o;
                return n.y = e.x * o + e.y * i,
                n.x = r,
                n
            }
            ,
            n.rotateAbout = function(e, t, n, i) {
                var o = Math.cos(t)
                  , r = Math.sin(t);
                i || (i = {});
                var s = n.x + ((e.x - n.x) * o - (e.y - n.y) * r);
                return i.y = n.y + ((e.x - n.x) * r + (e.y - n.y) * o),
                i.x = s,
                i
            }
            ,
            n.normalise = function(e) {
                var t = n.magnitude(e);
                return 0 === t ? {
                    x: 0,
                    y: 0
                } : {
                    x: e.x / t,
                    y: e.y / t
                }
            }
            ,
            n.dot = function(e, t) {
                return e.x * t.x + e.y * t.y
            }
            ,
            n.cross = function(e, t) {
                return e.x * t.y - e.y * t.x
            }
            ,
            n.cross3 = function(e, t, n) {
                return (t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x)
            }
            ,
            n.add = function(e, t, n) {
                return n || (n = {}),
                n.x = e.x + t.x,
                n.y = e.y + t.y,
                n
            }
            ,
            n.sub = function(e, t, n) {
                return n || (n = {}),
                n.x = e.x - t.x,
                n.y = e.y - t.y,
                n
            }
            ,
            n.mult = function(e, t) {
                return {
                    x: e.x * t,
                    y: e.y * t
                }
            }
            ,
            n.div = function(e, t) {
                return {
                    x: e.x / t,
                    y: e.y / t
                }
            }
            ,
            n.perp = function(e, t) {
                return {
                    x: (t = !0 === t ? -1 : 1) * -e.y,
                    y: t * e.x
                }
            }
            ,
            n.neg = function(e) {
                return {
                    x: -e.x,
                    y: -e.y
                }
            }
            ,
            n.angle = function(e, t) {
                return Math.atan2(t.y - e.y, t.x - e.x)
            }
            ,
            n._temp = [n.create(), n.create(), n.create(), n.create(), n.create(), n.create()]
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(2)
              , r = n(0);
            i.create = function(e, t) {
                for (var n = [], i = 0; i < e.length; i++) {
                    var o = e[i]
                      , r = {
                        x: o.x,
                        y: o.y,
                        index: i,
                        body: t,
                        isInternal: !1
                    };
                    n.push(r)
                }
                return n
            }
            ,
            i.fromPath = function(e, t) {
                var n = [];
                return e.replace(/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/gi, function(e, t, i) {
                    n.push({
                        x: parseFloat(t),
                        y: parseFloat(i)
                    })
                }),
                i.create(n, t)
            }
            ,
            i.centre = function(e) {
                for (var t, n, r, s = i.area(e, !0), a = {
                    x: 0,
                    y: 0
                }, l = 0; l < e.length; l++)
                    r = (l + 1) % e.length,
                    t = o.cross(e[l], e[r]),
                    n = o.mult(o.add(e[l], e[r]), t),
                    a = o.add(a, n);
                return o.div(a, 6 * s)
            }
            ,
            i.mean = function(e) {
                for (var t = {
                    x: 0,
                    y: 0
                }, n = 0; n < e.length; n++)
                    t.x += e[n].x,
                    t.y += e[n].y;
                return o.div(t, e.length)
            }
            ,
            i.area = function(e, t) {
                for (var n = 0, i = e.length - 1, o = 0; o < e.length; o++)
                    n += (e[i].x - e[o].x) * (e[i].y + e[o].y),
                    i = o;
                return t ? n / 2 : Math.abs(n) / 2
            }
            ,
            i.inertia = function(e, t) {
                for (var n, i, r = 0, s = 0, a = e, l = 0; l < a.length; l++)
                    i = (l + 1) % a.length,
                    r += (n = Math.abs(o.cross(a[i], a[l]))) * (o.dot(a[i], a[i]) + o.dot(a[i], a[l]) + o.dot(a[l], a[l])),
                    s += n;
                return t / 6 * (r / s)
            }
            ,
            i.translate = function(e, t, n) {
                var i;
                if (n)
                    for (i = 0; i < e.length; i++)
                        e[i].x += t.x * n,
                        e[i].y += t.y * n;
                else
                    for (i = 0; i < e.length; i++)
                        e[i].x += t.x,
                        e[i].y += t.y;
                return e
            }
            ,
            i.rotate = function(e, t, n) {
                if (0 !== t) {
                    for (var i = Math.cos(t), o = Math.sin(t), r = 0; r < e.length; r++) {
                        var s = e[r]
                          , a = s.x - n.x
                          , l = s.y - n.y;
                        s.x = n.x + (a * i - l * o),
                        s.y = n.y + (a * o + l * i)
                    }
                    return e
                }
            }
            ,
            i.contains = function(e, t) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n]
                      , o = e[(n + 1) % e.length];
                    if ((t.x - i.x) * (o.y - i.y) + (t.y - i.y) * (i.x - o.x) > 0)
                        return !1
                }
                return !0
            }
            ,
            i.scale = function(e, t, n, r) {
                if (1 === t && 1 === n)
                    return e;
                var s, a;
                r = r || i.centre(e);
                for (var l = 0; l < e.length; l++)
                    s = e[l],
                    a = o.sub(s, r),
                    e[l].x = r.x + a.x * t,
                    e[l].y = r.y + a.y * n;
                return e
            }
            ,
            i.chamfer = function(e, t, n, i, s) {
                t = "number" == typeof t ? [t] : t || [8],
                n = void 0 !== n ? n : -1,
                i = i || 2,
                s = s || 14;
                for (var a = [], l = 0; l < e.length; l++) {
                    var c = e[l - 1 >= 0 ? l - 1 : e.length - 1]
                      , d = e[l]
                      , u = e[(l + 1) % e.length]
                      , p = t[l < t.length ? l : t.length - 1];
                    if (0 !== p) {
                        var f = o.normalise({
                            x: d.y - c.y,
                            y: c.x - d.x
                        })
                          , v = o.normalise({
                            x: u.y - d.y,
                            y: d.x - u.x
                        })
                          , m = Math.sqrt(2 * Math.pow(p, 2))
                          , y = o.mult(r.clone(f), p)
                          , g = o.normalise(o.mult(o.add(f, v), .5))
                          , x = o.sub(d, o.mult(g, m))
                          , h = n;
                        -1 === n && (h = 1.75 * Math.pow(p, .32)),
                        (h = r.clamp(h, i, s)) % 2 == 1 && (h += 1);
                        for (var b = Math.acos(o.dot(f, v)) / h, w = 0; w < h; w++)
                            a.push(o.add(o.rotate(y, b * w), x))
                    } else
                        a.push(d)
                }
                return a
            }
            ,
            i.clockwiseSort = function(e) {
                var t = i.mean(e);
                return e.sort(function(e, n) {
                    return o.angle(t, e) - o.angle(t, n)
                }),
                e
            }
            ,
            i.isConvex = function(e) {
                var t, n, i, o, r = 0, s = e.length;
                if (s < 3)
                    return null;
                for (t = 0; t < s; t++)
                    if (i = (t + 2) % s,
                    o = (e[n = (t + 1) % s].x - e[t].x) * (e[i].y - e[n].y),
                    (o -= (e[n].y - e[t].y) * (e[i].x - e[n].x)) < 0 ? r |= 1 : o > 0 && (r |= 2),
                    3 === r)
                        return !1;
                return 0 !== r || null
            }
            ,
            i.hull = function(e) {
                var t, n, i = [], r = [];
                for ((e = e.slice(0)).sort(function(e, t) {
                    var n = e.x - t.x;
                    return 0 !== n ? n : e.y - t.y
                }),
                n = 0; n < e.length; n += 1) {
                    for (t = e[n]; r.length >= 2 && o.cross3(r[r.length - 2], r[r.length - 1], t) <= 0; )
                        r.pop();
                    r.push(t)
                }
                for (n = e.length - 1; n >= 0; n -= 1) {
                    for (t = e[n]; i.length >= 2 && o.cross3(i[i.length - 2], i[i.length - 1], t) <= 0; )
                        i.pop();
                    i.push(t)
                }
                return i.pop(),
                r.pop(),
                i.concat(r)
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(0);
            i.on = function(e, t, n) {
                for (var i, o = t.split(" "), r = 0; r < o.length; r++)
                    i = o[r],
                    e.events = e.events || {},
                    e.events[i] = e.events[i] || [],
                    e.events[i].push(n);
                return n
            }
            ,
            i.off = function(e, t, n) {
                if (t) {
                    "function" == typeof t && (n = t,
                    t = o.keys(e.events).join(" "));
                    for (var i = t.split(" "), r = 0; r < i.length; r++) {
                        var s = e.events[i[r]]
                          , a = [];
                        if (n && s)
                            for (var l = 0; l < s.length; l++)
                                s[l] !== n && a.push(s[l]);
                        e.events[i[r]] = a
                    }
                } else
                    e.events = {}
            }
            ,
            i.trigger = function(e, t, n) {
                var i, r, s, a, l = e.events;
                if (l && o.keys(l).length > 0) {
                    n || (n = {}),
                    i = t.split(" ");
                    for (var c = 0; c < i.length; c++)
                        if (s = l[r = i[c]]) {
                            (a = o.clone(n, !1)).name = r,
                            a.source = e;
                            for (var d = 0; d < s.length; d++)
                                s[d].apply(e, [a])
                        }
                }
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(4)
              , r = n(0)
              , s = n(1)
              , a = n(6);
            i.create = function(e) {
                return r.extend({
                    id: r.nextId(),
                    type: "composite",
                    parent: null,
                    isModified: !1,
                    bodies: [],
                    constraints: [],
                    composites: [],
                    label: "Composite",
                    plugin: {}
                }, e)
            }
            ,
            i.setModified = function(e, t, n, o) {
                if (e.isModified = t,
                n && e.parent && i.setModified(e.parent, t, n, o),
                o)
                    for (var r = 0; r < e.composites.length; r++) {
                        var s = e.composites[r];
                        i.setModified(s, t, n, o)
                    }
            }
            ,
            i.add = function(e, t) {
                var n = [].concat(t);
                o.trigger(e, "beforeAdd", {
                    object: t
                });
                for (var s = 0; s < n.length; s++) {
                    var a = n[s];
                    switch (a.type) {
                    case "body":
                        if (a.parent !== a) {
                            r.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                            break
                        }
                        i.addBody(e, a);
                        break;
                    case "constraint":
                        i.addConstraint(e, a);
                        break;
                    case "composite":
                        i.addComposite(e, a);
                        break;
                    case "mouseConstraint":
                        i.addConstraint(e, a.constraint);
                    }
                }
                return o.trigger(e, "afterAdd", {
                    object: t
                }),
                e
            }
            ,
            i.remove = function(e, t, n) {
                var r = [].concat(t);
                o.trigger(e, "beforeRemove", {
                    object: t
                });
                for (var s = 0; s < r.length; s++) {
                    var a = r[s];
                    switch (a.type) {
                    case "body":
                        i.removeBody(e, a, n);
                        break;
                    case "constraint":
                        i.removeConstraint(e, a, n);
                        break;
                    case "composite":
                        i.removeComposite(e, a, n);
                        break;
                    case "mouseConstraint":
                        i.removeConstraint(e, a.constraint);
                    }
                }
                return o.trigger(e, "afterRemove", {
                    object: t
                }),
                e
            }
            ,
            i.addComposite = function(e, t) {
                return e.composites.push(t),
                t.parent = e,
                i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.removeComposite = function(e, t, n) {
                var o = r.indexOf(e.composites, t);
                if (-1 !== o && (i.removeCompositeAt(e, o),
                i.setModified(e, !0, !0, !1)),
                n)
                    for (var s = 0; s < e.composites.length; s++)
                        i.removeComposite(e.composites[s], t, !0);
                return e
            }
            ,
            i.removeCompositeAt = function(e, t) {
                return e.composites.splice(t, 1),
                i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.addBody = function(e, t) {
                return e.bodies.push(t),
                i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.removeBody = function(e, t, n) {
                var o = r.indexOf(e.bodies, t);
                if (-1 !== o && (i.removeBodyAt(e, o),
                i.setModified(e, !0, !0, !1)),
                n)
                    for (var s = 0; s < e.composites.length; s++)
                        i.removeBody(e.composites[s], t, !0);
                return e
            }
            ,
            i.removeBodyAt = function(e, t) {
                return e.bodies.splice(t, 1),
                i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.addConstraint = function(e, t) {
                return e.constraints.push(t),
                i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.removeConstraint = function(e, t, n) {
                var o = r.indexOf(e.constraints, t);
                if (-1 !== o && i.removeConstraintAt(e, o),
                n)
                    for (var s = 0; s < e.composites.length; s++)
                        i.removeConstraint(e.composites[s], t, !0);
                return e
            }
            ,
            i.removeConstraintAt = function(e, t) {
                return e.constraints.splice(t, 1),
                i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.clear = function(e, t, n) {
                if (n)
                    for (var o = 0; o < e.composites.length; o++)
                        i.clear(e.composites[o], t, !0);
                return t ? e.bodies = e.bodies.filter(function(e) {
                    return e.isStatic
                }) : e.bodies.length = 0,
                e.constraints.length = 0,
                e.composites.length = 0,
                i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.allBodies = function(e) {
                for (var t = [].concat(e.bodies), n = 0; n < e.composites.length; n++)
                    t = t.concat(i.allBodies(e.composites[n]));
                return t
            }
            ,
            i.allConstraints = function(e) {
                for (var t = [].concat(e.constraints), n = 0; n < e.composites.length; n++)
                    t = t.concat(i.allConstraints(e.composites[n]));
                return t
            }
            ,
            i.allComposites = function(e) {
                for (var t = [].concat(e.composites), n = 0; n < e.composites.length; n++)
                    t = t.concat(i.allComposites(e.composites[n]));
                return t
            }
            ,
            i.get = function(e, t, n) {
                var o, r;
                switch (n) {
                case "body":
                    o = i.allBodies(e);
                    break;
                case "constraint":
                    o = i.allConstraints(e);
                    break;
                case "composite":
                    o = i.allComposites(e).concat(e);
                }
                return o ? 0 === (r = o.filter(function(e) {
                    return e.id.toString() === t.toString()
                })).length ? null : r[0] : null
            }
            ,
            i.move = function(e, t, n) {
                return i.remove(e, t),
                i.add(n, t),
                e
            }
            ,
            i.rebase = function(e) {
                for (var t = i.allBodies(e).concat(i.allConstraints(e)).concat(i.allComposites(e)), n = 0; n < t.length; n++)
                    t[n].id = r.nextId();
                return i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.translate = function(e, t, n) {
                for (var o = n ? i.allBodies(e) : e.bodies, r = 0; r < o.length; r++)
                    a.translate(o[r], t);
                return i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.rotate = function(e, t, n, o) {
                for (var r = Math.cos(t), s = Math.sin(t), l = o ? i.allBodies(e) : e.bodies, c = 0; c < l.length; c++) {
                    var d = l[c]
                      , u = d.position.x - n.x
                      , p = d.position.y - n.y;
                    a.setPosition(d, {
                        x: n.x + (u * r - p * s),
                        y: n.y + (u * s + p * r)
                    }),
                    a.rotate(d, t)
                }
                return i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.scale = function(e, t, n, o, r) {
                for (var s = r ? i.allBodies(e) : e.bodies, l = 0; l < s.length; l++) {
                    var c = s[l]
                      , d = c.position.x - o.x
                      , u = c.position.y - o.y;
                    a.setPosition(c, {
                        x: o.x + d * t,
                        y: o.y + u * n
                    }),
                    a.scale(c, t, n)
                }
                return i.setModified(e, !0, !0, !1),
                e
            }
            ,
            i.bounds = function(e) {
                for (var t = i.allBodies(e), n = [], o = 0; o < t.length; o += 1) {
                    var r = t[o];
                    n.push(r.bounds.min, r.bounds.max)
                }
                return s.create(n)
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(3)
              , r = n(2)
              , s = n(7)
              , a = (n(10),
            n(0))
              , l = n(1)
              , c = n(15);
            !function() {
                i._inertiaScale = 4,
                i._nextCollidingGroupId = 1,
                i._nextNonCollidingGroupId = -1,
                i._nextCategory = 1,
                i.create = function(t) {
                    var n = {
                        id: a.nextId(),
                        type: "body",
                        label: "Body",
                        parts: [],
                        plugin: {},
                        angle: 0,
                        vertices: o.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
                        position: {
                            x: 0,
                            y: 0
                        },
                        force: {
                            x: 0,
                            y: 0
                        },
                        torque: 0,
                        positionImpulse: {
                            x: 0,
                            y: 0
                        },
                        constraintImpulse: {
                            x: 0,
                            y: 0,
                            angle: 0
                        },
                        totalContacts: 0,
                        speed: 0,
                        angularSpeed: 0,
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        angularVelocity: 0,
                        isSensor: !1,
                        isStatic: !1,
                        isSleeping: !1,
                        motion: 0,
                        sleepThreshold: 60,
                        density: .001,
                        restitution: 0,
                        friction: .1,
                        frictionStatic: .5,
                        frictionAir: .01,
                        collisionFilter: {
                            category: 1,
                            mask: 4294967295,
                            group: 0
                        },
                        slop: .05,
                        timeScale: 1,
                        render: {
                            visible: !0,
                            opacity: 1,
                            strokeStyle: null,
                            fillStyle: null,
                            lineWidth: null,
                            sprite: {
                                xScale: 1,
                                yScale: 1,
                                xOffset: 0,
                                yOffset: 0
                            }
                        },
                        events: null,
                        bounds: null,
                        chamfer: null,
                        circleRadius: 0,
                        positionPrev: null,
                        anglePrev: 0,
                        parent: null,
                        axes: null,
                        area: 0,
                        mass: 0,
                        inertia: 0,
                        _original: null
                    }
                      , i = a.extend(n, t);
                    return e(i, t),
                    i
                }
                ,
                i.nextGroup = function(e) {
                    return e ? i._nextNonCollidingGroupId-- : i._nextCollidingGroupId++
                }
                ,
                i.nextCategory = function() {
                    return i._nextCategory = i._nextCategory << 1,
                    i._nextCategory
                }
                ;
                var e = function(e, t) {
                    t = t || {},
                    i.set(e, {
                        bounds: e.bounds || l.create(e.vertices),
                        positionPrev: e.positionPrev || r.clone(e.position),
                        anglePrev: e.anglePrev || e.angle,
                        vertices: e.vertices,
                        parts: e.parts || [e],
                        isStatic: e.isStatic,
                        isSleeping: e.isSleeping,
                        parent: e.parent || e
                    }),
                    o.rotate(e.vertices, e.angle, e.position),
                    c.rotate(e.axes, e.angle),
                    l.update(e.bounds, e.vertices, e.velocity),
                    i.set(e, {
                        axes: t.axes || e.axes,
                        area: t.area || e.area,
                        mass: t.mass || e.mass,
                        inertia: t.inertia || e.inertia
                    });
                    var n = e.isStatic ? "#14151f" : a.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"])
                      , s = e.isStatic ? "#555" : "#ccc"
                      , d = e.isStatic && null === e.render.fillStyle ? 1 : 0;
                    e.render.fillStyle = e.render.fillStyle || n,
                    e.render.strokeStyle = e.render.strokeStyle || s,
                    e.render.lineWidth = e.render.lineWidth || d,
                    e.render.sprite.xOffset += -(e.bounds.min.x - e.position.x) / (e.bounds.max.x - e.bounds.min.x),
                    e.render.sprite.yOffset += -(e.bounds.min.y - e.position.y) / (e.bounds.max.y - e.bounds.min.y)
                };
                i.set = function(e, t, n) {
                    var o;
                    for (o in "string" == typeof t && (o = t,
                    (t = {})[o] = n),
                    t)
                        if (Object.prototype.hasOwnProperty.call(t, o))
                            switch (n = t[o],
                            o) {
                            case "isStatic":
                                i.setStatic(e, n);
                                break;
                            case "isSleeping":
                                s.set(e, n);
                                break;
                            case "mass":
                                i.setMass(e, n);
                                break;
                            case "density":
                                i.setDensity(e, n);
                                break;
                            case "inertia":
                                i.setInertia(e, n);
                                break;
                            case "vertices":
                                i.setVertices(e, n);
                                break;
                            case "position":
                                i.setPosition(e, n);
                                break;
                            case "angle":
                                i.setAngle(e, n);
                                break;
                            case "velocity":
                                i.setVelocity(e, n);
                                break;
                            case "angularVelocity":
                                i.setAngularVelocity(e, n);
                                break;
                            case "parts":
                                i.setParts(e, n);
                                break;
                            case "centre":
                                i.setCentre(e, n);
                                break;
                            default:
                                e[o] = n;
                            }
                }
                ,
                i.setStatic = function(e, t) {
                    for (var n = 0; n < e.parts.length; n++) {
                        var i = e.parts[n];
                        i.isStatic = t,
                        t ? (i._original = {
                            restitution: i.restitution,
                            friction: i.friction,
                            mass: i.mass,
                            inertia: i.inertia,
                            density: i.density,
                            inverseMass: i.inverseMass,
                            inverseInertia: i.inverseInertia
                        },
                        i.restitution = 0,
                        i.friction = 1,
                        i.mass = i.inertia = i.density = 1 / 0,
                        i.inverseMass = i.inverseInertia = 0,
                        i.positionPrev.x = i.position.x,
                        i.positionPrev.y = i.position.y,
                        i.anglePrev = i.angle,
                        i.angularVelocity = 0,
                        i.speed = 0,
                        i.angularSpeed = 0,
                        i.motion = 0) : i._original && (i.restitution = i._original.restitution,
                        i.friction = i._original.friction,
                        i.mass = i._original.mass,
                        i.inertia = i._original.inertia,
                        i.density = i._original.density,
                        i.inverseMass = i._original.inverseMass,
                        i.inverseInertia = i._original.inverseInertia,
                        i._original = null)
                    }
                }
                ,
                i.setMass = function(e, t) {
                    var n = e.inertia / (e.mass / 6);
                    e.inertia = n * (t / 6),
                    e.inverseInertia = 1 / e.inertia,
                    e.mass = t,
                    e.inverseMass = 1 / e.mass,
                    e.density = e.mass / e.area
                }
                ,
                i.setDensity = function(e, t) {
                    i.setMass(e, t * e.area),
                    e.density = t
                }
                ,
                i.setInertia = function(e, t) {
                    e.inertia = t,
                    e.inverseInertia = 1 / e.inertia
                }
                ,
                i.setVertices = function(e, t) {
                    t[0].body === e ? e.vertices = t : e.vertices = o.create(t, e),
                    e.axes = c.fromVertices(e.vertices),
                    e.area = o.area(e.vertices),
                    i.setMass(e, e.density * e.area);
                    var n = o.centre(e.vertices);
                    o.translate(e.vertices, n, -1),
                    i.setInertia(e, i._inertiaScale * o.inertia(e.vertices, e.mass)),
                    o.translate(e.vertices, e.position),
                    l.update(e.bounds, e.vertices, e.velocity)
                }
                ,
                i.setParts = function(e, t, n) {
                    var r;
                    for (t = t.slice(0),
                    e.parts.length = 0,
                    e.parts.push(e),
                    e.parent = e,
                    r = 0; r < t.length; r++) {
                        var s = t[r];
                        s !== e && (s.parent = e,
                        e.parts.push(s))
                    }
                    if (1 !== e.parts.length) {
                        if (n = void 0 === n || n) {
                            var a = [];
                            for (r = 0; r < t.length; r++)
                                a = a.concat(t[r].vertices);
                            o.clockwiseSort(a);
                            var l = o.hull(a)
                              , c = o.centre(l);
                            i.setVertices(e, l),
                            o.translate(e.vertices, c)
                        }
                        var d = i._totalProperties(e);
                        e.area = d.area,
                        e.parent = e,
                        e.position.x = d.centre.x,
                        e.position.y = d.centre.y,
                        e.positionPrev.x = d.centre.x,
                        e.positionPrev.y = d.centre.y,
                        i.setMass(e, d.mass),
                        i.setInertia(e, d.inertia),
                        i.setPosition(e, d.centre)
                    }
                }
                ,
                i.setCentre = function(e, t, n) {
                    n ? (e.positionPrev.x += t.x,
                    e.positionPrev.y += t.y,
                    e.position.x += t.x,
                    e.position.y += t.y) : (e.positionPrev.x = t.x - (e.position.x - e.positionPrev.x),
                    e.positionPrev.y = t.y - (e.position.y - e.positionPrev.y),
                    e.position.x = t.x,
                    e.position.y = t.y)
                }
                ,
                i.setPosition = function(e, t) {
                    var n = r.sub(t, e.position);
                    e.positionPrev.x += n.x,
                    e.positionPrev.y += n.y;
                    for (var i = 0; i < e.parts.length; i++) {
                        var s = e.parts[i];
                        s.position.x += n.x,
                        s.position.y += n.y,
                        o.translate(s.vertices, n),
                        l.update(s.bounds, s.vertices, e.velocity)
                    }
                }
                ,
                i.setAngle = function(e, t) {
                    var n = t - e.angle;
                    e.anglePrev += n;
                    for (var i = 0; i < e.parts.length; i++) {
                        var s = e.parts[i];
                        s.angle += n,
                        o.rotate(s.vertices, n, e.position),
                        c.rotate(s.axes, n),
                        l.update(s.bounds, s.vertices, e.velocity),
                        i > 0 && r.rotateAbout(s.position, n, e.position, s.position)
                    }
                }
                ,
                i.setVelocity = function(e, t) {
                    e.positionPrev.x = e.position.x - t.x,
                    e.positionPrev.y = e.position.y - t.y,
                    e.velocity.x = t.x,
                    e.velocity.y = t.y,
                    e.speed = r.magnitude(e.velocity)
                }
                ,
                i.setAngularVelocity = function(e, t) {
                    e.anglePrev = e.angle - t,
                    e.angularVelocity = t,
                    e.angularSpeed = Math.abs(e.angularVelocity)
                }
                ,
                i.translate = function(e, t) {
                    i.setPosition(e, r.add(e.position, t))
                }
                ,
                i.rotate = function(e, t, n) {
                    if (n) {
                        var o = Math.cos(t)
                          , r = Math.sin(t)
                          , s = e.position.x - n.x
                          , a = e.position.y - n.y;
                        i.setPosition(e, {
                            x: n.x + (s * o - a * r),
                            y: n.y + (s * r + a * o)
                        }),
                        i.setAngle(e, e.angle + t)
                    } else
                        i.setAngle(e, e.angle + t)
                }
                ,
                i.scale = function(e, t, n, r) {
                    var s = 0
                      , a = 0;
                    r = r || e.position;
                    for (var d = 0; d < e.parts.length; d++) {
                        var u = e.parts[d];
                        o.scale(u.vertices, t, n, r),
                        u.axes = c.fromVertices(u.vertices),
                        u.area = o.area(u.vertices),
                        i.setMass(u, e.density * u.area),
                        o.translate(u.vertices, {
                            x: -u.position.x,
                            y: -u.position.y
                        }),
                        i.setInertia(u, i._inertiaScale * o.inertia(u.vertices, u.mass)),
                        o.translate(u.vertices, {
                            x: u.position.x,
                            y: u.position.y
                        }),
                        d > 0 && (s += u.area,
                        a += u.inertia),
                        u.position.x = r.x + (u.position.x - r.x) * t,
                        u.position.y = r.y + (u.position.y - r.y) * n,
                        l.update(u.bounds, u.vertices, e.velocity)
                    }
                    e.parts.length > 1 && (e.area = s,
                    e.isStatic || (i.setMass(e, e.density * s),
                    i.setInertia(e, a))),
                    e.circleRadius && (t === n ? e.circleRadius *= t : e.circleRadius = null)
                }
                ,
                i.update = function(e, t, n, i) {
                    var s = Math.pow(t * n * e.timeScale, 2)
                      , a = 1 - e.frictionAir * n * e.timeScale
                      , d = e.position.x - e.positionPrev.x
                      , u = e.position.y - e.positionPrev.y;
                    e.velocity.x = d * a * i + e.force.x / e.mass * s,
                    e.velocity.y = u * a * i + e.force.y / e.mass * s,
                    e.positionPrev.x = e.position.x,
                    e.positionPrev.y = e.position.y,
                    e.position.x += e.velocity.x,
                    e.position.y += e.velocity.y,
                    e.angularVelocity = (e.angle - e.anglePrev) * a * i + e.torque / e.inertia * s,
                    e.anglePrev = e.angle,
                    e.angle += e.angularVelocity,
                    e.speed = r.magnitude(e.velocity),
                    e.angularSpeed = Math.abs(e.angularVelocity);
                    for (var p = 0; p < e.parts.length; p++) {
                        var f = e.parts[p];
                        o.translate(f.vertices, e.velocity),
                        p > 0 && (f.position.x += e.velocity.x,
                        f.position.y += e.velocity.y),
                        0 !== e.angularVelocity && (o.rotate(f.vertices, e.angularVelocity, e.position),
                        c.rotate(f.axes, e.angularVelocity),
                        p > 0 && r.rotateAbout(f.position, e.angularVelocity, e.position, f.position)),
                        l.update(f.bounds, f.vertices, e.velocity)
                    }
                }
                ,
                i.applyForce = function(e, t, n) {
                    e.force.x += n.x,
                    e.force.y += n.y;
                    var i = t.x - e.position.x
                      , o = t.y - e.position.y;
                    e.torque += i * n.y - o * n.x
                }
                ,
                i._totalProperties = function(e) {
                    for (var t = {
                        mass: 0,
                        area: 0,
                        inertia: 0,
                        centre: {
                            x: 0,
                            y: 0
                        }
                    }, n = 1 === e.parts.length ? 0 : 1; n < e.parts.length; n++) {
                        var i = e.parts[n]
                          , o = i.mass !== 1 / 0 ? i.mass : 1;
                        t.mass += o,
                        t.area += i.area,
                        t.inertia += i.inertia,
                        t.centre = r.add(t.centre, r.mult(i.position, o))
                    }
                    return t.centre = r.div(t.centre, t.mass),
                    t
                }
            }()
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(4);
            i._motionWakeThreshold = .18,
            i._motionSleepThreshold = .08,
            i._minBias = .9,
            i.update = function(e, t) {
                for (var n = t * t * t, o = 0; o < e.length; o++) {
                    var r = e[o]
                      , s = r.speed * r.speed + r.angularSpeed * r.angularSpeed;
                    if (0 === r.force.x && 0 === r.force.y) {
                        var a = Math.min(r.motion, s)
                          , l = Math.max(r.motion, s);
                        r.motion = i._minBias * a + (1 - i._minBias) * l,
                        r.sleepThreshold > 0 && r.motion < i._motionSleepThreshold * n ? (r.sleepCounter += 1,
                        r.sleepCounter >= r.sleepThreshold && i.set(r, !0)) : r.sleepCounter > 0 && (r.sleepCounter -= 1)
                    } else
                        i.set(r, !1)
                }
            }
            ,
            i.afterCollisions = function(e, t) {
                for (var n = t * t * t, o = 0; o < e.length; o++) {
                    var r = e[o];
                    if (r.isActive) {
                        var s = r.collision
                          , a = s.bodyA.parent
                          , l = s.bodyB.parent;
                        if (!(a.isSleeping && l.isSleeping || a.isStatic || l.isStatic) && (a.isSleeping || l.isSleeping)) {
                            var c = a.isSleeping && !a.isStatic ? a : l
                              , d = c === a ? l : a;
                            !c.isStatic && d.motion > i._motionWakeThreshold * n && i.set(c, !1)
                        }
                    }
                }
            }
            ,
            i.set = function(e, t) {
                var n = e.isSleeping;
                t ? (e.isSleeping = !0,
                e.sleepCounter = e.sleepThreshold,
                e.positionImpulse.x = 0,
                e.positionImpulse.y = 0,
                e.positionPrev.x = e.position.x,
                e.positionPrev.y = e.position.y,
                e.anglePrev = e.angle,
                e.speed = 0,
                e.angularSpeed = 0,
                e.motion = 0,
                n || o.trigger(e, "sleepStart")) : (e.isSleeping = !1,
                e.sleepCounter = 0,
                n && o.trigger(e, "sleepEnd"))
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(3)
              , r = n(2)
              , s = n(7)
              , a = n(1)
              , l = n(15)
              , c = n(0);
            i._warming = .4,
            i._torqueDampen = 1,
            i._minLength = 1e-6,
            i.create = function(e) {
                var t = e;
                t.bodyA && !t.pointA && (t.pointA = {
                    x: 0,
                    y: 0
                }),
                t.bodyB && !t.pointB && (t.pointB = {
                    x: 0,
                    y: 0
                });
                var n = t.bodyA ? r.add(t.bodyA.position, t.pointA) : t.pointA
                  , i = t.bodyB ? r.add(t.bodyB.position, t.pointB) : t.pointB
                  , o = r.magnitude(r.sub(n, i));
                t.length = void 0 !== t.length ? t.length : o,
                t.id = t.id || c.nextId(),
                t.label = t.label || "Constraint",
                t.type = "constraint",
                t.stiffness = t.stiffness || (t.length > 0 ? 1 : .7),
                t.damping = t.damping || 0,
                t.angularStiffness = t.angularStiffness || 0,
                t.angleA = t.bodyA ? t.bodyA.angle : t.angleA,
                t.angleB = t.bodyB ? t.bodyB.angle : t.angleB,
                t.plugin = {};
                var s = {
                    visible: !0,
                    lineWidth: 2,
                    strokeStyle: "#ffffff",
                    type: "line",
                    anchors: !0
                };
                return 0 === t.length && t.stiffness > .1 ? (s.type = "pin",
                s.anchors = !1) : t.stiffness < .9 && (s.type = "spring"),
                t.render = c.extend(s, t.render),
                t
            }
            ,
            i.preSolveAll = function(e) {
                for (var t = 0; t < e.length; t += 1) {
                    var n = e[t]
                      , i = n.constraintImpulse;
                    n.isStatic || 0 === i.x && 0 === i.y && 0 === i.angle || (n.position.x += i.x,
                    n.position.y += i.y,
                    n.angle += i.angle)
                }
            }
            ,
            i.solveAll = function(e, t) {
                for (var n = 0; n < e.length; n += 1) {
                    var o = e[n]
                      , r = !o.bodyA || o.bodyA && o.bodyA.isStatic
                      , s = !o.bodyB || o.bodyB && o.bodyB.isStatic;
                    (r || s) && i.solve(e[n], t)
                }
                for (n = 0; n < e.length; n += 1)
                    r = !(o = e[n]).bodyA || o.bodyA && o.bodyA.isStatic,
                    s = !o.bodyB || o.bodyB && o.bodyB.isStatic,
                    r || s || i.solve(e[n], t)
            }
            ,
            i.solve = function(e, t) {
                var n = e.bodyA
                  , o = e.bodyB
                  , s = e.pointA
                  , a = e.pointB;
                if (n || o) {
                    n && !n.isStatic && (r.rotate(s, n.angle - e.angleA, s),
                    e.angleA = n.angle),
                    o && !o.isStatic && (r.rotate(a, o.angle - e.angleB, a),
                    e.angleB = o.angle);
                    var l = s
                      , c = a;
                    if (n && (l = r.add(n.position, s)),
                    o && (c = r.add(o.position, a)),
                    l && c) {
                        var d = r.sub(l, c)
                          , u = r.magnitude(d);
                        u < i._minLength && (u = i._minLength);
                        var p, f, v, m, y, g = (u - e.length) / u, x = e.stiffness < 1 ? e.stiffness * t : e.stiffness, h = r.mult(d, g * x), b = (n ? n.inverseMass : 0) + (o ? o.inverseMass : 0), w = b + ((n ? n.inverseInertia : 0) + (o ? o.inverseInertia : 0));
                        if (e.damping) {
                            var S = r.create();
                            v = r.div(d, u),
                            y = r.sub(o && r.sub(o.position, o.positionPrev) || S, n && r.sub(n.position, n.positionPrev) || S),
                            m = r.dot(v, y)
                        }
                        n && !n.isStatic && (f = n.inverseMass / b,
                        n.constraintImpulse.x -= h.x * f,
                        n.constraintImpulse.y -= h.y * f,
                        n.position.x -= h.x * f,
                        n.position.y -= h.y * f,
                        e.damping && (n.positionPrev.x -= e.damping * v.x * m * f,
                        n.positionPrev.y -= e.damping * v.y * m * f),
                        p = r.cross(s, h) / w * i._torqueDampen * n.inverseInertia * (1 - e.angularStiffness),
                        n.constraintImpulse.angle -= p,
                        n.angle -= p),
                        o && !o.isStatic && (f = o.inverseMass / b,
                        o.constraintImpulse.x += h.x * f,
                        o.constraintImpulse.y += h.y * f,
                        o.position.x += h.x * f,
                        o.position.y += h.y * f,
                        e.damping && (o.positionPrev.x += e.damping * v.x * m * f,
                        o.positionPrev.y += e.damping * v.y * m * f),
                        p = r.cross(a, h) / w * i._torqueDampen * o.inverseInertia * (1 - e.angularStiffness),
                        o.constraintImpulse.angle += p,
                        o.angle += p)
                    }
                }
            }
            ,
            i.postSolveAll = function(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t]
                      , c = n.constraintImpulse;
                    if (!(n.isStatic || 0 === c.x && 0 === c.y && 0 === c.angle)) {
                        s.set(n, !1);
                        for (var d = 0; d < n.parts.length; d++) {
                            var u = n.parts[d];
                            o.translate(u.vertices, c),
                            d > 0 && (u.position.x += c.x,
                            u.position.y += c.y),
                            0 !== c.angle && (o.rotate(u.vertices, c.angle, n.position),
                            l.rotate(u.axes, c.angle),
                            d > 0 && r.rotateAbout(u.position, c.angle, n.position, u.position)),
                            a.update(u.bounds, u.vertices, n.velocity)
                        }
                        c.angle *= i._warming,
                        c.x *= i._warming,
                        c.y *= i._warming
                    }
                }
            }
            ,
            i.pointAWorld = function(e) {
                return {
                    x: (e.bodyA ? e.bodyA.position.x : 0) + e.pointA.x,
                    y: (e.bodyA ? e.bodyA.position.y : 0) + e.pointA.y
                }
            }
            ,
            i.pointBWorld = function(e) {
                return {
                    x: (e.bodyB ? e.bodyB.position.x : 0) + e.pointB.x,
                    y: (e.bodyB ? e.bodyB.position.y : 0) + e.pointB.y
                }
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(18);
            i.create = function(e, t) {
                var n = e.bodyA
                  , o = e.bodyB
                  , r = e.parentA
                  , s = e.parentB
                  , a = {
                    id: i.id(n, o),
                    bodyA: n,
                    bodyB: o,
                    contacts: {},
                    activeContacts: [],
                    separation: 0,
                    isActive: !0,
                    confirmedActive: !0,
                    isSensor: n.isSensor || o.isSensor,
                    timeCreated: t,
                    timeUpdated: t,
                    inverseMass: r.inverseMass + s.inverseMass,
                    friction: Math.min(r.friction, s.friction),
                    frictionStatic: Math.max(r.frictionStatic, s.frictionStatic),
                    restitution: Math.max(r.restitution, s.restitution),
                    slop: Math.max(r.slop, s.slop)
                };
                return i.update(a, e, t),
                a
            }
            ,
            i.update = function(e, t, n) {
                var r = e.contacts
                  , s = t.supports
                  , a = e.activeContacts
                  , l = t.parentA
                  , c = t.parentB;
                if (e.collision = t,
                e.inverseMass = l.inverseMass + c.inverseMass,
                e.friction = Math.min(l.friction, c.friction),
                e.frictionStatic = Math.max(l.frictionStatic, c.frictionStatic),
                e.restitution = Math.max(l.restitution, c.restitution),
                e.slop = Math.max(l.slop, c.slop),
                a.length = 0,
                t.collided) {
                    for (var d = 0; d < s.length; d++) {
                        var u = s[d]
                          , p = o.id(u)
                          , f = r[p];
                        f ? a.push(f) : a.push(r[p] = o.create(u))
                    }
                    e.separation = t.depth,
                    i.setActive(e, !0, n)
                } else
                    !0 === e.isActive && i.setActive(e, !1, n)
            }
            ,
            i.setActive = function(e, t, n) {
                t ? (e.isActive = !0,
                e.timeUpdated = n) : (e.isActive = !1,
                e.activeContacts.length = 0)
            }
            ,
            i.id = function(e, t) {
                return e.id < t.id ? "A" + e.id + "B" + t.id : "A" + t.id + "B" + e.id
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(0)
              , r = n(5)
              , s = n(1)
              , a = n(4)
              , l = n(11)
              , c = n(2)
              , d = n(14);
            !function() {
                var e, t;
                "undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                    window.setTimeout(function() {
                        e(o.now())
                    }, 1e3 / 60)
                }
                ,
                t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame),
                i.create = function(e) {
                    var t = {
                        controller: i,
                        engine: null,
                        element: null,
                        canvas: null,
                        mouse: null,
                        frameRequestId: null,
                        options: {
                            width: 800,
                            height: 600,
                            pixelRatio: 1,
                            background: "#14151f",
                            wireframeBackground: "#14151f",
                            hasBounds: !!e.bounds,
                            enabled: !0,
                            wireframes: !0,
                            showSleeping: !0,
                            showDebug: !1,
                            showBroadphase: !1,
                            showBounds: !1,
                            showVelocity: !1,
                            showCollisions: !1,
                            showSeparations: !1,
                            showAxes: !1,
                            showPositions: !1,
                            showAngleIndicator: !1,
                            showIds: !1,
                            showShadows: !1,
                            showVertexNumbers: !1,
                            showConvexHulls: !1,
                            showInternalEdges: !1,
                            showMousePosition: !1
                        }
                    }
                      , r = o.extend(t, e);
                    return r.canvas && (r.canvas.width = r.options.width || r.canvas.width,
                    r.canvas.height = r.options.height || r.canvas.height),
                    r.mouse = e.mouse,
                    r.engine = e.engine,
                    r.canvas = r.canvas || n(r.options.width, r.options.height),
                    r.context = r.canvas.getContext("2d"),
                    r.textures = {},
                    r.bounds = r.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: r.canvas.width,
                            y: r.canvas.height
                        }
                    },
                    1 !== r.options.pixelRatio && i.setPixelRatio(r, r.options.pixelRatio),
                    o.isElement(r.element) ? r.element.appendChild(r.canvas) : r.canvas.parentNode || o.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn"),
                    r
                }
                ,
                i.run = function(t) {
                    !function n(o) {
                        t.frameRequestId = e(n),
                        i.world(t)
                    }()
                }
                ,
                i.stop = function(e) {
                    t(e.frameRequestId)
                }
                ,
                i.setPixelRatio = function(e, t) {
                    var n = e.options
                      , i = e.canvas;
                    "auto" === t && (t = u(i)),
                    n.pixelRatio = t,
                    i.setAttribute("data-pixel-ratio", t),
                    i.width = n.width * t,
                    i.height = n.height * t,
                    i.style.width = n.width + "px",
                    i.style.height = n.height + "px"
                }
                ,
                i.lookAt = function(e, t, n, i) {
                    i = void 0 === i || i,
                    t = o.isArray(t) ? t : [t],
                    n = n || {
                        x: 0,
                        y: 0
                    };
                    for (var r = {
                        min: {
                            x: 1 / 0,
                            y: 1 / 0
                        },
                        max: {
                            x: -1 / 0,
                            y: -1 / 0
                        }
                    }, s = 0; s < t.length; s += 1) {
                        var a = t[s]
                          , l = a.bounds ? a.bounds.min : a.min || a.position || a
                          , c = a.bounds ? a.bounds.max : a.max || a.position || a;
                        l && c && (l.x < r.min.x && (r.min.x = l.x),
                        c.x > r.max.x && (r.max.x = c.x),
                        l.y < r.min.y && (r.min.y = l.y),
                        c.y > r.max.y && (r.max.y = c.y))
                    }
                    var u = r.max.x - r.min.x + 2 * n.x
                      , p = r.max.y - r.min.y + 2 * n.y
                      , f = e.canvas.height
                      , v = e.canvas.width / f
                      , m = u / p
                      , y = 1
                      , g = 1;
                    m > v ? g = m / v : y = v / m,
                    e.options.hasBounds = !0,
                    e.bounds.min.x = r.min.x,
                    e.bounds.max.x = r.min.x + u * y,
                    e.bounds.min.y = r.min.y,
                    e.bounds.max.y = r.min.y + p * g,
                    i && (e.bounds.min.x += .5 * u - u * y * .5,
                    e.bounds.max.x += .5 * u - u * y * .5,
                    e.bounds.min.y += .5 * p - p * g * .5,
                    e.bounds.max.y += .5 * p - p * g * .5),
                    e.bounds.min.x -= n.x,
                    e.bounds.max.x -= n.x,
                    e.bounds.min.y -= n.y,
                    e.bounds.max.y -= n.y,
                    e.mouse && (d.setScale(e.mouse, {
                        x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width,
                        y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height
                    }),
                    d.setOffset(e.mouse, e.bounds.min))
                }
                ,
                i.startViewTransform = function(e) {
                    var t = e.bounds.max.x - e.bounds.min.x
                      , n = e.bounds.max.y - e.bounds.min.y
                      , i = t / e.options.width
                      , o = n / e.options.height;
                    e.context.setTransform(e.options.pixelRatio / i, 0, 0, e.options.pixelRatio / o, 0, 0),
                    e.context.translate(-e.bounds.min.x, -e.bounds.min.y)
                }
                ,
                i.endViewTransform = function(e) {
                    e.context.setTransform(e.options.pixelRatio, 0, 0, e.options.pixelRatio, 0, 0)
                }
                ,
                i.world = function(e) {
                    var t, n = e.engine, o = n.world, u = e.canvas, p = e.context, v = e.options, m = r.allBodies(o), y = r.allConstraints(o), g = v.wireframes ? v.wireframeBackground : v.background, x = [], h = [], b = {
                        timestamp: n.timing.timestamp
                    };
                    if (a.trigger(e, "beforeRender", b),
                    e.currentBackground !== g && f(e, g),
                    p.globalCompositeOperation = "source-in",
                    p.fillStyle = "transparent",
                    p.fillRect(0, 0, u.width, u.height),
                    p.globalCompositeOperation = "source-over",
                    v.hasBounds) {
                        for (t = 0; t < m.length; t++) {
                            var w = m[t];
                            s.overlaps(w.bounds, e.bounds) && x.push(w)
                        }
                        for (t = 0; t < y.length; t++) {
                            var S = y[t]
                              , A = S.bodyA
                              , P = S.bodyB
                              , C = S.pointA
                              , M = S.pointB;
                            A && (C = c.add(A.position, S.pointA)),
                            P && (M = c.add(P.position, S.pointB)),
                            C && M && (s.contains(e.bounds, C) || s.contains(e.bounds, M)) && h.push(S)
                        }
                        i.startViewTransform(e),
                        e.mouse && (d.setScale(e.mouse, {
                            x: (e.bounds.max.x - e.bounds.min.x) / e.options.width,
                            y: (e.bounds.max.y - e.bounds.min.y) / e.options.height
                        }),
                        d.setOffset(e.mouse, e.bounds.min))
                    } else
                        h = y,
                        x = m,
                        1 !== e.options.pixelRatio && e.context.setTransform(e.options.pixelRatio, 0, 0, e.options.pixelRatio, 0, 0);
                    !v.wireframes || n.enableSleeping && v.showSleeping ? i.bodies(e, x, p) : (v.showConvexHulls && i.bodyConvexHulls(e, x, p),
                    i.bodyWireframes(e, x, p)),
                    v.showBounds && i.bodyBounds(e, x, p),
                    (v.showAxes || v.showAngleIndicator) && i.bodyAxes(e, x, p),
                    v.showPositions && i.bodyPositions(e, x, p),
                    v.showVelocity && i.bodyVelocity(e, x, p),
                    v.showIds && i.bodyIds(e, x, p),
                    v.showSeparations && i.separations(e, n.pairs.list, p),
                    v.showCollisions && i.collisions(e, n.pairs.list, p),
                    v.showVertexNumbers && i.vertexNumbers(e, x, p),
                    v.showMousePosition && i.mousePosition(e, e.mouse, p),
                    i.constraints(h, p),
                    v.showBroadphase && n.broadphase.controller === l && i.grid(e, n.broadphase, p),
                    v.showDebug && i.debug(e, p),
                    v.hasBounds && i.endViewTransform(e),
                    a.trigger(e, "afterRender", b)
                }
                ,
                i.debug = function(e, t) {
                    var n = t
                      , i = e.engine
                      , o = i.world
                      , s = i.metrics
                      , a = e.options
                      , c = r.allBodies(o);
                    if (i.timing.timestamp - (e.debugTimestamp || 0) >= 500) {
                        var d = "";
                        s.timing && (d += "fps: " + Math.round(s.timing.fps) + "    "),
                        s.extended && (s.timing && (d += "delta: " + s.timing.delta.toFixed(3) + "    ",
                        d += "correction: " + s.timing.correction.toFixed(3) + "    "),
                        d += "bodies: " + c.length + "    ",
                        i.broadphase.controller === l && (d += "buckets: " + s.buckets + "    "),
                        d += "\n",
                        d += "collisions: " + s.collisions + "    ",
                        d += "pairs: " + i.pairs.list.length + "    ",
                        d += "broad: " + s.broadEff + "    ",
                        d += "mid: " + s.midEff + "    ",
                        d += "narrow: " + s.narrowEff + "    "),
                        e.debugString = d,
                        e.debugTimestamp = i.timing.timestamp
                    }
                    if (e.debugString) {
                        n.font = "12px Arial",
                        a.wireframes ? n.fillStyle = "rgba(255,255,255,0.5)" : n.fillStyle = "rgba(0,0,0,0.5)";
                        for (var u = e.debugString.split("\n"), p = 0; p < u.length; p++)
                            n.fillText(u[p], 50, 50 + 18 * p)
                    }
                }
                ,
                i.constraints = function(e, t) {
                    for (var n = t, i = 0; i < e.length; i++) {
                        var r = e[i];
                        if (r.render.visible && r.pointA && r.pointB) {
                            var s, a, l = r.bodyA, d = r.bodyB;
                            if (s = l ? c.add(l.position, r.pointA) : r.pointA,
                            "pin" === r.render.type)
                                n.beginPath(),
                                n.arc(s.x, s.y, 3, 0, 2 * Math.PI),
                                n.closePath();
                            else {
                                if (a = d ? c.add(d.position, r.pointB) : r.pointB,
                                n.beginPath(),
                                n.moveTo(s.x, s.y),
                                "spring" === r.render.type)
                                    for (var u, p = c.sub(a, s), f = c.perp(c.normalise(p)), v = Math.ceil(o.clamp(r.length / 5, 12, 20)), m = 1; m < v; m += 1)
                                        u = m % 2 == 0 ? 1 : -1,
                                        n.lineTo(s.x + p.x * (m / v) + f.x * u * 4, s.y + p.y * (m / v) + f.y * u * 4);
                                n.lineTo(a.x, a.y)
                            }
                            r.render.lineWidth && (n.lineWidth = r.render.lineWidth,
                            n.strokeStyle = r.render.strokeStyle,
                            n.stroke()),
                            r.render.anchors && (n.fillStyle = r.render.strokeStyle,
                            n.beginPath(),
                            n.arc(s.x, s.y, 3, 0, 2 * Math.PI),
                            n.arc(a.x, a.y, 3, 0, 2 * Math.PI),
                            n.closePath(),
                            n.fill())
                        }
                    }
                }
                ,
                i.bodyShadows = function(e, t, n) {
                    for (var i = n, o = (e.engine,
                    0); o < t.length; o++) {
                        var r = t[o];
                        if (r.render.visible) {
                            if (r.circleRadius)
                                i.beginPath(),
                                i.arc(r.position.x, r.position.y, r.circleRadius, 0, 2 * Math.PI),
                                i.closePath();
                            else {
                                i.beginPath(),
                                i.moveTo(r.vertices[0].x, r.vertices[0].y);
                                for (var s = 1; s < r.vertices.length; s++)
                                    i.lineTo(r.vertices[s].x, r.vertices[s].y);
                                i.closePath()
                            }
                            var a = r.position.x - .5 * e.options.width
                              , l = r.position.y - .2 * e.options.height
                              , c = Math.abs(a) + Math.abs(l);
                            i.shadowColor = "rgba(0,0,0,0.15)",
                            i.shadowOffsetX = .05 * a,
                            i.shadowOffsetY = .05 * l,
                            i.shadowBlur = 1 + 12 * Math.min(1, c / 1e3),
                            i.fill(),
                            i.shadowColor = null,
                            i.shadowOffsetX = null,
                            i.shadowOffsetY = null,
                            i.shadowBlur = null
                        }
                    }
                }
                ,
                i.bodies = function(e, t, n) {
                    var i, o, r, s, a = n, l = (e.engine,
                    e.options), c = l.showInternalEdges || !l.wireframes;
                    for (r = 0; r < t.length; r++)
                        if ((i = t[r]).render.visible)
                            for (s = i.parts.length > 1 ? 1 : 0; s < i.parts.length; s++)
                                if ((o = i.parts[s]).render.visible) {
                                    if (l.showSleeping && i.isSleeping ? a.globalAlpha = .5 * o.render.opacity : 1 !== o.render.opacity && (a.globalAlpha = o.render.opacity),
                                    o.render.sprite && o.render.sprite.texture && !l.wireframes) {
                                        var d = o.render.sprite
                                          , u = p(e, d.texture);
                                        a.translate(o.position.x, o.position.y),
                                        a.rotate(o.angle),
                                        a.drawImage(u, u.width * -d.xOffset * d.xScale, u.height * -d.yOffset * d.yScale, u.width * d.xScale, u.height * d.yScale),
                                        a.rotate(-o.angle),
                                        a.translate(-o.position.x, -o.position.y)
                                    } else {
                                        if (o.circleRadius)
                                            a.beginPath(),
                                            a.arc(o.position.x, o.position.y, o.circleRadius, 0, 2 * Math.PI);
                                        else {
                                            a.beginPath(),
                                            a.moveTo(o.vertices[0].x, o.vertices[0].y);
                                            for (var f = 1; f < o.vertices.length; f++)
                                                !o.vertices[f - 1].isInternal || c ? a.lineTo(o.vertices[f].x, o.vertices[f].y) : a.moveTo(o.vertices[f].x, o.vertices[f].y),
                                                o.vertices[f].isInternal && !c && a.moveTo(o.vertices[(f + 1) % o.vertices.length].x, o.vertices[(f + 1) % o.vertices.length].y);
                                            a.lineTo(o.vertices[0].x, o.vertices[0].y),
                                            a.closePath()
                                        }
                                        l.wireframes ? (a.lineWidth = 1,
                                        a.strokeStyle = "#bbb",
                                        a.stroke()) : (a.fillStyle = o.render.fillStyle,
                                        o.render.lineWidth && (a.lineWidth = o.render.lineWidth,
                                        a.strokeStyle = o.render.strokeStyle,
                                        a.stroke()),
                                        a.fill())
                                    }
                                    a.globalAlpha = 1
                                }
                }
                ,
                i.bodyWireframes = function(e, t, n) {
                    var i, o, r, s, a, l = n, c = e.options.showInternalEdges;
                    for (l.beginPath(),
                    r = 0; r < t.length; r++)
                        if ((i = t[r]).render.visible)
                            for (a = i.parts.length > 1 ? 1 : 0; a < i.parts.length; a++) {
                                for (o = i.parts[a],
                                l.moveTo(o.vertices[0].x, o.vertices[0].y),
                                s = 1; s < o.vertices.length; s++)
                                    !o.vertices[s - 1].isInternal || c ? l.lineTo(o.vertices[s].x, o.vertices[s].y) : l.moveTo(o.vertices[s].x, o.vertices[s].y),
                                    o.vertices[s].isInternal && !c && l.moveTo(o.vertices[(s + 1) % o.vertices.length].x, o.vertices[(s + 1) % o.vertices.length].y);
                                l.lineTo(o.vertices[0].x, o.vertices[0].y)
                            }
                    l.lineWidth = 1,
                    l.strokeStyle = "#bbb",
                    l.stroke()
                }
                ,
                i.bodyConvexHulls = function(e, t, n) {
                    var i, o, r, s = n;
                    for (s.beginPath(),
                    o = 0; o < t.length; o++)
                        if ((i = t[o]).render.visible && 1 !== i.parts.length) {
                            for (s.moveTo(i.vertices[0].x, i.vertices[0].y),
                            r = 1; r < i.vertices.length; r++)
                                s.lineTo(i.vertices[r].x, i.vertices[r].y);
                            s.lineTo(i.vertices[0].x, i.vertices[0].y)
                        }
                    s.lineWidth = 1,
                    s.strokeStyle = "rgba(255,255,255,0.2)",
                    s.stroke()
                }
                ,
                i.vertexNumbers = function(e, t, n) {
                    var i, o, r, s = n;
                    for (i = 0; i < t.length; i++) {
                        var a = t[i].parts;
                        for (r = a.length > 1 ? 1 : 0; r < a.length; r++) {
                            var l = a[r];
                            for (o = 0; o < l.vertices.length; o++)
                                s.fillStyle = "rgba(255,255,255,0.2)",
                                s.fillText(i + "_" + o, l.position.x + .8 * (l.vertices[o].x - l.position.x), l.position.y + .8 * (l.vertices[o].y - l.position.y))
                        }
                    }
                }
                ,
                i.mousePosition = function(e, t, n) {
                    var i = n;
                    i.fillStyle = "rgba(255,255,255,0.8)",
                    i.fillText(t.position.x + "  " + t.position.y, t.position.x + 5, t.position.y - 5)
                }
                ,
                i.bodyBounds = function(e, t, n) {
                    var i = n
                      , o = (e.engine,
                    e.options);
                    i.beginPath();
                    for (var r = 0; r < t.length; r++) {
                        if (t[r].render.visible)
                            for (var s = t[r].parts, a = s.length > 1 ? 1 : 0; a < s.length; a++) {
                                var l = s[a];
                                i.rect(l.bounds.min.x, l.bounds.min.y, l.bounds.max.x - l.bounds.min.x, l.bounds.max.y - l.bounds.min.y)
                            }
                    }
                    o.wireframes ? i.strokeStyle = "rgba(255,255,255,0.08)" : i.strokeStyle = "rgba(0,0,0,0.1)",
                    i.lineWidth = 1,
                    i.stroke()
                }
                ,
                i.bodyAxes = function(e, t, n) {
                    var i, o, r, s, a = n, l = (e.engine,
                    e.options);
                    for (a.beginPath(),
                    o = 0; o < t.length; o++) {
                        var c = t[o]
                          , d = c.parts;
                        if (c.render.visible)
                            if (l.showAxes)
                                for (r = d.length > 1 ? 1 : 0; r < d.length; r++)
                                    for (i = d[r],
                                    s = 0; s < i.axes.length; s++) {
                                        var u = i.axes[s];
                                        a.moveTo(i.position.x, i.position.y),
                                        a.lineTo(i.position.x + 20 * u.x, i.position.y + 20 * u.y)
                                    }
                            else
                                for (r = d.length > 1 ? 1 : 0; r < d.length; r++)
                                    for (i = d[r],
                                    s = 0; s < i.axes.length; s++)
                                        a.moveTo(i.position.x, i.position.y),
                                        a.lineTo((i.vertices[0].x + i.vertices[i.vertices.length - 1].x) / 2, (i.vertices[0].y + i.vertices[i.vertices.length - 1].y) / 2)
                    }
                    l.wireframes ? (a.strokeStyle = "indianred",
                    a.lineWidth = 1) : (a.strokeStyle = "rgba(255, 255, 255, 0.4)",
                    a.globalCompositeOperation = "overlay",
                    a.lineWidth = 2),
                    a.stroke(),
                    a.globalCompositeOperation = "source-over"
                }
                ,
                i.bodyPositions = function(e, t, n) {
                    var i, o, r, s, a = n, l = (e.engine,
                    e.options);
                    for (a.beginPath(),
                    r = 0; r < t.length; r++)
                        if ((i = t[r]).render.visible)
                            for (s = 0; s < i.parts.length; s++)
                                o = i.parts[s],
                                a.arc(o.position.x, o.position.y, 3, 0, 2 * Math.PI, !1),
                                a.closePath();
                    for (l.wireframes ? a.fillStyle = "indianred" : a.fillStyle = "rgba(0,0,0,0.5)",
                    a.fill(),
                    a.beginPath(),
                    r = 0; r < t.length; r++)
                        (i = t[r]).render.visible && (a.arc(i.positionPrev.x, i.positionPrev.y, 2, 0, 2 * Math.PI, !1),
                        a.closePath());
                    a.fillStyle = "rgba(255,165,0,0.8)",
                    a.fill()
                }
                ,
                i.bodyVelocity = function(e, t, n) {
                    var i = n;
                    i.beginPath();
                    for (var o = 0; o < t.length; o++) {
                        var r = t[o];
                        r.render.visible && (i.moveTo(r.position.x, r.position.y),
                        i.lineTo(r.position.x + 2 * (r.position.x - r.positionPrev.x), r.position.y + 2 * (r.position.y - r.positionPrev.y)))
                    }
                    i.lineWidth = 3,
                    i.strokeStyle = "cornflowerblue",
                    i.stroke()
                }
                ,
                i.bodyIds = function(e, t, n) {
                    var i, o, r = n;
                    for (i = 0; i < t.length; i++)
                        if (t[i].render.visible) {
                            var s = t[i].parts;
                            for (o = s.length > 1 ? 1 : 0; o < s.length; o++) {
                                var a = s[o];
                                r.font = "12px Arial",
                                r.fillStyle = "rgba(255,255,255,0.5)",
                                r.fillText(a.id, a.position.x + 10, a.position.y - 10)
                            }
                        }
                }
                ,
                i.collisions = function(e, t, n) {
                    var i, o, r, s, a = n, l = e.options;
                    for (a.beginPath(),
                    r = 0; r < t.length; r++)
                        if ((i = t[r]).isActive)
                            for (o = i.collision,
                            s = 0; s < i.activeContacts.length; s++) {
                                var c = i.activeContacts[s].vertex;
                                a.rect(c.x - 1.5, c.y - 1.5, 3.5, 3.5)
                            }
                    for (l.wireframes ? a.fillStyle = "rgba(255,255,255,0.7)" : a.fillStyle = "orange",
                    a.fill(),
                    a.beginPath(),
                    r = 0; r < t.length; r++)
                        if ((i = t[r]).isActive && (o = i.collision,
                        i.activeContacts.length > 0)) {
                            var d = i.activeContacts[0].vertex.x
                              , u = i.activeContacts[0].vertex.y;
                            2 === i.activeContacts.length && (d = (i.activeContacts[0].vertex.x + i.activeContacts[1].vertex.x) / 2,
                            u = (i.activeContacts[0].vertex.y + i.activeContacts[1].vertex.y) / 2),
                            o.bodyB === o.supports[0].body || !0 === o.bodyA.isStatic ? a.moveTo(d - 8 * o.normal.x, u - 8 * o.normal.y) : a.moveTo(d + 8 * o.normal.x, u + 8 * o.normal.y),
                            a.lineTo(d, u)
                        }
                    l.wireframes ? a.strokeStyle = "rgba(255,165,0,0.7)" : a.strokeStyle = "orange",
                    a.lineWidth = 1,
                    a.stroke()
                }
                ,
                i.separations = function(e, t, n) {
                    var i, o, r, s, a, l = n, c = e.options;
                    for (l.beginPath(),
                    a = 0; a < t.length; a++)
                        if ((i = t[a]).isActive) {
                            r = (o = i.collision).bodyA;
                            var d = 1;
                            (s = o.bodyB).isStatic || r.isStatic || (d = .5),
                            s.isStatic && (d = 0),
                            l.moveTo(s.position.x, s.position.y),
                            l.lineTo(s.position.x - o.penetration.x * d, s.position.y - o.penetration.y * d),
                            d = 1,
                            s.isStatic || r.isStatic || (d = .5),
                            r.isStatic && (d = 0),
                            l.moveTo(r.position.x, r.position.y),
                            l.lineTo(r.position.x + o.penetration.x * d, r.position.y + o.penetration.y * d)
                        }
                    c.wireframes ? l.strokeStyle = "rgba(255,165,0,0.5)" : l.strokeStyle = "orange",
                    l.stroke()
                }
                ,
                i.grid = function(e, t, n) {
                    var i = n;
                    e.options.wireframes ? i.strokeStyle = "rgba(255,180,0,0.1)" : i.strokeStyle = "rgba(255,180,0,0.5)",
                    i.beginPath();
                    for (var r = o.keys(t.buckets), s = 0; s < r.length; s++) {
                        var a = r[s];
                        if (!(t.buckets[a].length < 2)) {
                            var l = a.split(/C|R/);
                            i.rect(.5 + parseInt(l[1], 10) * t.bucketWidth, .5 + parseInt(l[2], 10) * t.bucketHeight, t.bucketWidth, t.bucketHeight)
                        }
                    }
                    i.lineWidth = 1,
                    i.stroke()
                }
                ,
                i.inspector = function(e, t) {
                    e.engine;
                    var n, i = e.selected, o = e.render, r = o.options;
                    if (r.hasBounds) {
                        var s = o.bounds.max.x - o.bounds.min.x
                          , a = o.bounds.max.y - o.bounds.min.y
                          , l = s / o.options.width
                          , c = a / o.options.height;
                        t.scale(1 / l, 1 / c),
                        t.translate(-o.bounds.min.x, -o.bounds.min.y)
                    }
                    for (var d = 0; d < i.length; d++) {
                        var u = i[d].data;
                        switch (t.translate(.5, .5),
                        t.lineWidth = 1,
                        t.strokeStyle = "rgba(255,165,0,0.9)",
                        t.setLineDash([1, 2]),
                        u.type) {
                        case "body":
                            n = u.bounds,
                            t.beginPath(),
                            t.rect(Math.floor(n.min.x - 3), Math.floor(n.min.y - 3), Math.floor(n.max.x - n.min.x + 6), Math.floor(n.max.y - n.min.y + 6)),
                            t.closePath(),
                            t.stroke();
                            break;
                        case "constraint":
                            var p = u.pointA;
                            u.bodyA && (p = u.pointB),
                            t.beginPath(),
                            t.arc(p.x, p.y, 10, 0, 2 * Math.PI),
                            t.closePath(),
                            t.stroke();
                        }
                        t.setLineDash([]),
                        t.translate(-.5, -.5)
                    }
                    null !== e.selectStart && (t.translate(.5, .5),
                    t.lineWidth = 1,
                    t.strokeStyle = "rgba(255,165,0,0.6)",
                    t.fillStyle = "rgba(255,165,0,0.1)",
                    n = e.selectBounds,
                    t.beginPath(),
                    t.rect(Math.floor(n.min.x), Math.floor(n.min.y), Math.floor(n.max.x - n.min.x), Math.floor(n.max.y - n.min.y)),
                    t.closePath(),
                    t.stroke(),
                    t.fill(),
                    t.translate(-.5, -.5)),
                    r.hasBounds && t.setTransform(1, 0, 0, 1, 0, 0)
                }
                ;
                var n = function(e, t) {
                    var n = document.createElement("canvas");
                    return n.width = e,
                    n.height = t,
                    n.oncontextmenu = function() {
                        return !1
                    }
                    ,
                    n.onselectstart = function() {
                        return !1
                    }
                    ,
                    n
                }
                  , u = function(e) {
                    var t = e.getContext("2d");
                    return (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)
                }
                  , p = function(e, t) {
                    var n = e.textures[t];
                    return n || ((n = e.textures[t] = new Image).src = t,
                    n)
                }
                  , f = function(e, t) {
                    var n = t;
                    /(jpg|gif|png)$/.test(t) && (n = "url(" + t + ")"),
                    e.canvas.style.background = n,
                    e.canvas.style.backgroundSize = "contain",
                    e.currentBackground = t
                }
            }()
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(9)
              , r = n(12)
              , s = n(0);
            i.create = function(e) {
                var t = {
                    controller: i,
                    detector: r.collisions,
                    buckets: {},
                    pairs: {},
                    pairsList: [],
                    bucketWidth: 48,
                    bucketHeight: 48
                };
                return s.extend(t, e)
            }
            ,
            i.update = function(e, t, n, o) {
                var r, s, a, l, c, d = n.world, u = e.buckets, p = !1, f = n.metrics;
                for (f.broadphaseTests = 0,
                r = 0; r < t.length; r++) {
                    var v = t[r];
                    if ((!v.isSleeping || o) && !(v.bounds.max.x < d.bounds.min.x || v.bounds.min.x > d.bounds.max.x || v.bounds.max.y < d.bounds.min.y || v.bounds.min.y > d.bounds.max.y)) {
                        var m = i._getRegion(e, v);
                        if (!v.region || m.id !== v.region.id || o) {
                            f.broadphaseTests += 1,
                            v.region && !o || (v.region = m);
                            var y = i._regionUnion(m, v.region);
                            for (s = y.startCol; s <= y.endCol; s++)
                                for (a = y.startRow; a <= y.endRow; a++) {
                                    l = u[c = i._getBucketId(s, a)];
                                    var g = s >= m.startCol && s <= m.endCol && a >= m.startRow && a <= m.endRow
                                      , x = s >= v.region.startCol && s <= v.region.endCol && a >= v.region.startRow && a <= v.region.endRow;
                                    !g && x && x && l && i._bucketRemoveBody(e, l, v),
                                    (v.region === m || g && !x || o) && (l || (l = i._createBucket(u, c)),
                                    i._bucketAddBody(e, l, v))
                                }
                            v.region = m,
                            p = !0
                        }
                    }
                }
                p && (e.pairsList = i._createActivePairsList(e))
            }
            ,
            i.clear = function(e) {
                e.buckets = {},
                e.pairs = {},
                e.pairsList = []
            }
            ,
            i._regionUnion = function(e, t) {
                var n = Math.min(e.startCol, t.startCol)
                  , o = Math.max(e.endCol, t.endCol)
                  , r = Math.min(e.startRow, t.startRow)
                  , s = Math.max(e.endRow, t.endRow);
                return i._createRegion(n, o, r, s)
            }
            ,
            i._getRegion = function(e, t) {
                var n = t.bounds
                  , o = Math.floor(n.min.x / e.bucketWidth)
                  , r = Math.floor(n.max.x / e.bucketWidth)
                  , s = Math.floor(n.min.y / e.bucketHeight)
                  , a = Math.floor(n.max.y / e.bucketHeight);
                return i._createRegion(o, r, s, a)
            }
            ,
            i._createRegion = function(e, t, n, i) {
                return {
                    id: e + "," + t + "," + n + "," + i,
                    startCol: e,
                    endCol: t,
                    startRow: n,
                    endRow: i
                }
            }
            ,
            i._getBucketId = function(e, t) {
                return "C" + e + "R" + t
            }
            ,
            i._createBucket = function(e, t) {
                return e[t] = []
            }
            ,
            i._bucketAddBody = function(e, t, n) {
                for (var i = 0; i < t.length; i++) {
                    var r = t[i];
                    if (!(n.id === r.id || n.isStatic && r.isStatic)) {
                        var s = o.id(n, r)
                          , a = e.pairs[s];
                        a ? a[2] += 1 : e.pairs[s] = [n, r, 1]
                    }
                }
                t.push(n)
            }
            ,
            i._bucketRemoveBody = function(e, t, n) {
                t.splice(s.indexOf(t, n), 1);
                for (var i = 0; i < t.length; i++) {
                    var r = t[i]
                      , a = o.id(n, r)
                      , l = e.pairs[a];
                    l && (l[2] -= 1)
                }
            }
            ,
            i._createActivePairsList = function(e) {
                var t, n, i = [];
                t = s.keys(e.pairs);
                for (var o = 0; o < t.length; o++)
                    (n = e.pairs[t[o]])[2] > 0 ? i.push(n) : delete e.pairs[t[o]];
                return i
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(13)
              , r = n(9)
              , s = n(1);
            i.collisions = function(e, t) {
                for (var n = [], a = t.pairs.table, l = t.metrics, c = 0; c < e.length; c++) {
                    var d = e[c][0]
                      , u = e[c][1];
                    if ((!d.isStatic && !d.isSleeping || !u.isStatic && !u.isSleeping) && i.canCollide(d.collisionFilter, u.collisionFilter) && (l.midphaseTests += 1,
                    s.overlaps(d.bounds, u.bounds)))
                        for (var p = d.parts.length > 1 ? 1 : 0; p < d.parts.length; p++)
                            for (var f = d.parts[p], v = u.parts.length > 1 ? 1 : 0; v < u.parts.length; v++) {
                                var m = u.parts[v];
                                if (f === d && m === u || s.overlaps(f.bounds, m.bounds)) {
                                    var y, g = a[r.id(f, m)];
                                    y = g && g.isActive ? g.collision : null;
                                    var x = o.collides(f, m, y);
                                    l.narrowphaseTests += 1,
                                    x.reused && (l.narrowReuseCount += 1),
                                    x.collided && (n.push(x),
                                    l.narrowDetections += 1)
                                }
                            }
                }
                return n
            }
            ,
            i.canCollide = function(e, t) {
                return e.group === t.group && 0 !== e.group ? e.group > 0 : 0 != (e.mask & t.category) && 0 != (t.mask & e.category)
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(3)
              , r = n(2);
            i.collides = function(e, t, n) {
                var s, a, l, c, d = !1;
                if (n) {
                    var u = e.parent
                      , p = t.parent
                      , f = u.speed * u.speed + u.angularSpeed * u.angularSpeed + p.speed * p.speed + p.angularSpeed * p.angularSpeed;
                    d = n && n.collided && f < .2,
                    c = n
                } else
                    c = {
                        collided: !1,
                        bodyA: e,
                        bodyB: t
                    };
                if (n && d) {
                    var v = c.axisBody
                      , m = v === e ? t : e
                      , y = [v.axes[n.axisNumber]];
                    if (l = i._overlapAxes(v.vertices, m.vertices, y),
                    c.reused = !0,
                    l.overlap <= 0)
                        return c.collided = !1,
                        c
                } else {
                    if ((s = i._overlapAxes(e.vertices, t.vertices, e.axes)).overlap <= 0)
                        return c.collided = !1,
                        c;
                    if ((a = i._overlapAxes(t.vertices, e.vertices, t.axes)).overlap <= 0)
                        return c.collided = !1,
                        c;
                    s.overlap < a.overlap ? (l = s,
                    c.axisBody = e) : (l = a,
                    c.axisBody = t),
                    c.axisNumber = l.axisNumber
                }
                c.bodyA = e.id < t.id ? e : t,
                c.bodyB = e.id < t.id ? t : e,
                c.collided = !0,
                c.depth = l.overlap,
                c.parentA = c.bodyA.parent,
                c.parentB = c.bodyB.parent,
                e = c.bodyA,
                t = c.bodyB,
                r.dot(l.axis, r.sub(t.position, e.position)) < 0 ? c.normal = {
                    x: l.axis.x,
                    y: l.axis.y
                } : c.normal = {
                    x: -l.axis.x,
                    y: -l.axis.y
                },
                c.tangent = r.perp(c.normal),
                c.penetration = c.penetration || {},
                c.penetration.x = c.normal.x * c.depth,
                c.penetration.y = c.normal.y * c.depth;
                var g = i._findSupports(e, t, c.normal)
                  , x = [];
                if (o.contains(e.vertices, g[0]) && x.push(g[0]),
                o.contains(e.vertices, g[1]) && x.push(g[1]),
                x.length < 2) {
                    var h = i._findSupports(t, e, r.neg(c.normal));
                    o.contains(t.vertices, h[0]) && x.push(h[0]),
                    x.length < 2 && o.contains(t.vertices, h[1]) && x.push(h[1])
                }
                return x.length < 1 && (x = [g[0]]),
                c.supports = x,
                c
            }
            ,
            i._overlapAxes = function(e, t, n) {
                for (var o, s, a = r._temp[0], l = r._temp[1], c = {
                    overlap: Number.MAX_VALUE
                }, d = 0; d < n.length; d++) {
                    if (s = n[d],
                    i._projectToAxis(a, e, s),
                    i._projectToAxis(l, t, s),
                    (o = Math.min(a.max - l.min, l.max - a.min)) <= 0)
                        return c.overlap = o,
                        c;
                    o < c.overlap && (c.overlap = o,
                    c.axis = s,
                    c.axisNumber = d)
                }
                return c
            }
            ,
            i._projectToAxis = function(e, t, n) {
                for (var i = r.dot(t[0], n), o = i, s = 1; s < t.length; s += 1) {
                    var a = r.dot(t[s], n);
                    a > o ? o = a : a < i && (i = a)
                }
                e.min = i,
                e.max = o
            }
            ,
            i._findSupports = function(e, t, n) {
                for (var i, o, s, a, l = Number.MAX_VALUE, c = r._temp[0], d = t.vertices, u = e.position, p = 0; p < d.length; p++)
                    o = d[p],
                    c.x = o.x - u.x,
                    c.y = o.y - u.y,
                    (i = -r.dot(n, c)) < l && (l = i,
                    s = o);
                return o = d[s.index - 1 >= 0 ? s.index - 1 : d.length - 1],
                c.x = o.x - u.x,
                c.y = o.y - u.y,
                l = -r.dot(n, c),
                a = o,
                o = d[(s.index + 1) % d.length],
                c.x = o.x - u.x,
                c.y = o.y - u.y,
                (i = -r.dot(n, c)) < l && (a = o),
                [s, a]
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(0);
            i.create = function(e) {
                var t = {};
                return e || o.log("Mouse.create: element was undefined, defaulting to document.body", "warn"),
                t.element = e || document.body,
                t.absolute = {
                    x: 0,
                    y: 0
                },
                t.position = {
                    x: 0,
                    y: 0
                },
                t.mousedownPosition = {
                    x: 0,
                    y: 0
                },
                t.mouseupPosition = {
                    x: 0,
                    y: 0
                },
                t.offset = {
                    x: 0,
                    y: 0
                },
                t.scale = {
                    x: 1,
                    y: 1
                },
                t.wheelDelta = 0,
                t.button = -1,
                t.pixelRatio = parseInt(t.element.getAttribute("data-pixel-ratio"), 10) || 1,
                t.sourceEvents = {
                    mousemove: null,
                    mousedown: null,
                    mouseup: null,
                    mousewheel: null
                },
                t.mousemove = function(e) {
                    var n = i._getRelativeMousePosition(e, t.element, t.pixelRatio);
                    e.changedTouches && (t.button = 0,
                    e.preventDefault()),
                    t.absolute.x = n.x,
                    t.absolute.y = n.y,
                    t.position.x = t.absolute.x * t.scale.x + t.offset.x,
                    t.position.y = t.absolute.y * t.scale.y + t.offset.y,
                    t.sourceEvents.mousemove = e
                }
                ,
                t.mousedown = function(e) {
                    var n = i._getRelativeMousePosition(e, t.element, t.pixelRatio);
                    e.changedTouches ? (t.button = 0,
                    e.preventDefault()) : t.button = e.button,
                    t.absolute.x = n.x,
                    t.absolute.y = n.y,
                    t.position.x = t.absolute.x * t.scale.x + t.offset.x,
                    t.position.y = t.absolute.y * t.scale.y + t.offset.y,
                    t.mousedownPosition.x = t.position.x,
                    t.mousedownPosition.y = t.position.y,
                    t.sourceEvents.mousedown = e
                }
                ,
                t.mouseup = function(e) {
                    var n = i._getRelativeMousePosition(e, t.element, t.pixelRatio);
                    e.changedTouches && e.preventDefault(),
                    t.button = -1,
                    t.absolute.x = n.x,
                    t.absolute.y = n.y,
                    t.position.x = t.absolute.x * t.scale.x + t.offset.x,
                    t.position.y = t.absolute.y * t.scale.y + t.offset.y,
                    t.mouseupPosition.x = t.position.x,
                    t.mouseupPosition.y = t.position.y,
                    t.sourceEvents.mouseup = e
                }
                ,
                t.mousewheel = function(e) {
                    t.wheelDelta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)),
                    e.preventDefault()
                }
                ,
                i.setElement(t, t.element),
                t
            }
            ,
            i.setElement = function(e, t) {
                e.element = t,
                t.addEventListener("mousemove", e.mousemove),
                t.addEventListener("mousedown", e.mousedown),
                t.addEventListener("mouseup", e.mouseup),
                t.addEventListener("mousewheel", e.mousewheel),
                t.addEventListener("DOMMouseScroll", e.mousewheel),
                t.addEventListener("touchmove", e.mousemove),
                t.addEventListener("touchstart", e.mousedown),
                t.addEventListener("touchend", e.mouseup)
            }
            ,
            i.clearSourceEvents = function(e) {
                e.sourceEvents.mousemove = null,
                e.sourceEvents.mousedown = null,
                e.sourceEvents.mouseup = null,
                e.sourceEvents.mousewheel = null,
                e.wheelDelta = 0
            }
            ,
            i.setOffset = function(e, t) {
                e.offset.x = t.x,
                e.offset.y = t.y,
                e.position.x = e.absolute.x * e.scale.x + e.offset.x,
                e.position.y = e.absolute.y * e.scale.y + e.offset.y
            }
            ,
            i.setScale = function(e, t) {
                e.scale.x = t.x,
                e.scale.y = t.y,
                e.position.x = e.absolute.x * e.scale.x + e.offset.x,
                e.position.y = e.absolute.y * e.scale.y + e.offset.y
            }
            ,
            i._getRelativeMousePosition = function(e, t, n) {
                var i, o, r = t.getBoundingClientRect(), s = document.documentElement || document.body.parentNode || document.body, a = void 0 !== window.pageXOffset ? window.pageXOffset : s.scrollLeft, l = void 0 !== window.pageYOffset ? window.pageYOffset : s.scrollTop, c = e.changedTouches;
                return c ? (i = c[0].pageX - r.left - a,
                o = c[0].pageY - r.top - l) : (i = e.pageX - r.left - a,
                o = e.pageY - r.top - l),
                {
                    x: i / (t.clientWidth / (t.width || t.clientWidth) * n),
                    y: o / (t.clientHeight / (t.height || t.clientHeight) * n)
                }
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(2)
              , r = n(0);
            i.fromVertices = function(e) {
                for (var t = {}, n = 0; n < e.length; n++) {
                    var i = (n + 1) % e.length
                      , s = o.normalise({
                        x: e[i].y - e[n].y,
                        y: e[n].x - e[i].x
                    })
                      , a = 0 === s.y ? 1 / 0 : s.x / s.y;
                    t[a = a.toFixed(3).toString()] = s
                }
                return r.values(t)
            }
            ,
            i.rotate = function(e, t) {
                if (0 !== t)
                    for (var n = Math.cos(t), i = Math.sin(t), o = 0; o < e.length; o++) {
                        var r, s = e[o];
                        r = s.x * n - s.y * i,
                        s.y = s.x * i + s.y * n,
                        s.x = r
                    }
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(3)
              , r = n(0)
              , s = n(6)
              , a = n(1)
              , l = n(2);
            i._decompWarned = !1,
            i.rectangle = function(e, t, n, i, a) {
                a = a || {};
                var l = {
                    label: "Rectangle Body",
                    position: {
                        x: e,
                        y: t
                    },
                    vertices: o.fromPath("L 0 0 L " + n + " 0 L " + n + " " + i + " L 0 " + i)
                };
                if (a.chamfer) {
                    var c = a.chamfer;
                    l.vertices = o.chamfer(l.vertices, c.radius, c.quality, c.qualityMin, c.qualityMax),
                    delete a.chamfer
                }
                return s.create(r.extend({}, l, a))
            }
            ,
            i.trapezoid = function(e, t, n, i, a, l) {
                l = l || {};
                var c, d = n * (a *= .5), u = d + (1 - 2 * a) * n, p = u + d;
                c = a < .5 ? "L 0 0 L " + d + " " + -i + " L " + u + " " + -i + " L " + p + " 0" : "L 0 0 L " + u + " " + -i + " L " + p + " 0";
                var f = {
                    label: "Trapezoid Body",
                    position: {
                        x: e,
                        y: t
                    },
                    vertices: o.fromPath(c)
                };
                if (l.chamfer) {
                    var v = l.chamfer;
                    f.vertices = o.chamfer(f.vertices, v.radius, v.quality, v.qualityMin, v.qualityMax),
                    delete l.chamfer
                }
                return s.create(r.extend({}, f, l))
            }
            ,
            i.circle = function(e, t, n, o, s) {
                o = o || {};
                var a = {
                    label: "Circle Body",
                    circleRadius: n
                };
                s = s || 25;
                var l = Math.ceil(Math.max(10, Math.min(s, n)));
                return l % 2 == 1 && (l += 1),
                i.polygon(e, t, l, n, r.extend({}, a, o))
            }
            ,
            i.polygon = function(e, t, n, a, l) {
                if (l = l || {},
                n < 3)
                    return i.circle(e, t, a, l);
                for (var c = 2 * Math.PI / n, d = "", u = .5 * c, p = 0; p < n; p += 1) {
                    var f = u + p * c
                      , v = Math.cos(f) * a
                      , m = Math.sin(f) * a;
                    d += "L " + v.toFixed(3) + " " + m.toFixed(3) + " "
                }
                var y = {
                    label: "Polygon Body",
                    position: {
                        x: e,
                        y: t
                    },
                    vertices: o.fromPath(d)
                };
                if (l.chamfer) {
                    var g = l.chamfer;
                    y.vertices = o.chamfer(y.vertices, g.radius, g.quality, g.qualityMin, g.qualityMax),
                    delete l.chamfer
                }
                return s.create(r.extend({}, y, l))
            }
            ,
            i.fromVertices = function(e, t, c, d, u, p, f, v) {
                var m, y, g, x, h, b, w, S, A, P, C;
                try {
                    m = n(27)
                } catch (E) {
                    m = null
                }
                for (y = Boolean(m && m.quickDecomp),
                d = d || {},
                x = [],
                u = void 0 !== u && u,
                p = void 0 !== p ? p : .01,
                f = void 0 !== f ? f : 10,
                v = void 0 !== v ? v : .01,
                r.isArray(c[0]) || (c = [c]),
                P = 0; P < c.length; P += 1)
                    if (b = c[P],
                    !!(h = o.isConvex(b)) || y || i._decompWarned || (r.warn("Could not resolve the expected 'poly-decomp' package for concave vertices in 'Bodies.fromVertices'"),
                    r.warn("Try 'npm install poly-decomp --save' or as a global e.g. 'window.decomp'"),
                    i._decompWarned = !0),
                    h || !y)
                        b = h ? o.clockwiseSort(b) : o.hull(b),
                        x.push({
                            position: {
                                x: e,
                                y: t
                            },
                            vertices: b
                        });
                    else {
                        var M = b.map(function(e) {
                            return [e.x, e.y]
                        });
                        m.makeCCW(M),
                        !1 !== p && m.removeCollinearPoints(M, p),
                        !1 !== v && m.removeDuplicatePoints && m.removeDuplicatePoints(M, v);
                        var k = m.quickDecomp(M);
                        for (w = 0; w < k.length; w++) {
                            var B = k[w].map(function(e) {
                                return {
                                    x: e[0],
                                    y: e[1]
                                }
                            });
                            f > 0 && o.area(B) < f || x.push({
                                position: o.centre(B),
                                vertices: B
                            })
                        }
                    }
                for (w = 0; w < x.length; w++)
                    x[w] = s.create(r.extend(x[w], d));
                if (u)
                    for (w = 0; w < x.length; w++) {
                        var I = x[w];
                        for (S = w + 1; S < x.length; S++) {
                            var _ = x[S];
                            if (a.overlaps(I.bounds, _.bounds)) {
                                var T = I.vertices
                                  , R = _.vertices;
                                for (A = 0; A < I.vertices.length; A++)
                                    for (C = 0; C < _.vertices.length; C++) {
                                        var L = l.magnitudeSquared(l.sub(T[(A + 1) % T.length], R[C]))
                                          , O = l.magnitudeSquared(l.sub(T[A], R[(C + 1) % R.length]));
                                        L < 5 && O < 5 && (T[A].isInternal = !0,
                                        R[C].isInternal = !0)
                                    }
                            }
                        }
                    }
                return x.length > 1 ? (g = s.create(r.extend({
                    parts: x.slice(0)
                }, d)),
                s.setPosition(g, {
                    x: e,
                    y: t
                }),
                g) : x[0]
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(0);
            i._registry = {},
            i.register = function(e) {
                if (i.isPlugin(e) || o.warn("Plugin.register:", i.toString(e), "does not implement all required fields."),
                e.name in i._registry) {
                    var t = i._registry[e.name]
                      , n = i.versionParse(e.version).number
                      , r = i.versionParse(t.version).number;
                    n > r ? (o.warn("Plugin.register:", i.toString(t), "was upgraded to", i.toString(e)),
                    i._registry[e.name] = e) : n < r ? o.warn("Plugin.register:", i.toString(t), "can not be downgraded to", i.toString(e)) : e !== t && o.warn("Plugin.register:", i.toString(e), "is already registered to different plugin object")
                } else
                    i._registry[e.name] = e;
                return e
            }
            ,
            i.resolve = function(e) {
                return i._registry[i.dependencyParse(e).name]
            }
            ,
            i.toString = function(e) {
                return "string" == typeof e ? e : (e.name || "anonymous") + "@" + (e.version || e.range || "0.0.0")
            }
            ,
            i.isPlugin = function(e) {
                return e && e.name && e.version && e.install
            }
            ,
            i.isUsed = function(e, t) {
                return e.used.indexOf(t) > -1
            }
            ,
            i.isFor = function(e, t) {
                var n = e.for && i.dependencyParse(e.for);
                return !e.for || t.name === n.name && i.versionSatisfies(t.version, n.range)
            }
            ,
            i.use = function(e, t) {
                if (e.uses = (e.uses || []).concat(t || []),
                0 !== e.uses.length) {
                    for (var n = i.dependencies(e), r = o.topologicalSort(n), s = [], a = 0; a < r.length; a += 1)
                        if (r[a] !== e.name) {
                            var l = i.resolve(r[a]);
                            l ? i.isUsed(e, l.name) || (i.isFor(l, e) || (o.warn("Plugin.use:", i.toString(l), "is for", l.for, "but installed on", i.toString(e) + "."),
                            l._warned = !0),
                            l.install ? l.install(e) : (o.warn("Plugin.use:", i.toString(l), "does not specify an install function."),
                            l._warned = !0),
                            l._warned ? (s.push("\uD83D\uDD36 " + i.toString(l)),
                            delete l._warned) : s.push("\u2705 " + i.toString(l)),
                            e.used.push(l.name)) : s.push("\u274C " + r[a])
                        }
                    s.length > 0 && o.info(s.join("  "))
                } else
                    o.warn("Plugin.use:", i.toString(e), "does not specify any dependencies to install.")
            }
            ,
            i.dependencies = function(e, t) {
                var n = i.dependencyParse(e)
                  , r = n.name;
                if (!(r in (t = t || {}))) {
                    e = i.resolve(e) || e,
                    t[r] = o.map(e.uses || [], function(t) {
                        i.isPlugin(t) && i.register(t);
                        var r = i.dependencyParse(t)
                          , s = i.resolve(t);
                        return s && !i.versionSatisfies(s.version, r.range) ? (o.warn("Plugin.dependencies:", i.toString(s), "does not satisfy", i.toString(r), "used by", i.toString(n) + "."),
                        s._warned = !0,
                        e._warned = !0) : s || (o.warn("Plugin.dependencies:", i.toString(t), "used by", i.toString(n), "could not be resolved."),
                        e._warned = !0),
                        r.name
                    });
                    for (var s = 0; s < t[r].length; s += 1)
                        i.dependencies(t[r][s], t);
                    return t
                }
            }
            ,
            i.dependencyParse = function(e) {
                return o.isString(e) ? (/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/.test(e) || o.warn("Plugin.dependencyParse:", e, "is not a valid dependency string."),
                {
                    name: e.split("@")[0],
                    range: e.split("@")[1] || "*"
                }) : {
                    name: e.name,
                    range: e.range || e.version
                }
            }
            ,
            i.versionParse = function(e) {
                var t = /^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-]+)?$/;
                t.test(e) || o.warn("Plugin.versionParse:", e, "is not a valid version or range.");
                var n = t.exec(e)
                  , i = Number(n[4])
                  , r = Number(n[5])
                  , s = Number(n[6]);
                return {
                    isRange: Boolean(n[1] || n[2]),
                    version: n[3],
                    range: e,
                    operator: n[1] || n[2] || "",
                    major: i,
                    minor: r,
                    patch: s,
                    parts: [i, r, s],
                    prerelease: n[7],
                    number: 1e8 * i + 1e4 * r + s
                }
            }
            ,
            i.versionSatisfies = function(e, t) {
                t = t || "*";
                var n = i.versionParse(t)
                  , o = i.versionParse(e);
                if (n.isRange) {
                    if ("*" === n.operator || "*" === e)
                        return !0;
                    if (">" === n.operator)
                        return o.number > n.number;
                    if (">=" === n.operator)
                        return o.number >= n.number;
                    if ("~" === n.operator)
                        return o.major === n.major && o.minor === n.minor && o.patch >= n.patch;
                    if ("^" === n.operator)
                        return n.major > 0 ? o.major === n.major && o.number >= n.number : n.minor > 0 ? o.minor === n.minor && o.patch >= n.patch : o.patch === n.patch
                }
                return e === t || "*" === e
            }
        }
        , function(e, t) {
            var n = {};
            e.exports = n,
            n.create = function(e) {
                return {
                    id: n.id(e),
                    vertex: e,
                    normalImpulse: 0,
                    tangentImpulse: 0
                }
            }
            ,
            n.id = function(e) {
                return e.body.id + "_" + e.index
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(5)
              , r = (n(8),
            n(0));
            i.create = function(e) {
                var t = o.create()
                  , n = {
                    label: "World",
                    gravity: {
                        x: 0,
                        y: 1,
                        scale: .001
                    },
                    bounds: {
                        min: {
                            x: -1 / 0,
                            y: -1 / 0
                        },
                        max: {
                            x: 1 / 0,
                            y: 1 / 0
                        }
                    }
                };
                return r.extend(t, n, e)
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(9)
              , r = n(0);
            i._pairMaxIdleLife = 1e3,
            i.create = function(e) {
                return r.extend({
                    table: {},
                    list: [],
                    collisionStart: [],
                    collisionActive: [],
                    collisionEnd: []
                }, e)
            }
            ,
            i.update = function(e, t, n) {
                var i, r, s, a, l = e.list, c = e.table, d = e.collisionStart, u = e.collisionEnd, p = e.collisionActive;
                for (d.length = 0,
                u.length = 0,
                p.length = 0,
                a = 0; a < l.length; a++)
                    l[a].confirmedActive = !1;
                for (a = 0; a < t.length; a++)
                    (i = t[a]).collided && ((s = c[r = o.id(i.bodyA, i.bodyB)]) ? (s.isActive ? p.push(s) : d.push(s),
                    o.update(s, i, n),
                    s.confirmedActive = !0) : (s = o.create(i, n),
                    c[r] = s,
                    d.push(s),
                    l.push(s)));
                for (a = 0; a < l.length; a++)
                    (s = l[a]).isActive && !s.confirmedActive && (o.setActive(s, !1, n),
                    u.push(s))
            }
            ,
            i.removeOld = function(e, t) {
                var n, o, r, s, a = e.list, l = e.table, c = [];
                for (s = 0; s < a.length; s++)
                    (o = (n = a[s]).collision).bodyA.isSleeping || o.bodyB.isSleeping ? n.timeUpdated = t : t - n.timeUpdated > i._pairMaxIdleLife && c.push(s);
                for (s = 0; s < c.length; s++)
                    delete l[(n = a[r = c[s] - s]).id],
                    a.splice(r, 1)
            }
            ,
            i.clear = function(e) {
                return e.table = {},
                e.list.length = 0,
                e.collisionStart.length = 0,
                e.collisionActive.length = 0,
                e.collisionEnd.length = 0,
                e
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(3)
              , r = n(2)
              , s = n(0)
              , a = n(1);
            i._restingThresh = 4,
            i._restingThreshTangent = 6,
            i._positionDampen = .9,
            i._positionWarming = .8,
            i._frictionNormalMultiplier = 5,
            i.preSolvePosition = function(e) {
                var t, n, i;
                for (t = 0; t < e.length; t++)
                    (n = e[t]).isActive && (i = n.activeContacts.length,
                    n.collision.parentA.totalContacts += i,
                    n.collision.parentB.totalContacts += i)
            }
            ,
            i.solvePosition = function(e, t) {
                var n, o, s, a, l, c, d, u, p, f = r._temp[0], v = r._temp[1], m = r._temp[2], y = r._temp[3];
                for (n = 0; n < e.length; n++)
                    (o = e[n]).isActive && !o.isSensor && (a = (s = o.collision).parentA,
                    l = s.parentB,
                    c = s.normal,
                    d = r.sub(r.add(l.positionImpulse, l.position, f), r.add(a.positionImpulse, r.sub(l.position, s.penetration, v), m), y),
                    o.separation = r.dot(c, d));
                for (n = 0; n < e.length; n++)
                    (o = e[n]).isActive && !o.isSensor && (a = (s = o.collision).parentA,
                    l = s.parentB,
                    c = s.normal,
                    p = (o.separation - o.slop) * t,
                    (a.isStatic || l.isStatic) && (p *= 2),
                    a.isStatic || a.isSleeping || (u = i._positionDampen / a.totalContacts,
                    a.positionImpulse.x += c.x * p * u,
                    a.positionImpulse.y += c.y * p * u),
                    l.isStatic || l.isSleeping || (u = i._positionDampen / l.totalContacts,
                    l.positionImpulse.x -= c.x * p * u,
                    l.positionImpulse.y -= c.y * p * u))
            }
            ,
            i.postSolvePosition = function(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    if (n.totalContacts = 0,
                    0 !== n.positionImpulse.x || 0 !== n.positionImpulse.y) {
                        for (var s = 0; s < n.parts.length; s++) {
                            var l = n.parts[s];
                            o.translate(l.vertices, n.positionImpulse),
                            a.update(l.bounds, l.vertices, n.velocity),
                            l.position.x += n.positionImpulse.x,
                            l.position.y += n.positionImpulse.y
                        }
                        n.positionPrev.x += n.positionImpulse.x,
                        n.positionPrev.y += n.positionImpulse.y,
                        r.dot(n.positionImpulse, n.velocity) < 0 ? (n.positionImpulse.x = 0,
                        n.positionImpulse.y = 0) : (n.positionImpulse.x *= i._positionWarming,
                        n.positionImpulse.y *= i._positionWarming)
                    }
                }
            }
            ,
            i.preSolveVelocity = function(e) {
                var t, n, i, o, s, a, l, c, d, u, p, f, v, m, y = r._temp[0], g = r._temp[1];
                for (t = 0; t < e.length; t++)
                    if ((i = e[t]).isActive && !i.isSensor)
                        for (o = i.activeContacts,
                        a = (s = i.collision).parentA,
                        l = s.parentB,
                        c = s.normal,
                        d = s.tangent,
                        n = 0; n < o.length; n++)
                            p = (u = o[n]).vertex,
                            f = u.normalImpulse,
                            v = u.tangentImpulse,
                            0 === f && 0 === v || (y.x = c.x * f + d.x * v,
                            y.y = c.y * f + d.y * v,
                            a.isStatic || a.isSleeping || (m = r.sub(p, a.position, g),
                            a.positionPrev.x += y.x * a.inverseMass,
                            a.positionPrev.y += y.y * a.inverseMass,
                            a.anglePrev += r.cross(m, y) * a.inverseInertia),
                            l.isStatic || l.isSleeping || (m = r.sub(p, l.position, g),
                            l.positionPrev.x -= y.x * l.inverseMass,
                            l.positionPrev.y -= y.y * l.inverseMass,
                            l.anglePrev -= r.cross(m, y) * l.inverseInertia))
            }
            ,
            i.solveVelocity = function(e, t) {
                for (var n = t * t, o = r._temp[0], a = r._temp[1], l = r._temp[2], c = r._temp[3], d = r._temp[4], u = r._temp[5], p = 0; p < e.length; p++) {
                    var f = e[p];
                    if (f.isActive && !f.isSensor) {
                        var v = f.collision
                          , m = v.parentA
                          , y = v.parentB
                          , g = v.normal
                          , x = v.tangent
                          , h = f.activeContacts
                          , b = 1 / h.length;
                        m.velocity.x = m.position.x - m.positionPrev.x,
                        m.velocity.y = m.position.y - m.positionPrev.y,
                        y.velocity.x = y.position.x - y.positionPrev.x,
                        y.velocity.y = y.position.y - y.positionPrev.y,
                        m.angularVelocity = m.angle - m.anglePrev,
                        y.angularVelocity = y.angle - y.anglePrev;
                        for (var w = 0; w < h.length; w++) {
                            var S = h[w]
                              , A = S.vertex
                              , P = r.sub(A, m.position, a)
                              , C = r.sub(A, y.position, l)
                              , M = r.add(m.velocity, r.mult(r.perp(P), m.angularVelocity), c)
                              , k = r.add(y.velocity, r.mult(r.perp(C), y.angularVelocity), d)
                              , B = r.sub(M, k, u)
                              , I = r.dot(g, B)
                              , _ = r.dot(x, B)
                              , T = Math.abs(_)
                              , R = s.sign(_)
                              , L = (1 + f.restitution) * I
                              , O = s.clamp(f.separation + I, 0, 1) * i._frictionNormalMultiplier
                              , E = _
                              , V = 1 / 0;
                            T > f.friction * f.frictionStatic * O * n && (V = T,
                            E = s.clamp(f.friction * R * n, -V, V));
                            var F = r.cross(P, g)
                              , D = r.cross(C, g)
                              , W = b / (m.inverseMass + y.inverseMass + m.inverseInertia * F * F + y.inverseInertia * D * D);
                            if (L *= W,
                            E *= W,
                            I < 0 && I * I > i._restingThresh * n)
                                S.normalImpulse = 0;
                            else {
                                var q = S.normalImpulse;
                                S.normalImpulse = Math.min(S.normalImpulse + L, 0),
                                L = S.normalImpulse - q
                            }
                            if (_ * _ > i._restingThreshTangent * n)
                                S.tangentImpulse = 0;
                            else {
                                var j = S.tangentImpulse;
                                S.tangentImpulse = s.clamp(S.tangentImpulse + E, -V, V),
                                E = S.tangentImpulse - j
                            }
                            o.x = g.x * L + x.x * E,
                            o.y = g.y * L + x.y * E,
                            m.isStatic || m.isSleeping || (m.positionPrev.x += o.x * m.inverseMass,
                            m.positionPrev.y += o.y * m.inverseMass,
                            m.anglePrev += r.cross(P, o) * m.inverseInertia),
                            y.isStatic || y.isSleeping || (y.positionPrev.x -= o.x * y.inverseMass,
                            y.positionPrev.y -= o.y * y.inverseMass,
                            y.anglePrev -= r.cross(C, o) * y.inverseInertia)
                        }
                    }
                }
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(19)
              , r = n(7)
              , s = n(21)
              , a = n(10)
              , l = n(20)
              , c = n(23)
              , d = n(11)
              , u = n(4)
              , p = n(5)
              , f = n(8)
              , v = n(0)
              , m = n(6);
            i.create = function(e, t) {
                t = (t = v.isElement(e) ? t : e) || {},
                ((e = v.isElement(e) ? e : null) || t.render) && v.warn("Engine.create: engine.render is deprecated (see docs)");
                var n = {
                    positionIterations: 6,
                    velocityIterations: 4,
                    constraintIterations: 2,
                    enableSleeping: !1,
                    events: [],
                    plugin: {},
                    timing: {
                        timestamp: 0,
                        timeScale: 1
                    },
                    broadphase: {
                        controller: d
                    }
                }
                  , i = v.extend(n, t);
                if (e || i.render) {
                    var r = {
                        element: e,
                        controller: a
                    };
                    i.render = v.extend(r, i.render)
                }
                return i.render && i.render.controller && (i.render = i.render.controller.create(i.render)),
                i.render && (i.render.engine = i),
                i.world = t.world || o.create(i.world),
                i.pairs = l.create(),
                i.broadphase = i.broadphase.controller.create(i.broadphase),
                i.metrics = i.metrics || {
                    extended: !1
                },
                i.metrics = c.create(i.metrics),
                i
            }
            ,
            i.update = function(e, t, n) {
                t = t || 1e3 / 60,
                n = n || 1;
                var o, a = e.world, d = e.timing, v = e.broadphase, m = [];
                d.timestamp += t * d.timeScale;
                var y = {
                    timestamp: d.timestamp
                };
                u.trigger(e, "beforeUpdate", y);
                var g = p.allBodies(a)
                  , x = p.allConstraints(a);
                for (c.reset(e.metrics),
                e.enableSleeping && r.update(g, d.timeScale),
                i._bodiesApplyGravity(g, a.gravity),
                i._bodiesUpdate(g, t, d.timeScale, n, a.bounds),
                f.preSolveAll(g),
                o = 0; o < e.constraintIterations; o++)
                    f.solveAll(x, d.timeScale);
                f.postSolveAll(g),
                v.controller ? (a.isModified && v.controller.clear(v),
                v.controller.update(v, g, e, a.isModified),
                m = v.pairsList) : m = g,
                a.isModified && p.setModified(a, !1, !1, !0);
                var h = v.detector(m, e)
                  , b = e.pairs
                  , w = d.timestamp;
                for (l.update(b, h, w),
                l.removeOld(b, w),
                e.enableSleeping && r.afterCollisions(b.list, d.timeScale),
                b.collisionStart.length > 0 && u.trigger(e, "collisionStart", {
                    pairs: b.collisionStart
                }),
                s.preSolvePosition(b.list),
                o = 0; o < e.positionIterations; o++)
                    s.solvePosition(b.list, d.timeScale);
                for (s.postSolvePosition(g),
                f.preSolveAll(g),
                o = 0; o < e.constraintIterations; o++)
                    f.solveAll(x, d.timeScale);
                for (f.postSolveAll(g),
                s.preSolveVelocity(b.list),
                o = 0; o < e.velocityIterations; o++)
                    s.solveVelocity(b.list, d.timeScale);
                return b.collisionActive.length > 0 && u.trigger(e, "collisionActive", {
                    pairs: b.collisionActive
                }),
                b.collisionEnd.length > 0 && u.trigger(e, "collisionEnd", {
                    pairs: b.collisionEnd
                }),
                c.update(e.metrics, e),
                i._bodiesClearForces(g),
                u.trigger(e, "afterUpdate", y),
                e
            }
            ,
            i.merge = function(e, t) {
                if (v.extend(e, t),
                t.world) {
                    e.world = t.world,
                    i.clear(e);
                    for (var n = p.allBodies(e.world), o = 0; o < n.length; o++) {
                        var s = n[o];
                        r.set(s, !1),
                        s.id = v.nextId()
                    }
                }
            }
            ,
            i.clear = function(e) {
                var t = e.world;
                l.clear(e.pairs);
                var n = e.broadphase;
                if (n.controller) {
                    var i = p.allBodies(t);
                    n.controller.clear(n),
                    n.controller.update(n, i, e, !0)
                }
            }
            ,
            i._bodiesClearForces = function(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    n.force.x = 0,
                    n.force.y = 0,
                    n.torque = 0
                }
            }
            ,
            i._bodiesApplyGravity = function(e, t) {
                var n = void 0 !== t.scale ? t.scale : .001;
                if ((0 !== t.x || 0 !== t.y) && 0 !== n)
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.isStatic || o.isSleeping || (o.force.y += o.mass * t.y * n,
                        o.force.x += o.mass * t.x * n)
                    }
            }
            ,
            i._bodiesUpdate = function(e, t, n, i, o) {
                for (var r = 0; r < e.length; r++) {
                    var s = e[r];
                    s.isStatic || s.isSleeping || m.update(s, t, n, i)
                }
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(5)
              , r = n(0);
            i.create = function(e) {
                return r.extend({
                    extended: !1,
                    narrowDetections: 0,
                    narrowphaseTests: 0,
                    narrowReuse: 0,
                    narrowReuseCount: 0,
                    midphaseTests: 0,
                    broadphaseTests: 0,
                    narrowEff: 1e-4,
                    midEff: 1e-4,
                    broadEff: 1e-4,
                    collisions: 0,
                    buckets: 0,
                    bodies: 0,
                    pairs: 0
                }, !1, e)
            }
            ,
            i.reset = function(e) {
                e.extended && (e.narrowDetections = 0,
                e.narrowphaseTests = 0,
                e.narrowReuse = 0,
                e.narrowReuseCount = 0,
                e.midphaseTests = 0,
                e.broadphaseTests = 0,
                e.narrowEff = 0,
                e.midEff = 0,
                e.broadEff = 0,
                e.collisions = 0,
                e.buckets = 0,
                e.pairs = 0,
                e.bodies = 0)
            }
            ,
            i.update = function(e, t) {
                if (e.extended) {
                    var n = t.world
                      , i = o.allBodies(n);
                    e.collisions = e.narrowDetections,
                    e.pairs = t.pairs.list.length,
                    e.bodies = i.length,
                    e.midEff = (e.narrowDetections / (e.midphaseTests || 1)).toFixed(2),
                    e.narrowEff = (e.narrowDetections / (e.narrowphaseTests || 1)).toFixed(2),
                    e.broadEff = (1 - e.broadphaseTests / (i.length || 1)).toFixed(2),
                    e.narrowReuse = (e.narrowReuseCount / (e.narrowphaseTests || 1)).toFixed(2)
                }
            }
        }
        , function(e, t, n) {
            var i = e.exports = n(25);
            i.Body = n(6),
            i.Composite = n(5),
            i.World = n(19),
            i.Contact = n(18),
            i.Detector = n(12),
            i.Grid = n(11),
            i.Pairs = n(20),
            i.Pair = n(9),
            i.Query = n(26),
            i.Resolver = n(21),
            i.SAT = n(13),
            i.Constraint = n(8),
            i.MouseConstraint = n(28),
            i.Common = n(0),
            i.Engine = n(22),
            i.Events = n(4),
            i.Mouse = n(14),
            i.Runner = n(29),
            i.Sleeping = n(7),
            i.Plugin = n(17),
            i.Metrics = n(23),
            i.Bodies = n(16),
            i.Composites = n(30),
            i.Axes = n(15),
            i.Bounds = n(1),
            i.Svg = n(31),
            i.Vector = n(2),
            i.Vertices = n(3),
            i.Render = n(10),
            i.RenderPixi = n(32),
            i.World.add = i.Composite.add,
            i.World.remove = i.Composite.remove,
            i.World.addComposite = i.Composite.addComposite,
            i.World.addBody = i.Composite.addBody,
            i.World.addConstraint = i.Composite.addConstraint,
            i.World.clear = i.Composite.clear,
            i.Engine.run = i.Runner.run
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(17)
              , r = n(0);
            i.name = "matter-js",
            i.version = "0.16.1",
            i.uses = [],
            i.used = [],
            i.use = function() {
                o.use(i, Array.prototype.slice.call(arguments))
            }
            ,
            i.before = function(e, t) {
                return e = e.replace(/^Matter./, ""),
                r.chainPathBefore(i, e, t)
            }
            ,
            i.after = function(e, t) {
                return e = e.replace(/^Matter./, ""),
                r.chainPathAfter(i, e, t)
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(2)
              , r = n(13)
              , s = n(1)
              , a = n(16)
              , l = n(3);
            i.collides = function(e, t) {
                for (var n = [], i = 0; i < t.length; i++) {
                    var o = t[i];
                    if (s.overlaps(o.bounds, e.bounds))
                        for (var a = 1 === o.parts.length ? 0 : 1; a < o.parts.length; a++) {
                            var l = o.parts[a];
                            if (s.overlaps(l.bounds, e.bounds)) {
                                var c = r.collides(l, e);
                                if (c.collided) {
                                    n.push(c);
                                    break
                                }
                            }
                        }
                }
                return n
            }
            ,
            i.ray = function(e, t, n, r) {
                r = r || 1e-100;
                for (var s = o.angle(t, n), l = o.magnitude(o.sub(t, n)), c = .5 * (n.x + t.x), d = .5 * (n.y + t.y), u = a.rectangle(c, d, l, r, {
                    angle: s
                }), p = i.collides(u, e), f = 0; f < p.length; f += 1) {
                    var v = p[f];
                    v.body = v.bodyB = v.bodyA
                }
                return p
            }
            ,
            i.region = function(e, t, n) {
                for (var i = [], o = 0; o < e.length; o++) {
                    var r = e[o]
                      , a = s.overlaps(r.bounds, t);
                    (a && !n || !a && n) && i.push(r)
                }
                return i
            }
            ,
            i.point = function(e, t) {
                for (var n = [], i = 0; i < e.length; i++) {
                    var o = e[i];
                    if (s.contains(o.bounds, t))
                        for (var r = 1 === o.parts.length ? 0 : 1; r < o.parts.length; r++) {
                            var a = o.parts[r];
                            if (s.contains(a.bounds, t) && l.contains(a.vertices, t)) {
                                n.push(o);
                                break
                            }
                        }
                }
                return n
            }
        }
        , function(t, n) {
            if (void 0 === e) {
                var i = new Error("Cannot find module 'undefined'");
                throw i.code = "MODULE_NOT_FOUND",
                i
            }
            t.exports = e
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(3)
              , r = n(7)
              , s = n(14)
              , a = n(4)
              , l = n(12)
              , c = n(8)
              , d = n(5)
              , u = n(0)
              , p = n(1);
            i.create = function(e, t) {
                var n = (e ? e.mouse : null) || (t ? t.mouse : null);
                n || (e && e.render && e.render.canvas ? n = s.create(e.render.canvas) : t && t.element ? n = s.create(t.element) : (n = s.create(),
                u.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));
                var o = {
                    type: "mouseConstraint",
                    mouse: n,
                    element: null,
                    body: null,
                    constraint: c.create({
                        label: "Mouse Constraint",
                        pointA: n.position,
                        pointB: {
                            x: 0,
                            y: 0
                        },
                        length: .01,
                        stiffness: .1,
                        angularStiffness: 1,
                        render: {
                            strokeStyle: "#90EE90",
                            lineWidth: 3
                        }
                    }),
                    collisionFilter: {
                        category: 1,
                        mask: 4294967295,
                        group: 0
                    }
                }
                  , r = u.extend(o, t);
                return a.on(e, "beforeUpdate", function() {
                    var t = d.allBodies(e.world);
                    i.update(r, t),
                    i._triggerEvents(r)
                }),
                r
            }
            ,
            i.update = function(e, t) {
                var n = e.mouse
                  , i = e.constraint
                  , s = e.body;
                if (0 === n.button) {
                    if (i.bodyB)
                        r.set(i.bodyB, !1),
                        i.pointA = n.position;
                    else
                        for (var c = 0; c < t.length; c++)
                            if (s = t[c],
                            p.contains(s.bounds, n.position) && l.canCollide(s.collisionFilter, e.collisionFilter))
                                for (var d = s.parts.length > 1 ? 1 : 0; d < s.parts.length; d++) {
                                    var u = s.parts[d];
                                    if (o.contains(u.vertices, n.position)) {
                                        i.pointA = n.position,
                                        i.bodyB = e.body = s,
                                        i.pointB = {
                                            x: n.position.x - s.position.x,
                                            y: n.position.y - s.position.y
                                        },
                                        i.angleB = s.angle,
                                        r.set(s, !1),
                                        a.trigger(e, "startdrag", {
                                            mouse: n,
                                            body: s
                                        });
                                        break
                                    }
                                }
                } else
                    i.bodyB = e.body = null,
                    i.pointB = null,
                    s && a.trigger(e, "enddrag", {
                        mouse: n,
                        body: s
                    })
            }
            ,
            i._triggerEvents = function(e) {
                var t = e.mouse
                  , n = t.sourceEvents;
                n.mousemove && a.trigger(e, "mousemove", {
                    mouse: t
                }),
                n.mousedown && a.trigger(e, "mousedown", {
                    mouse: t
                }),
                n.mouseup && a.trigger(e, "mouseup", {
                    mouse: t
                }),
                s.clearSourceEvents(t)
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(4)
              , r = n(22)
              , s = n(0);
            !function() {
                var e, t, n;
                ("undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame,
                t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame),
                e) || (e = function(e) {
                    n = setTimeout(function() {
                        e(s.now())
                    }, 1e3 / 60)
                }
                ,
                t = function() {
                    clearTimeout(n)
                }
                );
                i.create = function(e) {
                    var t = s.extend({
                        fps: 60,
                        correction: 1,
                        deltaSampleSize: 60,
                        counterTimestamp: 0,
                        frameCounter: 0,
                        deltaHistory: [],
                        timePrev: null,
                        timeScalePrev: 1,
                        frameRequestId: null,
                        isFixed: !1,
                        enabled: !0
                    }, e);
                    return t.delta = t.delta || 1e3 / t.fps,
                    t.deltaMin = t.deltaMin || 1e3 / t.fps,
                    t.deltaMax = t.deltaMax || 1e3 / (.5 * t.fps),
                    t.fps = 1e3 / t.delta,
                    t
                }
                ,
                i.run = function(t, n) {
                    return void 0 !== t.positionIterations && (n = t,
                    t = i.create()),
                    function o(r) {
                        t.frameRequestId = e(o),
                        r && t.enabled && i.tick(t, n, r)
                    }(),
                    t
                }
                ,
                i.tick = function(e, t, n) {
                    var i, s = t.timing, a = 1, l = {
                        timestamp: s.timestamp
                    };
                    o.trigger(e, "beforeTick", l),
                    o.trigger(t, "beforeTick", l),
                    e.isFixed ? i = e.delta : (i = n - e.timePrev || e.delta,
                    e.timePrev = n,
                    e.deltaHistory.push(i),
                    e.deltaHistory = e.deltaHistory.slice(-e.deltaSampleSize),
                    a = (i = (i = (i = Math.min.apply(null, e.deltaHistory)) < e.deltaMin ? e.deltaMin : i) > e.deltaMax ? e.deltaMax : i) / e.delta,
                    e.delta = i),
                    0 !== e.timeScalePrev && (a *= s.timeScale / e.timeScalePrev),
                    0 === s.timeScale && (a = 0),
                    e.timeScalePrev = s.timeScale,
                    e.correction = a,
                    e.frameCounter += 1,
                    n - e.counterTimestamp >= 1e3 && (e.fps = e.frameCounter * ((n - e.counterTimestamp) / 1e3),
                    e.counterTimestamp = n,
                    e.frameCounter = 0),
                    o.trigger(e, "tick", l),
                    o.trigger(t, "tick", l),
                    t.world.isModified && t.render && t.render.controller && t.render.controller.clear && t.render.controller.clear(t.render),
                    o.trigger(e, "beforeUpdate", l),
                    r.update(t, i, a),
                    o.trigger(e, "afterUpdate", l),
                    t.render && t.render.controller && (o.trigger(e, "beforeRender", l),
                    o.trigger(t, "beforeRender", l),
                    t.render.controller.world(t.render),
                    o.trigger(e, "afterRender", l),
                    o.trigger(t, "afterRender", l)),
                    o.trigger(e, "afterTick", l),
                    o.trigger(t, "afterTick", l)
                }
                ,
                i.stop = function(e) {
                    t(e.frameRequestId)
                }
                ,
                i.start = function(e, t) {
                    i.run(e, t)
                }
            }()
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(5)
              , r = n(8)
              , s = n(0)
              , a = n(6)
              , l = n(16);
            i.stack = function(e, t, n, i, r, s, l) {
                for (var c, d = o.create({
                    label: "Stack"
                }), u = e, p = t, f = 0, v = 0; v < i; v++) {
                    for (var m = 0, y = 0; y < n; y++) {
                        var g = l(u, p, y, v, c, f);
                        if (g) {
                            var x = g.bounds.max.y - g.bounds.min.y
                              , h = g.bounds.max.x - g.bounds.min.x;
                            x > m && (m = x),
                            a.translate(g, {
                                x: .5 * h,
                                y: .5 * x
                            }),
                            u = g.bounds.max.x + r,
                            o.addBody(d, g),
                            c = g,
                            f += 1
                        } else
                            u += r
                    }
                    p += m + s,
                    u = e
                }
                return d
            }
            ,
            i.chain = function(e, t, n, i, a, l) {
                for (var c = e.bodies, d = 1; d < c.length; d++) {
                    var u = c[d - 1]
                      , p = c[d]
                      , f = u.bounds.max.y - u.bounds.min.y
                      , v = u.bounds.max.x - u.bounds.min.x
                      , m = p.bounds.max.y - p.bounds.min.y
                      , y = {
                        bodyA: u,
                        pointA: {
                            x: v * t,
                            y: f * n
                        },
                        bodyB: p,
                        pointB: {
                            x: (p.bounds.max.x - p.bounds.min.x) * i,
                            y: m * a
                        }
                    }
                      , g = s.extend(y, l);
                    o.addConstraint(e, r.create(g))
                }
                return e.label += " Chain",
                e
            }
            ,
            i.mesh = function(e, t, n, i, a) {
                var l, c, d, u, p, f = e.bodies;
                for (l = 0; l < n; l++) {
                    for (c = 1; c < t; c++)
                        d = f[c - 1 + l * t],
                        u = f[c + l * t],
                        o.addConstraint(e, r.create(s.extend({
                            bodyA: d,
                            bodyB: u
                        }, a)));
                    if (l > 0)
                        for (c = 0; c < t; c++)
                            d = f[c + (l - 1) * t],
                            u = f[c + l * t],
                            o.addConstraint(e, r.create(s.extend({
                                bodyA: d,
                                bodyB: u
                            }, a))),
                            i && c > 0 && (p = f[c - 1 + (l - 1) * t],
                            o.addConstraint(e, r.create(s.extend({
                                bodyA: p,
                                bodyB: u
                            }, a)))),
                            i && c < t - 1 && (p = f[c + 1 + (l - 1) * t],
                            o.addConstraint(e, r.create(s.extend({
                                bodyA: p,
                                bodyB: u
                            }, a))))
                }
                return e.label += " Mesh",
                e
            }
            ,
            i.pyramid = function(e, t, n, o, r, s, l) {
                return i.stack(e, t, n, o, r, s, function(t, i, s, c, d, u) {
                    var p = Math.min(o, Math.ceil(n / 2))
                      , f = d ? d.bounds.max.x - d.bounds.min.x : 0;
                    if (!(c > p || s < (c = p - c) || s > n - 1 - c))
                        return 1 === u && a.translate(d, {
                            x: (s + (n % 2 == 1 ? 1 : -1)) * f,
                            y: 0
                        }),
                        l(e + (d ? s * f : 0) + s * r, i, s, c, d, u)
                })
            }
            ,
            i.newtonsCradle = function(e, t, n, i, s) {
                for (var a = o.create({
                    label: "Newtons Cradle"
                }), c = 0; c < n; c++) {
                    var d = l.circle(e + c * (1.9 * i), t + s, i, {
                        inertia: 1 / 0,
                        restitution: 1,
                        friction: 0,
                        frictionAir: 1e-4,
                        slop: 1
                    })
                      , u = r.create({
                        pointA: {
                            x: e + c * (1.9 * i),
                            y: t
                        },
                        bodyB: d
                    });
                    o.addBody(a, d),
                    o.addConstraint(a, u)
                }
                return a
            }
            ,
            i.car = function(e, t, n, i, s) {
                var c = a.nextGroup(!0)
                  , d = .5 * -n + 20
                  , u = .5 * n - 20
                  , p = o.create({
                    label: "Car"
                })
                  , f = l.rectangle(e, t, n, i, {
                    collisionFilter: {
                        group: c
                    },
                    chamfer: {
                        radius: .5 * i
                    },
                    density: 2e-4
                })
                  , v = l.circle(e + d, t + 0, s, {
                    collisionFilter: {
                        group: c
                    },
                    friction: .8
                })
                  , m = l.circle(e + u, t + 0, s, {
                    collisionFilter: {
                        group: c
                    },
                    friction: .8
                })
                  , y = r.create({
                    bodyB: f,
                    pointB: {
                        x: d,
                        y: 0
                    },
                    bodyA: v,
                    stiffness: 1,
                    length: 0
                })
                  , g = r.create({
                    bodyB: f,
                    pointB: {
                        x: u,
                        y: 0
                    },
                    bodyA: m,
                    stiffness: 1,
                    length: 0
                });
                return o.addBody(p, f),
                o.addBody(p, v),
                o.addBody(p, m),
                o.addConstraint(p, y),
                o.addConstraint(p, g),
                p
            }
            ,
            i.softBody = function(e, t, n, o, r, a, c, d, u, p) {
                u = s.extend({
                    inertia: 1 / 0
                }, u),
                p = s.extend({
                    stiffness: .2,
                    render: {
                        type: "line",
                        anchors: !1
                    }
                }, p);
                var f = i.stack(e, t, n, o, r, a, function(e, t) {
                    return l.circle(e, t, d, u)
                });
                return i.mesh(f, n, o, c, p),
                f.label = "Soft Body",
                f
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            n(1);
            var o = n(0);
            i.pathToVertices = function(e, t) {
                "undefined" == typeof window || "SVGPathSeg"in window || o.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
                var n, r, s, a, l, c, d, u, p, f, v, m = [], y = 0, g = 0, x = 0;
                t = t || 15;
                var h = function(e, t, n) {
                    var i = n % 2 == 1 && n > 1;
                    if (!p || e != p.x || t != p.y) {
                        p && i ? (f = p.x,
                        v = p.y) : (f = 0,
                        v = 0);
                        var o = {
                            x: f + e,
                            y: v + t
                        };
                        !i && p || (p = o),
                        m.push(o),
                        g = f + e,
                        x = v + t
                    }
                }
                  , b = function(e) {
                    var t = e.pathSegTypeAsLetter.toUpperCase();
                    if ("Z" !== t) {
                        switch (t) {
                        case "M":
                        case "L":
                        case "T":
                        case "C":
                        case "S":
                        case "Q":
                            g = e.x,
                            x = e.y;
                            break;
                        case "H":
                            g = e.x;
                            break;
                        case "V":
                            x = e.y;
                        }
                        h(g, x, e.pathSegType)
                    }
                };
                for (i._svgPathToAbsolute(e),
                s = e.getTotalLength(),
                c = [],
                n = 0; n < e.pathSegList.numberOfItems; n += 1)
                    c.push(e.pathSegList.getItem(n));
                for (d = c.concat(); y < s; ) {
                    if ((l = c[e.getPathSegAtLength(y)]) != u) {
                        for (; d.length && d[0] != l; )
                            b(d.shift());
                        u = l
                    }
                    switch (l.pathSegTypeAsLetter.toUpperCase()) {
                    case "C":
                    case "T":
                    case "S":
                    case "Q":
                    case "A":
                        a = e.getPointAtLength(y),
                        h(a.x, a.y, 0);
                    }
                    y += t
                }
                for (n = 0,
                r = d.length; n < r; ++n)
                    b(d[n]);
                return m
            }
            ,
            i._svgPathToAbsolute = function(e) {
                for (var t, n, i, o, r, s, a = e.pathSegList, l = 0, c = 0, d = a.numberOfItems, u = 0; u < d; ++u) {
                    var p = a.getItem(u)
                      , f = p.pathSegTypeAsLetter;
                    if (/[MLHVCSQTA]/.test(f))
                        "x"in p && (l = p.x),
                        "y"in p && (c = p.y);
                    else
                        switch ("x1"in p && (i = l + p.x1),
                        "x2"in p && (r = l + p.x2),
                        "y1"in p && (o = c + p.y1),
                        "y2"in p && (s = c + p.y2),
                        "x"in p && (l += p.x),
                        "y"in p && (c += p.y),
                        f) {
                        case "m":
                            a.replaceItem(e.createSVGPathSegMovetoAbs(l, c), u);
                            break;
                        case "l":
                            a.replaceItem(e.createSVGPathSegLinetoAbs(l, c), u);
                            break;
                        case "h":
                            a.replaceItem(e.createSVGPathSegLinetoHorizontalAbs(l), u);
                            break;
                        case "v":
                            a.replaceItem(e.createSVGPathSegLinetoVerticalAbs(c), u);
                            break;
                        case "c":
                            a.replaceItem(e.createSVGPathSegCurvetoCubicAbs(l, c, i, o, r, s), u);
                            break;
                        case "s":
                            a.replaceItem(e.createSVGPathSegCurvetoCubicSmoothAbs(l, c, r, s), u);
                            break;
                        case "q":
                            a.replaceItem(e.createSVGPathSegCurvetoQuadraticAbs(l, c, i, o), u);
                            break;
                        case "t":
                            a.replaceItem(e.createSVGPathSegCurvetoQuadraticSmoothAbs(l, c), u);
                            break;
                        case "a":
                            a.replaceItem(e.createSVGPathSegArcAbs(l, c, p.r1, p.r2, p.angle, p.largeArcFlag, p.sweepFlag), u);
                            break;
                        case "z":
                        case "Z":
                            l = t,
                            c = n;
                        }
                    "M" != f && "m" != f || (t = l,
                    n = c)
                }
            }
        }
        , function(e, t, n) {
            var i = {};
            e.exports = i;
            var o = n(1)
              , r = n(5)
              , s = n(0)
              , a = n(4)
              , l = n(2);
            !function() {
                var e, t;
                "undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                    window.setTimeout(function() {
                        e(s.now())
                    }, 1e3 / 60)
                }
                ,
                t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame),
                i.create = function(e) {
                    s.warn("RenderPixi.create: Matter.RenderPixi is deprecated (see docs)");
                    var t = {
                        controller: i,
                        engine: null,
                        element: null,
                        frameRequestId: null,
                        canvas: null,
                        renderer: null,
                        container: null,
                        spriteContainer: null,
                        pixiOptions: null,
                        options: {
                            width: 800,
                            height: 600,
                            background: "#fafafa",
                            wireframeBackground: "#222",
                            hasBounds: !1,
                            enabled: !0,
                            wireframes: !0,
                            showSleeping: !0,
                            showDebug: !1,
                            showBroadphase: !1,
                            showBounds: !1,
                            showVelocity: !1,
                            showCollisions: !1,
                            showAxes: !1,
                            showPositions: !1,
                            showAngleIndicator: !1,
                            showIds: !1,
                            showShadows: !1
                        }
                    }
                      , n = s.extend(t, e)
                      , o = !n.options.wireframes && "transparent" === n.options.background;
                    return n.pixiOptions = n.pixiOptions || {
                        view: n.canvas,
                        transparent: o,
                        antialias: !0,
                        backgroundColor: e.background
                    },
                    n.mouse = e.mouse,
                    n.engine = e.engine,
                    n.renderer = n.renderer || new PIXI.WebGLRenderer(n.options.width,n.options.height,n.pixiOptions),
                    n.container = n.container || new PIXI.Container,
                    n.spriteContainer = n.spriteContainer || new PIXI.Container,
                    n.canvas = n.canvas || n.renderer.view,
                    n.bounds = n.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: n.options.width,
                            y: n.options.height
                        }
                    },
                    a.on(n.engine, "beforeUpdate", function() {
                        i.clear(n)
                    }),
                    n.textures = {},
                    n.sprites = {},
                    n.primitives = {},
                    n.container.addChild(n.spriteContainer),
                    s.isElement(n.element) ? n.element.appendChild(n.canvas) : s.warn("No \"render.element\" passed, \"render.canvas\" was not inserted into document."),
                    n.canvas.oncontextmenu = function() {
                        return !1
                    }
                    ,
                    n.canvas.onselectstart = function() {
                        return !1
                    }
                    ,
                    n
                }
                ,
                i.run = function(t) {
                    !function n(o) {
                        t.frameRequestId = e(n),
                        i.world(t)
                    }()
                }
                ,
                i.stop = function(e) {
                    t(e.frameRequestId)
                }
                ,
                i.clear = function(e) {
                    for (var t = e.container, n = e.spriteContainer; t.children[0]; )
                        t.removeChild(t.children[0]);
                    for (; n.children[0]; )
                        n.removeChild(n.children[0]);
                    var i = e.sprites["bg-0"];
                    e.textures = {},
                    e.sprites = {},
                    e.primitives = {},
                    e.sprites["bg-0"] = i,
                    i && t.addChildAt(i, 0),
                    e.container.addChild(e.spriteContainer),
                    e.currentBackground = null,
                    t.scale.set(1, 1),
                    t.position.set(0, 0)
                }
                ,
                i.setBackground = function(e, t) {
                    if (e.currentBackground !== t) {
                        var n = t.indexOf && -1 !== t.indexOf("#")
                          , i = e.sprites["bg-0"];
                        if (n) {
                            var o = s.colorToNumber(t);
                            e.renderer.backgroundColor = o,
                            i && e.container.removeChild(i)
                        } else if (!i) {
                            var r = d(e, t);
                            (i = e.sprites["bg-0"] = new PIXI.Sprite(r)).position.x = 0,
                            i.position.y = 0,
                            e.container.addChildAt(i, 0)
                        }
                        e.currentBackground = t
                    }
                }
                ,
                i.world = function(e) {
                    var t, n = e.engine.world, s = e.renderer, a = e.container, c = e.options, d = r.allBodies(n), u = r.allConstraints(n), p = [];
                    c.wireframes ? i.setBackground(e, c.wireframeBackground) : i.setBackground(e, c.background);
                    var f = e.bounds.max.x - e.bounds.min.x
                      , v = e.bounds.max.y - e.bounds.min.y
                      , m = f / e.options.width
                      , y = v / e.options.height;
                    if (c.hasBounds) {
                        for (t = 0; t < d.length; t++) {
                            var g = d[t];
                            g.render.sprite.visible = o.overlaps(g.bounds, e.bounds)
                        }
                        for (t = 0; t < u.length; t++) {
                            var x = u[t]
                              , h = x.bodyA
                              , b = x.bodyB
                              , w = x.pointA
                              , S = x.pointB;
                            h && (w = l.add(h.position, x.pointA)),
                            b && (S = l.add(b.position, x.pointB)),
                            w && S && (o.contains(e.bounds, w) || o.contains(e.bounds, S)) && p.push(x)
                        }
                        a.scale.set(1 / m, 1 / y),
                        a.position.set(-e.bounds.min.x * (1 / m), -e.bounds.min.y * (1 / y))
                    } else
                        p = u;
                    for (t = 0; t < d.length; t++)
                        i.body(e, d[t]);
                    for (t = 0; t < p.length; t++)
                        i.constraint(e, p[t]);
                    s.render(a)
                }
                ,
                i.constraint = function(e, t) {
                    e.engine;
                    var n = t.bodyA
                      , i = t.bodyB
                      , o = t.pointA
                      , r = t.pointB
                      , a = e.container
                      , l = t.render
                      , c = "c-" + t.id
                      , d = e.primitives[c];
                    d || (d = e.primitives[c] = new PIXI.Graphics),
                    l.visible && t.pointA && t.pointB ? (-1 === s.indexOf(a.children, d) && a.addChild(d),
                    d.clear(),
                    d.beginFill(0, 0),
                    d.lineStyle(l.lineWidth, s.colorToNumber(l.strokeStyle), 1),
                    n ? d.moveTo(n.position.x + o.x, n.position.y + o.y) : d.moveTo(o.x, o.y),
                    i ? d.lineTo(i.position.x + r.x, i.position.y + r.y) : d.lineTo(r.x, r.y),
                    d.endFill()) : d.clear()
                }
                ,
                i.body = function(e, t) {
                    e.engine;
                    var i = t.render;
                    if (i.visible)
                        if (i.sprite && i.sprite.texture) {
                            var o = "b-" + t.id
                              , r = e.sprites[o]
                              , a = e.spriteContainer;
                            r || (r = e.sprites[o] = n(e, t)),
                            -1 === s.indexOf(a.children, r) && a.addChild(r),
                            r.position.x = t.position.x,
                            r.position.y = t.position.y,
                            r.rotation = t.angle,
                            r.scale.x = i.sprite.xScale || 1,
                            r.scale.y = i.sprite.yScale || 1
                        } else {
                            var l = "b-" + t.id
                              , d = e.primitives[l]
                              , u = e.container;
                            d || ((d = e.primitives[l] = c(e, t)).initialAngle = t.angle),
                            -1 === s.indexOf(u.children, d) && u.addChild(d),
                            d.position.x = t.position.x,
                            d.position.y = t.position.y,
                            d.rotation = t.angle - d.initialAngle
                        }
                }
                ;
                var n = function(e, t) {
                    var n = t.render.sprite.texture
                      , i = d(e, n)
                      , o = new PIXI.Sprite(i);
                    return o.anchor.x = t.render.sprite.xOffset,
                    o.anchor.y = t.render.sprite.yOffset,
                    o
                }
                  , c = function(e, t) {
                    var n, i = t.render, o = e.options, r = new PIXI.Graphics, a = s.colorToNumber(i.fillStyle), l = s.colorToNumber(i.strokeStyle), c = s.colorToNumber(i.strokeStyle), d = s.colorToNumber("#bbb"), u = s.colorToNumber("#CD5C5C");
                    r.clear();
                    for (var p = t.parts.length > 1 ? 1 : 0; p < t.parts.length; p++) {
                        n = t.parts[p],
                        o.wireframes ? (r.beginFill(0, 0),
                        r.lineStyle(1, d, 1)) : (r.beginFill(a, 1),
                        r.lineStyle(i.lineWidth, l, 1)),
                        r.moveTo(n.vertices[0].x - t.position.x, n.vertices[0].y - t.position.y);
                        for (var f = 1; f < n.vertices.length; f++)
                            r.lineTo(n.vertices[f].x - t.position.x, n.vertices[f].y - t.position.y);
                        r.lineTo(n.vertices[0].x - t.position.x, n.vertices[0].y - t.position.y),
                        r.endFill(),
                        (o.showAngleIndicator || o.showAxes) && (r.beginFill(0, 0),
                        o.wireframes ? r.lineStyle(1, u, 1) : r.lineStyle(1, c),
                        r.moveTo(n.position.x - t.position.x, n.position.y - t.position.y),
                        r.lineTo((n.vertices[0].x + n.vertices[n.vertices.length - 1].x) / 2 - t.position.x, (n.vertices[0].y + n.vertices[n.vertices.length - 1].y) / 2 - t.position.y),
                        r.endFill())
                    }
                    return r
                }
                  , d = function(e, t) {
                    var n = e.textures[t];
                    return n || (n = e.textures[t] = PIXI.Texture.fromImage(t)),
                    n
                }
            }()
        }
        ])
    });
    var a = function() {
        function e(e) {
            this._engine = ha.Engine.create(),
            this._pixiObjects = [],
            ha.Engine.run(this.engine);
            var t = ha.MouseConstraint.create(this.engine, {
                mouse: ha.Mouse.create(e.stage)
            });
            ha.World.add(this.engine.world, t)
        }
        return Object.defineProperty(e.prototype, "engine", {
            get: function() {
                return this._engine
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "pixiObjects", {
            get: function() {
                return this._pixiObjects
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.update = function() {
            this._pixiObjects.forEach(function(e) {
                return e.update()
            })
        }
        ,
        e.prototype.addToWorld = function() {
            for (var e = this, t = [], i = 0; i < arguments.length; i++)
                t[i] = arguments[i];
            t.forEach(function(t) {
                return ha.World.addBody(e.engine.world, t.body)
            }),
            this._pixiObjects = this._pixiObjects.concat(t)
        }
        ,
        e.prototype.removeFromWorld = function() {
            for (var e = this, t = [], i = 0; i < arguments.length; i++)
                t[i] = arguments[i];
            t.forEach(function(t) {
                return ha.World.remove(e.engine.world, t.body)
            }),
            this._pixiObjects = this._pixiObjects.filter(function(e) {
                return !t.includes(e)
            })
        }
        ,
        e
    }();
    var b = function() {
        function i(i, t, e) {
            void 0 === t && (t = {});
            var o = i.x
              , s = i.y
              , r = i.width
              , p = i.height;
            i.texture;
            this._sprite = i,
            this._update = e,
            this.physicsOptions = t,
            t.isCircle ? this._body = ha.Bodies.circle(o, s, r / 2, t) : this._body = ha.Bodies.rectangle(o, s, r, p, t)
        }
        return Object.defineProperty(i.prototype, "body", {
            get: function() {
                return this._body
            },
            enumerable: !1,
            configurable: !0
        }),
        i.prototype.update = function() {
            this._update ? this._update({
                position: this._body.position,
                rotation: this._body.angle
            }) : (this._sprite.position = this._body.position,
            this._sprite.rotation = this._body.angle)
        }
        ,
        i
    }();
    var Nb = {};
    var ue, ve, Fa, Ga;
    var Ob = /iPhone/i
      , Ic = /iPod/i
      , Jc = /iPad/i
      , Kc = /\biOS-universal(?:.+)Mac\b/i
      , Pb = /\bAndroid(?:.+)Mobile\b/i
      , Lc = /Android/i
      , Ra = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i
      , ib = /Silk/i
      , wa = /Windows Phone/i
      , Mc = /\bWindows(?:.+)ARM\b/i
      , Nc = /BlackBerry/i
      , Oc = /BB10/i
      , Pc = /Opera Mini/i
      , Qc = /\b(CriOS|Chrome)(?:.+)Mobile/i
      , Rc = /Mobile(?:.+)Firefox\b/i
      , Sc = function($) {
        return void 0 !== $ && "MacIntel" === $.platform && "number" == typeof $.maxTouchPoints && $.maxTouchPoints > 1 && "undefined" == typeof MSStream
    };
    function we($) {
        return function(a) {
            return a.test($)
        }
    }
    function xe($) {
        var a = {
            userAgent: "",
            platform: "",
            maxTouchPoints: 0
        };
        $ || "undefined" == typeof navigator ? "string" == typeof $ ? a.userAgent = $ : $ && $.userAgent && (a = {
            userAgent: $.userAgent,
            platform: $.platform,
            maxTouchPoints: $.maxTouchPoints || 0
        }) : a = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            maxTouchPoints: navigator.maxTouchPoints || 0
        };
        var e = a.userAgent
          , r = e.split("[FBAN");
        void 0 !== r[1] && (e = r[0]),
        void 0 !== (r = e.split("Twitter"))[1] && (e = r[0]);
        var o = we(e)
          , v = {
            apple: {
                phone: o(Ob) && !o(wa),
                ipod: o(Ic),
                tablet: !o(Ob) && (o(Jc) || Sc(a)) && !o(wa),
                universal: o(Kc),
                device: (o(Ob) || o(Ic) || o(Jc) || o(Kc) || Sc(a)) && !o(wa)
            },
            amazon: {
                phone: o(Ra),
                tablet: !o(Ra) && o(ib),
                device: o(Ra) || o(ib)
            },
            android: {
                phone: !o(wa) && o(Ra) || !o(wa) && o(Pb),
                tablet: !o(wa) && !o(Ra) && !o(Pb) && (o(ib) || o(Lc)),
                device: !o(wa) && (o(Ra) || o(ib) || o(Pb) || o(Lc)) || o(/\bokhttp\b/i)
            },
            windows: {
                phone: o(wa),
                tablet: o(Mc),
                device: o(wa) || o(Mc)
            },
            other: {
                blackberry: o(Nc),
                blackberry10: o(Oc),
                opera: o(Pc),
                firefox: o(Rc),
                chrome: o(Qc),
                device: o(Nc) || o(Oc) || o(Pc) || o(Rc) || o(Qc)
            },
            any: !1,
            phone: !1,
            tablet: !1
        };
        return v.any = v.apple.device || v.android.device || v.windows.device || v.other.device,
        v.phone = v.apple.phone || v.android.phone || v.windows.phone,
        v.tablet = v.apple.tablet || v.android.tablet || v.windows.tablet,
        v
    }
    var Ha = xe(self.navigator);
    function ye(e) {
        var i = !0;
        if (Ha.tablet || Ha.phone) {
            var r;
            if (Ha.apple.device)
                if (r = navigator.userAgent.match(/OS (\d+)_(\d+)?/))
                    parseInt(r[1], 10) < 11 && (i = !1);
            if (Ha.android.device)
                if (r = navigator.userAgent.match(/Android\s([0-9.]*)/))
                    parseInt(r[1], 10) < 7 && (i = !1)
        }
        return i ? e : 4
    }
    function ze() {
        return !Ha.apple.device
    }
    var aa = {
        MIPMAP_TEXTURES: 1,
        ANISOTROPIC_LEVEL: 0,
        RESOLUTION: 1,
        FILTER_RESOLUTION: 1,
        SPRITE_MAX_TEXTURES: ye(32),
        SPRITE_BATCH_SIZE: 4096,
        RENDER_OPTIONS: {
            view: null,
            antialias: !1,
            autoDensity: !1,
            backgroundColor: 0,
            backgroundAlpha: 1,
            useContextAlpha: !0,
            clearBeforeRender: !0,
            preserveDrawingBuffer: !1,
            width: 800,
            height: 600,
            legacy: !1
        },
        GC_MODE: 0,
        GC_MAX_IDLE: 3600,
        GC_MAX_CHECK_COUNT: 600,
        WRAP_MODE: 33071,
        SCALE_MODE: 1,
        PRECISION_VERTEX: "highp",
        PRECISION_FRAGMENT: Ha.apple.device ? "highp" : "mediump",
        CAN_UPLOAD_SAME_BUFFER: ze(),
        CREATE_IMAGE_BITMAP: !1,
        ROUND_PIXELS: !1
    };
    var Ae, Be, Ce, De, Ee, Fe, Ge, He, Ie, Je, Ke, Le, Me, Ne, Oe, Pe, Qe, Aa, jb, Qb, K, Ba, kb, Sa, ua, Ca, Rb, $a, Ia, Ja, Tc, xa, qa, _a;
    !function(E) {
        E[E.WEBGL_LEGACY = 0] = "WEBGL_LEGACY",
        E[E.WEBGL = 1] = "WEBGL",
        E[E.WEBGL2 = 2] = "WEBGL2"
    }(Aa || (Fe = Aa = {},
    Fe)),
    function(E) {
        E[E.UNKNOWN = 0] = "UNKNOWN",
        E[E.WEBGL = 1] = "WEBGL",
        E[E.CANVAS = 2] = "CANVAS"
    }(jb || (Me = jb = {},
    Me)),
    function(E) {
        E[E.COLOR = 16384] = "COLOR",
        E[E.DEPTH = 256] = "DEPTH",
        E[E.STENCIL = 1024] = "STENCIL"
    }(Qb || (Ce = Qb = {},
    Ce)),
    function(E) {
        E[E.NORMAL = 0] = "NORMAL",
        E[E.ADD = 1] = "ADD",
        E[E.MULTIPLY = 2] = "MULTIPLY",
        E[E.SCREEN = 3] = "SCREEN",
        E[E.OVERLAY = 4] = "OVERLAY",
        E[E.DARKEN = 5] = "DARKEN",
        E[E.LIGHTEN = 6] = "LIGHTEN",
        E[E.COLOR_DODGE = 7] = "COLOR_DODGE",
        E[E.COLOR_BURN = 8] = "COLOR_BURN",
        E[E.HARD_LIGHT = 9] = "HARD_LIGHT",
        E[E.SOFT_LIGHT = 10] = "SOFT_LIGHT",
        E[E.DIFFERENCE = 11] = "DIFFERENCE",
        E[E.EXCLUSION = 12] = "EXCLUSION",
        E[E.HUE = 13] = "HUE",
        E[E.SATURATION = 14] = "SATURATION",
        E[E.COLOR = 15] = "COLOR",
        E[E.LUMINOSITY = 16] = "LUMINOSITY",
        E[E.NORMAL_NPM = 17] = "NORMAL_NPM",
        E[E.ADD_NPM = 18] = "ADD_NPM",
        E[E.SCREEN_NPM = 19] = "SCREEN_NPM",
        E[E.NONE = 20] = "NONE",
        E[E.SRC_OVER = 0] = "SRC_OVER",
        E[E.SRC_IN = 21] = "SRC_IN",
        E[E.SRC_OUT = 22] = "SRC_OUT",
        E[E.SRC_ATOP = 23] = "SRC_ATOP",
        E[E.DST_OVER = 24] = "DST_OVER",
        E[E.DST_IN = 25] = "DST_IN",
        E[E.DST_OUT = 26] = "DST_OUT",
        E[E.DST_ATOP = 27] = "DST_ATOP",
        E[E.ERASE = 26] = "ERASE",
        E[E.SUBTRACT = 28] = "SUBTRACT",
        E[E.XOR = 29] = "XOR"
    }(K || (Be = K = {},
    Be)),
    function(E) {
        E[E.POINTS = 0] = "POINTS",
        E[E.LINES = 1] = "LINES",
        E[E.LINE_LOOP = 2] = "LINE_LOOP",
        E[E.LINE_STRIP = 3] = "LINE_STRIP",
        E[E.TRIANGLES = 4] = "TRIANGLES",
        E[E.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP",
        E[E.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
    }(Ba || (Ee = Ba = {},
    Ee)),
    function(E) {
        E[E.RGBA = 6408] = "RGBA",
        E[E.RGB = 6407] = "RGB",
        E[E.ALPHA = 6406] = "ALPHA",
        E[E.LUMINANCE = 6409] = "LUMINANCE",
        E[E.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA",
        E[E.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT",
        E[E.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
    }(kb || (Ge = kb = {},
    Ge)),
    function(E) {
        E[E.TEXTURE_2D = 3553] = "TEXTURE_2D",
        E[E.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP",
        E[E.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY",
        E[E.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X",
        E[E.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X",
        E[E.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y",
        E[E.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y",
        E[E.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z",
        E[E.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
    }(Sa || (Oe = Sa = {},
    Oe)),
    function(E) {
        E[E.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE",
        E[E.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT",
        E[E.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5",
        E[E.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4",
        E[E.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1",
        E[E.FLOAT = 5126] = "FLOAT",
        E[E.HALF_FLOAT = 36193] = "HALF_FLOAT"
    }(ua || (Pe = ua = {},
    Pe)),
    function(E) {
        E[E.NEAREST = 0] = "NEAREST",
        E[E.LINEAR = 1] = "LINEAR"
    }(Ca || (Ne = Ca = {},
    Ne)),
    function(E) {
        E[E.CLAMP = 33071] = "CLAMP",
        E[E.REPEAT = 10497] = "REPEAT",
        E[E.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
    }(Rb || (Qe = Rb = {},
    Qe)),
    function(E) {
        E[E.OFF = 0] = "OFF",
        E[E.POW2 = 1] = "POW2",
        E[E.ON = 2] = "ON",
        E[E.ON_MANUAL = 3] = "ON_MANUAL"
    }($a || (Je = $a = {},
    Je)),
    function(E) {
        E[E.NPM = 0] = "NPM",
        E[E.UNPACK = 1] = "UNPACK",
        E[E.PMA = 2] = "PMA",
        E[E.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA",
        E[E.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD",
        E[E.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA"
    }(Ia || (Ae = Ia = {},
    Ae)),
    function(E) {
        E[E.NO = 0] = "NO",
        E[E.YES = 1] = "YES",
        E[E.AUTO = 2] = "AUTO",
        E[E.BLEND = 0] = "BLEND",
        E[E.CLEAR = 1] = "CLEAR",
        E[E.BLIT = 2] = "BLIT"
    }(Ja || (De = Ja = {},
    De)),
    function(E) {
        E[E.AUTO = 0] = "AUTO",
        E[E.MANUAL = 1] = "MANUAL"
    }(Tc || (He = Tc = {},
    He)),
    function(E) {
        E.LOW = "lowp",
        E.MEDIUM = "mediump",
        E.HIGH = "highp"
    }(xa || (Le = xa = {},
    Le)),
    function(E) {
        E[E.NONE = 0] = "NONE",
        E[E.SCISSOR = 1] = "SCISSOR",
        E[E.STENCIL = 2] = "STENCIL",
        E[E.SPRITE = 3] = "SPRITE"
    }(qa || (Ie = qa = {},
    Ie)),
    function(E) {
        E[E.NONE = 0] = "NONE",
        E[E.LOW = 2] = "LOW",
        E[E.MEDIUM = 4] = "MEDIUM",
        E[E.HIGH = 8] = "HIGH"
    }(_a || (Ke = _a = {},
    Ke));
    var Re = {}
      , Se = Object.prototype.hasOwnProperty
      , na = "~";
    function ab() {}
    function Te(e, t, r) {
        this.fn = e,
        this.context = t,
        this.once = r || !1
    }
    function Uc(e, t, r, n, $) {
        if ("function" != typeof r)
            throw new TypeError("The listener must be a function");
        var v = new Te(r,n || e,$)
          , a = na ? na + t : t;
        return e._events[a] ? e._events[a].fn ? e._events[a] = [e._events[a], v] : e._events[a].push(v) : (e._events[a] = v,
        e._eventsCount++),
        e
    }
    function lb(e, t) {
        0 == --e._eventsCount ? e._events = new ab : delete e._events[t]
    }
    function ja() {
        this._events = new ab,
        this._eventsCount = 0
    }
    Object.create && (ab.prototype = Object.create(null),
    new ab().__proto__ || (na = !1)),
    ja.prototype.eventNames = function() {
        var e, t, r = [];
        if (0 === this._eventsCount)
            return r;
        for (t in e = this._events)
            Se.call(e, t) && r.push(na ? t.slice(1) : t);
        return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
    }
    ,
    ja.prototype.listeners = function(e) {
        var t = na ? na + e : e
          , r = this._events[t];
        if (!r)
            return [];
        if (r.fn)
            return [r.fn];
        for (var n = 0, $ = r.length, v = new Array($); n < $; n++)
            v[n] = r[n].fn;
        return v
    }
    ,
    ja.prototype.listenerCount = function(e) {
        var t = na ? na + e : e
          , r = this._events[t];
        return r ? r.fn ? 1 : r.length : 0
    }
    ,
    ja.prototype.emit = function(e, t, r, n, $, v) {
        var a = na ? na + e : e;
        if (!this._events[a])
            return !1;
        var i, J, l = this._events[a], s = arguments.length;
        if (l.fn) {
            switch (l.once && this.removeListener(e, l.fn, void 0, !0),
            s) {
            case 1:
                return l.fn.call(l.context),
                !0;
            case 2:
                return l.fn.call(l.context, t),
                !0;
            case 3:
                return l.fn.call(l.context, t, r),
                !0;
            case 4:
                return l.fn.call(l.context, t, r, n),
                !0;
            case 5:
                return l.fn.call(l.context, t, r, n, $),
                !0;
            case 6:
                return l.fn.call(l.context, t, r, n, $, v),
                !0;
            }
            for (J = 1,
            i = new Array(s - 1); J < s; J++)
                i[J - 1] = arguments[J];
            l.fn.apply(l.context, i)
        } else {
            var o, f = l.length;
            for (J = 0; J < f; J++)
                switch (l[J].once && this.removeListener(e, l[J].fn, void 0, !0),
                s) {
                case 1:
                    l[J].fn.call(l[J].context);
                    break;
                case 2:
                    l[J].fn.call(l[J].context, t);
                    break;
                case 3:
                    l[J].fn.call(l[J].context, t, r);
                    break;
                case 4:
                    l[J].fn.call(l[J].context, t, r, n);
                    break;
                default:
                    if (!i)
                        for (o = 1,
                        i = new Array(s - 1); o < s; o++)
                            i[o - 1] = arguments[o];
                    l[J].fn.apply(l[J].context, i);
                }
        }
        return !0
    }
    ,
    ja.prototype.on = function(e, t, r) {
        return Uc(this, e, t, r, !1)
    }
    ,
    ja.prototype.once = function(e, t, r) {
        return Uc(this, e, t, r, !0)
    }
    ,
    ja.prototype.removeListener = function(e, t, r, n) {
        var $ = na ? na + e : e;
        if (!this._events[$])
            return this;
        if (!t)
            return lb(this, $),
            this;
        var v = this._events[$];
        if (v.fn)
            v.fn !== t || n && !v.once || r && v.context !== r || lb(this, $);
        else {
            for (var a = 0, i = [], J = v.length; a < J; a++)
                (v[a].fn !== t || n && !v[a].once || r && v[a].context !== r) && i.push(v[a]);
            i.length ? this._events[$] = 1 === i.length ? i[0] : i : lb(this, $)
        }
        return this
    }
    ,
    ja.prototype.removeAllListeners = function(e) {
        var t;
        return e ? (t = na ? na + e : e,
        this._events[t] && lb(this, t)) : (this._events = new ab,
        this._eventsCount = 0),
        this
    }
    ,
    ja.prototype.off = ja.prototype.removeListener,
    ja.prototype.addListener = ja.prototype.on,
    ja.prefixed = na,
    ja.EventEmitter = ja,
    Re = ja;
    var Ue = {};
    function mb(v, r, e) {
        e = e || 2;
        var $, n, t, a, i, h, x, o = r && r.length, w = o ? r[0] * e : v.length, l = Vc(v, 0, w, e, !0), u = [];
        if (!l || l.next === l.prev)
            return u;
        if (o && (l = Ze(v, r, l, e)),
        v.length > 80 * e) {
            $ = t = v[0],
            n = a = v[1];
            for (var s = e; s < w; s += e)
                (i = v[s]) < $ && ($ = i),
                (h = v[s + 1]) < n && (n = h),
                i > t && (t = i),
                h > a && (a = h);
            x = 0 !== (x = Math.max(t - $, a - n)) ? 1 / x : 0
        }
        return bb(l, u, e, $, n, x),
        u
    }
    function Vc(v, r, e, $, n) {
        var t, a;
        if (n === Ub(v, r, e, $) > 0)
            for (t = r; t < e; t += $)
                a = Yc(t, v[t], v[t + 1], a);
        else
            for (t = e - $; t >= r; t -= $)
                a = Yc(t, v[t], v[t + 1], a);
        return a && nb(a, a.next) && (db(a),
        a = a.next),
        a
    }
    function Da(v, r) {
        if (!v)
            return v;
        r || (r = v);
        var e, $ = v;
        do {
            if (e = !1,
            $.steiner || !nb($, $.next) && 0 !== ca($.prev, $, $.next))
                $ = $.next;
            else {
                if (db($),
                ($ = r = $.prev) === $.next)
                    break;
                e = !0
            }
        } while (e || $ !== r);
        return r
    }
    function bb(v, r, e, $, n, t, a) {
        if (v) {
            !a && t && cf(v, $, n, t);
            for (var i, h, x = v; v.prev !== v.next; )
                if (i = v.prev,
                h = v.next,
                t ? We(v, $, n, t) : Ve(v))
                    r.push(i.i / e),
                    r.push(v.i / e),
                    r.push(h.i / e),
                    db(v),
                    v = h.next,
                    x = h.next;
                else if ((v = h) === x) {
                    a ? 1 === a ? bb(v = Xe(Da(v), r, e), r, e, $, n, t, 2) : 2 === a && Ye(v, r, e, $, n, t) : bb(Da(v), r, e, $, n, t, 1);
                    break
                }
        }
    }
    function Ve(v) {
        var r = v.prev
          , e = v
          , $ = v.next;
        if (ca(r, e, $) >= 0)
            return !1;
        for (var n = v.next.next; n !== v.prev; ) {
            if (Ta(r.x, r.y, e.x, e.y, $.x, $.y, n.x, n.y) && ca(n.prev, n, n.next) >= 0)
                return !1;
            n = n.next
        }
        return !0
    }
    function We(v, r, e, $) {
        var n = v.prev
          , t = v
          , a = v.next;
        if (ca(n, t, a) >= 0)
            return !1;
        for (var i = n.x < t.x ? n.x < a.x ? n.x : a.x : t.x < a.x ? t.x : a.x, h = n.y < t.y ? n.y < a.y ? n.y : a.y : t.y < a.y ? t.y : a.y, x = n.x > t.x ? n.x > a.x ? n.x : a.x : t.x > a.x ? t.x : a.x, o = n.y > t.y ? n.y > a.y ? n.y : a.y : t.y > a.y ? t.y : a.y, w = Sb(i, h, r, e, $), l = Sb(x, o, r, e, $), u = v.prevZ, s = v.nextZ; u && u.z >= w && s && s.z <= l; ) {
            if (u !== v.prev && u !== v.next && Ta(n.x, n.y, t.x, t.y, a.x, a.y, u.x, u.y) && ca(u.prev, u, u.next) >= 0)
                return !1;
            if (u = u.prevZ,
            s !== v.prev && s !== v.next && Ta(n.x, n.y, t.x, t.y, a.x, a.y, s.x, s.y) && ca(s.prev, s, s.next) >= 0)
                return !1;
            s = s.nextZ
        }
        for (; u && u.z >= w; ) {
            if (u !== v.prev && u !== v.next && Ta(n.x, n.y, t.x, t.y, a.x, a.y, u.x, u.y) && ca(u.prev, u, u.next) >= 0)
                return !1;
            u = u.prevZ
        }
        for (; s && s.z <= l; ) {
            if (s !== v.prev && s !== v.next && Ta(n.x, n.y, t.x, t.y, a.x, a.y, s.x, s.y) && ca(s.prev, s, s.next) >= 0)
                return !1;
            s = s.nextZ
        }
        return !0
    }
    function Xe(v, r, e) {
        var $ = v;
        do {
            var n = $.prev
              , t = $.next.next;
            !nb(n, t) && Wc(n, $, $.next, t) && cb(n, t) && cb(t, n) && (r.push(n.i / e),
            r.push($.i / e),
            r.push(t.i / e),
            db($),
            db($.next),
            $ = v = t),
            $ = $.next
        } while ($ !== v);
        return Da($)
    }
    function Ye(v, r, e, $, n, t) {
        var a = v;
        do {
            for (var i = a.next.next; i !== a.prev; ) {
                if (a.i !== i.i && ff(a, i)) {
                    var h = Xc(a, i);
                    return a = Da(a, a.next),
                    h = Da(h, h.next),
                    bb(a, r, e, $, n, t),
                    void bb(h, r, e, $, n, t)
                }
                i = i.next
            }
            a = a.next
        } while (a !== v)
    }
    function Ze(v, r, e, $) {
        var n, t, a, i = [];
        for (n = 0,
        t = r.length; n < t; n++)
            (a = Vc(v, r[n] * $, n < t - 1 ? r[n + 1] * $ : v.length, $, !1)) === a.next && (a.steiner = !0),
            i.push(ef(a));
        for (i.sort($e),
        n = 0; n < i.length; n++)
            _e(i[n], e),
            e = Da(e, e.next);
        return e
    }
    function $e(v, r) {
        return v.x - r.x
    }
    function _e(v, r) {
        if (r = af(v, r)) {
            var e = Xc(r, v);
            Da(r, r.next),
            Da(e, e.next)
        }
    }
    function af(v, r) {
        var e, $ = r, n = v.x, t = v.y, a = -1 / 0;
        do {
            if (t <= $.y && t >= $.next.y && $.next.y !== $.y) {
                var i = $.x + (t - $.y) * ($.next.x - $.x) / ($.next.y - $.y);
                if (i <= n && i > a) {
                    if (a = i,
                    i === n) {
                        if (t === $.y)
                            return $;
                        if (t === $.next.y)
                            return $.next
                    }
                    e = $.x < $.next.x ? $ : $.next
                }
            }
            $ = $.next
        } while ($ !== r);
        if (!e)
            return null;
        if (n === a)
            return e;
        var h, x = e, o = e.x, w = e.y, l = 1 / 0;
        $ = e;
        do {
            n >= $.x && $.x >= o && n !== $.x && Ta(t < w ? n : a, t, o, w, t < w ? a : n, t, $.x, $.y) && (h = Math.abs(t - $.y) / (n - $.x),
            cb($, v) && (h < l || h === l && ($.x > e.x || $.x === e.x && bf(e, $))) && (e = $,
            l = h)),
            $ = $.next
        } while ($ !== x);
        return e
    }
    function bf(v, r) {
        return ca(v.prev, v, r.prev) < 0 && ca(r.next, v, v.next) < 0
    }
    function cf(v, r, e, $) {
        var n = v;
        do {
            null === n.z && (n.z = Sb(n.x, n.y, r, e, $)),
            n.prevZ = n.prev,
            n.nextZ = n.next,
            n = n.next
        } while (n !== v);
        n.prevZ.nextZ = null,
        n.prevZ = null,
        df(n)
    }
    function df(v) {
        var r, e, $, n, t, a, i, h, x = 1;
        do {
            for (e = v,
            v = null,
            t = null,
            a = 0; e; ) {
                for (a++,
                $ = e,
                i = 0,
                r = 0; r < x && (i++,
                $ = $.nextZ); r++)
                    ;
                for (h = x; i > 0 || h > 0 && $; )
                    0 !== i && (0 === h || !$ || e.z <= $.z) ? (n = e,
                    e = e.nextZ,
                    i--) : (n = $,
                    $ = $.nextZ,
                    h--),
                    t ? t.nextZ = n : v = n,
                    n.prevZ = t,
                    t = n;
                e = $
            }
            t.nextZ = null,
            x *= 2
        } while (a > 1);
        return v
    }
    function Sb(v, r, e, $, n) {
        return (v = 1431655765 & ((v = 858993459 & ((v = 252645135 & ((v = 16711935 & ((v = 32767 * (v - e) * n) | v << 8)) | v << 4)) | v << 2)) | v << 1)) | (r = 1431655765 & ((r = 858993459 & ((r = 252645135 & ((r = 16711935 & ((r = 32767 * (r - $) * n) | r << 8)) | r << 4)) | r << 2)) | r << 1)) << 1
    }
    function ef(v) {
        var r = v
          , e = v;
        do {
            (r.x < e.x || r.x === e.x && r.y < e.y) && (e = r),
            r = r.next
        } while (r !== v);
        return e
    }
    function Ta(v, r, e, $, n, t, a, i) {
        return (n - a) * (r - i) - (v - a) * (t - i) >= 0 && (v - a) * ($ - i) - (e - a) * (r - i) >= 0 && (e - a) * (t - i) - (n - a) * ($ - i) >= 0
    }
    function ff(v, r) {
        return v.next.i !== r.i && v.prev.i !== r.i && !gf(v, r) && (cb(v, r) && cb(r, v) && hf(v, r) && (ca(v.prev, v, r.prev) || ca(v, r.prev, r)) || nb(v, r) && ca(v.prev, v, v.next) > 0 && ca(r.prev, r, r.next) > 0)
    }
    function ca(v, r, e) {
        return (r.y - v.y) * (e.x - r.x) - (r.x - v.x) * (e.y - r.y)
    }
    function nb(v, r) {
        return v.x === r.x && v.y === r.y
    }
    function Wc(v, r, e, $) {
        var n = pb(ca(v, r, e))
          , t = pb(ca(v, r, $))
          , a = pb(ca(e, $, v))
          , i = pb(ca(e, $, r));
        return n !== t && a !== i || !(0 !== n || !ob(v, e, r)) || !(0 !== t || !ob(v, $, r)) || !(0 !== a || !ob(e, v, $)) || !(0 !== i || !ob(e, r, $))
    }
    function ob(v, r, e) {
        return r.x <= Math.max(v.x, e.x) && r.x >= Math.min(v.x, e.x) && r.y <= Math.max(v.y, e.y) && r.y >= Math.min(v.y, e.y)
    }
    function pb(v) {
        return v > 0 ? 1 : v < 0 ? -1 : 0
    }
    function gf(v, r) {
        var e = v;
        do {
            if (e.i !== v.i && e.next.i !== v.i && e.i !== r.i && e.next.i !== r.i && Wc(e, e.next, v, r))
                return !0;
            e = e.next
        } while (e !== v);
        return !1
    }
    function cb(v, r) {
        return ca(v.prev, v, v.next) < 0 ? ca(v, r, v.next) >= 0 && ca(v, v.prev, r) >= 0 : ca(v, r, v.prev) < 0 || ca(v, v.next, r) < 0
    }
    function hf(v, r) {
        var e = v
          , $ = !1
          , n = (v.x + r.x) / 2
          , t = (v.y + r.y) / 2;
        do {
            e.y > t != e.next.y > t && e.next.y !== e.y && n < (e.next.x - e.x) * (t - e.y) / (e.next.y - e.y) + e.x && ($ = !$),
            e = e.next
        } while (e !== v);
        return $
    }
    function Xc(v, r) {
        var e = new Tb(v.i,v.x,v.y)
          , $ = new Tb(r.i,r.x,r.y)
          , n = v.next
          , t = r.prev;
        return v.next = r,
        r.prev = v,
        e.next = n,
        n.prev = e,
        $.next = e,
        e.prev = $,
        t.next = $,
        $.prev = t,
        $
    }
    function Yc(v, r, e, $) {
        var n = new Tb(v,r,e);
        return $ ? (n.next = $.next,
        n.prev = $,
        $.next.prev = n,
        $.next = n) : (n.prev = n,
        n.next = n),
        n
    }
    function db(v) {
        v.next.prev = v.prev,
        v.prev.next = v.next,
        v.prevZ && (v.prevZ.nextZ = v.nextZ),
        v.nextZ && (v.nextZ.prevZ = v.prevZ)
    }
    function Tb(v, r, e) {
        this.i = v,
        this.x = r,
        this.y = e,
        this.prev = null,
        this.next = null,
        this.z = null,
        this.prevZ = null,
        this.nextZ = null,
        this.steiner = !1
    }
    function Ub(v, r, e, $) {
        for (var n = 0, t = r, a = e - $; t < e; t += $)
            n += (v[a] - v[t]) * (v[t + 1] + v[a + 1]),
            a = t;
        return n
    }
    (Ue = mb).default = mb,
    mb.deviation = function(v, r, e, $) {
        var n = r && r.length
          , t = n ? r[0] * e : v.length
          , a = Math.abs(Ub(v, 0, t, e));
        if (n)
            for (var i = 0, h = r.length; i < h; i++) {
                var x = r[i] * e
                  , o = i < h - 1 ? r[i + 1] * e : v.length;
                a -= Math.abs(Ub(v, x, o, e))
            }
        var w = 0;
        for (i = 0; i < $.length; i += 3) {
            var l = $[i] * e
              , u = $[i + 1] * e
              , s = $[i + 2] * e;
            w += Math.abs((v[l] - v[s]) * (v[u + 1] - v[l + 1]) - (v[l] - v[u]) * (v[s + 1] - v[l + 1]))
        }
        return 0 === a && 0 === w ? 0 : Math.abs((w - a) / a)
    }
    ,
    mb.flatten = function(v) {
        for (var r = v[0][0].length, e = {
            vertices: [],
            holes: [],
            dimensions: r
        }, $ = 0, n = 0; n < v.length; n++) {
            for (var t = 0; t < v[n].length; t++)
                for (var a = 0; a < r; a++)
                    e.vertices.push(v[n][t][a]);
            n > 0 && ($ += v[n - 1].length,
            e.holes.push($))
        }
        return e
    }
    ;
    var jf = function() {
        var o = this
          , e = {
            exports: this
        };
        return function(n) {
            var r = "object" == typeof o && o && !o.nodeType && o
              , t = "object" == typeof e && e && !e.nodeType && e
              , i = "object" == typeof Hc && Hc;
            i.global !== i && i.window !== i && i.self !== i || (n = i);
            var u, f, c = 2147483647, l = 36, s = 1, a = 26, p = 38, h = 700, d = 72, v = 128, g = "-", w = /^xn--/, x = /[^\x20-\x7E]/, b = /[\x2E\u3002\uFF0E\uFF61]/g, C = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, y = l - s, j = Math.floor, A = String.fromCharCode;
            function $(o) {
                throw new RangeError(C[o])
            }
            function I(o, e) {
                for (var n = o.length, r = []; n--; )
                    r[n] = e(o[n]);
                return r
            }
            function E(o, e) {
                var n = o.split("@")
                  , r = "";
                return n.length > 1 && (r = n[0] + "@",
                o = n[1]),
                r + I((o = o.replace(b, ".")).split("."), e).join(".")
            }
            function F(o) {
                for (var e, n, r = [], t = 0, i = o.length; t < i; )
                    (e = o.charCodeAt(t++)) >= 55296 && e <= 56319 && t < i ? 56320 == (64512 & (n = o.charCodeAt(t++))) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e),
                    t--) : r.push(e);
                return r
            }
            function O(o) {
                return I(o, function(o) {
                    var e = "";
                    return o > 65535 && (e += A((o -= 65536) >>> 10 & 1023 | 55296),
                    o = 56320 | 1023 & o),
                    e += A(o)
                }).join("")
            }
            function S(o, e) {
                return o + 22 + 75 * (o < 26) - ((0 != e) << 5)
            }
            function T(o, e, n) {
                var r = 0;
                for (o = n ? j(o / h) : o >> 1,
                o += j(o / e); o > y * a >> 1; r += l)
                    o = j(o / y);
                return j(r + (y + 1) * o / (o + p))
            }
            function m(o) {
                var e, n, r, t, i, u, f, p, h, w, x, b = [], C = o.length, y = 0, A = v, I = d;
                for ((n = o.lastIndexOf(g)) < 0 && (n = 0),
                r = 0; r < n; ++r)
                    o.charCodeAt(r) >= 128 && $("not-basic"),
                    b.push(o.charCodeAt(r));
                for (t = n > 0 ? n + 1 : 0; t < C; ) {
                    for (i = y,
                    u = 1,
                    f = l; t >= C && $("invalid-input"),
                    ((p = (x = o.charCodeAt(t++)) - 48 < 10 ? x - 22 : x - 65 < 26 ? x - 65 : x - 97 < 26 ? x - 97 : l) >= l || p > j((c - y) / u)) && $("overflow"),
                    y += p * u,
                    !(p < (h = f <= I ? s : f >= I + a ? a : f - I)); f += l)
                        u > j(c / (w = l - h)) && $("overflow"),
                        u *= w;
                    I = T(y - i, e = b.length + 1, 0 == i),
                    j(y / e) > c - A && $("overflow"),
                    A += j(y / e),
                    y %= e,
                    b.splice(y++, 0, A)
                }
                return O(b)
            }
            function L(o) {
                var e, n, r, t, i, u, f, p, h, w, x, b, C, y, I, E = [];
                for (b = (o = F(o)).length,
                e = v,
                n = 0,
                i = d,
                u = 0; u < b; ++u)
                    (x = o[u]) < 128 && E.push(A(x));
                for (r = t = E.length,
                t && E.push(g); r < b; ) {
                    for (f = c,
                    u = 0; u < b; ++u)
                        (x = o[u]) >= e && x < f && (f = x);
                    for (f - e > j((c - n) / (C = r + 1)) && $("overflow"),
                    n += (f - e) * C,
                    e = f,
                    u = 0; u < b; ++u)
                        if ((x = o[u]) < e && ++n > c && $("overflow"),
                        x == e) {
                            for (p = n,
                            h = l; !(p < (w = h <= i ? s : h >= i + a ? a : h - i)); h += l)
                                I = p - w,
                                y = l - w,
                                E.push(A(S(w + I % y, 0))),
                                p = j(I / y);
                            E.push(A(S(p, 0))),
                            i = T(n, C, r == t),
                            n = 0,
                            ++r
                        }
                    ++n,
                    ++e
                }
                return E.join("")
            }
            if (u = {
                version: "1.4.1",
                ucs2: {
                    decode: F,
                    encode: O
                },
                decode: m,
                encode: L,
                toASCII: function(o) {
                    return E(o, function(o) {
                        return x.test(o) ? "xn--" + L(o) : o
                    })
                },
                toUnicode: function(o) {
                    return E(o, function(o) {
                        return w.test(o) ? m(o.slice(4).toLowerCase()) : o
                    })
                }
            },
            r && t) {
                if (e.exports == r)
                    t.exports = u;
                else
                    for (f in u)
                        u.hasOwnProperty(f) && (r[f] = u[f]);
            } else
                n.punycode = u
        }(this),
        e.exports
    }
    .call({});
    var va = {};
    va = {
        isString: function(n) {
            return "string" == typeof n
        },
        isObject: function(n) {
            return "object" == typeof n && null !== n
        },
        isNull: function(n) {
            return null === n
        },
        isNullOrUndefined: function(n) {
            return null == n
        }
    };
    var kf, lf, mf = false;
    function nf(r, e) {
        return Object.prototype.hasOwnProperty.call(r, e)
    }
    function of() {
        if (mf)
            return;
        mf = true;
        kf = {};
        kf = function(r, e, t, a) {
            e = e || "&",
            t = t || "=";
            var n = {};
            if ("string" != typeof r || 0 === r.length)
                return n;
            var o = /\+/g;
            r = r.split(e);
            var s = 1e3;
            a && "number" == typeof a.maxKeys && (s = a.maxKeys);
            var p = r.length;
            s > 0 && p > s && (p = s);
            for (var $ = 0; $ < p; ++$) {
                var y, v, c, i, u = r[$].replace(o, "%20"), f = u.indexOf(t);
                f >= 0 ? (y = u.substr(0, f),
                v = u.substr(f + 1)) : (y = u,
                v = ""),
                c = decodeURIComponent(y),
                i = decodeURIComponent(v),
                nf(n, c) ? lf(n[c]) ? n[c].push(i) : n[c] = [n[c], i] : n[c] = i
            }
            return n
        }
        ;
        lf = Array.isArray || function(r) {
            return "[object Array]" === Object.prototype.toString.call(r)
        }
    }
    var pf, eb, qf, rf, sf = false;
    function Zc(r, e) {
        if (r.map)
            return r.map(e);
        for (var t = [], n = 0; n < r.length; n++)
            t.push(e(r[n], n));
        return t
    }
    function tf() {
        if (sf)
            return;
        sf = true;
        pf = {};
        eb = function(r) {
            switch (typeof r) {
            case "string":
                return r;
            case "boolean":
                return r ? "true" : "false";
            case "number":
                return isFinite(r) ? r : "";
            default:
                return "";
            }
        }
        ;
        pf = function(r, e, t, n) {
            return e = e || "&",
            t = t || "=",
            null === r && (r = void 0),
            "object" == typeof r ? Zc(rf(r), function(n) {
                var i = encodeURIComponent(eb(n)) + t;
                return qf(r[n]) ? Zc(r[n], function(r) {
                    return i + encodeURIComponent(eb(r))
                }).join(e) : i + encodeURIComponent(eb(r[n]))
            }).join(e) : n ? encodeURIComponent(eb(n)) + t + encodeURIComponent(eb(r)) : ""
        }
        ;
        qf = Array.isArray || function(r) {
            return "[object Array]" === Object.prototype.toString.call(r)
        }
        ;
        rf = Object.keys || function(r) {
            var e = [];
            for (var t in r)
                Object.prototype.hasOwnProperty.call(r, t) && e.push(t);
            return e
        }
    }
    var $c, uf, c = ($c = (of(),
    kf));
    var d = (uf = (tf(),
    pf));
    var vf = qb;
    var wf = Hf;
    var xf = Gf;
    function sa() {
        this.protocol = null,
        this.slashes = null,
        this.auth = null,
        this.host = null,
        this.port = null,
        this.hostname = null,
        this.hash = null,
        this.search = null,
        this.query = null,
        this.pathname = null,
        this.path = null,
        this.href = null
    }
    var yf = /^([a-z0-9.+-]+:)/i
      , zf = /:[0-9]*$/
      , Af = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
      , Bf = ["<", ">", "\"", "`", " ", "\r", "\n", "\t"]
      , Cf = ["{", "}", "|", "\\", "^", "`"].concat(Bf)
      , Vb = ["'"].concat(Cf)
      , _c = ["%", "/", "?", ";", "#"].concat(Vb)
      , ad = ["/", "?", "#"]
      , Df = 255
      , bd = /^[+a-z0-9A-Z_-]{0,63}$/
      , Ef = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
      , Ff = {
        javascript: !0,
        "javascript:": !0
    }
      , Wb = {
        javascript: !0,
        "javascript:": !0
    }
      , Ua = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    };
    function qb(t, h, r) {
        if (t && va.isObject(t) && t instanceof sa)
            return t;
        var s = new sa;
        return s.parse(t, h, r),
        s
    }
    function Gf(t) {
        return va.isString(t) && (t = qb(t)),
        t instanceof sa ? t.format() : sa.prototype.format.call(t)
    }
    function Hf(t, h) {
        return qb(t, !1, !0).resolve(h)
    }
    sa.prototype.parse = function(t, h, r) {
        if (!va.isString(t))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
        var s = t.indexOf("?")
          , a = -1 !== s && s < t.indexOf("#") ? "?" : "#"
          , e = t.split(a);
        e[0] = e[0].replace(/\\/g, "/");
        var o = t = e.join(a);
        if (o = o.trim(),
        !r && 1 === t.split("#").length) {
            var $ = Af.exec(o);
            if ($)
                return this.path = o,
                this.href = o,
                this.pathname = $[1],
                $[2] ? (this.search = $[2],
                this.query = h ? $c(this.search.substr(1)) : this.search.substr(1)) : h && (this.search = "",
                this.query = {}),
                this
        }
        var n = yf.exec(o);
        if (n) {
            var i = (n = n[0]).toLowerCase();
            this.protocol = i,
            o = o.substr(n.length)
        }
        if (r || n || o.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var l = "//" === o.substr(0, 2);
            !l || n && Wb[n] || (o = o.substr(2),
            this.slashes = !0)
        }
        if (!Wb[n] && (l || n && !Ua[n])) {
            for (var p, u, c = -1, v = 0; v < ad.length; v++) {
                -1 !== (d = o.indexOf(ad[v])) && (-1 === c || d < c) && (c = d)
            }
            -1 !== (u = -1 === c ? o.lastIndexOf("@") : o.lastIndexOf("@", c)) && (p = o.slice(0, u),
            o = o.slice(u + 1),
            this.auth = decodeURIComponent(p)),
            c = -1;
            for (v = 0; v < _c.length; v++) {
                var d;
                -1 !== (d = o.indexOf(_c[v])) && (-1 === c || d < c) && (c = d)
            }
            -1 === c && (c = o.length),
            this.host = o.slice(0, c),
            o = o.slice(c),
            this.parseHost(),
            this.hostname = this.hostname || "";
            var f = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!f)
                for (var m = this.hostname.split(/\./), F = (v = 0,
                m.length); v < F; v++) {
                    var Z = m[v];
                    if (Z && !Z.match(bd)) {
                        for (var g = "", y = 0, P = Z.length; y < P; y++)
                            Z.charCodeAt(y) > 127 ? g += "x" : g += Z[y];
                        if (!g.match(bd)) {
                            var x = m.slice(0, v)
                              , b = m.slice(v + 1)
                              , q = Z.match(Ef);
                            q && (x.push(q[1]),
                            b.unshift(q[2])),
                            b.length && (o = "/" + b.join(".") + o),
                            this.hostname = x.join(".");
                            break
                        }
                    }
                }
            this.hostname.length > Df ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
            f || (this.hostname = jf.toASCII(this.hostname));
            var O = this.port ? ":" + this.port : ""
              , j = this.hostname || "";
            this.host = j + O,
            this.href += this.host,
            f && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
            "/" !== o[0] && (o = "/" + o))
        }
        if (!Ff[i])
            for (v = 0,
            F = Vb.length; v < F; v++) {
                var U = Vb[v];
                if (-1 !== o.indexOf(U)) {
                    var C = encodeURIComponent(U);
                    C === U && (C = escape(U)),
                    o = o.split(U).join(C)
                }
            }
        var A = o.indexOf("#");
        -1 !== A && (this.hash = o.substr(A),
        o = o.slice(0, A));
        var w = o.indexOf("?");
        if (-1 !== w ? (this.search = o.substr(w),
        this.query = o.substr(w + 1),
        h && (this.query = $c(this.query)),
        o = o.slice(0, w)) : h && (this.search = "",
        this.query = {}),
        o && (this.pathname = o),
        Ua[i] && this.hostname && !this.pathname && (this.pathname = "/"),
        this.pathname || this.search) {
            O = this.pathname || "";
            var E = this.search || "";
            this.path = O + E
        }
        return this.href = this.format(),
        this
    }
    ,
    sa.prototype.format = function() {
        var t = this.auth || "";
        t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"),
        t += "@");
        var h = this.protocol || ""
          , r = this.pathname || ""
          , s = this.hash || ""
          , a = !1
          , e = "";
        this.host ? a = t + this.host : this.hostname && (a = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
        this.port && (a += ":" + this.port)),
        this.query && va.isObject(this.query) && Object.keys(this.query).length && (e = uf(this.query));
        var o = this.search || e && "?" + e || "";
        return h && ":" !== h.substr(-1) && (h += ":"),
        this.slashes || (!h || Ua[h]) && !1 !== a ? (a = "//" + (a || ""),
        r && "/" !== r.charAt(0) && (r = "/" + r)) : a || (a = ""),
        s && "#" !== s.charAt(0) && (s = "#" + s),
        o && "?" !== o.charAt(0) && (o = "?" + o),
        h + a + (r = r.replace(/[?#]/g, function(t) {
            return encodeURIComponent(t)
        })) + (o = o.replace("#", "%23")) + s
    }
    ,
    sa.prototype.resolve = function(t) {
        return this.resolveObject(qb(t, !1, !0)).format()
    }
    ,
    sa.prototype.resolveObject = function(t) {
        if (va.isString(t)) {
            var h = new sa;
            h.parse(t, !1, !0),
            t = h
        }
        for (var r = new sa, s = Object.keys(this), a = 0; a < s.length; a++) {
            var e = s[a];
            r[e] = this[e]
        }
        if (r.hash = t.hash,
        "" === t.href)
            return r.href = r.format(),
            r;
        if (t.slashes && !t.protocol) {
            for (var o = Object.keys(t), $ = 0; $ < o.length; $++) {
                var n = o[$];
                "protocol" !== n && (r[n] = t[n])
            }
            return Ua[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"),
            r.href = r.format(),
            r
        }
        if (t.protocol && t.protocol !== r.protocol) {
            if (!Ua[t.protocol]) {
                for (var i = Object.keys(t), l = 0; l < i.length; l++) {
                    var p = i[l];
                    r[p] = t[p]
                }
                return r.href = r.format(),
                r
            }
            if (r.protocol = t.protocol,
            t.host || Wb[t.protocol])
                r.pathname = t.pathname;
            else {
                for (var u = (t.pathname || "").split("/"); u.length && !(t.host = u.shift()); )
                    ;
                t.host || (t.host = ""),
                t.hostname || (t.hostname = ""),
                "" !== u[0] && u.unshift(""),
                u.length < 2 && u.unshift(""),
                r.pathname = u.join("/")
            }
            if (r.search = t.search,
            r.query = t.query,
            r.host = t.host || "",
            r.auth = t.auth,
            r.hostname = t.hostname || t.host,
            r.port = t.port,
            r.pathname || r.search) {
                var c = r.pathname || ""
                  , v = r.search || "";
                r.path = c + v
            }
            return r.slashes = r.slashes || t.slashes,
            r.href = r.format(),
            r
        }
        var d = r.pathname && "/" === r.pathname.charAt(0)
          , f = t.host || t.pathname && "/" === t.pathname.charAt(0)
          , m = f || d || r.host && t.pathname
          , F = m
          , Z = r.pathname && r.pathname.split("/") || []
          , g = (u = t.pathname && t.pathname.split("/") || [],
        r.protocol && !Ua[r.protocol]);
        if (g && (r.hostname = "",
        r.port = null,
        r.host && ("" === Z[0] ? Z[0] = r.host : Z.unshift(r.host)),
        r.host = "",
        t.protocol && (t.hostname = null,
        t.port = null,
        t.host && ("" === u[0] ? u[0] = t.host : u.unshift(t.host)),
        t.host = null),
        m = m && ("" === u[0] || "" === Z[0])),
        f)
            r.host = t.host || "" === t.host ? t.host : r.host,
            r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname,
            r.search = t.search,
            r.query = t.query,
            Z = u;
        else if (u.length)
            Z || (Z = []),
            Z.pop(),
            Z = Z.concat(u),
            r.search = t.search,
            r.query = t.query;
        else if (!va.isNullOrUndefined(t.search)) {
            if (g)
                r.hostname = r.host = Z.shift(),
                (q = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = q.shift(),
                r.host = r.hostname = q.shift());
            return r.search = t.search,
            r.query = t.query,
            va.isNull(r.pathname) && va.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
            r.href = r.format(),
            r
        }
        if (!Z.length)
            return r.pathname = null,
            r.search ? r.path = "/" + r.search : r.path = null,
            r.href = r.format(),
            r;
        for (var y = Z.slice(-1)[0], P = (r.host || t.host || Z.length > 1) && ("." === y || ".." === y) || "" === y, x = 0, b = Z.length; b >= 0; b--)
            "." === (y = Z[b]) ? Z.splice(b, 1) : ".." === y ? (Z.splice(b, 1),
            x++) : x && (Z.splice(b, 1),
            x--);
        if (!m && !F)
            for (; x--; x)
                Z.unshift("..");
        !m || "" === Z[0] || Z[0] && "/" === Z[0].charAt(0) || Z.unshift(""),
        P && "/" !== Z.join("/").substr(-1) && Z.push("");
        var q, O = "" === Z[0] || Z[0] && "/" === Z[0].charAt(0);
        g && (r.hostname = r.host = O ? "" : Z.length ? Z.shift() : "",
        (q = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = q.shift(),
        r.host = r.hostname = q.shift()));
        return (m = m || r.host && Z.length) && !O && Z.unshift(""),
        Z.length ? r.pathname = Z.join("/") : (r.pathname = null,
        r.path = null),
        va.isNull(r.pathname) && va.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
        r.auth = t.auth || r.auth,
        r.slashes = r.slashes || t.slashes,
        r.href = r.format(),
        r
    }
    ,
    sa.prototype.parseHost = function() {
        var t = this.host
          , h = zf.exec(t);
        h && (":" !== (h = h[0]) && (this.port = h.substr(1)),
        t = t.substr(0, t.length - h.length)),
        t && (this.hostname = t)
    }
    ;
    var rb = Kb(Re);
    var cd = Kb(Ue);
    var If = {
        parse: vf,
        format: xf,
        resolve: wf
    };
    aa.RETINA_PREFIX = /@([0-9\.]+)x/,
    aa.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
    var dd, Jf = !1, ed = "6.0.1";
    function Kf($) {
        var e;
        if (!Jf) {
            if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                var r = ["\n %c %c %c PixiJS " + ed + " - \u2730 " + $ + " \u2730  %c  %c  http://www.pixijs.com/  %c %c \u2665%c\u2665%c\u2665 \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                (e = self.console).log.apply(e, r)
            } else
                self.console && self.console.log("PixiJS " + ed + " - " + $ + " - http://www.pixijs.com/");
            Jf = !0
        }
    }
    function Lf() {
        return void 0 === dd && (dd = function() {
            var $ = {
                stencil: !0,
                failIfMajorPerformanceCaveat: aa.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
            };
            try {
                if (!self.WebGLRenderingContext)
                    return !1;
                var e = document.createElement("canvas")
                  , r = e.getContext("webgl", $) || e.getContext("experimental-webgl", $)
                  , a = !(!r || !r.getContextAttributes().stencil);
                if (r) {
                    var v = r.getExtension("WEBGL_lose_context");
                    v && v.loseContext()
                }
                return r = null,
                a
            } catch (g) {
                return !1
            }
        }()),
        dd
    }
    function Xb($, e) {
        return void 0 === e && (e = []),
        e[0] = ($ >> 16 & 255) / 255,
        e[1] = ($ >> 8 & 255) / 255,
        e[2] = (255 & $) / 255,
        e
    }
    function Mf($) {
        var e = $.toString(16);
        return "#" + (e = "000000".substr(0, 6 - e.length) + e)
    }
    function Nf() {
        for (var $ = [], e = [], r = 0; r < 32; r++)
            $[r] = r,
            e[r] = r;
        $[K.NORMAL_NPM] = K.NORMAL,
        $[K.ADD_NPM] = K.ADD,
        $[K.SCREEN_NPM] = K.SCREEN,
        e[K.NORMAL] = K.NORMAL_NPM,
        e[K.ADD] = K.ADD_NPM,
        e[K.SCREEN] = K.SCREEN_NPM;
        var a = [];
        return a.push(e),
        a.push($),
        a
    }
    var Of = Nf();
    function fd($, e) {
        if (1 === e)
            return (255 * e << 24) + $;
        if (0 === e)
            return 0;
        var r = $ >> 16 & 255
          , a = $ >> 8 & 255
          , v = 255 & $;
        return (255 * e << 24) + ((r = r * e + .5 | 0) << 16) + ((a = a * e + .5 | 0) << 8) + (v = v * e + .5 | 0)
    }
    var e = {
        Float32Array: Float32Array,
        Uint32Array: Uint32Array,
        Int32Array: Int32Array,
        Uint8Array: Uint8Array
    };
    function sb($) {
        return $ += 0 === $ ? 1 : 0,
        --$,
        $ |= $ >>> 1,
        $ |= $ >>> 2,
        $ |= $ >>> 4,
        $ |= $ >>> 8,
        ($ |= $ >>> 16) + 1
    }
    function gd($) {
        return !($ & $ - 1 || !$)
    }
    function hd($) {
        var e = ($ > 65535 ? 1 : 0) << 4
          , r = (($ >>>= e) > 255 ? 1 : 0) << 3;
        return e |= r,
        e |= r = (($ >>>= r) > 15 ? 1 : 0) << 2,
        (e |= r = (($ >>>= r) > 3 ? 1 : 0) << 1) | ($ >>>= r) >> 1
    }
    function tb($, e, r) {
        var a, v = $.length;
        if (!(e >= v || 0 === r)) {
            var g = v - (r = e + r > v ? v - e : r);
            for (a = e; a < g; ++a)
                $[a] = $[a + r];
            $.length = g
        }
    }
    var Pf = 0;
    function ub() {
        return ++Pf
    }
    var id = {};
    function Va($, e, r) {
        if (void 0 === r && (r = 3),
        !id[e]) {
            var a = new Error().stack;
            void 0 === a ? console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + $) : (a = a.split("\n").splice(r).join("\n"),
            console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e + "\nDeprecated since v" + $),
            console.warn(a),
            console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + $),
            console.warn(a))),
            id[e] = !0
        }
    }
    var jd = {}
      , ya = Object.create(null)
      , Ka = Object.create(null);
    var f = function() {
        function $($, e, r) {
            this.canvas = document.createElement("canvas"),
            this.context = this.canvas.getContext("2d"),
            this.resolution = r || aa.RESOLUTION,
            this.resize($, e)
        }
        return $.prototype.clear = function() {
            this.context.setTransform(1, 0, 0, 1, 0, 0),
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
        ,
        $.prototype.resize = function($, e) {
            this.canvas.width = $ * this.resolution,
            this.canvas.height = e * this.resolution
        }
        ,
        $.prototype.destroy = function() {
            this.context = null,
            this.canvas = null
        }
        ,
        Object.defineProperty($.prototype, "width", {
            get: function() {
                return this.canvas.width
            },
            set: function($) {
                this.canvas.width = $
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty($.prototype, "height", {
            get: function() {
                return this.canvas.height
            },
            set: function($) {
                this.canvas.height = $
            },
            enumerable: !1,
            configurable: !0
        }),
        $
    }();
    var Yb;
    function Qf($, e) {
        if (void 0 === e && (e = self.location),
        0 === $.indexOf("data:"))
            return "";
        e = e || self.location,
        Yb || (Yb = document.createElement("a")),
        Yb.href = $;
        var r = If.parse(Yb.href)
          , a = !r.port && "" === e.port || r.port === e.port;
        return r.hostname === e.hostname && a && r.protocol === e.protocol ? "" : "anonymous"
    }
    function kd($, e) {
        var r = aa.RETINA_PREFIX.exec($);
        return r ? parseFloat(r[1]) : void 0 !== e ? e : 1
    }
    var ka = function() {
        function t(t) {
            this.items = [],
            this._name = t,
            this._aliasCount = 0
        }
        return t.prototype.emit = function(t, e, n, i, r, s, o, u) {
            if (arguments.length > 8)
                throw new Error("max arguments reached");
            var h = this.name
              , p = this.items;
            this._aliasCount++;
            for (var a = 0, m = p.length; a < m; a++)
                p[a][h](t, e, n, i, r, s, o, u);
            return p === this.items && this._aliasCount--,
            this
        }
        ,
        t.prototype.ensureNonAliasedItems = function() {
            this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0,
            this.items = this.items.slice(0))
        }
        ,
        t.prototype.add = function(t) {
            return t[this._name] && (this.ensureNonAliasedItems(),
            this.remove(t),
            this.items.push(t)),
            this
        }
        ,
        t.prototype.remove = function(t) {
            var e = this.items.indexOf(t);
            return -1 !== e && (this.ensureNonAliasedItems(),
            this.items.splice(e, 1)),
            this
        }
        ,
        t.prototype.contains = function(t) {
            return -1 !== this.items.indexOf(t)
        }
        ,
        t.prototype.removeAll = function() {
            return this.ensureNonAliasedItems(),
            this.items.length = 0,
            this
        }
        ,
        t.prototype.destroy = function() {
            this.removeAll(),
            this.items = null,
            this._name = null
        }
        ,
        Object.defineProperty(t.prototype, "empty", {
            get: function() {
                return 0 === this.items.length
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "name", {
            get: function() {
                return this._name
            },
            enumerable: !1,
            configurable: !0
        }),
        t
    }();
    Object.defineProperties(ka.prototype, {
        dispatch: {
            value: ka.prototype.emit
        },
        run: {
            value: ka.prototype.emit
        }
    });
    var Rf, vb;
    aa.TARGET_FPMS = .06,
    function(t) {
        t[t.INTERACTION = 50] = "INTERACTION",
        t[t.HIGH = 25] = "HIGH",
        t[t.NORMAL = 0] = "NORMAL",
        t[t.LOW = -25] = "LOW",
        t[t.UTILITY = -50] = "UTILITY"
    }(vb || (Rf = vb = {},
    Rf));
    var Zb = function() {
        function t(t, e, i, s) {
            void 0 === e && (e = null),
            void 0 === i && (i = 0),
            void 0 === s && (s = !1),
            this.next = null,
            this.previous = null,
            this._destroyed = !1,
            this.fn = t,
            this.context = e,
            this.priority = i,
            this.once = s
        }
        return t.prototype.match = function(t, e) {
            return void 0 === e && (e = null),
            this.fn === t && this.context === e
        }
        ,
        t.prototype.emit = function(t) {
            this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
            var e = this.next;
            return this.once && this.destroy(!0),
            this._destroyed && (this.next = null),
            e
        }
        ,
        t.prototype.connect = function(t) {
            this.previous = t,
            t.next && (t.next.previous = this),
            this.next = t.next,
            t.next = this
        }
        ,
        t.prototype.destroy = function(t) {
            void 0 === t && (t = !1),
            this._destroyed = !0,
            this.fn = null,
            this.context = null,
            this.previous && (this.previous.next = this.next),
            this.next && (this.next.previous = this.previous);
            var e = this.next;
            return this.next = t ? null : e,
            this.previous = null,
            e
        }
        ,
        t
    }()
      , Ea = function() {
        function t() {
            var t = this;
            this.autoStart = !1,
            this.deltaTime = 1,
            this.lastTime = -1,
            this.speed = 1,
            this.started = !1,
            this._requestId = null,
            this._maxElapsedMS = 100,
            this._minElapsedMS = 0,
            this._protected = !1,
            this._lastFrame = -1,
            this._head = new Zb(null,null,1 / 0),
            this.deltaMS = 1 / aa.TARGET_FPMS,
            this.elapsedMS = 1 / aa.TARGET_FPMS,
            this._tick = function(e) {
                t._requestId = null,
                t.started && (t.update(e),
                t.started && null === t._requestId && t._head.next && (t._requestId = requestAnimationFrame(t._tick)))
            }
        }
        return t.prototype._requestIfNeeded = function() {
            null === this._requestId && this._head.next && (this.lastTime = performance.now(),
            this._lastFrame = this.lastTime,
            this._requestId = requestAnimationFrame(this._tick))
        }
        ,
        t.prototype._cancelIfNeeded = function() {
            null !== this._requestId && (cancelAnimationFrame(this._requestId),
            this._requestId = null)
        }
        ,
        t.prototype._startIfPossible = function() {
            this.started ? this._requestIfNeeded() : this.autoStart && this.start()
        }
        ,
        t.prototype.add = function(t, e, i) {
            return void 0 === i && (i = vb.NORMAL),
            this._addListener(new Zb(t,e,i))
        }
        ,
        t.prototype.addOnce = function(t, e, i) {
            return void 0 === i && (i = vb.NORMAL),
            this._addListener(new Zb(t,e,i,!0))
        }
        ,
        t.prototype._addListener = function(t) {
            var e = this._head.next
              , i = this._head;
            if (e) {
                for (; e; ) {
                    if (t.priority > e.priority) {
                        t.connect(i);
                        break
                    }
                    i = e,
                    e = e.next
                }
                t.previous || t.connect(i)
            } else
                t.connect(i);
            return this._startIfPossible(),
            this
        }
        ,
        t.prototype.remove = function(t, e) {
            for (var i = this._head.next; i; )
                i = i.match(t, e) ? i.destroy() : i.next;
            return this._head.next || this._cancelIfNeeded(),
            this
        }
        ,
        Object.defineProperty(t.prototype, "count", {
            get: function() {
                if (!this._head)
                    return 0;
                for (var t = 0, e = this._head; e = e.next; )
                    t++;
                return t
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.start = function() {
            this.started || (this.started = !0,
            this._requestIfNeeded())
        }
        ,
        t.prototype.stop = function() {
            this.started && (this.started = !1,
            this._cancelIfNeeded())
        }
        ,
        t.prototype.destroy = function() {
            if (!this._protected) {
                this.stop();
                for (var t = this._head.next; t; )
                    t = t.destroy(!0);
                this._head.destroy(),
                this._head = null
            }
        }
        ,
        t.prototype.update = function(t) {
            var e;
            if (void 0 === t && (t = performance.now()),
            t > this.lastTime) {
                if ((e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS),
                e *= this.speed,
                this._minElapsedMS) {
                    var i = t - this._lastFrame | 0;
                    if (i < this._minElapsedMS)
                        return;
                    this._lastFrame = t - i % this._minElapsedMS
                }
                this.deltaMS = e,
                this.deltaTime = this.deltaMS * aa.TARGET_FPMS;
                for (var s = this._head, r = s.next; r; )
                    r = r.emit(this.deltaTime);
                s.next || this._cancelIfNeeded()
            } else
                this.deltaTime = this.deltaMS = this.elapsedMS = 0;
            this.lastTime = t
        }
        ,
        Object.defineProperty(t.prototype, "FPS", {
            get: function() {
                return 1e3 / this.elapsedMS
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "minFPS", {
            get: function() {
                return 1e3 / this._maxElapsedMS
            },
            set: function(t) {
                var e = Math.min(this.maxFPS, t)
                  , i = Math.min(Math.max(0, e) / 1e3, aa.TARGET_FPMS);
                this._maxElapsedMS = 1 / i
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "maxFPS", {
            get: function() {
                return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0
            },
            set: function(t) {
                if (0 === t)
                    this._minElapsedMS = 0;
                else {
                    var e = Math.max(this.minFPS, t);
                    this._minElapsedMS = 1 / (e / 1e3)
                }
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t, "shared", {
            get: function() {
                if (!t._shared) {
                    var e = t._shared = new t;
                    e.autoStart = !0,
                    e._protected = !0
                }
                return t._shared
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t, "system", {
            get: function() {
                if (!t._system) {
                    var e = t._system = new t;
                    e.autoStart = !0,
                    e._protected = !0
                }
                return t._system
            },
            enumerable: !1,
            configurable: !0
        }),
        t
    }()
      , g = function() {
        function t() {}
        return t.init = function(t) {
            var e = this;
            t = Object.assign({
                autoStart: !0,
                sharedTicker: !1
            }, t),
            Object.defineProperty(this, "ticker", {
                set: function(t) {
                    this._ticker && this._ticker.remove(this.render, this),
                    this._ticker = t,
                    t && t.add(this.render, this, vb.LOW)
                },
                get: function() {
                    return this._ticker
                }
            }),
            this.stop = function() {
                e._ticker.stop()
            }
            ,
            this.start = function() {
                e._ticker.start()
            }
            ,
            this._ticker = null,
            this.ticker = t.sharedTicker ? Ea.shared : new Ea,
            t.autoStart && this.start()
        }
        ,
        t.destroy = function() {
            if (this._ticker) {
                var t = this._ticker;
                this.ticker = null,
                t.destroy()
            }
        }
        ,
        t
    }();
    var Sf, fa, wb = 2 * Math.PI, Tf = 180 / Math.PI, Uf = Math.PI / 180;
    !function(t) {
        t[t.POLY = 0] = "POLY",
        t[t.RECT = 1] = "RECT",
        t[t.CIRC = 2] = "CIRC",
        t[t.ELIP = 3] = "ELIP",
        t[t.RREC = 4] = "RREC"
    }(fa || (Sf = fa = {},
    Sf));
    var da = function() {
        function t(t, i, s, o) {
            void 0 === t && (t = 0),
            void 0 === i && (i = 0),
            void 0 === s && (s = 0),
            void 0 === o && (o = 0),
            this.x = Number(t),
            this.y = Number(i),
            this.width = Number(s),
            this.height = Number(o),
            this.type = fa.RECT
        }
        return Object.defineProperty(t.prototype, "left", {
            get: function() {
                return this.x
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "right", {
            get: function() {
                return this.x + this.width
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "top", {
            get: function() {
                return this.y
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "bottom", {
            get: function() {
                return this.y + this.height
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t, "EMPTY", {
            get: function() {
                return new t(0,0,0,0)
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.clone = function() {
            return new t(this.x,this.y,this.width,this.height)
        }
        ,
        t.prototype.copyFrom = function(t) {
            return this.x = t.x,
            this.y = t.y,
            this.width = t.width,
            this.height = t.height,
            this
        }
        ,
        t.prototype.copyTo = function(t) {
            return t.x = this.x,
            t.y = this.y,
            t.width = this.width,
            t.height = this.height,
            t
        }
        ,
        t.prototype.contains = function(t, i) {
            return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && i >= this.y && i < this.y + this.height
        }
        ,
        t.prototype.pad = function(t, i) {
            return void 0 === t && (t = 0),
            void 0 === i && (i = t),
            this.x -= t,
            this.y -= i,
            this.width += 2 * t,
            this.height += 2 * i,
            this
        }
        ,
        t.prototype.fit = function(t) {
            var i = Math.max(this.x, t.x)
              , s = Math.min(this.x + this.width, t.x + t.width)
              , o = Math.max(this.y, t.y)
              , h = Math.min(this.y + this.height, t.y + t.height);
            return this.x = i,
            this.width = Math.max(s - i, 0),
            this.y = o,
            this.height = Math.max(h - o, 0),
            this
        }
        ,
        t.prototype.ceil = function(t, i) {
            void 0 === t && (t = 1),
            void 0 === i && (i = .001);
            var s = Math.ceil((this.x + this.width - i) * t) / t
              , o = Math.ceil((this.y + this.height - i) * t) / t;
            return this.x = Math.floor((this.x + i) * t) / t,
            this.y = Math.floor((this.y + i) * t) / t,
            this.width = s - this.x,
            this.height = o - this.y,
            this
        }
        ,
        t.prototype.enlarge = function(t) {
            var i = Math.min(this.x, t.x)
              , s = Math.max(this.x + this.width, t.x + t.width)
              , o = Math.min(this.y, t.y)
              , h = Math.max(this.y + this.height, t.y + t.height);
            return this.x = i,
            this.width = s - i,
            this.y = o,
            this.height = h - o,
            this
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]"
        }
        ,
        t
    }()
      , Vf = function() {
        function t(t, i, s) {
            void 0 === t && (t = 0),
            void 0 === i && (i = 0),
            void 0 === s && (s = 0),
            this.x = t,
            this.y = i,
            this.radius = s,
            this.type = fa.CIRC
        }
        return t.prototype.clone = function() {
            return new t(this.x,this.y,this.radius)
        }
        ,
        t.prototype.contains = function(t, i) {
            if (this.radius <= 0)
                return !1;
            var s = this.radius * this.radius
              , o = this.x - t
              , h = this.y - i;
            return (o *= o) + (h *= h) <= s
        }
        ,
        t.prototype.getBounds = function() {
            return new da(this.x - this.radius,this.y - this.radius,2 * this.radius,2 * this.radius)
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]"
        }
        ,
        t
    }()
      , Wf = function() {
        function t(t, i, s, o) {
            void 0 === t && (t = 0),
            void 0 === i && (i = 0),
            void 0 === s && (s = 0),
            void 0 === o && (o = 0),
            this.x = t,
            this.y = i,
            this.width = s,
            this.height = o,
            this.type = fa.ELIP
        }
        return t.prototype.clone = function() {
            return new t(this.x,this.y,this.width,this.height)
        }
        ,
        t.prototype.contains = function(t, i) {
            if (this.width <= 0 || this.height <= 0)
                return !1;
            var s = (t - this.x) / this.width
              , o = (i - this.y) / this.height;
            return (s *= s) + (o *= o) <= 1
        }
        ,
        t.prototype.getBounds = function() {
            return new da(this.x - this.width,this.y - this.height,this.width,this.height)
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]"
        }
        ,
        t
    }()
      , $b = function() {
        function t() {
            for (var t = arguments, i = [], s = 0; s < arguments.length; s++)
                i[s] = t[s];
            var o = Array.isArray(i[0]) ? i[0] : i;
            if ("number" != typeof o[0]) {
                for (var h = [], r = 0, e = o.length; r < e; r++)
                    h.push(o[r].x, o[r].y);
                o = h
            }
            this.points = o,
            this.type = fa.POLY,
            this.closeStroke = !0
        }
        return t.prototype.clone = function() {
            var i = new t(this.points.slice());
            return i.closeStroke = this.closeStroke,
            i
        }
        ,
        t.prototype.contains = function(t, i) {
            for (var s = !1, o = this.points.length / 2, h = 0, r = o - 1; h < o; r = h++) {
                var e = this.points[2 * h]
                  , n = this.points[2 * h + 1]
                  , a = this.points[2 * r]
                  , $ = this.points[2 * r + 1];
                n > i != $ > i && t < (i - n) / ($ - n) * (a - e) + e && (s = !s)
            }
            return s
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:PolygoncloseStroke=" + this.closeStroke + "points=" + this.points.reduce(function(t, i) {
                return t + ", " + i
            }, "") + "]"
        }
        ,
        t
    }()
      , Xf = function() {
        function t(t, i, s, o, h) {
            void 0 === t && (t = 0),
            void 0 === i && (i = 0),
            void 0 === s && (s = 0),
            void 0 === o && (o = 0),
            void 0 === h && (h = 20),
            this.x = t,
            this.y = i,
            this.width = s,
            this.height = o,
            this.radius = h,
            this.type = fa.RREC
        }
        return t.prototype.clone = function() {
            return new t(this.x,this.y,this.width,this.height,this.radius)
        }
        ,
        t.prototype.contains = function(t, i) {
            if (this.width <= 0 || this.height <= 0)
                return !1;
            if (t >= this.x && t <= this.x + this.width && i >= this.y && i <= this.y + this.height) {
                if (i >= this.y + this.radius && i <= this.y + this.height - this.radius || t >= this.x + this.radius && t <= this.x + this.width - this.radius)
                    return !0;
                var s = t - (this.x + this.radius)
                  , o = i - (this.y + this.radius)
                  , h = this.radius * this.radius;
                if (s * s + o * o <= h)
                    return !0;
                if ((s = t - (this.x + this.width - this.radius)) * s + o * o <= h)
                    return !0;
                if (s * s + (o = i - (this.y + this.height - this.radius)) * o <= h)
                    return !0;
                if ((s = t - (this.x + this.radius)) * s + o * o <= h)
                    return !0
            }
            return !1
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y + "width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]"
        }
        ,
        t
    }()
      , ra = function() {
        function t(t, i) {
            void 0 === t && (t = 0),
            void 0 === i && (i = 0),
            this.x = t,
            this.y = i
        }
        return t.prototype.clone = function() {
            return new t(this.x,this.y)
        }
        ,
        t.prototype.copyFrom = function(t) {
            return this.set(t.x, t.y),
            this
        }
        ,
        t.prototype.copyTo = function(t) {
            return t.set(this.x, this.y),
            t
        }
        ,
        t.prototype.equals = function(t) {
            return t.x === this.x && t.y === this.y
        }
        ,
        t.prototype.set = function(t, i) {
            return void 0 === t && (t = 0),
            void 0 === i && (i = t),
            this.x = t,
            this.y = i,
            this
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]"
        }
        ,
        t
    }()
      , xb = function() {
        function t(t, i, s, o) {
            void 0 === s && (s = 0),
            void 0 === o && (o = 0),
            this._x = s,
            this._y = o,
            this.cb = t,
            this.scope = i
        }
        return t.prototype.clone = function(i, s) {
            return void 0 === i && (i = this.cb),
            void 0 === s && (s = this.scope),
            new t(i,s,this._x,this._y)
        }
        ,
        t.prototype.set = function(t, i) {
            return void 0 === t && (t = 0),
            void 0 === i && (i = t),
            this._x === t && this._y === i || (this._x = t,
            this._y = i,
            this.cb.call(this.scope)),
            this
        }
        ,
        t.prototype.copyFrom = function(t) {
            return this._x === t.x && this._y === t.y || (this._x = t.x,
            this._y = t.y,
            this.cb.call(this.scope)),
            this
        }
        ,
        t.prototype.copyTo = function(t) {
            return t.set(this._x, this._y),
            t
        }
        ,
        t.prototype.equals = function(t) {
            return t.x === this._x && t.y === this._y
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:ObservablePoint x=0 y=0 scope=" + this.scope + "]"
        }
        ,
        Object.defineProperty(t.prototype, "x", {
            get: function() {
                return this._x
            },
            set: function(t) {
                this._x !== t && (this._x = t,
                this.cb.call(this.scope))
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "y", {
            get: function() {
                return this._y
            },
            set: function(t) {
                this._y !== t && (this._y = t,
                this.cb.call(this.scope))
            },
            enumerable: !1,
            configurable: !0
        }),
        t
    }()
      , la = function() {
        function t(t, i, s, o, h, r) {
            void 0 === t && (t = 1),
            void 0 === i && (i = 0),
            void 0 === s && (s = 0),
            void 0 === o && (o = 1),
            void 0 === h && (h = 0),
            void 0 === r && (r = 0),
            this.array = null,
            this.a = t,
            this.b = i,
            this.c = s,
            this.d = o,
            this.tx = h,
            this.ty = r
        }
        return t.prototype.fromArray = function(t) {
            this.a = t[0],
            this.b = t[1],
            this.c = t[3],
            this.d = t[4],
            this.tx = t[2],
            this.ty = t[5]
        }
        ,
        t.prototype.set = function(t, i, s, o, h, r) {
            return this.a = t,
            this.b = i,
            this.c = s,
            this.d = o,
            this.tx = h,
            this.ty = r,
            this
        }
        ,
        t.prototype.toArray = function(t, i) {
            this.array || (this.array = new Float32Array(9));
            var s = i || this.array;
            return t ? (s[0] = this.a,
            s[1] = this.b,
            s[2] = 0,
            s[3] = this.c,
            s[4] = this.d,
            s[5] = 0,
            s[6] = this.tx,
            s[7] = this.ty,
            s[8] = 1) : (s[0] = this.a,
            s[1] = this.c,
            s[2] = this.tx,
            s[3] = this.b,
            s[4] = this.d,
            s[5] = this.ty,
            s[6] = 0,
            s[7] = 0,
            s[8] = 1),
            s
        }
        ,
        t.prototype.apply = function(t, i) {
            i = i || new ra;
            var s = t.x
              , o = t.y;
            return i.x = this.a * s + this.c * o + this.tx,
            i.y = this.b * s + this.d * o + this.ty,
            i
        }
        ,
        t.prototype.applyInverse = function(t, i) {
            i = i || new ra;
            var s = 1 / (this.a * this.d + this.c * -this.b)
              , o = t.x
              , h = t.y;
            return i.x = this.d * s * o + -this.c * s * h + (this.ty * this.c - this.tx * this.d) * s,
            i.y = this.a * s * h + -this.b * s * o + (-this.ty * this.a + this.tx * this.b) * s,
            i
        }
        ,
        t.prototype.translate = function(t, i) {
            return this.tx += t,
            this.ty += i,
            this
        }
        ,
        t.prototype.scale = function(t, i) {
            return this.a *= t,
            this.d *= i,
            this.c *= t,
            this.b *= i,
            this.tx *= t,
            this.ty *= i,
            this
        }
        ,
        t.prototype.rotate = function(t) {
            var i = Math.cos(t)
              , s = Math.sin(t)
              , o = this.a
              , h = this.c
              , r = this.tx;
            return this.a = o * i - this.b * s,
            this.b = o * s + this.b * i,
            this.c = h * i - this.d * s,
            this.d = h * s + this.d * i,
            this.tx = r * i - this.ty * s,
            this.ty = r * s + this.ty * i,
            this
        }
        ,
        t.prototype.append = function(t) {
            var i = this.a
              , s = this.b
              , o = this.c
              , h = this.d;
            return this.a = t.a * i + t.b * o,
            this.b = t.a * s + t.b * h,
            this.c = t.c * i + t.d * o,
            this.d = t.c * s + t.d * h,
            this.tx = t.tx * i + t.ty * o + this.tx,
            this.ty = t.tx * s + t.ty * h + this.ty,
            this
        }
        ,
        t.prototype.setTransform = function(t, i, s, o, h, r, e, n, a) {
            return this.a = Math.cos(e + a) * h,
            this.b = Math.sin(e + a) * h,
            this.c = -Math.sin(e - n) * r,
            this.d = Math.cos(e - n) * r,
            this.tx = t - (s * this.a + o * this.c),
            this.ty = i - (s * this.b + o * this.d),
            this
        }
        ,
        t.prototype.prepend = function(t) {
            var i = this.tx;
            if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                var s = this.a
                  , o = this.c;
                this.a = s * t.a + this.b * t.c,
                this.b = s * t.b + this.b * t.d,
                this.c = o * t.a + this.d * t.c,
                this.d = o * t.b + this.d * t.d
            }
            return this.tx = i * t.a + this.ty * t.c + t.tx,
            this.ty = i * t.b + this.ty * t.d + t.ty,
            this
        }
        ,
        t.prototype.decompose = function(t) {
            var i = this.a
              , s = this.b
              , o = this.c
              , h = this.d
              , r = t.pivot
              , e = -Math.atan2(-o, h)
              , n = Math.atan2(s, i)
              , a = Math.abs(e + n);
            return a < 1e-5 || Math.abs(wb - a) < 1e-5 ? (t.rotation = n,
            t.skew.x = t.skew.y = 0) : (t.rotation = 0,
            t.skew.x = e,
            t.skew.y = n),
            t.scale.x = Math.sqrt(i * i + s * s),
            t.scale.y = Math.sqrt(o * o + h * h),
            t.position.x = this.tx + (r.x * i + r.y * o),
            t.position.y = this.ty + (r.x * s + r.y * h),
            t
        }
        ,
        t.prototype.invert = function() {
            var t = this.a
              , i = this.b
              , s = this.c
              , o = this.d
              , h = this.tx
              , r = t * o - i * s;
            return this.a = o / r,
            this.b = -i / r,
            this.c = -s / r,
            this.d = t / r,
            this.tx = (s * this.ty - o * h) / r,
            this.ty = -(t * this.ty - i * h) / r,
            this
        }
        ,
        t.prototype.identity = function() {
            return this.a = 1,
            this.b = 0,
            this.c = 0,
            this.d = 1,
            this.tx = 0,
            this.ty = 0,
            this
        }
        ,
        t.prototype.clone = function() {
            var i = new t;
            return i.a = this.a,
            i.b = this.b,
            i.c = this.c,
            i.d = this.d,
            i.tx = this.tx,
            i.ty = this.ty,
            i
        }
        ,
        t.prototype.copyTo = function(t) {
            return t.a = this.a,
            t.b = this.b,
            t.c = this.c,
            t.d = this.d,
            t.tx = this.tx,
            t.ty = this.ty,
            t
        }
        ,
        t.prototype.copyFrom = function(t) {
            return this.a = t.a,
            this.b = t.b,
            this.c = t.c,
            this.d = t.d,
            this.tx = t.tx,
            this.ty = t.ty,
            this
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]"
        }
        ,
        Object.defineProperty(t, "IDENTITY", {
            get: function() {
                return new t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t, "TEMP_MATRIX", {
            get: function() {
                return new t
            },
            enumerable: !1,
            configurable: !0
        }),
        t
    }()
      , La = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1]
      , Ma = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1]
      , Na = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1]
      , Oa = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1]
      , _b = []
      , ld = []
      , yb = Math.sign;
    function Yf() {
        for (var t = 0; t < 16; t++) {
            var i = [];
            _b.push(i);
            for (var s = 0; s < 16; s++)
                for (var o = yb(La[t] * La[s] + Na[t] * Ma[s]), h = yb(Ma[t] * La[s] + Oa[t] * Ma[s]), r = yb(La[t] * Na[s] + Na[t] * Oa[s]), e = yb(Ma[t] * Na[s] + Oa[t] * Oa[s]), n = 0; n < 16; n++)
                    if (La[n] === o && Ma[n] === h && Na[n] === r && Oa[n] === e) {
                        i.push(n);
                        break
                    }
        }
        for (t = 0; t < 16; t++) {
            var a = new la;
            a.set(La[t], Ma[t], Na[t], Oa[t], 0, 0),
            ld.push(a)
        }
    }
    Yf();
    var ea = {
        E: 0,
        SE: 1,
        S: 2,
        SW: 3,
        W: 4,
        NW: 5,
        N: 6,
        NE: 7,
        MIRROR_VERTICAL: 8,
        MAIN_DIAGONAL: 10,
        MIRROR_HORIZONTAL: 12,
        REVERSE_DIAGONAL: 14,
        uX: function(t) {
            return La[t]
        },
        uY: function(t) {
            return Ma[t]
        },
        vX: function(t) {
            return Na[t]
        },
        vY: function(t) {
            return Oa[t]
        },
        inv: function(t) {
            return 8 & t ? 15 & t : 7 & -t
        },
        add: function(t, i) {
            return _b[t][i]
        },
        sub: function(t, i) {
            return _b[t][ea.inv(i)]
        },
        rotate180: function(t) {
            return 4 ^ t
        },
        isVertical: function(t) {
            return 2 == (3 & t)
        },
        byDirection: function(t, i) {
            return 2 * Math.abs(t) <= Math.abs(i) ? i >= 0 ? ea.S : ea.N : 2 * Math.abs(i) <= Math.abs(t) ? t > 0 ? ea.E : ea.W : i > 0 ? t > 0 ? ea.SE : ea.SW : t > 0 ? ea.NE : ea.NW
        },
        matrixAppendRotationInv: function(t, i, s, o) {
            void 0 === s && (s = 0),
            void 0 === o && (o = 0);
            var h = ld[ea.inv(i)];
            h.tx = s,
            h.ty = o,
            t.append(h)
        }
    }
      , Zf = function() {
        function t() {
            this.worldTransform = new la,
            this.localTransform = new la,
            this.position = new xb(this.onChange,this,0,0),
            this.scale = new xb(this.onChange,this,1,1),
            this.pivot = new xb(this.onChange,this,0,0),
            this.skew = new xb(this.updateSkew,this,0,0),
            this._rotation = 0,
            this._cx = 1,
            this._sx = 0,
            this._cy = 0,
            this._sy = 1,
            this._localID = 0,
            this._currentLocalID = 0,
            this._worldID = 0,
            this._parentID = 0
        }
        return t.prototype.onChange = function() {
            this._localID++
        }
        ,
        t.prototype.updateSkew = function() {
            this._cx = Math.cos(this._rotation + this.skew.y),
            this._sx = Math.sin(this._rotation + this.skew.y),
            this._cy = -Math.sin(this._rotation - this.skew.x),
            this._sy = Math.cos(this._rotation - this.skew.x),
            this._localID++
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/math:Transform position=(" + this.position.x + ", " + this.position.y + ") rotation=" + this.rotation + " scale=(" + this.scale.x + ", " + this.scale.y + ") skew=(" + this.skew.x + ", " + this.skew.y + ") ]"
        }
        ,
        t.prototype.updateLocalTransform = function() {
            var t = this.localTransform;
            this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x,
            t.b = this._sx * this.scale.x,
            t.c = this._cy * this.scale.y,
            t.d = this._sy * this.scale.y,
            t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c),
            t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d),
            this._currentLocalID = this._localID,
            this._parentID = -1)
        }
        ,
        t.prototype.updateTransform = function(t) {
            var i = this.localTransform;
            if (this._localID !== this._currentLocalID && (i.a = this._cx * this.scale.x,
            i.b = this._sx * this.scale.x,
            i.c = this._cy * this.scale.y,
            i.d = this._sy * this.scale.y,
            i.tx = this.position.x - (this.pivot.x * i.a + this.pivot.y * i.c),
            i.ty = this.position.y - (this.pivot.x * i.b + this.pivot.y * i.d),
            this._currentLocalID = this._localID,
            this._parentID = -1),
            this._parentID !== t._worldID) {
                var s = t.worldTransform
                  , o = this.worldTransform;
                o.a = i.a * s.a + i.b * s.c,
                o.b = i.a * s.b + i.b * s.d,
                o.c = i.c * s.a + i.d * s.c,
                o.d = i.c * s.b + i.d * s.d,
                o.tx = i.tx * s.a + i.ty * s.c + s.tx,
                o.ty = i.tx * s.b + i.ty * s.d + s.ty,
                this._parentID = t._worldID,
                this._worldID++
            }
        }
        ,
        t.prototype.setFromMatrix = function(t) {
            t.decompose(this),
            this._localID++
        }
        ,
        Object.defineProperty(t.prototype, "rotation", {
            get: function() {
                return this._rotation
            },
            set: function(t) {
                this._rotation !== t && (this._rotation = t,
                this.updateSkew())
            },
            enumerable: !1,
            configurable: !0
        }),
        t.IDENTITY = new t,
        t
    }();
    aa.PREFER_ENV = Ha.any ? Aa.WEBGL : Aa.WEBGL2,
    aa.STRICT_TEXTURE_CACHE = !1;
    var zb = [];
    function ac(t, e) {
        if (!t)
            return null;
        var r = "";
        if ("string" == typeof t) {
            var i = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
            i && (r = i[1].toLowerCase())
        }
        for (var o = zb.length - 1; o >= 0; --o) {
            var n = zb[o];
            if (n.test && n.test(t, r))
                return new n(t,e)
        }
        throw new Error("Unrecognized source type to auto-detect Resource")
    }
    var $f = function(t, e) {
        return ($f = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r])
        }
        )(t, e)
    };
    function ba(t, e) {
        function r() {
            this.constructor = t
        }
        $f(t, e),
        t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
        new r)
    }
    var Wa = function() {
        function t(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this._width = t,
            this._height = e,
            this.destroyed = !1,
            this.internal = !1,
            this.onResize = new ka("setRealSize"),
            this.onUpdate = new ka("update"),
            this.onError = new ka("onError")
        }
        return t.prototype.bind = function(t) {
            this.onResize.add(t),
            this.onUpdate.add(t),
            this.onError.add(t),
            (this._width || this._height) && this.onResize.emit(this._width, this._height)
        }
        ,
        t.prototype.unbind = function(t) {
            this.onResize.remove(t),
            this.onUpdate.remove(t),
            this.onError.remove(t)
        }
        ,
        t.prototype.resize = function(t, e) {
            t === this._width && e === this._height || (this._width = t,
            this._height = e,
            this.onResize.emit(t, e))
        }
        ,
        Object.defineProperty(t.prototype, "valid", {
            get: function() {
                return !!this._width && !!this._height
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.update = function() {
            this.destroyed || this.onUpdate.emit()
        }
        ,
        t.prototype.load = function() {
            return Promise.resolve(this)
        }
        ,
        Object.defineProperty(t.prototype, "width", {
            get: function() {
                return this._width
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "height", {
            get: function() {
                return this._height
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.style = function(t, e, r) {
            return !1
        }
        ,
        t.prototype.dispose = function() {}
        ,
        t.prototype.destroy = function() {
            this.destroyed || (this.destroyed = !0,
            this.dispose(),
            this.onError.removeAll(),
            this.onError = null,
            this.onResize.removeAll(),
            this.onResize = null,
            this.onUpdate.removeAll(),
            this.onUpdate = null)
        }
        ,
        t.test = function(t, e) {
            return !1
        }
        ,
        t
    }()
      , Ab = function(t) {
        function e(e, r) {
            var i = this
              , o = r || {}
              , n = o.width
              , s = o.height;
            if (!n || !s)
                throw new Error("BufferResource width or height invalid");
            return (i = t.call(this, n, s) || this).data = e,
            i
        }
        return ba(e, t),
        e.prototype.upload = function(t, e, r) {
            var i = t.gl;
            return i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === Ia.UNPACK),
            r.width === e.width && r.height === e.height ? i.texSubImage2D(e.target, 0, 0, 0, e.width, e.height, e.format, e.type, this.data) : (r.width = e.width,
            r.height = e.height,
            i.texImage2D(e.target, 0, r.internalFormat, e.width, e.height, 0, e.format, r.type, this.data)),
            !0
        }
        ,
        e.prototype.dispose = function() {
            this.data = null
        }
        ,
        e.test = function(t) {
            return t instanceof Float32Array || t instanceof Uint8Array || t instanceof Uint32Array
        }
        ,
        e
    }(Wa)
      , _f = {
        scaleMode: Ca.NEAREST,
        format: kb.RGBA,
        alphaMode: Ia.NPM
    }
      , ia = function(t) {
        function e(e, r) {
            void 0 === e && (e = null),
            void 0 === r && (r = null);
            var i = t.call(this) || this
              , o = (r = r || {}).alphaMode
              , n = r.mipmap
              , s = r.anisotropicLevel
              , a = r.scaleMode
              , u = r.width
              , h = r.height
              , $ = r.wrapMode
              , p = r.format
              , l = r.type
              , c = r.target
              , d = r.resolution
              , f = r.resourceOptions;
            return !e || e instanceof Wa || ((e = ac(e, f)).internal = !0),
            i.width = u || 0,
            i.height = h || 0,
            i.resolution = d || aa.RESOLUTION,
            i.mipmap = void 0 !== n ? n : aa.MIPMAP_TEXTURES,
            i.anisotropicLevel = void 0 !== s ? s : aa.ANISOTROPIC_LEVEL,
            i.wrapMode = $ || aa.WRAP_MODE,
            i.scaleMode = void 0 !== a ? a : aa.SCALE_MODE,
            i.format = p || kb.RGBA,
            i.type = l || ua.UNSIGNED_BYTE,
            i.target = c || Sa.TEXTURE_2D,
            i.alphaMode = void 0 !== o ? o : Ia.UNPACK,
            i.uid = ub(),
            i.touched = 0,
            i.isPowerOfTwo = !1,
            i._refreshPOT(),
            i._glTextures = {},
            i.dirtyId = 0,
            i.dirtyStyleId = 0,
            i.cacheId = null,
            i.valid = u > 0 && h > 0,
            i.textureCacheIds = [],
            i.destroyed = !1,
            i.resource = null,
            i._batchEnabled = 0,
            i._batchLocation = 0,
            i.parentTextureArray = null,
            i.setResource(e),
            i
        }
        return ba(e, t),
        Object.defineProperty(e.prototype, "realWidth", {
            get: function() {
                return Math.ceil(this.width * this.resolution - 1e-4)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "realHeight", {
            get: function() {
                return Math.ceil(this.height * this.resolution - 1e-4)
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.setStyle = function(t, e) {
            var r;
            return void 0 !== t && t !== this.scaleMode && (this.scaleMode = t,
            r = !0),
            void 0 !== e && e !== this.mipmap && (this.mipmap = e,
            r = !0),
            r && this.dirtyStyleId++,
            this
        }
        ,
        e.prototype.setSize = function(t, e, r) {
            return this.resolution = r || this.resolution,
            this.width = t,
            this.height = e,
            this._refreshPOT(),
            this.update(),
            this
        }
        ,
        e.prototype.setRealSize = function(t, e, r) {
            return this.resolution = r || this.resolution,
            this.width = t / this.resolution,
            this.height = e / this.resolution,
            this._refreshPOT(),
            this.update(),
            this
        }
        ,
        e.prototype._refreshPOT = function() {
            this.isPowerOfTwo = gd(this.realWidth) && gd(this.realHeight)
        }
        ,
        e.prototype.setResolution = function(t) {
            var e = this.resolution;
            return e === t ? this : (this.resolution = t,
            this.valid && (this.width = this.width * e / t,
            this.height = this.height * e / t,
            this.emit("update", this)),
            this._refreshPOT(),
            this)
        }
        ,
        e.prototype.setResource = function(t) {
            if (this.resource === t)
                return this;
            if (this.resource)
                throw new Error("Resource can be set only once");
            return t.bind(this),
            this.resource = t,
            this
        }
        ,
        e.prototype.update = function() {
            this.valid ? (this.dirtyId++,
            this.dirtyStyleId++,
            this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0,
            this.emit("loaded", this),
            this.emit("update", this))
        }
        ,
        e.prototype.onError = function(t) {
            this.emit("error", this, t)
        }
        ,
        e.prototype.destroy = function() {
            this.resource && (this.resource.unbind(this),
            this.resource.internal && this.resource.destroy(),
            this.resource = null),
            this.cacheId && (delete Ka[this.cacheId],
            delete ya[this.cacheId],
            this.cacheId = null),
            this.dispose(),
            e.removeFromCache(this),
            this.textureCacheIds = null,
            this.destroyed = !0
        }
        ,
        e.prototype.dispose = function() {
            this.emit("dispose", this)
        }
        ,
        e.prototype.castToBaseTexture = function() {
            return this
        }
        ,
        e.from = function(t, r, i) {
            void 0 === i && (i = aa.STRICT_TEXTURE_CACHE);
            var o = "string" == typeof t
              , n = null;
            if (o)
                n = t;
            else {
                if (!t._pixiId) {
                    var s = r && r.pixiIdPrefix || "pixiid";
                    t._pixiId = s + "_" + ub()
                }
                n = t._pixiId
            }
            var a = Ka[n];
            if (o && i && !a)
                throw new Error("The cacheId \"" + n + "\" does not exist in BaseTextureCache.");
            return a || ((a = new e(t,r)).cacheId = n,
            e.addToCache(a, n)),
            a
        }
        ,
        e.fromBuffer = function(t, r, i, o) {
            t = t || new Float32Array(r * i * 4);
            var n = new Ab(t,{
                width: r,
                height: i
            })
              , s = t instanceof Float32Array ? ua.FLOAT : ua.UNSIGNED_BYTE;
            return new e(n,Object.assign(_f, o || {
                width: r,
                height: i,
                type: s
            }))
        }
        ,
        e.addToCache = function(t, e) {
            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e),
            Ka[e] && console.warn("BaseTexture added to the cache with an id [" + e + "] that already had an entry"),
            Ka[e] = t)
        }
        ,
        e.removeFromCache = function(t) {
            if ("string" == typeof t) {
                var e = Ka[t];
                if (e) {
                    var r = e.textureCacheIds.indexOf(t);
                    return r > -1 && e.textureCacheIds.splice(r, 1),
                    delete Ka[t],
                    e
                }
            } else if (t && t.textureCacheIds) {
                for (var i = 0; i < t.textureCacheIds.length; ++i)
                    delete Ka[t.textureCacheIds[i]];
                return t.textureCacheIds.length = 0,
                t
            }
            return null
        }
        ,
        e._globalBatch = 0,
        e
    }(rb.d)
      , bc = function(t) {
        function e(e, r) {
            var i = this
              , o = r || {}
              , n = o.width
              , s = o.height;
            (i = t.call(this, n, s) || this).items = [],
            i.itemDirtyIds = [];
            for (var a = 0; a < e; a++) {
                var u = new ia;
                i.items.push(u),
                i.itemDirtyIds.push(-2)
            }
            return i.length = e,
            i._load = null,
            i.baseTexture = null,
            i
        }
        return ba(e, t),
        e.prototype.initFromArray = function(t, e) {
            for (var r = 0; r < this.length; r++)
                t[r] && (t[r].castToBaseTexture ? this.addBaseTextureAt(t[r].castToBaseTexture(), r) : t[r]instanceof Wa ? this.addResourceAt(t[r], r) : this.addResourceAt(ac(t[r], e), r))
        }
        ,
        e.prototype.dispose = function() {
            for (var t = 0, e = this.length; t < e; t++)
                this.items[t].destroy();
            this.items = null,
            this.itemDirtyIds = null,
            this._load = null
        }
        ,
        e.prototype.addResourceAt = function(t, e) {
            if (!this.items[e])
                throw new Error("Index " + e + " is out of bounds");
            return t.valid && !this.valid && this.resize(t.width, t.height),
            this.items[e].setResource(t),
            this
        }
        ,
        e.prototype.bind = function(e) {
            if (null !== this.baseTexture)
                throw new Error("Only one base texture per TextureArray is allowed");
            t.prototype.bind.call(this, e);
            for (var r = 0; r < this.length; r++)
                this.items[r].parentTextureArray = e,
                this.items[r].on("update", e.update, e)
        }
        ,
        e.prototype.unbind = function(e) {
            t.prototype.unbind.call(this, e);
            for (var r = 0; r < this.length; r++)
                this.items[r].parentTextureArray = null,
                this.items[r].off("update", e.update, e)
        }
        ,
        e.prototype.load = function() {
            var t = this;
            if (this._load)
                return this._load;
            var e = this.items.map(function(t) {
                return t.resource
            }).filter(function(t) {
                return t
            }).map(function(t) {
                return t.load()
            });
            return this._load = Promise.all(e).then(function() {
                var e = t.items[0]
                  , r = e.realWidth
                  , i = e.realHeight;
                return t.resize(r, i),
                Promise.resolve(t)
            }),
            this._load
        }
        ,
        e
    }(Wa)
      , md = function(t) {
        function e(e, r) {
            var i, o, n = this, s = r || {}, a = s.width, u = s.height;
            return Array.isArray(e) ? (i = e,
            o = e.length) : o = e,
            n = t.call(this, o, {
                width: a,
                height: u
            }) || this,
            i && n.initFromArray(i, r),
            n
        }
        return ba(e, t),
        e.prototype.addBaseTextureAt = function(t, e) {
            if (!t.resource)
                throw new Error("ArrayResource does not support RenderTexture");
            return this.addResourceAt(t.resource, e),
            this
        }
        ,
        e.prototype.bind = function(e) {
            t.prototype.bind.call(this, e),
            e.target = Sa.TEXTURE_2D_ARRAY
        }
        ,
        e.prototype.upload = function(t, e, r) {
            var i = this.length
              , o = this.itemDirtyIds
              , n = this.items
              , s = t.gl;
            r.dirtyId < 0 && s.texImage3D(s.TEXTURE_2D_ARRAY, 0, e.format, this._width, this._height, i, 0, e.format, e.type, null);
            for (var a = 0; a < i; a++) {
                var u = n[a];
                o[a] < u.dirtyId && (o[a] = u.dirtyId,
                u.valid && s.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, a, u.resource.width, u.resource.height, 1, e.format, e.type, u.resource.source))
            }
            return !0
        }
        ,
        e
    }(bc)
      , za = function(t) {
        function e(e) {
            var r = this
              , i = e
              , o = i.naturalWidth || i.videoWidth || i.width
              , n = i.naturalHeight || i.videoHeight || i.height;
            return (r = t.call(this, o, n) || this).source = e,
            r.noSubImage = !1,
            r
        }
        return ba(e, t),
        e.crossOrigin = function(t, e, r) {
            void 0 === r && 0 !== e.indexOf("data:") ? t.crossOrigin = Qf(e) : !1 !== r && (t.crossOrigin = "string" == typeof r ? r : "anonymous")
        }
        ,
        e.prototype.upload = function(t, e, r, i) {
            var o = t.gl
              , n = e.realWidth
              , s = e.realHeight;
            return i = i || this.source,
            o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === Ia.UNPACK),
            this.noSubImage || e.target !== o.TEXTURE_2D || r.width !== n || r.height !== s ? (r.width = n,
            r.height = s,
            o.texImage2D(e.target, 0, e.format, e.format, e.type, i)) : o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, e.format, e.type, i),
            !0
        }
        ,
        e.prototype.update = function() {
            if (!this.destroyed) {
                var e = this.source
                  , r = e.naturalWidth || e.videoWidth || e.width
                  , i = e.naturalHeight || e.videoHeight || e.height;
                this.resize(r, i),
                t.prototype.update.call(this)
            }
        }
        ,
        e.prototype.dispose = function() {
            this.source = null
        }
        ,
        e
    }(Wa)
      , cc = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return ba(e, t),
        e.test = function(t) {
            var e = self.OffscreenCanvas;
            return !!(e && t instanceof e) || self.HTMLCanvasElement && t instanceof HTMLCanvasElement
        }
        ,
        e
    }(za)
      , nd = function(t) {
        function e(r, i) {
            var o = this
              , n = i || {}
              , s = n.width
              , a = n.height
              , u = n.autoLoad
              , h = n.linkBaseTexture;
            if (r && r.length !== e.SIDES)
                throw new Error("Invalid length. Got " + r.length + ", expected 6");
            o = t.call(this, 6, {
                width: s,
                height: a
            }) || this;
            for (var $ = 0; $ < e.SIDES; $++)
                o.items[$].target = Sa.TEXTURE_CUBE_MAP_POSITIVE_X + $;
            return o.linkBaseTexture = !1 !== h,
            r && o.initFromArray(r, i),
            !1 !== u && o.load(),
            o
        }
        return ba(e, t),
        e.prototype.bind = function(e) {
            t.prototype.bind.call(this, e),
            e.target = Sa.TEXTURE_CUBE_MAP
        }
        ,
        e.prototype.addBaseTextureAt = function(t, e, r) {
            if (void 0 === r && (r = this.linkBaseTexture),
            !this.items[e])
                throw new Error("Index " + e + " is out of bounds");
            if (!this.linkBaseTexture || t.parentTextureArray || Object.keys(t._glTextures).length > 0) {
                if (!t.resource)
                    throw new Error("CubeResource does not support copying of renderTexture.");
                this.addResourceAt(t.resource, e)
            } else
                t.target = Sa.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                t.parentTextureArray = this.baseTexture,
                this.items[e] = t;
            return t.valid && !this.valid && this.resize(t.realWidth, t.realHeight),
            this.items[e] = t,
            this
        }
        ,
        e.prototype.upload = function(t, r, i) {
            for (var o = this.itemDirtyIds, n = 0; n < e.SIDES; n++) {
                var s = this.items[n];
                o[n] < s.dirtyId && (s.valid && s.resource ? (s.resource.upload(t, s, i),
                o[n] = s.dirtyId) : o[n] < -1 && (t.gl.texImage2D(s.target, 0, i.internalFormat, r.realWidth, r.realHeight, 0, r.format, i.type, null),
                o[n] = -1))
            }
            return !0
        }
        ,
        e.test = function(t) {
            return Array.isArray(t) && t.length === e.SIDES
        }
        ,
        e.SIDES = 6,
        e
    }(bc)
      , dc = function(t) {
        function e(e, r) {
            var i = this;
            if (r = r || {},
            !(e instanceof HTMLImageElement)) {
                var o = new Image;
                za.crossOrigin(o, e, r.crossorigin),
                o.src = e,
                e = o
            }
            return i = t.call(this, e) || this,
            !e.complete && i._width && i._height && (i._width = 0,
            i._height = 0),
            i.url = e.src,
            i._process = null,
            i.preserveBitmap = !1,
            i.createBitmap = (void 0 !== r.createBitmap ? r.createBitmap : aa.CREATE_IMAGE_BITMAP) && !!self.createImageBitmap,
            i.alphaMode = "number" == typeof r.alphaMode ? r.alphaMode : null,
            i.bitmap = null,
            i._load = null,
            !1 !== r.autoLoad && i.load(),
            i
        }
        return ba(e, t),
        e.prototype.load = function(t) {
            var e = this;
            return this._load ? this._load : (void 0 !== t && (this.createBitmap = t),
            this._load = new Promise(function(t, r) {
                var i = e.source;
                e.url = i.src;
                var o = function() {
                    e.destroyed || (i.onload = null,
                    i.onerror = null,
                    e.resize(i.width, i.height),
                    e._load = null,
                    e.createBitmap ? t(e.process()) : t(e))
                };
                i.complete && i.src ? o() : (i.onload = o,
                i.onerror = function(t) {
                    r(t),
                    e.onError.emit(t)
                }
                )
            }
            ),
            this._load)
        }
        ,
        e.prototype.process = function() {
            var t = this
              , e = this.source;
            return null !== this._process ? this._process : null === this.bitmap && self.createImageBitmap ? (this._process = self.createImageBitmap(e, 0, 0, e.width, e.height, {
                premultiplyAlpha: this.alphaMode === Ia.UNPACK ? "premultiply" : "none"
            }).then(function(e) {
                return t.destroyed ? Promise.reject() : (t.bitmap = e,
                t.update(),
                t._process = null,
                Promise.resolve(t))
            }),
            this._process) : Promise.resolve(this)
        }
        ,
        e.prototype.upload = function(e, r, i) {
            if ("number" == typeof this.alphaMode && (r.alphaMode = this.alphaMode),
            !this.createBitmap)
                return t.prototype.upload.call(this, e, r, i);
            if (!this.bitmap && (this.process(),
            !this.bitmap))
                return !1;
            if (t.prototype.upload.call(this, e, r, i, this.bitmap),
            !this.preserveBitmap) {
                var o = !0
                  , n = r._glTextures;
                for (var s in n) {
                    var a = n[s];
                    if (a !== i && a.dirtyId !== r.dirtyId) {
                        o = !1;
                        break
                    }
                }
                o && (this.bitmap.close && this.bitmap.close(),
                this.bitmap = null)
            }
            return !0
        }
        ,
        e.prototype.dispose = function() {
            this.source.onload = null,
            this.source.onerror = null,
            t.prototype.dispose.call(this),
            this.bitmap && (this.bitmap.close(),
            this.bitmap = null),
            this._process = null,
            this._load = null
        }
        ,
        e.test = function(t) {
            return "string" == typeof t || t instanceof HTMLImageElement
        }
        ,
        e
    }(za)
      , od = function(t) {
        function e(e, r) {
            var i = this;
            return r = r || {},
            (i = t.call(this, document.createElement("canvas")) || this)._width = 0,
            i._height = 0,
            i.svg = e,
            i.scale = r.scale || 1,
            i._overrideWidth = r.width,
            i._overrideHeight = r.height,
            i._resolve = null,
            i._crossorigin = r.crossorigin,
            i._load = null,
            !1 !== r.autoLoad && i.load(),
            i
        }
        return ba(e, t),
        e.prototype.load = function() {
            var t = this;
            return this._load ? this._load : (this._load = new Promise(function(e) {
                if (t._resolve = function() {
                    t.resize(t.source.width, t.source.height),
                    e(t)
                }
                ,
                /^\<svg/.test(t.svg.trim())) {
                    if (!btoa)
                        throw new Error("Your browser doesn't support base64 conversions.");
                    t.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(t.svg)))
                }
                t._loadSvg()
            }
            ),
            this._load)
        }
        ,
        e.prototype._loadSvg = function() {
            var t = this
              , e = new Image;
            za.crossOrigin(e, this.svg, this._crossorigin),
            e.src = this.svg,
            e.onerror = function(r) {
                t._resolve && (e.onerror = null,
                t.onError.emit(r))
            }
            ,
            e.onload = function() {
                if (t._resolve) {
                    var r = e.width
                      , i = e.height;
                    if (!r || !i)
                        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                    var o = r * t.scale
                      , n = i * t.scale;
                    (t._overrideWidth || t._overrideHeight) && (o = t._overrideWidth || t._overrideHeight / i * r,
                    n = t._overrideHeight || t._overrideWidth / r * i),
                    o = Math.round(o),
                    n = Math.round(n);
                    var s = t.source;
                    s.width = o,
                    s.height = n,
                    s._pixiId = "canvas_" + ub(),
                    s.getContext("2d").drawImage(e, 0, 0, r, i, 0, 0, o, n),
                    t._resolve(),
                    t._resolve = null
                }
            }
        }
        ,
        e.getSize = function(t) {
            var r = e.SVG_SIZE.exec(t)
              , i = {};
            return r && (i[r[1]] = Math.round(parseFloat(r[3])),
            i[r[5]] = Math.round(parseFloat(r[7]))),
            i
        }
        ,
        e.prototype.dispose = function() {
            t.prototype.dispose.call(this),
            this._resolve = null,
            this._crossorigin = null
        }
        ,
        e.test = function(t, e) {
            return "svg" === e || "string" == typeof t && /^data:image\/svg\+xml(;(charset=utf8|utf8))?;base64/.test(t) || "string" == typeof t && 0 === t.indexOf("<svg")
        }
        ,
        e.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i,
        e
    }(za)
      , pd = function(t) {
        function e(r, i) {
            var o = this;
            if (i = i || {},
            !(r instanceof HTMLVideoElement)) {
                var n = document.createElement("video");
                n.setAttribute("preload", "auto"),
                n.setAttribute("webkit-playsinline", ""),
                n.setAttribute("playsinline", ""),
                "string" == typeof r && (r = [r]);
                var s = r[0].src || r[0];
                za.crossOrigin(n, s, i.crossorigin);
                for (var a = 0; a < r.length; ++a) {
                    var u = document.createElement("source")
                      , h = r[a]
                      , $ = h.src
                      , p = h.mime
                      , l = ($ = $ || r[a]).split("?").shift().toLowerCase()
                      , c = l.substr(l.lastIndexOf(".") + 1);
                    p = p || e.MIME_TYPES[c] || "video/" + c,
                    u.src = $,
                    u.type = p,
                    n.appendChild(u)
                }
                r = n
            }
            return (o = t.call(this, r) || this).noSubImage = !0,
            o._autoUpdate = !0,
            o._isConnectedToTicker = !1,
            o._updateFPS = i.updateFPS || 0,
            o._msToNextUpdate = 0,
            o.autoPlay = !1 !== i.autoPlay,
            o._load = null,
            o._resolve = null,
            o._onCanPlay = o._onCanPlay.bind(o),
            o._onError = o._onError.bind(o),
            !1 !== i.autoLoad && o.load(),
            o
        }
        return ba(e, t),
        e.prototype.update = function(e) {
            if (!this.destroyed) {
                var r = Ea.shared.elapsedMS * this.source.playbackRate;
                this._msToNextUpdate = Math.floor(this._msToNextUpdate - r),
                (!this._updateFPS || this._msToNextUpdate <= 0) && (t.prototype.update.call(this),
                this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0)
            }
        }
        ,
        e.prototype.load = function() {
            var t = this;
            if (this._load)
                return this._load;
            var e = this.source;
            return (e.readyState === e.HAVE_ENOUGH_DATA || e.readyState === e.HAVE_FUTURE_DATA) && e.width && e.height && (e.complete = !0),
            e.addEventListener("play", this._onPlayStart.bind(this)),
            e.addEventListener("pause", this._onPlayStop.bind(this)),
            this._isSourceReady() ? this._onCanPlay() : (e.addEventListener("canplay", this._onCanPlay),
            e.addEventListener("canplaythrough", this._onCanPlay),
            e.addEventListener("error", this._onError, !0)),
            this._load = new Promise(function(r) {
                t.valid ? r(t) : (t._resolve = r,
                e.load())
            }
            ),
            this._load
        }
        ,
        e.prototype._onError = function(t) {
            this.source.removeEventListener("error", this._onError, !0),
            this.onError.emit(t)
        }
        ,
        e.prototype._isSourcePlaying = function() {
            var t = this.source;
            return t.currentTime > 0 && !1 === t.paused && !1 === t.ended && t.readyState > 2
        }
        ,
        e.prototype._isSourceReady = function() {
            var t = this.source;
            return 3 === t.readyState || 4 === t.readyState
        }
        ,
        e.prototype._onPlayStart = function() {
            this.valid || this._onCanPlay(),
            this.autoUpdate && !this._isConnectedToTicker && (Ea.shared.add(this.update, this),
            this._isConnectedToTicker = !0)
        }
        ,
        e.prototype._onPlayStop = function() {
            this._isConnectedToTicker && (Ea.shared.remove(this.update, this),
            this._isConnectedToTicker = !1)
        }
        ,
        e.prototype._onCanPlay = function() {
            var t = this.source;
            t.removeEventListener("canplay", this._onCanPlay),
            t.removeEventListener("canplaythrough", this._onCanPlay);
            var e = this.valid;
            this.resize(t.videoWidth, t.videoHeight),
            !e && this._resolve && (this._resolve(this),
            this._resolve = null),
            this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && t.play()
        }
        ,
        e.prototype.dispose = function() {
            this._isConnectedToTicker && Ea.shared.remove(this.update, this);
            var e = this.source;
            e && (e.removeEventListener("error", this._onError, !0),
            e.pause(),
            e.src = "",
            e.load()),
            t.prototype.dispose.call(this)
        }
        ,
        Object.defineProperty(e.prototype, "autoUpdate", {
            get: function() {
                return this._autoUpdate
            },
            set: function(t) {
                t !== this._autoUpdate && (this._autoUpdate = t,
                !this._autoUpdate && this._isConnectedToTicker ? (Ea.shared.remove(this.update, this),
                this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (Ea.shared.add(this.update, this),
                this._isConnectedToTicker = !0))
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "updateFPS", {
            get: function() {
                return this._updateFPS
            },
            set: function(t) {
                t !== this._updateFPS && (this._updateFPS = t)
            },
            enumerable: !1,
            configurable: !0
        }),
        e.test = function(t, r) {
            return self.HTMLVideoElement && t instanceof HTMLVideoElement || e.TYPES.indexOf(r) > -1
        }
        ,
        e.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"],
        e.MIME_TYPES = {
            ogv: "video/ogg",
            mov: "video/quicktime",
            m4v: "video/mp4"
        },
        e
    }(za)
      , qd = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return ba(e, t),
        e.test = function(t) {
            return !!self.createImageBitmap && t instanceof ImageBitmap
        }
        ,
        e
    }(za);
    zb.push(dc, qd, cc, pd, od, Ab, nd, md);
    var rd = {
        __proto__: null,
        Resource: Wa,
        BaseImageResource: za,
        INSTALLED: zb,
        autoDetectResource: ac,
        AbstractMultiResource: bc,
        ArrayResource: md,
        BufferResource: Ab,
        CanvasResource: cc,
        CubeResource: nd,
        ImageResource: dc,
        SVGResource: od,
        VideoResource: pd,
        ImageBitmapResource: qd
    }
      , pa = function() {
        function t(t) {
            this.renderer = t
        }
        return t.prototype.destroy = function() {
            this.renderer = null
        }
        ,
        t
    }()
      , ag = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return ba(e, t),
        e.prototype.upload = function(t, e, r) {
            var i = t.gl;
            return i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === Ia.UNPACK),
            r.width === e.width && r.height === e.height ? i.texSubImage2D(e.target, 0, 0, 0, e.width, e.height, e.format, e.type, this.data) : (r.width = e.width,
            r.height = e.height,
            i.texImage2D(e.target, 0, 1 === t.context.webGLVersion ? i.DEPTH_COMPONENT : i.DEPTH_COMPONENT16, e.width, e.height, 0, e.format, e.type, this.data)),
            !0
        }
        ,
        e
    }(Ab)
      , ec = function() {
        function t(t, e) {
            this.width = Math.ceil(t || 100),
            this.height = Math.ceil(e || 100),
            this.stencil = !1,
            this.depth = !1,
            this.dirtyId = 0,
            this.dirtyFormat = 0,
            this.dirtySize = 0,
            this.depthTexture = null,
            this.colorTextures = [],
            this.glFramebuffers = {},
            this.disposeRunner = new ka("disposeFramebuffer"),
            this.multisample = _a.NONE
        }
        return Object.defineProperty(t.prototype, "colorTexture", {
            get: function() {
                return this.colorTextures[0]
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.addColorTexture = function(t, e) {
            return void 0 === t && (t = 0),
            this.colorTextures[t] = e || new ia(null,{
                scaleMode: Ca.NEAREST,
                resolution: 1,
                mipmap: $a.OFF,
                width: this.width,
                height: this.height
            }),
            this.dirtyId++,
            this.dirtyFormat++,
            this
        }
        ,
        t.prototype.addDepthTexture = function(t) {
            return this.depthTexture = t || new ia(new ag(null,{
                width: this.width,
                height: this.height
            }),{
                scaleMode: Ca.NEAREST,
                resolution: 1,
                width: this.width,
                height: this.height,
                mipmap: $a.OFF,
                format: kb.DEPTH_COMPONENT,
                type: ua.UNSIGNED_SHORT
            }),
            this.dirtyId++,
            this.dirtyFormat++,
            this
        }
        ,
        t.prototype.enableDepth = function() {
            return this.depth = !0,
            this.dirtyId++,
            this.dirtyFormat++,
            this
        }
        ,
        t.prototype.enableStencil = function() {
            return this.stencil = !0,
            this.dirtyId++,
            this.dirtyFormat++,
            this
        }
        ,
        t.prototype.resize = function(t, e) {
            if (t = Math.ceil(t),
            e = Math.ceil(e),
            t !== this.width || e !== this.height) {
                this.width = t,
                this.height = e,
                this.dirtyId++,
                this.dirtySize++;
                for (var r = 0; r < this.colorTextures.length; r++) {
                    var i = this.colorTextures[r]
                      , o = i.resolution;
                    i.setSize(t / o, e / o)
                }
                if (this.depthTexture) {
                    o = this.depthTexture.resolution;
                    this.depthTexture.setSize(t / o, e / o)
                }
            }
        }
        ,
        t.prototype.dispose = function() {
            this.disposeRunner.emit(this, !1)
        }
        ,
        t.prototype.destroyDepthTexture = function() {
            this.depthTexture && (this.depthTexture.destroy(),
            this.depthTexture = null,
            ++this.dirtyId,
            ++this.dirtyFormat)
        }
        ,
        t
    }()
      , sd = function(t) {
        function e(e) {
            var r = this;
            "number" == typeof e && (e = {
                width: arguments[0],
                height: arguments[1],
                scaleMode: arguments[2],
                resolution: arguments[3]
            });
            r = t.call(this, null, e) || this;
            var i = e || {}
              , o = i.width
              , n = i.height;
            return r.mipmap = 0,
            r.width = Math.ceil(o) || 100,
            r.height = Math.ceil(n) || 100,
            r.valid = !0,
            r.clearColor = [0, 0, 0, 0],
            r.framebuffer = new ec(r.width * r.resolution,r.height * r.resolution).addColorTexture(0, r),
            r.maskStack = [],
            r.filterStack = [{}],
            r
        }
        return ba(e, t),
        e.prototype.resize = function(t, e) {
            t = Math.ceil(t),
            e = Math.ceil(e),
            this.framebuffer.resize(t * this.resolution, e * this.resolution)
        }
        ,
        e.prototype.dispose = function() {
            this.framebuffer.dispose(),
            t.prototype.dispose.call(this)
        }
        ,
        e.prototype.destroy = function() {
            t.prototype.destroy.call(this),
            this.framebuffer.destroyDepthTexture(),
            this.framebuffer = null
        }
        ,
        e
    }(ia)
      , td = function() {
        function t() {
            this.x0 = 0,
            this.y0 = 0,
            this.x1 = 1,
            this.y1 = 0,
            this.x2 = 1,
            this.y2 = 1,
            this.x3 = 0,
            this.y3 = 1,
            this.uvsFloat32 = new Float32Array(8)
        }
        return t.prototype.set = function(t, e, r) {
            var i = e.width
              , o = e.height;
            if (r) {
                var n = t.width / 2 / i
                  , s = t.height / 2 / o
                  , a = t.x / i + n
                  , u = t.y / o + s;
                r = ea.add(r, ea.NW),
                this.x0 = a + n * ea.uX(r),
                this.y0 = u + s * ea.uY(r),
                r = ea.add(r, 2),
                this.x1 = a + n * ea.uX(r),
                this.y1 = u + s * ea.uY(r),
                r = ea.add(r, 2),
                this.x2 = a + n * ea.uX(r),
                this.y2 = u + s * ea.uY(r),
                r = ea.add(r, 2),
                this.x3 = a + n * ea.uX(r),
                this.y3 = u + s * ea.uY(r)
            } else
                this.x0 = t.x / i,
                this.y0 = t.y / o,
                this.x1 = (t.x + t.width) / i,
                this.y1 = t.y / o,
                this.x2 = (t.x + t.width) / i,
                this.y2 = (t.y + t.height) / o,
                this.x3 = t.x / i,
                this.y3 = (t.y + t.height) / o;
            this.uvsFloat32[0] = this.x0,
            this.uvsFloat32[1] = this.y0,
            this.uvsFloat32[2] = this.x1,
            this.uvsFloat32[3] = this.y1,
            this.uvsFloat32[4] = this.x2,
            this.uvsFloat32[5] = this.y2,
            this.uvsFloat32[6] = this.x3,
            this.uvsFloat32[7] = this.y3
        }
        ,
        t.prototype.toString = function() {
            return "[@pixi/core:TextureUvs x0=" + this.x0 + " y0=" + this.y0 + " x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3 + "]"
        }
        ,
        t
    }()
      , ud = new td
      , oa = function(t) {
        function e(r, i, o, n, s, a) {
            var u = t.call(this) || this;
            if (u.noFrame = !1,
            i || (u.noFrame = !0,
            i = new da(0,0,1,1)),
            r instanceof e && (r = r.baseTexture),
            u.baseTexture = r,
            u._frame = i,
            u.trim = n,
            u.valid = !1,
            u._uvs = ud,
            u.uvMatrix = null,
            u.orig = o || i,
            u._rotate = Number(s || 0),
            !0 === s)
                u._rotate = 2;
            else if (u._rotate % 2 != 0)
                throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
            return u.defaultAnchor = a ? new ra(a.x,a.y) : new ra(0,0),
            u._updateID = 0,
            u.textureCacheIds = [],
            r.valid ? u.noFrame ? r.valid && u.onBaseTextureUpdated(r) : u.frame = i : r.once("loaded", u.onBaseTextureUpdated, u),
            u.noFrame && r.on("update", u.onBaseTextureUpdated, u),
            u
        }
        return ba(e, t),
        e.prototype.update = function() {
            this.baseTexture.resource && this.baseTexture.resource.update()
        }
        ,
        e.prototype.onBaseTextureUpdated = function(t) {
            if (this.noFrame) {
                if (!this.baseTexture.valid)
                    return;
                this._frame.width = t.width,
                this._frame.height = t.height,
                this.valid = !0,
                this.updateUvs()
            } else
                this.frame = this._frame;
            this.emit("update", this)
        }
        ,
        e.prototype.destroy = function(t) {
            if (this.baseTexture) {
                if (t) {
                    var r = this.baseTexture.resource;
                    r && r.url && ya[r.url] && e.removeFromCache(r.url),
                    this.baseTexture.destroy()
                }
                this.baseTexture.off("loaded", this.onBaseTextureUpdated, this),
                this.baseTexture.off("update", this.onBaseTextureUpdated, this),
                this.baseTexture = null
            }
            this._frame = null,
            this._uvs = null,
            this.trim = null,
            this.orig = null,
            this.valid = !1,
            e.removeFromCache(this),
            this.textureCacheIds = null
        }
        ,
        e.prototype.clone = function() {
            return new e(this.baseTexture,this.frame.clone(),this.orig.clone(),this.trim && this.trim.clone(),this.rotate,this.defaultAnchor)
        }
        ,
        e.prototype.updateUvs = function() {
            this._uvs === ud && (this._uvs = new td),
            this._uvs.set(this._frame, this.baseTexture, this.rotate),
            this._updateID++
        }
        ,
        e.from = function(t, r, i) {
            void 0 === r && (r = {}),
            void 0 === i && (i = aa.STRICT_TEXTURE_CACHE);
            var o = "string" == typeof t
              , n = null;
            if (o)
                n = t;
            else {
                if (!t._pixiId) {
                    var s = r && r.pixiIdPrefix || "pixiid";
                    t._pixiId = s + "_" + ub()
                }
                n = t._pixiId
            }
            var a = ya[n];
            if (o && i && !a)
                throw new Error("The cacheId \"" + n + "\" does not exist in TextureCache.");
            return a || (r.resolution || (r.resolution = kd(t)),
            (a = new e(new ia(t,r))).baseTexture.cacheId = n,
            ia.addToCache(a.baseTexture, n),
            e.addToCache(a, n)),
            a
        }
        ,
        e.fromURL = function(t, r) {
            var i = Object.assign({
                autoLoad: !1
            }, null == r ? void 0 : r.resourceOptions)
              , o = e.from(t, Object.assign({
                resourceOptions: i
            }, r), !1)
              , n = o.baseTexture.resource;
            return o.baseTexture.valid ? Promise.resolve(o) : n.load().then(function() {
                return Promise.resolve(o)
            })
        }
        ,
        e.fromBuffer = function(t, r, i, o) {
            return new e(ia.fromBuffer(t, r, i, o))
        }
        ,
        e.fromLoader = function(t, r, i, o) {
            var n = new ia(t,Object.assign({
                scaleMode: aa.SCALE_MODE,
                resolution: kd(r)
            }, o))
              , s = n.resource;
            s instanceof dc && (s.url = r);
            var a = new e(n);
            return i || (i = r),
            ia.addToCache(a.baseTexture, i),
            e.addToCache(a, i),
            i !== r && (ia.addToCache(a.baseTexture, r),
            e.addToCache(a, r)),
            a.baseTexture.valid ? Promise.resolve(a) : new Promise(function(t) {
                a.baseTexture.once("loaded", function() {
                    return t(a)
                })
            }
            )
        }
        ,
        e.addToCache = function(t, e) {
            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e),
            ya[e] && console.warn("Texture added to the cache with an id [" + e + "] that already had an entry"),
            ya[e] = t)
        }
        ,
        e.removeFromCache = function(t) {
            if ("string" == typeof t) {
                var e = ya[t];
                if (e) {
                    var r = e.textureCacheIds.indexOf(t);
                    return r > -1 && e.textureCacheIds.splice(r, 1),
                    delete ya[t],
                    e
                }
            } else if (t && t.textureCacheIds) {
                for (var i = 0; i < t.textureCacheIds.length; ++i)
                    ya[t.textureCacheIds[i]] === t && delete ya[t.textureCacheIds[i]];
                return t.textureCacheIds.length = 0,
                t
            }
            return null
        }
        ,
        Object.defineProperty(e.prototype, "resolution", {
            get: function() {
                return this.baseTexture.resolution
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "frame", {
            get: function() {
                return this._frame
            },
            set: function(t) {
                this._frame = t,
                this.noFrame = !1;
                var e = t.x
                  , r = t.y
                  , i = t.width
                  , o = t.height
                  , n = e + i > this.baseTexture.width
                  , s = r + o > this.baseTexture.height;
                if (n || s) {
                    var a = n && s ? "and" : "or"
                      , u = "X: " + e + " + " + i + " = " + (e + i) + " > " + this.baseTexture.width
                      , h = "Y: " + r + " + " + o + " = " + (r + o) + " > " + this.baseTexture.height;
                    throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + u + " " + a + " " + h)
                }
                this.valid = i && o && this.baseTexture.valid,
                this.trim || this.rotate || (this.orig = t),
                this.valid && this.updateUvs()
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "rotate", {
            get: function() {
                return this._rotate
            },
            set: function(t) {
                this._rotate = t,
                this.valid && this.updateUvs()
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "width", {
            get: function() {
                return this.orig.width
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "height", {
            get: function() {
                return this.orig.height
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.castToBaseTexture = function() {
            return this.baseTexture
        }
        ,
        e
    }(rb.d);
    function bg() {
        var t = document.createElement("canvas");
        t.width = 16,
        t.height = 16;
        var e = t.getContext("2d");
        return e.fillStyle = "white",
        e.fillRect(0, 0, 16, 16),
        new oa(new ia(new cc(t)))
    }
    function Bb(t) {
        t.destroy = function() {}
        ,
        t.on = function() {}
        ,
        t.once = function() {}
        ,
        t.emit = function() {}
    }
    oa.EMPTY = new oa(new ia()),
    Bb(oa.EMPTY),
    Bb(oa.EMPTY.baseTexture),
    oa.WHITE = bg(),
    Bb(oa.WHITE),
    Bb(oa.WHITE.baseTexture);
    var fc = function(t) {
        function e(e, r) {
            var i = t.call(this, e, r) || this;
            return i.valid = !0,
            i.filterFrame = null,
            i.filterPoolKey = null,
            i.updateUvs(),
            i
        }
        return ba(e, t),
        Object.defineProperty(e.prototype, "framebuffer", {
            get: function() {
                return this.baseTexture.framebuffer
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.resize = function(t, e, r) {
            void 0 === r && (r = !0),
            t = Math.ceil(t),
            e = Math.ceil(e),
            this.valid = t > 0 && e > 0,
            this._frame.width = this.orig.width = t,
            this._frame.height = this.orig.height = e,
            r && this.baseTexture.resize(t, e),
            this.updateUvs()
        }
        ,
        e.prototype.setResolution = function(t) {
            var e = this.baseTexture;
            e.resolution !== t && (e.setResolution(t),
            this.resize(e.width, e.height, !1))
        }
        ,
        e.create = function(t) {
            for (var r = arguments, i = [], o = 1; o < arguments.length; o++)
                i[o - 1] = r[o];
            return "number" == typeof t && (Va("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."),
            t = {
                width: t,
                height: i[0],
                scaleMode: i[1],
                resolution: i[2]
            }),
            new e(new sd(t))
        }
        ,
        e
    }(oa)
      , cg = function() {
        function t(t) {
            this.texturePool = {},
            this.textureOptions = t || {},
            this.enableFullScreen = !1,
            this._pixelsWidth = 0,
            this._pixelsHeight = 0
        }
        return t.prototype.createTexture = function(t, e) {
            var r = new sd(Object.assign({
                width: t,
                height: e,
                resolution: 1
            }, this.textureOptions));
            return new fc(r)
        }
        ,
        t.prototype.getOptimalTexture = function(e, r, i) {
            void 0 === i && (i = 1);
            var o = t.SCREEN_KEY;
            e *= i,
            r *= i,
            this.enableFullScreen && e === this._pixelsWidth && r === this._pixelsHeight || (o = (65535 & (e = sb(e))) << 16 | 65535 & (r = sb(r))),
            this.texturePool[o] || (this.texturePool[o] = []);
            var n = this.texturePool[o].pop();
            return n || (n = this.createTexture(e, r)),
            n.filterPoolKey = o,
            n.setResolution(i),
            n
        }
        ,
        t.prototype.getFilterTexture = function(t, e) {
            var r = this.getOptimalTexture(t.width, t.height, e || t.resolution);
            return r.filterFrame = t.filterFrame,
            r
        }
        ,
        t.prototype.returnTexture = function(t) {
            var e = t.filterPoolKey;
            t.filterFrame = null,
            this.texturePool[e].push(t)
        }
        ,
        t.prototype.returnFilterTexture = function(t) {
            this.returnTexture(t)
        }
        ,
        t.prototype.clear = function(t) {
            if (t = !1 !== t)
                for (var e in this.texturePool) {
                    var r = this.texturePool[e];
                    if (r)
                        for (var i = 0; i < r.length; i++)
                            r[i].destroy(!0)
                }
            this.texturePool = {}
        }
        ,
        t.prototype.setScreenSize = function(e) {
            if (e.width !== this._pixelsWidth || e.height !== this._pixelsHeight) {
                var r = t.SCREEN_KEY
                  , i = this.texturePool[r];
                if (this.enableFullScreen = e.width > 0 && e.height > 0,
                i)
                    for (var o = 0; o < i.length; o++)
                        i[o].destroy(!0);
                this.texturePool[r] = [],
                this._pixelsWidth = e.width,
                this._pixelsHeight = e.height
            }
        }
        ,
        t.SCREEN_KEY = "screen",
        t
    }()
      , vd = function() {
        function t(t, e, r, i, o, n, s) {
            void 0 === e && (e = 0),
            void 0 === r && (r = !1),
            void 0 === i && (i = 5126),
            this.buffer = t,
            this.size = e,
            this.normalized = r,
            this.type = i,
            this.stride = o,
            this.start = n,
            this.instance = s
        }
        return t.prototype.destroy = function() {
            this.buffer = null
        }
        ,
        t.from = function(e, r, i, o, n) {
            return new t(e,r,i,o,n)
        }
        ,
        t
    }()
      , dg = 0
      , ta = function() {
        function t(t, e, r) {
            void 0 === e && (e = !0),
            void 0 === r && (r = !1),
            this.data = t || new Float32Array(1),
            this._glBuffers = {},
            this._updateID = 0,
            this.index = r,
            this.static = e,
            this.id = dg++,
            this.disposeRunner = new ka("disposeBuffer")
        }
        return t.prototype.update = function(t) {
            this.data = t || this.data,
            this._updateID++
        }
        ,
        t.prototype.dispose = function() {
            this.disposeRunner.emit(this, !1)
        }
        ,
        t.prototype.destroy = function() {
            this.dispose(),
            this.data = null
        }
        ,
        t.from = function(e) {
            return e instanceof Array && (e = new Float32Array(e)),
            new t(e)
        }
        ,
        t
    }();
    function wd(t) {
        if (4 === t.BYTES_PER_ELEMENT)
            return t instanceof Float32Array ? "Float32Array" : t instanceof Uint32Array ? "Uint32Array" : "Int32Array";
        if (2 === t.BYTES_PER_ELEMENT) {
            if (t instanceof Uint16Array)
                return "Uint16Array"
        } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array)
            return "Uint8Array";
        return null
    }
    var eg = {
        Float32Array: Float32Array,
        Uint32Array: Uint32Array,
        Int32Array: Int32Array,
        Uint8Array: Uint8Array
    };
    function fg(t, e) {
        for (var r = 0, i = 0, o = {}, n = 0; n < t.length; n++)
            i += e[n],
            r += t[n].length;
        var s = new ArrayBuffer(4 * r)
          , a = null
          , u = 0;
        for (n = 0; n < t.length; n++) {
            var h = e[n]
              , $ = t[n]
              , p = wd($);
            o[p] || (o[p] = new eg[p](s)),
            a = o[p];
            for (var l = 0; l < $.length; l++) {
                a[(l / h | 0) * i + u + l % h] = $[l]
            }
            u += h
        }
        return new Float32Array(s)
    }
    var xd = {
        5126: 4,
        5123: 2,
        5121: 1
    }
      , gg = 0
      , hg = {
        Float32Array: Float32Array,
        Uint32Array: Uint32Array,
        Int32Array: Int32Array,
        Uint8Array: Uint8Array,
        Uint16Array: Uint16Array
    }
      , gc = function() {
        function t(t, e) {
            void 0 === t && (t = []),
            void 0 === e && (e = {}),
            this.buffers = t,
            this.indexBuffer = null,
            this.attributes = e,
            this.glVertexArrayObjects = {},
            this.id = gg++,
            this.instanced = !1,
            this.instanceCount = 1,
            this.disposeRunner = new ka("disposeGeometry"),
            this.refCount = 0
        }
        return t.prototype.addAttribute = function(t, e, r, i, o, n, s, a) {
            if (void 0 === r && (r = 0),
            void 0 === i && (i = !1),
            void 0 === a && (a = !1),
            !e)
                throw new Error("You must pass a buffer when creating an attribute");
            e instanceof ta || (e instanceof Array && (e = new Float32Array(e)),
            e = new ta(e));
            var u = t.split("|");
            if (u.length > 1) {
                for (var h = 0; h < u.length; h++)
                    this.addAttribute(u[h], e, r, i, o);
                return this
            }
            var $ = this.buffers.indexOf(e);
            return -1 === $ && (this.buffers.push(e),
            $ = this.buffers.length - 1),
            this.attributes[t] = new vd($,r,i,o,n,s,a),
            this.instanced = this.instanced || a,
            this
        }
        ,
        t.prototype.getAttribute = function(t) {
            return this.attributes[t]
        }
        ,
        t.prototype.getBuffer = function(t) {
            return this.buffers[this.getAttribute(t).buffer]
        }
        ,
        t.prototype.addIndex = function(t) {
            return t instanceof ta || (t instanceof Array && (t = new Uint16Array(t)),
            t = new ta(t)),
            t.index = !0,
            this.indexBuffer = t,
            -1 === this.buffers.indexOf(t) && this.buffers.push(t),
            this
        }
        ,
        t.prototype.getIndex = function() {
            return this.indexBuffer
        }
        ,
        t.prototype.interleave = function() {
            if (1 === this.buffers.length || 2 === this.buffers.length && this.indexBuffer)
                return this;
            var t, e = [], r = [], i = new ta;
            for (t in this.attributes) {
                var o = this.attributes[t]
                  , n = this.buffers[o.buffer];
                e.push(n.data),
                r.push(o.size * xd[o.type] / 4),
                o.buffer = 0
            }
            for (i.data = fg(e, r),
            t = 0; t < this.buffers.length; t++)
                this.buffers[t] !== this.indexBuffer && this.buffers[t].destroy();
            return this.buffers = [i],
            this.indexBuffer && this.buffers.push(this.indexBuffer),
            this
        }
        ,
        t.prototype.getSize = function() {
            for (var t in this.attributes) {
                var e = this.attributes[t];
                return this.buffers[e.buffer].data.length / (e.stride / 4 || e.size)
            }
            return 0
        }
        ,
        t.prototype.dispose = function() {
            this.disposeRunner.emit(this, !1)
        }
        ,
        t.prototype.destroy = function() {
            this.dispose(),
            this.buffers = null,
            this.indexBuffer = null,
            this.attributes = null
        }
        ,
        t.prototype.clone = function() {
            for (var e = new t, r = 0; r < this.buffers.length; r++)
                e.buffers[r] = new ta(this.buffers[r].data.slice(0));
            for (var r in this.attributes) {
                var i = this.attributes[r];
                e.attributes[r] = new vd(i.buffer,i.size,i.normalized,i.type,i.stride,i.start,i.instance)
            }
            return this.indexBuffer && (e.indexBuffer = e.buffers[this.buffers.indexOf(this.indexBuffer)],
            e.indexBuffer.index = !0),
            e
        }
        ,
        t.merge = function(e) {
            for (var r, i = new t, o = [], n = [], s = [], a = 0; a < e.length; a++) {
                r = e[a];
                for (var u = 0; u < r.buffers.length; u++)
                    n[u] = n[u] || 0,
                    n[u] += r.buffers[u].data.length,
                    s[u] = 0
            }
            for (a = 0; a < r.buffers.length; a++)
                o[a] = new hg[wd(r.buffers[a].data)](n[a]),
                i.buffers[a] = new ta(o[a]);
            for (a = 0; a < e.length; a++) {
                r = e[a];
                for (u = 0; u < r.buffers.length; u++)
                    o[u].set(r.buffers[u].data, s[u]),
                    s[u] += r.buffers[u].data.length
            }
            if (i.attributes = r.attributes,
            r.indexBuffer) {
                i.indexBuffer = i.buffers[r.buffers.indexOf(r.indexBuffer)],
                i.indexBuffer.index = !0;
                var h = 0
                  , $ = 0
                  , p = 0
                  , l = 0;
                for (a = 0; a < r.buffers.length; a++)
                    if (r.buffers[a] !== r.indexBuffer) {
                        l = a;
                        break
                    }
                for (var a in r.attributes) {
                    var c = r.attributes[a];
                    (0 | c.buffer) === l && ($ += c.size * xd[c.type] / 4)
                }
                for (a = 0; a < e.length; a++) {
                    var d = e[a].indexBuffer.data;
                    for (u = 0; u < d.length; u++)
                        i.indexBuffer.data[u + p] += h;
                    h += r.buffers[l].data.length / $,
                    p += d.length
                }
            }
            return i
        }
        ,
        t
    }()
      , ig = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.addAttribute("aVertexPosition", new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).addIndex([0, 1, 3, 2]),
            e
        }
        return ba(e, t),
        e
    }(gc)
      , jg = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
            e.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            e.vertexBuffer = new ta(e.vertices),
            e.uvBuffer = new ta(e.uvs),
            e.addAttribute("aVertexPosition", e.vertexBuffer).addAttribute("aTextureCoord", e.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]),
            e
        }
        return ba(e, t),
        e.prototype.map = function(t, e) {
            var r = 0
              , i = 0;
            return this.uvs[0] = r,
            this.uvs[1] = i,
            this.uvs[2] = r + e.width / t.width,
            this.uvs[3] = i,
            this.uvs[4] = r + e.width / t.width,
            this.uvs[5] = i + e.height / t.height,
            this.uvs[6] = r,
            this.uvs[7] = i + e.height / t.height,
            r = e.x,
            i = e.y,
            this.vertices[0] = r,
            this.vertices[1] = i,
            this.vertices[2] = r + e.width,
            this.vertices[3] = i,
            this.vertices[4] = r + e.width,
            this.vertices[5] = i + e.height,
            this.vertices[6] = r,
            this.vertices[7] = i + e.height,
            this.invalidate(),
            this
        }
        ,
        e.prototype.invalidate = function() {
            return this.vertexBuffer._updateID++,
            this.uvBuffer._updateID++,
            this
        }
        ,
        e
    }(gc)
      , kg = 0
      , Pa = function() {
        function t(t, e) {
            this.uniforms = t,
            this.group = !0,
            this.syncUniforms = {},
            this.dirtyId = 0,
            this.id = kg++,
            this.static = !!e
        }
        return t.prototype.update = function() {
            this.dirtyId++
        }
        ,
        t.prototype.add = function(e, r, i) {
            this.uniforms[e] = new t(r,i)
        }
        ,
        t.from = function(e, r) {
            return new t(e,r)
        }
        ,
        t
    }()
      , lg = function() {
        function t() {
            this.renderTexture = null,
            this.target = null,
            this.legacy = !1,
            this.resolution = 1,
            this.sourceFrame = new da,
            this.destinationFrame = new da,
            this.bindingSourceFrame = new da,
            this.bindingDestinationFrame = new da,
            this.filters = [],
            this.transform = null
        }
        return t.prototype.clear = function() {
            this.target = null,
            this.filters = null,
            this.renderTexture = null
        }
        ,
        t
    }()
      , Cb = [new ra, new ra, new ra, new ra]
      , hc = new la
      , yd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.defaultFilterStack = [{}],
            r.texturePool = new cg,
            r.texturePool.setScreenSize(e.view),
            r.statePool = [],
            r.quad = new ig,
            r.quadUv = new jg,
            r.tempRect = new da,
            r.activeState = {},
            r.globalUniforms = new Pa({
                outputFrame: new da,
                inputSize: new Float32Array(4),
                inputPixel: new Float32Array(4),
                inputClamp: new Float32Array(4),
                resolution: 1,
                filterArea: new Float32Array(4),
                filterClamp: new Float32Array(4)
            },!0),
            r.forceClear = !1,
            r.useMaxPadding = !1,
            r
        }
        return ba(e, t),
        e.prototype.push = function(t, e) {
            for (var r = this.renderer, i = this.defaultFilterStack, o = this.statePool.pop() || new lg, n = this.renderer.renderTexture, s = e[0].resolution, a = e[0].padding, u = e[0].autoFit, h = e[0].legacy, $ = 1; $ < e.length; $++) {
                var p = e[$];
                s = Math.min(s, p.resolution),
                a = this.useMaxPadding ? Math.max(a, p.padding) : a + p.padding,
                u = u && p.autoFit,
                h = h || p.legacy
            }
            if (1 === i.length && (this.defaultFilterStack[0].renderTexture = n.current),
            i.push(o),
            o.resolution = s,
            o.legacy = h,
            o.target = t,
            o.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)),
            o.sourceFrame.pad(a),
            u) {
                var l = this.tempRect.copyFrom(n.sourceFrame);
                r.projection.transform && this.transformAABB(hc.copyFrom(r.projection.transform).invert(), l),
                o.sourceFrame.fit(l)
            }
            this.roundFrame(o.sourceFrame, n.current ? n.current.resolution : r.resolution, n.sourceFrame, n.destinationFrame, r.projection.transform),
            o.renderTexture = this.getOptimalFilterTexture(o.sourceFrame.width, o.sourceFrame.height, s),
            o.filters = e,
            o.destinationFrame.width = o.renderTexture.width,
            o.destinationFrame.height = o.renderTexture.height;
            var c = this.tempRect;
            c.x = 0,
            c.y = 0,
            c.width = o.sourceFrame.width,
            c.height = o.sourceFrame.height,
            o.renderTexture.filterFrame = o.sourceFrame,
            o.bindingSourceFrame.copyFrom(n.sourceFrame),
            o.bindingDestinationFrame.copyFrom(n.destinationFrame),
            o.transform = r.projection.transform,
            r.projection.transform = null,
            n.bind(o.renderTexture, o.sourceFrame, c),
            r.framebuffer.clear(0, 0, 0, 0)
        }
        ,
        e.prototype.pop = function() {
            var t = this.defaultFilterStack
              , e = t.pop()
              , r = e.filters;
            this.activeState = e;
            var i = this.globalUniforms.uniforms;
            i.outputFrame = e.sourceFrame,
            i.resolution = e.resolution;
            var o = i.inputSize
              , n = i.inputPixel
              , s = i.inputClamp;
            if (o[0] = e.destinationFrame.width,
            o[1] = e.destinationFrame.height,
            o[2] = 1 / o[0],
            o[3] = 1 / o[1],
            n[0] = o[0] * e.resolution,
            n[1] = o[1] * e.resolution,
            n[2] = 1 / n[0],
            n[3] = 1 / n[1],
            s[0] = .5 * n[2],
            s[1] = .5 * n[3],
            s[2] = e.sourceFrame.width * o[2] - .5 * n[2],
            s[3] = e.sourceFrame.height * o[3] - .5 * n[3],
            e.legacy) {
                var a = i.filterArea;
                a[0] = e.destinationFrame.width,
                a[1] = e.destinationFrame.height,
                a[2] = e.sourceFrame.x,
                a[3] = e.sourceFrame.y,
                i.filterClamp = i.inputClamp
            }
            this.globalUniforms.update();
            var u = t[t.length - 1];
            if (e.renderTexture.framebuffer.multisample > 1 && this.renderer.framebuffer.blit(),
            1 === r.length)
                r[0].apply(this, e.renderTexture, u.renderTexture, Ja.BLEND, e),
                this.returnFilterTexture(e.renderTexture);
            else {
                var h = e.renderTexture
                  , $ = this.getOptimalFilterTexture(h.width, h.height, e.resolution);
                $.filterFrame = h.filterFrame;
                var p = 0;
                for (p = 0; p < r.length - 1; ++p) {
                    r[p].apply(this, h, $, Ja.CLEAR, e);
                    var l = h;
                    h = $,
                    $ = l
                }
                r[p].apply(this, h, u.renderTexture, Ja.BLEND, e),
                this.returnFilterTexture(h),
                this.returnFilterTexture($)
            }
            e.clear(),
            this.statePool.push(e)
        }
        ,
        e.prototype.bindAndClear = function(t, e) {
            void 0 === e && (e = Ja.CLEAR);
            var r = this.renderer
              , i = r.renderTexture
              , o = r.state;
            if (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null,
            t && t.filterFrame) {
                var n = this.tempRect;
                n.x = 0,
                n.y = 0,
                n.width = t.filterFrame.width,
                n.height = t.filterFrame.height,
                i.bind(t, t.filterFrame, n)
            } else
                t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? i.bind(t) : this.renderer.renderTexture.bind(t, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
            var s = 1 & o.stateId || this.forceClear;
            (e === Ja.CLEAR || e === Ja.BLIT && s) && this.renderer.framebuffer.clear(0, 0, 0, 0)
        }
        ,
        e.prototype.applyFilter = function(t, e, r, i) {
            var o = this.renderer;
            o.state.set(t.state),
            this.bindAndClear(r, i),
            t.uniforms.uSampler = e,
            t.uniforms.filterGlobals = this.globalUniforms,
            o.shader.bind(t),
            t.legacy ? (this.quadUv.map(e._frame, e.filterFrame),
            o.geometry.bind(this.quadUv),
            o.geometry.draw(Ba.TRIANGLES)) : (o.geometry.bind(this.quad),
            o.geometry.draw(Ba.TRIANGLE_STRIP))
        }
        ,
        e.prototype.calculateSpriteMatrix = function(t, e) {
            var r = this.activeState
              , i = r.sourceFrame
              , o = r.destinationFrame
              , n = e._texture.orig
              , s = t.set(o.width, 0, 0, o.height, i.x, i.y)
              , a = e.worldTransform.copyTo(la.TEMP_MATRIX);
            return a.invert(),
            s.prepend(a),
            s.scale(1 / n.width, 1 / n.height),
            s.translate(e.anchor.x, e.anchor.y),
            s
        }
        ,
        e.prototype.destroy = function() {
            this.texturePool.clear(!1)
        }
        ,
        e.prototype.getOptimalFilterTexture = function(t, e, r) {
            return void 0 === r && (r = 1),
            this.texturePool.getOptimalTexture(t, e, r)
        }
        ,
        e.prototype.getFilterTexture = function(t, e) {
            if ("number" == typeof t) {
                var r = t;
                t = e,
                e = r
            }
            t = t || this.activeState.renderTexture;
            var i = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution);
            return i.filterFrame = t.filterFrame,
            i
        }
        ,
        e.prototype.returnFilterTexture = function(t) {
            this.texturePool.returnTexture(t)
        }
        ,
        e.prototype.emptyPool = function() {
            this.texturePool.clear(!0)
        }
        ,
        e.prototype.resize = function() {
            this.texturePool.setScreenSize(this.renderer.view)
        }
        ,
        e.prototype.transformAABB = function(t, e) {
            var r = Cb[0]
              , i = Cb[1]
              , o = Cb[2]
              , n = Cb[3];
            r.set(e.left, e.top),
            i.set(e.left, e.bottom),
            o.set(e.right, e.top),
            n.set(e.right, e.bottom),
            t.apply(r, r),
            t.apply(i, i),
            t.apply(o, o),
            t.apply(n, n);
            var s = Math.min(r.x, i.x, o.x, n.x)
              , a = Math.min(r.y, i.y, o.y, n.y)
              , u = Math.max(r.x, i.x, o.x, n.x)
              , h = Math.max(r.y, i.y, o.y, n.y);
            e.x = s,
            e.y = a,
            e.width = u - s,
            e.height = h - a
        }
        ,
        e.prototype.roundFrame = function(t, e, r, i, o) {
            if (o) {
                var n = o.a
                  , s = o.b
                  , a = o.c
                  , u = o.d;
                if (!(0 === s && 0 === a || 0 === n && 0 === u))
                    return
            }
            (o = o ? hc.copyFrom(o) : hc.identity()).translate(-r.x, -r.y).scale(i.width / r.width, i.height / r.height).translate(i.x, i.y),
            this.transformAABB(o, t),
            t.ceil(e),
            this.transformAABB(o.invert(), t)
        }
        ,
        e
    }(pa)
      , zd = function() {
        function t(t) {
            this.renderer = t
        }
        return t.prototype.flush = function() {}
        ,
        t.prototype.destroy = function() {
            this.renderer = null
        }
        ,
        t.prototype.start = function() {}
        ,
        t.prototype.stop = function() {
            this.flush()
        }
        ,
        t.prototype.render = function(t) {}
        ,
        t
    }()
      , Ad = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.emptyRenderer = new zd(e),
            r.currentRenderer = r.emptyRenderer,
            r
        }
        return ba(e, t),
        e.prototype.setObjectRenderer = function(t) {
            this.currentRenderer !== t && (this.currentRenderer.stop(),
            this.currentRenderer = t,
            this.currentRenderer.start())
        }
        ,
        e.prototype.flush = function() {
            this.setObjectRenderer(this.emptyRenderer)
        }
        ,
        e.prototype.reset = function() {
            this.setObjectRenderer(this.emptyRenderer)
        }
        ,
        e.prototype.copyBoundTextures = function(t, e) {
            for (var r = this.renderer.texture.boundTextures, i = e - 1; i >= 0; --i)
                t[i] = r[i] || null,
                t[i] && (t[i]._batchLocation = i)
        }
        ,
        e.prototype.boundArray = function(t, e, r, i) {
            for (var o = t.elements, n = t.ids, s = t.count, a = 0, u = 0; u < s; u++) {
                var h = o[u]
                  , $ = h._batchLocation;
                if ($ >= 0 && $ < i && e[$] === h)
                    n[u] = $;
                else
                    for (; a < i; ) {
                        var p = e[a];
                        if (!p || p._batchEnabled !== r || p._batchLocation !== a) {
                            n[u] = a,
                            h._batchLocation = a,
                            e[a] = h;
                            break
                        }
                        a++
                    }
            }
        }
        ,
        e
    }(pa)
      , Bd = 0
      , Cd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.webGLVersion = 1,
            r.extensions = {},
            r.supports = {
                uint32Indices: !1
            },
            r.handleContextLost = r.handleContextLost.bind(r),
            r.handleContextRestored = r.handleContextRestored.bind(r),
            e.view.addEventListener("webglcontextlost", r.handleContextLost, !1),
            e.view.addEventListener("webglcontextrestored", r.handleContextRestored, !1),
            r
        }
        return ba(e, t),
        Object.defineProperty(e.prototype, "isLost", {
            get: function() {
                return !this.gl || this.gl.isContextLost()
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.contextChange = function(t) {
            this.gl = t,
            this.renderer.gl = t,
            this.renderer.CONTEXT_UID = Bd++,
            t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext()
        }
        ,
        e.prototype.initFromContext = function(t) {
            this.gl = t,
            this.validateContext(t),
            this.renderer.gl = t,
            this.renderer.CONTEXT_UID = Bd++,
            this.renderer.runners.contextChange.emit(t)
        }
        ,
        e.prototype.initFromOptions = function(t) {
            var e = this.createContext(this.renderer.view, t);
            this.initFromContext(e)
        }
        ,
        e.prototype.createContext = function(t, e) {
            var r;
            if (aa.PREFER_ENV >= Aa.WEBGL2 && (r = t.getContext("webgl2", e)),
            r)
                this.webGLVersion = 2;
            else if (this.webGLVersion = 1,
            !(r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e)))
                throw new Error("This browser does not support WebGL. Try using the canvas renderer");
            return this.gl = r,
            this.getExtensions(),
            this.gl
        }
        ,
        e.prototype.getExtensions = function() {
            var t = this.gl
              , e = {
                anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
                floatTextureLinear: t.getExtension("OES_texture_float_linear"),
                s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
                s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
                etc: t.getExtension("WEBGL_compressed_texture_etc"),
                etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
                pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
                atc: t.getExtension("WEBGL_compressed_texture_atc"),
                astc: t.getExtension("WEBGL_compressed_texture_astc")
            };
            1 === this.webGLVersion ? Object.assign(this.extensions, e, {
                drawBuffers: t.getExtension("WEBGL_draw_buffers"),
                depthTexture: t.getExtension("WEBGL_depth_texture"),
                loseContext: t.getExtension("WEBGL_lose_context"),
                vertexArrayObject: t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"),
                uint32ElementIndex: t.getExtension("OES_element_index_uint"),
                floatTexture: t.getExtension("OES_texture_float"),
                floatTextureLinear: t.getExtension("OES_texture_float_linear"),
                textureHalfFloat: t.getExtension("OES_texture_half_float"),
                textureHalfFloatLinear: t.getExtension("OES_texture_half_float_linear")
            }) : 2 === this.webGLVersion && Object.assign(this.extensions, e, {
                colorBufferFloat: t.getExtension("EXT_color_buffer_float")
            })
        }
        ,
        e.prototype.handleContextLost = function(t) {
            t.preventDefault()
        }
        ,
        e.prototype.handleContextRestored = function() {
            this.renderer.runners.contextChange.emit(this.gl)
        }
        ,
        e.prototype.destroy = function() {
            var t = this.renderer.view;
            t.removeEventListener("webglcontextlost", this.handleContextLost),
            t.removeEventListener("webglcontextrestored", this.handleContextRestored),
            this.gl.useProgram(null),
            this.extensions.loseContext && this.extensions.loseContext.loseContext()
        }
        ,
        e.prototype.postrender = function() {
            this.renderer.renderingToScreen && this.gl.flush()
        }
        ,
        e.prototype.validateContext = function(t) {
            var e = t.getContextAttributes()
              , r = "WebGL2RenderingContext"in self && t instanceof self.WebGL2RenderingContext;
            r && (this.webGLVersion = 2),
            e.stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
            var i = r || !!t.getExtension("OES_element_index_uint");
            this.supports.uint32Indices = i,
            i || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")
        }
        ,
        e
    }(pa)
      , mg = function() {
        return function(t) {
            this.framebuffer = t,
            this.stencil = null,
            this.dirtyId = 0,
            this.dirtyFormat = 0,
            this.dirtySize = 0,
            this.multisample = _a.NONE,
            this.msaaBuffer = null,
            this.blitFramebuffer = null
        }
    }()
      , ng = new da
      , Dd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.managedFramebuffers = [],
            r.unknownFramebuffer = new ec(10,10),
            r.msaaSamples = null,
            r
        }
        return ba(e, t),
        e.prototype.contextChange = function() {
            var t = this.gl = this.renderer.gl;
            if (this.CONTEXT_UID = this.renderer.CONTEXT_UID,
            this.current = this.unknownFramebuffer,
            this.viewport = new da,
            this.hasMRT = !0,
            this.writeDepthTexture = !0,
            this.disposeAll(!0),
            1 === this.renderer.context.webGLVersion) {
                var e = this.renderer.context.extensions.drawBuffers
                  , r = this.renderer.context.extensions.depthTexture;
                aa.PREFER_ENV === Aa.WEBGL_LEGACY && (e = null,
                r = null),
                e ? t.drawBuffers = function(t) {
                    return e.drawBuffersWEBGL(t)
                }
                : (this.hasMRT = !1,
                t.drawBuffers = function() {}
                ),
                r || (this.writeDepthTexture = !1)
            } else
                this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES)
        }
        ,
        e.prototype.bind = function(t, e) {
            var r = this.gl;
            if (t) {
                var i = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
                this.current !== t && (this.current = t,
                r.bindFramebuffer(r.FRAMEBUFFER, i.framebuffer)),
                i.dirtyId !== t.dirtyId && (i.dirtyId = t.dirtyId,
                i.dirtyFormat !== t.dirtyFormat ? (i.dirtyFormat = t.dirtyFormat,
                this.updateFramebuffer(t)) : i.dirtySize !== t.dirtySize && (i.dirtySize = t.dirtySize,
                this.resizeFramebuffer(t)));
                for (var o = 0; o < t.colorTextures.length; o++) {
                    var n = t.colorTextures[o];
                    this.renderer.texture.unbind(n.parentTextureArray || n)
                }
                t.depthTexture && this.renderer.texture.unbind(t.depthTexture),
                e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, t.width, t.height)
            } else
                this.current && (this.current = null,
                r.bindFramebuffer(r.FRAMEBUFFER, null)),
                e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height)
        }
        ,
        e.prototype.setViewport = function(t, e, r, i) {
            var o = this.viewport;
            o.width === r && o.height === i && o.x === t && o.y === e || (o.x = t,
            o.y = e,
            o.width = r,
            o.height = i,
            this.gl.viewport(t, e, r, i))
        }
        ,
        Object.defineProperty(e.prototype, "size", {
            get: function() {
                return this.current ? {
                    x: 0,
                    y: 0,
                    width: this.current.width,
                    height: this.current.height
                } : {
                    x: 0,
                    y: 0,
                    width: this.renderer.width,
                    height: this.renderer.height
                }
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.clear = function(t, e, r, i, o) {
            void 0 === o && (o = Qb.COLOR | Qb.DEPTH);
            var n = this.gl;
            n.clearColor(t, e, r, i),
            n.clear(o)
        }
        ,
        e.prototype.initFramebuffer = function(t) {
            var e = this.gl
              , r = new mg(e.createFramebuffer());
            return r.multisample = this.detectSamples(t.multisample),
            t.glFramebuffers[this.CONTEXT_UID] = r,
            this.managedFramebuffers.push(t),
            t.disposeRunner.add(this),
            r
        }
        ,
        e.prototype.resizeFramebuffer = function(t) {
            var e = this.gl
              , r = t.glFramebuffers[this.CONTEXT_UID];
            r.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil),
            e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
            for (var i = t.colorTextures, o = 0; o < i.length; o++)
                this.renderer.texture.bind(i[o], 0);
            t.depthTexture && this.renderer.texture.bind(t.depthTexture, 0)
        }
        ,
        e.prototype.updateFramebuffer = function(t) {
            var e = this.gl
              , r = t.glFramebuffers[this.CONTEXT_UID]
              , i = t.colorTextures.length;
            e.drawBuffers || (i = Math.min(i, 1)),
            r.multisample > 1 && (r.msaaBuffer = e.createRenderbuffer(),
            e.bindRenderbuffer(e.RENDERBUFFER, r.msaaBuffer),
            e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.RGBA8, t.width, t.height),
            e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, r.msaaBuffer));
            for (var o = [], n = 0; n < i; n++)
                if (!(0 === n && r.multisample > 1)) {
                    var s = t.colorTextures[n]
                      , a = s.parentTextureArray || s;
                    this.renderer.texture.bind(a, 0),
                    e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, s.target, a._glTextures[this.CONTEXT_UID].texture, 0),
                    o.push(e.COLOR_ATTACHMENT0 + n)
                }
            if ((o.length > 1 && e.drawBuffers(o),
            t.depthTexture) && this.writeDepthTexture) {
                var u = t.depthTexture;
                this.renderer.texture.bind(u, 0),
                e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, u._glTextures[this.CONTEXT_UID].texture, 0)
            }
            r.stencil || !t.stencil && !t.depth || (r.stencil = e.createRenderbuffer(),
            e.bindRenderbuffer(e.RENDERBUFFER, r.stencil),
            e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height),
            t.depthTexture || e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, r.stencil))
        }
        ,
        e.prototype.detectSamples = function(t) {
            var e = this.msaaSamples
              , r = _a.NONE;
            if (t <= 1 || null === e)
                return r;
            for (var i = 0; i < e.length; i++)
                if (e[i] <= t) {
                    r = e[i];
                    break
                }
            return 1 === r && (r = _a.NONE),
            r
        }
        ,
        e.prototype.blit = function(t, e, r) {
            var i = this.current
              , o = this.renderer
              , n = this.gl
              , s = this.CONTEXT_UID;
            if (2 === o.context.webGLVersion && i) {
                var a = i.glFramebuffers[s];
                if (a) {
                    if (!t) {
                        if (a.multisample <= 1)
                            return;
                        a.blitFramebuffer || (a.blitFramebuffer = new ec(i.width,i.height),
                        a.blitFramebuffer.addColorTexture(0, i.colorTextures[0])),
                        (t = a.blitFramebuffer).width = i.width,
                        t.height = i.height
                    }
                    e || ((e = ng).width = i.width,
                    e.height = i.height),
                    r || (r = e);
                    var u = e.width === r.width && e.height === r.height;
                    this.bind(t),
                    n.bindFramebuffer(n.READ_FRAMEBUFFER, a.framebuffer),
                    n.blitFramebuffer(e.x, e.y, e.width, e.height, r.x, r.y, r.width, r.height, n.COLOR_BUFFER_BIT, u ? n.NEAREST : n.LINEAR)
                }
            }
        }
        ,
        e.prototype.disposeFramebuffer = function(t, e) {
            var r = t.glFramebuffers[this.CONTEXT_UID]
              , i = this.gl;
            if (r) {
                delete t.glFramebuffers[this.CONTEXT_UID];
                var o = this.managedFramebuffers.indexOf(t);
                o >= 0 && this.managedFramebuffers.splice(o, 1),
                t.disposeRunner.remove(this),
                e || (i.deleteFramebuffer(r.framebuffer),
                r.stencil && i.deleteRenderbuffer(r.stencil))
            }
        }
        ,
        e.prototype.disposeAll = function(t) {
            var e = this.managedFramebuffers;
            this.managedFramebuffers = [];
            for (var r = 0; r < e.length; r++)
                this.disposeFramebuffer(e[r], t)
        }
        ,
        e.prototype.forceStencil = function() {
            var t = this.current;
            if (t) {
                var e = t.glFramebuffers[this.CONTEXT_UID];
                if (e && !e.stencil) {
                    t.enableStencil();
                    var r = t.width
                      , i = t.height
                      , o = this.gl
                      , n = o.createRenderbuffer();
                    o.bindRenderbuffer(o.RENDERBUFFER, n),
                    o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_STENCIL, r, i),
                    e.stencil = n,
                    o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.RENDERBUFFER, n)
                }
            }
        }
        ,
        e.prototype.reset = function() {
            this.current = this.unknownFramebuffer,
            this.viewport = new da
        }
        ,
        e
    }(pa)
      , og = function() {
        return function(t) {
            this.buffer = t || null,
            this.updateID = -1,
            this.byteLength = -1,
            this.refCount = 0
        }
    }()
      , ic = {
        5126: 4,
        5123: 2,
        5121: 1
    }
      , Ed = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r._activeGeometry = null,
            r._activeVao = null,
            r.hasVao = !0,
            r.hasInstance = !0,
            r.canUseUInt32ElementIndex = !1,
            r.managedGeometries = {},
            r.managedBuffers = {},
            r
        }
        return ba(e, t),
        e.prototype.contextChange = function() {
            this.disposeAll(!0);
            var t = this.gl = this.renderer.gl
              , e = this.renderer.context;
            if (this.CONTEXT_UID = this.renderer.CONTEXT_UID,
            2 !== e.webGLVersion) {
                var r = this.renderer.context.extensions.vertexArrayObject;
                aa.PREFER_ENV === Aa.WEBGL_LEGACY && (r = null),
                r ? (t.createVertexArray = function() {
                    return r.createVertexArrayOES()
                }
                ,
                t.bindVertexArray = function(t) {
                    return r.bindVertexArrayOES(t)
                }
                ,
                t.deleteVertexArray = function(t) {
                    return r.deleteVertexArrayOES(t)
                }
                ) : (this.hasVao = !1,
                t.createVertexArray = function() {
                    return null
                }
                ,
                t.bindVertexArray = function() {
                    return null
                }
                ,
                t.deleteVertexArray = function() {
                    return null
                }
                )
            }
            if (2 !== e.webGLVersion) {
                var i = t.getExtension("ANGLE_instanced_arrays");
                i ? (t.vertexAttribDivisor = function(t, e) {
                    return i.vertexAttribDivisorANGLE(t, e)
                }
                ,
                t.drawElementsInstanced = function(t, e, r, o, n) {
                    return i.drawElementsInstancedANGLE(t, e, r, o, n)
                }
                ,
                t.drawArraysInstanced = function(t, e, r, o) {
                    return i.drawArraysInstancedANGLE(t, e, r, o)
                }
                ) : this.hasInstance = !1
            }
            this.canUseUInt32ElementIndex = 2 === e.webGLVersion || !!e.extensions.uint32ElementIndex
        }
        ,
        e.prototype.bind = function(t, e) {
            e = e || this.renderer.shader.shader;
            var r = this.gl
              , i = t.glVertexArrayObjects[this.CONTEXT_UID]
              , o = !1;
            i || (this.managedGeometries[t.id] = t,
            t.disposeRunner.add(this),
            t.glVertexArrayObjects[this.CONTEXT_UID] = i = {},
            o = !0);
            var n = i[e.program.id] || this.initGeometryVao(t, e.program, o);
            this._activeGeometry = t,
            this._activeVao !== n && (this._activeVao = n,
            this.hasVao ? r.bindVertexArray(n) : this.activateVao(t, e.program)),
            this.updateBuffers()
        }
        ,
        e.prototype.reset = function() {
            this.unbind()
        }
        ,
        e.prototype.updateBuffers = function() {
            for (var t = this._activeGeometry, e = this.gl, r = 0; r < t.buffers.length; r++) {
                var i = t.buffers[r]
                  , o = i._glBuffers[this.CONTEXT_UID];
                if (i._updateID !== o.updateID) {
                    o.updateID = i._updateID;
                    var n = i.index ? e.ELEMENT_ARRAY_BUFFER : e.ARRAY_BUFFER;
                    if (e.bindBuffer(n, o.buffer),
                    this._boundBuffer = o,
                    o.byteLength >= i.data.byteLength)
                        e.bufferSubData(n, 0, i.data);
                    else {
                        var s = i.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
                        o.byteLength = i.data.byteLength,
                        e.bufferData(n, i.data, s)
                    }
                }
            }
        }
        ,
        e.prototype.checkCompatibility = function(t, e) {
            var r = t.attributes
              , i = e.attributeData;
            for (var o in i)
                if (!r[o])
                    throw new Error("shader and geometry incompatible, geometry missing the \"" + o + "\" attribute")
        }
        ,
        e.prototype.getSignature = function(t, e) {
            var r = t.attributes
              , i = e.attributeData
              , o = ["g", t.id];
            for (var n in r)
                i[n] && o.push(n);
            return o.join("-")
        }
        ,
        e.prototype.initGeometryVao = function(t, e, r) {
            void 0 === r && (r = !0),
            this.checkCompatibility(t, e);
            var i = this.gl
              , o = this.CONTEXT_UID
              , n = this.getSignature(t, e)
              , s = t.glVertexArrayObjects[this.CONTEXT_UID]
              , a = s[n];
            if (a)
                return s[e.id] = a,
                a;
            var u = t.buffers
              , h = t.attributes
              , $ = {}
              , p = {};
            for (var l in u)
                $[l] = 0,
                p[l] = 0;
            for (var l in h)
                !h[l].size && e.attributeData[l] ? h[l].size = e.attributeData[l].size : h[l].size || console.warn("PIXI Geometry attribute '" + l + "' size cannot be determined (likely the bound shader does not have the attribute)"),
                $[h[l].buffer] += h[l].size * ic[h[l].type];
            for (var l in h) {
                var c = h[l]
                  , d = c.size;
                void 0 === c.stride && ($[c.buffer] === d * ic[c.type] ? c.stride = 0 : c.stride = $[c.buffer]),
                void 0 === c.start && (c.start = p[c.buffer],
                p[c.buffer] += d * ic[c.type])
            }
            a = i.createVertexArray(),
            i.bindVertexArray(a);
            for (var f = 0; f < u.length; f++) {
                var m = u[f];
                m._glBuffers[o] || (m._glBuffers[o] = new og(i.createBuffer()),
                this.managedBuffers[m.id] = m,
                m.disposeRunner.add(this)),
                r && m._glBuffers[o].refCount++
            }
            return this.activateVao(t, e),
            this._activeVao = a,
            s[e.id] = a,
            s[n] = a,
            a
        }
        ,
        e.prototype.disposeBuffer = function(t, e) {
            if (this.managedBuffers[t.id]) {
                delete this.managedBuffers[t.id];
                var r = t._glBuffers[this.CONTEXT_UID]
                  , i = this.gl;
                t.disposeRunner.remove(this),
                r && (e || i.deleteBuffer(r.buffer),
                delete t._glBuffers[this.CONTEXT_UID])
            }
        }
        ,
        e.prototype.disposeGeometry = function(t, e) {
            if (this.managedGeometries[t.id]) {
                delete this.managedGeometries[t.id];
                var r = t.glVertexArrayObjects[this.CONTEXT_UID]
                  , i = this.gl
                  , o = t.buffers;
                if (t.disposeRunner.remove(this),
                r) {
                    for (var n = 0; n < o.length; n++) {
                        var s = o[n]._glBuffers[this.CONTEXT_UID];
                        s.refCount--,
                        0 !== s.refCount || e || this.disposeBuffer(o[n], e)
                    }
                    if (!e)
                        for (var a in r)
                            if ("g" === a[0]) {
                                var u = r[a];
                                this._activeVao === u && this.unbind(),
                                i.deleteVertexArray(u)
                            }
                    delete t.glVertexArrayObjects[this.CONTEXT_UID]
                }
            }
        }
        ,
        e.prototype.disposeAll = function(t) {
            for (var e = Object.keys(this.managedGeometries), r = 0; r < e.length; r++)
                this.disposeGeometry(this.managedGeometries[e[r]], t);
            e = Object.keys(this.managedBuffers);
            for (r = 0; r < e.length; r++)
                this.disposeBuffer(this.managedBuffers[e[r]], t)
        }
        ,
        e.prototype.activateVao = function(t, e) {
            var r = this.gl
              , i = this.CONTEXT_UID
              , o = t.buffers
              , n = t.attributes;
            t.indexBuffer && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, t.indexBuffer._glBuffers[i].buffer);
            var s = null;
            for (var a in n) {
                var u = n[a]
                  , h = o[u.buffer]._glBuffers[i];
                if (e.attributeData[a]) {
                    s !== h && (r.bindBuffer(r.ARRAY_BUFFER, h.buffer),
                    s = h);
                    var $ = e.attributeData[a].location;
                    if (r.enableVertexAttribArray($),
                    r.vertexAttribPointer($, u.size, u.type || r.FLOAT, u.normalized, u.stride, u.start),
                    u.instance) {
                        if (!this.hasInstance)
                            throw new Error("geometry error, GPU Instancing is not supported on this device");
                        r.vertexAttribDivisor($, 1)
                    }
                }
            }
        }
        ,
        e.prototype.draw = function(t, e, r, i) {
            var o = this.gl
              , n = this._activeGeometry;
            if (n.indexBuffer) {
                var s = n.indexBuffer.data.BYTES_PER_ELEMENT
                  , a = 2 === s ? o.UNSIGNED_SHORT : o.UNSIGNED_INT;
                2 === s || 4 === s && this.canUseUInt32ElementIndex ? n.instanced ? o.drawElementsInstanced(t, e || n.indexBuffer.data.length, a, (r || 0) * s, i || 1) : o.drawElements(t, e || n.indexBuffer.data.length, a, (r || 0) * s) : console.warn("unsupported index buffer type: uint32")
            } else
                n.instanced ? o.drawArraysInstanced(t, r, e || n.getSize(), i || 1) : o.drawArrays(t, r, e || n.getSize());
            return this
        }
        ,
        e.prototype.unbind = function() {
            this.gl.bindVertexArray(null),
            this._activeVao = null,
            this._activeGeometry = null
        }
        ,
        e
    }(pa)
      , pg = function() {
        function t(t) {
            void 0 === t && (t = null),
            this.type = qa.NONE,
            this.autoDetect = !0,
            this.maskObject = t || null,
            this.pooled = !1,
            this.isMaskData = !0,
            this._stencilCounter = 0,
            this._scissorCounter = 0,
            this._scissorRect = null,
            this._target = null
        }
        return t.prototype.reset = function() {
            this.pooled && (this.maskObject = null,
            this.type = qa.NONE,
            this.autoDetect = !0),
            this._target = null
        }
        ,
        t.prototype.copyCountersOrReset = function(t) {
            t ? (this._stencilCounter = t._stencilCounter,
            this._scissorCounter = t._scissorCounter,
            this._scissorRect = t._scissorRect) : (this._stencilCounter = 0,
            this._scissorCounter = 0,
            this._scissorRect = null)
        }
        ,
        t
    }();
    function Fd(t, e, r) {
        var i = t.createShader(e);
        return t.shaderSource(i, r),
        t.compileShader(i),
        i
    }
    function Gd(t, e, r, i) {
        var o = Fd(t, t.VERTEX_SHADER, e)
          , n = Fd(t, t.FRAGMENT_SHADER, r)
          , s = t.createProgram();
        if (t.attachShader(s, o),
        t.attachShader(s, n),
        i)
            for (var a in i)
                t.bindAttribLocation(s, i[a], a);
        return t.linkProgram(s),
        t.getProgramParameter(s, t.LINK_STATUS) || (t.getShaderParameter(o, t.COMPILE_STATUS) || (console.warn(e),
        console.error(t.getShaderInfoLog(o))),
        t.getShaderParameter(n, t.COMPILE_STATUS) || (console.warn(r),
        console.error(t.getShaderInfoLog(n))),
        console.error("Pixi.js Error: Could not initialize shader."),
        console.error("gl.VALIDATE_STATUS", t.getProgramParameter(s, t.VALIDATE_STATUS)),
        console.error("gl.getError()", t.getError()),
        "" !== t.getProgramInfoLog(s) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(s)),
        t.deleteProgram(s),
        s = null),
        t.deleteShader(o),
        t.deleteShader(n),
        s
    }
    function jc(t) {
        for (var e = new Array(t), r = 0; r < e.length; r++)
            e[r] = !1;
        return e
    }
    function Hd(t, e) {
        switch (t) {
        case "float":
            return 0;
        case "vec2":
            return new Float32Array(2 * e);
        case "vec3":
            return new Float32Array(3 * e);
        case "vec4":
            return new Float32Array(4 * e);
        case "int":
        case "uint":
        case "sampler2D":
        case "sampler2DArray":
            return 0;
        case "ivec2":
            return new Int32Array(2 * e);
        case "ivec3":
            return new Int32Array(3 * e);
        case "ivec4":
            return new Int32Array(4 * e);
        case "uvec2":
            return new Uint32Array(2 * e);
        case "uvec3":
            return new Uint32Array(3 * e);
        case "uvec4":
            return new Uint32Array(4 * e);
        case "bool":
            return !1;
        case "bvec2":
            return jc(2 * e);
        case "bvec3":
            return jc(3 * e);
        case "bvec4":
            return jc(4 * e);
        case "mat2":
            return new Float32Array([1, 0, 0, 1]);
        case "mat3":
            return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        case "mat4":
            return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        return null
    }
    var Id, Jd = {}, Db = Jd;
    function Kd() {
        if (Db === Jd || Db && Db.isContextLost()) {
            var t = document.createElement("canvas")
              , e = void 0;
            aa.PREFER_ENV >= Aa.WEBGL2 && (e = t.getContext("webgl2", {})),
            e || ((e = t.getContext("webgl", {}) || t.getContext("experimental-webgl", {})) ? e.getExtension("WEBGL_draw_buffers") : e = null),
            Db = e
        }
        return Db
    }
    function qg() {
        if (!Id) {
            Id = xa.MEDIUM;
            var t = Kd();
            if (t && t.getShaderPrecisionFormat) {
                var e = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT);
                Id = e.precision ? xa.HIGH : xa.MEDIUM
            }
        }
        return Id
    }
    function Ld(t, e, r) {
        if ("precision" !== t.substring(0, 9)) {
            var i = e;
            return e === xa.HIGH && r !== xa.HIGH && (i = xa.MEDIUM),
            "precision " + i + " float;\n" + t
        }
        return r !== xa.HIGH && "precision highp" === t.substring(0, 15) ? t.replace("precision highp", "precision mediump") : t
    }
    var rg = {
        float: 1,
        vec2: 2,
        vec3: 3,
        vec4: 4,
        int: 1,
        ivec2: 2,
        ivec3: 3,
        ivec4: 4,
        uint: 1,
        uvec2: 2,
        uvec3: 3,
        uvec4: 4,
        bool: 1,
        bvec2: 2,
        bvec3: 3,
        bvec4: 4,
        mat2: 4,
        mat3: 9,
        mat4: 16,
        sampler2D: 1
    };
    function sg(t) {
        return rg[t]
    }
    var kc = null
      , Md = {
        FLOAT: "float",
        FLOAT_VEC2: "vec2",
        FLOAT_VEC3: "vec3",
        FLOAT_VEC4: "vec4",
        INT: "int",
        INT_VEC2: "ivec2",
        INT_VEC3: "ivec3",
        INT_VEC4: "ivec4",
        UNSIGNED_INT: "uint",
        UNSIGNED_INT_VEC2: "uvec2",
        UNSIGNED_INT_VEC3: "uvec3",
        UNSIGNED_INT_VEC4: "uvec4",
        BOOL: "bool",
        BOOL_VEC2: "bvec2",
        BOOL_VEC3: "bvec3",
        BOOL_VEC4: "bvec4",
        FLOAT_MAT2: "mat2",
        FLOAT_MAT3: "mat3",
        FLOAT_MAT4: "mat4",
        SAMPLER_2D: "sampler2D",
        INT_SAMPLER_2D: "sampler2D",
        UNSIGNED_INT_SAMPLER_2D: "sampler2D",
        SAMPLER_CUBE: "samplerCube",
        INT_SAMPLER_CUBE: "samplerCube",
        UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
        SAMPLER_2D_ARRAY: "sampler2DArray",
        INT_SAMPLER_2D_ARRAY: "sampler2DArray",
        UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
    };
    function Nd(t, e) {
        if (!kc) {
            var r = Object.keys(Md);
            kc = {};
            for (var i = 0; i < r.length; ++i) {
                var o = r[i];
                kc[t[o]] = Md[o]
            }
        }
        return kc[e]
    }
    var lc = [{
        test: function(t) {
            return "float" === t.type && 1 === t.size
        },
        code: function(t) {
            return "\n            if(uv[\"" + t + "\"] !== ud[\"" + t + "\"].value)\n            {\n                ud[\"" + t + "\"].value = uv[\"" + t + "\"]\n                gl.uniform1f(ud[\"" + t + "\"].location, uv[\"" + t + "\"])\n            }\n            "
        }
    }, {
        test: function(t) {
            return ("sampler2D" === t.type || "samplerCube" === t.type || "sampler2DArray" === t.type) && 1 === t.size && !t.isArray
        },
        code: function(t) {
            return "t = syncData.textureCount++;\n\n            renderer.texture.bind(uv[\"" + t + "\"], t);\n\n            if(ud[\"" + t + "\"].value !== t)\n            {\n                ud[\"" + t + "\"].value = t;\n                gl.uniform1i(ud[\"" + t + "\"].location, t);\n; // eslint-disable-line max-len\n            }"
        }
    }, {
        test: function(t, e) {
            return "mat3" === t.type && 1 === t.size && void 0 !== e.a
        },
        code: function(t) {
            return "\n            gl.uniformMatrix3fv(ud[\"" + t + "\"].location, false, uv[\"" + t + "\"].toArray(true));\n            "
        }
    }, {
        test: function(t, e) {
            return "vec2" === t.type && 1 === t.size && void 0 !== e.x
        },
        code: function(t) {
            return "\n                cv = ud[\"" + t + "\"].value;\n                v = uv[\"" + t + "\"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud[\"" + t + "\"].location, v.x, v.y);\n                }"
        }
    }, {
        test: function(t) {
            return "vec2" === t.type && 1 === t.size
        },
        code: function(t) {
            return "\n                cv = ud[\"" + t + "\"].value;\n                v = uv[\"" + t + "\"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud[\"" + t + "\"].location, v[0], v[1]);\n                }\n            "
        }
    }, {
        test: function(t, e) {
            return "vec4" === t.type && 1 === t.size && void 0 !== e.width
        },
        code: function(t) {
            return "\n                cv = ud[\"" + t + "\"].value;\n                v = uv[\"" + t + "\"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud[\"" + t + "\"].location, v.x, v.y, v.width, v.height)\n                }"
        }
    }, {
        test: function(t) {
            return "vec4" === t.type && 1 === t.size
        },
        code: function(t) {
            return "\n                cv = ud[\"" + t + "\"].value;\n                v = uv[\"" + t + "\"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud[\"" + t + "\"].location, v[0], v[1], v[2], v[3])\n                }"
        }
    }]
      , tg = {
        float: "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }",
        vec2: "\n    if(cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        gl.uniform2f(location, v[0], v[1])\n    }",
        vec3: "\n    if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
        vec4: "gl.uniform4f(location, v[0], v[1], v[2], v[3])",
        int: "gl.uniform1i(location, v)",
        ivec2: "gl.uniform2i(location, v[0], v[1])",
        ivec3: "gl.uniform3i(location, v[0], v[1], v[2])",
        ivec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
        uint: "gl.uniform1ui(location, v)",
        uvec2: "gl.uniform2ui(location, v[0], v[1])",
        uvec3: "gl.uniform3ui(location, v[0], v[1], v[2])",
        uvec4: "gl.uniform4ui(location, v[0], v[1], v[2], v[3])",
        bool: "gl.uniform1i(location, v)",
        bvec2: "gl.uniform2i(location, v[0], v[1])",
        bvec3: "gl.uniform3i(location, v[0], v[1], v[2])",
        bvec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
        mat2: "gl.uniformMatrix2fv(location, false, v)",
        mat3: "gl.uniformMatrix3fv(location, false, v)",
        mat4: "gl.uniformMatrix4fv(location, false, v)",
        sampler2D: "gl.uniform1i(location, v)",
        samplerCube: "gl.uniform1i(location, v)",
        sampler2DArray: "gl.uniform1i(location, v)"
    }
      , ug = {
        float: "gl.uniform1fv(location, v)",
        vec2: "gl.uniform2fv(location, v)",
        vec3: "gl.uniform3fv(location, v)",
        vec4: "gl.uniform4fv(location, v)",
        mat4: "gl.uniformMatrix4fv(location, false, v)",
        mat3: "gl.uniformMatrix3fv(location, false, v)",
        mat2: "gl.uniformMatrix2fv(location, false, v)",
        int: "gl.uniform1iv(location, v)",
        ivec2: "gl.uniform2iv(location, v)",
        ivec3: "gl.uniform3iv(location, v)",
        ivec4: "gl.uniform4iv(location, v)",
        uint: "gl.uniform1uiv(location, v)",
        uvec2: "gl.uniform2uiv(location, v)",
        uvec3: "gl.uniform3uiv(location, v)",
        uvec4: "gl.uniform4uiv(location, v)",
        bool: "gl.uniform1iv(location, v)",
        bvec2: "gl.uniform2iv(location, v)",
        bvec3: "gl.uniform3iv(location, v)",
        bvec4: "gl.uniform4iv(location, v)",
        sampler2D: "gl.uniform1iv(location, v)",
        samplerCube: "gl.uniform1iv(location, v)",
        sampler2DArray: "gl.uniform1iv(location, v)"
    };
    function vg(t, e) {
        var r = ["\n        var v = null;\n        var cv = null\n        var t = 0;\n        var gl = renderer.gl\n    "];
        for (var i in t.uniforms) {
            var o = e[i];
            if (o) {
                for (var n = t.uniforms[i], s = !1, a = 0; a < lc.length; a++)
                    if (lc[a].test(o, n)) {
                        r.push(lc[a].code(i, n)),
                        s = !0;
                        break
                    }
                if (!s) {
                    var u = (1 === o.size ? tg : ug)[o.type].replace("location", "ud[\"" + i + "\"].location");
                    r.push("\n            cv = ud[\"" + i + "\"].value;\n            v = uv[\"" + i + "\"];\n            " + u + ";")
                }
            } else
                t.uniforms[i].group && r.push("\n                    renderer.shader.syncUniformGroup(uv[\"" + i + "\"], syncData);\n                ")
        }
        return new Function("ud","uv","renderer","syncData",r.join("\n"))
    }
    var mc, wg = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");
    function xg(t) {
        for (var e = "", r = 0; r < t; ++r)
            r > 0 && (e += "\nelse "),
            r < t - 1 && (e += "if(test == " + r + ".0){}");
        return e
    }
    function yg(t, e) {
        if (0 === t)
            throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
        for (var r = e.createShader(e.FRAGMENT_SHADER); ; ) {
            var i = wg.replace(/%forloop%/gi, xg(t));
            if (e.shaderSource(r, i),
            e.compileShader(r),
            e.getShaderParameter(r, e.COMPILE_STATUS))
                break;
            t = t / 2 | 0
        }
        return t
    }
    function zg() {
        if ("boolean" == typeof mc)
            return mc;
        try {
            var t = new Function("param1","param2","param3","return param1[param2] === param3;");
            mc = !0 === t({
                a: "b"
            }, "a", "b")
        } catch (e) {
            mc = !1
        }
        return mc
    }
    var Ag = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}"
      , Bg = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n"
      , Cg = 0
      , Eb = {}
      , nc = function() {
        function t(e, r, i) {
            void 0 === i && (i = "pixi-shader"),
            this.id = Cg++,
            this.vertexSrc = e || t.defaultVertexSrc,
            this.fragmentSrc = r || t.defaultFragmentSrc,
            this.vertexSrc = this.vertexSrc.trim(),
            this.fragmentSrc = this.fragmentSrc.trim(),
            "#version" !== this.vertexSrc.substring(0, 8) && (i = i.replace(/\s+/g, "-"),
            Eb[i] ? (Eb[i]++,
            i += "-" + Eb[i]) : Eb[i] = 1,
            this.vertexSrc = "#define SHADER_NAME " + i + "\n" + this.vertexSrc,
            this.fragmentSrc = "#define SHADER_NAME " + i + "\n" + this.fragmentSrc,
            this.vertexSrc = Ld(this.vertexSrc, aa.PRECISION_VERTEX, xa.HIGH),
            this.fragmentSrc = Ld(this.fragmentSrc, aa.PRECISION_FRAGMENT, qg())),
            this.extractData(this.vertexSrc, this.fragmentSrc),
            this.glPrograms = {},
            this.syncUniforms = null
        }
        return t.prototype.extractData = function(t, e) {
            var r = Kd();
            if (r) {
                var i = Gd(r, t, e);
                this.attributeData = this.getAttributeData(i, r),
                this.uniformData = this.getUniformData(i, r),
                r.deleteProgram(i)
            } else
                this.uniformData = {},
                this.attributeData = {}
        }
        ,
        t.prototype.getAttributeData = function(t, e) {
            for (var r = {}, i = [], o = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), n = 0; n < o; n++) {
                var s = e.getActiveAttrib(t, n)
                  , a = Nd(e, s.type)
                  , u = {
                    type: a,
                    name: s.name,
                    size: sg(a),
                    location: 0
                };
                r[s.name] = u,
                i.push(u)
            }
            i.sort(function(t, e) {
                return t.name > e.name ? 1 : -1
            });
            for (n = 0; n < i.length; n++)
                i[n].location = n;
            return r
        }
        ,
        t.prototype.getUniformData = function(t, e) {
            for (var r = {}, i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), o = 0; o < i; o++) {
                var n = e.getActiveUniform(t, o)
                  , s = n.name.replace(/\[.*?\]$/, "")
                  , a = n.name.match(/\[.*?\]$/)
                  , u = Nd(e, n.type);
                r[s] = {
                    type: u,
                    size: n.size,
                    isArray: a,
                    value: Hd(u, n.size)
                }
            }
            return r
        }
        ,
        Object.defineProperty(t, "defaultVertexSrc", {
            get: function() {
                return Bg
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t, "defaultFragmentSrc", {
            get: function() {
                return Ag
            },
            enumerable: !1,
            configurable: !0
        }),
        t.from = function(e, r, i) {
            var o = e + r
              , n = jd[o];
            return n || (jd[o] = n = new t(e,r,i)),
            n
        }
        ,
        t
    }()
      , oc = function() {
        function t(t, e) {
            for (var r in this.program = t,
            this.uniformGroup = e ? e instanceof Pa ? e : new Pa(e) : new Pa({}),
            t.uniformData)
                this.uniformGroup.uniforms[r]instanceof Array && (this.uniformGroup.uniforms[r] = new Float32Array(this.uniformGroup.uniforms[r]))
        }
        return t.prototype.checkUniformExists = function(t, e) {
            if (e.uniforms[t])
                return !0;
            for (var r in e.uniforms) {
                var i = e.uniforms[r];
                if (i.group && this.checkUniformExists(t, i))
                    return !0
            }
            return !1
        }
        ,
        t.prototype.destroy = function() {
            this.uniformGroup = null
        }
        ,
        Object.defineProperty(t.prototype, "uniforms", {
            get: function() {
                return this.uniformGroup.uniforms
            },
            enumerable: !1,
            configurable: !0
        }),
        t.from = function(e, r, i) {
            return new t(nc.from(e, r),i)
        }
        ,
        t
    }()
      , pc = 0
      , qc = 1
      , rc = 2
      , sc = 3
      , tc = 4
      , uc = 5
      , Fb = function() {
        function t() {
            this.data = 0,
            this.blendMode = K.NORMAL,
            this.polygonOffset = 0,
            this.blend = !0,
            this.depthMask = !0
        }
        return Object.defineProperty(t.prototype, "blend", {
            get: function() {
                return !!(this.data & 1 << pc)
            },
            set: function(t) {
                !!(this.data & 1 << pc) !== t && (this.data ^= 1 << pc)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "offsets", {
            get: function() {
                return !!(this.data & 1 << qc)
            },
            set: function(t) {
                !!(this.data & 1 << qc) !== t && (this.data ^= 1 << qc)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "culling", {
            get: function() {
                return !!(this.data & 1 << rc)
            },
            set: function(t) {
                !!(this.data & 1 << rc) !== t && (this.data ^= 1 << rc)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "depthTest", {
            get: function() {
                return !!(this.data & 1 << sc)
            },
            set: function(t) {
                !!(this.data & 1 << sc) !== t && (this.data ^= 1 << sc)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "depthMask", {
            get: function() {
                return !!(this.data & 1 << uc)
            },
            set: function(t) {
                !!(this.data & 1 << uc) !== t && (this.data ^= 1 << uc)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "clockwiseFrontFace", {
            get: function() {
                return !!(this.data & 1 << tc)
            },
            set: function(t) {
                !!(this.data & 1 << tc) !== t && (this.data ^= 1 << tc)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "blendMode", {
            get: function() {
                return this._blendMode
            },
            set: function(t) {
                this.blend = t !== K.NONE,
                this._blendMode = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "polygonOffset", {
            get: function() {
                return this._polygonOffset
            },
            set: function(t) {
                this.offsets = !!t,
                this._polygonOffset = t
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.toString = function() {
            return "[@pixi/core:State blendMode=" + this.blendMode + " clockwiseFrontFace=" + this.clockwiseFrontFace + " culling=" + this.culling + " depthMask=" + this.depthMask + " polygonOffset=" + this.polygonOffset + "]"
        }
        ,
        t.for2d = function() {
            var e = new t;
            return e.depthTest = !1,
            e.blend = !0,
            e
        }
        ,
        t
    }()
      , Dg = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n"
      , Eg = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"
      , Fg = function(t) {
        function e(r, i, o) {
            var n = this
              , s = nc.from(r || e.defaultVertexSrc, i || e.defaultFragmentSrc);
            return (n = t.call(this, s, o) || this).padding = 0,
            n.resolution = aa.FILTER_RESOLUTION,
            n.enabled = !0,
            n.autoFit = !0,
            n.legacy = !!n.program.attributeData.aTextureCoord,
            n.state = new Fb,
            n
        }
        return ba(e, t),
        e.prototype.apply = function(t, e, r, i, o) {
            t.applyFilter(this, e, r, i)
        }
        ,
        Object.defineProperty(e.prototype, "blendMode", {
            get: function() {
                return this.state.blendMode
            },
            set: function(t) {
                this.state.blendMode = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e, "defaultVertexSrc", {
            get: function() {
                return Dg
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e, "defaultFragmentSrc", {
            get: function() {
                return Eg
            },
            enumerable: !1,
            configurable: !0
        }),
        e
    }(oc)
      , Gg = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n"
      , Hg = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n"
      , Od = new la
      , Ig = function() {
        function t(t, e) {
            this._texture = t,
            this.mapCoord = new la,
            this.uClampFrame = new Float32Array(4),
            this.uClampOffset = new Float32Array(2),
            this._textureID = -1,
            this._updateID = 0,
            this.clampOffset = 0,
            this.clampMargin = void 0 === e ? .5 : e,
            this.isSimple = !1
        }
        return Object.defineProperty(t.prototype, "texture", {
            get: function() {
                return this._texture
            },
            set: function(t) {
                this._texture = t,
                this._textureID = -1
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.multiplyUvs = function(t, e) {
            void 0 === e && (e = t);
            for (var r = this.mapCoord, i = 0; i < t.length; i += 2) {
                var o = t[i]
                  , n = t[i + 1];
                e[i] = o * r.a + n * r.c + r.tx,
                e[i + 1] = o * r.b + n * r.d + r.ty
            }
            return e
        }
        ,
        t.prototype.update = function(t) {
            var e = this._texture;
            if (!e || !e.valid)
                return !1;
            if (!t && this._textureID === e._updateID)
                return !1;
            this._textureID = e._updateID,
            this._updateID++;
            var r = e._uvs;
            this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
            var i = e.orig
              , o = e.trim;
            o && (Od.set(i.width / o.width, 0, 0, i.height / o.height, -o.x / o.width, -o.y / o.height),
            this.mapCoord.append(Od));
            var n = e.baseTexture
              , s = this.uClampFrame
              , a = this.clampMargin / n.resolution
              , u = this.clampOffset;
            return s[0] = (e._frame.x + a + u) / n.width,
            s[1] = (e._frame.y + a + u) / n.height,
            s[2] = (e._frame.x + e._frame.width - a + u) / n.width,
            s[3] = (e._frame.y + e._frame.height - a + u) / n.height,
            this.uClampOffset[0] = u / n.realWidth,
            this.uClampOffset[1] = u / n.realHeight,
            this.isSimple = e._frame.width === n.width && e._frame.height === n.height && 0 === e.rotate,
            !0
        }
        ,
        t
    }()
      , Jg = function(t) {
        function e(e) {
            var r = this
              , i = new la;
            return r = t.call(this, Gg, Hg) || this,
            e.renderable = !1,
            r.maskSprite = e,
            r.maskMatrix = i,
            r
        }
        return ba(e, t),
        e.prototype.apply = function(t, e, r, i) {
            var o = this.maskSprite
              , n = o._texture;
            n.valid && (n.uvMatrix || (n.uvMatrix = new Ig(n,0)),
            n.uvMatrix.update(),
            this.uniforms.npmAlpha = n.baseTexture.alphaMode ? 0 : 1,
            this.uniforms.mask = n,
            this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, o).prepend(n.uvMatrix.mapCoord),
            this.uniforms.alpha = o.worldAlpha,
            this.uniforms.maskClamp = n.uvMatrix.uClampFrame,
            t.applyFilter(this, e, r, i))
        }
        ,
        e
    }(Fg)
      , Pd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.enableScissor = !0,
            r.alphaMaskPool = [],
            r.maskDataPool = [],
            r.maskStack = [],
            r.alphaMaskIndex = 0,
            r
        }
        return ba(e, t),
        e.prototype.setMaskStack = function(t) {
            this.maskStack = t,
            this.renderer.scissor.setMaskStack(t),
            this.renderer.stencil.setMaskStack(t)
        }
        ,
        e.prototype.push = function(t, e) {
            var r = e;
            if (!r.isMaskData) {
                var i = this.maskDataPool.pop() || new pg;
                i.pooled = !0,
                i.maskObject = e,
                r = i
            }
            switch (r.autoDetect && this.detect(r),
            r.copyCountersOrReset(this.maskStack[this.maskStack.length - 1]),
            r._target = t,
            r.type) {
            case qa.SCISSOR:
                this.maskStack.push(r),
                this.renderer.scissor.push(r);
                break;
            case qa.STENCIL:
                this.maskStack.push(r),
                this.renderer.stencil.push(r);
                break;
            case qa.SPRITE:
                r.copyCountersOrReset(null),
                this.pushSpriteMask(r),
                this.maskStack.push(r);
            }
        }
        ,
        e.prototype.pop = function(t) {
            var e = this.maskStack.pop();
            if (e && e._target === t) {
                switch (e.type) {
                case qa.SCISSOR:
                    this.renderer.scissor.pop();
                    break;
                case qa.STENCIL:
                    this.renderer.stencil.pop(e.maskObject);
                    break;
                case qa.SPRITE:
                    this.popSpriteMask();
                }
                e.reset(),
                e.pooled && this.maskDataPool.push(e)
            }
        }
        ,
        e.prototype.detect = function(t) {
            var e = t.maskObject;
            if (e.isSprite)
                t.type = qa.SPRITE;
            else if (t.type = qa.STENCIL,
            this.enableScissor && e.isFastRect && e.isFastRect()) {
                var r = e.worldTransform
                  , i = Math.atan2(r.b, r.a)
                  , o = Math.atan2(r.d, r.c);
                i = Math.round(i * (180 / Math.PI) * 100),
                o = ((o = Math.round(o * (180 / Math.PI) * 100) - i) % 18e3 + 18e3) % 18e3,
                0 === (i = (i % 9e3 + 9e3) % 9e3) && 9e3 === o && (t.type = qa.SCISSOR)
            }
        }
        ,
        e.prototype.pushSpriteMask = function(t) {
            var e = t.maskObject
              , r = t._target
              , i = this.alphaMaskPool[this.alphaMaskIndex];
            i || (i = this.alphaMaskPool[this.alphaMaskIndex] = [new Jg(e)]),
            i[0].resolution = this.renderer.resolution,
            i[0].maskSprite = e;
            var o = r.filterArea;
            r.filterArea = e.getBounds(!0),
            this.renderer.filter.push(r, i),
            r.filterArea = o,
            this.alphaMaskIndex++
        }
        ,
        e.prototype.popSpriteMask = function() {
            this.renderer.filter.pop(),
            this.alphaMaskIndex--
        }
        ,
        e
    }(pa)
      , Qd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.maskStack = [],
            r.glConst = 0,
            r
        }
        return ba(e, t),
        e.prototype.getStackLength = function() {
            return this.maskStack.length
        }
        ,
        e.prototype.setMaskStack = function(t) {
            var e = this.renderer.gl
              , r = this.getStackLength();
            this.maskStack = t;
            var i = this.getStackLength();
            i !== r && (0 === i ? e.disable(this.glConst) : (e.enable(this.glConst),
            this._useCurrent()))
        }
        ,
        e.prototype._useCurrent = function() {}
        ,
        e.prototype.destroy = function() {
            t.prototype.destroy.call(this),
            this.maskStack = null
        }
        ,
        e
    }(pa)
      , Rd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.glConst = WebGLRenderingContext.SCISSOR_TEST,
            r
        }
        return ba(e, t),
        e.prototype.getStackLength = function() {
            var t = this.maskStack[this.maskStack.length - 1];
            return t ? t._scissorCounter : 0
        }
        ,
        e.prototype.push = function(t) {
            var e = t.maskObject;
            e.renderable = !0;
            var r = t._scissorRect
              , i = e.getBounds(!0)
              , o = this.renderer.gl;
            e.renderable = !1,
            r ? i.fit(r) : o.enable(o.SCISSOR_TEST),
            t._scissorCounter++,
            t._scissorRect = i,
            this._useCurrent()
        }
        ,
        e.prototype.pop = function() {
            var t = this.renderer.gl;
            this.getStackLength() > 0 ? this._useCurrent() : t.disable(t.SCISSOR_TEST)
        }
        ,
        e.prototype._useCurrent = function() {
            var t = this.maskStack[this.maskStack.length - 1]._scissorRect
              , e = this.renderer.renderTexture.current
              , r = this.renderer.projection
              , i = r.transform
              , o = r.sourceFrame
              , n = r.destinationFrame
              , s = e ? e.resolution : this.renderer.resolution
              , a = n.width / o.width
              , u = n.height / o.height
              , h = ((t.x - o.x) * a + n.x) * s
              , $ = ((t.y - o.y) * u + n.y) * s
              , p = t.width * a * s
              , l = t.height * u * s;
            i && (h += i.tx * s,
            $ += i.ty * s),
            e || ($ = this.renderer.height - l - $),
            this.renderer.gl.scissor(h, $, p, l)
        }
        ,
        e
    }(Qd)
      , Sd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.glConst = WebGLRenderingContext.STENCIL_TEST,
            r
        }
        return ba(e, t),
        e.prototype.getStackLength = function() {
            var t = this.maskStack[this.maskStack.length - 1];
            return t ? t._stencilCounter : 0
        }
        ,
        e.prototype.push = function(t) {
            var e = t.maskObject
              , r = this.renderer.gl
              , i = t._stencilCounter;
            0 === i && (this.renderer.framebuffer.forceStencil(),
            r.enable(r.STENCIL_TEST)),
            t._stencilCounter++,
            r.colorMask(!1, !1, !1, !1),
            r.stencilFunc(r.EQUAL, i, this._getBitwiseMask()),
            r.stencilOp(r.KEEP, r.KEEP, r.INCR),
            e.renderable = !0,
            e.render(this.renderer),
            this.renderer.batch.flush(),
            this.renderer.framebuffer.blit(),
            e.renderable = !1,
            this._useCurrent()
        }
        ,
        e.prototype.pop = function(t) {
            var e = this.renderer.gl;
            0 === this.getStackLength() ? (e.disable(e.STENCIL_TEST),
            e.clear(e.STENCIL_BUFFER_BIT),
            e.clearStencil(0)) : (e.colorMask(!1, !1, !1, !1),
            e.stencilOp(e.KEEP, e.KEEP, e.DECR),
            t.renderable = !0,
            t.render(this.renderer),
            this.renderer.batch.flush(),
            t.renderable = !1,
            this._useCurrent())
        }
        ,
        e.prototype._useCurrent = function() {
            var t = this.renderer.gl;
            t.colorMask(!0, !0, !0, !0),
            t.stencilFunc(t.EQUAL, this.getStackLength(), this._getBitwiseMask()),
            t.stencilOp(t.KEEP, t.KEEP, t.KEEP)
        }
        ,
        e.prototype._getBitwiseMask = function() {
            return (1 << this.getStackLength()) - 1
        }
        ,
        e
    }(Qd)
      , Td = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.destinationFrame = null,
            r.sourceFrame = null,
            r.defaultFrame = null,
            r.projectionMatrix = new la,
            r.transform = null,
            r
        }
        return ba(e, t),
        e.prototype.update = function(t, e, r, i) {
            this.destinationFrame = t || this.destinationFrame || this.defaultFrame,
            this.sourceFrame = e || this.sourceFrame || t,
            this.calculateProjection(this.destinationFrame, this.sourceFrame, r, i),
            this.transform && this.projectionMatrix.append(this.transform);
            var o = this.renderer;
            o.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix,
            o.globalUniforms.update(),
            o.shader.shader && o.shader.syncUniformGroup(o.shader.shader.uniforms.globals)
        }
        ,
        e.prototype.calculateProjection = function(t, e, r, i) {
            var o = this.projectionMatrix
              , n = i ? -1 : 1;
            o.identity(),
            o.a = 1 / e.width * 2,
            o.d = n * (1 / e.height * 2),
            o.tx = -1 - e.x * o.a,
            o.ty = -n - e.y * o.d
        }
        ,
        e.prototype.setTransform = function(t) {}
        ,
        e
    }(pa)
      , Qa = new da
      , fb = new da
      , Ud = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.clearColor = e._backgroundColorRgba,
            r.defaultMaskStack = [],
            r.current = null,
            r.sourceFrame = new da,
            r.destinationFrame = new da,
            r.viewportFrame = new da,
            r
        }
        return ba(e, t),
        e.prototype.bind = function(t, e, r) {
            void 0 === t && (t = null);
            var i, o, n, s = this.renderer;
            this.current = t,
            t ? (n = (i = t.baseTexture).resolution,
            e || (Qa.width = t.frame.width,
            Qa.height = t.frame.height,
            e = Qa),
            r || (fb.x = t.frame.x,
            fb.y = t.frame.y,
            fb.width = e.width,
            fb.height = e.height,
            r = fb),
            o = i.framebuffer) : (n = s.resolution,
            e || (Qa.width = s.screen.width,
            Qa.height = s.screen.height,
            e = Qa),
            r || ((r = Qa).width = e.width,
            r.height = e.height));
            var a = this.viewportFrame;
            a.x = r.x * n,
            a.y = r.y * n,
            a.width = r.width * n,
            a.height = r.height * n,
            t || (a.y = s.view.height - (a.y + a.height)),
            this.renderer.framebuffer.bind(o, a),
            this.renderer.projection.update(r, e, n, !o),
            t ? this.renderer.mask.setMaskStack(i.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack),
            this.sourceFrame.copyFrom(e),
            this.destinationFrame.copyFrom(r)
        }
        ,
        e.prototype.clear = function(t, e) {
            t = this.current ? t || this.current.baseTexture.clearColor : t || this.clearColor;
            var r = this.destinationFrame
              , i = this.current ? this.current.baseTexture : this.renderer.screen
              , o = r.width !== i.width || r.height !== i.height;
            if (o) {
                var n = this.viewportFrame
                  , s = n.x
                  , a = n.y
                  , u = n.width
                  , h = n.height;
                this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST),
                this.renderer.gl.scissor(s, a, u, h)
            }
            this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], e),
            o && this.renderer.scissor.pop()
        }
        ,
        e.prototype.resize = function() {
            this.bind(null)
        }
        ,
        e.prototype.reset = function() {
            this.bind(null)
        }
        ,
        e
    }(pa)
      , h = function() {
        return function() {}
    }()
      , Kg = function() {
        function t(t, e) {
            this.program = t,
            this.uniformData = e,
            this.uniformGroups = {}
        }
        return t.prototype.destroy = function() {
            this.uniformData = null,
            this.uniformGroups = null,
            this.program = null
        }
        ,
        t
    }()
      , Lg = 0
      , Vd = {
        textureCount: 0
    }
      , Wd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.destroyed = !1,
            r.systemCheck(),
            r.gl = null,
            r.shader = null,
            r.program = null,
            r.cache = {},
            r.id = Lg++,
            r
        }
        return ba(e, t),
        e.prototype.systemCheck = function() {
            if (!zg())
                throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")
        }
        ,
        e.prototype.contextChange = function(t) {
            this.gl = t,
            this.reset()
        }
        ,
        e.prototype.bind = function(t, e) {
            t.uniforms.globals = this.renderer.globalUniforms;
            var r = t.program
              , i = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateShader(t);
            return this.shader = t,
            this.program !== r && (this.program = r,
            this.gl.useProgram(i.program)),
            e || (Vd.textureCount = 0,
            this.syncUniformGroup(t.uniformGroup, Vd)),
            i
        }
        ,
        e.prototype.setUniforms = function(t) {
            var e = this.shader.program
              , r = e.glPrograms[this.renderer.CONTEXT_UID];
            e.syncUniforms(r.uniformData, t, this.renderer)
        }
        ,
        e.prototype.syncUniformGroup = function(t, e) {
            var r = this.getglProgram();
            t.static && t.dirtyId === r.uniformGroups[t.id] || (r.uniformGroups[t.id] = t.dirtyId,
            this.syncUniforms(t, r, e))
        }
        ,
        e.prototype.syncUniforms = function(t, e, r) {
            (t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t))(e.uniformData, t.uniforms, this.renderer, r)
        }
        ,
        e.prototype.createSyncGroups = function(t) {
            var e = this.getSignature(t, this.shader.program.uniformData);
            return this.cache[e] || (this.cache[e] = vg(t, this.shader.program.uniformData)),
            t.syncUniforms[this.shader.program.id] = this.cache[e],
            t.syncUniforms[this.shader.program.id]
        }
        ,
        e.prototype.getSignature = function(t, e) {
            var r = t.uniforms
              , i = [];
            for (var o in r)
                i.push(o),
                e[o] && i.push(e[o].type);
            return i.join("-")
        }
        ,
        e.prototype.getglProgram = function() {
            return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null
        }
        ,
        e.prototype.generateShader = function(t) {
            var e = this.gl
              , r = t.program
              , i = {};
            for (var o in r.attributeData)
                i[o] = r.attributeData[o].location;
            var n = Gd(e, r.vertexSrc, r.fragmentSrc, i)
              , s = {};
            for (var o in r.uniformData) {
                var a = r.uniformData[o];
                s[o] = {
                    location: e.getUniformLocation(n, o),
                    value: Hd(a.type, a.size)
                }
            }
            var u = new Kg(n,s);
            return r.glPrograms[this.renderer.CONTEXT_UID] = u,
            u
        }
        ,
        e.prototype.reset = function() {
            this.program = null,
            this.shader = null
        }
        ,
        e.prototype.destroy = function() {
            this.destroyed = !0
        }
        ,
        e
    }(pa);
    function Mg(t, e) {
        return void 0 === e && (e = []),
        e[K.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.ADD] = [t.ONE, t.ONE],
        e[K.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.NONE] = [0, 0],
        e[K.NORMAL_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.ADD_NPM] = [t.SRC_ALPHA, t.ONE, t.ONE, t.ONE],
        e[K.SCREEN_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA],
        e[K.SRC_IN] = [t.DST_ALPHA, t.ZERO],
        e[K.SRC_OUT] = [t.ONE_MINUS_DST_ALPHA, t.ZERO],
        e[K.SRC_ATOP] = [t.DST_ALPHA, t.ONE_MINUS_SRC_ALPHA],
        e[K.DST_OVER] = [t.ONE_MINUS_DST_ALPHA, t.ONE],
        e[K.DST_IN] = [t.ZERO, t.SRC_ALPHA],
        e[K.DST_OUT] = [t.ZERO, t.ONE_MINUS_SRC_ALPHA],
        e[K.DST_ATOP] = [t.ONE_MINUS_DST_ALPHA, t.SRC_ALPHA],
        e[K.XOR] = [t.ONE_MINUS_DST_ALPHA, t.ONE_MINUS_SRC_ALPHA],
        e[K.SUBTRACT] = [t.ONE, t.ONE, t.ONE, t.ONE, t.FUNC_REVERSE_SUBTRACT, t.FUNC_ADD],
        e
    }
    var Xd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.gl = null,
            r.stateId = 0,
            r.polygonOffset = 0,
            r.blendMode = K.NONE,
            r._blendEq = !1,
            r.map = [],
            r.checks = [],
            r.defaultState = new Fb,
            r.defaultState.blend = !0,
            r
        }
        return ba(e, t),
        e.prototype.contextChange = function(t) {
            this.gl = t,
            this.blendModes = Mg(t),
            this.set(this.defaultState),
            this.reset()
        }
        ,
        e.prototype.set = function(t) {
            if (t = t || this.defaultState,
            this.stateId !== t.data) {
                for (var e = this.stateId ^ t.data, r = 0; e; )
                    1 & e && this.map[r].call(this, !!(t.data & 1 << r)),
                    e >>= 1,
                    r++;
                this.stateId = t.data
            }
            for (r = 0; r < this.checks.length; r++)
                this.checks[r](this, t)
        }
        ,
        e.prototype.forceState = function(t) {
            t = t || this.defaultState;
            for (var e = 0; e < this.map.length; e++)
                this.map[e].call(this, !!(t.data & 1 << e));
            for (e = 0; e < this.checks.length; e++)
                this.checks[e](this, t);
            this.stateId = t.data
        }
        ,
        e.prototype.setBlend = function(t) {
            this.updateCheck(e.checkBlendMode, t),
            this.gl[t ? "enable" : "disable"](this.gl.BLEND)
        }
        ,
        e.prototype.setOffset = function(t) {
            this.updateCheck(e.checkPolygonOffset, t),
            this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL)
        }
        ,
        e.prototype.setDepthTest = function(t) {
            this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST)
        }
        ,
        e.prototype.setDepthMask = function(t) {
            this.gl.depthMask(t)
        }
        ,
        e.prototype.setCullFace = function(t) {
            this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE)
        }
        ,
        e.prototype.setFrontFace = function(t) {
            this.gl.frontFace(this.gl[t ? "CW" : "CCW"])
        }
        ,
        e.prototype.setBlendMode = function(t) {
            if (t !== this.blendMode) {
                this.blendMode = t;
                var e = this.blendModes[t]
                  , r = this.gl;
                2 === e.length ? r.blendFunc(e[0], e[1]) : r.blendFuncSeparate(e[0], e[1], e[2], e[3]),
                6 === e.length ? (this._blendEq = !0,
                r.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1,
                r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD))
            }
        }
        ,
        e.prototype.setPolygonOffset = function(t, e) {
            this.gl.polygonOffset(t, e)
        }
        ,
        e.prototype.reset = function() {
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1),
            this.forceState(this.defaultState),
            this._blendEq = !0,
            this.blendMode = -1,
            this.setBlendMode(0)
        }
        ,
        e.prototype.updateCheck = function(t, e) {
            var r = this.checks.indexOf(t);
            e && -1 === r ? this.checks.push(t) : e || -1 === r || this.checks.splice(r, 1)
        }
        ,
        e.checkBlendMode = function(t, e) {
            t.setBlendMode(e.blendMode)
        }
        ,
        e.checkPolygonOffset = function(t, e) {
            t.setPolygonOffset(1, e.polygonOffset)
        }
        ,
        e
    }(pa)
      , Yd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.count = 0,
            r.checkCount = 0,
            r.maxIdle = aa.GC_MAX_IDLE,
            r.checkCountMax = aa.GC_MAX_CHECK_COUNT,
            r.mode = aa.GC_MODE,
            r
        }
        return ba(e, t),
        e.prototype.postrender = function() {
            this.renderer.renderingToScreen && (this.count++,
            this.mode !== Tc.MANUAL && (this.checkCount++,
            this.checkCount > this.checkCountMax && (this.checkCount = 0,
            this.run())))
        }
        ,
        e.prototype.run = function() {
            for (var t = this.renderer.texture, e = t.managedTextures, r = !1, i = 0; i < e.length; i++) {
                var o = e[i];
                !o.framebuffer && this.count - o.touched > this.maxIdle && (t.destroyTexture(o, !0),
                e[i] = null,
                r = !0)
            }
            if (r) {
                var n = 0;
                for (i = 0; i < e.length; i++)
                    null !== e[i] && (e[n++] = e[i]);
                e.length = n
            }
        }
        ,
        e.prototype.unload = function(t) {
            var e = this.renderer.texture
              , r = t._texture;
            r && !r.framebuffer && e.destroyTexture(r);
            for (var i = t.children.length - 1; i >= 0; i--)
                this.unload(t.children[i])
        }
        ,
        e
    }(pa)
      , vc = function() {
        return function(t) {
            this.texture = t,
            this.width = -1,
            this.height = -1,
            this.dirtyId = -1,
            this.dirtyStyleId = -1,
            this.mipmap = !1,
            this.wrapMode = 33071,
            this.type = 6408,
            this.internalFormat = 5121
        }
    }()
      , Zd = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.boundTextures = [],
            r.currentLocation = -1,
            r.managedTextures = [],
            r._unknownBoundTextures = !1,
            r.unknownTexture = new ia,
            r
        }
        return ba(e, t),
        e.prototype.contextChange = function() {
            var t = this.gl = this.renderer.gl;
            this.CONTEXT_UID = this.renderer.CONTEXT_UID,
            this.webGLVersion = this.renderer.context.webGLVersion;
            var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
            this.boundTextures.length = e;
            for (var r = 0; r < e; r++)
                this.boundTextures[r] = null;
            this.emptyTextures = {};
            var i = new vc(t.createTexture());
            t.bindTexture(t.TEXTURE_2D, i.texture),
            t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)),
            this.emptyTextures[t.TEXTURE_2D] = i,
            this.emptyTextures[t.TEXTURE_CUBE_MAP] = new vc(t.createTexture()),
            t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
            for (r = 0; r < 6; r++)
                t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
            t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR),
            t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR);
            for (r = 0; r < this.boundTextures.length; r++)
                this.bind(null, r)
        }
        ,
        e.prototype.bind = function(t, e) {
            void 0 === e && (e = 0);
            var r = this.gl;
            if (t) {
                if ((t = t.castToBaseTexture()).parentTextureArray)
                    return;
                if (t.valid) {
                    t.touched = this.renderer.textureGC.count;
                    var i = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
                    this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e,
                    r.activeTexture(r.TEXTURE0 + e)),
                    r.bindTexture(t.target, i.texture)),
                    i.dirtyId !== t.dirtyId && (this.currentLocation !== e && (this.currentLocation = e,
                    r.activeTexture(r.TEXTURE0 + e)),
                    this.updateTexture(t)),
                    this.boundTextures[e] = t
                }
            } else
                this.currentLocation !== e && (this.currentLocation = e,
                r.activeTexture(r.TEXTURE0 + e)),
                r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture),
                this.boundTextures[e] = null
        }
        ,
        e.prototype.reset = function() {
            this._unknownBoundTextures = !0,
            this.currentLocation = -1;
            for (var t = 0; t < this.boundTextures.length; t++)
                this.boundTextures[t] = this.unknownTexture
        }
        ,
        e.prototype.unbind = function(t) {
            var e = this.gl
              , r = this.boundTextures;
            if (this._unknownBoundTextures) {
                this._unknownBoundTextures = !1;
                for (var i = 0; i < r.length; i++)
                    r[i] === this.unknownTexture && this.bind(null, i)
            }
            for (i = 0; i < r.length; i++)
                r[i] === t && (this.currentLocation !== i && (e.activeTexture(e.TEXTURE0 + i),
                this.currentLocation = i),
                e.bindTexture(t.target, this.emptyTextures[t.target].texture),
                r[i] = null)
        }
        ,
        e.prototype.initTexture = function(t) {
            var e = new vc(this.gl.createTexture());
            return e.dirtyId = -1,
            t._glTextures[this.CONTEXT_UID] = e,
            this.managedTextures.push(t),
            t.on("dispose", this.destroyTexture, this),
            e
        }
        ,
        e.prototype.initTextureType = function(t, e) {
            if (e.internalFormat = t.format,
            e.type = t.type,
            2 === this.webGLVersion) {
                var r = this.renderer.gl;
                t.type === r.FLOAT && t.format === r.RGBA && (e.internalFormat = r.RGBA32F),
                t.type === ua.HALF_FLOAT && (e.type = r.HALF_FLOAT),
                e.type === r.HALF_FLOAT && t.format === r.RGBA && (e.internalFormat = r.RGBA16F)
            }
        }
        ,
        e.prototype.updateTexture = function(t) {
            var e = t._glTextures[this.CONTEXT_UID];
            if (e) {
                var r = this.renderer;
                if (this.initTextureType(t, e),
                t.resource && t.resource.upload(r, t, e))
                    ;
                else {
                    var i = t.realWidth
                      , o = t.realHeight
                      , n = r.gl;
                    (e.width !== i || e.height !== o || e.dirtyId < 0) && (e.width = i,
                    e.height = o,
                    n.texImage2D(t.target, 0, e.internalFormat, i, o, 0, t.format, e.type, null))
                }
                t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t),
                e.dirtyId = t.dirtyId
            }
        }
        ,
        e.prototype.destroyTexture = function(t, e) {
            var r = this.gl;
            if ((t = t.castToBaseTexture())._glTextures[this.CONTEXT_UID] && (this.unbind(t),
            r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture),
            t.off("dispose", this.destroyTexture, this),
            delete t._glTextures[this.CONTEXT_UID],
            !e)) {
                var i = this.managedTextures.indexOf(t);
                -1 !== i && tb(this.managedTextures, i, 1)
            }
        }
        ,
        e.prototype.updateTextureStyle = function(t) {
            var e = t._glTextures[this.CONTEXT_UID];
            e && (t.mipmap !== $a.POW2 && 2 === this.webGLVersion || t.isPowerOfTwo ? e.mipmap = t.mipmap >= 1 : e.mipmap = !1,
            2 === this.webGLVersion || t.isPowerOfTwo ? e.wrapMode = t.wrapMode : e.wrapMode = Rb.CLAMP,
            t.resource && t.resource.style(this.renderer, t, e) || this.setStyle(t, e),
            e.dirtyStyleId = t.dirtyStyleId)
        }
        ,
        e.prototype.setStyle = function(t, e) {
            var r = this.gl;
            if (e.mipmap && t.mipmap !== $a.ON_MANUAL && r.generateMipmap(t.target),
            r.texParameteri(t.target, r.TEXTURE_WRAP_S, e.wrapMode),
            r.texParameteri(t.target, r.TEXTURE_WRAP_T, e.wrapMode),
            e.mipmap) {
                r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === Ca.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
                var i = this.renderer.context.extensions.anisotropicFiltering;
                if (i && t.anisotropicLevel > 0 && t.scaleMode === Ca.LINEAR) {
                    var o = Math.min(t.anisotropicLevel, r.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
                    r.texParameterf(t.target, i.TEXTURE_MAX_ANISOTROPY_EXT, o)
                }
            } else
                r.texParameteri(t.target, r.TEXTURE_MIN_FILTER, t.scaleMode === Ca.LINEAR ? r.LINEAR : r.NEAREST);
            r.texParameteri(t.target, r.TEXTURE_MAG_FILTER, t.scaleMode === Ca.LINEAR ? r.LINEAR : r.NEAREST)
        }
        ,
        e
    }(pa)
      , $d = {
        __proto__: null,
        FilterSystem: yd,
        BatchSystem: Ad,
        ContextSystem: Cd,
        FramebufferSystem: Dd,
        GeometrySystem: Ed,
        MaskSystem: Pd,
        ScissorSystem: Rd,
        StencilSystem: Sd,
        ProjectionSystem: Td,
        RenderTextureSystem: Ud,
        ShaderSystem: Wd,
        StateSystem: Xd,
        TextureGCSystem: Yd,
        TextureSystem: Zd
    }
      , wc = new la
      , Ng = function(t) {
        function e(e, r) {
            void 0 === e && (e = jb.UNKNOWN);
            var i = t.call(this) || this;
            return r = Object.assign({}, aa.RENDER_OPTIONS, r),
            i.options = r,
            i.type = e,
            i.screen = new da(0,0,r.width,r.height),
            i.view = r.view || document.createElement("canvas"),
            i.resolution = r.resolution || aa.RESOLUTION,
            i.useContextAlpha = r.useContextAlpha,
            i.autoDensity = !!r.autoDensity,
            i.preserveDrawingBuffer = r.preserveDrawingBuffer,
            i.clearBeforeRender = r.clearBeforeRender,
            i._backgroundColor = 0,
            i._backgroundColorRgba = [0, 0, 0, 1],
            i._backgroundColorString = "#000000",
            i.backgroundColor = r.backgroundColor || i._backgroundColor,
            i.backgroundAlpha = r.backgroundAlpha,
            void 0 !== r.transparent && (Va("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."),
            i.useContextAlpha = r.transparent,
            i.backgroundAlpha = r.transparent ? 0 : 1),
            i._lastObjectRendered = null,
            i.plugins = {},
            i
        }
        return ba(e, t),
        e.prototype.initPlugins = function(t) {
            for (var e in t)
                this.plugins[e] = new t[e](this)
        }
        ,
        Object.defineProperty(e.prototype, "width", {
            get: function() {
                return this.view.width
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "height", {
            get: function() {
                return this.view.height
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.resize = function(t, e) {
            this.screen.width = t,
            this.screen.height = e,
            this.view.width = t * this.resolution,
            this.view.height = e * this.resolution,
            this.autoDensity && (this.view.style.width = t + "px",
            this.view.style.height = e + "px"),
            this.emit("resize", t, e)
        }
        ,
        e.prototype.generateTexture = function(t, e, r, i) {
            0 === (i = i || t.getLocalBounds(null, !0)).width && (i.width = 1),
            0 === i.height && (i.height = 1);
            var o = fc.create({
                width: 0 | i.width,
                height: 0 | i.height,
                scaleMode: e,
                resolution: r
            });
            return wc.tx = -i.x,
            wc.ty = -i.y,
            this.render(t, {
                renderTexture: o,
                clear: !1,
                transform: wc,
                skipUpdateTransform: !!t.parent
            }),
            o
        }
        ,
        e.prototype.destroy = function(t) {
            for (var e in this.plugins)
                this.plugins[e].destroy(),
                this.plugins[e] = null;
            t && this.view.parentNode && this.view.parentNode.removeChild(this.view);
            this.plugins = null,
            this.type = jb.UNKNOWN,
            this.view = null,
            this.screen = null,
            this._tempDisplayObjectParent = null,
            this.options = null,
            this._backgroundColorRgba = null,
            this._backgroundColorString = null,
            this._lastObjectRendered = null
        }
        ,
        Object.defineProperty(e.prototype, "backgroundColor", {
            get: function() {
                return this._backgroundColor
            },
            set: function(t) {
                this._backgroundColor = t,
                this._backgroundColorString = Mf(t),
                Xb(t, this._backgroundColorRgba)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "backgroundAlpha", {
            get: function() {
                return this._backgroundColorRgba[3]
            },
            set: function(t) {
                this._backgroundColorRgba[3] = t
            },
            enumerable: !1,
            configurable: !0
        }),
        e
    }(rb.d)
      , i = function(t) {
        function e(r) {
            var i = t.call(this, jb.WEBGL, r) || this;
            return r = i.options,
            i.gl = null,
            i.CONTEXT_UID = 0,
            i.runners = {
                destroy: new ka("destroy"),
                contextChange: new ka("contextChange"),
                reset: new ka("reset"),
                update: new ka("update"),
                postrender: new ka("postrender"),
                prerender: new ka("prerender"),
                resize: new ka("resize")
            },
            i.globalUniforms = new Pa({
                projectionMatrix: new la
            },!0),
            i.addSystem(Pd, "mask").addSystem(Cd, "context").addSystem(Xd, "state").addSystem(Wd, "shader").addSystem(Zd, "texture").addSystem(Ed, "geometry").addSystem(Dd, "framebuffer").addSystem(Rd, "scissor").addSystem(Sd, "stencil").addSystem(Td, "projection").addSystem(Yd, "textureGC").addSystem(yd, "filter").addSystem(Ud, "renderTexture").addSystem(Ad, "batch"),
            i.initPlugins(e.__plugins),
            r.context ? i.context.initFromContext(r.context) : i.context.initFromOptions({
                alpha: !!i.useContextAlpha,
                antialias: r.antialias,
                premultipliedAlpha: i.useContextAlpha && "notMultiplied" !== i.useContextAlpha,
                stencil: !0,
                preserveDrawingBuffer: r.preserveDrawingBuffer,
                powerPreference: i.options.powerPreference
            }),
            i.renderingToScreen = !0,
            Kf(2 === i.context.webGLVersion ? "WebGL 2" : "WebGL 1"),
            i.resize(i.options.width, i.options.height),
            i
        }
        return ba(e, t),
        e.create = function(t) {
            if (Lf())
                return new e(t);
            throw new Error("WebGL unsupported in this browser, use \"pixi.js-legacy\" for fallback canvas2d support.")
        }
        ,
        e.prototype.addSystem = function(t, e) {
            e || (e = t.name);
            var r = new t(this);
            if (this[e])
                throw new Error("Whoops! The name \"" + e + "\" is already in use");
            for (var i in this[e] = r,
            this.runners)
                this.runners[i].add(r);
            return this
        }
        ,
        e.prototype.render = function(t, e) {
            var r, i, o, n;
            if (e && (e instanceof fc ? (Va("6.0.0", "Renderer#render arguments changed, use options instead."),
            r = e,
            i = arguments[2],
            o = arguments[3],
            n = arguments[4]) : (r = e.renderTexture,
            i = e.clear,
            o = e.transform,
            n = e.skipUpdateTransform)),
            this.renderingToScreen = !r,
            this.runners.prerender.emit(),
            this.emit("prerender"),
            this.projection.transform = o,
            !this.context.isLost) {
                if (r || (this._lastObjectRendered = t),
                !n) {
                    var s = t.enableTempParent();
                    t.updateTransform(),
                    t.disableTempParent(s)
                }
                this.renderTexture.bind(r),
                this.batch.currentRenderer.start(),
                (void 0 !== i ? i : this.clearBeforeRender) && this.renderTexture.clear(),
                t.render(this),
                this.batch.currentRenderer.flush(),
                r && r.baseTexture.update(),
                this.runners.postrender.emit(),
                this.projection.transform = null,
                this.emit("postrender")
            }
        }
        ,
        e.prototype.resize = function(e, r) {
            t.prototype.resize.call(this, e, r),
            this.runners.resize.emit(e, r)
        }
        ,
        e.prototype.reset = function() {
            return this.runners.reset.emit(),
            this
        }
        ,
        e.prototype.clear = function() {
            this.renderTexture.bind(),
            this.renderTexture.clear()
        }
        ,
        e.prototype.destroy = function(e) {
            for (var r in this.runners.destroy.emit(),
            this.runners)
                this.runners[r].destroy();
            t.prototype.destroy.call(this, e),
            this.gl = null
        }
        ,
        Object.defineProperty(e.prototype, "extract", {
            get: function() {
                return Va("6.0.0", "Renderer#extract has been deprecated, please use Renderer#plugins.extract instead."),
                this.plugins.extract
            },
            enumerable: !1,
            configurable: !0
        }),
        e.registerPlugin = function(t, r) {
            e.__plugins = e.__plugins || {},
            e.__plugins[t] = r
        }
        ,
        e
    }(Ng);
    var xc = function() {
        return function() {
            this.texArray = null,
            this.blend = 0,
            this.type = Ba.TRIANGLES,
            this.start = 0,
            this.size = 0,
            this.data = null
        }
    }()
      , yc = function() {
        function t() {
            this.elements = [],
            this.ids = [],
            this.count = 0
        }
        return t.prototype.clear = function() {
            for (var t = 0; t < this.count; t++)
                this.elements[t] = null;
            this.count = 0
        }
        ,
        t
    }()
      , Og = function() {
        function t(t) {
            "number" == typeof t ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t,
            this.uint32View = new Uint32Array(this.rawBinaryData),
            this.float32View = new Float32Array(this.rawBinaryData)
        }
        return Object.defineProperty(t.prototype, "int8View", {
            get: function() {
                return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)),
                this._int8View
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "uint8View", {
            get: function() {
                return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)),
                this._uint8View
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "int16View", {
            get: function() {
                return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)),
                this._int16View
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "uint16View", {
            get: function() {
                return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)),
                this._uint16View
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "int32View", {
            get: function() {
                return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)),
                this._int32View
            },
            enumerable: !1,
            configurable: !0
        }),
        t.prototype.view = function(t) {
            return this[t + "View"]
        }
        ,
        t.prototype.destroy = function() {
            this.rawBinaryData = null,
            this._int8View = null,
            this._uint8View = null,
            this._int16View = null,
            this._uint16View = null,
            this._int32View = null,
            this.uint32View = null,
            this.float32View = null
        }
        ,
        t.sizeOf = function(t) {
            switch (t) {
            case "int8":
            case "uint8":
                return 1;
            case "int16":
            case "uint16":
                return 2;
            case "int32":
            case "uint32":
            case "float32":
                return 4;
            default:
                throw new Error(t + " isn't a valid view type");
            }
        }
        ,
        t
    }()
      , Pg = function(t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.shaderGenerator = null,
            r.geometryClass = null,
            r.vertexSize = null,
            r.state = Fb.for2d(),
            r.size = 4 * aa.SPRITE_BATCH_SIZE,
            r._vertexCount = 0,
            r._indexCount = 0,
            r._bufferedElements = [],
            r._bufferedTextures = [],
            r._bufferSize = 0,
            r._shader = null,
            r._packedGeometries = [],
            r._packedGeometryPoolSize = 2,
            r._flushId = 0,
            r._aBuffers = {},
            r._iBuffers = {},
            r.MAX_TEXTURES = 1,
            r.renderer.on("prerender", r.onPrerender, r),
            e.runners.contextChange.add(r),
            r._dcIndex = 0,
            r._aIndex = 0,
            r._iIndex = 0,
            r._attributeBuffer = null,
            r._indexBuffer = null,
            r._tempBoundTextures = [],
            r
        }
        return ba(e, t),
        e.prototype.contextChange = function() {
            var t = this.renderer.gl;
            aa.PREFER_ENV === Aa.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), aa.SPRITE_MAX_TEXTURES),
            this.MAX_TEXTURES = yg(this.MAX_TEXTURES, t)),
            this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
            for (var e = 0; e < this._packedGeometryPoolSize; e++)
                this._packedGeometries[e] = new this.geometryClass;
            this.initFlushBuffers()
        }
        ,
        e.prototype.initFlushBuffers = function() {
            for (var t = e._drawCallPool, r = e._textureArrayPool, i = this.size / 4, o = Math.floor(i / this.MAX_TEXTURES) + 1; t.length < i; )
                t.push(new xc);
            for (; r.length < o; )
                r.push(new yc);
            for (var n = 0; n < this.MAX_TEXTURES; n++)
                this._tempBoundTextures[n] = null
        }
        ,
        e.prototype.onPrerender = function() {
            this._flushId = 0
        }
        ,
        e.prototype.render = function(t) {
            t._texture.valid && (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(),
            this._vertexCount += t.vertexData.length / 2,
            this._indexCount += t.indices.length,
            this._bufferedTextures[this._bufferSize] = t._texture.baseTexture,
            this._bufferedElements[this._bufferSize++] = t)
        }
        ,
        e.prototype.buildTexturesAndDrawCalls = function() {
            var t = this._bufferedTextures
              , r = this.MAX_TEXTURES
              , i = e._textureArrayPool
              , o = this.renderer.batch
              , n = this._tempBoundTextures
              , s = this.renderer.textureGC.count
              , a = ++ia._globalBatch
              , u = 0
              , h = i[0]
              , $ = 0;
            o.copyBoundTextures(n, r);
            for (var p = 0; p < this._bufferSize; ++p) {
                var l = t[p];
                t[p] = null,
                l._batchEnabled !== a && (h.count >= r && (o.boundArray(h, n, a, r),
                this.buildDrawCalls(h, $, p),
                $ = p,
                h = i[++u],
                ++a),
                l._batchEnabled = a,
                l.touched = s,
                h.elements[h.count++] = l)
            }
            h.count > 0 && (o.boundArray(h, n, a, r),
            this.buildDrawCalls(h, $, this._bufferSize),
            ++u,
            ++a);
            for (p = 0; p < n.length; p++)
                n[p] = null;
            ia._globalBatch = a
        }
        ,
        e.prototype.buildDrawCalls = function(t, r, i) {
            var o = this._bufferedElements
              , n = this._attributeBuffer
              , s = this._indexBuffer
              , a = this.vertexSize
              , u = e._drawCallPool
              , h = this._dcIndex
              , $ = this._aIndex
              , p = this._iIndex
              , l = u[h];
            l.start = this._iIndex,
            l.texArray = t;
            for (var c = r; c < i; ++c) {
                var d = o[c]
                  , f = d._texture.baseTexture
                  , m = Of[f.alphaMode ? 1 : 0][d.blendMode];
                o[c] = null,
                r < c && l.blend !== m && (l.size = p - l.start,
                r = c,
                (l = u[++h]).texArray = t,
                l.start = p),
                this.packInterleavedGeometry(d, n, s, $, p),
                $ += d.vertexData.length / 2 * a,
                p += d.indices.length,
                l.blend = m
            }
            r < i && (l.size = p - l.start,
            ++h),
            this._dcIndex = h,
            this._aIndex = $,
            this._iIndex = p
        }
        ,
        e.prototype.bindAndClearTexArray = function(t) {
            for (var e = this.renderer.texture, r = 0; r < t.count; r++)
                e.bind(t.elements[r], t.ids[r]),
                t.elements[r] = null;
            t.count = 0
        }
        ,
        e.prototype.updateGeometry = function() {
            var t = this._packedGeometries
              , e = this._attributeBuffer
              , r = this._indexBuffer;
            aa.CAN_UPLOAD_SAME_BUFFER ? (t[this._flushId]._buffer.update(e.rawBinaryData),
            t[this._flushId]._indexBuffer.update(r),
            this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++,
            t[this._flushId] = new this.geometryClass),
            t[this._flushId]._buffer.update(e.rawBinaryData),
            t[this._flushId]._indexBuffer.update(r),
            this.renderer.geometry.bind(t[this._flushId]),
            this.renderer.geometry.updateBuffers(),
            this._flushId++)
        }
        ,
        e.prototype.drawBatches = function() {
            for (var t = this._dcIndex, r = this.renderer, i = r.gl, o = r.state, n = e._drawCallPool, s = null, a = 0; a < t; a++) {
                var u = n[a]
                  , h = u.texArray
                  , $ = u.type
                  , p = u.size
                  , l = u.start
                  , c = u.blend;
                s !== h && (s = h,
                this.bindAndClearTexArray(h)),
                this.state.blendMode = c,
                o.set(this.state),
                i.drawElements($, p, i.UNSIGNED_SHORT, 2 * l)
            }
        }
        ,
        e.prototype.flush = function() {
            0 !== this._vertexCount && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount),
            this._indexBuffer = this.getIndexBuffer(this._indexCount),
            this._aIndex = 0,
            this._iIndex = 0,
            this._dcIndex = 0,
            this.buildTexturesAndDrawCalls(),
            this.updateGeometry(),
            this.drawBatches(),
            this._bufferSize = 0,
            this._vertexCount = 0,
            this._indexCount = 0)
        }
        ,
        e.prototype.start = function() {
            this.renderer.state.set(this.state),
            this.renderer.shader.bind(this._shader),
            aa.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId])
        }
        ,
        e.prototype.stop = function() {
            this.flush()
        }
        ,
        e.prototype.destroy = function() {
            for (var e = 0; e < this._packedGeometryPoolSize; e++)
                this._packedGeometries[e] && this._packedGeometries[e].destroy();
            this.renderer.off("prerender", this.onPrerender, this),
            this._aBuffers = null,
            this._iBuffers = null,
            this._packedGeometries = null,
            this._attributeBuffer = null,
            this._indexBuffer = null,
            this._shader && (this._shader.destroy(),
            this._shader = null),
            t.prototype.destroy.call(this)
        }
        ,
        e.prototype.getAttributeBuffer = function(t) {
            var e = sb(Math.ceil(t / 8))
              , r = hd(e)
              , i = 8 * e;
            this._aBuffers.length <= r && (this._iBuffers.length = r + 1);
            var o = this._aBuffers[i];
            return o || (this._aBuffers[i] = o = new Og(i * this.vertexSize * 4)),
            o
        }
        ,
        e.prototype.getIndexBuffer = function(t) {
            var e = sb(Math.ceil(t / 12))
              , r = hd(e)
              , i = 12 * e;
            this._iBuffers.length <= r && (this._iBuffers.length = r + 1);
            var o = this._iBuffers[r];
            return o || (this._iBuffers[r] = o = new Uint16Array(i)),
            o
        }
        ,
        e.prototype.packInterleavedGeometry = function(t, e, r, i, o) {
            for (var n = e.uint32View, s = e.float32View, a = i / this.vertexSize, u = t.uvs, h = t.indices, $ = t.vertexData, p = t._texture.baseTexture._batchLocation, l = Math.min(t.worldAlpha, 1), c = l < 1 && t._texture.baseTexture.alphaMode ? fd(t._tintRGB, l) : t._tintRGB + (255 * l << 24), d = 0; d < $.length; d += 2)
                s[i++] = $[d],
                s[i++] = $[d + 1],
                s[i++] = u[d],
                s[i++] = u[d + 1],
                n[i++] = c,
                s[i++] = p;
            for (d = 0; d < h.length; d++)
                r[o++] = a + h[d]
        }
        ,
        e._drawCallPool = [],
        e._textureArrayPool = [],
        e
    }(zd)
      , Qg = function() {
        function t(t, e) {
            if (this.vertexSrc = t,
            this.fragTemplate = e,
            this.programCache = {},
            this.defaultGroupCache = {},
            e.indexOf("%count%") < 0)
                throw new Error("Fragment template must contain \"%count%\".");
            if (e.indexOf("%forloop%") < 0)
                throw new Error("Fragment template must contain \"%forloop%\".")
        }
        return t.prototype.generateShader = function(t) {
            if (!this.programCache[t]) {
                for (var e = new Int32Array(t), r = 0; r < t; r++)
                    e[r] = r;
                this.defaultGroupCache[t] = Pa.from({
                    uSamplers: e
                }, !0);
                var i = this.fragTemplate;
                i = (i = i.replace(/%count%/gi, "" + t)).replace(/%forloop%/gi, this.generateSampleSrc(t)),
                this.programCache[t] = new nc(this.vertexSrc,i)
            }
            var o = {
                tint: new Float32Array([1, 1, 1, 1]),
                translationMatrix: new la,
                default: this.defaultGroupCache[t]
            };
            return new oc(this.programCache[t],o)
        }
        ,
        t.prototype.generateSampleSrc = function(t) {
            var e = "";
            e += "\n",
            e += "\n";
            for (var r = 0; r < t; r++)
                r > 0 && (e += "\nelse "),
                r < t - 1 && (e += "if(vTextureId < " + r + ".5)"),
                e += "\n{",
                e += "\n\tcolor = texture2D(uSamplers[" + r + "], vTextureCoord);",
                e += "\n}";
            return e += "\n",
            e += "\n"
        }
        ,
        t
    }()
      , _d = function(t) {
        function e(e) {
            void 0 === e && (e = !1);
            var r = t.call(this) || this;
            return r._buffer = new ta(null,e,!1),
            r._indexBuffer = new ta(null,e,!0),
            r.addAttribute("aVertexPosition", r._buffer, 2, !1, ua.FLOAT).addAttribute("aTextureCoord", r._buffer, 2, !1, ua.FLOAT).addAttribute("aColor", r._buffer, 4, !0, ua.UNSIGNED_BYTE).addAttribute("aTextureId", r._buffer, 1, !0, ua.FLOAT).addIndex(r._indexBuffer),
            r
        }
        return ba(e, t),
        e
    }(gc)
      , ae = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n"
      , be = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n"
      , Rg = function() {
        function t() {}
        return t.create = function(t) {
            var e = Object.assign({
                vertex: ae,
                fragment: be,
                geometryClass: _d,
                vertexSize: 6
            }, t)
              , r = e.vertex
              , i = e.fragment
              , o = e.vertexSize
              , n = e.geometryClass;
            return function(t) {
                function e(e) {
                    var s = t.call(this, e) || this;
                    return s.shaderGenerator = new Qg(r,i),
                    s.geometryClass = n,
                    s.vertexSize = o,
                    s
                }
                return ba(e, t),
                e
            }(Pg)
        }
        ,
        Object.defineProperty(t, "defaultVertexSrc", {
            get: function() {
                return ae
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(t, "defaultFragmentTemplate", {
            get: function() {
                return be
            },
            enumerable: !1,
            configurable: !0
        }),
        t
    }()
      , j = Rg.create()
      , Sg = {}
      , Tg = function(t) {
        Object.defineProperty(Sg, t, {
            get: function() {
                return Va("6.0.0", "PIXI.systems." + t + " has moved to PIXI." + t),
                rd[t]
            }
        })
    };
    for (var ce in rd)
        Tg(ce);
    var Ug = {}
      , Vg = function(t) {
        Object.defineProperty(Ug, t, {
            get: function() {
                return Va("6.0.0", "PIXI.resources." + t + " has moved to PIXI." + t),
                $d[t]
            }
        })
    };
    for (var ce in $d)
        Vg(ce);
    aa.SORTABLE_CHILDREN = !1;
    var Gb = function() {
        function t() {
            this.minX = 1 / 0,
            this.minY = 1 / 0,
            this.maxX = -1 / 0,
            this.maxY = -1 / 0,
            this.rect = null,
            this.updateID = -1
        }
        return t.prototype.isEmpty = function() {
            return this.minX > this.maxX || this.minY > this.maxY
        }
        ,
        t.prototype.clear = function() {
            this.minX = 1 / 0,
            this.minY = 1 / 0,
            this.maxX = -1 / 0,
            this.maxY = -1 / 0
        }
        ,
        t.prototype.getRectangle = function(t) {
            return this.minX > this.maxX || this.minY > this.maxY ? da.EMPTY : ((t = t || new da(0,0,1,1)).x = this.minX,
            t.y = this.minY,
            t.width = this.maxX - this.minX,
            t.height = this.maxY - this.minY,
            t)
        }
        ,
        t.prototype.addPoint = function(t) {
            this.minX = Math.min(this.minX, t.x),
            this.maxX = Math.max(this.maxX, t.x),
            this.minY = Math.min(this.minY, t.y),
            this.maxY = Math.max(this.maxY, t.y)
        }
        ,
        t.prototype.addPointMatrix = function(t, e) {
            var i = t.a
              , r = t.b
              , n = t.c
              , s = t.d
              , o = t.tx
              , a = t.ty
              , h = i * e.x + n * e.y + o
              , l = r * e.x + s * e.y + a;
            this.minX = Math.min(this.minX, h),
            this.maxX = Math.max(this.maxX, h),
            this.minY = Math.min(this.minY, l),
            this.maxY = Math.max(this.maxY, l)
        }
        ,
        t.prototype.addQuad = function(t) {
            var e = this.minX
              , i = this.minY
              , r = this.maxX
              , n = this.maxY
              , s = t[0]
              , o = t[1];
            e = s < e ? s : e,
            i = o < i ? o : i,
            r = s > r ? s : r,
            n = o > n ? o : n,
            e = (s = t[2]) < e ? s : e,
            i = (o = t[3]) < i ? o : i,
            r = s > r ? s : r,
            n = o > n ? o : n,
            e = (s = t[4]) < e ? s : e,
            i = (o = t[5]) < i ? o : i,
            r = s > r ? s : r,
            n = o > n ? o : n,
            e = (s = t[6]) < e ? s : e,
            i = (o = t[7]) < i ? o : i,
            r = s > r ? s : r,
            n = o > n ? o : n,
            this.minX = e,
            this.minY = i,
            this.maxX = r,
            this.maxY = n
        }
        ,
        t.prototype.addFrame = function(t, e, i, r, n) {
            this.addFrameMatrix(t.worldTransform, e, i, r, n)
        }
        ,
        t.prototype.addFrameMatrix = function(t, e, i, r, n) {
            var s = t.a
              , o = t.b
              , a = t.c
              , h = t.d
              , l = t.tx
              , d = t.ty
              , p = this.minX
              , m = this.minY
              , u = this.maxX
              , c = this.maxY
              , f = s * e + a * i + l
              , y = o * e + h * i + d;
            p = f < p ? f : p,
            m = y < m ? y : m,
            u = f > u ? f : u,
            c = y > c ? y : c,
            p = (f = s * r + a * i + l) < p ? f : p,
            m = (y = o * r + h * i + d) < m ? y : m,
            u = f > u ? f : u,
            c = y > c ? y : c,
            p = (f = s * e + a * n + l) < p ? f : p,
            m = (y = o * e + h * n + d) < m ? y : m,
            u = f > u ? f : u,
            c = y > c ? y : c,
            p = (f = s * r + a * n + l) < p ? f : p,
            m = (y = o * r + h * n + d) < m ? y : m,
            u = f > u ? f : u,
            c = y > c ? y : c,
            this.minX = p,
            this.minY = m,
            this.maxX = u,
            this.maxY = c
        }
        ,
        t.prototype.addVertexData = function(t, e, i) {
            for (var r = this.minX, n = this.minY, s = this.maxX, o = this.maxY, a = e; a < i; a += 2) {
                var h = t[a]
                  , l = t[a + 1];
                r = h < r ? h : r,
                n = l < n ? l : n,
                s = h > s ? h : s,
                o = l > o ? l : o
            }
            this.minX = r,
            this.minY = n,
            this.maxX = s,
            this.maxY = o
        }
        ,
        t.prototype.addVertices = function(t, e, i, r) {
            this.addVerticesMatrix(t.worldTransform, e, i, r)
        }
        ,
        t.prototype.addVerticesMatrix = function(t, e, i, r, n, s) {
            void 0 === n && (n = 0),
            void 0 === s && (s = n);
            for (var o = t.a, a = t.b, h = t.c, l = t.d, d = t.tx, p = t.ty, m = this.minX, u = this.minY, c = this.maxX, f = this.maxY, y = i; y < r; y += 2) {
                var x = e[y]
                  , b = e[y + 1]
                  , $ = o * x + h * b + d
                  , v = l * b + a * x + p;
                m = Math.min(m, $ - n),
                c = Math.max(c, $ + n),
                u = Math.min(u, v - s),
                f = Math.max(f, v + s)
            }
            this.minX = m,
            this.minY = u,
            this.maxX = c,
            this.maxY = f
        }
        ,
        t.prototype.addBounds = function(t) {
            var e = this.minX
              , i = this.minY
              , r = this.maxX
              , n = this.maxY;
            this.minX = t.minX < e ? t.minX : e,
            this.minY = t.minY < i ? t.minY : i,
            this.maxX = t.maxX > r ? t.maxX : r,
            this.maxY = t.maxY > n ? t.maxY : n
        }
        ,
        t.prototype.addBoundsMask = function(t, e) {
            var i = t.minX > e.minX ? t.minX : e.minX
              , r = t.minY > e.minY ? t.minY : e.minY
              , n = t.maxX < e.maxX ? t.maxX : e.maxX
              , s = t.maxY < e.maxY ? t.maxY : e.maxY;
            if (i <= n && r <= s) {
                var o = this.minX
                  , a = this.minY
                  , h = this.maxX
                  , l = this.maxY;
                this.minX = i < o ? i : o,
                this.minY = r < a ? r : a,
                this.maxX = n > h ? n : h,
                this.maxY = s > l ? s : l
            }
        }
        ,
        t.prototype.addBoundsMatrix = function(t, e) {
            this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY)
        }
        ,
        t.prototype.addBoundsArea = function(t, e) {
            var i = t.minX > e.x ? t.minX : e.x
              , r = t.minY > e.y ? t.minY : e.y
              , n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width
              , s = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
            if (i <= n && r <= s) {
                var o = this.minX
                  , a = this.minY
                  , h = this.maxX
                  , l = this.maxY;
                this.minX = i < o ? i : o,
                this.minY = r < a ? r : a,
                this.maxX = n > h ? n : h,
                this.maxY = s > l ? s : l
            }
        }
        ,
        t.prototype.pad = function(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = t),
            this.isEmpty() || (this.minX -= t,
            this.maxX += t,
            this.minY -= e,
            this.maxY += e)
        }
        ,
        t.prototype.addFramePad = function(t, e, i, r, n, s) {
            t -= n,
            e -= s,
            i += n,
            r += s,
            this.minX = this.minX < t ? this.minX : t,
            this.maxX = this.maxX > i ? this.maxX : i,
            this.minY = this.minY < e ? this.minY : e,
            this.maxY = this.maxY > r ? this.maxY : r
        }
        ,
        t
    }()
      , Wg = function(t, e) {
        return (Wg = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    };
    function zc(t, e) {
        function i() {
            this.constructor = t
        }
        Wg(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    var Hb = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.tempDisplayObjectParent = null,
            e.transform = new Zf,
            e.alpha = 1,
            e.visible = !0,
            e.renderable = !0,
            e.parent = null,
            e.worldAlpha = 1,
            e._lastSortedIndex = 0,
            e._zIndex = 0,
            e.filterArea = null,
            e.filters = null,
            e._enabledFilters = null,
            e._bounds = new Gb,
            e._localBounds = null,
            e._boundsID = 0,
            e._boundsRect = null,
            e._localBoundsRect = null,
            e._mask = null,
            e._destroyed = !1,
            e.isSprite = !1,
            e.isMask = !1,
            e
        }
        return zc(e, t),
        e.mixin = function(t) {
            for (var i = Object.keys(t), r = 0; r < i.length; ++r) {
                var n = i[r];
                Object.defineProperty(e.prototype, n, Object.getOwnPropertyDescriptor(t, n))
            }
        }
        ,
        e.prototype._recursivePostUpdateTransform = function() {
            this.parent ? (this.parent._recursivePostUpdateTransform(),
            this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
        }
        ,
        e.prototype.updateTransform = function() {
            this._boundsID++,
            this.transform.updateTransform(this.parent.transform),
            this.worldAlpha = this.alpha * this.parent.worldAlpha
        }
        ,
        e.prototype.getBounds = function(t, e) {
            return t || (this.parent ? (this._recursivePostUpdateTransform(),
            this.updateTransform()) : (this.parent = this._tempDisplayObjectParent,
            this.updateTransform(),
            this.parent = null)),
            this._bounds.updateID !== this._boundsID && (this.calculateBounds(),
            this._bounds.updateID = this._boundsID),
            e || (this._boundsRect || (this._boundsRect = new da),
            e = this._boundsRect),
            this._bounds.getRectangle(e)
        }
        ,
        e.prototype.getLocalBounds = function(t) {
            t || (this._localBoundsRect || (this._localBoundsRect = new da),
            t = this._localBoundsRect),
            this._localBounds || (this._localBounds = new Gb);
            var e = this.transform
              , i = this.parent;
            this.parent = null,
            this.transform = this._tempDisplayObjectParent.transform;
            var r = this._bounds
              , n = this._boundsID;
            this._bounds = this._localBounds;
            var s = this.getBounds(!1, t);
            return this.parent = i,
            this.transform = e,
            this._bounds = r,
            this._bounds.updateID += this._boundsID - n,
            s
        }
        ,
        e.prototype.toGlobal = function(t, e, i) {
            return void 0 === i && (i = !1),
            i || (this._recursivePostUpdateTransform(),
            this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent,
            this.displayObjectUpdateTransform(),
            this.parent = null)),
            this.worldTransform.apply(t, e)
        }
        ,
        e.prototype.toLocal = function(t, e, i, r) {
            return e && (t = e.toGlobal(t, i, r)),
            r || (this._recursivePostUpdateTransform(),
            this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent,
            this.displayObjectUpdateTransform(),
            this.parent = null)),
            this.worldTransform.applyInverse(t, i)
        }
        ,
        e.prototype.setParent = function(t) {
            if (!t || !t.addChild)
                throw new Error("setParent: Argument must be a Container");
            return t.addChild(this),
            t
        }
        ,
        e.prototype.setTransform = function(t, e, i, r, n, s, o, a, h) {
            return void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === i && (i = 1),
            void 0 === r && (r = 1),
            void 0 === n && (n = 0),
            void 0 === s && (s = 0),
            void 0 === o && (o = 0),
            void 0 === a && (a = 0),
            void 0 === h && (h = 0),
            this.position.x = t,
            this.position.y = e,
            this.scale.x = i || 1,
            this.scale.y = r || 1,
            this.rotation = n,
            this.skew.x = s,
            this.skew.y = o,
            this.pivot.x = a,
            this.pivot.y = h,
            this
        }
        ,
        e.prototype.destroy = function(t) {
            this.parent && this.parent.removeChild(this),
            this.removeAllListeners(),
            this.transform = null,
            this.parent = null,
            this._bounds = null,
            this._mask = null,
            this.filters = null,
            this.filterArea = null,
            this.hitArea = null,
            this.interactive = !1,
            this.interactiveChildren = !1,
            this._destroyed = !0
        }
        ,
        Object.defineProperty(e.prototype, "_tempDisplayObjectParent", {
            get: function() {
                return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new Xg),
                this.tempDisplayObjectParent
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.enableTempParent = function() {
            var t = this.parent;
            return this.parent = this._tempDisplayObjectParent,
            t
        }
        ,
        e.prototype.disableTempParent = function(t) {
            this.parent = t
        }
        ,
        Object.defineProperty(e.prototype, "x", {
            get: function() {
                return this.position.x
            },
            set: function(t) {
                this.transform.position.x = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "y", {
            get: function() {
                return this.position.y
            },
            set: function(t) {
                this.transform.position.y = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "worldTransform", {
            get: function() {
                return this.transform.worldTransform
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "localTransform", {
            get: function() {
                return this.transform.localTransform
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "position", {
            get: function() {
                return this.transform.position
            },
            set: function(t) {
                this.transform.position.copyFrom(t)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "scale", {
            get: function() {
                return this.transform.scale
            },
            set: function(t) {
                this.transform.scale.copyFrom(t)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "pivot", {
            get: function() {
                return this.transform.pivot
            },
            set: function(t) {
                this.transform.pivot.copyFrom(t)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "skew", {
            get: function() {
                return this.transform.skew
            },
            set: function(t) {
                this.transform.skew.copyFrom(t)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "rotation", {
            get: function() {
                return this.transform.rotation
            },
            set: function(t) {
                this.transform.rotation = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "angle", {
            get: function() {
                return this.transform.rotation * Tf
            },
            set: function(t) {
                this.transform.rotation = t * Uf
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "zIndex", {
            get: function() {
                return this._zIndex
            },
            set: function(t) {
                this._zIndex = t,
                this.parent && (this.parent.sortDirty = !0)
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "worldVisible", {
            get: function() {
                var t = this;
                do {
                    if (!t.visible)
                        return !1;
                    t = t.parent
                } while (t);
                return !0
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "mask", {
            get: function() {
                return this._mask
            },
            set: function(t) {
                var e;
                this._mask && ((e = this._mask.maskObject || this._mask).renderable = !0,
                e.isMask = !1);
                (this._mask = t,
                this._mask) && ((e = this._mask.maskObject || this._mask).renderable = !1,
                e.isMask = !0)
            },
            enumerable: !1,
            configurable: !0
        }),
        e
    }(rb.d)
      , Xg = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.sortDirty = null,
            e
        }
        return zc(e, t),
        e
    }(Hb);
    function Yg(t, e) {
        return t.zIndex === e.zIndex ? t._lastSortedIndex - e._lastSortedIndex : t.zIndex - e.zIndex
    }
    Hb.prototype.displayObjectUpdateTransform = Hb.prototype.updateTransform;
    var Ac = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.children = [],
            e.sortableChildren = aa.SORTABLE_CHILDREN,
            e.sortDirty = !1,
            e
        }
        return zc(e, t),
        e.prototype.onChildrenChange = function(t) {}
        ,
        e.prototype.addChild = function() {
            for (var t = arguments, e = [], i = 0; i < arguments.length; i++)
                e[i] = t[i];
            if (e.length > 1)
                for (var r = 0; r < e.length; r++)
                    this.addChild(e[r]);
            else {
                var n = e[0];
                n.parent && n.parent.removeChild(n),
                n.parent = this,
                this.sortDirty = !0,
                n.transform._parentID = -1,
                this.children.push(n),
                this._boundsID++,
                this.onChildrenChange(this.children.length - 1),
                this.emit("childAdded", n, this, this.children.length - 1),
                n.emit("added", this)
            }
            return e[0]
        }
        ,
        e.prototype.addChildAt = function(t, e) {
            if (e < 0 || e > this.children.length)
                throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length);
            return t.parent && t.parent.removeChild(t),
            t.parent = this,
            this.sortDirty = !0,
            t.transform._parentID = -1,
            this.children.splice(e, 0, t),
            this._boundsID++,
            this.onChildrenChange(e),
            t.emit("added", this),
            this.emit("childAdded", t, this, e),
            t
        }
        ,
        e.prototype.swapChildren = function(t, e) {
            if (t !== e) {
                var i = this.getChildIndex(t)
                  , r = this.getChildIndex(e);
                this.children[i] = e,
                this.children[r] = t,
                this.onChildrenChange(i < r ? i : r)
            }
        }
        ,
        e.prototype.getChildIndex = function(t) {
            var e = this.children.indexOf(t);
            if (-1 === e)
                throw new Error("The supplied DisplayObject must be a child of the caller");
            return e
        }
        ,
        e.prototype.setChildIndex = function(t, e) {
            if (e < 0 || e >= this.children.length)
                throw new Error("The index " + e + " supplied is out of bounds " + this.children.length);
            var i = this.getChildIndex(t);
            tb(this.children, i, 1),
            this.children.splice(e, 0, t),
            this.onChildrenChange(e)
        }
        ,
        e.prototype.getChildAt = function(t) {
            if (t < 0 || t >= this.children.length)
                throw new Error("getChildAt: Index (" + t + ") does not exist.");
            return this.children[t]
        }
        ,
        e.prototype.removeChild = function() {
            for (var t = arguments, e = [], i = 0; i < arguments.length; i++)
                e[i] = t[i];
            if (e.length > 1)
                for (var r = 0; r < e.length; r++)
                    this.removeChild(e[r]);
            else {
                var n = e[0]
                  , s = this.children.indexOf(n);
                if (-1 === s)
                    return null;
                n.parent = null,
                n.transform._parentID = -1,
                tb(this.children, s, 1),
                this._boundsID++,
                this.onChildrenChange(s),
                n.emit("removed", this),
                this.emit("childRemoved", n, this, s)
            }
            return e[0]
        }
        ,
        e.prototype.removeChildAt = function(t) {
            var e = this.getChildAt(t);
            return e.parent = null,
            e.transform._parentID = -1,
            tb(this.children, t, 1),
            this._boundsID++,
            this.onChildrenChange(t),
            e.emit("removed", this),
            this.emit("childRemoved", e, this, t),
            e
        }
        ,
        e.prototype.removeChildren = function(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = this.children.length);
            var i, r = t, n = e - r;
            if (n > 0 && n <= e) {
                i = this.children.splice(r, n);
                for (var s = 0; s < i.length; ++s)
                    i[s].parent = null,
                    i[s].transform && (i[s].transform._parentID = -1);
                this._boundsID++,
                this.onChildrenChange(t);
                for (s = 0; s < i.length; ++s)
                    i[s].emit("removed", this),
                    this.emit("childRemoved", i[s], this, s);
                return i
            }
            if (0 === n && 0 === this.children.length)
                return [];
            throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
        }
        ,
        e.prototype.sortChildren = function() {
            for (var t = !1, e = 0, i = this.children.length; e < i; ++e) {
                var r = this.children[e];
                r._lastSortedIndex = e,
                t || 0 === r.zIndex || (t = !0)
            }
            t && this.children.length > 1 && this.children.sort(Yg),
            this.sortDirty = !1
        }
        ,
        e.prototype.updateTransform = function() {
            this.sortableChildren && this.sortDirty && this.sortChildren(),
            this._boundsID++,
            this.transform.updateTransform(this.parent.transform),
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
            for (var t = 0, e = this.children.length; t < e; ++t) {
                var i = this.children[t];
                i.visible && i.updateTransform()
            }
        }
        ,
        e.prototype.calculateBounds = function() {
            this._bounds.clear(),
            this._calculateBounds();
            for (var t = 0; t < this.children.length; t++) {
                var e = this.children[t];
                if (e.visible && e.renderable)
                    if (e.calculateBounds(),
                    e._mask) {
                        var i = e._mask.maskObject || e._mask;
                        i.calculateBounds(),
                        this._bounds.addBoundsMask(e._bounds, i._bounds)
                    } else
                        e.filterArea ? this._bounds.addBoundsArea(e._bounds, e.filterArea) : this._bounds.addBounds(e._bounds)
            }
            this._bounds.updateID = this._boundsID
        }
        ,
        e.prototype.getLocalBounds = function(e, i) {
            void 0 === i && (i = !1);
            var r = t.prototype.getLocalBounds.call(this, e);
            if (!i)
                for (var n = 0, s = this.children.length; n < s; ++n) {
                    var o = this.children[n];
                    o.visible && o.updateTransform()
                }
            return r
        }
        ,
        e.prototype._calculateBounds = function() {}
        ,
        e.prototype.render = function(t) {
            if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                if (this._mask || this.filters && this.filters.length)
                    this.renderAdvanced(t);
                else {
                    this._render(t);
                    for (var e = 0, i = this.children.length; e < i; ++e)
                        this.children[e].render(t)
                }
        }
        ,
        e.prototype.renderAdvanced = function(t) {
            t.batch.flush();
            var e = this.filters
              , i = this._mask;
            if (e) {
                this._enabledFilters || (this._enabledFilters = []),
                this._enabledFilters.length = 0;
                for (var r = 0; r < e.length; r++)
                    e[r].enabled && this._enabledFilters.push(e[r]);
                this._enabledFilters.length && t.filter.push(this, this._enabledFilters)
            }
            i && t.mask.push(this, this._mask),
            this._render(t);
            r = 0;
            for (var n = this.children.length; r < n; r++)
                this.children[r].render(t);
            t.batch.flush(),
            i && t.mask.pop(this),
            e && this._enabledFilters && this._enabledFilters.length && t.filter.pop()
        }
        ,
        e.prototype._render = function(t) {}
        ,
        e.prototype.destroy = function(e) {
            t.prototype.destroy.call(this),
            this.sortDirty = !1;
            var i = "boolean" == typeof e ? e : e && e.children
              , r = this.removeChildren(0, this.children.length);
            if (i)
                for (var n = 0; n < r.length; ++n)
                    r[n].destroy(e)
        }
        ,
        Object.defineProperty(e.prototype, "width", {
            get: function() {
                return this.scale.x * this.getLocalBounds().width
            },
            set: function(t) {
                var e = this.getLocalBounds().width;
                this.scale.x = 0 !== e ? t / e : 1,
                this._width = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "height", {
            get: function() {
                return this.scale.y * this.getLocalBounds().height
            },
            set: function(t) {
                var e = this.getLocalBounds().height;
                this.scale.y = 0 !== e ? t / e : 1,
                this._height = t
            },
            enumerable: !1,
            configurable: !0
        }),
        e
    }(Hb);
    Ac.prototype.containerUpdateTransform = Ac.prototype.updateTransform;
    (function(t) {
        t.MITER = "miter",
        t.BEVEL = "bevel",
        t.ROUND = "round"
    }
    )(Fa || (ve = Fa = {},
    ve)),
    function(t) {
        t.BUTT = "butt",
        t.ROUND = "round",
        t.SQUARE = "square"
    }(Ga || (ue = Ga = {},
    ue));
    var gb = {
        adaptive: !0,
        maxLength: 10,
        minSegments: 8,
        maxSegments: 2048,
        epsilon: 1e-4,
        _segmentsCount: function(t, e) {
            if (void 0 === e && (e = 20),
            !this.adaptive || !t || isNaN(t))
                return e;
            var r = Math.ceil(t / this.maxLength);
            return r < this.minSegments ? r = this.minSegments : r > this.maxSegments && (r = this.maxSegments),
            r
        }
    }
      , de = function() {
        function t() {
            this.color = 16777215,
            this.alpha = 1,
            this.texture = oa.WHITE,
            this.matrix = null,
            this.visible = !1,
            this.reset()
        }
        return t.prototype.clone = function() {
            var e = new t;
            return e.color = this.color,
            e.alpha = this.alpha,
            e.texture = this.texture,
            e.matrix = this.matrix,
            e.visible = this.visible,
            e
        }
        ,
        t.prototype.reset = function() {
            this.color = 16777215,
            this.alpha = 1,
            this.texture = oa.WHITE,
            this.matrix = null,
            this.visible = !1
        }
        ,
        t.prototype.destroy = function() {
            this.texture = null,
            this.matrix = null
        }
        ,
        t
    }()
      , Zg = function(t, e) {
        return (Zg = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r])
        }
        )(t, e)
    };
    function Bc(t, e) {
        function r() {
            this.constructor = t
        }
        Zg(t, e),
        t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
        new r)
    }
    var ee = {
        build: function(t) {
            t.points = t.shape.points.slice()
        },
        triangulate: function(t, e) {
            var r = t.points
              , i = t.holes
              , a = e.points
              , n = e.indices;
            if (r.length >= 6) {
                for (var s = [], h = 0; h < i.length; h++) {
                    var o = i[h];
                    s.push(r.length / 2),
                    r = r.concat(o.points)
                }
                var l = cd.d(r, s, 2);
                if (!l)
                    return;
                var $ = a.length / 2;
                for (h = 0; h < l.length; h += 3)
                    n.push(l[h] + $),
                    n.push(l[h + 1] + $),
                    n.push(l[h + 2] + $);
                for (h = 0; h < r.length; h++)
                    a.push(r[h])
            }
        }
    }
      , fe = {
        build: function(t) {
            var e, r, i = t.shape, a = t.points, n = i.x, s = i.y;
            if (a.length = 0,
            t.type === fa.CIRC)
                e = i.radius,
                r = i.radius;
            else {
                var h = t.shape;
                e = h.width,
                r = h.height
            }
            if (0 !== e && 0 !== r) {
                var o = Math.floor(30 * Math.sqrt(i.radius)) || Math.floor(15 * Math.sqrt(e + r));
                o /= 2.3;
                for (var l = 2 * Math.PI / o, $ = 0; $ < o - .5; $++)
                    a.push(n + Math.sin(-l * $) * e, s + Math.cos(-l * $) * r);
                a.push(a[0], a[1])
            }
        },
        triangulate: function(t, e) {
            var r = t.points
              , i = e.points
              , a = e.indices
              , n = i.length / 2
              , s = n
              , h = t.shape
              , o = t.matrix
              , l = h.x
              , $ = h.y;
            i.push(t.matrix ? o.a * l + o.c * $ + o.tx : l, t.matrix ? o.b * l + o.d * $ + o.ty : $);
            for (var u = 0; u < r.length; u += 2)
                i.push(r[u], r[u + 1]),
                a.push(n++, s, n)
        }
    }
      , $g = {
        build: function(t) {
            var e = t.shape
              , r = e.x
              , i = e.y
              , a = e.width
              , n = e.height
              , s = t.points;
            s.length = 0,
            s.push(r, i, r + a, i, r + a, i + n, r, i + n)
        },
        triangulate: function(t, e) {
            var r = t.points
              , i = e.points
              , a = i.length / 2;
            i.push(r[0], r[1], r[2], r[3], r[6], r[7], r[4], r[5]),
            e.indices.push(a, a + 1, a + 2, a + 1, a + 2, a + 3)
        }
    };
    function Xa(t, e, r) {
        return t + (e - t) * r
    }
    function Ib(t, e, r, i, a, n, s) {
        void 0 === s && (s = []);
        for (var h = s, o = 0, l = 0, $ = 0, u = 0, p = 0, c = 0, d = 0, v = 0; d <= 20; ++d)
            o = Xa(t, r, v = d / 20),
            l = Xa(e, i, v),
            $ = Xa(r, a, v),
            u = Xa(i, n, v),
            p = Xa(o, $, v),
            c = Xa(l, u, v),
            h.push(p, c);
        return h
    }
    var _g = {
        build: function(t) {
            var e = t.shape
              , r = t.points
              , i = e.x
              , a = e.y
              , n = e.width
              , s = e.height
              , h = Math.max(0, Math.min(e.radius, Math.min(n, s) / 2));
            r.length = 0,
            h ? (Ib(i, a + h, i, a, i + h, a, r),
            Ib(i + n - h, a, i + n, a, i + n, a + h, r),
            Ib(i + n, a + s - h, i + n, a + s, i + n - h, a + s, r),
            Ib(i + h, a + s, i, a + s, i, a + s - h, r)) : r.push(i, a, i + n, a, i + n, a + s, i, a + s)
        },
        triangulate: function(t, e) {
            for (var r = t.points, i = e.points, a = e.indices, n = i.length / 2, s = cd.d(r, null, 2), h = 0, o = s.length; h < o; h += 3)
                a.push(s[h] + n),
                a.push(s[h + 1] + n),
                a.push(s[h + 2] + n);
            for (h = 0,
            o = r.length; h < o; h++)
                i.push(r[h], r[++h])
        }
    };
    function ge(t, e, r, i, a, n, s, h) {
        var o, l;
        s ? (o = i,
        l = -r) : (o = -i,
        l = r);
        var $ = t - r * a + o
          , u = e - i * a + l
          , p = t + r * n + o
          , c = e + i * n + l;
        return h.push($, u),
        h.push(p, c),
        2
    }
    function Ya(t, e, r, i, a, n, s, h) {
        var o = r - t
          , l = i - e
          , $ = Math.atan2(o, l)
          , u = Math.atan2(a - t, n - e);
        h && $ < u ? $ += 2 * Math.PI : !h && $ > u && (u += 2 * Math.PI);
        var p = $
          , c = u - $
          , d = Math.abs(c)
          , v = Math.sqrt(o * o + l * l)
          , f = 1 + (15 * d * Math.sqrt(v) / Math.PI >> 0)
          , y = c / f;
        if (p += y,
        h) {
            s.push(t, e),
            s.push(r, i);
            for (var g = 1, q = p; g < f; g++,
            q += y)
                s.push(t, e),
                s.push(t + Math.sin(q) * v, e + Math.cos(q) * v);
            s.push(t, e),
            s.push(a, n)
        } else {
            s.push(r, i),
            s.push(t, e);
            for (g = 1,
            q = p; g < f; g++,
            q += y)
                s.push(t + Math.sin(q) * v, e + Math.cos(q) * v),
                s.push(t, e);
            s.push(a, n),
            s.push(t, e)
        }
        return 2 * f
    }
    function ah(t, e) {
        var r = t.shape
          , i = t.points || r.points.slice()
          , a = e.closePointEps;
        if (0 !== i.length) {
            var n = t.lineStyle
              , s = new ra(i[0],i[1])
              , h = new ra(i[i.length - 2],i[i.length - 1])
              , o = r.type !== fa.POLY || r.closeStroke
              , l = Math.abs(s.x - h.x) < a && Math.abs(s.y - h.y) < a;
            if (o) {
                i = i.slice(),
                l && (i.pop(),
                i.pop(),
                h.set(i[i.length - 2], i[i.length - 1]));
                var $ = .5 * (s.x + h.x)
                  , u = .5 * (h.y + s.y);
                i.unshift($, u),
                i.push($, u)
            }
            var p = e.points
              , c = i.length / 2
              , d = i.length
              , v = p.length / 2
              , f = n.width / 2
              , y = f * f
              , g = n.miterLimit * n.miterLimit
              , q = i[0]
              , m = i[1]
              , Q = i[2]
              , x = i[3]
              , b = 0
              , _ = 0
              , P = -(m - x)
              , S = q - Q
              , A = 0
              , w = 0
              , L = Math.sqrt(P * P + S * S);
            P /= L,
            S /= L,
            P *= f,
            S *= f;
            var E = n.alignment
              , C = 2 * (1 - E)
              , M = 2 * E;
            o || (n.cap === Ga.ROUND ? d += Ya(q - P * (C - M) * .5, m - S * (C - M) * .5, q - P * C, m - S * C, q + P * M, m + S * M, p, !0) + 2 : n.cap === Ga.SQUARE && (d += ge(q, m, P, S, C, M, !0, p))),
            p.push(q - P * C, m - S * C),
            p.push(q + P * M, m + S * M);
            for (var D = 1; D < c - 1; ++D) {
                q = i[2 * (D - 1)],
                m = i[2 * (D - 1) + 1],
                Q = i[2 * D],
                x = i[2 * D + 1],
                b = i[2 * (D + 1)],
                _ = i[2 * (D + 1) + 1],
                P = -(m - x),
                S = q - Q,
                P /= L = Math.sqrt(P * P + S * S),
                S /= L,
                P *= f,
                S *= f,
                A = -(x - _),
                w = Q - b,
                A /= L = Math.sqrt(A * A + w * w),
                w /= L,
                A *= f,
                w *= f;
                var I = Q - q
                  , T = m - x
                  , R = Q - b
                  , O = _ - x
                  , N = T * R - O * I
                  , B = N < 0;
                if (Math.abs(N) < .1)
                    p.push(Q - P * C, x - S * C),
                    p.push(Q + P * M, x + S * M);
                else {
                    var U = (-P + q) * (-S + x) - (-P + Q) * (-S + m)
                      , H = (-A + b) * (-w + x) - (-A + Q) * (-w + _)
                      , F = (I * H - R * U) / N
                      , G = (O * U - T * H) / N
                      , z = (F - Q) * (F - Q) + (G - x) * (G - x)
                      , j = Q + (F - Q) * C
                      , W = x + (G - x) * C
                      , k = Q - (F - Q) * M
                      , V = x - (G - x) * M
                      , J = B ? C : M;
                    z <= Math.min(I * I + T * T, R * R + O * O) + J * J * y ? n.join === Fa.BEVEL || z / y > g ? (B ? (p.push(j, W),
                    p.push(Q + P * M, x + S * M),
                    p.push(j, W),
                    p.push(Q + A * M, x + w * M)) : (p.push(Q - P * C, x - S * C),
                    p.push(k, V),
                    p.push(Q - A * C, x - w * C),
                    p.push(k, V)),
                    d += 2) : n.join === Fa.ROUND ? B ? (p.push(j, W),
                    p.push(Q + P * M, x + S * M),
                    d += Ya(Q, x, Q + P * M, x + S * M, Q + A * M, x + w * M, p, !0) + 4,
                    p.push(j, W),
                    p.push(Q + A * M, x + w * M)) : (p.push(Q - P * C, x - S * C),
                    p.push(k, V),
                    d += Ya(Q, x, Q - P * C, x - S * C, Q - A * C, x - w * C, p, !1) + 4,
                    p.push(Q - A * C, x - w * C),
                    p.push(k, V)) : (p.push(j, W),
                    p.push(k, V)) : (p.push(Q - P * C, x - S * C),
                    p.push(Q + P * M, x + S * M),
                    n.join === Fa.BEVEL || z / y > g || (n.join === Fa.ROUND ? d += B ? Ya(Q, x, Q + P * M, x + S * M, Q + A * M, x + w * M, p, !0) + 2 : Ya(Q, x, Q - P * C, x - S * C, Q - A * C, x - w * C, p, !1) + 2 : (B ? (p.push(k, V),
                    p.push(k, V)) : (p.push(j, W),
                    p.push(j, W)),
                    d += 2)),
                    p.push(Q - A * C, x - w * C),
                    p.push(Q + A * M, x + w * M),
                    d += 2)
                }
            }
            q = i[2 * (c - 2)],
            m = i[2 * (c - 2) + 1],
            Q = i[2 * (c - 1)],
            P = -(m - (x = i[2 * (c - 1) + 1])),
            S = q - Q,
            P /= L = Math.sqrt(P * P + S * S),
            S /= L,
            P *= f,
            S *= f,
            p.push(Q - P * C, x - S * C),
            p.push(Q + P * M, x + S * M),
            o || (n.cap === Ga.ROUND ? d += Ya(Q - P * (C - M) * .5, x - S * (C - M) * .5, Q - P * C, x - S * C, Q + P * M, x + S * M, p, !1) + 2 : n.cap === Ga.SQUARE && (d += ge(Q, x, P, S, C, M, !1, p)));
            var Y = e.indices
              , X = gb.epsilon * gb.epsilon;
            for (D = v; D < d + v - 2; ++D)
                q = p[2 * D],
                m = p[2 * D + 1],
                Q = p[2 * (D + 1)],
                x = p[2 * (D + 1) + 1],
                b = p[2 * (D + 2)],
                _ = p[2 * (D + 2) + 1],
                Math.abs(q * (x - _) + Q * (_ - m) + b * (m - x)) < X || Y.push(D, D + 1, D + 2)
        }
    }
    function bh(t, e) {
        var r = 0
          , i = t.shape
          , a = t.points || i.points
          , n = i.type !== fa.POLY || i.closeStroke;
        if (0 !== a.length) {
            var s = e.points
              , h = e.indices
              , o = a.length / 2
              , l = s.length / 2
              , $ = l;
            for (s.push(a[0], a[1]),
            r = 1; r < o; r++)
                s.push(a[2 * r], a[2 * r + 1]),
                h.push($, $ + 1),
                $++;
            n && h.push($, l)
        }
    }
    function he(t, e) {
        t.lineStyle.native ? bh(t, e) : ah(t, e)
    }
    var hb, ie = function() {
        function t() {}
        return t.curveTo = function(t, e, r, i, a, n) {
            var s = n[n.length - 2]
              , h = n[n.length - 1] - e
              , o = s - t
              , l = i - e
              , $ = r - t
              , u = Math.abs(h * $ - o * l);
            if (u < 1e-8 || 0 === a)
                return n[n.length - 2] === t && n[n.length - 1] === e || n.push(t, e),
                null;
            var p = h * h + o * o
              , c = l * l + $ * $
              , d = h * l + o * $
              , v = a * Math.sqrt(p) / u
              , f = a * Math.sqrt(c) / u
              , y = v * d / p
              , g = f * d / c
              , q = v * $ + f * o
              , m = v * l + f * h
              , Q = o * (f + y)
              , x = h * (f + y)
              , b = $ * (v + g)
              , _ = l * (v + g);
            return {
                cx: q + t,
                cy: m + e,
                radius: a,
                startAngle: Math.atan2(x - m, Q - q),
                endAngle: Math.atan2(_ - m, b - q),
                anticlockwise: o * l > $ * h
            }
        }
        ,
        t.arc = function(t, e, r, i, a, n, s, h, o) {
            for (var l = s - n, $ = gb._segmentsCount(Math.abs(l) * a, 40 * Math.ceil(Math.abs(l) / wb)), u = l / (2 * $), p = 2 * u, c = Math.cos(u), d = Math.sin(u), v = $ - 1, f = v % 1 / v, y = 0; y <= v; ++y) {
                var g = u + n + p * (y + f * y)
                  , q = Math.cos(g)
                  , m = -Math.sin(g);
                o.push((c * q + d * m) * a + r, (c * -m + d * q) * a + i)
            }
        }
        ,
        t
    }(), ch = function() {
        function t() {}
        return t.curveLength = function(t, e, r, i, a, n, s, h) {
            for (var o = 0, l = 0, $ = 0, u = 0, p = 0, c = 0, d = 0, v = 0, f = 0, y = 0, g = 0, q = t, m = e, Q = 1; Q <= 10; ++Q)
                y = q - (v = (d = (c = (p = 1 - (l = Q / 10)) * p) * p) * t + 3 * c * l * r + 3 * p * ($ = l * l) * a + (u = $ * l) * s),
                g = m - (f = d * e + 3 * c * l * i + 3 * p * $ * n + u * h),
                q = v,
                m = f,
                o += Math.sqrt(y * y + g * g);
            return o
        }
        ,
        t.curveTo = function(e, r, i, a, n, s, h) {
            var o = h[h.length - 2]
              , l = h[h.length - 1];
            h.length -= 2;
            var $ = gb._segmentsCount(t.curveLength(o, l, e, r, i, a, n, s))
              , u = 0
              , p = 0
              , c = 0
              , d = 0
              , v = 0;
            h.push(o, l);
            for (var f = 1, y = 0; f <= $; ++f)
                c = (p = (u = 1 - (y = f / $)) * u) * u,
                v = (d = y * y) * y,
                h.push(c * o + 3 * p * y * e + 3 * u * d * i + v * n, c * l + 3 * p * y * r + 3 * u * d * a + v * s)
        }
        ,
        t
    }(), dh = function() {
        function t() {}
        return t.curveLength = function(t, e, r, i, a, n) {
            var s = t - 2 * r + a
              , h = e - 2 * i + n
              , o = 2 * r - 2 * t
              , l = 2 * i - 2 * e
              , $ = 4 * (s * s + h * h)
              , u = 4 * (s * o + h * l)
              , p = o * o + l * l
              , c = 2 * Math.sqrt($ + u + p)
              , d = Math.sqrt($)
              , v = 2 * $ * d
              , f = 2 * Math.sqrt(p)
              , y = u / d;
            return (v * c + d * u * (c - f) + (4 * p * $ - u * u) * Math.log((2 * d + y + c) / (y + f))) / (4 * v)
        }
        ,
        t.curveTo = function(e, r, i, a, n) {
            for (var s = n[n.length - 2], h = n[n.length - 1], o = gb._segmentsCount(t.curveLength(s, h, e, r, i, a)), l = 0, $ = 0, u = 1; u <= o; ++u) {
                var p = u / o;
                l = s + (e - s) * p,
                $ = h + (r - h) * p,
                n.push(l + (e + (i - e) * p - l) * p, $ + (r + (a - r) * p - $) * p)
            }
        }
        ,
        t
    }(), eh = function() {
        function t() {
            this.reset()
        }
        return t.prototype.begin = function(t, e, r) {
            this.reset(),
            this.style = t,
            this.start = e,
            this.attribStart = r
        }
        ,
        t.prototype.end = function(t, e) {
            this.attribSize = e - this.attribStart,
            this.size = t - this.start
        }
        ,
        t.prototype.reset = function() {
            this.style = null,
            this.size = 0,
            this.start = 0,
            this.attribStart = 0,
            this.attribSize = 0
        }
        ,
        t
    }(), Cc = ((hb = {})[fa.POLY] = ee,
    hb[fa.CIRC] = fe,
    hb[fa.ELIP] = fe,
    hb[fa.RECT] = $g,
    hb[fa.RREC] = _g,
    hb), je = [], Jb = [], ke = function() {
        function t(t, e, r, i) {
            void 0 === e && (e = null),
            void 0 === r && (r = null),
            void 0 === i && (i = null),
            this.shape = t,
            this.lineStyle = r,
            this.fillStyle = e,
            this.matrix = i,
            this.type = t.type,
            this.points = [],
            this.holes = []
        }
        return t.prototype.clone = function() {
            return new t(this.shape,this.fillStyle,this.lineStyle,this.matrix)
        }
        ,
        t.prototype.destroy = function() {
            this.shape = null,
            this.holes.length = 0,
            this.holes = null,
            this.points.length = 0,
            this.points = null,
            this.lineStyle = null,
            this.fillStyle = null
        }
        ,
        t
    }(), Za = new ra, fh = new Gb, gh = function(t) {
        function e() {
            var e = t.call(this) || this;
            return e.uvsFloat32 = null,
            e.indicesUint16 = null,
            e.points = [],
            e.colors = [],
            e.uvs = [],
            e.indices = [],
            e.textureIds = [],
            e.graphicsData = [],
            e.dirty = 0,
            e.batchDirty = -1,
            e.cacheDirty = -1,
            e.clearDirty = 0,
            e.drawCalls = [],
            e.batches = [],
            e.shapeIndex = 0,
            e._bounds = new Gb,
            e.boundsDirty = -1,
            e.boundsPadding = 0,
            e.batchable = !1,
            e.indicesUint16 = null,
            e.uvsFloat32 = null,
            e.closePointEps = 1e-4,
            e
        }
        return Bc(e, t),
        Object.defineProperty(e.prototype, "bounds", {
            get: function() {
                return this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty,
                this.calculateBounds()),
                this._bounds
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.invalidate = function() {
            this.boundsDirty = -1,
            this.dirty++,
            this.batchDirty++,
            this.shapeIndex = 0,
            this.points.length = 0,
            this.colors.length = 0,
            this.uvs.length = 0,
            this.indices.length = 0,
            this.textureIds.length = 0;
            for (var t = 0; t < this.drawCalls.length; t++)
                this.drawCalls[t].texArray.clear(),
                Jb.push(this.drawCalls[t]);
            this.drawCalls.length = 0;
            for (t = 0; t < this.batches.length; t++) {
                var e = this.batches[t];
                e.reset(),
                je.push(e)
            }
            this.batches.length = 0
        }
        ,
        e.prototype.clear = function() {
            return this.graphicsData.length > 0 && (this.invalidate(),
            this.clearDirty++,
            this.graphicsData.length = 0),
            this
        }
        ,
        e.prototype.drawShape = function(t, e, r, i) {
            void 0 === e && (e = null),
            void 0 === r && (r = null),
            void 0 === i && (i = null);
            var a = new ke(t,e,r,i);
            return this.graphicsData.push(a),
            this.dirty++,
            this
        }
        ,
        e.prototype.drawHole = function(t, e) {
            if (void 0 === e && (e = null),
            !this.graphicsData.length)
                return null;
            var r = new ke(t,null,null,e)
              , i = this.graphicsData[this.graphicsData.length - 1];
            return r.lineStyle = i.lineStyle,
            i.holes.push(r),
            this.dirty++,
            this
        }
        ,
        e.prototype.destroy = function() {
            t.prototype.destroy.call(this);
            for (var e = 0; e < this.graphicsData.length; ++e)
                this.graphicsData[e].destroy();
            this.points.length = 0,
            this.points = null,
            this.colors.length = 0,
            this.colors = null,
            this.uvs.length = 0,
            this.uvs = null,
            this.indices.length = 0,
            this.indices = null,
            this.indexBuffer.destroy(),
            this.indexBuffer = null,
            this.graphicsData.length = 0,
            this.graphicsData = null,
            this.drawCalls.length = 0,
            this.drawCalls = null,
            this.batches.length = 0,
            this.batches = null,
            this._bounds = null
        }
        ,
        e.prototype.containsPoint = function(t) {
            for (var e = this.graphicsData, r = 0; r < e.length; ++r) {
                var i = e[r];
                if (i.fillStyle.visible && i.shape && (i.matrix ? i.matrix.applyInverse(t, Za) : Za.copyFrom(t),
                i.shape.contains(Za.x, Za.y))) {
                    var a = !1;
                    if (i.holes)
                        for (var n = 0; n < i.holes.length; n++) {
                            if (i.holes[n].shape.contains(Za.x, Za.y)) {
                                a = !0;
                                break
                            }
                        }
                    if (!a)
                        return !0
                }
            }
            return !1
        }
        ,
        e.prototype.updateBatches = function(t) {
            if (this.graphicsData.length) {
                if (this.validateBatching()) {
                    this.cacheDirty = this.dirty;
                    var e = this.uvs
                      , r = this.graphicsData
                      , i = null
                      , a = null;
                    this.batches.length > 0 && (a = (i = this.batches[this.batches.length - 1]).style);
                    for (var n = this.shapeIndex; n < r.length; n++) {
                        this.shapeIndex++;
                        var s = r[n]
                          , h = s.fillStyle
                          , o = s.lineStyle;
                        Cc[s.type].build(s),
                        s.matrix && this.transformPoints(s.points, s.matrix);
                        for (var l = 0; l < 2; l++) {
                            var $ = 0 === l ? h : o;
                            if ($.visible) {
                                var u = $.texture.baseTexture
                                  , p = this.indices.length
                                  , c = this.points.length / 2;
                                u.wrapMode = Rb.REPEAT,
                                0 === l ? this.processFill(s) : this.processLine(s);
                                var d = this.points.length / 2 - c;
                                0 !== d && (i && !this._compareStyles(a, $) && (i.end(p, c),
                                i = null),
                                i || ((i = je.pop() || new eh).begin($, p, c),
                                this.batches.push(i),
                                a = $),
                                this.addUvs(this.points, e, $.texture, c, d, $.matrix))
                            }
                        }
                    }
                    var v = this.indices.length
                      , f = this.points.length / 2;
                    if (i && i.end(v, f),
                    0 !== this.batches.length) {
                        if (this.indicesUint16 && this.indices.length === this.indicesUint16.length)
                            this.indicesUint16.set(this.indices);
                        else {
                            var y = f > 65535 && t;
                            this.indicesUint16 = y ? new Uint32Array(this.indices) : new Uint16Array(this.indices)
                        }
                        this.batchable = this.isBatchable(),
                        this.batchable ? this.packBatches() : this.buildDrawCalls()
                    } else
                        this.batchable = !0
                }
            } else
                this.batchable = !0
        }
        ,
        e.prototype._compareStyles = function(t, e) {
            return !(!t || !e) && t.texture.baseTexture === e.texture.baseTexture && t.color + t.alpha === e.color + e.alpha && !!t.native == !!e.native
        }
        ,
        e.prototype.validateBatching = function() {
            if (this.dirty === this.cacheDirty || !this.graphicsData.length)
                return !1;
            for (var t = 0, e = this.graphicsData.length; t < e; t++) {
                var r = this.graphicsData[t]
                  , i = r.fillStyle
                  , a = r.lineStyle;
                if (i && !i.texture.baseTexture.valid)
                    return !1;
                if (a && !a.texture.baseTexture.valid)
                    return !1
            }
            return !0
        }
        ,
        e.prototype.packBatches = function() {
            this.batchDirty++,
            this.uvsFloat32 = new Float32Array(this.uvs);
            for (var t = this.batches, e = 0, r = t.length; e < r; e++)
                for (var i = t[e], a = 0; a < i.size; a++) {
                    var n = i.start + a;
                    this.indicesUint16[n] = this.indicesUint16[n] - i.attribStart
                }
        }
        ,
        e.prototype.isBatchable = function() {
            if (this.points.length > 131070)
                return !1;
            for (var t = this.batches, r = 0; r < t.length; r++)
                if (t[r].style.native)
                    return !1;
            return this.points.length < 2 * e.BATCHABLE_SIZE
        }
        ,
        e.prototype.buildDrawCalls = function() {
            for (var t = ++ia._globalBatch, e = 0; e < this.drawCalls.length; e++)
                this.drawCalls[e].texArray.clear(),
                Jb.push(this.drawCalls[e]);
            this.drawCalls.length = 0;
            var r = this.colors
              , i = this.textureIds
              , a = Jb.pop();
            a || ((a = new xc).texArray = new yc),
            a.texArray.count = 0,
            a.start = 0,
            a.size = 0,
            a.type = Ba.TRIANGLES;
            var n = 0
              , s = null
              , h = 0
              , o = !1
              , l = Ba.TRIANGLES
              , $ = 0;
            this.drawCalls.push(a);
            for (e = 0; e < this.batches.length; e++) {
                var u = this.batches[e]
                  , p = u.style
                  , c = p.texture.baseTexture;
                o !== !!p.native && (l = (o = !!p.native) ? Ba.LINES : Ba.TRIANGLES,
                s = null,
                n = 8,
                t++),
                s !== c && (s = c,
                c._batchEnabled !== t && (8 === n && (t++,
                n = 0,
                a.size > 0 && ((a = Jb.pop()) || ((a = new xc).texArray = new yc),
                this.drawCalls.push(a)),
                a.start = $,
                a.size = 0,
                a.texArray.count = 0,
                a.type = l),
                c.touched = 1,
                c._batchEnabled = t,
                c._batchLocation = n,
                c.wrapMode = 10497,
                a.texArray.elements[a.texArray.count++] = c,
                n++)),
                a.size += u.size,
                $ += u.size,
                h = c._batchLocation,
                this.addColors(r, p.color, p.alpha, u.attribSize),
                this.addTextureIds(i, h, u.attribSize)
            }
            ia._globalBatch = t,
            this.packAttributes()
        }
        ,
        e.prototype.packAttributes = function() {
            for (var t = this.points, e = this.uvs, r = this.colors, i = this.textureIds, a = new ArrayBuffer(3 * t.length * 4), n = new Float32Array(a), s = new Uint32Array(a), h = 0, o = 0; o < t.length / 2; o++)
                n[h++] = t[2 * o],
                n[h++] = t[2 * o + 1],
                n[h++] = e[2 * o],
                n[h++] = e[2 * o + 1],
                s[h++] = r[o],
                n[h++] = i[o];
            this._buffer.update(a),
            this._indexBuffer.update(this.indicesUint16)
        }
        ,
        e.prototype.processFill = function(t) {
            t.holes.length ? (this.processHoles(t.holes),
            ee.triangulate(t, this)) : Cc[t.type].triangulate(t, this)
        }
        ,
        e.prototype.processLine = function(t) {
            he(t, this);
            for (var e = 0; e < t.holes.length; e++)
                he(t.holes[e], this)
        }
        ,
        e.prototype.processHoles = function(t) {
            for (var e = 0; e < t.length; e++) {
                var r = t[e];
                Cc[r.type].build(r),
                r.matrix && this.transformPoints(r.points, r.matrix)
            }
        }
        ,
        e.prototype.calculateBounds = function() {
            var t = this._bounds
              , e = fh
              , r = la.IDENTITY;
            this._bounds.clear(),
            e.clear();
            for (var i = 0; i < this.graphicsData.length; i++) {
                var a = this.graphicsData[i]
                  , n = a.shape
                  , s = a.type
                  , h = a.lineStyle
                  , o = a.matrix || la.IDENTITY
                  , l = 0;
                if (h && h.visible) {
                    var $ = h.alignment;
                    l = h.width,
                    s === fa.POLY ? l *= .5 + Math.abs(.5 - $) : l *= Math.max(0, $)
                }
                if (r !== o && (e.isEmpty() || (t.addBoundsMatrix(e, r),
                e.clear()),
                r = o),
                s === fa.RECT || s === fa.RREC) {
                    var u = n;
                    e.addFramePad(u.x, u.y, u.x + u.width, u.y + u.height, l, l)
                } else if (s === fa.CIRC) {
                    var p = n;
                    e.addFramePad(p.x, p.y, p.x, p.y, p.radius + l, p.radius + l)
                } else if (s === fa.ELIP) {
                    var c = n;
                    e.addFramePad(c.x, c.y, c.x, c.y, c.width + l, c.height + l)
                } else {
                    var d = n;
                    t.addVerticesMatrix(r, d.points, 0, d.points.length, l, l)
                }
            }
            e.isEmpty() || t.addBoundsMatrix(e, r),
            t.pad(this.boundsPadding, this.boundsPadding)
        }
        ,
        e.prototype.transformPoints = function(t, e) {
            for (var r = 0; r < t.length / 2; r++) {
                var i = t[2 * r]
                  , a = t[2 * r + 1];
                t[2 * r] = e.a * i + e.c * a + e.tx,
                t[2 * r + 1] = e.b * i + e.d * a + e.ty
            }
        }
        ,
        e.prototype.addColors = function(t, e, r, i) {
            for (var a = fd((e >> 16) + (65280 & e) + ((255 & e) << 16), r); i-- > 0; )
                t.push(a)
        }
        ,
        e.prototype.addTextureIds = function(t, e, r) {
            for (; r-- > 0; )
                t.push(e)
        }
        ,
        e.prototype.addUvs = function(t, e, r, i, a, n) {
            void 0 === n && (n = null);
            for (var s = 0, h = e.length, o = r.frame; s < a; ) {
                var l = t[2 * (i + s)]
                  , $ = t[2 * (i + s) + 1];
                if (n) {
                    var u = n.a * l + n.c * $ + n.tx;
                    $ = n.b * l + n.d * $ + n.ty,
                    l = u
                }
                s++,
                e.push(l / o.width, $ / o.height)
            }
            var p = r.baseTexture;
            (o.width < p.width || o.height < p.height) && this.adjustUvs(e, r, h, a)
        }
        ,
        e.prototype.adjustUvs = function(t, e, r, i) {
            for (var a = e.baseTexture, n = r + 2 * i, s = e.frame, h = s.width / a.width, o = s.height / a.height, l = s.x / s.width, $ = s.y / s.height, u = Math.floor(t[r] + 1e-6), p = Math.floor(t[r + 1] + 1e-6), c = r + 2; c < n; c += 2)
                u = Math.min(u, Math.floor(t[c] + 1e-6)),
                p = Math.min(p, Math.floor(t[c + 1] + 1e-6));
            l -= u,
            $ -= p;
            for (c = r; c < n; c += 2)
                t[c] = (t[c] + l) * h,
                t[c + 1] = (t[c + 1] + $) * o
        }
        ,
        e.BATCHABLE_SIZE = 100,
        e
    }(_d), hh = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.width = 0,
            e.alignment = .5,
            e.native = !1,
            e.cap = Ga.BUTT,
            e.join = Fa.MITER,
            e.miterLimit = 10,
            e
        }
        return Bc(e, t),
        e.prototype.clone = function() {
            var t = new e;
            return t.color = this.color,
            t.alpha = this.alpha,
            t.texture = this.texture,
            t.matrix = this.matrix,
            t.visible = this.visible,
            t.width = this.width,
            t.alignment = this.alignment,
            t.native = this.native,
            t.cap = this.cap,
            t.join = this.join,
            t.miterLimit = this.miterLimit,
            t
        }
        ,
        e.prototype.reset = function() {
            t.prototype.reset.call(this),
            this.color = 0,
            this.alignment = .5,
            this.width = 0,
            this.native = !1
        }
        ,
        e
    }(de), ih = new Float32Array(3), Dc = {}, jh = function(t) {
        function e(e) {
            void 0 === e && (e = null);
            var r = t.call(this) || this;
            return r._geometry = e || new gh,
            r._geometry.refCount++,
            r.shader = null,
            r.state = Fb.for2d(),
            r._fillStyle = new de,
            r._lineStyle = new hh,
            r._matrix = null,
            r._holeMode = !1,
            r.currentPath = null,
            r.batches = [],
            r.batchTint = -1,
            r.batchDirty = -1,
            r.vertexData = null,
            r.pluginName = "batch",
            r._transformID = -1,
            r.tint = 16777215,
            r.blendMode = K.NORMAL,
            r
        }
        return Bc(e, t),
        Object.defineProperty(e.prototype, "geometry", {
            get: function() {
                return this._geometry
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.clone = function() {
            return this.finishPoly(),
            new e(this._geometry)
        }
        ,
        Object.defineProperty(e.prototype, "blendMode", {
            get: function() {
                return this.state.blendMode
            },
            set: function(t) {
                this.state.blendMode = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "tint", {
            get: function() {
                return this._tint
            },
            set: function(t) {
                this._tint = t
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "fill", {
            get: function() {
                return this._fillStyle
            },
            enumerable: !1,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "line", {
            get: function() {
                return this._lineStyle
            },
            enumerable: !1,
            configurable: !0
        }),
        e.prototype.lineStyle = function(t, e, r, i, a) {
            return void 0 === t && (t = null),
            void 0 === e && (e = 0),
            void 0 === r && (r = 1),
            void 0 === i && (i = .5),
            void 0 === a && (a = !1),
            "number" == typeof t && (t = {
                width: t,
                color: e,
                alpha: r,
                alignment: i,
                native: a
            }),
            this.lineTextureStyle(t)
        }
        ,
        e.prototype.lineTextureStyle = function(t) {
            t = Object.assign({
                width: 0,
                texture: oa.WHITE,
                color: t && t.texture ? 16777215 : 0,
                alpha: 1,
                matrix: null,
                alignment: .5,
                native: !1,
                cap: Ga.BUTT,
                join: Fa.MITER,
                miterLimit: 10
            }, t),
            this.currentPath && this.startPoly();
            var e = t.width > 0 && t.alpha > 0;
            return e ? (t.matrix && (t.matrix = t.matrix.clone(),
            t.matrix.invert()),
            Object.assign(this._lineStyle, {
                visible: e
            }, t)) : this._lineStyle.reset(),
            this
        }
        ,
        e.prototype.startPoly = function() {
            if (this.currentPath) {
                var t = this.currentPath.points
                  , e = this.currentPath.points.length;
                e > 2 && (this.drawShape(this.currentPath),
                this.currentPath = new $b,
                this.currentPath.closeStroke = !1,
                this.currentPath.points.push(t[e - 2], t[e - 1]))
            } else
                this.currentPath = new $b,
                this.currentPath.closeStroke = !1
        }
        ,
        e.prototype.finishPoly = function() {
            this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath),
            this.currentPath = null) : this.currentPath.points.length = 0)
        }
        ,
        e.prototype.moveTo = function(t, e) {
            return this.startPoly(),
            this.currentPath.points[0] = t,
            this.currentPath.points[1] = e,
            this
        }
        ,
        e.prototype.lineTo = function(t, e) {
            this.currentPath || this.moveTo(0, 0);
            var r = this.currentPath.points
              , i = r[r.length - 2]
              , a = r[r.length - 1];
            return i === t && a === e || r.push(t, e),
            this
        }
        ,
        e.prototype._initCurve = function(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.currentPath ? 0 === this.currentPath.points.length && (this.currentPath.points = [t, e]) : this.moveTo(t, e)
        }
        ,
        e.prototype.quadraticCurveTo = function(t, e, r, i) {
            this._initCurve();
            var a = this.currentPath.points;
            return 0 === a.length && this.moveTo(0, 0),
            dh.curveTo(t, e, r, i, a),
            this
        }
        ,
        e.prototype.bezierCurveTo = function(t, e, r, i, a, n) {
            return this._initCurve(),
            ch.curveTo(t, e, r, i, a, n, this.currentPath.points),
            this
        }
        ,
        e.prototype.arcTo = function(t, e, r, i, a) {
            this._initCurve(t, e);
            var n = this.currentPath.points
              , s = ie.curveTo(t, e, r, i, a, n);
            if (s) {
                var h = s.cx
                  , o = s.cy
                  , l = s.radius
                  , $ = s.startAngle
                  , u = s.endAngle
                  , p = s.anticlockwise;
                this.arc(h, o, l, $, u, p)
            }
            return this
        }
        ,
        e.prototype.arc = function(t, e, r, i, a, n) {
            if (void 0 === n && (n = !1),
            i === a)
                return this;
            if (!n && a <= i ? a += wb : n && i <= a && (i += wb),
            0 === a - i)
                return this;
            var s = t + Math.cos(i) * r
              , h = e + Math.sin(i) * r
              , o = this._geometry.closePointEps
              , l = this.currentPath ? this.currentPath.points : null;
            if (l) {
                var $ = Math.abs(l[l.length - 2] - s)
                  , u = Math.abs(l[l.length - 1] - h);
                $ < o && u < o || l.push(s, h)
            } else
                this.moveTo(s, h),
                l = this.currentPath.points;
            return ie.arc(s, h, t, e, r, i, a, n, l),
            this
        }
        ,
        e.prototype.beginFill = function(t, e) {
            return void 0 === t && (t = 0),
            void 0 === e && (e = 1),
            this.beginTextureFill({
                texture: oa.WHITE,
                color: t,
                alpha: e
            })
        }
        ,
        e.prototype.beginTextureFill = function(t) {
            t = Object.assign({
                texture: oa.WHITE,
                color: 16777215,
                alpha: 1,
                matrix: null
            }, t),
            this.currentPath && this.startPoly();
            var e = t.alpha > 0;
            return e ? (t.matrix && (t.matrix = t.matrix.clone(),
            t.matrix.invert()),
            Object.assign(this._fillStyle, {
                visible: e
            }, t)) : this._fillStyle.reset(),
            this
        }
        ,
        e.prototype.endFill = function() {
            return this.finishPoly(),
            this._fillStyle.reset(),
            this
        }
        ,
        e.prototype.drawRect = function(t, e, r, i) {
            return this.drawShape(new da(t,e,r,i))
        }
        ,
        e.prototype.drawRoundedRect = function(t, e, r, i, a) {
            return this.drawShape(new Xf(t,e,r,i,a))
        }
        ,
        e.prototype.drawCircle = function(t, e, r) {
            return this.drawShape(new Vf(t,e,r))
        }
        ,
        e.prototype.drawEllipse = function(t, e, r, i) {
            return this.drawShape(new Wf(t,e,r,i))
        }
        ,
        e.prototype.drawPolygon = function() {
            for (var t, e = arguments, r = [], i = 0; i < arguments.length; i++)
                r[i] = e[i];
            var a = !0
              , n = r[0];
            n.points ? (a = n.closeStroke,
            t = n.points) : t = Array.isArray(r[0]) ? r[0] : r;
            var s = new $b(t);
            return s.closeStroke = a,
            this.drawShape(s),
            this
        }
        ,
        e.prototype.drawShape = function(t) {
            return this._holeMode ? this._geometry.drawHole(t, this._matrix) : this._geometry.drawShape(t, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix),
            this
        }
        ,
        e.prototype.clear = function() {
            return this._geometry.clear(),
            this._lineStyle.reset(),
            this._fillStyle.reset(),
            this._boundsID++,
            this._matrix = null,
            this._holeMode = !1,
            this.currentPath = null,
            this
        }
        ,
        e.prototype.isFastRect = function() {
            var t = this._geometry.graphicsData;
            return 1 === t.length && t[0].shape.type === fa.RECT && !(t[0].lineStyle.visible && t[0].lineStyle.width)
        }
        ,
        e.prototype._render = function(t) {
            this.finishPoly();
            var e = this._geometry
              , r = t.context.supports.uint32Indices;
            e.updateBatches(r),
            e.batchable ? (this.batchDirty !== e.batchDirty && this._populateBatches(),
            this._renderBatched(t)) : (t.batch.flush(),
            this._renderDirect(t))
        }
        ,
        e.prototype._populateBatches = function() {
            var t = this._geometry
              , e = this.blendMode
              , r = t.batches.length;
            this.batchTint = -1,
            this._transformID = -1,
            this.batchDirty = t.batchDirty,
            this.batches.length = r,
            this.vertexData = new Float32Array(t.points);
            for (var i = 0; i < r; i++) {
                var a = t.batches[i]
                  , n = a.style.color
                  , s = new Float32Array(this.vertexData.buffer,4 * a.attribStart * 2,2 * a.attribSize)
                  , h = new Float32Array(t.uvsFloat32.buffer,4 * a.attribStart * 2,2 * a.attribSize)
                  , o = {
                    vertexData: s,
                    blendMode: e,
                    indices: new Uint16Array(t.indicesUint16.buffer,2 * a.start,a.size),
                    uvs: h,
                    _batchRGB: Xb(n),
                    _tintRGB: n,
                    _texture: a.style.texture,
                    alpha: a.style.alpha,
                    worldAlpha: 1
                };
                this.batches[i] = o
            }
        }
        ,
        e.prototype._renderBatched = function(t) {
            if (this.batches.length) {
                t.batch.setObjectRenderer(t.plugins[this.pluginName]),
                this.calculateVertices(),
                this.calculateTints();
                for (var e = 0, r = this.batches.length; e < r; e++) {
                    var i = this.batches[e];
                    i.worldAlpha = this.worldAlpha * i.alpha,
                    t.plugins[this.pluginName].render(i)
                }
            }
        }
        ,
        e.prototype._renderDirect = function(t) {
            var e = this._resolveDirectShader(t)
              , r = this._geometry
              , i = this.tint
              , a = this.worldAlpha
              , n = e.uniforms
              , s = r.drawCalls;
            n.translationMatrix = this.transform.worldTransform,
            n.tint[0] = (i >> 16 & 255) / 255 * a,
            n.tint[1] = (i >> 8 & 255) / 255 * a,
            n.tint[2] = (255 & i) / 255 * a,
            n.tint[3] = a,
            t.shader.bind(e),
            t.geometry.bind(r, e),
            t.state.set(this.state);
            for (var h = 0, o = s.length; h < o; h++)
                this._renderDrawCallDirect(t, r.drawCalls[h])
        }
        ,
        e.prototype._renderDrawCallDirect = function(t, e) {
            for (var r = e.texArray, i = e.type, a = e.size, n = e.start, s = r.count, h = 0; h < s; h++)
                t.texture.bind(r.elements[h], h);
            t.geometry.draw(i, a, n)
        }
        ,
        e.prototype._resolveDirectShader = function(t) {
            var e = this.shader
              , r = this.pluginName;
            if (!e) {
                if (!Dc[r]) {
                    for (var i = t.plugins.batch.MAX_TEXTURES, a = new Int32Array(i), n = 0; n < i; n++)
                        a[n] = n;
                    var s = {
                        tint: new Float32Array([1, 1, 1, 1]),
                        translationMatrix: new la,
                        default: Pa.from({
                            uSamplers: a
                        }, !0)
                    }
                      , h = t.plugins[r]._shader.program;
                    Dc[r] = new oc(h,s)
                }
                e = Dc[r]
            }
            return e
        }
        ,
        e.prototype._calculateBounds = function() {
            this.finishPoly();
            var t = this._geometry;
            if (t.graphicsData.length) {
                var e = t.bounds
                  , r = e.minX
                  , i = e.minY
                  , a = e.maxX
                  , n = e.maxY;
                this._bounds.addFrame(this.transform, r, i, a, n)
            }
        }
        ,
        e.prototype.containsPoint = function(t) {
            return this.worldTransform.applyInverse(t, e._TEMP_POINT),
            this._geometry.containsPoint(e._TEMP_POINT)
        }
        ,
        e.prototype.calculateTints = function() {
            if (this.batchTint !== this.tint) {
                this.batchTint = this.tint;
                for (var t = Xb(this.tint, ih), e = 0; e < this.batches.length; e++) {
                    var r = this.batches[e]
                      , i = r._batchRGB
                      , a = (t[0] * i[0] * 255 << 16) + (t[1] * i[1] * 255 << 8) + (0 | t[2] * i[2] * 255);
                    r._tintRGB = (a >> 16) + (65280 & a) + ((255 & a) << 16)
                }
            }
        }
        ,
        e.prototype.calculateVertices = function() {
            var t = this.transform._worldID;
            if (this._transformID !== t) {
                this._transformID = t;
                for (var e = this.transform.worldTransform, r = e.a, i = e.b, a = e.c, n = e.d, s = e.tx, h = e.ty, o = this._geometry.points, l = this.vertexData, $ = 0, u = 0; u < o.length; u += 2) {
                    var p = o[u]
                      , c = o[u + 1];
                    l[$++] = r * p + a * c + s,
                    l[$++] = n * c + i * p + h
                }
            }
        }
        ,
        e.prototype.closePath = function() {
            var t = this.currentPath;
            return t && (t.closeStroke = !0),
            this
        }
        ,
        e.prototype.setMatrix = function(t) {
            return this._matrix = t,
            this
        }
        ,
        e.prototype.beginHole = function() {
            return this.finishPoly(),
            this._holeMode = !0,
            this
        }
        ,
        e.prototype.endHole = function() {
            return this.finishPoly(),
            this._holeMode = !1,
            this
        }
        ,
        e.prototype.destroy = function(e) {
            this._geometry.refCount--,
            0 === this._geometry.refCount && this._geometry.dispose(),
            this._matrix = null,
            this.currentPath = null,
            this._lineStyle.destroy(),
            this._lineStyle = null,
            this._fillStyle.destroy(),
            this._fillStyle = null,
            this._geometry = null,
            this.shader = null,
            this.vertexData = null,
            this.batches.length = 0,
            this.batches = null,
            t.prototype.destroy.call(this, e)
        }
        ,
        e._TEMP_POINT = new ra,
        e
    }(Ac);
    var kh = Nb && Nb.__extends || function() {
        var t = function(i, r) {
            return (t = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, i) {
                t.__proto__ = i
            }
            || function(t, i) {
                for (var r in i)
                    Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
            }
            )(i, r)
        };
        return function(i, r) {
            if ("function" != typeof r && null !== r)
                throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
            function o() {
                this.constructor = i
            }
            t(i, r),
            i.prototype = null === r ? Object.create(r) : (o.prototype = r.prototype,
            new o)
        }
    }()
      , lh = window.PIXI ? window.PIXI.Graphics : jh
      , le = function(t) {
        function i(i, r, o) {
            void 0 === r && (r = {});
            var s = t.call(this) || this;
            s.graphicsOptions = {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                fill: 0,
                lineWidth: 1,
                lineColor: 16777215
            },
            s.graphicsOptions = Object.assign(s.graphicsOptions, i),
            s.physicsOptions = r;
            var p = s.graphicsOptions.width / 2
              , n = s.graphicsOptions.height / 2;
            return s.pivot.x = p,
            s.pivot.y = n,
            s._update = o,
            s.graphicsOptions.radius ? s._body = ha.Bodies.circle(s.graphicsOptions.x, s.graphicsOptions.y, s.graphicsOptions.radius, s.physicsOptions) : s._body = ha.Bodies.rectangle(s.graphicsOptions.x + p, s.graphicsOptions.y + n, s.graphicsOptions.width, s.graphicsOptions.height, s.physicsOptions),
            s
        }
        return kh(i, t),
        Object.defineProperty(i.prototype, "body", {
            get: function() {
                return this._body
            },
            enumerable: !1,
            configurable: !0
        }),
        i.prototype.update = function() {
            this._update({
                position: this._body.position,
                rotation: this._body.angle
            })
        }
        ,
        i
    }(lh);
    Nb.PhysicsGraphics = le;
    var me = ma && ma.__assign || function() {
        return (me = Object.assign || function(r) {
            for (var n, e = 1, t = arguments.length; e < t; e++)
                for (var a in n = arguments[e])
                    Object.prototype.hasOwnProperty.call(n, a) && (r[a] = n[a]);
            return r
        }
        ).apply(this, arguments)
    }
      , ne = ma && ma.__spreadArray || function(r, n) {
        for (var e = 0, t = n.length, a = r.length; e < t; e++,
        a++)
            r[a] = n[e];
        return r
    }
    ;
    function oe(r, n) {
        return window[n] ? Promise.resolve(window[n]) : new Promise(function(e, t) {
            var a = document.createElement("script");
            a.onload = function() {
                e(n && window[n])
            }
            ,
            a.onerror = function(r) {
                a.onload = null,
                a.onerror = null,
                document.body.removeChild(a),
                t(r)
            }
            ,
            a.src = r,
            a.async = !0,
            document.body.appendChild(a)
        }
        )
    }
    ma.loadScript = oe;
    var mh = function(r) {
        r.App && (r.App.destroy({
            removeView: !0
        }),
        window.PIXI.loader.destroy(),
        r.App = null,
        r.timerMap.forEach(function(r, n) {
            window.clearInterval(r),
            window.clearTimeout(r)
        }),
        r.timerMap.clear(),
        r.soundMap = {},
        r.music.pause(),
        r.music = null,
        r.music = new Audio,
        Object.keys(r.windowListener).map(function(n) {
            var e = n.replace("Listener", "");
            window.removeEventListener(e, r.windowListener[n])
        }))
    };
    ma.resetPygameZero = mh;
    var Ec = {
        aqua: "#00FFFF",
        black: "#000000",
        blue: "#0000FF",
        fuchsia: "#FF00FF",
        gray: "#808080",
        green: "#008000",
        lime: "#00FF00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#FFA500",
        purple: "#800080",
        red: "#FF0000",
        silver: "#C0C0C0",
        teal: "#008080",
        white: "#FFFFFF",
        yellow: "#FFFF00"
    };
    ma.ColorNameMap = Ec;
    var nh = function(r) {
        Math.round(r.view.width / 2),
        Math.round(r.view.height / 2);
        var n = {
            transX: function(r, n) {
                return void 0 === n && (n = !1),
                r
            },
            transY: function(r, n) {
                return void 0 === n && (n = !1),
                r
            },
            transPos: function(r, e) {
                return void 0 === e && (e = !1),
                r ? [n.transX(r[0], e), n.transY(r[1], e)] : r
            },
            transColor: function(r) {
                return Array.isArray(r) ? window.PIXI.utils.rgb2hex(r) : r.match("#") ? window.PIXI.utils.string2hex(r) : Ec[r] ? window.PIXI.utils.string2hex(Ec[r]) : 16777215
            }
        };
        return n
    };
    function oh(r, n) {
        Array.isArray(n) && (n.x = n[0],
        n.y = n[1],
        n.width = 0,
        n.height = 0),
        r.centerX = r.x + r.width / 2,
        r.centerY = r.y + r.height / 2,
        n.centerX = n.x + n.width / 2,
        n.centerY = n.y + n.height / 2,
        r.halfWidth = r.width / 2,
        r.halfHeight = r.height / 2,
        n.halfWidth = n.width / 2,
        n.halfHeight = n.height / 2;
        var e = r.centerX - n.centerX
          , t = r.centerY - n.centerY
          , a = r.halfWidth + n.halfWidth
          , i = r.halfHeight + n.halfHeight;
        return Math.abs(e) < a && Math.abs(t) < i
    }
    ma.translateTools = nh,
    ma.hitTestRectangle = oh;
    var Fc = {};
    function ph(r) {
        function n(r) {
            var n;
            return Array.isArray(r) && (n = ne([], r),
            r = n[0]),
            new Promise(function(e, t) {
                window.PIXI.utils.TextureCache[r] ? e(window.PIXI.utils.TextureCache[r]) : window.PIXI.loader.add(n || r).load(function() {
                    var n = window.PIXI.loader.resources[r].texture;
                    e(n)
                })
            }
            )
        }
        return /\.json$/.test(r) ? Fc[r] ? n(Fc[r]) : fetch(r).then(function(r) {
            return r.json()
        }).then(function(e) {
            var t = r.replace("index.json", "")
              , a = e.map(function(r) {
                return t + r
            });
            return Fc[r] = a,
            n(a)
        }) : n(r)
    }
    ma.textureRecources = ph;
    var ga = window.Sk
      , qh = function(r) {
        return ga.misceval.callsimOrSuspend(ga.builtins.property, new ga.builtin.func(r), new ga.builtin.func(function() {}
        ))
    };
    function pe(r, n) {
        var e = function(e) {
            for (var t = [], a = 1; a < arguments.length; a++)
                t[a - 1] = arguments[a];
            n || (t = new ga.builtins.tuple(t));
            var i = new ga.builtin.dict(e);
            return r(t, i)
        };
        return e.co_kwargs = !0,
        e
    }
    ma.defineGetter = qh,
    ma.genkwaFunc = pe;
    var qe = function(r, n) {
        return ga.misceval.callsimOrSuspend(ga.builtins.property, new ga.builtin.func(function(e) {
            return "function" == typeof r ? r(e) : ga.ffi.remapToPy(e[r][n])
        }
        ), new ga.builtin.func(function(e, t) {
            "function" == typeof n ? n(e, t) : e[r][n] = t.v
        }
        ))
    };
    ma.defineProperty = qe;
    var rh = function(r, n, e, t) {
        return new ga.builtin.func(function(n) {
            for (var a = [], i = 1; i < arguments.length; i++)
                a[i - 1] = arguments[i];
            return ga.misceval.callsimOrSuspend(ga.misceval.buildClass(r, function(r, i) {
                i.__init__ = new ga.builtin.func(function(r) {
                    r.graph = new window.PIXI.Graphics;
                    var e = r.graph;
                    t.apply(void 0, ne([n, e], a));
                    var i = r.graph.width / 2
                      , o = r.graph.height / 2
                      , $ = r.graph.graphicsData[0].shape.x
                      , s = r.graph.graphicsData[0].shape.y;
                    r.graph.isCircle ? (r.graph.pivot.set(2 * i, 2 * o),
                    r.graph.position.set(2 * i, 2 * i)) : (r.graph.pivot.set($ + i, s + o),
                    r.graph.position.set($ + i, s + o))
                }
                ),
                i.rotation = qe(function(r) {
                    return ga.ffi.remapToPy(r.rotation)
                }, function(r, n) {
                    r.physicGraphics ? ha.Body.setAngle(r.physicGraphics._body, n.v) : r.graph.rotation = n.v
                }),
                i.physicsImpostor = new ga.builtin.func(pe(function(r, n) {
                    n = ga.ffi.remapToJs(n);
                    var t = r[0]
                      , a = r[1]
                      , i = r[2];
                    a = ga.ffi.remapToJs(a || n.is_static) || !1;
                    var o = !1;
                    i = ga.ffi.remapToJs(i || n.physicsOptions) || {};
                    var $ = t.graph
                      , s = $.graphicsData
                      , p = $.width
                      , c = $.height
                      , u = $.line
                      , l = $.rotation
                      , h = {};
                    t.graph.isCircle && (o = !0,
                    h.radius = s[0].shape.radius),
                    t.graph.isFilled && (h.fill = s[0].fillStyle.color),
                    t.physicGraphics = new le(me({
                        x: s[0].shape.x,
                        y: s[0].shape.y,
                        width: p,
                        height: c,
                        lineWidth: u.width,
                        lineColor: u.color
                    }, h),me({
                        isCircle: o,
                        isStatic: a
                    }, i),function(r) {
                        var n = r.position
                          , e = r.rotation;
                        t.graph.position = n,
                        t.graph.rotation = e
                    }
                    ),
                    ha.Body.setAngle(t.physicGraphics._body, l),
                    e.addToWorld(t.physicGraphics)
                }, !0))
            }))
        }
        )
    };
    ma.upgradeGraphics = rh;
    var sh = {};
    sh = {
        scripts: {
            start: "parcel build src/main.ts && parcel src/pygame-zero.ts -d ./dist",
            server: "node server.js",
            build: "parcel build src/main.ts --experimental-scope-hoisting  --no-source-maps && parcel build src/pygame-zero.ts --no-source-maps"
        },
        name: "skulpt-pygame-zero",
        description: "This module provides most of the functions of pygame-zero for skulpt",
        version: "0.3.4-alpha2",
        main: "dist/main.js",
        files: ["lib", "dist", "*.d.ts", "README.md", "README-zh.md"],
        devDependencies: {
            "alphanum-sort": "^1.0.2",
            "ansi-styles": "^3.2.1",
            argparse: "^1.0.10",
            boolbase: "^1.0.0",
            browserslist: "^4.16.3",
            "call-bind": "^1.0.2",
            "caller-callsite": "^2.0.0",
            "caller-path": "^2.0.0",
            callsites: "^2.0.0",
            "caniuse-api": "^3.0.0",
            "caniuse-lite": "^1.0.30001194",
            chalk: "^2.4.2",
            coa: "^2.0.2",
            color: "^3.1.3",
            "color-convert": "^1.9.3",
            "color-name": "^1.1.3",
            "color-string": "^1.5.4",
            colorette: "^1.2.2",
            cosmiconfig: "^5.2.1",
            "css-color-names": "^0.0.4",
            "css-declaration-sorter": "^4.0.1",
            "css-select": "^2.1.0",
            "css-select-base-adapter": "^0.1.1",
            "css-tree": "^1.0.0-alpha.37",
            "css-what": "^3.4.2",
            cssesc: "^3.0.0",
            "cssnano-preset-default": "^4.0.7",
            "cssnano-util-get-arguments": "^4.0.0",
            "cssnano-util-get-match": "^4.0.0",
            "cssnano-util-raw-cache": "^4.0.1",
            "cssnano-util-same-parent": "^4.0.1",
            csso: "^4.2.0",
            "define-properties": "^1.1.3",
            "dom-serializer": "^0.2.2",
            domelementtype: "^1.3.1",
            domutils: "^1.7.0",
            "dot-prop": "^5.3.0",
            "electron-to-chromium": "^1.3.678",
            entities: "^2.2.0",
            "error-ex": "^1.3.2",
            "es-abstract": "^1.18.0-next.3",
            "es-to-primitive": "^1.2.1",
            escalade: "^3.1.1",
            "escape-string-regexp": "^1.0.5",
            esprima: "^4.0.1",
            "function-bind": "^1.1.1",
            "get-intrinsic": "^1.1.1",
            has: "^1.0.3",
            "has-bigints": "^1.0.1",
            "has-flag": "^3.0.0",
            "has-symbols": "^1.0.2",
            "hex-color-regex": "^1.1.0",
            "hsl-regex": "^1.0.0",
            "hsla-regex": "^1.0.0",
            "html-comment-regex": "^1.1.2",
            "import-fresh": "^2.0.0",
            "indexes-of": "^1.0.1",
            "is-absolute-url": "^2.1.0",
            "is-arrayish": "^0.2.1",
            "is-bigint": "^1.0.1",
            "is-boolean-object": "^1.1.0",
            "is-callable": "^1.2.3",
            "is-color-stop": "^1.1.0",
            "is-date-object": "^1.0.2",
            "is-directory": "^0.3.1",
            "is-negative-zero": "^2.0.1",
            "is-number-object": "^1.0.4",
            "is-obj": "^2.0.0",
            "is-regex": "^1.1.2",
            "is-resolvable": "^1.1.0",
            "is-string": "^1.0.5",
            "is-svg": "^3.0.0",
            "is-symbol": "^1.0.3",
            "js-yaml": "^3.14.1",
            "json-parse-better-errors": "^1.0.2",
            "lodash.memoize": "^4.1.2",
            "lodash.uniq": "^4.5.0",
            "matter-js": "^0.16.1",
            "mdn-data": "^2.0.4",
            minimist: "^1.2.5",
            mkdirp: "^0.5.5",
            "node-releases": "^1.1.71",
            "normalize-url": "^3.3.0",
            "nth-check": "^1.0.2",
            "object-inspect": "^1.9.0",
            "object-keys": "^1.1.1",
            "object.assign": "^4.1.2",
            "object.getownpropertydescriptors": "^2.1.2",
            "object.values": "^1.1.3",
            "parse-json": "^4.0.0",
            postcss: "^7.0.35",
            "postcss-calc": "^7.0.5",
            "postcss-colormin": "^4.0.3",
            "postcss-convert-values": "^4.0.1",
            "postcss-discard-comments": "^4.0.2",
            "postcss-discard-duplicates": "^4.0.2",
            "postcss-discard-empty": "^4.0.1",
            "postcss-discard-overridden": "^4.0.1",
            "postcss-merge-longhand": "^4.0.11",
            "postcss-merge-rules": "^4.0.3",
            "postcss-minify-font-values": "^4.0.2",
            "postcss-minify-gradients": "^4.0.2",
            "postcss-minify-params": "^4.0.2",
            "postcss-minify-selectors": "^4.0.2",
            "postcss-normalize-charset": "^4.0.1",
            "postcss-normalize-display-values": "^4.0.2",
            "postcss-normalize-positions": "^4.0.2",
            "postcss-normalize-repeat-style": "^4.0.2",
            "postcss-normalize-string": "^4.0.2",
            "postcss-normalize-timing-functions": "^4.0.2",
            "postcss-normalize-unicode": "^4.0.1",
            "postcss-normalize-url": "^4.0.1",
            "postcss-normalize-whitespace": "^4.0.2",
            "postcss-ordered-values": "^4.1.2",
            "postcss-reduce-initial": "^4.0.3",
            "postcss-reduce-transforms": "^4.0.2",
            "postcss-selector-parser": "^3.1.2",
            "postcss-svgo": "^4.0.2",
            "postcss-unique-selectors": "^4.0.1",
            "postcss-value-parser": "^3.3.1",
            q: "^1.5.1",
            "resolve-from": "^3.0.0",
            "rgb-regex": "^1.0.1",
            "rgba-regex": "^1.0.0",
            sax: "^1.2.4",
            "simple-swizzle": "^0.2.2",
            "source-map": "^0.6.1",
            "sprintf-js": "^1.0.3",
            stable: "^0.1.8",
            "string.prototype.trimend": "^1.0.4",
            "string.prototype.trimstart": "^1.0.4",
            stylehacks: "^4.0.3",
            "supports-color": "^6.1.0",
            svgo: "^1.3.2",
            timsort: "^0.3.0",
            typescript: "^4.2.3",
            "unbox-primitive": "^1.0.0",
            uniq: "^1.0.1",
            uniqs: "^2.0.0",
            unquote: "^1.1.1",
            "util-deprecate": "^1.0.2",
            "util.promisify": "^1.0.1",
            vendors: "^1.0.4",
            "which-boxed-primitive": "^1.0.2"
        },
        repository: {
            type: "git",
            url: "git+https://github.com/lipten/skulpt-pygame-zero.git"
        },
        keywords: [],
        author: "",
        license: "ISC",
        bugs: {
            url: "https://github.com/lipten/skulpt-pygame-zero/issues"
        },
        homepage: "https://github.com/lipten/skulpt-pygame-zero#readme",
        _id: "skulpt-pygame-zero@0.2.3-alpha3",
        dependencies: {
            "@pixi/graphics": "^6.0.1"
        }
    };
    var th = Kb(sh);
    var uh = window.Sk
      , re = {
        // "./pgzrun/__init__.js": "https://cdn.jsdelivr.net/npm/skulpt-pygame-zero@" + th.d.version + "/dist/pygame-zero.js"
        "./pgzrun/__init__.js": "https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@main/src/pgzhelper/pygamezero.js"
    }
      , se = {
        usePyGameZero: function(e) {
            var n = this;
            return function(t) {
                return n.matchModelName(t) ? n.load(t) : e.call(this, t)
            }
        },
        load: function(e) {
            return uh.misceval.promiseToSuspension(new Promise(function(n, t) {
                oe("https://cdn.bootcdn.net/ajax/libs/pixi.js/5.3.4/pixi.min.js", "PIXI").then(function() {
                    fetch(re[e]).then(function(e) {
                        window.PIXI.utils.skipHello();
                        var t = e.text();
                        n(t)
                    })
                })
            }
            ))
        },
        matchModelName: function(e) {
            return Object.keys(re).includes(e)
        },
        setContainer: function(e) {
            this.container = e
        },
        reset: function() {
            this._handleReset()
        },
        _handleReset: function() {},
        _onRunning: function(e) {
            this.app = e
        },
        _moduleCache: {
            App: null,
            timerMap: new Map,
            soundMap: {},
            music: new Audio,
            windowListener: {}
        }
    };
    Lb.PyGameZero = se,
    window.PyGameZero = se;
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = Lb
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return Lb
        })
    }
}
)();
