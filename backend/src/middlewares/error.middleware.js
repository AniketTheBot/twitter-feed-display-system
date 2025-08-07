import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      success: false,
      errors: err.errors,
    });
  }

  // For all unexpected errors we send a generic 500 server error
  return res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
    success: false,
    errors: [],
  });
};

export { errorHandler };
