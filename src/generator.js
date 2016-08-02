const { writeFile } = require('fs-promise');
const path = require('path');
const yfmer = require('./yfmer');
const { template } = require('./utils');

const DEFAULT_NAME = '{slug}.md';

const createFiles = (data, config) =>
  Promise.all(data.map((item) => createFile(item, config)));

const createFile = (data, config) =>
  writeFile(getFilePath(data, config), getFileContent(data, config.frontMatter));

const getFileContent = (data, frontMatter = {}) =>
  yfmer(data, frontMatter) + data.content;

const getFilePath = (data, config) =>
  path.join(config.dest, getFileName(data, config));

const getFileName = (data, config) => {
  if (typeof config.name === 'function') {
    return config.name(data);
  }

  return template(config.name || DEFAULT_NAME, data);
}

module.exports = createFiles;
