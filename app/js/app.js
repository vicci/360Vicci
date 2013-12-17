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
      when('/categories/:eventId', {
        templateUrl: 'partials/categories.html',
        controller: 'categoriesController'
      }).
      when('/products/:categoryId', {
        templateUrl: 'partials/products.html',
        controller: 'productsController'
      }).
      when('/alphatest', {
        templateUrl: 'partials/alphatest.html',
        controller: 'alphatestController'
      }).
      otherwise({
        redirectTo: '/artists'
      });
  }]);
  
