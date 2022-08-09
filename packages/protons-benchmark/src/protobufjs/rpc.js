/*eslint-disable*/
// @ts-nocheck

import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const RPC = $root.RPC = (() => {

    /**
     * Properties of a RPC.
     * @exports IRPC
     * @interface IRPC
     * @property {Array.<RPC.ISubOpts>|null} [subscriptions] RPC subscriptions
     * @property {Array.<RPC.IMessage>|null} [messages] RPC messages
     * @property {RPC.IControlMessage|null} [control] RPC control
     */

    /**
     * Constructs a new RPC.
     * @exports RPC
     * @classdesc Represents a RPC.
     * @implements IRPC
     * @constructor
     * @param {IRPC=} [properties] Properties to set
     */
    function RPC(properties) {
        this.subscriptions = [];
        this.messages = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RPC subscriptions.
     * @member {Array.<RPC.ISubOpts>} subscriptions
     * @memberof RPC
     * @instance
     */
    RPC.prototype.subscriptions = $util.emptyArray;

    /**
     * RPC messages.
     * @member {Array.<RPC.IMessage>} messages
     * @memberof RPC
     * @instance
     */
    RPC.prototype.messages = $util.emptyArray;

    /**
     * RPC control.
     * @member {RPC.IControlMessage|null|undefined} control
     * @memberof RPC
     * @instance
     */
    RPC.prototype.control = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * RPC _control.
     * @member {"control"|undefined} _control
     * @memberof RPC
     * @instance
     */
    Object.defineProperty(RPC.prototype, "_control", {
        get: $util.oneOfGetter($oneOfFields = ["control"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new RPC instance using the specified properties.
     * @function create
     * @memberof RPC
     * @static
     * @param {IRPC=} [properties] Properties to set
     * @returns {RPC} RPC instance
     */
    RPC.create = function create(properties) {
        return new RPC(properties);
    };

    /**
     * Encodes the specified RPC message. Does not implicitly {@link RPC.verify|verify} messages.
     * @function encode
     * @memberof RPC
     * @static
     * @param {IRPC} message RPC message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RPC.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.subscriptions != null && message.subscriptions.length)
            for (let i = 0; i < message.subscriptions.length; ++i)
                $root.RPC.SubOpts.encode(message.subscriptions[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.messages != null && message.messages.length)
            for (let i = 0; i < message.messages.length; ++i)
                $root.RPC.Message.encode(message.messages[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.control != null && Object.hasOwnProperty.call(message, "control"))
            $root.RPC.ControlMessage.encode(message.control, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RPC message, length delimited. Does not implicitly {@link RPC.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RPC
     * @static
     * @param {IRPC} message RPC message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RPC.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RPC message from the specified reader or buffer.
     * @function decode
     * @memberof RPC
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RPC} RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RPC.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.subscriptions && message.subscriptions.length))
                        message.subscriptions = [];
                    message.subscriptions.push($root.RPC.SubOpts.decode(reader, reader.uint32()));
                    break;
                }
            case 2: {
                    if (!(message.messages && message.messages.length))
                        message.messages = [];
                    message.messages.push($root.RPC.Message.decode(reader, reader.uint32()));
                    break;
                }
            case 3: {
                    message.control = $root.RPC.ControlMessage.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RPC message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RPC
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RPC} RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RPC.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RPC message.
     * @function verify
     * @memberof RPC
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RPC.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.subscriptions != null && message.hasOwnProperty("subscriptions")) {
            if (!Array.isArray(message.subscriptions))
                return "subscriptions: array expected";
            for (let i = 0; i < message.subscriptions.length; ++i) {
                let error = $root.RPC.SubOpts.verify(message.subscriptions[i]);
                if (error)
                    return "subscriptions." + error;
            }
        }
        if (message.messages != null && message.hasOwnProperty("messages")) {
            if (!Array.isArray(message.messages))
                return "messages: array expected";
            for (let i = 0; i < message.messages.length; ++i) {
                let error = $root.RPC.Message.verify(message.messages[i]);
                if (error)
                    return "messages." + error;
            }
        }
        if (message.control != null && message.hasOwnProperty("control")) {
            properties._control = 1;
            {
                let error = $root.RPC.ControlMessage.verify(message.control);
                if (error)
                    return "control." + error;
            }
        }
        return null;
    };

    /**
     * Creates a RPC message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RPC
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RPC} RPC
     */
    RPC.fromObject = function fromObject(object) {
        if (object instanceof $root.RPC)
            return object;
        let message = new $root.RPC();
        if (object.subscriptions) {
            if (!Array.isArray(object.subscriptions))
                throw TypeError(".RPC.subscriptions: array expected");
            message.subscriptions = [];
            for (let i = 0; i < object.subscriptions.length; ++i) {
                if (typeof object.subscriptions[i] !== "object")
                    throw TypeError(".RPC.subscriptions: object expected");
                message.subscriptions[i] = $root.RPC.SubOpts.fromObject(object.subscriptions[i]);
            }
        }
        if (object.messages) {
            if (!Array.isArray(object.messages))
                throw TypeError(".RPC.messages: array expected");
            message.messages = [];
            for (let i = 0; i < object.messages.length; ++i) {
                if (typeof object.messages[i] !== "object")
                    throw TypeError(".RPC.messages: object expected");
                message.messages[i] = $root.RPC.Message.fromObject(object.messages[i]);
            }
        }
        if (object.control != null) {
            if (typeof object.control !== "object")
                throw TypeError(".RPC.control: object expected");
            message.control = $root.RPC.ControlMessage.fromObject(object.control);
        }
        return message;
    };

    /**
     * Creates a plain object from a RPC message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RPC
     * @static
     * @param {RPC} message RPC
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RPC.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults) {
            object.subscriptions = [];
            object.messages = [];
        }
        if (message.subscriptions && message.subscriptions.length) {
            object.subscriptions = [];
            for (let j = 0; j < message.subscriptions.length; ++j)
                object.subscriptions[j] = $root.RPC.SubOpts.toObject(message.subscriptions[j], options);
        }
        if (message.messages && message.messages.length) {
            object.messages = [];
            for (let j = 0; j < message.messages.length; ++j)
                object.messages[j] = $root.RPC.Message.toObject(message.messages[j], options);
        }
        if (message.control != null && message.hasOwnProperty("control")) {
            object.control = $root.RPC.ControlMessage.toObject(message.control, options);
            if (options.oneofs)
                object._control = "control";
        }
        return object;
    };

    /**
     * Converts this RPC to JSON.
     * @function toJSON
     * @memberof RPC
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RPC.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RPC
     * @function getTypeUrl
     * @memberof RPC
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RPC.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RPC";
    };

    RPC.SubOpts = (function() {

        /**
         * Properties of a SubOpts.
         * @memberof RPC
         * @interface ISubOpts
         * @property {boolean|null} [subscribe] SubOpts subscribe
         * @property {string|null} [topic] SubOpts topic
         */

        /**
         * Constructs a new SubOpts.
         * @memberof RPC
         * @classdesc Represents a SubOpts.
         * @implements ISubOpts
         * @constructor
         * @param {RPC.ISubOpts=} [properties] Properties to set
         */
        function SubOpts(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubOpts subscribe.
         * @member {boolean|null|undefined} subscribe
         * @memberof RPC.SubOpts
         * @instance
         */
        SubOpts.prototype.subscribe = null;

        /**
         * SubOpts topic.
         * @member {string|null|undefined} topic
         * @memberof RPC.SubOpts
         * @instance
         */
        SubOpts.prototype.topic = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * SubOpts _subscribe.
         * @member {"subscribe"|undefined} _subscribe
         * @memberof RPC.SubOpts
         * @instance
         */
        Object.defineProperty(SubOpts.prototype, "_subscribe", {
            get: $util.oneOfGetter($oneOfFields = ["subscribe"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * SubOpts _topic.
         * @member {"topic"|undefined} _topic
         * @memberof RPC.SubOpts
         * @instance
         */
        Object.defineProperty(SubOpts.prototype, "_topic", {
            get: $util.oneOfGetter($oneOfFields = ["topic"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SubOpts instance using the specified properties.
         * @function create
         * @memberof RPC.SubOpts
         * @static
         * @param {RPC.ISubOpts=} [properties] Properties to set
         * @returns {RPC.SubOpts} SubOpts instance
         */
        SubOpts.create = function create(properties) {
            return new SubOpts(properties);
        };

        /**
         * Encodes the specified SubOpts message. Does not implicitly {@link RPC.SubOpts.verify|verify} messages.
         * @function encode
         * @memberof RPC.SubOpts
         * @static
         * @param {RPC.ISubOpts} message SubOpts message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubOpts.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.subscribe != null && Object.hasOwnProperty.call(message, "subscribe"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.subscribe);
            if (message.topic != null && Object.hasOwnProperty.call(message, "topic"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.topic);
            return writer;
        };

        /**
         * Encodes the specified SubOpts message, length delimited. Does not implicitly {@link RPC.SubOpts.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.SubOpts
         * @static
         * @param {RPC.ISubOpts} message SubOpts message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubOpts.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SubOpts message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.SubOpts
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.SubOpts} SubOpts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubOpts.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.SubOpts();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.subscribe = reader.bool();
                        break;
                    }
                case 2: {
                        message.topic = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SubOpts message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.SubOpts
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.SubOpts} SubOpts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubOpts.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SubOpts message.
         * @function verify
         * @memberof RPC.SubOpts
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SubOpts.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.subscribe != null && message.hasOwnProperty("subscribe")) {
                properties._subscribe = 1;
                if (typeof message.subscribe !== "boolean")
                    return "subscribe: boolean expected";
            }
            if (message.topic != null && message.hasOwnProperty("topic")) {
                properties._topic = 1;
                if (!$util.isString(message.topic))
                    return "topic: string expected";
            }
            return null;
        };

        /**
         * Creates a SubOpts message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.SubOpts
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.SubOpts} SubOpts
         */
        SubOpts.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.SubOpts)
                return object;
            let message = new $root.RPC.SubOpts();
            if (object.subscribe != null)
                message.subscribe = Boolean(object.subscribe);
            if (object.topic != null)
                message.topic = String(object.topic);
            return message;
        };

        /**
         * Creates a plain object from a SubOpts message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.SubOpts
         * @static
         * @param {RPC.SubOpts} message SubOpts
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubOpts.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.subscribe != null && message.hasOwnProperty("subscribe")) {
                object.subscribe = message.subscribe;
                if (options.oneofs)
                    object._subscribe = "subscribe";
            }
            if (message.topic != null && message.hasOwnProperty("topic")) {
                object.topic = message.topic;
                if (options.oneofs)
                    object._topic = "topic";
            }
            return object;
        };

        /**
         * Converts this SubOpts to JSON.
         * @function toJSON
         * @memberof RPC.SubOpts
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubOpts.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubOpts
         * @function getTypeUrl
         * @memberof RPC.SubOpts
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubOpts.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.SubOpts";
        };

        return SubOpts;
    })();

    RPC.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof RPC
         * @interface IMessage
         * @property {Uint8Array|null} [from] Message from
         * @property {Uint8Array|null} [data] Message data
         * @property {Uint8Array|null} [seqno] Message seqno
         * @property {string} topic Message topic
         * @property {Uint8Array|null} [signature] Message signature
         * @property {Uint8Array|null} [key] Message key
         */

        /**
         * Constructs a new Message.
         * @memberof RPC
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {RPC.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message from.
         * @member {Uint8Array|null|undefined} from
         * @memberof RPC.Message
         * @instance
         */
        Message.prototype.from = null;

        /**
         * Message data.
         * @member {Uint8Array|null|undefined} data
         * @memberof RPC.Message
         * @instance
         */
        Message.prototype.data = null;

        /**
         * Message seqno.
         * @member {Uint8Array|null|undefined} seqno
         * @memberof RPC.Message
         * @instance
         */
        Message.prototype.seqno = null;

        /**
         * Message topic.
         * @member {string} topic
         * @memberof RPC.Message
         * @instance
         */
        Message.prototype.topic = "";

        /**
         * Message signature.
         * @member {Uint8Array|null|undefined} signature
         * @memberof RPC.Message
         * @instance
         */
        Message.prototype.signature = null;

        /**
         * Message key.
         * @member {Uint8Array|null|undefined} key
         * @memberof RPC.Message
         * @instance
         */
        Message.prototype.key = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Message _from.
         * @member {"from"|undefined} _from
         * @memberof RPC.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "_from", {
            get: $util.oneOfGetter($oneOfFields = ["from"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Message _data.
         * @member {"data"|undefined} _data
         * @memberof RPC.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "_data", {
            get: $util.oneOfGetter($oneOfFields = ["data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Message _seqno.
         * @member {"seqno"|undefined} _seqno
         * @memberof RPC.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "_seqno", {
            get: $util.oneOfGetter($oneOfFields = ["seqno"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Message _signature.
         * @member {"signature"|undefined} _signature
         * @memberof RPC.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "_signature", {
            get: $util.oneOfGetter($oneOfFields = ["signature"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Message _key.
         * @member {"key"|undefined} _key
         * @memberof RPC.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "_key", {
            get: $util.oneOfGetter($oneOfFields = ["key"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof RPC.Message
         * @static
         * @param {RPC.IMessage=} [properties] Properties to set
         * @returns {RPC.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link RPC.Message.verify|verify} messages.
         * @function encode
         * @memberof RPC.Message
         * @static
         * @param {RPC.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.from);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.seqno != null && Object.hasOwnProperty.call(message, "seqno"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.seqno);
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.topic);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.signature);
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.key);
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link RPC.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.Message
         * @static
         * @param {RPC.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.Message();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.from = reader.bytes();
                        break;
                    }
                case 2: {
                        message.data = reader.bytes();
                        break;
                    }
                case 3: {
                        message.seqno = reader.bytes();
                        break;
                    }
                case 4: {
                        message.topic = reader.string();
                        break;
                    }
                case 5: {
                        message.signature = reader.bytes();
                        break;
                    }
                case 6: {
                        message.key = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("topic"))
                throw $util.ProtocolError("missing required 'topic'", { instance: message });
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof RPC.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.from != null && message.hasOwnProperty("from")) {
                properties._from = 1;
                if (!(message.from && typeof message.from.length === "number" || $util.isString(message.from)))
                    return "from: buffer expected";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                properties._data = 1;
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            }
            if (message.seqno != null && message.hasOwnProperty("seqno")) {
                properties._seqno = 1;
                if (!(message.seqno && typeof message.seqno.length === "number" || $util.isString(message.seqno)))
                    return "seqno: buffer expected";
            }
            if (!$util.isString(message.topic))
                return "topic: string expected";
            if (message.signature != null && message.hasOwnProperty("signature")) {
                properties._signature = 1;
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            }
            if (message.key != null && message.hasOwnProperty("key")) {
                properties._key = 1;
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            }
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.Message)
                return object;
            let message = new $root.RPC.Message();
            if (object.from != null)
                if (typeof object.from === "string")
                    $util.base64.decode(object.from, message.from = $util.newBuffer($util.base64.length(object.from)), 0);
                else if (object.from.length >= 0)
                    message.from = object.from;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.seqno != null)
                if (typeof object.seqno === "string")
                    $util.base64.decode(object.seqno, message.seqno = $util.newBuffer($util.base64.length(object.seqno)), 0);
                else if (object.seqno.length >= 0)
                    message.seqno = object.seqno;
            if (object.topic != null)
                message.topic = String(object.topic);
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length >= 0)
                    message.signature = object.signature;
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.Message
         * @static
         * @param {RPC.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.topic = "";
            if (message.from != null && message.hasOwnProperty("from")) {
                object.from = options.bytes === String ? $util.base64.encode(message.from, 0, message.from.length) : options.bytes === Array ? Array.prototype.slice.call(message.from) : message.from;
                if (options.oneofs)
                    object._from = "from";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                if (options.oneofs)
                    object._data = "data";
            }
            if (message.seqno != null && message.hasOwnProperty("seqno")) {
                object.seqno = options.bytes === String ? $util.base64.encode(message.seqno, 0, message.seqno.length) : options.bytes === Array ? Array.prototype.slice.call(message.seqno) : message.seqno;
                if (options.oneofs)
                    object._seqno = "seqno";
            }
            if (message.topic != null && message.hasOwnProperty("topic"))
                object.topic = message.topic;
            if (message.signature != null && message.hasOwnProperty("signature")) {
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                if (options.oneofs)
                    object._signature = "signature";
            }
            if (message.key != null && message.hasOwnProperty("key")) {
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
                if (options.oneofs)
                    object._key = "key";
            }
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof RPC.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Message
         * @function getTypeUrl
         * @memberof RPC.Message
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.Message";
        };

        return Message;
    })();

    RPC.ControlMessage = (function() {

        /**
         * Properties of a ControlMessage.
         * @memberof RPC
         * @interface IControlMessage
         * @property {Array.<RPC.IControlIHave>|null} [ihave] ControlMessage ihave
         * @property {Array.<RPC.IControlIWant>|null} [iwant] ControlMessage iwant
         * @property {Array.<RPC.IControlGraft>|null} [graft] ControlMessage graft
         * @property {Array.<RPC.IControlPrune>|null} [prune] ControlMessage prune
         */

        /**
         * Constructs a new ControlMessage.
         * @memberof RPC
         * @classdesc Represents a ControlMessage.
         * @implements IControlMessage
         * @constructor
         * @param {RPC.IControlMessage=} [properties] Properties to set
         */
        function ControlMessage(properties) {
            this.ihave = [];
            this.iwant = [];
            this.graft = [];
            this.prune = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ControlMessage ihave.
         * @member {Array.<RPC.IControlIHave>} ihave
         * @memberof RPC.ControlMessage
         * @instance
         */
        ControlMessage.prototype.ihave = $util.emptyArray;

        /**
         * ControlMessage iwant.
         * @member {Array.<RPC.IControlIWant>} iwant
         * @memberof RPC.ControlMessage
         * @instance
         */
        ControlMessage.prototype.iwant = $util.emptyArray;

        /**
         * ControlMessage graft.
         * @member {Array.<RPC.IControlGraft>} graft
         * @memberof RPC.ControlMessage
         * @instance
         */
        ControlMessage.prototype.graft = $util.emptyArray;

        /**
         * ControlMessage prune.
         * @member {Array.<RPC.IControlPrune>} prune
         * @memberof RPC.ControlMessage
         * @instance
         */
        ControlMessage.prototype.prune = $util.emptyArray;

        /**
         * Creates a new ControlMessage instance using the specified properties.
         * @function create
         * @memberof RPC.ControlMessage
         * @static
         * @param {RPC.IControlMessage=} [properties] Properties to set
         * @returns {RPC.ControlMessage} ControlMessage instance
         */
        ControlMessage.create = function create(properties) {
            return new ControlMessage(properties);
        };

        /**
         * Encodes the specified ControlMessage message. Does not implicitly {@link RPC.ControlMessage.verify|verify} messages.
         * @function encode
         * @memberof RPC.ControlMessage
         * @static
         * @param {RPC.IControlMessage} message ControlMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ihave != null && message.ihave.length)
                for (let i = 0; i < message.ihave.length; ++i)
                    $root.RPC.ControlIHave.encode(message.ihave[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.iwant != null && message.iwant.length)
                for (let i = 0; i < message.iwant.length; ++i)
                    $root.RPC.ControlIWant.encode(message.iwant[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.graft != null && message.graft.length)
                for (let i = 0; i < message.graft.length; ++i)
                    $root.RPC.ControlGraft.encode(message.graft[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.prune != null && message.prune.length)
                for (let i = 0; i < message.prune.length; ++i)
                    $root.RPC.ControlPrune.encode(message.prune[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ControlMessage message, length delimited. Does not implicitly {@link RPC.ControlMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.ControlMessage
         * @static
         * @param {RPC.IControlMessage} message ControlMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ControlMessage message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.ControlMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.ControlMessage} ControlMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.ControlMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.ihave && message.ihave.length))
                            message.ihave = [];
                        message.ihave.push($root.RPC.ControlIHave.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        if (!(message.iwant && message.iwant.length))
                            message.iwant = [];
                        message.iwant.push($root.RPC.ControlIWant.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        if (!(message.graft && message.graft.length))
                            message.graft = [];
                        message.graft.push($root.RPC.ControlGraft.decode(reader, reader.uint32()));
                        break;
                    }
                case 4: {
                        if (!(message.prune && message.prune.length))
                            message.prune = [];
                        message.prune.push($root.RPC.ControlPrune.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ControlMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.ControlMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.ControlMessage} ControlMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ControlMessage message.
         * @function verify
         * @memberof RPC.ControlMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ControlMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ihave != null && message.hasOwnProperty("ihave")) {
                if (!Array.isArray(message.ihave))
                    return "ihave: array expected";
                for (let i = 0; i < message.ihave.length; ++i) {
                    let error = $root.RPC.ControlIHave.verify(message.ihave[i]);
                    if (error)
                        return "ihave." + error;
                }
            }
            if (message.iwant != null && message.hasOwnProperty("iwant")) {
                if (!Array.isArray(message.iwant))
                    return "iwant: array expected";
                for (let i = 0; i < message.iwant.length; ++i) {
                    let error = $root.RPC.ControlIWant.verify(message.iwant[i]);
                    if (error)
                        return "iwant." + error;
                }
            }
            if (message.graft != null && message.hasOwnProperty("graft")) {
                if (!Array.isArray(message.graft))
                    return "graft: array expected";
                for (let i = 0; i < message.graft.length; ++i) {
                    let error = $root.RPC.ControlGraft.verify(message.graft[i]);
                    if (error)
                        return "graft." + error;
                }
            }
            if (message.prune != null && message.hasOwnProperty("prune")) {
                if (!Array.isArray(message.prune))
                    return "prune: array expected";
                for (let i = 0; i < message.prune.length; ++i) {
                    let error = $root.RPC.ControlPrune.verify(message.prune[i]);
                    if (error)
                        return "prune." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ControlMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.ControlMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.ControlMessage} ControlMessage
         */
        ControlMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.ControlMessage)
                return object;
            let message = new $root.RPC.ControlMessage();
            if (object.ihave) {
                if (!Array.isArray(object.ihave))
                    throw TypeError(".RPC.ControlMessage.ihave: array expected");
                message.ihave = [];
                for (let i = 0; i < object.ihave.length; ++i) {
                    if (typeof object.ihave[i] !== "object")
                        throw TypeError(".RPC.ControlMessage.ihave: object expected");
                    message.ihave[i] = $root.RPC.ControlIHave.fromObject(object.ihave[i]);
                }
            }
            if (object.iwant) {
                if (!Array.isArray(object.iwant))
                    throw TypeError(".RPC.ControlMessage.iwant: array expected");
                message.iwant = [];
                for (let i = 0; i < object.iwant.length; ++i) {
                    if (typeof object.iwant[i] !== "object")
                        throw TypeError(".RPC.ControlMessage.iwant: object expected");
                    message.iwant[i] = $root.RPC.ControlIWant.fromObject(object.iwant[i]);
                }
            }
            if (object.graft) {
                if (!Array.isArray(object.graft))
                    throw TypeError(".RPC.ControlMessage.graft: array expected");
                message.graft = [];
                for (let i = 0; i < object.graft.length; ++i) {
                    if (typeof object.graft[i] !== "object")
                        throw TypeError(".RPC.ControlMessage.graft: object expected");
                    message.graft[i] = $root.RPC.ControlGraft.fromObject(object.graft[i]);
                }
            }
            if (object.prune) {
                if (!Array.isArray(object.prune))
                    throw TypeError(".RPC.ControlMessage.prune: array expected");
                message.prune = [];
                for (let i = 0; i < object.prune.length; ++i) {
                    if (typeof object.prune[i] !== "object")
                        throw TypeError(".RPC.ControlMessage.prune: object expected");
                    message.prune[i] = $root.RPC.ControlPrune.fromObject(object.prune[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ControlMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.ControlMessage
         * @static
         * @param {RPC.ControlMessage} message ControlMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ControlMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.ihave = [];
                object.iwant = [];
                object.graft = [];
                object.prune = [];
            }
            if (message.ihave && message.ihave.length) {
                object.ihave = [];
                for (let j = 0; j < message.ihave.length; ++j)
                    object.ihave[j] = $root.RPC.ControlIHave.toObject(message.ihave[j], options);
            }
            if (message.iwant && message.iwant.length) {
                object.iwant = [];
                for (let j = 0; j < message.iwant.length; ++j)
                    object.iwant[j] = $root.RPC.ControlIWant.toObject(message.iwant[j], options);
            }
            if (message.graft && message.graft.length) {
                object.graft = [];
                for (let j = 0; j < message.graft.length; ++j)
                    object.graft[j] = $root.RPC.ControlGraft.toObject(message.graft[j], options);
            }
            if (message.prune && message.prune.length) {
                object.prune = [];
                for (let j = 0; j < message.prune.length; ++j)
                    object.prune[j] = $root.RPC.ControlPrune.toObject(message.prune[j], options);
            }
            return object;
        };

        /**
         * Converts this ControlMessage to JSON.
         * @function toJSON
         * @memberof RPC.ControlMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ControlMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ControlMessage
         * @function getTypeUrl
         * @memberof RPC.ControlMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ControlMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.ControlMessage";
        };

        return ControlMessage;
    })();

    RPC.ControlIHave = (function() {

        /**
         * Properties of a ControlIHave.
         * @memberof RPC
         * @interface IControlIHave
         * @property {string|null} [topicID] ControlIHave topicID
         * @property {Array.<Uint8Array>|null} [messageIDs] ControlIHave messageIDs
         */

        /**
         * Constructs a new ControlIHave.
         * @memberof RPC
         * @classdesc Represents a ControlIHave.
         * @implements IControlIHave
         * @constructor
         * @param {RPC.IControlIHave=} [properties] Properties to set
         */
        function ControlIHave(properties) {
            this.messageIDs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ControlIHave topicID.
         * @member {string|null|undefined} topicID
         * @memberof RPC.ControlIHave
         * @instance
         */
        ControlIHave.prototype.topicID = null;

        /**
         * ControlIHave messageIDs.
         * @member {Array.<Uint8Array>} messageIDs
         * @memberof RPC.ControlIHave
         * @instance
         */
        ControlIHave.prototype.messageIDs = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ControlIHave _topicID.
         * @member {"topicID"|undefined} _topicID
         * @memberof RPC.ControlIHave
         * @instance
         */
        Object.defineProperty(ControlIHave.prototype, "_topicID", {
            get: $util.oneOfGetter($oneOfFields = ["topicID"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ControlIHave instance using the specified properties.
         * @function create
         * @memberof RPC.ControlIHave
         * @static
         * @param {RPC.IControlIHave=} [properties] Properties to set
         * @returns {RPC.ControlIHave} ControlIHave instance
         */
        ControlIHave.create = function create(properties) {
            return new ControlIHave(properties);
        };

        /**
         * Encodes the specified ControlIHave message. Does not implicitly {@link RPC.ControlIHave.verify|verify} messages.
         * @function encode
         * @memberof RPC.ControlIHave
         * @static
         * @param {RPC.IControlIHave} message ControlIHave message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlIHave.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.topicID != null && Object.hasOwnProperty.call(message, "topicID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.topicID);
            if (message.messageIDs != null && message.messageIDs.length)
                for (let i = 0; i < message.messageIDs.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.messageIDs[i]);
            return writer;
        };

        /**
         * Encodes the specified ControlIHave message, length delimited. Does not implicitly {@link RPC.ControlIHave.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.ControlIHave
         * @static
         * @param {RPC.IControlIHave} message ControlIHave message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlIHave.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ControlIHave message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.ControlIHave
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.ControlIHave} ControlIHave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlIHave.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.ControlIHave();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.topicID = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.messageIDs && message.messageIDs.length))
                            message.messageIDs = [];
                        message.messageIDs.push(reader.bytes());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ControlIHave message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.ControlIHave
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.ControlIHave} ControlIHave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlIHave.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ControlIHave message.
         * @function verify
         * @memberof RPC.ControlIHave
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ControlIHave.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.topicID != null && message.hasOwnProperty("topicID")) {
                properties._topicID = 1;
                if (!$util.isString(message.topicID))
                    return "topicID: string expected";
            }
            if (message.messageIDs != null && message.hasOwnProperty("messageIDs")) {
                if (!Array.isArray(message.messageIDs))
                    return "messageIDs: array expected";
                for (let i = 0; i < message.messageIDs.length; ++i)
                    if (!(message.messageIDs[i] && typeof message.messageIDs[i].length === "number" || $util.isString(message.messageIDs[i])))
                        return "messageIDs: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a ControlIHave message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.ControlIHave
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.ControlIHave} ControlIHave
         */
        ControlIHave.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.ControlIHave)
                return object;
            let message = new $root.RPC.ControlIHave();
            if (object.topicID != null)
                message.topicID = String(object.topicID);
            if (object.messageIDs) {
                if (!Array.isArray(object.messageIDs))
                    throw TypeError(".RPC.ControlIHave.messageIDs: array expected");
                message.messageIDs = [];
                for (let i = 0; i < object.messageIDs.length; ++i)
                    if (typeof object.messageIDs[i] === "string")
                        $util.base64.decode(object.messageIDs[i], message.messageIDs[i] = $util.newBuffer($util.base64.length(object.messageIDs[i])), 0);
                    else if (object.messageIDs[i].length >= 0)
                        message.messageIDs[i] = object.messageIDs[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a ControlIHave message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.ControlIHave
         * @static
         * @param {RPC.ControlIHave} message ControlIHave
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ControlIHave.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.messageIDs = [];
            if (message.topicID != null && message.hasOwnProperty("topicID")) {
                object.topicID = message.topicID;
                if (options.oneofs)
                    object._topicID = "topicID";
            }
            if (message.messageIDs && message.messageIDs.length) {
                object.messageIDs = [];
                for (let j = 0; j < message.messageIDs.length; ++j)
                    object.messageIDs[j] = options.bytes === String ? $util.base64.encode(message.messageIDs[j], 0, message.messageIDs[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.messageIDs[j]) : message.messageIDs[j];
            }
            return object;
        };

        /**
         * Converts this ControlIHave to JSON.
         * @function toJSON
         * @memberof RPC.ControlIHave
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ControlIHave.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ControlIHave
         * @function getTypeUrl
         * @memberof RPC.ControlIHave
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ControlIHave.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.ControlIHave";
        };

        return ControlIHave;
    })();

    RPC.ControlIWant = (function() {

        /**
         * Properties of a ControlIWant.
         * @memberof RPC
         * @interface IControlIWant
         * @property {Array.<Uint8Array>|null} [messageIDs] ControlIWant messageIDs
         */

        /**
         * Constructs a new ControlIWant.
         * @memberof RPC
         * @classdesc Represents a ControlIWant.
         * @implements IControlIWant
         * @constructor
         * @param {RPC.IControlIWant=} [properties] Properties to set
         */
        function ControlIWant(properties) {
            this.messageIDs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ControlIWant messageIDs.
         * @member {Array.<Uint8Array>} messageIDs
         * @memberof RPC.ControlIWant
         * @instance
         */
        ControlIWant.prototype.messageIDs = $util.emptyArray;

        /**
         * Creates a new ControlIWant instance using the specified properties.
         * @function create
         * @memberof RPC.ControlIWant
         * @static
         * @param {RPC.IControlIWant=} [properties] Properties to set
         * @returns {RPC.ControlIWant} ControlIWant instance
         */
        ControlIWant.create = function create(properties) {
            return new ControlIWant(properties);
        };

        /**
         * Encodes the specified ControlIWant message. Does not implicitly {@link RPC.ControlIWant.verify|verify} messages.
         * @function encode
         * @memberof RPC.ControlIWant
         * @static
         * @param {RPC.IControlIWant} message ControlIWant message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlIWant.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messageIDs != null && message.messageIDs.length)
                for (let i = 0; i < message.messageIDs.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.messageIDs[i]);
            return writer;
        };

        /**
         * Encodes the specified ControlIWant message, length delimited. Does not implicitly {@link RPC.ControlIWant.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.ControlIWant
         * @static
         * @param {RPC.IControlIWant} message ControlIWant message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlIWant.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ControlIWant message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.ControlIWant
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.ControlIWant} ControlIWant
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlIWant.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.ControlIWant();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.messageIDs && message.messageIDs.length))
                            message.messageIDs = [];
                        message.messageIDs.push(reader.bytes());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ControlIWant message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.ControlIWant
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.ControlIWant} ControlIWant
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlIWant.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ControlIWant message.
         * @function verify
         * @memberof RPC.ControlIWant
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ControlIWant.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.messageIDs != null && message.hasOwnProperty("messageIDs")) {
                if (!Array.isArray(message.messageIDs))
                    return "messageIDs: array expected";
                for (let i = 0; i < message.messageIDs.length; ++i)
                    if (!(message.messageIDs[i] && typeof message.messageIDs[i].length === "number" || $util.isString(message.messageIDs[i])))
                        return "messageIDs: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a ControlIWant message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.ControlIWant
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.ControlIWant} ControlIWant
         */
        ControlIWant.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.ControlIWant)
                return object;
            let message = new $root.RPC.ControlIWant();
            if (object.messageIDs) {
                if (!Array.isArray(object.messageIDs))
                    throw TypeError(".RPC.ControlIWant.messageIDs: array expected");
                message.messageIDs = [];
                for (let i = 0; i < object.messageIDs.length; ++i)
                    if (typeof object.messageIDs[i] === "string")
                        $util.base64.decode(object.messageIDs[i], message.messageIDs[i] = $util.newBuffer($util.base64.length(object.messageIDs[i])), 0);
                    else if (object.messageIDs[i].length >= 0)
                        message.messageIDs[i] = object.messageIDs[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a ControlIWant message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.ControlIWant
         * @static
         * @param {RPC.ControlIWant} message ControlIWant
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ControlIWant.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.messageIDs = [];
            if (message.messageIDs && message.messageIDs.length) {
                object.messageIDs = [];
                for (let j = 0; j < message.messageIDs.length; ++j)
                    object.messageIDs[j] = options.bytes === String ? $util.base64.encode(message.messageIDs[j], 0, message.messageIDs[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.messageIDs[j]) : message.messageIDs[j];
            }
            return object;
        };

        /**
         * Converts this ControlIWant to JSON.
         * @function toJSON
         * @memberof RPC.ControlIWant
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ControlIWant.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ControlIWant
         * @function getTypeUrl
         * @memberof RPC.ControlIWant
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ControlIWant.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.ControlIWant";
        };

        return ControlIWant;
    })();

    RPC.ControlGraft = (function() {

        /**
         * Properties of a ControlGraft.
         * @memberof RPC
         * @interface IControlGraft
         * @property {string|null} [topicID] ControlGraft topicID
         */

        /**
         * Constructs a new ControlGraft.
         * @memberof RPC
         * @classdesc Represents a ControlGraft.
         * @implements IControlGraft
         * @constructor
         * @param {RPC.IControlGraft=} [properties] Properties to set
         */
        function ControlGraft(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ControlGraft topicID.
         * @member {string|null|undefined} topicID
         * @memberof RPC.ControlGraft
         * @instance
         */
        ControlGraft.prototype.topicID = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ControlGraft _topicID.
         * @member {"topicID"|undefined} _topicID
         * @memberof RPC.ControlGraft
         * @instance
         */
        Object.defineProperty(ControlGraft.prototype, "_topicID", {
            get: $util.oneOfGetter($oneOfFields = ["topicID"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ControlGraft instance using the specified properties.
         * @function create
         * @memberof RPC.ControlGraft
         * @static
         * @param {RPC.IControlGraft=} [properties] Properties to set
         * @returns {RPC.ControlGraft} ControlGraft instance
         */
        ControlGraft.create = function create(properties) {
            return new ControlGraft(properties);
        };

        /**
         * Encodes the specified ControlGraft message. Does not implicitly {@link RPC.ControlGraft.verify|verify} messages.
         * @function encode
         * @memberof RPC.ControlGraft
         * @static
         * @param {RPC.IControlGraft} message ControlGraft message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlGraft.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.topicID != null && Object.hasOwnProperty.call(message, "topicID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.topicID);
            return writer;
        };

        /**
         * Encodes the specified ControlGraft message, length delimited. Does not implicitly {@link RPC.ControlGraft.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.ControlGraft
         * @static
         * @param {RPC.IControlGraft} message ControlGraft message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlGraft.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ControlGraft message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.ControlGraft
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.ControlGraft} ControlGraft
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlGraft.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.ControlGraft();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.topicID = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ControlGraft message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.ControlGraft
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.ControlGraft} ControlGraft
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlGraft.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ControlGraft message.
         * @function verify
         * @memberof RPC.ControlGraft
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ControlGraft.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.topicID != null && message.hasOwnProperty("topicID")) {
                properties._topicID = 1;
                if (!$util.isString(message.topicID))
                    return "topicID: string expected";
            }
            return null;
        };

        /**
         * Creates a ControlGraft message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.ControlGraft
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.ControlGraft} ControlGraft
         */
        ControlGraft.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.ControlGraft)
                return object;
            let message = new $root.RPC.ControlGraft();
            if (object.topicID != null)
                message.topicID = String(object.topicID);
            return message;
        };

        /**
         * Creates a plain object from a ControlGraft message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.ControlGraft
         * @static
         * @param {RPC.ControlGraft} message ControlGraft
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ControlGraft.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.topicID != null && message.hasOwnProperty("topicID")) {
                object.topicID = message.topicID;
                if (options.oneofs)
                    object._topicID = "topicID";
            }
            return object;
        };

        /**
         * Converts this ControlGraft to JSON.
         * @function toJSON
         * @memberof RPC.ControlGraft
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ControlGraft.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ControlGraft
         * @function getTypeUrl
         * @memberof RPC.ControlGraft
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ControlGraft.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.ControlGraft";
        };

        return ControlGraft;
    })();

    RPC.ControlPrune = (function() {

        /**
         * Properties of a ControlPrune.
         * @memberof RPC
         * @interface IControlPrune
         * @property {string|null} [topicID] ControlPrune topicID
         * @property {Array.<RPC.IPeerInfo>|null} [peers] ControlPrune peers
         * @property {number|Long|null} [backoff] ControlPrune backoff
         */

        /**
         * Constructs a new ControlPrune.
         * @memberof RPC
         * @classdesc Represents a ControlPrune.
         * @implements IControlPrune
         * @constructor
         * @param {RPC.IControlPrune=} [properties] Properties to set
         */
        function ControlPrune(properties) {
            this.peers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ControlPrune topicID.
         * @member {string|null|undefined} topicID
         * @memberof RPC.ControlPrune
         * @instance
         */
        ControlPrune.prototype.topicID = null;

        /**
         * ControlPrune peers.
         * @member {Array.<RPC.IPeerInfo>} peers
         * @memberof RPC.ControlPrune
         * @instance
         */
        ControlPrune.prototype.peers = $util.emptyArray;

        /**
         * ControlPrune backoff.
         * @member {number|Long|null|undefined} backoff
         * @memberof RPC.ControlPrune
         * @instance
         */
        ControlPrune.prototype.backoff = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ControlPrune _topicID.
         * @member {"topicID"|undefined} _topicID
         * @memberof RPC.ControlPrune
         * @instance
         */
        Object.defineProperty(ControlPrune.prototype, "_topicID", {
            get: $util.oneOfGetter($oneOfFields = ["topicID"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * ControlPrune _backoff.
         * @member {"backoff"|undefined} _backoff
         * @memberof RPC.ControlPrune
         * @instance
         */
        Object.defineProperty(ControlPrune.prototype, "_backoff", {
            get: $util.oneOfGetter($oneOfFields = ["backoff"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ControlPrune instance using the specified properties.
         * @function create
         * @memberof RPC.ControlPrune
         * @static
         * @param {RPC.IControlPrune=} [properties] Properties to set
         * @returns {RPC.ControlPrune} ControlPrune instance
         */
        ControlPrune.create = function create(properties) {
            return new ControlPrune(properties);
        };

        /**
         * Encodes the specified ControlPrune message. Does not implicitly {@link RPC.ControlPrune.verify|verify} messages.
         * @function encode
         * @memberof RPC.ControlPrune
         * @static
         * @param {RPC.IControlPrune} message ControlPrune message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlPrune.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.topicID != null && Object.hasOwnProperty.call(message, "topicID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.topicID);
            if (message.peers != null && message.peers.length)
                for (let i = 0; i < message.peers.length; ++i)
                    $root.RPC.PeerInfo.encode(message.peers[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.backoff != null && Object.hasOwnProperty.call(message, "backoff"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.backoff);
            return writer;
        };

        /**
         * Encodes the specified ControlPrune message, length delimited. Does not implicitly {@link RPC.ControlPrune.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.ControlPrune
         * @static
         * @param {RPC.IControlPrune} message ControlPrune message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControlPrune.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ControlPrune message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.ControlPrune
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.ControlPrune} ControlPrune
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlPrune.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.ControlPrune();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.topicID = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.peers && message.peers.length))
                            message.peers = [];
                        message.peers.push($root.RPC.PeerInfo.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        message.backoff = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ControlPrune message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.ControlPrune
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.ControlPrune} ControlPrune
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControlPrune.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ControlPrune message.
         * @function verify
         * @memberof RPC.ControlPrune
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ControlPrune.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.topicID != null && message.hasOwnProperty("topicID")) {
                properties._topicID = 1;
                if (!$util.isString(message.topicID))
                    return "topicID: string expected";
            }
            if (message.peers != null && message.hasOwnProperty("peers")) {
                if (!Array.isArray(message.peers))
                    return "peers: array expected";
                for (let i = 0; i < message.peers.length; ++i) {
                    let error = $root.RPC.PeerInfo.verify(message.peers[i]);
                    if (error)
                        return "peers." + error;
                }
            }
            if (message.backoff != null && message.hasOwnProperty("backoff")) {
                properties._backoff = 1;
                if (!$util.isInteger(message.backoff) && !(message.backoff && $util.isInteger(message.backoff.low) && $util.isInteger(message.backoff.high)))
                    return "backoff: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a ControlPrune message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.ControlPrune
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.ControlPrune} ControlPrune
         */
        ControlPrune.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.ControlPrune)
                return object;
            let message = new $root.RPC.ControlPrune();
            if (object.topicID != null)
                message.topicID = String(object.topicID);
            if (object.peers) {
                if (!Array.isArray(object.peers))
                    throw TypeError(".RPC.ControlPrune.peers: array expected");
                message.peers = [];
                for (let i = 0; i < object.peers.length; ++i) {
                    if (typeof object.peers[i] !== "object")
                        throw TypeError(".RPC.ControlPrune.peers: object expected");
                    message.peers[i] = $root.RPC.PeerInfo.fromObject(object.peers[i]);
                }
            }
            if (object.backoff != null)
                if ($util.Long)
                    (message.backoff = $util.Long.fromValue(object.backoff)).unsigned = true;
                else if (typeof object.backoff === "string")
                    message.backoff = parseInt(object.backoff, 10);
                else if (typeof object.backoff === "number")
                    message.backoff = object.backoff;
                else if (typeof object.backoff === "object")
                    message.backoff = new $util.LongBits(object.backoff.low >>> 0, object.backoff.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a ControlPrune message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.ControlPrune
         * @static
         * @param {RPC.ControlPrune} message ControlPrune
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ControlPrune.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.peers = [];
            if (message.topicID != null && message.hasOwnProperty("topicID")) {
                object.topicID = message.topicID;
                if (options.oneofs)
                    object._topicID = "topicID";
            }
            if (message.peers && message.peers.length) {
                object.peers = [];
                for (let j = 0; j < message.peers.length; ++j)
                    object.peers[j] = $root.RPC.PeerInfo.toObject(message.peers[j], options);
            }
            if (message.backoff != null && message.hasOwnProperty("backoff")) {
                if (typeof message.backoff === "number")
                    object.backoff = options.longs === String ? String(message.backoff) : message.backoff;
                else
                    object.backoff = options.longs === String ? $util.Long.prototype.toString.call(message.backoff) : options.longs === Number ? new $util.LongBits(message.backoff.low >>> 0, message.backoff.high >>> 0).toNumber(true) : message.backoff;
                if (options.oneofs)
                    object._backoff = "backoff";
            }
            return object;
        };

        /**
         * Converts this ControlPrune to JSON.
         * @function toJSON
         * @memberof RPC.ControlPrune
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ControlPrune.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ControlPrune
         * @function getTypeUrl
         * @memberof RPC.ControlPrune
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ControlPrune.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.ControlPrune";
        };

        return ControlPrune;
    })();

    RPC.PeerInfo = (function() {

        /**
         * Properties of a PeerInfo.
         * @memberof RPC
         * @interface IPeerInfo
         * @property {Uint8Array|null} [peerID] PeerInfo peerID
         * @property {Uint8Array|null} [signedPeerRecord] PeerInfo signedPeerRecord
         */

        /**
         * Constructs a new PeerInfo.
         * @memberof RPC
         * @classdesc Represents a PeerInfo.
         * @implements IPeerInfo
         * @constructor
         * @param {RPC.IPeerInfo=} [properties] Properties to set
         */
        function PeerInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PeerInfo peerID.
         * @member {Uint8Array|null|undefined} peerID
         * @memberof RPC.PeerInfo
         * @instance
         */
        PeerInfo.prototype.peerID = null;

        /**
         * PeerInfo signedPeerRecord.
         * @member {Uint8Array|null|undefined} signedPeerRecord
         * @memberof RPC.PeerInfo
         * @instance
         */
        PeerInfo.prototype.signedPeerRecord = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * PeerInfo _peerID.
         * @member {"peerID"|undefined} _peerID
         * @memberof RPC.PeerInfo
         * @instance
         */
        Object.defineProperty(PeerInfo.prototype, "_peerID", {
            get: $util.oneOfGetter($oneOfFields = ["peerID"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * PeerInfo _signedPeerRecord.
         * @member {"signedPeerRecord"|undefined} _signedPeerRecord
         * @memberof RPC.PeerInfo
         * @instance
         */
        Object.defineProperty(PeerInfo.prototype, "_signedPeerRecord", {
            get: $util.oneOfGetter($oneOfFields = ["signedPeerRecord"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PeerInfo instance using the specified properties.
         * @function create
         * @memberof RPC.PeerInfo
         * @static
         * @param {RPC.IPeerInfo=} [properties] Properties to set
         * @returns {RPC.PeerInfo} PeerInfo instance
         */
        PeerInfo.create = function create(properties) {
            return new PeerInfo(properties);
        };

        /**
         * Encodes the specified PeerInfo message. Does not implicitly {@link RPC.PeerInfo.verify|verify} messages.
         * @function encode
         * @memberof RPC.PeerInfo
         * @static
         * @param {RPC.IPeerInfo} message PeerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PeerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.peerID != null && Object.hasOwnProperty.call(message, "peerID"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.peerID);
            if (message.signedPeerRecord != null && Object.hasOwnProperty.call(message, "signedPeerRecord"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signedPeerRecord);
            return writer;
        };

        /**
         * Encodes the specified PeerInfo message, length delimited. Does not implicitly {@link RPC.PeerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RPC.PeerInfo
         * @static
         * @param {RPC.IPeerInfo} message PeerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PeerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PeerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof RPC.PeerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RPC.PeerInfo} PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PeerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC.PeerInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.peerID = reader.bytes();
                        break;
                    }
                case 2: {
                        message.signedPeerRecord = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PeerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RPC.PeerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RPC.PeerInfo} PeerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PeerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PeerInfo message.
         * @function verify
         * @memberof RPC.PeerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PeerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.peerID != null && message.hasOwnProperty("peerID")) {
                properties._peerID = 1;
                if (!(message.peerID && typeof message.peerID.length === "number" || $util.isString(message.peerID)))
                    return "peerID: buffer expected";
            }
            if (message.signedPeerRecord != null && message.hasOwnProperty("signedPeerRecord")) {
                properties._signedPeerRecord = 1;
                if (!(message.signedPeerRecord && typeof message.signedPeerRecord.length === "number" || $util.isString(message.signedPeerRecord)))
                    return "signedPeerRecord: buffer expected";
            }
            return null;
        };

        /**
         * Creates a PeerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RPC.PeerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RPC.PeerInfo} PeerInfo
         */
        PeerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.RPC.PeerInfo)
                return object;
            let message = new $root.RPC.PeerInfo();
            if (object.peerID != null)
                if (typeof object.peerID === "string")
                    $util.base64.decode(object.peerID, message.peerID = $util.newBuffer($util.base64.length(object.peerID)), 0);
                else if (object.peerID.length >= 0)
                    message.peerID = object.peerID;
            if (object.signedPeerRecord != null)
                if (typeof object.signedPeerRecord === "string")
                    $util.base64.decode(object.signedPeerRecord, message.signedPeerRecord = $util.newBuffer($util.base64.length(object.signedPeerRecord)), 0);
                else if (object.signedPeerRecord.length >= 0)
                    message.signedPeerRecord = object.signedPeerRecord;
            return message;
        };

        /**
         * Creates a plain object from a PeerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RPC.PeerInfo
         * @static
         * @param {RPC.PeerInfo} message PeerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PeerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.peerID != null && message.hasOwnProperty("peerID")) {
                object.peerID = options.bytes === String ? $util.base64.encode(message.peerID, 0, message.peerID.length) : options.bytes === Array ? Array.prototype.slice.call(message.peerID) : message.peerID;
                if (options.oneofs)
                    object._peerID = "peerID";
            }
            if (message.signedPeerRecord != null && message.hasOwnProperty("signedPeerRecord")) {
                object.signedPeerRecord = options.bytes === String ? $util.base64.encode(message.signedPeerRecord, 0, message.signedPeerRecord.length) : options.bytes === Array ? Array.prototype.slice.call(message.signedPeerRecord) : message.signedPeerRecord;
                if (options.oneofs)
                    object._signedPeerRecord = "signedPeerRecord";
            }
            return object;
        };

        /**
         * Converts this PeerInfo to JSON.
         * @function toJSON
         * @memberof RPC.PeerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PeerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PeerInfo
         * @function getTypeUrl
         * @memberof RPC.PeerInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PeerInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RPC.PeerInfo";
        };

        return PeerInfo;
    })();

    return RPC;
})();

export { $root as default };
