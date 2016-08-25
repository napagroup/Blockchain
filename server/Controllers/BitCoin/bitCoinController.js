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

module.exports = {
    browseBitCoin: browseBitCoin
};