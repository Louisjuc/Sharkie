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
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  IMAGES_DEAD = [
    "./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
  ];

  constructor() {
    super().loadImage(
      "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    );
    this.x = 400 + Math.random() * 2300;
    this.speed = 0.5 + Math.random() * 0.25;
    this.height = 90;
    this.width = 90;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  handleAnimationState() {
    if (this.isDead()) {
      this.handleDead();
      return;
    }
    this.playAnimation(this.IMAGES_WALKING); // ANPASSEN: exakter Array-Name
}

 animate() {
    this.moveLeft();
    this.startY = this.y;
    this.direction = 1;
    setStoppableInterval(() => {
      this.handleAnimationState();
    }, 100);
  }
}
