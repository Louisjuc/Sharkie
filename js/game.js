let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio("./audio/maintheme.mp3"); 
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.5;

let clickSound = new Audio("./audio/click.mp3");
registerSound(clickSound);
registerSound(backgroundMusic);

/**
 * Plays the click sound when a button is activated.
 *
 * @param {MouseEvent} event - The click event emitted by the browser.
 */
document.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
});

/**
 * Initializes the game world and starts the background music.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  backgroundMusic.play().catch(() => {});
}

/**
 * Hides the start and win screens and begins the game.
 */
function startGame() {
  stopGame();
  intervalIDs = [];
  level1 = createLevel1();
  init();
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("loseScreen").style.display = "none";
}

/**
 * Restarts the game by stopping the current loop, resetting the level, and initializing a new world.
 */
function restartGame() {
  stopGame();
  intervalIDs = [];
  level1 = createLevel1();
  init();
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("loseScreen").style.display = "none"; 
}

/**
 * Stops the current game and returns to the start menu.
 */
function goHome() {
  stopGame();
  intervalIDs = [];
  document.getElementById("loseScreen").style.display = "none";
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("startScreen").style.display = "flex";
}

/**
 * Displays the lose screen overlay.
 * @returns {void}
 */
function showLoseScreen() {
   stopAllSounds();
  document.getElementById("loseScreen").style.display = "flex";
}

/**
 * Checks whether the device is in portrait mode and pauses the game in narrow layouts.
 */
function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  gamePaused = isPortrait && window.innerWidth <= 760;
}
window.addEventListener("resize", checkOrientation);
checkOrientation();

/**
 * Updates the keyboard state for pressed movement keys.
 *
 * @param {KeyboardEvent} event - The keydown event.
 */
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
  if (event.keyCode == 68 || event.key.toLowerCase() === "d") {
    event.preventDefault();
    keyboard.D = true;
  }
});

/**
 * Resets the keyboard state when movement keys are released.
 *
 * @param {KeyboardEvent} event - The keyup event.
 */
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
  if (event.keyCode == 68 || event.key.toLowerCase() === "d") {
    keyboard.D = false;
  }
});


