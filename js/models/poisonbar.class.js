class Poisonbar extends drawableObject {

  IMAGES_POISON = [
    "img/4. Marcadores/Purple/poison/100_.png",
    "img/4. Marcadores/Purple/poison/80_.png",
    "img/4. Marcadores/Purple/poison/60_.png",
    "img/4. Marcadores/Purple/poison/40_.png",
    "img/4. Marcadores/Purple/poison/20_.png",
    "img/4. Marcadores/Purple/poison/0_.png",
  ];

  collected = 0; // NEU – aktuell eingesammelte Münzen
  total = 5; // NEU – Gesamtanzahl Münzen im Level

  constructor(total = 5) {
    super();
    this.loadImages(this.IMAGES_POISON);
    this.x = 180;
    this.y = 70;
    this.width = 130;
    this.height = 35;
    this.total = total;
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_POISON [this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage > 80) {
      return 1;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }

addPoison() {
  this.collected++;                                    // NEU
  let percentage = (this.collected / this.total) * 100; // NEU
  this.setPercentage(Math.min(percentage, 100));         // NEU
}
}