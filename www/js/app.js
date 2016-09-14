// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'firebase', 'ngStorage'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/tabs');
    $stateProvider
      .state('tabs', {
        url: '/tabs',
        template: '<tabs></tabs>'
      })
      .state(
        'tabs.login', {
          url: '/login',
          template: '<login></login>'
        })
      .state('tabs.home', {
        url: '/home',
        template: '<home></home>'
      })
      .state('tabs.myRecipes', {
        url: '/myRecipes',
        template: '<my-recipes></my-recipes>'
      })
      .state('tabs.newRecipe', {
        url: '/newRecipe',
        template: '<new-recipe></new-recipe>'
      })
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
