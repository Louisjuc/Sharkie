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

  IMAGES_IDLE = [
    "./img/1.Sharkie/1.IDLE/1.png",
    "./img/1.Sharkie/1.IDLE/2.png",
    "./img/1.Sharkie/1.IDLE/3.png",
    "./img/1.Sharkie/1.IDLE/4.png",
    "./img/1.Sharkie/1.IDLE/5.png",
    "./img/1.Sharkie/1.IDLE/6.png",
    "./img/1.Sharkie/1.IDLE/7.png",
    "./img/1.Sharkie/1.IDLE/8.png",
    "./img/1.Sharkie/1.IDLE/9.png",
    "./img/1.Sharkie/1.IDLE/10.png",
    "./img/1.Sharkie/1.IDLE/11.png",
    "./img/1.Sharkie/1.IDLE/12.png",
    "./img/1.Sharkie/1.IDLE/13.png",
    "./img/1.Sharkie/1.IDLE/14.png",
    "./img/1.Sharkie/1.IDLE/15.png",
    "./img/1.Sharkie/1.IDLE/16.png",
    "./img/1.Sharkie/1.IDLE/17.png",
    "./img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_WALKING = [
    "./img/1.Sharkie/3.Swim/1.png",
    "./img/1.Sharkie/3.Swim/2.png",
    "./img/1.Sharkie/3.Swim/3.png",
    "./img/1.Sharkie/3.Swim/4.png",
    "./img/1.Sharkie/3.Swim/5.png",
    "./img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_ATTACK = [
    "./img/1.Sharkie/4.Attack/Fin slap/1.png",
    "./img/1.Sharkie/4.Attack/Fin slap/2.png",
    "./img/1.Sharkie/4.Attack/Fin slap/3.png",
    "./img/1.Sharkie/4.Attack/Fin slap/4.png",
    "./img/1.Sharkie/4.Attack/Fin slap/5.png",
    "./img/1.Sharkie/4.Attack/Fin slap/6.png",
    "./img/1.Sharkie/4.Attack/Fin slap/7.png",
    "./img/1.Sharkie/4.Attack/Fin slap/8.png",
    "./img/1.Sharkie/4.Attack/Fin slap/1.png",
  ];

  IMAGES_DEAD = [
    "./img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_HURT = [
    "./img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];

  IMAGES_SLEEP = [
    "./img/1.Sharkie/2.Long_IDLE/i1.png",
    "./img/1.Sharkie/2.Long_IDLE/I2.png",
    "./img/1.Sharkie/2.Long_IDLE/I3.png",
    "./img/1.Sharkie/2.Long_IDLE/I4.png",
    "./img/1.Sharkie/2.Long_IDLE/I4.png",
    "./img/1.Sharkie/2.Long_IDLE/I5.png",
    "./img/1.Sharkie/2.Long_IDLE/I6.png",
    "./img/1.Sharkie/2.Long_IDLE/I7.png",
    "./img/1.Sharkie/2.Long_IDLE/I8.png",
    "./img/1.Sharkie/2.Long_IDLE/I9.png",
    "./img/1.Sharkie/2.Long_IDLE/I10.png",
    "./img/1.Sharkie/2.Long_IDLE/I11.png",
    "./img/1.Sharkie/2.Long_IDLE/I12.png",
    "./img/1.Sharkie/2.Long_IDLE/I13.png",
    "./img/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  // frames to show on the character while shooting (do NOT use for the projectile)
  IMAGES_BUBBLE_PROJECTILE = [
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/5.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/6.png",
    "./img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png",
  ];

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
   * Calculates spawn data and creates the bubble projectile after a short delay.
   * @returns {void}
   */
  spawnBubbleProjectile() {
    let startX = this.getBubbleStartX();
    let startY = this.y + this.height / 2 + 25;
    let poisoned = this.world?.poisonbar?.isFull?.() ?? false;

    setTimeout(() => {
      let bubble = new Bubble(
        this.otherDirection ? -1 : 1,
        startX,
        startY,
        poisoned,
      ); // GEÄNDERT
      this.world.bubbles.push(bubble);
      if (!this.isBubbleAttacking) this.bubbleSpawnScheduled = false;
    }, 300);
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
    // don't run idle animations while bubble-character animation is active
    if (this.isBubbleAttacking) return;

    if (!this.isMoving()) {
      if (this.idleStartTime === 0) {
        this.idleStartTime = Date.now();
      }

      const idleDuration = (Date.now() - this.idleStartTime) / 1000;

      if (idleDuration >= 15) {
        if (!this.isSleeping) {
          this.isSleeping = true;
          this.currentImage = 0;
        }
        this.playAnimation(this.IMAGES_SLEEP);
      } else {
        this.isSleeping = false;
        this.playAnimation(this.IMAGES_IDLE);
      }
    } else {
      this.idleStartTime = 0;
      this.isSleeping = false;
    }
  }

  /**
   * Update character position based on input and apply camera follow.
   * @returns {void}
   */
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
    // if we're playing the bubble-character animation, skip other animations
    if (this.isBubbleAttacking) return;

    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isMoving()) {
      this.playAnimation(this.IMAGES_WALKING);
    }
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
    this.attackSound.play();
    this.currentImage = 0;
    let interval = setStoppableInterval(() => {
      if (this.currentImage >= this.IMAGES_ATTACK.length) {
        clearInterval(interval);
        this.isAttacking = false;
        return;
      }
      this.playAnimation(this.IMAGES_ATTACK);
    }, 40);
  }

  /**
   * Create and fire a bubble projectile if bubble-attack is not on cooldown.
   * @returns {void}
   */
  /**
   * Fires a bubble projectile if not on cooldown, plays character animation.
   * @returns {void}
   */
  shootBubble() {
    if (this.isBubbleOnCooldown()) return;
    if (this.isBubbleAttacking || this.bubbleSpawnScheduled) return;
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

  // prüft ob Cooldown (z.B. 500ms) noch aktiv ist
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
