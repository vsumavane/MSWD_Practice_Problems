/**
 * Express route to handle requests with a positive integer parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const positiveIntegerHandler = (req, res, next) => {
    const number = parseInt(req.query.number);

    if (!Number.isInteger(number) || number <= 0) {
        const error = new Error('Number must be a positive integer');
        error.status = 400;
        next(error); // Pass the error to the error handling middleware
    } else {
        res.send('Success: Number is a positive integer');
    }
};

/**
 * Error handling middleware for handling specific errors
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
};

// Example usage:
// Assuming you have created an Express app instance called "app"
app.get('/positive', positiveIntegerHandler);
app.use(errorHandler);
