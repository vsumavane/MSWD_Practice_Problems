const express = require('express');
const app = express();
const path = require('path');


app.listen(9000, function () {
    console.log('Server running on http://localhost:9000')
})

app.get('/', function (req, res) {
    res.send('Welcome to QuickFresh')
})

app.get('/about', function (req, res) {
    res.send('<h3>We are Vadodara\'s most trusted grocery delivery service</h3>')
})

app.get('/contact', function (req, res) {
    res.json({
        "email": "hello@quickfresh.com",
        "instagram": "http://instagram.com/quickfresh"
    })
})

let orderList = [
    { id: 1, product: 'Apples', quantity: 2 },
    { id: 2, product: 'Bananas', quantity: 1 },
    { id: 3, product: 'Milk', quantity: 3 }
];

app.get('/orders', function (req, res) {
    res.json(orderList);
});

app.get('/orders/:orderID', function (req, res) {
    const orderID = parseInt(req.params.orderID);
    const order = orderList.find(o => o.id === orderID);

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).send('Order Not Found');
    }
});

let productList = [
    { id: 11, name: "Eggs", price: 30, availableQty: 50 },
    { id: 12, name: "Flour", price: 180, availableQty: 3 },
    { id: 14, name: "Butter", price: 70, availableQty: 100 },
    { id: 15, name: "Chocolate", price: 100, availableQty: 20 }
];

app.get('/products', function (req, res) {
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

let shoppingCart = [];

app.get('/cart', function (req, res) {
    res.json(shoppingCart);
});

app.post('/cart', express.json(), function (req, res) {
    const { id, name, price, qty } = req.body;
    if (id && name && price && qty) {
        shoppingCart.push({ id, name, price, qty });
        res.status(200).send('Item added to cart');
    } else {
        res.status(400).send('Please provide all the required fields');
    }
});

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const datetime = new Date().toISOString();
    const method = req.method;
    const path = req.path;
    console.log(`${datetime} | ${method} | ${path}`);
    next();
});

app.use('*', (req, res) => {
    res.status(404).send("We don't have this page yet!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sorry! Something went wrong');
});