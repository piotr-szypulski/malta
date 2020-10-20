/**
 * Splits camel case string into separate words.
 * ex. someCamelCaseString -> some Camel Case String
 *
 * @param {string} string - String you want to split.
 */
export const splitCamelCase = string => string.replace(/([a-z])([A-Z0-9])/g, "$1 $2");

/**
 * Checks if provided object has no properties.
 *
 * @param {object} obj - Valid object.
 */
export const isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;
