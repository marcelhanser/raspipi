var express = require('express');
var app = express();
const storage = require('node-persist');

var text = "Hier könnte Ihre Werbung stehen und zwar die neuste";
var background = "darkgreen";
var fontcolor = "white";

const defaultMessage = {
    text, background, fontcolor
}

storage.init();


app.use((req, res, next) => {
    var allowedOrigins = ['192.168.1.126:3000', 'localhost:3000'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    return next();
});


app.get('/api/post', async (req, res) => {
    console.log('GET /');
    let message = await storage.getItem('message');
    res.write(JSON.stringify(
        message ? message : defaultMessage
    ));
    res.end();
});

app.post('/api/post', (req, res) => {
    console.log('POST /');

    req.on('data', (chunk) => {
        console.log(JSON.parse(chunk));
        let message = JSON.parse(chunk);
        storage.setItem('message', message);
    });

    res.end('thanks');
});

port = 8080;
app.listen(port);
console.log('Listening at http://localhost:' + port)