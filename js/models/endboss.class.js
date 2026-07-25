/**
 * Endboss (final enemy) behaviour and animations.
 * Extends `moveableObject` and manages idle/introduce/attack states.
 */
class Endboss extends moveableObject {
  height = 350;
  width = 350;
  y = 0;
  speedY = 0;
  acceleration = 1;
  energy = 80;
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

  IMAGES_WALKING = [
    "./img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  IMAGES_FLOATING = [
    "./img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  IMAGES_HURT = [
    "./img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_DEAD = [
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  IMAGES_ATTACK = [
    "./img/2.Enemy/3 Final Enemy/Attack/1.png",
    "./img/2.Enemy/3 Final Enemy/Attack/2.png",
    "./img/2.Enemy/3 Final Enemy/Attack/3.png",
    "./img/2.Enemy/3 Final Enemy/Attack/4.png",
    "./img/2.Enemy/3 Final Enemy/Attack/5.png",
    "./img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

/**
 * Overrides hit to also update the boss health bar.
 * @param {number} [damage=5]
 * @returns {void}
 */
hit(damage) { // NEU
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

  checkProximity() {
    let interval = setStoppableInterval(() => {
      if (this.world && this.world.character.x > this.x - 900) {
        clearInterval(interval);
        this.introduce();
      }
    }, 200);
  }

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
    this.moveToCharacter(); // NEU: Boss folgt dem Character
    this.playCurrentAction();
  }

  /**
   * Bewegt den Boss langsam zum Character und dreht die Blickrichtung. // NEU
   * @returns {void}
   */
  moveToCharacter() { 
    if (!this.world || this.isAttacking || this.isHurt() || this.isDead()) return;
    let charX = this.world.character.x;
    let distance = Math.abs(this.x - charX);
    this.otherDirection = charX > this.x;

    if (distance > 400) {
      this.x += this.otherDirection ? this.speed : -this.speed;
    }
  }

  playCurrentAction() {
    if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_FLOATING);
    }
  }

  checkAttack() {
    setStoppableInterval(() => {
      if (!this.world) return;

      let distance = Math.abs(this.x - this.world.character.x);
      let notBusy = !this.isAttacking && !this.isHurt() && !this.isDead();

      if (distance < 400 && notBusy) {
        this.attack();
        this.attackSound.currentTime = 0;
        this.attackSound.play();
      }
    }, 3000);
  }

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
