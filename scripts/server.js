var express = require('express');
var mysql = require('mysql');
var http = require('http');
var path = require('path');

var connection = mysql.createConnection({
	host: '',
	user: 'api',
	password: 'V4f23k4uEI2J8R1L14KF',
});

connection.connect(function(err) {
	console.log(err);
});


var app = express()
var clientDir = path.join(__dirname, '../app')

app.configure(function() {
  app.set('port', 1337)
  app.use(app.router)
  app.use(express.static(clientDir))
})

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/events', function(req, res) {
  res.sendfile(path.join(clientDir, 'events.html'))
})


var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
