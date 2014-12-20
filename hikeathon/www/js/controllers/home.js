angular.module('starter')
    .controller('HomeCtrl', function($scope, fb) {

				fb.getLoginStatus()
				.then(function(data) {
					console.log(JSON.stringify(data));
					if(data.status === 'unknown' || data.status === 'not_authorized') {
						$scope.showLoginButton = true;
					}
					else {
						console.log('already logged in');
					}
					//do nothing if the login is there else show the login button and user will try to login using that button
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
