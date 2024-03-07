const express = require('express');
const app = express();

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

