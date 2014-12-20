// Ionic Starter App
//Facebook App ID: 311894645668189

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $q) {
  var dfd = $q.defer();
  $rootScope.deviceReady = dfd.promise;

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    dfd.resolve( device );

  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    templateUrl: "templates/app.html",
    controller: 'AppCtrl'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('sensor', {
    url: '/sensor',
    templateUrl: 'templates/sap-sensor.html',
    controller: 'SensorCtrl'
  });

  $urlRouterProvider.otherwise('/app');
});
