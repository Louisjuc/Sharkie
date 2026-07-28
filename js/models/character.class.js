/**
 * Main playable character (Sharkie).
 * Handles movement, animations, attacks and bubble shooting.
 */
class Character extends moveableObject {
  height = 300;
  width = 300;
  speed = 10;
  isAttacking = false;
  isBubbleAttacking = false;
  bubbleSpawnScheduled = false;
  attackSound = new Audio("./audio/attack.mp3");
  lastBubbleAttack = 0;
  bubbleWasPressed = false;
  idleStartTime = 0;
  isSleeping = false;

  IMAGES_IDLE = CHARACTER_IMAGES.idle;
  IMAGES_WALKING = CHARACTER_IMAGES.walking;
  IMAGES_ATTACK = CHARACTER_IMAGES.attack;
  IMAGES_DEAD = CHARACTER_IMAGES.dead;
  IMAGES_HURT = CHARACTER_IMAGES.hurt;
  IMAGES_SLEEP = CHARACTER_IMAGES.sleep;
  IMAGES_BUBBLE_PROJECTILE = CHARACTER_IMAGES.bubbleProjectile;

  offset = {
    top: 160,
    left: 50,
    right: 50,
    bottom: 70,
  };

  world;

  /**
   * Initialize character images, sounds and start animations.
   */
  constructor() {
    super().loadImage("./img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_BUBBLE_PROJECTILE);
    this.attackSound.volume = 0.3;
    this.animate();
    registerSound(this.attackSound);
  }
  /**
   * Calculates spawn position, consumes poison, and schedules the bubble spawn.
   * @returns {void}
   */
  spawnBubbleProjectile() {
    let startX = this.getBubbleStartX();
    let startY = this.y + this.height / 2 + 25;
    this.world.poisonbar.usePoison();
    setTimeout(() => this.createBubble(startX, startY), 300);
  }
  /**
   * Creates a poisoned bubble at the given position and adds it to the world.
   * @param {number} startX
   * @param {number} startY
   * @returns {void}
   */
  createBubble(startX, startY) {
    let bubble = new Bubble(this.otherDirection ? -1 : 1, startX, startY, true);
    this.world.bubbles.push(bubble);
    if (!this.isBubbleAttacking) this.bubbleSpawnScheduled = false;
  }
  /**
   * Start recurring timers for movement, animation and idle checks.
   * @returns {void}
   */
  animate() {
    setStoppableInterval(() => this.handleMovement(), 1000 / 40);
    setStoppableInterval(() => this.handleCharacterAnimation(), 50);
    setStoppableInterval(() => this.handleIdleAnimation(), 200);
  }
  /**
   * Manage idle behaviour: switch to sleep animation after a long idle.
   * @returns {void}
   */
  handleIdleAnimation() {
    if (this.isDead() || this.isHurt() || this.isAttacking) return;
    if (this.isBubbleAttacking) return;

    if (!this.isMoving()) {
      this.updateIdleState();
    } else {
      this.resetIdleState();
    }
  }
  /**
   * Handles idle timer and decides between idle and sleep animation.
   * @returns {void}
   */
  updateIdleState() {
    if (this.idleStartTime === 0) {
      this.idleStartTime = Date.now();
    }
    let idleDuration = (Date.now() - this.idleStartTime) / 1000;
    if (idleDuration >= 15) {
      this.enterSleepState();
    } else {
      this.isSleeping = false;
      this.playAnimation(this.IMAGES_IDLE);
    }
  }
  /**
   * Switches character into sleep state and plays sleep animation.
   * @returns {void}
   */
  enterSleepState() {
    if (!this.isSleeping) {
      this.isSleeping = true;
      this.currentImage = 0;
    }
    this.playAnimation(this.IMAGES_SLEEP);
  }
  /**
   * Resets idle timer and sleep state, e.g. when character starts moving.
   * @returns {void}
   */
  resetIdleState() {
    this.idleStartTime = 0;
    this.isSleeping = false;
  }
  /**
   * Update character position based on input and apply camera follow.
   * @returns {void}
   */
  handleMovement() {
    if (this.isDead()) return;
    this.handleDirectionalMovement();
    this.handleActionInput();
    this.world.camera_x = -this.x + 20;
  }
  /**
   * Moves the character on the axes based on pressed keys.
   * @returns {void}
   */
  handleDirectionalMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.x += this.speed;
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= this.speed;
      this.otherDirection = true;
    }
    if (this.world.keyboard.UP && this.y > -150) {
      this.y -= this.speed;
    }
    if (this.world.keyboard.DOWN && this.y < 550 - this.height) {
      this.y += this.speed;
    }
  }
  /**
   * Handles attack and bubble-shoot key input.
   * @returns {void}
   */
  handleActionInput() {
    if (this.world.keyboard.SPACE) this.attack();
    if (this.world.keyboard.D && !this.bubbleWasPressed) {
      this.shootBubble();
    }
    this.bubbleWasPressed = this.world.keyboard.D;
  }
  /**
   * Choose which character animation to play based on state.
   * @returns {void}
   */
  handleCharacterAnimation() {
    if (this.isBubbleAttacking) return;
    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isMoving()) {
      this.playSwimAnimation();
    }
  }
  /**
   * Play swimming animation frame-by-frame, throttled to avoid too fast updates.
   * @returns
   */
  playSwimAnimation() {
    if (Date.now() - (this.lastSwimFrame || 0) < 100) return;
    this.lastSwimFrame = Date.now();
    this.playAnimation(this.IMAGES_WALKING);
  }
  /**
   * Show death animation frame-by-frame and sink the character.
   * @returns {void}
   */
  playDeadAnimation() {
    if (this.currentImage < this.IMAGES_DEAD.length) {
      let path = this.IMAGES_DEAD[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
    this.y += 2;
  }
  /**
   * Returns true if any movement key is currently pressed.
   * @returns {boolean}
   */
  isMoving() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN
    );
  }
  /**
   * Perform melee attack animation if not on cooldown.
   * @returns {void}
   */
  attack() {
    if (this.isAttacking || this.isOnCooldown()) return;
    this.isAttacking = true;
    this.idleStartTime = 0;
    this.isSleeping = false;
    this.lastAttack = new Date().getTime();
    this.attackSound.currentTime = 0;
    this.attackSound.play().catch(() => {});
    this.currentImage = 0;
    this.attackInterval = setStoppableInterval(
      () => this.playAttackFrame(),
      40,
    );
  }
  /**
   * Plays the next attack animation frame, stops the interval when the animation ends.
   * @returns {void}
   */
  playAttackFrame() {
    if (this.currentImage >= this.IMAGES_ATTACK.length) {
      clearInterval(this.attackInterval);
      this.isAttacking = false;
      return;
    }
    this.playAnimation(this.IMAGES_ATTACK);
  }
  /**
   * Fires a bubble projectile if not on cooldown, plays character animation.
   * @returns {void}
   */
  shootBubble() {
    if (this.isBubbleOnCooldown()) return;
    if (this.isBubbleAttacking || this.bubbleSpawnScheduled) return;
    if (!this.world?.poisonbar?.hasPoison?.()) return; // NEU: nur mit Gift möglich
    this.idleStartTime = 0;
    this.isSleeping = false;
    this.lastBubbleAttack = new Date().getTime();
    this.bubbleSpawnScheduled = true;
    this.playBubbleCharacterAnimation();
    this.spawnBubbleProjectile();
  }
  /**
   * Plays the bubble-shooting frames on the character.
   * @returns {void}
   */
  playBubbleCharacterAnimation() {
    this.isBubbleAttacking = true;
    this.currentImage = 0;
    let interval = setStoppableInterval(() => {
      if (this.currentImage >= this.IMAGES_BUBBLE_PROJECTILE.length) {
        clearInterval(interval);
        this.isBubbleAttacking = false;
        this.bubbleSpawnScheduled = false;
        return;
      }
      this.playAnimation(this.IMAGES_BUBBLE_PROJECTILE);
    }, 40);
  }
  /**
   * Returns the horizontal spawn point for the bubble based on facing direction.
   * @returns {number}
   */
  getBubbleStartX() {
    return this.otherDirection
      ? this.x + this.offset.left + 10
      : this.x + this.width - this.offset.right - 20;
  }
  /**
   * Returns true if attack cooldown is still active.
   * @returns {boolean}
   */
  isOnCooldown() {
    let cooldown = 500;
    return this.lastAttack && new Date().getTime() - this.lastAttack < cooldown;
  }
  /**
   * Returns true if bubble-attack cooldown is active.
   * @returns {boolean}
   */
  isBubbleOnCooldown() {
    let cooldown = 500;
    return (
      this.lastBubbleAttack &&
      new Date().getTime() - this.lastBubbleAttack < cooldown
    );
  }
  /**
   * Check whether this character's attack hit the given enemy.
   * @param {DrawableObject} enemy
   * @returns {boolean}
   */
  isAttackColliding(enemy) {
    let attackRange = 60;
    return (
      this.x + this.width - this.offset.right + attackRange >
        enemy.x + enemy.offset.left &&
      this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right &&
      this.y + this.height - this.offset.bottom > enemy.y + enemy.offset.top &&
      this.y + this.offset.top < enemy.y + enemy.height - enemy.offset.bottom
    );
  }
}
