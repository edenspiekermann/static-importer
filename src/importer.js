const request = require('request-promise');
const path = require('path');
const { find } = require('lodash');
const generator = require('./generator');
const { parseResponse, refreshDir } = require('./utils');
const { DEFAULT_DEST } = require('./constants');

/**
 * Computes the destination for given type.
 * @param {String} typeConfig - Type configuration
 * @param {Object} config - Import configuration passed down from the root function
 * @return {String}
 */
const getTypeDestination = ({ dest, type }, config) =>
  path.join(config.dest || DEFAULT_DEST, dest || type);

/**
 * Computes the API endpoint for given type.
 * @param {String} typeConfig - Type configuration
 * @param {Object} option - Import configuration passed down from the root function
 * @return {String}
 */
const getTypeEndpoint = ({ endpoint, type }, config) => {
  return endpoint || (config.endpoint + '/' + type);
}

/**
 * Merges the import configuration with the specific configuration from given
 * type.
 * @param {String} type - Type to merge configuration for
 * @param {Object} option - Import configuration passed down from the root function
 * @return {Object}
 */
const mergeConfig = (typeConfig, config) => {
  const dest = getTypeDestination(typeConfig, config);
  const endpoint = getTypeEndpoint(typeConfig, config);
  return Object.assign({}, typeConfig, { dest, endpoint });
}

/**
 * Performs the API request and creates the files for given content type.
 * @param {String} type - The type of content to import (e.g. `posts`)
 * @param {Object} config - Main configuration object passed down from root function
 * @return {Promise}
 */
const importType = (type, config) => {
  const typeConfig = mergeConfig(find(config.contentTypes, { type }), config);

  return request(typeConfig.endpoint)
    .then((response) => refreshDir(typeConfig.dest)
      .then(() => parseResponse(response, typeConfig.type))
      .then((data) => generator(data, typeConfig))
    )
};

/**
 * Performs the API requests and creates the files for all given content types.
 * @param {Object} config - Main configuration object passed down from root function
 * @return {Promise}
 */
const importAll = (config) => {
  const { contentTypes = [] } = config;

  return Promise.all(contentTypes.map((type) =>
    importType(type.type, config)
  ));
};

/**
 * Returns a function to import all the content types or only a specific content
 * type.
 * @param {Object} config - Main configuration object passed down from root function
 * @return {Function}
 * @throws Throws an error if `config.contentTypes` is not defined.
 */
const importer = (config = {}) => {
  const { contentTypes = [] } = config;

  if (contentTypes.length === 0) {
    throw new Error('The `contentTypes` setting is mandatory.');
  }

  return (type) => {
    return type
      ? importType(type, config)
      : importAll(config);
  }
}

module.exports = importer;
