angular.module('starter')
    .controller('main', function($scope, wifi, accelometer) {

        $scope.tryAcclometer = function() {
            accelometer.tryAcclometer();
        };

        $scope.showWifi = function(argument) {
            wifi.showWifi();
        };
    });
