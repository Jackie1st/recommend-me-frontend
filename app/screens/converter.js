export default 

!function(n, t) {
    "function" == typeof require && "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(function() {
        return t()
    }) : n.javascriptStringify = t()
}(this, function() {
    function n(n) {
        var t = c[n];
        return t || "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
    }

    function t(n) {
        return !a[n] && p.test(n)
    }

    function e(n) {
        return "Function(" + u("return this;") + ")()"
    }

    function r(n) {
        for (var e = "", r = 0; r < n.length; r++) e += t(n[r]) ? "." + n[r] : "[" + u(n[r]) + "]";
        return e
    }

    function i(n, t, e) {
        var r = n.map(function(n, r) {
            var i = e(n, r);
            return void 0 === i ? String(i) : t + i.split("\n").join("\n" + t)
        }).join(t ? ",\n" : ",");
        return t && r ? "[\n" + r + "\n]" : "[" + r + "]"
    }

    function o(n, e, r) {
        var i = Object.keys(n).reduce(function(i, o) {
            var f = r(n[o], o);
            return void 0 === f ? i : (o = t(o) ? o : u(o), f = String(f).split("\n").join("\n" + e), i.push(e + o + ":" + (e ? " " : "") + f), i)
        }, []).join(e ? ",\n" : ",");
        return e && i ? "{\n" + i + "\n}" : "{" + i + "}"
    }

    function u(n, t, e) {
        if (Object(n) !== n) return l[typeof n](n, t, e);
        if ("function" == typeof Buffer && Buffer.isBuffer(n)) return "new Buffer(" + e(n.toString()) + ")";
        var r = s[Object.prototype.toString.call(n)];
        return r ? r(n, t, e) : void 0
    }
    var f = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        c = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\"
        },
        a = {};
    "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" ").map(function(n) {
        a[n] = !0
    });
    var p = /^[A-Za-z_$][A-Za-z0-9_$]*$/,
        s = {
            "[object Array]": i,
            "[object Object]": o,
            "[object Date]": function(n) {
                return "new Date(" + n.getTime() + ")"
            },
            "[object String]": function(n) {
                return "new String(" + u(n.toString()) + ")"
            },
            "[object Number]": function(n) {
                return "new Number(" + n + ")"
            },
            "[object Boolean]": function(n) {
                return "new Boolean(" + n + ")"
            },
            "[object Uint8Array]": function(n, t) {
                return "new Uint8Array(" + i(n) + ")"
            },
            "[object RegExp]": String,
            "[object Function]": String,
            "[object global]": e,
            "[object Window]": e
        },
        l = {
            string: function(t) {
                return "'" + t.replace(f, n) + "'"
            },
            number: String,
            object: String,
            boolean: String,
            symbol: String,
            undefined: String
        };
    return function(n, t, e, i) {
        function o(n, t) {
            if (!a || void 0 !== n) {
                s.push(t);
                var e = v(n, u);
                return s.pop(), e
            }
        }
        i = i || {}, "string" != typeof e && (e = new Array(Math.max(0, 0 | e) + 1).join(" "));
        var f = Number(i.maxDepth) || 100,
            c = !!i.references,
            a = !!i.skipUndefinedProperties,
            p = Number(i.maxValues) || 1e5,
            s = [],
            l = [],
            b = [],
            g = [],
            d = [],
            v = c ? function(n, t) {
                if (n && ("object" == typeof n || "function" == typeof n)) {
                    var r = b.indexOf(n);
                    if (r > -1) return void d.push(s.slice(), g[r]);
                    b.push(n), g.push(s.slice())
                }
                if (!(s.length > f || p-- <= 0)) return t(n, e, o)
            } : function(n, t) {
                var r = l.indexOf(n);
                if (!(r > -1 || s.length > f || p-- <= 0)) {
                    l.push(n);
                    var n = t(n, e, o);
                    return l.pop(), n
                }
            };
        if ("function" == typeof t) {
            var h = v;
            v = function(n, e) {
                return h(n, function(n, r, i) {
                    return t(n, r, function(n) {
                        return e(n, r, i)
                    })
                })
            }
        }
        var j = v(n, u);
        if (d.length) {
            for (var y = e ? "\n" : "", m = e ? " = " : "=", x = ";" + y, h = e ? "(function () {" : "(function(){", S = "}())", w = ["var x" + m + j], A = 0; A < d.length; A += 2) w.push("x" + r(d[A]) + m + "x" + r(d[A + 1]));
            return w.push("return x"), h + y + w.join(x) + x + S
        }
        return j
    }
});


// console.log(({
//   "sender":{
//     "id":"USER_ID"
//   },
//   "recipient":{
//     "id":"PAGE_ID"
//   },
//   "timestamp":1458692752478,
//   "message":{
//     "mid":"mid.1457764197618:41d102a3e1ae206a38",
//     "seq":73,
//     "text":"hello, world!",
//     "quick_reply": {
//       "payload": "DEVELOPER_DEFINED_PAYLOAD"
//     }
//   }
// }))