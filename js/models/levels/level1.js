function createBackgroundObjects() {
  let objects = [];
  for (let i = -3; i < 10; i++) {
    let d = (Math.abs(i) % 2) + 1;
    let x = i * 720;
    objects.push(
      new BackgroundObject(`../img/3. Background/Layers/5. Water/D${d}.png`, x),
      new BackgroundObject(`../img/3. Background/Layers/4.Fondo 2/D${d}.png`, x),
      new BackgroundObject(`../img/3. Background/Layers/3.Fondo 1/D${d}.png`, x),
      new BackgroundObject(`../img/3. Background/Layers/2. Floor/D${d}.png`, x)
    );
  }
  return objects;
}

const level1 = new Level(
    [
        new Fish(), 
        new Fish(), 
        new Fish(),
        new Endboss()
    ],
    createBackgroundObjects()
);
