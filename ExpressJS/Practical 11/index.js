const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    let logData = `Received a request on ${Date.now()} at ${req.url}\n`;
    fs.appendFile('log.txt', logData, (err) => {
        if (err) throw err;
    });
    switch (req.url) {
        case '/':
            res.end("Welcome to BarterX");
            break;
        case '/products':
            res.end("Here are the products up for sale in BarterX");
            break;
        case '/login':
            res.end("Login to BarterX");
            break;
        case '/signup':
            res.end("Sign up to the BarterX");
            break;
        case '/profile':
            res.end("Trader Profile");
            break;
        case '/cart':
            res.end("Your Shopping Cart is here");
            break;
        case '/checkout':
            res.end("Let's start shipping");
            break;
        case '/orders':
            res.end("Your Orders are here");
            break;
        case '/categories':
            res.end("Browse Categories");
            break;
        case '/chat':
            res.end("Your Chat with fellow Traders");
            break;
        case '/contact':
            res.end("Contact Us at");
            break;
        case '/about':
            res.end("The modern approach to trading our commodities");
            break;
        default:
            res.end("Page not found");
    }
});

let myPort = 8000;
myServer.listen(myPort, () => {
    console.log(`Server started on port ${myPort}...`);
});
