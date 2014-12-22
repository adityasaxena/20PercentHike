angular.module('starter')
.controller('AppListCtrl', function ($scope, $window) {
	$window.apps.list(function(list) {
		console.log(JSON.stringify(list));
		var truelist = list.split("[")[1];
		truelist = truelist.split("]")[0];
		truelist = truelist.split(",");
		_.each(truelist, function(item) {
			item = item.split('"')[1];
		});
		$scope.apps = truelist;
		console.log($scope.apps.length);
	});
});