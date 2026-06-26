import { errorResponse } from '../utils/apiResponse.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      { body: req.body, query: req.query, params: req.params },
      { abortEarly: false, allowUnknown: true }
    );

    if (error) {
      const formattedErrors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      return res.status(400).json(errorResponse('Validation error', formattedErrors));
    }

    next();
  };
};
