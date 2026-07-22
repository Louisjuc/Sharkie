let intervalIDs = []; // NEU

function setStoppableInterval(fn, time) { // NEU
  let id = setInterval(fn, time);
  intervalIDs.push(id);
  return id;
}

function stopGame() { // NEU
  intervalIDs.forEach(clearInterval);
}