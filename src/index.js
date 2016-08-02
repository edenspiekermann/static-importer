const importer = require('./importer');

const _ = (options = {}) => {
  if (!options.handle) {
    throw new Error('The `handle` setting is mandatory.');
  }

  const types = Object.keys(options.contentTypes || {});

  if (types.length === 0) {
    console.log('You need to specify which `contentTypes` should be imported, and how.');
    return Promise.resolve();
  }

  return Promise.all(types.map((type) =>
    importer(type, options))
  );
};

module.exports = _;
