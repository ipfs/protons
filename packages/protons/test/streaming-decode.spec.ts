import { expect } from 'aegir/chai'
import { AllTheTypes, AnEnum } from './fixtures/test.ts'
import all from 'it-all'

describe('streaming-decode', () => {
  it('should yield collections when asked to', async () => {
    const values = {
      field1: true,
      field2: 2,
      field3: 3n,
      field4: 4,
      field5: 5n,
      field6: 6,
      field7: 7n,
      field8: 8,
      field9: 9,
      field10: '10',
      field11: Uint8Array.from([11]),
      field12: AnEnum.DERP,
      field13: {
        foo: '13'
      },
      field14: [
        '14'
      ],
      field15: 15,
      field16: 16n,
      field17: 17,
      field18: 18n
    }
    const input = AllTheTypes.encode(values)

    const events = all(AllTheTypes.stream(input, {
      emitCollections: false
    }))

    expect(events).to.have.lengthOf(Object.entries(values).length)

    const eventsWithCollections = all(AllTheTypes.stream(input, {
      emitCollections: true
    }))

    expect(eventsWithCollections).to.have.lengthOf(Object.entries(values).length + 1)
  })

  it('should include indexes in field values', async () => {
    const input = AllTheTypes.encode({
      field14: [
        '1', '2', '3'
      ]
    })

    const output = all(AllTheTypes.stream(input))

    expect(output).to.deep.equal([{
      field: 'field14$value',
      index: 0,
      value: '1'
    }, {
      field: 'field14$value',
      index: 1,
      value: '2'
    }, {
      field: 'field14$value',
      index: 2,
      value: '3'
    }])
  })

  it('should not parse input after exiting loop', () => {
    const input = AllTheTypes.encode({
      field1: true,
      field2: 5,
      field14: [
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
      all(AllTheTypes.stream(input))
    }).to.throw().with.property('name', 'RangeError')

    // can read first couple of values
    for (const evt of AllTheTypes.stream(input)) {
      output.push(evt)

      if (evt.field === 'field2') {
        break
      }
    }

    expect(output).to.have.lengthOf(2)
  })
})
