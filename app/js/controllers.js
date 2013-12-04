'use strict';

/* Controllers */

var artistManager = angular.module("artistManager", []);

artistManager.controller('artistController', function($scope) {
  $scope.viewableArtists = [
    {'name': 'Carrie Underwood'},
    {'name': 'Justin Biber'},
    {'name': 'Joey Cozza'},
    {'name': 'Mikey Murphy'}
  ];
});
