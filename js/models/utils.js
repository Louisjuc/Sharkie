let intervalIDs = []; 

function setStoppableInterval(fn, time) { 
  let id = setInterval(fn, time);
  intervalIDs.push(id);
  return id;
}

let allSounds = [];
let isMuted = false;

function stopGame() {
  intervalIDs.forEach(clearInterval);
}

function registerSound(sound) { // ÄNDERUNG
  allSounds.push(sound);
}

function toggleMute() {
  isMuted = !isMuted;
  allSounds.forEach(sound => (sound.muted = isMuted)); // ÄNDERUNG
  return isMuted;
}

function handleMuteClick() {
  let muted = toggleMute();
  document.getElementById("muteBtn").textContent = muted ? "Unmute" : "Mute";
}

