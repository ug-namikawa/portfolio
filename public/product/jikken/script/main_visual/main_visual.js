'use strict';

(function () {
  // main-visualだと高さを取る(100vhだとスマホで死ぬ)
  var MainVisual = document.getElementById('main-visual');
  var isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
  if (isIOS) {
    var ScreenMode = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    var isFirst = true;
  }

  var MainVisualHeightUpdate = function MainVisualHeightUpdate() {
    var NowScreenMode = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    if (isIOS) {
      if (isFirst) {
        MainVisual.style.height = window.innerHeight + 'px';
        isFirst = false;
      }
      if (ScreenMode !== NowScreenMode) {
        MainVisual.style.height = window.innerHeight + 'px';
      }
    } else {
      MainVisual.style.height = window.innerHeight + 'px';
    }
  };
  var MainVisualHeightAttatch = function MainVisualHeightAttatch() {
    MainVisualHeightUpdate();
    window.addEventListener("resize", MainVisualHeightUpdate);
  };
  MainVisualHeightAttatch();

  // コンテンツ画像のLazyload
  var ContentImageLazyLoad = function ContentImageLazyLoad() {
    var LazyLoadImageList = document.querySelectorAll('[data-lazy-load]');
    for (var i = 0; i < LazyLoadImageList.length; i++) {
      LazyLoadImageList[i].src = LazyLoadImageList[i].getAttribute('data-src');
    }
  };

  // mainvisualの処理終了時の挙動
  var LastAnimationDom = document.getElementById('sns-share-menu');
  var body = document.body;

  LastAnimationDom.addEventListener('animationend', function () {
    body.setAttribute('data-scene', 'opened');
    ContentImageLazyLoad();
  });

  var ContentFirstDiscription = document.querySelector('.mc-Intro_Description');
  var ContentFirstDiscriptionRect = ContentFirstDiscription.getBoundingClientRect();
  if (window.pageYOffset + window.innerHeight > ContentFirstDiscriptionRect.top) {
    ContentImageLazyLoad();
  }
})();