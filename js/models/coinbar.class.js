class Coinbar extends drawableObject {
  coinSound = new Audio("./audio/coin.mp3");
  collected = 0;
  total = 5;
  
  /**
   * Coinbar images from full to empty.
   * @type {string[]}
   */
  IMAGES_COIN = [
    "./img/4. Marcadores/Purple/coin/100__1.png",
    "./img/4. Marcadores/Purple/coin/80_ _1.png",
    "./img/4. Marcadores/Purple/coin/60_ _1.png",
    "./img/4. Marcadores/Purple/coin/40_ _1.png",
    "./img/4. Marcadores/Purple/coin/20_ .png",
    "./img/4. Marcadores/Purple/coin/0_ _1.png",
  ];
  
  /**
   * Initializes the coin bar, loads its images, and registers its sound.
   *
   * @param {number} [total=5] - The total number of coins required to reach 100%.
   */
  constructor(total = 5) {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.x = 20;
    this.y = 40;
    this.width = 240;
    this.height = 55;
    this.total = total;
    this.setPercentage(0);
    registerSound(this.coinSound);
  }
  
  /**
   * Updates the displayed coin-bar state based on the current percentage.
   *
   * @param {number} percentage - The current progress value in percent.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  
  /**
   * Increases the collected coin count and updates the bar display.
   */
  addCoin() {
    if (this.collected >= this.total) return;
    playSound(this.coinSound);
    this.collected++;
    this.setPercentage((this.collected / this.total) * 100);
  }
  
  /**
   * returns true if the coin bar is full (i.e., all coins have been collected).
   * @returns
   */
  isFull() {
    return this.collected >= this.total;
  }
}
