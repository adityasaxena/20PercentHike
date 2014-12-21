angular.module('starter')
.service('userstate', function ($rootScope, $cordovaDeviceMotion) {
	var states = [];

	var options = {
		maximumAge: 3000,
		timeout: 800,
		frequency: 500,
		enableHighAccuracy: true // may cause errors if true
	};

	var watch = function() {
		return $cordovaDeviceMotion.watchAcceleration(options);
	};

	var addState = function(x, y, z) {
		states.push([x, y, z]);
	};

	var clearWatch = function(id) {
		$cordovaDeviceMotion.clearWatch(id);
	};

	return {
		addState: addState,
		watch: watch,
		clearWatch: clearWatch
	}
});
