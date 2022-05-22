$(document).ready(function() {
	// const onCloseSetting = () => {
 //    	$("#close_btn").click(function() {
 //    		$("#outbox1").slideUp("slow")
 //    	})
	// };

	// const onCloseHowTo = () => {
 //    	$("#close_btn").click(function() {
 //    		$("#outbox1").slideUp("slow")
 //    	})
	// };

	$("#view_page1").click(function() {
		$("#option_page").css("display", "block");
		$("#howtoplay_page, #credit_page").css("display", "none");
	});

	$("#view_page2").click(function() {
		$("#howtoplay_page").css("display", "block");
		$("option_page, #credit_page").css("display", "none");
	});

	$("#view_page3").click(function() {
		$("#credit_page").css("display", "block");
		$("#option_page, #howtoplay_page").css("display", "none");
	});
})