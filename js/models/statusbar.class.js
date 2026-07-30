class Statusbar extends drawableObject {
  /**
   * Health bar images from full to empty.
   * @type {string[]}
   */
  IMAGES_HEALTH = [
    "./img/4. Marcadores/Purple/life/100_ .png",
    "./img/4. Marcadores/Purple/life/80_ .png",
    "./img/4. Marcadores/Purple/life/60_ .png",
    "./img/4. Marcadores/Purple/life/40_ .png",
    "./img/4. Marcadores/Purple/life/20__1.png",
    "./img/4. Marcadores/Purple/life/0_ .png",
  ];
  percentage = 100;

  /**
   * Initializes the status bar with full health.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 20;
    this.y = 0;
    this.width = 240;
    this.height = 55;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage and updates the displayed image.
   * @param {number} percentage
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
