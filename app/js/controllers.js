'use strict';

/* Controllers */

var vicciappControllers = angular.module("vicciappControllers", []);


vicciappControllers.controller('artistController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/artists.json').success(function(data) {
      $scope.viewableArtists = data;
    });

    $scope.pageTitle = 'Artists.';
  }]);
/*
vicciappControllers.controller('artistController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/artists.json').success(function(data) {
          $scope.viewableArtists = data;
            });
      $scope.pageTitle = "Artists.";
}]);
*/
vicciappControllers.controller('eventController', function($scope, $http) {

/*
this.api_eventList = "http://api.getvicci.com/api/event/event_details";
this.lastEventListUpdate ='';
$.ajax({
type: 'POST',
data: {eventId: '61', lastUpdatedTime: this.lastEventListUpdate},
url: this.api_eventList,
success: function(json) {
$scope.viewableEvents = json.events;
console.log(JSON.stringify(json));
},
error: function(e) {
  console.log(e.message);
}
});
console.log($scope.viewableEvents);
*/

/*$http.post('http://api.getvicci.com/api/event/event_lists', {lastUpdatedTime: ''}).success(function(data) {
  $scope.viewableEvents = data.events ;
  });*/


    $http.get('data/events-00.json').success(function(data) {
          $scope.viewableEvents = data.events;
            });
      $scope.pageTitle = "Events.";
});

vicciappControllers.controller('merchController', ['$scope', '$routeParams', 
  function($scope, $routeParams) {
  $scope.eventId = $routeParams.eventId;
  $scope.pageTitle = "Merchandise.";
}]);


/*
this.lastEventListUpdate = ""
this.api_eventList = "http://api.getvicci.com/api/event/event_lists"
this.api_eventDetails = "http://api.getvicci.com/api/event/event_details"
this.api_payment = "http://api.getvicci.com/api/payment/pay"
this.api_login = "http://api.getvicci.com/api/user/login"

this.getEventList = function(callback){
$.ajax({
type: 'POST',
data: {lastUpdatedTime: this.lastEventListUpdate},
url: this.api_eventList,
success: function(json) {
window.localStorage.setItem("events", JSON.stringify(json));
this.lastEventListUpdate = json.lastUpdatedTime
if (callback) {
callback()
}
},
error: function(e) {
  console.log(e.message);
}
});
}
*/

/*

$http({
    method: 'POST',
      url:'http://api.getvicci.com/api/event/event_lists',
        headers: {},
          data: {"lastUpdatedTime": ""}});



artistManager.controller('artistController', function($scope) {
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




