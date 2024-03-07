const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET request to the product page');
});

router.post('/', (req, res) => {
    res.send('POST request to the product page');
});

router.put('/', (req, res) => {
    res.send('PUT request to the product page');
});

router.delete('/', (req, res) => {
    res.send('DELETE request to the product page');
});

module.exports = router;