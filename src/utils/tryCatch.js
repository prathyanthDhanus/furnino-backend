// tryCatchMiddleware.js
const AppError = require('../utils/appError');

const tryCatchMiddleware = (controller) => {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        // Check if the error is an instance of AppError
        if (error instanceof AppError) {
          res.status(error.StatusCode).json({
            status: "failure",
            message: error.ErrorMessage,
          });
        } else {
          // Generic error handling for unexpected errors
          res.status(500).json({
            status: "failure",
            message: "Something went wrong",
            error_message: error.message,
          });
        }
      }
    };
  };
  
  module.exports = tryCatchMiddleware;
  