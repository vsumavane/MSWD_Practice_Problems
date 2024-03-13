const express = require('express');
const router = express.Router();

// Sample order list
let orderList = [
    { id: 1, product: 'Apples', quantity: 2 },
    { id: 2, product: 'Bananas', quantity: 1 },
    { id: 3, product: 'Milk', quantity: 3 }
];

// Route to get all orders
router.get('/', (req, res) => {
    res.json(orderList);
});

// Route to get a specific order by ID
router.get('/:orderID', (req, res) => {
    const orderID = parseInt(req.params.orderID);
    const order = orderList.find(o => o.id === orderID);

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).send('Order Not Found');
    }
});

module.exports = router;
