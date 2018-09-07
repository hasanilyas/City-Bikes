angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider, $locationProvider){
    $routeProvider

    .when('/stations',{
        templateUrl : 'app/view/pages/stations.html',
        controller: 'statCtrl',
        controllerAs: 'station'
         
    })
    .when('/emptyslots',{
        templateUrl : 'app/view/pages/emptyslot.html',
        controller: 'emptyslotCtrl',
        controllerAs: 'emptyslot'
    })

    .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled:true,
        requireBase: false
    });
});