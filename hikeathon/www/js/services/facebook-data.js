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
      $cordovaFacebook.login(['user_about_me' , 'user_activities', 'user_birthday', 'user_photos'])
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
      console.log('initiating api for profile');
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

    var getBestFriend = function() {
      console.log('initiating api for photos');
      var deferred = $q.defer();
      var photos = [];

      getPhotos();

      function getPhotos(uri) {
        var graphPath = uri || 'me/photos';
        $cordovaFacebook.api(graphPath, ['user_photos'])
          .then(function(success) {
//            console.log(JSON.stringify(success));

            // add to result
            photos = photos.concat(success.data);
            console.log('inter: ' + photos.length);

            // prepare next request
            if(success && success.paging && success.paging.next) {
              var nextRequestRawURI =success.paging.next.split('https://graph.facebook.com/v2.2/')[1];
              console.log(nextRequestRawURI);
              getPhotos(nextRequestRawURI);
            } else {
//              console.log(JSON.stringify(photos));
              console.log('final: ' + photos.length);
              deferred.resolve('Mary');
            }
          }, function(error) {
            // error
          });
      }

      return deferred.promise;
    };

    var getUserInterests = function() {
      console.log('getting user interests');
      var deferred = $q.defer();
      var interests = [];

      getInterests();

      function getInterests(uri) {
        var graphPath = uri || 'me/likes?fields=category,name';

        $cordovaFacebook.api(graphPath, ['user_likes'])
        .then(function(response){
          //append to interests
          interests = interests.concat(response.data);

          if(response && response.paging && response.paging.next) {
            var nextRequestRawURI = response.paging.next.split('https://graph.facebook.com/v2.2/')[1];
            console.log(nextRequestRawURI);
            getInterests(nextRequestRawURI);
          }
          else {
            deferred.resolve(interests);
          }
        }, function(error) {
          console.log('unable to detect user likes or interests');
          deferred.reject(error);
        });
      }

      return deferred.promise;
    };


    return {
      userID: userID,
      accessToken: accessToken,
      login: login,
      getLoginStatus: getLoginStatus,
      getProfile: getProfile,
      getBestFriend: getBestFriend,
      getUserInterests: getUserInterests,
      logout: logout
    };
  });
