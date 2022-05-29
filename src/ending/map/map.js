// planet 은 어떤 행성으로 가는지 나타냄

const showMap = () => {
	$(".map").show();
};

const hideMap = () => {
	$(".map").hide();
};

const pathAnimation = (path, index, planet) => {
	if (index >= 6) {
		showPocketmon(planet + 1);
		return;
	}
	path.children("div:eq(" + index + ")").show();
	setTimeout(pathAnimation, 300, path, index + 1, planet);
};

const makeMEPath = () => {
	hidePocketmon(0);
};

const makeEVPath = () => {
	hidePocketmon(1);
};

const hidePocketmon = (planet) => {
	if (planet == 0) {
		// mars
		$(".map__img--pikachu")
			.css({ top: "450px" })
			.delay(500)
			.animate({ top: "550px" }, "swing", () => {
				pathAnimation($(".map__path--mars-to-earth"), 0, 0);
			});
	} else if (planet == 1) {
		// earth
		$(".map__img--dan")
			.css({ top: "50px" })
			.delay(500)
			.animate({ top: "150px" }, "swing", () => {
				pathAnimation($(".map__path--earth-to-venus"), 0, 1);
			});
	}
};

const showPocketmon = (planet) => {
	if (planet == 0) {
		// mars
		$(".map__img--pikachu").css({ top: "550px" }).delay(100).animate({ top: "450px" }, "swing");

		setTimeout(() => {
			hideMap();
			// 다음 난이도 넘어가기(처음 난이도 시작)
			onStartGame(1);
		}, 2000);
	} else if (planet == 1) {
		// earth
		$(".map__img--dan").css({ top: "150px" }).delay(100).animate({ top: "50px" }, "swing");

		setTimeout(() => {
			hideMap();
			// 다음 난이도 넘어가기(두 번째 난이도 시작)
			onStartGame(2);
		}, 2000);
	} else if (planet == 2) {
		// venus
		$(".map__img--mu").css({ top: "500px" }).delay(100).animate({ top: "400px" }, "swing");

		setTimeout(() => {
			hideMap();
			// 다음 난이도 넘어가기(마지막 난이도 시작)
			onStartGame(3);
		}, 2000);
	}
};
