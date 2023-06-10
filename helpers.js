// HELPER FUNCTIONS

// DRAW START SCREEN
function startScreen() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.font = "30px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("After Choosing Your Level Press SPACE to Begin!", 100, 300);

  circles = [];
  rects = [];
  hitCount = 0;
  missCount = 0;
}

// GAME LOGIC
function gameLogic() {
  updateTimer();
  movePlayer();
  // checkGameOver();
}

// MOVE PLAYER
function movePlayer() {
  if (keyPressed["ArrowLeft"]) {
    player.x += -player.speed;
  } else if (keyPressed["ArrowRight"]) {
    player.x += player.speed;
  }

  if (keyPressed["ArrowUp"]) {
    player.y += -player.speed;
  } else if (keyPressed["ArrowDown"]) {
    player.y += player.speed;
  }
}

// // CHECK GAME OVER
// function checkGameOver() {
//   // Game over if player leaves canvas
//   if (
//     player.x < 0 ||
//     player.x + player.w > cnv.width ||
//     player.y < 0 ||
//     player.y + player.h > cnv.height
//   ) {
//     state = "gameover";
//   }
// }

// DRAW GAME SCREEN
function gameScreen() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

// GAME OVER SCREEN
function gameOver() {
  // Background
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Game Over Text
  ctx.font = "48px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", 100, 300);

  ctx.font = "24px Calibri";
  ctx.fillText("Press SPACE to return to Start Screen.", 100, 350);
}

// RESET VARIABLES
function reset() {
  state = "start";
  player = {
    x: 388,
    y: 288,
    w: 25,
    h: 25,
    color: "blue",
    speed: 5,
  };
}

// Update the Timer 
function updateTimer(){
  let currentTime = new Date().getTime();
  let elapsedSec = Math.floor((currentTime - startTime) / 1000);
  let remainingSec = levelDuration - elapsedSec;

  if (remainingSec >= 0) {
    timer.innerHTML = remainingSeconds;
  } else {
    state = "gameover";
    clearInterval(timerInterval);
    cnv.removeEventListener("click", handleClick);
  }
}


function handleClick(event) {
  let rect = cnv.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let hitTarget = false;
  for (let i = 0; i < circles.length; i++) {
    if (isInsideCircle(x, y, circles[i])) {
      hitTarget = true;
      targets.splice(i, 1);
      hitCount++;
    }
  }
}


function moveCircles(){
  for (let i = 0; i < circles.length; i++){
    circles[i].x += circles[i].dx;
    circles[i].y += circles[i].dy;

    if (circles[i].x + circles[i].radius > cnv.width || circles[i].x - circles[i].radius < 0){
      circles[i].dx = -circles[i].dx;
    }
    if (circles[i].y + circles[i].radius > cnv.height || circles[i].y - circles[i].radius < 0){
      circles[i].dx = -circles[i].dy;
    }
  }
}

function moveRects(){
  for (let i = 0; i <rects.length; i++){
    rects[i].x += rects[i].dx;
    rects[i].y += rects[i].dy;

    if (rects[i].x + rects[i].width > cnv.width || rects[i].x < 0){
      rects[i].dx = -rects[i].dx;
    }
    if (rects[i].y + rects[i].height > cnv.height || rects[i].y < 0){
      rects[i].dy = -rects[i].dy;
    }
  }
}

function generateCircles(){
  for (let i = 0; i < circles.length; i++) {
    ctx.beginPath();
    ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2 * Math.PI);
    ctx.fillStyle = circles[i].color;
    ctx.fill();
    ctx.closePath();
  }
}

function generateRects(){
  for (let i = 0; i < rects.length; i++) {
    ctx.beginPath();
    ctx.rect(rects[i].x, rects[i].y, rects[i].width, rects[i].height);
    ctx.fillStyle = rects[i].color;
    ctx.fill();
    ctx.closePath();
  }
}