/**
 * Wrapper for async route handlers to catch errors and pass them to the global error handler.
 */
const asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncWrapper;
