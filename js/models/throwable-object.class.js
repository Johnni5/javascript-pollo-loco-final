class ThrowableObject extends MovableObject {
  sprites = new Sprites();
  bottleHit = false;
  bottleHitGround = false;
  direction = false;

  offset = {
    top: 10,
    bottom: 20,
    left: 20,
    right: 20,
  };

  constructor(x, y, direction) {
    super().loadImage("./assets/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.sprites.rotateBottle);
    this.loadImages(this.sprites.bottleSplash);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.height = 80;
    this.throw();
    playAudio("throwing");
  }


  /**
   * Initiates the throwing action for the throwable object.
   * Adjusts the vertical speed, applies gravity (if not hit the ground), initiates animation, and moves horizontally.
   */
  throw() {
    this.speedY = 30;
    if (this.bottleHitGround === false) {
      this.applyGravity();
    }
    this.animate();
    setInterval(() => {
      if (this.direction) {
        this.x -= 30;
      } else {
        this.x += 10;
      }
    }, 50);
  }


  /**
   * Initiates animations for the throwable object.
   * Sets up intervals for continuous rotation animation and splash animation upon hitting an object or the ground.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.sprites.rotateBottle);
      if (this.bottleHit || this.bottleHitGround) {
        this.playAnimation(this.sprites.bottleSplash);
      }
    }, 60);

  }

}


