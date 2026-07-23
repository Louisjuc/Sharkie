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


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

drawCTX(ctx) {
    ctx.save();
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn('Error loading Image', e); // GEÄNDERT
      console.log('Could not load Image', this.img?.src); // GEÄNDERT: this.img statt this.image
    }
    ctx.restore();
}

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
