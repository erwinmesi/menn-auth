var sentenceCase = require('sentence-case');
export const toArray = details => {
  return details.map(({ message }) => sentenceCase(message));
};
