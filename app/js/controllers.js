'use strict';

/* Controllers */

var artistManager = angular.module("artistManager", []);



artistManager.controller('artistController', function($scope, $http) {
    $http.get('data/artists.json').success(function(data) {
          $scope.viewableArtists = data;
            });

      $scope.pageTitle = "Artists.";
});


/*artistManager.controller('artistController', function($scope) {
  $scope.pageTitle = "Artists."
  $scope.viewableArtists = [
    {
		'name': 'Carrie Underwood',
	 	'img': 'http://ww1.prweb.com/prfiles/2012/06/24/9815034/carrie-underwood-2.jpg'
	},
    {
		'name': 'Justin Beiber',
		'img': 'http://www.billboard.com/files/styles/promo_650/public/media/justin-bieber-the-key-perfume-650-430.jpg'
	},
    {
		'name': 'Joey Cozza',
		'img': 'https://scontent-a-lax.xx.fbcdn.net/hphotos-ash2/217217_179826965402769_8331873_n.jpg'
	},
    {
		'name': 'Mikey Murphy',
		'img': 'https://scontent-b-lax.xx.fbcdn.net/hphotos-ash3/558634_4183476898960_1054087519_n.jpg'
	},
	{
		'name': 'Jin Lee',
		'img': 'https://scontent-b-lax.xx.fbcdn.net/hphotos-ash4/1001581_10153121023335416_1540078767_n.jpg'
	}
  ];
});*/
