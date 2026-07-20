class Character extends moveableObject {
  height = 300;
  width = 350;
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
    "../img/1.Sharkie/4.Attack/Fin slap/1.png"
  ]

  world;

  constructor() {
    super().loadImage("../img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.animate();
  }

animate() {
  setInterval(() => { // NEU – wieder ergänzt, war verloren gegangen
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
    if (
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
      this.otherDirection = false;
      return;
    }
    this.playAnimation(this.IMAGES_ATTACK);
  }, 50);
}


}
