//https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos ) {
	  // alert('pre :' +prevScrollpos+ '- - curr: //'+currentScrollPos);
    document.getElementById("navbar").style.top = "0";
  } else {
	  // alert('pre :' +prevScrollpos+ '- - curr: //'+currentScrollPos);
	  if(prevScrollpos > 0)
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

// new post box	
$("#new-postbox").click(function () {
    $("#postoverlay").fadeIn(500);
	$("#btnNewPost").css("display", "block");
  });
  $("#postoverlay").not("#new-postbox").click(function() {
    $("#postoverlay").fadeOut(500);
	  $("#btnNewPost").css("display", "none");
$("#tagCungvoiai").removeClass("show");
  });
  // $("[type = submit]").click(function () {
  //   var post = $("textarea").val();
  //   $("<p class='post'>" + post + "</p>").appendTo("section");
  // });



// dung calendar --> cham cong

        $(document).ready(function () {
            // Event Demo init
            $("#event-cal-container").simpleCalendar({
                events: ['2019-08-04', '2019-08-08', '2019-08-12', '2019-08-15'],
                eventsInfo: ['Đi làm muộn sau 8h', 'Không quẹt vân tay','Về trước 5h', 'Đi muộn sau 8h30'],
                selectCallback: function(date){
                    console.log('date selected '+date);
                }
            });

            // tippy('.day.event', {
            //     theme: 'translucent',
            // });
        });
    