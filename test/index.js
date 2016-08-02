const assert = require('assert');
const main = require('../src');

const m = main({ endpoint: 'foo', contentTypes: { foo: 'bar' } });

describe('The main module', () => {
  it('should throw if no `endpoint` option given', () => {
    assert.throws(() => main(), Error);
  });

  it('should throw if no `contentTypes` option given', () => {
    assert.throws(() => main({ endpoint: 'foo' }), Error);
  });

  it('should return a function', () => {
    const actual = typeof m
    const expect = 'function'
    assert.equal(actual, expect);
  });
});
