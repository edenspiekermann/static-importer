const assert = require('assert');
const getApiUrl = require('../../src/utils/get-api-url');

describe('The getApiUrl function', () => {
  it('should return base URL if no handle given', () => {
    const actual = getApiUrl();
    const expect = 'https://public-api.wordpress.com/rest/v1.1/';
    assert.equal(actual, expect);
  });

  it('should return handle-specific URL if no type given', () => {
    const actual = getApiUrl('foobar');
    const expect = 'https://public-api.wordpress.com/rest/v1.1/sites/foobar.wordpress.com';
    assert.equal(actual, expect);
  });

  it('should return type-specific URL if type given', () => {
    const actual = getApiUrl('foobar', 'posts');
    const expect = 'https://public-api.wordpress.com/rest/v1.1/sites/foobar.wordpress.com/posts';
    assert.equal(actual, expect);
  });
});
