class World {
  character = new Character();
  enemies = [new Fish(), new Fish(), new Fish()];
  keyboard;
  canvas;
  ctx;
  light = [new Light()];
  backgroundObjects = [
    new BackgroundObject("../img/3. Background/Layers/5. Water/D1.png", 0),
    new BackgroundObject("../img/3. Background/Layers/4.Fondo 2/D1.png", 0),
    new BackgroundObject("../img/3. Background/Layers/3.Fondo 1/D1.png", 0),
    new BackgroundObject("../img/3. Background/Layers/2. Floor/D1.png", 0),
  ];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  // Draw function
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjecttoMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjecttoMap(this.enemies);
    this.addObjecttoMap(this.light);

    // Draw() wird dadurch immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjecttoMap(obj) {
    obj.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
