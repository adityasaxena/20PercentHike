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

        document.addEventListener("deviceready", function onDeviceReady() {
            $scope.showWifi();
            $scope.tryAcclometer();
            $scope.showOrientation();
        }, false);

        $scope.loginFacebook = function() {
          var promise = facebookData.login();
          promise.then(function(data) {
            console.log(data);
            $scope.data = data;
          });
        };
    });
