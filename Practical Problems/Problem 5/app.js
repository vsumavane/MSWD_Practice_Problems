/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const greetHandler = (req, res) => {
    const name = req.query.name;
    const greeting = name ? `Namaskar, ${name}!` : "Namaskar, Guest!";
    res.send(greeting);
};

// Example usage:
// Assuming you have created an Express app instance called "app"
app.get('/greet', greetHandler);
