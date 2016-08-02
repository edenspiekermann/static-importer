const template = (input, values = {}) =>
  Object.keys(values).reduce((acc, key) =>
    acc.replace(new RegExp('{' + key + '}', 'g'), values[key])
  , input)

module.exports = template
