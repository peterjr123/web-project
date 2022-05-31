let currentLevel = 1;
characterIndex = 2;
typing = null;
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
    showFinalAnimation($(".final-ending__pocketmon-seal"));
    currentLevel = 3;
  } else {
    alert("잘못된 호출입니다.");
  }
};

const showSealAnimation = (seal) => {
  seal
    .css({ animation: "floating 5s", "animation-iteration-count": "infinite" })
    .hover(
      () => {
        //$(".final-ending__img--pocketmon-img").css({"transform": "scale(1.3)"});
        //$(".final-ending__img--halo-img").css({"transform": "scale(1.3)","opacity":"0.9"});
        seal.children("img:eq(0)").css({ transform: "scale(1.3)" });
        seal
          .children("img:eq(1)")
          .css({ transform: "scale(1.3)", opacity: "0.9" });
      },
      () => {
        seal.children("img:eq(0)").css({ transform: "scale(1)" });
        seal
          .children("img:eq(1)")
          .css({ transform: "scale(1)", opacity: "0.8" });
      }
    );
};

const showMidAnimation = () => {
  $(".mid-ending__pocketmon-seal").animate(
    {
      left: "50%",
      transform: "translate(-50%, 0)",
      top: "10%",
    },
    1000,
    typingMidEnding
  );
};

animateTyping = (target, string, index) => {
  if (index > string.length) return;
  else if (index == 0) target.html("");
  target.append(document.createTextNode(string.charAt(index)));
  typing = setTimeout(function () {
    animateTyping(target, string, index + 1);
  }, 70);
};

const typingMidEnding = () => {
  str = "내가 원하는 스티커가 아니야... 다음 편의점으로 가자!";
  clearInterval(typing);
  $(".person-message__p--message").html("");
  animateTyping($(".person-message__p--message"), str, 0);
};

const onNextLevel = () => {
  $(".mid-ending").hide();
  // 다음 난이도 실행 currentLevel이용
  onSelectStage(currentLevel + 1);
  //globalAudio.middleLevelClear.pause();
  //globalAudio.clickAudio.play();
};

const initMidEnding = () => {
  function loop(state) {
    $(".person-message__img--next-img").animate(
      {
        bottom: "+=" + String(state * 10),
      },
      800,
      () => {
        loop(state * -1);
      }
    );
  }
  loop(1);
  $(".person-message__img--next-img").on("click", function () {
    ////// 다음 난이도 호출 //////
  });
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

  $(".person-message__img--next-img2").on("click", () => {
    clearInterval(typing);
    $(".person-message__p--message").html("");
    /////////// 다음 난이도 맵 이벤트 실행 ////////////
  });
};

$(document).ready(initMidEnding);
