// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "bench.proto" (syntax proto3)
// tslint:disable
/* eslint-disable */
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message Foo
 */
export interface Foo {
    /**
     * @generated from protobuf field: optional uint32 baz = 1;
     */
    baz?: number;
}
/**
 * @generated from protobuf message Bar
 */
export interface Bar {
    /**
     * @generated from protobuf field: optional Foo tmp = 1;
     */
    tmp?: Foo;
}
/**
 * @generated from protobuf message Yo
 */
export interface Yo {
    /**
     * @generated from protobuf field: repeated FOO lol = 1;
     */
    lol: FOO[];
}
/**
 * @generated from protobuf message Lol
 */
export interface Lol {
    /**
     * @generated from protobuf field: optional string lol = 1;
     */
    lol?: string;
    /**
     * @generated from protobuf field: Bar b = 2;
     */
    b?: Bar;
}
/**
 * @generated from protobuf message Test
 */
export interface Test {
    /**
     * @generated from protobuf field: optional Lol meh = 6;
     */
    meh?: Lol;
    /**
     * @generated from protobuf field: optional uint32 hello = 3;
     */
    hello?: number;
    /**
     * @generated from protobuf field: optional string foo = 1;
     */
    foo?: string;
    /**
     * @generated from protobuf field: optional bytes payload = 7;
     */
    payload?: Uint8Array;
}
/**
 * @generated from protobuf enum FOO
 */
export enum FOO {
    /**
     * @generated from protobuf enum value: NONE = 0;
     */
    NONE = 0,
    /**
     * @generated from protobuf enum value: LOL = 1;
     */
    LOL = 1,
    /**
     * @generated from protobuf enum value: ABE = 3;
     */
    ABE = 3
}
// @generated message type with reflection information, may provide speed optimized methods
class Foo$Type extends MessageType<Foo> {
    constructor() {
        super("Foo", [
            { no: 1, name: "baz", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<Foo>): Foo {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Foo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Foo): Foo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional uint32 baz */ 1:
                    message.baz = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Foo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional uint32 baz = 1; */
        if (message.baz !== undefined)
            writer.tag(1, WireType.Varint).uint32(message.baz);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Foo
 */
export const Foo = new Foo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Bar$Type extends MessageType<Bar> {
    constructor() {
        super("Bar", [
            { no: 1, name: "tmp", kind: "message", T: () => Foo }
        ]);
    }
    create(value?: PartialMessage<Bar>): Bar {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Bar>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Bar): Bar {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional Foo tmp */ 1:
                    message.tmp = Foo.internalBinaryRead(reader, reader.uint32(), options, message.tmp);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Bar, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional Foo tmp = 1; */
        if (message.tmp)
            Foo.internalBinaryWrite(message.tmp, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Bar
 */
export const Bar = new Bar$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Yo$Type extends MessageType<Yo> {
    constructor() {
        super("Yo", [
            { no: 1, name: "lol", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["FOO", FOO] }
        ]);
    }
    create(value?: PartialMessage<Yo>): Yo {
        const message = { lol: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Yo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Yo): Yo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated FOO lol */ 1:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.lol.push(reader.int32());
                    else
                        message.lol.push(reader.int32());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Yo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated FOO lol = 1; */
        if (message.lol.length) {
            writer.tag(1, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.lol.length; i++)
                writer.int32(message.lol[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Yo
 */
export const Yo = new Yo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Lol$Type extends MessageType<Lol> {
    constructor() {
        super("Lol", [
            { no: 1, name: "lol", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "b", kind: "message", T: () => Bar }
        ]);
    }
    create(value?: PartialMessage<Lol>): Lol {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Lol>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Lol): Lol {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string lol */ 1:
                    message.lol = reader.string();
                    break;
                case /* Bar b */ 2:
                    message.b = Bar.internalBinaryRead(reader, reader.uint32(), options, message.b);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Lol, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string lol = 1; */
        if (message.lol !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.lol);
        /* Bar b = 2; */
        if (message.b)
            Bar.internalBinaryWrite(message.b, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Lol
 */
export const Lol = new Lol$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Test$Type extends MessageType<Test> {
    constructor() {
        super("Test", [
            { no: 6, name: "meh", kind: "message", T: () => Lol },
            { no: 3, name: "hello", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ },
            { no: 1, name: "foo", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "payload", kind: "scalar", opt: true, T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<Test>): Test {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Test>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Test): Test {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional Lol meh */ 6:
                    message.meh = Lol.internalBinaryRead(reader, reader.uint32(), options, message.meh);
                    break;
                case /* optional uint32 hello */ 3:
                    message.hello = reader.uint32();
                    break;
                case /* optional string foo */ 1:
                    message.foo = reader.string();
                    break;
                case /* optional bytes payload */ 7:
                    message.payload = reader.bytes();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Test, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional Lol meh = 6; */
        if (message.meh)
            Lol.internalBinaryWrite(message.meh, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* optional uint32 hello = 3; */
        if (message.hello !== undefined)
            writer.tag(3, WireType.Varint).uint32(message.hello);
        /* optional string foo = 1; */
        if (message.foo !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.foo);
        /* optional bytes payload = 7; */
        if (message.payload !== undefined)
            writer.tag(7, WireType.LengthDelimited).bytes(message.payload);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Test
 */
export const Test = new Test$Type();
