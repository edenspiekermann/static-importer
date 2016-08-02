const assert = require('assert');
const getApiUrl = require('../../src/utils/get-api-url');

describe('The getApiUrl function', () => {
  it('should return raw endpoint if no type given', () => {
    const actual = getApiUrl('foobar');
    const expect = 'foobar';
    assert.equal(actual, expect);
  });

  it('should return type-specific endpoint if type given', () => {
    const actual = getApiUrl('foobar', 'posts');
    const expect = 'foobar/posts';
    assert.equal(actual, expect);
  });
});
