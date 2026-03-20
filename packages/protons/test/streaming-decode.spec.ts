import { expect } from 'aegir/chai'
import all from 'it-all'
import { AllTheTypes } from './fixtures/test.ts'

describe.skip('streaming-decode', () => {
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
