const showMainMenu = () => {
    $(".game-over").hide();
    //메인메뉴 show()
};

const typingGameOver = () => {
    new TypeIt(".game-over__msg--dr-oak-msg", {
        speed: 70,
        waitUntilVisible: true,
      })
      .type("지구로 돌아가자...")

      .go()
};

const init = () => {
    typingGameOver();
    $(".game-over__button--show-main").on("click", showMainMenu);
};

$(document).ready(init);