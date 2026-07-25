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
   * Draws the object on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
   */
  drawCTX(ctx) {
    ctx.save();
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading Image", e);
      console.log("Could not load Image", this.img?.src);
    }
    // If this object supports isHurt() and currently is hurt, draw a red flash
    // matching the PNG's alpha (not just a rectangle). Use an offscreen canvas
    // to tint the sprite and then draw it back onto the main canvas.
    try {
      if (typeof this.isHurt === 'function' && this.isHurt()) {
        // Avoid flashing the Endboss
        if ((typeof Endboss === 'undefined' || !(this instanceof Endboss)) && (typeof Character === 'undefined' || !(this instanceof Character))) {
          try {
            const w = Math.max(1, Math.round(this.width));
            const h = Math.max(1, Math.round(this.height));
            const off = document.createElement('canvas');
            off.width = w;
            off.height = h;
            const oc = off.getContext('2d');
            // draw the sprite into the offscreen canvas (respecting alpha)
            oc.drawImage(this.img, 0, 0, w, h);
            // keep only the sprite's alpha and fill with red
            oc.globalCompositeOperation = 'source-in';
            oc.fillStyle = 'rgba(255,0,0,0.45)';
            oc.fillRect(0, 0, w, h);
            // draw the tinted result onto the main context at the object's position
            ctx.drawImage(off, this.x, this.y, w, h);
          } catch (inner) {
            // fallback to simple rect overlay if anything goes wrong
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'rgba(255,0,0,0.35)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();
          }
        }
      }
    } catch (e) {
      // ignore errors
    }
    ctx.restore();
  }

  /**
   * Draws a debug frame around the object if needed.
   *
   * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
   */
  drawFrame(ctx) {
    //  if (
    //       this instanceof Character ||
    //      this instanceof Fish ||
    //      this instanceof Endboss
    //    ) {
    //      ctx.beginPath();
    //      ctx.lineWidth = "5";
    //     ctx.strokeStyle = "blue";
    //     ctx.rect(this.x, this.y, this.width, this.height);
    //     ctx.stroke();
    //   }
  }
}
