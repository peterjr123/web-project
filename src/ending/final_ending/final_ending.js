// onKillBossBlock에서 호출되어야 함
// 화면 지우는건 어디서??? 호출하기전? 호출 후?
showEnding = (endingNumber) => {
  // 난이도 1 => endingNumbe 1, 마지막 난이도 => endingNumber 3
  if (endingNumber == 0) {
    //globalAudio.middleLevelClear.currentTime = 0;
    //globalAudio.middleLevelClear.play();
    $(".mid-ending").show();
    $(".mid-ending__img--pocketmon-img").attr(
      "src",
      "../../img/ending/pikachu.png"
    );
    showMidAnimation($(".mid-ending__pocketmon-seal"));
    currentLevel = 1;
  } else if (endingNumber == 1) {
    //globalAudio.middleLevelClear.currentTime = 0;
    //globalAudio.middleLevelClear.play();
    $(".mid-ending").show();
    $(".mid-ending__img--pocketmon-img").attr(
      "src",
      "../../img/ending/dan.png"
    );
    showMidAnimation($(".mid-ending__pocketmon-seal"));
    currentLevel = 2;
  } else if (endingNumber == 2) {
    //globalAudio.finalLevelClear.currentTime = 0;
    //globalAudio.finalLevelClear.play();

    $(".final-ending").show();
    $(".final-ending__img--pocketmon-img").attr(
      "src",
      "../../img/ending/mu.png"
    );
    showFinalAnimation($(".final-ending__pocketmon-seal"));
    currentLevel = 3;
  } else {
    alert("잘못된 호출입니다.");
  }
};

/*
const showSealAnimation = (seal) => {
    seal
    .css({"animation":"floating 5s", "animation-iteration-count": "infinite"})
    .hover(
        () => {
            //$(".final-ending__img--pocketmon-img").css({"transform": "scale(1.3)"});
            //$(".final-ending__img--halo-img").css({"transform": "scale(1.3)","opacity":"0.9"});
            seal.children('img:eq(0)').css({"transform": "scale(1.3)"});
            seal.children('img:eq(1)').css({"transform": "scale(1.3)","opacity":"0.9"});
        },
        () => {
            seal.children('img:eq(0)').css({"transform": "scale(1)"});
            seal.children('img:eq(1)').css({"transform": "scale(1)","opacity":"0.8"});
        });
}
*/

let currentLevel = 1;
characterIndex = 2;
typing = null;
finalTextArray = [
  "드디어 찾았구나!!",
  "수고 많았다.",
  "당근마켓에서 시세좀 알아오렴",
];
myTextIndex = 0;

const showFinalAnimation = (seal) => {
  $(".final-ending__pocketmon-seal").animate(
    {
      left: "50%",
      transform: "translate(-50%, 0)",
      top: "10%",
    },
    1000,
    function () {
      showFinalStory(finalTextArray[myTextIndex]);
    }
  );
};

// 최종엔딩, 게임오버
/*
const showMainMenu = () => {
    $(".final-ending").hide();
    //메인메뉴 show()
};*/

const showFinalStory = (string) => {
  clearInterval(typing);
  $(".person-message__p--message").html("");
  myTextIndex += 1;
  if (myTextIndex > 3) {
    /////////////// 메인으로 간다 ////////////
  } else {
    animateTyping($(".person-message__p--message"), string, 0);
  }
};

animateTyping = (target, string, index) => {
  if (index > string.length) return;
  else if (index == 0) target.html("");
  target.append(document.createTextNode(string.charAt(index)));
  typing = setTimeout(function () {
    animateTyping(target, string, index + 1);
  }, 70);
};

const initFinalEnding = () => {
  //$(".final-ending__button--show-main").on("click", showMainMenu);
  //// 메인으로 가는 함수 호출 /////
  //globalAudio.finalLevelClear.pause();
  var temp = "";
  if (characterIndex == 0) {
    temp = "s0-img";
  } else if (characterIndex == 1) {
    temp = "s1-img";
  } else if (characterIndex == 2) {
    temp = "s2-img";
  }
  $(".person-message__img--person-img").addClass(temp);
  $(".new-map__img--player").addClass("s" + temp);

  $(".person-message__img--next-img3").on("click", () => {
    showFinalStory(finalTextArray[myTextIndex]);
  });
};

$(document).ready(initFinalEnding);
