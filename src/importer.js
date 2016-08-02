const request = require('request-promise');
const path = require('path');
const generator = require('./generator');
const { getApiUrl, parseResponse, refreshDir } = require('./utils');
const { DEFAULT_DEST } = require('./constants');

/**
 * Performs the API request and creates the files for given content type.
 * @param {String} type - The type of content to import (e.g. `posts`)
 * @param {Object} options - Main configuration object passed down from root function
 * @return {Promise}
 */
const importType = (type, options) => {
  const { endpoint, contentTypes, dest } = options;
  const typeOptions = contentTypes[type];
  const typeFolder = typeOptions.dest || type;
  const config = Object.assign({}, typeOptions, {
    dest: path.join(dest || DEFAULT_DEST, typeFolder),
  });
  const url = config.endpoint || getApiUrl(endpoint, type);

  return request(url)
    .then((response) => refreshDir(config.dest)
      .then(() => parseResponse(response, type))
      .then((data) => generator(data, config))
    )
};

/**
 * Performs the API requests and creates the files for all given content types.
 * @param {Object} options - Main configuration object passed down from root function
 * @return {Promise}
 */
const importAll = (options) => {
  const types = Object.keys(options.contentTypes || {});

  return Promise.all(types.map((type) =>
    importType(type, options)
  ));
};

/**
 * Returns a function to import all the content types or only a specific content
 * type.
 * @param {Object} options - Main configuration object passed down from root function
 * @return {Function}
 * @throws Throws an error if `options.contentTypes` is not defined.
 */
const importer = (options = {}) => {
  const types = Object.keys(options.contentTypes || {});

  if (types.length === 0) {
    throw new Error('The `contentTypes` setting is mandatory.');
  }

  return (type) => {
    return type
      ? importType(type, options)
      : importAll(options);
  }
}

module.exports = importer;
