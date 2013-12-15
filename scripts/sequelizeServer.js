
var express = require('express');
var Sequelize = require('sequelize');
var http = require('http');
var path = require('path');

var sequelize = new Sequelize('test', 'root', 'FFBEsyAI', {
	host: '127.0.0.1',
	port: 3306
});


var app = express()
var clientDir = path.join(__dirname, '../app')

app.configure(function() {
  app.set('port', 1337)
  app.use(app.router)
  app.use(express.static(clientDir))
})

app.get('/', function(req, res) {
		
    var query = sequelize.query('SELECT * FROM clothes').success(function(rows){
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
