const initSound = () => {
	const bossBattleAudio = new Audio();
	const clickAudio = new Audio();
	const finalLevelClear = new Audio();
	const middleLevelClear = new Audio();
	const normalStage1 = new Audio();
	const normalStage2 = new Audio();
	const normalStage3 = new Audio();
	const normalStage4 = new Audio();
	const onDamageTaken = new Audio();
	const stageClearAudio = new Audio();
	const ballHitAudio = new Audio();
	const brickBreakAudio = new Audio();
	const gameoverAudio = new Audio();
	const moveMap = new Audio();

	bossBattleAudio.src = "./audio/bossBattleAudio.mp3";
	clickAudio.src = "./audio/clickAudio.mp3";
	finalLevelClear.src = "./audio/finalLevelClear.mp3";
	middleLevelClear.src = "./audio/middleLevelClear.mp3";
	normalStage1.src = "./audio/normalStage_1.mp3";
	normalStage2.src = "./audio/normalStage_2.mp3";
	normalStage3.src = "./audio/normalStage_3.mp3";
	normalStage4.src = "./audio/normalStage_4.mp3";
	onDamageTaken.src = "./audio/onDamageTaken.mp3";
	stageClearAudio.src = "./audio/stageClearAudio.mp3";
	ballHitAudio.src = "./audio/ballHitAudio.mp3";
	brickBreakAudio.src = "./audio/brickBreakAudio.mp3";
	gameoverAudio.src = "./audio/gameoverAudio.mp3";
	moveMap.src = "./audio/beep.mp3"

	globalAudio.bossBattleAudio = bossBattleAudio;
	globalAudio.clickAudio = clickAudio;
	globalAudio.finalLevelClear = finalLevelClear;
	globalAudio.middleLevelClear = middleLevelClear;
	globalAudio.normalStage[0] = normalStage1;
	globalAudio.normalStage[1] = normalStage2;
	globalAudio.normalStage[2] = normalStage3;
	globalAudio.normalStage[3] = normalStage4;
	globalAudio.onDamageTaken = onDamageTaken;
	globalAudio.stageClearAudio = stageClearAudio;
	globalAudio.ballHitAudio = ballHitAudio;
	globalAudio.brickBreakAudio = brickBreakAudio;
	globalAudio.gameoverAudio = gameoverAudio;
	globalAudio.moveMap = moveMap;
};
initSound();
