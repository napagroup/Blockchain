var http = require('http');
var extend = require('extend');
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
};

var getChartInfoFromBlockChain = function(args){
    var queryContext = { };
    extend(queryContext, args);
    console.log(queryContext);
    var url = 'blockchain.info';
    var path = '/charts/' + queryContext.chartType + '?format=json';

    var options = {
        host: url,
        path: path
    };

    http.get(options, function(res) {
        var responseString = '';
        res.on('data', function(data){
            responseString += data;
        });
        res.on('end', function(){
            queryContext.successCallback(JSON.parse(responseString));
        });
    }).on('error', function(err){
        queryContext.failCallback(err);
    });
};

module.exports = {
    getInfoFromBlockChain: getInfoFromBlockChain,
    getChartInfo: getChartInfoFromBlockChain
};
