const assert = require('assert');
const main = require('../src');

const sample = { contentTypes: [ { name: 'bar' } ] };

describe('The main module', () => {
  it('should throw if no `contentTypes` option given', () => {
    assert.throws(() => main({}), Error);
  });

  it('should throw if some content types do not have an endpoint', () => {
    assert.throws(() => main({ contentTypes: [
      { name: 'bar' }
    ] }), Error);
  });

  it('should throw if some content types do not have a name', () => {
    assert.throws(() => main({ contentTypes: [
      { endpoint: 'bar' }
    ] }), Error);
  });

  it('should return a function', () => {
    const actual = typeof main({ contentTypes: [
      { name: 'foo', endpoint: 'bar' }
    ] })
    const expect = 'function'
    assert.equal(actual, expect);
  });
});
