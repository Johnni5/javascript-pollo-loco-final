let level_1;
const sprites = new Sprites();
const layers = sprites.background;
const backgroundObjects = [];
const xPosition = [-719, 719, 2157];

/**
 * Generate BackgroundObjects based on the provided sprite information and x positions.
 *
 * @param {number[]} xPosition - Array containing x positions.
 * @param {string[]} sprites.background - Array containing paths to background sprites.
 * @param {BackgroundObject[]} backgroundObjects - Array to store the generated BackgroundObjects.
 */
for (let repeat_index = 0; repeat_index < xPosition.length; repeat_index++) {
  for (let i = 0; i < sprites.background.length; i++) {
    let currentX = xPosition[repeat_index];

    if (i >= sprites.background.length / 2) {
      currentX += xPosition[1];
    }
    const imagePath = sprites.background[i];
  
    backgroundObjects.push(new BackgroundObject(imagePath, currentX));
  }
}

/**
 * Create a new Level based on the provided information.
 */
function newLevel() {
  level_1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new smallChicken(),
      new smallChicken(),
      new smallChicken(),
      new Chicken(),
    ],

    [new Endboss()],

    [new Cloud()],

    backgroundObjects,

    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ],

    [
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
    ]
  );
}
