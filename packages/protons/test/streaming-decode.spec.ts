import { expect } from 'aegir/chai'
import all from 'it-all'
import { MessageWithArrayField, MessageWithNestedMessage, MessageWithRepeatedMessage, MessageWithMapMessage, MessageWithPrimitiveMap, MessageWithDeeplyNestedMessage } from './fixtures/streaming.ts'

describe('streaming-decode', () => {
  it('should include indexes in field values', async () => {
    const input = MessageWithArrayField.encode({
      arr: [
        '1', '2', '3'
      ]
    })

    const output = all(MessageWithArrayField.stream(input))

    expect(output).to.deep.equal([{
      field: '$.arr[]',
      index: 0,
      value: '1'
    }, {
      field: '$.arr[]',
      index: 1,
      value: '2'
    }, {
      field: '$.arr[]',
      index: 2,
      value: '3'
    }])
  })

  it('should not parse input after exiting loop', () => {
    const input = MessageWithArrayField.encode({
      field1: true,
      field2: 5,
      arr: [
        '1', '2', '3'
      ]
    })

    const output = []

    // make input invalid
    input[9] = 0
    input[10] = 0
    input[11] = 0
    input[12] = 0

    // cannot read input to completion
    expect(() => {
      all(MessageWithArrayField.stream(input))
    }).to.throw().with.property('name', 'RangeError')

    // can read first couple of values
    for (const evt of MessageWithArrayField.stream(input)) {
      output.push(evt)

      if (evt.field === '$.field2') {
        break
      }
    }

    expect(output).to.have.lengthOf(2)
  })

  it('should stream nested message fields', () => {
    const input = MessageWithNestedMessage.encode({
      field1: true,
      nestedMessage: {
        nestedValue: 'hello'
      }
    })

    const output = all(MessageWithNestedMessage.stream(input))

    expect(output).to.deep.equal([{
      field: '$.field1',
      value: true
    }, {
      field: '$.nestedMessage.nestedValue',
      value: 'hello'
    }])
  })

  it('should stream deeply nested message fields', () => {
    const input = MessageWithDeeplyNestedMessage.encode({
      field1: true,
      nestedMessage: {
        field1: true,
        nestedMessage: {
          nestedValue: 'hello'
        }
      }
    })

    const output = all(MessageWithDeeplyNestedMessage.stream(input))

    expect(output).to.deep.equal([{
      field: '$.field1',
      value: true
    }, {
      field: '$.nestedMessage.field1',
      value: true
    }, {
      field: '$.nestedMessage.nestedMessage.nestedValue',
      value: 'hello'
    }])
  })

  it('should stream message fields in lists', () => {
    const input = MessageWithRepeatedMessage.encode({
      field1: true,
      nestedMessages: [{
        nestedValue: 'hello'
      }]
    })

    const output = all(MessageWithRepeatedMessage.stream(input))

    expect(output).to.deep.equal([{
      field: '$.field1',
      value: true
    }, {
      field: '$.nestedMessages[].nestedValue',
      index: 0,
      value: 'hello'
    }])
  })

  it('should stream message fields in maps', () => {
    const input = MessageWithMapMessage.encode({
      field1: true,
      nestedMessages: new Map([['this-is-a-key', {
        nestedValue: 'hello'
      }], ['this-is-another-key', {
        nestedValue: 'world'
      }]])
    })

    const output = all(MessageWithMapMessage.stream(input))

    expect(output).to.deep.equal([{
      field: '$.field1',
      value: true
    }, {
      field: '$.nestedMessages{}.key',
      value: 'this-is-a-key'
    }, {
      field: '$.nestedMessages{}.value.nestedValue',
      value: 'hello'
    }, {
      field: '$.nestedMessages{}.key',
      value: 'this-is-another-key'
    }, {
      field: '$.nestedMessages{}.value.nestedValue',
      value: 'world'
    }])
  })

  it('should stream primitive fields in maps', () => {
    const input = MessageWithPrimitiveMap.encode({
      field1: true,
      nestedStrings: new Map([['this-is-a-key', 'this-is-a-value'], ['this-is-another-key', 'this-is-another-value']])
    })

    const output = all(MessageWithPrimitiveMap.stream(input))

    expect(output).to.deep.equal([{
      field: '$.field1',
      value: true
    }, {
      field: '$.nestedStrings{}.key',
      value: 'this-is-a-key'
    }, {
      field: '$.nestedStrings{}.value',
      value: 'this-is-a-value'
    }, {
      field: '$.nestedStrings{}.key',
      value: 'this-is-another-key'
    }, {
      field: '$.nestedStrings{}.value',
      value: 'this-is-another-value'
    }])
  })
})
