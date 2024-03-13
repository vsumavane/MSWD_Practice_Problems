const express = require('express');
const router = express.Router();

// Sample shopping cart
let shoppingCart = [];

// Route to get the contents of the shopping cart
router.get('/', (req, res) => {
    res.json(shoppingCart);
});

// Route to add an item to the shopping cart
router.post('/', express.json(), (req, res) => {
    const { id, name, price, qty } = req.body;

    if (id && name && price && qty) {
        shoppingCart.push({ id, name, price, qty });
        res.status(200).send('Item added to cart');
    } else {
        res.status(400).send('Please provide all the required fields');
    }
});

module.exports = router;
