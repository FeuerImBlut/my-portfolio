var canvas = $('canvas#bg')[0];

canvas.width = $(window).width();
canvas.height = $(window).height();

var ctx = canvas.getContext('2d');

$(window).on('resize', function () {
  canvas.width = $(window).width();
  canvas.height = $(window).height();
})

function Point() {
  // i keep forgetting what "this" refers to
  var p = this;

  var r = 3;

  // progress below 0 is neglected, negative initial
  // progress serves to introduce random delays - 
  // at 0.05 progress points per second, for example
  // a dot with initial progress -0.15 will run 2 frames
  // after a dot with initial progress -0.05
  var initialProgress = -2 * Math.random();

  // moves point to a random location and 
  // resets its progress
  this.init = function () {
    p.x = Math.random() * canvas.width;
    p.y = Math.random() * canvas.height;
    p.progress = initialProgress;
  }

  this.draw = function () {
    if (p.progress >= 0) {
      // opacity of of dot changes with progress
      ctx.fillStyle = 'rgba(255,255,255,' + Math.sqrt(p.progress * 0.2) + ')';
      ctx.beginPath();
      // radius calculation: maps progress from [0, 1] to [0, pi],
      // then takes sine of that to get an increase, then decrease
      // in radius. absolute value to prevent floating point errors
      // accidentally causing negative sine values which cause ctx.arc
      // to throw errors
      ctx.arc(p.x, p.y, Math.abs(Math.sin(Math.PI * p.progress) * r), 0, 2 * Math.PI);
      ctx.fill();
    }
  };
  this.render = function () {
    // stars come faster than they go
    // so user can look at them longer
    // i guess? idk this just looked pretty
    if (p.progress > 0.5)
      p.progress += 0.005;
    else
      p.progress += 0.05;
    p.draw();
    if (p.progress >= 1) p.init();
  }
}
var dots = [];

var n = 10;

for (var i = 0; i < n; i++) {
  dots[i] = new Point();
  dots[i].init();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < n; i++) {
    dots[i].render();
  }

  requestAnimationFrame(loop);
}

loop();