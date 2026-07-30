class World {
  character = new Character();
  level = level1;
  keyboard = new Keyboard();
  canvas;
  ctx;
  light = [new Light()];
  camera_x = 0;
  backgroundObjects = this.level.backgroundObjects;
  bubbles = [];
  statusbar = new Statusbar();
  coinbar = new Coinbar();
  poisonbar = new Poisonbar();
  endboss = this.level.enemies.find((e) => e instanceof Endboss);
  collectedCoins = 0;
  
  /**
   * Creates a new game world, initializes the canvas context, and starts all game checks and the render loop.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.keyboard.bindBtnPressEvents();
    this.setWorld();
    this.checkCollisions();
    this.checkAttackCollisions();
    this.checkCoinCollisions();
    this.checkWin();
    this.checkPoisonCollisions();
    this.checkBubbleCollisions();
    this.checkLose();
  }
  
  /**
   * Show the win screen when endboss dies (with a small delay).
   * @returns {void}
   */
  checkWin() {
    let winTriggered = false;
    setStoppableInterval(() => {
      if (this.endboss.isDead() && !winTriggered) {
        winTriggered = true;
        setTimeout(() => {
          gameOver = true;
          stopGame();
          stopAllSounds();
          document.getElementById("winScreen").style.display = "flex";
          document.getElementById("coinCount").innerText = this.collectedCoins;
        }, 5000);
      }
    }, 500);
  }
  
  /**
   * Show the lose screen when the character dies.
   * @returns {void}
   */
  checkLose() {
    let interval = setStoppableInterval(() => {
      if (this.character.isDead()) {
         stopAllSounds();
        showLoseScreen();
        clearInterval(interval);
      }
    }, 200);
  }
  
  /**
   * Periodically checks for collisions with poison items and applies damage.
   * @returns {void}
   */
  checkPoisonCollisions() {
    setStoppableInterval(() => {
      for (let i = this.level.poison.length - 1; i >= 0; i--) {
        let poison = this.level.poison[i];
        if (this.character.isColliding(poison)) {
          this.level.poison.splice(i, 1);
          this.poisonbar.addPoison();
        }
      }
    }, 200);
  }
  
  /**
   * Run periodic collision checks for enemies and boss attacks.
   * @returns {void}
   */
  checkCollisions() {
    setStoppableInterval(() => {
      this.checkEnemyCollisions();
      this.checkBossAttackCollision();
    }, 200);
  }
  
  /**
   * Moves bubbles and checks collisions with enemies and the endboss.
   * @returns {void}
   */
  checkBubbleCollisions() {
    setStoppableInterval(() => {
      let maxBubbleX = this.level.level_end_x + 100;
      for (let i = this.bubbles.length - 1; i >= 0; i--) {
        this.updateBubble(i, maxBubbleX);
      }
    }, 1000 / 60);
  }
  
  /**
   * Moves a single bubble and checks its bounds/collisions.
   * @param {number} i - Index of the bubble in this.bubbles.
   * @param {number} maxBubbleX
   * @returns {void}
   */
  updateBubble(i, maxBubbleX) {
    let bubble = this.bubbles[i];
    bubble.move();
    if (this.isBubbleOutOfBounds(bubble, maxBubbleX)) {
      this.bubbles.splice(i, 1);
      return;
    }
    this.checkBubbleEnemyHit(i, bubble);
    this.checkBubbleBossHit(i, bubble);
  }
  
  /**
   * Returns true if the bubble left the playable area.
   * @param {Bubble} bubble
   * @param {number} maxBubbleX
   * @returns {boolean}
   */
  isBubbleOutOfBounds(bubble, maxBubbleX) {
    return bubble.x < -100 || bubble.x > maxBubbleX;
  }
  
  /**
   * Checks if a bubble hits any enemy and applies damage.
   * @param {number} i - Index of the bubble in this.bubbles.
   * @param {Bubble} bubble
   * @returns {void}
   */
  checkBubbleEnemyHit(i, bubble) {
    for (let j = this.level.enemies.length - 1; j >= 0; j--) {
      let enemy = this.level.enemies[j];
      if (enemy.isDead()) continue;
      if (bubble.isColliding(enemy)) {
        enemy.hit(bubble.damage);
        this.bubbles.splice(i, 1);
        break;
      }
    }
  }
  
  /**
   * Checks if a bubble hits the endboss and applies damage.
   * @param {number} i - Index of the bubble in this.bubbles.
   * @param {Bubble} bubble
   * @returns {void}
   */
  checkBubbleBossHit(i, bubble) {
    if (
      this.bubbles[i] &&
      this.endboss &&
      !this.endboss.isDead() &&
      bubble.isColliding(this.endboss)
    ) {
      this.endboss.hit(bubble.damage);
      this.bubbles.splice(i, 1);
    }
  }
  
  /**
   * Check collisions between the character and non-boss enemies.
   * @returns {void}
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) return;
      if (this.character.isColliding(enemy)) {
        this.applyDamage();
      }
    });
  }
  
  /**
   * Check if the endboss attack hits the character.
   * @returns {void}
   */
  checkBossAttackCollision() {
    if (
      !this.endboss.isDead() &&
      this.endboss.isAttacking &&
      this.endboss.isBossAttackColliding(this.character)
    ) {
      this.applyDamage();
    }
  }
  
  /**
   * Apply damage to the character and update status bar.
   * @returns {void}
   */
  applyDamage() {
    this.character.hit();
    this.statusbar.setPercentage(this.character.energy);
  }
  
  /**
   * Check collisions with collectible coins and increment score.
   * @returns {void}
   */
  checkCoinCollisions() {
    setStoppableInterval(() => {
      if (this.coinbar.isFull()) return;
      for (let i = this.level.coins.length - 1; i >= 0; i--) {
        let coin = this.level.coins[i];
        if (this.character.isColliding(coin)) {
          this.level.coins.splice(i, 1);
          this.coinbar.addCoin();
          this.collectedCoins++;
        }
      }
    }, 200);
  }
  
  /**
   * Checks whether character attacks hit enemies or the boss.
   * @returns {void}
   */
  checkAttackCollisions() {
    setStoppableInterval(() => {
      this.level.enemies.forEach((enemy) => this.checkAttackOnEnemy(enemy));
      this.checkAttackOnBoss();
    }, 1000 / 60);
  }
  
  /**
   * Checks whether a character attack hits a single enemy and applies a hit.
   * @param {DrawableObject} enemy
   * @returns {void}
   */
  checkAttackOnEnemy(enemy) {
    if (!this.character.isAttacking || !this.character.isAttackColliding(enemy))
      return;
    if (enemy.isDead()) return;
    if (!enemy.isHurt()) enemy.hit();
  }
  
  /**
   * Checks whether a character attack hits the endboss and applies a hit.
   * @returns {void}
   */
  checkAttackOnBoss() {
    if (
      this.character.isAttacking &&
      this.character.isAttackColliding(this.endboss) &&
      !this.endboss.isHurt()
    ) {
      this.endboss.hit();
    }
  }
  
  /**
   * Assigns the current world instance to the character, boss, and enemies.
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }
  
  /**
   * Render loop: draws background objects, character, enemies and HUD elements.
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjecttoMap(this.level.backgroundObjects);
    this.addObjecttoMap(this.light);
    this.addToMap(this.character);
    this.addObjecttoMap(this.bubbles);
    this.addObjecttoMap(this.level.enemies);
    this.addObjecttoMap(this.level.coins);
    this.addObjecttoMap(this.level.poison);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.poisonbar);
    if (this.endboss.bossVisible) this.addToMap(this.endboss.statusbar);
    requestAnimationFrame(() => this.draw());
  }
  
  /**
   * Adds each object in a collection to the map.
   *
   * @param {Array<DrawableObject>} obj - The list of objects to render.
   */
  addObjecttoMap(obj) {
    obj.forEach((o) => {
      this.addToMap(o);
    });
  }
  
  /**
   * Draws a movable object to the canvas, flipping it horizontally if it faces the other direction.
   *
   * @param {DrawableObject} mo - The object to render.
   * @returns {void}
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.drawCTX(this.ctx);
    this.ctx.globalAlpha = 1;
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  
  /**
   * Flips the current drawing context horizontally for mirrored rendering.
   *
   * @param {DrawableObject} mo - The object being mirrored.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  
  /**
   * Restores the canvas context after a mirrored render pass.
   *
   * @param {DrawableObject} mo - The object whose flip transformation should be undone.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
