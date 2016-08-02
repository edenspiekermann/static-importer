const { writeFile } = require('fs-promise');
const path = require('path');
const yfmer = require('./yfmer');
const { template } = require('./utils');
const { DEFAULT_NAME } = require('./constants');

const createFiles = (data, config) =>
  Promise.all(data.map((item) => createFile(item, config)));

const createFile = (data, config) =>
  writeFile(
    getFilePath(data, config),
    getFileContent(data, config.frontMatter)
  );

const getFileContent = (data, frontMatter = {}) =>
  yfmer(data, frontMatter) + data.content;

const getFilePath = (data, config) =>
  path.join(config.dest, getFileName(data, config));

const getFileName = (data, config) => {
  const name = config.name || DEFAULT_NAME;

  if (typeof name === 'function') {
    return name(data);
  }

  return template(name, data);
}

module.exports = createFiles;
