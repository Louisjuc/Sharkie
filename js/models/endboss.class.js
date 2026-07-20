class Endboss extends moveableObject {
  height = 400;
  width = 400;
  y = 0;

  IMAGES_WALKING = [
    "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2100;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
