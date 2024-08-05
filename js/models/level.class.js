class Level {
  
  enemies; 
  boss;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 2175;

  constructor(enemies, boss, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies; 
    this.boss = boss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
