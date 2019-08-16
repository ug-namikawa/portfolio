/** fullscreen */
$(document).ready(function () {
  hsize = $(window).height();
  $("#top").css("height", hsize + "px");
});
$(window).resize(function () {
  hsize = $(window).height();
  $("#top").css("height", hsize + "px");
});

/** fadeanime */
$(function(){
  var fadeItem = $('.mc-ImgBox, .mc-Intro_Head, .mc-List dt,.mc-Intro_ImgBox, .mc-Flow, .mc-NicocasPromotion, .mc-Ending'); //fadeinさせたい要素
  fadeItem.css("opacity","0");
  var w = $(window).width();
  var x = 769; // media screen and (max-width: 768px) の分岐点

  $(window).resize(function () {
    w = $(window).width();
  });

  $(window).scroll(function (){

    fadeItem.each(function(){
      var Target = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > Target - windowHeight + windowHeight/7){
        $(this).css("opacity","1" );
      } else {
        $(this).css("opacity","0" );
      }
    });

    if (w >= x){
    $(".mc-List dd").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/8){
        $(".mc-ImgBox",this).css({
          "margin-top": "0px",
        });
      } else {
        $(".mc-ImgBox",this).css({
          "margin-top": "40px",
        });
      }
    });

  } else {
    $(".mc-Intro_Description").each(function(){
      var mcDisp = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > mcDisp - windowHeight + windowHeight/8){
        $(".mc-Intro_Description-catch",this).css({
          "padding-top": "0px",
        });
      } else {
        $(".mc-Intro_Description-catch",this).css({
          "padding-top": "25px",
        });
      }
    });

    $(".mc-List dd").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/8){
        $(".mc-List_Catch",this).css({
          "padding-top": "0px",
        });
      } else {
        $(".mc-List_Catch",this).css({
          "padding-top": "25px",
        });
      }
    });
  }

  });
});
