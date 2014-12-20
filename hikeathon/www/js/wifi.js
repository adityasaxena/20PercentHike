// Sapy
angular.module('starter')
    .service('wifi', function($rootScope) {

        this.showWifi = function() {
            if (navigator.wifi) {
                navigator.wifi.getAccessPoints(function(data) {

                    $rootScope.BSSID = data[0].BSSID;
                    $rootScope.SSID = data[0].SSID;
                    $rootScope.level = data[0].level;
                    // alert(JSON.stringify(data));
                }, function(data) {
                    $rootScope.wifiError = 'Wifi Error ' + JSON.stringify(data);
                });

                navigator.wifi.watchAccessPoints(function(data) {
                    $rootScope.BSSID = data[0].BSSID;
                    $rootScope.SSID = data[0].SSID;
                    $rootScope.level = data[0].level;
                    // alert(JSON.stringify(data));
                }, function(data) {
                    $rootScope.wifiError = 'Wifi Error ' + JSON.stringify(data);
                }, {
                    frequency: 3000 //Will watch every 3 minute...
                });
            } else {
                $rootScope.wifiError = 'No Wifi sensor in phone';
            }
            // navigator.wifi.clearWatch(id)
        };
    });
