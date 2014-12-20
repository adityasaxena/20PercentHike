angular.module('starter')
  .service('facebookData', function($cordovaFacebook, $q) {

    var login = function() {
      var deferred = $q.defer();
      $cordovaFacebook.init(311894645668189);
      $cordovaFacebook.login(['user_about_me' , 'user_activities', 'user_birthday'], function(result) {
        console.log(JSON.stringify(result));
        deferred.resolve(result);
      }, function(error) {
        console.log(JSON.stringify(error));
        deferred.reject(result);
      });
      return deferred.promise;
    };

    return {
      login: login
    };
  });
