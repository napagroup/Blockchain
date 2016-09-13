(function () {

    angular.module("bitCoinExplorer")
        .controller("bitCoinController", [
            '$scope',
            '$state',
            'bitCoinService',
            function ($scope, $state, bitCoinService) {
                        
            var getBlocksFromBlockChain = function($scope, $state) {
                bitCoinService.getBlocksFromBlockChain()
                    .then(getBlockResultsSuccess, getBlockResultsFailure)
                    .finally(handleLoadComplete);
            };
            
            var getBitCoinData = function ($scope, $state) {
				bitCoinService.getBitCoinData()
                    .then(getResultsSuccess, getResultsFailure)
                    .finally(handleLoadComplete);
            };

            var getBlockResultsSuccess = function(data) {   
                $scope.blocks = [];
                $scope.blocks = data.listofblocks;
            }
            
            var getBlockResultsFailure = function(error) {                  
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
                        var startDateTime = moment().subtract(values.length, 'days');
                        for(var i = 0; i< values.length; i++){
                            //$scope.labels.push( (new Date(values[i].x)).toDateString());
                            //$scope.labels.push(moment.unix(values[i].x).format('hh:mm:ss'));
                            $scope.labels.push(startDateTime.add(1, 'days').format('M/DD/YYYY h:mm a'));
                            xValues.push(values[i].y);
                        }
                        $scope.data.push(xValues);
                        $scope.series = ['Market Price (USD)'];
                    },function(err){
                });

            };
			
			var newSocketIOData = function(){
				var socket = io.connect('/');
				socket.on('newTransaction', function (data) {
                    var now = new Date();
				    newdata = data.hash + ' @ ' + data.serverTime  + ' by: ' + data.relayed_by + '\n';
				    document.getElementsByClassName('ticker-item')[0].innerText = newdata;
			     });
                socket.on('newBlock', function (data) {
                    console.log('newBlock' + data)
                 });
            };

            
            var init = function () {
                $scope.data = [];
                $scope.labels = []; 
                getBitCoinData();
                getBlocksFromBlockChain();
                getChartData();
				newSocketIOData();

            };

            init();
        
    }]);
}());
