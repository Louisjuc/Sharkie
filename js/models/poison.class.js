class Poison extends moveableObject {
  IMAGES_POISON = [
    "./img/4. Marcadores/Posion/Animada/1.png",
    "./img/4. Marcadores/Posion/Animada/2.png",
    "./img/4. Marcadores/Posion/Animada/3.png",
    "./img/4. Marcadores/Posion/Animada/4.png",
    "./img/4. Marcadores/Posion/Animada/5.png",
    "./img/4. Marcadores/Posion/Animada/6.png",
    "./img/4. Marcadores/Posion/Animada/7.png",
    "./img/4. Marcadores/Posion/Animada/8.png",
  ];

  offset = { top: 0, left: 0, right: 0, bottom: 0 }; 

  constructor() {
    super().loadImage(this.IMAGES_POISON[0]);
    this.x = 400 + Math.random() * 2700;
    this.y = 0 + Math.random() * 400; 
    this.height = 60;
    this.width = 60;
    this.loadImages(this.IMAGES_POISON);
    this.animate();
  }

  animate() {
    setStoppableInterval(() => { 
      this.playAnimation(this.IMAGES_POISON);
      this.y += 1;
    }, 100);
  }
checkPoisonCollisions() {
  setStoppableInterval(() => {
    for (let i = this.level.poison.length - 1; i >= 0; i--) {
      let poison = this.level.poison[i];
      if (this.character.isColliding(poison)) {
        this.level.poison.splice(i, 1);
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
        this.poisonbar.addPoison();
      }
    }
  }, 200);
}
}