class Poison extends moveableObject {

  /**
   * Animation frames for the poison object.
   * @type {string[]}
   */
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

  /**
   * Collision offset (none for poison).
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = { top: 0, left: 0, right: 0, bottom: 0 };

  /**
   * Places poison at a random position and starts its animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_POISON[0]);
    this.x = 400 + Math.random() * 2700;
    this.y = 0 + Math.random() * 400;
    this.height = 60;
    this.width = 50;
    this.loadImages(this.IMAGES_POISON);
    this.animate();
  }

  /**
   * Starts recurring animation and downward drift movement.
   * @returns {void}
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_POISON);
      this.y += 1;
    }, 100);
  }
}