/* eslint-disable */
import * as $protobuf from "protobufjs";
/** Properties of a Foo. */
export interface IFoo {

    /** Foo baz */
    baz?: (number|null);
}

/** Represents a Foo. */
export class Foo implements IFoo {

    /**
     * Constructs a new Foo.
     * @param [p] Properties to set
     */
    constructor(p?: IFoo);

    /** Foo baz. */
    public baz: number;

    /**
     * Encodes the specified Foo message. Does not implicitly {@link Foo.verify|verify} messages.
     * @param m Foo message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: IFoo, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Foo message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Foo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Foo;

    /**
     * Creates a Foo message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns Foo
     */
    public static fromObject(d: { [k: string]: any }): Foo;

    /**
     * Creates a plain object from a Foo message. Also converts values to other types if specified.
     * @param m Foo
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: Foo, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Foo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Bar. */
export interface IBar {

    /** Bar tmp */
    tmp?: (IFoo|null);
}

/** Represents a Bar. */
export class Bar implements IBar {

    /**
     * Constructs a new Bar.
     * @param [p] Properties to set
     */
    constructor(p?: IBar);

    /** Bar tmp. */
    public tmp?: (IFoo|null);

    /**
     * Encodes the specified Bar message. Does not implicitly {@link Bar.verify|verify} messages.
     * @param m Bar message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: IBar, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Bar message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Bar
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Bar;

    /**
     * Creates a Bar message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns Bar
     */
    public static fromObject(d: { [k: string]: any }): Bar;

    /**
     * Creates a plain object from a Bar message. Also converts values to other types if specified.
     * @param m Bar
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: Bar, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Bar to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** FOO enum. */
export enum FOO {
    LOL = 1,
    ABE = 3
}

/** Represents a Yo. */
export class Yo implements IYo {

    /**
     * Constructs a new Yo.
     * @param [p] Properties to set
     */
    constructor(p?: IYo);

    /** Yo lol. */
    public lol: FOO[];

    /**
     * Encodes the specified Yo message. Does not implicitly {@link Yo.verify|verify} messages.
     * @param m Yo message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: IYo, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Yo message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Yo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Yo;

    /**
     * Creates a Yo message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns Yo
     */
    public static fromObject(d: { [k: string]: any }): Yo;

    /**
     * Creates a plain object from a Yo message. Also converts values to other types if specified.
     * @param m Yo
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: Yo, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Yo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Lol. */
export class Lol implements ILol {

    /**
     * Constructs a new Lol.
     * @param [p] Properties to set
     */
    constructor(p?: ILol);

    /** Lol lol. */
    public lol: string;

    /** Lol b. */
    public b: IBar;

    /**
     * Encodes the specified Lol message. Does not implicitly {@link Lol.verify|verify} messages.
     * @param m Lol message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: ILol, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Lol message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Lol
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Lol;

    /**
     * Creates a Lol message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns Lol
     */
    public static fromObject(d: { [k: string]: any }): Lol;

    /**
     * Creates a plain object from a Lol message. Also converts values to other types if specified.
     * @param m Lol
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: Lol, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Lol to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Test. */
export class Test implements ITest {

    /**
     * Constructs a new Test.
     * @param [p] Properties to set
     */
    constructor(p?: ITest);

    /** Test meh. */
    public meh?: (ILol|null);

    /** Test hello. */
    public hello: number;

    /** Test foo. */
    public foo: string;

    /** Test payload. */
    public payload: Uint8Array;

    /**
     * Encodes the specified Test message. Does not implicitly {@link Test.verify|verify} messages.
     * @param m Test message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: ITest, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Test message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Test
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Test;

    /**
     * Creates a Test message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns Test
     */
    public static fromObject(d: { [k: string]: any }): Test;

    /**
     * Creates a plain object from a Test message. Also converts values to other types if specified.
     * @param m Test
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: Test, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Test to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
