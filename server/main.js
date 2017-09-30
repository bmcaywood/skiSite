// importing modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var PubNub = require('pubnub');
var app = express();
var server = require('http').createServer();

var { Client } = require('pg');
var format = require('pg-format');
var pgKey = require('./keys/pg');

var client = new Client(pgKey);
client.connect();

client.query('SELECT * from rating_type;', (err, res) => {
    console.log(err, res);
    client.end;
});

// Import keys
//var pubnubKey = require('./keys/pubnub');

//pubnub = new PubNub(pubnubKey);

//require('./controllers/pubnub')(pubnub, client, format);

require('./controllers/socket')(app, server, client, format);


// port number
const port = 8080;

app.get('/', (req, res) => {
    res.send('Testing');
})

app.listen(port, () => {
    console.log('Server started at port: ' + port);
})