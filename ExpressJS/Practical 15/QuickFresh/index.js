const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');

app.listen(9000, function () {
    console.log('Server running on http://localhost:9000');
});

// Mount the router objects at the relevant paths using the router middleware
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

// Static file serving middleware
app.use('/assets', express.static('public'));

// Middleware for logging
app.use((req, res, next) => {
    const datetime = new Date().toISOString();
    const method = req.method;
    const path = req.path;
    console.log(`${datetime} | ${method} | ${path}`);
    next();
});

// Catch-all route
app.use('*', (req, res) => {
    res.status(404).send("We don't have this page yet!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sorry! Something went wrong');
});
