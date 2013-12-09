
var express = require('express');
var Sequelize = require('sequelize');
var http = require('http');
var path = require('path');

var sequelize = new Sequelize('api_node', 'root@localhost', null, {
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
	
    sequelize.query('SELECT * FROM event').success(function(rows){
    	console.log('\nI am about to print rows:');
		console.log(rows);
    });
 
	console.log('\n\nthis is a sequelize object:');
	console.log(sequelize);
	console.log('\n\n');
 
  	res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/events', function(req, res) {
  res.sendfile(path.join(clientDir, 'events.html'))
})


var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
