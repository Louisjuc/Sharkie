class Bubble extends moveableObject {
  height = 35;
  width = 35;
  speed = 12;
  direction = 1;
  damage = 5;
  /**
   * Image used for poisoned bubbles.
   * @type {string[]}
   */
  static IMAGES_POISONED = ["./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"];
  /**
   * Creates a bubble at the given position moving in the given direction.
   * @param {number} direction - 1 for right, -1 for left.
   * @param {number} startX
   * @param {number} startY
   * @param {boolean} [poisoned=false]
   */
  constructor(direction, startX, startY, poisoned = false) {
    super();
    this.direction = direction;
    this.damage = poisoned ? 15 : 5;
    this.IMAGES_BUBBLE = poisoned ? Bubble.IMAGES_POISONED : Bubble.IMAGES_NORMAL;
    this.loadImages(this.IMAGES_BUBBLE);
    this.x = startX;
    this.y = startY + 6;
    this.img = this.imageCache[this.IMAGES_BUBBLE[0]];
  }
  /**
   * Moves the bubble horizontally based on its speed and direction.
   * @returns {void}
   */
  move() {
    this.x += this.speed * this.direction;
  }
}