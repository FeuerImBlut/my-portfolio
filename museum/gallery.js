const pictureInnerContainer = document.querySelector('.gallery-container');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function randomGallery(arr) {
    let myArr = shuffle(arr);
    for (i = 0; i < myArr.length; i++) {
      const img = document.createElement('img');
      img.classList.add('gallery-img');
      img.src = `assets/img/gallery/gallery${myArr[i]}.jpg`;
      img.alt = `gallery${myArr[i]}`;
      img.id = `gallery${myArr[i]}`;
      pictureInnerContainer.append(img);
    }
  }

  function debounce(func, wait = 10, immediate = true) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  function animateGallery(e){
      galleryPictures.forEach (galleryPicture => {
        const halfPicture = galleryPicture.height / 2;
        const topPicture = galleryPicture.getBoundingClientRect().top;
        //const bottomPicture = galleryPicture.getBoundingClientRect().top + galleryPicture.height;
        const windowHeight = window.innerHeight;
        const isHalfShown = (topPicture - windowHeight + halfPicture) < 0 /*&& (bottomPicture - halfPicture) > 0*/;
        if (isHalfShown)  {
                galleryPicture.classList.add('active');
            }   else {
                galleryPicture.classList.remove('active');
            }
     });

  }

  randomGallery(galleryArray);
  window.addEventListener('scroll',debounce(animateGallery));

  const galleryPictures = document.querySelectorAll('.gallery-img');