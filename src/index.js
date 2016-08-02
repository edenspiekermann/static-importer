const importer = require('./importer')

/**
 * Prepares importer with given configuration and returns a function to import
 * asked content types from the WordPress API.
 * @access public
 * @param {Object} options - Configuration object
 * @param {String} options.handle - WordPress handle, used as part of API URL
 * @param {String} [options.dest = __dirname] - Destination base folder (then dispatched by content types)
 * @param {Object} options.contentTypes - Content types to be imported and their configuration
 * @throws Throws an error if `options.handle` is not defined.
 * @return {Function}
 */
const _ = (options = {}) => {
  if (!options.handle) {
    throw new Error('The `handle` setting is mandatory.');
  }

  const types = Object.keys(options.contentTypes || {});

  if (types.length === 0) {
    console.log('You need to specify which `contentTypes` should be imported, and how.');
  }

  const _import = () =>
    Promise.all(types.map((type) =>
      importer(type, options)
    ));

  return {
    import: _import
  }
};

module.exports = _;
