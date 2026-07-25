/**
 * Health bar for the Endboss, shown once the boss is introduced.
 */
class EndbossStatusbar extends drawableObject {
  IMAGES_HEALTH = [
    "./img/4. Marcadores/Purple/life/100_ .png",
    "./img/4. Marcadores/Purple/life/80_ .png",
    "./img/4. Marcadores/Purple/life/60_ .png",
    "./img/4. Marcadores/Purple/life/40_ .png",
    "./img/4. Marcadores/Purple/life/20__1.png",
    "./img/4. Marcadores/Purple/life/0_ .png",
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 420;
    this.y = 0;
    this.width = 200;
    this.height = 55;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage >= 100) return 0;
    else if (this.percentage > 80) return 1;
    else if (this.percentage > 60) return 2;
    else if (this.percentage > 40) return 3;
    else if (this.percentage > 20) return 4;
    else return 5;
  }
}