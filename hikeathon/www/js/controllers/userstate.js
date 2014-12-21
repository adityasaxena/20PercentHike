angular.module('starter')
.controller('UserStateCtrl', function ($scope, $state, userstate) {
	var watch = userstate.watch().then(
		function (success) {
			//nothing here
		},
		function (error) {
			//nothing here
		},
		function (accl) {
			var X = accl.x;
			var Y = accl.y;
			var Z = accl.z;
			$scope.userstate = "X: " + X + "    Y:" + Y + "       Z:" + Z;
			var timeStamp = accl.timestamp;
		});

	//Update user state after checking data for last 5 seconds - meaning last 10 data output from the array in service
	function updateUserState(){

	}
});
