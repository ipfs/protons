/*eslint-disable*/
// @ts-nocheck
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots.bench || ($protobuf.roots.bench = {});

export const Foo = $root.Foo = (() => {

    /**
     * Properties of a Foo.
     * @exports IFoo
     * @interface IFoo
     * @property {number|null} [baz] Foo baz
     */

    /**
     * Constructs a new Foo.
     * @exports Foo
     * @classdesc Represents a Foo.
     * @implements IFoo
     * @constructor
     * @param {IFoo=} [p] Properties to set
     */
    function Foo(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Foo baz.
     * @member {number} baz
     * @memberof Foo
     * @instance
     */
    Foo.prototype.baz = 0;

    /**
     * Encodes the specified Foo message. Does not implicitly {@link Foo.verify|verify} messages.
     * @function encode
     * @memberof Foo
     * @static
     * @param {IFoo} m Foo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Foo.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.baz != null && Object.hasOwnProperty.call(m, "baz"))
            w.uint32(8).uint32(m.baz);
        return w;
    };

    /**
     * Decodes a Foo message from the specified reader or buffer.
     * @function decode
     * @memberof Foo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Foo} Foo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Foo.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Foo();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.baz = r.uint32();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Foo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Foo
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Foo} Foo
     */
    Foo.fromObject = function fromObject(d) {
        if (d instanceof $root.Foo)
            return d;
        var m = new $root.Foo();
        if (d.baz != null) {
            m.baz = d.baz >>> 0;
        }
        return m;
    };

    /**
     * Creates a plain object from a Foo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Foo
     * @static
     * @param {Foo} m Foo
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Foo.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.baz = 0;
        }
        if (m.baz != null && m.hasOwnProperty("baz")) {
            d.baz = m.baz;
        }
        return d;
    };

    /**
     * Converts this Foo to JSON.
     * @function toJSON
     * @memberof Foo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Foo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Foo;
})();

export const Bar = $root.Bar = (() => {

    /**
     * Properties of a Bar.
     * @exports IBar
     * @interface IBar
     * @property {IFoo|null} [tmp] Bar tmp
     */

    /**
     * Constructs a new Bar.
     * @exports Bar
     * @classdesc Represents a Bar.
     * @implements IBar
     * @constructor
     * @param {IBar=} [p] Properties to set
     */
    function Bar(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Bar tmp.
     * @member {IFoo|null|undefined} tmp
     * @memberof Bar
     * @instance
     */
    Bar.prototype.tmp = null;

    /**
     * Encodes the specified Bar message. Does not implicitly {@link Bar.verify|verify} messages.
     * @function encode
     * @memberof Bar
     * @static
     * @param {IBar} m Bar message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Bar.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.tmp != null && Object.hasOwnProperty.call(m, "tmp"))
            $root.Foo.encode(m.tmp, w.uint32(10).fork()).ldelim();
        return w;
    };

    /**
     * Decodes a Bar message from the specified reader or buffer.
     * @function decode
     * @memberof Bar
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Bar} Bar
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Bar.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Bar();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.tmp = $root.Foo.decode(r, r.uint32());
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Bar message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Bar
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Bar} Bar
     */
    Bar.fromObject = function fromObject(d) {
        if (d instanceof $root.Bar)
            return d;
        var m = new $root.Bar();
        if (d.tmp != null) {
            if (typeof d.tmp !== "object")
                throw TypeError(".Bar.tmp: object expected");
            m.tmp = $root.Foo.fromObject(d.tmp);
        }
        return m;
    };

    /**
     * Creates a plain object from a Bar message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Bar
     * @static
     * @param {Bar} m Bar
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Bar.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.tmp = null;
        }
        if (m.tmp != null && m.hasOwnProperty("tmp")) {
            d.tmp = $root.Foo.toObject(m.tmp, o);
        }
        return d;
    };

    /**
     * Converts this Bar to JSON.
     * @function toJSON
     * @memberof Bar
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Bar.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Bar;
})();

/**
 * FOO enum.
 * @exports FOO
 * @enum {number}
 * @property {number} LOL=1 LOL value
 * @property {number} ABE=3 ABE value
 */
export const FOO = $root.FOO = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "LOL"] = 1;
    values[valuesById[3] = "ABE"] = 3;
    return values;
})();

export const Yo = $root.Yo = (() => {

    /**
     * Properties of a Yo.
     * @exports IYo
     * @interface IYo
     * @property {Array.<FOO>|null} [lol] Yo lol
     */

    /**
     * Constructs a new Yo.
     * @exports Yo
     * @classdesc Represents a Yo.
     * @implements IYo
     * @constructor
     * @param {IYo=} [p] Properties to set
     */
    function Yo(p) {
        this.lol = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Yo lol.
     * @member {Array.<FOO>} lol
     * @memberof Yo
     * @instance
     */
    Yo.prototype.lol = $util.emptyArray;

    /**
     * Encodes the specified Yo message. Does not implicitly {@link Yo.verify|verify} messages.
     * @function encode
     * @memberof Yo
     * @static
     * @param {IYo} m Yo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Yo.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.lol != null && m.lol.length) {
            for (var i = 0; i < m.lol.length; ++i)
                w.uint32(8).int32(m.lol[i]);
        }
        return w;
    };

    /**
     * Decodes a Yo message from the specified reader or buffer.
     * @function decode
     * @memberof Yo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Yo} Yo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Yo.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Yo();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                if (!(m.lol && m.lol.length))
                    m.lol = [];
                if ((t & 7) === 2) {
                    var c2 = r.uint32() + r.pos;
                    while (r.pos < c2)
                        m.lol.push(r.int32());
                } else
                    m.lol.push(r.int32());
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Yo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Yo
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Yo} Yo
     */
    Yo.fromObject = function fromObject(d) {
        if (d instanceof $root.Yo)
            return d;
        var m = new $root.Yo();
        if (d.lol) {
            if (!Array.isArray(d.lol))
                throw TypeError(".Yo.lol: array expected");
            m.lol = [];
            for (var i = 0; i < d.lol.length; ++i) {
                switch (d.lol[i]) {
                default:
                case "LOL":
                case 1:
                    m.lol[i] = 1;
                    break;
                case "ABE":
                case 3:
                    m.lol[i] = 3;
                    break;
                }
            }
        }
        return m;
    };

    /**
     * Creates a plain object from a Yo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Yo
     * @static
     * @param {Yo} m Yo
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Yo.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.arrays || o.defaults) {
            d.lol = [];
        }
        if (m.lol && m.lol.length) {
            d.lol = [];
            for (var j = 0; j < m.lol.length; ++j) {
                d.lol[j] = o.enums === String ? $root.FOO[m.lol[j]] : m.lol[j];
            }
        }
        return d;
    };

    /**
     * Converts this Yo to JSON.
     * @function toJSON
     * @memberof Yo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Yo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Yo;
})();

export const Lol = $root.Lol = (() => {

    /**
     * Properties of a Lol.
     * @exports ILol
     * @interface ILol
     * @property {string|null} [lol] Lol lol
     * @property {IBar} b Lol b
     */

    /**
     * Constructs a new Lol.
     * @exports Lol
     * @classdesc Represents a Lol.
     * @implements ILol
     * @constructor
     * @param {ILol=} [p] Properties to set
     */
    function Lol(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Lol lol.
     * @member {string} lol
     * @memberof Lol
     * @instance
     */
    Lol.prototype.lol = "";

    /**
     * Lol b.
     * @member {IBar} b
     * @memberof Lol
     * @instance
     */
    Lol.prototype.b = null;

    /**
     * Encodes the specified Lol message. Does not implicitly {@link Lol.verify|verify} messages.
     * @function encode
     * @memberof Lol
     * @static
     * @param {ILol} m Lol message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Lol.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.lol != null && Object.hasOwnProperty.call(m, "lol"))
            w.uint32(10).string(m.lol);
        $root.Bar.encode(m.b, w.uint32(18).fork()).ldelim();
        return w;
    };

    /**
     * Decodes a Lol message from the specified reader or buffer.
     * @function decode
     * @memberof Lol
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Lol} Lol
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Lol.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Lol();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.lol = r.string();
                break;
            case 2:
                m.b = $root.Bar.decode(r, r.uint32());
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("b"))
            throw $util.ProtocolError("missing required 'b'", { instance: m });
        return m;
    };

    /**
     * Creates a Lol message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Lol
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Lol} Lol
     */
    Lol.fromObject = function fromObject(d) {
        if (d instanceof $root.Lol)
            return d;
        var m = new $root.Lol();
        if (d.lol != null) {
            m.lol = String(d.lol);
        }
        if (d.b != null) {
            if (typeof d.b !== "object")
                throw TypeError(".Lol.b: object expected");
            m.b = $root.Bar.fromObject(d.b);
        }
        return m;
    };

    /**
     * Creates a plain object from a Lol message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Lol
     * @static
     * @param {Lol} m Lol
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Lol.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.lol = "";
            d.b = null;
        }
        if (m.lol != null && m.hasOwnProperty("lol")) {
            d.lol = m.lol;
        }
        if (m.b != null && m.hasOwnProperty("b")) {
            d.b = $root.Bar.toObject(m.b, o);
        }
        return d;
    };

    /**
     * Converts this Lol to JSON.
     * @function toJSON
     * @memberof Lol
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Lol.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Lol;
})();

export const Test = $root.Test = (() => {

    /**
     * Properties of a Test.
     * @exports ITest
     * @interface ITest
     * @property {ILol|null} [meh] Test meh
     * @property {number|null} [hello] Test hello
     * @property {string|null} [foo] Test foo
     * @property {Uint8Array|null} [payload] Test payload
     */

    /**
     * Constructs a new Test.
     * @exports Test
     * @classdesc Represents a Test.
     * @implements ITest
     * @constructor
     * @param {ITest=} [p] Properties to set
     */
    function Test(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Test meh.
     * @member {ILol|null|undefined} meh
     * @memberof Test
     * @instance
     */
    Test.prototype.meh = null;

    /**
     * Test hello.
     * @member {number} hello
     * @memberof Test
     * @instance
     */
    Test.prototype.hello = 0;

    /**
     * Test foo.
     * @member {string} foo
     * @memberof Test
     * @instance
     */
    Test.prototype.foo = "";

    /**
     * Test payload.
     * @member {Uint8Array} payload
     * @memberof Test
     * @instance
     */
    Test.prototype.payload = $util.newBuffer([]);

    /**
     * Encodes the specified Test message. Does not implicitly {@link Test.verify|verify} messages.
     * @function encode
     * @memberof Test
     * @static
     * @param {ITest} m Test message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Test.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.foo != null && Object.hasOwnProperty.call(m, "foo"))
            w.uint32(10).string(m.foo);
        if (m.hello != null && Object.hasOwnProperty.call(m, "hello"))
            w.uint32(24).uint32(m.hello);
        if (m.meh != null && Object.hasOwnProperty.call(m, "meh"))
            $root.Lol.encode(m.meh, w.uint32(50).fork()).ldelim();
        if (m.payload != null && Object.hasOwnProperty.call(m, "payload"))
            w.uint32(58).bytes(m.payload);
        return w;
    };

    /**
     * Decodes a Test message from the specified reader or buffer.
     * @function decode
     * @memberof Test
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Test} Test
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Test.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Test();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 6:
                m.meh = $root.Lol.decode(r, r.uint32());
                break;
            case 3:
                m.hello = r.uint32();
                break;
            case 1:
                m.foo = r.string();
                break;
            case 7:
                m.payload = r.bytes();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Test message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Test
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Test} Test
     */
    Test.fromObject = function fromObject(d) {
        if (d instanceof $root.Test)
            return d;
        var m = new $root.Test();
        if (d.meh != null) {
            if (typeof d.meh !== "object")
                throw TypeError(".Test.meh: object expected");
            m.meh = $root.Lol.fromObject(d.meh);
        }
        if (d.hello != null) {
            m.hello = d.hello >>> 0;
        }
        if (d.foo != null) {
            m.foo = String(d.foo);
        }
        if (d.payload != null) {
            if (typeof d.payload === "string")
                $util.base64.decode(d.payload, m.payload = $util.newBuffer($util.base64.length(d.payload)), 0);
            else if (d.payload.length)
                m.payload = d.payload;
        }
        return m;
    };

    /**
     * Creates a plain object from a Test message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Test
     * @static
     * @param {Test} m Test
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Test.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.foo = "";
            d.hello = 0;
            d.meh = null;
            if (o.bytes === String)
                d.payload = "";
            else {
                d.payload = [];
                if (o.bytes !== Array)
                    d.payload = $util.newBuffer(d.payload);
            }
        }
        if (m.foo != null && m.hasOwnProperty("foo")) {
            d.foo = m.foo;
        }
        if (m.hello != null && m.hasOwnProperty("hello")) {
            d.hello = m.hello;
        }
        if (m.meh != null && m.hasOwnProperty("meh")) {
            d.meh = $root.Lol.toObject(m.meh, o);
        }
        if (m.payload != null && m.hasOwnProperty("payload")) {
            d.payload = o.bytes === String ? $util.base64.encode(m.payload, 0, m.payload.length) : o.bytes === Array ? Array.prototype.slice.call(m.payload) : m.payload;
        }
        return d;
    };

    /**
     * Converts this Test to JSON.
     * @function toJSON
     * @memberof Test
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Test.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Test;
})();

export { $root as default };
