$(document).ready(function () {
	$("#start_btn").click(function () {
		$("#lv_page").addClass("next_page");
		$("#lv_page").css("display", "block");
		$("#main_page").css("display", "none");
	});

	$("#setting_btn").click(function () {
		$("#option_page").addClass("popup");
		$("#option_page").css("display", "block");
	});

	var music1 = globalAudio.normalStage[0];
	var music2 = globalAudio.normalStage[1];
	var music3 = globalAudio.normalStage[2];
	var music4 = globalAudio.normalStage[3];
	$("#music1").click(function() {
		music1.play();
		music2.pause();
		music3.pause();
		music4.pause();
	});
	$("#music2").click(function() {
		music2.play();
		music1.pause();
		music3.pause();
		music4.pause();
	});
	$("#music3").click(function() {
		music3.play();
		music1.pause();
		music2.pause();
		music4.pause();
	});
	$("#music4").click(function() {
		music4.play();
		music1.pause();
		music2.pause();
		music3.pause();
	});

	var ex_music = globalAudio.bossBattleAudio;
	$("#music_on").click(function() {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.currentTime = 30;
		ex_music.play();
	});
	$("#music_off").click(function() {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.pause();
	});

	var ex_effect = globalAudio.clickAudio;
	$("#effect_on").click(function() {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.pause();
		ex_effect.currentTime = 1;
		ex_effect.play();
	});
	$("#effect_off").click(function() {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.pause();
		ex_effect.pause();
	});


	$("#htp_btn").click(function () {
		$("#howtoplay_page").addClass("popup");
		$("#howtoplay_page").css("display", "block");
	});

	$("#credit_btn").click(function () {
		$("#credit_page").addClass("popup");
		$("#credit_page").css("display", "block");
	});

	$("#close_btn1").click(function () {
		$("#option_page").slideUp("slow");
	});
	$("#close_btn2").click(function () {
		$("#howtoplay_page").slideUp("slow");
	});
	$("#close_btn3").click(function () {
		$("#credit_page").slideUp("slow");
	});
});
