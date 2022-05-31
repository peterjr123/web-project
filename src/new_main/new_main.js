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
});
