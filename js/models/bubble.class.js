class Bubble extends moveableObject {
  height = 35;
  width = 35;
  speed = 12;
  direction = 1;
  damage = 5;

  static IMAGES_NORMAL = ["./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"];
  static IMAGES_POISONED = ["./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"];
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

  move() {
    this.x += this.speed * this.direction;
  }
}