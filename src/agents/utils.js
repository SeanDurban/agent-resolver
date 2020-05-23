/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const config = require('../config.json');

// Basic regex used to find {{data}} instances in strings for interpolation
const regex = /{{[A-Z, a-z, 0-9, \-, _, ~, .]+(\.[A-Z, a-z, 0-9, \-, _, ~, .],+)*}}/g;

// No trivial way to generically access nested property of js object with a string
// eg) "location.city" would be obj["location"]["city"]
// This function uses the reduce function with the path string to step into given object
function getNestedProperty(object, path) {
  if (object == null || path == null || typeof path !== 'string') {
    return null;
  }
  return path
    .split('.')
    .reduce((object, property) => (object == null ? null : object[property]), object);
}

// Replaces hardcoded objects with relevant data in given string
// expects {{object.property}} format that matches above regex
// Returns new string with values replaced (if exists in data, otherwise empty string)
function interpolateString(string, data) {
  if (string == null || typeof string !== 'string') {
    return '';
  }
  const matches = string.match(regex);
  if (matches) {
    matches.forEach((match) => {
      const stringReference = match.substring(config.noBraces, match.length - config.noBraces);
      const dataValue = getNestedProperty(data, stringReference);
      // Assumed objects are not parsed. eg) if "location" should it be [object Object]
      const newValue = dataValue || '';

      string = string.replace(match, newValue);
    });
  }
  return string;
}

module.exports = { interpolateString, getNestedProperty };
