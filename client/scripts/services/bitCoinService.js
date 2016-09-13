(function () {
	  
    angular.module("bitCoinExplorer")
    .factory("bitCoinService", ["$http", "$q", function ($http, $q) {
        
        var getBlocksFromBlockChain = function(){
            var deferred = $q.defer();
            
            $http.get('/api/bitCoin/blocks').then(function(response) {
                deferred.resolve(response.data);                
            }, function(err, status) {
               deferred.reject(err.data);
            }); 
            
            return deferred.promise;
        };
        
        var getBitCoinData = function () {
            
            var deferred = $q.defer();
                              
            $http.get('/api/bitCoin/browse').then(function (response) {
                deferred.resolve(response.data);
            }, function (err, status) {
                deferred.reject(err.data);
            });
            
            return deferred.promise;
        };

        var getChartData = function (args){
            var deferred = $q.defer();
            $http.get('/api/bitCoin/chart', {params: args }).then(function(response){
                deferred.resolve(response.data);
            },function(err, status){
                deferred.reject(err.data);
            });

            return deferred.promise;
        };
                
        var init = function () {
            //appSettings = appSettingsService.getAppSettings();            
        }

        init();

        return {
            getBitCoinData: getBitCoinData,
            getChartData: getChartData,
            getBlocksFromBlockChain: getBlocksFromBlockChain
        };
    }]);
}());

