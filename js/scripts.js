$(document).ready(function () {
  $(".preload").removeClass("preload");
  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href").substr(1);
      if (blockID == "") return false;

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  $(".header__burger").on("click", () => {
    $(".header__burger,.header__menu").toggleClass("burger-active");
    $("body").toggleClass("lock");
    $(".header__menu.burger-active a").on("click", () => {
      $(".header__burger,.header__menu").removeClass("burger-active");
      $("body").removeClass("lock");
    });
    window.onresize = function (e) {
      var eW = e.target.outerWidth;
      if (eW >= 993) {
        $(".header__burger,.header__menu").removeClass("burger-active");
        $("body").removeClass("lock");
      }
    };
  });
  $("._phone").mask("+38 (999) 999-99-99");
  $("._ch").blur(function () {
    var f = $(this).val();
    $(this).val(f);
  });

  $(".footer__soc a").on("click", () => {
    alert("На данный момент ссылка не доступна");
  });
  $(".bonus-container").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    touchThreshold: 10,
  });
  $(".about_product-wrapper").slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    touchThreshold: 10,
  });

  $(".hello").addClass("hello-show");

  $(".start-background").on("load", function (e) {
    console.log(e);
    console.log(this);
    console.log("1");
  });
  //   var currentimage = [, $(".start__logo > img")];
  //   for (let i = 0; i < currentimage.length; i++) {
  //     currentimage.map((item) => {
  //       item.on("load", function () {});
  //     });
  //   }
});
