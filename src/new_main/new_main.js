const hideMain = () => {
  $(".main-menu").hide();
};

const showMain = () => {
  $(".main-menu").show();
};

$(window).ready(() => {
  $(".main-menu__text").css("cursor", "pointer");
  $(".main-menu__div--button").each(function () {
    $(this).hover(
      function () {
        $(this).children().eq(0).css({ transform: "scale(1.2)" });
        $(this).children().eq(1).css({ transform: "scale(1.2)" });
      },
      function () {
        $(this).children().eq(0).css({ transform: "scale(1)" });
        $(this).children().eq(1).css({ transform: "scale(1)" });
      }
    );
  });

  $(".orange-button").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    hideMain();
    showStartStoryDisplay();
    ///////////// 스토리 시작 ///////////////
  });

  $(".purple-button").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    ///////////// 게임 설정 창 ///////////////
  });

  $(".red-button").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    ///////////// 조작법 창 ///////////////
  });

  $(".claret-button").on("click", () => {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    ///////////// 크레딧 창 ///////////////
  });
});
