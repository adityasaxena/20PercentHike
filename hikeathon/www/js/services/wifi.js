// Sapy
angular.module('starter')
    .service('wifi', function($rootScope, $localStorage) {

        $rootScope.wifiWatch = {};

        var updateLocalStorage = function(data) {
            // bssid chnage detected
            if ($rootScope.bssid !== data.BSSID) {
                // Check If this bssid is previously used bssid
                if ($localStorage.wifi !== undefined) {
                    var existingbssids = _.pluck($localStorage.wifi, 'bssid');

                    // If this BSSID is previously used
                    if (existingbssids.indexOf(data.BSSID) > -1) {

                    } else {
                        $localStorage.wifi.push({
                            bssid: data.BSSID,
                            ssid: data.SSID,
                            timeline: new Date()
                        });
                    }
                } else {
                    // For the very first time when APP is initialized
                    $localStorage.wifi = [];
                    $localStorage.wifi.push({
                        bssid: data.BSSID,
                        ssid: data.SSID,
                        timeline: newDate()
                    });
                }
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
