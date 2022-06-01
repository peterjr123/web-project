oakTextArray = [];

specialText = "이제부터 띠부씰을 찾으러 가면 됩니다! 그럼 건국대로!";

oakTextArraySex = ["남자 로구나?", "여자 로구나?", "교수님이시군요!"];

oakTextIndex = 0;

typing = null;

const initStartStory = () => {
  oakTextArray = [
    "흐음!! 잘 왔다! 건국대학교에 온걸 환영한다!",
    "내 이름은 KU박사!",
    '이 세계에는 띠고 부치는 씰 줄여서 "띠부씰" 이라 불리는 스티커가 유행중이다!',
    "나는 그런 띠부씰들을 얻기 위해 연구하고 있는 것이란다!",
    "그건 그렇고 이제 슬슬 자네에 대해 알아보도록 하지!",
    "자네는 남자인가? 여자인가? 아니면... 교수님이신가요?",
    "이제부터 띠부씰을 찾으러 가면 된다! 그럼 건국대로!",
  ];
  globalAudio.startStory.currentTime = 0;
  globalAudio.startStory.play();
  oakTextIndex = 0;
  typing = null;
  characterIndex = -1;

  $(".person-message__img--person-img").css(
    "content",
    'url("./img/new_img/oak.png")'
  );

  $(".person-message__img--next-img").show();

  for (let i = 0; i < 3; i++) {
    $(".start-story__div--select-sex")
      .children()
      .eq(i)
      .css({
        content: 'url("./img/new_img/s' + i + '.png")',
        width: "150px",
        height: "240px",
        display: "none",
      });
  }

  $(".start-story__div--select-sex")
    .children()
    .each(function () {
      $(this).hover(
        function () {
          $(this).css("transform", "scale(1.2)");
        },
        function () {
          $(this).css("transform", "scale(1)");
        }
      );
    });

  $(".start-story__div--select-sex")
    .children()
    .each(function () {
      $(this).on("click", function () {
        characterIndex = $(this).attr("id");

        clearInterval(typing);
        $(".person-message__p--message").html("");
        animateTyping(
          $(".person-message__p--message"),
          oakTextArraySex[characterIndex],
          0
        );

        $(".start-story__div--select-sex").children().fadeOut();
        $(this).fadeIn();

        $(".yes-no-dialog").show();
      });
    });
};

showStartStoryDisplay = () => {
  initStartStory();
  $(".start-story").show();
  showStory(oakTextArray[oakTextIndex]);
};

showStory = (string) => {
  clearInterval(typing);
  $(".person-message__p--message").html("");
  console.log(string);
  animateTyping($(".person-message__p--message"), string, 0);
};

hideStartStory = () => {
  $(".start-story").hide();
};

animateTyping = (target, string, index) => {
  if (index > string.length) return;
  else if (index == 0) target.html("");
  target.append(document.createTextNode(string.charAt(index)));
  typing = setTimeout(function () {
    animateTyping(target, string, index + 1);
  }, 70);
};

$(window).ready(() => {
  function loop(state) {
    $(".person-message__img--next-img").animate(
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

  $(".person-message__img--next-img").on("click", function () {
    globalAudio.clickAudio.currentTime = 0;
    globalAudio.clickAudio.play();
    oakTextIndex += 1;
    if (oakTextIndex == 7) {
      console.log("인덱스 7");
      $(".person-message__img--next-img").hide();
      $(".start-story__div--select-sex")
        .children()
        .eq(characterIndex)
        .animate(
          {
            width: "32px",
            height: "32px",
          },
          2000,
          () => {
            $(".start-story__div--select-sex")
              .children()
              .eq(characterIndex)
              .css({
                content: 'url("./img/new_img/ss' + characterIndex + '.png")',
              });
            setTimeout(() => {
              hideStartStory();
              showNewMap();
              globalAudio.startStory.pause();
            }, 2000);
            ////// 여기에 난이도로 넘어가는 함수 넣으면 됨 //////
          }
        );
      return;
    }

    showStory(oakTextArray[oakTextIndex]);
    if (oakTextIndex == 5) {
      $(".start-story__div--select-sex").children().fadeIn();
      $(".person-message__img--next-img").hide();
    }
  });
  $(".yes-no-dialog__p--yes")
    .hover(
      () => {
        $(".yes-no-dialog__img--tri1").show();
      },
      () => {
        $(".yes-no-dialog__img--tri1").hide();
      }
    )
    .on("click", () => {
      globalAudio.clickAudio.currentTime = 0;
      globalAudio.clickAudio.play();
      if (characterIndex == 2) {
        oakTextArray[6] = specialText;
      }
      oakTextIndex += 1;
      showStory(oakTextArray[oakTextIndex]);
      $(".yes-no-dialog").hide();
      $(".person-message__img--next-img").show();
      $(".start-story__div--select-sex")
        .children()
        .each(function () {
          $(this).unbind("mouseenter mouseleave");
        });
      $(".start-story__div--select-sex")
        .children()
        .each(function () {
          $(this).off("click");
        });
    });

  $(".yes-no-dialog__p--no")
    .hover(
      () => {
        $(".yes-no-dialog__img--tri2").show();
      },
      () => {
        $(".yes-no-dialog__img--tri2").hide();
      }
    )
    .on("click", () => {
      globalAudio.clickAudio.currentTime = 0;
      globalAudio.clickAudio.play();
      $(".start-story__div--select-sex").children().fadeIn();
      $(this).css("position", "static").show();
      $(".yes-no-dialog").show();
      showStory(oakTextArray[5]);
      $(".yes-no-dialog").hide();
    });
});
