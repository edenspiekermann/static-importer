const request = require('request-promise');
const path = require('path');
const generator = require('./generator');
const { getApiUrl, parseResponse, refreshDir } = require('./utils');

const importContent = (type, options) => {
  const url = getApiUrl(options.handle, type);
  const config = options.contentTypes[type];
  const baseDest = options.dest || './wpimporter';

  Object.assign(config, {
    dest: path.join(baseDest, config.dest || type)
  });

  request(url)
    .then((response) => refreshDir(config.dest)
      .then(() => parseResponse(response, type))
      .then((data) => generator(data, config))
    )
    .catch((err) => console.log(err));
}

const importer = (options) => {
  if (!options.handle) {
    throw new Error('The `handle` setting is mandatory.');
  }

  const types = Object.keys(options.contentTypes) || [];

  types.forEach((type) => {
    importContent(type, options);
  });
}

module.exports = importer;
