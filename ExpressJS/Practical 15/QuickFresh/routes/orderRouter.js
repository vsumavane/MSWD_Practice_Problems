const express = require('express');

const orderRouter = express.Router();

orderRouter.get('/', (req, res) => {
    res.send('GET request to the order page');
});

orderRouter.post('/', (req, res) => {
    res.send('POST request to the order page');
});

orderRouter.put('/', (req, res) => {
    res.send('PUT request to the order page');
});

orderRouter.delete('/', (req, res) => {
    res.send('DELETE request to the order page');
});

module.exports = orderRouter;