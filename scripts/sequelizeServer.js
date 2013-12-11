
var express = require('express');
var Sequelize = require('sequelize');
var http = require('http');
var path = require('path');

var sequelize = new Sequelize('testingviccinew', 'root', 'FFBEsyAI', {
	host: 'localhost',
	port: 8888
});


var app = express()
var clientDir = path.join(__dirname, '../app')

app.configure(function() {
  app.set('port', 1337)
  app.use(app.router)
  app.use(express.static(clientDir))
})

app.get('/', function(req, res) {
	
	console.log('\n\nI am going to try querying first, and then serve up the page afterwards\n\n');
	
    var query = sequelize.query('SELECT * FROM test.clothes').success(function(rows){
    	console.log('\nI am about to print rows:');
		console.log(rows);
    }).error(function(err) {
    	console.log('I AM AN ERROR: ' + err);
    });
 
  	res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/events', function(req, res) {
  res.sendfile(path.join(clientDir, 'events.html'))
})


var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
