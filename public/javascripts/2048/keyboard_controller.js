$(document).ready(function(){
	var isConfigured;
	$(".controller-setup").click(function(event){
		if (isConfigured){
			return;
		}
		var arrowPad = documnet.getElementById("arrow-pad");
		arrowPad.addEventListener('touchstart', handleTouchStart, false);
        arrowPad.addEventListener('touchmove', handleTouchMove, false);
		var gameId = $(".game-id").val();
		$(".game-id").attr("disabled", true);
		rc.initController(gameId, function(res){
			if (!res.success){
				return;
			}
		});
	});

	function handleTouchStart(evt) {
        xDown = evt.touches[0].pageX;
        yDown = evt.touches[0].pageY;
    };

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].pageX;
        var yUp = evt.touches[0].pageY;

        var xDiff = xUp - xDown;
        var yDiff = -1* (yUp - yDown);

        rc.send("swipe", { dx : xDiff, dy : yDiff });

        /* reset values */
        xDown = null;
        yDown = null;
    };
});
