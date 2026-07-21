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

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.checkCollisions();
    this.checkAttackCollisions();
    
  }

checkCollisions() {
  setInterval(() => {
    this.level.enemies.forEach((enemy) => {

      if (enemy.isDead()) return;

      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }

    });
  }, 200);
}

  checkAttackCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (
          !this.character.isAttacking ||
          !this.character.isAttackColliding(enemy)
        ) {
          return;
        }

        if (enemy.isDead()) return;

        if (!enemy.isHurt()) {
          enemy.hit();
        }
      });
    }, 1000 / 60);
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  // Draw function
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Kamera-Translate umschließt jetzt die Welt-Objekte
    this.ctx.translate(this.camera_x, 0);
    this.addObjecttoMap(this.level.backgroundObjects);
    this.addObjecttoMap(this.light);
    this.addToMap(this.character);
    this.addObjecttoMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);

    // Statusbar bleibt UNVERÄNDERT fix im Bildschirm
    this.addToMap(this.statusbar);

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
    mo.drawCTX(this.ctx);
    mo.drawFrame(this.ctx);

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
