// Sapy
angular.module('starter')
    .service('orientation', function($rootScope) {
        this.showOrientation = function(argument) {
            var watchID = navigator.compass.watchHeading(function onSuccess(heading) {
                $rootScope.orientattion = heading.magneticHeading;
                alert($rootScope.orientattion);
            }, function onError(compassError) {
                $rootScope.orientattionError = JSON.stringify(compassError.code);
            }, {
                frequency: 3000
            }); // Update every 3 seconds);
        };
    });
