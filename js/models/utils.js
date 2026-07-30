let intervalIDs = [];

let MUTE_STORAGE_KEY = "sharkie.isMuted";
let allSounds = [];
let isMuted = localStorage.getItem(MUTE_STORAGE_KEY) === "true";
let pendingAutoplaySounds = new Set();

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
 * Starts every sound the browser previously refused to autoplay. Runs on the
 * first user interaction, which is the moment playback becomes allowed.
 * @returns {void}
 */
function retryPendingAutoplaySounds() {
  let pending = [...pendingAutoplaySounds];
  pendingAutoplaySounds.clear();
  pending.forEach((sound) => playSound(sound));
}

/**
 * Recovers a sound that was blocked by the autoplay policy by replaying it on
 * the next user interaction. Only looping sounds qualify: replaying a one-shot
 * effect seconds after the event it belonged to would be worse than silence.
 *
 * @param {HTMLAudioElement} sound - The sound the browser refused to play.
 * @returns {void}
 */
function recoverFromBlockedAutoplay(sound) {
  if (!sound.loop) return;
  pendingAutoplaySounds.add(sound);
  document.addEventListener("pointerdown", retryPendingAutoplaySounds, {
    once: true,
  });
  document.addEventListener("keydown", retryPendingAutoplaySounds, {
    once: true,
  });
}

/**
 * Reports a playback failure and recovers where a recovery exists. An
 * AbortError is expected whenever a running sound is restarted and is ignored.
 * Blocked autoplay is retried on the next interaction. A file that cannot be
 * decoded is unrecoverable, so the sound is disabled instead of retried.
 *
 * @param {HTMLAudioElement} sound - The audio element that failed to play.
 * @param {Error} error - The reason the playback action rejected.
 * @returns {void}
 */
function handleSoundError(sound, error) {
  if (error?.name === "AbortError") return;
  if (error?.name === "NotAllowedError") {
    console.warn("Autoplay blocked, retrying after user interaction");
    console.warn("Could not play sound", sound.src);
    recoverFromBlockedAutoplay(sound);
    return;
  }
  sound._playbackDisabled = true;
  console.error("Error playing sound", error);
  console.error("Could not play sound, disabling it", sound.src);
}

/**
 * Queues an action on a sound so that play() and pause() never overlap.
 * Every call chains onto the previous one, which is what actually prevents
 * the AbortError instead of merely swallowing it.
 *
 * Sounds whose file turned out to be unplayable are skipped entirely.
 *
 * @param {HTMLAudioElement} sound - The audio element to operate on.
 * @param {Function} action - The playback action to run once the element is idle.
 * @returns {Promise<void>} Resolves when the queued action has settled.
 */
function queueSoundAction(sound, action) {
  if (!sound || sound._playbackDisabled) return Promise.resolve();
  let previous = sound._playPromise;
  sound._playPromise = (async () => {
    try {
      await previous;
      await action();
    } catch (error) {
      handleSoundError(sound, error);
    }
  })();
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
 * Persists the current mute state so it survives a page reload.
 * @returns {void}
 */
function saveMuteState() {
  localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
}

/**
 * Toggles the global mute state, persists it, and applies it to all sounds.
 *
 * @returns {boolean} The new mute state.
 */
function toggleMute() {
  isMuted = !isMuted;
  saveMuteState();
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
