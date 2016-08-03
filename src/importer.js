const request = require('request-promise');
const path = require('path');
const { find } = require('lodash');
const generator = require('./generator');
const { parseResponse, refreshDir } = require('./utils');

/**
 * Performs the API request and creates the files for given content type.
 * @param {String} type - The configuration from the type of content to import
 * @return {Promise}
 */
const importType = (type) =>
  request(type.endpoint)
    .then((response) => refreshDir(type.dest)
      .then(() => parseResponse(response, type.responsePath))
      .then((data) => generator(data, type))
    );

/**
 * Performs the API requests and creates the files for all content types.
 * @param {Object[]} types - Content types configuration
 * @return {Promise}
 */
const importAll = (types) =>
  Promise.all(types.map(importType));

/**
 * Finds the configuration of a type in the array of settings from a type name.
 * @param {Object[]} types - Content types configuration
 * @param {String} name - Type name to retrieve configuration from
 * @return {Object}
 */
const findTypeByName = (types, name) =>
  find(types, (t) => t.name === name);

/**
 * Returns a function to import all the content types or only a specific content
 * type.
 * @param {Object[]} types - Content types configuration
 * @return {Function}
 */
const importer = (types) => {
  return (type) => {
    const config = findTypeByName(types, type);

    return type
      ? importType(config)
      : importAll(types);
  }
}

module.exports = importer;
