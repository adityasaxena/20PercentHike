// Sapy
angular.module('starter')
    .service('orientation', function($rootScope) {
        this.showOrientation = function() {
            if (!navigator.compass) {
                $rootScope.orientattionError = 'No orientation sensor found';
                return false;
            }
            var watchID = navigator.compass.getCurrentHeading(function onSuccess(heading) {
                $rootScope.orientattion = heading.magneticHeading;
                // alert($rootScope.orientattion);
                // alert($rootScope.orientattion);
            }, function onError(compassError) {
                $rootScope.orientattionError = JSON.stringify(compassError.code);
            });
        };
    });
