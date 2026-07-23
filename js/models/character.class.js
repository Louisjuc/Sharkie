class Character extends moveableObject {
  height = 300;
  width = 300;
  speed = 10;
  isAttacking = false;
  attackSound = new Audio("./audio/attack.mp3");

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

  offset = {
    top: 180,
    left: 100,
    right: 100, // <- verkleinert, damit Hitbox weiter nach rechts reicht
    bottom: 70,
  };

  world;

  constructor() {
    super().loadImage("./img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.attackSound.volume = 0.3;
    this.animate();
    registerSound(this.attackSound);
  }

  animate() {
    setStoppableInterval(() => {
      this.handleMovement();
    }, 1000 / 60);

    setStoppableInterval(() => {
      this.handleCharacterAnimation();
    }, 50);
  }

  handleMovement() {
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
    if (this.world.keyboard.SPACE) this.attack();
    this.world.camera_x = -this.x + 20;
  }

  handleCharacterAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isMoving()) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  isMoving() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN
    );
  }

  attack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
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
