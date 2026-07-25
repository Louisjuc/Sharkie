class Bubble extends moveableObject {
  height = 35;
  width = 35;
  speed = 12;
  direction = 1;
  damage = 5;

  constructor(images, direction, startX, startY, damage = 5) {
    super();
    this.IMAGES_BUBBLE = images;
    this.direction = direction;
    this.damage = damage;
    this.loadImages(this.IMAGES_BUBBLE);
    this.width = 35;
    this.height = 35;
    this.x = startX;
    this.y = startY + 6;
    this.img = this.imageCache[this.IMAGES_BUBBLE[0]];
  }

  move() {
    this.x += this.speed * this.direction;
  }
}
