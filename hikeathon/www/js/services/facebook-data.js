angular.module('starter')
  .service('facebookData', function($cordovaFacebook, $q) {

    var login = function() {
      var deferred = $q.defer();
      $cordovaFacebook.login(['user_about_me' , 'user_activities', 'user_birthday'])
        .then(function(success){
          console.log(JSON.stringify(success));
          var authResponse = success.authResponse;
          var authObject = {
            userID: authResponse.userID,
            accessToken: authResponse.accessToken
          };
          deferred.resolve(authObject);
        }, function(error){
          // error
        });
      return deferred.promise;
    };

    return {
      login: login
    };
  });
