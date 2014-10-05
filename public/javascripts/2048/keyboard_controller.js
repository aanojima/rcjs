$(document).ready(function(){
	var isConfigured;
	$(".controller-setup").click(function(event){
		if (isConfigured){
			return;
		}
		var gameId = $(".game-id").val();
		$(".game-id").attr("disabled", true);
		rc.initController(gameId, function(res){
			if (!res.success){
				return;
			}
			up.addEventListener("click", function(event){
				rc.send("up", {});
			});

			down.addEventListener("click", function(event){
				rc.send("down", {});
			});

			left.addEventListener("click", function(event){
				rc.send("left", {});
			});

			right.addEventListener("click", function(event){
				rc.send("right", {});
			});
		});
	});
		

	var up = document.getElementById("up");
	var down = document.getElementById("down");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
});
