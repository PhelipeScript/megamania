class Enemy08 extends Enemy06{
  constructor(ctx) {
    super();
    this.ctx=ctx;
    this.enemyValue=90;
    this.enemy.src = 'assets/enemy08.png';
    this.width=35;
    this.height=30;
    this.vel=3;
   }

   createEnemies(x, y) {
    let random =  Math.random()*this.ctx.canvas.width;
    this.enemies.push({x: random,y: y,});
    this.enemies.push({x: random+140,y: y,});
    this.enemies.push({x: random+280,y: y,});

    if (this.enemies.length < 18) {
      this.createEnemies(x, y-80);
    } else {
      this.enemiesCreated=true;
    }
  }

  showEnemies() {
    let random =  Math.random()*this.ctx.canvas.width+1;
    let counter=1;
    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);

      if(!isResetting && !paused)
        this.enemies[i].y+=this.vel;

      if (this.enemies[i].y >= 350) {
        this.enemies[i].y = -130;
        
        if (counter===1 && !paused) {
          this.enemies[i].x = random;
        } else if (counter===2 && !paused) {
          this.enemies[i].x = random+140;
        } else if (counter===3 && !paused) {
          this.enemies[i].x = random+280;
        }
        if (!paused)
          counter++;
        if (counter===4 && !paused) {
          random =  Math.random()*this.ctx.canvas.width+1;
          counter=1;
        }
      }
    }
  }

  createShot() {
    
  }

  showShots() {
    
  }

  draw() {
    if(!this.enemiesCreated) {
      this.createEnemies(70,-150);
    }
    this.showEnemies();
  }
}
