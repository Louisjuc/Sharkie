/**
 * Simple keyboard/touch input wrapper used by the World and Character.
 */
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
   * Binds touch events to a button and updates the corresponding key state.
   * @param {string} btnId - The DOM id of the button element.
   * @param {string} key - The key name to set (e.g. 'LEFT').
   * @returns {void}
   */
  bindTouchBtn(btnId, key) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this[key] = true;
      },
      { passive: false }
    );

    btn.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this[key] = false;
      },
      { passive: false }
    );
  }

}