angular.module('starter')
    .controller('main', function($scope, wifi, accelometer, orientation) {

        $scope.tryAcclometer = function() {
            accelometer.tryAcclometer();
        };

        $scope.showWifi = function() {
            wifi.showWifi();
        };

        $scope.showOrientation = function() {
            orientation.showOrientation();
        };

        document.addEventListener("deviceready", function onDeviceReady() {
            $scope.showWifi();
            $scope.tryAcclometer();
            $scope.showOrientation();
        }, false);


    });
