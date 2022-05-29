// ---------------------- 화면 전환 -------------------------
const showRewardPage = () => {
	$("#game-page__reward-scene").css({ display: "flex" });
};
const hideRewardPage = () => {
	$("#game-page__reward-scene").css({ display: "none" });
};
const showGameCanvas = () => {
	$("#game-page canvas").css({ display: "block" });
};
const hideGameCanvas = () => {
	$("#game-page canvas").css({ display: "none" });
};
const showGamePage = () => {
	$("#game-page").css({ display: "block" });
};
const hideGamePage = () => {
	$("#game-page").css({ display: "none" });
};

showMainDisplay = () => {
	const height = $(window).height();
	$("#main_display").css({ display: "block", height: height });
};
$(document).ready(() => {
	showMainDisplay();
});

onSelectStage = (level) => {
	$("#lv_page").css("display", "none");
	$("#main_page").css("display", "block");
	$("#main_display").css("display", "none");
	// 맵 화면 호출
	showMap();
	if (level == 1) {
		showPocketmon(0);
	} else if (level == 2) {
		makeMEPath();
	} else {
		makeEVPath();
	}
};

const onSelectReward = () => {
	hideRewardPage();
	showGameCanvas();
	startStage(gameStatus.stageLevel + 1);
};
const onStageClear = () => {
	hideGameCanvas();
	showRewardPage();
	globalAudio.stageClearAudio.play();

	clearInterval(drawInterval);
};
onStartGame = (gameLevel) => {
	showGamePage();
	setGameSceneSize();
	startGame(gameLevel);
};
const onGameOver = () => {
	if (gameStatus.stageLevel != 3) {
		globalAudio.normalStage[0].pause();
	} else {
		globalAudio.bossBattleAudio.pause();
	}
	clearInterval(drawInterval);
	hideGamePage();
	showGameOver();
	// gameover page 호출
};
const onKillBossBlock = () => {
	// 실제론 stageclear가 아니라 다 지우고, 엔딩화면 호출
	clearInterval(drawInterval);
	hideGamePage();

	// boss bgm pause
	globalAudio.bossBattleAudio.pause();

	// 엔딩 화면 호출
	if (gameStatus.gameLevel == 1) showEnding(0);
	else if (gameStatus.gameLevel == 2) showEnding(1);
	else showEnding(2);
};
const onKillNormalBlock = () => {
	setCombo(userStatus.combo + 1);
	setScore(normalBrick.score * userStatus.combo + userStatus.score);

	brickContainer.brickCount -= 1;
	if (brickContainer.brickCount <= 5) {
		onStageClear();
	}

	globalAudio.brickBreakAudio.play();
};

//------------------------------- global variables --------------------------
let drawInterval; // setInterval을 저장하는 변수
let canvas;
let context;
let gameStatus = {
	gameLevel: 1,
	stageLevel: 1,
};
let ballStatus = {
	posX: 0,
	posY: 0,
	radius: 10,
	ballColor: "#0095dd",
	dx: 4,
	dy: 4,
	img: {},
};
let paddleStatus = {
	posX: 50,
	height: 10,
	width: 75,
	color: "#0095DD",
};
let userStatus = {
	maxHP: 3,
	currentHP: 3,
	ballDamage: 1,
	score: 0,
	combo: 0,
};
let bossAttack = {
	maxCoolDown: 10,
	coolDown: 10,
	width: 0,
	height: 0,
	initialPoxY: 0,
	dy: 10,
	img: {},
	attacks: [],
};
const brickContainer = {
	bricksOnRow: 7,
	bricksOnColumn: 5,
	spaceBetweenBricks: 10,
	offsetTop: 30,
	offsetSide: 70,
	brickCount: 10,
};
let normalBrick = {
	width: 75,
	height: 20,
	score: 10,
	maxHP: 1,
	color: "#0095DD",
};
let bossBrick = {
	width: 245,
	height: 80,
	maxHP: 10,
	color: "#0095DD",
};
let bricks = [];
const ballImgSrc = [
	"./img/in_game/몬스터볼-removebg-preview.png",
	"./img/in_game/레벨볼-removebg-preview.png",
	"./img/in_game/마스터볼-removebg-preview (2).png",
];
const planetImgSrc = [
	"./img/in_game/금성-removebg-preview.png",
	"./img/in_game/지구-removebg-preview.png",
	"./img/in_game/화성-removebg-preview.png",
];
const bossImgSrc = [
	"./img/in_game/롱스톤-removebg-preview.png",
	"./img/in_game/피카츄-removebg-preview.png",
	"./img/in_game/뮤2-removebg-preview.png",
];
const attackImgSrc = ["./img/in_game/rock.png", "./img/in_game/flash.png", "./img/in_game/meteor.png"];
const colorTheme = ["#AFABAB", "#FFD966", "#FFC0CB"];

// -------------------- canvas + resizing---------------------------
$("body").ready(() => {
	canvas = document.getElementById("game-page__canvas");
	context = canvas.getContext("2d");
});
const setGameSceneSize = () => {
	const height = $(window).height();
	console.log(height);
	$("#game-page__content-wrapper").css({ height: height });
	$("#game-page__reward-scene").css({ height: height });
};
const setCanvasSize = () => {
	canvas.width = $("#game-page__game-scene").width();
	canvas.height = $("#game-page__game-scene").height();
};

// ----------------- user ------------------------
const setUserHP = (hp) => {
	userStatus.currentHP = hp;
	if (userStatus.currentHP <= 0) {
		console.log("gameover!!");
		onGameOver();
		return;
	}
	const heart_container = $("#game-page__heart-container-wrapper");
	const empty_heart = '<img src="./img/in_game/empty-heart.png" width="60px" />';
	const heart = '<img src="./img/in_game/heart.png" width="60px" />';

	heart_container.empty();
	for (let i = 0; i != userStatus.maxHP - userStatus.currentHP; i++) {
		heart_container.append(empty_heart);
	}
	for (let i = 0; i != userStatus.currentHP; i++) {
		heart_container.append(heart);
	}
};
const setComboCountOnHTML = (combo) => {
	const str = "Combo: " + combo;
	$("#game-page__user-combo-count").text(str);
};
const setScoreOnHTML = (combo) => {
	const str = "스코어: " + combo;
	$("#game-page__user-score").text(str);
};
const setCombo = (combo) => {
	userStatus.combo = combo;
	setComboCountOnHTML(combo);
};
const setScore = (score) => {
	userStatus.score = score;
	setScoreOnHTML(score);
};

// ----------------- ball -------------------------------
const ballDrawing = () => {
	context.drawImage(ballStatus.img, ballStatus.posX - 10, ballStatus.posY - 10, 20, 20);
};

// -------------------- paddle ----------------
const paddleDrawing = () => {
	context.beginPath();
	//   만약 paddle이 canvas에서 몇 px 높이 존재한다면, 충돌판정도 수정해야 함.
	context.rect(paddleStatus.posX, canvas.height - paddleStatus.height, paddleStatus.width, paddleStatus.height);
	context.fillStyle = paddleStatus.color;
	context.fill();
	context.closePath();
};
const onPaddleMove = (event) => {
	const relativeX = event.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleStatus.posX = relativeX - paddleStatus.width / 2;
	}
};
$(document).mousemove((event) => {
	onPaddleMove(event);
});

// ------------------- bricks -------------------
const createBrick = (posX, posY, type, hp) => {
	let width, height;
	if (type === "boss") {
		width = bossBrick.width;
		height = bossBrick.height;
	} else {
		width = normalBrick.width;
		height = normalBrick.height;
	}
	return {
		posX: posX,
		posY: posY,
		type: type,
		hp: hp,
		active: true,
		width: width,
		height: height,
	};
};
const setBricks = (stageLevel) => {
	// 1. posx, posy, type, hp, active?
	let blockCount = 0; // 저장된 블럭의 개수
	let posX = 0 + brickContainer.offsetSide;
	let posY = 0 + brickContainer.offsetSide;
	if (stageLevel != 3) {
		while (blockCount < brickContainer.bricksOnColumn * brickContainer.bricksOnRow) {
			bricks[blockCount] = createBrick(posX, posY, "normal", normalBrick.maxHP);
			blockCount++;

			// 다음 블럭의 pos 설정
			if (blockCount % brickContainer.bricksOnRow == 0) {
				// 한 row의 블럭을 채워 넣었다면...
				posX = 0 + brickContainer.offsetSide;
				posY += normalBrick.height + brickContainer.spaceBetweenBricks;
			} else {
				posX += normalBrick.width + brickContainer.spaceBetweenBricks;
			}
		}
		brickContainer.brickCount = blockCount;
	} else {
		while (blockCount < brickContainer.bricksOnColumn * brickContainer.bricksOnRow) {
			bricks[blockCount] = createBrick(posX, posY, "normal", normalBrick.maxHP);
			if (
				blockCount / brickContainer.bricksOnRow < 3 && // 첫 세줄에 속하는 블럭이고,
				blockCount % brickContainer.bricksOnRow >= (brickContainer.bricksOnRow - 3) / 2 && // 가운데 3개의
				blockCount % brickContainer.bricksOnRow < (brickContainer.bricksOnRow - 3) / 2 + 3 // column에 속하는가?
			) {
				bricks[blockCount].active = false;
			}
			blockCount++;

			// 다음 블럭의 pos 설정
			if (blockCount % brickContainer.bricksOnRow == 0) {
				// 한 row의 블럭을 채워 넣었다면...
				posX = 0 + brickContainer.offsetSide;
				posY += normalBrick.height + brickContainer.spaceBetweenBricks;
			} else {
				posX += normalBrick.width + brickContainer.spaceBetweenBricks;
			}
		}
		posX = bricks[(brickContainer.bricksOnRow - 3) / 2].posX;
		posY = bricks[(brickContainer.bricksOnRow - 3) / 2].posY;
		// 보스 블럭 추가
		bricks[blockCount] = createBrick(posX, posY, "boss", bossBrick.maxHP);
	}
};
const bossImgDrawing = (brick) => {
	const imgSize = 60;
	const imgPosX = brick.posX + (brick.width - imgSize) / 2;
	const imgPosY = brick.posY + 5;
	const img = new Image();
	img.src = bossImgSrc[gameStatus.gameLevel - 1];
	context.drawImage(img, imgPosX, imgPosY, imgSize, imgSize);
};
const bossHpDrawing = (brick) => {
	const hpBarPosX = brick.posX + 10;
	const hpBarPoxY = brick.posY + brick.height - 10;
	const hpBarWidth = (brick.width - 20) * (brick.hp / bossBrick.maxHP);
	const hpBarHeigth = 5;
	context.beginPath();
	context.rect(hpBarPosX, hpBarPoxY, hpBarWidth, hpBarHeigth);
	context.fillStyle = "#FF0000";
	context.fill();
	context.closePath();
};
const bricksDrawing = () => {
	for (let i = 0; i < bricks.length; i++) {
		if (!bricks[i].active) continue;
		context.beginPath();
		context.rect(bricks[i].posX, bricks[i].posY, bricks[i].width, bricks[i].height);
		context.fillStyle = normalBrick.color;
		context.fill();
		context.closePath();

		if (bricks[i].type === "boss") {
			bossImgDrawing(bricks[i]);
			bossHpDrawing(bricks[i]);
		}
	}
};
const setBrickSize = () => {
	normalBrick.width =
		($("#game-page__game-scene").width() -
			(2 * brickContainer.offsetSide + brickContainer.spaceBetweenBricks * (brickContainer.bricksOnRow - 1))) /
		brickContainer.bricksOnRow;

	bossBrick.width = normalBrick.width * 3 + brickContainer.spaceBetweenBricks * 2;
	bossBrick.height = normalBrick.height * 3 + brickContainer.spaceBetweenBricks * 2;
};

// -------------------- boss attack ------------------
const makeBossAttack = (posX, active) => {
	return {
		posX: posX,
		posY: bossAttack.initialPoxY,
		active: active,
	};
};
const setBossAttacks = () => {
	for (let i = 0; i < brickContainer.bricksOnRow; i++) {
		bossAttack.attacks[i] = makeBossAttack(bricks[i].posX, false);
	}
	const img = new Image();
	img.src = attackImgSrc[gameStatus.gameLevel - 1];
	bossAttack.img = img;

	bossAttack.width = normalBrick.width;
	bossAttack.height = 100;

	if (gameStatus.gameLevel == 1) {
		bossAttack.maxCoolDown = 100;
		bossAttack.dy = 5;
	} else if (gameStatus.gameLevel == 2) {
		bossAttack.maxCoolDown = 50;
		bossAttack.dy = 7;
	} else {
		bossAttack.maxCoolDown = 10;
		bossAttack.dy = 10;
	}
};
const bossAttackDrawing = () => {
	if (bossAttack.coolDown > 0) bossAttack.coolDown -= 1;
	else {
		bossAttack.coolDown = bossAttack.maxCoolDown;
		const randNum = Math.floor(Math.random() * brickContainer.bricksOnRow);
		bossAttack.attacks[randNum].active = true;
	}
	for (let i = 0; i < bossAttack.attacks.length; i++) {
		if (!bossAttack.attacks[i].active) continue;

		const att = bossAttack.attacks[i];
		context.drawImage(bossAttack.img, att.posX, att.posY, bossAttack.width, bossAttack.height);

		att.posY += bossAttack.dy;
	}
};

// --------------------- upgrade ---------------------
const onSelectUpgrade = (upgradeType) => {
	if (upgradeType === "ball") {
		onUpgradeDamage();
	} else if (upgradeType === "hp") {
		onUpgradeHealth();
	} else if (upgradeType === "bar") {
		onUpgradeBarLength();
	}
	onSelectReward();
};

const onUpgradeDamage = () => {
	userStatus.ballDamage += 1;
};
const onUpgradeBarLength = () => {
	paddleStatus.width *= 2;
};
const onUpgradeHealth = () => {
	userStatus.maxHP += 1;
};

// --------------------- collision -------------------
const onHitGround = () => {
	setUserHP(userStatus.currentHP - 1);
	setCombo(0);
	console.log("hit ground!!");

	globalAudio.onDamageTaken.play();
};
const onHitPaddle = () => {
	console.log("Hit paddle!!");

	globalAudio.ballHitAudio.play();
};
const onHitNormalBlock = (brick) => {
	brick.hp -= userStatus.ballDamage;
	if (brick.hp <= 0) {
		brick.active = false;
		onKillNormalBlock();
	}
	console.log("Hit normal block!!");
};
const onHitBossBlock = (brick) => {
	brick.hp -= userStatus.ballDamage;
	if (brick.hp <= 0) {
		brick.active = false;
		onKillBossBlock();
	}
	console.log("Hit boss block!!");
};
const onHitBossAttack = () => {
	globalAudio.onDamageTaken.play();
	setUserHP(userStatus.currentHP - 1);
	setCombo(0);
};

const wallCollisionDetect = () => {
	// 위, 아래에 부딛힌 경우에는 1 반환
	// 좌, 우에 부딛힌 경우에는 -1 반환
	// 부딛히지 않은 경우에는 0반환
	if (ballStatus.posY + ballStatus.dy > canvas.height - ballStatus.radius || ballStatus.posY + ballStatus.dy < 0) {
		return 1;
	} else if (ballStatus.posX + ballStatus.dx > canvas.width - ballStatus.radius || ballStatus.posX + ballStatus.dx < 0) {
		return -1;
	} else {
		return 0;
	}
};
const paddleCollisionDetect = () => {
	// 바의 x ~ x+width안에 공이 존재하고,
	// 바의 중심-height/2 보다 공의 y+rad/2가 더 크면 충돌한 것.
	if (paddleStatus.posX <= ballStatus.posX && paddleStatus.posX + paddleStatus.width >= ballStatus.posX) {
		if (canvas.height - paddleStatus.height < ballStatus.posY + ballStatus.radius / 2) {
			console.log("hit paddle!!!");
			return true;
		}
	}
	return false;
};
const distance = (pos1, pos2) => {
	if (pos1 > pos2) return pos1 - pos2;
	else return pos2 - pos1;
};
// 위아래 충돌: 1, 좌우 충돌: -1
const brickCollisionDetect = (brick) => {
	const brickCenterX = brick.posX + brick.width / 2;
	const brickCenterY = brick.posY + brick.height / 2;
	// 충돌 했는가?
	if (
		ballStatus.posX >= brick.posX - ballStatus.radius / 2 &&
		ballStatus.posX <= brick.posX + brick.width + ballStatus.radius / 2 &&
		ballStatus.posY >= brick.posY - ballStatus.radius / 2 &&
		ballStatus.posY <= brick.posY + brick.height + ballStatus.radius / 2
	) {
		// 위 아래 충돌이 일어나면, 원의 중심은 x축 기준으로는 블록 안에 들어있지만, y축 기준으로는 블록 바깥에 존재한다.
		// 반대로 좌우 충돌이 일어나면 x축 기준으로, 원의 중심이 바깥에 존재한다.
		if (distance(ballStatus.posY, brickCenterY) > brick.height / 2) {
			console.log("detect - vertical hit!");
			return 1;
		}
		if (distance(ballStatus.posX, brickCenterX) > brick.width / 2) {
			console.log("detect - horizontal hit!");
			return -1;
		}
		console.log("ball: ", ballStatus.posX, ballStatus.posY);
		console.log("brick: ", brick.posX, brick.posY);
	}
	return 0;
};

const brickCollisionHandler = () => {
	for (let i = 0; i < bricks.length; i++) {
		if (!bricks[i].active) continue;

		const result = brickCollisionDetect(bricks[i]);
		if (result == 0) continue;

		if (bricks[i].type === "normal") {
			onHitNormalBlock(bricks[i]);
		} else if (bricks[i].type === "boss") {
			onHitBossBlock(bricks[i]);
		}

		if (result == 1) {
			ballStatus.dy = -ballStatus.dy;
		} else if (result == -1) {
			ballStatus.dx = -ballStatus.dx;
		}
		return; // 충돌이 한번에 2번 일어나지 않는다 가정.
	}
};
const attackCollisionDetect = (attack) => {
	if (attack.posX > paddleStatus.posX + paddleStatus.width || attack.posX + bossAttack.width < paddleStatus.posX) {
		return false;
	}
	return true;
};
const attackCollisionHandler = () => {
	for (let i = 0; i < bossAttack.attacks.length; i++) {
		const att = bossAttack.attacks[i];
		if (!att.active) continue;
		if (att.posY + bossAttack.height >= canvas.height - paddleStatus.height) {
			if (attackCollisionDetect(att)) {
				onHitBossAttack();
				att.active = false;
				att.posY = bossAttack.initialPoxY;
			}
		}
		if (att.posY > canvas.height) {
			att.active = false;
			att.posY = bossAttack.initialPoxY;
		}
	}
};
const collisionHandler = () => {
	if (paddleCollisionDetect()) {
		onHitPaddle();
		ballStatus.dy = -ballStatus.dy;
	}

	if (wallCollisionDetect() == 1) {
		if (ballStatus.posY + ballStatus.dy > canvas.height - ballStatus.radius) {
			onHitGround();
		} else {
			globalAudio.ballHitAudio.play();
		}
		ballStatus.dy = -ballStatus.dy;
	} else if (wallCollisionDetect() == -1) {
		ballStatus.dx = -ballStatus.dx;
		globalAudio.ballHitAudio.play();
	}

	// handler에서 ballStatus처리
	brickCollisionHandler();

	if (gameStatus.stageLevel == 3) attackCollisionHandler();
};

// ----------------------- game initializing ----------------
const setStageInitialStatus = () => {
	// 매 stage을 시작하기 전에 게임을 초기화.
	// 1. ball의 위치, 방향 초기화, img 초기화
	ballStatus.posX = canvas.width / 2;
	ballStatus.posY = canvas.height - 100;
	ballStatus.dx = ballStatus.dx;
	ballStatus.dy = -ballStatus.dy;
	ballStatus.img = new Image();
	ballStatus.img.src = ballImgSrc[userStatus.ballDamage - 1];
	// 2. 현재 목숨을 full로
	setUserHP(userStatus.maxHP);
	// 3. combo 수치 0으로 변경
	setCombo(0);
	// 4. bricks 배열 비우기
	bricks = [];
};
const setGameInitialStatus = () => {
	// 매 게임(world)를 시작하기 전에 게임을 초기화
	// 1. user status
	userStatus.maxHP = 3;
	setScore(0);
	userStatus.ballDamage = 1;
	// 2. bar status
	paddleStatus.width = 75;
	// 3. 다른 status?

	// 4. 탐색 행성 사진
	$("#game-page__current-planet img:first").attr("src", planetImgSrc[gameStatus.gameLevel - 1]);

	// 5. 게임 테마 색상 설정
	setColorTheme();
};
const setColorTheme = () => {
	const theme = colorTheme[gameStatus.gameLevel - 1];
	// 1. 일반 벽돌 + 보스 벽돌 색상
	normalBrick.color = theme;
	bossBrick.color = theme;

	// 2. 보상 테두리 색상
	const str = "3px solid " + theme;
	$(".reward-img-wrapper").css({ border: str });

	// 3. 게임 신 테두리 색상
	$("#game-page__game-scene").css({ border: str });
};
const everyFrameDrawing = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ballDrawing();
	paddleDrawing();
	bricksDrawing();
	if (gameStatus.stageLevel === 3) bossAttackDrawing();

	collisionHandler();

	ballStatus.posX += ballStatus.dx;
	ballStatus.posY += ballStatus.dy;
};
const startStage = (stageLevel) => {
	console.log("stage start!!");
	gameStatus.stageLevel = stageLevel;

	setCanvasSize();
	setBrickSize();
	setStageInitialStatus();
	setBricks(stageLevel);
	if (stageLevel == 3) {
		setBossAttacks();
		globalAudio.normalStage[0].pause();
		globalAudio.bossBattleAudio.currentTime = 0;
		globalAudio.bossBattleAudio.play();
	} else {
		globalAudio.normalStage[0].currentTime = 0;
		globalAudio.normalStage[0].play();
	}
	drawInterval = setInterval(everyFrameDrawing, 10);
};
const startGame = (gameLevel) => {
	console.log("game start!!");
	gameStatus.gameLevel = gameLevel;

	setGameInitialStatus();
	startStage(1);
};
