$(document).ready(function(){
	$("li")
	.mouseover(function(){
		var selectID = '#' + $(this).attr('id')
		console.log($(selectID).css('border-bottom','solid 2px #fff'));
	})
	.mouseleave(function(){
		var selectID = '#' + $(this).attr('id')
		console.log($(selectID).css('border-bottom','solid 0px #fff'));
	});
});