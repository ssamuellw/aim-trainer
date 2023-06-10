// JS GAME SKELETON

// CANVAS SETUP
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Output variables
let level = document.getElementById("level");
let timer = document.getElementById("timer");
let hits = document.getElementById("hits");
let misses = document.getElementById("misses");
let accuracy = document.getElementById("accuracy");
let timerInterval;
let hitCount = 0;
let missCount = 0;
let startTime;
let levelDuration = 20;
let currentLvl = 0;

// GLOBAL VARIABLES
let circles = [];
let rects = [];
let state = "start";
let player = {
  x: 388,
  y: 288,
  w: 25,
  h: 25,
  color: "blue",
  speed: 5,
};
let levels = [
{ name: "easy", circleSize: 20, rectSize: 30, circleSpeed: 1, rectSpeed: 1 },
{ name: "medium", circleSize: 15, rectSize: 20, circleSpeed: 2, rectSpeed: 2 },
{ name: "hard", circleSize: 10, rectSize: 15, circleSpeed: 3, rectSpeed: 3 }
];

// START DRAW FUNCTION ON PAGE LOAD
window.addEventListener("load", draw);

function draw() {
  // GAME STATE
  if (state === "start") {
    startScreen();
  } else if (state === "running") {
    gameLogic();
    gameScreen();
  } else if (state === "gameover") {
    gameOver();
  }

  // REDRAW
  requestAnimationFrame(draw);
}


// Create Circles and Rects

function createCircles(count, size, speed) {
  for (let i = 0; i < count; i++){
    let circle = {
      x: Math.random() * (cnv.width - size * 2) + size,
      y: Math.random() * (cnv.height - size * 2) + size,
      radius: size,
      dx: (Math.random() - 0.5) * speed,
      dy: (Math.random() - 0.5) * speed,
      color: randomRGB()
    };
    circles.push(circle[i]);
  }
}

function createRects(count, size, speed){
  for (let i = 0; i < count; i++){
    let rect = {
      x: Math.random() * (cnv.width - size),
      y: Math.random() * (cnv.height - size),
      width: size,
      height: size,
      dx: (Math.random() - 0.5) * speed,
      dy: (Math.random() - 0.5) * speed,
      color: "#FF0000"
    };
    rects.push(rect);
  }
}

// EVENT STUFF

// KEYDOWN EVENT
document.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
  if (state === "start" && e.code === "Space") {
    state = "running";
  } else if (state === "gameover" && e.code === "Space") {
    reset();
  }
}
