var server = require('../server.js');
var io = require('socket.io')(server.app);

module.exports.create = function(req,res){
	var gameId = req.body.gameId;
	io.on()
	if (server.sockets.hasOwnProperty(gameId)){
		server.sockets[gameId] += 1;
	} else {
		server.sockets[gameId] = 0;
	}
	console.log(server.sockets);
	res.end();
}