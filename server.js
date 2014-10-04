
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// var application = require('./routes/application');
// var controller = require('./routes/controller');

var app = module.exports.app = express.createServer();
var io = module.exports.io = require('socket.io')(app);

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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

// Socket.IO

// Routes){}

app.get('/', routes.index);

module.exports.sockets = {};

// Create App
// app.post('/application', application.create);
// Create Controller
// app.post('/controller', controller.create);

io.on('connection', function(socket){
  socket.on('echo', function(data){
    io.emit('echo', data);
  });
});

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

app.listen(port || 8000, ip);
