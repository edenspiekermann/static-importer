const {
  DEFAULT_DEST,
  DEFAULT_FILENAME,
  DEFAULT_RESPONSE_PATH
} = require('../constants');

/**
 * Adds defaults to a content type in case they don’t have the required values.
 * @param {Object} type - Type configuration
 * @return {Object}
 */
const addTypeDefaults = (type) => 
  Object.assign({
    dest: DEFAULT_DEST,
    filename: DEFAULT_FILENAME,
    responsePath: DEFAULT_RESPONSE_PATH
  }, type)


module.exports = addTypeDefaults
