/**
 * The main game world. Holds references to the character, level, camera and manages
 * periodic collision checks and rendering.
 */
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
   *
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
   */
  /**
   * Initialize the World with a canvas and start timers/render loop.
   * @param {HTMLCanvasElement} canvas
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
 * Displays the win screen after the end boss is defeated.
 */
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
          document.getElementById("winScreen").style.display = "flex";
          document.getElementById("coinCount").innerText = this.collectedCoins;
        }, 5000);
      }
    }, 500);
  }

/**
 * Shows the lose screen when the character dies and mutes audio if needed.
 */
  /**
   * Show the lose screen when the character dies.
   * @returns {void}
   */
  checkLose() {
    let interval = setStoppableInterval(() => {
      if (this.character.isDead()) {
        document.getElementById("loseScreen").style.display = "flex";
        if (!isMuted) handleMuteClick();
        clearInterval(interval);
      }
    }, 200);
  }

/**
 * Checks for collisions between the character and poison items and applies damage/updates bars.
 */
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
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
          this.poisonbar.addPoison();
        }
      }
    }, 200);
  }

/**
 * Runs periodic collision checks for enemies and boss attacks.
 */
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
   * Moves active bubble projectiles and applies damage when they hit enemies or the boss.
   */
  /**
   * Moves bubbles and checks collisions with enemies and the endboss.
   * @returns {void}
   */
  checkBubbleCollisions() {
    setStoppableInterval(() => {
      const maxBubbleX = this.level.level_end_x + 100;

      for (let i = this.bubbles.length - 1; i >= 0; i--) {
        const bubble = this.bubbles[i];
        bubble.move();

        if (bubble.x < -100 || bubble.x > maxBubbleX) {
          this.bubbles.splice(i, 1);
          continue;
        }

        for (let j = this.level.enemies.length - 1; j >= 0; j--) {
          const enemy = this.level.enemies[j];
          if (enemy.isDead()) continue;
          if (bubble.isColliding(enemy)) {
            enemy.hit();
            this.bubbles.splice(i, 1);
            break;
          }
        }

        if (this.bubbles[i] && this.endboss && !this.endboss.isDead() && bubble.isColliding(this.endboss)) {
          this.endboss.hit();
          this.bubbles.splice(i, 1);
        }
      }
    }, 1000 / 60);
  }

  /**
   * Checks collisions between the character and non-boss enemies.
   */
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
   * Checks whether the end boss attack collides with the character.
   */
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
   * Applies a hit to the character and updates the health bar.
   */
  /**
   * Apply damage to the character and update status bar.
   * @returns {void}
   */
  applyDamage() {
    this.character.hit();
    this.statusbar.setPercentage(this.character.energy);
  }

/**
 * Checks for collisions with collectible coins and increments the score.
 */
  /**
   * Check collisions with collectible coins and increment score.
   * @returns {void}
   */
  checkCoinCollisions() {
    setStoppableInterval(() => {
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
 * Checks whether the character's attack collides with enemies or the boss.
 */
  /**
   * Checks whether character attacks hit enemies or the boss.
   * @returns {void}
   */
  checkAttackCollisions() {
    setStoppableInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (!this.character.isAttacking || !this.character.isAttackColliding(enemy)) {
          return;
        }
        if (enemy.isDead()) return;
        if (!enemy.isHurt()) {
          enemy.hit();
        }
      });

      if (this.character.isAttacking && this.character.isAttackColliding(this.endboss) && !this.endboss.isHurt()) {
        this.endboss.hit();
      }
    }, 1000 / 60);
  }

/**
 * Assigns the current world instance to the character, boss, and enemies.
 */
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
   * Renders the current frame of the game world and schedules the next frame.
   */
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
    self = this;
    requestAnimationFrame(() => self.draw());
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
   * Draws a movable object and its frame to the canvas.
   *
   * @param {DrawableObject} mo - The object to render.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.drawCTX(this.ctx);
    mo.drawFrame(this.ctx);
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