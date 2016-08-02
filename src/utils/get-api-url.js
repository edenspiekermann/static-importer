const BASE_API_URL = 'https://public-api.wordpress.com/rest/v1.1/'

const getApiUrl = (handle, type = '') => {
  if (!handle) {
    return BASE_API_URL
  }

  const url = BASE_API_URL
    + 'sites/'
    + handle
    + '.wordpress.com'

  if (type) {
    return url + '/' + type
  }

  return url
}

module.exports = getApiUrl
