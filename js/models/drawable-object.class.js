class DrawableObject {

  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };


  /**
   * Loads images into the image cache.
   * Iterates through an array of image paths, creates new Image objects, sets the source path,
   * and stores them in the image cache for future use.
   * @param {Array<string>} arr - An array of image paths to be loaded into the image cache.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  /**
 * Draws the image on the canvas context.
 * Uses the canvas context to draw the image at specified coordinates with a specified width and height.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  
  /**
   * Loads an image from the specified path.
   * Creates a new Image object, sets the source path, and assigns it to the 'img' property.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
