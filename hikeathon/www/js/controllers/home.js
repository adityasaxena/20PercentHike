angular.module('starter')
    .controller('HomeCtrl', function($scope, fb) {

				fb.getLoginStatus()
				.then(function(data) {
					console.log('already logged in');
					//now we need to call some facebook api's here to retrieve user data
				}, function(error) {
					$scope.showLoginButton = true;
				});

        $scope.loginFacebook = function() {
          var promise = fb.login();
          promise.then(function(data) {
            console.log(JSON.stringify(data));
            $scope.userDetails = data;
          });
        };
    });
