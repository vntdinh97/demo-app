var viewportHeight= $(window).height();
$(document).ready(function() {
    $("#bodyListChat").slimScroll({
        height: (viewportHeight - 95) +'px',
    });
	
	//panelChatContent
	$("#panelChatContent").height( viewportHeight - 48 )
});


$("#menuLisetChat").click(function () {
	$("#listChat").removeClass( "d-none d-xl-block" );
	//d-xl-none
	$("#chatContent").css("display", "none");
});

$("#closeListChat").click(function () {
	$("#listChat").addClass( "d-none d-xl-block" );
	
	$("#chatContent").css("display", "");
});

