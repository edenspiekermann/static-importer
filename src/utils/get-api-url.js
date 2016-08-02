const BASE_API_URL = 'https://public-api.wordpress.com/rest/v1.1/';

/**
 * Computes the API URL based on the WordPress handle and the content type.
 * @param {String} handle - WordPress handle
 * @param {String} [type = ''] - Requested content type (e.g. `posts`)
 * @return {String}
 */
const getApiUrl = (handle, type = '') => {
  if (!handle) {
    return BASE_API_URL;
  }

  const url = BASE_API_URL +
    'sites/' +
    handle +
    '.wordpress.com';

  if (type) {
    return url + '/' + type;
  }

  return url;
};

module.exports = getApiUrl;
