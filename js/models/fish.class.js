class Fish extends moveableObject {
  energy = 20;
  opacity = 1;

  offset = {
    top: 15,
    left: 5,
    right: 15,
    bottom: 15,
  };
  IMAGES_WALKING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
  ];

  constructor() {
    super().loadImage(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    );
    this.x = 400 + Math.random() * 2300;
    this.speed = 0.15 + Math.random() * 0.25;
    this.height = 90;
    this.width = 90;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    this.moveLeft();

    setStoppableInterval(() => {
      if (this.isDead()) {
        if (!this.deadAnimationPlayed) {
          this.playAnimation(this.IMAGES_DEAD);

          if (this.currentImage >= this.IMAGES_DEAD.length) {
            this.deadAnimationPlayed = true;
          }
        }
        if (this.deadAnimationPlayed) {
          this.opacity -= 0.05;
          this.y += 20;
          this.x -= 10;

          if (this.opacity < 0) {
            this.opacity = 0;
          }
        }

        return;
      }

      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
