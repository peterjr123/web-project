showEnding = (endingNumber) => {
  // 난이도 1 => endingNumbe 1, 마지막 난이도 => endingNumber 3
  if (endingNumber == 0) {
    //globalAudio.middleLevelClear.currentTime = 0;
    //globalAudio.middleLevelClear.play();
    initMidEnding();
    $(".mid-ending").show();
    $(".mid-ending__img--pocketmon-img").attr("src", "./img/ending/long.png");
    showMidAnimation($(".mid-ending__pocketmon-seal"));
    currentLevel = 1;
  } else if (endingNumber == 1) {
    //globalAudio.middleLevelClear.currentTime = 0;
    //globalAudio.middleLevelClear.play();
    initMidEnding();
    $(".mid-ending").show();
    $(".mid-ending__img--pocketmon-img").attr(
      "src",
      "./img/ending/pikachu.png"
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
  str = "와!! 그런데 내가 원하는 스티커가 아니야... 다음 편의점으로 가보자!";
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
  globalAudio.middleLevelClear.currentTime = 0;
  globalAudio.middleLevelClear.play();
  clearInterval(typing);
  $(".person-message__p--message").html("");
  function loop(state) {
    $(".person-message__img--next-img-mid").animate(
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

  $(".mid-ending__pocketmon-seal").css("top", "-300px");
  $(".person-message").show();
  var temp = "";
  if (characterIndex == 0) {
    temp = "0";
  } else if (characterIndex == 1) {
    temp = "1";
  } else if (characterIndex == 2) {
    temp = "2";
  }
  $(".person-message__img--person-img").css({
    content: 'url("./img/new_img/s' + temp + '.png")',
    height: "400px",
  });
};

$(window).ready(() => {
  $(".person-message__img--next-img-mid").on("click", function () {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    ////// 다음 난이도 호출 //////
    $(".mid-ending").hide();
    showNewMapPath(currentLevel);
  });
});
