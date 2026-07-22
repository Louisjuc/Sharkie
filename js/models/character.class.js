class Character extends moveableObject {
  height = 300;
  width = 300;
  speed = 10;
  isAttacking = false;
  IMAGES_WALKING = [
    "../img/1.Sharkie/3.Swim/1.png",
    "../img/1.Sharkie/3.Swim/2.png",
    "../img/1.Sharkie/3.Swim/3.png",
    "../img/1.Sharkie/3.Swim/4.png",
    "../img/1.Sharkie/3.Swim/5.png",
    "../img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_ATTACK = [
    "../img/1.Sharkie/4.Attack/Fin slap/1.png",
    "../img/1.Sharkie/4.Attack/Fin slap/2.png",
    "../img/1.Sharkie/4.Attack/Fin slap/3.png",
    "../img/1.Sharkie/4.Attack/Fin slap/4.png",
    "../img/1.Sharkie/4.Attack/Fin slap/5.png",
    "../img/1.Sharkie/4.Attack/Fin slap/6.png",
    "../img/1.Sharkie/4.Attack/Fin slap/7.png",
    "../img/1.Sharkie/4.Attack/Fin slap/8.png",
    "../img/1.Sharkie/4.Attack/Fin slap/1.png",
  ];

  IMAGES_DEAD = [
    "../img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_HURT = [
    "../img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "../img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "../img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "../img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];

  offset = {
    top: 180,
    left: 100,
    right: 100, // <- verkleinert, damit Hitbox weiter nach rechts reicht
    bottom: 70,
  };

  world;

  constructor() {
    super().loadImage("../img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
  }

  animate() {
    setInterval(() => {
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
      this.world.camera_x = -this.x + 20;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.UP ||
        this.world.keyboard.DOWN
      ) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

  attack() {
    if (this.isAttacking) return;

    this.isAttacking = true;

    this.currentImage = 0;

    let interval = setInterval(() => {
      if (this.currentImage >= this.IMAGES_ATTACK.length) {
        clearInterval(interval);
        this.isAttacking = false;
        return;
      }
      this.playAnimation(this.IMAGES_ATTACK);
    }, 40);
  }

// GEÄNDERT – endboss-Parameter entfernt, funktioniert jetzt für jeden Gegner-Typ
isAttackColliding(target) {
  let attackRange = 60;

  return (
    this.x + this.width - this.offset.right + attackRange >
      target.x + target.offset.left &&
    this.x + this.offset.left < target.x + target.width - target.offset.right &&
    this.y + this.height - this.offset.bottom > target.y + target.offset.top &&
    this.y + this.offset.top < target.y + target.height - target.offset.bottom
  );
}
}
