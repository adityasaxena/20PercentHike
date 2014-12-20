// Sapy
angular.module('starter')
    .service('wifi', function() {

        this.showWifi = function() {
            navigator.wifi.getAccessPoints(function(data) {
                alert(data);
            }, function(data) {
                alert(data);
            });
            navigator.wifi.watchAccessPoints(function(data) {
                alert(data);
            }, function(data) {
                alert(data);
            }, {});
            // navigator.wifi.clearWatch(id)
        };
    });
