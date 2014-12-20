angular.module('starter')
    .controller('main', function($scope, wifi, accelometer, facebookData, $q) {

        $scope.tryAcclometer = function() {
            accelometer.tryAcclometer();
        };

        $scope.showWifi = function() {
            wifi.showWifi();
        };

        $scope.showOrientation = function() {
            orientation.showOrientation();
        };

        $scope.refreshAll = function(argument) {
            $scope.showWifi();
            $scope.tryAcclometer();
            $scope.showOrientation();
        }

        document.addEventListener("deviceready", function onDeviceReady() {
            alert('device ready');
            $scope.refreshAll();
        }, false);

        $scope.loginFacebook = function() {
          var promise = facebookData.login();
          promise.then(function(data) {
            console.log(data);
            $scope.data = data;
          });
        };
    });
