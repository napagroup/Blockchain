var blockChainService = require('../../Services/BlockChain/blockChainService.js');

var browseBitCoin = function (req, res) {
    blockChainService.getInfoFromBlockChain(
            function (data) {
                res.json(data);             
            }, 
            function(err) {
                res.status(500).json({error: err});
            });
}

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
module.exports = {
    browseBitCoin: browseBitCoin,
    getChartInfo: getChartInfo
};
