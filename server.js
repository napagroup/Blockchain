//SERVER SPECIFIC
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http)
var port = 12505;





//BLOCKCHAIN.INFO
var Socket = require('blockchain.info/socket');
var mySocket = new Socket();
mySocket.onTransaction(function(data){
	//console.log(data)

	 // var fs = require('fs');
	 // stringdata = JSON.stringify(data);
	 // fs.writeFile("log.txt", stringdata, function(err) {
     // if(err) {
         // return console.log(err);
     // }
		 // console.log("the log file was saved!");
	 // }); 

	io.emit('news', data);
});
	
	
	
//APPLICATION SPECIFIC
var bitCoinController = require('./server/Controllers/BitCoin/bitCoinController.js');



//TEST CONTROLLER
// app.get('/test', function(req, res) {
	// res.send(http);
	
// });


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

http.listen(port, function(){
			console.log('bitcoint server started.')
	
	
});



app.use('/', express.static('./client/compiled'));
app.get('/api/bitCoin/browse', bitCoinController.browseBitCoin);
app.get('/api/bitCoin/chart', bitCoinController.getChartInfo);
//app.get('/api/bitCoin/transactions', bitCoinController.getTransactions);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


// setInterval(function(){
  // //console.log('Calling BLOCKCHAIN.INFO to GET DATA');
  
  
  // var newdata = false;
	// if(newdata){
		// io.emit('news', data);
	// }  
// }, 1000);   


