let canvas;
let world;
let gameOver = false;
let gamePaused = false;
let keyboard = new Keyboard();
let backgroundMusic = new Audio("./audio/maintheme.mp3"); 
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.5;
let clickSound = new Audio("./audio/click.mp3");
registerSound(clickSound);
registerSound(backgroundMusic);

/**
 * Initializes the game world and starts the background music.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  playSound(backgroundMusic);
}

/**
 * Hides the start and win screens and begins the game.
 */
function startGame() {
  gameOver = false;
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
  gameOver = false;
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
  gameOver = true;
  stopGame(); 
  stopAllSounds();
  document.getElementById("loseScreen").style.display = "flex";
}

/**
 * Checks whether the device is in portrait mode and pauses the game in narrow layouts.
 */
function checkOrientation() {
  let isPortrait = window.innerHeight > window.innerWidth;
  gamePaused = isPortrait && window.innerWidth <= 760;
}
window.addEventListener("resize", checkOrientation);
checkOrientation();

/**
 * Maps physical keys to keyboard state properties.
 */
let KEY_MAP = {
  ArrowRight: "RIGHT",
  ArrowLeft: "LEFT",
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  Space: "SPACE",
  KeyD: "D",
};

/**
 * Updates the keyboard state for pressed movement keys.
 *
 * @param {KeyboardEvent} event - The keydown event.
 */
window.addEventListener("keydown", (event) => {
  let mapped = KEY_MAP[event.code]; 
  if (event.code === "Space") event.preventDefault();
  keyboard[mapped] = true;
});

/**
 * Resets the keyboard state when movement keys are released.
 *
 * @param {KeyboardEvent} event - The keyup event.
 */
window.addEventListener("keyup", (event) => {
  let mapped = KEY_MAP[event.code]; 
  if (mapped) keyboard[mapped] = false;
});


