class World {
  character = new Character();
  level = level1;
  keyboard;
  canvas;
  ctx;
  light = [new Light()];
  camera_x = 0;
  backgroundObjects = this.level.backgroundObjects;
  statusbar = new Statusbar();
  coinbar = new Coinbar();
  poisonbar = new Poisonbar();
  endboss = this.level.enemies.find((e) => e instanceof Endboss);
  collectedCoins = 0;
  bars = [this.statusbar, this.coinbar, this.poisonbar]; // NEU

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.checkCollisions();
    this.checkAttackCollisions();
    this.checkCoinCollisions();
    this.checkWin();
    this.checkPoisonCollisions();
    this.checkLose();
  }

checkWin() {
  let winTriggered = false; // NEU

  setStoppableInterval(() => {
    if (this.endboss.isDead() && !winTriggered) { // GEÄNDERT
      winTriggered = true; // NEU
      setTimeout(() => { // NEU – wartet, bis Dead-Animation durchgelaufen ist
        document.getElementById("winScreen").style.display = "flex";
        document.getElementById("coinCount").innerText = this.collectedCoins;
      }, 5000); // – Zeit in ms anpassen, je nach Länge deiner Dead-Animation
    }
  }, 500);
}

checkLose() {
  setStoppableInterval(() => { // NEU
    if (this.character.isDead()) {
      document.getElementById("loseScreen").style.display = "flex";
    }
  }, 500);
}

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

  checkCollisions() {
    setStoppableInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isDead()) return;
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      });

      if (
        !this.endboss.isDead() &&
        this.endboss.isAttacking &&
        this.endboss.isBossAttackColliding(this.character)
      ) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    }, 200);
  }

checkCoinCollisions() {
  setStoppableInterval(() => {
    for (let i = this.level.coins.length - 1; i >= 0; i--) { // GEÄNDERT
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
        this.coinbar.addCoin();
        this.collectedCoins++;
      }
    }
  }, 200);
}

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

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  // Draw function
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjecttoMap(this.level.backgroundObjects);
    this.addObjecttoMap(this.light);
    this.addToMap(this.character);
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

  addObjecttoMap(obj) {
    obj.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    if (this.bars.includes(mo)) this.ctx.globalAlpha = 0.5; // NEU
    mo.drawCTX(this.ctx);
    mo.drawFrame(this.ctx);
    this.ctx.globalAlpha = 1; // NEU

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}