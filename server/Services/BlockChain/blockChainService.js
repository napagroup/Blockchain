var http = require('http');
var extend = require('extend');
var blocks = require('blockchain.info/blockexplorer');
var q = require('q');

var getBlocksFromBlockChain = function(successCallback, failCallback) {
    var d = new Date();
    var timeInMilliseconds = d.getTime();
    var responseString = '';
    var promises = [];

    blocks.getBlocks(timeInMilliseconds).then(function(data){                         
        var jsonBlockDetailsData = {};
        jsonBlockDetailsData.listofblocks = [];
        for (var i=0; i< 6; i++) {
            promises.push(blocks.getBlock(data.blocks[i].hash));
        }
        
        return q.all(promises).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                jsonBlockDetailsData.listofblocks.push(data[i]);                
            }
            return successCallback(jsonBlockDetailsData);
        });
    });    
};

var getInfoFromBlockChain = function(successCallback, failCallback) {
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

var getTransactionsFromBlockchain = function(successCallback, failCallback) {
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

module.exports = {
    getInfoFromBlockChain: getInfoFromBlockChain,
    getChartInfo: getChartInfoFromBlockChain,
	getTransactions: getTransactionsFromBlockchain,
    getBlocksFromBlockChain : getBlocksFromBlockChain
};
