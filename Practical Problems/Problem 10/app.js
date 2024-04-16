const express = require('express');
const app = express();

// Create an in-memory cache to store request counts for each IP address
const requestCounts = new Map();

// Rate-limiting middleware for Express
const rateLimitMiddleware = (req, res, next) => {
    const ip = req.ip; // Get the IP address of the requester

    // Increase the request count for the IP address
    const count = requestCounts.get(ip) || 0;
    requestCounts.set(ip, count + 1);

    // Check if the request count exceeds the limit (e.g., 5 requests per minute)
    const limit = 5;
    if (count >= limit) {
        return res.status(429).send('Too Many Requests');
    }

    // Allow the request to proceed
    next();
};

// Apply rate-limiting middleware to all routes
app.use(rateLimitMiddleware);

// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
