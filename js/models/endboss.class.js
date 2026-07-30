class Endboss extends moveableObject {
  height = 350;
  width = 350;
  y = 0;
  speedY = 0;
  acceleration = 1;
  energy = 120;
  isAttacking = false;
  speed = 10;
  statusbar = new EndbossStatusbar();
  bossVisible = false;
  attackSound = new Audio("./audio/orca_attack.mp3");
  offset = {
    top: 190,
    left: 95,
    right: 95,
    bottom: 115,
  };
  IMAGES_WALKING = ENDBOSS_IMAGES.walking;
  IMAGES_FLOATING = ENDBOSS_IMAGES.floating;
  IMAGES_HURT = ENDBOSS_IMAGES.hurt;
  IMAGES_DEAD = ENDBOSS_IMAGES.dead;
  IMAGES_ATTACK = ENDBOSS_IMAGES.attack;
  
  /**
   * Overrides hit to also update the boss health bar.
   * @param {number} [damage=5]
   * @returns {void}
   */
  hit(damage) {
    super.hit(damage);
    this.updateStatusbar();
  }
  
  /**
   * Updates the boss health bar based on current energy.
   * @returns {void}
   */
  updateStatusbar() {
    this.statusbar.setPercentage((this.energy / 80) * 100);
  }
  
  /**
   * Create an Endboss and preload images/sounds.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2900;
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.checkProximity();
    this.checkAttack();
    registerSound(this.attackSound);
  }
  
  /**
   * Periodically checks whether the character is close enough to trigger the boss introduction.
   * @returns {void}
   */
  checkProximity() {
    let interval = setStoppableInterval(() => {
      if (this.world && this.world.character.x > this.x - 300) {
        clearInterval(interval);
        this.introduce();
      }
    }, 200);
  }
  
  /**
   * Plays the one-time introduction animation, then marks the boss visible and starts the main loop.
   * @returns {void}
   */
  introduce() {
    this.currentImage = 0;
    let interval = setStoppableInterval(() => {
      if (this.currentImage >= this.IMAGES_WALKING.length) {
        clearInterval(interval);
        this.bossVisible = true;
        this.animate();
        return;
      }
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
  
  /**
   * Starts the recurring interval driving the boss's main behaviour loop.
   * @returns {void}
   */
  animate() {
    this.currentImage = 0;
    setStoppableInterval(() => {
      this.handleBossState();
    }, 100);
  }
  
  /**
   * Selects the appropriate action based on boss state (dead/hurt/attacking/idle).
   * @returns {void}
   */
  handleBossState() {
    if (this.isDead()) {
      this.handleDead(1, 0, 0.05);
      return;
    }
    this.moveToCharacter();
    this.playCurrentAction();
  }
  
  /**
   * Moves the boss towards the character if not attacking or hurt, with a minimum distance threshold.
   * @returns {void}
   */
  moveToCharacter() {
    if (!this.world || this.isAttacking || this.isHurt() || this.isDead())
      return;
    let charX = this.world.character.x;
    let charY = this.world.character.y;
    let distance = Math.abs(this.x - charX);
    this.otherDirection = charX > this.x;
    let movesDown = charY > this.y;

    if (distance > 200) {
      this.x += this.otherDirection ? this.speed : -this.speed;
      this.y += movesDown ? this.speed : -this.speed;
    }
  }
  
  /**
   * Plays the animation matching the boss's current action (attack/hurt/floating).
   * @returns {void}
   */
  playCurrentAction() {
    if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_FLOATING);
    }
  }
  
  /**
   * Periodically checks distance to the character and triggers an attack when in range.
   * @returns {void}
   */
  checkAttack() {
    setStoppableInterval(() => {
      if (!this.world) return;
      if (this.isDead()) return;
      if (this.world.character?.isDead()) return;
      let distance = Math.abs(this.x - this.world.character.x);
      let notBusy = !this.isAttacking && !this.isHurt() && !this.isDead();
      if (distance < 400 && notBusy) {
        this.attack();
        playSound(this.attackSound);
      }
    }, 3000);
  }
  
  /**
   * Plays the attack animation and pushes the boss forward while attacking.
   * @returns {void}
   */
  attack() {
    this.isAttacking = true;
    this.currentImage = 0;
    let interval = setStoppableInterval(() => {
      if (this.currentImage >= this.IMAGES_ATTACK.length) {
        clearInterval(interval);
        this.isAttacking = false;
        return;
      }
      this.playAnimation(this.IMAGES_ATTACK);
      this.x -= 60 + Math.random() * 0.25;
    }, 100);
  }
  
  /**
   * Checks whether the boss's attack hitbox collides with the character.
   * @param {Character} character
   * @returns {boolean}
   */
  isBossAttackColliding(character) {
    let attackRange = 100;
    return (
      this.x + this.offset.left - attackRange <
        character.x + character.width - character.offset.right &&
      this.x + this.width - this.offset.right + attackRange >
        character.x + character.offset.left &&
      this.y + this.height - this.offset.bottom >
        character.y + character.offset.top &&
      this.y + this.offset.top <
        character.y + character.height - character.offset.bottom
    );
  }
}
