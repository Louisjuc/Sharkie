/** @type {Level} The main game level instance. */
let level1 = createLevel1();

/**
 * Creates tiled background layers (water, backdrops, floor) spanning the level width.
 * @returns {BackgroundObject[]}
 */
function createBackgroundObjects() {
  let objects = [];
  for (let i = -3; i < 10; i++) {
    let d = (Math.abs(i) % 2) + 1;
    let x = i * 720;
    objects.push(
      new BackgroundObject(`./img/3. Background/Layers/5. Water/D${d}.png`, x),
      new BackgroundObject(`./img/3. Background/Layers/4.Fondo 2/D${d}.png`, x),
      new BackgroundObject(`./img/3. Background/Layers/3.Fondo 1/D${d}.png`, x),
      new BackgroundObject(`./img/3. Background/Layers/2. Floor/D${d}.png`, x),
    );
  }
  return objects;
}

/**
 * Builds the first level with enemies, collectibles and background layers.
 * @returns {Level}
 */
function createLevel1() {
  return new Level(
    [
      new Fish(),
      new Fish(),
      new Fish(),
      new Fish(),
      new Fish(),
      new Jellyfish(),
      new Jellyfish(),
      new Jellyfish(),
      new Jellyfish(),

      new Endboss(),
    ],
    Array.from({ length: 5 }, () => new Coin()),
    createBackgroundObjects(),
    Array.from({ length: 10 }, () => new Poison()),
  );
}