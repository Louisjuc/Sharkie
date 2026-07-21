class Endboss extends moveableObject {
  height = 350;
  width = 350;
  y = 0;
  speedY = 0; 
  acceleration = 1;


    offset = {
    top: 160,
    left: 60,
    right: 60,
    bottom: 90
  };

  IMAGES_WALKING = [
    "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "../img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  IMAGES_FLOATING =[
    "../img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ]

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2100;
    this.loadImages(this.IMAGES_FLOATING);
    this.checkProximity();
    this.drawOffset = true;
  }

  checkProximity() {
  let interval = setInterval(() => {
    if (this.world && this.world.character.x > this.x - 900) { // NEU – Abstand anpassen
      clearInterval(interval); // NEU – Prüfung stoppen
      this.introduce();
    }
  }, 200);
}

introduce() {
  this.currentImage = 0; // NEU – Intro immer bei Frame 0 starten
  let interval = setInterval(() => {
    if (this.currentImage >= this.IMAGES_WALKING.length) {
      clearInterval(interval); // NEU – stoppt Intro nach letztem Frame
      this.animate(); // NEU – wechselt danach zu Floating
      return;
    }
    this.playAnimation(this.IMAGES_WALKING);
  }, 100);
}

animate() {
  this.currentImage = 0; // NEU – Floating sauber bei Frame 0 starten
  setInterval(() => {
    this.playAnimation(this.IMAGES_FLOATING); // NEU – statt IMAGES_WALKING
  }, 100);
}
}
