const canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
const contex = canvas.getContext('2d');

const main = document.querySelector('.main');
main.addEventListener("mousemove", (e) => {
  e.stopPropagation();
  canvas.style.left = e.screenX / 110 - 100 + "px";
  canvas.style.top = e.screenY / 110 - 100 + "px";
});

function createStar(x, y) {
  contex.beginPath();
  contex.fillStyle = 'blue';
  contex.arc(x, y, radius, 0, 2 * Math.PI);
  contex.fill();
  contex.closePath();
}

function createManyStars(count) {
  for (let i = 0; i < count; i++) {
    let posX = getRandomInt(0, canvas.clientWidth);
    let posY = getRandomInt(0, canvas.clientHeight);
    createStar(posX, posY);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// createManyStars(200);

class Star {

  constructor() {
    this.init();
  }

  init() {
    this.progress = 120;
    this.initialRadius = 12;
    this.radius = this.initialRadius;
    this.x = Math.random() * canvas.clientWidth;
    this.y = Math.random() * canvas.clientHeight;
  }

  draw() {
    contex.beginPath();
    contex.fillStyle = 'blue';
    contex.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    contex.fill();
    contex.closePath();
  }

  update() {
    if (this.progress > 0) {
      this.progress -= 1;
      this.radius = this.initialRadius * this.progress / 120 ;
      this.draw();
      console.log(this.progress);
    }
    else this.init();
  }
}

let stars = [];
for (let i = 0; i < 20; i++) {
  stars.push(new Star());
}


function loopStars() {
  contex.clearRect(0, 0, canvas.width, canvas.height);

    for (star of stars) {
      star.update();
      console.log(star);
    }
    requestAnimationFrame(loopStars);
}

// loopStars();

