characterIndex = 2;
typing = null;
currentLevel = -1;
$(window).ready(() => {
  showNewMap();
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

  $(".new-map__div--pin1-wrapper").on("click", () => {
    str = "기숙사 편의점으로 가볼까?(easy mode)";
    currentLevel = 1;
    clearInterval(typing);
    $(".person-message__p--message").html("");
    animateTyping($(".person-message__p--message"), str, 0);
    $(".yes-no-dialog2").show();
  });
  $(".new-map__div--pin2-wrapper").on("click", () => {
    str = "도서관 편의점으로 가볼까?(normal mode)";
    currentLevel = 2;
    clearInterval(typing);
    $(".person-message__p--message").html("");
    animateTyping($(".person-message__p--message"), str, 0);
    $(".yes-no-dialog2").show();
  });
  $(".new-map__div--pin3-wrapper").on("click", () => {
    str = "학생회관 편의점으로 가볼까?(hard mode)";
    currentLevel = 3;
    clearInterval(typing);
    $(".person-message__p--message").html("");
    animateTyping($(".person-message__p--message"), str, 0);
    $(".yes-no-dialog2").show();
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
      currentLevel = -1;
      str = "어디로 가볼까?";
      clearInterval(typing);
      $(".person-message__p--message").html("");
      animateTyping($(".person-message__p--message"), str, 0);
      $(".yes-no-dialog2").hide();
    });
});

showNewMap = () => {
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
  if (level == 1) {
    pathAnimation($(".map__path--kul-to-lib"), 0, 6);
    $(".new-map__img--player")
      .show()
      .css({ right: "400px", top: "300px" })
      .animate({ left: "300px", top: "200px" }, 1800);
  } else if (level == 2) {
    pathAnimation($(".map__path--lib-to-tech"), 0, 6);
    $(".new-map__img--player")
      .show()
      .css({ left: "300px", top: "200px" })
      .animate({ left: "600px", top: "130px" }, 1800);
  }
};
