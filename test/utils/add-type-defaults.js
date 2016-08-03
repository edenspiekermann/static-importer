const assert = require('assert');
const addTypeDefaults = require('../../src/utils/add-type-defaults');
const {
  DEFAULT_DEST,
  DEFAULT_FILENAME,
  DEFAULT_RESPONSE_PATH
} = require('../../src/constants');

describe('The addTypeDefaults function', () => {
  it('should return an object', () => {
    const actual = typeof addTypeDefaults({});
    const expect = 'object';
    assert.deepEqual(actual, expect);
  });

  it('should set `dest` key if not already set', () => {
    let actual, expect;

    actual = addTypeDefaults({}).dest;
    expect = DEFAULT_DEST;
    assert.deepEqual(actual, expect);

    actual = addTypeDefaults({ dest: 'foo' }).dest;
    expect = 'foo';
    assert.deepEqual(actual, expect);
  });

  it('should set `filename` key if not already set', () => {
    let actual, expect;

    actual = addTypeDefaults({}).filename;
    expect = DEFAULT_FILENAME;
    assert.deepEqual(actual, expect);

    actual = addTypeDefaults({ filename: 'foo' }).filename;
    expect = 'foo';
    assert.deepEqual(actual, expect);
  });

  it('should set `responsePath` key if not already set', () => {
    let actual, expect;

    actual = addTypeDefaults({}).responsePath;
    expect = DEFAULT_RESPONSE_PATH;
    assert.deepEqual(actual, expect);

    actual = addTypeDefaults({ responsePath: 'foo' }).responsePath;
    expect = 'foo';
    assert.deepEqual(actual, expect);
  });
});
