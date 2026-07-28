class moveableObject extends drawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 80;
  lastHit = 0;
  opacity = 1;
  hurtSound = new Audio("./audio/hurt.mp3");
  /**
   * Initializes the movable object and registers its hurt sound.
   */
  constructor() {
    super();
    registerSound(this.hurtSound);
    this.hurtSound.volume = 0.3;
  }
  /**
   * Applies gravity by updating the vertical position and speed over time.
   * @returns {void}
   */
  applyGravity() {
    setStoppableInterval(() => {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }
  /**
   * Checks whether this object collides with another movable object using their bounding boxes and offsets.
   * @param {moveableObject} mo - The other object to test collision against.
   * @returns {boolean} True if the objects overlap, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }
  /**
   * Reduces the object's energy, updates the last hit timestamp, and plays the hurt sound.
   * @returns {void}
   */
  hit(damage = 5) {
    if (this.isDead()) return; 
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    this.hurtSound.currentTime = 0;
    this.hurtSound.play().catch(() => {});
  }
  /**
   * Checks whether the object is currently in the hurt state.
   * @returns {boolean} True if the hurt period has not expired yet.
   */
  isHurt() {
    let timesspan = new Date().getTime() - this.lastHit;
    timesspan = timesspan / 1000;
    return timesspan < 0.3;
  }
  /**
   * Checks whether the object has no remaining energy.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy <= 0;
  }
  /**
   * Moves the object to the left at a regular interval.
   * @returns {void}
   */
  moveLeft() {
    setStoppableInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
  /**
   * Advances the animation to the next frame using the provided image list.
   * @param {string[]} images - The list of image paths to cycle through.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  /**
   * Handles the death animation by updating image frames and fading the object out.
   * @returns {void}
   */
  handleDead() {
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
  }
}
