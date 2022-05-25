// onKillBossBlock에서 호출되어야 함
// 화면 지우는건 어디서??? 호출하기전? 호출 후?
/*
const showEnding = (endingNumber) => {
    // 난이도 1 => endingNumbe 1, 마지막 난이도 => endingNumber 3
    if(endingNumber == 0){
        $(".mid-ending").show();
        $(".mid-ending__img--pocketmon-img").css("src", "../../img/ending/피카츄.png")
    }
    else if(endingNumber == 1){
        $(".mid-ending").show();
        $(".mid-ending__img--pocketmon-img").css("src", "../../img/ending/단데기.png")
    }
    else if(endingNumber == 2){
        $(".final-ending").show();
        showFinalAnimation($(".final-ending__pocketmon-seal"));
    }
    else{
        alert("잘못된 호출입니다.");
    }
};*/

/*
const showSealAnimation = (seal) => {
    seal
    .css({"animation":"floating 5s", "animation-iteration-count": "infinite"})
    .hover(
        () => {
            //$(".final-ending__img--pocketmon-img").css({"transform": "scale(1.3)"});
            //$(".final-ending__img--halo-img").css({"transform": "scale(1.3)","opacity":"0.9"});
            seal.children('img:eq(0)').css({"transform": "scale(1.3)"});
            seal.children('img:eq(1)').css({"transform": "scale(1.3)","opacity":"0.9"});
        },
        () => {
            seal.children('img:eq(0)').css({"transform": "scale(1)"});
            seal.children('img:eq(1)').css({"transform": "scale(1)","opacity":"0.8"});
        });
}
*/

const showFinalAnimation = (seal) => {
    animLeftDistance = ($(".final-ending__wrapper").width() * 0.7)
    centerLeftDistance = ($(".final-ending__wrapper").width() - 300) / 2;

    seal
    .animate({"top" : "130px", "left": animLeftDistance}, 2000)
    .animate({"top" : "250px", "left": centerLeftDistance}, 1000, () => {typingFinalEnding(); showSealAnimation(seal);})
    
}

// 최종엔딩, 게임오버
/*
const showMainMenu = () => {
    $(".final-ending").hide();
    //메인메뉴 show()
};*/

const typingFinalEnding = () => {
    $(".final-ending__msg--dr_oak_msg").text('');
    new TypeIt(".final-ending__msg--dr_oak_msg", {
        speed: 70,
        waitUntilVisible: true,
      })
      .type("드디어 찾았구나!!")
      .pause(1500)
      .delete(null, { instant: true })
      .type("수고 많았다.")
      .pause(1500)
      .delete(null, { instant: true })
      .type("당근마켓에서 <br> 시세좀 알아오렴")
      .pause(1500)
      .go()
};



const initFinalEnding = () => {
    $(".final-ending__button--show-main").on("click", showMainMenu);
};

$(document).ready(initFinalEnding);


