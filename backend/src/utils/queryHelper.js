/**
 * Helper to build pagination parameters from request query
 * @param {object} query - Express request query object
 * @returns {object} { limit, skip, page }
 */
export const getPagination = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  return { limit, skip, page };
};

/**
 * Helper to format pagination metadata for responses
 * @param {number} total - Total number of documents
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {object} Pagination metadata
 */
export const getPaginationMeta = (total, page, limit) => {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };
};

/**
 * Helper to build standard filters based on allowed fields
 * @param {object} query - Express request query object
 * @param {array} allowedFields - Array of allowed filter fields
 * @returns {object} MongoDB filter object
 */
export const buildFilter = (query, allowedFields) => {
  const filter = {};
  allowedFields.forEach((field) => {
    if (query[field]) {
      filter[field] = query[field];
    }
  });
  return filter;
};

/**
 * Helper to build sorting parameters
 * @param {object} query - Express request query object
 * @param {string} defaultSort - Default sort field
 * @returns {object} MongoDB sort object
 */
export const buildSort = (query, defaultSort = '-createdAt') => {
  if (query.sort) {
    return query.sort.split(',').join(' ');
  }
  return defaultSort;
};
