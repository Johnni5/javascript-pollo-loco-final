class smallChicken extends MovableObject {

  disableHit = false;
  sprites = new Sprites();
  y = 345;
  height = 88;
  width = 83;
  isSpliceable = false;
  offset = {
    top: 5,
    bottom: 0,
    left: 0,
    right: 0,
  };

  constructor() {
    super().loadImage("./assets/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 150 + Math.random() * 400; 
    this.speed = 0.5 + Math.random() * 0.5;
    this.loadImages(this.sprites.small_chicken_walking);
    this.loadImages(this.sprites.small_chicken_dead);
    this.animate();
  }

  /**
   * Initiates animations for a walking chicken.
   * Sets up intervals for continuous left movement and walking animation.
   * Stops the animations when the chicken is dead.
   */
  animate() {
    let intervall15 = setStoppableIntervall(() => {
      this.moveRight();
      this.otherDirection = true;
      if (this.isDead()) {
        clearInterval(intervall15);
      }
    }, 1000 / 60);


    /**
     * Initiates an animation loop using a stoppable interval for walking animation.
     */
    setStoppableIntervall(() => {
      this.playAnimation(this.sprites.small_chicken_walking);
      if (this.isDead()) {
        this.disableHit = true;
        this.playAnimation(this.sprites.small_chicken_dead);
      }
    }, 80);
  }

  /**
   * Initiates the process of killing the chicken.
   * Sets the chicken's energy to 0, plays a chicken kill audio, and marks the chicken as spliceable.
   */
  killChicken() {
    this.energy = 0;
    playAudio("chickenKill");
    this.isSpliceable = true;
  }
}
