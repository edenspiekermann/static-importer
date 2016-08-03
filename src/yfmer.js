const { compose } = require('lodash/fp');
const { get } = require('lodash');
const { FRONT_MATTER_DELIMITER } = require('./constants');

/**
 * Wraps the YAML Front Matter and glues all its components with line breaks.
 * @param {Array} [variables=] - Variables from the YAML Front Matter
 * @return {String}
 */
const wrapFrontMatter = (variables) =>
  [FRONT_MATTER_DELIMITER]
    .concat(variables)
    .concat(FRONT_MATTER_DELIMITER)
    .concat('')
    .join('\n');

/**
 * Glues keys and values with a colon and a space.
 * @param {Object} [data = {}] - Data coming from the API response
 * @return {Array}
 */
const generateFrontMatter = (data = {}) =>
  Object.keys(data).reduce((acc, key) => {
    acc.push(key + ': ' + data[key]);
    return acc;
  }, []);

/**
 * Collects value asked by the specification in the data object.
 * @param {Object} [data = {}] - Data coming from the API response
 * @param {Object} [spec = {}] - Specification defining the YAML Front Matter shape
 * @return {Object}
 */
const pickValues = (response = {}, spec = {}) =>
  Object.keys(spec).reduce((acc, key) => {
    const value = spec[key];

    if (!value || value === true) {
      acc[key] = get(response, key, '');
    } else if (typeof value === 'function') {
      acc[key] = value(response);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

/**
 * Generates a YAML Front Matter from an API response and a type-specific YAML
 * Front Matter specification.
 * @param {Object} [response = {}] - Data coming from the API response
 * @param {Object} [spec = {}] - Specification defining the YAML Front Matter shape
 * @return {String}
 */
const yfmer = compose(
  wrapFrontMatter,
  generateFrontMatter,
  pickValues
);

module.exports = yfmer;
