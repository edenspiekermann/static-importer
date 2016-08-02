const { get } = require('lodash');

/**
 * Parses a JSON response and retrieve only the necessary section.
 * @param {String} response - JSON response
 * @param {String} key - Path to relevant section in JSON response
 * @return {*}
 */
const parseResponse = (response, key) => {
  const data = JSON.parse(response);
  return get(data, key, data);
};

module.exports = parseResponse;
