angular.module('starter')
    .controller('HomeCtrl', function($scope, facebookData) {
        $scope.loginFacebook = function() {
          $scope.auth = null;
          var promise = facebookData.login();
          promise.then(function(data) {
            console.log(JSON.stringify(data));
            $scope.auth = data;
          });
        };
    });
