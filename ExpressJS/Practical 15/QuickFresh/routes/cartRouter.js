const express = require('express');

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    res.send('GET request to the cart');
});

cartRouter.post('/', (req, res) => {
    res.send('POST request to the cart');
});

cartRouter.put('/', (req, res) => {
    res.send('PUT request to the cart');
});

cartRouter.delete('/', (req, res) => {
    res.send('DELETE request to the cart');
});

module.exports = cartRouter;