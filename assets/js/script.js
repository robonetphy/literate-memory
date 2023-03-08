$(document).ready(function () {
  $(".slider").slick({
    arrows: false,
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
  });
  // setTimeout(function () {
  //   $(window).trigger("scroll");
  //   AOS.init();
  // }, 200);
});
