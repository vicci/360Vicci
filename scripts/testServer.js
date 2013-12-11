
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
  app.use(app.router)
  app.use(express.static(clientDir))
})

app.get('/', function(req, res) {

  console.log(sequelize);
		
sequelize.query('SELECT * FROM event').success(function(rows){
      console.log('\nI am about to print rows:');
    console.log(rows);
    }).error(function(err) {
      console.log('I AM AN ERROR: ' + err);
    });
 
})

app.get('/events', function(req, res) {})


var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
