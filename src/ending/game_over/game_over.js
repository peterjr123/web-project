const showMainMenu = () => {
    $(".game-over").hide();
    $(".final-ending").hide();
    //$(".game-over__msg--dr-oak-msg").text() = ''
    //메인메뉴 show()
    //msgTypelt.destroy();
};

showGameOver = () => {
    $(".game-over").show();
    typingGameOver();
}

const typingGameOver = () => {
    $(".game-over__msg--dr-oak-msg").text('');
    new TypeIt(".game-over__msg--dr-oak-msg", {
        speed: 70,
        waitUntilVisible: true,
    })
    .type("지구로 돌아가자...")
    .go();
};

const initGameOver = () => {
    $(".game-over__button--show-main").on("click", showMainMenu);
};

$(document).ready(initGameOver);