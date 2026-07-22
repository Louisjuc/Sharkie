class moveableObject extends drawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 80;
  lastHit = 0;
  opacity = 1;

  applyGravity() {
    setStoppableInterval(() => {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }

isColliding(mo) {
  return (
    this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // <- korrigiert
    this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
  );
}

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timesspan = new Date().getTime() - this.lastHit;
    timesspan = timesspan / 1000;
    return timesspan < 0.3;
  }

  isDead() {
    return this.energy == 0;
  }

  moveLeft() {
    setStoppableInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
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
    }
  }, 100);
}
}
