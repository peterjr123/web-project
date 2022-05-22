let currentLevel = 1;
const showEnding = (endingNumber) => {
	// 난이도 1 => endingNumbe 1, 마지막 난이도 => endingNumber 3
	if (endingNumber == 0) {
		$(".mid-ending").show();
		$(".mid-ending__img--pocketmon-img").attr("src", "./img/ending/pikachu.png");
		$(".mid-ending__img--planet-img").attr("src", "./img/ending/earth.png");
		showMidAnimation($(".mid-ending__pocketmon-seal"));
		currentLevel = 1;
	} else if (endingNumber == 1) {
		$(".mid-ending").show();
		$(".mid-ending__img--pocketmon-img").attr("src", "./img/ending/dan.png");
		$(".mid-ending__img--planet-img").attr("src", "./img/ending/venus.png");
		showMidAnimation($(".mid-ending__pocketmon-seal"));
		currentLevel = 2;
	} else if (endingNumber == 2) {
		$(".final-ending").show();
		showFinalAnimation($(".final-ending__pocketmon-seal"));
		currentLevel = 3;
	} else {
		alert("잘못된 호출입니다.");
	}
};

const showSealAnimation = (seal) => {
	seal.css({ animation: "floating 5s", "animation-iteration-count": "infinite" }).hover(
		() => {
			//$(".final-ending__img--pocketmon-img").css({"transform": "scale(1.3)"});
			//$(".final-ending__img--halo-img").css({"transform": "scale(1.3)","opacity":"0.9"});
			seal.children("img:eq(0)").css({ transform: "scale(1.3)" });
			seal.children("img:eq(1)").css({ transform: "scale(1.3)", opacity: "0.9" });
		},
		() => {
			seal.children("img:eq(0)").css({ transform: "scale(1)" });
			seal.children("img:eq(1)").css({ transform: "scale(1)", opacity: "0.8" });
		}
	);
};

const showMidAnimation = (seal) => {
	animLeftDistance = $(window).width() * 0.6;
	centerLeftDistance = ($(window).width() - 300) / 3;

	seal.animate({ top: "100px", left: animLeftDistance }, 2000).animate({ top: "200px", left: centerLeftDistance }, 1000, () => {
		typingMidEnding();
		showSealAnimation(seal);
	});
};

const typingMidEnding = () => {
	new TypeIt(".mid-ending__user-msg", {
		speed: 70,
		waitUntilVisible: true,
	})
		.type("내가 원하는 스티커가 아니야")
		.go();
};

const onNextLevel = (currentLevel) => {
	// 다음 난이도 실행
};

const initMidEnding = () => {
	$(".mid-ending__button--show-next-level")
		.hover(
			() => {
				$(".mid-ending__button--show-next-level").css({ transform: "scale(1.2)" });
				$(".mid-ending__img--planet-img").css({ transform: "scale(1.2) translate(-50%, 0)" });
				$(".mid-ending__msg--planet_msg").css({ transform: "scale(1.2) translate(-50%, -50%)" });
				//$(this).children('img').css({"transform": "scale(1.3)"});
				//$(this).children('p').css({"transform": "scale(1.3)"});
			},
			() => {
				$(".mid-ending__button--show-next-level").css({ transform: "scale(1)" });
				$(".mid-ending__img--planet-img").css({ transform: "scale(1) translate(-50%, 0)" });
				$(".mid-ending__msg--planet_msg").css({ transform: "scale(1) translate(-50%, -50%)" });
			}
		)
		.on("click", onNextLevel(currentLevel));
};

$(document).ready(initMidEnding);
