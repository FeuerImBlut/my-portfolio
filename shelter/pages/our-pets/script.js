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



//____PAGINATION___
var page = 1;
var petsArray = generateArray();
const backward = document.querySelector('.backward');
const prev = document.querySelector('.prev');
const pageNum = document.querySelector('.number');
const next = document.querySelector('.next');
const forward = document.querySelector('.forward');
var cards = document.querySelectorAll('.card');
const lastPage = calculatePages();

function calculatePages() {
    cards = Array.from(cards);
    if (window.matchMedia("(max-width: 767px)").matches) {
        cards = cards.slice(0, 3);
        return 16;
    } else if (window.matchMedia("(max-width: 1279px)").matches) {
        cards = cards.slice(0, -2);
        return 8;
    }
    else {

        return 6;
    }
}

function flipPage(dir) {
    pageNum.textContent = page;
    switch (dir) {
        case -2:
            page = 1;
            break;
        case -1:
            page--;
            break;
        case 1:
            page++;
            break;
        case 2:
            page = lastPage;
            break;
        default:
            break;
    }
    pageNum.textContent = page;

    if (page == 1) {
        backward.disabled = true;
        prev.disabled = true;
        forward.disabled = false;
        next.disabled = false;
    }
    else if (page == lastPage) {
        forward.disabled = true;
        next.disabled = true;
        backward.disabled = false;
        prev.disabled = false;
    }
    else {
        backward.disabled = false;
        prev.disabled = false;
        forward.disabled = false;
        next.disabled = false;
    }
    drawMultipleCards(page);
    return;
}

backward.addEventListener('click', () => {
    flipPage(-2);
});
prev.addEventListener('click', () => {
    flipPage(-1);
});
next.addEventListener('click', () => {
    flipPage(1);
});
forward.addEventListener('click', () => {
    flipPage(2);
});

function drawCard(card, number) {
    let picture = card.children[0].firstChild;
    picture.alt = petsData[number].name;
    picture.src = petsData[number].img;
    card.children[1].textContent = petsData[number].name;
    card.number = number;
}

function drawMultipleCards(page) {
    cards.forEach((card, index) => {
        let petsIndex = petsArray[index + ((page - 1) * cards.length)];
        drawCard(card, petsIndex);
    });
}

function generateArray() {
    let startArr = [0, 1, 2, 3, 4, 5, 6, 7];
    //randomize array
    for (var i = startArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = startArr[i];
        startArr[i] = startArr[j];
        startArr[j] = temp;
    }
    let resultArray = startArr.slice(0);
    for (let i = 1; i < 6; i++) {
        let tempArr = startArr.slice(0);
        let tempEl = tempArr[0];
        tempArr[0] = tempArr[i];
        tempArr[i] = tempEl;
        resultArray = resultArray.concat(tempArr);
    }
    console.log(resultArray);
    return resultArray;
}
drawMultipleCards(1);

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







