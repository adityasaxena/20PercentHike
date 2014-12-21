angular.module('starter')
.controller('UserStateCtrl', function ($scope, $state, userstate) {
	var watch = userstate.watch().then(
		function (success) {
			//nothing here
		},
		function (error) {
			//nothign here
		},
		function (accl) {
			var X = accl.x;
			var Y = accl.y;
			var Z = accl.z;
			$scope.userstate = "X: " + X + "    Y:" + Y + "       Z:" + Z;
			var timeStamp = accl.timestamp;
		});
});
