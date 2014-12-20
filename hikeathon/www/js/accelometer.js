// Sapy
angular.module('starter')
    .service('accelometer', function() {

        var onAcceslometerSuccess = function(acceleration) {
            alert('Acceleration X: ' + acceleration.x + '\n' +
                'Acceleration Y: ' + acceleration.y + '\n' +
                'Acceleration Z: ' + acceleration.z + '\n' +
                'Timestamp: ' + acceleration.timestamp + '\n');
        };

        var onAccelometerError = function() {
            alert('onAccelometerError!');
        };

        this.tryAcclometer = function() {
            var acclemoetre;
            if (acclemoetre) {
                acclemoetre.getCurrentAcceleration(onAcceslometerSuccess, onAccelometerError);
            } else {
                alert('Sorry No accelometer found');
            }
        };
    });
