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

function registerSound(sound) {
  allSounds.push(sound);
}

function toggleMute() {
  isMuted = !isMuted;
  allSounds.forEach(sound => (sound.muted = isMuted));
  return isMuted;
}

function handleMuteClick() {
  let muted = toggleMute();
  document.getElementById("muteBtn").textContent = muted ? "Unmute" : "Mute";
}

function Fullscreen() {
  let Fullscreen = document.getElementById('fullscreen');
  enterFullscreen(Fullscreen);
}

function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() { console.log('exit');
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

