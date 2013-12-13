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
      when('/events', {
        templateUrl: 'partials/events.html',
        controller: 'eventController'
      }).
      when('/events/:eventId', {
        templateUrl: 'partials/merch.html',
        controller: 'merchController'
      }).
      when('/events/:eventId/:category/:categoryId', {
        templateUrl: 'partials/merch-details.html',
        controller: 'merchDetailsController'
      }).
      otherwise({
        redirectTo: '/artists'
      });
  }]);
  
