/**
 * Computes the API URL based on the API endpoint and the given type.
 * @param {String} endpoint - API endpoint
 * @param {String} [type = ''] - Requested content type (e.g. `posts`)
 * @return {String}
 */
const getApiUrl = (endpoint, type = '') =>
  type
    ? endpoint + '/' + type
    : endpoint;

module.exports = getApiUrl;
