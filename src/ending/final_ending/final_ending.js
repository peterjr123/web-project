$(document).ready(init);

// onKillBossBlock에서 호출되어야 함
// 화면 지우는건 어디서??? 호출하기전? 호출 후?
const showEnding = (endingNumber) => {
    // 난이도 1 => endingNumbe 1, 마지막 난이도 => endingNumber 3
    if(endingNumber == 1){
        $(".mid-ending").show();
        $(".mid-ending__img--pocketmon-img").css("src", "../../img/ending/피카츄.png")
    }
    else if(endingNumber == 2){
        $(".mid-ending").show();
        $(".mid-ending__img--pocketmon-img").css("src", "../../img/ending/단데기.png")
    }
    else if(endingNumber == 3){
        $(".final-ending").show();
        $(".final-ending__img--pocketmon-img").css("src", "../../img/ending/뮤.png")
    }
    else{
        alert("잘못된 호출입니다.");
    }
};

// 최종엔딩, 게임오버
const showMainMenu = () => {
    $(".final-ending").hide();
    //메인메뉴 show()
};

const init = () => {
    $(".final-ending__button--show-main").on("click", showMainMenu);
};