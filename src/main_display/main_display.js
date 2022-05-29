$(document).ready(function() {
	$("#start_btn").click(function() {
		$("#lv_page").addClass("next_page");
   		$("#lv_page").css("display", "block");
   		$("#main_page").css("display", "none");
	})

	$("#setting_btn").click(function() {
		$("#option_page").addClass("popup");
   		$("#option_page").css("display", "block");
   	});

	$("#htp_btn").click(function() {
		$("#howtoplay_page").addClass("popup");
   		$("#howtoplay_page").css("display", "block");
   	});

   	$("#credit_btn").click(function() {
		$("#credit_page").addClass("popup");
   		$("#credit_page").css("display", "block");
   	});


   	$("#close_btn1").click(function() {
   		$("#option_page").slideUp("slow");
   	});
   	$("#close_btn2").click(function() {
   		$("#howtoplay_page").slideUp("slow");
   	});
   	$("#close_btn3").click(function() {
   		$("#credit_page").slideUp("slow");
   	});

}

