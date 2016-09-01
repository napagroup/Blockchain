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
            };
        
            var getResultsSuccess = function(data) {
                $scope.bitCoinInfo = data;                
            };
            
            var getResultsFailure = function(error) {
                
            };       
        
            var handleLoadComplete = function(error) {
                
            };

            var getChartData = function(){
                  
                $scope.onClick = function (points, evt) {
                console.log(points, evt);
                };
                $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                $scope.options = {
                  scales: {
                    yAxes: [
                      {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                      },
                      {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                      }
                    ]
                  }
                };
 
                bitCoinService.getChartData({chartType: 'market-price'}).then(
                    function(data){
                        var values = data.values;
                        var xValues = [];
                        for(var i = 0; i< values.length; i++){
                            $scope.labels.push( (new Date(values[i].x)).toDateString());
                            xValues.push(values[i].y);
                        }
                        $scope.data.push(xValues);

                        //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
                        $scope.series = ['Market Price (USD)'];
                        /*$scope.data = [
                            [65, 59, 80, 81, 56, 55, 40],
                            [28, 48, 40, 19, 86, 27, 90]
                        ];*/
                                       
                    },function(err){
                });

            };
            
            var init = function () {
                $scope.data = [];
                $scope.labels = []; 
                getBitCoinData();
                getChartData();
            };

            init();
        
    }]);
}());
