class World {

  character = new Character();

  lastThrow = 0;
  level = level_1; 
  canvas; 
  ctx; 
  keyboard;
  camera_x = 0;
  throwableObjects = [];
  ground = 262.5;
  energy;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.collision = new Collision(this);
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.setBars();
    this.draw();
    this.run();
  }

  /**
   * Sets the world property of the character to the current instance of the world.
   * Assigns the current instance of the world to the 'World' property of the character.
   */
  setWorld() {
    this.character.World = this;
  }

  /**
   * Runs the game loop by setting up recurring intervals for specific game logic.
   */
  run() {
    this.bottleBarNew.setPercent(this.character.bottle);
    this.coinBarNew.setPercent(this.character.coin);
    this.healthBarNew.setPercent(this.character.energy);
    this.bossBarNew.setPercent(this.level.boss[0].energy);
    setStoppableIntervall(() => {
      this.removeItems();
      this.checkCollisions();
      this.pepeNearBoss();
      this.checkIfPepeisbehindBoss();
    }, 100);
    setStoppableIntervall(() => {
      checkScreen();
      this.checkThrownBottleYaxis();
      this.checkThrowableStuff();
    }, 200);
  }


  /**
   * Sets up bars in the game by initializing and assigning new instances of various bar objects.

   */
  setBars() {
    this.bottleBarNew = newBottleBar;
    this.coinBarNew = newCoinBar;
    this.healthBarNew = newHealthBar;
    this.bossBarNew = newEndbossBar;
  }

  /**
   * Removes items in the game based on the game state.
   * If the game is over or won, resets the character's coin and bottle collections to zero,
   * and clears the array of throwable objects.
   */
  removeItems() {
    if (GameOver || winGame) {
      this.character.coinCollection = 0;
      this.character.bottlesCollection = 0;
      this.throwableObjects = [];
    }
  }


  /**
   * Removes throwable objects from the game.
   * Iterates through the array of throwable objects and removes each object from the array.
   */
  removeThrowableObject() {
    this.throwableObjects.forEach((bottle) => {
      this.throwableObjects.splice(bottle, 1);
    });
  }


  /**
   * Checks if the time passed since the last throw is less than 1 second.
   * @returns {boolean} Returns true if the time passed is less than 1 second, otherwise false.
   */
  isThorwing() {
    let timePassed = new Date().getTime() - this.lastThrow; 
    timePassed = timePassed / 1000; 
    return timePassed < 1; 
  }


  /**
   * Checks conditions for throwing a throwable object (e.g., a bottle) in the game.
   * Checks if the 'd' key is pressed, the character has bottles in the collection, and is not currently throwing a bottle.
   * If conditions are met, creates a new throwable object, updates related properties, and adds the object to the array.
   */
  checkThrowableStuff() {
    if (
      this.keyboard.d &&
      this.character.bottlesCollection > 0 &&
      !this.isThorwing()
    ) {
      this.lastThrow = new Date().getTime();
      let bottleThrow = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottleThrow);
      this.character.throwsBottle = true;
      this.character.bottlesCollection -= 1;
      this.character.bottle -= 20;
      this.bottleBarNew.setPercent(this.character.bottle);
    }
  }

  /**
   * Checks if thrown bottles have reached the ground and handles the consequences.
   */
  checkThrownBottleYaxis() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.y > this.ground) {
        bottle.bottleHitGround = true;
        playAudio("bottlebreaking");
        setTimeout(() => {
          this.removeThrowableObject();
        }, 50);
      }
    });
  }


  /**
   * Checks various types of collisions within the game.
   */
  checkCollisions() {
    this.collision.coin();
    this.collision.bottle();
    this.collision.collidingWithBoss();
    this.collision.collidingWithChicken();
    this.collision.chickenHitByBottle();
    this.collision.bossHitByBottle();
  }


  /**
   * Checks if the character is near or behind the boss in the level.
   */
  pepeNearBoss() {
    if (this.character.x + 350 > this.level.boss[0].x) {
      this.level.boss[0].nearPepe = true;
    }
  }

  /**
   * Checks if the character is behind the boss in the level.
   */
  checkIfPepeisbehindBoss() {
    if (this.character.x > this.level.boss[0].x) {
      this.level.boss[0].pepeBehindBoss = true;
    }
  }

  drawBottCoins() {
    if (GameOver === false) {
      this.drawCoinsandBottlesToMap();
    }
  }

  /**
   * Draws elements on the game canvas, including background objects, bars, characters, boss, enemies.
   * The draw function is recursively called using requestAnimationFrame for continuous rendering.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgroundObjectstoMap();
    this.ctx.translate(-this.camera_x, 0); 
    if (GameOver === false) {
      this.drawBarsToMap();
    }
    this.ctx.translate(this.camera_x, 0); 
    this.addtoMap(this.character);
    this.addObjectstoMap(this.level.boss);
    if (GameOver === false) {
      this.addObjectstoMap(this.level.enemies);
      this.addObjectstoMap(this.throwableObjects);
    }
    this.drawBottCoins();
    this.ctx.translate(-this.camera_x, 0); 
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


drawWithCameraTranslation(func, camera_x) {
    this.ctx.translate(camera_x, 0);
    func.call(this);
    this.ctx.translate(-camera_x, 0);
}

addObjectsToMap(objects) {
    objects.forEach(object => this.addtoMap(object));
}

  /**
   * Draws coins and bottles to the game map.
   */
  drawCoinsandBottlesToMap() {
    this.addObjectstoMap(this.level.coins);
    this.addObjectstoMap(this.level.bottles);
  }

  /**
   * Draws background objects to the game map.
   */
  drawBackgroundObjectstoMap() {
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.clouds);
  }

  /**
   * Draws bars to the game map.
   */
  drawBarsToMap() {
    this.addtoMap(this.bossBarNew);
    this.addtoMap(this.healthBarNew);
    this.addtoMap(this.coinBarNew);
    this.addtoMap(this.bottleBarNew);
  }

  /**
   * Adds objects from an array to the game map.
   * Iterates through the array of objects and calls the 'addtoMap' method for each object.
   * @param {Array} - An array of objects to be added to the game map.
   */
  addObjectstoMap(objects) {
    objects.forEach((o) => {
      this.addtoMap(o);
    });
  }

  /**
   * flips the image back if 'otherDirection' is true.
   * @param {Object} mo - The object to be added to the game map.
   */
  addtoMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
 * Flips the image horizontally for a given object on the game map.
 * Saves the current state of the canvas context, translates the canvas by the width of the object to the right,
 * scales the context horizontally by -1 to flip the image, and updates the x-coordinate of the object accordingly.
 * @param {Object} mo - The object for which the image is to be flipped horizontally.
 */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1); 
    mo.x = mo.x * -1; 
  }


  /**
   * Reverts the horizontal flipping of an image for a given object on the game map.
   * Updates the x-coordinate of the object by multiplying it by -1 and restores the saved canvas context state.
   * @param {Object} mo - The object for which the horizontal flipping is to be reverted.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
