let level1 = createLevel1();

function createBackgroundObjects() {
  let objects = [];
  for (let i = -3; i < 10; i++) {
    let d = (Math.abs(i) % 2) + 1;
    let x = i * 720;
    objects.push(
      new BackgroundObject(`../img/3. Background/Layers/5. Water/D${d}.png`, x),
      new BackgroundObject(`../img/3. Background/Layers/4.Fondo 2/D${d}.png`, x),
      new BackgroundObject(`../img/3. Background/Layers/3.Fondo 1/D${d}.png`, x),
      new BackgroundObject(`../img/3. Background/Layers/2. Floor/D${d}.png`, x),
    );
  }
  return objects;
}

function createLevel1() { // NEU – wieder ergänzt
  return new Level(
    [new Fish(), new Fish(), new Fish(), new Fish(), new Fish(), new Endboss()],
    Array.from({ length: 15 }, () => new Coin()),
    createBackgroundObjects(),
    Array.from({ length: 20 }, () => new Poison()),
  );
} 