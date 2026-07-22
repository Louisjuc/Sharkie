class Coin extends moveableObject {
  IMAGES_COIN = [
    "./img/4. Marcadores/1. Coins/1.png",
    "./img/4. Marcadores/1. Coins/2.png",
    "./img/4. Marcadores/1. Coins/3.png",
    "./img/4. Marcadores/1. Coins/4.png",
  ];

  offset = { top: 10, left: 10, right: 10, bottom: 10 }; 

  constructor() {
    super().loadImage(this.IMAGES_COIN[0]);
    this.x = 400 + Math.random() * 2700;
    this.y = 0 + Math.random() * 400; 
    this.height = 40;
    this.width = 40;
    this.loadImages(this.IMAGES_COIN);
    this.animate();
  }

  animate() {
    setStoppableInterval(() => { 
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
  }
}