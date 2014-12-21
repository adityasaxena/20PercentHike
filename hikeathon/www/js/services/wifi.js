// Sapy
angular.module('starter')
    .service('wifi', function($rootScope, $localStorage) {

        var lastWifidetectedAt;
        var pollingTime = 10000;

        var updateLocalStorage = function(data) {
            // Wifi is used for atleast 10 seconds
            if (new Date() - lastWifidetectedAt > pollingTime) {
                // Check If this bssid is previously used bssid
                if ($localStorage.wifi !== undefined) {
                    var existingWifi = _.find($localStorage.wifi, {
                        bssid: data.BSSID
                    });

                    // If this BSSID is previously used
                    if (existingWifi) {
                        existingWifi.usedForSeconds = existingWifi.usedForSeconds + (new Date() - lastWifidetectedAt);
                        existingWifi.lastTime = new Date();
                    } else {
                        $localStorage.wifi.push({
                            bssid: data.BSSID,
                            ssid: data.SSID,
                            lastTime: new Date(),
                            usedForSeconds: pollingTime
                        });
                    }
                } else {
                    // For the very first time when APP is initialized
                    $localStorage.wifi = [];
                    $localStorage.wifi.push({
                        bssid: data.BSSID,
                        ssid: data.SSID,
                        lastTime: new Date(),
                        usedForSeconds: 0
                    });
                }

                lastWifidetectedAt = new Date();
            }

        }

        var updateRootScope = function(data) {
            $rootScope.bssid = data.BSSID;
            $rootScope.ssid = data.SSID;
            $rootScope.level = data.level;
        }

        this.showWifi = function() {
            updateLocalStorage({
                'BSSID': 'test:id'
            });
            if (!lastWifidetectedAt) {
                lastWifidetectedAt = new Date();
            }
            if (navigator.wifi) {
                navigator.wifi.getAccessPoints(function(data) {
                    updateLocalStorage(data[0]);
                    updateRootScope(data[0]);
                }, function(data) {
                    $rootScope.wifiError = 'Wifi Error ' + JSON.stringify(data);
                });
            } else {
                $rootScope.wifiError = 'No Wifi sensor in phone';
            }
        };
    });
