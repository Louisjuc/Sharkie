let intervalIDs = [];

let MUTE_STORAGE_KEY = "sharkie.isMuted";
let allSounds = [];
let isMuted = false;
try {
  isMuted = localStorage.getItem(MUTE_STORAGE_KEY) === "true";
} catch (error) {
  console.warn("Could not read mute state from localStorage", error);
}

/**
 * Starts an interval and stores its ID so it can be stopped later.
 *
 * @param {Function} fn - The callback to execute on each interval tick.
 * @param {number} time - The interval delay in milliseconds.
 * @returns {number} The ID of the created interval.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
  return id;
}

/**
 * Applies the current mute state to all registered sounds and updates the button label.
 */
function applyMuteState() {
  allSounds.forEach((sound) => {
    if (sound) sound.muted = isMuted;
  });
  let muteButton = document.getElementById("muteBtn");
  if (muteButton) {
    muteButton.textContent = isMuted ? "Unmute" : "Mute";
  }
}

/**
 * Stops all registered sounds and resets their playback position.
 * @returns {void}
 */
function stopAllSounds() {
  allSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
}

/**
 * Clears all tracked game intervals.
 */
function stopGame() {
  intervalIDs.forEach(clearInterval);
}

/**
 * Registers a sound object so it can be toggled with the global mute state.
 *
 * @param {HTMLAudioElement} sound - The audio element to register.
 */
function registerSound(sound) {
  if (!allSounds.includes(sound)) {
    allSounds.push(sound);
  }
  sound.muted = isMuted;
}

/**
 * Toggles the global mute state and applies it to all registered sounds.
 *
 * @returns {boolean} The new mute state.
 */
function toggleMute() {
  isMuted = !isMuted;

  try {
    localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
  } catch (error) {
    console.warn("Could not save mute state to localStorage", error);
  }

  applyMuteState();
  return isMuted;
}

/**
 * Handles the mute button click by toggling the audio state and updating the button label.
 */
function handleMuteClick() {
  toggleMute();
}

applyMuteState();

/**
 * Requests fullscreen mode for the configured fullscreen element.
 */
function Fullscreen() {
  let Fullscreen = document.getElementById("fullscreen");
  enterFullscreen(Fullscreen);
}

/**
 * Requests fullscreen mode for the given element using the available browser APIs.
 *
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode using the browser-specific exit API.
 */
function exitFullscreen() {
  console.log("exit");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
