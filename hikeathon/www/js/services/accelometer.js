// Sapy
angular.module('starter')
    .service('accelometer', function($rootScope, $localStorage) {
        var lastAccSavedAt;
        var pollTime = 5000;

        $rootScope.userAction = $localStorage.userAction || {
            'Last stationary At': '',
            'Last walked At': '',
            'Last Ran At': '',
            'Last Drove At': '',
            'Last Flew At': ''
        };


        var max = {
            x: 0,
            y: 0,
            z: 0
        };

        var updateRootScope = function(acceleration) {
            $rootScope.AccelerationX = acceleration.x;
            $rootScope.AccelerationY = acceleration.y;
            $rootScope.AccelerationZ = acceleration.z;

            var maxOfCurrent = Math.max(acceleration.x, acceleration.y, acceleration.z);
            var currentTime = new Date().toString().substr(4, 20);

            if (maxOfCurrent > 200) {
                $rootScope.userAction['Last Flew At'] = currentTime;
            } else if (maxOfCurrent > 28 && maxOfCurrent < 200) {
                $rootScope.userAction['Last Drove At'] = currentTime;
            } else if (maxOfCurrent > 16 && maxOfCurrent <= 28) {
                $rootScope.userAction['Last Ran At'] = currentTime;
            } else if (maxOfCurrent > 9.8 && maxOfCurrent <= 16) {
                $rootScope.userAction['Last walked At'] = currentTime;
            } else if (maxOfCurrent <= 9.8) {
                $rootScope.userAction['Last stationary At'] = currentTime;
            }

            var maxOfMax = Math.max(max.x, max.y, max.z);
            if (maxOfCurrent > maxOfMax) {
                max.y = acceleration.y;
                max.x = acceleration.x;
                max.z = acceleration.z;
            }
            processAccelometer(max.x, max.y, max.z);
        };

        var processAccelometer = function(x, y, z) {

            if (new Date() - lastAccSavedAt > pollTime) {
                lastAccSavedAt = new Date();
                var prevMax = Math.max($localStorage.maxacc.x, $localStorage.maxacc.y, $localStorage.maxacc.z);
                var maxOfMax = Math.max(x, y, z);

                if (maxOfMax > prevMax) {
                    $localStorage.maxacc.x = x;
                    $localStorage.maxacc.y = y;
                    $localStorage.maxacc.z = z;
                    $localStorage.maxacc.maxOn = new Date().toString().substr(4, 20);
                }
                $localStorage.userAction = $rootScope.userAction;
                $rootScope.maxacc = $localStorage.maxacc;
            }
        };

        this.tryAcclometer = function() {
            if (!lastAccSavedAt) {
                lastAccSavedAt = new Date();
                if ($localStorage.maxacc === undefined) {
                    $localStorage.maxacc = {
                        x: 0,
                        y: 0,
                        z: 0,
                        maxOn: new Date().toString().substr(4, 20)
                    };
                }
            }
            var acc = navigator.accelerometer;

            // Testing code change x,y,z to see changes

            // updateRootScope({
            //     x: 19,
            //     y: 17,
            //     z: 4,
            //     timestamp: new Date().toString().substr(4, 20)
            // });

            // Test code ends

            if (acc) {
                acc.getCurrentAcceleration(function(acceleration) {
                    updateRootScope(acceleration);
                }, function(error) {
                    $rootScope.accelerationError = JSON.stringify(error);
                });
            } else {
                $rootScope.accelerationError = 'Sorry No accelometer found';
            }
        };
    });
