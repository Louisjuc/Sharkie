class Statusbar extends drawableObject {
  IMAGES_HEALTH = [
    "img/4. Marcadores/Purple/life/100_ .png",
    "img/4. Marcadores/Purple/life/80_ .png",
    "img/4. Marcadores/Purple/life/60_ .png",
    "img/4. Marcadores/Purple/life/40_ .png",
    "img/4. Marcadores/Purple/life/20_1 .png",
    "img/4. Marcadores/Purple/life/0_ .png",
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 20;
    this.y = 0;
    this.width = 300;
    this.height = 80;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 0; // NEU
    } else if (this.percentage > 80) {
      return 1; // NEU
    } else if (this.percentage > 60) {
      return 2; // NEU
    } else if (this.percentage > 40) {
      return 3; // NEU
    } else if (this.percentage > 20) {
      return 4; // NEU
    } else {
      return 5; // NEU
    }
  }
}
