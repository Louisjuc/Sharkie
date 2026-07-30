class drawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 10;
  y = 180;
  height = 200;
  width = 250;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Loads a single image and assigns it to the object's current image reference.
   *
   * @param {string} path - The source path of the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   *
   * @param {string[]} arr - A list of image source paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the sprite and a red hurt-flash overlay if applicable.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawCTX(ctx) {
    ctx.save();
    this.drawSprite(ctx);
    this.drawHurtFlash(ctx);
    ctx.restore();
  }

  /**
   * Draws the current sprite image.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawSprite(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.error("Error loading Image", e);
      console.error("Could not load Image", this.img?.src);
    }
  }

  /**
   * Draws a red flash overlay on hurt sprites, except Endboss and Character.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawHurtFlash(ctx) {
    if (!(typeof this.isHurt === "function" && this.isHurt())) return;
    if (this instanceof Endboss || this instanceof Character) return;
    this.drawTintedSprite(ctx);
  }

  /**
   * Tints the sprite red using an offscreen canvas, matching its alpha shape.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawTintedSprite(ctx) {
    try {
      const w = Math.max(1, Math.round(this.width));
      const h = Math.max(1, Math.round(this.height));
      const oc = this.createTintCanvas(w, h);
      ctx.drawImage(oc, this.x, this.y, w, h);
    } catch (inner) {
      this.drawFallbackFlash(ctx);
    }
  }

  /**
   * Creates an offscreen canvas with the sprite tinted red (alpha preserved).
   * @param {number} w
   * @param {number} h
   * @returns {HTMLCanvasElement}
   */
  createTintCanvas(w, h) {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const oc = off.getContext("2d");
    oc.drawImage(this.img, 0, 0, w, h);
    oc.globalCompositeOperation = "source-in";
    oc.fillStyle = "rgba(255,0,0,0.45)";
    oc.fillRect(0, 0, w, h);
    return off;
  }

  /**
   * Draws a simple red rectangle overlay as fallback if tinting fails.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawFallbackFlash(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = "rgba(255,0,0,0.35)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  /**
   * Determines the image index matching the current percentage. The thresholds
   * are inclusive so that exact steps such as 20, 40, 60 and 80 percent each
   * select their own image. Any remaining amount keeps the lowest filled image
   * so a bar only looks empty once it really reached zero.
   *
   * @returns {number}
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 0;
    else if (this.percentage >= 80) return 1;
    else if (this.percentage >= 60) return 2;
    else if (this.percentage >= 40) return 3;
    else if (this.percentage > 0) return 4;
    else return 5;
  }
}
