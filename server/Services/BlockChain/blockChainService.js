var http = require('http');

var getInfoFromBlockChain = function(successCallback, failCallback) {
    //var url = 'https://blockchain.info/stats?format=json';
    var url = 'blockchain.info';
    var path = '/stats?format=json';
    
    var options = {
        host: url,
        path: path
    };
    
//    successCallback('Im here');
    http.get(options, function(res) {
        //res.setEncoding('utf-8');

        var responseString = '';
        res.on('data', function(data) {
          responseString += data;
        });
        res.on('end', function() {                   
            successCallback(JSON.parse(responseString));
            });
    }).on('error', function (err) {
        failCallback(err);
    });
}

module.exports = {
    getInfoFromBlockChain: getInfoFromBlockChain
};