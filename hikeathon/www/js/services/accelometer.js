// Sapy
angular.module('starter')
    .service('accelometer', function($rootScope) {
        var options = {
            frequency: 3000
        }; // Update every 3 seconds

        var updateRootScope = function(argument) {
            $rootScope.AccelerationX = acceleration.x;
            $rootScope.AccelerationY = acceleration.y;
            $rootScope.AccelerationZ = acceleration.z;
            $rootScope.Accelerationtimestamp = acceleration.timestamp;
        }

        var watchAccelometerChange = function() {
            var watchID = navigator.accelerometer.watchAcceleration(function onSuccess(acceleration) {
                updateRootScope(acceleration);
            }, function(error) {
                $rootScope.accelerationError = JSON.stringify(error);
            }, options);
        }

        this.tryAcclometer = function() {
            var acclemoetre;
            if (acclemoetre) {
                acclemoetre.getCurrentAcceleration(function(acceleration) {
                    updateRootScope(acceleration);
                }, function(error) {
                    $rootScope.accelerationError = JSON.stringify(error);
                });

                // also constantly watch accelometer changes.
                // watchAccelometerChange();
            } else {
                $rootScope.accelerationError = 'Sorry No accelometer found';
            }
        };
    });
