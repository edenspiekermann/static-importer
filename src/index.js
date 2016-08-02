const importer = require('./importer')

/**
 * Prepares importer with given configuration and returns a function to import
 * asked content types from the API.
 * @access public
 * @param {Object} options - Configuration object
 * @param {String} options.endpoint - API endpoint
 * @param {String} [options.dest = __dirname] - Destination base folder (then dispatched by content types)
 * @param {Object[]} options.contentTypes - Content types to be imported and their configuration
 * @throws Throws an error if `options.endpoint` is not defined.
 * @return {Function}
 */
const _ = (options = {}) => {
  if (!options.endpoint) {
    throw new Error('The `endpoint` setting is mandatory.');
  }

  return importer(options);
};

module.exports = _;
