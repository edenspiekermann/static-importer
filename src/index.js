const importer = require('./importer')

/**
 * Validates the initialisation options.
 * @param {Object} options - Configuration object
 * @return {Object}
 * @throws Throws an error if some content types do not have an endpoint
 * @throws Throws an error if some content types do not have a name
 */
const validateOptions = (options) => {
  const { contentTypes } = options;

  if (!contentTypes) {
    throw new Error('The `contentTypes` setting is mandatory.');
  }

  const haveName = contentTypes.every(t => t.name);

  if (!haveName) {
    throw new Error('Some content types do not have a `name`.')
  }

  const haveEndpoint = contentTypes.every(t => t.endpoint);

  if (!haveEndpoint) {
    throw new Error('Some content types do not have an `endpoint`.')
  }

  return options;
}

/**
 * Prepares importer with given configuration and returns a function to import
 * asked (or all) content types from the API.
 * @access public
 * @param {Object} options - Configuration object
 * @param {Object[]} options.contentTypes - Content types configuration
 * @return {Function}
 */
const staticImporter = (options = {}) => {
  const { contentTypes } = validateOptions(options);
  return importer(contentTypes);
};

module.exports = staticImporter;
