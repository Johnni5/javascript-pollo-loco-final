class Character extends MovableObject {

  sprites = new Sprites();
  height = 250;
  width = 120;
  speed = 10;
  y = 80;
  throwsBottle = false;
  coinCollection = 0;
  bottlesCollection = 0;

  
  jumpIntervalExecuted = false;

  offset = {
    top: 90,
    bottom: 40,
    left: 40,
    right: 40,
  };

  idleTime = 0;

  World;

  constructor() {
    super().loadImage("./assets/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.sprites.images_walking);
    this.loadImages(this.sprites.images_jumping);
    this.loadImages(this.sprites.images_dead);
    this.loadImages(this.sprites.images_hurt);
    this.loadImages(this.sprites.images_idle_short);
    this.loadImages(this.sprites.images_idle_long);
    this.applyGravity();
    this.idle();
    this.animate();
  }


  /**
   * Initiates the removal of the 'Pepe' character from the game.
   * Adjusts the vertical speed, applies gravity, and gradually moves the character downward.
   */
  removePepe() {
    this.speedY = 15;
    this.applyGravity();
    let intervall3 = setInterval(() => {
      IntervallIds.push(intervall3);
      this.y += 10;
    }, 25);
  }


  /**
   * Initiates the idle animation loop for the 'Pepe' character.
   * Calls the 'playAnimation' method with short idle sprites at a regular interval.
   * Tracks the idle time and switches to long idle sprites after a specified duration.
   */
  idle() {
    setStoppableIntervall(() => {
      this.playAnimation(this.sprites.images_idle_short);
      this.idleTime += 50;
      if (this.idleTime >= 400) {
        this.playAnimation(this.sprites.images_idle_long);
      }
    }, 200);
  }


  /**
   * Moves the 'Pepe' character to the right.
   * Updates the horizontal position, resets the idle time, sets the character's direction,
   * and plays a walking audio.
   */
  charMoveRight() {
    this.x += this.speed;
    this.idleTime = 0;
    this.otherDirection = false;
    playAudio("walking");
  }


  /**
   * Initiates the left movement of the 'Pepe' character.
   * Calls the 'moveLeft' method, resets the idle time, sets the character's direction to the left,
   * and plays a walking audio.
   */
  charMoveLeft() {
    this.moveLeft();
    this.idleTime = 0;
    this.otherDirection = true;
    playAudio("walking");
  }


  /**
   * Initiates an animation loop for character movements.
   * Uses a stoppable interval to continuously check and handle keyboard inputs for character movements.
   */
  animate() {
    setStoppableIntervall(() => {
      if (this.World.keyboard.right && this.x < this.World.level.level_end_x) {
        this.charMoveRight();
      }
      if (this.World.keyboard.left && this.x > 0) {
        this.charMoveLeft();
      }
      if (this.throwsBottle) {
        this.idleTime = 0;
      }
      if (this.World.keyboard.space && !this.isAboveGround()) {
        this.jump();
        if (this.speedY > 0) {
          this.currentImage = 0;
          playAudio("jumping");
          this.idleTime = 0;
        }
      }
      this.World.camera_x = -this.x + 100;
    }, 25);


    /**
     * Initiates a stoppable interval for updating character animations.
     * Checks the character's state and plays the appropriate animation based on conditions.
     */
    setStoppableIntervall(() => {
      if (this.isDead()) {
        this.playAnimation(this.sprites.images_dead);
        GameOver = true;
        this.removePepe();
        setTimeout(() => {
          gameOverScreen();
        }, 1000);
      } else if (this.isHurt()) {
        this.playAnimation(this.sprites.images_hurt);
      } else {
        if (this.World.keyboard.right || this.World.keyboard.left) {
          this.playAnimation(this.sprites.images_walking);
        }
      }
    }, 25);
    this.handleJump();
  }

  /**
   * Handles the jump animation for the 'Pepe' character.
   */
  handleJump() {
    setStoppableIntervall(() => {
      if (
        this.isAboveGround() &&
        this.speedY >= 0 &&
        !this.charcterIsFalling() &&
        !this.isOnGround()
      ) {
        this.playAnimation(this.sprites.images_jumping, 3);
      }
      if (
        this.isAboveGround() &&
        this.speedY <= 0 &&
        this.charcterIsFalling() &&
        !this.isOnGround()
      ) {
        this.playAnimation(this.sprites.images_jump_falling, 4);
      }
    }, 100);
  }
}
