const soundOnOff = (muted) => {
	globalAudio.bossBattleAudio.muted = muted;
	globalAudio.finalLevelClear.muted = muted;
	globalAudio.middleLevelClear.muted = muted;

	globalAudio.gameoverAudio.muted = muted;
	globalAudio.startStory.muted = muted;
	globalAudio.newMap.muted = muted;

	globalAudio.normalStage[0].muted = muted;
	globalAudio.normalStage[1].muted = muted;
	globalAudio.normalStage[2].muted = muted;
	globalAudio.normalStage[3].muted = muted;
};

const effectOnOff = (muted) => {
	globalAudio.clickAudio.muted = muted;
	globalAudio.onDamageTaken.muted = muted;
	globalAudio.stageClearAudio.muted = muted;
	globalAudio.ballHitAudio.muted = muted;
	globalAudio.brickBreakAudio.muted = muted;
};

$(document).ready(function () {
	$("#start_btn").click(function () {
		$("#lv_page").addClass("next_page");
		$("#lv_page").css("display", "block");
		$("#main_page").css("display", "none");
	});

	$(".purple-button").click(function () {
		$("#option_page").addClass("popup");
		$("#option_page").css("display", "block");
	});

	var music1 = globalAudio.normalStage[0];
	var music2 = globalAudio.normalStage[1];
	var music3 = globalAudio.normalStage[2];
	var music4 = globalAudio.normalStage[3];
	$("#music1").click(function () {
		ex_music.pause();
		music1.play();
		music2.pause();
		music3.pause();
		music4.pause();
		game_music = 0;
	});
	$("#music2").click(function () {
		ex_music.pause();
		music2.play();
		music1.pause();
		music3.pause();
		music4.pause();
		game_music = 1;
	});
	$("#music3").click(function () {
		ex_music.pause();
		music3.play();
		music1.pause();
		music2.pause();
		music4.pause();
		game_music = 2;
	});
	$("#music4").click(function () {
		ex_music.pause();
		music4.play();
		music1.pause();
		music2.pause();
		music3.pause();
		game_music = 3;
	});

	var ex_music = globalAudio.bossBattleAudio;
	$("#music_on").click(function () {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.currentTime = 30;
		ex_music.play();

		soundOnOff(false);
	});
	$("#music_off").click(function () {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.pause();

		soundOnOff(true);
	});

	var ex_effect = globalAudio.clickAudio;
	$("#effect_on").click(function () {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.pause();

		effectOnOff(false);
		ex_effect.currentTime = 1;
		ex_effect.play();
	});
	$("#effect_off").click(function () {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.pause();
		ex_effect.pause();

		effectOnOff(true);
	});

	$(".red-button").click(function () {
		$("#howtoplay_page").addClass("popup");
		$("#howtoplay_page").css("display", "block");
	});

	$(".claret-button").click(function () {
		$("#credit_page").addClass("popup");
		$("#credit_page").css("display", "block");
	});

	$("#close_btn1").click(function () {
		music1.pause();
		music2.pause();
		music3.pause();
		music4.pause();
		ex_music.pause();
		$("#option_page").slideUp("slow");
	});
	$("#close_btn2").click(function () {
		$("#howtoplay_page").slideUp("slow");
	});
	$("#close_btn3").click(function () {
		$("#credit_page").slideUp("slow");
	});
});
