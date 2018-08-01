var express = require('express');
var app = express();


var text = "Hier könnte Ihre Werbung stehen und zwar die neuste";
var background = "red";

app.use(function(req, res, next) {
    var allowedOrigins = ['192.168.1.126:3000', 'localhost:3000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    return next();
});


app.get('/api/post', function (req, res) {
    console.log('GET /');
    res.write(JSON.stringify({
        "text": text,
        "background" : background
    }));
    res.end();
});

app.post('/api/post', function (req, res) {
    console.log('POST /');
    req.on('data', (chunk) => {
        console.log(JSON.parse(chunk));
        text = JSON.parse(chunk).text;
        background = JSON.parse(chunk).background;
        // console.log(background);
    });

    res.end('thanks');
});

port = 8080;
app.listen(port);
console.log('Listening at http://localhost:' + port)