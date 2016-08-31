(function () {
    angular.module('bitCoinExplorer',
            [
                'ui.router',
                'ngCookies',
                'ngMessages',
                'ui.bootstrap',
                'chart.js'
            ]
        )
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            
//            $httpProvider.interceptors.push('httpInterceptor');

            $urlRouterProvider
            .when('/', ['$state', function ($state) {
                $state.go('bitCoin');
            }])
            .otherwise('404');
           
            $stateProvider
                .state('bitCoin', {
                    url: '/bitCoin',
                    templateUrl: 'html/bitCoin/bitCoin.html?version=~~**CacheKey**~~',
                    controller: 'bitCoinController'                    
                })
//                .state('register', {
//                    url: '/register',
//                    templateUrl: 'html/Registration/register.html?version=~~**CacheKey**~~',
//                    controller: 'registrationController',
//                })
//                .state('home', {
//                    url: '/home',
//                    templateUrl: 'html/home/home.html?version=~~**CacheKey**~~',
//                    controller: 'homeController',
//                    //redirectTo: 'main.users',
//                    data: {
//                        requireLogin: true
//                    }
//                })
//                .state('createGame', {
//                    url: '/creategame',
//                    templateUrl: 'html/game/createGame.html?version=~~**CacheKey**~~',
//                    controller: 'createGameController',
//                    //redirectTo: 'main.users',
//                    data: {
//                        requireLogin: true
//                    }
//                })
//                .state('playGame', {
//                    url: '/playgame?gameId',
//                    templateUrl: 'html/game/playGame.html?version=~~**CacheKey**~~',
//                    controller: 'playGameController',
//                    //redirectTo: 'main.users',
//                    data: {
//                        requireLogin: true
//                    }
//                })
//                .state('gameResults', {
//                    url: '/gameresults?gameId',
//                    templateUrl: 'html/game/gameResults.html?version=~~**CacheKey**~~',
//                    controller: 'gameResultsController',
//                    //redirectTo: 'main.users',
//                    data: {
//                        requireLogin: true
//                    }
//                })
//                
//                /*.state('main.securityPrices', {
//                    url: '/securityPrices?date&search&page&totalItems',
//                    templateUrl: 'main/securityPrices/browse/securityPrices.html?version=~~**CacheKey**~~',
//                    controller: 'securityPricesController',
//                    data: {
//                        requireLogin: true
//                    },
//                    reloadOnSearch: false
//                })*/
//                
//                .state('pageNotFound', {
//                    url: '/404',
//                    templateUrl: 'html/error/404.html?version=~~**CacheKey**~~'
//                })
//                .state('accessDenied', {
//                    url: '/403',
//                    templateUrl: 'html/error/403.html?version=~~**CacheKey**~~'
//                });
        }])
//        .run([
//            '$rootScope', '$state', '$location', 'ngToast', 'authService', function ($rootScope, $state, $location, ngToast, authService) {
//                $rootScope.$on('$stateChangeStart', function (evt, to, params) {
//                    //$uibModalStack.dismissAll();
//                    ngToast.dismiss();
//                    
//                    if (to.data && to.data.requireLogin && authService.getAuthData() == null) {
//                        $state.go('login');
//                    }
//                });
//                $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
//                    //assign the "from" parameter to something
//                });
//            }
//        ])
        /*.run([
            'authenticationService', 'authenticationCheckerService', function (authenticationService, authenticationCheckerService) {
                authenticationService.fillAuthData();
                authenticationCheckerService.startSessionCheck();
            }
        ])*/;
}());
