const assert = require('assert');
const importer = require('../src/importer');

const sample = [ { name: 'bar', endpoint: 'foo' } ]

describe('The import function', () => {
  it('should return a function', () => {
    const actual = typeof importer(sample)
    const expect = 'function'
    assert.equal(actual, expect);
  });

  it('… which should return a promise', () => {
    const actual = typeof importer(sample)().then
    const expect = 'function'
    assert.equal(actual, expect);
  });
});
