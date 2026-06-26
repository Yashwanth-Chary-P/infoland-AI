import { errorResponse } from '../utils/apiResponse.js';

export const notFoundHandler = (req, res, next) => {
  res.status(404).json(errorResponse('Route not found'));
};
