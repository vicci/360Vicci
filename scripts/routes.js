
module.exports = function(app, passport) {
  
  
  app.options('/', function(req, res) {
      	
  	res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
      
      res.send(200);
  });
  app.options('/artists', function(req, res) {
      	
  	res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
      
      res.send(200);
  });
  app.options('/events', function(req, res) {
      	
  	res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
      
      res.send(200);
  });
  app.options('/categories', function(req, res) {
      	
  	res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
      
      res.send(200);
  });
  app.options('/products', function(req, res) {
      	
  	res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
      
      res.send(200);
  });
  
  app.get('/artists', function(req, res) {
  	  		
    var query = sequelize.query('SELECT * FROM artist').success(function(rows){
     	  res.send(rows);
      }).error(function(err) {
        console.log('I AM AN ERROR: ' + err);
      });
  	
  })
  
  app.put('/artists', function(req, res) {
  	
  	var query = sequelize.query('insert into artist (name, image) values (\'' + req.body.artistName + '\', \'' + req.body.artistImage + '\')')
  		.success(function() {
  			console.log('added artist into table');
  			res.send(200);					
  		}).error(function(err) {
  			console.log('Error adding artist to database: \n');
  			console.log(err);
  			res.send(500);
  		});
  	
  });
  
  app.delete('/artists', function(req, res) {
  	
  	//artistid NOT artistId because the headers are automatically lowercased when sent over the wire
  	var query = sequelize.query('delete from artist where id = ' + req.headers.artistid)
  		.success(function() {
  			console.log('deleted artist from table');
  			res.send(200);
  		}).error(function(err) {
  			console.log('Error deleting artist from database:\n');
  			console.log(err);
  			res.send(500);
  		});
  	
  });
  
  app.post('/events', function(req, res) {
  	
  	var query = sequelize.query('SELECT * FROM event where artist_id = ' + req.body.artistId)
  		.success(function(rows) {
  			res.send(rows);
  		}).error(function(err) {
  			console.log('ERROR: ' + err);
  		});
  	
  });
  
  app.put('/events', function(req, res){
  	
  	var query = sequelize.query('INSERT INTO event(title, description, address, image, latitude, longitude, start_date, end_date, status, access_code, enable_verification, radius, artist_id) VALUES (\'' + req.body.title + '\', \'' + req.body.description + '\', \'' + req.body.address + '\', \'' + req.body.image + '\', \'' + req.body.latitude + '\', \'' + req.body.longitude + '\', \'' + req.body.startDate + '\', \'' + req.body.endDate + '\', ' + req.body.status + ', \'' + req.body.accessCode + '\', ' + req.body.enableVerification +', ' + req.body.radius +', ' + req.body.artistId + ')')
  	.success(function(){
  		console.log('adding event into database');
  	})
  	.error(function(err){
  		console.log('Error adding event into database:');
  		console.log(err);
  		res.send(500);
  	});
  	
  });
  
  app.delete('/events', function(req, res) {
  
  	//eventid NOT eventId because the headers are automatically lowercased when sent over the wire
  	var query = sequelize.query('delete from event where id =' + req.headers.eventid)
  		.success(function() {
  			console.log('deleted event from table');
  			res.send(200);
  		}).error(function(err) {
  			console.log('Error deleting event from database:\n');
  			console.log(err);
  			res.send(500);
  		});
  	
  });
  
  app.post('/categories', function(req, res) {
    		
    	var query = sequelize.query('SELECT * FROM booth where event_id = ' + req.body.eventId)
  		.success(function(rows){
  	  	  	res.send(rows);
      	}).error(function(err) {
        	  	console.log('ERROR: ' + err);
      	});
  })
  
  app.put('/categories', function(req, res) {
  
  	var query = sequelize.query('INSERT INTO booth(event_id, name, image) VALUES (' + req.body.eventId + ',\'' + req.body.name + '\',\'' + req.body.image + '\')')
  		.success(function() {
  			console.log('added category into database');
  		})
  		.error(function(err) {
  			console.log('Error adding category into database:');
  			console.log(err);
  			res.send(500);
  		});
  	
  });
  
  app.delete('/categories', function(req, res) {
  	
  	//categoryid NOT categoryId because the headers are automatically lowercased when sent over the wire
  	var query = sequelize.query('delete from booth where id =' + req.headers.categoryid)
  		.success(function() {
  			console.log('deleted category from table');
  			res.send(200);
  		}).error(function(err) {
  			console.log('Error deleting category from database:\n');
  			console.log(err);
  			res.send(500);
  		});
  	
  });
  
  app.post('/products', function(req, res) {
    		
    	var query = sequelize.query('SELECT * FROM product where booth_id = ' + req.body.categoryId)
  		.success(function(rows){
  	  	  	res.send(rows);
      	}).error(function(err) {
        	  	console.log('ERROR: ' + err);
      	});
  })
  
  app.put('/products', function(req, res) {
  
  	var query = sequelize.query('INSERT INTO product(product_sku, title, description, image, booth_id, size, price, weight) VALUES (\'' + req.body.productSKU + '\',  \'' + req.body.title + '\',  \'' + req.body.description + '\', \'' + req.body.image + '\',' + req.body.boothId + ',  \'' + req.body.size + '\',' + req.body.price + ', ' + req.body.weight + ')')
  		.success(function() {
  			console.log('added product into database');
  		})
  		.error(function(err) {
  			console.log('Error adding product into database:');
  			console.log(err);
  			res.send(500);
  		});
  	
  });
  
  app.delete('/products', function(req, res) {
  	
  	//productid NOT productId because the headers are automatically lowercased when sent over the wire
  	var query = sequelize.query('delete from product where id =' + req.headers.productid)
  		.success(function() {
  			console.log('deleted product from table');
  			res.send(200);
  		}).error(function(err) {
  			console.log('Error deleting product from database:\n');
  			console.log(err);
  			res.send(500);
  		});
  	
  });
} //end of module.exports



//check to see if the user is loggedin=:
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};
