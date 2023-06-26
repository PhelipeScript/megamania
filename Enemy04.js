class Enemy04 extends Enemy02{
  constructor(ctx) {
    super();
    this.ctx=ctx;
    this.enemyValue=50;
    this.enemy.src='assets/enemy04.png';
  }

  createEnemies(x, y, lastRandom, dir=1) {
    let left = x >= this.ctx.canvas.width ? x-this.ctx.canvas.width : x;
    let middle = x+150 >= this.ctx.canvas.width ? x+150-this.ctx.canvas.width : x+150;
    let right = x+300 >= this.ctx.canvas.width ? x+300-this.ctx.canvas.width : x+300;
    let random;

    this.enemies.push({x:left, y:y, dir:dir});
    this.enemies.push({x:middle, y:y, dir:dir});
    this.enemies.push({x:right, y:y, dir:dir});
    
    dir = dir === 1 ? -1 : 1;

    if (this.enemies.length < 18) {
      do {
        random = Math.floor(Math.random()*3);
      } while (random === lastRandom)
      let chosen = random === 0 ? left : random === 1 ? middle : right;
      this.createEnemies(chosen+50, y-70, random, dir);
    } 

    this.enemiesCreated=true;
  }

  showEnemies() {
    if (this.countdown <= 0 && !isResetting && !paused) {
      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].dir *= -1;
        this.enemies[i].y += 30;
        setTimeout(() => {
          if (this.enemies[i] && !paused) 
            this.enemies[i].y += 20;
        }, 600)
      }
      this.countdown=this.interval;
    } else {
      this.countdown--;
    }
    
    for (let i =0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);

      if(!isResetting && !paused)
        this.enemies[i].x+=this.vel*this.enemies[i].dir;

      if (this.enemies[i].x >= this.ctx.canvas.width) {
        this.enemies[i].x = 0-this.width;
      } else if (this.enemies[i].x+this.width <= 0) {
        this.enemies[i].x=this.ctx.canvas.width
      }
      
      if (this.enemies[i].y >= 350) {
        this.enemies[i].y = -80;
      } 
    }
  }

  draw() {
    super.draw();
  }
}
