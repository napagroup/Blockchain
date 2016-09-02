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
			
			var getTransactions = function(){

				var socket = io.connect('http://localhost:12505');
				socket.on('news', function (data) {
				//console.log(data);
                    //newdata = document.getElementById('rawdata').innerText + data.hash + ' in : ' + data.inputs + ' out : ' + data.out + ' relayed by: ' + data.relayed_by + '\n';
                    //document.getElementById('rawdata').innerText = newdata;
                    //dv.innerHTML = '<a href="">' + itemnumber + ' &#579;</a>';
                //document.getElementsByClassName('ticker-item')[0].appendChild(dv);
				//console.log(document.getElementsByClassName('ticker'))
				//socket.emit('my other event', { my: 'data' });
			  });                  
              

            };
            
            var init = function () {
                $scope.data = [];
                $scope.labels = []; 
                getBitCoinData();
                getChartData();
				getTransactions();

            };

            init();
        
    }]);
}());
