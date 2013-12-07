
var express = require('express');
var mysql = require('mysql');
var http = require('http');
var path = require('path');

va

r connection = mysql.createConnection({
	host: 'localhost',
	user: 'root@localhost',
  port: '8888',
  database: 'api_node'
});

connection.connect(function(err) {
	console.log(err);
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();


var app = express()
var clientDir = path.join(__dirname, '../app')

app.configure(function() {
  app.set('port', 1337)
  app.use(app.router)
  app.use(express.static(clientDir))
})

app.get('/', function(req, res) {
	
	console.log('\n\nI am going to try querying first, and then serve up the page afterwards\n\n');
	
	
	
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
    });
 
	console.log('this is a connection object\n\n');
	console.log(connection);
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
