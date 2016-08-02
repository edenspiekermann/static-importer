const assert = require('assert');
const importer = require('../src/importer');

const i = importer({
  handle: 'foo',
  dest: './',
  contentTypes: [ { type: 'bar' } ]
})

describe('The import function', () => {
  it('should return a function', () => {
    const actual = typeof i
    const expect = 'function'
    assert.equal(actual, expect);
  });

  it('… which should return a promise', () => {
    const actual = typeof i().then
    const expect = 'function'
    assert.equal(actual, expect);
  });
});
