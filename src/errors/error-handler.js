const { AuthenticationError, DuplicateEntityError, UnverifiedUserError } = require('./db-errors');
const { ValidationError, AuthorizationError, DbConnectionError, UserSessionExpiredError } = require('./api-errors');

function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) return res.status(400).json({ validationErrors: err.errorDetails });
  if (err instanceof AuthenticationError) return res.status(401).json({ authenticationError: err.message });
  if (err instanceof AuthorizationError) return res.status(401).json({ authorizationError: err.message });
  if (err instanceof UserSessionExpiredError) return res.status(401).json({ userSessionExpiredError: err.message });
  if (err instanceof DuplicateEntityError) return res.status(409).json({ duplicateEntityError: err.message });
  if (err instanceof UnverifiedUserError) return res.status(403).json({ unverifiedUserError: err.errorDetails });
  if (err instanceof DbConnectionError) return res.status(503).json({ dbConnectionError: err.message });
  next();
}

module.exports = {
  errorHandler
}
