finalTextArray = [];
myTextIndex = 0;

const showFinalAnimation = () => {
  initFinalEnding();
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
  $(".final-ending__pocketmon-seal").css("top", "-300px");
  clearInterval(typing);
  $(".person-message__p--message").html("");

  if (myTextIndex > 2) {
    /////////////// 메인으로 간다 ////////////
    hideFinalEnding();
    showMain();
  } else {
    animateTyping($(".person-message__p--message"), string, 0);
    myTextIndex += 1;
  }
};

const hideFinalEnding = () => {
  $(".final-ending").hide();
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
  globalAudio.finalLevelClear.currentTime = 0;
  globalAudio.finalLevelClear.play();
  myTextIndex = 0;
  clearInterval(typing);
  $(".person-message__p--message").html("");
  if (characterIndex == 2) {
    finalTextArray = [
      "드디어 찾으셨군요!!",
      "수고 많으셨습니다.",
      "한 학기동안 좋은 강의 해주셔서 감사합니다!!",
    ];
  } else {
    finalTextArray = [
      "드디어 찾았구나!!",
      "수고 많았다.",
      "당근마켓에서 가격좀 알아오렴",
    ];
  }
  $(".person-message").show();
  $(".person-message__img--person-img").css(
    "content",
    'url("./img/new_img/oak.png")'
  );
};

$(window).ready(() => {
  function loop(state) {
    $(".person-message__img--next-img-final").animate(
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
  $(".person-message__img--next-img-final").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    showFinalStory(finalTextArray[myTextIndex]);
  });
});
