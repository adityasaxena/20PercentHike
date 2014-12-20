angular.module('starter')
    .controller('HomeCtrl', function($scope, wifi, accelometer, facebookData, $q, $timeout) {

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

        $scope.loginFacebook = function() {
          var promise = facebookData.login();
          promise.then(function(data) {
            console.log(JSON.stringify(data));
            $scope.data = data;
          });
        };
    });
