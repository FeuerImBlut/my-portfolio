//video section slider
var videoSlider = document.getElementById('video-slides'),
    videoSlides = document.getElementsByClassName('video-slide'),
    videoPrev = document.getElementById('video-prev'),
    videoNext = document.getElementById('video-next'),
    videoRadio = document.getElementsByClassName('video-radio'),
    videoIndex = 0;

function videoSlide(items, prev, next) {
    var slides = items.getElementsByClassName('video-slide'),
        slidesLength = slides.length,
        slideSize = slides[0].offsetWidth + 42,
        allowShift = true;
    
    prev.addEventListener('click', () => {shiftSlide(-1)});
    next.addEventListener('click', () => {shiftSlide(1)});

    items.addEventListener('transitionend',checkIndex);

    function shiftSlide(dir, action) {
        items.classList.add('shifting');
        stopVideo();
      
        if (allowShift) {
          if (!action) { posInitial = items.offsetLeft; }
    
          if (dir == 1) {
            items.style.left = (posInitial - slideSize) + "px";
            index++;      
          } else if (dir == -1) {
            items.style.left = (posInitial + slideSize) + "px";
            index--;      
          }
        };

        if (index == -1) {
          videoRadio[4].checked = true;
        }
        else if (index == 5) {
          videoRadio[0].checked = true;
        }
        else {
          videoRadio[index].checked = true;
        }
        
        allowShift = false;
      }

      function checkIndex (){
        items.classList.remove('shifting');
        
        if (index == -1) {
          items.style.left = -((slidesLength - 4) * slideSize) + "px";
          index = 4;
        }
          if (index == 5) {
          items.style.left = -(1 * slideSize) + "px";
          index = 0;
        }
        
        allowShift = true;

    }
}

function videoRadioChange() {
  videoSlider.classList.add('shifting');
  stopVideo();
  var videoSlideSize = videoSlides[0].offsetWidth + 42;
  var count = 0;
  for (let i = 0; i < videoRadio.length; i++) {
  if (videoRadio[i].checked == true) {
    count = i + 2;
    index = i;
  break;
  }
  checkIndex();
}

videoSlider.style.left = -(count * videoSlideSize) + "px";
}

function stopVideo() {
  var iframes = document.querySelectorAll('iframe');
  Array.prototype.forEach.call(iframes, iframe => { 
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
  func: 'stopVideo' }), '*');
 });
}

videoSlide(videoSlider, videoPrev, videoNext);