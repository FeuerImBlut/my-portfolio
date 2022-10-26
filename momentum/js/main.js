const colorOne = getComputedStyle(document.documentElement)
.getPropertyValue('--main-color');
const colorTwo = getComputedStyle(document.documentElement)
.getPropertyValue('--secondary-color');

//Date & Time variables
const timeText = document.querySelector('.time'),
    dateText = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric', formatMatcher: 'best fit' };

//Greeting variables
const greetingText = document.querySelector('.greeting');
const myStorage = window.localStorage;
const nameInput = document.querySelector('.name');
var dayTime = '';

//Backround picture variables
const backImage = document.querySelector('body');
var pictureIndex = 1;

//Weather variables
const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    weatherCity = document.querySelector('.city');

//quotes variables
const requestQuotes = 'quotes.json',
      quote = document.querySelector('.quote'),
      author = document.querySelector('.author');

//audio
const playlistHtml = document.querySelector('.play-list');
const playlistArray = [];
const audio = new Audio;
var tracks;
const playButton = document.querySelector('.play');
var currentTrack = 0;
const progress = document.querySelector('#progress');
const volume = document.querySelector('#volume');
const mute = document.querySelector('.mute');
const trackLength = document.querySelector('.length');
var tempVolume = 0;

//translation
var language = 'eng';

function toggleLanguage() {
    if (language == 'eng') {
        language = 'rus';
        document.querySelector('.switchLanguage').innerHTML = "English";
    }
    else {
        language ='eng';
        document.querySelector('.switchLanguage').innerHTML = "Русский";
    }
    setDate();
    getWeather(weatherCity.value);
}

function audioReset(path) {
    audio.src = path;
    audio.currentTime = 0;
    tracks.forEach(element => {
        element.classList.remove('active');
    });
    tracks[currentTrack].classList.add('active');
}

function toggleAudio ()   {
      if (!audio.paused) {
        audio.pause();
        playButton.classList.remove('pause');
      }
      else { 
          audio.play();
          playButton.classList.add('pause');
          progressUpdate();
        }
  }

function switchTracks(dir) {
    if (dir == 'next') {
        if (currentTrack < playlistArray.length -1) {
        currentTrack++;
        }
        else {
            currentTrack = 0;
        }
    }
    else if (dir == 'prev') {
        if (currentTrack !== 0) {
            currentTrack--;
        }
        else currentTrack = playlistArray.length - 1;
    }
    else currentTrack = dir;
    audioReset(playlistArray[currentTrack].path);
    document.querySelector('.track-name').textContent =  playlistArray[currentTrack].track;
    playButton.classList.add('pause');
    toggleAudio();
    }

if (!myStorage.getItem('city')) {
    myStorage.setItem('city', 'Minsk');
}


if (!myStorage.getItem('quoteNumber')) {
    myStorage.setItem('quoteNumber', 0);
}

if (!myStorage.getItem('name')) {
    myStorage.setItem('name', '');
}
else nameInput.value = myStorage.getItem('name');


function playTrack(e) {
    tracks.forEach(element => {
        element.classList.remove('active');
    });
    var i = +e.target.id
    switchTracks(i);
}

function inputName(e) {
    myStorage.setItem('name', `${e.target.value}`)
}

function setDate() {
    var locale = (language == 'eng') ? 'en-US' : 'ru';
    const now = new Date();
    const dayOfWeek = now.getDay();
    const date = now.getDate();
    const month = now.getMonth();

    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hour = now.getHours();
    dayTime = whatTimeOfDay(hour);
    timeText.textContent = `${now.toLocaleTimeString(locale)}`;
    dateText.textContent = `${now.toLocaleDateString(locale, options)}`;
    greetingText.textContent = greetingtranslation(dayTime);
}

function greetingtranslation(daytime) {
    if (language == 'rus') {
        let result;
    switch (daytime) {
        case 'morning':
            result = 'Доброе утро,';
            break;
        case 'afternoon':
            result = 'Добрый день,';
            break;
        case 'evening':
            result = 'Добрый вечер,';
            break;
        case 'night':
            result = 'Доброй ночи,'
            break;
        default:
            break;
        }
    return result;
    }
    else return `Good ${daytime}`;
}


function whatTimeOfDay(hours) {
    if (hours >= 6 && hours < 12)
        return "morning";
    else if (hours >= 12 && hours < 18)
        return "afternoon";
    else if (hours >= 18 && hours <= 23)
        return "evening";
    else return "night";
}

//Background Images
function whatTimeBackground() {
    let now = new Date();
    let hours = now.getHours();
    let timeOfDay = whatTimeOfDay(hours);
    let randomInt = Math.floor(Math.random() * 19 + 1);
    pictureIndex = randomInt;
    return `${timeOfDay}/${randomInt}.jpg`;
    }

function slideImage(dir) {
    let now = new Date;
    let result = whatTimeOfDay(now.getHours()) + "/";
    if (dir == 1) {
        if (pictureIndex < 19) {
            pictureIndex++;
        }
        else pictureIndex = 1;
    }
    else if (dir == -1) {
        if (pictureIndex > 1) {
            pictureIndex--;
        }
        else pictureIndex = 20;
    }
    else {
        let randomInt = Math.floor(Math.random() * 19 + 1);
        pictureIndex = randomInt;
    }
    result += (pictureIndex >= 10) ? pictureIndex : '0' + pictureIndex;

    var imgUrl = "https://raw.githubusercontent.com/FeuerImBlut/stage1-tasks/assets/images/" + result + ".jpg";
    var imgUrl2 = "https://raw.githubusercontent.com/FeuerImBlut/stage1-tasks/assets/images/afternoon/16.jpg";

    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
        backImage.style.backgroundImage = "url(" + imgUrl + ")";
    }
}
// backImage.style.backgroundImage = "url(https://raw.githubusercontent.com/FeuerImBlut/stage1-tasks/assets/images/" + whatTimeBackground();

async function getWeather(city) {
    let lang = (language == 'eng') ? 'en' : 'ru';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=35c73677f8eb2c734c5da6ac4b3574c3&units=metric`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Ответ сети был не ok.');
        }
    }

    catch (error) {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = "Не найден город с таким названием";
        weatherDescription.textContent = "";
        return;
    }
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    var windSpeed = (language == 'eng') ? 'Wind speed:' : 'Скорость ветра:',
        humidity = (language == 'eng') ? 'Humidity:' : 'Влажность:';
    document.querySelector('.wind').textContent = windSpeed + data.wind.speed;
    document.querySelector('.humidity').textContent = humidity + data.main.humidity + '%';
    myStorage.setItem('city', city);
}

function cityChange(e) {
    getWeather(e.target.value);
}

async function getQuotes(file) {
    const res = await fetch(file);
    const data = await res.json();
    let quoteNumber = myStorage.getItem('quoteNumber');
    let randomInt = Math.floor(Math.random() * 4);
    while (randomInt == quoteNumber) {
        randomInt = Math.floor(Math.random() * 4);
    }
    myStorage.setItem('quoteNumber', randomInt);
    quote.textContent = data[randomInt].text;
    author.textContent = data[randomInt].author;
    return;
}

async function loadPlaylist() {
    const playlist = await fetch('playlist.json');
    const data = await playlist.json();
    for (let i = 0; i < data.length; i++) {
        playlistArray.push(data[i]);
        let li = document.createElement('li');
        li.setAttribute('id',`${i}`);
        li.classList.add('track');
        li.onclick = playTrack;
        li.textContent = data[i].track;
        playlistHtml.appendChild(li);
    }
    tracks = document.querySelectorAll('.track');
    audioReset(playlistArray[0].path);
}

function audioUpdate(number) {
    audio.currentTime = number / 100 * audio.duration;
    return;
}

function progressUpdate() {
    while (!audio.paused) {
        setInterval(() => {
            var value = Math.round(+audio.currentTime/+audio.duration*100);
            progress.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${value}%, ${colorTwo} ${value}%, ${colorTwo} 100%)`;
            }, 100);
        setInterval(() => {
            trackLength.innerHTML = formatTime(Math.floor(audio.currentTime)) + "/" + formatTime(Math.floor(audio.duration));
        }, 500);
        return;
    }
}

function toggleMute() {
    if (volume.value > 0) {
    tempVolume = volume.value;
    volume.value = 0;
    }
    else {
    volume.value = tempVolume;
    }
    mute.classList.toggle('muted');
    updateAudio(volume.value);
}

function updateAudio(value) {
    if (value == 0) {
        mute.classList.add('muted');
    }
    else mute.classList.remove('muted');
    
    audio.volume = value / 100;
}

function formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
    

nameInput.addEventListener('input', inputName);
weatherCity.addEventListener('change', cityChange);
audio.addEventListener('ended',() => {
    switchTracks('next')
});
progress.addEventListener('mouseup', function() {
    const value = progress.value;
    this.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${value}%, white ${value}%, white 100%)`;
    audioUpdate(value);
  })
volume.addEventListener('input', (e) => {
    updateAudio(e.target.value);
    volume.style.background = `linear-gradient(to right, ${colorOne} 0%, ${colorOne} ${e.target.value}%, white ${e.target.value}%, white 100%)`;
})

loadPlaylist();  
getQuotes(requestQuotes);
weatherCity.value = myStorage.getItem('city');
setDate();
slideImage(0);
setInterval(setDate, 1000);
getWeather(weatherCity.value);
