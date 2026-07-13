class World {
  character = new Character();
  enemies = [new Fish(), new Fish(), new Fish()];

  canvas;
  ctx;

  backgroundObjects = [new BackgroundObject("../img/3. Background/Dark/1.png", 0)];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  // Draw function
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjecttoMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjecttoMap(this.enemies);
  

    // Draw() wird dadurch immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjecttoMap(obj){
      obj.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
