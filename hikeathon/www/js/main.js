angular.module('starter')
    .controller('main', function($scope, $rootScope, $timeout) {

        var onAcceslometerSuccess = function(acceleration) {
            alert('Acceleration X: ' + acceleration.x + '\n' +
                'Acceleration Y: ' + acceleration.y + '\n' +
                'Acceleration Z: ' + acceleration.z + '\n' +
                'Timestamp: ' + acceleration.timestamp + '\n');
        };

        var onAccelometerError = function() {
            alert('onAccelometerError!');
        };

        $scope.tryAcclometer = function() {
            var acclemoetre;
            if (acclemoetre) {
                acclemoetre.getCurrentAcceleration(onAcceslometerSuccess, onAccelometerError);
            } else {
                alert('Sorry No accelometer found');
            }
        };
    });
