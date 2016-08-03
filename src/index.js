const importer = require('./importer')
const {
  DEFAULT_DEST,
  DEFAULT_FILENAME,
  DEFAULT_RESPONSE_PATH
} = require('./constants');

/**
 * Adds defaults to a content type in case they don’t have the required values.
 * @param {Object} type - Type configuration
 * @return {Object}
 */
const mergeDefaults = (type) => 
  Object.assign({
    dest: DEFAULT_DEST,
    filename: DEFAULT_FILENAME,
    responsePath: DEFAULT_RESPONSE_PATH
  }, type)

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

  options.contentTypes = contentTypes.map(mergeDefaults);

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
