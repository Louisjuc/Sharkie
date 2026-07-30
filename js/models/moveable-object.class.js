class moveableObject extends drawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 20;
  lastHit = 0;
  opacity = 1;
  hurtSound = new Audio("./audio/hurt.mp3");
  offset = {
    top: 25,
    left: 20,
    right: 20,
    bottom: 25,
  };

  /**
   * Initializes the movable object and registers its hurt sound.
   */
  constructor() {
    super();
    registerSound(this.hurtSound);
    this.hurtSound.volume = 0.3;
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
  hit(damage = 20) {
    if (this.isDead()) return;
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
    playSound(this.hurtSound);
  }

  /**
   * Whether this object may currently deal contact damage to the character.
   * Subclasses can restrict this while they are not fully active yet.
   *
   * @returns {boolean} True unless a subclass overrides it.
   */
  canDealDamage() {
    return true;
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
   * True once the death animation may take over. A lethal hit still plays its
   * hurt reaction first, so even a one-shot kill stays visible as a hit.
   *
   * @returns {boolean} True if the object is dead and no longer hurt.
   */
  isReadyToDie() {
    return this.isDead() && !this.isHurt();
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
