const express = require('express');
const router = express.Router();

// Sample product list
let productList = [
    { id: 11, name: "Eggs", price: 30, availableQty: 50 },
    { id: 12, name: "Flour", price: 180, availableQty: 3 },
    { id: 14, name: "Butter", price: 70, availableQty: 100 },
    { id: 15, name: "Chocolate", price: 100, availableQty: 20 }
];

// Route to get all products or filter by name and maxPrice
router.get('/', (req, res) => {
    let result = productList;

    if (req.query.name) {
        result = result.filter(product => product.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }

    if (req.query.maxPrice) {
        const maxPrice = parseFloat(req.query.maxPrice);
        result = result.filter(product => product.price <= maxPrice);
    }

    res.json(result);
});

module.exports = router;