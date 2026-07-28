class Light extends moveableObject {
  /**
   * Positions the light layer at a fixed spot.
   */
  constructor() {
    super().loadImage("./img/3. Background/Layers/1. Light/1.png");
    this.x = 250;
    this.y = 0;
    this.width = 500;
  }
}