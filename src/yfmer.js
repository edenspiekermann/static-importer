const { compose } = require('lodash/fp')
const { get } = require('lodash')

const FRONT_MATTER_DELIMITER = '---'

const wrapFrontMatter = (frontMatter) =>
  [FRONT_MATTER_DELIMITER]
    .concat(frontMatter)
    .concat(FRONT_MATTER_DELIMITER)
    .concat('')
    .join('\n');

const generateFrontMatter = (data) =>
  Object.keys(data).reduce((acc, key) => {
    acc.push(key + ': ' + data[key]);
    return acc;
  }, []);

const pickValues = (object = {}, spec = {}) =>
  Object.keys(spec).reduce((acc, key) => {
    const value = spec[key]

    if (!value) {
      acc[key] = get(object, key, '')
    } else if (typeof value === 'function') {
      acc[key] = value(object)
    } else {
      acc[key] = value
    }

    return acc;
  }, {});

const getFrontMatter = compose(
  wrapFrontMatter,
  generateFrontMatter,
  pickValues
)

const yfmer = getFrontMatter

module.exports = yfmer
