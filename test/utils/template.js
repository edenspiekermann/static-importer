const assert = require('assert');
const template = require('../../src/utils/template');

describe('The template function', () => {
  it('should return input if no values given', () => {
    const actual = template('Hello {name}');
    const expect = 'Hello {name}';
    assert.equal(actual, expect);
  });

  it('should return input if no value given for tokens', () => {
    const actual = template('Hello {name}', { foo: 'bar' });
    const expect = 'Hello {name}';
    assert.equal(actual, expect);
  });

  it('should replace tokens in input if given', () => {
    const actual = template('Hello {name}', { name: 'world' });
    const expect = 'Hello world';
    assert.equal(actual, expect);
  });

  it('should replace all tokens in input if given', () => {
    const actual = template('Hello {name} {name}', { name: 'world' });
    const expect = 'Hello world world';
    assert.equal(actual, expect);
  });

  it('should replace multiple tokens in input if given', () => {
    const actual = template('Hello {name} {foo}', { name: 'world', foo: 42 });
    const expect = 'Hello world 42';
    assert.equal(actual, expect);
  });
});
