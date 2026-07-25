class Jellyfish extends moveableObject {
  energy = 20;
  opacity = 1;

  offset = {
    top: 25,
    left: 20,
    right: 20,
    bottom: 25,
  };
  
  IMAGES_WALKING = [
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  IMAGES_DEAD = [
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  constructor() {
    super().loadImage("./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.x = 700 + Math.random() * 2300;
    this.y = 100 + Math.random() * 400;
    this.speed = 0.8 + Math.random() * 0.25;
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
    this.bobUpAndDown();
    this.playAnimation(this.IMAGES_WALKING);
  }

  animate() {
    this.moveLeft();
    this.startY = this.y;
    this.direction = 1;
    setStoppableInterval(() => {
      this.handleAnimationState();
    }, 100);
  }

// Moves the jellyfish up and down in a bobbing motion
  bobUpAndDown() {
    this.y += this.direction * 1.5;
    if (this.y > this.startY + 30 || this.y < this.startY - 30) {
      this.direction *= -1;
    }
  }
}
