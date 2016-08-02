const request = require('request-promise');
const path = require('path');
const { find } = require('lodash');
const generator = require('./generator');
const { parseResponse, refreshDir } = require('./utils');
const { DEFAULT_DEST } = require('./constants');

/**
 * Gets the configuration for given type from the options.
 * @param {String} type - Type to retrieve configuration from
 * @param {Object} option - Import configuration passed down from the root function
 * @return {Object}
 */
const getTypeOptions = (type, options) =>
  find(options.contentTypes, (o) => o.type === type)

/**
 * Computes the destination for given type.
 * @param {String} type - Type to computes destination for
 * @param {Object} option - Import configuration passed down from the root function
 * @return {String}
 */
const getTypeDestination = (type, options) => {
  const typeOptions = getTypeOptions(type, options);
  const base = options.dest || DEFAULT_DEST;
  const sub = typeOptions.dest || type;
  return path.join(base, sub);
}

/**
 * Computes the API endpoint for given type.
 * @param {String} type - Type to computes API endpoint for
 * @param {Object} option - Import configuration passed down from the root function
 * @return {String}
 */
const getTypeEndpoint = (type, options) => {
  const { endpoint } = getTypeOptions(type, options);
  return endpoint || (options.endpoint + '/' + type);
}

/**
 * Merges the import configuration with the specific configuration from given
 * type.
 * @param {String} type - Type to merge configuration for
 * @param {Object} option - Import configuration passed down from the root function
 * @return {Object}
 */
const mergeConfig = (type, options) => {
  const typeOptions = getTypeOptions(type, options);
  const dest = getTypeDestination(type, options);
  const endpoint = getTypeEndpoint(type, options);
  return Object.assign({}, typeOptions, { dest, endpoint });
}

/**
 * Performs the API request and creates the files for given content type.
 * @param {String} type - The type of content to import (e.g. `posts`)
 * @param {Object} options - Main configuration object passed down from root function
 * @return {Promise}
 */
const importType = (type, options) => {
  const config = mergeConfig(type, options);

  return request(config.endpoint)
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
  const { contentTypes = [] } = options;

  return Promise.all(contentTypes.map((contentType) =>
    importType(contentType.type, options)
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
  const { contentTypes = [] } = options;

  if (contentTypes.length === 0) {
    throw new Error('The `contentTypes` setting is mandatory.');
  }

  return (type) => {
    return type
      ? importType(type, options)
      : importAll(options);
  }
}

module.exports = importer;
