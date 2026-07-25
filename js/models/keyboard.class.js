class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;

  bindBtnPressEvents() {
    this.bindTouchBtn("btnLeft", "LEFT");
    this.bindTouchBtn("btnRight", "RIGHT");
    this.bindTouchBtn("btnUp", "UP");
    this.bindTouchBtn("btnDown", "DOWN");
    this.bindTouchBtn("btnAtk", "SPACE");
  }

// Binds touch events to a button and updates the corresponding key state
  bindTouchBtn(btnId, key) {
    const btn = document.getElementById(btnId);
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this[key] = true;
    }, { passive: false }); 
    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this[key] = false;
    }, { passive: false });
  }
}