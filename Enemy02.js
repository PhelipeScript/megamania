class Enemy02 extends Enemy01 {
  constructor(ctx) {
    super();
    this.ctx=ctx;
    this.enemyValue=30;
    this.enemy.src='assets/enemy02.png';
    this.dirX=1;
    this.vel=3.5;
    this.interval=170;
    this.countdown=this.interval;
    this.shotInterval=100;
  }

  createEnemies(x, y, lastRandom) {
    let left = x >= this.ctx.canvas.width ? x-this.ctx.canvas.width : x;
    let middle = x+150 >= this.ctx.canvas.width ? x+150-this.ctx.canvas.width : x+150;
    let right = x+300 >= this.ctx.canvas.width ? x+300-this.ctx.canvas.width : x+300;
    let random;

    this.enemies.push({x:left, y:y});
    this.enemies.push({x:middle, y:y});
    this.enemies.push({x:right, y:y});

    if (this.enemies.length < 18) {
      do {
        random = Math.floor(Math.random()*3);
      } while (random === lastRandom)
      let chosen = random === 0 ? left : random === 1 ? middle : right;
      this.createEnemies(chosen+50, y-70, random);
    } 

    this.enemiesCreated=true;
  }

  showEnemies() {
    if (this.countdown <= 0 && !isResetting && !paused) {
      this.dirX *= -1;
      for (let j = 0; j < this.enemies.length; j++) {
        this.enemies[j].y += 30;
        setTimeout(() => {
          if (this.enemies[j]) 
            this.enemies[j].y += 20;
        }, 600)
      }
      this.countdown=this.interval;
    } else {
      this.countdown--;
    }
    
    for (let i =0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);

      if(!isResetting && !paused) 
        this.enemies[i].x+=this.vel*this.dirX;

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

  createShot() {
    let amount = this.enemies.length>=4 ? 2 : 1;
    for (let i = 1; i <= amount; i++) {
      let random = Math.floor(Math.random()*this.enemies.length);
      setTimeout(() => {
        if (this.enemies[random] && this.enemies[random].y >= 0 && this.enemies[random].y <= 250) {
          this.shots.push({
            x:this.enemies[random].x+this.width/2,
            y: [this.enemies[random].y+20, this.enemies[random].y+40]
          })
        }
      }, i*300)
    }
  }

  reset() {
    let enemyFurtherDown = -1;

    for (let i = this.enemies.length-1; i >= 0; i--) {
      if (this.enemies[i].y > enemyFurtherDown) 
        enemyFurtherDown=this.enemies[i].y;
    }

    for (let i = this.enemies.length-1; i >= 0; i--) {
      this.enemies[i].y += enemyFurtherDown <= 100 ? -140 : -enemyFurtherDown*1.25; 
    }
  } 

  draw() {
    if (!this.enemiesCreated) {
      this.createEnemies(40, -30);
    }
    this.showEnemies();
    super.showShots();
  }
}
