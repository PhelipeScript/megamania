class Enemy05 extends Enemy01{
  constructor(ctx) {
    super();
    this.ctx=ctx;
    this.enemyValue=60;
    this.enemy.src = 'assets/enemy05.png';
    this.width=25;
    this.height=15;
    this.velX=3;
    this.velY=0.1;
    this.dirY=1;
   }

  showEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);
      
      if (!paused) 
        this.enemies[i].y += this.velY*this.dirY;

      if (this.enemies[i].y >= 250 || this.enemies[i].y <= 30) {
        this.dirY *= -1;
      }

      if (this.enemies[i].x >= this.ctx.canvas.width) {
        this.enemies[i].x = -10;
      } else if(!isResetting && !paused) {
        this.enemies[i].x+=this.velX;
      }
    }
  }

  draw() {
    if(!this.enemiesCreated) {
      this.createEnemies(-500, 55);
    }
    this.showEnemies();
    this.showShots();
  }
}
