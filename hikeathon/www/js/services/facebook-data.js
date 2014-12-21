angular.module('starter')
  .service('fb', function($cordovaFacebook, $q) {

    var userID = null;
    var accessToken = null;

    var getLoginStatus = function getLoginStatus() {
      var deferred = $q.defer();
      $cordovaFacebook.getLoginStatus()
      .then(function(success) {
        if(success.status === 'unknown' || success.status === 'not_authorized') {
          deferred.reject(success);
        }
        else {
          deferred.resolve(success);
        }
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

    var logout = function() {
      var deferred = $q.defer();
      $cordovaFacebook.logout()
        .then(function(success) {
          console.log(JSON.stringify(success));
          deferred.resolve();
        }, function(error) {
          // error
        });
      return deferred.promise;
    };

    var getProfile = function() {
      var deferred = $q.defer();
      $cordovaFacebook.api('me?fields=id,name, gender, birthday')
        .then(function(success){
          console.log(JSON.stringify(success));
          var profile = {
            name: success.name,
            gender: success.gender,
            birthday: success.birthday
          };
          deferred.resolve(profile);
        }, function(error) {
          // error
        });
      return deferred.promise;
    };

    return {
      userID: userID,
      accessToken: accessToken,
      login: login,
      getLoginStatus: getLoginStatus,
      getProfile: getProfile,
      logout: logout
    };
  });
