angular.module('starter')
    .controller('SensorCtrl', function($scope, wifi, accelometer, $q, $timeout, orientation) {

        $scope.tryAcclometer = function() {
            accelometer.tryAcclometer();
        };

        $scope.showWifi = function() {
            wifi.showWifi();
        };

        $scope.showOrientation = function() {
            orientation.showOrientation();
        };

        $scope.refreshAll = function() {
            $scope.showWifi();
            $scope.tryAcclometer();
            $scope.showOrientation();
            $timeout(function  () {
                $scope.refreshAll();
            }, 1000);
        }

        document.addEventListener("deviceready", function onDeviceReady() {
            $scope.refreshAll();
        }, false);
    });
