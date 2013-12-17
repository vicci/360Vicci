
var express = require('express');
var Sequelize = require('sequelize');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');


//setting up sequelize this way worked running a little test database locally
//it was a MySQL database 
var sequelize = new Sequelize('api_test', 'api', 'V4f23k4uEI2J8R1L14KF', {
  host: 'localhost',
  port: 3306
});


var app = express()
var clientDir = path.join(__dirname, '../app')

// required('./config/passport')(passport); //pass passport for configuration

app.configure(function() {
	
  app.set('port', 1337)
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router)
  app.use(express.session( {secret: 'vicciappROX'} ));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(express.static(clientDir))
})


// all the routes:
require('./routes.js')(app, passport);

var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
