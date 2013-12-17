
var express = require('express');
var http = require('http');
var path = require('path');


var app = express()
var clientDir = path.join(__dirname, '../app')
var allowXDomain = function(req, res, next) {
  console.log("function allowXDomain")
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
  if(req.method === 'OPTIONS')
  {
    res.send(200);
  }
  else
  {
    next();
  }
};

app.configure(function() {
  app.set('port', 1337)
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router)
  app.use(express.static(clientDir))
  app.use(allowXDomain);
})

app.get('/', function(req, res) {
  console.log("sending: " + path.join(clientDir, "index.html"));
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
  if(req.method === 'OPTIONS')
  {
    res.send(200);
  }
  res.sendfile(path.join(clientDir, 'index.html'))
})

/*app.get('/events', function(req, res) {
  console.log("sending: " + path.join(clientDir, "events.html"));
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-type, Content-Length, Authorization, Origin, Accept')
  if(req.method === 'OPTIONS')
  {
    res.send(200);
  }
  console.log("HELLO THERE")
  res.sendfile(path.join(clientDir, 'index.html'))
  console.log("events.html sent");
})
*/

var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});

