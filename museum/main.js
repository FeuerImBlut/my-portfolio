//Welcome Section slider
var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    slidesRadio = sliderItems.getElementsByClassName('slide'),
    sliderRadio = document.getElementsByClassName('welcome-radio');
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    slideNumber = document.getElementById('slider-index'),
    index = 0;

//Picture explore slider
var exploreSlider = document.querySelector('.explore-change'),
    exploreAfter = document.querySelector('.after'),
    exploreBefore = document.querySelector('.before'),
    explore = document.querySelector('.section-explore');

//Picture slider function
  exploreSlider.onmousedown = function (event) {
    event.preventDefault();
    let sliderWidth = event.clientX - exploreSlider.getBoundingClientRect().left;

    explore.addEventListener('mousemove', onMouseMove);
    explore.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let posX = event.clientX - sliderWidth - exploreBefore.getBoundingClientRect().left;
      let beforeWidth = exploreBefore.offsetWidth;
      if (posX < 0) {
        posX = -exploreSlider.offsetWidth / 2;
      }
      if (posX > exploreBefore.offsetWidth - sliderWidth) {
        posX = exploreBefore.offsetWidth - exploreSlider.offsetWidth / 2;
      }
      exploreSlider.style.left = posX + 'px';
      exploreAfter.style.width = Math.abs(posX - beforeWidth + sliderWidth) + 'px';
    }
    function onMouseUp() {
      explore.removeEventListener('mousemove', onMouseMove);
      explore.removeEventListener('mouseup', onMouseUp);    }
  }



//Welcome slider function
function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  //wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
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
      slideNumber.textContent = '05 | 05';
      sliderRadio[slidesLength-1].checked = true;
    }
    else if (index == 5) {
      slideNumber.textContent = '01 | 05';
      sliderRadio[0].checked = true;
    }
    else {
      slideNumber.textContent = '0' + (index + 1) + ' | 05';
      sliderRadio[index].checked = true;
    }
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}
function radioChange() {
  var slideSize = slidesRadio[0].offsetWidth;
  var count = 0;
  for (let i = 0; i < slidesRadio.length; i++) {
  if (sliderRadio[i].checked == true) {
    count = i + 1;
    index = i;
    slideNumber.textContent = '0' + (index + 1) + ' | 05';
  break;
  }
}
  sliderItems.classList.add('fade');
  sliderItems.style.opacity = 0;
  setTimeout(() => {
    sliderItems.classList.remove('fade');
     sliderItems.style.left = -(count * slideSize) + "px";
  },150);
   setTimeout(() => {
    sliderItems.classList.add('fade');
    sliderItems.style.opacity = 1;
   },300);
   setTimeout(() => {
    sliderItems.classList.remove('fade');
   },450)

}
const hamburger = document.getElementsByClassName('hamburger');


const galleryArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];





function burgerToggle() {
  for (var i = 0; i<hamburger.length; i++) {
    hamburger[i].classList.toggle('closed');
 }

}

;
slide(slider, sliderItems, prev, next);





