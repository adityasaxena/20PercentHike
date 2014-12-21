angular.module('starter')
.controller('HomeCtrl', function ($scope, $ionicPlatform, fb) {
	console.log('home controller init');

	$ionicPlatform.ready(function () {
		fb.getLoginStatus()
		.then(function (data) {
			console.log('already logged in');
			getProfile();
		}, function (error) {
			$scope.showLoginButton = true;
		});
	});

	$scope.loginFacebook = function () {
		var promise = fb.login();
		promise.then(function (data) {
			console.log(JSON.stringify(data));
			$scope.userDetails = data;
			getProfile();
		});
	};

	function getProfile() {
		var profilePromise = fb.getProfile();
		profilePromise.then(function (data) {
			$scope.userDetails = data;
      $scope.showLoginButton = false;
		});
	}

  $scope.logout = function() {
    var promise = fb.logout();
    promise.then(function() {
      $scope.userDetails = null;
      $scope.showLoginButton = true;
    });
  };

	//Output of this function
	// {"id":"10152452984360124","birthday":"12/24/1986","gender":"male","name":"Aditya Saxena"}
});
