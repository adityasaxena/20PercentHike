angular.module('starter')
    .controller('MainCtrl', function($scope, $state) {
        $scope.goTo = function(state) {
            $state.go(state);
        };
    });
