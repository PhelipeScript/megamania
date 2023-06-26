class Enemy07 extends Enemy05{
  constructor(ctx) {
    super();
    this.ctx=ctx;
    this.enemyValue=80;
    this.enemy.src = 'assets/enemy07.png';
    this.velX=2.8;
    this.velY=1.5;
    this.dirYInterval= {current:0,max:70};
   }

  showEnemies() {
    if (this.dirYInterval.current<=this.dirYInterval.max&&!this.stopMovX&&!paused) {
      this.dirYInterval.current++;
    } else if (this.dirYInterval.current>this.dirYInterval.max) {
      this.dirYInterval.current=0;
      this.dirY *= -1;
    }

    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);
      
      if (!paused)
        this.enemies[i].y += this.velY*this.dirY;

      if (this.enemies[i].x >= this.ctx.canvas.width) {
        this.enemies[i].x = -10;
      } else if(!isResetting && !paused) {
        this.enemies[i].x+=this.velX;
      }

    }
  }

  draw() {
    if(!this.enemiesCreated) {
      this.createEnemies(-500, 45);
    }
    this.showEnemies();
    this.showShots();
  }
}
