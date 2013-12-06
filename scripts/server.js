var express = require('express')
var http = require('http')
var path = require('path')
console.log('-------------------------------')

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

var server = http.createServer(app)

server.listen(app.get('port'), function() {
  console.log('listening on: %d', app.get('port'))
});
