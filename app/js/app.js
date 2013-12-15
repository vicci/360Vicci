'use strict';

/* App Module */

var vicciApp = angular.module('vicciApp', [
  'ngRoute',
  'vicciappControllers'
]);

vicciApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/artists', {
        templateUrl: 'partials/artists.html',
        controller: 'artistController'
      }).
      when('/events/:artistId', {
        templateUrl: 'partials/events.html',
        controller: 'eventController'
      }).
      when('/events/:artistId/:eventId', {
        templateUrl: 'partials/merch.html',
        controller: 'merchController'
      }).
      when('/events/:artistId/:eventId/:category/:categoryId', {
        templateUrl: 'partials/merch-details.html',
        controller: 'merchDetailsController'
      }).
      when('/alphatest', {
        templateUrl: 'partials/alphatest.html',
        controller: 'alphatestController'
      }).
      otherwise({
        redirectTo: '/artists'
      });
  }]);
  
