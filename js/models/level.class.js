class Level {
  enemies;
  coins;
  poison;
  level_end_x = 3000;

  constructor(enemies, coins, backgroundObjects, poison) { 
    this.enemies = enemies;
    this.coins = coins; 
     this.poison = poison; 
    this.backgroundObjects = backgroundObjects;
  }
}