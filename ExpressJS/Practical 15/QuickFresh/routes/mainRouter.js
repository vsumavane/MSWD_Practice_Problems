const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to QuickFresh');
});

router.get('/about', (req, res) => {
    res.send('<h3>We are Vadodara\'s most trusted grocery delivery service</h3>');
});

router.get('/contact', (req, res) => {
    res.json({
        "email": "hello@quickfresh.com",
        "instagram": "http://instagram.com/quickfresh"
    });
});

module.exports = router;