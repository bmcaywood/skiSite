// importing modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var PubNub = require('pubnub');

// Import keys
var pubnubKey = require('./keys/pubnub');

pubnub = new PubNub(pubnubKey);

var publishConfig = {
    channel: "anotherTest",
    message: { name: "george", id: 'test' }
}

pubnub.publish(publishConfig, function(status, response) {
    console.log(status, response);
});

pubnub.addListener({
    message: (m) => {
        console.log(m);
    }
});

('response', (message) => {
    console.log(message);
});

pubnub.subscribe({
    channels: ['response']
});


var app = express();

// port number
const port = 8080;

app.get('/', (req, res) => {
    res.send('Testing');
})

app.listen(port, () => {
    console.log('Server started at port: ' + port);
})