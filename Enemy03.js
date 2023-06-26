class Enemy03 extends Enemy01 {
  constructor(ctx) {
    super();
    this.ctx=ctx;
    this.enemyValue=40;
    this.enemy.src = 'assets/enemy03.png';
    this.width=30;
    this.vel=3;
  }

  draw() {
    if(!this.enemiesCreated) {
      this.createEnemies(-500, 55);
    }
    this.showEnemies();
    this.showShots();
  }
}
