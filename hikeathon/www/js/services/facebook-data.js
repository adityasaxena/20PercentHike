angular.module('starter')
  .service('fb', function($cordovaFacebook, $q) {

    var userID = null;
    var accessToken = null;

    var getLoginStatus = function getLoginStatus() {
      var deferred = $q.defer();
      $cordovaFacebook.getLoginStatus()
      .then(function(success) {
        deferred.resolve(success);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    var login = function() {
      var deferred = $q.defer();
      $cordovaFacebook.login(['user_about_me' , 'user_activities', 'user_birthday'])
        .then(function(success){
          console.log(JSON.stringify(success));
          var authResponse = success.authResponse;
          userID = authResponse.userID;
          accessToken = authResponse.accessToken;
          var userDetails = {
            userID: userID
          };
          deferred.resolve(userDetails);
        }, function(error){
          // error
        });
      return deferred.promise;
    };

    return {
      userID: userID,
      accessToken: accessToken,
      login: login,
      getLoginStatus: getLoginStatus
    };
  });
