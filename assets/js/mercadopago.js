(() => {
    var e, t = {
        975: (e, t, r) => {
            "use strict";
            var i = r(606);

            function n(e) {
                if ("string" != typeof e) throw new TypeError("Path must be a string. Received " + JSON.stringify(e))
            }

            function o(e, t) {
                for (var r, i = "", n = 0, o = -1, a = 0, s = 0; s <= e.length; ++s) {
                    if (s < e.length) r = e.charCodeAt(s); else {
                        if (47 === r) break;
                        r = 47
                    }
                    if (47 === r) {
                        if (o === s - 1 || 1 === a) ; else if (o !== s - 1 && 2 === a) {
                            if (i.length < 2 || 2 !== n || 46 !== i.charCodeAt(i.length - 1) || 46 !== i.charCodeAt(i.length - 2)) if (i.length > 2) {
                                var c = i.lastIndexOf("/");
                                if (c !== i.length - 1) {
                                    -1 === c ? (i = "", n = 0) : n = (i = i.slice(0, c)).length - 1 - i.lastIndexOf("/"), o = s, a = 0;
                                    continue
                                }
                            } else if (2 === i.length || 1 === i.length) {
                                i = "", n = 0, o = s, a = 0;
                                continue
                            }
                            t && (i.length > 0 ? i += "/.." : i = "..", n = 2)
                        } else i.length > 0 ? i += "/" + e.slice(o + 1, s) : i = e.slice(o + 1, s), n = s - o - 1;
                        o = s, a = 0
                    } else 46 === r && -1 !== a ? ++a : a = -1
                }
                return i
            }

            var a = {
                resolve: function () {
                    for (var e, t = "", r = !1, a = arguments.length - 1; a >= -1 && !r; a--) {
                        var s;
                        a >= 0 ? s = arguments[a] : (void 0 === e && (e = i.cwd()), s = e), n(s), 0 !== s.length && (t = s + "/" + t, r = 47 === s.charCodeAt(0))
                    }
                    return t = o(t, !r), r ? t.length > 0 ? "/" + t : "/" : t.length > 0 ? t : "."
                }, normalize: function (e) {
                    if (n(e), 0 === e.length) return ".";
                    var t = 47 === e.charCodeAt(0), r = 47 === e.charCodeAt(e.length - 1);
                    return 0 !== (e = o(e, !t)).length || t || (e = "."), e.length > 0 && r && (e += "/"), t ? "/" + e : e
                }, isAbsolute: function (e) {
                    return n(e), e.length > 0 && 47 === e.charCodeAt(0)
                }, join: function () {
                    if (0 === arguments.length) return ".";
                    for (var e, t = 0; t < arguments.length; ++t) {
                        var r = arguments[t];
                        n(r), r.length > 0 && (void 0 === e ? e = r : e += "/" + r)
                    }
                    return void 0 === e ? "." : a.normalize(e)
                }, relative: function (e, t) {
                    if (n(e), n(t), e === t) return "";
                    if ((e = a.resolve(e)) === (t = a.resolve(t))) return "";
                    for (var r = 1; r < e.length && 47 === e.charCodeAt(r); ++r) ;
                    for (var i = e.length, o = i - r, s = 1; s < t.length && 47 === t.charCodeAt(s); ++s) ;
                    for (var c = t.length - s, d = o < c ? o : c, l = -1, u = 0; u <= d; ++u) {
                        if (u === d) {
                            if (c > d) {
                                if (47 === t.charCodeAt(s + u)) return t.slice(s + u + 1);
                                if (0 === u) return t.slice(s + u)
                            } else o > d && (47 === e.charCodeAt(r + u) ? l = u : 0 === u && (l = 0));
                            break
                        }
                        var p = e.charCodeAt(r + u);
                        if (p !== t.charCodeAt(s + u)) break;
                        47 === p && (l = u)
                    }
                    var h = "";
                    for (u = r + l + 1; u <= i; ++u) u !== i && 47 !== e.charCodeAt(u) || (0 === h.length ? h += ".." : h += "/..");
                    return h.length > 0 ? h + t.slice(s + l) : (s += l, 47 === t.charCodeAt(s) && ++s, t.slice(s))
                }, _makeLong: function (e) {
                    return e
                }, dirname: function (e) {
                    if (n(e), 0 === e.length) return ".";
                    for (var t = e.charCodeAt(0), r = 47 === t, i = -1, o = !0, a = e.length - 1; a >= 1; --a) if (47 === (t = e.charCodeAt(a))) {
                        if (!o) {
                            i = a;
                            break
                        }
                    } else o = !1;
                    return -1 === i ? r ? "/" : "." : r && 1 === i ? "//" : e.slice(0, i)
                }, basename: function (e, t) {
                    if (void 0 !== t && "string" != typeof t) throw new TypeError('"ext" argument must be a string');
                    n(e);
                    var r, i = 0, o = -1, a = !0;
                    if (void 0 !== t && t.length > 0 && t.length <= e.length) {
                        if (t.length === e.length && t === e) return "";
                        var s = t.length - 1, c = -1;
                        for (r = e.length - 1; r >= 0; --r) {
                            var d = e.charCodeAt(r);
                            if (47 === d) {
                                if (!a) {
                                    i = r + 1;
                                    break
                                }
                            } else -1 === c && (a = !1, c = r + 1), s >= 0 && (d === t.charCodeAt(s) ? -1 == --s && (o = r) : (s = -1, o = c))
                        }
                        return i === o ? o = c : -1 === o && (o = e.length), e.slice(i, o)
                    }
                    for (r = e.length - 1; r >= 0; --r) if (47 === e.charCodeAt(r)) {
                        if (!a) {
                            i = r + 1;
                            break
                        }
                    } else -1 === o && (a = !1, o = r + 1);
                    return -1 === o ? "" : e.slice(i, o)
                }, extname: function (e) {
                    n(e);
                    for (var t = -1, r = 0, i = -1, o = !0, a = 0, s = e.length - 1; s >= 0; --s) {
                        var c = e.charCodeAt(s);
                        if (47 !== c) -1 === i && (o = !1, i = s + 1), 46 === c ? -1 === t ? t = s : 1 !== a && (a = 1) : -1 !== t && (a = -1); else if (!o) {
                            r = s + 1;
                            break
                        }
                    }
                    return -1 === t || -1 === i || 0 === a || 1 === a && t === i - 1 && t === r + 1 ? "" : e.slice(t, i)
                }, format: function (e) {
                    if (null === e || "object" != typeof e) throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
                    return function (e, t) {
                        var r = t.dir || t.root, i = t.base || (t.name || "") + (t.ext || "");
                        return r ? r === t.root ? r + i : r + "/" + i : i
                    }(0, e)
                }, parse: function (e) {
                    n(e);
                    var t = {root: "", dir: "", base: "", ext: "", name: ""};
                    if (0 === e.length) return t;
                    var r, i = e.charCodeAt(0), o = 47 === i;
                    o ? (t.root = "/", r = 1) : r = 0;
                    for (var a = -1, s = 0, c = -1, d = !0, l = e.length - 1, u = 0; l >= r; --l) if (47 !== (i = e.charCodeAt(l))) -1 === c && (d = !1, c = l + 1), 46 === i ? -1 === a ? a = l : 1 !== u && (u = 1) : -1 !== a && (u = -1); else if (!d) {
                        s = l + 1;
                        break
                    }
                    return -1 === a || -1 === c || 0 === u || 1 === u && a === c - 1 && a === s + 1 ? -1 !== c && (t.base = t.name = 0 === s && o ? e.slice(1, c) : e.slice(s, c)) : (0 === s && o ? (t.name = e.slice(1, a), t.base = e.slice(1, c)) : (t.name = e.slice(s, a), t.base = e.slice(s, c)), t.ext = e.slice(a, c)), s > 0 ? t.dir = e.slice(0, s - 1) : o && (t.dir = "/"), t
                }, sep: "/", delimiter: ":", win32: null, posix: null
            };
            a.posix = a, e.exports = a
        }, 606: e => {
            var t, r, i = e.exports = {};

            function n() {
                throw new Error("setTimeout has not been defined")
            }

            function o() {
                throw new Error("clearTimeout has not been defined")
            }

            function a(e) {
                if (t === setTimeout) return setTimeout(e, 0);
                if ((t === n || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
                try {
                    return t(e, 0)
                } catch (r) {
                    try {
                        return t.call(null, e, 0)
                    } catch (r) {
                        return t.call(this, e, 0)
                    }
                }
            }

            !function () {
                try {
                    t = "function" == typeof setTimeout ? setTimeout : n
                } catch (e) {
                    t = n
                }
                try {
                    r = "function" == typeof clearTimeout ? clearTimeout : o
                } catch (e) {
                    r = o
                }
            }();
            var s, c = [], d = !1, l = -1;

            function u() {
                d && s && (d = !1, s.length ? c = s.concat(c) : l = -1, c.length && p())
            }

            function p() {
                if (!d) {
                    var e = a(u);
                    d = !0;
                    for (var t = c.length; t;) {
                        for (s = c, c = []; ++l < t;) s && s[l].run();
                        l = -1, t = c.length
                    }
                    s = null, d = !1, function (e) {
                        if (r === clearTimeout) return clearTimeout(e);
                        if ((r === o || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                        try {
                            return r(e)
                        } catch (t) {
                            try {
                                return r.call(null, e)
                            } catch (t) {
                                return r.call(this, e)
                            }
                        }
                    }(e)
                }
            }

            function h(e, t) {
                this.fun = e, this.array = t
            }

            function m() {
            }

            i.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                c.push(new h(e, t)), 1 !== c.length || d || a(p)
            }, h.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = m, i.addListener = m, i.once = m, i.off = m, i.removeListener = m, i.removeAllListeners = m, i.emit = m, i.prependListener = m, i.prependOnceListener = m, i.listeners = function (e) {
                return []
            }, i.binding = function (e) {
                throw new Error("process.binding is not supported")
            }, i.cwd = function () {
                return "/"
            }, i.chdir = function (e) {
                throw new Error("process.chdir is not supported")
            }, i.umask = function () {
                return 0
            }
        }, 232: function (e, t, r) {
            var i;
            !function (n, o) {
                "use strict";
                var a = "function", s = "undefined", c = "object", d = "string", l = "major", u = "model", p = "name",
                    h = "type", m = "vendor", f = "version", g = "architecture", y = "console", w = "mobile",
                    v = "tablet", b = "smarttv", E = "wearable", T = "embedded", _ = "Amazon", k = "Apple", C = "ASUS",
                    M = "BlackBerry", P = "Browser", R = "Chrome", I = "Firefox", x = "Google", N = "Huawei", A = "LG",
                    O = "Microsoft", j = "Motorola", F = "Opera", D = "Samsung", S = "Sharp", L = "Sony", W = "Xiaomi",
                    Y = "Zebra", $ = "Facebook", U = "Chromium OS", q = "Mac OS", z = function (e) {
                        for (var t = {}, r = 0; r < e.length; r++) t[e[r].toUpperCase()] = e[r];
                        return t
                    }, V = function (e, t) {
                        return typeof e === d && -1 !== K(t).indexOf(K(e))
                    }, K = function (e) {
                        return e.toLowerCase()
                    }, B = function (e, t) {
                        if (typeof e === d) return e = e.replace(/^\s\s*/, ""), typeof t === s ? e : e.substring(0, 500)
                    }, G = function (e, t) {
                        for (var r, i, n, s, d, l, u = 0; u < t.length && !d;) {
                            var p = t[u], h = t[u + 1];
                            for (r = i = 0; r < p.length && !d && p[r];) if (d = p[r++].exec(e)) for (n = 0; n < h.length; n++) l = d[++i], typeof (s = h[n]) === c && s.length > 0 ? 2 === s.length ? typeof s[1] == a ? this[s[0]] = s[1].call(this, l) : this[s[0]] = s[1] : 3 === s.length ? typeof s[1] !== a || s[1].exec && s[1].test ? this[s[0]] = l ? l.replace(s[1], s[2]) : o : this[s[0]] = l ? s[1].call(this, l, s[2]) : o : 4 === s.length && (this[s[0]] = l ? s[3].call(this, l.replace(s[1], s[2])) : o) : this[s] = l || o;
                            u += 2
                        }
                    }, H = function (e, t) {
                        for (var r in t) if (typeof t[r] === c && t[r].length > 0) {
                            for (var i = 0; i < t[r].length; i++) if (V(t[r][i], e)) return "?" === r ? o : r
                        } else if (V(t[r], e)) return "?" === r ? o : r;
                        return e
                    }, X = {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        10: ["NT 6.4", "NT 10.0"],
                        RT: "ARM"
                    }, J = {
                        browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [p, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [p, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [p, f], [/opios[\/ ]+([\w\.]+)/i], [f, [p, F + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [p, F]], [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i], [f, [p, "Baidu"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [p, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [p, "UC" + P]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i], [f, [p, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [p, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [p, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [p, "Yandex"]], [/slbrowser\/([\w\.]+)/i], [f, [p, "Smart Lenovo " + P]], [/(avast|avg)\/([\w\.]+)/i], [[p, /(.+)/, "$1 Secure " + P], f], [/\bfocus\/([\w\.]+)/i], [f, [p, I + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [p, F + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [p, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [p, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [p, F + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [p, "MIUI " + P]], [/fxios\/([-\w\.]+)/i], [f, [p, I]], [/\bqihu|(qi?ho?o?|360)browser/i], [[p, "360 " + P]], [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i], [[p, /(.+)/, "$1 " + P], f], [/samsungbrowser\/([\w\.]+)/i], [f, [p, D + " Internet"]], [/(comodo_dragon)\/([\w\.]+)/i], [[p, /_/g, " "], f], [/metasr[\/ ]?([\d\.]+)/i], [f, [p, "Sogou Explorer"]], [/(sogou)mo\w+\/([\d\.]+)/i], [[p, "Sogou Mobile"], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i], [p, f], [/(lbbrowser)/i, /\[(linkedin)app\]/i], [p], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[p, $], f], [/(Klarna)\/([\w\.]+)/i, /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(alipay)client\/([\w\.]+)/i, /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i], [p, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [p, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [p, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [p, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[p, R + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [p, "Android " + P]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [p, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [p, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, p], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [p, [f, H, {
                            "1.0": "/8",
                            1.2: "/1",
                            1.3: "/3",
                            "2.0": "/412",
                            "2.0.2": "/416",
                            "2.0.3": "/417",
                            "2.0.4": "/419",
                            "?": "/"
                        }]], [/(webkit|khtml)\/([\w\.]+)/i], [p, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[p, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [p, I + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [p, f], [/(cobalt)\/([\w\.]+)/i], [p, [f, /master.|lts./, ""]]],
                        cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, K]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", K]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, K]]],
                        device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [m, D], [h, v]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [m, D], [h, w]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [m, k], [h, w]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [m, k], [h, v]], [/(macintosh);/i], [u, [m, k]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [m, S], [h, w]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [m, N], [h, v]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [m, N], [h, w]], [/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [m, W], [h, w]], [/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i, /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [m, W], [h, v]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [m, "OPPO"], [h, w]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [m, "Vivo"], [h, w]], [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i], [u, [m, "Realme"], [h, w]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [m, j], [h, w]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [m, j], [h, v]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [m, A], [h, v]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [m, A], [h, w]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [m, "Lenovo"], [h, v]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [m, "Nokia"], [h, w]], [/(pixel c)\b/i], [u, [m, x], [h, v]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [m, x], [h, w]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [m, L], [h, w]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [m, L], [h, v]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [m, "OnePlus"], [h, w]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [m, _], [h, v]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [m, _], [h, w]], [/(playbook);[-\w\),; ]+(rim)/i], [u, m, [h, v]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [m, M], [h, w]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [m, C], [h, v]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [m, C], [h, w]], [/(nexus 9)/i], [u, [m, "HTC"], [h, v]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [u, /_/g, " "], [h, w]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [m, "Acer"], [h, v]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [m, "Meizu"], [h, w]], [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i], [u, [m, "Ulefone"], [h, w]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, u, [h, w]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, u, [h, v]], [/(surface duo)/i], [u, [m, O], [h, v]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [m, "Fairphone"], [h, w]], [/(u304aa)/i], [u, [m, "AT&T"], [h, w]], [/\bsie-(\w*)/i], [u, [m, "Siemens"], [h, w]], [/\b(rct\w+) b/i], [u, [m, "RCA"], [h, v]], [/\b(venue[\d ]{2,7}) b/i], [u, [m, "Dell"], [h, v]], [/\b(q(?:mv|ta)\w+) b/i], [u, [m, "Verizon"], [h, v]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [m, "Barnes & Noble"], [h, v]], [/\b(tm\d{3}\w+) b/i], [u, [m, "NuVision"], [h, v]], [/\b(k88) b/i], [u, [m, "ZTE"], [h, v]], [/\b(nx\d{3}j) b/i], [u, [m, "ZTE"], [h, w]], [/\b(gen\d{3}) b.+49h/i], [u, [m, "Swiss"], [h, w]], [/\b(zur\d{3}) b/i], [u, [m, "Swiss"], [h, v]], [/\b((zeki)?tb.*\b) b/i], [u, [m, "Zeki"], [h, v]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], u, [h, v]], [/\b(ns-?\w{0,9}) b/i], [u, [m, "Insignia"], [h, v]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [m, "NextBook"], [h, v]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], u, [h, w]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], u, [h, w]], [/\b(ph-1) /i], [u, [m, "Essential"], [h, w]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [m, "Envizen"], [h, v]], [/\b(trio[-\w\. ]+) b/i], [u, [m, "MachSpeed"], [h, v]], [/\btu_(1491) b/i], [u, [m, "Rotor"], [h, v]], [/(shield[\w ]+) b/i], [u, [m, "Nvidia"], [h, v]], [/(sprint) (\w+)/i], [m, u, [h, w]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [m, O], [h, w]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [m, Y], [h, v]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [m, Y], [h, w]], [/smart-tv.+(samsung)/i], [m, [h, b]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [m, D], [h, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, A], [h, b]], [/(apple) ?tv/i], [m, [u, k + " TV"], [h, b]], [/crkey/i], [[u, R + "cast"], [m, x], [h, b]], [/droid.+aft(\w+)( bui|\))/i], [u, [m, _], [h, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [m, S], [h, b]], [/(bravia[\w ]+)( bui|\))/i], [u, [m, L], [h, b]], [/(mitv-\w{5}) bui/i], [u, [m, W], [h, b]], [/Hbbtv.*(technisat) (.*);/i], [m, u, [h, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, B], [u, B], [h, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, u, [h, y]], [/droid.+; (shield) bui/i], [u, [m, "Nvidia"], [h, y]], [/(playstation [345portablevi]+)/i], [u, [m, L], [h, y]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [m, O], [h, y]], [/((pebble))app/i], [m, u, [h, E]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [m, k], [h, E]], [/droid.+; (glass) \d/i], [u, [m, x], [h, E]], [/droid.+; (wt63?0{2,3})\)/i], [u, [m, Y], [h, E]], [/(quest( 2| pro)?)/i], [u, [m, $], [h, E]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [h, T]], [/(aeobc)\b/i], [u, [m, _], [h, T]], [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i], [u, [h, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [h, v]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, v]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, w]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [m, "Generic"]]],
                        engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [p, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [p, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [p, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, p]],
                        os: [[/microsoft (windows) (vista|xp)/i], [p, f], [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i], [p, [f, H, X]], [/windows nt 6\.2; (arm)/i, /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i, /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, H, X], [p, "Windows"]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [p, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[p, q], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, p], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [p, f], [/\(bb(10);/i], [f, [p, M]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [p, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [p, I + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [p, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [p, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [p, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[p, U], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [p, f], [/(sunos) ?([\w\.\d]*)/i], [[p, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [p, f]]
                    }, Z = function (e, t) {
                        if (typeof e === c && (t = e, e = o), !(this instanceof Z)) return new Z(e, t).getResult();
                        var r = typeof n !== s && n.navigator ? n.navigator : o,
                            i = e || (r && r.userAgent ? r.userAgent : ""), y = r && r.userAgentData ? r.userAgentData : o,
                            b = t ? function (e, t) {
                                var r = {};
                                for (var i in e) t[i] && t[i].length % 2 == 0 ? r[i] = t[i].concat(e[i]) : r[i] = e[i];
                                return r
                            }(J, t) : J, E = r && r.userAgent == i;
                        return this.getBrowser = function () {
                            var e, t = {};
                            return t[p] = o, t[f] = o, G.call(t, i, b.browser), t[l] = typeof (e = t[f]) === d ? e.replace(/[^\d\.]/g, "").split(".")[0] : o, E && r && r.brave && typeof r.brave.isBrave == a && (t[p] = "Brave"), t
                        }, this.getCPU = function () {
                            var e = {};
                            return e[g] = o, G.call(e, i, b.cpu), e
                        }, this.getDevice = function () {
                            var e = {};
                            return e[m] = o, e[u] = o, e[h] = o, G.call(e, i, b.device), E && !e[h] && y && y.mobile && (e[h] = w), E && "Macintosh" == e[u] && r && typeof r.standalone !== s && r.maxTouchPoints && r.maxTouchPoints > 2 && (e[u] = "iPad", e[h] = v), e
                        }, this.getEngine = function () {
                            var e = {};
                            return e[p] = o, e[f] = o, G.call(e, i, b.engine), e
                        }, this.getOS = function () {
                            var e = {};
                            return e[p] = o, e[f] = o, G.call(e, i, b.os), E && !e[p] && y && "Unknown" != y.platform && (e[p] = y.platform.replace(/chrome os/i, U).replace(/macos/i, q)), e
                        }, this.getResult = function () {
                            return {
                                ua: this.getUA(),
                                browser: this.getBrowser(),
                                engine: this.getEngine(),
                                os: this.getOS(),
                                device: this.getDevice(),
                                cpu: this.getCPU()
                            }
                        }, this.getUA = function () {
                            return i
                        }, this.setUA = function (e) {
                            return i = typeof e === d && e.length > 500 ? B(e, 500) : e, this
                        }, this.setUA(i), this
                    };
                Z.VERSION = "1.0.37", Z.BROWSER = z([p, f, l]), Z.CPU = z([g]), Z.DEVICE = z([u, m, h, y, w, b, v, E, T]), Z.ENGINE = Z.OS = z([p, f]), typeof t !== s ? (e.exports && (t = e.exports = Z), t.UAParser = Z) : r.amdO ? (i = function () {
                    return Z
                }.call(t, r, t, e)) === o || (e.exports = i) : typeof n !== s && (n.UAParser = Z);
                var Q = typeof n !== s && (n.jQuery || n.Zepto);
                if (Q && !Q.ua) {
                    var ee = new Z;
                    Q.ua = ee.getResult(), Q.ua.get = function () {
                        return ee.getUA()
                    }, Q.ua.set = function (e) {
                        ee.setUA(e);
                        var t = ee.getResult();
                        for (var r in t) Q.ua[r] = t[r]
                    }
                }
            }("object" == typeof window ? window : this)
        }
    }, r = {};

    function i(e) {
        var n = r[e];
        if (void 0 !== n) return n.exports;
        var o = r[e] = {exports: {}};
        return t[e].call(o.exports, o, o.exports, i), o.exports
    }

    i.amdO = {}, i.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return i.d(t, {a: t}), t
    }, i.d = (e, t) => {
        for (var r in t) i.o(t, r) && !i.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
    }, i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach((function (e) {
        e.hasOwnProperty("remove") || Object.defineProperty(e, "remove", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function () {
                this.parentNode.removeChild(this)
            }
        })
    })), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach((function (e) {
        e.hasOwnProperty("append") || Object.defineProperty(e, "append", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function () {
                var e = Array.prototype.slice.call(arguments), t = document.createDocumentFragment();
                e.forEach((function (e) {
                    var r = e instanceof Node;
                    t.appendChild(r ? e : document.createTextNode(String(e)))
                })), this.appendChild(t)
            }
        })
    })), [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach((function (e) {
        e.hasOwnProperty("remove") || Object.defineProperty(e, "remove", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function () {
                this.parentNode.removeChild(this)
            }
        })
    })), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach((function (e) {
        e.hasOwnProperty("append") || Object.defineProperty(e, "append", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function () {
                var e = Array.prototype.slice.call(arguments), t = document.createDocumentFragment();
                e.forEach((function (e) {
                    var r = e instanceof Node;
                    t.appendChild(r ? e : document.createTextNode(String(e)))
                })), this.appendChild(t)
            }
        })
    })), Math.asinh || (Math.asinh = function (e) {
        var t = Math.abs(e);
        if (t < 3.725290298461914e-9) return e;
        if (t > 268435456) i = Math.log(t) + Math.LN2; else if (t > 2) i = Math.log(2 * t + 1 / (Math.sqrt(e * e + 1) + t)); else var r = e * e,
            i = Math.log1p(t + r / (1 + Math.sqrt(1 + r)));
        return e > 0 ? i : -i
    }), Math.log1p = Math.log1p || function (e) {
        if ((e = Number(e)) < -1 || e != e) return NaN;
        if (0 === e || e === 1 / 0) return e;
        var t = e + 1 - 1;
        return 0 === t ? e : e * (Math.log(e + 1) / t)
    }, Math.expm1 = Math.expm1 || function (e) {
        return Math.exp(e) - 1
    }, Math.cbrt || (Math.cbrt = (e = Math.pow, function (t) {
        return t < 0 ? -e(-t, 1 / 3) : e(t, 1 / 3)
    })), Math.sinh = Math.sinh || function (e) {
        var t = Math.exp(e);
        return (t - 1 / t) / 2
    }, Math.cosh = Math.cosh || function (e) {
        var t = Math.exp(e);
        return (t + 1 / t) / 2
    }, Math.tanh = Math.tanh || function (e) {
        var t = Math.exp(+e), r = Math.exp(-e);
        return t == 1 / 0 ? 1 : r == 1 / 0 ? -1 : (t - r) / (t + r)
    }, window.crypto = window.crypto || window.msCrypto, function (e) {
        function t(e, t, r) {
            throw new e("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + t + ".", r)
        }

        "function" != typeof e.requestSubmit && (e.requestSubmit = function (e) {
            e ? (function (e, r) {
                e instanceof HTMLElement || t(TypeError, "parameter 1 is not of type 'HTMLElement'"), "submit" == e.type || t(TypeError, "The specified element is not a submit button"), e.form == r || t(DOMException, "The specified element is not owned by this form element", "NotFoundError")
            }(e, this), e.click()) : ((e = document.createElement("input")).type = "submit", e.hidden = !0, this.appendChild(e), e.click(), this.removeChild(e))
        })
    }(HTMLFormElement.prototype), (() => {
        "use strict";
        var e = i(975);

        function t(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        const r = "2.0.0";
        i.n(e)().resolve("/", "..", "dist");
        let n = function (e) {
            return e[e["es-AR"] = 0] = "es-AR", e[e["es-CL"] = 1] = "es-CL", e[e["es-CO"] = 2] = "es-CO", e[e["es-MX"] = 3] = "es-MX", e[e["es-VE"] = 4] = "es-VE", e[e["es-UY"] = 5] = "es-UY", e[e["es-PE"] = 6] = "es-PE", e[e["pt-BR"] = 7] = "pt-BR", e[e["en-US"] = 8] = "en-US", e
        }({}), o = function (e) {
            return e.PRODUCT_ID_MOBILE = "BTR2NNPO1F60OR8RLSH0", e.PRODUCT_ID_DESKTOP = "BTR2N61O1F60OR8RLSGG", e.PRODUCT_ID_PAYMENT_BRICK_MOBILE = "CHQBURHMDARLP9CT19E0", e.PRODUCT_ID_PAYMENT_BRICK_DESKTOP = "CHQBUNESFQCVF58JFECG", e.PRODUCT_ID_CARD_PAYMENT_BRICK_MOBILE = "C85Q3OGS4G718CFJS270", e.PRODUCT_ID_CARD_PAYMENT_BRICK_DESKTOP = "C85Q6TGS4G718CFJS27G", e
        }({});
        const a = ["gateway", "aggregator"], s = "aggregator";

        class c {
            static setPublicKey(e) {
                this._publicKey = e
            }

            static setLocale(e) {
                this._locale = e
            }

            static setSiteId(e) {
                this._siteId = e
            }

            static setDeviceProfile(e) {
                this._deviceProfile = e
            }

            static setTrackingDisabled(e) {
                this._trackingDisabled = e
            }

            static setIframeEnabled(e) {
                this._iframeEnabled = e
            }

            static setFrontendStack(e) {
                this._frontendStack = e || "JS"
            }

            static setProductId(e) {
                this._product_id = e
            }

            static getPublicKey() {
                return this._publicKey
            }

            static getSiteId() {
                return this._siteId
            }

            static getLocale() {
                return this._locale
            }

            static getDeviceProfile() {
                return this._deviceProfile
            }

            static getTrackingDisabled() {
                return this._trackingDisabled
            }

            static getIframeEnabled() {
                return this._iframeEnabled
            }

            static getFrontendStack() {
                return this._frontendStack
            }

            static getProductId() {
                return this._product_id
            }
        }

        t(c, "_publicKey", void 0), t(c, "_siteId", void 0), t(c, "_locale", void 0), t(c, "_product_id", void 0), t(c, "_deviceProfile", void 0), t(c, "_trackingDisabled", void 0), t(c, "_iframeEnabled", void 0), t(c, "_frontendStack", "JS");
        const d = "MPHiddenInput", l = {
                TOKEN: "token",
                PAYMENT_METHOD: "paymentMethod",
                PROCESSING_MODE: "processingMode",
                MERCHANT_ACCOUNT_ID: "merchantAccountId"
            }, u = ["credit_card", "debit_card"], p = [{
                path: "root",
                name: "amount",
                type: "string",
                required: !0,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "root",
                name: "autoMount",
                type: "boolean",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "root",
                name: "processingMode",
                type: "string",
                acceptedValues: a,
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "form",
                name: "id",
                type: "string",
                required: !0,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["FORM", "DIV"]
            }, {
                path: "form",
                name: "cardNumber",
                type: "string",
                required: !0,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["INPUT", "DIV"],
                pci: !0
            }, {
                path: "form",
                name: "securityCode",
                type: "string",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["INPUT", "DIV"],
                pci: !0
            }, {
                path: "form",
                name: "cardExpirationMonth",
                type: "string",
                required: !0,
                isAllowed: e => !e.form.cardExpirationDate,
                isDOMElement: !0,
                tagName: ["INPUT", "SELECT", "DIV"],
                pci: !0
            }, {
                path: "form",
                name: "cardExpirationYear",
                type: "string",
                required: !0,
                isAllowed: e => !e.form.cardExpirationDate,
                isDOMElement: !0,
                tagName: ["INPUT", "SELECT", "DIV"],
                pci: !0
            }, {
                path: "form",
                name: "cardExpirationDate",
                type: "string",
                required: !0,
                isAllowed: e => !(e.form.cardExpirationMonth || e.form.cardExpirationYear),
                isDOMElement: !0,
                tagName: ["INPUT", "SELECT", "DIV"],
                pci: !0
            }, {
                path: "form",
                name: "cardholderName",
                type: "string",
                required: !0,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["INPUT"]
            }, {
                path: "form",
                name: "cardholderEmail",
                type: "string",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["INPUT"]
            }, {
                path: "form",
                name: "installments",
                type: "string",
                required: !0,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["SELECT"]
            }, {
                path: "form",
                name: "issuer",
                type: "string",
                required: !0,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["SELECT"],
                pci: !0
            }, {
                path: "form",
                name: "cardholderIdentificationType",
                type: "string",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["SELECT"]
            }, {
                path: "form",
                name: "cardholderIdentificationNumber",
                type: "string",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !0,
                tagName: ["INPUT"]
            }, {
                path: "callbacks",
                name: "onFormMounted",
                type: "function",
                required: !0,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onIdentificationTypesReceived",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onPaymentMethodsReceived",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onInstallmentsReceived",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onCardTokenReceived",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onIssuersReceived",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onFormUnmounted",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onSubmit",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onFetching",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onReady",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {
                path: "callbacks",
                name: "onValidityChange",
                type: "function",
                required: !1,
                isAllowed: () => !0,
                isDOMElement: !1
            }, {path: "callbacks", name: "onError", type: "function", required: !1, isAllowed: () => !0, isDOMElement: !1}],
            h = p.filter((e => {
                let {isDOMElement: t} = e;
                return t
            })), m = e => e.charAt(0).toUpperCase() + e.slice(1), f = (e, t) => {
                const r = h.find((t => {
                    let {name: r} = t;
                    return ("id" === r ? "form" : r) === e
                })), i = document.getElementById(t);
                if (!i) {
                    const e = `MercadoPago.js - Could not find HTML element for provided id: ${t}`;
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_INTEGRATION, origin: "domHelper.getHTMLElementFrom", reason: e}
                    }), new Error(e)
                }
                const n = r?.tagName;
                if (n && !n.includes(i.tagName)) {
                    const t = `MercadoPago.js - ${e}: wrong HTML Element type: expected ${n.join(" or ")}. Received ${i.tagName}`;
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_INTEGRATION, origin: "domHelper.getHTMLElementFrom", reason: t}
                    }), new Error(t)
                }
                const o = r?.pci, a = i.getAttribute("name");
                return o && a && (i.setAttribute("data-name", a), i.removeAttribute("name"), i.setAttribute("autocomplete", "off")), i
            }, g = e => {
                const t = [...e?.children];
                t?.forEach((e => e.remove()))
            }, y = e => {
                const t = ni.getContext("formMap");
                return e.map((e => {
                    const r = t?.get(e)?.element;
                    return r?.value
                }))
            }, w = (e, t) => {
                const r = ni.getContext("formMap"), i = r?.get(e)?.element;
                i?.setAttribute("value", t)
            }, v = function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                const r = document.createElement("option");
                r.textContent = t, r.dataset.placeholder = "", r.setAttribute("selected", ""), r.setAttribute("disabled", ""), e.appendChild(r)
            }, b = e => {
                const t = (e = Xr(Hr(e))).length, r = ni.getContext("bin"), i = r.get("bin")?.bin,
                    n = ni.getContext("customCallbacks").get("onBinChange"), [o] = y(["paymentMethods"]);
                if (t < 8 && o) {
                    const t = ni.getContext("cardSettings"), i = ni.getContext("formMap"), o = i.get("installments"),
                        a = i.get("issuer"), {element: s, placeholder: c} = o, {element: d, placeholder: l} = a;
                    return w("paymentMethods", ""), w("merchantAccountId", ""), g(s), v(s, c), g(d), v(d, l), t.delete("additional_info_needed"), t.delete("security_code"), t.delete("card_number"), r.set("bin", {bin: e}), void n?.(e)
                }
                if (t >= 8 && e !== i) {
                    const e = ni.getContext("cardFormModules").get("getPaymentMethods");
                    e?.()
                }
                r.set("bin", {bin: e}), n?.(e)
            }, E = {}, T = (e, t) => {
                const r = E[e];
                r && clearTimeout(r), E[e] = setTimeout((() => {
                    t()
                }), 500)
            };
        let _;
        const k = (e, t) => {
            const r = Vr({field: t, value: e});
            return r.length ? r : void 0
        }, C = (e, t) => {
            _ = ni.getContext("customCallbacks");
            const r = _?.get("onValidityChange");
            r?.(e, t)
        }, M = {
            form: [{event: ["select", "copy", "cut", "drop", "drag"], fn: e => e.preventDefault()}, {
                event: ["submit"],
                fn: async e => {
                    const t = (() => {
                        const e = ni.getContext("cardFormOptions"), t = ni.getContext("formMap"), r = e?.get("amount"),
                            i = t?.get("form"), n = document.createElement("input");
                        return n.setAttribute("type", "hidden"), n.setAttribute("name", `${d}Amount`), n.setAttribute("value", r), i.element?.appendChild(n), () => n.remove()
                    })();
                    try {
                        const [t] = y(["token"]);
                        if (!t) {
                            e.preventDefault();
                            const t = ni.getContext("cardFormModules").get("createCardToken");
                            return await (t?.()), e.target.requestSubmit()
                        }
                    } catch (e) {
                        return console.warn("MercadoPago.js - Form could not be submitted: ", e)
                    } finally {
                        t()
                    }
                    _ = ni.getContext("customCallbacks");
                    const r = _?.get("onSubmit");
                    r?.(e)
                }
            }], cardNumber: [{
                event: ["input"], fn: e => T("cardNumber", (async () => {
                    const t = e.target, {value: r = ""} = t, i = ni.getContext("cardFormModules").get("setBin");
                    i?.(r), b(r)
                }))
            }, {
                event: ["input"], fn: e => T("cardNumber-validityChange", (() => {
                    if (!e.isTrusted) return;
                    const t = e.target.value, r = k(t, "cardNumber");
                    C(r, "cardNumber")
                }))
            }], cardExpirationDate: [{
                event: ["input"], fn: e => {
                    !function (e) {
                        const t = e.target, r = t.value.length, i = t.selectionStart || 0;
                        !function (e) {
                            let {maskedValue: t, currentValueLength: r, target: i, cursorIndex: n} = e;
                            const o = t.length - r;
                            i.setSelectionRange(n + o, n + o)
                        }({maskedValue: P(t), currentValueLength: r, target: t, cursorIndex: i})
                    }(e)
                }
            }, {
                event: ["input"], fn: e => T("cardExpirationDate", (() => {
                    const t = e.target.value, [r, i] = t.split("/"), n = k(r, "cardExpirationMonth"),
                        o = k(i, "cardExpirationYear");
                    if (!n && !o) return void C(n, "cardExpirationDate");
                    const a = ni.getContext("expirationFields").has("expirationDate") ? "expirationDate" : "cardExpirationDate";
                    let s = [];
                    s = n ? [...s, ...n] : s, s = o ? [...s, ...o] : s, C(s, a)
                }))
            }], cardholderName: [{
                event: ["input"], fn: e => T("cardholderName", (() => {
                    const t = e.target.value, r = k(t, "cardholderName");
                    C(r, "cardholderName")
                }))
            }], cardholderEmail: [{
                event: ["input"], fn: e => T("cardholderEmail", (() => {
                    const t = e.target.value, r = k(t, "cardholderEmail");
                    C(r, "cardholderEmail")
                }))
            }], securityCode: [{
                event: ["input"], fn: e => T("securityCode", (() => {
                    const t = e.target.value, r = k(t, "securityCode");
                    C(r, "securityCode")
                }))
            }], cardExpirationMonth: [{
                event: ["input"], fn: e => T("cardExpirationMonth", (() => {
                    const t = e.target.value,
                        r = ni.getContext("expirationFields").has("expirationMonth") ? "expirationMonth" : "cardExpirationMonth",
                        i = k(t, "cardExpirationMonth");
                    C(i, r)
                }))
            }], cardExpirationYear: [{
                event: ["input"], fn: e => T("cardExpirationYear", (() => {
                    const t = e.target.value,
                        r = ni.getContext("expirationFields").has("expirationYear") ? "expirationYear" : "cardExpirationYear",
                        i = k(t, "cardExpirationYear");
                    C(i, r)
                }))
            }], identificationNumber: [{
                event: ["input"], fn: e => T("identificationNumber", (() => {
                    const t = e.target.value, r = k(t, "identificationNumber");
                    C(r, "identificationNumber")
                }))
            }]
        };

        function P(e) {
            const t = e.value.replace(/\D/g, "").replace(/^(\d{2})(?=\d)/, "$1/");
            return e.value = t, t
        }

        function R(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        class I {
            constructor(e) {
                let {waitFieldsReady: t} = e;
                R(this, "formMap", void 0), R(this, "cardFormModules", void 0), R(this, "cardSettings", void 0), R(this, "eventsToWait", new Set), R(this, "completedEvents", void 0), this.formMap = ni.getContext("formMap"), this.cardFormModules = ni.getContext("cardFormModules"), this.cardSettings = ni.getContext("cardSettings"), this.completedEvents = ni.createContext("completedEvents"), this.initEventsToWait({waitFieldsReady: t})
            }

            initEventsToWait(e) {
                let {waitFieldsReady: t} = e;
                this.eventsToWait.add("onMount"), this.formMap.has("identificationType") && this.eventsToWait.add("onIdentificationTypesReceived"), t && this.eventsToWait.add("fields")
            }

            onFormMounted(e) {
                let {error: t, customCallback: r} = e;
                if (t) return r?.(t);
                const i = this.cardFormModules.get("getIdentificationTypes");
                this.formMap.get("identificationType") && i?.(), r?.()
            }

            onIdentificationTypesReceived(e) {
                let {error: t, data: r, customCallback: i} = e;
                if (t) return i?.(t);
                const n = this.formMap.get("identificationType")?.element, o = document.createDocumentFragment();
                r?.forEach((e => {
                    const t = document.createElement("option");
                    t.value = e.id, t.textContent = e.name, o.appendChild(t)
                })), g(n), n?.appendChild(o), i?.(t, r)
            }

            onPaymentMethodsReceived(e) {
                let {error: t, data: r, customCallback: i, handler: n} = e;
                return t ? i?.(t) : r?.length ? (n.onPaymentMethodsReceived({
                    paymentMethods: r,
                    customCallback: i,
                    cardFormModules: this.cardFormModules,
                    cardSettings: this.cardSettings,
                    formMap: this.formMap
                }), void i?.(t, r)) : i?.(new Error("MercadoPago.js - No payment methods found"))
            }

            onInstallmentsReceived(e) {
                let {error: t, data: r, customCallback: i} = e;
                if (t) return i?.(t);
                const n = this.formMap.get("installments")?.element, o = document.createDocumentFragment();
                r?.payer_costs?.forEach((e => {
                    const t = document.createElement("option");
                    t.value = e.installments, t.textContent = e.recommended_message, o.appendChild(t)
                })), g(n), n?.appendChild(o), i?.(t, r)
            }

            onIssuersReceived(e) {
                let {error: t, data: r, customCallback: i} = e;
                if (t) return i?.(t);
                const n = this.formMap.get("issuer")?.element, o = document.createDocumentFragment();
                r?.forEach((e => {
                    const t = document.createElement("option");
                    t.value = e.id, t.textContent = e.name, o.appendChild(t)
                }));
                const a = this.cardFormModules.get("getInstallments");
                g(n), n?.appendChild(o), a?.(), i?.(t, r)
            }

            onCardTokenReceived(e) {
                let {error: t, data: r, customCallback: i} = e;
                if (t) return i?.(t);
                w("token", r?.token), i?.(t, r)
            }

            onReady(e) {
                let {customCallback: t, data: r} = e;
                this.completedEvents.set(r.event, !0), this.eventsToWait.size === this.completedEvents.size && t?.()
            }
        }

        function x(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function N(e, t) {
            return e.get(function (e, t, r) {
                if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
                throw new TypeError("Private element is not present on this object")
            }(e, t))
        }

        var A = new WeakMap, O = new WeakMap, j = new WeakMap, F = new WeakMap, D = new WeakMap, S = new WeakMap,
            L = new WeakMap, W = new WeakMap;

        class Y {
            constructor(e) {
                (function (e, t, r) {
                    t = function (e) {
                        var t = function (e, t) {
                            if ("object" != typeof e || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var i = r.call(e, "string");
                                if ("object" != typeof i) return i;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(e);
                        return "symbol" == typeof t ? t : t + ""
                    }(t), t in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r
                })(this, "coreModules", void 0), x(this, A, (e => {
                    let {field: t, value: r, fieldSettings: i} = e;
                    if ("string" != typeof r) return void console.warn(`MercadoPago.js - Error setting placeholder for field ${t}: placeholder should be a string. Ignoring...`);
                    const n = i.element;
                    if (i && n && !i.hidden) {
                        if ("SELECT" === n.tagName && n.querySelector("[data-placeholder]")) return g(n), void v(n, r);
                        n.setAttribute("placeholder", r)
                    }
                })), x(this, O, new Map([["placeholder", N(A, this).bind(this)]])), x(this, j, ((e, t) => {
                    const r = t?.get(e), i = {element: f(e, r.id), ...r};
                    t?.set(e, i)
                })), x(this, F, ((e, t) => {
                    const r = t?.get(e), i = {
                        listeners: (e => {
                            let {optionName: t} = e;
                            return M[t]
                        })({optionName: e}), ...r
                    };
                    t?.set(e, i)
                })), x(this, D, ((e, t) => {
                    const {element: r, listeners: i} = t?.get(e);
                    if (i?.length) try {
                        i.forEach((e => {
                            e?.event.forEach((t => {
                                r?.addEventListener(t, e?.fn)
                            }))
                        }))
                    } catch (e) {
                        const t = `MercadoPago.js - Something went wrong adding EventListeners: ${e.message}`;
                        throw ri.sendError({
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {
                                type: ri.ERROR_TYPE_CRITICAL,
                                origin: "DefaultCardHandler.applyFormMapEventListeners",
                                reason: t
                            }
                        }), new Error(t)
                    }
                })), x(this, S, ((e, t) => {
                    const {placeholder: r, element: i, style: n, customFonts: o, mode: a} = t?.get(e);
                    r && ("SELECT" === i?.tagName ? v(i, r) : i.placeholder = r), n && console.warn(`MercadoPago.js - Ignoring styles for ${e}: styles are only available for 'cardNumber', 'securityCode', 'expirationDate', 'expirationMonth' and 'expirationYear' when the 'iframe' option is true`), o && console.warn(`MercadoPago.js - Ignoring customFonts for ${e}: customFonts are only available for 'cardNumber', 'securityCode', 'expirationDate', 'expirationMonth' and 'expirationYear' when the 'iframe' option is true`), a && console.warn(`MercadoPago.js - Ignoring mode for ${e}: mode is only available for 'expirationYear' or 'expirationDate' when the 'iframe' option is true`)
                })), x(this, L, (e => {
                    const t = e?.get("form")?.id, r = document.getElementById(t);
                    Object.values(l).forEach((e => {
                        const t = document.getElementById(`${d}${m(e)}`);
                        t && r?.removeChild(t)
                    }))
                })), x(this, W, (() => {
                    ["cardSettings", "customCallbacks", "cardFormModules"].forEach((e => ni.deleteContext(e)))
                })), this.coreModules = e
            }

            createField(e, t, r) {
                let i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                N(j, this).call(this, e, r), t || (i && N(S, this).call(this, e, r), N(F, this).call(this, e, r), N(D, this).call(this, e, r))
            }

            getNonPCIValues() {
                return y(["identificationType", "identificationNumber", "cardholderName"])
            }

            destroyCardForm(e) {
                N(W, this).call(this), N(L, this).call(this, e)
            }

            async getTokenRaw() {
                const [e, t, r, i, n] = y(["cardNumber", "cardExpirationMonth", "cardExpirationYear", "cardExpirationDate", "securityCode"]), [o, a, s] = this.getNonPCIValues();
                let c = t, d = r;
                return i && ([c, d] = i.split("/")), await (this.coreModules?.createCardToken({
                    cardNumber: Hr(e),
                    cardholderName: s,
                    identificationType: o,
                    cardExpirationMonth: c,
                    identificationNumber: a,
                    cardExpirationYear: d,
                    securityCode: n
                }, {cardNumber: !0, cardExpirationMonth: !0, cardExpirationYear: !0, securityCode: !0}))
            }

            onPaymentMethodsReceived(e) {
                let {paymentMethods: t, customCallback: r, cardFormModules: i, cardSettings: n, formMap: o} = e;
                const a = t?.[0].payment_type_id;
                if (!u.includes(a)) return r?.(new Error(`Payment Method ${a} not supported.`));
                const s = i.get("getInstallments"), c = i.get("getIssuers"), {
                    id: d,
                    additional_info_needed: l,
                    issuer: p,
                    settings: h,
                    merchant_account_id: m,
                    payment_type_id: f
                } = t?.[0], {card_number: y, security_code: v} = h[0];
                n.set("payment_type_id", f), n.set("additional_info_needed", l), n.set("security_code", v), n.set("card_number", y);
                const b = String(p?.id);
                w("paymentMethods", d), m && w("merchantAccountId", m), l.includes("issuer_id") ? c?.() : (() => {
                    const e = o.get("issuer")?.element;
                    e.setAttribute("value", b);
                    const t = document.createElement("option");
                    t.value = b, t.textContent = p.name, g(e), e.append(t), s?.()
                })()
            }

            update(e) {
                let {field: t, properties: r, fieldSettings: i} = e;
                N(O, this).forEach(((e, n) => {
                    const o = r[n];
                    o && e({field: t, value: o, fieldSettings: i})
                }))
            }
        }

        function $(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function U(e, t) {
            return e.get(z(e, t))
        }

        function q(e, t, r) {
            return e.set(z(e, t), r), r
        }

        function z(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var V = new WeakMap, K = new WeakMap, B = new WeakMap;

        class G {
            constructor(e) {
                let {component: t, event: r, fn: i} = e;
                $(this, V, void 0), $(this, K, void 0), $(this, B, void 0), q(V, this, i), q(K, this, t), q(B, this, r)
            }

            addEventListener() {
                U(K, this).addEventListener(U(B, this), U(V, this), !0)
            }

            removeEventListener() {
                U(K, this).removeEventListener(U(B, this), U(V, this), !0)
            }
        }

        const H = "cardNumber", X = "securityCode", J = "expirationYear", Z = "expirationMonth", Q = "expirationDate",
            ee = {
                default: ["focus", "blur", "ready", "validityChange", "error", "change", "paste"],
                cardNumber: ["binChange"],
                securityCode: [],
                expirationYear: [],
                expirationMonth: [],
                expirationDate: []
            }, te = {
                beta: {
                    cacheUrl: "https://api-static.mercadopago.com/secure-fields/staging",
                    sourceUrl: "https://api.mercadopago.com/secure-fields/staging"
                },
                gama: {
                    cacheUrl: "https://api-static.mercadopago.com/secure-fields/staging",
                    sourceUrl: "https://api.mercadopago.com/secure-fields/staging"
                },
                prod: {
                    cacheUrl: "https://api-static.mercadopago.com/secure-fields",
                    sourceUrl: "https://api.mercadopago.com/secure-fields"
                },
                lts: {
                    cacheUrl: "https://api-static.mercadopago.com/secure-fields",
                    sourceUrl: "https://api.mercadopago.com/secure-fields"
                },
                development: {
                    cacheUrl: "http://localhost:8080/secure-fields",
                    sourceUrl: "http://localhost:8080/secure-fields"
                },
                development_bricks: {
                    cacheUrl: "https://api-static.mercadopago.com/secure-fields/staging",
                    sourceUrl: "https://api.mercadopago.com/secure-fields/staging"
                }
            };

        function re() {
            return te.prod || te.development
        }

        let ie;

        function ne() {
            return ie
        }

        var oe;

        function ae(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        class se {
            static triggerEvent(e, t) {
                const r = se.customEventListeners.find((r => {
                    let {event: i, field: n, group: o} = r;
                    return i === e && t.field === n && (!t.group || t.group === o)
                }));
                r && r.fn(t)
            }
        }

        function ce(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function de(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        function le(e, t) {
            return e.get(ue(e, t))
        }

        function ue(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        oe = se, ae(se, "customEventListeners", []), ae(se, "eventListener", void 0), ae(se, "addWindowEventListener", (() => {
            oe.eventListener = new G({
                component: window,
                event: "message",
                fn: oe.callbackFn
            }), oe.eventListener.addEventListener()
        })), ae(se, "removeWindowEventListener", (() => {
            oe.eventListener?.removeEventListener()
        })), ae(se, "addCustomEventListener", (e => {
            oe.customEventListeners.push(e)
        })), ae(se, "removeCustomEventListeners", (e => {
            const t = oe.customEventListeners.filter((t => e !== t.field));
            oe.customEventListeners = t
        })), ae(se, "callbackFn", (e => {
            const t = ne();
            if (!t) return;
            const {origin: r} = new URL(t), {origin: i, data: {message: n, data: o}} = e;
            i === r && oe.triggerEvent(n, o)
        }));
        var pe = new WeakMap, he = new WeakMap, me = new WeakMap;

        class fe {
            constructor() {
                ce(this, pe, void 0), de(this, "createIFrame", ((e, t, r) => {
                    const i = {
                        frameBorder: 0,
                        allowtransparency: !0,
                        scrolling: "no",
                        height: "100%",
                        width: "100%",
                        name: Me({field: e.type, group: r})
                    }, n = document.createElement("iframe");
                    return Object.keys(i).forEach((e => {
                        const t = i[e];
                        n.setAttribute(e, t)
                    })), !t.length && (fe.preflight = Mr.fetchPage(re().cacheUrl).catch((() => Mr.fetchPage(re().sourceUrl)))), fe.preflight.then((i => {
                        let {url: o} = i;
                        !function (e) {
                            ie = e
                        }(o), n.src = o, le(he, this).call(this, {iFrame: n, fieldProperties: e, types: t, group: r})
                    })).catch((t => {
                        const r = `Unable to load ${e.type}: ${t.message || "Failed to fetch"}`;
                        ri.sendError({
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {type: ri.ERROR_TYPE_CRITICAL, origin: "IFrameHandler.createIFrame", reason: r}
                        }), se.triggerEvent("error", {field: e.type, error: r})
                    })), n
                })), de(this, "removeIFrameFromContainer", (e => {
                    let {iFrame: t} = e;
                    t.parentNode?.removeChild(t)
                })), de(this, "appendIFrameToContainer", (e => {
                    let {iFrame: t, container: r} = e;
                    Te({container: r}), r.innerHTML = "", r.appendChild(t)
                })), ce(this, he, (e => {
                    let {iFrame: t, fieldProperties: r, types: i, group: n} = e;
                    var o, a;
                    o = pe, a = new G({
                        component: t,
                        event: "load",
                        fn: () => le(me, this).call(this, {iFrame: t, fieldProperties: r, types: i, group: n})
                    }), o.set(ue(o, this), a), le(pe, this).addEventListener()
                })), de(this, "removeIframeEventListeners", (() => {
                    le(pe, this)?.removeEventListener()
                })), ce(this, me, (e => {
                    let {iFrame: t, fieldProperties: r, types: i, group: n} = e;
                    const o = t.contentWindow;
                    if (o) {
                        const {
                            style: e,
                            placeholder: t,
                            type: a,
                            customFonts: s,
                            mode: c,
                            enableLuhnValidation: d,
                            srLabel: l
                        } = r;
                        o.postMessage({
                            message: "initialize",
                            field: a,
                            options: {
                                style: e,
                                placeholder: t,
                                customFonts: s,
                                mode: c,
                                enableLuhnValidation: d,
                                group: n,
                                srLabel: l
                            },
                            createdFields: i
                        }, ne())
                    }
                }))
            }
        }

        function ge(e, t) {
            return e.get(we(e, t))
        }

        function ye(e, t, r) {
            return e.set(we(e, t), r), r
        }

        function we(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        de(fe, "preflight", void 0);
        var ve = new WeakMap;

        class be {
            constructor() {
                (function (e, t, r) {
                    !function (e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    }(e, t), t.set(e, r)
                })(this, ve, void 0), ye(ve, this, [])
            }

            getFields() {
                return ge(ve, this)
            }

            addField(e) {
                ge(ve, this).push(e)
            }

            removeField(e) {
                let {field: t} = e;
                const r = t.type;
                return ye(ve, this, ge(ve, this).filter((e => e.type !== r))), ge(ve, this)
            }

            getFieldsType() {
                return ge(ve, this).map((e => e.type))
            }

            getPrimaryField() {
                return ge(ve, this).find((e => e.isPrimary))
            }
        }

        function Ee(e) {
            const t = e[0];
            t.iFrame.setAttribute("data-primary", "true"), t.isPrimary = !0
        }

        const Te = e => {
            let {container: t} = e;
            if ("DIV" !== t.tagName) {
                const e = "[Fields] The container must be a div";
                throw ri.sendError({
                    type: ri.TRACK_TYPE_EVENT,
                    eventData: {
                        type: ri.ERROR_TYPE_INTEGRATION,
                        origin: "ValidationHelper.validateContainer",
                        reason: e
                    }
                }), new Error(e)
            }
        }, _e = e => {
            const t = e.getFieldsType(), r = t.includes(Z), i = t.includes(J);
            return t.includes(Q) || !(r && !i || i && !r)
        }, ke = "", Ce = "";

        function Me(e) {
            let {field: t, group: r = Ce, separator: i = ke} = e;
            return i && r ? t + i + r : t
        }

        function Pe(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Re(e, t) {
            return e.get(xe(e, t))
        }

        function Ie(e, t, r) {
            return e.set(xe(e, t), r), r
        }

        function xe(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        const Ne = ["securityCode", "cardExpirationMonth", "cardExpirationYear", "cardExpirationDate", "cardNumber"];
        var Ae, Oe = new WeakMap, je = new WeakMap, Fe = new WeakMap, De = new WeakMap, Se = new WeakMap,
            Le = new WeakMap, We = new WeakMap, Ye = new WeakMap, $e = new WeakMap;

        class Ue extends Y {
            constructor(e) {
                super(e), Pe(this, Oe, void 0), Pe(this, je, void 0), Pe(this, Fe, void 0), Pe(this, De, void 0), Pe(this, Se, 0), Pe(this, Le, ((e, t) => {
                    const r = t?.get(e), i = Re(We, this).call(this, e),
                        n = this.coreModules?.fields.create(i, Re(je, this), {
                            placeholder: r.placeholder,
                            style: r.style,
                            customFonts: r.customFonts,
                            mode: r.mode
                        });
                    n.mount(r.id), Re(Oe, this).set(i, n), n.on("ready", (() => {
                        var e;
                        if (Ie(Se, this, (e = Re(Se, this), ++e)), Re(Se, this) === Re(Oe, this).size) {
                            const e = Re(Fe, this).get("onReady"), t = Re(De, this).get("onReady");
                            t?.({customCallback: e, data: {event: "fields"}})
                        }
                    })), n.on("validityChange", (e => {
                        let {field: t, errorMessages: r} = e;
                        const i = Re(Fe, this).get("onValidityChange"),
                            n = r.length ? Re($e, this).call(this, r) : void 0;
                        i?.(n, t)
                    })), n.on("error", (e => {
                        let {error: t} = e;
                        const r = Re(Fe, this).get("onError");
                        r?.(Zr(t), "onIframeLoad")
                    })), i === H && n.on("binChange", (e => {
                        let {bin: t} = e;
                        const r = ni.getContext("cardFormModules").get("setBin");
                        t || (t = ""), r?.(t), b(t)
                    }))
                })), Pe(this, We, (e => ({
                    securityCode: X,
                    cardExpirationMonth: Z,
                    cardExpirationYear: J,
                    cardExpirationDate: Q,
                    cardNumber: H
                }[e]))), Pe(this, Ye, (() => {
                    Re(Oe, this).forEach((e => e?.unmount()))
                })), function (e, t, r) {
                    t = function (e) {
                        var t = function (e, t) {
                            if ("object" != typeof e || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var i = r.call(e, "string");
                                if ("object" != typeof i) return i;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(e);
                        return "symbol" == typeof t ? t : t + ""
                    }(t), t in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r
                }(this, "destroyCardForm", (e => {
                    super.destroyCardForm(e), Re(Ye, this).call(this)
                })), Pe(this, $e, (e => e.map((e => ({
                    code: e.cause,
                    message: e.message
                }))))), Ie(je, this, new be), Ie(Fe, this, ni.getContext("customCallbacks")), Ie(De, this, ni.getContext("internalCallbacks")), Ie(Oe, this, new Map);
                const t = ni.getContext("formMap");
                Ne.forEach((e => {
                    t.has(e) && Re(Oe, this).set(Re(We, this).call(this, e), void 0)
                }))
            }

            async getTokenRaw() {
                const [e, t, r] = super.getNonPCIValues();
                return await (this.coreModules?.fields.createCardToken({
                    identificationNumber: t,
                    identificationType: e,
                    cardholderName: r
                }, Re(je, this), {group: Ce}))
            }

            createField(e, t, r) {
                const i = Ne.includes(e);
                super.createField(e, t, r, !i), i && Re(Le, this).call(this, e, r)
            }

            onPaymentMethodsReceived(e) {
                let {paymentMethods: t, customCallback: r, cardFormModules: i, cardSettings: n, formMap: o} = e;
                super.onPaymentMethodsReceived({
                    paymentMethods: t,
                    customCallback: r,
                    cardFormModules: i,
                    cardSettings: n,
                    formMap: o
                });
                const a = n.get("security_code"), s = Re(Oe, this).get(X);
                s && s.update({settings: a});
                const c = n.get("card_number"), d = Re(Oe, this).get(H);
                d && d.update({settings: c})
            }

            update(e) {
                let {field: t, properties: r, fieldSettings: i} = e;
                const n = Re(Oe, this).get(Re(We, this).call(this, t));
                n ? n.update(r) : super.update({field: t, properties: r, fieldSettings: i})
            }
        }

        class qe {
            constructor() {
            }

            static build(e) {
                let {coreModules: t, iframe: r} = e;
                return r ? new Ue(t) : new Y(t)
            }
        }

        class ze {
            send(e, t) {
                return Promise.resolve()
            }

            addContext(e) {
            }
        }

        class Ve {
            sendErrorMetric(e) {
                return Promise.resolve()
            }

            sendPerformanceMetric(e) {
                return Promise.resolve()
            }
        }

        class Ke {
            static getValue(e) {
                return document.cookie.split(";").map((e => {
                    const t = e.split("=");
                    return [t[0], t[1]]
                })).filter((t => {
                    let [r, i] = t;
                    return r === e
                })).map((e => {
                    let [t, r] = e;
                    return r
                }))[0]
            }
        }

        function Be(e, t) {
            return t = t || {}, new Promise((function (r, i) {
                var n = new XMLHttpRequest, o = [], a = [], s = {}, c = function () {
                    return {
                        ok: 2 == (n.status / 100 | 0),
                        statusText: n.statusText,
                        status: n.status,
                        url: n.responseURL,
                        text: function () {
                            return Promise.resolve(n.responseText)
                        },
                        json: function () {
                            return Promise.resolve(n.responseText).then(JSON.parse)
                        },
                        blob: function () {
                            return Promise.resolve(new Blob([n.response]))
                        },
                        clone: c,
                        headers: {
                            keys: function () {
                                return o
                            }, entries: function () {
                                return a
                            }, get: function (e) {
                                return s[e.toLowerCase()]
                            }, has: function (e) {
                                return e.toLowerCase() in s
                            }
                        }
                    }
                };
                for (var d in n.open(t.method || "get", e, !0), n.onload = function () {
                    n.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (function (e, t, r) {
                        o.push(t = t.toLowerCase()), a.push([t, r]), s[t] = s[t] ? s[t] + "," + r : r
                    })), r(c())
                }, n.onerror = i, n.withCredentials = "include" == t.credentials, t.headers) n.setRequestHeader(d, t.headers[d]);
                n.send(t.body || null)
            }))
        }

        var Ge = new Uint8Array(16);

        function He() {
            if (!Ae && !(Ae = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return Ae(Ge)
        }

        const Xe = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        for (var Je = [], Ze = 0; Ze < 256; ++Ze) Je.push((Ze + 256).toString(16).substr(1));
        const Qe = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                r = (Je[e[t + 0]] + Je[e[t + 1]] + Je[e[t + 2]] + Je[e[t + 3]] + "-" + Je[e[t + 4]] + Je[e[t + 5]] + "-" + Je[e[t + 6]] + Je[e[t + 7]] + "-" + Je[e[t + 8]] + Je[e[t + 9]] + "-" + Je[e[t + 10]] + Je[e[t + 11]] + Je[e[t + 12]] + Je[e[t + 13]] + Je[e[t + 14]] + Je[e[t + 15]]).toLowerCase();
            if (!function (e) {
                return "string" == typeof e && Xe.test(e)
            }(r)) throw TypeError("Stringified UUID is invalid");
            return r
        }, et = function (e, t, r) {
            var i = (e = e || {}).random || (e.rng || He)();
            if (i[6] = 15 & i[6] | 64, i[8] = 63 & i[8] | 128, t) {
                r = r || 0;
                for (var n = 0; n < 16; ++n) t[r + n] = i[n];
                return t
            }
            return Qe(i)
        }, tt = function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : navigator.userAgent || navigator.vendor || window.opera;
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
        };

        function rt(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function it(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        function nt(e, t) {
            return e.get(at(e, t))
        }

        function ot(e, t, r) {
            return e.set(at(e, t), r), r
        }

        function at(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var st = new WeakMap, ct = new WeakMap, dt = new WeakMap, lt = new WeakMap, ut = new WeakMap, pt = new WeakMap,
            ht = new WeakMap;

        class mt {
            constructor(e, t, r) {
                rt(this, st, void 0), rt(this, ct, void 0), rt(this, dt, void 0), rt(this, lt, void 0), rt(this, ut, void 0), rt(this, pt, void 0), rt(this, ht, void 0), ot(st, this, e), ot(ct, this, t), ot(dt, this, r), ot(lt, this, this.getUidFromCookie()), ot(ut, this, c.getDeviceProfile()), ot(pt, this, c.getPublicKey()), ot(ht, this, {})
            }

            getUidFromCookie() {
                return Ke.getValue(mt.UID_COOKIE) || et()
            }

            buildEvent(e, t) {
                return {
                    tracks: [{
                        path: e,
                        type: t.type,
                        user: {uid: nt(lt, this)},
                        id: et(),
                        event_data: {
                            ...t.event_data, ...nt(ht, this), ...nt(ut, this) && {device_profile_id: nt(ut, this)},
                            public_key: nt(pt, this)
                        },
                        application: {
                            business: "mercadopago",
                            site_id: nt(dt, this),
                            version: nt(ct, this),
                            app_name: nt(st, this)
                        },
                        device: {platform: "/web/" + (tt() ? "mobile" : "desktop")}
                    }]
                }
            }

            async postEvent(e) {
                const t = e.tracks[0];
                try {
                    const r = await Be(mt.MELIDATA_API_URL, {method: "POST", body: JSON.stringify(e)});
                    r.ok || console.warn(t.path, `Could not send event id ${t.id}. Status: ${r.status}`)
                } catch (e) {
                    console.warn(t.path, `Could not send event id ${t.id}. Error: ${e}`)
                }
            }

            async validateEvent(e) {
                try {
                    const t = e.tracks[0];
                    await Be(mt.MELIDATA_API_URL_VALIDATE, {method: "POST", body: JSON.stringify(t)})
                } catch (t) {
                    console.warn(e.tracks[0].path, `Could not send event id ${e.tracks[0].id}. Error: ${t}`)
                }
            }

            addContext(e) {
                ot(ht, this, Object.assign(nt(ht, this), e))
            }

            async send(e, t) {
                const r = this.buildEvent(e, t);
                this.postEvent(r)
            }
        }

        it(mt, "UID_COOKIE", "_d2id"), it(mt, "MELIDATA_API_URL", "https://api.mercadolibre.com/tracks"), it(mt, "MELIDATA_API_URL_VALIDATE", "https://api.mercadolibre.com/melidata/catalog/validate");
        var ft = i(232), gt = i.n(ft);

        function yt(e) {
            const t = gt()(e);
            return `${t.browser.name ? `${t.browser.name} ${t.browser.version}` : "unknown"}${t.device.type ? ` (${t.device.type})` : ""}`
        }

        function wt(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function vt(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        function bt(e, t) {
            return e.get(Tt(e, t))
        }

        function Et(e, t, r) {
            return e.set(Tt(e, t), r), r
        }

        function Tt(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var _t = new WeakMap, kt = new WeakMap, Ct = new WeakMap, Mt = new WeakMap;

        class Pt {
            constructor(e, t, r) {
                wt(this, _t, void 0), wt(this, kt, void 0), wt(this, Ct, void 0), wt(this, Mt, void 0), Et(_t, this, e), Et(kt, this, t), Et(Ct, this, r), Et(Mt, this, this.getDeviceUidFromCookie())
            }

            async sendErrorMetric(e) {
                const t = this.buildErrorMetric(e);
                try {
                    {
                        const e = await Be(Pt.FRONTEND_METRICS_API_BASE_URL + "/error-metric", {
                            method: "POST",
                            body: JSON.stringify(t),
                            headers: {"Content-Type": "application/json"}
                        });
                        if (!e.ok) {
                            const t = await e.json();
                            throw new Error(`${e.status} - ${t}`)
                        }
                    }
                } catch (e) {
                    const {name: r, version: i} = t.client, {name: n} = t.error;
                    console.warn(`[${r}/${i}] Could not send error metric ${n}.`, e)
                }
            }

            async sendPerformanceMetric(e) {
                const t = this.buildPerformanceMetric(e);
                try {
                    {
                        const e = await Be(Pt.FRONTEND_METRICS_API_BASE_URL + "/performance-metric", {
                            method: "POST",
                            body: JSON.stringify(t),
                            headers: {"Content-Type": "application/json"}
                        });
                        if (!e.ok) {
                            const t = await e.json();
                            throw new Error(`${e.status} - ${t}`)
                        }
                    }
                } catch (e) {
                    const {name: r, version: i} = t.client, {name: n} = t.event;
                    console.warn(`[${r}/${i}] Could not send performance metric ${n}.`, e)
                }
            }

            getDeviceUidFromCookie() {
                return Ke.getValue(Pt.UID_COOKIE) || et()
            }

            getBaseMetricInfo() {
                return {
                    client: {
                        name: bt(_t, this),
                        version: bt(kt, this),
                        platform: this.getClientPlatform(),
                        technology: c.getFrontendStack(),
                        scope: String("prod")
                    }, site_id: bt(Ct, this)
                }
            }

            buildErrorMetric(e) {
                return {
                    ...this.getBaseMetricInfo(),
                    browser: {domain: window.location.origin, user_agent: yt(navigator.userAgent)},
                    device: {uid: bt(Mt, this)},
                    error: e
                }
            }

            buildPerformanceMetric(e) {
                return e.timing = Number(e.timing.toFixed(2)), {
                    ...this.getBaseMetricInfo(),
                    browser: {domain: window.location.origin},
                    event: e
                }
            }

            getClientPlatform() {
                return tt(navigator.userAgent) ? "mobile" : "desktop"
            }
        }

        function Rt(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function It(e, t) {
            return e.get(Nt(e, t))
        }

        function xt(e, t, r) {
            return e.set(Nt(e, t), r), r
        }

        function Nt(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        vt(Pt, "UID_COOKIE", "_d2id"), vt(Pt, "FRONTEND_METRICS_API_BASE_URL", "https://api.mercadopago.com/op-frontend-metrics/v1");
        var At = new WeakMap, Ot = new WeakMap;

        class jt {
            constructor(e) {
                Rt(this, At, void 0), Rt(this, Ot, void 0);
                const {appName: t, clientName: r = "", siteId: i, version: n} = e;
                c.getTrackingDisabled() ? (xt(At, this, new ze), xt(Ot, this, new Ve)) : (xt(At, this, new mt(t, n, i)), xt(Ot, this, new Pt(r, n, i)))
            }

            melidata() {
                return It(At, this)
            }

            frontendMetrics() {
                return It(Ot, this)
            }
        }

        function Ft(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Dt(e, t) {
            return e.get(Lt(e, t))
        }

        function St(e, t, r) {
            return e.set(Lt(e, t), r), r
        }

        function Lt(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        let Wt;
        var Yt = new WeakMap, $t = new WeakMap, Ut = new WeakMap, qt = new WeakMap, zt = new WeakMap, Vt = new WeakMap,
            Kt = new WeakMap, Bt = new WeakMap, Gt = new WeakMap, Ht = new WeakMap, Xt = new WeakMap, Jt = new WeakMap,
            Zt = new WeakMap, Qt = new WeakMap, er = new WeakMap, tr = new WeakMap, rr = new WeakMap, ir = new WeakMap,
            nr = new WeakMap, or = new WeakMap, ar = new WeakMap, sr = new WeakMap, cr = new WeakMap, dr = new WeakMap,
            lr = new WeakMap, ur = new WeakMap, pr = new WeakMap, hr = new WeakMap, mr = new WeakMap;

        class fr {
            constructor(e, t) {
                if (Ft(this, Yt, void 0), Ft(this, $t, void 0), Ft(this, Ut, void 0), Ft(this, qt, void 0), Ft(this, zt, void 0), Ft(this, Vt, void 0), Ft(this, Kt, void 0), Ft(this, Bt, void 0), Ft(this, Gt, void 0), Ft(this, Ht, void 0), Ft(this, Xt, void 0), Ft(this, Jt, (() => {
                    const e = Dt(Ut, this)?.get("cardNumber"), t = e?.element;
                    Dt(Xt, this) || (e => {
                        let {element: t, eventName: r} = e;
                        const i = new Event(r);
                        t.dispatchEvent(i)
                    })({element: t, eventName: "input"})
                })), Ft(this, Zt, (async () => {
                    let e, t, r;
                    await Dt(Bt, this), Dt(or, this).call(this);
                    const i = Dt(qt, this)?.onIdentificationTypesReceived;
                    try {
                        r = Dt(qt, this)?.onFetching?.("identificationTypes");
                        const e = await (Dt($t, this)?.getIdentificationTypes());
                        return t = e && (e => e.map((e => {
                            let {id: t, name: r} = e;
                            return {id: t, name: r}
                        })))(e), Dt(Vt, this)?.onReady({
                            customCallback: Dt(qt, this)?.onReady,
                            data: {event: "onIdentificationTypesReceived"}
                        }), Promise.resolve(t)
                    } catch (t) {
                        e = t, i || console.warn("MercadoPago.js - Failed to get identification types. Use cardForm callbacks to intercept the error ", t);
                        const r = Zr(e);
                        Dt(qt, this)?.onError?.(r, "onIdentificationTypesReceived"), Dt(pr, this).call(this, r, "CardForm.getIdentificationTypes", ri.ERROR_TYPE_WARNING)
                    } finally {
                        Dt(ur, this).call(this, r) && r?.(), Dt(Vt, this)?.onIdentificationTypesReceived({
                            error: e,
                            customCallback: i,
                            data: t
                        })
                    }
                })), Ft(this, Qt, (e => {
                    St(Ht, this, e)
                })), Ft(this, er, (async () => {
                    let e, t, r;
                    await Dt(Bt, this), Dt(or, this).call(this);
                    const i = Dt(qt, this)?.onPaymentMethodsReceived;
                    try {
                        r = Dt(qt, this)?.onFetching?.("paymentMethods");
                        const [e] = y(["processingMode"]),
                            i = await (Dt($t, this)?.getPaymentMethods({bin: Hr(Dt(Ht, this)), processingMode: e}));
                        return t = i && i.results.map((e => {
                            let {
                                issuer: t,
                                id: r,
                                payment_type_id: i,
                                thumbnail: n,
                                marketplace: o,
                                deferred_capture: a,
                                agreements: s,
                                labels: c,
                                name: d,
                                site_id: l,
                                processing_mode: u,
                                additional_info_needed: p,
                                status: h,
                                settings: m,
                                merchant_account_id: f
                            } = e;
                            return {
                                issuer: t,
                                id: r,
                                payment_type_id: i,
                                thumbnail: n,
                                marketplace: o,
                                deferred_capture: a,
                                agreements: s,
                                labels: c,
                                name: d,
                                site_id: l,
                                processing_mode: u,
                                additional_info_needed: p,
                                status: h,
                                settings: m,
                                merchant_account_id: f
                            }
                        })), Promise.resolve(t)
                    } catch (t) {
                        e = t, i || console.warn("MercadoPago.js - Failed to get payment methods. Use cardForm callbacks to intercept the error ", t);
                        const r = Zr(e);
                        Dt(qt, this)?.onError?.(r, "onPaymentMethodsReceived"), Dt(pr, this).call(this, r, "CardForm.getPaymentMethods", ri.ERROR_TYPE_WARNING)
                    } finally {
                        Dt(ur, this).call(this, r) && r?.(), Dt(Vt, this)?.onPaymentMethodsReceived({
                            error: e,
                            customCallback: i,
                            data: t,
                            handler: Dt(Gt, this)
                        })
                    }
                })), Ft(this, tr, (async () => {
                    let e, t, r;
                    await Dt(Bt, this), Dt(or, this).call(this);
                    const i = Dt(qt, this)?.onIssuersReceived;
                    try {
                        r = Dt(qt, this)?.onFetching?.("issuers");
                        const [e] = y(["paymentMethods"]), i = await (Dt($t, this)?.getIssuers({
                            paymentMethodId: e,
                            bin: Hr(Dt(Ht, this)),
                            product_id: c.getProductId()
                        }));
                        return t = i && i.map((e => {
                            let {id: t, name: r, thumbnail: i, processing_mode: n, merchant_account_id: o} = e;
                            return {id: t, name: r, thumbnail: i, processing_mode: n, merchant_account_id: o}
                        })), Promise.resolve(t)
                    } catch (t) {
                        e = t, i || console.warn("MercadoPago.js - Failed to get issuers. Use cardForm callbacks to intercept the error ", t);
                        const r = Zr(e);
                        Dt(qt, this)?.onError?.(r, "onIssuersReceived"), Dt(pr, this).call(this, r, "CardForm.getIssuers", ri.ERROR_TYPE_WARNING)
                    } finally {
                        Dt(ur, this).call(this, r) && r?.(), Dt(Vt, this)?.onIssuersReceived({
                            error: e,
                            customCallback: i,
                            data: t
                        })
                    }
                })), Ft(this, rr, (async () => {
                    let e, t, r;
                    await Dt(Bt, this), Dt(or, this).call(this);
                    const i = Dt(qt, this)?.onInstallmentsReceived;
                    try {
                        r = Dt(qt, this)?.onFetching?.("installments");
                        const e = ni.getContext("cardSettings"), [i] = y(["processingMode"]),
                            n = await (Dt($t, this)?.getInstallments({
                                amount: Dt(zt, this)?.get("amount"),
                                bin: Hr(Dt(Ht, this)),
                                processingMode: i,
                                paymentTypeId: e.get("payment_type_id"),
                                product_id: c.getProductId()
                            }));
                        if (!n) throw new Error("No installments found");
                        return t = (e => {
                            const {payer_costs: t, merchant_account_id: r = ""} = e[0];
                            return {
                                merchant_account_id: r, payer_costs: t.map((e => {
                                    let {
                                        installments: t,
                                        installment_rate: r,
                                        discount_rate: i,
                                        reimbursement_rate: n,
                                        labels: o,
                                        min_allowed_amount: a,
                                        max_allowed_amount: s,
                                        recommended_message: c,
                                        installment_amount: d,
                                        total_amount: l,
                                        installment_rate_collector: u,
                                        payment_method_option_id: p
                                    } = e;
                                    return {
                                        installments: String(t),
                                        installment_rate: r,
                                        discount_rate: i,
                                        reimbursement_rate: n,
                                        labels: o,
                                        min_allowed_amount: a,
                                        max_allowed_amount: s,
                                        recommended_message: c,
                                        installment_amount: d,
                                        total_amount: l,
                                        payment_method_option_id: p,
                                        installment_rate_collector: u
                                    }
                                }))
                            }
                        })(n), Promise.resolve(t)
                    } catch (t) {
                        e = t, i || console.warn("MercadoPago.js - Failed to get installments. Use cardForm callbacks to intercept the error ", t);
                        const r = Zr(e);
                        Dt(qt, this)?.onError?.(r, "onInstallmentsReceived"), Dt(pr, this).call(this, r, "CardForm.getInstallments", ri.ERROR_TYPE_WARNING)
                    } finally {
                        Dt(ur, this).call(this, r) && r?.(), Dt(Vt, this)?.onInstallmentsReceived({
                            error: e,
                            customCallback: i,
                            data: t
                        })
                    }
                })), Ft(this, ir, (() => {
                    Dt(Ut, this)?.forEach(((e, t) => {
                        let {hidden: r} = e;
                        Dt(Gt, this).createField(t, r, Dt(Ut, this))
                    }))
                })), Ft(this, nr, (() => {
                    Dt(Ut, this)?.forEach((e => {
                        let {element: t, listeners: r} = e;
                        t && r && r.forEach((e => {
                            e.event.forEach((r => t.removeEventListener(r, e.fn)))
                        }))
                    }))
                })), Ft(this, or, (() => {
                    if (!Dt(Yt, this)) throw new Error("MercadoPago.js - CardForm is not mounted")
                })), Ft(this, ar, (() => {
                    St(Kt, this, (() => {
                        this.mount(), document.removeEventListener("DOMContentLoaded", Dt(Kt, this))
                    })), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", Dt(Kt, this)) : this.mount()
                })), Ft(this, sr, (() => {
                    Dt(dr, this).call(this), Dt(lr, this).call(this), St(Vt, this, new I({waitFieldsReady: Dt(Xt, this)})), ni.createContext("internalCallbacks", {onReady: Dt(Vt, this)?.onReady.bind(Dt(Vt, this))})
                })), Ft(this, cr, (() => {
                    Dt(Gt, this).destroyCardForm(Dt(Ut, this)), St(Vt, this, void 0)
                })), Ft(this, dr, (() => {
                    ni.createContext("cardSettings"), ni.createContext("customCallbacks", Dt(qt, this)), ni.createContext("cardFormModules", {
                        getIdentificationTypes: Dt(Zt, this).bind(this),
                        getInstallments: Dt(rr, this).bind(this),
                        getIssuers: Dt(tr, this).bind(this),
                        getPaymentMethods: Dt(er, this).bind(this),
                        setBin: Dt(Qt, this).bind(this),
                        createCardToken: this.createCardToken.bind(this),
                        getCardFormData: this.getCardFormData.bind(this)
                    }), ni.createContext("bin", {bin: ""})
                })), Ft(this, lr, (() => {
                    const e = document.createDocumentFragment();
                    Object.values(l).forEach((t => {
                        const r = document.createElement("input");
                        r.setAttribute("id", `${d}${m(t)}`), r.setAttribute("name", `${d}${m(t)}`), r.setAttribute("type", "hidden"), "processingMode" === t && r.setAttribute("value", Dt(zt, this)?.get("processingMode")), e.appendChild(r)
                    }));
                    const t = Dt(Ut, this)?.get("form")?.id, r = document.getElementById(t);
                    r?.appendChild(e)
                })), Ft(this, ur, (e => !(!e || "function" != typeof e && (console.warn("MercadoPago.js - The return value of onFetching callback must be a function"), Dt(hr, this).call(this, "onFetching is not a function", "CardForm.validateFetchCallback", ri.ERROR_TYPE_INTEGRATION), 1)))), Ft(this, pr, ((e, t, r) => {
                    e?.map((e => {
                        Dt(hr, this).call(this, e.message, t, r)
                    }))
                })), Ft(this, hr, ((e, t, r) => {
                    ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: r, origin: t, reason: `Failed on ${t} error: ${e}`}
                    })
                })), Ft(this, mr, (e => {
                    const t = {};
                    ["expirationDate", "expirationMonth", "expirationYear"].filter((t => Boolean(e[t]))).forEach((r => {
                        const i = `card${r?.charAt(0).toUpperCase()}${r.slice(1)}`;
                        e[i] = e[r], t[r] = !0, delete e[r]
                    })), ni.createContext("expirationFields", t)
                })), Wt) return console.warn("MercadoPago.js - Cardform already instantiated. Returning existing instance..."), Wt;
                St(Bt, this, t);
                const r = {...e.form};
                Dt(mr, this).call(this, r);
                const i = (e => {
                    const t = new Jr;
                    return p.forEach((r => {
                        let {name: i, type: n, required: o, path: a, acceptedValues: s, isAllowed: c} = r;
                        const d = "root" === a ? e[i] : e[a]?.[i], l = "object" == typeof d ? d.id : d, u = typeof l,
                            p = c(e);
                        !l && p && o && t.addError({
                            ...$r.default,
                            description: `Required field "${i}" is missing`
                        }), l && !p && t.addError({
                            ...$r[i].allowed,
                            description: `Field "${i} is not allowed with this configuration"`
                        }), l && u !== n && t.addError({
                            ...$r.default,
                            description: `Type of ${i} must be ${n}. Received ${u}`
                        }), l && s && !s.includes(l) && t.addError({
                            ...$r.default,
                            description: `Invalid option value "${l}". Available option(s): ${s.join(" or ")}`
                        })
                    })), t.getErrors()
                })({...e, form: r});
                if (i.length) throw i;
                const {amount: n, autoMount: o = !0, processingMode: a = s, callbacks: u = {}, iframe: h = !1} = e;
                St(zt, this, ni.createContext("cardFormOptions", {
                    amount: n,
                    processingMode: a
                })), St(Ut, this, ni.createContext("formMap", gr(r))), St(qt, this, u), St($t, this, new Wr({services: new ai})), St(Xt, this, h), Dt(sr, this).call(this), St(Gt, this, qe.build({
                    coreModules: Dt($t, this),
                    iframe: h
                })), o && Dt(ar, this).call(this), c.setIframeEnabled(Dt(Xt, this)), Wt = this
            }

            mount() {
                if (Dt(Yt, this)) throw new Error("CardForm already mounted");
                let e;
                try {
                    Dt(ir, this).call(this), St(Yt, this, !0), Dt(Jt, this).call(this), Dt(Vt, this)?.onReady({
                        customCallback: Dt(qt, this)?.onReady,
                        data: {event: "onMount"}
                    })
                } catch (t) {
                    e = t;
                    const r = Zr(e);
                    Dt(qt, this)?.onError?.(r, "onFormMounted"), Dt(pr, this).call(this, r, "CardForm.mount", ri.ERROR_TYPE_INTEGRATION)
                } finally {
                    const t = Dt(qt, this)?.onFormMounted;
                    Dt(Vt, this)?.onFormMounted({
                        error: e,
                        customCallback: t
                    }), document.removeEventListener("DOMContentLoaded", Dt(Kt, this))
                }
            }

            unmount() {
                let e;
                Dt(or, this).call(this);
                try {
                    Dt(nr, this).call(this), Dt(cr, this).call(this), ni.destroyContexts(), St(zt, this, void 0), St(Ut, this, void 0), St($t, this, void 0), St(Yt, this, !1), Wt = void 0
                } catch (t) {
                    e = t;
                    const r = Zr(e);
                    Dt(qt, this)?.onError?.(r, "onFormUnmounted"), Dt(pr, this).call(this, r, "CardForm.unmount", ri.ERROR_TYPE_INTEGRATION)
                } finally {
                    Dt(qt, this)?.onFormUnmounted?.(e), St(qt, this, void 0)
                }
            }

            submit() {
                Dt(or, this).call(this);
                try {
                    const e = Dt(Ut, this)?.get("form"), t = e?.element;
                    return t.requestSubmit()
                } catch (e) {
                    throw Dt(hr, this).call(this, `submitting form : ${e.message}`, "CardForm.submit", ri.ERROR_TYPE_INTEGRATION), new Error(`MercadoPago.js - Error submitting form : ${e.message}`)
                }
            }

            update(e, t) {
                if ("string" != typeof e) return console.warn("MercadoPago.js - Error updating: field parameter should be a string. Ignoring..."), void Dt(hr, this).call(this, "field parameter should be a string", "CardForm.update", ri.ERROR_TYPE_INTEGRATION);
                const r = Dt(Ut, this)?.get(e);
                if (!r) return void console.warn(`MercadoPago.js - Error updating field ${e}: not found. Ignoring...`);
                const {placeholder: i = r.placeholder, style: n = r.style} = t;
                Dt(Ut, this)?.set(e, {...r, placeholder: i, style: n}), Dt(Gt, this).update({
                    field: e,
                    properties: t,
                    fieldSettings: r
                })
            }

            async createCardToken() {
                let e, t, r;
                await Dt(Bt, this), Dt(or, this).call(this);
                const i = Dt(qt, this)?.onCardTokenReceived;
                try {
                    r = Dt(qt, this)?.onFetching?.("cardToken");
                    const e = await (Dt(Gt, this)?.getTokenRaw?.());
                    return t = e && (e => ({token: e.id}))(e), ri.send({
                        path: "/card_form/create_card_token",
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {is_iframe: c.getIframeEnabled()}
                    }), Promise.resolve(t)
                } catch (t) {
                    e = t, i || console.warn("MercadoPago.js - Failed to create card token. Use cardForm callbacks to intercept the error ", t);
                    const r = Zr(e);
                    return Dt(qt, this)?.onError?.(r, "onCardTokenReceived"), Dt(pr, this).call(this, r, "CardForm.createCardToken", ri.ERROR_TYPE_WARNING), Promise.reject(t)
                } finally {
                    Dt(ur, this).call(this, r) && r?.(), Dt(Vt, this)?.onCardTokenReceived({
                        error: e,
                        customCallback: i,
                        data: t
                    })
                }
            }

            getCardFormData() {
                let e;
                Dt(or, this).call(this);
                try {
                    const [t, r, i, n, o, a, s, c, d] = y(["installments", "identificationType", "identificationNumber", "issuer", "paymentMethods", "token", "processingMode", "merchantAccountId", "cardholderEmail"]),
                        l = Dt(zt, this)?.get("amount");
                    return e = {
                        amount: l,
                        paymentMethodId: o,
                        token: a,
                        issuerId: n,
                        installments: t,
                        identificationType: r,
                        identificationNumber: i,
                        processingMode: s,
                        merchantAccountId: c,
                        cardholderEmail: d
                    }, e
                } catch (e) {
                    return Dt(hr, this).call(this, "Preparing cardform data", "CardForm.getCardFormData", ri.ERROR_TYPE_INTEGRATION), e
                }
            }
        }

        const gr = e => {
            let {id: t, ...r} = e;
            const {PAYMENT_METHOD: i, TOKEN: n, PROCESSING_MODE: o, MERCHANT_ACCOUNT_ID: a} = l;
            return {
                form: {id: t},
                paymentMethods: {id: `${d}${m(i)}`, hidden: !0},
                token: {id: `${d}${m(n)}`, hidden: !0},
                processingMode: {id: `${d}${m(o)}`, hidden: !0},
                merchantAccountId: {id: `${d}${m(a)}`, hidden: !0}, ...r
            }
        }, yr = e => {
            const t = tt();
            let r = t ? o.PRODUCT_ID_MOBILE : o.PRODUCT_ID_DESKTOP;
            return e === qn.cardPayment ? r = t ? o.PRODUCT_ID_CARD_PAYMENT_BRICK_MOBILE : o.PRODUCT_ID_CARD_PAYMENT_BRICK_DESKTOP : e && Object.values(qn).includes(e) && (r = t ? o.PRODUCT_ID_PAYMENT_BRICK_MOBILE : o.PRODUCT_ID_PAYMENT_BRICK_DESKTOP), r
        };

        function wr(e) {
            let {
                cardNumber: t,
                cardId: r,
                cardholderName: i,
                identificationType: n,
                identificationNumber: o,
                securityCode: a,
                cardExpirationMonth: s,
                cardExpirationYear: d
            } = e;
            const l = r ? {card_id: r, security_code: a} : {
                card_number: t,
                cardholder: {name: i, identification: {type: n, number: o}},
                security_code: a,
                expiration_month: parseInt(s, 10),
                expiration_year: parseInt(d, 10)
            }, u = c.getDeviceProfile();
            return u && (l.device = {meli: {session_id: u}}), l
        }

        const {protocol: vr, hostname: br, port: Er} = window.location, Tr = `${vr}//${br}${Er && ":" + Er}`,
            _r = e => Object.assign({method: "GET", timeout: 2e3, retry: 3, defaultQueries: !0}, e), kr = async e => {
                let {fetchURL: t, restClientOptions: r} = e;
                const {retry: i, timeout: n} = r;
                let o = 0;
                do {
                    const e = 2 ** o * n;
                    o++;
                    try {
                        const i = await Cr({fetchURL: t, restClientOptions: r, timeout: e}), {
                            status: n,
                            ok: o,
                            headers: a,
                            statusText: s
                        } = i;
                        if (!o) {
                            const e = Boolean(a.get("content-type")?.includes("json")), {get: t} = a;
                            if (e) {
                                const e = {...await i.json(), status: n, ok: o, getHeader: t};
                                return Promise.reject(e)
                            }
                            return Promise.reject({message: s, status: n, ok: o, getHeader: t})
                        }
                        return Promise.resolve(i)
                    } catch (e) {
                        if (e instanceof Error && "Request timed out" !== e.message || o <= 0) return Promise.reject(e)
                    }
                } while (o < i);
                return Promise.reject()
            }, Cr = e => {
                let t, {fetchURL: r, restClientOptions: i, timeout: n} = e;
                const o = new Promise(((e, n) => Be(r, i).then(e).catch(n).finally((() => clearTimeout(t))))),
                    a = new Promise(((e, r) => t = setTimeout((() => r(new Error("Request timed out"))), n)));
                return Promise.race([o, a])
            };

        class Mr {
            static async fetch(e, t) {
                const i = _r(t), n = (e => {
                    let {endpoint: t, restClientOptions: i} = e;
                    const n = new URL((i.baseURL || "https://api.mercadopago.com/v1") + t);
                    return (e => {
                        let {URLObject: t, restClientOptions: i} = e;
                        i?.defaultQueries && (e => {
                            e.searchParams.append("public_key", c.getPublicKey()), e.searchParams.append("locale", c.getLocale()), e.searchParams.append("js_version", r), e.searchParams.append("referer", Tr)
                        })(t), (e => {
                            let {URLObject: t, restClientOptions: r} = e;
                            const i = r?.query;
                            i && (Object.entries(i).forEach((e => {
                                let [r, i] = e;
                                return t.searchParams.append(r, i)
                            })), delete r?.query)
                        })({URLObject: t, restClientOptions: i})
                    })({URLObject: n, restClientOptions: i}), n.href
                })({endpoint: e, restClientOptions: i});
                return kr({fetchURL: n, restClientOptions: i})
            }

            static async fetchPage(e, t) {
                const r = _r(t), i = new URL(e).href;
                return kr({fetchURL: i, restClientOptions: r})
            }
        }

        const Pr = (e, t) => e && "string" != typeof e ? {
            ...e,
            clientScope: "prod" === t || "lts" === t ? "prod" : "beta"
        } : e;

        function Rr(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Ir(e, t) {
            return e.get(Nr(e, t))
        }

        function xr(e, t, r) {
            return e.set(Nr(e, t), r), r
        }

        function Nr(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var Ar = new WeakMap, Or = new WeakMap, jr = new WeakMap, Fr = new WeakMap, Dr = new WeakMap;

        class Sr {
            constructor(e) {
                let {field: t, options: r, metadata: i} = e;
                Rr(this, Ar, void 0), Rr(this, Or, void 0), Rr(this, jr, void 0), Rr(this, Fr, void 0), Rr(this, Dr, void 0), (e => {
                    let {field: t, createdFields: r, group: i} = e;
                    const n = Me({field: t, group: i});
                    if (r.includes(n)) {
                        const e = `[Fields] The field ${t} has already been created${i ? " on group " + i : ""}`;
                        throw ri.sendError({
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {
                                type: ri.ERROR_TYPE_INTEGRATION,
                                origin: "ValidationHelper.validateFieldType",
                                reason: e
                            }
                        }), new Error(e)
                    }
                })({field: t, createdFields: i.getFieldsType(), group: r?.group}), xr(Ar, this, i), xr(Or, this, (e => {
                    let {field: t, options: r = {}} = e;
                    const {placeholder: i, style: n, customFonts: o, mode: a, enableLuhnValidation: s, srLabel: c} = r;
                    return {
                        type: t,
                        style: n,
                        placeholder: i,
                        customFonts: o,
                        mode: a,
                        enableLuhnValidation: s,
                        srLabel: c
                    }
                })({field: t, options: r})), xr(jr, this, !1), xr(Fr, this, new fe), xr(Dr, this, r?.group || Ce)
            }

            mount(e) {
                if (Ir(jr, this)) throw new Error(`Field '${Ir(Or, this).type}' already mounted`);
                try {
                    const t = document.getElementById(e);
                    if (!t) throw new Error("Container not found");
                    const r = Ir(Fr, this).createIFrame(Ir(Or, this), Ir(Ar, this).getFieldsType(), Ir(Dr, this));
                    Ir(Fr, this).appendIFrameToContainer({iFrame: r, container: t}), Ir(Ar, this).addField({
                        iFrame: r,
                        isPrimary: !1,
                        type: Me({field: Ir(Or, this).type, group: Ir(Dr, this)})
                    }), Ir(Ar, this).getPrimaryField() || (Ee(Ir(Ar, this).getFields()), se.addWindowEventListener()), xr(jr, this, !0)
                } catch (t) {
                    console.warn(`MercadoPago.js - Error when mounting field ${e}: ${t.message}`), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_INTEGRATION,
                            origin: "Fields.mount",
                            reason: `Error when mounting field ${e}`
                        }
                    })
                }
                return this
            }

            unmount() {
                if (!Ir(jr, this)) throw new Error(`Field '${Ir(Or, this).type}' already unmounted`);
                try {
                    const e = Ir(Ar, this).getFields().find((e => e.type === Me({
                        field: Ir(Or, this).type,
                        group: Ir(Dr, this)
                    })));
                    if (!e) throw new Error("Field not found");
                    const t = Ir(Ar, this).getPrimaryField(), r = t?.type === Ir(Or, this).type, {iFrame: i} = e;
                    Ir(Fr, this).removeIFrameFromContainer({iFrame: i}), Ir(Fr, this).removeIframeEventListeners(), se.removeCustomEventListeners(function (e) {
                        let {iframeName: t, separator: r = ke} = e;
                        return r ? t.split(r)[0] : t
                    }({iframeName: e.type}));
                    const n = Ir(Ar, this).removeField({field: e});
                    n.length || se.removeWindowEventListener(), r && n.length && Ee(n), xr(jr, this, !1)
                } catch (e) {
                    console.warn(`MercadoPago.js - Error when unmounting field : ${e.message}`), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_INTEGRATION,
                            origin: "Fields.unmount",
                            reason: `Error when unmounting field error: ${e.message}`
                        }
                    })
                }
            }

            on(e, t) {
                try {
                    (e => {
                        let {field: t, event: r, fn: i} = e;
                        if (![...ee[t], ...ee.default].includes(r)) {
                            const e = `[Fields] ${r} event is not valid for ${t}`;
                            throw ri.sendError({
                                type: ri.TRACK_TYPE_EVENT,
                                eventData: {
                                    type: ri.ERROR_TYPE_INTEGRATION,
                                    origin: "ValidationHelper.validateAllowedEvents",
                                    reason: e
                                }
                            }), new Error(e)
                        }
                        if ("function" != typeof i) {
                            const e = `[Fields] You must pass a function arg for ${t}`;
                            throw ri.sendError({
                                type: ri.TRACK_TYPE_EVENT,
                                eventData: {
                                    type: ri.ERROR_TYPE_INTEGRATION,
                                    origin: "ValidationHelper.validateAllowedEvents",
                                    reason: e
                                }
                            }), new Error(e)
                        }
                    })({
                        field: Ir(Or, this).type,
                        event: e,
                        fn: t
                    }), se.addCustomEventListener({field: Ir(Or, this).type, event: e, group: Ir(Dr, this), fn: t})
                } catch (e) {
                    console.warn(`MercadoPago.js - Error when adding on function : ${e.message}`), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_INTEGRATION,
                            origin: "Fields.on",
                            reason: `Error when adding on function : ${e.message}`
                        }
                    })
                }
                return this
            }

            update(e) {
                this.dispatchEvent({eventName: "update", properties: e})
            }

            focus() {
                this.dispatchEvent({eventName: "focus"})
            }

            blur() {
                this.dispatchEvent({eventName: "blur"})
            }

            dispatchEvent(e) {
                let {eventName: t, properties: r} = e;
                const i = Ir(Ar, this).getFields(), n = Ir(Or, this).type,
                    o = i.find((e => e.type === Me({field: n, group: Ir(Dr, this)})));
                if (!o) return console.warn(`MercadoPago.js - Error on ${t} event on ${n}: not found. Ignoring...`), void ri.sendError({
                    type: ri.TRACK_TYPE_EVENT,
                    eventData: {
                        type: ri.ERROR_TYPE_INTEGRATION,
                        origin: `Fields.${t}`,
                        reason: `Field to ${t}: ${n} not found`
                    }
                });
                o.iFrame.contentWindow?.postMessage({
                    message: t,
                    field: n,
                    options: {group: Ir(Dr, this)},
                    createdFields: Ir(Ar, this).getFieldsType(), ...r && {properties: r} || {}
                }, ne())
            }

            static getCardToken(e) {
                let {metadata: t, nonPCIData: i, options: n} = e;
                const o = t.getPrimaryField();
                if (!o) return ri.sendError({
                    type: ri.TRACK_TYPE_EVENT,
                    eventData: {
                        type: ri.ERROR_TYPE_INTEGRATION,
                        origin: "Fields.getCardToken",
                        reason: "No primary field found"
                    }
                }), Promise.reject({message: "No primary field found. Please create and mount one before calling 'createCardToken'. Ignoring call..."});
                if (!_e(t)) return ri.sendError({
                    type: ri.TRACK_TYPE_EVENT,
                    eventData: {
                        type: ri.ERROR_TYPE_INTEGRATION,
                        origin: "Fields.getCardToken",
                        reason: "Received expirationDate and expirationMonth together"
                    }
                }), Promise.reject({message: "You must create 'expirationDate' alone or 'expirationMonth' and 'expirationYear' together"});
                const a = zr({methodName: "createCardToken", incomingParams: i});
                return a.length ? (console.warn("MercadoPago.js - Form could not be submitted", a), a.map((e => {
                    ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_INTEGRATION, origin: "Fields.getCardToken", reason: e.message}
                    })
                })), Promise.reject(a)) : new Promise(((e, a) => {
                    if (o.iFrame.contentWindow) {
                        const s = new MessageChannel;
                        s.port1.onmessage = t => {
                            let {data: r} = t;
                            s.port1.close(), r.error ? a(r.error) : e(r)
                        }, o.iFrame.contentWindow.postMessage({
                            message: "createCardToken",
                            createdFields: t.getFieldsType(),
                            nonPCIData: wr(i),
                            query: {public_key: c.getPublicKey(), locale: c.getLocale(), js_version: r, referer: Tr},
                            isMobile: tt(),
                            options: Pr(n, "prod")
                        }, ne(), [s.port2])
                    } else a({message: "Error trying to create cardToken: The iFrame does not have a window"}), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Fields.getCardToken",
                            reason: "Error to init message channel"
                        }
                    })
                }))
            }

            static updateCardToken(e) {
                let {token: t, metadata: i, options: n} = e;
                const o = i.getPrimaryField();
                return o ? _e(i) ? t ? new Promise(((e, a) => {
                    if (o.iFrame.contentWindow) {
                        const s = new MessageChannel;
                        s.port1.onmessage = t => {
                            let {data: r} = t;
                            s.port1.close(), r.error ? a(r.error) : e(r)
                        }, o.iFrame.contentWindow.postMessage({
                            message: "updateCardToken",
                            createdFields: i.getFieldsType(),
                            token: t,
                            query: {public_key: c.getPublicKey(), locale: c.getLocale(), js_version: r, referer: Tr},
                            isMobile: tt(),
                            options: Pr(n, "prod")
                        }, ne(), [s.port2])
                    } else a({message: "Error trying to create cardToken: The iFrame does not have a window"}), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Fields.updateCardToken",
                            reason: "Error to init message channel"
                        }
                    })
                })) : (ri.sendError({
                    type: ri.TRACK_TYPE_EVENT,
                    eventData: {
                        type: ri.ERROR_TYPE_INTEGRATION,
                        origin: "Fields.updateCardToken",
                        reason: "Token to update not received"
                    }
                }), Promise.reject({message: "You must send token to update"})) : (ri.sendError({
                    type: ri.TRACK_TYPE_EVENT,
                    eventData: {
                        type: ri.ERROR_TYPE_INTEGRATION,
                        origin: "Fields.updateCardToken",
                        reason: "Received expirationDate and expirationMonth together"
                    }
                }), Promise.reject({message: "You must create 'expirationDate' alone or 'expirationMonth' and 'expirationYear' together"})) : (ri.sendError({
                    type: ri.TRACK_TYPE_EVENT,
                    eventData: {
                        type: ri.ERROR_TYPE_INTEGRATION,
                        origin: "Fields.updateCardToken",
                        reason: "No primary field found"
                    }
                }), Promise.reject({message: "No primary field found. Please create and mount one before calling 'createCardToken'. Ignoring call..."}))
            }
        }

        function Lr(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        class Wr {
            constructor(e) {
                let {services: t} = e;
                Lr(this, "services", void 0), Lr(this, "fields", {
                    create: (e, t, r) => new Sr({
                        field: e,
                        options: r,
                        metadata: t
                    }),
                    createCardToken: (e, t, r) => Sr.getCardToken({metadata: t, nonPCIData: e, options: r}),
                    updateCardToken: (e, t, r) => Sr.updateCardToken({token: e, metadata: t, options: r})
                }), this.services = t
            }

            async getIdentificationTypes() {
                try {
                    return await this.services.getIdentificationTypes()
                } catch (e) {
                    return console.error("failed to get indetification types", e), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Modules.getIdentificationTypes",
                            reason: "external service error"
                        }
                    }), Promise.reject(e)
                }
            }

            async getPaymentMethods(e) {
                const t = zr({methodName: "getPaymentMethods", incomingParams: e});
                if (t.length > 0) throw t;
                const {bin: r, processingMode: i = s, ...n} = e;
                try {
                    return await this.services.getPaymentMethods({bins: Xr(r), processing_mode: i, ...n})
                } catch (e) {
                    return console.error("failed to get payment methods", e), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Modules.getPaymentMethods",
                            reason: "external service error"
                        }
                    }), Promise.reject(e)
                }
            }

            async getIssuers(e) {
                const t = zr({methodName: "getIssuers", incomingParams: e});
                if (t.length > 0) throw t;
                const {bin: r, paymentMethodId: i, product_id: n = c.getProductId(), ...o} = e;
                try {
                    return await this.services.getIssuers({bin: Xr(r), payment_method_id: i, product_id: n, ...o})
                } catch (e) {
                    return console.error("failed to get indetification types", e), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Modules.getIssuers",
                            reason: "external service error"
                        }
                    }), Promise.reject(e)
                }
            }

            async getInstallments(e) {
                const t = zr({methodName: "getInstallments", incomingParams: e});
                if (t.length > 0) throw t;
                const {
                    bin: r,
                    processingMode: i = s,
                    paymentTypeId: n = "",
                    product_id: o = c.getProductId(),
                    ...a
                } = e;
                try {
                    return await this.services.getInstallments({
                        bin: Xr(r),
                        processing_mode: i,
                        payment_type_id: n,
                        product_id: o, ...a
                    })
                } catch (e) {
                    return console.error("failed to get indetification types", e), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Modules.getInstallments",
                            reason: "external service error"
                        }
                    }), Promise.reject(e)
                }
            }

            async createCardToken(e, t) {
                if (!Br()) return Promise.reject("MercadoPago.js - Your payment cannot be processed because the website contains credit card data and is not using a secure connection.SSL certificate is required to operate.");
                const r = zr({methodName: "createCardToken", incomingParams: e, validateFieldsParams: t});
                if (r.length > 0) throw r;
                Yr(e);
                try {
                    return await this.services.createCardToken(e)
                } catch (e) {
                    return console.error("failed to get indetification types", e), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Modules.createCardToken",
                            reason: "external service error"
                        }
                    }), Promise.reject(e)
                }
            }

            async updateCardToken(e, t) {
                if (!Br()) return Promise.reject("MercadoPago.js - Your payment cannot be processed because the website contains credit card data and is not using a secure connection.SSL certificate is required to operate.");
                const r = zr({methodName: "updateCardToken", incomingParams: e, validateFieldsParams: t});
                if (r.length > 0) throw r;
                Yr(e);
                try {
                    return await this.services.updateCardToken(e)
                } catch (e) {
                    return console.error("failed to get indetification types", e), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_CRITICAL,
                            origin: "Modules.updateCardToken",
                            reason: "external service error"
                        }
                    }), Promise.reject(e)
                }
            }
        }

        function Yr(e) {
            const t = e.cardExpirationYear;
            2 === t?.length && (e.cardExpirationYear = `20${t}`)
        }

        const $r = {
            amount: {
                empty: {code: "000", message: "parameter amount can not be null/empty"},
                invalid: {code: "000", message: "invalid parameter amount"}
            },
            bin: {
                empty: {code: "000", message: "parameter bin can not be null/empty"},
                invalid: {code: "000", message: "invalid parameter bin"}
            },
            paymentMethodId: {
                empty: {code: "000", message: "parameter paymentMethodId can not be null/empty"},
                invalid: {code: "000", message: "invalid parameter paymentMethodId"}
            },
            processingMode: {
                empty: {code: "000", message: "parameter processingMode can not be null/empty"},
                invalid: {code: "000", message: "invalid parameter processingMode"}
            },
            cardNumber: {
                empty: {code: "205", message: "parameter cardNumber can not be null/empty"},
                invalid: {code: "E301", message: "invalid parameter cardNumber"}
            },
            cardExpirationMonth: {
                empty: {code: "208", message: "parameter cardExpirationMonth can not be null/empty"},
                invalid: {code: "325", message: "invalid parameter cardExpirationMonth"},
                allowed: {code: "XXX", message: "field cardExpirationMonth cannot coexist with cardExpirationDate"}
            },
            cardExpirationYear: {
                empty: {code: "209", message: "parameter cardExpirationYear can not be null/empty"},
                invalid: {code: "326", message: "invalid parameter cardExpirationYear"},
                allowed: {code: "XXX", message: "field cardExpirationYear cannot coexist with cardExpirationDate"}
            },
            cardExpirationDate: {
                allowed: {
                    code: "XXX",
                    message: "field cardExpirationDate cannot coexist with cardExpirationMonth or cardExpirationYear"
                }
            },
            identificationType: {
                empty: {code: "212", message: "parameter identificationType can not be null/empty"},
                invalid: {code: "322", message: "invalid parameter identificationType"}
            },
            identificationNumber: {
                empty: {
                    code: "214",
                    message: "parameter identificationNumber can not be null/empty"
                }, invalid: {code: "324", message: "invalid parameter identificationNumber"}
            },
            cardIssuerId: {empty: {code: "220", message: "parameter cardIssuerId can not be null/empty"}},
            cardholderName: {
                empty: {code: "221", message: "parameter cardholderName can not be null/empty"},
                invalid: {code: "316", message: "invalid parameter cardholderName"}
            },
            securityCode: {
                empty: {code: "224", message: "parameter securityCode can not be null/empty"},
                invalid: {code: "E302", message: "invalid parameter securityCode"}
            },
            default: {code: "default", message: "Another error"}
        }, Ur = {
            processingMode: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => a.includes(e), required: t}
            }, bin: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => /^\d{6,16}$/.test(e), required: t}
            }, amount: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => /([0-9]*[.])?[0-9]+/.test(e), required: t}
            }, locale: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => /^[a-z]{2}-[A-Z]{2}$/.test(e), required: t}
            }, cardNumber: e => {
                let {required: t} = e;
                return {
                    type: "string",
                    validateFn: e => !isNaN(Number(e)) && e.length > 8 && e.length < 19,
                    required: t
                }
            }, paymentMethodId: e => {
                let {required: t} = e;
                return {type: "string", required: t}
            }, cardIssuerId: e => {
                let {required: t} = e;
                return {type: "string", required: t}
            }, cardholderName: e => {
                let {required: t} = e;
                return {
                    type: "string",
                    validateFn: e => /^[a-zA-Z0-9ãÃáÁàÀâÂäÄẽẼéÉèÈêÊëËĩĨíÍìÌîÎïÏõÕóÓòÒôÔöÖũŨúÚùÙûÛüÜçÇ’ñÑ .'-]*$/.test(e),
                    required: t
                }
            }, cardholderEmail: e => {
                let {required: t} = e;
                return {
                    type: "string",
                    validateFn: e => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e),
                    required: t
                }
            }, identificationType: e => {
                let {required: t} = e;
                return {type: "string", required: t}
            }, identificationNumber: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => /^[a-zA-Z\d]*$/.test(e), required: t}
            }, securityCode: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => /^\d*$/.test(e), required: t}
            }, cardExpirationMonth: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => /(0[1-9]|1[0-2])/.test(e), required: t}
            }, cardExpirationYear: e => {
                let {required: t} = e;
                return {type: "string", validateFn: e => /^\d{2}(\d{2})?$/.test(e), required: t}
            }
        }, qr = {
            getPaymentMethods: () => ({bin: Ur.bin({required: !0}), processingMode: Ur.processingMode({required: !1})}),
            getIssuers: () => ({paymentMethodId: Ur.paymentMethodId({required: !0}), bin: Ur.bin({required: !0})}),
            getInstallments: () => ({
                bin: Ur.bin({required: !0}),
                amount: Ur.amount({required: !0}),
                processingMode: Ur.processingMode({required: !1}),
                locale: Ur.locale({required: !1}),
                paymentMethodId: Ur.paymentMethodId({required: !1}),
                cardIssuerId: Ur.cardIssuerId({required: !1})
            }),
            createCardToken: (e, t) => {
                const r = e?.get("additional_info_needed"), i = e?.get("security_code");
                return {
                    cardNumber: Ur.cardNumber({required: t?.cardNumber}),
                    cardholderName: Ur.cardholderName({required: r?.includes("cardholder_name")}),
                    cardholderEmail: Ur.cardholderEmail({required: !1}),
                    identificationType: Ur.identificationType({required: r?.includes("cardholder_identification_type")}),
                    identificationNumber: Ur.identificationNumber({required: r?.includes("cardholder_identification_number")}),
                    securityCode: Ur.securityCode({required: "mandatory" === i?.mode && t?.securityCode}),
                    cardExpirationMonth: Ur.cardExpirationMonth({required: t?.cardExpirationMonth}),
                    cardExpirationYear: Ur.cardExpirationYear({required: t?.cardExpirationYear})
                }
            },
            updateCardToken: (e, t) => {
                const r = e?.get("security_code");
                return {
                    securityCode: Ur.securityCode({required: "mandatory" === r?.mode && t?.securityCode}),
                    cardExpirationMonth: Ur.cardExpirationMonth({required: t?.cardExpirationMonth}),
                    cardExpirationYear: Ur.cardExpirationYear({required: t?.cardExpirationYear})
                }
            }
        }, zr = e => {
            let {methodName: t, incomingParams: r, validateFieldsParams: i} = e;
            const n = new Jr, o = ((e, t, r) => qr[e](t, r))(t, ni.getContext("cardSettings"), i),
                a = ["identificationType", "identificationNumber"];
            return o || n.addError({
                ...$r.default,
                description: `Could not find validation for ${t}`
            }), r && "object" == typeof r ? (Object.entries(o).forEach((e => {
                let [t, i] = e;
                const o = r[t];
                (o || !a.includes(t)) && n.addErrors(Vr({field: t, value: o, config: i}))
            })), n.getErrors()) : (n.addError({
                ...$r.default,
                description: "Expecting an object as argument"
            }), n.getErrors())
        }, Vr = e => {
            let {field: t, value: r, config: i} = e;
            const n = new Jr;
            if (!i) {
                const e = Ur[t];
                if (!e) return n.addError({
                    ...$r.default,
                    description: `Could not find validation for ${t}`
                }), n.getErrors();
                i = e({required: !0})
            }
            const {type: o, required: a, validateFn: s} = i, c = $r[t]?.invalid || $r.default,
                d = $r[t]?.empty || $r.default;
            return !r && a ? (n.addError(Kr(d, t)), n.getErrors()) : r ? (r && typeof r !== o && n.addError(Kr(c, t)), s && !s(r) && n.addError(Kr(c, t)), n.getErrors()) : n.getErrors()
        }, Kr = (e, t) => {
            if (t.includes("cardE")) {
                const r = ni.getContext("expirationFields");
                if (!r) return e;
                const i = r.has(t.replace("cardE", "e")) || r.has("expirationDate");
                e.message.includes("cardE") && i && (e.message = e.message.replace("cardE", "e"))
            }
            return e
        }, Br = () => {
            const e = c.getPublicKey();
            return "https:" === window?.location?.protocol || /^TEST/.test(e)
        }, Gr = () => {
            const e = document.querySelector("html");
            return e && e.lang ? e.lang : window.navigator?.language || window.navigator?.languages?.[0] || window.navigator?.browserLanguage || window.navigator?.userLanguage || window.navigator?.systemLanguage
        }, Hr = e => e.replace(/\D+/g, ""), Xr = e => e.slice(0, 8);

        class Jr {
            constructor() {
                (function (e, t, r) {
                    t = function (e) {
                        var t = function (e, t) {
                            if ("object" != typeof e || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var i = r.call(e, "string");
                                if ("object" != typeof i) return i;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(e);
                        return "symbol" == typeof t ? t : t + ""
                    }(t), t in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r
                })(this, "errors", void 0), this.errors = []
            }

            addError(e) {
                this.errors.push(e)
            }

            getErrors() {
                return this.errors
            }

            addErrors(e) {
                this.errors = [...this.errors, ...e]
            }
        }

        function Zr(e) {
            return "string" == typeof e ? [{message: e}] : e instanceof ProgressEvent ? [{message: "Failed to fetch"}] : Array.isArray(e) ? e.map((e => {
                let {message: t} = e;
                return {message: t}
            })) : [{message: e?.message || "Unknown error"}]
        }

        var Qr;

        function ei(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        class ti {
        }

        Qr = ti, ei(ti, "tracker", void 0), ei(ti, "ERROR_TYPE_WARNING", "warning"), ei(ti, "ERROR_TYPE_CRITICAL", "critical"), ei(ti, "ERROR_TYPE_INTEGRATION", "integration"), ei(ti, "TRACK_TYPE_VIEW", "VIEW"), ei(ti, "TRACK_TYPE_EVENT", "EVENT"), ei(ti, "init", (e => {
            let {version: t, siteId: r} = e;
            try {
                const e = {appName: "sdk_js", version: t || "", siteId: r};
                Qr.tracker = new jt(e)
            } catch (e) {
                console.warn("Failed on init TrackerClient")
            }
        })), ei(ti, "setContext", (e => {
            let {siteId: t, advancedFraudPrevention: r, locale: i, publicKey: n, version: o} = e;
            try {
                Qr.tracker || Qr.init({version: o, siteId: t}), Qr.tracker.melidata().addContext({
                    instance_id: et(),
                    public_key: n,
                    is_test_user: n.startsWith("TEST-"),
                    locale: i || "",
                    is_advanced_fraud_prevention_enabled: Boolean(r),
                    user_agent: yt(navigator.userAgent),
                    hostname: Tr
                })
            } catch {
                console.warn("Failed to set context on TrackerClient")
            }
        })), ei(ti, "send", (e => {
            let {path: t, type: r, eventData: i} = e;
            try {
                Qr.tracker && Qr.tracker.melidata().send(`/checkout/api_integration${t}`, {type: r, event_data: i})
            } catch {
                console.warn("Failed to send track on TrackerClient")
            }
        })), ei(ti, "sendError", (e => {
            let {type: t, eventData: r} = e;
            try {
                Qr.tracker && Qr.tracker.melidata().send("/checkout/api_integration/error", {type: t, event_data: r})
            } catch {
                console.warn("Failed to send track on TrackerClient")
            }
        }));
        const ri = ti;
        let ii = {};

        class ni {
            static createContext(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (ii[e]) {
                    const t = `Context '${e}' already exists`;
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_INTEGRATION, origin: "Context.createContext", reason: t}
                    }), new Error(t)
                }
                return ii[e] = new Map(Object.entries(t)), ii[e]
            }

            static getContext(e) {
                return ii[e]
            }

            static deleteContext(e) {
                delete ii[e]
            }

            static destroyContexts() {
                ii = {}
            }
        }

        function oi(e) {
            let {securityCode: t, cardExpirationMonth: r, cardExpirationYear: i} = e;
            const n = {security_code: t, expiration_month: parseInt(r, 10), expiration_year: parseInt(i, 10)},
                o = c.getDeviceProfile();
            return o && (n.device = {meli: {session_id: o}}), n
        }

        const ai = class {
            getIdentificationTypes() {
                return (async () => {
                    const e = await Mr.fetch("/identification_types");
                    return await e.json()
                })()
            }

            getInstallments(e) {
                return (async e => {
                    const t = await Mr.fetch("/payment_methods/installments", {method: "GET", query: {...e}});
                    return await t.json()
                })(e)
            }

            getPaymentMethods(e) {
                return (async e => {
                    const t = await Mr.fetch("/payment_methods/search", {
                        method: "GET",
                        query: {marketplace: "NONE", status: "active", product_id: c.getProductId(), ...e}
                    });
                    return await t.json()
                })(e)
            }

            getIssuers(e) {
                return (async e => {
                    const t = await Mr.fetch("/payment_methods/card_issuers", {method: "GET", query: e});
                    return await t.json()
                })(e)
            }

            createCardToken(e) {
                return (async e => {
                    const t = await Mr.fetch("/card_tokens", {
                        method: "POST",
                        headers: {"X-Product-Id": c.getProductId()},
                        body: JSON.stringify(wr(e))
                    });
                    return await t.json()
                })(e)
            }

            updateCardToken(e) {
                return (async e => {
                    const {securityCode: t, cardExpirationMonth: r, cardExpirationYear: i, token: n} = e,
                        o = await Mr.fetch(`/card_tokens/${n}`, {
                            method: "PUT",
                            headers: {"X-Product-Id": c.getProductId()},
                            body: JSON.stringify(oi({securityCode: t, cardExpirationMonth: r, cardExpirationYear: i}))
                        });
                    return await o.json()
                })(e)
            }
        };

        function si(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var ci = new WeakMap;

        class di {
            constructor() {
                var e, t;
                (function (e, t, r) {
                    !function (e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    }(e, t), t.set(e, r)
                })(this, ci, void 0), e = ci, t = new ai, e.set(si(e, this), t)
            }

            async getSiteId() {
                const e = await (t = ci, this, t.get(si(t, this))).getPaymentMethods({limit: 1});
                var t;
                if (0 === e.results.length) {
                    const e = "Payment methods returned empty results";
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_CRITICAL, origin: "RemoteSiteIdApi.getSiteId", reason: e}
                    }), new Error(e)
                }
                const r = e.results.find((e => e.site_id))?.site_id;
                if (!r) {
                    const e = "Could not get valid siteId";
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_WARNING, origin: "RemoteSiteIdApi.getSiteId", reason: e}
                    }), new Error(e)
                }
                return r
            }
        }

        function li(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var ui = new WeakMap;

        class pi {
            constructor(e) {
                var t, r;
                (function (e, t, r) {
                    !function (e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    }(e, t), t.set(e, r)
                })(this, ui, void 0), r = e, (t = ui).set(li(t, this), r)
            }

            getURL(e, t) {
                const r = new URL((this, (i = ui).get(li(i, this)) + e));
                var i;
                return t ? (Object.entries(t).forEach((e => {
                    let [t, i] = e;
                    return r.searchParams.append(t, i)
                })), r.href) : r.href
            }

            assignDefaultRequestOptions(e) {
                return Object.assign({method: "GET", retry: !0, numOfRetries: 3}, e)
            }

            mapToHttpResponse(e) {
                return Object.assign({}, e)
            }

            async executeCall(e, t) {
                try {
                    const r = this.assignDefaultRequestOptions(t), {retry: i = !1, numOfRetries: n} = r;
                    let o = n || 0;
                    do {
                        const t = await Be(this.getURL(e, r.queryParams), r);
                        if (t.ok || this.isClientError(t.status)) return this.mapToHttpResponse(t)
                    } while (i && --o > 0);
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_WARNING,
                            origin: "HttpClient.executeCall",
                            reason: `Exceeded number of retries: ${n}`
                        }
                    }), new Error(`Exceeded number of retries: ${n}`)
                } catch (e) {
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_WARNING, origin: "HttpClient.executeCall", reason: e.message}
                    }), new Error(e.message)
                }
            }

            isClientError(e) {
                return e >= 400 && e <= 499
            }
        }

        var hi = i(606);
        const mi = {
            beta: {
                assetsBaseUrl: "https://http2.mlstatic.com/frontend-assets/op-cho-bricks",
                apiBaseUrl: "https://api.mercadopago.com/bricks/beta"
            },
            gama: {
                assetsBaseUrl: "https://http2.mlstatic.com/frontend-assets/op-cho-bricks",
                apiBaseUrl: "https://api.mercadopago.com/bricks/beta"
            },
            prod: {
                assetsBaseUrl: "https://http2.mlstatic.com/frontend-assets/op-cho-bricks",
                apiBaseUrl: "https://api.mercadopago.com/bricks"
            },
            lts: {
                assetsBaseUrl: "https://http2.mlstatic.com/frontend-assets/op-cho-bricks",
                apiBaseUrl: "https://api.mercadopago.com/bricks"
            },
            development: {
                assetsBaseUrl: "http://localhost:8081",
                apiBaseUrl: "https://api.mercadopago.com/bricks/beta"
            },
            development_bricks: {
                assetsBaseUrl: "http://localhost:8081",
                apiBaseUrl: "https://api.mercadopago.com/bricks/beta"
            },
            development_bricks_local: {
                assetsBaseUrl: "http://localhost:8081",
                apiBaseUrl: "http://localhost:8080/bricks"
            }
        };

        function fi() {
            const e = "prod", t = hi.env.API_SOURCE;
            return mi[t ? `${e}_${t}` : e] || mi.prod
        }

        function gi(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function yi(e, t) {
            return e.get(wi(e, t))
        }

        function wi(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var vi = new WeakMap, bi = new WeakMap, Ei = new WeakMap, Ti = new WeakMap;

        class _i {
            constructor() {
                var e, t, r;
                gi(this, vi, void 0), gi(this, bi, "en"), gi(this, Ei, ["en", "es", "pt"]), gi(this, Ti, {
                    "es-ar": "es-ar",
                    "es-cl": "es-cl",
                    "es-co": "es-co",
                    "es-mx": "es-mx",
                    "es-ve": "es",
                    "es-uy": "es-uy",
                    "es-pe": "es-pe",
                    "pt-br": "pt",
                    "en-us": "en"
                }), e = vi, r = fi().assetsBaseUrl, t = new pi(r), e.set(wi(e, this), t)
            }

            containsInLocales(e) {
                return Object.keys(yi(Ti, this)).includes(e)
            }

            isFallbackLocale(e) {
                return yi(Ei, this).some((t => t === e))
            }

            getFallbackLocale(e) {
                for (let t = 0; t < yi(Ei, this).length; t++) {
                    const r = yi(Ei, this)[t];
                    if (e.startsWith(r)) return r
                }
                return yi(bi, this)
            }

            validateLocale(e) {
                const t = e.toLowerCase().match(/^[a-z]{2}(-[a-z]{2})?$/), r = t ? t[0] : "";
                let i;
                if (this.containsInLocales(r)) i = yi(Ti, this)[r]; else if (this.isFallbackLocale(r)) i = r; else {
                    i = this.getFallbackLocale(r);
                    const e = `[BRICKS] The requested locale '${r}' is not supported. The selected fallback locale was '${i}'.`;
                    console.warn(e)
                }
                return i
            }

            async getTranslation(e, t) {
                const r = `/build/2.2.1/i18n/${this.validateLocale(t)}/${e}/index.json`,
                    i = await yi(vi, this).executeCall(r);
                if (!i.ok) {
                    const t = `Could not fetch remote ${e} translation. Status: ${i.status}`;
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_WARNING,
                            origin: "RemoteTranslationApi.getTranslation",
                            reason: t
                        }
                    }), new Error(t)
                }
                return await i.json()
            }
        }

        function ki(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        const Ci = "2147483647";

        class Mi {
            constructor(e) {
                let {
                    id: t,
                    src: r,
                    styles: i,
                    render: n = !0,
                    container: o,
                    showLoader: a = !0,
                    hidden: s = !1,
                    bodyOverflow: c = !0,
                    closeButton: d = !1
                } = e;
                ki(this, "id", void 0), ki(this, "src", void 0), ki(this, "hidden", void 0), ki(this, "closeButton", void 0), ki(this, "styles", void 0), ki(this, "bodyOverflow", void 0), ki(this, "showLoader", void 0), ki(this, "spinner", void 0), ki(this, "wrapper", void 0), ki(this, "container", void 0), ki(this, "el", void 0), this.id = t, this.src = r, this.hidden = s, this.closeButton = d, this.styles = i || {}, this.bodyOverflow = c, this.showLoader = a, this.spinner = this.showLoader && this.createSpinner(), this.wrapper = this.createWrapper(), this.el = null, this.container = o, this.attachStylesAndWrapper(), n && (this.el = this.create(), this.render())
            }

            createWrapper() {
                const e = document.createElement("div");
                return e.classList.add(`mp-${this.id}-wrapper`), this.showLoader && (e.innerHTML = '\n        <svg class="mp-spinner" viewBox="25 25 50 50" >\n          <circle class="mp-spinner-path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" />\n        </svg>\n      '), e.setAttribute("style", this.styles.wrapper), e
            }

            create() {
                const e = document.createElement("iframe");
                return e.id = this.id, e.src = this.src, e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), this.styles.iframe && e.setAttribute("style", this.styles.iframe), e.frameBorder = "0", e.setAttribute("transition", "height 2s ease"), e
            }

            createSpinner() {
                const e = document.createElement("style");
                return e.setAttribute("type", "text/css"), e.innerHTML = "\n  @keyframes loading-rotate {\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n  @keyframes loading-dash {\n    0% {\n      stroke-dasharray: 1, 200;\n      stroke-dashoffset: 0;\n    }\n    50% {\n      stroke-dasharray: 100, 200;\n      stroke-dashoffset: -20px;\n    }\n    100% {\n      stroke-dasharray: 89, 200;\n      stroke-dashoffset: -124px;\n    }\n  }\n\n  @keyframes loading-fade-in {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  .mp-spinner {\n    position: absolute;\n    top: 100px;\n    left: 50%;\n    font-size: 70px;\n    margin-left: -35px;\n    animation: loading-rotate 2.5s linear infinite;\n    transform-origin: center center;\n    width: 1em;\n    height: 1em;\n  }\n\n  .mp-spinner-path {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n    animation: loading-dash 1.5s ease-in-out infinite;\n    stroke-linecap: round;\n    stroke-width: 2px;\n    stroke: #009ee3;\n  }\n", e
            }

            attachStylesAndWrapper() {
                this.spinner && document.head.appendChild(this.spinner), this.container.appendChild(this.wrapper)
            }

            render() {
                return this.el || (this.el = this.create()), this.wrapper.appendChild(this.el), this.open(), this
            }

            onLoad(e) {
                return "function" == typeof e && (this.el.onload = e), this
            }

            open() {
                if (this.wrapper.style["z-index"] = Ci, this.wrapper.style.visibility = "visible", this.wrapper.style.width = "100%", this.wrapper.style.height = "100%", this.wrapper.style.opacity = this.hidden ? "0" : "1", this.hidden = !1, this.bodyOverflow && (document.body.style.overflow = "hidden"), this.closeButton && !this.wrapper.querySelector("span") && !this.wrapper.querySelector("style")) {
                    const e = document.createElement("style"), t = document.createElement("span");
                    e.setAttribute("type", "text/css"), t.addEventListener("click", (() => window.postMessage({type: "close"}, "*"))), e.innerHTML = '\n.close-button {\n  position: absolute;\n  right: 15px;\n  top: 15px;\n  width: 20px;\n  height: 20px;\n  opacity: 0.6;\n}\n.close-button:hover {\n  opacity: 1;\n}\n.close-button:before, .close-button:after {\n  position: absolute;\n  left: 15px;\n  content: " ";\n  height: 20px;\n  width: 2px;\n  background-color: #fff;\n}\n.close-button:before {\n  transform: rotate(45deg);\n}\n.close-button:after {\n  transform: rotate(-45deg);\n}\n', t.classList.add("close-button"), this.wrapper.appendChild(e), this.wrapper.appendChild(t)
                }
            }

            slideUp() {
                this.wrapper.style.opacity = 1, this.el.style.bottom = 0
            }

            remove(e) {
                this.wrapper.style.opacity = "0", window.setTimeout((() => {
                    this.el.parentNode.removeChild(this.el), this.wrapper.style["z-index"] = `-${Ci}`, this.wrapper.style.visibility = "hidden", this.wrapper.style.width = "0", this.wrapper.style.height = "0", document.body.style.overflow = ""
                }), 220), "function" == typeof e && e()
            }

            resize(e) {
                const t = Math.min(e, .8 * document.documentElement.clientHeight);
                this.el.style.maxHeight = `${t}px`, this.el.style.minHeight = `${t}px`
            }
        }

        function Pi(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        function Ri(e, t) {
            return e.get(function (e, t, r) {
                if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
                throw new TypeError("Private element is not present on this object")
            }(e, t))
        }

        let Ii = `\n  .mercadopago-button {\n    padding: 0 ${24 / 14}em;\n    font-family: "Helvetica Neue", Arial, sans-serif;\n    font-size: 0.875em;\n    line-height: ${38 / 14};\n    background: #009ee3;\n    border-radius: ${4 / 14}em;\n    color: #fff;\n    cursor: pointer;\n    border: 0;\n  }\n`;
        const xi = `\n  #CONTAINER_SELECTOR# .mercadopago-button {\n    position: relative;\n    padding-left: ${68 / 14}em;\n    padding-right: ${32 / 14}em;\n    white-space: nowrap;\n    height: ${38 / 14}em;\n  }\n\n  #CONTAINER_SELECTOR# .mercadopago-button::before {\n    background-image: url("http://static.mlstatic.com/org-img/mercadopago/wallet_mp_icon.svg");\n    background-size: ${34 / 14}em ${34 / 14}em;\n    width: ${34 / 14}em;\n    height: ${34 / 14}em;\n    position: absolute;\n    top: ${2 / 14}em;\n    left: ${2 / 14}em;\n    content: "";\n  }\n`;
        var Ni = new WeakMap;

        class Ai {
            constructor(e) {
                Pi(this, "options", void 0), Pi(this, "el", void 0), Pi(this, "styles", void 0), function (e, t, r) {
                    !function (e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    }(e, t), t.set(e, r)
                }(this, Ni, ((e, t) => t.replace(/#CONTAINER_SELECTOR#/g, e))), this.options = e, this.el = this.create(), this.styles = this.createStyles()
            }

            createStyles() {
                "wallet" === this.options.type && (Ii += Ri(Ni, this).call(this, this.options.containerSelector, xi)), "credits" === this.options.type && (Ii += Ri(Ni, this).call(this, this.options.containerSelector, '\n  @font-face {\n    font-family: "Proxima Nova";\n    font-weight: 600;\n    font-style: normal;\n    src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff2) format("woff2"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff) format("woff"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.ttf) format("truetype")\n  }\n\n  #CONTAINER_SELECTOR# .mercadopago-button {\n    position: relative;\n    padding-left: 92px;\n    padding-right: 42px;\n    padding-top: 16px;\n    padding-bottom: 16px;\n    height: 72px;\n    max-width: 360px;\n    line-height: 20px;\n    text-align: left;\n    font-size: 16px;\n    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);\n    border-radius: 6px;\n    background-color: #fff;\n    color: #000;\n    font-family: "Proxima Nova";\n  }\n\n  #CONTAINER_SELECTOR# .mercadopago-button::before {\n    background-image: url("http://static.mlstatic.com/org-img/mercadopago/wallet_mp_icon.svg");\n    background-size: 32px;\n    backgroud-color: #fff;\n    background-repeat: no-repeat;\n    background-position: center;\n    border: 1px solid rgba(0, 0, 0, 0.1);\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    position: absolute;\n    top: 16px;\n    left: 20px;\n    content: "";\n  }\n\n  #CONTAINER_SELECTOR# .mercadopago-button::after {\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 80px;\n    content: "";\n    border-left: 1px solid rgba(0, 0, 0, 0.1);\n  }\n'));
                const e = document.createElement("style");
                return e.setAttribute("type", "text/css"), e.innerHTML = Ii, e
            }

            create() {
                const e = document.createElement("button");
                return e.setAttribute("type", "submit"), e.className = "mercadopago-button", e.textContent = this.options.label || "Pagar", e.setAttribute("formmethod", "post"), e
            }

            render(e) {
                const t = e.childNodes;
                0 === e.childNodes.length ? e.appendChild(this.el) : e.insertBefore(this.el, t[t.length - 1].nextSibling), document.head.appendChild(this.styles)
            }
        }

        const Oi = {
            toUrl: e => Object.keys(e).map((t => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`)).join("&"),
            toCSS: e => {
                let t = "";
                return void 0 !== e && "object" == typeof e && Object.keys(e).forEach((r => {
                    Object.prototype.hasOwnProperty.call(e, r) && (t += `${r}:${e[r]};`)
                })), t
            }
        }, ji = Oi, Fi = (e, t, r) => {
            if (e) return e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent(`on${t}`, r)
        }, Di = {
            "internal-configurations": "internalConfigurations",
            "header-color": "theme.headerColor",
            "elements-color": "theme.elementsColor"
        }, Si = {
            "public-key": "tokenizer.publicKey",
            "transaction-amount": "tokenizer.totalAmount",
            "summary-product": "tokenizer.summary.product",
            "summary-product-label": "tokenizer.summary.productLabel",
            "summary-discount": "tokenizer.summary.discount",
            "summary-discount-label": "tokenizer.summary.discountLabel",
            "summary-charge": "tokenizer.summary.charge",
            "summary-taxes": "tokenizer.summary.taxes",
            "summary-arrears": "tokenizer.summary.arrears",
            "summary-shipping": "tokenizer.summary.shipping",
            "summary-title": "tokenizer.summary.title",
            "summary-total-label": "tokenizer.summary.totalLabel",
            "button-confirm-label": "tokenizer.buttonConfirmLabel",
            "customer-id": "tokenizer.savedCards.customerId",
            "payer-id": "tokenizer.savedCards.payerId",
            "card-ids": "tokenizer.savedCards.cardIds",
            "default-card-id": "tokenizer.savedCards.defaultCardId",
            "differential-pricing-id": "tokenizer.differentialPricingId",
            "excluded-payment-methods": "tokenizer.exclusions.paymentMethods",
            "excluded-payment-types": "tokenizer.exclusions.paymentTypes",
            "express-flow": "tokenizer.expressFlow",
            "processing-modes": "tokenizer.processingModes",
            "min-installments": "tokenizer.installments.minInstallments",
            "max-installments": "tokenizer.installments.maxInstallments",
            "trial-payment": "tokenizer.trialPayment",
            "alternative-payment": "tokenizer.alternativePayment",
            action: "tokenizer.backUrl"
        }, Li = {
            "preference-id": "preference.id",
            "summary-title": "summary.title",
            "summary-total-label": "summary.totalLabel",
            "button-confirm-label": "buttonConfirmLabel",
            "total-amount": "preference.totalAmount"
        }, Wi = (e, t) => {
            const r = {};
            return Object.keys(t).filter((e => !tt() && "action" !== e || tt())).forEach((i => {
                const n = ((e, t) => t.split(".").reduce(((e, t) => e && e[t] ? e[t] : null), e))(e, t[i]);
                n && (r[i] = n)
            })), r
        }, Yi = function () {
            return Wi(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, {...Di, ...Li})
        }, $i = function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return e.tokenizer.publicKey = c.getPublicKey(), Wi(e, {...Di, ...Si})
        }, Ui = {
            MLA: "https://mercadopago.com.ar/checkout/v1/",
            MLB: "https://mercadopago.com.br/checkout/v1/",
            MLM: "https://mercadopago.com.mx/checkout/v1/",
            MLU: "https://mercadopago.com.uy/checkout/v1/",
            MCO: "https://mercadopago.com.co/checkout/v1/",
            MLC: "https://mercadopago.cl/checkout/v1/",
            MPE: "https://mercadopago.com.pe/checkout/v1/",
            MLV: "https://mercadopago.com.ve/checkout/v1/"
        }, qi = async (e, t) => {
            const r = c.getSiteId(), i = "Failed to get the site id", n = "modal" === e ? "&from-widget=true" : "";
            if (r) return `${Ui[r]}${e}?${ji.toUrl(t)}${n}`;
            throw ri.sendError({
                type: ri.TRACK_TYPE_EVENT,
                eventData: {type: ri.ERROR_TYPE_CRITICAL, origin: "domHelper.getHTMLElementFrom", reason: i}
            }), new Error(i)
        }, zi = {
            wrapper: ji.toCSS({
                "z-index": "-2147483647",
                display: "block",
                background: "rgba(0, 0, 0, 0.7)",
                border: "0",
                overflow: "hidden",
                visibility: "hidden",
                margin: "0",
                padding: "0",
                position: "fixed",
                left: "0",
                top: "0",
                width: "0",
                opacity: "0",
                height: "0",
                transition: "opacity 220ms ease-in"
            }), iframe: ji.toCSS({"z-index": "1", display: "block", position: "fixed", left: "0", top: "0"})
        };

        function Vi(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        function Ki(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Bi(e, t) {
            return e.get(Hi(e, t))
        }

        function Gi(e, t, r) {
            return e.set(Hi(e, t), r), r
        }

        function Hi(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var Xi = new WeakMap, Ji = new WeakMap, Zi = new WeakMap, Qi = new WeakMap, en = new WeakMap, tn = new WeakMap,
            rn = new WeakMap, nn = new WeakMap, on = new WeakMap, an = new WeakMap, sn = new WeakMap, cn = new WeakMap,
            dn = new WeakMap, ln = new WeakMap, un = new WeakMap, pn = new WeakMap, hn = new WeakMap, mn = new WeakMap,
            fn = new WeakMap, gn = new WeakMap, yn = new WeakMap;

        class wn {
            constructor(e, t) {
                Ki(this, Xi, void 0), Ki(this, Ji, void 0), Ki(this, Zi, void 0), Ki(this, Qi, void 0), Ki(this, en, void 0), Ki(this, tn, void 0), Ki(this, rn, void 0), Ki(this, nn, void 0), Ki(this, on, void 0), Ki(this, an, void 0), Ki(this, sn, void 0), Ki(this, cn, void 0), Ki(this, dn, void 0), Ki(this, ln, void 0), Ki(this, un, (async e => {
                    let t;
                    return await Bi(dn, this), Bi(en, this) ? (t = $i(e), Gi(tn, this, e.tokenizer && e.tokenizer.backUrl ? e.tokenizer.backUrl : null)) : t = Yi(e), qi(Bi(rn, this), t)
                })), Ki(this, pn, (e => {
                    e && e.value && Array.isArray(e.value) ? e.value.forEach((e => {
                        "back_url" === e.id ? window.location.href = e.value : Bi(Xi, this).remove()
                    })) : Bi(Xi, this).remove(), Gi(cn, this, !1)
                })), Ki(this, hn, (e => {
                    Bi(en, this) && Bi(fn, this).call(this, e), Bi(Xi, this).remove()
                })), Ki(this, mn, (() => {
                    Fi(window, "message", (e => {
                        switch (e.data.type) {
                            case"submit":
                                Bi(hn, this).call(this, e.data);
                                break;
                            case"close":
                                Bi(pn, this).call(this, e.data)
                        }
                    }))
                })), Ki(this, fn, (e => {
                    Gi(Qi, this, document.createElement("form")), Bi(Qi, this).action = Bi(tn, this), Bi(Qi, this).method = "POST", Bi(Qi, this).style.visibility = "hidden", e.value.forEach((e => {
                        const t = document.createElement("input");
                        t.name = e.id, t.value = e.value, Bi(Qi, this).appendChild(t)
                    })), document.body.appendChild(Bi(Qi, this)), Bi(Qi, this).submit()
                })), Ki(this, gn, (() => {
                    Fi(Bi(Zi, this).el, "click", (() => {
                        this.open()
                    }))
                })), Vi(this, "render", (async e => {
                    await Bi(dn, this), ri.send({
                        path: "/cho_pro/render",
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {integration_type: e.type || "default", preference_id: Bi(ln, this)}
                    });
                    let t = null, r = null;
                    if (Bi(sn, this)) throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_INTEGRATION,
                            origin: "Checkout.render",
                            reason: 'Already setting "render" from class constructor options'
                        }
                    }), new Error('MercadoPago.js - Already setting "render" from class constructor options');
                    if (!e.container) throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_INTEGRATION,
                            origin: "Checkout.render",
                            reason: "Must specify a container to render the Payment Button"
                        }
                    }), new Error("MercadoPago.js - Must specify a container to render the Payment Button");
                    Gi(Ji, this, document.querySelector(e.container)), e.label && (t = e.label), e.type && (r = e.type), Gi(Zi, this, new Ai({
                        label: t,
                        type: r,
                        containerSelector: e.container
                    })), Bi(gn, this).call(this), Bi(Zi, this).render(Bi(Ji, this))
                })), Ki(this, yn, (async e => {
                    Gi(ln, this, e.preference?.id || ""), Gi(on, this, await Bi(un, this).call(this, e))
                })), Vi(this, "open", (async e => {
                    if (await Bi(dn, this), e && await Bi(yn, this).call(this, e), ri.send({
                        path: "/cho_pro/open",
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {preference_id: Bi(ln, this)}
                    }), !Bi(on, this)) return Gi(nn, this, !0), console.warn("MercadoPago.js - You are using open() before checkout instantiation has resolved. Try using 'autoOpen' configuration instead"), void ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_INTEGRATION,
                            origin: "Checkout.open",
                            reason: "You are using open before checkout"
                        }
                    });
                    Bi(cn, this) ? console.warn("MercadoPago.js - There is already a checkout instance open") : (Gi(Xi, this, new Mi({
                        id: Bi(an, this),
                        src: Bi(on, this),
                        container: document.body,
                        render: Bi(nn, this),
                        styles: zi
                    })), "redirect" !== Bi(rn, this) ? (Gi(cn, this, !0), Bi(mn, this).call(this), Bi(Xi, this).render()) : Bi(on, this) && (window.location.href = Bi(on, this)))
                })), Gi(en, this, !!e.tokenizer), Gi(tn, this, null), Gi(rn, this, tt() ? "redirect" : "modal"), Gi(nn, this, !!e.autoOpen), Gi(an, this, "mercadopago-checkout"), Gi(sn, this, !1), Gi(cn, this, !1), Gi(dn, this, t), Gi(ln, this, e.preference?.id || ""), e.render && !Bi(nn, this) && this.render({
                    container: e.render.container,
                    openMode: e.render.openMode,
                    label: e.render.label,
                    type: e.render.type
                }).then((() => {
                    Gi(sn, this, !0)
                })), (e?.preference?.id || e?.tokenizer) && Bi(un, this).call(this, e).then((e => {
                    Gi(on, this, e), Bi(nn, this) && this.open()
                })).catch((e => {
                    console.warn("MercadoPago.js - There was an error creating a new checkout instance"), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {
                            type: ri.ERROR_TYPE_INTEGRATION,
                            origin: "Checkout",
                            reason: "There was an error creating a new checkout instance"
                        }
                    })
                }))
            }
        }

        const vn = {
            cardPayment: "cardPayment.js",
            payment: "payment.js",
            statusScreen: "statusScreen.js",
            wallet: "walletButton.js",
            brand: "ads.js"
        };

        function bn(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function En(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        function Tn(e, t) {
            return e.get(kn(e, t))
        }

        function _n(e, t, r) {
            return e.set(kn(e, t), r), r
        }

        function kn(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var Cn = new WeakMap, Mn = new WeakMap, Pn = new WeakMap, Rn = new WeakMap, In = new WeakMap, xn = new WeakMap,
            Nn = new WeakMap, An = new WeakMap, On = new WeakMap, jn = new WeakMap, Fn = new WeakMap, Dn = new WeakMap,
            Sn = new WeakMap;

        class Ln {
            constructor(e, t) {
                bn(this, Cn, void 0), bn(this, Mn, void 0), bn(this, Pn, void 0), bn(this, Rn, void 0), bn(this, In, void 0), bn(this, xn, void 0), bn(this, Nn, void 0), bn(this, An, void 0), bn(this, On, void 0), bn(this, jn, (async e => {
                    if (Tn(Rn, this) !== e.locale && (_n(Rn, this, e.locale), _n(In, this, await Tn(Sn, this).call(this))), !Tn(In, this) || !Tn(Nn, this)) {
                        const e = "translations or trackingManager not found";
                        throw ri.sendError({
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {
                                type: ri.ERROR_TYPE_CRITICAL,
                                origin: "BaseBricksComponent.validateSettings",
                                reason: e
                            }
                        }), Error(e)
                    }
                    return {
                        ...e,
                        restClient: Tn(An, this),
                        translation: Tn(In, this),
                        trackingManager: Tn(Nn, this),
                        siteId: Tn(On, this)
                    }
                })), bn(this, Fn, ((e, t) => {
                    const r = {
                        appName: Ln.TRACKING_APP_NAME_PREFIX + Tn(Cn, this),
                        clientName: Ln.FRONTEND_METRICS_CLIENT_NAME,
                        version: e || "",
                        siteId: t
                    };
                    _n(Nn, this, new jt(r)), Tn(Nn, this).melidata().addContext({scope: "prod"})
                })), bn(this, Dn, (async () => Tn(Mn, this).getSiteId().catch((e => {
                    const t = `Could not fetch site ID: ${e.message}`;
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_WARNING, origin: "BaseBricksComponent.fetchSiteID", reason: t}
                    }), new Error(t)
                })))), bn(this, Sn, (async () => Tn(Pn, this).getTranslation(Tn(Cn, this), Tn(Rn, this)))), _n(Cn, this, e), _n(Mn, this, new di), _n(Pn, this, new _i), _n(Rn, this, t), _n(An, this, Mr), _n(On, this, "")
            }

            async init() {
                try {
                    const [t, r, i] = await Promise.all([(e = Tn(Cn, this), new Promise(((t, r) => {
                        new Promise(((e, t) => {
                            const r = setTimeout(t, 5e3), i = () => {
                                clearTimeout(r), e()
                            };
                            document?.body ? i() : document.addEventListener("DOMContentLoaded", (() => {
                                if (document?.body) return i();
                                t()
                            }))
                        })).then((() => {
                            const i = (e => `${fi().assetsBaseUrl}/build/2.2.1/components/${vn[e]}`)(e),
                                n = document.createElement("script");
                            n.setAttribute("type", "text/javascript"), n.setAttribute("charset", "utf-8"), n.setAttribute("src", i), n.addEventListener("load", (() => ((e, t) => {
                                componentModule || t("Component module is empty"), e(componentModule.default.prototype)
                            })(t, r))), n.addEventListener("error", (() => r(`Could not load bundle ${e} from source: ${i}`))), document.body.appendChild(n)
                        })).catch((() => {
                            r("Could not find document.body")
                        }))
                    }))), Tn(Sn, this).call(this), Tn(Dn, this).call(this)]);
                    return _n(xn, this, t), _n(In, this, r), _n(On, this, i), Tn(Fn, this).call(this, "2.2.1", Tn(On, this)), Promise.resolve()
                } catch (e) {
                    let t = "";
                    return t = e instanceof Error ? e.message : String(e), ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_INTEGRATION, origin: "BaseBricksComponent.init", reason: t}
                    }), Promise.reject(e)
                }
                var e
            }

            async render(e, t, r) {
                if (!Tn(xn, this)) {
                    const e = "Remote component must be initialized before rendering";
                    throw ri.sendError({
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {type: ri.ERROR_TYPE_INTEGRATION, origin: "BaseBricksComponent.render", reason: e}
                    }), new Error(e)
                }
                const i = await Tn(jn, this).call(this, t);
                try {
                    return r.timing = performance.now() - r.timing, Tn(Nn, this)?.frontendMetrics().sendPerformanceMetric(r), Tn(xn, this).initialize(e, i)
                } catch (e) {
                    return console.error(e), Promise.resolve(null)
                }
            }
        }

        function Wn(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Yn(e, t) {
            return e.get(Un(e, t))
        }

        function $n(e, t, r) {
            return e.set(Un(e, t), r), r
        }

        function Un(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        En(Ln, "TRACKING_APP_NAME_PREFIX", "op-checkout-bricks_"), En(Ln, "FRONTEND_METRICS_CLIENT_NAME", "checkout_bricks");
        let qn = function (e) {
            return e.payment = "payment_brick", e.cardPayment = "card_payment_brick", e.wallet = "wallet_brick", e.statusScreen = "status_screen_brick", e.brand = "brand_brick", e
        }({});
        var zn = new WeakMap, Vn = new WeakMap, Kn = new WeakMap, Bn = new WeakMap, Gn = new WeakMap, Hn = new WeakMap,
            Xn = new WeakMap, Jn = new WeakMap, Zn = new WeakMap;

        class Qn {
            constructor(e, t) {
                var r = this;
                Wn(this, zn, void 0), Wn(this, Vn, void 0), Wn(this, Kn, void 0), Wn(this, Bn, void 0), Wn(this, Gn, (e => Object.keys(vn).includes(e))), Wn(this, Hn, (e => qn[e] || "")), Wn(this, Xn, (function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = {
                        ...t,
                        sdkInstance: Yn(Kn, r),
                        publicKey: c.getPublicKey(),
                        productId: c.getProductId(),
                        assetsBaseUrl: fi().assetsBaseUrl,
                        apiBaseUrl: fi().apiBaseUrl,
                        version: "2.2.1",
                        isMobile: tt(),
                        locale: t.locale || c.getLocale()
                    };
                    if (i.customization?.visual?.style) {
                        const {style: e} = i.customization.visual, t = e.theme || Yn(Bn, r).theme,
                            n = e.customVariables || Yn(Bn, r).customVariables;
                        i.customization.visual.style = {...t && {theme: t}, ...n && {customVariables: n}}
                    } else i.customization = {
                        ...i.customization || {},
                        visual: {...i.customization?.visual, style: Yn(Bn, r)}
                    };
                    return "wallet" === e && (i = Yn(Jn, r).call(r, i)), i
                })), Wn(this, Jn, (e => ({
                    ...e, checkout: new wn({preference: {id: ""}}, new Promise((e => {
                        e()
                    })))
                }))), Wn(this, Zn, (async (e, t, r, i) => e.render(t, r, i))), $n(Bn, this, e || {}), $n(Kn, this, t), $n(Vn, this, {}), $n(zn, this, !0)
            }

            isInitialized() {
                return Yn(zn, this)
            }

            async create(e, t, r) {
                const i = performance.now();
                if (!Yn(Gn, this).call(this, e)) return console.error(`[BRICKS]: component name: ${e} is invalid.`), Promise.resolve(null);
                const n = Yn(Hn, this).call(this, e);
                c.setProductId(yr(n));
                let o = Yn(Vn, this)[e];
                const a = Yn(Xn, this).call(this, e, r);
                if (!o) {
                    o = function (e, t) {
                        return new Ln(e, t)
                    }(e, a.locale);
                    try {
                        await o.init()
                    } catch (e) {
                        return console.error(e), Promise.resolve(null)
                    }
                    Yn(Vn, this)[e] = o
                }
                const s = {product: n, timing: i, name: "sdk_init"};
                return Yn(Zn, this).call(this, o, t, a, s)
            }
        }

        const eo = class {
            createYape(e) {
                return (async e => {
                    const t = {requestId: et(), ...e}, r = await Mr.fetch("/platforms/pci/yape/v1/payment", {
                        baseURL: "https://api.mercadopago.com",
                        retry: 0,
                        method: "POST",
                        body: JSON.stringify(t)
                    });
                    return await r.json()
                })(e)
            }
        };

        function to(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function ro(e, t) {
            return e.get(no(e, t))
        }

        function io(e, t, r) {
            return e.set(no(e, t), r), r
        }

        function no(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var oo = new WeakMap, ao = new WeakMap;

        class so {
            constructor(e) {
                to(this, oo, void 0), to(this, ao, void 0), io(ao, this, e), io(oo, this, new eo)
            }

            async create() {
                try {
                    return ri.send({
                        path: "/yape/create_token",
                        type: ri.TRACK_TYPE_EVENT
                    }), await ro(oo, this).createYape(ro(ao, this))
                } catch (e) {
                    return Promise.reject(e)
                }
            }
        }

        const co = ["public_key", "email", "totalAmount", "action", "cancelURL"],
            lo = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
        let uo = function (e) {
            return e.email = "email", e.action = "action", e.totalAmount = "total_amount", e.cancelURL = "cancel_url", e.public_key = "public_key", e
        }({});
        const po = [{
            path: "root",
            name: "type",
            type: "string",
            acceptedValues: ["webpay"],
            required: !0
        }, {
            path: "root",
            name: "email",
            type: "string",
            required: !0,
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        }, {path: "root", name: "totalAmount", type: "number", required: !0}, {
            path: "root",
            name: "action",
            type: "string",
            required: !0,
            pattern: lo
        }, {path: "root", name: "cancelURL", type: "string", required: !0, pattern: lo}];

        function ho(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var mo, fo, go, yo = new WeakMap;

        class wo {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    type: "",
                    email: "",
                    action: "",
                    totalAmount: ""
                };
                (function (e, t, r) {
                    !function (e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    }(e, t), t.set(e, r)
                })(this, yo, void 0), e.cancelURL || (e.cancelURL = window.top?.location.href || window.location.href);
                const t = (e => {
                    const t = new Jr;
                    return po.forEach((r => {
                        let {name: i, type: n, required: o, path: a, acceptedValues: s, pattern: c} = r;
                        const d = "root" === a ? e[i] : e[a]?.[i], l = typeof d,
                            u = (e => $r[e]?.invalid || $r.default)(i);
                        !d && o && t.addError({
                            ...u,
                            description: `Required field "${i}" is missing`
                        }), d && (l !== n && t.addError({
                            ...u,
                            description: `Type of ${i} must be ${n}. Received ${l}`
                        }), s && !s.includes(d) && t.addError({
                            ...u,
                            description: `Invalid option value "${d}". Available option(s): ${s.join(" or ")}`
                        }), c && !c.test(d) && t.addError({...u, description: `Invalid parameter "${i}"`}))
                    })), t.getErrors()
                })(e);
                if (t.length) throw t;
                var r, i;
                i = e, (r = yo).set(ho(r, this), i)
            }

            open() {
                ri.send({
                    path: "/tokenizer/open_url",
                    type: ri.TRACK_TYPE_EVENT
                }), window.location.href = this.getRedirectURL()
            }

            getRedirectURL() {
                return ri.send({path: "/tokenizer/generate_url", type: ri.TRACK_TYPE_EVENT}), (e => {
                    const t = new URL("https://www.mercadopago.cl/webpay-one-click/init"), r = (e, r) => {
                        r && t.searchParams.append(uo[e], r)
                    };
                    return co.forEach((t => {
                        if (Array.isArray(t)) {
                            const [i, n] = t;
                            e[i] && e[i][n] && r(n, e[i][n])
                        } else r(t, e[t])
                    })), t.href
                })({public_key: c.getPublicKey(), ...(e = yo, this, e.get(ho(e, this)))});
                var e
            }
        }

        function vo(e, t, r) {
            return t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        class bo {
            static isNumericText(e) {
                return this.NUMERIC_TEXT_REGEX.test(e)
            }

            static isRepeatedDigitText(e) {
                return this.DIGITS_SEQUENCE_REGEX.test(e)
            }

            static isAlphaNumeric(e) {
                return this.ALPHA_NUMERIC_REGEX.test(e)
            }

            static getNextCheckDigitMLB(e) {
                const t = e.split("").map((e => Number(e)));
                let r = 0, i = 2;
                for (let e = t.length - 1; e >= 0; e--) r += t[e] * i, i = 9 == i && t.length > 11 ? 2 : i + 1;
                const n = r % 11;
                return n < 2 ? 0 : 11 - n
            }
        }

        vo(bo, "NUMERIC_TEXT_REGEX", /^\d*$/), vo(bo, "DIGITS_SEQUENCE_REGEX", /^(\d)\1*$/), vo(bo, "ALPHA_NUMERIC_REGEX", /^[a-zA-Z0-9]+$/);

        class Eo {
            validate(e) {
                if (!bo.isNumericText(e)) return !1;
                if (7 != e.length && 8 != e.length) return !1;
                const t = parseInt(e[e.length - 1]);
                let r = 0;
                for (let t = 0; t < e.length - 1; t++) r += parseInt(e.substring(t, t + 1)) * Eo.ALGORITHM_FACTORS[t];
                return t === (10 - r % 10) % 10
            }
        }

        mo = Eo, go = [2, 9, 8, 7, 6, 3, 4], fo = function (e) {
            var t = function (e, t) {
                if ("object" != typeof e || !e) return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                    var i = r.call(e, "string");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(e)
            }(e);
            return "symbol" == typeof t ? t : t + ""
        }(fo = "ALGORITHM_FACTORS"), fo in mo ? Object.defineProperty(mo, fo, {
            value: go,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : mo[fo] = go;

        class To {
            validate(e) {
                if (!bo.isNumericText(e)) return !1;
                if (e.length != this.getDocumentLength()) return !1;
                if (bo.isRepeatedDigitText(e)) return !1;
                const t = this.getDocumentLength() - 1, r = bo.getNextCheckDigitMLB(e.substring(0, t - 1)),
                    i = bo.getNextCheckDigitMLB(e.substring(0, t));
                return e === e.substring(0, t - 1) + r + i
            }
        }

        class _o extends To {
            getDocumentLength() {
                return _o.DOCUMENT_LENGTH
            }
        }

        !function (e, t, r) {
            t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: 14,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = 14
        }(_o, "DOCUMENT_LENGTH");

        class ko extends To {
            getDocumentLength() {
                return ko.DOCUMENT_LENGTH
            }
        }

        function Co(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Mo(e, t) {
            return e.get(Ro(e, t))
        }

        function Po(e, t, r) {
            return e.set(Ro(e, t), r), r
        }

        function Ro(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        !function (e, t, r) {
            t = function (e) {
                var t = function (e, t) {
                    if ("object" != typeof e || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var i = r.call(e, "string");
                        if ("object" != typeof i) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == typeof t ? t : t + ""
            }(t), t in e ? Object.defineProperty(e, t, {
                value: 11,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = 11
        }(ko, "DOCUMENT_LENGTH");
        var Io = new WeakMap, xo = new WeakMap;

        class No {
            constructor(e, t) {
                Co(this, Io, void 0), Co(this, xo, void 0), Po(Io, this, e), Po(xo, this, t)
            }

            validate(e) {
                return !(!bo.isNumericText(e) || bo.isRepeatedDigitText(e)) && e.length >= Mo(Io, this) && e.length <= Mo(xo, this)
            }
        }

        function Ao(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Oo(e, t) {
            return e.get(Fo(e, t))
        }

        function jo(e, t, r) {
            return e.set(Fo(e, t), r), r
        }

        function Fo(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var Do = new WeakMap, So = new WeakMap;

        class Lo {
            constructor(e, t) {
                Ao(this, Do, void 0), Ao(this, So, void 0), jo(Do, this, e), jo(So, this, t)
            }

            validate(e) {
                return !(!bo.isAlphaNumeric(e) || bo.isRepeatedDigitText(e)) && e.length >= Oo(Do, this) && e.length <= Oo(So, this)
            }
        }

        class Wo {
            validate(e) {
                const t = e.replace(".", "").replace("-", ""), r = t.slice(0, -1);
                let i = t.slice(-1).toUpperCase();
                if (r.length < 7) return !1;
                let n = 0, o = 2;
                for (let e = 1; e <= r.length; e++) n += o * Number(t.charAt(r.length - e)), o = o < 7 ? o + 1 : 2;
                const a = String(11 - n % 11);
                return "K" === i && (i = "10"), 0 === Number(i) && (i = "11"), a === i
            }
        }

        const Yo = e => {
            ri.sendError({
                type: ri.TRACK_TYPE_EVENT,
                eventData: {type: ri.ERROR_TYPE_INTEGRATION, origin: "Validators.getDocumentValidator", reason: e}
            })
        };

        function $o(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Uo(e, t) {
            return e.get(zo(e, t))
        }

        function qo(e, t, r) {
            return e.set(zo(e, t), r), r
        }

        function zo(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var Vo = new WeakMap, Ko = new WeakMap, Bo = new WeakMap, Go = new WeakMap;

        class Ho {
            constructor(e) {
                $o(this, Vo, void 0), $o(this, Ko, void 0), $o(this, Bo, void 0), $o(this, Go, !1), qo(Vo, this, "pk_live_3dbgckKc3uxhHS6WJYyHdkcM3uow_CVQ"), qo(Ko, this, "pk_test_R6tj8sqsYSXunCyL2yKysyscv2Kg2Rx-"), qo(Go, this, e?.sandbox || !1)
            }

            close() {
                Uo(Bo, this)?.close && (Uo(Bo, this).close(), ri.send({
                    path: "/fintoc/close",
                    type: ri.TRACK_TYPE_EVENT
                }))
            }

            destroy() {
                Uo(Bo, this)?.destroy && (Uo(Bo, this).destroy(), ri.send({
                    path: "/fintoc/destroy",
                    type: ri.TRACK_TYPE_EVENT
                }))
            }

            async open(e) {
                if (this.isScriptInjected() || await this.inject(), !window.Fintoc.create) throw new Error("Failed to load Fintoc");
                qo(Bo, this, await window.Fintoc.create({
                    holderType: "individual",
                    product: "payments",
                    country: "cl",
                    widgetToken: e.widgetToken, ...e.institutionId ? {institutionId: e.institutionId} : {}, ...e.username ? {username: e.username} : {}, ...e.onSuccess ? {onSuccess: e.onSuccess} : {}, ...e.onExit ? {onExit: e.onExit} : {}, ...e.onEvent ? {onEvent: e.onEvent} : {},
                    publicKey: Uo(Go, this) ? Uo(Ko, this) : Uo(Vo, this)
                })), Uo(Bo, this)?.open(), ri.send({path: "/fintoc/open", type: ri.TRACK_TYPE_EVENT})
            }

            isScriptInjected() {
                return !!window.Fintoc
            }

            inject() {
                return new Promise(((e, t) => {
                    const r = document.createElement("script");
                    r.src = "https://js.fintoc.com/v1/", r.onload = async () => {
                        await this.waitForScriptInjection(), e()
                    }, r.onerror = () => {
                        t(new Error("Failed to inject Fintoc"))
                    }, document.head.appendChild(r)
                }))
            }

            waitForScriptInjection() {
                return new Promise(((e, t) => {
                    const r = Date.now();
                    let i;
                    const n = () => {
                        this.isScriptInjected() ? (clearTimeout(i), e()) : Date.now() - r >= 5e3 ? (clearTimeout(i), t(new Error("Failed to load Fintoc - timeout"))) : i = setTimeout(n, 100)
                    };
                    n()
                }))
            }
        }

        function Xo(e, t, r) {
            !function (e, t) {
                if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
            }(e, t), t.set(e, r)
        }

        function Jo(e, t, r) {
            return e.set(Qo(e, t), r), r
        }

        function Zo(e, t) {
            return e.get(Qo(e, t))
        }

        function Qo(e, t, r) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : r;
            throw new TypeError("Private element is not present on this object")
        }

        var ea = new WeakMap, ta = new WeakMap, ra = new WeakMap, ia = new WeakMap, na = new WeakMap, oa = new WeakMap,
            aa = new WeakMap, sa = new WeakMap, ca = new WeakMap, da = new WeakMap, la = new WeakMap, ua = new WeakMap,
            pa = new WeakMap, ha = new WeakMap;
        window.MercadoPago = class {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                Xo(this, ea, void 0), Xo(this, ta, void 0), Xo(this, ra, void 0), Xo(this, ia, void 0), Xo(this, na, void 0), Xo(this, oa, void 0), function (e, t, r) {
                    t = function (e) {
                        var t = function (e, t) {
                            if ("object" != typeof e || !e) return e;
                            var r = e[Symbol.toPrimitive];
                            if (void 0 !== r) {
                                var i = r.call(e, "string");
                                if ("object" != typeof i) return i;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(e);
                        return "symbol" == typeof t ? t : t + ""
                    }(t), t in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r
                }(this, "fields", {
                    create: (e, t) => (c.setIframeEnabled(!0), Zo(ra, this).fields.create(e, Zo(na, this), t)),
                    createCardToken: async (e, t) => {
                        ri.send({
                            path: "/core_methods/create_card_token",
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {is_iframe: c.getIframeEnabled()}
                        });
                        const r = this.formatTokenOptions(t);
                        return Zo(ra, this).fields.createCardToken(e, Zo(na, this), r)
                    },
                    updateCardToken: async (e, t) => {
                        ri.send({
                            path: "/core_methods/update_card_token",
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {is_iframe: c.getIframeEnabled()}
                        });
                        const r = this.formatTokenOptions(t);
                        return Zo(ra, this).fields.updateCardToken(e, Zo(na, this), r)
                    }
                }), Xo(this, aa, (e => {
                    const t = (e => {
                        const t = typeof e;
                        return "string" !== t ? new Error(`MercadoPago.js - Type of public_key must be string. Received ${t}`) : /\s/g.test(e) ? new Error("MercadoPago.js - Your public_key is invalid, as it contains whitespaces.") : void 0
                    })(e);
                    if (t) throw t
                })), Xo(this, sa, (e => {
                    const t = (e => {
                        const t = new Jr, {locale: r, advancedFraudPrevention: i} = e;
                        if (r && ("string" != typeof r && t.addError({
                            ...$r.default,
                            description: "Type of locale must be string. Received " + typeof r
                        }), !Object.keys(n).includes(r))) {
                            let e = Object.keys(n).find((e => e.toLowerCase().startsWith(r)));
                            e = e ? "es" === r.toLowerCase() ? "es-CO" : e : "en-US", c.setLocale(e), console.warn(`The requested language '${r}' is not supported, the server retrieved the fallback language '${e}'.`)
                        }
                        return i && "boolean" != typeof i && t.addError({
                            ...$r.default,
                            description: "Type of advancedFraudPrevention must be boolean. Received " + typeof i
                        }), t.getErrors()
                    })(e);
                    if (t.length) throw console.warn("MercadoPago.js - Invalid options: ", t), t.forEach((e => {
                        ri.sendError({
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {
                                type: ri.ERROR_TYPE_INTEGRATION,
                                origin: "Core.validateOptions",
                                reason: e.description
                            }
                        })
                    })), new Error("MercadoPago.js could not be loaded")
                })), Xo(this, ca, (e => Object.assign({
                    locale: Gr(),
                    advancedFraudPrevention: !0,
                    trackingDisabled: !1
                }, e))), Xo(this, da, (async () => {
                    Jo(ia, this, new ai), Jo(ra, this, new Wr({services: Zo(ia, this)})), await (async e => {
                        if (c.getSiteId()) return;
                        const t = c.getPublicKey(),
                            r = (await e.getPaymentMethods({limit: 1, public_key: t})).results.find((e => e.site_id)),
                            i = r?.site_id;
                        i && c.setSiteId(i)
                    })(Zo(ia, this)), await Zo(la, this).call(this), ri.setContext({
                        siteId: c.getSiteId(),
                        advancedFraudPrevention: Zo(ea, this).advancedFraudPrevention,
                        locale: Zo(ea, this).locale,
                        publicKey: c.getPublicKey(),
                        version: "2"
                    })
                })), Xo(this, la, (async () => {
                    try {
                        return await new Promise(((e, t) => {
                            const i = window.navigator.userAgent || window.navigator.vendor, n = tt(i),
                                o = n ? "sdk-js-checkout-mobile" : "sdk-js-checkout-web",
                                a = n ? "BCLQ07IBVKH001FP9VCG" : "BCHJ1GABVKH001FP9V4G",
                                s = document.createElement("script");
                            s.src = "https://http2.mlstatic.com/storage/event-metrics-sdk/js", s.type = "text/javascript", s.async = !0, s.setAttribute("data-client-info-name", "MercadoPago-SDK-Javascript"), s.setAttribute("data-client-info-version", r), s.setAttribute("data-business-flow-name", o), s.setAttribute("data-business-flow-uid", a), s.setAttribute("data-event-info-name", "checkout"), s.setAttribute("data-event-info-source", function () {
                                const e = window.crypto || window.msCrypto;
                                if (void 0 === e || void 0 === window.Uint32Array) return "";
                                const t = new Uint32Array(8);
                                e.getRandomValues(t);
                                let r = "";
                                for (let e = 0; e < t.length; e++) r += (e < 2 || e > 5 ? "" : "-") + t[e].toString(16).slice(-4);
                                return r
                            }()), document.head.appendChild(s), s.onload = () => e(), s.onerror = e => t(e)
                        })), Promise.resolve()
                    } catch (e) {
                        return console.warn("MercadoPago.js - SRE Metrics could not be loaded", e), ri.sendError({
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {
                                type: ri.ERROR_TYPE_WARNING,
                                origin: "Core.setupMetricsSDK",
                                reason: "SRE Metrics could not be loaded"
                            }
                        }), Promise.resolve()
                    }
                })), Xo(this, ua, (async (e, t) => {
                    await Zo(ta, this), Zo(oa, this) || ri.send({
                        path: `${e || ""}`,
                        type: ri.TRACK_TYPE_VIEW,
                        eventData: t
                    }), e && Jo(oa, this, !0)
                })), Xo(this, pa, (async e => {
                    await Zo(ua, this).call(this, "/core_methods", {is_iframe: c.getIframeEnabled()}), ri.send({
                        path: `/core_methods${e}`,
                        type: ri.TRACK_TYPE_EVENT,
                        eventData: {is_iframe: c.getIframeEnabled()}
                    })
                })), Xo(this, ha, (async () => {
                    try {
                        const {advancedFraudPrevention: e} = Zo(ea, this);
                        if (!e) return Promise.resolve();
                        const t = await (async () => {
                            try {
                                const e = await Mr.fetch("/devices/widgets", {
                                    method: "POST",
                                    body: JSON.stringify({section: "open_platform_V2", view: "checkout"})
                                }), t = await e.json(), r = document.createElement("script");
                                return r.appendChild(document.createTextNode(t.widget.replace(/<script\b[^<]*">/gi, "").replace(/<\/script>[\s\S]*/gi, ""))), document.head.appendChild(r), Promise.resolve(t.session_id)
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        })();
                        return c.setDeviceProfile(t), Promise.resolve()
                    } catch (e) {
                        return console.warn("MercadoPago.js - DeviceProfile could not be loaded", e), ri.sendError({
                            type: ri.TRACK_TYPE_EVENT,
                            eventData: {
                                type: ri.ERROR_TYPE_WARNING,
                                origin: "Core.setupDeviceProfile",
                                reason: "DeviceProfile could not be loaded"
                            }
                        }), Promise.resolve()
                    }
                })), Zo(aa, this).call(this, e), Zo(sa, this).call(this, t), Jo(ea, this, Zo(ca, this).call(this, t)), Jo(na, this, new be), Jo(oa, this, !1), t.siteId && c.setSiteId(t.siteId), c.setPublicKey(e), c.setLocale(Zo(ea, this).locale), c.setIframeEnabled(!1), c.setTrackingDisabled(Zo(ea, this).trackingDisabled), c.setFrontendStack(Zo(ea, this).frontEndStack), c.setProductId(yr()), Jo(ta, this, Zo(da, this).call(this)), Zo(ua, this).call(this, "", {
                    success: !0,
                    frontEndStack: c.getFrontendStack()
                }), Zo(ha, this).call(this)
            }

            async getIdentificationTypes() {
                return await Zo(ta, this), await Zo(pa, this).call(this, "/identification_types"), Zo(ra, this).getIdentificationTypes()
            }

            async getPaymentMethods(e) {
                return await Zo(ta, this), await Zo(pa, this).call(this, "/payment_methods"), Zo(ra, this).getPaymentMethods(e)
            }

            async getIssuers(e) {
                return await Zo(ta, this), await Zo(pa, this).call(this, "/issuers"), Zo(ra, this).getIssuers(e)
            }

            async getInstallments(e) {
                return await Zo(ta, this), await Zo(pa, this).call(this, "/installments"), Zo(ra, this).getInstallments(e)
            }

            async createCardToken(e, t) {
                return await Zo(ta, this), await Zo(pa, this).call(this, "/create_card_token"), Zo(ra, this).createCardToken(e, t)
            }

            async updateCardToken(e, t) {
                return await Zo(ta, this), await Zo(pa, this).call(this, "/update_card_token"), Zo(ra, this).updateCardToken(e, t)
            }

            getDocumentValidator(e, t, r) {
                return function (e, t, r) {
                    switch (e) {
                        case"CPF":
                            return new ko;
                        case"CNPJ":
                            return new _o;
                        case"CI":
                            return new Eo;
                        case"RUT":
                            return new Wo;
                        case"Otro":
                            if (!t || !r) {
                                const e = "Invalid value of minLength or maxLength for other validator";
                                throw Yo(e), new Error(e)
                            }
                            return new Lo(t, r);
                        default:
                            if (!t || !r) {
                                const e = "Invalid value of minLength or maxLength for general validator";
                                throw Yo(e), new Error(e)
                            }
                            return new No(t, r)
                    }
                }(e, t, r)
            }

            formatTokenOptions(e) {
                return "object" != typeof e ? {productId: e, group: Ce} : e
            }

            bricks(e) {
                return new Qn(e, this)
            }

            cardForm(e) {
                return Zo(ua, this).call(this, "/card_form", {is_iframe: Boolean(e.iframe)}), new fr(e, Zo(ta, this))
            }

            checkout(e) {
                return Zo(ua, this).call(this, "/cho_pro", {preference_id: e.preference?.id || ""}), new wn(e, Zo(ta, this))
            }

            tokenizer(e) {
                return Zo(ua, this).call(this, "/tokenizer"), new wo(e)
            }

            yape(e) {
                return Zo(ua, this).call(this, "/yape"), new so(e)
            }

            fintoc(e) {
                return Zo(ua, this).call(this, "/fintoc"), new Ho(e)
            }
        }
    })()
})();