angular.module('starter')
    .controller('AppCtrl', function($scope, $state) {
        $state.go('home');
    });
