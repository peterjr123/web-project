let currentLevel = 1;
characterIndex = 2;
typing = null;

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

  typingGameOver();
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
    temp = "s0-img";
  } else if (characterIndex == 1) {
    temp = "s1-img";
  } else if (characterIndex == 2) {
    temp = "s2-img";
  }
  $(".person-message__img--person-img").addClass(temp);
  $(".new-map__img--player").addClass("s" + temp);
  //$("person-message__img--next-img3").on("click", showMainMenu);
  //globalAudio.clickAudio.play();
};

$(document).ready(initGameOver);
