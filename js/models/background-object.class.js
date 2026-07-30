class BackgroundObject extends moveableObject {
  width = 720;
  height = 480;
  
  /**
   * Positions the background object at the given x coordinate, aligned to the bottom.
   * @param {string} imagePath
   * @param {number} x
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}