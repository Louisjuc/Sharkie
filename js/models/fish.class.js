class Fish extends moveableObject {
  energy = 20;
  opacity = 1;
  offset = {
    top: 25,
    left: 20,
    right: 20,
    bottom: 25,
  };
  /**
   * Swimming animation frames.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];
  /**
   * Death animation frames.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
    "./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
  ];
  /**
   * Places the fish at a random position with a randomized speed.
   */
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
  /**
   * Plays the dead animation or the swim animation depending on state.
   * @returns {void}
   */
  handleAnimationState() {
    if (this.isDead()) {
      this.handleDead();
      return;
    }
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
}