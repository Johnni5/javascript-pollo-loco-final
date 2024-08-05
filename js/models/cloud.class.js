class Cloud extends MovableObject {
  
  y = 20;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("./assets/5_background/layers/4_clouds/1.png");
    this.speed = 0.05 + Math.random() * 0.5;
    this.x = Math.random() * 200;
    this.animate();
  }

  /**
   * Animates the cloud moving left.
   */
  animate() {
    setStoppableIntervall(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
