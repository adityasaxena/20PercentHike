angular.module('starter')
.service('userstate', function ($rootScope, $cordovaDeviceMotion) {
	var states = [];

	var options = {
		maximumAge: 1000,
		timeout: 60 * 1000,
		enableHighAccuracy: false // may cause errors if true
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
