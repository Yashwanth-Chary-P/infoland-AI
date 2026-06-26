import { errorResponse } from '../utils/apiResponse.js';
import logger from '../utils/logger.js';

export const globalErrorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack, path: req.path, method: req.method });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(errorResponse(message, err.errors));
};
