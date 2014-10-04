
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

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

// Socket.IO

// Routes

app.get('/', routes.index);
app.get('/controller', routes.controller);
app.get('/application', routes.application);

module.exports.sockets = {};

var instances = {};

io.on("connection", function(socket){
  
  console.log(instances);
  
  var isSocketTypeSet = false;
  
  socket.on('initialize-application', function(data){
    if (isSocketTypeSet){
      socket.emit("error", "Controller cannot also be application");
      return;
    }
    if (!data.id){
      socket.emit("error", "id not defined");
      return;
    }
    var id = data.id;
    if (instances.hasOwnProperty(id)){
      socket.emit("error", "id already exists");
      return;
    }
    var instance = {
      application : socket,
      controllers : []
    };
    instances[id] = instance;
    isSocketTypeSet = true;
    socket.emit("connection", true);
  });
  
  socket.on('initialize-controller', function(data){
    if (isSocketTypeSet){
      socket.emit("error", "Application cannot also be controller");
      return;
    }
    if (!data.id){
      socket.emit("error", "id not defined");
      return;
    }
    var instanceId = data.id;
    var instance = instances[instanceId];
    if (!instance){
      socket.emit("error", "Application doesn't exist");
      return;
    }
    instance.controllers.append(socket);
    socket.on('controller-event', function(data){
      var application = instances[instanceId].application;
      application.emit("controller-event", data);
    });
    isSocketTypeSet = true;
    socket.emit("connection", true);
  });
  
});

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

app.listen(port || 8000, ip);
