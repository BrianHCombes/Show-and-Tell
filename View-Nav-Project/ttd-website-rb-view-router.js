angular.module('ui-view-module', ['ui.router'])

        .config([
        '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');    
        $stateProvider
                .state('AdditionalState', {
                    url:'/',
            
                    views: {
                        'viewAA': { templateUrl: 'ttd-website-rb-template-AA.html'}
                    }
                });    
            
            
        }]);


