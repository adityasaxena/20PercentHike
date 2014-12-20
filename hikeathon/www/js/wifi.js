// Sapy
angular.module('starter')
    .service('wifi', function() {

        this.showWifi = function() {
            navigator.wifi.getAccessPoints(function(data) {
                alert(JSON.stringify(data));
            }, function(data) {
                alert(JSON.stringify(data));
            });
            navigator.wifi.watchAccessPoints(function(data) {
                alert(JSON.stringify(data));
            }, function(data) {
                alert(JSON.stringify(data));
            }, {});
            // navigator.wifi.clearWatch(id)
        };
    });
