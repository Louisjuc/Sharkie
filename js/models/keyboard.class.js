class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;

  bindBtnPressEvents() {
    document
      .getElementById("btnLeft")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.LEFT = true;
      });

    btnLeft.addEventListener("touchend", (event) => {
      event.preventDefault();
      this.LEFT = false;
    });

    document
      .getElementById("btnRight")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.RIGHT = true;
      });

    btnRight.addEventListener("touchend", (event) => {
      event.preventDefault();
      this.RIGHT = false;
    });

    document.getElementById("btnUp").addEventListener("touchstart", (event) => {
      event.preventDefault();
      this.UP = true;
    });

    btnUp.addEventListener("touchend", (event) => {
      event.preventDefault();
      this.UP = false;
    });

    document
      .getElementById("btnDown")
      .addEventListener("touchstart", (event) => {
        event.preventDefault();
        this.DOWN = true;
      });

    btnUp.addEventListener("touchend", (event) => {
      event.preventDefault();
      this.DOWN = false;
    });

document.getElementById("btnAtk").addEventListener("touchstart", (event) => {
  event.preventDefault();
  this.SPACE = true;
});

document.getElementById("btnAtk").addEventListener("touchend", (event) => {
  event.preventDefault();
  this.SPACE = false;
});
  }
}
