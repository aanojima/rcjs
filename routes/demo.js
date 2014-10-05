exports.all = function(req,res){
	res.render('demo');

}

exports.loadApp = function(req,res){
	res.render(req.params.app + "/app");
}

exports.loadController = function(req,res){
	res.render(req.params.app + "/controller")
}