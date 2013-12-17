
var express = require('express');
var Sequelize = require('sequelize');
var http = require('http');
var path = require('path');

var sequelize = new Sequelize('test', 'root', 'FFBEsyAI', {
	host: '127.0.0.1',
	port: 3306
});


//authenticating that the database was connected to correctly
sequelize.authenticate().complete(function(err) {
	if(!err) {
		console.log('Connection has been established successfully.');
	} else {
		console.log('Unable to connect to the database');
	}
})
var qi = sequelize.getQueryInterface();
var Clothes;
qi.describeTable('clothes')
.success(function(data) {
	Clothes = sequelize.define('Clothes',data);
}).error(function(err) {
	console.log(err);
})



var app = express()
var clientDir = path.join(__dirname, '../app')

app.configure(function() {
  app.set('port', 1337)
  app.use(app.router)
  app.use(express.static(clientDir))
})

app.get('/', function(req, res) {
	
	var injection = '1 OR True';
	
	sequelize.query('select * from clothes where id = ' + qi.escape(injection))
	.success(function(rows) {
		console.log('Printing injected rows');
		console.log(rows);
	})

	//Ideally we would do it like this!!
	/*
	Clothes.findAll({where:{id:injection}})
	.success(function(data) {
		console.log('Printing the safer sql query');
		var rows=[];
		for(var i=0; i < data.length; i++) {
			rows.push(data[i].selectedValues);
		}
		console.log('about to print safe sql rows');
		console.log(rows);
	}).error(function(err) {
		console.log(err);
	})*/	
	

  	res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/events', function(req, res) {
  res.sendfile(path.join(clientDir, 'events.html'))
})


var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});

