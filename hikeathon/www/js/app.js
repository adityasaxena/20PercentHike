// Ionic Starter App
//Facebook App ID: 311894645668189

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngStorage'])

.run(function($ionicPlatform, $rootScope, $q, $cordovaSplashscreen, $timeout) {
        var dfd = $q.defer();
        $rootScope.deviceReady = dfd.promise;
        $rootScope.sessionStarted = new Date();

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            try {
                dfd.resolve(device);
            } catch (err) {}

            $timeout(function(){
                $cordovaSplashscreen.hide();
            }, 2000);
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
            })
            .state('userstate', {
                url: '/userstate',
                templateUrl: 'templates/userstate.html',
                controller: 'UserStateCtrl'
            })
            .state('applist', {
                url: '/applist',
                templateUrl: 'templates/applist.html',
                controller: 'AppListCtrl'
            });

        $urlRouterProvider.otherwise('/app');
    });
