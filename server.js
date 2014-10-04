
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var app = module.exports = express.createServer();
var io = require('socket.io')(app);

// Configuration

app.configure(function(){
	app.use(express.cookieParser());
    app.use(express.session({secret: '1234567890QWERTY'}));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Socket.IO

// Routes

app.get('/', routes.index);

// Create App
// app.post('/application', application.create);
// app.postI'/controller', controller.create);
io.on('connection', function(socket){
  console.log("New connection");
  socket.on('echo', function(data){
    console.log('echoing ' + data + ' back to client');
    io.emit('echo', data);
  });
});

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

app.listen(port || 8000, ip);
