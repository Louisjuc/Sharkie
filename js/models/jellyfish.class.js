class Jellyfish extends moveableObject {
  
  /**
   * Swimming animation frames.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "./img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];
  
  /**
   * Death animation frames.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "./img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];
  
  /**
   * Places the jellyfish at a random position with a randomized speed.
   */
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
  
  /**
   * Plays the dead animation or the bobbing swim animation depending on state.
   * A lethal hit holds the swim frames for the short hurt flash before dying.
   * @returns {void}
   */
  handleAnimationState() {
    if (this.isReadyToDie()) {
      this.handleDead();
      return;
    }
    if (!this.isDead()) this.bobUpAndDown();
    this.playAnimation(this.IMAGES_WALKING);
  }
  
  /**
   * Starts leftward movement and the recurring animation interval.
   * @returns {void}
   */
  animate() {
    this.moveLeft();
    this.startY = this.y;
    this.direction = 1;
    setStoppableInterval(() => {
      this.handleAnimationState();
    }, 100);
  }
  
  /**
   * Moves the jellyfish up and down in a bobbing motion.
   * @returns {void}
   */
  bobUpAndDown() {
    this.y += this.direction * 1.5;
    if (this.y > this.startY + 30 || this.y < this.startY - 30) {
      this.direction *= -1;
    }
  }
}