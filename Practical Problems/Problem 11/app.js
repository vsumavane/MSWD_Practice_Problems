const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);

    // Set the status code based on the error type
    const statusCode = err.statusCode || 500;

    // Send an error response to the client
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
};

module.exports = errorHandler;
