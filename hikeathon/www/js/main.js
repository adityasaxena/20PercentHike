angular.module('starter')
    .controller('main', function($scope, wifi, accelometer, $timeout) {

        $scope.tryAcclometer = function() {
            accelometer.tryAcclometer();
        };

        $scope.showWifi = function(argument) {
            wifi.showWifi();
        };

        $timeout(function(argument) {
            $scope.showWifi();
            $scope.tryAcclometer();
        }, 3000);

    });
