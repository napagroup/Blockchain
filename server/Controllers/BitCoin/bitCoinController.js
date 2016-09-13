var blockChainService = require('../../Services/BlockChain/blockChainService.js');


var getBlocksFromBlockChain = function(req, res){    
    var jsonBlockDetailsData = {};    
    jsonBlockDetailsData.listofblocks = [];
    var blocks = [];
                    
    blockChainService.getBlocksFromBlockChain(
        function(data) {            
            res.json(data);                        
        },
        function(err) {
            res.status(500).json({error: err});
        }
    );
    
}

var browseBitCoin = function (req, res) {
    blockChainService.getInfoFromBlockChain(
            function (data) {
                res.json(data);             
            }, 
            function(err) {
                res.status(500).json({error: err});
            });
};

var getChartInfo = function(req, res) {
    blockChainService.getChartInfo({
        successCallback: function(data) {
            res.json(data);
        },
        failCallback: function(err) {
            res.status(500).json({ error: err});
        },
        chartType: req.query.chartType
    });
};

var getTransactions = function (req, res, io) {
    blockChainService.getTransactions(
            function (data) {
                //console.log(data);
				io.emit('news', data);
            }, 
            function(err) {
                //res.status(500).json({error: err});
				console.log(err);
            });
}


module.exports = {
    browseBitCoin: browseBitCoin,
    getChartInfo: getChartInfo,
	getTransactions: getTransactions,
    getBlocksFromBlockChain: getBlocksFromBlockChain
};
