class Collision {

  constructor(world) {
    this.world = world;
  }

  /**
   * Checks for collisions between the character and chickens in the level.
   * If a collision is detected, it performs various actions based on the game logic.
   */
  collidingWithChicken() {
    if (this.world.level && this.world.level.enemies) {
      this.world.level.enemies.forEach((chicken, i) => {
        if (
          chicken.energy !== 0 && 
          !chicken.isDead() &&
          this.world.character.isColliding(chicken)
        ) {
          if (
            this.world.character.isAboveGround() &&
            this.world.character.charcterIsFalling() &&
            !chicken.isDead()
          ) {
            chicken.killChicken();
            if (chicken.isSpliceable) {
              // this.world.level.enemies.splice(i, 1);
              this.removeChickenfromMap(chicken);
            }
          } else if (chicken.disableHit === false) {
            this.world.character.hit();
            playAudio("pepeHurt");
            if (this.world.character.energyUpdated) {
              this.world.bonusHealthBar.setPercent(this.world.character.energy);
            }
            if (!this.world.character.energyUpdated) {
              this.world.healthBarNew.setPercent(this.world.character.energy);
            }
          }
        }
      });
    }
  }

  /**
   * if the boss was hitted by a bottle then boss is getting damage, a audio file is played
   * and the bottle will be removed.
   */
  bossHitByBottle() {
    for (let i = 0; i < this.world.throwableObjects.length; i++) {
      const bottle = this.world.throwableObjects[i];
      if (bottle.isColliding(this.world.level.boss[0])) {
        playAudio("bossHurt");
        playAudio("bottlebreaking");
        bottle.bottleHit = true;
        this.world.level.boss[0].bottleHit = true;
        setTimeout(() => {
          this.world.removeThrowableObject();
        }, 150);
        this.world.level.boss[0].lastHitBoss = true;
        this.world.level.boss[0].hit();
        this.world.bossBarNew.setPercent(this.world.level.boss[0].energy);
      }
    }
  }

  /**
   * Handles the logic when a chicken is hit by a throwable object (e.g., a bottle).
   * Checks for collisions between each throwable object and the chickens in the level.
   * If a collision is detected, it reduces the chicken's energy to zero and removes it from the level.
   * Also removes the throwable object upon collision with a chicken.
   */
  chickenHitByBottle() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((chicken, i) => {
        if (bottle.isColliding(chicken)) {
          bottle.bottleHit = true;
          playAudio("bottlebreaking");
          chicken.energy = 0;
        }
        if (chicken.energy === 0) {
          this.world.removeThrowableObject();
          //this.world.level.enemies.splice(i, 1);
          this.removeChickenfromMap(chicken);
        }
      });
    });
  }

  /**
   * Checks for collisions between the character and the boss in the level.
   * If a collision is detected, the character is hit, audio is played, and the health bar is updated.
   */
  collidingWithBoss() {
    if (this.world.character.isColliding(this.world.level.boss[0])) {
      this.world.character.hit(10);
      playAudio("pepeHurt");
      if (this.world.character.energyUpdated) {
        this.world.bonusHealthBar.setPercent(this.world.character.energy);
      }
      if (!this.world.character.energyUpdated) {
        this.world.healthBarNew.setPercent(this.world.character.energy);
      }
    }
  }


  /**
 * Removes a chicken from the map after a delay.
 * @param {Object} chicken - The chicken object to be removed.
 */
  removeChickenfromMap(chicken) {
    let enemy = this.world.level.enemies;
    setTimeout(() => {
      enemy.splice(enemy.indexOf(chicken), 1);
    }, 1000);
  }

  /**
   * Handles the logic when the character collects coins.
   * Checks for collisions between the character and coins in the level.
   * If a collision is detected, the character collects the coin, plays audio, updates the coin bar,
   * and removes the coin from the level.
   */
  coin() {
    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        this.world.character.getCoin();
        if (this.world.character.coinCollection <= 4) {
          playAudio("getItem");
          this.world.coinBarNew.setPercent(this.world.character.coin);
          this.world.character.coinCollection += 1;
          this.world.level.coins.splice(index, 1);
        }
        if (this.world.character.coinCollection === 5) {
          this.world.character.extraLife = 1;
          this.world.character.coinCollection = 0;
          this.world.character.coin = 0;
          this.world.coinBarNew.setPercent(this.world.character.coin);
        }
      }
    });
  }

  /**
   * Handles the logic when the character collects bottles.
   * Checks for collisions between the character and bottles in the level.
   * If a collision is detected, the character collects the bottle, updates the bottle bar,
   * plays audio, and removes the bottle from the level.
   */
  bottle() {
    this.world.level.bottles.forEach((bottle, index) => {
      if (this.world.character.isColliding(bottle)) {
        this.world.character.getBottle();
        this.world.bottleBarNew.setPercent(this.world.character.bottle);
        if (this.world.character.bottlesCollection <= 4) {
          this.world.character.bottlesCollection += 1;
          playAudio("getItem");
          this.world.level.bottles.splice(index, 1);
        }
      }
    });
  }
}
