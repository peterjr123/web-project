const showMainMenu = () => {
  $(".game-over").hide();
  $(".final-ending").hide();
  //   globalAudio.gameoverAudio.pause();
  //   globalAudio.clickAudio.play();
  showMainDisplay();
};

showGameOver = () => {
  $(".game-over").show();
  //   globalAudio.gameoverAudio.currentTime = 0;
  //   globalAudio.gameoverAudio.play();
  initGameOver();
  typingGameOver();
};

const hideGameOver = () => {
  $(".game-over").hide();
};

const typingGameOver = () => {
  clearInterval(typing);
  $(".person-message__p--message").html("");
  temp = "다시 열심히 돌아다녀보자...";
  animateTyping($(".person-message__p--message"), temp, 0);
};

animateTyping = (target, string, index) => {
  if (index > string.length) return;
  else if (index == 0) target.html("");
  target.append(document.createTextNode(string.charAt(index)));
  typing = setTimeout(function () {
    animateTyping(target, string, index + 1);
  }, 70);
};

const initGameOver = () => {
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
  $(".person-message").show();

  //$("person-message__img--next-img3").on("click", showMainMenu);
  //globalAudio.clickAudio.play();
};

$(document).ready(() => {
  function loop(state) {
    $(".person-message__img--next-img3").animate(
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

  $(".person-message__img--next-img3").on("click", () => {
    hideGameOver();
    showNewMap();
  });
});
