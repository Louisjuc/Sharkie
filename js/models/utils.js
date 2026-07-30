let intervalIDs = [];

let MUTE_STORAGE_KEY = "sharkie.isMuted";
let allSounds = [];
let isMuted = false;

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
 * Queues an action on a sound so that play() and pause() never overlap.
 * Every call chains onto the previous one, which is what actually prevents
 * the AbortError instead of merely swallowing it.
 *
 * @param {HTMLAudioElement} sound - The audio element to operate on.
 * @param {Function} action - The playback action to run once the element is idle.
 * @returns {Promise<void>} Resolves when the queued action has settled.
 */
function queueSoundAction(sound, action) {
  if (!sound) return Promise.resolve();
  sound._playPromise = Promise.resolve(sound._playPromise)
    .catch(() => {})
    .then(action)
    .catch((error) => {
      if (error.name !== "AbortError") console.error(error);
    });
  return sound._playPromise;
}

/**
 * Restarts a sound from the beginning without racing a pending play() promise.
 *
 * @param {HTMLAudioElement} sound - The audio element to play.
 * @returns {Promise<void>} Resolves once playback has started.
 */
function playSound(sound) {
  return queueSoundAction(sound, () => {
    sound.pause();
    sound.currentTime = 0;
    return sound.play();
  });
}

/**
 * Stops a single sound and resets its playback position.
 *
 * @param {HTMLAudioElement} sound - The audio element to stop.
 * @returns {Promise<void>} Resolves once the sound has been stopped.
 */
function stopSound(sound) {
  return queueSoundAction(sound, () => {
    sound.pause();
    sound.currentTime = 0;
  });
}

/**
 * Stops all registered sounds and resets their playback position.
 * @returns {void}
 */
function stopAllSounds() {
  allSounds.forEach((sound) => stopSound(sound));
}

/**
 * Plays the click sound on button clicks.
 *
 * @param {MouseEvent} event - The click event emitted by the browser.
 */
document.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;
  playSound(clickSound);
});

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
