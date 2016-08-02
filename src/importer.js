const request = require('request-promise');
const path = require('path');
const generator = require('./generator');
const { getApiUrl, parseResponse, refreshDir } = require('./utils');

const importer = (type, options) => {
  const url = getApiUrl(options.handle, type);
  const config = options.contentTypes[type];
  const baseDest = options.dest || './wpimporter';

  Object.assign(config, {
    dest: path.join(baseDest, config.dest || type)
  });

  return request(url)
    .then((response) => refreshDir(config.dest)
      .then(() => parseResponse(response, type))
      .then((data) => generator(data, config))
    )
};

module.exports = importer;
