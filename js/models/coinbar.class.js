class Coinbar extends drawableObject {

  IMAGES_COIN = [
    "../img/4. Marcadores/Purple/coin/100__1.png",
    "../img/4. Marcadores/Purple/coin/80_ _1.png",
    "../img/4. Marcadores/Purple/coin/60_ _1.png",
    "../img/4. Marcadores/Purple/coin/40_ _1.png",
    "../img/4. Marcadores/Purple/coin/20_ .png",
    "../img/4. Marcadores/Purple/coin/0_ _1.png",
  ];

  collected = 0; // NEU – aktuell eingesammelte Münzen
  total = 5; // NEU – Gesamtanzahl Münzen im Level

  constructor(total = 5) {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.x = 20;
    this.y = 60;
    this.width = 200;
    this.height = 50;
    this.total = total;
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  // NEU – zählt eine Münze hoch und berechnet den Prozentwert neu
  addCoin() {
    this.collected++;
    this.setPercentage((this.collected / this.total) * 100);
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
}