const assert = require('assert')
const parseResponse = require('../../src/utils/parse-response')

describe('The parseResponse function', () => {
  it('should return parsed JSON response if no type given', () => {
    const actual = parseResponse('{ "foo": "bar" }')
    const expect = { foo: 'bar' }
    assert.deepEqual(actual, expect)
  })

  it('should return specific key in parsed JSON response if type given', () => {
    const actual = parseResponse('{ "foo": "bar" }', 'foo')
    const expect = 'bar'
    assert.deepEqual(actual, expect)
  })
})
