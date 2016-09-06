//SERVER SPECIFIC
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http)
var port = 12505;
var packageJSON = require('./package.json');



//BLOCKCHAIN.INFO SOCKET MODULE
var Socket = require('blockchain.info/socket');
var mySocket = new Socket();
mySocket.onOpen(function(data){
	 console.log('connected to blockchain.info websockets')
});
mySocket.onTransaction(function(data){
	var now = new Date();
	data.serverTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();
	io.emit('newTransaction', data);
});
mySocket.onBlock(function(data){
	console.log('new block ' + data);
	io.emit('newBlock', data);
});

//APPLICATION SPECIFIC
var bitCoinController = require('./server/Controllers/BitCoin/bitCoinController.js');

//WEBAPI SETTINGS
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//STARTING SERVER
http.listen(port, function(){
			console.log(packageJSON.name + ' version ' + packageJSON.version + ' started.');
});



//ROUTES
app.use('/', express.static('./client/compiled'));
app.get('/api/bitCoin/browse', bitCoinController.browseBitCoin);
app.get('/api/bitCoin/chart', bitCoinController.getChartInfo);

//ESTABLISHED A WEBSOCKET CONNECTION TO THE CLIENT
io.on('connection', function (socket) {
  console.log('client connected.');
  //socket.emit('news', { hello: 'world' });
  //socket.on('my other event', function (data) {
//    console.log(data);
  //});
});
