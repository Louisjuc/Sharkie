let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio("./audio/maintheme.mp3"); 
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.5;

let clickSound = new Audio("./audio/click.mp3");
registerSound(backgroundMusic); // ÄNDERUNG
registerSound(clickSound); 
document.addEventListener("click", () => { 
  clickSound.currentTime = 0;
  clickSound.play();
});

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  backgroundMusic.play();
}

function startGame() {
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  init();
}

function restartGame() {
  stopGame();
  intervalIDs = [];
  level1 = createLevel1(); // NEU – unbedingt vor init() aufrufen
  init();
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("loseScreen").style.display = "none"; 
}

function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  gamePaused = isPortrait && window.innerWidth <= 760;
}
window.addEventListener("resize", checkOrientation);
checkOrientation();

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    event.preventDefault();
    keyboard.SPACE = true;
    
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
});


