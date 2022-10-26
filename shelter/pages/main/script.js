import data from "../../pets.json" assert { type: "json" };
const petsData = data;
//____BURGER____
const burger = document.querySelector('.burger');
const burgerPanel = document.querySelector('.burger-panel');
const logoHidden = document.querySelector('.logo.hidden')
const navTop = document.querySelector('.top-nav');
const grayBlock = document.querySelector('.gray-block');

const navLi = document.querySelectorAll('.top-nav li');

const burgerArray = [burger, burgerPanel, logoHidden, navTop, grayBlock];

burger.addEventListener('click', toggleBurger);
grayBlock.addEventListener('click', removeBurger);

navLi.forEach((el) => {
  el.addEventListener('click', removeBurger);
});

function removeBurger() {
  burgerArray.forEach(el => {
    el.classList.remove('active');
  });
}

function toggleBurger() {
  burgerArray.forEach(el => {
    el.classList.toggle('active');
  });
}

//___SLIDER___
const slideWidth = calculateSliderWidth();
const slides = document.querySelector('.card-slides');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let slide = document.querySelector('.card-box:not(.ghost)');
slides.appendChild(cloneSlide(slide));
slides.insertBefore(cloneSlide(slide), slide);

const cards = slide.querySelectorAll('.card');
const ghostCards = slides.querySelectorAll('.ghost .card');
let tempNumberArray = [];
slides.addEventListener('transitionend', reDraw);
next.addEventListener('click', () => { shiftSlide(1) });
prev.addEventListener('click', () => { shiftSlide(-1) });

function shiftSlide(side) {
  slides.classList.add('shifting');
  if (side == 1) {
    slides.style.left = (-slideWidth * 2) + "px"
  }
  else if (side == -1) {
    slides.style.left = '0px';
  }
}

function reDraw() {
  slides.classList.remove('shifting');
  slides.style.left = -slideWidth + "px";
  drawMultipleCards(cards, tempNumberArray);
  generateSlidesNumbers(tempNumberArray);
  drawMultipleCards(ghostCards, tempNumberArray);
}


function cloneSlide(slide) {
  let clonedSlide = slide.cloneNode(true);
  clonedSlide.classList.add('ghost');
  return clonedSlide;
}

function generateSlidesNumbers(oldArr) {
  let newArr = [];
  for (let i = 0; i < 3;) {
    let num = generateRandomNumber(0, 8);
    if (!newArr.includes(num) && !oldArr.includes(num)) {
      i++;
      newArr.push(num);
    }
  }
  tempNumberArray = newArr;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawCard(card, number) {
  let picture = card.children[0].firstChild;
  picture.alt = petsData[number].name;
  picture.src = petsData[number].img;
  card.children[1].textContent = petsData[number].name;
  card.number = number;
}

function drawMultipleCards(cards, array) {
  cards.forEach((el, index) => {
    if (index > 2) { index -= 3 }
    drawCard(el, array[index]);
  });
}

function calculateSliderWidth() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    return 270;
  } else if (window.matchMedia("(max-width: 1279px)").matches) {
    return 580;
  }
  else return 990;
}

//____MODAL____
const modal = document.querySelector('.modal');
const modalPicture = modal.querySelector('.modal-picture');
const modalText = modal.querySelector('.modal-text');
const modalList = modal.querySelectorAll('ul > li');
const modalGray = document.querySelector('.modal-gray');
const modalGrayMini = document.querySelector('.modal-gray-mini');
const modalClose = document.querySelector('.modal-close');


function fillModal(number) {
  modalPicture.src = petsData[number].img;
  modalText.children[0].textContent = petsData[number].name;
  modalText.children[1].textContent = `${petsData[number].type} - ${petsData[number].breed}`;
  modalText.children[2].textContent = petsData[number].description;
  modalList[0].innerHTML = '<b>Age: </b>' + petsData[number].age;
  modalList[1].innerHTML = '<b>Inoculations: </b>' + petsData[number].inoculations;
  modalList[2].innerHTML = '<b>Diseases: </b>' + petsData[number].diseases;
  modalList[3].innerHTML = '<b>Parasites: </b>' + petsData[number].parasites;
}

function showModal(number) {
  fillModal(number);
  modal.classList.add('active');
  document.body.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  document.body.classList.remove('active');

}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    showModal(card.number);
  });
})

modalGray.addEventListener('click', closeModal);
modalGrayMini.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);





// ___INITIATION___
generateSlidesNumbers([]);
reDraw();
// fillModal(2);




