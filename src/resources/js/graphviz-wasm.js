// deno-lint-ignore-file

/*
 * graphviz-wasm.js
 *
 * This is a pretty-printed, hand-edited version of the minified build from https://github.com/hpcc-systems/hpcc-js-wasm/
 *
 *
 * Copyright (C) 2022 by https://github.com/hpcc-systems/hpcc-js-wasm authors
 *
 * adaptations to make it run on deno are
 *
 * Copyright (C) 2022 by RStudio, PBC
 *
 */

/*import { resourcePath } from "../../core/resources.ts";
import { asDataUrl } from "../../core/data-url.ts";*/

const exportVals = {};

export function graphviz() {
  return exportVals.graphviz;
}

export function graphvizSync() {
  return exportVals.graphvizSync;
}

export function wasmPath() {
  return `${Deno.env.get("QUARTO_SHARE_PATH")}/wasm/graphvizlib.wasm`;
}

export function graphvizWasmModule() {
  const gvWasmSrc = Deno.readFileSync(wasmPath());
  return new WebAssembly.Module(gvWasmSrc);
}

export function graphvizWasm() {
  throw new Error("I bet we don't trigger this.");
  /*const gvWasmSrc = Deno.readFileSync(wasmPath()).buffer;
  return asDataUrl(gvWasmSrc, "application/wasm");*/
}

!(function (r, e) {
  e(r);
  /*"object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
      (r = "undefined" != typeof globalThis ? globalThis : r || self)[
        "@hpcc-js/wasm"
      ] = {},
    );*/
})(exportVals, function (r) {
  "use strict";
  function e(r, e) {
    return (
      e.forEach(function (e) {
        e &&
          "string" != typeof e &&
          !Array.isArray(e) &&
          Object.keys(e).forEach(function (t) {
            if ("default" !== t && !(t in r)) {
              var n = Object.getOwnPropertyDescriptor(e, t);
              Object.defineProperty(
                r,
                t,
                n.get
                  ? n
                  : {
                      enumerable: !0,
                      get: function () {
                        return e[t];
                      },
                    }
              );
            }
          });
      }),
      Object.freeze(r)
    );
  }
  var t = { exports: {} };
  !(function (r, e) {
    var t,
      n =
        ((t =
          "undefined" != typeof document && document.currentScript
            ? document.currentScript.src
            : void 0),
        function (r) {
          var e,
            n,
            o = void 0 !== (r = r || {}) ? r : {};
          o.ready = new Promise(function (r, t) {
            (e = r), (n = t);
          });
          var a,
            i,
            s = Object.assign({}, o),
            u = "./this.program",
            c = "";
          "undefined" != typeof document &&
            document.currentScript &&
            (c = document.currentScript.src),
            t && (c = t),
            (c =
              0 !== c.indexOf("blob:")
                ? c.substr(0, c.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                : ""),
            (a = (r) => {
              var e = new XMLHttpRequest();
              return e.open("GET", r, !1), e.send(null), e.responseText;
            }),
            (i = (r, e, t) => {
              var n = new XMLHttpRequest();
              n.open("GET", r, !0),
                (n.responseType = "arraybuffer"),
                (n.onload = () => {
                  200 == n.status || (0 == n.status && n.response)
                    ? e(n.response)
                    : t();
                }),
                (n.onerror = t),
                n.send(null);
            });
          var l,
            d,
            f = o.print || console.log.bind(console),
            p = o.printErr || console.warn.bind(console);
          Object.assign(o, s),
            (s = null),
            o.arguments,
            o.thisProgram && (u = o.thisProgram),
            o.quit,
            o.wasmBinary && (l = o.wasmBinary),
            o.noExitRuntime,
            "object" != typeof WebAssembly &&
              L("no native wasm support detected");
          var m = !1;
          function h(r, e) {
            r || L(e);
          }
          var v,
            w,
            _,
            y,
            E,
            g,
            b =
              "undefined" != typeof TextDecoder
                ? new TextDecoder("utf8")
                : void 0;
          function k(r, e, t) {
            for (var n = e + t, o = e; r[o] && !(o >= n); ) ++o;
            if (o - e > 16 && r.subarray && b) {
              return b.decode(r.subarray(e, o));
            }
            for (var a = ""; e < o; ) {
              var i = r[e++];
              if (128 & i) {
                var s = 63 & r[e++];
                if (192 != (224 & i)) {
                  var u = 63 & r[e++];
                  if (
                    (i =
                      224 == (240 & i)
                        ? ((15 & i) << 12) | (s << 6) | u
                        : ((7 & i) << 18) |
                          (s << 12) |
                          (u << 6) |
                          (63 & r[e++])) < 65536
                  ) {
                    a += String.fromCharCode(i);
                  } else {
                    var c = i - 65536;
                    a += String.fromCharCode(
                      55296 | (c >> 10),
                      56320 | (1023 & c)
                    );
                  }
                } else a += String.fromCharCode(((31 & i) << 6) | s);
              } else a += String.fromCharCode(i);
            }
            return a;
          }
          function D(r, e) {
            return r ? k(_, r, e) : "";
          }
          function S(r, e, t, n) {
            if (!(n > 0)) {
              return 0;
            }
            for (var o = t, a = t + n - 1, i = 0; i < r.length; ++i) {
              var s = r.charCodeAt(i);
              if (
                (s >= 55296 &&
                  s <= 57343 &&
                  (s =
                    (65536 + ((1023 & s) << 10)) | (1023 & r.charCodeAt(++i))),
                s <= 127)
              ) {
                if (t >= a) {
                  break;
                }
                e[t++] = s;
              } else if (s <= 2047) {
                if (t + 1 >= a) break;
                (e[t++] = 192 | (s >> 6)), (e[t++] = 128 | (63 & s));
              } else if (s <= 65535) {
                if (t + 2 >= a) break;
                (e[t++] = 224 | (s >> 12)),
                  (e[t++] = 128 | ((s >> 6) & 63)),
                  (e[t++] = 128 | (63 & s));
              } else {
                if (t + 3 >= a) break;
                (e[t++] = 240 | (s >> 18)),
                  (e[t++] = 128 | ((s >> 12) & 63)),
                  (e[t++] = 128 | ((s >> 6) & 63)),
                  (e[t++] = 128 | (63 & s));
              }
            }
            return (e[t] = 0), t - o;
          }
          function P(r) {
            for (var e = 0, t = 0; t < r.length; ++t) {
              var n = r.charCodeAt(t);
              n >= 55296 &&
                n <= 57343 &&
                (n = (65536 + ((1023 & n) << 10)) | (1023 & r.charCodeAt(++t))),
                n <= 127 ? ++e : (e += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
            }
            return e;
          }
          function A(r) {
            (v = r),
              (o.HEAP8 = w = new Int8Array(r)),
              (o.HEAP16 = new Int16Array(r)),
              (o.HEAP32 = y = new Int32Array(r)),
              (o.HEAPU8 = _ = new Uint8Array(r)),
              (o.HEAPU16 = new Uint16Array(r)),
              (o.HEAPU32 = new Uint32Array(r)),
              (o.HEAPF32 = new Float32Array(r)),
              (o.HEAPF64 = E = new Float64Array(r));
          }
          o.INITIAL_MEMORY;
          var F,
            x,
            M,
            R,
            C = [],
            z = [],
            B = [],
            j = 0,
            T = null;
          function N(r) {
            j++, o.monitorRunDependencies && o.monitorRunDependencies(j);
          }
          function O(r) {
            if (
              (j--,
              o.monitorRunDependencies && o.monitorRunDependencies(j),
              0 == j && T)
            ) {
              var e = T;
              (T = null), e();
            }
          }
          function L(r) {
            o.onAbort && o.onAbort(r),
              p((r = "Aborted(" + r + ")")),
              (m = !0),
              (r += ". Build with -s ASSERTIONS=1 for more info.");
            var e = new WebAssembly.RuntimeError(r);
            throw (n(e), e);
          }
          function I(r) {
            return r.startsWith("data:application/octet-stream;base64,");
          }
          function H(r) {
            try {
              if (r == F && l) return new Uint8Array(l);
              throw "both async and sync fetching of the wasm failed";
            } catch (r) {
              L(r);
            }
          }
          throw new Error(
            "Internal Error: Attempting to load expatlib, which is currently not supported in this version."
          );
          (o.preloadedImages = {}),
            (o.preloadedAudios = {}),
            I((F = "expatlib.wasm")) ||
              ((x = F), (F = o.locateFile ? o.locateFile(x, c) : c + x));
          var U = {
            11678: function (r) {
              var e = o.getCache(o.CExpatJS)[r];
              if (!e.hasOwnProperty("startElement")) {
                throw "a JSImplementation must implement all functions, you forgot CExpatJS::startElement.";
              }
              e.startElement();
            },
            11896: function (r) {
              var e = o.getCache(o.CExpatJS)[r];
              if (!e.hasOwnProperty("endElement")) {
                throw "a JSImplementation must implement all functions, you forgot CExpatJS::endElement.";
              }
              e.endElement();
            },
            12108: function (r) {
              var e = o.getCache(o.CExpatJS)[r];
              if (!e.hasOwnProperty("characterData")) {
                throw "a JSImplementation must implement all functions, you forgot CExpatJS::characterData.";
              }
              e.characterData();
            },
          };
          function G(r) {
            for (; r.length > 0; ) {
              var e = r.shift();
              if ("function" != typeof e) {
                var t = e.func;
                "number" == typeof t
                  ? void 0 === e.arg
                    ? q(t)()
                    : q(t)(e.arg)
                  : t(void 0 === e.arg ? null : e.arg);
              } else e(o);
            }
          }
          function q(r) {
            return g.get(r);
          }
          var W = {
              splitPath: function (r) {
                return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                  .exec(r)
                  .slice(1);
              },
              normalizeArray: function (r, e) {
                for (var t = 0, n = r.length - 1; n >= 0; n--) {
                  var o = r[n];
                  "." === o
                    ? r.splice(n, 1)
                    : ".." === o
                    ? (r.splice(n, 1), t++)
                    : t && (r.splice(n, 1), t--);
                }
                if (e) for (; t; t--) r.unshift("..");
                return r;
              },
              normalize: function (r) {
                var e = "/" === r.charAt(0),
                  t = "/" === r.substr(-1);
                return (
                  (r = W.normalizeArray(
                    r.split("/").filter(function (r) {
                      return !!r;
                    }),
                    !e
                  ).join("/")) ||
                    e ||
                    (r = "."),
                  r && t && (r += "/"),
                  (e ? "/" : "") + r
                );
              },
              dirname: function (r) {
                var e = W.splitPath(r),
                  t = e[0],
                  n = e[1];
                return t || n
                  ? (n && (n = n.substr(0, n.length - 1)), t + n)
                  : ".";
              },
              basename: function (r) {
                if ("/" === r) return "/";
                var e = (r = (r = W.normalize(r)).replace(
                  /\/$/,
                  ""
                )).lastIndexOf("/");
                return -1 === e ? r : r.substr(e + 1);
              },
              extname: function (r) {
                return W.splitPath(r)[3];
              },
              join: function () {
                var r = Array.prototype.slice.call(arguments, 0);
                return W.normalize(r.join("/"));
              },
              join2: function (r, e) {
                return W.normalize(r + "/" + e);
              },
            },
            J = {
              resolve: function () {
                for (
                  var r = "", e = !1, t = arguments.length - 1;
                  t >= -1 && !e;
                  t--
                ) {
                  var n = t >= 0 ? arguments[t] : $.cwd();
                  if ("string" != typeof n) {
                    throw new TypeError(
                      "Arguments to path.resolve must be strings"
                    );
                  }
                  if (!n) return "";
                  (r = n + "/" + r), (e = "/" === n.charAt(0));
                }
                return (
                  (e ? "/" : "") +
                    (r = W.normalizeArray(
                      r.split("/").filter(function (r) {
                        return !!r;
                      }),
                      !e
                    ).join("/")) || "."
                );
              },
              relative: function (r, e) {
                function t(r) {
                  for (var e = 0; e < r.length && "" === r[e]; e++);
                  for (var t = r.length - 1; t >= 0 && "" === r[t]; t--);
                  return e > t ? [] : r.slice(e, t - e + 1);
                }
                (r = J.resolve(r).substr(1)), (e = J.resolve(e).substr(1));
                for (
                  var n = t(r.split("/")),
                    o = t(e.split("/")),
                    a = Math.min(n.length, o.length),
                    i = a,
                    s = 0;
                  s < a;
                  s++
                ) {
                  if (n[s] !== o[s]) {
                    i = s;
                    break;
                  }
                }
                var u = [];
                for (s = i; s < n.length; s++) u.push("..");
                return (u = u.concat(o.slice(i))).join("/");
              },
            },
            V = {
              ttys: [],
              init: function () {},
              shutdown: function () {},
              register: function (r, e) {
                (V.ttys[r] = { input: [], output: [], ops: e }),
                  $.registerDevice(r, V.stream_ops);
              },
              stream_ops: {
                open: function (r) {
                  var e = V.ttys[r.node.rdev];
                  if (!e) throw new $.ErrnoError(43);
                  (r.tty = e), (r.seekable = !1);
                },
                close: function (r) {
                  r.tty.ops.flush(r.tty);
                },
                flush: function (r) {
                  r.tty.ops.flush(r.tty);
                },
                read: function (r, e, t, n, o) {
                  if (!r.tty || !r.tty.ops.get_char) throw new $.ErrnoError(60);
                  for (var a = 0, i = 0; i < n; i++) {
                    var s;
                    try {
                      s = r.tty.ops.get_char(r.tty);
                    } catch (r) {
                      throw new $.ErrnoError(29);
                    }
                    if (void 0 === s && 0 === a) throw new $.ErrnoError(6);
                    if (null == s) break;
                    a++, (e[t + i] = s);
                  }
                  return a && (r.node.timestamp = Date.now()), a;
                },
                write: function (r, e, t, n, o) {
                  if (!r.tty || !r.tty.ops.put_char) {
                    throw new $.ErrnoError(60);
                  }
                  try {
                    for (var a = 0; a < n; a++) {
                      r.tty.ops.put_char(r.tty, e[t + a]);
                    }
                  } catch (r) {
                    throw new $.ErrnoError(29);
                  }
                  return n && (r.node.timestamp = Date.now()), a;
                },
              },
              default_tty_ops: {
                get_char: function (r) {
                  if (!r.input.length) {
                    var e = null;
                    if (
                      ("undefined" != typeof window &&
                      "function" == typeof window.prompt
                        ? null !== (e = window.prompt("Input: ")) && (e += "\n")
                        : "function" == typeof readline &&
                          null !== (e = readline()) &&
                          (e += "\n"),
                      !e)
                    ) {
                      return null;
                    }
                    r.input = or(e, !0);
                  }
                  return r.input.shift();
                },
                put_char: function (r, e) {
                  null === e || 10 === e
                    ? (f(k(r.output, 0)), (r.output = []))
                    : 0 != e && r.output.push(e);
                },
                flush: function (r) {
                  r.output &&
                    r.output.length > 0 &&
                    (f(k(r.output, 0)), (r.output = []));
                },
              },
              default_tty1_ops: {
                put_char: function (r, e) {
                  null === e || 10 === e
                    ? (p(k(r.output, 0)), (r.output = []))
                    : 0 != e && r.output.push(e);
                },
                flush: function (r) {
                  r.output &&
                    r.output.length > 0 &&
                    (p(k(r.output, 0)), (r.output = []));
                },
              },
            },
            X = {
              ops_table: null,
              mount: function (r) {
                return X.createNode(null, "/", 16895, 0);
              },
              createNode: function (r, e, t, n) {
                if ($.isBlkdev(t) || $.isFIFO(t)) throw new $.ErrnoError(63);
                X.ops_table ||
                  (X.ops_table = {
                    dir: {
                      node: {
                        getattr: X.node_ops.getattr,
                        setattr: X.node_ops.setattr,
                        lookup: X.node_ops.lookup,
                        mknod: X.node_ops.mknod,
                        rename: X.node_ops.rename,
                        unlink: X.node_ops.unlink,
                        rmdir: X.node_ops.rmdir,
                        readdir: X.node_ops.readdir,
                        symlink: X.node_ops.symlink,
                      },
                      stream: { llseek: X.stream_ops.llseek },
                    },
                    file: {
                      node: {
                        getattr: X.node_ops.getattr,
                        setattr: X.node_ops.setattr,
                      },
                      stream: {
                        llseek: X.stream_ops.llseek,
                        read: X.stream_ops.read,
                        write: X.stream_ops.write,
                        allocate: X.stream_ops.allocate,
                        mmap: X.stream_ops.mmap,
                        msync: X.stream_ops.msync,
                      },
                    },
                    link: {
                      node: {
                        getattr: X.node_ops.getattr,
                        setattr: X.node_ops.setattr,
                        readlink: X.node_ops.readlink,
                      },
                      stream: {},
                    },
                    chrdev: {
                      node: {
                        getattr: X.node_ops.getattr,
                        setattr: X.node_ops.setattr,
                      },
                      stream: $.chrdev_stream_ops,
                    },
                  });
                var o = $.createNode(r, e, t, n);
                return (
                  $.isDir(o.mode)
                    ? ((o.node_ops = X.ops_table.dir.node),
                      (o.stream_ops = X.ops_table.dir.stream),
                      (o.contents = {}))
                    : $.isFile(o.mode)
                    ? ((o.node_ops = X.ops_table.file.node),
                      (o.stream_ops = X.ops_table.file.stream),
                      (o.usedBytes = 0),
                      (o.contents = null))
                    : $.isLink(o.mode)
                    ? ((o.node_ops = X.ops_table.link.node),
                      (o.stream_ops = X.ops_table.link.stream))
                    : $.isChrdev(o.mode) &&
                      ((o.node_ops = X.ops_table.chrdev.node),
                      (o.stream_ops = X.ops_table.chrdev.stream)),
                  (o.timestamp = Date.now()),
                  r && ((r.contents[e] = o), (r.timestamp = o.timestamp)),
                  o
                );
              },
              getFileDataAsTypedArray: function (r) {
                return r.contents
                  ? r.contents.subarray
                    ? r.contents.subarray(0, r.usedBytes)
                    : new Uint8Array(r.contents)
                  : new Uint8Array(0);
              },
              expandFileStorage: function (r, e) {
                var t = r.contents ? r.contents.length : 0;
                if (!(t >= e)) {
                  (e = Math.max(e, (t * (t < 1048576 ? 2 : 1.125)) >>> 0)),
                    0 != t && (e = Math.max(e, 256));
                  var n = r.contents;
                  (r.contents = new Uint8Array(e)),
                    r.usedBytes > 0 &&
                      r.contents.set(n.subarray(0, r.usedBytes), 0);
                }
              },
              resizeFileStorage: function (r, e) {
                if (r.usedBytes != e) {
                  if (0 == e) (r.contents = null), (r.usedBytes = 0);
                  else {
                    var t = r.contents;
                    (r.contents = new Uint8Array(e)),
                      t &&
                        r.contents.set(t.subarray(0, Math.min(e, r.usedBytes))),
                      (r.usedBytes = e);
                  }
                }
              },
              node_ops: {
                getattr: function (r) {
                  var e = {};
                  return (
                    (e.dev = $.isChrdev(r.mode) ? r.id : 1),
                    (e.ino = r.id),
                    (e.mode = r.mode),
                    (e.nlink = 1),
                    (e.uid = 0),
                    (e.gid = 0),
                    (e.rdev = r.rdev),
                    $.isDir(r.mode)
                      ? (e.size = 4096)
                      : $.isFile(r.mode)
                      ? (e.size = r.usedBytes)
                      : $.isLink(r.mode)
                      ? (e.size = r.link.length)
                      : (e.size = 0),
                    (e.atime = new Date(r.timestamp)),
                    (e.mtime = new Date(r.timestamp)),
                    (e.ctime = new Date(r.timestamp)),
                    (e.blksize = 4096),
                    (e.blocks = Math.ceil(e.size / e.blksize)),
                    e
                  );
                },
                setattr: function (r, e) {
                  void 0 !== e.mode && (r.mode = e.mode),
                    void 0 !== e.timestamp && (r.timestamp = e.timestamp),
                    void 0 !== e.size && X.resizeFileStorage(r, e.size);
                },
                lookup: function (r, e) {
                  throw $.genericErrors[44];
                },
                mknod: function (r, e, t, n) {
                  return X.createNode(r, e, t, n);
                },
                rename: function (r, e, t) {
                  if ($.isDir(r.mode)) {
                    var n;
                    try {
                      n = $.lookupNode(e, t);
                    } catch (r) {}
                    if (n) for (var o in n.contents) throw new $.ErrnoError(55);
                  }
                  delete r.parent.contents[r.name],
                    (r.parent.timestamp = Date.now()),
                    (r.name = t),
                    (e.contents[t] = r),
                    (e.timestamp = r.parent.timestamp),
                    (r.parent = e);
                },
                unlink: function (r, e) {
                  delete r.contents[e], (r.timestamp = Date.now());
                },
                rmdir: function (r, e) {
                  var t = $.lookupNode(r, e);
                  for (var n in t.contents) throw new $.ErrnoError(55);
                  delete r.contents[e], (r.timestamp = Date.now());
                },
                readdir: function (r) {
                  var e = [".", ".."];
                  for (var t in r.contents) {
                    r.contents.hasOwnProperty(t) && e.push(t);
                  }
                  return e;
                },
                symlink: function (r, e, t) {
                  var n = X.createNode(r, e, 41471, 0);
                  return (n.link = t), n;
                },
                readlink: function (r) {
                  if (!$.isLink(r.mode)) throw new $.ErrnoError(28);
                  return r.link;
                },
              },
              stream_ops: {
                read: function (r, e, t, n, o) {
                  var a = r.node.contents;
                  if (o >= r.node.usedBytes) return 0;
                  var i = Math.min(r.node.usedBytes - o, n);
                  if (i > 8 && a.subarray) e.set(a.subarray(o, o + i), t);
                  else for (var s = 0; s < i; s++) e[t + s] = a[o + s];
                  return i;
                },
                write: function (r, e, t, n, o, a) {
                  if ((e.buffer === w.buffer && (a = !1), !n)) {
                    return 0;
                  }
                  var i = r.node;
                  if (
                    ((i.timestamp = Date.now()),
                    e.subarray && (!i.contents || i.contents.subarray))
                  ) {
                    if (a) {
                      return (
                        (i.contents = e.subarray(t, t + n)),
                        (i.usedBytes = n),
                        n
                      );
                    }
                    if (0 === i.usedBytes && 0 === o) {
                      return (
                        (i.contents = e.slice(t, t + n)), (i.usedBytes = n), n
                      );
                    }
                    if (o + n <= i.usedBytes) {
                      return i.contents.set(e.subarray(t, t + n), o), n;
                    }
                  }
                  if (
                    (X.expandFileStorage(i, o + n),
                    i.contents.subarray && e.subarray)
                  ) {
                    i.contents.set(e.subarray(t, t + n), o);
                  } else {
                    for (var s = 0; s < n; s++) i.contents[o + s] = e[t + s];
                  }
                  return (i.usedBytes = Math.max(i.usedBytes, o + n)), n;
                },
                llseek: function (r, e, t) {
                  var n = e;
                  if (
                    (1 === t
                      ? (n += r.position)
                      : 2 === t &&
                        $.isFile(r.node.mode) &&
                        (n += r.node.usedBytes),
                    n < 0)
                  ) {
                    throw new $.ErrnoError(28);
                  }
                  return n;
                },
                allocate: function (r, e, t) {
                  X.expandFileStorage(r.node, e + t),
                    (r.node.usedBytes = Math.max(r.node.usedBytes, e + t));
                },
                mmap: function (r, e, t, n, o, a) {
                  if (0 !== e) throw new $.ErrnoError(28);
                  if (!$.isFile(r.node.mode)) throw new $.ErrnoError(43);
                  var i,
                    s,
                    u = r.node.contents;
                  if (2 & a || u.buffer !== v) {
                    if (
                      ((n > 0 || n + t < u.length) &&
                        (u = u.subarray
                          ? u.subarray(n, n + t)
                          : Array.prototype.slice.call(u, n, n + t)),
                      (s = !0),
                      !(i = void L()))
                    ) {
                      throw new $.ErrnoError(48);
                    }
                    w.set(u, i);
                  } else {
                    (s = !1), (i = u.byteOffset);
                  }
                  return { ptr: i, allocated: s };
                },
                msync: function (r, e, t, n, o) {
                  if (!$.isFile(r.node.mode)) throw new $.ErrnoError(43);
                  return 2 & o || X.stream_ops.write(r, e, 0, n, t, !1), 0;
                },
              },
            },
            $ = {
              root: null,
              mounts: [],
              devices: {},
              streams: [],
              nextInode: 1,
              nameTable: null,
              currentPath: "/",
              initialized: !1,
              ignorePermissions: !0,
              ErrnoError: null,
              genericErrors: {},
              filesystems: null,
              syncFSRequests: 0,
              lookupPath: (r, e = {}) => {
                if (!(r = J.resolve($.cwd(), r))) {
                  return { path: "", node: null };
                }
                var t = { follow_mount: !0, recurse_count: 0 };
                for (var n in t) void 0 === e[n] && (e[n] = t[n]);
                if (e.recurse_count > 8) throw new $.ErrnoError(32);
                for (
                  var o = W.normalizeArray(
                      r.split("/").filter((r) => !!r),
                      !1
                    ),
                    a = $.root,
                    i = "/",
                    s = 0;
                  s < o.length;
                  s++
                ) {
                  var u = s === o.length - 1;
                  if (u && e.parent) break;
                  if (
                    ((a = $.lookupNode(a, o[s])),
                    (i = W.join2(i, o[s])),
                    $.isMountpoint(a) &&
                      (!u || (u && e.follow_mount)) &&
                      (a = a.mounted.root),
                    !u || e.follow)
                  ) {
                    for (var c = 0; $.isLink(a.mode); ) {
                      var l = $.readlink(i);
                      if (
                        ((i = J.resolve(W.dirname(i), l)),
                        (a = $.lookupPath(i, {
                          recurse_count: e.recurse_count,
                        }).node),
                        c++ > 40)
                      ) {
                        throw new $.ErrnoError(32);
                      }
                    }
                  }
                }
                return { path: i, node: a };
              },
              getPath: (r) => {
                for (var e; ; ) {
                  if ($.isRoot(r)) {
                    var t = r.mount.mountpoint;
                    return e
                      ? "/" !== t[t.length - 1]
                        ? t + "/" + e
                        : t + e
                      : t;
                  }
                  (e = e ? r.name + "/" + e : r.name), (r = r.parent);
                }
              },
              hashName: (r, e) => {
                for (var t = 0, n = 0; n < e.length; n++) {
                  t = ((t << 5) - t + e.charCodeAt(n)) | 0;
                }
                return ((r + t) >>> 0) % $.nameTable.length;
              },
              hashAddNode: (r) => {
                var e = $.hashName(r.parent.id, r.name);
                (r.name_next = $.nameTable[e]), ($.nameTable[e] = r);
              },
              hashRemoveNode: (r) => {
                var e = $.hashName(r.parent.id, r.name);
                if ($.nameTable[e] === r) $.nameTable[e] = r.name_next;
                else {
                  for (var t = $.nameTable[e]; t; ) {
                    if (t.name_next === r) {
                      t.name_next = r.name_next;
                      break;
                    }
                    t = t.name_next;
                  }
                }
              },
              lookupNode: (r, e) => {
                var t = $.mayLookup(r);
                if (t) throw new $.ErrnoError(t, r);
                for (
                  var n = $.hashName(r.id, e), o = $.nameTable[n];
                  o;
                  o = o.name_next
                ) {
                  var a = o.name;
                  if (o.parent.id === r.id && a === e) return o;
                }
                return $.lookup(r, e);
              },
              createNode: (r, e, t, n) => {
                var o = new $.FSNode(r, e, t, n);
                return $.hashAddNode(o), o;
              },
              destroyNode: (r) => {
                $.hashRemoveNode(r);
              },
              isRoot: (r) => r === r.parent,
              isMountpoint: (r) => !!r.mounted,
              isFile: (r) => 32768 == (61440 & r),
              isDir: (r) => 16384 == (61440 & r),
              isLink: (r) => 40960 == (61440 & r),
              isChrdev: (r) => 8192 == (61440 & r),
              isBlkdev: (r) => 24576 == (61440 & r),
              isFIFO: (r) => 4096 == (61440 & r),
              isSocket: (r) => 49152 == (49152 & r),
              flagModes: {
                r: 0,
                "r+": 2,
                w: 577,
                "w+": 578,
                a: 1089,
                "a+": 1090,
              },
              modeStringToFlags: (r) => {
                var e = $.flagModes[r];
                if (void 0 === e) {
                  throw new Error("Unknown file open mode: " + r);
                }
                return e;
              },
              flagsToPermissionString: (r) => {
                var e = ["r", "w", "rw"][3 & r];
                return 512 & r && (e += "w"), e;
              },
              nodePermissions: (r, e) =>
                $.ignorePermissions ||
                ((!e.includes("r") || 292 & r.mode) &&
                  (!e.includes("w") || 146 & r.mode) &&
                  (!e.includes("x") || 73 & r.mode))
                  ? 0
                  : 2,
              mayLookup: (r) => {
                var e = $.nodePermissions(r, "x");
                return e || (r.node_ops.lookup ? 0 : 2);
              },
              mayCreate: (r, e) => {
                try {
                  return $.lookupNode(r, e), 20;
                } catch (r) {}
                return $.nodePermissions(r, "wx");
              },
              mayDelete: (r, e, t) => {
                var n;
                try {
                  n = $.lookupNode(r, e);
                } catch (r) {
                  return r.errno;
                }
                var o = $.nodePermissions(r, "wx");
                if (o) return o;
                if (t) {
                  if (!$.isDir(n.mode)) return 54;
                  if ($.isRoot(n) || $.getPath(n) === $.cwd()) return 10;
                } else if ($.isDir(n.mode)) return 31;
                return 0;
              },
              mayOpen: (r, e) =>
                r
                  ? $.isLink(r.mode)
                    ? 32
                    : $.isDir(r.mode) &&
                      ("r" !== $.flagsToPermissionString(e) || 512 & e)
                    ? 31
                    : $.nodePermissions(r, $.flagsToPermissionString(e))
                  : 44,
              MAX_OPEN_FDS: 4096,
              nextfd: (r = 0, e = $.MAX_OPEN_FDS) => {
                for (var t = r; t <= e; t++) if (!$.streams[t]) return t;
                throw new $.ErrnoError(33);
              },
              getStream: (r) => $.streams[r],
              createStream: (r, e, t) => {
                $.FSStream ||
                  (($.FSStream = function () {}),
                  ($.FSStream.prototype = {
                    object: {
                      get: function () {
                        return this.node;
                      },
                      set: function (r) {
                        this.node = r;
                      },
                    },
                    isRead: {
                      get: function () {
                        return 1 != (2097155 & this.flags);
                      },
                    },
                    isWrite: {
                      get: function () {
                        return 0 != (2097155 & this.flags);
                      },
                    },
                    isAppend: {
                      get: function () {
                        return 1024 & this.flags;
                      },
                    },
                  })),
                  (r = Object.assign(new $.FSStream(), r));
                var n = $.nextfd(e, t);
                return (r.fd = n), ($.streams[n] = r), r;
              },
              closeStream: (r) => {
                $.streams[r] = null;
              },
              chrdev_stream_ops: {
                open: (r) => {
                  var e = $.getDevice(r.node.rdev);
                  (r.stream_ops = e.stream_ops),
                    r.stream_ops.open && r.stream_ops.open(r);
                },
                llseek: () => {
                  throw new $.ErrnoError(70);
                },
              },
              major: (r) => r >> 8,
              minor: (r) => 255 & r,
              makedev: (r, e) => (r << 8) | e,
              registerDevice: (r, e) => {
                $.devices[r] = { stream_ops: e };
              },
              getDevice: (r) => $.devices[r],
              getMounts: (r) => {
                for (var e = [], t = [r]; t.length; ) {
                  var n = t.pop();
                  e.push(n), t.push.apply(t, n.mounts);
                }
                return e;
              },
              syncfs: (r, e) => {
                "function" == typeof r && ((e = r), (r = !1)),
                  $.syncFSRequests++,
                  $.syncFSRequests > 1 &&
                    p(
                      "warning: " +
                        $.syncFSRequests +
                        " FS.syncfs operations in flight at once, probably just doing extra work"
                    );
                var t = $.getMounts($.root.mount),
                  n = 0;
                function o(r) {
                  return $.syncFSRequests--, e(r);
                }
                function a(r) {
                  if (r) return a.errored ? void 0 : ((a.errored = !0), o(r));
                  ++n >= t.length && o(null);
                }
                t.forEach((e) => {
                  if (!e.type.syncfs) return a(null);
                  e.type.syncfs(e, r, a);
                });
              },
              mount: (r, e, t) => {
                var n,
                  o = "/" === t,
                  a = !t;
                if (o && $.root) throw new $.ErrnoError(10);
                if (!o && !a) {
                  var i = $.lookupPath(t, { follow_mount: !1 });
                  if (((t = i.path), (n = i.node), $.isMountpoint(n))) {
                    throw new $.ErrnoError(10);
                  }
                  if (!$.isDir(n.mode)) throw new $.ErrnoError(54);
                }
                var s = { type: r, opts: e, mountpoint: t, mounts: [] },
                  u = r.mount(s);
                return (
                  (u.mount = s),
                  (s.root = u),
                  o
                    ? ($.root = u)
                    : n && ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                  u
                );
              },
              unmount: (r) => {
                var e = $.lookupPath(r, { follow_mount: !1 });
                if (!$.isMountpoint(e.node)) throw new $.ErrnoError(28);
                var t = e.node,
                  n = t.mounted,
                  o = $.getMounts(n);
                Object.keys($.nameTable).forEach((r) => {
                  for (var e = $.nameTable[r]; e; ) {
                    var t = e.name_next;
                    o.includes(e.mount) && $.destroyNode(e), (e = t);
                  }
                }),
                  (t.mounted = null);
                var a = t.mount.mounts.indexOf(n);
                t.mount.mounts.splice(a, 1);
              },
              lookup: (r, e) => r.node_ops.lookup(r, e),
              mknod: (r, e, t) => {
                var n = $.lookupPath(r, { parent: !0 }).node,
                  o = W.basename(r);
                if (!o || "." === o || ".." === o) throw new $.ErrnoError(28);
                var a = $.mayCreate(n, o);
                if (a) {
                  throw new $.ErrnoError(a);
                }
                if (!n.node_ops.mknod) {
                  throw new $.ErrnoError(63);
                }
                return n.node_ops.mknod(n, o, e, t);
              },
              create: (r, e) => (
                (e = void 0 !== e ? e : 438),
                (e &= 4095),
                (e |= 32768),
                $.mknod(r, e, 0)
              ),
              mkdir: (r, e) => (
                (e = void 0 !== e ? e : 511),
                (e &= 1023),
                (e |= 16384),
                $.mknod(r, e, 0)
              ),
              mkdirTree: (r, e) => {
                for (var t = r.split("/"), n = "", o = 0; o < t.length; ++o) {
                  if (t[o]) {
                    n += "/" + t[o];
                    try {
                      $.mkdir(n, e);
                    } catch (r) {
                      if (20 != r.errno) throw r;
                    }
                  }
                }
              },
              mkdev: (r, e, t) => (
                void 0 === t && ((t = e), (e = 438)),
                (e |= 8192),
                $.mknod(r, e, t)
              ),
              symlink: (r, e) => {
                if (!J.resolve(r)) throw new $.ErrnoError(44);
                var t = $.lookupPath(e, { parent: !0 }).node;
                if (!t) throw new $.ErrnoError(44);
                var n = W.basename(e),
                  o = $.mayCreate(t, n);
                if (o) {
                  throw new $.ErrnoError(o);
                }
                if (!t.node_ops.symlink) throw new $.ErrnoError(63);
                return t.node_ops.symlink(t, n, r);
              },
              rename: (r, e) => {
                var t,
                  n,
                  o = W.dirname(r),
                  a = W.dirname(e),
                  i = W.basename(r),
                  s = W.basename(e);
                if (
                  ((t = $.lookupPath(r, { parent: !0 }).node),
                  (n = $.lookupPath(e, { parent: !0 }).node),
                  !t || !n)
                ) {
                  throw new $.ErrnoError(44);
                }
                if (t.mount !== n.mount) {
                  throw new $.ErrnoError(75);
                }
                var u,
                  c = $.lookupNode(t, i),
                  l = J.relative(r, a);
                if ("." !== l.charAt(0)) throw new $.ErrnoError(28);
                if ("." !== (l = J.relative(e, o)).charAt(0)) {
                  throw new $.ErrnoError(55);
                }
                try {
                  u = $.lookupNode(n, s);
                } catch (r) {}
                if (c !== u) {
                  var d = $.isDir(c.mode),
                    f = $.mayDelete(t, i, d);
                  if (f) throw new $.ErrnoError(f);
                  if ((f = u ? $.mayDelete(n, s, d) : $.mayCreate(n, s))) {
                    throw new $.ErrnoError(f);
                  }
                  if (!t.node_ops.rename) {
                    throw new $.ErrnoError(63);
                  }
                  if ($.isMountpoint(c) || (u && $.isMountpoint(u))) {
                    throw new $.ErrnoError(10);
                  }
                  if (n !== t && (f = $.nodePermissions(t, "w"))) {
                    throw new $.ErrnoError(f);
                  }
                  $.hashRemoveNode(c);
                  try {
                    t.node_ops.rename(c, n, s);
                  } catch (r) {
                    throw r;
                  } finally {
                    $.hashAddNode(c);
                  }
                }
              },
              rmdir: (r) => {
                var e = $.lookupPath(r, { parent: !0 }).node,
                  t = W.basename(r),
                  n = $.lookupNode(e, t),
                  o = $.mayDelete(e, t, !0);
                if (o) throw new $.ErrnoError(o);
                if (!e.node_ops.rmdir) {
                  throw new $.ErrnoError(63);
                }
                if ($.isMountpoint(n)) throw new $.ErrnoError(10);
                e.node_ops.rmdir(e, t), $.destroyNode(n);
              },
              readdir: (r) => {
                var e = $.lookupPath(r, { follow: !0 }).node;
                if (!e.node_ops.readdir) throw new $.ErrnoError(54);
                return e.node_ops.readdir(e);
              },
              unlink: (r) => {
                var e = $.lookupPath(r, { parent: !0 }).node;
                if (!e) throw new $.ErrnoError(44);
                var t = W.basename(r),
                  n = $.lookupNode(e, t),
                  o = $.mayDelete(e, t, !1);
                if (o) throw new $.ErrnoError(o);
                if (!e.node_ops.unlink) throw new $.ErrnoError(63);
                if ($.isMountpoint(n)) throw new $.ErrnoError(10);
                e.node_ops.unlink(e, t), $.destroyNode(n);
              },
              readlink: (r) => {
                var e = $.lookupPath(r).node;
                if (!e) throw new $.ErrnoError(44);
                if (!e.node_ops.readlink) throw new $.ErrnoError(28);
                return J.resolve($.getPath(e.parent), e.node_ops.readlink(e));
              },
              stat: (r, e) => {
                var t = $.lookupPath(r, { follow: !e }).node;
                if (!t) throw new $.ErrnoError(44);
                if (!t.node_ops.getattr) {
                  throw new $.ErrnoError(63);
                }
                return t.node_ops.getattr(t);
              },
              lstat: (r) => $.stat(r, !0),
              chmod: (r, e, t) => {
                var n;
                if (
                  !(n =
                    "string" == typeof r
                      ? $.lookupPath(r, { follow: !t }).node
                      : r).node_ops.setattr
                ) {
                  throw new $.ErrnoError(63);
                }
                n.node_ops.setattr(n, {
                  mode: (4095 & e) | (-4096 & n.mode),
                  timestamp: Date.now(),
                });
              },
              lchmod: (r, e) => {
                $.chmod(r, e, !0);
              },
              fchmod: (r, e) => {
                var t = $.getStream(r);
                if (!t) throw new $.ErrnoError(8);
                $.chmod(t.node, e);
              },
              chown: (r, e, t, n) => {
                var o;
                if (
                  !(o =
                    "string" == typeof r
                      ? $.lookupPath(r, { follow: !n }).node
                      : r).node_ops.setattr
                ) {
                  throw new $.ErrnoError(63);
                }
                o.node_ops.setattr(o, { timestamp: Date.now() });
              },
              lchown: (r, e, t) => {
                $.chown(r, e, t, !0);
              },
              fchown: (r, e, t) => {
                var n = $.getStream(r);
                if (!n) throw new $.ErrnoError(8);
                $.chown(n.node, e, t);
              },
              truncate: (r, e) => {
                if (e < 0) throw new $.ErrnoError(28);
                var t;
                if (
                  !(t =
                    "string" == typeof r
                      ? $.lookupPath(r, { follow: !0 }).node
                      : r).node_ops.setattr
                ) {
                  throw new $.ErrnoError(63);
                }
                if ($.isDir(t.mode)) throw new $.ErrnoError(31);
                if (!$.isFile(t.mode)) throw new $.ErrnoError(28);
                var n = $.nodePermissions(t, "w");
                if (n) throw new $.ErrnoError(n);
                t.node_ops.setattr(t, { size: e, timestamp: Date.now() });
              },
              ftruncate: (r, e) => {
                var t = $.getStream(r);
                if (!t) throw new $.ErrnoError(8);
                if (0 == (2097155 & t.flags)) throw new $.ErrnoError(28);
                $.truncate(t.node, e);
              },
              utime: (r, e, t) => {
                var n = $.lookupPath(r, { follow: !0 }).node;
                n.node_ops.setattr(n, { timestamp: Math.max(e, t) });
              },
              open: (r, e, t, n, a) => {
                if ("" === r) throw new $.ErrnoError(44);
                var i;
                if (
                  ((t = void 0 === t ? 438 : t),
                  (t =
                    64 & (e = "string" == typeof e ? $.modeStringToFlags(e) : e)
                      ? (4095 & t) | 32768
                      : 0),
                  "object" == typeof r)
                ) {
                  i = r;
                } else {
                  r = W.normalize(r);
                  try {
                    i = $.lookupPath(r, { follow: !(131072 & e) }).node;
                  } catch (r) {}
                }
                var s = !1;
                if (64 & e) {
                  if (i)
                    if (128 & e) throw new $.ErrnoError(20);
                    else (i = $.mknod(r, t, 0)), (s = !0);
                }
                if (!i) throw new $.ErrnoError(44);
                if (
                  ($.isChrdev(i.mode) && (e &= -513),
                  65536 & e && !$.isDir(i.mode))
                ) {
                  throw new $.ErrnoError(54);
                }
                if (!s) {
                  var u = $.mayOpen(i, e);
                  if (u) throw new $.ErrnoError(u);
                }
                512 & e && $.truncate(i, 0), (e &= -131713);
                var c = $.createStream(
                  {
                    node: i,
                    path: $.getPath(i),
                    flags: e,
                    seekable: !0,
                    position: 0,
                    stream_ops: i.stream_ops,
                    ungotten: [],
                    error: !1,
                  },
                  n,
                  a
                );
                return (
                  c.stream_ops.open && c.stream_ops.open(c),
                  !o.logReadFiles ||
                    1 & e ||
                    ($.readFiles || ($.readFiles = {}),
                    r in $.readFiles || ($.readFiles[r] = 1)),
                  c
                );
              },
              close: (r) => {
                if ($.isClosed(r)) throw new $.ErrnoError(8);
                r.getdents && (r.getdents = null);
                try {
                  r.stream_ops.close && r.stream_ops.close(r);
                } catch (r) {
                  throw r;
                } finally {
                  $.closeStream(r.fd);
                }
                r.fd = null;
              },
              isClosed: (r) => null === r.fd,
              llseek: (r, e, t) => {
                if ($.isClosed(r)) throw new $.ErrnoError(8);
                if (!r.seekable || !r.stream_ops.llseek) {
                  throw new $.ErrnoError(70);
                }
                if (0 != t && 1 != t && 2 != t) throw new $.ErrnoError(28);
                return (
                  (r.position = r.stream_ops.llseek(r, e, t)),
                  (r.ungotten = []),
                  r.position
                );
              },
              read: (r, e, t, n, o) => {
                if (n < 0 || o < 0) throw new $.ErrnoError(28);
                if ($.isClosed(r)) {
                  throw new $.ErrnoError(8);
                }
                if (1 == (2097155 & r.flags)) throw new $.ErrnoError(8);
                if ($.isDir(r.node.mode)) throw new $.ErrnoError(31);
                if (!r.stream_ops.read) throw new $.ErrnoError(28);
                var a = void 0 !== o;
                if (a)
                  if (!r.seekable) throw new $.ErrnoError(70);
                  else o = r.position;
                var i = r.stream_ops.read(r, e, t, n, o);
                return a || (r.position += i), i;
              },
              write: (r, e, t, n, o, a) => {
                if (n < 0 || o < 0) throw new $.ErrnoError(28);
                if ($.isClosed(r)) throw new $.ErrnoError(8);
                if (0 == (2097155 & r.flags)) throw new $.ErrnoError(8);
                if ($.isDir(r.node.mode)) throw new $.ErrnoError(31);
                if (!r.stream_ops.write) throw new $.ErrnoError(28);
                r.seekable && 1024 & r.flags && $.llseek(r, 0, 2);
                var i = void 0 !== o;
                if (i)
                  if (!r.seekable) throw new $.ErrnoError(70);
                  else o = r.position;
                var s = r.stream_ops.write(r, e, t, n, o, a);
                return i || (r.position += s), s;
              },
              allocate: (r, e, t) => {
                if ($.isClosed(r)) throw new $.ErrnoError(8);
                if (e < 0 || t <= 0) throw new $.ErrnoError(28);
                if (0 == (2097155 & r.flags)) throw new $.ErrnoError(8);
                if (!$.isFile(r.node.mode) && !$.isDir(r.node.mode)) {
                  throw new $.ErrnoError(43);
                }
                if (!r.stream_ops.allocate) {
                  throw new $.ErrnoError(138);
                }
                r.stream_ops.allocate(r, e, t);
              },
              mmap: (r, e, t, n, o, a) => {
                if (0 != (2 & o) && 0 == (2 & a) && 2 != (2097155 & r.flags)) {
                  throw new $.ErrnoError(2);
                }
                if (1 == (2097155 & r.flags)) throw new $.ErrnoError(2);
                if (!r.stream_ops.mmap) throw new $.ErrnoError(43);
                return r.stream_ops.mmap(r, e, t, n, o, a);
              },
              msync: (r, e, t, n, o) =>
                r && r.stream_ops.msync ? r.stream_ops.msync(r, e, t, n, o) : 0,
              munmap: (r) => 0,
              ioctl: (r, e, t) => {
                if (!r.stream_ops.ioctl) throw new $.ErrnoError(59);
                return r.stream_ops.ioctl(r, e, t);
              },
              readFile: (r, e = {}) => {
                if (
                  ((e.flags = e.flags || 0),
                  (e.encoding = e.encoding || "binary"),
                  "utf8" !== e.encoding && "binary" !== e.encoding)
                ) {
                  throw new Error('Invalid encoding type "' + e.encoding + '"');
                }
                var t,
                  n = $.open(r, e.flags),
                  o = $.stat(r).size,
                  a = new Uint8Array(o);
                return (
                  $.read(n, a, 0, o, 0),
                  "utf8" === e.encoding
                    ? (t = k(a, 0))
                    : "binary" === e.encoding && (t = a),
                  $.close(n),
                  t
                );
              },
              writeFile: (r, e, t = {}) => {
                t.flags = t.flags || 577;
                var n = $.open(r, t.flags, t.mode);
                if ("string" == typeof e) {
                  var o = new Uint8Array(P(e) + 1),
                    a = S(e, o, 0, o.length);
                  $.write(n, o, 0, a, void 0, t.canOwn);
                } else {
                  if (!ArrayBuffer.isView(e)) {
                    throw new Error("Unsupported data type");
                  }
                  $.write(n, e, 0, e.byteLength, void 0, t.canOwn);
                }
                $.close(n);
              },
              cwd: () => $.currentPath,
              chdir: (r) => {
                var e = $.lookupPath(r, { follow: !0 });
                if (null === e.node) throw new $.ErrnoError(44);
                if (!$.isDir(e.node.mode)) throw new $.ErrnoError(54);
                var t = $.nodePermissions(e.node, "x");
                if (t) throw new $.ErrnoError(t);
                $.currentPath = e.path;
              },
              createDefaultDirectories: () => {
                $.mkdir("/tmp"), $.mkdir("/home"), $.mkdir("/home/web_user");
              },
              createDefaultDevices: () => {
                $.mkdir("/dev"),
                  $.registerDevice($.makedev(1, 3), {
                    read: () => 0,
                    write: (r, e, t, n, o) => n,
                  }),
                  $.mkdev("/dev/null", $.makedev(1, 3)),
                  V.register($.makedev(5, 0), V.default_tty_ops),
                  V.register($.makedev(6, 0), V.default_tty1_ops),
                  $.mkdev("/dev/tty", $.makedev(5, 0)),
                  $.mkdev("/dev/tty1", $.makedev(6, 0));
                var r = (function () {
                  if (
                    "object" == typeof crypto &&
                    "function" == typeof crypto.getRandomValues
                  ) {
                    var r = new Uint8Array(1);
                    return function () {
                      return crypto.getRandomValues(r), r[0];
                    };
                  }
                  return function () {
                    L("randomDevice");
                  };
                })();
                $.createDevice("/dev", "random", r),
                  $.createDevice("/dev", "urandom", r),
                  $.mkdir("/dev/shm"),
                  $.mkdir("/dev/shm/tmp");
              },
              createSpecialDirectories: () => {
                $.mkdir("/proc");
                var r = $.mkdir("/proc/self");
                $.mkdir("/proc/self/fd"),
                  $.mount(
                    {
                      mount: () => {
                        var e = $.createNode(r, "fd", 16895, 73);
                        return (
                          (e.node_ops = {
                            lookup: (r, e) => {
                              var t = +e,
                                n = $.getStream(t);
                              if (!n) throw new $.ErrnoError(8);
                              var o = {
                                parent: null,
                                mount: { mountpoint: "fake" },
                                node_ops: { readlink: () => n.path },
                              };
                              return (o.parent = o), o;
                            },
                          }),
                          e
                        );
                      },
                    },
                    {},
                    "/proc/self/fd"
                  );
              },
              createStandardStreams: () => {
                o.stdin
                  ? $.createDevice("/dev", "stdin", o.stdin)
                  : $.symlink("/dev/tty", "/dev/stdin"),
                  o.stdout
                    ? $.createDevice("/dev", "stdout", null, o.stdout)
                    : $.symlink("/dev/tty", "/dev/stdout"),
                  o.stderr
                    ? $.createDevice("/dev", "stderr", null, o.stderr)
                    : $.symlink("/dev/tty1", "/dev/stderr"),
                  $.open("/dev/stdin", 0),
                  $.open("/dev/stdout", 1),
                  $.open("/dev/stderr", 1);
              },
              ensureErrnoError: () => {
                $.ErrnoError ||
                  (($.ErrnoError = function (r, e) {
                    (this.node = e),
                      (this.setErrno = function (r) {
                        this.errno = r;
                      }),
                      this.setErrno(r),
                      (this.message = "FS error");
                  }),
                  ($.ErrnoError.prototype = new Error()),
                  ($.ErrnoError.prototype.constructor = $.ErrnoError),
                  [44].forEach((r) => {
                    ($.genericErrors[r] = new $.ErrnoError(r)),
                      ($.genericErrors[r].stack = "<generic error, no stack>");
                  }));
              },
              staticInit: () => {
                $.ensureErrnoError(),
                  ($.nameTable = new Array(4096)),
                  $.mount(X, {}, "/"),
                  $.createDefaultDirectories(),
                  $.createDefaultDevices(),
                  $.createSpecialDirectories(),
                  ($.filesystems = { MEMFS: X });
              },
              init: (r, e, t) => {
                ($.init.initialized = !0),
                  $.ensureErrnoError(),
                  (o.stdin = r || o.stdin),
                  (o.stdout = e || o.stdout),
                  (o.stderr = t || o.stderr),
                  $.createStandardStreams();
              },
              quit: () => {
                $.init.initialized = !1;
                for (var r = 0; r < $.streams.length; r++) {
                  var e = $.streams[r];
                  e && $.close(e);
                }
              },
              getMode: (r, e) => {
                var t = 0;
                return r && (t |= 365), e && (t |= 146), t;
              },
              findObject: (r, e) => {
                var t = $.analyzePath(r, e);
                return t.exists ? t.object : null;
              },
              analyzePath: (r, e) => {
                try {
                  r = (n = $.lookupPath(r, { follow: !e })).path;
                } catch (r) {}
                var t = {
                  isRoot: !1,
                  exists: !1,
                  error: 0,
                  name: null,
                  path: null,
                  object: null,
                  parentExists: !1,
                  parentPath: null,
                  parentObject: null,
                };
                try {
                  var n = $.lookupPath(r, { parent: !0 });
                  (t.parentExists = !0),
                    (t.parentPath = n.path),
                    (t.parentObject = n.node),
                    (t.name = W.basename(r)),
                    (n = $.lookupPath(r, { follow: !e })),
                    (t.exists = !0),
                    (t.path = n.path),
                    (t.object = n.node),
                    (t.name = n.node.name),
                    (t.isRoot = "/" === n.path);
                } catch (r) {
                  t.error = r.errno;
                }
                return t;
              },
              createPath: (r, e, t, n) => {
                r = "string" == typeof r ? r : $.getPath(r);
                for (var o = e.split("/").reverse(); o.length; ) {
                  var a = o.pop();
                  if (a) {
                    var i = W.join2(r, a);
                    try {
                      $.mkdir(i);
                    } catch (r) {}
                    r = i;
                  }
                }
                return i;
              },
              createFile: (r, e, t, n, o) => {
                var a = W.join2("string" == typeof r ? r : $.getPath(r), e),
                  i = $.getMode(n, o);
                return $.create(a, i);
              },
              createDataFile: (r, e, t, n, o, a) => {
                var i = e;
                r &&
                  ((r = "string" == typeof r ? r : $.getPath(r)),
                  (i = e ? W.join2(r, e) : r));
                var s = $.getMode(n, o),
                  u = $.create(i, s);
                if (t) {
                  if ("string" == typeof t) {
                    for (
                      var c = new Array(t.length), l = 0, d = t.length;
                      l < d;
                      ++l
                    ) {
                      c[l] = t.charCodeAt(l);
                    }
                    t = c;
                  }
                  $.chmod(u, 146 | s);
                  var f = $.open(u, 577);
                  $.write(f, t, 0, t.length, 0, a), $.close(f), $.chmod(u, s);
                }
                return u;
              },
              createDevice: (r, e, t, n) => {
                var o = W.join2("string" == typeof r ? r : $.getPath(r), e),
                  a = $.getMode(!!t, !!n);
                $.createDevice.major || ($.createDevice.major = 64);
                var i = $.makedev($.createDevice.major++, 0);
                return (
                  $.registerDevice(i, {
                    open: (r) => {
                      r.seekable = !1;
                    },
                    close: (r) => {
                      n && n.buffer && n.buffer.length && n(10);
                    },
                    read: (r, e, n, o, a) => {
                      for (var i = 0, s = 0; s < o; s++) {
                        var u;
                        try {
                          u = t();
                        } catch (r) {
                          throw new $.ErrnoError(29);
                        }
                        if (void 0 === u && 0 === i) throw new $.ErrnoError(6);
                        if (null == u) break;
                        i++, (e[n + s] = u);
                      }
                      return i && (r.node.timestamp = Date.now()), i;
                    },
                    write: (r, e, t, o, a) => {
                      for (var i = 0; i < o; i++) {
                        try {
                          n(e[t + i]);
                        } catch (r) {
                          throw new $.ErrnoError(29);
                        }
                      }
                      return o && (r.node.timestamp = Date.now()), i;
                    },
                  }),
                  $.mkdev(o, a, i)
                );
              },
              forceLoadFile: (r) => {
                if (r.isDevice || r.isFolder || r.link || r.contents) return !0;
                if ("undefined" != typeof XMLHttpRequest) {
                  throw new Error(
                    "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                  );
                }
                if (!a) {
                  throw new Error(
                    "Cannot load without read() or XMLHttpRequest."
                  );
                }
                try {
                  (r.contents = or(a(r.url), !0)),
                    (r.usedBytes = r.contents.length);
                } catch (r) {
                  throw new $.ErrnoError(29);
                }
              },
              createLazyFile: (r, e, t, n, o) => {
                function a() {
                  (this.lengthKnown = !1), (this.chunks = []);
                }
                if (
                  ((a.prototype.get = function (r) {
                    if (!(r > this.length - 1 || r < 0)) {
                      var e = r % this.chunkSize,
                        t = (r / this.chunkSize) | 0;
                      return this.getter(t)[e];
                    }
                  }),
                  (a.prototype.setDataGetter = function (r) {
                    this.getter = r;
                  }),
                  (a.prototype.cacheLength = function () {
                    var r = new XMLHttpRequest();
                    if (
                      (r.open("HEAD", t, !1),
                      r.send(null),
                      !(
                        (r.status >= 200 && r.status < 300) ||
                        304 === r.status
                      ))
                    ) {
                      throw new Error(
                        "Couldn't load " + t + ". Status: " + r.status
                      );
                    }
                    var e,
                      n = Number(r.getResponseHeader("Content-length")),
                      o =
                        (e = r.getResponseHeader("Accept-Ranges")) &&
                        "bytes" === e,
                      a =
                        (e = r.getResponseHeader("Content-Encoding")) &&
                        "gzip" === e,
                      i = 1048576;
                    o || (i = n);
                    var s = this;
                    s.setDataGetter((r) => {
                      var e = r * i,
                        o = (r + 1) * i - 1;
                      if (
                        ((o = Math.min(o, n - 1)),
                        void 0 === s.chunks[r] &&
                          (s.chunks[r] = ((r, e) => {
                            if (r > e) {
                              throw new Error(
                                "invalid range (" +
                                  r +
                                  ", " +
                                  e +
                                  ") or no bytes requested!"
                              );
                            }
                            if (e > n - 1) {
                              throw new Error(
                                "only " +
                                  n +
                                  " bytes available! programmer error!"
                              );
                            }
                            var o = new XMLHttpRequest();
                            if (
                              (o.open("GET", t, !1),
                              n !== i &&
                                o.setRequestHeader(
                                  "Range",
                                  "bytes=" + r + "-" + e
                                ),
                              (o.responseType = "arraybuffer"),
                              o.overrideMimeType &&
                                o.overrideMimeType(
                                  "text/plain; charset=x-user-defined"
                                ),
                              o.send(null),
                              !(
                                (o.status >= 200 && o.status < 300) ||
                                304 === o.status
                              ))
                            ) {
                              throw new Error(
                                "Couldn't load " + t + ". Status: " + o.status
                              );
                            }
                            return void 0 !== o.response
                              ? new Uint8Array(o.response || [])
                              : or(o.responseText || "", !0);
                          })(e, o)),
                        void 0 === s.chunks[r])
                      ) {
                        throw new Error("doXHR failed!");
                      }
                      return s.chunks[r];
                    }),
                      (!a && n) ||
                        ((i = n = 1),
                        (n = this.getter(0).length),
                        (i = n),
                        f(
                          "LazyFiles on gzip forces download of the whole file when length is accessed"
                        )),
                      (this._length = n),
                      (this._chunkSize = i),
                      (this.lengthKnown = !0);
                  }),
                  "undefined" != typeof XMLHttpRequest)
                ) {
                  throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                }
                var i = { isDevice: !1, url: t },
                  s = $.createFile(r, e, i, n, o);
                i.contents
                  ? (s.contents = i.contents)
                  : i.url && ((s.contents = null), (s.url = i.url)),
                  Object.defineProperties(s, {
                    usedBytes: {
                      get: function () {
                        return this.contents.length;
                      },
                    },
                  });
                var u = {};
                return (
                  Object.keys(s.stream_ops).forEach((r) => {
                    var e = s.stream_ops[r];
                    u[r] = function () {
                      return $.forceLoadFile(s), e.apply(null, arguments);
                    };
                  }),
                  (u.read = (r, e, t, n, o) => {
                    $.forceLoadFile(s);
                    var a = r.node.contents;
                    if (o >= a.length) return 0;
                    var i = Math.min(a.length - o, n);
                    if (a.slice) {
                      for (var u = 0; u < i; u++) {
                        e[t + u] = a[o + u];
                      }
                    } else for (u = 0; u < i; u++) e[t + u] = a.get(o + u);
                    return i;
                  }),
                  (s.stream_ops = u),
                  s
                );
              },
              createPreloadedFile: (r, e, t, n, o, a, s, u, c, l) => {
                var d = e ? J.resolve(W.join2(r, e)) : r;
                function f(t) {
                  function i(t) {
                    l && l(),
                      u || $.createDataFile(r, e, t, n, o, c),
                      a && a(),
                      O();
                  }
                  Browser.handledByPreloadPlugin(t, d, i, () => {
                    s && s(), O();
                  }) || i(t);
                }
                N(),
                  "string" == typeof t
                    ? (function (r, e, t, n) {
                        var o = n ? "" : "al " + r;
                        i(
                          r,
                          function (t) {
                            h(
                              t,
                              'Loading data file "' +
                                r +
                                '" failed (no arrayBuffer).'
                            ),
                              e(new Uint8Array(t)),
                              o && O();
                          },
                          function (e) {
                            if (!t)
                              throw 'Loading data file "' + r + '" failed.';
                            t();
                          }
                        ),
                          o && N();
                      })(t, (r) => f(r), s)
                    : f(t);
              },
              indexedDB: () =>
                window.indexedDB ||
                window.mozIndexedDB ||
                window.webkitIndexedDB ||
                window.msIndexedDB,
              DB_NAME: () => "EM_FS_" + window.location.pathname,
              DB_VERSION: 20,
              DB_STORE_NAME: "FILE_DATA",
              saveFilesToDB: (r, e, t) => {
                (e = e || (() => {})), (t = t || (() => {}));
                var n = $.indexedDB();
                try {
                  var o = n.open($.DB_NAME(), $.DB_VERSION);
                } catch (r) {
                  return t(r);
                }
                (o.onupgradeneeded = () => {
                  f("creating db"), o.result.createObjectStore($.DB_STORE_NAME);
                }),
                  (o.onsuccess = () => {
                    var n = o.result.transaction(
                        [$.DB_STORE_NAME],
                        "readwrite"
                      ),
                      a = n.objectStore($.DB_STORE_NAME),
                      i = 0,
                      s = 0,
                      u = r.length;
                    function c() {
                      0 == s ? e() : t();
                    }
                    r.forEach((r) => {
                      var e = a.put($.analyzePath(r).object.contents, r);
                      (e.onsuccess = () => {
                        ++i + s == u && c();
                      }),
                        (e.onerror = () => {
                          s++, i + s == u && c();
                        });
                    }),
                      (n.onerror = t);
                  }),
                  (o.onerror = t);
              },
              loadFilesFromDB: (r, e, t) => {
                (e = e || (() => {})), (t = t || (() => {}));
                var n = $.indexedDB();
                try {
                  var o = n.open($.DB_NAME(), $.DB_VERSION);
                } catch (r) {
                  return t(r);
                }
                (o.onupgradeneeded = t),
                  (o.onsuccess = () => {
                    var n = o.result;
                    try {
                      var a = n.transaction([$.DB_STORE_NAME], "readonly");
                    } catch (r) {
                      return void t(r);
                    }
                    var i = a.objectStore($.DB_STORE_NAME),
                      s = 0,
                      u = 0,
                      c = r.length;
                    function l() {
                      0 == u ? e() : t();
                    }
                    r.forEach((r) => {
                      var e = i.get(r);
                      (e.onsuccess = () => {
                        $.analyzePath(r).exists && $.unlink(r),
                          $.createDataFile(
                            W.dirname(r),
                            W.basename(r),
                            e.result,
                            !0,
                            !0,
                            !0
                          ),
                          ++s + u == c && l();
                      }),
                        (e.onerror = () => {
                          u++, s + u == c && l();
                        });
                    }),
                      (a.onerror = t);
                  }),
                  (o.onerror = t);
              },
            },
            K = {
              DEFAULT_POLLMASK: 5,
              calculateAt: function (r, e, t) {
                if ("/" === e[0]) return e;
                var n;
                if (-100 === r) n = $.cwd();
                else {
                  var o = $.getStream(r);
                  if (!o) throw new $.ErrnoError(8);
                  n = o.path;
                }
                if (0 == e.length) {
                  if (!t) throw new $.ErrnoError(44);
                  return n;
                }
                return W.join2(n, e);
              },
              doStat: function (r, e, t) {
                try {
                  var n = r(e);
                } catch (r) {
                  if (
                    r &&
                    r.node &&
                    W.normalize(e) !== W.normalize($.getPath(r.node))
                  ) {
                    return -54;
                  }
                  throw r;
                }
                return (
                  (y[t >> 2] = n.dev),
                  (y[(t + 4) >> 2] = 0),
                  (y[(t + 8) >> 2] = n.ino),
                  (y[(t + 12) >> 2] = n.mode),
                  (y[(t + 16) >> 2] = n.nlink),
                  (y[(t + 20) >> 2] = n.uid),
                  (y[(t + 24) >> 2] = n.gid),
                  (y[(t + 28) >> 2] = n.rdev),
                  (y[(t + 32) >> 2] = 0),
                  (R = [
                    n.size >>> 0,
                    ((M = n.size),
                    +Math.abs(M) >= 1
                      ? M > 0
                        ? (0 |
                            Math.min(
                              +Math.floor(M / 4294967296),
                              4294967295
                            )) >>>
                          0
                        : ~~+Math.ceil((M - +(~~M >>> 0)) / 4294967296) >>> 0
                      : 0),
                  ]),
                  (y[(t + 40) >> 2] = R[0]),
                  (y[(t + 44) >> 2] = R[1]),
                  (y[(t + 48) >> 2] = 4096),
                  (y[(t + 52) >> 2] = n.blocks),
                  (y[(t + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                  (y[(t + 60) >> 2] = 0),
                  (y[(t + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                  (y[(t + 68) >> 2] = 0),
                  (y[(t + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                  (y[(t + 76) >> 2] = 0),
                  (R = [
                    n.ino >>> 0,
                    ((M = n.ino),
                    +Math.abs(M) >= 1
                      ? M > 0
                        ? (0 |
                            Math.min(
                              +Math.floor(M / 4294967296),
                              4294967295
                            )) >>>
                          0
                        : ~~+Math.ceil((M - +(~~M >>> 0)) / 4294967296) >>> 0
                      : 0),
                  ]),
                  (y[(t + 80) >> 2] = R[0]),
                  (y[(t + 84) >> 2] = R[1]),
                  0
                );
              },
              doMsync: function (r, e, t, n, o) {
                var a = _.slice(r, r + t);
                $.msync(e, a, o, t, n);
              },
              doMkdir: function (r, e) {
                return (
                  "/" === (r = W.normalize(r))[r.length - 1] &&
                    (r = r.substr(0, r.length - 1)),
                  $.mkdir(r, e, 0),
                  0
                );
              },
              doMknod: function (r, e, t) {
                switch (61440 & e) {
                  case 32768:
                  case 8192:
                  case 24576:
                  case 4096:
                  case 49152:
                    break;
                  default:
                    return -28;
                }
                return $.mknod(r, e, t), 0;
              },
              doReadlink: function (r, e, t) {
                if (t <= 0) return -28;
                var n = $.readlink(r),
                  o = Math.min(t, P(n)),
                  a = w[e + o];
                return S(n, _, e, t + 1), (w[e + o] = a), o;
              },
              doAccess: function (r, e) {
                if (-8 & e) return -28;
                var t = $.lookupPath(r, { follow: !0 }).node;
                if (!t) return -44;
                var n = "";
                return (
                  4 & e && (n += "r"),
                  2 & e && (n += "w"),
                  1 & e && (n += "x"),
                  n && $.nodePermissions(t, n) ? -2 : 0
                );
              },
              doDup: function (r, e, t) {
                var n = $.getStream(t);
                return n && $.close(n), $.open(r, e, 0, t, t).fd;
              },
              doReadv: function (r, e, t, n) {
                for (var o = 0, a = 0; a < t; a++) {
                  var i = y[(e + 8 * a) >> 2],
                    s = y[(e + (8 * a + 4)) >> 2],
                    u = $.read(r, w, i, s, n);
                  if (u < 0) return -1;
                  if (((o += u), u < s)) break;
                }
                return o;
              },
              doWritev: function (r, e, t, n) {
                for (var o = 0, a = 0; a < t; a++) {
                  var i = y[(e + 8 * a) >> 2],
                    s = y[(e + (8 * a + 4)) >> 2],
                    u = $.write(r, w, i, s, n);
                  if (u < 0) return -1;
                  o += u;
                }
                return o;
              },
              varargs: void 0,
              get: function () {
                return (K.varargs += 4), y[(K.varargs - 4) >> 2];
              },
              getStr: function (r) {
                return D(r);
              },
              getStreamFromFD: function (r) {
                var e = $.getStream(r);
                if (!e) throw new $.ErrnoError(8);
                return e;
              },
              get64: function (r, e) {
                return r;
              },
            },
            Y = [];
          function Q(r) {
            try {
              return d.grow((r - v.byteLength + 65535) >>> 16), A(d.buffer), 1;
            } catch (r) {}
          }
          var Z = {};
          function rr() {
            if (!rr.strings) {
              var r = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG:
                  (
                    ("object" == typeof navigator &&
                      navigator.languages &&
                      navigator.languages[0]) ||
                    "C"
                  ).replace("-", "_") + ".UTF-8",
                _: u || "./this.program",
              };
              for (var e in Z) void 0 === Z[e] ? delete r[e] : (r[e] = Z[e]);
              var t = [];
              for (var e in r) t.push(e + "=" + r[e]);
              rr.strings = t;
            }
            return rr.strings;
          }
          var er = function (r, e, t, n) {
              r || (r = this),
                (this.parent = r),
                (this.mount = r.mount),
                (this.mounted = null),
                (this.id = $.nextInode++),
                (this.name = e),
                (this.mode = t),
                (this.node_ops = {}),
                (this.stream_ops = {}),
                (this.rdev = n);
            },
            tr = 365,
            nr = 146;
          function or(r, e, t) {
            var n = t > 0 ? t : P(r) + 1,
              o = new Array(n),
              a = S(r, o, 0, o.length);
            return e && (o.length = a), o;
          }
          Object.defineProperties(er.prototype, {
            read: {
              get: function () {
                return (this.mode & tr) === tr;
              },
              set: function (r) {
                r ? (this.mode |= tr) : (this.mode &= -366);
              },
            },
            write: {
              get: function () {
                return (this.mode & nr) === nr;
              },
              set: function (r) {
                r ? (this.mode |= nr) : (this.mode &= -147);
              },
            },
            isFolder: {
              get: function () {
                return $.isDir(this.mode);
              },
            },
            isDevice: {
              get: function () {
                return $.isChrdev(this.mode);
              },
            },
          }),
            ($.FSNode = er),
            $.staticInit();
          var ar = {
            g: function (r, e, t) {
              K.varargs = t;
              try {
                var n = K.getStr(r),
                  o = t ? K.get() : 0;
                return $.open(n, e, o).fd;
              } catch (r) {
                if (void 0 === $ || !(r instanceof $.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            d: function () {
              L("");
            },
            a: function (r, e, t) {
              var n = (function (r, e) {
                var t;
                for (Y.length = 0, e >>= 2; (t = _[r++]); ) {
                  var n = t < 105;
                  n && 1 & e && e++, Y.push(n ? E[e++ >> 1] : y[e]), ++e;
                }
                return Y;
              })(e, t);
              return U[r].apply(null, n);
            },
            j: function (r, e, t) {
              _.copyWithin(r, e, e + t);
            },
            e: function (r) {
              var e,
                t,
                n = _.length,
                o = 2147483648;
              if ((r >>>= 0) > o) return !1;
              for (var a = 1; a <= 4; a *= 2) {
                var i = n * (1 + 0.2 / a);
                if (
                  ((i = Math.min(i, r + 100663296)),
                  Q(
                    Math.min(
                      o,
                      (e = Math.max(r, i)) + (((t = 65536) - (e % t)) % t)
                    )
                  ))
                ) {
                  return !0;
                }
              }
              return !1;
            },
            h: function (r, e) {
              var t = 0;
              return (
                rr().forEach(function (n, o) {
                  var a = e + t;
                  (y[(r + 4 * o) >> 2] = a),
                    (function (r, e, t) {
                      for (var n = 0; n < r.length; ++n) {
                        w[e++ >> 0] = r.charCodeAt(n);
                      }
                      t || (w[e >> 0] = 0);
                    })(n, a),
                    (t += n.length + 1);
                }),
                0
              );
            },
            i: function (r, e) {
              var t = rr();
              y[r >> 2] = t.length;
              var n = 0;
              return (
                t.forEach(function (r) {
                  n += r.length + 1;
                }),
                (y[e >> 2] = n),
                0
              );
            },
            c: function (r) {
              try {
                var e = K.getStreamFromFD(r);
                return $.close(e), 0;
              } catch (r) {
                if (void 0 === $ || !(r instanceof $.ErrnoError)) throw r;
                return r.errno;
              }
            },
            f: function (r, e, t, n) {
              try {
                var o = K.getStreamFromFD(r),
                  a = K.doReadv(o, e, t);
                return (y[n >> 2] = a), 0;
              } catch (r) {
                if (void 0 === $ || !(r instanceof $.ErrnoError)) throw r;
                return r.errno;
              }
            },
            k: function (r, e, t, n, o) {
              try {
                var a = K.getStreamFromFD(r),
                  i = 4294967296 * t + (e >>> 0),
                  s = 9007199254740992;
                return i <= -s || i >= s
                  ? -61
                  : ($.llseek(a, i, n),
                    (R = [
                      a.position >>> 0,
                      ((M = a.position),
                      +Math.abs(M) >= 1
                        ? M > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(M / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((M - +(~~M >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (y[o >> 2] = R[0]),
                    (y[(o + 4) >> 2] = R[1]),
                    a.getdents && 0 === i && 0 === n && (a.getdents = null),
                    0);
              } catch (r) {
                if (void 0 === $ || !(r instanceof $.ErrnoError)) throw r;
                return r.errno;
              }
            },
            b: function (r, e, t, n) {
              try {
                var o = K.getStreamFromFD(r),
                  a = K.doWritev(o, e, t);
                return (y[n >> 2] = a), 0;
              } catch (r) {
                if (void 0 === $ || !(r instanceof $.ErrnoError)) throw r;
                return r.errno;
              }
            },
            l: function (r) {
              var e = Date.now();
              return (
                (y[r >> 2] = (e / 1e3) | 0),
                (y[(r + 4) >> 2] = ((e % 1e3) * 1e3) | 0),
                0
              );
            },
          };
          !(function () {
            var r = { a: ar };
            function e(r, e) {
              var t,
                n = r.exports;
              (o.asm = n),
                A((d = o.asm.m).buffer),
                (g = o.asm.G),
                (t = o.asm.n),
                z.unshift(t),
                O();
            }
            function t(r) {
              e(r.instance);
            }
            function a(e) {
              return (
                l || "function" != typeof fetch
                  ? Promise.resolve().then(function () {
                      return H(F);
                    })
                  : fetch(F, { credentials: "same-origin" })
                      .then(function (r) {
                        if (!r.ok) {
                          throw (
                            "failed to load wasm binary file at '" + F + "'"
                          );
                        }
                        return r.arrayBuffer();
                      })
                      .catch(function () {
                        return H(F);
                      })
              )
                .then(function (e) {
                  return WebAssembly.instantiate(e, r);
                })
                .then(function (r) {
                  return r;
                })
                .then(e, function (r) {
                  p("failed to asynchronously prepare wasm: " + r), L(r);
                });
            }
            if ((N(), o.instantiateWasm)) {
              try {
                return o.instantiateWasm(r, e);
              } catch (r) {
                return (
                  p("Module.instantiateWasm callback failed with error: " + r),
                  !1
                );
              }
            }
            (l ||
            "function" != typeof WebAssembly.instantiateStreaming ||
            I(F) ||
            "function" != typeof fetch
              ? a(t)
              : fetch(F, { credentials: "same-origin" }).then(function (e) {
                  return WebAssembly.instantiateStreaming(e, r).then(
                    t,
                    function (r) {
                      return (
                        p("wasm streaming compile failed: " + r),
                        p("falling back to ArrayBuffer instantiation"),
                        a(t)
                      );
                    }
                  );
                })
            ).catch(n);
          })(),
            (o.___wasm_call_ctors = function () {
              return (o.___wasm_call_ctors = o.asm.n).apply(null, arguments);
            });
          var ir,
            sr = (o._emscripten_bind_CExpat_CExpat_0 = function () {
              return (sr = o._emscripten_bind_CExpat_CExpat_0 = o.asm.o).apply(
                null,
                arguments
              );
            }),
            ur = (o._emscripten_bind_CExpat_version_0 = function () {
              return (ur = o._emscripten_bind_CExpat_version_0 = o.asm.p).apply(
                null,
                arguments
              );
            }),
            cr = (o._emscripten_bind_CExpat_create_0 = function () {
              return (cr = o._emscripten_bind_CExpat_create_0 = o.asm.q).apply(
                null,
                arguments
              );
            }),
            lr = (o._emscripten_bind_CExpat_destroy_0 = function () {
              return (lr = o._emscripten_bind_CExpat_destroy_0 = o.asm.r).apply(
                null,
                arguments
              );
            }),
            dr = (o._emscripten_bind_CExpat_parse_1 = function () {
              return (dr = o._emscripten_bind_CExpat_parse_1 = o.asm.s).apply(
                null,
                arguments
              );
            }),
            fr = (o._emscripten_bind_CExpat_tag_0 = function () {
              return (fr = o._emscripten_bind_CExpat_tag_0 = o.asm.t).apply(
                null,
                arguments
              );
            }),
            pr = (o._emscripten_bind_CExpat_attrs_0 = function () {
              return (pr = o._emscripten_bind_CExpat_attrs_0 = o.asm.u).apply(
                null,
                arguments
              );
            }),
            mr = (o._emscripten_bind_CExpat_content_0 = function () {
              return (mr = o._emscripten_bind_CExpat_content_0 = o.asm.v).apply(
                null,
                arguments
              );
            }),
            hr = (o._emscripten_bind_CExpat_startElement_0 = function () {
              return (hr = o._emscripten_bind_CExpat_startElement_0 =
                o.asm.w).apply(null, arguments);
            }),
            vr = (o._emscripten_bind_CExpat_endElement_0 = function () {
              return (vr = o._emscripten_bind_CExpat_endElement_0 =
                o.asm.x).apply(null, arguments);
            }),
            wr = (o._emscripten_bind_CExpat_characterData_0 = function () {
              return (wr = o._emscripten_bind_CExpat_characterData_0 =
                o.asm.y).apply(null, arguments);
            }),
            _r = (o._emscripten_bind_CExpat___destroy___0 = function () {
              return (_r = o._emscripten_bind_CExpat___destroy___0 =
                o.asm.z).apply(null, arguments);
            }),
            yr = (o._emscripten_bind_VoidPtr___destroy___0 = function () {
              return (yr = o._emscripten_bind_VoidPtr___destroy___0 =
                o.asm.A).apply(null, arguments);
            }),
            Er = (o._emscripten_bind_CExpatJS_CExpatJS_0 = function () {
              return (Er = o._emscripten_bind_CExpatJS_CExpatJS_0 =
                o.asm.B).apply(null, arguments);
            }),
            gr = (o._emscripten_bind_CExpatJS_startElement_0 = function () {
              return (gr = o._emscripten_bind_CExpatJS_startElement_0 =
                o.asm.C).apply(null, arguments);
            }),
            br = (o._emscripten_bind_CExpatJS_endElement_0 = function () {
              return (br = o._emscripten_bind_CExpatJS_endElement_0 =
                o.asm.D).apply(null, arguments);
            }),
            kr = (o._emscripten_bind_CExpatJS_characterData_0 = function () {
              return (kr = o._emscripten_bind_CExpatJS_characterData_0 =
                o.asm.E).apply(null, arguments);
            }),
            Dr = (o._emscripten_bind_CExpatJS___destroy___0 = function () {
              return (Dr = o._emscripten_bind_CExpatJS___destroy___0 =
                o.asm.F).apply(null, arguments);
            });
          function Sr(r) {
            function t() {
              ir ||
                ((ir = !0),
                (o.calledRun = !0),
                m ||
                  (o.noFSInit || $.init.initialized || $.init(),
                  ($.ignorePermissions = !1),
                  G(z),
                  e(o),
                  o.onRuntimeInitialized && o.onRuntimeInitialized(),
                  (function () {
                    if (o.postRun) {
                      for (
                        "function" == typeof o.postRun &&
                        (o.postRun = [o.postRun]);
                        o.postRun.length;

                      ) {
                        (r = o.postRun.shift()), B.unshift(r);
                      }
                    }
                    var r;
                    G(B);
                  })()));
            }
            j > 0 ||
              ((function () {
                if (o.preRun) {
                  for (
                    "function" == typeof o.preRun && (o.preRun = [o.preRun]);
                    o.preRun.length;

                  ) {
                    (r = o.preRun.shift()), C.unshift(r);
                  }
                }
                var r;
                G(C);
              })(),
              j > 0 ||
                (o.setStatus
                  ? (o.setStatus("Running..."),
                    setTimeout(function () {
                      setTimeout(function () {
                        o.setStatus("");
                      }, 1),
                        t();
                    }, 1))
                  : t()));
          }
          if (
            ((o._malloc = function () {
              return (o._malloc = o.asm.H).apply(null, arguments);
            }),
            (T = function r() {
              ir || Sr(), ir || (T = r);
            }),
            (o.run = Sr),
            o.preInit)
          ) {
            for (
              "function" == typeof o.preInit && (o.preInit = [o.preInit]);
              o.preInit.length > 0;

            ) {
              o.preInit.pop()();
            }
          }
          function Pr() {}
          function Ar(r) {
            return (r || Pr).__cache__;
          }
          function Fr(r, e) {
            var t = Ar(e),
              n = t[r];
            return (
              n ||
              (((n = Object.create((e || Pr).prototype)).ptr = r), (t[r] = n))
            );
          }
          Sr(),
            (Pr.prototype = Object.create(Pr.prototype)),
            (Pr.prototype.constructor = Pr),
            (Pr.prototype.__class__ = Pr),
            (Pr.__cache__ = {}),
            (o.WrapperObject = Pr),
            (o.getCache = Ar),
            (o.wrapPointer = Fr),
            (o.castObject = function (r, e) {
              return Fr(r.ptr, e);
            }),
            (o.NULL = Fr(0)),
            (o.destroy = function (r) {
              if (!r.__destroy__) {
                throw "Error: Cannot destroy object. (Did you create it yourself?)";
              }
              r.__destroy__(), delete Ar(r.__class__)[r.ptr];
            }),
            (o.compare = function (r, e) {
              return r.ptr === e.ptr;
            }),
            (o.getPointer = function (r) {
              return r.ptr;
            }),
            (o.getClass = function (r) {
              return r.__class__;
            });
          var xr = {
            buffer: 0,
            size: 0,
            pos: 0,
            temps: [],
            needed: 0,
            prepare: function () {
              if (xr.needed) {
                for (var r = 0; r < xr.temps.length; r++) o._free(xr.temps[r]);
                (xr.temps.length = 0),
                  o._free(xr.buffer),
                  (xr.buffer = 0),
                  (xr.size += xr.needed),
                  (xr.needed = 0);
              }
              xr.buffer ||
                ((xr.size += 128),
                (xr.buffer = o._malloc(xr.size)),
                h(xr.buffer)),
                (xr.pos = 0);
            },
            alloc: function (r, e) {
              h(xr.buffer);
              var t,
                n = e.BYTES_PER_ELEMENT,
                a = r.length * n;
              return (
                (a = (a + 7) & -8),
                xr.pos + a >= xr.size
                  ? (h(a > 0),
                    (xr.needed += a),
                    (t = o._malloc(a)),
                    xr.temps.push(t))
                  : ((t = xr.buffer + xr.pos), (xr.pos += a)),
                t
              );
            },
            copy: function (r, e, t) {
              switch (((t >>>= 0), e.BYTES_PER_ELEMENT)) {
                case 2:
                  t >>>= 1;
                  break;
                case 4:
                  t >>>= 2;
                  break;
                case 8:
                  t >>>= 3;
              }
              for (var n = 0; n < r.length; n++) e[t + n] = r[n];
            },
          };
          function Mr() {
            (this.ptr = sr()), (Ar(Mr)[this.ptr] = this);
          }
          function Rr() {
            throw "cannot construct a VoidPtr, no constructor in IDL";
          }
          function Cr() {
            (this.ptr = Er()), (Ar(Cr)[this.ptr] = this);
          }
          return (
            (Mr.prototype = Object.create(Pr.prototype)),
            (Mr.prototype.constructor = Mr),
            (Mr.prototype.__class__ = Mr),
            (Mr.__cache__ = {}),
            (o.CExpat = Mr),
            (Mr.prototype.version = Mr.prototype.version =
              function () {
                var r = this.ptr;
                return D(ur(r));
              }),
            (Mr.prototype.create = Mr.prototype.create =
              function () {
                var r = this.ptr;
                return !!cr(r);
              }),
            (Mr.prototype.destroy = Mr.prototype.destroy =
              function () {
                var r = this.ptr;
                lr(r);
              }),
            (Mr.prototype.parse = Mr.prototype.parse =
              function (r) {
                var e = this.ptr;
                return (
                  xr.prepare(),
                  (r =
                    r && "object" == typeof r
                      ? r.ptr
                      : (function (r) {
                          if ("string" == typeof r) {
                            var e = or(r),
                              t = xr.alloc(e, w);
                            return xr.copy(e, w, t), t;
                          }
                          return r;
                        })(r)),
                  !!dr(e, r)
                );
              }),
            (Mr.prototype.tag = Mr.prototype.tag =
              function () {
                var r = this.ptr;
                return D(fr(r));
              }),
            (Mr.prototype.attrs = Mr.prototype.attrs =
              function () {
                var r = this.ptr;
                return D(pr(r));
              }),
            (Mr.prototype.content = Mr.prototype.content =
              function () {
                var r = this.ptr;
                return D(mr(r));
              }),
            (Mr.prototype.startElement = Mr.prototype.startElement =
              function () {
                var r = this.ptr;
                hr(r);
              }),
            (Mr.prototype.endElement = Mr.prototype.endElement =
              function () {
                var r = this.ptr;
                vr(r);
              }),
            (Mr.prototype.characterData = Mr.prototype.characterData =
              function () {
                var r = this.ptr;
                wr(r);
              }),
            (Mr.prototype.__destroy__ = Mr.prototype.__destroy__ =
              function () {
                var r = this.ptr;
                _r(r);
              }),
            (Rr.prototype = Object.create(Pr.prototype)),
            (Rr.prototype.constructor = Rr),
            (Rr.prototype.__class__ = Rr),
            (Rr.__cache__ = {}),
            (o.VoidPtr = Rr),
            (Rr.prototype.__destroy__ = Rr.prototype.__destroy__ =
              function () {
                var r = this.ptr;
                yr(r);
              }),
            (Cr.prototype = Object.create(Mr.prototype)),
            (Cr.prototype.constructor = Cr),
            (Cr.prototype.__class__ = Cr),
            (Cr.__cache__ = {}),
            (o.CExpatJS = Cr),
            (Cr.prototype.startElement = Cr.prototype.startElement =
              function () {
                var r = this.ptr;
                gr(r);
              }),
            (Cr.prototype.endElement = Cr.prototype.endElement =
              function () {
                var r = this.ptr;
                br(r);
              }),
            (Cr.prototype.characterData = Cr.prototype.characterData =
              function () {
                var r = this.ptr;
                kr(r);
              }),
            (Cr.prototype.__destroy__ = Cr.prototype.__destroy__ =
              function () {
                var r = this.ptr;
                Dr(r);
              }),
            r.ready
          );
        });
    r.exports = n;
  })(t);
  var n = e({ __proto__: null, default: t.exports }, [t.exports]);
  let o =
    (function () {
      if ("undefined" != typeof self) return self;
      if ("undefined" != typeof window) return window;
      if ("undefined" != typeof global) return global;
      throw new Error("unable to locate global object");
    })().__hpcc_wasmFolder || void 0;
  function a(r) {
    if (!arguments.length) return o;
    const e = o;
    return (o = r), e;
  }
  function i(r, e, t) {
    const n = r.default || r;
    return (
      n.__hpcc_promise ||
        (n.__hpcc_promise = n({
          wasmBinary: t,
          locateFile: (r, t) =>
            `${(function (r, e) {
              for (; r.charAt(r.length - 1) === e; ) {
                r = r.substring(0, r.length - 1);
              }
              return r;
            })(e || a() || t || ".", "/")}/${(function (r, e) {
              for (; r.charAt(0) === e; ) r = r.substring(1);
              return r;
            })(r, "/")}`,
        })),
      n.__hpcc_promise
    );
  }
  class s {
    constructor(r, e) {
      (this.tag = r), (this.attrs = e), (this._content = "");
    }
    get content() {
      return this._content;
    }
    appendContent(r) {
      this._content += r;
    }
  }
  function u(r, e, t, o) {
    return i(n, t, o).then((t) => {
      const n = new t.CExpatJS();
      (n.startElement = function () {
        e.startElement(
          this.tag(),
          (function (r) {
            const e = {},
              t = r,
              n = `${String.fromCharCode(1)}`,
              o = `${n}${n}`;
            return (
              t
                .split(o)
                .filter((r) => !!r)
                .forEach((r) => {
                  const t = r.split(n);
                  e[t[0]] = t[1];
                }),
              e
            );
          })(this.attrs())
        );
      }),
        (n.endElement = function () {
          e.endElement(this.tag());
        }),
        (n.characterData = function () {
          e.characterData(this.content());
        }),
        n.create();
      const o = n.parse(r);
      return n.destroy(), t.destroy(n), o;
    });
  }
  var c = { exports: {} };
  !(function (r, e) {
    var t,
      n =
        ((t =
          "undefined" != typeof document && document.currentScript
            ? document.currentScript.src
            : void 0),
        function (r) {
          var e,
            n,
            o = void 0 !== (r = r || {}) ? r : {};
          o.ready = new Promise(function (r, t) {
            (e = r), (n = t);
          });
          var a,
            i,
            s = Object.assign({}, o),
            u = "./this.program",
            c = (r, e) => {
              throw e;
            },
            l = "";
          "undefined" != typeof document &&
            document.currentScript &&
            (l = document.currentScript.src),
            t && (l = t),
            (l =
              0 !== l.indexOf("blob:")
                ? l.substr(0, l.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                : ""),
            (a = (r) => {
              var e = new XMLHttpRequest();
              return e.open("GET", r, !1), e.send(null), e.responseText;
            }),
            (i = (r, e, t) => {
              var n = new XMLHttpRequest();
              n.open("GET", r, !0),
                (n.responseType = "arraybuffer"),
                (n.onload = () => {
                  200 == n.status || (0 == n.status && n.response)
                    ? e(n.response)
                    : t();
                }),
                (n.onerror = t),
                n.send(null);
            });
          var d = o.print || console.log.bind(console),
            f = o.printErr || console.warn.bind(console);
          Object.assign(o, s),
            (s = null),
            o.arguments,
            o.thisProgram && (u = o.thisProgram),
            o.quit && (c = o.quit);
          var p,
            m = 0;
          o.wasmBinary && (p = o.wasmBinary);
          var h,
            v = o.noExitRuntime || !0;
          "object" != typeof WebAssembly &&
            G("no native wasm support detected");
          var w = !1;
          function _(r, e) {
            r || G(e);
          }
          var y,
            E,
            g,
            b,
            k,
            D,
            S,
            P =
              "undefined" != typeof TextDecoder
                ? new TextDecoder("utf8")
                : void 0;
          function A(r, e, t) {
            for (var n = e + t, o = e; r[o] && !(o >= n); ) ++o;
            if (o - e > 16 && r.subarray && P) {
              return P.decode(r.subarray(e, o));
            }
            for (var a = ""; e < o; ) {
              var i = r[e++];
              if (128 & i) {
                var s = 63 & r[e++];
                if (192 != (224 & i)) {
                  var u = 63 & r[e++];
                  if (
                    (i =
                      224 == (240 & i)
                        ? ((15 & i) << 12) | (s << 6) | u
                        : ((7 & i) << 18) |
                          (s << 12) |
                          (u << 6) |
                          (63 & r[e++])) < 65536
                  ) {
                    a += String.fromCharCode(i);
                  } else {
                    var c = i - 65536;
                    a += String.fromCharCode(
                      55296 | (c >> 10),
                      56320 | (1023 & c)
                    );
                  }
                } else {
                  a += String.fromCharCode(((31 & i) << 6) | s);
                }
              } else {
                a += String.fromCharCode(i);
              }
            }
            return a;
          }
          function F(r, e) {
            return r ? A(g, r, e) : "";
          }
          function x(r, e, t, n) {
            if (!(n > 0)) return 0;
            for (var o = t, a = t + n - 1, i = 0; i < r.length; ++i) {
              var s = r.charCodeAt(i);
              if (
                (s >= 55296 &&
                  s <= 57343 &&
                  (s =
                    (65536 + ((1023 & s) << 10)) | (1023 & r.charCodeAt(++i))),
                s <= 127)
              ) {
                if (t >= a) break;
                e[t++] = s;
              } else if (s <= 2047) {
                if (t + 1 >= a) {
                  break;
                }
                (e[t++] = 192 | (s >> 6)), (e[t++] = 128 | (63 & s));
              } else if (s <= 65535) {
                if (t + 2 >= a) break;
                (e[t++] = 224 | (s >> 12)),
                  (e[t++] = 128 | ((s >> 6) & 63)),
                  (e[t++] = 128 | (63 & s));
              } else {
                if (t + 3 >= a) break;
                (e[t++] = 240 | (s >> 18)),
                  (e[t++] = 128 | ((s >> 12) & 63)),
                  (e[t++] = 128 | ((s >> 6) & 63)),
                  (e[t++] = 128 | (63 & s));
              }
            }
            return (e[t] = 0), t - o;
          }
          function M(r) {
            for (var e = 0, t = 0; t < r.length; ++t) {
              var n = r.charCodeAt(t);
              n >= 55296 &&
                n <= 57343 &&
                (n = (65536 + ((1023 & n) << 10)) | (1023 & r.charCodeAt(++t))),
                n <= 127 ? ++e : (e += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
            }
            return e;
          }
          function R(r) {
            (y = r),
              (o.HEAP8 = E = new Int8Array(r)),
              (o.HEAP16 = b = new Int16Array(r)),
              (o.HEAP32 = k = new Int32Array(r)),
              (o.HEAPU8 = g = new Uint8Array(r)),
              (o.HEAPU16 = new Uint16Array(r)),
              (o.HEAPU32 = new Uint32Array(r)),
              (o.HEAPF32 = new Float32Array(r)),
              (o.HEAPF64 = D = new Float64Array(r));
          }
          o.INITIAL_MEMORY;
          var C,
            z,
            B,
            j,
            T = [],
            N = [],
            O = [],
            L = 0,
            I = null;
          function H(r) {
            L++, o.monitorRunDependencies && o.monitorRunDependencies(L);
          }
          function U(r) {
            if (
              (L--,
              o.monitorRunDependencies && o.monitorRunDependencies(L),
              0 == L && I)
            ) {
              var e = I;
              (I = null), e();
            }
          }
          function G(r) {
            o.onAbort && o.onAbort(r),
              f((r = "Aborted(" + r + ")")),
              (w = !0),
              (r += ". Build with -s ASSERTIONS=1 for more info.");
            var e = new WebAssembly.RuntimeError(r);
            throw (n(e), e);
          }
          function q(r) {
            return r.startsWith("data:application/octet-stream;base64,");
          }
          function W(r) {
            try {
              if (r == C && p) return new Uint8Array(p);
              throw "both async and sync fetching of the wasm failed";
            } catch (r) {
              G(r);
            }
          }
          // C = graphvizWasm();
          (o.preloadedImages = {}), (o.preloadedAudios = {}); // ,
          // q(C) || ((z = C), (C = o.locateFile ? o.locateFile(z, l) : l + z));
          var J,
            V = {
              161520: function (r, e) {
                var t = F(r),
                  n = F(e);
                tr.createPath("/", Y.dirname(t)),
                  tr.writeFile(Y.join("/", t), n);
              },
            };
          function X(r) {
            for (; r.length > 0; ) {
              var e = r.shift();
              if ("function" != typeof e) {
                var t = e.func;
                "number" == typeof t
                  ? void 0 === e.arg
                    ? $(t)()
                    : $(t)(e.arg)
                  : t(void 0 === e.arg ? null : e.arg);
              } else e(o);
            }
          }
          function $(r) {
            return S.get(r);
          }
          function K(r) {
            return (k[gr() >> 2] = r), r;
          }
          J = () => performance.now();
          var Y = {
              splitPath: function (r) {
                return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                  .exec(r)
                  .slice(1);
              },
              normalizeArray: function (r, e) {
                for (var t = 0, n = r.length - 1; n >= 0; n--) {
                  var o = r[n];
                  "." === o
                    ? r.splice(n, 1)
                    : ".." === o
                    ? (r.splice(n, 1), t++)
                    : t && (r.splice(n, 1), t--);
                }
                if (e) for (; t; t--) r.unshift("..");
                return r;
              },
              normalize: function (r) {
                var e = "/" === r.charAt(0),
                  t = "/" === r.substr(-1);
                return (
                  (r = Y.normalizeArray(
                    r.split("/").filter(function (r) {
                      return !!r;
                    }),
                    !e
                  ).join("/")) ||
                    e ||
                    (r = "."),
                  r && t && (r += "/"),
                  (e ? "/" : "") + r
                );
              },
              dirname: function (r) {
                var e = Y.splitPath(r),
                  t = e[0],
                  n = e[1];
                return t || n
                  ? (n && (n = n.substr(0, n.length - 1)), t + n)
                  : ".";
              },
              basename: function (r) {
                if ("/" === r) return "/";
                var e = (r = (r = Y.normalize(r)).replace(
                  /\/$/,
                  ""
                )).lastIndexOf("/");
                return -1 === e ? r : r.substr(e + 1);
              },
              extname: function (r) {
                return Y.splitPath(r)[3];
              },
              join: function () {
                var r = Array.prototype.slice.call(arguments, 0);
                return Y.normalize(r.join("/"));
              },
              join2: function (r, e) {
                return Y.normalize(r + "/" + e);
              },
            },
            Q = {
              resolve: function () {
                for (
                  var r = "", e = !1, t = arguments.length - 1;
                  t >= -1 && !e;
                  t--
                ) {
                  var n = t >= 0 ? arguments[t] : tr.cwd();
                  if ("string" != typeof n) {
                    throw new TypeError(
                      "Arguments to path.resolve must be strings"
                    );
                  }
                  if (!n) return "";
                  (r = n + "/" + r), (e = "/" === n.charAt(0));
                }
                return (
                  (e ? "/" : "") +
                    (r = Y.normalizeArray(
                      r.split("/").filter(function (r) {
                        return !!r;
                      }),
                      !e
                    ).join("/")) || "."
                );
              },
              relative: function (r, e) {
                function t(r) {
                  for (var e = 0; e < r.length && "" === r[e]; e++);
                  for (var t = r.length - 1; t >= 0 && "" === r[t]; t--);
                  return e > t ? [] : r.slice(e, t - e + 1);
                }
                (r = Q.resolve(r).substr(1)), (e = Q.resolve(e).substr(1));
                for (
                  var n = t(r.split("/")),
                    o = t(e.split("/")),
                    a = Math.min(n.length, o.length),
                    i = a,
                    s = 0;
                  s < a;
                  s++
                ) {
                  if (n[s] !== o[s]) {
                    i = s;
                    break;
                  }
                }
                var u = [];
                for (s = i; s < n.length; s++) {
                  u.push("..");
                }
                return (u = u.concat(o.slice(i))).join("/");
              },
            },
            Z = {
              ttys: [],
              init: function () {},
              shutdown: function () {},
              register: function (r, e) {
                (Z.ttys[r] = { input: [], output: [], ops: e }),
                  tr.registerDevice(r, Z.stream_ops);
              },
              stream_ops: {
                open: function (r) {
                  var e = Z.ttys[r.node.rdev];
                  if (!e) throw new tr.ErrnoError(43);
                  (r.tty = e), (r.seekable = !1);
                },
                close: function (r) {
                  r.tty.ops.flush(r.tty);
                },
                flush: function (r) {
                  r.tty.ops.flush(r.tty);
                },
                read: function (r, e, t, n, o) {
                  if (!r.tty || !r.tty.ops.get_char) {
                    throw new tr.ErrnoError(60);
                  }
                  for (var a = 0, i = 0; i < n; i++) {
                    var s;
                    try {
                      s = r.tty.ops.get_char(r.tty);
                    } catch (r) {
                      throw new tr.ErrnoError(29);
                    }
                    if (void 0 === s && 0 === a) throw new tr.ErrnoError(6);
                    if (null == s) break;
                    a++, (e[t + i] = s);
                  }
                  return a && (r.node.timestamp = Date.now()), a;
                },
                write: function (r, e, t, n, o) {
                  if (!r.tty || !r.tty.ops.put_char) {
                    throw new tr.ErrnoError(60);
                  }
                  try {
                    for (var a = 0; a < n; a++) {
                      r.tty.ops.put_char(r.tty, e[t + a]);
                    }
                  } catch (r) {
                    throw new tr.ErrnoError(29);
                  }
                  return n && (r.node.timestamp = Date.now()), a;
                },
              },
              default_tty_ops: {
                get_char: function (r) {
                  if (!r.input.length) {
                    var e = null;
                    if (
                      ("undefined" != typeof window &&
                      "function" == typeof window.prompt
                        ? null !== (e = window.prompt("Input: ")) && (e += "\n")
                        : "function" == typeof readline &&
                          null !== (e = readline()) &&
                          (e += "\n"),
                      !e)
                    ) {
                      return null;
                    }
                    r.input = dr(e, !0);
                  }
                  return r.input.shift();
                },
                put_char: function (r, e) {
                  null === e || 10 === e
                    ? (d(A(r.output, 0)), (r.output = []))
                    : 0 != e && r.output.push(e);
                },
                flush: function (r) {
                  r.output &&
                    r.output.length > 0 &&
                    (d(A(r.output, 0)), (r.output = []));
                },
              },
              default_tty1_ops: {
                put_char: function (r, e) {
                  null === e || 10 === e
                    ? (f(A(r.output, 0)), (r.output = []))
                    : 0 != e && r.output.push(e);
                },
                flush: function (r) {
                  r.output &&
                    r.output.length > 0 &&
                    (f(A(r.output, 0)), (r.output = []));
                },
              },
            };
          function rr(r) {
            r = (function (r, e) {
              return Math.ceil(r / e) * e;
            })(r, 65536);
            var e = br(65536, r);
            return e
              ? ((function (r, e) {
                  g.fill(0, r, r + e);
                })(e, r),
                e)
              : 0;
          }
          var er = {
              ops_table: null,
              mount: function (r) {
                return er.createNode(null, "/", 16895, 0);
              },
              createNode: function (r, e, t, n) {
                if (tr.isBlkdev(t) || tr.isFIFO(t)) throw new tr.ErrnoError(63);
                er.ops_table ||
                  (er.ops_table = {
                    dir: {
                      node: {
                        getattr: er.node_ops.getattr,
                        setattr: er.node_ops.setattr,
                        lookup: er.node_ops.lookup,
                        mknod: er.node_ops.mknod,
                        rename: er.node_ops.rename,
                        unlink: er.node_ops.unlink,
                        rmdir: er.node_ops.rmdir,
                        readdir: er.node_ops.readdir,
                        symlink: er.node_ops.symlink,
                      },
                      stream: { llseek: er.stream_ops.llseek },
                    },
                    file: {
                      node: {
                        getattr: er.node_ops.getattr,
                        setattr: er.node_ops.setattr,
                      },
                      stream: {
                        llseek: er.stream_ops.llseek,
                        read: er.stream_ops.read,
                        write: er.stream_ops.write,
                        allocate: er.stream_ops.allocate,
                        mmap: er.stream_ops.mmap,
                        msync: er.stream_ops.msync,
                      },
                    },
                    link: {
                      node: {
                        getattr: er.node_ops.getattr,
                        setattr: er.node_ops.setattr,
                        readlink: er.node_ops.readlink,
                      },
                      stream: {},
                    },
                    chrdev: {
                      node: {
                        getattr: er.node_ops.getattr,
                        setattr: er.node_ops.setattr,
                      },
                      stream: tr.chrdev_stream_ops,
                    },
                  });
                var o = tr.createNode(r, e, t, n);
                return (
                  tr.isDir(o.mode)
                    ? ((o.node_ops = er.ops_table.dir.node),
                      (o.stream_ops = er.ops_table.dir.stream),
                      (o.contents = {}))
                    : tr.isFile(o.mode)
                    ? ((o.node_ops = er.ops_table.file.node),
                      (o.stream_ops = er.ops_table.file.stream),
                      (o.usedBytes = 0),
                      (o.contents = null))
                    : tr.isLink(o.mode)
                    ? ((o.node_ops = er.ops_table.link.node),
                      (o.stream_ops = er.ops_table.link.stream))
                    : tr.isChrdev(o.mode) &&
                      ((o.node_ops = er.ops_table.chrdev.node),
                      (o.stream_ops = er.ops_table.chrdev.stream)),
                  (o.timestamp = Date.now()),
                  r && ((r.contents[e] = o), (r.timestamp = o.timestamp)),
                  o
                );
              },
              getFileDataAsTypedArray: function (r) {
                return r.contents
                  ? r.contents.subarray
                    ? r.contents.subarray(0, r.usedBytes)
                    : new Uint8Array(r.contents)
                  : new Uint8Array(0);
              },
              expandFileStorage: function (r, e) {
                var t = r.contents ? r.contents.length : 0;
                if (!(t >= e)) {
                  (e = Math.max(e, (t * (t < 1048576 ? 2 : 1.125)) >>> 0)),
                    0 != t && (e = Math.max(e, 256));
                  var n = r.contents;
                  (r.contents = new Uint8Array(e)),
                    r.usedBytes > 0 &&
                      r.contents.set(n.subarray(0, r.usedBytes), 0);
                }
              },
              resizeFileStorage: function (r, e) {
                if (r.usedBytes != e) {
                  if (0 == e) (r.contents = null), (r.usedBytes = 0);
                  else {
                    var t = r.contents;
                    (r.contents = new Uint8Array(e)),
                      t &&
                        r.contents.set(t.subarray(0, Math.min(e, r.usedBytes))),
                      (r.usedBytes = e);
                  }
                }
              },
              node_ops: {
                getattr: function (r) {
                  var e = {};
                  return (
                    (e.dev = tr.isChrdev(r.mode) ? r.id : 1),
                    (e.ino = r.id),
                    (e.mode = r.mode),
                    (e.nlink = 1),
                    (e.uid = 0),
                    (e.gid = 0),
                    (e.rdev = r.rdev),
                    tr.isDir(r.mode)
                      ? (e.size = 4096)
                      : tr.isFile(r.mode)
                      ? (e.size = r.usedBytes)
                      : tr.isLink(r.mode)
                      ? (e.size = r.link.length)
                      : (e.size = 0),
                    (e.atime = new Date(r.timestamp)),
                    (e.mtime = new Date(r.timestamp)),
                    (e.ctime = new Date(r.timestamp)),
                    (e.blksize = 4096),
                    (e.blocks = Math.ceil(e.size / e.blksize)),
                    e
                  );
                },
                setattr: function (r, e) {
                  void 0 !== e.mode && (r.mode = e.mode),
                    void 0 !== e.timestamp && (r.timestamp = e.timestamp),
                    void 0 !== e.size && er.resizeFileStorage(r, e.size);
                },
                lookup: function (r, e) {
                  throw tr.genericErrors[44];
                },
                mknod: function (r, e, t, n) {
                  return er.createNode(r, e, t, n);
                },
                rename: function (r, e, t) {
                  if (tr.isDir(r.mode)) {
                    var n;
                    try {
                      n = tr.lookupNode(e, t);
                    } catch (r) {}
                    if (n) {
                      for (var o in n.contents) throw new tr.ErrnoError(55);
                    }
                  }
                  delete r.parent.contents[r.name],
                    (r.parent.timestamp = Date.now()),
                    (r.name = t),
                    (e.contents[t] = r),
                    (e.timestamp = r.parent.timestamp),
                    (r.parent = e);
                },
                unlink: function (r, e) {
                  delete r.contents[e], (r.timestamp = Date.now());
                },
                rmdir: function (r, e) {
                  var t = tr.lookupNode(r, e);
                  for (var n in t.contents) throw new tr.ErrnoError(55);
                  delete r.contents[e], (r.timestamp = Date.now());
                },
                readdir: function (r) {
                  var e = [".", ".."];
                  for (var t in r.contents) {
                    r.contents.hasOwnProperty(t) && e.push(t);
                  }
                  return e;
                },
                symlink: function (r, e, t) {
                  var n = er.createNode(r, e, 41471, 0);
                  return (n.link = t), n;
                },
                readlink: function (r) {
                  if (!tr.isLink(r.mode)) throw new tr.ErrnoError(28);
                  return r.link;
                },
              },
              stream_ops: {
                read: function (r, e, t, n, o) {
                  var a = r.node.contents;
                  if (o >= r.node.usedBytes) return 0;
                  var i = Math.min(r.node.usedBytes - o, n);
                  if (i > 8 && a.subarray) e.set(a.subarray(o, o + i), t);
                  else for (var s = 0; s < i; s++) e[t + s] = a[o + s];
                  return i;
                },
                write: function (r, e, t, n, o, a) {
                  if ((e.buffer === E.buffer && (a = !1), !n)) return 0;
                  var i = r.node;
                  if (
                    ((i.timestamp = Date.now()),
                    e.subarray && (!i.contents || i.contents.subarray))
                  ) {
                    if (a) {
                      return (
                        (i.contents = e.subarray(t, t + n)),
                        (i.usedBytes = n),
                        n
                      );
                    }
                    if (0 === i.usedBytes && 0 === o) {
                      return (
                        (i.contents = e.slice(t, t + n)), (i.usedBytes = n), n
                      );
                    }
                    if (o + n <= i.usedBytes) {
                      return i.contents.set(e.subarray(t, t + n), o), n;
                    }
                  }
                  if (
                    (er.expandFileStorage(i, o + n),
                    i.contents.subarray && e.subarray)
                  ) {
                    i.contents.set(e.subarray(t, t + n), o);
                  } else {
                    for (var s = 0; s < n; s++) i.contents[o + s] = e[t + s];
                  }
                  return (i.usedBytes = Math.max(i.usedBytes, o + n)), n;
                },
                llseek: function (r, e, t) {
                  var n = e;
                  if (
                    (1 === t
                      ? (n += r.position)
                      : 2 === t &&
                        tr.isFile(r.node.mode) &&
                        (n += r.node.usedBytes),
                    n < 0)
                  ) {
                    throw new tr.ErrnoError(28);
                  }
                  return n;
                },
                allocate: function (r, e, t) {
                  er.expandFileStorage(r.node, e + t),
                    (r.node.usedBytes = Math.max(r.node.usedBytes, e + t));
                },
                mmap: function (r, e, t, n, o, a) {
                  if (0 !== e) throw new tr.ErrnoError(28);
                  if (!tr.isFile(r.node.mode)) throw new tr.ErrnoError(43);
                  var i,
                    s,
                    u = r.node.contents;
                  if (2 & a || u.buffer !== y) {
                    if (
                      ((n > 0 || n + t < u.length) &&
                        (u = u.subarray
                          ? u.subarray(n, n + t)
                          : Array.prototype.slice.call(u, n, n + t)),
                      (s = !0),
                      !(i = rr(t)))
                    ) {
                      throw new tr.ErrnoError(48);
                    }
                    E.set(u, i);
                  } else (s = !1), (i = u.byteOffset);
                  return { ptr: i, allocated: s };
                },
                msync: function (r, e, t, n, o) {
                  if (!tr.isFile(r.node.mode)) throw new tr.ErrnoError(43);
                  return 2 & o || er.stream_ops.write(r, e, 0, n, t, !1), 0;
                },
              },
            },
            tr = {
              root: null,
              mounts: [],
              devices: {},
              streams: [],
              nextInode: 1,
              nameTable: null,
              currentPath: "/",
              initialized: !1,
              ignorePermissions: !0,
              ErrnoError: null,
              genericErrors: {},
              filesystems: null,
              syncFSRequests: 0,
              lookupPath: (r, e = {}) => {
                if (!(r = Q.resolve(tr.cwd(), r))) {
                  return { path: "", node: null };
                }
                var t = { follow_mount: !0, recurse_count: 0 };
                for (var n in t) void 0 === e[n] && (e[n] = t[n]);
                if (e.recurse_count > 8) throw new tr.ErrnoError(32);
                for (
                  var o = Y.normalizeArray(
                      r.split("/").filter((r) => !!r),
                      !1
                    ),
                    a = tr.root,
                    i = "/",
                    s = 0;
                  s < o.length;
                  s++
                ) {
                  var u = s === o.length - 1;
                  if (u && e.parent) break;
                  if (
                    ((a = tr.lookupNode(a, o[s])),
                    (i = Y.join2(i, o[s])),
                    tr.isMountpoint(a) &&
                      (!u || (u && e.follow_mount)) &&
                      (a = a.mounted.root),
                    !u || e.follow)
                  ) {
                    for (var c = 0; tr.isLink(a.mode); ) {
                      var l = tr.readlink(i);
                      if (
                        ((i = Q.resolve(Y.dirname(i), l)),
                        (a = tr.lookupPath(i, {
                          recurse_count: e.recurse_count,
                        }).node),
                        c++ > 40)
                      ) {
                        throw new tr.ErrnoError(32);
                      }
                    }
                  }
                }
                return { path: i, node: a };
              },
              getPath: (r) => {
                for (var e; ; ) {
                  if (tr.isRoot(r)) {
                    var t = r.mount.mountpoint;
                    return e
                      ? "/" !== t[t.length - 1]
                        ? t + "/" + e
                        : t + e
                      : t;
                  }
                  (e = e ? r.name + "/" + e : r.name), (r = r.parent);
                }
              },
              hashName: (r, e) => {
                for (var t = 0, n = 0; n < e.length; n++) {
                  t = ((t << 5) - t + e.charCodeAt(n)) | 0;
                }
                return ((r + t) >>> 0) % tr.nameTable.length;
              },
              hashAddNode: (r) => {
                var e = tr.hashName(r.parent.id, r.name);
                (r.name_next = tr.nameTable[e]), (tr.nameTable[e] = r);
              },
              hashRemoveNode: (r) => {
                var e = tr.hashName(r.parent.id, r.name);
                if (tr.nameTable[e] === r) tr.nameTable[e] = r.name_next;
                else {
                  for (var t = tr.nameTable[e]; t; ) {
                    if (t.name_next === r) {
                      t.name_next = r.name_next;
                      break;
                    }
                    t = t.name_next;
                  }
                }
              },
              lookupNode: (r, e) => {
                var t = tr.mayLookup(r);
                if (t) throw new tr.ErrnoError(t, r);
                for (
                  var n = tr.hashName(r.id, e), o = tr.nameTable[n];
                  o;
                  o = o.name_next
                ) {
                  var a = o.name;
                  if (o.parent.id === r.id && a === e) return o;
                }
                return tr.lookup(r, e);
              },
              createNode: (r, e, t, n) => {
                var o = new tr.FSNode(r, e, t, n);
                return tr.hashAddNode(o), o;
              },
              destroyNode: (r) => {
                tr.hashRemoveNode(r);
              },
              isRoot: (r) => r === r.parent,
              isMountpoint: (r) => !!r.mounted,
              isFile: (r) => 32768 == (61440 & r),
              isDir: (r) => 16384 == (61440 & r),
              isLink: (r) => 40960 == (61440 & r),
              isChrdev: (r) => 8192 == (61440 & r),
              isBlkdev: (r) => 24576 == (61440 & r),
              isFIFO: (r) => 4096 == (61440 & r),
              isSocket: (r) => 49152 == (49152 & r),
              flagModes: {
                r: 0,
                "r+": 2,
                w: 577,
                "w+": 578,
                a: 1089,
                "a+": 1090,
              },
              modeStringToFlags: (r) => {
                var e = tr.flagModes[r];
                if (void 0 === e) {
                  throw new Error("Unknown file open mode: " + r);
                }
                return e;
              },
              flagsToPermissionString: (r) => {
                var e = ["r", "w", "rw"][3 & r];
                return 512 & r && (e += "w"), e;
              },
              nodePermissions: (r, e) =>
                tr.ignorePermissions ||
                ((!e.includes("r") || 292 & r.mode) &&
                  (!e.includes("w") || 146 & r.mode) &&
                  (!e.includes("x") || 73 & r.mode))
                  ? 0
                  : 2,
              mayLookup: (r) => {
                var e = tr.nodePermissions(r, "x");
                return e || (r.node_ops.lookup ? 0 : 2);
              },
              mayCreate: (r, e) => {
                try {
                  return tr.lookupNode(r, e), 20;
                } catch (r) {}
                return tr.nodePermissions(r, "wx");
              },
              mayDelete: (r, e, t) => {
                var n;
                try {
                  n = tr.lookupNode(r, e);
                } catch (r) {
                  return r.errno;
                }
                var o = tr.nodePermissions(r, "wx");
                if (o) return o;
                if (t) {
                  if (!tr.isDir(n.mode)) return 54;
                  if (tr.isRoot(n) || tr.getPath(n) === tr.cwd()) return 10;
                } else if (tr.isDir(n.mode)) return 31;
                return 0;
              },
              mayOpen: (r, e) =>
                r
                  ? tr.isLink(r.mode)
                    ? 32
                    : tr.isDir(r.mode) &&
                      ("r" !== tr.flagsToPermissionString(e) || 512 & e)
                    ? 31
                    : tr.nodePermissions(r, tr.flagsToPermissionString(e))
                  : 44,
              MAX_OPEN_FDS: 4096,
              nextfd: (r = 0, e = tr.MAX_OPEN_FDS) => {
                for (var t = r; t <= e; t++) {
                  if (!tr.streams[t]) return t;
                }
                throw new tr.ErrnoError(33);
              },
              getStream: (r) => tr.streams[r],
              createStream: (r, e, t) => {
                tr.FSStream ||
                  ((tr.FSStream = function () {}),
                  (tr.FSStream.prototype = {
                    object: {
                      get: function () {
                        return this.node;
                      },
                      set: function (r) {
                        this.node = r;
                      },
                    },
                    isRead: {
                      get: function () {
                        return 1 != (2097155 & this.flags);
                      },
                    },
                    isWrite: {
                      get: function () {
                        return 0 != (2097155 & this.flags);
                      },
                    },
                    isAppend: {
                      get: function () {
                        return 1024 & this.flags;
                      },
                    },
                  })),
                  (r = Object.assign(new tr.FSStream(), r));
                var n = tr.nextfd(e, t);
                return (r.fd = n), (tr.streams[n] = r), r;
              },
              closeStream: (r) => {
                tr.streams[r] = null;
              },
              chrdev_stream_ops: {
                open: (r) => {
                  var e = tr.getDevice(r.node.rdev);
                  (r.stream_ops = e.stream_ops),
                    r.stream_ops.open && r.stream_ops.open(r);
                },
                llseek: () => {
                  throw new tr.ErrnoError(70);
                },
              },
              major: (r) => r >> 8,
              minor: (r) => 255 & r,
              makedev: (r, e) => (r << 8) | e,
              registerDevice: (r, e) => {
                tr.devices[r] = { stream_ops: e };
              },
              getDevice: (r) => tr.devices[r],
              getMounts: (r) => {
                for (var e = [], t = [r]; t.length; ) {
                  var n = t.pop();
                  e.push(n), t.push.apply(t, n.mounts);
                }
                return e;
              },
              syncfs: (r, e) => {
                "function" == typeof r && ((e = r), (r = !1)),
                  tr.syncFSRequests++,
                  tr.syncFSRequests > 1 &&
                    f(
                      "warning: " +
                        tr.syncFSRequests +
                        " FS.syncfs operations in flight at once, probably just doing extra work"
                    );
                var t = tr.getMounts(tr.root.mount),
                  n = 0;
                function o(r) {
                  return tr.syncFSRequests--, e(r);
                }
                function a(r) {
                  if (r) return a.errored ? void 0 : ((a.errored = !0), o(r));
                  ++n >= t.length && o(null);
                }
                t.forEach((e) => {
                  if (!e.type.syncfs) return a(null);
                  e.type.syncfs(e, r, a);
                });
              },
              mount: (r, e, t) => {
                var n,
                  o = "/" === t,
                  a = !t;
                if (o && tr.root) throw new tr.ErrnoError(10);
                if (!o && !a) {
                  var i = tr.lookupPath(t, { follow_mount: !1 });
                  if (((t = i.path), (n = i.node), tr.isMountpoint(n))) {
                    throw new tr.ErrnoError(10);
                  }
                  if (!tr.isDir(n.mode)) {
                    throw new tr.ErrnoError(54);
                  }
                }
                var s = { type: r, opts: e, mountpoint: t, mounts: [] },
                  u = r.mount(s);
                return (
                  (u.mount = s),
                  (s.root = u),
                  o
                    ? (tr.root = u)
                    : n && ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                  u
                );
              },
              unmount: (r) => {
                var e = tr.lookupPath(r, { follow_mount: !1 });
                if (!tr.isMountpoint(e.node)) throw new tr.ErrnoError(28);
                var t = e.node,
                  n = t.mounted,
                  o = tr.getMounts(n);
                Object.keys(tr.nameTable).forEach((r) => {
                  for (var e = tr.nameTable[r]; e; ) {
                    var t = e.name_next;
                    o.includes(e.mount) && tr.destroyNode(e), (e = t);
                  }
                }),
                  (t.mounted = null);
                var a = t.mount.mounts.indexOf(n);
                t.mount.mounts.splice(a, 1);
              },
              lookup: (r, e) => r.node_ops.lookup(r, e),
              mknod: (r, e, t) => {
                var n = tr.lookupPath(r, { parent: !0 }).node,
                  o = Y.basename(r);
                if (!o || "." === o || ".." === o) {
                  throw new tr.ErrnoError(28);
                }
                var a = tr.mayCreate(n, o);
                if (a) throw new tr.ErrnoError(a);
                if (!n.node_ops.mknod) throw new tr.ErrnoError(63);
                return n.node_ops.mknod(n, o, e, t);
              },
              create: (r, e) => (
                (e = void 0 !== e ? e : 438),
                (e &= 4095),
                (e |= 32768),
                tr.mknod(r, e, 0)
              ),
              mkdir: (r, e) => (
                (e = void 0 !== e ? e : 511),
                (e &= 1023),
                (e |= 16384),
                tr.mknod(r, e, 0)
              ),
              mkdirTree: (r, e) => {
                for (var t = r.split("/"), n = "", o = 0; o < t.length; ++o) {
                  if (t[o]) {
                    n += "/" + t[o];
                    try {
                      tr.mkdir(n, e);
                    } catch (r) {
                      if (20 != r.errno) throw r;
                    }
                  }
                }
              },
              mkdev: (r, e, t) => (
                void 0 === t && ((t = e), (e = 438)),
                (e |= 8192),
                tr.mknod(r, e, t)
              ),
              symlink: (r, e) => {
                if (!Q.resolve(r)) throw new tr.ErrnoError(44);
                var t = tr.lookupPath(e, { parent: !0 }).node;
                if (!t) throw new tr.ErrnoError(44);
                var n = Y.basename(e),
                  o = tr.mayCreate(t, n);
                if (o) throw new tr.ErrnoError(o);
                if (!t.node_ops.symlink) throw new tr.ErrnoError(63);
                return t.node_ops.symlink(t, n, r);
              },
              rename: (r, e) => {
                var t,
                  n,
                  o = Y.dirname(r),
                  a = Y.dirname(e),
                  i = Y.basename(r),
                  s = Y.basename(e);
                if (
                  ((t = tr.lookupPath(r, { parent: !0 }).node),
                  (n = tr.lookupPath(e, { parent: !0 }).node),
                  !t || !n)
                ) {
                  throw new tr.ErrnoError(44);
                }
                if (t.mount !== n.mount) throw new tr.ErrnoError(75);
                var u,
                  c = tr.lookupNode(t, i),
                  l = Q.relative(r, a);
                if ("." !== l.charAt(0)) throw new tr.ErrnoError(28);
                if ("." !== (l = Q.relative(e, o)).charAt(0)) {
                  throw new tr.ErrnoError(55);
                }
                try {
                  u = tr.lookupNode(n, s);
                } catch (r) {}
                if (c !== u) {
                  var d = tr.isDir(c.mode),
                    f = tr.mayDelete(t, i, d);
                  if (f) throw new tr.ErrnoError(f);
                  if ((f = u ? tr.mayDelete(n, s, d) : tr.mayCreate(n, s))) {
                    throw new tr.ErrnoError(f);
                  }
                  if (!t.node_ops.rename) throw new tr.ErrnoError(63);
                  if (tr.isMountpoint(c) || (u && tr.isMountpoint(u))) {
                    throw new tr.ErrnoError(10);
                  }
                  if (n !== t && (f = tr.nodePermissions(t, "w"))) {
                    throw new tr.ErrnoError(f);
                  }
                  tr.hashRemoveNode(c);
                  try {
                    t.node_ops.rename(c, n, s);
                  } catch (r) {
                    throw r;
                  } finally {
                    tr.hashAddNode(c);
                  }
                }
              },
              rmdir: (r) => {
                var e = tr.lookupPath(r, { parent: !0 }).node,
                  t = Y.basename(r),
                  n = tr.lookupNode(e, t),
                  o = tr.mayDelete(e, t, !0);
                if (o) throw new tr.ErrnoError(o);
                if (!e.node_ops.rmdir) {
                  throw new tr.ErrnoError(63);
                }
                if (tr.isMountpoint(n)) throw new tr.ErrnoError(10);
                e.node_ops.rmdir(e, t), tr.destroyNode(n);
              },
              readdir: (r) => {
                var e = tr.lookupPath(r, { follow: !0 }).node;
                if (!e.node_ops.readdir) throw new tr.ErrnoError(54);
                return e.node_ops.readdir(e);
              },
              unlink: (r) => {
                var e = tr.lookupPath(r, { parent: !0 }).node;
                if (!e) throw new tr.ErrnoError(44);
                var t = Y.basename(r),
                  n = tr.lookupNode(e, t),
                  o = tr.mayDelete(e, t, !1);
                if (o) throw new tr.ErrnoError(o);
                if (!e.node_ops.unlink) throw new tr.ErrnoError(63);
                if (tr.isMountpoint(n)) throw new tr.ErrnoError(10);
                e.node_ops.unlink(e, t), tr.destroyNode(n);
              },
              readlink: (r) => {
                var e = tr.lookupPath(r).node;
                if (!e) throw new tr.ErrnoError(44);
                if (!e.node_ops.readlink) throw new tr.ErrnoError(28);
                return Q.resolve(tr.getPath(e.parent), e.node_ops.readlink(e));
              },
              stat: (r, e) => {
                var t = tr.lookupPath(r, { follow: !e }).node;
                if (!t) throw new tr.ErrnoError(44);
                if (!t.node_ops.getattr) throw new tr.ErrnoError(63);
                return t.node_ops.getattr(t);
              },
              lstat: (r) => tr.stat(r, !0),
              chmod: (r, e, t) => {
                var n;
                if (
                  !(n =
                    "string" == typeof r
                      ? tr.lookupPath(r, { follow: !t }).node
                      : r).node_ops.setattr
                ) {
                  throw new tr.ErrnoError(63);
                }
                n.node_ops.setattr(n, {
                  mode: (4095 & e) | (-4096 & n.mode),
                  timestamp: Date.now(),
                });
              },
              lchmod: (r, e) => {
                tr.chmod(r, e, !0);
              },
              fchmod: (r, e) => {
                var t = tr.getStream(r);
                if (!t) throw new tr.ErrnoError(8);
                tr.chmod(t.node, e);
              },
              chown: (r, e, t, n) => {
                var o;
                if (
                  !(o =
                    "string" == typeof r
                      ? tr.lookupPath(r, { follow: !n }).node
                      : r).node_ops.setattr
                ) {
                  throw new tr.ErrnoError(63);
                }
                o.node_ops.setattr(o, { timestamp: Date.now() });
              },
              lchown: (r, e, t) => {
                tr.chown(r, e, t, !0);
              },
              fchown: (r, e, t) => {
                var n = tr.getStream(r);
                if (!n) throw new tr.ErrnoError(8);
                tr.chown(n.node, e, t);
              },
              truncate: (r, e) => {
                if (e < 0) throw new tr.ErrnoError(28);
                var t;
                if (
                  !(t =
                    "string" == typeof r
                      ? tr.lookupPath(r, { follow: !0 }).node
                      : r).node_ops.setattr
                ) {
                  throw new tr.ErrnoError(63);
                }
                if (tr.isDir(t.mode)) throw new tr.ErrnoError(31);
                if (!tr.isFile(t.mode)) throw new tr.ErrnoError(28);
                var n = tr.nodePermissions(t, "w");
                if (n) throw new tr.ErrnoError(n);
                t.node_ops.setattr(t, { size: e, timestamp: Date.now() });
              },
              ftruncate: (r, e) => {
                var t = tr.getStream(r);
                if (!t) throw new tr.ErrnoError(8);
                if (0 == (2097155 & t.flags)) throw new tr.ErrnoError(28);
                tr.truncate(t.node, e);
              },
              utime: (r, e, t) => {
                var n = tr.lookupPath(r, { follow: !0 }).node;
                n.node_ops.setattr(n, { timestamp: Math.max(e, t) });
              },
              open: (r, e, t, n, a) => {
                if ("" === r) throw new tr.ErrnoError(44);
                var i;
                if (
                  ((t = void 0 === t ? 438 : t),
                  (t =
                    64 &
                    (e = "string" == typeof e ? tr.modeStringToFlags(e) : e)
                      ? (4095 & t) | 32768
                      : 0),
                  "object" == typeof r)
                ) {
                  i = r;
                } else {
                  r = Y.normalize(r);
                  try {
                    i = tr.lookupPath(r, { follow: !(131072 & e) }).node;
                  } catch (r) {}
                }
                var s = !1;
                if (64 & e) {
                  if (i)
                    if (128 & e) throw new tr.ErrnoError(20);
                    else (i = tr.mknod(r, t, 0)), (s = !0);
                }
                if (!i) throw new tr.ErrnoError(44);
                if (
                  (tr.isChrdev(i.mode) && (e &= -513),
                  65536 & e && !tr.isDir(i.mode))
                ) {
                  throw new tr.ErrnoError(54);
                }
                if (!s) {
                  var u = tr.mayOpen(i, e);
                  if (u) throw new tr.ErrnoError(u);
                }
                512 & e && tr.truncate(i, 0), (e &= -131713);
                var c = tr.createStream(
                  {
                    node: i,
                    path: tr.getPath(i),
                    flags: e,
                    seekable: !0,
                    position: 0,
                    stream_ops: i.stream_ops,
                    ungotten: [],
                    error: !1,
                  },
                  n,
                  a
                );
                return (
                  c.stream_ops.open && c.stream_ops.open(c),
                  !o.logReadFiles ||
                    1 & e ||
                    (tr.readFiles || (tr.readFiles = {}),
                    r in tr.readFiles || (tr.readFiles[r] = 1)),
                  c
                );
              },
              close: (r) => {
                if (tr.isClosed(r)) throw new tr.ErrnoError(8);
                r.getdents && (r.getdents = null);
                try {
                  r.stream_ops.close && r.stream_ops.close(r);
                } catch (r) {
                  throw r;
                } finally {
                  tr.closeStream(r.fd);
                }
                r.fd = null;
              },
              isClosed: (r) => null === r.fd,
              llseek: (r, e, t) => {
                if (tr.isClosed(r)) throw new tr.ErrnoError(8);
                if (!r.seekable || !r.stream_ops.llseek) {
                  throw new tr.ErrnoError(70);
                }
                if (0 != t && 1 != t && 2 != t) throw new tr.ErrnoError(28);
                return (
                  (r.position = r.stream_ops.llseek(r, e, t)),
                  (r.ungotten = []),
                  r.position
                );
              },
              read: (r, e, t, n, o) => {
                if (n < 0 || o < 0) throw new tr.ErrnoError(28);
                if (tr.isClosed(r)) {
                  throw new tr.ErrnoError(8);
                }
                if (1 == (2097155 & r.flags)) throw new tr.ErrnoError(8);
                if (tr.isDir(r.node.mode)) throw new tr.ErrnoError(31);
                if (!r.stream_ops.read) throw new tr.ErrnoError(28);
                var a = void 0 !== o;
                if (a)
                  if (!r.seekable) throw new tr.ErrnoError(70);
                  else o = r.position;
                var i = r.stream_ops.read(r, e, t, n, o);
                return a || (r.position += i), i;
              },
              write: (r, e, t, n, o, a) => {
                if (n < 0 || o < 0) throw new tr.ErrnoError(28);
                if (tr.isClosed(r)) throw new tr.ErrnoError(8);
                if (0 == (2097155 & r.flags)) throw new tr.ErrnoError(8);
                if (tr.isDir(r.node.mode)) throw new tr.ErrnoError(31);
                if (!r.stream_ops.write) throw new tr.ErrnoError(28);
                r.seekable && 1024 & r.flags && tr.llseek(r, 0, 2);
                var i = void 0 !== o;
                if (i)
                  if (!r.seekable) throw new tr.ErrnoError(70);
                  else o = r.position;
                var s = r.stream_ops.write(r, e, t, n, o, a);
                return i || (r.position += s), s;
              },
              allocate: (r, e, t) => {
                if (tr.isClosed(r)) throw new tr.ErrnoError(8);
                if (e < 0 || t <= 0) throw new tr.ErrnoError(28);
                if (0 == (2097155 & r.flags)) throw new tr.ErrnoError(8);
                if (!tr.isFile(r.node.mode) && !tr.isDir(r.node.mode)) {
                  throw new tr.ErrnoError(43);
                }
                if (!r.stream_ops.allocate) throw new tr.ErrnoError(138);
                r.stream_ops.allocate(r, e, t);
              },
              mmap: (r, e, t, n, o, a) => {
                if (0 != (2 & o) && 0 == (2 & a) && 2 != (2097155 & r.flags)) {
                  throw new tr.ErrnoError(2);
                }
                if (1 == (2097155 & r.flags)) throw new tr.ErrnoError(2);
                if (!r.stream_ops.mmap) throw new tr.ErrnoError(43);
                return r.stream_ops.mmap(r, e, t, n, o, a);
              },
              msync: (r, e, t, n, o) =>
                r && r.stream_ops.msync ? r.stream_ops.msync(r, e, t, n, o) : 0,
              munmap: (r) => 0,
              ioctl: (r, e, t) => {
                if (!r.stream_ops.ioctl) throw new tr.ErrnoError(59);
                return r.stream_ops.ioctl(r, e, t);
              },
              readFile: (r, e = {}) => {
                if (
                  ((e.flags = e.flags || 0),
                  (e.encoding = e.encoding || "binary"),
                  "utf8" !== e.encoding && "binary" !== e.encoding)
                ) {
                  throw new Error('Invalid encoding type "' + e.encoding + '"');
                }
                var t,
                  n = tr.open(r, e.flags),
                  o = tr.stat(r).size,
                  a = new Uint8Array(o);
                return (
                  tr.read(n, a, 0, o, 0),
                  "utf8" === e.encoding
                    ? (t = A(a, 0))
                    : "binary" === e.encoding && (t = a),
                  tr.close(n),
                  t
                );
              },
              writeFile: (r, e, t = {}) => {
                t.flags = t.flags || 577;
                var n = tr.open(r, t.flags, t.mode);
                if ("string" == typeof e) {
                  var o = new Uint8Array(M(e) + 1),
                    a = x(e, o, 0, o.length);
                  tr.write(n, o, 0, a, void 0, t.canOwn);
                } else {
                  if (!ArrayBuffer.isView(e)) {
                    throw new Error("Unsupported data type");
                  }
                  tr.write(n, e, 0, e.byteLength, void 0, t.canOwn);
                }
                tr.close(n);
              },
              cwd: () => tr.currentPath,
              chdir: (r) => {
                var e = tr.lookupPath(r, { follow: !0 });
                if (null === e.node) throw new tr.ErrnoError(44);
                if (!tr.isDir(e.node.mode)) throw new tr.ErrnoError(54);
                var t = tr.nodePermissions(e.node, "x");
                if (t) throw new tr.ErrnoError(t);
                tr.currentPath = e.path;
              },
              createDefaultDirectories: () => {
                tr.mkdir("/tmp"), tr.mkdir("/home"), tr.mkdir("/home/web_user");
              },
              createDefaultDevices: () => {
                tr.mkdir("/dev"),
                  tr.registerDevice(tr.makedev(1, 3), {
                    read: () => 0,
                    write: (r, e, t, n, o) => n,
                  }),
                  tr.mkdev("/dev/null", tr.makedev(1, 3)),
                  Z.register(tr.makedev(5, 0), Z.default_tty_ops),
                  Z.register(tr.makedev(6, 0), Z.default_tty1_ops),
                  tr.mkdev("/dev/tty", tr.makedev(5, 0)),
                  tr.mkdev("/dev/tty1", tr.makedev(6, 0));
                var r = (function () {
                  if (
                    "object" == typeof crypto &&
                    "function" == typeof crypto.getRandomValues
                  ) {
                    var r = new Uint8Array(1);
                    return function () {
                      return crypto.getRandomValues(r), r[0];
                    };
                  }
                  return function () {
                    G("randomDevice");
                  };
                })();
                tr.createDevice("/dev", "random", r),
                  tr.createDevice("/dev", "urandom", r),
                  tr.mkdir("/dev/shm"),
                  tr.mkdir("/dev/shm/tmp");
              },
              createSpecialDirectories: () => {
                tr.mkdir("/proc");
                var r = tr.mkdir("/proc/self");
                tr.mkdir("/proc/self/fd"),
                  tr.mount(
                    {
                      mount: () => {
                        var e = tr.createNode(r, "fd", 16895, 73);
                        return (
                          (e.node_ops = {
                            lookup: (r, e) => {
                              var t = +e,
                                n = tr.getStream(t);
                              if (!n) throw new tr.ErrnoError(8);
                              var o = {
                                parent: null,
                                mount: { mountpoint: "fake" },
                                node_ops: { readlink: () => n.path },
                              };
                              return (o.parent = o), o;
                            },
                          }),
                          e
                        );
                      },
                    },
                    {},
                    "/proc/self/fd"
                  );
              },
              createStandardStreams: () => {
                o.stdin
                  ? tr.createDevice("/dev", "stdin", o.stdin)
                  : tr.symlink("/dev/tty", "/dev/stdin"),
                  o.stdout
                    ? tr.createDevice("/dev", "stdout", null, o.stdout)
                    : tr.symlink("/dev/tty", "/dev/stdout"),
                  o.stderr
                    ? tr.createDevice("/dev", "stderr", null, o.stderr)
                    : tr.symlink("/dev/tty1", "/dev/stderr"),
                  tr.open("/dev/stdin", 0),
                  tr.open("/dev/stdout", 1),
                  tr.open("/dev/stderr", 1);
              },
              ensureErrnoError: () => {
                tr.ErrnoError ||
                  ((tr.ErrnoError = function (r, e) {
                    (this.node = e),
                      (this.setErrno = function (r) {
                        this.errno = r;
                      }),
                      this.setErrno(r),
                      (this.message = "FS error");
                  }),
                  (tr.ErrnoError.prototype = new Error()),
                  (tr.ErrnoError.prototype.constructor = tr.ErrnoError),
                  [44].forEach((r) => {
                    (tr.genericErrors[r] = new tr.ErrnoError(r)),
                      (tr.genericErrors[r].stack = "<generic error, no stack>");
                  }));
              },
              staticInit: () => {
                tr.ensureErrnoError(),
                  (tr.nameTable = new Array(4096)),
                  tr.mount(er, {}, "/"),
                  tr.createDefaultDirectories(),
                  tr.createDefaultDevices(),
                  tr.createSpecialDirectories(),
                  (tr.filesystems = { MEMFS: er });
              },
              init: (r, e, t) => {
                (tr.init.initialized = !0),
                  tr.ensureErrnoError(),
                  (o.stdin = r || o.stdin),
                  (o.stdout = e || o.stdout),
                  (o.stderr = t || o.stderr),
                  tr.createStandardStreams();
              },
              quit: () => {
                tr.init.initialized = !1;
                for (var r = 0; r < tr.streams.length; r++) {
                  var e = tr.streams[r];
                  e && tr.close(e);
                }
              },
              getMode: (r, e) => {
                var t = 0;
                return r && (t |= 365), e && (t |= 146), t;
              },
              findObject: (r, e) => {
                var t = tr.analyzePath(r, e);
                return t.exists ? t.object : null;
              },
              analyzePath: (r, e) => {
                try {
                  r = (n = tr.lookupPath(r, { follow: !e })).path;
                } catch (r) {}
                var t = {
                  isRoot: !1,
                  exists: !1,
                  error: 0,
                  name: null,
                  path: null,
                  object: null,
                  parentExists: !1,
                  parentPath: null,
                  parentObject: null,
                };
                try {
                  var n = tr.lookupPath(r, { parent: !0 });
                  (t.parentExists = !0),
                    (t.parentPath = n.path),
                    (t.parentObject = n.node),
                    (t.name = Y.basename(r)),
                    (n = tr.lookupPath(r, { follow: !e })),
                    (t.exists = !0),
                    (t.path = n.path),
                    (t.object = n.node),
                    (t.name = n.node.name),
                    (t.isRoot = "/" === n.path);
                } catch (r) {
                  t.error = r.errno;
                }
                return t;
              },
              createPath: (r, e, t, n) => {
                r = "string" == typeof r ? r : tr.getPath(r);
                for (var o = e.split("/").reverse(); o.length; ) {
                  var a = o.pop();
                  if (a) {
                    var i = Y.join2(r, a);
                    try {
                      tr.mkdir(i);
                    } catch (r) {}
                    r = i;
                  }
                }
                return i;
              },
              createFile: (r, e, t, n, o) => {
                var a = Y.join2("string" == typeof r ? r : tr.getPath(r), e),
                  i = tr.getMode(n, o);
                return tr.create(a, i);
              },
              createDataFile: (r, e, t, n, o, a) => {
                var i = e;
                r &&
                  ((r = "string" == typeof r ? r : tr.getPath(r)),
                  (i = e ? Y.join2(r, e) : r));
                var s = tr.getMode(n, o),
                  u = tr.create(i, s);
                if (t) {
                  if ("string" == typeof t) {
                    for (
                      var c = new Array(t.length), l = 0, d = t.length;
                      l < d;
                      ++l
                    ) {
                      c[l] = t.charCodeAt(l);
                    }
                    t = c;
                  }
                  tr.chmod(u, 146 | s);
                  var f = tr.open(u, 577);
                  tr.write(f, t, 0, t.length, 0, a),
                    tr.close(f),
                    tr.chmod(u, s);
                }
                return u;
              },
              createDevice: (r, e, t, n) => {
                var o = Y.join2("string" == typeof r ? r : tr.getPath(r), e),
                  a = tr.getMode(!!t, !!n);
                tr.createDevice.major || (tr.createDevice.major = 64);
                var i = tr.makedev(tr.createDevice.major++, 0);
                return (
                  tr.registerDevice(i, {
                    open: (r) => {
                      r.seekable = !1;
                    },
                    close: (r) => {
                      n && n.buffer && n.buffer.length && n(10);
                    },
                    read: (r, e, n, o, a) => {
                      for (var i = 0, s = 0; s < o; s++) {
                        var u;
                        try {
                          u = t();
                        } catch (r) {
                          throw new tr.ErrnoError(29);
                        }
                        if (void 0 === u && 0 === i) throw new tr.ErrnoError(6);
                        if (null == u) break;
                        i++, (e[n + s] = u);
                      }
                      return i && (r.node.timestamp = Date.now()), i;
                    },
                    write: (r, e, t, o, a) => {
                      for (var i = 0; i < o; i++) {
                        try {
                          n(e[t + i]);
                        } catch (r) {
                          throw new tr.ErrnoError(29);
                        }
                      }
                      return o && (r.node.timestamp = Date.now()), i;
                    },
                  }),
                  tr.mkdev(o, a, i)
                );
              },
              forceLoadFile: (r) => {
                if (r.isDevice || r.isFolder || r.link || r.contents) {
                  return !0;
                }
                if ("undefined" != typeof XMLHttpRequest) {
                  throw new Error(
                    "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                  );
                }
                if (!a) {
                  throw new Error(
                    "Cannot load without read() or XMLHttpRequest."
                  );
                }
                try {
                  (r.contents = dr(a(r.url), !0)),
                    (r.usedBytes = r.contents.length);
                } catch (r) {
                  throw new tr.ErrnoError(29);
                }
              },
              createLazyFile: (r, e, t, n, o) => {
                function a() {
                  (this.lengthKnown = !1), (this.chunks = []);
                }
                if (
                  ((a.prototype.get = function (r) {
                    if (!(r > this.length - 1 || r < 0)) {
                      var e = r % this.chunkSize,
                        t = (r / this.chunkSize) | 0;
                      return this.getter(t)[e];
                    }
                  }),
                  (a.prototype.setDataGetter = function (r) {
                    this.getter = r;
                  }),
                  (a.prototype.cacheLength = function () {
                    var r = new XMLHttpRequest();
                    if (
                      (r.open("HEAD", t, !1),
                      r.send(null),
                      !(
                        (r.status >= 200 && r.status < 300) ||
                        304 === r.status
                      ))
                    ) {
                      throw new Error(
                        "Couldn't load " + t + ". Status: " + r.status
                      );
                    }
                    var e,
                      n = Number(r.getResponseHeader("Content-length")),
                      o =
                        (e = r.getResponseHeader("Accept-Ranges")) &&
                        "bytes" === e,
                      a =
                        (e = r.getResponseHeader("Content-Encoding")) &&
                        "gzip" === e,
                      i = 1048576;
                    o || (i = n);
                    var s = this;
                    s.setDataGetter((r) => {
                      var e = r * i,
                        o = (r + 1) * i - 1;
                      if (
                        ((o = Math.min(o, n - 1)),
                        void 0 === s.chunks[r] &&
                          (s.chunks[r] = ((r, e) => {
                            if (r > e) {
                              throw new Error(
                                "invalid range (" +
                                  r +
                                  ", " +
                                  e +
                                  ") or no bytes requested!"
                              );
                            }
                            if (e > n - 1) {
                              throw new Error(
                                "only " +
                                  n +
                                  " bytes available! programmer error!"
                              );
                            }
                            var o = new XMLHttpRequest();
                            if (
                              (o.open("GET", t, !1),
                              n !== i &&
                                o.setRequestHeader(
                                  "Range",
                                  "bytes=" + r + "-" + e
                                ),
                              (o.responseType = "arraybuffer"),
                              o.overrideMimeType &&
                                o.overrideMimeType(
                                  "text/plain; charset=x-user-defined"
                                ),
                              o.send(null),
                              !(
                                (o.status >= 200 && o.status < 300) ||
                                304 === o.status
                              ))
                            ) {
                              throw new Error(
                                "Couldn't load " + t + ". Status: " + o.status
                              );
                            }
                            return void 0 !== o.response
                              ? new Uint8Array(o.response || [])
                              : dr(o.responseText || "", !0);
                          })(e, o)),
                        void 0 === s.chunks[r])
                      ) {
                        throw new Error("doXHR failed!");
                      }
                      return s.chunks[r];
                    }),
                      (!a && n) ||
                        ((i = n = 1),
                        (n = this.getter(0).length),
                        (i = n),
                        d(
                          "LazyFiles on gzip forces download of the whole file when length is accessed"
                        )),
                      (this._length = n),
                      (this._chunkSize = i),
                      (this.lengthKnown = !0);
                  }),
                  "undefined" != typeof XMLHttpRequest)
                ) {
                  throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                }
                var i = { isDevice: !1, url: t },
                  s = tr.createFile(r, e, i, n, o);
                i.contents
                  ? (s.contents = i.contents)
                  : i.url && ((s.contents = null), (s.url = i.url)),
                  Object.defineProperties(s, {
                    usedBytes: {
                      get: function () {
                        return this.contents.length;
                      },
                    },
                  });
                var u = {};
                return (
                  Object.keys(s.stream_ops).forEach((r) => {
                    var e = s.stream_ops[r];
                    u[r] = function () {
                      return tr.forceLoadFile(s), e.apply(null, arguments);
                    };
                  }),
                  (u.read = (r, e, t, n, o) => {
                    tr.forceLoadFile(s);
                    var a = r.node.contents;
                    if (o >= a.length) return 0;
                    var i = Math.min(a.length - o, n);
                    if (a.slice) {
                      for (var u = 0; u < i; u++) e[t + u] = a[o + u];
                    } else for (u = 0; u < i; u++) e[t + u] = a.get(o + u);
                    return i;
                  }),
                  (s.stream_ops = u),
                  s
                );
              },
              createPreloadedFile: (r, e, t, n, o, a, s, u, c, l) => {
                var d = e ? Q.resolve(Y.join2(r, e)) : r;
                function f(t) {
                  function i(t) {
                    l && l(),
                      u || tr.createDataFile(r, e, t, n, o, c),
                      a && a(),
                      U();
                  }
                  Browser.handledByPreloadPlugin(t, d, i, () => {
                    s && s(), U();
                  }) || i(t);
                }
                H(),
                  "string" == typeof t
                    ? (function (r, e, t, n) {
                        var o = n ? "" : "al " + r;
                        i(
                          r,
                          function (t) {
                            _(
                              t,
                              'Loading data file "' +
                                r +
                                '" failed (no arrayBuffer).'
                            ),
                              e(new Uint8Array(t)),
                              o && U();
                          },
                          function (e) {
                            if (!t)
                              throw 'Loading data file "' + r + '" failed.';
                            t();
                          }
                        ),
                          o && H();
                      })(t, (r) => f(r), s)
                    : f(t);
              },
              indexedDB: () =>
                window.indexedDB ||
                window.mozIndexedDB ||
                window.webkitIndexedDB ||
                window.msIndexedDB,
              DB_NAME: () => "EM_FS_" + window.location.pathname,
              DB_VERSION: 20,
              DB_STORE_NAME: "FILE_DATA",
              saveFilesToDB: (r, e, t) => {
                (e = e || (() => {})), (t = t || (() => {}));
                var n = tr.indexedDB();
                try {
                  var o = n.open(tr.DB_NAME(), tr.DB_VERSION);
                } catch (r) {
                  return t(r);
                }
                (o.onupgradeneeded = () => {
                  d("creating db"),
                    o.result.createObjectStore(tr.DB_STORE_NAME);
                }),
                  (o.onsuccess = () => {
                    var n = o.result.transaction(
                        [tr.DB_STORE_NAME],
                        "readwrite"
                      ),
                      a = n.objectStore(tr.DB_STORE_NAME),
                      i = 0,
                      s = 0,
                      u = r.length;
                    function c() {
                      0 == s ? e() : t();
                    }
                    r.forEach((r) => {
                      var e = a.put(tr.analyzePath(r).object.contents, r);
                      (e.onsuccess = () => {
                        ++i + s == u && c();
                      }),
                        (e.onerror = () => {
                          s++, i + s == u && c();
                        });
                    }),
                      (n.onerror = t);
                  }),
                  (o.onerror = t);
              },
              loadFilesFromDB: (r, e, t) => {
                (e = e || (() => {})), (t = t || (() => {}));
                var n = tr.indexedDB();
                try {
                  var o = n.open(tr.DB_NAME(), tr.DB_VERSION);
                } catch (r) {
                  return t(r);
                }
                (o.onupgradeneeded = t),
                  (o.onsuccess = () => {
                    var n = o.result;
                    try {
                      var a = n.transaction([tr.DB_STORE_NAME], "readonly");
                    } catch (r) {
                      return void t(r);
                    }
                    var i = a.objectStore(tr.DB_STORE_NAME),
                      s = 0,
                      u = 0,
                      c = r.length;
                    function l() {
                      0 == u ? e() : t();
                    }
                    r.forEach((r) => {
                      var e = i.get(r);
                      (e.onsuccess = () => {
                        tr.analyzePath(r).exists && tr.unlink(r),
                          tr.createDataFile(
                            Y.dirname(r),
                            Y.basename(r),
                            e.result,
                            !0,
                            !0,
                            !0
                          ),
                          ++s + u == c && l();
                      }),
                        (e.onerror = () => {
                          u++, s + u == c && l();
                        });
                    }),
                      (a.onerror = t);
                  }),
                  (o.onerror = t);
              },
            },
            nr = {
              DEFAULT_POLLMASK: 5,
              calculateAt: function (r, e, t) {
                if ("/" === e[0]) return e;
                var n;
                if (-100 === r) n = tr.cwd();
                else {
                  var o = tr.getStream(r);
                  if (!o) throw new tr.ErrnoError(8);
                  n = o.path;
                }
                if (0 == e.length) {
                  if (!t) throw new tr.ErrnoError(44);
                  return n;
                }
                return Y.join2(n, e);
              },
              doStat: function (r, e, t) {
                try {
                  var n = r(e);
                } catch (r) {
                  if (
                    r &&
                    r.node &&
                    Y.normalize(e) !== Y.normalize(tr.getPath(r.node))
                  ) {
                    return -54;
                  }
                  throw r;
                }
                return (
                  (k[t >> 2] = n.dev),
                  (k[(t + 4) >> 2] = 0),
                  (k[(t + 8) >> 2] = n.ino),
                  (k[(t + 12) >> 2] = n.mode),
                  (k[(t + 16) >> 2] = n.nlink),
                  (k[(t + 20) >> 2] = n.uid),
                  (k[(t + 24) >> 2] = n.gid),
                  (k[(t + 28) >> 2] = n.rdev),
                  (k[(t + 32) >> 2] = 0),
                  (j = [
                    n.size >>> 0,
                    ((B = n.size),
                    +Math.abs(B) >= 1
                      ? B > 0
                        ? (0 |
                            Math.min(
                              +Math.floor(B / 4294967296),
                              4294967295
                            )) >>>
                          0
                        : ~~+Math.ceil((B - +(~~B >>> 0)) / 4294967296) >>> 0
                      : 0),
                  ]),
                  (k[(t + 40) >> 2] = j[0]),
                  (k[(t + 44) >> 2] = j[1]),
                  (k[(t + 48) >> 2] = 4096),
                  (k[(t + 52) >> 2] = n.blocks),
                  (k[(t + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                  (k[(t + 60) >> 2] = 0),
                  (k[(t + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                  (k[(t + 68) >> 2] = 0),
                  (k[(t + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                  (k[(t + 76) >> 2] = 0),
                  (j = [
                    n.ino >>> 0,
                    ((B = n.ino),
                    +Math.abs(B) >= 1
                      ? B > 0
                        ? (0 |
                            Math.min(
                              +Math.floor(B / 4294967296),
                              4294967295
                            )) >>>
                          0
                        : ~~+Math.ceil((B - +(~~B >>> 0)) / 4294967296) >>> 0
                      : 0),
                  ]),
                  (k[(t + 80) >> 2] = j[0]),
                  (k[(t + 84) >> 2] = j[1]),
                  0
                );
              },
              doMsync: function (r, e, t, n, o) {
                var a = g.slice(r, r + t);
                tr.msync(e, a, o, t, n);
              },
              doMkdir: function (r, e) {
                return (
                  "/" === (r = Y.normalize(r))[r.length - 1] &&
                    (r = r.substr(0, r.length - 1)),
                  tr.mkdir(r, e, 0),
                  0
                );
              },
              doMknod: function (r, e, t) {
                switch (61440 & e) {
                  case 32768:
                  case 8192:
                  case 24576:
                  case 4096:
                  case 49152:
                    break;
                  default:
                    return -28;
                }
                return tr.mknod(r, e, t), 0;
              },
              doReadlink: function (r, e, t) {
                if (t <= 0) return -28;
                var n = tr.readlink(r),
                  o = Math.min(t, M(n)),
                  a = E[e + o];
                return x(n, g, e, t + 1), (E[e + o] = a), o;
              },
              doAccess: function (r, e) {
                if (-8 & e) return -28;
                var t = tr.lookupPath(r, { follow: !0 }).node;
                if (!t) return -44;
                var n = "";
                return (
                  4 & e && (n += "r"),
                  2 & e && (n += "w"),
                  1 & e && (n += "x"),
                  n && tr.nodePermissions(t, n) ? -2 : 0
                );
              },
              doDup: function (r, e, t) {
                var n = tr.getStream(t);
                return n && tr.close(n), tr.open(r, e, 0, t, t).fd;
              },
              doReadv: function (r, e, t, n) {
                for (var o = 0, a = 0; a < t; a++) {
                  var i = k[(e + 8 * a) >> 2],
                    s = k[(e + (8 * a + 4)) >> 2],
                    u = tr.read(r, E, i, s, n);
                  if (u < 0) return -1;
                  if (((o += u), u < s)) break;
                }
                return o;
              },
              doWritev: function (r, e, t, n) {
                for (var o = 0, a = 0; a < t; a++) {
                  var i = k[(e + 8 * a) >> 2],
                    s = k[(e + (8 * a + 4)) >> 2],
                    u = tr.write(r, E, i, s, n);
                  if (u < 0) return -1;
                  o += u;
                }
                return o;
              },
              varargs: void 0,
              get: function () {
                return (nr.varargs += 4), k[(nr.varargs - 4) >> 2];
              },
              getStr: function (r) {
                return F(r);
              },
              getStreamFromFD: function (r) {
                var e = tr.getStream(r);
                if (!e) throw new tr.ErrnoError(8);
                return e;
              },
              get64: function (r, e) {
                return r;
              },
            },
            or = [];
          function ar(r) {
            try {
              return h.grow((r - y.byteLength + 65535) >>> 16), R(h.buffer), 1;
            } catch (r) {}
          }
          var ir = {};
          function sr() {
            if (!sr.strings) {
              var r = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG:
                  (
                    ("object" == typeof navigator &&
                      navigator.languages &&
                      navigator.languages[0]) ||
                    "C"
                  ).replace("-", "_") + ".UTF-8",
                _: u || "./this.program",
              };
              for (var e in ir) void 0 === ir[e] ? delete r[e] : (r[e] = ir[e]);
              var t = [];
              for (var e in r) t.push(e + "=" + r[e]);
              sr.strings = t;
            }
            return sr.strings;
          }
          var ur = function (r, e, t, n) {
              r || (r = this),
                (this.parent = r),
                (this.mount = r.mount),
                (this.mounted = null),
                (this.id = tr.nextInode++),
                (this.name = e),
                (this.mode = t),
                (this.node_ops = {}),
                (this.stream_ops = {}),
                (this.rdev = n);
            },
            cr = 365,
            lr = 146;
          function dr(r, e, t) {
            var n = t > 0 ? t : M(r) + 1,
              o = new Array(n),
              a = x(r, o, 0, o.length);
            return e && (o.length = a), o;
          }
          Object.defineProperties(ur.prototype, {
            read: {
              get: function () {
                return (this.mode & cr) === cr;
              },
              set: function (r) {
                r ? (this.mode |= cr) : (this.mode &= -366);
              },
            },
            write: {
              get: function () {
                return (this.mode & lr) === lr;
              },
              set: function (r) {
                r ? (this.mode |= lr) : (this.mode &= -147);
              },
            },
            isFolder: {
              get: function () {
                return tr.isDir(this.mode);
              },
            },
            isDevice: {
              get: function () {
                return tr.isChrdev(this.mode);
              },
            },
          }),
            (tr.FSNode = ur),
            tr.staticInit();
          var fr = {
            s: function (r, e) {
              return (function (r, e) {
                var t;
                if (0 === r) t = Date.now();
                else {
                  if (1 !== r && 4 !== r) return K(28), -1;
                  t = J();
                }
                return (
                  (k[e >> 2] = (t / 1e3) | 0),
                  (k[(e + 4) >> 2] = ((t % 1e3) * 1e3 * 1e3) | 0),
                  0
                );
              })(r, e);
            },
            j: function (r, e, t, n) {
              try {
                return (
                  (e = nr.getStr(e)),
                  (e = nr.calculateAt(r, e)),
                  nr.doAccess(e, t)
                );
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            i: function (r, e, t) {
              nr.varargs = t;
              try {
                var n = nr.getStreamFromFD(r);
                switch (e) {
                  case 0:
                    return (o = nr.get()) < 0
                      ? -28
                      : tr.open(n.path, n.flags, 0, o).fd;
                  case 1:
                  case 2:
                  case 6:
                  case 7:
                    return 0;
                  case 3:
                    return n.flags;
                  case 4:
                    var o = nr.get();
                    return (n.flags |= o), 0;
                  case 5:
                    return (o = nr.get()), (b[(o + 0) >> 1] = 2), 0;
                  case 16:
                  case 8:
                  default:
                    return -28;
                  case 9:
                    return K(28), -1;
                }
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            z: function (r, e) {
              try {
                var t = nr.getStreamFromFD(r);
                return nr.doStat(tr.stat, t.path, e);
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            x: function (r, e, t, n) {
              try {
                e = nr.getStr(e);
                var o = 256 & n,
                  a = 4096 & n;
                return (
                  (n &= -4353),
                  (e = nr.calculateAt(r, e, a)),
                  nr.doStat(o ? tr.lstat : tr.stat, e, t)
                );
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            A: function (r, e, t) {
              nr.varargs = t;
              try {
                var n = nr.getStreamFromFD(r);
                switch (e) {
                  case 21509:
                  case 21505:
                  case 21510:
                  case 21511:
                  case 21512:
                  case 21506:
                  case 21507:
                  case 21508:
                  case 21523:
                  case 21524:
                    return n.tty ? 0 : -59;
                  case 21519:
                    if (!n.tty) return -59;
                    var o = nr.get();
                    return (k[o >> 2] = 0), 0;
                  case 21520:
                    return n.tty ? -28 : -59;
                  case 21531:
                    return (o = nr.get()), tr.ioctl(n, e, o);
                  default:
                    G("bad ioctl syscall " + e);
                }
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            d: function (r, e, t) {
              nr.varargs = t;
              try {
                var n = nr.getStr(r),
                  o = t ? nr.get() : 0;
                return tr.open(n, e, o).fd;
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            y: function (r, e) {
              try {
                return (r = nr.getStr(r)), nr.doStat(tr.stat, r, e);
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            r: function (r) {
              try {
                return (r = nr.getStr(r)), tr.unlink(r), 0;
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            p: function () {
              throw 1 / 0;
            },
            t: function (r, e, t, n, o, a, i, s) {
              try {
                var u = tr.getStream(o);
                if (!u) return -8;
                var c = tr.mmap(u, r, e, a, t, n),
                  l = c.ptr;
                return (k[i >> 2] = c.allocated), l;
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            u: function (r, e, t, n, o, a) {
              try {
                var i = tr.getStream(o);
                i && (2 & t && nr.doMsync(r, i, e, n, a), tr.munmap(i));
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return -r.errno;
              }
            },
            o: function () {
              G("");
            },
            C: function (r, e, t) {
              var n = (function (r, e) {
                var t;
                for (or.length = 0, e >>= 2; (t = g[r++]); ) {
                  var n = t < 105;
                  n && 1 & e && e++, or.push(n ? D[e++ >> 1] : k[e]), ++e;
                }
                return or;
              })(e, t);
              return V[r].apply(null, n);
            },
            B: function (r, e, t) {
              g.copyWithin(r, e, e + t);
            },
            q: function (r) {
              var e,
                t,
                n = g.length,
                o = 2147483648;
              if ((r >>>= 0) > o) return !1;
              for (var a = 1; a <= 4; a *= 2) {
                var i = n * (1 + 0.2 / a);
                if (
                  ((i = Math.min(i, r + 100663296)),
                  ar(
                    Math.min(
                      o,
                      (e = Math.max(r, i)) + (((t = 65536) - (e % t)) % t)
                    )
                  ))
                ) {
                  return !0;
                }
              }
              return !1;
            },
            v: function (r, e) {
              var t = 0;
              return (
                sr().forEach(function (n, o) {
                  var a = e + t;
                  (k[(r + 4 * o) >> 2] = a),
                    (function (r, e, t) {
                      for (var n = 0; n < r.length; ++n) {
                        E[e++ >> 0] = r.charCodeAt(n);
                      }
                      t || (E[e >> 0] = 0);
                    })(n, a),
                    (t += n.length + 1);
                }),
                0
              );
            },
            w: function (r, e) {
              var t = sr();
              k[r >> 2] = t.length;
              var n = 0;
              return (
                t.forEach(function (r) {
                  n += r.length + 1;
                }),
                (k[e >> 2] = n),
                0
              );
            },
            e: function (r) {
              !(function (r, e) {
                var t;
                (t = r),
                  v || (o.onExit && o.onExit(t), (w = !0)),
                  c(t, new Pr(t));
              })(r);
            },
            c: function (r) {
              try {
                var e = nr.getStreamFromFD(r);
                return tr.close(e), 0;
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return r.errno;
              }
            },
            g: function (r, e, t, n) {
              try {
                var o = nr.getStreamFromFD(r),
                  a = nr.doReadv(o, e, t);
                return (k[n >> 2] = a), 0;
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return r.errno;
              }
            },
            n: function (r, e, t, n, o) {
              try {
                var a = nr.getStreamFromFD(r),
                  i = 4294967296 * t + (e >>> 0),
                  s = 9007199254740992;
                return i <= -s || i >= s
                  ? -61
                  : (tr.llseek(a, i, n),
                    (j = [
                      a.position >>> 0,
                      ((B = a.position),
                      +Math.abs(B) >= 1
                        ? B > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(B / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((B - +(~~B >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (k[o >> 2] = j[0]),
                    (k[(o + 4) >> 2] = j[1]),
                    a.getdents && 0 === i && 0 === n && (a.getdents = null),
                    0);
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return r.errno;
              }
            },
            h: function (r, e, t, n) {
              try {
                var o = nr.getStreamFromFD(r),
                  a = nr.doWritev(o, e, t);
                return (k[n >> 2] = a), 0;
              } catch (r) {
                if (void 0 === tr || !(r instanceof tr.ErrnoError)) throw r;
                return r.errno;
              }
            },
            b: function () {
              return m;
            },
            k: function (r) {
              var e = Date.now();
              return (
                (k[r >> 2] = (e / 1e3) | 0),
                (k[(r + 4) >> 2] = ((e % 1e3) * 1e3) | 0),
                0
              );
            },
            l: function (r, e, t, n, o, a, i) {
              var s = Dr();
              try {
                return $(r)(e, t, n, o, a, i);
              } catch (r) {
                if ((Sr(s), r !== r + 0)) throw r;
                kr(1, 0);
              }
            },
            m: function (r, e) {
              var t = Dr();
              try {
                $(r)(e);
              } catch (r) {
                if ((Sr(t), r !== r + 0)) throw r;
                kr(1, 0);
              }
            },
            a: function (r) {
              m = r;
            },
            f: function (r) {
              var e = (Date.now() / 1e3) | 0;
              return r && (k[r >> 2] = e), e;
            },
          };
          !(function () {
            var r = { a: fr };
            function e(r, e) {
              var t,
                n = r.exports;
              (o.asm = n),
                R((h = o.asm.D).buffer),
                (S = o.asm.M),
                (t = o.asm.E),
                N.unshift(t),
                U();
            }
            function t(r) {
              e(r.instance);
            }
            function a(e) {
              return Promise.resolve()
                .then(function () {
                  const module = graphvizWasmModule();
                  const instance = new WebAssembly.Instance(module, r);
                  return { module, instance };
                  // return WebAssembly.instantiate(e, r);
                })
                .then(function (r) {
                  return r;
                })
                .then(e, function (r) {
                  f("failed to asynchronously prepare wasm: " + r), G(r);
                });
            }
            if ((H(), o.instantiateWasm)) {
              try {
                return o.instantiateWasm(r, e);
              } catch (r) {
                return (
                  f("Module.instantiateWasm callback failed with error: " + r),
                  !1
                );
              }
            }

            a(t).catch(n);
          })(),
            (o.___wasm_call_ctors = function () {
              return (o.___wasm_call_ctors = o.asm.E).apply(null, arguments);
            });
          var pr = (o._emscripten_bind_VoidPtr___destroy___0 = function () {
              return (pr = o._emscripten_bind_VoidPtr___destroy___0 =
                o.asm.F).apply(null, arguments);
            }),
            mr = (o._emscripten_bind_Graphviz_Graphviz_2 = function () {
              return (mr = o._emscripten_bind_Graphviz_Graphviz_2 =
                o.asm.G).apply(null, arguments);
            }),
            hr = (o._emscripten_bind_Graphviz_version_0 = function () {
              return (hr = o._emscripten_bind_Graphviz_version_0 =
                o.asm.H).apply(null, arguments);
            }),
            vr = (o._emscripten_bind_Graphviz_lastError_0 = function () {
              return (vr = o._emscripten_bind_Graphviz_lastError_0 =
                o.asm.I).apply(null, arguments);
            }),
            wr = (o._emscripten_bind_Graphviz_layout_3 = function () {
              return (wr = o._emscripten_bind_Graphviz_layout_3 =
                o.asm.J).apply(null, arguments);
            }),
            _r = (o._emscripten_bind_Graphviz_createFile_2 = function () {
              return (_r = o._emscripten_bind_Graphviz_createFile_2 =
                o.asm.K).apply(null, arguments);
            }),
            yr = (o._emscripten_bind_Graphviz___destroy___0 = function () {
              return (yr = o._emscripten_bind_Graphviz___destroy___0 =
                o.asm.L).apply(null, arguments);
            });
          (o._malloc = function () {
            return (o._malloc = o.asm.N).apply(null, arguments);
          }),
            (o._free = function () {
              return (o._free = o.asm.O).apply(null, arguments);
            });
          var Er,
            gr = (o.___errno_location = function () {
              return (gr = o.___errno_location = o.asm.P).apply(
                null,
                arguments
              );
            }),
            br = (o._emscripten_builtin_memalign = function () {
              return (br = o._emscripten_builtin_memalign = o.asm.Q).apply(
                null,
                arguments
              );
            }),
            kr = (o._setThrew = function () {
              return (kr = o._setThrew = o.asm.R).apply(null, arguments);
            }),
            Dr = (o.stackSave = function () {
              return (Dr = o.stackSave = o.asm.S).apply(null, arguments);
            }),
            Sr = (o.stackRestore = function () {
              return (Sr = o.stackRestore = o.asm.T).apply(null, arguments);
            });
          function Pr(r) {
            (this.name = "ExitStatus"),
              (this.message = "Program terminated with exit(" + r + ")"),
              (this.status = r);
          }
          function Ar(r) {
            function t() {
              Er ||
                ((Er = !0),
                (o.calledRun = !0),
                w ||
                  (o.noFSInit || tr.init.initialized || tr.init(),
                  (tr.ignorePermissions = !1),
                  X(N),
                  e(o),
                  o.onRuntimeInitialized && o.onRuntimeInitialized(),
                  (function () {
                    if (o.postRun) {
                      for (
                        "function" == typeof o.postRun &&
                        (o.postRun = [o.postRun]);
                        o.postRun.length;

                      ) {
                        (r = o.postRun.shift()), O.unshift(r);
                      }
                    }
                    var r;
                    X(O);
                  })()));
            }
            L > 0 ||
              ((function () {
                if (o.preRun) {
                  for (
                    "function" == typeof o.preRun && (o.preRun = [o.preRun]);
                    o.preRun.length;

                  ) {
                    (r = o.preRun.shift()), T.unshift(r);
                  }
                }
                var r;
                X(T);
              })(),
              L > 0 ||
                (o.setStatus
                  ? (o.setStatus("Running..."),
                    setTimeout(function () {
                      setTimeout(function () {
                        o.setStatus("");
                      }, 1),
                        t();
                    }, 1))
                  : t()));
          }
          if (
            ((I = function r() {
              Er || Ar(), Er || (I = r);
            }),
            (o.run = Ar),
            o.preInit)
          ) {
            for (
              "function" == typeof o.preInit && (o.preInit = [o.preInit]);
              o.preInit.length > 0;

            ) {
              o.preInit.pop()();
            }
          }
          function Fr() {}
          function xr(r) {
            return (r || Fr).__cache__;
          }
          function Mr(r, e) {
            var t = xr(e),
              n = t[r];
            return (
              n ||
              (((n = Object.create((e || Fr).prototype)).ptr = r), (t[r] = n))
            );
          }
          Ar(),
            (Fr.prototype = Object.create(Fr.prototype)),
            (Fr.prototype.constructor = Fr),
            (Fr.prototype.__class__ = Fr),
            (Fr.__cache__ = {}),
            (o.WrapperObject = Fr),
            (o.getCache = xr),
            (o.wrapPointer = Mr),
            (o.castObject = function (r, e) {
              return Mr(r.ptr, e);
            }),
            (o.NULL = Mr(0)),
            (o.destroy = function (r) {
              if (!r.__destroy__) {
                throw "Error: Cannot destroy object. (Did you create it yourself?)";
              }
              r.__destroy__(), delete xr(r.__class__)[r.ptr];
            }),
            (o.compare = function (r, e) {
              return r.ptr === e.ptr;
            }),
            (o.getPointer = function (r) {
              return r.ptr;
            }),
            (o.getClass = function (r) {
              return r.__class__;
            });
          var Rr = {
            buffer: 0,
            size: 0,
            pos: 0,
            temps: [],
            needed: 0,
            prepare: function () {
              if (Rr.needed) {
                for (var r = 0; r < Rr.temps.length; r++) o._free(Rr.temps[r]);
                (Rr.temps.length = 0),
                  o._free(Rr.buffer),
                  (Rr.buffer = 0),
                  (Rr.size += Rr.needed),
                  (Rr.needed = 0);
              }
              Rr.buffer ||
                ((Rr.size += 128),
                (Rr.buffer = o._malloc(Rr.size)),
                _(Rr.buffer)),
                (Rr.pos = 0);
            },
            alloc: function (r, e) {
              _(Rr.buffer);
              var t,
                n = e.BYTES_PER_ELEMENT,
                a = r.length * n;
              return (
                (a = (a + 7) & -8),
                Rr.pos + a >= Rr.size
                  ? (_(a > 0),
                    (Rr.needed += a),
                    (t = o._malloc(a)),
                    Rr.temps.push(t))
                  : ((t = Rr.buffer + Rr.pos), (Rr.pos += a)),
                t
              );
            },
            copy: function (r, e, t) {
              switch (((t >>>= 0), e.BYTES_PER_ELEMENT)) {
                case 2:
                  t >>>= 1;
                  break;
                case 4:
                  t >>>= 2;
                  break;
                case 8:
                  t >>>= 3;
              }
              for (var n = 0; n < r.length; n++) e[t + n] = r[n];
            },
          };
          function Cr(r) {
            if ("string" == typeof r) {
              var e = dr(r),
                t = Rr.alloc(e, E);
              return Rr.copy(e, E, t), t;
            }
            return r;
          }
          function zr() {
            throw "cannot construct a VoidPtr, no constructor in IDL";
          }
          function Br(r, e) {
            r && "object" == typeof r && (r = r.ptr),
              e && "object" == typeof e && (e = e.ptr),
              (this.ptr = mr(r, e)),
              (xr(Br)[this.ptr] = this);
          }
          return (
            (zr.prototype = Object.create(Fr.prototype)),
            (zr.prototype.constructor = zr),
            (zr.prototype.__class__ = zr),
            (zr.__cache__ = {}),
            (o.VoidPtr = zr),
            (zr.prototype.__destroy__ = zr.prototype.__destroy__ =
              function () {
                var r = this.ptr;
                pr(r);
              }),
            (Br.prototype = Object.create(Fr.prototype)),
            (Br.prototype.constructor = Br),
            (Br.prototype.__class__ = Br),
            (Br.__cache__ = {}),
            (o.Graphviz = Br),
            (Br.prototype.version = Br.prototype.version =
              function () {
                var r = this.ptr;
                return F(hr(r));
              }),
            (Br.prototype.lastError = Br.prototype.lastError =
              function () {
                var r = this.ptr;
                return F(vr(r));
              }),
            (Br.prototype.layout = Br.prototype.layout =
              function (r, e, t) {
                var n = this.ptr;
                return (
                  Rr.prepare(),
                  (r = r && "object" == typeof r ? r.ptr : Cr(r)),
                  (e = e && "object" == typeof e ? e.ptr : Cr(e)),
                  (t = t && "object" == typeof t ? t.ptr : Cr(t)),
                  F(wr(n, r, e, t))
                );
              }),
            (Br.prototype.createFile = Br.prototype.createFile =
              function (r, e) {
                var t = this.ptr;
                Rr.prepare(),
                  (r = r && "object" == typeof r ? r.ptr : Cr(r)),
                  (e = e && "object" == typeof e ? e.ptr : Cr(e)),
                  _r(t, r, e);
              }),
            (Br.prototype.__destroy__ = Br.prototype.__destroy__ =
              function () {
                var r = this.ptr;
                yr(r);
              }),
            r.ready
          );
        });
    r.exports = n;
  })(c);
  var l = e({ __proto__: null, default: c.exports }, [c.exports]);
  function d(r) {
    return {
      path: r.path,
      data: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="${r.width}" height="${r.height}"></svg>`,
    };
  }
  function f(r, e) {
    const t = { images: [], files: [], ...e };
    var n;
    [...t.files, ...((n = t.images), n.map(d))].forEach((e) =>
      r.createFile(e.path, e.data)
    );
  }
  const p = {
    layout: (r, e = "svg", t = "dot", n) =>
      r
        ? i(
            l,
            null == n ? void 0 : n.wasmFolder,
            null == n ? void 0 : n.wasmBinary
          ).then((o) => {
            const a = new o.Graphviz(
              void 0 !== (null == n ? void 0 : n.yInvert) &&
                (null == n ? void 0 : n.yInvert),
              void 0 !== (null == n ? void 0 : n.nop)
                ? null == n
                  ? void 0
                  : n.nop
                : 0
            );
            f(a, n);
            const i = a.layout(r, e, t);
            if ((o.destroy(a), !i)) {
              throw new Error(o.Graphviz.prototype.lastError());
            }
            return i;
          })
        : Promise.resolve(""),
    circo(r, e = "svg", t) {
      return this.layout(r, e, "circo", t);
    },
    dot(r, e = "svg", t) {
      return this.layout(r, e, "dot", t);
    },
    fdp(r, e = "svg", t) {
      return this.layout(r, e, "fdp", t);
    },
    sfdp(r, e = "svg", t) {
      return this.layout(r, e, "sfdp", t);
    },
    neato(r, e = "svg", t) {
      return this.layout(r, e, "neato", t);
    },
    osage(r, e = "svg", t) {
      return this.layout(r, e, "osage", t);
    },
    patchwork(r, e = "svg", t) {
      return this.layout(r, e, "patchwork", t);
    },
    twopi(r, e = "svg", t) {
      return this.layout(r, e, "twopi", t);
    },
  };
  class m {
    constructor(r) {
      this._wasm = r;
    }
    layout(r, e = "svg", t = "dot", n) {
      if (!r) return "";
      const o = new this._wasm.Graphviz(
        (null == n ? void 0 : n.yInvert) ? 1 : 0,
        (null == n ? void 0 : n.nop) ? (null == n ? void 0 : n.nop) : 0
      );
      f(o, n);
      const a = o.layout(r, e, t);
      if ((this._wasm.destroy(o), !a)) {
        throw new Error(this._wasm.Graphviz.prototype.lastError());
      }
      return a;
    }
    circo(r, e = "svg", t) {
      return this.layout(r, e, "circo", t);
    }
    dot(r, e = "svg", t) {
      return this.layout(r, e, "dot", t);
    }
    fdp(r, e = "svg", t) {
      return this.layout(r, e, "fdp", t);
    }
    sfdp(r, e = "svg", t) {
      return this.layout(r, e, "sfdp", t);
    }
    neato(r, e = "svg", t) {
      return this.layout(r, e, "neato", t);
    }
    osage(r, e = "svg", t) {
      return this.layout(r, e, "osage", t);
    }
    patchwork(r, e = "svg", t) {
      return this.layout(r, e, "patchwork", t);
    }
    twopi(r, e = "svg", t) {
      return this.layout(r, e, "twopi", t);
    }
  }
  (r.GraphvizSync = m),
    (r.StackElement = s),
    (r.StackParser = class {
      constructor() {
        this._stack = [];
      }
      parse(r, e, t) {
        return u(r, this, e, t);
      }
      top() {
        return this._stack[this._stack.length - 1];
      }
      startElement(r, e) {
        const t = new s(r, e);
        return this._stack.push(t), t;
      }
      endElement(r) {
        return this._stack.pop();
      }
      characterData(r) {
        this.top().appendContent(r);
      }
    }),
    (r.expatVersion = function (r, e) {
      return i(n, r, e).then((r) => r.CExpat.prototype.version());
    }),
    (r.graphviz = p),
    (r.graphvizSync = function (r, e) {
      return i(l, r, e).then((r) => new m(r));
    }),
    (r.graphvizVersion = function (r, e) {
      return i(l, r, e).then((r) => r.Graphviz.prototype.version());
    }),
    (r.parse = u),
    (r.wasmFolder = a),
    Object.defineProperty(r, "__esModule", { value: !0 });
});
