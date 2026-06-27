/**
 * Formats successful API responses.
 * 
 * @param {boolean} success - Whether the request was successful
 * @param {string} message - A descriptive message
 * @param {any} data - The payload
 * @param {object} [pagination] - Pagination metadata if applicable
 * @returns {object} Formatted response object
 */
export const successResponse = (message, data = null, pagination = null) => {
  return {
    success: true,
    message,
    data,
    pagination,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Formats error API responses.
 * 
 * @param {string} message - A descriptive error message
 * @param {any} [errors] - Detailed error info or validation errors
 * @returns {object} Formatted error response object
 */
export const errorResponse = (message, errors = []) => {
  return {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };
};
