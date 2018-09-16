var express = require('express');
var app = express();
var superagent = require('superagent');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const storage = require('node-persist');

var text = "Hier könnte Ihre Werbung stehen und zwar die neuste";
var background = "darkgreen";
var fontcolor = "white";

const defaultMessage = {
    text, background, fontcolor
};

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

app.get('/api/random-sentence', (req, res) => {
    console.log('get Sentence /');

    function getRandomNumber() {
        return Math.floor(Math.random() * Math.floor(50));
    }

    const url = "http://www.smartphrase.com/cgi-bin/randomphrase.cgi?german&humorous&normal&" + getRandomNumber() + "&" + getRandomNumber() + "&" + getRandomNumber() + "&" + getRandomNumber() + "&" + getRandomNumber() + "&" + getRandomNumber();
    console.log(url);
    superagent
        .get(url)
        .query(null)
        .set('Accept', 'Accept: text/html')
        .end((error, response) => {
            if (error) {
                return;
            }
            const dom = new JSDOM(response.res.text);
            const randomText = (dom.window.document.body.querySelectorAll("td")[6].textContent);
            let text;
            if (randomText.indexOf("!") > 0) {
                text = randomText.split("!")[0];
            }
            else if (randomText.indexOf("?") > 0) {
                text = randomText.split("?")[0];
            }
            else if (randomText.indexOf(".") > 0) {
                text = randomText.split(".")[0];
            }
            res.write(JSON.stringify({randomSentence: text}));
            res.end();
        });

});

app.get('/api/sonos/*', (req, res) => {
    const sonosCall = req.url.replace('/api/sonos', '');
    const sonosUrl = 'http://localhost:5005' + sonosCall;

    console.log("Sonos call: " + sonosUrl);

    superagent
        .get(sonosUrl)
        .end((error, response) => {
            if (error) {
                res.write("Sonos Problem:" + JSON.stringify(error.body));
                res.status(error.status);
                res.end();
            } else {
                res.write(JSON.stringify(response.text));
                res.end();
            }
        });
});

port = 8080;
app.listen(port);
console.log('Listening at http://localhost:' + port);
