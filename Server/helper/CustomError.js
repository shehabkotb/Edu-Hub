class CustomError extends Error {
    constructor(statusCode, message, errors) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
    }
  }
  
  module.exports = CustomError;
  