class Poisonbar extends drawableObject {
  /**
   * Poison bar images from full to empty.
   * @type {string[]}
   */
  IMAGES_POISON = [
    "./img/4. Marcadores/Purple/poison/100_.png",
    "./img/4. Marcadores/Purple/poison/80_.png",
    "./img/4. Marcadores/Purple/poison/60_.png",
    "./img/4. Marcadores/Purple/poison/40_.png",
    "./img/4. Marcadores/Purple/poison/20_.png",
    "./img/4. Marcadores/Purple/poison/0_.png",
  ];
  collected = 0;
  total = 5;
  /**
   * Initializes the poison bar with no poison collected.
   * @param {number} [total=5] - Maximum amount of poison that can be collected.
   */
  constructor(total = 5) {
    super();
    this.loadImages(this.IMAGES_POISON);
    this.x = 20;
    this.y = 85;
    this.width = 240;
    this.height = 60;
    this.total = total;
    this.setPercentage(0);
  }
  /**
   * Returns true if at least one poison unit is currently collected.
   * @returns {boolean}
   */
  hasPoison() {
    return this.collected > 0;
  }
  /**
   * Consumes one unit of poison and updates the displayed percentage.
   * @returns {void}
   */
  usePoison() {
    if (this.collected <= 0) return;
    this.collected--;
    this.setPercentage((this.collected / this.total) * 100);
  }
  /**
   * Sets the poison percentage and updates the displayed image.
   * @param {number} percentage
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_POISON[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  /**
   * Adds one unit of poison, capped at the maximum total.
   * @returns {void}
   */
  addPoison() {
    this.collected = Math.min(this.collected + 1, this.total);
    let percentage = (this.collected / this.total) * 100;
    this.setPercentage(Math.min(percentage, 100));
  }
  /**
   * Returns true if the maximum amount of poison has been collected.
   * @returns {boolean}
   */
  isFull() {
    return this.collected >= this.total;
  }
}