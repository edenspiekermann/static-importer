const { remove, ensureDir } = require('fs-promise');

/**
 * Deletes a directory.
 * @param {String} dir - Directory to delete
 * @return {Promise}
 */
const deleteDir = (dir) =>
  remove(dir);

/**
 * Creates a directory.
 * @param {String} dir - Directory to create
 * @return {Promise}
 */
const createDir = (dir) =>
  ensureDir(dir);

/**
 * Deletes and recreates a directory to empty its content.
 * @param {String} dir - Directory to delete and create again
 * @return {Promise}
 */
const refreshDir = (dir) =>
  deleteDir(dir)
    .then(() => createDir(dir))
    .then(() => dir);

module.exports = refreshDir;
