/* eslint-disable */
import * as $protobuf from "protobufjs";
/** Properties of a RPC. */
export interface IRPC {

    /** RPC subscriptions */
    subscriptions?: (RPC.ISubOpts[]|null);

    /** RPC messages */
    messages?: (RPC.IMessage[]|null);

    /** RPC control */
    control?: (RPC.IControlMessage|null);
}

/** Represents a RPC. */
export class RPC implements IRPC {

    /**
     * Constructs a new RPC.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRPC);

    /** RPC subscriptions. */
    public subscriptions: RPC.ISubOpts[];

    /** RPC messages. */
    public messages: RPC.IMessage[];

    /** RPC control. */
    public control?: (RPC.IControlMessage|null);

    /** RPC _control. */
    public _control?: "control";

    /**
     * Creates a new RPC instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RPC instance
     */
    public static create(properties?: IRPC): RPC;

    /**
     * Encodes the specified RPC message. Does not implicitly {@link RPC.verify|verify} messages.
     * @param message RPC message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRPC, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RPC message, length delimited. Does not implicitly {@link RPC.verify|verify} messages.
     * @param message RPC message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRPC, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RPC message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC;

    /**
     * Decodes a RPC message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC;

    /**
     * Verifies a RPC message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RPC message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RPC
     */
    public static fromObject(object: { [k: string]: any }): RPC;

    /**
     * Creates a plain object from a RPC message. Also converts values to other types if specified.
     * @param message RPC
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RPC, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RPC to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RPC
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace RPC {

    /** Properties of a SubOpts. */
    interface ISubOpts {

        /** SubOpts subscribe */
        subscribe?: (boolean|null);

        /** SubOpts topic */
        topic?: (string|null);
    }

    /** Represents a SubOpts. */
    class SubOpts implements ISubOpts {

        /**
         * Constructs a new SubOpts.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.ISubOpts);

        /** SubOpts subscribe. */
        public subscribe?: (boolean|null);

        /** SubOpts topic. */
        public topic?: (string|null);

        /** SubOpts _subscribe. */
        public _subscribe?: "subscribe";

        /** SubOpts _topic. */
        public _topic?: "topic";

        /**
         * Creates a new SubOpts instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SubOpts instance
         */
        public static create(properties?: RPC.ISubOpts): RPC.SubOpts;

        /**
         * Encodes the specified SubOpts message. Does not implicitly {@link RPC.SubOpts.verify|verify} messages.
         * @param message SubOpts message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.ISubOpts, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SubOpts message, length delimited. Does not implicitly {@link RPC.SubOpts.verify|verify} messages.
         * @param message SubOpts message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.ISubOpts, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SubOpts message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SubOpts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.SubOpts;

        /**
         * Decodes a SubOpts message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SubOpts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.SubOpts;

        /**
         * Verifies a SubOpts message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SubOpts message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SubOpts
         */
        public static fromObject(object: { [k: string]: any }): RPC.SubOpts;

        /**
         * Creates a plain object from a SubOpts message. Also converts values to other types if specified.
         * @param message SubOpts
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.SubOpts, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubOpts to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SubOpts
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Message. */
    interface IMessage {

        /** Message from */
        from?: (Uint8Array|null);

        /** Message data */
        data?: (Uint8Array|null);

        /** Message seqno */
        seqno?: (Uint8Array|null);

        /** Message topic */
        topic: string;

        /** Message signature */
        signature?: (Uint8Array|null);

        /** Message key */
        key?: (Uint8Array|null);
    }

    /** Represents a Message. */
    class Message implements IMessage {

        /**
         * Constructs a new Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.IMessage);

        /** Message from. */
        public from?: (Uint8Array|null);

        /** Message data. */
        public data?: (Uint8Array|null);

        /** Message seqno. */
        public seqno?: (Uint8Array|null);

        /** Message topic. */
        public topic: string;

        /** Message signature. */
        public signature?: (Uint8Array|null);

        /** Message key. */
        public key?: (Uint8Array|null);

        /** Message _from. */
        public _from?: "from";

        /** Message _data. */
        public _data?: "data";

        /** Message _seqno. */
        public _seqno?: "seqno";

        /** Message _signature. */
        public _signature?: "signature";

        /** Message _key. */
        public _key?: "key";

        /**
         * Creates a new Message instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Message instance
         */
        public static create(properties?: RPC.IMessage): RPC.Message;

        /**
         * Encodes the specified Message message. Does not implicitly {@link RPC.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link RPC.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.Message;

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.Message;

        /**
         * Verifies a Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Message
         */
        public static fromObject(object: { [k: string]: any }): RPC.Message;

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @param message Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Message
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ControlMessage. */
    interface IControlMessage {

        /** ControlMessage ihave */
        ihave?: (RPC.IControlIHave[]|null);

        /** ControlMessage iwant */
        iwant?: (RPC.IControlIWant[]|null);

        /** ControlMessage graft */
        graft?: (RPC.IControlGraft[]|null);

        /** ControlMessage prune */
        prune?: (RPC.IControlPrune[]|null);
    }

    /** Represents a ControlMessage. */
    class ControlMessage implements IControlMessage {

        /**
         * Constructs a new ControlMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.IControlMessage);

        /** ControlMessage ihave. */
        public ihave: RPC.IControlIHave[];

        /** ControlMessage iwant. */
        public iwant: RPC.IControlIWant[];

        /** ControlMessage graft. */
        public graft: RPC.IControlGraft[];

        /** ControlMessage prune. */
        public prune: RPC.IControlPrune[];

        /**
         * Creates a new ControlMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ControlMessage instance
         */
        public static create(properties?: RPC.IControlMessage): RPC.ControlMessage;

        /**
         * Encodes the specified ControlMessage message. Does not implicitly {@link RPC.ControlMessage.verify|verify} messages.
         * @param message ControlMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.IControlMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ControlMessage message, length delimited. Does not implicitly {@link RPC.ControlMessage.verify|verify} messages.
         * @param message ControlMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.IControlMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ControlMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ControlMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.ControlMessage;

        /**
         * Decodes a ControlMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ControlMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.ControlMessage;

        /**
         * Verifies a ControlMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ControlMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ControlMessage
         */
        public static fromObject(object: { [k: string]: any }): RPC.ControlMessage;

        /**
         * Creates a plain object from a ControlMessage message. Also converts values to other types if specified.
         * @param message ControlMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.ControlMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ControlMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ControlMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ControlIHave. */
    interface IControlIHave {

        /** ControlIHave topicID */
        topicID?: (string|null);

        /** ControlIHave messageIDs */
        messageIDs?: (Uint8Array[]|null);
    }

    /** Represents a ControlIHave. */
    class ControlIHave implements IControlIHave {

        /**
         * Constructs a new ControlIHave.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.IControlIHave);

        /** ControlIHave topicID. */
        public topicID?: (string|null);

        /** ControlIHave messageIDs. */
        public messageIDs: Uint8Array[];

        /** ControlIHave _topicID. */
        public _topicID?: "topicID";

        /**
         * Creates a new ControlIHave instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ControlIHave instance
         */
        public static create(properties?: RPC.IControlIHave): RPC.ControlIHave;

        /**
         * Encodes the specified ControlIHave message. Does not implicitly {@link RPC.ControlIHave.verify|verify} messages.
         * @param message ControlIHave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.IControlIHave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ControlIHave message, length delimited. Does not implicitly {@link RPC.ControlIHave.verify|verify} messages.
         * @param message ControlIHave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.IControlIHave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ControlIHave message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ControlIHave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.ControlIHave;

        /**
         * Decodes a ControlIHave message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ControlIHave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.ControlIHave;

        /**
         * Verifies a ControlIHave message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ControlIHave message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ControlIHave
         */
        public static fromObject(object: { [k: string]: any }): RPC.ControlIHave;

        /**
         * Creates a plain object from a ControlIHave message. Also converts values to other types if specified.
         * @param message ControlIHave
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.ControlIHave, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ControlIHave to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ControlIHave
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ControlIWant. */
    interface IControlIWant {

        /** ControlIWant messageIDs */
        messageIDs?: (Uint8Array[]|null);
    }

    /** Represents a ControlIWant. */
    class ControlIWant implements IControlIWant {

        /**
         * Constructs a new ControlIWant.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.IControlIWant);

        /** ControlIWant messageIDs. */
        public messageIDs: Uint8Array[];

        /**
         * Creates a new ControlIWant instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ControlIWant instance
         */
        public static create(properties?: RPC.IControlIWant): RPC.ControlIWant;

        /**
         * Encodes the specified ControlIWant message. Does not implicitly {@link RPC.ControlIWant.verify|verify} messages.
         * @param message ControlIWant message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.IControlIWant, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ControlIWant message, length delimited. Does not implicitly {@link RPC.ControlIWant.verify|verify} messages.
         * @param message ControlIWant message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.IControlIWant, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ControlIWant message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ControlIWant
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.ControlIWant;

        /**
         * Decodes a ControlIWant message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ControlIWant
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.ControlIWant;

        /**
         * Verifies a ControlIWant message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ControlIWant message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ControlIWant
         */
        public static fromObject(object: { [k: string]: any }): RPC.ControlIWant;

        /**
         * Creates a plain object from a ControlIWant message. Also converts values to other types if specified.
         * @param message ControlIWant
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.ControlIWant, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ControlIWant to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ControlIWant
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ControlGraft. */
    interface IControlGraft {

        /** ControlGraft topicID */
        topicID?: (string|null);
    }

    /** Represents a ControlGraft. */
    class ControlGraft implements IControlGraft {

        /**
         * Constructs a new ControlGraft.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.IControlGraft);

        /** ControlGraft topicID. */
        public topicID?: (string|null);

        /** ControlGraft _topicID. */
        public _topicID?: "topicID";

        /**
         * Creates a new ControlGraft instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ControlGraft instance
         */
        public static create(properties?: RPC.IControlGraft): RPC.ControlGraft;

        /**
         * Encodes the specified ControlGraft message. Does not implicitly {@link RPC.ControlGraft.verify|verify} messages.
         * @param message ControlGraft message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.IControlGraft, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ControlGraft message, length delimited. Does not implicitly {@link RPC.ControlGraft.verify|verify} messages.
         * @param message ControlGraft message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.IControlGraft, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ControlGraft message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ControlGraft
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.ControlGraft;

        /**
         * Decodes a ControlGraft message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ControlGraft
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.ControlGraft;

        /**
         * Verifies a ControlGraft message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ControlGraft message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ControlGraft
         */
        public static fromObject(object: { [k: string]: any }): RPC.ControlGraft;

        /**
         * Creates a plain object from a ControlGraft message. Also converts values to other types if specified.
         * @param message ControlGraft
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.ControlGraft, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ControlGraft to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ControlGraft
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ControlPrune. */
    interface IControlPrune {

        /** ControlPrune topicID */
        topicID?: (string|null);

        /** ControlPrune peers */
        peers?: (RPC.IPeerInfo[]|null);

        /** ControlPrune backoff */
        backoff?: (number|Long|null);
    }

    /** Represents a ControlPrune. */
    class ControlPrune implements IControlPrune {

        /**
         * Constructs a new ControlPrune.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.IControlPrune);

        /** ControlPrune topicID. */
        public topicID?: (string|null);

        /** ControlPrune peers. */
        public peers: RPC.IPeerInfo[];

        /** ControlPrune backoff. */
        public backoff?: (number|Long|null);

        /** ControlPrune _topicID. */
        public _topicID?: "topicID";

        /** ControlPrune _backoff. */
        public _backoff?: "backoff";

        /**
         * Creates a new ControlPrune instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ControlPrune instance
         */
        public static create(properties?: RPC.IControlPrune): RPC.ControlPrune;

        /**
         * Encodes the specified ControlPrune message. Does not implicitly {@link RPC.ControlPrune.verify|verify} messages.
         * @param message ControlPrune message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.IControlPrune, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ControlPrune message, length delimited. Does not implicitly {@link RPC.ControlPrune.verify|verify} messages.
         * @param message ControlPrune message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.IControlPrune, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ControlPrune message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ControlPrune
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.ControlPrune;

        /**
         * Decodes a ControlPrune message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ControlPrune
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.ControlPrune;

        /**
         * Verifies a ControlPrune message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ControlPrune message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ControlPrune
         */
        public static fromObject(object: { [k: string]: any }): RPC.ControlPrune;

        /**
         * Creates a plain object from a ControlPrune message. Also converts values to other types if specified.
         * @param message ControlPrune
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.ControlPrune, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ControlPrune to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ControlPrune
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PeerInfo. */
    interface IPeerInfo {

        /** PeerInfo peerID */
        peerID?: (Uint8Array|null);

        /** PeerInfo signedPeerRecord */
        signedPeerRecord?: (Uint8Array|null);
    }

    /** Represents a PeerInfo. */
    class PeerInfo implements IPeerInfo {

        /**
         * Constructs a new PeerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: RPC.IPeerInfo);

        /** PeerInfo peerID. */
        public peerID?: (Uint8Array|null);

        /** PeerInfo signedPeerRecord. */
        public signedPeerRecord?: (Uint8Array|null);

        /** PeerInfo _peerID. */
        public _peerID?: "peerID";

        /** PeerInfo _signedPeerRecord. */
        public _signedPeerRecord?: "signedPeerRecord";

        /**
         * Creates a new PeerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PeerInfo instance
         */
        public static create(properties?: RPC.IPeerInfo): RPC.PeerInfo;

        /**
         * Encodes the specified PeerInfo message. Does not implicitly {@link RPC.PeerInfo.verify|verify} messages.
         * @param message PeerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: RPC.IPeerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PeerInfo message, length delimited. Does not implicitly {@link RPC.PeerInfo.verify|verify} messages.
         * @param message PeerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: RPC.IPeerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PeerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC.PeerInfo;

        /**
         * Decodes a PeerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC.PeerInfo;

        /**
         * Verifies a PeerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PeerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PeerInfo
         */
        public static fromObject(object: { [k: string]: any }): RPC.PeerInfo;

        /**
         * Creates a plain object from a PeerInfo message. Also converts values to other types if specified.
         * @param message PeerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RPC.PeerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PeerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PeerInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
