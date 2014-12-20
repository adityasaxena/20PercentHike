angular.module('starter')
    .controller('HomeCtrl', function($scope, facebookData) {
        $scope.loginFacebook = function() {
          var promise = facebookData.login();
          promise.then(function(data) {
            console.log(JSON.stringify(data));
            $scope.userDetails = data;
          });
        };
    });
