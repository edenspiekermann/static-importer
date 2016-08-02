const { get } = require('lodash');

const parseResponse = (response, key) => {
  const data = JSON.parse(response);
  return get(data, key, data);
};

module.exports = parseResponse;
