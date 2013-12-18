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

vicciappControllers.controller('loginCheckController', ['$scope', '$http',
		function($scope, $http) {
			$scope.loggedIn = get_login_status();

		

  }]);

vicciappControllers.controller('loginController', ['$scope', '$http',
		function($scope, $http) {
			if (lsStore.getCustomerId()){
				window.location.hash = "/artists";
				set_login_status(true);
			}else{
				set_login_status(false);
			}

			$scope.ajax = new ajaxCalls();
			$scope.signUpView = true;
			$scope.pwShow = false;
			$scope.labelValue = "[Existing User]";

			$scope.signUp = function(){
				var login = {};
				login.emailId = $scope.email;
				if (!login.emailId.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\s*$/)){
					alert("Not a valid email")
					return
				}
				login.password = $scope.pw;
				if (login.password.length < 3){
					alert("We can manage a password length of at least 3 right?\nLet's do it!")
					return
				}
				
				if ($scope.signUpView)
					login.isSignIn = 0;
				else
					login.isSignIn = 1;

				login.loginProvider = 1;
				login.userId = "";
				
				$scope.ajax.login(login, function(){
					var hash = window.location.hash
					window.location.hash = "#/artists"
				})
				console.log($scope.ajax);
			}

			$scope.toggleLogin = function(){
				if ($scope.signUpView){
					$scope.labelValue = "[New User]";
					$("#login-button").text("Sign In");
					$("#login-button").css("background-color", "rgba(255,79,2,1)");
					$scope.signUpView = false;
				}else{
					$scope.labelValue = "[Existing User]";
					$("#login-button").text("Sign Up");
					$("#login-button").css("background-color", "#414141");
					$scope.signUpView = true;
				}
			}

			$scope.pwToggle = function(){
				if ($scope.pwShow){
					$("input[name='password']").get(0).type='password';
					$("#pw-image").attr("src", "img/eyeopen.png");
					$("#pw-image").attr("title", "Show Password");
					$scope.pwShow = false;
				}else{
					$("input[name='password']").get(0).type='text';
					$("#pw-image").attr("src", "img/eyeclose.png");
					$("#pw-image").attr("title", "Hide Password");
					$scope.pwShow = true;
				}
			}
  }]);

	var lsStore = new LocalStorageStore();
	var loggedIn = false;
	function get_login_status(){
		console.log(loggedIn);
		return loggedIn;
	};

	function set_login_status(stat){
		loggedIn = stat;
	};

vicciappControllers.controller('artistController', ['$scope', '$http',
  function($scope, $http) {
		if (!lsStore.getCustomerId()){
			window.location.hash = "/login";
			set_login_status(false);
		}else{
			set_login_status(true);
		}
	  $scope.getArtists = function(){
			$http({method: 'GET', url: 'http://www.getvicci.com/node/artists'}).
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
    $scope.getProducts = function(){
		if (!lsStore.getCustomerId()){
			window.location.hash = "/login";
			set_login_status(false);
		}else{
			set_login_status(true);
		}
		$http({method: 'POST', url:'http://www.getvicci.com/node/products', data:{'categoryId': $routeParams.categoryId}})
		  .success(function(data) {
		  console.log("angular success calling getvicci.com/products");
		  $scope.products = data;
		}).
		error(function(data, status, headers, config) {
		  console.log("ANGULAR ERROR CALLING getvicci.com/products");
		});
	}
	
    $scope.pageTitle = "Products";
	$scope.getProducts();
	$scope.formVisible = false;
	$scope.showForm = function(){
		$scope.formVisible = true;
	}
	$scope.hideForm = function(){
		$scope.formVisible = false;
	}
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
		$scope.formVisible = false;
		$scope.getProducts();
      }).error(function(err) {
        console.log("error doing PUT for PRODUCTS");
      });
    };
    
	$scope.deleteProduct = function(productId) {

		//productid NOT productId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/products', headers:{'productid': productId}})
      .success(function(data) {
        console.log("successffully deleted product from DB");
		$scope.getProducts();
      }).error(function(err) {		
        console.log("error doing product delete");
      });
    };
    
    $scope.categoryId = $routeParams.categoryId;
}]);


vicciappControllers.controller('categoriesController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
	if (!lsStore.getCustomerId()){
			window.location.hash = "/login";
			set_login_status(false);
		}else{
			set_login_status(true);
		}
    $scope.getCategories = function(){$http({method: 'POST', url: 'http://www.getvicci.com/node/categories', data:{'eventId': $routeParams.eventId}}).success(function(data) {
      console.log("ANGULAR SUCCESS calling getvicci.com/categories");
      $scope.categories = data;
    }).
    error(function(data, status, headers, config) {
      console.log("ANGULAR ERROR CALLING getvicci.com/categories");
    });
	}

  $scope.pageTitle = "Categories";
	$scope.getCategories();
	$scope.formVisible = false;
	$scope.showForm = function(){
		$scope.formVisible = true;
	}
	$scope.hideForm = function(){
		$scope.formVisible = false;
	}

  $scope.addCategory = function() {
    $http({method: 'PUT', url: 'http://www.getvicci.com/node/categories', data: {
      	'name': $scope.form.categoryName,
      	'image': $scope.form.categoryImage,
      	'eventId': $routeParams.eventId }})
		.success(function(data, status, headers, config) {
      		console.log("successfully added CATEGORY into DB");
			$scope.formVisible = false;
			$scope.getCategories();
    	}).error(function(err) {
      		console.log("error doing PUT for CATEGORY");
    	});
	};
   $scope.deleteCategory = function(categoryId) {

		//categoryid NOT categoryId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/categories', headers:{'categoryid':categoryId}})
      .success(function(data) {
        console.log("successffully deleted category from DB");
		$scope.getCategories();
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
	if (!lsStore.getCustomerId()){
			window.location.hash = "/login";
			set_login_status(false);
		}else{
			set_login_status(true);
		}
    $scope.getEvents = function(){
		$http({method: 'POST', url: 'http://www.getvicci.com/node/events', data:{'artistId': $routeParams.artistId}}).
		  success(function(data, status, headers, config) {
			  console.log('ANGULAR CALLING NODE GETTING EVENTS SUCCESS');
			$scope.viewableEvents = data;
		  }).
		  error(function(data, status, headers, config) {
				console.log('ANGULAR ERROR CALLING GETVICCI.COM/NODE');
		  });
	}

	$scope.getEvents();
	$scope.formVisible = false;
	$scope.showForm = function(){
		$scope.formVisible = true;
	}
	$scope.hideForm = function(){
		$scope.formVisible = false;
	}

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
		$scope.formVisible = false;
		$scope.getEvents();
    }).error(function(err) {
      console.log("error doing put for event");
    });
  };
    $scope.deleteEvent = function(eventId) {
		
	  //eventid NOT eventId because the headers are automatically lowercased when sent over the wire
      $http({method: 'DELETE', url: 'http://www.getvicci.com/node/events', headers:{'eventid': eventId}})
      .success(function(data) {
		$scope.getEvents();
        console.log("successffully deleted event from DB");
      }).error(function(err) {		
        console.log("error doing event delete");
      });
    };
	
    $scope.pageTitle = "Events.";
    $scope.artistId = $routeParams.artistId;
}]);










