import { useState } from "react";

/**
 * Checks if the value contains only letters and numbers.
 *
 * @param {string} value - Tested value.
 * @param {number} maxLength - Maximum length allowed.
 * @returns {boolean} - Returns "true" if the string is valid and within character limit.
 */
const validateString = (value, maxLength) => {
  const regexp = new RegExp(`^[A-Za-z]{3,${maxLength}}$`);

  if (typeof value === "string" && value.match(regexp) !== null) {
    return true;
  }

  throw Error(`Must be 3-${maxLength} characters and contain only letters.`);
};

/**
 * Checks if the value contains allowed symbols.
 *
 * @param {string} value - Tested calue.
 * @param {number} maxLength - Maximum length allowed.
 * @returns {boolean} - Returns "true" if the string is valid and within character limit.
 */
const validateText = (value, maxLength) => {
  const regexp = new RegExp(`^[\\w\\d\\s/-]{5,${maxLength}}$`);

  if (typeof value === "string" && value.match(regexp) !== null) {
    return true;
  }

  throw Error(`Must be 5-${maxLength} characters and can't contain special characters.`);
};

const validate = (value, { type, maxLength }) => {
  switch (type) {
  case "string":
    return validateString(value, maxLength);
  case "text":
    return validateText(value, maxLength);
  default:
    return false;
  }
};

export default function useValidation() {
  const [validation, setValidation] = useState({});

  const handleValidation = ({ name, params, value }) => {
    try {
      const result = validate(value, params);

      setValidation({
        ...validation,
        [name]: { result }
      });
    } catch ({ message }) {
      setValidation({
        ...validation,
        [name]: { result: false, message }
      });
    }
  };

  return [validation, handleValidation];
}
