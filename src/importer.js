const request = require('request-promise');
const path = require('path');
const generator = require('./generator');
const { getApiUrl, parseResponse, refreshDir } = require('./utils');
const { DEFAULT_DEST } = require('./constants');

const importer = (type, options) => {
  const { handle, contentTypes, dest } = options;
  const url = getApiUrl(handle, type);
  const typeOptions = contentTypes[type];
  const typeFolder = typeOptions.dest || type;
  const config = Object.assign({}, typeOptions, {
    dest: path.join(dest, typeFolder)
  });

  return request(url)
    .then((response) => refreshDir(config.dest)
      .then(() => parseResponse(response, type))
      .then((data) => generator(data, config))
    )
};

module.exports = importer;
