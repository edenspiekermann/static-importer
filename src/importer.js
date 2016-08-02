const request = require('request-promise');
const path = require('path');
const generator = require('./generator');
const { getApiUrl, parseResponse, refreshDir } = require('./utils');
const { DEFAULT_DEST } = require('./constants');

const importer = (type, options) => {
  const url = getApiUrl(options.handle, type);
  const typeOptions = options.contentTypes[type];
  const config = Object.assign({},
    typeOptions,
    { dest: path.join(options.dest, typeOptions.dest || type) }
  );

  return request(url)
    .then((response) => refreshDir(config.dest)
      .then(() => parseResponse(response, type))
      .then((data) => generator(data, config))
    )
};

module.exports = importer;
