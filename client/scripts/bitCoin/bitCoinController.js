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
                var tickers = document.querySelectorAll('[bitbitTicker]');
				socket.on('newTransaction', function (data) {
                    //var now = new Date();
                    //AddTransactions(data.inputs);
                    var inputs = data.inputs;
                    var outputs = data.out;
                    var totalInput = 0, totalOutput=0;

                    for (var key in inputs){
                        totalInput = totalInput + inputs[key].prev_out.value;
                    }
                    if (totalInput > 0) totalInput = totalInput/100000000;

                    for (var key in outputs){
                        totalOutput = totalOutput + outputs[key].value;
                    }
                    if(totalOutput > 0) totalOutput = totalOutput/100000000;
                    

				    var newdata =  parseFloat(Math.round(totalOutput * 100) / 100).toFixed(2);
				    tickers[tickerLoop].innerText = newdata + 'Ƀ';
                    tickers[tickerLoop].target='new';
                    tickers[tickerLoop].href = 'https://blockchain.info/tx/' + data.hash;

                    tickerLoop++;
                    if (tickerLoop == tickers.length) tickerLoop = 0;
                    //console.log (tickerLoop);
			     });
                socket.on('newBlock', function (data) {
                    console.log('newBlock' + data)
                 });
            };


            var AddTransactions = function(data){

                for (var i = 0; i < data.length; i++) {
                    
                    console.log(data.value);
        }
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
