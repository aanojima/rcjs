
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var app = module.exports.app = express.createServer();
var io = module.exports.io = require('socket.io')(app);

// Configuration

app.configure(function(){
	app.use(
    express.cookieParser());
    app.use(express.session({secret: '1234567890QWERTY'}));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(function(req,res,next){
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.post('/generate_id', routes.generateId);

// Socket.IO
var instances = module.exports.instances = {};

io.on("connection", function(socket){
  
  console.log(instances);
  
  var isSocketTypeSet = false;
  
  // Creating a New Application
  socket.on('initialize-application', function(data){

    // Safe-Checking
    if (isSocketTypeSet){
      socket.emit("connection-error", "already initialized");
      return;
    }
    if (!data || !data.id){
      socket.emit("connection-error", "id not defined");
      return;
    }
    var id = data.id;
    if (instances.hasOwnProperty(id)){
      socket.emit("connection-error", "id already exists");
      return;
    }

    // Remember the Application
    var instance = {
      application : socket,
      controllers : {},
      _numControllers : 0
    };
    instances[id] = instance;

    // Dereference Application and Alert All of its Controllers
    socket.on('disconnect', function(){
      for (client in instance.controllers){
        instance.controllers[client].emit('application-disconnect', true);
      }
      delete instances[id];
    });

    // Prevent Future Initialization
    isSocketTypeSet = true;

    // Successful Feedback to Client
    socket.emit("connection-success", true);
  });
  
  // Creating a New Controller
  socket.on('initialize-controller', function(data){

    // Safe-Checking
    if (isSocketTypeSet){
      socket.emit("connection-error", "already initialized");
      return;
    }
    if ( !data || !data.id){
      socket.emit("connection-error", "id not defined");
      return;
    }
    var instanceId = data.id;
    var instance = instances[instanceId];
    if (!instance){
      socket.emit("connection-error", "Application doesn't exist");
      return;
    }

    // Remember the Controller
    var controllerId = instance._numControllers;
    instance.controllers[controllerId] = socket;
    instance._numControllers += 1;

    // Listen for Controller Inputs
    socket.on('controller-event', function(data){
      console.log('controller-event');
      console.log(instance.application);
      console.log(data);
      instance.application.emit("controller-event", data);
    });

    // Dereference Controller on Disconnect and Alert Application
    socket.on('disconnect', function(){
      instance.application.emit("controller-disconnect", { id : controllerId });
      delete instance.controllers[controllerId];
    });

    // Prevent Future Initialization
    isSocketTypeSet = true;

    // Successful Feedback to Client
    socket.emit("connection-success", true);
  });

});

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

app.listen(port || 8000, ip);
