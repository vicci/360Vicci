
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
    
	console.log('\na\naGOT INTO OPTIONS \"node/\"\na\na');
	
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
    
      res.send(200);
	
});

app.get('/', function(req, res) {
	
	console.log('\na\na\n Got into GET\"node/\"');
  		
  var query = sequelize.query('SELECT * FROM event').success(function(rows){
      
	  console.log('\na\na\nPRINTING ROWS\na\n');
	  console.log(rows);
	  res.send(rows);
    }).error(function(err) {
      console.log('I AM AN ERROR: ' + err);
    });
})


app.post('/merch', function(req, res) {
	
	console.log('\na\na\n Got into \"node/merch\"');
	console.log(req);
  		
  	var query = sequelize.query('SELECT * FROM booth').success(function(rows){
      
	  console.log('\na\na\nPRINTING ROWS\na\n');
	  console.log(rows);
	  res.send(rows);
    }).error(function(err) {
      console.log('I AM AN ERROR: ' + err);
    });
})



var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
