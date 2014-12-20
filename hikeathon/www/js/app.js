// Ionic Starter App
//Facebook App ID: 311894645668189

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaFacebook) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    console.log($cordovaFacebook.init(311894645668189));

    $cordovaFacebook.login(['user_about_me' , 'user_activities', 'user_birthday'], function(result) {
      console.log(JSON.stringify(result));
    }, function(error) {
      console.log(JSON.stringify(error));
    });
  });
});
