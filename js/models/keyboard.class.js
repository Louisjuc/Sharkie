class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  
  /**
   * Bind on-screen touch buttons to the keyboard state.
   * @returns {void}
   */
  bindBtnPressEvents() {
    this.bindTouchBtn("btnLeft", "LEFT");
    this.bindTouchBtn("btnRight", "RIGHT");
    this.bindTouchBtn("btnUp", "UP");
    this.bindTouchBtn("btnDown", "DOWN");
    this.bindTouchBtn("btnAtk", "SPACE");
    this.bindTouchBtn("btnBubble", "D");
  }
  
  /**
   * Binds touchstart and touchend listeners for a single touch button.
   * @param {string} btnId
   * @param {string} key
   * @returns {void}
   */
  bindTouchBtn(btnId, key) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    this.bindTouchStart(btn, key);
    this.bindTouchEnd(btn, key);
  }
  
  /**
   * Binds a touchstart listener that sets the given key to true.
   * @param {HTMLElement} btn
   * @param {string} key
   * @returns {void}
   */
  bindTouchStart(btn, key) {
    btn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this[key] = true;
      },
      { passive: false },
    );
  }
  
  /**
   * Binds a touchend listener that sets the given key to false.
   * @param {HTMLElement} btn
   * @param {string} key
   * @returns {void}
   */
  bindTouchEnd(btn, key) {
    btn.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this[key] = false;
      },
      { passive: false },
    );
  }
}
