const { remove, ensureDir } = require('fs-promise')

const deleteDir = (dir) =>
  remove(dir)

const createDir = (dir) =>
  ensureDir(dir)

const refreshDir = (dir) =>
  deleteDir(dir)
    .then(() => createDir(dir))
    .then(() => dir)

module.exports = refreshDir
