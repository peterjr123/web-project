const initNewMap = () => {
  $(".new-map__img--player").hide();
  $(".new-map__circle").hide();
  globalAudio.newMap.currentTime = 0;
  globalAudio.newMap.play();
};

const hideNewMap = () => {
  $(".new-map").hide();
};

showNewMap = () => {
  initNewMap();
  $(".new-map").show();
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

  $(".new-map__img--player").css({
    content: 'url("./img/new_img/ss' + temp + '.png")',
    height: "64px",
  });

  str = "어디로 가볼까?";
  clearInterval(typing);
  $(".person-message__p--message").html("");
  animateTyping($(".person-message__p--message"), str, 0);
};

animateTyping = (target, string, index) => {
  if (index > string.length) return;
  else if (index == 0) target.html("");
  target.append(document.createTextNode(string.charAt(index)));
  typing = setTimeout(function () {
    animateTyping(target, string, index + 1);
  }, 70);
};

const pathAnimation = (path, index, num) => {
  if (index >= num) {
    return;
  }
  path.children().eq(index).show();
  setTimeout(pathAnimation, 300, path, index + 1);
};

showNewMapPath = (level) => {
  unbindPins();
  initNewMap();
  $(".new-map").show();
  $(".person-message").hide();
  $(".new-map__img--player").show();
  if (level == 1) {
    currentLevel += 1;
    pathAnimation($(".new-map__path--kul-to-lib"), 0, 6);
    $(".new-map__img--player")
      .css({ right: "400px", top: "300px" })
      .animate({ left: "300px", top: "200px" }, 1800, () => {
        ////////// 다음 난이도 ///////////
        hideNewMap();
        onStartGame(currentLevel);
        bindPins();
        globalAudio.newMap.pause();
      });
  } else if (level == 2) {
    currentLevel += 1;
    pathAnimation($(".new-map__path--lib-to-tech"), 0, 6);
    $(".new-map__img--player")
      .css({ left: "300px", top: "200px" })
      .animate({ left: "600px", top: "130px" }, 1800, () => {
        ////////// 다음 난이도 ///////////
        hideNewMap();
        onStartGame(currentLevel);
        bindPins();
        globalAudio.newMap.pause();
      });
  }
};

$(window).ready(() => {
  function loop1(state) {
    $(".new-map__div--pin1-wrapper").animate(
      {
        top: "+=" + String(state * 10),
      },
      800,
      () => {
        loop1(state * -1);
      }
    );
  }

  function loop2(state) {
    $(".new-map__div--pin2-wrapper").animate(
      {
        top: "+=" + String(state * 10),
      },
      700,
      () => {
        loop2(state * -1);
      }
    );
  }

  function loop3(state) {
    $(".new-map__div--pin3-wrapper").animate(
      {
        top: "+=" + String(state * 10),
      },
      900,
      () => {
        loop3(state * -1);
      }
    );
  }
  loop1(1);
  loop2(-1);
  loop3(1.3);

  bindPins();

  $(".new-map__div--pin-wrapper")
    .children()
    .each(function () {
      $(this).hover(
        () => {
          $(this).css("transform", "scale(1.2)");
        },
        () => {
          $(this).css("transform", "scale(1)");
        }
      );
    });

  $(".yes-no-dialog2__p--yes")
    .hover(
      () => {
        $(".yes-no-dialog2__img--tri1").show();
      },
      () => {
        $(".yes-no-dialog2__img--tri1").hide();
      }
    )
    .on("click", () => {
      globalAudio.clickAudio.currentTime = 0;
      globalAudio.clickAudio.play();
      clearInterval(typing);
      $(".person-message__p--message").html("");
      onStartGame(currentLevel);
      $(".yes-no-dialog2").hide();
      hideNewMap();
      globalAudio.newMap.pause();
      ///////////// 여기서 게임 픒레이 호출 //////////////
    });
  $(".yes-no-dialog2__p--no")
    .hover(
      () => {
        $(".yes-no-dialog2__img--tri2").show();
      },
      () => {
        $(".yes-no-dialog2__img--tri2").hide();
      }
    )
    .on("click", () => {
      globalAudio.clickAudio.currentTime = 0;
      globalAudio.clickAudio.play();
      currentLevel = -1;
      str = "어디로 가볼까?";
      clearInterval(typing);
      $(".person-message__p--message").html("");
      animateTyping($(".person-message__p--message"), str, 0);
      $(".yes-no-dialog2").hide();
    });
});

const unbindPins = () => {
  $(".new-map__div--pin1-wrapper").off("click");
  $(".new-map__div--pin2-wrapper").off("click");
  $(".new-map__div--pin3-wrapper").off("click");
};

const bindPins = () => {
  $(".new-map__div--pin1-wrapper").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    str = "기숙사 편의점으로 가볼까?(easy mode)";
    currentLevel = 1;
    clearInterval(typing);
    $(".person-message__p--message").html("");
    animateTyping($(".person-message__p--message"), str, 0);
    $(".yes-no-dialog2").show();
  });
  $(".new-map__div--pin2-wrapper").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    str = "도서관 편의점으로 가볼까?(normal mode)";
    currentLevel = 2;
    clearInterval(typing);
    $(".person-message__p--message").html("");
    animateTyping($(".person-message__p--message"), str, 0);
    $(".yes-no-dialog2").show();
  });
  $(".new-map__div--pin3-wrapper").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    str = "학생회관 편의점으로 가볼까?(hard mode)";
    currentLevel = 3;
    clearInterval(typing);
    $(".person-message__p--message").html("");
    animateTyping($(".person-message__p--message"), str, 0);
    $(".yes-no-dialog2").show();
  });
};
