class ValidationError extends Error {
  constructor(message, errorDetails) {
    super(message);
    this.name = "ValidationError";
    this.errorDetails = errorDetails;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
  }
}

class DbConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "DbConnectionError";
  }
}

module.exports = {
  ValidationError, 
  AuthorizationError, 
  DbConnectionError
};
