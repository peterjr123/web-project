const showMainMenu = () => {
	$(".game-over").hide();
	$(".final-ending").hide();
	globalAudio.gameoverAudio.pause();
	showMainDisplay();
};

showGameOver = () => {
	$(".game-over").show();
	globalAudio.gameoverAudio.currentTime = 0;
	globalAudio.gameoverAudio.play();

	typingGameOver();
};

const typingGameOver = () => {
	$(".game-over__msg--dr-oak-msg").text("");
	new TypeIt(".game-over__msg--dr-oak-msg", {
		speed: 70,
		waitUntilVisible: true,
	})
		.type("지구로 돌아가자...")
		.go();
};

const initGameOver = () => {
	$(".game-over__button--show-main").on("click", showMainMenu);
};

$(document).ready(initGameOver);
