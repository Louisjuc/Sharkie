class Endboss extends moveableObject {
  height = 350;
  width = 350;
  y = 0;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  isAttacking = false;


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
    "./img/2.Enemy/3 Final Enemy/Attack/6.png"
  ]

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
        this.animate(); 
        return;
      }
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  animate() {
    this.currentImage = 0;
    setStoppableInterval(() => {
      if (this.isDead()) {
        if (!this.deadAnimationPlayed) {
          this.playAnimation(this.IMAGES_DEAD);

          if (this.currentImage >= this.IMAGES_DEAD.length) {
            this.deadAnimationPlayed = true;
          }
        }
        if (this.deadAnimationPlayed) {
          this.opacity -= 0.05;
          this.y += 1;

          if (this.opacity < 0) {
            this.opacity = 0;
          }
        }
        return;
      }  else if (this.isAttacking) { // NEU
  this.playAnimation(this.IMAGES_ATTACK); // NEU
} else if (this.isHurt()) {
        // NEU
        this.playAnimation(this.IMAGES_HURT); // NEU
      } else {
        this.playAnimation(this.IMAGES_FLOATING);
      }
    }, 100);
  }


checkAttack() {
  setStoppableInterval(() => {
    if (!this.world) return; // NEU – verhindert Absturz falls world noch nicht gesetzt

    let distance = Math.abs(this.x - this.world.character.x);
    let notBusy = !this.isAttacking && !this.isHurt() && !this.isDead();

    if (distance < 400 && notBusy) {
      this.attack();
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
  }, 100);
}

// NEU – eigene Kollisionsprüfung mit Reichweite für den Boss-Angriff
isBossAttackColliding(character) {
  let attackRange = 100;

  return (
    this.x + this.offset.left - attackRange < character.x + character.width - character.offset.right &&
    this.x + this.width - this.offset.right + attackRange > character.x + character.offset.left &&
    this.y + this.height - this.offset.bottom > character.y + character.offset.top &&
    this.y + this.offset.top < character.y + character.height - character.offset.bottom
  );
}


}
