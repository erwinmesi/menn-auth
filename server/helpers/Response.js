module.exports = {
  expectedError(name, message) {
    return {
      error: {
        isExpected: true,
        name,
        message
      }
    };
  }
};
