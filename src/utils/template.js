/**
 * Replaces curly-brackets wrapped tokens in a string with matching values
 * passed in second argument.
 * @param {String} input
 * @param {Object} [values = {}] - Object where keys matches input tokens
 * @return {String}
 */
const template = (input, values = {}) =>
  Object.keys(values).reduce((acc, key) =>
    acc.replace(new RegExp('{' + key + '}', 'g'), values[key])
  , input);

module.exports = template;
