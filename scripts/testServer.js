
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
	
	var query = sequelize.query('insert into artist (name, image) values (\'' + req.body.artistName + '\', \'' + req.body.artistImage + '\')')
		.success(function() {
			console.log('adding artist into table');
			res.send(200);					
		}).error(function(err) {
			console.log('Error adding artist to database: \n');
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

app.post('/products', function(req, res) {
  		
  	var query = sequelize.query('SELECT * FROM product where booth_id = ' + req.body.boothId)
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



var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
