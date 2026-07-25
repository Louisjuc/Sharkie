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
  attackSound = new Audio("./audio/orca_attack.mp3");

  offset = {
    top: 160,
    left: 60,
    right: 60,
    bottom: 90,
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
   * Polls until the character approaches the boss, then runs `introduce()`.
   * @returns {void}
   */
  checkProximity() {
    let interval = setStoppableInterval(() => {
      if (this.world && this.world.character.x > this.x - 900) {
        clearInterval(interval);
        this.introduce();
      }
    }, 200);
  }

  /**
   * Plays the introduce/walking animation once then enters the main loop.
   * @returns {void}
   */
  introduce() {
    this.currentImage = 0;
    let interval = setStoppableInterval(() => {
      if (this.currentImage >= this.IMAGES_WALKING.length) {
        clearInterval(interval);
        this.animate();
        return;
      }
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  /**
   * Start the boss animation/behavior loop.
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
    this.playCurrentAction();
  }

  
  /**
   * Plays the animation corresponding to the current action.
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
   * Periodically checks distance to character and triggers `attack()` when close.
   * @returns {void}
   */
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

  /**
   * Execute attack animation and move boss forward slightly during attack.
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
   * Checks whether the boss attack area overlaps with the character.
   * @param {DrawableObject} character - The character to test collision against.
   * @returns {boolean} True if colliding with attack area.
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
