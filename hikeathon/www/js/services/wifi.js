// Sapy
angular.module('starter')
    .service('wifi', function($rootScope, $localStorage) {

        var lastWifidetectedAt;
        var pollingTime = 5000;



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
                        existingWifi.currentSession = new Date() - $rootScope.sessionStarted;
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
                // 3 most favorite wifi
                $rootScope.topWifis = _.sortBy($localStorage.wifi, 'usedForSeconds').reverse();
            }

        };

        var updateRootScope = function(data) {
            $rootScope.bssid = data.BSSID;
            $rootScope.ssid = data.SSID;
            $rootScope.level = data.level;
        };

        this.showWifi = function() {
            if (!lastWifidetectedAt) {
                lastWifidetectedAt = new Date();
            }

            // Testing code change wifi ids to see changes
            // var test1 = 'Id-test 3';
            // var test2 = 'yoyo';
            // updateLocalStorage({
            //     BSSID: test1,
            //     SSID: test2
            // });
            // updateRootScope({
            //     BSSID: test1,
            //     SSID: test2
            // });
            // Test code ends

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
