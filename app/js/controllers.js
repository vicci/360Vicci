'use strict';

/* Controllers */

var vicciappControllers = angular.module("vicciappControllers", []);

vicciappControllers.directive('stopEvent', function () {
  return {
    link: function (scope, element, attr) {
      element.bind(attr.stopEvent, function (e) {
          e.stopPropagation();
      });
    }
  };
});
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
	  $scope.getArtists = function(){$http({method: 'GET', url: 'http://www.getvicci.com/node/artists'}).
	        success(function(data, status, headers, config) {
            console.log("angular calling node getting artists success");
				    $scope.viewableArtists = data;
	        }).
	        error(function(data, status, headers, config) {
            console.log("angular error calling getvicci.com/node/artists");
	          // called asynchronously if an error occurs
	          // or server returns response with an error status.
	        });}
   	$scope.getArtists();
	$scope.formVisible = false;
	$scope.showForm = function(){
		$scope.formVisible = true;
	}
	$scope.hideForm = function(){
		$scope.formVisible = false;
	}

    $scope.addArtist = function() {	
	    $http({method: 'PUT', url: 'http://www.getvicci.com/node/artists', data:{'artistName': $scope.form.artistName, 'artistImage': $scope.form.artistImg}})
			.success(function(data) {
				console.log('Successfully added artist ' + $scope.form.artistName +' into DB');
				$scope.getArtists();
				$scope.formVisible = false;
	    	}).error(function(err) {
				  console.log('Error doing PUT')
	    	});  
    };
	
    $scope.deleteArtist = function(artistId) {

		//artistid NOT artistId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/artists', headers:{'artistid': artistId}})
      .success(function(data) {
        console.log("successffully deleted artist from DB");
		$scope.getArtists();
      }).error(function(err) {		
        console.log("error doing artist delete");
      });
    };

    $scope.pageTitle = 'Artists';
  }]);

vicciappControllers.controller('productsController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http({method: 'POST', url:'http://www.getvicci.com/node/products', data:{'categoryId': $routeParams.categoryId}})
      .success(function(data) {
      console.log("angular success calling getvicci.com/products");
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
        console.log("successfully added product into DB");
      }).error(function(err) {
        console.log("error doing PUT for PRODUCTS");
      });
    };
    
	$scope.deleteProduct = function(productId) {

		//productid NOT productId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/products', headers:{'productid': productId}})
      .success(function(data) {
        console.log("successffully deleted product from DB");
      }).error(function(err) {		
        console.log("error doing product delete");
      });
    };
    
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
      	'eventId': $routeParams.eventId }})
		.success(function(data, status, headers, config) {
      		console.log("successfully added CATEGORY into DB");
    	}).error(function(err) {
      		console.log("error doing PUT for CATEGORY");
    	});
	};
   $scope.deleteCategory = function(categoryId) {

		//categoryid NOT categoryId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/categories', headers:{'categoryid':categoryId}})
      .success(function(data) {
        console.log("successffully deleted category from DB");
      }).error(function(err) {		
        console.log("error doing category delete");
      });
     };
	 
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
    }).error(function(err) {
      console.log("error doing put for event");
    });
  };
    $scope.deleteEvent = function(eventId) {
		
	  //eventid NOT eventId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/events', headers:{'eventid': eventId}})
      .success(function(data) {
        console.log("successffully deleted event from DB");
      }).error(function(err) {		
        console.log("error doing event delete");
      });
    };
	
    $scope.pageTitle = "Events.";
    $scope.artistId = $routeParams.artistId;
}]);

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








