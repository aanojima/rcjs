(function(){
	rc.initController("abcdefghij", function(res){
		if (!res.success){
			console.log("fail");
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

	var up = document.getElementById("up");
	var down = document.getElementById("down");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
})();
