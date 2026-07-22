class Level {
  enemies;
  coins;
  poison;
  level_end_x = 3000;

  constructor(enemies, coins, backgroundObjects, poison) { // GEÄNDERT – coins ergänzt
    this.enemies = enemies;
    this.coins = coins; // NEU
     this.poison = poison; // NEU
    this.backgroundObjects = backgroundObjects;
  }
}