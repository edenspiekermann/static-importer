const { writeFile } = require('fs-promise');
const path = require('path');
const yfmer = require('./yfmer');
const { template } = require('./utils');
const { DEFAULT_DEST } = require('./constants');

/**
 * Creates files based on response entities and global configuration.
 * @param {Object[]} entities - Entities from the API response
 * @param {Object} config - Type configuration
 * @return {Promise}
 */
const createFiles = (entities, config) =>
  Promise.all(entities.map((entity) => createFile(entity, config)));

/**
 * Create a file based on response entity and global configuration.
 * @param {Object} entity - Entity from the API response
 * @param {Object} config - Type configuration
 * @return {Promise}
 */
const createFile = (entity, config) =>
  writeFile(
    getFilePath(entity, config),
    getFileContent(entity, config.yfm)
  );

/**
 * Gets the contents to be written in the generated file, including the YAML
 * Front Matter.
 * @param {Object} entity - Entity from the API response
 * @param {Object} [yfmSpec = {}] - Front matter specification for the type
 * @return {String}
 */
const getFileContent = (entity, yfmSpec = {}) =>
  yfmer(entity, yfmSpec) + entity.content;

/**
 * Gets the destination for the generated file.
 * @param {Object} entity - Entity from the API response
 * @param {Object} config - Type configuration
 * @return {String}
 */
const getFilePath = (entity, config) => {
  const dest = config.dest || DEFAULT_DEST;

  if (typeof dest === 'function') {
    return dest(entity);
  }

  return template(dest, entity);
}

module.exports = createFiles;
