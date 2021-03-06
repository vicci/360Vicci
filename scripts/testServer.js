
var express = require('express');
var Sequelize = require('sequelize');
var http = require('http');
var path = require('path');

//setting up sequelize this way worked running a little test database locally
//it was a MySQL database 
var sequelize = new Sequelize('api_test', 'api', 'V4f23k4uEI2J8R1L14KF', {
  host: 'localhost',
  port: 3306
});
var qi = sequelize.getQueryInterface();

var app = express()
var clientDir = path.join(__dirname, '../app')


app.configure(function() {
	
  app.set('port', 1337)
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router)
  app.use(express.static(clientDir))
})

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
	
	var query = sequelize.query('insert into artist (name, image) values (' + qi.escape(req.body.artistName) + 
								', ' + qi.escape(req.body.artistImage) + ')')
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
	var query = sequelize.query('delete from artist where id = ' + qi.escape(req.headers.artistid))
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
	
	var query = sequelize.query('SELECT * FROM event where artist_id = ' + qi.escape(req.body.artistId))
		.success(function(rows) {
			res.send(rows);
		}).error(function(err) {
			console.log('ERROR: ' + err);
		});
	
});

app.put('/events', function(req, res){
	
	var query = sequelize.query('INSERT INTO event(title, description, address, image, latitude, longitude, start_date, end_date, status, access_code, enable_verification, radius, artist_id) VALUES (' 
								+ qi.escape(req.body.title) + ', ' + qi.escape(req.body.description)
								 + ', ' + qi.escape(req.body.address) + ', ' + qi.escape(req.body.image)
								  + ', ' + qi.escape(req.body.latitude) + ', ' + qi.escape(req.body.longitude)
								   + ', ' + qi.escape(req.body.startDate) + ', ' + qi.escape(req.body.endDate)
								    + ', ' + qi.escape(req.body.status) + ', ' + qi.escape(req.body.accessCode)
									 + ', ' + qi.escape(req.body.enableVerification) +', ' + qi.escape(req.body.radius)
									  +', ' + qi.escape(req.body.artistId) + ')')
	.success(function(){
		console.log('adding event into database');
		res.send(200);
	})
	.error(function(err){
		console.log('Error adding event into database:');
		console.log(err);
		res.send(500);
	});
	
});

app.delete('/events', function(req, res) {

	//eventid NOT eventId because the headers are automatically lowercased when sent over the wire
	var query = sequelize.query('delete from event where id =' + qi.escape(req.headers.eventid))
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
  		
  	var query = sequelize.query('SELECT * FROM booth where event_id = ' + qi.escape(req.body.eventId))
		.success(function(rows){
	  	  	res.send(rows);
    	}).error(function(err) {
      	  	console.log('ERROR: ' + err);
    	});
})

app.put('/categories', function(req, res) {

	var query = sequelize.query('INSERT INTO booth(event_id, name, image) VALUES (' + qi.escape(req.body.eventId)
		 						+ ',' + qi.escape(req.body.name) + ',' + qi.escape(req.body.image) + ')')
		.success(function() {
			console.log('added category into database');
			res.send(200);
		})
		.error(function(err) {
			console.log('Error adding category into database:');
			console.log(err);
			res.send(500);
		});
	
});

app.delete('/categories', function(req, res) {
	
	//categoryid NOT categoryId because the headers are automatically lowercased when sent over the wire
	var query = sequelize.query('delete from booth where id =' + qi.escape(req.headers.categoryid))
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
  		
  	var query = sequelize.query('SELECT * FROM product where booth_id = ' + qi.escape(req.body.categoryId))
		.success(function(rows){
	  	  	res.send(rows);
    	}).error(function(err) {
      	  	console.log('ERROR: ' + err);
    	});
	
})

app.put('/products', function(req, res) {

	var query = sequelize.query('INSERT INTO product(product_sku, title, description, image, booth_id, size, price, weight) VALUES (' 
								+ qi.escape(req.body.productSKU) + ',  ' + qi.escape(req.body.title)
								 + ',  ' + qi.escape(req.body.description) + ', ' + qi.escape(req.body.image)
								  + ',' + qi.escape(req.body.boothId) + ',  ' + qi.escape(req.body.size)
								   + ',' + qi.escape(req.body.price) + ', ' + qi.escape(req.body.weight) + ')')
		.success(function() {
			console.log('added product into database');
			res.send(200);
		})
		.error(function(err) {
			console.log('Error adding product into database:');
			console.log(err);
			res.send(500); 
		});
	
});

app.delete('/products', function(req, res) {
	
	//productid NOT productId because the headers are automatically lowercased when sent over the wire
	var query = sequelize.query('delete from product where id =' + qi.escape(req.headers.productid))
		.success(function() {
			console.log('deleted product from table');
			res.send(200);
		}).error(function(err) {
			console.log('Error deleting product from database:\n');
			console.log(err);
			res.send(500);
		});
	
});

app.post('/login', function(req, res) {
	
	
	if(req.body.isSignIn === '0'){
		//signing up
		var query = sequelize.query('insert into manager_user(email_id, is_sign_in, password) values()')

	} else {
		//signing in
		var query = sequelize.query('select * from ')
		
	}
	
});



var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
