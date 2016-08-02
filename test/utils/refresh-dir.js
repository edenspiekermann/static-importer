const assert = require('assert');
const { exists, remove } = require('fs-promise');
const refreshDir = require('../../src/utils/refresh-dir');
const timestamp = String(Date.now());

describe('The refreshDir function', () => {
  it('should create a dir if doesn’t exist', function (done) {
    this.timeout(5000);

    refreshDir(timestamp)
      .then(exists)
      .then((exists) => {
        const actual = exists;
        const expect = true;
        assert.equal(actual, expect);
        return remove(timestamp);
      })
      .then(() => {
        done();
      });
  });
});
