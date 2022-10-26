var sectionVideo = document.getElementById('video'),
    player = document.querySelector('.video-player'),
    video = player.querySelector('.video-player-video'),
    progress = player.querySelector('.video-progress'),
    volume = player.querySelector('.video-volume-progress'),
    toggle = player.querySelector('.video-player-play');

var tempVolume = 0;

const colorOne = getComputedStyle(document.documentElement)
.getPropertyValue('--dark-red');
const colorTwo = getComputedStyle(document.documentElement)
.getPropertyValue('--white');

progress.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${value}%, ${colorTwo} ${value}%, ${colorTwo} 100%)`;
    videoUpdate(value);
  })
  
  volume.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${value}%, ${colorTwo} ${value}%, ${colorTwo} 100%)`;
    volumeUpdate(value);

  })

  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    updateProgress();
  }

  function updateButton(check) {
    if (this.paused) {
        document.querySelector('.play-big').classList.remove('pause');
        toggle.classList.add('pause');
    }
    if (!this.paused) {
        document.querySelector('.play-big').classList.add('pause');
        toggle.classList.remove('pause')
    }
  }

  function videoUpdate(number) {
      video.currentTime = number / 100 * video.duration;
  }

  function volumeUpdate(number) {
      video.volume = number / 100;
  }

  function toggleVolume() {
        if (volume.value >0) {
            tempVolume = volume.value;
            volume.value = 0;
            volume.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${0}%, ${colorTwo} ${0}%, ${colorTwo} 100%)`;
            video.volume = 0;
            muteButton.classList.add('muted');
        }
        else {
             volume.value = tempVolume;
             video.volume = tempVolume/100;
             volume.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${tempVolume}%, ${colorTwo} ${tempVolume}%, ${colorTwo} 100%)`;
             muteButton.classList.remove('muted');
        }
  }

  function updateProgress () {
        while (!video.paused) {
            setInterval(() => {
                var value = Math.round(+video.currentTime/+video.duration*100);
                progress.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${value}%, ${colorTwo} ${value}%, ${colorTwo} 100%)`;
                progress.value = value;
                }, 100);
                return;
        }
  }

  video.addEventListener('click', togglePlay);
  toggle.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause',updateButton);
  document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        togglePlay();
        e.preventDefault();
      }
      if (e.code === 'KeyM') {
          toggleVolume();
          e.preventDefault();
      }
      if (e.code === 'KeyF') {
        video.requestFullscreen();
        e.preventDefault();
    }
      if (e.shiftKey && e.code === 'Period') {
          video.playbackRate += 0.25;
      }
      if (e.shiftKey && e.code === 'Comma') {
          if (video.playbackRate > 0.25)
        video.playbackRate -= 0.25;
    }
      console.log(e.code);
  });
  volumeUpdate(volume.value);
