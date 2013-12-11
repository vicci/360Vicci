
var express = require('express');
var http = require('http');
var path = require('path');

<<<<<<< HEAD
=======
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root@localhost',
  port: '3306',
  database: 'api_node'
});
>>>>>>> 069b1fd216825cb8c18517933e7fc82739fa684e


console.log('before executing the query')




var app = express()
var clientDir = path.join(__dirname, '../app')

app.configure(function() {
  app.set('port', 1337)
  app.use(app.router)
  app.use(express.static(clientDir))
})

app.get('/', function(req, res) {
  console.log("sending: " + path.join(clientDir, "index.html"));
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/events', function(req, res) {
  res.sendfile(path.join(clientDir, 'events.html'))
})


var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});

