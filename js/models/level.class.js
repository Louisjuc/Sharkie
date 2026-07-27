class Level {
  enemies;
  coins;
  poison;
  level_end_x = 3000;

  /**
   * Creates a level with the given entities and background objects.
   * @param {Array} enemies
   * @param {Array} coins
   * @param {Array} backgroundObjects
   * @param {Array} poison
   */
  constructor(enemies, coins, backgroundObjects, poison) {
    this.enemies = enemies;
    this.coins = coins;
    this.poison = poison;
    this.backgroundObjects = backgroundObjects;
  }
}