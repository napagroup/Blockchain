(function () {
    angular.module("bitCoinExplorer")
        .controller("bitCoinController", [
            '$scope',
            '$state',
            'bitCoinService',
            function ($scope, $state, bitCoinService) {
        
            var getBitCoinData = function ($scope, $state) {
                bitCoinService.getBitCoinData()
                    .then(getResultsSuccess, getResultsFailure)
                    .finally(handleLoadComplete);
            }
        
            var getResultsSuccess = function(data) {
                $scope.bitCoinInfo = data;                
            }
            
            var getResultsFailure = function(error) {
                
            }        
        
            var handleLoadComplete = function(error) {
                
            }
            
            var init = function () {
                getBitCoinData();
            }

            init();
    }]);
}());
