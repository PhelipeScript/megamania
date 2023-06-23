class Enemy04 {
  constructor(ctx) {
    this.ctx=ctx;
    this.enemyValue=30;
    this.enemy=new Image();
    this.enemy.src='assets/enemy04.png';
    this.width=35;
    this.height=20;
    this.enemies=[];
    this.enemiesCreated=false;
    this.vel=3.5;
    this.interval=170;
    this.countdown=this.interval;
    this.shots=[];
    this.shotVel=4;
    this.shotInterval=100;
    this.shotCount=0;
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
    if (this.countdown <= 0 && !isResetting) {
      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].dir *= -1;
        this.enemies[i].y += 30;
        setTimeout(() => {
          if (this.enemies[i]) 
            this.enemies[i].y += 20;
        }, 600)
      }
      this.countdown=this.interval;
    } else {
      this.countdown--;
    }
    
    for (let i =0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);

      if(!isResetting)
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

  createShot() {
    let amount = this.enemies.length>=3 ? 2 : 1;
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

  showShots() {
    if(this.shotCount===0) {
      this.createShot();
      this.shotCount = this.shotInterval;
    } else {
      this.shotCount--;
    }

    for (let i = 0; i < this.shots.length; i++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#F00';
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.shots[i].x, this.shots[i].y[0]);
      this.ctx.lineTo(this.shots[i].x, this.shots[i].y[1]);
      this.ctx.stroke();

      this.shots[i].y[0]+=this.shotVel;
      this.shots[i].y[1]+=this.shotVel;

      if (this.shots[i].y[1] >= 440) {
        this.shots.splice(i, 1);
      }
    }
  }

  reset() {
    let enemyFurtherDown = -1;

    for (let i = this.enemies.length-1; i >= 0; i--) {
      if (this.enemies[i].y > enemyFurtherDown) 
        enemyFurtherDown=this.enemies[i].y;
    }

    for (let i = this.enemies.length-1; i >= 0; i--) {
      this.enemies[i].y += enemyFurtherDown <= 100 ? -100 : -enemyFurtherDown*1.25; 
    }
  } 

  draw() {
    if (!this.enemiesCreated) {
      this.createEnemies(40, -30);
    }
    this.showEnemies();
    this.showShots();
    
  }
}
