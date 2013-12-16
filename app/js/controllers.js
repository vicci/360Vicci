'use strict';

/* Controllers */

var vicciappControllers = angular.module("vicciappControllers", []);


/*
the following controller is for alpha tests.
ie. any testing for code we want to run
*/
/*
$scope.uploadFile = function((files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

    $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success( ...all right!... ).error( ..damn!... );

});*/


/*
NOTE TO SELVES. TRYING TO FIGURE OUT THE CLOSINGS PROPERLY FOR UPLOADING FILES...
http://jsfiddle.net/vishalvasani/4hqVu/
*/
/*vicciappControllers.controller('alphatestController', ['$scope', '$routeParams', '$http',
function($scope, $routeParams, $http){
    console.log("hello there");
}]
$scope.pageTitle = 'alpha testing'
  $scope.uploadFile = function(element) {
    $scope.$apply(function(scope) {
      console.log("inside the scope.apply function stuff.");
      $scope.files = [];
      for(var i = 0 ; i < element.files.length; i ++) {
        $scope.files.push(element.files[i])
      }
    })
  }
  
);*/


vicciappControllers.controller('artistController', ['$scope', '$http',
  function($scope, $http) {
	  $http({method: 'GET', url: 'http://www.getvicci.com/node/artists'}).
	        success(function(data, status, headers, config) {
				console.log('ANGULAR CALLING NODE GETTING ARTISTS SUCCESS');
	            console.log(data);
				$scope.viewableArtists = data;
	        }).
	        error(function(data, status, headers, config) {
				console.log('ANGULAR ERROR CALLING GETVICCI.COM/NODE/ARTISTS');
	          // called asynchronously if an error occurs
	          // or server returns response with an error status.
	        });
    
    
    $scope.addArtist = function() {
		
	    $http({method: 'PUT', url: 'http://www.getvicci.com/node/artists', data:{'artistName': $scope.form.artistName, 'artistImage': $scope.form.artistImg}})
			.success(function(data) {
				console.log('Successfully added artist into DB');
				console.log('This is data: ' + data);
			
	    	}).error(function(err) {
				console.log('Error doing PUT')
	    		console.log(err);
	    	});  
    }
	
    $scope.deleteArtist = function(artistId) {

		//artistid NOT artistId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/artists', headers:{'artistid': artistId}})
      .success(function(data) {
        console.log("successffully deleted artist from DB");
        console.log("this is data: " + data);
      }).error(function(err) {		
        console.log("error doing artist delete");
        console.log(err);
      });
    }

    $scope.pageTitle = 'Artists';
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

vicciappControllers.controller('productsController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http({method: 'POST', url:'http://www.getvicci.com/node/products', data:{'categoryId': $routeParams.categoryId}})
      .success(function(data) {
      console.log("ANGULAR SUCCESS calling getvicci.com/products");
      $scope.products = data;
    }).
    error(function(data, status, headers, config) {
      console.log("ANGULAR ERROR CALLING getvicci.com/products");
    });
	
    $scope.pageTitle = "Products";
    $scope.addProduct = function() {
      $http({method: 'PUT', url: 'http://www.getvicci.com/node/products', data: {
        'title': $scope.form.productTitle,
        'description': $scope.form.productDescription,
        'productSKU': $scope.form.productSKU,
        'image': $scope.form.productImage,
        'boothId': $routeParams.categoryId,
        'size': $scope.form.productSizes,
        'price': $scope.form.productPrices,
        'weight': $scope.form.productWeight
      }}).success(function(data, status, headers, config) {
        console.log("successfully added PRODUCT into DB");
        console.log("this is data: ");
        console.log(data);
      }).error(function(err) {
        console.log("error doing PUT for PRODUCTS");
        console.log(err);
      });
    };
    $scope.deleteProduct = function(productId) {

		//artistid NOT artistId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/products', headers:{'productid': productId}})
      .success(function(data) {
        console.log("successffully deleted product from DB");
        console.log("this is data: " + data);
      }).error(function(err) {		
        console.log("error doing product delete");
        console.log(err);
      });
    }
    
    $scope.categoryId = $routeParams.categoryId;
}]);


vicciappControllers.controller('categoriesController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http({method: 'POST', url: 'http://www.getvicci.com/node/categories', data:{'eventId': $routeParams.eventId}}).success(function(data) {
      console.log("ANGULAR SUCCESS calling getvicci.com/categories");
      $scope.categories = data;
    }).
    error(function(data, status, headers, config) {
      console.log("ANGULAR ERROR CALLING getvicci.com/categories");
    });
  $scope.pageTitle = "Merchandise Categories";
  $scope.addCategory = function() {
    $http({method: 'PUT', url: 'http://www.getvicci.com/node/categories', data: {
      'name': $scope.form.categoryName,
      'image': $scope.form.categoryImage,
      'eventId': $routeParams.eventId
    }}).success(function(data, status, headers, config) {
      console.log("successfully added CATEGORY into DB");
      console.log("this is data: ");
      console.log(data);
    }).error(function(err) {
      console.log("error doing PUT for CATEGORY");
      console.log(err);
    });
   $scope.deleteCategory = function(categoryId) {

		//artistid NOT artistId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/categories', headers:{'categoryid':categoryId}})
      .success(function(data) {
        console.log("successffully deleted category from DB");
        console.log("this is data: " + data);
      }).error(function(err) {		
        console.log("error doing category delete");
        console.log(err);
      });
     }
  $scope.eventId = $routeParams.eventId;
}]);

/*
 * Event Controller::
 */
vicciappControllers.controller('eventController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http({method: 'POST', url: 'http://www.getvicci.com/node/events', data:{'artistId': $routeParams.artistId}}).
      success(function(data, status, headers, config) {
		console.log('ANGULAR CALLING NODE GETTING EVENTS SUCCESS');
        console.log(data);
		$scope.viewableEvents = data;
      }).
      error(function(data, status, headers, config) {
		    console.log('ANGULAR ERROR CALLING GETVICCI.COM/NODE');
      });
   $scope.addEvent = function() {
    $http({method: 'PUT', url: 'http://www.getvicci.com/node/events', data:{
      'artistId': $routeParams.artistId,
      'title': $scope.form.eventTitle,
      'description': $scope.form.description,
      'address': $scope.form.address,
      'image': $scope.form.eventImg,
      'latitude': $scope.form.latitude,
      'longitude': $scope.form.longitude,
      'startDate': $scope.form.startDate,
      'endDate': $scope.form.endDate,
      'status': $scope.form.status,
      'accessCode': $scope.form.accessCode,
      'enableVerification': $scope.form.enableGeo,
      'radius': $scope.form.radius,
    }}).success(function(data, status, headers, config) {
      console.log("successfully added event into DB");
      console.log("this is data: ");
      console.log(data);
    }).error(function(err) {
      console.log("error doing put for event");
      console.log(err);
    });
  };
    /*$http.get('data/events-00.json').success(function(data) {
          $scope.viewableEvents = data.events;
    });*/
    $scope.deleteEvent = function(eventId) {
		//artistid NOT artistId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/events', headers:{'eventid': eventId}})
      .success(function(data) {
        console.log("successffully deleted event from DB");
        console.log("this is data: " + data);
      }).error(function(err) {		
        console.log("error doing event delete");
        console.log(err);
      });
    }
    $scope.pageTitle = "Events.";
    $scope.artistId = $routeParams.artistId;
}]);

//artistManager.controller('loginController', function($scope){
//artistManager.controller('loginController', function($scope){
vicciappControllers.controller('loginController', function($scope){
  $scope.username = "Enter Email";
  $scope.password = "Password";
  $scope.userEmail = "me@example.com";

  $scope.verifyInput = function(){
    //if input is good i.e. email address and 
    //password are proper length etc.
    //then verify credentials
    //else re-login

    //$scope.username = "inside verifyInput()";
    //$scope.validEmail = $scope.validateEmail($scope.username);
    $scope.validEmail = validateEmail($scope.username);
    $scope.username = $scope.validEmail;

    $scope.validPw = validatePw($scope.password);
    $scope.password = $scope.validPw;
  }

  $scope.validateEmail = function(email) {
    //$scope.username = "inside validateEmail";
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePw(password) {
  if (password.length > 3)
    return true;
  else
    return false;
}





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




