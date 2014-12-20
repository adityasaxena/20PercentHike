// Sapy

function onSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
        'Acceleration Y: ' + acceleration.y + '\n' +
        'Acceleration Z: ' + acceleration.z + '\n' +
        'Timestamp: ' + acceleration.timestamp + '\n');
};

function onError() {
    alert('onError!');
};

setTimeout(function() {
    var acclemoetre;
    if (acclemoetre) {
        acclemoetre.getCurrentAcceleration(onSuccess, onError);
    } else {
        alert('Sorry No accelometer found');
    }

}, 5000);
