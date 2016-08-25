var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var bitCoinController = require('./server/Controllers/BitCoin/bitCoinController.js');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

http.createServer(app).listen(12505);

app.use('/', express.static('./client/compiled'));
app.get('/api/bitCoin/browse', bitCoinController.browseBitCoin);